// fov.js — FOV simulatore, rotazione PA, mosaico, coordinate, tooltip, guida
// ============================================================

        function mostraTooltip(el, key) {
            let tooltip = document.getElementById('floating-tooltip');
            tooltip.innerHTML = t(key);
            tooltip.style.display = 'block';
            
            let rect = el.getBoundingClientRect();
            let top = rect.top + window.scrollY - tooltip.offsetHeight - 15;
            let left = rect.left + window.scrollX - (tooltip.offsetWidth / 2) + (rect.width / 2);
            
            if (left < 10) left = 10;
            if ((left + tooltip.offsetWidth) > window.innerWidth) left = window.innerWidth - tooltip.offsetWidth - 10;
            if (top < window.scrollY) top = rect.bottom + window.scrollY + 15; 

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
            
            setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
        }

        function nascondiTooltip() {
            let tooltip = document.getElementById('floating-tooltip');
            tooltip.style.opacity = '0';
            setTimeout(() => { tooltip.style.display = 'none'; }, 200);
        }

        function apriGuida() { vistaPrecedente = document.getElementById('planning-view').style.display === 'block' ? 'planning-view' : 'dashboard-view'; document.getElementById('dashboard-view').style.display = 'none'; document.getElementById('planning-view').style.display = 'none'; document.getElementById('guide-view').style.display = 'block'; window.scrollTo(0,0); }
        function chiudiGuida() { document.getElementById('guide-view').style.display = 'none'; document.getElementById(vistaPrecedente).style.display = 'block'; if(vistaPrecedente==='planning-view') aggiornaFOV(); window.scrollTo(0,0); }

        window.onclick = function(event) {
            if (event.target == document.getElementById('report-modal')) { chiudiReport(); }
        }

        function apriPianificazione(tObj) {
            targetSelezionato = tObj; document.getElementById('dashboard-view').style.display = 'none'; document.getElementById('planning-view').style.display = 'block';
            sessionStorage.setItem('ad_current_target', JSON.stringify(tObj));
            document.getElementById('plan-target-name').innerText = getLocalizedName(targetSelezionato);
            
            // FIX: Se nel DB locale manca la tipologia, la deduce in automatico dalla descrizione!
            let tyCheck = targetSelezionato.type || "";
            let descLow = (getLocalizedText(targetSelezionato, 'desc') || "").toLowerCase();
            if ((!tyCheck || tyCheck.toLowerCase() === "sconosciuta") && descLow !== "--") {
                if(descLow.includes("globulare")) tyCheck = "Ammasso Globulare";
                else if(descLow.includes("aperto")) tyCheck = "Ammasso Aperto";
                else if(descLow.includes("galassia")) tyCheck = "Galassia";
                else if(descLow.includes("planetaria")) tyCheck = "Nebulosa Planetaria";
                else if(descLow.includes("emissione")) tyCheck = "Nebulosa a Emissione";
            }
            
            let tipoTradotto = mapTypeTrans(tyCheck);
            document.getElementById('stat-type').innerText = (tipoTradotto && tipoTradotto !== tyCheck) ? tipoTradotto : (tyCheck || "Sconosciuta");
            
            // Format forzato a 1 decimale della magnitudine
            let displayMag = targetSelezionato.mag;
            if (displayMag && displayMag !== "N/D" && !isNaN(parseFloat(displayMag))) { displayMag = parseFloat(displayMag).toFixed(1); } else { displayMag = "--"; }
            document.getElementById('stat-mag').innerText = displayMag;
            
            document.getElementById('stat-dist').innerText = targetSelezionato.dist || "--";
            document.getElementById('target-description').innerText = getLocalizedText(targetSelezionato, 'desc');
            
            // GENERATORE DINAMICO DI CONSIGLI TATTICI IN BASE ALLA TIPOLOGIA
            let rawTips = getLocalizedText(targetSelezionato, 'tips');
            if (rawTips === "Dati scaricati in tempo reale." || rawTips === "--" || rawTips.includes("sviluppo")) {
                let tLow = tyCheck.toLowerCase();
                if (tLow.includes('globulare')) rawTips = "Usa pose brevi per non bruciare il denso nucleo stellare. Controlla accuratamente il tracking e il seeing.";
                else if (tLow.includes('aperto')) rawTips = "Massa stellare sparsa. Usa pose brevi e focalizzati sulla calibrazione cromatica (RGB) delle stelle.";
                else if (tLow.includes('galassi')) rawTips = "Emissione a banda larga (Broadband). Evita la Luna e scatta sotto cieli bui. Dedica molto tempo alla Luminanza (L).";
                else if (tLow.includes('emission') || tLow.includes('h ii')) rawTips = "Target ideale per filtri a banda stretta (Ha, OIII, SII). Puoi riprenderlo con successo anche in presenza di forte Luna.";
                else if (tLow.includes('riflessione') || tLow.includes('oscura')) rawTips = "Luce debolissima a banda larga. Richiede cieli perfettamente bui, totale assenza di Luna e lunghissime esposizioni.";
                else if (tLow.includes('planetaria')) rawTips = "Spesso piccole e luminose. Usa pose brevi per non saturare i dettagli interni. Ottima resa in banda stretta.";
                else if (tLow.includes('supernova') || tLow.includes('snr')) rawTips = "Segnale debole ed esteso. Dedica molto tempo ai canali H-Alpha e OIII per far emergere i fini filamenti del gas.";
                else rawTips = "Non disponibile.";
            }
            document.getElementById('target-tips').innerText = rawTips;
            let wl = document.getElementById('target-wiki'); if(targetSelezionato.link) { wl.href = targetSelezionato.link; wl.style.display = 'inline-block'; } else wl.style.display = 'none';
            
            // CALCOLO ASTRONOMICO E REGOLA DEI 30 GRADI
            let dOggi = new Date(); if (dOggi.getHours() < 12) dOggi.setDate(dOggi.getDate() - 1); 
            let atStart = SunCalc.getTimes(dOggi, latCorrente, lonCorrente);
            let dDomani = new Date(dOggi.getTime() + 86400000); let atEnd = SunCalc.getTimes(dDomani, latCorrente, lonCorrente);
            let ft = (x) => x && !isNaN(x) ? x.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '--:--';
            
            document.getElementById('info-sunset').innerText = ft(atStart.sunset); 
            document.getElementById('info-nightstart').innerText = ft(atStart.night); 
            document.getElementById('info-nightend').innerText = ft(atEnd.nightEnd); 
            document.getElementById('info-sunrise').innerText = ft(atEnd.sunrise);

            // ── CALCOLO MERIDIAN FLIP (analitico) ────────────────────────────────
            (function() {
                let mfEl = document.getElementById('info-meridianflip');
                if (!mfEl || targetSelezionato.ra == null) { if(mfEl) mfEl.innerText = '--:--'; return; }
                try {
                    let midnightUTC = Date.UTC(dOggi.getFullYear(), dOggi.getMonth(), dOggi.getDate(), 0, 0, 0);
                    let jd0  = midnightUTC / 86400000 + 2440587.5;
                    let d0   = jd0 - 2451545.0;
                    let gmst0 = ((280.46061837 + 360.98564736629 * d0) % 360 + 360) % 360;
                    let lst0  = ((gmst0 + lonCorrente) % 360 + 360) % 360;
                    let raDeg = targetSelezionato.ra * 15;
                    let diff  = ((raDeg - lst0) % 360 + 360) % 360;
                    let transitHoursUTC = diff / 15.04107;
                    let flipTime = new Date(midnightUTC + transitHoursUTC * 3600000);
                    let sunsetMs  = (atStart.sunset  || atStart.dusk  || new Date(midnightUTC + 21*3600000)).getTime();
                    let sunriseMs = (atEnd.sunrise   || atEnd.dawn    || new Date(midnightUTC + 43*3600000)).getTime();
                    if (flipTime.getTime() < sunsetMs) flipTime = new Date(flipTime.getTime() + 86400000);
                    if (flipTime.getTime() > sunriseMs + 3600000) {
                        mfEl.innerText = t('meridian_flip_outside'); mfEl.style.color = '#666'; mfEl.title = ''; return;
                    }
                    mfEl.innerText = ft(flipTime);
                    let tS = document.getElementById('time-start').value;
                    let tE = document.getElementById('time-end').value;
                    if (tS && tE) {
                        let base  = '1970-01-01T';
                        let sDate = new Date(base + tS + ':00');
                        let eDate = new Date(base + tE + ':00');
                        let hhmm  = flipTime.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'});
                        let fDate = new Date(base + hhmm + ':00');
                        if (eDate <= sDate) eDate.setDate(eDate.getDate() + 1);
                        if (fDate < sDate)  fDate.setDate(fDate.getDate() + 1);
                        if (fDate >= sDate && fDate <= eDate) {
                            mfEl.style.color = '#ff4444'; mfEl.title = t('meridian_flip_warn');
                        } else {
                            mfEl.style.color = '#ffaa00'; mfEl.title = t('meridian_flip_ok');
                        }
                    }
                } catch(e) { console.warn('[MF]', e); mfEl.innerText = '--:--'; }
            })();
            // ─────────────────────────────────────────────────────────────────────
            
            let nS = atStart.night || atStart.sunset; let nE = atEnd.nightEnd || atEnd.sunrise;
            let cur = new Date(nS.getTime()); let maxA = -90; let currentBlock = { start: null, end: null }; let bestBlock = { start: null, end: null, duration: 0 }; let isAbove = false;
            
            // Simula l'intera nottata a scatti di 10 minuti per trovare la finestra migliore sopra i 30°
            while(cur <= nE) {
                let a = calcolaAltAz(targetSelezionato.ra, targetSelezionato.dec, latCorrente, lonCorrente, cur).alt;
                if(a > maxA) maxA = a;
                if(a >= 30) { if(!isAbove) { currentBlock.start = new Date(cur); isAbove = true; } currentBlock.end = new Date(cur); } 
                else { if(isAbove) { let dur = currentBlock.end.getTime() - currentBlock.start.getTime(); if(dur > bestBlock.duration) { bestBlock = { start: currentBlock.start, end: currentBlock.end, duration: dur }; } isAbove = false; } }
                cur.setMinutes(cur.getMinutes() + 10);
            }
            if(isAbove) { let dur = currentBlock.end.getTime() - currentBlock.start.getTime(); if(dur > bestBlock.duration) { bestBlock = { start: currentBlock.start, end: currentBlock.end, duration: dur }; } }
            
            // Assegna la finestra calcolata agli input
            if(bestBlock.duration > 0) { document.getElementById('time-start').value = ft(bestBlock.start); document.getElementById('time-end').value = ft(bestBlock.end); } 
            else { document.getElementById('time-start').value = ft(nS); document.getElementById('time-end').value = ft(nE); }

            // Generazione Mappa Stellare
            if (!aladinSkyMap) {
                aladinSkyMap = A.aladin('#aladin-lite-div', {
                    survey: "P/DSS2/color",
                    fov: 2,
                    target: (targetSelezionato.ra * 15) + " " + targetSelezionato.dec,
                    showReticle: false,
                    showZoomControl: false,
                    showFullscreenControl: false,
                    showLayersControl: false,
                    showGotoControl: false,
                    showFrame: false,
                    showCoordinatesGrid: false
                });
                aladinSkyMap.on('positionChanged', function(pos) {
                    aggiornaCoordinateFOV(pos.ra, pos.dec);
                });
                // Imposta subito le coordinate del target senza aspettare il primo movimento
                aggiornaCoordinateFOVdaTarget();
                setTimeout(() => { toggleMosaic(); }, 300);
            } else {
                setTimeout(() => {
                    fovCenterOverride = null;
                    aladinSkyMap.gotoRaDec(targetSelezionato.ra * 15, targetSelezionato.dec);
                    aggiornaCoordinateFOVdaTarget();
                    toggleMosaic();
                }, 100); 
            }
            
            disegnaGraficoAltezza(); toggleSensorMode(); calcolaTempi(); window.scrollTo(0,0);
        }

        function tornaDashboard() { document.getElementById('planning-view').style.display = 'none'; document.getElementById('dashboard-view').style.display = 'block'; document.getElementById('search-dash-input').value = ''; document.getElementById('search-plan-input').value = ''; sessionStorage.removeItem('ad_current_target'); }
        function applicaPresetTelescopio() { let v = document.getElementById('preset-telescope').value; if(v){ let p = v.split(','); document.getElementById('focal-length').value = p[0]; document.getElementById('aperture').value = p[1] || 100; aggiornaFOV(); } }
        

        // --- MOTORE MOSAICO ---
        function toggleMosaic() {
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            document.getElementById('mosaic-settings').style.display = isMosaic ? 'flex' : 'none';
            document.getElementById('mosaic-fov-result').style.display = isMosaic ? 'block' : 'none';
            document.getElementById('btn-export-nina').style.display = isMosaic ? 'none' : 'inline-block';
            let btnAsiair = document.getElementById('btn-export-asiair'); if(btnAsiair) btnAsiair.style.display = isMosaic ? 'none' : 'inline-block';
            document.getElementById('btn-report-mosaic').style.display = isMosaic ? 'inline-block' : 'none';
            document.getElementById('nina-mosaic-msg').style.display = isMosaic ? 'block' : 'none';
            document.getElementById('mosaic-total-badge').style.display = isMosaic ? 'inline-block' : 'none';
            aggiornaFOV(); 
            calcolaTempi(); 
        }

        function aggiornaFOV() {
            let fl = parseFloat(document.getElementById('focal-length').value) || 1000;
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.6;
            
            let pixelSize = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let currentBIN = parseInt(document.querySelector('.bin-btn.bin-active')?.dataset?.bin || '1');
            let samplingNative = (pixelSize / fl) * 206.265;
            let sampling = samplingNative * currentBIN;
            
            document.getElementById('sampling-result').innerText = samplingNative.toFixed(2) + ' "/px  (BIN 1×1)';
            let posPct = (sampling / 4.0) * 100; if(posPct > 100) posPct = 100;
            document.getElementById('sampling-marker').style.left = posPct + '%';
            
            let sMsg = document.getElementById('sampling-msg');
            if (sampling < 0.67) { sMsg.innerText = t("oversampled"); sMsg.style.color = "#ff4444"; } 
            else if (sampling >= 0.67 && sampling <= 2.0) { sMsg.innerText = t("ideal_sampling"); sMsg.style.color = "#44ff44"; } 
            else { sMsg.innerText = t("undersampled"); sMsg.style.color = "#ffaa00"; }

            // Riga BIN result
            let binRes = document.getElementById('sampling-bin-result');
            if (binRes && currentBIN > 1) {
                let col = sampling < 0.67 ? "#ff4444" : sampling <= 2.0 ? "#44ff44" : "#ffaa00";
                binRes.innerHTML = `Con BIN ${currentBIN}×${currentBIN}: <b style="color:${col}">${sampling.toFixed(2)} "/px</b>`;
            } else if (binRes) {
                binRes.innerHTML = '';
            }

            let fW = (2 * Math.atan(sw / (2 * fl)) * (180 / Math.PI));
            let fH = (2 * Math.atan(sh / (2 * fl)) * (180 / Math.PI));
            document.getElementById('fov-result').innerText = `${fW.toFixed(2)}° x ${fH.toFixed(2)}°`;

            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            let mx = 1, my = 1, overlap = 0;
            let totFovW = fW, totFovH = fH;

            if (isMosaic) {
                mx = parseInt(document.getElementById('mosaic-x').value) || 1;
                my = parseInt(document.getElementById('mosaic-y').value) || 1;
                overlap = (parseFloat(document.getElementById('mosaic-overlap').value) || 20) / 100;
                
                totFovW = fW * mx - fW * (mx - 1) * overlap;
                totFovH = fH * my - fH * (my - 1) * overlap;
                document.getElementById('mosaic-fov-result').innerText = `Totale: ${totFovW.toFixed(2)}° x ${totFovH.toFixed(2)}°`;
            }

            let maxFov = Math.max(totFovW, totFovH);
            let cw = document.getElementById('fov-simulator-container').clientWidth;
            let cm = 2.5 / (parseFloat(document.getElementById('fov-zoom').value) / 100); 
            if (aladinSkyMap) { aladinSkyMap.setFoV(Math.max(0.01, maxFov * cm)); }

            let fovContainer = document.getElementById('fov-rectangle');
            fovContainer.innerHTML = ''; 
            fovContainer.style.border = "none";
            
            let aladinCurrentFov = Math.max(0.01, maxFov * cm);
            let pxPerDegree = cw / aladinCurrentFov;
            
            let rw = fW * pxPerDegree;
            let rh = fH * pxPerDegree;
            let stepPxX = rw * (1 - overlap);
            let stepPxY = rh * (1 - overlap);
            let totalW_px = rw + (mx - 1) * stepPxX;
            let totalH_px = rh + (my - 1) * stepPxY;

            let rot = parseFloat(document.getElementById('fov-rotation').value) || 0;
            
            fovContainer.style.width = totalW_px + "px";
            fovContainer.style.height = totalH_px + "px";
            fovContainer.style.left = "50%";
            fovContainer.style.top = "50%";
            fovContainer.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
            fovContainer.style.transformOrigin = "center center";

            for (let i = 0; i < mx; i++) {
                for (let j = 0; j < my; j++) {
                    let panel = document.createElement('div');
                    panel.style.position = "absolute";
                    panel.style.width = rw + "px";
                    panel.style.height = rh + "px";
                    panel.style.left = (i * stepPxX) + "px";
                    panel.style.top = (j * stepPxY) + "px";
                    panel.style.border = "2px solid #ff4444";
                    panel.style.boxSizing = "border-box";
                    panel.style.boxShadow = "inset 0 0 10px rgba(255, 68, 68, 0.3)";
                    
                    let pNum = document.createElement('span');
                    pNum.innerText = (j * mx + i + 1);
                    pNum.style.position = "absolute";
                    pNum.style.top = "2px";
                    pNum.style.left = "4px";
                    pNum.style.color = "#ff4444";
                    pNum.style.fontWeight = "bold";
                    pNum.style.fontSize = "12px";
                    
                    panel.appendChild(pNum);
                    fovContainer.appendChild(panel);
                }
            }

            let fovWarning = document.getElementById('fov-warning-msg');
            if (targetSelezionato && targetSelezionato.size) {
                let currentTotalArcmin = Math.min(totFovW, totFovH) * 60; 
                if (targetSelezionato.size > (currentTotalArcmin * 0.9)) { 
                    fovWarning.setAttribute('data-i18n', 'fov_warning');
                    fovWarning.style.display = 'block'; 
                    fovWarning.style.color = '#ffaa00';
                    fovWarning.innerHTML = t('fov_warning');
                } else { 
                    if (isMosaic) {
                        fovWarning.setAttribute('data-i18n', 'mosaic_active_msg');
                        fovWarning.style.display = 'block';
                        fovWarning.style.color = '#bb86fc';
                        fovWarning.innerHTML = t('mosaic_active_msg');
                    } else {
                        fovWarning.style.display = 'none'; 
                    }
                }
            } else { 
                if (isMosaic) {
                    fovWarning.setAttribute('data-i18n', 'mosaic_active_msg');
                    fovWarning.style.display = 'block';
                    fovWarning.style.color = '#bb86fc';
                    fovWarning.innerHTML = t('mosaic_active_msg');
                } else {
                    fovWarning.style.display = 'none'; 
                }
            }
        }

        // ── COORDINATE CENTRO FOV ──────────────────────────────────────────────
        function _raGradiToSex(raDeg) {
            // Aladin restituisce RA in gradi (0-360); convertiamo in ore:min:sec
            let raH = raDeg / 15;
            let h = Math.floor(raH);
            let mRaw = (raH - h) * 60;
            let m = Math.floor(mRaw);
            let s = ((mRaw - m) * 60).toFixed(1);
            return `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(4,'0')}s`;
        }
        function _decGradiToSex(decDeg) {
            let neg = decDeg < 0;
            let a = Math.abs(decDeg);
            let d = Math.floor(a);
            let mRaw = (a - d) * 60;
            let m = Math.floor(mRaw);
            let s = ((mRaw - m) * 60).toFixed(0);
            return `${neg ? '-' : '+'}${String(d).padStart(2,'0')}° ${String(m).padStart(2,'0')}′ ${String(s).padStart(2,'0')}″`;
        }

        function aggiornaCoordinateFOV(raDeg, decDeg) {
            // raDeg e decDeg in gradi decimali (come restituisce Aladin positionChanged)
            let raEl  = document.getElementById('fov-ra-display');
            let decEl = document.getElementById('fov-dec-display');
            let badge = document.getElementById('fov-offset-badge');
            if (!raEl) return;

            raEl.textContent  = _raGradiToSex(raDeg);
            decEl.textContent = _decGradiToSex(decDeg);

            // Salva override (RA in gradi decimali, Dec in gradi decimali)
            fovCenterOverride = { raDeg: raDeg, decDeg: decDeg };

            // Badge offset: confronta con coordinate originali target (tolleranza 0.01°)
            if (targetSelezionato) {
                let origRaDeg = targetSelezionato.ra * 15; // ra è in ore nel target
                let origDecDeg = targetSelezionato.dec;
                let distRa  = Math.abs(raDeg  - origRaDeg);
                let distDec = Math.abs(decDeg - origDecDeg);
                let isOffset = (distRa > 0.01 || distDec > 0.01);
                if (badge) badge.style.display = isOffset ? 'inline-block' : 'none';
            }
        }

        function aggiornaCoordinateFOVdaTarget() {
            // Resetta il display alle coordinate originali del target
            if (!targetSelezionato) return;
            fovCenterOverride = null;
            let raEl  = document.getElementById('fov-ra-display');
            let decEl = document.getElementById('fov-dec-display');
            let badge = document.getElementById('fov-offset-badge');
            if (raEl) raEl.textContent  = _raGradiToSex(targetSelezionato.ra * 15);
            if (decEl) decEl.textContent = _decGradiToSex(targetSelezionato.dec);
            if (badge) badge.style.display = 'none';
        }

        function resetFovCenter() {
            if (!targetSelezionato || !aladinSkyMap) return;
            aladinSkyMap.gotoRaDec(targetSelezionato.ra * 15, targetSelezionato.dec);
            aggiornaCoordinateFOVdaTarget();
        }
        // ─────────────────────────────────────────────────────────────────────────

        function disegnaGraficoAltezza() {
            if (!targetSelezionato) return; if (chartAltezza) chartAltezza.destroy();
            let lbl = [], dat = [], d = new Date(), sd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 0, 0);
            for (let i = 0; i <= 12; i++) { let fd = new Date(sd.getTime() + i*3600000); lbl.push(fd.getHours() + "h"); dat.push(Math.max(0, calcolaAltAz(targetSelezionato.ra, targetSelezionato.dec, latCorrente, lonCorrente, fd).alt)); }
            chartAltezza = new Chart(document.getElementById('altitudeChart').getContext('2d'), { type: 'line', data: { labels: lbl, datasets: [{ label: 'Alt (°)', data: dat, borderColor: '#bb86fc', backgroundColor: 'rgba(187, 134, 252, 0.3)', tension: 0.4, fill: true, pointRadius: 2, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 90, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa', font: { size: 10 }, stepSize: 30 } }, x: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 10 }, maxRotation: 0 } } }, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, layout: { padding: 0 } } });
        }



        function selezionaBIN(bin) {
            // Aggiorna pulsante attivo
            document.querySelectorAll('.bin-btn').forEach(b => {
                b.classList.toggle('bin-active', parseInt(b.dataset.bin) === bin);
            });
            // Ricalcola campionamento
            aggiornaFOV();
            // Propaga BIN a tutti i filtri nella griglia Smart
            let binStr = bin + 'x' + bin;
            document.querySelectorAll('[id$="-bin"]').forEach(sel => {
                // Cerca l'opzione corrispondente nel select
                for (let opt of sel.options) {
                    if (opt.value === binStr || opt.text === binStr ||
                        opt.value === String(bin) || opt.text === String(bin)) {
                        sel.value = opt.value;
                        break;
                    }
                }
            });
        }