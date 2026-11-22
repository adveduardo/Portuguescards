# Gera conteúdo de potenciação, raiz quadrada e média aritmética (contas feitas pelo programa).
import json, os, random
from fractions import Fraction
random.seed(2026)
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SUP = str.maketrans('0123456789-', '⁰¹²³⁴⁵⁶⁷⁸⁹⁻')
def pot(b, e): return f'{b}{str(e).translate(SUP)}'
def br(x):
    if isinstance(x, Fraction): return f'{x.numerator}/{x.denominator}' if x.denominator != 1 else str(x.numerator)
    if isinstance(x, float):
        s = f'{x:.4f}'.rstrip('0').rstrip(','); s = s.rstrip('.') if s.endswith('.') else s
        return s.replace('.', ',')
    return str(x)
def q(enun, destaque, certa, erradas, explica):
    certa = br(certa); ops = []
    for e in erradas:
        e = br(e)
        if e != certa and e not in ops: ops.append(e)
    k = 1
    while len(ops) < 3:
        c = str(int(certa) + k) if certa.lstrip('-').isdigit() else certa + ' ' + str(k)
        if c not in ops and c != certa: ops.append(c)
        k += 1
    ops = ops[:3] + [certa]; random.shuffle(ops)
    return {'enunciado': enun, 'destaque': destaque, 'opcoes': ops, 'correta': certa, 'explica': explica}

# ---------------- potenciação ----------------
P = []
for b, e in [(2,3),(2,4),(2,5),(3,2),(3,3),(4,2),(5,2),(5,3),(10,2),(10,3),(6,2),(7,2),(2,6),(3,4),(8,2),(9,2),(11,2),(12,2),(1,9),(4,3)]:
    r = b ** e
    P.append(q('Calcule a potência:', pot(b, e) + ' = ?', f'{r:,}'.replace(',', '.'), [b * e, b + e, r + b, e ** b if e ** b != r else r - 1],
      f'{pot(b, e)} = ' + ' × '.join([str(b)] * e) + f' = {r}. Cuidado: não é {b} × {e} = {b*e}.'))
for b in [5, 13, 100]:
    P.append(q('Todo número (diferente de zero) elevado a zero é:', pot(b, 0) + ' = ?', 1, [0, b, 10], f'Qualquer número diferente de zero elevado a 0 vale 1: {pot(b, 0)} = 1.'))
P.append(q('Todo número elevado a 1 é ele mesmo:', pot(37, 1) + ' = ?', 37, [1, 0, 74], f'{pot(37, 1)} = 37.'))
for b, e in [(-2, 2), (-2, 3), (-3, 2), (-1, 7), (-5, 2), (-10, 3)]:
    r = b ** e
    P.append(q('Potência de número negativo (atenção ao sinal):', f'({b}){str(e).translate(SUP)} = ?', r, [-r, abs(b) * e, -abs(b) * e],
      f'({b}){str(e).translate(SUP)} = {r}. Expoente par dá resultado positivo; expoente ímpar mantém o sinal negativo.'))
P.append(q('Atenção aos parênteses:', '−3² = ?', -9, [9, -6, 6], 'Sem parênteses, só o 3 é elevado ao quadrado: −(3²) = −9. Já (−3)² = 9.'))
for (a, b) in [((1, 2), 2), ((2, 3), 2), ((1, 3), 3)]:
    f = Fraction(*a); r = f ** b
    P.append(q('Potência de fração:', f'({a[0]}/{a[1]}){str(b).translate(SUP)} = ?', r, [Fraction(a[0] * b, a[1] * b) if a[0]*b != r.numerator else Fraction(a[0], a[1] * b), Fraction(a[0], a[1] ** b), Fraction(a[0] ** b, a[1])],
      f'Eleva o numerador e o denominador: {a[0]}{str(b).translate(SUP)}/{a[1]}{str(b).translate(SUP)} = {br(r)}.'))
P.append(q('Potência de decimal:', '(0,1)² = ?', '0,01', ['0,2', '0,1', '1'], '0,1 × 0,1 = 0,01 (duas casas decimais).'))
P.append(q('Potência de decimal:', '(0,5)² = ?', '0,25', ['1', '0,10', '2,5'], '0,5 × 0,5 = 0,25.'))
P.append(q('Propriedade: multiplicação de potências de mesma base (soma os expoentes):', pot(2, 3) + ' × ' + pot(2, 4) + ' = ?', pot(2, 7), [pot(2, 12), pot(4, 7), pot(4, 12)], 'Mesma base na multiplicação: conserva a base e soma os expoentes (3 + 4 = 7).'))
P.append(q('Propriedade: divisão de potências de mesma base (subtrai os expoentes):', pot(5, 8) + ' : ' + pot(5, 3) + ' = ?', pot(5, 5), [pot(5, 11), pot(1, 5), pot(5, 24)], 'Mesma base na divisão: conserva a base e subtrai os expoentes (8 − 3 = 5).'))
P.append(q('Propriedade: potência de potência (multiplica os expoentes):', '(' + pot(3, 2) + ')' + '⁴ = ?', pot(3, 8), [pot(3, 6), pot(9, 4), pot(3, 16)], 'Potência de potência: multiplica os expoentes (2 × 4 = 8).'))
P.append(q('Leitura:', 'Como se lê 7² ?', 'sete ao quadrado', ['sete vezes dois', 'sete ao cubo', 'dois elevado a sete'], 'Expoente 2: “ao quadrado”; expoente 3: “ao cubo”.'))
P.append(q('Leitura:', 'Como se lê 4³ ?', 'quatro ao cubo', ['quatro ao quadrado', 'quatro vezes três', 'três elevado a quatro'], '4³ = 4 × 4 × 4 = 64: “quatro ao cubo”.'))
P.append(q('Problema:', 'Um quadrado tem lado de 9 cm. Qual é a área? (lado²)', '81 cm²', ['18 cm²', '36 cm²', '27 cm²'], 'Área do quadrado = lado² = 9² = 81 cm².'))
P.append(q('Problema:', 'Um cubo tem aresta de 3 cm. Qual é o volume? (aresta³)', '27 cm³', ['9 cm³', '18 cm³', '81 cm³'], 'Volume do cubo = aresta³ = 3³ = 27 cm³.'))
P.append(q('Problema:', 'Uma bactéria se divide em 2 a cada hora. Depois de 5 horas, quantas são (começando com 1)?', '32', ['10', '25', '16'], '2⁵ = 2 × 2 × 2 × 2 × 2 = 32.'))
P.append(q('Potências de 10:', '10⁶ = ?', '1.000.000', ['60', '100.000', '10.000.000'], '10⁶: o 1 seguido de 6 zeros = 1.000.000.'))

# ---------------- raiz quadrada ----------------
R = []
for n in [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 400, 1, 0, 900]:
    r = int(n ** 0.5)
    R.append(q('Calcule a raiz quadrada:', f'√{n} = ?', r, [n // 2 if n // 2 != r else r + 2, r + 1, r - 1 if r > 0 else 3, r * 2],
      f'√{n} = {r}, porque {r}² = {r} × {r} = {n}. Cuidado: raiz não é a metade!'))
for (a, b) in [(9, 16), (4, 25), (1, 49), (36, 100)]:
    ra, rb = int(a ** .5), int(b ** .5)
    R.append(q('Raiz de fração:', f'√({a}/{b}) = ?', f'{ra}/{rb}', [f'{a//2 if a>1 else 1}/{b//2}', f'{ra}/{b}', f'{a}/{rb}'], f'Tira a raiz do numerador e do denominador: √{a}/√{b} = {ra}/{rb}.'))
for d, r, er in [('0,25', '0,5', ['0,05', '5', '0,125']), ('0,09', '0,3', ['0,03', '3', '0,045']), ('0,49', '0,7', ['0,07', '7', '0,245']), ('1,44', '1,2', ['12', '0,12', '0,72'])]:
    R.append(q('Raiz de decimal:', f'√{d} = ?', r, er, f'{r} × {r} = {d}, então √{d} = {r}.'))
for n in [50, 20, 70, 10, 90, 30]:
    lo = int(n ** .5)
    R.append(q('Estimativa: entre quais números inteiros está a raiz?', f'√{n} está entre:', f'{lo} e {lo+1}', [f'{lo-1} e {lo}', f'{lo+1} e {lo+2}', f'{n//2 - 1} e {n//2}'], f'{lo}² = {lo*lo} e {lo+1}² = {(lo+1)**2}; como {lo*lo} < {n} < {(lo+1)**2}, √{n} está entre {lo} e {lo+1}.'))
R.append(q('Números negativos:', '√(−16) nos números reais:', 'não existe', ['−4', '4', '8'], 'Nenhum número real ao quadrado dá negativo (4² = 16 e (−4)² = 16). Então √(−16) não existe nos reais.'))
R.append(q('Problema:', 'Um quadrado tem área de 64 m². Quanto mede o lado?', '8 m', ['16 m', '32 m', '4 m'], 'Lado = √área = √64 = 8 m.'))
R.append(q('Problema:', 'Uma horta quadrada tem 144 m². Quanto mede cada lado?', '12 m', ['72 m', '14 m', '36 m'], '√144 = 12, porque 12 × 12 = 144.'))
R.append(q('Problema:', 'Uma sala quadrada tem 49 m² de piso. Qual é o perímetro?', '28 m', ['7 m', '49 m', '14 m'], 'Lado = √49 = 7 m; perímetro = 4 × 7 = 28 m.'))
R.append(q('Expressão:', '√36 + √64 = ?', '14', ['10', '100', '√100'], '√36 = 6 e √64 = 8; 6 + 8 = 14. Atenção: √36 + √64 não é √100.'))
R.append(q('Expressão:', '√81 − √25 = ?', '4', ['√56', '56', '2'], '√81 = 9 e √25 = 5; 9 − 5 = 4.'))
R.append(q('Expressão:', '3 × √49 = ?', '21', ['147', '10', '7'], '√49 = 7; 3 × 7 = 21.'))
R.append(q('Relação com a potência:', 'Se 15² = 225, então √225 = ?', '15', ['112,5', '25', '30'], 'Raiz quadrada é a operação inversa de elevar ao quadrado.'))
R.append(q('Raiz cúbica:', '∛27 = ?', '3', ['9', '13,5', '6'], '3³ = 27, então ∛27 = 3.'))
R.append(q('Raiz cúbica:', '∛8 = ?', '2', ['4', '24', '3'], '2³ = 8, então ∛8 = 2.'))
R.append(q('Quadrado perfeito:', 'Qual destes é um quadrado perfeito?', '81', ['50', '72', '90'], '81 = 9². Os outros não têm raiz quadrada exata.'))

# ---------------- média aritmética ----------------
M = []
def media_q(vals, contexto, unidade=''):
    s = sum(Fraction(str(v)) for v in vals); m = s / len(vals)
    mm = br(m) if m.denominator == 1 else br(round(float(m), 2))
    erradas = [br(s), br(max(vals)), br(round((max(vals) + min(vals)) / 2, 2)) if (max(vals) + min(vals)) / 2 != float(m) else br(float(m) + 1), br(float(m) + 1)]
    return q('Média aritmética:', contexto, mm + unidade, [e + unidade for e in erradas],
      f'Soma: {" + ".join(br(v) for v in vals)} = {br(s)}. Divide pela quantidade ({len(vals)}): {br(s)} ÷ {len(vals)} = {mm}{unidade}.')
for vals in [[4, 6], [10, 20], [3, 5, 7], [2, 4, 6, 8], [5, 10, 15], [12, 18], [7, 8, 9], [1, 2, 3, 4, 5], [20, 30, 40], [6, 6, 9]]:
    M.append(media_q(vals, 'Qual é a média de ' + ', '.join(map(str, vals[:-1])) + ' e ' + str(vals[-1]) + '?'))
for nome, notas in [('Ana', [7, 8, 9, 8]), ('Leo', [5, 6, 7, 6]), ('Bia', [10, 8, 9, 9]), ('Davi', [6, 7, 5, 6]), ('Lia', [8.5, 7.5, 9, 7])]:
    M.append(media_q(notas, f'{nome} tirou as notas ' + ', '.join(br(float(n)) if isinstance(n, float) else str(n) for n in notas[:-1]) + ' e ' + (br(float(notas[-1])) if isinstance(notas[-1], float) else str(notas[-1])) + ' nos quatro bimestres. Qual é a média?'))
for idades in [[10, 12, 14], [11, 13, 12, 12], [30, 40, 50]]:
    M.append(media_q(idades, 'Qual é a média das idades: ' + ', '.join(map(str, idades)) + ' anos?', ' anos'))
for temps in [[20, 24, 22, 26], [30, 28, 32]]:
    M.append(media_q(temps, 'As temperaturas da semana foram ' + ', '.join(map(str, temps)) + ' °C. Qual é a temperatura média?', ' °C'))
M.append(media_q([150, 200, 250], 'Uma loja vendeu R$ 150, R$ 200 e R$ 250 em três dias. Qual foi a média por dia? (em reais)'))
M.append(media_q([2, 3, 4, 5, 6], 'Em 5 jogos, o time fez 2, 3, 4, 5 e 6 gols. Qual é a média de gols por jogo?'))
M.append(media_q([-2, 0, 5], 'Qual é a média de −2, 0 e 5?'))
for notas, alvo in [([6, 7, 8], 7), ([5, 6, 7], 6), ([8, 8, 9], 8), ([4, 6, 7], 6)]:
    falta = alvo * 4 - sum(notas)
    M.append(q('Média: quanto falta?', f'Um aluno tirou {notas[0]}, {notas[1]} e {notas[2]}. Que nota precisa no 4º bimestre para ter média {alvo}?', falta, [alvo, falta + 1, sum(notas) // 3],
      f'Para média {alvo} em 4 notas, a soma deve ser {alvo} × 4 = {alvo*4}. Já tem {sum(notas)}; faltam {alvo*4} − {sum(notas)} = {falta}.'))
M.append(q('Média e soma:', 'A média de 5 números é 8. Qual é a soma deles?', '40', ['13', '8', '1,6'], 'Soma = média × quantidade = 8 × 5 = 40.'))
M.append(q('Média e soma:', 'A média de 4 números é 15. Qual é a soma deles?', '60', ['19', '11', '3,75'], 'Soma = 15 × 4 = 60.'))
M.append(q('Conceito:', 'Para calcular a média aritmética, nós:', 'somamos todos os valores e dividimos pela quantidade', ['pegamos o maior valor', 'multiplicamos os valores', 'subtraímos o menor do maior'], 'Média = soma dos valores ÷ quantidade de valores.'))
M.append(q('Conceito:', 'Se somarmos 2 a todos os valores de uma lista, a média:', 'aumenta 2', ['não muda', 'dobra', 'aumenta 4'], 'Cada valor cresce 2, então a soma cresce 2 × quantidade e a média cresce 2.'))
M.append(q('Conceito:', 'A média de 10, 10, 10 e 10 é:', '10', ['40', '4', '0'], 'Se todos os valores são iguais, a média é esse valor.'))

def salvar(f, d):
    json.dump(d, open(os.path.join(RAIZ, 'dados', f), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
temas = [('potenciacao', 'Potenciação', '🔺', P), ('raiz-quadrada', 'Raiz quadrada', '√', R), ('media-aritmetica', 'Média aritmética', '📊', M)]
ind = json.load(open(os.path.join(RAIZ, 'dados', 'indice.json'), encoding='utf-8'))
def add(cat, e):
    l = ind.setdefault(cat, []); l[:] = [x for x in l if x['arquivo'] != e['arquivo']]; l.append(e)
mist = []
for slug, nome, em, L in temas:
    salvar(f'mat-{slug}.json', {'titulo': f'{nome} (exercícios)', 'emoji': em, 'instrucao': 'Escolha a resposta certa.', 'rodadas': L})
    add('escolha-mat', {'arquivo': f'mat-{slug}.json', 'titulo': f'🔢 {nome}', 'qtd': len(L)})
    per = [{'pergunta': (r['enunciado'] + ' ' + r['destaque']).strip(), 'opcoes': r['opcoes'], 'correta': r['correta'], 'explica': r['explica']} for r in L]
    salvar(f'quiz-mat-{slug}.json', {'titulo': f'Quiz: {nome}', 'tempoPadrao': 40, 'perguntas': per})
    add('quiz', {'arquivo': f'quiz-mat-{slug}.json', 'titulo': f'🔢 {nome}', 'qtd': len(per)})
    mist += random.sample(per, 15)
random.shuffle(mist)
salvar('quiz-mat-pot-raiz-media.json', {'titulo': 'Quiz: potenciação, raiz quadrada e média', 'tempoPadrao': 40, 'perguntas': mist})
add('quiz', {'arquivo': 'quiz-mat-pot-raiz-media.json', 'titulo': '🔢 Potenciação, raiz quadrada e média (misturado)', 'qtd': len(mist)})
# memória: já existem memoria-mat-potencias.json e memoria-mat-raizes.json no painel
# cestos
qp = [n * n for n in range(1, 21)]
nao = [n for n in [2,3,5,8,10,12,15,18,20,24,27,30,32,40,45,50,60,72,80,90,99,120,150,200] if n not in qp]
salvar('mat-cestos-quadrado-perfeito.json', {'titulo': 'Matemática: quadrado perfeito ou não?', 'cestos': [{'id': 'sim', 'nome': 'Quadrado perfeito (raiz exata)', 'emoji': '✅', 'cor': '#27ae60'}, {'id': 'nao', 'nome': 'Não é quadrado perfeito', 'emoji': '❌', 'cor': '#c0392b'}],
  'palavras': [{'palavra': str(n), 'cesto': 'sim'} for n in qp] + [{'palavra': str(n), 'cesto': 'nao'} for n in nao]})
sinal = [(-2,2),(-2,3),(-3,2),(-3,3),(-1,4),(-1,5),(-5,2),(-4,3),(-10,2),(-10,5),(-6,2),(-7,1),(-2,4),(-2,5),(-9,2),(-8,3),(3,3),(2,5),(-1,100),(-1,99)]
salvar('mat-cestos-sinal-potencia.json', {'titulo': 'Matemática: o resultado da potência é positivo ou negativo?', 'cestos': [{'id': 'pos', 'nome': 'Positivo (+)', 'emoji': '➕', 'cor': '#2f80ed'}, {'id': 'neg', 'nome': 'Negativo (−)', 'emoji': '➖', 'cor': '#e67e22'}],
  'palavras': [{'palavra': f'({b}){str(e).translate(SUP)}' if b < 0 else pot(b, e), 'cesto': 'pos' if b ** e > 0 else 'neg'} for b, e in sinal]})
add('morfo-cestos', {'arquivo': 'mat-cestos-quadrado-perfeito.json', 'titulo': '🔢 Quadrado perfeito ou não?'})
add('morfo-cestos', {'arquivo': 'mat-cestos-sinal-potencia.json', 'titulo': '🔢 Potência: positivo ou negativo?'})
# batata e trilha
bat = [('Quanto é 2⁵?', '32'), ('Quanto é 10⁴?', '10.000'), ('Quanto é 3³?', '27'), ('Quanto é (−2)²? E −2²?', '4 e −4'), ('Quanto é 7⁰?', '1'), ('Quanto é √81?', '9'), ('Quanto é √144?', '12'), ('√30 está entre quais inteiros?', '5 e 6'),
  ('Um quadrado tem área 100 m². Quanto mede o lado?', '10 m'), ('Qual é a média de 4, 8 e 12?', '8'), ('A média de 3 notas é 7. Qual é a soma das notas?', '21'), ('Tirei 6 e 8. Qual é a minha média?', '7'),
  ('Explique por que 2³ não é 6.', '2³ = 2 × 2 × 2 = 8; o expoente diz quantas vezes multiplicar a base.'), ('Diga um quadrado perfeito maior que 100.', 'Ex.: 121, 144, 169, 196, 225.'), ('Quanto é 5² + 3²?', '25 + 9 = 34'),
  ('Quanto é √25 × √4?', '5 × 2 = 10'), ('Calcule a média de idades da sua dupla.', 'Somar as idades e dividir por 2.'), ('Para que serve a média no dia a dia?', 'Ex.: notas da escola, gasto médio, temperatura média.')]
salvar('batata-pot-raiz-media.json', {'titulo': 'Batata quente: potência, raiz e média', 'perguntas': [{'pergunta': a, 'resposta': b} for a, b in bat]})
add('batata', {'arquivo': 'batata-pot-raiz-media.json', 'titulo': '🔢 Potência, raiz e média'})
trilha = {'titulo': 'Trilha da potência, raiz e média', 'casas': 30, 'especiais': True,
  'tipos': {'pot': {'nome': 'Potenciação', 'emoji': '🔺', 'cor': '#2f80ed'}, 'raiz': {'nome': 'Raiz quadrada', 'emoji': '✔️', 'cor': '#27ae60'}, 'media': {'nome': 'Média', 'emoji': '📊', 'cor': '#8e44ad'}, 'mente': {'nome': 'Cálculo mental', 'emoji': '🧠', 'cor': '#e67e22'}},
  'desafios': {'pot': [{'texto': (r['enunciado'] + ' ' + r['destaque']).strip(), 'resposta': r['correta']} for r in random.sample(P, 10)],
               'raiz': [{'texto': (r['enunciado'] + ' ' + r['destaque']).strip(), 'resposta': r['correta']} for r in random.sample(R, 10)],
               'media': [{'texto': r['destaque'], 'resposta': r['correta']} for r in random.sample(M, 10)],
               'mente': [{'texto': a, 'resposta': b} for a, b in bat[:10]]}}
salvar('trilha-pot-raiz-media.json', trilha)
add('trilha', {'arquivo': 'trilha-pot-raiz-media.json', 'titulo': '🔢 Trilha da potência, raiz e média'})
json.dump(ind, open(os.path.join(RAIZ, 'dados', 'indice.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
open(os.path.join(RAIZ, 'dados', 'indice.json'), 'a').write('\n')
print({n: len(L) for _, n, _, L in temas}, 'misturado', len(mist))
