// pro.js — Modulo PRO: griglia, fill bar, triggers, autofocus, export JSON
// ============================================================

        function apriProView() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }
            document.getElementById('planning-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'none';
            document.getElementById('pro-view').style.display = 'block';

            // Salva lo stato in memoria per resistere al Refresh (F5)
            sessionStorage.setItem('ad_current_view', 'pro');

            document.getElementById('pro-time-start').value = document.getElementById('time-start').value;
            document.getElementById('pro-time-end').value = document.getElementById('time-end').value;
            document.getElementById('pro-sensor-type').value = document.getElementById('sensor-type').value;

            disegnaGrigliaPro();
            window.scrollTo(0,0);
        }

        function chiudiProView() {
            document.getElementById('pro-view').style.display = 'none';
            document.getElementById('planning-view').style.display = 'block';
            window.scrollTo(0,0);
            
            // Ripristina lo stato "Smart" in memoria
            sessionStorage.setItem('ad_current_view', 'smart');
        }

        function disegnaGrigliaPro() {
            let isMono = document.getElementById('pro-sensor-type').value === 'mono';
            document.getElementById('sensor-type').value = isMono ? 'mono' : 'color'; 
            
            aggiornaFiltriNinaPro(); // Richiama i filtri appena creati!
            
            let frameList = isMono ? framesMono : framesColor;
            let container = document.getElementById('pro-sequence-grid');
            container.innerHTML = '';

            container.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 0.8fr 0.6fr 0.65fr 0.65fr 0.65fr 0.65fr 1fr; gap: 5px; font-size: 0.8em; color: #aaa; text-align: center; border-bottom: 1px solid #444; padding-bottom: 5px;">
                    <div style="text-align: left;">Filtro</div>
                    <div>Pose</div>
                    <div>Secs</div>
                    <div style="color:#bb86fc;">HDR<span class="info-icon" style="font-size:1.0em;margin-left:2px;cursor:help;" onmouseenter="mostraTooltip(this,'info_hdr_col')" onmouseleave="nascondiTooltip()">ℹ️</span></div>
                    <div>Gain</div>
                    <div>Offset</div>
                    <div>Bin</div>
                    <div>Dither (Freq.)</div>
                </div>
            `;

            // ── Righe Light/colore (con dither) ──────────────────────────
            frameList.forEach(f => {
                if(f.id.includes('dark') || f.id.includes('bias')) return;

                let defaultCount = document.getElementById(`${f.id}-count`) ? document.getElementById(`${f.id}-count`).value : 0;
                let defaultExp = document.getElementById(`${f.id}-exp`) ? document.getElementById(`${f.id}-exp`).value : f.dE;
                let defaultName = localStorage.getItem('nina_filter_' + f.id) || f.name;

                let row = document.createElement('div');
                row.style.cssText = "display: grid; grid-template-columns: 1fr 0.8fr 0.6fr 0.65fr 0.65fr 0.65fr 0.65fr 1fr; gap: 5px; align-items: center; background: #1a1a1a; padding: 10px; border-radius: 4px; border-left: 3px solid #00c6ff;";
                
                row.innerHTML = `
                    <div style="font-weight: bold; color: #fff; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${defaultName}">${defaultName}</div>
                    <input type="number" id="pro-${f.id}-count" value="${defaultCount}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="number" id="pro-${f.id}-exp" value="${defaultExp}" min="1" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="number" id="pro-${f.id}-hdr" value="" placeholder="—" min="0" oninput="calcolaNightFillBar()"
                        style="width:100%!important;text-align:center;padding:4px!important;box-sizing:border-box;
                        color:#bb86fc;background:#1a1015;border:1px solid #3a2050;border-radius:3px;"
                        title="Secondi esposizione breve HDR">
                    <input type="text" id="pro-${f.id}-gain" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="text" id="pro-${f.id}-offset" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <select id="pro-${f.id}-bin" style="width: 100%!important; padding: 4px!important; text-align: center; box-sizing: border-box;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                        <input type="checkbox" id="pro-${f.id}-dither" checked style="transform: scale(1.2); cursor: pointer;" onchange="calcolaNightFillBar()">
                        <input type="number" id="pro-${f.id}-dfreq" value="4" min="1" style="width: 45px!important; padding: 4px!important; text-align: center;" oninput="calcolaNightFillBar()">
                    </div>
                `;
                container.appendChild(row);
            });

            // ── Separatore Dark/Bias ──────────────────────────────────────
            let sep = document.createElement('div');
            sep.style.cssText = "border-top: 1px dashed #444; margin: 8px 0 4px 0; grid-column: 1/-1;";
            sep.innerHTML = `<span style="font-size:0.75em; color:#666; text-transform:uppercase; letter-spacing:1px;">⬛ Calibration Frames</span>`;
            container.appendChild(sep);

            // ── Righe Dark e Bias (senza dither) ─────────────────────────
            // Calcolo overhead bias basato su sensore
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.7;
            let px = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
            let biasOverhead = Math.max(1.0, 0.8 + mp * 0.05);

            frameList.forEach(f => {
                if(!f.id.includes('dark') && !f.id.includes('bias')) return;

                let isDark = f.id.includes('dark');
                // Dark: default exp = primo Light disponibile; Bias: mostra overhead stimato
                let defaultCount = document.getElementById(`${f.id}-count`) ? document.getElementById(`${f.id}-count`).value : 0;
                let firstLightExp = 0;
                frameList.forEach(lf => { if (!lf.id.includes('dark') && !lf.id.includes('bias') && firstLightExp === 0) { let el = document.getElementById(`${lf.id}-exp`); if (el) firstLightExp = parseInt(el.value)||0; } });
                let defaultExp = isDark ? firstLightExp : 0;
                let defaultName = f.name;
                let borderColor = isDark ? '#555' : '#888';

                let row = document.createElement('div');
                row.style.cssText = `display: grid; grid-template-columns: 1fr 0.8fr 0.6fr 0.65fr 0.65fr 0.65fr 0.65fr 1fr; gap: 5px; align-items: center; background: #141414; padding: 10px; border-radius: 4px; border-left: 3px solid ${borderColor};`;

                let expCell = isDark
                    ? `<input type="number" id="pro-${f.id}-exp" value="${defaultExp}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">`
                    : `<div style="text-align:center; color:#666; font-size:0.85em;">
                           0 <span onmouseenter="mostraTooltip(this,'bias_overhead_tip')" onmouseleave="nascondiTooltip()" style="cursor:help; color:#888;">⚙️</span>
                           <span style="display:none" id="pro-${f.id}-exp">${biasOverhead}</span>
                       </div>`;

                row.innerHTML = `
                    <div style="font-weight: bold; color: #aaa; font-size: 0.9em;">${defaultName}</div>
                    <input type="number" id="pro-${f.id}-count" value="${defaultCount}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    ${expCell}
                    <div style="color:#555;text-align:center;font-size:0.85em;">—</div>
                    <input type="text" id="pro-${f.id}-gain" value="${f.id.includes('bias') ? '0' : 'Auto'}" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="text" id="pro-${f.id}-offset" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <select id="pro-${f.id}-bin" style="width: 100%!important; padding: 4px!important; box-sizing: border-box;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    <div style="color:#555; text-align:center; font-size:0.85em;">—</div>
                `;
                container.appendChild(row);
            });

            calcolaNightFillBar();
        }

        function calcolaNightFillBar() {
            let tS = document.getElementById('pro-time-start').value;
            let tE = document.getElementById('pro-time-end').value;
            if(!tS || !tE) return;

            let dS = new Date(`1970-01-01T${tS}:00`);
            let dE = new Date(`1970-01-01T${tE}:00`);
            if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let secDisponibili = (dE - dS) / 1000;

            let secUsati = 0;
            let ditherOverheadSecs = 15;
            let isMono = document.getElementById('pro-sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;

            // Ricalcola bias overhead con valori sensore attuali
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.7;
            let px = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
            let biasOverhead = Math.max(1.0, 0.8 + mp * 0.05);

            frameList.forEach(f => {
                let countEl = document.getElementById(`pro-${f.id}-count`);
                if(!countEl) return;
                let count = parseInt(countEl.value) || 0;

                if (f.id.includes('bias')) {
                    // Bias: usa overhead stimato come durata effettiva
                    if (count > 0) secUsati += count * biasOverhead;
                    return;
                }

                let expEl = document.getElementById(`pro-${f.id}-exp`);
                if (!expEl) return;
                let exp = parseFloat(expEl.value) || 0;

                // Dark: nessun dither
                if (f.id.includes('dark')) {
                    if (count > 0 && exp > 0) secUsati += count * exp;
                    return;
                }

                let ditherEl = document.getElementById(`pro-${f.id}-dither`);
                let usaDither = ditherEl ? ditherEl.checked : false;
                let dFreqEl = document.getElementById(`pro-${f.id}-dfreq`);
                let dFreq = dFreqEl ? (parseInt(dFreqEl.value) || 1) : 1;

                if (count > 0 && exp > 0) {
                    let tempoPose = count * exp;
                    let tempoDither = 0;
                    if (usaDither && dFreq > 0) {
                        tempoDither = Math.floor(count / dFreq) * ditherOverheadSecs;
                    }
                    // HDR frames overhead (50% delle pose principali)
                    let _hdrElPro = document.getElementById(`pro-${f.id}-hdr`);
                    let _hdrExpPro = _hdrElPro ? (parseInt(_hdrElPro.value) || 0) : 0;
                    let _hdrTime = (_hdrExpPro > 0) ? Math.ceil(count * 0.5) * _hdrExpPro : 0;
                    secUsati += (tempoPose + tempoDither + _hdrTime);
                }
            });

            mnTptSecondi = secUsati; // aggiorna TPT PRO (usato se multinotte aperto da PRO)
            let pct = (secUsati / Math.max(1, secDisponibili)) * 100;
            let bar = document.getElementById('pro-fill-bar');
            let text = document.getElementById('pro-fill-text');
            let btnMn = document.getElementById('btn-pro-multinight');

            bar.style.width = Math.min(100, pct) + '%';
            
            let strUsati = `${Math.floor(secUsati/3600)}h ${Math.floor((secUsati%3600)/60)}m`;
            let strTot = `${Math.floor(secDisponibili/3600)}h ${Math.floor((secDisponibili%3600)/60)}m`;
            text.innerText = `${strUsati} / ${strTot} (${Math.round(pct)}%)`;

            if (pct < 90) {
                bar.style.background = '#44ff44';
                btnMn.style.display = 'none';
            } else if (pct <= 100) {
                bar.style.background = '#ffaa00';
                btnMn.style.display = 'none';
            } else {
                bar.style.background = '#ff4444';
                btnMn.style.display = 'inline-block'; // Appare il bottone d'emergenza Multi-Night!
            }
        }
        function esportaNinaPRO() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }

            // --- LETTURA PARAMETRI DALLA GRIGLIA PRO ---
            let isMono = document.getElementById('pro-sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;

            // Raccoglie solo le righe con pose > 0
            let esposizioni = [];
            frameList.forEach(f => {
                if (f.id.includes('dark') || f.id.includes('bias')) return;
                let countEl = document.getElementById(`pro-${f.id}-count`);
                let expEl   = document.getElementById(`pro-${f.id}-exp`);
                let gainEl  = document.getElementById(`pro-${f.id}-gain`);
                let offEl   = document.getElementById(`pro-${f.id}-offset`);
                let binEl   = document.getElementById(`pro-${f.id}-bin`);
                let dithChk = document.getElementById(`pro-${f.id}-dither`);
                let dithFrq = document.getElementById(`pro-${f.id}-dfreq`);
                if (!countEl) return;
                let count = parseInt(countEl.value) || 0;
                if (count <= 0) return;
                let gainRaw = gainEl ? gainEl.value.trim() : 'Auto';
                let offRaw  = offEl  ? offEl.value.trim()  : 'Auto';
                let _mainExp = parseFloat(expEl ? expEl.value : 180) || 180;
                let _mainGain = (gainRaw === 'Auto' || gainRaw === '') ? -1 : parseInt(gainRaw);
                let _mainOff  = (offRaw  === 'Auto' || offRaw  === '') ? -1 : parseInt(offRaw);
                let _mainBin  = parseInt(binEl ? binEl.value : 1) || 1;
                let _mainDith = dithChk ? dithChk.checked : false;
                let _mainDFreq = parseInt(dithFrq ? dithFrq.value : 4) || 4;
                let _mainFilter = isMono ? (localStorage.getItem('nina_filter_' + f.id) || f.name) : null;
                esposizioni.push({
                    count:     count,
                    exp:       _mainExp,
                    gain:      _mainGain,
                    offset:    _mainOff,
                    bin:       _mainBin,
                    dither:    _mainDith,
                    ditherFreq: _mainDFreq,
                    filterName: _mainFilter,
                    frameId:   f.id
                });
                // Blocco HDR: se il campo HDR è valorizzato
                let _hdrElPRO = document.getElementById(`pro-${f.id}-hdr`);
                let _hdrExpPRO = _hdrElPRO ? (parseInt(_hdrElPRO.value) || 0) : 0;
                if (_hdrExpPRO > 0) {
                    let _hdrCnt = Math.max(5, Math.ceil(count * 0.5));
                    esposizioni.push({
                        count:     _hdrCnt,
                        exp:       _hdrExpPRO,
                        gain:      _mainGain,
                        offset:    _mainOff,
                        bin:       _mainBin,
                        dither:    _mainDith,
                        ditherFreq: _mainDFreq,
                        filterName: _mainFilter ? _mainFilter + ' HDR' : null,
                        frameId:   f.id + '-hdr'
                    });
                }
            });

            if (esposizioni.length === 0) { alert(t("alert_noseq")); return; }

            // --- LETTURA TRIGGERS PRO ---
            let doCool   = document.getElementById('pro-cool')   ? document.getElementById('pro-cool').checked   : false;
            let tempCool = parseFloat(document.getElementById('pro-temp') ? document.getElementById('pro-temp').value : -10) || -10;
            let doSlew   = document.getElementById('pro-slew')   ? document.getElementById('pro-slew').checked   : false;
            let doRotate = document.getElementById('pro-rotate') ? document.getElementById('pro-rotate').checked : false;
            let doGuide  = document.getElementById('pro-guide')  ? document.getElementById('pro-guide').checked  : false;
            let doFlip   = document.getElementById('pro-flip')   ? document.getElementById('pro-flip').checked   : false;
            let doAfStart  = document.getElementById('pro-af-start')  ? document.getElementById('pro-af-start').checked  : false;
            let doAfFilter = document.getElementById('pro-af-filter') ? document.getElementById('pro-af-filter').checked : false;
            let doWarm   = document.getElementById('pro-warm')   ? document.getElementById('pro-warm').checked   : false;
            let doPark   = document.getElementById('pro-park')   ? document.getElementById('pro-park').checked   : false;
            let doCover  = document.getElementById('pro-cover')  ? document.getElementById('pro-cover').checked  : false;

            // --- GENERATORE ID PROGRESSIVI (come fa NINA nativamente) ---
            let _id = 0;
            const nid = () => String(++_id);

            // --- HELPER: ObservableCollection ---
            const makeCol = (type, values) => ({
                "$id": nid(),
                "$type": `System.Collections.ObjectModel.ObservableCollection\`1[[${type}, NINA.Sequencer]], System.ObjectModel`,
                "$values": values
            });
            const condCol  = (v=[]) => makeCol("NINA.Sequencer.Conditions.ISequenceCondition", v);
            const itemCol  = (v=[]) => makeCol("NINA.Sequencer.SequenceItem.ISequenceItem", v);
            const trigCol  = (v=[]) => makeCol("NINA.Sequencer.Trigger.ISequenceTrigger", v);
            const seqStrat = () => ({ "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" });

            // --- COORDINATE TARGET ---
            // Usa coordinate centro FOV se l'utente ha spostato la mappa
            let _fovRaDeg2  = fovCenterOverride ? fovCenterOverride.raDeg  : targetSelezionato.ra * 15;
            let _fovDecDeg2 = fovCenterOverride ? fovCenterOverride.decDeg : targetSelezionato.dec;
            let ra   = _fovRaDeg2 / 15;  // in ore decimali
            let dec  = _fovDecDeg2;
            let rh   = Math.floor(ra);
            let rm   = Math.floor((ra - rh) * 60);
            let rs   = ((ra - rh) * 60 - rm) * 60;
            let negD = dec < 0;
            let aD   = Math.abs(dec);
            let dd   = Math.floor(aD);
            let dm   = Math.floor((aD - dd) * 60);
            let ds   = ((aD - dd) * 60 - dm) * 60;
            let posAngle = parseFloat(document.getElementById('fov-rotation') ? document.getElementById('fov-rotation').value : 0) || 0;

            const makeCoords = () => ({
                "$id": nid(),
                "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry",
                "RAHours": rh, "RAMinutes": rm, "RASeconds": rs,
                "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds
            });

            // --- HELPER: FilterInfo minimale (come nel file reale) ---
            const makeFilter = (name) => ({
                "$id": nid(),
                "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core",
                "_name": name,
                "_focusOffset": 0,
                "_position": 0,
                "_autoFocusExposureTime": -1.0,
                "_autoFocusFilter": false
            });

            // --- HELPER: Dither trigger ---
            const makeDitherTrigger = (parentRef, freq) => {
                let runnerId = nid();
                let ditherId = nid();
                return {
                    "$id": nid(),
                    "$type": "NINA.Sequencer.Trigger.Guider.DitherAfterExposures, NINA.Sequencer",
                    "AfterExposures": freq,
                    "Parent": { "$ref": parentRef },
                    "TriggerRunner": {
                        "$id": runnerId,
                        "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                        "Strategy": seqStrat(),
                        "Name": null,
                        "Conditions": condCol(),
                        "IsExpanded": true,
                        "Items": itemCol([{
                            "$id": ditherId,
                            "$type": "NINA.Sequencer.SequenceItem.Guider.Dither, NINA.Sequencer",
                            "Parent": { "$ref": runnerId },
                            "ErrorBehavior": 0, "Attempts": 1
                        }]),
                        "Triggers": trigCol(),
                        "Parent": null,
                        "ErrorBehavior": 0, "Attempts": 1
                    }
                };
            };

            // --- SEZIONE START ---
            let startItems = [];
            if (doCool) startItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Camera.CoolCamera, NINA.Sequencer",
                "Temperature": tempCool, "Duration": 0.0,
                "Parent": { "$ref": "START_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });

            // --- SEZIONE END ---
            let endItems = [];
            if (doWarm) endItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Camera.WarmCamera, NINA.Sequencer",
                "Duration": 0.0,
                "Parent": { "$ref": "END_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });
            if (doCover) endItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.FlatDevice.CloseCover, NINA.Sequencer",
                "Parent": { "$ref": "END_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });
            if (doPark) endItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Telescope.ParkScope, NINA.Sequencer",
                "Parent": { "$ref": "END_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });

            // --- SEZIONE TARGET: items pre-imaging (pre-flight) ---
            let dsoPreItems = [];
            if (doSlew) dsoPreItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Platesolving.Center, NINA.Sequencer",
                "Inherited": true, "Coordinates": makeCoords(),
                "Parent": { "$ref": "DSO_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });
            if (doAfStart) dsoPreItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer",
                "Parent": { "$ref": "DSO_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });
            if (doRotate) dsoPreItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Platesolving.SolveAndRotate, NINA.Sequencer",
                "Inherited": true, "PositionAngle": posAngle,
                "Parent": { "$ref": "DSO_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });
            if (doGuide) dsoPreItems.push({
                "$id": nid(),
                "$type": "NINA.Sequencer.SequenceItem.Guider.StartGuiding, NINA.Sequencer",
                "ForceCalibration": false,
                "Parent": { "$ref": "DSO_REF" }, "ErrorBehavior": 0, "Attempts": 1
            });

            // --- BLOCCHI FILTRO (LoopCondition + SwitchFilter + TakeExposure + Dither) ---
            let imagingContId = nid(); // id del SequentialContainer "Target Imaging Instructions"
            let filterBlocks = [];

            esposizioni.forEach(expo => {
                let blockId = nid();
                let items = [];

                // SwitchFilter (solo sensori mono)
                if (expo.filterName) {
                    items.push({
                        "$id": nid(),
                        "$type": "NINA.Sequencer.SequenceItem.FilterWheel.SwitchFilter, NINA.Sequencer",
                        "Filter": makeFilter(expo.filterName),
                        "Parent": { "$ref": blockId }, "ErrorBehavior": 0, "Attempts": 1
                    });
                }
                // Autofocus al cambio filtro
                if (doAfFilter && expo.filterName) {
                    items.push({
                        "$id": nid(),
                        "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer",
                        "Parent": { "$ref": blockId }, "ErrorBehavior": 0, "Attempts": 1
                    });
                }
                // TakeExposure (singola — il loop è gestito da LoopCondition)
                items.push({
                    "$id": nid(),
                    "$type": "NINA.Sequencer.SequenceItem.Imaging.TakeExposure, NINA.Sequencer",
                    "ExposureTime": expo.exp,
                    "Gain": expo.gain,
                    "Offset": expo.offset,
                    "Binning": {
                        "$id": nid(),
                        "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core",
                        "X": expo.bin, "Y": expo.bin
                    },
                    "ImageType": "LIGHT",
                    "ExposureCount": 1,   // sempre 1: il loop è LoopCondition
                    "Parent": { "$ref": blockId }, "ErrorBehavior": 0, "Attempts": 1
                });

                // Dither trigger
                let triggers = [];
                if (expo.dither) triggers.push(makeDitherTrigger(blockId, expo.ditherFreq));

                filterBlocks.push({
                    "$id": blockId,
                    "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                    "Strategy": seqStrat(),
                    "Name": expo.filterName || "Light",
                    "Conditions": condCol([{
                        "$id": nid(),
                        "$type": "NINA.Sequencer.Conditions.LoopCondition, NINA.Sequencer",
                        "CompletedIterations": 0,
                        "Iterations": expo.count,
                        "Parent": { "$ref": blockId }
                    }]),
                    "IsExpanded": true,
                    "Items": itemCol(items),
                    "Triggers": trigCol(triggers),
                    "Parent": { "$ref": imagingContId },
                    "ErrorBehavior": 0, "Attempts": 1
                });
            });

            // Trigger Meridian Flip sul container imaging
            let imagingTriggers = [];
            if (doFlip) {
                let mfRunnerId = nid();
                imagingTriggers.push({
                    "$id": nid(),
                    "$type": "NINA.Sequencer.Trigger.MeridianFlip.MeridianFlipTrigger, NINA.Sequencer",
                    "Parent": { "$ref": imagingContId },
                    "TriggerRunner": {
                        "$id": mfRunnerId,
                        "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                        "Strategy": seqStrat(), "Name": null,
                        "Conditions": condCol(), "IsExpanded": true,
                        "Items": itemCol(), "Triggers": trigCol(),
                        "Parent": null, "ErrorBehavior": 0, "Attempts": 1
                    }
                });
            }

            // Container "Target Imaging Instructions"
            let imagingContainer = {
                "$id": imagingContId,
                "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                "Strategy": seqStrat(),
                "Name": "Target Imaging Instructions",
                "Conditions": condCol(),
                "IsExpanded": true,
                "Items": itemCol(filterBlocks),
                "Triggers": trigCol(imagingTriggers),
                "Parent": { "$ref": "DSO_REF" },
                "ErrorBehavior": 0, "Attempts": 1
            };

            // --- ExposureInfoList (lista display nell'UI di NINA) ---
            let expInfoValues = esposizioni.map(e => ({
                "$id": nid(),
                "$type": "NINA.Sequencer.Utility.ExposureInfo, NINA.Sequencer",
                "Count": e.count,
                "Filter": e.filterName || "",
                "ExposureTime": e.exp,
                "Gain": e.gain === -1 ? 80 : e.gain,
                "Offset": e.offset === -1 ? 15 : e.offset,
                "ImageType": "LIGHT",
                "BinningX": e.bin, "BinningY": e.bin, "ROI": 1.0
            }));

            // --- DeepSkyObjectContainer ---
            let dsoId = nid();
            let dsoContainer = {
                "$id": dsoId,
                "$type": "NINA.Sequencer.Container.DeepSkyObjectContainer, NINA.Sequencer",
                "Target": {
                    "$id": nid(),
                    "$type": "NINA.Astrometry.InputTarget, NINA.Astrometry",
                    "Expanded": true,
                    "TargetName": targetSelezionato.name,
                    "PositionAngle": posAngle,
                    "InputCoordinates": makeCoords()
                },
                "ExposureInfoListExpanded": true,
                "ExposureInfoList": {
                    "$id": nid(),
                    "$type": "NINA.Core.Utility.AsyncObservableCollection`1[[NINA.Sequencer.Utility.ExposureInfo, NINA.Sequencer]], NINA.Core",
                    "$values": expInfoValues
                },
                "Strategy": seqStrat(),
                "Name": targetSelezionato.name,
                "Conditions": condCol(),
                "IsExpanded": true,
                "Items": itemCol([...dsoPreItems, imagingContainer]),
                "Triggers": trigCol(),
                "Parent": { "$ref": "TARGET_REF" },
                "ErrorBehavior": 0, "Attempts": 1
            };

            // --- ASSEMBLAGGIO ROOT con $ref reali ---
            let rootId    = nid();
            let startId   = nid();
            let targetId  = nid();
            let endId     = nid();

            // Patch $ref placeholder con id reali
            const patchRefs = (obj, map) => {
                let str = JSON.stringify(obj);
                Object.entries(map).forEach(([k, v]) => {
                    str = str.replaceAll(`"$ref": "${k}"`, `"$ref": "${v}"`);
                });
                return JSON.parse(str);
            };

            let refMap = {
                "START_REF":  startId,
                "TARGET_REF": targetId,
                "END_REF":    endId,
                "DSO_REF":    dsoId
            };

            startItems    = patchRefs(startItems,    refMap);
            endItems      = patchRefs(endItems,      refMap);
            dsoContainer  = patchRefs(dsoContainer,  refMap);

            let ninaJSON = {
                "$id": rootId,
                "$type": "NINA.Sequencer.Container.SequenceRootContainer, NINA.Sequencer",
                "Strategy": seqStrat(),
                "Name": `AstroDashboard PRO - ${targetSelezionato.name}`,
                "Conditions": condCol(),
                "IsExpanded": true,
                "Items": itemCol([
                    {
                        "$id": startId,
                        "$type": "NINA.Sequencer.Container.StartAreaContainer, NINA.Sequencer",
                        "Strategy": seqStrat(), "Name": "Inizia",
                        "Conditions": condCol(), "IsExpanded": true,
                        "Items": itemCol(startItems),
                        "Triggers": trigCol(),
                        "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1
                    },
                    {
                        "$id": targetId,
                        "$type": "NINA.Sequencer.Container.TargetAreaContainer, NINA.Sequencer",
                        "Strategy": seqStrat(), "Name": "Targets",
                        "Conditions": condCol(), "IsExpanded": true,
                        "Items": itemCol([dsoContainer]),
                        "Triggers": trigCol(),
                        "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1
                    },
                    {
                        "$id": endId,
                        "$type": "NINA.Sequencer.Container.EndAreaContainer, NINA.Sequencer",
                        "Strategy": seqStrat(), "Name": "Fine",
                        "Conditions": condCol(), "IsExpanded": true,
                        "Items": itemCol(endItems),
                        "Triggers": trigCol(),
                        "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1
                    }
                ]),
                "Triggers": trigCol(),
                "Parent": null, "ErrorBehavior": 0, "Attempts": 1
            };

            // Download
            let blob = new Blob([JSON.stringify(ninaJSON, null, 2)], { type: 'application/json' });
            let url  = URL.createObjectURL(blob);
            let a    = document.createElement('a');
            a.href = url;
            a.download = `AD_PRO_${targetSelezionato.name.replace(/\s+/g,'_')}.json`;
            document.body.appendChild(a); a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        /* --- FINE LOGICA PLANCIA PRO --- */

