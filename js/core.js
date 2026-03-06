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
                let titleKey = el.getAttribute('data-i18n-title');
                if (titleKey) el.title = t(titleKey);
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
}



