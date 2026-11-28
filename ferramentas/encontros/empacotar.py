# Junta as folhas e as provas em .zip para baixar de uma vez.
import glob, os, zipfile
PASTA = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'encontros'))
def zipar(nome, arquivos):
    with zipfile.ZipFile(os.path.join(PASTA, nome), 'w', zipfile.ZIP_DEFLATED) as z:
        for f in arquivos: z.write(f, os.path.basename(f))
    print(nome, len(arquivos), 'arquivos')
folhas = sorted(glob.glob(os.path.join(PASTA, 'encontro-*.docx')))
zipar('todas-as-folhas.zip', folhas + [os.path.join(PASTA, 'folha-de-redacao.docx'), os.path.join(PASTA, 'guia-do-professor.docx')])
provas = sorted(glob.glob(os.path.join(PASTA, 'prova-*.docx')))
if provas: zipar('todas-as-provas.zip', provas + [os.path.join(PASTA, 'gabarito-das-provas.docx'), os.path.join(PASTA, 'folha-de-redacao.docx')])
