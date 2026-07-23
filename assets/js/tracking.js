window.dataLayer = window.dataLayer || [];
        (function () {
          if (window.fbq) return;
          var n = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          n.push = n;
          n.loaded = false;
          n.version = '2.0';
          n.queue = [];
          window.fbq = n;
          if (!window._fbq) window._fbq = n;
        })();

(function(){const deferTracking = false;
const deferUntilLoad = false;
const deferUntilInteraction = false;
const deferUntilInteractionStaggered = false;

        window.__aaTrackWhenReady = (function () {
          function runIdle(fn) {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(fn, { timeout: 2500 });
            } else {
              setTimeout(fn, 1200);
            }
          }
          function afterDomReady(fn) {
            if (document.readyState !== 'loading') {
              runIdle(fn);
            } else {
              document.addEventListener('DOMContentLoaded', function () {
                runIdle(fn);
              });
            }
          }
          function afterWindowLoad(fn) {
            function start() {
              runIdle(fn);
            }
            if (document.readyState === 'complete') {
              start();
            } else {
              window.addEventListener('load', start);
            }
          }
          function yieldThen(fn) {
            var run = function () {
              if (
                window.scheduler &&
                typeof window.scheduler.postTask === 'function'
              ) {
                window.scheduler.postTask(fn, { priority: 'background' });
                return;
              }
              setTimeout(fn, 0);
            };
            if (typeof requestAnimationFrame === 'function') {
              requestAnimationFrame(function () {
                run();
              });
            } else {
              run();
            }
          }
          var interactionQueue = [];
          var interactionArmed = false;
          var trackingStarted = false;
          var fallbackTimer = null;
          var scrollOpts = { capture: true, passive: true };
          function cleanupTrackingTriggers() {
            window.removeEventListener('pointerdown', onInteract, true);
            window.removeEventListener('keydown', onInteract, true);
            window.removeEventListener('scroll', onScroll, scrollOpts);
            if (fallbackTimer != null) {
              clearTimeout(fallbackTimer);
              fallbackTimer = null;
            }
          }
          function onInteract() {
            startTracking();
          }
          function onScroll() {
            if (window.scrollY > 100) startTracking();
          }
          function flushQueueSync(q) {
            for (var i = 0; i < q.length; i++) q[i]();
          }
          function flushQueueStaggered(q) {
            var i = 0;
            function next() {
              if (i >= q.length) return;
              var fn = q[i++];
              try {
                fn();
              } catch (e) {}
              if (i < q.length) yieldThen(next);
            }
            // Resposta visual primeiro: só inicia tracking na próxima frame/task.
            yieldThen(next);
          }
          function startTracking() {
            if (trackingStarted) return;
            trackingStarted = true;
            cleanupTrackingTriggers();
            var q = interactionQueue.splice(0, interactionQueue.length);
            if (deferUntilInteractionStaggered) {
              flushQueueStaggered(q);
            } else {
              flushQueueSync(q);
            }
          }
          function afterInteraction(fn) {
            if (trackingStarted) {
              fn();
              return;
            }
            interactionQueue.push(fn);
            if (interactionArmed) return;
            interactionArmed = true;
            window.addEventListener('pointerdown', onInteract, true);
            window.addEventListener('keydown', onInteract, true);
            window.addEventListener('scroll', onScroll, scrollOpts);
            if (window.scrollY > 100) {
              startTracking();
              return;
            }
            // Legado `interaction`: fallback ~9s.
            // Staggered: fallback conservador (idle + página visível + 30s) —
            // PageView first-party já cobriu attribution; browser tags só se o
            // usuário permanecer sem interagir.
            if (!deferUntilInteractionStaggered) {
              fallbackTimer = setTimeout(startTracking, 9000);
            } else {
              fallbackTimer = setTimeout(function () {
                if (document.visibilityState !== 'visible') return;
                if (trackingStarted) return;
                function kick() {
                  startTracking();
                }
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(kick, { timeout: 4000 });
                } else {
                  setTimeout(kick, 500);
                }
              }, 30000);
            }
          }
          return function (fn) {
            if (!deferTracking) {
              fn();
              return;
            }
            if (deferUntilInteraction) {
              afterInteraction(fn);
            } else if (deferUntilLoad) {
              afterWindowLoad(fn);
            } else {
              afterDomReady(fn);
            }
          };
        })();
      })();

(function(){const gtmContainerId = "GTM-5Q23F862";

        window.__aaTrackWhenReady(function () {
          if (window.__aaGtmStarted) return;
          window.__aaGtmStarted = true;
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', gtmContainerId);
        });
      })();

(function(){const metaPixelId = "359954309019613";
const metaCapiEndpoint = "/api/meta-capi";
const deferUntilInteractionStaggered = false;

        window.__aaTrackWhenReady(function () {
          if (window.__aaMetaStarted) return;
          window.__aaMetaStarted = true;

          var PIXEL_ID = metaPixelId;
          var CAPI_ENDPOINT = metaCapiEndpoint;

          if (!window.fbq) {
            var n = function () {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            n.push = n;
            n.loaded = false;
            n.version = '2.0';
            n.queue = [];
            window.fbq = n;
            if (!window._fbq) window._fbq = n;
          }

          if (!document.querySelector('script[src*="fbevents.js"]')) {
            var t = document.createElement('script');
            t.async = true;
            t.src = 'https://connect.facebook.net/en_US/fbevents.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(t, s);
          }

          fbq('init', PIXEL_ID);

          function getCookie(name) {
            var m = document.cookie.match(
              new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
            );
            return m ? decodeURIComponent(m[1]) : null;
          }

          function setCookie(name, value, maxAge) {
            document.cookie = name + '=' + value + '; path=/; max-age=' + maxAge + '; SameSite=Lax';
          }

          function randStr() {
            return Math.random().toString(36).slice(2, 11);
          }

          var fbclid = new URLSearchParams(window.location.search).get('fbclid');
          if (fbclid && !getCookie('_fbc')) {
            setCookie('_fbc', 'fb.1.' + Date.now() + '.' + fbclid, 7776000);
          }

          if (!getCookie('_fbp')) {
            setCookie('_fbp', 'fb.1.' + Date.now() + '.' + Math.floor(Math.random() * 1e10), 7776000);
          }

          var externalId = null;
          try {
            externalId = localStorage.getItem('aa_uid');
            if (!externalId) {
              externalId = 'u_' + Date.now() + '_' + randStr() + randStr();
              localStorage.setItem('aa_uid', externalId);
            }
          } catch (e) {}

          var eventId = window.__aaPageViewEventId || 'evt_' + Date.now() + '_' + randStr();
          window.__aaPageViewEventId = eventId;
          var eventTime = Math.floor(Date.now() / 1000);

          fbq('track', 'PageView', {}, { eventID: eventId });

          if (!CAPI_ENDPOINT) return;
          if (deferUntilInteractionStaggered && window.__aaCapiPageViewSent) return;

          window.__aaCapiPageViewSent = true;
          setTimeout(function () {
            fetch(CAPI_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              keepalive: true,
              body: JSON.stringify({
                event_name: 'PageView',
                event_id: eventId,
                event_time: eventTime,
                event_source_url: window.location.href,
                user_agent: navigator.userAgent,
                fbp: getCookie('_fbp') || undefined,
                fbc: getCookie('_fbc') || undefined,
                external_id: externalId || undefined,
              }),
            }).catch(function (e) {
              console.warn('[CAPI] fail', e);
            });
          }, 300);
        });
      })();

(function(a,e,f,g,b,c,d,h){a.HotmartLauncherObject=b;a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};a[b].l=1*new Date;c=e.createElement(f);d=e.getElementsByTagName(f)[0];c.async=1;c.src=g;d.parentNode.insertBefore(c,d)})(window,document,"script","//launcher.hotmart.com/launcher.js","hot");hot("account","912b6115-8800-35ae-85c7-cad9ece94ec9");

var head=document.head,script=document.createElement("script");script.type="text/javascript";script.src="https://215240.t.hyros.com/v1/lst/universal-script?ph\x3d4ccc3bd012b81e03ce9490ea4f0afd6fbb6737fd707b5215cb967a50c93ef5bc\x26tag\x3d!clicked\x26ref_url\x3d"+encodeURIComponent(document.URL);head.appendChild(script);