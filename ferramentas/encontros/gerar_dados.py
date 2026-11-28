# Gera dados/encontros-portugues.json a partir das partes (1 a 30: parte1-3; 31 a 90: parte4-9).
import importlib, json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import base, quadro_extra, bncc
PARTES = ['parte1', 'parte2', 'parte3', 'parte4', 'parte5', 'parte6', 'parte7', 'parte8', 'parte9']
for p in PARTES:
    if os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), p + '.py')): importlib.import_module(p)
try:
    from textos_base import TEXTOS    # texto + 3 questões de leitura no fim das folhas 1 a 30
except ImportError:
    TEXTOS = {}
raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
enc = sorted(base.ENCONTROS, key=lambda e: e['n'])
PRODUCAO = {1: 'Escreva 4 frases usando palavras com dígrafos (ch, lh, nh, rr, ss, qu). Sublinhe os dígrafos.', 2: 'Escreva um pequeno texto sobre a sua rua. Depois, separe as sílabas de três palavras do seu texto.', 3: 'Escreva 5 frases sobre o seu dia, cada uma com uma palavra proparoxítona. Sublinhe essas palavras.', 4: 'Escreva um bilhete para um colega usando pelo menos 6 palavras com S, SS, Ç, SC ou Z. Circule-as.', 5: 'Escreva uma pequena receita usando palavras com G/J, X/CH e M antes de P e B. Circule essas palavras.', 6: 'Escreva um diálogo de 4 falas usando “por que”, “porque”, “mas” e “mais”.', 7: 'Monte o cardápio de uma lanchonete com 6 itens que tenham palavras acentuadas (ex.: café, pão de queijo).', 8: 'Copie 5 palavras acentuadas de um livro ou texto e explique a regra do acento de cada uma.', 9: 'Escreva um relato curto de um passeio usando ponto final, vírgula, interrogação e exclamação.', 10: 'Escreva um diálogo entre dois personagens usando travessão, dois-pontos e vírgula.', 11: 'Invente 3 palavras novas por derivação ou composição e explique o significado de cada uma.', 12: 'Escreva uma notícia curta sobre a escola. Circule 3 substantivos próprios e sublinhe 3 comuns.', 13: 'Escreva 3 frases e depois reescreva-as trocando o gênero ou o número dos substantivos.', 14: 'Escreva as regras de um jogo usando numerais ordinais (primeiro, segundo, terceiro…).', 15: 'Descreva um lugar da sua cidade usando adjetivos e pelo menos uma comparação.', 16: 'Escreva um pequeno e-mail formal ao diretor da escola usando o pronome de tratamento adequado.', 17: 'Escreva 4 frases sobre objetos da sala usando “este”, “esse”, “aquele” e um pronome relativo.', 18: 'Conte o que você fez ontem, o que faz hoje e o que fará amanhã (uma frase para cada tempo).', 19: 'Escreva o que você faria se ganhasse um prêmio, usando o futuro do pretérito e o subjuntivo.', 20: 'Escreva instruções para chegar à sua casa usando advérbios de lugar, de tempo e de modo.', 21: 'Escreva um texto curto com 3 conjunções diferentes e 2 interjeições. Sublinhe-as.', 22: 'Escreva um parágrafo com um período simples e um período composto. Identifique cada um.', 23: 'Escreva 4 orações, cada uma com um tipo de sujeito diferente, e classifique o sujeito.', 24: 'Escreva 3 frases sobre você: uma com predicado nominal, uma com verbal e uma com verbo-nominal.', 25: 'Escreva 4 orações com verbos VI, VTD, VTI e VTDI e indique os objetos.', 26: 'Escreva o anúncio de venda de um objeto usando adjuntos adnominais e adverbiais.', 27: 'Escreva um convite para uma festa usando um vocativo e um aposto.', 28: 'Escreva um aviso para o mural da escola, com atenção à concordância verbal e nominal.', 29: 'Escreva o roteiro de um passeio no fim de semana usando “à”, “às”, “ao” e os verbos ir e chegar.', 30: 'Escreva um texto contando o que você mais aprendeu nos 30 encontros, revisando ortografia, acentuação e pontuação.'}
for e in enc:
    n = e['n']
    if n <= 30:
        e['producao'] = PRODUCAO[n]
        e['quadro'] = e['quadro'] + quadro_extra.X[n]
        if n in TEXTOS:
            grupo = TEXTOS[n]; base._arrumar_alternativas(500 + n, grupo); e['questoes'] = e['questoes'] + grupo
            assert len([q for q in e['questoes'] if q['tipo'] != 'texto']) <= 20, n
    e['parte'] = 1 if n <= 30 else 2
    bncc.aplicar(e)
# questões tiradas para a folha caber em uma folha frente e verso (o mesmo conteúdo é treinado em outras questões do encontro)
CORTES = {33: ['Texto: “Em algumas cidades, o transporte público gratuito', 'Texto: “Algumas praias do litoral'],
          54: ['Qual repertório NÃO é pertinente ao tema “Desafios para a valorização da herança africana'],
          60: ['Tema: “Desafios para o enfrentamento da invisibilidade do trabalho de cuidado'], 84: ['Complete a proposta com o MEIO/MODO'], 73: ['Complete a proposta com a FINALIDADE'], 74: ['Complete a proposta com o MEIO/MODO'],
          76: ['Complete a proposta com a AÇÃO'], 77: ['Complete a proposta com um DETALHAMENTO'], 79: ['Complete a proposta com a FINALIDADE'],
          81: ['Complete a proposta com a AÇÃO'], 82: ['Complete a proposta com a FINALIDADE'],
          90: ['Em uma redação bem estruturada, um parágrafo de desenvolvimento', 'Escreva uma proposta de intervenção completa']}
for e in enc:
    for prefixo in CORTES.get(e['n'], []):
        qs = e['questoes']; i = next(k for k, q in enumerate(qs) if q['tipo'] != 'texto' and q['enunciado'].startswith(prefixo))
        for k in range(i - 1, -1, -1):          # se a questão era de um texto-base, o texto passa a valer para uma questão a menos
            if qs[k]['tipo'] == 'texto':
                if i - k <= qs[k]['para']: qs[k]['para'] -= 1
                break
        del qs[i]
    assert 15 <= len([q for q in e['questoes'] if q['tipo'] != 'texto']) <= 20, e['n']
ns = [e['n'] for e in enc]
assert ns == list(range(1, len(enc) + 1)), ('encontros fora de ordem ou faltando', ns)
plano = [
  {'aula': 1, 'inicio': 0, 'fim': 10, 'etapa': 'Aquecimento', 'como': 'Pergunta oral para despertar a turma (ver “Aquecimento”).'},
  {'aula': 1, 'inicio': 10, 'fim': 35, 'etapa': 'Quadro', 'como': 'Explicar e passar o conteúdo do quadro; a turma copia no caderno.'},
  {'aula': 1, 'inicio': 35, 'fim': 50, 'etapa': 'Exemplos juntos', 'como': 'Entregar a folha e resolver as questões 1 a 3 com a turma, no quadro.'},
  {'aula': 2, 'inicio': 50, 'fim': 85, 'etapa': 'Atividade', 'como': 'Questões 4 em diante, individual ou em dupla, consultando o caderno.'},
  {'aula': 2, 'inicio': 85, 'fim': 100, 'etapa': 'Correção', 'como': 'Correção coletiva com o gabarito no projetor (painel) ou no guia do professor.'},
]
plano_tema = [
  {'aula': 1, 'inicio': 0, 'fim': 10, 'etapa': 'Aquecimento', 'como': 'Debate rápido sobre o tema (ver “Aquecimento”).'},
  {'aula': 1, 'inicio': 10, 'fim': 30, 'etapa': 'Quadro', 'como': 'Tema, recorte, repertório, argumentos e modelo de proposta; a turma copia.'},
  {'aula': 1, 'inicio': 30, 'fim': 50, 'etapa': 'Leitura da proposta', 'como': 'Folha: textos motivadores e questões de leitura, tese e proposta (corrigir as primeiras juntos).'},
  {'aula': 2, 'inicio': 50, 'fim': 60, 'etapa': 'Planejamento', 'como': 'Cada aluno preenche o planejamento da folha: tese, dois argumentos, repertório e proposta.'},
  {'aula': 2, 'inicio': 60, 'fim': 100, 'etapa': 'Escrita da redação', 'como': 'Redação na Folha de redação (20 a 30 linhas); nos últimos minutos, autoavaliação com a grade das competências.'},
]
for e in enc:
    if e['bloco'] == 'Redação: temas' and 'plano' not in e: e['plano'] = plano_tema
PROVAS = [
  {'n': 1, 'titulo': 'Fonologia, ortografia, acentuação e pontuação', 'de': 1, 'ate': 10},
  {'n': 2, 'titulo': 'Morfologia: as classes de palavras', 'de': 11, 'ate': 21},
  {'n': 3, 'titulo': 'Sintaxe', 'de': 22, 'ate': 30},
  {'n': 4, 'titulo': 'Leitura e interpretação', 'de': 31, 'ate': 40},
  {'n': 5, 'titulo': 'Coesão e conectivos', 'de': 41, 'ate': 50},
  {'n': 6, 'titulo': 'Argumentação', 'de': 51, 'ate': 60},
  {'n': 7, 'titulo': 'Redação: estrutura do texto dissertativo-argumentativo', 'de': 61, 'ate': 72},
  {'n': 8, 'titulo': 'Simulado de redação (temas)', 'de': 73, 'ate': 90},
]
provas = [p for p in PROVAS if p['ate'] <= len(enc)]
d = {'titulo': f'Português em {len(enc)} encontros: da ortografia à redação', 'duracao': '2 aulas de 50 minutos',
     'partes': [{'n': 1, 'titulo': 'Encontros 1 a 30: da ortografia à sintaxe'}, {'n': 2, 'titulo': 'Encontros 31 a 90: leitura, conectivos, argumentação e redação'}],
     'plano': plano, 'provas': provas, 'encontros': enc,
     'bncc': {c: bncc.HAB[c] for c in sorted({b['codigo'] for e in enc for b in e['bncc']})}}
json.dump(d, open(os.path.join(raiz, 'dados', 'encontros-portugues.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# as questões de múltipla escolha também vão para o Banco de Questões (Montar prova, PortuguêsCards), uma lista por prova
ind_p = os.path.join(raiz, 'dados', 'indice.json'); ind = json.load(open(ind_p, encoding='utf-8'))
ind['banco'] = [x for x in ind.get('banco', []) if not x['arquivo'].startswith('banco-encontros-')]
for pv in provas:
    perg = []
    for e in enc:
        if not pv['de'] <= e['n'] <= pv['ate']: continue
        texto, resta = '', 0
        for q in e['questoes']:
            if q['tipo'] == 'texto':
                texto, resta = (q['titulo'] + '\n' if q['titulo'] else '') + q['texto'] + ('\n(' + q['fonte'] + ')' if q['fonte'] else ''), q['para']; continue
            dep = texto if resta > 0 else ''
            if resta > 0: resta -= 1
            if q['tipo'] != 'me': continue
            certa = q['resposta'][3:]
            item = {'pergunta': q['enunciado'], 'opcoes': q['opcoes'], 'correta': certa, 'explica': f"Encontro {e['n']}: {e['titulo']}."}
            if dep: item['texto'] = dep
            perg.append(item)
    arq = f"banco-encontros-{pv['n']}.json"
    json.dump({'titulo': f"Encontros {pv['de']} a {pv['ate']}: {pv['titulo']}", 'tempoPadrao': 45, 'perguntas': perg},
              open(os.path.join(raiz, 'dados', arq), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    ind['banco'].append({'arquivo': arq, 'titulo': f"🗂️ Encontros {pv['de']} a {pv['ate']}: {pv['titulo']} ({len(perg)} questões)", 'grupo': f'🗂️ {len(enc)} encontros de Português', 'qtd': len(perg)})
json.dump(ind, open(ind_p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(len(enc), 'encontros;', sum(len([q for q in e['questoes'] if q['tipo'] != 'texto']) for e in enc), 'questões;', len(provas), 'provas')
