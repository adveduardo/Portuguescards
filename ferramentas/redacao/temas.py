# Banco de temas da "Redação a várias mãos". Gera dados/redacao-maos.json.
import json, os
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
D = []
def T(tema, eixo, proposta, motivadores, repertorio, argumentos, agentes):
    D.append({'tema': tema, 'eixo': eixo, 'proposta': proposta, 'motivadores': motivadores, 'repertorio': repertorio, 'argumentos': argumentos, 'agentes': agentes})
T('Os desafios do uso consciente das redes sociais pelos jovens', 'Tecnologia',
  'Redija um texto dissertativo-argumentativo sobre os desafios do uso consciente das redes sociais pelos jovens no Brasil.',
  ['As redes sociais aproximam pessoas, mas também podem viciar e comparar vidas “perfeitas”.', 'Notícias falsas circulam rápido e muitas vezes são compartilhadas sem leitura.', 'O Marco Civil da Internet (Lei nº 12.965/2014) garante direitos e deveres no uso da internet.'],
  ['Marco Civil da Internet (2014)', 'Zygmunt Bauman: “modernidade líquida”, relações frágeis e rápidas', 'Série “Black Mirror”: tecnologia e comportamento', 'ECA: proteção integral da criança e do adolescente'],
  ['Algoritmos prendem a atenção e estimulam o uso excessivo.', 'Falta educação midiática para checar informações e lidar com a exposição.'],
  ['escola', 'famílias', 'Ministério da Educação', 'plataformas digitais', 'mídia'])
T('A valorização da leitura na formação dos estudantes', 'Educação',
  'Redija um texto dissertativo-argumentativo sobre os caminhos para valorizar a leitura na formação dos estudantes brasileiros.',
  ['Muitas escolas não têm biblioteca funcionando ou não têm bibliotecário.', 'A leitura amplia o vocabulário, a imaginação e a capacidade de argumentar.', 'Livros digitais e audiolivros são novas portas de entrada para a leitura.'],
  ['Paulo Freire: “a leitura do mundo precede a leitura da palavra”', 'Monteiro Lobato: “um país se faz com homens e livros”', 'Constituição Federal, art. 205: educação como direito de todos', 'Carolina Maria de Jesus, “Quarto de Despejo”'],
  ['Falta de acesso: poucas bibliotecas e livros caros.', 'Concorrência com telas e entretenimento rápido.'],
  ['escolas', 'Ministério da Educação', 'prefeituras', 'famílias', 'bibliotecas públicas'])
T('O combate ao desperdício de alimentos no Brasil', 'Meio ambiente e sociedade',
  'Redija um texto dissertativo-argumentativo sobre o combate ao desperdício de alimentos no Brasil.',
  ['Muitos alimentos se perdem no transporte, nas feiras e nas casas.', 'Ao mesmo tempo, ainda há famílias que passam fome.', 'Reaproveitar alimentos e doar excedentes são atitudes possíveis.'],
  ['Agenda 2030 da ONU: Objetivo 2 (Fome Zero) e Objetivo 12 (consumo responsável)', 'Josué de Castro, “Geografia da Fome”', 'Constituição, art. 6º: alimentação como direito social'],
  ['Falhas na logística, no armazenamento e no transporte.', 'Hábitos de consumo: comprar demais e descartar o que está “feio”.'],
  ['governo federal', 'supermercados', 'escolas', 'ONGs e bancos de alimentos', 'mídia'])
T('A inclusão das pessoas com deficiência na escola', 'Cidadania',
  'Redija um texto dissertativo-argumentativo sobre os desafios para a inclusão das pessoas com deficiência na escola brasileira.',
  ['Inclusão é mais do que matrícula: exige acessibilidade e apoio.', 'Rampas, intérpretes de Libras e materiais adaptados ainda faltam em muitas escolas.', 'A convivência com a diferença ensina respeito a todos.'],
  ['Lei Brasileira de Inclusão (Lei nº 13.146/2015)', 'Libras reconhecida pela Lei nº 10.436/2002', 'Constituição, art. 208: atendimento educacional especializado'],
  ['Falta de estrutura física e de profissionais de apoio.', 'Preconceito e desinformação (capacitismo).'],
  ['Ministério da Educação', 'secretarias de educação', 'escolas', 'famílias', 'mídia'])
T('A violência contra a mulher no Brasil', 'Direitos humanos',
  'Redija um texto dissertativo-argumentativo sobre os caminhos para combater a violência contra a mulher no Brasil.',
  ['A violência pode ser física, psicológica, moral, sexual e patrimonial.', 'Muitas vítimas não denunciam por medo ou dependência financeira.', 'O Ligue 180 é a Central de Atendimento à Mulher.'],
  ['Lei Maria da Penha (Lei nº 11.340/2006)', 'Lei do Feminicídio (Lei nº 13.104/2015)', 'Simone de Beauvoir, “O Segundo Sexo”'],
  ['Cultura machista que naturaliza a violência.', 'Rede de proteção insuficiente e medo de denunciar.'],
  ['Estado', 'escolas', 'delegacias da mulher', 'mídia', 'sociedade civil'])
T('O trabalho infantil ainda presente no Brasil', 'Direitos humanos',
  'Redija um texto dissertativo-argumentativo sobre a persistência do trabalho infantil no Brasil.',
  ['Criança deve estudar e brincar; trabalhar rouba a infância.', 'O trabalho infantil aparece no campo, nas ruas e até dentro de casa.', 'A pobreza é uma das principais causas.'],
  ['ECA (Lei nº 8.069/1990)', 'Constituição, art. 7º, XXXIII: proibição do trabalho antes dos 16 anos (salvo aprendiz, a partir dos 14)', 'Dia Mundial contra o Trabalho Infantil: 12 de junho'],
  ['Pobreza e desigualdade social.', 'Naturalização cultural (“trabalhar desde cedo ensina”).'],
  ['governo federal', 'conselhos tutelares', 'escolas', 'Ministério Público do Trabalho', 'empresas'])
T('A importância da vacinação para a saúde coletiva', 'Saúde',
  'Redija um texto dissertativo-argumentativo sobre a importância da vacinação e os desafios para manter altas as coberturas vacinais no Brasil.',
  ['O Brasil tem o Programa Nacional de Imunizações, criado em 1973.', 'Notícias falsas sobre vacinas afastam pessoas dos postos.', 'Vacinar protege quem toma e também quem está ao redor.'],
  ['Programa Nacional de Imunizações (1973)', 'SUS: saúde como direito de todos (Constituição, art. 196)', 'Oswaldo Cruz e a Revolta da Vacina (1904)'],
  ['Desinformação e movimentos antivacina.', 'Dificuldade de acesso e horários dos postos.'],
  ['Ministério da Saúde', 'escolas', 'mídia', 'agentes comunitários de saúde', 'famílias'])
T('Os desafios da mobilidade urbana nas cidades brasileiras', 'Cidades',
  'Redija um texto dissertativo-argumentativo sobre os desafios da mobilidade urbana nas cidades brasileiras.',
  ['Muitas pessoas passam horas no trânsito todos os dias.', 'Transporte público caro e lotado afasta usuários.', 'Ciclovias e calçadas seguras ainda são poucas.'],
  ['Política Nacional de Mobilidade Urbana (Lei nº 12.587/2012)', 'Constituição, art. 6º: transporte como direito social (desde 2015)', 'Jan Gehl, “Cidades para Pessoas”'],
  ['Prioridade histórica ao carro individual.', 'Falta de investimento em transporte coletivo de qualidade.'],
  ['prefeituras', 'governos estaduais', 'Ministério das Cidades', 'empresas de transporte', 'sociedade'])
T('O lixo e a reciclagem nas cidades', 'Meio ambiente',
  'Redija um texto dissertativo-argumentativo sobre os desafios da destinação correta do lixo e da reciclagem no Brasil.',
  ['Grande parte do lixo ainda vai para lixões a céu aberto.', 'Catadores de materiais recicláveis fazem um trabalho essencial e pouco valorizado.', 'Separar o lixo em casa é o primeiro passo.'],
  ['Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010)', 'Constituição, art. 225: meio ambiente equilibrado', 'Os 5 Rs: repensar, recusar, reduzir, reutilizar e reciclar'],
  ['Falta de coleta seletiva em muitos municípios.', 'Consumo exagerado e descarte sem cuidado.'],
  ['prefeituras', 'escolas', 'empresas', 'cooperativas de catadores', 'população'])
T('A saúde mental dos jovens', 'Saúde',
  'Redija um texto dissertativo-argumentativo sobre os desafios para cuidar da saúde mental dos jovens no Brasil.',
  ['Ansiedade e tristeza constante não são “frescura”: precisam de cuidado.', 'Pressão por resultados e comparação nas redes afetam a autoestima.', 'O CVV (188) oferece apoio emocional gratuito.'],
  ['Setembro Amarelo: campanha de prevenção ao suicídio', 'CAPS: Centros de Atenção Psicossocial do SUS', 'Byung-Chul Han, “Sociedade do Cansaço”'],
  ['Preconceito em falar do assunto e buscar ajuda.', 'Falta de psicólogos nas escolas e na rede pública.'],
  ['escolas', 'Ministério da Saúde', 'famílias', 'mídia', 'profissionais de psicologia'])
T('O racismo estrutural na sociedade brasileira', 'Direitos humanos',
  'Redija um texto dissertativo-argumentativo sobre os caminhos para combater o racismo no Brasil.',
  ['O Brasil foi o último país das Américas a abolir a escravidão (1888).', 'O racismo aparece em piadas, na abordagem policial e no mercado de trabalho.', 'Racismo é crime inafiançável e imprescritível.'],
  ['Constituição, art. 5º, XLII: racismo como crime inafiançável', 'Lei nº 10.639/2003: ensino de história e cultura afro-brasileira', 'Djamila Ribeiro, “Pequeno Manual Antirracista”', 'Silvio Almeida, “Racismo Estrutural”'],
  ['Herança histórica da escravidão sem reparação.', 'Representação negativa ou ausente na mídia e nos livros.'],
  ['escolas', 'Estado', 'mídia', 'empresas', 'movimentos sociais'])
T('O respeito às pessoas idosas', 'Cidadania',
  'Redija um texto dissertativo-argumentativo sobre os desafios para garantir o respeito e a dignidade das pessoas idosas no Brasil.',
  ['A população brasileira está envelhecendo.', 'Muitos idosos sofrem abandono, golpes financeiros e solidão.', 'Idosos têm muito a ensinar com sua experiência.'],
  ['Estatuto da Pessoa Idosa (Lei nº 10.741/2003)', 'Constituição, art. 230: dever de amparar as pessoas idosas', 'Disque 100: denúncias de violações de direitos humanos'],
  ['Desvalorização da velhice numa sociedade que cultua a juventude.', 'Falta de políticas de cuidado e de acessibilidade.'],
  ['governo', 'famílias', 'escolas', 'mídia', 'serviços de saúde'])
T('O bullying nas escolas', 'Educação',
  'Redija um texto dissertativo-argumentativo sobre os caminhos para enfrentar o bullying nas escolas brasileiras.',
  ['Bullying é violência repetida, física ou psicológica, contra alguém.', 'O cyberbullying continua fora da escola, pelo celular.', 'Quem assiste e ri também participa.'],
  ['Lei nº 13.185/2015: Programa de Combate à Intimidação Sistemática', 'Lei nº 14.811/2024: bullying e cyberbullying como crime', 'ECA: direito ao respeito e à dignidade'],
  ['Falta de diálogo e de projetos de convivência na escola.', 'Anonimato e rapidez das redes sociais.'],
  ['escolas', 'famílias', 'Ministério da Educação', 'grêmios estudantis', 'plataformas digitais'])
T('A gravidez na adolescência', 'Saúde e sociedade',
  'Redija um texto dissertativo-argumentativo sobre os desafios da gravidez na adolescência no Brasil.',
  ['A gravidez precoce pode interromper os estudos.', 'Informação e diálogo ajudam na prevenção.', 'Muitas jovens enfrentam a maternidade sem apoio.'],
  ['ECA: direito à saúde e à educação', 'Semana Nacional de Prevenção da Gravidez na Adolescência (Lei nº 13.798/2019)', 'SUS: planejamento familiar gratuito'],
  ['Falta de educação em saúde e de diálogo em casa.', 'Desigualdade social e falta de perspectivas.'],
  ['escolas', 'Ministério da Saúde', 'famílias', 'unidades básicas de saúde', 'mídia'])
T('A preservação da Amazônia', 'Meio ambiente',
  'Redija um texto dissertativo-argumentativo sobre os desafios para preservar a Amazônia.',
  ['A floresta regula as chuvas de grande parte do país (“rios voadores”).', 'O desmatamento e as queimadas ameaçam a biodiversidade.', 'Povos indígenas e ribeirinhos são guardiões da floresta.'],
  ['Constituição, art. 225: meio ambiente para as presentes e futuras gerações', 'Chico Mendes, defensor dos seringueiros e da floresta', 'Acordo de Paris (2015) sobre o clima'],
  ['Exploração ilegal de madeira, garimpo e expansão agropecuária.', 'Fiscalização insuficiente.'],
  ['governo federal', 'Ibama', 'empresas', 'consumidores', 'comunidades tradicionais'])
T('O acesso à cultura nas periferias', 'Cultura',
  'Redija um texto dissertativo-argumentativo sobre os desafios do acesso à cultura nas periferias brasileiras.',
  ['Cinemas, teatros e museus estão concentrados nos centros das cidades.', 'As periferias produzem cultura: rap, funk, slam, grafite.', 'Cultura é direito garantido pela Constituição.'],
  ['Constituição, art. 215: o Estado garantirá a todos o exercício dos direitos culturais', 'Movimento hip-hop e batalhas de rima', 'Lei Rouanet e editais de cultura'],
  ['Desigualdade na distribuição de espaços culturais.', 'Preconceito contra a cultura produzida nas periferias.'],
  ['prefeituras', 'Ministério da Cultura', 'escolas', 'coletivos culturais', 'empresas'])
T('Os golpes digitais e a segurança na internet', 'Tecnologia',
  'Redija um texto dissertativo-argumentativo sobre os desafios para proteger os brasileiros dos golpes digitais.',
  ['Golpes por mensagem, falso Pix e links falsos são cada vez mais comuns.', 'Idosos e pessoas com pouca familiaridade digital são alvos frequentes.', 'Dados pessoais valem dinheiro para criminosos.'],
  ['Lei Geral de Proteção de Dados (Lei nº 13.709/2018)', 'Marco Civil da Internet (2014)', 'Código de Defesa do Consumidor (1990)'],
  ['Falta de educação digital da população.', 'Pouca punição e investigação difícil.'],
  ['bancos', 'escolas', 'governo', 'mídia', 'famílias'])
T('O esporte como ferramenta de transformação social', 'Sociedade',
  'Redija um texto dissertativo-argumentativo sobre o papel do esporte na transformação social.',
  ['Projetos esportivos tiram jovens da rua e ensinam disciplina.', 'Muitas cidades não têm quadras ou praças esportivas.', 'Atletas brasileiros surgiram de projetos sociais.'],
  ['Constituição, art. 217: dever do Estado de fomentar o esporte', 'Rebeca Andrade e Rayssa Leal: atletas que inspiram', 'Lei de Incentivo ao Esporte (Lei nº 11.438/2006)'],
  ['Falta de espaços públicos e de professores.', 'Desvalorização do esporte além do futebol.'],
  ['prefeituras', 'escolas', 'Ministério do Esporte', 'empresas', 'ONGs'])
T('A importância do voto consciente', 'Cidadania',
  'Redija um texto dissertativo-argumentativo sobre a importância do voto consciente para a democracia brasileira.',
  ['O voto é obrigatório dos 18 aos 70 anos e facultativo a partir dos 16.', 'Trocar voto por favores enfraquece a democracia.', 'Pesquisar o histórico dos candidatos é dever do eleitor.'],
  ['Constituição, art. 14: soberania popular pelo voto direto e secreto', 'Lei da Ficha Limpa (LC nº 135/2010)', 'Aristóteles: o ser humano como “animal político”'],
  ['Desinteresse e descrença na política.', 'Desinformação e compra de votos.'],
  ['escolas', 'Tribunal Superior Eleitoral', 'mídia', 'partidos', 'famílias'])
T('A falta de água e o uso consciente', 'Meio ambiente',
  'Redija um texto dissertativo-argumentativo sobre os desafios do uso consciente da água no Brasil.',
  ['O Brasil tem muita água doce, mas mal distribuída.', 'Muitas casas ainda não têm saneamento básico.', 'Vazamentos e desperdício agravam a falta de água nas secas.'],
  ['Marco Legal do Saneamento (Lei nº 14.026/2020)', 'Agenda 2030 da ONU: Objetivo 6 (água potável e saneamento)', 'Lei das Águas (Lei nº 9.433/1997)'],
  ['Desperdício doméstico, agrícola e industrial.', 'Falta de saneamento e de cuidado com os rios.'],
  ['governos', 'companhias de saneamento', 'escolas', 'agricultores', 'população'])
NARR = [
 {'titulo': 'O mapa encontrado no livro da biblioteca', 'inicio': 'Ao devolver um livro velho, um aluno encontra um mapa desenhado à mão…', 'personagens': 'um aluno curioso, a bibliotecária, um gato da escola', 'lugar': 'a escola e o bairro'},
 {'titulo': 'O dia em que a internet acabou', 'inicio': 'Numa segunda-feira, todos os celulares da cidade ficam sem internet por uma semana…', 'personagens': 'uma família, um vizinho idoso, uma youtuber', 'lugar': 'uma cidade pequena'},
 {'titulo': 'A porta que não existia ontem', 'inicio': 'No corredor da escola aparece uma porta azul que ninguém tinha visto antes…', 'personagens': 'três amigos, o porteiro, uma voz misteriosa', 'lugar': 'a escola'},
 {'titulo': 'O robô que queria ser gente', 'inicio': 'Um robô de limpeza começa a escrever poemas nas paredes…', 'personagens': 'o robô, uma cientista, uma criança', 'lugar': 'um laboratório'},
 {'titulo': 'A viagem no ônibus errado', 'inicio': 'Distraída com a música, uma menina pega o ônibus errado e desce num lugar desconhecido…', 'personagens': 'a menina, o motorista, uma vendedora de pastel', 'lugar': 'uma estrada no interior'},
 {'titulo': 'O cachorro que sabia demais', 'inicio': 'O cachorro da rua começa a latir sempre que alguém mente…', 'personagens': 'o cachorro, a dona da padaria, um menino', 'lugar': 'uma rua movimentada'},
 {'titulo': 'A carta do futuro', 'inicio': 'Chega pelo correio uma carta escrita por você mesmo, daqui a 20 anos…', 'personagens': 'você, sua família, um carteiro', 'lugar': 'sua casa'},
 {'titulo': 'O campeonato da última chance', 'inicio': 'O time da escola precisa vencer o último jogo para não acabar…', 'personagens': 'a capitã, o técnico, um rival', 'lugar': 'a quadra da escola'},
 {'titulo': 'O segredo da avó', 'inicio': 'Arrumando o sótão, os netos acham uma caixa trancada com o nome da avó…', 'personagens': 'dois netos, a avó, um antigo amigo dela', 'lugar': 'uma casa antiga'},
 {'titulo': 'A ilha que aparecia de madrugada', 'inicio': 'Pescadores contam que uma ilha surge no mar só às três da manhã…', 'personagens': 'uma pescadora, seu filho, um turista', 'lugar': 'uma vila de pescadores'},
 {'titulo': 'O aluno novo que não falava', 'inicio': 'Chega à turma um aluno que se comunica só por desenhos…', 'personagens': 'o aluno novo, a professora, uma colega', 'lugar': 'a sala de aula'},
 {'titulo': 'A tempestade na festa junina', 'inicio': 'Tudo pronto para a festa junina quando o céu fica preto…', 'personagens': 'a comissão da festa, o sanfoneiro, uma criança perdida', 'lugar': 'a quadra enfeitada'},
 {'titulo': 'O celular que trocava de dono', 'inicio': 'Um celular achado na praça mostra mensagens de pessoas diferentes a cada hora…', 'personagens': 'dois amigos, uma policial, o verdadeiro dono', 'lugar': 'a praça da cidade'},
 {'titulo': 'A horta que cresceu em uma noite', 'inicio': 'A turma planta sementes na escola e, no dia seguinte, a horta está gigante…', 'personagens': 'a turma, o diretor, um jardineiro', 'lugar': 'o pátio da escola'},
 {'titulo': 'O último dia de férias', 'inicio': 'No último dia das férias, um grupo de primos decide fazer algo inesquecível…', 'personagens': 'quatro primos, um tio atrapalhado, um vizinho bravo', 'lugar': 'um sítio'},
 {'titulo': 'A estrela que caiu no quintal', 'inicio': 'Uma luz cai no quintal durante a noite e começa a falar…', 'personagens': 'uma criança, a estrela, o irmão mais velho', 'lugar': 'um quintal no interior'},
]
SURPRESAS = ['um guarda-chuva amarelo', 'uma chave enferrujada', 'um bolo de chocolate', 'um apagão', 'uma galinha fujona', 'um bilhete anônimo', 'uma música antiga', 'um pneu furado', 'um celular sem bateria',
  'um arco-íris', 'uma foto rasgada', 'um espirro na hora errada', 'uma bicicleta vermelha', 'uma tempestade', 'um diário secreto', 'um par de óculos perdido', 'uma pipa presa na árvore', 'um mapa',
  'um sorvete derretendo', 'um professor fantasiado', 'uma caixa de papelão', 'um papagaio que fala', 'uma lanterna', 'um relógio parado', 'um cheiro de pipoca', 'um pé de meia furado', 'um convite para uma festa', 'uma ponte quebrada']
d = {'titulo': 'Redação a várias mãos', 'dissertacao': D, 'narrativa': NARR, 'surpresas': SURPRESAS}
json.dump(d, open(os.path.join(RAIZ, 'dados', 'redacao-maos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(D), 'temas de dissertação;', len(NARR), 'histórias;', len(SURPRESAS), 'surpresas')
