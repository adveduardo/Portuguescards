/* Animais das equipes: o professor escolhe os animais de cada equipe ou pede animais aleatórios.
   A escolha fica guardada neste aparelho e vale para todos os jogos com equipes.
   Animais.equipes(n) devolve [{nome, emoji, cor, art}] e um botão "🐾 Animais" aparece ao lado de "Equipes".
   ES5 e emojis até o Unicode 8 (iPads antigos). */
(function(){
  if (window.Animais) return;
  var LISTA = [
    {id: 'leoes', nome: 'Leões', emoji: '🦁', art: 'dos'}, {id: 'golfinhos', nome: 'Golfinhos', emoji: '🐬', art: 'dos'},
    {id: 'pandas', nome: 'Pandas', emoji: '🐼', art: 'dos'}, {id: 'abelhas', nome: 'Abelhas', emoji: '🐝', art: 'das'},
    {id: 'tigres', nome: 'Tigres', emoji: '🐯', art: 'dos'}, {id: 'ursos', nome: 'Ursos', emoji: '🐻', art: 'dos'},
    {id: 'hamsters', nome: 'Hamsters', emoji: '🐹', art: 'dos'}, {id: 'sapos', nome: 'Sapos', emoji: '🐸', art: 'dos'},
    {id: 'pinguins', nome: 'Pinguins', emoji: '🐧', art: 'dos'}, {id: 'coalas', nome: 'Coalas', emoji: '🐨', art: 'dos'},
    {id: 'macacos', nome: 'Macacos', emoji: '🐵', art: 'dos'}, {id: 'elefantes', nome: 'Elefantes', emoji: '🐘', art: 'dos'},
    {id: 'tartarugas', nome: 'Tartarugas', emoji: '🐢', art: 'das'}, {id: 'polvos', nome: 'Polvos', emoji: '🐙', art: 'dos'},
    {id: 'baleias', nome: 'Baleias', emoji: '🐳', art: 'das'}, {id: 'coelhos', nome: 'Coelhos', emoji: '🐰', art: 'dos'},
    {id: 'gatos', nome: 'Gatos', emoji: '🐱', art: 'dos'}, {id: 'cachorros', nome: 'Cachorros', emoji: '🐶', art: 'dos'},
    {id: 'cavalos', nome: 'Cavalos', emoji: '🐴', art: 'dos'}, {id: 'unicornios', nome: 'Unicórnios', emoji: '🦄', art: 'dos'},
    {id: 'jacares', nome: 'Jacarés', emoji: '🐊', art: 'dos'}, {id: 'joaninhas', nome: 'Joaninhas', emoji: '🐞', art: 'das'},
    {id: 'caranguejos', nome: 'Caranguejos', emoji: '🦀', art: 'dos'}, {id: 'lobos', nome: 'Lobos', emoji: '🐺', art: 'dos'},
    {id: 'porquinhos', nome: 'Porquinhos', emoji: '🐷', art: 'dos'}, {id: 'galinhas', nome: 'Galinhas', emoji: '🐔', art: 'das'},
    {id: 'passarinhos', nome: 'Passarinhos', emoji: '🐦', art: 'dos'}, {id: 'cobras', nome: 'Cobras', emoji: '🐍', art: 'das'},
    {id: 'caracois', nome: 'Caracóis', emoji: '🐌', art: 'dos'}, {id: 'escorpioes', nome: 'Escorpiões', emoji: '🦂', art: 'dos'},
    {id: 'vacas', nome: 'Vacas', emoji: '🐮', art: 'das'}, {id: 'camelos', nome: 'Camelos', emoji: '🐫', art: 'dos'},
    {id: 'ratinhos', nome: 'Ratinhos', emoji: '🐭', art: 'dos'}, {id: 'javalis', nome: 'Javalis', emoji: '🐗', art: 'dos'},
    {id: 'ovelhas', nome: 'Ovelhas', emoji: '🐑', art: 'das'}, {id: 'cabras', nome: 'Cabras', emoji: '🐐', art: 'das'},
    {id: 'galos', nome: 'Galos', emoji: '🐓', art: 'dos'}, {id: 'pintinhos', nome: 'Pintinhos', emoji: '🐤', art: 'dos'},
    {id: 'perus', nome: 'Perus', emoji: '🦃', art: 'dos'}, {id: 'peixes', nome: 'Peixes', emoji: '🐟', art: 'dos'},
    {id: 'peixinhos', nome: 'Peixinhos', emoji: '🐠', art: 'dos'}, {id: 'baiacus', nome: 'Baiacus', emoji: '🐡', art: 'dos'},
    {id: 'formigas', nome: 'Formigas', emoji: '🐜', art: 'das'}, {id: 'lagartas', nome: 'Lagartas', emoji: '🐛', art: 'das'},
    {id: 'dragoes', nome: 'Dragões', emoji: '🐲', art: 'dos'}, {id: 'bois', nome: 'Bois', emoji: '🐂', art: 'dos'},
    {id: 'bufalos', nome: 'Búfalos', emoji: '🐃', art: 'dos'}, {id: 'oncas', nome: 'Onças', emoji: '🐆', art: 'das'},
    {id: 'esquilos', nome: 'Esquilos', emoji: '🐿️', art: 'dos'}, {id: 'pombas', nome: 'Pombas', emoji: '🕊️', art: 'das'},
    {id: 'aranhas', nome: 'Aranhas', emoji: '🕷️', art: 'das'}, {id: 'carneiros', nome: 'Carneiros', emoji: '🐏', art: 'dos'}
  ];
  var CORES = ['#e74c3c', '#2f80ed', '#27ae60', '#e6a800'];
  var PADRAO = ['leoes', 'golfinhos', 'pandas', 'abelhas'];
  var CHAVE = 'equipes_animais';
  var porId = {};
  for (var i = 0; i < LISTA.length; i++) porId[LISTA[i].id] = LISTA[i];

  function ler(){
    var c = null;
    try { c = JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) {}
    if (!c || (c.modo !== 'escolhidos' && c.modo !== 'aleatorio' && c.modo !== 'padrao')) c = {modo: 'padrao'};
    if (!(c.ids instanceof Array) || c.ids.length < 4) c.ids = PADRAO.slice();
    for (var k = 0; k < 4; k++) if (!porId[c.ids[k]]) c.ids[k] = PADRAO[k];
    return c;
  }
  function gravar(c){ try { localStorage.setItem(CHAVE, JSON.stringify(c)); } catch (e) {} }
  function embaralhar(a){ a = a.slice(); for (var k = a.length - 1; k > 0; k--){ var j = Math.floor(Math.random() * (k + 1)), t = a[k]; a[k] = a[j]; a[j] = t; } return a; }

  // aleatórios: sorteados uma vez por tela (assim o placar não muda no meio do jogo); "Sortear de novo" troca
  var sorteados = null;
  function sortear(){ sorteados = embaralhar(LISTA).slice(0, 4).map(function(a){ return a.id; }); }
  function idsAtuais(){
    var c = ler();
    if (c.modo === 'aleatorio'){ if (!sorteados) sortear(); return sorteados; }
    return c.modo === 'escolhidos' ? c.ids : PADRAO;
  }
  function equipes(n){
    var ids = idsAtuais(), r = [];
    for (var k = 0; k < n && k < 4; k++){ var a = porId[ids[k]]; r.push({nome: a.nome, emoji: a.emoji, cor: CORES[k], art: a.art}); }
    return r;
  }

  // ---------- janela de escolha ----------
  var css = '.anmBt{display:inline-block;margin-left:6px;border:2px solid #c6d3ea;background:#fff;color:#1f3a68;border-radius:10px;padding:5px 10px;font-weight:bold;font-size:14px;cursor:pointer;vertical-align:middle;font-family:inherit}' +
    '.anmFundo{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(15,23,42,.6);z-index:99999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:12px}' +
    '.anmCx{background:#fff;color:#14213d;border-radius:18px;padding:16px;max-width:640px;width:100%;max-height:92vh;overflow:auto;font-family:inherit;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)}' +
    '.anmCx h3{margin:0 0 10px;font-size:20px}' +
    '.anmModos button,.anmAcoes button{border:2px solid #c6d3ea;background:#f4f7fc;color:#14213d;border-radius:12px;padding:8px 12px;margin:3px;font-weight:bold;font-size:15px;cursor:pointer;font-family:inherit}' +
    '.anmModos button.on{background:#1f3a68;color:#fff;border-color:#1f3a68}' +
    '.anmSlots{margin:12px 0 6px}.anmSlot{display:inline-block;margin:4px;padding:8px 12px;border-radius:14px;color:#fff;font-weight:bold;font-size:17px;cursor:pointer;border:4px solid transparent}' +
    '.anmSlot.sel{border-color:#14213d;box-shadow:0 0 0 3px #ffd54a}' +
    '.anmGrade{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin:8px 0}' +
    '.anmGrade button{width:76px;margin:3px;padding:6px 2px;border:2px solid #e3e9f4;background:#fff;border-radius:12px;cursor:pointer;font-family:inherit;font-size:12px;color:#14213d}' +
    '.anmGrade button span{display:block;font-size:30px;line-height:1.2}.anmGrade button.usado{background:#eef2f8;opacity:.6}' +
    '.anmDica{color:#4a5a78;font-size:14px;margin:4px 0}' +
    '.anmFim{position:-webkit-sticky;position:sticky;bottom:-16px;background:#fff;padding:8px 0 4px;margin-top:6px;border-top:1px solid #e3e9f4}';
  function estilo(){ if (document.getElementById('anmCss')) return; var s = document.createElement('style'); s.id = 'anmCss'; s.textContent = css; document.head.appendChild(s); }
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
  function resumo(){
    var c = ler();
    if (c.modo === 'aleatorio') return '🎲 Animais';
    var ids = c.modo === 'escolhidos' ? c.ids : PADRAO;
    return '🐾 ' + ids.map(function(id){ return porId[id].emoji; }).join('');
  }
  var botoes = [];
  function atualizarBotoes(){ for (var k = 0; k < botoes.length; k++) botoes[k].innerHTML = resumo(); }

  function abrir(){
    estilo();
    var c = ler(), sel = 0, fundo = document.createElement('div');
    fundo.className = 'anmFundo';
    function desenhar(){
      var ids = c.modo === 'aleatorio' ? (sorteados || (sortear(), sorteados)) : (c.modo === 'escolhidos' ? c.ids : PADRAO);
      var h = '<div class="anmCx" role="dialog" aria-label="Animais das equipes"><h3>🐾 Animais das equipes</h3><div class="anmModos">' +
        '<button type="button" data-m="padrao" class="' + (c.modo === 'padrao' ? 'on' : '') + '">↩️ Padrão</button>' +
        '<button type="button" data-m="escolhidos" class="' + (c.modo === 'escolhidos' ? 'on' : '') + '">✋ Escolher os animais</button>' +
        '<button type="button" data-m="aleatorio" class="' + (c.modo === 'aleatorio' ? 'on' : '') + '">🎲 Animais aleatórios</button></div>';
      h += '<div class="anmSlots">';
      for (var k = 0; k < 4; k++){ var a = porId[ids[k]]; h += '<span class="anmSlot' + (c.modo === 'escolhidos' && k === sel ? ' sel' : '') + '" data-s="' + k + '" style="background:' + CORES[k] + '">' + (k + 1) + 'ª: ' + a.emoji + ' ' + esc(a.nome) + '</span>'; }
      h += '</div>';
      if (c.modo === 'escolhidos'){
        h += '<p class="anmDica">Toque na equipe e depois no animal dela.</p><div class="anmGrade">';
        for (var j = 0; j < LISTA.length; j++){ var b = LISTA[j]; h += '<button type="button" data-a="' + b.id + '" class="' + (c.ids.indexOf(b.id) >= 0 ? 'usado' : '') + '"><span>' + b.emoji + '</span>' + esc(b.nome) + '</button>'; }
        h += '</div>';
      } else if (c.modo === 'aleatorio') h += '<p class="anmDica">Cada vez que esta tela abrir, as equipes ganham animais sorteados.</p><div class="anmAcoes"><button type="button" data-x="sortear">🎲 Sortear de novo</button></div>';
      else h += '<p class="anmDica">Leões, Golfinhos, Pandas e Abelhas.</p>';
      h += '<div class="anmAcoes anmFim"><button type="button" data-x="ok" style="background:#ffd54a;border-color:#e0b400">✔️ Pronto</button></div></div>';
      fundo.innerHTML = h;
    }
    fundo.onclick = function(ev){
      var t = ev.target;
      while (t && t !== fundo && !t.getAttribute('data-m') && !t.getAttribute('data-s') && !t.getAttribute('data-a') && !t.getAttribute('data-x')) t = t.parentNode;
      if (!t || t === fundo){ if (ev.target === fundo) fechar(); return; }
      if (t.getAttribute('data-m')){ c.modo = t.getAttribute('data-m'); if (c.modo === 'aleatorio' && !sorteados) sortear(); }
      else if (t.getAttribute('data-s') !== null && t.getAttribute('data-s') !== undefined && t.getAttribute('data-s') !== ''){ if (c.modo !== 'escolhidos'){ c.modo = 'escolhidos'; c.ids = idsAtuais().slice(); } sel = +t.getAttribute('data-s'); }
      else if (t.getAttribute('data-a')){
        var id = t.getAttribute('data-a'), ja = c.ids.indexOf(id);
        if (ja >= 0) c.ids[ja] = c.ids[sel];   // se o animal já é de outra equipe, as duas trocam
        c.ids[sel] = id; sel = (sel + 1) % 4;
      }
      else if (t.getAttribute('data-x') === 'sortear') sortear();
      else if (t.getAttribute('data-x') === 'ok'){ fechar(); return; }
      gravar(c); desenhar(); atualizarBotoes();
    };
    function fechar(){ gravar(c); atualizarBotoes(); if (fundo.parentNode) fundo.parentNode.removeChild(fundo); if (window.Animais.aoMudar) window.Animais.aoMudar(); }
    desenhar(); document.body.appendChild(fundo);
  }

  // coloca o botão ao lado do seletor de equipes da tela
  function instalar(){
    var alvos = ['selEquipes', 'selTimes'];
    for (var k = 0; k < alvos.length; k++){
      var s = document.getElementById(alvos[k]);
      if (!s || s.getAttribute('data-anm')) continue;
      s.setAttribute('data-anm', '1'); estilo();
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'anmBt'; b.title = 'Escolher os animais das equipes (ou animais aleatórios)';
      b.innerHTML = resumo(); b.onclick = function(ev){ ev.preventDefault(); abrir(); };
      botoes.push(b);
      if (s.nextSibling) s.parentNode.insertBefore(b, s.nextSibling); else s.parentNode.appendChild(b);
    }
  }
  window.Animais = {LISTA: LISTA, CORES: CORES, equipes: equipes, abrir: abrir, instalar: instalar, sortear: sortear, aoMudar: null};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', instalar); else instalar();
})();
