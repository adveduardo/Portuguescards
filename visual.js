/* Visual das atividades: "adulto" (padrão, mais sóbrio) ou "infantil" (colorido, com confete).
   A escolha é feita no menu do painel e fica guardada neste navegador. */
(function(){
  var modo = null;
  try { modo = localStorage.getItem('painel_visual'); } catch (e) {}
  if (modo === 'infantil') return;
  document.documentElement.className += ' visual-adulto';
  var css = document.createElement('style');
  css.textContent =
    'html.visual-adulto body:not(.escuro){background:#eef1f6 !important}' +
    'html.visual-adulto body{font-family:"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important}' +
    'html.visual-adulto .confete,html.visual-adulto .avConfete{display:none !important}' +
    'html.visual-adulto .cartao,html.visual-adulto .placa{box-shadow:0 2px 6px rgba(0,0,0,.08) !important}';
  (document.head || document.documentElement).appendChild(css);
})();
