# Bancos novos do "Monte o parágrafo dissertativo": 6º ao 9º (lúdico), ENEM (temas atuais) e EJA.
import json, os
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
EXPLICA = {
 'fund': {'Introdução': 'Começo curioso (pergunta, situação ou curiosidade) → opinião do grupo (a tese) → os motivos que virão.',
          'Desenvolvimento': 'Motivo (o argumento) → explicação (por quê?) → exemplo → frase que fecha e volta à opinião.',
          'Conclusão': 'Retoma a opinião → quem pode resolver e o quê → como → para quê.'},
 'enem': {'Introdução': 'Repertório que contextualiza → tese → anúncio dos argumentos.',
          'Desenvolvimento': 'Tópico frasal (o argumento) → explicação → repertório ou exemplo que comprova → fechamento ligado à tese.',
          'Conclusão': 'Retomada da tese → agente e ação → meio → finalidade → frase final.'},
 'eja':  {'Introdução': 'Situação do dia a dia → tese (opinião) → os motivos que serão explicados.',
          'Desenvolvimento': 'Argumento → explicação → exemplo da vida real → fechamento.',
          'Conclusão': 'Retoma a opinião → quem deve agir e o quê → como → para quê.'}}
B = {'fund': [], 'enem': [], 'eja': []}
def S(nivel, tema, intro, desenv, concl):
    for parte, itens in (('Introdução', intro), ('Desenvolvimento', desenv), ('Conclusão', concl)):
        B[nivel].append({'titulo': f'{parte} — {tema}', 'tema': tema, 'parte': parte, 'esquerda': 'início', 'direita': 'fim', 'itens': itens, 'explica': EXPLICA[nivel][parte]})

F = 'fund'
S(F, '📱 Celular na sala de aula',
  ['Você já tentou prestar atenção na aula com o celular vibrando no bolso?', 'Na nossa opinião, o celular atrapalha mais do que ajuda durante as aulas.', 'Isso acontece por causa das distrações e da falta de combinados sobre o seu uso.'],
  ['Em primeiro lugar, o celular é uma fonte enorme de distração.', 'Isso acontece porque jogos e mensagens chamam a atenção a todo momento.', 'Por exemplo, basta uma notificação para o aluno perder a explicação inteira da professora.', 'Assim, quem fica no celular aprende menos.'],
  ['Portanto, o celular deve ficar guardado durante as aulas.', 'Para isso, a escola e os alunos podem criar juntos regras claras de uso,', 'como guardar o aparelho numa caixa e usá-lo só em atividades pedidas pelo professor,', 'para que a tecnologia ajude, em vez de atrapalhar.'])
S(F, '⏰ Um recreio maior',
  ['Quinze minutos dão para lanchar, brincar e ainda ir ao banheiro?', 'Para nós, o recreio deveria ser um pouco maior.', 'Afinal, brincar descansa a cabeça e melhora a convivência entre os colegas.'],
  ['Em primeiro lugar, o cérebro precisa de pausas para aprender melhor.', 'Isso acontece porque, depois de muito tempo prestando atenção, a concentração diminui.', 'Por exemplo, depois de correr e conversar no pátio, a turma volta mais animada para a aula.', 'Dessa forma, um recreio maior também ajuda nos estudos.'],
  ['Portanto, aumentar o recreio pode deixar a escola mais saudável e divertida.', 'Para isso, a direção pode ouvir o grêmio estudantil e reorganizar os horários,', 'trocando alguns minutos de entrada ou saída,', 'a fim de que os alunos brinquem mais sem perder aulas.'])
S(F, '🎮 Videogame: herói ou vilão?',
  ['Imagine passar a tarde inteira vencendo chefões no videogame.', 'Para nós, jogar faz bem, desde que seja na medida certa.', 'O problema não é o jogo, mas o exagero e a falta de horários.'],
  ['Em primeiro lugar, muitos jogos desenvolvem o raciocínio e o trabalho em equipe.', 'Isso acontece porque o jogador precisa pensar em estratégias e combinar ações com os amigos.', 'Por exemplo, em jogos de construção, a turma planeja cidades inteiras juntos.', 'Assim, o videogame também pode ensinar.'],
  ['Portanto, o videogame é um aliado quando tem limites.', 'Para isso, as famílias e os jovens podem combinar um horário para jogar,', 'deixando a lição, o sono e as brincadeiras ao ar livre em primeiro lugar,', 'para que a diversão não vire um problema.'])
S(F, '🐶 Animais abandonados',
  ['Você já viu um cachorro sozinho na rua, com fome e frio?', 'Na nossa opinião, abandonar um animal é uma atitude cruel e irresponsável.', 'Esse problema acontece por falta de planejamento das famílias e de informação.'],
  ['Em primeiro lugar, muita gente adota um filhote sem pensar no futuro.', 'Isso acontece porque o animal cresce, come mais e precisa de veterinário.', 'Por exemplo, muitos animais são deixados na rua quando a família viaja nas férias.', 'Assim, a falta de planejamento vira abandono.'],
  ['Portanto, ter um animal exige amor e responsabilidade.', 'Para isso, a prefeitura e as ONGs podem fazer campanhas de adoção consciente e castração gratuita,', 'com palestras nas escolas e mutirões nos bairros,', 'a fim de diminuir o número de animais nas ruas.'])
S(F, '🦸 Super-heróis como exemplo',
  ['Quem nunca quis ter superpoderes como os heróis dos filmes?', 'Para nós, os super-heróis podem ser bons exemplos, mas não em tudo.', 'Eles ensinam coragem e amizade, porém às vezes resolvem tudo na base da briga.'],
  ['Em primeiro lugar, os heróis mostram que ajudar os outros é importante.', 'Isso acontece porque eles arriscam a própria segurança para salvar pessoas.', 'Por exemplo, o Homem-Aranha repete que “com grandes poderes vêm grandes responsabilidades”.', 'Dessa forma, os jovens aprendem sobre responsabilidade.'],
  ['Portanto, os super-heróis inspiram, mas precisam ser vistos com atenção.', 'Para isso, famílias e professores podem conversar com os jovens sobre os filmes,', 'mostrando que heróis de verdade também são bombeiros, médicos e professores,', 'para que todos percebam que é possível ser herói sem superpoderes.'])
S(F, '🥗 Lanche saudável na escola',
  ['Salgadinho com refrigerante é gostoso, mas dá energia para estudar?', 'Na nossa opinião, a escola deve oferecer lanches mais saudáveis.', 'Comer bem melhora a saúde e a atenção nas aulas.'],
  ['Em primeiro lugar, alimentos ultraprocessados fazem mal à saúde.', 'Isso acontece porque têm muito açúcar, sal e gordura.', 'Por exemplo, depois de um lanche cheio de açúcar, muitos alunos ficam agitados e depois cansados.', 'Assim, a alimentação influencia o aprendizado.'],
  ['Portanto, a cantina pode ser saudável e gostosa ao mesmo tempo.', 'Para isso, a escola e os nutricionistas podem criar um cardápio com frutas, sucos e lanches naturais,', 'com degustações e votação dos alunos,', 'para que comer bem vire um hábito divertido.'])
S(F, '👕 Uniforme escolar',
  ['Você já reparou que, com uniforme, ninguém compara a roupa de marca do colega?', 'Para nós, o uniforme escolar deve continuar sendo usado.', 'Ele diminui as comparações e ajuda na segurança dos alunos.'],
  ['Em primeiro lugar, o uniforme deixa todos iguais na escola.', 'Isso acontece porque ninguém é julgado pela roupa que tem.', 'Por exemplo, um aluno que não tem roupas caras não fica com vergonha.', 'Dessa forma, o uniforme ajuda a evitar o bullying.'],
  ['Portanto, o uniforme é importante para a convivência na escola.', 'Para isso, as secretarias de educação podem distribuir uniformes gratuitos e confortáveis,', 'ouvindo a opinião dos alunos sobre os modelos,', 'a fim de que todos usem o uniforme com orgulho.'])
S(F, '🤖 Inteligência artificial na lição',
  ['Já pensou em um robô fazendo toda a sua lição em segundos?', 'Na nossa opinião, a inteligência artificial pode ajudar, mas não pode fazer a tarefa pelo aluno.', 'Quem precisa aprender é o estudante, e não a máquina.'],
  ['Em primeiro lugar, copiar respostas prontas impede a aprendizagem.', 'Isso acontece porque o cérebro só aprende quando pensa e treina.', 'Por exemplo, um aluno que copia a redação não aprende a escrever sozinho para a prova.', 'Assim, o atalho vira um prejuízo.'],
  ['Portanto, a inteligência artificial deve ser usada com responsabilidade.', 'Para isso, os professores podem ensinar a usá-la para tirar dúvidas e revisar textos,', 'combinando regras claras em cada atividade,', 'para que a tecnologia ajude o aluno a aprender mais.'])
S(F, '♻️ O lixo da escola',
  ['Para onde vão os copinhos, papéis de bala e restos de lanche do recreio?', 'Para nós, a escola pode e deve cuidar melhor do lixo que produz.', 'Com coleta seletiva e menos desperdício, o ambiente fica mais limpo.'],
  ['Em primeiro lugar, muito lixo da escola poderia ser reciclado.', 'Isso acontece porque papel, plástico e latinhas podem virar novos produtos.', 'Por exemplo, uma escola com lixeiras coloridas consegue separar quase todo o material do recreio.', 'Dessa forma, menos lixo vai para os lixões.'],
  ['Portanto, cuidar do lixo é tarefa de todos na escola.', 'Para isso, a direção e os alunos podem criar uma equipe de coleta seletiva e uma composteira,', 'com cartazes e gincanas,', 'a fim de transformar a escola em exemplo para o bairro.'])
S(F, '📚 Ler por diversão',
  ['Você já leu um livro tão bom que não conseguiu parar?', 'Na nossa opinião, a leitura precisa ser divertida para virar hábito.', 'Quando o aluno escolhe o que ler, a leitura fica muito mais prazerosa.'],
  ['Em primeiro lugar, ler amplia a imaginação e o vocabulário.', 'Isso acontece porque cada livro leva o leitor a lugares e palavras novas.', 'Por exemplo, quem lê histórias de aventura escreve redações mais criativas.', 'Assim, a leitura ajuda em todas as matérias.'],
  ['Portanto, a escola deve incentivar a leitura por prazer.', 'Para isso, a biblioteca pode fazer clubes de leitura, trocas de livros e sorteios,', 'deixando os alunos escolherem gibis, mangás e romances,', 'para que ler se torne um hábito para a vida toda.'])
S(F, '🤝 Bullying',
  ['Uma “brincadeira” pode machucar mais do que um tombo?', 'Para nós, o bullying é uma violência e precisa ser levado a sério.', 'Ele deixa marcas nas vítimas e piora o clima de toda a turma.'],
  ['Em primeiro lugar, o bullying faz a vítima sofrer em silêncio.', 'Isso acontece porque ela sente medo e vergonha de contar o que está acontecendo.', 'Por exemplo, muitos alunos começam a faltar às aulas para fugir das provocações.', 'Assim, o bullying prejudica até os estudos.'],
  ['Portanto, todos precisam combater o bullying.', 'Para isso, a escola pode criar rodas de conversa e um canal para pedir ajuda,', 'incentivando quem assiste a não rir e a avisar um adulto,', 'a fim de que a escola seja um lugar seguro para todos.'])
S(F, '⚽ Esporte para todos',
  ['Por que os mesmos alunos são sempre escolhidos primeiro no time?', 'Na nossa opinião, a Educação Física deve incluir todos os alunos.', 'O esporte serve para a saúde e para a amizade, e não só para quem joga bem.'],
  ['Em primeiro lugar, a exclusão desanima quem tem menos habilidade.', 'Isso acontece porque ninguém gosta de ficar sempre no banco.', 'Por exemplo, um aluno deixado de fora pode passar a odiar as aulas de Educação Física.', 'Dessa forma, ele perde os benefícios do esporte.'],
  ['Portanto, o esporte na escola deve ser para todos.', 'Para isso, os professores podem sortear os times e variar as modalidades,', 'incluindo jogos cooperativos em que ninguém é eliminado,', 'para que cada aluno descubra a atividade de que mais gosta.'])

E = 'eja'
S(E, '📖 Voltar a estudar depois de adulto',
  ['Depois de um dia inteiro de trabalho, muitos adultos ainda encaram a sala de aula à noite.', 'Voltar a estudar é um desafio, mas também é uma conquista.', 'O cansaço e a falta de tempo pesam, porém o estudo abre novas portas.'],
  ['Em primeiro lugar, estudar melhora as chances no mercado de trabalho.', 'Isso acontece porque muitas vagas exigem o ensino fundamental ou médio completo.', 'Por exemplo, com o diploma, um trabalhador pode concorrer a uma promoção na empresa.', 'Assim, o estudo muda a vida da família inteira.'],
  ['Portanto, é preciso apoiar quem volta a estudar.', 'Para isso, o governo e as empresas podem oferecer horários flexíveis e transporte,', 'além de turmas de EJA perto do trabalho e de casa,', 'a fim de que ninguém precise escolher entre trabalhar e estudar.'])
S(E, '🛵 Trabalho informal e direitos',
  ['Entregadores, diaristas e vendedores trabalham muito, mas muitas vezes sem carteira assinada.', 'O trabalho informal deixa milhões de brasileiros sem proteção.', 'Sem direitos, uma doença ou acidente pode deixar a família sem renda.'],
  ['Em primeiro lugar, o trabalhador informal não tem férias, 13º salário nem FGTS.', 'Isso acontece porque não existe um contrato que garanta esses direitos.', 'Por exemplo, um entregador que se machuca fica sem ganhar nada até se recuperar.', 'Dessa forma, a informalidade aumenta a insegurança.'],
  ['Portanto, é necessário proteger quem trabalha na informalidade.', 'Para isso, o governo pode divulgar o MEI e facilitar a contribuição ao INSS,', 'por meio de campanhas e atendimento nos bairros,', 'para que todos tenham direito à aposentadoria e ao auxílio-doença.'])
S(E, '🛒 O preço dos alimentos',
  ['Com o mesmo dinheiro, o carrinho do mercado sai cada vez mais vazio.', 'O preço dos alimentos pesa muito no orçamento das famílias brasileiras.', 'Por isso, é preciso combinar políticas públicas e planejamento em casa.'],
  ['Em primeiro lugar, a alta dos preços atinge mais quem ganha menos.', 'Isso acontece porque as famílias pobres gastam a maior parte da renda com comida.', 'Por exemplo, quando o arroz e o feijão sobem, sobra menos dinheiro para o transporte e o remédio.', 'Assim, a inflação aumenta a desigualdade.'],
  ['Portanto, garantir comida na mesa é um dever de todos.', 'Para isso, o governo pode apoiar a agricultura familiar e as feiras populares,', 'enquanto as escolas ensinam a fazer lista de compras e a comparar preços,', 'a fim de proteger o orçamento das famílias.'])
S(E, '🏥 A importância do SUS',
  ['Da vacina da criança ao remédio do avô, o SUS está presente na vida dos brasileiros.', 'O Sistema Único de Saúde é uma conquista que precisa ser valorizada.', 'Apesar das filas, ele garante atendimento gratuito para todos.'],
  ['Em primeiro lugar, o SUS atende quem não pode pagar um plano de saúde.', 'Isso acontece porque a Constituição diz que a saúde é direito de todos e dever do Estado.', 'Por exemplo, cirurgias, vacinas e tratamentos caros são feitos de graça pelo SUS.', 'Dessa forma, o sistema salva milhões de vidas.'],
  ['Portanto, o SUS deve ser defendido e melhorado.', 'Para isso, os governos precisam investir em médicos e postos de saúde,', 'com a participação da população nos conselhos de saúde,', 'para que o atendimento seja mais rápido e de qualidade.'])
S(E, '📲 Golpes pelo celular',
  ['“Oi, mãe, troquei de número.” Uma mensagem assim já enganou muita gente.', 'Os golpes pelo celular causam grandes prejuízos às famílias.', 'Eles se aproveitam da pressa, da emoção e da falta de informação.'],
  ['Em primeiro lugar, os criminosos usam a emoção para enganar.', 'Isso acontece porque a vítima, preocupada, age rápido sem desconfiar.', 'Por exemplo, muita gente faz um Pix achando que está ajudando um filho em apuros.', 'Assim, o golpe dá certo antes que a pessoa pense.'],
  ['Portanto, é preciso se proteger dos golpes digitais.', 'Para isso, bancos e escolas podem ensinar a confirmar pedidos por ligação,', 'com cartilhas simples e oficinas nos bairros,', 'a fim de que ninguém perca o dinheiro do mês.'])
S(E, '🚌 Transporte para quem trabalha',
  ['Muitos trabalhadores acordam às quatro da manhã para chegar ao serviço às sete.', 'O transporte público ainda é um grande desafio nas cidades brasileiras.', 'Ônibus lotados, atrasos e tarifas caras cansam antes de o dia começar.'],
  ['Em primeiro lugar, o tempo perdido no trânsito prejudica a vida das pessoas.', 'Isso acontece porque sobram menos horas para descansar, estudar e ficar com a família.', 'Por exemplo, quem passa quatro horas por dia no ônibus mal consegue frequentar a escola à noite.', 'Dessa forma, o transporte ruim limita as oportunidades.'],
  ['Portanto, o transporte coletivo precisa melhorar.', 'Para isso, as prefeituras podem criar faixas exclusivas e aumentar a frota de ônibus,', 'ouvindo os usuários sobre horários e linhas,', 'para que o trabalhador gaste menos tempo e dinheiro no caminho.'])
S(E, '👩‍👧 A dupla jornada das mulheres',
  ['Depois de oito horas de trabalho, muitas mulheres ainda cozinham, lavam e cuidam dos filhos.', 'A dupla jornada feminina é uma injustiça que precisa acabar.', 'O trabalho de casa deve ser dividido por toda a família.'],
  ['Em primeiro lugar, as tarefas domésticas ainda ficam quase todas com as mulheres.', 'Isso acontece por causa de uma cultura antiga que vê a casa como responsabilidade feminina.', 'Por exemplo, muitas mães não conseguem estudar porque não têm com quem deixar os filhos.', 'Assim, a desigualdade dentro de casa limita a vida delas.'],
  ['Portanto, é preciso dividir o cuidado com a casa e com os filhos.', 'Para isso, o governo pode ampliar as vagas em creches,', 'enquanto escolas e mídia incentivam a divisão das tarefas em família,', 'a fim de garantir às mulheres tempo para estudar, trabalhar e descansar.'])
S(E, '📝 Ler e escrever para ser cidadão',
  ['Ler um contrato, uma bula ou uma conta de luz faz parte do dia a dia.', 'Saber ler e escrever bem é fundamental para exercer a cidadania.', 'Quem domina a leitura se defende melhor e participa mais da sociedade.'],
  ['Em primeiro lugar, a leitura protege contra golpes e abusos.', 'Isso acontece porque quem lê com atenção percebe cláusulas e cobranças injustas.', 'Por exemplo, uma pessoa que lê o contrato evita assinar uma dívida que não queria.', 'Dessa forma, ler é uma forma de se proteger.'],
  ['Portanto, garantir a alfabetização de todos é garantir cidadania.', 'Para isso, o governo pode ampliar as turmas de EJA e as bibliotecas comunitárias,', 'com horários à noite e aos sábados,', 'para que todo adulto tenha autonomia para ler o mundo.'])
S(E, '👵 Planejar a aposentadoria',
  ['Muita gente trabalha a vida inteira e, no fim, descobre que não vai conseguir se aposentar.', 'Planejar a aposentadoria é essencial para um futuro tranquilo.', 'Para isso, é preciso informação e contribuição para a previdência.'],
  ['Em primeiro lugar, quem trabalha sem contribuir fica desprotegido na velhice.', 'Isso acontece porque a aposentadoria depende do tempo de contribuição ao INSS.', 'Por exemplo, uma vendedora autônoma que nunca contribuiu pode depender da ajuda dos filhos.', 'Assim, a falta de planejamento traz insegurança.'],
  ['Portanto, é importante pensar no futuro desde já.', 'Para isso, o INSS e as escolas podem explicar de forma simples como contribuir,', 'por meio de oficinas e atendimento nos bairros,', 'a fim de garantir uma velhice digna a todos os trabalhadores.'])

N = 'enem'
S(N, '🤖 Inteligência artificial e o futuro do trabalho',
  ['No filme “Ela”, um homem se apaixona por um sistema operacional, e a ficção parece cada vez mais próxima da realidade.', 'No Brasil atual, a inteligência artificial transforma o trabalho e exige preparo da sociedade.', 'Nesse contexto, destacam-se o risco de desemprego e a falta de qualificação digital.'],
  ['Em primeiro lugar, a automação ameaça funções repetitivas.', 'Isso ocorre porque máquinas realizam tarefas de atendimento e de escritório mais rápido e mais barato.', 'Como alertou o historiador Yuval Harari, a tecnologia pode criar uma “classe dos inúteis” se não houver requalificação.', 'Assim, sem preparo, muitos trabalhadores ficarão para trás.'],
  ['Portanto, é necessário preparar os brasileiros para a era da inteligência artificial.', 'Para isso, o Ministério da Educação deve incluir o letramento digital nas escolas e nos cursos técnicos,', 'por meio de parcerias com empresas de tecnologia,', 'a fim de que a inovação gere oportunidades, e não exclusão.'])
S(N, '😂 A cultura dos memes e a informação',
  ['Os memes, que nasceram como piadas na internet, hoje influenciam debates políticos e sociais.', 'Embora divirtam, eles também podem espalhar desinformação e preconceito.', 'Esse problema decorre da rapidez do compartilhamento e da falta de leitura crítica.'],
  ['Em primeiro lugar, o humor faz o conteúdo circular sem checagem.', 'Isso ocorre porque o meme é curto, engraçado e compartilhado por impulso.', 'Segundo o sociólogo Zygmunt Bauman, vivemos tempos líquidos, em que tudo é consumido e descartado rapidamente.', 'Desse modo, mentiras disfarçadas de piada ganham alcance enorme.'],
  ['Portanto, é preciso aprender a rir sem deixar de pensar.', 'Para isso, as escolas devem promover a educação midiática,', 'com oficinas de checagem de fatos e análise de memes,', 'a fim de formar leitores críticos nas redes sociais.'])
S(N, '👗 Fast fashion e consumo consciente',
  ['Roupas novas a preço baixo toda semana: essa é a promessa da chamada “moda rápida”.', 'No entanto, o fast fashion gera impactos ambientais e sociais graves.', 'Entre eles, destacam-se o descarte de tecidos e a exploração de trabalhadores.'],
  ['Em primeiro lugar, a produção acelerada aumenta o lixo têxtil.', 'Isso ocorre porque peças de baixa qualidade são usadas poucas vezes e logo descartadas.', 'O deserto do Atacama, no Chile, tornou-se símbolo desse problema, com montanhas de roupas abandonadas.', 'Assim, o consumo exagerado agride o meio ambiente.'],
  ['Portanto, é urgente estimular o consumo consciente.', 'Para isso, o governo deve exigir rótulos sobre a origem das roupas,', 'enquanto a mídia divulga brechós e o conserto de peças,', 'a fim de reduzir o desperdício e a exploração na indústria da moda.'])
S(N, '🎧 A economia da atenção',
  ['Rolar a tela sem parar virou um hábito de milhões de brasileiros.', 'Esse comportamento revela a chamada economia da atenção, em que o tempo do usuário vale dinheiro.', 'Nesse cenário, destacam-se os algoritmos viciantes e os prejuízos à saúde mental.'],
  ['Em primeiro lugar, as plataformas são desenhadas para prender o usuário.', 'Isso ocorre porque quanto mais tempo ele permanece conectado, mais anúncios vê.', 'O documentário “O Dilema das Redes” mostra como ex-funcionários de grandes empresas denunciam essas estratégias.', 'Assim, a atenção se torna uma mercadoria.'],
  ['Portanto, é preciso recuperar o controle sobre o próprio tempo.', 'Para isso, o Estado deve regular o design viciante das plataformas,', 'enquanto escolas e famílias ensinam o uso equilibrado das telas,', 'a fim de proteger a saúde mental, principalmente dos jovens.'])
S(N, '🌡️ Calor extremo e as cidades',
  ['Ondas de calor cada vez mais intensas têm transformado o verão em ameaça à saúde.', 'As cidades brasileiras não estão preparadas para as mudanças climáticas.', 'Isso se deve à falta de áreas verdes e à desigualdade na ocupação urbana.'],
  ['Em primeiro lugar, os bairros pobres sofrem mais com o calor.', 'Isso ocorre porque têm menos árvores, mais asfalto e casas pouco ventiladas.', 'O Acordo de Paris, de 2015, já alertava para a necessidade de adaptação das cidades ao clima.', 'Desse modo, o calor extremo aprofunda a desigualdade.'],
  ['Portanto, as cidades precisam se adaptar ao novo clima.', 'Para isso, as prefeituras devem ampliar a arborização e os espaços de resfriamento,', 'priorizando as periferias,', 'a fim de proteger a vida da população mais vulnerável.'])
S(N, '🎮 E-sports: esporte ou só diversão?',
  ['Estádios lotados para assistir a partidas de videogame já são realidade no Brasil.', 'Os e-sports se tornaram um fenômeno cultural e econômico que merece reconhecimento.', 'Contudo, ainda enfrentam preconceito e falta de regulamentação.'],
  ['Em primeiro lugar, os e-sports movimentam empregos e renda.', 'Isso ocorre porque envolvem atletas, técnicos, narradores e equipes de produção.', 'Times brasileiros já conquistaram títulos mundiais, mostrando o talento nacional.', 'Assim, a modalidade abre novas carreiras para os jovens.'],
  ['Portanto, os e-sports devem ser reconhecidos e regulamentados.', 'Para isso, o Ministério do Esporte pode criar regras de proteção aos atletas,', 'com limites de jornada e acompanhamento de saúde,', 'a fim de que a profissão cresça de forma segura e saudável.'])
d = lambda n, t: {'titulo': t, 'sequencias': B[n]}
json.dump(d('fund', 'Monte o parágrafo: 6º ao 9º ano (temas divertidos)'), open(os.path.join(RAIZ, 'dados', 'red-paragrafo-fund.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(d('enem', 'Monte o parágrafo: ENEM (temas atuais)'), open(os.path.join(RAIZ, 'dados', 'red-paragrafo-enem.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(d('eja', 'Monte o parágrafo: EJA (temas da vida adulta)'), open(os.path.join(RAIZ, 'dados', 'red-paragrafo-eja.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
ind = json.load(open(os.path.join(RAIZ, 'dados', 'indice.json'), encoding='utf-8'))
l = ind['morfo-ordene']; nomes = {x['arquivo'] for x in l}
for f, t, n in [('red-paragrafo-fund.json', '🎒 Monte o parágrafo: 6º ao 9º ano (temas divertidos)', 'fund'), ('red-paragrafo-enem.json', '🎓 Monte o parágrafo: ENEM (temas atuais)', 'enem'), ('red-paragrafo-eja.json', '🧑‍🏫 Monte o parágrafo: EJA (vida adulta)', 'eja')]:
    if f not in nomes: l.append({'arquivo': f, 'titulo': t, 'qtd': len(B[n])})
json.dump(ind, open(os.path.join(RAIZ, 'dados', 'indice.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
open(os.path.join(RAIZ, 'dados', 'indice.json'), 'a').write('\n')
print({k: (len(v) // 3, len(v), sum(len(s['itens']) for s in v)) for k, v in B.items()})
