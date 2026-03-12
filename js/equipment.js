// equipment.js — Database attrezzatura, preset telescopio e sensore
// ============================================================

        const dbTelescopiBase = [
            // Obiettivi Fotografici
            { nome: "Samyang 135mm f/2", focale: 135, diametro: 67 },
            // Explore Scientific
            { nome: "Comethunter", focale: 731, diametro: 152 },
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

            // ── SONY IMX — Chip generici (usati da molti produttori) ──────────
            { nome: "Sony IMX178  (6.4MP  1/1.8\")",  w:  7.37, h:  4.92, p: 2.4  },
            { nome: "Sony IMX183  (20MP   1\")",       w: 13.2,  h:  8.8,  p: 2.4  },
            { nome: "Sony IMX290  (2MP    1/2.8\")",   w:  5.64, h:  3.17, p: 2.9  },
            { nome: "Sony IMX294  (11MP   4/3\")",     w: 19.1,  h: 13.0,  p: 4.63 },
            { nome: "Sony IMX432  (9MP    1\" sq)",    w: 12.8,  h: 10.7,  p: 9.0  },
            { nome: "Sony IMX462  (2MP    1/2.8\")",   w:  6.46, h:  4.72, p: 2.9  },
            { nome: "Sony IMX464  (8.3MP  4/3\")",     w:  9.55, h:  7.17, p: 2.9  },
            { nome: "Sony IMX485  (8.3MP  1\")",       w: 13.0,  h:  8.7,  p: 2.9  },
            { nome: "Sony IMX533  (9MP    1\" sq)",    w: 11.31, h: 11.31, p: 3.76 },
            { nome: "Sony IMX571  (26MP   APS-C)",     w: 23.5,  h: 15.7,  p: 3.76 },
            { nome: "Sony IMX585  (8.3MP  4/3\")",     w: 11.14, h:  6.26, p: 2.9  },
            { nome: "Sony IMX662  (4MP    1/2.8\")",   w:  7.68, h:  4.32, p: 2.9  },
            { nome: "Sony IMX715  (8MP    1/2.8\")",   w:  7.56, h:  5.35, p: 1.85 },
            { nome: "Sony IMX455  (61MP   FF)",        w: 36.0,  h: 24.0,  p: 3.76 },

            // ── ZWO ASI — Planetarie / EAA ────────────────────────────────────
            { nome: "ZWO ASI120MM/MC",                 w:  4.8,  h:  3.6,  p: 3.75 },
            { nome: "ZWO ASI174MM/MC",                 w: 11.3,  h:  7.1,  p: 5.86 },
            { nome: "ZWO ASI178MM/MC",                 w:  7.37, h:  4.92, p: 2.4  },
            { nome: "ZWO ASI224MC",                    w:  4.9,  h:  3.7,  p: 3.75 },
            { nome: "ZWO ASI290MM/MC",                 w:  5.64, h:  3.17, p: 2.9  },
            { nome: "ZWO ASI385MC",                    w:  7.4,  h:  4.16, p: 2.9  },
            { nome: "ZWO ASI462MC",                    w:  6.46, h:  4.72, p: 2.9  },
            { nome: "ZWO ASI662MC",                    w:  7.68, h:  4.32, p: 2.9  },
            { nome: "ZWO ASI715MC",                    w:  7.56, h:  5.35, p: 1.85 },

            // ── ZWO ASI — Deep Sky ────────────────────────────────────────────
            { nome: "ZWO ASI183MM/MC (1\")",           w: 13.2,  h:  8.8,  p: 2.4  },
            { nome: "ZWO ASI294MM/MC (4/3\")",         w: 19.1,  h: 13.0,  p: 4.63 },
            { nome: "ZWO ASI432MM",                    w: 12.8,  h: 10.7,  p: 9.0  },
            { nome: "ZWO ASI485MC",                    w: 13.0,  h:  8.7,  p: 2.9  },
            { nome: "ZWO ASI533MM/MC (sq)",            w: 11.31, h: 11.31, p: 3.76 },
            { nome: "ZWO ASI585MC",                    w: 11.14, h:  6.26, p: 2.9  },
            { nome: "ZWO ASI1600MM/MC (4/3\")",        w: 17.7,  h: 13.4,  p: 3.8  },
            { nome: "ZWO ASI2600MM/MC (APS-C)",        w: 23.5,  h: 15.7,  p: 3.76 },
            { nome: "ZWO ASI2400MC (FF)",              w: 35.9,  h: 23.9,  p: 5.94 },
            { nome: "ZWO ASI6200MM/MC (FF)",           w: 36.0,  h: 24.0,  p: 3.76 },

            // ── QHY ──────────────────────────────────────────────────────────
            { nome: "QHY163M/C (4/3\")",               w: 17.7,  h: 13.4,  p: 3.8  },
            { nome: "QHY183M/C (1\")",                 w: 13.2,  h:  8.8,  p: 2.4  },
            { nome: "QHY294M/C (4/3\")",               w: 19.1,  h: 13.0,  p: 4.63 },
            { nome: "QHY533M/C (1\" sq)",              w: 11.31, h: 11.31, p: 3.76 },
            { nome: "QHY268M/C (APS-C)",               w: 23.5,  h: 15.7,  p: 3.76 },
            { nome: "QHY485C (1\")",                   w: 13.0,  h:  8.7,  p: 2.9  },
            { nome: "QHY600M/C (FF)",                  w: 36.0,  h: 24.0,  p: 3.76 },
            { nome: "QHY128C (APS-C Canon)",           w: 22.3,  h: 14.9,  p: 4.3  },
            { nome: "QHY367C (FF)",                    w: 35.8,  h: 23.9,  p: 4.88 },

            // ── PlayerOne ────────────────────────────────────────────────────
            { nome: "PlayerOne Mars-C II (IMX662)",    w:  7.68, h:  4.32, p: 2.9  },
            { nome: "PlayerOne Neptune-C II (IMX464)", w:  9.55, h:  7.17, p: 2.9  },
            { nome: "PlayerOne Saturn-C/M (IMX183)",   w: 13.2,  h:  8.8,  p: 2.4  },
            { nome: "PlayerOne Uranus-C (IMX585)",     w: 11.14, h:  6.26, p: 2.9  },
            { nome: "PlayerOne Poseidon-C (IMX294)",   w: 19.1,  h: 13.0,  p: 4.63 },
            { nome: "PlayerOne Artemis-C/M (IMX571)",  w: 23.5,  h: 15.7,  p: 3.76 },
            { nome: "PlayerOne Ares-M (IMX432)",       w: 12.8,  h: 10.7,  p: 9.0  },
            { nome: "PlayerOne Apollo-M Max (IMX455)", w: 36.0,  h: 24.0,  p: 3.76 },

            // ── Atik ─────────────────────────────────────────────────────────
            { nome: "Atik 314L+ (ICX285)",             w:  6.5,  h:  4.8,  p: 4.65 },
            { nome: "Atik 383L+ (KAF-8300)",           w: 17.6,  h: 13.5,  p: 5.4  },
            { nome: "Atik 460EX (ICX694)",             w: 15.1,  h: 15.1,  p: 4.54 },
            { nome: "Atik Infinity",                   w:  5.7,  h:  4.28, p: 5.6  },
            { nome: "Atik Horizon (APS-C CMOS)",       w: 23.4,  h: 15.6,  p: 3.69 },
            { nome: "Atik 16200 (KAF-16200, FF)",      w: 35.8,  h: 23.9,  p: 6.0  },

            // ── Canon DSLR / Mirrorless ───────────────────────────────────────
            { nome: "Canon 450D/550D/600D/700D (APS-C)", w: 22.3, h: 14.9, p: 4.29 },
            { nome: "Canon 60Da (APS-C Astro)",        w: 22.3,  h: 14.9,  p: 4.3  },
            { nome: "Canon 7D MkII (APS-C)",           w: 22.4,  h: 15.0,  p: 4.09 },
            { nome: "Canon 90D (APS-C)",               w: 22.3,  h: 14.9,  p: 3.21 },
            { nome: "Canon 6D (FF)",                   w: 35.8,  h: 23.9,  p: 6.54 },
            { nome: "Canon 6D MkII (FF)",              w: 35.9,  h: 24.0,  p: 5.74 },
            { nome: "Canon Ra / EOS R (FF Astro)",     w: 35.9,  h: 24.0,  p: 4.39 },

            // ── Nikon DSLR ───────────────────────────────────────────────────
            { nome: "Nikon D3300/D5300/D5500 (APS-C)", w: 23.5,  h: 15.6,  p: 3.89 },
            { nome: "Nikon D7500 (APS-C)",             w: 23.5,  h: 15.7,  p: 4.22 },
            { nome: "Nikon D810A (FF Astro)",          w: 35.9,  h: 24.0,  p: 4.88 },
            { nome: "Nikon D850 (FF)",                 w: 35.9,  h: 23.9,  p: 4.35 },

            // ── Sony Mirrorless ──────────────────────────────────────────────
            { nome: "Sony A6000/A6100/A6400 (APS-C)",  w: 23.5,  h: 15.6,  p: 3.89 },
            { nome: "Sony A7 III / A7C (FF)",          w: 35.6,  h: 23.8,  p: 5.97 },
            { nome: "Sony A7R III / IV (FF HiRes)",    w: 35.7,  h: 23.8,  p: 4.51 },
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
                if (typeof aggiornaAI === 'function') aggiornaAI();
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
            'preset-telescope', 'preset-sensor', 'bortle-class'
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

