/* Utilidades compartilhadas pelas atividades de Morfologia. */
(function(){
'use strict';
// Classes de palavras: código curto (usado nas frases marcadas), nome, cor e definição para crianças
const CLASSES = {
  s: {id: 'substantivo', nome: 'Substantivo', plural: 'Substantivos', cor: '#2f80ed', emoji: '🏷️', def: 'Dá nome a pessoas, animais, objetos, lugares e sentimentos.'},
  a: {id: 'adjetivo',    nome: 'Adjetivo', plural: 'Adjetivos',    cor: '#27ae60', emoji: '🎨', def: 'Mostra uma característica do substantivo (como ele é).'},
  v: {id: 'verbo',       nome: 'Verbo', plural: 'Verbos',       cor: '#e74c3c', emoji: '🏃', def: 'Indica ação, estado ou fenômeno da natureza.'},
  t: {id: 'artigo',      nome: 'Artigo', plural: 'Artigos',      cor: '#8e44ad', emoji: '🔹', def: 'Vem antes do substantivo: o, a, os, as, um, uma.'},
  p: {id: 'pronome',     nome: 'Pronome', plural: 'Pronomes',     cor: '#e67e22', emoji: '🙋', def: 'Substitui ou acompanha o nome: eu, ele, nós, meu, este.'},
  n: {id: 'numeral',     nome: 'Numeral', plural: 'Numerais',     cor: '#16a085', emoji: '🔢', def: 'Indica quantidade ou ordem: dois, dez, primeiro.'},
  d: {id: 'adverbio',    nome: 'Advérbio', plural: 'Advérbios',    cor: '#c2185b', emoji: '⏱️', def: 'Indica tempo, lugar, modo ou intensidade: ontem, aqui, devagar.'}
};
const BASICO = ['s', 'a', 'v'];
const sem = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
// aceita "s", "substantivo", "Substantivo", "advérbio"...
function codigo(x){
  x = sem(x).trim();
  if (CLASSES[x]) return x;
  return Object.keys(CLASSES).find(k => CLASSES[k].id === x || sem(CLASSES[k].nome) === x) || null;
}
// "gato/s." -> {texto:'gato.', palavra:'gato', classe:'s'}
function lerToken(tok){
  const m = tok.match(/^(.+?)\/([a-z]+)([.,!?;:…"”)]*)$/i);
  if (m){ const c = codigo(m[2]); return {texto: m[1] + m[3], palavra: m[1], classe: c}; }
  return {texto: tok, palavra: tok.replace(/[.,!?;:…"“”()]/g, ''), classe: null};
}
function embaralhar(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const param = n => new URLSearchParams(location.search).get(n);

// Caixas de seleção das classes (nível básico já marcado)
function montarEscolhaClasses(el, disponiveis, aoMudar){
  const lista = (disponiveis && disponiveis.length ? disponiveis : Object.keys(CLASSES)).map(codigo).filter(Boolean);
  el.innerHTML = `<div class="linha" style="justify-content:flex-start;margin:4px 0">
      <button type="button" data-nivel="basico">1º ao 3º ano (básico)</button><button type="button" data-nivel="completo">4º e 5º ano (completo)</button></div>
    <div style="display:flex;flex-wrap:wrap;gap:4px 16px">` +
    lista.map(c => `<label style="margin:2px 0"><input type="checkbox" data-c="${c}" ${BASICO.includes(c) ? 'checked' : ''}>
      <span style="background:${CLASSES[c].cor};color:#fff;border-radius:8px;padding:2px 8px;font-weight:bold">${CLASSES[c].emoji} ${CLASSES[c].nome}</span></label>`).join('') + '</div>';
  el.querySelector('[data-nivel=basico]').onclick = () => { el.querySelectorAll('input').forEach(i => i.checked = BASICO.includes(i.dataset.c)); aoMudar && aoMudar(); };
  el.querySelector('[data-nivel=completo]').onclick = () => { el.querySelectorAll('input').forEach(i => i.checked = true); aoMudar && aoMudar(); };
  el.querySelectorAll('input').forEach(i => i.onchange = () => aoMudar && aoMudar());
}
const classesMarcadas = el => [...el.querySelectorAll('input[data-c]:checked')].map(i => i.dataset.c);

// Placar: turma toda (0) ou 2 a 4 equipes que se revezam
const EQUIPES = [{nome:'Leões',emoji:'🦁',cor:'#e74c3c'},{nome:'Golfinhos',emoji:'🐬',cor:'#2f80ed'},{nome:'Papagaios',emoji:'🦜',cor:'#27ae60'},{nome:'Abelhas',emoji:'🐝',cor:'#e6a800'}];
function criarPlacar(el, n){
  const p = {equipes: n ? EQUIPES.slice(0, n).map(e => Object.assign({pontos: 0}, e)) : [], vez: 0, turma: 0};
  p.desenhar = () => {
    el.innerHTML = p.equipes.length
      ? p.equipes.map((e, i) => `<span class="chipEq ${i === p.vez ? 'davez' : ''}" style="background:${e.cor}">${e.emoji} ${AoVivo.esc(e.nome)}<b>${e.pontos}</b></span>`).join('')
      : `<span class="chipEq davez" style="background:var(--texto)">👩‍🏫 Turma toda<b>${p.turma}</b></span>`;
  };
  p.pontuar = (pts = 1) => { if (p.equipes.length) p.equipes[p.vez].pontos += pts; else p.turma += pts; p.desenhar(); };
  p.proxima = () => { if (p.equipes.length) p.vez = (p.vez + 1) % p.equipes.length; p.desenhar(); };
  p.prefixo = () => p.equipes.length ? `${p.equipes[p.vez].emoji} ${p.equipes[p.vez].nome}: ` : '';
  p.ranking = (elR, maximo) => {
    if (p.equipes.length){
      const g = {}, tot = {}; p.equipes.forEach((e, i) => { g['e' + i] = e; tot['e' + i] = e.pontos; });
      AoVivo.desenharRanking(elR, g, tot, null, true);
    } else elR.innerHTML = `<div class="linhaRank campeao"><span class="pos">⭐</span><span class="nomeRank">Turma toda</span><span class="pts">${p.turma}${maximo ? ' de ' + maximo : ''}</span></div>`;
  };
  p.desenhar();
  return p;
}

// estilos comuns
const css = document.createElement('style');
css.textContent = `
  .barraEquipes{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:6px 0}
  .chipEq{color:#fff;border-radius:16px;padding:6px 14px;font-weight:bold;font-size:1.2rem;opacity:.55;transition:all .3s;box-shadow:0 3px 0 #0002}
  .chipEq.davez{opacity:1;transform:scale(1.12);box-shadow:0 0 0 4px #fff,0 0 0 8px var(--amarelo)}
  .chipEq b{margin-left:6px;background:#fff3;border-radius:10px;padding:0 8px}
  .tremer{animation:mtremer .4s}
  @keyframes mtremer{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`;
document.head.appendChild(css);

window.Morfo = {CLASSES, BASICO, codigo, lerToken, embaralhar, param, montarEscolhaClasses, classesMarcadas, criarPlacar};
})();
