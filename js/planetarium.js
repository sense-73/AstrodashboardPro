// planetarium.js — Planetario ibrido, SIMBAD, sistema solare, card target
// ============================================================

        function cambiaOraAstro() {
            if (!datiMeteo) return;
            let step = parseInt(document.getElementById('astroSlider').value), dOra = new Date(datiMeteo.time[indicePartenza + step]);
            document.getElementById('astro-time-display').innerText = "🔭 " + (step === 0 ? t("now") + " (" + new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}) + ")" : dOra.toLocaleDateString(lang==='it'?'it-IT':'en-US', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }));
            
            let pL = document.getElementById('planets-list'), dL = document.getElementById('dso-list'); pL.innerHTML = ''; dL.innerHTML = '';
            if (SunCalc.getPosition(dOra, latCorrente, lonCorrente).altitude * (180/Math.PI) > -6) { pL.innerHTML = dL.innerHTML = `<p style="color:#aaa; padding:10px;">${t("too_bright")}</p>`; return; }

            let vP = [], mP = SunCalc.getMoonPosition(dOra, latCorrente, lonCorrente), mA = mP.altitude * (180/Math.PI);
            if (mA > 5) vP.push({ html: creaCardHTML({id: "moon", name: "moon", icon: "🌕"}, mA, (mP.azimuth * 180/Math.PI + 180) % 360, false), alt: mA });
            planetsDatabase.forEach(p => { let pos = calcolaAltAz(p.ra, p.dec, latCorrente, lonCorrente, dOra); if (pos.alt > 10) vP.push({ html: creaCardHTML(p, pos.alt, pos.az, false), alt: pos.alt }); });
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
            if (checkName === "jupiter" || checkName === "mars" || checkName === "venus" || checkName === "moon") {
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
            let div = document.createElement('div'); div.className = c ? 'dso-card card-clickable' : 'dso-card card-static';
            let finalName = getLocalizedName(tObj);
            div.innerHTML = `<div class="dso-icon">${tObj.icon}</div><div class="dso-info"><h4>${finalName}</h4><p>Alt: <b>${Math.round(alt)}°</b></p><span class="dso-direction">${getPuntoCardinale(az)}</span></div>`;
            if(c) div.onclick = () => apriPianificazione(tObj); return div;
        }

        function setupSearch(iId, sId) {
            let inp = document.getElementById(iId), box = document.getElementById(sId); if(!inp || !box) return;
            inp.addEventListener('input', () => {
                if (typeof dsoDatabase === 'undefined') return;
                let v = inp.value.trim().toLowerCase().replace(/\s+/g, ''); box.innerHTML = '';
                if (!v) { box.style.display = 'none'; return; }
                let m = dsoDatabase.filter(d => d.id.toLowerCase().includes(v) || d.name.toLowerCase().replace(/\s+/g, '').includes(v) || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '').includes(v)));
                if (m.length > 0) { box.style.display = 'block'; m.forEach(x => { let li = document.createElement('li'); li.innerHTML = `${x.icon} ${getLocalizedName(x)}`; li.onclick = () => { inp.value = getLocalizedName(x); box.style.display = 'none'; apriPianificazione(x); }; box.appendChild(li); }); } else box.style.display = 'none';
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
            if (/^sh\s*2[-\s]*(\d+)$/i.test(q)) q = q.replace(/^sh\s*2[-\s]*(\d+)$/i, "Sh2-$1");
            else if (/^vdb[-\s]*(\d+)$/i.test(q)) q = q.replace(/^vdb[-\s]*(\d+)$/i, "VdB $1");
            else if (/^(lbn|ldn)[-\s]*(\d+)$/i.test(q)) q = q.replace(/^(lbn|ldn)[-\s]*(\d+)$/i, (m, p1, p2) => p1.toUpperCase() + " " + p2);
            else if (/^(ngc|ic)[-\s]*(\d+)$/i.test(q)) q = q.replace(/^(ngc|ic)[-\s]*(\d+)$/i, (m, p1, p2) => p1.toUpperCase() + " " + p2);

            let qn = q.toLowerCase().replace(/\s+/g, '').replace(/-/g, ''), st = document.getElementById('status-' + iId);
            if(st) st.style.display = 'none';

            let ex = dsoDatabase.find(d => d.id.toLowerCase() === qn || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '') === qn));
            let pt = dsoDatabase.find(d => d.name.toLowerCase().replace(/\s+/g, '').includes(qn) || (d[lang] && d[lang].toLowerCase().replace(/\s+/g, '').includes(qn)));
            
            if (ex) { inp.value = getLocalizedName(ex); apriPianificazione(ex); return; } 
            if (pt) { inp.value = getLocalizedName(pt); apriPianificazione(pt); return; }

            if(st) { st.style.display = 'block'; st.style.color = '#ffaa00'; st.innerText = "SIMBAD Search... 🛰️"; }
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
                    if(st) st.innerText = "Database... 🔭";
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
                    fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(qClean)}&language=en&type=item&format=json&origin=*&limit=3`)
                    .then(r=>r.json()).then(wd=>{
                        let entityId = null;
                        if (wd.search && wd.search.length > 0) {
                            // Prendi la prima entità il cui label o alias corrisponde
                            for (let e of wd.search) {
                                let lbl = (e.label||'').toLowerCase().replace(/[\s\-_]/g,'');
                                let qn  = qClean.toLowerCase().replace(/[\s\-_]/g,'');
                                if (lbl===qn || lbl.includes(qn) || qn.includes(lbl)) { entityId = e.id; break; }
                            }
                            if (!entityId) entityId = wd.search[0].id; // primo risultato come fallback
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
                        fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&props=descriptions|sitelinks&languages=${langs.join('|')}&sitefilter=${langs.map(l=>l+'wiki').join('|')}&format=json&origin=*`)
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
            }).catch(e => { if(st) { st.style.color = '#ff4444'; st.innerText = "Network Error."; } });
        }

        // --- GESTIONE TOOLTIP FLUTTUANTE ---
