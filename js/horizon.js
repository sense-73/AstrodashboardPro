/**
 * AstroDashboard PRO — Modulo Orizzonte
 * Versione integrata: nessuna dipendenza esterna, compatibile con vanilla JS.
 *
 * Algoritmo di rilevamento:
 *   - Applica un filtro Sobel verticale per trovare i bordi orizzontali
 *   - Scansiona ogni colonna dall'alto cercando il gradiente massimo
 *     all'interno di una fascia di ricerca configurabile (evita il cielo puro)
 *   - Smoothing circolare con finestra configurabile
 *
 * Export: NINA (.hrz), Stellarium (.zip con landscape.ini + horizon.txt),
 *         KStars (.hrz), Cartes du Ciel (.hor), CSV, JSON
 */

(function () {
  'use strict';

  // ─── Stato globale del modulo ─────────────────────────────────────────────
  const HZ = {
    img: null,
    rowMap: null,
    profile: [],
    srcW: 0,
    srcH: 0,
    opts: {
      method: 'sobel',          // 'sobel' | 'gradient' | 'threshold' | 'dark_band'
      vfov: 90,
      centerAltitude: 10,
      startAzimuth: 0,
      hspan: 360,
      luminanceThresh: 140,
      smoothRadius: 15,
      outputPoints: 360,
      searchTop: 0.05,          // ignora il top X% (cielo puro, sole)
      searchBottom: 0.80,       // ignora sotto il Y% (terreno uniforme)
      maxW: 1440,
      maxH: 720,
    },
    // Coordinate postazione (sincronizzate con globals.js)
    lat: null,
    lon: null,
    altitude: 0,
    locationName: '',
  };

  // ─── Utilità ──────────────────────────────────────────────────────────────
  function lum(r, g, b) { return 0.299 * r + 0.587 * g + 0.114 * b; }

  function smoothCircular(arr, r) {
    const n = arr.length, out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let s = 0, c = 0;
      for (let d = -r; d <= r; d++) { s += arr[(i + d + n) % n]; c++; }
      out[i] = s / c;
    }
    return out;
  }

  function yToAlt(y, H, ca, vfov) { return ca + (H / 2 - y) * (vfov / H); }
  function altToY(alt, H, ca, vfov) { return H / 2 - (alt - ca) * (H / vfov); }

  // ─── Algoritmo Sobel (principale) ─────────────────────────────────────────
  // Calcola la derivata verticale della luminanza usando un kernel Sobel 3×3.
  // Rileva la transizione cielo→terra come il picco negativo della derivata.
  function detectSobel(data, W, H, opts) {
    const raw = new Float32Array(W);
    const yTop = Math.floor(H * opts.searchTop);
    const yBot = Math.floor(H * opts.searchBottom);

    for (let x = 0; x < W; x++) {
      const getL = (xx, yy) => {
        const xi = Math.max(0, Math.min(W - 1, xx));
        const yi = Math.max(0, Math.min(H - 1, yy));
        const i = (yi * W + xi) * 4;
        return lum(data[i], data[i + 1], data[i + 2]);
      };

      let maxGrad = -Infinity, hy = (yTop + yBot) / 2;
      for (let y = yTop + 1; y < yBot - 1; y++) {
        // Sobel verticale: differenza tra riga superiore e inferiore
        const grad = (getL(x - 1, y - 1) + 2 * getL(x, y - 1) + getL(x + 1, y - 1))
                   - (getL(x - 1, y + 1) + 2 * getL(x, y + 1) + getL(x + 1, y + 1));
        if (grad > maxGrad) { maxGrad = grad; hy = y; }
      }
      raw[x] = hy;
    }
    return raw;
  }

  // ─── Algoritmo Gradiente semplice ─────────────────────────────────────────
  function detectGradient(data, W, H, opts) {
    const raw = new Float32Array(W);
    const yTop = Math.floor(H * opts.searchTop);
    const yBot = Math.floor(H * opts.searchBottom);

    for (let x = 0; x < W; x++) {
      const colL = y => {
        const i = (y * W + x) * 4;
        return lum(data[i], data[i + 1], data[i + 2]);
      };
      let mg = -Infinity, hy = (yTop + yBot) / 2;
      for (let y = yTop + 3; y < yBot - 3; y++) {
        const g = colL(y - 3) - colL(y + 3);
        if (g > mg) { mg = g; hy = y; }
      }
      raw[x] = hy;
    }
    return raw;
  }

  // ─── Algoritmo Soglia ─────────────────────────────────────────────────────
  function detectThreshold(data, W, H, opts) {
    const raw = new Float32Array(W);
    const yTop = Math.floor(H * opts.searchTop);
    const yBot = Math.floor(H * opts.searchBottom);

    for (let x = 0; x < W; x++) {
      let hy = yBot;
      for (let y = yTop; y < yBot; y++) {
        const i = (y * W + x) * 4;
        if (lum(data[i], data[i + 1], data[i + 2]) < opts.luminanceThresh) { hy = y; break; }
      }
      raw[x] = hy;
    }
    return raw;
  }

  // ─── Algoritmo Dark Band ──────────────────────────────────────────────────
  function detectDarkBand(data, W, H, opts) {
    const raw = new Float32Array(W);
    const yTop = Math.floor(H * opts.searchTop);
    const yBot = Math.floor(H * opts.searchBottom);

    for (let x = 0; x < W; x++) {
      let seenLight = false, hy = yBot;
      for (let y = yTop; y < yBot; y++) {
        const i = (y * W + x) * 4;
        const l = lum(data[i], data[i + 1], data[i + 2]);
        if (!seenLight && l > opts.luminanceThresh) seenLight = true;
        if (seenLight && l < opts.luminanceThresh * 0.6) { hy = y; break; }
      }
      raw[x] = hy;
    }
    return raw;
  }

  // ─── Dispatcher algoritmi ─────────────────────────────────────────────────
  function detectRaw(data, W, H, opts) {
    switch (opts.method) {
      case 'gradient':  return detectGradient(data, W, H, opts);
      case 'threshold': return detectThreshold(data, W, H, opts);
      case 'dark_band': return detectDarkBand(data, W, H, opts);
      default:          return detectSobel(data, W, H, opts);
    }
  }

  // ─── Build profilo az/alt ─────────────────────────────────────────────────
  function buildProfile(rowMap, W, H, opts) {
    const pts = [], n = opts.outputPoints;
    for (let i = 0; i < n; i++) {
      const frac = i / n;
      const az = ((opts.startAzimuth + frac * opts.hspan) % 360 + 360) % 360;
      const xi = Math.min(Math.floor(frac * W), W - 1);
      const alt = yToAlt(rowMap[xi], H, opts.centerAltitude, opts.vfov);
      pts.push({ az: Math.round(az * 10) / 10, alt: Math.round(alt * 10) / 10 });
    }
    pts.sort((a, b) => a.az - b.az);
    return pts;
  }

  // ─── Statistiche ─────────────────────────────────────────────────────────
  function stats(profile) {
    const alts = profile.map(p => p.alt);
    const sum = alts.reduce((s, v) => s + v, 0);
    return {
      min: Math.min(...alts),
      max: Math.max(...alts),
      mean: sum / alts.length,
    };
  }

  // ─── Rilevamento principale ───────────────────────────────────────────────
  function runDetection() {
    if (!HZ.img) return;
    const opts = readOpts();
    HZ.opts = opts;

    const scale = Math.min(opts.maxW / HZ.img.naturalWidth, opts.maxH / HZ.img.naturalHeight, 1);
    HZ.srcW = Math.round(HZ.img.naturalWidth * scale);
    HZ.srcH = Math.round(HZ.img.naturalHeight * scale);

    const oc = document.createElement('canvas');
    oc.width = HZ.srcW; oc.height = HZ.srcH;
    const ox = oc.getContext('2d');
    ox.drawImage(HZ.img, 0, 0, HZ.srcW, HZ.srcH);
    const rgba = ox.getImageData(0, 0, HZ.srcW, HZ.srcH).data;

    const raw = detectRaw(rgba, HZ.srcW, HZ.srcH, opts);
    HZ.rowMap = smoothCircular(raw, opts.smoothRadius);
    HZ.profile = buildProfile(HZ.rowMap, HZ.srcW, HZ.srcH, opts);
    renderPreview();
    renderChart();
    updateStats();
    show('hz-results');
    document.getElementById('hz-pt-count').textContent = HZ.profile.length + ' punti';
  }

  // ─── Lettura parametri da UI ──────────────────────────────────────────────
  function readOpts() {
    return {
      method: v('hz-method'),
      vfov: +v('hz-vfov'),
      centerAltitude: +v('hz-calt'),
      startAzimuth: +v('hz-saz'),
      hspan: +v('hz-hsp'),
      luminanceThresh: +v('hz-thr'),
      smoothRadius: +v('hz-sm'),
      searchTop: +v('hz-stop') / 100,
      searchBottom: +v('hz-sbot') / 100,
      outputPoints: 360,
      maxW: 1440,
      maxH: 720,
    };
  }

  // ─── Renderer anteprima ───────────────────────────────────────────────────
  function renderPreview() {
    const cv = document.getElementById('hz-preview');
    if (!cv || !HZ.img || !HZ.rowMap) return;

    // Switcha dropzone → canvas
    const dz = document.getElementById('hz-dropzone');
    const wrap = document.getElementById('hz-preview-wrap');
    if (dz) dz.style.display = 'none';
    if (wrap) wrap.style.display = '';

    const mw = cv.parentElement.clientWidth || 700;
    cv.width = mw;
    cv.height = Math.round(mw * (HZ.srcH / HZ.srcW));
    const ctx = cv.getContext('2d');
    const sx = cv.width / HZ.srcW, sy = cv.height / HZ.srcH;
    const opts = HZ.opts;

    ctx.drawImage(HZ.img, 0, 0, cv.width, cv.height);

    // Zona oscurata sotto l'orizzonte
    ctx.beginPath();
    for (let x = 0; x < HZ.srcW; x++) {
      const cx = x * sx, cy = HZ.rowMap[x] * sy;
      x === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.lineTo(cv.width, cv.height); ctx.lineTo(0, cv.height); ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.42)'; ctx.fill();

    // Linea orizzonte
    ctx.beginPath(); ctx.strokeStyle = '#E24B4A'; ctx.lineWidth = 2;
    for (let x = 0; x < HZ.srcW; x++) {
      const cx = x * sx, cy = HZ.rowMap[x] * sy;
      x === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Linea 0° altitudine
    const zy = altToY(0, HZ.srcH, opts.centerAltitude, opts.vfov) * sy;
    if (zy >= 0 && zy <= cv.height) {
      ctx.save(); ctx.strokeStyle = 'rgba(200,200,200,0.5)'; ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(0, zy); ctx.lineTo(cv.width, zy); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = 'rgba(200,200,200,0.8)'; ctx.font = '10px sans-serif';
      ctx.fillText('0° alt', 4, zy - 3);
    }

    // Punti cardinali
    const dirs = [{ a: 0, l: 'N' }, { a: 90, l: 'E' }, { a: 180, l: 'S' }, { a: 270, l: 'O' }];
    dirs.forEach(({ a, l }) => {
      const frac = ((a - opts.startAzimuth + 360) % 360) / opts.hspan;
      if (frac < 0 || frac > 1) return;
      const cx = frac * HZ.srcW * sx;
      ctx.save(); ctx.strokeStyle = 'rgba(220,220,220,0.35)'; ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, cv.height); ctx.stroke(); ctx.restore();
      ctx.fillStyle = 'rgba(220,220,220,0.9)'; ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(l, cx, 14); ctx.textAlign = 'left';
    });

    // Fascia di ricerca
    const yTop = HZ.srcH * opts.searchTop * sy;
    const yBot = HZ.srcH * opts.searchBottom * sy;
    ctx.fillStyle = 'rgba(55,138,221,0.06)';
    ctx.fillRect(0, yTop, cv.width, yBot - yTop);
  }

  // ─── Renderer grafico Az/Alt ──────────────────────────────────────────────
  function renderChart() {
    const cv = document.getElementById('hz-chart');
    if (!cv || !HZ.profile.length) return;
    cv.width = cv.parentElement.clientWidth - 32 || 700;
    cv.height = 170;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);

    const alts = HZ.profile.map(p => p.alt);
    const mn = Math.floor(Math.min(...alts) / 5) * 5 - 5;
    const mx = Math.ceil(Math.max(...alts) / 5) * 5 + 5;
    const rng = mx - mn || 1;
    const pad = [8, 10, 26, 42];
    const W = cv.width - pad[1] - pad[3], H = cv.height - pad[0] - pad[2];
    const xm = az => pad[3] + (az / 360) * W;
    const ym = alt => pad[0] + H - ((alt - mn) / rng) * H;

    // Griglia altitudine
    for (let a = mn; a <= mx; a += 5) {
      const y = ym(a); if (y < pad[0] || y > pad[0] + H) continue;
      ctx.strokeStyle = 'rgba(100,120,160,0.12)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(pad[3], y); ctx.lineTo(pad[3] + W, y); ctx.stroke();
      ctx.fillStyle = 'rgba(150,160,180,0.7)'; ctx.font = '9px sans-serif';
      ctx.textAlign = 'right'; ctx.fillText(a + '°', pad[3] - 4, y + 3);
    }

    // Griglia azimut
    const dnames = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO', 'N'];
    for (let i = 0; i <= 8; i++) {
      const az = i * 45, x = xm(az);
      ctx.fillStyle = 'rgba(150,160,180,0.7)'; ctx.font = '9px sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(dnames[i], x, cv.height - 7);
      ctx.strokeStyle = 'rgba(100,120,160,0.08)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(x, pad[0]); ctx.lineTo(x, pad[0] + H); ctx.stroke();
    }

    // Area riempita
    ctx.beginPath();
    HZ.profile.forEach((p, i) => {
      i === 0 ? ctx.moveTo(xm(p.az), pad[0] + H) : ctx.lineTo(xm(p.az), ym(p.alt));
    });
    ctx.lineTo(pad[3] + W, pad[0] + H); ctx.closePath();
    ctx.fillStyle = 'rgba(226,75,74,0.10)'; ctx.fill();

    // Linea profilo
    ctx.beginPath(); ctx.strokeStyle = '#E24B4A'; ctx.lineWidth = 1.5;
    HZ.profile.forEach((p, i) => {
      i === 0 ? ctx.moveTo(xm(p.az), ym(p.alt)) : ctx.lineTo(xm(p.az), ym(p.alt));
    });
    ctx.stroke();

    // Linea 0°
    const zy = ym(0);
    if (zy >= pad[0] && zy <= pad[0] + H) {
      ctx.save(); ctx.strokeStyle = 'rgba(150,160,180,0.3)'; ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pad[3], zy); ctx.lineTo(pad[3] + W, zy); ctx.stroke();
      ctx.restore();
    }
    ctx.textAlign = 'left';
  }

  function updateStats() {
    const s = stats(HZ.profile);
    setText('hz-stat-min', s.min.toFixed(1) + '°');
    setText('hz-stat-max', s.max.toFixed(1) + '°');
    setText('hz-stat-avg', s.mean.toFixed(1) + '°');
  }

  // ─── Correzione manuale (click su anteprima) ──────────────────────────────
  function attachClickHandler() {
    const cv = document.getElementById('hz-preview');
    if (!cv) return;
    cv.onclick = function (e) {
      if (!HZ.rowMap) return;
      const rect = cv.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (cv.width / rect.width);
      const my = (e.clientY - rect.top) * (cv.height / rect.height);
      const ox = Math.round(mx / (cv.width / HZ.srcW));
      const oy = my / (cv.height / HZ.srcH);
      const r = 30;
      for (let dx = -r; dx <= r; dx++) {
        const xi = Math.min(Math.max(ox + dx, 0), HZ.srcW - 1);
        const w = Math.cos((dx / r) * (Math.PI / 2));
        HZ.rowMap[xi] = HZ.rowMap[xi] * (1 - w) + oy * w;
      }
      HZ.profile = buildProfile(HZ.rowMap, HZ.srcW, HZ.srcH, HZ.opts);
      renderPreview(); renderChart(); updateStats();
    };
  }

  // ─── Legge il nome file dal campo "nome postazione" ──────────────────────
  function getExportName() {
    const el = document.getElementById('hz-location-name');
    const val = el ? el.value.trim().replace(/[^a-zA-Z0-9_\-àèéìòùÀÈÉÌÒÙ ]/g, '').replace(/\s+/g, '-') : '';
    return val || 'mio-orizzonte';
  }

  // ─── localStorage ─────────────────────────────────────────────────────────
  const LS_KEY = 'adp_horizon_profile';

  function saveToLocalStorage() {
    if (!HZ.profile.length) return;
    const data = {
      version: 1,
      savedAt: new Date().toISOString(),
      opts: HZ.opts,
      lat: HZ.lat, lon: HZ.lon, altitude: HZ.altitude,
      locationName: HZ.locationName,
      profile: HZ.profile,
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
      const badge = document.getElementById('hz-saved-badge');
      if (badge) { badge.style.display = ''; setTimeout(() => { badge.style.display = 'none'; }, 3000); }
    } catch(e) { if (DEBUG) console.warn('HorizonDetector: localStorage non disponibile', e); }
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.profile || !data.profile.length) return false;
      HZ.profile = data.profile;
      HZ.opts = { ...HZ.opts, ...data.opts };
      HZ.lat = data.lat; HZ.lon = data.lon;
      HZ.altitude = data.altitude || 0;
      HZ.locationName = data.locationName || '';
      // Ripristina i campi UI
      setVal('hz-lat', HZ.lat || '');
      setVal('hz-lon', HZ.lon || '');
      setVal('hz-altitude', HZ.altitude);
      setVal('hz-location-name', HZ.locationName);
      setVal('hz-vfov', HZ.opts.vfov); setText('hz-vfov-v', HZ.opts.vfov + '°');
      setVal('hz-calt', HZ.opts.centerAltitude); setText('hz-calt-v', (HZ.opts.centerAltitude >= 0 ? '+' : '') + HZ.opts.centerAltitude + '°');
      setVal('hz-saz', HZ.opts.startAzimuth); setText('hz-saz-v', HZ.opts.startAzimuth + '°');
      setVal('hz-hsp', HZ.opts.hspan); setText('hz-hsp-v', HZ.opts.hspan + '°');
      setVal('hz-sm', HZ.opts.smoothRadius); setText('hz-sm-v', String(HZ.opts.smoothRadius));
      // Mostra i risultati senza anteprima (non abbiamo l'immagine)
      show('hz-results');
      document.getElementById('hz-pt-count').textContent = HZ.profile.length + ' punti';
      renderChart(); updateStats();
      // Aggiorna il grafico FOV se disponibile
      if (typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza();
      return true;
    } catch(e) { return false; }
  }

  // ─── Export helpers ───────────────────────────────────────────────────────
  function clampAlt(a) { return Math.max(-10, Math.min(90, a)); }

  function toNINA() {
    let s = '# NINA Horizon File\n';
    s += '# Lat: ' + (HZ.lat || '?') + ' Lon: ' + (HZ.lon || '?') + '\n';
    s += '# Azimuth[deg]\tAltitude[deg]\n';
    const sorted = [...HZ.profile].sort((a, b) => a.az - b.az);
    const first = sorted[0];
    s += '0.0\t' + clampAlt(first.alt).toFixed(1) + '\n';
    sorted.filter(p => p.az > 0 && p.az < 360).forEach(p => {
      s += p.az.toFixed(1) + '\t' + clampAlt(p.alt).toFixed(1) + '\n';
    });
    s += '360.0\t' + clampAlt(first.alt).toFixed(1) + '\n';
    return s;
  }

  function toHorizonTxt() {
    // Formato Stellarium / Cartes du Ciel: azimut INTERO, altitudine con 1 decimale
    // Stellarium richiede azimut interi per il parsing corretto del file esterno
    let s = '# Horizon profile - AstroDashboard PRO\n';
    s += '# Azimuth(integer) Altitude\n';
    s += '# Convention: 0=North, clockwise toward East\n';
    // Campiona ogni grado intero (0-359) interpolando dal profilo
    const byAz = {};
    [...HZ.profile].sort((a, b) => a.az - b.az).forEach(p => { byAz[Math.round(p.az)] = p.alt; });
    for (let az = 0; az < 360; az++) {
      const alt = byAz[az] !== undefined ? byAz[az] : byAz[az - 1] || byAz[az + 1] || 0;
      s += az + ' ' + clampAlt(alt).toFixed(1) + '\n';
    }
    return s;
  }

  function toStellariumIni(horizonFilename, imageFilename) {
    const lat    = HZ.lat ? HZ.lat.toFixed(4) : '0.0000';
    const lon    = HZ.lon ? HZ.lon.toFixed(4) : '0.0000';
    const latStr = (HZ.lat != null ? (HZ.lat >= 0 ? '+' : '') : '+') + lat;
    const lonStr = (HZ.lon != null ? (HZ.lon >= 0 ? '+' : '') : '+') + lon;
    const name   = HZ.locationName || 'La mia postazione';

    // angle_rotatez in Stellarium 25.x:
    // - ruota in senso antiorario (convenzione opposta alla nostra)
    // - offset +90° corregge lo sfasamento N/E osservato empiricamente
    const rotZ = ((360 - HZ.opts.startAzimuth + 90) % 360).toFixed(4);

    // Rileva foto sferica completa (aspect ratio 2:1 ± 5%)
    const isFullSphere = HZ.img &&
      Math.abs((HZ.img.naturalWidth / HZ.img.naturalHeight) - 2.0) < 0.10;

    let ini = '[landscape]\n';
    ini += 'name = ' + name + '\n';
    ini += 'author = AstroDashboard PRO\n';
    ini += 'description = Profilo orizzonte generato da foto panoramica\n';

    if (imageFilename) {
      ini += 'type = spherical\n';
      ini += 'maptex = ' + imageFilename + '\n';
      if (isFullSphere) {
        // Foto sferica 360×180: copertura completa dalla nadir allo zenith
        ini += 'maptex_top = 90\n';
        ini += 'maptex_bottom = -90\n';
      } else {
        // Panoramica parziale: usa i parametri calcolati dagli slider
        ini += 'maptex_top = '    + (HZ.opts.centerAltitude + HZ.opts.vfov / 2).toFixed(1) + '\n';
        ini += 'maptex_bottom = ' + (HZ.opts.centerAltitude - HZ.opts.vfov / 2).toFixed(1) + '\n';
      }
    } else {
      ini += 'type = polygonal\n';
      ini += 'ground_color = .10,.15,.20\n';
    }

    // Rotazione globale — allinea Nord immagine con Nord astronomico
    ini += 'angle_rotatez = ' + rotZ + '\n';
    // Profilo orizzonte (funziona con spherical e polygonal)
    ini += 'polygonal_horizon_list = ' + horizonFilename + '\n';
    ini += 'horizon_line_color = .85,.20,.20\n';
    ini += 'minimal_brightness = 0.10\n';
    ini += '\n[location]\n';
    ini += 'planet = Earth\n';
    ini += 'latitude = ' + latStr + '\n';
    ini += 'longitude = ' + lonStr + '\n';
    ini += 'altitude = ' + (HZ.altitude || 0) + '\n';
    return ini;
  }

  function toKStars() {
    let s = '# KStars Horizon File\n# Generated by AstroDashboard PRO\n# Az Alt\n';
    [...HZ.profile].sort((a, b) => a.az - b.az).forEach(p => {
      s += p.az.toFixed(2) + ' ' + clampAlt(p.alt).toFixed(2) + '\n';
    });
    return s;
  }

  function toCartesDuCiel() {
    let s = 'HorizonFromPanorama\n';
    [...HZ.profile].sort((a, b) => a.az - b.az).forEach(p => {
      s += p.az.toFixed(1) + ' ' + clampAlt(p.alt).toFixed(1) + '\n';
    });
    return s;
  }

  function toCSV() {
    let s = 'azimuth_deg,altitude_deg\n';
    [...HZ.profile].sort((a, b) => a.az - b.az).forEach(p => {
      s += p.az.toFixed(1) + ',' + p.alt.toFixed(1) + '\n';
    });
    return s;
  }

  function dlText(filename, content, type) {
    const b = new Blob([content], { type: type || 'text/plain' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a'); a.href = u; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(u);
  }

  // ─── Export Stellarium ZIP ────────────────────────────────────────────────
  function exportStellariumZip() {
    const folderName = getExportName();
    const horizFile = 'horizon.txt';
    const txtContent = toHorizonTxt();

    // Converti l'immagine in PNG per preservare il canale alfa (cielo rimosso).
    // JPEG non supporta la trasparenza — il cielo diventerebbe nero.
    function getImageBlob(callback) {
      if (!HZ.img) { callback(null, null); return; }
      const oc = document.createElement('canvas');
      const scale = Math.min(4096 / HZ.img.naturalWidth, 1);
      oc.width  = Math.round(HZ.img.naturalWidth  * scale);
      oc.height = Math.round(HZ.img.naturalHeight * scale);
      // NON riempire lo sfondo: lascia trasparente per mantenere il canale alfa
      oc.getContext('2d').drawImage(HZ.img, 0, 0, oc.width, oc.height);
      oc.toBlob(blob => callback(blob, 'panorama.png'), 'image/png');
    }

    function buildZip(imgBlob, imgFilename) {
      const iniContent = toStellariumIni(horizFile, imgBlob ? imgFilename : null);
      const zip    = new window.JSZip();
      const folder = zip.folder(folderName);
      folder.file('landscape.ini', iniContent);
      folder.file(horizFile, txtContent);
      if (imgBlob) folder.file(imgFilename, imgBlob);
      zip.generateAsync({ type: 'blob' }).then(blob => {
        const u = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = u; a.download = folderName + '.zip';
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(u);
      });
    }

    function run() {
      getImageBlob((imgBlob, imgFilename) => buildZip(imgBlob, imgFilename));
    }

    if (!window.JSZip) {
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      sc.onload = run;
      document.head.appendChild(sc);
    } else {
      run();
    }
  }

  // ─── Geolocalizzazione ────────────────────────────────────────────────────
  function geolocate() {
    const btn = document.getElementById('hz-geo-btn');
    if (!navigator.geolocation) { showMsg('Geolocalizzazione non supportata dal browser.'); return; }
    if (btn) { btn.textContent = '…'; btn.disabled = true; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        HZ.lat = pos.coords.latitude;
        HZ.lon = pos.coords.longitude;
        HZ.altitude = Math.round(pos.coords.altitude || 0);
        setVal('hz-lat', HZ.lat.toFixed(5));
        setVal('hz-lon', HZ.lon.toFixed(5));
        setVal('hz-altitude', HZ.altitude);
        if (btn) { btn.textContent = '📍 Rilevato'; btn.disabled = false; }
        reverseGeocode(HZ.lat, HZ.lon);
      },
      err => {
        if (btn) { btn.textContent = '📍 GPS'; btn.disabled = false; }
        showMsg('Impossibile ottenere la posizione: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function reverseGeocode(lat, lon) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon)
      .then(r => r.json())
      .then(d => {
        const addr = d.address || {};
        const name = addr.city || addr.town || addr.village || addr.county || '';
        HZ.locationName = name;
        setVal('hz-location-name', name);
      })
      .catch(() => {});
  }

  function syncCoords() {
    // Sincronizza con globals.js (latCorrente / lonCorrente)
    if (typeof latCorrente !== 'undefined' && latCorrente && !isNaN(latCorrente)) {
      HZ.lat = latCorrente; setVal('hz-lat', latCorrente.toFixed(5));
    }
    if (typeof lonCorrente !== 'undefined' && lonCorrente && !isNaN(lonCorrente)) {
      HZ.lon = lonCorrente; setVal('hz-lon', lonCorrente.toFixed(5));
    }
  }

  function readCoords() {
    const lat = parseFloat(v('hz-lat'));
    const lon = parseFloat(v('hz-lon'));
    const alt = parseInt(v('hz-altitude'), 10);
    const name = v('hz-location-name');
    if (!isNaN(lat)) HZ.lat = lat;
    if (!isNaN(lon)) HZ.lon = lon;
    if (!isNaN(alt)) HZ.altitude = alt;
    if (name) HZ.locationName = name;
  }

  // ─── Helpers DOM ──────────────────────────────────────────────────────────
  function v(id) { const el = document.getElementById(id); return el ? el.value : ''; }
  function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }
  function setText(id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; }
  function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
  function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
  function showMsg(msg) { alert(msg); }

  // ─── Tooltip parametri ───────────────────────────────────────────────────
  const HZ_TIPS = {
    it: {
      hz_param_vfov:  'Quanti gradi copre la foto in verticale. Per foto sferiche 360°×180° (Google Pixel, GoPro Max) usa 180°, impostato automaticamente. Per panoramiche con smartphone orizzontale usa 60–90°.',
      hz_param_calt:  'Altitudine corrispondente alla riga centrale dell\'immagine. Se la camera era orizzontale vale 0°. Abbassa finché la linea tratteggiata coincide con l\'orizzonte reale lontano.',
      hz_param_saz:   'Azimut del bordo sinistro della foto. 0°=Nord, 90°=Est. Regola finché le linee cardinali coincidono con i riferimenti reali verificati con la bussola.',
      hz_param_hsp:   'Quanti gradi copre la foto in orizzontale. Sfera completa = 360°. Per una panoramica parziale di 180° inserisci 180°.',
      hz_param_thr:   'Luminanza soglia (0–255) per gli algoritmi Soglia e Prima zona scura. Abbassa se il cielo è scuro (rimosso); alza se il terreno è chiaro. Non influisce su Sobel.',
      hz_param_sm:    'Smussamento della linea rilevata. Bassi (1–5) = dettaglio ma rumoroso. Alti (20–50) = curva morbida. Consigliato 10–20 per uso astronomico.',
      hz_param_stop:  'La ricerca parte da questa percentuale dall\'alto. Aumenta per escludere sole o cielo vicino allo zenith.',
      hz_param_sbot:  'La ricerca si ferma a questa percentuale dall\'alto. Abbassa se l\'orizzonte è basso; aumenta se è alto (muri, edifici in primo piano).',
    },
    en: {
      hz_param_vfov:  'How many degrees the photo covers vertically. For 360°×180° spherical photos (Google Pixel, GoPro Max) use 180°, set automatically. For horizontal smartphone panoramas use 60–90°.',
      hz_param_calt:  'Altitude corresponding to the central row of the image. If the camera was horizontal this is 0°. Lower it until the dashed line aligns with the real far horizon.',
      hz_param_saz:   'Azimuth of the left edge of the photo. 0°=North, 90°=East. Adjust until the cardinal lines match real references verified with a compass.',
      hz_param_hsp:   'How many degrees the photo covers horizontally. Full sphere = 360°. For a 180° partial panorama enter 180°.',
      hz_param_thr:   'Luminance threshold (0–255) for the Threshold and First Dark Band algorithms. Lower if the sky is dark (removed); raise if the ground is bright. Does not affect Sobel.',
      hz_param_sm:    'Smoothing of the detected line. Low (1–5) = detailed but noisy. High (20–50) = smooth curve. 10–20 recommended for astronomical use.',
      hz_param_stop:  'Detection starts from this percentage from the top. Increase to exclude the sun or sky near the zenith.',
      hz_param_sbot:  'Detection stops at this percentage from the top. Decrease if the horizon is low; increase if it is high (walls, buildings in the foreground).',
    },
    es: {
      hz_param_vfov:  'Cuántos grados cubre la foto verticalmente. Para fotos esféricas 360°×180° (Google Pixel, GoPro Max) usa 180°, configurado automáticamente. Para panorámicas con smartphone horizontal usa 60–90°.',
      hz_param_calt:  'Altitud correspondiente a la fila central de la imagen. Si la cámara estaba horizontal vale 0°. Bájalo hasta que la línea punteada coincida con el horizonte real lejano.',
      hz_param_saz:   'Azimut del borde izquierdo de la foto. 0°=Norte, 90°=Este. Ajústalo hasta que las líneas cardinales coincidan con referencias reales verificadas con brújula.',
      hz_param_hsp:   'Cuántos grados cubre la foto horizontalmente. Esfera completa = 360°. Para una panorámica parcial de 180° introduce 180°.',
      hz_param_thr:   'Umbral de luminancia (0–255) para los algoritmos Umbral y Primera Zona Oscura. Baja si el cielo está oscuro (eliminado); sube si el suelo es claro. No afecta a Sobel.',
      hz_param_sm:    'Suavizado de la línea detectada. Bajo (1–5) = detalle pero ruidoso. Alto (20–50) = curva suave. Se recomienda 10–20 para uso astronómico.',
      hz_param_stop:  'La detección comienza desde este porcentaje desde arriba. Aumenta para excluir el sol o el cielo cerca del cénit.',
      hz_param_sbot:  'La detección se detiene en este porcentaje desde arriba. Baja si el horizonte es bajo; sube si es alto (muros, edificios en primer plano).',
    },
    zh: {
      hz_param_vfov:  '照片垂直方向覆盖的角度。对于360°×180°球形照片（Google Pixel、GoPro Max）请使用180°（自动设置）。对于水平方向拍摄的手机全景照片，使用60–90°。',
      hz_param_calt:  '对应图像中心行的高度角。若相机水平拍摄则为0°。向下调整，直到虚线与远处真实地平线对齐。',
      hz_param_saz:   '照片左边缘的方位角。0°=北，90°=东。调整直到预览中的方位线与用指南针确认的实际参考物对齐。',
      hz_param_hsp:   '照片水平方向覆盖的角度。完整球体=360°。对于180°局部全景照片请输入180°。',
      hz_param_thr:   '阈值和首个暗带算法使用的亮度阈值（0–255）。若天空较暗（已移除）则降低；若地面较亮则升高。不影响Sobel算法。',
      hz_param_sm:    '检测线的平滑程度。低（1–5）=细节丰富但有噪点。高（20–50）=平滑曲线。天文用途推荐10–20。',
      hz_param_stop:  '检测从顶部此百分比处开始。增大可排除天顶附近的太阳或天空。',
      hz_param_sbot:  '检测在顶部此百分比处停止。若地平线较低则减小；若较高（墙壁、前景建筑）则增大。',
    },
  };

  function _getTip(key) {
    const currentLang = localStorage.getItem('ad_lang') || 'it';
    const langMap = HZ_TIPS[currentLang] || HZ_TIPS.it;
    return langMap[key] || HZ_TIPS.it[key] || '';
  }

  let _tipEl = null;

  function _ensureTip() {
    if (_tipEl) return _tipEl;
    _tipEl = document.createElement('div');
    _tipEl.id = 'hz-tooltip';
    Object.assign(_tipEl.style, {
      position: 'fixed', zIndex: '9999', maxWidth: '280px',
      background: '#1a2030', border: '0.5px solid rgba(55,138,221,0.35)',
      borderRadius: '7px', padding: '9px 12px',
      fontSize: '11px', lineHeight: '1.55', color: '#9ab',
      pointerEvents: 'none', display: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
    });
    document.body.appendChild(_tipEl);
    return _tipEl;
  }

  window.hzTipShow = function(e, key) {
    const tip = _ensureTip();
    const text = _getTip(key);
    if (!text) return;
    tip.textContent = text;
    tip.style.display = 'block';
    const r = e.target.getBoundingClientRect();
    let left = r.left;
    let top = r.bottom + 6;
    // Keep inside viewport
    if (left + 290 > window.innerWidth) left = window.innerWidth - 294;
    if (top + 120 > window.innerHeight) top = r.top - 120 - 6;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
  };

  window.hzTipHide = function() {
    const tip = document.getElementById('hz-tooltip');
    if (tip) tip.style.display = 'none';
  };
  function setRunBtnActive(active) {
    const btn = document.getElementById('hz-run-btn');
    if (!btn) return;
    if (active) {
      btn.disabled = false;
      btn.style.background    = 'rgba(55,138,221,0.10)';
      btn.style.border        = '1px solid rgba(55,138,221,0.55)';
      btn.style.color         = '#378ADD';
      btn.style.cursor        = 'pointer';
      btn.style.opacity       = '1';
      btn.style.fontWeight    = '600';
      btn.onmouseover = () => { btn.style.background = 'rgba(55,138,221,0.22)'; };
      btn.onmouseout  = () => { btn.style.background = 'rgba(55,138,221,0.10)'; };
    } else {
      btn.disabled = true;
      btn.style.background    = '#161b22';
      btn.style.border        = '1px solid #21293a';
      btn.style.color         = '#3d4852';
      btn.style.cursor        = 'not-allowed';
      btn.style.opacity       = '0.5';
      btn.style.fontWeight    = '500';
      btn.onmouseover = null;
      btn.onmouseout  = null;
    }
  }
  function loadImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = ev => {
      HZ.img = new Image();
      HZ.img.onload = () => {
        // Rileva automaticamente foto sferica 2:1
        const ratio = HZ.img.naturalWidth / HZ.img.naturalHeight;
        const isFullSphere = Math.abs(ratio - 2.0) < 0.10;
        if (isFullSphere) {
          setVal('hz-vfov', 180);
          setVal('hz-calt', 0);
          setText('hz-vfov-v', '180°');
          setText('hz-calt-v', '0°');
          HZ.opts.vfov = 180;
          HZ.opts.centerAltitude = 0;
        }
        // Nome file con badge sfera
        const sphereBadge = isFullSphere ? ' · 📐 360°' : '';
        setText('hz-img-name', file.name + sphereBadge);
        // Suggerisci nome export
        const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
        setVal('hz-export-name', baseName);
        // Aggiorna il dropzone con il nome caricato ma non ancora mostra il canvas
        const dz = document.getElementById('hz-dropzone');
        if (dz) {
          dz.style.paddingTop = '14px';
          dz.style.paddingBottom = '14px';
          const sub = dz.querySelector('p:last-child');
          if (sub) sub.textContent = '📁 ' + file.name + sphereBadge + ' — clicca per cambiare';
        }
        setRunBtnActive(true);
        show('hz-controls');
        hide('hz-results');
      };
      HZ.img.src = ev.target.result;
    };
    r.readAsDataURL(file);
  }

  // ─── Inizializzazione sezione ─────────────────────────────────────────────
  function initSection() {
    syncCoords();
    attachClickHandler();

    // Slider labels + live re-render per parametri che cambiano solo la visualizzazione
    // (vfov, calt, saz, hsp, sm) → non serve rifare il rilevamento, basta rileggere opts
    // e ricostruire profilo+preview dal rowMap già calcolato
    const sliders = [
      ['hz-vfov',  v => v + '°',                        true],
      ['hz-calt',  v => (v >= 0 ? '+' : '') + v + '°',  true],
      ['hz-saz',   v => v + '°',                        true],
      ['hz-hsp',   v => v + '°',                        true],
      ['hz-thr',   v => String(v),                      false],
      ['hz-sm',    v => String(v),                      true],
      ['hz-stop',  v => v + '%',                        false],
      ['hz-sbot',  v => v + '%',                        false],
    ];
    sliders.forEach(([id, fmt, liveUpdate]) => {
      const el = document.getElementById(id);
      const lbl = document.getElementById(id + '-v');
      if (el && lbl) {
        lbl.textContent = fmt(el.value);
        el.oninput = () => {
          lbl.textContent = fmt(el.value);
          if (liveUpdate && HZ.rowMap) {
            HZ.opts = readOpts();
            HZ.profile = buildProfile(HZ.rowMap, HZ.srcW, HZ.srcH, HZ.opts);
            renderPreview();
            renderChart();
            updateStats();
          }
        };
      }
    });

    // Upload
    const fi = document.getElementById('hz-file-input');
    const dz = document.getElementById('hz-dropzone');
    if (fi) fi.onchange = e => loadImageFile(e.target.files[0]);
    if (dz) {
      dz.onclick = () => fi && fi.click();
      dz.ondragover = e => { e.preventDefault(); dz.classList.add('hz-over'); };
      dz.ondragleave = () => dz.classList.remove('hz-over');
      dz.ondrop = e => {
        e.preventDefault(); dz.classList.remove('hz-over');
        loadImageFile(e.dataTransfer.files[0]);
      };
    }

    // Coordinate inputs → aggiorna HZ
    ['hz-lat', 'hz-lon', 'hz-altitude', 'hz-location-name'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.oninput = readCoords;
    });

    window.addEventListener('resize', () => {
      if (HZ.profile.length) { renderPreview(); renderChart(); }
    });
  }

  // ─── API pubblica ─────────────────────────────────────────────────────────
  window.hzRun = function () {
    readCoords();
    runDetection();
    saveToLocalStorage();
    if (typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza();
  };

  window.hzReset = function () {
    HZ.img = null; HZ.rowMap = null; HZ.profile = []; HZ.srcW = 0; HZ.srcH = 0;
    hide('hz-controls'); hide('hz-results');
    const fi = document.getElementById('hz-file-input');
    const dz = document.getElementById('hz-dropzone');
    const wrap = document.getElementById('hz-preview-wrap');
    if (fi) fi.value = '';
    if (dz) { dz.style.display = ''; dz.style.paddingTop = '28px'; dz.style.paddingBottom = '28px'; }
    if (wrap) wrap.style.display = 'none';
    setText('hz-img-name', '');
    setRunBtnActive(false);
    localStorage.removeItem(LS_KEY);
    if (typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza();
  };

  // Applica al grafico FOV e torna alla sezione pianificazione
  window.hzApplyToFov = function () {
    if (!HZ.profile.length) { alert('Nessun profilo rilevato. Esegui prima il rilevamento orizzonte.'); return; }
    saveToLocalStorage();
    if (typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza();
    if (typeof _showView === 'function') _showView('planning-view');
  };

  // Backup completo scaricabile
  window.hzExportBackup = function () {
    const data = {
      version: 1, type: 'adp_horizon_backup',
      savedAt: new Date().toISOString(),
      opts: HZ.opts,
      lat: HZ.lat, lon: HZ.lon, altitude: HZ.altitude,
      locationName: HZ.locationName,
      profile: HZ.profile,
    };
    dlText(getExportName() + '_backup.json', JSON.stringify(data, null, 2), 'application/json');
  };

  // Ripristino da file di backup
  window.hzRestoreFromFile = function (file) {
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.type !== 'adp_horizon_backup' || !data.profile) {
          alert('File non valido. Usa un file backup_horizon.json generato da AstroDashboard PRO.'); return;
        }
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        if (loadFromLocalStorage()) {
          // Applica automaticamente al grafico FOV
          if (typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza();
          alert('✓ Orizzonte ripristinato: ' + (data.locationName || 'senza nome') + ' · ' + data.profile.length + ' punti — applicato al FOV');
        }
      } catch(e) { alert('Errore nel leggere il file di backup.'); }
    };
    r.readAsText(file);
  };

  window.hzGeo = geolocate;
  window.hzExportNINA = () => dlText(getExportName() + '.hrz', toNINA());
  window.hzExportStellarium = exportStellariumZip;
  window.hzExportCSV = () => dlText(getExportName() + '.csv', toCSV(), 'text/csv');
  window.hzExportJSON = () => {
    const out = {
      version: 1, generator: 'AstroDashboard PRO',
      timestamp: new Date().toISOString(),
      location: { name: HZ.locationName, lat: HZ.lat, lon: HZ.lon, altitude: HZ.altitude },
      convention: { azimuth: '0=N, CW', altitude: 'deg above horizon' },
      points: [...HZ.profile].sort((a, b) => a.az - b.az),
    };
    dlText(getExportName() + '.json', JSON.stringify(out, null, 2), 'application/json');
  };
  window.hzInitSection = initSection;

  window.hzOpenGuide = function () {
    const overlay = document.getElementById('hz-guide-overlay');
    const iframe  = document.getElementById('hz-guide-iframe');
    if (!overlay || !iframe) return;
    // Carica solo al primo click
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = 'hz-guide.html';
    }
    overlay.style.display = 'flex';
    // Click fuori chiude
    overlay.onclick = e => { if (e.target === overlay) window.hzCloseGuide(); };
    // ESC chiude
    document._hzGuideEsc = e => { if (e.key === 'Escape') window.hzCloseGuide(); };
    document.addEventListener('keydown', document._hzGuideEsc);
  };

  window.hzCloseGuide = function () {
    const overlay = document.getElementById('hz-guide-overlay');
    if (overlay) overlay.style.display = 'none';
    if (document._hzGuideEsc) {
      document.removeEventListener('keydown', document._hzGuideEsc);
      delete document._hzGuideEsc;
    }
  };

  // Espone il profilo per fov.js
  Object.defineProperty(window, 'hzProfile', {
    get: () => HZ.profile,
    enumerable: true,
  });

  // Ripristino automatico da localStorage all'avvio
  document.addEventListener('DOMContentLoaded', () => {
    if (loadFromLocalStorage()) {
      if (DEBUG) console.log('AstroDashboard: orizzonte ripristinato da localStorage');
    }
  });

})();
