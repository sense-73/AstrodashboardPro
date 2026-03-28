// pro.js — Modulo PRO: griglia, fill bar, triggers, autofocus, export JSON
// ============================================================

// ── SETUP SYNC — Sincronizzazione bidirezionale con sezione Smart ──────────

        function toggleProSetupPanel() {
            let body = document.getElementById('pro-setup-body');
            let chevron = document.getElementById('pro-setup-chevron');
            if (!body || !chevron) return;
            let isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            chevron.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        }

        function sincronizzaSetupDaSmartAPro() {
            // Clona opzioni telescopio
            let srcTel = document.getElementById('preset-telescope');
            let dstTel = document.getElementById('pro-preset-telescope');
            if (srcTel && dstTel) { dstTel.innerHTML = srcTel.innerHTML; dstTel.value = srcTel.value; }

            // Clona opzioni sensore
            let srcSens = document.getElementById('preset-sensor');
            let dstSens = document.getElementById('pro-preset-sensor');
            if (srcSens && dstSens) { dstSens.innerHTML = srcSens.innerHTML; dstSens.value = srcSens.value; }

            // Sync input numerici
            ['focal-length', 'aperture', 'sensor-width', 'sensor-height', 'pixel-size'].forEach(id => {
                let src = document.getElementById(id);
                let dst = document.getElementById('pro-' + id);
                if (src && dst) dst.value = src.value;
            });

            // Sync BIN attivo
            let activeBin = document.querySelector('#bin-selector .bin-active');
            if (activeBin) {
                let binVal = activeBin.dataset.bin;
                document.querySelectorAll('#pro-bin-selector .bin-btn').forEach(b => {
                    b.classList.toggle('bin-active', b.dataset.bin === binVal);
                });
            }

            // Sync modalità (singolo / mosaico)
            let srcMode = document.getElementById('capture-mode');
            let dstMode = document.getElementById('pro-capture-mode');
            if (srcMode && dstMode) {
                dstMode.value = srcMode.value;
                let mosaicDiv = document.getElementById('pro-mosaic-settings');
                if (mosaicDiv) mosaicDiv.style.display = srcMode.value === 'mosaic' ? 'flex' : 'none';
            }

            // Sync valori mosaico
            ['mosaic-x', 'mosaic-y', 'mosaic-overlap'].forEach(id => {
                let src = document.getElementById(id);
                let dst = document.getElementById('pro-' + id);
                if (src && dst) dst.value = src.value;
            });

            // Aggiorna display FOV/campionamento/f-ratio
            aggiornaDisplayFOVPro();
        }

        function aggiornaDisplayFOVPro() {
            let fovEl     = document.getElementById('fov-result');
            let sampEl    = document.getElementById('sampling-result');
            let sampMsgEl = document.getElementById('sampling-msg');
            let focal     = parseFloat(document.getElementById('focal-length')?.value) || 0;
            let aperture  = parseFloat(document.getElementById('aperture')?.value) || 1;

            let prFov     = document.getElementById('pro-fov-display');
            let prSamp    = document.getElementById('pro-sampling-display');
            let prSampMsg = document.getElementById('pro-sampling-msg');
            let prFratio  = document.getElementById('pro-fratio-display');

            if (fovEl     && prFov)     prFov.innerHTML     = fovEl.innerHTML;
            if (sampEl    && prSamp)    prSamp.innerHTML    = sampEl.innerHTML;
            if (sampMsgEl && prSampMsg) prSampMsg.innerHTML = sampMsgEl.innerHTML;
            if (prFratio && focal && aperture > 0) {
                prFratio.innerHTML = 'f/' + (focal / aperture).toFixed(1);
            }
        }

        // Input numerico cambiato in PRO → aggiorna Smart + ricalcola
        function proSyncNumerico(proId, smartId) {
            let proEl   = document.getElementById(proId);
            let smartEl = document.getElementById(smartId);
            if (!proEl || !smartEl) return;
            smartEl.value = proEl.value;
            if (typeof aggiornaFOV   === 'function') aggiornaFOV();
            if (typeof calcolaTempi  === 'function') calcolaTempi();
            setTimeout(aggiornaDisplayFOVPro, 50);
        }

        // Preset telescopio cambiato in PRO
        function proApplicaPresetTelescopio() {
            let dstTel = document.getElementById('pro-preset-telescope');
            let srcTel = document.getElementById('preset-telescope');
            if (!srcTel || !dstTel) return;
            srcTel.value = dstTel.value;
            if (typeof applicaPresetTelescopio === 'function') applicaPresetTelescopio();
            if (typeof aggiornaAI              === 'function') aggiornaAI();
            setTimeout(() => {
                ['focal-length', 'aperture'].forEach(id => {
                    let s = document.getElementById(id);
                    let d = document.getElementById('pro-' + id);
                    if (s && d) d.value = s.value;
                });
                aggiornaDisplayFOVPro();
            }, 30);
        }

        // Preset sensore cambiato in PRO
        function proApplicaPresetSensore() {
            let dstSens = document.getElementById('pro-preset-sensor');
            let srcSens = document.getElementById('preset-sensor');
            if (!srcSens || !dstSens) return;
            srcSens.value = dstSens.value;
            if (typeof applicaPresetSensore === 'function') applicaPresetSensore();
            setTimeout(() => {
                ['sensor-width', 'sensor-height', 'pixel-size'].forEach(id => {
                    let s = document.getElementById(id);
                    let d = document.getElementById('pro-' + id);
                    if (s && d) d.value = s.value;
                });
                aggiornaDisplayFOVPro();
            }, 30);
        }

        // BIN selezionato in PRO
        function selezionaBINPro(n) {
            if (typeof selezionaBIN === 'function') selezionaBIN(n);
            document.querySelectorAll('#pro-bin-selector .bin-btn').forEach(b => {
                b.classList.toggle('bin-active', parseInt(b.dataset.bin) === n);
            });
            setTimeout(aggiornaDisplayFOVPro, 50);
        }

        // Modalità mosaico cambiata in PRO
        function toggleProMosaic() {
            let dstMode   = document.getElementById('pro-capture-mode');
            let srcMode   = document.getElementById('capture-mode');
            let mosaicDiv = document.getElementById('pro-mosaic-settings');
            if (!dstMode) return;
            let val = dstMode.value;
            if (mosaicDiv) mosaicDiv.style.display = val === 'mosaic' ? 'flex' : 'none';
            if (srcMode) {
                srcMode.value = val;
                if (typeof toggleMosaic === 'function') toggleMosaic();
                if (typeof aggiornaFOV  === 'function') aggiornaFOV();
                setTimeout(aggiornaDisplayFOVPro, 50);
            }
        }

        // Valori mosaico cambiati in PRO
        function proSyncMosaic() {
            ['mosaic-x', 'mosaic-y', 'mosaic-overlap'].forEach(id => {
                let src = document.getElementById('pro-' + id);
                let dst = document.getElementById(id);
                if (src && dst) dst.value = src.value;
            });
            if (typeof aggiornaFOV === 'function') aggiornaFOV();
            setTimeout(aggiornaDisplayFOVPro, 50);
        }

        // Orari sessione cambiati in PRO → aggiorna anche Smart
        function proSyncTime() {
            let pStart = document.getElementById('pro-time-start');
            let pEnd   = document.getElementById('pro-time-end');
            let sStart = document.getElementById('time-start');
            let sEnd   = document.getElementById('time-end');
            if (pStart && sStart) sStart.value = pStart.value;
            if (pEnd   && sEnd)   sEnd.value   = pEnd.value;
            if (typeof calcolaTempi === 'function') calcolaTempi();
        }

// ── FINE SETUP SYNC ─────────────────────────────────────────────────────────

        function _injectProSetupPanel() {
            // Rimuove eventuale pannello precedente e lo ricrea sempre fresco
            let old = document.getElementById('pro-setup-inject');
            if (old) old.remove();

            let seqGrid = document.getElementById('pro-sequence-grid');
            if (!seqGrid) return;

            let panel = document.createElement('div');
            panel.id = 'pro-setup-inject';
            panel.style.cssText = 'background:#1c2230; border:1px solid #2d3a50; border-radius:10px; padding:14px 16px; margin-bottom:18px;';

            panel.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none;" onclick="toggleProSetupPanel()">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <svg width="16" height="16" stroke="currentColor" fill="none" style="color:#c49a3c;flex-shrink:0;"><use href="#i-telescope"/></svg>
                        <span style="font-size:0.85em; font-weight:700; color:#c9d1d9;">Setup Ottico &amp; FOV</span>
                        <span style="font-size:0.66em; color:#3d4852; font-family:monospace; text-transform:uppercase; letter-spacing:0.5px;">· sincronizzato con Smart</span>
                    </div>
                    <svg id="pro-setup-chevron" width="16" height="16" style="flex-shrink:0; transition:transform 0.25s; color:#6e7a8a;" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </div>

                <div id="pro-setup-body" style="margin-top:12px;">

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">

                        <div style="background:#161b22; border-radius:7px; padding:11px; border:1px solid #21293a;">
                            <div style="font-size:0.7em; color:#c49a3c; text-transform:uppercase; letter-spacing:1px; margin-bottom:9px; font-weight:700;">
                                <svg width="12" height="12" style="display:inline-block;vertical-align:middle;" stroke="currentColor" fill="none"><use href="#i-telescope"/></svg> Ottica
                            </div>
                            <div class="input-group">
                                <label>Telescopio:</label>
                                <select id="pro-preset-telescope" onchange="proApplicaPresetTelescopio()" style="flex:1;">
                                    <option value="">-- Seleziona --</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label>Focale (mm):</label>
                                <input type="number" id="pro-focal-length" value="400" oninput="proSyncNumerico('pro-focal-length','focal-length')">
                            </div>
                            <div class="input-group" style="margin-bottom:0;">
                                <label style="color:#c49a3c;">Diametro (mm):</label>
                                <input type="number" id="pro-aperture" value="72" oninput="proSyncNumerico('pro-aperture','aperture')">
                            </div>
                        </div>

                        <div style="background:#161b22; border-radius:7px; padding:11px; border:1px solid #21293a;">
                            <div style="font-size:0.7em; color:#00c6ff; text-transform:uppercase; letter-spacing:1px; margin-bottom:9px; font-weight:700;">
                                <svg width="12" height="12" style="display:inline-block;vertical-align:middle;" stroke="currentColor" fill="none"><use href="#i-camera"/></svg> Sensore
                            </div>
                            <div class="input-group">
                                <label>Sensore:</label>
                                <select id="pro-preset-sensor" onchange="proApplicaPresetSensore()">
                                    <option value="">-- Seleziona --</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label>W (mm):</label>
                                <input type="number" id="pro-sensor-width" value="23.5" step="0.1" oninput="proSyncNumerico('pro-sensor-width','sensor-width')">
                            </div>
                            <div class="input-group">
                                <label>H (mm):</label>
                                <input type="number" id="pro-sensor-height" value="15.7" step="0.1" oninput="proSyncNumerico('pro-sensor-height','sensor-height')">
                            </div>
                            <div class="input-group" style="margin-bottom:0;">
                                <label>Pixel (µm):</label>
                                <input type="number" id="pro-pixel-size" value="3.76" step="0.01" oninput="proSyncNumerico('pro-pixel-size','pixel-size')">
                            </div>
                        </div>
                    </div>

                    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center; padding:9px 12px; background:#161b22; border-radius:7px; border:1px solid #21293a; margin-bottom:10px;">
                        <div style="display:flex; align-items:center; gap:7px;">
                            <span style="font-size:0.8em; color:#6e7a8a;">BIN:</span>
                            <div id="pro-bin-selector" style="display:flex; gap:4px;">
                                <button class="bin-btn bin-active" data-bin="1" onclick="selezionaBINPro(1)">1×1</button>
                                <button class="bin-btn" data-bin="2" onclick="selezionaBINPro(2)">2×2</button>
                                <button class="bin-btn" data-bin="3" onclick="selezionaBINPro(3)">3×3</button>
                                <button class="bin-btn" data-bin="4" onclick="selezionaBINPro(4)">4×4</button>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; gap:7px; margin-left:auto;">
                            <label style="width:auto; color:#c49a3c; font-weight:bold; font-size:0.88em;">Modalità:</label>
                            <select id="pro-capture-mode" onchange="toggleProMosaic()" style="background:#131920; border:1px solid #c49a3c; color:#c49a3c; padding:4px 8px; border-radius:4px; cursor:pointer; width:auto!important; font-size:0.88em;">
                                <option value="single">Scatto Singolo</option>
                                <option value="mosaic">Mosaico</option>
                            </select>
                        </div>
                        <div id="pro-mosaic-settings" style="display:none; align-items:center; gap:7px; flex-wrap:wrap; width:100%; padding-top:9px; border-top:1px solid #2d3a50; margin-top:3px;">
                            <label style="width:auto;">Pannelli (X, Y):</label>
                            <input type="number" id="pro-mosaic-x" value="2" min="1" max="10" oninput="proSyncMosaic()" style="width:46px!important; padding:4px!important; text-align:center;">
                            <span>×</span>
                            <input type="number" id="pro-mosaic-y" value="2" min="1" max="10" oninput="proSyncMosaic()" style="width:46px!important; padding:4px!important; text-align:center;">
                            <label style="width:auto; margin-left:10px;">Overlap:</label>
                            <input type="number" id="pro-mosaic-overlap" value="20" min="5" max="50" step="5" oninput="proSyncMosaic()" style="width:52px!important; padding:4px!important; text-align:center;">
                            <span>%</span>
                        </div>
                    </div>

                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <div style="flex:1; min-width:90px; text-align:center; background:#0d1117; padding:8px 10px; border-radius:7px; border:1px solid #21293a;">
                            <div style="font-size:0.62em; color:#6e7a8a; text-transform:uppercase; letter-spacing:1px; margin-bottom:3px;">FOV</div>
                            <div id="pro-fov-display" style="font-size:1.05em; font-weight:bold; color:#44ff44;">--° × --°</div>
                        </div>
                        <div style="flex:1; min-width:90px; text-align:center; background:#0d1117; padding:8px 10px; border-radius:7px; border:1px solid #21293a;">
                            <div style="font-size:0.62em; color:#6e7a8a; text-transform:uppercase; letter-spacing:1px; margin-bottom:3px;">Campionamento</div>
                            <div id="pro-sampling-display" style="font-size:0.95em; font-weight:bold; color:#c9d1d9;">-- "/px</div>
                            <div id="pro-sampling-msg" style="font-size:0.72em; margin-top:2px;"></div>
                        </div>
                        <div style="flex:1; min-width:90px; text-align:center; background:#0d1117; padding:8px 10px; border-radius:7px; border:1px solid #21293a;">
                            <div style="font-size:0.62em; color:#6e7a8a; text-transform:uppercase; letter-spacing:1px; margin-bottom:3px;">f/ratio</div>
                            <div id="pro-fratio-display" style="font-size:1.2em; font-weight:bold; color:#c49a3c;">f/--</div>
                        </div>
                    </div>

                </div>
            `;

            seqGrid.parentNode.insertBefore(panel, seqGrid);
        }

        function setCalcMode(mode) {
            let smartSection = document.getElementById('mode-smart-section');
            let proSection   = document.getElementById('mode-pro-section');
            let btnSmart     = document.getElementById('btn-mode-smart');
            let btnPro       = document.getElementById('btn-mode-pro');
            if (!smartSection || !proSection) return;

            if (mode === 'pro') {
                smartSection.style.display = 'none';
                proSection.style.display   = 'block';
                btnSmart.style.background  = 'transparent';
                btnSmart.style.color       = '#6e7a8a';
                btnPro.style.background    = '#c49a3c';
                btnPro.style.color         = '#0d1117';
                sessionStorage.setItem('ad_current_view', 'pro');
                disegnaGrigliaPro();
                calcolaNightFillBar();
            } else {
                smartSection.style.display = 'block';
                proSection.style.display   = 'none';
                btnSmart.style.background  = '#00c6ff';
                btnSmart.style.color       = '#0d1117';
                btnPro.style.background    = 'transparent';
                btnPro.style.color         = '#6e7a8a';
                sessionStorage.setItem('ad_current_view', 'smart');
            }
        }

        // Legacy aliases (kept for any remaining references)
        function apriProView()  { setCalcMode('pro'); }
        function chiudiProView() { setCalcMode('smart'); }

        function disegnaGrigliaPro() {
            let isMono = document.getElementById('sensor-type').value === 'mono'; 
            
            aggiornaFiltriNinaPro(); // Richiama i filtri appena creati!
            
            let frameList = isMono ? framesMono : framesColor;
            let container = document.getElementById('pro-sequence-grid');
            container.innerHTML = '';

            container.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 0.8fr 0.8fr 0.65fr 0.65fr 0.65fr 1fr 0.9fr; gap: 5px; font-size: 0.8em; color: #aaa; text-align: center; border-bottom: 1px solid #444; padding-bottom: 5px;">
                    <div style="text-align: left;">Filtro</div>
                    <div>Pose</div>
                    <div>Secs</div>
                    <div>Gain</div>
                    <div>Offset</div>
                    <div>Bin</div>
                    <div>Dither (Freq.)</div>
                    <div>Totale <span onmouseenter="mostraTooltip(this,'overhead_col_tip')" onmouseleave="nascondiTooltip()" style="color:#888;cursor:help;display:inline-flex;align-items:center;vertical-align:middle;"><svg width='13' height='13' style='vertical-align:middle'><use href='#i-settings'/></svg></span></div>
                </div>
            `;

            // ── Righe Light/colore (con dither) ──────────────────────────
            frameList.forEach(f => {
                if(f.id.includes('dark') || f.id.includes('bias')) return;

                let defaultCount = document.getElementById(`${f.id}-count`) ? document.getElementById(`${f.id}-count`).value : 0;
                let defaultExp = document.getElementById(`${f.id}-exp`) ? document.getElementById(`${f.id}-exp`).value : f.dE;
                let defaultName = localStorage.getItem('nina_filter_' + f.id) || f.name;

                let row = document.createElement('div');
                row.style.cssText = "display: grid; grid-template-columns: 1fr 0.8fr 0.8fr 0.65fr 0.65fr 0.65fr 1fr 0.9fr; gap: 5px; align-items: center; background: #1a1a1a; padding: 10px; border-radius: 4px; border-left: 3px solid #00c6ff;";
                
                row.innerHTML = `
                    <div style="font-weight: bold; color: #fff; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${defaultName}">${defaultName}</div>
                    <input type="number" id="pro-${f.id}-count" value="${defaultCount}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="number" id="pro-${f.id}-exp" value="${defaultExp}" min="1" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="text" id="pro-${f.id}-gain" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="text" id="pro-${f.id}-offset" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <select id="pro-${f.id}-bin" style="width: 100%!important; padding: 4px!important; text-align: center; box-sizing: border-box;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                        <input type="checkbox" id="pro-${f.id}-dither" checked style="transform: scale(1.2); cursor: pointer;" onchange="calcolaNightFillBar()">
                        <input type="number" id="pro-${f.id}-dfreq" value="4" min="1" style="width: 45px!important; padding: 4px!important; text-align: center;" oninput="calcolaNightFillBar()">
                    </div>
                    <div id="pro-${f.id}-tot" style="text-align: center; color: #aaa; font-size: 0.82em;">—</div>
                `;
                container.appendChild(row);
                // ── Riga companion Light HDR (sempre visibile, toggle ON/OFF) ───
                let hdrRowPro = document.createElement('div');
                hdrRowPro.id = `pro-${f.id}-hdr-row`;
                hdrRowPro.dataset.hdrActive = '1';
                hdrRowPro.style.cssText = 'display: grid; grid-template-columns: 1fr 0.8fr 0.8fr 0.65fr 0.65fr 0.65fr 1fr 0.9fr; gap: 5px; align-items: center; background: #160d24; padding: 8px 10px; border-radius: 4px; border-left: 3px solid #7c4dff; margin-top: 3px; margin-bottom: 8px;';
                hdrRowPro.innerHTML = `
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">
                        <span style="color:#bb86fc;font-weight:bold;font-size:0.82em;white-space:nowrap;">✦ Light HDR</span>
                        <span class="info-icon" style="font-size:1.0em;margin-left:2px;cursor:help;" onmouseenter="mostraTooltip(this,'info_hdr_row')" onmouseleave="nascondiTooltip()">ℹ️</span>
                        <button id="pro-${f.id}-hdr-toggle"
                            onclick="toggleHdrRowPro('${f.id}')"
                            style="background:#7c4dff;color:#fff;border:none;border-radius:3px;padding:2px 8px;font-size:0.7em;font-weight:700;cursor:pointer;letter-spacing:0.5px;flex-shrink:0;">ON</button>
                    </div>
                    <input type="number" id="pro-${f.id}-hdr-count" value="0" min="0" oninput="calcolaNightFillBar()"
                        style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box; background:#1a0d2e; border:1px solid #3a2050; color:#bb86fc;">
                    <input type="number" id="pro-${f.id}-hdr-exp" value="" placeholder="s" min="0" oninput="calcolaNightFillBar()"
                        style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box; background:#1a0d2e; border:1px solid #3a2050; color:#bb86fc;">
                    <input type="text" id="pro-${f.id}-hdr-gain" value="Auto"
                        style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box; background:#1a0d2e; border:1px solid #3a2050;">
                    <input type="text" id="pro-${f.id}-hdr-offset" value="Auto"
                        style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box; background:#1a0d2e; border:1px solid #3a2050;">
                    <select id="pro-${f.id}-hdr-bin"
                        style="width: 100%!important; padding: 4px!important; box-sizing: border-box; background:#1a0d2e; border:1px solid #3a2050;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                        <input type="checkbox" id="pro-${f.id}-hdr-dither" checked style="transform: scale(1.2); cursor: pointer;" onchange="calcolaNightFillBar()">
                        <input type="number" id="pro-${f.id}-hdr-dfreq" value="4" min="1"
                            style="width: 45px!important; padding: 4px!important; text-align: center; background:#1a0d2e; border:1px solid #3a2050;" oninput="calcolaNightFillBar()">
                    </div>
                    <div id="pro-${f.id}-hdr-tot" style="text-align: center; color: #bb86fc; font-size: 0.82em;">—</div>
                `;
                container.appendChild(hdrRowPro);
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
                row.style.cssText = `display: grid; grid-template-columns: 1fr 0.8fr 0.8fr 0.65fr 0.65fr 0.65fr 1fr 0.9fr; gap: 5px; align-items: center; background: #141414; padding: 10px; border-radius: 4px; border-left: 3px solid ${borderColor};`;

                let expCell = isDark
                    ? `<input type="number" id="pro-${f.id}-exp" value="${defaultExp}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">`
                    : `<div style="text-align:center; color:#666; font-size:0.85em;">
                           0
                           <span style="display:none" id="pro-${f.id}-exp">${biasOverhead}</span>
                       </div>`;

                row.innerHTML = `
                    <div style="font-weight: bold; color: #aaa; font-size: 0.9em;">${defaultName}</div>
                    <input type="number" id="pro-${f.id}-count" value="${defaultCount}" min="0" oninput="calcolaNightFillBar()" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    ${expCell}
                    <input type="text" id="pro-${f.id}-gain" value="${f.id.includes('bias') ? '0' : 'Auto'}" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <input type="text" id="pro-${f.id}-offset" value="Auto" style="width: 100%!important; text-align: center; padding: 4px!important; box-sizing: border-box;">
                    <select id="pro-${f.id}-bin" style="width: 100%!important; padding: 4px!important; box-sizing: border-box;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    <div style="color:#555; text-align:center; font-size:0.85em;">—</div>
                    <div id="pro-${f.id}-tot" style="text-align: center; color: #aaa; font-size: 0.82em;">—</div>
                `;
                container.appendChild(row);
            });

            calcolaNightFillBar();
        }

        function calcolaNightFillBar() {
            let tS = document.getElementById('time-start').value;
            let tE = document.getElementById('time-end').value;
            if(!tS || !tE) return;

            let dS = new Date(`1970-01-01T${tS}:00`);
            let dE = new Date(`1970-01-01T${tE}:00`);
            if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let secDisponibili = (dE - dS) / 1000;

            let secUsati = 0;
            let ditherOverheadSecs = 15;
            let isMono = document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;

            // Ricalcola bias overhead con valori sensore attuali
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.7;
            let px = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let mp = (sw / (px / 1000)) * (sh / (px / 1000)) / 1e6;
            let biasOverhead  = Math.max(1.0, 0.8 + mp * 0.05);
            let lightOverhead = Math.max(1.5, 1.2 + mp * 0.08);

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

                // Dark: overhead per-frame (stesso file size del light)
                if (f.id.includes('dark')) {
                    if (count > 0 && exp > 0) secUsati += count * (exp + lightOverhead);
                    return;
                }

                let ditherEl = document.getElementById(`pro-${f.id}-dither`);
                let usaDither = ditherEl ? ditherEl.checked : false;
                let dFreqEl = document.getElementById(`pro-${f.id}-dfreq`);
                let dFreq = dFreqEl ? (parseInt(dFreqEl.value) || 1) : 1;

                if (count > 0 && exp > 0) {
                    let tempoPose = count * (exp + lightOverhead);
                    let tempoDither = 0;
                    if (usaDither && dFreq > 0) {
                        tempoDither = Math.floor(count / dFreq) * ditherOverheadSecs;
                    }
                    // HDR companion row
                    let _hdrTime = 0;
                    let _hdrRowFill = document.getElementById(`pro-${f.id}-hdr-row`);
                    if (_hdrRowFill && _hdrRowFill.dataset.hdrActive !== '0') {
                        let _hdrC = parseInt((document.getElementById(`pro-${f.id}-hdr-count`)||{}).value)||0;
                        let _hdrE = parseInt((document.getElementById(`pro-${f.id}-hdr-exp`)||{}).value)||0;
                        if (_hdrC > 0 && _hdrE > 0) {
                            _hdrTime += _hdrC * (_hdrE + lightOverhead);
                            let _hdrDith = document.getElementById(`pro-${f.id}-hdr-dither`);
                            let _hdrDFreqEl = document.getElementById(`pro-${f.id}-hdr-dfreq`);
                            if (_hdrDith && _hdrDith.checked && _hdrDFreqEl) {
                                _hdrTime += Math.floor(_hdrC / (parseInt(_hdrDFreqEl.value)||4)) * ditherOverheadSecs;
                            }
                        }
                    }
                    secUsati += (tempoPose + tempoDither + _hdrTime);
                    // Aggiorna totale per-riga light
                    let _totEl = document.getElementById(`pro-${f.id}-tot`);
                    if (_totEl) {
                        let _rowSec = tempoPose + tempoDither;
                        _totEl.innerHTML = _rowSec > 0
                            ? formatSeconds(_rowSec)
                            : '—';
                    }
                    // Aggiorna totale riga HDR
                    let _hdrTotEl = document.getElementById(`pro-${f.id}-hdr-tot`);
                    if (_hdrTotEl) _hdrTotEl.innerHTML = _hdrTime > 0 ? formatSeconds(_hdrTime) : '—';
                }
            });

            // Aggiorna totali per-riga dark e bias
            frameList.forEach(f => {
                if (!f.id.includes('dark') && !f.id.includes('bias')) return;
                let _totEl = document.getElementById(`pro-${f.id}-tot`);
                if (!_totEl) return;
                let _cnt = parseInt((document.getElementById(`pro-${f.id}-count`)||{}).value)||0;
                let _exp = parseFloat((document.getElementById(`pro-${f.id}-exp`)||{}).value)||0;
                if (_cnt <= 0) { _totEl.innerHTML = '—'; return; }
                if (f.id.includes('bias')) {
                    _totEl.innerHTML = formatSeconds(_cnt * biasOverhead);
                } else {
                    _totEl.innerHTML = formatSeconds(_cnt * (_exp + lightOverhead));
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
                btnMn.style.display = 'inline-block';
            }

            // Aggiorna pannelli Smart (solo valori, senza warning/button)
            let _calcAvail = document.getElementById('calc-available');
            let _calcTotal = document.getElementById('calc-total');
            let _calcResid = document.getElementById('calc-residual');
            if (_calcAvail) _calcAvail.innerText = `${Math.floor(secDisponibili/3600)}h ${Math.floor((secDisponibili%3600)/60)}m`;
            if (_calcTotal) _calcTotal.innerText = `${Math.floor(secUsati/3600)}h ${Math.floor((secUsati%3600)/60)}m`;
            if (_calcResid) {
                let _rS = secDisponibili - secUsati;
                if (_rS >= 0) {
                    _calcResid.innerText = `${Math.floor(_rS/3600)}h ${Math.floor((_rS%3600)/60)}m`;
                    _calcResid.className = 'text-green';
                } else {
                    let _abs = Math.abs(_rS);
                    _calcResid.innerText = `- ${Math.floor(_abs/3600)}h ${Math.floor((_abs%3600)/60)}m`;
                    _calcResid.className = 'text-red';
                }
            }
        }
        function esportaNinaPRO() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }

            // --- LETTURA PARAMETRI DALLA GRIGLIA PRO ---
            let isMono = document.getElementById('sensor-type').value === 'mono';
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
                // Nome filtro OSC dual/quad per NINA
                let oscFilterNamePro = null;
                if (!isMono) {
                    let filterOscType = (document.getElementById('filter-osc-type')||{value:'none'}).value;
                    if (filterOscType !== 'none') {
                        let nameEl = document.getElementById('pro-nina-osc-filter-name') || document.getElementById('nina-osc-filter-name');
                        oscFilterNamePro = (nameEl && nameEl.value.trim()) ? nameEl.value.trim()
                            : (filterOscType === 'dual' ? 'Dual-band' : 'Quad-band');
                    }
                }
                let _mainFilter = isMono ? (localStorage.getItem('nina_filter_' + f.id) || f.name) : oscFilterNamePro;
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
                // Blocco HDR: legge dalla riga companion
                let _hdrRowNina = document.getElementById(`pro-${f.id}-hdr-row`);
                if (_hdrRowNina && _hdrRowNina.dataset.hdrActive !== '0') {
                    let _hdrCnt = parseInt((document.getElementById(`pro-${f.id}-hdr-count`)||{}).value)||0;
                    let _hdrExpPRO = parseInt((document.getElementById(`pro-${f.id}-hdr-exp`)||{}).value)||0;
                    if (_hdrCnt > 0 && _hdrExpPRO > 0) {
                        let _hdrGain   = (document.getElementById(`pro-${f.id}-hdr-gain`)  ||{}).value||'Auto';
                        let _hdrOffset = (document.getElementById(`pro-${f.id}-hdr-offset`)||{}).value||'Auto';
                        let _hdrBin    = parseInt((document.getElementById(`pro-${f.id}-hdr-bin`)||{}).value)||1;
                        let _hdrDith   = (document.getElementById(`pro-${f.id}-hdr-dither`)||{}).checked||false;
                        let _hdrDFreq  = parseInt((document.getElementById(`pro-${f.id}-hdr-dfreq`)||{}).value)||4;
                        esposizioni.push({
                            count:     _hdrCnt,
                            exp:       _hdrExpPRO,
                            gain:      (_hdrGain==='Auto'||_hdrGain==='')?-1:parseInt(_hdrGain),
                            offset:    (_hdrOffset==='Auto'||_hdrOffset==='')?-1:parseInt(_hdrOffset),
                            bin:       _hdrBin,
                            dither:    _hdrDith,
                            ditherFreq: _hdrDFreq,
                            filterName: _mainFilter ? _mainFilter + ' HDR' : null,
                            frameId:   f.id + '-hdr'
                        });
                    }
                }
            });

            if (esposizioni.length === 0) { mostraAvviso(t("alert_noseq"), "warn"); return; }

            // --- LETTURA TRIGGERS PRO ---
            let doCool   = document.getElementById('pro-cool')   ? document.getElementById('pro-cool').checked   : false;
            let tempCool = parseFloat(document.getElementById('pro-temp') ? document.getElementById('pro-temp').value : -10) || -10;
            let doSlew   = document.getElementById('pro-slew')   ? document.getElementById('pro-slew').checked   : false;
            let doRotate = document.getElementById('pro-rotate') ? document.getElementById('pro-rotate').checked : false;
            let doGuide  = document.getElementById('pro-guide')  ? document.getElementById('pro-guide').checked  : false;
            let doFlip   = document.getElementById('pro-flip')   ? document.getElementById('pro-flip').checked   : false;
            let doAfStart  = document.getElementById('pro-af-start')  ? document.getElementById('pro-af-start').checked  : false;
            let doAfFilter = document.getElementById('pro-af-filter') ? document.getElementById('pro-af-filter').checked : false;
            let doAfHfr    = document.getElementById('pro-af-hfr')    ? document.getElementById('pro-af-hfr').checked    : false;
            // Orari sessione (time-start / time-end)
            let _tS = document.getElementById('time-start') ? document.getElementById('time-start').value : '';
            let _tE = document.getElementById('time-end')   ? document.getElementById('time-end').value   : '';
            let _startH = _tS ? parseInt(_tS.split(':')[0]) : 21;
            let _startM = _tS ? parseInt(_tS.split(':')[1]) : 0;
            let _endH   = _tE ? parseInt(_tE.split(':')[0]) : 4;
            let _endM   = _tE ? parseInt(_tE.split(':')[1]) : 30;
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

            // --- HELPER: FilterInfo completo (conforme al prototipo NINA) ---
            const makeFilter = (name) => ({
                "$id": nid(),
                "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core",
                "_name": name,
                "_focusOffset": 0,
                "_position": 0,
                "_autoFocusExposureTime": -1.0,
                "_autoFocusFilter": false,
                "FlatWizardFilterSettings": {
                    "$id": nid(),
                    "$type": "NINA.Core.Model.Equipment.FlatWizardFilterSettings, NINA.Core",
                    "FlatWizardMode": 0,
                    "HistogramMeanTarget": 0.5,
                    "HistogramTolerance": 0.1,
                    "MaxFlatExposureTime": 30.0,
                    "MinFlatExposureTime": 0.01,
                    "MaxAbsoluteFlatDeviceBrightness": 32767,
                    "MinAbsoluteFlatDeviceBrightness": 0,
                    "Gain": -1,
                    "Offset": -1,
                    "Binning": { "$id": nid(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 }
                },
                "_autoFocusBinning": { "$id": nid(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 },
                "_autoFocusGain": -1,
                "_autoFocusOffset": -1
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
            // UnparkScope — sempre presente
            startItems.push({ "$id": nid(), "$type": "NINA.Sequencer.SequenceItem.Telescope.UnparkScope, NINA.Sequencer", "Parent": { "$ref": "START_REF" }, "ErrorBehavior": 0, "Attempts": 1 });
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
            // WaitForTime — attende l'inizio sessione
            dsoPreItems.push({ "$id": nid(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitForTime, NINA.Sequencer", "Hours": _startH, "Minutes": _startM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": { "$ref": "DSO_REF" }, "ErrorBehavior": 0, "Attempts": 1 });

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
                // Autofocus al cambio filtro: gestito dal trigger AutofocusAfterFilterChange sul container imaging
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
                    "ExposureCount": 0,   // 0: il loop è gestito da LoopCondition
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

            // Container "Target Imaging Instructions" con AboveHorizonCondition (offset 30°)
            let _aboveH = { "$id": nid(), "$type": "NINA.Sequencer.Conditions.AboveHorizonCondition, NINA.Sequencer", "HasDsoParent": true, "Data": { "$id": nid(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitLoopData, NINA.Sequencer", "Coordinates": makeCoords(), "Offset": 30.0, "Comparator": 3 }, "Parent": { "$ref": imagingContId } };
            let imagingContainer = {
                "$id": imagingContId,
                "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                "Strategy": seqStrat(),
                "Name": "Target Imaging Instructions",
                "Conditions": condCol([_aboveH]),
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
                "Conditions": condCol([{ "$id": nid(), "$type": "NINA.Sequencer.Conditions.TimeCondition, NINA.Sequencer", "Hours": _endH, "Minutes": _endM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": { "$ref": dsoId } }]),
                "IsExpanded": true,
                "Items": itemCol([...dsoPreItems, imagingContainer]),
                "Triggers": (() => { let _t = []; if (doAfHfr) { let hfrRid = nid(); _t.push({ "$id": nid(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterHFRIncreaseTrigger, NINA.Sequencer", "Amount": 10.0, "SampleSize": 10, "Parent": { "$ref": dsoId }, "TriggerRunner": { "$id": hfrRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": seqStrat(), "Name": null, "Conditions": condCol(), "IsExpanded": true, "Items": itemCol([{ "$id": nid(), "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": { "$ref": hfrRid }, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": trigCol(), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); } if (doAfFilter) { let afFRid = nid(); _t.push({ "$id": nid(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterFilterChange, NINA.Sequencer", "Parent": { "$ref": dsoId }, "TriggerRunner": { "$id": afFRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": seqStrat(), "Name": null, "Conditions": condCol(), "IsExpanded": true, "Items": itemCol([{ "$id": nid(), "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": { "$ref": afFRid }, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": trigCol(), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); } return trigCol(_t); })(),
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

        function toggleHdrRowPro(filterId) {
            let row = document.getElementById(`pro-${filterId}-hdr-row`);
            let btn = document.getElementById(`pro-${filterId}-hdr-toggle`);
            if (!row || !btn) return;
            let isActive = row.dataset.hdrActive !== '0';
            isActive = !isActive;
            row.dataset.hdrActive = isActive ? '1' : '0';
            row.style.opacity = isActive ? '1' : '0.4';
            btn.textContent = isActive ? 'ON' : 'OFF';
            btn.style.background = isActive ? '#7c4dff' : '#444';
            btn.style.color = isActive ? '#fff' : '#888';
            row.querySelectorAll('input, select').forEach(el => { el.disabled = !isActive; });
            calcolaNightFillBar();
        }
