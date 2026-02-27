const CACHE_NAME = 'astrodash-v5-5';

// Installa il service worker
self.addEventListener('install', event => {
    self.skipWaiting();
});

// Attiva e pulisci cache vecchie
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// Ascolta le richieste di rete (Necessario per PWA)
self.addEventListener('fetch', event => {
    // Per ora non facciamo caching offline complesso per non bloccare i dati meteo live.
    // Lasciamo che la rete faccia il suo corso normale.
    event.respondWith(fetch(event.request));
});