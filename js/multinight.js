// multinight.js — Progettazione Multinotte Smart + PRO, export per-notte
// ============================================================

        function apriMultiNight(contesto) {
            mnContesto = contesto || 'pro';

            // Calcola e mostra il TPT corretto in base al contesto
            if (mnContesto === 'pro') {
                // TPT PRO: pose × exp dalla griglia PRO (già calcolato in calcolaNightFillBar)
                let tptH = Math.floor(mnTptSecondi / 3600);
                let tptM = Math.floor((mnTptSecondi % 3600) / 60);
                document.getElementById('mn-target-label').innerText = t('mn_target_tpt');
                document.getElementById('mn-target-hours').innerText = `${tptH}h ${tptM}m`;
            } else {
                // TPT SMART: ore raccomandate dall'AI
                let tptH = Math.floor(oreNecessarieGlobali);
                let tptM = Math.round((oreNecessarieGlobali - tptH) * 60);
                document.getElementById('mn-target-label').innerText = t('mn_target_ai_label');
                document.getElementById('mn-target-hours').innerText = `${tptH}h ${tptM}m`;
                mnTptSecondi = oreNecessarieGlobali * 3600;
            }

            // Pianificato parte da 0, rosso
            let assEl = document.getElementById('mn-assigned-hours');
            assEl.innerText = '0h 0m';
            assEl.style.color = '#ff4444';

            // Reset barra
            let bar = document.getElementById('mn-progress-bar');
            if (bar) { bar.style.width = '0%'; bar.style.background = '#ff4444'; }
            let pctEl = document.getElementById('mn-progress-pct');
            if (pctEl) { pctEl.innerText = '0' + t('mn_completed'); pctEl.style.color = '#888'; }

            document.getElementById('mn-nights-container').innerHTML = ''; 
            contatoreNotti = 0;
            document.getElementById('multinight-modal').style.display = 'block';
            aggiungiNotte(); 
        }

        function chiudiMultiNight() { document.getElementById('multinight-modal').style.display = 'none'; }

        function autoCompilaPoseNotte(notteId) {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }

            let tS = document.getElementById(`start-mn-${notteId}`).value;
            let tE = document.getElementById(`end-mn-${notteId}`).value;
            if (!tS || !tE) { mostraAvviso(t("alert_times"), "warn"); return; }

            let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`);
            if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let aS = (dE - dS) / 1000; // secondi disponibili per questa notte

            let isM = document.getElementById('sensor-type').value === 'mono';
            let filtriIds = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];

            // Raccoglie filtri attivi (checkbox checked) per questa notte
            let aL = [];
            filtriIds.forEach(pid => {
                let chk = document.getElementById(`chk-mn-${notteId}-${pid}`);
                if (chk && chk.checked) aL.push(pid);
            });
            if (aL.length === 0) { mostraAvviso(t("alert_nolight"), "warn"); return; }

            // ── Stessa logica dei pesi di generaSequenzaOttimale ──
            let w = {};
            if (!isM) {
                w[aL[0]] = 1.0;
            } else {
                let narrowL = aL.filter(id => id.includes('ha') || id.includes('oiii') || id.includes('sii'));
                let broadL  = aL.filter(id => !id.includes('ha') && !id.includes('oiii') && !id.includes('sii'));
                let hNarrow = narrowL.length > 0;
                let hBroad  = broadL.length > 0;
                let hL      = aL.includes('m-l');

                if (!hNarrow) {
                    if (hL) {
                        let rgbSel = broadL.filter(id => id !== 'm-l');
                        let total = 1 + rgbSel.length * (1/3);
                        w['m-l'] = 1 / total;
                        rgbSel.forEach(id => w[id] = (1/3) / total);
                    } else {
                        let eq = 1.0 / aL.length; aL.forEach(id => w[id] = eq);
                    }
                } else if (!hBroad) {
                    let eq = 1.0 / aL.length; aL.forEach(id => w[id] = eq);
                } else {
                    let total = 0;
                    if (hL) total += 1;
                    broadL.filter(id => id !== 'm-l').forEach(id => total += 1/3);
                    narrowL.forEach(id => total += 1);
                    if (hL) w['m-l'] = 1 / total;
                    broadL.filter(id => id !== 'm-l').forEach(id => w[id] = (1/3) / total);
                    narrowL.forEach(id => total += 1); // già sommati sopra
                    narrowL.forEach(id => w[id] = 1 / total);
                }
            }

            // ── Categoria target (identica a generaSequenzaOttimale) ──
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

            const _catExpMap = {
                sh2: 300, lbn: 180, ldn: 120, vdb: 180, snr: 300,
                hii: 180, galassia: 120, planetaria: 60, globulare: 30, aperto: 60
            };
            let _dFreqG = (_catG === 'sh2') ? 3 : 4;
            let dD = parseInt(document.getElementById('dither-duration') ? document.getElementById('dither-duration').value : 15) || 15;

            // ── Calcola e compila pose per ogni filtro attivo ──
            aL.forEach(pid => {
                let _baseExp = (_catExpMap[_catG] !== undefined) ? _catExpMap[_catG] : 180;
                let eS;
                if (pid === 'm-l') eS = Math.min(_baseExp, 120);
                else if (pid.includes('ha') || pid.includes('oiii') || pid.includes('sii')) eS = Math.max(_baseExp, 300);
                else eS = _baseExp;

                // Dither: legge dalla griglia smart se disponibile
                let dChkF = document.getElementById(`${pid}-dither`);
                let uD = dChkF && dChkF.checked;
                let dFrqEl = document.getElementById(`${pid}-dfreq`);
                let dF = parseInt(dFrqEl ? dFrqEl.value : _dFreqG) || _dFreqG;
                let eeS = eS + (uD && dF > 0 ? dD / dF : 0);

                let countEl = document.getElementById(`count-mn-${notteId}-${pid}`);
                let expEl   = document.getElementById(`exp-mn-${notteId}-${pid}`);
                if (countEl) countEl.value = Math.max(1, Math.floor((aS * w[pid]) / eeS));
                if (expEl)   expEl.value   = eS;
            });

            ricalcolaOreNotte(notteId);
        }

function aggiungiNotte() {
            contatoreNotti++;
            let isM = document.getElementById('sensor-type').value === 'mono';
            
            let tS_def = document.getElementById('time-start').value || "21:00";
            let tE_def = document.getElementById('time-end').value || "05:00";
            
            let filtri = isM ? ['L', 'R', 'G', 'B', 'Ha', 'OIII', 'SII'] : ['Light'];
            let grigliaFiltri = `<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">`;
            
            filtri.forEach(f => {
                let intId = 'c-light'; 
                if(isM) { if(f==='L') intId='m-l'; else if(f==='R') intId='m-r'; else if(f==='G') intId='m-g'; else if(f==='B') intId='m-b'; else if(f==='Ha') intId='m-ha'; else if(f==='OIII') intId='m-oiii'; else if(f==='SII') intId='m-sii'; }
                
                // PRO: legge dalla griglia PRO; SMART: legge dalla griglia Smart
                let defCount = 0, defExp = 180;
                if (mnContesto === 'pro') {
                    let proCountEl = document.getElementById(`pro-${intId}-count`);
                    let proExpEl   = document.getElementById(`pro-${intId}-exp`);
                    defCount = (proCountEl && parseInt(proCountEl.value) > 0) ? parseInt(proCountEl.value) : 0;
                    defExp   = proExpEl ? (parseInt(proExpEl.value) || 180) : 180;
                } else {
                    // SMART: legge dalla griglia Smart (count e exp per filtro)
                    let smCountEl = document.getElementById(`${intId}-count`);
                    let smExpEl   = document.getElementById(`${intId}-exp`);
                    defCount = (smCountEl && parseInt(smCountEl.value) > 0) ? parseInt(smCountEl.value) : 0;
                    defExp   = smExpEl ? (parseInt(smExpEl.value) || 180) : 180;
                }
                let isChecked = defCount > 0 ? 'checked' : '';

                grigliaFiltri += `
                <div style="display: flex; align-items: center; justify-content: space-between; background: #222; border: 1px solid #444; padding: 8px 12px; border-radius: 4px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; width: 100px;">
                        <input type="checkbox" id="chk-mn-${contatoreNotti}-${intId}" value="${f}" ${isChecked} style="transform: scale(1.1);" onchange="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="font-size: 0.9em; color: #fff; font-weight: bold;">${f}</span>
                    </label>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <input type="number" id="count-mn-${contatoreNotti}-${intId}" value="${defCount}" min="0" style="width: 55px!important; padding: 4px!important; text-align: center; background: #111; border: 1px solid #555; color: #fff; border-radius: 3px;" oninput="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="color: #aaa; font-size: 0.85em;">pose x</span>
                        <input type="number" id="exp-mn-${contatoreNotti}-${intId}" value="${defExp}" min="1" style="width: 55px!important; padding: 4px!important; text-align: center; background: #111; border: 1px solid #555; color: #fff; border-radius: 3px;" oninput="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="color: #aaa; font-size: 0.85em;">s</span>
                    </div>
                </div>`;
            });
            grigliaFiltri += `</div>`;

            // ── Righe HDR (se attive) ──────────────────────────────────────
            let hdrFiltri = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];
            let hasHdr = false;
            hdrFiltri.forEach(hdrId => {
                // Smart: row visible? PRO: hdrActive !== '0'?
                let hdrRowEl = mnContesto === 'pro'
                    ? document.getElementById(`pro-${hdrId}-hdr-row`)
                    : document.getElementById(`${hdrId}-hdr-row`);
                if (!hdrRowEl) return;
                let isHdrOn = mnContesto === 'pro'
                    ? (hdrRowEl.dataset.hdrActive !== '0')
                    : (hdrRowEl.style.display !== 'none');
                if (!isHdrOn) return;
                let hdrCntEl = mnContesto === 'pro'
                    ? document.getElementById(`pro-${hdrId}-hdr-count`)
                    : document.getElementById(`${hdrId}-hdr-count`);
                let hdrExpEl = mnContesto === 'pro'
                    ? document.getElementById(`pro-${hdrId}-hdr-exp`)
                    : document.getElementById(`${hdrId}-hdr-exp`);
                let defHdrCount = hdrCntEl ? (parseInt(hdrCntEl.value)||0) : 0;
                let defHdrExp   = hdrExpEl ? (parseInt(hdrExpEl.value)||0) : 0;
                if (defHdrCount <= 0 && defHdrExp <= 0) return;
                hasHdr = true;
                let hdrLabel = hdrId.replace('m-','').replace('c-','').toUpperCase() + ' HDR';
                if (hdrLabel === 'LIGHT HDR') hdrLabel = 'Light HDR';
                if (hdrLabel === 'HA HDR') hdrLabel = 'Ha HDR';
                grigliaFiltri += `
                <div style="display: flex; align-items: center; justify-content: space-between; background: #1a0d2e; border: 1px solid #3a2050; padding: 8px 12px; border-radius: 4px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; width: 100px;">
                        <input type="checkbox" id="chk-mn-${contatoreNotti}-${hdrId}-hdr" ${defHdrCount > 0 ? 'checked' : ''} style="transform: scale(1.1);" onchange="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="font-size: 0.85em; color: #bb86fc; font-weight: bold;">✦ ${hdrLabel}</span>
                    </label>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <input type="number" id="count-mn-${contatoreNotti}-${hdrId}-hdr" value="${defHdrCount}" min="0" style="width: 55px!important; padding: 4px!important; text-align: center; background: #1a0d2e; border: 1px solid #3a2050; color: #bb86fc; border-radius: 3px;" oninput="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="color: #aaa; font-size: 0.85em;">pose x</span>
                        <input type="number" id="exp-mn-${contatoreNotti}-${hdrId}-hdr" value="${defHdrExp}" min="1" style="width: 55px!important; padding: 4px!important; text-align: center; background: #1a0d2e; border: 1px solid #3a2050; color: #bb86fc; border-radius: 3px;" oninput="ricalcolaOreNotte(${contatoreNotti})">
                        <span style="color: #aaa; font-size: 0.85em;">s</span>
                    </div>
                </div>`;
            });
            if (hasHdr) {
                grigliaFiltri = grigliaFiltri.replace(
                    '<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">',
                    '<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">'
                );
            }

            // NUOVA STRUTTURA CON ACCORDION
            let html = `
            <div style="background: #1a1a1a; border-radius: 8px; border: 1px solid #444; margin-bottom: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                
                <div onclick="toggleNotteBody(${contatoreNotti})" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #222; cursor: pointer; transition: background 0.2s;">
                    <span style="color: #ffaa00; font-weight: bold; font-size: 1.1em;">🌙 ${t("mn_sess")} #${contatoreNotti}</span>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <input type="text" id="ore-mn-${contatoreNotti}" style="width:65px!important; text-align:center; background:#000; border: 1px solid #555; color: #44ff44; font-weight: bold; font-size: 0.9em; pointer-events: none;" readonly>
                        <span id="icon-mn-${contatoreNotti}" style="font-size: 1.2em; color: #aaa; width: 15px; text-align: center;">▼</span>
                    </div>
                </div>
                
                <div id="body-mn-${contatoreNotti}" style="padding: 15px; border-top: 1px solid #333; display: block;">
                    <div style="display: flex; gap: 10px; align-items: flex-end; background: #000; padding: 10px; border-radius: 5px; border: 1px solid #333;">
                        <div style="flex:1;">
                            <label style="display:block; color:#aaa; font-size:0.7em; margin-bottom:5px;">${t("mn_start")}</label>
                            <input type="time" id="start-mn-${contatoreNotti}" value="${tS_def}" style="width:100%!important; background:#1a1a1a; border:1px solid #444; color:#fff; padding:6px; border-radius:4px;" onchange="ricalcolaOreNotte(${contatoreNotti})">
                        </div>
                        <div style="flex:1;">
                            <label style="display:block; color:#aaa; font-size:0.7em; margin-bottom:5px;">${t("mn_end")}</label>
                            <input type="time" id="end-mn-${contatoreNotti}" value="${tE_def}" style="width:100%!important; background:#1a1a1a; border:1px solid #444; color:#fff; padding:6px; border-radius:4px;" onchange="ricalcolaOreNotte(${contatoreNotti})">
                        </div>
                        <div style="padding-bottom: 5px; padding-left: 5px;">
                            <span class="info-icon" style="font-size:1.5em; vertical-align: middle;" onmouseenter="mostraTooltip(this, 'info_mn_nina')" onmouseleave="nascondiTooltip()">ℹ️</span>
                        </div>
                    </div>
                    
                    <div id="warn-mn-${contatoreNotti}" style="display:none; color:#ff4444; font-size:0.85em; margin-top:10px; font-weight:bold; background: rgba(255,68,68,0.1); padding: 8px; border-left: 3px solid #ff4444; border-radius: 4px;"></div>

                    <div style="display:flex; align-items:center; gap:10px; margin-top:15px; margin-bottom:5px;">
                        <span style="color:#bb86fc; font-size:0.7em; text-transform: uppercase; font-weight: bold;">Configurazione Pose:</span>
                        <button onclick="autoCompilaPoseNotte(${contatoreNotti})" title="Genera sequenza ottimale per questa notte" style="background:transparent; border:1px solid #00c6ff; color:#00c6ff; border-radius:6px; padding:3px 8px; cursor:pointer; display:flex; align-items:center; gap:5px; font-size:0.75em; font-weight:bold; white-space:nowrap; transition:all 0.2s;" onmouseover="this.style.background='rgba(0,198,255,0.12)'" onmouseout="this.style.background='transparent'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 19a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /><path d="M3 11a5 5 0 0 0 5 -5c0 -1.333 2 -1.333 2 0a5 5 0 0 0 5 5c1.333 0 1.333 2 0 2a5 5 0 0 0 -5 5a1 1 0 0 1 -2 0a5 5 0 0 0 -5 -5c-1.333 0 -1.333 -2 0 -2" /><path d="M16 7a1 1 0 0 1 0 -2a1 1 0 0 0 1 -1c0 -1.333 2 -1.333 2 0a1 1 0 0 0 1 1c1.333 0 1.333 2 0 2a1 1 0 0 0 -1 1c0 1.333 -2 1.333 -2 0a1 1 0 0 0 -1 -1" /></svg>
                            Auto Smart
                        </button>
                    </div>
                    ${grigliaFiltri}
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <button class="btn-guide" style="flex: 1; border-color: #555; color: #aaa; padding: 8px;" onclick="this.parentElement.parentElement.parentElement.remove(); calcolaTotaleNotti();">${t("mn_delete")}</button>
                        <button class="btn-search" style="flex: 2; font-size: 0.9em; padding: 8px; background: transparent; color: #ffaa00; border: 1px solid #ffaa00;" onclick="esportaNINAMultiNotte(${contatoreNotti})">${t("mn_export")} ${contatoreNotti}</button>
                    </div>
                </div>
            </div>`;
            
            document.getElementById('mn-nights-container').insertAdjacentHTML('beforeend', html);
            ricalcolaOreNotte(contatoreNotti);
        }

        // Funzioncina extra per gestire apertura/chiusura tendina
        function toggleNotteBody(id) {
            let body = document.getElementById(`body-mn-${id}`);
            let icon = document.getElementById(`icon-mn-${id}`);
            if (body.style.display === 'none') {
                body.style.display = 'block';
                icon.innerText = '▼';
            } else {
                body.style.display = 'none';
                icon.innerText = '◀';
            }
        }

        function ricalcolaOreNotte(id) {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let possibili = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];
            
            let ditherOverheadSecs = parseInt(document.getElementById('dither-duration') ? document.getElementById('dither-duration').value : 15) || 15;

            // Overhead per-frame identico a smart.js
            let _sw = parseFloat((document.getElementById('sensor-width')||{}).value) || 23.5;
            let _sh = parseFloat((document.getElementById('sensor-height')||{}).value) || 15.7;
            let _px = parseFloat((document.getElementById('pixel-size')||{}).value) || 3.76;
            let _mp = (_sw / (_px / 1000)) * (_sh / (_px / 1000)) / 1e6;
            let biasOverhead  = Math.max(1.0, 0.8 + _mp * 0.05);
            let lightOverhead = Math.max(1.5, 1.2 + _mp * 0.08);

            let totalSecs = 0;

            // Calcola il tempo in base alle pose inserite NELLA TABELLA DELLA NOTTE
            possibili.forEach(pid => {
                let chk = document.getElementById(`chk-mn-${id}-${pid}`);
                if (chk && chk.checked) {
                    let count = parseInt(document.getElementById(`count-mn-${id}-${pid}`).value) || 0;
                    let exp = parseInt(document.getElementById(`exp-mn-${id}-${pid}`).value) || 0;

                    if (count > 0) {
                        let eEff;
                        if (pid.includes('bias'))      eEff = biasOverhead;
                        else if (pid.includes('dark')) eEff = exp + lightOverhead;
                        else                           eEff = exp + lightOverhead;
                        let tempoPose = count * eEff;
                        // Dither solo per Light (non Bias/Dark)
                        let tempoDither = 0;
                        if (!pid.includes('bias') && !pid.includes('dark')) {
                            let dChkF = document.getElementById(`${pid}-dither`);
                            let usaDitherF = dChkF ? dChkF.checked : false;
                            let dFreqF = parseInt((document.getElementById(`${pid}-dfreq`) || {}).value) || 3;
                            tempoDither = (usaDitherF && dFreqF > 0) ? Math.floor(count / dFreqF) * ditherOverheadSecs : 0;
                        }
                        totalSecs += (tempoPose + tempoDither);
                    }
                }
            });

            let orePose = (totalSecs / 3600).toFixed(1);
            document.getElementById(`ore-mn-${id}`).value = orePose + "h";
            
            // Controlliamo se le pose inserite superano il tempo fisico (Inizio - Fine Notte)
            let tS = document.getElementById(`start-mn-${id}`).value;
            let tE = document.getElementById(`end-mn-${id}`).value;
            if(tS && tE) {
                let dS = new Date(`1970-01-01T${tS}:00`);
                let dE = new Date(`1970-01-01T${tE}:00`);
                if (dE <= dS) dE.setDate(dE.getDate() + 1); 
                let windowH = ((dE - dS) / 3600000).toFixed(1);
                
                let warnEl = document.getElementById(`warn-mn-${id}`);
                if(parseFloat(orePose) > parseFloat(windowH)) {
                    warnEl.style.display = 'block';
                    warnEl.innerHTML = `⚠️ <b>Sforamento!</b> Hai programmato ${orePose}h di pose, ma la finestra utile (da ${tS} a ${tE}) dura solo ${windowH}h.`;
                } else {
                    warnEl.style.display = 'none';
                }
            }

            // Calcola anche le righe HDR della notte
            let possibiliHdr = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];

            possibiliHdr.forEach(hdrPid => {
                let chkHdr = document.getElementById(`chk-mn-${id}-${hdrPid}-hdr`);
                if (chkHdr && chkHdr.checked) {
                    let countH = parseInt(document.getElementById(`count-mn-${id}-${hdrPid}-hdr`).value) || 0;
                    let expH   = parseInt(document.getElementById(`exp-mn-${id}-${hdrPid}-hdr`).value) || 0;
                    if (countH > 0 && expH > 0) {
                        // Overhead per-frame come per i Light
                        totalSecs += countH * (expH + lightOverhead);
                        // Dither HDR: usa checkbox e freq del filtro principale
                        let _hdrDChk = document.getElementById(`${hdrPid}-hdr-dither`);
                        let _usaDither = _hdrDChk ? _hdrDChk.checked : true;
                        if (_usaDither) {
                            let _hdrDFreq = parseInt((document.getElementById(`${hdrPid}-hdr-dfreq`)||{}).value) || 4;
                            totalSecs += Math.floor(countH / _hdrDFreq) * ditherOverheadSecs;
                        }
                    }
                }
            });

            calcolaTotaleNotti();
        }

        function calcolaTotaleNotti() {
            let container = document.getElementById('mn-nights-container'); if(!container) return;
            let inputs = container.querySelectorAll('input[type="text"][id^="ore-mn-"]');
            let totSec = 0;
            inputs.forEach(i => { totSec += (parseFloat(i.value.replace('h','')) || 0) * 3600; });

            let totH = Math.floor(totSec / 3600);
            let totM = Math.floor((totSec % 3600) / 60);

            let el = document.getElementById('mn-assigned-hours');
            if (el) {
                el.innerText = `${totH}h ${totM}m`;
                // Verde = TPT raggiunto, Rosso = ancora sotto
                el.style.color = (mnTptSecondi > 0 && totSec >= mnTptSecondi) ? '#44ff44' : '#ff4444';
            }

            // Barra progresso
            let pct = mnTptSecondi > 0 ? Math.min(100, Math.round((totSec / mnTptSecondi) * 100)) : 0;
            let bar = document.getElementById('mn-progress-bar');
            let pctEl = document.getElementById('mn-progress-pct');
            if (bar) {
                bar.style.width = pct + '%';
                bar.style.background = pct >= 100 ? '#44ff44' : pct >= 60 ? '#ffaa00' : '#ff4444';
            }
            if (pctEl) {
                pctEl.innerText = pct + t('mn_completed');
                pctEl.style.color = pct >= 100 ? '#44ff44' : '#888';
            }
        }

        function esportaNINAMultiNotte(notteId) {
            if (!targetSelezionato) return;

            // Contesto PRO o SMART determina da dove leggere i dati
            let isPro = (mnContesto === 'pro');
            // Il tipo sensore: PRO usa il suo select, SMART usa quello principale
            let isMono = isPro
                ? document.getElementById('pro-sensor-type').value === 'mono'
                : document.getElementById('sensor-type').value === 'mono';

            let possibili = isMono ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];
            let esposizioni = [];

            possibili.forEach(pid => {
                let chk = document.getElementById(`chk-mn-${notteId}-${pid}`);
                if (!chk || !chk.checked) return;

                // Count ed exp: sempre dalla griglia della notte (già inseriti dall'utente)
                let count = parseInt(document.getElementById(`count-mn-${notteId}-${pid}`).value) || 0;
                let exp   = parseInt(document.getElementById(`exp-mn-${notteId}-${pid}`).value) || 0;
                if (count <= 0 || exp <= 0) return;

                // Nome filtro NINA: PRO usa pro-nina-name, SMART usa nina-name
                let ninaName = null;
                if (isMono) {
                    let nameEl = isPro
                        ? document.getElementById(`pro-nina-name-${pid}`)
                        : document.getElementById(`nina-name-${pid}`);
                    ninaName = nameEl ? nameEl.value.trim() : pid;
                    if (!ninaName) ninaName = pid; // fallback
                } else {
                    // OSC con filtro dual/quad: usa il nome filtro OSC
                    let filterOscType = (document.getElementById('filter-osc-type')||{value:'none'}).value;
                    if (filterOscType !== 'none') {
                        let nameEl = document.getElementById('pro-nina-osc-filter-name') || document.getElementById('nina-osc-filter-name');
                        ninaName = (nameEl && nameEl.value.trim()) ? nameEl.value.trim()
                            : (filterOscType === 'dual' ? 'Dual-band' : 'Quad-band');
                    }
                }

                // Gain/Offset: PRO legge dalla griglia PRO, SMART usa default -1
                let gain = -1, offset = -1, bin = 1;
                if (isPro) {
                    let gainEl   = document.getElementById(`pro-${pid}-gain`);
                    let offsetEl = document.getElementById(`pro-${pid}-offset`);
                    let binEl    = document.getElementById(`pro-${pid}-bin`);
                    let gainRaw   = gainEl   ? gainEl.value.trim()   : 'Auto';
                    let offsetRaw = offsetEl ? offsetEl.value.trim() : 'Auto';
                    gain   = (gainRaw   === 'Auto' || gainRaw   === '') ? -1 : parseInt(gainRaw);
                    offset = (offsetRaw === 'Auto' || offsetRaw === '') ? -1 : parseInt(offsetRaw);
                    bin    = binEl ? (parseInt(binEl.value) || 1) : 1;
                }

                // Dither: PRO usa il suo checkbox per filtro, SMART usa quello globale
                let doDither = false, dFreq = 3;
                if (isPro) {
                    let dChk = document.getElementById(`pro-${pid}-dither`);
                    doDither = dChk ? dChk.checked : false;
                    dFreq    = parseInt((document.getElementById(`pro-${pid}-dfreq`) || {}).value) || 3;
                } else {
                    let dChk = document.getElementById(`${pid}-dither`);
                    doDither = dChk ? dChk.checked : false;
                    dFreq    = parseInt((document.getElementById(`${pid}-dfreq`) || {}).value) || 3;
                }

                esposizioni.push({ count, exp, filter: ninaName, type: "LIGHT", gain, offset, bin, doDither, dFreq });
            });

            // Aggiungi le righe HDR al export
            possibili.forEach(pid => {
                let chkHdr = document.getElementById(`chk-mn-${notteId}-${pid}-hdr`);
                if (!chkHdr || !chkHdr.checked) return;
                let countH = parseInt(document.getElementById(`count-mn-${notteId}-${pid}-hdr`).value) || 0;
                let expH   = parseInt(document.getElementById(`exp-mn-${notteId}-${pid}-hdr`).value) || 0;
                if (countH <= 0 || expH <= 0) return;
                let ninaNameHdr = null;
                if (isMono) {
                    let nameEl = isPro
                        ? document.getElementById(`pro-nina-name-${pid}`)
                        : document.getElementById(`nina-name-${pid}`);
                    let baseName = nameEl ? nameEl.value.trim() : pid;
                    ninaNameHdr = (baseName || pid) + ' HDR';
                }
                let gainH = -1, offsetH = -1, binH = 1;
                if (isPro) {
                    let gEl = document.getElementById(`pro-${pid}-hdr-gain`);
                    let oEl = document.getElementById(`pro-${pid}-hdr-offset`);
                    let bEl = document.getElementById(`pro-${pid}-hdr-bin`);
                    let gRaw = gEl ? gEl.value.trim() : 'Auto';
                    let oRaw = oEl ? oEl.value.trim() : 'Auto';
                    gainH   = (gRaw === 'Auto' || gRaw === '') ? -1 : parseInt(gRaw);
                    offsetH = (oRaw === 'Auto' || oRaw === '') ? -1 : parseInt(oRaw);
                    binH    = bEl ? (parseInt(bEl.value)||1) : 1;
                }
                let dChkH = isPro ? document.getElementById(`pro-${pid}-hdr-dither`) : document.getElementById(`${pid}-hdr-dither`);
                let dFrqHEl = isPro ? document.getElementById(`pro-${pid}-hdr-dfreq`) : document.getElementById(`${pid}-hdr-dfreq`);
                let doDitherH = dChkH ? dChkH.checked : false;
                let dFreqH = parseInt((dFrqHEl||{}).value)||4;
                esposizioni.push({ count: countH, exp: expH, filter: ninaNameHdr, type: "LIGHT", gain: gainH, offset: offsetH, bin: binH, doDither: doDitherH, dFreq: dFreqH });
            });

            let errFilter = lang === 'it' ? "Devi selezionare almeno un filtro per questa sessione!" : lang === 'en' ? "You must select at least one filter for this session!" : lang === 'es' ? "¡Debes seleccionar al menos un filtro para esta sesión!" : "您必须为本次拍摄选择至少一个滤镜！";
            if (esposizioni.length === 0) { mostraAvviso(errFilter, "warn"); return; }

            // GENERAZIONE JSON NINA SPECIFICO PER LA NOTTE
            let idCounter = 2000; function nextId() { return (idCounter++).toString(); }
            function makeObs(type, values) { return { "$id": nextId(), "$type": `System.Collections.ObjectModel.ObservableCollection\`1[[${type}, NINA.Sequencer]], System.ObjectModel`, "$values": values }; }
            
            // Usa coordinate centro FOV se l'utente ha spostato la mappa, altrimenti quelle del target
            let _fovRaDeg  = fovCenterOverride ? fovCenterOverride.raDeg  : targetSelezionato.ra * 15;
            let _fovDecDeg = fovCenterOverride ? fovCenterOverride.decDeg : targetSelezionato.dec;
            let ra = _fovRaDeg / 15, rh = Math.floor(ra), rm = Math.floor((ra - rh) * 60), rs = ((ra - rh) * 60 - rm) * 60;
            let dec = _fovDecDeg, negD = dec < 0, aD = Math.abs(dec), dd = Math.floor(aD), dm = Math.floor((aD - dd) * 60), ds = ((aD - dd) * 60 - dm) * 60;
            
            // Legge i trigger dal pannello corretto in base al contesto
            let startItems = [], dsoItems = [], endItems = [];
            let coolEl    = isPro ? document.getElementById('pro-cool')     : document.getElementById('nina-cool');
            let tempEl    = isPro ? document.getElementById('pro-temp')     : document.getElementById('nina-temp');
            let slewEl    = isPro ? document.getElementById('pro-slew')     : document.getElementById('nina-slew');
            let rotEl     = isPro ? document.getElementById('pro-rotate')   : document.getElementById('nina-rotate');
            let guideEl   = isPro ? document.getElementById('pro-guide')    : document.getElementById('nina-guide');
            let warmEl    = isPro ? document.getElementById('pro-warm')     : document.getElementById('nina-warm');
            let parkEl    = isPro ? document.getElementById('pro-park')     : document.getElementById('nina-park');
            let flipEl    = isPro ? document.getElementById('pro-flip')     : document.getElementById('nina-flip');
            // Autofocus: solo PRO ha questi checkbox
            let afStartEl  = document.getElementById('pro-af-start');
            let afFilterEl = document.getElementById('pro-af-filter');
            let afHfrEl    = document.getElementById('pro-af-hfr');
            let doAfStart  = isPro && afStartEl  && afStartEl.checked;
            let doAfFilter = isPro && afFilterEl && afFilterEl.checked;
            let doAfHfr    = isPro && afHfrEl    && afHfrEl.checked;
            // Orari sessione dalla notte corrente
            let _tSraw = document.getElementById(`start-mn-${notteId}`) ? document.getElementById(`start-mn-${notteId}`).value : '';
            let _tEraw = document.getElementById(`end-mn-${notteId}`)   ? document.getElementById(`end-mn-${notteId}`).value   : '';
            let _startH = _tSraw ? parseInt(_tSraw.split(':')[0]) : 21;
            let _startM = _tSraw ? parseInt(_tSraw.split(':')[1]) : 0;
            let _endH   = _tEraw ? parseInt(_tEraw.split(':')[0]) : 4;
            let _endM   = _tEraw ? parseInt(_tEraw.split(':')[1]) : 30;

            // UnparkScope — sempre presente
            startItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Telescope.UnparkScope, NINA.Sequencer", "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (coolEl  && coolEl.checked)  startItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.CoolCamera, NINA.Sequencer", "Temperature": parseFloat((tempEl||{}).value) || -10, "Duration": 0.0, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (slewEl  && slewEl.checked)  dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.Center, NINA.Sequencer", "Inherited": true, "Coordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds }, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (doAfStart) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (rotEl   && rotEl.checked)   dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.SolveAndRotate, NINA.Sequencer", "Inherited": true, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value)||0, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (guideEl && guideEl.checked) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.StartGuiding, NINA.Sequencer", "ForceCalibration": false, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            // WaitForTime — attende l'inizio sessione
            dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitForTime, NINA.Sequencer", "Hours": _startH, "Minutes": _startM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (warmEl  && warmEl.checked)  endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.WarmCamera, NINA.Sequencer", "Duration": 0.0, "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            if (parkEl  && parkEl.checked)  endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Telescope.ParkScope, NINA.Sequencer", "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });

            let imagingItemsList = [];
            esposizioni.forEach(expo => {
                let blockId = nextId(), blockItems = [];
                if (expo.filter) blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.FilterWheel.SwitchFilter, NINA.Sequencer", "Filter": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core", "_name": expo.filter, "_focusOffset": 0, "_position": 0, "_autoFocusExposureTime": -1.0, "_autoFocusFilter": false, "FlatWizardFilterSettings": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.FlatWizardFilterSettings, NINA.Core", "FlatWizardMode": 0, "HistogramMeanTarget": 0.5, "HistogramTolerance": 0.1, "MaxFlatExposureTime": 30.0, "MinFlatExposureTime": 0.01, "MaxAbsoluteFlatDeviceBrightness": 32767, "MinAbsoluteFlatDeviceBrightness": 0, "Gain": -1, "Offset": -1, "Binning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 } }, "_autoFocusBinning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 }, "_autoFocusGain": -1, "_autoFocusOffset": -1 }, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                // Usa LoopCondition (struttura nativa NINA) con gain/offset/bin dal contesto
                blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Imaging.TakeExposure, NINA.Sequencer", "ExposureTime": expo.exp, "Gain": expo.gain, "Offset": expo.offset, "Binning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": expo.bin, "Y": expo.bin }, "ImageType": expo.type, "ExposureCount": 0, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                let blockTriggers = [];
                if (expo.doDither && expo.dFreq > 0) {
                    let trigRunnerId = nextId(); blockTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Guider.DitherAfterExposures, NINA.Sequencer", "AfterExposures": expo.dFreq, "Parent": {"$ref": blockId}, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [{ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.Dither, NINA.Sequencer", "Parent": {"$ref": trigRunnerId}, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
                }
                imagingItemsList.push({ "$id": blockId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": expo.filter || "Light", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [{ "$id": nextId(), "$type": "NINA.Sequencer.Conditions.LoopCondition, NINA.Sequencer", "CompletedIterations": 0, "Iterations": expo.count, "Parent": {"$ref": blockId} }]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", blockItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", blockTriggers), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });
            });

            // Triggers imaging container: solo Meridian Flip
            let imagingTriggers = [];
            if (flipEl && flipEl.checked) { let trigRunnerId = nextId(); imagingTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.MeridianFlip.MeridianFlipTrigger, NINA.Sequencer", "Parent": null, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", []), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }

            // AboveHorizonCondition sul container imaging (offset 30°)
            let _aboveH = { "$id": nextId(), "$type": "NINA.Sequencer.Conditions.AboveHorizonCondition, NINA.Sequencer", "HasDsoParent": true, "Data": { "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitLoopData, NINA.Sequencer", "Coordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds }, "Offset": 30.0, "Comparator": 3 } };
            let _imagingContId = nextId();
            dsoItems.push({ "$id": _imagingContId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target Imaging Instructions", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [_aboveH]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", imagingItemsList), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", imagingTriggers), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 });

            // Triggers DSO container: HFR e cambio filtro
            let _dsoCId = nextId();
            let dsoTriggers = [];
            if (doAfHfr) { let hfrRid = nextId(); dsoTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterHFRIncreaseTrigger, NINA.Sequencer", "Amount": 10.0, "SampleSize": 10, "Parent": {"$ref": _dsoCId}, "TriggerRunner": { "$id": hfrRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": null, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition",[]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem",[{"$id":nextId(),"$type":"NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer","Parent":{"$ref":hfrRid},"ErrorBehavior":0,"Attempts":1}]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }
            if (doAfFilter) { let afFRid = nextId(); dsoTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterFilterChange, NINA.Sequencer", "Parent": {"$ref": _dsoCId}, "TriggerRunner": { "$id": afFRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": null, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition",[]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem",[{"$id":nextId(),"$type":"NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer","Parent":{"$ref":afFRid},"ErrorBehavior":0,"Attempts":1}]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }

            // TimeCondition (Loop Until Time = fine sessione) + DSO container
            let _timeCond = { "$id": nextId(), "$type": "NINA.Sequencer.Conditions.TimeCondition, NINA.Sequencer", "Hours": _endH, "Minutes": _endM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": {"$ref": _dsoCId} };
            let targetItems = [{ "$id": _dsoCId, "$type": "NINA.Sequencer.Container.DeepSkyObjectContainer, NINA.Sequencer", "Target": { "$id": nextId(), "$type": "NINA.Astrometry.InputTarget, NINA.Astrometry", "Expanded": true, "TargetName": targetSelezionato.name, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0.0, "InputCoordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds } }, "ExposureInfoListExpanded": false, "ExposureInfoList": null, "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": targetSelezionato.name, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [_timeCond]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", dsoItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", dsoTriggers), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 }];

            let ninaJSON = { "$id": nextId(), "$type": "NINA.Sequencer.Container.SequenceRootContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": `AstroDashboard - ${targetSelezionato.name} (Notte ${notteId})`, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [ { "$id": nextId(), "$type": "NINA.Sequencer.Container.StartAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Start", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", startItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": nextId(), "$type": "NINA.Sequencer.Container.TargetAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", targetItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": nextId(), "$type": "NINA.Sequencer.Container.EndAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "End", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", endItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } ]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 };

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ninaJSON, null, 2));
            let dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", `MultiNight_${targetSelezionato.name.replace(/\s+/g, '_')}_Sess${notteId}.json`); document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();
        }
        function apriReport() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }
            let isM = document.getElementById('sensor-type').value === 'mono';
            let frameList = isM ? framesMono : framesColor;
            
            let mx = parseInt(document.getElementById('mosaic-x').value) || 1;
            let my = parseInt(document.getElementById('mosaic-y').value) || 1;
            let overlap = parseInt(document.getElementById('mosaic-overlap').value) || 20;
            let panels = mx * my;

            let tS = document.getElementById('time-start').value;
            let tE = document.getElementById('time-end').value;
            if(!tS || !tE) { alert(t("alert_times")); return; }
            let dS = new Date(`1970-01-01T${tS}:00`); let dE = new Date(`1970-01-01T${tE}:00`); 
            if (dE <= dS) dE.setDate(dE.getDate() + 1);
            let aS = (dE - dS) / 1000;
            
            let formatTime = (secs) => `${Math.floor(secs/3600)}h ${Math.floor((secs%3600)/60)}m`;
            let totalTimeStr = formatTime(aS);
            let panelTimeStr = formatTime(aS / panels);
            
            let anyDitherMn = frameList.some(f => { let chk = document.getElementById(`${f.id}-dither`); return chk && chk.checked; });
            let dFreqMn = (() => { let frqs = frameList.map(f => { let el = document.getElementById(`${f.id}-dfreq`); return el ? parseInt(el.value)||3 : null; }).filter(v => v !== null); return frqs.length ? Math.min(...frqs) : 3; })();

            let planHtml = '';
            let rawText = `=== DOSSIER MOSAICO ===\nTARGET: ${getLocalizedName(targetSelezionato)}\n`;
            rawText += `PANNELLI: ${mx}x${my} (${panels} totali)\nSOVRAPPOSIZIONE: ${overlap}%\nTEMPO TOTALE: ${totalTimeStr}\n\n`;
            rawText += `--- STRATEGIA SINGOLO PANNELLO ---\nTempo max a pannello: ${panelTimeStr}\nDithering: ${anyDitherMn ? 'Ogni '+dFreqMn+' scatti' : 'Disattivato'}\n\n--- PIANO DI SCATTO ---\n`;

            let hasPoses = false;
            frameList.forEach(f => {
                let count = parseInt(document.getElementById(`${f.id}-count`).value) || 0;
                let exp = parseInt(document.getElementById(`${f.id}-exp`).value) || 0;
                if(count > 0 && exp > 0) {
                    hasPoses = true;
                    let filterName = (isM && (!f.id.includes('dark') && !f.id.includes('bias'))) ? document.getElementById(`nina-name-${f.id}`).value : f.name;
                    planHtml += `<div class="report-line"><span>${filterName}</span><b>${count}x ${exp}s</b></div>`;
                    rawText += `${filterName}: ${count}x ${exp}s\n`;
                }
            });

            if (!hasPoses) { alert(t("alert_noseq")); return; }

            let html = `
                <div class="report-section">
                    <h4>${t("report_general")}</h4>
                    <div class="report-line"><span>Target:</span><b>${getLocalizedName(targetSelezionato)}</b></div>
                    <div class="report-line"><span>Griglia:</span><b>${mx}x${my} (${panels})</b></div>
                    <div class="report-line"><span>${t("overlap").replace(':','')} :</span><b>${overlap}%</b></div>
                    <div class="report-line"><span>Tempo Totale:</span><b>${totalTimeStr}</b></div>
                </div>
                <div class="report-section">
                    <h4>${t("report_strategy")}</h4>
                    <div class="report-line"><span style="color:#44ff44;">Tempo a Pannello:</span><b style="color:#44ff44;">${panelTimeStr}</b></div>
                    <div class="report-line"><span>Dithering:</span><b>${anyDitherMn ? dFreqMn+' frames' : 'Off'}</b></div>
                </div>
                <div class="report-section">
                    <h4>${t("report_plan")}</h4>
                    ${planHtml}
                </div>
            `;
            
            document.getElementById('report-content').innerHTML = html;
            document.getElementById('btn-copy-report').setAttribute('data-raw', rawText);
            document.getElementById('btn-copy-report').innerHTML = `📋 ${t("copy_report")}`;
            document.getElementById('report-modal').style.display = 'block';
        }

        function chiudiReport() {
            document.getElementById('report-modal').style.display = 'none';
        }

        function copiaReport() {
            let txt = document.getElementById('btn-copy-report').getAttribute('data-raw');
            navigator.clipboard.writeText(txt).then(() => {
                document.getElementById('btn-copy-report').innerHTML = `✅ ${t("copied")}`;
                setTimeout(() => { document.getElementById('btn-copy-report').innerHTML = `📋 ${t("copy_report")}`; }, 2000);
            });
        }

        window.addEventListener('resize', () => { if(document.getElementById('planning-view').style.display === 'block') aggiornaFOV(); });
        // --- NAVIGAZIONE RAPIDA MOBILE ---
        function ottieniSezioniAttive() {
            // Selezioniamo in modo specifico i container principali per un salto più intelligente
            let vistaAttiva = document.getElementById('dashboard-view').style.display !== 'none' ? '#dashboard-view' : '#planning-view';
            let selettori = `${vistaAttiva} .ephemeris-box, ${vistaAttiva} .panel, ${vistaAttiva} #map, ${vistaAttiva} .astro-section, ${vistaAttiva} .search-local-box, ${vistaAttiva} .session-grid`;
            return Array.from(document.querySelectorAll(selettori)).filter(el => el.offsetParent !== null);
        }

        function scorriGiu() {
            let sezioni = ottieniSezioniAttive();
            for (let sec of sezioni) {
                let rect = sec.getBoundingClientRect();
                // Troviamo la prima sezione che è chiaramente SOTTO l'intestazione attuale
                if (rect.top > 120) { 
                    window.scrollBy({ top: rect.top - 20, behavior: 'smooth' });
                    return;
                }
            }
            // Se siamo alla fine, scrolla in fondo
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }

        function scorriSu() {
            let sezioni = ottieniSezioniAttive().reverse();
            for (let sec of sezioni) {
                let rect = sec.getBoundingClientRect();
                // Troviamo la prima sezione che è chiaramente SOPRA il limite visivo attuale
                if (rect.top < -50) {
                    window.scrollBy({ top: rect.top - 20, behavior: 'smooth' });
                    return;
                }
            }
            // Se siamo in cima, torna all'inizio assoluto
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        document.addEventListener('DOMContentLoaded', () => {
            changeLanguage(lang);
            popolaMenuAttrezzatura();
            ripristinaImpostazioniStrumento();
            inizializzaPersistenzaStrumento();
            aggiornaEffemeridi(new Date()); 
            scaricaDatiPrevisionali();

            // Ripristina l'ultima schermata visitata dopo un F5 (Refresh)
            let savedTarget = sessionStorage.getItem('ad_current_target');
            let savedView = sessionStorage.getItem('ad_current_view'); // Controlla se eravamo nella PRO
            
            if (savedTarget) {
                try { 
                    apriPianificazione(JSON.parse(savedTarget));
                    sessionStorage.setItem('ad_active_section', 'planning-view');

                    // Nascondi landing-view quando si ripristina planning
                    let lv = document.getElementById('landing-view');
                    if(lv) lv.style.display = 'none';
                    
                    // Se l'utente era nella Plancia PRO, riportalo lì automaticamente
                    if (savedView === 'pro') {
                        setTimeout(() => { setCalcMode('pro'); }, 150);
                    } else {
                        setTimeout(() => { setCalcMode('smart'); }, 150);
                    }
                } catch(e) { 
                    sessionStorage.removeItem('ad_current_target'); 
                }
            }

            // "Rubiamo" la rotellina del mouse nel simulatore FOV
            let fovContainer = document.getElementById('fov-simulator-container');
            if (fovContainer) {
                fovContainer.addEventListener('wheel', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    let zoomSlider = document.getElementById('fov-zoom');
                    let currentVal = parseInt(zoomSlider.value);
                    if (e.deltaY < 0) { currentVal += 15; } else { currentVal -= 15; }
                    if (currentVal < 20) currentVal = 20;
                    if (currentVal > 500) currentVal = 500;
                    zoomSlider.value = currentVal;
                    aggiornaFOV();
                }, { passive: false, capture: true });

                // Pinch-to-zoom su mobile (due dita)
                let pinchStartDist = null;
                let pinchStartVal = null;

                fovContainer.addEventListener('touchstart', function(e) {
                    if (e.touches.length === 2) {
                        e.preventDefault();
                        e.stopPropagation();
                        let dx = e.touches[0].clientX - e.touches[1].clientX;
                        let dy = e.touches[0].clientY - e.touches[1].clientY;
                        pinchStartDist = Math.sqrt(dx*dx + dy*dy);
                        pinchStartVal = parseInt(document.getElementById('fov-zoom').value);
                    }
                }, { passive: false, capture: true });

                fovContainer.addEventListener('touchmove', function(e) {
                    if (e.touches.length === 2 && pinchStartDist !== null) {
                        e.preventDefault();
                        e.stopPropagation();
                        let dx = e.touches[0].clientX - e.touches[1].clientX;
                        let dy = e.touches[0].clientY - e.touches[1].clientY;
                        let currentDist = Math.sqrt(dx*dx + dy*dy);
                        let ratio = currentDist / pinchStartDist;
                        let newVal = Math.round(pinchStartVal * ratio);
                        if (newVal < 20) newVal = 20;
                        if (newVal > 500) newVal = 500;
                        let zoomSlider = document.getElementById('fov-zoom');
                        zoomSlider.value = newVal;
                        aggiornaFOV();
                    }
                }, { passive: false, capture: true });

                fovContainer.addEventListener('touchend', function(e) {
                    if (e.touches.length < 2) {
                        pinchStartDist = null;
                        pinchStartVal = null;
                    }
                }, { capture: true });
            }
        });

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js').then(() => {
                    // SW registrato
                }).catch(err => console.error('Errore App:', err));

                // Ascolta messaggio SW_UPDATED → mostra banner
                navigator.serviceWorker.addEventListener('message', event => {
                    if (event.data && event.data.type === 'SW_UPDATED') {
                        const banner = document.getElementById('sw-update-banner');
                        const msg    = document.getElementById('sw-update-msg');
                        const btn    = document.getElementById('sw-update-btn');
                        if (!banner) return;
                        // Traduzione dinamica se i18n è già caricato
                        if (typeof t === 'function') {
                            if (msg) msg.textContent = '🔄 ' + t('sw_update_msg');
                            if (btn) btn.textContent = t('sw_update_btn');
                        }
                        banner.style.display = 'flex';
                    }
                });
            });
        }
