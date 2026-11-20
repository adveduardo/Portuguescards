/* arcade.js — base comum dos jogos de ação do telão (ES5: funciona também nos iPads antigos).
   Lê o conteúdo que o painel já tem: grupos de palavras (os arquivos dos Cestos) e perguntas
   (bancos completos, quizzes e atividades de escolha). Também traz equipes, placar, tela e sons. */
(function(){
  'use strict';
  var ARC = {};
  ARC.$ = function(id){ return document.getElementById(id); };
  ARC.esc = function(t){ return String(t == null ? '' : t).replace(/[&<>"]/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); };
  ARC.aleat = function(a, b){ return a + Math.random() * (b - a); };
  ARC.sortear = function(l){ return l[Math.floor(Math.random() * l.length)]; };
  ARC.embaralhar = function(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  ARC.param = function(n){ var m = location.search.match(new RegExp('[?&]' + n + '=([^&]*)')); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; };
  ARC.semAcento = function(t){
    var de = 'áàâãäéèêëíìîïóòôõöúùûüçñ', para = 'aaaaaeeeeiiiiooooouuuucn', s = '', i, j; t = String(t).toLowerCase();
    for (i = 0; i < t.length; i++){ j = de.indexOf(t.charAt(i)); s += j >= 0 ? para.charAt(j) : t.charAt(i); }
    return s;
  };
  ARC.json = function(url, ok, falha){
    var x = new XMLHttpRequest();
    x.onreadystatechange = function(){
      if (x.readyState !== 4) return;
      if (x.status === 200 || (x.status === 0 && x.responseText)){ var d = null; try { d = JSON.parse(x.responseText); } catch (e) {} if (d) ok(d); else if (falha) falha(); }
      else if (falha) falha();
    };
    try { x.open('GET', url + (url.indexOf('?') < 0 ? '?' : '&') + 'v=' + new Date().getTime(), true); x.send(); } catch (e) { if (falha) falha(); }
  };
  ARC.tela = function(id){ var ts = document.querySelectorAll('.tela'); for (var i = 0; i < ts.length; i++) ts[i].className = 'tela' + (ts[i].id === id ? ' ativa' : ''); };
  var avisoT = null;
  ARC.aviso = function(html, ms){ var a = ARC.$('aviso'); if (!a) return; a.innerHTML = html; a.style.display = 'block'; clearTimeout(avisoT); avisoT = setTimeout(function(){ a.style.display = 'none'; }, ms || 2200); };

  // ---------- sons (respeitam o botão de som do Painel) ----------
  ARC.tom = function(f, d, q, t){ if (window.Sala) Sala.tom(f, d, q, t); };
  ARC.plim = function(){ if (window.Sala) Sala.plim(); };
  ARC.erro = function(){ ARC.tom(260, 0.18, 0, 'sawtooth'); ARC.tom(190, 0.25, 0.14, 'sawtooth'); };
  ARC.festa = function(){ if (window.Sala){ Sala.festa(); Sala.confete(); } };

  // ---------- equipes ----------
  ARC.EQUIPES = [{nome: 'Leões', emoji: '🦁', cor: '#e74c3c'}, {nome: 'Golfinhos', emoji: '🐬', cor: '#2f80ed'}, {nome: 'Pandas', emoji: '🐼', cor: '#27ae60'}, {nome: 'Abelhas', emoji: '🐝', cor: '#e6a800'}];
  ARC.criarEquipes = function(n){ var l = []; for (var i = 0; i < n; i++) l.push({nome: ARC.EQUIPES[i].nome, emoji: ARC.EQUIPES[i].emoji, cor: ARC.EQUIPES[i].cor, pontos: 0}); return l; };
  ARC.placarHTML = function(eqs, destaque){
    return eqs.map(function(e, i){ return '<div style="background:' + e.cor + (destaque === i ? ';outline:4px solid #ffd54a' : '') + '">' + e.emoji + ' ' + ARC.esc(e.nome) + '<small>' + e.pontos + '</small></div>'; }).join('');
  };
  ARC.ranking = function(eqs){ return eqs.map(function(e, i){ return {e: e, i: i}; }).sort(function(a, b){ return b.e.pontos - a.e.pontos; }); };

  // ---------- grupos de palavras (arquivos dos Cestos) ----------
  ARC.CLASSES = {
    substantivo: {nome: 'Substantivo', plural: 'SUBSTANTIVOS', cor: '#2f80ed'}, adjetivo: {nome: 'Adjetivo', plural: 'ADJETIVOS', cor: '#27ae60'},
    verbo: {nome: 'Verbo', plural: 'VERBOS', cor: '#e74c3c'}, artigo: {nome: 'Artigo', plural: 'ARTIGOS', cor: '#8e44ad'},
    pronome: {nome: 'Pronome', plural: 'PRONOMES', cor: '#e67e22'}, numeral: {nome: 'Numeral', plural: 'NUMERAIS', cor: '#16a085'},
    adverbio: {nome: 'Advérbio', plural: 'ADVÉRBIOS', cor: '#c2185b'}, preposicao: {nome: 'Preposição', plural: 'PREPOSIÇÕES', cor: '#795548'},
    conjuncao: {nome: 'Conjunção', plural: 'CONJUNÇÕES', cor: '#546e7a'}, interjeicao: {nome: 'Interjeição', plural: 'INTERJEIÇÕES', cor: '#b7791f'}
  };
  var CODIGOS = {s: 'substantivo', a: 'adjetivo', v: 'verbo', t: 'artigo', p: 'pronome', n: 'numeral', d: 'adverbio', r: 'preposicao', c: 'conjuncao', i: 'interjeicao'};
  var CORES = ['#2f80ed', '#e74c3c', '#27ae60', '#e67e22', '#8e44ad', '#16a085', '#c2185b', '#795548'];
  function codigoClasse(c){
    var k = ARC.semAcento(String(c || '')).replace(/[^a-z]/g, '');
    if (CODIGOS[k]) return CODIGOS[k];
    for (var id in ARC.CLASSES) if (ARC.semAcento(id) === k || ARC.semAcento(ARC.CLASSES[id].nome) === k) return id;
    return '';
  }
  ARC.normalizarCategorias = function(d){
    var cats = {}, pal = [];
    if (d && d.cestos && d.cestos.length){
      d.cestos.forEach(function(c, i){ var id = String(c.id || c.nome); cats[id] = {nome: String(c.nome || id), plural: String(c.nome || id).toUpperCase(), cor: c.cor || CORES[i % CORES.length], emoji: c.emoji || ''}; });
      (d.palavras || []).forEach(function(p){ var id = String(p.cesto || p.classe || ''); if (p.palavra && cats[id]) pal.push({t: String(p.palavra), c: id}); });
    } else {
      (d && d.palavras || []).forEach(function(p){ var id = codigoClasse(p.classe); if (p.palavra && id){ if (!cats[id]) cats[id] = ARC.CLASSES[id]; pal.push({t: String(p.palavra), c: id}); } });
    }
    var conta = {}; pal.forEach(function(p){ conta[p.c] = (conta[p.c] || 0) + 1; });
    var boas = Object.keys(cats).filter(function(id){ return conta[id] >= 3; });
    if (boas.length < 2) return null;
    return {titulo: d.titulo || 'Palavras', cats: cats, palavras: pal, alvos: boas, conta: conta};
  };

  // ---------- perguntas (bancos, quizzes e atividades de escolha) ----------
  ARC.normalizarPerguntas = function(d, op){
    op = op || {}; var maxOps = op.maxOps || 4, maxLen = op.maxLen || 9999, maxOpLen = op.maxOpLen || 9999, out = [];
    function add(p, ops, correta, x, img){
      ops = (ops || []).map(String).filter(function(o){ return o; });
      if (ops.length < 2 || !p) return;
      var ok = typeof correta === 'number' ? correta : -1;
      if (ok < 0 && correta != null){ var alvo = ARC.semAcento(correta); for (var i = 0; i < ops.length; i++) if (ARC.semAcento(ops[i]) === alvo) ok = i; }
      if (ok < 0 || ok >= ops.length) return;
      if (String(p).length > maxLen) return;
      var certa = ops[ok], outras = ARC.embaralhar(ops.filter(function(o, i){ return i !== ok; })).slice(0, maxOps - 1);
      if ([certa].concat(outras).some(function(o){ return o.length > maxOpLen; })) return;
      var lista = ARC.embaralhar([certa].concat(outras));
      out.push({p: String(p), ops: lista, ok: lista.indexOf(certa), x: x ? String(x) : '', img: img || ''});
    }
    (d && d.perguntas || []).forEach(function(q){ if (q && q.pergunta && q.opcoes) add(q.pergunta, q.opcoes, q.correta, q.explica, q.imagem); });
    (d && d.rodadas || []).forEach(function(r){
      if (!r || !r.destaque || !r.opcoes || r.ouvir) return;
      var enun = String(r.enunciado || d.instrucao || '').replace(/^\s+|\s+$/g, ''), dest = String(r.destaque).replace(/\[([^\]]+)\]/g, '“$1”');
      add(enun ? (/[?:]$/.test(enun) ? enun + ' ' : enun + ': ') + dest : dest, r.opcoes, r.correta, r.explica, r.imagem);
    });
    return out;
  };

  // ---------- seletor de conteúdo (lê o dados/indice.json) ----------
  var NOMES = {'banco': '⭐ Bancos completos', 'quiz': '🏆 Quizzes prontos', 'morfo-cestos': '📦 Grupos de palavras (Cestos)',
    'escolha-sint': 'Sintaxe (revisão)', 'escolha-an': 'Análise sintática', 'escolha-pc': 'Período composto', 'escolha-rg': 'Regência', 'escolha-cr': 'Crase',
    'escolha-cc': 'Concordância', 'escolha-cl': 'Colocação pronominal', 'escolha-verbo': 'Verbo', 'escolha-adj': 'Adjetivo', 'escolha-num': 'Numeral',
    'escolha-prep': 'Preposição', 'escolha-conj': 'Conjunção', 'escolha-interj': 'Interjeição', 'escolha-inv': 'Invariáveis', 'escolha-interp': 'Interpretação de texto',
    'escolha-red': 'Redação', 'escolha-fo': 'Fonologia', 'escolha-or': 'Ortografia', 'escolha-ac': 'Acentuação gráfica', 'escolha-pt': 'Pontuação',
    'escolha-sg': 'Significação das palavras', 'escolha-em': 'Ensino Médio / ENEM', 'escolha-en': '🇬🇧 Inglês', 'escolha-es': '🇪🇸 Espanhol', 'escolha-qs': 'As palavras QUE e SE',
    'escolha-fg': 'Figuras de linguagem', 'escolha-vida': '🌱 Projeto de Vida (EJA)', 'escolha-mat': '🔢 Matemática', 'escolha-alfa': 'Alfabetização', 'detetive': '🕵️ Detetive (palavra errada)',
    'leitura': '🎤 Textos para ler', 'listas': '📝 Listas de palavras', 'morfo-frases': '🖍️ Frases (Pinte a frase)', 'silaba': '🔤 Sílaba tônica'};
  // modo: 'categorias' (Cestos), 'perguntas' (bancos, quizzes e escolha), 'detetive', 'leitura' (textos e listas),
  // 'palavras' (listas e Cestos) ou 'frases' (Pinte a frase e textos para ler)
  ARC.seletor = function(sel, modo, padrao, aoEscolher){
    ARC.json('dados/indice.json', function(ind){
      var chaves = modo === 'categorias' ? ['morfo-cestos'] : modo === 'detetive' ? ['detetive'] : modo === 'leitura' ? ['leitura', 'listas'] : modo === 'palavras' ? ['listas', 'morfo-cestos'] : modo === 'frases' ? ['morfo-frases', 'leitura'] : modo === 'silabas' ? ['silaba', 'listas']
        : ['banco', 'quiz'].concat(Object.keys(ind).filter(function(k){ return k.indexOf('escolha-') === 0; }));
      var pedido = ARC.param('arquivo'), h = '', achou = false;
      chaves.forEach(function(k){
        var l = ind[k] || []; if (!l.length) return;
        h += '<optgroup label="' + ARC.esc(NOMES[k] || k) + '">' + l.map(function(e){ if (e.arquivo === pedido) achou = true;
          return '<option value="' + ARC.esc(e.arquivo) + '">' + ARC.esc(e.titulo || e.arquivo) + (e.qtd ? ' (' + e.qtd + ')' : '') + '</option>'; }).join('') + '</optgroup>';
      });
      if (pedido && !achou && /^[\w.-]+\.json$/.test(pedido)) h = '<option value="' + ARC.esc(pedido) + '">' + ARC.esc(pedido) + '</option>' + h;
      sel.innerHTML = h;
      sel.value = pedido && /^[\w.-]+\.json$/.test(pedido) ? pedido : padrao;
      if (!sel.value && sel.options.length) sel.selectedIndex = 0;
      sel.onchange = function(){ aoEscolher(sel.value); };
      aoEscolher(sel.value);
    }, function(){ sel.innerHTML = '<option value="' + ARC.esc(padrao) + '">' + ARC.esc(padrao) + '</option>'; aoEscolher(padrao); });
  };

  // ---------- sorteio com semente (ex.: "desafio do dia": a mesma escolha em todas as turmas no mesmo dia) ----------
  ARC.rng = function(texto){
    var h = 1779033703 ^ String(texto).length, i;
    for (i = 0; i < String(texto).length; i++){ h = Math.imul ? Math.imul(h ^ String(texto).charCodeAt(i), 3432918353) : (h ^ String(texto).charCodeAt(i)) * 3432918353; h = (h << 13) | (h >>> 19); }
    var a = h >>> 0;
    return function(){   // mulberry32
      a = (a + 0x6D2B79F5) | 0; var t = a;
      t = Math.imul ? Math.imul(t ^ (t >>> 15), t | 1) : (t ^ (t >>> 15)) * (t | 1);
      t ^= t + (Math.imul ? Math.imul(t ^ (t >>> 7), t | 61) : (t ^ (t >>> 7)) * (t | 61));
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  ARC.hoje = function(){ var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
  // palavras de qualquer arquivo de listas ou dos Cestos: [{t, dica, emoji}]
  ARC.normalizarPalavras = function(d, grupo){
    var l = [];
    function add(p, g){ var w = typeof p === 'string' ? p : p && p.palavra; if (w) l.push({t: String(w), emoji: p && p.emoji || '', dica: p && p.dica || '', silabas: p && p.silabas || '', grupo: g || ''}); }
    (d.grupos || []).forEach(function(g, gi){ if (grupo !== '' && grupo != null && +grupo !== gi) return; (g.palavras || []).forEach(function(p){ add(p, g.titulo); }); });
    if (d.palavras && (d.cestos || (d.palavras[0] && d.palavras[0].classe))){
      var c = ARC.normalizarCategorias(d);
      if (c) c.palavras.forEach(function(p){ l.push({t: p.t, emoji: '', dica: 'Grupo: ' + c.cats[p.c].nome, silabas: '', grupo: c.cats[p.c].nome}); });
    } else (d.palavras || []).forEach(function(p){ add(p); });
    return l;
  };

  // ---------- iPads antigos: o iOS 9 só mostra emoji até o Unicode 8 (os mais novos viram quadradinho) ----------
  ARC.iosAntigo = /\b(iPad|iPhone|iPod)\b/.test(navigator.userAgent) && /OS [5-9]_\d/.test(navigator.userAgent);
  ARC.emojiNovo = function(t){
    t = String(t || '');
    for (var i = 0; i < t.length; i++){
      var c = t.charCodeAt(i), cp = c;
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < t.length){ cp = (c - 0xD800) * 0x400 + (t.charCodeAt(i + 1) - 0xDC00) + 0x10000; i++; }
      if (cp === 0x200D) return true;
      if (cp >= 0x1F900 && cp <= 0x1F9FF && !(cp >= 0x1F910 && cp <= 0x1F918 || cp >= 0x1F980 && cp <= 0x1F984 || cp === 0x1F9C0)) return true;
      if (cp >= 0x1FA00 && cp <= 0x1FAFF || cp >= 0x1F6D1 && cp <= 0x1F6DF || cp >= 0x1F6F4 && cp <= 0x1F6FF) return true;
      if (cp === 0x1F57A || cp === 0x1F5A4 || cp >= 0x1F7E0 && cp <= 0x1F7FF) return true;
    }
    return false;
  };
  ARC.figuraOk = function(e){ return !ARC.iosAntigo || !ARC.emojiNovo(e); };

  // ---------- canvas ----------
  ARC.canvas = function(cv, aoMedir){
    var o = {cv: cv, ctx: cv.getContext('2d'), W: 0, H: 0, ESC: 1};
    function medir(avisar){
      var dpr = window.devicePixelRatio || 1;
      o.W = window.innerWidth; o.H = window.innerHeight; o.ESC = Math.max(0.55, Math.min(1.5, Math.min(o.W, o.H) / 700));
      cv.width = Math.round(o.W * dpr); cv.height = Math.round(o.H * dpr); o.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (avisar !== false && aoMedir) aoMedir(o);
    }
    window.addEventListener('resize', function(){ medir(); });
    medir(false);   // a primeira medida não chama aoMedir: a página ainda está montando as suas variáveis
    o.medir = medir;
    return o;
  };
  ARC.rrect = function(ctx, x, y, w, h, r){
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  };
  // ajusta o tamanho da letra para caber em maxW; devolve o tamanho usado (o ctx.font já fica pronto)
  ARC.fonte = function(ctx, t, maxW, tam, peso){
    peso = peso || 'bold';
    ctx.font = peso + ' ' + tam + 'px "Trebuchet MS", Arial, sans-serif';
    while (ctx.measureText(t).width > maxW && tam > 10){ tam--; ctx.font = peso + ' ' + tam + 'px "Trebuchet MS", Arial, sans-serif'; }
    return tam;
  };
  // quebra um texto em linhas que cabem em maxW
  ARC.linhas = function(ctx, t, maxW){
    var ps = String(t).split(/\s+/), l = [], atual = '';
    ps.forEach(function(p){ var tenta = atual ? atual + ' ' + p : p; if (ctx.measureText(tenta).width > maxW && atual){ l.push(atual); atual = p; } else atual = tenta; });
    if (atual) l.push(atual);
    return l;
  };
  // laço de animação com pausa; fn(dt em segundos)
  ARC.laco = function(fn){
    var o = {rodando: false, pausado: false, ult: 0};
    function passo(ts){
      if (!o.rodando) return;
      var dt = o.ult ? Math.min(0.05, (ts - o.ult) / 1000) : 0; o.ult = ts;
      if (!o.pausado) fn(dt); else fn(0);
      window.requestAnimationFrame(passo);
    }
    o.iniciar = function(){ if (o.rodando) return; o.rodando = true; o.ult = 0; window.requestAnimationFrame(passo); };
    o.parar = function(){ o.rodando = false; };
    return o;
  };
  window.ARC = ARC;
})();
