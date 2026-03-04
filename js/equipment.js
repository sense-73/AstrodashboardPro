// equipment.js — Database attrezzatura, preset telescopio e sensore
// ============================================================

        function popolaMenuAttrezzatura() {
            const selTel = document.getElementById('preset-telescope'); 
            selTel.innerHTML = '<option value="" data-i18n="select_opt">-- Seleziona --</option>';
            
            let customTels = JSON.parse(localStorage.getItem('ad_custom_telescopes')) || [];
            
            let allTels = [...customTels, ...dbTelescopiBase];
            allTels.forEach(t => { 
                let opt = document.createElement('option'); 
                opt.value = t.focale + ',' + t.diametro; 
                opt.textContent = (customTels.some(ct => ct.nome === t.nome) ? "⭐ " : "") + t.nome; 
                selTel.appendChild(opt); 
            });

            const selCam = document.getElementById('preset-sensor'); 
            selCam.innerHTML = '<option value="" data-i18n="select_opt">-- Seleziona --</option>';
            dbCamereBase.forEach(c => { 
                let opt = document.createElement('option'); 
                opt.value = `${c.w},${c.h},${c.p}`; 
                opt.textContent = c.nome; 
                selCam.appendChild(opt); 
            });
        }

        function applicaPresetTelescopio() { 
            let v = document.getElementById('preset-telescope').value; 
            if(v){ 
                let p = v.split(','); 
                document.getElementById('focal-length').value = p[0]; 
                document.getElementById('aperture').value = p[1] || 100; 
                aggiornaFOV();
                calcolaTempi();
            } 
        }

        function applicaPresetSensore() { 
            let v = document.getElementById('preset-sensor').value; 
            if(v){
                let p=v.split(',');
                document.getElementById('sensor-width').value=p[0];
                document.getElementById('sensor-height').value=p[1];
                if(p[2]) document.getElementById('pixel-size').value=p[2];
                aggiornaFOV();
            } 
        }


        function salvaTelescopioCustom() {
            let f = document.getElementById('focal-length').value;
            let d = document.getElementById('aperture').value;
            
            // Traduzione dinamica dell'errore
            let errTxt = lang === 'it' ? "Inserisci prima una Focale e un Diametro validi nei campi sottostanti." : 
                         lang === 'en' ? "Please enter a valid Focal Length and Aperture in the fields below." : 
                         lang === 'es' ? "Ingresa primero una Focal y Diámetro válidos en los campos de abajo." : 
                                         "请先在下方输入有效的焦距和口径。";
            
            if(!f || !d || isNaN(f) || isNaN(d)) { alert(errTxt); return; }
            
            // Traduzione dinamica della richiesta del nome
            let pTxt = lang === 'it' ? `Setup: Focale ${f}mm, Diametro ${d}mm.\nInserisci il NOME del Telescopio/Obiettivo:` : 
                       lang === 'en' ? `Setup: Focal ${f}mm, Aperture ${d}mm.\nEnter the NAME of your Telescope/Lens:` : 
                       lang === 'es' ? `Equipo: Focal ${f}mm, Diámetro ${d}mm.\nIngresa el NOMBRE del Telescopio/Lente:` : 
                                       `当前设置: 焦距 ${f}mm, 口径 ${d}mm.\n请输入望远镜/镜头的名称:`;
            
            let nome = prompt(pTxt);
            if(!nome) return;
            
            let customTels = JSON.parse(localStorage.getItem('ad_custom_telescopes')) || [];
            customTels.push({ nome: nome.trim(), focale: parseInt(f), diametro: parseInt(d) });
            localStorage.setItem('ad_custom_telescopes', JSON.stringify(customTels));
            
            popolaMenuAttrezzatura();
            document.getElementById('preset-telescope').value = `${f},${d}`;
        }

        
        let fovCenterOverride = null; // {ra: gradi_decimali, dec: gradi_decimali} — null = usa coordinate target
        // Coordinate centro FOV: null = usa quelle originali del target, altrimenti override da drag
        let mappaScura = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: 'Meteo Data &copy; <a href="https://open-meteo.com/" target="_blank" style="color:#bb86fc;">Open-Meteo</a> | Map &copy; <a href="https://carto.com/" target="_blank">CartoDB</a>' });
        let map = L.map('map', { center: [latCorrente, lonCorrente], zoom: 8, layers: [mappaScura], zoomControl: false });
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        let layers = { basse: L.layerGroup().addTo(map), medie: L.layerGroup(), alte: L.layerGroup(), jet: L.layerGroup(), luna: L.layerGroup(), umidita: L.layerGroup() };
        let marker = L.marker([latCorrente, lonCorrente]).addTo(map).bindPopup("<b>Udine</b>").openPopup();
        let timerRicerca;

        const planetsDatabase = [ { id: "jupiter", name: "jupiter", icon: "🪐", ra: 7.15, dec: 22.8 }, { id: "mars", name: "mars", icon: "🔴", ra: 18.50, dec: -23.5 }, { id: "venus", name: "venus", icon: "✨", ra: 23.50, dec: -3.5 } ];

