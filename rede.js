/* =========================================================================
   rede.js – comunicação em tempo real entre o projetor e os iPads.

   • Com Firebase Realtime Database (endereço em rede-config.json):
     funciona entre aparelhos diferentes (projetor + iPads).
   • Sem endereço configurado: "modo teste", que só funciona entre abas
     do MESMO navegador (bom para experimentar no computador).

   Escrito em JavaScript antigo (ES5, XMLHttpRequest, EventSource) de
   propósito, para funcionar também no iPad mini 1 (iOS 9).
   ========================================================================= */
(function(){
'use strict';

var Rede = {
  modo: 'local',      // 'firebase' | 'local'
  base: '',           // endereço do banco, sem barra no final
  pronto: false
};

// ---------- utilidades ----------
function limparBase(url){
  url = String(url || '').replace(/^\s+|\s+$/g, '');
  if (!url) return '';
  if (!/^https:\/\//i.test(url)) url = 'https://' + url;
  return url.replace(/\/+$/, '').replace(/\.json$/i, '');
}
function partes(path){
  return String(path || '').split('/').filter(function(p){ return p !== ''; });
}
function copiar(v){ return v === undefined ? null : JSON.parse(JSON.stringify(v)); }
function lerCaminho(raiz, path){
  var ps = partes(path), v = raiz;
  for (var i = 0; i < ps.length; i++){
    if (v === null || typeof v !== 'object') return null;
    v = v[ps[i]];
    if (v === undefined) return null;
  }
  return v === undefined ? null : v;
}
// devolve a nova raiz com "valor" gravado em "path" (null apaga)
function gravarCaminho(raiz, path, valor){
  var ps = partes(path);
  if (!ps.length) return valor === null ? null : valor;
  if (raiz === null || typeof raiz !== 'object') raiz = {};
  var o = raiz;
  for (var i = 0; i < ps.length - 1; i++){
    if (o[ps[i]] === null || typeof o[ps[i]] !== 'object') o[ps[i]] = {};
    o = o[ps[i]];
  }
  if (valor === null) delete o[ps[ps.length - 1]];
  else o[ps[ps.length - 1]] = valor;
  return raiz;
}
function resolverTS(v){
  if (v && typeof v === 'object'){
    if (v['.sv'] === 'timestamp') return Date.now();
    if (Object.prototype.toString.call(v) === '[object Array]'){
      var arr = [];
      for (var i = 0; i < v.length; i++) arr.push(resolverTS(v[i]));
      return arr;
    }
    var o = {};
    for (var k in v) if (v.hasOwnProperty(k)) o[k] = resolverTS(v[k]);
    return o;
  }
  return v;
}
Rede.TS = {'.sv': 'timestamp'};   // horário do servidor

// ---------- carregar configuração ----------
Rede.iniciar = function(cb){
  var doParam = (location.search.match(/[?&]db=([^&]+)/) || [])[1];
  if (doParam){
    try{ localStorage.setItem('rede_firebase', decodeURIComponent(doParam)); }catch(e){}
  }
  var finalizar = function(url){
    Rede.base = limparBase(url);
    Rede.modo = Rede.base ? 'firebase' : 'local';
    Rede.pronto = true;
    cb && cb(Rede.modo);
  };
  var salvo = null;
  try{ salvo = localStorage.getItem('rede_firebase'); }catch(e){}
  var x = new XMLHttpRequest();
  x.open('GET', 'rede-config.json?v=' + Date.now(), true);
  x.onreadystatechange = function(){
    if (x.readyState !== 4) return;
    var url = '';
    if (x.status === 200 || (x.status === 0 && x.responseText)){
      try{ url = JSON.parse(x.responseText).firebase || ''; }catch(e){}
    }
    finalizar(salvo || url);
  };
  try{ x.send(); }catch(e){ finalizar(salvo || ''); }
};
// Permite o professor colar o endereço só neste aparelho
Rede.definirEnderecoLocal = function(url){
  try{
    if (url) localStorage.setItem('rede_firebase', url);
    else localStorage.removeItem('rede_firebase');
  }catch(e){}
};

// =========================================================================
// FIREBASE (REST + EventSource)
// =========================================================================
function req(metodo, path, corpo, cb){
  var x = new XMLHttpRequest();
  x.open(metodo, Rede.base + '/' + partes(path).join('/') + '.json', true);
  x.setRequestHeader('Content-Type', 'application/json');
  x.timeout = 15000;
  x.onreadystatechange = function(){
    if (x.readyState !== 4) return;
    if (x.status >= 200 && x.status < 300){
      var d = null; try{ d = JSON.parse(x.responseText); }catch(e){}
      cb && cb(null, d);
    } else {
      cb && cb(new Error('Erro ' + x.status + ' ' + (x.responseText || '')));
    }
  };
  x.ontimeout = function(){ cb && cb(new Error('Tempo esgotado')); };
  x.onerror = function(){ cb && cb(new Error('Sem conexão')); };
  x.send(corpo === undefined ? null : JSON.stringify(corpo));
}

function ouvirFirebase(path, cb){
  var valor = null, fechado = false, es = null, timerRe = null;
  function aplicar(tipo, dados){
    var p = dados.path, d = dados.data;
    if (tipo === 'put'){
      if (p === '/') valor = copiar(d);
      else valor = gravarCaminho(valor, p, copiar(d));
    } else if (tipo === 'patch'){
      for (var k in d) if (d.hasOwnProperty(k)) valor = gravarCaminho(valor, (p === '/' ? '' : p) + '/' + k, copiar(d[k]));
    }
    cb(copiar(valor));
  }
  function conectar(){
    if (fechado) return;
    es = new EventSource(Rede.base + '/' + partes(path).join('/') + '.json');
    es.addEventListener('put', function(e){ try{ aplicar('put', JSON.parse(e.data)); }catch(err){} });
    es.addEventListener('patch', function(e){ try{ aplicar('patch', JSON.parse(e.data)); }catch(err){} });
    es.addEventListener('cancel', function(){ reconectar(); });
    es.onerror = function(){
      Rede.aoMudarConexao && Rede.aoMudarConexao(false);
      // o EventSource tenta de novo sozinho; se fechar de vez, reabrimos
      if (es.readyState === 2) reconectar();
    };
    es.onopen = function(){ Rede.aoMudarConexao && Rede.aoMudarConexao(true); };
  }
  function reconectar(){
    if (fechado) return;
    try{ es && es.close(); }catch(e){}
    clearTimeout(timerRe);
    timerRe = setTimeout(conectar, 2000);
  }
  conectar();
  return { fechar: function(){ fechado = true; clearTimeout(timerRe); try{ es && es.close(); }catch(e){} } };
}

// =========================================================================
// MODO TESTE (localStorage, só no mesmo navegador)
// =========================================================================
// Cada caminho gravado vira uma entrada própria no localStorage ("rt|salas/1234/estado"...).
// Assim, duas abas gravando caminhos diferentes ao mesmo tempo não apagam o trabalho uma da outra
// (o mesmo comportamento do Firebase).
var PREFIXO = 'rt|';
var ouvintesLocais = [];
try{ localStorage.removeItem('rede_teste_db'); }catch(e){}   // formato antigo
function chavesLocais(){
  var out = [];
  try{
    for (var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if (k && k.indexOf(PREFIXO) === 0) out.push(k.slice(PREFIXO.length));
    }
  }catch(e){}
  return out;
}
function relacionado(k, path){   // k é ancestral, igual ou descendente de path
  if (!path) return true;
  return k === path || k.indexOf(path + '/') === 0 || path.indexOf(k + '/') === 0;
}
function profundidade(k){ return k ? k.split('/').length : 0; }
function lerLocalCaminho(path){
  path = partes(path).join('/');
  var ks = chavesLocais().filter(function(k){ return relacionado(k, path); });
  ks.sort(function(a, b){ return profundidade(a) - profundidade(b); });
  var arvore = {};
  for (var i = 0; i < ks.length; i++){
    var v = null;
    try{ v = JSON.parse(localStorage.getItem(PREFIXO + ks[i])); }catch(e){}
    arvore = gravarCaminho(arvore, ks[i], v === undefined ? null : v) || {};
  }
  return lerCaminho(arvore, path);
}
function gravarLocalCaminho(path, valor){
  path = partes(path).join('/');
  var ks = chavesLocais(), temAncestral = false, remover = [];
  for (var i = 0; i < ks.length; i++){
    var k = ks[i];
    if (k === path || k.indexOf(path + '/') === 0) remover.push(k);
    else if (path.indexOf(k + '/') === 0) temAncestral = true;
  }
  // apaga primeiro as entradas mais "altas" (ex.: a sala inteira antes dos grupos)
  remover.sort(function(a, b){ return profundidade(a) - profundidade(b); });
  for (var j = 0; j < remover.length; j++){ try{ localStorage.removeItem(PREFIXO + remover[j]); }catch(e){} }
  try{
    if (valor !== null && valor !== undefined) localStorage.setItem(PREFIXO + path, JSON.stringify(valor));
    else if (temAncestral) localStorage.setItem(PREFIXO + path, 'null');   // marca "apagado" sobre um valor antigo
  }catch(e){}
}
function avisarLocais(){
  for (var i = 0; i < ouvintesLocais.length; i++){
    var o = ouvintesLocais[i];
    var v = lerLocalCaminho(o.path), s = JSON.stringify(v);
    if (s !== o.ultimo){ o.ultimo = s; (function(f, val){ setTimeout(function(){ f(val); }, 0); })(o.cb, copiar(v)); }
  }
}
window.addEventListener('storage', function(e){ if (!e.key || e.key.indexOf(PREFIXO) === 0) avisarLocais(); });

// =========================================================================
// API PÚBLICA
// =========================================================================
Rede.ler = function(path, cb){
  if (Rede.modo === 'firebase') return req('GET', path, undefined, cb);
  setTimeout(function(){ if (cb) cb(null, copiar(lerLocalCaminho(path))); }, 0);
};
Rede.gravar = function(path, valor, cb){        // substitui
  if (Rede.modo === 'firebase') return req('PUT', path, valor, cb);
  gravarLocalCaminho(path, resolverTS(copiar(valor)));
  avisarLocais(); setTimeout(function(){ if (cb) cb(null); }, 0);
};
Rede.atualizar = function(path, obj, cb){       // mescla campos
  if (Rede.modo === 'firebase') return req('PATCH', path, obj, cb);
  var base = partes(path).join('/'), ks = [];
  for (var k in obj) if (obj.hasOwnProperty(k)) ks.push(k);
  // "fase" por último: quem estiver ouvindo já encontra os outros campos prontos
  ks.sort(function(a, b){ return (a === 'fase') - (b === 'fase'); });
  for (var i = 0; i < ks.length; i++) gravarLocalCaminho((base ? base + '/' : '') + ks[i], resolverTS(copiar(obj[ks[i]])));
  avisarLocais(); setTimeout(function(){ if (cb) cb(null); }, 0);
};
Rede.apagar = function(path, cb){
  if (Rede.modo === 'firebase') return req('DELETE', path, undefined, cb);
  gravarLocalCaminho(path, null);
  avisarLocais(); setTimeout(function(){ if (cb) cb(null); }, 0);
};
Rede.ouvir = function(path, cb){                // cb(valorCompleto) a cada mudança
  if (Rede.modo === 'firebase') return ouvirFirebase(path, cb);
  var o = {path: path, cb: cb, ultimo: undefined};
  ouvintesLocais.push(o);
  avisarLocais();
  return { fechar: function(){ var i = ouvintesLocais.indexOf(o); if (i >= 0) ouvintesLocais.splice(i, 1); } };
};

// Gera um código de sala de 4 dígitos que ainda não existe
Rede.novaSala = function(dados, cb){
  var tentativas = 0;
  (function tentar(){
    var codigo = String(1000 + Math.floor(Math.random() * 9000));
    Rede.ler('salas/' + codigo + '/criado', function(err, v){
      if (err) return cb(err);
      if (v && tentativas++ < 10) return tentar();
      dados.criado = Rede.TS;
      Rede.gravar('salas/' + codigo, dados, function(err2){ cb(err2, codigo); });
    });
  })();
};

// Mede a diferença entre o relógio deste aparelho e o do servidor (em ms).
// Assim o telão e os iPads mostram o mesmo cronômetro, mesmo com relógios diferentes.
Rede.offset = 0;
Rede.medirRelogio = function(caminho, cb){
  if (Rede.modo !== 'firebase'){ Rede.offset = 0; if (cb) cb(0); return; }
  var t0 = Date.now();
  req('PUT', caminho, Rede.TS, function(err, v){
    if (err){ if (cb) cb(Rede.offset); return; }
    var terminar = function(valor){
      var t1 = Date.now();
      if (typeof valor === 'number') Rede.offset = valor - Math.round((t0 + t1) / 2);
      if (cb) cb(Rede.offset);
    };
    if (typeof v === 'number') terminar(v);
    else req('GET', caminho, undefined, function(e2, v2){ terminar(e2 ? null : v2); });
  });
};
// Horário "do servidor" calculado neste aparelho
Rede.agora = function(){ return Date.now() + Rede.offset; };

// Equipes prontas para os grupos escolherem
Rede.EQUIPES = [
  {id:'leoes',     nome:'Leões',     emoji:'🦁', cor:'#e74c3c'},
  {id:'golfinhos', nome:'Golfinhos', emoji:'🐬', cor:'#2f80ed'},
  {id:'papagaios', nome:'Papagaios', emoji:'🦜', cor:'#27ae60'},
  {id:'abelhas',   nome:'Abelhas',   emoji:'🐝', cor:'#e6a800'},
  {id:'raposas',   nome:'Raposas',   emoji:'🦊', cor:'#e67e22'},
  {id:'pandas',    nome:'Pandas',    emoji:'🐼', cor:'#8e44ad'}
];

// Normaliza texto para comparar respostas (sem acento, minúsculo, sem espaços extras)
Rede.normalizar = function(t){
  t = String(t || '').toLowerCase();
  var de = 'áàâãäéèêëíìîïóòôõöúùûüçñ', para = 'aaaaaeeeeiiiiooooouuuucn', s = '';
  for (var i = 0; i < t.length; i++){ var j = de.indexOf(t.charAt(i)); s += j >= 0 ? para.charAt(j) : t.charAt(i); }
  return s.replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').replace(/^ | $/g, '');
};

// Converte {"0":"a","1":"b"} em ["a","b"] (o Firebase às vezes devolve listas assim)
Rede.lista = function(v){
  if (!v) return [];
  if (Object.prototype.toString.call(v) === '[object Array]') return v;
  var out = [], ks = Object.keys(v).sort(function(a, b){ return a - b; });
  for (var i = 0; i < ks.length; i++) out.push(v[ks[i]]);
  return out;
};

window.Rede = Rede;
})();
