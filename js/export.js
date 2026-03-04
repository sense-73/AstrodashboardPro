// export.js — Export N.I.N.A. Smart, export ASIAIR
// ============================================================

        function esportaNINA() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }
            let doCool = document.getElementById('nina-cool').checked, tempTarget = parseFloat(document.getElementById('nina-temp').value) || -10;
            let doSlew = document.getElementById('nina-slew').checked, doGuide = document.getElementById('nina-guide').checked, doWarm = document.getElementById('nina-warm').checked, doPark = document.getElementById('nina-park').checked, doFlip = document.getElementById('nina-flip').checked, doDither = document.getElementById('dither-check') && document.getElementById('dither-check').checked, ditherFreq = parseInt(document.getElementById('dither-freq').value) || 1;
            let isMono = document.getElementById('sensor-type').value === 'mono', frameList = isMono ? framesMono : framesColor, esposizioni = [];

            frameList.forEach(f => {
                let count = parseInt(document.getElementById(`${f.id}-count`).value) || 0, exp = parseInt(document.getElementById(`${f.id}-exp`).value) || 0;
                if (count > 0 && exp > 0) { let isLight = !f.id.includes('dark') && !f.id.includes('bias'); esposizioni.push({ count: count, exp: exp, filter: (isMono && isLight) ? document.getElementById(`nina-name-${f.id}`).value.trim() : null, type: f.id.includes('dark') ? "DARK" : f.id.includes('bias') ? "FLAT" : "LIGHT" }); }
            });
            if (esposizioni.length === 0) { alert(t("alert_noseq")); return; }

            let idCounter = 1; function nextId() { return (idCounter++).toString(); }
            function makeObs(type, values) { return { "$id": nextId(), "$type": `System.Collections.ObjectModel.ObservableCollection\`1[[${type}, NINA.Sequencer]], System.ObjectModel`, "$values": values }; }
            // Usa coordinate centro FOV se l'utente ha spostato la mappa, altrimenti quelle del target
            let _fovRaDeg  = fovCenterOverride ? fovCenterOverride.raDeg  : targetSelezionato.ra * 15;
            let _fovDecDeg = fovCenterOverride ? fovCenterOverride.decDeg : targetSelezionato.dec;
            let ra = _fovRaDeg / 15, rh = Math.floor(ra), rm = Math.floor((ra - rh) * 60), rs = ((ra - rh) * 60 - rm) * 60;
            let dec = _fovDecDeg, negD = dec < 0, aD = Math.abs(dec), dd = Math.floor(aD), dm = Math.floor((aD - dd) * 60), ds = ((aD - dd) * 60 - dm) * 60;
            let rootId = nextId(), startAreaId = nextId(), targetAreaId = nextId(), endAreaId = nextId(), startItems = [];
            if (doCool) startItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.CoolCamera, NINA.Sequencer", "Temperature": tempTarget, "Duration": 0.0, "Parent": {"$ref": startAreaId}, "ErrorBehavior": 0, "Attempts": 1 });
            let dsoContainerId = nextId(), imagingContainerId = nextId(), dsoItems = [];
            if (doSlew) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.Center, NINA.Sequencer", "Inherited": true, "Coordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds }, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (document.getElementById('nina-rotate') && document.getElementById('nina-rotate').checked) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Platesolving.SolveAndRotate, NINA.Sequencer", "Inherited": true, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doGuide) dsoItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.StartGuiding, NINA.Sequencer", "ForceCalibration": false, "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });

            let imagingItems = [];
            esposizioni.forEach(expo => {
                let blockId = nextId(), blockItems = [];
                if (expo.filter) blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.FilterWheel.SwitchFilter, NINA.Sequencer", "Filter": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.FilterInfo, NINA.Core", "_name": expo.filter, "_focusOffset": 0, "_position": 0, "_autoFocusExposureTime": -1.0, "_autoFocusFilter": false }, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                blockItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Imaging.TakeExposure, NINA.Sequencer", "ExposureTime": expo.exp, "Gain": -1, "Offset": -1, "Binning": { "$id": nextId(), "$type": "NINA.Core.Model.Equipment.BinningMode, NINA.Core", "X": 1, "Y": 1 }, "ImageType": expo.type, "ExposureCount": expo.count, "Parent": {"$ref": blockId}, "ErrorBehavior": 0, "Attempts": 1 });
                let blockTriggers = [];
                if (doDither && expo.type === "LIGHT" && ditherFreq > 0) {
                    let trigRunnerId = nextId(); blockTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.Guider.DitherAfterExposures, NINA.Sequencer", "AfterExposures": ditherFreq, "Parent": {"$ref": blockId}, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [{ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Guider.Dither, NINA.Sequencer", "Parent": {"$ref": trigRunnerId}, "ErrorBehavior": 0, "Attempts": 1 }]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } });
                }
                imagingItems.push({ "$id": blockId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": expo.filter ? `Ripresa ${expo.filter}` : `Ripresa ${expo.type}`, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", blockItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", blockTriggers), "Parent": {"$ref": imagingContainerId}, "ErrorBehavior": 0, "Attempts": 1 });
            });

            let imagingTriggers = [];
            if (doFlip) { let trigRunnerId = nextId(); imagingTriggers.push({ "$id": nextId(), "$type": "NINA.Sequencer.Trigger.MeridianFlip.MeridianFlipTrigger, NINA.Sequencer", "Parent": {"$ref": imagingContainerId}, "TriggerRunner": { "$id": trigRunnerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", []), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 } }); }
            dsoItems.push({ "$id": imagingContainerId, "$type": "NINA.Sequencer.Container.SequentialContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target Imaging", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", imagingItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", imagingTriggers), "Parent": {"$ref": dsoContainerId}, "ErrorBehavior": 0, "Attempts": 1 });

            let targetItems = [{ "$id": dsoContainerId, "$type": "NINA.Sequencer.Container.DeepSkyObjectContainer, NINA.Sequencer", "Target": { "$id": nextId(), "$type": "NINA.Astrometry.InputTarget, NINA.Astrometry", "Expanded": true, "TargetName": targetSelezionato.name, "PositionAngle": parseFloat(document.getElementById('fov-rotation').value) || 0.0, "InputCoordinates": { "$id": nextId(), "$type": "NINA.Astrometry.InputCoordinates, NINA.Astrometry", "RAHours": rh, "RAMinutes": rm, "RASeconds": rs, "NegativeDec": negD, "DecDegrees": dd, "DecMinutes": dm, "DecSeconds": ds } }, "ExposureInfoListExpanded": false, "ExposureInfoList": null, "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": targetSelezionato.name, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", dsoItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": targetAreaId}, "ErrorBehavior": 0, "Attempts": 1 }];

            let endItems = [];
            if (doWarm) endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Camera.WarmCamera, NINA.Sequencer", "Duration": 0.0, "Parent": {"$ref": endAreaId}, "ErrorBehavior": 0, "Attempts": 1 });
            if (doPark) endItems.push({ "$id": nextId(), "$type": "NINA.Sequencer.SequenceItem.Telescope.ParkScope, NINA.Sequencer", "Parent": {"$ref": endAreaId}, "ErrorBehavior": 0, "Attempts": 1 });

            let ninaJSON = { "$id": rootId, "$type": "NINA.Sequencer.Container.SequenceRootContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": `AstroDashboard - ${targetSelezionato.name}`, "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", [ { "$id": startAreaId, "$type": "NINA.Sequencer.Container.StartAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Start", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", startItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": targetAreaId, "$type": "NINA.Sequencer.Container.TargetAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "Target", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", targetItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 }, { "$id": endAreaId, "$type": "NINA.Sequencer.Container.EndAreaContainer, NINA.Sequencer", "Strategy": { "$type": "NINA.Sequencer.Container.ExecutionStrategy.SequentialStrategy, NINA.Sequencer" }, "Name": "End", "Conditions": makeObs("NINA.Sequencer.Conditions.ISequenceCondition", []), "IsExpanded": true, "Items": makeObs("NINA.Sequencer.SequenceItem.ISequenceItem", endItems), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": {"$ref": rootId}, "ErrorBehavior": 0, "Attempts": 1 } ]), "Triggers": makeObs("NINA.Sequencer.Trigger.ISequenceTrigger", []), "Parent": null, "ErrorBehavior": 0, "Attempts": 1 };

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ninaJSON, null, 2));
            let dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", `AD_Seq_${targetSelezionato.name.replace(/\s+/g, '_')}.json`); document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();
        }
        function esportaASIAIR() {
            if (!targetSelezionato) { alert(t("alert_planetarium")); return; }
            
            // 1. DOWNLOAD DEL FILE CSV PER LE COORDINATE
            let ra = targetSelezionato.ra, rh = Math.floor(ra), rm = Math.floor((ra - rh) * 60), rs = Math.round(((ra - rh) * 60 - rm) * 60);
            if(rs === 60) { rs = 0; rm++; } if(rm === 60) { rm = 0; rh++; }
            let raStr = `${rh.toString().padStart(2, '0')}:${rm.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;

            let dec = targetSelezionato.dec, negD = dec < 0, aD = Math.abs(dec), dd = Math.floor(aD), dm = Math.floor((aD - dd) * 60), ds = Math.round(((aD - dd) * 60 - dm) * 60);
            if(ds === 60) { ds = 0; dm++; } if(dm === 60) { dm = 0; dd++; }
            let decStr = `${negD ? "-" : "+"}${dd.toString().padStart(2, '0')}:${dm.toString().padStart(2, '0')}:${ds.toString().padStart(2, '0')}`;

            let safeName = targetSelezionato.name.replace(/,/g, '').trim();
            let csvContent = `${safeName}, ${raStr}, ${decStr}\n`;
            let dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
            let dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", `ASIAIR_Plan_${safeName.replace(/\s+/g, '_')}.csv`);
            document.body.appendChild(dlAnchorElem); dlAnchorElem.click(); dlAnchorElem.remove();

            // 2. CREAZIONE DEL DOSSIER VISIVO ZWO (Generazione dinamica per le lingue)
            let isMono = document.getElementById('sensor-type').value === 'mono';
            let frameList = isMono ? framesMono : framesColor;
            let planHtml = ''; let hasPoses = false;

            frameList.forEach(f => {
                let count = parseInt(document.getElementById(`${f.id}-count`).value) || 0;
                let exp = parseInt(document.getElementById(`${f.id}-exp`).value) || 0;
                if(count > 0 && exp > 0) {
                    hasPoses = true;
                    let filterName = (isMono && (!f.id.includes('dark') && !f.id.includes('bias'))) ? document.getElementById(`nina-name-${f.id}`).value : f.name;
                    planHtml += `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#222; padding:10px 15px; margin-bottom:8px; border-left:4px solid #D32F2F; border-radius:4px;">
                        <span style="color:#ddd; font-weight:bold; font-size:1.1em;">${filterName}</span>
                        <span style="color:#ffaa00; font-size:1.2em;">${count}x <b style="color:#fff;">${exp}s</b></span>
                    </div>`;
                }
            });

            if (!hasPoses) { alert(t("alert_noseq")); return; }

            let dC = document.getElementById('dither-check').checked;
            let dFreq = document.getElementById('dither-freq').value;

            // Traduzioni integrate al volo senza toccare il dizionario in alto
            let introTxt = lang === 'it' ? "Il file <b>.csv</b> con le coordinate millimetriche è stato scaricato.<br>Importalo sul tablet e ricopia <b>manualmente</b> questo piano di scatto calcolato dall'AI nel Plan Mode di ASIAIR:" :
                           lang === 'en' ? "The <b>.csv</b> file with pinpoint coordinates has been downloaded.<br>Import it to your tablet and <b>manually</b> copy this AI-calculated exposure plan into ASIAIR's Plan Mode:" :
                           lang === 'es' ? "El archivo <b>.csv</b> con las coordenadas exactas se ha descargado.<br>Impórtalo en tu tablet y copia <b>manualmente</b> este plan calculado por la IA en el Modo Plan de ASIAIR:" :
                                           "具有精确坐标的 <b>.csv</b> 文件已下载。<br>将其导入平板电脑，然后在 ASIAIR 的计划模式下<b>手动</b>复制此 AI 计算的曝光计划：";

            let dithTxt = lang === 'it' ? "Dithering" : lang === 'en' ? "Dithering" : lang === 'es' ? "Dithering" : "抖动";
            let dithVal = dC ? (lang === 'it' ? `Ogni ${dFreq} scatti` : lang === 'en' ? `Every ${dFreq} frames` : lang === 'es' ? `Cada ${dFreq} tomas` : `每 ${dFreq} 帧`) : "OFF";
            let rotVal = document.getElementById('fov-rotation').value || "0";

            let html = `
                <p style="font-size: 0.95em; color: #ccc; line-height: 1.6; margin-bottom: 25px; border-bottom: 1px dashed #444; padding-bottom: 15px;">📥 ${introTxt}</p>
                <div style="margin-bottom: 25px;">
                    ${planHtml}
                </div>
                <div style="background: rgba(211, 47, 47, 0.1); padding: 12px; border-radius: 4px; border: 1px dashed #D32F2F; display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:#ffaaaa; font-size:0.9em;">📍 ${dithTxt}:</span>
                    <b style="color:#fff; font-size:1.1em;">${dithVal}</b>
                </div>
                <div style="background: rgba(211, 47, 47, 0.1); padding: 12px; border-radius: 4px; border: 1px dashed #D32F2F; display:flex; justify-content:space-between; align-items:center; margin-top: 5px;">
                    <span style="color:#ffaaaa; font-size:0.9em;">🔄 Camera Angle (PA):</span>
                    <b style="color:#fff; font-size:1.1em;">${rotVal}°</b>
                </div>
            `;

            document.getElementById('asiair-report-content').innerHTML = html;
            document.getElementById('asiair-modal').style.display = 'block';
        }

        function chiudiAsiairReport() { document.getElementById('asiair-modal').style.display = 'none'; }
        /* --- MULTI NIGHT MANAGER E EXPORT JSON --- */

