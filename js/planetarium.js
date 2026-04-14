// planetarium.js — Planetario ibrido, SIMBAD, sistema solare, card target
// ============================================================

        function cambiaOraAstro() {
            let step = parseInt(document.getElementById('astroSlider').value);
            let dOra;
            if (!isSessionDateToday()) {
                // Data futura: ignora datiMeteo (che contiene oggi) e costruisce l'ora dalla data sessione
                let base = getSessionDate();
                base.setHours(18, 0, 0, 0);
                base = new Date(base.getTime() + step * 3600000);
                dOra = base;
            } else if (datiMeteo && datiMeteo.time && datiMeteo.time[indicePartenza + step]) {
                dOra = new Date(datiMeteo.time[indicePartenza + step]);
            } else {
                let base = new Date();
                base.setHours(18, 0, 0, 0);
                dOra = new Date(base.getTime() + step * 3600000);
            }
            let _dispOra;
            if (isSessionDateToday() && step === 0) {
                _dispOra = t("now") + " (" + new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}) + ")";
            } else {
                _dispOra = dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
            }
            document.getElementById('astro-time-display').innerHTML = "<svg width=\"22\" height=\"22\" style=\"display:inline-block;vertical-align:middle;flex-shrink:0\" stroke=\"currentColor\" fill=\"none\"><use href=\"#i-eye-spark\"/></svg> " + _dispOra;
            
            let pL = document.getElementById('planets-list'), dL = document.getElementById('dso-list'); pL.innerHTML = ''; dL.innerHTML = '';
            if (SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI) > -6) { pL.innerHTML = dL.innerHTML = `<p style="color:#aaa; padding:10px;">${t("too_bright")}</p>`; return; }

            let vP = [], mP = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente), mA = mP.altitude * (180/Math.PI);
            if (mA > 5) vP.push({ html: creaCardHTML({id: "moon", name: "moon", icon: "🌕"}, mA, (mP.azimuth * 180/Math.PI + 180) % 360, false), alt: mA });
            getPlanetDatabase(dOra).forEach(p => { let pos = calcolaAltAz(p.ra, p.dec, latCorrente, lonCorrente, dOra); if (pos.alt > 10) vP.push({ html: creaCardHTML(p, pos.alt, pos.az, false), alt: pos.alt }); });
            vP.sort((a, b) => b.alt - a.alt).forEach(i => pL.appendChild(i.html));

            let vD = [];
            if (typeof dsoDatabase !== 'undefined') dsoDatabase.forEach(d => { let pos = calcolaAltAz(d.ra, d.dec, latCorrente, lonCorrente, dOra); if (pos.alt > 15) vD.push({ html: creaCardHTML(d, pos.alt, pos.az, true), alt: pos.alt }); });
            vD.sort((a, b) => b.alt - a.alt); if (vD.length > 0) vD[0].html.classList.add('top-target');
            vD.forEach(i => dL.appendChild(i.html));
            if (dL.innerHTML === '') dL.innerHTML = `<p style="color:#777; padding:10px;">${t("no_target")}</p>`;
        }

        function mapTypeTrans(type) { 
            if (!type) return t("unknown");
            let l = type.toLowerCase();
            
            let dict = {
                it: { "spi": "Galassia a Spirale", "ell": "Galassia Ellittica", "len": "Galassia Lenticolare", "irr": "Galassia Irregolare", "starb": "Galassia Starburst", "ammg": "Ammasso di Galassie", "grup": "Gruppo di Galassie", "emi": "Nebulosa a Emissione", "rif": "Nebulosa a Riflessione", "osc": "Nebulosa Oscura", "pla": "Nebulosa Planetaria", "sup": "Resto di Supernova", "hii": "Regione H II", "mis": "Nebulosa Mista", "glo": "Ammasso Globulare", "ape": "Ammasso Aperto" },
                en: { "spi": "Spiral Galaxy", "ell": "Elliptical Galaxy", "len": "Lenticular Galaxy", "irr": "Irregular Galaxy", "starb": "Starburst Galaxy", "ammg": "Galaxy Cluster", "grup": "Galaxy Group", "emi": "Emission Nebula", "rif": "Reflection Nebula", "osc": "Dark Nebula", "pla": "Planetary Nebula", "sup": "Supernova Remnant", "hii": "H II Region", "mis": "Mixed Nebula", "glo": "Globular Cluster", "ape": "Open Cluster" },
                es: { "spi": "Galaxia Espiral", "ell": "Galaxia Elíptica", "len": "Galaxia Lenticular", "irr": "Galaxia Irregular", "starb": "Galaxia Starburst", "ammg": "Cúmulo de Galaxias", "grup": "Grupo de Galaxias", "emi": "Nebulosa de Emisión", "rif": "Nebulosa de Reflexión", "osc": "Nebulosa Oscura", "pla": "Nebulosa Planetaria", "sup": "Remanente de Supernova", "hii": "Región H II", "mis": "Nebulosa Mixta", "glo": "Cúmulo Globular", "ape": "Cúmulo Abierto" },
                zh: { "spi": "螺旋星系", "ell": "椭圆星系", "len": "透镜状星系", "irr": "不规则星系", "starb": "星暴星系", "ammg": "星系团", "grup": "星系群", "emi": "发射星云", "rif": "反射星云", "osc": "暗星云", "pla": "行星状星云", "sup": "超新星遗迹", "hii": "H II 区", "mis": "混合星云", "glo": "球状星团", "ape": "疏散星团" }
            };

            let m = dict[lang] || dict['en'];
            if(l.includes("spirale")) return m["spi"];
            if(l.includes("ellittica")) return m["ell"];
            if(l.includes("lenticolare")) return m["len"];
            if(l.includes("irregolare")) return m["irr"];
            if(l.includes("starburst")) return m["starb"];
            if(l.includes("ammasso di galassie")) return m["ammg"];
            if(l.includes("gruppo")) return m["grup"];
            if(l.includes("emissione")) return m["emi"];
            if(l.includes("riflessione")) return m["rif"];
            if(l.includes("oscura")) return m["osc"];
            if(l.includes("planetaria")) return m["pla"];
            if(l.includes("supernova")) return m["sup"];
            if(l.includes("h ii")) return m["hii"];
            if(l.includes("mista")) return m["mis"];
            if(l.includes("globulare")) return m["glo"];
            if(l.includes("aperto")) return m["ape"];
            
            if(l.includes("galassi") || l.includes("galaxy")) return t("galaxy");
            if(l.includes("nebulos") || l.includes("nebula")) return t("nebula");
            if(l.includes("ammasso") || l.includes("cluster")) return t("cluster");
            if(l.includes("stella") || l.includes("star")) return t("star");
            return type; 
        }

        function getLocalizedName(obj) {
            if (!obj) return "";
            let checkName = obj.id || obj.name;
            if (checkName === "jupiter" || checkName === "mars" || checkName === "venus" || checkName === "moon" ||
                checkName === "mercury" || checkName === "saturn" || checkName === "uranus" || checkName === "neptune") {
                return t(checkName);
            }
            if (obj[lang]) return `${obj.name} - ${obj[lang]}`;
            if (obj['en']) return `${obj.name} - ${obj['en']}`;
            return obj.name; 
        }

        // Funzione per pescare il testo giusto (Descrizione o Tips)
        function getLocalizedText(obj, key) {
            if (!obj) return "--";
            if (obj[key + '_' + lang]) return obj[key + '_' + lang];
            return obj[key] || "--"; // Fallback di sicurezza per la Ricerca Libera
        }

        function creaCardHTML(tObj, alt, az, c) {
            const div = document.createElement('div');
            div.className = c ? 'dso-card card-clickable' : 'dso-card card-static';
            const finalName = getLocalizedName(tObj);
            const imgPath   = (typeof dsoImgMap !== 'undefined') ? (dsoImgMap[tObj.id] || null) : null;
            const altClass  = alt >= 50 ? 'alt-high' : alt >= 30 ? 'alt-mid' : 'alt-low';

            // ── Wrap immagine ──────────────────────────────────────
            const wrap = document.createElement('div');
            wrap.className = 'dso-icon-img';

            let imgEl = null;
            if (imgPath) {
                imgEl = document.createElement('img');
                imgEl.src     = imgPath;
                imgEl.alt     = tObj.name;
                imgEl.loading = 'lazy';
                imgEl.onerror = () => {
                    const sp = document.createElement('span');
                    sp.style.fontSize = '2em';
                    sp.textContent = tObj.icon;
                    if (imgEl.parentNode) imgEl.parentNode.replaceChild(sp, imgEl);
                    imgEl = null;
                };
                wrap.appendChild(imgEl);
            } else {
                const sp = document.createElement('span');
                sp.style.fontSize = '2em';
                sp.textContent = tObj.icon;
                wrap.appendChild(sp);
            }

            // ── Bottone upload ────────────────────────────────────
            const uploadBtn = document.createElement('button');
            uploadBtn.className = 'dso-upload-btn';
            uploadBtn.title     = 'Carica la tua foto';
            uploadBtn.innerHTML = (typeof _ICON_CAM_UP !== 'undefined') ? _ICON_CAM_UP : '📷';
            uploadBtn.onclick   = e => { e.stopPropagation(); dsoUploadFoto(tObj, wrap, imgEl); };
            wrap.appendChild(uploadBtn);

            // ── Bottone elimina foto utente ───────────────────────
            const delBtn = document.createElement('button');
            delBtn.className    = 'dso-delete-btn';
            delBtn.title        = 'Rimuovi foto personale';
            delBtn.textContent  = '✕';
            // display gestito interamente da CSS (.dso-card:hover .dso-icon-img.has-user-img .dso-delete-btn)
            delBtn.onclick = e => { e.stopPropagation(); dsoDeleteFoto(tObj, wrap, imgEl, imgPath); };
            wrap.appendChild(delBtn);

            div.appendChild(wrap);

            // ── Info testo ─────────────────────────────────────────
            const info = document.createElement('div');
            info.className = 'dso-info';
            info.innerHTML = `<h4 title="${finalName}">${finalName}</h4><p>Alt: <b>${Math.round(alt)}°</b></p><span class="dso-direction ${altClass}">${getPuntoCardinale(az)}</span>`;
            div.appendChild(info);

            if (c) {
                // Singolo click → pianificazione (desktop e touch)
                div.onclick = (e) => {
                    if (_longPressActivated) { _longPressActivated = false; return; }
                    apriPianificazione(tObj);
                };

                // ── DESKTOP: hover apre galleria dopo 400ms (ignorato su touch) ──
                div.addEventListener('mouseenter', () => {
                    if (_isTouchDevice()) return;
                    clearTimeout(_dsoCloseTimer);
                    clearTimeout(_dsoOpenTimer);
                    if (_dsoGalleryVisible) { chiudiGalleriaDso(); apriGalleriaDso(tObj, div); }
                    else { _dsoOpenTimer = setTimeout(() => apriGalleriaDso(tObj, div), 400); }
                });
                div.addEventListener('mouseleave', () => {
                    if (_isTouchDevice()) return;
                    clearTimeout(_dsoOpenTimer);
                    _dsoCloseTimer = setTimeout(() => chiudiGalleriaDso(), 300);
                });

                // ── MOBILE: long press (500ms) apre galleria, click singolo pianifica ──
                let _lpTimer = null;
                div.addEventListener('touchstart', (e) => {
                    _longPressActivated = false;
                    _lpTimer = setTimeout(() => {
                        _longPressActivated = true;
                        apriGalleriaDso(tObj, div);
                        // Vibrazione feedback se disponibile
                        if (navigator.vibrate) navigator.vibrate(40);
                    }, 500);
                }, { passive: true });
                div.addEventListener('touchend',   () => clearTimeout(_lpTimer));
                div.addEventListener('touchmove',  () => clearTimeout(_lpTimer));
                div.addEventListener('touchcancel',() => clearTimeout(_lpTimer));
            }

            // ── Controlla IndexedDB: foto utente ha priorità massima ──
            if (typeof UserImgDB !== 'undefined' && tObj.id) {
                UserImgDB.get(tObj.id).then(dataUrl => {
                    if (dataUrl) _dsoApplyUserImg(imgEl, wrap, dataUrl, delBtn);
                });
            }

            return div;
        }

        function setupSearch(iId, sId) {
            let inp = document.getElementById(iId), box = document.getElementById(sId); if(!inp || !box) return;
            inp.addEventListener('input', () => {
                if (typeof dsoDatabase === 'undefined') return;
                let v = inp.value.trim().toLowerCase().replace(/\s+/g, ''); box.innerHTML = '';
                if (!v) { box.style.display = 'none'; return; }
                let m = dsoDatabase.filter(d => d.id.toLowerCase().includes(v) || d.name.toLowerCase().replace(/\s+/g, '').includes(v) || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '').includes(v)));
                if (m.length > 0) { box.style.display = 'block'; m.forEach(x => { let li = document.createElement('li'); let _tipo = x.type ? `<span style="color:#6e7a8a; font-size:0.82em; margin-left:6px;">${x.type}</span>` : ''; li.innerHTML = `${getLocalizedName(x)}${_tipo}`; li.onclick = () => { inp.value = getLocalizedName(x); box.style.display = 'none'; apriPianificazione(x); }; box.appendChild(li); }); } else box.style.display = 'none';
            });
            inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); box.style.display = 'none'; eseguiRicerca(iId); } });
            document.addEventListener('click', e => { if (e.target !== inp) box.style.display = 'none'; });
        }
        setupSearch('search-dash-input', 'sugg-dash'); setupSearch('search-plan-input', 'sugg-plan');

        function eseguiRicerca(iId) {
            if (typeof dsoDatabase === 'undefined') return;
            let inp = document.getElementById(iId), rawQ = inp.value.trim(); if (!rawQ) return;
            
            // --- NORMALIZZATORE CATALOGHI (AIUTA SIMBAD A CAPIRE I FORMATI) ---
            let q = rawQ;
            // Normalizzazione Messier: M43 → "Messier 43" per Wikidata (evita ambiguità con strade ecc.)
            let _isMessier = /^m\s*(\d+)$/i.test(q.trim());
            let _messierWdQuery = null; // query alternativa per Wikidata se è un oggetto Messier
            if (_isMessier) {
                let _mn = q.trim().replace(/^m\s*/i, '');
                _messierWdQuery = "Messier " + _mn; // es. "Messier 43" — non ambiguo su Wikidata
                q = "M " + _mn; // formato SIMBAD
            }
            else if (/^sh\s*2[-\s]*(\d+)$/i.test(q)) q = q.replace(/^sh\s*2[-\s]*(\d+)$/i, "Sh2-$1");
            else if (/^vdb[-\s]*(\d+)$/i.test(q)) q = q.replace(/^vdb[-\s]*(\d+)$/i, "VdB $1");
            else if (/^(lbn|ldn)[-\s]*(\d+)$/i.test(q)) q = q.replace(/^(lbn|ldn)[-\s]*(\d+)$/i, (m, p1, p2) => p1.toUpperCase() + " " + p2);
            else if (/^(ngc|ic)[-\s]*(\d+)$/i.test(q)) q = q.replace(/^(ngc|ic)[-\s]*(\d+)$/i, (m, p1, p2) => p1.toUpperCase() + " " + p2);

            let qn = q.toLowerCase().replace(/\s+/g, '').replace(/-/g, ''), st = document.getElementById('status-' + iId);
            if(st) st.style.display = 'none';

            let ex = dsoDatabase.find(d => d.id.toLowerCase() === qn || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '') === qn));
            let pt = dsoDatabase.find(d => d.name.toLowerCase().replace(/\s+/g, '').includes(qn) || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '').includes(qn)));
            
            if (ex) { inp.value = getLocalizedName(ex); apriPianificazione(ex); return; } 
            if (pt) { inp.value = getLocalizedName(pt); apriPianificazione(pt); return; }

            if(st) { st.style.display = 'block'; st.style.color = '#ffaa00'; st.innerText = "SIMBAD Search..."; }
            fetch(`https://cds.unistra.fr/cgi-bin/nph-sesame/-oI/A?${encodeURIComponent(q)}`).then(r => r.text()).then(d => {
                let lines = d.split('\n'), fc = false, ra, dec, ty = "", rawType = "", mg = "N/D", dist = "N/D";

                    // Heuristic: tipo noto per catalogo anche prima di leggere %T
                    if (/^sh\s*2[-\s]*\d+$/i.test(q))        ty = "Regione H II";
                    else if (/^(lbn)\s*\d+$/i.test(q))       ty = "Nebulosa a Emissione";
                    else if (/^(ldn)\s*\d+$/i.test(q))       ty = "Nebulosa Oscura";
                    else if (/^(vdb)\s*\d+$/i.test(q))       ty = "Nebulosa a Riflessione";
                    else if (/^(pgc|ugc)\s*\d+$/i.test(q))   ty = "Galassia a Spirale";
                    else if (/^(pal|ngc\s*\d.*globular)/i.test(q)) ty = "Ammasso Globulare";
                for(let i=0; i<lines.length; i++) {
                    let line = lines[i].trim();
                    if(line.startsWith('%J') && !fc) { let p = line.split(/\s+/); if(p.length >= 3) { ra = parseFloat(p[1]); dec = parseFloat(p[2]); fc = true; } }

                    if(line.startsWith('%T')) {
                        let rt = line.substring(2).trim();
                        rawType = rt; // salva sempre il tipo grezzo come fallback
                        let rl = rt.toLowerCase().replace(/[_\s]+/g,'');
                        // H II / Regioni di emissione (prima di tutto per evitare falsi match)
                        if (rl==='hii'||rl==='hiiregion'||rl==='hir'||rl==='isr'||rl==='ism'||rl==='sfr'||rl==='gne'||rl==='rn'||rl==='en'||rl==='hir'||rl==='sh2'||rt.toUpperCase()==='HII') ty = "Regione H II";
                        else if (rt.toLowerCase().includes('hii')||rt.toLowerCase().includes('h ii')||rt.toLowerCase().includes('h_ii')) ty = "Regione H II";
                        // Nebulose planetarie
                        else if (rl==='pn'||rl==='pne'||rl==='plnb'||rt.toLowerCase().includes('planetary')) ty = "Nebulosa Planetaria";
                        // Supernova
                        else if (rl==='snr'||rl==='sn'||rt.toLowerCase().includes('supernova')) ty = "Resto di Supernova";
                        // Ammassi globulari
                        else if (rl==='gc'||rl==='gcl'||rl==='glc'||rl==='glcl'||rt.toLowerCase().includes('globular')) ty = "Ammasso Globulare";
                        // Ammassi aperti
                        else if (rl==='oc'||rl==='ocl'||rl==='opc'||rl==='cl'||rl==='cl*'||rt.toLowerCase().includes('open cluster')) ty = "Ammasso Aperto";
                        // Nebulose a riflessione
                        else if (rl==='rne'||rl==='refn'||rt.toLowerCase().includes('reflection')) ty = "Nebulosa a Riflessione";
                        // Nebulose oscure
                        else if (rl==='dn'||rl==='dne'||rl==='dneb'||rt.toLowerCase().includes('dark')) ty = "Nebulosa Oscura";
                        // Resto nebulose/nubi
                        else if (rt.toLowerCase().includes('nebul')||rt.toLowerCase().includes('cloud')||rt.toLowerCase().includes('emission')||rl==='ene'||rl==='neb') ty = "Nebulosa a Emissione";
                        // Galassie
                        else if (rt.toLowerCase().includes('galax')||rt.toLowerCase().includes('galassi')||rl==='gal'||rl==='g'||rl==='ig'||rl==='ag'||rl==='seyfert') ty = "Galassia a Spirale";
                        // Stelle
                        else if (rt.toLowerCase().includes('star')||rl==='*'||rl==='v*'||rl==='**') ty = "Stella";
                        // Fallback: usa il codice grezzo tradotto se noto, altrimenti mostra il codice raw
                        else if (rawType) ty = rawType;
                    }

                    if(line.startsWith('%M')) {
                        let rt = line.substring(2).trim();
                        let match = rt.match(/([+\-]?\d+\.?\d*)/);
                        if (match && match[1]) { mg = parseFloat(match[1]).toFixed(1); }
                    }

                    // Distanza: linea %D (kpc) o commenti con "kpc","ly","pc"
                    if(line.startsWith('%D') && dist === "N/D") {
                        let dm = line.substring(2).trim().match(/([0-9]+\.?[0-9]*)\s*(kpc|pc|ly)?/i);
                        if(dm) { let v = parseFloat(dm[1]), u = (dm[2]||'kpc').toLowerCase(); dist = u==='kpc' ? Math.round(v*3260)+' a.l.' : u==='pc' ? Math.round(v*3.26)+' a.l.' : Math.round(v)+' a.l.'; }
                    }
                }

                if (!fc) { if(st) { st.style.color = '#ff4444'; st.innerText = "Not Found."; } }
                else {
                    // Se il parser non ha riconosciuto il tipo, usa il codice grezzo SIMBAD
                    if (!ty && rawType) ty = rawType;
                    if(st) st.innerText = "Database...";
                    let wLang = (lang === 'it' || lang === 'es' || lang === 'zh') ? lang : 'en';
                    let qClean = q.trim();

                    // Costruisce descrizione di fallback da dati SIMBAD
                    function _simbadDesc() {
                        let tyLabel = ty ? mapTypeTrans(ty) : null;
                        let dscBase = tyLabel
                            ? { it: `${qClean.toUpperCase()} è una ${tyLabel}.`, en: `${qClean.toUpperCase()} is a ${tyLabel}.`, es: `${qClean.toUpperCase()} es una ${tyLabel}.`, zh: `${qClean.toUpperCase()} 是一个${tyLabel}。` }
                            : { it: `${qClean.toUpperCase()} — oggetto astronomico.`, en: `${qClean.toUpperCase()} — astronomical object.`, es: `${qClean.toUpperCase()} — objeto astronómico.`, zh: `${qClean.toUpperCase()} — 天文天体。` };
                        let mgLine = mg !== "N/D" ? { it:` Magnitudine: ${mg}.`, en:` Magnitude: ${mg}.`, es:` Magnitud: ${mg}.`, zh:` 星等：${mg}。` } : {it:'',en:'',es:'',zh:''};
                        let dLine  = dist !== "N/D" ? { it:` Distanza stimata: ${dist}.`, en:` Estimated distance: ${dist}.`, es:` Distancia estimada: ${dist}.`, zh:` 估计距离：${dist}。` } : {it:'',en:'',es:'',zh:''};
                        let src    = { it:" (Fonte: SIMBAD / CDS Strasburgo)", en:" (Source: SIMBAD / CDS Strasbourg)", es:" (Fuente: SIMBAD / CDS Estrasburgo)", zh:" （数据来源：SIMBAD / CDS 斯特拉斯堡）" };
                        return (dscBase[wLang]||dscBase['en'])+(mgLine[wLang]||'')+(dLine[wLang]||'')+(src[wLang]||src['en']);
                    }

                    // Fetcha una pagina Wikipedia per titolo esatto → Promise({desc,link}|null)
                    function _wpExact(wl2, title) {
                        return fetch(`https://${wl2}.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(title)}&prop=extracts&exintro=1&explaintext=1&exchars=800`)
                            .then(r=>r.json()).then(wd=>{
                                if (!wd.query||!wd.query.pages) return null;
                                let pid = Object.keys(wd.query.pages)[0];
                                let pg = wd.query.pages[pid];
                                if (pid==="-1"||!pg.extract||pg.extract.length<50) return null;
                                return { desc: pg.extract, link: `https://${wl2}.wikipedia.org/?curid=${pid}` };
                            }).catch(()=>null);
                    }

                    // STEP 1 — Wikidata: cerca entità per nome e ottieni descrizione + sitelinks
                    // Per oggetti Messier usa "Messier N" per evitare ambiguità (es. M43 = autostrada ungherese)
                    let _wdSearchTerm = (_messierWdQuery) ? _messierWdQuery : qClean;
                    fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(_wdSearchTerm)}&language=en&type=item&format=json&origin=*&limit=5`)
                    .then(r=>r.json()).then(wd=>{
                        let entityId = null;
                        if (wd.search && wd.search.length > 0) {
                            // Per oggetti Messier: filtra entità astronomiche (nebula, galaxy, cluster, star)
                            if (_messierWdQuery) {
                                let astroKeywords = ['nebul','galaxy','galax','cluster','star','nebula','astronomic','messier','ngc'];
                                for (let e of wd.search) {
                                    let desc = ((e.description||'') + ' ' + (e.label||'')).toLowerCase();
                                    if (astroKeywords.some(k => desc.includes(k))) { entityId = e.id; break; }
                                }
                            }
                            // Fallback: prima entità con label corrispondente
                            if (!entityId) {
                                for (let e of wd.search) {
                                    let lbl = (e.label||'').toLowerCase().replace(/[\s\-_]/g,'');
                                    let qn  = (_messierWdQuery||qClean).toLowerCase().replace(/[\s\-_]/g,'').replace('messier','m');
                                    if (lbl===qn || lbl.includes(qn) || qn.includes(lbl)) { entityId = e.id; break; }
                                }
                            }
                            if (!entityId) entityId = wd.search[0].id;
                        }

                        if (!entityId) {
                            // Nessun risultato Wikidata → vai diretto Wikipedia EN
                            return _wpExact('en', qClean).then(res=>{
                                if(st) st.style.display='none'; inp.value='';
                                let desc = res ? res.desc : _simbadDesc();
                                let link = res ? res.link : `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(qClean)}`;
                                apriPianificazione({ name:qClean.toUpperCase(), ra:ra/15, dec:dec, type:ty, mag:mg, dist:dist, link:link, desc:desc, tips:"Dati scaricati in tempo reale." });
                            });
                        }

                        // STEP 2 — Ottieni sitelinks + descrizione localizzata da Wikidata
                        let langs = [...new Set([wLang,'en'])];
                        return fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&props=descriptions|sitelinks&languages=${langs.join('|')}&sitefilter=${langs.map(l=>l+'wiki').join('|')}&format=json&origin=*`)
                        .then(r=>r.json()).then(we=>{
                            let entity = we.entities && we.entities[entityId];
                            if (!entity) throw new Error('no entity');

                            let sitelinks = entity.sitelinks || {};
                            let descriptions = entity.descriptions || {};

                            // Cerca sitelink nella lingua corrente, poi EN
                            let preferredLangs = wLang !== 'en' ? [wLang, 'en'] : ['en'];
                            let wpTitle = null, wpLang2 = null;
                            for (let l of preferredLangs) {
                                if (sitelinks[l+'wiki']) { wpTitle = sitelinks[l+'wiki'].title; wpLang2 = l; break; }
                            }

                            // Descrizione Wikidata localizzata (breve, come fallback)
                            let wdDesc = null;
                            if (descriptions[wLang] && descriptions[wLang].value) wdDesc = descriptions[wLang].value;
                            else if (descriptions['en'] && descriptions['en'].value) wdDesc = descriptions['en'].value;

                            if (wpTitle && wpLang2) {
                                // STEP 3 — Fetcha articolo Wikipedia completo
                                return _wpExact(wpLang2, wpTitle).then(res=>{
                                    if(st) st.style.display='none'; inp.value='';
                                    let desc = res ? res.desc : (wdDesc ? wdDesc + '\n\n' + _simbadDesc() : _simbadDesc());
                                    let link = res ? res.link : (wpTitle ? `https://${wpLang2}.wikipedia.org/wiki/${encodeURIComponent(wpTitle)}` : `https://www.wikidata.org/wiki/${entityId}`);
                                    apriPianificazione({ name:qClean.toUpperCase(), ra:ra/15, dec:dec, type:ty, mag:mg, dist:dist, link:link, desc:desc, tips:"Dati scaricati in tempo reale." });
                                });
                            } else {
                                // Nessun sitelink Wikipedia — usa descrizione Wikidata + SIMBAD
                                if(st) st.style.display='none'; inp.value='';
                                let desc = wdDesc ? wdDesc + '\n\n' + _simbadDesc() : _simbadDesc();
                                let link = `https://www.wikidata.org/wiki/${entityId}`;
                                apriPianificazione({ name:qClean.toUpperCase(), ra:ra/15, dec:dec, type:ty, mag:mg, dist:dist, link:link, desc:desc, tips:"Dati scaricati in tempo reale." });
                            }
                        }).catch(()=>{
                            if(st) st.style.display='none'; inp.value='';
                            apriPianificazione({ name:qClean.toUpperCase(), ra:ra/15, dec:dec, type:ty, mag:mg, dist:dist, link:`https://www.wikidata.org/wiki/${entityId}`, desc:_simbadDesc(), tips:"Dati scaricati in tempo reale." });
                        });
                    }).catch(()=>{
                        if(st) st.style.display='none'; inp.value='';
                        apriPianificazione({ name:qClean.toUpperCase(), ra:ra/15, dec:dec, type:ty, mag:mg, dist:dist, link:`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(qClean)}`, desc:_simbadDesc(), tips:"Dati scaricati in tempo reale." });
                    });
                }
            }).catch(() => { 
                if(st) { st.style.color = '#ff4444'; st.innerText = "Not found."; setTimeout(() => { if(st) st.style.display='none'; }, 2500); }
                inp.value = '';
                mostraAvviso('❌ SIMBAD non raggiungibile. Controlla la connessione.', 'error');
            });
        }

        // --- GALLERIA FOTO DSO (NASA Images API) ---

        let _dsoOpenTimer       = null;
        let _dsoCloseTimer      = null;
        let _longPressActivated = false;
        let _dsoGalleryVisible    = false;
        const _dsoGalleryCache    = {};
        window._dsoGalleryTarget  = null;

        function _inizializzaGalleriaDso() {
            if (document.getElementById('dso-gallery-popup')) return;

            const css = `
                #dso-gallery-popup {
                    display: none; position: fixed; z-index: 9999;
                    width: 300px; background: #141414;
                    border: 2px solid #ffaa00; border-radius: 14px;
                    overflow: hidden; box-shadow: 0 -8px 32px rgba(0,0,0,0.85);
                    pointer-events: auto;
                }
                #dso-gallery-popup.visible { display: block; }
                #dso-gallery-popup::after {
                    content: ''; position: absolute; bottom: -12px; left: 50%;
                    transform: translateX(-50%);
                    border-left: 10px solid transparent; border-right: 10px solid transparent;
                    border-top: 10px solid #ffaa00;
                }
                #dso-gallery-header {
                    padding: 10px 12px; background: #1a1a1a;
                    border-bottom: 1px solid #252525;
                    display: flex; align-items: flex-start; justify-content: space-between;
                }
                #dso-gallery-title { color: #fff; font-size: 13px; font-weight: 600; }
                #dso-gallery-sub   { color: #666; font-size: 10px; margin-top: 2px; }
                #dso-gallery-close {
                    color: #555; cursor: pointer; font-size: 13px;
                    width: 22px; height: 22px; background: #222; border-radius: 4px;
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                #dso-gallery-close:hover { color: #fff; }
                #dso-gallery-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
                    padding: 8px 10px; height: 284px; overflow-y: auto;
                    scrollbar-width: thin; scrollbar-color: #333 transparent;
                }
                #dso-gallery-grid::-webkit-scrollbar { width: 4px; }
                #dso-gallery-grid::-webkit-scrollbar-track { background: transparent; }
                #dso-gallery-grid::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
                #dso-gallery-sheet-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
                    padding: 10px 14px; max-height: 50vh; overflow-y: auto;
                    scrollbar-width: thin; scrollbar-color: #333 transparent;
                }
                .dso-gallery-cell {
                    aspect-ratio: 1; border-radius: 8px; overflow: hidden;
                    background: #1a1a1a; border: 1px solid #2a2a2a;
                    position: relative; cursor: pointer;
                }
                .dso-gallery-cell img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .dso-gallery-cell-label {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.85));
                    padding: 14px 6px 5px; font-size: 9px; color: rgba(255,255,255,0.7);
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .dso-gallery-loading {
                    grid-column: 1/-1; display: flex; align-items: center;
                    justify-content: center; color: #555; font-size: 12px; min-height: 160px;
                }
                .dso-gallery-empty {
                    grid-column: 1/-1; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; color: #444;
                    font-size: 11px; gap: 8px; min-height: 160px;
                }
                #dso-gallery-footer, #dso-gallery-sheet-footer {
                    padding: 4px 10px 10px; display: flex; gap: 6px;
                }
                #dso-gallery-sheet-footer { padding: 4px 14px 14px; }
                .dso-gal-btn {
                    flex: 1; font-size: 11px; padding: 6px 0; border-radius: 6px;
                    border: 1px solid #2a2a2a; color: #666; background: transparent; cursor: pointer;
                }
                .dso-gal-btn.gold { border-color: #332800; color: #cc8800; background: #1a1400; }
                .dso-gal-btn.gold:hover { color: #ffaa00; }
                #dso-gallery-sheet {
                    display: none; position: fixed; bottom: 0; left: 0; right: 0;
                    z-index: 9999; background: #141414;
                    border-top: 2px solid #ffaa00; border-radius: 16px 16px 0 0;
                    transform: translateY(100%); transition: transform 0.3s ease;
                    padding-bottom: env(safe-area-inset-bottom, 0px);
                }
                #dso-gallery-sheet.visible { display: block; transform: translateY(0); }
                #dso-gallery-sheet-handle {
                    width: 36px; height: 4px; background: #333; border-radius: 2px;
                    margin: 10px auto 0;
                }
                #dso-gallery-sheet-header {
                    padding: 10px 16px 6px; display: flex;
                    align-items: center; justify-content: space-between;
                    border-bottom: 1px solid #252525;
                }
                #dso-gallery-sheet-title { color: #fff; font-size: 14px; font-weight: 600; }
                #dso-gallery-sheet-close { color: #666; font-size: 16px; cursor: pointer; padding: 4px 8px; }
                #dso-gallery-overlay {
                    display: none; position: fixed; inset: 0;
                    background: rgba(0,0,0,0.55); z-index: 9998;
                }
                #dso-gallery-overlay.visible { display: block; }
                .dso-gallery-btn {
                    position: absolute; top: 4px; right: 26px;
                    width: 20px; height: 20px; background: rgba(0,0,0,0.6);
                    border: 1px solid #333; border-radius: 4px; color: #aaa;
                    font-size: 11px; cursor: pointer; z-index: 2;
                    display: none; align-items: center; justify-content: center; padding: 0;
                }
                @media (hover: none) { .dso-gallery-btn { display: flex !important; } }
            `;
            const style = document.createElement('style');
            style.id = 'dso-gallery-style';
            style.textContent = css;
            document.head.appendChild(style);

            const popup = document.createElement('div');
            popup.id = 'dso-gallery-popup';
            popup.innerHTML = `
                <div id="dso-gallery-header">
                    <div>
                        <div id="dso-gallery-title"></div>
                        <div id="dso-gallery-sub"></div>
                    </div>
                    <div id="dso-gallery-close" onclick="chiudiGalleriaDso()">&#x2715;</div>
                </div>
                <div id="dso-gallery-grid"></div>
                <div id="dso-gallery-footer">
                    <button class="dso-gal-btn" onclick="window.open('https://www.astrobin.com/search/?q='+encodeURIComponent((window._dsoGalleryTarget||{}).name||''),'_blank')">AstroBin</button>
                    <button class="dso-gal-btn gold" onclick="chiudiGalleriaDso(); if(window._dsoGalleryTarget) apriPianificazione(window._dsoGalleryTarget);">Pianifica</button>
                </div>`;
            popup.addEventListener('mouseenter', () => { _dsoGalleryVisible = true; clearTimeout(_dsoCloseTimer); clearTimeout(_dsoOpenTimer); });
            popup.addEventListener('mouseleave', () => { _dsoCloseTimer = setTimeout(chiudiGalleriaDso, 300); });
            document.body.appendChild(popup);

            const sheet = document.createElement('div');
            sheet.id = 'dso-gallery-sheet';
            sheet.innerHTML = `
                <div id="dso-gallery-sheet-handle"></div>
                <div id="dso-gallery-sheet-header">
                    <div id="dso-gallery-sheet-title"></div>
                    <span id="dso-gallery-sheet-close" onclick="chiudiGalleriaDso()">&#x2715;</span>
                </div>
                <div id="dso-gallery-sheet-grid"></div>
                <div id="dso-gallery-sheet-footer">
                    <button class="dso-gal-btn" onclick="window.open('https://www.astrobin.com/search/?q='+encodeURIComponent((window._dsoGalleryTarget||{}).name||''),'_blank')">AstroBin</button>
                    <button class="dso-gal-btn gold" onclick="chiudiGalleriaDso(); if(window._dsoGalleryTarget) apriPianificazione(window._dsoGalleryTarget);">Pianifica</button>
                </div>`;
            document.body.appendChild(sheet);

            const ov = document.createElement('div');
            ov.id = 'dso-gallery-overlay';
            ov.onclick = chiudiGalleriaDso;
            document.body.appendChild(ov);
        }

        function _isTouchDevice() {
            return window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);
        }

        function apriGalleriaDso(dsoObj, anchorEl) {
            _inizializzaGalleriaDso();
            window._dsoGalleryTarget = dsoObj;
            _dsoGalleryVisible = true;

            const name     = getLocalizedName(dsoObj);
            const subParts = [];
            if (dsoObj.type) subParts.push(mapTypeTrans(dsoObj.type));
            if (dsoObj.mag && dsoObj.mag !== 'N/D') subParts.push('mag ' + dsoObj.mag);
            const sub = subParts.join(' · ');

            if (_isTouchDevice()) {
                document.getElementById('dso-gallery-sheet-title').textContent = name;
                document.getElementById('dso-gallery-sheet-grid').innerHTML = '<div class="dso-gallery-loading">&#9203; Caricamento...</div>';
                document.getElementById('dso-gallery-sheet').classList.add('visible');
                document.getElementById('dso-gallery-overlay').classList.add('visible');
                _fetchGalleryImages(dsoObj.name, 'dso-gallery-sheet-grid');
            } else {
                document.getElementById('dso-gallery-title').textContent = name;
                document.getElementById('dso-gallery-sub').textContent   = sub;
                document.getElementById('dso-gallery-grid').innerHTML    = '<div class="dso-gallery-loading">&#9203; Caricamento...</div>';

                const popup = document.getElementById('dso-gallery-popup');
                popup.classList.add('visible');

                const rect   = anchorEl.getBoundingClientRect();
                const popupW = 300;
                const popupH = 320;
                let   left   = rect.left + rect.width / 2 - popupW / 2;
                if (left < 8) left = 8;
                if (left + popupW > window.innerWidth - 8) left = window.innerWidth - popupW - 8;
                let   top    = rect.top - popupH - 14;
                if (top < 8) top = rect.bottom + 14;
                popup.style.left = left + 'px';
                popup.style.top  = top  + 'px';

                _fetchGalleryImages(dsoObj.name, 'dso-gallery-grid');
            }
        }

        async function _fetchGalleryImages(dsoName, gridId) {
            const gridEl = document.getElementById(gridId);
            if (!gridEl) return;

            if (_dsoGalleryCache[dsoName]) {
                _renderGalleryImages(_dsoGalleryCache[dsoName], gridEl);
                return;
            }

            try {
                const r     = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(dsoName)}&media_type=image`);
                const data  = await r.json();
                const items = (data.collection && data.collection.items) || [];
                const photos = items.slice(0, 16).map(item => ({
                    thumb:   item.links && item.links[0] ? item.links[0].href : null,
                    credit:  item.data  && item.data[0]  ? (item.data[0].photographer || item.data[0].center || 'NASA') : 'NASA',
                    nasa_id: item.data  && item.data[0]  ? item.data[0].nasa_id : null,
                })).filter(p => p.thumb);

                _dsoGalleryCache[dsoName] = photos;
                _renderGalleryImages(photos, gridEl);
            } catch(e) {
                const gridEl2 = document.getElementById(gridId);
                if (gridEl2) gridEl2.innerHTML = '<div class="dso-gallery-empty">&#9888;<br>Immagini non disponibili</div>';
            }
        }

        function _renderGalleryImages(photos, gridEl) {
            if (!gridEl) return;
            if (!photos || photos.length === 0) {
                gridEl.innerHTML = '<div class="dso-gallery-empty">&#128300;<br>Nessuna immagine trovata</div>';
                return;
            }
            gridEl.innerHTML = '';
            photos.forEach(p => {
                const cell = document.createElement('div');
                cell.className = 'dso-gallery-cell';
                const img  = document.createElement('img');
                img.src    = p.thumb;
                img.loading = 'lazy';
                img.onerror = () => { img.style.display = 'none'; };
                const lbl  = document.createElement('div');
                lbl.className   = 'dso-gallery-cell-label';
                lbl.textContent = p.credit;
                cell.appendChild(img);
                cell.appendChild(lbl);
                if (p.nasa_id) cell.onclick = () => window.open(`https://images.nasa.gov/details/${p.nasa_id}`, '_blank');
                gridEl.appendChild(cell);
            });
        }

        function chiudiGalleriaDso() {
            _dsoGalleryVisible = false;
            clearTimeout(_dsoOpenTimer);
            clearTimeout(_dsoCloseTimer);
            const popup = document.getElementById('dso-gallery-popup');
            const sheet = document.getElementById('dso-gallery-sheet');
            const ov    = document.getElementById('dso-gallery-overlay');
            if (popup) popup.classList.remove('visible');
            if (sheet) sheet.classList.remove('visible');
            if (ov)    ov.classList.remove('visible');
        }

        // --- GESTIONE TOOLTIP FLUTTUANTE ---
