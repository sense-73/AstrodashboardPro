// weather.js — Mappa Leaflet, meteo Open-Meteo, effemeridi, layer
// ============================================================


        
        let mappaScura = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: 'Meteo Data &copy; <a href="https://open-meteo.com/" target="_blank" style="color:#bb86fc;">Open-Meteo</a> | Map &copy; <a href="https://carto.com/" target="_blank">CartoDB</a>' });
        let _savedName = localStorage.getItem('ad_location_name') || 'Udine';
        window._leafletMap = null;
        let map = L.map('map', { center: [latCorrente, lonCorrente], zoom: 8, layers: [mappaScura], zoomControl: false });
        window._leafletMap = map;
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        let layers = { basse: L.layerGroup().addTo(map), medie: L.layerGroup(), alte: L.layerGroup(), jet: L.layerGroup(), luna: L.layerGroup(), umidita: L.layerGroup() };
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

        const _METEO_LAYER_NAMES = ['basse','medie','alte','jet','luna','umidita'];

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
        let marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup(`<b>${_savedName}</b>`).openPopup();

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
            map.flyTo([latCorrente, lonCorrente], 9);
            if (marker) map.removeLayer(marker);
            marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup(`<b>${nome.split(',')[0]}</b>`).openPopup();
            aggiornaEffemeridi(new Date()); scaricaDatiPrevisionali();
            _rilevaBortleDaCoordinate(latCorrente, lonCorrente);
        }

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
            // Logica pulsante "Comincia":
            // - Luogo salvato → vai direttamente al meteo
            // - Nessun luogo salvato → richiedi GPS → se ok imposta luogo e vai al meteo
            //                                       → se rifiuto → vai al meteo con barra ricerca
            let haLuogo = localStorage.getItem('ad_lat') && localStorage.getItem('ad_lon');
            if (haLuogo) {
                vaiMeteo();
                return;
            }
            // Prima volta: tenta GPS
            if (!navigator.geolocation) {
                vaiMeteo();
                setTimeout(() => { let el = document.getElementById('ricerca'); if (el) { el.scrollIntoView({behavior:'smooth', block:'center'}); el.focus(); } }, 300);
                return;
            }
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let lat = pos.coords.latitude, lon = pos.coords.longitude;
                    _risolviGPSNome(lat, lon, nome => {
                        selezionaLuogo(lat, lon, nome);
                        vaiMeteo();
                    });
                },
                () => {
                    // GPS rifiutato: vai al meteo con focus sulla barra ricerca
                    vaiMeteo();
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
        }

        function scaricaDatiPrevisionali() {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latCorrente}&longitude=${lonCorrente}&hourly=cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_250hPa,wind_speed_10m,temperature_2m,relative_humidity_2m&forecast_days=3&timezone=auto`)
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(data => {
                if (!data.hourly || !data.hourly.time) throw new Error('invalid_data');
                datiMeteo = data.hourly; let adesso = new Date();
                indicePartenza = Math.max(0, datiMeteo.time.findIndex(x => new Date(x).getTime() >= adesso.getTime() - 3600000));
                document.getElementById('timeSlider').disabled = false; document.getElementById('timeSlider').value = 0; 
                document.getElementById('astroSlider').disabled = false; document.getElementById('astroSlider').value = 0; 
                applicaGradienteGiornoNotte();
                cambiaOraMeteo(); cambiaOraAstro();
            }).catch(() => {
                mostraAvviso('❌ Dati meteo non disponibili. Controlla la connessione e riprova.', 'error');
            });
        }

        function applicaGradienteGiornoNotte() {
            if (!datiMeteo) return;
            let maxSteps = 23; // Il range del nostro slider
            let stops = [];
            for(let i=0; i<=maxSteps; i++) {
                let d = new Date(datiMeteo.time[indicePartenza + i]);
                let times = SunCalc.getTimes(d, latCorrente, lonCorrente);
                let pct = (i / maxSteps) * 100;
                
                // Colori: Giorno (Azzurro), Tramonto (Arancione), Notte (Nero), Alba (Viola)
                let color = "#0a0f1d";
                if (d > times.sunrise && d < times.sunset) color = "#5c9fb8";          // Giorno
                else if (d >= times.sunset && d < times.dusk)   color = "#d97b2b";     // Tramonto
                else if (d >= times.dawn   && d <= times.sunrise) color = "#5c2d8a";   // Alba
                
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

        function cambiaOraMeteo() {
            if (!datiMeteo) return;
            let step = parseInt(document.getElementById('timeSlider').value), i = indicePartenza + step, dOra = new Date(datiMeteo.time[i]);
            let tOra = step === 0 ? t("now") + " (" + new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}) + ")" : dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
            if (step > 0 && dOra.getHours() === 0) aggiornaEffemeridi(dOra);

            let b = datiMeteo.cloud_cover_low[i], m = datiMeteo.cloud_cover_mid[i], a = datiMeteo.cloud_cover_high[i], jet = Math.round(datiMeteo.wind_speed_250hPa[i]), vs = datiMeteo.wind_speed_10m[i], temp = datiMeteo.temperature_2m[i], um = datiMeteo.relative_humidity_2m[i];
            let altS = SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI), mP = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente);
            
            let maxC = Math.max(b, m, a), icM = "☁️", dsM = "overcast";
            if (maxC < 15) { icM = "☀️"; dsM = "clear"; } else if (maxC < 40) { icM = "🌤️"; dsM = "partly_cloudy"; } else if (maxC < 75) { icM = "⛅"; dsM = "mostly_cloudy"; }
            if (altS < -6) { if (maxC < 15) icM = "✨"; else if (maxC < 40) icM = "🌙"; }

            document.getElementById('time-display').innerHTML = `<span style="font-size: 1.5em; vertical-align: middle; margin-right: 5px;">${icM}</span> ${tOra} <br><span style="font-size: 0.75em; color: #aaa; text-transform: uppercase;">${t("weather")}: <b style="color: #fff;">${t(dsM)}</b></span>`;
            
            // Calcolo Meteo Attuale (fisso, non influenzato dallo slider)
            let dOra0 = new Date(datiMeteo.time[indicePartenza]);
            let b0 = datiMeteo.cloud_cover_low[indicePartenza], m0 = datiMeteo.cloud_cover_mid[indicePartenza], a0 = datiMeteo.cloud_cover_high[indicePartenza];
            let altS0 = SunCalc.getPosition(dOra0, latCorrente, lonCorrente).altitude * (180/Math.PI);
            let maxC0 = Math.max(b0, m0, a0), icM0 = "☁️", dsM0 = "overcast";
            if (maxC0 < 15) { icM0 = "☀️"; dsM0 = "clear"; } else if (maxC0 < 40) { icM0 = "🌤️"; dsM0 = "partly_cloudy"; } else if (maxC0 < 75) { icM0 = "⛅"; dsM0 = "mostly_cloudy"; }
            if (altS0 < -6) { if (maxC0 < 15) icM0 = "✨"; else if (maxC0 < 40) icM0 = "🌙"; }
            
            let iconEl = document.getElementById('current-weather-icon'); if (iconEl) iconEl.innerText = icM0;
            let descEl = document.getElementById('current-weather-desc'); if (descEl) descEl.innerText = t(dsM0);
            
            document.getElementById('val-umidita-layer').innerText = um + "%";
            
            let inqL = (altS < -6 && mP.altitude > 0) ? Math.max(0, Math.round((SunCalc.getMoonIllumination(dOra).fraction * Math.sin(mP.altitude)) * 100)) : 0;
            let scS = 5; if(jet>120)scS-=3;else if(jet>80)scS-=2;else if(jet>50)scS-=1; if(vs>15)scS-=1; if(vs>30)scS-=1;
            
            document.getElementById('val-seeing').innerText = altS > -6 ? t("daytime") : Math.max(1, scS) + "/5";
            document.getElementById('val-seeing').style.color = altS > -6 ? "#ffaa00" : "#bb86fc";
            document.getElementById('val-basse').innerText = b+"%"; document.getElementById('val-medie').innerText = m+"%"; document.getElementById('val-alte').innerText = a+"%"; document.getElementById('val-jet').innerHTML = jet+' <span class="jet-unit">km/h</span>'; document.getElementById('val-luna').innerText = inqL+"%";

            Object.values(layers).forEach(l => l.clearLayers());

            // Raggi in metri. Icone bianche al 92% del raggio (vicino al bordo, no sovrapposizioni).
            // Nuvole stesso raggio — basse ore 9 (270°), medie ore 10:30 (315°), alte ore 12 (0°)
            // Jet/Luna/Umidità raggi crescenti — tutti ore 1:30 (45°), cerchi diversi
            const R_NUV = 50000, R_JET = 60000, R_UMID = 75000, R_LUNA = 100000;
            const PCT = 0.92;

            L.circle([latCorrente, lonCorrente], { radius: R_NUV, color: '#ff4444', fillColor: '#ff4444', fillOpacity: (b/100)*0.7, weight: 1 }).addTo(layers.basse);
            _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_NUV*PCT, 270), _SVG.basse.paths, _SVG.basse.filled).addTo(layers.basse);

            L.circle([latCorrente, lonCorrente], { radius: R_NUV, color: '#44ff44', fillColor: '#44ff44', fillOpacity: (m/100)*0.7, weight: 1 }).addTo(layers.medie);
            _meteoIcon(_offsetLatLon(latCorrente, lonCorrente, R_NUV*PCT, 315), _SVG.medie.paths, _SVG.medie.filled).addTo(layers.medie);

            L.circle([latCorrente, lonCorrente], { radius: R_NUV, color: '#4444ff', fillColor: '#4444ff', fillOpacity: (a/100)*0.7, weight: 1 }).addTo(layers.alte);
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

            console.log('[Bortle] Carico tile:', url, 'pixel:', px, py);

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                console.log('[Bortle] Tile caricato, dimensioni:', img.width, img.height);
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = tileSize;
                    canvas.height = tileSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, tileSize, tileSize);
                    const pixel = ctx.getImageData(px, py, 1, 1).data;
                    const r = pixel[0], g = pixel[1], b = pixel[2], a = pixel[3];
                    console.log('[Bortle] Pixel rgba:', r, g, b, a);
                    if (a < 10) { console.warn('[Bortle] Pixel trasparente, skip'); return; }
                    const bortle = _rgbToBortle(r, g, b);
                    console.log('[Bortle] Bortle rilevato:', bortle);
                    if (typeof setBortleAutorilevato === 'function') {
                        setBortleAutorilevato(bortle);
                    }
                } catch(e) {
                    console.warn('[Bortle] Canvas sampling fallito:', e.message);
                }
            };
            img.onerror = function() {
                console.error('[Bortle] Tile non disponibile:', url);
            };
            img.src = url;
        }
        // ─────────────────────────────────────────────────────────────────────
