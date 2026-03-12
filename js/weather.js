// weather.js — Mappa Leaflet, meteo Open-Meteo, effemeridi, layer
// ============================================================


        
        let mappaScura = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: 'Meteo Data &copy; <a href="https://open-meteo.com/" target="_blank" style="color:#bb86fc;">Open-Meteo</a> | Map &copy; <a href="https://carto.com/" target="_blank">CartoDB</a>' });
        let _savedName = localStorage.getItem('ad_location_name') || 'Udine';
        let map = L.map('map', { center: [latCorrente, lonCorrente], zoom: 8, layers: [mappaScura], zoomControl: false });
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
        function toggleLayerLP() {
            let btn = document.getElementById('btn-lp');
            let meteoLayerNames = ['basse','medie','alte','jet','luna','umidita'];
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
                _lpSavedLayers = meteoLayerNames.filter(n => map.hasLayer(layers[n]));
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
        }
        let marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup(`<b>${_savedName}</b>`).openPopup();


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
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
                    .then(r => r.json()).then(data => {
                        dropdown.innerHTML = ''; 
                        if (data.length > 0) {
                            dropdown.style.display = 'block'; data.forEach(l => { let li = document.createElement('li'); li.textContent = l.display_name; li.onclick = () => selezionaLuogo(l.lat, l.lon, l.display_name); dropdown.appendChild(li); });
                        } else dropdown.style.display = 'none';
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
        }

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
            .then(r => r.json()).then(data => {
                datiMeteo = data.hourly; let adesso = new Date();
                indicePartenza = Math.max(0, datiMeteo.time.findIndex(x => new Date(x).getTime() >= adesso.getTime() - 3600000));
                document.getElementById('timeSlider').disabled = false; document.getElementById('timeSlider').value = 0; 
                document.getElementById('astroSlider').disabled = false; document.getElementById('astroSlider').value = 0; 
                applicaGradienteGiornoNotte();
                cambiaOraMeteo(); cambiaOraAstro();
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
            L.circle([latCorrente, lonCorrente], { radius: 50000, color: '#ff4444', fillColor: '#ff4444', fillOpacity: (b/100)*0.7, weight: 1 }).addTo(layers.basse);
            L.circle([latCorrente, lonCorrente], { radius: 50000, color: '#44ff44', fillColor: '#44ff44', fillOpacity: (m/100)*0.7, weight: 1 }).addTo(layers.medie);
            L.circle([latCorrente, lonCorrente], { radius: 50000, color: '#4444ff', fillColor: '#4444ff', fillOpacity: (a/100)*0.7, weight: 1 }).addTo(layers.alte);
            if(jet>50) L.circle([latCorrente, lonCorrente], { radius: 60000, color: '#ff00ff', fillColor: '#ff00ff', fillOpacity: (jet/200)*0.5, weight: 2, dashArray: '10, 10' }).addTo(layers.jet);
            if(inqL>0) L.circle([latCorrente, lonCorrente], { radius: 100000, color: '#ffffaa', fillColor: '#ffffaa', fillOpacity: (inqL/100)*0.4, weight: 0 }).addTo(layers.luna);
            if(um>60) L.circle([latCorrente, lonCorrente], { radius: 75000, color: '#00ffff', fillColor: '#00ffff', fillOpacity: ((um-60)/100)*0.5, weight: 1, dashArray: '5, 5' }).addTo(layers.umidita);
        }



