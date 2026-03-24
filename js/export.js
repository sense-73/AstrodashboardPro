// export.js — Generazione JSON N.I.N.A. Advanced Sequencer (Smart)
// Struttura basata su template verificato funzionante
// ============================================================

        // ── Utility: ObservableCollection wrapper ──────────────────────
        function obsCol(typeKey, values) {
            const types = {
                condition: "System.Collections.ObjectModel.ObservableCollection`1[[NINA.Sequencer.Conditions.ISequenceCondition, NINA.Sequencer]], System.ObjectModel",
                item:      "System.Collections.ObjectModel.ObservableCollection`1[[NINA.Sequencer.SequenceItem.ISequenceItem, NINA.Sequencer]], System.ObjectModel",
                trigger:   "System.Collections.ObjectModel.ObservableCollection`1[[NINA.Sequencer.Trigger.ISequenceTrigger, NINA.Sequencer]], System.ObjectModel",
                exposure:  "NINA.Core.Utility.AsyncObservableCollection`1[[NINA.Sequencer.Utility.ExposureInfo, NINA.Sequencer]], NINA.Core"
            };
            return { "$id": nxid(), "$type": types[typeKey], "$values": values };
        }

        // ── Contatore $id progressivo ──────────────────────────────────
        let _idCounter = 0;
        function nxid() { return String(++_idCounter); }

        // ── Strategia sequenziale (usata ovunque) ──────────────────────
        const seqStrategy = { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" };

        // ── BinningMode ───────────────────────────────────────────────
        function binMode(b) {
            return { "$id": nxid(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": b, "Y": b };
        }

        // ── Coordinate InputCoordinates ───────────────────────────────
        function coords(ra, dec) {
            let rh = Math.floor(ra), rm = Math.floor((ra - rh) * 60), rs = ((ra - rh) * 60 - rm) * 60;
            let neg = dec < 0, aD = Math.abs(dec), dd = Math.floor(aD), dm = Math.floor((aD - dd) * 60), ds = ((aD - dd) * 60 - dm) * 60;
            return {
                "$id": nxid(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry",
                "RAHours": rh, "RAMinutes": rm, "RASeconds": rs,
                "NegativeDec": neg, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds
            };
        }

        // ── FilterInfo per SwitchFilter ───────────────────────────────
        function filterInfo(name) {
            return {
                "$id": nxid(), "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core",
                "_name": name, "_focusOffset": 0, "_position": 0,
                "_autoFocusExposureTime": -1.0, "_autoFocusFilter": false,
                "FlatWizardFilterSettings": {
                    "$id": nxid(), "$type": "NINA.Core.Model.Equipment.FlatWizardFilterSettings, NINA.Core",
                    "FlatWizardMode": 0, "HistogramMeanTarget": 0.5, "HistogramTolerance": 0.1,
                    "MaxFlatExposureTime": 30.0, "MinFlatExposureTime": 0.01,
                    "MaxAbsoluteFlatDeviceBrightness": 32767, "MinAbsoluteFlatDeviceBrightness": 0,
                    "Gain": -1, "Offset": -1,
                    "Binning": binMode(1)
                },
                "_autoFocusBinning": binMode(1),
                "_autoFocusGain": -1, "_autoFocusOffset": -1
            };
        }

        // ── DitherAfterExposures trigger ──────────────────────────────
        function ditherTrigger(parentId, freq) {
            let triggerId = nxid();
            let runnerId = nxid();
            let ditherId = nxid();
            return {
                "$id": triggerId,
                "$type": "NINA.Sequencer.Trigger.Guider.DitherAfterExposures, NINA.Sequencer",
                "AfterExposures": freq,
                "Parent": { "$ref": parentId },
                "TriggerRunner": {
                    "$id": runnerId,
                    "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                    "Strategy": seqStrategy,
                    "Name": null,
                    "Conditions": obsCol("condition", []),
                    "IsExpanded": true,
                    "Items": obsCol("item", [{
                        "$id": ditherId,
                        "$type": "NINA.Sequencer.SequenceItem.Guider.Dither, NINA.Sequencer",
                        "Parent": { "$ref": runnerId },
                        "ErrorBehavior": 0, "Attempts": 1
                    }]),
                    "Triggers": obsCol("trigger", []),
                    "Parent": null,
                    "ErrorBehavior": 0, "Attempts": 1
                }
            };
        }

        // ── Blocco filtro: LoopCondition + (SwitchFilter) + TakeExposure + (Dither) ──
        function filterBlock(expo, imagingContId) {
            let blockId = nxid();
            let items = [];

            // SwitchFilter solo se c'è un nome filtro (mono)
            if (expo.filter) {
                let sfId = nxid();
                items.push({
                    "$id": sfId,
                    "$type": "NINA.Sequencer.SequenceItem.FilterWheel.SwitchFilter, NINA.Sequencer",
                    "Filter": filterInfo(expo.filter),
                    "Parent": { "$ref": blockId },
                    "ErrorBehavior": 0, "Attempts": 1
                });
            }

            // TakeExposure — ExposureCount: 1 come da template funzionante
            let teId = nxid();
            items.push({
                "$id": teId,
                "$type": "NINA.Sequencer.SequenceItem.Imaging.TakeExposure, NINA.Sequencer",
                "ExposureTime": expo.exp,
                "Gain": expo.gain !== undefined ? expo.gain : -1,
                "Offset": expo.offset !== undefined ? expo.offset : -1,
                "Binning": binMode(expo.bin || 1),
                "ImageType": expo.type || "LIGHT",
                "ExposureCount": expo.count,
                "Parent": { "$ref": blockId },
                "ErrorBehavior": 0, "Attempts": 1
            });

            // Dither trigger (opzionale)
            let triggers = [];
            if (expo.doDither && expo.ditherFreq > 0) {
                triggers.push(ditherTrigger(blockId, expo.ditherFreq));
            }

            // LoopCondition
            let loopId = nxid();
            let loopCond = {
                "$id": loopId,
                "$type": "NINA.Sequencer.Conditions.LoopCondition, NINA.Sequencer",
                "CompletedIterations": 0,
                "Iterations": expo.count,
                "Parent": { "$ref": blockId }
            };

            return {
                "$id": blockId,
                "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                "Strategy": seqStrategy,
                "Name": expo.filter ? `${expo.count}x ${expo.filter}` : `${expo.count}x Light`,
                "Conditions": obsCol("condition", [loopCond]),
                "IsExpanded": true,
                "Items": obsCol("item", items),
                "Triggers": obsCol("trigger", triggers),
                "Parent": { "$ref": imagingContId },
                "ErrorBehavior": 0, "Attempts": 1
            };
        }

        // ══════════════════════════════════════════════════════════════
        // FUNZIONE PRINCIPALE — esportazione Smart NINA
        // ══════════════════════════════════════════════════════════════
        function esportaNINA() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }

            _idCounter = 0; // reset contatore

            // ── Leggo impostazioni UI ─────────────────────────────────
            let isMono    = document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;

            let _tS = document.getElementById('time-start') ? document.getElementById('time-start').value : '';
            let _tE = document.getElementById('time-end')   ? document.getElementById('time-end').value   : '';
            let _startH = _tS ? parseInt(_tS.split(':')[0]) : 21;
            let _startM = _tS ? parseInt(_tS.split(':')[1]) : 0;
            let _endH   = _tE ? parseInt(_tE.split(':')[0]) : 4;
            let _endM   = _tE ? parseInt(_tE.split(':')[1]) : 30;

            // Opzioni UI
            let doCool    = document.getElementById('nina-cool')   ? document.getElementById('nina-cool').checked   : false;
            let tempTarget= document.getElementById('nina-temp')   ? parseFloat(document.getElementById('nina-temp').value) || -10 : -10;
            let doSlew    = document.getElementById('nina-slew')   ? document.getElementById('nina-slew').checked   : false;
            let doRotate  = document.getElementById('nina-rotate') ? document.getElementById('nina-rotate').checked  : false;
            let doAfStart = document.getElementById('smart-af-start') ? document.getElementById('smart-af-start').checked : false;
            let doAfFilter= document.getElementById('smart-af-filter') ? document.getElementById('smart-af-filter').checked : false;
            let doAfHfr   = document.getElementById('smart-af-hfr')    ? document.getElementById('smart-af-hfr').checked    : false;
            let doGuide   = document.getElementById('nina-guide')  ? document.getElementById('nina-guide').checked  : false;
            let doFlip    = document.getElementById('nina-flip')   ? document.getElementById('nina-flip').checked   : false;
            let doWarm    = document.getElementById('nina-warm')   ? document.getElementById('nina-warm').checked   : false;
            let doPark    = document.getElementById('nina-park')   ? document.getElementById('nina-park').checked   : false;

            // ── Raccolta esposizioni ──────────────────────────────────
            // Tipo filtro OSC (dual/quad-band) — letto dall'elemento UI
            let filterOscType = (document.getElementById('filter-osc-type') || {value:'none'}).value;
            // Nome filtro OSC per NINA (dual/quad-band)
            let oscFilterName = null;
            if (!isMono && filterOscType !== 'none') {
                let nameEl = document.getElementById('nina-osc-filter-name');
                oscFilterName = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : (filterOscType === 'dual' ? 'Dual-band' : 'Quad-band');
            }

            let esposizioni = [];
            frameList.forEach(f => {
                let count  = parseInt((document.getElementById(`${f.id}-count`) || {}).value) || 0;
                let exp    = parseInt((document.getElementById(`${f.id}-exp`)   || {}).value) || 0;
                if (count <= 0 || exp <= 0) return;

                let binVal    = parseInt((document.getElementById(`${f.id}-bin`) || {}).value) || 1;
                let gainVal   = parseInt((document.getElementById(`${f.id}-gain`) || {}).value);
                let offsetVal = parseInt((document.getElementById(`${f.id}-offset`) || {}).value);
                let isLight   = !f.id.includes('dark') && !f.id.includes('bias');
                let dithChk   = document.getElementById(`${f.id}-dither`);
                let dithFrq   = document.getElementById(`${f.id}-dfreq`);
                let doDither  = isLight && dithChk ? dithChk.checked : false;
                let ditherFreq= parseInt(dithFrq ? dithFrq.value : 4) || 4;
                // OSC con filtro dual/quad: usa il nome del filtro OSC per SwitchFilter
                let filterName= isMono && isLight ? (document.getElementById(`nina-name-${f.id}`) || {value:''}).value.trim()
                              : (!isMono && isLight && oscFilterName) ? oscFilterName : null;
                let imageType = f.id.includes('dark') ? "DARK" : f.id.includes('bias') ? "BIAS" : "LIGHT";

                esposizioni.push({
                    count, exp, bin: binVal,
                    gain: isNaN(gainVal) ? -1 : gainVal,
                    offset: isNaN(offsetVal) ? -1 : offsetVal,
                    filter: filterName || null,
                    type: imageType,
                    doDither, ditherFreq
                });
            });

            if (esposizioni.length === 0) { mostraAvviso(t("alert_no_frames"), "warn"); return; }

            // ── Coordinate target ─────────────────────────────────────
            let _fovRaDeg = fovCenterOverride ? fovCenterOverride.raDeg  : targetSelezionato.ra * 15;
            let _fovDecDeg= fovCenterOverride ? fovCenterOverride.decDeg : targetSelezionato.dec;
            let ra = _fovRaDeg / 15;

            // ── ID principali ─────────────────────────────────────────
            let rootId        = nxid(); // 1
            let startAreaId   = nxid(); // 2
            let targetAreaId  = nxid(); // ...
            let endAreaId     = nxid();
            let dsoId         = nxid();
            let imagingContId = nxid();

            // ── Start Area items: UnparkScope + CoolCamera ───────────
            let startItems = [];
            startItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Telescope.UnparkScope, NINA.Sequencer", "Parent": { "$ref": startAreaId }, "ErrorBehavior": 0, "Attempts": 1 });
            if (doCool) startItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Camera.CoolCamera, NINA.Sequencer", "Temperature": tempTarget, "Duration": 0.0, "Parent": { "$ref": startAreaId }, "ErrorBehavior": 0, "Attempts": 1 });

            // ── DSO items (pre-imaging) ────────────────────────────────
            let dsoItems = [];
            if (doSlew) dsoItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.Center, NINA.Sequencer", "Inherited": true, "Coordinates": coords(ra, _fovDecDeg), "Parent": { "$ref": dsoId }, "ErrorBehavior": 0, "Attempts": 1 });
            if (doRotate) dsoItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.SolveAndRotate, NINA.Sequencer", "Inherited": true, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0, "Parent": { "$ref": dsoId }, "ErrorBehavior": 0, "Attempts": 1 });
            if (doAfStart) dsoItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": { "$ref": dsoId }, "ErrorBehavior": 0, "Attempts": 1 });
            if (doGuide) dsoItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Guider.StartGuiding, NINA.Sequencer", "ForceCalibration": false, "Parent": { "$ref": dsoId }, "ErrorBehavior": 0, "Attempts": 1 });

            // WaitForTime
            dsoItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitForTime, NINA.Sequencer", "Hours": _startH, "Minutes": _startM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": { "$ref": dsoId }, "ErrorBehavior": 0, "Attempts": 1 });

            // ── Blocchi filtro ────────────────────────────────────────
            let filterBlocks = esposizioni.map(e => filterBlock(e, imagingContId));

            // ── Trigger su "Target Imaging Instructions" ──────────────
            let imagingTriggers = [];
            if (doFlip) {
                let tId = nxid(), rId = nxid();
                imagingTriggers.push({ "$id": tId, "$type": "NINA.Sequencer.Trigger.MeridianFlip.MeridianFlipTrigger, NINA.Sequencer", "Parent": { "$ref": imagingContId }, "TriggerRunner": { "$id": rId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": null, "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item",[]), "Triggers": obsCol("trigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
            }
            if (doAfHfr) {
                let tId = nxid(), rId = nxid(), afId = nxid();
                imagingTriggers.push({ "$id": tId, "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterHFRIncreaseTrigger, NINA.Sequencer", "Amount": 10.0, "SampleSize": 10, "Parent": { "$ref": imagingContId }, "TriggerRunner": { "$id": rId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": null, "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item",[{ "$id": afId, "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": { "$ref": rId }, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": obsCol("trigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
            }
            if (doAfFilter) {
                let tId = nxid(), rId = nxid(), afId = nxid();
                imagingTriggers.push({ "$id": tId, "$type": "NINA.Sequencer.Trigger.Autofocus.AutofocusAfterFilterChange, NINA.Sequencer", "Parent": { "$ref": imagingContId }, "TriggerRunner": { "$id": rId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": null, "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item",[{ "$id": afId, "$type": "NINA.Sequencer.SequenceItem.Autofocus.RunAutofocus, NINA.Sequencer", "Parent": { "$ref": rId }, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": obsCol("trigger",[]), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
            }

            // ── "Target Imaging Instructions" container ───────────────
            let imagingCont = {
                "$id": imagingContId,
                "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer",
                "Strategy": seqStrategy,
                "Name": "Target Imaging Instructions",
                "Conditions": obsCol("condition", []),
                "IsExpanded": true,
                "Items": obsCol("item", filterBlocks),
                "Triggers": obsCol("trigger", imagingTriggers),
                "Parent": { "$ref": dsoId },
                "ErrorBehavior": 0, "Attempts": 1
            };
            dsoItems.push(imagingCont);

            // ── Condizioni DSO (TimeCondition + AboveHorizon) ─────────
            let dsoConds = [];
            dsoConds.push({ "$id": nxid(), "$type": "NINA.Sequencer.Conditions.TimeCondition, NINA.Sequencer", "Hours": _endH, "Minutes": _endM, "MinutesOffset": 0, "Seconds": 0, "SelectedProvider": { "$type": "NINA.Sequencer.Utility.DateTimeProvider.TimeProvider, NINA.Sequencer" }, "Parent": { "$ref": dsoId } });
            dsoConds.push({ "$id": nxid(), "$type": "NINA.Sequencer.Conditions.AboveHorizonCondition, NINA.Sequencer", "HasDsoParent": true, "Data": { "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Utility.WaitLoopData, NINA.Sequencer", "Coordinates": coords(ra, _fovDecDeg), "Offset": 30.0, "Comparator": 3 }, "Parent": { "$ref": dsoId } });

            // ── ExposureInfoList (metadati) ───────────────────────────
            let expInfoList = esposizioni.map(e => ({
                "$id": nxid(), "$type": "NINA.Sequencer.Utility.ExposureInfo, NINA.Sequencer",
                "Count": e.count, "Filter": e.filter || "", "ExposureTime": e.exp,
                "Gain": e.gain, "Offset": e.offset, "ImageType": e.type,
                "BinningX": e.bin, "BinningY": e.bin, "ROI": 1.0
            }));

            // ── DSO Container ─────────────────────────────────────────
            let dsoCont = {
                "$id": dsoId,
                "$type": "NINA.Sequencer.Container.DeepSkyObjectContainer, NINA.Sequencer",
                "Target": {
                    "$id": nxid(), "$type": "NINA.Astrometry.InputTarget, NINA.Astrometry",
                    "Expanded": true,
                    "TargetName": targetSelezionato.name,
                    "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0.0,
                    "InputCoordinates": coords(ra, _fovDecDeg)
                },
                "ExposureInfoListExpanded": false,
                "ExposureInfoList": { "$id": nxid(), "$type": "NINA.Core.Utility.AsyncObservableCollection`1[[NINA.Sequencer.Utility.ExposureInfo, NINA.Sequencer]], NINA.Core", "$values": expInfoList },
                "Strategy": seqStrategy,
                "Name": targetSelezionato.name,
                "Conditions": obsCol("condition", dsoConds),
                "IsExpanded": true,
                "Items": obsCol("item", dsoItems),
                "Triggers": obsCol("trigger", []),
                "Parent": { "$ref": targetAreaId },
                "ErrorBehavior": 0, "Attempts": 1
            };

            // ── End Area items ────────────────────────────────────────
            let endItems = [];
            if (doWarm) endItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Camera.WarmCamera, NINA.Sequencer", "Duration": 0.0, "Parent": { "$ref": endAreaId }, "ErrorBehavior": 0, "Attempts": 1 });
            if (doPark) endItems.push({ "$id": nxid(), "$type": "NINA.Sequencer.SequenceItem.Telescope.ParkScope, NINA.Sequencer", "Parent": { "$ref": endAreaId }, "ErrorBehavior": 0, "Attempts": 1 });

            // ── Root JSON ─────────────────────────────────────────────
            let ninaJSON = {
                "$id": rootId,
                "$type": "NINA.Sequencer.Container.SequenceRootContainer, NINA.Sequencer",
                "Strategy": seqStrategy,
                "Name": `AstroDashboard - ${targetSelezionato.name}`,
                "Conditions": obsCol("condition", []),
                "IsExpanded": true,
                "Items": obsCol("item", [
                    { "$id": startAreaId, "$type": "NINA.Sequencer.Container.StartAreaContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": "Start", "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item", startItems), "Triggers": obsCol("trigger",[]), "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1 },
                    { "$id": targetAreaId, "$type": "NINA.Sequencer.Container.TargetAreaContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": "Target", "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item", [dsoCont]), "Triggers": obsCol("trigger",[]), "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1 },
                    { "$id": endAreaId, "$type": "NINA.Sequencer.Container.EndAreaContainer, NINA.Sequencer", "Strategy": seqStrategy, "Name": "End", "Conditions": obsCol("condition",[]), "IsExpanded": true, "Items": obsCol("item", endItems), "Triggers": obsCol("trigger",[]), "Parent": { "$ref": rootId }, "ErrorBehavior": 0, "Attempts": 1 }
                ]),
                "Triggers": obsCol("trigger", []),
                "Parent": null,
                "ErrorBehavior": 0, "Attempts": 1
            };

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ninaJSON, null, 2));
            let a = document.createElement('a');
            a.setAttribute("href", dataStr);
            a.setAttribute("download", `AD_Seq_${targetSelezionato.name.replace(/\s+/g,'_')}.json`);
            document.body.appendChild(a); a.click(); a.remove();
        }

        function esportaASIAIR() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }
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
            let isPro     = document.getElementById('mode-pro-section') && document.getElementById('mode-pro-section').style.display !== 'none';
            let isMono    = isPro ? document.getElementById('pro-sensor-type').value === 'mono' : document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;
            let planRows  = ''; let hasPoses = false;
            frameList.forEach(f => {
                let prefix = isPro ? `pro-${f.id}` : f.id;
                let count = parseInt((document.getElementById(`${prefix}-count`) || {}).value) || 0;
                let expV  = parseInt((document.getElementById(`${prefix}-exp`)   || {}).value) || 0;
                let gainV = parseInt((document.getElementById(`${prefix}-gain`)  || {}).value);
                let binV  = parseInt((document.getElementById(`${prefix}-bin`)   || {}).value) || 1;
                if (count > 0 && expV > 0) {
                    hasPoses = true;
                    let label = f.label || f.id;
                    let gainStr = isNaN(gainV) ? '-' : String(gainV);
                    planRows += `\n  • ${label}: ${count}× ${expV}s  gain ${gainStr}  BIN${binV}×${binV}`;
                }
            });
            if (!hasPoses) { mostraAvviso(t("alert_no_frames"), "warn"); return; }
            let rotAngle = parseFloat((document.getElementById('fov-rotation')||{value:'0'}).value) || 0;
            let report = `ASIAIR Plan — ${targetSelezionato.name}\n${'─'.repeat(40)}\nCoordinate J2000:\n  RA  ${raStr}\n  Dec ${decStr}\n\nAngle suggerito: ${rotAngle.toFixed(1)}°\n\nPiano di scatto:${planRows}\n\nCSV per ASIAIR:\n${csvRow}`;
            let modal = document.getElementById('asiair-modal');
            if (modal) {
                let reportEl = document.getElementById('asiair-report-content');
                if (reportEl) reportEl.innerText = report;
                modal.style.display = 'flex';
            }
        }

        function chiudiAsiairReport() {
            let modal = document.getElementById('asiair-modal');
            if (modal) modal.style.display = 'none';
        }

        function verificaEsportazioneNINA() {
            if (!targetSelezionato) { mostraAvviso(t("alert_planetarium"), "warn"); return; }
            let isMono = document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;
            let hasPoses = frameList.some(f => {
                let count = parseInt((document.getElementById(`${f.id}-count`)||{}).value)||0;
                let exp   = parseInt((document.getElementById(`${f.id}-exp`)||{}).value)||0;
                return count > 0 && exp > 0;
            });
            if (!hasPoses) { mostraAvviso(t("alert_no_frames"), "warn"); return; }
            if (isMono) {
                let filterList = framesMono.filter(f => !f.id.includes('dark') && !f.id.includes('bias'));
                let missingNames = filterList.filter(f => {
                    let count = parseInt((document.getElementById(`${f.id}-count`)||{}).value)||0;
                    let exp   = parseInt((document.getElementById(`${f.id}-exp`)||{}).value)||0;
                    if (count <= 0 || exp <= 0) return false;
                    let nameEl = document.getElementById(`nina-name-${f.id}`);
                    return !nameEl || !nameEl.value.trim();
                });
                if (missingNames.length > 0) {
                    let w = document.getElementById('nina-filter-warning');
                    if (w) w.style.display = 'block';
                    mostraAvviso(t("alert_nina_names"), "warn"); return;
                }
            }
            esportaNINA();
        }
