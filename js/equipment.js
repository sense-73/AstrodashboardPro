// equipment.js — Database attrezzatura, preset telescopio e sensore
// ============================================================

        const dbTelescopiBase = [
            { nome: "Samyang 135mm f/2",         focale: 135,  diametro: 67,  otaType: "photo",   deltaT: 10  },
            { nome: "Explore Scientific Comet Hunter 152", focale: 731, diametro: 152, otaType: "newton", deltaT: 4.0 },  // Mak-Newton f/4.8
            { nome: "ZWO Seestar S50",           focale: 250,  diametro: 50,  otaType: "special", deltaT: 10  },
            { nome: "ZWO FF65 APO",              focale: 416,  diametro: 65,  otaType: "apo",     deltaT: 2.0 },
            { nome: "William Optics RedCat 51",              focale: 250,  diametro: 51,  otaType: "apo",     deltaT: 2.0 },
            { nome: "William Optics RedCat 71",              focale: 350,  diametro: 71,  otaType: "apo",     deltaT: 2.0 },
            { nome: "William Optics ZenithStar 81",          focale: 559,  diametro: 81,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar FMA180",              focale: 180,  diametro: 40,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar FRA300 Pro",          focale: 300,  diametro: 60,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar FRA400",              focale: 400,  diametro: 72,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar FRA500",              focale: 500,  diametro: 90,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar 107PHQ",              focale: 749,  diametro: 107, otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Evoguide 50ED",          focale: 242,  diametro: 50,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Sky-Watcher 72ED Evostar",           focale: 420,  diametro: 72,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Sky-Watcher 80ED Evostar",           focale: 600,  diametro: 80,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Sky-Watcher Esprit 80ED",            focale: 400,  diametro: 80,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Esprit 100ED",           focale: 550,  diametro: 100, otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Esprit 120ED",           focale: 840,  diametro: 120, otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Explorer 130 PDS",       focale: 650,  diametro: 130, otaType: "newton",  deltaT: 4.0 },
            { nome: "Sky-Watcher Explorer 150PDS",        focale: 750,  diametro: 150, otaType: "newton",  deltaT: 4.0 },
            { nome: "Sky-Watcher Quattro 150P",           focale: 600,  diametro: 150, otaType: "newton",  deltaT: 4.0 },
            { nome: "Sky-Watcher Quattro 200P",           focale: 800,  diametro: 200, otaType: "newton",  deltaT: 4.0 },
            { nome: "Celestron RASA 8",          focale: 400,  diametro: 203, otaType: "sct",     deltaT: 1.0 },
            { nome: "Celestron RASA 11",         focale: 620,  diametro: 279, otaType: "sct",     deltaT: 1.0 },
            { nome: "Celestron EdgeHD 8",        focale: 2032, diametro: 203, otaType: "sct",     deltaT: 0.8 },
            { nome: "Celestron EdgeHD 8 @ f/7",  focale: 1422, diametro: 203, otaType: "sct",     deltaT: 0.8 },
            { nome: "Celestron C8 SCT",          focale: 2032, diametro: 203, otaType: "sct",     deltaT: 0.8 },
            { nome: "Celestron C8 @ f/6.3",      focale: 1280, diametro: 203, otaType: "sct",     deltaT: 0.8 },
            // ── 9.0: telescopi aggiunti (schede produttori / guide 2026) ──
            { nome: "ZWO Seestar S30",            focale: 150,  diametro: 30,  otaType: "special", deltaT: 10 },
            { nome: "ZWO Seestar S30 Pro",        focale: 160,  diametro: 30,  otaType: "special", deltaT: 10 },
            { nome: "ZWO FF80 APO",               focale: 600,  diametro: 80,  otaType: "apo",     deltaT: 2.0 },
            { nome: "ZWO FF107 APO",              focale: 749,  diametro: 107, otaType: "apo",     deltaT: 2.0 },
            { nome: "DwarfLab DWARF 3",           focale: 150,  diametro: 35,  otaType: "special", deltaT: 10 },
            { nome: "Vaonis Vespera II",          focale: 250,  diametro: 50,  otaType: "special", deltaT: 10 },
            { nome: "Celestron Origin (RASA 6)",  focale: 335,  diametro: 152, otaType: "sct",     deltaT: 1.0 },
            { nome: "Celestron EdgeHD 11",        focale: 2800, diametro: 280, otaType: "sct",     deltaT: 0.8 },
            { nome: "Askar SQA55",                focale: 264,  diametro: 55,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar 71F",                  focale: 490,  diametro: 71,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar 103APO",               focale: 700,  diametro: 103, otaType: "apo",     deltaT: 2.0 },
            { nome: "Askar FRA600",               focale: 600,  diametro: 108, otaType: "apo",     deltaT: 2.0 },
            { nome: "William Optics RedCat 61",               focale: 300,  diametro: 61,  otaType: "apo",     deltaT: 2.0 },
            { nome: "William Optics Cat 91",                  focale: 450,  diametro: 91,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Evolux 62ED",             focale: 400,  diametro: 62,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Sky-Watcher Evolux 82ED",             focale: 530,  diametro: 82,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Sky-Watcher Esprit 150ED",            focale: 1050, diametro: 150, otaType: "apo",     deltaT: 2.0 },
            { nome: "Sky-Watcher Explorer 200PDS",         focale: 1000, diametro: 200, otaType: "newton",  deltaT: 4.0 },
            { nome: "Svbony SV503 80ED",          focale: 560,  diametro: 80,  otaType: "apo",     deltaT: 2.5 },
            { nome: "Svbony SV503 102ED",         focale: 714,  diametro: 102, otaType: "apo",     deltaT: 2.5 },
            { nome: "Apertura 75Q",               focale: 405,  diametro: 75,  otaType: "apo",     deltaT: 2.0 },
            { nome: "Apertura CarbonStar 150",    focale: 600,  diametro: 150, otaType: "newton",  deltaT: 4.0 },
            { nome: "Apertura CarbonStar 200",    focale: 800,  diametro: 200, otaType: "newton",  deltaT: 4.0 },
        ];

        // ── Mappa globale nome→{otaType,deltaT} per lookup rapido ──────────────
        // Viene aggiornata da popolaMenuAttrezzatura() ad ogni caricamento/modifica.
        // Non tocca il value delle option né il localStorage — zero impatto su tutto il resto.
        window._telOtaMap = {};

        const dbCamereBase = [

            // ── SONY IMX — Chip generici (usati da molti produttori) ──────────
            { nome: "Sony IMX178  (6.4MP  1/1.8\")",  w:  7.37, h:  4.92, p: 2.4  },
            { nome: "Sony IMX183  (20MP   1\")",       w: 13.2,  h:  8.8,  p: 2.4  },
            { nome: "Sony IMX290  (2MP    1/2.8\")",   w:  5.64, h:  3.17, p: 2.9  },
            { nome: "Sony IMX294  (11MP   4/3\")",     w: 19.1,  h: 13.0,  p: 4.63 },
            { nome: "Sony IMX432  (9MP    1\" sq)",    w: 12.8,  h: 10.7,  p: 9.0  },
            { nome: "Sony IMX462  (2MP    1/2.8\")",   w:  6.46, h:  4.72, p: 2.9  },
            { nome: "Sony IMX464  (8.3MP  4/3\")",     w:  9.55, h:  7.17, p: 2.9  },
            { nome: "Sony IMX485  (8.3MP  1\")",       w: 13.0,  h:  8.7,  p: 2.9  },
            { nome: "Sony IMX533  (9MP    1\" sq)",    w: 11.31, h: 11.31, p: 3.76 },
            { nome: "Sony IMX571  (26MP   APS-C)",     w: 23.5,  h: 15.7,  p: 3.76 },
            { nome: "Sony IMX585  (8.3MP  4/3\")",     w: 11.14, h:  6.26, p: 2.9  },
            { nome: "Sony IMX662  (4MP    1/2.8\")",   w:  7.68, h:  4.32, p: 2.9  },
            { nome: "Sony IMX715  (8MP    1/2.8\")",   w:  7.56, h:  5.35, p: 1.85 },
            { nome: "Sony IMX455  (61MP   FF)",        w: 36.0,  h: 24.0,  p: 3.76 },

            // ── ZWO ASI — Planetarie / EAA ────────────────────────────────────
            { nome: "ZWO ASI120MC",                    w:  4.8,  h:  3.6,  p: 3.75, tipo: "C" },
            { nome: "ZWO ASI120MM",                    w:  4.8,  h:  3.6,  p: 3.75, tipo: "M" },
            { nome: "ZWO ASI174MC",                    w: 11.3,  h:  7.1,  p: 5.86, tipo: "C" },
            { nome: "ZWO ASI174MM",                    w: 11.3,  h:  7.1,  p: 5.86, tipo: "M" },
            { nome: "ZWO ASI178MC",                    w:  7.37, h:  4.92, p: 2.4, tipo: "C" },
            { nome: "ZWO ASI178MM",                    w:  7.37, h:  4.92, p: 2.4, tipo: "M" },
            { nome: "ZWO ASI224MC",                    w:  4.9,  h:  3.7,  p: 3.75, tipo: "C" },
            { nome: "ZWO ASI290MC",                    w:  5.64, h:  3.17, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI290MM",                    w:  5.64, h:  3.17, p: 2.9, tipo: "M" },
            { nome: "ZWO ASI385MC",                    w:  7.4,  h:  4.16, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI462MC",                    w:  6.46, h:  4.72, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI662MC",                    w:  7.68, h:  4.32, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI715MC",                    w:  7.56, h:  5.35, p: 1.85, tipo: "C" },

            // ── ZWO ASI — Deep Sky ────────────────────────────────────────────
            { nome: "ZWO ASI183MC (1\")",              w: 13.2,  h:  8.8,  p: 2.4, tipo: "C" },
            { nome: "ZWO ASI183MM (1\")",              w: 13.2,  h:  8.8,  p: 2.4, tipo: "M" },
            { nome: "ZWO ASI294MC (4/3\")",            w: 19.1,  h: 13.0,  p: 4.63, tipo: "C" },
            { nome: "ZWO ASI294MM (4/3\")",            w: 19.1,  h: 13.0,  p: 4.63, tipo: "M" },
            { nome: "ZWO ASI432MM",                    w: 12.8,  h: 10.7,  p: 9.0, tipo: "M" },
            { nome: "ZWO ASI485MC",                    w: 13.0,  h:  8.7,  p: 2.9, tipo: "C" },
            { nome: "ZWO ASI533MC (sq)",               w: 11.31, h: 11.31, p: 3.76, tipo: "C" },
            { nome: "ZWO ASI533MM (sq)",               w: 11.31, h: 11.31, p: 3.76, tipo: "M" },
            { nome: "ZWO ASI585MC",                    w: 11.14, h:  6.26, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI1600MC (4/3\")",           w: 17.7,  h: 13.4,  p: 3.8, tipo: "C" },
            { nome: "ZWO ASI1600MM (4/3\")",           w: 17.7,  h: 13.4,  p: 3.8, tipo: "M" },
            { nome: "ZWO ASI2600MC (APS-C)",           w: 23.5,  h: 15.7,  p: 3.76, tipo: "C" },
            { nome: "ZWO ASI2600MM (APS-C)",           w: 23.5,  h: 15.7,  p: 3.76, tipo: "M" },
            { nome: "ZWO ASI2400MC (FF)",              w: 35.9,  h: 23.9,  p: 5.94, tipo: "C" },
            { nome: "ZWO ASI6200MC (FF)",              w: 36.0,  h: 24.0,  p: 3.76, tipo: "C" },
            { nome: "ZWO ASI6200MM (FF)",              w: 36.0,  h: 24.0,  p: 3.76, tipo: "M" },

            // ── QHY ──────────────────────────────────────────────────────────
            { nome: "QHY163C (4/3\")",                 w: 17.7,  h: 13.4,  p: 3.8, tipo: "C" },
            { nome: "QHY163M (4/3\")",                 w: 17.7,  h: 13.4,  p: 3.8, tipo: "M" },
            { nome: "QHY183C (1\")",                   w: 13.2,  h:  8.8,  p: 2.4, tipo: "C" },
            { nome: "QHY183M (1\")",                   w: 13.2,  h:  8.8,  p: 2.4, tipo: "M" },
            { nome: "QHY294C (4/3\")",                 w: 19.1,  h: 13.0,  p: 4.63, tipo: "C" },
            { nome: "QHY294M (4/3\")",                 w: 19.1,  h: 13.0,  p: 4.63, tipo: "M" },
            { nome: "QHY533C (1\" sq)",                w: 11.31, h: 11.31, p: 3.76, tipo: "C" },
            { nome: "QHY533M (1\" sq)",                w: 11.31, h: 11.31, p: 3.76, tipo: "M" },
            { nome: "QHY268C (APS-C)",                 w: 23.5,  h: 15.7,  p: 3.76, tipo: "C" },
            { nome: "QHY268M (APS-C)",                 w: 23.5,  h: 15.7,  p: 3.76, tipo: "M" },
            { nome: "QHY485C (1\")",                   w: 13.0,  h:  8.7,  p: 2.9, tipo: "C" },
            { nome: "QHY600C (FF)",                    w: 36.0,  h: 24.0,  p: 3.76, tipo: "C" },
            { nome: "QHY600M (FF)",                    w: 36.0,  h: 24.0,  p: 3.76, tipo: "M" },
            { nome: "QHY128C (APS-C Canon)",           w: 22.3,  h: 14.9,  p: 4.3, tipo: "C" },
            { nome: "QHY367C (FF)",                    w: 35.8,  h: 23.9,  p: 4.88, tipo: "C" },
            { nome: "QHY miniCAM8 Color (IMX585)",      w: 11.14, h:  6.26, p: 2.9, tipo: "C" }, // 1/1.2" — AGGIUNTO
            { nome: "QHY miniCAM8 Mono (IMX585)",       w: 11.14, h:  6.26, p: 2.9, tipo: "M" },

            // ── PlayerOne ────────────────────────────────────────────────────
            // Fonte: player-one-astronomy.com/cooled-camera/ + planetary-camera/ (verificato mar 2026)
            { nome: "PlayerOne Mars-C II (IMX662)",        w:  7.68, h:  4.32, p: 2.9, tipo: "C" }, // 1/2.8"
            { nome: "PlayerOne Neptune-C II (IMX464)",     w:  9.55, h:  7.17, p: 2.9, tipo: "C" }, // 4/3" ridotto
            { nome: "PlayerOne Saturn-C SQR (IMX533)",     w: 11.31, h: 11.31, p: 3.76, tipo: "C" }, // 1" sq — CORRETTO (era IMX183)
            { nome: "PlayerOne Saturn-M SQR (IMX533)",     w: 11.31, h: 11.31, p: 3.76, tipo: "M" }, // 1" sq
            { nome: "PlayerOne Uranus-C PRO (IMX585)",     w: 11.14, h:  6.26, p: 2.9, tipo: "C" }, // 1/1.2"
            { nome: "PlayerOne Uranus-M PRO (IMX585)",     w: 11.14, h:  6.26, p: 2.9, tipo: "M" },
            { nome: "PlayerOne Uranus-C (IMX585)",         w: 11.14, h:  6.26, p: 2.9, tipo: "C" }, // non raffreddata — 9.x
            { nome: "PlayerOne Uranus-M (IMX585)",         w: 11.14, h:  6.26, p: 2.9, tipo: "M" }, // non raffreddata — 9.x
            { nome: "PlayerOne Ares-C PRO (IMX533)",       w: 11.31, h: 11.31, p: 3.76, tipo: "C" }, // 1" sq — NUOVO
            { nome: "PlayerOne Ares-M PRO (IMX533)",       w: 11.31, h: 11.31, p: 3.76, tipo: "M" },
            { nome: "PlayerOne Artemis-C PRO (IMX294)",    w: 19.1,  h: 13.0,  p: 4.63, tipo: "C" }, // 4/3" color — CORRETTO
            { nome: "PlayerOne Artemis-M PRO (IMX492)",    w: 19.2,  h: 13.0,  p: 2.315, tipo: "M" }, // 4/3" mono — CORRETTO
            { nome: "PlayerOne Poseidon-C PRO (IMX571)",   w: 23.5,  h: 15.7,  p: 3.76, tipo: "C" }, // APS-C — CORRETTO
            { nome: "PlayerOne Poseidon-M PRO (IMX571)",   w: 23.5,  h: 15.7,  p: 3.76, tipo: "M" },
            { nome: "PlayerOne Zeus 455C PRO (IMX455)",    w: 36.0,  h: 24.0,  p: 3.76, tipo: "C" }, // FF — CORRETTO (era Apollo-M Max)
            { nome: "PlayerOne Zeus 455M PRO (IMX455)",    w: 36.0,  h: 24.0,  p: 3.76, tipo: "M" },

            // ── Atik ─────────────────────────────────────────────────────────
            { nome: "Atik 314L+ Color (ICX285)",       w:  6.5,  h:  4.8,  p: 4.65, tipo: "C" },
            { nome: "Atik 314L+ Mono (ICX285)",        w:  6.5,  h:  4.8,  p: 4.65, tipo: "M" },
            { nome: "Atik 383L+ Color (KAF-8300)",     w: 17.6,  h: 13.5,  p: 5.4, tipo: "C" },
            { nome: "Atik 383L+ Mono (KAF-8300)",      w: 17.6,  h: 13.5,  p: 5.4, tipo: "M" },
            { nome: "Atik 460EX Color (ICX694)",       w: 15.1,  h: 15.1,  p: 4.54, tipo: "C" },
            { nome: "Atik 460EX Mono (ICX694)",        w: 15.1,  h: 15.1,  p: 4.54, tipo: "M" },
            { nome: "Atik Infinity Color",             w:  5.7,  h:  4.28, p: 5.6, tipo: "C" },
            { nome: "Atik Infinity Mono",              w:  5.7,  h:  4.28, p: 5.6, tipo: "M" },
            { nome: "Atik Horizon Color (APS-C CMOS)", w: 23.4,  h: 15.6,  p: 3.69, tipo: "C" },
            { nome: "Atik Horizon Mono (APS-C CMOS)",  w: 23.4,  h: 15.6,  p: 3.69, tipo: "M" },
            { nome: "Atik 16200 Color (KAF-16200, FF)", w: 35.8,  h: 23.9,  p: 6.0, tipo: "C" },
            { nome: "Atik 16200 Mono (KAF-16200, FF)", w: 35.8,  h: 23.9,  p: 6.0, tipo: "M" },

            // ── Canon DSLR / Mirrorless ───────────────────────────────────────
            { nome: "Canon 450D/550D/600D/700D (APS-C)", w: 22.3, h: 14.9, p: 4.29, tipo: "C" },
            { nome: "Canon 60Da (APS-C Astro)",        w: 22.3,  h: 14.9,  p: 4.3, tipo: "C" },
            { nome: "Canon 7D MkII (APS-C)",           w: 22.4,  h: 15.0,  p: 4.09, tipo: "C" },
            { nome: "Canon 90D (APS-C)",               w: 22.3,  h: 14.9,  p: 3.21, tipo: "C" },
            { nome: "Canon 6D (FF)",                   w: 35.8,  h: 23.9,  p: 6.54, tipo: "C" },
            { nome: "Canon 6D MkII (FF)",              w: 35.9,  h: 24.0,  p: 5.74, tipo: "C" },
            { nome: "Canon Ra / EOS R (FF Astro)",     w: 35.9,  h: 24.0,  p: 4.39, tipo: "C" },

            // ── Nikon DSLR ───────────────────────────────────────────────────
            { nome: "Nikon D3300/D5300/D5500 (APS-C)", w: 23.5,  h: 15.6,  p: 3.89, tipo: "C" },
            { nome: "Nikon D7500 (APS-C)",             w: 23.5,  h: 15.7,  p: 4.22, tipo: "C" },
            { nome: "Nikon D810A (FF Astro)",          w: 35.9,  h: 24.0,  p: 4.88, tipo: "C" },
            { nome: "Nikon D850 (FF)",                 w: 35.9,  h: 23.9,  p: 4.35, tipo: "C" },

            // ── Sony Mirrorless ──────────────────────────────────────────────
            { nome: "Sony A6000/A6100/A6400 (APS-C)",  w: 23.5,  h: 15.6,  p: 3.89, tipo: "C" },
            { nome: "Sony A7 III / A7C (FF)",          w: 35.6,  h: 23.8,  p: 5.97, tipo: "C" },
            { nome: "Sony A7R III / IV (FF HiRes)",    w: 35.7,  h: 23.8,  p: 4.51, tipo: "C" },
            // ── 9.0: camere aggiunte (schede produttori) ──
            { nome: "ZWO ASI676MC (IMX676)",             w: 7.1, h: 7.1, p: 2.0, tipo: "C" },
            { nome: "ZWO ASI678MC (IMX678)",             w: 7.68, h: 4.32, p: 2.0, tipo: "C" },
            { nome: "ZWO ASI664MC (IMX664)",             w: 7.86, h: 4.46, p: 2.9, tipo: "C" },
            { nome: "ZWO ASI461MM Pro (IMX461)",         w: 43.8, h: 32.9, p: 3.76, tipo: "M" },
            { nome: "Svbony SV605CC (IMX533)",           w: 11.31, h: 11.31, p: 3.76, tipo: "C" },
            { nome: "Svbony SV705C (IMX585)",            w: 11.14, h: 6.26, p: 2.9, tipo: "C" },
            { nome: "Canon EOS R6 (FF)",                 w: 35.9, h: 23.9, p: 6.56, tipo: "C" },
            { nome: "Canon EOS R6 Mark II / R8 (FF)",    w: 35.9, h: 23.9, p: 5.98, tipo: "C" },
            { nome: "Nikon Z6 / Z6 II (FF)",             w: 35.9, h: 23.9, p: 5.94, tipo: "C" },
            { nome: "Sony A7S III (FF)",                 w: 35.6, h: 23.8, p: 8.4, tipo: "C" },
        ];

        // ── 9.x: gain ottimale per camera (tabella approvata 10/11/2026, doc ADP_gain_ottimale_camere.md) ──
        // Valore scritto nei campi gain della Sequenza quando l'utente sceglie la camera.
        // Criterio: gain in cui si attiva l'HCG (basso rumore); senza HCG: unity gain (1 e-/ADU).
        // Camere assenti dalla tabella (QHY con più modalità, Atik, reflex, chip generici,
        // camere personalizzate) → "Auto" = valore impostato in N.I.N.A.
        const _ADP_GAIN_CAMERA = {
            // ZWO
            "ZWO ASI2600MC (APS-C)": 100, "ZWO ASI2600MM (APS-C)": 100,
            "ZWO ASI6200MC (FF)": 100,    "ZWO ASI6200MM (FF)": 100,
            "ZWO ASI533MC (sq)": 100,     "ZWO ASI533MM (sq)": 100,
            "ZWO ASI461MM Pro (IMX461)": 100,
            "ZWO ASI294MC (4/3\")": 120,  "ZWO ASI294MM (4/3\")": 120,
            "ZWO ASI2400MC (FF)": 140,
            "ZWO ASI432MM": 140,
            "ZWO ASI585MC": 200,
            "ZWO ASI662MC": 252,
            "ZWO ASI664MC (IMX664)": 252,
            "ZWO ASI678MC (IMX678)": 182,
            "ZWO ASI676MC (IMX676)": 180,
            "ZWO ASI715MC": 150,
            "ZWO ASI462MC": 80,
            "ZWO ASI485MC": 80,
            "ZWO ASI224MC": 60,
            "ZWO ASI1600MC (4/3\")": 139, "ZWO ASI1600MM (4/3\")": 139,   // unity (no HCG)
            "ZWO ASI183MC (1\")": 111,    "ZWO ASI183MM (1\")": 111,      // unity (no HCG)
            "ZWO ASI174MC": 189,          "ZWO ASI174MM": 189,            // unity (no HCG)
            "ZWO ASI290MC": 110,          "ZWO ASI290MM": 110,            // unity
            // Player One
            "PlayerOne Poseidon-C PRO (IMX571)": 125, "PlayerOne Poseidon-M PRO (IMX571)": 125,
            "PlayerOne Zeus 455C PRO (IMX455)": 125,  "PlayerOne Zeus 455M PRO (IMX455)": 125,
            "PlayerOne Ares-C PRO (IMX533)": 125,     "PlayerOne Ares-M PRO (IMX533)": 125,
            "PlayerOne Saturn-C SQR (IMX533)": 125,   "PlayerOne Saturn-M SQR (IMX533)": 125,
            "PlayerOne Artemis-C PRO (IMX294)": 120,  "PlayerOne Artemis-M PRO (IMX492)": 120,
            "PlayerOne Uranus-C PRO (IMX585)": 210,   "PlayerOne Uranus-M PRO (IMX585)": 210,
            "PlayerOne Uranus-C (IMX585)": 210,       "PlayerOne Uranus-M (IMX585)": 210,
            "PlayerOne Mars-C II (IMX662)": 210,
            "PlayerOne Neptune-C II (IMX464)": 80,
            // Svbony
            "Svbony SV605CC (IMX533)": 120,
            "Svbony SV705C (IMX585)": 275,
            // QHY (solo modelli senza ambiguità di modalità di lettura)
            "QHY183C (1\")": 10,          "QHY183M (1\")": 10,            // unity
            "QHY533C (1\" sq)": 60,       "QHY533M (1\" sq)": 60,
            "QHY miniCAM8 Color (IMX585)": 76, "QHY miniCAM8 Mono (IMX585)": 76
        };


        // ── Helper: legge e deserializza JSON dal localStorage in modo sicuro ──
        // Se il valore è assente o corrotto (JSON non valido), rimuove la chiave
        // e restituisce il fallback — l'app continua senza bloccarsi.
        function _lsGetJSON(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                if (raw === null) return fallback;
                return JSON.parse(raw) ?? fallback;
            } catch(e) {
                localStorage.removeItem(key);
                return fallback;
            }
        }

        function popolaMenuAttrezzatura() {
            const selTel = document.getElementById('preset-telescope'); 
            selTel.innerHTML = '<option value="" data-i18n="select_opt">-- Seleziona --</option>';
            
            let customTels = _lsGetJSON('ad_custom_telescopes', []);
            
            // 9.0: telescopi personalizzati in cima, poi il database diviso per marca
            // (gruppi in ordine alfabetico, dentro ogni marca per focale crescente)
            const nuovaOpt = (t, stella) => {
                let opt = document.createElement('option');
                opt.value = t.focale + ',' + t.diametro + ',' + t.nome;
                opt.textContent = (stella ? "⭐ " : "") + t.nome;
                // Aggiorna la mappa globale nome→{otaType,deltaT}
                window._telOtaMap[t.nome] = { otaType: t.otaType || 'apo', deltaT: t.deltaT || 2.0 };
                return opt;
            };
            if (customTels.length) {
                let g = document.createElement('optgroup');
                g.label = '⭐ ' + (lang==='it'?'I miei telescopi':lang==='en'?'My telescopes':lang==='es'?'Mis telescopios':'我的望远镜');
                customTels.forEach(t => g.appendChild(nuovaOpt(t, true)));
                selTel.appendChild(g);
            }
            const MARCHE2 = ['Explore Scientific', 'Sky-Watcher', 'William Optics'];   // marche di due parole
            const marca = t => MARCHE2.find(m => t.nome.indexOf(m + ' ') === 0) || t.nome.split(' ')[0];
            const perMarca = {};
            dbTelescopiBase.forEach(t => { (perMarca[marca(t)] = perMarca[marca(t)] || []).push(t); });
            Object.keys(perMarca).sort((a, b) => a.localeCompare(b)).forEach(m => {
                let g = document.createElement('optgroup');
                g.label = m;
                perMarca[m].slice().sort((a, b) => a.focale - b.focale).forEach(t => g.appendChild(nuovaOpt(t, false)));
                selTel.appendChild(g);
            });

            const selCam = document.getElementById('preset-sensor'); 
            selCam.innerHTML = '<option value="" data-i18n="select_opt">-- Seleziona --</option>';
            // Sensori custom salvati
            let customCams = _lsGetJSON('ad_custom_cameras', []);
            if (customCams.length) {
                let grpCustom = document.createElement('optgroup');
                grpCustom.label = '⭐ ' + (lang==='it'?'I miei sensori':lang==='en'?'My sensors':lang==='es'?'Mis sensores':'我的传感器');
                customCams.forEach(c => {
                    let opt = document.createElement('option');
                    opt.value = `${c.w},${c.h},${c.p},${c.nome}`;
                    opt.textContent = '⭐ ' + c.nome;
                    grpCustom.appendChild(opt);
                });
                selCam.appendChild(grpCustom);
            }
            // Sensori base — 9.0: gruppi per marca in ordine alfabetico (dentro: per dimensione del sensore);
            // i chip Sony generici in un gruppo a parte, in fondo
            const GENERICI = '~gen';
            const marcaCam = c => /^Sony IMX/.test(c.nome) ? GENERICI : /^QHY/.test(c.nome) ? 'QHY' : c.nome.split(' ')[0];   // QHY: nomi senza spazio (QHY268C)
            const perMarcaCam = {};
            dbCamereBase.forEach(c => { (perMarcaCam[marcaCam(c)] = perMarcaCam[marcaCam(c)] || []).push(c); });
            const etichGen = lang==='it'?'Sony IMX – chip generici':lang==='en'?'Sony IMX – generic chips':lang==='es'?'Sony IMX – chips genéricos':'Sony IMX – 通用芯片';
            Object.keys(perMarcaCam).sort((a, b) => a === GENERICI ? 1 : b === GENERICI ? -1 : a.localeCompare(b)).forEach(m => {
                let grp = document.createElement('optgroup');
                grp.label = m === GENERICI ? etichGen : m;
                perMarcaCam[m].slice().sort((a, b) => (a.w * a.h - b.w * b.h) || a.nome.localeCompare(b.nome)).forEach(c => {
                    let opt = document.createElement('option');
                    opt.value = `${c.w},${c.h},${c.p},${c.nome}`;
                    opt.textContent = c.nome;
                    if (c.tipo) opt.dataset.tipo = c.tipo;            // C = colore, M = mono (9.0)
                    grp.appendChild(opt);
                });
                selCam.appendChild(grp);
            });
        }

        function applicaPresetTelescopio() { 
            let selEl = document.getElementById('preset-telescope');
            let v = selEl.value; 
            if(v){ 
                let p = v.split(','); 
                document.getElementById('focal-length').value = p[0]; 
                document.getElementById('aperture').value = p[1] || 100;
                // Legge otaType e deltaT dalla mappa globale usando il nome dell'option
                let selOpt  = selEl.options[selEl.selectedIndex];
                let nomeTel = selOpt ? selOpt.textContent.replace('⭐ ', '').trim() : '';
                let ota     = (window._telOtaMap && window._telOtaMap[nomeTel]) || {};
                let otaType = ota.otaType || 'apo';
                let deltaT  = ota.deltaT  || 2.0;
                let otaTypeEl = document.getElementById('af-ota-type');
                let deltaTEl  = document.getElementById('af-delta-t');
                if (otaTypeEl) otaTypeEl.value = otaType;
                if (deltaTEl)  deltaTEl.value  = deltaT;
                aggiornaFOV();
                calcolaTempi();
                if (typeof aggiornaStimaAF === 'function') aggiornaStimaAF();
            } 
        }

        function applicaPresetSensore() { 
            let v = document.getElementById('preset-sensor').value; 
            if(v){
                let p=v.split(',');
                document.getElementById('sensor-width').value=p[0];
                document.getElementById('sensor-height').value=p[1];
                if(p[2]) document.getElementById('pixel-size').value=p[2];
                aggiornaFOV();
                if (typeof aggiornaAI === 'function') aggiornaAI();
                const msgTipo = _adpTipoDaSensore();      // dopo l'eventuale ridisegno della griglia
                _adpGainDaSensore(msgTipo);               // 9.x: gain ottimale per la camera scelta
            }
        }

        // ── 9.0: il sensore scelto imposta Colore/Mono nella Sequenza (Smart e PRO) ──
        // Solo per le voci del database con tipo definito (C/M); i chip Sony generici
        // e i sensori personalizzati lasciano la scelta all'utente. In modalità Base
        // il sensore resta sempre a colori (come prima).
        function _adpTipoDaSensore() {
            const sel = document.getElementById('preset-sensor');
            const o = sel && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : null;
            const tipo = o && o.dataset ? o.dataset.tipo : '';
            if (!tipo || document.body.classList.contains('mode-lite')) return;
            const val = tipo === 'M' ? 'mono' : 'color';
            const st = document.getElementById('sensor-type');
            if (!st || st.value === val) return;
            st.value = val;
            st.dispatchEvent(new Event('change', { bubbles: true }));     // toggleSensorMode, calcolaTempi, filtri, salvataggio
            const ps = document.getElementById('pro-sensor-type');
            if (ps) {
                ps.value = val;
                ['disegnaGrigliaPro', 'aggiornaFiltriNinaPro'].forEach(f => { if (typeof window[f] === 'function') { try { window[f](); } catch (e) {} } });
            }
            return t(val === 'mono' ? 'sensor_auto_mono' : 'sensor_auto_color');   // 9.x: avviso mostrato da _adpGainDaSensore
        }

        // ── 9.x: la camera scelta imposta il gain ottimale nella Sequenza (Smart e PRO) ──
        // Chiamata solo da applicaPresetSensore (scelta della camera da parte dell'utente),
        // mai all'avvio: il gain salvato dall'utente resta finché non cambia camera.
        // Scrive lo stesso valore su light, HDR, dark e bias (dark e bias devono avere
        // lo stesso gain dei light per la calibrazione). L'offset non viene toccato.
        // msgTipo: eventuale avviso Colore/Mono di _adpTipoDaSensore, unito in un solo messaggio.
        function _adpGainDaSensore(msgTipo) {
            const sel = document.getElementById('preset-sensor');
            const o = sel && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : null;
            const nome = o ? o.textContent.replace('⭐ ', '').trim() : '';
            const custom = !!(o && o.value && o.value.indexOf('__custom__') === 0);
            const g = (!custom && Object.prototype.hasOwnProperty.call(_ADP_GAIN_CAMERA, nome)) ? _ADP_GAIN_CAMERA[nome] : null;
            const val = g === null ? 'Auto' : String(g);

            const luci = ['c-light', 'm-l', 'm-r', 'm-g', 'm-b', 'm-ha', 'm-oiii', 'm-sii'];
            const calib = ['c-dark', 'c-bias', 'm-dark', 'm-bias'];
            const ids = [];
            ['', 'pro-'].forEach(pre => {
                luci.forEach(fid => { ids.push(`${pre}${fid}-gain`, `${pre}${fid}-hdr-gain`); });
                calib.forEach(fid => ids.push(`${pre}${fid}-gain`));
            });
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                el.value = val;
                if (typeof adSave === 'function') adSave(id, val);
            });

            if (document.body.classList.contains('mode-lite') || typeof mostraAvviso !== 'function') return;
            const msgGain = g === null
                ? t('gain_auto_nina')
                : t('gain_auto_set').replace('{g}', val).replace('{cam}', nome);
            mostraAvviso(msgTipo ? `${msgTipo} · ${msgGain}` : msgGain, 'info');
        }

        // ── 9.0: compatibilità con i nomi dei telescopi del database precedente ──
        // Un valore salvato che non esiste più (es. "250,51,WO RedCat 51") viene ricondotto
        // alla voce con stessa focale e diametro; se ce n'è più d'una, a quella che
        // finisce con lo stesso modello. Mantiene il prefisso "__custom__|".
        function _adpTelescopioCompat(val) {
            const sel = document.getElementById('preset-telescope');
            if (!sel || !val) return val;
            const pref = val.indexOf('__custom__|') === 0 ? '__custom__|' : '';
            const v = val.slice(pref.length);
            if (Array.from(sel.options).some(o => o.value === v)) return val;
            const parti = v.split(','), fd = parti.slice(0, 2).join(',') + ',';
            const modello = parti.slice(2).join(',').replace(/^(SW|WO)\s+/, '').trim().toLowerCase();
            const cand = Array.from(sel.options).filter(o => o.value.indexOf(fd) === 0);
            if (!cand.length) return val;
            const scelto = cand.find(o => o.textContent.trim().toLowerCase().endsWith(modello)) || (cand.length === 1 ? cand[0] : null);
            return scelto ? pref + scelto.value : val;
        }

        // ── 9.0: compatibilità con le voci "M/C" del database precedente ──
        // Un valore salvato che non esiste più (es. "...,ZWO ASI2600MM/MC (APS-C)") viene
        // ricondotto alla nuova voce con stesse misure, stessa marca e tipo uguale a quello
        // salvato in "sensor-type". Mantiene anche il prefisso "__custom__|".
        function _adpSensoreCompat(val, tipoSalvato) {
            const sel = document.getElementById('preset-sensor');
            if (!sel || !val) return val;
            const pref = val.indexOf('__custom__|') === 0 ? '__custom__|' : '';
            const v = val.slice(pref.length);
            if (Array.from(sel.options).some(o => o.value === v)) return val;
            const parti = v.split(','), misure = parti.slice(0, 3).join(','), marca = (parti.slice(3).join(',').trim().split(/\s+/)[0] || '').toLowerCase();
            const cand = Array.from(sel.options).filter(o => o.dataset.tipo && o.value.indexOf(misure + ',') === 0 &&
                (o.textContent.trim().split(/\s+/)[0] || '').toLowerCase() === marca);
            if (!cand.length) return val;
            const voluto = tipoSalvato === 'mono' ? 'M' : 'C';
            const scelto = cand.find(o => o.dataset.tipo === voluto) || cand[0];
            return pref + scelto.value;
        }

        

        function salvaTelescopioCustom() {
            let f = document.getElementById('focal-length').value;
            let d = document.getElementById('aperture').value;

            let errTxt = lang === 'it' ? "Inserisci prima una Focale e un Diametro validi nei campi sottostanti." :
                         lang === 'en' ? "Please enter a valid Focal Length and Aperture in the fields below." :
                         lang === 'es' ? "Ingresa primero una Focal y Diámetro válidos en los campos de abajo." :
                                         "请先在下方输入有效的焦距和口径。";
            if (!f || !d || isNaN(f) || isNaN(d)) { mostraAvviso(errTxt, "warn"); return; }

            // Popola info nella modal
            let infoEl = document.getElementById('save-telescope-info');
            if (infoEl) {
                let infoTxt = lang === 'it' ? `Focale: <strong>${f} mm</strong> &nbsp;·&nbsp; Diametro: <strong>${d} mm</strong>` :
                              lang === 'en' ? `Focal: <strong>${f} mm</strong> &nbsp;·&nbsp; Aperture: <strong>${d} mm</strong>` :
                              lang === 'es' ? `Focal: <strong>${f} mm</strong> &nbsp;·&nbsp; Diámetro: <strong>${d} mm</strong>` :
                                              `焦距: <strong>${f} mm</strong> &nbsp;·&nbsp; 口径: <strong>${d} mm</strong>`;
                infoEl.innerHTML = infoTxt;
            }

            // Pulisci e apri modal
            let nameEl = document.getElementById('save-telescope-name');
            if (nameEl) { nameEl.value = ''; }
            document.getElementById('save-telescope-modal').style.display = 'block';
            setTimeout(function() { if (nameEl) nameEl.focus(); }, 100);
        }

        function confermaSalvaTelescopio() {
            let f = document.getElementById('focal-length').value;
            let d = document.getElementById('aperture').value;
            let nome = (document.getElementById('save-telescope-name').value || '').trim();
            if (!nome) {
                document.getElementById('save-telescope-name').style.borderColor = '#ff4444';
                return;
            }
            document.getElementById('save-telescope-name').style.borderColor = '#555';
            document.getElementById('save-telescope-modal').style.display = 'none';

            let customTels = _lsGetJSON('ad_custom_telescopes', []);
            customTels.push({ nome: nome, focale: parseInt(f), diametro: parseInt(d) });
            localStorage.setItem('ad_custom_telescopes', JSON.stringify(customTels));

            popolaMenuAttrezzatura();
            document.getElementById('preset-telescope').value = `${f},${d},${nome}`;
        }

        function apriEliminaTelescopio() {
            let customTels = _lsGetJSON('ad_custom_telescopes', []);
            let list  = document.getElementById('delete-telescope-list');
            let empty = document.getElementById('delete-telescope-empty');
            list.innerHTML = '';

            if (!customTels.length) {
                list.style.display = 'none';
                empty.style.display = 'block';
            } else {
                list.style.display = 'flex';
                empty.style.display = 'none';
                customTels.forEach(function(tel, idx) {
                    let row = document.createElement('div');
                    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:#2a2a2a; border-radius:8px; padding:10px 14px; border-left:3px solid #bb86fc;';
                    row.innerHTML = `
                        <div>
                            <div style="color:#fff; font-weight:bold; font-size:0.9em;">⭐ ${tel.nome}</div>
                            <div style="color:#888; font-size:0.8em; margin-top:2px;">${tel.focale}mm &nbsp;·&nbsp; ⌀${tel.diametro}mm &nbsp;·&nbsp; f/${Math.round(tel.focale/tel.diametro)}</div>
                        </div>
                        <button class="btn-guide" style="margin:0; padding:5px 10px; border-color:#ff4444; color:#ff4444; flex-shrink:0;"
                            onclick="eliminaTelescopioCustom(${idx})">🗑️</button>
                    `;
                    list.appendChild(row);
                });
            }
            document.getElementById('delete-telescope-modal').style.display = 'block';
        }

        function eliminaTelescopioCustom(idx) {
            let customTels = _lsGetJSON('ad_custom_telescopes', []);
            customTels.splice(idx, 1);
            localStorage.setItem('ad_custom_telescopes', JSON.stringify(customTels));
            popolaMenuAttrezzatura();
            apriEliminaTelescopio(); // ricarica lista aggiornata
        }

        function salvaCameraCustom() {
            let w = document.getElementById('sensor-width').value;
            let h = document.getElementById('sensor-height').value;
            let p = document.getElementById('pixel-size').value;
            let errTxt = lang==='it' ? "Inserisci prima valori validi per larghezza, altezza e pixel." :
                         lang==='en' ? "Please enter valid width, height and pixel size values." :
                         lang==='es' ? "Introduce valores válidos para ancho, alto y tamaño de píxel." :
                                       "请先输入有效的宽度、高度和像素尺寸值。";
            if (!w || !h || !p || isNaN(w) || isNaN(h) || isNaN(p)) { mostraAvviso(errTxt, "warn"); return; }
            let infoEl = document.getElementById('save-camera-info');
            if (infoEl) {
                infoEl.innerHTML = lang==='it' ? `W: <strong>${w} mm</strong> &nbsp;·&nbsp; H: <strong>${h} mm</strong> &nbsp;·&nbsp; Pixel: <strong>${p} µm</strong>` :
                                   lang==='en' ? `W: <strong>${w} mm</strong> &nbsp;·&nbsp; H: <strong>${h} mm</strong> &nbsp;·&nbsp; Pixel: <strong>${p} µm</strong>` :
                                   lang==='es' ? `A: <strong>${w} mm</strong> &nbsp;·&nbsp; Al: <strong>${h} mm</strong> &nbsp;·&nbsp; Píxel: <strong>${p} µm</strong>` :
                                                 `宽: <strong>${w} mm</strong> &nbsp;·&nbsp; 高: <strong>${h} mm</strong> &nbsp;·&nbsp; 像素: <strong>${p} µm</strong>`;
            }
            let nameEl = document.getElementById('save-camera-name');
            if (nameEl) nameEl.value = '';
            document.getElementById('save-camera-modal').style.display = 'block';
            setTimeout(function() { if (nameEl) nameEl.focus(); }, 100);
        }

        function confermaSalvaCamera() {
            let w    = document.getElementById('sensor-width').value;
            let h    = document.getElementById('sensor-height').value;
            let p    = document.getElementById('pixel-size').value;
            let nome = (document.getElementById('save-camera-name').value || '').trim();
            if (!nome) {
                document.getElementById('save-camera-name').style.borderColor = '#ff4444';
                return;
            }
            document.getElementById('save-camera-name').style.borderColor = '#555';
            document.getElementById('save-camera-modal').style.display = 'none';
            let customCams = _lsGetJSON('ad_custom_cameras', []);
            customCams.push({ nome, w: parseFloat(w), h: parseFloat(h), p: parseFloat(p) });
            localStorage.setItem('ad_custom_cameras', JSON.stringify(customCams));
            popolaMenuAttrezzatura();
            document.getElementById('preset-sensor').value = `${w},${h},${p},${nome}`;
            salvaImpostazioniStrumento();
        }

        function apriEliminaCamera() {
            let customCams = _lsGetJSON('ad_custom_cameras', []);
            let list  = document.getElementById('delete-camera-list');
            let empty = document.getElementById('delete-camera-empty');
            list.innerHTML = '';
            if (!customCams.length) {
                list.style.display = 'none'; empty.style.display = 'block';
            } else {
                list.style.display = 'flex'; empty.style.display = 'none';
                customCams.forEach(function(cam, idx) {
                    let row = document.createElement('div');
                    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:#2a2a2a; border-radius:8px; padding:10px 14px; border-left:3px solid #c49a3c;';
                    row.innerHTML = `
                        <div>
                            <div style="color:#fff; font-weight:bold; font-size:0.9em;">⭐ ${cam.nome}</div>
                            <div style="color:#888; font-size:0.8em; margin-top:2px;">${cam.w}×${cam.h} mm &nbsp;·&nbsp; ${cam.p} µm/px</div>
                        </div>
                        <button class="btn-guide" style="margin:0; padding:5px 10px; border-color:#ff4444; color:#ff4444; flex-shrink:0;"
                            onclick="eliminaCameraCustom(${idx})">🗑️</button>`;
                    list.appendChild(row);
                });
            }
            document.getElementById('delete-camera-modal').style.display = 'block';
        }

        function eliminaCameraCustom(idx) {
            let customCams = _lsGetJSON('ad_custom_cameras', []);
            customCams.splice(idx, 1);
            localStorage.setItem('ad_custom_cameras', JSON.stringify(customCams));
            popolaMenuAttrezzatura();
            apriEliminaCamera();
        }

        // ── PERSISTENZA IMPOSTAZIONI STRUMENTO ───────────────────────────
        // Campi salvati: focale, diametro, sensore W/H/pixel, tipo sensore
        const AD_INSTRUMENT_FIELDS = [
            'focal-length', 'aperture',
            'sensor-width', 'sensor-height', 'pixel-size',
            'sensor-type',
            'preset-telescope', 'preset-sensor', 'bortle-class'
        ];

        function salvaImpostazioniStrumento() {
            let data = {};
            AD_INSTRUMENT_FIELDS.forEach(id => {
                let el = document.getElementById(id);
                if (el) data[id] = el.value;
            });
            localStorage.setItem('ad_instrument', JSON.stringify(data));
        }

        function ripristinaImpostazioniStrumento() {
            let saved = localStorage.getItem('ad_instrument');
            if (!saved) return;
            try {
                let data = JSON.parse(saved);
                if (data['preset-telescope']) {                    // nomi telescopi cambiati nella 9.0 (SW → Sky-Watcher, WO → William Optics, Comethunter)
                    const nuovoT = _adpTelescopioCompat(data['preset-telescope']);
                    if (nuovoT !== data['preset-telescope']) { data['preset-telescope'] = nuovoT; localStorage.setItem('ad_instrument', JSON.stringify(data)); }
                }
                if (data['preset-sensor']) {                       // voci "M/C" del database precedente
                    const nuovo = _adpSensoreCompat(data['preset-sensor'], data['sensor-type']);
                    if (nuovo !== data['preset-sensor']) { data['preset-sensor'] = nuovo; localStorage.setItem('ad_instrument', JSON.stringify(data)); }
                }
                AD_INSTRUMENT_FIELDS.forEach(id => {
                    let el = document.getElementById(id);
                    if (el && data[id] !== undefined) el.value = data[id];
                });
                // Propaga otaType e deltaT dalla mappa usando il nome dell'option selezionata
                let selEl   = document.getElementById('preset-telescope');
                let selOpt  = selEl ? selEl.options[selEl.selectedIndex] : null;
                let nomeTel = selOpt ? selOpt.textContent.replace('⭐ ', '').trim() : '';
                let ota     = (window._telOtaMap && window._telOtaMap[nomeTel]) || {};
                let otaTypeEl = document.getElementById('af-ota-type');
                let deltaTEl  = document.getElementById('af-delta-t');
                if (otaTypeEl) otaTypeEl.value = ota.otaType || 'apo';
                if (deltaTEl)  deltaTEl.value  = ota.deltaT  || 2.0;
                // Ricalcola FOV e tempi con i valori ripristinati
                if (typeof aggiornaFOV === 'function') aggiornaFOV();
                if (typeof calcolaTempi === 'function') calcolaTempi();
                if (typeof aggiornaStimaAF === 'function') aggiornaStimaAF();
            } catch(e) { localStorage.removeItem('ad_instrument'); }
        }

        // Aggancia il salvataggio automatico a tutti i campi strumento
        // (chiamato dopo il DOM ready dal DOMContentLoaded in multinight.js)
        function inizializzaPersistenzaStrumento() {
            AD_INSTRUMENT_FIELDS.forEach(id => {
                let el = document.getElementById(id);
                if (el) el.addEventListener('change', salvaImpostazioniStrumento);
                if (el) el.addEventListener('input', salvaImpostazioniStrumento);
            });
            if (typeof _adpPresetInit === 'function') _adpPresetInit();
        }

        // ── Preset telescopio/camera modificato a mano → "✎ Personalizzato" + avviso ──
        // Se i campi non corrispondono più al modello scelto dal menu, il menu mostra
        // "✎ Personalizzato" (voce non selezionabile) e sotto i pulsanti compare un avviso
        // con il modello di partenza. Tornando ai valori originali si ripristina il nome.
        // Stato salvato in ad_instrument come "__custom__|<valore del modello di partenza>".
        const _ADP_PRESET_CUSTOM = '__custom__|';
        const _ADP_PRESET_CFG = {
            tel: { sel: 'preset-telescope', fields: ['focal-length', 'aperture'],                     msg: 'preset_mod_tel' },
            cam: { sel: 'preset-sensor',    fields: ['sensor-width', 'sensor-height', 'pixel-size'], msg: 'preset_mod_cam' }
        };
        const _adpPresetState = { tel: { origin: '', ready: false }, cam: { origin: '', ready: false } };

        function _adpPresetFmt(v) {
            let s = String(v).trim();
            return (lang === 'it' || lang === 'es') ? s.replace('.', ',') : s;
        }

        function _adpPresetFindOption(selEl, value) {
            for (let i = 0; i < selEl.options.length; i++) {
                if (selEl.options[i].value === value) return selEl.options[i];
            }
            return null;
        }

        // true se almeno un campo è diverso dal valore del modello (stessa lettura dei preset)
        function _adpPresetDiffers(kind, presetValue) {
            let p = presetValue.split(',');
            let fields = _ADP_PRESET_CFG[kind].fields;
            for (let i = 0; i < fields.length; i++) {
                let pv = p[i];
                if (kind === 'tel' && i === 1 && !pv) pv = '100';   // come applicaPresetTelescopio
                if (pv === undefined || pv === '') continue;          // pixel assente: non impostato dal preset
                let el = document.getElementById(fields[i]);
                if (!el) continue;
                let a = parseFloat(el.value), b = parseFloat(pv);
                if (isNaN(a) || isNaN(b) || Math.abs(a - b) > 1e-6) return true;
            }
            return false;
        }

        function _adpPresetNotice(kind, selEl, show, originOpt) {
            let id = 'adp-preset-notice-' + kind;
            let box = document.getElementById(id);
            if (!show) { if (box) box.remove(); return; }
            if (!box) {
                box = document.createElement('div');
                box.id = id;
                box.style.cssText = 'margin-top:6px; padding:8px 10px; background:rgba(88,166,255,0.08); border-left:3px solid #58a6ff; border-radius:4px; color:#c9d1d9; font-size:0.8em; line-height:1.45;';
                let after = (selEl.nextElementSibling && selEl.nextElementSibling.tagName === 'DIV') ? selEl.nextElementSibling : selEl;
                after.insertAdjacentElement('afterend', box);
            }
            let v = id => (document.getElementById(id) || {}).value || '';
            let name = originOpt.textContent.replace('⭐ ', '').trim();
            let txt = t(_ADP_PRESET_CFG[kind].msg).replace('{name}', name);
            if (kind === 'tel') {
                let f = parseFloat(v('focal-length')), d = parseFloat(v('aperture'));
                let r = (f > 0 && d > 0) ? (f / d).toFixed(1) : '--';
                txt = txt.replace('{f}', _adpPresetFmt(v('focal-length'))).replace('{d}', _adpPresetFmt(v('aperture'))).replace('{r}', _adpPresetFmt(r));
            } else {
                txt = txt.replace('{w}', _adpPresetFmt(v('sensor-width'))).replace('{h}', _adpPresetFmt(v('sensor-height'))).replace('{p}', _adpPresetFmt(v('pixel-size')));
            }
            box.textContent = 'ⓘ ' + txt;
        }

        function _adpPresetRefresh(kind) {
            let cfg = _ADP_PRESET_CFG[kind], st = _adpPresetState[kind];
            let selEl = document.getElementById(cfg.sel);
            if (!selEl) return;
            let before = selEl.value;
            // Un modello normale selezionato diventa il riferimento
            if (before && before.indexOf(_ADP_PRESET_CUSTOM) !== 0) st.origin = before;
            let originOpt = st.origin ? _adpPresetFindOption(selEl, st.origin) : null;
            if (!originOpt) st.origin = '';
            let modified = !!originOpt && _adpPresetDiffers(kind, st.origin);
            let customOpt = selEl.querySelector('option[data-adp-custom]');
            if (modified) {
                let customVal = _ADP_PRESET_CUSTOM + st.origin;
                if (!customOpt) {
                    customOpt = document.createElement('option');
                    customOpt.setAttribute('data-adp-custom', '1');
                    customOpt.setAttribute('data-i18n', 'preset_custom');
                    customOpt.disabled = true;
                    // subito dopo "-- Seleziona --" (figlio diretto: il menu camera usa optgroup)
                    let firstOpt = selEl.querySelector(':scope > option');
                    selEl.insertBefore(customOpt, firstOpt ? firstOpt.nextSibling : selEl.firstChild);
                }
                customOpt.value = customVal;
                customOpt.textContent = t('preset_custom');
                selEl.value = customVal;
            } else {
                if (customOpt) customOpt.remove();
                if (originOpt) selEl.value = st.origin;
            }
            _adpPresetNotice(kind, selEl, modified, originOpt);
            // Salva se il valore del menu differisce da quello memorizzato
            let savedSel = '';
            try { savedSel = (JSON.parse(localStorage.getItem('ad_instrument') || '{}') || {})[cfg.sel] || ''; } catch (e) {}
            if (selEl.value !== savedSel && typeof salvaImpostazioniStrumento === 'function') salvaImpostazioniStrumento();
        }

        // Chiamata a fine inizializzaPersistenzaStrumento (dopo il ripristino dei dati salvati)
        function _adpPresetInit() {
            let saved = {};
            try { saved = JSON.parse(localStorage.getItem('ad_instrument') || '{}') || {}; } catch (e) { saved = {}; }
            Object.keys(_ADP_PRESET_CFG).forEach(kind => {
                let cfg = _ADP_PRESET_CFG[kind], st = _adpPresetState[kind];
                let selEl = document.getElementById(cfg.sel);
                if (!selEl) return;
                let sv = String(saved[cfg.sel] || '');
                if (sv.indexOf(_ADP_PRESET_CUSTOM) === 0) st.origin = sv.slice(_ADP_PRESET_CUSTOM.length);
                if (!st.ready) {
                    st.ready = true;
                    cfg.fields.forEach(id => {
                        let el = document.getElementById(id);
                        if (el) el.addEventListener('input', () => _adpPresetRefresh(kind));
                    });
                    selEl.addEventListener('change', () => {
                        if (selEl.value === '') st.origin = '';
                        _adpPresetRefresh(kind);
                    });
                    // Il menu viene ricostruito dopo salvataggio/eliminazione di un modello
                    if (window.MutationObserver) new MutationObserver(() => _adpPresetRefresh(kind)).observe(selEl, { childList: true });
                }
                _adpPresetRefresh(kind);
            });
        }
