/* Aba de aula: quando o JSON da atividade tem "aula", aparece uma abinha fixa embaixo da tela.
   Ela abre a explicação em letra grande (todos os cartões ou um por vez), para o professor dar a aula
   antes do exercício. Formato: {"aula": {"titulo", "intro", "blocos": [{"titulo","emoji","cor","explica","palavras":[],"exemplos":[]}], "dicas": []}}
   Nos exemplos, o trecho entre colchetes [assim] fica destacado. */
(function(){
'use strict';
const esc = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const marcar = (t, cor) => esc(t).replace(/\[([^\]]+)\]/g, `<mark style="background:${cor}33;border-bottom:3px solid ${cor};color:inherit;border-radius:4px;padding:0 3px">$1</mark>`);
const css = `
  #aulaAba{position:fixed;left:16px;bottom:0;z-index:900;border:none;border-radius:16px 16px 0 0;padding:10px 26px 12px;
    background:linear-gradient(135deg,#1f3a68,#2f80ed);color:#fff;font:bold 18px "Segoe UI",system-ui,sans-serif;cursor:pointer;box-shadow:0 -4px 16px rgba(0,0,0,.25)}
  #aulaAba:hover{padding-bottom:16px}
  #aulaTela{position:fixed;inset:0;z-index:950;background:#f4f6fb;display:none;flex-direction:column;font-family:"Segoe UI",system-ui,sans-serif;color:#1f2937}
  #aulaTela.on{display:flex}
  #aulaTopo{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;padding:10px 16px;background:#1f3a68;color:#fff}
  #aulaTopo h2{margin:0;font-size:clamp(1.2rem,2.6vw,1.8rem)}
  #aulaTopo button{border:none;border-radius:12px;padding:8px 14px;font:bold 15px inherit;cursor:pointer;background:#fff;color:#1f3a68;margin-left:4px}
  #aulaTopo button.on{background:#ffd54a}
  #aulaCorpo{flex:1;overflow:auto;padding:14px 16px 90px}
  #aulaIntro{max-width:1100px;margin:0 auto 12px;font-size:clamp(1.05rem,2vw,1.35rem);line-height:1.45;background:#fff;border-radius:16px;padding:12px 18px;border-left:8px solid #2f80ed}
  .aulaGrade{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;max-width:1300px;margin:0 auto}
  .aulaCartao{background:#fff;border-radius:18px;padding:14px 16px;border-top:10px solid var(--cor);box-shadow:0 4px 14px rgba(0,0,0,.07)}
  .aulaCartao h3{margin:0 0 6px;font-size:1.3rem;color:var(--cor)}
  .aulaCartao .exp{font-size:1.05rem;line-height:1.4;margin-bottom:8px}
  .aulaCartao .pals{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
  .aulaCartao .pals span{background:var(--cor);color:#fff;border-radius:999px;padding:3px 11px;font-weight:bold;font-size:.95rem}
  .aulaCartao .ex{background:#f7f8fb;border-radius:10px;padding:7px 10px;margin:5px 0;font-size:1.02rem;line-height:1.45}
  .aulaCartao.grande{max-width:1100px;margin:0 auto;padding:3vh 3vw;font-size:clamp(1.2rem,2.6vw,2rem)}
  .aulaCartao.grande h3{font-size:1.6em}
  .aulaCartao.grande .exp,.aulaCartao.grande .ex{font-size:1em}
  .aulaCartao.grande .pals span{font-size:.85em;padding:5px 16px}
  #aulaNav{display:none;justify-content:center;align-items:center;gap:14px;margin:14px 0}
  #aulaNav button{border:none;border-radius:14px;padding:12px 22px;font:bold 20px inherit;cursor:pointer;background:#1f3a68;color:#fff}
  #aulaNav span{font-weight:bold;font-size:1.1rem}
  #aulaRodape{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:center;padding:12px;background:linear-gradient(transparent,#f4f6fb 40%)}
  #aulaRodape button{border:none;border-radius:16px;padding:14px 30px;font:bold 20px inherit;cursor:pointer;background:#ffd54a;color:#1a1a1a;box-shadow:0 4px 0 rgba(0,0,0,.15)}
`;
let aula = null, modo = 'todos', i = 0, cartoes = [];
function montar(){
  if (document.getElementById('aulaTela')) return;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const aba = document.createElement('button'); aba.id = 'aulaAba'; aba.type = 'button'; aba.hidden = true; document.body.appendChild(aba);
  const tela = document.createElement('div'); tela.id = 'aulaTela'; tela.setAttribute('role', 'dialog');
  tela.innerHTML = `<div id="aulaTopo"><h2 id="aulaTitulo"></h2><div><button type="button" data-m="todos">🗂️ Todos</button><button type="button" data-m="um">🖥️ Um por vez</button><button type="button" id="aulaFechar">✖ Fechar</button></div></div>
    <div id="aulaCorpo"><div id="aulaIntro"></div><div id="aulaConteudo"></div><div id="aulaNav"><button type="button" id="aulaAnt">◀</button><span id="aulaCont"></span><button type="button" id="aulaProx">▶</button></div></div>
    <div id="aulaRodape"><button type="button" id="aulaExercicio">▶️ Ir para o exercício</button></div>`;
  document.body.appendChild(tela);
  aba.onclick = abrir;
  document.getElementById('aulaFechar').onclick = fechar;
  document.getElementById('aulaExercicio').onclick = fechar;
  tela.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { modo = b.dataset.m; i = 0; desenhar(); });
  document.getElementById('aulaAnt').onclick = () => { i = Math.max(0, i - 1); desenhar(); };
  document.getElementById('aulaProx').onclick = () => { i = Math.min(cartoes.length - 1, i + 1); desenhar(); };
  document.addEventListener('keydown', ev => {
    if (!tela.classList.contains('on')) return;
    if (ev.key === 'Escape') fechar();
    if (modo === 'um' && ev.key === 'ArrowRight'){ i = Math.min(cartoes.length - 1, i + 1); desenhar(); }
    if (modo === 'um' && ev.key === 'ArrowLeft'){ i = Math.max(0, i - 1); desenhar(); }
  });
}
function cartao(b, grande){
  const cor = b.cor || '#2f80ed';
  return `<div class="aulaCartao${grande ? ' grande' : ''}" style="--cor:${esc(cor)}"><h3>${esc((b.emoji ? b.emoji + ' ' : '') + b.titulo)}</h3>` +
    (b.explica ? `<div class="exp">${marcar(b.explica, cor)}</div>` : '') +
    (b.palavras && b.palavras.length ? `<div class="pals">${b.palavras.map(p => `<span>${esc(p)}</span>`).join('')}</div>` : '') +
    (b.exemplos || []).map(e => `<div class="ex">${marcar(e, cor)}</div>`).join('') + '</div>';
}
function desenhar(){
  document.querySelectorAll('#aulaTopo [data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === modo));
  document.getElementById('aulaIntro').style.display = modo === 'todos' && aula.intro ? '' : 'none';
  document.getElementById('aulaNav').style.display = modo === 'um' ? 'flex' : 'none';
  document.getElementById('aulaConteudo').innerHTML = modo === 'todos' ? `<div class="aulaGrade">${cartoes.map(b => cartao(b, false)).join('')}</div>` : cartao(cartoes[i], true);
  document.getElementById('aulaCont').textContent = `${i + 1} de ${cartoes.length}`;
}
function abrir(){ if (!aula) return; document.getElementById('aulaTela').classList.add('on'); desenhar(); }
function fechar(){ document.getElementById('aulaTela').classList.remove('on'); }
// prepara a aba para a aula do JSON (ou esconde, se não houver aula)
function preparar(a, op){
  montar();
  const aba = document.getElementById('aulaAba');
  aula = a && Array.isArray(a.blocos) && a.blocos.length ? a : null;
  if (!aula){ aba.hidden = true; fechar(); return; }
  cartoes = aula.blocos.concat(aula.dicas && aula.dicas.length ? [{titulo: aula.tituloDicas || 'Fique atento', emoji: '⚠️', cor: '#b45309', palavras: [], exemplos: aula.dicas}] : []);
  document.getElementById('aulaTitulo').textContent = '📖 ' + (aula.titulo || 'Aula');
  document.getElementById('aulaIntro').innerHTML = marcar(aula.intro || '', '#2f80ed');
  aba.textContent = '📖 ' + (aula.aba || aula.titulo || 'Aula') + ' ▲';
  aba.hidden = false; i = 0;
  if (op && op.abrir) abrir();
}
window.Aula = {preparar, abrir, fechar};
})();
