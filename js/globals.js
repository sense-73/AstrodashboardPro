// globals.js — Variabili globali di stato condivise tra tutti i moduli
// ============================================================

// ── Stato applicazione ────────────────────────────────────────
let latCorrente = 46.062, lonCorrente = 13.235;
let datiMeteo = null;
let indicePartenza = 0;
let chartAltezza = null;
let targetSelezionato = null;
let aladinSkyMap = null;
let vistaPrecedente = 'dashboard-view';
let fovCenterOverride = null; // null = usa coordinate target originali
let timerRicerca;
let oreNecessarieGlobali = 0;
let contatoreNotti = 0;
let mnContesto = 'smart';
let mnTptSecondi = 0;

// ── Database pianeti (usato da planetarium.js) ─────────────────
const planetsDatabase = [
    { id: "jupiter", name: "jupiter", icon: "🪐", ra: 7.15,  dec:  22.8 },
    { id: "mars",    name: "mars",    icon: "🔴", ra: 18.50, dec: -23.5 },
    { id: "venus",   name: "venus",   icon: "✨", ra: 23.50, dec:  -3.5 }
];

// ── Costanti filtri (usate da smart.js e pro.js) ───────────────
const framesColor = [
    { id: "c-light", name: "Light",     class: "f-l",    dC: 0, dE: 180 },
    { id: "c-dark",  name: "Dark",      class: "f-dark", dC: 0, dE: 180 },
    { id: "c-bias",  name: "Bias",      class: "f-bias", dC: 0, dE: 0,  dG: 0 }
];
const framesMono = [
    { id: "m-l",    name: "Lum (L)",  class: "f-l",    dC: 0, dE: 30  },
    { id: "m-r",    name: "Red (R)",  class: "f-r",    dC: 0, dE: 120 },
    { id: "m-g",    name: "Green (G)",class: "f-g",    dC: 0, dE: 120 },
    { id: "m-b",    name: "Blue (B)", class: "f-b",    dC: 0, dE: 120 },
    { id: "m-ha",   name: "H-Alpha",  class: "f-ha",   dC: 0, dE: 300 },
    { id: "m-oiii", name: "O-III",    class: "f-oiii", dC: 0, dE: 300 },
    { id: "m-sii",  name: "S-II",     class: "f-sii",  dC: 0, dE: 300 },
    { id: "m-dark", name: "Dark",     class: "f-dark", dC: 0, dE: 30  },
    { id: "m-bias", name: "Bias",     class: "f-bias", dC: 0, dE: 0,  dG: 0 }
];

// ── Database VIP target (usato da smart.js) ────────────────────
const dsoVIP = {
    "M31":  { hours: 4,  tips: "Nucleo estremo. Fai esposizioni miste (es. 30s e 180s) per salvare il centro con un HDR." },
    "M42":  { hours: 3,  tips: "Il Trapezio brucia istantaneamente. Fai scatti da 5 secondi per il core e 300s per le periferiche." },
    "M81":  { hours: 12, tips: "Bode è circondata dall'IFN. Scatta da cieli perfetti per staccarla dal fondo cielo." },
    "M45":  { hours: 6,  tips: "Pleiadi: le stelle blu creano riflessi enormi. Controlla gli aloni dei filtri." },
    "IC434":{ hours: 8,  tips: "Testa di Cavallo: dedica l'80% del tempo al canale H-Alpha per un contrasto brutale." },
    "Ou4":  { hours: 35, tips: "Calamaro Gigante (Flying Bat). Segnale OIII debolissimo. Obbligatoria pianificazione estrema." }
};
