/* Libera animações de entrada após fontes (ou teto 1,2s) — evita morph system→webfont */
      (function () {
        function mark() {
          document.documentElement.classList.add('fonts-ready');
        }
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(mark);
          setTimeout(mark, 1200);
        } else {
          mark();
        }
      })();

/* Marca ícones prontos — sem flash vazio→SVG; teto 1,5s evita ícone eternamente oculto */
          (function () {
            function arm(el) {
              if (!el || el.classList.contains('iconify-ready')) return;
              var done = function () {
                el.classList.add('iconify-ready');
              };
              el.addEventListener('load', done, { once: true });
              setTimeout(done, 1500);
            }
            function scan(root) {
              (root || document).querySelectorAll('iconify-icon').forEach(arm);
            }
            function start() {
              if (!window.customElements || !customElements.whenDefined) {
                scan();
                return;
              }
              customElements.whenDefined('iconify-icon').then(function () {
                scan();
                if (!document.body) return;
                new MutationObserver(function (muts) {
                  muts.forEach(function (m) {
                    m.addedNodes.forEach(function (n) {
                      if (n.nodeType !== 1) return;
                      if (n.tagName === 'ICONIFY-ICON') arm(n);
                      else if (n.querySelectorAll) scan(n);
                    });
                  });
                }).observe(document.body, { childList: true, subtree: true });
              });
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', start);
            } else {
              start();
            }
          })();

!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="/vendor/unicornstudio/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();