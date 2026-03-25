// sw.js — Service Worker AstroDashboard PRO
// Strategia: Network First per index.html, Cache First per statici, Network Only per API
// ============================================================

// CACHE_NAME usa un timestamp fisso aggiornato ad ogni deploy
// Non serve più incrementare manualmente — basta cambiare questa data
const CACHE_TIMESTAMP = '20260325-004';
const CACHE_NAME = 'astrodash-' + CACHE_TIMESTAMP;
const APP_VERSION = CACHE_TIMESTAMP;

const FILES_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './database.js',
    './js/i18n.js',
    './js/globals.js',
    './js/core.js',
    './js/equipment.js',
    './js/weather.js',
    './js/planetarium.js',
    './js/fov.js',
    './js/smart.js',
    './js/pro.js',
    './js/export.js',
    './js/multinight.js',
    './js/report.js',
    './js/userimg.js',
    './manifest.json',
    './rive.js',
    './star_adp.riv',
    './css/fonts/Audiowide-Regular.ttf'
];

const NETWORK_ONLY_DOMAINS = [
    'open-meteo.com',
    'nominatim.openstreetmap.org',
    'cds.unistra.fr',
    'wikipedia.org',
    'aladin.cds.unistra.fr'
];

// ── INSTALL ────────────────────────────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

// ── ACTIVATE: pulisce cache vecchie e notifica le tab aperte ───
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        ).then(() => {
            return self.clients.matchAll({ type: 'window' }).then(clients => {
                clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
            });
        })
    );
    self.clients.claim();
});

// ── FETCH ──────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // 1. API live + CDN esterni → sempre dalla rete, con fallback silenzioso
    if (NETWORK_ONLY_DOMAINS.some(domain => url.hostname.includes(domain))) {
        event.respondWith(
            fetch(event.request).catch(() => {
                // CDN non raggiungibile — risposta vuota per non bloccare l'app
                return new Response('', { status: 503, statusText: 'Service Unavailable' });
            })
        );
        return;
    }

    // 2. index.html → Network First
    //    L'HTML viene sempre scaricato dalla rete (con i nuovi ?v=).
    //    Solo offline usa la cache come fallback.
    const isHtml = url.pathname === '/'
        || url.pathname.endsWith('/')
        || url.pathname.endsWith('/index.html');

    if (isHtml) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    let clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // 3. File JS, CSS e PNG → Network First (aggiornamenti immediati)
    //    Altri asset statici → Cache First (cambiano raramente)
    const isJsOrCss = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.riv');
    const isPng     = url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp');

    if (isJsOrCss || isPng) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (!response || response.status !== 200) return response;
                    let clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // 4. Tutto il resto (immagini, font, manifest) → Cache First
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200) return response;
                let clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            }).catch(() => {
                console.warn('[SW] Risorsa non disponibile offline:', event.request.url);
            });
        })
    );
});
