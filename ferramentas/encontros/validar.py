# Confere uma ou mais partes dos encontros. Uso: python3 validar.py parte4 [parte5 ...]
import importlib, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import base
BLOCOS = {'Leitura e interpretação', 'Coesão e conectivos', 'Argumentação', 'Redação: estrutura', 'Redação: temas', 'Revisão final'}
erros = []
for nome in sys.argv[1:] or ['parte4']:
    antes = len(base.ENCONTROS)
    importlib.import_module(nome)
    for e in base.ENCONTROS[antes:]:
        n = e['n']; q = e['questoes']; tipos = {}
        for x in q: tipos[x['tipo']] = tipos.get(x['tipo'], 0) + 1
        perg = [x for x in q if x['tipo'] != 'texto']
        if n > 30:
            if e['bloco'] not in BLOCOS: erros.append(f'{n}: bloco desconhecido "{e["bloco"]}"')
            if not e.get('producao'): erros.append(f'{n}: falta producao')
            if not any(l.startswith('# Fique atento') for l in e['quadro']): erros.append(f'{n}: quadro sem "# Fique atento"')
            if not 14 <= len(e['quadro']) <= 30: erros.append(f'{n}: quadro com {len(e["quadro"])} linhas (use 14 a 30)')
            if tipos.get('texto', 0) < 1: erros.append(f'{n}: falta pelo menos um texto-base T(...)')
            if tipos.get('me', 0) < 6: erros.append(f'{n}: poucas questões de múltipla escolha ({tipos.get("me", 0)})')
        for x in q:
            if x['tipo'] == 'texto':
                w = len(x['texto'].split())
                if not 25 <= w <= 220: erros.append(f'{n}: texto-base com {w} palavras (use 25 a 220)')
            elif not str(x.get('resposta', '')).strip(): erros.append(f'{n}: questão sem resposta: {x["enunciado"][:50]}')
        enun = [(x['enunciado'], tuple(x.get('opcoes', x.get('itens', [])))) for x in perg]
        if len(set(enun)) != len(enun): erros.append(f'{n}: enunciados repetidos')
        pos = ''.join(x['resposta'][0] for x in q if x['tipo'] == 'me')
        print(f'{n:>2} {e["bloco"][:24]:<24} {len(perg):>2} questões {tipos} certas={pos} | {e["titulo"][:60]}')
ns = [e['n'] for e in base.ENCONTROS]
if len(set(ns)) != len(ns): erros.append('números de encontro repetidos')
print('\n'.join(erros) if erros else 'OK: tudo certo')
sys.exit(1 if erros else 0)
