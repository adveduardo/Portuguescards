# Ajusta as linhas de resposta para cada folha fechar em 2 páginas (frente e verso). Precisa do LibreOffice.
import json, os, subprocess, sys, glob, shutil, tempfile
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.abspath(os.path.join(AQUI, '..', '..'))
AJ = os.path.join(AQUI, 'ajuste.json')
aj = json.load(open(AJ)) if os.path.exists(AJ) else {}
tmp = tempfile.mkdtemp()
def paginas():
    subprocess.run(['node', os.path.join(AQUI, 'gerar_word.js')], check=True, env=dict(os.environ, NODE_PATH='/opt/node-tools/node_modules'), stdout=subprocess.DEVNULL)
    fs = sorted(glob.glob(os.path.join(RAIZ, 'encontros', 'encontro-*.docx')))
    subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', tmp] + fs, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
    r = {}
    for f in fs:
        n = int(os.path.basename(f)[9:11]); pdf = os.path.join(tmp, os.path.basename(f)[:-5] + '.pdf')
        out = subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout
        r[n] = int([l for l in out.splitlines() if l.startswith('Pages')][0].split()[1])
    return r
for rodada in range(12):
    p = paginas(); mudou = False
    for n, k in p.items():
        a = aj.setdefault(str(n), {'extra': 1, 'prod': 8})
        if k > 2:
            if a['prod'] > 6: a['prod'] -= 2
            elif a['extra'] > 1: a['extra'] -= 1; a['prod'] = 14
            elif a['prod'] > 3: a['prod'] -= 1
            else: continue
            mudou = True

    print('rodada', rodada, {n: k for n, k in p.items() if k != 2} or 'todas com 2 páginas')
    json.dump(aj, open(AJ, 'w'), indent=0, sort_keys=True)
    if not mudou: break
# se alguma passou de 2 páginas na última subida, desce e trava
p = paginas()
for n, k in p.items():
    while k > 2 and aj[str(n)]['prod'] > 2:
        aj[str(n)]['prod'] -= 2; aj[str(n)]['subir'] = False
        json.dump(aj, open(AJ, 'w'), indent=0, sort_keys=True); k = paginas()[n]
print('final', {n: k for n, k in paginas().items()})
shutil.rmtree(tmp)
