// core.js — Lingua, navigazione, tooltip, guida
// ============================================================

        function t(key) { return i18n[lang][key] || key; }

        function changeLanguage(l) {
            lang = l; localStorage.setItem('ad_lang', l);
            
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            let actBtn = document.getElementById('btn-lang-' + l);
            if(actBtn) actBtn.classList.add('active');

            document.querySelectorAll('[data-i18n]').forEach(el => {
                let k = el.getAttribute('data-i18n');
                if (el.tagName === 'INPUT') el.placeholder = t(k); else el.innerHTML = t(k);
            });

            ['it','en','es','zh'].forEach(lg => {
                let guide = document.getElementById('guide-'+lg);
                if(guide) guide.style.display = (lang===lg ? 'block' : 'none');
            });
            
            aggiornaEffemeridi(new Date()); 
            if(datiMeteo){cambiaOraMeteo(); cambiaOraAstro();}
	// Aggiorna in tempo reale i dati dinamici del Dossier se è aperto
            if (targetSelezionato && document.getElementById('planning-view').style.display === 'block') {
                document.getElementById('plan-target-name').innerText = getLocalizedName(targetSelezionato);
                document.getElementById('stat-type').innerText = mapTypeTrans(targetSelezionato.type) || "--";
                document.getElementById('target-description').innerText = getLocalizedText(targetSelezionato, 'desc');
                document.getElementById('target-tips').innerText = getLocalizedText(targetSelezionato, 'tips');
            }
        // Aggiorna in tempo reale i dati dinamici del Dossier se è aperto
            if (targetSelezionato && document.getElementById('planning-view').style.display === 'block') {
                document.getElementById('plan-target-name').innerText = getLocalizedName(targetSelezionato);
                document.getElementById('stat-type').innerText = mapTypeTrans(targetSelezionato.type) || "--";
            }
}

        const dbTelescopiBase = [
            // Obiettivi Fotografici
            { nome: "Samyang 135mm f/2", focale: 135, diametro: 67 },
            // ZWO
            { nome: "ZWO Seestar S50", focale: 250, diametro: 50 },
            { nome: "ZWO FF65 APO", focale: 416, diametro: 65 },
            // William Optics
            { nome: "WO RedCat 51", focale: 250, diametro: 51 },
            { nome: "WO RedCat 71", focale: 350, diametro: 71 },
            { nome: "WO ZenithStar 81", focale: 559, diametro: 81 },
            // Askar
            { nome: "Askar FMA180", focale: 180, diametro: 40 },
            { nome: "Askar FRA300 Pro", focale: 300, diametro: 60 },
            { nome: "Askar FRA400", focale: 400, diametro: 72 },
            { nome: "Askar FRA500", focale: 500, diametro: 90 },
            { nome: "Askar 107PHQ", focale: 749, diametro: 107 },
            // Sky-Watcher (Rifrattori & Newton)
            { nome: "SW Evoguide 50ED", focale: 242, diametro: 50 },
            { nome: "SW 72ED Evostar", focale: 420, diametro: 72 },
            { nome: "SW 80ED Evostar", focale: 600, diametro: 80 },
            { nome: "SW Esprit 80ED", focale: 400, diametro: 80 },
            { nome: "SW Esprit 100ED", focale: 550, diametro: 100 },
            { nome: "SW Esprit 120ED", focale: 840, diametro: 120 },
            { nome: "SW Explorer 130 PDS", focale: 650, diametro: 130 },
            { nome: "SW Explorer 150PDS", focale: 750, diametro: 150 },
            { nome: "SW Quattro 150P", focale: 600, diametro: 150 },
            { nome: "SW Quattro 200P", focale: 800, diametro: 200 },
            // Celestron
            { nome: "Celestron RASA 8", focale: 400, diametro: 203 },
            { nome: "Celestron RASA 11", focale: 620, diametro: 279 },
            { nome: "Celestron EdgeHD 8", focale: 2032, diametro: 203 },
            { nome: "Celestron EdgeHD 8 @ f/7", focale: 1422, diametro: 203 },
            { nome: "Celestron C8 SCT", focale: 2032, diametro: 203 },
            { nome: "Celestron C8 @ f/6.3", focale: 1280, diametro: 203 }
        ];
        
        const dbCamereBase = [
            { nome: "ASI 533MC/MM (Square)", w: 11.31, h: 11.31, p: 3.76 }, 
            { nome: "ASI 294MC/MM (4/3\")", w: 19.1, h: 13.0, p: 4.63 }, 
            { nome: "ASI 2600MC/MM (APS-C)", w: 23.5, h: 15.7, p: 3.76 }, 
            { nome: "SONY IMX571 (APS-C Gen)", w: 23.5, h: 15.7, p: 3.76 }, 
            { nome: "ASI 6200MC/MM (Full Frame)", w: 36.0, h: 24.0, p: 3.76 }, 
            { nome: "ASI 183MC/MM (1\")", w: 13.2, h: 8.8, p: 2.4 }, 
            { nome: "SONY IMX585", w: 11.14, h: 6.26, p: 2.9 }, 
            { nome: "ASI 1600MM (4/3\")", w: 17.7, h: 13.4, p: 3.8 }, 
            { nome: "Reflex APS-C (Canon/Nikon)", w: 22.3, h: 14.9, p: 4.3 }
        ];

