# Base dos 90 encontros. Cada parte chama E(...) com a lista de questões:
#   M(enunciado, opcoes, certa)                  múltipla escolha: 4 alternativas, certa = índice (0 a 3) na lista escrita
#   A(enunciado, resposta, linhas=1, banco=None)  resposta escrita; banco = lista de palavras para completar (opcional)
#   VF(enunciado, [(afirmação, True/False), ...])  verdadeiro ou falso (3 a 6 itens)
#   C(enunciado, [(termo, definição), ...])        associe as colunas (3 a 6 pares; a coluna da direita é embaralhada)
#   T(texto, fonte='', titulo='', para=3)          texto-base em caixa para as "para" questões seguintes (não conta como questão)
# E(n, bloco, titulo, aquecimento, quadro, q, producao=None, plano=None)
# As alternativas são embaralhadas de forma fixa (sempre o mesmo resultado) para a resposta certa
# cair em a), b), c) e d) de modo equilibrado; se todas forem números, ficam em ordem crescente.
import random, re
ENCONTROS = []
LETRAS = 'abcd'

def M(enunciado, opcoes, certa, fixo=False):
    assert len(opcoes) == 4, ('M precisa de 4 alternativas', enunciado, opcoes)
    assert len(set(opcoes)) == 4, ('alternativas repetidas', enunciado, opcoes)
    assert 0 <= certa < 4, ('índice da certa fora de 0..3', enunciado)
    return {'tipo': 'me', 'enunciado': enunciado, 'opcoes': list(opcoes), 'certa': certa, 'fixo': fixo}

def A(enunciado, resposta, linhas=1, banco=None):
    q = {'tipo': 'escrita', 'enunciado': enunciado, 'linhas': linhas, 'resposta': resposta}
    if banco: q['banco'] = list(banco)
    return q

def VF(enunciado, itens):
    assert 3 <= len(itens) <= 6, ('VF precisa de 3 a 6 itens', enunciado)
    assert all(isinstance(v, bool) for _, v in itens), ('VF: use True/False', enunciado)
    vals = [v for _, v in itens]
    assert any(vals) and not all(vals), ('VF: misture verdadeiras e falsas', enunciado)
    return {'tipo': 'vf', 'enunciado': enunciado, 'itens': [a for a, _ in itens], 'valores': vals,
            'resposta': ' – '.join('V' if v else 'F' for v in vals)}

def C(enunciado, pares):
    assert 3 <= len(pares) <= 6, ('C precisa de 3 a 6 pares', enunciado)
    ordem = list(range(len(pares))); r = random.Random(enunciado)
    while ordem == sorted(ordem): r.shuffle(ordem)
    esquerda = [a for a, _ in pares]; direita = [pares[i][1] for i in ordem]
    return {'tipo': 'colunas', 'enunciado': enunciado, 'esquerda': esquerda, 'direita': direita,
            'numeros': [i + 1 for i in ordem], 'resposta': ' – '.join(str(i + 1) for i in ordem)}

def T(texto, fonte='', titulo='', para=3):
    assert 1 <= para <= 6, ('T: para = quantas questões seguintes usam o texto', texto[:40])
    return {'tipo': 'texto', 'texto': texto, 'fonte': fonte, 'titulo': titulo, 'para': para}

def _num(o):
    try: return float(str(o).replace('.', '').replace(',', '.').replace('−', '-'))
    except ValueError: return None

def _arrumar_alternativas(n, q):
    """Equilibra a posição da resposta certa (a, b, c, d) dentro de cada encontro."""
    r = random.Random(1000 + n)
    mes = [x for x in q if x['tipo'] == 'me']
    alvos = []
    while len(alvos) < len(mes): b = [0, 1, 2, 3]; r.shuffle(b); alvos += b
    for x, alvo in zip(mes, alvos):
        ops, certa = x['opcoes'], x['opcoes'][x['certa']]
        nums = [_num(o) for o in ops]
        refere = any(re.search(r'\b[a-d]\)|\b(as|nas) (anteriores|alternativas)|todas as|nenhuma das', o, re.I) for o in ops)
        if x.pop('fixo') or refere: novo = ops
        elif all(v is not None for v in nums): novo = sorted(ops, key=_num)
        else:
            outras = [o for o in ops if o != certa]; r.shuffle(outras)
            novo = outras[:alvo] + [certa] + outras[alvo:]
        x['opcoes'] = novo; i = novo.index(certa); x.pop('certa')
        x['resposta'] = LETRAS[i] + ') ' + certa

def E(n, bloco, titulo, aquecimento, quadro, q, producao=None, plano=None):
    perguntas = [x for x in q if x['tipo'] != 'texto']
    assert 15 <= len(perguntas) <= 20, ('encontro', n, 'precisa de 15 a 20 questões (sem contar textos)', len(perguntas))
    for i, x in enumerate(q):
        if x['tipo'] == 'texto':
            seguintes = q[i + 1:i + 1 + x['para']]
            assert len(seguintes) == x['para'] and all(s['tipo'] != 'texto' for s in seguintes), ('encontro', n, 'texto sem as questões seguintes')
    assert all(isinstance(l, str) for l in quadro), ('encontro', n, 'quadro deve ser lista de textos')
    _arrumar_alternativas(n, q)
    e = {'n': n, 'bloco': bloco, 'titulo': titulo, 'aquecimento': aquecimento, 'quadro': quadro, 'questoes': q}
    if producao: e['producao'] = producao
    if plano: e['plano'] = plano
    ENCONTROS.append(e)
