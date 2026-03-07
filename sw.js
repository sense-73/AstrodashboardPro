// sw.js — Service Worker AstroDashboard PRO
// Strategia: Cache First per file statici, Network First per API live
// ============================================================

const CACHE_NAME = 'astrodash-v5-14';

// IMPORTANTE: ad ogni deploy incrementare APP_VERSION qui e ?v=X in index.html
const APP_VERSION = '5';

// File statici dell'app da salvare in cache al primo avvio
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

// Domini API live: NON vanno mai in cache (dati sempre freschi)
const NETWORK_ONLY_DOMAINS = [
    'open-meteo.com',              // Meteo
    'nominatim.openstreetmap.org', // Geocoding
    'cds.unistra.fr',              // SIMBAD
    'wikipedia.org',               // Wikipedia
    'aladin.cds.unistra.fr'        // AladinLite
];

// ── INSTALL: scarica e salva tutti i file statici ──────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// ── ACTIVATE: elimina cache vecchie di versioni precedenti ─────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    clients.claim();
});

// ── FETCH: smista le richieste tra cache e rete ────────────────
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // API live → sempre dalla rete, mai dalla cache
    if (NETWORK_ONLY_DOMAINS.some(domain => url.hostname.includes(domain))) {
        event.respondWith(fetch(event.request));
        return;
    }

    // File statici → Cache First (prendi dalla cache, altrimenti dalla rete)
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            // Non in cache: scarica dalla rete e salvalo per la prossima volta
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200) return response;
                let responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(() => {
                console.warn('[SW] Risorsa non disponibile offline:', event.request.url);
            });
        })
    );
});