// export.js — Export N.I.N.A. Smart, export ASIAIR
// ============================================================

        function esportaNINA() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }
            let doCool = document.getElementById('nina-cool').checked, tempTarget = parseFloat(document.getElementById('nina-temp').value) || -10;
            let doSlew = document.getElementById('nina-slew').checked, doGuide = document.getElementById('nina-guide').checked, doWarm = document.getElementById('nina-warm').checked, doPark = document.getElementById('nina-park').checked, doFlip = document.getElementById('nina-flip').checked;
            let doAfStart  = document.getElementById('smart-af-start')  ? document.getElementById('smart-af-start').checked  : false;
            let doAfFilter = document.getElementById('smart-af-filter') ? document.getElementById('smart-af-filter').checked : false;
            let doAfHfr    = document.getElementById('smart-af-hfr')    ? document.getElementById('smart-af-hfr').checked    : false;
            // Orari sessione (time-start / time-end)
            let _tS = document.getElementById('time-start') ? document.getElementById('time-start').value : '';
            let _tE = document.getElementById('time-end')   ? document.getElementById('time-end').value   : '';
            let _startH = _tS ? parseInt(_tS.split(':')[0]) : 21;
            let _startM = _tS ? parseInt(_tS.split(':')[1]) : 0;
            let _endH   = _tE ? parseInt(_tE.split(':')[0]) : 4;
            let _endM   = _tE ? parseInt(_tE.split(':')[1]) : 30;
            let isMono = document.getElementById('sensor-type').value === 'mono', frameList = isMono ? framesMono : framesColor, esposizioni = [];

            frameList.forEach(f => {
                let count = parseInt(document.getElementById(`${f.id}-count`).value) || 0, exp = parseInt(document.getElementById(`${f.id}-exp`).value) || 0;
                if (count > 0 && exp > 0) {
                    let isLight = !f.id.includes('dark') && !f.id.includes('bias');
                    let dithChk = document.getElementById(`${f.id}-dither`);
                    let dithFrq = document.getElementById(`${f.id}-dfreq`);
                    let doDither = isLight && dithChk ? dithChk.checked : false;
                    let ditherFreq = parseInt(dithFrq ? dithFrq.value : 4) || 4;
                    esposizioni.push({ count: count, exp: exp, filter: (isMono && isLight) ? document.getElementById(`nina-name-${f.id}`).value.trim() : null, type: f.id.includes('dark') ? "DARK" : f.id.includes('bias') ? "FLAT" : "LIGHT", doDither: doDither, ditherFreq: ditherFreq });
                    // Blocco HDR: legge dalla riga companion
                    if (isLight && count > 0) {
                        let _hdrRow = document.getElementById(`${f.id}-hdr-row`);
                        if (_hdrRow && _hdrRow.style.display !== 'none') {
                            let _hdrCnt = parseInt((document.getElementById(`${f.id}-hdr-count`)||{}).value)||0;
                            let _hdrExpE = parseInt((document.getElementById(`${f.id}-hdr-exp`)||{}).value)||0;
                            if (_hdrCnt > 0 && _hdrExpE > 0) {
                                let _hdrFilter = (isMono && isLight) ? document.getElementById(`nina-name-${f.id}`).value.trim() + ' HDR' : null;
                                esposizioni.push({ count: _hdrCnt, exp: _hdrExpE, filter: _hdrFilter, type: "LIGHT", doDither: doDither, ditherFreq: ditherFreq });
                            }
                        }
                    }
                }
            });
            if (esposizioni.length === 0) { mostraAvviso(t("alert_noseq"), "warn"); return; }

            let idCounter = 1; function nextId() { return (idCounter++).toString(); }
            function makeObs(type, values) { return { "$id": nextId(), "$type": `System.Collections.ObjectModel.ObservableCollection\`1[[${type}, NINA.Sequencer]], System.ObjectModel`, "$values": values }; }
            // Usa coordinate centro FOV se l'utente ha spostato la mappa, altrimenti quelle del target
            let _fovRaDeg  = fovCenterOverride ? fovCenterOverride.raDeg  : targetSelezionato.ra * 15;
            let _fovDecDeg = fovCenterOverride ? fovCenterOverride.decDeg : targetSelezionato.dec;
            let ra = _fovRaDeg / 15, rh = Math.floor(ra), rm = Math.floor((ra - rh) * 60), rs = ((ra - rh) * 60 - rm) * 60;
            let dec = _fovDecDeg, negD = dec < 0, aD = Math.abs(dec), dd = Math.floor(aD), dm = Math.floor((aD - dd) * 60), ds = ((aD - dd) * 60 - dm) * 60;
            let rootId = nextId(), startAreaId = nextId(), targetAreaId = nextId(), endAreaId = nextId(), startItems = [];
            // UnparkScope — sempre presente
            startItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Telescope.UnparkScope, NINA.Sequencer", "Parent": {"$ref": startAreaId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doCool) startItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.CoolCamera, NINA.Sequencer", "Temperature": tempTarget, "Duration": 0.0, "Parent": {"$ref": startAreaId}, "ErrorBehavior": 0, "Attempts": 1 });
            let dsoContainerId = nextId(), imagingContainerId = nextId(), dsoItems = [];
            if (doSlew) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.Center, NINA.Sequencer", "Inherited": true, "Coordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds }, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (document.getElementById('nina-rotate') && document.getElementById('nina-rotate').checked) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.SolveAndRotate, NINA.Sequencer", "Inherited": true, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doAfStart) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doGuide)   dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.StartGuiding, NINA.Sequencer", "ForceCalibration": false, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            // WaitForTime — attende l'inizio sessione
            dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitForTime, NINA.Sequencer", "Hours": _startH, "Minutes": _startM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });

            let imagingItems = [];
            esposizioni.forEach(expo => {
                let blockId = nextId(), blockItems = [];
                if (expo.filter) blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.FilterWheel.SwitchFilter, NINA.Sequencer", "Filter": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core", "_name": expo.filter, "_focusOffset": 0, "_position": 0, "_autoFocusExposureTime": -1.0, "_autoFocusFilter": false, "FlatWizardFilterSettings": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.FlatWizardFilterSettings, NINA.Core", "FlatWizardMode": 0, "HistogramMeanTarget": 0.5, "HistogramTolerance": 0.1, "MaxFlatExposureTime": 30.0, "MinFlatExposureTime": 0.01, "MaxAbsoluteFlatDeviceBrightness": 32767, "MinAbsoluteFlatDeviceBrightness": 0, "Gain": -1, "Offset": -1, "Binning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 } }, "_autoFocusBinning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 }, "_autoFocusGain": -1, "_autoFocusOffset": -1 }, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Imaging.TakeExposure, NINA.Sequencer", "ExposureTime": expo.exp, "Gain": -1, "Offset": -1, "Binning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 }, "ImageType": expo.type, "ExposureCount": expo.count, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                let blockTriggers = [];
                if (expo.doDither && expo.type === "LIGHT" && expo.ditherFreq > 0) {
                    let trigRunnerId = nextId(); blockTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Guider.DitherAfterExposures, NINA.Sequencer", "AfterExposures": expo.ditherFreq, "Parent": {"$ref": blockId}, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [{ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.Dither, NINA.Sequencer", "Parent": {"$ref": trigRunnerId}, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
                }
                imagingItems.push({ "$id": blockId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": expo.filter ? `Ripresa ${expo.filter}` : `Ripresa ${expo.type}`, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [{ "$id": nextId(), "$type": "NINA.Sequencer.Conditions.LoopCondition, NINA.Sequencer", "CompletedIterations": 0, "Iterations": expo.count, "Parent": {"$ref": blockId} }]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", blockItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", blockTriggers), "Parent": {"$ref": imagingContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            });

            // Triggers sul container imaging (solo Meridian Flip)
            let imagingTriggers = [];
            if (doFlip) { let trigRunnerId = nextId(); imagingTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.MeridianFlip.MeridianFlipTrigger, NINA.Sequencer", "Parent": {"$ref": imagingContainerId}, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", []), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }

            // AboveHorizonCondition sul container imaging (offset 30°)
            let _aboveH = { "$id": nextId(), "$type": "NINA.Sequencer.Conditions.AboveHorizonCondition, NINA.Sequencer", "HasDsoParent": true, "Data": { "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitLoopData, NINA.Sequencer", "Coordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds }, "Offset": 30.0, "Comparator": 3 }, "Parent": {"$ref": imagingContainerId} };
            dsoItems.push({ "$id": imagingContainerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target Imaging Instructions", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [_aboveH]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", imagingItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", imagingTriggers), "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });

            // Triggers sul DSO container: HFR e cambio filtro
            let dsoTriggers = [];
            if (doAfHfr) { let hfrRid = nextId(); dsoTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterHFRIncreaseTrigger, NINA.Sequencer", "Amount": 10.0, "SampleSize": 10, "Parent": {"$ref": dsoContainerId}, "TriggerRunner": { "$id": hfrRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": {"$type":"NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer"}, "Name": null, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition",[]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem",[{"$id":nextId(),"$type":"NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer","Parent":{"$ref":hfrRid},"ErrorBehavior":0,"Attempts":1}]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }
            if (doAfFilter) { let afFRid = nextId(); dsoTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterFilterChange, NINA.Sequencer", "Parent": {"$ref": dsoContainerId}, "TriggerRunner": { "$id": afFRid, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": {"$type":"NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer"}, "Name": null, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition",[]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem",[{"$id":nextId(),"$type":"NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer","Parent":{"$ref":afFRid},"ErrorBehavior":0,"Attempts":1}]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }

            // TimeCondition (Loop Until Time = fine sessione) sul DSO container
            let _timeCond = { "$id": nextId(), "$type": "NINA.Sequencer.Conditions.TimeCondition, NINA.Sequencer", "Hours": _endH, "Minutes": _endM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": {"$ref": dsoContainerId} };
            let targetItems = [{ "$id": dsoContainerId, "$type": "NINA.Sequencer.Container.DeepSkyObjectContainer, NINA.Sequencer", "Target": { "$id": nextId(), "$type": "NINA.Astrometry.InputTarget, NINA.Astrometry", "Expanded": true, "TargetName": targetSelezionato.name, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0.0, "InputCoordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds } }, "ExposureInfoListExpanded": false, "ExposureInfoList": null, "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": targetSelezionato.name, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", [_timeCond]), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", dsoItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", dsoTriggers), "Parent": {"$ref": targetAreaId}, "ErrorBehavior": 0, "Attempts": 1 }];

            let endItems = [];
            if (doWarm) endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.WarmCamera, NINA.Sequencer", "Duration": 0.0, "Parent": {"$ref": endAreaId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doPark) endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Telescope.ParkScope, NINA.Sequencer", "Parent": {"$ref": endAreaId}, "ErrorBehavior": 0, "Attempts": 1 });

            let ninaJSON = { "$id": rootId, "$type": "NINA.Sequencer.Container.SequenceRootContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": `AstroDashboard - ${targetSelezionato.name}`, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [ { "$id": startAreaId, "$type": "NINA.Sequencer.Container.StartAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Start", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", startItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": targetAreaId, "$type": "NINA.Sequencer.Container.TargetAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", targetItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": endAreaId, "$type": "NINA.Sequencer.Container.EndAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "End", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", endItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 } ]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 };

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ninaJSON, null, 2));
            let dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", `AD_Seq_${targetSelezionato.name.replace(/\s+/g, '_')}.json`); document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();
        }
        function esportaASIAIR() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }

            // ── Coordinate J2000 ─────────────────────────────────────────
            let ra = targetSelezionato.ra;
            let rh = Math.floor(ra), rm = Math.floor((ra-rh)*60), rs = Math.round(((ra-rh)*60-rm)*60);
            if(rs===60){rs=0;rm++;} if(rm===60){rm=0;rh++;}
            let raStr = `${rh.toString().padStart(2,'0')}:${rm.toString().padStart(2,'0')}:${rs.toString().padStart(2,'0')}`;
            let dec = targetSelezionato.dec, negD = dec<0, aD = Math.abs(dec);
            let dd = Math.floor(aD), dm = Math.floor((aD-dd)*60), ds = Math.round(((aD-dd)*60-dm)*60);
            if(ds===60){ds=0;dm++;} if(dm===60){dm=0;dd++;}
            let decStr = `${negD?"-":"+"}${dd.toString().padStart(2,'0')}:${dm.toString().padStart(2,'0')}:${ds.toString().padStart(2,'0')}`;
            let safeName = targetSelezionato.name.replace(/,/g,'').trim();
            let csvRow   = `${safeName}, ${raStr}, ${decStr}`;

            // ── Raccolta piano di scatto ──────────────────────────────────
            let isPro     = document.getElementById('mode-pro-section') &&
                            document.getElementById('mode-pro-section').style.display !== 'none';
            let isMono    = isPro
                ? document.getElementById('pro-sensor-type').value === 'mono'
                : document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;
            let planRows  = ''; let hasPoses = false;

            frameList.forEach(f => {
                let prefix = isPro ? `pro-${f.id}` : f.id;
                let count = parseInt((document.getElementById(`${prefix}-count`) || {}).value) || 0;
                let expV  = parseInt((document.getElementById(`${prefix}-exp`)   || {}).value) || 0;
                if (count > 0 && expV > 0) {
                    hasPoses = true;
                    let filterName = (isMono && !f.id.includes('dark') && !f.id.includes('bias'))
                        ? (document.getElementById(`nina-name-${f.id}`) || {}).value || f.name : f.name;
                    let gain   = (document.getElementById(`${prefix}-gain`)   || {}).value || '--';
                    let offset = (document.getElementById(`${prefix}-offset`) || {}).value || '--';
                    let bin    = (document.getElementById(`${prefix}-bin`)    || {}).value || '1';
                    let _hdrRowEx = document.getElementById(`${prefix}-hdr-row`);
                    let _hdrActiveEx = _hdrRowEx && _hdrRowEx.style.display !== 'none' && _hdrRowEx.dataset.hdrActive !== '0';
                    let _hdrCntEx = _hdrActiveEx ? (parseInt((document.getElementById(`${prefix}-hdr-count`)||{}).value)||0) : 0;
                    let hdrExp = _hdrActiveEx ? (parseInt((document.getElementById(`${prefix}-hdr-exp`)||{}).value)||0) : 0;
                    let hdrCell = (hdrExp > 0 && _hdrCntEx > 0) ? `<td class="hdr-cell">${_hdrCntEx}× ${hdrExp}s</td>` : `<td class="dim">—</td>`;
                    planRows += `<tr>
                        <td class="f-name">${filterName}</td>
                        <td class="f-count">${count}×</td>
                        <td class="f-exp">${expV}s</td>
                        ${hdrCell}
                        <td class="dim">${gain}</td>
                        <td class="dim">${offset}</td>
                        <td class="dim">${bin}×${bin}</td>
                    </tr>`;
                }
            });
            if (!hasPoses) { document.getElementById('empty-seq-modal').style.display='block'; return; }

            let anyDither = frameList.some(f => { let pfx = isPro ? `pro-${f.id}` : f.id; let c = document.getElementById(`${pfx}-dither`); return c && c.checked; });
            let dFreq = (() => { let ff = frameList.map(f => { let pfx = isPro ? `pro-${f.id}` : f.id; let e = document.getElementById(`${pfx}-dfreq`); return e ? parseInt(e.value)||3 : null; }).filter(v=>v!==null); return ff.length ? Math.min(...ff) : 3; })();
            let rotVal = document.getElementById('fov-rotation').value || "0";
            let now    = new Date().toLocaleString();

            // ── Etichette multilingua ─────────────────────────────────────
            let L = {
                title:    lang==='it'?'Piano di Scatto ASIAIR'  :lang==='en'?'ASIAIR Shooting Plan'     :lang==='es'?'Plan de Disparo ASIAIR'  :'ASIAIR 拍摄计划',
                csvLbl:   lang==='it'?'Riga CSV — copia in ASIAIR (Piano › Aggiungi Target)':lang==='en'?'CSV row — paste in ASIAIR (Plan › Add Target)':lang==='es'?'Fila CSV — pega en ASIAIR (Plan › Añadir Objetivo)':'CSV行 — 粘贴到ASIAIR(计划›添加目标)',
                note:     lang==='it'?'Dopo aver importato il target, configura manualmente le impostazioni di scatto dalla tabella sottostante nel Plan Mode di ASIAIR.'
                         :lang==='en'?'After importing the target, manually configure the shooting settings from the table below in ASIAIR Plan Mode.'
                         :lang==='es'?'Tras importar el objetivo, configura manualmente los ajustes de disparo desde la tabla en el Modo Plan de ASIAIR.'
                                     :'导入目标后，在ASIAIR计划模式中根据下表手动配置拍摄设置。',
                filter:   lang==='it'?'Filtro'      :lang==='en'?'Filter'  :lang==='es'?'Filtro'    :'滤镜',
                frames:   lang==='it'?'Pose'        :lang==='en'?'Frames'  :lang==='es'?'Tomas'     :'帧数',
                exp:      lang==='it'?'Esposizione' :lang==='en'?'Exposure':lang==='es'?'Exposición':'曝光',
                hdr:      'HDR',
                dither:   'Dithering',
                dithVal:  anyDither?(lang==='it'?`Ogni ${dFreq} scatti`:lang==='en'?`Every ${dFreq} frames`:lang==='es'?`Cada ${dFreq} tomas`:`每 ${dFreq} 帧`):'OFF',
                angle:    lang==='it'?'Angolo Camera (PA)':lang==='en'?'Camera Angle (PA)':lang==='es'?'Ángulo Cámara (PA)':'相机角度 (PA)',
                gen:      lang==='it'?'Generato il':lang==='en'?'Generated on':lang==='es'?'Generado el':'生成于',
                ok:       lang==='it'?'Piano ASIAIR scaricato':lang==='en'?'ASIAIR plan downloaded':lang==='es'?'Plan ASIAIR descargado':'ASIAIR计划已下载',
            };

            // ── HTML con stile ZWO ────────────────────────────────────────
            let htmlDoc = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
<title>${L.title} — ${safeName}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body   { background: #0d0d0d; color: #e8e8e8; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100vh; padding: 0 0 40px; }

  /* ── HEADER ZWO ── */
  .zwo-header { background: #111; border-bottom: 3px solid #D32F2F; padding: 18px 24px 14px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 10px; }
  .zwo-brand  { display: flex; align-items: center; gap: 12px; }
  .zwo-badge  { background: #D32F2F; color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 2px; padding: 3px 9px; border-radius: 3px; }
  .zwo-logo   { width: 48px; height: 48px; object-fit: contain; mix-blend-mode: screen; }
  .zwo-title  { display: flex; flex-direction: column; gap: 2px; }
  .zwo-app    { font-family: 'Audiowide', sans-serif; font-size: 15px; color: #e8e8e8; letter-spacing: 0.5px; }
  .zwo-app span { color: #c49a3c; }
  .zwo-sub    { font-size: 11px; color: #555; letter-spacing: 1px; text-transform: uppercase; }
  .zwo-target { text-align: right; }
  .zwo-target .name { font-size: 22px; font-weight: 800; color: #fff; }
  .zwo-target .date { font-size: 11px; color: #555; margin-top: 2px; }

  /* ── CONTENUTO ── */
  .content { max-width: 680px; margin: 0 auto; padding: 24px 20px 0; }

  /* ── NOTE BOX ── */
  .note-box { background: #161616; border: 1px solid #2a2a2a; border-left: 4px solid #D32F2F; border-radius: 6px; padding: 14px 16px; font-size: 13px; color: #aaa; line-height: 1.6; margin-bottom: 20px; }

  /* ── CSV BOX ── */
  .csv-section { margin-bottom: 24px; }
  .section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #D32F2F; margin-bottom: 8px; }
  .csv-box { background: #0a0a0a; border: 1px solid #D32F2F; border-radius: 6px; padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .csv-value { font-family: 'Courier New', monospace; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: .5px; flex: 1; min-width: 0; word-break: break-all; }
  .copy-btn { background: #D32F2F; color: #fff; border: none; border-radius: 5px; padding: 8px 14px; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
  .copy-btn:active { background: #b71c1c; }
  .copy-ok { color: #4caf50; font-size: 12px; font-weight: 700; display: none; margin-top: 6px; }

  /* ── TABELLA FILTRI ── */
  .table-section { margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead { background: #1a1a1a; }
  thead th { padding: 9px 10px; text-align: center; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #666; border-bottom: 2px solid #D32F2F; }
  thead th:first-child { text-align: left; padding-left: 14px; }
  tbody tr { border-bottom: 1px solid #1a1a1a; }
  tbody tr:nth-child(even) { background: #111; }
  tbody tr:nth-child(odd)  { background: #0d0d0d; }
  td { padding: 10px 10px; text-align: center; vertical-align: middle; }
  td:first-child { text-align: left; padding-left: 14px; }
  .f-name  { font-weight: 700; color: #fff; font-size: 14px; }
  .f-count { color: #ffaa00; font-weight: 700; font-size: 14px; }
  .f-exp   { color: #bb86fc; font-weight: 600; }
  .hdr-cell{ color: #ff6b6b; font-size: 12px; }
  .dim     { color: #555; font-size: 12px; }

  /* ── PARAMETRI ── */
  .params { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
  .param-card { background: #111; border: 1px solid #222; border-radius: 6px; padding: 12px 16px; display: flex; flex-direction: column; gap: 4px; }
  .param-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #555; }
  .param-value { font-size: 16px; font-weight: 800; color: #fff; }

  @media (max-width: 480px) { .params { grid-template-columns: 1fr; } .zwo-target .name { font-size: 18px; } }
  @media print { body { background: #fff; color: #000; } .zwo-header { background: #fff; } .copy-btn { display: none; } }
</style>
</head>
<body>

<div class="zwo-header">
  <div class="zwo-brand">
    <img src="' + ADP_LOGO_B64 + '" alt="logo" class="zwo-logo">
    <div class="zwo-title">
      <span class="zwo-app">AstroDashboard <span>PRO</span></span>
      <span class="zwo-sub">ZWO ASIAIR Plan</span>
    </div>
  </div>
  <div class="zwo-target">
    <div class="name">${safeName}</div>
    <div class="date">${L.gen} ${now}</div>
  </div>
</div>

<div class="content">

  <div class="note-box">${L.note}</div>

  <div class="csv-section">
    <div class="section-label">${L.csvLbl}</div>
    <div class="csv-box">
      <span class="csv-value" id="csv-val">${csvRow}</span>
      <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('csv-val').innerText).then(()=>{ var ok=document.getElementById('copy-ok'); ok.style.display='block'; setTimeout(()=>ok.style.display='none',2000); })">COPY</button>
    </div>
    <div class="copy-ok" id="copy-ok">✓ Copiato!</div>
  </div>

  <div class="table-section">
    <div class="section-label">${L.frames}</div>
    <table>
      <thead><tr>
        <th>${L.filter}</th>
        <th>${L.frames}</th>
        <th>${L.exp}</th>
        <th>${L.hdr}</th>
        <th>Gain</th>
        <th>Offset</th>
        <th>BIN</th>
      </tr></thead>
      <tbody>${planRows}</tbody>
    </table>
  </div>

  <div class="params">
    <div class="param-card">
      <span class="param-label">${L.dither}</span>
      <span class="param-value">${L.dithVal}</span>
    </div>
    <div class="param-card">
      <span class="param-label">${L.angle}</span>
      <span class="param-value">${rotVal}°</span>
    </div>
  </div>

</div>
</body></html>`;

            // ── Download unico file HTML (Blob URL — identico a report.js) ─
            var blob = new Blob([htmlDoc], {type:'text/html;charset=utf-8'});
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement('a');
            a.href = url; a.download = `ASIAIR_${safeName.replace(/\s+/g,'_')}_plan.html`;
            document.body.appendChild(a); a.click();
            setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
            mostraAvviso(L.ok, 'ok');
        }

        function chiudiAsiairReport() {} // mantenuto per compatibilità
        /* --- MULTI NIGHT MANAGER E EXPORT JSON --- */

