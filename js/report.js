// report.js — AstroDashboard PRO — Report HTML scaricabile
// Unicode completo: IT / EN / ES / ZH supportati nativamente
// ============================================================

        // ── Helpers base ─────────────────────────────────────────────
        function _esc(s) {
            // Escaping HTML — preserva tutto l'Unicode (cinese, accenti, emoji)
            return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }
        function _t(key){ return (typeof t==='function') ? t(key) : key; }
        function _el(id){ var e=document.getElementById(id); return e?(e.innerText||e.value||'--'):'--'; }
        function _val(id){ var e=document.getElementById(id); return e?(e.value||'--'):'--'; }

        function _raStr(raDeg){
            var ra=raDeg/15,h=Math.floor(ra),m=Math.floor((ra-h)*60),s=Math.round(((ra-h)*60-m)*60);
            return h+'h '+('0'+m).slice(-2)+'m '+('0'+s).slice(-2)+'s';
        }
        function _decStr(dec){
            var neg=dec<0,a=Math.abs(dec),d=Math.floor(a),m=Math.floor((a-d)*60),s=Math.round(((a-d)*60-m)*60);
            return (neg?'-':'+')+('0'+d).slice(-2)+'° '+('0'+m).slice(-2)+"' "+('0'+s).slice(-2)+'"';
        }
        function _fmtSecs(s){
            var h=Math.floor(s/3600),m=Math.floor((s%3600)/60);
            if(h>0) return h+'h '+('0'+m).slice(-2)+'m';
            var sec=s%60; if(m>0) return m+'m '+('0'+sec).slice(-2)+'s';
            return sec+'s';
        }

        // ── Download HTML ─────────────────────────────────────────────
        function _downloadHTML(html, filename) {
            var blob = new Blob([html], {type:'text/html;charset=utf-8'});
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement('a');
            a.href   = url; a.download = filename;
            document.body.appendChild(a); a.click();
            setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
        }



        // ── Costruttori HTML ──────────────────────────────────────────
        function _secTitle(label) {
            return '<div class="sec-title">'+_esc(label)+'</div>';
        }
        function _grid(items, cols) {
            cols = cols || 2;
            var cls = cols===3 ? 'grid3' : cols===1 ? 'grid1' : 'grid2';
            var html = '<div class="'+cls+'">';
            items.forEach(function(it){
                html += '<div class="kv"><span class="k">'+_esc(it.label)+':</span><span class="v">'+_esc(String(it.value||'--'))+'</span></div>';
            });
            return html + '</div>';
        }
        function _filterTable(rows) {
            if (!rows||!rows.length) return '';
            var filterClasses = {L:'fl-L',R:'fl-R',G:'fl-G',B:'fl-B',Ha:'fl-Ha',OIII:'fl-OIII',SII:'fl-SII',Light:'fl-Light'};
            var html = '<table class="ftable"><thead><tr>';
            [_t('rpt_th_filter'),_t('rpt_th_frames'),_t('rpt_th_exp'),_t('rpt_th_gain'),_t('rpt_th_offset'),_t('rpt_th_bin'),_t('rpt_th_total')]
                .forEach(function(h){ html += '<th>'+_esc(h)+'</th>'; });
            html += '</tr></thead><tbody>';
            rows.forEach(function(r){
                var fc = filterClasses[r[0]] || '';
                html += '<tr>';
                html += '<td class="'+fc+'">'+_esc(r[0])+'</td>';
                for(var i=1;i<r.length;i++) html += '<td>'+_esc(r[i])+'</td>';
                html += '</tr>';
            });
            return html + '</tbody></table>';
        }
        function _totRow(frames, secs) {
            return '<div class="total-row">'
                + '<div class="tr-item"><div class="tr-label">'+_esc(_t('rpt_label_frames'))+'</div><div class="tr-value">'+_esc(frames+' '+_t('rpt_frames_unit'))+'</div></div>'
                + '<div class="tr-item"><div class="tr-label">'+_esc(_t('rpt_label_int_net'))+'</div><div class="tr-value">'+_esc(_fmtSecs(secs))+'</div></div>'
                + '</div>';
        }
        function _badge(txt, type) {
            return '<span class="badge badge-'+type+'">'+_esc(txt)+'</span>';
        }
        function _tipBox(tips) {
            if (!tips||tips==='--') return '';
            return '<div class="tip-box"><div class="tip-label">'+_esc(_t('rpt_tip_label'))+'</div><div class="tip-text">'+_esc(tips)+'</div></div>';
        }
        function _hdrFootnote() {
            if (!window._hdrNotePresent) return '';
            window._hdrNotePresent = false; // reset per prossimo report
            return '<div style="margin-top:6px;font-size:0.82em;color:#bb86fc;border-top:1px solid #3a2050;padding-top:5px;">'
                + '<span style="font-weight:600;">* HDR:</span> '
                + _esc(_t('rpt_hdr_note'))
                + '</div>';
        }

        // ── Legge filtri dal DOM ──────────────────────────────────────
        function _leggiFiltrirRows(isPro, isM) {
            window._hdrNotePresent = false; // reset prima di leggere
            var possibili = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];
            var rows=[], totalSecs=0, totalFrames=0;
            possibili.forEach(function(pid){
                var countEl, expEl, gainVal, offsetVal, binVal;
                if (isPro) {
                    countEl   = document.getElementById('pro-'+pid+'-count');
                    expEl     = document.getElementById('pro-'+pid+'-exp');
                    gainVal   = _val('pro-'+pid+'-gain');
                    offsetVal = _val('pro-'+pid+'-offset');
                    binVal    = _val('pro-'+pid+'-bin');
                } else {
                    var chk = document.getElementById(pid);
                    if (chk && !chk.checked) return;
                    countEl   = document.getElementById(pid+'-count');
                    expEl     = document.getElementById(pid+'-exp');
                    gainVal   = _val(pid+'-gain');
                    offsetVal = _val(pid+'-offset');
                    binVal    = _val(pid+'-bin');
                }
                if (!countEl||!expEl) return;
                var count = parseInt(countEl.value)||0, exp = parseInt(expEl.value)||0;
                if (count<=0) return;
                var name = pid.replace('m-','').replace('c-','').toUpperCase();
                if (name==='HA') name='Ha'; if (name==='LIGHT') name='Light';
                var tot = count*exp;
                totalSecs += tot; totalFrames += count;
                rows.push([name, count, exp+'s', gainVal||'--', offsetVal||'--', (binVal||'1')+'×'+(binVal||'1'), _fmtSecs(tot)]);
                // ── Riga HDR companion ────────────────────────────────
                var hdrRowId = isPro ? ('pro-'+pid+'-hdr-row') : (pid+'-hdr-row');
                var hdrRowEl = document.getElementById(hdrRowId);
                var hdrActive = hdrRowEl && hdrRowEl.style.display !== 'none' && hdrRowEl.dataset.hdrActive !== '0';
                if (hdrActive) {
                    var hdrCntId = isPro ? ('pro-'+pid+'-hdr-count') : (pid+'-hdr-count');
                    var hdrExpId = isPro ? ('pro-'+pid+'-hdr-exp')   : (pid+'-hdr-exp');
                    var hdrGainId = isPro ? ('pro-'+pid+'-hdr-gain') : (pid+'-hdr-gain');
                    var hdrOffId  = isPro ? ('pro-'+pid+'-hdr-offset') : (pid+'-hdr-offset');
                    var hdrBinId  = isPro ? ('pro-'+pid+'-hdr-bin')  : (pid+'-hdr-bin');
                    var hdrCntEl = document.getElementById(hdrCntId);
                    var hdrExpEl = document.getElementById(hdrExpId);
                    var hdrCount = hdrCntEl ? (parseInt(hdrCntEl.value)||0) : 0;
                    var hdrExp   = hdrExpEl ? (parseInt(hdrExpEl.value)||0) : 0;
                    if (hdrCount > 0 && hdrExp > 0) {
                        var hdrGainV  = _val(hdrGainId);
                        var hdrOffV   = _val(hdrOffId);
                        var hdrBinV   = _val(hdrBinId);
                        var hdrTot = hdrCount * hdrExp;
                        totalSecs += hdrTot; totalFrames += hdrCount;
                        rows.push([name+'*', hdrCount, hdrExp+'s', hdrGainV||'--', hdrOffV||'--', (hdrBinV||'1')+'×'+(hdrBinV||'1'), _fmtSecs(hdrTot)]);
                        window._hdrNotePresent = true;
                    }
                }
            });

            // ── Dark e Bias (calibrazione) ────────────────────────────
            var calibIds = isM ? ['m-dark','m-bias'] : ['c-dark','c-bias'];
            calibIds.forEach(function(pid){
                var prefix = isPro ? 'pro-'+pid : pid;
                var countEl = document.getElementById(prefix+'-count');
                if (!countEl) return;
                var count = parseInt(countEl.value)||0;
                if (count<=0) return;
                var isDark = pid.includes('dark');
                var expEl  = document.getElementById(prefix+'-exp');
                var exp    = expEl ? (parseFloat(expEl.value)||0) : 0;
                var binVal = _val(prefix+'-bin');
                var gainVal= _val(prefix+'-gain');
                // Bias: exp è overhead calcolato (non aggiunge a integrazione)
                var expStr = isDark ? Math.round(exp)+'s' : _t('rpt_calib_overhead');
                var totStr = isDark ? _fmtSecs(count*Math.round(exp)) : '—';
                var name   = isDark ? _t('rpt_calib_dark') : _t('rpt_calib_bias');
                rows.push([name, count, expStr, gainVal||'--', '—', (binVal||'1')+'×'+(binVal||'1'), totStr]);
            });

            return {rows:rows, totalSecs:totalSecs, totalFrames:totalFrames};
        }

        // ════════════════════════════════════════════════════════════
        //  REPORT SINGOLA NOTTE
        // ════════════════════════════════════════════════════════════
        function generaReportNotte() {
            if (!targetSelezionato) { mostraAvviso(_t('rpt_alert_no_target'), 'warn'); return; }

            var isPro = document.getElementById('pro-view') &&
                        document.getElementById('pro-view').style.display !== 'none';
            var isM   = isPro
                ? document.getElementById('pro-sensor-type').value === 'mono'
                : document.getElementById('sensor-type').value === 'mono';

            // ── Dati ─────────────────────────────────────────────────
            var tName = targetSelezionato.name || 'Target';
            var tType = targetSelezionato.type || '--';
            var tMag  = targetSelezionato.mag  || '--';
            var tDist = targetSelezionato.dist || '--';
            var tSize = targetSelezionato.size ? targetSelezionato.size+"'" : '--';
            var raDeg  = (fovCenterOverride && fovCenterOverride.raDeg  != null) ? fovCenterOverride.raDeg  : targetSelezionato.ra*15;
            var decDeg = (fovCenterOverride && fovCenterOverride.decDeg != null) ? fovCenterOverride.decDeg : targetSelezionato.dec;
            var desc  = (typeof getLocalizedText==='function') ? getLocalizedText(targetSelezionato,'desc') : (targetSelezionato['desc_it']||'');
            var tips  = (typeof getLocalizedText==='function') ? getLocalizedText(targetSelezionato,'tips') : (targetSelezionato['tips_it']||'');

            var fl  = _val('focal-length'), ap = _val('aperture');
            var sw  = _val('sensor-width'), sh = _val('sensor-height'), ps = _val('pixel-size');
            var fNum = (parseFloat(fl)&&parseFloat(ap)) ? 'f/'+Math.round(parseFloat(fl)/parseFloat(ap)) : '--';
            var sTypeRaw = isPro ? document.getElementById('pro-sensor-type').value : document.getElementById('sensor-type').value;
            var sType = sTypeRaw==='mono' ? _t('rpt_val_mono') : _t('rpt_val_color');
            var modeEl = document.getElementById('capture-mode');
            var mode  = modeEl && modeEl.value==='mosaic' ? _t('rpt_val_mosaic') : _t('rpt_val_single');
            var sampRaw = _el('sampling-result');
            var binEl = document.querySelector('.bin-btn.bin-active');
            var binSel = binEl ? binEl.dataset.bin+'×'+binEl.dataset.bin : '1×1';
            var binN  = binEl ? parseInt(binEl.dataset.bin)||1 : 1;
            var fovRes = _el('fov-result');
            var rotVal = _val('fov-rotation'); var rotStr = (rotVal && rotVal !== '--') ? rotVal + '°' : '0°';

            var tS = _val('time-start'), tE = _val('time-end'), durStr = '--';
            try {
                var dS=new Date('1970-01-01T'+tS+':00'), dE=new Date('1970-01-01T'+tE+':00');
                if(dE<=dS) dE.setDate(dE.getDate()+1);
                durStr = _fmtSecs(Math.round((dE-dS)/1000));
            } catch(e){}

            var fd = _leggiFiltrirRows(isPro, isM);
            if (fd.totalFrames === 0) { document.getElementById('empty-seq-modal').style.display='block'; return; }

            // Analisi
            var samp = parseFloat(sampRaw)||0, sampBin = samp*binN;
            var qSampTxt, qSampType;
            if (sampBin < 0.67) { qSampTxt = _t('rpt_q_over');  qSampType = 'warn'; }
            else if (sampBin <= 2.0) { qSampTxt = _t('rpt_q_ideal'); qSampType = 'ok'; }
            else { qSampTxt = _t('rpt_q_under'); qSampType = 'warn'; }
            var totalH = (fd.totalSecs/3600).toFixed(1);
            var qIntTxt, qIntType;
            if (parseFloat(totalH)<2)  { qIntTxt = _t('rpt_q_int_low');  qIntType = 'bad'; }
            else if (parseFloat(totalH)<5) { qIntTxt = _t('rpt_q_int_good'); qIntType = 'ok'; }
            else { qIntTxt = _t('rpt_q_int_high'); qIntType = 'ok'; }

            var now = new Date().toLocaleString();

            // ── Build HTML ────────────────────────────────────────────
            var html = '<!DOCTYPE html><html lang="'+(typeof lang!=='undefined'?lang:'it')+'"><head>'
                + '<meta charset="UTF-8">'
                + '<meta name="viewport" content="width=device-width,initial-scale=1">'
                + '<title>'+_esc(_t('rpt_session_title'))+' — '+_esc(tName)+'</title>'
                + '<style>'+_css()+'</style></head><body><div class="page">';

            // Header
            html += '<div class="hdr">'
                + '<div class="hdr-left">'
                + '<img src="data:image/png;base64,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" alt="logo" class="logo-img">'
                + '<div class="logo">AstroDashboard <span>PRO</span></div>'
                + '<div class="subtitle">'+_esc(_t('rpt_session_title'))+'</div></div>'
                + '<div class="hdr-right"><div class="tgt-name">'+_esc(tName)+'</div>'
                + '<div class="tgt-sub">'+_esc(tType)+(tMag!=='--'?' &nbsp;·&nbsp; Mag. '+_esc(tMag):'')+'</div>'
                + '<div class="gen-date">'+_esc(_t('rpt_generated'))+' '+_esc(now)+'</div>'
                + '</div></div>';

            // Hero stats
            html += '<div class="hero">'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_int_net'))+'</div><div class="hs-value">'+_esc(_fmtSecs(fd.totalSecs))+'</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_frames'))+'</div><div class="hs-value">'+_esc(fd.totalFrames+' '+_t('rpt_frames_unit'))+'</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_duration'))+'</div><div class="hs-value">'+_esc(durStr)+'</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_fov'))+'</div><div class="hs-value">'+_esc(fovRes)+'</div></div>'
                + '</div>';

            html += '<div class="content">';

            // SEZ 1 — TARGET
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_target'));
            html += _grid([
                {label:_t('rpt_label_type'),  value:tType},
                {label:_t('rpt_label_mag'),   value:tMag},
                {label:_t('rpt_label_dist'),  value:tDist},
                {label:_t('rpt_label_size'),  value:tSize},
                {label:'AR',                  value:_raStr(raDeg)},
                {label:'DEC',                 value:_decStr(decDeg)},
            ], 2);
            if (desc && desc!=='--') html += '<div class="desc-text">'+_esc(desc)+'</div>';
            html += _tipBox(tips!=='--'?tips:'');
            html += '</div>';

            // SEZ 2 — SETUP OTTICO
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_optics'));
            html += _grid([
                {label:_t('rpt_label_focal'),        value:fl+' mm'},
                {label:_t('rpt_label_diameter'),     value:ap+' mm ('+fNum+')'},
                {label:_t('rpt_label_sensorw'),      value:sw+' mm'},
                {label:_t('rpt_label_sensorh'),      value:sh+' mm'},
                {label:_t('rpt_label_pixel'),        value:ps+' µm'},
                {label:_t('rpt_label_mode'),         value:mode},
                {label:_t('rpt_label_samp_native'),  value:sampRaw},
                {label:_t('rpt_label_bin'),          value:binSel},
                {label:_t('rpt_label_fov'),          value:fovRes},
                {label:_t('rpt_label_rotation'),     value:rotStr},
                {label:_t('rpt_label_sensor_type'),  value:sType},
            ], 2);
            html += '</div>';

            // SEZ 3 — EFFEMERIDI
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_ephemeris'));
            html += _grid([
                {label:_t('rpt_label_sunset'),     value:_el('info-sunset')},
                {label:_t('rpt_label_nightstart'), value:_el('info-nightstart')},
                {label:_t('rpt_label_flip'),       value:_el('info-meridianflip')},
                {label:_t('rpt_label_nightend'),   value:_el('info-nightend')},
                {label:_t('rpt_label_sunrise'),    value:_el('info-sunrise')},
                {label:_t('rpt_label_window'),     value:tS+' – '+tE},
            ], 2);
            html += '</div>';

            // SEZ 4 — PROGRAMMAZIONE
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_program'));
            html += _grid([
                {label:_t('rpt_label_start'),    value:tS},
                {label:_t('rpt_label_end'),      value:tE},
                {label:_t('rpt_label_duration'), value:durStr},
            ], 3);
            var _ftableHtml = _filterTable(fd.rows);
            html += _ftableHtml + _hdrFootnote();
            html += _totRow(fd.totalFrames, fd.totalSecs);
            html += '</div>';

            // SEZ 5 — ANALISI STRATEGICA
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_analysis'));
            html += _grid([
                {label:_t('rpt_label_samp_native')+' (BIN '+binSel+')', value: (sampBin.toFixed(2)+' arcsec/px')},
                {label:_t('rpt_label_int_net'),  value: (_fmtSecs(fd.totalSecs)+' ('+totalH+'h)')},
                {label:_t('rpt_label_sensor'),   value: sType},
                {label:_t('rpt_label_context'),  value: isPro ? _t('rpt_val_pro') : _t('rpt_val_smart')},
            ], 2);
            html += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">'
                + '<div>'+_badge(qSampTxt, qSampType)+'</div>'
                + '<div>'+_badge(qIntTxt, qIntType)+'</div>'
                + '</div>';
            html += '</div>';

            html += '</div>'; // content

            // Footer
            html += '<div class="footer"><span>AstroDashboard PRO</span><span>'+_esc(tName)+'</span><span>'+_esc(now)+'</span></div>';
            html += '</div></body></html>';

            var fname = (targetSelezionato.name||'target').replace(/[^a-zA-Z0-9_\-]/g,'_');
            _downloadHTML(html, 'AstroDashboard_'+fname+'_report.html');
        }

        // ════════════════════════════════════════════════════════════
        //  REPORT MULTI-NOTTE
        // ════════════════════════════════════════════════════════════
        function generaReportMultiNotte() {
            if (!targetSelezionato) { mostraAvviso(_t('rpt_alert_no_target'), 'warn'); return; }

            var isM = document.getElementById('sensor-type').value === 'mono';
            var possibili = isM ? ['m-l','m-r','m-g','m-b','m-ha','m-oiii','m-sii'] : ['c-light'];
            var binEl2 = document.querySelector('.bin-btn.bin-active');
            var binSel2 = binEl2 ? binEl2.dataset.bin+'×'+binEl2.dataset.bin : '1×1';
            var binN2   = binEl2 ? parseInt(binEl2.dataset.bin)||1 : 1;

            // Raccoglie dati notti
            var nightsData = [];
            for (var n=1; n<=contatoreNotti; n++) {
                var oreEl = document.getElementById('ore-mn-'+n);
                if (!oreEl) continue;
                var filtri = [];
                possibili.forEach(function(pid){
                    var chk = document.getElementById('chk-mn-'+n+'-'+pid);
                    if (!chk||!chk.checked) return;
                    var count = parseInt(document.getElementById('count-mn-'+n+'-'+pid).value)||0;
                    var exp   = parseInt(document.getElementById('exp-mn-'+n+'-'+pid).value)||0;
                    if (count<=0) return;
                    var name = pid.replace('m-','').replace('c-','').toUpperCase();
                    if (name==='HA') name='Ha'; if (name==='LIGHT') name='Light';
                    filtri.push({name:name, count:count, exp:exp, tot:count*exp});
                });
                nightsData.push({id:n, start:_val('start-mn-'+n), end:_val('end-mn-'+n), ore:oreEl.value, filtri:filtri});
            }
            if (!nightsData.length) { mostraAvviso(_t('rpt_alert_no_nights'), 'warn'); return; }

            var tName = targetSelezionato.name || 'Target';
            var tType = targetSelezionato.type || '--';
            var tMag  = targetSelezionato.mag  || '--';
            var tDist = targetSelezionato.dist || '--';
            var tSize = targetSelezionato.size ? targetSelezionato.size+"'" : '--';
            var raDeg2  = (fovCenterOverride && fovCenterOverride.raDeg  != null) ? fovCenterOverride.raDeg  : targetSelezionato.ra*15;
            var decDeg2 = (fovCenterOverride && fovCenterOverride.decDeg != null) ? fovCenterOverride.decDeg : targetSelezionato.dec;
            var desc2 = (typeof getLocalizedText==='function') ? getLocalizedText(targetSelezionato,'desc') : (targetSelezionato['desc_it']||'');
            var tips2 = (typeof getLocalizedText==='function') ? getLocalizedText(targetSelezionato,'tips') : (targetSelezionato['tips_it']||'');

            var fl2=_val('focal-length'), ap2=_val('aperture');
            var sw2=_val('sensor-width'), sh2=_val('sensor-height'), ps2=_val('pixel-size');
            var fNum2 = (parseFloat(fl2)&&parseFloat(ap2)) ? 'f/'+Math.round(parseFloat(fl2)/parseFloat(ap2)) : '--';
            var sType2 = document.getElementById('sensor-type').value==='mono' ? _t('rpt_val_mono') : _t('rpt_val_color');
            var sampRaw2 = _el('sampling-result');
            var fovRes2  = _el('fov-result');
            var rotVal2  = _val('fov-rotation'); var rotStr2 = (rotVal2 && rotVal2 !== '--') ? rotVal2 + '°' : '0°';

            // Totali progetto
            var totSecsAll=0, totFramesAll=0, filterTotals={};
            nightsData.forEach(function(nd){
                nd.filtri.forEach(function(f){
                    totSecsAll+=f.tot; totFramesAll+=f.count;
                    if (!filterTotals[f.name]) filterTotals[f.name]={count:0,secs:0,exp:f.exp};
                    filterTotals[f.name].count+=f.count;
                    filterTotals[f.name].secs+=f.tot;
                });
            });
            if (totFramesAll === 0) { document.getElementById('empty-seq-modal').style.display='block'; return; }

            var samp2 = parseFloat(sampRaw2)||0, sampBin2 = samp2*binN2;
            var qSampTxt2, qSampType2;
            if (sampBin2<0.67)     { qSampTxt2=_t('rpt_q_over_s');  qSampType2='warn'; }
            else if (sampBin2<=2.0){ qSampTxt2=_t('rpt_q_ideal_s'); qSampType2='ok'; }
            else                   { qSampTxt2=_t('rpt_q_under_s'); qSampType2='warn'; }
            var totalH2 = (totSecsAll/3600).toFixed(1);
            var qIntTxt2, qIntType2;
            if (parseFloat(totalH2)<2)  { qIntTxt2=_t('rpt_q_int_low_s');  qIntType2='bad'; }
            else if (parseFloat(totalH2)<5){ qIntTxt2=_t('rpt_q_int_good_s'); qIntType2='ok'; }
            else                        { qIntTxt2=_t('rpt_q_int_high_s'); qIntType2='ok'; }

            var now2 = new Date().toLocaleString();

            // ── Build HTML ────────────────────────────────────────────
            var html = '<!DOCTYPE html><html lang="'+(typeof lang!=='undefined'?lang:'it')+'"><head>'
                + '<meta charset="UTF-8">'
                + '<meta name="viewport" content="width=device-width,initial-scale=1">'
                + '<title>'+_esc(_t('rpt_mn_title'))+' — '+_esc(tName)+'</title>'
                + '<style>'+_css()+'</style></head><body><div class="page">';

            // Header
            html += '<div class="hdr">'
                + '<div class="hdr-left">'
                + '<img src="data:image/png;base64,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" alt="logo" class="logo-img">'
                + '<div class="logo">AstroDashboard <span>PRO</span></div>'
                + '<div class="subtitle">'+_esc(_t('rpt_mn_title'))+' — '+nightsData.length+' '+_esc(_t('rpt_nights_lbl'))+'</div></div>'
                + '<div class="hdr-right"><div class="tgt-name">'+_esc(tName)+'</div>'
                + '<div class="tgt-sub">'+_esc(tType)+(tMag!=='--'?' &nbsp;·&nbsp; Mag. '+_esc(tMag):'')+'</div>'
                + '<div class="gen-date">'+_esc(_t('rpt_generated'))+' '+_esc(now2)+'</div>'
                + '</div></div>';

            // Hero stats
            html += '<div class="hero">'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_int_total'))+'</div><div class="hs-value">'+_esc(_fmtSecs(totSecsAll))+' ('+_esc(totalH2)+'h)</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_frames'))+'</div><div class="hs-value">'+_esc(totFramesAll+' '+_t('rpt_frames_unit'))+'</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_nights'))+'</div><div class="hs-value">'+nightsData.length+'</div></div>'
                + '<div class="hero-stat"><div class="hs-label">'+_esc(_t('rpt_label_fov'))+'</div><div class="hs-value">'+_esc(fovRes2)+'</div></div>'
                + '</div>';

            html += '<div class="content">';

            // SEZ 1 — TARGET
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_target'));
            html += _grid([
                {label:_t('rpt_label_type'), value:tType},
                {label:_t('rpt_label_mag'),  value:tMag},
                {label:_t('rpt_label_dist'), value:tDist},
                {label:_t('rpt_label_size'), value:tSize},
                {label:'AR',                 value:_raStr(raDeg2)},
                {label:'DEC',                value:_decStr(decDeg2)},
            ], 2);
            if (desc2&&desc2!=='--') html += '<div class="desc-text">'+_esc(desc2)+'</div>';
            html += _tipBox(tips2!=='--'?tips2:'');
            html += '</div>';

            // SEZ 2 — SETUP OTTICO
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_optics'));
            html += _grid([
                {label:_t('rpt_label_focal'),        value:fl2+' mm'},
                {label:_t('rpt_label_diameter'),     value:ap2+' mm ('+fNum2+')'},
                {label:_t('rpt_label_sensor_wh'),    value:sw2+' × '+sh2+' mm'},
                {label:_t('rpt_label_pixel'),        value:ps2+' µm'},
                {label:_t('rpt_label_samp'),         value:sampRaw2},
                {label:_t('rpt_label_bin_sensor'),   value:binSel2+' | '+sType2},
                {label:_t('rpt_label_fov'),          value:fovRes2},
                {label:_t('rpt_label_rotation'),     value:rotStr2},
            ], 2);
            html += '</div>';

            // SEZ 3 — RIEPILOGO PROGETTO
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_project'));
            html += _grid([
                {label:_t('rpt_label_nights'),    value:nightsData.length},
                {label:_t('rpt_label_tpt'),       value:_el('mn-target-hours')},
                {label:_t('rpt_label_frames'),    value:totFramesAll+' '+_t('rpt_frames_unit')},
                {label:_t('rpt_label_int_total'), value:_fmtSecs(totSecsAll)+' ('+totalH2+'h)'},
            ], 2);
            // Tabella riepilogativa per filtro
            var sumRows = Object.keys(filterTotals).map(function(name){
                var v=filterTotals[name];
                return [name, v.count, v.exp+'s', '--', '--', binSel2, _fmtSecs(v.secs)];
            });
            html += _filterTable(sumRows);
            html += '</div>';

            // SEZ 4 — DETTAGLIO NOTTI
            nightsData.forEach(function(notte){
                var durStr2='--';
                try {
                    var dS2=new Date('1970-01-01T'+notte.start+':00'), dE2=new Date('1970-01-01T'+notte.end+':00');
                    if(dE2<=dS2) dE2.setDate(dE2.getDate()+1);
                    durStr2 = _fmtSecs(Math.round((dE2-dS2)/1000));
                } catch(e){}
                var totNotte = notte.filtri.reduce(function(s,f){return s+f.tot;},0);
                var nightRows = notte.filtri.map(function(f){
                    return [f.name, f.count, f.exp+'s', '--', '--', binSel2, _fmtSecs(f.tot)];
                });
                html += '<div class="section">';
                html += '<div class="night-hdr">'
                    + '<div class="nh-title">#'+notte.id+' &nbsp; '+_esc(notte.start)+' – '+_esc(notte.end)+'&nbsp; ('+_esc(durStr2)+')</div>'
                    + '<div class="nh-int">'+_esc(_t('rpt_label_night_int'))+' '+_esc(_fmtSecs(totNotte))+'</div>'
                    + '</div>';
                html += _filterTable(nightRows);
                html += '</div>';
            });

            // SEZ 5 — ANALISI STRATEGICA
            html += '<div class="section">';
            html += _secTitle(_t('rpt_sec_analysis'));
            html += _grid([
                {label:_t('rpt_label_samp')+' (BIN '+binSel2+')', value:sampBin2.toFixed(2)+' arcsec/px'},
                {label:_t('rpt_label_int_total'),  value:_fmtSecs(totSecsAll)+' ('+totalH2+'h)'},
                {label:_t('rpt_label_sensor_type'),value:sType2},
                {label:_t('rpt_label_nights_vs'),  value:nightsData.length+' / '+nightsData.length},
            ], 2);
            html += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">'
                + '<div>'+_badge(qSampTxt2, qSampType2)+'</div>'
                + '<div>'+_badge(qIntTxt2, qIntType2)+'</div>'
                + '</div>';
            html += '</div>';

            html += '</div>'; // content
            html += '<div class="footer"><span>AstroDashboard PRO</span><span>'+_esc(tName)+'</span><span>'+_esc(now2)+'</span></div>';
            html += '</div></body></html>';

            var fname2 = (targetSelezionato.name||'target').replace(/[^a-zA-Z0-9_\-]/g,'_');
            _downloadHTML(html, 'AstroDashboard_'+fname2+'_multinotte.html');
        }        // ── CSS del report ────────────────────────────────────────
        function _css() {
            return `
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans CJK SC', sans-serif;
            background: #0d1117; color: #c9d1d9; font-size: 13px; line-height: 1.5;
        }
        .page {
            max-width: 820px; margin: 0 auto; background: #0d1117;
            border: 1px solid #21293a;
            box-shadow: 0 4px 32px rgba(0,0,0,0.7);
        }
        /* Header */
        .hdr {
            background: #161b22;
            padding: 22px 28px 18px;
            border-bottom: 2px solid rgba(196,154,60,0.4);
            display: flex; justify-content: space-between; align-items: center; gap: 16px;
        }
        .hdr-left { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
        .hdr-left .logo-img { width: 52px; height: 52px; object-fit: contain; border-radius: 0;
            mix-blend-mode: screen; }
        .hdr-left .logo {
            font-family: 'Audiowide', 'Segoe UI', sans-serif;
            font-size: 18px; font-weight: 400; color: #c9d1d9; letter-spacing: .5px;
        }
        .hdr-left .logo span { color: #c49a3c; }
        .hdr-left .subtitle { font-size: 11px; color: #6e7a8a; margin-top: 1px; }
        .hdr-right { text-align: right; flex-shrink: 0; }
        .hdr-right .tgt-name { font-size: 22px; font-weight: 700; color: #c9d1d9; }
        .hdr-right .tgt-sub  { font-size: 11px; color: #6e7a8a; margin-top: 3px; }
        .hdr-right .gen-date { font-size: 10px; color: #3d4852; margin-top: 5px; }
        /* Hero band */
        .hero {
            background: #161b22;
            padding: 14px 28px; border-bottom: 1px solid #21293a;
            display: flex; gap: 24px; flex-wrap: wrap;
        }
        .hero-stat { flex: 1; min-width: 110px; }
        .hero-stat .hs-label { font-size: 10px; color: #6e7a8a; text-transform: uppercase; letter-spacing: .6px; }
        .hero-stat .hs-value { font-size: 15px; font-weight: 700; color: #c49a3c; margin-top: 3px; }
        /* Sections */
        .content { padding: 24px 28px; }
        .section { margin-bottom: 24px; }
        .sec-title {
            font-size: 10px; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1.2px; color: #c49a3c; margin-bottom: 12px;
            padding: 6px 10px 6px 14px;
            background: rgba(196,154,60,0.06);
            border-left: 3px solid #c49a3c;
            border-radius: 0 4px 4px 0;
        }
        /* Grid */
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 24px; margin-bottom: 10px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px 24px; margin-bottom: 10px; }
        .grid1 { display: grid; grid-template-columns: 1fr; gap: 7px; margin-bottom: 10px; }
        .kv { display: flex; gap: 6px; align-items: baseline; }
        .kv .k { font-size: 11px; color: #6e7a8a; font-weight: 600; white-space: nowrap; }
        .kv .v { font-size: 12px; color: #c9d1d9; }
        /* Descrizione */
        .desc-text { font-size: 12px; color: #6e7a8a; font-style: italic; margin: 6px 0 10px; line-height: 1.6; }
        /* Box consiglio */
        .tip-box {
            background: rgba(196,154,60,0.06);
            border: 1px solid rgba(196,154,60,0.2);
            border-left: 3px solid #c49a3c;
            border-radius: 0 6px 6px 0;
            padding: 10px 14px; margin: 8px 0 12px;
        }
        .tip-box .tip-label { font-size: 10px; font-weight: 700; color: #c49a3c; text-transform: uppercase; letter-spacing: .6px; margin-bottom: 5px; }
        .tip-box .tip-text  { font-size: 12px; color: #c9d1d9; line-height: 1.6; }
        /* Tabella filtri */
        table.ftable { width: 100%; border-collapse: collapse; margin: 8px 0 10px; font-size: 12px; }
        table.ftable thead tr { background: #1c2230; }
        table.ftable thead th { padding: 8px 10px; text-align: center; font-size: 10px; font-weight: 700;
            color: #6e7a8a; text-transform: uppercase; letter-spacing: .8px; border-bottom: 1px solid #21293a; }
        table.ftable thead th:first-child { text-align: left; }
        table.ftable tbody td { padding: 7px 10px; text-align: center; border-bottom: 1px solid #21293a; color: #c9d1d9; }
        table.ftable tbody td:first-child { text-align: left; font-weight: 700; }
        table.ftable tbody tr:nth-child(even) { background: rgba(255,255,255,0.02); }
        table.ftable tbody tr:hover { background: rgba(196,154,60,0.04); }
        .fl-L    { color: #c9d1d9; } .fl-R    { color: #ff6644; }
        .fl-G    { color: #44ff88; } .fl-B    { color: #4488ff; }
        .fl-Ha   { color: #ff4444; } .fl-OIII { color: #00c6ff; }
        .fl-SII  { color: #c49a3c; } .fl-Light{ color: #c9d1d9; }
        /* Totale riga */
        .total-row {
            display: flex; gap: 24px; padding: 10px 14px;
            background: rgba(196,154,60,0.07);
            border: 1px solid rgba(196,154,60,0.2);
            border-radius: 6px; margin-top: 6px;
        }
        .total-row .tr-item { flex: 1; }
        .total-row .tr-label { font-size: 10px; color: #6e7a8a; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
        .total-row .tr-value { font-size: 15px; font-weight: 700; color: #c49a3c; margin-top: 2px; }
        /* Badge qualità */
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-ok   { background: rgba(74,138,111,0.15); color: #44ff88; border: 1px solid rgba(74,138,111,0.3); }
        .badge-warn { background: rgba(196,154,60,0.12); color: #c49a3c; border: 1px solid rgba(196,154,60,0.3); }
        .badge-bad  { background: rgba(138,74,74,0.15);  color: #ff6666; border: 1px solid rgba(138,74,74,0.3); }
        /* Notte separator */
        .night-hdr {
            background: rgba(196,154,60,0.05);
            border: 1px solid rgba(196,154,60,0.2);
            border-left: 3px solid #c49a3c;
            border-radius: 0 6px 6px 0;
            padding: 9px 14px; margin: 14px 0 8px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .night-hdr .nh-title { font-size: 12px; font-weight: 700; color: #c9d1d9; }
        .night-hdr .nh-int   { font-size: 11px; color: #c49a3c; font-weight: 600; }
        /* Divisore sezione */
        .section + .section { border-top: 1px solid #21293a; padding-top: 20px; }
        /* Footer */
        .footer {
            background: #161b22; border-top: 1px solid #21293a;
            padding: 10px 28px; display: flex; justify-content: space-between;
            font-size: 10px; color: #3d4852;
        }
        /* Print */
        @media print {
            body { background: #fff; color: #1c1c2a; }
            .page { box-shadow: none; border: none; background: #fff; }
            .hdr { background: #1a1a2e; }
            .hero { background: #1a1a2e; }
            .tip-box { break-inside: avoid; }
            table.ftable { break-inside: avoid; }
        }
        @page { margin: 15mm; }
        `;
        }
