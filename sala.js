/* sala.js — ajudas comuns das Ferramentas da sala (ES5: funciona nos iPads antigos).
   Lista da turma (da Chamada ou do Sorteador), bichinho e nome curto de cada aluno, som e voz (respeitam o botão
   de som do Painel), confete, aviso, caixa de texto e cópia de segurança.
   Tudo fica guardado só neste aparelho. */
(function(){
  'use strict';
  var Sala = {};
  var ANIMAIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐤', '🐙', '🐢', '🐝', '🐞', '🐬', '🐳', '🐠', '🦀', '🐌', '🦄', '🐲', '🐴', '🐑', '🐘', '🐿️'];
  var PARTICULAS = {de: 1, da: 1, 'do': 1, dos: 1, das: 1, e: 1};
  var CORES = ['#ff5d8f', '#ffbe0b', '#3a86ff', '#8338ec', '#06d6a0', '#fb5607'];
  var ACENTOS = {'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'ñ': 'n'};
  Sala.ANIMAIS = ANIMAIS;

  // ---------- utilidades ----------
  Sala.esc = function(t){ return String(t == null ? '' : t).replace(/[&<>"]/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); };
  Sala.aparar = function(s){ return String(s == null ? '' : s).replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); };
  Sala.semAcento = function(t){ return String(t).toLowerCase().replace(/[áàâãäéèêëíìîïóòôõöúùûüçñ]/g, function(c){ return ACENTOS[c]; }); };
  Sala.ler = function(k){ try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  Sala.gravar = function(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  Sala.hoje = function(d){ d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };
  Sala.hash = function(s){ var h = 0; s = String(s); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };
  Sala.nomeCurto = function(n){
    var p = String(n).split(' ');
    if (p.length <= 2) return String(n);
    var out = [p[0]];
    if (!PARTICULAS[p[1].toLowerCase()]) out.push(p[1]);
    out.push(p[p.length - 1].charAt(0).toUpperCase() + '.');
    return out.join(' ');
  };
  Sala.embaralhar = function(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  // ---------- lista da turma ----------
  // fonte: 'auto' (a turma aberta na Chamada; sem Chamada, a lista do Sorteador), 'chamada:<id>', 'sorteador' ou 'nenhuma'
  Sala.fontes = function(){
    var ch = Sala.ler('chamada_dados'), pt = Sala.ler('painel_turma'), l = [];
    if (ch && ch.turmas instanceof Array) ch.turmas.forEach(function(t){ l.push({valor: 'chamada:' + t.id, rotulo: 'Chamada: ' + t.nome + ' (' + (t.alunos || []).length + ')', nome: t.nome}); });
    if (pt && pt.alunos instanceof Array && pt.alunos.length) l.push({valor: 'sorteador', rotulo: 'Sorteador' + (pt.turma ? ': ' + pt.turma : '') + ' (' + pt.alunos.length + ')', nome: pt.turma || 'Lista do Sorteador'});
    return l;
  };
  Sala.preencherFontes = function(sel, atual, comNenhuma){
    var t = Sala.turma('auto'), h = '<option value="auto">' + (t.nome ? 'automático (' + Sala.esc(t.nome) + ')' : 'automático (Chamada ou Sorteador)') + '</option>';
    Sala.fontes().forEach(function(f){ h += '<option value="' + Sala.esc(f.valor) + '">' + Sala.esc(f.rotulo) + '</option>'; });
    if (comNenhuma) h += '<option value="nenhuma">sem lista (escrever o nome)</option>';
    sel.innerHTML = h; sel.value = atual || 'auto'; if (sel.value !== (atual || 'auto')) sel.value = 'auto';
  };
  Sala.turma = function(fonte){
    fonte = fonte || 'auto';
    var ch = Sala.ler('chamada_dados'), pt = Sala.ler('painel_turma'), r = {chave: '', nome: '', rotulo: '', nomes: [], ausentes: {}, indice: {}}, i, t = null;
    var temChamada = ch && ch.turmas instanceof Array && ch.turmas.length;
    if (temChamada && (fonte === 'auto' || fonte.indexOf('chamada:') === 0)){
      var alvo = fonte.indexOf('chamada:') === 0 ? fonte.slice(8) : ch.atual;
      for (i = 0; i < ch.turmas.length; i++) if (ch.turmas[i].id === alvo) t = ch.turmas[i];
      t = t || ch.turmas[0];
      var marcas = (t.chamadas || {})[Sala.hoje()] || {};
      r.chave = 'chamada:' + t.id; r.nome = t.nome; r.rotulo = 'Chamada, ' + t.nome;
      r.nomes = (t.alunos || []).map(function(a){ if (marcas[a.id] === 'F') r.ausentes[a.nome] = 1; return a.nome; });
    } else if ((fonte === 'auto' || fonte === 'sorteador') && pt && pt.alunos instanceof Array && pt.alunos.length){
      r.chave = 'sorteador'; r.nome = pt.turma || 'Lista do Sorteador'; r.rotulo = 'Sorteador' + (pt.turma ? ', ' + pt.turma : '');
      r.nomes = pt.alunos.slice();
      (pt.ausentes || []).forEach(function(n){ r.ausentes[n] = 1; });
    }
    var curtos = {}, quantos = {};
    r.nomes.forEach(function(n, k){ var c = Sala.nomeCurto(n); curtos[n] = c; quantos[c] = (quantos[c] || 0) + 1; r.indice[n] = k; });
    r.curto = function(n){ var c = curtos[n] || Sala.nomeCurto(n); return quantos[c] > 1 ? n : c; };   // nomes curtos iguais: mostra o nome inteiro
    r.bicho = function(n){ var k = r.indice[n]; return ANIMAIS[(k === undefined ? Sala.hash(n) : k) % ANIMAIS.length]; };   // o mesmo bichinho em todas as ferramentas
    return r;
  };

  // ---------- som e voz ----------
  var audio = null;
  Sala.somLigado = function(){ try { return localStorage.getItem('painel_som') !== '0'; } catch (e) { return true; } };
  Sala.tom = function(freq, dur, quando, tipo){
    if (!Sala.somLigado()) return;
    try {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      audio = audio || new C();
      if (audio.state === 'suspended' && audio.resume) audio.resume();
      var o = audio.createOscillator(), g = audio.createGain(), t0 = audio.currentTime + (quando || 0), vol = window.PAINEL_CALMO ? 0.05 : 0.15;
      o.type = tipo || 'sine'; o.frequency.value = freq; o.connect(g); g.connect(audio.destination);
      g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.start(t0); o.stop(t0 + dur + 0.05);
    } catch (e) {}
  };
  Sala.plim = function(){ Sala.tom(784, 0.18); Sala.tom(1047, 0.32, 0.16); };
  Sala.festa = function(){   // fanfarra curta (melodia própria)
    var notas = [523, 659, 784, 659, 784, 1047, 988, 1047, 1319], tempos = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.98, 1.12, 1.26];
    for (var i = 0; i < notas.length; i++) Sala.tom(notas[i], i === notas.length - 1 ? 0.7 : 0.16, tempos[i], 'triangle');
  };
  Sala.falar = function(t){
    if (!Sala.somLigado() || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    try { var u = new SpeechSynthesisUtterance(t); u.lang = 'pt-BR'; u.rate = 1; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch (e) {}
  };
  Sala.botaoSom = function(b){
    function pintar(){ var on = Sala.somLigado(); b.innerHTML = on ? '🔊' : '🔇'; b.title = on ? 'Som ligado (toque para desligar)' : 'Som desligado (toque para ligar)'; }
    b.onclick = function(){
      var on = !Sala.somLigado();
      try { localStorage.setItem('painel_som', on ? '1' : '0'); } catch (e) {}
      if (!on && window.speechSynthesis) try { window.speechSynthesis.cancel(); } catch (e) {}
      pintar(); if (on) Sala.plim();
    };
    pintar();
  };

  // ---------- estilos das peças comuns ----------
  var comCss = false;
  function css(){
    if (comCss) return; comCss = true;
    var s = document.createElement('style');
    s.textContent = '.salaConfete{position:fixed;top:-24px;width:10px;height:14px;z-index:70;pointer-events:none;-webkit-animation:salaCai linear forwards;animation:salaCai linear forwards}' +
      '@-webkit-keyframes salaCai{to{-webkit-transform:translateY(112vh) rotate(720deg)}}@keyframes salaCai{to{transform:translateY(112vh) rotate(720deg)}}' +
      '#salaAviso{position:fixed;left:50%;top:14px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:80;background:#2b2550;color:#fff;padding:10px 18px;border-radius:14px;font-size:17px;display:none;max-width:92%;text-align:center;font-family:inherit}' +
      '.salaCaixa{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(32,24,70,.55);display:none;z-index:75;overflow:auto;-webkit-overflow-scrolling:touch}' +
      '.salaCaixa>div{background:#fff;max-width:640px;margin:30px auto;padding:14px;border-radius:16px;color:#2b2550}' +
      '.salaCaixa textarea{width:100%;min-height:200px;font:13px Consolas,Menlo,monospace;border:2px solid #d8d2ee;border-radius:10px;padding:8px;box-sizing:border-box}' +
      '.salaCaixa button{font:inherit;font-weight:bold;font-size:15px;border:2px solid #d8d2ee;border-radius:10px;padding:8px 12px;margin:6px 6px 0 0;background:#fff;color:#2b2550;cursor:pointer}';
    (document.head || document.documentElement).appendChild(s);
  }

  // ---------- confete e aviso ----------
  Sala.confete = function(qtd){
    if (window.PAINEL_CALMO) return;   // visual calmo: sem confete
    css(); qtd = qtd || 90;
    for (var i = 0; i < qtd; i++){
      var c = document.createElement('div'), dur = (2.2 + Math.random() * 2.2).toFixed(2) + 's', atraso = (Math.random() * 0.9).toFixed(2) + 's';
      c.className = 'salaConfete'; c.style.left = (Math.random() * 100).toFixed(1) + 'vw'; c.style.background = CORES[i % CORES.length];
      c.style.webkitAnimationDuration = dur; c.style.animationDuration = dur; c.style.webkitAnimationDelay = atraso; c.style.animationDelay = atraso;
      if (i % 3 === 0) c.style.borderRadius = '50%';
      document.body.appendChild(c);
      (function(el){ setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 5600); })(c);
    }
  };
  Sala.avisar = function(t){
    css();
    var a = document.getElementById('salaAviso');
    if (!a){ a = document.createElement('div'); a.id = 'salaAviso'; document.body.appendChild(a); }
    a.innerHTML = t; a.style.display = 'block';
    clearTimeout(Sala.avisar.t); Sala.avisar.t = setTimeout(function(){ a.style.display = 'none'; }, 2800);
  };

  // ---------- caixa de texto (copiar em aparelhos antigos e restaurar cópias) ----------
  var acaoCaixa = null;
  Sala.caixa = function(op){
    css();
    var f = document.getElementById('salaCaixa');
    if (!f){
      f = document.createElement('div'); f.id = 'salaCaixa'; f.className = 'salaCaixa';
      f.innerHTML = '<div><p id="salaCaixaTit" style="font-weight:bold;margin:0 0 8px"></p><textarea id="salaCaixaTxt"></textarea>' +
        '<div><button type="button" id="salaCaixaArq">📂 Escolher arquivo</button><button type="button" id="salaCaixaOk"></button><button type="button" id="salaCaixaFechar">Fechar</button></div>' +
        '<input type="file" id="salaCaixaFile" accept=".json,application/json,text/plain" style="display:none"></div>';
      document.body.appendChild(f);
      document.getElementById('salaCaixaFechar').onclick = function(){ f.style.display = 'none'; };
      f.onclick = function(e){ if (e.target === f) f.style.display = 'none'; };
      document.getElementById('salaCaixaArq').onclick = function(){ document.getElementById('salaCaixaFile').click(); };
      document.getElementById('salaCaixaFile').onchange = function(){
        var arq = this.files && this.files[0], inp = this; if (!arq) return;
        var r = new FileReader(); r.onload = function(){ document.getElementById('salaCaixaTxt').value = r.result; inp.value = ''; }; r.readAsText(arq);
      };
      document.getElementById('salaCaixaOk').onclick = function(){ if (acaoCaixa && acaoCaixa(document.getElementById('salaCaixaTxt').value) !== false) f.style.display = 'none'; };
    }
    acaoCaixa = op.acao || null;
    document.getElementById('salaCaixaTit').innerHTML = op.titulo || '';
    var txt = document.getElementById('salaCaixaTxt'); txt.value = op.texto || ''; txt.readOnly = !op.acao;
    document.getElementById('salaCaixaOk').style.display = op.acao ? '' : 'none';
    document.getElementById('salaCaixaOk').innerHTML = op.botao || 'OK';
    document.getElementById('salaCaixaArq').style.display = op.acao ? '' : 'none';
    f.style.display = 'block';
    if (!op.acao) setTimeout(function(){ try { txt.focus(); txt.select(); } catch (e) {} }, 50);
  };

  // ---------- arquivos e cópia de segurança ----------
  Sala.baixarTexto = function(nome, conteudo, tipo){
    var a = document.createElement('a');
    if (window.navigator && navigator.msSaveBlob){ navigator.msSaveBlob(new Blob([conteudo], {type: tipo}), nome); return; }
    if (!('download' in a) || typeof Blob === 'undefined' || !window.URL){
      Sala.caixa({titulo: 'Este aparelho não baixa arquivos. Copie o texto abaixo e guarde (por e-mail ou num bloco de notas).', texto: conteudo});
      return;
    }
    var url = URL.createObjectURL(new Blob([conteudo], {type: tipo}));
    a.href = url; a.download = nome; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1500);
    Sala.avisar('Arquivo salvo na pasta de downloads.');
  };
  Sala.copia = {
    baixar: function(nomeArquivo, chaves){
      var pacote = {painel: 'copia', criada: new Date().getTime(), chaves: {}};
      chaves.forEach(function(k){ pacote.chaves[k] = Sala.ler(k); });
      Sala.baixarTexto(nomeArquivo, JSON.stringify(pacote), 'application/json');
    },
    restaurar: function(chaves, depois){
      Sala.caixa({titulo: 'Escolha o arquivo da cópia ou cole o texto dela aqui e toque em Restaurar. Os dados desta ferramenta neste aparelho serão trocados pelos da cópia.', botao: '⬆️ Restaurar', acao: function(texto){
        var d = null; try { d = JSON.parse(texto); } catch (e) {}
        var serve = d && d.chaves && chaves.some(function(k){ return d.chaves[k] != null; });
        if (!serve){ Sala.avisar('Isso não é uma cópia desta ferramenta.'); return false; }
        if (!confirm('Restaurar a cópia? Os dados atuais desta ferramenta serão substituídos.')) return false;
        chaves.forEach(function(k){ if (d.chaves[k] != null) Sala.gravar(k, d.chaves[k]); });
        Sala.avisar('Cópia restaurada.'); if (depois) depois(); return true;
      }});
    }
  };
  Sala.imprimir = function(html){
    var area = document.getElementById('salaImpressao');
    if (!area){
      area = document.createElement('div'); area.id = 'salaImpressao'; document.body.appendChild(area);
      var s = document.createElement('style');
      s.textContent = '#salaImpressao{display:none}@media print{body>*{display:none !important}#salaImpressao{display:block !important;font-family:Arial,Helvetica,sans-serif;color:#000}' +
        'html.visual-adulto body:not(.escuro),body{background:#fff !important}}';
      (document.head || document.documentElement).appendChild(s);
    }
    area.innerHTML = html;
    setTimeout(function(){ window.print(); }, 100);
  };

  window.Sala = Sala;
})();
