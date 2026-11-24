# Banco de temas da "Redação a várias mãos". Gera dados/redacao-maos.json.
import json, os
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
D = []
def T(tema, eixo, proposta, motivadores, repertorio, argumentos, agentes, nivel='enem'):
    D.append({'nivel': nivel, 'tema': tema, 'eixo': eixo, 'proposta': proposta, 'motivadores': motivadores, 'repertorio': repertorio, 'argumentos': argumentos, 'agentes': agentes})
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

# ---------------- 6º ao 9º ano: temas lúdicos ----------------
F = 'fund'
T('Celular na sala de aula: vilão ou aliado?', 'Escola', 'Escreva um texto dando a opinião do seu grupo: o celular deve ou não ser usado na sala de aula?',
  ['📱 Imagine: a professora pede uma pesquisa e metade da turma está no joguinho…', '🤔 Curiosidade: o celular tem calculadora, dicionário, mapa e câmera, tudo num bolso só.', '💬 Uma aluna disse: “Sem celular eu presto mais atenção, mas às vezes ele me ajuda a estudar.”'],
  ['Lei nº 15.100/2025: restringe o uso de celulares nas escolas', 'ECA: direito à educação', 'Livro “O menino do dedo verde” (o poder de usar bem um dom)'],
  ['Distrai e atrapalha a concentração.', 'Pode ser ótimo para pesquisar quando o professor orienta.'], ['professores', 'direção da escola', 'alunos', 'famílias'], F)
T('O recreio deveria ser maior?', 'Escola', 'Escreva um texto defendendo a opinião do seu grupo: o recreio deveria durar mais?',
  ['⏰ 15 minutos para lanchar, brincar, conversar e ir ao banheiro… dá tempo?', '⚽ Brincar ajuda o cérebro a descansar e a aprender melhor depois.', '📚 Mas um recreio maior pode significar sair mais tarde da escola.'],
  ['ECA: direito ao lazer e a brincar', 'Estudos sobre pausas e aprendizagem', 'Filme “Divertida Mente” (as emoções precisam de equilíbrio)'],
  ['Mais tempo de brincadeira melhora a convivência e o humor.', 'O tempo de aula também é importante para aprender.'], ['direção da escola', 'grêmio estudantil', 'professores', 'secretaria de educação'], F)
T('Videogame: faz bem ou faz mal?', 'Lazer e tecnologia', 'Escreva um texto com a opinião do grupo: jogar videogame faz bem ou faz mal para os jovens?',
  ['🎮 Tem jogo que ensina estratégia, inglês e trabalho em equipe.', '😵 Ficar horas jogando pode tirar o sono e o tempo de estudo.', '🏆 Os campeonatos de e-sports já lotam estádios.'],
  ['ECA: direito ao lazer', 'Jogos educativos usados em escolas', 'Organização Mundial da Saúde: alerta sobre o uso excessivo de jogos'],
  ['Desenvolve raciocínio, reflexo e trabalho em equipe.', 'O exagero prejudica sono, estudos e convivência.'], ['famílias', 'escola', 'criadores de jogos', 'os próprios jogadores'], F)
T('Animais de estimação: amor e responsabilidade', 'Meio ambiente e cidadania', 'Escreva um texto sobre a responsabilidade de ter um animal de estimação e o problema do abandono.',
  ['🐶 Cachorro e gato não são brinquedos: comem, adoecem e vivem muitos anos.', '😿 Muitos animais são abandonados nas férias ou quando crescem.', '🏠 Adotar um animal de abrigo salva uma vida.'],
  ['Lei nº 14.064/2020: aumenta a pena para maus-tratos a cães e gatos', 'Livro “Marley & Eu”', 'Constituição, art. 225: proteção da fauna'],
  ['Abandono por falta de planejamento.', 'Falta de castração aumenta os animais de rua.'], ['prefeituras', 'ONGs de proteção animal', 'famílias', 'escolas', 'veterinários'], F)
T('Os super-heróis são bons exemplos?', 'Cultura', 'Escreva um texto com a opinião do grupo: os super-heróis dos filmes e quadrinhos são bons exemplos para os jovens?',
  ['🦸 Eles salvam pessoas, mas às vezes resolvem tudo na base da briga.', '🦇 Muitos heróis enfrentam medos e perdas: são humanos por dentro.', '🌍 Heróis de verdade existem: bombeiros, médicos, professores…'],
  ['Frase do Homem-Aranha: “Com grandes poderes vêm grandes responsabilidades”', 'Pantera Negra e a valorização da cultura africana', 'Maurício de Sousa e a Turma da Mônica'],
  ['Ensinam coragem, amizade e responsabilidade.', 'A violência como solução pode ser um mau exemplo.'], ['famílias', 'escola', 'estúdios de cinema', 'os próprios jovens'], F)
T('Uniforme escolar: sim ou não?', 'Escola', 'Escreva um texto defendendo a opinião do grupo sobre o uso de uniforme escolar.',
  ['👕 Com uniforme ninguém compara roupa de marca.', '🎨 Sem uniforme, cada um mostra o seu estilo.', '🛡️ O uniforme ajuda a identificar os alunos na rua e na escola.'],
  ['ECA: direito à igualdade e ao respeito', 'Programas de uniforme gratuito nas redes públicas'],
  ['Diminui as comparações e o bullying por causa de roupas.', 'Tira a liberdade de expressar a identidade.'], ['direção da escola', 'secretaria de educação', 'famílias', 'grêmio estudantil'], F)
T('Lanche saudável na cantina', 'Saúde', 'Escreva um texto sobre a importância da alimentação saudável na escola.',
  ['🍔 Salgadinho e refrigerante são gostosos… mas e a energia para estudar?', '🍎 Frutas e sucos naturais podem ser divertidos se forem bem preparados.', '🥗 A merenda escolar é planejada por nutricionistas.'],
  ['Programa Nacional de Alimentação Escolar (PNAE)', 'Guia Alimentar para a População Brasileira', 'ECA: direito à saúde'],
  ['Alimentos ultraprocessados fazem mal à saúde.', 'Comer bem melhora a atenção e a disposição.'], ['cantinas', 'nutricionistas', 'escola', 'famílias'], F)
T('Influenciadores mirins: brincadeira ou trabalho?', 'Tecnologia', 'Escreva um texto sobre as crianças que viram influenciadoras na internet.',
  ['🎥 Gravar vídeos parece divertido, mas pode virar obrigação.', '💰 Alguns canais infantis ganham muito dinheiro com propaganda.', '👀 Milhares de desconhecidos assistem à vida da criança.'],
  ['ECA: proteção da imagem e proibição do trabalho infantil', 'Marco Civil da Internet', 'Série “Black Mirror”'],
  ['Exposição excessiva e perda de privacidade.', 'Pressão por curtidas e por produzir vídeos.'], ['famílias', 'plataformas de vídeo', 'Conselho Tutelar', 'escola'], F)
T('Zoológicos devem continuar existindo?', 'Meio ambiente', 'Escreva um texto com a opinião do grupo: os zoológicos devem continuar existindo?',
  ['🦁 Ver um leão de perto encanta crianças e adultos.', '🔒 Mas o animal vive longe do seu ambiente natural.', '🧪 Alguns zoológicos salvam espécies ameaçadas de extinção.'],
  ['Constituição, art. 225: proteção da fauna', 'Livro “A Vida de Pi”', 'Projetos de conservação e santuários de animais'],
  ['Ajudam na conservação e na educação ambiental.', 'O cativeiro pode causar sofrimento aos animais.'], ['governo', 'zoológicos', 'cientistas', 'visitantes'], F)
T('Lição de casa: ajuda ou atrapalha?', 'Escola', 'Escreva um texto com a opinião do grupo sobre a lição de casa.',
  ['📓 Treinar em casa ajuda a fixar a matéria.', '😩 Mas lição demais rouba o tempo de brincar e descansar.', '👪 Nem todo aluno tem ajuda ou um lugar tranquilo para estudar em casa.'],
  ['ECA: direito à educação, ao lazer e à convivência familiar', 'Paulo Freire: aprender exige autonomia'],
  ['Ajuda a criar o hábito de estudar sozinho.', 'O excesso causa cansaço e desigualdade entre os alunos.'], ['professores', 'escola', 'famílias', 'alunos'], F)
T('O lixo da escola tem solução?', 'Meio ambiente', 'Escreva um texto propondo soluções para o lixo produzido na escola.',
  ['🗑️ Copinhos descartáveis, papel de bala, restos de lanche… para onde vai tudo isso?', '♻️ Uma escola pode fazer coleta seletiva e composteira.', '🌱 O resto de comida pode virar adubo para a horta.'],
  ['Política Nacional de Resíduos Sólidos (2010)', 'Os 5 Rs da sustentabilidade', 'Filme “Wall-E”'],
  ['Falta de lixeiras de coleta seletiva e de informação.', 'Desperdício de material e comida.'], ['direção da escola', 'alunos', 'prefeitura', 'merendeiras'], F)
T('Robôs e inteligência artificial na escola', 'Tecnologia', 'Escreva um texto com a opinião do grupo: a inteligência artificial deve ser usada pelos alunos?',
  ['🤖 Tem programa que escreve redação em segundos.', '🧠 Mas quem aprende: o aluno ou o robô?', '💡 A inteligência artificial pode explicar a matéria de jeitos diferentes.'],
  ['Filme “Operação Big Hero”', 'Isaac Asimov e as leis da robótica', 'LGPD: proteção dos dados pessoais'],
  ['Pode ajudar a tirar dúvidas e a estudar.', 'Copiar respostas prontas impede a aprendizagem.'], ['professores', 'escola', 'Ministério da Educação', 'alunos'], F)
T('Amizade na era das redes', 'Convivência', 'Escreva um texto sobre como as redes sociais mudam as amizades.',
  ['💬 Dá para conversar com um amigo que mora longe todos os dias.', '❤️ Mas mil seguidores são mil amigos de verdade?', '🙈 Brigas no grupo da turma às vezes começam por mal-entendidos.'],
  ['Zygmunt Bauman: relações líquidas', 'Livro “O Pequeno Príncipe”: “Tu te tornas eternamente responsável por aquilo que cativas”'],
  ['Aproximam pessoas distantes.', 'Podem deixar as relações superficiais.'], ['famílias', 'escola', 'os próprios jovens', 'plataformas'], F)
T('Esporte na escola: para todos ou só para os bons?', 'Esporte', 'Escreva um texto sobre a participação de todos os alunos nas aulas de Educação Física e nos jogos.',
  ['⚽ Sempre os mesmos são escolhidos primeiro para o time…', '🏐 Existem esportes em que ninguém precisa ser “o melhor”.', '🤸 Educação Física é para a saúde de todos.'],
  ['Constituição, art. 217: esporte como direito', 'Rebeca Andrade: de projeto social a campeã olímpica'],
  ['A exclusão desanima quem tem menos habilidade.', 'O esporte ensina respeito e trabalho em equipe.'], ['professores de Educação Física', 'escola', 'alunos', 'prefeitura'], F)

# ---------------- EJA ----------------
E = 'eja'
T('Voltar a estudar depois de adulto', 'Educação', 'Redija um texto sobre os desafios e as conquistas de quem volta a estudar na vida adulta.',
  ['Muitos adultos pararam de estudar para trabalhar ou cuidar da família.', 'Estudar à noite depois de um dia de trabalho exige coragem.', 'Ler, escrever e calcular melhor abre portas no emprego e na vida.'],
  ['Constituição, art. 208, I: educação gratuita também para quem não estudou na idade própria', 'Paulo Freire: educação como prática da liberdade', 'Carolina Maria de Jesus: escritora que estudou pouco e escreveu muito'],
  ['Cansaço, falta de tempo e de transporte.', 'Estudar traz autoestima, emprego melhor e cidadania.'], ['governo', 'escolas da EJA', 'empresas', 'famílias'], E)
T('O trabalho informal e os direitos do trabalhador', 'Trabalho', 'Redija um texto sobre o trabalho informal e a falta de direitos de muitos trabalhadores brasileiros.',
  ['Sem carteira assinada não há férias, 13º salário nem FGTS.', 'Muitos trabalhadores de aplicativo trabalham mais de 10 horas por dia.', 'O MEI permite contribuir para o INSS pagando pouco por mês.'],
  ['CLT (1943): direitos trabalhistas', 'Constituição, art. 7º: direitos dos trabalhadores', 'Microempreendedor Individual (MEI)'],
  ['Falta de emprego formal empurra para a informalidade.', 'Desinformação sobre direitos e sobre a contribuição ao INSS.'], ['governo', 'empresas', 'sindicatos', 'trabalhadores'], E)
T('O preço dos alimentos e o orçamento da família', 'Economia', 'Redija um texto sobre o peso do preço dos alimentos no orçamento das famílias.',
  ['O carrinho do mercado fica mais vazio com o mesmo dinheiro.', 'Comparar preços e fazer lista de compras ajuda a economizar.', 'Feiras e hortas comunitárias podem baratear a comida.'],
  ['Constituição, art. 6º: alimentação como direito social', 'Código de Defesa do Consumidor (1990)', 'Josué de Castro, “Geografia da Fome”'],
  ['Inflação dos alimentos e salários baixos.', 'Falta de planejamento financeiro e de informação.'], ['governo', 'supermercados', 'famílias', 'escolas'], E)
T('A importância do SUS', 'Saúde', 'Redija um texto sobre a importância do Sistema Único de Saúde para os brasileiros.',
  ['O SUS atende de graça, da vacina ao transplante.', 'Filas e falta de médicos ainda são problemas.', 'Agentes comunitários de saúde visitam as famílias nos bairros.'],
  ['Constituição, art. 196: saúde é direito de todos e dever do Estado', 'Lei nº 8.080/1990 (Lei Orgânica da Saúde)', 'Programa Nacional de Imunizações'],
  ['Falta de investimento e de profissionais.', 'O SUS salva vidas e reduz desigualdades.'], ['Ministério da Saúde', 'prefeituras', 'população', 'conselhos de saúde'], E)
T('Golpes pelo celular contra adultos e idosos', 'Tecnologia', 'Redija um texto sobre como proteger a população dos golpes pelo celular.',
  ['“Oi, mãe, troquei de número” é um golpe comum.', 'Falsos boletos e falsos Pix levam o dinheiro de muitas famílias.', 'Desconfiar e confirmar por ligação evita prejuízos.'],
  ['Lei Geral de Proteção de Dados (2018)', 'Estatuto da Pessoa Idosa (2003)', 'Código de Defesa do Consumidor'],
  ['Pouca familiaridade com a tecnologia.', 'Criminosos usam pressa e emoção para enganar.'], ['bancos', 'escolas', 'famílias', 'mídia'], E)
T('Transporte público para quem trabalha', 'Cidades', 'Redija um texto sobre os desafios do transporte público para os trabalhadores.',
  ['Muita gente acorda às 4 da manhã para chegar no trabalho às 7.', 'Ônibus lotado e atrasado cansa antes do dia começar.', 'A tarifa pesa no salário.'],
  ['Constituição, art. 6º: transporte como direito social', 'Política Nacional de Mobilidade Urbana (2012)', 'Vale-transporte (Lei nº 7.418/1985)'],
  ['Pouco investimento em transporte coletivo.', 'Cidades que espalham a moradia longe do emprego.'], ['prefeituras', 'empresas de ônibus', 'governo', 'população'], E)
T('Mulheres, trabalho e a dupla jornada', 'Sociedade', 'Redija um texto sobre a dupla jornada das mulheres que trabalham fora e cuidam da casa.',
  ['Muitas mulheres trabalham o dia inteiro e ainda cuidam da casa e dos filhos.', 'Faltam vagas em creches perto de casa.', 'Dividir as tarefas em família é questão de justiça.'],
  ['Constituição, art. 5º, I: homens e mulheres são iguais em direitos', 'Lei nº 14.611/2023: igualdade salarial', 'Simone de Beauvoir, “O Segundo Sexo”'],
  ['Divisão desigual das tarefas domésticas.', 'Falta de creches e de apoio do Estado.'], ['famílias', 'governo', 'empresas', 'escolas'], E)
T('Ler e escrever para exercer a cidadania', 'Cidadania', 'Redija um texto sobre a importância da leitura e da escrita para exercer a cidadania.',
  ['Ler um contrato, uma receita médica ou uma conta de luz exige leitura atenta.', 'Quem lê bem se defende melhor de golpes e de notícias falsas.', 'Escrever permite reclamar, pedir e participar.'],
  ['Paulo Freire: “ler o mundo”', 'Constituição, art. 205: educação para o exercício da cidadania', 'Código de Defesa do Consumidor'],
  ['O analfabetismo ainda atinge muitos adultos.', 'A leitura dá autonomia e dignidade.'], ['governo', 'escolas da EJA', 'bibliotecas', 'empresas'], E)
T('A violência no bairro e a segurança das famílias', 'Cidades', 'Redija um texto sobre os caminhos para tornar os bairros mais seguros.',
  ['Ruas escuras e praças abandonadas assustam os moradores.', 'Projetos de esporte e cultura afastam jovens do crime.', 'Associações de moradores podem cobrar melhorias.'],
  ['Constituição, art. 144: segurança pública, dever do Estado e responsabilidade de todos', 'ECA: proteção de crianças e adolescentes'],
  ['Falta de iluminação, de lazer e de policiamento.', 'Desigualdade social e falta de oportunidades.'], ['prefeituras', 'polícia', 'associações de moradores', 'escolas'], E)
T('A aposentadoria e o futuro do trabalhador', 'Trabalho', 'Redija um texto sobre a importância de contribuir para a previdência e planejar a aposentadoria.',
  ['Quem trabalha sem contribuir pode ficar sem aposentadoria.', 'A população está vivendo mais.', 'O INSS também protege em caso de doença ou acidente.'],
  ['Constituição, art. 201: previdência social', 'Microempreendedor Individual (MEI)', 'Estatuto da Pessoa Idosa'],
  ['Informalidade e falta de informação.', 'Planejar o futuro traz segurança para a família.'], ['governo', 'INSS', 'empresas', 'trabalhadores'], E)

NARR = [
 {'nivel': 'fund', 'titulo': 'O mapa encontrado no livro da biblioteca', 'inicio': 'Ao devolver um livro velho, um aluno encontra um mapa desenhado à mão…', 'personagens': 'um aluno curioso, a bibliotecária, um gato da escola', 'lugar': 'a escola e o bairro'},
 {'nivel': 'fund', 'titulo': 'O dia em que a internet acabou', 'inicio': 'Numa segunda-feira, todos os celulares da cidade ficam sem internet por uma semana…', 'personagens': 'uma família, um vizinho idoso, uma youtuber', 'lugar': 'uma cidade pequena'},
 {'nivel': 'fund', 'titulo': 'A porta que não existia ontem', 'inicio': 'No corredor da escola aparece uma porta azul que ninguém tinha visto antes…', 'personagens': 'três amigos, o porteiro, uma voz misteriosa', 'lugar': 'a escola'},
 {'nivel': 'fund', 'titulo': 'O robô que queria ser gente', 'inicio': 'Um robô de limpeza começa a escrever poemas nas paredes…', 'personagens': 'o robô, uma cientista, uma criança', 'lugar': 'um laboratório'},
 {'nivel': 'fund', 'titulo': 'A viagem no ônibus errado', 'inicio': 'Distraída com a música, uma menina pega o ônibus errado e desce num lugar desconhecido…', 'personagens': 'a menina, o motorista, uma vendedora de pastel', 'lugar': 'uma estrada no interior'},
 {'nivel': 'fund', 'titulo': 'O cachorro que sabia demais', 'inicio': 'O cachorro da rua começa a latir sempre que alguém mente…', 'personagens': 'o cachorro, a dona da padaria, um menino', 'lugar': 'uma rua movimentada'},
 {'nivel': 'fund', 'titulo': 'A carta do futuro', 'inicio': 'Chega pelo correio uma carta escrita por você mesmo, daqui a 20 anos…', 'personagens': 'você, sua família, um carteiro', 'lugar': 'sua casa'},
 {'nivel': 'fund', 'titulo': 'O campeonato da última chance', 'inicio': 'O time da escola precisa vencer o último jogo para não acabar…', 'personagens': 'a capitã, o técnico, um rival', 'lugar': 'a quadra da escola'},
 {'nivel': 'fund', 'titulo': 'O segredo da avó', 'inicio': 'Arrumando o sótão, os netos acham uma caixa trancada com o nome da avó…', 'personagens': 'dois netos, a avó, um antigo amigo dela', 'lugar': 'uma casa antiga'},
 {'nivel': 'fund', 'titulo': 'A ilha que aparecia de madrugada', 'inicio': 'Pescadores contam que uma ilha surge no mar só às três da manhã…', 'personagens': 'uma pescadora, seu filho, um turista', 'lugar': 'uma vila de pescadores'},
 {'nivel': 'fund', 'titulo': 'O aluno novo que não falava', 'inicio': 'Chega à turma um aluno que se comunica só por desenhos…', 'personagens': 'o aluno novo, a professora, uma colega', 'lugar': 'a sala de aula'},
 {'nivel': 'fund', 'titulo': 'A tempestade na festa junina', 'inicio': 'Tudo pronto para a festa junina quando o céu fica preto…', 'personagens': 'a comissão da festa, o sanfoneiro, uma criança perdida', 'lugar': 'a quadra enfeitada'},
 {'nivel': 'fund', 'titulo': 'O celular que trocava de dono', 'inicio': 'Um celular achado na praça mostra mensagens de pessoas diferentes a cada hora…', 'personagens': 'dois amigos, uma policial, o verdadeiro dono', 'lugar': 'a praça da cidade'},
 {'nivel': 'fund', 'titulo': 'A horta que cresceu em uma noite', 'inicio': 'A turma planta sementes na escola e, no dia seguinte, a horta está gigante…', 'personagens': 'a turma, o diretor, um jardineiro', 'lugar': 'o pátio da escola'},
 {'nivel': 'fund', 'titulo': 'O último dia de férias', 'inicio': 'No último dia das férias, um grupo de primos decide fazer algo inesquecível…', 'personagens': 'quatro primos, um tio atrapalhado, um vizinho bravo', 'lugar': 'um sítio'},
 {'nivel': 'fund', 'titulo': 'A estrela que caiu no quintal', 'inicio': 'Uma luz cai no quintal durante a noite e começa a falar…', 'personagens': 'uma criança, a estrela, o irmão mais velho', 'lugar': 'um quintal no interior'},
]

NARR += [
 {'nivel': 'eja', 'titulo': 'O primeiro dia de aula aos 50 anos', 'inicio': 'Depois de 35 anos longe da escola, alguém entra na sala com o caderno novo e as mãos tremendo…', 'personagens': 'a estudante, a professora, um colega mais jovem', 'lugar': 'uma escola à noite'},
 {'nivel': 'eja', 'titulo': 'A marmita trocada', 'inicio': 'No refeitório da fábrica, duas marmitas iguais são trocadas por engano…', 'personagens': 'dois operários, a cozinheira, o chefe', 'lugar': 'uma fábrica'},
 {'nivel': 'eja', 'titulo': 'O ônibus que quebrou na chuva', 'inicio': 'Às 6 da manhã, o ônibus lotado para no meio da estrada debaixo de um temporal…', 'personagens': 'o motorista, uma enfermeira, um vendedor ambulante', 'lugar': 'uma estrada da periferia'},
 {'nivel': 'eja', 'titulo': 'A carta que nunca foi enviada', 'inicio': 'Arrumando uma gaveta, alguém encontra uma carta escrita há 30 anos e nunca enviada…', 'personagens': 'quem escreveu, o destinatário, um neto curioso', 'lugar': 'uma casa simples'},
 {'nivel': 'eja', 'titulo': 'A receita da mãe', 'inicio': 'A receita de bolo da família se perdeu e a festa é amanhã…', 'personagens': 'três irmãos, uma vizinha antiga, a padeira do bairro', 'lugar': 'uma cozinha e o bairro'},
 {'nivel': 'eja', 'titulo': 'A entrevista de emprego', 'inicio': 'No dia da entrevista mais importante da vida, tudo começa a dar errado…', 'personagens': 'o candidato, a recrutadora, um desconhecido que ajuda', 'lugar': 'o centro da cidade'},
 {'nivel': 'eja', 'titulo': 'O vizinho da feira', 'inicio': 'Toda sexta, o feirante guarda a melhor fruta para uma cliente que, um dia, não aparece…', 'personagens': 'o feirante, a cliente, a filha dela', 'lugar': 'uma feira livre'},
 {'nivel': 'enem', 'titulo': 'O apagão digital de 2040', 'inicio': 'Em 2040, toda a internet do planeta desliga por três dias…', 'personagens': 'uma estudante, um avô, uma programadora', 'lugar': 'uma grande cidade'},
 {'nivel': 'enem', 'titulo': 'O voto decisivo', 'inicio': 'A eleição da cidade termina empatada e um único voto, contado por último, vai decidir tudo…', 'personagens': 'uma mesária, dois candidatos, um eleitor de 16 anos', 'lugar': 'uma seção eleitoral'},
 {'nivel': 'enem', 'titulo': 'A cidade sem plástico', 'inicio': 'Uma lei proíbe todo o plástico da cidade a partir da meia-noite…', 'personagens': 'uma comerciante, um catador, uma vereadora', 'lugar': 'uma cidade litorânea'},
 {'nivel': 'enem', 'titulo': 'A inteligência artificial que pediu férias', 'inicio': 'A assistente virtual mais usada do país anuncia que não vai trabalhar na semana que vem…', 'personagens': 'a IA, uma engenheira, uma família dependente da tecnologia', 'lugar': 'o Brasil do futuro'},
 {'nivel': 'enem', 'titulo': 'O último dia da escola antiga', 'inicio': 'A escola vai ser demolida, e os ex-alunos de várias gerações se encontram no pátio…', 'personagens': 'uma ex-aluna idosa, o diretor, uma aluna atual', 'lugar': 'uma escola centenária'},
]

SURPRESAS = ['um guarda-chuva amarelo', 'uma chave enferrujada', 'um bolo de chocolate', 'um apagão', 'uma galinha fujona', 'um bilhete anônimo', 'uma música antiga', 'um pneu furado', 'um celular sem bateria',
  'um arco-íris', 'uma foto rasgada', 'um espirro na hora errada', 'uma bicicleta vermelha', 'uma tempestade', 'um diário secreto', 'um par de óculos perdido', 'uma pipa presa na árvore', 'um mapa',
  'um sorvete derretendo', 'um professor fantasiado', 'uma caixa de papelão', 'um papagaio que fala', 'uma lanterna', 'um relógio parado', 'um cheiro de pipoca', 'um pé de meia furado', 'um convite para uma festa', 'uma ponte quebrada']
# repertório extra para os temas do ENEM (literatura brasileira e mais referências)
EXTRA = {
 'Os desafios do uso consciente das redes sociais pelos jovens': ['Machado de Assis, “Dom Casmurro”: só a versão de Bentinho (como nas fake news)', 'George Orwell, “1984”: vigilância e manipulação', 'Documentário “O Dilema das Redes” (2020)'],
 'A valorização da leitura na formação dos estudantes': ['Ray Bradbury, “Fahrenheit 451”: livros queimados', 'Filme “Central do Brasil”: Dora escreve cartas para analfabetos', 'Kant: coragem de pensar por si mesmo'],
 'O combate ao desperdício de alimentos no Brasil': ['Manuel Bandeira, “O Bicho”: “O bicho, meu Deus, era um homem.”', 'Curta “Ilha das Flores” (1989)', 'Carolina Maria de Jesus, “Quarto de Despejo”'],
 'A inclusão das pessoas com deficiência na escola': ['Filme “Extraordinário” (2017)', 'Pierre Bourdieu: violência simbólica na escola'],
 'A violência contra a mulher no Brasil': ['Graciliano Ramos, “São Bernardo”: Madalena tratada como propriedade', 'Machado de Assis, “Dom Casmurro”: Capitu silenciada', 'Conceição Evaristo, “Olhos d’Água”'],
 'O trabalho infantil ainda presente no Brasil': ['Jorge Amado, “Capitães da Areia”', 'Kant: tratar a pessoa como fim, nunca como meio'],
 'A importância da vacinação para a saúde coletiva': ['Monteiro Lobato: o Jeca Tatu e o abandono da saúde no campo', 'OMS: saúde como completo bem-estar físico, mental e social'],
 'Os desafios da mobilidade urbana nas cidades brasileiras': ['Milton Santos: a cidade desigual e a globalização perversa', 'Charles Chaplin, “Tempos Modernos”: a pressa e a desumanização'],
 'O lixo e a reciclagem nas cidades': ['Animação “Wall-E” (2008)', 'Ailton Krenak, “Ideias para adiar o fim do mundo”'],
 'A saúde mental dos jovens': ['Machado de Assis, “O Alienista”', 'Lima Barreto, “Diário do Hospício”', 'Filme “Coringa” (2019)'],
 'O racismo estrutural na sociedade brasileira': ['Castro Alves, “O Navio Negreiro”', 'Machado de Assis, “Pai contra Mãe”', 'Lima Barreto, “Recordações do Escrivão Isaías Caminha”'],
 'O respeito às pessoas idosas': ['Cora Coralina publicou seu primeiro livro aos 75 anos (1965)', 'Kant: a dignidade humana não depende da utilidade'],
 'O bullying nas escolas': ['Raul Pompeia, “O Ateneu”: a escola opressora', 'Filme “Extraordinário” (2017)'],
 'A gravidez na adolescência': ['Simone de Beauvoir, “O Segundo Sexo”', 'Rachel de Queiroz, “O Quinze”: Conceição, mulher que escolhe estudar e trabalhar'],
 'A preservação da Amazônia': ['Carta de Pero Vaz de Caminha (1500): a terra vista como riqueza a explorar', 'Ailton Krenak, “Ideias para adiar o fim do mundo”', 'Gonçalves Dias, “Canção do Exílio”'],
 'O acesso à cultura nas periferias': ['Carolina Maria de Jesus, “Quarto de Despejo”', 'Oswald de Andrade, “Manifesto Antropófago”', 'Filme “Bacurau” (2019)'],
 'Os golpes digitais e a segurança na internet': ['Michel Foucault, “Vigiar e Punir”: a vigilância', 'Série “Black Mirror”'],
 'O esporte como ferramenta de transformação social': ['Aristóteles: o ser humano é um animal social e político', 'Filme “Estrelas Além do Tempo”: talento que vence o preconceito'],
 'A importância do voto consciente': ['Filme “Ainda Estou Aqui” (2024): a memória da ditadura', 'Cecília Meireles, “Romanceiro da Inconfidência”: a liberdade', 'Sérgio Buarque de Holanda: o “homem cordial”'],
 'A falta de água e o uso consciente': ['Graciliano Ramos, “Vidas Secas”', 'Rachel de Queiroz, “O Quinze”', 'João Cabral de Melo Neto, “Morte e Vida Severina”'],
}
for x in D:
    for item in EXTRA.get(x['tema'], []):
        if item not in x['repertorio']: x['repertorio'].append(item)
faltam = [t for t in EXTRA if t not in {x['tema'] for x in D}]
assert not faltam, faltam

d = {'titulo': 'Redação a várias mãos', 'dissertacao': D, 'narrativa': NARR, 'surpresas': SURPRESAS}
json.dump(d, open(os.path.join(RAIZ, 'dados', 'redacao-maos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print({n: sum(1 for x in D if x['nivel'] == n) for n in ('fund', 'enem', 'eja')}, {n: sum(1 for x in NARR if x['nivel'] == n) for n in ('fund', 'enem', 'eja')}, 'temas de dissertação;', len(NARR), 'histórias;', len(SURPRESAS), 'surpresas')
