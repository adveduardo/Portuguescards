/* quiz-sala.js — sala com os iPads no mesmo formato do Quiz ao Vivo (os iPads usam o jogar.html sem mudança).
   Cada jogo do telão (Corrida das Equipes, Duelo de Monstrinhos) só desenha o seu jeito de mostrar o resultado.
   Uso: const qs = QuizSala({aoMudar, aoTique, aoResultado, total}); qs.criar(cb); qs.pergunta(p, n, total, tempo, totais);
   qs.encerrarPergunta(); qs.fim(totais, posicoes?); qs.reiniciar(); qs.encerrar() */
(function(){
  'use strict';
  window.QuizSala = function(op){
    const AV = window.AoVivo, api = {sala: null, arvore: {}, ouvinte: null, n: 0, p: null, encerrada: true};
    let timer = null, fimEm = 0, pid = 0, calculada = 0, tempoAtual = 20;
    api.grupos = () => api.arvore.grupos || {};
    api.respostas = () => ((api.arvore.respostas || {})['q' + api.n]) || {};
    api.criar = cb => {
      Rede.novaSala({jogo: 'quiz', estado: {fase: 'espera'}}, (err, codigo) => {
        if (err) return cb(err);
        api.sala = codigo;
        api.ouvinte = Rede.ouvir('salas/' + codigo, v => {
          api.arvore = v || {};
          if (op.aoMudar) op.aoMudar();
          if (!api.encerrada){ const ids = Object.keys(api.grupos()), r = api.respostas(); if (ids.length && ids.every(id => r[id])) api.encerrarPergunta(); }
        });
        cb(null, codigo);
      });
    };
    api.pergunta = (p, n, total, tempo, totais) => {
      api.p = p; api.n = n; api.encerrada = false; pid++; tempoAtual = tempo;
      Rede.gravar(`salas/${api.sala}/estado`, {fase: 'pergunta', n, total, opcoes: p.ops, pergunta: p.p, textoNosTablets: true, tempo, inicio: Rede.TS, totais: totais || {}});
      clearInterval(timer); fimEm = Date.now() + tempo * 1000;
      const tique = () => {
        const s = Math.max(0, Math.ceil((fimEm - Date.now()) / 1000));
        if (op.aoTique) op.aoTique(s);
        if (!s) api.encerrarPergunta();
      };
      tique(); timer = setInterval(tique, 1000);
    };
    api.encerrarPergunta = () => {
      if (api.encerrada) return;
      api.encerrada = true; clearInterval(timer);
      const meu = pid;
      setTimeout(() => Rede.lerInsistindo('salas/' + api.sala, (err, v) => {   // um instante para chegarem as respostas do último segundo
        if (meu !== pid || calculada === meu) return;
        calculada = meu; if (v) api.arvore = v;
        calcular();
      }), 1200);
    };
    function calcular(){
      const g = api.grupos(), ids = Object.keys(g), resp = api.respostas(), p = api.p;
      const inicio = api.arvore.estado && typeof api.arvore.estado.inicio === 'number' ? api.arvore.estado.inicio : null;
      const resultados = {}, certosPorTempo = [];
      ids.forEach(id => {
        const r = resp[id];
        if (!r){ resultados[id] = {respondeu: false, certo: false, pontos: 0}; return; }
        const certo = r.o === p.ok, t = inicio && typeof r.t === 'number' ? Math.max(0, r.t - inicio) : tempoAtual * 1000;
        resultados[id] = {respondeu: true, certo, pontos: 0, ms: t, opcao: r.o};
        if (certo) certosPorTempo.push(id);
      });
      certosPorTempo.sort((a, b) => resultados[a].ms - resultados[b].ms);
      const totais = op.aoResultado({p, n: api.n, resultados, certosPorTempo, grupos: g}) || {};
      const pos = AV.posicoes(totais);
      ids.forEach(id => { resultados[id].posicao = pos[id]; delete resultados[id].ms; });
      Rede.gravar(`salas/${api.sala}/estado`, {fase: 'resultado', n: api.n, total: op.total ? op.total() : api.n, correta: p.ok, resultados, totais});
    }
    api.fim = (totais, posicoes) => { clearInterval(timer); api.encerrada = true; pid++; Rede.gravar(`salas/${api.sala}/estado`, {fase: 'fim', totais, posicoes: posicoes || AV.posicoes(totais)}); };
    // nova partida na mesma sala: apaga as respostas antigas e põe os iPads em espera
    api.reiniciar = () => {
      clearInterval(timer); api.encerrada = true; api.n = 0; api.p = null; pid++;
      Rede.apagar(`salas/${api.sala}/respostas`);
      Rede.gravar(`salas/${api.sala}/estado`, {fase: 'espera'});
    };
    api.encerrar = () => {
      clearInterval(timer); api.encerrada = true;
      if (api.ouvinte) api.ouvinte.fechar();
      if (api.sala) Rede.apagar('salas/' + api.sala);
      api.sala = null; api.arvore = {};
    };
    return api;
  };
})();
