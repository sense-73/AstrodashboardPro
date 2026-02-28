// ==========================================
// MEGA-DATABASE ASTROFOTOGRAFICO LOCALE (V5.5 Global)
// ==========================================

const dsoDatabase = [
    // --- CATALOGO MESSIER ---
    { 
        id: "m1", name: "M1", size: 6, icon: "💥", ra: 5.575, dec: 22.016, 
        it: "Nebulosa Granchio", en: "Crab Nebula", es: "Nebulosa del Cangrejo", zh: "蟹状星云",
        type: "Resto di Supernova", mag: "+8.4", dist: "6.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Granchio", 
        desc: "Il resto in espansione della supernova esplosa nel 1054, osservata dagli astronomi cinesi.", tips: "Oggetto piccolo ma dettagliato. Richiede focali lunghe. Rende benissimo in banda stretta (HOO o SHO)." 
    },
    { 
        id: "m3", name: "M3", size: 18, icon: "🎇", ra: 13.705, dec: 28.377, 
        it: "Ammasso Globulare M3", en: "M3 Globular Cluster", es: "Cúmulo Globular M3", zh: "M3 球状星团",
        type: "Ammasso Globulare", mag: "+6.2", dist: "33.900 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Globulare_di_Canes_Venatici", 
        desc: "Uno dei più grandi e luminosi ammassi globulari, contiene circa mezzo milione di stelle.", tips: "Per gli ammassi la parola d'ordine è risoluzione. Usa pose brevi (60s-120s) a bassi ISO/Gain." 
    },
    { 
        id: "m4", name: "M4", size: 36, icon: "🎇", ra: 16.393, dec: -26.525, 
        it: "Ammasso Globulare M4", en: "M4 Globular Cluster", es: "Cúmulo Globular M4", zh: "M4 球状星团",
        type: "Ammasso Globulare", mag: "+5.6", dist: "7.200 a.l.", link: "https://it.wikipedia.org/wiki/M4_(astronomia)", 
        desc: "Uno degli ammassi globulari più vicini alla Terra, situato nello Scorpione vicino ad Antares.", tips: "Essendo vicino ad Antares, puoi tentare un'inquadratura a largo campo per catturare le polveri circostanti." 
    },
    { 
        id: "m8", name: "M8", size: 90, icon: "🌊", ra: 18.06, dec: -24.38, 
        it: "Nebulosa Laguna", en: "Lagoon Nebula", es: "Nebulosa de la Laguna", zh: "礁湖星云",
        type: "Regione H II", mag: "+6.0", dist: "4.100 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Laguna", 
        desc: "Gigantesca nube interstellare nel Sagittario, visibile a occhio nudo.", tips: "Oggetto estivo per eccellenza. Il nucleo è luminosissimo. Segnale incredibile sia in RGB che in SHO." 
    },
    { 
        id: "m11", name: "M11", size: 14, icon: "🦆", ra: 18.85, dec: -6.27, 
        it: "Ammasso Anitra Selvatica", en: "Wild Duck Cluster", es: "Cúmulo del Pato Salvaje", zh: "野鸭星团",
        type: "Ammasso Aperto", mag: "+5.8", dist: "6.200 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Anitra_Selvatica", 
        desc: "Un ammasso aperto incredibilmente denso e ricco di stelle nello Scudo.", tips: "Magnifico bersaglio in banda larga. Mantieni i tempi brevi per preservare i colori stellari rossi e blu." 
    },
    { 
        id: "m13", name: "M13", size: 20, icon: "🎇", ra: 16.69, dec: 36.46, 
        it: "Grande Ammasso d'Ercole", en: "Hercules Globular Cluster", es: "Gran Cúmulo de Hércules", zh: "武仙座球状星团",
        type: "Ammasso Globulare", mag: "+5.8", dist: "22.200 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Globulare_di_Ercole", 
        desc: "Il più celebre e luminoso ammasso globulare boreale.", tips: "Evita la sovraesposizione del nucleo. Posa breve e dithering per mantenere i colori delle stelle." 
    },
    { 
        id: "m16", name: "M16", size: 70, icon: "🦅", ra: 18.31, dec: -13.81, 
        it: "Nebulosa Aquila", en: "Eagle Nebula", es: "Nebulosa del Águila", zh: "老鹰星云",
        type: "Regione H II", mag: "+6.0", dist: "7.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Aquila", 
        desc: "Giovane ammasso aperto circondato da gas. Al centro si trovano i famosi 'Pilastri della Creazione'.", tips: "IL target per la Hubble Palette (SHO). Il segnale dell'OIII e dello SII è molto buono." 
    },
    { 
        id: "m17", name: "M17", size: 11, icon: "🦢", ra: 18.34, dec: -16.17, 
        it: "Nebulosa Omega / Cigno", en: "Omega Nebula (Swan)", es: "Nebulosa Omega", zh: "天鹅星云",
        type: "Regione H II", mag: "+6.0", dist: "5.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Omega", 
        desc: "Brillantissima regione di formazione stellare nel Sagittario.", tips: "Luminosità superficiale altissima in H-Alpha. Non saturare il nucleo centrale." 
    },
    { 
        id: "m20", name: "M20", size: 28, icon: "🌸", ra: 18.03, dec: -22.90, 
        it: "Nebulosa Trifida", en: "Trifid Nebula", es: "Nebulosa Trífida", zh: "三裂星云",
        type: "Nebulosa Mista", mag: "+6.3", dist: "5.200 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Trifida", 
        desc: "Presenta tre tipologie di nebulosa in un colpo: a emissione (rossa), a riflessione (azzurra) e oscura.", tips: "I filtri a banda stretta uccidono la parte blu (a riflessione). Prediligi riprese LRGB o unisci un canale Ha." 
    },
    { 
        id: "m27", name: "M27", size: 8, icon: "🦋", ra: 19.99, dec: 22.72, 
        it: "Nebulosa Manubrio", en: "Dumbbell Nebula", es: "Nebulosa Haltera", zh: "哑铃星云",
        type: "Nebulosa Planetaria", mag: "+7.5", dist: "1.360 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Manubrio", 
        desc: "Nebulosa planetaria grande e vicina. La forma ricorda una clessidra.", tips: "Target fenomenale per i filtri a doppia banda (Ha+OIII). Integrazioni lunghissime rivelano il guscio esterno." 
    },
    { 
        id: "m31", name: "M31", size: 190, icon: "🌌", ra: 0.71, dec: 41.26, 
        it: "Galassia di Andromeda", en: "Andromeda Galaxy", es: "Galaxia de Andrómeda", zh: "仙女座星系",
        type: "Galassia a Spirale", mag: "+3.4", dist: "2.5 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_di_Andromeda", 
        desc: "Il nostro colossale vicino galattico. Estesa per oltre 6 volte la luna piena.", tips: "Servono focali corte (200-400mm). Ottieni il colore in RGB, poi acquisisci H-Alpha per evidenziare le nebulose sui bracci." 
    },
    { 
        id: "m33", name: "M33", size: 70, icon: "🌀", ra: 1.56, dec: 30.66, 
        it: "Galassia del Triangolo", en: "Triangulum Galaxy", es: "Galaxia del Triángulo", zh: "三角座星系",
        type: "Galassia a Spirale", mag: "+5.7", dist: "2.7 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_del_Triangolo", 
        desc: "La terza galassia per grandezza del Gruppo Locale. Spirale vista di faccia.", tips: "Luminosità superficiale molto bassa. Richiede cieli privi di inquinamento luminoso e molta integrazione." 
    },
    { 
        id: "m42", name: "M42", size: 85, icon: "🌌", ra: 5.58, dec: -5.39, 
        it: "Nebulosa di Orione", en: "Orion Nebula", es: "Nebulosa de Orión", zh: "猎户座大星云",
        type: "Nebulosa a Emissione", mag: "+4.0", dist: "1.344 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_di_Orione", 
        desc: "La nebulosa diffusa più luminosa del cielo notturno.", tips: "Il nucleo (Trapezio) si brucia facilmente. Scatta pose brevi (10-30s) e fondile in HDR con pose lunghe (180-300s)." 
    },
    { 
        id: "m45", name: "M45", size: 110, icon: "✨", ra: 3.78, dec: 24.11, 
        it: "Le Pleiadi", en: "Pleiades Cluster", es: "Pléyades", zh: "昴星团",
        type: "Ammasso Aperto", mag: "+1.6", dist: "444 a.l.", link: "https://it.wikipedia.org/wiki/Pleiadi", 
        desc: "Magnifico ammasso aperto circondato da polvere interstellare a riflessione azzurra.", tips: "Nebulosa a riflessione: NON usare filtri a banda stretta (H-Alpha/OIII). Usa solo filtri L-RGB sotto cieli molto bui." 
    },
    { 
        id: "m51", name: "M51", size: 11, icon: "🌀", ra: 13.49, dec: 47.19, 
        it: "Galassia Vortice", en: "Whirlpool Galaxy", es: "Galaxia del Remolino", zh: "涡状星系",
        type: "Galassia a Spirale", mag: "+8.4", dist: "23 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Vortice", 
        desc: "Spettacolare galassia a spirale vista di faccia, in interazione con NGC 5195.", tips: "Richiede focali dal 700mm in su. Riprendi in banda larga (RGB) e aggiungi H-Alpha per le zone di formazione stellare." 
    },
    { 
        id: "m57", name: "M57", size: 1.5, icon: "🍩", ra: 18.89, dec: 33.02, 
        it: "Nebulosa Anello", en: "Ring Nebula", es: "Nebulosa del Anillo", zh: "环状星云",
        type: "Nebulosa Planetaria", mag: "+8.8", dist: "2.300 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Anello", 
        desc: "Guscio di gas espulso da una stella morente.", tips: "È minuscola! Serve tutta la focale che hai. Estremamente brillante nell'OIII, tollera bene la Luna." 
    },
    { 
        id: "m63", name: "M63", size: 12, icon: "🌻", ra: 13.26, dec: 42.03, 
        it: "Galassia Girasole", en: "Sunflower Galaxy", es: "Galaxia del Girasol", zh: "向日葵星系",
        type: "Galassia a Spirale", mag: "+8.6", dist: "29 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Girasole", 
        desc: "Presenta bracci a spirale molto compatti e frammentati (spirale flocculenta).", tips: "Luminosità superficiale buona, ottima in L-RGB. Focali medio-lunghe consigliate." 
    },
    { 
        id: "m64", name: "M64", size: 10, icon: "👁️", ra: 12.95, dec: 21.68, 
        it: "Galassia Occhio Nero", en: "Black Eye Galaxy", es: "Galaxia del Ojo Negro", zh: "黑眼星系",
        type: "Galassia a Spirale", mag: "+8.5", dist: "17 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Occhio_Nero", 
        desc: "Famosa per la spettacolare banda di polvere oscura che assorbe la luce di fronte al suo nucleo luminoso.", tips: "L'esposizione va curata in modo da non bruciare il nucleo e mantenere il contrasto della banda di polvere oscura." 
    },
    { 
        id: "m74", name: "M74", size: 10, icon: "👻", ra: 1.61, dec: 15.79, 
        it: "Galassia Fantasma", en: "Phantom Galaxy", es: "Galaxia Fantasma", zh: "幻影星系",
        type: "Galassia a Spirale", mag: "+9.4", dist: "32 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M74_(astronomia)", 
        desc: "Spirale vista esattamente di faccia. È una delle galassie con la luminosità superficiale più bassa del catalogo.", tips: "Oggetto difficilissimo: richiede cieli NERI e un'integrazione di moltissime ore in banda larga." 
    },
    { 
        id: "m78", name: "M78", size: 8, icon: "👻", ra: 5.78, dec: 0.07, 
        it: "Nebulosa M78", en: "M78 Nebula", es: "Nebulosa M78", zh: "M78 星云",
        type: "Nebulosa a Riflessione", mag: "+8.3", dist: "1.600 a.l.", link: "https://it.wikipedia.org/wiki/M78_(astronomia)", 
        desc: "La nebulosa a riflessione più brillante del cielo, situata in Orione.", tips: "Essendo a riflessione, i filtri H-Alpha e OIII non serviranno a nulla. Riprendi a banda larga da cieli molto scuri." 
    },
    { 
        id: "m81", name: "M81", size: 26, icon: "🌀", ra: 9.92, dec: 69.06, 
        it: "Galassia di Bode", en: "Bode's Galaxy", es: "Galaxia de Bode", zh: "波德星系",
        type: "Galassia a Spirale", mag: "+6.9", dist: "11.7 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_di_Bode", 
        desc: "Maestosa galassia a spirale nell'Orsa Maggiore. Spesso inquadrata con la vicina galassia Sigaro (M82).", tips: "M81 ha bracci molto tenui che richiedono lunghe integrazioni in LRGB. Integra le nebulosità estese circostanti (IFN)." 
    },
    { 
        id: "m82", name: "M82", size: 11, icon: "🚬", ra: 9.93, dec: 69.67, 
        it: "Galassia Sigaro", en: "Cigar Galaxy", es: "Galaxia del Cigarro", zh: "雪茄星系",
        type: "Galassia Starburst", mag: "+8.4", dist: "12 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Sigaro", 
        desc: "Galassia vista di taglio, famosa per i potenti venti galattici che espellono enormi quantità di idrogeno rosso.", tips: "Un'integrazione dedicata in H-Alpha è assolutamente essenziale per catturare i pennacchi rossi dal centro." 
    },
    { 
        id: "m97", name: "M97", size: 3.4, icon: "🦉", ra: 11.24, dec: 55.01, 
        it: "Nebulosa Gufo", en: "Owl Nebula", es: "Nebulosa del Búho", zh: "猫头鹰星云",
        type: "Nebulosa Planetaria", mag: "+9.9", dist: "2.030 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Gufo", 
        desc: "Nebulosa planetaria nell'Orsa Maggiore i cui 'occhi' scuri le danno il nome.", tips: "Ottima per filtri OIII/Ha. Le strutture interne (gli 'occhi') richiedono un buon seeing." 
    },
    { 
        id: "m101", name: "M101", size: 28, icon: "🌀", ra: 14.05, dec: 54.34, 
        it: "Galassia Girandola", en: "Pinwheel Galaxy", es: "Galaxia del Molinete", zh: "风车星系",
        type: "Galassia a Spirale", mag: "+7.8", dist: "20 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Girandola", 
        desc: "Galassia a spirale vista perfettamente di faccia, molto estesa.", tips: "Luminosità superficiale bassissima. Riprendi sotto cieli scurissimi per catturare l'estensione completa dei bracci." 
    },
    { 
        id: "m104", name: "M104", size: 8.6, icon: "🛸", ra: 12.66, dec: -11.62, 
        it: "Galassia Sombrero", en: "Sombrero Galaxy", es: "Galaxia del Sombrero", zh: "草帽星系",
        type: "Galassia a Spirale", mag: "+8.0", dist: "31 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Sombrero", 
        desc: "Divisa da un netto anello di polveri scure.", tips: "Oggetto piccolo. Focale generosa e attenzione a non sovraesporre il nucleo per mantenere leggibile la banda oscura." 
    },
    { 
        id: "m106", name: "M106", size: 18, icon: "🌀", ra: 12.31, dec: 47.30, 
        it: "Galassia M106", en: "M106 Galaxy", es: "Galaxia M106", zh: "M106 星系",
        type: "Galassia a Spirale", mag: "+8.4", dist: "23 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M106", 
        desc: "Galassia peculiare con bracci anomali visibili in H-Alpha.", tips: "Per evidenziare i famosi 'bracci extra', una corposa integrazione in H-Alpha è un must assoluto." 
    },

    // --- GRANDI NEBULOSE E CATALOGO NGC / IC ---
    { 
        id: "ic1805", name: "IC 1805", size: 150, icon: "❤️", ra: 2.55, dec: 61.45, 
        it: "Nebulosa Cuore", en: "Heart Nebula", es: "Nebulosa del Corazón", zh: "心脏星云",
        type: "Nebulosa a Emissione", mag: "+6.5", dist: "7.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Cuore", 
        desc: "Grande nebulosa a emissione in Cassiopea la cui forma ricorda il classico simbolo di un cuore umano.", tips: "Il segnale OIII e SII è molto più debole rispetto all'H-Alpha. Se vuoi fare una vera Hubble Palette (SHO), dedica molto tempo di integrazione a questi due canali." 
    },
    { 
        id: "ic1848", name: "IC 1848", size: 150, icon: "👻", ra: 2.85, dec: 60.40, 
        it: "Nebulosa Anima", en: "Soul Nebula", es: "Nebulosa del Alma", zh: "灵魂星云",
        type: "Nebulosa a Emissione", mag: "+6.5", dist: "7.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Anima", 
        desc: "Vicina alla Nebulosa Cuore, spesso inquadrata assieme ad essa con ottiche a corta focale.", tips: "Eccellente bersaglio per filtri a doppia banda (Ha+OIII) e sensori a colori." 
    },
    { 
        id: "ic1396", name: "IC 1396", size: 170, icon: "🐘", ra: 21.65, dec: 57.50, 
        it: "Nebulosa Proboscide di Elefante", en: "Elephant's Trunk Nebula", es: "Nebulosa Trompa de Elefante", zh: "象鼻星云",
        type: "Nebulosa a Emissione", mag: "+3.5", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/IC_1396", 
        desc: "Vastissima e debole regione di formazione stellare nel Cefeo. Contiene la famosa 'Proboscide'.", tips: "Il complesso è enorme. La 'proboscide' di polveri oscure al centro brilla in modo pazzesco se ripresa e contrastata con filtri a banda stretta." 
    },
    { 
        id: "ic5070", name: "IC 5070", size: 80, icon: "🦤", ra: 20.85, dec: 44.35, 
        it: "Nebulosa Pellicano", en: "Pelican Nebula", es: "Nebulosa del Pelícano", zh: "鹈鹕星云",
        type: "Nebulosa a Emissione", mag: "+8.0", dist: "1.800 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Pellicano", 
        desc: "Situata proprio accanto alla Nebulosa Nord America (NGC 7000), separata da una banda di polveri oscure.", tips: "Perfetta per la palette SHO. Presenta incredibili pilastri di polvere (proboscidi) simili ai Pilastri della Creazione, che richiedono buona risoluzione e molta integrazione." 
    },
    { 
        id: "ngc7000", name: "NGC 7000", size: 120, icon: "🌎", ra: 20.98, dec: 44.33, 
        it: "Nebulosa Nord America", en: "North America Nebula", es: "Nebulosa Norteamérica", zh: "北美洲星云",
        type: "Nebulosa a Emissione", mag: "+4.0", dist: "2.590 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Nord_America", 
        desc: "Una gigantesca nebulosa a emissione nel Cigno la cui forma ricorda il continente nordamericano.", tips: "Oggetto immensamente esteso, perfetto per ottiche grandangolari e mosaici. L'uso di filtri a banda stretta è caldamente consigliato." 
    },
    { 
        id: "ngc2244", name: "NGC 2244", size: 80, icon: "🌹", ra: 6.53, dec: 4.98, 
        it: "Nebulosa Rosetta", en: "Rosette Nebula", es: "Nebulosa Roseta", zh: "玫瑰星云",
        type: "Regione H II", mag: "+9.0", dist: "5.200 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Rosetta", 
        desc: "Un'enorme regione H II di forma circolare. Al suo centro risiede l'ammasso aperto NGC 2244 che ne ionizza i gas.", tips: "Target perfetto per la palette di Hubble (SHO). Il segnale H-Alpha è predominante e fortissimo." 
    },
    { 
        id: "ngc6888", name: "NGC 6888", size: 18, icon: "🌙", ra: 20.20, dec: 38.35, 
        it: "Nebulosa Crescente", en: "Crescent Nebula", es: "Nebulosa Creciente", zh: "眉月星云",
        type: "Nebulosa a Emissione", mag: "+7.4", dist: "5.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Crescente", 
        desc: "Bolla di gas creata dal potentissimo vento stellare di una massiccia stella centrale di tipo Wolf-Rayet.", tips: "Ha un guscio fortissimo e netto in H-Alpha e un inviluppo esterno bellissimo (ma estremamente debole) in OIII. Le doppie bande sono perfette." 
    },
    { 
        id: "ngc6960", name: "NGC 6960", size: 70, icon: "🧹", ra: 20.76, dec: 30.71, 
        it: "Nebulosa Scopa di Strega", en: "Witch's Broom Nebula", es: "Nebulosa Escoba de Bruja", zh: "女巫扫帚星云",
        type: "Resto di Supernova", mag: "+7.0", dist: "1.470 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Velo", 
        desc: "La porzione occidentale della celebre Nebulosa Velo, attraversata visivamente dalla brillante stella 52 Cygni.", tips: "Attenzione ai riflessi e agli aloni causati dalla luminosissima 52 Cygni. Il segnale filamentoso in OIII e Ha è meraviglioso." 
    },
    { 
        id: "ngc6992", name: "NGC 6992", size: 60, icon: "🕸️", ra: 20.94, dec: 31.72, 
        it: "Nebulosa Velo Est", en: "Eastern Veil Nebula", es: "Nebulosa del Velo Oriental", zh: "东面面纱星云",
        type: "Resto di Supernova", mag: "+7.0", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Velo", 
        desc: "La porzione orientale del vastissimo complesso della Nebulosa Velo. Un tripudio di filamenti di gas.", tips: "Risponde magnificamente ai filtri dual-band o OIII puro. Non richiede un numero esagerato di ore per mostrare la sua complessa struttura." 
    },
    { 
        id: "ngc7293", name: "NGC 7293", size: 25, icon: "👁️", ra: 22.49, dec: -20.83, 
        it: "Nebulosa Elica", en: "Helix Nebula", es: "Nebulosa de la Hélice", zh: "螺旋星云",
        type: "Nebulosa Planetaria", mag: "+7.6", dist: "650 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Elica", 
        desc: "Una delle nebulose planetarie più vicine in assoluto alla Terra, nota popolarmente come 'L'Occhio di Dio'.", tips: "Molto bassa sull'orizzonte (per l'Italia). Approfitta delle notti estremamente nitide e senza foschia bassa, altrimenti perderai tutto il segnale OIII." 
    },
    { 
        id: "ngc1499", name: "NGC 1499", size: 160, icon: "🏖️", ra: 4.05, dec: 36.42, 
        it: "Nebulosa California", en: "California Nebula", es: "Nebulosa California", zh: "加利福尼亚星云",
        type: "Nebulosa a Emissione", mag: "+6.0", dist: "1.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_California", 
        desc: "Lunga e immensa nebulosa nel Perseo che ricorda visivamente lo stato della California.", tips: "Emette quasi esclusivamente nel profondo rosso dell'H-Alpha. L'OIII è praticamente assente, quindi un filtro a banda passante stretta singola è sufficiente." 
    },
    { 
        id: "ngc281", name: "NGC 281", size: 35, icon: "👾", ra: 0.88, dec: 56.62, 
        it: "Nebulosa Pacman", en: "Pacman Nebula", es: "Nebulosa Pacman", zh: "吃豆人星云",
        type: "Regione H II", mag: "+7.4", dist: "9.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Pacman", 
        desc: "Prende il nome dal celebre videogioco per la sua forma tonda 'mangiata' da una fetta oscura di polveri (globuli di Bok).", tips: "Fortissimo segnale in H-Alpha. I densi globuli oscuri centrali richiedono un ottimo seeing (bassa turbolenza) per essere risolti nitidamente." 
    },
    { 
        id: "ngc869", name: "NGC 869/884", size: 60, icon: "✨", ra: 2.33, dec: 57.14, 
        it: "Doppio Ammasso del Perseo", en: "Double Cluster in Perseus", es: "Cúmulo Doble de Perseo", zh: "英仙座双星团",
        type: "Ammassi Aperti", mag: "+4.3", dist: "7.500 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Doppio_di_Perseo", 
        desc: "Due spettacolari ammassi aperti di giovani stelle supergiganti vicinissimi l'uno all'altro e visibili a occhio nudo.", tips: "La banda stretta è totalmente inutile qui. Evita tempi di esposizione lunghi per non bruciare i colori delle stelle. Usa solo L-RGB." 
    },
    { 
        id: "ngc5907", name: "NGC 5907", size: 12, icon: "🌌", ra: 15.26, dec: 56.33, 
        it: "Galassia Scheggia", en: "Splinter Galaxy", es: "Galaxia Astilla", zh: "碎片星系",
        type: "Galassia a Spirale", mag: "+10.3", dist: "50 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_5907", 
        desc: "La Galassia Scheggia (Splinter Galaxy) è una galassia a spirale vista perfettamente di taglio (edge-on) nella costellazione del Dragone. È nota per la sua sottile e lunga striscia di polveri scure.", tips: "Essendo una galassia vista di taglio, il contrasto con il fondo cielo è vitale. Usa esclusivamente filtri a banda larga (L-RGB). Richiede un cielo molto buio per evidenziare la delicata banda di polveri centrale che la taglia a metà." 
    },
    { 
        id: "ngc5092", name: "NGC 5092", size: 2, icon: "🌌", ra: 13.33, dec: -23.00, 
        it: "Galassia NGC 5092", en: "NGC 5092 Galaxy", es: "Galaxia NGC 5092", zh: "NGC 5092 星系",
        type: "Galassia Ellittica", mag: "+13.5", dist: "N/D", link: "https://it.wikipedia.org/wiki/NGC_5092", 
        desc: "Una galassia molto debole situata nella costellazione del Centauro. Un bersaglio impegnativo studiato per l'interazione gravitazionale con altre galassie.", tips: "Oggetto di magnitudine molto elevata (+13.5) e ostico. Richiede integrazioni estremamente lunghe, pose generose e assoluta assenza di inquinamento lunare o luminoso." 
    },
    { 
        id: "ngc891", name: "NGC 891", size: 13, icon: "🪡", ra: 2.37, dec: 42.34, 
        it: "Galassia Ago", en: "Needle Galaxy", es: "Galaxia Aguja", zh: "银针星系",
        type: "Galassia a Spirale", mag: "+9.9", dist: "30 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_891", 
        desc: "Un'altra magnifica galassia edge-on nella costellazione di Andromeda. Ha una marcata fascia di polveri che divide il rigonfiamento galattico.", tips: "Molto fotogenica, ma di piccole dimensioni apparenti. Ottima per focali di almeno 800-1000mm. Riprendi in L-RGB nelle notti senza luna." 
    },
    { 
        id: "ngc7331", name: "NGC 7331", size: 10, icon: "🦌", ra: 22.62, dec: 34.41, 
        it: "Galassia del Cervo", en: "Deer Lick Group", es: "Galaxia del Ciervo", zh: "鹿舔星系",
        type: "Galassia a Spirale", mag: "+9.4", dist: "40 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_7331", 
        desc: "Una galassia a spirale non barrata in Pegaso, molto simile per dimensioni e struttura alla nostra Via Lattea.", tips: "Spesso inquadrata nello stesso largo campo (FOV) assieme al vicino Quintetto di Stephan. Ottima per L-RGB." 
    },
    { 
        id: "ngc4565", name: "NGC 4565", size: 15, icon: "🪡", ra: 12.60, dec: 25.99, 
        it: "Galassia Spillo", en: "Needle Galaxy", es: "Galaxia de la Aguja", zh: "针星系",
        type: "Galassia a Spirale", mag: "+9.6", dist: "40 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_4565", 
        desc: "Forse la galassia vista di taglio più famosa e fotografata in assoluto, situata nella Chioma di Berenice.", tips: "Target puramente L-RGB. Focali lunghe (Newton 1000mm o RC) faranno emergere dettagli incredibili nelle nubi di polvere vicine al nucleo." 
    },
    { 
        id: "ngc253", name: "NGC 253", size: 27, icon: "🌪️", ra: 0.79, dec: -25.28, 
        it: "Galassia dello Scultore", en: "Sculptor Galaxy", es: "Galaxia del Escultor", zh: "玉夫座星系",
        type: "Galassia Starburst", mag: "+7.2", dist: "11 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_dello_Scultore", 
        desc: "Galassia con un altissimo tasso di formazione stellare (starburst) e dalle dimensioni apparenti notevoli.", tips: "A causa della sua declinazione molto bassa dall'Italia, sfrutta solo le notti con ottimo seeing e senza inquinamento luminoso verso l'orizzonte sud." 
    },
    { 
        id: "ic434", name: "IC 434", size: 90, icon: "🐴", ra: 5.68, dec: -2.46, 
        it: "Nebulosa Testa di Cavallo", en: "Horsehead Nebula", es: "Nebulosa Cabeza de Caballo", zh: "马头星云",
        type: "Nebulosa Oscura", mag: "+7.3", dist: "1.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Testa_di_Cavallo", 
        desc: "La celebre nebulosa oscura (B33) che si staglia come un'ombra cinese contro la luminosa nebulosa a emissione rossa (IC 434) retrostante.", tips: "Per far staccare nettamente il 'cavallo' scuro dallo sfondo è quasi obbligatorio l'uso di un filtro H-Alpha. Attenzione all'enorme alone riflesso causato dalla brillante stella Alnitak." 
    },
    { 
        id: "markarian", name: "Markarian's Chain", size: 180, icon: "⛓️", ra: 12.45, dec: 13.10, 
        it: "Catena di Markarian", en: "Markarian's Chain", es: "Cadena de Markarian", zh: "马卡良链",
        type: "Ammasso di Galassie", mag: "~ +8.9", dist: "50 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Catena_di_Markarian", 
        desc: "Un affascinante allineamento visivo di galassie appartenenti al gigantesco Ammasso della Vergine. Include M84, M86 e gli 'Occhi'.", tips: "Perfetta per ottiche a corta focale (400-500mm). Fai un'inquadratura diagonale molto curata sul sensore per includere il maggior numero possibile di galassie." 
    },
    { 
        id: "stephan", name: "HCG 92", size: 4, icon: "🖐️", ra: 22.60, dec: 33.96, 
        it: "Quintetto di Stephan", en: "Stephan's Quintet", es: "Quinteto de Stephan", zh: "斯蒂芬五重星系",
        type: "Gruppo di Galassie", mag: "+13.6", dist: "290 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Quintetto_di_Stephan", 
        desc: "Un compatto gruppo visivo di cinque galassie, di cui quattro sono in violentissima interazione gravitazionale. Reso iconico dalla foto inaugurale del James Webb Space Telescope.", tips: "Sono minuscole e debolissime! Usa le focali più lunghe che hai a disposizione (es. C8 o C11) e riprendi esclusivamente in serate dal seeing eccellente." 
    },
    { 
        id: "sh2-155", name: "Sh2-155", size: 50, icon: "🦇", ra: 22.95, dec: 62.62, 
        it: "Nebulosa Grotta", en: "Cave Nebula", es: "Nebulosa de la Cueva", zh: "洞穴星云",
        type: "Nebulosa a Emissione", mag: "+7.7", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/Sh2-155", 
        desc: "Complessa regione di gas a emissione, riflessione e polveri scure nel Cefeo che forma una figura che ricorda l'ingresso di una caverna profonda.", tips: "Target molto ostico. La luminosità superficiale è bassissima, richiede una pazienza infinita in integrazione, specialmente usando filtri a banda stretta." 
    }
];