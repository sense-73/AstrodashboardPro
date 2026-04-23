// globals.js — Variabili globali di stato condivise tra tutti i moduli
// ============================================================

// ── Flag di debug ─────────────────────────────────────────────
// false = nessun messaggio in console (produzione)
// true  = tutti i console.log/warn/error visibili (sviluppo)
const DEBUG = false;

// ── Data sessione (pianificazione) ────────────────────────────
// sessionDate è la data di riferimento per tutti i calcoli astronomici.
// Di default è oggi. Può essere modificata dall'utente per pianificare sessioni future.
// La data viene persistita in localStorage per sopravvivere al riavvio della pagina.
const _SESSION_DATE_KEY = 'adp_session_date';

function _initSessionDate() {
    const saved = localStorage.getItem(_SESSION_DATE_KEY);
    if (saved) {
        const parts = saved.split('-');
        if (parts.length === 3) {
            const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
            // Se la data salvata è nel passato, torna a oggi
            const today = new Date(); today.setHours(0,0,0,0);
            if (d >= today) return d;
        }
    }
    return new Date();
}

let _sessionDateObj = _initSessionDate();

function getSessionDate() {
    return new Date(_sessionDateObj.getTime());
}

function setSessionDate(dateOrString) {
    if (typeof dateOrString === 'string') {
        // Formato YYYY-MM-DD: costruisce la data a mezzogiorno locale per evitare offset fuso
        const parts = dateOrString.split('-');
        _sessionDateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12, 0, 0);
        localStorage.setItem(_SESSION_DATE_KEY, dateOrString);
    } else {
        _sessionDateObj = new Date(dateOrString.getTime());
        const iso = _sessionDateObj.getFullYear() + '-'
            + String(_sessionDateObj.getMonth()+1).padStart(2,'0') + '-'
            + String(_sessionDateObj.getDate()).padStart(2,'0');
        localStorage.setItem(_SESSION_DATE_KEY, iso);
    }
    // Propaga il cambio data a tutti i moduli tramite evento custom
    document.dispatchEvent(new CustomEvent('sessionDateChanged', { detail: { date: getSessionDate() } }));
}

function isSessionDateToday() {
    const today = new Date();
    return _sessionDateObj.getFullYear() === today.getFullYear() &&
           _sessionDateObj.getMonth()    === today.getMonth()    &&
           _sessionDateObj.getDate()     === today.getDate();
}

// ── Parser sicuro per stringhe temporali Open-Meteo ──────────
// new Date("YYYY-MM-DDTHH:MM") si comporta diversamente su iOS
// Safari rispetto a Chrome desktop: può essere interpretata come
// UTC invece che locale, o restituire NaN (bug noto).
// Il costruttore per componenti è invece sempre locale su tutti
// i browser, senza ambiguità di fuso.
function parseMeteoTime(str) {
    const [datePart, timePart] = str.split('T');
    const [y, mo, d] = datePart.split('-').map(Number);
    const [h, m]     = timePart.split(':').map(Number);
    return new Date(y, mo - 1, d, h, m, 0, 0);
}

function sessionDateLabel(lang) {
    if (isSessionDateToday()) {
        return lang === 'it' ? 'stanotte' : lang === 'es' ? 'esta noche' : lang === 'zh' ? '今晚' : 'tonight';
    }
    const d = getSessionDate();
    const opts = { day: '2-digit', month: 'short', year: 'numeric' };
    const locale = lang === 'it' ? 'it-IT' : lang === 'es' ? 'es-ES' : lang === 'zh' ? 'zh-CN' : 'en-GB';
    return lang === 'it' ? 'la notte del ' + d.toLocaleDateString(locale, opts)
         : lang === 'es' ? 'la noche del ' + d.toLocaleDateString(locale, opts)
         : lang === 'zh' ? d.toLocaleDateString(locale, opts) + ' 夜间'
         : 'the night of ' + d.toLocaleDateString(locale, opts);
}

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

// ── Database pianeti con effemeridi dinamiche (usato da planetarium.js) ──────
// Metodo: Paul Schlyter (stjarnhimlen.se), valido ~1800-2100, precisione ~1°
// Chiamare getPlanetDatabase(date) per ottenere RA/Dec aggiornati alla data.

const _planetsMeta = [
    { id: "mercury", name: "mercury", icon: "☿" },
    { id: "venus",   name: "venus",   icon: "✨" },
    { id: "mars",    name: "mars",    icon: "🔴" },
    { id: "jupiter", name: "jupiter", icon: "🪐" },
    { id: "saturn",  name: "saturn",  icon: "🪐" },
    { id: "uranus",  name: "uranus",  icon: "🔵" },
    { id: "neptune", name: "neptune", icon: "🔵" }
];

function calcolaPosizioniPianeti(date) {
    const rad = Math.PI / 180;
    const d   = (date.getTime() / 86400000) + 2440587.5 - 2451545.0;

    function rev(x) { return x - Math.floor(x / 360) * 360; }

    function solveKepler(M, e) {
        let E = M + (180 / Math.PI) * e * Math.sin(M * rad) * (1 + e * Math.cos(M * rad));
        for (let i = 0; i < 10; i++) {
            let dE = (M + e * (180 / Math.PI) * Math.sin(E * rad) - E) / (1 - e * Math.cos(E * rad));
            E += dE;
            if (Math.abs(dE) < 0.0001) break;
        }
        return E;
    }

    // Elementi orbitali: [N, i, w, a, e, M] con variazioni per day d
    const orb = {
        mercury: { N: rev(48.3313 + 3.24587e-5*d), i: 7.0047 + 5.00e-8*d,  w: rev(29.1241 + 1.01444e-5*d), a: 0.387098,               e: 0.205635 + 5.59e-10*d,  M: rev(168.6562 + 4.0923344368*d) },
        venus:   { N: rev(76.6799 + 2.46590e-5*d), i: 3.3946 + 2.75e-8*d,  w: rev(54.8910 + 1.38374e-5*d), a: 0.723330,               e: 0.006773 - 1.302e-9*d,  M: rev(48.0052  + 1.6021302244*d) },
        mars:    { N: rev(49.5574 + 2.11081e-5*d), i: 1.8497 - 1.78e-8*d,  w: rev(286.5016 + 2.92961e-5*d),a: 1.523688,               e: 0.093405 + 2.516e-9*d,  M: rev(18.6021  + 0.5240207766*d) },
        jupiter: { N: rev(100.4542 + 2.76854e-5*d),i: 1.3030 - 1.557e-7*d, w: rev(273.8777 + 1.64505e-5*d),a: 5.20256,                e: 0.048498 + 4.469e-9*d,  M: rev(19.8950  + 0.0830853001*d) },
        saturn:  { N: rev(113.6634 + 2.38980e-5*d),i: 2.4886 - 1.081e-7*d, w: rev(339.3939 + 2.97661e-5*d),a: 9.55475,                e: 0.055546 - 9.499e-9*d,  M: rev(316.9670 + 0.0334442282*d) },
        uranus:  { N: rev(74.0005  + 1.3978e-5*d), i: 0.7733 + 1.9e-8*d,   w: rev(96.6612  + 3.0565e-5*d), a: 19.18171 - 1.55e-8*d,   e: 0.047318 + 7.45e-9*d,   M: rev(142.5905 + 0.011725806*d)  },
        neptune: { N: rev(131.7806 + 3.0173e-5*d), i: 1.7700 - 2.55e-7*d,  w: rev(272.8461 - 6.027e-6*d), a: 30.05826 + 3.313e-8*d,   e: 0.008606 + 2.15e-9*d,   M: rev(260.2471 + 0.005995147*d)  }
    };

    // Posizione del Sole (necessaria per conversione geocentrica)
    const sW  = rev(282.9404 + 4.70935e-5*d);
    const sE  = 0.016709 - 1.151e-9*d;
    const sM  = rev(356.0470 + 0.9856002585*d);
    const sEA = solveKepler(sM, sE);
    const sXv = Math.cos(sEA * rad) - sE;
    const sYv = Math.sqrt(1 - sE*sE) * Math.sin(sEA * rad);
    const sR  = Math.sqrt(sXv*sXv + sYv*sYv);
    const sL  = rev(Math.atan2(sYv, sXv) / rad + sW);
    const sunX = sR * Math.cos(sL * rad);
    const sunY = sR * Math.sin(sL * rad);

    const obliq = 23.4393 - 3.563e-7*d;
    const result = {};

    for (const [pid, el] of Object.entries(orb)) {
        const E  = solveKepler(el.M, el.e);
        const xv = el.a * (Math.cos(E * rad) - el.e);
        const yv = el.a * Math.sqrt(1 - el.e*el.e) * Math.sin(E * rad);
        const v  = Math.atan2(yv, xv) / rad;
        const r  = Math.sqrt(xv*xv + yv*yv);
        const lH = v + el.w;

        // Coordinate eclittiche eliocentr.
        const xH = r * (Math.cos(el.N*rad)*Math.cos(lH*rad) - Math.sin(el.N*rad)*Math.sin(lH*rad)*Math.cos(el.i*rad));
        const yH = r * (Math.sin(el.N*rad)*Math.cos(lH*rad) + Math.cos(el.N*rad)*Math.sin(lH*rad)*Math.cos(el.i*rad));
        const zH = r *  Math.sin(lH*rad) * Math.sin(el.i*rad);

        // Coordinate eclittiche geocentriche
        const xG = xH - sunX, yG = yH - sunY, zG = zH;

        // Eclittica → Equatoriale
        const yEq = yG * Math.cos(obliq*rad) - zG * Math.sin(obliq*rad);
        const zEq = yG * Math.sin(obliq*rad) + zG * Math.cos(obliq*rad);
        const dist = Math.sqrt(xG*xG + yEq*yEq + zEq*zEq);

        let ra = Math.atan2(yEq, xG) / rad;
        if (ra < 0) ra += 360;
        const dec = Math.asin(zEq / dist) / rad;

        result[pid] = { ra: ra / 15, dec }; // ra in ore
    }
    return result;
}

function getPlanetDatabase(date) {
    const pos = calcolaPosizioniPianeti(date || new Date());
    return _planetsMeta.map(p => Object.assign({}, p, pos[p.id]));
}

// Compatibilità: accesso statico rimosso — usare sempre getPlanetDatabase(date)
const planetsDatabase = _planetsMeta; // fallback sicuro (senza ra/dec)

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

// ── Logo AstroDashboard (base64 condiviso tra report.js, export.js) ─────────
const ADP_LOGO_B64 = "data:image/png;base64,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";

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
  "m43":     "images/dso/m43.png",
  "m45":     "images/dso/m45.png",
  "m51":     "images/dso/m51.png",
  "m81":     "images/dso/m81.png",
  "m82":     "images/dso/m82.png",
  "moon":    "images/dso/moon.png",
  "mars":    "images/dso/mars.png",
  "venus":   "images/dso/venus.png",
  "mercury": "images/dso/mercury.png",
  "saturn":  "images/dso/saturn.png",
  "uranus":  "images/dso/uranus.png",
  "neptune": "images/dso/neptune.png",
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


// ══════════════════════════════════════════════════════════════════
// ── PERSISTENZA localStorage ──────────────────────────────────────
// Salva/carica setup ottico, sensore, GPS, Bortle, pose filtri,
// trigger PRO. Chiavi prefissate con "ad_" (AstroDashboard).
// ══════════════════════════════════════════════════════════════════

const AD_KEYS_OPTICS = [
    'scope-preset','focal-length','aperture',
    'sensor-preset','sensor-w','sensor-h','pixel-size',
    'sensor-type','bin-select',
    'location-lat','location-lon','bortle',
    'dither-duration'
];
const AD_KEYS_SMART_FILTERS = [
    'c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii','m-dark','m-bias','c-dark','c-bias'
];
const AD_KEYS_SMART_HDR = [
    'c-light-hdr','m-l-hdr','m-r-hdr','m-g-hdr','m-b-hdr','m-ha-hdr','m-oiii-hdr','m-sii-hdr'
];
const AD_KEYS_PRO_TRIGGERS = [
    'pro-af-start','pro-af-filter','pro-af-hfr',
    'pro-cool','pro-temp','pro-slew','pro-rotate','pro-guide','pro-flip',
    'pro-warm','pro-park','pro-cover','pro-flat'
];
const AD_SMART_FIELDS = ['count','exp','gain','offset','bin','dfreq'];
const AD_PRO_FIELDS   = ['count','exp','gain','offset','bin','dfreq'];
const AD_HDR_FIELDS   = ['count','exp','gain','offset','bin','dfreq'];

function adSave(key, value) {
    try { localStorage.setItem('ad_' + key, value); } catch(e) {}
}
function adLoad(key) {
    try { return localStorage.getItem('ad_' + key); } catch(e) { return null; }
}
function adSaveEl(id) {
    let el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox') adSave(id, el.checked ? '1' : '0');
    else adSave(id, el.value);
}
function adLoadEl(id) {
    let el = document.getElementById(id);
    if (!el) return;
    let v = adLoad(id);
    if (v === null) return;
    if (el.type === 'checkbox') el.checked = (v === '1');
    else el.value = v;
}

function salvaPreferenze() {
    // Ottiche + GPS
    AD_KEYS_OPTICS.forEach(adSaveEl);
    // Smart: pose per ogni filtro (incluse HDR)
    AD_KEYS_SMART_FILTERS.forEach(fid => {
        AD_SMART_FIELDS.forEach(f => adSaveEl(`${fid}-${f}`));
    });
    AD_KEYS_SMART_HDR.forEach(fid => {
        AD_HDR_FIELDS.forEach(f => {
            let k = `${fid}-${f}`;
            adSaveEl(k);
        });
    });
    // PRO: pose per ogni filtro
    let proIds = ['c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii','m-dark','m-bias','c-dark','c-bias'];
    proIds.forEach(fid => {
        AD_PRO_FIELDS.forEach(f => adSaveEl(`pro-${fid}-${f}`));
    });
    // PRO HDR
    let proHdrIds = ['c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'];
    proHdrIds.forEach(fid => {
        AD_HDR_FIELDS.forEach(f => adSaveEl(`pro-${fid}-hdr-${f}`));
    });
    // Trigger PRO
    AD_KEYS_PRO_TRIGGERS.forEach(adSaveEl);
    // Nomi filtri NINA (già gestiti con nina_filter_ prefix, aggiungiamo anche il prefisso ad_)
    let ninaIds = ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'];
    ninaIds.forEach(fid => adSaveEl(`nina-name-${fid}`));
}

function caricaPreferenze() {
    // Ottiche + GPS
    AD_KEYS_OPTICS.forEach(adLoadEl);
    // Smart filtri
    AD_KEYS_SMART_FILTERS.forEach(fid => {
        AD_SMART_FIELDS.forEach(f => adLoadEl(`${fid}-${f}`));
    });
    AD_KEYS_SMART_HDR.forEach(fid => {
        AD_HDR_FIELDS.forEach(f => adLoadEl(`${fid}-hdr-${f}`));
    });
    // PRO filtri
    let proIds = ['c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii','m-dark','m-bias','c-dark','c-bias'];
    proIds.forEach(fid => {
        AD_PRO_FIELDS.forEach(f => adLoadEl(`pro-${fid}-${f}`));
    });
    // PRO HDR
    let proHdrIds = ['c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'];
    proHdrIds.forEach(fid => {
        AD_HDR_FIELDS.forEach(f => adLoadEl(`pro-${fid}-hdr-${f}`));
    });
    // Trigger PRO
    AD_KEYS_PRO_TRIGGERS.forEach(adLoadEl);
    // Nomi filtri NINA
    let ninaIds = ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'];
    ninaIds.forEach(fid => adLoadEl(`nina-name-${fid}`));
    // Ripristina anche lat/lon nelle variabili globali
    let _lat = adLoad('location-lat');
    let _lon = adLoad('location-lon');
    if (_lat && !isNaN(parseFloat(_lat))) latCorrente = parseFloat(_lat);
    if (_lon && !isNaN(parseFloat(_lon))) lonCorrente = parseFloat(_lon);
}

function apriModalResetGenerale() {
    let m = document.getElementById('modal-reset-generale');
    if (m) { m.style.display = 'block'; if (typeof t === 'function') aggiornaTestoModal(); }
}
function confermaResetGenerale() {
    document.getElementById('modal-reset-generale').style.display = 'none';
    try {
        Object.keys(localStorage).filter(k => k.startsWith('ad_')).forEach(k => localStorage.removeItem(k));
    } catch(e) {}
    location.reload();
}
function resetGenerale() { apriModalResetGenerale(); }

function apriModalResetFiltri() {
    let m = document.getElementById('modal-reset-filtri');
    if (m) { m.style.display = 'block'; }
}
function confermaResetFiltri() {
    document.getElementById('modal-reset-filtri').style.display = 'none';
    resetFiltriEsegui();
}

function resetFiltri() { apriModalResetFiltri(); }

function resetFiltriEsegui() {
    // Smart
    let allFids = ['c-light','m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii','m-dark','m-bias','c-dark','c-bias'];
    allFids.forEach(fid => {
        ['count','exp','gain','offset','bin','dfreq'].forEach(f => {
            let el = document.getElementById(`${fid}-${f}`);
            if (el) {
                if (f === 'bin') el.value = '1';
                else if (f === 'count') el.value = '0';
                else if (f === 'dfreq') el.value = '4';
                else el.value = '';
                adSave(`${fid}-${f}`, el.value);
            }
        });
    });
    // PRO
    allFids.forEach(fid => {
        ['count','exp','gain','offset','bin','dfreq'].forEach(f => {
            let el = document.getElementById(`pro-${fid}-${f}`);
            if (el) {
                if (f === 'bin') el.value = '1';
                else if (f === 'count') el.value = '0';
                else if (f === 'dfreq') el.value = '4';
                else el.value = '';
                adSave(`pro-${fid}-${f}`, el.value);
            }
        });
    });
    // Bin globale
    let binEl = document.getElementById('bin-select');
    if (binEl) { binEl.value = '1'; adSave('bin-select','1'); }
    // Nomi filtri NINA
    ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'].forEach(fid => {
        let el = document.getElementById(`nina-name-${fid}`);
        if (el) { el.value = ''; adSave(`nina-name-${fid}`,''); }
        try { localStorage.removeItem('nina_filter_' + fid); } catch(e) {}
    });
    mostraAvviso(typeof t === 'function' ? t('reset_filters_done') : 'Filtri azzerati', 'ok');
    if (typeof calcolaTempi === 'function') calcolaTempi();
    if (typeof calcolaNightFillBar === 'function') calcolaNightFillBar();
}
