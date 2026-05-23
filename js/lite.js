// lite.js — Algoritmo di calcolo modalità Base (Lite)
// ============================================================
// Funzioni parallele all'algoritmo avanzato.
// NON modifica calcolaTempi(), generaSequenzaOttimale() o
// qualsiasi altra funzione esistente.
// Entra in gioco SOLO quando modaLite === true.
// ============================================================

/**
 * Calcola l'esposizione ottimale per singola posa Light in modalità Lite.
 *
 * Logica:
 *  - Esposizione base dalla categoria target (stessa tabella _catExpMap
 *    usata in generaSequenzaOttimale() — garantisce coerenza tra le modalità)
 *  - Correzione f-ratio rispetto al riferimento f/6.0:
 *      eS = eBase × (fRatio / 6)²
 *    → telescopio veloce (f/4): meno tempo  | lento (f/8): più tempo
 *  - Cap: min 30s, max 600s, arrotondato al multiplo di 10s
 *
 * @returns {number} Esposizione in secondi
 */
function calcolaEsposizioneLite() {
    if (!targetSelezionato) return 120;

    // ── Categoria target (logica identica a generaSequenzaOttimale) ──────────
    const _nG   = (targetSelezionato.name || '').toUpperCase().replace(/\s+/g, '');
    const _tLow = (targetSelezionato.type || '').toLowerCase();
    let catG = null;

    if      (_nG.startsWith('SH2') || _nG.includes('SH2-'))             catG = 'sh2';
    else if (_nG.startsWith('LBN'))                                      catG = 'lbn';
    else if (_nG.startsWith('LDN'))                                      catG = 'ldn';
    else if (_nG.startsWith('VDB'))                                      catG = 'vdb';
    else if (_tLow.includes('supernova') || _tLow.includes('snr'))       catG = 'snr';
    else if (_tLow.includes('planetari') || _tLow.includes('planetary')) catG = 'planetaria';
    else if (_tLow.includes('galassi')   || _tLow.includes('galaxy'))    catG = 'galassia';
    else if (_tLow.includes('globulare') || _tLow.includes('globular'))  catG = 'globulare';
    else if (_tLow.includes('aperto')    || _tLow.includes('open cluster')) catG = 'aperto';
    else if (_tLow.includes('h ii') || _tLow.includes('emissio') || _tLow.includes('emission')) catG = 'hii';
    else if (_tLow.includes('riflessione') || _tLow.includes('reflection')) catG = 'vdb';
    else if (_tLow.includes('oscura') || _tLow.includes('dark'))         catG = 'ldn';

    // ── Esposizione base per categoria (identica a _catExpMap in smart.js) ───
    const _catExpMap = {
        sh2: 300, lbn: 180, ldn: 120, vdb: 180, snr: 300,
        hii: 180, galassia: 120, planetaria: 60, globulare: 30, aperto: 60
    };
    const eBase = catG ? (_catExpMap[catG] || 120) : 120;

    // ── Correzione f-ratio (riferimento f/6.0) ───────────────────────────────
    const fLVal  = typeof getFocalEffettiva === 'function'
        ? getFocalEffettiva()
        : (parseFloat((document.getElementById('focal-length') || {}).value) || 400);
    const apVal  = parseFloat((document.getElementById('aperture') || {}).value) || 72;
    const fRatio = apVal > 0 ? (fLVal / apVal) : 6.0;
    const fFact  = Math.pow(fRatio / 6.0, 2);

    // Arrotonda al multiplo di 10s; cap min 30s, max 600s
    return Math.min(600, Math.max(30, Math.round((eBase * fFact) / 10) * 10));
}

/**
 * Algoritmo di calcolo budget tempo per la modalità Base.
 * Parallelo a calcolaTempi() — non lo tocca in nessun modo.
 *
 * Logica semplificata:
 *  • Budget = finestra disponibile − 1200s (20 min overhead fisso)
 *    I 20 minuti coprono: avvio sequenza, eventuale meridian flip,
 *    movimenti telescopio, senza bisogno di configurarli singolarmente
 *  • Esposizione = calcolaEsposizioneLite() (categoria + f-ratio)
 *  • Pose = floor(budget / (esposizione + lightOverhead))
 *  • Nessun calcolo di dither, autofocus, mosaico, HDR, flip
 *  • Solo frame Light — Dark e Bias esclusi (non influenzano il budget)
 *  • Aggiorna gli stessi elementi DOM di calcolaTempi()
 *  • Chiama aggiornaAI() per l'analisi strategica (invariata)
 */
function calcolaTempiLite() {
    const _el = id => document.getElementById(id);

    // ── 1. Precondizioni: finestra temporale obbligatoria ────────────────────
    const tS = (_el('time-start') || {}).value;
    const tE = (_el('time-end')   || {}).value;
    if (!tS || !tE) return;

    // ── 2. Finestra zero: oggetto non visibile ────────────────────────────────
    if (tS === tE) {
        const fmtZ = typeof formatSeconds === 'function' ? formatSeconds(0) : '0h 0m';
        if (_el('calc-available')) _el('calc-available').innerHTML = fmtZ;
        const rDz = _el('calc-residual'), wDz = _el('calc-warning');
        if (rDz) { rDz.innerText = fmtZ; rDz.className = 'text-red'; }
        if (wDz) wDz.style.display = 'block';
        return;
    }

    // ── 3. Calcola finestra in secondi ────────────────────────────────────────
    let dS = new Date('1970-01-01T' + tS + ':00');
    let dE = new Date('1970-01-01T' + tE + ':00');
    if (dE <= dS) dE.setDate(dE.getDate() + 1);
    const finestra = (dE - dS) / 1000;

    // ── 4. Overhead sensore (formula identica a calcolaTempi) ────────────────
    const sw = parseFloat((_el('sensor-width')  || {}).value) || 23.5;
    const sh = parseFloat((_el('sensor-height') || {}).value) || 15.7;
    const px = parseFloat((_el('pixel-size')    || {}).value) || 3.76;
    const mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
    const lightOverhead = Math.max(1.5, 1.2 + mp * 0.08);

    // ── 5. Budget Lite: finestra − 20 min overhead fisso ────────────────────
    const LITE_OVERHEAD_SEC = 1200; // 20 minuti
    const budget = Math.max(0, finestra - LITE_OVERHEAD_SEC);

    // ── 6. Esposizione e numero pose ─────────────────────────────────────────
    const eS    = targetSelezionato ? calcolaEsposizioneLite() : 120;
    const ciclo = eS + lightOverhead;                          // secondi per posa
    const pose  = ciclo > 0 ? Math.floor(budget / ciclo) : 0;

    // ── 7. Tempo totale Lite ─────────────────────────────────────────────────
    // = pose Light + overhead fisso (senza dark/bias)
    const tSec = pose * ciclo + LITE_OVERHEAD_SEC;

    // ── 8. Aggiorna campi c-light nella griglia filtri ───────────────────────
    const cLightCount = _el('c-light-count');
    const cLightExp   = _el('c-light-exp');
    const cLightTot   = _el('c-light-tot');

    // Rispetta il lucchetto pose se l'utente lo ha attivato manualmente
    const _countLocked = (function() {
        const lk = _el('c-light-count-lock');
        return lk && lk.classList.contains('locked');
    })();
    if (cLightCount && !_countLocked) cLightCount.value = pose;
    if (cLightExp)   cLightExp.value   = eS;
    if (cLightTot)   cLightTot.innerHTML = typeof formatSeconds === 'function'
        ? formatSeconds(pose * ciclo) : '0h 0m';

    // Aggancia listener per aggiornamento automatico barra quando
    // l'utente modifica manualmente pose o secondi (flag evita duplicati).
    [cLightCount, cLightExp].forEach(function(el) {
        if (el && !el._liteInputAttached) {
            el.addEventListener('input', _aggiornaTempoManualeLite);
            el._liteInputAttached = true;
        }
    });

    // Nascondi righe Dark e Bias: in Lite non rientrano nel calcolo.
    // Vengono ripristinate da disattivaModaLite() al ritorno alla modalità Avanzata.
    ['c-dark', 'c-bias'].forEach(fid => {
        const row = _el(fid + '-row');
        if (row) row.style.display = 'none';
        // Azzera il count per non interferire con calcolaTempi() se si torna in Avanzato
        const cnt = _el(fid + '-count');
        if (cnt) cnt.value = '0';
    });

    // In Lite l'HDR non esiste: azzera il campo esposizione HDR del filtro Light
    // così non entra nel calcolo del budget né nell'export NINA.
    // Le righe HDR sono già nascoste via CSS (data-smart-hdr-row).
    const hdrExpEl   = _el('c-light-hdr');
    const hdrCountEl = _el('c-light-hdr-count');
    if (hdrExpEl)   hdrExpEl.value   = '';
    if (hdrCountEl) hdrCountEl.value = '0';

    // ── 9. Aggiorna display budget (stessi elementi DOM di calcolaTempi) ─────
    const fmtS = typeof formatSeconds === 'function'
        ? formatSeconds
        : s => `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m`;

    if (_el('calc-available')) _el('calc-available').innerHTML = fmtS(finestra);
    if (_el('calc-total'))     _el('calc-total').innerText     = fmtS(tSec);

    const residuo = finestra - tSec;
    const rD = _el('calc-residual'), wD = _el('calc-warning');
    const mnBtn = _el('btn-smart-overflow-mn'); // pulsante multinight — non esiste in Lite

    if (rD) {
        rD.innerText  = residuo >= 0 ? fmtS(residuo) : '- ' + fmtS(Math.abs(residuo));
        rD.className  = residuo >= 0 ? 'text-green' : 'text-red';
    }
    if (wD)    wD.style.display    = residuo < 0 ? 'block' : 'none';
    if (mnBtn) mnBtn.style.display = 'none'; // mai visibile in Lite

    // ── 10. Fill bar Smart (stesso elemento) ─────────────────────────────────
    const fillBar  = _el('smart-fill-bar');
    const fillText = _el('smart-fill-text');
    if (fillBar && finestra > 0) {
        const pct = Math.min((tSec / finestra) * 100, 999);
        fillBar.style.width      = Math.min(100, pct) + '%';
        fillBar.style.background = pct < 90 ? '#44ff44' : pct <= 100 ? '#ffaa00' : '#ff4444';
        if (fillText) {
            const strU = `${Math.floor(tSec/3600)}h ${Math.floor((tSec%3600)/60)}m`;
            const strT = `${Math.floor(finestra/3600)}h ${Math.floor((finestra%3600)/60)}m`;
            fillText.innerText = `${strU} / ${strT} (${Math.round(pct)}%)`;
        }
    }

    // ── 11. Analisi strategica: invariata (stessa funzione Avanzata) ──────────
    if (typeof aggiornaAI === 'function') aggiornaAI();

    // ── 12. Aggiorna barra temporale Lite ────────────────────────────────────
    aggiornaBarraLite();
}

/**
 * MutationObserver sul panel Analisi Strategica.
 * Ogni volta che aggiornaAI() riscrive l'innerHTML (anche da chiamate interne
 * di calcolaTempi()), il observer intercetta la modifica e nasconde subito
 * il div "Sequenza HDR attivata" (identificato dal carattere ✦).
 * Attivo solo quando modaLite === true.
 */
(function _setupHDRObserverLite() {
    function _nascondiHDR(panel) {
        panel.querySelectorAll('div').forEach(function(div) {
            if (div.textContent && div.textContent.trim().charAt(0) === '✦') {
                div.style.display = 'none';
            }
        });
    }

    function _avvia() {
        const panel = document.getElementById('ai-advisor-panel');
        if (!panel) return;
        const obs = new MutationObserver(function() {
            if (typeof modaLite !== 'undefined' && modaLite) _nascondiHDR(panel);
        });
        obs.observe(panel, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _avvia);
    } else {
        _avvia();
    }
})();

// ══════════════════════════════════════════════════════════════════
// ── BARRA TEMPORALE MODALITÀ BASE ────────────────────────────────
// ══════════════════════════════════════════════════════════════════

/**
 * Converte "HH:MM" in minuti da mezzanotte.
 * Se l'ora è inferiore a refMin - 60, aggiunge 1440 (rollover notturno).
 */
function _liteToMin(s, refMin) {
    if (!s || s === '--:--' || s === 'Fuori notte') return null;
    const parts = s.split(':');
    if (parts.length < 2) return null;
    let m = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    if (refMin !== undefined && m < refMin - 60) m += 1440;
    return m;
}

/**
 * Parsa "3h 35m" → secondi.
 */
function _liteParseTime(str) {
    if (!str) return 0;
    const h = str.match(/(\d+)h/);
    const m = str.match(/(\d+)m/);
    const s = str.match(/(\d+)s/);
    return ((h ? parseInt(h[1]) : 0) * 3600)
         + ((m ? parseInt(m[1]) : 0) * 60)
         + (s ? parseInt(s[1]) : 0);
}

/**
 * Aggiorna la barra temporale nella modalità Base.
 * Legge: info-nightstart, info-nightend, info-meridianflip,
 *        time-start, time-end, calc-total.
 */
function aggiornaBarraLite() {
    var _el = function(id) { return document.getElementById(id); };

    var nsStr = (_el('info-nightstart')  || {}).innerText || '';
    var neStr = (_el('info-nightend')    || {}).innerText || '';
    var flStr = (_el('info-meridianflip')|| {}).innerText || '';
    var tsStr = (_el('time-start')       || {}).value     || '';
    var teStr = (_el('time-end')         || {}).value     || '';

    // Aggiorna labels notte astr. agli estremi della barra
    if (_el('lite-bar-night-start')) _el('lite-bar-night-start').innerText = nsStr || '--:--';
    if (_el('lite-bar-night-end'))   _el('lite-bar-night-end').innerText   = neStr || '--:--';

    // Sincronizza input sessione nella barra con time-start/time-end
    var lts = _el('lite-ts'), lte = _el('lite-te');
    if (lts && tsStr && lts.value !== tsStr) lts.value = tsStr;
    if (lte && teStr && lte.value !== teStr) lte.value = teStr;

    // Calcola riferimento minuti
    var nsMin = _liteToMin(nsStr);
    if (nsMin === null) return;
    var neMin = _liteToMin(neStr, nsMin);
    var tsMin = tsStr ? _liteToMin(tsStr, nsMin) : nsMin;
    var teMin = teStr ? _liteToMin(teStr, nsMin) : neMin;
    var flMin = (flStr && flStr !== '--:--' && flStr !== 'Fuori notte')
                ? _liteToMin(flStr, nsMin) : null;

    if (neMin === null || neMin <= nsMin) return;

    var duration = neMin - nsMin; // minuti totale notte

    // Percentuali posizione sulla barra
    var pSess  = Math.max(0, Math.min(100, (tsMin - nsMin) / duration * 100));
    var pEnd   = Math.max(0, Math.min(100, (teMin - nsMin) / duration * 100));
    var sessW  = Math.max(0, pEnd - pSess);

    // Tempo acquisizione (in secondi, già calcolato da calcolaTempiLite)
    var totalSec  = _liteParseTime((_el('calc-total') || {}).innerText || '');
    var sessionSec = (teMin - tsMin) * 60;
    var overflow   = sessionSec > 0 && totalSec > sessionSec;

    // Larghezza riempimento acquisizione relativa alla zona sessione
    var fillW = sessionSec > 0
        ? Math.min(sessW, (totalSec / sessionSec) * sessW)
        : 0;
    var fillColor = overflow ? '#e05050' : '#2ec96c';

    // Aggiorna DOM barra
    var session  = _el('lite-bar-session');
    var fill     = _el('lite-bar-fill');
    var flipLine = _el('lite-bar-flip-line');
    var tooltip  = _el('lite-bar-tooltip');

    if (session) {
        session.style.left  = pSess + '%';
        session.style.width = sessW + '%';
    }
    if (fill) {
        fill.style.left       = pSess + '%';
        fill.style.width      = fillW + '%';
        fill.style.background = fillColor;
    }

    // Meridian Flip
    if (flipLine) {
        if (flMin !== null && flMin >= nsMin && flMin <= neMin) {
            var pFlip = Math.max(0, Math.min(100, (flMin - nsMin) / duration * 100));
            flipLine.style.left    = 'calc(' + pFlip + '% - 1px)';
            flipLine.style.opacity = '1';
        } else {
            flipLine.style.opacity = '0';
        }
    }

    // Tooltip con valori sintetici
    if (tooltip) {
        var sessH = Math.floor(sessionSec / 3600);
        var sessM = Math.floor((sessionSec % 3600) / 60);
        var acqH  = Math.floor(totalSec / 3600);
        var acqM  = Math.floor((totalSec % 3600) / 60);
        var res   = Math.abs(sessionSec - totalSec);
        var resH  = Math.floor(res / 3600);
        var resM  = Math.floor((res % 3600) / 60);
        var resLabel = overflow ? 'Sforamento' : 'Residuo';
        var resColor = overflow ? '#e05050' : '#2ec96c';
        tooltip.innerHTML =
            'Finestra: ' + sessH + 'h ' + sessM + 'm' +
            '&nbsp;&nbsp;|&nbsp;&nbsp;Acquisizione: ' + acqH + 'h ' + acqM + 'm' +
            '&nbsp;&nbsp;|&nbsp;&nbsp;<span style="color:' + resColor + '">' +
            resLabel + ': ' + resH + 'h ' + resM + 'm</span>';
    }
}

/**
 * Aggiorna il tempo acquisizione e la barra quando l'utente modifica
 * manualmente pose o secondi in modalità Lite.
 * NON ricalcola le pose — rispetta i valori inseriti dall'utente.
 */
function _aggiornaTempoManualeLite() {
    if (typeof modaLite === 'undefined' || !modaLite) return;

    var _el = function(id) { return document.getElementById(id); };

    var count = parseInt((_el('c-light-count') || {}).value) || 0;
    var exp   = parseFloat((_el('c-light-exp')   || {}).value) || 0;

    // Overhead sensore (stessa formula di calcolaTempiLite)
    var sw = parseFloat((_el('sensor-width')  || {}).value) || 23.5;
    var sh = parseFloat((_el('sensor-height') || {}).value) || 15.7;
    var px = parseFloat((_el('pixel-size')    || {}).value) || 3.76;
    var mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
    var lightOverhead = Math.max(1.5, 1.2 + mp * 0.08);

    var LITE_OVERHEAD_SEC = 1200;
    var tSec = count * (exp + lightOverhead) + LITE_OVERHEAD_SEC;

    // Aggiorna Totale riga c-light
    var cLightTot = _el('c-light-tot');
    if (cLightTot && typeof formatSeconds === 'function')
        cLightTot.innerHTML = formatSeconds(count * (exp + lightOverhead));

    // Aggiorna calc-total (letto da aggiornaBarraLite)
    var totalEl = _el('calc-total');
    if (totalEl && typeof formatSeconds === 'function')
        totalEl.innerText = formatSeconds(tSec);

    // Aggiorna la barra
    if (typeof aggiornaBarraLite === 'function') aggiornaBarraLite();
}
