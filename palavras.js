/* =========================================================================
   Banco de palavras compartilhado pelas atividades:
   Forca, Forme a Palavra, Separação de Sílabas e Ditado Falado.
   Também traz utilidades comuns (voz, sons, confete, lista própria em JSON).
   ========================================================================= */
(function(){
'use strict';

// [sílabas separadas por hífen, figura, categorias]
// As categorias CH, LH e NH são detectadas automaticamente pela grafia.
const BRUTO = [
  // Animais
  ['ga-to','🐱','animais'], ['pa-to','🦆','animais'], ['sa-po','🐸','animais'], ['va-ca','🐄','animais'],
  ['ra-to','🐭','animais'], ['ca-va-lo','🐴','animais'], ['ma-ca-co','🐒','animais'], ['co-e-lho','🐰','animais'],
  ['a-be-lha','🐝','animais'], ['ga-li-nha','🐔','animais'], ['pei-xe','🐟','animais'], ['co-bra','🐍','animais'],
  ['ja-ca-ré','🐊','animais'], ['le-ão','🦁','animais'], ['ti-gre','🐯','animais'], ['e-le-fan-te','🐘','animais'],
  ['tar-ta-ru-ga','🐢','animais'], ['bor-bo-le-ta','🦋','animais'], ['co-ru-ja','🦉','animais'], ['por-co','🐷','animais'],
  ['o-ve-lha','🐑','animais'], ['gi-ra-fa','🦒','animais'], ['ze-bra','🦓','animais'], ['ur-so','🐻','animais'],
  ['pin-guim','🐧','animais'], ['ba-lei-a','🐋','animais'], ['ca-chor-ro','🐶','animais'], ['a-ra-nha','🕷️','animais'],
  ['mi-nho-ca','🪱','animais'], ['ca-ra-col','🐌','animais'], ['pol-vo','🐙','animais'], ['ca-ma-le-ão','🦎','animais'],
  // Frutas e alimentos
  ['ba-na-na','🍌','frutas'], ['ma-çã','🍎','frutas'], ['u-va','🍇','frutas'], ['pe-ra','🍐','frutas'],
  ['la-ran-ja','🍊','frutas'], ['mo-ran-go','🍓','frutas'], ['a-ba-ca-xi','🍍','frutas'], ['me-lan-ci-a','🍉','frutas'],
  ['man-ga','🥭','frutas'], ['li-mão','🍋','frutas'], ['ce-re-ja','🍒','frutas'], ['co-co','🥥','frutas'],
  ['pês-se-go','🍑','frutas'], ['a-ba-ca-te','🥑','frutas'], ['bo-lo','🎂','frutas'], ['cho-co-la-te','🍫','frutas'],
  ['mi-lho','🌽','frutas'], ['a-lho','🧄','frutas'], ['re-po-lho','🥬','frutas'], ['ce-nou-ra','🥕','frutas'],
  ['to-ma-te','🍅','frutas'], ['pi-ru-li-to','🍭','frutas'], ['pi-po-ca','🍿','frutas'], ['quei-jo','🧀','frutas'],
  // Objetos
  ['bo-la','⚽','coisas'], ['li-vro','📕','coisas'], ['ca-sa','🏠','coisas'], ['lá-pis','✏️','coisas'],
  ['te-sou-ra','✂️','coisas'], ['re-ló-gio','⏰','coisas'], ['sa-pa-to','👞','coisas'], ['ca-mi-sa','👕','coisas'],
  ['ca-ne-ta','🖊️','coisas'], ['ca-ma','🛏️','coisas'], ['pi-a-no','🎹','coisas'], ['car-ro','🚗','coisas'],
  ['a-vi-ão','✈️','coisas'], ['bi-ci-cle-ta','🚲','coisas'], ['ba-lão','🎈','coisas'], ['es-co-la','🏫','coisas'],
  ['cha-péu','🎩','coisas'], ['chi-ne-lo','🩴','coisas'], ['cha-ve','🔑','coisas'], ['mo-chi-la','🎒','coisas'],
  ['pa-lha-ço','🤡','coisas'], ['di-nhei-ro','💵','coisas'], ['ba-nhei-ra','🛁','coisas'], ['ó-cu-los','👓','coisas'],
  ['co-ro-a','👑','coisas'], ['fo-gue-te','🚀','coisas'], ['ca-mi-nhão','🚚','coisas'], ['te-le-fo-ne','☎️','coisas'],
  ['vi-o-lão','🎸','coisas'], ['mar-te-lo','🔨','coisas'], ['bar-co','⛵','coisas'], ['pre-sen-te','🎁','coisas'],
  // Natureza
  ['sol','☀️','natureza'], ['lu-a','🌙','natureza'], ['es-tre-la','⭐','natureza'], ['nu-vem','☁️','natureza'],
  ['ár-vo-re','🌳','natureza'], ['flor','🌸','natureza'], ['chu-va','🌧️','natureza'], ['fo-lha','🍃','natureza'],
  ['mon-ta-nha','⛰️','natureza'], ['ni-nho','🪺','natureza'], ['fo-go','🔥','natureza'],
  ['ne-ve','❄️','natureza'], ['on-da','🌊','natureza'], ['cac-to','🌵','natureza'], ['vul-cão','🌋','natureza'],
  // Corpo e outras com CH / LH / NH
  ['o-lho','👁️','corpo'], ['u-nha','💅','corpo'], ['bo-ca','👄','corpo'], ['den-te','🦷','corpo'],
  ['de-do','☝️','corpo'], ['o-re-lha','👂','corpo'], ['na-riz','👃','corpo'], ['bra-ço','💪','corpo'],
  ['so-nho','💭','corpo'], ['ba-nho','🛀','corpo'], ['chu-vei-ro','🚿','coisas'], ['co-zi-nha','🍳','coisas'],
  // --- ampliação ---
  ['ca-me-lo','🐪','animais'], ['lo-bo','🐺','animais'], ['ra-po-sa','🦊','animais'], ['pan-da','🐼','animais'],
  ['co-a-la','🐨','animais'], ['es-qui-lo','🐿️','animais'], ['mor-ce-go','🦇','animais'], ['fla-min-go','🦩','animais'],
  ['pa-pa-gai-o','🦜','animais'], ['pa-vão','🦚','animais'], ['cis-ne','🦢','animais'], ['pom-ba','🕊️','animais'],
  ['á-gui-a','🦅','animais'], ['for-mi-ga','🐜','animais'], ['jo-a-ni-nha','🐞','animais'], ['gri-lo','🦗','animais'],
  ['mos-qui-to','🦟','animais'], ['ca-ran-gue-jo','🦀','animais'], ['ca-ma-rão','🦐','animais'], ['lu-la','🦑','animais'],
  ['tu-ba-rão','🦈','animais'], ['gol-fi-nho','🐬','animais'], ['fo-ca','🦭','animais'], ['lon-tra','🦦','animais'],
  ['hi-po-pó-ta-mo','🦛','animais'], ['ri-no-ce-ron-te','🦏','animais'], ['go-ri-la','🦍','animais'], ['bú-fa-lo','🐃','animais'],
  ['ca-bra','🐐','animais'], ['ve-a-do','🦌','animais'], ['lei-tão','🐖','animais'], ['pin-ti-nho','🐤','animais'],
  ['ba-ta-ta','🥔','frutas'], ['ce-bo-la','🧅','frutas'], ['pi-men-ta','🌶️','frutas'], ['pe-pi-no','🥒','frutas'],
  ['bró-co-lis','🥦','frutas'], ['co-gu-me-lo','🍄','frutas'], ['o-vo','🥚','frutas'], ['lei-te','🥛','frutas'],
  ['so-pa','🍲','frutas'], ['piz-za','🍕','frutas'], ['sor-ve-te','🍦','frutas'], ['bis-coi-to','🍪','frutas'],
  ['ham-búr-guer','🍔','frutas'], ['sal-si-cha','🌭','frutas'], ['ar-roz','🍚','frutas'], ['ca-fé','☕','frutas'],
  ['su-co','🧃','frutas'], ['ki-wi','🥝','frutas'], ['a-zei-to-na','🫒','frutas'], ['pão-zi-nho','🥖','frutas'],
  ['ca-dei-ra','🪑','coisas'], ['por-ta','🚪','coisas'], ['ja-ne-la','🪟','coisas'], ['lâm-pa-da','💡','coisas'],
  ['ve-la','🕯️','coisas'], ['ces-ta','🧺','coisas'], ['vas-sou-ra','🧹','coisas'], ['tam-bor','🥁','coisas'],
  ['trom-pe-te','🎺','coisas'], ['mi-cro-fo-ne','🎤','coisas'], ['câ-me-ra','📷','coisas'], ['com-pu-ta-dor','💻','coisas'],
  ['te-le-vi-são','📺','coisas'], ['rá-dio','📻','coisas'], ['bo-né','🧢','coisas'], ['mei-a','🧦','coisas'],
  ['lu-va','🧤','coisas'], ['cal-ça','👖','coisas'], ['ves-ti-do','👗','coisas'], ['sa-pa-ti-lha','🩰','coisas'],
  ['ti-jo-lo','🧱','coisas'], ['ân-co-ra','⚓','coisas'], ['ô-ni-bus','🚌','coisas'], ['mo-to','🏍️','coisas'],
  ['he-li-cóp-te-ro','🚁','coisas'], ['na-vi-o','🚢','coisas'], ['tra-tor','🚜','coisas'], ['am-bu-lân-cia','🚑','coisas'],
  ['pi-pa','🪁','coisas'], ['ur-si-nho','🧸','coisas'], ['es-pe-lho','🪞','coisas'], ['es-co-va','🪥','coisas'],
  ['sa-bo-ne-te','🧼','coisas'], ['ca-ne-ca','☕','coisas'], ['ma-la','🧳','coisas'], ['cha-lei-ra','🫖','coisas'],
  ['pi-nhei-ro','🌲','natureza'], ['rai-o','⚡','natureza'], ['ven-to','🌬️','natureza'], ['pe-dra','🪨','natureza'],
  ['co-me-ta','☄️','natureza'], ['pla-ne-ta','🪐','natureza'], ['ter-ra','🌍','natureza'], ['i-lha','🏝️','natureza'],
  ['gi-ras-sol','🌻','natureza'], ['ro-sa','🌹','natureza'], ['tu-li-pa','🌷','natureza'], ['con-cha','🐚','natureza'],
  ['ca-be-lo','💇','corpo'], ['lín-gua','👅','corpo'], ['os-so','🦴','corpo'], ['co-ra-ção','❤️','corpo'],
  ['cé-re-bro','🧠','corpo'], ['pul-mão','🫁','corpo'], ['pé','🦶','corpo'], ['mão','✋','corpo'],
  ['pão','🍞','frutas'], ['mel','🍯','frutas'], ['trem','🚆','coisas'], ['mar','🌊','natureza']
];

const CATEGORIAS = {
  todas:'🌈 Todas', animais:'🐾 Animais', frutas:'🍎 Alimentos', coisas:'🎒 Objetos',
  natureza:'🌳 Natureza', corpo:'🙂 Corpo', ch:'CH', lh:'LH', nh:'NH',
  s2:'2 sílabas', s3:'3 sílabas', s4:'4 ou mais sílabas', propria:'📂 Minha lista'
};

function criarItem(silabasTxt, emoji, cats){
  silabasTxt = String(silabasTxt || '').trim();
  const temHifen = silabasTxt.includes('-');
  const silabas = temHifen ? silabasTxt.split('-').map(s => s.trim()).filter(Boolean) : null;
  const palavra = temHifen ? silabas.join('') : silabasTxt;
  const baixa = palavra.toLowerCase();
  const c = new Set(cats || []);
  if (baixa.includes('ch')) c.add('ch');
  if (baixa.includes('lh')) c.add('lh');
  if (baixa.includes('nh')) c.add('nh');
  if (silabas) c.add(silabas.length === 2 ? 's2' : silabas.length === 3 ? 's3' : silabas.length >= 4 ? 's4' : 's1');
  return {palavra, silabas, emoji: emoji || '', cats: c, dica: ''};
}

const vistos = new Set();
const BANCO = [];
BRUTO.forEach(([s, e, c]) => {
  if (vistos.has(s)) return; vistos.add(s);
  BANCO.push(criarItem(s, e, [c]));
});

// ---------- Armazenamento ----------
const guardar = (k, v) => { try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} };
const ler = k => { try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } };
const CHAVE_PROPRIA = 'painel_palavras';

// ---------- Lista própria (JSON ou texto) ----------
function interpretar(texto){
  texto = (texto || '').trim();
  if (!texto) return {titulo:'', itens:[]};
  let arr, titulo = '';
  try{
    const d = JSON.parse(texto);
    arr = Array.isArray(d) ? d : (d.palavras || d.lista || d.itens || []);
    titulo = Array.isArray(d) ? '' : (d.titulo || d.nome || '');
  }catch(e){
    arr = texto.split(/\r?\n|;/);
  }
  const itens = [], ja = new Set();
  (arr || []).forEach(x => {
    let it = null;
    if (typeof x === 'string'){
      if (x.trim()) it = criarItem(x.trim(), '', []);
    } else if (x && typeof x === 'object'){
      const sil = x.silabas ? (Array.isArray(x.silabas) ? x.silabas.join('-') : String(x.silabas)) : (x.palavra || x.texto || '');
      if (String(sil).trim()){
        it = criarItem(sil, x.emoji || x.figura || '', []);
        if (x.palavra && !x.silabas) it.palavra = String(x.palavra).trim();
        it.dica = x.dica ? String(x.dica) : '';
      }
    }
    if (it && !ja.has(it.palavra.toLowerCase())){ ja.add(it.palavra.toLowerCase()); itens.push(it); }
  });
  return {titulo, itens};
}
function paraJSON(itens, titulo){
  return {
    titulo: titulo || 'Minha lista',
    palavras: itens.map(i => {
      const o = {palavra: i.palavra};
      if (i.silabas) o.silabas = i.silabas.join('-');
      if (i.emoji) o.emoji = i.emoji;
      if (i.dica) o.dica = i.dica;
      return o;
    })
  };
}
function propria(){
  const d = ler(CHAVE_PROPRIA);
  if (!d || !Array.isArray(d.palavras)) return {titulo:'', itens:[]};
  return interpretar(JSON.stringify(d));
}
function salvarPropria(itens, titulo){ guardar(CHAVE_PROPRIA, paraJSON(itens, titulo)); }

function lista(cat){
  if (cat === 'propria') return propria().itens;
  if (!cat || cat === 'todas') return BANCO.slice();
  return BANCO.filter(i => i.cats.has(cat));
}

// ---------- Utilidades ----------
function embaralhar(a){
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function baixar(nome, obj){
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
let timerAviso;
function avisar(t){
  let a = document.getElementById('pp-aviso');
  if (!a){
    a = document.createElement('div'); a.id = 'pp-aviso';
    a.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#243049;color:#fff;padding:10px 18px;border-radius:12px;opacity:0;transition:opacity .3s;pointer-events:none;z-index:50;max-width:90vw;text-align:center;font-weight:bold';
    document.body.appendChild(a);
  }
  a.textContent = t; a.style.opacity = 1;
  clearTimeout(timerAviso); timerAviso = setTimeout(() => a.style.opacity = 0, 2400);
}

// ---------- Sons ----------
let somLigado = true, ac;
function tom(freq, dur = .12, tipo = 'triangle', vol = .15, atraso = 0){
  if (!somLigado) return;
  try{
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + atraso;
    o.type = tipo; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + dur);
    o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur);
  }catch(e){}
}
const somAcerto = () => [523,659,784,1047].forEach((f,i) => tom(f, .2, 'triangle', .16, i * .09));
const somErro = () => { tom(240, .25, 'sawtooth', .07); tom(180, .3, 'sawtooth', .07, .15); };
const somClique = () => tom(900, .05, 'triangle', .08);

// ---------- Voz ----------
let vozPt = null;
function escolherVoz(){
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  vozPt = vs.find(v => /pt[-_]BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window){ escolherVoz(); speechSynthesis.onvoiceschanged = escolherVoz; }
function falar(texto, opcoes = {}){
  if (!('speechSynthesis' in window)) return null;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'pt-BR'; u.rate = opcoes.rate || .85;
  if (vozPt) u.voice = vozPt;
  if (opcoes.aoTerminar) u.onend = opcoes.aoTerminar;
  if (opcoes.aoLimite) u.onboundary = opcoes.aoLimite;
  speechSynthesis.speak(u);
  return u;
}
function falarSilabas(item, rate){
  if (!item.silabas) return falar(item.palavra, {rate});
  return falar(item.silabas.join(', ') + '. ' + item.palavra, {rate: rate || .7});
}

function confete(){
  const itens = ['⭐','🎉','✨','🌟','🎈'];
  for (let i = 0; i < 26; i++){
    const s = document.createElement('span'); s.className = 'confete'; s.textContent = itens[i % itens.length];
    const dx = Math.random()*600-300, dy = Math.random()*500-280, rot = Math.random()*720-360;
    s.style.cssText = 'position:fixed;left:50%;top:35%;font-size:28px;pointer-events:none;z-index:40;transition:transform 1.3s ease-out,opacity 1.3s ease-out';
    document.body.appendChild(s);
    requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg)`; s.style.opacity = 0; }));
    setTimeout(() => s.remove(), 1500);
  }
}

// ---------- Seletor de categoria ----------
function preencherCategorias(select, {exigirSilabas = false, incluir} = {}){
  const atual = select.value;
  select.innerHTML = '';
  const chaves = incluir || Object.keys(CATEGORIAS);
  chaves.forEach(k => {
    if (k === 'propria'){
      const n = propria().itens.filter(i => !exigirSilabas || i.silabas).length;
      const o = document.createElement('option'); o.value = k;
      o.textContent = CATEGORIAS[k] + (n ? ` (${n})` : ' (vazia)');
      select.appendChild(o); return;
    }
    const o = document.createElement('option'); o.value = k; o.textContent = CATEGORIAS[k];
    select.appendChild(o);
  });
  if ([...select.options].some(o => o.value === atual)) select.value = atual;
}

// ---------- Painel "Minha lista" ----------
function montarPainelLista(el, {exigirSilabas = false, aoMudar} = {}){
  el.innerHTML = `
    <summary>📂 Minha lista de palavras (digitar ou importar JSON)</summary>
    <p>Digite <b>uma palavra por linha</b>. ${exigirSilabas ? 'Nesta atividade, <b>separe as sílabas com hífen</b> (ex.: <b>ca-va-lo</b>).' : 'Pode separar as sílabas com hífen (ex.: <b>ca-va-lo</b>).'}
    Para colocar uma figura, use o JSON.</p>
    <textarea class="pp-txt" placeholder="ca-va-lo&#10;ja-ne-la&#10;bor-bo-le-ta"></textarea>
    <div class="pp-acoes">
      <button type="button" class="pp-usar">✅ Usar esta lista</button>
      <button type="button" class="pp-abrir">📂 Abrir arquivo JSON</button>
      <button type="button" class="pp-salvar">💾 Salvar lista (JSON)</button>
      <button type="button" class="pp-modelo">📄 Baixar modelo</button>
      <button type="button" class="pp-limpar">🗑️ Apagar lista</button>
    </div>
    <input type="file" class="pp-arquivo" accept=".json,.txt,application/json,text/plain" hidden>
    <p class="pp-dica">Depois escolha <b>📂 Minha lista</b> no seletor de categoria. A lista fica salva neste navegador e vale para
    <b>Forca</b>, <b>Forme a Palavra</b>, <b>Separação de Sílabas</b> e <b>Ditado</b>.</p>
    <p>Formato do JSON (figura e dica são opcionais):</p>
    <pre>{
  "titulo": "Palavras da semana",
  "palavras": [
    { "palavra": "cavalo", "silabas": "ca-va-lo", "emoji": "🐴" },
    { "palavra": "janela", "silabas": "ja-ne-la", "dica": "fica na parede" },
    "bor-bo-le-ta"
  ]
}</pre>`;
  const q = s => el.querySelector(s);
  const txt = q('.pp-txt');
  const mostrar = () => {
    const p = propria();
    txt.value = p.itens.map(i => i.silabas ? i.silabas.join('-') : i.palavra).join('\n');
  };
  mostrar();
  const usar = (dados, msg) => {
    if (!dados.itens.length){ avisar('Nenhuma palavra encontrada.'); return; }
    salvarPropria(dados.itens, dados.titulo);
    mostrar();
    const sem = dados.itens.filter(i => !i.silabas).length;
    avisar(msg || (`✅ ${dados.itens.length} palavras salvas` + (exigirSilabas && sem ? ` (${sem} sem hífen serão ignoradas aqui)` : '')));
    aoMudar && aoMudar();
  };
  q('.pp-usar').onclick = () => {
    // Preserva figuras/dicas já salvas para palavras que continuam na lista
    const antigos = new Map(propria().itens.map(i => [i.palavra.toLowerCase(), i]));
    const d = interpretar(txt.value);
    d.itens.forEach(i => { const a = antigos.get(i.palavra.toLowerCase()); if (a){ i.emoji = i.emoji || a.emoji; i.dica = i.dica || a.dica; } });
    d.titulo = d.titulo || (ler(CHAVE_PROPRIA) || {}).titulo || '';
    usar(d);
  };
  q('.pp-abrir').onclick = () => q('.pp-arquivo').click();
  q('.pp-arquivo').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => usar(interpretar(r.result));
    r.readAsText(f); e.target.value = '';
  };
  q('.pp-salvar').onclick = () => {
    const p = propria();
    if (!p.itens.length) return avisar('A lista está vazia.');
    baixar('minhas-palavras.json', paraJSON(p.itens, (ler(CHAVE_PROPRIA) || {}).titulo));
  };
  q('.pp-modelo').onclick = () => baixar('modelo-palavras.json', {
    titulo: 'Palavras da semana',
    palavras: [
      {palavra:'cavalo', silabas:'ca-va-lo', emoji:'🐴'},
      {palavra:'janela', silabas:'ja-ne-la', dica:'fica na parede'},
      {palavra:'chocolate', silabas:'cho-co-la-te', emoji:'🍫'},
      'bor-bo-le-ta', 'pa-lha-ço'
    ]
  });
  q('.pp-limpar').onclick = () => {
    if (!confirm('Apagar a sua lista de palavras deste navegador?')) return;
    try{ localStorage.removeItem(CHAVE_PROPRIA); }catch(e){}
    mostrar(); avisar('Lista apagada.'); aoMudar && aoMudar();
  };
}

// Estilo do painel (injetado uma única vez)
const css = document.createElement('style');
css.textContent = `
  .pp-painel{background:#ffffffcc;border-radius:16px;padding:8px 14px;margin-top:10px;width:min(94vw,860px)}
  .pp-painel summary{font-weight:bold;cursor:pointer;padding:4px 0;font-size:1.1rem}
  .pp-painel textarea{width:100%;min-height:140px;font:inherit;font-size:1rem;padding:10px;border-radius:12px;border:2px solid #ccd;resize:vertical}
  .pp-painel pre{background:#243049;color:#7CFFB2;border-radius:10px;padding:10px;font-size:.85rem;overflow:auto;white-space:pre-wrap}
  .pp-acoes{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
  .pp-acoes button{font-size:.95rem !important;padding:9px 12px !important}
  .pp-dica{font-size:.92rem;opacity:.8}`;
document.head.appendChild(css);

window.Palavras = {
  BANCO, CATEGORIAS, lista, propria, interpretar, embaralhar, baixar, avisar,
  tom, somAcerto, somErro, somClique, falar, falarSilabas, confete,
  preencherCategorias, montarPainelLista, guardar, ler,
  set som(v){ somLigado = !!v; }, get som(){ return somLigado; }
};
})();
