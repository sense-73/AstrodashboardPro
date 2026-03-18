// globals.js — Variabili globali di stato condivise tra tutti i moduli
// ============================================================

// ── Stato applicazione ────────────────────────────────────────
let _savedLat = parseFloat(localStorage.getItem('ad_lat')), _savedLon = parseFloat(localStorage.getItem('ad_lon'));
let latCorrente = (!isNaN(_savedLat) ? _savedLat : 46.062), lonCorrente = (!isNaN(_savedLon) ? _savedLon : 13.235);
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

// ── Toast notification (sostituisce alert() di Chrome) ────────
function mostraAvviso(msg, tipo) {
    let toast = document.getElementById('_ad_toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = '_ad_toast';
        toast.style.cssText = [
            'position:fixed', 'bottom:28px', 'left:50%', 'transform:translateX(-50%)',
            'z-index:9999', 'padding:12px 22px', 'border-radius:8px',
            'font-size:0.92em', 'font-weight:600', 'color:#c9d1d9',
            'box-shadow:0 4px 18px rgba(0,0,0,0.5)', 'pointer-events:none',
            'transition:opacity 0.35s', 'max-width:88vw', 'text-align:center',
            'display:none', 'opacity:0'
        ].join(';');
        document.body.appendChild(toast);
    }
    if (tipo === 'warn') {
        toast.style.background = '#1a1200';
        toast.style.border = '1px solid #c49a3c';
        toast.style.color = '#c49a3c';
    } else if (tipo === 'error') {
        toast.style.background = '#1a0000';
        toast.style.border = '1px solid #ff4444';
        toast.style.color = '#ff6666';
    } else {
        toast.style.background = '#001a0d';
        toast.style.border = '1px solid #44ff88';
        toast.style.color = '#44ff88';
    }
    toast.innerHTML = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; }, 10);
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 360);
    }, 3500);
}


// ── Mappa immagini DSO ────────────────────────────────────────────────────────
// Priorità: custom (images/dso/) → db esterno (images/ext/) → emoji fallback
const dsoImgMap = {
  // ── Tue foto (priorità 1) ──
  "ic1396":  "images/dso/ic1396.png",
  "ic1805":  "images/dso/ic1805.png",
  "ic434":   "images/dso/ic434.png",
  "jupiter": "images/dso/jupiter.png",
  "m1":      "images/dso/m1.png",
  "m13":     "images/dso/m13.png",
  "m16":     "images/dso/m16.png",
  "m27":     "images/dso/m27.png",
  "m31":     "images/dso/m31.png",
  "m33":     "images/dso/m33.png",
  "m42":     "images/dso/m42.png",
  "m45":     "images/dso/m45.png",
  "m51":     "images/dso/m51.png",
  "m81":     "images/dso/m81.png",
  "m82":     "images/dso/m82.png",
  "moon":    "images/dso/moon.png",
  "mars":    "images/dso/mars.png",
  "venus":   "images/dso/venus.png",
  "ngc1499": "images/dso/ngc1499.png",
  "ngc2244": "images/dso/ngc2244.png",
  "ngc2359": "images/dso/ngc2359.png",
  "ngc4631": "images/dso/ngc4631.png",
  "ngc5907": "images/dso/ngc5907.png",
  "ngc6888": "images/dso/ngc6888.png",
  "ngc6946": "images/dso/ngc6946.png",
  "ngc7023": "images/dso/ngc7023.png",
  "ngc7331": "images/dso/ngc7331.png",
  "ngc7380": "images/dso/ngc7380.png",
  "ngc891":  "images/dso/ngc891.png",
  "sh2-101": "images/dso/sh2-101.png",
  // ── Database esterno (priorità 2) ──
  "ic1848":  "images/ext/ic1848.png",
  "ic2177":  "images/ext/ic2177.png",
  "ic410":   "images/ext/ic410.png",
  "ic5070":  "images/ext/ic5070.png",
  "ic5146":  "images/ext/ic5146.png",
  "lmc":     "images/ext/lmc.png",
  "m101":    "images/ext/m101.png",
  "m104":    "images/ext/m104.png",
  "m106":    "images/ext/m106.png",
  "m11":     "images/ext/m11.png",
  "m15":     "images/ext/m15.png",
  "m17":     "images/ext/m17.png",
  "m20":     "images/ext/m20.png",
  "m22":     "images/ext/m22.png",
  "m3":      "images/ext/m3.png",
  "m35":     "images/ext/m35.png",
  "m4":      "images/ext/m4.png",
  "m44":     "images/ext/m44.png",
  "m57":     "images/ext/m57.png",
  "m6":      "images/ext/m6.png",
  "m63":     "images/ext/m63.png",
  "m64":     "images/ext/m64.png",
  "m65":     "images/ext/m65.png",
  "m66":     "images/ext/m66.png",
  "m7":      "images/ext/m7.png",
  "m74":     "images/ext/m74.png",
  "m76":     "images/ext/m76.png",
  "m78":     "images/ext/m78.png",
  "m83":     "images/ext/m83.png",
  "m8":      "images/ext/m8.png",
  "m92":     "images/ext/m92.png",
  "m97":     "images/ext/m97.png",
  "markarian":"images/ext/markarian.png",
  "ngc253":  "images/ext/ngc253.png",
  "ngc281":  "images/ext/ngc281.png",
  "ngc2070": "images/ext/ngc2070.png",
  "ngc2174": "images/ext/ngc2174.png",
  "ngc2264": "images/ext/ngc2264.png",
  "ngc2392": "images/ext/ngc2392.png",
  "ngc2403": "images/ext/ngc2403.png",
  "ngc3242": "images/ext/ngc3242.png",
  "ngc3372": "images/ext/ngc3372.png",
  "ngc3628": "images/ext/ngc3628.png",
  "ngc4038": "images/ext/ngc4038.png",
  "ngc4565": "images/ext/ngc4565.png",
  "ngc5092": "images/ext/ngc5092.png",
  "ngc5128": "images/ext/ngc5128.png",
  "ngc5139": "images/ext/ngc5139.png",
  "ngc6334": "images/ext/ngc6334.png",
  "ngc6357": "images/ext/ngc6357.png",
  "ngc6543": "images/ext/ngc6543.png",
  "ngc6960": "images/ext/ngc6960.png",
  "ngc6992": "images/ext/ngc6992.png",
  "ngc7000": "images/ext/ngc7000.png",
  "ngc7293": "images/ext/ngc7293.png",
  "ngc7789": "images/ext/ngc7789.png",
  "ngc869":  "images/ext/ngc869.png",
  "ou4":     "images/ext/ou4.png",
  "sh2-155": "images/ext/sh2_155.png",
  "sh2-240": "images/ext/sh2_240.png",
  "sh2-308": "images/ext/sh2_308.png",
  "smc":     "images/ext/smc.png",
  "stephan": "images/ext/stephan.png",
};
