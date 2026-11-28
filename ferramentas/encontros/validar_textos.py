# Confere textos_base.py (texto + 3 questões de leitura para cada um dos encontros 1 a 30). Uso: python3 validar_textos.py
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from textos_base import TEXTOS
erros = []
if sorted(TEXTOS) != list(range(1, 31)): erros.append(f'faltam encontros: {sorted(set(range(1, 31)) - set(TEXTOS))}')
for n, grupo in sorted(TEXTOS.items()):
    if not grupo or grupo[0]['tipo'] != 'texto': erros.append(f'{n}: o primeiro item deve ser T(...)'); continue
    t, qs = grupo[0], grupo[1:]
    if t['para'] != 3 or len(qs) != 3: erros.append(f'{n}: use T(..., para=3) seguido de exatamente 3 questões')
    if any(q['tipo'] == 'texto' for q in qs): erros.append(f'{n}: só um texto por encontro')
    w = len(t['texto'].split())
    if not 40 <= w <= 120: erros.append(f'{n}: texto com {w} palavras (use 40 a 120)')
    for q in qs:
        if not str(q.get('resposta', '')).strip() and q['tipo'] != 'me': erros.append(f'{n}: questão sem resposta')
    print(f'{n:>2} {w:>3} palavras | {t["titulo"][:40]:<40} | ' + ', '.join(q['tipo'] for q in qs))
print('\n'.join(erros) if erros else 'OK: tudo certo')
sys.exit(1 if erros else 0)
