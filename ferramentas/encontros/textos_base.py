# Textos-base (leitura) para os encontros 1 a 30: um texto e 3 questões no fim de cada folha.
from base import M, A, VF, C, T

FONTE = 'Texto elaborado para esta atividade.'

TEXTOS = {
  1: [T('Na manhã de sábado, a chuva chegou sem aviso. Os feirantes correram para cobrir as frutas com lonas. '
        'Dona Clara, que vende queijo e pão caseiro, protegeu as caixas com um plástico grosso. O filho dela, Breno, '
        'ajudava os clientes a levar as compras até o ponto de ônibus. Em poucos minutos, a rua ficou vazia e molhada. '
        'Quando o sol voltou, a praça se encheu de novo, e as crianças pularam nas poças brilhantes.',
        fonte=FONTE, titulo='Chuva na feira', para=3),
      M('Qual palavra do texto tem, ao mesmo tempo, encontro consonantal e dígrafo?', ['grosso', 'chuva', 'Clara', 'filho'], 0),
      A('Retire do texto duas palavras com dígrafo consonantal (ch, lh, nh, rr, ss ou qu) e duas palavras com encontro consonantal.',
        'Dígrafo: manhã, chuva, chegou, correram, que, queijo, grosso, filho, molhada, encheu, brilhantes. Encontro consonantal (ex.): cobrir, '
        'frutas, Clara, protegeu, plástico, grosso, Breno, clientes, compras, praça, crianças, brilhantes. (Em “Quando” o U é pronunciado: não há dígrafo.)', 2),
      M('Na palavra “caixas”, do texto, a letra X tem o mesmo som que tem em:', ['xícara', 'táxi', 'exame', 'próximo'], 0)],

  2: [T('Às seis e meia da manhã, os alunos já esperavam no saguão da escola, com mochilas, lanches e muita animação. '
        'A professora Luísa conferiu a lista e avisou: “Ninguém sai antes da chamada!” Depois de uma hora de viagem, '
        'o ônibus parou em frente ao museu da cidade. Lá, a turma viu fotos antigas, roupas de couro e um baú cheio de cartas. '
        'Na volta, todos estavam cansados, mas felizes com o passeio.',
        fonte=FONTE, titulo='A excursão', para=3),
      A('Retire do texto uma palavra com ditongo, uma com hiato e uma com tritongo.',
        'Ditongo (ex.): seis, muita, sai, depois, parou, museu, viu, roupas, couro, cheio, passeio. Hiato: Luísa, viagem, baú. Tritongo: saguão.', 2),
      VF('Sobre palavras do texto, marque V (verdadeiro) ou F (falso):',
         [('Em “saguão” há um tritongo.', True),
          ('Em “baú” há um ditongo.', False),
          ('Em “couro” há um ditongo.', True),
          ('A divisão silábica de “viagem” é vi-a-gem.', True),
          ('A divisão silábica de “passeio” é pa-ssei-o.', False)]),
      M('De acordo com o texto, como os alunos estavam na volta?',
        ['cansados, mas felizes', 'tristes e sem energia', 'preocupados com a chamada', 'animados para outra viagem'], 0)],

  3: [T('Todo domingo, os netos da vovó Neide almoçam juntos. A comida quase não muda: arroz, feijão, macarrão e frango assado. '
        'De sobremesa, há pudim e café. Depois, os adultos conversam na varanda, e as crianças jogam bola no quintal. '
        'O tio Rui, que é médico, sempre lembra a época em que era estudante. No fim da tarde, todos se despedem com a mesma promessa: '
        '“Até o próximo domingo!”',
        fonte=FONTE, titulo='Almoço de domingo', para=3),
      M('Na promessa final, “Até o próximo domingo!”, as palavras “até”, “próximo” e “domingo” são, respectivamente:',
        ['oxítona, proparoxítona e paroxítona', 'paroxítona, proparoxítona e oxítona', 'oxítona, paroxítona e proparoxítona', 'proparoxítona, oxítona e paroxítona'], 0),
      A('Além de “próximo”, há mais duas palavras proparoxítonas no texto. Quais são elas?', 'médico e época.'),
      M('No trecho “os adultos conversam na varanda”, as palavras “adultos”, “conversam” e “varanda” são:',
        ['paroxítonas', 'oxítonas', 'proparoxítonas', 'uma oxítona e duas paroxítonas'], 0)],

  4: [T('Às cinco da manhã, as luzes da padaria do seu Inácio já estão acesas. O cheiro de pão quentinho atravessa a rua e acorda a vizinhança. '
        'Na vitrine, há bolo de cenoura, rosca de coco e doces com açúcar e canela. Dona Rosa, a moça do caixa, cumprimenta cada pessoa pelo nome. '
        'Os clientes elogiam a limpeza do lugar e a gentileza dos funcionários. Com certeza, o segredo do sucesso é simples: '
        'fazer tudo com capricho e oferecer um sorriso logo cedo.',
        fonte=FONTE, titulo='A padaria do bairro', para=3),
      A('Retire do texto duas palavras em que a letra C, antes de E ou I, tem som de S, e duas palavras escritas com Ç.',
        'C antes de E ou I: cinco, Inácio, acesas, cenoura, doces, funcionários, certeza, sucesso, oferecer, cedo. Ç: vizinhança, açúcar, moça.', 2),
      M('As palavras “gentileza” e “certeza”, do texto, são escritas com Z porque:',
        ['vêm de adjetivos, com o sufixo -eza', 'indicam origem, como o sufixo -esa', 'são adjetivos com o sufixo -oso', 'são verbos terminados em -izar'], 0),
      M('Em qual palavra do texto o S tem som de Z?', ['Rosa', 'simples', 'segredo', 'sucesso'], 0)],

  5: [T('Os alunos do oitavo ano cuidam de uma horta no fundo da escola. Hoje, eles colheram alface, cebolinha e chuchu. '
        'Enquanto regavam os canteiros, encontraram uma lagartixa embaixo de uma enxada velha. Júlia gritou: “Que bicho estranho!” '
        'O professor Henrique explicou que o animal não faz mal a ninguém e também ajuda a controlar os insetos. '
        'No fim da manhã, a turma lavou as hortaliças, encheu as cestas e levou tudo para a cozinha.',
        fonte=FONTE, titulo='A horta da escola', para=3),
      M('Pela regra, depois de EN- no início da palavra usa-se X, como em “enxada”. Qual palavra do texto é exceção a essa regra?',
        ['encheu', 'embaixo', 'lagartixa', 'chuchu'], 0),
      A('Retire do texto as palavras escritas com H inicial.', 'horta, Hoje, Henrique, hortaliças.'),
      M('Na palavra “Henrique”, do texto, o R tem som forte, mas é escrito com uma só letra porque:',
        ['vem depois de consoante', 'está entre duas vogais', 'está no fim da palavra', 'vem antes de consoante'], 0)],

  6: [T('Pessoal, por que ninguém respondeu ao convite do professor? A feira de ciências será daqui a duas semanas, e ainda há muita coisa '
        'para fazer. Sei que o último trabalho deu errado porque faltou organização, mas desta vez vai ser diferente. Ninguém aqui é mau aluno; '
        'nós só começamos mal. Proponho uma reunião amanhã, na biblioteca, onde sempre encontramos mesa livre. E, se alguém souber aonde '
        'vamos levar os cartazes depois da feira, avise-me! Abraços, Caio.',
        fonte=FONTE, titulo='Mensagem no grupo da turma', para=3),
      M('Em “por que ninguém respondeu ao convite do professor?” e em “deu errado porque faltou organização”, as formas “por que” e “porque” '
        'foram usadas, respectivamente, para:',
        ['fazer uma pergunta e dar uma explicação', 'dar uma explicação e fazer uma pergunta', 'nomear um motivo e fazer uma pergunta', 'fazer duas perguntas diferentes'], 0),
      M('Em “Ninguém aqui é mau aluno; nós só começamos mal”, Caio usou “mau” e depois “mal” porque:',
        ['“mau” se opõe a “bom”; “mal”, a “bem”', '“mau” se opõe a “bem”; “mal”, a “bom”', 'as duas formas têm o mesmo sentido', '“mau” indica tempo; “mal”, lugar'], 0),
      A('Copie da mensagem o trecho em que “a” indica tempo futuro e o trecho em que “há” significa “existe”.',
        '“daqui a duas semanas”; “ainda há muita coisa para fazer”.')],

  7: [T('No último sábado, fui com meu avô ao parque da cidade. Fomos de ônibus e descemos perto do lago. Lá, vimos um jacaré tomando sol '
        'e um urubu pousado numa árvore. Meu avô comprou dois picolés de maracujá e sentou-se num banco para descansar os pés. Ele contou que, '
        'há três anos, quase não pôde andar por causa de uma cirurgia. Hoje caminha todo dia e já ganhou uma medalha numa corrida. '
        'Depois, ele me perguntou: “Você também vai correr comigo no mês que vem?”',
        fonte=FONTE, titulo='Sábado no parque', para=3),
      C('Associe cada palavra do texto à regra que explica o seu acento:',
        [('árvore', 'proparoxítona: todas são acentuadas'),
         ('maracujá', 'oxítona terminada em A'),
         ('também', 'oxítona terminada em EM'),
         ('três', 'monossílabo tônico terminado em E(S)'),
         ('pôde', 'acento diferencial: passado de “poder”')]),
      M('Qual grupo reúne palavras do texto acentuadas pela mesma regra?',
        ['jacaré, picolés, você', 'sábado, três, avô', 'lá, árvore, também', 'último, pés, maracujá'], 0),
      A('O que o avô contou sobre a própria saúde?',
        'Que, há três anos, quase não pôde andar por causa de uma cirurgia; hoje caminha todo dia e já ganhou uma medalha numa corrida.', 2)],

  8: [T('Na feira de ciências, o grupo de Taís apresentou uma ideia simples e útil: um filtro de água feito com garrafa, areia e carvão. '
        'A plateia ficou curiosa, e um avaliador perguntou se era possível usar o filtro em casa. Taís respondeu com tranquilidade: '
        '“O filtro tira a sujeira, mas a água ainda precisa ser fervida para proteger a nossa saúde.” No fim, o projeto recebeu um troféu, '
        'e a notícia saiu no jornal da escola.',
        fonte=FONTE, titulo='Ciência na escola', para=3),
      M('A palavra “possível”, do texto, é acentuada pela mesma regra de:', ['útil', 'saúde', 'água', 'Taís'], 0),
      C('Associe cada palavra do texto à explicação sobre a sua acentuação:',
        [('notícia', 'paroxítona terminada em ditongo'),
         ('saúde', 'hiato: U tônico sozinho na sílaba'),
         ('plateia', 'perdeu o acento com o Novo Acordo'),
         ('troféu', 'oxítona com ditongo aberto: continua acentuada')]),
      A('Segundo Taís, por que a água filtrada ainda precisa ser fervida?',
        'Porque o filtro só tira a sujeira; é preciso ferver a água para proteger a saúde.')],

  9: [T('Filipe, cheguei cedo e não encontrei ninguém em casa. Aonde vocês foram? Deixei arroz, feijão, salada e frango na geladeira. '
        'Dê comida ao gato! Ah, a sua professora ligou: a entrega do trabalho de ciências foi adiada para sexta-feira, ou seja, '
        'você ainda tem tempo. Será que consegue terminá-lo? Eu acho que sim... Volto às oito. Um beijo, mamãe.',
        fonte=FONTE, titulo='Bilhete na geladeira', para=3),
      C('Associe cada trecho do bilhete ao que a pontuação indica nele:',
        [('“Aonde vocês foram?”', 'pergunta direta'),
         ('“Dê comida ao gato!”', 'pedido feito com ênfase'),
         ('“Eu acho que sim...”', 'dúvida, hesitação'),
         ('“arroz, feijão, salada e frango”', 'separação dos itens de uma lista')]),
      A('Copie do bilhete a expressão explicativa que aparece entre vírgulas.', '“ou seja”.'),
      M('De acordo com o bilhete, a professora avisou que:',
        ['a entrega do trabalho foi adiada', 'a reunião de pais foi marcada', 'Filipe precisa refazer o trabalho', 'não haverá aula na sexta-feira'], 0)],

  10: [T('No primeiro dia de aula, a professora Helena (que também era a coordenadora) recebeu o aluno novo e disse: '
         '“Seja bem-vindo, Rafael! Sente-se perto da janela.” Na mochila, ele levava só três coisas: um caderno, um lápis e uma maçã. '
         'No intervalo, Davi, o colega da carteira ao lado, puxou conversa.',
         fonte=FONTE, titulo='O aluno novo', para=3),
       M('No texto, os parênteses em “(que também era a coordenadora)” servem para:',
         ['dar uma informação extra sobre Helena', 'indicar a fala de um personagem', 'marcar uma pergunta do narrador', 'separar os itens de uma lista'], 0),
       M('Os dois-pontos depois de “disse” e de “três coisas” anunciam, respectivamente:',
         ['uma fala e uma enumeração', 'uma enumeração e uma fala', 'duas falas', 'duas enumerações'], 0),
       VF('Sobre a pontuação do texto, marque V ou F:',
          [('As aspas marcam a fala da professora.', True),
           ('Em “Seja bem-vindo, Rafael!”, a vírgula separa um vocativo.', True),
           ('Em “Davi, o colega da carteira ao lado, puxou conversa”, há um vocativo.', False)])],

  11: [T('Seu Lauro é jardineiro há trinta anos. Todos os dias, ele rega os girassóis da praça, e os beija-flores parecem esperar por ele. '
         'No último fim de semana, algumas mudas foram arrancadas. Os vizinhos ficaram boquiabertos com o estrago, mas seu Lauro não desanimou: '
         'comprou novas plantas, replantou tudo e colocou uma placa com o pedido “Cuide do que é de todos”. Na segunda-feira, a vizinhança '
         'agradeceu com um abraço coletivo, e o sorriso voltou ao rosto do jardineiro.',
         fonte=FONTE, titulo='O jardineiro da praça', para=3),
       C('Associe cada palavra do texto ao seu processo de formação:',
         [('jardineiro', 'derivação sufixal'),
          ('replantou', 'derivação prefixal'),
          ('beija-flores', 'composição por justaposição'),
          ('boquiabertos', 'composição por aglutinação')]),
       A('Retire do texto duas palavras da mesma família de “planta” e indique o radical comum a elas.', 'plantas e replantou; radical: plant-.'),
       A('Como seu Lauro reagiu quando algumas mudas foram arrancadas?',
         'Não desanimou: comprou novas plantas, replantou tudo e colocou uma placa pedindo que cuidassem do que é de todos.')],

  12: [T('Em julho, a turma do professor Caetano viajou para Bonito, em Mato Grosso do Sul. Logo na chegada, os alunos viram um bando de araras '
         'sobre o hotel. No dia seguinte, fizeram flutuação no Rio Sucuri e observaram um cardume de peixes coloridos. À noite, a guia contou '
         'lendas da região, e a alegria tomou conta do grupo. Na volta, cada estudante escreveu no caderno uma palavra para resumir a viagem. '
         'A mais escolhida foi “liberdade”.',
         fonte=FONTE, titulo='Viagem a Bonito', para=3),
       M('Qual alternativa traz apenas substantivos próprios do texto?',
         ['Caetano, Bonito e Mato Grosso do Sul', 'Caetano, julho e hotel', 'Bonito, guia e região', 'Sucuri, araras e liberdade'], 0),
       A('Retire do texto três substantivos coletivos e diga o que cada um reúne.',
         'turma (de alunos), bando (de araras, aves), cardume (de peixes), grupo (de pessoas).', 2),
       A('A palavra mais escolhida pelos alunos foi “liberdade”, um substantivo abstrato. Retire do texto outros dois substantivos abstratos.',
         'Ex.: chegada, flutuação, alegria, volta, viagem.')],

  13: [T('No sábado, a turma visitou o sítio da avó de Lucas. A motorista do ônibus estacionou perto do portão, e dois cães vieram receber o grupo. '
         'A avó mostrou a horta, cheia de alfaces, pimentões e limões. No galinheiro, um galo cantava alto, e as galinhas ciscavam ao lado dos '
         'pintinhos. De repente, uma pessoa gritou: “Cobra!” Era só uma cobra pequena, que logo fugiu para o mato. No fim da tarde, todos '
         'tomaram um cafezinho na varanda da casinha azul.',
         fonte=FONTE, titulo='Visita ao sítio', para=3),
       M('Qual substantivo do texto é sobrecomum?', ['pessoa', 'galo', 'motorista', 'cobra'], 0),
       A('Escreva no singular estas palavras do texto: cães – pimentões – limões.', 'cão; pimentão; limão.'),
       A('Retire do texto três substantivos no grau diminutivo.', 'pintinhos, cafezinho, casinha.')],

  14: [T('No sábado passado, a escola realizou a sua décima gincana. Cinco equipes disputaram as provas. A equipe azul ficou em primeiro lugar, '
         'com o dobro dos pontos da equipe verde, que terminou em segundo. A prova mais divertida foi a corrida do saco: um terço dos participantes '
         'caiu antes da linha de chegada! No fim, a diretora fez um discurso, entregou as medalhas e anunciou que a próxima gincana será no dia '
         '1º de outubro, data do aniversário da escola.',
         fonte=FONTE, titulo='A gincana da escola', para=3),
       A('Retire do texto um numeral de cada tipo: cardinal, ordinal, multiplicativo e fracionário.',
         'Cardinal: cinco. Ordinal: décima, primeiro, segundo ou 1º (primeiro). Multiplicativo: dobro. Fracionário: (um) terço.', 2),
       M('Em “com o dobro dos pontos da equipe verde”, a palavra “dobro” indica que a equipe azul fez:',
         ['duas vezes os pontos da equipe verde', 'metade dos pontos da equipe verde', 'dois pontos a mais que a equipe verde', 'os mesmos pontos da equipe verde'], 0),
       A('Retire do texto o único artigo indefinido e o substantivo que ele acompanha.',
         '“um discurso” (artigo indefinido: um). Atenção: em “um terço”, “um” é numeral.')],

  15: [T('A Praça das Flores é o lugar mais animado do bairro. Pela manhã, idosos tranquilos caminham entre árvores altas e bancos de madeira. '
         'À tarde, crianças barulhentas correm atrás de pombos, enquanto o pipoqueiro vende pipoca doce e salgada. A fonte antiga foi restaurada '
         'no ano passado e hoje está belíssima. Para muitos moradores, a praça é tão importante quanto a própria casa. À noite, sob a luz da lua, '
         'casais apaixonados conversam baixinho, e o som das brincadeiras de criança dá lugar ao silêncio.',
         fonte=FONTE, titulo='A Praça das Flores', para=3),
       C('Associe cada trecho do texto ao grau do adjetivo:',
         [('“o lugar mais animado do bairro”', 'superlativo relativo de superioridade'),
          ('“hoje está belíssima”', 'superlativo absoluto sintético'),
          ('“tão importante quanto a própria casa”', 'comparativo de igualdade')]),
       A('Retire do texto os adjetivos que caracterizam as pessoas que frequentam a praça e diga a que substantivo cada um se refere.',
         'tranquilos (idosos), barulhentas (crianças), apaixonados (casais).'),
       M('Em “árvores altas” e “A fonte antiga”, os adjetivos “altas” e “antiga” estão no feminino porque:',
         ['concordam com os substantivos', 'concordam com os verbos', 'são adjetivos pátrios', 'estão no grau superlativo'], 0)],

  16: [T('Na saída da escola, Marta encontrou um celular caído perto do portão. Ela o pegou com cuidado e procurou o dono, mas não o encontrou. '
         'Então, entregou o aparelho à diretora, que prometeu: “Vou descobrir quem é o dono e devolvê-lo hoje mesmo.” No dia seguinte, '
         'Leo, do nono ano, procurou Marta e lhe agradeceu: “Você me salvou! Sem ele, eu perderia todas as fotos da viagem.”',
         fonte=FONTE, titulo='O celular perdido', para=3),
       M('No trecho “Ela o pegou com cuidado e procurou o dono, mas não o encontrou”, os dois pronomes “o” referem-se, respectivamente, a:',
         ['celular e dono', 'dono e celular', 'Marta e dono', 'portão e celular'], 0),
       A('A quem se refere o pronome “lhe” em “procurou Marta e lhe agradeceu”? Que tipo de complemento ele substitui?',
         'Refere-se a Marta; substitui um objeto indireto (agradeceu a Marta).'),
       VF('Sobre os pronomes do texto, marque V ou F:',
          [('“Ela”, em “Ela o pegou com cuidado”, é pronome pessoal do caso reto.', True),
           ('Em “devolvê-lo”, o pronome “lo” refere-se ao celular.', True),
           ('Em “Você me salvou!”, “me” é pronome pessoal do caso reto.', False),
           ('“Eu”, na última frase, refere-se à diretora.', False)])],

  17: [T('A biblioteca que fica ao lado do mercado reabriu na semana passada. O prédio, cujas paredes estavam rachadas, foi reformado pelos '
         'próprios moradores. Dona Célia, a bibliotecária, conta que ninguém acreditava no projeto: “Muitos diziam que isso era perda de tempo.” '
         'Hoje, a sala onde ficam os livros infantis vive cheia, e o clube de leitura se reúne aos sábados. Qual será o próximo passo? '
         'Dona Célia já tem a resposta: “Nosso sonho é uma sala de informática.”',
         fonte=FONTE, titulo='A biblioteca do bairro', para=3),
       M('Em “A biblioteca que fica ao lado do mercado reabriu”, o pronome relativo “que” retoma:', ['a biblioteca', 'o mercado', 'o lado', 'os moradores'], 0),
       A('A que se refere o pronome demonstrativo “isso” em “Muitos diziam que isso era perda de tempo”?',
         'Ao projeto de reformar e reabrir a biblioteca.'),
       C('Associe cada pronome do texto à sua classificação:',
         [('cujas', 'relativo'), ('ninguém', 'indefinido'), ('Qual', 'interrogativo'), ('Nosso', 'possessivo')])],

  18: [T('Primeiro, ligue o forno e unte a assadeira com manteiga. Em uma tigela, amasse quatro bananas maduras e misture os ovos, o açúcar e o óleo. '
         'Depois, acrescente a farinha e o fermento aos poucos, mexendo sem parar. Despeje a massa na assadeira e leve ao forno por quarenta minutos. '
         'Enquanto o bolo assa, a casa inteira fica perfumada. Sirva ainda morno, com café. Minha avó sempre dizia: '
         '“Quem cozinha com paciência nunca come bolo solado!”',
         fonte=FONTE, titulo='Bolo de banana da vó Teresa', para=3),
       A('Na receita, as formas “ligue”, “amasse” e “despeje” estão em que modo verbal? Por que esse modo é usado em receitas?',
         'Modo imperativo, porque a receita dá instruções (ordens, orientações) a quem vai preparar o bolo.'),
       M('Na frase “Minha avó sempre dizia”, o verbo “dizia” está:',
         ['no passado, indicando um costume', 'no presente, indicando algo atual', 'no futuro, indicando algo que virá', 'no imperativo, indicando uma ordem'], 0),
       A('Escreva o infinitivo destes verbos do texto e a conjugação a que pertencem: amasse – mexendo – sirva.',
         'amassar (1ª conjugação); mexer (2ª conjugação); servir (3ª conjugação).')],

  19: [T('Quando era menino, meu avô acordava cedo, ajudava o pai na roça e andava três quilômetros até a escola. Um dia, a chuva derrubou '
         'a ponte do caminho da escola, e as crianças ficaram uma semana sem aula. Meu avô ri ao lembrar: “Foram as férias mais longas da minha vida!” '
         'Hoje ele está aprendendo a usar o celular. No mês que vem, vamos visitar juntos a cidade onde ele nasceu.',
         fonte=FONTE, titulo='As férias mais longas', para=3),
       M('No texto, “acordava”, “ajudava” e “andava” estão no pretérito imperfeito porque indicam:',
         ['hábitos: ações repetidas no passado', 'ações concluídas num momento exato', 'ações que ainda vão acontecer', 'hipóteses que dependem de condição'], 0),
       M('Segundo o texto, as crianças ficaram uma semana sem aula porque:', ['a ponte caiu', 'houve uma greve', 'faltou energia', 'a família viajou'], 0),
       A('Copie as duas locuções verbais do texto e diga se indicam ação em andamento ou futura.',
         '“está aprendendo” (ação em andamento); “vamos visitar” (ação futura).')],

  20: [T('Ontem à noite, o time de futsal da escola disputou a final do campeonato municipal. O ginásio estava lotado. No primeiro tempo, '
         'nossos jogadores atacaram com calma, mas o goleiro adversário defendia tudo. Aos dez minutos do segundo tempo, Júnior chutou de longe '
         'e marcou um golaço. A torcida gritou muito! Depois, o time se defendeu bem até o apito final. Talvez esse tenha sido o jogo mais '
         'emocionante do ano. Amanhã, os campeões serão recebidos com uma festa no pátio.',
         fonte=FONTE, titulo='A final do campeonato', para=3),
       C('Associe cada advérbio ou locução adverbial do texto à circunstância que ele expressa:',
         [('Ontem', 'tempo'), ('de longe', 'lugar'), ('com calma', 'modo'), ('muito', 'intensidade'), ('Talvez', 'dúvida')]),
       A('Retire do texto duas locuções adverbiais de tempo.', 'Ex.: à noite; no primeiro tempo; aos dez minutos do segundo tempo; até o apito final.'),
       M('Segundo o texto, o primeiro tempo foi difícil para o time da escola porque:',
         ['o goleiro adversário defendia tudo', 'o ginásio estava vazio', 'Júnior estava machucado', 'a torcida não apareceu'], 0)],

  21: [T('— Ufa! Cheguei a tempo — disse Bruno, sem fôlego, ao entrar na sala.\n'
         'A professora sorriu, mas avisou que haveria uma prova surpresa.\n'
         '— Ah, não! — reclamaram alguns alunos.\n'
         'Bruno estava tranquilo, pois tinha estudado com a irmã durante o fim de semana. Embora estivesse cansado, respondeu a todas as questões '
         'com atenção. Uma semana depois, recebeu a nota: dez!\n'
         '— Oba! — gritou ele. — Valeu a pena estudar!',
         fonte=FONTE, titulo='A prova surpresa', para=3),
       M('Em “Bruno estava tranquilo, pois tinha estudado com a irmã”, a conjunção “pois” introduz:', ['uma explicação', 'uma oposição', 'uma conclusão', 'uma condição'], 0),
       A('Retire do texto a interjeição que expressa alegria e a que expressa decepção.', 'Alegria: “Oba!”. Decepção: “Ah, não!”.'),
       M('Em “durante o fim de semana”, a preposição “durante” indica:', ['tempo', 'lugar', 'causa', 'finalidade'], 0)],

  22: [T('Domingo de manhã, o parque estava cheio. Crianças andavam de bicicleta, e os cachorros corriam atrás das bolas. Perto do lago, um senhor '
         'lia o jornal. De repente, um menino gritou: “Ai, meu joelho!” Ele tinha caído do balanço. Todos correram até ele. Felizmente, foi só um susto. '
         'A mãe abraçou o filho, limpou o joelho dele e agradeceu a ajuda. Que alívio! Minutos depois, o menino já brincava de novo.',
         fonte=FONTE, titulo='Susto no parque', para=3),
       A('Retire do texto as duas frases nominais.', '“Ai, meu joelho!” e “Que alívio!”.'),
       VF('Sobre frases, orações e períodos do texto, marque V ou F:',
          [('“Perto do lago, um senhor lia o jornal.” é um período simples.', True),
           ('“Ele tinha caído do balanço.” é um período composto, porque tem dois verbos.', False),
           ('“A mãe abraçou o filho, limpou o joelho dele e agradeceu a ajuda.” tem três orações.', True),
           ('“Crianças andavam de bicicleta, e os cachorros corriam atrás das bolas.” é um período composto.', True),
           ('“Que alívio!” é uma oração, porque expressa um sentimento.', False)]),
       M('De acordo com o texto, o menino gritou porque:',
         ['tinha caído do balanço', 'um cachorro o tinha mordido', 'tinha perdido a bicicleta', 'não encontrava a mãe'], 0)],

  23: [T('No sábado passado, choveu de manhã, mas à tarde o sol apareceu. Os moradores da Rua das Palmeiras organizaram um mutirão para limpar '
         'a praça. Dona Fátima e o filho levaram sacos de lixo e luvas. Pintamos os bancos de verde e plantamos dez mudas de ipê. No fim do dia, '
         'chegou o caminhão da prefeitura para recolher o entulho. Num dos bancos, alguém deixou um bilhete: “Obrigado, vizinhos!” '
         'Disseram que, no próximo mês, haverá outro mutirão.',
         fonte=FONTE, titulo='Mutirão na praça', para=3),
       C('Associe cada oração do texto ao tipo de sujeito:',
         [('“choveu de manhã”', 'oração sem sujeito'),
          ('“Dona Fátima e o filho levaram sacos de lixo”', 'sujeito composto'),
          ('“Pintamos os bancos de verde”', 'sujeito oculto (nós)'),
          ('“Disseram que...”', 'sujeito indeterminado'),
          ('“o sol apareceu”', 'sujeito simples')]),
       A('Na oração “chegou o caminhão da prefeitura”, qual é o sujeito? Qual é o núcleo desse sujeito?',
         'Sujeito: “o caminhão da prefeitura” (simples, colocado depois do verbo); núcleo: caminhão.'),
       M('Segundo o texto, para que o caminhão da prefeitura chegou no fim do dia?',
         ['para recolher o entulho', 'para trazer as mudas de ipê', 'para pintar os bancos', 'para levar os moradores'], 0)],

  24: [T('No domingo, aconteceu a maratona da cidade. Às sete horas, a avenida já estava cheia de corredores. Seu Antônio, de setenta anos, parecia '
         'tranquilo na largada. Durante a prova, o calor aumentou, e muitos atletas ficaram cansados. Seu Antônio diminuiu o ritmo, bebeu água '
         'e não desistiu. Quase cinco horas depois, ele cruzou a linha de chegada sorridente. A neta mais nova correu para abraçá-lo: '
         '“Vovô, você é o nosso herói!”',
         fonte=FONTE, titulo='O herói da maratona', para=3),
       M('Qual destes predicados do texto é verbo-nominal?',
         ['cruzou a linha de chegada sorridente', 'ficaram cansados', 'diminuiu o ritmo', 'estava cheia de corredores'], 0),
       A('Retire do texto duas orações com predicado nominal e sublinhe o verbo de ligação de cada uma.',
         'Ex.: “a avenida já estava cheia de corredores” (estava); “Seu Antônio [...] parecia tranquilo” (parecia); '
         '“muitos atletas ficaram cansados” (ficaram); “você é o nosso herói” (é).'),
       A('Por que a neta chamou o avô de “nosso herói”?',
         'Porque, aos setenta anos, ele enfrentou o calor, não desistiu e completou a maratona.')],

  25: [T('Na semana passada, Lívia completou quinze anos. Os amigos queriam surpreendê-la. Juntaram dinheiro e compraram um livro de poemas. '
         'Na festa, Caio entregou o presente à aniversariante, e ela adorou a surpresa. Lívia gosta de poesia desde pequena e sonha com a carreira '
         'de escritora. Mais tarde, a avó contou uma história engraçada aos convidados. Todos riram. No fim da noite, Lívia agradeceu aos amigos '
         'o carinho e foi dormir feliz.',
         fonte=FONTE, titulo='O presente de Lívia', para=3),
       M('Em “No fim da noite, Lívia agradeceu aos amigos o carinho”, o objeto direto do verbo “agradecer” é:',
         ['o carinho', 'aos amigos', 'Lívia', 'No fim da noite'], 0),
       A('Classifique quanto à transitividade os verbos destes trechos do texto: “gosta de poesia” – “compraram um livro de poemas” – “Todos riram”.',
         'gosta: VTI (objeto indireto: de poesia); compraram: VTD (objeto direto: um livro de poemas); riram: VI.', 2),
       M('No trecho “Os amigos queriam surpreendê-la”, o pronome “la” é objeto direto e se refere a:', ['Lívia', 'a avó', 'a surpresa', 'a festa'], 0)],

  26: [T('Depois de muitos pedidos, a reforma da quadra da escola finalmente começou. Durante as férias, '
         'os pedreiros trocaram o piso antigo e instalaram uma cobertura de metal. A diretora, sempre atenta às necessidades '
         'da turma, acompanhou toda a obra. Na volta às aulas, a quadra foi inaugurada com um jogo de vôlei. Agora os estudantes têm orgulho '
         'do espaço e cuidam dele com carinho.',
         fonte=FONTE, titulo='A quadra nova', para=3),
       M('No trecho “a reforma da quadra da escola”, os termos “da quadra” e “da escola” são, respectivamente:',
         ['complemento nominal e adjunto adnominal', 'adjunto adnominal e complemento nominal', 'adjunto adverbial e adjunto adnominal', 'objeto indireto e complemento nominal'], 0),
       VF('Sobre os termos do texto, marque V ou F:',
          [('Em “uma cobertura de metal”, “de metal” é adjunto adnominal.', True),
           ('Em “têm orgulho do espaço”, “do espaço” é complemento nominal.', True),
           ('Em “o piso antigo”, “antigo” é adjunto adverbial.', False),
           ('Em “cuidam dele com carinho”, “com carinho” é complemento nominal.', False)]),
       A('Retire do texto dois adjuntos adverbiais de tempo.',
         'Ex.: depois de muitos pedidos, finalmente, durante as férias, sempre, na volta às aulas, agora.')],

  27: [T('Querida turma, a nossa excursão está confirmada! Vamos visitar Ouro Preto, cidade histórica de Minas Gerais, no fim de outubro. '
         'Levem só o necessário: documento, garrafa de água, protetor solar e um casaco leve. Lá, conheceremos museus, igrejas antigas e ruas de pedra. '
         'O ônibus sairá da escola às seis horas. Pais e responsáveis, assinem a autorização até sexta-feira. Contamos com vocês! '
         'Um abraço, professora Marta, coordenadora do passeio.',
         fonte=FONTE, titulo='Recado da professora', para=3),
       A('Retire do texto os dois vocativos.', '“Querida turma” e “Pais e responsáveis”.'),
       VF('Sobre o texto, marque V ou F:',
          [('“cidade histórica de Minas Gerais” é um aposto que explica o que é Ouro Preto.', True),
           ('Em “Contamos com vocês!”, o termo “vocês” é um vocativo.', False),
           ('Os termos depois de “o necessário:” formam um aposto enumerativo.', True),
           ('Em “Vamos visitar Ouro Preto”, “Ouro Preto” é um vocativo.', False),
           ('“coordenadora do passeio” é um aposto que se refere à professora Marta.', True)]),
       M('Qual é a principal finalidade do texto?',
         ['informar e orientar sobre a excursão', 'contar como foi uma viagem', 'pedir doações para a escola', 'descrever a história de Minas Gerais'], 0)],

  28: [T('Na última sexta-feira, a escola realizou o seu primeiro Festival de Talentos. Havia mais de cem pessoas no pátio. Os alunos do nono ano '
         'apresentaram uma peça de teatro, e duas meninas cantaram uma música que elas mesmas compuseram. A maioria dos pais chegou cedo. '
         'As apresentações foram tão bonitas que a diretora ficou emocionada e disse: “Já faz três meses que vocês ensaiam, e o resultado está aí!”',
         fonte=FONTE, titulo='Festival de Talentos', para=3),
       A('Corrija a concordância: “As apresentações foi tão bonito que a diretora ficou emocionado.”',
         'As apresentações foram tão bonitas que a diretora ficou emocionada.'),
       M('Em “A maioria dos pais chegou cedo”, também se aceita “chegaram” porque o verbo:',
         ['pode concordar com “maioria” ou “pais”', 'vai sempre ao plural depois de “pais”', 'tem um sujeito composto', 'concorda com o advérbio “cedo”'], 0),
       A('Reescreva “a diretora ficou emocionada” com o sujeito “a diretora e o coordenador”.',
         'a diretora e o coordenador ficaram emocionados.')],

  29: [T('No sábado, fui à feira com minha avó às oito horas. Depois, fomos a pé para a praça, onde assistimos a uma apresentação de capoeira. '
         'Minha avó prefere a música ao barulho dos carros, então ficamos ali quase uma hora. À tarde, chegamos ao cinema bem a tempo do filme. '
         'Na saída, ela me disse que obedecer aos horários é o segredo para aproveitar o dia. À noite, voltamos para casa com a sensação de '
         'dever cumprido.',
         fonte=FONTE, titulo='Um sábado de passeio', para=3),
       M('Em “assistimos a uma apresentação de capoeira”, não há crase porque:',
         ['não se usa crase antes de “uma”', '“assistir” (ver) não pede preposição', '“apresentação” é palavra masculina', 'a crase só aparece antes de verbos'], 0),
       A('Retire do texto as três expressões com crase que indicam tempo.', '“às oito horas”, “À tarde” e “À noite”.'),
       A('Que conselho a avó deu na saída do cinema?', 'Que obedecer aos horários é o segredo para aproveitar o dia.')],

  30: [T('Aos dezessete anos, Paula conseguiu o primeiro emprego numa livraria. No começo, sentia-se insegura: não sabia onde ficavam '
         'os livros nem como usar o caixa. O gerente, um senhor paciente, explicou tudo com calma. Em poucas semanas, ela já indicava romances '
         'aos clientes e organizava as prateleiras sozinha. Paula adorava a música calma da loja. Com o primeiro pagamento, comprou um presente '
         'para a mãe.',
         fonte=FONTE, titulo='O primeiro emprego', para=3),
       M('No trecho “sentia-se insegura: não sabia onde ficavam os livros”, os dois-pontos introduzem:',
         ['uma explicação', 'uma fala', 'uma pergunta', 'uma citação'], 0),
       M('Em “organizava as prateleiras sozinha”, a palavra “sozinha” concorda com:',
         ['“ela”', '“prateleiras”', '“semanas”', '“clientes”'], 0),
       A('Explique por que as palavras “música” e “já”, do texto, têm acento.',
         '“Música” é proparoxítona, e todas as proparoxítonas são acentuadas. “Já” é monossílabo tônico terminado em A.')],
}
