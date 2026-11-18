/* Visual das atividades: "adulto" (padrão, mais sóbrio), "infantil" (colorido, com confete)
   ou "calmo" (menos estímulos: sem animações, sem confete e com sons mais baixos — bom para alunos com TEA).
   A escolha é feita no menu do painel e fica guardada neste navegador. */
(function(){
  var modo = null;
  try { modo = localStorage.getItem('painel_visual'); } catch (e) {}
  if (/[?&]calmo=1/.test(location.search)) modo = 'calmo';
  if (modo === 'infantil') return;
  var calmo = modo === 'calmo';
  if (calmo) window.PAINEL_CALMO = true;
  document.documentElement.className += ' visual-adulto' + (calmo ? ' visual-calmo calmo' : '');
  var css = document.createElement('style');
  css.textContent =
    'html.visual-adulto body:not(.escuro){background:#eef1f6 !important}' +
    'html.visual-adulto body{font-family:"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important}' +
    'html.visual-adulto .confete,html.visual-adulto .avConfete{display:none !important}' +
    'html.visual-adulto .cartao,html.visual-adulto .placa{box-shadow:0 2px 6px rgba(0,0,0,.08) !important}' +
    (calmo ?
      'html.visual-calmo *{animation:none !important;transition:none !important}' +
      'html.visual-calmo body:not(.escuro){background:#f3f1ec !important}' : '');
  (document.head || document.documentElement).appendChild(css);
})();
