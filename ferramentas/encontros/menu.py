# Reescreve no index.html os grupos do menu dos encontros (a partir de dados/encontros-portugues.json)
# e o atalho dos encontros de redação no grupo "Português › Redação".
import json, os, re
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
D = json.load(open(os.path.join(RAIZ, 'dados', 'encontros-portugues.json'), encoding='utf-8'))
enc = D['encontros']; N = len(enc)
esc = lambda t: t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
I = '                '
def op(v, txt): return f'{I}<option value="{v}">{esc(txt)}</option>\n'
g1 = f'            <optgroup label="📘 Português › {N} encontros (1–30): da ortografia à sintaxe">\n'
g1 += op('encontros.html', f'🗂️ Os {N} encontros: visão geral, folhas em Word (cara de prova), guia e provas')
g1 += ''.join(op(f'encontros.html?n={e["n"]}', f'📄 Encontro {e["n"]:02d} ({e["bloco"]}): {e["titulo"]}') for e in enc if e['n'] <= 30)
g1 += '            </optgroup>\n'
g2 = ''
if N > 30:
    g2 = f'            <optgroup label="✍️ Português › {N} encontros (31–{N}): leitura, conectivos, argumentação e redação">\n'
    g2 += op('encontros.html?parte=2', f'🗂️ Encontros 31 a {N}: visão geral (leitura, conectivos, argumentação e redação)')
    g2 += op('encontros.html?provas=1', f'📝 Provas dos encontros: {len(D.get("provas", []))} provas em Word (versões A e B, cartão-resposta) + gabarito')
    for e in enc:
        if e['n'] > 30:
            ic = '✍️' if 'Folha de redação' in e.get('producao', '') else '📄'
            g2 += op(f'encontros.html?n={e["n"]}', f'{ic} Encontro {e["n"]:02d} ({e["bloco"]}): {e["titulo"]}')
    g2 += '            </optgroup>\n'
p = os.path.join(RAIZ, 'index.html'); s = open(p, encoding='utf-8').read()
padrao = re.compile(r'            <optgroup label="[^"]*(?:30 encontros|\d+ encontros \()[^"]*">\n.*?            </optgroup>\n', re.S)
achados = list(padrao.finditer(s))
assert achados, 'grupo dos encontros não encontrado no index.html'
ini, fim = achados[0].start(), achados[-1].end()
s = s[:ini] + g1 + g2 + s[fim:]
# atalho no grupo de Redação
atalho = op('encontros.html?bloco=redacao', '✍️ Encontros de redação (61 a 89): estrutura do texto e 17 temas com folha de redação')
s = re.sub(r'                <option value="encontros\.html\?bloco=redacao">[^\n]*\n', '', s)
if N > 60:
    m = re.search(r'            <optgroup label="📘 Português › Redação">\n', s)
    assert m, 'grupo Português › Redação não encontrado'
    s = s[:m.end()] + atalho + s[m.end():]
open(p, 'w', encoding='utf-8').write(s)
print('menu:', N, 'encontros')
