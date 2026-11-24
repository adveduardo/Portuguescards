/* Arte do "Bichinho do Silêncio": sprites desenhados em SVG (piscam, mastigam, se assustam, abanam o rabo)
   e cenários animados. ARTE.sprite(tipo) devolve o SVG; ARTE.cenario(id) monta o fundo; ARTE.estado(el, e) troca a expressão. */
(function(){
'use strict';
const P = {
  cachorro:  {c1: '#d6a06a', c2: '#f7e6cf', esc: '#8a5a2b', orelha: 'caida', cauda: 'cachorro', mancha: true},
  gato:      {c1: '#f4a259', c2: '#fff3e2', esc: '#c4682a', orelha: 'triangulo', cauda: 'gato', bigode: true, listras: true},
  coelho:    {c1: '#ececf4', c2: '#ffffff', esc: '#a9a9bd', orelha: 'longa', cauda: 'pompom', dentes: true, bigode: true},
  urso:      {c1: '#a0704a', c2: '#e6caa6', esc: '#6b4528', orelha: 'redonda', cauda: 'pompom'},
  panda:     {c1: '#fbfbfb', c2: '#ffffff', esc: '#2a2a30', orelha: 'redonda', manchas: true, bracosEsc: true, cauda: 'pompom'},
  hamster:   {c1: '#f2b766', c2: '#fff4e2', esc: '#c4863a', orelha: 'pequena', bochechao: true},
  pinguim:   {c1: '#2d3648', c2: '#ffffff', esc: '#1a2030', bico: true, mascara: true, asas: true},
  sapo:      {c1: '#6cc04a', c2: '#e0f6c2', esc: '#3e8a2a', olhoSapo: true},
  macaco:    {c1: '#8e5c3d', c2: '#f2cca4', esc: '#5d3923', orelha: 'macaco', cauda: 'macaco', rostoMacaco: true},
  unicornio: {c1: '#fdf6ff', c2: '#ffffff', esc: '#c9b2dd', orelha: 'triangulo', chifre: true, crina: true, cauda: 'unicornio'}
};
const ROSA = '#ff9fb4', ESCURO = '#2b2120';

function olhos(x1, x2, y){
  const um = x => `<g transform="translate(${x} ${y})">
    <g class="olho-normal"><ellipse rx="7.5" ry="9.5" fill="${ESCURO}"/><circle cx="2.6" cy="-3.6" r="2.8" fill="#fff"/><circle cx="-2.4" cy="2.8" r="1.3" fill="#fff" opacity=".8"/></g>
    <path class="olho-feliz" d="M-8 3 Q0 -8 8 3" stroke="${ESCURO}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <g class="olho-susto"><circle r="11" fill="#fff" stroke="${ESCURO}" stroke-width="2.4"/><circle r="4" fill="${ESCURO}"/></g></g>`;
  return '<g class="olhar">' + um(x1) + um(x2) + '</g>';
}
function sprite(tipo){
  const p = P[tipo] || P.cachorro, c1 = p.c1, c2 = p.c2, esc = p.esc;
  let tras = '', orelhas = '', corpo = '', rosto = '', frente = '';
  // ---- cauda (atrás do corpo) ----
  if (p.cauda === 'cachorro') tras += `<g class="cauda" style="transform-origin:150px 168px"><path d="M148 170 Q182 150 176 120" stroke="${c1}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M148 170 Q182 150 176 120" stroke="${esc}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".35"/></g>`;
  if (p.cauda === 'gato') tras += `<g class="cauda" style="transform-origin:150px 178px"><path d="M148 180 Q196 176 186 130 Q182 112 168 118" stroke="${c1}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M178 134 l10 -4 M184 150 l10 0" stroke="${esc}" stroke-width="4" stroke-linecap="round"/></g>`;
  if (p.cauda === 'pompom') tras += `<g class="cauda" style="transform-origin:154px 180px"><circle cx="156" cy="182" r="13" fill="${p.manchas ? '#fff' : c2}" stroke="${esc}" stroke-width="2.5"/></g>`;
  if (p.cauda === 'macaco') tras += `<g class="cauda" style="transform-origin:148px 182px"><path d="M146 184 Q196 196 190 150 Q186 128 170 136" stroke="${c1}" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
  if (p.cauda === 'unicornio') tras += `<g class="cauda" style="transform-origin:150px 176px"><path d="M148 176 Q186 170 180 136" stroke="#ff8fc8" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M150 180 Q190 182 188 148" stroke="#8fd3ff" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M150 172 Q178 160 170 132" stroke="#c9a2ff" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  // ---- orelhas (atrás da cabeça) ----
  if (p.orelha === 'caida') orelhas = `<g class="orelhas"><ellipse cx="50" cy="86" rx="17" ry="36" fill="${esc}" transform="rotate(18 50 86)"/><ellipse cx="150" cy="86" rx="17" ry="36" fill="${esc}" transform="rotate(-18 150 86)"/></g>`;
  if (p.orelha === 'triangulo') orelhas = `<g class="orelhas"><path d="M46 70 L58 20 L92 46 Z" fill="${c1}" stroke="${esc}" stroke-width="3" stroke-linejoin="round"/><path d="M57 58 L63 32 L82 46 Z" fill="${ROSA}"/><path d="M154 70 L142 20 L108 46 Z" fill="${c1}" stroke="${esc}" stroke-width="3" stroke-linejoin="round"/><path d="M143 58 L137 32 L118 46 Z" fill="${ROSA}"/></g>`;
  if (p.orelha === 'longa') orelhas = `<g class="orelhas"><ellipse cx="76" cy="28" rx="14" ry="42" fill="${c1}" stroke="${esc}" stroke-width="3" transform="rotate(-10 76 28)"/><ellipse cx="76" cy="30" rx="7" ry="31" fill="${ROSA}" transform="rotate(-10 76 30)"/><ellipse cx="124" cy="28" rx="14" ry="42" fill="${c1}" stroke="${esc}" stroke-width="3" transform="rotate(10 124 28)"/><ellipse cx="124" cy="30" rx="7" ry="31" fill="${ROSA}" transform="rotate(10 124 30)"/></g>`;
  if (p.orelha === 'redonda') orelhas = `<g class="orelhas"><circle cx="52" cy="46" r="19" fill="${p.manchas ? esc : c1}" stroke="${esc}" stroke-width="3"/><circle cx="52" cy="46" r="9" fill="${p.manchas ? '#555' : c2}"/><circle cx="148" cy="46" r="19" fill="${p.manchas ? esc : c1}" stroke="${esc}" stroke-width="3"/><circle cx="148" cy="46" r="9" fill="${p.manchas ? '#555' : c2}"/></g>`;
  if (p.orelha === 'pequena') orelhas = `<g class="orelhas"><circle cx="58" cy="44" r="14" fill="${c1}" stroke="${esc}" stroke-width="3"/><circle cx="58" cy="44" r="7" fill="${ROSA}"/><circle cx="142" cy="44" r="14" fill="${c1}" stroke="${esc}" stroke-width="3"/><circle cx="142" cy="44" r="7" fill="${ROSA}"/></g>`;
  if (p.orelha === 'macaco') orelhas = `<g class="orelhas"><circle cx="38" cy="96" r="19" fill="${c1}" stroke="${esc}" stroke-width="3"/><circle cx="38" cy="96" r="10" fill="${c2}"/><circle cx="162" cy="96" r="19" fill="${c1}" stroke="${esc}" stroke-width="3"/><circle cx="162" cy="96" r="10" fill="${c2}"/></g>`;
  if (p.crina) orelhas += `<g class="crina"><circle cx="64" cy="52" r="16" fill="#ff8fc8"/><circle cx="54" cy="76" r="14" fill="#c9a2ff"/><circle cx="50" cy="102" r="13" fill="#8fd3ff"/><circle cx="58" cy="126" r="11" fill="#9ff0c6"/></g>`;
  if (p.olhoSapo) orelhas = `<circle cx="72" cy="50" r="22" fill="${c1}" stroke="${esc}" stroke-width="3"/><circle cx="128" cy="50" r="22" fill="${c1}" stroke="${esc}" stroke-width="3"/>`;
  // ---- corpo ----
  corpo += `<ellipse cx="100" cy="212" rx="58" ry="8" fill="#000" opacity=".12"/>`;
  corpo += `<ellipse cx="100" cy="168" rx="56" ry="44" fill="${c1}" stroke="${esc}" stroke-width="3"/>`;
  corpo += `<ellipse cx="100" cy="176" rx="33" ry="27" fill="${c2}"/>`;
  const pe = p.bico ? '#ffa62b' : (p.bracosEsc ? esc : c1);
  corpo += `<ellipse cx="72" cy="206" rx="17" ry="9" fill="${pe}" stroke="${esc}" stroke-width="2.5"/><ellipse cx="128" cy="206" rx="17" ry="9" fill="${pe}" stroke="${esc}" stroke-width="2.5"/>`;
  if (p.asas) corpo += `<g class="bracos"><g class="braco-e"><ellipse cx="46" cy="166" rx="12" ry="28" fill="${c1}" transform="rotate(20 46 166)"/></g><g class="braco-d"><ellipse cx="154" cy="166" rx="12" ry="28" fill="${c1}" transform="rotate(-20 154 166)"/></g></g>`;
  else corpo += `<g class="bracos"><g class="braco-e"><ellipse cx="58" cy="172" rx="12" ry="17" fill="${p.bracosEsc ? esc : c1}" stroke="${esc}" stroke-width="2.5" transform="rotate(25 58 172)"/></g><g class="braco-d"><ellipse cx="142" cy="172" rx="12" ry="17" fill="${p.bracosEsc ? esc : c1}" stroke="${esc}" stroke-width="2.5" transform="rotate(-25 142 172)"/></g></g>`;
  // ---- cabeça ----
  rosto += `<circle cx="100" cy="98" r="60" fill="${c1}" stroke="${esc}" stroke-width="3"/>`;
  rosto += `<ellipse cx="82" cy="68" rx="20" ry="11" fill="#fff" opacity=".22" transform="rotate(-20 82 68)"/>`;   // brilho
  if (p.mascara) rosto += `<path d="M100 66 C70 66 52 88 56 116 C60 142 86 152 100 146 C114 152 140 142 144 116 C148 88 130 66 100 66 Z" fill="${c2}"/>`;
  if (p.rostoMacaco) rosto += `<circle cx="80" cy="92" r="22" fill="${c2}"/><circle cx="120" cy="92" r="22" fill="${c2}"/><ellipse cx="100" cy="120" rx="36" ry="26" fill="${c2}"/>`;
  if (p.listras) rosto += `<path d="M88 42 l4 14 M100 39 v15 M112 42 l-4 14" stroke="${esc}" stroke-width="4" stroke-linecap="round"/>`;
  if (p.mancha) rosto += `<ellipse cx="124" cy="86" rx="17" ry="15" fill="${esc}" opacity=".5"/>`;
  if (p.manchas) rosto += `<ellipse cx="76" cy="92" rx="15" ry="19" fill="${esc}" transform="rotate(25 76 92)"/><ellipse cx="124" cy="92" rx="15" ry="19" fill="${esc}" transform="rotate(-25 124 92)"/>`;
  if (!p.mascara && !p.rostoMacaco && !p.olhoSapo) rosto += `<ellipse cx="100" cy="120" rx="27" ry="19" fill="${c2}"/>`;
  if (p.bochechao) rosto += `<ellipse cx="62" cy="118" rx="18" ry="15" fill="${c2}" stroke="${esc}" stroke-width="2"/><ellipse cx="138" cy="118" rx="18" ry="15" fill="${c2}" stroke="${esc}" stroke-width="2"/>`;
  // olhos
  rosto += p.olhoSapo ? olhos(72, 128, 50) : olhos(77, 123, 92);
  // bochechas
  rosto += `<ellipse class="bochecha" cx="${p.olhoSapo ? 64 : 62}" cy="${p.olhoSapo ? 108 : 114}" rx="9" ry="6" fill="#ff7f98" opacity=".5"/><ellipse class="bochecha" cx="${p.olhoSapo ? 136 : 138}" cy="${p.olhoSapo ? 108 : 114}" rx="9" ry="6" fill="#ff7f98" opacity=".5"/>`;
  // nariz / bico
  if (p.bico) rosto += `<path d="M88 108 L112 108 L100 124 Z" fill="#ffa62b" stroke="#c97a10" stroke-width="2" stroke-linejoin="round"/>`;
  else if (p.olhoSapo) rosto += `<circle cx="94" cy="96" r="2.4" fill="${esc}"/><circle cx="106" cy="96" r="2.4" fill="${esc}"/>`;
  else rosto += `<ellipse cx="100" cy="110" rx="7.5" ry="5.5" fill="#3b2a20"/><ellipse cx="98" cy="108.5" rx="2.4" ry="1.4" fill="#fff" opacity=".7"/>`;
  // bocas
  const yb = p.olhoSapo ? 112 : 124, larg = p.olhoSapo ? 22 : 11;
  rosto += `<path class="boca-sorriso" d="M${100 - larg} ${yb} Q100 ${yb + (p.olhoSapo ? 16 : 11)} ${100 + larg} ${yb}" stroke="#3b2a20" stroke-width="3" fill="${p.olhoSapo ? '#e46b6b' : 'none'}" stroke-linecap="round"/>`;
  rosto += `<g class="boca-come"><ellipse cx="100" cy="${yb + 4}" rx="${p.olhoSapo ? 16 : 9}" ry="7" fill="#8a2f36"/><ellipse cx="100" cy="${yb + 7}" rx="${p.olhoSapo ? 9 : 5}" ry="3" fill="#ff8a8a"/></g>`;
  rosto += `<ellipse class="boca-susto" cx="100" cy="${yb + 5}" rx="6" ry="8" fill="#5a1e24"/>`;
  if (p.dentes) rosto += `<rect class="dentes" x="95" y="${yb + 1}" width="10" height="8" rx="2" fill="#fff" stroke="#bbb"/>`;
  if (p.bigode) rosto += `<path d="M66 116 l-22 -4 M66 122 l-22 4 M134 116 l22 -4 M134 122 l22 4" stroke="${esc}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
  if (p.chifre) frente += `<g><path d="M100 4 L88 42 L112 42 Z" fill="#ffd54a" stroke="#d4a017" stroke-width="2" stroke-linejoin="round"/><path d="M92 30 L108 26 M95 18 L105 15" stroke="#d4a017" stroke-width="2"/></g>`;
  // gotinha de suor (susto) e coraçõezinhos (comendo)
  frente += `<path class="suor" d="M156 52 Q150 64 156 70 Q162 64 156 52 Z" fill="#7fd0ff" stroke="#3a9ad9" stroke-width="1.5"/>`;
  frente += `<g class="coracoes"><path d="M160 40 c0 -6 8 -6 8 0 c0 -6 8 -6 8 0 c0 6 -8 10 -8 14 c0 -4 -8 -8 -8 -14 z" fill="#ff5c8a"/><path d="M28 54 c0 -5 6 -5 6 0 c0 -5 6 -5 6 0 c0 5 -6 8 -6 11 c0 -3 -6 -6 -6 -11 z" fill="#ff8fb0"/></g>`;
  return `<svg class="sprite est-normal" viewBox="0 0 200 222" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${tras}<g class="corpoTodo">${corpo}</g><g class="cabeca">${orelhas}${rosto}${frente}</g></svg>`;
}
function estado(el, e){ const s = el && el.querySelector('.sprite'); if (s && !s.classList.contains('est-' + e)) s.setAttribute('class', 'sprite est-' + e); }

// ---------------- cenários ----------------
const r = (a, b) => a + Math.random() * (b - a);
function muitos(n, f){ let h = ''; for (let i = 0; i < n; i++) h += f(i); return h; }
const nuvem = (top, esc, dur, atraso, cor = '#fff') => `<div class="nuvem" style="top:${top}%;transform:scale(${esc});animation-duration:${dur}s;animation-delay:-${atraso}s;--cor:${cor}"></div>`;
const CENARIOS = [
  {id: 'quintal', nome: 'Quintal ensolarado', emoji: '🌳', chuva: true, html: () => `
    <div class="ceu" style="background:linear-gradient(#7cc8ff,#d7f0ff 58%)"></div>
    <div class="sol"><div class="raios"></div></div>
    ${nuvem(8, 1, 70, 10)}${nuvem(18, .7, 95, 50)}${nuvem(4, .55, 120, 80)}
    <svg class="morros" viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 170 Q200 60 420 150 T820 130 T1200 150 V300 H0Z" fill="#9fdc7c"/><path d="M0 220 Q260 130 560 210 T1200 190 V300 H0Z" fill="#7cc95a"/></svg>
    <div class="chao" style="background:linear-gradient(#7cc95a,#5aa83c)"></div>
    <div class="cerca"></div>
    <svg class="arvore" style="left:3%" viewBox="0 0 160 260"><rect x="68" y="140" width="24" height="110" rx="8" fill="#8a5a2b"/><circle cx="80" cy="96" r="62" fill="#4caf50"/><circle cx="44" cy="120" r="40" fill="#43a047"/><circle cx="118" cy="118" r="42" fill="#5cbf60"/><circle cx="60" cy="80" r="8" fill="#e53935"/><circle cx="104" cy="100" r="8" fill="#e53935"/><circle cx="84" cy="56" r="8" fill="#e53935"/></svg>
    ${muitos(9, i => `<div class="enfeiteCena balanca" style="left:${8 + i * 11 + r(-2, 2)}%;bottom:${r(30, 38)}%;font-size:${r(26, 40)}px;animation-delay:-${r(0, 3)}s">${['🌼', '🌷', '🌻', '🌸'][i % 4]}</div>`)}
    ${muitos(3, i => `<div class="voa" style="top:${r(18, 40)}%;animation-duration:${r(16, 26)}s;animation-delay:-${r(0, 20)}s;font-size:${r(24, 34)}px">🦋</div>`)}` },
  {id: 'floresta', nome: 'Floresta encantada', emoji: '🌲', chuva: true, html: () => `
    <div class="ceu" style="background:linear-gradient(#2b4a6f,#7fb39a 60%)"></div>
    <div class="lua" style="right:14%;top:8%"></div>
    <svg class="morros" viewBox="0 0 1200 300" preserveAspectRatio="none">${muitos(14, i => { const x = i * 90 + r(-20, 20), h = r(150, 230); return `<path d="M${x} 300 L${x + 45} ${300 - h} L${x + 90} 300Z" fill="#2f6b4f"/>`; })}${muitos(12, i => { const x = i * 105 + r(-20, 30), h = r(110, 180); return `<path d="M${x} 300 L${x + 52} ${300 - h} L${x + 104} 300Z" fill="#3f8a5f"/>`; })}</svg>
    <div class="chao" style="background:linear-gradient(#4f8f3c,#2f6b2a)"></div>
    ${muitos(6, i => `<div class="enfeiteCena" style="left:${6 + i * 16 + r(-3, 3)}%;bottom:${r(31, 37)}%;font-size:${r(26, 38)}px">${['🍄', '🌿', '🍄', '🪵', '🌿', '🍄'][i]}</div>`)}
    ${muitos(22, () => `<div class="vagalume" style="left:${r(0, 100)}%;top:${r(20, 85)}%;animation-duration:${r(3, 7)}s,${r(8, 16)}s;animation-delay:-${r(0, 6)}s,-${r(0, 10)}s"></div>`)}
    ${muitos(2, () => `<div class="voa" style="top:${r(12, 30)}%;animation-duration:${r(18, 28)}s;animation-delay:-${r(0, 20)}s;font-size:28px">🦉</div>`)}` },
  {id: 'praia', nome: 'Praia', emoji: '🏖️', chuva: true, html: () => `
    <div class="ceu" style="background:linear-gradient(#5ec3ff,#fff1c9 55%)"></div>
    <div class="sol" style="left:auto;right:10%"><div class="raios"></div></div>
    ${nuvem(10, .8, 80, 30)}${nuvem(20, .6, 110, 70)}
    <div class="mar"><svg class="onda" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 Q75 0 150 30 T300 30 T450 30 T600 30 T750 30 T900 30 T1050 30 T1200 30 V60 H0Z" fill="#fff" opacity=".55"/></svg><svg class="onda o2" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 Q75 60 150 30 T300 30 T450 30 T600 30 T750 30 T900 30 T1050 30 T1200 30 V60 H0Z" fill="#fff" opacity=".35"/></svg></div>
    <div class="chao" style="background:linear-gradient(#f7dc95,#e9c06c);top:60%"></div>
    <svg class="arvore balanca lento" style="right:4%;left:auto;transform-origin:50% 100%" viewBox="0 0 200 300"><path d="M100 300 Q92 200 112 110" stroke="#8a5a2b" stroke-width="16" fill="none"/>${[-60, -20, 20, 60, 100].map(a => `<path d="M112 110 q${40 * Math.cos(a * Math.PI / 180)} ${-30 + 40 * Math.sin(a * Math.PI / 180)} ${80 * Math.cos(a * Math.PI / 180)} ${30 + 50 * Math.sin(a * Math.PI / 180)}" stroke="#2e9d4a" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}<circle cx="104" cy="118" r="9" fill="#7a4b20"/><circle cx="120" cy="120" r="9" fill="#7a4b20"/></svg>
    <div class="anda" style="bottom:22%;font-size:34px">🦀</div>
    ${muitos(4, i => `<div class="enfeiteCena" style="left:${8 + i * 20}%;bottom:${r(14, 30)}%;font-size:${r(22, 30)}px">${['🐚', '⭐', '🐚', '🏐'][i]}</div>`)}
    ${muitos(3, () => `<div class="voa" style="top:${r(8, 26)}%;animation-duration:${r(14, 22)}s;animation-delay:-${r(0, 18)}s;font-size:26px">🕊️</div>`)}` },
  {id: 'mar', nome: 'Fundo do mar', emoji: '🐠', chuva: false, html: () => `
    <div class="ceu" style="background:linear-gradient(#36b3e6,#0d5d99 55%,#073a63)"></div>
    ${muitos(6, i => `<div class="raioLuz" style="left:${i * 18 + r(-4, 4)}%;animation-delay:-${r(0, 6)}s"></div>`)}
    <div class="chao" style="background:linear-gradient(#e7cf8f,#c9a865);top:66%"></div>
    ${muitos(7, i => `<svg class="alga" style="left:${i * 15 + r(-3, 3)}%;height:${r(18, 32)}vh;animation-delay:-${r(0, 4)}s" viewBox="0 0 40 200" preserveAspectRatio="none"><path d="M20 200 Q0 160 20 120 T20 40 T20 0" stroke="${['#2fbf71', '#1fa060', '#55d38a'][i % 3]}" stroke-width="12" fill="none" stroke-linecap="round"/></svg>`)}
    ${muitos(5, i => `<div class="nada${i % 2 ? ' volta' : ''}" style="top:${r(12, 55)}%;animation-duration:${r(14, 26)}s;animation-delay:-${r(0, 20)}s;font-size:${r(30, 48)}px">${['🐠', '🐟', '🐡', '🐠', '🦈'][i]}</div>`)}
    ${muitos(26, () => `<div class="bolha" style="left:${r(0, 100)}%;width:${r(6, 18)}px;height:${r(6, 18) | 0}px;animation-duration:${r(5, 12)}s;animation-delay:-${r(0, 12)}s"></div>`)}
    ${muitos(4, i => `<div class="enfeiteCena" style="left:${10 + i * 22}%;bottom:${r(14, 24)}%;font-size:${r(26, 36)}px">${['🐚', '⭐', '🦀', '🐚'][i]}</div>`)}` },
  {id: 'espaco', nome: 'Espaço sideral', emoji: '🚀', chuva: false, html: () => `
    <div class="ceu" style="background:radial-gradient(ellipse at 30% 20%,#3a2a7a,#140f3a 55%,#07061a)"></div>
    ${muitos(90, () => `<div class="estrela" style="left:${r(0, 100)}%;top:${r(0, 62)}%;width:${r(1.5, 3.5)}px;height:${r(1.5, 3.5)}px;animation-delay:-${r(0, 4)}s;animation-duration:${r(2, 5)}s"></div>`)}
    <div class="planeta"><div class="anel"></div></div>
    <div class="cadente"></div><div class="cadente" style="animation-delay:-4s;top:18%;left:60%"></div>
    <div class="chao lunar"></div>
    <div class="voa lento" style="top:16%;animation-duration:40s;font-size:40px">🚀</div>
    <div class="voa volta" style="top:30%;animation-duration:55s;animation-delay:-20s;font-size:34px">🛰️</div>
    ${muitos(3, i => `<div class="enfeiteCena" style="left:${14 + i * 30}%;bottom:${r(16, 30)}%;font-size:28px;opacity:.9">🪨</div>`)}` },
  {id: 'neve', nome: 'Montanha de neve', emoji: '❄️', chuva: false, html: () => `
    <div class="ceu" style="background:linear-gradient(#9fc9ea,#eaf4ff 60%)"></div>
    <svg class="morros" viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 300 L180 70 L360 300Z M260 300 L520 30 L780 300Z M700 300 L930 90 L1200 300Z" fill="#8aa6c4"/><path d="M180 70 L135 128 L170 118 L200 135 L225 128Z M520 30 L462 96 L505 86 L540 104 L578 92Z M930 90 L880 150 L920 140 L950 156 L985 146Z" fill="#fff"/></svg>
    <div class="chao" style="background:linear-gradient(#ffffff,#dfe9f5)"></div>
    ${muitos(5, i => `<svg class="pinheiro" style="left:${2 + i * 21 + r(-3, 3)}%;height:${r(16, 24)}vh" viewBox="0 0 100 160"><rect x="44" y="120" width="12" height="40" fill="#7a4b20"/><path d="M50 0 L90 60 L70 60 L96 110 L4 110 L30 60 L10 60Z" fill="#2f7a4f"/><path d="M50 0 L66 24 L34 24Z M30 60 L50 50 L70 60 L60 66 L40 66Z" fill="#fff"/></svg>`)}
    <div class="enfeiteCena" style="left:72%;bottom:30%;font-size:54px">⛄</div>
    ${muitos(45, () => `<div class="floco" style="left:${r(0, 100)}%;font-size:${r(10, 22)}px;animation-duration:${r(6, 14)}s,${r(2, 4)}s;animation-delay:-${r(0, 14)}s,-${r(0, 4)}s">❄</div>`)}` },
  {id: 'quarto', nome: 'Quarto aconchegante', emoji: '🛏️', chuva: false, html: () => `
    <div class="ceu" style="background:#ffe6c4;background-image:radial-gradient(#ffd59e 2.5px,transparent 3px);background-size:34px 34px"></div>
    <div class="janela"><div class="vidro">${nuvem(20, .45, 40, 10)}<div class="lua" style="right:12%;top:14%;width:36px;height:36px"></div></div></div>
    <div class="prateleira"><span>📚</span><span>🧸</span><span>🪴</span><span>🏆</span></div>
    <div class="relogio">🕰️</div>
    <div class="chao" style="background:repeating-linear-gradient(90deg,#c98c55 0 90px,#b97b46 90px 92px);top:62%"></div>
    <div class="tapete"></div>
    <div class="enfeiteCena" style="left:5%;bottom:30%;font-size:64px">🛋️</div>
    <div class="enfeiteCena balanca" style="right:6%;left:auto;bottom:30%;font-size:58px">🪴</div>
    <div class="enfeiteCena" style="left:20%;bottom:16%;font-size:34px">🧶</div>` },
  {id: 'doce', nome: 'Reino Doce', emoji: '🍭', chuva: true, html: () => `
    <div class="ceu" style="background:linear-gradient(#ffc8e6,#e8f0ff 60%)"></div>
    <div class="arcoiris"></div>
    ${nuvem(10, .9, 80, 20, '#ffe3f3')}${nuvem(22, .6, 100, 60, '#fff')}
    <svg class="morros" viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 200 Q160 80 340 190 T700 170 T1200 180 V300 H0Z" fill="#b8f0d8"/><path d="M0 240 Q300 150 620 230 T1200 220 V300 H0Z" fill="#ffb3d1"/></svg>
    <div class="chao" style="background:repeating-linear-gradient(45deg,#ffd1e3 0 30px,#fff 30px 60px)"></div>
    ${muitos(6, i => `<div class="enfeiteCena balanca" style="left:${6 + i * 16 + r(-2, 2)}%;bottom:${r(30, 37)}%;font-size:${r(36, 52)}px;animation-delay:-${r(0, 3)}s">${['🍭', '🧁', '🍬', '🍭', '🍩', '🧁'][i]}</div>`)}
    ${muitos(18, () => `<div class="brilho" style="left:${r(0, 100)}%;top:${r(5, 60)}%;animation-delay:-${r(0, 4)}s;font-size:${r(12, 22)}px">✨</div>`)}` },
  {id: 'classico', nome: 'Clássico (o de antes)', emoji: '🌤️', chuva: false, html: () => `<div class="ceu" style="background:linear-gradient(180deg,#bfe8ff 0%,#e8f8ff 55%,#bfe9a8 55%,#9ed883 100%)"></div>` }
];
function cenario(id, el){ const c = CENARIOS.find(x => x.id === id) || CENARIOS[0]; el.innerHTML = c.html(); el.dataset.cenario = c.id; return c; }

const css = `
  #fundo{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
  #fundo > *{position:absolute}
  #fundo .ceu{inset:0}
  #fundo .chao{left:0;right:0;top:58%;bottom:0}
  #fundo.treme{animation:fundoTreme .15s linear infinite}
  @keyframes fundoTreme{25%{transform:translate(-3px,1px)}75%{transform:translate(3px,-1px)}}
  .sol{left:8%;top:6%;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,#fff6b0,#ffd23f 60%,#ffb300);box-shadow:0 0 60px 20px rgba(255,210,63,.55)}
  .sol .raios{position:absolute;inset:-40px;border-radius:50%;background:repeating-conic-gradient(rgba(255,226,120,.55) 0 8deg,transparent 8deg 22deg);animation:gira 30s linear infinite;-webkit-mask:radial-gradient(circle,transparent 52px,#000 54px);mask:radial-gradient(circle,transparent 52px,#000 54px)}
  @keyframes gira{to{transform:rotate(360deg)}}
  .lua{width:70px;height:70px;border-radius:50%;background:#fff8d8;box-shadow:0 0 40px 10px rgba(255,248,216,.5),inset -14px -8px 0 #efe2a8}
  .nuvem{left:-260px;width:200px;height:60px;background:var(--cor,#fff);border-radius:60px;animation:nuvem linear infinite;opacity:.95}
  .nuvem:before,.nuvem:after{content:"";position:absolute;background:var(--cor,#fff);border-radius:50%}
  .nuvem:before{width:90px;height:90px;left:30px;top:-45px}.nuvem:after{width:70px;height:70px;left:100px;top:-30px}
  @keyframes nuvem{to{left:110%}}
  .morros{left:0;width:100%;bottom:42%;height:24vh}
  .arvore{bottom:38%;height:34vh;width:auto;left:3%}
  .cerca{left:0;right:0;top:calc(58% - 46px);height:52px;background:linear-gradient(transparent 14px,#fff7e8 14px 22px,transparent 22px 34px,#fff7e8 34px 42px,transparent 42px),repeating-linear-gradient(90deg,#fff7e8 0 16px,transparent 16px 44px);opacity:.92}
  .enfeiteCena{line-height:1}
  .balanca{animation:balanca 3s ease-in-out infinite;transform-origin:50% 100%}
  .balanca.lento{animation-duration:5s}
  @keyframes balanca{50%{transform:rotate(6deg)}}
  .voa{left:-60px;animation:voa linear infinite}
  .voa.volta{animation-name:voaVolta}
  @keyframes voa{0%{left:-8%;transform:translateY(0)}25%{transform:translateY(-30px)}50%{transform:translateY(10px)}75%{transform:translateY(-20px)}100%{left:108%;transform:translateY(0)}}
  @keyframes voaVolta{0%{left:108%;transform:scaleX(-1)}100%{left:-8%;transform:scaleX(-1)}}
  .vagalume{width:7px;height:7px;border-radius:50%;background:#fff59d;box-shadow:0 0 10px 4px rgba(255,245,157,.8);animation:pisca ease-in-out infinite,flutua ease-in-out infinite}
  @keyframes pisca{50%{opacity:.15}}
  @keyframes flutua{50%{transform:translate(30px,-26px)}}
  .mar{left:0;right:0;top:46%;height:16%;background:linear-gradient(#1aa3e8,#4fc9f0);overflow:hidden}
  .mar .onda{position:absolute;left:0;width:200%;height:40%;top:0;animation:onda 6s linear infinite}
  .mar .onda.o2{top:35%;animation-duration:9s;animation-direction:reverse}
  @keyframes onda{to{transform:translateX(-50%)}}
  .anda{left:10%;animation:anda 14s ease-in-out infinite}
  @keyframes anda{50%{left:44%}}
  .raioLuz{top:-10%;width:12%;height:90%;background:linear-gradient(rgba(255,255,255,.28),transparent);transform:skewX(-18deg);animation:luz 6s ease-in-out infinite}
  @keyframes luz{50%{opacity:.35}}
  .alga{bottom:28%;width:40px;transform-origin:50% 100%;animation:balanca 4s ease-in-out infinite}
  .nada{left:-10%;animation:nada linear infinite}
  .nada.volta{animation-name:nadaVolta}
  @keyframes nada{0%{left:-10%;transform:scaleX(-1) translateY(0)}50%{transform:scaleX(-1) translateY(-18px)}100%{left:110%;transform:scaleX(-1) translateY(0)}}
  @keyframes nadaVolta{0%{left:110%}50%{transform:translateY(16px)}100%{left:-10%}}
  .bolha{bottom:-20px;border-radius:50%;border:2px solid rgba(255,255,255,.75);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.7),rgba(255,255,255,.1));animation:bolha linear infinite}
  @keyframes bolha{to{bottom:105%;transform:translateX(30px)}}
  .estrela{border-radius:50%;background:#fff;animation:pisca ease-in-out infinite}
  .planeta{right:10%;top:10%;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffc38a,#e86f4f 60%,#a83d3d);box-shadow:inset -18px -10px 0 rgba(0,0,0,.18)}
  .planeta .anel{position:absolute;left:-40px;right:-40px;top:48px;height:26px;border-radius:50%;border:6px solid rgba(255,230,170,.85);transform:rotate(-14deg)}
  .cadente{left:10%;top:8%;width:140px;height:3px;background:linear-gradient(90deg,#fff,transparent);transform:rotate(-24deg);opacity:0;animation:cadente 7s ease-in infinite}
  @keyframes cadente{0%,80%{opacity:0;transform:translate(0,0) rotate(-24deg)}84%{opacity:1}100%{opacity:0;transform:translate(-320px,150px) rotate(-24deg)}}
  .chao.lunar{background:radial-gradient(circle at 20% 30%,#9a9aa8 0 18px,transparent 20px),radial-gradient(circle at 70% 60%,#9a9aa8 0 26px,transparent 28px),radial-gradient(circle at 45% 80%,#9a9aa8 0 14px,transparent 16px),linear-gradient(#c9c9d4,#9d9daa)}
  .pinheiro{bottom:38%;width:auto}
  .floco{top:-30px;color:#fff;text-shadow:0 0 4px #9bbbe0;animation:neve linear infinite,balancaX ease-in-out infinite}
  @keyframes neve{to{top:105%}}
  @keyframes balancaX{50%{margin-left:24px}}
  .janela{left:50%;top:7%;transform:translateX(-50%);width:260px;height:180px;background:#fff;border-radius:14px;padding:10px;box-shadow:0 6px 0 #c99a6a}
  .janela .vidro{position:relative;width:100%;height:100%;border-radius:8px;overflow:hidden;background:linear-gradient(#2b3d6b,#6b8fd1)}
  .janela .vidro:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 48%,#fff 48% 52%,transparent 52%),linear-gradient(transparent 48%,#fff 48% 52%,transparent 52%)}
  .janela .nuvem{position:absolute}
  .janela .lua{position:absolute}
  .prateleira{left:6%;top:16%;padding:4px 10px;border-bottom:10px solid #a8703f;font-size:40px;display:flex;gap:6px}
  .relogio{right:8%;top:12%;font-size:56px;animation:balanca 2s ease-in-out infinite}
  .tapete{left:30%;right:30%;top:74%;height:16%;border-radius:50%;background:repeating-radial-gradient(#ff8fa3 0 14px,#ffd1dc 14px 28px);opacity:.9}
  .arcoiris{left:50%;top:6%;width:760px;height:380px;margin-left:-380px;border-radius:380px 380px 0 0;background:radial-gradient(circle at 50% 100%,transparent 52%,#a0d8ff 52% 57%,#b4f0a8 57% 62%,#fff59d 62% 67%,#ffcc80 67% 72%,#ff9ab8 72% 77%,transparent 77%);opacity:.85}
  .brilho{animation:pisca 2.4s ease-in-out infinite}
  #tormenta{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity .6s}
  #tormenta .escuro{position:absolute;inset:0;background:linear-gradient(rgba(40,48,70,.75),rgba(40,48,70,.25) 60%,transparent)}
  #tormenta .chuva{position:absolute;inset:-20% 0 0;background:repeating-linear-gradient(105deg,transparent 0 22px,rgba(200,220,255,.55) 22px 24px);background-size:100% 140px;animation:chuva .45s linear infinite}
  @keyframes chuva{to{background-position:0 140px}}
  #tormenta .nuvemPreta{position:absolute;top:2%;left:50%;transform:translateX(-50%);font-size:clamp(70px,12vw,140px);filter:drop-shadow(0 6px 10px rgba(0,0,0,.3))}
  #tormenta.semChuva .chuva,#tormenta.semChuva .nuvemPreta{display:none}
  /* sprite */
  .sprite{width:var(--tam,min(30vh,260px));height:auto;display:block;overflow:visible;filter:drop-shadow(0 10px 8px rgba(0,0,0,.15))}
  .sprite .olhar{transform:translate(var(--ox,0px),var(--oy,0px));transition:transform .25s ease-out}
  .sprite .braco-d{transform-origin:142px 160px;transform-box:view-box}
  .sprite .bochecha{transform-box:fill-box;transform-origin:center;transition:transform .2s}
  .sprite.est-come .bochecha{transform:scale(1.5);opacity:.75}
  .sprite.acena .braco-d{animation:acena .35s ease-in-out 5}
  @keyframes acena{50%{transform:rotate(-70deg) translate(4px,-6px)}}
  .sprite .olho-normal,.sprite .olho-feliz,.sprite .olho-susto,.sprite .boca-come,.sprite .coracoes,.sprite .suor,.sprite .orelhas,.sprite .cabeca,.sprite .corpoTodo{transform-box:fill-box}
  .sprite .olho-feliz,.sprite .olho-susto,.sprite .boca-come,.sprite .boca-susto,.sprite .suor,.sprite .coracoes{display:none}
  .sprite .olho-normal{transform-origin:center;animation:piscar 4.5s infinite}
  @keyframes piscar{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
  .sprite .cauda{animation:abana 1.2s ease-in-out infinite;transform-box:view-box}
  @keyframes abana{50%{transform:rotate(-12deg)}}
  .sprite .cabeca{transform-origin:50% 90%;animation:cabeca 3.2s ease-in-out infinite}
  @keyframes cabeca{50%{transform:rotate(2deg) translateY(1px)}}
  .sprite.est-come .olho-normal{display:none}.sprite.est-come .olho-feliz{display:inline}
  .sprite.est-come .boca-sorriso,.sprite.est-come .dentes{display:none}
  .sprite.est-come .boca-come{display:inline;transform-origin:center;animation:mastiga .32s ease-in-out infinite}
  @keyframes mastiga{50%{transform:scaleY(.25)}}
  .sprite.est-come .coracoes{display:inline;animation:coracao 1.6s ease-out infinite}
  @keyframes coracao{0%{opacity:0;transform:translateY(10px)}30%{opacity:1}100%{opacity:0;transform:translateY(-26px)}}
  .sprite.est-come .cauda{animation-duration:.5s}
  .sprite.est-come .corpoTodo,.sprite.est-come .cabeca{animation:mastigaCorpo .32s ease-in-out infinite}
  @keyframes mastigaCorpo{50%{transform:translateY(2px)}}
  .sprite.est-susto .olho-normal{display:none}.sprite.est-susto .olho-susto{display:inline}
  .sprite.est-susto .boca-sorriso,.sprite.est-susto .dentes{display:none}.sprite.est-susto .boca-susto{display:inline}
  .sprite.est-susto .suor{display:inline;animation:suor 1s ease-in infinite}
  @keyframes suor{to{transform:translateY(14px);opacity:.2}}
  .sprite.est-susto .orelhas{transform-origin:50% 100%;animation:orelhaSusto .15s linear infinite}
  @keyframes orelhaSusto{50%{transform:translateY(3px) scaleY(.92)}}
  .sprite.est-susto .cauda{animation:none}
  .sprite.est-feliz .olho-normal{display:none}.sprite.est-feliz .olho-feliz{display:inline}
  .sprite.est-feliz .coracoes{display:inline;animation:coracao 1.2s ease-out infinite}
  .sprite.est-feliz .orelhas{transform-origin:50% 100%;animation:orelhaFeliz .3s ease-in-out infinite}
  @keyframes orelhaFeliz{50%{transform:rotate(4deg)}}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
window.ARTE = {sprite, estado, cenario, CENARIOS, TIPOS: Object.keys(P)};
})();
