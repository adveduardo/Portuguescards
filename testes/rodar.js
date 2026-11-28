/* Testes automáticos do Painel de Aula.
   Rodam sozinhos no GitHub Actions a cada atualização (veja .github/workflows/testes.yml) e também no computador:
     cd testes && npm install && npx playwright install chromium && node rodar.js
   O que é conferido:
     1) Conteúdo: todos os JSON abrem e o índice só aponta para arquivos que existem.
     2) Menu: nenhuma atividade repetida, toda opção abre uma página (e um arquivo de conteúdo) que existe.
     3) iPads antigos (iOS 9): JavaScript ES5 e emoji até o Unicode 8 nas páginas que rodam nos iPads.
     4) Fumaça: abre todas as páginas num navegador de verdade e procura erros de JavaScript.
     5) Link curto: as salas com iPads têm o botão ✂️ e ele mostra is.gd/0 + código; a página link-curto.html
        transforma um link do Google Drive em link curto + QR Code (o is.gd é simulado). */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http');
const RAIZ = path.resolve(__dirname, '..');
let falhas = 0;
const ok = (c, msg, detalhes) => { console.log((c ? '✅ ' : '❌ ') + msg); if (!c){ falhas++; (detalhes || []).slice(0, 25).forEach(d => console.log('     • ' + d)); } };
const ler = f => fs.readFileSync(path.join(RAIZ, f), 'utf8');

// ---------- 1) conteúdo ----------
const jsons = fs.readdirSync(path.join(RAIZ, 'dados')).filter(f => f.endsWith('.json'));
const quebrados = [];
jsons.forEach(f => { try { JSON.parse(ler('dados/' + f)); } catch (e) { quebrados.push(f + ': ' + e.message); } });
ok(!quebrados.length, `${jsons.length} arquivos de conteúdo (JSON) abrem sem erro`, quebrados);
const indice = JSON.parse(ler('dados/indice.json')), semArquivo = [];
Object.keys(indice).forEach(k => (indice[k] || []).forEach(e => { if (!e.arquivo || !fs.existsSync(path.join(RAIZ, 'dados', e.arquivo))) semArquivo.push(k + ' → ' + e.arquivo); }));
ok(!semArquivo.length, `Índice: ${Object.keys(indice).length} grupos, todos apontando para arquivos que existem`, semArquivo);

// ---------- 2) menu ----------
const index = ler('index.html'), ini = index.indexOf('id="tool-selector"'), fim = index.indexOf('</select>', ini);
const valores = [...index.slice(ini, fim).matchAll(/<option value="([^"]+)"/g)].map(m => m[1]), totalOpcoes = (index.slice(ini, fim).match(/<option\b/g) || []).length;
const vistos = {}, repetidos = [];
valores.forEach(v => { if (vistos[v]) repetidos.push(v); vistos[v] = 1; });
ok(valores.length > 100 && !repetidos.length, `Menu: ${valores.length} atividades, nenhuma repetida`, repetidos);
const quebradosMenu = [];
valores.forEach(v => {
  const pag = v.split('#')[0].split('?')[0];
  if (pag && !fs.existsSync(path.join(RAIZ, pag))) quebradosMenu.push(v + ' (página não existe)');
  const m = v.match(/[?&]arquivo=([^&#]+)/);
  if (m && !fs.existsSync(path.join(RAIZ, 'dados', decodeURIComponent(m[1])))) quebradosMenu.push(v + ' (conteúdo não existe)');
});
ok(!quebradosMenu.length, 'Menu: toda opção abre uma página e um conteúdo que existem', quebradosMenu);
// encontros: cada um tem a folha em Word; cada prova tem as versões A e B; gabarito, folha de redação e .zip existem
{
  const enc = JSON.parse(ler('dados/encontros-portugues.json')), faltam = [], dois = n => String(n).padStart(2, '0');
  enc.encontros.forEach((e, i) => {
    if (e.n !== i + 1) faltam.push('encontro fora de ordem: ' + e.n);
    if (!fs.existsSync(path.join(RAIZ, 'encontros', 'encontro-' + dois(e.n) + '.docx'))) faltam.push('encontros/encontro-' + dois(e.n) + '.docx');
    const qs = e.questoes.filter(q => q.tipo !== 'texto');
    if (qs.length < 15 || qs.length > 20) faltam.push(`encontro ${e.n}: ${qs.length} questões`);
    qs.forEach((q, k) => { if (!String(q.resposta || '').trim()) faltam.push(`encontro ${e.n}, questão ${k + 1}: sem gabarito`); });
  });
  (enc.provas || []).forEach(p => ['A', 'B'].forEach(v => { if (!fs.existsSync(path.join(RAIZ, 'encontros', `prova-${p.n}-${v}.docx`))) faltam.push(`encontros/prova-${p.n}-${v}.docx`); }));
  ['gabarito-das-provas.docx', 'folha-de-redacao.docx', 'guia-do-professor.docx', 'todas-as-folhas.zip', 'todas-as-provas.zip'].forEach(f => { if (!fs.existsSync(path.join(RAIZ, 'encontros', f))) faltam.push('encontros/' + f); });
  ok(!faltam.length, `Encontros: ${enc.encontros.length} encontros com folha em Word e gabarito, ${(enc.provas || []).length} provas (A e B), folha de redação e .zip`, faltam);
}

// ---------- 3) iPads antigos ----------
let acorn = null; try { acorn = require('acorn'); } catch (e) {}
const paginas = fs.readdirSync(RAIZ).filter(f => f.endsWith('.html'));
const doIpad = ['jogar.html', 'rede.js', 'sala.js', 'arcade.js', 'animais.js'].concat(paginas.filter(f => { const s = ler(f); return s.indexOf('src="arcade.js"') >= 0 && s.indexOf('jogo-ao-vivo.js') < 0; }));
const blocos = f => f.endsWith('.html') ? [...ler(f).matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]) : [ler(f)];
if (acorn){
  const naoES5 = [];
  doIpad.forEach(f => blocos(f).forEach((b, i) => { try { acorn.parse(b, {ecmaVersion: 5}); } catch (e) { naoES5.push(f + ' (bloco ' + i + '): ' + e.message); } }));
  ok(!naoES5.length, `iPads antigos: ${doIpad.length} arquivos em JavaScript ES5`, naoES5);
} else ok(false, 'Instale o acorn (npm install) para conferir o ES5');
function emojiNovo(cp){   // emoji que o iOS 9 (Unicode 8) não mostra
  if (cp >= 0x1F900 && cp <= 0x1F9FF) return !(cp >= 0x1F910 && cp <= 0x1F918 || cp >= 0x1F980 && cp <= 0x1F984 || cp === 0x1F9C0);
  return cp >= 0x1FA00 && cp <= 0x1FAFF || cp >= 0x1F6D1 && cp <= 0x1F6DF || cp >= 0x1F6F4 && cp <= 0x1F6FF || cp === 0x1F57A || cp === 0x1F5A4 || cp >= 0x1F7E0 && cp <= 0x1F7FF;
}
const emojis = [];
doIpad.forEach(f => ler(f).split('\n').forEach((linha, n) => { for (const ch of linha){ if (emojiNovo(ch.codePointAt(0))){ emojis.push(f + ':' + (n + 1) + ' ' + ch); break; } } }));
ok(!emojis.length, 'iPads antigos: nenhum emoji novo demais para o iOS 9 nesses arquivos', emojis);

// ---------- 4) fumaça: todas as páginas num navegador de verdade ----------
const TIPOS = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.wav': 'audio/wav'};
const servidor = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]); if (f.endsWith('/')) f += 'index.html';
  const arq = path.join(RAIZ, f);
  if (!arq.startsWith(RAIZ) || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()){ res.writeHead(404); return res.end('não encontrado'); }
  res.writeHead(200, {'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream'}); fs.createReadStream(arq).pipe(res);
});
servidor.listen(0, async () => {
  const porta = servidor.address().port, base = 'http://127.0.0.1:' + porta + '/';
  let chromium = null; try { chromium = require('playwright').chromium; } catch (e) {}
  if (!chromium){ ok(false, 'Instale o Playwright (npm install) para abrir as páginas'); servidor.close(); return process.exit(1); }
  const nav = await chromium.launch(), ctx = await nav.newContext({viewport: {width: 1280, height: 800}});
  await ctx.route('**/rede-config.json*', r => r.fulfill({contentType: 'application/json', body: '{"firebase":""}'}));   // nunca toca no banco de verdade
  await ctx.addInitScript(() => { try { localStorage.setItem('painel_som', '0'); } catch (e) {} });
  const todas = paginas.concat(fs.existsSync(path.join(RAIZ, 'projetos')) ? fs.readdirSync(path.join(RAIZ, 'projetos')).filter(f => f.endsWith('.html')).map(f => 'projetos/' + f) : []);
  const comErro = [], salasIpad = paginas.filter(f => ler(f).indexOf('id="urlJogar"') >= 0), semLinkCurto = [];
  for (const f of todas){
    const p = await ctx.newPage(), erros = [];
    p.on('pageerror', e => erros.push(e.message)); p.on('dialog', d => d.dismiss().catch(() => {}));
    try {
      await p.goto(base + f, {waitUntil: 'load', timeout: 20000}); await p.waitForTimeout(600);
      if (salasIpad.indexOf(f) >= 0 && !(await p.$('#urlJogar + .avCurtoBarra .avCurtoGerar'))) semLinkCurto.push(f);
    } catch (e) { erros.push('não abriu: ' + e.message.split('\n')[0]); }
    if (erros.length) comErro.push(f + ': ' + erros[0]);
    await p.close();
  }
  ok(!comErro.length, `Fumaça: ${todas.length} páginas abertas no navegador sem erro de JavaScript`, comErro);
  ok(salasIpad.length >= 12 && !semLinkCurto.length, `Salas com iPads: as ${salasIpad.length} telas mostram o botão ✂️ Link curto`, semLinkCurto);
  // o menu monta a árvore com todas as atividades
  const p = await ctx.newPage(), errosMenu = [];
  p.on('pageerror', e => errosMenu.push(e.message));
  await p.goto(base + 'index.html'); await p.waitForTimeout(500);
  const arvore = await p.evaluate(() => { if (typeof MENU === 'undefined' || !MENU.raiz) return -1; let n = 0; const conta = no => { n += no.itens.length; no.filhos.forEach(conta); }; conta(MENU.raiz); return n; });
  ok(arvore === totalOpcoes && !errosMenu.length, `Árvore do menu com todas as ${totalOpcoes} opções do seletor`, ['árvore: ' + arvore].concat(errosMenu));
  // ---------- 5) link curto (o is.gd é simulado: nada sai para a internet) ----------
  await ctx.route('https://is.gd/**', r => {
    const u = new URL(r.request().url()), apelido = u.searchParams.get('shorturl') || 'Ab3dEf';
    r.fulfill({contentType: 'text/javascript', body: u.searchParams.get('callback') + '(' + JSON.stringify({shorturl: 'https://is.gd/' + apelido}) + ');'});
  });
  const pl = await ctx.newPage(), errosLink = [];
  pl.on('pageerror', e => errosLink.push(e.message));
  let link = {};
  try {
    await pl.goto(base + 'stop.html'); await pl.waitForSelector('#listaCats input', {timeout: 10000});
    await pl.evaluate(() => { const c = document.querySelectorAll('#listaCats input'); if (![].some.call(c, i => i.checked)) c[0].checked = true; });
    await pl.click('#btnCriar'); await pl.waitForSelector('#tSala.ativa', {timeout: 10000});
    await pl.click('.avCurtoGerar');
    await pl.waitForFunction(() => !document.querySelector('.avCurto').hidden, null, {timeout: 10000});
    link = await pl.evaluate(() => ({curto: document.querySelector('.avCurto').textContent, codigo: document.getElementById('codigoSala').textContent.trim()}));
  } catch (e) { errosLink.push(e.message.split('\n')[0]); }
  ok(link.curto === 'is.gd/0' + link.codigo && !errosLink.length, 'Link curto: o botão ✂️ mostra is.gd/0 + o código da sala (só números)', [JSON.stringify(link)].concat(errosLink));
  await pl.close();
  const pd = await ctx.newPage(), errosDrive = [];
  pd.on('pageerror', e => errosDrive.push(e.message));
  let drive = {};
  try {
    await pd.goto(base + 'link-curto.html');
    await pd.fill('#link', 'https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/view?usp=sharing');
    await pd.check('#opcoesGoogle input[value=pdf]');
    await pd.fill('#apelido', 'teste_ci');
    await pd.click('#btnCriar');
    await pd.waitForFunction(() => LINKS.curto(), null, {timeout: 10000});
    drive = await pd.evaluate(() => ({url: LINKS.url(), curto: LINKS.curto(), qr: !!document.querySelector('#qr svg'), n: LINKS.lista().length}));
  } catch (e) { errosDrive.push(e.message.split('\n')[0]); }
  ok(drive.curto === 'https://is.gd/teste_ci' && drive.qr && /uc\?export=download&id=/.test(drive.url) && drive.n >= 1 && !errosDrive.length,
    'Link curto e QR Code: um link do Google Drive vira is.gd + QR Code e entra em "Meus links"', [JSON.stringify(drive)].concat(errosDrive));
  await pd.close();
  await nav.close(); servidor.close();
  console.log(falhas ? `\n${falhas} teste(s) com problema.` : '\nTudo certo! 🎉');
  process.exit(falhas ? 1 : 0);
});
