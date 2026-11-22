# Base dos 30 encontros: cada parte chama E(...) com M(...) (múltipla escolha) e A(...) (resposta escrita).
ENCONTROS = []
LETRAS = 'abcd'
def M(enunciado, opcoes, certa):
    return {'tipo': 'me', 'enunciado': enunciado, 'opcoes': opcoes, 'resposta': LETRAS[certa] + ') ' + opcoes[certa]}
def A(enunciado, resposta, linhas=1):
    return {'tipo': 'escrita', 'enunciado': enunciado, 'linhas': linhas, 'resposta': resposta}
def E(n, bloco, titulo, aquecimento, quadro, q):
    assert 15 <= len(q) <= 20, (n, len(q))
    ENCONTROS.append({'n': n, 'bloco': bloco, 'titulo': titulo, 'aquecimento': aquecimento, 'quadro': quadro, 'questoes': q})
