// sw.js — Service Worker AstroDashboard PRO
// Strategia: Network First per index.html, Cache First per statici, Network Only per API
// ============================================================

const CACHE_NAME = 'astrodash-v5-16';

// IMPORTANTE: ad ogni deploy incrementare APP_VERSION qui e ?v=X in index.html
const APP_VERSION = '6';

const FILES_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    `./database.js?v=${APP_VERSION}`,
    `./js/i18n.js?v=${APP_VERSION}`,
    `./js/globals.js?v=${APP_VERSION}`,
    `./js/core.js?v=${APP_VERSION}`,
    `./js/equipment.js?v=${APP_VERSION}`,
    `./js/weather.js?v=${APP_VERSION}`,
    `./js/planetarium.js?v=${APP_VERSION}`,
    `./js/fov.js?v=${APP_VERSION}`,
    `./js/smart.js?v=${APP_VERSION}`,
    `./js/pro.js?v=${APP_VERSION}`,
    `./js/export.js?v=${APP_VERSION}`,
    `./js/multinight.js?v=${APP_VERSION}`,
    './manifest.json'
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

    // 1. API live → sempre dalla rete
    if (NETWORK_ONLY_DOMAINS.some(domain => url.hostname.includes(domain))) {
        event.respondWith(fetch(event.request));
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

    // 3. File statici (JS, CSS, img) → Cache First
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
