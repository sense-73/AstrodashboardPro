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

        // ── CSS del report ────────────────────────────────────────────
        function _css() {
            return `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans CJK SC', 'Source Han Sans CN', sans-serif;
            background: #f0f0f8; color: #1c1c2a; font-size: 13px; line-height: 1.5;
        }
        .page {
            max-width: 820px; margin: 0 auto; background: #fff;
            box-shadow: 0 2px 20px rgba(0,0,0,0.12);
        }
        /* Header */
        .hdr {
            background: #161628; padding: 22px 28px 14px;
            border-bottom: 3px solid #7850dc;
            display: flex; justify-content: space-between; align-items: flex-end;
        }
        .hdr-left .logo { font-size: 17px; font-weight: 700; color: #fff; letter-spacing: .5px; }
        .hdr-left .subtitle { font-size: 11px; color: #b4b4d2; margin-top: 3px; }
        .hdr-right { text-align: right; }
        .hdr-right .tgt-name { font-size: 22px; font-weight: 700; color: #fff; }
        .hdr-right .tgt-sub  { font-size: 11px; color: #c8c8e6; margin-top: 2px; }
        .hdr-right .gen-date { font-size: 10px; color: #8888aa; margin-top: 4px; }
        /* Hero band */
        .hero {
            background: linear-gradient(135deg,#1a1a35,#2a1a50);
            padding: 16px 28px; border-bottom: 1px solid #2e2e50;
            display: flex; gap: 24px; flex-wrap: wrap;
        }
        .hero-stat { flex: 1; min-width: 110px; }
        .hero-stat .hs-label { font-size: 10px; color: #9090b8; text-transform: uppercase; letter-spacing: .6px; }
        .hero-stat .hs-value { font-size: 14px; font-weight: 600; color: #e0d8ff; margin-top: 2px; }
        /* Sections */
        .content { padding: 24px 28px; }
        .section { margin-bottom: 22px; }
        .sec-title {
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            letter-spacing: .8px; color: #7850dc; margin-bottom: 10px;
            padding: 6px 10px 6px 14px;
            background: #f0eeff; border-left: 3px solid #7850dc;
            border-radius: 0 4px 4px 0;
        }
        /* Grid 2 colonne */
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 10px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px 20px; margin-bottom: 10px; }
        .grid1 { display: grid; grid-template-columns: 1fr; gap: 6px; margin-bottom: 10px; }
        .kv { display: flex; gap: 6px; align-items: baseline; }
        .kv .k { font-size: 11px; color: #707090; font-weight: 600; white-space: nowrap; }
        .kv .v { font-size: 12px; color: #1c1c2a; }
        /* Descrizione */
        .desc-text { font-size: 12px; color: #555570; font-style: italic; margin: 6px 0 10px; line-height: 1.6; }
        /* Box consiglio */
        .tip-box {
            background: #f5f0ff; border: 1px solid #c0a0ff;
            border-left: 4px solid #7850dc; border-radius: 4px;
            padding: 10px 14px; margin: 8px 0 12px;
        }
        .tip-box .tip-label { font-size: 10px; font-weight: 700; color: #7850dc; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .tip-box .tip-text  { font-size: 12px; color: #333; line-height: 1.6; }
        /* Tabella filtri */
        table.ftable { width: 100%; border-collapse: collapse; margin: 8px 0 10px; font-size: 12px; }
        table.ftable thead tr { background: #161628; color: #fff; }
        table.ftable thead th { padding: 7px 10px; text-align: center; font-size: 11px; font-weight: 600; }
        table.ftable thead th:first-child { text-align: left; }
        table.ftable tbody td { padding: 6px 10px; text-align: center; border-bottom: 1px solid #e8e8f4; }
        table.ftable tbody td:first-child { text-align: left; font-weight: 700; }
        table.ftable tbody tr:nth-child(even) { background: #f7f7fe; }
        .fl-L    { color: #555; } .fl-R    { color: #be2323; }
        .fl-G    { color: #229622; } .fl-B  { color: #1e5ac8; }
        .fl-Ha   { color: #c83700; } .fl-OIII { color: #0082aa; }
        .fl-SII  { color: #964b00; } .fl-Light{ color: #5050b4; }
        /* Totale riga */
        .total-row { display: flex; gap: 24px; padding: 8px 10px; background: #f0eeff; border-radius: 4px; margin-top: 4px; }
        .total-row .tr-item { flex: 1; }
        .total-row .tr-label { font-size: 10px; color: #7070a0; font-weight: 600; }
        .total-row .tr-value { font-size: 14px; font-weight: 700; color: #5030a0; }
        /* Badge qualità */
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
        .badge-ok   { background: #e0f7e0; color: #1a7a1a; }
        .badge-warn { background: #fff3cd; color: #856404; }
        .badge-bad  { background: #fde8e8; color: #aa1a1a; }
        /* Notte separator */
        .night-hdr {
            background: #f8f6ff; border: 1px solid #d8d0f8;
            border-left: 4px solid #9870f0; border-radius: 4px;
            padding: 8px 14px; margin: 14px 0 8px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .night-hdr .nh-title { font-size: 12px; font-weight: 700; color: #5030a0; }
        .night-hdr .nh-int   { font-size: 11px; color: #7850dc; font-weight: 600; }
        /* Footer */
        .footer {
            background: #f4f4f8; border-top: 1px solid #ddd;
            padding: 10px 28px; display: flex; justify-content: space-between;
            font-size: 10px; color: #9090b0;
        }
        /* Print */
        @media print {
            body { background: #fff; }
            .page { box-shadow: none; }
            .tip-box { break-inside: avoid; }
            table.ftable { break-inside: avoid; }
        }
        @page { margin: 15mm; }
        `;
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

        // ── Legge filtri dal DOM ──────────────────────────────────────
        function _leggiFiltrirRows(isPro, isM) {
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
            if (!targetSelezionato) { alert(_t('rpt_alert_no_target')); return; }

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
                + '<div class="hdr-left"><div class="logo">AstroDashboard PRO</div>'
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
            html += _filterTable(fd.rows);
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
            if (!targetSelezionato) { alert(_t('rpt_alert_no_target')); return; }

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
            if (!nightsData.length) { alert(_t('rpt_alert_no_nights')); return; }

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
                + '<div class="hdr-left"><div class="logo">AstroDashboard PRO</div>'
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
        }
