/* Utilidades das telas do projetor (Stop e Quiz ao Vivo). */
(function(){
'use strict';
const AV = {};
let somLigado = true, ac;

AV.esc = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

let timerAviso;
AV.avisar = t => {
  let a = document.getElementById('avAviso');
  if (!a){ a = document.createElement('div'); a.id = 'avAviso'; document.body.appendChild(a); }
  a.textContent = t; a.classList.add('mostrar');
  clearTimeout(timerAviso); timerAviso = setTimeout(() => a.classList.remove('mostrar'), 3200);
};

AV.mostrarTela = id => {
  document.querySelectorAll('.tela').forEach(t => t.classList.toggle('ativa', t.id === id));
  window.scrollTo(0, 0);
};

AV.urlJogar = () => location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, 'jogar.html');

// ---------- sons ----------
Object.defineProperty(AV, 'som', {get: () => somLigado, set: v => { somLigado = !!v; }});
AV.tom = (freq, dur = .12, tipo = 'triangle', vol = .15, atraso = 0, freqFim) => {
  if (!somLigado) return;
  try{
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + atraso;
    o.type = tipo; o.frequency.setValueAtTime(freq, t0);
    if (freqFim) o.frequency.linearRampToValueAtTime(freqFim, t0 + dur);
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + dur);
    o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur + .02);
  }catch(e){}
};
AV.fanfarra = () => [523,659,784,1047].forEach((f, i) => AV.tom(f, .22, 'triangle', .18, i * .1));
AV.sirene = () => { for (let i = 0; i < 2; i++){ AV.tom(600, .4, 'sawtooth', .12, i * .8, 1200); AV.tom(1200, .4, 'sawtooth', .12, i * .8 + .4, 600); } };
AV.erro = () => { AV.tom(240, .25, 'sawtooth', .07); AV.tom(180, .3, 'sawtooth', .07, .15); };
AV.tique = () => AV.tom(1000, .04, 'square', .05);
// Idioma da voz: o JSON da atividade pode trazer "idioma": "en-US" (padrão: português)
AV.idioma = 'pt-BR';
AV.vozPara = lang => {
  const vs = speechSynthesis.getVoices(), alvo = String(lang).replace('_', '-').toLowerCase(), base = alvo.slice(0, 2);
  return vs.find(v => String(v.lang).replace('_', '-').toLowerCase() === alvo) || vs.find(v => String(v.lang).toLowerCase().startsWith(base)) || null;
};
// AV.falar('texto') ou AV.falar('texto', 'pt-BR') ou AV.falar([{t: 'Isso!', l: 'pt-BR'}, {t: 'apple'}])
AV.falar = (t, idioma) => {
  if (!somLigado || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  // tira os emojis (a voz leria "rosto de cachorro" e entregaria a resposta)
  const semEmoji = x => String(x).replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]/gu, '').replace(/\s+/g, ' ').trim();
  const partes = (Array.isArray(t) ? t : [{t, l: idioma}]).map(p => p && p.t ? {t: semEmoji(p.t), l: p.l} : null);
  partes.filter(p => p && p.t).forEach(p => {
    const lang = p.l || AV.idioma || 'pt-BR';
    const u = new SpeechSynthesisUtterance(p.t); u.lang = lang; u.rate = .95;
    const v = AV.vozPara(lang); if (v) u.voice = v;
    speechSynthesis.speak(u);
  });
};
AV.confete = () => {
  const itens = ['⭐','🎉','✨','🌟','🎈','🏆'];
  for (let i = 0; i < 30; i++){
    const s = document.createElement('span'); s.className = 'avConfete'; s.textContent = itens[i % itens.length];
    s.style.setProperty('--dx', (Math.random()*900-450)+'px'); s.style.setProperty('--dy', (Math.random()*600-300)+'px');
    s.style.setProperty('--rot', (Math.random()*720-360)+'deg');
    document.body.appendChild(s); setTimeout(() => s.remove(), 1500);
  }
};

// ---------- arquivos JSON ----------
AV.baixarArquivo = (url, nome) => {
  fetch(url).then(r => r.blob()).then(b => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
  }).catch(() => AV.avisar('Não foi possível baixar o modelo.'));
};
AV.prepararSeletorJson = ({tipo, tipos, select, botaoAbrir, input, aoCarregar: aoCarregarOriginal}) => {
  const aoCarregar = (d, origem) => { AV.idioma = d && typeof d.idioma === 'string' && d.idioma ? d.idioma : 'pt-BR'; return aoCarregarOriginal(d, origem); };
  const listaTipos = tipos || [tipo];
  const CHAVE = 'aovivo_json_' + listaTipos[0];
  const carregarUrl = arq => fetch('dados/' + arq + '?v=' + Date.now()).then(r => { if (!r.ok) throw 0; return r.json(); })
    .then(d => aoCarregar(d)).catch(() => AV.avisar('Não foi possível abrir dados/' + arq));
  const opcaoLocal = () => {
    let salvo = null; try{ salvo = JSON.parse(localStorage.getItem(CHAVE)); }catch(e){}
    if (!salvo) return;
    let o = select.querySelector('option[value="__local"]');
    if (!o){ o = document.createElement('option'); o.value = '__local'; select.appendChild(o); }
    o.textContent = '📂 ' + (salvo.titulo || 'Arquivo aberto do computador');
  };
  select.onchange = () => {
    if (select.value === '__local'){
      try{ aoCarregar(JSON.parse(localStorage.getItem(CHAVE)), 'aberto do computador'); }catch(e){}
    } else carregarUrl(select.value);
  };
  fetch('dados/indice.json?v=' + Date.now()).then(r => r.json()).then(ind => {
    listaTipos.forEach(t => (ind[t] || []).forEach(e => {
      if (select.querySelector(`option[value="${e.arquivo}"]`)) return;
      const o = document.createElement('option'); o.value = e.arquivo; o.textContent = e.titulo || e.arquivo; select.appendChild(o);
    }));
  }).catch(() => {
    const o = document.createElement('option'); o.value = listaTipos[0] + '-padrao.json'; o.textContent = 'Modelo padrão'; select.appendChild(o);
  }).finally(() => {
    opcaoLocal();
    // o endereço pode pedir um arquivo específico: jogo.html?arquivo=nome.json
    const pedido = new URLSearchParams(location.search).get('arquivo');
    if (pedido && /^[\w.-]+\.json$/.test(pedido)){
      if (!select.querySelector(`option[value="${pedido}"]`)){
        const o = document.createElement('option'); o.value = pedido; o.textContent = pedido; select.appendChild(o);
      }
      select.value = pedido;
    }
    if (select.options.length) select.onchange();
  });
  botaoAbrir.onclick = () => input.click();
  input.onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try{
        const d = JSON.parse(r.result);
        try{ localStorage.setItem(CHAVE, JSON.stringify(d)); }catch(err){}
        opcaoLocal(); select.value = '__local';
        aoCarregar(d, f.name);
      }catch(err){ AV.avisar('Esse arquivo não é um JSON válido.'); }
    };
    r.readAsText(f); e.target.value = '';
  };
};

// ---------- grupos e placar ----------
AV.desenharGrupos = (el, grupos, aoRemover, totais) => {
  const ids = Object.keys(grupos || {});
  el.innerHTML = '';
  ids.forEach(id => {
    const g = grupos[id];
    const d = document.createElement('div'); d.className = 'grupoChip'; d.style.background = g.cor;
    d.innerHTML = `<span class="e">${AV.esc(g.emoji)}</span><span>${AV.esc(g.nome)}${totais && totais[id] ? `<small>${totais[id]} pts</small>` : ''}</span>`;
    if (aoRemover){
      const x = document.createElement('button'); x.textContent = '✖'; x.title = 'Tirar este grupo';
      x.onclick = () => { if (confirm(`Tirar a equipe ${g.nome} da sala?`)) aoRemover(id); };
      d.appendChild(x);
    }
    el.appendChild(d);
  });
};
// Grupos na ordem em que entraram na sala
AV.ordemGrupos = grupos => Object.keys(grupos || {}).sort((a, b) => ((grupos[a].entrou || 0) - (grupos[b].entrou || 0)));
AV.mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

AV.posicoes = totais => {
  const ord = Object.keys(totais).sort((a, b) => totais[b] - totais[a]);
  const pos = {}; let ult = null, p = 0;
  ord.forEach((id, i) => { if (totais[id] !== ult){ p = i + 1; ult = totais[id]; } pos[id] = p; });
  return pos;
};
AV.desenharRanking = (el, grupos, totais, daRodada, final) => {
  const ids = Object.keys(grupos).concat(Object.keys(totais).filter(id => !grupos[id]));
  const unicos = [...new Set(ids)];
  unicos.forEach(id => { if (totais[id] == null) totais[id] = 0; });
  const pos = AV.posicoes(Object.fromEntries(unicos.map(id => [id, totais[id]])));
  const max = Math.max(1, ...unicos.map(id => totais[id]));
  const medalha = p => p === 1 ? '🥇' : p === 2 ? '🥈' : p === 3 ? '🥉' : p + 'º';
  el.innerHTML = unicos.sort((a, b) => totais[b] - totais[a]).map((id, i) => {
    const g = grupos[id] || {nome: id, emoji: '❔', cor: '#999'};
    return `<div class="linhaRank ${final && pos[id] === 1 ? 'campeao' : ''}" style="animation-delay:${i * .12}s">
      <span class="pos">${medalha(pos[id])}</span>
      <span class="nomeRank">${AV.esc(g.emoji + ' ' + g.nome)}</span>
      <span class="barraRank"><span style="width:${totais[id] / max * 100}%;background:${g.cor}"></span></span>
      <span class="pts">${totais[id]}${daRodada && daRodada[id] != null ? `<small>+${daRodada[id]}</small>` : ''}</span></div>`;
  }).join('');
};

// ---------- conexão ----------
AV.iniciarConexao = el => {
  Rede.aoMudarConexao = ok => { const a = document.getElementById('conexaoAviso'); if (a) a.style.display = ok ? 'none' : 'block'; };
  Rede.iniciar(modo => {
    const regras = `{
  "rules": {
    "salas": {
      ".read": true,
      "$sala": { ".write": true }
    }
  }
}`;
    el.innerHTML = (modo === 'firebase'
      ? `<div class="status ok">🟢 Banco de dados conectado. Os iPads podem entrar.</div>`
      : `<div class="status teste">🟡 <b>Modo teste</b>: o banco de dados ainda não foi configurado. Por enquanto o jogo só funciona entre abas <b>deste computador</b> (abra o jogar.html em outra aba para experimentar).</div>`) +
      `<details ${modo === 'firebase' ? '' : 'open'}><summary>⚙️ Como configurar o banco de dados (Firebase, gratuito)</summary>
        <ol>
          <li>Entre em <b>console.firebase.google.com</b> com uma conta Google e clique em <b>Criar projeto</b> (ex.: <i>painel-aula</i>). O Google Analytics pode ficar desligado.</li>
          <li>No menu, abra <b>Realtime Database</b> → <b>Criar banco de dados</b> → escolha o local (Estados Unidos) → <b>Iniciar no modo bloqueado</b>.</li>
          <li>Na aba <b>Regras</b>, apague tudo, cole o texto abaixo e clique em <b>Publicar</b>:
            <pre>${AV.esc(regras)}</pre></li>
          <li>Copie o endereço que aparece no topo da aba <b>Dados</b> (algo como <i>https://painel-aula-default-rtdb.firebaseio.com</i>).</li>
          <li>Coloque esse endereço no arquivo <b>rede-config.json</b> do projeto, para valer em todos os aparelhos (o Claude pode fazer isso para você).
            Para testar agora só neste computador, cole aqui:
            <div class="linha" style="justify-content:flex-start"><input type="text" id="inEndereco" placeholder="https://....firebaseio.com" style="flex:1;min-width:240px">
            <button id="btnEndereco">Usar neste computador</button></div></li>
        </ol>
        <p class="dica">Os dados de cada sala são apagados quando você clica em "Encerrar sala".</p>
      </details>`;
    const b = el.querySelector('#btnEndereco');
    if (b) b.onclick = () => { Rede.definirEnderecoLocal(el.querySelector('#inEndereco').value.trim()); location.reload(); };
    const i = el.querySelector('#inEndereco'); if (i && modo === 'firebase') i.value = Rede.base;
  });
};

window.AoVivo = AV;
})();
