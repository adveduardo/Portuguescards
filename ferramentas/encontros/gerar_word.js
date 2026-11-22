// Gera as folhas de atividade (uma por encontro) e o guia do professor em Word.
// Uso: NODE_PATH=/opt/node-tools/node_modules node ferramentas/encontros/gerar_word.js
const fs = require('fs'), path = require('path');
const {Document, Packer, Paragraph, TextRun, Tab, TabStopType, LeaderType, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak, HeadingLevel, Footer, PageNumber} = require('docx');
const RAIZ = path.resolve(__dirname, '..', '..');
const dados = JSON.parse(fs.readFileSync(path.join(RAIZ, 'dados', 'encontros-portugues.json'), 'utf8'));
const SAIDA = path.join(RAIZ, 'encontros');
// ajuste.json: linhas a mais nas respostas e linhas da produção, por encontro (para fechar a folha frente e verso)
const AJ = fs.existsSync(path.join(__dirname, 'ajuste.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'ajuste.json'), 'utf8')) : {};
fs.mkdirSync(SAIDA, {recursive: true});
const LARG = 11906 - 2 * 1080;   // A4 com margens de 0,75"
const FONTE = 'Arial';
const pagina = {page: {size: {width: 11906, height: 16838}, margin: {top: 1080, bottom: 1080, left: 1080, right: 1080}}};
const estilos = {default: {document: {run: {font: FONTE, size: 22}},
  heading1: {run: {font: FONTE, size: 30, bold: true, color: '1F3A68'}, paragraph: {spacing: {before: 0, after: 120}, keepNext: true}},
  heading2: {run: {font: FONTE, size: 24, bold: true, color: '1F3A68'}, paragraph: {spacing: {before: 200, after: 80}, keepNext: true}}}};
const dois = n => String(n).padStart(2, '0');
const t = (text, o) => new TextRun(Object.assign({text}, o || {}));
const linhaResposta = () => new Paragraph({spacing: {before: 120, after: 0}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}], children: [new TextRun({children: [new Tab()]})]});
const rodape = txt => ({default: new Footer({children: [new Paragraph({alignment: AlignmentType.CENTER, children: [t(txt + ' • página ', {size: 16, color: '777777'}), new TextRun({children: [PageNumber.CURRENT], size: 16, color: '777777'})]})]})});

function opcoes(op){
  const rot = op.map((o, i) => 'abcd'[i] + ') ' + o);
  const soma = rot.reduce((s, r) => s + r.length, 0), maior = Math.max(...rot.map(r => r.length));
  const P = (itens, colunas) => new Paragraph({spacing: {before: 20, after: 20}, indent: {left: 300},
    tabStops: colunas.map(c => ({type: TabStopType.LEFT, position: c})), children: itens.flatMap((r, i) => i ? [new TextRun({children: [new Tab()]}), t('( ) ' + r)] : [t('( ) ' + r)])});
  if (soma <= 72 && maior <= 20) return [P(rot, [LARG / 4, LARG / 2, 3 * LARG / 4].map(Math.round))];
  if (maior <= 42) return [P(rot.slice(0, 2), [Math.round(LARG / 2)]), P(rot.slice(2), [Math.round(LARG / 2)])];
  return rot.map(r => P([r], []));
}

function folha(e){
  const aj = Object.assign({extra: 1, prod: 8}, AJ[e.n] || {});
  const filhos = [
    new Paragraph({spacing: {after: 60}, tabStops: [{type: TabStopType.RIGHT, position: LARG, leader: LeaderType.UNDERSCORE}],
      children: [t('Nome: ', {bold: true}), new TextRun({children: [new Tab()]})]}),
    new Paragraph({spacing: {after: 120}, children: [t('Turma: ________   Nº: _____   Data: ____/____/______', {bold: true})]}),
    new Paragraph({spacing: {after: 40}, children: [t('Encontro ' + dois(e.n) + ' • ' + e.bloco, {bold: true, size: 20, color: '1F3A68'})]}),
    new Paragraph({heading: HeadingLevel.HEADING_1, border: {bottom: {style: BorderStyle.SINGLE, size: 8, color: '1F3A68', space: 4}}, children: [t(e.titulo)]}),
    new Paragraph({spacing: {after: 120}, children: [t('Leia com atenção e consulte o que você copiou do quadro. Marque um X na alternativa certa ou responda nas linhas.', {italics: true, size: 20})]}),
  ];
  e.questoes.forEach((q, i) => {
    filhos.push(new Paragraph({spacing: {before: 140, after: 40}, keepNext: true, children: [t((i + 1) + '. ', {bold: true}), t(q.enunciado)]}));
    if (q.tipo === 'me') filhos.push(...opcoes(q.opcoes));
    else for (let k = 0; k < (q.linhas || 1) + aj.extra; k++) filhos.push(linhaResposta());
  });
  filhos.push(new Paragraph({spacing: {before: 200, after: 40}, keepNext: true, children: [t((e.questoes.length + 1) + '. ✍️ Produção: ', {bold: true}), t(e.producao)]}));
  for (let k = 0; k < aj.prod; k++) filhos.push(linhaResposta());
  return new Document({creator: 'Painel de Aula', title: 'Encontro ' + dois(e.n) + ': ' + e.titulo, styles: estilos,
    sections: [{properties: pagina, footers: rodape('Português em 30 encontros • Encontro ' + dois(e.n)), children: filhos}]});
}

function celula(txt, larg, cab){
  return new TableCell({width: {size: larg, type: WidthType.DXA}, margins: {top: 60, bottom: 60, left: 100, right: 100},
    shading: cab ? {type: ShadingType.CLEAR, fill: 'DCE6F5', color: 'auto'} : undefined,
    children: [new Paragraph({children: [t(txt, {bold: !!cab, size: 20})]})]});
}
function guia(){
  const cols = [1500, 1900, LARG - 3400];
  const filhos = [
    new Paragraph({heading: HeadingLevel.HEADING_1, children: [t('Guia do professor: ' + dados.titulo)]}),
    new Paragraph({spacing: {after: 120}, children: [t('Cada encontro tem ' + dados.duracao + '. Para cada um: o plano das duas aulas, o aquecimento, o que passar no quadro e o gabarito da folha de atividade.')]}),
  ];
  dados.encontros.forEach((e, idx) => {
    if (idx) filhos.push(new Paragraph({children: [new PageBreak()]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_1, children: [t('Encontro ' + dois(e.n) + ' • ' + e.titulo)]}));
    filhos.push(new Paragraph({children: [t('Bloco: ', {bold: true}), t(e.bloco + '   •   ' + e.questoes.length + ' questões na folha')]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Plano das duas aulas')]}));
    filhos.push(new Table({width: {size: LARG, type: WidthType.DXA}, columnWidths: cols, rows: [
      new TableRow({tableHeader: true, children: [celula('Tempo', cols[0], true), celula('Etapa', cols[1], true), celula('Como fazer', cols[2], true)]}),
      ...dados.plano.map(p => new TableRow({children: [celula('Aula ' + p.aula + ': ' + p.inicio + '–' + p.fim + ' min', cols[0]), celula(p.etapa, cols[1]), celula(p.etapa === 'Aquecimento' ? e.aquecimento : p.como, cols[2])]}))]}));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('No quadro')]}));
    e.quadro.forEach(l => filhos.push(l.startsWith('# ')
      ? new Paragraph({spacing: {before: 100, after: 40}, children: [t(l.slice(2), {bold: true})]})
      : new Paragraph({indent: {left: 300}, spacing: {after: 30}, children: [t(l.replace(/^- /, '• '))]})));
    filhos.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: [t('Gabarito')]}));
    e.questoes.forEach((q, i) => filhos.push(new Paragraph({spacing: {after: 30}, children: [t((i + 1) + '. ', {bold: true}), t(q.resposta, {size: 20})]})));
    filhos.push(new Paragraph({spacing: {after: 30}, children: [t((e.questoes.length + 1) + '. Produção: ', {bold: true}), t('resposta pessoal. Proposta: ' + e.producao, {size: 20})]}));
  });
  return new Document({creator: 'Painel de Aula', title: 'Guia do professor: 30 encontros', styles: estilos,
    sections: [{properties: pagina, footers: rodape('Guia do professor • Português em 30 encontros'), children: filhos}]});
}

(async () => {
  for (const e of dados.encontros) fs.writeFileSync(path.join(SAIDA, 'encontro-' + dois(e.n) + '.docx'), await Packer.toBuffer(folha(e)));
  fs.writeFileSync(path.join(SAIDA, 'guia-do-professor.docx'), await Packer.toBuffer(guia()));
  console.log('ok:', dados.encontros.length, 'folhas + guia');
})();
