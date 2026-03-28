// core.js — Lingua, navigazione, tooltip, guida
// ============================================================

        function t(key) { return i18n[lang][key] || key; }

        function changeLanguage(l) {
            lang = l; localStorage.setItem('ad_lang', l);
            
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.nav-flag').forEach(btn => btn.classList.remove('active'));
            let actBtn = document.getElementById('btn-lang-' + l);
            if(actBtn) { actBtn.classList.add('active'); }

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
            if (typeof renderStepper === 'function') renderStepper();
}




        // ── FORM CONTATTO ─────────────────────────────────────────────────
        function apriContatto() {
            document.getElementById('contact-modal').style.display = 'block';
            // Aggiorna placeholder soggetto in base alla lingua
            let ph = document.getElementById('contact-subject');
            if (ph) ph.placeholder = t('contact_subject_ph');
        }

        function chiudiContatto() {
            document.getElementById('contact-modal').style.display = 'none';
            document.getElementById('contact-error').style.display = 'none';
        }

        function inviaContatto() {
            let from    = document.getElementById('contact-from').value.trim();
            let subject = document.getElementById('contact-subject').value.trim();
            let msg     = document.getElementById('contact-message').value.trim();
            let errEl   = document.getElementById('contact-error');

            // Validazione
            let emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from);
            if (!emailOk) { errEl.innerText = t('contact_err_email'); errEl.style.display = 'block'; return; }
            if (msg.length < 5) { errEl.innerText = t('contact_err_msg'); errEl.style.display = 'block'; return; }
            errEl.style.display = 'none';

            // Costruisce il corpo con mittente incluso nel testo (mailto non supporta Reply-To)
            let body = `Da: ${from}\n\n${msg}`;
            let mailtoLink = `mailto:enrico.salis@gmail.com?subject=${encodeURIComponent(subject || 'AstroDashboard PRO - Messaggio')}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // Chiude il modal dopo un attimo
            setTimeout(() => { chiudiContatto(); }, 800);
        }

        // Chiude il modal cliccando fuori
        window.addEventListener('click', e => {
            if (e.target === document.getElementById('contact-modal')) chiudiContatto();
        });
