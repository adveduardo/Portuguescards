/* Utilidades das atividades de inclusão e das telas usadas direto no iPad.
   Escrito em JavaScript antigo (ES5) para funcionar também no iPad mini 1 (iOS 9). */
(function(){
'use strict';
var A = {};
A.$ = function(id){ return document.getElementById(id); };
A.esc = function(t){ return String(t == null ? '' : t).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
A.param = function(nome){
  var m = new RegExp('[?&]' + nome + '=([^&#]*)').exec(location.search);
  return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
};
A.ler = function(chave){ try { return JSON.parse(localStorage.getItem(chave)); } catch (e) { return null; } };
A.guardar = function(chave, v){ try { localStorage.setItem(chave, JSON.stringify(v)); } catch (e) {} };
A.embaralhar = function(a){
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
};
A.sorteio = function(a){ return a[Math.floor(Math.random() * a.length)]; };
A.carregarJSON = function(url, cb){
  var x = new XMLHttpRequest();
  x.open('GET', url + (url.indexOf('?') < 0 ? '?' : '&') + 'v=' + Date.now(), true);
  x.onreadystatechange = function(){
    if (x.readyState !== 4) return;
    if (x.status >= 200 && x.status < 300 || (x.status === 0 && x.responseText)){
      try { cb(null, JSON.parse(x.responseText)); } catch (e) { cb(e); }
    } else cb(new Error('Não abriu ' + url));
  };
  x.send();
};

// ---------- Visual calmo (guardado neste aparelho; o painel usa a mesma escolha) ----------
var modo = null;
try { modo = localStorage.getItem('painel_visual'); } catch (e) {}
A.calmo = modo === 'calmo' || A.param('calmo') === '1';
function aplicarCalmo(){
  var h = document.documentElement;
  h.className = h.className.replace(/\s*\bcalmo\b/g, '') + (A.calmo ? ' calmo' : '');
}
aplicarCalmo();
A.alternarCalmo = function(){
  A.calmo = !A.calmo;
  try { localStorage.setItem('painel_visual', A.calmo ? 'calmo' : 'adulto'); } catch (e) {}
  aplicarCalmo();
  var b = A.$('apoioBtnCalmo'); if (b) b.textContent = A.calmo ? '🌙' : '☀️';
  return A.calmo;
};

// ---------- Voz ----------
var vozPt = null;
function escolherVoz(){
  if (!window.speechSynthesis) return;
  var vs = speechSynthesis.getVoices(), i;
  for (i = 0; i < vs.length; i++) if (/pt[-_]BR/i.test(vs[i].lang)){ vozPt = vs[i]; return; }
  for (i = 0; i < vs.length; i++) if (/^pt/i.test(vs[i].lang)){ vozPt = vs[i]; return; }
}
if (window.speechSynthesis){ escolherVoz(); try { speechSynthesis.onvoiceschanged = escolherVoz; } catch (e) {} }
A.vozLigada = true;
// tira os emojis antes de falar (a voz leria o nome da figura)
A.semEmoji = function(t){
  return String(t).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[←-⇿⌀-➿⬀-⯿]|[️‍⃣]/g, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
};
A.falar = function(texto, op){
  op = op || {};
  if (!A.vozLigada || !window.speechSynthesis || !window.SpeechSynthesisUtterance) { if (op.aoTerminar) setTimeout(op.aoTerminar, 400); return; }
  var t = A.semEmoji(texto);
  if (!t){ if (op.aoTerminar) op.aoTerminar(); return; }
  if (!op.semCancelar) speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(t);
  u.lang = 'pt-BR'; u.rate = op.rate || (A.calmo ? .8 : .9);
  if (vozPt) u.voice = vozPt;
  if (op.aoTerminar){ var feito = false; u.onend = function(){ if (!feito){ feito = true; op.aoTerminar(); } }; }
  speechSynthesis.speak(u);
};

// ---------- Sons suaves ----------
var ac = null;
A.somLigado = true;
A.tom = function(freq, dur, vol, atraso){
  if (!A.somLigado) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended' && ac.resume) ac.resume();
    var o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + (atraso || 0);
    o.type = 'sine'; o.frequency.setValueAtTime(freq, t0);
    var v = (vol || .12) * (A.calmo ? .4 : 1);
    g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + (dur || .15));
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + (dur || .15) + .03);
  } catch (e) {}
};
A.som = function(tipo){
  if (tipo === 'ok'){ A.tom(660, .14); A.tom(880, .2, .12, .12); }
  else if (tipo === 'fim'){ A.tom(523, .2); A.tom(659, .2, .12, .14); A.tom(784, .3, .12, .28); }
  else if (tipo === 'erro'){ if (!A.calmo) A.tom(300, .18, .06); }
  else A.tom(900, .05, .06);
};

// ---------- Comemoração calma ----------
var timerCel = null;
A.celebrar = function(texto, emoji, ms){
  var c = A.$('apoioCelebra');
  if (!c){ c = document.createElement('div'); c.id = 'apoioCelebra'; document.body.appendChild(c); c.onclick = function(){ c.className = ''; }; }
  c.innerHTML = '<div><span>' + A.esc(emoji || '⭐') + '</span>' + A.esc(texto || 'Muito bem!') + '</div>';
  c.className = 'mostrar';
  A.som('fim');
  clearTimeout(timerCel);
  timerCel = setTimeout(function(){ c.className = ''; }, ms || 1800);
};

// ---------- Botões do canto: início (só fora do painel) e visual calmo ----------
A.foraDoPainel = (function(){ try { return window.self === window.top; } catch (e) { return false; } })();
A.montarTopo = function(){
  if (A.$('apoioTopo')) return;
  var d = document.createElement('div'); d.id = 'apoioTopo'; d.className = 'topoApoio';
  var html = '<button id="apoioBtnCalmo" type="button" title="Visual calmo: sem animações e com sons mais baixos">' + (A.calmo ? '🌙' : '☀️') + '</button>';
  if (A.foraDoPainel && !/ipad\.html/.test(location.pathname)) html += '<a href="ipad.html" title="Voltar ao início">🏠</a>';
  d.innerHTML = html;
  document.body.appendChild(d);
  A.$('apoioBtnCalmo').onclick = A.alternarCalmo;
};
A.mostrarTela = function(id){
  var ts = document.querySelectorAll('.tela');
  for (var i = 0; i < ts.length; i++) ts[i].className = ts[i].className.replace(/\s*\bativa\b/g, '') + (ts[i].id === id ? ' ativa' : '');
  window.scrollTo(0, 0);
};
// liga cliques em vários elementos de uma vez: A.cliques(container, 'button[data-i]', fn(el))
A.cliques = function(raiz, seletor, fn){
  var els = raiz.querySelectorAll(seletor);
  for (var i = 0; i < els.length; i++) (function(el){ el.onclick = function(ev){ fn(el, ev); }; })(els[i]);
};
A.cada = function(lista, fn){ for (var i = 0; i < lista.length; i++) fn(lista[i], i); };

// ---------- Emojis em iPads antigos ----------
// O iPad mini 1 (iOS 9) e o mini 2 (iOS 12) não têm os emojis mais novos e mostrariam um quadradinho vazio.
// Nesses aparelhos, cada emoji novo é trocado por um parecido e antigo. Nos aparelhos novos nada muda.
var TROCA = {'🥶':'❄️','🥵':'🔥','🤩':'😃','🥰':'😍','🧑‍🤝‍🧑':'👫','🧸':'🐻','🧩':'🎯','🧱':'🏰','🧼':'🛁','🧻':'📄','🧥':'👕','🧘':'🌬️',
  '🦘':'🐰','🦩':'🐦','🪑':'💺','🦖':'🐲','👩‍🏫':'👩','👨‍🏫':'👨','🤸':'🏃','🥁':'🎵','🦶':'👣','🛒':'🏪','🤝':'👫','🧹':'✨','🧑':'👤',
  '🟢':'💚','🟡':'💛','🟠':'🔶','🟣':'💜','🦆':'🐤','🥕':'🌽','🦋':'🐛','🦊':'🐶','🥦':'🌲','🥒':'🌲','🧢':'👖','🥚':'🍳','🥛':'🍼','🪶':'🐦','🪁':'🎏'};
var trocas = null;
A.temEmoji = function(e){
  try {
    var c = document.createElement('canvas'); c.width = 64; c.height = 32;
    var x = c.getContext('2d');
    x.font = '24px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textBaseline = 'top';
    if (e.indexOf('‍') >= 0){ var umaParte = e.split('‍')[0]; if (x.measureText(e).width > x.measureText(umaParte).width * 1.5) return false; }
    x.fillText(e, 0, 0);
    var d = x.getImageData(0, 0, 64, 32).data;
    for (var i = 0; i < d.length; i += 4) if (d[i + 3] > 60 && (Math.abs(d[i] - d[i + 1]) > 25 || Math.abs(d[i] - d[i + 2]) > 25)) return true;
    return false;
  } catch (err) { return true; }
};
function trocarTexto(t){ for (var i = 0; i < trocas.length; i++) if (t.indexOf(trocas[i][0]) >= 0) t = t.split(trocas[i][0]).join(trocas[i][1]); return t; }
function varrer(no){
  if (no.nodeType === 3){ var v = trocarTexto(no.nodeValue); if (v !== no.nodeValue) no.nodeValue = v; return; }
  if (no.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(no.tagName)) return;
  for (var c = no.firstChild; c; c = c.nextSibling) varrer(c);
}
A.emoji = function(e){ return trocas ? trocarTexto(e) : e; };
function prepararEmojis(){
  trocas = [];
  for (var k in TROCA) if (TROCA.hasOwnProperty(k) && !A.temEmoji(k)) trocas.push([k, TROCA[k]]);
  if (!trocas.length) return;
  varrer(document.body);
  if (window.MutationObserver) new MutationObserver(function(ms){
    for (var i = 0; i < ms.length; i++){
      if (ms[i].type === 'characterData') varrer(ms[i].target);
      for (var j = 0; j < ms[i].addedNodes.length; j++) varrer(ms[i].addedNodes[j]);
    }
  }).observe(document.body, {childList: true, subtree: true, characterData: true});
}

window.Apoio = A;
function iniciar(){ A.montarTopo(); prepararEmojis(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
