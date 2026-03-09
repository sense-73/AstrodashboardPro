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

            let errTxt = lang === 'it' ? "Inserisci prima una Focale e un Diametro validi nei campi sottostanti." :
                         lang === 'en' ? "Please enter a valid Focal Length and Aperture in the fields below." :
                         lang === 'es' ? "Ingresa primero una Focal y Diámetro válidos en los campos de abajo." :
                                         "请先在下方输入有效的焦距和口径。";
            if (!f || !d || isNaN(f) || isNaN(d)) { alert(errTxt); return; }

            // Popola info nella modal
            let infoEl = document.getElementById('save-telescope-info');
            if (infoEl) {
                let infoTxt = lang === 'it' ? `Focale: <strong>${f} mm</strong> &nbsp;·&nbsp; Diametro: <strong>${d} mm</strong>` :
                              lang === 'en' ? `Focal: <strong>${f} mm</strong> &nbsp;·&nbsp; Aperture: <strong>${d} mm</strong>` :
                              lang === 'es' ? `Focal: <strong>${f} mm</strong> &nbsp;·&nbsp; Diámetro: <strong>${d} mm</strong>` :
                                              `焦距: <strong>${f} mm</strong> &nbsp;·&nbsp; 口径: <strong>${d} mm</strong>`;
                infoEl.innerHTML = infoTxt;
            }

            // Pulisci e apri modal
            let nameEl = document.getElementById('save-telescope-name');
            if (nameEl) { nameEl.value = ''; }
            document.getElementById('save-telescope-modal').style.display = 'block';
            setTimeout(function() { if (nameEl) nameEl.focus(); }, 100);
        }

        function confermaSalvaTelescopio() {
            let f = document.getElementById('focal-length').value;
            let d = document.getElementById('aperture').value;
            let nome = (document.getElementById('save-telescope-name').value || '').trim();
            if (!nome) {
                document.getElementById('save-telescope-name').style.borderColor = '#ff4444';
                return;
            }
            document.getElementById('save-telescope-name').style.borderColor = '#555';
            document.getElementById('save-telescope-modal').style.display = 'none';

            let customTels = JSON.parse(localStorage.getItem('ad_custom_telescopes')) || [];
            customTels.push({ nome: nome, focale: parseInt(f), diametro: parseInt(d) });
            localStorage.setItem('ad_custom_telescopes', JSON.stringify(customTels));

            popolaMenuAttrezzatura();
            document.getElementById('preset-telescope').value = `${f},${d}`;
        }

        function apriEliminaTelescopio() {
            let customTels = JSON.parse(localStorage.getItem('ad_custom_telescopes')) || [];
            let list  = document.getElementById('delete-telescope-list');
            let empty = document.getElementById('delete-telescope-empty');
            list.innerHTML = '';

            if (!customTels.length) {
                list.style.display = 'none';
                empty.style.display = 'block';
            } else {
                list.style.display = 'flex';
                empty.style.display = 'none';
                customTels.forEach(function(tel, idx) {
                    let row = document.createElement('div');
                    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:#2a2a2a; border-radius:8px; padding:10px 14px; border-left:3px solid #bb86fc;';
                    row.innerHTML = `
                        <div>
                            <div style="color:#fff; font-weight:bold; font-size:0.9em;">⭐ ${tel.nome}</div>
                            <div style="color:#888; font-size:0.8em; margin-top:2px;">${tel.focale}mm &nbsp;·&nbsp; ⌀${tel.diametro}mm &nbsp;·&nbsp; f/${Math.round(tel.focale/tel.diametro)}</div>
                        </div>
                        <button class="btn-guide" style="margin:0; padding:5px 10px; border-color:#ff4444; color:#ff4444; flex-shrink:0;"
                            onclick="eliminaTelescopioCustom(${idx})">🗑️</button>
                    `;
                    list.appendChild(row);
                });
            }
            document.getElementById('delete-telescope-modal').style.display = 'block';
        }

        function eliminaTelescopioCustom(idx) {
            let customTels = JSON.parse(localStorage.getItem('ad_custom_telescopes')) || [];
            customTels.splice(idx, 1);
            localStorage.setItem('ad_custom_telescopes', JSON.stringify(customTels));
            popolaMenuAttrezzatura();
            apriEliminaTelescopio(); // ricarica lista aggiornata
        }

        // ── PERSISTENZA IMPOSTAZIONI STRUMENTO ───────────────────────────
        // Campi salvati: focale, diametro, sensore W/H/pixel, tipo sensore
        const AD_INSTRUMENT_FIELDS = [
            'focal-length', 'aperture',
            'sensor-width', 'sensor-height', 'pixel-size',
            'sensor-type',
            'preset-telescope', 'preset-sensor'
        ];

        function salvaImpostazioniStrumento() {
            let data = {};
            AD_INSTRUMENT_FIELDS.forEach(id => {
                let el = document.getElementById(id);
                if (el) data[id] = el.value;
            });
            localStorage.setItem('ad_instrument', JSON.stringify(data));
        }

        function ripristinaImpostazioniStrumento() {
            let saved = localStorage.getItem('ad_instrument');
            if (!saved) return;
            try {
                let data = JSON.parse(saved);
                AD_INSTRUMENT_FIELDS.forEach(id => {
                    let el = document.getElementById(id);
                    if (el && data[id] !== undefined) el.value = data[id];
                });
                // Ricalcola FOV e tempi con i valori ripristinati
                if (typeof aggiornaFOV === 'function') aggiornaFOV();
                if (typeof calcolaTempi === 'function') calcolaTempi();
            } catch(e) { localStorage.removeItem('ad_instrument'); }
        }

        // Aggancia il salvataggio automatico a tutti i campi strumento
        // (chiamato dopo il DOM ready dal DOMContentLoaded in multinight.js)
        function inizializzaPersistenzaStrumento() {
            ripristinaImpostazioniStrumento();
            AD_INSTRUMENT_FIELDS.forEach(id => {
                let el = document.getElementById(id);
                if (el) el.addEventListener('change', salvaImpostazioniStrumento);
                if (el) el.addEventListener('input', salvaImpostazioniStrumento);
            });
        }

