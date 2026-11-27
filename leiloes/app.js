/* Mapa de Leilões — mapa, filtros, lista, ficha do imóvel e cadastro manual.
   Dados: dados/imoveis.json (coletados pelo robô ou exemplos) + imóveis que a pessoa adiciona (guardados no navegador). */
(function () {
  'use strict';

  var TIPOS = ['Apartamento', 'Casa', 'Terreno', 'Comercial', 'Rural', 'Galpão', 'Outro'];
  var ICONES = {Apartamento: '🏢', Casa: '🏠', Terreno: '🌳', Comercial: '🏪', Rural: '🚜', 'Galpão': '🏭', Outro: '📦'};
  var MODALIDADES = ['Judicial', 'Extrajudicial', 'Venda direta'];
  var UFS = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
  var CHAVE_MEUS = 'leiloes.meus', CHAVE_FAVS = 'leiloes.favs', CHAVE_FILTROS = 'leiloes.filtros', CHAVE_TEMA = 'leiloes.tema';

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var ler = function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  var gravar = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]; }); };
  var brl = function (v) { return v == null || isNaN(v) ? '—' : v.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', maximumFractionDigits: v >= 1000 ? 0 : 2}); };
  var dataBR = function (d) { if (!d) return '—'; var p = d.slice(0, 10).split('-'); return p[2] + '/' + p[1] + '/' + p[0]; };
  var hoje = function () { var d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  var paraData = function (s) { if (!s) return null; var p = s.slice(0, 10).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
  var semAcento = function (s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  var urlSegura = function (u) { return /^https?:\/\//i.test(u || '') ? u : ''; };

  var base = [], leiloeiros = [], meus = ler(CHAVE_MEUS, []), favs = ler(CHAVE_FAVS, []);
  var todos = [], filtrados = [], marcadores = {}, ativoId = null;

  /* ---------- cálculo do lance vigente / desconto ---------- */
  function preparar(im) {
    var pracas = (im.pracas || []).filter(function (p) { return p && (p.data || p.valor); })
      .sort(function (a, b) { return (a.data || '').localeCompare(b.data || ''); });
    var h = hoje(), vigente = null;
    for (var i = 0; i < pracas.length; i++) { var d = paraData(pracas[i].data); if (!d || d >= h) { vigente = pracas[i]; break; } }
    im._pracas = pracas;
    im._encerrado = pracas.length > 0 && !vigente;
    var ref = vigente || pracas[pracas.length - 1] || {};
    im._lance = ref.valor != null ? +ref.valor : (im.lance_minimo != null ? +im.lance_minimo : null);
    im._data = ref.data || null;
    im._desc = im.avaliacao && im._lance != null ? Math.max(0, 1 - im._lance / im.avaliacao) : null;
    im._busca = semAcento([im.titulo, im.endereco, im.bairro, im.cidade, im.uf, im.leiloeiro, im.tipo, im.processo].join(' '));
    return im;
  }
  function corDesc(d) { return d == null ? '#7f8c9d' : d >= 0.5 ? '#1f9d55' : d >= 0.3 ? '#d98a00' : '#c0392b'; }

  /* ---------- mapa ---------- */
  var mapa = L.map('mapa', {zoomControl: true}).setView([-15.8, -50], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);
  var grupo = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 45});
  mapa.addLayer(grupo);

  function iconeDe(im) {
    var txt = im._desc != null ? Math.round(im._desc * 100) + '%' : '•';
    return L.divIcon({className: '', iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24],
      html: '<div class="pino" style="background:' + corDesc(im._desc) + '"><b>' + txt + '</b></div>'});
  }

  /* ---------- filtros ---------- */
  var F = {};
  function montarFiltros() {
    UFS.forEach(function (u) { $('#fUf').insertAdjacentHTML('beforeend', '<option>' + u + '</option>'); });
    TIPOS.forEach(function (t) { $('#fTipo').insertAdjacentHTML('beforeend', '<span class="chip" data-v="' + t + '">' + ICONES[t] + ' ' + t + '</span>'); });
    MODALIDADES.forEach(function (t) { $('#fModal').insertAdjacentHTML('beforeend', '<span class="chip" data-v="' + t + '">' + t + '</span>'); });
    $$('.chips .chip').forEach(function (c) { c.addEventListener('click', function () { c.classList.toggle('on'); aplicar(); }); });
    ['fUf', 'fCidade', 'fMin', 'fMax', 'fDesc', 'fData', 'fLeiloeiro', 'fFinan', 'fFgts', 'fDesocup', 'fFuturos', 'fFavs', 'fExemplos', 'ordem']
      .forEach(function (id) { $('#' + id).addEventListener(id === 'fDesc' || /^f(Min|Max)$/.test(id) ? 'input' : 'change', aplicar); });
    $('#fUf').addEventListener('change', function () { $('#fCidade').value = ''; preencherCidades(); aplicar(); });
    var t; $('#busca').addEventListener('input', function () { clearTimeout(t); t = setTimeout(aplicar, 150); });
    $('#bLimpar').addEventListener('click', function () {
      ['fUf', 'fCidade', 'fMin', 'fMax', 'fData', 'fLeiloeiro', 'busca'].forEach(function (id) { $('#' + id).value = ''; });
      $('#fDesc').value = 0; ['fFinan', 'fFgts', 'fDesocup', 'fFavs'].forEach(function (id) { $('#' + id).checked = false; });
      $('#fFuturos').checked = true; $('#fExemplos').checked = true;
      $$('.chips .chip.on').forEach(function (c) { c.classList.remove('on'); });
      preencherCidades(); aplicar();
    });
    // restaura filtros salvos
    var s = ler(CHAVE_FILTROS, null);
    if (s) {
      Object.keys(s.campos || {}).forEach(function (id) { var el = $('#' + id); if (!el) return; if (el.type === 'checkbox') el.checked = s.campos[id]; else el.value = s.campos[id]; });
      $$('#fTipo .chip').forEach(function (c) { if ((s.tipos || []).indexOf(c.dataset.v) >= 0) c.classList.add('on'); });
      $$('#fModal .chip').forEach(function (c) { if ((s.modal || []).indexOf(c.dataset.v) >= 0) c.classList.add('on'); });
    }
  }
  function preencherCidades() {
    var uf = $('#fUf').value, atual = $('#fCidade').value, set = {};
    todos.forEach(function (im) { if (!uf || im.uf === uf) set[im.cidade] = 1; });
    var cs = Object.keys(set).filter(Boolean).sort(function (a, b) { return a.localeCompare(b, 'pt-BR'); });
    $('#fCidade').innerHTML = '<option value="">Todas</option>' + cs.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('');
    if (cs.indexOf(atual) >= 0) $('#fCidade').value = atual;
  }
  function preencherLeiloeiros() {
    var set = {};
    leiloeiros.forEach(function (l) { set[l.nome] = 1; });
    todos.forEach(function (im) { if (im.leiloeiro) set[im.leiloeiro] = 1; });
    var ns = Object.keys(set).sort(function (a, b) { return a.localeCompare(b, 'pt-BR'); }), atual = $('#fLeiloeiro').value;
    $('#fLeiloeiro').innerHTML = '<option value="">Todos</option>' + ns.map(function (n) { return '<option>' + esc(n) + '</option>'; }).join('');
    $('#fLeiloeiro').value = ns.indexOf(atual) >= 0 ? atual : '';
    $('#dlLeiloeiros').innerHTML = ns.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('');
  }
  function lerFiltros() {
    F = {
      q: semAcento($('#busca').value.trim()), uf: $('#fUf').value, cidade: $('#fCidade').value,
      tipos: $$('#fTipo .chip.on').map(function (c) { return c.dataset.v; }),
      modal: $$('#fModal .chip.on').map(function (c) { return c.dataset.v; }),
      min: parseFloat($('#fMin').value), max: parseFloat($('#fMax').value), desc: +$('#fDesc').value / 100,
      data: paraData($('#fData').value), leiloeiro: $('#fLeiloeiro').value,
      finan: $('#fFinan').checked, fgts: $('#fFgts').checked, desocup: $('#fDesocup').checked,
      futuros: $('#fFuturos').checked, favs: $('#fFavs').checked, exemplos: $('#fExemplos').checked
    };
    $('#fDescTxt').textContent = $('#fDesc').value + '%';
    var campos = {};
    ['fUf', 'fCidade', 'fMin', 'fMax', 'fDesc', 'fData', 'fLeiloeiro', 'ordem'].forEach(function (id) { campos[id] = $('#' + id).value; });
    ['fFinan', 'fFgts', 'fDesocup', 'fFuturos', 'fFavs', 'fExemplos'].forEach(function (id) { campos[id] = $('#' + id).checked; });
    gravar(CHAVE_FILTROS, {campos: campos, tipos: F.tipos, modal: F.modal});
  }
  function passa(im) {
    if (!F.exemplos && im.exemplo) return false;
    if (F.q && im._busca.indexOf(F.q) < 0) return false;
    if (F.uf && im.uf !== F.uf) return false;
    if (F.cidade && im.cidade !== F.cidade) return false;
    if (F.tipos.length && F.tipos.indexOf(im.tipo) < 0) return false;
    if (F.modal.length && F.modal.indexOf(im.modalidade) < 0) return false;
    if (!isNaN(F.min) && (im._lance == null || im._lance < F.min)) return false;
    if (!isNaN(F.max) && (im._lance == null || im._lance > F.max)) return false;
    if (F.desc > 0 && (im._desc == null || im._desc < F.desc)) return false;
    if (F.data && (!im._data || paraData(im._data) > F.data)) return false;
    if (F.leiloeiro && im.leiloeiro !== F.leiloeiro) return false;
    if (F.finan && !im.financiavel) return false;
    if (F.fgts && !im.fgts) return false;
    if (F.desocup && im.ocupado !== false) return false;
    if (F.futuros && im._encerrado) return false;
    if (F.favs && favs.indexOf(im.id) < 0) return false;
    return true;
  }
  var ORDENS = {
    desc: function (a, b) { return (b._desc == null ? -1 : b._desc) - (a._desc == null ? -1 : a._desc); },
    lanceAsc: function (a, b) { return (a._lance == null ? 1e15 : a._lance) - (b._lance == null ? 1e15 : b._lance); },
    lanceDesc: function (a, b) { return (b._lance || 0) - (a._lance || 0); },
    data: function (a, b) { return (a._data || '9999').localeCompare(b._data || '9999'); },
    recente: function (a, b) { return (b.adicionado || '').localeCompare(a.adicionado || ''); }
  };

  function aplicar() {
    lerFiltros();
    filtrados = todos.filter(passa).sort(ORDENS[$('#ordem').value] || ORDENS.desc);
    desenharLista(); desenharMapa();
  }

  /* ---------- lista ---------- */
  function cardHTML(im) {
    var foto = urlSegura(im.foto);
    var tags = [];
    if (im.exemplo) tags.push('<span class="tag ex">EXEMPLO</span>');
    if (im.modalidade) tags.push('<span class="tag">' + esc(im.modalidade) + '</span>');
    if (im._data) tags.push('<span class="tag">📅 ' + dataBR(im._data) + '</span>');
    if (im._encerrado) tags.push('<span class="tag">Encerrado</span>');
    if (im.financiavel) tags.push('<span class="tag">Financia</span>');
    if (im.fgts) tags.push('<span class="tag">FGTS</span>');
    if (im.ocupado === true) tags.push('<span class="tag">Ocupado</span>');
    if (im.ocupado === false) tags.push('<span class="tag">Desocupado</span>');
    return '<div class="card' + (im.id === ativoId ? ' ativo' : '') + '" data-id="' + esc(im.id) + '">' +
      '<div class="foto" style="' + (foto ? "background-image:url('" + esc(foto) + "')" : '') + '">' + (foto ? '' : (ICONES[im.tipo] || '🏠')) +
      '<button class="fav' + (favs.indexOf(im.id) >= 0 ? ' on' : '') + '" data-fav="' + esc(im.id) + '" title="Favoritar">★</button></div>' +
      '<div class="info"><h3>' + esc(im.titulo) + '</h3>' +
      '<div class="loc">' + esc([im.bairro, im.cidade + (im.uf ? '/' + im.uf : '')].filter(Boolean).join(' · ')) + '</div>' +
      '<div class="vals"><span class="lance">' + brl(im._lance) + '</span>' +
      (im.avaliacao ? '<span class="aval">' + brl(im.avaliacao) + '</span>' : '') +
      (im._desc != null ? '<span class="desc" style="background:' + corDesc(im._desc) + '">-' + Math.round(im._desc * 100) + '%</span>' : '') + '</div>' +
      '<div class="tags">' + tags.join('') + '</div></div></div>';
  }
  function desenharLista() {
    var n = filtrados.length;
    $('#contagem').textContent = n + (n === 1 ? ' imóvel' : ' imóveis');
    $('#cards').innerHTML = n ? filtrados.slice(0, 300).map(cardHTML).join('') +
      (n > 300 ? '<div class="vazio">Mostrando 300 de ' + n + '. Use os filtros para refinar.</div>' : '')
      : '<div class="vazio">Nenhum imóvel com esses filtros.<br>Tente afrouxar a busca ou adicione um imóvel.</div>';
  }
  $('#cards').addEventListener('click', function (e) {
    var f = e.target.closest('[data-fav]');
    if (f) { e.stopPropagation(); alternarFav(f.dataset.fav); return; }
    var c = e.target.closest('.card'); if (!c) return;
    var im = acha(c.dataset.id);
    focar(im); abrirFicha(im);
  });
  $('#cards').addEventListener('mouseover', function (e) {
    var c = e.target.closest('.card'); if (!c) return;
    var m = marcadores[c.dataset.id]; if (m && grupo.hasLayer(m) && m._icon) m._icon.style.zIndex = 9999;
  });
  function alternarFav(id) {
    var i = favs.indexOf(id); if (i >= 0) favs.splice(i, 1); else favs.push(id);
    gravar(CHAVE_FAVS, favs); aplicar();
    var b = $('#fichaCaixa [data-fav]'); if (b) b.classList.toggle('on', favs.indexOf(id) >= 0);
  }
  function acha(id) { for (var i = 0; i < todos.length; i++) if (todos[i].id === id) return todos[i]; return null; }

  /* ---------- mapa: marcadores ---------- */
  var primeiraVez = true;
  function desenharMapa() {
    grupo.clearLayers(); marcadores = {};
    var pts = [];
    filtrados.forEach(function (im) {
      if (im.lat == null || im.lng == null || isNaN(im.lat) || isNaN(im.lng)) return;
      var m = L.marker([+im.lat, +im.lng], {icon: iconeDe(im)});
      m.bindPopup('<b>' + esc(im.titulo) + '</b><br>' + esc(im.cidade) + '/' + esc(im.uf) + '<br>' + brl(im._lance) +
        (im._desc != null ? ' <span style="color:' + corDesc(im._desc) + ';font-weight:700">(-' + Math.round(im._desc * 100) + '%)</span>' : '') +
        '<br><a href="#" data-abre="' + esc(im.id) + '">Ver detalhes</a>');
      m.on('click', function () { marcarCard(im.id); });
      marcadores[im.id] = m; grupo.addLayer(m); pts.push([+im.lat, +im.lng]);
    });
    if (primeiraVez && pts.length) { mapa.fitBounds(pts, {padding: [30, 30], maxZoom: 13}); primeiraVez = false; }
  }
  mapa.on('popupopen', function (e) {
    var a = e.popup.getElement().querySelector('[data-abre]');
    if (a) a.addEventListener('click', function (ev) { ev.preventDefault(); abrirFicha(acha(a.dataset.abre)); });
  });
  function marcarCard(id) {
    ativoId = id;
    $$('.card').forEach(function (c) { c.classList.toggle('ativo', c.dataset.id === id); });
    var c = $('.card[data-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]');
    if (c) c.scrollIntoView({block: 'nearest', behavior: 'smooth'});
  }
  function focar(im) {
    var m = marcadores[im.id]; marcarCard(im.id);
    if (m) grupo.zoomToShowLayer(m, function () { m.openPopup(); });
  }
  /* ---------- ficha + calculadora ---------- */
  function abrirFicha(im) {
    if (!im) return;
    var foto = urlSegura(im.foto), link = urlSegura(im.url), meu = !!im._meu;
    var pr = im._pracas.map(function (p, i) {
      return '<div class="box"><small>' + (im.modalidade === 'Venda direta' ? 'Venda direta' : (i + 1) + 'ª praça') + ' · ' + dataBR(p.data) + '</small><strong>' + brl(p.valor != null ? +p.valor : null) + '</strong></div>';
    }).join('');
    var gmaps = im.lat != null ? 'https://www.google.com/maps?q=' + im.lat + ',' + im.lng
      : 'https://www.google.com/maps/search/' + encodeURIComponent([im.endereco, im.bairro, im.cidade, im.uf].filter(Boolean).join(', '));
    $('#fichaCaixa').innerHTML =
      '<div class="ficha-foto" style="' + (foto ? "background-image:url('" + esc(foto) + "')" : '') + '">' + (foto ? '' : (ICONES[im.tipo] || '🏠')) +
      '<button class="fechar" data-fecha-ficha>✕</button>' +
      '<button class="fav' + (favs.indexOf(im.id) >= 0 ? ' on' : '') + '" data-fav="' + esc(im.id) + '" style="top:10px;left:10px;right:auto;width:34px;height:34px;font-size:18px">★</button></div>' +
      '<div class="ficha-corpo">' +
      (im.exemplo ? '<p class="tag ex" style="display:inline-block;margin:0 0 8px">Dado de EXEMPLO — não é um leilão real</p>' : '') +
      '<h2>' + esc(im.titulo) + '</h2>' +
      '<div style="color:var(--suave)">' + esc([im.endereco, im.bairro, im.cidade + '/' + im.uf].filter(Boolean).join(' · ')) + '</div>' +
      '<div class="grade">' +
      '<div class="box"><small>Lance atual</small><strong>' + brl(im._lance) + '</strong></div>' +
      '<div class="box"><small>Avaliação</small><strong>' + brl(im.avaliacao) + '</strong></div>' +
      '<div class="box"><small>Desconto</small><strong style="color:' + corDesc(im._desc) + '">' + (im._desc != null ? Math.round(im._desc * 100) + '%' : '—') + '</strong></div>' +
      pr +
      (im.area ? '<div class="box"><small>Área</small><strong>' + esc(im.area) + ' m²</strong>' + (im._lance ? '<div style="font-size:12px;color:var(--suave)">' + brl(im._lance / im.area) + '/m²</div>' : '') + '</div>' : '') +
      (im.quartos != null ? '<div class="box"><small>Quartos / vagas</small><strong>' + esc(im.quartos) + ' / ' + esc(im.vagas == null ? '—' : im.vagas) + '</strong></div>' : '') +
      '<div class="box"><small>Tipo · modalidade</small><strong>' + esc(im.tipo || '—') + '</strong><div style="font-size:12px;color:var(--suave)">' + esc(im.modalidade || '') + '</div></div>' +
      '<div class="box"><small>Leiloeiro</small><strong style="font-size:13px">' + esc(im.leiloeiro || '—') + '</strong></div>' +
      '<div class="box"><small>Ocupação</small><strong>' + (im.ocupado === true ? 'Ocupado' : im.ocupado === false ? 'Desocupado' : 'Não informado') + '</strong></div>' +
      '<div class="box"><small>Pagamento</small><strong style="font-size:13px">' + ([im.financiavel ? 'Financiamento' : '', im.fgts ? 'FGTS' : ''].filter(Boolean).join(' · ') || 'À vista / ver edital') + '</strong></div>' +
      (im.processo ? '<div class="box"><small>Processo / matrícula</small><strong style="font-size:13px">' + esc(im.processo) + '</strong></div>' : '') +
      '</div>' +
      (im.obs ? '<p><b>Observações:</b> ' + esc(im.obs) + '</p>' : '') +
      '<details open><summary>🧮 Quanto vou gastar de verdade?</summary>' + calcHTML(im) + '</details>' +
      '<div class="acoes">' +
      (meu ? '<button class="btn" data-editar="' + esc(im.id) + '" style="margin-right:auto">✏️ Editar</button>' : '') +
      '<a class="btn" href="' + gmaps + '" target="_blank" rel="noopener">🗺️ Google Maps</a>' +
      (link ? '<a class="btn prim" href="' + esc(link) + '" target="_blank" rel="noopener">Ver no site do leiloeiro ↗</a>' : '') +
      '</div></div>';
    $('#ficha').classList.add('aberta');
    ligarCalc(im);
  }
  function calcHTML(im) {
    var l = im._lance || 0;
    return '<table class="calc">' +
      '<tr><td>Lance que pretendo dar</td><td><input data-c="lance" type="number" value="' + Math.round(l) + '" style="width:110px"></td></tr>' +
      '<tr><td>Comissão do leiloeiro (<input data-c="com" type="number" value="5" step="0.5">%)</td><td data-o="com"></td></tr>' +
      '<tr><td>ITBI (<input data-c="itbi" type="number" value="3" step="0.5">%)</td><td data-o="itbi"></td></tr>' +
      '<tr><td>Registro e certidões (<input data-c="reg" type="number" value="1.5" step="0.5">%)</td><td data-o="reg"></td></tr>' +
      '<tr><td>Débitos (IPTU, condomínio) se ficarem com o comprador</td><td><input data-c="deb" type="number" value="0" style="width:110px"></td></tr>' +
      '<tr><td>Desocupação / advogado</td><td><input data-c="deso" type="number" value="' + (im.ocupado ? 5000 : 0) + '" style="width:110px"></td></tr>' +
      '<tr><td>Reforma</td><td><input data-c="ref" type="number" value="0" style="width:110px"></td></tr>' +
      '<tr class="total"><td>Custo total</td><td data-o="total"></td></tr>' +
      (im.avaliacao ? '<tr><td>Margem sobre a avaliação (' + brl(im.avaliacao) + ')</td><td data-o="margem"></td></tr>' : '') +
      '</table><p style="font-size:12px;color:var(--suave);margin:6px 0 0">Percentuais típicos; confira no edital (comissão, quem paga os débitos) e na prefeitura (alíquota do ITBI).</p>';
  }
  function ligarCalc(im) {
    var cx = $('#fichaCaixa');
    function v(k) { var e = cx.querySelector('[data-c="' + k + '"]'); return parseFloat(e && e.value) || 0; }
    function o(k, t) { var e = cx.querySelector('[data-o="' + k + '"]'); if (e) e.innerHTML = t; }
    function calc() {
      var l = v('lance'), com = l * v('com') / 100, itbi = l * v('itbi') / 100, reg = l * v('reg') / 100;
      var tot = l + com + itbi + reg + v('deb') + v('deso') + v('ref');
      o('com', brl(com)); o('itbi', brl(itbi)); o('reg', brl(reg)); o('total', brl(tot));
      if (im.avaliacao) { var m = im.avaliacao - tot; o('margem', '<span style="color:' + (m >= 0 ? 'var(--ok)' : 'var(--ruim)') + '">' + brl(m) + ' (' + Math.round(m / im.avaliacao * 100) + '%)</span>'); }
    }
    $$('[data-c]', cx).forEach(function (e) { e.addEventListener('input', calc); });
    calc();
  }
  $('#ficha').addEventListener('click', function (e) {
    if (e.target.id === 'ficha' || e.target.closest('[data-fecha-ficha]')) { $('#ficha').classList.remove('aberta'); return; }
    var f = e.target.closest('[data-fav]'); if (f) { alternarFav(f.dataset.fav); return; }
    var ed = e.target.closest('[data-editar]'); if (ed) { $('#ficha').classList.remove('aberta'); abrirForm(acha(ed.dataset.editar)); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { $('#ficha').classList.remove('aberta'); $$('.modal.aberta').forEach(function (m) { m.classList.remove('aberta'); }); }
  });

  /* ---------- modais ---------- */
  function abrirModal(id) { $('#' + id).classList.add('aberta'); }
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('[data-fecha]')) m.classList.remove('aberta'); });
  });

  /* ---------- cadastro manual ---------- */
  var form = $('#formNovo'), editando = null;
  TIPOS.forEach(function (t) { form.tipo.insertAdjacentHTML('beforeend', '<option>' + t + '</option>'); });
  MODALIDADES.forEach(function (t) { form.modalidade.insertAdjacentHTML('beforeend', '<option>' + t + '</option>'); });
  form.uf.innerHTML = '<option value=""></option>' + UFS.map(function (u) { return '<option>' + u + '</option>'; }).join('');
  function abrirForm(im) {
    form.reset(); editando = im || null;
    $('#mNovoTit').textContent = im ? 'Editar imóvel' : 'Adicionar imóvel';
    $('#bExcluir').style.display = im ? '' : 'none';
    if (im) {
      ['url', 'titulo', 'tipo', 'modalidade', 'leiloeiro', 'processo', 'endereco', 'bairro', 'cidade', 'uf', 'lat', 'lng', 'avaliacao', 'area', 'quartos', 'vagas', 'foto', 'obs']
        .forEach(function (k) { if (im[k] != null) form[k].value = im[k]; });
      var p = im.pracas || [];
      if (p[0]) { form.data1.value = p[0].data || ''; form.valor1.value = p[0].valor == null ? '' : p[0].valor; }
      if (p[1]) { form.data2.value = p[1].data || ''; form.valor2.value = p[1].valor == null ? '' : p[1].valor; }
      form.financiavel.checked = !!im.financiavel; form.fgts.checked = !!im.fgts; form.ocupado.checked = im.ocupado === true;
    }
    abrirModal('mNovo');
  }
  $('#bNovo').addEventListener('click', function () { abrirForm(null); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var num = function (k) { var v = parseFloat(String(form[k].value).replace(',', '.')); return isNaN(v) ? null : v; };
    var pracas = [];
    if (form.data1.value || form.valor1.value) pracas.push({data: form.data1.value || null, valor: num('valor1')});
    if (form.data2.value || form.valor2.value) pracas.push({data: form.data2.value || null, valor: num('valor2')});
    var im = {
      id: editando ? editando.id : 'meu-' + Date.now().toString(36),
      titulo: form.titulo.value.trim(), tipo: form.tipo.value, modalidade: form.modalidade.value,
      leiloeiro: form.leiloeiro.value.trim(), processo: form.processo.value.trim(), url: form.url.value.trim(),
      endereco: form.endereco.value.trim(), bairro: form.bairro.value.trim(), cidade: form.cidade.value.trim(), uf: form.uf.value,
      lat: num('lat'), lng: num('lng'), avaliacao: num('avaliacao'), area: num('area'), quartos: num('quartos'), vagas: num('vagas'),
      pracas: pracas, foto: form.foto.value.trim(), obs: form.obs.value.trim(),
      financiavel: form.financiavel.checked, fgts: form.fgts.checked, ocupado: form.ocupado.checked ? true : null,
      adicionado: editando ? editando.adicionado : new Date().toISOString()
    };
    meus = meus.filter(function (m) { return m.id !== im.id; }); meus.push(im);
    gravar(CHAVE_MEUS, meus);
    $('#mNovo').classList.remove('aberta');
    juntar(); aplicar();
    var novo = acha(im.id); if (novo) focar(novo);
  });
  $('#bExcluir').addEventListener('click', function () {
    if (!editando || !confirm('Excluir este imóvel?')) return;
    meus = meus.filter(function (m) { return m.id !== editando.id; }); gravar(CHAVE_MEUS, meus);
    $('#mNovo').classList.remove('aberta'); juntar(); aplicar();
  });
  // Geocodificação pelo OpenStreetMap (Nominatim), feita pelo navegador de quem usa.
  $('#bGeo').addEventListener('click', function () {
    var b = this, q = [form.endereco.value, form.bairro.value, form.cidade.value, form.uf.value, 'Brasil'].filter(Boolean).join(', ');
    if (!form.cidade.value) { alert('Preencha pelo menos a cidade.'); return; }
    b.disabled = true; b.textContent = 'Procurando…';
    tentarGeo([q, [form.bairro.value, form.cidade.value, form.uf.value, 'Brasil'].filter(Boolean).join(', '), [form.cidade.value, form.uf.value, 'Brasil'].join(', ')], function (r, nivel) {
      b.disabled = false; b.textContent = '📍 Achar pelo endereço';
      if (!r) { alert('Não achei. Clique com o botão direito no Google Maps, copie as coordenadas e cole aqui.'); return; }
      form.lat.value = (+r.lat).toFixed(6); form.lng.value = (+r.lon).toFixed(6);
      if (nivel > 0) alert('Não achei o endereço exato; marquei pelo ' + (nivel === 1 ? 'bairro' : 'centro da cidade') + '.');
    });
  });
  function tentarGeo(qs, cb, i) {
    i = i || 0; if (i >= qs.length) return cb(null);
    fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=' + encodeURIComponent(qs[i]))
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j[0]) cb(j[0], i); else tentarGeo(qs, cb, i + 1); })
      .catch(function () { cb(null); });
  }

  /* ---------- leiloeiros ---------- */
  $('#bLeiloeiros').addEventListener('click', function () {
    var cont = {};
    todos.forEach(function (im) { if (!im._encerrado) cont[im.leiloeiro] = (cont[im.leiloeiro] || 0) + 1; });
    $('#listaLeiloeiros').innerHTML = leiloeiros.length ? leiloeiros.map(function (l) {
      var s = urlSegura(l.site);
      return '<div class="leiloeiro-item"><div><b>' + esc(l.nome) + '</b>' + (l.uf ? ' <span class="tag">' + esc(l.uf) + '</span>' : '') +
        '<br>' + (s ? '<a href="' + esc(s) + '" target="_blank" rel="noopener">' + esc(s.replace(/^https?:\/\//, '')) + '</a>' : '') +
        (l.obs ? '<div style="font-size:12px;color:var(--suave)">' + esc(l.obs) + '</div>' : '') + '</div>' +
        '<div style="text-align:right;white-space:nowrap"><span class="tag">' + (l.coleta === 'automatica' ? '🤖 coleta automática' : '✍️ manual') + '</span>' +
        '<div style="font-size:12px;color:var(--suave);margin-top:4px">' + (cont[l.nome] || 0) + ' ativos</div></div></div>';
    }).join('') : '<div class="vazio">Nenhum leiloeiro cadastrado ainda.</div>';
    abrirModal('mLeiloeiros');
  });

  /* ---------- importar / exportar ---------- */
  $('#bDados').addEventListener('click', function () { abrirModal('mDados'); });
  function baixar(nome, txt, tipo) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: tipo})); a.download = nome;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  $('#bExportJson').addEventListener('click', function () { baixar('meus-imoveis-leilao.json', JSON.stringify(meus, null, 2), 'application/json'); });
  $('#bExportCsv').addEventListener('click', function () {
    var col = ['titulo', 'tipo', 'modalidade', 'cidade', 'uf', 'bairro', 'endereco', 'avaliacao', '_lance', '_desc', '_data', 'leiloeiro', 'url'];
    var cab = ['Título', 'Tipo', 'Modalidade', 'Cidade', 'UF', 'Bairro', 'Endereço', 'Avaliação', 'Lance atual', 'Desconto %', 'Data do leilão', 'Leiloeiro', 'Link'];
    var lin = filtrados.map(function (im) {
      return col.map(function (c) {
        var v = im[c]; if (c === '_desc' && v != null) v = Math.round(v * 100);
        v = v == null ? '' : String(v); return /[";\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(';');
    });
    baixar('leiloes-filtrados.csv', '﻿' + cab.join(';') + '\n' + lin.join('\n'), 'text/csv');
  });
  $('#arqImport').addEventListener('change', function () {
    var f = this.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var arr = JSON.parse(r.result); if (!Array.isArray(arr)) throw 0;
        var n = 0;
        arr.forEach(function (im) { if (im && im.titulo) { im.id = im.id || 'meu-' + Math.random().toString(36).slice(2); meus = meus.filter(function (m) { return m.id !== im.id; }); meus.push(im); n++; } });
        gravar(CHAVE_MEUS, meus); juntar(); aplicar(); alert(n + ' imóveis importados.');
      } catch (e) { alert('Arquivo inválido: precisa ser uma lista de imóveis em JSON.'); }
    };
    r.readAsText(f); this.value = '';
  });

  /* ---------- tema e abas (celular) ---------- */
  var tema = ler(CHAVE_TEMA, null); if (tema) document.documentElement.dataset.theme = tema;
  $('#bTema').addEventListener('click', function () {
    var escuro = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = escuro ? 'light' : 'dark'; gravar(CHAVE_TEMA, document.documentElement.dataset.theme);
  });
  $$('#abas button').forEach(function (b) {
    b.addEventListener('click', function () {
      $('main').dataset.aba = b.dataset.aba;
      $$('#abas button').forEach(function (x) { x.classList.toggle('on', x === b); });
      if (b.dataset.aba === 'mapa') setTimeout(function () { mapa.invalidateSize(); }, 50);
    });
  });

  /* ---------- carga ---------- */
  function juntar() {
    var vistos = {};
    todos = base.concat(meus.map(function (m) { m._meu = true; return m; })).filter(function (im) {
      if (!im || !im.id || vistos[im.id]) return false; vistos[im.id] = 1; return true;
    }).map(preparar);
    preencherCidades(); preencherLeiloeiros();
  }
  function json(u) { return fetch(u, {cache: 'no-cache'}).then(function (r) { if (!r.ok) throw new Error(u); return r.json(); }); }
  montarFiltros();
  Promise.all([json('dados/imoveis.json').catch(function () { return []; }), json('dados/leiloeiros.json').catch(function () { return []; })])
    .then(function (r) {
      base = Array.isArray(r[0]) ? r[0] : (r[0].imoveis || []);
      leiloeiros = Array.isArray(r[1]) ? r[1] : (r[1].leiloeiros || []);
      juntar(); aplicar();
    });
})();
