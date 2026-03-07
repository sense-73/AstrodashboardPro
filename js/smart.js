// smart.js — Calcolatore Smart: AI predittivo, sequenza ottimale, filtri NINA
// ============================================================
function toggleLock(id) {
            let el = document.getElementById(id + '-lock');
            if (!el) return;
            if (el.innerText === '🔓') {
                el.innerText = '🔒';
                el.style.opacity = '1';
                el.classList.add('locked');
            } else {
                el.innerText = '🔓';
                el.style.opacity = '0.5';
                el.classList.remove('locked');
            }
        }

        function toggleSensorMode() {
            let isM = document.getElementById('sensor-type').value === 'mono';
            let c = document.getElementById('frames-container'); c.innerHTML = '';
            let filterWarning = document.getElementById('nina-filter-warning');
            if (filterWarning) filterWarning.style.display = isM ? 'block' : 'none';

            // Header colonne
            let header = document.createElement('div');
            header.style.cssText = 'display:grid; grid-template-columns: 130px 60px 70px 60px 60px 60px 80px 70px; gap:5px; font-size:0.75em; color:#aaa; text-align:center; border-bottom:1px solid #444; padding-bottom:5px; margin-bottom:6px;';
            header.innerHTML = '<div style="text-align:left;">Filtro</div><div>Pose</div><div>Secs</div><div>Gain</div><div>Offset</div><div>Bin</div><div>Dither</div><div style="text-align:right;">Totale</div>';
            c.appendChild(header);

            (isM ? framesMono : framesColor).forEach(f => {
                let isL  = !f.id.includes('dark') && !f.id.includes('bias');
                let isDk = f.id.includes('dark');
                let isBs = f.id.includes('bias');

                let r = document.createElement('div');
                r.style.cssText = `display:grid; grid-template-columns: 130px 60px 70px 60px 60px 60px 80px 70px; gap:5px; align-items:center; background:#222; padding:7px 8px; border-radius:5px; border-left:3px solid #555; margin-bottom:6px;`;
                r.className = f.class;

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
                           <span id="${f.id}-lock" onclick="toggleLock('${f.id}')" title="Blocca secondi" style="cursor:pointer;font-size:1.1em;opacity:0.4;user-select:none;line-height:1;">🔓</span>
                       </div>`;

                // Dither: solo sui Light
                let ditherCell = isL
                    ? `<div style="display:flex;align-items:center;gap:3px;justify-content:center;"><input type="checkbox" id="${f.id}-dither" checked style="transform:scale(1.1);cursor:pointer;"><input type="number" id="${f.id}-dfreq" value="3" min="1" style="width:32px!important;padding:2px!important;text-align:center;" oninput="calcolaTempi()"></div>`
                    : `<div style="color:#555;text-align:center;">—</div>`;

                r.innerHTML = `
                    ${nameCell}
                    <input type="number" id="${f.id}-count" value="${f.dC}" min="0" oninput="calcolaTempi()" style="width:100%!important;text-align:center;padding:3px!important;">
                    ${expInput}
                    <input type="text" id="${f.id}-gain" value="${defGain}" style="width:100%!important;text-align:center;padding:3px!important;">
                    <input type="text" id="${f.id}-offset" value="Auto" style="width:100%!important;text-align:center;padding:3px!important;">
                    <select id="${f.id}-bin" style="width:100%!important;padding:3px!important;">
                        <option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option>
                    </select>
                    ${ditherCell}
                    <div class="calc-total" id="${f.id}-tot" style="text-align:right;">0h 0m</div>
                `;
                c.appendChild(r);
            });

            // Sincronizza Dark exp = primo Light exp (dinamico)
            sincronizzaDarkExp();
            aggiornaFiltriNina();
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

            let tyName = document.getElementById('stat-type').innerText.toLowerCase();
            let nameID = targetSelezionato.id || targetSelezionato.name;

            // 1. TEMPI BASE F/4 E IDENTIFICAZIONE
            let bH = 2; // Default
            let isEmission = tyName.includes('emission') || tyName.includes('planetari') || tyName.includes('pn') || tyName.includes('snr') || tyName.includes('h ii');

            // Il trucco magico: peschiamo il nome già tradotto in tempo reale dal Dossier!
            let tipoNomeReport = document.getElementById('stat-type').innerText;

            if(dsoVIP[nameID]) { 
                bH = dsoVIP[nameID].hours; 
                tipoNomeReport = tipoNomeReport + " (VIP)";
            } else {
                if(tyName.includes('ammasso')||tyName.includes('cluster')) { bH = 1; }
                else if(tyName.includes('galassi')||tyName.includes('galaxy')) { bH = 2; }
                else if(tyName.includes('emission')||tyName.includes('riflessione')||tyName.includes('mista')) { bH = 4; }
                else if(tyName.includes('planetari')||tyName.includes('pn')) { bH = 1; }
                else if(tyName.includes('supernova')||tyName.includes('snr')) { bH = 4; }
                else if(tyName.includes('oscura')||tyName.includes('dark')) { bH = 20; }
            }

            // 2. COMPENSAZIONE MAGNITUDINE (+1h / -1h per punto, base 6.0)
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
            let sFact = (doingN && !isEmission) ? 2.0 : 1.0;

            // 5. FASE LUNARE
            let dOggi = new Date(); if (dOggi.getHours() < 12) dOggi.setDate(dOggi.getDate() - 1);
            let mIll = SunCalc.getMoonIllumination(dOggi).fraction;
            let mFact = 1.0;
            if(!doingN) {
                if(mIll > 0.3 && mIll <= 0.75) mFact = 1.5;
                else if(mIll > 0.75) mFact = 2.0;
            }

            // 6. CALCOLO FINALE 
            let totId = subT * sFact * mFact * fFact;
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            let panels = 1;
            if (isMosaic) {
                panels = (parseInt(document.getElementById('mosaic-x').value)||1) * (parseInt(document.getElementById('mosaic-y').value)||1);
                totId *= panels;
            }

            oreNecessarieGlobali = totId; 

            // 7. TEMPO DISPONIBILE STANOTTE
            let tS = document.getElementById('time-start').value, tE = document.getElementById('time-end').value, aS = 0;
            if(tS && tE) { 
                let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`); 
                if (dE <= dS) dE.setDate(dE.getDate() + 1); 
                aS = (dE - dS) / 3600000; 
            }

            // 8. RENDER DEL REPORT GIUSTIFICATIVO MULTI-NOTTE
            let html = `<h4 style="margin:0 0 10px 0; color:#ffaa00; border-bottom:1px solid #333; padding-bottom:5px; display:flex; align-items:center; justify-content:space-between;"><span>${t("ai_strat_title")}</span> <span class="info-icon" style="font-size: 0.9em; font-weight:normal;" onmouseenter="mostraTooltip(this, 'info_strat_analysis')" onmouseleave="nascondiTooltip()">ℹ️</span></h4>`;
            
            if (aS < totId * 0.9) {
                let reason = "";
                if(lang === 'it') {
                    reason = `Trattandosi di <b>${tipoNomeReport}</b> di magnitudine <b>${mVal.toFixed(1)}</b> ripresa a <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` divisa in <b>${panels} pannelli</b> (Mosaico)`;
                    reason += `, l'algoritmo stima necessarie <b style="color:#ffaa00;">${totId.toFixed(1)} ore</b> di integrazione.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* È applicata una penalità 2x perché stai usando filtri Narrow su un target a banda larga.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* È applicata una penalità per forte inquinamento lunare.</i>`;
                    reason += `<br><br>Il tempo utile di stanotte (> 30° sull'orizzonte) è di <b style="color:#ff4444;">${aS.toFixed(1)} ore</b> ed è insufficiente.`;
                } else if(lang === 'en') {
                    reason = `Being a <b>${tipoNomeReport}</b> of magnitude <b>${mVal.toFixed(1)}</b> shot at <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` split in <b>${panels} panels</b> (Mosaic)`;
                    reason += `, the algorithm estimates <b style="color:#ffaa00;">${totId.toFixed(1)} hours</b> of total integration.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A 2x penalty is applied for using Narrowband filters on a Broadband target.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* A penalty for heavy lunar light pollution is applied.</i>`;
                    reason += `<br><br>Tonight's useful time (> 30° altitude) is <b style="color:#ff4444;">${aS.toFixed(1)} hours</b>, which is insufficient.`;
                } else if(lang === 'es') {
                    reason = `Tratándose de <b>${tipoNomeReport}</b> de magnitud <b>${mVal.toFixed(1)}</b> capturada a <b>f/${fR.toFixed(1)}</b>`;
                    if (isMosaic && panels > 1) reason += ` dividida en <b>${panels} paneles</b> (Mosaico)`;
                    reason += `, el algoritmo estima necesarias <b style="color:#ffaa00;">${totId.toFixed(1)} horas</b> de integración total.`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica una penalización 2x por usar filtros Narrowband en un objetivo de banda ancha.</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* Se aplica una penalización por fuerte contaminación lumínica lunar.</i>`;
                    reason += `<br><br>El tiempo útil de esta noche (> 30° sobre el horizonte) es de <b style="color:#ff4444;">${aS.toFixed(1)} horas</b> y resulta insuficiente.`;
                } else {
                    reason = `作为星等 <b>${mVal.toFixed(1)}</b> 的 <b>${tipoNomeReport}</b>，在 <b>f/${fR.toFixed(1)}</b> 下拍摄`;
                    if (isMosaic && panels > 1) reason += `，分为 <b>${panels} 个面板</b> (拼接)`;
                    reason += `，算法估计需要 <b style="color:#ffaa00;">${totId.toFixed(1)} 小时</b> 的总曝光。`;
                    if(sFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 对宽带目标使用窄带滤镜，计算 2x 惩罚时间。</i>`;
                    if(mFact > 1.0) reason += ` <br><i style="color:#aaa; font-size: 0.9em;">* 已应用强月光污染惩罚。</i>`;
                    reason += `<br><br>今晚的可用时间 (> 30° 高度) 只有 <b style="color:#ff4444;">${aS.toFixed(1)} 小时</b>，时间不足。`;
                }

                html += `<div style="font-size:0.9em; line-height:1.5; color:#ddd; margin-bottom:15px;">${reason}</div>`;
                html += `<button class="btn-guide" style="width:100%; padding:10px; font-size:1.1em; background: linear-gradient(135deg, #ffaa00 0%, #d48800 100%); color:#121212; border:none; box-shadow: 0 4px 15px rgba(255, 170, 0, 0.3);" onclick="apriMultiNight('smart')">${t("ai_plan_btn")}</button>`;
            } else {
                let msgOk = lang === 'it' ? "Il tempo a disposizione stanotte sopra i 30° è sufficiente a completare l'integrazione consigliata." : 
                            lang === 'en' ? "Tonight's available time above 30° is enough to complete the recommended integration." :
                            lang === 'es' ? "El tiempo disponible esta noche por encima de 30° es suficiente para completar la integración recomendada." :
                                            "今晚 > 30° 的可用时间足以完成推荐的曝光时间。";
                html += `<div style="margin-top:5px; padding:10px; background:rgba(68,255,68,0.1); border-left:3px solid #44ff44; border-radius:4px; font-size:0.9em; color:#fff;">✅ <b>OK:</b> ${msgOk}</div>`;
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
            let dS = new Date(`1970-01-01T${tS}:00`), dE = new Date(`1970-01-01T${tE}:00`); if (dE <= dS) dE.setDate(dE.getDate() + 1);
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
                let rsLabel = formatSeconds(rs);
                if (f.id.includes('bias') && c > 0 && e === 0) {
                    rsLabel += ` <span onmouseenter="mostraTooltip(this,'bias_overhead_tip')" onmouseleave="nascondiTooltip()" style="font-size:0.85em;color:#888;cursor:help;">⚙️</span>`;
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
            tSec += dSec;
            let ditherTotEl = document.getElementById('dither-tot');
            if (ditherTotEl) ditherTotEl.innerText = formatSeconds(dSec);

            document.getElementById('calc-total').innerText = formatSeconds(tSec);
            let rS = aS - tSec, rD = document.getElementById('calc-residual'), wD = document.getElementById('calc-warning');
            if (rS >= 0) { rD.innerText = formatSeconds(rS); rD.className = "text-green"; wD.style.display = "none"; } 
            else { rD.innerText = `- ${formatSeconds(Math.abs(rS))}`; rD.className = "text-red"; wD.style.display = "block"; }
            
            // Richiama l'AI ogni volta che si cambiano i tempi!
            if (typeof aggiornaAI === "function") aggiornaAI();
        }

        function generaSequenzaOttimale() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }
            let tS = document.getElementById('time-start').value, tE = document.getElementById('time-end').value; if(!tS || !tE) { alert(t("alert_times")); return; }
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
            let rS = aS - cS; if (rS <= 0) { alert(t("alert_calib")); return; }
            
            let aL = []; fL.forEach(f => { if (!f.id.includes('dark') && !f.id.includes('bias')) { let c = document.getElementById(`${f.id}-check`); if (c && c.checked) aL.push(f); } });
            if (aL.length === 0) { alert(t("alert_nolight")); return; }

            let w = {};
            if (!isM) w[aL[0].id] = 1.0;
            else {
                let hL = aL.some(f=>f.id==='m-l'), hRGB = aL.some(f=>f.id==='m-r')&&aL.some(f=>f.id==='m-g')&&aL.some(f=>f.id==='m-b');
                if (hL && hRGB && aL.length === 4) { w['m-l']=0.5; w['m-r']=0.1666; w['m-g']=0.1666; w['m-b']=0.1666; } 
                else { let eq = 1.0 / aL.length; aL.forEach(f => w[f.id] = eq); }
            }

            let ty = targetSelezionato.type ? targetSelezionato.type.toLowerCase() : "", isA = ty.includes('ammasso')||ty.includes('cluster'), isG = ty.includes('galassia')||ty.includes('galaxy')||ty.includes('riflessione')||ty.includes('stella')||ty.includes('star');
            let dD = parseInt(document.getElementById('dither-duration').value)||0;

            aL.forEach(f => {
                let eS = 180;
                if (f.id === 'm-l') eS = 30; else if (f.id.includes('ha')||f.id.includes('oiii')||f.id.includes('sii')) eS = 300; else if (isA) eS = 60; else if (isG) eS = 120;
                
                // --- LOGICA DEL LUCCHETTO ---
                let lockEl = document.getElementById(`${f.id}-lock`);
                if (lockEl && lockEl.classList.contains('locked')) {
                    eS = parseInt(document.getElementById(`${f.id}-exp`).value) || eS;
                }

                // Dither per-filtro: usa checkbox e freq individuali
                let dChkF = document.getElementById(`${f.id}-dither`);
                let uD = dChkF && dChkF.checked;
                let dFrqEl = document.getElementById(`${f.id}-dfreq`);
                let dF = parseInt(dFrqEl ? dFrqEl.value : 3)||3;
                let eeS = eS + (uD && dF > 0 ? dD / dF : 0);
                document.getElementById(`${f.id}-exp`).value = eS; document.getElementById(`${f.id}-count`).value = Math.floor((rS * w[f.id]) / eeS);
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
            let isM = document.getElementById('pro-sensor-type').value === 'mono';
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
