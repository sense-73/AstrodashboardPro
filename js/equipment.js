// equipment.js — Database attrezzatura, preset telescopio e sensore
// ============================================================

        const dbTelescopiBase = [
            // Obiettivi Fotografici
            { nome: "Samyang 135mm f/2", focale: 135, diametro: 67 },
            // ZWO
            { nome: "ZWO Seestar S50", focale: 250, diametro: 50 },
            { nome: "ZWO FF65 APO", focale: 416, diametro: 65 },
            // William Optics
            { nome: "WO RedCat 51", focale: 250, diametro: 51 },
            { nome: "WO RedCat 71", focale: 350, diametro: 71 },
            { nome: "WO ZenithStar 81", focale: 559, diametro: 81 },
            // Askar
            { nome: "Askar FMA180", focale: 180, diametro: 40 },
            { nome: "Askar FRA300 Pro", focale: 300, diametro: 60 },
            { nome: "Askar FRA400", focale: 400, diametro: 72 },
            { nome: "Askar FRA500", focale: 500, diametro: 90 },
            { nome: "Askar 107PHQ", focale: 749, diametro: 107 },
            // Sky-Watcher (Rifrattori & Newton)
            { nome: "SW Evoguide 50ED", focale: 242, diametro: 50 },
            { nome: "SW 72ED Evostar", focale: 420, diametro: 72 },
            { nome: "SW 80ED Evostar", focale: 600, diametro: 80 },
            { nome: "SW Esprit 80ED", focale: 400, diametro: 80 },
            { nome: "SW Esprit 100ED", focale: 550, diametro: 100 },
            { nome: "SW Esprit 120ED", focale: 840, diametro: 120 },
            { nome: "SW Explorer 130 PDS", focale: 650, diametro: 130 },
            { nome: "SW Explorer 150PDS", focale: 750, diametro: 150 },
            { nome: "SW Quattro 150P", focale: 600, diametro: 150 },
            { nome: "SW Quattro 200P", focale: 800, diametro: 200 },
            // Celestron
            { nome: "Celestron RASA 8", focale: 400, diametro: 203 },
            { nome: "Celestron RASA 11", focale: 620, diametro: 279 },
            { nome: "Celestron EdgeHD 8", focale: 2032, diametro: 203 },
            { nome: "Celestron EdgeHD 8 @ f/7", focale: 1422, diametro: 203 },
            { nome: "Celestron C8 SCT", focale: 2032, diametro: 203 },
            { nome: "Celestron C8 @ f/6.3", focale: 1280, diametro: 203 }
        ];

        const dbCamereBase = [
            { nome: "ASI 533MC/MM (Square)", w: 11.31, h: 11.31, p: 3.76 },
            { nome: "ASI 294MC/MM (4/3\")", w: 19.1, h: 13.0, p: 4.63 },
            { nome: "ASI 2600MC/MM (APS-C)", w: 23.5, h: 15.7, p: 3.76 },
            { nome: "SONY IMX571 (APS-C Gen)", w: 23.5, h: 15.7, p: 3.76 },
            { nome: "ASI 6200MC/MM (Full Frame)", w: 36.0, h: 24.0, p: 3.76 },
            { nome: "ASI 183MC/MM (1\")", w: 13.2, h: 8.8, p: 2.4 },
            { nome: "SONY IMX585", w: 11.14, h: 6.26, p: 2.9 },
            { nome: "ASI 1600MM (4/3\")", w: 17.7, h: 13.4, p: 3.8 },
            { nome: "Reflex APS-C (Canon/Nikon)", w: 22.3, h: 14.9, p: 4.3 }
        ];


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

