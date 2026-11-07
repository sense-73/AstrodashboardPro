// weather.js — Mappa Leaflet, meteo Open-Meteo, effemeridi, layer
// ============================================================


        
        let mappaScura = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_2zah_1_38c5738066e0151c5fdfbc6b', { maxZoom: 19, attribution: 'Meteo Data &copy; <a href="https://open-meteo.com/" target="_blank" style="color:#bb86fc;">Open-Meteo</a> | Map &copy; <a href="https://carto.com/" target="_blank">CartoDB</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors' });
        let _savedName = localStorage.getItem('ad_location_name') || 'Udine';
        window._leafletMap = null;
        let map = L.map('map', { center: [latCorrente, lonCorrente], zoom: 8, layers: [mappaScura], zoomControl: false });
        window._leafletMap = map;
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // ── Overlay temperatura sulla mappa ───────────────────────────────────
        (function() {
            let _ov = document.createElement('div');
            _ov.id = 'meteo-temp-overlay';
            _ov.style.cssText = 'display:none;position:absolute;top:12px;right:12px;z-index:1000;background:rgba(10,14,20,0.82);border:1.5px solid #22304a;border-radius:10px;padding:6px 14px;text-align:center;pointer-events:none;font-family:\'Audiowide\',sans-serif;backdrop-filter:blur(4px);';
            _ov.innerHTML = '<div id="val-temp-meteo" style="font-size:30px;font-weight:700;color:#44dd88;line-height:1.1;">--°C</div>';
            let _mapEl = document.getElementById('map');
            if (_mapEl) { _mapEl.style.position = 'relative'; _mapEl.appendChild(_ov); }
        })();
        let layers = { basse: L.layerGroup().addTo(map), medie: L.layerGroup(), alte: L.layerGroup(), jet: L.layerGroup(), luna: L.layerGroup(), umidita: L.layerGroup(), vento: L.layerGroup() };
        // Layer LP: tile Lorenz 2024 con formato custom tile_{z}_{x}_{y}.png
        let LorenzLP = L.TileLayer.extend({
            getTileUrl: function(coords) {
                return `https://djlorenz.github.io/astronomy/image_tiles/tiles2024/tile_${coords.z}_${coords.x}_${coords.y}.png`;
            }
        });
        let lpLayer = new LorenzLP('', {
            opacity: 0.7,
            maxNativeZoom: 6,
            maxZoom: 12,
            tileSize: 256,
            attribution: '© <a href="https://djlorenz.github.io/astronomy/lp/" target="_blank">Light Pollution Atlas 2024</a> (D.Lorenz/VIIRS)'
        });
        let lpActive = false;
        let _lpSavedLayers = []; // memoria layer meteo attivi prima di LP

        const _METEO_LAYER_NAMES = ['basse','medie','alte','jet','luna','umidita','vento'];

        function _saveLayerState() {
            let active = _METEO_LAYER_NAMES.filter(n => map.hasLayer(layers[n]));
            let c = map.getCenter();
            try {
                localStorage.setItem('ad_meteo_layers', JSON.stringify(active));
                localStorage.setItem('ad_meteo_lp', lpActive ? '1' : '0');
                localStorage.setItem('ad_meteo_zoom', map.getZoom());
                localStorage.setItem('ad_meteo_center', JSON.stringify([c.lat, c.lng]));
            } catch(e) {}
        }

        function _restoreLayerState() {
            let savedZoom   = localStorage.getItem('ad_meteo_zoom');
            let savedCenter = localStorage.getItem('ad_meteo_center');
            let savedLayers = localStorage.getItem('ad_meteo_layers');
            let savedLp     = localStorage.getItem('ad_meteo_lp');

            if (savedCenter && savedZoom) {
                try {
                    let c = JSON.parse(savedCenter);
                    map.setView(c, parseInt(savedZoom));
                } catch(e) {}
            } else if (savedZoom) {
                map.setZoom(parseInt(savedZoom));
            }

            if (savedLayers !== null) {
                let active = [];
                try { active = JSON.parse(savedLayers); } catch(e) {}
                _METEO_LAYER_NAMES.forEach(n => {
                    let b = document.getElementById('btn-' + n);
                    if (active.includes(n)) {
                        if (!map.hasLayer(layers[n])) map.addLayer(layers[n]);
                        if (b) { b.classList.remove('disabled'); b.classList.add('active'); }
                    } else {
                        if (map.hasLayer(layers[n])) map.removeLayer(layers[n]);
                        if (b) { b.classList.remove('active'); b.classList.add('disabled'); }
                    }
                });
            }

            if (savedLp === '1' && !lpActive) toggleLayerLP();
        }

        function toggleLayerLP() {
            let btn = document.getElementById('btn-lp');
            if (lpActive) {
                // Disattiva LP e ripristina i layer meteo che erano attivi
                map.removeLayer(lpLayer);
                lpActive = false;
                btn.classList.replace('active','disabled');
                let leg = document.getElementById('lp-legend');
                if (leg) leg.style.display = 'none';
                _lpSavedLayers.forEach(n => {
                    if (!map.hasLayer(layers[n])) {
                        map.addLayer(layers[n]);
                        let b = document.getElementById('btn-'+n);
                        if (b) b.classList.replace('disabled','active');
                    }
                });
                _lpSavedLayers = [];
            } else {
                // Salva e spegni tutti i layer meteo attivi
                _lpSavedLayers = _METEO_LAYER_NAMES.filter(n => map.hasLayer(layers[n]));
                _lpSavedLayers.forEach(n => {
                    map.removeLayer(layers[n]);
                    let b = document.getElementById('btn-'+n);
                    if (b) b.classList.replace('active','disabled');
                });
                map.addLayer(lpLayer);
                lpActive = true;
                btn.classList.replace('disabled','active');
                let leg = document.getElementById('lp-legend');
                if (leg) leg.style.display = 'block';
            }
            _saveLayerState();
        }
        function toggleLayer(n) {
            let b = document.getElementById('btn-'+n), l = layers[n];
            // Se LP è attivo, spegnilo (senza ripristinare) e attiva il layer richiesto
            if (lpActive) {
                map.removeLayer(lpLayer);
                lpActive = false;
                let btnLP = document.getElementById('btn-lp');
                if (btnLP) btnLP.classList.replace('active','disabled');
                _lpSavedLayers = [];
            }
            if (map.hasLayer(l)) {
                map.removeLayer(l); b.classList.replace('active','disabled');
            } else {
                map.addLayer(l); b.classList.replace('disabled','active');
            }
            _saveLayerState();
        }
        let marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup(`<b>${_savedName}</b>`, { autoPan: false });

        // Salva zoom quando l'utente zooma/sposta la mappa
        map.on('zoomend moveend', _saveLayerState);

        // Al zoom le coordinate pixel cambiano → ricalcola cerchi e maschere
        map.on('zoomend', function() {
            if (typeof datiMeteo !== 'undefined' && datiMeteo) {
                cambiaOraMeteo();
                if (typeof cambiaOraAstro === 'function') cambiaOraAstro();
            }
        });

        // Ripristina layer e zoom salvati al reload
        _restoreLayerState();


        function getJulianDate(date) { return (date.getTime() / 86400000) + 2440587.5; }
        function calcolaAltAz(ra, dec, lat, lon, date) {
            let jd = getJulianDate(date), d = jd - 2451545.0, lst = (280.46061837 + 360.98564736629 * d + lon) % 360; if (lst < 0) lst += 360;
            let ra_deg = ra * 15, ha_deg = lst - ra_deg, rad = Math.PI / 180;
            let sin_alt = Math.sin(lat*rad)*Math.sin(dec*rad) + Math.cos(lat*rad)*Math.cos(dec*rad)*Math.cos(ha_deg*rad);
            let alt_deg = Math.asin(sin_alt) / rad;
            let cos_az = (Math.sin(dec*rad) - Math.sin(lat*rad)*sin_alt) / (Math.cos(lat*rad) * Math.cos(Math.asin(sin_alt)));
            cos_az = Math.max(-1, Math.min(1, cos_az)); 
            let az_deg = Math.acos(cos_az) / rad; if (Math.sin(ha_deg*rad) > 0) az_deg = 360 - az_deg;
            return { alt: alt_deg, az: az_deg };
        }
        function getPuntoCardinale(az) { return ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"][Math.round(az / 45) % 8]; }

        function cercaIndirizzo() {
            let query = document.getElementById('ricerca').value, dropdown = document.getElementById('dropdown-risultati');
            if (query.length < 3) { dropdown.style.display = 'none'; return; }
            clearTimeout(timerRicerca);
            timerRicerca = setTimeout(() => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=${localStorage.getItem('ad_lang') || 'it'}`)
                    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
                    .then(data => {
                        dropdown.innerHTML = ''; 
                        if (data.length > 0) {
                            dropdown.style.display = 'block'; data.forEach(l => { let li = document.createElement('li'); li.textContent = l.display_name; li.onclick = () => selezionaLuogo(l.lat, l.lon, l.display_name); dropdown.appendChild(li); });
                        } else dropdown.style.display = 'none';
                    }).catch(() => {
                        dropdown.style.display = 'none';
                        mostraAvviso('⚠️ ' + (typeof t === 'function' ? t('nominatim_err') || 'Ricerca luogo non disponibile.' : 'Ricerca luogo non disponibile.'), 'warn');
                    });
            }, 500); 
        }

        function selezionaLuogo(lat, lon, nome) {
            latCorrente = parseFloat(lat); lonCorrente = parseFloat(lon);
            localStorage.setItem('ad_lat', latCorrente);
            localStorage.setItem('ad_lon', lonCorrente);
            localStorage.setItem('ad_location_name', nome.split(',')[0]);
            document.getElementById('ricerca').value = nome.split(',')[0];
            document.getElementById('lat').value = latCorrente.toFixed(5); document.getElementById('lon').value = lonCorrente.toFixed(5);
            document.getElementById('dropdown-risultati').style.display = 'none';
            if (marker) map.removeLayer(marker);
            marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup(`<b>${nome.split(',')[0]}</b>`, { autoPan: false });
            // Apri popup dopo flyTo completo + margine extra per stabilità
            map.once('moveend', function() { setTimeout(function() { if (marker) marker.openPopup(); }, 300); });
            map.flyTo([latCorrente, lonCorrente], 9);
            aggiornaEffemeridi(getSessionDate()); scaricaDatiPrevisionali();
            _rilevaBortleDaCoordinate(latCorrente, lonCorrente);
            _nascondiToastGPS();
        }

        function _parseCoord(str) {
            if (!str) return NaN;
            str = str.trim().replace(',', '.');
            // Formato decimale con cardinale: 44.494N / 11.343E / 44.494S / 11.343W
            let mCard = str.match(/^([+-]?\d+\.?\d*)\s*([NSEWnsew])$/);
            if (mCard) {
                let v = parseFloat(mCard[1]);
                let d = mCard[2].toUpperCase();
                return (d === 'S' || d === 'W') ? -v : v;
            }
            // Formato DMS: 44°29'38"N  oppure  44° 29' 38" N  oppure  44 29 38 N
            let mDms = str.match(/^(\d+)[°\s]+(\d+)['\s]+(\d+\.?\d*)["\s]*([NSEWnsew]?)$/);
            if (mDms) {
                let v = parseInt(mDms[1]) + parseInt(mDms[2]) / 60 + parseFloat(mDms[3]) / 3600;
                let d = mDms[4].toUpperCase();
                return (d === 'S' || d === 'W') ? -v : v;
            }
            // Formato DM: 44°29.638'N  oppure  44 29.638 N
            let mDm = str.match(/^(\d+)[°\s]+(\d+\.?\d*)['\s]*([NSEWnsew]?)$/);
            if (mDm) {
                let v = parseInt(mDm[1]) + parseFloat(mDm[2]) / 60;
                let d = mDm[3].toUpperCase();
                return (d === 'S' || d === 'W') ? -v : v;
            }
            // Formato decimale puro: 44.494 / -11.343
            let v = parseFloat(str);
            return isNaN(v) ? NaN : v;
        }

        function applicaCoordinateManuali() {
            let latVal = _parseCoord(document.getElementById('lat').value);
            let lonVal = _parseCoord(document.getElementById('lon').value);
            if (isNaN(latVal) || isNaN(lonVal) || latVal < -90 || latVal > 90 || lonVal < -180 || lonVal > 180) {
                mostraAvviso(lang === 'it'
                    ? 'Coordinate non valide. Formati accettati: 44.494 · 44,494 · 44°29\'38"N · 44°29.6\'N · 44.494N'
                    : 'Invalid coordinates. Accepted: 44.494 · 44,494 · 44°29\'38"N · 44°29.6\'N · 44.494N', 'warn');
                return;
            }
            // Aggiorna i campi con il valore decimale normalizzato
            document.getElementById('lat').value = latVal.toFixed(5);
            document.getElementById('lon').value = lonVal.toFixed(5);
            let row = document.getElementById('apply-coords-row');
            if (row) row.style.display = 'none';
            let nome = `${latVal.toFixed(5)} / ${lonVal.toFixed(5)}`;
            selezionaLuogo(latVal, lonVal, nome);
        }


        // ── Widget Seeing con colori e stella ──────────────────────────────

        const _SEEING_COLORS = { 1:'#8e44ad', 2:'#e74c3c', 3:'#e67e22', 4:'#f1c40f', 5:'#2ecc71' };

        function _seeingSvg(v, col) {
            let c = col;
            // Scala Antoniadi corretta: 1=Pessimo(blob massimo), 5=Ottimo(stella nitida)
            if (v === 5) return `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="12" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.22"/>
                <circle cx="18" cy="18" r="8" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.35"/>
                <circle cx="18" cy="18" r="4.5" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.5"/>
                <circle cx="18" cy="18" r="2.5" fill="${c}" opacity="0.65"/>
                <circle cx="18" cy="18" r="1.2" fill="#ffffff" opacity="1"/>`;
            if (v === 4) return `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="11" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.18" stroke-dasharray="4 2"/>
                <circle cx="18" cy="18" r="7" fill="none" stroke="${c}" stroke-width="0.7" opacity="0.28" stroke-dasharray="5 2"/>
                <circle cx="18" cy="18" r="4" fill="${c}" opacity="0.2"/>
                <circle cx="18.2" cy="17.8" r="2.8" fill="${c}" opacity="0.55"/>
                <circle cx="18" cy="18" r="1.3" fill="#ffffff" opacity="0.9"/>`;
            if (v === 3) return `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="12" fill="${c}" opacity="0.05"/>
                <circle cx="18" cy="18" r="9" fill="${c}" opacity="0.1"/>
                <circle cx="18" cy="18" r="6" fill="${c}" opacity="0.2"/>
                <circle cx="17.8" cy="18.2" r="3.8" fill="${c}" opacity="0.42"/>
                <circle cx="18.2" cy="17.8" r="2" fill="#ffddaa" opacity="0.6"/>`;
            if (v === 2) return `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="14" fill="${c}" opacity="0.04"/>
                <circle cx="18" cy="18" r="11" fill="${c}" opacity="0.08"/>
                <circle cx="18" cy="18" r="8" fill="${c}" opacity="0.14"/>
                <ellipse cx="17.5" cy="18.5" rx="5.5" ry="4.5" fill="${c}" opacity="0.3" transform="rotate(-15 18 18)"/>
                <ellipse cx="18.5" cy="17.5" rx="3" ry="3.5" fill="${c}" opacity="0.35" transform="rotate(20 18 18)"/>`;
            // v === 1: blob massimo (Pessimo)
            return `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="16" fill="${c}" opacity="0.03"/>
                <circle cx="18" cy="18" r="13" fill="${c}" opacity="0.06"/>
                <circle cx="18" cy="18" r="10" fill="${c}" opacity="0.1"/>
                <circle cx="18" cy="18" r="7" fill="${c}" opacity="0.15"/>
                <ellipse cx="16" cy="19" rx="5.5" ry="4.5" fill="${c}" opacity="0.22" transform="rotate(-20 18 18)"/>
                <ellipse cx="20" cy="17" rx="4.5" ry="3.8" fill="${c}" opacity="0.2" transform="rotate(30 18 18)"/>
                <ellipse cx="18" cy="20" rx="3.5" ry="3" fill="${c}" opacity="0.22"/>`;
        }

        function aggiornaWidgetSeeing(val) {
            let seeEl   = document.getElementById('val-seeing');
            let lblEl   = document.getElementById('val-seeing-label');
            let svgEl   = document.getElementById('seeing-star-svg');
            let btnEl   = document.getElementById('btn-seeing');
            if (!seeEl) return;
            if (val === '--') {
                seeEl.innerText = '--/5';
                seeEl.style.color = '#c49a3c';
                if (lblEl) { lblEl.innerText = '--'; lblEl.style.color = '#6e7a8a'; }
                if (svgEl) svgEl.innerHTML = `<rect width="36" height="36" fill="#060a0f" rx="5"/>
                    <circle cx="18" cy="18" r="6" fill="none" stroke="#c49a3c" stroke-width="0.6" opacity="0.3"/>
                    <circle cx="18" cy="18" r="3" fill="#c49a3c" opacity="0.4"/>
                    <circle cx="18" cy="18" r="1.5" fill="#fff" opacity="0.7"/>`;
                if (btnEl) btnEl.style.borderColor = '';
                return;
            }
            let v   = Math.max(1, Math.min(5, parseInt(val)));
            let col = _SEEING_COLORS[v] || '#c49a3c';
            seeEl.innerText   = v + '/5';
            seeEl.style.color = col;
            if (lblEl) { lblEl.innerText = t('seeing_' + v + '_label'); lblEl.style.color = col; lblEl.style.opacity = '0.75'; }
            if (svgEl) svgEl.innerHTML = _seeingSvg(v, col);
            if (btnEl) btnEl.style.borderColor = col;
        }

        // ── Widget Seeing diurno — mostra il sole al posto della stella ──────
        function _aggiornaWidgetSeeingGiorno() {
            const seeEl = document.getElementById('val-seeing');
            const lblEl = document.getElementById('val-seeing-label');
            const svgEl = document.getElementById('seeing-star-svg');
            const btnEl = document.getElementById('btn-seeing');
            if (!seeEl) return;
            seeEl.innerText   = t('daytime');
            seeEl.style.color = '#ffaa00';
            if (lblEl) { lblEl.innerText = ''; }
            if (btnEl) btnEl.style.borderColor = '#ffaa00';
            if (svgEl) svgEl.innerHTML = `
                <rect width="36" height="36" fill="#060a0f" rx="5"/>
                <circle cx="18" cy="18" r="7" fill="#ffaa00" opacity="0.18"/>
                <circle cx="18" cy="18" r="4.5" fill="#ffaa00" opacity="0.55"/>
                <circle cx="18" cy="18" r="2.5" fill="#ffe066" opacity="1"/>
                <line x1="18" y1="3"  x2="18" y2="7"  stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="18" y1="29" x2="18" y2="33" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="3"  y1="18" x2="7"  y2="18" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="29" y1="18" x2="33" y2="18" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="7.5"  y1="7.5"  x2="10.3" y2="10.3" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="25.7" y1="25.7" x2="28.5" y2="28.5" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="28.5" y1="7.5"  x2="25.7" y2="10.3" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <line x1="10.3" y1="25.7" x2="7.5"  y2="28.5" stroke="#ffaa00" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>`;
        }


        // Scala Antoniadi: 1=pessimo, 5=ottimo
        function _calcolaSeeing(jet, raffica, li, cape) {
            let scS = 3;
            if      (li >= 5)    scS += 2;
            else if (li >= 1)    scS += 1;
            else if (li < -3)    scS -= 2;
            else if (li <  0)    scS -= 1;
            if      (cape > 500) scS -= 2;
            else if (cape > 200) scS -= 1;
            if      (jet > 150)  scS -= 2;
            else if (jet > 100)  scS -= 1;
            else if (jet <  40)  scS += 1;
            if (raffica > 40)    scS -= 1;
            return Math.max(1, Math.min(5, scS));
        }

        function apriScalaSeeing() {
            let modal = document.getElementById('seeing-scale-modal');
            if (!modal) return;
            let list  = document.getElementById('seeing-scale-list');
            // Ricostruisce sempre la lista per riflettere la lingua corrente.
            if (list) _renderScalaSeeing(list);
            modal.style.display = 'flex';
        }

        function chiudiScalaSeeing() {
            let modal = document.getElementById('seeing-scale-modal');
            if (modal) modal.style.display = 'none';
        }

        function _renderScalaSeeing(list) {
            let labels = [
                [1, _SEEING_COLORS[1], t('seeing_1_label'), t('seeing_1_desc')],
                [2, _SEEING_COLORS[2], t('seeing_2_label'), t('seeing_2_desc')],
                [3, _SEEING_COLORS[3], t('seeing_3_label'), t('seeing_3_desc')],
                [4, _SEEING_COLORS[4], t('seeing_4_label'), t('seeing_4_desc')],
                [5, _SEEING_COLORS[5], t('seeing_5_label'), t('seeing_5_desc')],
            ];
            list.innerHTML = '';
            labels.forEach(([v, col, lbl, desc]) => {
                let row = document.createElement('div');
                row.style.cssText = `display:flex; align-items:center; gap:10px; background:#0a0e14; border-radius:8px; padding:8px 10px; border-left:3px solid ${col};`;
                row.innerHTML = `
                    <svg width="52" height="52" viewBox="0 0 36 36" style="flex-shrink:0; border-radius:6px;">${_seeingSvg(v, col)}</svg>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; justify-content:space-between; align-items:baseline;">
                            <span style="font-size:12px; font-weight:500; color:${col};">${lbl}</span>
                            <span style="font-size:11px; color:${col}; font-weight:700;">${v}/5</span>
                        </div>
                        <div style="font-size:10px; color:#556; margin-top:2px; line-height:1.4;">${desc}</div>
                    </div>`;
                list.appendChild(row);
            });
        }

        // ── Helper temperatura overlay ────────────────────────────────────────
        function _aggiornaTemp(temp) {
            let ov = document.getElementById('meteo-temp-overlay');
            let vl = document.getElementById('val-temp-meteo');
            if (!ov || !vl) return;
            let t = Math.round(temp);
            let col = t <= 0 ? '#4499ff' : t <= 10 ? '#44ccdd' : t <= 18 ? '#44dd88' : t <= 25 ? '#ffdd44' : t <= 32 ? '#ff8844' : '#ff3333';
            vl.style.color = col;
            ov.style.borderColor = col + '66';
            vl.innerText = t + '°C';
            ov.style.display = 'block';
        }
        function _nascondiTemp() {
            let ov = document.getElementById('meteo-temp-overlay');
            if (ov) ov.style.display = 'none';
        }
        // ─────────────────────────────────────────────────────────────────────

        // ── Toast localizzazione GPS ────────────────────────────────────────
        function _mostraToastGPS() {
            let toast = document.getElementById('gps-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'gps-toast';
                toast.style.cssText = 'position:absolute;top:16px;left:50%;transform:translateX(-50%);z-index:2000;background:#161b22;border:1px solid #c49a3c;border-radius:8px;padding:10px 18px;display:flex;align-items:center;gap:10px;font-size:0.85em;color:#c9d1d9;box-shadow:0 4px 16px rgba(0,0,0,0.6);white-space:nowrap;';
                let mapEl = document.getElementById('map');
                if (mapEl) { mapEl.style.position = 'relative'; mapEl.appendChild(toast); }
            }
            toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c49a3c" stroke-width="2" style="animation:spin 1.2s linear infinite;flex-shrink:0"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>${t('gps_locating')}</span>`;
            toast.style.display = 'flex';
        }

        function _nascondiToastGPS() {
            let toast = document.getElementById('gps-toast');
            if (toast) toast.style.display = 'none';
        }
        // ───────────────────────────────────────────────────────────────────

        // ── Geolocalizzazione browser ──────────────────────────────────────
        function _risolviGPSNome(lat, lon, callback) {
            // Reverse geocoding via Nominatim per ottenere il nome del luogo
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
                .then(r => r.json())
                .then(d => {
                    let nome = d.address?.city || d.address?.town || d.address?.village || d.address?.county || d.display_name || `${lat.toFixed(3)}, ${lon.toFixed(3)}`;
                    callback(nome);
                })
                .catch(() => callback(`${lat.toFixed(3)}, ${lon.toFixed(3)}`));
        }

        function usaPosizioneCorrente() {
            // Pulsante "Posizione attuale" nel pannello posizione
            if (!navigator.geolocation) {
                mostraAvviso(t('gps_not_supported'), 'warn'); return;
            }
            let btn = document.getElementById('btn-geolocate');
            if (btn) { btn.style.color = '#c49a3c'; btn.style.borderColor = '#c49a3c'; }
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let lat = pos.coords.latitude, lon = pos.coords.longitude;
                    _risolviGPSNome(lat, lon, nome => {
                        selezionaLuogo(lat, lon, nome);
                        if (btn) { btn.style.color = '#44ff44'; btn.style.borderColor = '#44ff44'; setTimeout(() => { btn.style.color = ''; btn.style.borderColor = ''; }, 2000); }
                    });
                },
                () => { mostraAvviso(t('gps_denied'), 'warn'); if (btn) { btn.style.color = ''; btn.style.borderColor = ''; } }
            );
        }

        function vaiMeteoConGeoloc() {
            let haLuogo = localStorage.getItem('ad_lat') && localStorage.getItem('ad_lon');
            if (haLuogo) {
                vaiMeteo();
                return;
            }
            // Vai subito alla mappa — risposta immediata al click
            vaiMeteo();
            if (!navigator.geolocation) {
                setTimeout(() => { let el = document.getElementById('ricerca'); if (el) { el.scrollIntoView({behavior:'smooth', block:'center'}); el.focus(); } }, 300);
                return;
            }
            // Mostra toast "in corso" dopo che la mappa è visibile
            setTimeout(_mostraToastGPS, 200);
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let lat = pos.coords.latitude, lon = pos.coords.longitude;
                    _risolviGPSNome(lat, lon, nome => {
                        selezionaLuogo(lat, lon, nome); // nasconde toast internamente
                    });
                },
                () => {
                    _nascondiToastGPS();
                    setTimeout(() => { let el = document.getElementById('ricerca'); if (el) { el.scrollIntoView({behavior:'smooth', block:'center'}); el.focus(); } }, 300);
                },
                { timeout: 8000 }
            );
        }
        // ──────────────────────────────────────────────────────────────────

        function aggiornaEffemeridi(data) {
            let orariSole = SunCalc.getTimes(data, latCorrente, lonCorrente), orariLuna = SunCalc.getMoonTimes(data, latCorrente, lonCorrente), faseLuna = SunCalc.getMoonIllumination(data);
            let formattaOra = (d) => d && !isNaN(d) ? d.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '--:--';
            document.getElementById('alba-sole').innerText = formattaOra(orariSole.sunrise); document.getElementById('tramonto-sole').innerText = formattaOra(orariSole.sunset);
            document.getElementById('alba-luna').innerText = orariLuna.rise ? formattaOra(orariLuna.rise) : '--:--'; document.getElementById('tramonto-luna').innerText = orariLuna.set ? formattaOra(orariLuna.set) : '--:--';
            let f = faseLuna.phase, i = '🌑', n = 'new_moon';
            if(f>0.03&&f<=0.22){i='🌒';n='waxing_crescent';}else if(f>0.22&&f<=0.28){i='🌓';n='first_quarter';}else if(f>0.28&&f<=0.47){i='🌔';n='waxing_gibbous';}else if(f>0.47&&f<=0.53){i='🌕';n='full_moon';}else if(f>0.53&&f<=0.72){i='🌖';n='waning_gibbous';}else if(f>0.72&&f<=0.78){i='🌗';n='last_quarter';}else if(f>0.78&&f<=0.97){i='🌘';n='waning_crescent';}
            document.getElementById('moon-emoji').innerText = i; document.getElementById('moon-phase-name').innerText = t(n);
            // Per date future: calcola inquinamento lunare medio durante la notte astronomica
            if (!isSessionDateToday()) {
                let nStart = orariSole.night   || orariSole.dusk;
                let dNext  = new Date(data.getTime() + 86400000);
                let atNext = SunCalc.getTimes(dNext, latCorrente, lonCorrente);
                let nEnd   = atNext.nightEnd || atNext.dawn || atNext.sunrise;
                let lunaFase = SunCalc.getMoonIllumination(data);
                let lunaSum = 0, lunaCount = 0;
                if (nStart && nEnd && nStart < nEnd) {
                    let cur = new Date(nStart.getTime());
                    while (cur <= nEnd) {
                        let mPos = SunCalc.getMoonPosition(cur, latCorrente, lonCorrente);
                        if (mPos.altitude > 0) {
                            lunaSum += lunaFase.fraction * Math.sin(mPos.altitude);
                        }
                        lunaCount++;
                        cur = new Date(cur.getTime() + 1800000); // ogni 30 min
                    }
                }
                let inqLFutura = lunaCount > 0 ? Math.max(0, Math.round((lunaSum / lunaCount) * 100)) : 0;
                let valLunaEl = document.getElementById('val-luna');
                if (valLunaEl) valLunaEl.innerText = inqLFutura + '%';
            }
        }

        function scaricaDatiPrevisionali() {
            let _meteoRicevuti = false;   // true quando i dati sono arrivati e validi
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latCorrente}&longitude=${lonCorrente}&hourly=cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_250hPa,wind_speed_10m,wind_direction_10m,temperature_2m,relative_humidity_2m,lifted_index,cape,wind_gusts_10m&forecast_days=3&timezone=auto`)
            .then(r => r.text().then(txt => {
                // Risposta del servizio: errore HTTP, testo non JSON o {"error":true,"reason":...}
                // Testo vuoto = nessuna risposta reale (es. risposta di ripiego del service worker)
                let d = null; try { d = JSON.parse(txt); } catch (e) {}
                if (!r.ok || !d || d.error) {
                    let err = new Error('meteo');
                    err._meteoTipo   = txt ? 'servizio' : 'rete';
                    err._meteoMotivo = (d && d.reason) || ('HTTP ' + r.status);
                    throw err;
                }
                return d;
            }))
            .then(data => {
                if (!data.hourly || !data.hourly.time) {
                    let err = new Error('invalid_data');
                    err._meteoTipo = 'servizio'; err._meteoMotivo = 'risposta senza dati orari';
                    throw err;
                }
                _meteoRicevuti = true;
                datiMeteo = data.hourly; let adesso = new Date();
                indicePartenza = Math.max(0, datiMeteo.time.findIndex(x => parseMeteoTime(x).getTime() >= adesso.getTime() - 3600000));
                document.getElementById('timeSlider').disabled = false; document.getElementById('timeSlider').value = 0; 
                document.getElementById('astroSlider').disabled = false; document.getElementById('astroSlider').value = 0; 
                applicaGradienteGiornoNotte();
                cambiaOraMeteo(); cambiaOraAstro();
                if (typeof mostraNightPopup === 'function') mostraNightPopup();
            }).catch(err => {
                // Avviso specifico: servizio esterno in errore / non raggiungibile / offline / errore imprevisto
                let tipo = (err && err._meteoTipo) || (_meteoRicevuti ? 'app' : 'rete');
                if (navigator.onLine === false) tipo = 'offline';
                if (tipo === 'servizio') console.warn('[Meteo] Open-Meteo:', err._meteoMotivo);
                else if (tipo === 'app') console.error('[Meteo] errore imprevisto:', err);
                const _msg = {
                    servizio: ['meteo_err_service',     '⚠️ Open-Meteo sovraccarico o in errore: non dipende dall\'app. Riprova tra poco.', 'warn'],
                    rete:     ['meteo_err_unreachable', '⚠️ Open-Meteo non risponde. Se sei connesso, riprova tra poco.', 'warn'],
                    offline:  ['meteo_err_offline',     '❌ Nessuna connessione Internet: meteo non scaricabile.', 'error'],
                    app:      ['meteo_err_unexpected',  '❌ Errore imprevisto nei dati meteo. Riprova tra poco.', 'error']
                }[tipo];
                let testo = (typeof t === 'function') ? t(_msg[0]) : _msg[1];
                if (!testo || testo === _msg[0]) testo = _msg[1];
                mostraAvviso(testo, _msg[2]);
            });
        }

        function applicaGradienteGiornoNotte() {
            let maxSteps = 23;
            let stops = [];
            for (let i = 0; i <= maxSteps; i++) {
                let d;
                if (!isSessionDateToday() || !datiMeteo || !datiMeteo.time[indicePartenza + i]) {
                    // Data futura o meteo non disponibile: costruisce ore dalla data sessione (base 18:00)
                    let base = getSessionDate();
                    base.setHours(18, 0, 0, 0);
                    d = new Date(base.getTime() + i * 3600000);
                } else {
                    d = parseMeteoTime(datiMeteo.time[indicePartenza + i]);
                }
                let times = SunCalc.getTimes(d, latCorrente, lonCorrente);
                let pct = (i / maxSteps) * 100;
                let color = "#0a0f1d";
                if (d > times.sunrise && d < times.sunset) color = "#5c9fb8";
                else if (d >= times.sunset && d < times.dusk)   color = "#d97b2b";
                else if (d >= times.dawn   && d <= times.sunrise) color = "#5c2d8a";
                stops.push(`${color} ${pct}%`);
            }
            let grad = `linear-gradient(to right, ${stops.join(', ')})`;
            let gMeteo = document.getElementById('meteo-gradient');
            let gAstro = document.getElementById('astro-gradient');
            if (gMeteo) gMeteo.style.background = grad;
            if (gAstro) gAstro.style.background = grad;
        }

        function syncSliders(val) { 
            document.getElementById('timeSlider').value = val; 
            document.getElementById('astroSlider').value = val; 
            cambiaOraMeteo(); 
            cambiaOraAstro(); 
        }

        // ── Helper: calcola lat/lon a distanza e bearing dal centro ───────
        function _offsetLatLon(lat, lon, distM, bearingDeg) {
            const R = 6371000, d = distM / R, t = bearingDeg * Math.PI / 180;
            const p1 = lat * Math.PI / 180, l1 = lon * Math.PI / 180;
            const p2 = Math.asin(Math.sin(p1)*Math.cos(d) + Math.cos(p1)*Math.sin(d)*Math.cos(t));
            const l2 = l1 + Math.atan2(Math.sin(t)*Math.sin(d)*Math.cos(p1), Math.cos(d)-Math.sin(p1)*Math.sin(p2));
            return [p2 * 180/Math.PI, l2 * 180/Math.PI];
        }

        // ── Crea marker icona bianca (contrasto su qualsiasi fill layer) ──
        function _meteoIcon(latLon, svgPaths, filled) {
            const sw = filled ? 0 : 2;
            const pathsHtml = svgPaths.map(d =>
                filled
                    ? `<path fill="white" d="${d}"/>`
                    : `<path fill="none" stroke="white" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" d="${d}"/>`
            ).join('');
            const html = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:block">${pathsHtml}</svg>`;
            return L.marker(latLon, {
                icon: L.divIcon({ html, className: '', iconSize: [16,16], iconAnchor: [8,8] }),
                interactive: false, keyboard: false
            });
        }

        // SVG paths per ogni layer
        const _SVG = {
            basse:   { filled: true,  paths: ['M10.04 4.305c2.195-.667 4.615-.224 6.36 1.176c1.386 1.108 2.188 2.686 2.252 4.34l.003.212l.091.003c2.3.107 4.143 1.961 4.25 4.27l.004.211c0 2.407-1.885 4.372-4.255 4.482l-.21.005h-11.878l-.222-.008c-2.94-.11-5.317-2.399-5.43-5.263l-.005-.216c0-2.747 2.08-5.01 4.784-5.417l.114-.016l.07-.181c.663-1.62 2.056-2.906 3.829-3.518l.244-.08z'] },
            medie:   { filled: false, paths: ['M6.657 18c-2.572 0-4.657-2.007-4.657-4.483c0-2.475 2.085-4.482 4.657-4.482c.393-1.762 1.794-3.2 3.675-3.773c1.88-.572 3.956-.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927-1.551 3.487-3.465 3.487h-11.878'] },
            alte:    { filled: false, paths: ['M7 16a4.6 4.4 0 0 1 0-9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12','M5 20l14 0'] },
            jet:     { filled: false, paths: ['M5 8h8.5a2.5 2.5 0 1 0-2.34-3.24','M3 12h15.5a2.5 2.5 0 1 1-2.34 3.24','M4 16h5.5a2.5 2.5 0 1 1-2.34 3.24'] },
            luna:    { filled: false, paths: ['M16.418 4.157a8 8 0 0 0 0 15.686','M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0'] },
            umidita: { filled: false, paths: ['M4.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67-3.798l-2.095-3.227a.6.6 0 0 0-1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798','M16.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67-3.798l-2.095-3.227a.6.6 0 0 0-1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798','M10.072 10.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67-3.798l-2.095-3.227a.6.6 0 0 0-1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798'] }
        };

        // ── Disegno layer vento (settore direzionale) ─────────────────────────
        // Unificato per giorno corrente e giorni di previsione.
        // R_BASE: raggio base del settore (tipicamente R_NUV = 50000 m).
        function _disegnaLayerVento(vs, wdir, R_BASE) {
            // Soglie: verde <15 km/h, giallo 15-30, arancione >30
            if (vs < 5) return; // mostra settore solo sopra 5 km/h
            const vsKmh = Math.round(vs);
            let windColor = vs < 6 ? '#44ff88' : vs < 11 ? '#ffcc00' : vs < 21 ? '#ff8800' : '#ff2222';
            const R_WIND = R_BASE;
            const HALF_ANG = 30; // settore ±30° = 60° totali
            const STEPS = 32;

            // Genera punti lungo l'arco (senza centro = solo arco esterno)
            function _arcPoints(lat, lon, r, bearing, halfAngle, steps) {
                let pts = [];
                for (let s = 0; s <= steps; s++) {
                    let ang = bearing - halfAngle + (s / steps) * halfAngle * 2;
                    pts.push(_offsetLatLon(lat, lon, r, ang));
                }
                return pts;
            }

            // Genera punti del settore (slice) con centro
            function _slicePoints(lat, lon, r, bearing, halfAngle, steps) {
                let pts = [[lat, lon]];
                for (let s = 0; s <= steps; s++) {
                    let ang = bearing - halfAngle + (s / steps) * halfAngle * 2;
                    pts.push(_offsetLatLon(lat, lon, r, ang));
                }
                pts.push([lat, lon]);
                return pts;
            }

            // Singolo strato periferico: solo la fascia esterna del settore
            const outerArc = _arcPoints(latCorrente, lonCorrente, R_WIND, wdir, HALF_ANG, STEPS);
            const innerArc = _arcPoints(latCorrente, lonCorrente, R_WIND * 0.89, wdir, HALF_ANG, STEPS).reverse();
            L.polygon([...outerArc, ...innerArc], {
                color: 'transparent', weight: 0,
                fillColor: windColor, fillOpacity: 0.55
            }).addTo(layers.vento);

            // Solo arco esterno — nessun raggio, contorno sfumato
            const arcPts = _arcPoints(latCorrente, lonCorrente, R_WIND, wdir, HALF_ANG, STEPS);
            L.polyline(arcPts, {
                color: windColor, weight: 2.5, opacity: 0.75,
                smoothFactor: 1
            }).addTo(layers.vento);

            // Sigla cardinale e velocità — ore 6 (sotto centro mappa)
            const cardDir = (d) => {
                const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO'];
                return dirs[Math.round(d / 22.5) % 16];
            };
            const labelLatLon = _offsetLatLon(latCorrente, lonCorrente, R_WIND * 0.52, 180);
            const windHtml = `<div style="text-align:center;line-height:1.3;pointer-events:none;font-family:'Audiowide',sans-serif;">
                <div style="font-size:36px;color:${windColor};text-shadow:0 0 6px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,1);">${cardDir(wdir)}</div>
                <div style="font-size:26px;color:${windColor};opacity:0.9;text-shadow:0 0 5px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,1);">${vsKmh} km/h</div>
            </div>`;
            L.marker(labelLatLon, {
                icon: L.divIcon({ html: windHtml, className: '', iconSize: [120, 70], iconAnchor: [60, 8] }),
                interactive: false, keyboard: false
            }).addTo(layers.vento);
        }

        function cambiaOraMeteo() {
            // Per date future entro copertura meteo (oggi+1, oggi+2): usa datiMeteo
            // Per date oltre: solo dati lunari
            if (!isSessionDateToday()) {
                let step = parseInt(document.getElementById('timeSlider').value);
                let base = getSessionDate();
                base.setHours(18, 0, 0, 0);
                let dOra = new Date(base.getTime() + step * 3600000);
                // Cerca l'indice in datiMeteo corrispondente a dOra
                let _meteoIdx = -1;
                if (datiMeteo && datiMeteo.time) {
                    const _dOraMs = dOra.getTime();
                    _meteoIdx = datiMeteo.time.findIndex(t => Math.abs(parseMeteoTime(t).getTime() - _dOraMs) < 1800000);
                }
                if (_meteoIdx >= 0) {
                    // Dati meteo disponibili per questa data/ora
                    let b = datiMeteo.cloud_cover_low[_meteoIdx], m = datiMeteo.cloud_cover_mid[_meteoIdx], a = datiMeteo.cloud_cover_high[_meteoIdx];
                    let jet = Math.round(datiMeteo.wind_speed_250hPa[_meteoIdx]);
                    let vs = datiMeteo.wind_speed_10m[_meteoIdx], wdir = datiMeteo.wind_direction_10m ? datiMeteo.wind_direction_10m[_meteoIdx] : 0;
                    let temp = datiMeteo.temperature_2m[_meteoIdx], um = datiMeteo.relative_humidity_2m[_meteoIdx];
                    let li = datiMeteo.lifted_index ? (datiMeteo.lifted_index[_meteoIdx] || 0) : 0;
                    let cape = datiMeteo.cape ? (datiMeteo.cape[_meteoIdx] || 0) : 0;
                    let raffica = datiMeteo.wind_gusts_10m ? (datiMeteo.wind_gusts_10m[_meteoIdx] || vs) : vs;
                    let altS = SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI);
                    let mP = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente);
                    let inqL = (altS < -6 && mP.altitude > 0) ? Math.max(0, Math.round((SunCalc.getMoonIllumination(dOra).fraction * Math.sin(mP.altitude)) * 100)) : 0;
                    let maxC = Math.max(b, m, a), icM = "☁️", dsM = "overcast";
                    if (maxC < 15) { icM = "☀️"; dsM = "clear"; } else if (maxC < 40) { icM = "🌤️"; dsM = "partly_cloudy"; } else if (maxC < 75) { icM = "⛅"; dsM = "mostly_cloudy"; }
                    if (altS < -6) { if (maxC < 15) icM = "✨"; else if (maxC < 40) icM = "🌙"; }
                    let tOra = dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
                    let tdEl = document.getElementById('time-display');
                    if (tdEl) tdEl.innerHTML = `<span style="font-size:1.5em;vertical-align:middle;margin-right:5px;">${icM}</span> ${tOra} <br><span style="font-size:0.75em;color:#aaa;text-transform:uppercase;">${t("weather")}: <b style="color:#fff;">${t(dsM)}</b></span>`;
                    document.getElementById('val-basse').innerText = b+"%"; document.getElementById('val-medie').innerText = m+"%"; document.getElementById('val-alte').innerText = a+"%";
                    document.getElementById('val-jet').innerHTML = jet+' <span class="jet-unit">km/h</span>';
                    document.getElementById('val-luna').innerText = inqL+"%";
                    let _vEl = document.getElementById('val-vento-layer');
                    if (_vEl) { let _vc = vs < 6 ? '#44ff88' : vs < 11 ? '#ffcc00' : vs < 21 ? '#ff8800' : '#ff2222'; _vEl.style.color = _vc; _vEl.innerText = Math.round(vs)+' km/h'; }
                    let _uEl = document.getElementById('val-umidita-layer');
                    if (_uEl) _uEl.innerText = um + '%';
                    _aggiornaTemp(temp);
                    // Seeing
                    let scS = _calcolaSeeing(jet, raffica, li, cape);
                    if (altS > -6) { _aggiornaWidgetSeeingGiorno(); } else { aggiornaWidgetSeeing(scS); }
                    // Layer meteo attivi per previsione
                    ['basse','medie','alte','jet','umidita','vento'].forEach(n => {
                        let btn = document.getElementById('btn-'+n);
                        if (btn) { btn.style.opacity=''; btn.style.pointerEvents=''; btn.style.cursor=''; }
                    });
                    let btnSeeing = document.getElementById('btn-seeing');
                    if (btnSeeing) { btnSeeing.style.opacity=''; btnSeeing.style.pointerEvents=''; }
                    // Ridisegna i layer sulla mappa per la data futura
                    Object.values(layers).forEach(l => l.clearLayers());
                    const R_NUV = 25000, R_JET = 42000, R_UMID = 29000, R_LUNA = 33000, PCT = 0.92; // M1d: raggi 'il tuo cielo' (nubi 25, umidità 29, luna 33, jet 42 km)
                    _adpDisegnaNubi('basse', _meteoIdx, b);   // M1d: mappa delle nubi sul territorio (prima: cerchio)
                    _meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_NUV*PCT,270),_SVG.basse.paths,_SVG.basse.filled).addTo(layers.basse);
                    _adpDisegnaNubi('medie', _meteoIdx, m);
                    _meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_NUV*PCT,315),_SVG.medie.paths,_SVG.medie.filled).addTo(layers.medie);
                    _adpDisegnaNubi('alte', _meteoIdx, a);
                    _meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_NUV*PCT,0),_SVG.alte.paths,_SVG.alte.filled).addTo(layers.alte);
                    if(jet>50){L.circle([latCorrente,lonCorrente],{radius:R_JET,color:'#ff00ff',fillColor:'#ff00ff',fillOpacity:(jet/200)*0.5,weight:2,dashArray:'10, 10'}).addTo(layers.jet);_meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_JET*PCT,45),_SVG.jet.paths,_SVG.jet.filled).addTo(layers.jet);}
                    if(inqL>0){L.circle([latCorrente,lonCorrente],{radius:R_LUNA,color:'#ffffaa',fillColor:'#ffffaa',fillOpacity:(inqL/100)*0.4,weight:0}).addTo(layers.luna);_meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_LUNA*PCT,45),_SVG.luna.paths,_SVG.luna.filled).addTo(layers.luna);}
                    if(um>60){L.circle([latCorrente,lonCorrente],{radius:R_UMID,color:'#00ffff',fillColor:'#00ffff',fillOpacity:((um-60)/100)*0.5,weight:1,dashArray:'5, 5'}).addTo(layers.umidita);_meteoIcon(_offsetLatLon(latCorrente,lonCorrente,R_UMID*PCT,45),_SVG.umidita.paths,_SVG.umidita.filled).addTo(layers.umidita);}
                    // Layer vento (unificato con ramo giorno corrente)
                    _disegnaLayerVento(vs, wdir, R_NUV);
                    return;
                }
                let tOra = dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
                // Calcolo inquinamento lunare per quest'ora specifica
                let mPFut = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente);
                let mIFut = SunCalc.getMoonIllumination(dOra);
                let altSFut = SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI);
                let inqLFut = (altSFut < -6 && mPFut.altitude > 0)
                    ? Math.max(0, Math.round(mIFut.fraction * Math.sin(mPFut.altitude) * 100))
                    : 0;
                let valLunaEl = document.getElementById('val-luna');
                if (valLunaEl) valLunaEl.innerText = inqLFut + '%';
                // Aggiorna layer luna sulla mappa se attivo
                if (layers && layers.luna && map.hasLayer(layers.luna)) {
                    layers.luna.clearLayers();
                    const R_LUNA_F = 33000, PCT_F = 0.6;   // M1d: luna 33 km (prima 100 km)
                    if (inqLFut > 0) {
                        L.circle([latCorrente, lonCorrente], { radius: R_LUNA_F, color: '#ffffaa', fillColor: '#ffffaa', fillOpacity: (inqLFut/100)*0.4, weight: 0 }).addTo(layers.luna);
                        _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_LUNA_F*PCT_F, 45), _SVG.luna.paths, _SVG.luna.filled).addTo(layers.luna);
                    }
                }
                let tdEl = document.getElementById('time-display');
                if (tdEl) tdEl.innerHTML = `<span style="font-size:1.5em;vertical-align:middle;margin-right:5px;">🌙</span> ${tOra} <br><span style="font-size:0.75em;color:#aaa;">${lang==='it'?'Dati meteo non disponibili':lang==='en'?'Weather data unavailable':lang==='es'?'Datos no disponibles':'天气数据不可用'}</span>`;
                _nascondiTemp();
                return;
            }
            if (!datiMeteo) return;
            let step = parseInt(document.getElementById('timeSlider').value), i = indicePartenza + step, dOra = parseMeteoTime(datiMeteo.time[i]);
            let tOra;
            if (step === 0) {
                tOra = t("now") + " (" + new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}) + ")";
            } else {
                tOra = dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
            }
            if (step > 0 && dOra.getHours() === 0) aggiornaEffemeridi(dOra);

            let b = datiMeteo.cloud_cover_low[i], m = datiMeteo.cloud_cover_mid[i], a = datiMeteo.cloud_cover_high[i], jet = Math.round(datiMeteo.wind_speed_250hPa[i]), vs = datiMeteo.wind_speed_10m[i], wdir = datiMeteo.wind_direction_10m ? datiMeteo.wind_direction_10m[i] : 0, temp = datiMeteo.temperature_2m[i], um = datiMeteo.relative_humidity_2m[i];
            let li = datiMeteo.lifted_index ? (datiMeteo.lifted_index[i] || 0) : 0;
            let cape = datiMeteo.cape ? (datiMeteo.cape[i] || 0) : 0;
            let raffica = datiMeteo.wind_gusts_10m ? (datiMeteo.wind_gusts_10m[i] || vs) : vs;
            let altS = SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI), mP = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente);
            
            let maxC = Math.max(b, m, a), icM = "☁️", dsM = "overcast";
            if (maxC < 15) { icM = "☀️"; dsM = "clear"; } else if (maxC < 40) { icM = "🌤️"; dsM = "partly_cloudy"; } else if (maxC < 75) { icM = "⛅"; dsM = "mostly_cloudy"; }
            if (altS < -6) { if (maxC < 15) icM = "✨"; else if (maxC < 40) icM = "🌙"; }

            document.getElementById('time-display').innerHTML = `<span style="font-size: 1.5em; vertical-align: middle; margin-right: 5px;">${icM}</span> ${tOra} <br><span style="font-size: 0.75em; color: #aaa; text-transform: uppercase;">${t("weather")}: <b style="color: #fff;">${t(dsM)}</b></span>`;
            
            // Calcolo Meteo Attuale (fisso, non influenzato dallo slider)
            let dOra0 = parseMeteoTime(datiMeteo.time[indicePartenza]);
            let b0 = datiMeteo.cloud_cover_low[indicePartenza], m0 = datiMeteo.cloud_cover_mid[indicePartenza], a0 = datiMeteo.cloud_cover_high[indicePartenza];
            let altS0 = SunCalc.getPosition(dOra0, latCorrente, lonCorrente).altitude * (180/Math.PI);
            let maxC0 = Math.max(b0, m0, a0), icM0 = "☁️", dsM0 = "overcast";
            if (maxC0 < 15) { icM0 = "☀️"; dsM0 = "clear"; } else if (maxC0 < 40) { icM0 = "🌤️"; dsM0 = "partly_cloudy"; } else if (maxC0 < 75) { icM0 = "⛅"; dsM0 = "mostly_cloudy"; }
            if (altS0 < -6) { if (maxC0 < 15) icM0 = "✨"; else if (maxC0 < 40) icM0 = "🌙"; }
            
            let iconEl = document.getElementById('current-weather-icon'); if (iconEl) iconEl.innerText = icM0;
            let descEl = document.getElementById('current-weather-desc'); if (descEl) descEl.innerText = t(dsM0);
            
            document.getElementById('val-umidita-layer').innerText = um + "%";
            
            let inqL = (altS < -6 && mP.altitude > 0) ? Math.max(0, Math.round((SunCalc.getMoonIllumination(dOra).fraction * Math.sin(mP.altitude)) * 100)) : 0;
            let scS = _calcolaSeeing(jet, raffica, li, cape);
            
            if (altS > -6) { _aggiornaWidgetSeeingGiorno(); } else { aggiornaWidgetSeeing(Math.max(1, scS)); }
            document.getElementById('val-basse').innerText = b+"%"; document.getElementById('val-medie').innerText = m+"%"; document.getElementById('val-alte').innerText = a+"%"; document.getElementById('val-jet').innerHTML = jet+' <span class="jet-unit">km/h</span>'; document.getElementById('val-luna').innerText = inqL+"%";
            let _vEl = document.getElementById('val-vento-layer');
            if (_vEl) { let _vc = vs < 6 ? '#44ff88' : vs < 11 ? '#ffcc00' : vs < 21 ? '#ff8800' : '#ff2222'; _vEl.style.color = _vc; _vEl.innerText = Math.round(vs) + ' km/h'; }
            _aggiornaTemp(temp);

            Object.values(layers).forEach(l => l.clearLayers());

            // Raggi in metri. Icone bianche al 92% del raggio (vicino al bordo, no sovrapposizioni).
            // Nuvole stesso raggio — basse ore 9 (270°), medie ore 10:30 (315°), alte ore 12 (0°)
            // Jet/Luna/Umidità raggi crescenti — tutti ore 1:30 (45°), cerchi diversi
            const R_NUV = 25000, R_JET = 42000, R_UMID = 29000, R_LUNA = 33000; // M1d: raggi 'il tuo cielo' (nubi 25, umidità 29, luna 33, jet 42 km)
            const PCT = 0.92;

            _adpDisegnaNubi('basse', i, b);   // M1d: mappa delle nubi sul territorio (prima: cerchio)
            _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_NUV*PCT, 270), _SVG.basse.paths, _SVG.basse.filled).addTo(layers.basse);

            _adpDisegnaNubi('medie', i, m);
            _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_NUV*PCT, 315), _SVG.medie.paths, _SVG.medie.filled).addTo(layers.medie);

            _adpDisegnaNubi('alte', i, a);
            _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_NUV*PCT, 0), _SVG.alte.paths, _SVG.alte.filled).addTo(layers.alte);

            if (jet > 50) {
                L.circle([latCorrente, lonCorrente], { radius: R_JET, color: '#ff00ff', fillColor: '#ff00ff', fillOpacity: (jet/200)*0.5, weight: 2, dashArray: '10, 10' }).addTo(layers.jet);
                _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_JET*PCT, 45), _SVG.jet.paths, _SVG.jet.filled).addTo(layers.jet);
            }
            if (inqL > 0) {
                L.circle([latCorrente, lonCorrente], { radius: R_LUNA, color: '#ffffaa', fillColor: '#ffffaa', fillOpacity: (inqL/100)*0.4, weight: 0 }).addTo(layers.luna);
                _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_LUNA*PCT, 45), _SVG.luna.paths, _SVG.luna.filled).addTo(layers.luna);
            }
            if (um > 60) {
                L.circle([latCorrente, lonCorrente], { radius: R_UMID, color: '#00ffff', fillColor: '#00ffff', fillOpacity: ((um-60)/100)*0.5, weight: 1, dashArray: '5, 5' }).addTo(layers.umidita);
                _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_UMID*PCT, 45), _SVG.umidita.paths, _SVG.umidita.filled).addTo(layers.umidita);
            }

            // ── Layer vento a bassa quota ──────────────────────────────────────────
            _disegnaLayerVento(vs, wdir, R_NUV);
        }




        // ── Bortle autorilevamento via tile Lorenz 2024 ───────────────────────
        // Campiona il colore del tile LP già usato sulla mappa e lo mappa a Bortle

        // Tabella colori Lorenz → Bortle (da colorbar ufficiale campionata via PIL)
        const _LORENZ_COLORS = [
            { r:  26, g:  26, b:  26, bortle: 1 },  // zona 0
            { r:  45, g:  45, b:  45, bortle: 2 },  // zona 1a
            { r:  64, g:  64, b:  64, bortle: 2 },  // zona 1b
            { r:  13, g:  43, b: 115, bortle: 3 },  // zona 2a
            { r:  27, g:  84, b: 217, bortle: 3 },  // zona 2b
            { r:   6, g:  87, b:   8, bortle: 4 },  // zona 3a
            { r:  26, g: 162, b:  38, bortle: 4 },  // zona 3b
            { r: 109, g: 100, b:  21, bortle: 5 },  // zona 4a
            { r: 182, g: 167, b:  38, bortle: 5 },  // zona 4b
            { r: 192, g: 100, b:  23, bortle: 6 },  // zona 5a
            { r: 253, g: 151, b:  79, bortle: 6 },  // zona 5b
            { r: 251, g:  90, b:  70, bortle: 7 },  // zona 6a
            { r: 251, g: 154, b: 138, bortle: 7 },  // zona 6b
            { r: 161, g: 161, b: 161, bortle: 8 },  // zona 7a
            { r: 240, g: 240, b: 240, bortle: 9 },  // zona 7b
        ];

        function _colorDistance(r1, g1, b1, r2, g2, b2) {
            return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
        }

        function _rgbToBortle(r, g, b) {
            let best = _LORENZ_COLORS[0], bestDist = Infinity;
            for (const c of _LORENZ_COLORS) {
                const d = _colorDistance(r, g, b, c.r, c.g, c.b);
                if (d < bestDist) { bestDist = d; best = c; }
            }
            return best.bortle;
        }

        function _latLonToTile(lat, lon, zoom) {
            const n = Math.pow(2, zoom);
            const x = Math.floor((lon + 180) / 360 * n);
            const latR = lat * Math.PI / 180;
            const y = Math.floor((1 - Math.log(Math.tan(latR) + 1/Math.cos(latR)) / Math.PI) / 2 * n);
            return { x, y };
        }

        function _pixelInTile(lat, lon, zoom, tileSize) {
            const n = Math.pow(2, zoom);
            const { x: tx, y: ty } = _latLonToTile(lat, lon, zoom);
            const xFrac = ((lon + 180) / 360 * n) - tx;
            const latR = lat * Math.PI / 180;
            const yFrac = ((1 - Math.log(Math.tan(latR) + 1/Math.cos(latR)) / Math.PI) / 2 * n) - ty;
            return { tx, ty, px: Math.floor(xFrac * tileSize), py: Math.floor(yFrac * tileSize) };
        }

        function _rilevaBortleDaCoordinate(lat, lon) {
            const zoom = 6;
            const tileSize = 256;
            const { tx, ty, px, py } = _pixelInTile(lat, lon, zoom, tileSize);
            const url = `https://djlorenz.github.io/astronomy/image_tiles/tiles2024/tile_${zoom}_${tx}_${ty}.png`;

            if (DEBUG) console.log('[Bortle] Carico tile:', url, 'pixel:', px, py);

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                if (DEBUG) console.log('[Bortle] Tile caricato, dimensioni:', img.width, img.height);
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = tileSize;
                    canvas.height = tileSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, tileSize, tileSize);
                    const pixel = ctx.getImageData(px, py, 1, 1).data;
                    const r = pixel[0], g = pixel[1], b = pixel[2], a = pixel[3];
                    if (DEBUG) console.log('[Bortle] Pixel rgba:', r, g, b, a);
                    if (a < 10) { if (DEBUG) console.warn('[Bortle] Pixel trasparente, skip'); return; }
                    const bortle = _rgbToBortle(r, g, b);
                    if (DEBUG) console.log('[Bortle] Bortle rilevato:', bortle);
                    if (typeof setBortleAutorilevato === 'function') {
                        setBortleAutorilevato(bortle);
                    }
                } catch(e) {
                    if (DEBUG) console.warn('[Bortle] Canvas sampling fallito:', e.message);
                }
            };
            img.onerror = function() {
                if (DEBUG) console.error('[Bortle] Tile non disponibile:', url);
            };
            img.src = url;
        }
        // ─────────────────────────────────────────────────────────────────────


        // ── Listener cambio data sessione ─────────────────────────────────────
        document.addEventListener('sessionDateChanged', function(e) {
            aggiornaEffemeridi(e.detail.date);
            let isFuture = !isSessionDateToday();
            // Calcola se la data è entro la copertura meteo (oggi+2)
            const _today0 = new Date(); _today0.setHours(0,0,0,0);
            const _sel0 = new Date(e.detail.date); _sel0.setHours(0,0,0,0);
            const _diffDays = Math.round((_sel0 - _today0) / 86400000);
            const _hasMeteo = _diffDays <= 2;

            // Slider meteo: resta attivo anche per date future (mostra orario senza dati)
            let sliderMeteo = document.getElementById('timeSlider');
            if (sliderMeteo) {
                sliderMeteo.disabled = false;
                sliderMeteo.value = 0;
                cambiaOraMeteo();
            }

            // Slider astro: sempre attivo
            let sliderAstro = document.getElementById('astroSlider');
            if (sliderAstro) {
                sliderAstro.disabled = false;
                sliderAstro.value = 0;
                if (typeof cambiaOraAstro === 'function') cambiaOraAstro();
            }

            // Layer meteo: disabilitati solo oltre la copertura previsionale (>oggi+2)
            // Luna e LP rimangono sempre gestibili
            const _meteoOnlyLayers = ['basse','medie','alte','jet','umidita','vento'];
            _meteoOnlyLayers.forEach(n => {
                let btn = document.getElementById('btn-' + n);
                if (!btn) return;
                if (!_hasMeteo) {
                    // Rimuovi dal layer se attivo, metti non cliccabile
                    if (layers[n] && map.hasLayer(layers[n])) map.removeLayer(layers[n]);
                    btn.classList.remove('active');
                    btn.classList.add('disabled');
                    btn.style.opacity = '0.35';
                    btn.style.pointerEvents = 'none';
                    btn.style.cursor = 'not-allowed';
                } else {
                    btn.style.opacity = '';
                    btn.style.pointerEvents = '';
                    btn.style.cursor = '';
                }
            });

            // Azzera valori meteo solo oltre la copertura previsionale
            if (!_hasMeteo) {
                ['val-basse','val-medie','val-alte'].forEach(id => {
                    let el = document.getElementById(id); if (el) el.innerText = '--%';
                });
                let jet = document.getElementById('val-jet');
                if (jet) jet.innerHTML = '-- <span class="jet-unit">km/h</span>';
                let vento = document.getElementById('val-vento-layer');
                if (vento) vento.innerText = '-- km/h';
                let umid = document.getElementById('val-umidita-layer');
                if (umid) umid.innerText = '--%';
                // Seeing non prevedibile per date future
                aggiornaWidgetSeeing('--');
                let btnSeeing = document.getElementById('btn-seeing');
                if (btnSeeing) { btnSeeing.style.opacity = '0.35'; btnSeeing.style.pointerEvents = 'none'; }
                _nascondiTemp();
            } else {
                let btnSeeing = document.getElementById('btn-seeing');
                if (btnSeeing) { btnSeeing.style.opacity = ''; btnSeeing.style.pointerEvents = ''; }
            }

            // Aggiorna gradiente giorno/notte per la nuova data
            applicaGradienteGiornoNotte();
            // Aggiorna slider meteo (funziona per oggi e previsioni)
            if (datiMeteo || _hasMeteo) cambiaOraMeteo();
        });

        // ── Boot automatico meteo se posizione già salvata ─────────────
        // Riproduce selezionaLuogo() senza interazione utente.
        // Necessario per mostraNightPopup() al riavvio della pagina.
        document.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('ad_lat') && localStorage.getItem('ad_lon')) {
                aggiornaEffemeridi(getSessionDate());
                scaricaDatiPrevisionali();
            }
        });

        // ══════════════════════════════════════════════════════════════
        // ── M1b (03/11/2026): play della barra meteo + avviso data futura ──
        // Blocco autonomo aggiunto in coda: NON modifica alcuna funzione
        // esistente. Usa syncSliders()/cambiaOraMeteo() così come sono.
        //  · Play manuale: loop continuo sulle sole ore notturne, ⏸ per fermare.
        //  · Giro automatico: una volta per apertura dell'app, quando la
        //    mappa diventa visibile; solo ore notturne (Sole < -6°), poi
        //    torna su "Adesso". Saltato con "riduci animazioni".
        //  · Velocità: 0,5 s per ora (_ADP_MS_ORA).
        //  · Tra un'ora e la successiva sfumano cerchi e % delle nuvole.
        //  · Trascinare la barra ferma il play.
        //  · Qualsiasi altro spostamento dello slider (es. il night popup che
        //    porta all'ora migliore di un DSO) ferma il play lasciando l'ora
        //    scelta e annulla il giro automatico non ancora partito.
        //  · Il giro automatico non parte mentre il night popup è aperto.
        //  · Data futura: fascia + cornice sulla mappa, linguetta e
        //    cornice sulla striscia in alto, meteo della sera (22:00).
        // ══════════════════════════════════════════════════════════════
        const _ADP_MS_ORA = 500;   // millisecondi per ogni ora dello slider
        const _ADP_TXT = {
            it: { notti:'Le prossime notti', oggiC:'Oggi', scelta:'SCELTA', play:'Riproduci', pause:'Pausa', fut:'PREVISIONE FUTURA', na:'METEO NON DISPONIBILE', astro:'solo dati astronomici', today:'oggi', futS:'previsione futura', naS:'meteo non disponibile', eve:'Meteo delle 22:00', nd:'Non disponibile' },
            en: { notti:'The next nights', oggiC:'Today', scelta:'SELECTED', play:'Play', pause:'Pause', fut:'FUTURE FORECAST', na:'WEATHER NOT AVAILABLE', astro:'astronomical data only', today:'today', futS:'future forecast', naS:'weather not available', eve:'Weather at 22:00', nd:'Not available' },
            es: { notti:'Las próximas noches', oggiC:'Hoy', scelta:'ELEGIDA', play:'Reproducir', pause:'Pausa', fut:'PREVISIÓN FUTURA', na:'METEO NO DISPONIBLE', astro:'solo datos astronómicos', today:'hoy', futS:'previsión futura', naS:'meteo no disponible', eve:'Tiempo a las 22:00', nd:'No disponible' },
            zh: { notti:'未来几晚', oggiC:'今天', scelta:'已选', play:'播放', pause:'暂停', fut:'未来预报', na:'无天气数据', astro:'仅天文数据', today:'今天', futS:'未来预报', naS:'无天气数据', eve:'22:00 天气', nd:'不可用' }
        };
        function _adpT(k) { const l = (typeof lang !== 'undefined' && _ADP_TXT[lang]) ? lang : 'it'; return _ADP_TXT[l][k]; }
        function _adpLocale() { return ({ it:'it-IT', en:'en-GB', es:'es-ES', zh:'zh-CN' })[typeof lang !== 'undefined' ? lang : 'it'] || 'it-IT'; }

        // ── Indice in datiMeteo per uno step dello slider (stessa logica di cambiaOraMeteo) ──
        function _adpOraDiStep(s) {
            if (isSessionDateToday()) {
                const i = indicePartenza + s;
                return (datiMeteo && datiMeteo.time && datiMeteo.time[i]) ? parseMeteoTime(datiMeteo.time[i]) : null;
            }
            const base = getSessionDate(); base.setHours(18, 0, 0, 0);
            return new Date(base.getTime() + s * 3600000);
        }
        function _adpIndiceDiStep(s) {
            if (!datiMeteo || !datiMeteo.time) return -1;
            if (isSessionDateToday()) { const i = indicePartenza + s; return i < datiMeteo.time.length ? i : -1; }
            const d = _adpOraDiStep(s).getTime();
            return datiMeteo.time.findIndex(x => Math.abs(parseMeteoTime(x).getTime() - d) < 1800000);
        }

        // ── Stato del play ──
        let _adpPlay = { attivo:false, auto:false, pos:0, ultimaOra:-1, inizio:0, fine:23, raf:null, t0:0, esterno:false };

        // ── syncSliders "avvolta": la funzione originale resta identica e viene
        //    sempre eseguita; qui si distinguono le chiamate del play (interne)
        //    da quelle di utente / night popup (esterne).
        let _adpInterno = false;
        const _adpSyncOriginale = syncSliders;
        function _adpSync(v) { _adpInterno = true; try { _adpSyncOriginale(v); } finally { _adpInterno = false; } }
        syncSliders = function(val) {
            if (!_adpInterno) {
                _adpPlay.esterno = true;                 // annulla il giro automatico non ancora partito
                if (_adpPlay.attivo) _adpInterrompi();   // ferma il play senza toccare l'ora scelta
            }
            return _adpSyncOriginale(val);
        };
        // Ferma il play senza riposizionare lo slider (l'ora la decide chi ha chiamato)
        function _adpInterrompi() {
            _adpPlay.attivo = false; _adpPlay.auto = false;
            cancelAnimationFrame(_adpPlay.raf);
            const sl = document.getElementById('timeSlider');
            if (sl) sl.step = '1';
            _adpIconaPlay();
        }
        function _adpPopupAperto() {
            const m = document.getElementById('night-popup-modal');
            return !!(m && m.style.display && m.style.display !== 'none');
        }

        function _adpIconaPlay() {
            const b = document.getElementById('adp-play');
            if (!b) return;
            b.innerHTML = _adpPlay.attivo
                ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
                : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>';
            b.title = _adpT(_adpPlay.attivo ? 'pause' : 'play');
            b.setAttribute('aria-label', b.title);
        }

        // Sfuma nuvole basse/medie/alte (cerchi + percentuali) tra lo step h e h+1
        function _adpSfuma(h, f) {
            const i1 = _adpIndiceDiStep(h), i2 = _adpIndiceDiStep(Math.min(23, h + 1));
            if (i1 < 0 || i2 < 0 || f <= 0) return;
            const chiavi = { basse:'cloud_cover_low', medie:'cloud_cover_mid', alte:'cloud_cover_high' };
            Object.keys(chiavi).forEach(n => {
                const arr = datiMeteo[chiavi[n]];
                if (!arr) return;
                const v = arr[i1] + (arr[i2] - arr[i1]) * f;
                const el = document.getElementById('val-' + n);
                if (el) el.innerText = Math.round(v) + '%';
            });
            const ora = performance.now();
            if (ora - _adpUltimoDisegno < 50) return;          // ~20 fotogrammi al secondo
            _adpUltimoDisegno = ora;
            ['basse','medie','alte'].forEach(n => {
                const arr = datiMeteo[chiavi[n]];
                if (arr && map.hasLayer(layers[n])) _adpDisegnaNubi(n, i1, arr[i1] + (arr[i2] - arr[i1]) * f, i2, f);
            });
        }
        let _adpUltimoDisegno = 0;

        function _adpFrame(ts) {
            if (!_adpPlay.attivo) return;
            if (_adpPlay.t0) _adpPlay.pos += (ts - _adpPlay.t0) / _ADP_MS_ORA;
            _adpPlay.t0 = ts;
            if (_adpPlay.auto && _adpPlay.pos >= _adpPlay.fine) { adpStopPlay(true); return; }
            if (!_adpPlay.auto && _adpPlay.pos > _adpPlay.fine) { _adpPlay.pos = _adpPlay.inizio; _adpPlay.ultimaOra = -1; }
            const h = Math.floor(_adpPlay.pos), f = _adpPlay.pos - h;
            if (h !== _adpPlay.ultimaOra) { _adpPlay.ultimaOra = h; _adpSync(h); }
            const sl = document.getElementById('timeSlider');
            if (sl) sl.value = _adpPlay.pos;           // cursore continuo (step="any" durante il play)
            _adpSfuma(h, f);
            _adpPlay.raf = requestAnimationFrame(_adpFrame);
        }

        function _adpAvvia(auto, da, a) {
            const sl = document.getElementById('timeSlider');
            if (!sl || sl.disabled || !datiMeteo) return false;
            _adpPlay.attivo = true; _adpPlay.auto = auto; _adpPlay.pos = da; _adpPlay.inizio = da; _adpPlay.fine = a;
            _adpPlay.ultimaOra = -1; _adpPlay.t0 = 0;
            sl.step = 'any';
            _adpIconaPlay();
            _adpPlay.raf = requestAnimationFrame(_adpFrame);
            return true;
        }

        // tornaAdesso: fine del giro automatico → slider su "Adesso" (step 0)
        function adpStopPlay(tornaAdesso) {
            if (!_adpPlay.attivo) return;
            _adpPlay.attivo = false;
            cancelAnimationFrame(_adpPlay.raf);
            const sl = document.getElementById('timeSlider');
            const fin = tornaAdesso ? 0 : Math.max(0, Math.min(23, Math.round(_adpPlay.pos)));
            if (sl) sl.step = '1';
            _adpSync(fin);
            _adpPlay.auto = false;
            _adpIconaPlay();
        }

        // Play manuale: loop sulle ore notturne. Se il cursore è già dentro la notte
        // il primo giro parte da lì, poi ricomincia sempre dall'inizio della notte.
        function adpTogglePlay() {
            if (_adpPlay.attivo) { adpStopPlay(false); return; }
            const n = _adpOreNotturne() || { da: 0, a: 23 };   // nessuna notte (es. estate polare): 24 ore
            const sl = document.getElementById('timeSlider');
            const cur = sl ? (parseInt(sl.value) || 0) : 0;
            if (!_adpAvvia(false, n.da, n.a)) return;
            if (cur > n.da && cur < n.a) _adpPlay.pos = cur;
        }

        // Ore notturne: dal primo step con Sole < -6° fino all'ultimo consecutivo
        function _adpOreNotturne() {
            let s0 = -1, s1 = -1;
            for (let s = 0; s <= 23; s++) {
                const d = _adpOraDiStep(s);
                if (!d) break;
                const notte = SunCalc.getPosition(d, latCorrente, lonCorrente).altitude * (180 / Math.PI) < -6;
                if (notte && s0 < 0) s0 = s;
                if (notte && s0 >= 0) s1 = s;
                if (!notte && s0 >= 0) break;
            }
            return (s0 < 0 || s1 <= s0) ? null : { da: s0, a: s1 };
        }
        // Giro automatico: un solo passaggio notturno, poi torna su "Adesso"
        function _adpGiroNotturno() {
            const n = _adpOreNotturne();
            return n ? _adpAvvia(true, n.da, n.a) : false;
        }

        // Interazione manuale con la barra → ferma il play (l'utente ha la precedenza)
        (function() {
            const sl = document.getElementById('timeSlider');
            if (!sl) return;
            ['pointerdown', 'touchstart', 'keydown'].forEach(ev =>
                sl.addEventListener(ev, () => { if (_adpPlay.attivo) adpStopPlay(false); }, { passive: true }));
            _adpIconaPlay();
        })();

        // Avvio automatico: una sola volta per apertura dell'app, quando la mappa è visibile
        (function() {
            const mapEl = document.getElementById('map');
            if (!mapEl || !('IntersectionObserver' in window)) return;
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            let fatto = false, tentativi = 0, visibile = false;
            function prova() {
                if (fatto) return;
                if (_adpPlay.esterno) { fatto = true; io.disconnect(); return; }   // l'ora l'ha già scelta qualcun altro
                if (!visibile) return;
                if (_adpPopupAperto()) { setTimeout(prova, 500); return; }        // aspetta la chiusura del night popup
                const sl = document.getElementById('timeSlider');
                if (datiMeteo && sl && !sl.disabled) {
                    fatto = true; io.disconnect();
                    setTimeout(() => {
                        if (!_adpPlay.attivo && !_adpPlay.esterno && !_adpPopupAperto()) _adpGiroNotturno();
                    }, 600);
                } else if (++tentativi < 60) {
                    setTimeout(prova, 500);
                }
            }
            const io = new IntersectionObserver(entries => {
                visibile = entries.some(e => e.isIntersecting);
                if (visibile) prova();
            }, { threshold: 0.4 });
            io.observe(mapEl);
        })();

        // ── Avviso data futura + striscia in alto ──
        function _adpAggiornaAvviso() {
            const oggi = isSessionDateToday();
            const sel = getSessionDate();
            const t0 = new Date(); t0.setHours(0, 0, 0, 0);
            const s0 = new Date(sel); s0.setHours(0, 0, 0, 0);
            const conMeteo = Math.round((s0 - t0) / 86400000) <= 2;
            const stato = oggi ? '' : (conMeteo ? 'adp-fut' : 'adp-na');
            const corta = sel.toLocaleDateString(_adpLocale(), { weekday:'short', day:'numeric', month:'short' }).toUpperCase();
            const lunga = sel.toLocaleDateString(_adpLocale(), { weekday:'short', day:'numeric', month:'short', year:'numeric' }).toUpperCase();

            const fr = document.getElementById('adp-future-frame');
            const bn = document.getElementById('adp-future-banner');
            const tab = document.getElementById('adp-date-tab');
            const box = document.querySelector('.ephemeris-box');
            [fr, bn, tab, box].forEach(el => { if (el) el.classList.remove('adp-fut', 'adp-na'); });
            if (stato) [fr, bn, tab, box].forEach(el => { if (el) el.classList.add(stato); });

            if (bn) bn.innerHTML = !stato ? '' : (stato === 'adp-fut'
                ? `<span>🔮 ${_adpT('fut')} · ${corta}</span>`
                : `<span>⚠ ${_adpT('na')} · ${corta} · ${_adpT('astro')}</span>`);
            if (tab) tab.innerHTML = oggi ? `📅 ${lunga} <small>· ${_adpT('today')}</small>`
                : (conMeteo ? `🔮 ${lunga} <small>· ${_adpT('futS')}</small>` : `⚠ ${lunga} <small>· ${_adpT('naS')}</small>`);

            // Striscia: con data futura mostra il meteo di quella sera alle 22:00
            const quando = document.getElementById('adp-wx-when');
            if (oggi) { if (quando) quando.textContent = ''; return; }   // oggi: lo gestisce cambiaOraMeteo()
            const ic = document.getElementById('current-weather-icon');
            const ds = document.getElementById('current-weather-desc');
            if (quando) quando.textContent = _adpT('eve');
            const d22 = new Date(sel); d22.setHours(22, 0, 0, 0);
            const i = (conMeteo && datiMeteo && datiMeteo.time)
                ? datiMeteo.time.findIndex(x => Math.abs(parseMeteoTime(x).getTime() - d22.getTime()) < 1800000) : -1;
            if (i < 0) { if (ic) ic.innerText = '—'; if (ds) ds.innerText = _adpT('nd'); return; }
            const maxC = Math.max(datiMeteo.cloud_cover_low[i], datiMeteo.cloud_cover_mid[i], datiMeteo.cloud_cover_high[i]);
            const altS = SunCalc.getPosition(d22, latCorrente, lonCorrente).altitude * (180 / Math.PI);
            let icM = '☁️', dsM = 'overcast';   // stesse soglie di cambiaOraMeteo()
            if (maxC < 15) { icM = '☀️'; dsM = 'clear'; } else if (maxC < 40) { icM = '🌤️'; dsM = 'partly_cloudy'; } else if (maxC < 75) { icM = '⛅'; dsM = 'mostly_cloudy'; }
            if (altS < -6) { if (maxC < 15) icM = '✨'; else if (maxC < 40) icM = '🌙'; }
            if (ic) ic.innerText = icM;
            if (ds) ds.innerText = t(dsM);
        }

        document.addEventListener('sessionDateChanged', function() {
            if (_adpPlay.attivo) adpStopPlay(false);
            setTimeout(() => { _adpAggiornaAvviso(); _adpNotti(); }, 0);   // dopo l'handler esistente (che chiama cambiaOraMeteo)
        });
        // Ricalcola anche quando arrivano/cambiano i dati meteo (val-basse è riscritto da cambiaOraMeteo)
        (function() {
            const vb = document.getElementById('val-basse');
            let timer = null;
            if (vb && 'MutationObserver' in window) {
                new MutationObserver(() => {
                    if (_adpPlay.attivo) return;
                    clearTimeout(timer); timer = setTimeout(() => { _adpAggiornaAvviso(); _adpControllaGriglia(); _adpNotti(); }, 150);
                }).observe(vb, { childList: true, characterData: true, subtree: true });
            }
            document.addEventListener('DOMContentLoaded', () => setTimeout(_adpAggiornaAvviso, 800));
        })();


        // ══════════════════════════════════════════════════════════════
        // ── M1d (03/11/2026): nubi sul territorio, pannello a tendina ──
        //  · Griglia 9×9 entro ±25 km scaricata da Open-Meteo in UNA richiesta
        //    (nubi basse/medie/alte, stessi orari dei dati principali).
        //  · _adpDisegnaNubi(): mappa realistica ritagliata sul cerchio di
        //    25 km, un'immagine per livello nel gruppo Leaflet del livello
        //    (accendi/spegni invariati). Senza griglia: disco uniforme col
        //    valore del punto (ripiego).
        //  · Cerchio tratteggiato "25 km"; inquadratura a zoom 9 all'apertura.
        //  · Inq. Luminoso acceso → play fermo e disattivato, pannello nascosto.
        //  · Pannello livelli richiudibile; stato ricordato (aperto su PC,
        //    chiuso su smartphone la prima volta).
        // ══════════════════════════════════════════════════════════════
        const _ADP_R_KM = 25, _ADP_N = 9, _ADP_PX = 128;
        const _ADP_TONO = { basse:[235,238,242,0.85], medie:[170,178,190,0.70], alte:[205,220,255,0.45] };
        let _adpGriglia = null;            // { lat, lon, t0, n, basse:[Float32Array(81)…], medie, alte }
        let _adpGrigliaStato = { chiave:'', inCorso:false, errore:0 };
        const _adpOverlay = {};             // L.imageOverlay per livello
        const _adpCanvas = document.createElement('canvas');
        _adpCanvas.width = _adpCanvas.height = _ADP_PX;

        function _adpBounds(lat, lon) {
            const dLat = _ADP_R_KM / 111.32, dLon = _ADP_R_KM / (111.32 * Math.cos(lat * Math.PI / 180));
            return L.latLngBounds([lat - dLat, lon - dLon], [lat + dLat, lon + dLon]);
        }

        // ── Griglia: scarica se manca o se luogo/dati sono cambiati ──
        function _adpControllaGriglia() {
            if (!datiMeteo || !datiMeteo.time || !datiMeteo.time.length) return;
            const chiave = latCorrente.toFixed(4) + ',' + lonCorrente.toFixed(4) + ',' + datiMeteo.time[0] + ',' + datiMeteo.time.length;
            if (_adpGrigliaStato.chiave === chiave && (_adpGriglia || _adpGrigliaStato.inCorso)) return;
            if (_adpGrigliaStato.chiave === chiave && Date.now() - _adpGrigliaStato.errore < 600000) return;   // dopo un errore riprova tra 10 min
            _adpGrigliaStato = { chiave, inCorso:true, errore:0 };
            const lat0 = latCorrente, lon0 = lonCorrente, t0 = datiMeteo.time[0], n0 = datiMeteo.time.length;
            const dLat = _ADP_R_KM / 111.32, dLon = _ADP_R_KM / (111.32 * Math.cos(lat0 * Math.PI / 180));
            const lats = [], lons = [];
            for (let j = 0; j < _ADP_N; j++) for (let i = 0; i < _ADP_N; i++) {      // riga 0 = nord, colonna 0 = ovest
                lats.push((lat0 + dLat - 2 * dLat * j / (_ADP_N - 1)).toFixed(4));
                lons.push((lon0 - dLon + 2 * dLon * i / (_ADP_N - 1)).toFixed(4));
            }
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats.join(',')}&longitude=${lons.join(',')}&hourly=cloud_cover_low,cloud_cover_mid,cloud_cover_high&forecast_days=3&timezone=auto`)
                .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
                .then(dati => {
                    if (!Array.isArray(dati) || dati.length !== _ADP_N * _ADP_N) throw new Error('griglia incompleta');
                    const h0 = dati[0].hourly;
                    if (!h0 || h0.time[0] !== t0 || h0.time.length !== n0) throw new Error('orari diversi dai dati principali');
                    if (latCorrente !== lat0 || lonCorrente !== lon0) throw new Error('luogo cambiato');
                    const g = { lat:lat0, lon:lon0, basse:[], medie:[], alte:[] };
                    const k = { basse:'cloud_cover_low', medie:'cloud_cover_mid', alte:'cloud_cover_high' };
                    for (let t = 0; t < n0; t++) Object.keys(k).forEach(n => {
                        const v = new Float32Array(_ADP_N * _ADP_N);
                        for (let p = 0; p < v.length; p++) { const x = dati[p].hourly[k[n]][t]; v[p] = (x == null ? NaN : x); }
                        g[n].push(v);
                    });
                    _adpGriglia = g; _adpGrigliaStato.inCorso = false;
                    if (!_adpPlay.attivo && typeof cambiaOraMeteo === 'function') cambiaOraMeteo();
                })
                .catch(err => {
                    console.warn('[ADP] griglia nubi non disponibile, uso il valore puntuale:', err.message || err);
                    _adpGriglia = null; _adpGrigliaStato.inCorso = false; _adpGrigliaStato.errore = Date.now();
                });
        }

        // ── Disegno di un livello: idx = ora nei dati; v = valore puntuale (ripiego);
        //    idx2/f facoltativi = sfumatura verso l'ora successiva durante il play ──
        function _adpDisegnaNubi(n, idx, v, idx2, f) {
            if (!layers || !layers[n]) return;
            const g = (_adpGriglia && _adpGriglia.lat === latCorrente && _adpGriglia.lon === lonCorrente
                       && idx >= 0 && _adpGriglia[n][idx]) ? _adpGriglia[n] : null;
            const A = g ? g[idx] : null;
            const B = (g && idx2 != null && idx2 >= 0 && g[idx2]) ? g[idx2] : null;
            const ff = B ? f : 0;
            const val = (p) => { let a = A[p]; if (isNaN(a)) a = v; if (!B) return a; let b = B[p]; if (isNaN(b)) b = a; return a + (b - a) * ff; };
            const ctx = _adpCanvas.getContext('2d'), img = ctx.createImageData(_ADP_PX, _ADP_PX), d = img.data;
            const c = _ADP_TONO[n], N1 = _ADP_N - 1, R = _ADP_PX / 2;
            for (let y = 0; y < _ADP_PX; y++) for (let x = 0; x < _ADP_PX; x++) {
                const dx = (x + 0.5 - R) / R, dy = (y + 0.5 - R) / R, dd = Math.hypot(dx, dy);
                if (dd > 1) continue;
                let cop;
                if (A) {
                    const gx = (x + 0.5) / _ADP_PX * N1, gy = (y + 0.5) / _ADP_PX * N1;
                    const i = Math.min(N1 - 1, Math.floor(gx)), j = Math.min(N1 - 1, Math.floor(gy)), fx = gx - i, fy = gy - j;
                    const p = j * _ADP_N + i;
                    cop = val(p) * (1 - fx) * (1 - fy) + val(p + 1) * fx * (1 - fy) + val(p + _ADP_N) * (1 - fx) * fy + val(p + _ADP_N + 1) * fx * fy;
                } else cop = v;
                const bordo = Math.min(1, (1 - dd) * 14);
                const a = Math.max(0, Math.min(1, (cop / 100 - 0.08) * 1.25)) * c[3] * bordo;
                const k = (y * _ADP_PX + x) * 4;
                d[k] = c[0]; d[k + 1] = c[1]; d[k + 2] = c[2]; d[k + 3] = Math.round(a * 255);
            }
            ctx.putImageData(img, 0, 0);
            const url = _adpCanvas.toDataURL();
            const b = _adpBounds(latCorrente, lonCorrente);
            if (!_adpOverlay[n]) _adpOverlay[n] = L.imageOverlay(url, b, { interactive: false, className: 'adp-nubi' });
            else { _adpOverlay[n].setUrl(url); _adpOverlay[n].setBounds(b); }
            if (!layers[n].hasLayer(_adpOverlay[n])) layers[n].addLayer(_adpOverlay[n]);   // cambiaOraMeteo svuota i gruppi a ogni ora
            _adpCerchio();
        }

        // ── Cerchio tratteggiato "25 km" (il tuo cielo) ──
        let _adpCerchioL = null, _adpCerchioLbl = null;
        function _adpCerchio() {
            const c = [latCorrente, lonCorrente];
            if (!_adpCerchioL) {
                _adpCerchioL = L.circle(c, { radius: _ADP_R_KM * 1000, color: '#f2c94c', weight: 1.4, opacity: 0.75, dashArray: '6, 5', fill: false, interactive: false });
                _adpCerchioLbl = L.marker(c, { interactive: false, keyboard: false,
                    icon: L.divIcon({ className: 'adp-25km', html: _ADP_R_KM + ' km', iconSize: [40, 14], iconAnchor: [0, 7] }) });
            }
            _adpCerchioL.setLatLng(c);
            _adpCerchioLbl.setLatLng(_offsetLatLon(latCorrente, lonCorrente, _ADP_R_KM * 1000 * 1.02, 45));
            const mostra = !lpActive;
            [_adpCerchioL, _adpCerchioLbl].forEach(l => {
                if (mostra && !map.hasLayer(l)) l.addTo(map);
                if (!mostra && map.hasLayer(l)) map.removeLayer(l);
            });
        }

        // ── Inquinamento Luminoso: ferma e disattiva il play, nasconde il pannello livelli ──
        function _adpStatoLP() {
            const lay = document.querySelector('.adp-layers');
            const pb = document.getElementById('adp-play');
            if (lpActive && _adpPlay.attivo) adpStopPlay(false);
            if (lay) lay.classList.toggle('adp-lp-on', lpActive);
            if (pb) pb.disabled = lpActive;
            if (_adpCerchioL) _adpCerchio();
        }
        const _adpLPOriginale = toggleLayerLP;
        toggleLayerLP = function() { const r = _adpLPOriginale.apply(this, arguments); _adpStatoLP(); return r; };
        const _adpLayerOriginale = toggleLayer;   // accendere un livello meteo spegne LP (logica originale)
        toggleLayer = function() { const r = _adpLayerOriginale.apply(this, arguments); _adpStatoLP(); return r; };
        const _adpAvviaPrima = _adpAvvia;
        _adpAvvia = function(auto, da, a) { return lpActive ? false : _adpAvviaPrima(auto, da, a); };

        // ── Pannello livelli a tendina ──
        (function() {
            const lay = document.querySelector('.adp-layers');
            const h = lay && lay.querySelector('h3');
            if (!lay || !h) return;
            let aperto;
            try { const s = localStorage.getItem('ad_layers_open'); aperto = s === null ? window.innerWidth > 768 : s === '1'; }
            catch (e) { aperto = window.innerWidth > 768; }
            lay.classList.toggle('adp-closed', !aperto);
            h.addEventListener('click', e => {
                if (e.target.closest('.info-icon')) return;           // il tooltip info resta indipendente
                const chiudi = !lay.classList.contains('adp-closed');
                lay.classList.toggle('adp-closed', chiudi);
                try { localStorage.setItem('ad_layers_open', chiudi ? '0' : '1'); } catch (er) {}
            });
            if (L.DomEvent) { L.DomEvent.disableClickPropagation(lay); L.DomEvent.disableScrollPropagation(lay); }
            _adpStatoLP();
        })();

        // ── Inquadratura all'apertura: centrata sulla posizione, zoom 9 (cerchio di 25 km) ──
        try { map.setView([latCorrente, lonCorrente], 9, { animate: false }); } catch (e) {}

        // ══════════════════════════════════════════════════════════════
        // ── M1e (03/11/2026): "Le prossime notti" sotto il Bortle ──────
        // Tre schede (oggi, +1, +2) con il meteo previsto alle 22:00 dai
        // dati già scaricati (nessuna richiesta in più). Clic = scelta
        // della data con le funzioni esistenti (resetSessionDateToday /
        // onSessionDateChange). Il calendario resta per le altre date.
        // ══════════════════════════════════════════════════════════════
        function _adpIsoLocale(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
        function _adpMeteoAlle(d) {   // meteo previsto all'ora d: stesse soglie e icone di cambiaOraMeteo()
            if (!datiMeteo || !datiMeteo.time) return null;
            const i = datiMeteo.time.findIndex(x => Math.abs(parseMeteoTime(x).getTime() - d.getTime()) < 1800000);
            if (i < 0) return null;
            const maxC = Math.max(datiMeteo.cloud_cover_low[i], datiMeteo.cloud_cover_mid[i], datiMeteo.cloud_cover_high[i]);
            const altS = SunCalc.getPosition(d, latCorrente, lonCorrente).altitude * (180 / Math.PI);
            let ic = '☁️', ds = 'overcast';
            if (maxC < 15) { ic = '☀️'; ds = 'clear'; } else if (maxC < 40) { ic = '🌤️'; ds = 'partly_cloudy'; } else if (maxC < 75) { ic = '⛅'; ds = 'mostly_cloudy'; }
            if (altS < -6) { if (maxC < 15) ic = '✨'; else if (maxC < 40) ic = '🌙'; }
            return { ic, ds, maxC };
        }
        function _adpNotti() {
            const box = document.getElementById('adp-notti-list');
            const tit = document.getElementById('adp-notti-title');
            if (!box) return;
            if (tit) tit.textContent = '📅 ' + _adpT('notti');
            const oggi = new Date(); oggi.setHours(12, 0, 0, 0);
            const sel = _adpIsoLocale(getSessionDate());
            let html = '';
            for (let k = 0; k < 3; k++) {
                const d = new Date(oggi.getTime() + k * 86400000);
                const iso = _adpIsoLocale(d);
                const d22 = new Date(d); d22.setHours(22, 0, 0, 0);
                const m = _adpMeteoAlle(d22);
                const nome = k === 0 ? _adpT('oggiC') : d.toLocaleDateString(_adpLocale(), { weekday: 'short' });
                const data = d.toLocaleDateString(_adpLocale(), { day: 'numeric', month: 'short' });
                const on = iso === sel;
                html += `<button type="button" class="adp-notte${on ? ' on' : ''}" data-iso="${iso}" data-oggi="${k === 0 ? 1 : 0}">
                    <span class="adp-notte-g">${nome}<small>${data}</small></span>
                    <span class="adp-notte-ic">${m ? m.ic : '—'}</span>
                    <span class="adp-notte-t"><b>${m ? t(m.ds) : _adpT('nd')}</b> · 22:00
                        <span class="adp-notte-bar"><i style="width:${m ? Math.round(m.maxC) : 0}%"></i></span></span>
                    ${on ? `<span class="adp-notte-tag">${_adpT('scelta')}</span>` : ''}
                </button>`;
            }
            box.innerHTML = html;
        }
        (function() {
            const box = document.getElementById('adp-notti-list');
            if (!box) return;
            box.addEventListener('click', e => {
                const b = e.target.closest('.adp-notte');
                if (!b) return;
                if (b.dataset.oggi === '1' && typeof resetSessionDateToday === 'function') resetSessionDateToday();
                else if (typeof onSessionDateChange === 'function') onSessionDateChange(b.dataset.iso);
            });
            _adpNotti();
        })();


        // ══════════════════════════════════════════════════════════════
        // ── M3/M3b (03/11/2026): slider DSO solo con oggetti visibili ──
        // Lo slider del Planetario (astroSlider) è limitato ai passi con il
        // Sole sotto −6° (stessa soglia con cui il Planetario mostra gli
        // oggetti). Sfumatura continua calcolata sull'altezza del Sole
        // (blu crepuscolo → blu notte → blu-violetto verso l'alba), tacche
        // della notte astronomica (−18°), etichette inizio/mezzanotte/fine
        // e pulsante ▶ (1 s/ora, loop, solo manuale). Lo slider meteo
        // resta sulle 24 ore. Senza notte: 24 ore come prima.
        // ══════════════════════════════════════════════════════════════
        const _ADP_ASTRO_TXT = { it:'notte astronomica', en:'astronomical night', es:'noche astronómica', zh:'天文夜' };
        function _adpOraPasso(s) {             // stessa scala oraria di cambiaOraAstro()
            let d = (isSessionDateToday() && (!datiMeteo || !datiMeteo.time || !datiMeteo.time[indicePartenza + s])) ? null : _adpOraDiStep(s);
            if (!d) { d = getSessionDate(); d.setHours(18, 0, 0, 0); d = new Date(d.getTime() + s * 3600000); }
            return d;
        }
        const _adpAltSole = d => SunCalc.getPosition(d, latCorrente, lonCorrente).altitude * 180 / Math.PI;
        function _adpColoreNotte(alt, frac) {   // frac 0 = sera, 1 = mattina
            const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * Math.max(0, Math.min(1, t))));
            const twi = mix([62, 104, 170], [110, 80, 170], frac), astro = [30, 42, 92], buio = [16, 20, 48];
            const c = alt >= -6 ? twi : alt >= -18 ? mix(twi, astro, (-6 - alt) / 12) : mix(astro, buio, (-18 - alt) / 30);
            return `rgb(${c.join(',')})`;
        }
        const _adpHHMM = d => d.toLocaleTimeString(_adpLocale(), { hour: '2-digit', minute: '2-digit' });

        function _adpAstroNotte() {
            const sl = document.getElementById('astroSlider');
            const gr = document.getElementById('astro-gradient');
            if (!sl || typeof SunCalc === 'undefined' || _adpAstroPlay.attivo) return;
            const vis = [];
            for (let s = 0; s <= 23; s++) vis.push(_adpAltSole(_adpOraPasso(s)) < -6);
            let s0 = vis.indexOf(true), s1 = s0;
            while (s0 >= 0 && s1 < 23 && vis[s1 + 1]) s1++;
            const prima = sl.value;
            const extra = document.getElementById('adp-astro-extra');
            if (s0 < 0 || s1 <= s0) { sl.min = 0; sl.max = 23; if (extra) extra.style.display = 'none'; return; }   // nessuna notte: 24 ore
            sl.min = s0; sl.max = s1;
            const t0 = _adpOraPasso(s0).getTime(), t1 = _adpOraPasso(s1).getTime();
            if (gr) {
                const stops = [];
                for (let k = 0; k <= 48; k++) { const f = k / 48; stops.push(`${_adpColoreNotte(_adpAltSole(new Date(t0 + (t1 - t0) * f)), f)} ${(f * 100).toFixed(1)}%`); }
                gr.style.background = `linear-gradient(to right, ${stops.join(', ')})`;
            }
            // tacche della notte astronomica + etichette inizio / metà / fine
            if (extra) {
                extra.style.display = '';
                const pct = t => ((t - t0) / (t1 - t0) * 100);
                const mid = new Date((t0 + t1) / 2);
                const sera = SunCalc.getTimes(new Date(t0), latCorrente, lonCorrente).night;
                const matt = SunCalc.getTimes(new Date(t1), latCorrente, lonCorrente).nightEnd;
                const lab = _ADP_ASTRO_TXT[(typeof lang !== 'undefined' && _ADP_ASTRO_TXT[lang]) ? lang : 'it'];
                let h = '';
                if (sera && !isNaN(sera) && pct(sera) > 0 && pct(sera) < 100) h += `<span class="adp-astro-mk" style="left:${pct(sera).toFixed(1)}%">${_adpHHMM(sera)} ${lab}</span>`;
                if (matt && !isNaN(matt) && pct(matt) > 0 && pct(matt) < 100) h += `<span class="adp-astro-mk adp-dx" style="left:${pct(matt).toFixed(1)}%">${_adpHHMM(matt)}</span>`;
                extra.querySelector('.adp-astro-mks').innerHTML = h;
                extra.querySelector('.adp-astro-lbl').innerHTML = `<span>${_adpHHMM(new Date(t0))}</span><span>${_adpHHMM(mid)}</span><span>${_adpHHMM(new Date(t1))}</span>`;
            }
            if (sl.value !== prima && typeof cambiaOraAstro === 'function') cambiaOraAstro();   // valore riportato dentro la notte
        }

        // ── Play dello slider DSO (solo manuale) ──
        const _ADP_MS_ORA_DSO = 1000;   // play della sezione DSO: 1 s per ora
        const _adpAstroPlay = { attivo: false, pos: 0, ultima: -1, raf: null, t0: 0 };
        function _adpAstroIcona() {
            const b = document.getElementById('adp-astro-play'); if (!b) return;
            b.innerHTML = _adpAstroPlay.attivo
                ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
                : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>';
            b.title = _adpT(_adpAstroPlay.attivo ? 'pause' : 'play'); b.setAttribute('aria-label', b.title);
        }
        function _adpAstroFrame(ts) {
            if (!_adpAstroPlay.attivo) return;
            const sl = document.getElementById('astroSlider');
            const mn = parseFloat(sl.min), mx = parseFloat(sl.max);
            if (document.body.getAttribute('data-adp-sez') !== 'dso') { adpAstroStop(); return; }   // uscito dalla sezione DSO
            if (_adpAstroPlay.t0) _adpAstroPlay.pos += (ts - _adpAstroPlay.t0) / _ADP_MS_ORA_DSO;
            _adpAstroPlay.t0 = ts;
            if (_adpAstroPlay.pos > mx) { _adpAstroPlay.pos = mn; _adpAstroPlay.ultima = -1; }
            const h = Math.floor(_adpAstroPlay.pos);
            if (h !== _adpAstroPlay.ultima) { _adpAstroPlay.ultima = h; _adpSync(h); }
            sl.value = _adpAstroPlay.pos;                              // cursore continuo
            _adpAstroPlay.raf = requestAnimationFrame(_adpAstroFrame);
        }
        function adpAstroStop() {
            if (!_adpAstroPlay.attivo) return;
            _adpAstroPlay.attivo = false; cancelAnimationFrame(_adpAstroPlay.raf);
            const sl = document.getElementById('astroSlider');
            if (sl) { sl.step = '1'; _adpSync(Math.max(parseInt(sl.min), Math.min(parseInt(sl.max), Math.round(_adpAstroPlay.pos)))); }
            _adpAstroIcona();
        }
        function adpAstroTogglePlay() {
            if (_adpAstroPlay.attivo) { adpAstroStop(); return; }
            const sl = document.getElementById('astroSlider');
            if (!sl || sl.disabled) return;
            if (_adpPlay.attivo) adpStopPlay(false);                   // un solo play alla volta
            const mn = parseFloat(sl.min), mx = parseFloat(sl.max), cur = parseFloat(sl.value);
            Object.assign(_adpAstroPlay, { attivo: true, pos: (cur >= mx ? mn : cur), ultima: -1, t0: 0 });
            sl.step = 'any';
            _adpAstroIcona();
            _adpAstroPlay.raf = requestAnimationFrame(_adpAstroFrame);
        }
        // anche il play meteo ferma quello DSO
        const _adpAvviaM3 = _adpAvvia;
        _adpAvvia = function() { if (_adpAstroPlay.attivo) adpAstroStop(); return _adpAvviaM3.apply(this, arguments); };
        // chiamate esterne a syncSliders (trascinamento, night popup) fermano il play DSO
        const _adpSyncM3 = syncSliders;
        syncSliders = function() { if (!_adpInterno && _adpAstroPlay.attivo) { _adpAstroPlay.attivo = false; cancelAnimationFrame(_adpAstroPlay.raf);
            const sl = document.getElementById('astroSlider'); if (sl) sl.step = '1'; _adpAstroIcona(); } return _adpSyncM3.apply(this, arguments); };

        // ── Pulsante ▶, tacche ed etichette attorno allo slider DSO (creati qui) ──
        (function() {
            const sl = document.getElementById('astroSlider');
            const rw = sl && sl.closest('.range-wrapper');
            if (!rw) return;
            const riga = document.createElement('div'); riga.className = 'adp-time-row adp-astro-row';
            const b = document.createElement('button'); b.type = 'button'; b.id = 'adp-astro-play'; b.className = 'adp-play';
            b.addEventListener('click', adpAstroTogglePlay);
            rw.parentNode.insertBefore(riga, rw); riga.appendChild(b); riga.appendChild(rw);
            const extra = document.createElement('div'); extra.id = 'adp-astro-extra'; extra.className = 'adp-astro-extra';
            extra.innerHTML = '<div class="adp-astro-mks"></div><div class="adp-astro-lbl"></div>';
            riga.after(extra);
            ['pointerdown', 'touchstart', 'keydown'].forEach(ev => sl.addEventListener(ev, () => { if (_adpAstroPlay.attivo) adpAstroStop(); }, { passive: true }));
            _adpAstroIcona();
        })();

        const _adpGradOrig = applicaGradienteGiornoNotte;
        applicaGradienteGiornoNotte = function() { const r = _adpGradOrig.apply(this, arguments); _adpAstroNotte(); return r; };
        // Cambio data: lo slider DSO riparte dall'inizio della notte (l'handler esistente lo azzera a 0)
        document.addEventListener('sessionDateChanged', function() {
            if (_adpAstroPlay.attivo) adpAstroStop();
            setTimeout(() => {
                _adpAstroNotte();
                const sl = document.getElementById('astroSlider');
                if (sl && sl.value !== sl.min) { sl.value = sl.min; if (typeof cambiaOraAstro === 'function') cambiaOraAstro(); }
            }, 0);
        });
        (function() {   // aggiornamento anche al passare delle ore, all'arrivo dei dati e al cambio lingua
            const vb = document.getElementById('val-basse');
            let tm = null;
            if (vb && 'MutationObserver' in window) new MutationObserver(() => {
                if (_adpPlay.attivo || _adpAstroPlay.attivo) return;
                clearTimeout(tm); tm = setTimeout(_adpAstroNotte, 200);
            }).observe(vb, { childList: true, characterData: true, subtree: true });
        })();

        // ============================================================
        // ADP 9.0 — M4: sostituzione sfumata delle card del Planetario
        // Le caselle restano ferme: le card nuove sono già al loro posto,
        // quelle vecchie ci svaniscono sopra in 0,7 s. Le caselle in più
        // compaiono in dissolvenza. Altezza: valore immediato.
        // ============================================================
        (function () {
            const LISTE = ['planets-list', 'dso-list'];
            const DUR = 700;
            const fermo = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            function fotografa() {                    // card visibili prima dell'aggiornamento, con posizione e opacità
                const out = {};
                LISTE.forEach(id => {
                    const l = document.getElementById(id);
                    if (!l || !l.offsetParent) return;   // sezione non visibile: niente animazione
                    const lr = l.getBoundingClientRect();
                    const carte = Array.from(l.querySelectorAll(':scope > .dso-card:not(.adp-sfuma)')).map(c => ({
                        el: c, r: c.getBoundingClientRect(), op: parseFloat(getComputedStyle(c).opacity) || 1
                    }));
                    out[id] = { lr, sx: l.scrollLeft, carte };
                });
                return out;
            }

            function sfuma(prima) {
                LISTE.forEach(id => {
                    const p = prima[id], l = document.getElementById(id);
                    if (!p || !l || !p.carte.length) return;
                    const nuove = l.querySelectorAll(':scope > .dso-card');
                    nuove.forEach((c, i) => {                 // caselle che prima erano vuote: dissolvenza in entrata
                        if (i >= p.carte.length) c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DUR, easing: 'ease-in-out' });
                    });
                    if (getComputedStyle(l).position === 'static') l.style.position = 'relative';
                    const lr = l.getBoundingClientRect();
                    p.carte.forEach(v => {                    // card vecchia ricollocata sopra la nuova e sfumata
                        const g = v.el;
                        g.getAnimations().forEach(a => a.cancel());
                        g.classList.add('adp-sfuma'); g.removeAttribute('data-dso-id'); g.setAttribute('aria-hidden', 'true');
                        g.style.cssText += `;position:absolute;left:${v.r.left - lr.left - l.clientLeft + l.scrollLeft}px;top:${v.r.top - lr.top - l.clientTop}px;` +
                                           `width:${v.r.width}px;height:${v.r.height}px;box-sizing:border-box;margin:0;pointer-events:none;z-index:2;`;
                        l.appendChild(g);
                        g.animate([{ opacity: v.op }, { opacity: 0 }], { duration: DUR, easing: 'ease-in-out', fill: 'forwards' })
                         .onfinish = () => g.remove();
                    });
                });
            }

            function avvolgi() {
                if (typeof cambiaOraAstro !== 'function' || cambiaOraAstro._adpM4) return;
                const orig = cambiaOraAstro;
                const nuova = function () {
                    if (fermo()) return orig.apply(this, arguments);
                    const prima = fotografa();
                    const r = orig.apply(this, arguments);
                    try { sfuma(prima); } catch (e) { console.warn('ADP M4', e); }
                    return r;
                };
                nuova._adpM4 = true;
                window.cambiaOraAstro = nuova;
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvolgi); else avvolgi();
        })();

        // ============================================================
        // ADP 9.0 — M5: il riquadro Seeing esce dal pannello Dati Ambientali
        // e va in basso al centro della mappa, su una riga (PC e smartphone).
        // ============================================================
        (function () {
            function sposta() {
                const b = document.getElementById('btn-seeing');
                const wrap = document.querySelector('.adp-map-wrap');
                if (!b || !wrap) return;
                if (b.parentElement !== wrap) wrap.appendChild(b);
                b.classList.add('adp-see-pill');
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sposta); else sposta();
        })();

        // ============================================================
        // ADP 9.0 — M6 (smartphone): Bortle e pulsante Inquinamento Luminoso
        // in un riquadro sotto la mappa; all'accensione dell'Inq. Luminoso
        // la pagina scorre per mostrare la mappa intera. Su PC: invariato.
        // ============================================================
        (function () {
            const mq = window.matchMedia('(max-width: 768px)');
            let box = null;
            function pezzi() {
                const sel = document.getElementById('bortle-class');
                return { bortle: sel && sel.closest('.input-group'), lp: document.querySelector('.adp-lp-slot'),
                         notti: document.querySelector('.adp-meteo .adp-notti'), mappa: document.querySelector('.adp-meteo .adp-meteo-map') };
            }
            function sposta() {
                const p = pezzi();
                if (!p.bortle || !p.lp || !p.notti || !p.mappa) return;
                if (mq.matches) {
                    if (!box) { box = document.createElement('div'); box.className = 'panel adp-lp-panel'; }
                    if (box.previousElementSibling !== p.mappa) p.mappa.after(box);
                    if (p.bortle.parentElement !== box) { box.appendChild(p.bortle); box.appendChild(p.lp); }
                } else if (box && p.bortle.parentElement === box) {
                    p.notti.before(p.bortle); p.notti.before(p.lp); box.remove();
                }
            }
            function vaiAllaMappa() {
                setTimeout(() => {
                    if (!mq.matches || typeof lpActive === 'undefined' || !lpActive) return;
                    const w = document.querySelector('.adp-map-wrap'), nav = document.getElementById('top-nav');
                    if (!w) return;
                    const y = w.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0) - 8;
                    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
                }, 60);
            }
            function avvia() {
                sposta();
                if (mq.addEventListener) mq.addEventListener('change', sposta); else if (mq.addListener) mq.addListener(sposta);
                const b = document.getElementById('btn-lp');
                if (b) b.addEventListener('click', vaiAllaMappa);     // solo al tocco: non al ripristino all'avvio
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
        })();

        // ============================================================
        // ADP 9.0 — S5 (smartphone): grafico dell'altezza più alto e pulito,
        // con le fasce della notte (crepuscolo / notte astronomica) e la linea "ora".
        // Su PC: stesse fasce e linea "ora"; etichette, legenda e punti restano come prima.
        // ============================================================
        (function () {
            const mq = window.matchMedia('(max-width: 768px)');
            const passi = 72;                                   // fasce da 10 minuti sulle 12 ore
            function inizio() { const d = getSessionDate(); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 0, 0); }
            const notte = {
                id: 'adpNotte',
                beforeDatasetsDraw(c) {
                    if (c.canvas.id !== 'altitudeChart' || typeof SunCalc === 'undefined') return;     // fasce su smartphone e PC
                    const a = c.chartArea, x = c.scales.x, ctx = c.ctx, t0 = inizio().getTime();
                    if (!a || !x) return;
                    ctx.save();
                    for (let k = 0; k < passi; k++) {
                        const i0 = k * 12 / passi, i1 = (k + 1) * 12 / passi;
                        const alt = SunCalc.getPosition(new Date(t0 + (i0 + i1) / 2 * 3600000), latCorrente, lonCorrente).altitude * 180 / Math.PI;
                        ctx.fillStyle = alt > -6 ? 'rgba(110,140,200,0.20)' : alt > -18 ? 'rgba(62,104,170,0.16)' : 'rgba(8,12,36,0.55)';
                        const p0 = Math.round(x.getPixelForValue(i0)), p1 = Math.round(x.getPixelForValue(i1));
                        ctx.fillRect(p0, a.top, p1 - p0, a.bottom - a.top);      // pixel interi: niente righe tra le fasce
                    }
                    if (typeof isSessionDateToday === 'function' && isSessionDateToday()) {
                        const ore = (Date.now() - t0) / 3600000;
                        if (ore >= 0 && ore <= 12) {
                            const px = x.getPixelForValue(ore);
                            ctx.strokeStyle = '#f2c94c'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(px, a.top); ctx.lineTo(px, a.bottom); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
            };
            function ritocca() {
                if (!mq.matches || typeof chartAltezza === 'undefined' || !chartAltezza) return;
                const o = chartAltezza.options, lb = chartAltezza.data.labels;
                o.scales.x.ticks.autoSkip = false;
                o.scales.x.ticks.callback = (v, i) => (i % 2 ? '' : lb[i]);
                o.plugins.legend.position = 'bottom';
                o.plugins.legend.labels.boxWidth = 10; o.plugins.legend.labels.boxHeight = 6;
                o.plugins.legend.labels.padding = 6; o.plugins.legend.labels.font = { size: 9.5 };
                o.layout.padding = { top: 2, right: 4 };
                chartAltezza.data.datasets.forEach(ds => { ds.pointRadius = 0; });
                chartAltezza.update('none');
            }
            function avvia() {
                if (window.Chart && Chart.register) Chart.register(notte);
                if (typeof disegnaGraficoAltezza === 'function' && !disegnaGraficoAltezza._adpS5) {
                    const orig = disegnaGraficoAltezza;
                    disegnaGraficoAltezza = function () { const r = orig.apply(this, arguments); try { ritocca(); } catch (e) {} return r; };
                    disegnaGraficoAltezza._adpS5 = true;
                }
                const ridisegna = () => { if (typeof targetSelezionato !== 'undefined' && targetSelezionato && typeof disegnaGraficoAltezza === 'function') disegnaGraficoAltezza(); };
                if (mq.addEventListener) mq.addEventListener('change', ridisegna); else if (mq.addListener) mq.addListener(ridisegna);
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
        })();

        // ============================================================
        // ADP 9.0 — S6 (smartphone): menu a tendina come "foglio dal basso"
        // con la grafica dell'app. Vale per TUTTI i <select> (anche quelli
        // creati dopo): il select originale resta nascosto sotto e riceve il
        // valore + gli eventi input/change, quindi le funzioni esistenti non cambiano.
        // ============================================================
        (function () {
            const mq = window.matchMedia('(max-width: 768px)');
            const TX = {
                it: { cerca: 'Cerca…', tutti: 'Tutti', nessuno: 'Nessun risultato' },
                en: { cerca: 'Search…', tutti: 'All', nessuno: 'No results' },
                es: { cerca: 'Buscar…', tutti: 'Todos', nessuno: 'Sin resultados' },
                zh: { cerca: '搜索…', tutti: '全部', nessuno: '无结果' }
            };
            const tx = () => TX[(typeof lang !== 'undefined' && TX[lang]) ? lang : 'it'];
            const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
            let el = null, selAperto = null;

            function titolo(sel) {
                let l = sel.id && document.querySelector('label[for="' + sel.id + '"]');
                for (let g = sel.parentElement, n = 0; !l && g && n < 4; g = g.parentElement, n++) l = g.querySelector('label');   // risale fino a trovare un'etichetta
                const t = (l && l.textContent) || sel.getAttribute('aria-label') || sel.title || '';
                return t.replace(/[:：]\s*$/, '').replace(/\s+/g, ' ').trim();
            }
            // "Optolong L-eXtreme (7+7 nm)" → marca, modello, etichetta
            function parti(txt, lungo) {
                let m = /^(.*?)\s*\(([^()]{1,24})\)\s*$/.exec(txt), base = m ? m[1] : txt, chip = m ? m[2] : '';
                let marca = '', modello = base;
                if (lungo && /^[A-Za-zÀ-ÿ]/.test(base) && base.indexOf(' ') > 0) {
                    const due = ['Explore Scientific', 'William Optics'].find(m => base.indexOf(m + ' ') === 0);   // marche di due parole
                    const i = due ? due.length : base.indexOf(' ');
                    marca = base.slice(0, i); modello = base.slice(i + 1);
                }
                return { marca, modello, chip };
            }
            function banda(v) { const n = parseFloat(String(v).split('|')[1]); return isNaN(n) ? 999 : n; }
            function voci(sel) {   // [{gruppo, opt}] mantenendo l'ordine; i filtri OSC ordinati per marca e banda
                const out = [];
                Array.from(sel.children).forEach(ch => {
                    if (ch.tagName === 'OPTGROUP') {
                        let ops = Array.from(ch.children).filter(o => !o.hidden && o.style.display !== 'none');
                        if (sel.id === 'filter-db-select') ops = ops.slice().sort((a, b) => {
                            const ga = /^generic/i.test(a.textContent), gb = /^generic/i.test(b.textContent);
                            if (ga !== gb) return ga ? 1 : -1;
                            const ma = a.textContent.split(' ')[0].toLowerCase(), mb = b.textContent.split(' ')[0].toLowerCase();
                            return ma < mb ? -1 : ma > mb ? 1 : banda(a.value) - banda(b.value);
                        });
                        ops.forEach(o => out.push({ gruppo: ch.label, opt: o }));
                    } else if (ch.tagName === 'OPTION' && !ch.hidden && ch.style.display !== 'none') out.push({ gruppo: null, opt: ch });
                });
                return out;
            }

            function costruisci() {
                el = document.createElement('div');
                el.className = 'adp-sheet-wrap';
                el.innerHTML = '<div class="adp-sheet-dim"></div><div class="adp-sheet" role="dialog" aria-modal="true">' +
                    '<div class="adp-sheet-grab"></div><div class="adp-sheet-head"><b></b><button type="button" class="adp-sheet-x" aria-label="✕">✕</button></div>' +
                    '<input type="search" class="adp-sheet-search"><div class="adp-sheet-chips"></div><div class="adp-sheet-list"></div></div>';
                document.body.appendChild(el);
                el.querySelector('.adp-sheet-dim').addEventListener('click', chiudi);
                el.querySelector('.adp-sheet-x').addEventListener('click', chiudi);
                el.querySelector('.adp-sheet-search').addEventListener('input', filtra);
                el.querySelector('.adp-sheet-chips').addEventListener('click', e => {
                    const c = e.target.closest('.adp-sheet-chip'); if (!c) return;
                    el.querySelectorAll('.adp-sheet-chip').forEach(x => x.classList.toggle('on', x === c)); filtra();
                });
                el.querySelector('.adp-sheet-list').addEventListener('click', e => {
                    const r = e.target.closest('.adp-sheet-item'); if (!r || r.classList.contains('dis') || !selAperto) return;
                    const s = selAperto, v = r.dataset.v;
                    chiudi();
                    if (s.value !== v) { s.value = v; s.dispatchEvent(new Event('input', { bubbles: true })); s.dispatchEvent(new Event('change', { bubbles: true })); }
                });
                document.addEventListener('keydown', e => { if (e.key === 'Escape' && selAperto) chiudi(); });
            }

            function filtra() {
                const q = el.querySelector('.adp-sheet-search').value.trim().toLowerCase();
                const chip = el.querySelector('.adp-sheet-chip.on'), g = chip && chip.dataset.g;
                let vis = 0;
                el.querySelectorAll('.adp-sheet-item').forEach(r => {
                    const ok = (!q || r.dataset.s.indexOf(q) >= 0) && (!g || r.dataset.g === g || r.dataset.g === '');
                    r.style.display = ok ? '' : 'none'; if (ok) vis++;
                });
                el.querySelectorAll('.adp-sheet-gh').forEach(h => {
                    let n = h.nextElementSibling, any = false;
                    while (n && !n.classList.contains('adp-sheet-gh')) { if (n.style.display !== 'none') any = true; n = n.nextElementSibling; }
                    h.style.display = any ? '' : 'none';
                });
                el.querySelector('.adp-sheet-empty').style.display = vis ? 'none' : '';
            }

            function apri(sel) {
                if (!el) costruisci();
                selAperto = sel;
                const lista = voci(sel), lungo = lista.length > 10;
                const gruppi = [...new Set(lista.map(x => x.gruppo).filter(Boolean))];
                el.querySelector('.adp-sheet-head b').textContent = titolo(sel);
                const s = el.querySelector('.adp-sheet-search');
                s.value = ''; s.placeholder = tx().cerca; s.style.display = lungo ? '' : 'none';
                const chips = el.querySelector('.adp-sheet-chips');
                chips.innerHTML = gruppi.length > 1 ? '<span class="adp-sheet-chip on" data-g="">' + esc(tx().tutti) + '</span>' +
                    gruppi.map(gr => '<span class="adp-sheet-chip" data-g="' + esc(gr) + '">' + esc(gr) + '</span>').join('') : '';
                let html = '', ultimo = null;
                lista.forEach(({ gruppo, opt }) => {
                    if (gruppo && gruppo !== ultimo) html += '<div class="adp-sheet-gh">' + esc(gruppo) + '</div>';
                    if (!gruppo && ultimo) html += '<div class="adp-sheet-sep"></div>';
                    ultimo = gruppo;
                    const txt = opt.textContent.trim(), p = parti(txt, lungo), on = opt.value === sel.value && opt.selected;
                    html += '<div class="adp-sheet-item' + (on ? ' on' : '') + (opt.disabled ? ' dis' : '') + '" data-v="' + esc(opt.value) +
                        '" data-g="' + esc(gruppo || '') + '" data-s="' + esc(txt.toLowerCase()) + '"><span class="adp-sheet-chk">' + (on ? '✓' : '') + '</span>' +
                        '<span class="adp-sheet-t">' + (p.marca ? '<b>' + esc(p.marca) + '</b><small>' + esc(p.modello) + '</small>' : '<span>' + esc(p.modello) + '</span>') + '</span>' +
                        (p.chip ? '<span class="adp-sheet-tag">' + esc(p.chip) + '</span>' : '') + '</div>';
                });
                html += '<div class="adp-sheet-empty" style="display:none">' + esc(tx().nessuno) + '</div>';
                el.querySelector('.adp-sheet-list').innerHTML = html;
                el.classList.add('aperto');
                document.documentElement.classList.add('adp-sheet-lock');
                const on = el.querySelector('.adp-sheet-item.on');
                if (on) on.scrollIntoView({ block: 'center' });
            }
            function chiudi() {
                if (!el) return;
                el.classList.remove('aperto'); selAperto = null;
                document.documentElement.classList.remove('adp-sheet-lock');
            }

            // Tocco su un select: niente selettore di sistema, si apre il foglio (solo tocchi "fermi", non gli scorrimenti)
            let t0 = null;
            const bersaglio = e => { const s = e.target && e.target.closest && e.target.closest('select');
                return (s && mq.matches && !s.disabled && !s.multiple && !(el && el.contains(s))) ? s : null; };
            document.addEventListener('touchstart', e => { const s = bersaglio(e); t0 = s ? { s, x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }, { passive: true, capture: true });
            document.addEventListener('touchend', e => {
                const s = bersaglio(e); if (!s || !t0 || t0.s !== s) return;
                const t = e.changedTouches[0];
                if (Math.abs(t.clientX - t0.x) > 10 || Math.abs(t.clientY - t0.y) > 10) return;    // era uno scorrimento
                e.preventDefault(); s.blur(); apri(s);
            }, { passive: false, capture: true });
            document.addEventListener('mousedown', e => { const s = bersaglio(e); if (!s) return; e.preventDefault(); apri(s); }, true);
            mq.addEventListener && mq.addEventListener('change', () => { if (!mq.matches) chiudi(); });
        })();

        // ============================================================
        // ADP 9.0 — S7: il pulsante tra Luna e Meteo diventa "Analisi notte" e
        // prende il colore del giudizio della notte (stessa analisi del night popup);
        // menu ☰ su smartphone che raccoglie Modalità, Lingua, Manuale, Novità.
        // ============================================================
        (function () {
            const TX = {
                it: { an: 'Analisi notte', nd: 'senza meteo', modo: 'Modalità', base: 'Base', avz: 'Avanzata', lingua: 'Lingua', man: 'Manuale', nov: 'Novità della versione', menu: 'Menu' },
                en: { an: 'Night analysis', nd: 'no weather', modo: 'Mode', base: 'Basic', avz: 'Advanced', lingua: 'Language', man: 'Manual', nov: "What's new", menu: 'Menu' },
                es: { an: 'Análisis nocturno', nd: 'sin meteo', modo: 'Modo', base: 'Básico', avz: 'Avanzado', lingua: 'Idioma', man: 'Manual', nov: 'Novedades', menu: 'Menú' },
                zh: { an: '夜间分析', nd: '无天气数据', modo: '模式', base: '基础', avz: '高级', lingua: '语言', man: '手册', nov: '版本新功能', menu: '菜单' }
            };
            const L = () => (typeof lang !== 'undefined' && TX[lang]) ? lang : 'it';
            const tx = () => TX[L()];
            // stessi colori del popup (il più scuro schiarito per restare leggibile sulla barra)
            const CAT = {
                perfetta: { c: '#2ecc71', k: 'np_perfetta' }, promettente: { c: '#c49a3c', k: 'np_promettente' },
                incerta: { c: '#e67e22', k: 'np_incerta' }, non_vale_la_pena: { c: '#e74c3c', k: 'np_non_vale' },
                lascia_perdere: { c: '#b03030', k: 'np_lascia_perdere' }
            };
            let btn = null, mbtn = null, sheet = null, firma = '', rifMeteo = null;

            function crea() {
                if (btn) return true;
                btn = document.querySelector('.ephemeris-box .np-forecast-btn');          // il pulsante tra Luna e Meteo
                const modo = document.getElementById('mode-select-wrap');
                if (!btn || !modo) { btn = null; return false; }
                btn.classList.add('adp-an');
                if (!btn.querySelector('.np-an-v')) { const v = document.createElement('span'); v.className = 'np-an-v'; btn.appendChild(v); }
                mbtn = document.createElement('button');                                   // menu ☰ (visibile solo su smartphone)
                mbtn.type = 'button'; mbtn.id = 'adp-menu-btn'; mbtn.className = 'adp-menu-btn'; mbtn.textContent = '☰';
                mbtn.addEventListener('click', apriMenu);
                modo.parentElement.appendChild(mbtn);
                return true;
            }

            function aggiorna(forza) {
                if (!crea()) return;
                let a = null;
                const pos = localStorage.getItem('ad_lat') || localStorage.getItem('ad_location-lat');
                const f = [L(), typeof latCorrente !== 'undefined' ? latCorrente : '', typeof lonCorrente !== 'undefined' ? lonCorrente : '',
                    typeof getSessionDate === 'function' ? getSessionDate().toDateString() : '',
                    (typeof datiMeteo !== 'undefined' && datiMeteo && datiMeteo.time) ? datiMeteo.time[0] + '|' + datiMeteo.time.length : '-', pos ? 1 : 0].join(',');
                const meteoNuovo = (typeof datiMeteo !== 'undefined') && datiMeteo !== rifMeteo;   // dati meteo ricaricati
                if (!forza && f === firma && !meteoNuovo) return;
                firma = f; rifMeteo = (typeof datiMeteo !== 'undefined') ? datiMeteo : null;
                try { if (pos && typeof _npAnalisiNotte === 'function') a = _npAnalisiNotte(); } catch (e) { a = null; }
                const cat = a && CAT[a.categoria];
                btn.style.setProperty('--an-c', cat ? cat.c : '#6e7a8a');
                btn.dataset.cat = a ? a.categoria : 'nd';
                const giud = cat ? (typeof t === 'function' ? t(cat.k) : a.categoria) : tx().nd;
                btn.querySelector('.np-an-v').textContent = giud;
                btn.title = tx().an + ' · ' + giud; btn.setAttribute('aria-label', btn.title);
                mbtn.setAttribute('aria-label', tx().menu);
            }

            // ── menu ☰ (smartphone): foglio dal basso con lo stile dei menu a tendina ──
            function apriMenu() {
                if (!sheet) {
                    sheet = document.createElement('div');
                    sheet.className = 'adp-sheet-wrap adp-menu-sheet';
                    sheet.innerHTML = '<div class="adp-sheet-dim"></div><div class="adp-sheet" role="dialog" aria-modal="true"><div class="adp-sheet-grab"></div>' +
                        '<div class="adp-sheet-head"><b></b><button type="button" class="adp-sheet-x">✕</button></div><div class="adp-sheet-list"></div></div>';
                    document.body.appendChild(sheet);
                    sheet.querySelector('.adp-sheet-dim').addEventListener('click', chiudiMenu);
                    sheet.querySelector('.adp-sheet-x').addEventListener('click', chiudiMenu);
                    sheet.querySelector('.adp-sheet-list').addEventListener('click', e => {
                        const b = e.target.closest('[data-az]'); if (!b) return;
                        const az = b.dataset.az, v = b.dataset.v;
                        chiudiMenu();
                        if (az === 'modo' && typeof setModalita === 'function') setModalita(v);
                        else if (az === 'lingua' && typeof _selectLang === 'function') _selectLang(v);
                        else if (az === 'man' && typeof apriGuida === 'function') apriGuida();
                        else if (az === 'nov' && typeof mostraChangelogManuale === 'function') mostraChangelogManuale();
                    });
                }
                const x = tx(), lite = document.body.classList.contains('mode-lite');
                const ver = (document.querySelector('.nav-version-btn') || {}).textContent || '';
                const lingue = [['it', 'Italiano'], ['en', 'English'], ['es', 'Español'], ['zh', '中文']];
                sheet.querySelector('.adp-sheet-head b').textContent = x.menu;
                sheet.querySelector('.adp-sheet-list').innerHTML =
                    '<div class="adp-mn-row"><span>🚀 ' + x.modo + '</span><span class="adp-mn-seg">' +
                    '<button type="button" data-az="modo" data-v="lite"' + (lite ? ' class="on"' : '') + '>' + x.base + '</button>' +
                    '<button type="button" data-az="modo" data-v="advanced"' + (!lite ? ' class="on"' : '') + '>' + x.avz + '</button></span></div>' +
                    '<div class="adp-mn-row adp-mn-col"><span>🌐 ' + x.lingua + '</span><span class="adp-mn-seg adp-mn-lang">' +
                    lingue.map(([c, n]) => '<button type="button" data-az="lingua" data-v="' + c + '"' + (L() === c ? ' class="on"' : '') + '>' + n + '</button>').join('') + '</span></div>' +
                    '<button type="button" class="adp-mn-row adp-mn-link" data-az="man"><span>📖 ' + x.man + '</span><small>▸</small></button>' +
                    '<button type="button" class="adp-mn-row adp-mn-link" data-az="nov"><span>✨ ' + x.nov + '</span><small>' + ver.trim() + ' ▸</small></button>';
                sheet.classList.add('aperto');
                document.documentElement.classList.add('adp-sheet-lock');
            }
            function chiudiMenu() {
                if (!sheet) return;
                sheet.classList.remove('aperto');
                if (!document.querySelector('.adp-sheet-wrap.aperto')) document.documentElement.classList.remove('adp-sheet-lock');
            }

            function avvia() {
                aggiorna(true);
                document.addEventListener('sessionDateChanged', () => setTimeout(() => aggiorna(true), 300));
                setInterval(() => aggiorna(false), 3000);       // posizione, meteo, lingua: si ricalcola solo se qualcosa è cambiato
                document.addEventListener('keydown', e => { if (e.key === 'Escape') chiudiMenu(); });
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
        })();

        // ============================================================
        // ADP 9.0 — S8: etichette sotto lo slider meteo coerenti con la data.
        // Oggi: "Adesso · +12h · +24h" (come prima). Data futura: lo slider parte
        // dalle 18:00 di quel giorno, quindi le etichette mostrano gli orari reali
        // (inizio, +12 h, fine = +23 h), con il giorno abbreviato.
        // ============================================================
        (function () {
            let firma = '';
            function etichette() {
                const sl = document.getElementById('timeSlider');
                const box = sl && sl.closest('.timeline-container') ? sl.closest('.timeline-container').querySelector('span[data-i18n="now"], span.adp-tl-0') : null;
                if (!box || typeof isSessionDateToday !== 'function' || typeof getSessionDate !== 'function') return;
                const riga = box.parentElement, sp = riga.querySelectorAll(':scope > span');
                if (sp.length < 3) return;
                const L = (typeof lang !== 'undefined' && lang) || 'it';
                const oggi = isSessionDateToday(), d0 = getSessionDate().toDateString();
                const f = L + '|' + oggi + '|' + d0;
                if (f === firma) return;
                firma = f;
                if (oggi) {
                    sp[0].setAttribute('data-i18n', 'now'); sp[0].classList.remove('adp-tl-0');
                    sp[0].textContent = (typeof t === 'function') ? t('now') : 'Adesso';
                    sp[1].textContent = '+12h'; sp[2].textContent = '+24h';
                    return;
                }
                sp[0].removeAttribute('data-i18n'); sp[0].classList.add('adp-tl-0');   // il cambio lingua non deve rimettere "Adesso"
                const loc = { it: 'it-IT', en: 'en-GB', es: 'es-ES', zh: 'zh-CN' }[L] || 'it-IT';
                const base = getSessionDate(); base.setHours(18, 0, 0, 0);
                const max = parseInt(sl.max, 10) || 23;
                const fmt = ore => {
                    const d = new Date(base.getTime() + ore * 3600000);
                    let g = d.toLocaleDateString(loc, { weekday: 'short' }).replace(/\./g, '');
                    g = g.charAt(0).toUpperCase() + g.slice(1);
                    return g + ' ' + String(d.getHours()).padStart(2, '0') + ':00';
                };
                sp[0].textContent = fmt(0); sp[1].textContent = fmt(12); sp[2].textContent = fmt(max);
            }
            function avvia() {
                etichette();
                document.addEventListener('sessionDateChanged', () => setTimeout(etichette, 50));
                setInterval(etichette, 2000);            // lingua o mezzanotte: si aggiorna solo se qualcosa è cambiato
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
        })();
