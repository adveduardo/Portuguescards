/* ingles.js — voz em inglês e leitura de arquivos para as telas de Inglês (ES5: funciona nos iPads antigos).
   Usa o botão de som do Painel (Sala.somLigado), quando a página também carrega o sala.js. */
(function(){
  'use strict';
  var EN = {}, vozes = [];
  EN.lang = 'en-US';   // idioma padrão da voz (as telas abertas com ?lingua=es trocam para 'es-ES')
  function carregarVozes(){ try { vozes = window.speechSynthesis ? window.speechSynthesis.getVoices() : []; } catch (e) { vozes = []; } }
  carregarVozes();
  try { if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = carregarVozes; } catch (e) {}

  EN.voz = function(lang){
    var alvo = String(lang || 'en-US').toLowerCase().replace('_', '-'), base = alvo.slice(0, 2), i, l;
    if (!vozes.length) carregarVozes();
    for (i = 0; i < vozes.length; i++){ l = String(vozes[i].lang).toLowerCase().replace('_', '-'); if (l === alvo) return vozes[i]; }
    for (i = 0; i < vozes.length; i++){ l = String(vozes[i].lang).toLowerCase(); if (l.indexOf(base) === 0) return vozes[i]; }
    return null;
  };
  EN.temSom = function(){ return !(window.Sala && window.Sala.somLigado && !window.Sala.somLigado()); };
  // fala um texto; op: {lang, rate, pitch, aoFim}
  EN.falar = function(texto, op){
    op = op || {};
    var fim = op.aoFim || null;
    if (!EN.temSom() || !window.speechSynthesis || !window.SpeechSynthesisUtterance){ if (fim) setTimeout(fim, 0); return; }
    try {
      if (!op.fila) window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(texto).replace(/…/g, '...'));
      u.lang = op.lang || EN.lang || 'en-US'; u.rate = op.rate || 0.9; u.pitch = op.pitch || 1;
      var v = EN.voz(u.lang); if (v) u.voice = v;
      if (fim){ u.onend = fim; u.onerror = fim; }
      window.speechSynthesis.speak(u);
    } catch (e) { if (fim) setTimeout(fim, 0); }
  };
  EN.calar = function(){ try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {} };
  EN.json = function(url, cb){
    var x = new XMLHttpRequest();
    x.open('GET', url + (url.indexOf('?') < 0 ? '?' : '&') + 'v=' + new Date().getTime(), true);
    x.onreadystatechange = function(){
      if (x.readyState !== 4) return;
      var d = null;
      if (x.status === 200 || (x.status === 0 && x.responseText)){ try { d = JSON.parse(x.responseText); } catch (e) { d = null; } }
      cb(d ? null : new Error('Não consegui abrir ' + url), d);
    };
    try { x.send(); } catch (e) { cb(e, null); }
  };
  EN.param = function(n){ var m = location.search.match(new RegExp('[?&]' + n + '=([^&]*)')); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; };
  EN.embaralhar = function(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  EN.semAcento = function(t){
    var de = 'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ', para = 'aaaaaeeeeiiiiooooouuuucnAAAAAEEEEIIIIOOOOOUUUUCN', s = '', i, j;
    t = String(t); for (i = 0; i < t.length; i++){ j = de.indexOf(t.charAt(i)); s += j >= 0 ? para.charAt(j) : t.charAt(i); }
    return s;
  };
  // ?lingua=es: as telas de Inglês (flashcards, role-play) também servem para o Espanhol
  EN.LINGUAS = {en: {cod: 'en', voz: 'en-US', nome: 'inglês', Nome: 'Inglês', bandeira: '🇬🇧'}, es: {cod: 'es', voz: 'es-ES', nome: 'espanhol', Nome: 'Espanhol', bandeira: '🇪🇸'}};
  EN.lingua = function(){ var l = EN.LINGUAS[EN.param('lingua')] || EN.LINGUAS.en; EN.lang = l.voz; return l; };
  window.EN = EN;
})();
