// ==========================================
// MEGA-DATABASE ASTROFOTOGRAFICO LOCALE (V5.5 Global)
// ==========================================

const dsoDatabase = [
    // --- CATALOGO MESSIER ---
    { 
        id: "m1", name: "M1", size: 6, icon: "💥", ra: 5.575, dec: 22.016, type: "Resto di Supernova", mag: "+8.4", dist: "6.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Granchio",
        it: "Nebulosa Granchio", en: "Crab Nebula", es: "Nebulosa del Cangrejo", zh: "蟹状星云",
        desc_it: "Il resto in espansione della supernova esplosa nel 1054, osservata dagli astronomi cinesi.", desc_en: "The expanding remnant of a supernova that exploded in 1054, observed by Chinese astronomers.", desc_es: "El remanente en expansión de una supernova que explotó en 1054, observada por astrónomos chinos.", desc_zh: "1054年爆发的超新星不断膨胀的遗迹，曾被中国天文学家观测到。",
        tips_it: "Oggetto piccolo ma dettagliato. Richiede focali lunghe. Rende benissimo in banda stretta (HOO o SHO).", tips_en: "Small but detailed object. Requires long focal lengths. Looks great in narrowband (HOO or SHO).", tips_es: "Objeto pequeño pero detallado. Requiere focales largas. Se ve genial en banda estrecha (HOO o SHO).", tips_zh: "目标小但细节丰富。需要长焦距。在窄带（HOO 或 SHO）下表现出色。"
    },
    { 
        id: "m3", name: "M3", size: 18, icon: "🎇", ra: 13.705, dec: 28.377, type: "Ammasso Globulare", mag: "+6.2", dist: "33.900 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Globulare_di_Canes_Venatici",
        it: "Ammasso Globulare M3", en: "M3 Globular Cluster", es: "Cúmulo Globular M3", zh: "M3 球状星团",
        desc_it: "Uno dei più grandi e luminosi ammassi globulari, contiene circa mezzo milione di stelle.", desc_en: "One of the largest and brightest globular clusters, containing about half a million stars.", desc_es: "Uno de los cúmulos globulares más grandes y brillantes, contiene alrededor de medio millón de estrellas.", desc_zh: "最大最亮的球状星团之一，包含约五十万颗恒星。",
        tips_it: "Per gli ammassi la parola d'ordine è risoluzione. Usa pose brevi (60s-120s) a bassi ISO/Gain.", tips_en: "For clusters, resolution is key. Use short exposures (60s-120s) at low ISO/Gain.", tips_es: "Para los cúmulos, la resolución es clave. Usa exposiciones cortas (60s-120s) a bajo ISO/Gain.", tips_zh: "拍摄星团的关键是分辨率。使用低 ISO/Gain 的短曝光（60秒-120秒）。"
    },
    { 
        id: "m4", name: "M4", size: 36, icon: "🎇", ra: 16.393, dec: -26.525, type: "Ammasso Globulare", mag: "+5.6", dist: "7.200 a.l.", link: "https://it.wikipedia.org/wiki/M4_(astronomia)",
        it: "Ammasso Globulare M4", en: "M4 Globular Cluster", es: "Cúmulo Globular M4", zh: "M4 球状星团",
        desc_it: "Uno degli ammassi globulari più vicini alla Terra, situato nello Scorpione vicino ad Antares.", desc_en: "One of the closest globular clusters to Earth, located in Scorpius near Antares.", desc_es: "Uno de los cúmulos globulares más cercanos a la Tierra, situado en Escorpio cerca de Antares.", desc_zh: "距离地球最近的球状星团之一，位于天蝎座心宿二附近。",
        tips_it: "Essendo vicino ad Antares, puoi tentare un'inquadratura a largo campo per catturare le polveri circostanti.", tips_en: "Being close to Antares, try a wide-field framing to capture the surrounding dust.", tips_es: "Al estar cerca de Antares, intenta un encuadre de campo amplio para capturar el polvo circundante.", tips_zh: "由于靠近心宿二，可以尝试广角构图来捕捉周围的星际尘埃。"
    },
    { 
        id: "m8", name: "M8", size: 90, icon: "🌊", ra: 18.06, dec: -24.38, type: "Regione H II", mag: "+6.0", dist: "4.100 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Laguna", hdr: 15,
        it: "Nebulosa Laguna", en: "Lagoon Nebula", es: "Nebulosa de la Laguna", zh: "礁湖星云",
        desc_it: "Gigantesca nube interstellare nel Sagittario, visibile a occhio nudo.", desc_en: "Giant interstellar cloud in Sagittarius, visible to the naked eye.", desc_es: "Gigantesca nube interestelar en Sagitario, visible a simple vista.", desc_zh: "位于人马座的巨大星际云，肉眼可见。",
        tips_it: "Oggetto estivo per eccellenza. Il nucleo è luminosissimo. Segnale incredibile sia in RGB che in SHO.", tips_en: "A prime summer target. The core is very bright. Incredible signal in both RGB and SHO.", tips_es: "Un objetivo de verano excelente. El núcleo es muy brillante. Señal increíble tanto en RGB como en SHO.", tips_zh: "夏季绝佳目标。核心非常明亮。在 RGB 和 SHO 下都有极好的信号。"
    },
    { 
        id: "m11", name: "M11", size: 14, icon: "🦆", ra: 18.85, dec: -6.27, type: "Ammasso Aperto", mag: "+5.8", dist: "6.200 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Anitra_Selvatica",
        it: "Ammasso Anitra Selvatica", en: "Wild Duck Cluster", es: "Cúmulo del Pato Salvaje", zh: "野鸭星团",
        desc_it: "Un ammasso aperto incredibilmente denso e ricco di stelle nello Scudo.", desc_en: "An incredibly dense and star-rich open cluster in Scutum.", desc_es: "Un cúmulo abierto increíblemente denso y rico en estrellas en el Escudo.", desc_zh: "位于盾牌座，一个极其密集且富含恒星的疏散星团。",
        tips_it: "Magnifico bersaglio in banda larga. Mantieni i tempi brevi per preservare i colori stellari rossi e blu.", tips_en: "Magnificent broadband target. Keep exposures short to preserve the red and blue stellar colors.", tips_es: "Magnífico objetivo en banda ancha. Mantén exposiciones cortas para preservar los colores estelares rojos y azules.", tips_zh: "极好的宽带目标。保持短曝光以保留恒星的红蓝色泽。"
    },
    { 
        id: "m13", name: "M13", size: 20, icon: "🎇", ra: 16.69, dec: 36.46, type: "Ammasso Globulare", mag: "+5.8", dist: "22.200 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Globulare_di_Ercole", hdr: 8,
        it: "Grande Ammasso d'Ercole", en: "Hercules Globular Cluster", es: "Gran Cúmulo de Hércules", zh: "武仙座球状星团",
        desc_it: "Il più celebre e luminoso ammasso globulare boreale.", desc_en: "The most famous and brightest globular cluster in the northern hemisphere.", desc_es: "El cúmulo globular más famoso y brillante del hemisferio norte.", desc_zh: "北半球最著名且最亮的球状星团。",
        tips_it: "Evita la sovraesposizione del nucleo. Posa breve e dithering per mantenere i colori delle stelle.", tips_en: "Avoid overexposing the core. Use short exposures and dithering to retain star colors.", tips_es: "Evita sobreexponer el núcleo. Usa exposiciones cortas y dithering para retener el color de las estrellas.", tips_zh: "避免核心过曝。使用短曝光和抖动来保留恒星颜色。"
    },
    { 
        id: "m16", name: "M16", size: 70, icon: "🦅", ra: 18.31, dec: -13.81, type: "Regione H II", mag: "+6.0", dist: "7.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Aquila",
        it: "Nebulosa Aquila", en: "Eagle Nebula", es: "Nebulosa del Águila", zh: "老鹰星云",
        desc_it: "Giovane ammasso aperto circondato da gas. Al centro si trovano i famosi 'Pilastri della Creazione'.", desc_en: "Young open cluster surrounded by gas. At its center lie the famous 'Pillars of Creation'.", desc_es: "Joven cúmulo abierto rodeado de gas. En su centro se encuentran los famosos 'Pilares de la Creación'.", desc_zh: "被气体包围的年轻疏散星团。其中心是著名的“创生之柱”。",
        tips_it: "IL target per la Hubble Palette (SHO). Il segnale dell'OIII e dello SII è molto buono.", tips_en: "THE target for the Hubble Palette (SHO). OIII and SII signals are very strong.", tips_es: "EL objetivo para la Paleta Hubble (SHO). Las señales de OIII y SII son muy fuertes.", tips_zh: "哈勃色调 (SHO) 的绝佳目标。OIII 和 SII 的信号都非常好。"
    },
    { 
        id: "m17", name: "M17", size: 11, icon: "🦢", ra: 18.34, dec: -16.17, type: "Regione H II", mag: "+6.0", dist: "5.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Omega",
        it: "Nebulosa Omega / Cigno", en: "Omega Nebula (Swan)", es: "Nebulosa Omega", zh: "天鹅星云",
        desc_it: "Brillantissima regione di formazione stellare nel Sagittario.", desc_en: "Extremely bright star-forming region in Sagittarius.", desc_es: "Región de formación estelar extremadamente brillante en Sagitario.", desc_zh: "人马座中极其明亮的恒星形成区。",
        tips_it: "Luminosità superficiale altissima in H-Alpha. Non saturare il nucleo centrale.", tips_en: "Very high surface brightness in H-Alpha. Do not saturate the central core.", tips_es: "Brillo superficial muy alto en H-Alfa. No satures el núcleo central.", tips_zh: "在 H-Alpha 通道中表面亮度极高。注意不要让核心过曝饱和。"
    },
    { 
        id: "m20", name: "M20", size: 28, icon: "🌸", ra: 18.040, dec: -22.980, type: "Nebulosa Mista", mag: "+6.3", dist: "5.200 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Trifida", hdr: 10,
        it: "Nebulosa Trifida", en: "Trifid Nebula", es: "Nebulosa Trífida", zh: "三裂星云",
        desc_it: "Presenta tre tipologie di nebulosa in un colpo: a emissione (rossa), a riflessione (azzurra) e oscura.", desc_en: "Features three types of nebulae in one: emission (red), reflection (blue), and dark.", desc_es: "Presenta tres tipos de nebulosa en una: de emisión (roja), de reflexión (azul) y oscura.", desc_zh: "同时具有三种类型的星云：发射（红色）、反射（蓝色）和暗星云。",
        tips_it: "I filtri a banda stretta uccidono la parte blu (a riflessione). Prediligi riprese LRGB o unisci un canale Ha.", tips_en: "Narrowband filters will kill the blue reflection part. Prefer LRGB or blend an Ha channel.", tips_es: "Los filtros de banda estrecha matarán la parte azul. Prefiere LRGB o combina un canal Ha.", tips_zh: "窄带滤镜会过滤掉蓝色的反射部分。建议首选 LRGB 或混合 Ha 通道。"
    },
    { 
        id: "m27", name: "M27", size: 8, icon: "🦋", ra: 19.99, dec: 22.72, type: "Nebulosa Planetaria", mag: "+7.5", dist: "1.360 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Manubrio", hdr: 15,
        it: "Nebulosa Manubrio", en: "Dumbbell Nebula", es: "Nebulosa Haltera", zh: "哑铃星云",
        desc_it: "Nebulosa planetaria grande e vicina. La forma ricorda una clessidra.", desc_en: "Large and close planetary nebula. Its shape resembles an hourglass.", desc_es: "Nebulosa planetaria grande y cercana. Su forma recuerda a un reloj de arena.", desc_zh: "巨大且较近的行星状星云。形状像一个沙漏。",
        tips_it: "Target fenomenale per i filtri a doppia banda (Ha+OIII). Integrazioni lunghissime rivelano il guscio esterno.", tips_en: "Phenomenal target for dual-band filters (Ha+OIII). Very long integrations reveal the outer shell.", tips_es: "Objetivo fenomenal para filtros de doble banda (Ha+OIII). Integraciones muy largas revelan la envoltura exterior.", tips_zh: "双带滤镜 (Ha+OIII) 的绝佳目标。超长曝光可以揭示其外部气壳。"
    },
    { 
        id: "m31", name: "M31", size: 190, icon: "🌌", ra: 0.71, dec: 41.26, type: "Galassia a Spirale", mag: "+3.4", dist: "2.5 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_di_Andromeda", hdr: 30,
        it: "Galassia di Andromeda", en: "Andromeda Galaxy", es: "Galaxia de Andrómeda", zh: "仙女座星系",
        desc_it: "Il nostro colossale vicino galattico. Estesa per oltre 6 volte la luna piena.", desc_en: "Our colossal galactic neighbor. It spans over 6 times the size of the full moon.", desc_es: "Nuestro colosal vecino galáctico. Se extiende por más de 6 veces el tamaño de la luna llena.", desc_zh: "我们巨大的星系邻居。其跨度超过满月大小的 6 倍。",
        tips_it: "Servono focali corte (200-400mm). Ottieni il colore in RGB, poi acquisisci H-Alpha per le nebulose sui bracci.", tips_en: "Short focal lengths needed (200-400mm). Get color in RGB, then shoot H-Alpha for the nebulae on its arms.", tips_es: "Se necesitan focales cortas (200-400mm). Consigue el color en RGB, luego captura H-Alfa para las nebulosas.", tips_zh: "需要短焦距（200-400mm）。在 RGB 下获取色彩，然后拍摄 H-Alpha 以突出旋臂上的星云。"
    },
    { 
        id: "m33", name: "M33", size: 70, icon: "🌀", ra: 1.56, dec: 30.66, type: "Galassia a Spirale", mag: "+5.7", dist: "2.7 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_del_Triangolo",
        it: "Galassia del Triangolo", en: "Triangulum Galaxy", es: "Galaxia del Triángulo", zh: "三角座星系",
        desc_it: "La terza galassia per grandezza del Gruppo Locale. Spirale vista di faccia.", desc_en: "The third largest galaxy in the Local Group. A face-on spiral.", desc_es: "La tercera galaxia más grande del Grupo Local. Una espiral vista de frente.", desc_zh: "本星系群中第三大星系。正面朝向我们的螺旋星系。",
        tips_it: "Luminosità superficiale molto bassa. Richiede cieli privi di inquinamento luminoso e molta integrazione.", tips_en: "Very low surface brightness. Requires dark skies without light pollution and lots of integration.", tips_es: "Brillo superficial muy bajo. Requiere cielos oscuros sin contaminación lumínica y mucha integración.", tips_zh: "表面亮度极低。需要没有光害的暗夜天空和大量的曝光堆栈。"
    },
    { 
        id: "m42", name: "M42", size: 85, icon: "🌌", ra: 5.58, dec: -5.39, type: "Nebulosa a Emissione", mag: "+4.0", dist: "1.344 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_di_Orione", hdr: 10,
        it: "Nebulosa di Orione", en: "Orion Nebula", es: "Nebulosa de Orión", zh: "猎户座大星云",
        desc_it: "La nebulosa diffusa più luminosa del cielo notturno.", desc_en: "The brightest diffuse nebula in the night sky.", desc_es: "La nebulosa difusa más brillante del cielo nocturno.", desc_zh: "夜空中最明亮的弥漫星云。",
        tips_it: "Il nucleo (Trapezio) si brucia facilmente. Scatta pose brevi (10s) e fondile in HDR con pose lunghe (180s).", tips_en: "The core (Trapezium) blows out easily. Shoot short exposures (10s) and HDR blend them with long ones (180s).", tips_es: "El núcleo se quema fácilmente. Haz exposiciones cortas (10s) y combínalas en HDR con tomas largas (180s).", tips_zh: "核心（四边形星团）极易过曝。拍摄短曝光（10秒）并与长曝光（180秒）进行 HDR 合成。"
    },
    { 
        id: "m43", name: "M43", size: 20, icon: "🌌", ra: 5.592, dec: -5.27, type: "Nebulosa a Emissione", mag: "+9.0", dist: "1.344 a.l.", link: "https://it.wikipedia.org/wiki/NGC_1982",
        it: "Nebulosa De Mairan (NGC 1982)", en: "De Mairan's Nebula (NGC 1982)", es: "Nebulosa de De Mairan (NGC 1982)", zh: "德·迈兰星云 (NGC 1982)",
        desc_it: "Nebulosa a emissione separata visivamente da M42 ma parte dello stesso complesso nebulare di Orione. Contiene la stella OriA (HD 37688) che ionizza il gas circostante.", desc_en: "Emission nebula visually separated from M42 but part of the same Orion nebular complex. Contains the star OriA (HD 37688) which ionizes the surrounding gas.", desc_es: "Nebulosa de emisión visualmente separada de M42 pero parte del mismo complejo nebular de Orión.", desc_zh: "发射星云，在视觉上与M42分开，但属于同一猎户座星云复合体。",
        tips_it: "Spesso fotografata insieme a M42. Posa più lunga rispetto al nucleo di M42 per non sovraesporla. Ottima con filtro Ha.", tips_en: "Often photographed alongside M42. Longer exposure than the M42 core to avoid overexposure. Excellent with Ha filter.", tips_es: "A menudo fotografiada junto a M42. Mayor exposición que el núcleo de M42. Excelente con filtro Ha.", tips_zh: "经常与M42一起拍摄。曝光时间比M42核心长。Ha滤镜效果出色。"
    },
    { 
        id: "m45", name: "M45", size: 110, icon: "✨", ra: 3.78, dec: 24.11, type: "Ammasso Aperto", mag: "+1.6", dist: "444 a.l.", link: "https://it.wikipedia.org/wiki/Pleiadi", hdr: 20,
        it: "Le Pleiadi", en: "Pleiades Cluster", es: "Pléyades", zh: "昴星团",
        desc_it: "Magnifico ammasso aperto circondato da polvere interstellare a riflessione azzurra.", desc_en: "Magnificent open cluster surrounded by blue reflection interstellar dust.", desc_es: "Magnífico cúmulo abierto rodeado de polvo interestelar de reflexión azul.", desc_zh: "壮丽的疏散星团，被蓝色的星际反射尘埃包围。",
        tips_it: "Nebulosa a riflessione: NON usare filtri a banda stretta. Usa solo filtri L-RGB sotto cieli molto bui.", tips_en: "Reflection nebula: DO NOT use narrowband filters. Use only L-RGB under very dark skies.", tips_es: "Nebulosa de reflexión: NO uses filtros de banda estrecha. Usa solo L-RGB bajo cielos muy oscuros.", tips_zh: "反射星云：千万不要使用窄带滤镜。仅在非常黑暗的天空下使用 L-RGB 滤镜。"
    },
    { 
        id: "m51", name: "M51", size: 11, icon: "🌀", ra: 13.49, dec: 47.19, type: "Galassia a Spirale", mag: "+8.4", dist: "23 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Vortice",
        it: "Galassia Vortice", en: "Whirlpool Galaxy", es: "Galaxia del Remolino", zh: "涡状星系",
        desc_it: "Spettacolare galassia a spirale vista di faccia, in interazione con NGC 5195.", desc_en: "Spectacular face-on spiral galaxy interacting with NGC 5195.", desc_es: "Espectacular galaxia espiral vista de frente, interactuando con NGC 5195.", desc_zh: "壮观的正面螺旋星系，正在与 NGC 5195 发生引力相互作用。",
        tips_it: "Richiede focali dal 700mm in su. Riprendi in L-RGB e aggiungi H-Alpha per le zone di formazione stellare.", tips_en: "Requires focal lengths of 700mm+. Shoot in L-RGB and add H-Alpha for star-forming regions.", tips_es: "Requiere focales de 700mm+. Dispara en L-RGB y añade H-Alfa para las zonas de formación estelar.", tips_zh: "需要 700mm 以上焦距。拍摄 L-RGB，并添加 H-Alpha 以突出恒星形成区。"
    },
    { 
        id: "m57", name: "M57", size: 1.5, icon: "🍩", ra: 18.89, dec: 33.02, type: "Nebulosa Planetaria", mag: "+8.8", dist: "2.300 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Anello", hdr: 20,
        it: "Nebulosa Anello", en: "Ring Nebula", es: "Nebulosa del Anillo", zh: "环状星云",
        desc_it: "Guscio di gas espulso da una stella morente.", desc_en: "Gas shell expelled by a dying star.", desc_es: "Cáscara de gas expulsada por una estrella moribunda.", desc_zh: "濒死恒星抛出的气体外壳。",
        tips_it: "È minuscola! Serve tutta la focale che hai. Estremamente brillante nell'OIII, tollera bene la Luna.", tips_en: "It's tiny! Use all the focal length you have. Extremely bright in OIII, tolerates moonlight well.", tips_es: "¡Es diminuta! Usa toda la focal que tengas. Extremadamente brillante en OIII, tolera bien la Luna.", tips_zh: "目标极小！使用你能用的最大焦距。在 OIII 通道中极亮，能够很好地抗月光干扰。"
    },
    { 
        id: "m63", name: "M63", size: 12, icon: "🌻", ra: 13.26, dec: 42.03, type: "Galassia a Spirale", mag: "+8.6", dist: "29 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Girasole",
        it: "Galassia Girasole", en: "Sunflower Galaxy", es: "Galaxia del Girasol", zh: "向日葵星系",
        desc_it: "Presenta bracci a spirale molto compatti e frammentati (spirale flocculenta).", desc_en: "Features very compact and fragmented spiral arms (flocculent spiral).", desc_es: "Presenta brazos espirales muy compactos y fragmentados (espiral floculenta).", desc_zh: "具有非常紧密且碎片化的旋臂（絮状螺旋星系）。",
        tips_it: "Luminosità superficiale buona, ottima in L-RGB. Focali medio-lunghe consigliate.", tips_en: "Good surface brightness, great in L-RGB. Medium-long focal lengths recommended.", tips_es: "Buen brillo superficial, genial en L-RGB. Se recomiendan focales medias-largas.", tips_zh: "表面亮度良好，非常适合 L-RGB 拍摄。建议使用中长焦距。"
    },
    { 
        id: "m64", name: "M64", size: 10, icon: "👁️", ra: 12.95, dec: 21.68, type: "Galassia a Spirale", mag: "+8.5", dist: "17 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Occhio_Nero",
        it: "Galassia Occhio Nero", en: "Black Eye Galaxy", es: "Galaxia del Ojo Negro", zh: "黑眼星系",
        desc_it: "Famosa per la spettacolare banda di polvere oscura di fronte al suo nucleo.", desc_en: "Famous for the spectacular dark dust band in front of its bright core.", desc_es: "Famosa por la espectacular banda de polvo oscuro frente a su núcleo brillante.", desc_zh: "因其明亮核心前方的壮观暗尘带而闻名。",
        tips_it: "L'esposizione non deve bruciare il nucleo per mantenere il contrasto della banda oscura.", tips_en: "Exposure must not blow out the core to maintain the contrast of the dark band.", tips_es: "La exposición no debe quemar el núcleo para mantener el contraste de la banda oscura.", tips_zh: "曝光时不要让核心过曝，以保持黑色尘埃带的对比度。"
    },
    { 
        id: "m74", name: "M74", size: 10, icon: "👻", ra: 1.61, dec: 15.79, type: "Galassia a Spirale", mag: "+9.4", dist: "32 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M74_(astronomia)",
        it: "Galassia Fantasma", en: "Phantom Galaxy", es: "Galaxia Fantasma", zh: "幻影星系",
        desc_it: "Spirale vista di faccia con una luminosità superficiale bassissima.", desc_en: "Face-on spiral with a very low surface brightness.", desc_es: "Espiral vista de frente con un brillo superficial muy bajo.", desc_zh: "正面朝向的螺旋星系，表面亮度极低。",
        tips_it: "Oggetto difficilissimo: richiede cieli NERI e un'integrazione di moltissime ore in banda larga.", tips_en: "Very difficult object: requires perfectly dark skies and many hours of broadband integration.", tips_es: "Objeto muy difícil: requiere cielos negros y muchas horas de integración en banda ancha.", tips_zh: "极难拍摄的目标：需要完美的漆黑夜空和长达数小时的宽带曝光。"
    },
    { 
        id: "m78", name: "M78", size: 8, icon: "👻", ra: 5.78, dec: 0.07, type: "Nebulosa a Riflessione", mag: "+8.3", dist: "1.600 a.l.", link: "https://it.wikipedia.org/wiki/M78_(astronomia)",
        it: "Nebulosa M78", en: "M78 Nebula", es: "Nebulosa M78", zh: "M78 星云",
        desc_it: "La nebulosa a riflessione più brillante del cielo, situata in Orione.", desc_en: "The brightest reflection nebula in the sky, located in Orion.", desc_es: "La nebulosa de reflexión más brillante del cielo, situada en Orión.", desc_zh: "天空中最亮的反射星云，位于猎户座。",
        tips_it: "Essendo a riflessione, i filtri H-Alpha non servono a nulla. Riprendi a banda larga da cieli molto scuri.", tips_en: "As a reflection nebula, Ha filters are useless. Shoot broadband under very dark skies.", tips_es: "Al ser de reflexión, los filtros Ha no sirven. Dispara en banda ancha desde cielos muy oscuros.", tips_zh: "作为反射星云，Ha 滤镜毫无用处。在黑暗的天空下进行宽带拍摄。"
    },
    { 
        id: "m81", name: "M81", size: 26, icon: "🌀", ra: 9.92, dec: 69.06, type: "Galassia a Spirale", mag: "+6.9", dist: "11.7 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_di_Bode", hdr: 20,
        it: "Galassia di Bode", en: "Bode's Galaxy", es: "Galaxia de Bode", zh: "波德星系",
        desc_it: "Maestosa galassia a spirale. Spesso inquadrata con la vicina galassia Sigaro (M82).", desc_en: "Majestic spiral galaxy. Often framed with the nearby Cigar Galaxy (M82).", desc_es: "Majestuosa galaxia espiral. A menudo encuadrada con la cercana Galaxia del Cigarro (M82).", desc_zh: "壮丽的螺旋星系。通常与附近的雪茄星系 (M82) 同框拍摄。",
        tips_it: "Ha bracci molto tenui che richiedono lunghe integrazioni. Integra le nebulosità estese circostanti (IFN).", tips_en: "Has faint arms requiring long integrations. Push to reveal the surrounding Integrated Flux Nebula (IFN).", tips_es: "Tiene brazos tenues que requieren integraciones largas. Intenta revelar la nebulosidad circundante (IFN).", tips_zh: "其微弱的旋臂需要长时间曝光。努力呈现周围的综合通量星云 (IFN)。"
    },
    { 
        id: "m82", name: "M82", size: 11, icon: "🚬", ra: 9.93, dec: 69.67, type: "Galassia Starburst", mag: "+8.4", dist: "12 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Sigaro",
        it: "Galassia Sigaro", en: "Cigar Galaxy", es: "Galaxia del Cigarro", zh: "雪茄星系",
        desc_it: "Galassia vista di taglio, nota per i venti galattici che espellono idrogeno rosso.", desc_en: "Edge-on galaxy, known for galactic winds expelling red hydrogen gas.", desc_es: "Galaxia vista de canto, conocida por sus vientos galácticos que expulsan hidrógeno rojo.", desc_zh: "边缘朝向我们的星系，以其喷射出红色氢气体的星系风而闻名。",
        tips_it: "Un'integrazione dedicata in H-Alpha è essenziale per catturare i pennacchi rossi dal centro.", tips_en: "A dedicated H-Alpha integration is essential to capture the red plumes from the core.", tips_es: "Una integración dedicada en H-Alfa es esencial para capturar los penachos rojos del núcleo.", tips_zh: "使用 H-Alpha 专属曝光对于捕捉核心喷出的红色气流至关重要。"
    },
    { 
        id: "m97", name: "M97", size: 3.4, icon: "🦉", ra: 11.24, dec: 55.01, type: "Nebulosa Planetaria", mag: "+9.9", dist: "2.030 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Gufo",
        it: "Nebulosa Gufo", en: "Owl Nebula", es: "Nebulosa del Búho", zh: "猫头鹰星云",
        desc_it: "Nebulosa planetaria nell'Orsa Maggiore i cui 'occhi' scuri le danno il nome.", desc_en: "Planetary nebula in Ursa Major whose dark 'eyes' give it its name.", desc_es: "Nebulosa planetaria en la Osa Mayor cuyos 'ojos' oscuros le dan su nombre.", desc_zh: "大熊座中的行星状星云，因其暗淡的“眼睛”而得名。",
        tips_it: "Ottima per filtri OIII/Ha. Le strutture interne richiedono un ottimo seeing.", tips_en: "Great for OIII/Ha filters. Internal structures require excellent seeing.", tips_es: "Genial para filtros OIII/Ha. Las estructuras internas requieren un seeing excelente.", tips_zh: "非常适合 OIII/Ha 滤镜。内部结构的拍摄需要极佳的视宁度。"
    },
    { 
        id: "m101", name: "M101", size: 28, icon: "🌀", ra: 14.05, dec: 54.34, type: "Galassia a Spirale", mag: "+7.8", dist: "20 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Girandola",
        it: "Galassia Girandola", en: "Pinwheel Galaxy", es: "Galaxia del Molinete", zh: "风车星系",
        desc_it: "Galassia a spirale vista perfettamente di faccia, molto estesa.", desc_en: "A perfectly face-on spiral galaxy, very large in apparent size.", desc_es: "Una galaxia espiral vista perfectamente de frente, de gran tamaño aparente.", desc_zh: "一个完美的正面朝向螺旋星系，表观面积非常大。",
        tips_it: "Luminosità superficiale bassissima. Riprendi sotto cieli scurissimi per l'estensione completa.", tips_en: "Very low surface brightness. Shoot under pitch-black skies to capture its full extent.", tips_es: "Brillo superficial muy bajo. Dispara bajo cielos muy oscuros para capturar toda su extensión.", tips_zh: "表面亮度极低。在极黑的天空下拍摄以捕捉其完整的全貌。"
    },
    { 
        id: "m104", name: "M104", size: 8.6, icon: "🛸", ra: 12.66, dec: -11.62, type: "Galassia a Spirale", mag: "+8.0", dist: "31 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Sombrero", hdr: 10,
        it: "Galassia Sombrero", en: "Sombrero Galaxy", es: "Galaxia del Sombrero", zh: "草帽星系",
        desc_it: "Divisa da un netto anello di polveri scure che le dà la forma di un cappello.", desc_en: "Divided by a sharp dark dust ring that gives it the shape of a hat.", desc_es: "Dividida por un nítido anillo de polvo oscuro que le da forma de sombrero.", desc_zh: "被清晰的黑色尘埃环分割，使其看起来像一顶帽子。",
        tips_it: "Oggetto piccolo. Focale generosa e attenzione a non sovraesporre il nucleo bianco.", tips_en: "Small target. Use long focal lengths and avoid overexposing the white core.", tips_es: "Objetivo pequeño. Usa focales largas y evita sobreexponer el núcleo blanco.", tips_zh: "目标较小。使用长焦距，并注意避免让白色核心过曝。"
    },
    { 
        id: "m106", name: "M106", size: 18, icon: "🌀", ra: 12.31, dec: 47.30, type: "Galassia a Spirale", mag: "+8.4", dist: "23 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M106",
        it: "Galassia M106", en: "M106 Galaxy", es: "Galaxia M106", zh: "M106 星系",
        desc_it: "Galassia peculiare con due bracci anomali extra, composti di gas caldo.", desc_en: "Peculiar galaxy with two extra anomalous arms made of hot gas.", desc_es: "Galaxia peculiar con dos brazos anómalos extra de gas caliente.", desc_zh: "一个奇特的星系，有两条由热气体组成的额外异常旋臂。",
        tips_it: "Per evidenziare i famosi 'bracci extra', una corposa integrazione in H-Alpha è un must.", tips_en: "To reveal the famous 'extra arms', a heavy H-Alpha integration is a must.", tips_es: "Para revelar los 'brazos extra', una fuerte integración en H-Alfa es obligatoria.", tips_zh: "为了突出著名的“额外旋臂”，必须进行大量的 H-Alpha 通道曝光。"
    },

    // --- GRANDI NEBULOSE E NGC ---
    { 
        id: "ic1805", name: "IC 1805", size: 150, icon: "❤️", ra: 2.55, dec: 61.45, type: "Nebulosa a Emissione", mag: "+6.5", dist: "7.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Cuore",
        it: "Nebulosa Cuore", en: "Heart Nebula", es: "Nebulosa del Corazón", zh: "心脏星云",
        desc_it: "Grande nebulosa a emissione in Cassiopea la cui forma ricorda un cuore umano.", desc_en: "Large emission nebula in Cassiopeia shaped like a human heart.", desc_es: "Gran nebulosa de emisión en Casiopea con forma de corazón humano.", desc_zh: "仙后座的大型发射星云，形状酷似人类心脏。",
        tips_it: "Il segnale OIII e SII è debole. Per una Hubble Palette (SHO) dedica molto tempo all'OIII.", tips_en: "OIII and SII signals are weak. For a Hubble Palette (SHO), dedicate a lot of time to OIII.", tips_es: "Las señales de OIII y SII son débiles. Para la Paleta Hubble dedica mucho tiempo al OIII.", tips_zh: "OIII 和 SII 信号较弱。如果要合成哈勃色 (SHO)，请为 OIII 分配大量时间。"
    },
    { 
        id: "ic1848", name: "IC 1848", size: 150, icon: "👻", ra: 2.85, dec: 60.40, type: "Nebulosa a Emissione", mag: "+6.5", dist: "7.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Anima",
        it: "Nebulosa Anima", en: "Soul Nebula", es: "Nebulosa del Alma", zh: "灵魂星云",
        desc_it: "Vicina alla Nebulosa Cuore, spesso inquadrata assieme ad essa con lenti corte.", desc_en: "Next to the Heart Nebula, often framed together using short lenses.", desc_es: "Junto a la Nebulosa del Corazón, a menudo encuadrada con ella usando focales cortas.", desc_zh: "毗邻心脏星云，经常用短焦段镜头将它们拍在同一画面中。",
        tips_it: "Eccellente bersaglio per filtri a doppia banda (Ha+OIII) e sensori a colori.", tips_en: "Excellent target for dual-band filters (Ha+OIII) and OSC color sensors.", tips_es: "Excelente objetivo para filtros de doble banda (Ha+OIII) y sensores a color.", tips_zh: "双带滤镜 (Ha+OIII) 和彩色相机的绝佳目标。"
    },
    { 
        id: "ic1396", name: "IC 1396", size: 170, icon: "🐘", ra: 21.65, dec: 57.50, type: "Nebulosa a Emissione", mag: "+3.5", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/IC_1396",
        it: "Proboscide di Elefante", en: "Elephant's Trunk Nebula", es: "Trompa de Elefante", zh: "象鼻星云",
        desc_it: "Vastissima e debole regione di formazione stellare nel Cefeo. Contiene la 'Proboscide'.", desc_en: "A vast, faint star-forming region in Cepheus. Contains the dark 'Trunk'.", desc_es: "Vasta y tenue región de formación estelar en Cefeo. Contiene la 'Trompa'.", desc_zh: "仙王座中一个巨大但暗淡的恒星形成区。包含黑色的“象鼻”。",
        tips_it: "Il complesso è enorme. Usa banda stretta per far staccare nettamente la proboscide scura.", tips_en: "The complex is huge. Use narrowband to make the dark trunk pop out clearly.", tips_es: "El complejo es enorme. Usa banda estrecha para que la trompa oscura resalte.", tips_zh: "整个复合体非常巨大。使用窄带滤镜让暗淡的象鼻清晰地凸显出来。"
    },
    { 
        id: "ic5070", name: "IC 5070", size: 80, icon: "🦤", ra: 20.85, dec: 44.35, type: "Nebulosa a Emissione", mag: "+8.0", dist: "1.800 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Pellicano",
        it: "Nebulosa Pellicano", en: "Pelican Nebula", es: "Nebulosa del Pelícano", zh: "鹈鹕星云",
        desc_it: "Vicina alla Nord America, separata da una spessa banda di polveri oscure.", desc_en: "Close to the North America Nebula, separated by a thick dark dust band.", desc_es: "Cercana a la Norteamérica, separada por una gruesa banda de polvo oscuro.", desc_zh: "靠近北美洲星云，由一条厚厚的暗尘带隔开。",
        tips_it: "Perfetta per la palette SHO. I 'Pilastri' centrali richiedono molta integrazione e seeing.", tips_en: "Perfect for the SHO palette. The central 'Pillars' require lots of integration and good seeing.", tips_es: "Perfecta para la paleta SHO. Los 'Pilares' centrales requieren mucha integración.", tips_zh: "SHO 色调的完美选择。中央的“柱子”需要大量的曝光时间和良好的视宁度。"
    },
    { 
        id: "ngc7000", name: "NGC 7000", size: 120, icon: "🌎", ra: 20.98, dec: 44.33, type: "Nebulosa a Emissione", mag: "+4.0", dist: "2.590 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Nord_America",
        it: "Nebulosa Nord America", en: "North America Nebula", es: "Nebulosa Norteamérica", zh: "北美洲星云",
        desc_it: "Gigantesca nebulosa nel Cigno la cui forma ricorda il continente nordamericano.", desc_en: "Giant nebula in Cygnus shaped like the North American continent.", desc_es: "Gigantesca nebulosa en el Cisne con la forma del continente norteamericano.", desc_zh: "天鹅座的巨大星云，形状酷似北美大陆。",
        tips_it: "Oggetto immenso, perfetto per mosaici o grandangolari. L'H-Alpha è d'obbligo.", tips_en: "Immense object, perfect for mosaics or wide lenses. H-Alpha is a must.", tips_es: "Objeto inmenso, perfecto para mosaicos o grandes angulares. H-Alfa es obligatorio.", tips_zh: "巨大的目标，非常适合拼接或广角镜头。H-Alpha 通道是必不可少的。"
    },
    { 
        id: "ngc2244", name: "NGC 2244", size: 80, icon: "🌹", ra: 6.53, dec: 4.98, type: "Regione H II", mag: "+9.0", dist: "5.200 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Rosetta",
        it: "Nebulosa Rosetta", en: "Rosette Nebula", es: "Nebulosa Roseta", zh: "玫瑰星云",
        desc_it: "Enorme regione H II di forma circolare con un ammasso che ne ionizza i gas.", desc_en: "Huge circular H II region with an open cluster ionizing its gases.", desc_es: "Enorme región H II circular con un cúmulo abierto que ioniza sus gases.", desc_zh: "巨大的圆形 H II 区，其中心的疏散星团电离了周围的气体。",
        tips_it: "Target perfetto per la palette Hubble (SHO). Il segnale H-Alpha è predominante.", tips_en: "Perfect target for the Hubble Palette (SHO). The H-Alpha signal is predominant.", tips_es: "Objetivo perfecto para la Paleta Hubble (SHO). La señal H-Alfa es predominante.", tips_zh: "哈勃色调 (SHO) 的完美目标。H-Alpha 信号占主导地位。"
    },
    { 
        id: "ngc6888", name: "NGC 6888", size: 18, icon: "🌙", ra: 20.20, dec: 38.35, type: "Nebulosa a Emissione", mag: "+7.4", dist: "5.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Crescente",
        it: "Nebulosa Crescente", en: "Crescent Nebula", es: "Nebulosa Creciente", zh: "眉月星云",
        desc_it: "Bolla di gas creata dal potente vento di una stella centrale Wolf-Rayet.", desc_en: "Gas bubble created by the powerful wind of a central Wolf-Rayet star.", desc_es: "Burbuja de gas creada por el viento de una estrella Wolf-Rayet central.", desc_zh: "由中央的沃尔夫-拉叶星的强烈星风产生的气体泡。",
        tips_it: "Guscio fortissimo in H-Alpha e un alone esterno debolissimo in OIII. Usa doppie bande.", tips_en: "Strong Ha shell and a very faint outer OIII halo. Use dual-band filters.", tips_es: "Cáscara fuerte en Ha y un halo exterior muy débil en OIII. Usa filtros de doble banda.", tips_zh: "在 Ha 通道中有极强的气壳，而在 OIII 中有微弱的外晕。使用双窄带滤镜。"
    },
    { 
        id: "ngc6960", name: "NGC 6960", size: 70, icon: "🧹", ra: 20.76, dec: 30.71, type: "Resto di Supernova", mag: "+7.0", dist: "1.470 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Velo",
        it: "Nebulosa Scopa di Strega", en: "Witch's Broom Nebula", es: "Nebulosa Escoba de Bruja", zh: "女巫扫帚星云",
        desc_it: "Porzione occidentale della Nebulosa Velo, attraversata dalla stella 52 Cygni.", desc_en: "Western part of the Veil Nebula, intersected by the bright star 52 Cygni.", desc_es: "Parte occidental de la Nebulosa del Velo, cruzada por la estrella 52 Cygni.", desc_zh: "面纱星云的西部，明亮的恒星 52 Cygni 横穿其中。",
        tips_it: "Attenzione agli aloni causati da 52 Cygni. Il segnale in OIII e Ha è meraviglioso.", tips_en: "Beware of halos caused by 52 Cygni. The OIII and Ha filament signal is wonderful.", tips_es: "Cuidado con los halos de 52 Cygni. La señal de los filamentos en OIII y Ha es maravillosa.", tips_zh: "小心 52 Cygni 造成的光晕。OIII 和 Ha 中的纤维状信号非常棒。"
    },
    { 
        id: "ngc6992", name: "NGC 6992", size: 60, icon: "🕸️", ra: 20.94, dec: 31.72, type: "Resto di Supernova", mag: "+7.0", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Velo",
        it: "Nebulosa Velo Est", en: "Eastern Veil Nebula", es: "Velo Oriental", zh: "东面面纱星云",
        desc_it: "La porzione orientale del vastissimo complesso della Nebulosa Velo.", desc_en: "The eastern portion of the vast Veil Nebula complex.", desc_es: "La porción oriental del vasto complejo de la Nebulosa del Velo.", desc_zh: "巨大的面纱星云复合体的东侧部分。",
        tips_it: "Risponde magnificamente ai filtri dual-band o OIII puro. Struttura molto complessa.", tips_en: "Responds beautifully to dual-band or pure OIII filters. Highly complex structure.", tips_es: "Responde de maravilla a filtros de doble banda u OIII puro. Estructura muy compleja.", tips_zh: "双带或纯 OIII 滤镜的响应极佳。具有非常复杂的结构。"
    },
    { 
        id: "ngc7293", name: "NGC 7293", size: 25, icon: "👁️", ra: 22.49, dec: -20.83, type: "Nebulosa Planetaria", mag: "+7.6", dist: "650 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Elica",
        it: "Nebulosa Elica", en: "Helix Nebula", es: "Nebulosa de la Hélice", zh: "螺旋星云",
        desc_it: "Una delle nebulose planetarie più vicine, nota come 'L'Occhio di Dio'.", desc_en: "One of the closest planetary nebulae, known as 'The Eye of God'.", desc_es: "Una de las nebulosas planetarias más cercanas, conocida como 'El Ojo de Dios'.", desc_zh: "距离最近的行星状星云之一，被称为“上帝之眼”。",
        tips_it: "Molto bassa sull'orizzonte (per l'Italia). Approfitta delle notti senza foschia.", tips_en: "Very low on the horizon (for Northern Hemisphere). Take advantage of clear nights.", tips_es: "Muy baja en el horizonte. Aprovecha las noches muy despejadas sin bruma.", tips_zh: "（对于北半球）在地平线上的位置非常低。请在无雾霾的晴夜拍摄。"
    },
    { 
        id: "ngc1499", name: "NGC 1499", size: 160, icon: "🏖️", ra: 4.05, dec: 36.42, type: "Nebulosa a Emissione", mag: "+6.0", dist: "1.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_California",
        it: "Nebulosa California", en: "California Nebula", es: "Nebulosa California", zh: "加利福尼亚星云",
        desc_it: "Lunga e immensa nebulosa nel Perseo che ricorda lo stato della California.", desc_en: "Long and immense nebula in Perseus shaped like the state of California.", desc_es: "Larga e inmensa nebulosa en Perseo con forma del estado de California.", desc_zh: "英仙座中细长而巨大的星云，酷似加利福尼亚州。",
        tips_it: "Emette quasi esclusivamente in H-Alpha. L'OIII è praticamente assente.", tips_en: "Emits almost exclusively in H-Alpha. OIII is virtually non-existent.", tips_es: "Emite casi exclusivamente en H-Alfa. El OIII es prácticamente inexistente.", tips_zh: "几乎只在 H-Alpha 频段发光。OIII 信号几乎不存在。"
    },
    { 
        id: "ngc281", name: "NGC 281", size: 35, icon: "👾", ra: 0.88, dec: 56.62, type: "Regione H II", mag: "+7.4", dist: "9.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Pacman",
        it: "Nebulosa Pacman", en: "Pacman Nebula", es: "Nebulosa Pacman", zh: "吃豆人星云",
        desc_it: "Forma tonda 'mangiata' da una fetta oscura di polveri (globuli di Bok).", desc_en: "Round shape 'eaten' by a dark slice of dust (Bok globules).", desc_es: "Forma redonda 'comida' por una porción de polvo oscuro (glóbulos de Bok).", desc_zh: "圆形被黑色尘埃（博克球状体）“咬掉”一块，形似吃豆人。",
        tips_it: "Fortissimo segnale in H-Alpha. I globuli oscuri richiedono un ottimo seeing.", tips_en: "Very strong H-Alpha signal. The dark globules require excellent seeing.", tips_es: "Señal de H-Alfa muy fuerte. Los glóbulos oscuros requieren un seeing excelente.", tips_zh: "H-Alpha 信号极强。黑色的球状体需要非常好的视宁度。"
    },
    { 
        id: "ngc869", name: "NGC 869/884", size: 60, icon: "✨", ra: 2.33, dec: 57.14, type: "Ammasso Aperto", mag: "+4.3", dist: "7.500 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Doppio_di_Perseo",
        it: "Doppio Ammasso del Perseo", en: "Double Cluster in Perseus", es: "Cúmulo Doble de Perseo", zh: "英仙座双星团",
        desc_it: "Due spettacolari ammassi aperti di giovani stelle supergiganti vicinissimi.", desc_en: "Two spectacular open clusters of young supergiant stars close together.", desc_es: "Dos espectaculares cúmulos abiertos de jóvenes estrellas supergigantes.", desc_zh: "由年轻的超巨星组成的两个壮观且距离极近的疏散星团。",
        tips_it: "La banda stretta è inutile. Evita pose lunghe per non bruciare i colori delle stelle.", tips_en: "Narrowband is useless here. Avoid long exposures so you don't blow out star colors.", tips_es: "Banda estrecha es inútil aquí. Evita tomas largas para no quemar el color estelar.", tips_zh: "窄带在这里毫无用处。避免长曝光，以免恒星颜色过曝。"
    },
    { 
        id: "ngc5907", name: "NGC 5907", size: 12, icon: "🌌", ra: 15.26, dec: 56.33, type: "Galassia a Spirale", mag: "+10.3", dist: "50 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_5907",
        it: "Galassia Scheggia", en: "Splinter Galaxy", es: "Galaxia Astilla", zh: "碎片星系",
        desc_it: "Galassia a spirale vista perfettamente di taglio (edge-on) nel Dragone.", desc_en: "A perfectly edge-on spiral galaxy located in Draco.", desc_es: "Una galaxia espiral vista perfectamente de canto (edge-on) en el Dragón.", desc_zh: "位于天龙座的一个完美的边缘朝向 (edge-on) 螺旋星系。",
        tips_it: "Usa filtri L-RGB. Richiede un cielo molto buio per evidenziare la delicata banda di polveri.", tips_en: "Use L-RGB filters. Requires a very dark sky to highlight the delicate dust lane.", tips_es: "Usa filtros L-RGB. Requiere cielos muy oscuros para destacar la franja de polvo.", tips_zh: "使用 L-RGB 滤镜。需要极暗的天空来突出细致的尘埃带。"
    },
    { 
        id: "ngc5092", name: "NGC 5092", size: 2, icon: "🌌", ra: 13.33, dec: -23.00, type: "Galassia Ellittica", mag: "+13.5", dist: "N/D", link: "https://it.wikipedia.org/wiki/NGC_5092",
        it: "Galassia NGC 5092", en: "NGC 5092 Galaxy", es: "Galaxia NGC 5092", zh: "NGC 5092 星系",
        desc_it: "Debole galassia nel Centauro studiata per l'interazione gravitazionale.", desc_en: "Faint galaxy in Centaurus studied for gravitational interaction.", desc_es: "Galaxia muy débil en el Centauro estudiada por su interacción gravitacional.", desc_zh: "位于半人马座的一个暗淡星系，因其引力相互作用而被研究。",
        tips_it: "Oggetto ostico (mag +13.5). Richiede integrazioni estremamente lunghe.", tips_en: "Tough target (mag +13.5). Requires extremely long integrations.", tips_es: "Objetivo difícil (mag +13.5). Requiere integraciones extremadamente largas.", tips_zh: "极具挑战的目标（星等 +13.5）。需要极长的累计曝光时间。"
    },
    { 
        id: "ngc891", name: "NGC 891", size: 13, icon: "🪡", ra: 2.37, dec: 42.34, type: "Galassia a Spirale", mag: "+9.9", dist: "30 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_891",
        it: "Galassia Ago", en: "Needle Galaxy", es: "Galaxia Aguja", zh: "银针星系",
        desc_it: "Magnifica galassia edge-on in Andromeda con una marcata fascia di polveri.", desc_en: "Magnificent edge-on galaxy in Andromeda with a prominent dust lane.", desc_es: "Magnífica galaxia de canto en Andrómeda con una prominente franja de polvo.", desc_zh: "仙女座中壮丽的边缘朝向星系，具有显著的尘埃带。",
        tips_it: "Di piccole dimensioni. Ottima per focali di almeno 800mm in L-RGB.", tips_en: "Small size. Great for focal lengths of at least 800mm in L-RGB.", tips_es: "Tamaño pequeño. Excelente para focales de al menos 800mm en L-RGB.", tips_zh: "尺寸较小。非常适合使用 800mm 以上焦距进行 L-RGB 拍摄。"
    },
    { 
        id: "ngc7331", name: "NGC 7331", size: 10, icon: "🦌", ra: 22.62, dec: 34.41, type: "Galassia a Spirale", mag: "+9.4", dist: "40 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_7331",
        it: "Galassia del Cervo", en: "Deer Lick Group", es: "Galaxia del Ciervo", zh: "鹿舔星系",
        desc_it: "Galassia a spirale non barrata in Pegaso, molto simile alla nostra Via Lattea.", desc_en: "Unbarred spiral galaxy in Pegasus, very similar to our Milky Way.", desc_es: "Galaxia espiral no barrada en Pegaso, muy similar a nuestra Vía Láctea.", desc_zh: "飞马座的无棒螺旋星系，在结构上与我们的银河系非常相似。",
        tips_it: "Spesso inquadrata nello stesso campo visivo (FOV) assieme al Quintetto di Stephan.", tips_en: "Often framed in the same Field of View (FOV) with Stephan's Quintet.", tips_es: "A menudo encuadrada en el mismo campo con el Quinteto de Stephan.", tips_zh: "通常与斯蒂芬五重星系 (Stephan's Quintet) 在同一视场中拍摄。"
    },
    { 
        id: "ngc4565", name: "NGC 4565", size: 15, icon: "🪡", ra: 12.60, dec: 25.99, type: "Galassia a Spirale", mag: "+9.6", dist: "40 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_4565",
        it: "Galassia Spillo", en: "Needle Galaxy", es: "Galaxia de la Aguja", zh: "针星系",
        desc_it: "Forse la galassia vista di taglio più famosa e fotografata in assoluto.", desc_en: "Perhaps the most famous and photographed edge-on galaxy of all.", desc_es: "Quizás la galaxia vista de canto más famosa y fotografiada.", desc_zh: "也许是最著名的、被拍摄次数最多的边缘朝向星系。",
        tips_it: "Target puramente L-RGB. Focali lunghe (1000mm+) faranno emergere la polvere sul nucleo.", tips_en: "Purely L-RGB target. Long focal lengths (1000mm+) will resolve the dust over the core.", tips_es: "Objetivo puramente L-RGB. Focales largas resolverán el polvo sobre el núcleo.", tips_zh: "纯粹的 L-RGB 目标。长焦距（1000mm+）将能解析核心上的尘埃。"
    },
    { 
        id: "ngc253", name: "NGC 253", size: 27, icon: "🌪️", ra: 0.79, dec: -25.28, type: "Galassia Starburst", mag: "+7.2", dist: "11 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_dello_Scultore",
        it: "Galassia dello Scultore", en: "Sculptor Galaxy", es: "Galaxia del Escultor", zh: "玉夫座星系",
        desc_it: "Galassia con un altissimo tasso di formazione stellare e dimensioni notevoli.", desc_en: "Galaxy with a very high rate of star formation and substantial apparent size.", desc_es: "Galaxia con una altísima tasa de formación estelar y tamaño aparente notable.", desc_zh: "具有极高恒星形成率和显著表观尺寸的星暴星系。",
        tips_it: "A causa della declinazione bassa, sfrutta solo le notti con ottimo seeing verso sud.", tips_en: "Due to its low declination, only image it on nights with great seeing to the south.", tips_es: "Debido a su baja declinación, fotografíala solo en noches de excelente seeing al sur.", tips_zh: "由于其赤纬较低，请仅在南部视宁度极佳的夜晚进行拍摄。"
    },
    { 
        id: "ic434", name: "IC 434", size: 90, icon: "🐴", ra: 5.68, dec: -2.46, type: "Nebulosa Oscura", mag: "+7.3", dist: "1.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Testa_di_Cavallo", hdr: 15,
        it: "Nebulosa Testa di Cavallo", en: "Horsehead Nebula", es: "Nebulosa Cabeza de Caballo", zh: "马头星云",
        desc_it: "La celebre nebulosa oscura (B33) si staglia contro la luminosa IC 434 rossa.", desc_en: "The famous dark nebula (B33) silhouetted against the glowing red IC 434.", desc_es: "La famosa nebulosa oscura (B33) se recorta contra la brillante IC 434 roja.", desc_zh: "著名的暗星云 (B33) 在明亮的红色 IC 434 背景下形成的剪影。",
        tips_it: "Filtro H-Alpha obbligatorio per staccare il cavallo. Attenzione all'alone della stella Alnitak.", tips_en: "H-Alpha filter mandatory to pop the horse. Beware of Alnitak's star halo.", tips_es: "Filtro H-Alfa obligatorio para resaltar el caballo. Cuidado con el halo de Alnitak.", tips_zh: "强制使用 H-Alpha 滤镜来突出马头。注意参宿一的巨大恒星光晕。"
    },
    { 
        id: "markarian", name: "Markarian's Chain", size: 180, icon: "⛓️", ra: 12.45, dec: 13.10, type: "Ammasso di Galassie", mag: "~ +8.9", dist: "50 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Catena_di_Markarian",
        it: "Catena di Markarian", en: "Markarian's Chain", es: "Cadena de Markarian", zh: "马卡良链",
        desc_it: "Un affascinante allineamento visivo di galassie dell'Ammasso della Vergine.", desc_en: "A fascinating visual alignment of galaxies in the Virgo Cluster.", desc_es: "Una fascinante alineación visual de galaxias del Cúmulo de Virgo.", desc_zh: "室女座星系团中一个迷人的视觉星系排列。",
        tips_it: "Perfetta per focali corte (400mm). Fai un'inquadratura diagonale molto curata.", tips_en: "Perfect for short focal lengths (400mm). Frame it diagonally on your sensor.", tips_es: "Perfecta para focales cortas (400mm). Realiza un encuadre diagonal cuidadoso.", tips_zh: "非常适合短焦距 (400mm)。在传感器上精心进行对角线构图。"
    },
    { 
        id: "stephan", name: "HCG 92", size: 4, icon: "🖐️", ra: 22.60, dec: 33.96, type: "Gruppo di Galassie", mag: "+13.6", dist: "290 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Quintetto_di_Stephan",
        it: "Quintetto di Stephan", en: "Stephan's Quintet", es: "Quinteto de Stephan", zh: "斯蒂芬五重星系",
        desc_it: "Compatto gruppo di cinque galassie in violentissima interazione gravitazionale.", desc_en: "Compact group of five galaxies in violent gravitational interaction.", desc_es: "Grupo compacto de cinco galaxias en violenta interacción gravitacional.", desc_zh: "五颗星系组成的致密群，处于极其剧烈的引力相互作用中。",
        tips_it: "Sono minuscole e debolissime! Usa focali lunghe (C8) in serate con ottimo seeing.", tips_en: "They are tiny and faint! Use long focal lengths (C8/C11) on nights with great seeing.", tips_es: "¡Son diminutas y débiles! Usa focales largas en noches de excelente seeing.", tips_zh: "它们极小且微弱！在视宁度极佳的夜晚使用长焦距 (如 C8) 拍摄。"
    },
    { 
        id: "sh2-155", name: "Sh2-155", size: 50, icon: "🦇", ra: 22.95, dec: 62.62, type: "Nebulosa a Emissione", mag: "+7.7", dist: "2.400 a.l.", link: "https://it.wikipedia.org/wiki/Sh2-155",
        it: "Nebulosa Grotta", en: "Cave Nebula", es: "Nebulosa de la Cueva", zh: "洞穴星云",
        desc_it: "Complessa regione di gas e polveri scure che ricorda l'ingresso di una caverna.", desc_en: "Complex region of gas and dark dust resembling the entrance of a cave.", desc_es: "Compleja región de gas y polvo oscuro que recuerda la entrada de una caverna.", desc_zh: "气体和暗尘埃组成的复杂区域，形似洞穴的入口。",
        tips_it: "Luminosità superficiale bassissima, richiede pazienza infinita in integrazione banda stretta.", tips_en: "Extremely low surface brightness. Requires endless patience and narrowband integration.", tips_es: "Brillo superficial bajísimo, requiere infinita paciencia en integración de banda estrecha.", tips_zh: "表面亮度极低，在窄带曝光堆栈中需要极大的耐心。"
    },

    // ==============================================================
    // --- GIOIELLI DELL'EMISFERO AUSTRALE (Nuove aggiunte!) ---
    // ==============================================================
    { 
        id: "ngc3372", name: "NGC 3372", size: 120, icon: "🔥", ra: 10.73, dec: -59.86, type: "Nebulosa a Emissione", mag: "+1.0", dist: "8.500 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_della_Carena", hdr: 5,
        it: "Nebulosa della Carena", en: "Carina Nebula", es: "Nebulosa de la Quilla", zh: "船底座星云",
        desc_it: "Una delle nebulose più grandi di tutta la volta celeste. Contiene Eta Carinae.", desc_en: "One of the largest nebulae in the entire sky. Contains the star Eta Carinae.", desc_es: "Una de las nebulosas más grandes de todo el cielo. Contiene la estrella Eta Carinae.", desc_zh: "全天最大的星云之一。内部包含明亮的海山二 (Eta Carinae)。",
        tips_it: "Emette fortemente in tutta la banda stretta (SHO). Un target immenso per mosaici ad alta risoluzione.", tips_en: "Emits strongly in all narrowband channels (SHO). An immense target for high-res mosaics.", tips_es: "Emite fuertemente en banda estrecha (SHO). Un objetivo inmenso para mosaicos de alta resolución.", tips_zh: "在所有窄带通道 (SHO) 中都有强烈发射。高分辨率拼接的绝佳巨型目标。"
    },
    { 
        id: "ngc2070", name: "NGC 2070", size: 40, icon: "🕷️", ra: 5.64, dec: -69.10, type: "Regione H II", mag: "+8.0", dist: "160.000 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Tarantola",
        it: "Nebulosa Tarantola", en: "Tarantula Nebula", es: "Nebulosa de la Tarántula", zh: "蜘蛛星云",
        desc_it: "Situata nella Nube di Magellano, è la regione di formazione stellare più attiva del Gruppo Locale.", desc_en: "Located in the Magellanic Cloud, it's the most active star-forming region in the Local Group.", desc_es: "Ubicada en la Nube de Magallanes, es la región de formación estelar más activa del Grupo Local.", desc_zh: "位于麦哲伦云中，是本星系群中最活跃的恒星形成区。",
        tips_it: "Nonostante sia in un'altra galassia, è luminosissima. Ottima in LRGB e banda stretta (HOO).", tips_en: "Despite being in another galaxy, it's very bright. Great in LRGB and narrowband (HOO).", tips_es: "A pesar de estar en otra galaxia, es muy brillante. Genial en LRGB y banda estrecha (HOO).", tips_zh: "尽管在另一个星系，它依然非常明亮。非常适合 LRGB 和窄带 (HOO) 拍摄。"
    },
    { 
        id: "ngc5139", name: "Omega Centauri", size: 36, icon: "🎆", ra: 13.44, dec: -47.47, type: "Ammasso Globulare", mag: "+3.9", dist: "15.800 a.l.", link: "https://it.wikipedia.org/wiki/Omega_Centauri", hdr: 8,
        it: "Omega Centauri", en: "Omega Centauri", es: "Omega Centauri", zh: "半人马座ω",
        desc_it: "Il più grande ammasso globulare della Via Lattea (circa 10 milioni di stelle).", desc_en: "The largest globular cluster in the Milky Way (about 10 million stars).", desc_es: "El mayor cúmulo globular de la Vía Láctea (unos 10 millones de estrellas).", desc_zh: "银河系中最大的球状星团（约有 1000 万颗恒星）。",
        tips_it: "Target puramente visivo/LRGB. Pose molto brevi per non saturare il densissimo nucleo.", tips_en: "Purely visual/LRGB target. Keep exposures very short so as not to saturate the dense core.", tips_es: "Objetivo puramente LRGB. Exposiciones muy cortas para no saturar el denso núcleo.", tips_zh: "纯粹的 LRGB 目标。保持极短的曝光时间，以免密集的星团核心过曝。"
    },
    { 
        id: "ngc5128", name: "Centaurus A", size: 25, icon: "🍔", ra: 13.42, dec: -43.01, type: "Galassia Lenticolare", mag: "+6.8", dist: "13 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Centaurus_A",
        it: "Galassia Centaurus A", en: "Centaurus A", es: "Centaurus A", zh: "半人马座A",
        desc_it: "Galassia squarciata da una colossale banda di polveri oscure, con un buco nero attivo.", desc_en: "Galaxy torn apart by a colossal dark dust band, hosting an active black hole.", desc_es: "Galaxia dividida por una colosal banda de polvo oscuro, con un agujero negro activo.", desc_zh: "被巨大暗尘埃带撕裂的星系，中心孕育着一个活跃的黑洞。",
        tips_it: "La banda di polvere è ricca di gas rosso: un'integrazione di H-Alpha è raccomandata.", tips_en: "The dust band is rich in red gas: an H-Alpha integration is highly recommended.", tips_es: "La banda de polvo es rica en gas rojo: se recomienda una integración en H-Alfa.", tips_zh: "尘埃带中富含红色的氢气体：强烈建议进行 H-Alpha 通道的曝光。"
    },
    { 
        id: "lmc", name: "LMC", size: 600, icon: "☁️", ra: 5.39, dec: -69.75, type: "Galassia Irregolare", mag: "+0.9", dist: "163.000 a.l.", link: "https://it.wikipedia.org/wiki/Grande_Nube_di_Magellano",
        it: "Grande Nube di Magellano", en: "Large Magellanic Cloud", es: "Gran Nube de Magallanes", zh: "大麦哲伦星系",
        desc_it: "Galassia satellite della Via Lattea, visibile come una nuvola luminosa ad occhio nudo.", desc_en: "Satellite galaxy of the Milky Way, visible as a glowing cloud to the naked eye.", desc_es: "Galaxia satélite de la Vía Láctea, visible como una nube brillante a simple vista.", desc_zh: "银河系的卫星星系，肉眼可见，像一团发光的云。",
        tips_it: "Oggetto titanico. Adatto solo a lenti grandangolari (es. 50mm) o a enormi mosaici.", tips_en: "Titanic object. Suited only for wide-angle lenses (e.g. 50mm) or massive mosaics.", tips_es: "Objeto titánico. Apto solo para lentes gran angular (ej. 50mm) o enormes mosaicos.", tips_zh: "巨无霸级别的目标。仅适合广角镜头（如 50mm）或超大型拼接拍摄。"
    },
    { 
        id: "smc", name: "SMC", size: 300, icon: "☁️", ra: 0.88, dec: -72.83, type: "Galassia Irregolare", mag: "+2.7", dist: "200.000 a.l.", link: "https://it.wikipedia.org/wiki/Piccola_Nube_di_Magellano",
        it: "Piccola Nube di Magellano", en: "Small Magellanic Cloud", es: "Pequeña Nube de Magallanes", zh: "小麦哲伦星系",
        desc_it: "La compagna più piccola della LMC. Un'altra vicina galassia satellite.", desc_en: "The smaller companion of the LMC. Another nearby satellite galaxy.", desc_es: "La compañera más pequeña de la LMC. Otra galaxia satélite cercana.", desc_zh: "大麦哲伦星系的较小伴星系。另一个附近的卫星星系。",
        tips_it: "Richiede campi molto ampi. Ottima resa con fotocamere a colori (OSC) per catturare la varietà.", tips_en: "Requires very wide fields. Great results with color cameras (OSC) to capture stellar variety.", tips_es: "Requiere campos muy amplios. Grandes resultados con cámaras a color (OSC).", tips_zh: "需要极广的视场。使用彩色相机 (OSC) 能够很好地捕捉到恒星的多样性。"
    },
    { 
        id: "m83", name: "M83", size: 12, icon: "🌀", ra: 13.60, dec: -29.86, type: "Galassia a Spirale", mag: "+7.5", dist: "15 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M83_(astronomia)",
        it: "Girandola del Sud", en: "Southern Pinwheel", es: "Molinete del Sur", zh: "南风车星系",
        desc_it: "Galassia a spirale barrata, famosa per i suoi bracci ricchissimi di giovani ammassi blu.", desc_en: "Barred spiral galaxy, famous for its arms rich in young blue star clusters.", desc_es: "Galaxia espiral barrada, famosa por sus brazos ricos en jóvenes cúmulos azules.", desc_zh: "棒旋星系，以其旋臂上富含年轻的蓝色星团而闻名。",
        tips_it: "Splendido target per focali oltre i 600mm. Riprendi in L-RGB e spingi i colori in post-produzione.", tips_en: "Splendid target for focal lengths over 600mm. Shoot L-RGB and boost colors in post.", tips_es: "Espléndido objetivo para focales sobre 600mm. Dispara en L-RGB y potencia el color en post.", tips_zh: "600mm 以上焦距的绝佳目标。拍摄 L-RGB 并在后期处理中加强色彩。"
    },

    // ==============================================================
    // --- NEBULOSE A EMISSIONE / H II ---
    // ==============================================================
    {
        id: "ngc2359", name: "NGC 2359", size: 22, icon: "🪖", ra: 7.308, dec: -13.217, type: "Nebulosa a Emissione", mag: "+11.4", dist: "15.000 a.l.", link: "https://it.wikipedia.org/wiki/NGC_2359",
        it: "Elmo di Thor", en: "Thor's Helmet", es: "Casco de Thor", zh: "托尔头盔星云",
        desc_it: "Struttura a bolle creata dal vento stellare della stella Wolf-Rayet WR7, nella costellazione del Cane Maggiore.", desc_en: "Bubble structure created by the stellar wind of the Wolf-Rayet star WR7, in Canis Major.", desc_es: "Estructura de burbuja creada por el viento estelar de la estrella Wolf-Rayet WR7, en Can Mayor.", desc_zh: "由大犬座沃尔夫-拉叶星WR7的恒星风吹出的气泡状结构。",
        tips_it: "Splendido in HOO o SHO. La stella centrale illumina i filamenti in H-Alpha. Posa media 180-300s.", tips_en: "Splendid in HOO or SHO. The central star illuminates filaments in H-Alpha. Medium exposures 180-300s.", tips_es: "Espléndido en HOO o SHO. La estrella central ilumina los filamentos en H-Alfa. Posado medio 180-300s.", tips_zh: "HOO或SHO拍摄效果极佳。中心星照亮H-Alpha丝状结构。建议中等曝光180-300秒。"
    },
    {
        id: "ngc2264", name: "NGC 2264", size: 60, icon: "🌲", ra: 6.68, dec: 9.89, type: "Regione H II", mag: "+3.9", dist: "2.700 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Albero_di_Natale",
        it: "Nebulosa Albero di Natale", en: "Christmas Tree Nebula", es: "Nebulosa Árbol de Navidad", zh: "圣诞树星云",
        desc_it: "Regione di formazione stellare che include la famosa Nebulosa Cono e l'ammasso Albero di Natale.", desc_en: "Star-forming region including the famous Cone Nebula and the Christmas Tree cluster.", desc_es: "Región de formación estelar que incluye la famosa Nebulosa Cono y el cúmulo Árbol de Navidad.", desc_zh: "恒星形成区，包含著名的锥形星云和圣诞树星团。",
        tips_it: "La Nebulosa Cono richiede focali lunghe (>800mm). Campo largo per l'intera regione. Ottima in H-Alpha.", tips_en: "The Cone Nebula needs long focal lengths (>800mm). Wide field for the whole region. Great in H-Alpha.", tips_es: "La Nebulosa Cono requiere largas focales (>800mm). Campo amplio para toda la región. Genial en H-Alfa.", tips_zh: "锥形星云需要长焦距(>800mm)。广角拍摄整个区域。H-Alpha效果很好。"
    },
    {
        id: "ic2177", name: "IC 2177", size: 120, icon: "🐦", ra: 7.085, dec: -10.700, type: "Regione H II", mag: "+7.0", dist: "3.650 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Gabbiano",
        it: "Nebulosa Gabbiano", en: "Seagull Nebula", es: "Nebulosa Gaviota", zh: "海鸥星云",
        desc_it: "Vasta regione di emissione al confine tra Monocerote e Cane Maggiore, con forma di gabbiano in volo.", desc_en: "Vast emission region at the border of Monoceros and Canis Major, shaped like a flying seagull.", desc_es: "Vasta región de emisión al límite entre Monoceros y Can Mayor, con forma de gaviota en vuelo.", desc_zh: "位于麒麟座和大犬座边界的广阔发射区，形状酷似飞翔的海鸥。",
        tips_it: "Oggetto enorme: serve un campo largo o un mosaico. Fortissimo segnale in H-Alpha.", tips_en: "Huge object: needs a wide field or mosaic. Very strong H-Alpha signal.", tips_es: "Objeto enorme: necesita un campo amplio o mosaico. Señal H-Alfa muy fuerte.", tips_zh: "目标巨大：需要广角或拼接拍摄。H-Alpha信号非常强。"
    },
    {
        id: "ngc6334", name: "NGC 6334", size: 40, icon: "🐾", ra: 17.349, dec: -35.767, type: "Regione H II", mag: "+9.0", dist: "5.500 a.l.", link: "https://en.wikipedia.org/wiki/Cat%27s_Paw_Nebula",
        it: "Nebulosa Zampa di Gatto", en: "Cat's Paw Nebula", es: "Nebulosa Pata de Gato", zh: "猫爪星云",
        desc_it: "Una delle regioni di formazione stellare più attive della nostra galassia, nello Scorpione.", desc_en: "One of the most active star-forming regions in our galaxy, in Scorpius.", desc_es: "Una de las regiones de formación estelar más activas de nuestra galaxia, en Escorpión.", desc_zh: "银河系中最活跃的恒星形成区之一，位于天蝎座。",
        tips_it: "Altissimo segnale in H-Alpha e SII. Oggetto australe: massima altezza bassa. Sfrutta le notti di estate.", tips_en: "Very strong H-Alpha and SII signal. Southern object: low altitude. Use summer nights.", tips_es: "Señal H-Alfa y SII muy alta. Objeto austral. Usa noches de verano.", tips_zh: "H-Alpha和SII信号极强。南天目标，高度角较低，利用夏季夜晚拍摄。"
    },
    {
        id: "ngc6357", name: "NGC 6357", size: 40, icon: "🦞", ra: 17.412, dec: -34.2000, type: "Regione H II", mag: "+10.0", dist: "8.000 a.l.", link: "https://it.wikipedia.org/wiki/NGC_6357",
        it: "Nebulosa Aragosta", en: "Lobster Nebula", es: "Nebulosa Langosta", zh: "龙虾星云",
        desc_it: "Complessa regione di ionizzazione nello Scorpione, vicina alla Cat's Paw. Piena di giovani stelle massive.", desc_en: "Complex ionization region in Scorpius, near Cat's Paw. Full of young, massive stars.", desc_es: "Compleja región de ionización en Escorpión, cercana a Cat's Paw. Llena de estrellas jóvenes masivas.", desc_zh: "天蝎座复杂的电离区，邻近猫爪星云。充满了年轻的大质量恒星。",
        tips_it: "Forma spettacolare in SHO. Abbinala alla NGC 6334 per un mosaico mozzafiato.", tips_en: "Spectacular in SHO palette. Pair it with NGC 6334 for a stunning mosaic.", tips_es: "Espectacular en paleta SHO. Combínala con NGC 6334 para un mosaico impresionante.", tips_zh: "SHO色调下形态壮观。可与NGC 6334拼接成令人叹为观止的大图。"
    },
    {
        id: "ngc7380", name: "NGC 7380", size: 25, icon: "🧙", ra: 22.78, dec: 58.12, type: "Regione H II", mag: "+7.2", dist: "10.000 a.l.", link: "https://it.wikipedia.org/wiki/NGC_7380",
        it: "Nebulosa Mago", en: "Wizard Nebula", es: "Nebulosa del Mago", zh: "巫师星云",
        desc_it: "Regione di formazione stellare in Cefeo contenente l'ammasso aperto NGC 7380.", desc_en: "Star-forming region in Cepheus containing the open cluster NGC 7380.", desc_es: "Región de formación estelar en Cefeo que contiene el cúmulo abierto NGC 7380.", desc_zh: "仙王座中的恒星形成区，包含疏散星团NGC 7380。",
        tips_it: "Segnale H-Alpha molto buono. SHO o HOO entrambi funzionano bene.", tips_en: "Very good H-Alpha signal. Both SHO and HOO palettes work well.", tips_es: "Señal H-Alfa muy buena. Las paletas SHO y HOO funcionan bien.", tips_zh: "H-Alpha信号非常好。SHO和HOO色调均效果良好。"
    },
    {
        id: "ngc7023", name: "NGC 7023", size: 18, icon: "🌺", ra: 21.02, dec: 68.17, type: "Nebulosa a Riflessione", mag: "+6.8", dist: "1.300 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Iris",
        it: "Nebulosa Iris", en: "Iris Nebula", es: "Nebulosa Iris", zh: "鸢尾花星云",
        desc_it: "Splendida nebulosa a riflessione blu nel Cefeo, illuminata dalla stella HD 200775.", desc_en: "Beautiful blue reflection nebula in Cepheus, illuminated by the star HD 200775.", desc_es: "Hermosa nebulosa de reflexión azul en Cefeo, iluminada por la estrella HD 200775.", desc_zh: "仙王座中美丽的蓝色反射星云，由恒星HD 200775照亮。",
        tips_it: "Riflette luce blu: NO filtri narrowband. LRGB puro da cieli scuri. La polvere intorno è un bonus.", tips_en: "Reflects blue light: NO narrowband filters. Pure LRGB from dark skies. Surrounding dust is a bonus.", tips_es: "Refleja luz azul: NO filtros de banda estrecha. LRGB puro desde cielos oscuros.", tips_zh: "反射蓝光：切勿使用窄带滤镜。在黑暗天空下进行纯LRGB拍摄。周围的尘埃是额外的惊喜。"
    },
    {
        id: "ic410", name: "IC 410", size: 40, icon: "🐸", ra: 5.379, dec: 33.412, type: "Regione H II", mag: "+7.5", dist: "12.000 a.l.", link: "https://it.wikipedia.org/wiki/IC_410",
        it: "Nebulosa Girini", en: "Tadpole Nebula", es: "Nebulosa Renacuajos", zh: "蝌蚪星云",
        desc_it: "Regione di formazione stellare nell'Auriga con i famosi 'girini' di gas e polvere.", desc_en: "Star-forming region in Auriga featuring the famous gas and dust 'tadpoles'.", desc_es: "Región de formación estelar en Auriga con los famosos 'renacuajos' de gas y polvo.", desc_zh: "御夫座恒星形成区，以著名的气体和尘埃蝌蚪结构而闻名。",
        tips_it: "I girini emergono bene in H-Alpha con un filo di OIII. Abbinala alla IC 405 per un campo largo.", tips_en: "The tadpoles emerge well in H-Alpha with a touch of OIII. Pair with IC 405 for a wide field.", tips_es: "Los renacuajos emergen bien en H-Alfa con OIII. Combínala con IC 405 para campo amplio.", tips_zh: "蝌蚪在H-Alpha结合少量OIII时会非常突出。可与IC 405搭配拍摄广角大图。"
    },
    {
        id: "ic5146", name: "IC 5146", size: 12, icon: "🪲", ra: 21.89, dec: 47.26, type: "Nebulosa Mista", mag: "+7.2", dist: "3.300 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Bozzolo",
        it: "Nebulosa Bozzolo", en: "Cocoon Nebula", es: "Nebulosa Capullo", zh: "茧形星云",
        desc_it: "Nebulosa mista di emissione e riflessione nel Cigno, circonfusa da una densa nebulosa oscura.", desc_en: "Mixed emission and reflection nebula in Cygnus, surrounded by a dense dark nebula.", desc_es: "Nebulosa mixta de emisión y reflexión en Cygnus, rodeada de una densa nebulosa oscura.", desc_zh: "天鹅座中的混合发射-反射星云，周围环绕着致密的暗星云。",
        tips_it: "Il contrasto tra la nebulosa luminosa e quella oscura è spettacolare. HOO consigliato.", tips_en: "The contrast between the bright and dark nebula is spectacular. HOO recommended.", tips_es: "El contraste entre la nebulosa brillante y la oscura es espectacular. Se recomienda HOO.", tips_zh: "明亮星云与暗星云之间的对比效果极为壮观。推荐使用HOO模式。"
    },
    {
        id: "ngc2174", name: "NGC 2174", size: 40, icon: "🐒", ra: 6.157, dec: 20.65, type: "Regione H II", mag: "+6.8", dist: "6.400 a.l.", link: "https://it.wikipedia.org/wiki/NGC_2174",
        it: "Nebulosa Testa di Scimmia", en: "Monkey Head Nebula", es: "Nebulosa Cabeza de Mono", zh: "猴头星云",
        desc_it: "Regione H II circolare nell'Orione con pilastri di gas simili a quelli della Nebulosa Aquila.", desc_en: "Circular H II region in Orion with gas pillars similar to those of the Eagle Nebula.", desc_es: "Región H II circular en Orión con pilares de gas similares a los del Águila.", desc_zh: "猎户座圆形H II区，拥有与鹰状星云类似的气体柱状结构。",
        tips_it: "Segnale H-Alpha ottimo. I pilastri emergono bene con alta risoluzione (>1000mm).", tips_en: "Excellent H-Alpha signal. Pillars emerge well at high resolution (>1000mm).", tips_es: "Excelente señal H-Alfa. Los pilares emergen bien con alta resolución (>1000mm).", tips_zh: "H-Alpha信号极佳。在高分辨率下(>1000mm)气柱结构清晰可见。"
    },
    {
        id: "sh2-240", name: "Sh2-240", size: 180, icon: "🍝", ra: 5.649, dec: 27.813, type: "Resto di Supernova", mag: "N/D", dist: "3.000 a.l.", link: "https://en.wikipedia.org/wiki/Simeis_147",
        it: "Nebulosa Spaghetti (Simeis 147)", en: "Spaghetti Nebula (Simeis 147)", es: "Nebulosa de los Espaguetis", zh: "意面星云",
        desc_it: "Enorme resto di supernova nel Toro, con delicati filamenti rossi che ricordano spaghetti.", desc_en: "Enormous supernova remnant in Taurus, with delicate red filaments resembling spaghetti.", desc_es: "Enorme remanente de supernova en Tauro, con delicados filamentos rojos que parecen espaguetis.", desc_zh: "金牛座中的巨大超新星遗迹，细腻的红色丝状结构形似意大利面。",
        tips_it: "Uno dei target più difficili: dimensione enorme (3°!), segnale debolissimo. Solo H-Alpha da cielo NERO.", tips_en: "One of the hardest targets: huge size (3°!), very faint signal. H-Alpha only from perfectly dark skies.", tips_es: "Uno de los objetivos más difíciles: enorme (3°!), señal muy débil. Solo H-Alfa desde cielos perfectamente oscuros.", tips_zh: "最具挑战性的目标之一：覆盖天区极大(3度!)，信号极弱。只能在完全黑暗的天空下使用H-Alpha拍摄。"
    },
    {
        id: "sh2-308", name: "Sh2-308", size: 60, icon: "🐬", ra: 6.89, dec: -23.95, type: "Nebulosa a Emissione", mag: "N/D", dist: "5.000 a.l.", link: "https://en.wikipedia.org/wiki/Sh2-308",
        it: "Nebulosa Delfino", en: "Dolphin Nebula", es: "Nebulosa Delfín", zh: "海豚星云",
        desc_it: "Bolla nebulare sferica creata dalla stella Wolf-Rayet EZ CMa nel Cane Maggiore.", desc_en: "Spherical nebular bubble created by the Wolf-Rayet star EZ CMa in Canis Major.", desc_es: "Burbuja nebular esférica creada por la estrella Wolf-Rayet EZ CMa en Can Mayor.", desc_zh: "由大犬座沃尔夫-拉叶星EZ CMa产生的球形星云气泡。",
        tips_it: "Segnale OIII molto forte. Usa molta integrazione in OIII e H-Alpha per far emergere la struttura sferica.", tips_en: "Very strong OIII signal. Use lots of OIII and H-Alpha integration to reveal the spherical structure.", tips_es: "Señal OIII muy fuerte. Usa mucha integración en OIII y H-Alfa para revelar la estructura esférica.", tips_zh: "OIII信号非常强。大量叠加OIII和H-Alpha以揭示球形结构。"
    },
    {
        id: "sh2-101", name: "Sh2-101", size: 30, icon: "🌷", ra: 20.28, dec: 35.77, type: "Regione H II", mag: "N/D", dist: "6.000 a.l.", link: "https://en.wikipedia.org/wiki/Tulip_Nebula",
        it: "Nebulosa Tulipano", en: "Tulip Nebula", es: "Nebulosa Tulipán", zh: "郁金香星云",
        desc_it: "Nebulosa a emissione nel Cigno, famosa per la vicinanza alla sorgente di raggi X Cygnus X-1.", desc_en: "Emission nebula in Cygnus, famous for its proximity to the X-ray source Cygnus X-1.", desc_es: "Nebulosa de emisión en Cygnus, famosa por su proximidad a la fuente de rayos X Cygnus X-1.", desc_zh: "天鹅座发射星云，因紧邻X射线源天鹅座X-1而著名。",
        tips_it: "Segnale H-Alpha eccellente. Includi il bow-shock di Cygnus X-1 nel campo per un dettaglio unico.", tips_en: "Excellent H-Alpha signal. Include the Cygnus X-1 bow-shock in the frame for a unique detail.", tips_es: "Excelente señal H-Alfa. Incluye el bow-shock de Cygnus X-1 para un detalle único.", tips_zh: "H-Alpha信号极佳。将天鹅座X-1的弓形激波纳入画面，捕捉独特细节。"
    },
    {
        id: "ou4", name: "Ou4", size: 60, icon: "🦑", ra: 21.1962, dec: 59.9456, type: "Nebulosa a Emissione", mag: "N/D", dist: "2.300 a.l.", link: "https://en.wikipedia.org/wiki/Squid_Nebula",
        it: "Nebulosa Calamaro Gigante", en: "Giant Squid Nebula", es: "Nebulosa Calamar Gigante", zh: "巨乌贼星云",
        desc_it: "Scoperta nel 2011 da Nicolas Outters. Segnale OIII estremo e debolissimo, sovrapposta alla IC 1396.", desc_en: "Discovered in 2011 by Nicolas Outters. Extremely faint OIII signal, overlapping IC 1396.", desc_es: "Descubierta en 2011 por Nicolas Outters. Señal OIII extremadamente débil, superpuesta a IC 1396.", desc_zh: "2011年由Nicolas Outters发现。OIII信号极度微弱，与IC 1396重叠。",
        tips_it: "Integrazione mostruosa richiesta (30h+ in OIII). Abbinala alla IC 1396 per un frame spettacolare.", tips_en: "Monstrous integration required (30h+ in OIII). Pair with IC 1396 for a spectacular frame.", tips_es: "Se requiere integración monstruosa (30h+ en OIII). Combínala con IC 1396 para un frame espectacular.", tips_zh: "需要超长曝光叠加(OIII通道30小时以上)。与IC 1396搭配可获得壮观画面。"
    },
    // ==============================================================
    // --- NEBULOSE PLANETARIE ---
    // ==============================================================
    {
        id: "ngc6543", name: "NGC 6543", size: 0.3, icon: "😺", ra: 17.97, dec: 66.63, type: "Nebulosa Planetaria", mag: "+8.1", dist: "3.300 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Occhio_di_Gatto", hdr: 3,
        it: "Nebulosa Occhio di Gatto", en: "Cat's Eye Nebula", es: "Nebulosa Ojo de Gato", zh: "猫眼星云",
        desc_it: "Una delle nebulose planetarie più complesse e fotografate. Struttura concentrica intricatissima.", desc_en: "One of the most complex and photographed planetary nebulae. Intricate concentric structure.", desc_es: "Una de las nebulosas planetarias más complejas y fotografiadas. Intrincada estructura concéntrica.", desc_zh: "最复杂、最多被拍摄的行星状星云之一。复杂的同心环状结构。",
        tips_it: "Serve altissima risoluzione (>2000mm). Esponi separatamente il nucleo e i gusci esterni (HDR).", tips_en: "Requires very high resolution (>2000mm). Expose the core and outer shells separately (HDR).", tips_es: "Requiere muy alta resolución (>2000mm). Expone el núcleo y las capas externas por separado (HDR).", tips_zh: "需要非常高的分辨率(>2000mm)。分别曝光核心和外层气壳(HDR合成)。"
    },
    {
        id: "ngc2392", name: "NGC 2392", size: 0.7, icon: "🎅", ra: 7.49, dec: 20.91, type: "Nebulosa Planetaria", mag: "+9.2", dist: "4.160 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Esquimese",
        it: "Nebulosa Eschimese", en: "Eskimo Nebula", es: "Nebulosa Esquimal", zh: "爱斯基摩星云",
        desc_it: "Nebulosa planetaria nei Gemelli con due gusci distinti, uno interno brillante e uno esterno più tenue.", desc_en: "Planetary nebula in Gemini with two distinct shells: a bright inner one and a fainter outer one.", desc_es: "Nebulosa planetaria en Géminis con dos capas distintas: una brillante interior y una exterior más tenue.", desc_zh: "双子座行星状星云，有内外两层清晰的气壳。",
        tips_it: "Molto luminosa: puoi usare pose da 30-60s. Ottima anche in condizioni di Luna piena.", tips_en: "Very bright: exposures of 30-60s work well. Great even under a full Moon.", tips_es: "Muy brillante: exposiciones de 30-60s funcionan bien. Genial incluso bajo Luna llena.", tips_zh: "非常明亮：30-60秒曝光效果良好。即使在满月条件下也能拍摄。"
    },
    {
        id: "ngc3242", name: "NGC 3242", size: 0.7, icon: "👻", ra: 10.41, dec: -18.63, type: "Nebulosa Planetaria", mag: "+7.7", dist: "1.400 a.l.", link: "https://it.wikipedia.org/wiki/Nebulosa_Fantasma_di_Giove",
        it: "Fantasma di Giove", en: "Ghost of Jupiter", es: "Fantasma de Júpiter", zh: "木星幽灵",
        desc_it: "Nebulosa planetaria nell'Idra, con struttura a doppio anello simile a Giove.", desc_en: "Planetary nebula in Hydra, with a double-ring structure similar to Jupiter.", desc_es: "Nebulosa planetaria en Hydra, con estructura de doble anillo similar a Júpiter.", desc_zh: "长蛇座行星状星云，具有与木星相似的双环结构。",
        tips_it: "Molto luminosa nell'OIII. Pose brevi con alta focale. Considera HDR per nucleo e anelli.", tips_en: "Very bright in OIII. Short exposures at high focal length. Consider HDR for core and rings.", tips_es: "Muy brillante en OIII. Exposiciones cortas con alta focal. Considera HDR para núcleo y anillos.", tips_zh: "在OIII通道中非常明亮。高焦距短曝光。考虑对核心和环状结构进行HDR合成。"
    },
    {
        id: "m76", name: "M76", size: 2.7, icon: "🎭", ra: 1.70, dec: 51.58, type: "Nebulosa Planetaria", mag: "+10.1", dist: "3.400 a.l.", link: "https://it.wikipedia.org/wiki/M76",
        it: "Piccolo Manubrio", en: "Little Dumbbell Nebula", es: "Pequeña Nebulosa Haltera", zh: "小哑铃星云",
        desc_it: "Piccola nebulosa planetaria in Perseo, simile alla M27 ma molto più piccola e tenue.", desc_en: "Small planetary nebula in Perseus, similar to M27 but much smaller and fainter.", desc_es: "Pequeña nebulosa planetaria en Perseo, similar a M27 pero mucho más pequeña y tenue.", desc_zh: "英仙座小型行星状星云，与M27相似但体积更小、亮度更低。",
        tips_it: "Necessita di alta focale (>1000mm). Segnale OIII molto buono. Pose medie 120-300s.", tips_en: "Needs long focal length (>1000mm). Very good OIII signal. Medium exposures 120-300s.", tips_es: "Necesita larga focal (>1000mm). Señal OIII muy buena. Posados medianos 120-300s.", tips_zh: "需要长焦距(>1000mm)。OIII信号非常好。建议中等曝光120-300秒。"
    },
    // ==============================================================
    // --- GALASSIE ---
    // ==============================================================
    {
        id: "ngc3628", name: "NGC 3628", size: 15, icon: "🍔", ra: 11.338, dec: 13.60, type: "Galassia a Spirale", mag: "+9.5", dist: "35 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_3628",
        it: "Galassia Hamburger", en: "Hamburger Galaxy", es: "Galaxia Hamburguesa", zh: "汉堡包星系",
        desc_it: "Terza componente del Tripletto del Leone con M65 e M66, vista di taglio con prominente banda di polvere.", desc_en: "Third member of the Leo Triplet with M65 and M66, seen edge-on with a prominent dust lane.", desc_es: "Tercer miembro del Trío de Leo con M65 y M66, vista de canto con prominente banda de polvo.", desc_zh: "狮子座三重奏第三成员(与M65、M66)，侧面可见明显尘埃带。",
        tips_it: "Inquadra M65+M66+NGC3628 insieme per il 'Tripletto del Leone' completo. Focale media 500-800mm.", tips_en: "Frame M65+M66+NGC3628 together for the complete 'Leo Triplet'. Medium focal length 500-800mm.", tips_es: "Encuadra M65+M66+NGC3628 juntas para el 'Trío de Leo' completo. Focal media 500-800mm.", tips_zh: "将M65+M66+NGC3628一起入镜，拍摄完整狮子座三重奏。建议中焦距500-800mm。"
    },
    {
        id: "m65", name: "M65", size: 8, icon: "🌀", ra: 11.31, dec: 13.09, type: "Galassia a Spirale", mag: "+9.3", dist: "35 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M65",
        it: "M65 (Tripletto del Leone)", en: "M65 (Leo Triplet)", es: "M65 (Trío de Leo)", zh: "M65(狮子座三重奏)",
        desc_it: "Galassia a spirale nel Leone, parte del Tripletto del Leone con M66 e NGC 3628.", desc_en: "Spiral galaxy in Leo, part of the Leo Triplet with M66 and NGC 3628.", desc_es: "Galaxia espiral en Leo, parte del Trío de Leo con M66 y NGC 3628.", desc_zh: "狮子座螺旋星系，是与M66和NGC 3628组成的狮子座三重奏成员。",
        tips_it: "Abbinala sempre a M66 e NGC 3628 per catturare l'intero tripletto. Focale 500-800mm.", tips_en: "Always pair with M66 and NGC 3628 to capture the full triplet. Focal 500-800mm.", tips_es: "Siempre combínala con M66 y NGC 3628 para capturar el trío completo. Focal 500-800mm.", tips_zh: "始终与M66和NGC 3628搭配，拍摄完整的三重奏。建议焦距500-800mm。"
    },
    {
        id: "m66", name: "M66", size: 9, icon: "🌀", ra: 11.34, dec: 12.99, type: "Galassia a Spirale", mag: "+8.9", dist: "36 Milioni a.l.", link: "https://it.wikipedia.org/wiki/M66",
        it: "M66 (Tripletto del Leone)", en: "M66 (Leo Triplet)", es: "M66 (Trío de Leo)", zh: "M66(狮子座三重奏)",
        desc_it: "La più luminosa del Tripletto del Leone, con bracci a spirale distorte per interazione gravitazionale.", desc_en: "The brightest of the Leo Triplet, with spiral arms distorted by gravitational interaction.", desc_es: "La más brillante del Trío de Leo, con brazos espirales distorsionados por interacción gravitacional.", desc_zh: "狮子座三重奏中最亮的成员，螺旋臂因引力相互作用而产生扭曲。",
        tips_it: "La più facile del tripletto. La distorsione dei bracci a spirale è spettacolare in L-RGB.", tips_en: "The easiest of the triplet. The distorted spiral arms are spectacular in L-RGB.", tips_es: "La más fácil del trío. Los brazos en espiral distorsionados son espectaculares en L-RGB.", tips_zh: "三重奏中最易拍摄的成员。扭曲的螺旋臂在L-RGB模式下非常壮观。"
    },
    {
        id: "ngc4631", name: "NGC 4631", size: 15, icon: "🐋", ra: 12.70, dec: 32.54, type: "Galassia a Spirale", mag: "+9.2", dist: "25 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_4631",
        it: "Galassia Balena", en: "Whale Galaxy", es: "Galaxia Ballena", zh: "鲸鱼星系",
        desc_it: "Galassia vista di taglio nei Cani da Caccia, affiancata dalla più piccola NGC 4627.", desc_en: "Edge-on galaxy in Canes Venatici, flanked by the smaller NGC 4627.", desc_es: "Galaxia vista de canto en Canes Venatici, flanqueada por la más pequeña NGC 4627.", desc_zh: "猎犬座侧面星系，旁边伴有较小的NGC 4627。",
        tips_it: "Inquadra insieme a NGC 4656 per un campo ricchissimo. LRGB con H-Alpha per il gas.", tips_en: "Frame with NGC 4656 for a rich field. LRGB with H-Alpha for the gas halo.", tips_es: "Encuadra con NGC 4656 para un campo rico. LRGB con H-Alfa para el gas.", tips_zh: "与NGC 4656一起入镜形成丰富星场。LRGB结合H-Alpha可以捕捉气体晕。"
    },
    {
        id: "ngc6946", name: "NGC 6946", size: 11, icon: "🎆", ra: 20.58, dec: 60.15, type: "Galassia a Spirale", mag: "+8.8", dist: "22 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassia_Fuochi_d%27Artificio",
        it: "Galassia Fuochi d'Artificio", en: "Fireworks Galaxy", es: "Galaxia Fuegos Artificiales", zh: "烟花星系",
        desc_it: "Galassia ricchissima di supernove (10 in un secolo!) al confine tra Cigno e Cefeo.", desc_en: "Galaxy with an exceptional supernova rate (10 in a century!) on the Cygnus-Cepheus border.", desc_es: "Galaxia con tasa excepcional de supernovas (10 en un siglo!) en el límite Cygnus-Cefeo.", desc_zh: "超新星爆发率极高的星系(一个世纪内10次!)，位于天鹅座和仙王座交界处。",
        tips_it: "L'H-Alpha dei bracci è spettacolare. Abbinala all'ammasso NGC 6939 per un campo ricco.", tips_en: "The H-Alpha in the spiral arms is spectacular. Pair with cluster NGC 6939 for a rich field.", tips_es: "El H-Alfa en los brazos es espectacular. Combínala con el cúmulo NGC 6939.", tips_zh: "螺旋臂中的H-Alpha极为壮观。与NGC 6939星团搭配，形成丰富的星场。"
    },
    {
        id: "ngc2403", name: "NGC 2403", size: 21, icon: "🌀", ra: 7.62, dec: 65.60, type: "Galassia a Spirale", mag: "+8.4", dist: "10 Milioni a.l.", link: "https://it.wikipedia.org/wiki/NGC_2403",
        it: "NGC 2403", en: "NGC 2403", es: "NGC 2403", zh: "NGC 2403",
        desc_it: "Galassia a spirale nella Giraffa, una delle più vicine al Gruppo Locale e ricca di regioni HII.", desc_en: "Spiral galaxy in Camelopardalis, one of the closest to the Local Group and rich in HII regions.", desc_es: "Galaxia espiral en Jirafa, una de las más cercanas al Grupo Local y rica en regiones HII.", desc_zh: "鹿豹座螺旋星系，是本星系群最近邻之一，富含HII区域。",
        tips_it: "Le regioni HII emergono bene con H-Alpha. LRGB+Ha per un risultato completo.", tips_en: "The HII regions emerge nicely with H-Alpha. LRGB+Ha for a complete result.", tips_es: "Las regiones HII emergen bien con H-Alfa. LRGB+Ha para un resultado completo.", tips_zh: "HII区域在H-Alpha下清晰可见。LRGB+Ha组合可获得完整效果。"
    },
    {
        id: "ngc4038", name: "NGC 4038/4039", size: 5, icon: "📡", ra: 12.02, dec: -18.87, type: "Galassia a Spirale", mag: "+10.3", dist: "70 Milioni a.l.", link: "https://it.wikipedia.org/wiki/Galassie_Antenna",
        it: "Galassie Antenna", en: "Antennae Galaxies", es: "Galaxias Antena", zh: "触须星系",
        desc_it: "Due galassie in collisione nel Corvo, con lunghe code di marea che ricordano antenne di insetto.", desc_en: "Two colliding galaxies in Corvus, with long tidal tails resembling insect antennae.", desc_es: "Dos galaxias en colisión en Corvus, con largas colas de mareas que parecen antenas.", desc_zh: "乌鸦座两个正在碰撞的星系，拥有形似触须的潮汐尾巴。",
        tips_it: "Alta focale per i dettagli. L-RGB per catturare le code di marea tenue. Oggetto australe.", tips_en: "High focal for details. L-RGB to capture the faint tidal tails. Southern object.", tips_es: "Alta focal para los detalles. L-RGB para capturar las tenues colas de mareas. Objeto austral.", tips_zh: "高焦距捕捉细节。L-RGB拍摄微弱的潮汐尾。南天目标。"
    },
    // ==============================================================
    // --- AMMASSI GLOBULARI ---
    // ==============================================================
    {
        id: "m15", name: "M15", size: 18, icon: "🎇", ra: 21.49, dec: 12.17, type: "Ammasso Globulare", mag: "+6.2", dist: "33.600 a.l.", link: "https://it.wikipedia.org/wiki/M15_(astronomia)", hdr: 5,
        it: "M15", en: "M15", es: "M15", zh: "M15",
        desc_it: "Uno degli ammassi globulari più densi e antichi della Via Lattea, nel Pegaso.", desc_en: "One of the densest and oldest globular clusters in the Milky Way, in Pegasus.", desc_es: "Uno de los cúmulos globulares más densos y antiguos de la Vía Láctea, en Pegaso.", desc_zh: "飞马座银河系中最密集、最古老的球状星团之一。",
        tips_it: "Nucleo molto condensato. Alta focale (>1000mm) e pose brevissime (30-60s) per non saturare.", tips_en: "Very condensed core. High focal (>1000mm) and very short exposures (30-60s) to avoid saturation.", tips_es: "Núcleo muy condensado. Alta focal (>1000mm) y posados muy cortos (30-60s) para no saturar.", tips_zh: "核心极为密集。高焦距(>1000mm)配合极短曝光(30-60秒)以避免过饱和。"
    },
    {
        id: "m22", name: "M22", size: 32, icon: "🎇", ra: 18.60, dec: -23.90, type: "Ammasso Globulare", mag: "+5.1", dist: "10.600 a.l.", link: "https://it.wikipedia.org/wiki/M22_(astronomia)",
        it: "M22", en: "M22", es: "M22", zh: "M22",
        desc_it: "Uno dei più grandi e vicini ammassi globulari della Via Lattea, nel Sagittario.", desc_en: "One of the largest and nearest globular clusters in the Milky Way, in Sagittarius.", desc_es: "Uno de los cúmulos globulares más grandes y cercanos de la Vía Láctea, en Sagitario.", desc_zh: "银河系中最大、最近的球状星团之一，位于人马座。",
        tips_it: "Molto grande e luminoso. Focale media (500-800mm) per catturarne la grande estensione.", tips_en: "Very large and bright. Medium focal (500-800mm) to capture its full extent.", tips_es: "Muy grande y brillante. Focal media (500-800mm) para capturar toda su extensión.", tips_zh: "体积大、亮度高。中等焦距(500-800mm)以捕捉其完整范围。"
    },
    {
        id: "m92", name: "M92", size: 14, icon: "🎇", ra: 17.28, dec: 43.14, type: "Ammasso Globulare", mag: "+6.4", dist: "26.700 a.l.", link: "https://it.wikipedia.org/wiki/M92_(astronomia)",
        it: "M92", en: "M92", es: "M92", zh: "M92",
        desc_it: "Ammasso globulare nell'Ercole, spesso trascurato rispetto al famoso M13 ma altrettanto bello.", desc_en: "Globular cluster in Hercules, often overlooked next to M13 but equally beautiful.", desc_es: "Cúmulo globular en Hércules, a menudo ignorado junto a M13 pero igualmente bello.", desc_zh: "武仙座球状星团，常被著名的M13所掩盖，但同样美丽。",
        tips_it: "Abbinalo a M13 nella stessa sessione. Alta focale per risolvere le stelle periferiche.", tips_en: "Pair with M13 in the same session. High focal to resolve the outer stars.", tips_es: "Combínalo con M13 en la misma sesión. Alta focal para resolver las estrellas externas.", tips_zh: "可与M13在同一拍摄夜晚配对。高焦距以分辨外围恒星。"
    },
    // ==============================================================
    // --- AMMASSI APERTI ---
    // ==============================================================
    {
        id: "m44", name: "M44", size: 95, icon: "🐝", ra: 8.67, dec: 19.67, type: "Ammasso Aperto", mag: "+3.7", dist: "577 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_del_Presepe",
        it: "Ammasso del Presepe", en: "Beehive Cluster", es: "Cúmulo del Pesebre", zh: "蜂巢星团",
        desc_it: "Ammasso aperto vicinissimo nel Cancro, visibile ad occhio nudo come una piccola nuvola.", desc_en: "Very nearby open cluster in Cancer, visible to the naked eye as a small cloud.", desc_es: "Cúmulo abierto muy cercano en Cáncer, visible a simple vista como una pequeña nube.", desc_zh: "巨蟹座近距离疏散星团，肉眼可见为一片小云雾。",
        tips_it: "Enormemente grande: usa un campo largo o grandangolare. Tempi di posa corti (30-60s).", tips_en: "Very large: use a wide field or wide-angle lens. Short exposures (30-60s).", tips_es: "Muy grande: usa un campo amplio o angular. Exposiciones cortas (30-60s).", tips_zh: "体积庞大：使用广角或宽视野拍摄。短曝光(30-60秒)。"
    },
    {
        id: "m35", name: "M35", size: 28, icon: "✨", ra: 6.15, dec: 24.34, type: "Ammasso Aperto", mag: "+5.3", dist: "2.800 a.l.", link: "https://it.wikipedia.org/wiki/M35_(astronomia)",
        it: "M35", en: "M35", es: "M35", zh: "M35",
        desc_it: "Ricco ammasso aperto nei Gemelli, con in campo l'ammasso di fondo NGC 2158 più lontano.", desc_en: "Rich open cluster in Gemini, with the more distant background cluster NGC 2158 in the field.", desc_es: "Rico cúmulo abierto en Géminis, con el cúmulo de fondo NGC 2158 en el campo.", desc_zh: "双子座丰富的疏散星团，背景中可见更遥远的NGC 2158星团。",
        tips_it: "Abbinalo a NGC 2158 sullo stesso campo. Focale 500-800mm. Pose brevi per i colori.", tips_en: "Pair with NGC 2158 in the same field. Focal 500-800mm. Short exposures to preserve star colors.", tips_es: "Combínalo con NGC 2158 en el mismo campo. Focal 500-800mm. Posados cortos para colores.", tips_zh: "与NGC 2158一起入镜。焦距500-800mm。短曝光以保留星色。"
    },
    {
        id: "ngc7789", name: "NGC 7789", size: 25, icon: "🌹", ra: 23.96, dec: 56.72, type: "Ammasso Aperto", mag: "+6.7", dist: "7.600 a.l.", link: "https://it.wikipedia.org/wiki/NGC_7789",
        it: "Rosa di Carolina", en: "Caroline's Rose", es: "Rosa de Carolina", zh: "卡罗琳玫瑰",
        desc_it: "Denso ammasso aperto in Cassiopea scoperto da Caroline Herschel. Migliaia di stelle.", desc_en: "Dense open cluster in Cassiopeia discovered by Caroline Herschel. Thousands of stars.", desc_es: "Denso cúmulo abierto en Casiopea descubierto por Caroline Herschel. Miles de estrellas.", desc_zh: "仙后座密集疏散星团，由卡罗琳·赫歇尔发现，包含数千颗恒星。",
        tips_it: "Alta focale (>800mm) per risolvere le stelle. Pose brevi per evitare saturazione. Spettacolare.", tips_en: "High focal (>800mm) to resolve the stars. Short exposures to avoid saturation. Spectacular.", tips_es: "Alta focal (>800mm) para resolver las estrellas. Posados cortos para evitar saturación.", tips_zh: "高焦距(>800mm)以分辨恒星。短曝光避免过饱和。景象壮观。"
    },
    {
        id: "m6", name: "M6", size: 25, icon: "🦋", ra: 17.66, dec: -32.22, type: "Ammasso Aperto", mag: "+4.2", dist: "1.600 a.l.", link: "https://it.wikipedia.org/wiki/Ammasso_Farfalla",
        it: "Ammasso Farfalla", en: "Butterfly Cluster", es: "Cúmulo Mariposa", zh: "蝴蝶星团",
        desc_it: "Ammasso aperto nello Scorpione, con disposizione delle stelle che ricorda una farfalla.", desc_en: "Open cluster in Scorpius, with stars arranged in a butterfly pattern.", desc_es: "Cúmulo abierto en Escorpión, con estrellas dispuestas en forma de mariposa.", desc_zh: "天蝎座疏散星团，恒星排列形似蝴蝶。",
        tips_it: "Vicino a M7, ottimo con focali corte (200-400mm) per catturarli insieme nel ricco campo della Via Lattea.", tips_en: "Near M7, great with short focal lengths (200-400mm) to capture both in the rich Milky Way field.", tips_es: "Cercano a M7, genial con focales cortas (200-400mm) para capturarlos juntos en la Vía Láctea.", tips_zh: "靠近M7，适合短焦距(200-400mm)在丰富的银河背景中同时拍摄两者。"
    },
    {
        id: "m7", name: "M7", size: 80, icon: "✨", ra: 17.90, dec: -34.81, type: "Ammasso Aperto", mag: "+3.3", dist: "980 a.l.", link: "https://it.wikipedia.org/wiki/M7",
        it: "M7 (Ammasso di Tolomeo)", en: "M7 (Ptolemy Cluster)", es: "M7 (Cúmulo de Ptolomeo)", zh: "M7(托勒密星团)",
        desc_it: "Uno degli ammassi aperti più vicini e vistosi, nello Scorpione. Visibile ad occhio nudo.", desc_en: "One of the nearest and most prominent open clusters, in Scorpius. Visible to the naked eye.", desc_es: "Uno de los cúmulos abiertos más cercanos y vistosos, en Escorpión. Visible a simple vista.", desc_zh: "天蝎座最近、最显著的疏散星团之一，肉眼可见。",
        tips_it: "Enormemente grande (1.3°): usa solo grandangolari o teleobiettivi corti (85-200mm).", tips_en: "Very large (1.3°): use only wide-angle or short telephoto lenses (85-200mm).", tips_es: "Muy grande (1.3°): usa solo gran angular o teleobjetivos cortos (85-200mm).", tips_zh: "体积极大(1.3度)：只能使用广角或短焦距镜头(85-200mm)拍摄。"
    }

];