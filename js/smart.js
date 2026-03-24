// smart.js — Calcolatore Smart: AI predittivo, sequenza ottimale, filtri NINA
// ============================================================
function toggleLock(id) {
            let el = document.getElementById(id + '-lock');
            if (!el) return;
            const locked = el.dataset.locked === '1';
            if (!locked) {
                el.innerHTML = "<svg width='15' height='15' style='vertical-align:middle'><use href='#i-lock'/></svg>";
                el.dataset.locked = '1';
                el.style.opacity = '1';
                el.classList.add('locked');
            } else {
                el.innerHTML = "<svg width='15' height='15' style='vertical-align:middle'><use href='#i-lock-open'/></svg>";
                el.dataset.locked = '0';
                el.style.opacity = '0.4';
                el.classList.remove('locked');
            }
        }

        // Mostra/nasconde il dropdown filtro OSC e il campo nome NINA
        function aggiornaFiltroOSC() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let wrapSmart = document.getElementById('filter-osc-wrap');
            let wrapPro   = document.getElementById('pro-filter-osc-wrap');
            if (wrapSmart) wrapSmart.style.display = isM ? 'none' : 'inline-flex';
            if (wrapPro)   wrapPro.style.display   = isM ? 'none' : 'inline-flex';
            // Sincronizza i due dropdown
            let selSmart = document.getElementById('filter-osc-type');
            let selPro   = document.getElementById('pro-filter-osc-type');
            if (selSmart && selPro) selPro.value = selSmart.value;
            // Mostra/nascondi campi nome filtro NINA (Smart e PRO)
            let filterType = selSmart ? selSmart.value : 'none';
            let active = !isM && filterType !== 'none';
            let nameWrap    = document.getElementById('nina-osc-filter-name-wrap');
            let nameWrapPro = document.getElementById('pro-nina-osc-filter-name-wrap');
            if (nameWrap)    nameWrap.style.display    = active ? 'block' : 'none';
            if (nameWrapPro) nameWrapPro.style.display = active ? 'block' : 'none';
            // Carica valore salvato e sincronizza entrambi i campi
            let saved = localStorage.getItem('nina_osc_filter_name') || '';
            let nameInput    = document.getElementById('nina-osc-filter-name');
            let nameInputPro = document.getElementById('pro-nina-osc-filter-name');
            if (nameInput    && !nameInput.value)    nameInput.value    = saved;
            if (nameInputPro && !nameInputPro.value) nameInputPro.value = saved;
        }

        // ── Lookup pixel_size → {rn, qe} per il calcolo filtro ────────
        // Chiave: pixel_size arrotondato a 2 decimali
        const _sensorLookup = {
            '1.85': {rn:0.7,  qe:0.80, label:'IMX715 (~1.85µm)'},
            '2.00': {rn:0.7,  qe:0.80, label:'IMX678 (~2.0µm)'},
            '2.32': {rn:1.5,  qe:0.90, label:'IMX492 native (~2.315µm)'},
            '2.40': {rn:1.5,  qe:0.75, label:'IMX178/183 (~2.4µm)'},
            '2.90': {rn:0.8,  qe:0.80, label:'IMX290/585 (~2.9µm)'},
            '3.21': {rn:1.0,  qe:0.80, label:'IMX561 (~3.2µm)'},
            '3.69': {rn:1.2,  qe:0.78, label:'Atik Horizon (~3.7µm)'},
            '3.75': {rn:1.5,  qe:0.80, label:'ASI120/224 (~3.75µm)'},
            '3.76': {rn:1.3,  qe:0.80, label:'IMX571/455/533 (~3.76µm)'},
            '3.80': {rn:1.8,  qe:0.75, label:'IMX183/1600 (~3.8µm)'},
            '3.89': {rn:2.0,  qe:0.65, label:'Nikon/Sony APS-C (~3.9µm)'},
            '4.09': {rn:2.0,  qe:0.65, label:'Canon 7D (~4.1µm)'},
            '4.22': {rn:2.0,  qe:0.65, label:'Nikon D7500 (~4.2µm)'},
            '4.29': {rn:2.0,  qe:0.65, label:'Canon DSLR (~4.3µm)'},
            '4.30': {rn:2.5,  qe:0.60, label:'Canon 60Da (~4.3µm)'},
            '4.35': {rn:2.0,  qe:0.65, label:'Nikon D850 (~4.4µm)'},
            '4.39': {rn:2.0,  qe:0.65, label:'Canon Ra (~4.4µm)'},
            '4.51': {rn:2.0,  qe:0.65, label:'Sony A7R (~4.5µm)'},
            '4.54': {rn:2.0,  qe:0.65, label:'Atik 460EX (~4.5µm)'},
            '4.63': {rn:1.2,  qe:0.75, label:'IMX294 (~4.63µm)'},
            '4.65': {rn:2.5,  qe:0.60, label:'Atik 314L+ (~4.65µm)'},
            '4.88': {rn:2.0,  qe:0.65, label:'QHY367C (~4.9µm)'},
            '5.40': {rn:2.5,  qe:0.60, label:'Atik 383L+ (~5.4µm)'},
            '5.60': {rn:2.5,  qe:0.60, label:'Atik Infinity (~5.6µm)'},
            '5.74': {rn:2.0,  qe:0.65, label:'Canon 6D MkII (~5.7µm)'},
            '5.86': {rn:2.5,  qe:0.65, label:'IMX174 (~5.9µm)'},
            '5.94': {rn:2.5,  qe:0.60, label:'ZWO ASI2400/DSLR FF (~5.9µm)'},
            '5.97': {rn:2.0,  qe:0.65, label:'Sony A7 III (~6.0µm)'},
            '6.00': {rn:2.5,  qe:0.60, label:'Atik 16200 (~6.0µm)'},
            '6.54': {rn:2.5,  qe:0.60, label:'Canon 6D (~6.5µm)'},
            '9.00': {rn:3.0,  qe:0.55, label:'IMX432 (~9.0µm)'},
        };

        function getSensorParams() {
            let px  = parseFloat((document.getElementById('pixel-size')||{}).value) || 3.76;
            let key = px.toFixed(2);
            // Cerca corrispondenza esatta, poi la più vicina
            let entry = _sensorLookup[key];
            if (!entry) {
                let best = null, bestDiff = 99;
                Object.keys(_sensorLookup).forEach(k => {
                    let diff = Math.abs(parseFloat(k) - px);
                    if (diff < bestDiff) { bestDiff = diff; best = k; }
                });
                entry = _sensorLookup[best] || {rn:2.0, qe:0.70, label:'Sensore (~'+px+'µm)'};
            }
            // Leggi anche il nome dal preset-sensor se disponibile
            let presetEl = document.getElementById('preset-sensor');
            let sensorName = entry.label;
            if (presetEl && presetEl.selectedIndex > 0) {
                sensorName = presetEl.options[presetEl.selectedIndex].text.replace('⭐ ','');
            }
            return { rn: entry.rn, qe: entry.qe, px, label: sensorName };
        }

        // ── Database flusso Bortle OSC (e/px/s, f/5, QE 80%, px 3.8µm) ─
        const _bortleFluxOSC = {1:0.013,2:0.027,3:0.05,4:0.10,5:0.20,6:0.40,7:0.83,8:1.67,9:3.33};

        // ── Modal Filtro OSC ──────────────────────────────────────────
        function apriModalFiltroOSC() {
            let modal = document.getElementById('filter-osc-modal');
            if (!modal) return;
            let bortle = (document.getElementById('bortle-class')||{}).value || '5';
            let fL = parseFloat((document.getElementById('focal-length')||{}).value)||400;
            let ap = parseFloat((document.getElementById('aperture')||{}).value)||72;
            let fR = (fL/ap).toFixed(1);
            document.getElementById('foctx-bortle').textContent = 'Bortle ' + bortle;
            document.getElementById('foctx-fratio').textContent = 'f/' + fR;
            let curType  = (document.getElementById('filter-osc-type')||{}).value || 'none';
            let curBw    = localStorage.getItem('filter_osc_bw') || (curType==='quad'?'20':'14');
            let curDb    = localStorage.getItem('filter_osc_db') || 'none';
            let typeEl   = document.getElementById('filter-modal-type');
            let bwEl     = document.getElementById('filter-modal-bw');
            let sensEl   = document.getElementById('filter-modal-sensor');
            let dbEl     = document.getElementById('filter-db-select');
            if (typeEl) typeEl.value = curType;
            if (bwEl)   bwEl.value  = curBw;
            if (dbEl)   { try { dbEl.value = curDb; } catch(e){} }
            // Sincronizza sensore dal FOV (pixel-size)
            if (sensEl) {
                let fovPx = parseFloat((document.getElementById('pixel-size')||{}).value)||3.76;
                let curSens = localStorage.getItem('filter_osc_sensor') || '';
                // Prova prima il valore salvato, poi cerca corrispondenza per pixel size
                let matched = false;
                if (curSens) { try { sensEl.value = curSens; matched = sensEl.value === curSens; } catch(e){} }
                if (!matched) {
                    for (let opt of sensEl.options) {
                        if (opt.value !== 'custom') {
                            let p = opt.value.split('|');
                            if (Math.abs(parseFloat(p[1]) - fovPx) < 0.01) { sensEl.value = opt.value; break; }
                        }
                    }
                }
            }
            // Ripristina campo nome NINA nel modal
            let ninaModalEl = document.getElementById('nina-osc-filter-name-modal');
            if (ninaModalEl) ninaModalEl.value = localStorage.getItem('nina_osc_filter_name') || '';
            // Aggiorna display sensore dal FOV
            aggiornaDisplaySensore();
            aggiornaVisibilitaTipoBw();
            aggiornaCalcoloFiltro();
            modal.style.display = 'flex';
        }

        function chiudiModalFiltroOSC() {
            let modal = document.getElementById('filter-osc-modal');
            if (modal) modal.style.display = 'none';
        }

        function aggiornaDisplaySensore() {
            let sp = getSensorParams();
            let dispEl = document.getElementById('filter-sensor-display');
            let infoEl = document.getElementById('filter-sensor-info');
            if (dispEl) dispEl.textContent = sp.label;
            if (infoEl) infoEl.textContent = 'Read noise: ~'+sp.rn+' e⁻  |  Pixel: '+sp.px+' µm  |  QE Ha: ~'+Math.round(sp.qe*100)+'%';
        }

        function aggiornaVisibilitaTipoBw() {
            let dbEl   = document.getElementById('filter-db-select');
            let typeRow = document.getElementById('filter-type-row');
            if (!dbEl || !typeRow) return;
            let isCustom = (dbEl.value === 'custom');
            typeRow.style.display = isCustom ? 'block' : 'none';
        }

        function selezionaFiltroDB() {
            let dbEl   = document.getElementById('filter-db-select');
            let typeEl = document.getElementById('filter-modal-type');
            let bwEl   = document.getElementById('filter-modal-bw');
            if (!dbEl) return;
            let val = dbEl.value;
            if (val === 'none') {
                if (typeEl) typeEl.value = 'none';
            } else if (val !== 'custom') {
                let parts = val.split('|');
                if (parts.length >= 2) {
                    if (typeEl) typeEl.value = parts[0];
                    if (bwEl)   bwEl.value   = parts[1];
                }
            }
            aggiornaVisibilitaTipoBw();
            aggiornaCalcoloFiltro();
        }

        function onBwManualInput() {
            // Se l'utente modifica i nm manualmente → passa a "Personalizzato"
            let dbEl = document.getElementById('filter-db-select');
            if (dbEl && dbEl.value !== 'none' && dbEl.value !== 'custom') {
                dbEl.value = 'custom';
                aggiornaVisibilitaTipoBw();
            }
            aggiornaCalcoloFiltro();
        }

        // Rileva se il filtro selezionato è OIII+SII (segnale più debole di Ha+OIII)
        function isOIIISIIFilter() {
            let dbEl = document.getElementById('filter-db-select');
            if (!dbEl) return false;
            let v = dbEl.value || '';
            return v.includes('SII+OIII') || v.includes('OIII+SII') || v.includes('L-Synergy') || v.includes('ALP-T SII');
        }

        function aggiornaCalcoloFiltro() {
            let typeEl = document.getElementById('filter-modal-type');
            let bwEl   = document.getElementById('filter-modal-bw');
            let resEl  = document.getElementById('filter-tmin-result');
            let noteEl = document.getElementById('filter-tmin-note');
            let warnEl = document.getElementById('filter-fratio-warn');
            let infoEl = document.getElementById('filter-sensor-info');
            if (!typeEl || !bwEl || !resEl) return;
            let filterType = typeEl.value;
            let bw  = parseFloat(bwEl.value) || 14;
            let bortle = parseInt((document.getElementById('bortle-class')||{}).value||5);
            let fL = parseFloat((document.getElementById('focal-length')||{}).value)||400;
            let ap = parseFloat((document.getElementById('aperture')||{}).value)||72;
            let fR = fL / ap;
            let sp2 = getSensorParams();
            let rn = sp2.rn, px = sp2.px, qe = sp2.qe;
            aggiornaDisplaySensore();
            // Filtri OIII+SII: SII è 3-5x più debole di Ha → flux ridotto del 40% (fattore conservativo)
            let _oiiisiiCorr = isOIIISIIFilter() ? 0.60 : 1.0;
            if (filterType === 'none') {
                if (resEl)  resEl.textContent  = '—';
                if (noteEl) noteEl.textContent = '';
                if (warnEl) warnEl.style.display = 'none';
                return;
            }
            let baseFlux  = _bortleFluxOSC[bortle] || 0.20;
            let filterRed = bw / 300;
            let pixCorr   = Math.pow(px / 3.8, 2);
            let flux      = baseFlux * (1 / Math.pow(fR,2)) * filterRed * qe * pixCorr;
            let fRCorr    = fR<=2?1.6:fR<=3?1.22:fR<=4?1.12:1.0;
            flux = flux / fRCorr;
            // Filtri OIII+SII: SII tipicamente 3-5x più debole di Ha → posa più conservativa
            if (isOIIISIIFilter()) flux = flux * 0.60;
            let tMin = flux > 0 ? Math.round((10 * rn * rn) / flux) : 600;
            tMin = Math.max(60, Math.min(3600, tMin));
            let tStr = tMin >= 60 ? Math.round(tMin/60)+' min' : tMin+' sec';
            if (resEl)  resEl.textContent  = tStr;
            if (noteEl) noteEl.textContent = '(Bortle '+bortle+', f/'+fR.toFixed(1)+', '+bw+'nm)';
            if (warnEl) {
                if (fR <= 4 && bw <= 7) {
                    warnEl.style.display = 'block';
                    warnEl.textContent   = '⚠ ' + t('filter_warn_fratio');
                } else {
                    warnEl.style.display = 'none';
                }
            }
        }

        function applicaFiltroOSC() {
            let typeEl = document.getElementById('filter-modal-type');
            let bwEl   = document.getElementById('filter-modal-bw');
            let dbEl   = document.getElementById('filter-db-select');
            if (!typeEl) return;
            let filterType = typeEl.value;
            let bw    = bwEl ? bwEl.value : '14';
            let dbVal = dbEl ? dbEl.value : 'none';
            // Nome da mostrare sul pulsante
            let filterName = t('filter_osc_none');
            if (filterType !== 'none') {
                if (dbVal !== 'none' && dbVal !== 'custom') {
                    let parts = dbVal.split('|');
                    filterName = (parts[2] || '').replace(/-/g,' ') || (filterType==='dual'?t('filter_osc_dual'):t('filter_osc_quad'));
                } else if (dbVal === 'custom') {
                    filterName = t('filter_osc_custom');
                } else {
                    filterName = filterType==='dual' ? t('filter_osc_dual') : t('filter_osc_quad');
                }
            }
            // Aggiorna hidden inputs e label pulsanti
            ['filter-osc-type','pro-filter-osc-type'].forEach(id => {
                let el = document.getElementById(id); if (el) el.value = filterType;
            });
            ['filter-osc-label','pro-filter-osc-label'].forEach(id => {
                let el = document.getElementById(id); if (el) el.textContent = filterName;
            });
            // Colore pulsanti
            let smartBtn = document.getElementById('filter-osc-btn');
            let proBtn   = document.getElementById('pro-filter-osc-btn');
            let active   = filterType !== 'none';
            if (smartBtn) { smartBtn.style.borderColor = active?'#c49a3c':'#6e7a8a'; smartBtn.style.color = active?'#c49a3c':'#6e7a8a'; }
            if (proBtn)   { proBtn.style.borderColor   = active?'#00c6ff':'#6e7a8a'; proBtn.style.color   = active?'#00c6ff':'#6e7a8a'; }
            // Salva in localStorage
            localStorage.setItem('filter_osc_bw',  bw);
            localStorage.setItem('filter_osc_db',     dbVal);
            // Salva nome NINA dal campo del modal
            let ninaModalEl = document.getElementById('nina-osc-filter-name-modal');
            let ninaEl      = document.getElementById('nina-osc-filter-name');
            let ninaVal     = ninaModalEl ? ninaModalEl.value.trim() : '';
            // Se il campo modal è vuoto e c'è un filtro DB, usa il nome del filtro
            if (!ninaVal && filterType !== 'none' && dbVal !== 'none' && dbVal !== 'custom') {
                let parts = dbVal.split('|');
                ninaVal = parts[2] || '';
            }
            if (ninaEl) ninaEl.value = ninaVal;
            localStorage.setItem('nina_osc_filter_name', ninaVal);
            chiudiModalFiltroOSC();
            aggiornaFiltroOSC();
            calcolaTempi();
        }

                function toggleSensorMode() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let c = document.getElementById('frames-container'); c.innerHTML = '';
            let filterWarning = document.getElementById('nina-filter-warning');
            if (filterWarning) filterWarning.style.display = isM ? 'block' : 'none';

            // Header colonne
            let header = document.createElement('div');
            header.id = 'smart-grid-header';
            header.style.cssText = 'display:grid; grid-template-columns: 2fr 0.7fr 0.9fr 0.7fr 0.7fr 0.7fr 1fr 0.9fr; gap:4px; font-size:0.75em; color:#aaa; text-align:center; border-bottom:1px solid #444; padding-bottom:5px; margin-bottom:6px;';
            header.innerHTML = '<div style="text-align:left;">Filtro</div><div>Pose</div><div>Secs</div>'
                + '<div>Gain</div><div>Offset</div><div>Bin</div><div>Dither</div><div style="text-align:right;">Totale</div>';
            c.appendChild(header);

            (isM ? framesMono : framesColor).forEach(f => {
                let isL  = !f.id.includes('dark') && !f.id.includes('bias');
                let isDk = f.id.includes('dark');
                let isBs = f.id.includes('bias');

                let r = document.createElement('div');
                r.style.cssText = `display:grid; grid-template-columns: 2fr 0.7fr 0.9fr 0.7fr 0.7fr 0.7fr 1fr 0.9fr; gap:4px; align-items:center; background:#222; padding:6px 6px; border-radius:5px; border-left:3px solid #555; margin-bottom:6px;`;
                r.className = f.class;
                r.dataset.smartRow = '1';

                // Checkbox + nome filtro
                let savedLabelName = localStorage.getItem('nina_filter_' + f.id) || f.name;
                let nameCell = isL
                    ? `<div style="display:flex;align-items:center;gap:6px;"><input type="checkbox" id="${f.id}-check" checked style="transform:scale(1.2);cursor:pointer;" onchange="calcolaTempi()"><label id="${f.id}-label" style="color:#fff;font-weight:bold;font-size:0.9em;cursor:pointer;" onclick="document.getElementById('${f.id}-check').click()">${savedLabelName}</label></div>`
                    : `<div style="display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:18px;"></span><label id="${f.id}-label" style="color:#aaa;font-size:0.9em;">${savedLabelName}</label></div>`;

                // Valore default exp: Dark = segue il primo Light, Bias = 0
                let defGain = isBs ? '0' : 'Auto';
                let expInput = isDk
                    ? `<input type="number" id="${f.id}-exp" data-is-dark="1" value="${f.dE}" min="0" oninput="calcolaTempi()" style="width:100%!important;text-align:center;padding:3px!important;">`
                    : isBs
                    ? `<input type="number" id="${f.id}-exp" value="0" min="0" oninput="calcolaTempi()" style="width:100%!important;text-align:center;padding:3px!important;">`
                    : `<div style="display:flex;align-items:center;gap:3px;">
                           <input type="number" id="${f.id}-exp" value="${f.dE}" min="0" oninput="sincronizzaDarkDaLight();calcolaTempi()" style="width:48px!important;text-align:center;padding:3px!important;flex:1;">
                           <span id="${f.id}-lock" onclick="toggleLock('${f.id}')" title="Blocca secondi" style="cursor:pointer;opacity:0.4;user-select:none;line-height:1;display:inline-flex;align-items:center;" data-locked="0"><svg width="15" height="15" style="vertical-align:middle"><use href="#i-lock-open"/></svg></span>
                       </div>`;

                // HDR cell: colonna dedicata, nascosta di default in Smart
                let hdrCell = isL
                    ? `<input type="number" id="${f.id}-hdr" value="" placeholder="—" min="0" oninput="calcolaTempi()"
                         style="width:100%!important;text-align:center;padding:3px!important;
                         color:#bb86fc;background:#1a1015;border:1px solid #3a2050;border-radius:3px;
                         display:none;" title="Secondi esposizione breve HDR">`
                    : `<div style="color:#555;text-align:center;display:none;">—</div>`;

                // Dither: solo sui Light
                let ditherCell = isL
                    ? `<div style="display:flex;align-items:center;gap:3px;justify-content:center;"><input type="checkbox" id="${f.id}-dither" checked style="transform:scale(1.1);cursor:pointer;"><input type="number" id="${f.id}-dfreq" value="4" min="1" style="width:32px!important;padding:2px!important;text-align:center;" oninput="calcolaTempi()"></div>`
                    : `<div style="color:#555;text-align:center;">—</div>`;

                r.innerHTML = `
                    ${nameCell}
                    <input type="number" id="${f.id}-count" value="${f.dC}" min="0" oninput="calcolaTempi()" style="width:100%!important;text-align:center;padding:3px!important;">
                    ${expInput}
                    <input type="text" id="${f.id}-gain" value="${defGain}" style="width:100%!important;text-align:center;padding:3px!important;">
                    <input type="text" id="${f.id}-offset" value="Auto" style="width:100%!important;text-align:center;padding:3px!important;">
                    <select id="${f.id}-bin" style="width:100%!important;padding:3px!important;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option><option value="4">4x4</option>
                    </select>
                    ${ditherCell}
                    <div class="calc-total" id="${f.id}-tot" style="text-align:right;">0h 0m</div>
                `;
                c.appendChild(r);
                // ── Riga companion Light HDR ─────────────────────────────────────
                if (isL) {
                    let hdrR = document.createElement('div');
                    hdrR.id = `${f.id}-hdr-row`;
                    hdrR.dataset.smartHdrRow = '1';
                    hdrR.style.cssText = 'display:none; grid-template-columns: 2fr 0.7fr 0.9fr 0.7fr 0.7fr 0.7fr 1fr 0.9fr; gap:4px; align-items:center; background:#1a0d2e; padding:5px 6px 5px 24px; border-radius:5px; border-left:3px solid #7c4dff; margin-bottom:6px; margin-top:-2px;';
                    hdrR.innerHTML = `
                        <div style="display:flex;align-items:center;gap:4px;">
                            <span style="color:#bb86fc;font-size:0.82em;font-weight:bold;">✦ Light HDR</span>
                            <span class="info-icon" style="font-size:1.0em;margin-left:2px;cursor:help;" onmouseenter="mostraTooltip(this,'info_hdr_row')" onmouseleave="nascondiTooltip()">ℹ️</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:3px;">
                            <input type="number" id="${f.id}-hdr-count" value="0" min="0" oninput="calcolaTempi()" style="width:100%!important;text-align:center;padding:3px!important;background:#1a0d2e;color:#bb86fc;border:1px solid #3a2050;">
                            <span id="${f.id}-hdr-count-lock" onclick="toggleLock('${f.id}-hdr-count')" title="Blocca pose HDR" style="cursor:pointer;opacity:0.4;user-select:none;line-height:1;display:inline-flex;align-items:center;" data-locked="0"><svg width="15" height="15" style="vertical-align:middle"><use href="#i-lock-open"/></svg></span>
                        </div>
                        <div style="display:flex;align-items:center;gap:3px;">
                            <input type="number" id="${f.id}-hdr-exp" value="" placeholder="s" min="0" oninput="calcolaTempi()" style="width:48px!important;text-align:center;padding:3px!important;flex:1;color:#bb86fc;background:#1a0d2e;border:1px solid #3a2050;">
                            <span id="${f.id}-hdr-exp-lock" onclick="toggleLock('${f.id}-hdr-exp')" title="Blocca secondi HDR" style="cursor:pointer;opacity:0.4;user-select:none;line-height:1;display:inline-flex;align-items:center;" data-locked="0"><svg width="15" height="15" style="vertical-align:middle"><use href="#i-lock-open"/></svg></span>
                        </div>
                        <input type="text" id="${f.id}-hdr-gain" value="Auto" style="width:100%!important;text-align:center;padding:3px!important;background:#1a0d2e;border:1px solid #3a2050;">
                        <input type="text" id="${f.id}-hdr-offset" value="Auto" style="width:100%!important;text-align:center;padding:3px!important;background:#1a0d2e;border:1px solid #3a2050;">
                        <select id="${f.id}-hdr-bin" style="width:100%!important;padding:3px!important;background:#1a0d2e;border:1px solid #3a2050;">
                            <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option><option value="4">4x4</option>
                        </select>
                        <div style="display:flex;align-items:center;gap:3px;justify-content:center;">
                            <input type="checkbox" id="${f.id}-hdr-dither" checked style="transform:scale(1.1);cursor:pointer;" onchange="calcolaTempi()">
                            <input type="number" id="${f.id}-hdr-dfreq" value="4" min="1" style="width:32px!important;padding:2px!important;text-align:center;background:#1a0d2e;border:1px solid #3a2050;" oninput="calcolaTempi()">
                        </div>
                        <div class="calc-total" id="${f.id}-hdr-tot" style="text-align:right;color:#bb86fc;">—</div>
                    `;
                    c.appendChild(hdrR);
                }
            });

            // Sincronizza Dark exp = primo Light exp (dinamico)
            sincronizzaDarkExp();
            aggiornaFiltriNina();

            // Propaga il BIN attivo ai nuovi select appena creati
            let _activeBin = document.querySelector('.bin-btn.bin-active');
            if (_activeBin) selezionaBIN(parseInt(_activeBin.dataset.bin));
        }

        function sincronizzaDarkExp() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let firstLightId = isM ? 'm-l' : 'c-light';
            let darkId = isM ? 'm-dark' : 'c-dark';
            let lightExp = document.getElementById(`${firstLightId}-exp`);
            let darkExp  = document.getElementById(`${darkId}-exp`);
            if (!lightExp || !darkExp) return;
            darkExp.value = lightExp.value;
            // Aggancia evento: quando Light cambia, aggiorna Dark
            lightExp.addEventListener('input', () => { darkExp.value = lightExp.value; calcolaTempi(); });
        }

        // Mostra/nasconde le righe companion HDR nella griglia Smart
        function aggiornaRigheHDR(hdrExp) {
            let show = hdrExp > 0;
            let isM = document.getElementById('sensor-type').value === 'mono';
            (isM ? framesMono : framesColor).forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let hdrRow = document.getElementById(`${f.id}-hdr-row`);
                if (!hdrRow) return;
                hdrRow.style.display = show ? 'grid' : 'none';
                if (show && hdrExp > 0) {
                    let expEl = document.getElementById(`${f.id}-hdr-exp`);
                    let expLock = document.getElementById(`${f.id}-hdr-exp-lock`);
                    if (expEl && (!expLock || !expLock.classList.contains('locked'))) {
                        expEl.value = hdrExp;
                    }
                }
            });
            calcolaTempi();
            if (typeof aggiornaFiltroOSC === 'function') aggiornaFiltroOSC();
        }

        function sincronizzaDarkDaLight() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let firstLightId = isM ? 'm-l' : 'c-light';
            let darkId = isM ? 'm-dark' : 'c-dark';
            let lightExp = document.getElementById(`${firstLightId}-exp`);
            let darkExp  = document.getElementById(`${darkId}-exp`);
            if (lightExp && darkExp) darkExp.value = lightExp.value;
        }

        function aggiornaAI() {
            if(!targetSelezionato) return;
            let panel = document.getElementById('ai-advisor-panel'); if(!panel) return;
            panel.style.display = 'block';

            let nameID = targetSelezionato.id || targetSelezionato.name;
            let tipoNomeReport = document.getElementById('stat-type').innerText;

            // 1. RILEVAMENTO CATEGORIA (identico a generaSequenzaOttimale e fov.js)
            let _objNameAI = (targetSelezionato.name || '').toUpperCase();
            let _nAI = _objNameAI.replace(/\s+/g, '');
            let _tLowAI = targetSelezionato.type ? targetSelezionato.type.toLowerCase() : '';
            let _catAI = null;
            if (_nAI.startsWith('SH2') || _objNameAI.startsWith('SH 2-')) _catAI = 'sh2';
            else if (_nAI.startsWith('LBN')) _catAI = 'lbn';
            else if (_nAI.startsWith('LDN')) _catAI = 'ldn';
            else if (_nAI.startsWith('VDB')) _catAI = 'vdb';
            else if (_tLowAI.includes('supernova') || _tLowAI.includes('snr')) _catAI = 'snr';
            else if (_tLowAI.includes('planetari') || _tLowAI.includes('planetary')) _catAI = 'planetaria';
            else if (_tLowAI.includes('galassi') || _tLowAI.includes('galaxy')) _catAI = 'galassia';
            else if (_tLowAI.includes('globulare') || _tLowAI.includes('globular')) _catAI = 'globulare';
            else if (_tLowAI.includes('aperto') || _tLowAI.includes('open cluster')) _catAI = 'aperto';
            else if (_tLowAI.includes('h ii') || _tLowAI.includes('emissio') || _tLowAI.includes('emission')) _catAI = 'hii';
            else if (_tLowAI.includes('riflessione') || _tLowAI.includes('reflection')) _catAI = 'vdb';
            else if (_tLowAI.includes('oscura') || _tLowAI.includes('dark')) _catAI = 'ldn';

            // Emissione = categoria che non beneficia del moltiplicatore narrowband
            let isEmission = ['sh2','lbn','hii','snr','planetaria'].includes(_catAI);

            // Tabella bH per categoria — valori calibrati sui consigli tattici
            const _catBhMap = {
                sh2: 12, lbn: 8, ldn: 20, vdb: 6, snr: 10,
                hii: 6, galassia: 4, planetaria: 1, globulare: 1, aperto: 0.5
            };

            // 2. TEMPI BASE
            let bH = 4; // Default categoria sconosciuta
            let _catUnknown = (_catAI === null);

            if (dsoVIP[nameID]) {
                bH = dsoVIP[nameID].hours;
                tipoNomeReport = tipoNomeReport + ' (VIP)';
            } else if (_catAI !== null) {
                bH = _catBhMap[_catAI];
            }

            // 3. COMPENSAZIONE MAGNITUDINE (+1h / -1h per punto, base 6.0)
            let mVal = 6.0;
            if (targetSelezionato.mag && targetSelezionato.mag !== "N/D" && targetSelezionato.mag !== "--") {
                let mMatch = targetSelezionato.mag.toString().match(/([+\-]?\d+\.?\d*)/);
                if (mMatch) mVal = parseFloat(mMatch[1]);
            }
            let magAdjustment = (mVal - 6.0);
            let subT = Math.max(0.5, bH + magAdjustment);

            // 3. RAPPORTO FOCALE DELL'UTENTE
            let fL = parseFloat(document.getElementById('focal-length').value)||400;
            let ap = parseFloat(document.getElementById('aperture').value)||72;
            let fR = fL / ap;
            let fFact = Math.pow(fR / 4.0, 2);

            // 4. MOLTIPLICATORE NARROWBAND 
            let isM = document.getElementById('sensor-type').value === 'mono';
            let doingN = false;
            if(isM) {
                let checkHa = document.getElementById('m-ha-check');
                let checkO3 = document.getElementById('m-oiii-check');
                let checkS2 = document.getElementById('m-sii-check');
                if ((checkHa && checkHa.checked) || (checkO3 && checkO3.checked) || (checkS2 && checkS2.checked)) { doingN = true; }
            }
            // Filtro OSC dual/quad-band
            let filterOscType = (document.getElementById('filter-osc-type')||{value:'none'}).value;
            let doingOscNB = !isM && (filterOscType === 'dual' || filterOscType === 'quad');
            let doingOIIISII = doingOscNB && isOIIISIIFilter();
            let sFact = (doingN && !isEmission) ? 2.0 : 1.0;

            // 5. INQUINAMENTO LUNARE EFFETTIVO
            // Usa val-luna (già calcolato da weather.js: fase × sin(altitudine))
            // Ignora le ore in cui la Luna è sotto l'orizzonte — nessuna penalità ingiustificata.
            let lunaEl = document.getElementById('val-luna');
            let inqLuna = lunaEl ? (parseInt(lunaEl.innerText) || 0) : 0;
            let mFact = 1.0;
            if(!doingN) {
                if(inqLuna > 30 && inqLuna <= 70) mFact = 1.5;
                else if(inqLuna > 70) mFact = 2.0;
            }

            // 6. PENALITÀ INQUINAMENTO LUMINOSO (Bortle)
            // Calibrazione: bH è espresso per Bortle 5 (suburbano, default).
            // Per Bortle < 5 si riduce il tempo, per Bortle > 5 si aumenta progressivamente.
            // Per target a emissione (sh2, snr, hii…) con narrowband attivo la penalità è attenuata
            // perché Ha/OIII isolano le righe spettrali scavalcando buona parte del fondo cielo.
            let bortle = parseInt((document.getElementById('bortle-class')||{}).value||5);
            const _lpFactBB = {1:0.6, 2:0.7, 3:0.85, 4:0.95, 5:1.0, 6:1.4, 7:1.9, 8:2.5, 9:3.0};
            const _lpFactNB = {1:0.6, 2:0.7, 3:0.85, 4:0.95, 5:1.0, 6:1.1, 7:1.3, 8:1.5, 9:1.8};
            // narrowband attivo = mono con filtri NB OPPURE OSC con filtro dual/quad-band
            let usingNarrowband = doingN || doingOscNB;
            // Con filtro OSC dual/quad il comportamento Bortle è sempre narrowband
            let lpFact = (usingNarrowband) ? (_lpFactNB[bortle]||1.0) : (_lpFactBB[bortle]||1.0);
            let lpApplied = (bortle !== 5); // flag per il messaggio

            // 7. CALCOLO FINALE 
            let totId = subT * sFact * mFact * lpFact * fFact;
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            let panels = 1;
            if (isMosaic) {
                panels = (parseInt(document.getElementById('mosaic-x').value)||1) * (parseInt(document.getElementById('mosaic-y').value)||1);
                totId *= panels;
            }

            // Soglie sconsiglio: oltre questi valori il progetto è fuori portata per una pianificazione normale
            const _sogliaBB = 50;  // ore — target broadband
            const _sogliaNB = 70;  // ore — target narrowband/emissione con filtro
            let totIdSenzaLP = subT * sFact * mFact * fFact; // stima senza penalità Bortle (per confronto)
            let isImpraticabile = false;
            // Sconsiglio se ANCHE con narrowband si supera la soglia, OPPURE se broadband supera soglia BB
            if (!isEmission && totId > _sogliaBB) isImpraticabile = true;
            if (isEmission && !usingNarrowband && totId > _sogliaBB) isImpraticabile = true;
            if (isEmission && usingNarrowband && totId > _sogliaNB) isImpraticabile = true;

            // Stima "con filtro narrowband consigliato" (per il messaggio quando NB non è attivo)
            let totIdConNB = (isEmission && !usingNarrowband)
                ? subT * sFact * mFact * (_lpFactNB[bortle]||1.0) * fFact
                : null;
            let nbSogliaSuperata = totIdConNB !== null && totIdConNB > _sogliaNB;

            oreNecessarieGlobali = isImpraticabile ? 9999 : totId;

            // 7. TEMPO DISPONIBILE STANOTTE
            let tS = document.getElementById('time-start').value, tE = document.getElementById('time-end').value, aS = 0;
            if(tS && tE && tS !== tE) { 
                let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`); 
                if (dE <= dS) dE.setDate(dE.getDate() + 1); 
                aS = (dE - dS) / 3600000; 
            }

            // 8. RENDER DEL REPORT GIUSTIFICATIVO MULTI-NOTTE
            let html = `<h4 style="margin:0 0 10px 0; color:#ffaa00; border-bottom:1px solid #333; padding-bottom:5px; display:flex; align-items:center; justify-content:space-between;"><span style="display:inline-flex;align-items:center;gap:8px;"><svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" /></svg>${t("ai_strat_title")}</span> <span class="info-icon" style="font-size: 0.9em; font-weight:normal;" onmouseenter="mostraTooltip(this, 'info_strat_analysis')" onmouseleave="nascondiTooltip()">ℹ️</span></h4>`;

            // Avviso categoria sconosciuta
            if (_catUnknown && !dsoVIP[nameID]) {
                let _unkMsg = lang === 'it'
                    ? `<div style="margin-bottom:12px; padding:10px; background:rgba(255,170,0,0.08); border-left:3px solid #ffaa00; border-radius:4px; font-size:0.88em; color:#ccc; line-height:1.5;">`
                    + `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-alert'/></svg></span> <b>Tipo oggetto non riconosciuto.</b> La stima delle ore di integrazione potrebbe non essere accurata.<br>`
                    + `In astrofotografia, raramente meno di <b>4 ore</b> producono risultati soddisfacenti — pianifica di conseguenza.</div>`
                    : lang === 'en'
                    ? `<div style="margin-bottom:12px; padding:10px; background:rgba(255,170,0,0.08); border-left:3px solid #ffaa00; border-radius:4px; font-size:0.88em; color:#ccc; line-height:1.5;">`
                    + `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-alert'/></svg></span> <b>Object type not recognised.</b> The integration time estimate may not be accurate.<br>`
                    + `In astrophotography, less than <b>4 hours</b> rarely produces satisfying results — plan accordingly.</div>`
                    : lang === 'es'
                    ? `<div style="margin-bottom:12px; padding:10px; background:rgba(255,170,0,0.08); border-left:3px solid #ffaa00; border-radius:4px; font-size:0.88em; color:#ccc; line-height:1.5;">`
                    + `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-alert'/></svg></span> <b>Tipo de objeto no reconocido.</b> La estimación del tiempo de integración puede no ser precisa.<br>`
                    + `En astrofotografía, menos de <b>4 horas</b> raramente produce resultados satisfactorios.</div>`
                    : `<div style="margin-bottom:12px; padding:10px; background:rgba(255,170,0,0.08); border-left:3px solid #ffaa00; border-radius:4px; font-size:0.88em; color:#ccc; line-height:1.5;">`
                    + `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-alert'/></svg></span> <b>未识别目标类型。</b>积分时间估算可能不准确。<br>`
                    + `天文摄影中，少于 <b>4小时</b> 很少能产生令人满意的结果。</div>`;
                html += _unkMsg;
            }

            if (aS < totId * 0.9 || isImpraticabile) {
                let reason = "";

                // ── CASO IMPRATICABILE ─────────────────────────────────────
                if (isImpraticabile) {
                    if (lang === 'it') {
                        reason = `<div style="padding:10px 12px; background:rgba(255,60,60,0.10); border-left:3px solid #ff4444; border-radius:4px; font-size:0.9em; color:#ffcccc; line-height:1.6; margin-bottom:10px;">`;
                        reason += `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-ban'/></svg></span> <b>Progetto non consigliato nelle condizioni attuali.</b><br>`;
                        if (!isEmission && bortle >= 8)
                            reason += `Un target a banda larga (${tipoNomeReport}) da Bortle ${bortle} richiede un tempo di integrazione stimato superiore a ${_sogliaBB}h. Questo tipo di soggetto è molto difficile da separare dal fondo cielo in condizioni di forte inquinamento luminoso. <b>Considera un sito più buio o scegli una nebulosa a emissione con filtro narrowband.</b>`;
                        else if (isEmission && !usingNarrowband && bortle >= 6)
                            reason += `Il target (${tipoNomeReport}) da Bortle ${bortle} senza filtro narrowband richiederebbe oltre ${_sogliaBB}h di integrazione. <b>Con un filtro Ha/OIII dual-band il tempo stimato scenderebbe a ${totIdConNB!==null?totIdConNB.toFixed(1):'?'} ore</b> — praticabile in più sessioni.<br>Senza filtro si sconsiglia di procedere: il segnale è troppo debole rispetto al fondo cielo.`;
                        else
                            reason += `Anche con filtro narrowband, questo target da Bortle ${bortle} richiederebbe oltre ${_sogliaNB}h di integrazione — un progetto di stagione intera. Valuta un sito più buio.`;
                        reason += `</div>`;
                    } else if (lang === 'en') {
                        reason = `<div style="padding:10px 12px; background:rgba(255,60,60,0.10); border-left:3px solid #ff4444; border-radius:4px; font-size:0.9em; color:#ffcccc; line-height:1.6; margin-bottom:10px;">`;
                        reason += `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-ban'/></svg></span> <b>Project not recommended under current conditions.</b><br>`;
                        if (!isEmission && bortle >= 8)
                            reason += `A broadband target (${tipoNomeReport}) from Bortle ${bortle} requires an estimated integration time above ${_sogliaBB}h. This type of subject is very hard to separate from the sky background under heavy light pollution. <b>Consider a darker site or switch to an emission nebula with a narrowband filter.</b>`;
                        else if (isEmission && !usingNarrowband && bortle >= 6)
                            reason += `This target (${tipoNomeReport}) from Bortle ${bortle} without a narrowband filter would require over ${_sogliaBB}h of integration. <b>With a Ha/OIII dual-band filter the estimated time drops to ${totIdConNB!==null?totIdConNB.toFixed(1):'?'} hours</b> — feasible over multiple sessions.<br>Without a filter, proceeding is not recommended: the signal is too weak against the sky background.`;
                        else
                            reason += `Even with a narrowband filter, this target from Bortle ${bortle} would require over ${_sogliaNB}h of integration — a full-season project. Consider a darker site.`;
                        reason += `</div>`;
                    } else if (lang === 'es') {
                        reason = `<div style="padding:10px 12px; background:rgba(255,60,60,0.10); border-left:3px solid #ff4444; border-radius:4px; font-size:0.9em; color:#ffcccc; line-height:1.6; margin-bottom:10px;">`;
                        reason += `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-ban'/></svg></span> <b>Proyecto no recomendado en las condiciones actuales.</b><br>`;
                        if (!isEmission && bortle >= 8)
                            reason += `Un objetivo de banda ancha (${tipoNomeReport}) desde Bortle ${bortle} requiere un tiempo de integración estimado superior a ${_sogliaBB}h. Este tipo de objetivo es muy difícil de separar del fondo del cielo con mucha contaminación lumínica. <b>Considera un lugar más oscuro o elige una nebulosa de emisión con filtro narrowband.</b>`;
                        else if (isEmission && !usingNarrowband && bortle >= 6)
                            reason += `Este objetivo (${tipoNomeReport}) desde Bortle ${bortle} sin filtro narrowband requeriría más de ${_sogliaBB}h de integración. <b>Con un filtro dual-band Ha/OIII el tiempo estimado baja a ${totIdConNB!==null?totIdConNB.toFixed(1):'?'} horas</b> — factible en varias sesiones.<br>Sin filtro no se recomienda proceder: la señal es demasiado débil frente al fondo del cielo.`;
                        else
                            reason += `Incluso con filtro narrowband, este objetivo desde Bortle ${bortle} requeriría más de ${_sogliaNB}h — un proyecto de temporada completa. Considera un lugar más oscuro.`;
                        reason += `</div>`;
                    } else {
                        reason = `<div style="padding:10px 12px; background:rgba(255,60,60,0.10); border-left:3px solid #ff4444; border-radius:4px; font-size:0.9em; color:#ffcccc; line-height:1.6; margin-bottom:10px;">`;
                        reason += `<span class='adp-icon'><svg width='14' height='14' style='vertical-align:middle'><use href='#i-ban'/></svg></span> <b>当前条件下不建议此项目。</b><br>`;
                        if (!isEmission && bortle >= 8)
                            reason += `在博特尔${bortle}下的宽带目标（${tipoNomeReport}）估计需要超过${_sogliaBB}小时的积分时间。在强光污染下，此类目标很难从天空背景中分离。<b>建议选择更暗的地点或改拍配合窄带滤镜的发射星云。</b>`;
                        else if (isEmission && !usingNarrowband && bortle >= 6)
                            reason += `在博特尔${bortle}下不使用窄带滤镜，此目标（${tipoNomeReport}）将需要超过${_sogliaBB}小时的积分。<b>使用Ha/OIII双波段滤镜，估计时间降至${totIdConNB!==null?totIdConNB.toFixed(1):'?'}小时</b>——可分多次完成。<br>不建议在没有滤镜的情况下进行：信号相对于天空背景太弱。`;
                        else
                            reason += `即使使用窄带滤镜，在博特尔${bortle}下此目标也需要超过${_sogliaNB}小时——整季项目，建议选择更暗的地点。`;
                        reason += `</div>`;
                    }
                    html += `<div style="font-size:0.9em; line-height:1.5; color:#ddd; margin-bottom:15px;">${reason}</div>`;

                } else {
                // ── CASO NORMALE (insufficiente ma praticabile) ────────────
                if(lang === 'it') {
                    reason = `Trattandosi di <b>${tipoNomeReport}</b> di magnitudine <b>${mVal.toFixed(1)}</b> ripresa a <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` divisa in <b>${panels} pannelli</b> (Mosaico)`;
                    reason += `, l'algoritmo stima necessarie <b style="color:#ffaa00;">${totId.toFixed(1)} ore</b> di integrazione.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* È applicata una penalità 2x perché stai usando filtri Narrow su un target a banda larga.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* È applicata una penalità per forte inquinamento lunare.</i>`;
                    if(lpApplied && lpFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* È applicata una penalità per inquinamento luminoso (Bortle ${bortle}).</i>`;
                    if(lpApplied && lpFact < 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Applicato un bonus cielo buio (Bortle ${bortle}) — meno integrazione necessaria.</i>`;
                    if(totIdConNB !== null && !nbSogliaSuperata && !doingOscNB)
                        reason += ` <br><i style="color:#bb86fc; font-size: 0.9em;">💡 Con filtro Ha/OIII narrowband il tempo stimato scenderebbe a <b>${totIdConNB.toFixed(1)} ore</b>.</i>`;
                    if(doingOscNB && !isEmission)
                        reason += ` <br><i style="color:#ff9944; font-size: 0.9em;">⚠️ Il filtro dual/quad-band non è adatto a questo tipo di target (${tipoNomeReport}): blocca la luce broadband riducendo drasticamente il segnale. Rimuovi il filtro o scegli una nebulosa a emissione.</i>`;
                    if(doingOscNB && isEmission)
                        reason += ` <br><i style="color:#44ccaa; font-size: 0.9em;">✅ Filtro dual/quad-band attivo: penalità Bortle ridotta per target a emissione.</i>`;
                    reason += `<br><br>Il tempo utile di stanotte (> 30° sull'orizzonte) è di <b style="color:#ff4444;">${aS.toFixed(1)} ore</b> ed è insufficiente.`;
                } else if(lang === 'en') {
                    reason = `Being a <b>${tipoNomeReport}</b> of magnitude <b>${mVal.toFixed(1)}</b> shot at <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` split in <b>${panels} panels</b> (Mosaic)`;
                    reason += `, the algorithm estimates <b style="color:#ffaa00;">${totId.toFixed(1)} hours</b> of total integration.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A 2x penalty is applied for using Narrowband filters on a Broadband target.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A penalty for heavy lunar light pollution is applied.</i>`;
                    if(lpApplied && lpFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A light pollution penalty is applied (Bortle ${bortle}).</i>`;
                    if(lpApplied && lpFact < 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A dark sky bonus is applied (Bortle ${bortle}) — less integration needed.</i>`;
                    if(totIdConNB !== null && !nbSogliaSuperata && !doingOscNB)
                        reason += ` <br><i style="color:#bb86fc; font-size: 0.9em;">💡 With a Ha/OIII narrowband filter the estimated time would drop to <b>${totIdConNB.toFixed(1)} hours</b>.</i>`;
                    if(doingOscNB && !isEmission)
                        reason += ` <br><i style="color:#ff9944; font-size: 0.9em;">⚠️ The dual/quad-band filter is not suitable for this target type (${tipoNomeReport}): it blocks broadband light, drastically reducing signal. Remove the filter or choose an emission nebula.</i>`;
                    if(doingOscNB && isEmission)
                        reason += ` <br><i style="color:#44ccaa; font-size: 0.9em;">✅ Dual/quad-band filter active: reduced Bortle penalty for emission target.</i>`;
                    reason += `<br><br>Tonight's useful time (> 30° altitude) is <b style="color:#ff4444;">${aS.toFixed(1)} hours</b>, which is insufficient.`;
                } else if(lang === 'es') {
                    reason = `Tratándose de <b>${tipoNomeReport}</b> de magnitud <b>${mVal.toFixed(1)}</b> capturada a <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` dividida en <b>${panels} paneles</b> (Mosaico)`;
                    reason += `, el algoritmo estima necesarias <b style="color:#ffaa00;">${totId.toFixed(1)} horas</b> de integración total.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica una penalización 2x por usar filtros Narrowband en un objetivo de banda ancha.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica una penalización por fuerte contaminación lumínica lunar.</i>`;
                    if(lpApplied && lpFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica una penalización por contaminación lumínica (Bortle ${bortle}).</i>`;
                    if(lpApplied && lpFact < 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica un bono de cielo oscuro (Bortle ${bortle}) — menos integración necesaria.</i>`;
                    if(totIdConNB !== null && !nbSogliaSuperata && !doingOscNB)
                        reason += ` <br><i style="color:#bb86fc; font-size: 0.9em;">💡 Con filtro narrowband Ha/OIII el tiempo estimado bajaría a <b>${totIdConNB.toFixed(1)} horas</b>.</i>`;
                    if(doingOscNB && !isEmission)
                        reason += ` <br><i style="color:#ff9944; font-size: 0.9em;">⚠️ El filtro dual/quad-band no es adecuado para este tipo de objetivo (${tipoNomeReport}). Quita el filtro o elige una nebulosa de emisión.</i>`;
                    if(doingOscNB && isEmission)
                        reason += ` <br><i style="color:#44ccaa; font-size: 0.9em;">✅ Filtro dual/quad-band activo: penalización Bortle reducida.</i>`;
                    reason += `<br><br>El tiempo útil de esta noche (> 30° sobre el horizonte) es de <b style="color:#ff4444;">${aS.toFixed(1)} horas</b> y resulta insuficiente.`;
                } else {
                    reason = `作为星等 <b>${mVal.toFixed(1)}</b> 的 <b>${tipoNomeReport}</b>，在 <b>f/${fR.toFixed(1)}</b> 下拍摄`;
                    if (isMosaic && panels > 1) reason += `，分为 <b>${panels} 个面板</b> (拼接)`;
                    reason += `，算法估计需要 <b style="color:#ffaa00;">${totId.toFixed(1)} 小时</b> 的总曝光。`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 对宽带目标使用窄带滤镜，计算 2x 惩罚时间。</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 已应用强月光污染惩罚。</i>`;
                    if(lpApplied && lpFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 已应用光污染惩罚（博特尔 ${bortle}）。</i>`;
                    if(lpApplied && lpFact < 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 已应用暗天空奖励（博特尔 ${bortle}）——所需积分时间更少。</i>`;
                    if(totIdConNB !== null && !nbSogliaSuperata && !doingOscNB)
                        reason += ` <br><i style="color:#bb86fc; font-size: 0.9em;">💡 使用Ha/OIII窄带滤镜，估计时间将降至 <b>${totIdConNB.toFixed(1)} 小时</b>。</i>`;
                    if(doingOscNB && !isEmission)
                        reason += ` <br><i style="color:#ff9944; font-size: 0.9em;">⚠️ 双/四波段滤镜不适合此目标（${tipoNomeReport}）。请移除滤镜或选择发射星云。</i>`;
                    if(doingOscNB && isEmission)
                        reason += ` <br><i style="color:#44ccaa; font-size: 0.9em;">✅ 双/四波段滤镜已启用：博特尔惩罚已降低。</i>`;
                    reason += `<br><br>今晚的可用时间 (> 30° 高度) 只有 <b style="color:#ff4444;">${aS.toFixed(1)} 小时</b>，时间不足。`;
                }

                // ── Consiglio filtro anti-inquinamento (Bortle) ──────────
                let isEmissionTarget = ['sh2','lbn','snr','hii','planetaria'].includes(_catAI);
                let isBroadbandTarget = ['galassia','vdb','ldn','aperto','globulare'].includes(_catAI);
                let filterTip = '';

                // ── Consiglio filtro: se dual/quad-band OSC attivo, mostra messaggio dedicato
                // altrimenti mostra i consigli standard in base al Bortle
                if (doingOscNB) {
                    if (!isEmissionTarget) {
                        filterTip = lang==='it' ? '⚠️ <b>Attenzione filtro:</b> Il filtro dual/quad-band selezionato non è adatto a questo target. Blocca la luce broadband riducendo drasticamente il segnale. <b>Rimuovi il filtro.</b>'
                                  : lang==='en' ? '⚠️ <b>Filter warning:</b> The selected dual/quad-band filter is not suitable for this target. It blocks broadband light, drastically reducing signal. <b>Remove the filter.</b>'
                                  : lang==='es' ? '⚠️ <b>Advertencia filtro:</b> El filtro dual/quad-band no es adecuado para este objetivo. Bloquea la luz de banda ancha. <b>Quita el filtro.</b>'
                                  :               '⚠️ <b>滤镜警告：</b>所选双/四波段滤镜不适合此目标。请移除滤镜。';
                    } else {
                        filterTip = lang==='it' ? '✅ <b>Filtro dual/quad-band attivo</b> — ottima scelta per nebulose a emissione. Riduce il fondo cielo del 94–95%, ideale anche da cieli urbani e con la Luna.'
                                  : lang==='en' ? '✅ <b>Dual/quad-band filter active</b> — excellent choice for emission nebulae. Reduces sky background by 94–95%, ideal even from urban skies and with the Moon.'
                                  : lang==='es' ? '✅ <b>Filtro dual/quad-band activo</b> — excelente para nebulosas de emisión. Reduce el fondo del cielo un 94–95%, ideal incluso desde cielos urbanos y con la Luna.'
                                  :               '✅ <b>双/四波段滤镜已启用</b> ——发射星云绝佳选择，天空背景降低94–95%，城市天空和月光下均可使用。';
                    }
                } else if (bortle <= 3) {
                    filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo buio — nessun filtro antinquinamento necessario. Un filtro ridurrebbe il segnale.'
                              : lang==='en' ? '💡 <b>Filters:</b> Dark sky — no light pollution filter needed. A filter would reduce your signal.'
                              : lang==='es' ? '💡 <b>Filtros:</b> Cielo oscuro — no se necesita filtro anticontaminación. Un filtro reduciría la señal.'
                              :               '💡 <b>滤镜：</b>暗天空——不需要光污染滤镜，使用滤镜会降低信号。';
                } else if (bortle <= 5) {
                    if (isEmissionTarget)
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo suburbano — per nebulose a emissione un filtro antinquinamento broadband è utile (es. CLS, L-Pro, Quadband). Per altri target meglio aumentare il tempo di integrazione.'
                                  : lang==='en' ? '💡 <b>Filters:</b> Suburban sky — for emission nebulae a broadband light pollution filter is helpful (e.g. CLS, L-Pro, Quadband). For other targets, increase integration time instead.'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Cielo suburbano — para nebulosas de emisión un filtro anticontaminación broadband es útil (p.ej. CLS, L-Pro, Quadband). Para otros objetivos, aumentar el tiempo de integración.'
                                  :               '💡 <b>滤镜：</b>郊区天空——对于发射星云，宽带光污染滤镜很有帮助（如CLS、L-Pro、Quadband）。其他目标建议增加曝光时间。';
                    else
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo suburbano — su galassie e ammassi i filtri antinquinamento hanno effetto limitato. Punta a più ore di integrazione.'
                                  : lang==='en' ? '💡 <b>Filters:</b> Suburban sky — light pollution filters have limited effect on galaxies and clusters. Aim for more integration time.'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Cielo suburbano — los filtros anticontaminación tienen efecto limitado en galaxias y cúmulos. Aumenta el tiempo de integración.'
                                  :               '💡 <b>滤镜：</b>郊区天空——光污染滤镜对星系和星团效果有限，建议增加曝光时间。';
                } else if (bortle <= 7) {
                    if (isEmissionTarget)
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo urbano — <b>filtro antinquinamento broadband consigliato</b> per nebulose (es. CLS, UHC, L-Pro, Quadband). Migliora significativamente il contrasto.'
                                  : lang==='en' ? '💡 <b>Filters:</b> Urban sky — <b>broadband light pollution filter recommended</b> for nebulae (e.g. CLS, UHC, L-Pro, Quadband). Significantly improves contrast.'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Cielo urbano — <b>filtro anticontaminación broadband recomendado</b> para nebulosas (p.ej. CLS, UHC, L-Pro, Quadband). Mejora significativamente el contraste.'
                                  :               '💡 <b>滤镜：</b>城市天空——<b>强烈推荐宽带光污染滤镜</b>用于星云（如CLS、UHC、L-Pro、Quadband），可显著改善对比度。';
                    else if (isBroadbandTarget)
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo urbano — su galassie e ammassi un filtro antinquinamento broadband (es. L-Pro) aiuta, ma è necessaria molta integrazione (15–20h+).'
                                  : lang==='en' ? '💡 <b>Filters:</b> Urban sky — for galaxies and clusters a broadband filter (e.g. L-Pro) helps, but long integration is still required (15–20h+).'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Cielo urbano — para galaxias y cúmulos un filtro broadband (p.ej. L-Pro) ayuda, pero sigue siendo necesaria mucha integración (15–20h+).'
                                  :               '💡 <b>滤镜：</b>城市天空——对于星系和星团，宽带滤镜（如L-Pro）有所帮助，但仍需大量曝光时间（15-20小时以上）。';
                } else {
                    if (isEmissionTarget)
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo da città — <b>filtro narrowband fortemente consigliato</b> per nebulose (es. dual-band Ha/OIII, Quadband, Tri-band). I filtri broadband sono insufficienti a questi livelli di inquinamento.'
                                  : lang==='en' ? '💡 <b>Filters:</b> Heavy light pollution — <b>narrowband filter strongly recommended</b> for nebulae (e.g. dual-band Ha/OIII, Quadband, Tri-band). Broadband filters are insufficient at these pollution levels.'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Contaminación severa — <b>filtro narrowband muy recomendado</b> para nebulosas (p.ej. dual-band Ha/OIII, Quadband, Tri-band). Los filtros broadband son insuficientes a estos niveles.'
                                  :               '💡 <b>滤镜：</b>严重光污染——<b>强烈推荐窄带滤镜</b>用于星云（如双波段Ha/OIII、Quadband、三波段）。宽带滤镜在此污染级别下效果不足。';
                    else
                        filterTip = lang==='it' ? '💡 <b>Filtri:</b> Cielo da città — su galassie e ammassi i risultati restano difficili anche con filtro. Considera di spostarti in un sito più buio o di usare un filtro narrowband per nebulose nelle vicinanze.'
                                  : lang==='en' ? '💡 <b>Filters:</b> Heavy light pollution — galaxies and clusters remain challenging even with filters. Consider a darker site or switch to nearby emission nebulae with narrowband filters.'
                                  : lang==='es' ? '💡 <b>Filtros:</b> Contaminación severa — galaxias y cúmulos son difíciles incluso con filtros. Considera un lugar más oscuro o cambia a nebulosas de emisión con filtros narrowband.'
                                  :               '💡 <b>滤镜：</b>严重光污染——即使使用滤镜，星系和星团仍然很困难，建议前往较暗的地点或改拍发射星云配合窄带滤镜。';
                }
                if (filterTip)
                    reason += `<br><br><div style="margin-top:8px; padding:10px 12px; background:rgba(255,170,0,0.08); border-left:3px solid #ffaa00; border-radius:4px; font-size:0.88em; color:#e0d8ff; line-height:1.6;">${filterTip}</div>`;
                // ────────────────────────────────────────────────────────

                html += `<div style="font-size:0.9em; line-height:1.5; color:#ddd; margin-bottom:15px;">${reason}</div>`;
                html += `<button class="btn-a-secondary btn-a-red" style="width:100%; padding:11px; font-size:1em; margin-top:10px;" onclick="apriMultiNight('smart')"><svg width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="display:inline-block;vertical-align:middle;flex-shrink:0;"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 21h-5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3.5" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h11" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" /></svg> ${t("ai_plan_btn")}</button>`;
                } // chiude else (caso normale vs impraticabile)
            } else {
                let msgOk = lang === 'it' ? "Il tempo a disposizione stanotte sopra i 30° è sufficiente a completare l'integrazione consigliata." : 
                            lang === 'en' ? "Tonight's available time above 30° is enough to complete the recommended integration." :
                            lang === 'es' ? "El tiempo disponible esta noche por encima de 30° es suficiente para completar la integración recomendada." :
                                            "今晚 > 30° 的可用时间足以完成推荐的曝光时间。";
                html += `<div style="margin-top:5px; padding:10px; background:rgba(74,138,111,0.1); border-left:3px solid #4a8a6f; border-radius:4px; font-size:0.9em; color:#fff;"><svg width='14' height='14' style='vertical-align:middle;margin-right:4px'><use href='#i-check'/></svg><b>OK:</b> ${msgOk}</div>`;
            }
            panel.innerHTML = html;
        }

        // Formatta secondi in modo leggibile: mostra secondi se < 60s
        function formatSeconds(s) {
            s = Math.round(s);
            if (s <= 0) return '0s';
            if (s < 60) return `${s}s`;
            if (s < 3600) return `${Math.floor(s/60)}m ${s%60 > 0 ? (s%60)+'s' : ''}`.trim();
            return `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m`;
        }

        function calcolaTempi() {
            let tS = document.getElementById('time-start').value, tE = document.getElementById('time-end').value; if(!tS || !tE) return;
            let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`);
            if (tS === tE) { // finestra zero — oggetto non visibile
                document.getElementById('calc-available').innerHTML = formatSeconds(0);
                let rD = document.getElementById('calc-residual'), wD = document.getElementById('calc-warning');
                if (rD) { rD.innerText = formatSeconds(0); rD.className = 'text-red'; }
                if (wD) wD.style.display = 'block';
                return;
            }
            if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let aS = (dE - dS) / 1000; 

            // ── Overhead Bias: stima tempo tecnico per frame con exp=0 ──────
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.7;
            let px = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
            // Readout ADC: ~0.1s base + 0.012s/MP | Save FITS ~2MB/MP @ 80MB/s → 0.025s/MP
            let biasOverhead = Math.max(1.0, 0.8 + mp * 0.05);
            // ────────────────────────────────────────────────────────────────
            
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            let panels = 1;
            if (isMosaic) {
                panels = (parseInt(document.getElementById('mosaic-x').value)||1) * (parseInt(document.getElementById('mosaic-y').value)||1);
                document.getElementById('mosaic-total-badge').innerText = `Target: ${panels} Pannelli`;
                aS = aS / panels;
            }
            document.getElementById('calc-available').innerHTML = isMosaic ? `<span style="font-size:0.6em; color:#ffaa00;">${t("time_per_panel")}<br></span>${formatSeconds(aS)}` : formatSeconds(aS);

            let fL = document.getElementById('sensor-type').value === 'mono' ? framesMono : framesColor, tSec = 0, tLF = 0;
            fL.forEach(f => {
                let c = parseInt(document.getElementById(`${f.id}-count`).value)||0;
                let e = parseInt(document.getElementById(`${f.id}-exp`).value)||0;
                let eEff = f.id.includes('bias') ? (c > 0 ? biasOverhead : 0) : e;
                let rs = c * eEff;
                tSec += rs;
                if (!f.id.includes('dark') && !f.id.includes('bias')) tLF += c;
                // HDR companion row: se visibile e con pose > 0, aggiunge tempo reale
                if (!f.id.includes('dark') && !f.id.includes('bias')) {
                    let _hdrRow = document.getElementById(`${f.id}-hdr-row`);
                    if (_hdrRow && _hdrRow.style.display !== 'none') {
                        let _hdrC = parseInt((document.getElementById(`${f.id}-hdr-count`)||{}).value)||0;
                        let _hdrE = parseInt((document.getElementById(`${f.id}-hdr-exp`)||{}).value)||0;
                        let _hdrSec = _hdrC * _hdrE;
                        if (_hdrC > 0 && _hdrE > 0) { tSec += _hdrSec; tLF += _hdrC; }
                        let _hdrTot = document.getElementById(`${f.id}-hdr-tot`);
                        if (_hdrTot) _hdrTot.innerHTML = (_hdrSec > 0) ? formatSeconds(_hdrSec) : '—';
                    }
                }
                let rsLabel = formatSeconds(rs);
                if (f.id.includes('bias') && c > 0 && e === 0) {
                    rsLabel += ` <span onmouseenter="mostraTooltip(this,'bias_overhead_tip')" onmouseleave="nascondiTooltip()" style="color:#888;cursor:help;display:inline-flex;align-items:center;"><svg width='13' height='13' style='vertical-align:middle'><use href='#i-settings'/></svg></span>`;
                }
                document.getElementById(`${f.id}-tot`).innerHTML = rsLabel;
            });

            // Dither per-filtro (ogni filtro ha checkbox + freq propria)
            let dSec = 0;
            let dD = parseInt(document.getElementById('dither-duration') ? document.getElementById('dither-duration').value : 15)||15;
            fL.forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let dChk = document.getElementById(`${f.id}-dither`);
                if (dChk && dChk.checked) {
                    let cnt = parseInt(document.getElementById(`${f.id}-count`).value)||0;
                    let dFreq = parseInt(document.getElementById(`${f.id}-dfreq`) ? document.getElementById(`${f.id}-dfreq`).value : 3)||3;
                    dSec += Math.floor(cnt / dFreq) * dD;
                }
            });
            // Dither per le righe HDR companion
            fL.forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let _hdrRow = document.getElementById(`${f.id}-hdr-row`);
                if (!_hdrRow || _hdrRow.style.display === 'none') return;
                let _hdrDChk = document.getElementById(`${f.id}-hdr-dither`);
                if (_hdrDChk && _hdrDChk.checked) {
                    let _hdrCnt = parseInt((document.getElementById(`${f.id}-hdr-count`)||{}).value)||0;
                    let _hdrDFreq = parseInt((document.getElementById(`${f.id}-hdr-dfreq`)||{}).value)||4;
                    dSec += Math.floor(_hdrCnt / _hdrDFreq) * dD;
                }
            });
            tSec += dSec;
            let ditherTotEl = document.getElementById('dither-tot');
            if (ditherTotEl) ditherTotEl.innerText = formatSeconds(dSec);

            document.getElementById('calc-total').innerText = formatSeconds(tSec);
            let rS = aS - tSec, rD = document.getElementById('calc-residual'), wD = document.getElementById('calc-warning');
            let _smartMnBtn = document.getElementById('btn-smart-overflow-mn');
            let _smartFillBar  = document.getElementById('smart-fill-bar');
            let _smartFillText = document.getElementById('smart-fill-text');
            if (rS >= 0) {
                rD.innerText = formatSeconds(rS);
                rD.className = "text-green";
                wD.style.display = "none";
                if (_smartMnBtn) _smartMnBtn.style.display = 'none';
            } else {
                rD.innerText = `- ${formatSeconds(Math.abs(rS))}`;
                rD.className = "text-red";
                wD.style.display = "block";
                if (_smartMnBtn) _smartMnBtn.style.display = 'block';
            }
            // Aggiorna fill bar Smart
            if (_smartFillBar && aS > 0) {
                let _pct = Math.min((tSec / aS) * 100, 999);
                _smartFillBar.style.width = Math.min(100, _pct) + '%';
                _smartFillBar.style.background = _pct < 90 ? '#44ff44' : _pct <= 100 ? '#ffaa00' : '#ff4444';
                let _strU = `${Math.floor(tSec/3600)}h ${Math.floor((tSec%3600)/60)}m`;
                let _strT = `${Math.floor(aS/3600)}h ${Math.floor((aS%3600)/60)}m`;
                if (_smartFillText) _smartFillText.innerText = `${_strU} / ${_strT} (${Math.round(_pct)}%)`;
            }
            
            // Richiama l'AI ogni volta che si cambiano i tempi!
            if (typeof aggiornaAI === "function") aggiornaAI();
        }

        function generaSequenzaOttimale() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }
            let tS = document.getElementById('time-start').value, tE = document.getElementById('time-end').value; if(!tS || !tE) { mostraAvviso(t("alert_times"), "warn"); return; }
            if (tS === tE) { mostraAvviso(lang==='it'?"L'oggetto non è visibile stanotte — finestra di sessione zero.":lang==='en'?"Object not visible tonight — session window is zero.":lang==='es'?"El objeto no es visible esta noche — ventana cero.":"今晚目标不可见——会话窗口为零。", "warn"); return; }
            let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`); if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let aS = (dE - dS) / 1000;
            
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            if (isMosaic) {
                let mx = parseInt(document.getElementById('mosaic-x').value) || 1;
                let my = parseInt(document.getElementById('mosaic-y').value) || 1;
                aS = aS / (mx * my);
            }

            let isM = document.getElementById('sensor-type').value === 'mono', fL = isM ? framesMono : framesColor, cS = 0;
            
            fL.forEach(f => { if (f.id.includes('dark') || f.id.includes('bias')) cS += (parseInt(document.getElementById(`${f.id}-count`).value)||0) * (parseInt(document.getElementById(`${f.id}-exp`).value)||0); });
            let rS = aS - cS; if (rS <= 0) { mostraAvviso(t("alert_calib"), "warn"); return; }
            // Sottrai il tempo HDR lockato dal budget disponibile per i frame principali
            let hdrLockedSec = 0;
            fL.forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let _hdrRowRs = document.getElementById(`${f.id}-hdr-row`);
                if (!_hdrRowRs || _hdrRowRs.style.display === 'none') return;
                let _hdrCLock = document.getElementById(`${f.id}-hdr-count-lock`);
                let _hdrELock = document.getElementById(`${f.id}-hdr-exp-lock`);
                let _hdrCLocked = _hdrCLock && _hdrCLock.classList.contains('locked');
                let _hdrELocked = _hdrELock && _hdrELock.classList.contains('locked');
                // Sottrai solo se almeno un valore è lockato (l'utente ha dati personalizzati)
                if (_hdrCLocked || _hdrELocked) {
                    let _hdrC = parseInt((document.getElementById(`${f.id}-hdr-count`)||{}).value)||0;
                    let _hdrE = parseInt((document.getElementById(`${f.id}-hdr-exp`)||{}).value)||0;
                    hdrLockedSec += _hdrC * _hdrE;
                }
            });
            let rSMain = Math.max(0, rS - hdrLockedSec);
            if (rSMain <= 0) { mostraAvviso(t("alert_calib"), "warn"); return; }
            
            let aL = []; fL.forEach(f => { if (!f.id.includes('dark') && !f.id.includes('bias')) { let c = document.getElementById(`${f.id}-check`); if (c && c.checked) aL.push(f); } });
            if (aL.length === 0) { mostraAvviso(t("alert_nolight"), "warn"); return; }

            let w = {};
            if (!isM) w[aL[0].id] = 1.0;
            else {
                let narrowL = aL.filter(f => f.id.includes('ha') || f.id.includes('oiii') || f.id.includes('sii'));
                let broadL  = aL.filter(f => !f.id.includes('ha') && !f.id.includes('oiii') && !f.id.includes('sii'));
                let hNarrow = narrowL.length > 0;
                let hBroad  = broadL.length > 0;
                let hL      = aL.some(f => f.id === 'm-l');

                if (!hNarrow) {
                    // ── Solo broadband (LRGB completo, parziale, singolo) ──
                    if (hL) {
                        // L=1 parte, ogni RGB presente=1/3 parte — normalizza
                        let rgbSel = broadL.filter(f => f.id !== 'm-l');
                        let total = 1 + rgbSel.length * (1/3);
                        w['m-l'] = 1 / total;
                        rgbSel.forEach(f => w[f.id] = (1/3) / total);
                    } else {
                        // Nessuna L: pesi uguali (es. solo R+G, solo RGB)
                        let eq = 1.0 / aL.length; aL.forEach(f => w[f.id] = eq);
                    }

                } else if (!hBroad) {
                    // ── Solo narrowband (OSH): pesi uguali, nessun warning ──
                    let eq = 1.0 / aL.length; aL.forEach(f => w[f.id] = eq);

                } else {
                    // ── Mix broadband + narrow: WARNING ──
                    // L=1 parte, ogni RGB=1/3, ogni narrow=1 — normalizza
                    let total = 0;
                    if (hL) total += 1;
                    broadL.filter(f => f.id !== 'm-l').forEach(f => total += 1/3);
                    narrowL.forEach(f => total += 1);
                    if (hL) w['m-l'] = 1 / total;
                    broadL.filter(f => f.id !== 'm-l').forEach(f => w[f.id] = (1/3) / total);
                    narrowL.forEach(f => w[f.id] = 1 / total);

                    let modal = document.getElementById('mixed-filter-modal');
                    let body  = document.getElementById('mixed-filter-body');
                    if (modal && body) { body.innerHTML = t('mixed_filter_warn'); modal.style.display = 'block'; }
                }
            }

            // ── Categoria target (coerente con fov.js) ──────────────────────────
            let _objNameG = (targetSelezionato.name || '').toUpperCase();
            let _nG = _objNameG.replace(/\s+/g, '');
            let _tLowG = targetSelezionato.type ? targetSelezionato.type.toLowerCase() : '';
            let _catG = null;
            if (_nG.startsWith('SH2') || _objNameG.startsWith('SH 2-')) _catG = 'sh2';
            else if (_nG.startsWith('LBN')) _catG = 'lbn';
            else if (_nG.startsWith('LDN')) _catG = 'ldn';
            else if (_nG.startsWith('VDB')) _catG = 'vdb';
            else if (_tLowG.includes('supernova') || _tLowG.includes('snr')) _catG = 'snr';
            else if (_tLowG.includes('planetari') || _tLowG.includes('planetary')) _catG = 'planetaria';
            else if (_tLowG.includes('galassi') || _tLowG.includes('galaxy')) _catG = 'galassia';
            else if (_tLowG.includes('globulare') || _tLowG.includes('globular')) _catG = 'globulare';
            else if (_tLowG.includes('aperto') || _tLowG.includes('open cluster')) _catG = 'aperto';
            else if (_tLowG.includes('h ii') || _tLowG.includes('emissio') || _tLowG.includes('emission')) _catG = 'hii';
            else if (_tLowG.includes('riflessione') || _tLowG.includes('reflection')) _catG = 'vdb';
            else if (_tLowG.includes('oscura') || _tLowG.includes('dark')) _catG = 'ldn';

            // Tabella esposizioni default per categoria
            const _catExpMap = {
                sh2: 300, lbn: 180, ldn: 120, vdb: 180, snr: 300,
                hii: 180, galassia: 120, planetaria: 60, globulare: 30, aperto: 60
            };
            // HDR: esposizione breve per categorie ad alto contrasto
            const _catHdrMap = { planetaria: 30, globulare: 15 };
            // Dither: 3 per Sh2, 4 per tutto il resto
            let _dFreqG = (_catG === 'sh2') ? 3 : 4;
            let _hdrExpG = _catHdrMap[_catG] || 0;
            // M42 (Nebulosa di Orione): nucleo Trapezio saturante → HDR sempre attivo
            let _isM42 = (_nG === 'M42' || _objNameG === 'M42' || _objNameG.includes('ORION NEBULA') || _objNameG.includes('NEBULOSA DI ORIONE'));
            if (_isM42 && _hdrExpG === 0) _hdrExpG = 10; // 10s per il Trapezio

            let dD = parseInt(document.getElementById('dither-duration').value)||0;

            // Mostra righe HDR e imposta dither freq
            aggiornaRigheHDR(_hdrExpG);
            (isM ? framesMono : framesColor).forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let _dFrqEl = document.getElementById(`${f.id}-dfreq`);
                if (_dFrqEl) _dFrqEl.value = _dFreqG;
            });

            // ── LUMINANZA (m-l): esposizione calibrata per categoria + correzione magnitudine ────────────────
            // Logica separata dalla base dei filtri RGB/narrowband perché L satura molto prima.
            //
            // Tabella base L per categoria (aggiornata 2026-03):
            //   planetaria / globulare → 20s  (nuclei compatti, altissima brillanza superficiale)
            //   aperto                 → 30s  (campo stellare denso, stelle brillanti)
            //   galassia               → 30s  + correzione mag (vedi sotto)
            //   hii / snr / vdb        → 90s  (nebulosa diffusa, brillanza media)
            //   sh2 / lbn / ldn        → 120s (oggetti faint, massimo segnale L utile)
            //   sconosciuto / default  → 30s  (conservativo)
            //
            // Correzione magnitudine (solo galassie): +5s per ogni punto mag > 8, cap 180s.
            //   es. mag 10 → 30+10=40s | mag 12 → 30+20=50s | mag 20 → 30+60=90s
            //
            // Il lucchetto su Secs ha sempre la precedenza su tutto.
            const _lumBaseMap = {
                planetaria: 20, globulare: 20,
                aperto: 30,
                galassia: 30,
                hii: 90, snr: 90, vdb: 90,
                sh2: 120, lbn: 120, ldn: 120
            };
            let _lumBase = (_lumBaseMap[_catG] !== undefined) ? _lumBaseMap[_catG] : 30;
            // Correzione magnitudine per galassie
            if (_catG === 'galassia' && targetSelezionato) {
                let _magRaw = targetSelezionato.mag;
                if (_magRaw && _magRaw !== 'N/D' && _magRaw !== '--') {
                    let _magMatch = _magRaw.toString().match(/([+\-]?\d+\.?\d*)/);
                    if (_magMatch) {
                        let _magV = parseFloat(_magMatch[1]);
                        if (_magV > 8) _lumBase = Math.min(180, _lumBase + Math.round((_magV - 8) * 5));
                    }
                }
            }
            // ────────────────────────────────────────────────────────────────────────────────────────────────

            aL.forEach(f => {
                let _baseExp = (_catExpMap[_catG] !== undefined) ? _catExpMap[_catG] : 180;
                let eS;
                if (f.id === 'm-l') eS = _lumBase;
                else if (f.id.includes('ha') || f.id.includes('oiii') || f.id.includes('sii')) eS = Math.max(_baseExp, 300);
                else eS = _baseExp;

                // --- LOGICA DEL LUCCHETTO ---
                let lockEl = document.getElementById(`${f.id}-lock`);
                if (lockEl && lockEl.classList.contains('locked')) {
                    eS = parseInt(document.getElementById(`${f.id}-exp`).value) || eS;
                }

                // Dither per-filtro: usa freq da categoria
                let dChkF = document.getElementById(`${f.id}-dither`);
                let uD = dChkF && dChkF.checked;
                let dFrqEl = document.getElementById(`${f.id}-dfreq`);
                let dF = parseInt(dFrqEl ? dFrqEl.value : _dFreqG) || _dFreqG;
                let eeS = eS + (uD && dF > 0 ? dD / dF : 0);
                document.getElementById(`${f.id}-exp`).value = eS;
                let _mainComputedCount = Math.floor((rSMain * w[f.id]) / eeS);
                document.getElementById(`${f.id}-count`).value = _mainComputedCount;
                // Suggerisci count HDR (30% del count principale, min 5) — rispetta il lucchetto
                let _hdrRowGen = document.getElementById(`${f.id}-hdr-row`);
                if (_hdrRowGen && _hdrRowGen.style.display !== 'none') {
                    let _hdrCountLock = document.getElementById(`${f.id}-hdr-count-lock`);
                    if (!_hdrCountLock || !_hdrCountLock.classList.contains('locked')) {
                        document.getElementById(`${f.id}-hdr-count`).value = Math.max(5, Math.ceil(_mainComputedCount * 0.3));
                    }
                }
            });
            sincronizzaDarkDaLight();

            fL.forEach(f => { 
                if (!f.id.includes('dark') && !f.id.includes('bias')) { 
                    let c = document.getElementById(`${f.id}-check`); 
                    if (c && !c.checked) { 
                        document.getElementById(`${f.id}-count`).value = 0; 
                        let lockEl = document.getElementById(`${f.id}-lock`);
                        if (!lockEl || !lockEl.classList.contains('locked')) {
                            document.getElementById(`${f.id}-exp`).value = f.dE; 
                        }
                    } 
                } 
            });
            calcolaTempi();
        }

        function aggiornaFiltriNina() {
            let isM = document.getElementById('sensor-type').value === 'mono', c = document.getElementById('nina-filters-container'); if (!c) return;
            c.innerHTML = '';
            if (!isM) { c.innerHTML = `<span style="color:#aaa; font-size:0.9em;">OSC Camera.</span>`; return; }
            framesMono.forEach(f => {
                if (!f.id.includes('dark') && !f.id.includes('bias')) {
                    let savedName = localStorage.getItem('nina_filter_' + f.id) || f.name;
                    let d = document.createElement('div'); d.style = "display: flex; align-items: center; justify-content: space-between; font-size: 0.85em; background: #1a1a1a; padding: 5px 10px; border-radius: 4px; border: 1px solid #444;";
                    d.innerHTML = `<label style="color:#aaa; width:auto; margin:0; font-weight:bold;">${f.name}</label><input type="text" id="nina-name-${f.id}" value="${savedName}" onchange="salvaFiltroNina('${f.id}')" style="width: 80px!important; padding: 4px!important; font-size: 0.9em; background: #222; border-color: #555;">`;
                    c.appendChild(d);
                }
            });
        }
        function salvaFiltroNina(id) {
            let nuovoNome = document.getElementById(`nina-name-${id}`).value.trim();
            localStorage.setItem('nina_filter_' + id, nuovoNome);
            let lbl = document.getElementById(id + '-label');
            if (lbl) lbl.innerText = nuovoNome;
            let proInput = document.getElementById(`pro-nina-name-${id}`);
            if (proInput) proInput.value = nuovoNome;
        }

/* --- LOGICA PLANCIA PRO --- */
        /* --- LOGICA PLANCIA PRO --- */
        function aggiornaFiltriNinaPro() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let c = document.getElementById('pro-nina-filters-container'); 
            if (!c) return;
            c.innerHTML = '';
            
            if (!isM) { 
                c.innerHTML = `<span style="color:#aaa; font-size:0.9em;">Sensore OSC Color. Mappatura non necessaria.</span>`; 
                return; 
            }
            
            framesMono.forEach(f => {
                if (!f.id.includes('dark') && !f.id.includes('bias')) {
                    let savedName = localStorage.getItem('nina_filter_' + f.id) || f.name;
                    let d = document.createElement('div'); 
                    d.style = "display: flex; align-items: center; justify-content: space-between; font-size: 0.85em; background: #1a1a1a; padding: 5px 10px; border-radius: 4px; border: 1px solid #444;";
                    d.innerHTML = `<label style="color:#aaa; width:auto; margin:0; font-weight:bold;">${f.name}</label><input type="text" id="pro-nina-name-${f.id}" value="${savedName}" onchange="salvaFiltroNinaPro('${f.id}')" style="width: 80px!important; padding: 4px!important; font-size: 0.9em; background: #222; border-color: #555; color: #fff;">`;
                    c.appendChild(d);
                }
            });
        }

        function salvaFiltroNinaPro(id) {
            let nuovoNome = document.getElementById(`pro-nina-name-${id}`).value.trim();
            localStorage.setItem('nina_filter_' + id, nuovoNome);
            let smartInput = document.getElementById(`nina-name-${id}`);
            if (smartInput) smartInput.value = nuovoNome;
            disegnaGrigliaPro();
        }


        // ── SINCRONIZZAZIONE AUTOFOCUS SMART ↔ PRO ─────────────────────────
        // I campi smart-af-* e pro-af-* sono sempre allineati in tempo reale.
        (function() {
            const pairs = [
                ['smart-af-start',    'pro-af-start'],
                ['smart-af-filter',   'pro-af-filter'],
                ['smart-af-time',     'pro-af-time'],
                ['smart-af-time-val', 'pro-af-time-val'],
                ['smart-af-temp',     'pro-af-temp'],
                ['smart-af-temp-val', 'pro-af-temp-val'],
            ];

            function syncEl(from, to) {
                let fEl = document.getElementById(from);
                let tEl = document.getElementById(to);
                if (!fEl || !tEl) return;
                if (fEl.type === 'checkbox') tEl.checked = fEl.checked;
                else tEl.value = fEl.value;
            }

            function attachSync(srcId, dstId) {
                let el = document.getElementById(srcId);
                if (!el) return;
                el.addEventListener('change', () => syncEl(srcId, dstId));
                el.addEventListener('input',  () => syncEl(srcId, dstId));
            }

            document.addEventListener('DOMContentLoaded', function() {
                // Smart → PRO
                pairs.forEach(([s, p]) => attachSync(s, p));
                // PRO → Smart
                pairs.forEach(([s, p]) => attachSync(p, s));
                // Allineamento iniziale: Smart → PRO (Smart ha i default)
                pairs.forEach(([s, p]) => syncEl(s, p));
            });
        })();


        // ── SINCRONIZZAZIONE GAIN/OFFSET PER GRUPPO ─────────────────────
        // Event delegation su document: intercetta qualsiasi input/change
        // anche sugli elementi creati dinamicamente da disegnaGriglia().
        (function() {
            // Gruppi Smart
            const smartLRGB = ['m-l', 'm-r', 'm-g', 'm-b'];
            const smartHOS  = ['m-ha', 'm-oiii', 'm-sii'];
            // Gruppi PRO (indipendenti da Smart)
            const proLRGB   = ['pro-m-l', 'pro-m-r', 'pro-m-g', 'pro-m-b'];
            const proHOS    = ['pro-m-ha', 'pro-m-oiii', 'pro-m-sii'];

            const allGroups = [smartLRGB, smartHOS, proLRGB, proHOS];

            function propagate(changedId, field, value) {
                // Trova il gruppo cui appartiene l'elemento modificato
                for (const group of allGroups) {
                    if (group.includes(changedId)) {
                        group.forEach(id => {
                            if (id === changedId) return;
                            let el = document.getElementById(`${id}-${field}`);
                            if (el) el.value = value;
                        });
                        return;
                    }
                }
            }

            function handler(e) {
                let el = e.target;
                if (!el || el.tagName !== 'INPUT') return;
                let id = el.id; // es. "m-l-gain", "pro-m-r-offset"
                if (!id) return;
                let field = null;
                if (id.endsWith('-gain'))   field = 'gain';
                if (id.endsWith('-offset')) field = 'offset';
                if (!field) return;
                // Ricostruisce il filterId rimuovendo il suffisso "-gain"/"-offset"
                let filterId = id.slice(0, -(field.length + 1));
                propagate(filterId, field, el.value);
            }

            document.addEventListener('input',  handler, true);
            document.addEventListener('change', handler, true);
        })();

