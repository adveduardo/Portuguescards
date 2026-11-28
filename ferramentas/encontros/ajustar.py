# Ajusta as linhas de resposta para cada folha fechar em 2 páginas (frente e verso). Precisa do LibreOffice.
# Para cada encontro tenta, da mais folgada para a mais apertada, as configurações de CONFIGS
# (linhas a mais em cada resposta escrita, linhas da produção) e fica com a primeira que cabe em 2 páginas.
# Uso: python3 ferramentas/encontros/ajustar.py [n1 n2 ...]   (sem números: todos; com "novos": só os que não estão no ajuste.json)
import json, os, subprocess, sys, glob, shutil, tempfile
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.abspath(os.path.join(AQUI, '..', '..'))
AJ = os.path.join(AQUI, 'ajuste.json')
CONFIGS = [(2, 18), (2, 16), (2, 14), (2, 12), (2, 10), (2, 8), (1, 14), (1, 12), (1, 10), (1, 8), (1, 6), (1, 5), (1, 4), (1, 3), (1, 2), (0, 4), (0, 2)]
aj = json.load(open(AJ)) if os.path.exists(AJ) else {}
dados = json.load(open(os.path.join(RAIZ, 'dados', 'encontros-portugues.json'), encoding='utf-8'))
todos = [e['n'] for e in dados['encontros']]
args = sys.argv[1:]
if args == ['novos']: alvo = [n for n in todos if str(n) not in aj]
elif args: alvo = [int(a) for a in args]
else: alvo = todos
tmp = tempfile.mkdtemp()
def gerar():
    json.dump(aj, open(AJ, 'w'), indent=0, sort_keys=True)
    subprocess.run(['node', os.path.join(AQUI, 'gerar_word.js'), 'so-folhas'], check=True, env=dict(os.environ, NODE_PATH='/opt/node-tools/node_modules'), stdout=subprocess.DEVNULL)
def paginas(ns):
    fs = [os.path.join(RAIZ, 'encontros', 'encontro-%02d.docx' % n) for n in ns]
    for i in range(0, len(fs), 30):
        subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', tmp] + fs[i:i + 30], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=1200)
    r = {}
    for n in ns:
        out = subprocess.run(['pdfinfo', os.path.join(tmp, 'encontro-%02d.pdf' % n)], capture_output=True, text=True).stdout
        r[n] = int([l for l in out.splitlines() if l.startswith('Pages')][0].split()[1])
    return r
idx = {n: 0 for n in alvo}
for n in alvo: aj[str(n)] = {'extra': CONFIGS[0][0], 'prod': CONFIGS[0][1]}
pend = list(alvo); rodada = 0
while pend:
    gerar(); p = paginas(pend); rodada += 1
    pend = []
    for n, k in p.items():
        if k > 2 and idx[n] + 1 < len(CONFIGS):
            idx[n] += 1; aj[str(n)] = {'extra': CONFIGS[idx[n]][0], 'prod': CONFIGS[idx[n]][1]}; pend.append(n)
        elif k > 2: print('não coube em 2 páginas:', n)
    print('rodada', rodada, 'ainda ajustando:', pend or 'nenhum')
gerar()
final = paginas(alvo)
print('páginas:', {n: k for n, k in final.items() if k != 2} or 'todas com 2 páginas')
shutil.rmtree(tmp)
