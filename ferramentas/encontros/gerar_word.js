// Gera em Word: as folhas de atividade (uma por encontro, frente e verso), o guia do professor,
// as provas por bloco (versões A e B, com cartão-resposta), o gabarito das provas e a folha de redação.
// Uso: NODE_PATH=/opt/node-tools/node_modules node ferramentas/encontros/gerar_word.js [so-folhas]
const fs = require('fs'), path = require('path');
const {Document, Packer, Paragraph, TextRun, Tab, TabStopType, LeaderType, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak, HeadingLevel, Footer, PageNumber,
  HeightRule, VerticalAlign} = require('docx');
const RAIZ = path.resolve(__dirname, '..', '..');
const dados = JSON.parse(fs.readFileSync(path.join(RAIZ, 'dados', 'encontros-portugues.json'), 'utf8'));
const SAIDA = path.join(RAIZ, 'encontros');
const SO_FOLHAS = process.argv.includes('so-folhas');
// ajuste.json: linhas a mais nas respostas e linhas da produção, por encontro (para fechar a folha frente e verso)
const AJ = fs.existsSync(path.join(__dirname, 'ajuste.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'ajuste.json'), 'utf8')) : {};
fs.mkdirSync(SAIDA, {recursive: true});
const TOTAL = dados.encontros.length;
const LARG = 11906 - 2 * 1080;   // A4 com margens de 0,75"
const FONTE = 'Arial', AZUL = '1F3A68', CINZA = '6B7280';
const pagina = {page: {size: {width: 11906, height: 16838}, margin: {top: 900, bottom: 900, left: 1080, right: 1080, footer: 400}}};
const estilos = {default: {document: {run: {font: FONTE, size: 22}},
  heading1: {run: {font: FONTE, size: 30, bold: true, color: AZUL}, paragraph: {spacing: {before: 0, after: 100}, keepNext: true}},
  heading2: {run: {font: FONTE, size: 24, bold: true, color: AZUL}, paragraph: {spacing: {before: 200, after: 80}, keepNext: true}}}};
const dois = n => String(n).padStart(2, '0');
const t = (text, o) => new TextRun(Object.assign({text}, o || {}));
const tab = () => new TextRun({children: [new Tab()]});
// texto com quebras de linha (\n) vira vários TextRun
const corridos = (txt, o) => String(txt).split('\n').map((p, i) => new TextRun(Object.assign({text: p, break: i ? 1 : 0}, o || {})));
const SEM = {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'};
const FINA = {style: BorderStyle.SINGLE, size: 6, color: '8A94A6'};
const semBordas = {top: SEM, bottom: SEM, left: SEM, right: SEM, insideHorizontal: SEM, insideVertical: SEM};
const linhaResposta = () => new Paragraph({spacing: {before: 130, after: 0}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}], children: [tab()]});
const linhaRotulo = rot => new Paragraph({spacing: {before: 130, after: 0}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}], children: [t(rot + ' ', {bold: true, size: 20}), tab()]});
const rodape = txt => ({default: new Footer({children: [new Paragraph({alignment: AlignmentType.CENTER, children: [
  t(txt + ' • página ', {size: 16, color: '777777'}), new TextRun({children: [PageNumber.CURRENT], size: 16, color: '777777'}),
  t(' de ', {size: 16, color: '777777'}), new TextRun({children: [PageNumber.TOTAL_PAGES], size: 16, color: '777777'})]})]})});
const ehRedacao = e => /Folha de redação/i.test(e.producao || '');

// ---------- cabeçalho de prova ----------
function celulaCab(partes, larg, span){
  return new TableCell({width: {size: larg, type: WidthType.DXA}, columnSpan: span || 1, verticalAlign: VerticalAlign.CENTER,
    margins: {top: 50, bottom: 50, left: 100, right: 100}, borders: {top: FINA, bottom: FINA, left: FINA, right: FINA},
    children: [new Paragraph({children: partes.map(([txt, neg]) => t(txt, {bold: !!neg, size: 19}))})]});
}
function cabecalho(){
  const c1 = Math.round(LARG * 0.66), c2 = LARG - c1;
  const linha = (a, b) => new TableRow({height: {value: 390, rule: HeightRule.ATLEAST}, children: [celulaCab(a, c1), celulaCab(b, c2)]});
  return new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: [c1, c2], rows: [
    linha([['Escola: ', 1]], [['Data: ', 1], ['____/____/______']]),
    linha([['Aluno(a): ', 1]], [['Turma: ', 1], ['_______  '], ['Nº: ', 1], ['_____']]),
    linha([['Professor(a): ', 1]], [['Nota: ', 1]])]});
}
function faixa(txt){
  return new Paragraph({spacing: {before: 140, after: 40}, children: [t(txt.toUpperCase(), {bold: true, size: 17, color: AZUL, characterSpacing: 10})]});
}
function titulo(txt){
  return new Paragraph({heading: HeadingLevel.HEADING_1, border: {bottom: {style: BorderStyle.SINGLE, size: 10, color: AZUL, space: 3}}, children: [t(txt, {font: FONTE, size: 28, bold: true, color: AZUL})]});
}
function instrucao(txt){
  return new Paragraph({spacing: {before: 60, after: 80}, children: [t(txt, {italics: true, size: 18, color: '444444'})]});
}

// ---------- tipos de questão ----------
function opcoes(op, letras){
  const rot = op.map((o, i) => (letras || 'abcd')[i] + ') ' + o);
  const soma = rot.reduce((s, r) => s + r.length, 0), maior = Math.max(...rot.map(r => r.length));
  const P = (itens, colunas) => new Paragraph({spacing: {before: 20, after: 20}, indent: {left: 300}, keepLines: true,
    tabStops: colunas.map(c => ({type: TabStopType.LEFT, position: c})), children: itens.flatMap((r, i) => i ? [tab(), t('( ) ' + r)] : [t('( ) ' + r)])});
  if (soma <= 72 && maior <= 20) return [P(rot, [LARG / 4, LARG / 2, 3 * LARG / 4].map(Math.round))];
  if (maior <= 42) return [P(rot.slice(0, 2), [Math.round(LARG / 2)]), P(rot.slice(2), [Math.round(LARG / 2)])];
  return rot.map(r => P([r], []));
}
function caixaTexto(q, de, ate){
  const aviso = q.para > 1 ? `Leia o texto para responder às questões ${de} a ${ate}.` : `Leia o texto para responder à questão ${de}.`;
  const dentro = [];
  if (q.titulo) dentro.push(new Paragraph({alignment: AlignmentType.CENTER, spacing: {after: 60}, children: [t(q.titulo, {bold: true, size: 21})]}));
  String(q.texto).split('\n').filter(p => p.trim()).forEach(p => dentro.push(new Paragraph({alignment: AlignmentType.JUSTIFIED, spacing: {after: 50, line: 264}, children: [t(p.trim(), {size: 20})]})));
  if (q.fonte) dentro.push(new Paragraph({alignment: AlignmentType.RIGHT, spacing: {before: 30}, children: [t(q.fonte, {italics: true, size: 16, color: '555555'})]}));
  return [
    new Paragraph({spacing: {before: 160, after: 50}, keepNext: true, children: [t(aviso, {bold: true, size: 20, color: AZUL})]}),
    new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: [LARG], rows: [new TableRow({cantSplit: true, children: [new TableCell({
      width: {size: LARG, type: WidthType.DXA}, shading: {type: ShadingType.CLEAR, fill: 'F2F5FA', color: 'auto'},
      margins: {top: 90, bottom: 90, left: 170, right: 170},
      borders: {top: SEM, bottom: SEM, right: SEM, left: {style: BorderStyle.SINGLE, size: 24, color: AZUL}}, children: dentro})]})]})];
}
function bancoPalavras(lista){
  return new Paragraph({spacing: {before: 50, after: 30}, indent: {left: 300, right: 300}, alignment: AlignmentType.CENTER,
    border: {top: FINA, bottom: FINA, left: FINA, right: FINA}, children: [t('Banco de palavras:  ', {bold: true, size: 19}), t(lista.join('   •   '), {size: 19})]});
}
function colunas(q){
  const metade = Math.round(LARG / 2), n = Math.max(q.esquerda.length, q.direita.length);
  const cel = (txt, larg) => new TableCell({width: {size: larg, type: WidthType.DXA}, borders: {top: SEM, bottom: SEM, left: SEM, right: SEM},
    margins: {top: 20, bottom: 20, left: 80, right: 80}, children: [new Paragraph({children: [t(txt, {size: 21})]})]});
  return new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: [metade, LARG - metade], borders: semBordas, rows:
    Array.from({length: n}, (_, i) => new TableRow({cantSplit: true, children: [
      cel(q.esquerda[i] ? `(${i + 1}) ${q.esquerda[i]}` : '', metade), cel(q.direita[i] ? `(     ) ${q.direita[i]}` : '', LARG - metade)]}))});
}
// devolve os parágrafos de uma questão (num = número impresso)
function questao(q, num, extra, letras){
  const out = [new Paragraph({spacing: {before: 130, after: 40}, keepNext: true, children: [t(num + '. ', {bold: true}), ...corridos(q.enunciado)]})];
  if (q.tipo === 'me') out.push(...opcoes(q.opcoes, letras));
  else if (q.tipo === 'vf') q.itens.forEach(it => out.push(new Paragraph({spacing: {before: 20, after: 20}, indent: {left: 300, hanging: 0}, keepLines: true, children: [t('(     )  '), t(it)]})));
  else if (q.tipo === 'colunas') out.push(colunas(q));
  else {
    if (q.banco) out.push(bancoPalavras(q.banco));
    for (let k = 0; k < (q.linhas || 1) + (extra || 0); k++) out.push(linhaResposta());
  }
  return out;
}
// numeração das questões pulando os textos: [{q, num, de, ate}]
function numerar(lista){
  let n = 0;
  return lista.map((q, i) => {
    if (q.tipo === 'texto') return {q, num: null, de: n + 1, ate: n + q.para};
    n++; return {q, num: n};
  });
}

// ---------- folha de cada encontro ----------
function folha(e){
  const aj = Object.assign({extra: 1, prod: 8}, AJ[e.n] || {});
  const filhos = [cabecalho(), faixa(`Língua Portuguesa  •  Encontro ${dois(e.n)}  •  ${e.bloco}`), titulo(e.titulo),
    instrucao('Leia com atenção e consulte o que você copiou do quadro. Nas questões de múltipla escolha, marque um X em uma só alternativa; nas outras, responda nas linhas, com letra legível.')];
  const nums = numerar(e.questoes);
  nums.forEach(({q, num, de, ate}) => { if (q.tipo === 'texto') filhos.push(...caixaTexto(q, de, ate)); else filhos.push(...questao(q, num, aj.extra)); });
  const np = nums.filter(x => x.num).length + 1;
  if (ehRedacao(e)){
    filhos.push(new Paragraph({spacing: {before: 200, after: 40}, keepNext: true, children: [t(np + '. ✍️ Planejamento da redação: ', {bold: true}), t(e.producao + ' Antes de escrever, planeje aqui:')]}));
    const k = Math.max(1, Math.round(aj.prod / 4));
    [['Tese (seu ponto de vista):'], ['Argumento 1 + repertório:'], ['Argumento 2 + repertório:'], ['Proposta (agente, ação, meio, finalidade, detalhamento):']].forEach(([r]) => {
      filhos.push(linhaRotulo(r)); for (let i = 1; i < k; i++) filhos.push(linhaResposta());
    });
  } else {
    filhos.push(new Paragraph({spacing: {before: 200, after: 40}, keepNext: true, children: [t(np + '. ✍️ Produção: ', {bold: true}), t(e.producao)]}));
    for (let k = 0; k < aj.prod; k++) filhos.push(linhaResposta());
  }
  filhos.push(new Paragraph({spacing: {before: 160}, children: [t('Como me saí nesta folha:   (   ) entendi tudo     (   ) tenho algumas dúvidas     (   ) preciso de ajuda', {size: 17, color: '555555'})]}));
  return new Document({creator: 'Painel de Aula', title: 'Encontro ' + dois(e.n) + ': ' + e.titulo, styles: estilos,
    sections: [{properties: pagina, footers: rodape(`Português em ${TOTAL} encontros • Encontro ${dois(e.n)}`), children: filhos}]});
}

// ---------- guia do professor ----------
function celula(txt, larg, cab){
  return new TableCell({width: {size: larg, type: WidthType.DXA}, margins: {top: 60, bottom: 60, left: 100, right: 100},
    shading: cab ? {type: ShadingType.CLEAR, fill: 'DCE6F5', color: 'auto'} : undefined,
    children: [new Paragraph({children: [t(txt, {bold: !!cab, size: 20})]})]});
}
function respostaGuia(q){
  if (q.tipo === 'colunas') return q.resposta + ' (de cima para baixo, na coluna da direita)';
  if (q.tipo === 'vf') return q.resposta;
  return q.resposta;
}
function guia(){
  const cols = [1500, 1900, LARG - 3400];
  const filhos = [
    new Paragraph({heading: HeadingLevel.HEADING_1, children: [t('Guia do professor: ' + dados.titulo)]}),
    new Paragraph({spacing: {after: 120}, children: [t('Cada encontro tem ' + dados.duracao + '. Para cada um: o plano das duas aulas, o aquecimento, o que passar no quadro e o gabarito da folha de atividade. As provas por bloco e o gabarito delas estão em arquivos separados (prova-N-A.docx, prova-N-B.docx e gabarito-das-provas.docx).')]}),
  ];
  dados.encontros.forEach((e, idx) => {
    if (idx) filhos.push(new Paragraph({children: [new PageBreak()]}));
    const nums = numerar(e.questoes), nq = nums.filter(x => x.num).length;
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_1, children: [t('Encontro ' + dois(e.n) + ' • ' + e.titulo)]}));
    filhos.push(new Paragraph({children: [t('Bloco: ', {bold: true}), t(e.bloco + '   •   ' + nq + ' questões na folha')]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Plano das duas aulas')]}));
    const plano = e.plano || dados.plano;
    filhos.push(new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: cols, rows: [
      new TableRow({tableHeader: true, children: [celula('Tempo', cols[0], true), celula('Etapa', cols[1], true), celula('Como fazer', cols[2], true)]}),
      ...plano.map(p => new TableRow({children: [celula('Aula ' + p.aula + ': ' + p.inicio + '–' + p.fim + ' min', cols[0]), celula(p.etapa, cols[1]), celula(p.etapa === 'Aquecimento' ? e.aquecimento : p.como, cols[2])]}))]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('No quadro')]}));
    e.quadro.forEach(l => filhos.push(l.startsWith('# ')
      ? new Paragraph({spacing: {before: 100, after: 40}, children: [t(l.slice(2), {bold: true})]})
      : new Paragraph({indent: {left: 300}, spacing: {after: 30}, children: [t(l.replace(/^- /, '• '))]})));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Gabarito')]}));
    nums.forEach(({q, num, de, ate}) => {
      if (q.tipo === 'texto') filhos.push(new Paragraph({spacing: {before: 60, after: 30}, children: [t(`Texto “${q.titulo || 'sem título'}” (questões ${de} a ${ate})`, {italics: true, size: 19, color: CINZA})]}));
      else filhos.push(new Paragraph({spacing: {after: 30}, children: [t(num + '. ', {bold: true}), t(respostaGuia(q), {size: 20})]}));
    });
    filhos.push(new Paragraph({spacing: {after: 30}, children: [t((nq + 1) + (ehRedacao(e) ? '. Planejamento e redação: ' : '. Produção: '), {bold: true}),
      t((ehRedacao(e) ? 'corrigir com a grade das 5 competências (verso da Folha de redação). Proposta: ' : 'resposta pessoal. Proposta: ') + e.producao, {size: 20})]}));
  });
  return new Document({creator: 'Painel de Aula', title: `Guia do professor: ${TOTAL} encontros`, styles: estilos,
    sections: [{properties: pagina, footers: rodape(`Guia do professor • Português em ${TOTAL} encontros`), children: filhos}]});
}

// ---------- folha de redação (30 linhas + grade de correção no verso) ----------
function linhasNumeradas(qtd){
  const cn = 520;
  return new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: [cn, LARG - cn], rows: Array.from({length: qtd}, (_, i) => new TableRow({
    height: {value: 384, rule: HeightRule.EXACT}, cantSplit: true, children: [
      new TableCell({width: {size: cn, type: WidthType.DXA}, verticalAlign: VerticalAlign.BOTTOM, borders: {top: SEM, left: SEM, bottom: FINA, right: FINA},
        children: [new Paragraph({alignment: AlignmentType.CENTER, children: [t(String(i + 1), {size: 16, color: '777777'})]})]}),
      new TableCell({width: {size: LARG - cn, type: WidthType.DXA}, borders: {top: SEM, left: FINA, bottom: FINA, right: SEM}, children: [new Paragraph('')]})]}))});
}
const COMPETENCIAS = [
  ['1', 'Norma-padrão', 'Ortografia, acentuação, concordância, regência, crase, pontuação e escolha de palavras (registro formal).'],
  ['2', 'Tema e tipo textual', 'Atende ao tema (sem tangenciar), escreve texto dissertativo-argumentativo e usa repertório pertinente e produtivo.'],
  ['3', 'Argumentação', 'Seleciona, relaciona e organiza fatos e argumentos em defesa de um ponto de vista (projeto de texto).'],
  ['4', 'Coesão', 'Conectivos variados e adequados entre e dentro dos parágrafos; retoma ideias sem repetir palavras.'],
  ['5', 'Proposta de intervenção', 'Proposta ligada ao tema, que respeita os direitos humanos, com agente, ação, meio, finalidade e detalhamento.']];
function gradeCorrecao(){
  const c = [700, 2100, LARG - 700 - 2100 - 1300, 1300];
  const cel = (txt, larg, o) => new TableCell({width: {size: larg, type: WidthType.DXA}, margins: {top: 60, bottom: 60, left: 90, right: 90}, verticalAlign: VerticalAlign.CENTER,
    shading: o && o.cab ? {type: ShadingType.CLEAR, fill: 'DCE6F5', color: 'auto'} : undefined,
    children: [new Paragraph({alignment: o && o.centro ? AlignmentType.CENTER : AlignmentType.LEFT, children: [t(txt, {bold: !!(o && o.neg), size: 19})]})]});
  return new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: c, rows: [
    new TableRow({tableHeader: true, children: [cel('C', c[0], {cab: 1, neg: 1, centro: 1}), cel('Competência', c[1], {cab: 1, neg: 1}), cel('O que é avaliado', c[2], {cab: 1, neg: 1}), cel('Nota (0 a 200)', c[3], {cab: 1, neg: 1, centro: 1})]}),
    ...COMPETENCIAS.map(([n, nome, o]) => new TableRow({height: {value: 560, rule: HeightRule.ATLEAST}, children: [cel(n, c[0], {centro: 1, neg: 1}), cel(nome, c[1], {neg: 1}), cel(o, c[2]), cel('', c[3])]})),
    new TableRow({children: [cel('', c[0]), cel('Total', c[1], {neg: 1}), cel('Soma das cinco competências (0 a 1000)', c[2]), cel('', c[3])]})]});
}
const CHECKLIST = ['Li a frase-tema palavra por palavra e mantive o recorte (não tangenciei).', 'Minha tese aparece clara na introdução.',
  'Cada desenvolvimento tem tópico frasal, explicação e repertório ligado ao tema.', 'Usei conectivos variados entre os parágrafos e dentro deles.',
  'Não repeti as mesmas palavras: troquei por sinônimos e pronomes.', 'A conclusão tem proposta com agente, ação, meio, finalidade e detalhamento.',
  'Revisei acentos, vírgulas, concordância e letra legível.', 'O texto tem entre 20 e 30 linhas e não copia os textos motivadores.'];
function paginaRedacao(tema){
  return [cabecalho(), faixa('Língua Portuguesa  •  Folha de redação'), titulo('Redação'),
    new Paragraph({spacing: {before: 60, after: 40}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}], children: [t('Tema: ', {bold: true, size: 20}), ...(tema ? [t(tema, {size: 20})] : [tab()])]}),
    new Paragraph({spacing: {before: 60, after: 100}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}], children: [t('Título (opcional): ', {bold: true, size: 20}), tab()]}),
    linhasNumeradas(30)];
}
function paginaGrade(){
  return [new Paragraph({children: [new PageBreak()]}), titulo('Grade de correção e revisão'),
    instrucao('O professor (ou um colega, na correção em dupla) dá a nota de cada competência. Antes de entregar, confira o checklist.'),
    gradeCorrecao(),
    new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Checklist antes de entregar')]}),
    ...CHECKLIST.map(c => new Paragraph({spacing: {before: 50, after: 30}, children: [t('☐  ', {size: 24}), t(c, {size: 20})]})),
    new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Comentários do professor')]}),
    ...Array.from({length: 6}, linhaResposta)];
}
function folhaRedacao(){
  return new Document({creator: 'Painel de Aula', title: 'Folha de redação', styles: estilos,
    sections: [{properties: pagina, footers: rodape(`Português em ${TOTAL} encontros • Folha de redação`), children: [...paginaRedacao(''), ...paginaGrade()]}]});
}

// ---------- provas por bloco (versões A e B) ----------
function rng(seed){ let s = seed >>> 0; return () => { s += 0x6D2B79F5; let x = s; x = Math.imul(x ^ x >>> 15, x | 1); x ^= x + Math.imul(x ^ x >>> 7, x | 61); return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
function embaralhar(l, r){ l = l.slice(); for (let i = l.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; }
const certaDe = q => q.resposta.replace(/^[a-d]\) /, '');
const numerica = ops => ops.every(o => /^-?[\d.,]+$/.test(String(o).replace('−', '-')));
// separa as questões de um encontro em grupos de texto e questões soltas
function partes(e){
  const soltas = [], grupos = []; let i = 0;
  while (i < e.questoes.length){
    const q = e.questoes[i];
    if (q.tipo === 'texto'){ grupos.push({texto: q, qs: e.questoes.slice(i + 1, i + 1 + q.para), n: e.n}); i += 1 + q.para; }
    else { soltas.push(Object.assign({n: e.n}, q)); i++; }
  }
  return {soltas, grupos};
}
const SIMULADO = {
  tema: 'Caminhos para garantir o acesso ao saneamento básico no Brasil',
  textos: [
    {titulo: 'Texto I', texto: 'Saneamento básico não é só ter água na torneira. Pela Lei nº 11.445/2007, ele reúne quatro serviços: abastecimento de água potável, coleta e tratamento de esgoto, limpeza urbana e manejo dos resíduos sólidos, e drenagem das águas da chuva. Quando um desses serviços falta, a saúde, o meio ambiente e a qualidade de vida de toda a comunidade são afetados.', fonte: 'Texto elaborado para esta atividade.'},
    {titulo: 'Texto II', texto: 'Entre os Objetivos de Desenvolvimento Sustentável da ONU, o ODS 6 propõe assegurar a disponibilidade e a gestão sustentável da água e do saneamento para todas as pessoas até 2030. A meta lembra que o acesso à água limpa e ao esgoto tratado é condição para a dignidade humana.', fonte: 'Texto elaborado para esta atividade, com base na Agenda 2030 da ONU.'},
    {titulo: 'Texto III', texto: 'Na rua de Dona Lúcia, o esgoto corre a céu aberto desde que ela se mudou para lá. Em dias de chuva, a água invade as casas, e as crianças do bairro adoecem com frequência. “A gente paga imposto como todo mundo, mas parece que o cano não chega até aqui”, desabafa a moradora.', fonte: 'Texto elaborado para esta atividade (situação fictícia).'}],
  instrucao: 'A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo dos encontros, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema “Caminhos para garantir o acesso ao saneamento básico no Brasil”, apresentando proposta de intervenção que respeite os direitos humanos. Selecione, organize e relacione, de forma coerente e coesa, argumentos e fatos para a defesa de seu ponto de vista. O texto deve ter de 20 a 30 linhas e não pode copiar os textos motivadores.'};
function escolherQuestoes(p){
  const r = rng(77 + p.n), encs = dados.encontros.filter(e => e.n >= p.de && e.n <= p.ate);
  const ps = encs.map(partes), simulado = p.n === 8;
  const alvoME = simulado ? 8 : 16;
  let grupo = null;
  if (!simulado){
    const candidatos = ps.flatMap(x => x.grupos).filter(g => g.qs.filter(q => q.tipo === 'me').length >= 2);
    if (candidatos.length) grupo = candidatos[Math.floor(r() * candidatos.length)];
  }
  const grupoME = grupo ? grupo.qs.filter(q => q.tipo === 'me').slice(0, 4) : [];
  // múltipla escolha soltas, em rodízio pelos encontros do bloco
  const filas = ps.map(x => embaralhar(x.soltas.filter(q => q.tipo === 'me'), r));
  const me = [];
  for (let volta = 0; me.length < alvoME - grupoME.length && volta < 20; volta++)
    for (const f of embaralhar(filas, r)) if (f[volta] && me.length < alvoME - grupoME.length) me.push(f[volta]);
  // duas questões abertas com resposta definida, de encontros diferentes
  const abertas = [];
  if (!simulado){
    const cand = embaralhar(ps.flatMap(x => x.soltas.filter(q => q.tipo === 'escrita' && !/^Resposta pessoal/i.test(q.resposta) && (q.linhas || 1) <= 3)), r);
    for (const q of cand){ if (abertas.length < 2 && !abertas.some(a => a.n === q.n)) abertas.push(q); }
  }
  return {grupo: grupo ? {texto: Object.assign({}, grupo.texto, {para: grupoME.length}), qs: grupoME, n: grupo.n} : null, me, abertas};
}
function versaoDe(sel, letra, seed){
  const r = rng(seed), mexer = q => {
    if (q.tipo !== 'me') return q;
    const certa = certaDe(q), ops = numerica(q.opcoes) ? q.opcoes.slice() : (letra === 'A' ? q.opcoes.slice() : embaralhar(q.opcoes, r));
    return Object.assign({}, q, {opcoes: ops, resposta: 'abcd'[ops.indexOf(certa)] + ') ' + certa});
  };
  const lista = [];
  if (sel.grupo) lista.push(sel.grupo.texto, ...sel.grupo.qs.map(mexer));
  lista.push(...(letra === 'A' ? sel.me : embaralhar(sel.me, r)).map(mexer));
  lista.push(...sel.abertas);
  return lista;
}
function cartaoResposta(qtd){
  const c0 = 1250, cw = Math.floor((LARG - c0) / qtd), larg = [c0, ...Array(qtd).fill(cw)];
  const cel = (txt, w, o) => new TableCell({width: {size: w, type: WidthType.DXA}, verticalAlign: VerticalAlign.CENTER, margins: {top: 30, bottom: 30, left: 30, right: 30},
    shading: o && o.cab ? {type: ShadingType.CLEAR, fill: 'DCE6F5', color: 'auto'} : undefined, borders: {top: FINA, bottom: FINA, left: FINA, right: FINA},
    children: [new Paragraph({alignment: AlignmentType.CENTER, children: [t(txt, {bold: !!(o && o.neg), size: 17})]})]});
  return [new Paragraph({spacing: {before: 80, after: 40}, children: [t('Cartão-resposta: ', {bold: true, size: 19}), t('passe para cá a letra de cada questão de múltipla escolha (a caneta, sem rasuras).', {size: 18})]}),
    new Table({width: {size: c0 + cw * qtd, type: WidthType.DXA}, columnWidths: larg, rows: [
      new TableRow({children: [cel('Questão', c0, {cab: 1, neg: 1}), ...Array.from({length: qtd}, (_, i) => cel(String(i + 1), cw, {cab: 1, neg: 1}))]}),
      new TableRow({height: {value: 430, rule: HeightRule.ATLEAST}, children: [cel('Resposta', c0, {neg: 1}), ...Array.from({length: qtd}, () => cel('', cw))]})]})];
}
function prova(p, letra, sel){
  const lista = versaoDe(sel, letra, 900 + p.n * 7 + (letra === 'A' ? 0 : 1)), nums = numerar(lista);
  const qme = nums.filter(x => x.num && x.q.tipo === 'me').length, qab = nums.filter(x => x.num && x.q.tipo !== 'me').length;
  const simulado = p.n === 8;
  const filhos = [cabecalho(), faixa(`Avaliação de Língua Portuguesa  •  Prova ${p.n}  •  Encontros ${p.de} a ${p.ate}  •  Versão ${letra}`), titulo(p.titulo),
    instrucao(simulado
      ? `Parte 1: ${qme} questões objetivas (0,25 ponto cada = 2,0). Parte 2: redação (8,0 pontos = nota de 0 a 1000 ÷ 125). Marque uma só alternativa em cada questão e passe as letras para o cartão-resposta.`
      : `Esta prova tem ${qme} questões objetivas (0,5 ponto cada) e ${qab} questões abertas (1,0 ponto cada), num total de 10,0 pontos. Marque uma só alternativa, passe as letras para o cartão-resposta e responda as abertas nas linhas.`),
    ...cartaoResposta(qme)];
  if (simulado) filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Parte 1: questões objetivas')]}));
  nums.forEach(({q, num, de, ate}) => { if (q.tipo === 'texto') filhos.push(...caixaTexto(q, de, ate)); else filhos.push(...questao(q, num, 1)); });
  if (simulado){
    filhos.push(new Paragraph({children: [new PageBreak()]}), new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Parte 2: proposta de redação')]}));
    SIMULADO.textos.forEach(x => filhos.push(...caixaTexto(Object.assign({para: 1}, x), 0, 0).slice(1), new Paragraph({spacing: {after: 60}})));
    filhos.push(new Paragraph({spacing: {before: 80, after: 80}, alignment: AlignmentType.JUSTIFIED, border: {top: FINA, bottom: FINA, left: FINA, right: FINA},
      children: [t('Proposta: ', {bold: true}), t(SIMULADO.instrucao)]}));
    filhos.push(new Paragraph({children: [t('Use o espaço abaixo como rascunho e passe a limpo na Folha de redação (página seguinte).', {italics: true, size: 18})]}));
    for (let i = 0; i < 6; i++) filhos.push(linhaResposta());
    filhos.push(new Paragraph({children: [new PageBreak()]}), ...paginaRedacao(SIMULADO.tema));
  }
  return {doc: new Document({creator: 'Painel de Aula', title: `Prova ${p.n} (versão ${letra}): ${p.titulo}`, styles: estilos,
    sections: [{properties: pagina, footers: rodape(`Prova ${p.n} • Versão ${letra} • Português em ${TOTAL} encontros`), children: filhos}]}), nums};
}
function gabaritoProvas(resultados){
  const filhos = [new Paragraph({heading: HeadingLevel.HEADING_1, children: [t('Gabarito das provas • Português em ' + TOTAL + ' encontros')]}),
    instrucao('Cada prova tem duas versões com as mesmas questões em outra ordem e com as alternativas trocadas. Confira a versão escrita no alto da folha do aluno.')];
  resultados.forEach(({p, A, B}, i) => {
    if (i) filhos.push(new Paragraph({children: [new PageBreak()]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_1, children: [t(`Prova ${p.n}: ${p.titulo} (encontros ${p.de} a ${p.ate})`)]}));
    const meA = A.filter(x => x.num && x.q.tipo === 'me'), meB = B.filter(x => x.num && x.q.tipo === 'me');
    const c = [1400, 1800, 1800];
    filhos.push(new Table({width: {size: c[0] + c[1] + c[2], type: WidthType.DXA}, columnWidths: c, rows: [
      new TableRow({tableHeader: true, children: [celula('Questão', c[0], true), celula('Versão A', c[1], true), celula('Versão B', c[2], true)]}),
      ...meA.map((x, k) => new TableRow({children: [celula(String(x.num), c[0]), celula(x.q.resposta.slice(0, 1).toUpperCase(), c[1]), celula(meB[k] ? meB[k].q.resposta.slice(0, 1).toUpperCase() : '', c[2])]}))]}));
    const ab = A.filter(x => x.num && x.q.tipo !== 'me');
    if (ab.length){
      filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Questões abertas (mesmo número nas duas versões)')]}));
      ab.forEach(x => filhos.push(new Paragraph({spacing: {after: 40}, children: [t(x.num + '. ', {bold: true}), t(x.q.enunciado + ' ', {size: 19, color: CINZA}), t('Resposta: ', {bold: true, size: 20}), t(x.q.resposta, {size: 20})]})));
    }
    if (p.n === 8) filhos.push(new Paragraph({spacing: {before: 120}, children: [t('Redação: ', {bold: true}), t('corrigir com a grade das 5 competências (0 a 200 cada). Nota da prova = objetivas (até 2,0) + nota da redação ÷ 125 (até 8,0).')]}));
  });
  return new Document({creator: 'Painel de Aula', title: 'Gabarito das provas', styles: estilos,
    sections: [{properties: pagina, footers: rodape('Gabarito das provas'), children: filhos}]});
}

(async () => {
  for (const e of dados.encontros) fs.writeFileSync(path.join(SAIDA, 'encontro-' + dois(e.n) + '.docx'), await Packer.toBuffer(folha(e)));
  if (SO_FOLHAS) return console.log('ok:', TOTAL, 'folhas');
  fs.writeFileSync(path.join(SAIDA, 'guia-do-professor.docx'), await Packer.toBuffer(guia()));
  fs.writeFileSync(path.join(SAIDA, 'folha-de-redacao.docx'), await Packer.toBuffer(folhaRedacao()));
  const resultados = [];
  for (const p of dados.provas || []){
    const sel = escolherQuestoes(p), A = prova(p, 'A', sel), B = prova(p, 'B', sel);
    fs.writeFileSync(path.join(SAIDA, `prova-${p.n}-A.docx`), await Packer.toBuffer(A.doc));
    fs.writeFileSync(path.join(SAIDA, `prova-${p.n}-B.docx`), await Packer.toBuffer(B.doc));
    resultados.push({p, A: A.nums, B: B.nums});
  }
  if (resultados.length) fs.writeFileSync(path.join(SAIDA, 'gabarito-das-provas.docx'), await Packer.toBuffer(gabaritoProvas(resultados)));
  console.log('ok:', TOTAL, 'folhas + guia + folha de redação +', resultados.length, 'provas (A e B) + gabarito');
})();
