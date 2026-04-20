// night_popup.js — Popup analisi condizioni notturne
// Dipendenze: globals.js, weather.js (_calcolaSeeing, datiMeteo, latCorrente, lonCorrente,
//             sessionDateLabel, getSessionDate, adLoad),
//             i18n.js (t, lang), SunCalc (CDN), dsoDatabase (database.js)
// ============================================================

// ── Legge il FOV del setup ottico da localStorage ─────────────────────────────
// Restituisce { fovW, fovH, fovMin, fovMax } in arcominuti, oppure null se
// il setup non è ancora stato configurato dall'utente.
function _npGetFov() {
    const fl  = parseFloat(adLoad('focal-length')) || 0;
    const sw  = parseFloat(adLoad('sensor-w'))     || 0;
    const sh  = parseFloat(adLoad('sensor-h'))     || 0;
    const fat = parseFloat(localStorage.getItem('ad_accessorio_fattore') || '1.0');
    if (!fl || !sw || !sh) return null;
    const flEff = fl * fat;
    const fovW  = 2 * Math.atan(sw / (2 * flEff)) * (180 / Math.PI) * 60; // arcmin
    const fovH  = 2 * Math.atan(sh / (2 * flEff)) * (180 / Math.PI) * 60; // arcmin
    return { fovW, fovH, fovMin: Math.min(fovW, fovH), fovMax: Math.max(fovW, fovH) };
}

// ── Calcola l'analisi della notte astronomica ──────────────────────────────────
// Restituisce un oggetto con categoria, statistiche medie e finestra notturna,
// oppure null se i dati meteo non sono disponibili.
function _npAnalisiNotte() {
    if (!datiMeteo || !datiMeteo.time) return null;

    const sessionDate  = getSessionDate();
    const sunTimesToday = SunCalc.getTimes(sessionDate, latCorrente, lonCorrente);
    const nextDay       = new Date(sessionDate.getTime() + 86400000);
    const sunTimesNext  = SunCalc.getTimes(nextDay, latCorrente, lonCorrente);

    const nightStart = sunTimesToday.night   || sunTimesToday.dusk;
    const nightEnd   = sunTimesNext.nightEnd  || sunTimesNext.dawn;

    if (!nightStart || !nightEnd || nightStart >= nightEnd) return null;

    let oreUtilizzabili = 0, oreTotali = 0;
    let sumSeeing = 0, sumTransp = 0, sumMoon = 0;

    for (let i = 0; i < datiMeteo.time.length; i++) {
        const ora = new Date(datiMeteo.time[i]);
        if (ora < nightStart || ora > nightEnd) continue;
        oreTotali++;

        const b       = datiMeteo.cloud_cover_low[i]             || 0;
        const m       = datiMeteo.cloud_cover_mid[i]             || 0;
        const a       = datiMeteo.cloud_cover_high[i]            || 0;
        const jet     = datiMeteo.wind_speed_250hPa[i]           || 0;
        const raffica = datiMeteo.wind_gusts_10m
                        ? (datiMeteo.wind_gusts_10m[i] || 0) : 0;
        const li      = datiMeteo.lifted_index
                        ? (datiMeteo.lifted_index[i]   || 0) : 0;
        const cape    = datiMeteo.cape
                        ? (datiMeteo.cape[i]           || 0) : 0;

        // Trasparenza: ogni strato contribuisce indipendentemente, poi si sommano
        // Nuvole basse: le più bloccanti
        const penBasse = b <= 20 ? 0
                       : b <= 50 ? (b - 20) / 30 * 35
                       : 35 + (b - 50) / 50 * 25;
        // Nuvole medie: significative
        const penMedie = m <= 30 ? m / 30 * 15
                       : m <= 60 ? 15 + (m - 30) / 30 * 25
                       : 40 + (m - 60) / 40 * 15;
        // Nuvole alte (cirri): filtrano ma non bloccano completamente
        const penAlte  = a <= 20 ? 0
                       : a <= 50 ? (a - 20) / 30 * 20
                       : 20 + (a - 50) / 50 * 15;
        const cloudOpacity = Math.min(100, penBasse + penMedie + penAlte);
        const transp = Math.max(0, 100 - cloudOpacity);
        sumTransp += transp;

        // Seeing con formula scientifica (condivisa con weather.js)
        const seeingVal = _calcolaSeeing(jet, raffica, li, cape);
        sumSeeing += seeingVal;

        // Inquinamento lunare
        const mPos     = SunCalc.getMoonPosition(ora, latCorrente, lonCorrente);
        const moonFrac = SunCalc.getMoonIllumination(ora).fraction;
        const inqL     = mPos.altitude > 0
            ? Math.max(0, Math.round(moonFrac * Math.sin(mPos.altitude) * 100))
            : 0;
        sumMoon += inqL;

        // Un'ora è "utilizzabile" se il cielo è abbastanza libero e il seeing è almeno discreto
        if (transp > 55 && seeingVal >= 3) oreUtilizzabili++;
    }

    if (oreTotali === 0) return null;

    const pct      = Math.round((oreUtilizzabili / oreTotali) * 100);
    const avgSee   = sumSeeing / oreTotali;
    const avgTransp = Math.round(sumTransp / oreTotali);
    const avgMoon  = Math.round(sumMoon / oreTotali);

    // Classificazione in 5 categorie
    let categoria;
    if      (pct >= 85 && avgSee >= 4) categoria = 'perfetta';
    else if (pct >= 70)                categoria = 'promettente';
    else if (pct >= 50)                categoria = 'incerta';
    else if (pct >= 31)                categoria = 'non_vale_la_pena';
    else                               categoria = 'lascia_perdere';

    return {
        categoria, pct,
        avgSeeing:  Math.round(avgSee * 10) / 10,
        avgTransp,  avgMoon,
        nightStart, nightEnd
    };
}

// ── Seleziona i DSO migliori per la notte ─────────────────────────────────────
// Calcola l'altitudine massima di ogni DSO nella finestra notturna.
// Se il setup è configurato, applica un bonus/malus di compatibilità FOV.
function _npSelezionaDso(nightStart, nightEnd) {
    const fov = _npGetFov();

    const candidati = dsoDatabase.map(dso => {
        // Campiona ogni 30 min per trovare il massimo in altitudine
        let maxAlt = -90;
        let cur = new Date(nightStart.getTime());
        while (cur <= nightEnd) {
            const pos = calcolaAltAz(dso.ra, dso.dec, latCorrente, lonCorrente, cur);
            if (pos.alt > maxAlt) maxAlt = pos.alt;
            cur = new Date(cur.getTime() + 1800000);
        }

        let score   = maxAlt;
        let fovNote = null;

        // Compatibilità FOV (solo se setup configurato e oggetto visibile)
        if (fov && maxAlt > 25) {
            const sz = dso.size || 30; // arcmin
            if (sz >= fov.fovMin * 0.15 && sz <= fov.fovMax * 1.1) {
                score  += 15;
                fovNote = 'ok';
            } else if (sz > fov.fovMax * 2) {
                score  -= 10;
                fovNote = 'large';
            } else if (sz < fov.fovMin * 0.05) {
                score  -= 10;
                fovNote = 'small';
            }
        }

        return { dso, maxAlt: Math.round(maxAlt), score, fovNote };
    })
    .filter(d => d.maxAlt > 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

    return candidati;
}

// ── Popola il DOM del popup con i dati calcolati ──────────────────────────────
function _npPopolaPopup(analisi, dsoList) {
    const { categoria, pct, avgSeeing, avgTransp, avgMoon } = analisi;

    // Config per categoria — usa t() per la traduzione
    const cfgMap = {
        perfetta:         { emoji: '🌟', label: t('np_perfetta'),         color: '#2ecc71', tagline: t('np_perfetta_tag') },
        promettente:      { emoji: '✨', label: t('np_promettente'),       color: '#c49a3c', tagline: t('np_promettente_tag') },
        incerta:          { emoji: '🌥️', label: t('np_incerta'),          color: '#e67e22', tagline: t('np_incerta_tag') },
        non_vale_la_pena: { emoji: '☁️', label: t('np_non_vale'),         color: '#c0392b', tagline: t('np_non_vale_tag') },
        lascia_perdere:   { emoji: '🌫️', label: t('np_lascia_perdere'),   color: '#7f1f1f', tagline: t('np_lascia_perdere_tag') }
    };
    const cfg = cfgMap[categoria];

    // Badge principale
    document.getElementById('np-emoji').textContent    = cfg.emoji;
    document.getElementById('np-categoria').textContent = cfg.label;
    document.getElementById('np-categoria').style.color = cfg.color;
    document.getElementById('np-tagline').textContent   = cfg.tagline;
    const badge = document.getElementById('np-badge');
    badge.style.borderColor = cfg.color + '55';
    badge.style.background  = cfg.color + '12';

    // Data e location
    document.getElementById('np-date').textContent = sessionDateLabel(lang);
    const locName = localStorage.getItem('ad_location_name') || '';
    const locEl   = document.getElementById('np-location');
    if (locEl) locEl.textContent = locName ? '📍 ' + locName : '';

    // Warning approssimazione
    const warnEl = document.getElementById('np-warning');
    if (warnEl) warnEl.textContent = t('np_warning');

    // Pillole statistiche
    document.getElementById('np-stat-transp').textContent = avgTransp + '%';
    document.getElementById('np-stat-moon').textContent   = avgMoon   + '%';

    const seeRound = Math.round(avgSeeing);
    const seeEl    = document.getElementById('np-stat-seeing');
    seeEl.textContent  = seeRound + '/5';
    const seeColors = { 1:'#8e44ad', 2:'#e74c3c', 3:'#e67e22', 4:'#f1c40f', 5:'#2ecc71' };
    seeEl.style.color  = seeColors[seeRound] || '#c49a3c';

    // Colore trasparenza in base al valore
    const transpEl = document.getElementById('np-stat-transp');
    transpEl.style.color = avgTransp >= 75 ? '#2ecc71'
                         : avgTransp >= 50 ? '#c49a3c'
                         : '#e74c3c';

    // ── Mappa immagini DSO ────────────────────────────────────────────────────
    // Priorità: images/dso/ poi images/ext/ — se non trovata usa SVG eye-star
    const _DSO_IMGS = {
        // images/dso/
        'ic434':'images/dso/ic434.png','ic1396':'images/dso/ic1396.png',
        'ic1805':'images/dso/ic1805.png',
        'm1':'images/dso/m1.png','m13':'images/dso/m13.png',
        'm16':'images/dso/m16.png','m27':'images/dso/m27.png',
        'm31':'images/dso/m31.png','m33':'images/dso/m33.png',
        'm42':'images/dso/m42.png','m43':'images/dso/m43.png',
        'm45':'images/dso/m45.png','m51':'images/dso/m51.png',
        'm81':'images/dso/m81.png','m82':'images/dso/m82.png',
        'ngc891':'images/dso/ngc891.png','ngc1499':'images/dso/ngc1499.png',
        'ngc2244':'images/dso/ngc2244.png','ngc2359':'images/dso/ngc2359.png',
        'ngc4631':'images/dso/ngc4631.png','ngc5907':'images/dso/ngc5907.png',
        'ngc6888':'images/dso/ngc6888.png','ngc6946':'images/dso/ngc6946.png',
        'ngc7023':'images/dso/ngc7023.png','ngc7331':'images/dso/ngc7331.png',
        'ngc7380':'images/dso/ngc7380.png','sh2-101':'images/dso/sh2-101.png',
        // images/ext/
        'm3':'images/ext/m3.png','m4':'images/ext/m4.png',
        'm6':'images/ext/m6.png','m7':'images/ext/m7.png',
        'm8':'images/ext/m8.png','m11':'images/ext/m11.png',
        'm15':'images/ext/m15.png','m17':'images/ext/m17.png',
        'm20':'images/ext/m20.png','m22':'images/ext/m22.png',
        'm35':'images/ext/m35.png','m44':'images/ext/m44.png',
        'm57':'images/ext/m57.png','m63':'images/ext/m63.png',
        'm64':'images/ext/m64.png','m65':'images/ext/m65.png',
        'm66':'images/ext/m66.png','m74':'images/ext/m74.png',
        'm76':'images/ext/m76.png','m78':'images/ext/m78.png',
        'm83':'images/ext/m83.png','m92':'images/ext/m92.png',
        'm97':'images/ext/m97.png','m101':'images/ext/m101.png',
        'm104':'images/ext/m104.png','m106':'images/ext/m106.png',
        'ngc253':'images/ext/ngc253.png','ngc281':'images/ext/ngc281.png',
        'ngc869':'images/ext/ngc869.png','ngc2070':'images/ext/ngc2070.png',
        'ngc2174':'images/ext/ngc2174.png','ngc2264':'images/ext/ngc2264.png',
        'ngc2392':'images/ext/ngc2392.png','ngc2403':'images/ext/ngc2403.png',
        'ngc3242':'images/ext/ngc3242.png','ngc3372':'images/ext/ngc3372.png',
        'ngc3628':'images/ext/ngc3628.png','ngc4038':'images/ext/ngc4038.png',
        'ngc4565':'images/ext/ngc4565.png','ngc5092':'images/ext/ngc5092.png',
        'ngc5128':'images/ext/ngc5128.png','ngc5139':'images/ext/ngc5139.png',
        'ngc6334':'images/ext/ngc6334.png','ngc6357':'images/ext/ngc6357.png',
        'ngc6543':'images/ext/ngc6543.png','ngc6960':'images/ext/ngc6960.png',
        'ngc6992':'images/ext/ngc6992.png','ngc7000':'images/ext/ngc7000.png',
        'ngc7293':'images/ext/ngc7293.png','ngc7789':'images/ext/ngc7789.png',
        'ic410':'images/ext/ic410.png','ic1848':'images/ext/ic1848.png',
        'ic2177':'images/ext/ic2177.png','ic5070':'images/ext/ic5070.png',
        'ic5146':'images/ext/ic5146.png',
        'sh2-155':'images/ext/sh2_155.png','sh2-240':'images/ext/sh2_240.png',
        'sh2-308':'images/ext/sh2_308.png',
        'lmc':'images/ext/lmc.png','smc':'images/ext/smc.png',
        'stephan':'images/ext/stephan.png','markarian':'images/ext/markarian.png',
        'ou4':'images/ext/ou4.png'
    };

    const _SVG_EYESTAR_HTML = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"
        viewBox="0 0 24 24" fill="none" stroke="#c49a3c" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/>
        <path d="M9.608 17.682c-2.558-.71-4.76-2.603-6.608-5.682c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6"/>
        <path d="M17.8 20.817l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707
            a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193
            l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411
            l-2.172-1.138"/>
    </svg>`;

    // Lista DSO
    const container = document.getElementById('np-dso-list');
    container.innerHTML = '';

    if (dsoList.length === 0) {
        container.innerHTML = `<div style="font-size:12px;color:#6e7a8a;padding:4px 0;">${t('np_no_dso')}</div>`;
        return;
    }

    dsoList.forEach(({ dso, maxAlt, fovNote }) => {
        const nome   = dso[lang] || dso.it || dso.name;
        const imgSrc = _DSO_IMGS[dso.id] || null;

        // Contenitore icona — costruito via DOM per evitare problemi di escape
        const iconWrap = document.createElement('div');
        iconWrap.style.cssText = 'width:56px;height:56px;flex-shrink:0;border-radius:8px;overflow:hidden;border:1px solid #21293a;background:#0a0e14;display:flex;align-items:center;justify-content:center;';

        if (imgSrc) {
            const img = document.createElement('img');
            img.src   = imgSrc;
            img.alt   = dso.name;
            img.style.cssText = 'width:56px;height:56px;object-fit:cover;display:block;';
            img.onerror = () => { iconWrap.innerHTML = _SVG_EYESTAR_HTML; };
            iconWrap.appendChild(img);
        } else {
            iconWrap.innerHTML = _SVG_EYESTAR_HTML;
        }

        let fovBadge = '';
        if (fovNote === 'ok')    fovBadge = `<span style="font-size:10px;color:#2ecc71;">● ${t('np_fov_ok')}</span>`;
        if (fovNote === 'large') fovBadge = `<span style="font-size:10px;color:#e67e22;">● ${t('np_fov_large')}</span>`;
        if (fovNote === 'small') fovBadge = `<span style="font-size:10px;color:#6e7a8a;">● ${t('np_fov_small')}</span>`;

        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #161b22;cursor:pointer;transition:background .15s;';
        row.onmouseenter = () => { row.style.background = '#161b22'; };
        row.onmouseleave = () => { row.style.background = 'transparent'; };

        const textDiv = document.createElement('div');
        textDiv.style.cssText = 'flex:1;min-width:0;';
        textDiv.innerHTML = `
            <div style="font-size:12px;color:#c9d1d9;font-weight:600;">${dso.name}
                <span style="font-weight:400;color:#6e7a8a;"> — ${nome}</span>
            </div>
            ${fovBadge ? '<div style="margin-top:2px;">' + fovBadge + '</div>' : ''}`;

        const altSpan = document.createElement('span');
        altSpan.style.cssText = 'font-size:11px;color:#c49a3c;flex-shrink:0;font-family:\'Audiowide\',sans-serif;white-space:nowrap;';
        altSpan.textContent = t('np_max') + ' ' + maxAlt + '°';

        row.appendChild(iconWrap);
        row.appendChild(textDiv);
        row.appendChild(altSpan);

        // Click → chiude popup, apre planetario e scrolla alla card del DSO
        row.onclick = () => _npApriNelPlanetario(dso);

        container.appendChild(row);
    });
}

// ── Entry point pubblico ───────────────────────────────────────────────────────
// Chiamata da scaricaDatiPrevisionali() dopo il caricamento dei dati meteo.
function mostraNightPopup() {
    const analisi = _npAnalisiNotte();
    if (!analisi) return;

    const dsoList = _npSelezionaDso(analisi.nightStart, analisi.nightEnd);
    _npPopolaPopup(analisi, dsoList);

    const modal = document.getElementById('night-popup-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// ── Navigazione al planetario ─────────────────────────────────────────────────
function _npApriNelPlanetario(dso) {
    chiudiNightPopup();
    if (typeof vaiPlanetario === 'function') vaiPlanetario();
}

function chiudiNightPopup() {
    const modal = document.getElementById('night-popup-modal');
    if (modal) modal.style.display = 'none';
}
