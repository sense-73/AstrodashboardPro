// fov.js — FOV simulatore, rotazione PA, mosaico, coordinate, tooltip, guida
// ============================================================

        function mostraTooltip(el, key) {
            let tooltip = document.getElementById('floating-tooltip');
            tooltip.innerHTML = t(key);
            tooltip.style.display = 'block';
            
            let rect = el.getBoundingClientRect();
            let top = rect.top + window.scrollY - tooltip.offsetHeight - 15;
            let left = rect.left + window.scrollX - (tooltip.offsetWidth / 2) + (rect.width / 2);
            
            if (left < 10) left = 10;
            if ((left + tooltip.offsetWidth) > window.innerWidth) left = window.innerWidth - tooltip.offsetWidth - 10;
            if (top < window.scrollY) top = rect.bottom + window.scrollY + 15; 

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
            
            setTimeout(() => { tooltip.style.opacity = '1'; }, 10);
        }

        function nascondiTooltip() {
            let tooltip = document.getElementById('floating-tooltip');
            tooltip.style.opacity = '0';
            setTimeout(() => { tooltip.style.display = 'none'; }, 200);
        }

        function apriGuida() { vistaPrecedente = document.getElementById('planning-view').style.display === 'block' ? 'planning-view' : 'dashboard-view'; document.getElementById('dashboard-view').style.display = 'none'; document.getElementById('planning-view').style.display = 'none'; document.getElementById('guide-view').style.display = 'block'; window.scrollTo(0,0); }
        function chiudiGuida() { document.getElementById('guide-view').style.display = 'none'; document.getElementById(vistaPrecedente).style.display = 'block'; if(vistaPrecedente==='planning-view') aggiornaFOV(); window.scrollTo(0,0); }

        window.onclick = function(event) {
            if (event.target == document.getElementById('report-modal')) { chiudiReport(); }
        }

        function apriPianificazione(tObj) {
            targetSelezionato = tObj; document.getElementById('dashboard-view').style.display = 'none'; document.getElementById('planning-view').style.display = 'block';
            sessionStorage.setItem('ad_current_target', JSON.stringify(tObj));
            document.getElementById('plan-target-name').innerText = getLocalizedName(targetSelezionato);
            
            // FIX: Se nel DB locale manca la tipologia, la deduce in automatico dalla descrizione!
            let tyCheck = targetSelezionato.type || "";
            let descLow = (getLocalizedText(targetSelezionato, 'desc') || "").toLowerCase();
            if ((!tyCheck || tyCheck.toLowerCase() === "sconosciuta") && descLow !== "--") {
                if(descLow.includes("globulare")) tyCheck = "Ammasso Globulare";
                else if(descLow.includes("aperto")) tyCheck = "Ammasso Aperto";
                else if(descLow.includes("galassia")) tyCheck = "Galassia";
                else if(descLow.includes("planetaria")) tyCheck = "Nebulosa Planetaria";
                else if(descLow.includes("emissione")) tyCheck = "Nebulosa a Emissione";
            }
            
            let tipoTradotto = mapTypeTrans(tyCheck);
            document.getElementById('stat-type').innerText = (tipoTradotto && tipoTradotto !== tyCheck) ? tipoTradotto : (tyCheck || "Sconosciuta");
            
            // Format forzato a 1 decimale della magnitudine
            let displayMag = targetSelezionato.mag;
            if (displayMag && displayMag !== "N/D" && !isNaN(parseFloat(displayMag))) { displayMag = parseFloat(displayMag).toFixed(1); } else { displayMag = "--"; }
            document.getElementById('stat-mag').innerText = displayMag;
            
            document.getElementById('stat-dist').innerText = targetSelezionato.dist || "--";
            document.getElementById('target-description').innerText = getLocalizedText(targetSelezionato, 'desc');
            
            // ── CONSIGLI TATTICI PER CATEGORIA ─────────────────────────────────
            let rawTips = getLocalizedText(targetSelezionato, 'tips');
            const _needsCategory = (rawTips === "Dati scaricati in tempo reale." || rawTips === "--" || !rawTips || rawTips.includes("sviluppo"));
            if (_needsCategory) {
                const _lang = localStorage.getItem('ad_lang') || 'it';
                const _objName = (targetSelezionato.name || '').toUpperCase();
                const _tLow = tyCheck.toLowerCase();

                const _catTips = {
                    sh2: {
                        it: "Per catturare le deboli emissioni del catalogo Sharpless, privilegia l'uso di filtri a banda stretta (H\u03b1) o Dual-Band, impostando pose lunghe (300-600s) per superare il rumore di lettura del sensore. Mantieni il Gain al valore Unity (o ISO nativi) con raffreddamento stabile a -10\u00b0C/-20\u00b0C, assicurandoti di eseguire il dithering ogni 2-3 scatti per pulire il fondo cielo. La chiave del successo per questi oggetti \u00e8 l'integrazione totale: mira a raccogliere almeno 10-15 ore di segnale complessivo per far emergere i dettagli pi\u00f9 tenui delle polveri senza affogarli nel rumore.",
                        en: "To capture the faint emissions of the Sharpless catalogue, prioritize narrowband filters (H\u03b1) or Dual-Band, using long exposures (300-600s) to overcome sensor read noise. Keep the Gain at Unity value (or native ISO) with stable cooling at -10\u00b0C/-20\u00b0C, and apply dithering every 2-3 frames to clean the sky background. The key to success with these objects is total integration: aim for at least 10-15 hours of accumulated signal to bring out the faintest dust details without drowning them in noise.",
                        es: "Para capturar las d\u00e9biles emisiones del cat\u00e1logo Sharpless, prioriza el uso de filtros de banda estrecha (H\u03b1) o Dual-Band, con poses largas (300-600s) para superar el ruido de lectura del sensor. Mant\u00e9n el Gain en el valor Unity (o ISO nativos) con un enfriamiento estable a -10\u00b0C/-20\u00b0C, aplicando dithering cada 2-3 tomas para limpiar el fondo del cielo. La clave del \u00e9xito con estos objetos es la integraci\u00f3n total: apunta a acumular al menos 10-15 horas de se\u00f1al para revelar los detalles m\u00e1s tenues del polvo sin ahogarlos en el ruido.",
                        zh: "\u62cd\u6444\u6c99\u666e\u5229\u65af\u661f\u8868\u7684\u5fae\u5f31\u53d1\u5c04\u661f\u4e91\u65f6\uff0c\u4f18\u5148\u4f7f\u7528\u7a84\u5e26\u6ee4\u955c\uff08H\u03b1\uff09\u6216\u53cc\u9891\u5e26\u6ee4\u955c\uff0c\u91c7\u7528\u957f\u66dd\u5149\uff08300-600\u79d2\uff09\u4ee5\u514b\u670d\u4f20\u611f\u5668\u8bfb\u51fa\u566a\u58f0\u3002\u5c06\u589e\u76ca\u8bbe\u7f6e\u4e3a Unity Gain\uff08\u6216\u539f\u751f ISO\uff09\uff0c\u4fdd\u6301\u4f20\u611f\u5668\u5728 -10\u00b0C/-20\u00b0C \u7a33\u5b9a\u5236\u51b7\uff0c\u5e76\u6bcf\u9694 2-3 \u5f20\u5b50\u5e27\u6267\u884c\u4e00\u6b21 Dithering \u4ee5\u6e05\u6d01\u5929\u7a7a\u80cc\u666f\u3002\u653b\u514b\u8fd9\u7c7b\u76ee\u6807\u7684\u5173\u952e\u5728\u4e8e\u603b\u79ef\u5206\u65f6\u95f4\uff1a\u81f3\u5c11\u79ef\u7d2f 10-15 \u5c0f\u65f6\u7684\u4fe1\u53f7\uff0c\u624d\u80fd\u5448\u73b0\u6700\u7ec6\u8155\u7684\u5c18\u57c3\u7ec6\u8282\u3002"
                    },
                    lbn: {
                        it: "Le nebulose LBN sono strutture di gas e polvere che riflettono o emettono luce in modo molto diffuso: evita i filtri narrowband salvo rare eccezioni con componente H\u03b1, e punta su un setup broadband (LRGB o RGB) con cieli il pi\u00f9 bui possibile. Usa pose medie (180-300s) a basso gain per preservare la gamma dinamica e catturare sia le zone luminose che il fondo nebbioso circostante. L'integrazione totale \u00e8 critica: non scendere sotto le 8-10 ore, e dedica particolare cura alla calibrazione con flat field aggiornati per eliminare i gradienti di fondo.",
                        en: "LBN nebulae are diffuse structures of gas and dust that reflect or emit light very broadly: avoid narrowband filters except in rare cases with an H\u03b1 component, and rely on a broadband setup (LRGB or RGB) under the darkest skies possible. Use medium exposures (180-300s) at low gain to preserve dynamic range and capture both the bright areas and the surrounding misty background. Total integration is critical: do not go below 8-10 hours, and pay particular attention to flat field calibration to eliminate background gradients.",
                        es: "Las nebulosas LBN son estructuras difusas de gas y polvo que reflejan o emiten luz de forma muy dispersa: evita los filtros de banda estrecha salvo raras excepciones con componente H\u03b1, y apuesta por un setup de banda ancha (LRGB o RGB) bajo cielos lo m\u00e1s oscuros posible. Usa poses medias (180-300s) a bajo gain para preservar el rango din\u00e1mico y capturar tanto las zonas luminosas como el fondo nebuloso circundante. La integraci\u00f3n total es cr\u00edtica: no bajes de 8-10 horas, y presta especial atenci\u00f3n a la calibraci\u00f3n con flat fields para eliminar los gradientes de fondo.",
                        zh: "LBN \u661f\u4e91\u662f\u6c14\u4f53\u548c\u5c18\u57c3\u7ec4\u6210\u7684\u6f2b\u5c04\u7ed3\u6784\uff0c\u4ee5\u975e\u5e38\u5f25\u6563\u7684\u65b9\u5f0f\u53cd\u5c04\u6216\u53d1\u5c04\u5149\u7ebf\uff1a\u9664\u6781\u5c11\u6570\u542b\u6709 H\u03b1 \u6210\u5206\u7684\u60c5\u51b5\u5916\uff0c\u5e94\u907f\u514d\u4f7f\u7528\u7a84\u5e26\u6ee4\u955c\uff0c\u5728\u5c3d\u53ef\u80fd\u9ed1\u6697\u7684\u5929\u7a7a\u4e0b\u91c7\u7528\u5bbf\u5e26\u65b9\u6848\uff08LRGB \u6216 RGB\uff09\u62cd\u6444\u3002\u4f7f\u7528\u4e2d\u7b49\u66dd\u5149\uff08180-300\u79d2\uff09\u914d\u5408\u4f4e\u589e\u76ca\uff0c\u603b\u79ef\u5206\u65f6\u95f4\u4e0d\u5f97\u4f4e\u4e8e 8-10 \u5c0f\u65f6\uff0c\u5e76\u52a1\u5fc5\u4f7f\u7528\u6700\u65b0\u5e73\u573a\u8fdb\u884c\u6821\u51c6\u4ee5\u6d88\u9664\u80cc\u666f\u68af\u5ea6\u3002"
                    },
                    ldn: {
                        it: "Le nebulose oscure LDN non emettono luce propria: si fotografano per contrasto, come silhouette scure su un ricco sfondo stellare o nebulare. Usa un setup broadband (LRGB) con focali medio-corte per contestualizzare la struttura oscura nel campo circostante \u2014 il soggetto \u00e8 il contrasto, non la nebulosa stessa. Pose medie (120-240s) sono sufficienti se il campo di sfondo \u00e8 ricco; il vero lavoro \u00e8 in post-produzione, dove dovrai bilanciare la luminosit\u00e0 del fondo senza schiacciare i dettagli di bordo della nube.",
                        en: "LDN dark nebulae emit no light of their own: they are photographed by contrast, as dark silhouettes against a rich stellar or nebular background. Use a broadband setup (LRGB) with medium-short focal lengths to place the dark structure in its surrounding context \u2014 the subject is the contrast, not the nebula itself. Medium exposures (120-240s) are sufficient if the background field is rich; the real work lies in post-processing, where you will need to balance background brightness without crushing the cloud's edge details.",
                        es: "Las nebulosas oscuras LDN no emiten luz propia: se fotografan por contraste, como siluetas oscuras sobre un rico fondo estelar o nebular. Usa un setup de banda ancha (LRGB) con focales medio-cortas para contextualizar la estructura oscura en el campo circundante \u2014 el sujeto es el contraste, no la nebulosa en s\u00ed. Poses medias (120-240s) son suficientes si el campo de fondo es rico; el verdadero trabajo est\u00e1 en el procesado, donde deber\u00e1s equilibrar el brillo del fondo sin aplastar los detalles del borde de la nube.",
                        zh: "LDN \u6697\u661f\u4e91\u81ea\u8eab\u4e0d\u53d1\u5149\uff1a\u5b83\u4eec\u4ee5\u526a\u5f71\u7684\u5f62\u5f0f\u51fa\u73b0\uff0c\u901a\u8fc7\u4e0e\u4e30\u5bcc\u7684\u661f\u573a\u6216\u661f\u4e91\u80cc\u666f\u5f62\u6210\u5bf9\u6bd4\u6765\u62cd\u6444\u3002\u4f7f\u7528\u5bbf\u5e26\u65b9\u6848\uff08LRGB\uff09\u914d\u5408\u4e2d\u77ed\u7126\u8ddd\uff0c\u5c06\u6697\u7ed3\u6784\u7f6e\u4e8e\u5468\u56f4\u73af\u5883\u4e2d\u2014\u2014\u62cd\u6444\u7684\u4e3b\u9898\u662f\u5bf9\u6bd4\u5ea6\u672c\u8eab\u3002\u82e5\u80cc\u666f\u661f\u573a\u4e30\u5bcc\uff0c\u4e2d\u7b49\u66dd\u5149\uff08120-240\u79d2\uff09\u5373\u53ef\uff1b\u771f\u6b63\u7684\u6311\u6218\u5728\u4e8e\u540e\u671f\u5904\u7406\uff0c\u9700\u5728\u4e0d\u538b\u7f29\u4e91\u8fb9\u7f18\u7ec6\u8282\u7684\u524d\u63d0\u4e0b\u5e73\u8861\u80cc\u666f\u4eae\u5ea6\u3002"
                    },
                    vdb: {
                        it: "Le nebulose a riflessione VdB risplendono di luce riflessa dalle stelle vicine, tipicamente in toni di blu-azzurro: i filtri narrowband sono inutili e controproducenti, usa esclusivamente il broadband (LRGB o RGB). Lavora da cieli scuri con assenza totale di Luna, poich\u00e9 la luminosit\u00e0 superficiale \u00e8 molto bassa e qualsiasi inquinamento luminoso si trasformer\u00e0 in un gradiente impossibile da rimuovere. Pose da 180-300s con gain moderato e almeno 8 ore di integrazione totale; la polvere circumstellare scura che spesso circonda questi oggetti \u00e8 un dettaglio prezioso che emerge solo con un fondo cielo impeccabile.",
                        en: "VdB reflection nebulae glow with light reflected from nearby stars, typically in blue-azure tones: narrowband filters are useless and counterproductive, use exclusively broadband (LRGB or RGB). Work under dark skies with no Moon, as the surface brightness is very low and any light pollution will become an unremovable gradient. Exposures of 180-300s with moderate gain and at least 8 hours of total integration; the dark circumstellar dust that often surrounds these objects is a precious detail that only emerges with an impeccable sky background.",
                        es: "Las nebulosas de reflexi\u00f3n VdB brillan con la luz reflejada de las estrellas cercanas, t\u00edpicamente en tonos azul-celeste: los filtros de banda estrecha son in\u00fatiles y contraproducentes, usa exclusivamente banda ancha (LRGB o RGB). Trabaja desde cielos oscuros con ausencia total de Luna. Poses de 180-300s con gain moderado y al menos 8 horas de integraci\u00f3n total; el polvo circunestelar oscuro que a menudo rodea estos objetos es un detalle precioso que solo emerge con un fondo de cielo impecable.",
                        zh: "VdB \u53cd\u5c04\u661f\u4e91\u56e0\u9644\u8fd1\u6052\u661f\u7684\u53cd\u5c04\u5149\u800c\u53d1\u5149\uff0c\u901a\u5e38\u5448\u73b0\u84dd\u8272\u8c03\uff1a\u7a84\u5e26\u6ee4\u955c\u5bf9\u6b64\u6beb\u65e0\u7528\u5904\uff0c\u8bf7\u4ec5\u4f7f\u7528\u5bbf\u5e26\u65b9\u6848\uff08LRGB \u6216 RGB\uff09\u3002\u5728\u65e0\u6708\u7684\u9ed1\u6697\u5929\u7a7a\u4e0b\u62cd\u6444\u3002\u5efa\u8bae\u66dd\u5149 180-300 \u79d2\u3001\u4e2d\u7b49\u589e\u76ca\uff0c\u603b\u79ef\u5206\u65f6\u95f4\u81f3\u5c11 8 \u5c0f\u65f6\uff1b\u901a\u5e38\u73af\u7ed5\u8fd9\u7c7b\u5929\u4f53\u7684\u6697\u8272\u661f\u5468\u5c18\u57c3\u662f\u73cd\u8d35\u7684\u7ec6\u8282\uff0c\u53ea\u6709\u5728\u80cc\u666f\u5929\u7a7a\u6781\u4f73\u7684\u6761\u4ef6\u4e0b\u624d\u80fd\u5448\u73b0\u3002"
                    },
                    snr: {
                        it: "I resti di supernova sono tra i soggetti pi\u00f9 tecnici dell'astrofotografia: emettono quasi esclusivamente in H\u03b1 e OIII, con filamenti sottilissimi che richiedono una strategia SHO o HOO rigorosa. Usa filtri da 3nm o 5nm per massimizzare il contrasto dei filamenti rispetto al fondo, con pose lunghe (300-600s) e gain unity; il canale OIII \u00e8 spesso il pi\u00f9 debole e richiede il doppio del tempo rispetto all'H\u03b1. L'integrazione minima consigliata \u00e8 di 15-20 ore totali tra i canali: sotto questa soglia i filamenti pi\u00f9 tenui si perdono nel rumore e la struttura dell'oggetto risulta incompleta.",
                        en: "Supernova remnants are among the most technically demanding subjects in astrophotography: they emit almost exclusively in H\u03b1 and OIII, with ultrafine filaments that require a strict SHO or HOO strategy. Use 3nm or 5nm filters to maximize filament contrast against the background, with long exposures (300-600s) and unity gain; the OIII channel is often the weakest and requires twice the integration time compared to H\u03b1. The recommended minimum total integration is 15-20 hours across all channels: below this threshold the faintest filaments are lost in noise and the object's structure appears incomplete.",
                        es: "Los restos de supernova son de los sujetos m\u00e1s t\u00e9cnicos de la astrof\u00f3tograf\u00eda: emiten casi exclusivamente en H\u03b1 y OIII, con filamentos ultrafinos que requieren una estrategia SHO u HOO rigurosa. Usa filtros de 3nm o 5nm, con poses largas (300-600s) y gain unity; el canal OIII es a menudo el m\u00e1s d\u00e9bil y requiere el doble de tiempo de integraci\u00f3n respecto al H\u03b1. La integraci\u00f3n total m\u00ednima recomendada es de 15-20 horas entre todos los canales.",
                        zh: "\u8d85\u65b0\u661f\u9057\u8ff9\u662f\u5929\u6587\u6444\u5f71\u4e2d\u6280\u672f\u8981\u6c42\u6700\u9ad8\u7684\u76ee\u6807\u4e4b\u4e00\uff1a\u5b83\u4eec\u51e0\u4e4e\u53ea\u5728 H\u03b1 \u548c OIII \u6ce2\u6bb5\u53d1\u5149\uff0c\u6781\u7ec6\u7684\u4e1d\u72b6\u7ed3\u6784\u9700\u8981\u4e25\u683c\u7684 SHO \u6216 HOO \u7b56\u7565\u3002\u4f7f\u7528 3nm \u6216 5nm \u6ee4\u955c\uff0c\u914d\u5408\u957f\u66dd\u5149\uff08300-600\u79d2\uff09\u548c Unity Gain\uff1bOIII \u901a\u9053\u9700\u8981\u6bd4 H\u03b1 \u591a\u4e00\u500d\u7684\u79ef\u5206\u65f6\u95f4\u3002\u5efa\u8bae\u5404\u901a\u9053\u603b\u79ef\u5206\u65f6\u95f4\u4e0d\u5c11\u4e8e 15-20 \u5c0f\u65f6\u3002"
                    },
                    planetaria: {
                        it: "Le nebulose planetarie sono piccole ma ad alta luminosit\u00e0 superficiale: il rischio principale non \u00e8 la mancanza di segnale ma la saturazione del nucleo centrale e la perdita dei dettagli interni. Usa pose brevi (30-90s) abbinate a pose lunghe in HDR per catturare simultaneamente il nucleo brillante e i gusci esterni pi\u00f9 tenui, privilegiando i filtri OIII e H\u03b1. Una focale lunga (>1000mm) \u00e8 quasi sempre necessaria; il seeing diventa il fattore limitante principale, quindi sfrutta le notti di stabilit\u00e0 atmosferica.",
                        en: "Planetary nebulae are small but have high surface brightness: the main risk is not lack of signal but saturation of the central nucleus and loss of internal detail. Use short exposures (30-90s) combined with long exposures in HDR to simultaneously capture the bright core and the fainter outer shells, prioritizing OIII and H\u03b1 filters. A long focal length (>1000mm) is almost always necessary; atmospheric seeing becomes the primary limiting factor, so plan sessions for nights of exceptional atmospheric stability.",
                        es: "Las nebulosas planetarias son peque\u00f1as pero de alta luminosidad superficial: el riesgo principal no es la falta de se\u00f1al sino la saturaci\u00f3n del n\u00facleo y la p\u00e9rdida de detalles internos. Usa poses cortas (30-90s) combinadas en HDR para capturar el n\u00facleo brillante y los cascarones exteriores, priorizando OIII y H\u03b1. Una focal larga (>1000mm) es casi siempre necesaria; aprovecha las noches de m\u00e1xima estabilidad atmosf\u00e9rica.",
                        zh: "\u884c\u661f\u72b6\u661f\u4e91\u4f53\u79ef\u5c0f\u4f46\u8868\u9762\u4eae\u5ea6\u9ad8\uff1a\u4e3b\u8981\u98ce\u9669\u662f\u4e2d\u5fc3\u6838\u5fc3\u8fc7\u66dd\u9970\u548c\u5185\u90e8\u7ec6\u8282\u7684\u4e22\u5931\u3002\u4f7f\u7528\u77ed\u66dd\u5149\uff0830-90\u79d2\uff09\u4e0e HDR \u957f\u66dd\u5149\u7ed3\u5408\uff0c\u4f18\u5148\u4f7f\u7528 OIII \u548c H\u03b1 \u6ee4\u955c\u3002\u9700\u8981\u957f\u7126\u8ddd\uff08>1000mm\uff09\u548c\u826f\u597d\u7684\u5927\u6c14\u89c6\u5b81\u5ea6\u3002"
                    },
                    galassia: {
                        it: "Le galassie sono soggetti broadband per eccellenza: costruisci la tua immagine su una solida base di Luminanza (L), dedicandoci almeno il 50-60% del tempo totale, e completa con i canali RGB per la resa cromatica. Evita qualsiasi forma di inquinamento luminoso e pianifica le sessioni lontano dalla Luna piena; pose da 120-300s a gain moderato sono un buon equilibrio tra rapporto segnale/rumore e gestione delle stelle brillanti nel campo. Se la galassia ha regioni HII visibili nei bracci, un'integrazione aggiuntiva in H\u03b1 da aggiungere al canale rosso pu\u00f2 fare una differenza notevole nel risultato finale.",
                        en: "Galaxies are broadband subjects par excellence: build your image on a solid Luminance (L) base, dedicating at least 50-60% of total time to it, then complete with RGB channels for color rendering. Avoid any form of light pollution and plan sessions away from the full Moon; exposures of 120-300s at moderate gain strike a good balance between signal-to-noise ratio and managing bright stars in the field. If the galaxy has visible HII regions in its arms, an additional H\u03b1 integration added to the red channel can make a remarkable difference to the final result.",
                        es: "Las galaxias son sujetos de banda ancha por excelencia: construye tu imagen sobre una s\u00f3lida base de Luminancia (L), dedic\u00e1ndole al menos el 50-60% del tiempo total, y completa con los canales RGB. Evita la contaminaci\u00f3n lum\u00ednica y planifica las sesiones lejos de la Luna llena; poses de 120-300s a gain moderado son un buen equilibrio. Si la galaxia tiene regiones HII visibles en sus brazos, una integraci\u00f3n adicional en H\u03b1 puede marcar una diferencia notable.",
                        zh: "\u661f\u7cfb\u662f\u5bbf\u5e26\u62cd\u6444\u7684\u5178\u578b\u5bf9\u8c61\uff1a\u4ee5\u5750\u5b9e\u7684\u4eae\u5ea6\u901a\u9053\uff08L\uff09\u4e3a\u57fa\u7840\uff0c\u5c06\u603b\u65f6\u95f4\u7684\u81f3\u5c11 50-60% \u7528\u4e8e\u4eae\u5ea6\u901a\u9053\uff0c\u518d\u7528 RGB \u901a\u9053\u5b8c\u6210\u8272\u5f69\u6e32\u67d3\u3002\u907f\u514d\u5149\u6c61\u67d3\uff0c\u5728\u8fdc\u79bb\u6ee1\u6708\u65f6\u6bb5\u62cd\u6444\uff1b120-300 \u79d2\u4e2d\u7b49\u589e\u76ca\u662f\u826f\u597d\u5e73\u8861\u70b9\u3002\u5982\u679c\u661f\u7cfb\u65cb\u81c2\u4e2d\u5b58\u5728 HII \u533a\u57df\uff0c\u53e0\u52a0\u989d\u5916\u7684 H\u03b1 \u79ef\u5206\u53ef\u4ee5\u663e\u8457\u63d0\u5347\u6700\u7ec8\u6210\u50cf\u6548\u679c\u3002"
                    },
                    globulare: {
                        it: "Gli ammassi globulari concentrano migliaia di stelle in uno spazio angolare ristretto: il nemico principale \u00e8 la saturazione del nucleo, che con pose troppo lunghe diventa una macchia bianca informe. Lavora con pose brevi (15-60s) e considera una strategia HDR \u2014 brevi per il nucleo, lunghe per le stelle periferiche \u2014 da combinare in post-produzione. Una focale medio-lunga (>800mm) e un seeing eccellente sono fondamentali per risolvere le stelle individuali almeno nella corona esterna; il colore delle stelle \u00e8 un dettaglio prezioso che emerge con una buona calibrazione RGB.",
                        en: "Globular clusters pack thousands of stars into a tiny angular space: the main enemy is core saturation, which with exposures that are too long turns into a shapeless white blob. Work with short exposures (15-60s) and consider an HDR strategy \u2014 short for the core, long for the outer stars \u2014 to be combined in post-processing. A medium-long focal length (>800mm) and excellent seeing are essential to resolve individual stars at least in the outer halo; star color is a precious detail that emerges with good RGB calibration.",
                        es: "Los c\u00famulos globulares concentran miles de estrellas en un espacio angular muy reducido: el enemigo principal es la saturaci\u00f3n del n\u00facleo. Trabaja con poses cortas (15-60s) y una estrategia HDR \u2014 cortas para el n\u00facleo, largas para las estrellas perif\u00e9ricas. Una focal medio-larga (>800mm) y un seeing excelente son fundamentales para resolver estrellas individuales; el color de las estrellas es un detalle precioso con una buena calibraci\u00f3n RGB.",
                        zh: "\u7403\u72b6\u661f\u56e2\u5c06\u6570\u5343\u9897\u6052\u661f\u96c6\u4e2d\u5728\u6781\u5c0f\u7684\u89d2\u7a7a\u95f4\u5185\uff1a\u4e3b\u8981\u95ee\u9898\u662f\u6838\u5fc3\u9971\u548c\u3002\u4f7f\u7528\u77ed\u66dd\u5149\uff0815-60\u79d2\uff09\uff0c\u5e76\u91c7\u7528 HDR \u7b56\u7565\u5206\u4e24\u7ec4\u62cd\u6444\u2014\u2014\u77ed\u66dd\u5149\u9488\u5bf9\u6838\u5fc3\uff0c\u957f\u66dd\u5149\u9488\u5bf9\u5916\u56f4\u6052\u661f\u3002\u4e2d\u957f\u7126\u8ddd\uff08>800mm\uff09\u548c\u51fa\u8272\u7684\u89c6\u5b81\u5ea6\u662f\u5206\u8fa8\u6052\u661f\u7684\u5fc5\u8981\u6761\u4ef6\u3002"
                    },
                    aperto: {
                        it: "Gli ammassi aperti sono soggetti visivamente gratificanti ma tecnicamente sottovalutati: la sfida principale \u00e8 preservare i colori stellari reali, che spandono dall'azzurro delle stelle giovani all'arancione delle giganti evolute. Usa pose brevi (30-120s) per non saturare le stelle pi\u00f9 brillanti, con una calibrazione RGB accurata; un'acquisizione L-RGB restituisce risultati pi\u00f9 puliti rispetto al solo broadband OSC in contesti di cielo mediocre. Scegli la focale in base alla dimensione dell'ammasso: per oggetti grandi (>1\u00b0) un grandangolare contestualizza meglio il campo stellare circostante.",
                        en: "Open clusters are visually rewarding but technically underestimated: the main challenge is preserving the true stellar colors, which range from the blue of young stars to the orange of evolved giants. Use short exposures (30-120s) to avoid saturating the brightest stars, with accurate RGB calibration; an L-RGB acquisition delivers cleaner results than OSC broadband alone under mediocre skies. Choose the focal length based on the cluster's size: for large objects (>1\u00b0) a wide-angle contextualizes the surrounding star field more effectively.",
                        es: "Los c\u00famulos abiertos son visualmente gratificantes pero t\u00e9cnicamente subestimados: preservar los colores estelares reales es el principal desaf\u00edo. Usa poses cortas (30-120s) con calibraci\u00f3n RGB precisa; L-RGB ofrece resultados m\u00e1s limpios que OSC bajo cielos mediocres. Elige la focal seg\u00fan el tama\u00f1o del c\u00famulo: para objetos grandes (>1\u00b0) usa gran angular.",
                        zh: "\u758f\u6563\u661f\u56e2\u89c6\u89c9\u6548\u679c\u597d\uff0c\u4f46\u6280\u672f\u6311\u6218\u5e38\u88ab\u4f4e\u4f30\uff1a\u4fdd\u7559\u771f\u5b9e\u661f\u8272\u662f\u4e3b\u8981\u96be\u70b9\u3002\u4f7f\u7528\u77ed\u66dd\u5149\uff0830-120\u79d2\uff09\u914d\u5408\u7cbe\u786e RGB \u6821\u51c6\uff1bL-RGB \u91c7\u96c6\u5728\u5929\u7a7a\u6761\u4ef6\u4e00\u822c\u65f6\u6bd4\u7eaf OSC \u5bbf\u5e26\u66f4\u5e72\u51c0\u3002\u6839\u636e\u661f\u56e2\u5927\u5c0f\u9009\u62e9\u7126\u8ddd\uff1a\u5927\u5c3a\u5ea6\u76ee\u6807\u4f7f\u7528\u5e7f\u89d2\u955c\u5934\u3002"
                    },
                    hii: {
                        it: "Le regioni HII sono fabbriche di stelle ionizzate dal gas caldo: emettono prevalentemente in H\u03b1, con una componente OIII variabile a seconda dell'et\u00e0 e della temperatura delle stelle ionizzanti. I filtri a banda stretta (H\u03b1 + OIII) sono la scelta ottimale e ti permettono di lavorare anche in presenza di Luna; con una camera OSC, un filtro Dual-Band \u00e8 il compromesso pi\u00f9 efficace. Pose da 180-300s con gain unity e un'integrazione totale di almeno 8-10 ore ti garantiranno un segnale pulito; se l'oggetto include pilastri o strutture di polvere scura, un'esposizione aggiuntiva in SII pu\u00f2 rivelare dettagli altrimenti invisibili.",
                        en: "HII regions are nurseries of ionized stars: they emit predominantly in H\u03b1, with a variable OIII component depending on the age and temperature of the ionizing stars. Narrowband filters (H\u03b1 + OIII) are the optimal choice and allow you to work even in the presence of the Moon; with an OSC camera, a Dual-Band filter is the most effective compromise. Exposures of 180-300s at unity gain and a total integration of at least 8-10 hours will ensure a clean signal; if the object includes pillars or dark dust structures, an additional SII exposure can reveal compositional gas details that are otherwise invisible.",
                        es: "Las regiones HII son guarder\u00edas de estrellas ionizadas: emiten predominantemente en H\u03b1, con OIII variable. Los filtros de banda estrecha (H\u03b1 + OIII) son la elecci\u00f3n \u00f3ptima, incluso con Luna; con OSC, usa Dual-Band. Poses de 180-300s con gain unity y al menos 8-10 horas de integraci\u00f3n garantizan una se\u00f1al limpia; una exposici\u00f3n adicional en SII puede revelar detalles de polvos oscuros.",
                        zh: "HII \u533a\u662f\u96fb\u79bb\u6052\u661f\u7684\u6447\u7bf9\uff1a\u4e3b\u8981\u5728 H\u03b1 \u6ce2\u6bb5\u53d1\u5149\uff0cOIII \u6210\u5206\u56e0\u7535\u79bb\u6052\u661f\u7684\u5e74\u9f84\u548c\u6e29\u5ea6\u800c\u6709\u5dee\u5f02\u3002\u7a84\u5e26\u6ee4\u955c\uff08H\u03b1 + OIII\uff09\u5373\u4f7f\u6709\u6708\u5149\u4e5f\u80fd\u62cd\u6444\uff1bOSC \u76f8\u673a\u4f7f\u7528\u53cc\u9891\u5e26\u6ee4\u955c\u3002180-300 \u79d2\u66dd\u5149\u914d\u5408 Unity Gain\uff0c\u603b\u79ef\u5206\u65f6\u95f4\u81f3\u5c11 8-10 \u5c0f\u65f6\uff1b\u989d\u5916\u7684 SII \u66dd\u5149\u53ef\u63ed\u793a\u5426\u5219\u4e0d\u53ef\u89c1\u7684\u6c14\u4f53\u6210\u5206\u7ec6\u8282\u3002"
                    }
                };

                // Rilevamento categoria: prima dal nome (catalogo), poi dal tipo SIMBAD
                let _cat = null;
                const _n = _objName.replace(/\s+/g, '');
                if (_n.startsWith('SH2') || _objName.startsWith('SH 2-') || _objName.startsWith('SH2-')) _cat = 'sh2';
                else if (_n.startsWith('LBN')) _cat = 'lbn';
                else if (_n.startsWith('LDN')) _cat = 'ldn';
                else if (_n.startsWith('VDB') || _objName.startsWith('VD B')) _cat = 'vdb';
                else if (_tLow.includes('supernova') || _tLow.includes('snr') || _tLow.includes('resto di')) _cat = 'snr';
                else if (_tLow.includes('planetaria') || _tLow.includes('planetary')) _cat = 'planetaria';
                else if (_tLow.includes('galassi') || _tLow.includes('galax')) _cat = 'galassia';
                else if (_tLow.includes('globulare') || _tLow.includes('globular')) _cat = 'globulare';
                else if (_tLow.includes('aperto') || _tLow.includes('open cluster')) _cat = 'aperto';
                else if (_tLow.includes('h ii') || _tLow.includes('hii') || _tLow.includes('emissio') || _tLow.includes('emission')) _cat = 'hii';
                else if (_tLow.includes('riflessione') || _tLow.includes('reflection')) _cat = 'vdb';
                else if (_tLow.includes('oscura') || _tLow.includes('dark nebula')) _cat = 'ldn';

                if (_cat && _catTips[_cat]) {
                    rawTips = _catTips[_cat][_lang] || _catTips[_cat]['it'];
                } else {
                    const _fb = { it: 'Nessun consiglio disponibile per questo tipo di oggetto.', en: 'No tip available for this object type.', es: 'No hay consejo disponible para este tipo de objeto.', zh: '\u6682\u65e0\u6b64\u7c7b\u578b\u5929\u4f53\u7684\u62cd\u6444\u5efa\u8bae\u3002' };
                    rawTips = _fb[_lang] || _fb['it'];
                }
            }
            document.getElementById('target-tips').innerText = rawTips;
            let wl = document.getElementById('target-wiki'); if(targetSelezionato.link) { wl.href = targetSelezionato.link; wl.style.display = 'inline-block'; } else wl.style.display = 'none';
            
            // CALCOLO ASTRONOMICO E REGOLA DEI 30 GRADI
            let dOggi = new Date(); if (dOggi.getHours() < 12) dOggi.setDate(dOggi.getDate() - 1); 
            let atStart = SunCalc.getTimes(dOggi, latCorrente, lonCorrente);
            let dDomani = new Date(dOggi.getTime() + 86400000); let atEnd = SunCalc.getTimes(dDomani, latCorrente, lonCorrente);
            let ft = (x) => x && !isNaN(x) ? x.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '--:--';
            
            document.getElementById('info-sunset').innerText = ft(atStart.sunset); 
            document.getElementById('info-nightstart').innerText = ft(atStart.night); 
            document.getElementById('info-nightend').innerText = ft(atEnd.nightEnd); 
            document.getElementById('info-sunrise').innerText = ft(atEnd.sunrise);

            // ── CALCOLO MERIDIAN FLIP (analitico) ────────────────────────────────
            (function() {
                let mfEl = document.getElementById('info-meridianflip');
                if (!mfEl || targetSelezionato.ra == null) { if(mfEl) mfEl.innerText = '--:--'; return; }
                try {
                    let midnightUTC = Date.UTC(dOggi.getFullYear(), dOggi.getMonth(), dOggi.getDate(), 0, 0, 0);
                    let jd0  = midnightUTC / 86400000 + 2440587.5;
                    let d0   = jd0 - 2451545.0;
                    let gmst0 = ((280.46061837 + 360.98564736629 * d0) % 360 + 360) % 360;
                    let lst0  = ((gmst0 + lonCorrente) % 360 + 360) % 360;
                    let raDeg = targetSelezionato.ra * 15;
                    let diff  = ((raDeg - lst0) % 360 + 360) % 360;
                    let transitHoursUTC = diff / 15.04107;
                    let flipTime = new Date(midnightUTC + transitHoursUTC * 3600000);
                    let sunsetMs  = (atStart.sunset  || atStart.dusk  || new Date(midnightUTC + 21*3600000)).getTime();
                    let sunriseMs = (atEnd.sunrise   || atEnd.dawn    || new Date(midnightUTC + 43*3600000)).getTime();
                    if (flipTime.getTime() < sunsetMs) flipTime = new Date(flipTime.getTime() + 86400000);
                    if (flipTime.getTime() > sunriseMs + 3600000) {
                        mfEl.innerText = t('meridian_flip_outside'); mfEl.style.color = '#666'; mfEl.title = ''; return;
                    }
                    // formatter manuale: niente toLocaleTimeString per evitare bug con locale sistema
                    let fmtHHMM = (d) => ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
                    let hhmm = fmtHHMM(flipTime);
                    mfEl.innerText = hhmm;
                    let tS = document.getElementById('time-start').value;
                    let tE = document.getElementById('time-end').value;
                    if (tS && tE) {
                        let base  = '1970-01-01T';
                        let sDate = new Date(base + tS + ':00');
                        let eDate = new Date(base + tE + ':00');
                        let fDate = new Date(base + hhmm + ':00');
                        if (eDate <= sDate) eDate.setDate(eDate.getDate() + 1);
                        if (fDate < sDate)  fDate.setDate(fDate.getDate() + 1);
                        if (fDate >= sDate && fDate <= eDate) {
                            mfEl.style.color = '#ff4444'; mfEl.title = t('meridian_flip_warn');
                        } else {
                            mfEl.style.color = '#ffaa00'; mfEl.title = t('meridian_flip_ok');
                        }
                    }
                } catch(e) { console.warn('[MF]', e); mfEl.innerText = '--:--'; }
            })();
            // ─────────────────────────────────────────────────────────────────────
            
            let nS = atStart.night || atStart.sunset; let nE = atEnd.nightEnd || atEnd.sunrise;
            let cur = new Date(nS.getTime()); let maxA = -90; let currentBlock = { start: null, end: null }; let bestBlock = { start: null, end: null, duration: 0 }; let isAbove = false;
            
            // Simula l'intera nottata a scatti di 10 minuti per trovare la finestra migliore sopra i 30°
            while(cur <= nE) {
                let a = calcolaAltAz(targetSelezionato.ra, targetSelezionato.dec, latCorrente, lonCorrente, cur).alt;
                if(a > maxA) maxA = a;
                if(a >= 30) { if(!isAbove) { currentBlock.start = new Date(cur); isAbove = true; } currentBlock.end = new Date(cur); } 
                else { if(isAbove) { let dur = currentBlock.end.getTime() - currentBlock.start.getTime(); if(dur > bestBlock.duration) { bestBlock = { start: currentBlock.start, end: currentBlock.end, duration: dur }; } isAbove = false; } }
                cur.setMinutes(cur.getMinutes() + 10);
            }
            if(isAbove) { let dur = currentBlock.end.getTime() - currentBlock.start.getTime(); if(dur > bestBlock.duration) { bestBlock = { start: currentBlock.start, end: currentBlock.end, duration: dur }; } }
            
            // Assegna la finestra calcolata agli input
            if(bestBlock.duration > 0) { document.getElementById('time-start').value = ft(bestBlock.start); document.getElementById('time-end').value = ft(bestBlock.end); } 
            else { document.getElementById('time-start').value = ft(nS); document.getElementById('time-end').value = ft(nE); }

            // Generazione Mappa Stellare
            if (!aladinSkyMap) {
                aladinSkyMap = A.aladin('#aladin-lite-div', {
                    survey: "P/DSS2/color",
                    fov: 2,
                    target: (targetSelezionato.ra * 15) + " " + targetSelezionato.dec,
                    showReticle: false,
                    showZoomControl: false,
                    showFullscreenControl: false,
                    showLayersControl: false,
                    showGotoControl: false,
                    showFrame: false,
                    showCoordinatesGrid: false
                });
                aladinSkyMap.on('positionChanged', function(pos) {
                    aggiornaCoordinateFOV(pos.ra, pos.dec);
                });
                // Imposta subito le coordinate del target senza aspettare il primo movimento
                aggiornaCoordinateFOVdaTarget();
                setTimeout(() => { toggleMosaic(); }, 300);
            } else {
                setTimeout(() => {
                    fovCenterOverride = null;
                    aladinSkyMap.gotoRaDec(targetSelezionato.ra * 15, targetSelezionato.dec);
                    aggiornaCoordinateFOVdaTarget();
                    toggleMosaic();
                }, 100); 
            }
            
            disegnaGraficoAltezza(); toggleSensorMode(); calcolaTempi(); window.scrollTo(0,0);
        }

        function tornaDashboard() { document.getElementById('planning-view').style.display = 'none'; document.getElementById('dashboard-view').style.display = 'block'; document.getElementById('search-dash-input').value = ''; document.getElementById('search-plan-input').value = ''; sessionStorage.removeItem('ad_current_target'); }
        function applicaPresetTelescopio() { let v = document.getElementById('preset-telescope').value; if(v){ let p = v.split(','); document.getElementById('focal-length').value = p[0]; document.getElementById('aperture').value = p[1] || 100; aggiornaFOV(); } }
        

        // --- MOTORE MOSAICO ---
        function toggleMosaic() {
            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            document.getElementById('mosaic-settings').style.display = isMosaic ? 'flex' : 'none';
            document.getElementById('mosaic-fov-result').style.display = isMosaic ? 'block' : 'none';
            document.getElementById('btn-export-nina').style.display = isMosaic ? 'none' : 'inline-block';
            let btnAsiair = document.getElementById('btn-export-asiair'); if(btnAsiair) btnAsiair.style.display = isMosaic ? 'none' : 'inline-block';
            document.getElementById('btn-report-mosaic').style.display = isMosaic ? 'inline-block' : 'none';
            document.getElementById('nina-mosaic-msg').style.display = isMosaic ? 'block' : 'none';
            document.getElementById('mosaic-total-badge').style.display = isMosaic ? 'inline-block' : 'none';
            aggiornaFOV(); 
            calcolaTempi(); 
        }

        function aggiornaFOV() {
            let fl = parseFloat(document.getElementById('focal-length').value) || 1000;
            let sw = parseFloat(document.getElementById('sensor-width').value) || 23.5;
            let sh = parseFloat(document.getElementById('sensor-height').value) || 15.6;
            
            let pixelSize = parseFloat(document.getElementById('pixel-size').value) || 3.76;
            let currentBIN = parseInt(document.querySelector('.bin-btn.bin-active')?.dataset?.bin || '1');
            let samplingNative = (pixelSize / fl) * 206.265;
            let sampling = samplingNative * currentBIN;
            
            document.getElementById('sampling-result').innerText = samplingNative.toFixed(2) + ' "/px  (BIN 1×1)';
            let posPct = (sampling / 4.0) * 100; if(posPct > 100) posPct = 100;
            document.getElementById('sampling-marker').style.left = posPct + '%';
            
            let sMsg = document.getElementById('sampling-msg');
            if (sampling < 0.67) { sMsg.innerText = t("oversampled"); sMsg.style.color = "#ff4444"; } 
            else if (sampling >= 0.67 && sampling <= 2.0) { sMsg.innerText = t("ideal_sampling"); sMsg.style.color = "#44ff44"; } 
            else { sMsg.innerText = t("undersampled"); sMsg.style.color = "#ffaa00"; }

            // Riga BIN result
            let binRes = document.getElementById('sampling-bin-result');
            if (binRes && currentBIN > 1) {
                let col = sampling < 0.67 ? "#ff4444" : sampling <= 2.0 ? "#44ff44" : "#ffaa00";
                binRes.innerHTML = `Con BIN ${currentBIN}×${currentBIN}: <b style="color:${col}">${sampling.toFixed(2)} "/px</b>`;
            } else if (binRes) {
                binRes.innerHTML = '';
            }

            let fW = (2 * Math.atan(sw / (2 * fl)) * (180 / Math.PI));
            let fH = (2 * Math.atan(sh / (2 * fl)) * (180 / Math.PI));
            document.getElementById('fov-result').innerText = `${fW.toFixed(2)}° x ${fH.toFixed(2)}°`;

            let isMosaic = document.getElementById('capture-mode').value === 'mosaic';
            let mx = 1, my = 1, overlap = 0;
            let totFovW = fW, totFovH = fH;

            if (isMosaic) {
                mx = parseInt(document.getElementById('mosaic-x').value) || 1;
                my = parseInt(document.getElementById('mosaic-y').value) || 1;
                overlap = (parseFloat(document.getElementById('mosaic-overlap').value) || 20) / 100;
                
                totFovW = fW * mx - fW * (mx - 1) * overlap;
                totFovH = fH * my - fH * (my - 1) * overlap;
                document.getElementById('mosaic-fov-result').innerText = `Totale: ${totFovW.toFixed(2)}° x ${totFovH.toFixed(2)}°`;
            }

            let maxFov = Math.max(totFovW, totFovH);
            let cw = document.getElementById('fov-simulator-container').clientWidth;
            let cm = 2.5 / (parseFloat(document.getElementById('fov-zoom').value) / 100); 
            if (aladinSkyMap) { aladinSkyMap.setFoV(Math.max(0.01, maxFov * cm)); }

            let fovContainer = document.getElementById('fov-rectangle');
            fovContainer.innerHTML = ''; 
            fovContainer.style.border = "none";
            
            let aladinCurrentFov = Math.max(0.01, maxFov * cm);
            let pxPerDegree = cw / aladinCurrentFov;
            
            let rw = fW * pxPerDegree;
            let rh = fH * pxPerDegree;
            let stepPxX = rw * (1 - overlap);
            let stepPxY = rh * (1 - overlap);
            let totalW_px = rw + (mx - 1) * stepPxX;
            let totalH_px = rh + (my - 1) * stepPxY;

            let rot = parseFloat(document.getElementById('fov-rotation').value) || 0;
            
            fovContainer.style.width = totalW_px + "px";
            fovContainer.style.height = totalH_px + "px";
            fovContainer.style.left = "50%";
            fovContainer.style.top = "50%";
            fovContainer.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
            fovContainer.style.transformOrigin = "center center";

            for (let i = 0; i < mx; i++) {
                for (let j = 0; j < my; j++) {
                    let panel = document.createElement('div');
                    panel.style.position = "absolute";
                    panel.style.width = rw + "px";
                    panel.style.height = rh + "px";
                    panel.style.left = (i * stepPxX) + "px";
                    panel.style.top = (j * stepPxY) + "px";
                    panel.style.border = "2px solid #ff4444";
                    panel.style.boxSizing = "border-box";
                    panel.style.boxShadow = "inset 0 0 10px rgba(255, 68, 68, 0.3)";
                    
                    let pNum = document.createElement('span');
                    pNum.innerText = (j * mx + i + 1);
                    pNum.style.position = "absolute";
                    pNum.style.top = "2px";
                    pNum.style.left = "4px";
                    pNum.style.color = "#ff4444";
                    pNum.style.fontWeight = "bold";
                    pNum.style.fontSize = "12px";
                    
                    panel.appendChild(pNum);
                    fovContainer.appendChild(panel);
                }
            }

            let fovWarning = document.getElementById('fov-warning-msg');
            if (targetSelezionato && targetSelezionato.size) {
                let currentTotalArcmin = Math.min(totFovW, totFovH) * 60; 
                if (targetSelezionato.size > (currentTotalArcmin * 0.9)) { 
                    fovWarning.setAttribute('data-i18n', 'fov_warning');
                    fovWarning.style.display = 'block'; 
                    fovWarning.style.color = '#ffaa00';
                    fovWarning.innerHTML = t('fov_warning');
                } else { 
                    if (isMosaic) {
                        fovWarning.setAttribute('data-i18n', 'mosaic_active_msg');
                        fovWarning.style.display = 'block';
                        fovWarning.style.color = '#bb86fc';
                        fovWarning.innerHTML = t('mosaic_active_msg');
                    } else {
                        fovWarning.style.display = 'none'; 
                    }
                }
            } else { 
                if (isMosaic) {
                    fovWarning.setAttribute('data-i18n', 'mosaic_active_msg');
                    fovWarning.style.display = 'block';
                    fovWarning.style.color = '#bb86fc';
                    fovWarning.innerHTML = t('mosaic_active_msg');
                } else {
                    fovWarning.style.display = 'none'; 
                }
            }
        }

        // ── COORDINATE CENTRO FOV ──────────────────────────────────────────────
        function _raGradiToSex(raDeg) {
            // Aladin restituisce RA in gradi (0-360); convertiamo in ore:min:sec
            let raH = raDeg / 15;
            let h = Math.floor(raH);
            let mRaw = (raH - h) * 60;
            let m = Math.floor(mRaw);
            let s = ((mRaw - m) * 60).toFixed(1);
            return `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(4,'0')}s`;
        }
        function _decGradiToSex(decDeg) {
            let neg = decDeg < 0;
            let a = Math.abs(decDeg);
            let d = Math.floor(a);
            let mRaw = (a - d) * 60;
            let m = Math.floor(mRaw);
            let s = ((mRaw - m) * 60).toFixed(0);
            return `${neg ? '-' : '+'}${String(d).padStart(2,'0')}° ${String(m).padStart(2,'0')}′ ${String(s).padStart(2,'0')}″`;
        }

        function aggiornaCoordinateFOV(raDeg, decDeg) {
            // raDeg e decDeg in gradi decimali (come restituisce Aladin positionChanged)
            let raEl  = document.getElementById('fov-ra-display');
            let decEl = document.getElementById('fov-dec-display');
            let badge = document.getElementById('fov-offset-badge');
            if (!raEl) return;

            raEl.textContent  = _raGradiToSex(raDeg);
            decEl.textContent = _decGradiToSex(decDeg);

            // Salva override (RA in gradi decimali, Dec in gradi decimali)
            fovCenterOverride = { raDeg: raDeg, decDeg: decDeg };

            // Badge offset: confronta con coordinate originali target (tolleranza 0.01°)
            if (targetSelezionato) {
                let origRaDeg = targetSelezionato.ra * 15; // ra è in ore nel target
                let origDecDeg = targetSelezionato.dec;
                let distRa  = Math.abs(raDeg  - origRaDeg);
                let distDec = Math.abs(decDeg - origDecDeg);
                let isOffset = (distRa > 0.01 || distDec > 0.01);
                if (badge) badge.style.display = isOffset ? 'inline-block' : 'none';
            }
        }

        function aggiornaCoordinateFOVdaTarget() {
            // Resetta il display alle coordinate originali del target
            if (!targetSelezionato) return;
            fovCenterOverride = null;
            let raEl  = document.getElementById('fov-ra-display');
            let decEl = document.getElementById('fov-dec-display');
            let badge = document.getElementById('fov-offset-badge');
            if (raEl) raEl.textContent  = _raGradiToSex(targetSelezionato.ra * 15);
            if (decEl) decEl.textContent = _decGradiToSex(targetSelezionato.dec);
            if (badge) badge.style.display = 'none';
        }

        function resetFovCenter() {
            if (!targetSelezionato || !aladinSkyMap) return;
            aladinSkyMap.gotoRaDec(targetSelezionato.ra * 15, targetSelezionato.dec);
            aggiornaCoordinateFOVdaTarget();
        }
        // ─────────────────────────────────────────────────────────────────────────

        function disegnaGraficoAltezza() {
            if (!targetSelezionato) return; if (chartAltezza) chartAltezza.destroy();
            let lbl = [], dat = [], d = new Date(), sd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 18, 0, 0);
            for (let i = 0; i <= 12; i++) { let fd = new Date(sd.getTime() + i*3600000); lbl.push(fd.getHours() + "h"); dat.push(Math.max(0, calcolaAltAz(targetSelezionato.ra, targetSelezionato.dec, latCorrente, lonCorrente, fd).alt)); }
            chartAltezza = new Chart(document.getElementById('altitudeChart').getContext('2d'), { type: 'line', data: { labels: lbl, datasets: [{ label: 'Alt (°)', data: dat, borderColor: '#bb86fc', backgroundColor: 'rgba(187, 134, 252, 0.3)', tension: 0.4, fill: true, pointRadius: 2, borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 90, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa', font: { size: 10 }, stepSize: 30 } }, x: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 10 }, maxRotation: 0 } } }, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, layout: { padding: 0 } } });
        }



        function selezionaBIN(bin) {
            // Aggiorna pulsante attivo
            document.querySelectorAll('.bin-btn').forEach(b => {
                b.classList.toggle('bin-active', parseInt(b.dataset.bin) === bin);
            });
            // Ricalcola campionamento
            aggiornaFOV();
            // Propaga BIN a tutti i filtri nella griglia Smart
            let binStr = bin + 'x' + bin;
            document.querySelectorAll('[id$="-bin"]').forEach(sel => {
                // Cerca l'opzione corrispondente nel select
                for (let opt of sel.options) {
                    if (opt.value === binStr || opt.text === binStr ||
                        opt.value === String(bin) || opt.text === String(bin)) {
                        sel.value = opt.value;
                        break;
                    }
                }
            });
        }