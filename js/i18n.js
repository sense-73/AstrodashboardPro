// ============================================================
// i18n.js — Traduzioni multi-lingua (IT / EN / ES / ZH)
// ============================================================

let lang = localStorage.getItem('ad_lang') || 'it';

        // --- MOTORE MULTI-LINGUA (i18n) ---
        const i18n = {
            it: {
                "manual_btn": "Apri Manuale", "pos_title": "Posizione", "find_place": "Trova Luogo:", "search_place": "Es. Monte Lussari...",
                "lat": "Latitudine:", "lon": "Longitudine:", "apply_coords": "Applica", "env_data": "Dati Ambientali",
                "low_clouds": "Nuvole Basse", "mid_clouds": "Nuvole Medie", "high_clouds": "Nuvole Alte", "moon_poll": "Inq. Lunare",
                "humidity": "Umidità", "seeing_est": "Stima Seeing", "now": "Adesso",
                "hybrid_planetarium": "Planetario Predittivo Ibrido", "solar_system": "Sistema Solare",
                "rec_targets": "Oggetti Consigliati Visibili", "free_search": "Ricerca Libera Oggetto", "search_target": "Es. M31, Pleiadi...",
                "plan_target_btn": "Pianifica", "back_dash": "Torna alla Dashboard", "change_target": "Cambia",
                "dossier": "Dossier Astrofotografico", "type": "Tipologia", "app_mag": "Magnitudine App.", "distance": "Distanza", "wiki_link": "Wikipedia",
                "tactical_tip": "Consiglio Tattico:", "optical_setup": "Setup Ottico", "telescope": "Telescopio:", "focal_len": "Focale (mm):",
                "sensor": "Sensore:", "width": "Larg. W (mm):", "height": "Alet. H (mm):", "fov_calc": "Campo Inquadrato Calcolato",
                "fov_sim": "Simulatore FOV Realistico (DSS2)", "smart_calc": "Calcolatore Sessione Smart",
                "sunset": "Tramonto", "night_start": "Inizio Notte Astr.", "night_end": "Fine Notte Astr.", "sunrise": "Alba",
                "session_date": "Data sessione:", "today_btn": "Oggi", "future_date_meteo_warn": "Dati meteo non disponibili per date future. Calcoli astronomici aggiornati per la data selezionata.", "session_start": "Inizio Sessione:", "session_end": "Fine Sessione:", "sensor_type": "Tipo Sensore:",
                "seq_setup": "Impostazione Sequenza", "gen_seq_btn": "Genera Sequenza Ottimale", "use_frame": "Usa | Frame", "poses_sec": "Pose x Sec.",
                "total": "Totale", "every": "Ogni", "avail_window": "Finestra Disponibile", "acq_time": "Tempo Acquisizione", "res_time": "Tempo Residuo", "time_overflow": "Sforamento tempo!",
                "nina_export_title": "Esportazione N.I.N.A. Advanced Sequencer", "seq_start": "Avvio Sequenza", "cool_cam": "Raffredda Camera a",
                "slew_center": "Slew & Center (Plate Solve)", "start_guide": "Avvia Autoguida", "end_sec": "Fine / Sicurezza", "warm_cam": "Riscalda Camera (Warm Up)",
                "park_mount": "Parcheggia Montatura", "meridian_flip": "Attiva Meridian Flip", "filter_map": "Mappatura Nomi Filtri", "gen_nina_btn": "Genera File per N.I.N.A.",
                "clear": "Sereno", "partly_cloudy": "Poco Nuvoloso", "mostly_cloudy": "Nubi Sparse", "overcast": "Coperto", "daytime": "Giorno",
                "new_moon": "Luna Nuova", "waxing_crescent": "Falce Crescente", "first_quarter": "Primo Quarto", "waxing_gibbous": "Gibbosa Crescente", "full_moon": "Luna Piena", "waning_gibbous": "Gibbosa Calante", "last_quarter": "Ultimo Quarto", "waning_crescent": "Falce Calante",
                "galaxy": "Galassia", "nebula": "Nebulosa", "cluster": "Ammasso", "star": "Stella", "unknown": "Sconosciuta",
                "alert_planetarium": "Scegli prima un bersaglio dal Planetario 🔭!", "alert_noseq": "Nessuna posa calcolata! Clicca prima su 'Genera Sequenza Ottimale'.",
                "alert_calib": "I frame di calibrazione occupano tutto il tempo!", "alert_nolight": "Seleziona almeno un filtro Light.", "alert_times": "Imposta prima gli orari di Inizio e Fine.", "no_target": "Nessun oggetto visibile.", "too_bright": "☀️ Cielo troppo luminoso.", "dso_too_bright": "☀️ Cielo troppo luminoso per il Deep Sky.", "select_opt": "-- Seleziona --",
                "jupiter": "Giove", "mars": "Marte", "venus": "Venere", "moon": "Luna", "sun": "Sole", "weather": "Meteo", "mercury": "Mercurio", "saturn": "Saturno", "uranus": "Urano", "neptune": "Nettuno",
                "mode": "Modalità:", "single_panel": "Scatto Singolo", "mosaic": "Mosaico", "panels": "Pannelli (X, Y):", "overlap": "Sovrapposizione:", "time_per_panel": "Tempo per Pannello", "fov_warning": "L'oggetto è più grande del campo! Valuta un mosaico.", "nina_mosaic_msg": "Modalità Mosaico attiva. Usa il Framing Assistant di N.I.N.A. per le coordinate.",
                "gen_report_btn": "Genera Report Strategico", "report_title": "Dossier Mosaico", "copy_report": "Copia negli Appunti", "copied": "Copiato!", "report_general": "Info Generali Mosaico", "report_strategy": "Strategia Singolo Pannello", "report_plan": "Piano di Scatto (Per Pannello)",
                "info_pos": "Cerca un luogo o inserisci coordinate. La mappa mostra un raggio di 50km utile per trovare 'buchi di sereno' spostandoti.",
                "info_env": "Dati meteo professionali estratti dal satellite in tempo reale.",
                "info_planetarium": "Mostra i target visibili calcolando l'altezza sull'orizzonte. Sposta lo slider per simulare la volta celeste stanotte.",
                "info_search": "Cerca un oggetto non in lista. Il sistema interrogherà l'università di Strasburgo (SIMBAD) per scaricare le coordinate assolute.",
                "info_setup": "Inquadra il bersaglio sulla mappa. Se è troppo grande, attiva la modalità 'Mosaico' per far dividere automaticamente al sistema i tempi notturni.",
                "info_smart": "Il sistema riempie il tuo buio notturno generando pose ottimali per cluster, galassie o nebulose, calcolando anche le calibrazioni per sensori Mono.",
                "info_dither": "Muove leggermente la montatura tra uno scatto e l'altro per ridurre il rumore. Il sistema sottrarrà i secondi persi dal totale disponibile.",
                "info_hdr_col": "Esposizione breve per la strategia HDR. Usata per catturare il nucleo brillante di nebulose planetarie e ammassi globulari senza saturarlo, da affiancare alle pose lunghe principali. L'algoritmo aggiunge automaticamente un blocco separato nel file N.I.N.A. Il numero di pose HDR è stimato al 50% di quelle principali.",
                "rpt_hdr_note": "Esposizione breve affiancata alle pose principali per recuperare i dettagli nelle aree più luminose (nucleo stellare, centro nebulare) senza saturazione. Il numero di pose HDR è stimato automaticamente al 50% delle pose principali.",
                "info_nina": "Salva un file JSON perfetto. Trascinalo dentro N.I.N.A. (Advanced Sequencer) e la sessione partirà in autonomia totale.",
                "mn_title": "Progettazione Multinotte",
                "mn_warning": "ATTENZIONE: Assicurati che i nomi dei filtri nella 'Mappatura Nomi' (nel pannello principale) corrispondano esattamente a quelli della tua ruota portafiltri in NINA per evitare errori.",
                "mn_target_ai": "Target Consigliato",
                "mn_planned": "Tempo Pianificato",
                "mn_add_night": "Aggiungi Sessione (Notte)",
                "ai_strat_title": "Analisi Strategica",
                "ai_tot_goal": "Obiettivo Totale:",
                "ai_hours": "Ore",
                "ai_plan_btn": "Pianifica Progetto Multi-Notte",
                "mn_sess": "SESSIONE",
                "mn_real_h": "ORE REALI:",
                "mn_start": "INIZIO (> 30°):",
                "mn_end": "FINE (Tramonto/Alba):",
                "mn_filters": "Filtri da riprendere in questa notte:",
                "mn_delete": "Elimina",
                "mn_export": "Export N.I.N.A. Sessione",
                "pro_back": "Torna alla Dashboard Smart",
                "pro_session_start": "Inizio Sessione:",
                "pro_session_end": "Fine Sessione:",
                "pro_overflow": "Sforamento! Dividi in Multi-Notte",
                "pro_triggers": "Triggers & Hardware",
                "pro_preflight": "Pre-Flight",
                "pro_cool_cam": "Raffredda a",
                "pro_auto_rotator": "Rotatore Automatico",
                "pro_start_guide": "Avvia Autoguida",
                "pro_af_title": "Autofocus",
                "pro_af_start": "All'avvio sequenza",
                "pro_af_filter": "Al cambio filtro",
                "pro_af_hfr": "Alla variazione dell'HFR",
                "pro_af_every": "Ogni",
                "pro_af_min": "min",
                "pro_af_temp_lbl": "Variazione",
                "pro_postflight": "Post-Flight",
                "pro_warm_up": "Warm Up Camera",
                "pro_park": "Park Montatura",
                "pro_cover": "Chiudi Cover/Cap",
                "pro_flat": "Accendi Flat Panel",
                "pro_sensor_osc": "Sensore OSC (Color)",
                "pro_sensor_mono": "Sensore Mono",
                "pro_seq_builder": "Calcolatore di Sequenze",
                "pro_export_btn": "Esporta Advanced Sequence (.json)",
                "mn_target_tpt": "Obiettivo Progetto (TPT)",
                "mn_target_ai_label": "Analisi Consigliata",
                "mn_planned_time": "Tempo Pianificato",
                "mn_completed": "% completato"
            },
            en: {
                "manual_btn": "Open Manual", "pos_title": "Location", "find_place": "Find Place:", "search_place": "E.g. Yellowstone...",
                "lat": "Latitude:", "lon": "Longitude:", "apply_coords": "Apply", "env_data": "Env Data",
                "low_clouds": "Low Clouds", "mid_clouds": "Mid Clouds", "high_clouds": "High Clouds", "moon_poll": "Moon Poll.",
                "humidity": "Humidity", "seeing_est": "Seeing Est.", "now": "Now",
                "hybrid_planetarium": "Hybrid Predictive Planetarium", "solar_system": "Solar System",
                "rec_targets": "Recommended Targets", "free_search": "Free Target Search", "search_target": "E.g. M31, Pleiades...",
                "plan_target_btn": "Plan Target", "back_dash": "Back to Dashboard", "change_target": "Change",
                "dossier": "Astrophotography Dossier", "type": "Type", "app_mag": "App. Magnitude", "distance": "Distance", "wiki_link": "Wikipedia",
                "tactical_tip": "Tactical Tip:", "optical_setup": "Optical Setup", "telescope": "Telescope:", "focal_len": "Focal (mm):",
                "sensor": "Sensor:", "width": "Width (mm):", "height": "Height (mm):", "fov_calc": "Calculated Field of View",
                "fov_sim": "Realistic FOV Simulator (DSS2)", "smart_calc": "Smart Session Calculator",
                "sunset": "Sunset", "night_start": "Astr. Night Starts", "night_end": "Astr. Night Ends", "sunrise": "Sunrise",
                "session_date": "Session date:", "today_btn": "Today", "future_date_meteo_warn": "Weather data unavailable for future dates. Astronomical calculations updated for the selected date.", "session_start": "Session Start:", "session_end": "Session End:", "sensor_type": "Sensor Type:",
                "seq_setup": "Sequence Setup", "gen_seq_btn": "Generate Optimal Sequence", "use_frame": "Use | Frame", "poses_sec": "Exposures x Sec",
                "total": "Total", "every": "Every", "avail_window": "Available Window", "acq_time": "Acquisition Time", "res_time": "Residual Time", "time_overflow": "Time Overflow!",
                "nina_export_title": "N.I.N.A. Advanced Sequencer Export", "seq_start": "Sequence Start", "cool_cam": "Cool Camera to",
                "slew_center": "Slew & Center (Plate Solve)", "start_guide": "Start Autoguiding", "end_sec": "End / Safety", "warm_cam": "Warm Up Camera",
                "park_mount": "Park Mount", "meridian_flip": "Enable Meridian Flip", "filter_map": "Filter Name Mapping", "gen_nina_btn": "Generate N.I.N.A. File",
                "clear": "Clear", "partly_cloudy": "Partly Cloudy", "mostly_cloudy": "Mostly Cloudy", "overcast": "Overcast", "daytime": "Daytime",
                "new_moon": "New Moon", "waxing_crescent": "Waxing Crescent", "first_quarter": "First Quarter", "waxing_gibbous": "Waxing Gibbous", "full_moon": "Full Moon", "waning_gibbous": "Waning Gibbous", "last_quarter": "Last Quarter", "waning_crescent": "Waning Crescent",
                "galaxy": "Galaxy", "nebula": "Nebula", "cluster": "Cluster", "star": "Star", "unknown": "Unknown",
                "alert_planetarium": "Choose a target from the Planetarium first 🔭!", "alert_noseq": "No exposures calculated! Click 'Generate Optimal Sequence' first.",
                "alert_calib": "Calibration frames take up all the time!", "alert_nolight": "Select at least one Light filter.", "alert_times": "Please set Start and End times.", "no_target": "No visible objects.", "too_bright": "☀️ Sky is too bright.", "dso_too_bright": "☀️ Sky is too bright for Deep Sky.", "select_opt": "-- Select --",
                "jupiter": "Jupiter", "mars": "Mars", "venus": "Venus", "moon": "Moon", "sun": "Sun", "weather": "Weather", "mercury": "Mercury", "saturn": "Saturn", "uranus": "Uranus", "neptune": "Neptune",
                "mode": "Mode:", "single_panel": "Single Panel", "mosaic": "Mosaic", "panels": "Panels (X, Y):", "overlap": "Overlap:", "time_per_panel": "Time per Panel", "fov_warning": "Target is larger than your FOV! Consider a mosaic.", "nina_mosaic_msg": "Mosaic Mode active. Use N.I.N.A.'s Framing Assistant to generate panel coordinates.",
                "gen_report_btn": "Generate Strategic Report", "report_title": "Mosaic Dossier", "copy_report": "Copy to Clipboard", "copied": "Copied!", "report_general": "General Info", "report_strategy": "Per-Panel Strategy", "report_plan": "Exposure Plan (Per Panel)",
                "info_pos": "Search a location. The map shows a 50km radius to help you find 'clear sky holes' while moving under the clouds.",
                "info_env": "Professional real-time satellite weather data.",
                "info_planetarium": "Shows visible targets based on altitude. Use the slider to simulate the night sky hours.",
                "info_search": "Search any custom object. The system will connect to SIMBAD Strasbourg to download absolute coordinates.",
                "info_setup": "Calculate your FOV. If the target is too big, use 'Mosaic' mode: the system will automatically split your available darkness time.",
                "info_smart": "The system generates optimal exposures based on darkness, target type, and sensor type (Mono or Color).",
                "info_dither": "Shifts the mount slightly between shots to reduce noise. The system subtracts the lost time from your available night window.",
                "info_hdr_col": "Short exposure for HDR strategy. Used to capture the bright core of planetary nebulae and globular clusters without saturating it, alongside the main long exposures. The algorithm automatically adds a separate block in the N.I.N.A. file. HDR frame count is estimated at 50% of the main frames.",
                "rpt_hdr_note": "Short exposure paired with main frames to recover detail in bright areas (stellar core, nebula center) without saturation. HDR frame count is automatically estimated at 50% of main frames.",
                "info_nina": "Export a perfect JSON file. Drag & drop it into N.I.N.A. Advanced Sequencer for a fully autonomous night.",
                "mn_title": "Multi-Night Project Manager",
                "mn_warning": "WARNING: Make sure filter names in 'Filter Mapping' (main panel) exactly match those in your NINA filter wheel to avoid errors.",
                "mn_target_ai": "Recommended Target",
                "mn_planned": "Planned Time",
                "mn_add_night": "Add Session (Night)",
                "ai_strat_title": "Strategic Analysis",
                "ai_tot_goal": "Total Goal:",
                "ai_hours": "Hours",
                "ai_plan_btn": "Plan Multi-Night Project",
                "mn_sess": "SESSION",
                "mn_real_h": "REAL HOURS:",
                "mn_start": "START (> 30°):",
                "mn_end": "END (Dawn/Dusk):",
                "mn_filters": "Filters to capture this night:",
                "mn_delete": "Delete",
                "mn_export": "Export N.I.N.A. Session",
                "pro_back": "Back to Smart Dashboard",
                "pro_session_start": "Session Start:",
                "pro_session_end": "Session End:",
                "pro_overflow": "Overflow! Split into Multi-Night",
                "pro_triggers": "Triggers & Hardware",
                "pro_preflight": "Pre-Flight",
                "pro_cool_cam": "Cool Camera to",
                "pro_auto_rotator": "Auto Rotator",
                "pro_start_guide": "Start Autoguiding",
                "pro_af_title": "Autofocus",
                "pro_af_start": "At sequence start",
                "pro_af_filter": "On filter change",
                "pro_af_hfr": "On HFR increase",
                "pro_af_every": "Every",
                "pro_af_min": "min",
                "pro_af_temp_lbl": "Temp. change",
                "pro_postflight": "Post-Flight",
                "pro_warm_up": "Warm Up Camera",
                "pro_park": "Park Mount",
                "pro_cover": "Close Cover/Cap",
                "pro_flat": "Turn On Flat Panel",
                "pro_sensor_osc": "OSC Sensor (Color)",
                "pro_sensor_mono": "Mono Sensor",
                "pro_seq_builder": "Sequence Builder",
                "pro_export_btn": "Export Advanced Sequence (.json)",
                "mn_target_tpt": "Project Goal (TPT)",
                "mn_target_ai_label": "Recommended Target",
                "mn_planned_time": "Planned Time",
                "mn_completed": "% completed"
            },
            es: {
                "manual_btn": "Abrir Manual", "pos_title": "Ubicación", "find_place": "Buscar Lugar:", "search_place": "Ej. Atacama...",
                "lat": "Latitud:", "lon": "Longitud:", "apply_coords": "Aplicar", "env_data": "Datos Ambientales",
                "low_clouds": "Nubes Bajas", "mid_clouds": "Nubes Medias", "high_clouds": "Nubes Altas", "moon_poll": "Ilum. Lunar",
                "humidity": "Humedad", "seeing_est": "Est. Seeing", "now": "Ahora",
                "hybrid_planetarium": "Planetario Híbrido", "solar_system": "Sistema Solar",
                "rec_targets": "Objetivos Recomendados", "free_search": "Búsqueda Libre", "search_target": "Ej. M31, Pléyades...",
                "plan_target_btn": "Planificar", "back_dash": "Volver al Panel", "change_target": "Cambiar",
                "dossier": "Dosier Fotográfico", "type": "Tipo", "app_mag": "Magnitud", "distance": "Distancia", "wiki_link": "Wikipedia",
                "tactical_tip": "Consejo Táctico:", "optical_setup": "Equipo Óptico", "telescope": "Telescopio:", "focal_len": "Focal (mm):",
                "sensor": "Sensor:", "width": "Ancho (mm):", "height": "Alto (mm):", "fov_calc": "Campo de Visión (FOV)",
                "fov_sim": "Simulador FOV Realista (DSS2)", "smart_calc": "Calculadora de Sesión Smart",
                "sunset": "Atardecer", "night_start": "Inicio Noche Oscura", "night_end": "Fin Noche Oscura", "sunrise": "Amanecer",
                "session_date": "Fecha sesión:", "today_btn": "Hoy", "future_date_meteo_warn": "Datos meteorológicos no disponibles para fechas futuras. Cálculos astronómicos actualizados para la fecha seleccionada.", "session_start": "Inicio Sesión:", "session_end": "Fin Sesión:", "sensor_type": "Tipo de Sensor:",
                "seq_setup": "Configuración de Secuencia", "gen_seq_btn": "Generar Secuencia Óptima", "use_frame": "Usar | Frame", "poses_sec": "Tomas x Seg",
                "total": "Total", "every": "Cada", "avail_window": "Tiempo Disponible", "acq_time": "Tiempo de Captura", "res_time": "Tiempo Restante", "time_overflow": "¡Tiempo excedido!",
                "nina_export_title": "Exportar Secuencia a N.I.N.A.", "seq_start": "Inicio Secuencia", "cool_cam": "Enfriar Cámara a",
                "slew_center": "Apuntar y Centrar (Plate Solve)", "start_guide": "Iniciar Guiado", "end_sec": "Fin / Seguridad", "warm_cam": "Calentar Cámara",
                "park_mount": "Aparcar Montura", "meridian_flip": "Activar Meridian Flip", "filter_map": "Mapeo Nombres de Filtros", "gen_nina_btn": "Generar Archivo N.I.N.A.",
                "clear": "Despejado", "partly_cloudy": "Poco Nublado", "mostly_cloudy": "Nublado", "overcast": "Cubierto", "daytime": "Día",
                "new_moon": "Luna Nueva", "waxing_crescent": "Luna Creciente", "first_quarter": "Cuarto Creciente", "waxing_gibbous": "Gibosa Creciente", "full_moon": "Luna Llena", "waning_gibbous": "Gibosa Menguante", "last_quarter": "Cuarto Menguante", "waning_crescent": "Luna Menguante",
                "galaxy": "Galaxia", "nebula": "Nebulosa", "cluster": "Cúmulo", "star": "Estrella", "unknown": "Desconocido",
                "alert_planetarium": "¡Elige primero un objetivo en el Planetario 🔭!", "alert_noseq": "¡No se han calculado tomas! Haz clic en 'Generar Secuencia Óptima'.",
                "alert_calib": "¡Las tomas de calibración ocupan todo el tiempo!", "alert_nolight": "Selecciona al menos un filtro Light.", "alert_times": "Configura las horas de Inicio y Fin.", "no_target": "No hay objetos visibles.", "too_bright": "☀️ Cielo demasiado brillante.", "dso_too_bright": "☀️ Cielo demasiado brillante para cielo profundo.", "select_opt": "-- Seleccionar --",
                "jupiter": "Júpiter", "mars": "Marte", "venus": "Venus", "moon": "Luna", "sun": "Sol", "weather": "Clima", "mercury": "Mercurio", "saturn": "Saturno", "uranus": "Urano", "neptune": "Neptuno",
                "mode": "Modo:", "single_panel": "Panel Único", "mosaic": "Mosaico", "panels": "Paneles (X, Y):", "overlap": "Solapamiento:", "time_per_panel": "Tiempo por Panel", "fov_warning": "¡El objeto es más grande que tu campo visual! Considera un mosaico.", "nina_mosaic_msg": "Modo Mosaico activo. Utiliza el Framing Assistant de N.I.N.A. para crear las coordenadas de los paneles.",
                "gen_report_btn": "Generar Informe Estratégico", "report_title": "Dosier Mosaico", "copy_report": "Copiar al Portapapeles", "copied": "¡Copiado!", "report_general": "Info General", "report_strategy": "Estrategia por Panel", "report_plan": "Plan de Captura",
                "info_pos": "El mapa muestra un radio de 50km para encontrar claros en las nubes si te desplazas.",
                "info_env": "Datos meteorológicos satelitales en tiempo real.",
                "info_planetarium": "Muestra objetivos visibles. Desliza la barra temporal para simular el cielo.",
                "info_search": "Busca cualquier objeto. La IA conectará con SIMBAD para descargar las coordenadas.",
                "info_setup": "Si el objeto es más grande que tu sensor, usa Mosaico. La IA dividirá el tiempo nocturno.",
                "info_smart": "La IA asigna tiempos ideales basados en tus horas de oscuridad y tu tipo de cámara.",
                "info_dither": "El Dithering reduce el ruido. La IA restará los segundos perdidos de tu tiempo total.",
                "info_hdr_col": "Exposición corta para la estrategia HDR. Usada para capturar el núcleo brillante de nebulosas planetarias y cúmulos globulares sin saturarlo. El algoritmo añade automáticamente un bloque separado en el archivo N.I.N.A. El número de poses HDR se estima al 50% de las principales.",
                "rpt_hdr_note": "Exposición corta junto a las poses principales para recuperar detalles en zonas brillantes (núcleo estelar, centro nebular) sin saturación. El número de poses HDR se estima automáticamente al 50% de las principales.",
                "info_nina": "Genera un archivo JSON. Arrástralo a N.I.N.A. Advanced Sequencer para automatizar toda tu noche.",
                "mn_title": "Gestor Multi-Noche",
                "mn_warning": "ATENCIÓN: Asegúrate de que los nombres en 'Mapeo Nombres' (panel principal) coincidan exactamente con los de tu rueda de filtros en NINA para evitar errores.",
                "mn_target_ai": "Objetivo",
                "mn_planned": "Tiempo Planeado",
                "mn_add_night": "Añadir Sesión (Noche)",
                "ai_strat_title": "Análisis Estratégico",
                "ai_tot_goal": "Objetivo Total:",
                "ai_hours": "Horas",
                "ai_plan_btn": "Planificar Proyecto Multi-Noche",
                "mn_sess": "SESIÓN",
                "mn_real_h": "HORAS REALES:",
                "mn_start": "INICIO (> 30°):",
                "mn_end": "FIN (Amanecer):",
                "mn_filters": "Filtros para esta noche:",
                "mn_delete": "Eliminar",
                "mn_export": "Exportar N.I.N.A. Sesión",
                "pro_back": "Volver al Dashboard Smart",
                "pro_session_start": "Inicio de Sesión:",
                "pro_session_end": "Fin de Sesión:",
                "pro_overflow": "¡Desbordamiento! Dividir en Multi-Noche",
                "pro_triggers": "Disparadores y Hardware",
                "pro_preflight": "Pre-Vuelo",
                "pro_cool_cam": "Enfriar Cámara a",
                "pro_auto_rotator": "Rotador Automático",
                "pro_start_guide": "Iniciar Autoguiado",
                "pro_af_title": "Autofocus",
                "pro_af_start": "Al inicio de secuencia",
                "pro_af_filter": "Al cambiar filtro",
                "pro_af_hfr": "Al incremento de HFR",
                "pro_af_every": "Cada",
                "pro_af_min": "min",
                "pro_af_temp_lbl": "Variación de temp.",
                "pro_postflight": "Post-Vuelo",
                "pro_warm_up": "Calentar Cámara",
                "pro_park": "Aparcar Montura",
                "pro_cover": "Cerrar Tapa/Cubierta",
                "pro_flat": "Encender Panel Flat",
                "pro_sensor_osc": "Sensor OSC (Color)",
                "pro_sensor_mono": "Sensor Mono",
                "pro_seq_builder": "Constructor de Secuencia",
                "pro_export_btn": "Exportar Secuencia Avanzada (.json)",
                "mn_target_tpt": "Objetivo del Proyecto (TPT)",
                "mn_target_ai_label": "Objetivo Recomendado",
                "mn_planned_time": "Tiempo Planificado",
                "mn_completed": "% completado"
            },
            zh: {
                "manual_btn": "打开手册", "pos_title": "位置", "find_place": "查找地点:", "search_place": "例如: 丽江...",
                "lat": "纬度:", "lon": "经度:", "apply_coords": "应用", "env_data": "环境数据",
                "low_clouds": "低云", "mid_clouds": "中云", "high_clouds": "高云", "moon_poll": "月光影响",
                "humidity": "湿度", "seeing_est": "视宁度预估", "now": "现在",
                "hybrid_planetarium": "混合预测星图", "solar_system": "太阳系",
                "rec_targets": "推荐深空目标", "free_search": "自由搜索目标", "search_target": "如: M31...",
                "plan_target_btn": "计划拍摄", "back_dash": "返回仪表板", "change_target": "更改",
                "dossier": "天文目标档案", "type": "类型", "app_mag": "视星等", "distance": "距离", "wiki_link": "维基百科",
                "tactical_tip": "拍摄建议:", "optical_setup": "光学设置", "telescope": "望远镜:", "focal_len": "焦距 (mm):",
                "sensor": "传感器:", "width": "宽度 (mm):", "height": "高度 (mm):", "fov_calc": "视场 (FOV) 计算",
                "fov_sim": "真实视场模拟器 (DSS2)", "smart_calc": "智能序列计算",
                "sunset": "日落", "night_start": "天文黑夜开始", "night_end": "天文黑夜结束", "sunrise": "日出",
                "session_date": "会话日期：", "today_btn": "今天", "future_date_meteo_warn": "未来日期无天气数据。天文计算已按所选日期更新。", "session_start": "拍摄开始:", "session_end": "拍摄结束:", "sensor_type": "相机类型:",
                "seq_setup": "序列设置", "gen_seq_btn": "生成最佳曝光序列", "use_frame": "使用 | 帧类型", "poses_sec": "曝光数 x 秒",
                "total": "总计", "every": "每隔", "avail_window": "可用拍摄窗口", "acq_time": "总曝光时间", "res_time": "剩余时间", "time_overflow": "时间溢出！",
                "nina_export_title": "N.I.N.A. 高级序列导出", "seq_start": "序列开始前", "cool_cam": "相机降温至",
                "slew_center": "指向并居中 (星板解析)", "start_guide": "开始导星", "end_sec": "结束 / 安全", "warm_cam": "相机回温",
                "park_mount": "赤道仪归位", "meridian_flip": "启用自动中天翻转", "filter_map": "滤镜名称映射", "gen_nina_btn": "生成 N.I.N.A. 文件",
                "clear": "晴朗", "partly_cloudy": "少云", "mostly_cloudy": "多云", "overcast": "阴天", "daytime": "白天",
                "new_moon": "新月", "waxing_crescent": "蛾眉月", "first_quarter": "上弦月", "waxing_gibbous": "盈凸月", "full_moon": "满月", "waning_gibbous": "亏凸月", "last_quarter": "下弦月", "waning_crescent": "残月",
                "galaxy": "星系", "nebula": "星云", "cluster": "星团", "star": "恒星", "unknown": "未知",
                "alert_planetarium": "请先从星图中选择一个目标 🔭！", "alert_noseq": "没有计算出任何曝光！请先点击 '生成最佳曝光序列'。",
                "alert_calib": "校准帧占据了所有可用时间！", "alert_nolight": "请至少选择一个亮场 (Light) 滤镜。", "alert_times": "请先设置开始和结束时间。", "no_target": "当前没有可见目标。", "too_bright": "☀️ 天空太亮了。", "dso_too_bright": "☀️ 天空对深空目标来说太亮了。", "select_opt": "-- 请选择 --",
                "jupiter": "木星", "mars": "火星", "venus": "金星", "moon": "月球", "sun": "太阳", "weather": "天气", "mercury": "水星", "saturn": "土星", "uranus": "天王星", "neptune": "海王星",
                "mode": "模式:", "single_panel": "单面板", "mosaic": "拼接", "panels": "面板 (X, Y):", "overlap": "重叠度:", "time_per_panel": "每块面板时间", "fov_warning": "目标比你的视场还要大！考虑使用拼接拍摄。", "nina_mosaic_msg": "拼接模式已激活。请使用 N.I.N.A. 的构图助手生成面板坐标。",
                "gen_report_btn": "生成策略报告", "report_title": "拼接拍摄档案", "copy_report": "复制到剪贴板", "copied": "已复制!", "report_general": "基本信息", "report_strategy": "单面板策略", "report_plan": "曝光计划",
                "info_pos": "搜索位置。地图显示 50 公里半径，帮助您在云层下寻找晴空区。",
                "info_env": "专业的实时卫星气象数据。",
                "info_planetarium": "显示可见目标。滑动时间轴以模拟今晚的星空。",
                "info_search": "如果本地数据库没有，系统将连接斯特拉斯堡 (SIMBAD) 获取坐标。",
                "info_setup": "计算视场。如果目标太大，请选择'拼接'，系统会将黑夜时间分配给各面板。",
                "info_smart": "系统根据可用黑夜时间自动分配最佳曝光参数。",
                "info_dither": "微调赤道仪位置以减少噪点。系统会在计算时间时扣除抖动丢失的秒数。",
                "info_hdr_col": "HDR 策略的短曝光时间。用于捕捉行星状星云和球状星团明亮核心而不使其过曝，与主要长曝光并行使用。算法会在 N.I.N.A. 文件中自动添加独立模块，HDR 帧数估算为主帧的 50%。",
                "rpt_hdr_note": "与主要曝光配合的短曝光，用于恢复明亮区域（恒星核心、星云中心）的细节而不过曝。HDR 帧数自动估算为主帧的 50%。",
                "info_nina": "导出 JSON 文件。将其拖入 N.I.N.A. 高级序列器即可实现全自动拍摄。",
                "mn_title": "多夜拍摄项目管理",
                "mn_warning": "N.I.N.A. 警告：请确保底部面板的“滤镜名称”与滤镜轮中的名称完全一致，否则序列将报错！",
                "mn_target_ai": "建议目标时间",
                "mn_planned": "已计划时间",
                "mn_add_night": "添加拍摄会话 (夜晚)",
                "ai_strat_title": "策略分析",
                "ai_tot_goal": "总目标：",
                "ai_hours": "小时",
                "ai_plan_btn": "计划多夜拍摄",
                "mn_sess": "会话",
                "mn_real_h": "实际时间：",
                "mn_start": "开始 (> 30°)：",
                "mn_end": "结束 (晨昏)：",
                "mn_filters": "本夜拍摄滤镜：",
                "mn_delete": "删除",
                "mn_export": "导出 N.I.N.A. 会话",
                "pro_back": "返回智能仪表板",
                "pro_session_start": "拍摄开始:",
                "pro_session_end": "拍摄结束:",
                "pro_overflow": "时间溢出！拆分为多夜拍摄",
                "pro_triggers": "触发器与硬件",
                "pro_preflight": "拍摄前准备",
                "pro_cool_cam": "相机降温至",
                "pro_auto_rotator": "自动旋转器",
                "pro_start_guide": "开始自动导星",
                "pro_af_title": "Autofocus",
                "pro_af_start": "序列开始时",
                "pro_af_filter": "切换滤镜时",
                "pro_af_hfr": "HFR增大时",
                "pro_af_every": "每隔",
                "pro_af_min": "分钟",
                "pro_af_temp_lbl": "温度变化",
                "pro_postflight": "拍摄后处理",
                "pro_warm_up": "相机回温",
                "pro_park": "赤道仪归位",
                "pro_cover": "关闭镜头盖",
                "pro_flat": "开启平场灯",
                "pro_sensor_osc": "彩色相机 (OSC)",
                "pro_sensor_mono": "黑白相机 (Mono)",
                "pro_seq_builder": "序列构建器",
                "pro_export_btn": "导出高级序列 (.json)",
                "mn_target_tpt": "项目目标 (TPT)",
                "mn_target_ai_label": "推荐目标",
                "mn_planned_time": "已计划时间",
                "mn_completed": "% 已完成"
            }
        };

        // lang già dichiarato in i18n.js
        i18n.it.go_to_pro = "Vai al Calcolatore PRO";
        i18n.en.go_to_pro = "Go to PRO Calculator";
        i18n.es.go_to_pro = "Ir a la Calculadora PRO";
        i18n.zh.go_to_pro = "进入 PRO 计算器";
        i18n.it.mosaic_active_msg = "Modalità Mosaico attiva.";
        i18n.en.mosaic_active_msg = "Mosaic Mode active.";
        i18n.es.mosaic_active_msg = "Modo Mosaico activo.";
        i18n.zh.mosaic_active_msg = "拼接模式已激活。";
	i18n.it.info_map = "Mappa Empirica di Visibilità. Visualizza un raggio simbolico di 50 km per mostrarti a colpo d'occhio le reali condizioni del cielo. La sovrapposizione dei vari strati ti farà capire subito se la serata sarà limpida o compromessa. Usa i bottoni superiori per attivare i filtri meteo (Nuvole, Jet Stream, Umidità) e scorri la linea temporale per prevedere la loro evoluzione nelle prossime ore.";
        i18n.en.info_map = "Empirical Visibility Map. Shows a symbolic 50 km radius to give you at-a-glance real sky conditions. The overlay of different layers will let you know immediately if the night will be clear or compromised. Use the top buttons to toggle weather filters (Clouds, Jet Stream, Humidity) and slide the timeline to forecast their evolution.";
        i18n.es.info_map = "Mapa Empírico de Visibilidad. Muestra un radio simbólico de 50 km para indicarte de un vistazo las condiciones reales del cielo. La superposición de capas te hará entender de inmediato si la noche será despejada o comprometida. Usa los botones superiores para activar filtros (Nubes, Jet Stream, Humedad) y desliza la línea temporal para prever su evolución.";
        i18n.zh.info_map = "经验能见度地图。显示象征性的 50 公里半径，让您一目了然地了解真实的天空状况。不同图层的叠加将立即让您知道今晚是晴朗还是恶劣。使用顶部按钮激活天气滤镜（云层、急流、湿度），并滑动时间轴以预测它们在未来几小时内的演变。";
        i18n.it.info_seq_opt = "Se clicchi sul pulsante <b>'Genera Sequenza Ottimale'</b> il sistema calcola i tempi e il numero di pose in base alle tempistiche di integrazione impostate, con un algoritmo ragionato su tipologia di subframe (Luminanza, banda larga o banda stretta...).<br><br>Se la modalità mosaico è attiva, il sistema dividerà ulteriormente l'integrazione totale per il numero di pannelli.";
        i18n.en.info_seq_opt = "If you click the <b>'Generate Optimal Sequence'</b> button, the system calculates times and exposure counts based on the integration timeframe, using an algorithm tailored to the subframe type (Luminance, broadband, or narrowband...).<br><br>If mosaic mode is active, the system will further divide the total integration by the number of panels.";
        i18n.es.info_seq_opt = "Si haces clic en el botón <b>'Generar Secuencia Óptima'</b>, el sistema calcula los tiempos y el número de tomas en función del tiempo de integración, con un algoritmo adaptado al tipo de subframe (Luminancia, banda ancha o banda estrecha...).<br><br>Si el modo mosaico está activo, el sistema dividirá aún más la integración total por el número de paneles.";
        i18n.zh.info_seq_opt = "如果点击 <b>“生成最佳曝光序列”</b> 按钮，系统将根据设置的拍摄时间，结合子帧类型（明度、宽带或窄带等）的算法，自动计算理想的曝光时间和帧数。<br><br>如果激活了拼接模式，系统会将总时间进一步除以面板的数量。";
        
        // ── TOOLTIP PRO: Calcolatore di Sequenze ─────────────────────────────
        i18n.it.info_pro_seq = "<b>Calcolatore di Sequenze PRO</b><br><br>Qui sei tu a decidere. Inserisci per ogni filtro il numero esatto di pose e il tempo di esposizione che vuoi ottenere nel progetto finale.<br><br>La <b>barra di riempimento</b> confronta il tempo totale delle pose con la finestra notturna disponibile:<br>🟢 Verde: tutto entra in una notte<br>🟡 Arancione: margine stretto<br>🔴 Rosso: sforamento → si attiva il pulsante <b>Progettazione Multinotte</b><br><br>Per ogni filtro puoi impostare <b>Gain, Offset, Binning</b> e frequenza di <b>Dithering</b> in modo indipendente. Il file JSON generato è pronto per N.I.N.A. Advanced Sequencer.";
        i18n.en.info_pro_seq = "<b>PRO Sequence Builder</b><br><br>Here you are in full control. Enter for each filter the exact number of frames and exposure time for your final project.<br><br>The <b>fill bar</b> compares total pose time against the available night window:<br>🟢 Green: everything fits in one night<br>🟡 Orange: tight margin<br>🔴 Red: overflow → the <b>Multi-Night</b> button activates<br><br>Each filter has independent <b>Gain, Offset, Binning</b> and <b>Dithering</b> frequency settings. The JSON file is ready to import into N.I.N.A. Advanced Sequencer.";
        i18n.es.info_pro_seq = "<b>Constructor de Secuencia PRO</b><br><br>Aquí decides tú. Introduce para cada filtro el número exacto de poses y el tiempo de exposición de tu proyecto final.<br><br>La <b>barra de relleno</b> compara el tiempo total con la ventana nocturna disponible:<br>🟢 Verde: todo cabe en una noche<br>🟡 Naranja: margen ajustado<br>🔴 Rojo: desbordamiento → se activa el botón <b>Multi-Noche</b><br><br>Cada filtro tiene <b>Gain, Offset, Binning</b> y frecuencia de <b>Dithering</b> independientes. El JSON se importa directamente en N.I.N.A. Advanced Sequencer.";
        i18n.zh.info_pro_seq = "<b>PRO 序列构建器</b><br><br>这里由您全权决定。为每个滤镜输入最终项目所需的精确帧数和曝光时间。<br><br><b>填充进度条</b>将总曝光时间与可用夜间窗口比较：<br>🟢 绿色：一夜内可完成<br>🟡 橙色：时间紧张<br>🔴 红色：超出 → 激活<b>多夜拍摄</b>按钮<br><br>每个滤镜可独立设置 <b>Gain、Offset、Binning</b> 和 <b>Dithering</b> 频率。生成的 JSON 可直接导入 N.I.N.A. 高级序列器。";

        // ── TOOLTIP: Progettazione Multinotte ────────────────────────────────
        i18n.it.info_multinight = "<b>Progettazione Multinotte</b><br><br>Quando le pose decise superano il tempo disponibile in una singola notte, questo strumento le distribuisce su più sessioni.<br><br>In cima trovi il <b>TPT</b> (Tempo Totale Pianificato): l'obiettivo fisso del tuo progetto, calcolato dalla griglia PRO. La barra di progresso diventa verde solo quando la somma delle notti raggiunge il TPT.<br><br>Per ogni notte puoi:<br>• Impostare orario di inizio e fine<br>• Decidere quante pose fare per filtro<br>• Verificare che le pose entrino nella finestra notturna<br>• Esportare un file N.I.N.A. dedicato a quella singola notte<br><br>Aggiungi notti finché il <b>Tempo Pianificato</b> raggiunge il TPT.";
        i18n.en.info_multinight = "<b>Multi-Night Planning</b><br><br>When your planned frames exceed a single night's time, this tool distributes them across multiple sessions.<br><br>At the top you find the <b>TPT</b> (Total Planned Time): the fixed goal of your project, calculated from the PRO grid. The progress bar turns green only when the sum of all nights reaches the TPT.<br><br>For each night you can:<br>• Set start and end times<br>• Decide how many frames per filter<br>• Check if frames fit in the night window<br>• Export a dedicated N.I.N.A. file for that night<br><br>Add nights until <b>Planned Time</b> reaches the TPT.";
        i18n.es.info_multinight = "<b>Planificación Multi-Noche</b><br><br>Cuando las poses superan el tiempo disponible en una sola noche, esta herramienta las distribuye en varias sesiones.<br><br>En la parte superior está el <b>TPT</b> (Tiempo Total Planificado): el objetivo fijo de tu proyecto, calculado desde la cuadrícula PRO. La barra de progreso se vuelve verde solo cuando la suma de las noches alcanza el TPT.<br><br>Para cada noche puedes:<br>• Establecer hora de inicio y fin<br>• Decidir cuántas poses por filtro<br>• Verificar si las poses caben en la ventana nocturna<br>• Exportar un archivo N.I.N.A. dedicado a esa noche<br><br>Añade noches hasta que el <b>Tiempo Planificado</b> alcance el TPT.";
        i18n.zh.info_multinight = "<b>多夜拍摄规划</b><br><br>当计划帧数超出单夜时间时，此工具将其分配到多个拍摄夜晚。<br><br>顶部显示 <b>TPT</b>（总计划时间）：您项目的固定目标，由 PRO 网格计算得出。只有当所有夜晚总和达到 TPT 时，进度条才变绿。<br><br>每个夜晚可以：<br>• 设置开始和结束时间<br>• 决定每个滤镜的拍摄帧数<br>• 检查帧数是否能在夜间窗口内完成<br>• 导出该夜专属的 N.I.N.A. 文件<br><br>持续添加夜晚直到<b>已计划时间</b>达到 TPT。";

        // Iniezione traduzioni per il bottone Salva
        i18n.it.save_btn = "Salva";
        i18n.en.save_btn = "Save";
        i18n.es.save_btn = "Guardar";
        i18n.zh.save_btn = "保存";
        i18n.it.aperture = "Diametro (mm):";
        i18n.en.aperture = "Aperture (mm):";
        i18n.es.aperture = "Diámetro (mm):";
        i18n.zh.aperture = "口径 (mm):";

        i18n.it.asiair_close = "Chiudi e Vai al Telescopio";
        i18n.en.asiair_close = "Close and Go to Mount";
        i18n.es.asiair_close = "Cerrar e Ir al Telescopio";
        i18n.zh.asiair_close = "关闭并开始拍摄";
        i18n.it.export_asiair = "Esporta per ZWO ASIAIR";
        i18n.en.export_asiair = "Export ZWO ASIAIR";
        i18n.es.export_asiair = "Exportar ZWO ASIAIR";
        i18n.zh.export_asiair = "导出 ZWO ASIAIR";
        i18n.it.info_strat_analysis = "L'analisi è generata da un algoritmo matematico che combina più fattori: tipologia del bersaglio (ogni categoria ha un tempo base calibrato), magnitudine superficiale, rapporto focale dello strumento, inquinamento lunare, caratteristiche del sensore e — dalla v5.9.3 — l'indice di Bortle del sito. I cieli bui (Bortle 1–4) riducono il tempo stimato; i cieli urbani (Bortle 6–9) lo aumentano progressivamente. Per nebulose a emissione con filtri narrowband attivi la penalità è attenuata. Quando la combinazione di fattori porta a stime irragionevoli, il sistema sconsiglia l'integrazione e suggerisce alternative.";
        i18n.en.info_strat_analysis = "The analysis is generated by a mathematical algorithm combining multiple factors: target type (each category has a calibrated base time), surface brightness, instrument focal ratio, lunar pollution, sensor characteristics and — from v5.9.3 — the site's Bortle index. Dark skies (Bortle 1–4) reduce the estimated time; urban skies (Bortle 6–9) progressively increase it. For emission nebulae with narrowband filters active, the penalty is reduced. When the combination of factors leads to unreasonable estimates, the system advises against imaging and suggests alternatives.";
        i18n.es.info_strat_analysis = "El análisis es generado por un algoritmo matemático que combina varios factores: tipo de objetivo (cada categoría tiene un tiempo base calibrado), brillo superficial, relación focal del instrumento, contaminación lunar, características del sensor y — desde la v5.9.3 — el índice Bortle del sitio. Los cielos oscuros (Bortle 1–4) reducen el tiempo estimado; los cielos urbanos (Bortle 6–9) lo aumentan progresivamente. Para nebulosas de emisión con filtros narrowband activos, la penalización se reduce. Cuando la combinación de factores lleva a estimaciones irrazonables, el sistema desaconseja y sugiere alternativas.";
        i18n.zh.info_strat_analysis = "该分析由数学算法生成，综合多个因素：目标类型（每个类别有校准的基础时间）、表面亮度、仪器焦比、月光污染、传感器特性，以及——从v5.9.3起——观测地点的博特尔指数。暗天空（博特尔1–4）减少估计时间；城市天空（博特尔6–9）逐步增加。对于使用窄带滤镜的发射星云，惩罚有所减轻。当多重因素叠加导致估计时间不合理时，系统会建议放弃并推荐替代方案。";
        i18n.it.rotation = "Rotazione:";
        i18n.en.rotation = "Rotation (PA):";
        i18n.es.rotation = "Rotación (PA):";
        i18n.zh.rotation = "相机旋转 (PA):";
        i18n.it.pixel_size = "Pixel (µm):";
        i18n.en.pixel_size = "Pixel (µm):";
        i18n.es.pixel_size = "Pixel (µm):";
        i18n.zh.pixel_size = "像素 (µm):";

        i18n.it.sampling_scale = "Scala di Campionamento";
        i18n.en.sampling_scale = "Image Scale (Sampling)";
        i18n.es.sampling_scale = "Escala de Muestreo";
        i18n.zh.sampling_scale = "采样率 (Image Scale)";

        i18n.it.oversampled = "Sovracampionato (Luce dispersa, minor SNR)";
        i18n.en.oversampled = "Oversampled (Light spread, lower SNR)";
        i18n.es.oversampled = "Sobremuestreado (Pérdida de luz/SNR)";
        i18n.zh.oversampled = "过采样 (星点模糊, 信噪比低)";

        i18n.it.ideal_sampling = "Campionamento Ideale";
        i18n.en.ideal_sampling = "Ideal Sampling";
        i18n.es.ideal_sampling = "Muestreo Ideal";
        i18n.zh.ideal_sampling = "理想采样";

        i18n.it.undersampled = "Sottocampionato (Stelle squadrate)";
        i18n.en.undersampled = "Undersampled (Blocky stars)";
        i18n.es.undersampled = "Submuestreado (Estrellas cuadradas)";
        i18n.zh.undersampled = "欠采样 (星点呈方形)";
        i18n.it.rotate_target = "Ruota Camera (Rotatore Auto)";
        i18n.en.rotate_target = "Rotate Camera (Auto Rotator)";
        i18n.es.rotate_target = "Rotar Cámara (Rotador Auto)";
        i18n.zh.rotate_target = "旋转相机 (自动旋转器)";

        

        i18n.it.fov_center_title = "Centro FOV";
        i18n.en.fov_center_title = "FOV Center";
        i18n.es.fov_center_title = "Centro FOV";
        i18n.zh.fov_center_title = "视场中心";

        i18n.it.fov_ra_label = "AR:";
        i18n.en.fov_ra_label = "RA:";
        i18n.es.fov_ra_label = "AR:";
        i18n.zh.fov_ra_label = "赤经:";

        i18n.it.fov_dec_label = "Dec:";
        i18n.en.fov_dec_label = "Dec:";
        i18n.es.fov_dec_label = "Dec:";
        i18n.zh.fov_dec_label = "赤纬:";

        i18n.it.fov_reset_btn = "⌖ Reset";
        i18n.en.fov_reset_btn = "⌖ Reset";
        i18n.es.fov_reset_btn = "⌖ Restablecer";
        i18n.zh.fov_reset_btn = "⌖ 重置";

        i18n.it.fov_reset_title = "Riporta FOV al centro del target";
        i18n.en.fov_reset_title = "Reset FOV to target center";
        i18n.es.fov_reset_title = "Restablecer FOV al centro del objetivo";
        i18n.zh.fov_reset_title = "将视场重置为目标中心";

        i18n.it.meridian_flip_time = "Meridian Flip";
        i18n.en.meridian_flip_time = "Meridian Flip";
        i18n.es.meridian_flip_time = "Meridian Flip";
        i18n.zh.meridian_flip_time = "子午翻转";

        i18n.it.meridian_flip_outside = "Fuori notte";
        i18n.en.meridian_flip_outside = "Outside night";
        i18n.es.meridian_flip_outside = "Fuera de noche";
        i18n.zh.meridian_flip_outside = "夜外";

        i18n.it.meridian_flip_warn = "Il Meridian Flip cade dentro la sessione pianificata! Considera di spezzare la sequenza in due blocchi.";
        i18n.en.meridian_flip_warn = "Meridian Flip falls within the planned session! Consider splitting the sequence into two blocks.";
        i18n.es.meridian_flip_warn = "El Meridian Flip ocurre durante la sesión planificada. Considera dividir la secuencia en dos bloques.";
        i18n.zh.meridian_flip_warn = "子午翻转发生在计划拍摄时间段内！建议将序列分为两段。";

        i18n.it.meridian_flip_ok = "Il Meridian Flip non interferisce con la sessione pianificata.";
        i18n.en.meridian_flip_ok = "Meridian Flip does not interfere with the planned session.";
        i18n.es.meridian_flip_ok = "El Meridian Flip no interfiere con la sesión planificada.";
        i18n.zh.meridian_flip_ok = "子午翻转不影响计划的拍摄时间段。";

        i18n.it.mixed_filter_title = "Mix LRGB + Banda Stretta";
        i18n.en.mixed_filter_title = "LRGB + Narrowband Mix";
        i18n.es.mixed_filter_title = "Mezcla LRGB + Banda Estrecha";
        i18n.zh.mixed_filter_title = "LRGB + 窄带混合";

        i18n.it.mixed_filter_warn = "Hai selezionato filtri broadband <strong>(L, R, G, B)</strong> e narrowband <strong>(Ha, OIII, SII)</strong> nella stessa sessione.<br><br>Combinare le due modalità in una sola notte non è ottimale: i filtri broadband richiedono esposizioni brevi e cieli non necessariamente bui, mentre i narrowband richiedono esposizioni molto più lunghe e condizioni di seeing stabili.<br><br>La sequenza è stata comunque calcolata con rapporto <strong>L = Ha = OIII = SII</strong> e <strong>R = G = B = L/3</strong>.<br><br>💡 Per un risultato professionale valuta di usare il <strong>Pianificatore Multi-Notte</strong> o il <strong>Calcolatore PRO</strong> per dedicare notti separate alle due modalità.";
        i18n.en.mixed_filter_warn = "You selected both broadband <strong>(L, R, G, B)</strong> and narrowband <strong>(Ha, OIII, SII)</strong> filters in the same session.<br><br>Mixing the two modes in a single night is not ideal: broadband filters require shorter exposures and don't need perfectly dark skies, while narrowband filters need much longer exposures and stable seeing.<br><br>The sequence was calculated with ratio <strong>L = Ha = OIII = SII</strong> and <strong>R = G = B = L/3</strong>.<br><br>💡 For best results, consider the <strong>Multi-Night Planner</strong> or <strong>PRO Calculator</strong> to dedicate separate nights to each mode.";
        i18n.es.mixed_filter_warn = "Has seleccionado filtros de banda ancha <strong>(L, R, G, B)</strong> y banda estrecha <strong>(Ha, OIII, SII)</strong> en la misma sesión.<br><br>Combinar ambos modos en una sola noche no es óptimo. La secuencia fue calculada con ratio <strong>L = Ha = OIII = SII</strong> y <strong>R = G = B = L/3</strong>.<br><br>💡 Considera usar el <strong>Planificador Multi-Noche</strong> o la <strong>Calculadora PRO</strong> para noches separadas.";
        i18n.zh.mixed_filter_warn = "你同时选择了宽带滤镜 <strong>(L, R, G, B)</strong> 和窄带滤镜 <strong>(Ha, OIII, SII)</strong>。<br><br>在同一晚上混合使用两种模式并不理想。序列按 <strong>L = Ha = OIII = SII</strong>，<strong>R = G = B = L/3</strong> 的比例计算。<br><br>💡 建议使用<strong>多夜计划器</strong>或 <strong>PRO计算器</strong>分别安排不同夜晚。";

        i18n.it.mixed_filter_close = "OK, prosegui comunque";
        i18n.en.mixed_filter_close = "OK, proceed anyway";
        i18n.es.mixed_filter_close = "OK, continuar de todas formas";
        i18n.zh.mixed_filter_close = "好的，继续";

        i18n.it.overhead_col_tip  = "Il tempo per ogni riga include l'overhead tecnico per frame: readout sensore + download USB + salvataggio FITS su disco (~1.2s + 0.08s/MP). I Bias hanno exp=0 ma richiedono comunque questo overhead. Il dither viene aggiunto separatamente in base alla frequenza impostata per ogni filtro.";
        i18n.en.overhead_col_tip  = "Time per row includes per-frame technical overhead: sensor readout + USB download + FITS save to disk (~1.2s + 0.08s/MP). Bias frames have exp=0 but still require this overhead. Dithering is added separately based on the frequency set for each filter.";
        i18n.es.overhead_col_tip  = "El tiempo por fila incluye la sobrecarga técnica por fotograma: lectura del sensor + descarga USB + guardado FITS en disco (~1.2s + 0.08s/MP). Los Bias tienen exp=0 pero requieren igualmente este overhead. El dithering se añade por separado según la frecuencia de cada filtro.";
        i18n.zh.overhead_col_tip  = "每行时间包含每帧技术开销：传感器读出 + USB传输 + FITS保存至磁盘（约1.2秒 + 0.08秒/百万像素）。偏置帧曝光=0但仍需此开销。抖动时间根据每个滤镜的频率单独计算。";

        i18n.it.bias_overhead_tip = "Tempo tecnico stimato per frame (readout sensore + salvataggio FITS). I Bias hanno exp=0 ma richiedono comunque questo overhead per file.";
        i18n.en.bias_overhead_tip = "Estimated technical overhead per frame (sensor readout + FITS save). Bias frames have exp=0 but still require this per-frame overhead.";
        i18n.es.bias_overhead_tip = "Sobrecarga técnica estimada por fotograma (lectura del sensor + guardado FITS). Los Bias tienen exp=0 pero requieren este tiempo.";
        i18n.zh.bias_overhead_tip = "每帧预估技术开销（传感器读出 + FITS保存）。偏置帧曝光=0，但每帧仍需此时间开销。";

        i18n.it.light_overhead_tip = "Il tempo visualizzato include l'overhead tecnico per frame: readout sensore + download USB + salvataggio FITS su disco. Stimato ~1.2s + 0.08s/MP (es. ~3s @ 20MP, ~5s @ 45MP FF). Viene sottratto dal budget disponibile per garantire che la sessione non sfori mai.";
        i18n.en.light_overhead_tip = "The displayed time includes per-frame technical overhead: sensor readout + USB download + FITS save to disk. Estimated ~1.2s + 0.08s/MP (e.g. ~3s @ 20MP, ~5s @ 45MP FF). It is subtracted from the available budget to ensure the session never runs over.";
        i18n.es.light_overhead_tip = "El tiempo mostrado incluye la sobrecarga técnica por fotograma: lectura del sensor + descarga USB + guardado FITS en disco. Estimado ~1.2s + 0.08s/MP (p.ej. ~3s @ 20MP, ~5s @ 45MP FF). Se descuenta del presupuesto disponible para garantizar que la sesión no se exceda.";
        i18n.zh.light_overhead_tip = "显示时间包含每帧技术开销：传感器读出 + USB传输 + FITS保存至磁盘。估算约1.2秒 + 0.08秒/百万像素（如20MP约3秒，45MP全画幅约5秒）。已从可用预算中扣除，确保拍摄时间不会超出。";

        i18n.it.acc_none           = "Nessun accessorio";
        i18n.en.acc_none           = "No accessory";
        i18n.es.acc_none           = "Sin accesorio";
        i18n.zh.acc_none           = "无配件";

        i18n.it.acc_active         = "attivo";
        i18n.en.acc_active         = "active";
        i18n.es.acc_active         = "activo";
        i18n.zh.acc_active         = "已启用";

        i18n.it.acc_modal_title    = "Accessorio Ottico";
        i18n.en.acc_modal_title    = "Optical Accessory";
        i18n.es.acc_modal_title    = "Accesorio Óptico";
        i18n.zh.acc_modal_title    = "光学附件";

        i18n.it.acc_select_label   = "Seleziona accessorio";
        i18n.en.acc_select_label   = "Select accessory";
        i18n.es.acc_select_label   = "Selecciona accesorio";
        i18n.zh.acc_select_label   = "选择配件";

        i18n.it.acc_custom         = "Valore personalizzato…";
        i18n.en.acc_custom         = "Custom value…";
        i18n.es.acc_custom         = "Valor personalizado…";
        i18n.zh.acc_custom         = "自定义值…";

        i18n.it.acc_custom_label   = "Fattore (es. 0.85):";
        i18n.en.acc_custom_label   = "Factor (e.g. 0.85):";
        i18n.es.acc_custom_label   = "Factor (p.ej. 0.85):";
        i18n.zh.acc_custom_label   = "倍率（如 0.85）：";

        i18n.it.acc_confirm        = "Applica";
        i18n.en.acc_confirm        = "Apply";
        i18n.es.acc_confirm        = "Aplicar";
        i18n.zh.acc_confirm        = "应用";

        i18n.it.acc_info_tip       = "Il fattore accessorio modifica focale effettiva e f/ratio. Barlow 2× su f/8 → f/16 (4× più lento, tempi di posa quadruplicati). Riduttore 0.8× su f/8 → f/6.4 (più luminoso, campo più ampio). Tutti i calcoli di FOV, campionamento e Smart usano la focale risultante.";
        i18n.en.acc_info_tip       = "The accessory factor modifies the effective focal length and f/ratio. Barlow 2× on f/8 → f/16 (4× slower, exposure times quadrupled). Reducer 0.8× on f/8 → f/6.4 (brighter, wider field). All FOV, sampling and Smart calculations use the resulting focal length.";
        i18n.es.acc_info_tip       = "El factor del accesorio modifica la focal efectiva y el f/ratio. Barlow 2× en f/8 → f/16 (4× más lento, tiempos cuadruplicados). Reductor 0.8× en f/8 → f/6.4 (más luminoso, campo más amplio). Todos los cálculos de FOV, muestreo y Smart usan la focal resultante.";
        i18n.zh.acc_info_tip       = "附件倍率改变有效焦距和f值。2×巴罗镜用于f/8 → f/16（速度慢4倍，曝光时间变为4倍）。0.8×减焦镜用于f/8 → f/6.4（更亮，视场更宽）。所有FOV、采样和智能计算均使用最终焦距。";

        i18n.it.acc_info_body      = "Il fattore modifica la focale effettiva: <b>Barlow</b> moltiplica (es. 2× raddoppia la focale, dimezza il FOV), <b>Riduttore</b> riduce (es. 0.8× accorcia focale e f/ratio, allargando il campo). Tutti i calcoli di FOV, campionamento e tempi di posa usano la focale risultante.";
        i18n.en.acc_info_body      = "The factor modifies the effective focal length: a <b>Barlow</b> multiplies it (e.g. 2× doubles focal length, halves FOV), a <b>Reducer</b> shortens it (e.g. 0.8× reduces focal length and f/ratio, widening the field). All FOV, sampling and exposure time calculations use the resulting focal length.";
        i18n.es.acc_info_body      = "El factor modifica la focal efectiva: la <b>Barlow</b> la multiplica (p.ej. 2× dobla la focal, reduce el campo a la mitad), el <b>Reductor</b> la acorta (p.ej. 0.8× reduce focal y f/ratio, ampliando el campo). Todos los cálculos de FOV, muestreo y tiempos de pose usan la focal resultante.";
        i18n.zh.acc_info_body      = "该倍率修改有效焦距：<b>巴罗镜</b>增大焦距（如2×使焦距加倍，视场减半），<b>减焦镜</b>缩短焦距（如0.8×缩短焦距和f值，扩大视场）。所有FOV、采样和曝光时间计算均使用最终焦距。";

        i18n.it.acc_group_reducer  = "Riduttore di focale";
        i18n.en.acc_group_reducer  = "Focal reducer";
        i18n.es.acc_group_reducer  = "Reductor de focal";
        i18n.zh.acc_group_reducer  = "减焦镜";

        i18n.it.acc_reducer        = "Riduttore";
        i18n.en.acc_reducer        = "Reducer";
        i18n.es.acc_reducer        = "Reductor";
        i18n.zh.acc_reducer        = "减焦镜";

        i18n.it.gps_btn_label      = "Posizione attuale";
        i18n.en.gps_btn_label      = "Current location";
        i18n.es.gps_btn_label      = "Ubicación actual";
        i18n.zh.gps_btn_label      = "当前位置";

        i18n.it.gps_btn_tip        = "Usa la posizione GPS del dispositivo";
        i18n.en.gps_btn_tip        = "Use the device GPS position";
        i18n.es.gps_btn_tip        = "Usar la posición GPS del dispositivo";
        i18n.zh.gps_btn_tip        = "使用设备GPS位置";

        i18n.it.gps_not_supported  = "La geolocalizzazione non è supportata da questo browser.";
        i18n.en.gps_not_supported  = "Geolocation is not supported by this browser.";
        i18n.es.gps_not_supported  = "La geolocalización no está soportada por este navegador.";
        i18n.zh.gps_not_supported  = "此浏览器不支持地理定位。";

        i18n.it.gps_denied         = "Accesso alla posizione negato. Cerca il luogo manualmente.";
        i18n.en.gps_denied         = "Location access denied. Search manually.";
        i18n.es.gps_denied         = "Acceso a la ubicación denegado. Busca manualmente.";
        i18n.zh.gps_denied         = "位置访问被拒绝。请手动搜索。";

        // ── Bortle conferma UI ────────────────────────────────────────────
        i18n.it.bortle_confirm_btn        = "Conferma";
        i18n.en.bortle_confirm_btn        = "Confirm";
        i18n.es.bortle_confirm_btn        = "Confirmar";
        i18n.zh.bortle_confirm_btn        = "确认";

        i18n.it.bortle_confirmed_ok       = "Confermato ✓";
        i18n.en.bortle_confirmed_ok       = "Confirmed ✓";
        i18n.es.bortle_confirmed_ok       = "Confirmado ✓";
        i18n.zh.bortle_confirmed_ok       = "已确认 ✓";

        i18n.it.bortle_unconfirmed_banner = "Indice Bortle non confermato per la tua zona — i calcoli di esposizione potrebbero essere imprecisi.";
        i18n.en.bortle_unconfirmed_banner = "Bortle index not confirmed for your location — exposure calculations may be inaccurate.";
        i18n.es.bortle_unconfirmed_banner = "Índice Bortle no confirmado para tu zona — los cálculos de exposición pueden ser imprecisos.";
        i18n.zh.bortle_unconfirmed_banner = "您所在区域的博特尔指数未确认 — 曝光计算可能不准确。";

        i18n.it.bortle_goto_btn           = "Vai al Bortle";
        i18n.en.bortle_goto_btn           = "Go to Bortle";
        i18n.es.bortle_goto_btn           = "Ir al Bortle";
        i18n.zh.bortle_goto_btn           = "前往博特尔";

        i18n.it.bortle_popup_title        = "Indice Bortle non confermato";
        i18n.en.bortle_popup_title        = "Bortle index not confirmed";
        i18n.es.bortle_popup_title        = "Índice Bortle no confirmado";
        i18n.zh.bortle_popup_title        = "博特尔指数未确认";

        i18n.it.bortle_popup_desc         = "Il Bortle influenza direttamente i calcoli di esposizione. Conferma o modifica il valore rilevato per la tua posizione prima di procedere con l'analisi.";
        i18n.en.bortle_popup_desc         = "The Bortle index directly affects exposure calculations. Confirm or adjust the detected value for your location before proceeding with the analysis.";
        i18n.es.bortle_popup_desc         = "El índice Bortle afecta directamente los cálculos de exposición. Confirma o ajusta el valor detectado para tu posición antes de continuar con el análisis.";
        i18n.zh.bortle_popup_desc         = "博特尔指数直接影响曝光计算。在进行分析之前，请确认或调整您所在位置的检测值。";

        i18n.it.bortle_popup_skip         = "Ignora per ora";
        i18n.en.bortle_popup_skip         = "Ignore for now";
        i18n.es.bortle_popup_skip         = "Ignorar por ahora";
        i18n.zh.bortle_popup_skip         = "暂时忽略";

        i18n.it.bortle_status_confirmed   = "Bortle confermato ✓";
        i18n.en.bortle_status_confirmed   = "Bortle confirmed ✓";
        i18n.es.bortle_status_confirmed   = "Bortle confirmado ✓";
        i18n.zh.bortle_status_confirmed   = "博特尔值已确认 ✓";

        i18n.it.bortle_status_unconfirmed = "Conferma il valore dell'indice Bortle per questa posizione";
        i18n.en.bortle_status_unconfirmed = "Confirm the Bortle index value for this location";
        i18n.es.bortle_status_unconfirmed = "Confirma el valor del índice Bortle para esta ubicación";
        i18n.zh.bortle_status_unconfirmed = "请确认此位置的博特尔指数值";

        i18n.it.gps_locating = "Rilevamento posizione in corso…";
        i18n.en.gps_locating = "Detecting location…";
        i18n.es.gps_locating = "Detectando ubicación…";
        i18n.zh.gps_locating = "正在检测位置…";

        // ── Legenda LP Lorenz — tooltip per zona ──────────────────────────
        i18n.it.lp_tap_hint = "tocca per info";
        i18n.en.lp_tap_hint = "tap for info";
        i18n.es.lp_tap_hint = "toca para info";
        i18n.zh.lp_tap_hint = "点击查看";

        i18n.it.lp_z0  = "<b>Zona 0</b> — Bortle ~1<br>SQM &gt;22.00 mag/arcsec²<br>Cielo pristino teorico. Luminosità artificiale quasi nulla, limitata solo dall'airglow e dalla luce zodiacale.";
        i18n.it.lp_z1a = "<b>Zona 1a</b> — Bortle ~2<br>SQM 21.93–21.99<br>Gegenschein visibile. Via Lattea così brillante da proiettare ombre su oggetti bianchi.";
        i18n.it.lp_z1b = "<b>Zona 1b</b> — Bortle ~2<br>SQM 21.89–21.93<br>Le nuvole appaiono come buchi neri nel cielo. Nessuna cupola di luce all'orizzonte.";
        i18n.it.lp_z2a = "<b>Zona 2a</b> — Bortle ~3<br>SQM 21.81–21.89<br>Cielo rurale tipico. Il cielo è affollato di stelle fino all'orizzonte. M33 visibile ad occhio nudo.";
        i18n.it.lp_z2b = "<b>Zona 2b</b> — Bortle ~3<br>SQM 21.69–21.81<br>Lievi cupole di luce (10–15°) all'orizzonte. Via Lattea mostra il rigonfiamento verso l'Ofiuco.";
        i18n.it.lp_z3a = "<b>Zona 3a</b> — Bortle ~4<br>SQM 21.51–21.69<br>Transizione rurale. Bagliore visibile verso almeno una città. Le nuvole sono chiare vicino al bagliore.";
        i18n.it.lp_z3b = "<b>Zona 3b</b> — Bortle ~4<br>SQM 21.25–21.51<br>Luce zodiacale visibile nelle notti migliori. Via Lattea mostra struttura delle corsie oscure.";
        i18n.it.lp_z4a = "<b>Zona 4a</b> — Bortle ~4.5<br>SQM 20.91–21.25<br>Via Lattea brillante allo zenit ma invisibile all'orizzonte. Cupole di luce fino a 45°. M33 difficile.";
        i18n.it.lp_z4b = "<b>Zona 4b</b> — Bortle ~4.5<br>SQM 20.49–20.91<br>Via Lattea lavata allo zenit, invisibile all'orizzonte. Molte cupole di luce. M31 facilmente visibile.";
        i18n.it.lp_z5a = "<b>Zona 5a</b> — Bortle ~5<br>SQM 20.02–20.49<br>Cielo suburbano. Via Lattea tenue solo allo zenit. Le nuvole sono più luminose del cielo. Mag. limite ~5.6.";
        i18n.it.lp_z5b = "<b>Zona 5b</b> — Bortle ~5<br>SQM 19.50–20.02<br>Cielo suburbano chiaro. Via Lattea appena percettibile. Il cielo appare grigio e scolorito verso le città.";
        i18n.it.lp_z6a = "<b>Zona 6a</b> — Bortle ~6<br>SQM 18.95–19.50<br>Periferia urbana. Via Lattea marginale solo allo zenit. Il cielo è grigio fino a 35°. Mag. limite 5.0–5.5.";
        i18n.it.lp_z6b = "<b>Zona 6b</b> — Bortle ~7<br>SQM 18.38–18.95<br>Cielo urbano. Costellazioni familiari con stelle mancanti. Meno di 20 stelle sopra i 30°.";
        i18n.it.lp_z7a = "<b>Zona 7a</b> — Bortle ~8<br>SQM 17.80–18.38<br>Centro urbano. Il cielo è grigio o più chiaro ovunque. L'imaging CCD è ancora possibile. Mag. limite 3–4.";
        i18n.it.lp_z7b = "<b>Zona 7b</b> — Bortle ~9<br>SQM &lt;17.80<br>Centro città. Le stelle sono deboli e sbiadite, ridotte a poche centinaia. Il cielo è luminoso e scolorito.";

        // Copia EN/ES/ZH come fallback IT per ora (da tradurre)
        ["lp_z0","lp_z1a","lp_z1b","lp_z2a","lp_z2b","lp_z3a","lp_z3b","lp_z4a","lp_z4b","lp_z5a","lp_z5b","lp_z6a","lp_z6b","lp_z7a","lp_z7b"].forEach(k => {
            i18n.en[k] = i18n.it[k];
            i18n.es[k] = i18n.it[k];
            i18n.zh[k] = i18n.it[k];
        });

        // ── Tooltip chip Bortle 1-9 (nuova legenda) ──────────────────────
        i18n.it.lp_b1 = "<b>Bortle 1</b> — Cielo pristino<br>SQM &gt;22.00 mag/arcsec²<br>Luminosità artificiale quasi nulla. Gegenschein visibile, Via Lattea proietta ombre. Cielo ideale per qualsiasi target.";
        i18n.it.lp_b2 = "<b>Bortle 2</b> — Cielo molto buio<br>SQM 21.89–21.99<br>Nessuna cupola di luce. Le nuvole appaiono come buchi neri nel cielo. Ottimo per oggetti deboli.";
        i18n.it.lp_b3 = "<b>Bortle 3</b> — Cielo rurale<br>SQM 21.69–21.89 (zone 2a/2b)<br>Lievi cupole di luce all'orizzonte. M33 visibile ad occhio nudo. Eccellente per l'astrofotografia.";
        i18n.it.lp_b4 = "<b>Bortle 4</b> — Transizione rurale<br>SQM 21.25–21.69 (zone 3a/3b)<br>Bagliore visibile verso una o più città. Via Lattea mostra struttura delle corsie oscure.";
        i18n.it.lp_b5 = "<b>Bortle 5</b> — Cielo suburbano<br>SQM 19.50–21.25 (zone 4a/4b)<br>Via Lattea tenue solo allo zenit. Molte cupole di luce. Filtri broadband consigliati.";
        i18n.it.lp_b6 = "<b>Bortle 6</b> — Periferia urbana<br>SQM 19.50–20.02 (zona 5b)<br>Via Lattea marginale. Il cielo appare grigio fino a 35°. Filtri narrowband raccomandati.";
        i18n.it.lp_b7 = "<b>Bortle 7</b> — Cielo urbano<br>SQM 18.38–18.95 (zona 6b)<br>Via Lattea assente. Costellazioni con stelle mancanti. Solo narrowband.";
        i18n.it.lp_b8 = "<b>Bortle 8</b> — Centro urbano<br>SQM 17.80–18.38 (zona 7a)<br>Il cielo è grigio ovunque. Imaging possibile solo con filtri Ha/OIII.";
        i18n.it.lp_b9 = "<b>Bortle 9</b> — Centro città<br>SQM &lt;17.80 (zona 7b)<br>Cielo luminoso e scolorito. Solo luna, pianeti e stelle doppie senza filtri.";

        i18n.en.lp_b1 = "<b>Bortle 1</b> — Pristine sky<br>SQM &gt;22.00 mag/arcsec²<br>Virtually no artificial light. Gegenschein visible, Milky Way casts shadows. Ideal for any target.";
        i18n.en.lp_b2 = "<b>Bortle 2</b> — Very dark sky<br>SQM 21.89–21.99<br>No light domes. Clouds appear as black holes in the sky. Excellent for faint objects.";
        i18n.en.lp_b3 = "<b>Bortle 3</b> — Rural sky<br>SQM 21.69–21.89 (zones 2a/2b)<br>Slight light domes on horizon. M33 naked-eye visible. Excellent for astrophotography.";
        i18n.en.lp_b4 = "<b>Bortle 4</b> — Rural transition<br>SQM 21.25–21.69 (zones 3a/3b)<br>Glow visible toward one or more cities. Milky Way shows dark lane structure.";
        i18n.en.lp_b5 = "<b>Bortle 5</b> — Suburban sky<br>SQM 19.50–21.25 (zones 4a/4b)<br>Milky Way faint only at zenith. Many light domes. Broadband filters recommended.";
        i18n.en.lp_b6 = "<b>Bortle 6</b> — Urban fringe<br>SQM 19.50–20.02 (zone 5b)<br>Milky Way marginal. Sky appears grey up to 35°. Narrowband filters recommended.";
        i18n.en.lp_b7 = "<b>Bortle 7</b> — Urban sky<br>SQM 18.38–18.95 (zone 6b)<br>No Milky Way. Familiar constellations missing stars. Narrowband only.";
        i18n.en.lp_b8 = "<b>Bortle 8</b> — Urban center<br>SQM 17.80–18.38 (zone 7a)<br>Sky is grey everywhere. Imaging possible only with Ha/OIII filters.";
        i18n.en.lp_b9 = "<b>Bortle 9</b> — City center<br>SQM &lt;17.80 (zone 7b)<br>Bright discoloured sky. Only moon, planets and double stars without filters.";

        i18n.es.lp_b1 = "<b>Bortle 1</b> — Cielo prístino<br>SQM &gt;22.00 mag/arcsec²<br>Luminosidad artificial casi nula. Gegenschein visible, la Vía Láctea proyecta sombras. Ideal para cualquier objetivo.";
        i18n.es.lp_b2 = "<b>Bortle 2</b> — Cielo muy oscuro<br>SQM 21.89–21.99<br>Sin cúpulas de luz. Las nubes aparecen como agujeros negros. Excelente para objetos débiles.";
        i18n.es.lp_b3 = "<b>Bortle 3</b> — Cielo rural<br>SQM 21.69–21.89 (zonas 2a/2b)<br>Leves cúpulas en el horizonte. M33 visible a simple vista. Excelente para astrofotografía.";
        i18n.es.lp_b4 = "<b>Bortle 4</b> — Transición rural<br>SQM 21.25–21.69 (zonas 3a/3b)<br>Resplandor visible hacia ciudades. La Vía Láctea muestra estructura de carriles oscuros.";
        i18n.es.lp_b5 = "<b>Bortle 5</b> — Cielo suburbano<br>SQM 19.50–21.25 (zonas 4a/4b)<br>Vía Láctea tenue solo en el cénit. Muchas cúpulas de luz. Filtros broadband recomendados.";
        i18n.es.lp_b6 = "<b>Bortle 6</b> — Periferia urbana<br>SQM 19.50–20.02 (zona 5b)<br>Vía Láctea marginal. El cielo aparece gris hasta 35°. Filtros narrowband recomendados.";
        i18n.es.lp_b7 = "<b>Bortle 7</b> — Cielo urbano<br>SQM 18.38–18.95 (zona 6b)<br>Sin Vía Láctea. Constelaciones con estrellas faltantes. Solo narrowband.";
        i18n.es.lp_b8 = "<b>Bortle 8</b> — Centro urbano<br>SQM 17.80–18.38 (zona 7a)<br>El cielo es gris en todas partes. Imaging solo con filtros Ha/OIII.";
        i18n.es.lp_b9 = "<b>Bortle 9</b> — Centro ciudad<br>SQM &lt;17.80 (zona 7b)<br>Cielo brillante y decolorado. Solo luna, planetas y estrellas dobles sin filtros.";

        i18n.zh.lp_b1 = "<b>博特勒1级</b> — 原始天空<br>SQM &gt;22.00 mag/arcsec²<br>几乎无人工光。对地光可见，銀河投影。适合任何目标。";
        i18n.zh.lp_b2 = "<b>博特勒2级</b> — 极暗天空<br>SQM 21.89–21.99<br>无光穹。云彩呈黑洞状。适合拍摄暗弱天体。";
        i18n.zh.lp_b3 = "<b>博特勒3级</b> — 农村天空<br>SQM 21.69–21.89ﾈ2a/2b区ﾉ<br>地平线有轻微光穹。M33肉眼可见。适合天文摄影。";
        i18n.zh.lp_b4 = "<b>博特勒4级</b> — 农村过渡<br>SQM 21.25–21.69ﾈ3a/3b区ﾉ<br>城市方向可见辉光。銀河显示暗带结构。";
        i18n.zh.lp_b5 = "<b>博特勒5级</b> — 郊区天空<br>SQM 19.50–21.25ﾈ4a/4b区ﾉ<br>銀河仅在天顶隐约可见。多个光穹。建议使用宿带滤镜。";
        i18n.zh.lp_b6 = "<b>博特勒6级</b> — 城市边缘<br>SQM 19.50–20.02ﾈ5b区ﾉ<br>銀河勉强可见。天空呈灰色至35°。建议窄带滤镜。";
        i18n.zh.lp_b7 = "<b>博特勒7级</b> — 城市天空<br>SQM 18.38–18.95ﾈ6b区ﾉ<br>无銀河。星座缺少暗星。仅限窄带摄影。";
        i18n.zh.lp_b8 = "<b>博特勒8级</b> — 城市中心<br>SQM 17.80–18.38ﾈ7a区ﾉ<br>天空处处灰暗。仅可用Ha/OIII滤镜拍摄。";
        i18n.zh.lp_b9 = "<b>博特勒9级</b> — 市中心<br>SQM &lt;17.80ﾈ7b区ﾉ<br>天空明亮变色。无滤镜仅可观测月球、行星和双星。";

        i18n.it.info_hdr_row = "La riga <b>Light HDR</b> serve per la strategia ad alto dinamismo: affianca alle pose lunghe un set di esposizioni brevi per catturare i dettagli nei nuclei sovraesposti (es. nebulose planetarie, ammassi globulari) senza saturarli.<br><br>Imposta <b>Pose</b> e <b>Secondi</b> liberamente — i lucchetti 🔒 proteggono i tuoi valori personalizzati quando clicchi su 'Genera Sequenza Ottimale'.<br><br>Le pose HDR vengono incluse nel calcolo dei tempi e nell'export N.I.N.A., dove appaiono come blocco separato con il suffisso <i>HDR</i>.";
        i18n.en.info_hdr_row = "The <b>Light HDR</b> row enables a high-dynamic-range strategy: it pairs short exposures alongside the main long ones to capture detail in overexposed cores (e.g. planetary nebulae, globular clusters) without saturation.<br><br>Set <b>Frames</b> and <b>Seconds</b> freely — the 🔒 locks protect your custom values when you click 'Generate Optimal Sequence'.<br><br>HDR frames are included in the time calculation and in the N.I.N.A. export, where they appear as a separate block with the <i>HDR</i> suffix.";
        i18n.es.info_hdr_row = "La fila <b>Light HDR</b> permite una estrategia de alto rango dinámico: complementa las exposiciones largas con exposiciones cortas para capturar detalles en núcleos sobreexpuestos (nebulosas planetarias, cúmulos globulares) sin saturarlos.<br><br>Ajusta <b>Poses</b> y <b>Segundos</b> libremente — los 🔒 protegen tus valores personalizados al hacer clic en 'Generar Secuencia Óptima'.<br><br>Las poses HDR se incluyen en el cálculo de tiempos y en el export N.I.N.A., donde aparecen como bloque separado con el sufijo <i>HDR</i>.";
        i18n.zh.info_hdr_row = "<b>Light HDR</b> 行用于高动态范围策略：将短曝光与主要长曝光配合使用，以捕捉过曝核心（如行星状星云、球状星团）的细节而不饱和。<br><br>自由设置<b>帧数</b>和<b>秒数</b> — 🔒 锁定键在点击'生成最优序列'时保护您的自定义值。<br><br>HDR 帧将计入时间计算，并在 N.I.N.A. 导出文件中以独立模块显示，后缀为 <i>HDR</i>。";

        i18n.it.rotate_hint = "Per una visualizzazione ottimale della griglia filtri, ruota il telefono in orizzontale.";
        i18n.en.rotate_hint = "For optimal filter grid display, rotate your phone to landscape.";
        i18n.es.rotate_hint = "Para una visualización óptima de la cuadrícula, gira el teléfono en horizontal.";
        i18n.zh.rotate_hint = "为了最佳滤镜网格显示效果，请将手机横向旋转。";

        i18n.it.bin_label = "BIN:";
        i18n.en.bin_label = "BIN:";
        i18n.es.bin_label = "BIN:";
        i18n.zh.bin_label = "像素合并:";

        i18n.it.report_pdf_btn    = "Esporta Report HTML";
        i18n.en.report_pdf_btn    = "Export HTML Report";
        i18n.es.report_pdf_btn    = "Exportar Informe HTML";
        i18n.zh.report_pdf_btn    = "导出HTML报告";

        i18n.it.report_mn_pdf_btn = "Esporta Report HTML Progetto";
        i18n.en.report_mn_pdf_btn = "Export Project HTML Report";
        i18n.es.report_mn_pdf_btn = "Exportar Informe HTML del Proyecto";
        i18n.zh.report_mn_pdf_btn = "导出项目HTML报告";

        // ── Traduzioni PDF Report ──────────────────────────────────────────────
        i18n.it.rpt_session_title   = "Report Sessione di Ripresa";
        i18n.en.rpt_session_title   = "Imaging Session Report";
        i18n.es.rpt_session_title   = "Informe de Sesion de Captura";
        i18n.zh.rpt_session_title   = "拍摄会话报告";

        i18n.it.rpt_mn_title        = "Report Progetto Multinotte";
        i18n.en.rpt_mn_title        = "Multi-Night Project Report";
        i18n.es.rpt_mn_title        = "Informe Proyecto Multinoche";
        i18n.zh.rpt_mn_title        = "多夜项目报告";

        i18n.it.rpt_nights_lbl      = "notti";
        i18n.en.rpt_nights_lbl      = "nights";
        i18n.es.rpt_nights_lbl      = "noches";
        i18n.zh.rpt_nights_lbl      = "夜";

        i18n.it.rpt_generated       = "Generato il";
        i18n.en.rpt_generated       = "Generated on";
        i18n.es.rpt_generated       = "Generado el";
        i18n.zh.rpt_generated       = "生成于";

        i18n.it.rpt_page            = "Pag.";
        i18n.en.rpt_page            = "Page";
        i18n.es.rpt_page            = "Pag.";
        i18n.zh.rpt_page            = "第";

        // Titoli sezioni
        i18n.it.rpt_sec_target      = "Informazioni Target";
        i18n.en.rpt_sec_target      = "Target Information";
        i18n.es.rpt_sec_target      = "Informacion del Objetivo";
        i18n.zh.rpt_sec_target      = "目标信息";

        i18n.it.rpt_sec_optics      = "Setup Ottico";
        i18n.en.rpt_sec_optics      = "Optical Setup";
        i18n.es.rpt_sec_optics      = "Configuracion Optica";
        i18n.zh.rpt_sec_optics      = "光学设置";

        i18n.it.rpt_sec_ephemeris   = "Effemeridi della Notte";
        i18n.en.rpt_sec_ephemeris   = "Night Ephemeris";
        i18n.es.rpt_sec_ephemeris   = "Efemerides Nocturnas";
        i18n.zh.rpt_sec_ephemeris   = "夜间天文历";

        i18n.it.rpt_sec_program     = "Programmazione Sessione";
        i18n.en.rpt_sec_program     = "Session Schedule";
        i18n.es.rpt_sec_program     = "Programacion de Sesion";
        i18n.zh.rpt_sec_program     = "会话计划";

        i18n.it.rpt_sec_analysis    = "Analisi Strategica";
        i18n.en.rpt_sec_analysis    = "Strategic Analysis";
        i18n.es.rpt_sec_analysis    = "Analisis Estrategico";
        i18n.zh.rpt_sec_analysis    = "策略分析";

        i18n.it.rpt_sec_project     = "Riepilogo Progetto";
        i18n.en.rpt_sec_project     = "Project Summary";
        i18n.es.rpt_sec_project     = "Resumen del Proyecto";
        i18n.zh.rpt_sec_project     = "项目摘要";

        // Label griglia target
        i18n.it.rpt_label_type      = "Tipologia";
        i18n.en.rpt_label_type      = "Type";
        i18n.es.rpt_label_type      = "Tipo";
        i18n.zh.rpt_label_type      = "类型";

        i18n.it.rpt_label_mag       = "Magnitudine App.";
        i18n.en.rpt_label_mag       = "App. Magnitude";
        i18n.es.rpt_label_mag       = "Magnitud Ap.";
        i18n.zh.rpt_label_mag       = "视星等";

        i18n.it.rpt_label_dist      = "Distanza";
        i18n.en.rpt_label_dist      = "Distance";
        i18n.es.rpt_label_dist      = "Distancia";
        i18n.zh.rpt_label_dist      = "距离";

        i18n.it.rpt_label_size      = "Dimensione";
        i18n.en.rpt_label_size      = "Size";
        i18n.es.rpt_label_size      = "Tamano";
        i18n.zh.rpt_label_size      = "尺寸";

        // Label griglia setup ottico
        i18n.it.rpt_label_focal     = "Telescopio - Focale";
        i18n.en.rpt_label_focal     = "Telescope - Focal Length";
        i18n.es.rpt_label_focal     = "Telescopio - Focal";
        i18n.zh.rpt_label_focal     = "望远镜 - 焦距";

        i18n.it.rpt_label_focal2    = "Focale";
        i18n.en.rpt_label_focal2    = "Focal Length";
        i18n.es.rpt_label_focal2    = "Focal";
        i18n.zh.rpt_label_focal2    = "焦距";

        i18n.it.rpt_label_diameter  = "Diametro / Rapporto";
        i18n.en.rpt_label_diameter  = "Diameter / Ratio";
        i18n.es.rpt_label_diameter  = "Diametro / Relacion";
        i18n.zh.rpt_label_diameter  = "口径 / 焦比";

        i18n.it.rpt_label_sensorw   = "Sensore Larg. W";
        i18n.en.rpt_label_sensorw   = "Sensor Width W";
        i18n.es.rpt_label_sensorw   = "Sensor Ancho W";
        i18n.zh.rpt_label_sensorw   = "传感器宽度 W";

        i18n.it.rpt_label_sensorh   = "Sensore Alt. H";
        i18n.en.rpt_label_sensorh   = "Sensor Height H";
        i18n.es.rpt_label_sensorh   = "Sensor Alto H";
        i18n.zh.rpt_label_sensorh   = "传感器高度 H";

        i18n.it.rpt_label_sensor_wh = "Sensore W x H";
        i18n.en.rpt_label_sensor_wh = "Sensor W x H";
        i18n.es.rpt_label_sensor_wh = "Sensor W x H";
        i18n.zh.rpt_label_sensor_wh = "传感器 W x H";

        i18n.it.rpt_label_pixel     = "Pixel";
        i18n.en.rpt_label_pixel     = "Pixel Size";
        i18n.es.rpt_label_pixel     = "Pixel";
        i18n.zh.rpt_label_pixel     = "像素尺寸";

        i18n.it.rpt_label_mode      = "Modalita";
        i18n.en.rpt_label_mode      = "Mode";
        i18n.es.rpt_label_mode      = "Modo";
        i18n.zh.rpt_label_mode      = "模式";

        i18n.it.rpt_label_samp_native = "Campionamento nativo";
        i18n.en.rpt_label_samp_native = "Native Sampling";
        i18n.es.rpt_label_samp_native = "Muestreo Nativo";
        i18n.zh.rpt_label_samp_native = "原始采样";

        i18n.it.rpt_label_samp      = "Campionamento";
        i18n.en.rpt_label_samp      = "Sampling";
        i18n.es.rpt_label_samp      = "Muestreo";
        i18n.zh.rpt_label_samp      = "采样率";

        i18n.it.rpt_label_bin       = "BIN sessione";
        i18n.en.rpt_label_bin       = "Session BIN";
        i18n.es.rpt_label_bin       = "BIN de sesion";
        i18n.zh.rpt_label_bin       = "会话像素合并";

        i18n.it.rpt_label_bin_sensor = "BIN / Tipo sensore";
        i18n.en.rpt_label_bin_sensor = "BIN / Sensor Type";
        i18n.es.rpt_label_bin_sensor = "BIN / Tipo sensor";
        i18n.zh.rpt_label_bin_sensor = "像素合并 / 传感器类型";

        i18n.it.rpt_label_fov       = "FOV calcolato";
        i18n.en.rpt_label_fov       = "Calculated FOV";
        i18n.es.rpt_label_fov       = "FOV calculado";
        i18n.zh.rpt_label_fov       = "计算FOV";

        i18n.it.rpt_label_rotation  = "Rotazione PA";
        i18n.en.rpt_label_rotation  = "PA Rotation";
        i18n.es.rpt_label_rotation  = "Rotacion PA";
        i18n.zh.rpt_label_rotation  = "位置角旋转";

        i18n.it.rpt_label_sensor_type = "Tipo sensore";
        i18n.en.rpt_label_sensor_type = "Sensor Type";
        i18n.es.rpt_label_sensor_type = "Tipo de sensor";
        i18n.zh.rpt_label_sensor_type = "传感器类型";

        i18n.it.rpt_label_sensor    = "Sensore";
        i18n.en.rpt_label_sensor    = "Sensor";
        i18n.es.rpt_label_sensor    = "Sensor";
        i18n.zh.rpt_label_sensor    = "传感器";

        // Label griglia effemeridi
        i18n.it.rpt_label_sunset    = "Tramonto";
        i18n.en.rpt_label_sunset    = "Sunset";
        i18n.es.rpt_label_sunset    = "Puesta de sol";
        i18n.zh.rpt_label_sunset    = "日落";

        i18n.it.rpt_label_nightstart = "Inizio Notte Astr.";
        i18n.en.rpt_label_nightstart = "Astro Night Start";
        i18n.es.rpt_label_nightstart = "Inicio Noche Astro.";
        i18n.zh.rpt_label_nightstart = "天文夜开始";

        i18n.it.rpt_label_flip      = "Meridian Flip";
        i18n.en.rpt_label_flip      = "Meridian Flip";
        i18n.es.rpt_label_flip      = "Meridian Flip";
        i18n.zh.rpt_label_flip      = "子午翻转";

        i18n.it.rpt_label_nightend  = "Fine Notte Astr.";
        i18n.en.rpt_label_nightend  = "Astro Night End";
        i18n.es.rpt_label_nightend  = "Fin Noche Astro.";
        i18n.zh.rpt_label_nightend  = "天文夜结束";

        i18n.it.rpt_label_sunrise   = "Alba";
        i18n.en.rpt_label_sunrise   = "Sunrise";
        i18n.es.rpt_label_sunrise   = "Amanecer";
        i18n.zh.rpt_label_sunrise   = "日出";

        i18n.it.rpt_label_window    = "Finestra ripresa";
        i18n.en.rpt_label_window    = "Imaging Window";
        i18n.es.rpt_label_window    = "Ventana de captura";
        i18n.zh.rpt_label_window    = "拍摄时间窗口";

        // Label griglia programmazione
        i18n.it.rpt_label_start     = "Inizio";
        i18n.en.rpt_label_start     = "Start";
        i18n.es.rpt_label_start     = "Inicio";
        i18n.zh.rpt_label_start     = "开始";

        i18n.it.rpt_label_end       = "Fine";
        i18n.en.rpt_label_end       = "End";
        i18n.es.rpt_label_end       = "Fin";
        i18n.zh.rpt_label_end       = "结束";

        i18n.it.rpt_label_duration  = "Durata totale";
        i18n.en.rpt_label_duration  = "Total Duration";
        i18n.es.rpt_label_duration  = "Duracion total";
        i18n.zh.rpt_label_duration  = "总时长";

        i18n.it.rpt_label_frames    = "Frame totali";
        i18n.en.rpt_label_frames    = "Total Frames";
        i18n.es.rpt_label_frames    = "Fotogramas totales";
        i18n.zh.rpt_label_frames    = "总帧数";

        i18n.it.rpt_label_int_net   = "Integrazione netta";
        i18n.en.rpt_label_int_net   = "Net Integration";
        i18n.es.rpt_label_int_net   = "Integracion neta";
        i18n.zh.rpt_label_int_net   = "净积分时间";

        i18n.it.rpt_label_int_total = "Integrazione totale";
        i18n.en.rpt_label_int_total = "Total Integration";
        i18n.es.rpt_label_int_total = "Integracion total";
        i18n.zh.rpt_label_int_total = "总积分时间";

        i18n.it.rpt_label_nights    = "Notti pianificate";
        i18n.en.rpt_label_nights    = "Planned Nights";
        i18n.es.rpt_label_nights    = "Noches planificadas";
        i18n.zh.rpt_label_nights    = "计划夜数";

        i18n.it.rpt_label_tpt       = "Obiettivo TPT";
        i18n.en.rpt_label_tpt       = "TPT Goal";
        i18n.es.rpt_label_tpt       = "Objetivo TPT";
        i18n.zh.rpt_label_tpt       = "TPT目标";

        i18n.it.rpt_label_context   = "Modalita ripresa";
        i18n.en.rpt_label_context   = "Capture Mode";
        i18n.es.rpt_label_context   = "Modo de captura";
        i18n.zh.rpt_label_context   = "拍摄模式";

        i18n.it.rpt_label_nights_vs = "Notti completate / pianificate";
        i18n.en.rpt_label_nights_vs = "Completed / Planned nights";
        i18n.es.rpt_label_nights_vs = "Noches completadas / planificadas";
        i18n.zh.rpt_label_nights_vs = "已完成 / 计划夜数";

        i18n.it.rpt_label_night_int = "Integrazione notte:";
        i18n.en.rpt_label_night_int = "Night integration:";
        i18n.es.rpt_label_night_int = "Integracion noche:";
        i18n.zh.rpt_label_night_int = "本夜积分:";

        // Valori fissi
        i18n.it.rpt_val_mono        = "Monocromatico";
        i18n.en.rpt_val_mono        = "Monochrome";
        i18n.es.rpt_val_mono        = "Monocromatico";
        i18n.zh.rpt_val_mono        = "单色";

        i18n.it.rpt_val_color       = "Colore (OSC)";
        i18n.en.rpt_val_color       = "Color (OSC)";
        i18n.es.rpt_val_color       = "Color (OSC)";
        i18n.zh.rpt_val_color       = "彩色 (OSC)";

        i18n.it.rpt_val_single      = "Scatto Singolo";
        i18n.en.rpt_val_single      = "Single Frame";
        i18n.es.rpt_val_single      = "Disparo Unico";
        i18n.zh.rpt_val_single      = "单次拍摄";

        i18n.it.rpt_val_mosaic      = "Mosaico";
        i18n.en.rpt_val_mosaic      = "Mosaic";
        i18n.es.rpt_val_mosaic      = "Mosaico";
        i18n.zh.rpt_val_mosaic      = "马赛克";

        i18n.it.rpt_val_pro         = "PRO";
        i18n.en.rpt_val_pro         = "PRO";
        i18n.es.rpt_val_pro         = "PRO";
        i18n.zh.rpt_val_pro         = "PRO";

        i18n.it.rpt_val_smart       = "Smart";
        i18n.en.rpt_val_smart       = "Smart";
        i18n.es.rpt_val_smart       = "Smart";
        i18n.zh.rpt_val_smart       = "Smart";

        // Intestazione tabella filtri
        i18n.it.rpt_th_filter       = "Filtro";
        i18n.en.rpt_th_filter       = "Filter";
        i18n.es.rpt_th_filter       = "Filtro";
        i18n.zh.rpt_th_filter       = "滤镜";

        i18n.it.rpt_th_frames       = "Pose";
        i18n.en.rpt_th_frames       = "Frames";
        i18n.es.rpt_th_frames       = "Poses";
        i18n.zh.rpt_th_frames       = "帧数";

        i18n.it.rpt_th_exp          = "Esposizione";
        i18n.en.rpt_th_exp          = "Exposure";
        i18n.es.rpt_th_exp          = "Exposicion";
        i18n.zh.rpt_th_exp          = "曝光时间";

        i18n.it.rpt_th_gain         = "Gain";
        i18n.en.rpt_th_gain         = "Gain";
        i18n.es.rpt_th_gain         = "Ganancia";
        i18n.zh.rpt_th_gain         = "增益";

        i18n.it.rpt_th_offset       = "Offset";
        i18n.en.rpt_th_offset       = "Offset";
        i18n.es.rpt_th_offset       = "Offset";
        i18n.zh.rpt_th_offset       = "偏置";

        i18n.it.rpt_th_bin          = "BIN";
        i18n.en.rpt_th_bin          = "BIN";
        i18n.es.rpt_th_bin          = "BIN";
        i18n.zh.rpt_th_bin          = "像素合并";

        i18n.it.rpt_th_total        = "Totale";
        i18n.en.rpt_th_total        = "Total";
        i18n.es.rpt_th_total        = "Total";
        i18n.zh.rpt_th_total        = "合计";

        // Consiglio tattico
        i18n.it.rpt_tip_label       = "Consiglio Tattico:";
        i18n.en.rpt_tip_label       = "Tactical Tip:";
        i18n.es.rpt_tip_label       = "Consejo Tactico:";
        i18n.zh.rpt_tip_label       = "战术建议:";

        // Qualita campionamento (forma lunga singola notte)
        i18n.it.rpt_q_over          = "Sovracampionamento - stai sprecando fotoni";
        i18n.en.rpt_q_over          = "Oversampling - you are wasting photons";
        i18n.es.rpt_q_over          = "Sobremuestreo - estas desperdiciando fotones";
        i18n.zh.rpt_q_over          = "过采样 - 正在浪费光子";

        i18n.it.rpt_q_ideal         = "Campionamento ideale - configurazione ottimale";
        i18n.en.rpt_q_ideal         = "Ideal sampling - optimal setup";
        i18n.es.rpt_q_ideal         = "Muestreo ideal - configuracion optima";
        i18n.zh.rpt_q_ideal         = "理想采样 - 最优配置";

        i18n.it.rpt_q_under         = "Sottocampionamento - stelle leggermente squadrate";
        i18n.en.rpt_q_under         = "Undersampling - slightly squared stars";
        i18n.es.rpt_q_under         = "Submuestreo - estrellas ligeramente cuadradas";
        i18n.zh.rpt_q_under         = "欠采样 - 星点略呈方形";

        // Qualita campionamento (forma breve multinotte)
        i18n.it.rpt_q_over_s        = "Sovracampionamento";
        i18n.en.rpt_q_over_s        = "Oversampling";
        i18n.es.rpt_q_over_s        = "Sobremuestreo";
        i18n.zh.rpt_q_over_s        = "过采样";

        i18n.it.rpt_q_ideal_s       = "Campionamento ideale";
        i18n.en.rpt_q_ideal_s       = "Ideal sampling";
        i18n.es.rpt_q_ideal_s       = "Muestreo ideal";
        i18n.zh.rpt_q_ideal_s       = "理想采样";

        i18n.it.rpt_q_under_s       = "Sottocampionamento";
        i18n.en.rpt_q_under_s       = "Undersampling";
        i18n.es.rpt_q_under_s       = "Submuestreo";
        i18n.zh.rpt_q_under_s       = "欠采样";

        // Qualita integrazione
        i18n.it.rpt_q_int_low       = "Integrazione bassa - aumenta le pose";
        i18n.en.rpt_q_int_low       = "Low integration - add more frames";
        i18n.es.rpt_q_int_low       = "Integracion baja - agrega mas poses";
        i18n.zh.rpt_q_int_low       = "积分不足 - 请增加帧数";

        i18n.it.rpt_q_int_good      = "Integrazione buona - sufficiente per soggetti brillanti";
        i18n.en.rpt_q_int_good      = "Good integration - sufficient for bright targets";
        i18n.es.rpt_q_int_good      = "Buena integracion - suficiente para objetos brillantes";
        i18n.zh.rpt_q_int_good      = "积分良好 - 适合亮目标";

        i18n.it.rpt_q_int_high      = "Integrazione elevata - ottima per soggetti deboli";
        i18n.en.rpt_q_int_high      = "High integration - excellent for faint targets";
        i18n.es.rpt_q_int_high      = "Alta integracion - excelente para objetos debiles";
        i18n.zh.rpt_q_int_high      = "积分充足 - 适合暗弱目标";

        i18n.it.rpt_q_int_low_s     = "Integrazione bassa";
        i18n.en.rpt_q_int_low_s     = "Low integration";
        i18n.es.rpt_q_int_low_s     = "Integracion baja";
        i18n.zh.rpt_q_int_low_s     = "积分不足";

        i18n.it.rpt_q_int_good_s    = "Integrazione buona";
        i18n.en.rpt_q_int_good_s    = "Good integration";
        i18n.es.rpt_q_int_good_s    = "Buena integracion";
        i18n.zh.rpt_q_int_good_s    = "积分良好";

        i18n.it.rpt_q_int_high_s    = "Integrazione elevata";
        i18n.en.rpt_q_int_high_s    = "High integration";
        i18n.es.rpt_q_int_high_s    = "Alta integracion";
        i18n.zh.rpt_q_int_high_s    = "积分充足";

        // Alert
        i18n.it.rpt_alert_no_target = "Nessun target selezionato!";
        i18n.en.rpt_alert_no_target = "No target selected!";
        i18n.es.rpt_alert_no_target = "Ningun objetivo seleccionado!";
        i18n.zh.rpt_alert_no_target = "未选择目标！";

        i18n.it.rpt_alert_no_lib    = "Libreria PDF non caricata.\nVerifica la connessione internet e ricarica la pagina.";
        i18n.en.rpt_alert_no_lib    = "PDF library not loaded.\nCheck your internet connection and reload the page.";
        i18n.es.rpt_alert_no_lib    = "Libreria PDF no cargada.\nVerifica la conexion a internet y recarga la pagina.";
        i18n.zh.rpt_alert_no_lib    = "PDF库未加载。\n请检查网络连接后重新加载页面。";

        i18n.it.rpt_frames_unit     = "pose";
        i18n.en.rpt_frames_unit     = "frames";
        i18n.es.rpt_frames_unit     = "poses";
        i18n.zh.rpt_frames_unit     = "帧";

        i18n.it.rpt_calib_dark      = "Dark";
        i18n.en.rpt_calib_dark      = "Dark";
        i18n.es.rpt_calib_dark      = "Dark";
        i18n.zh.rpt_calib_dark      = "暗帧";

        i18n.it.rpt_calib_bias      = "Bias";
        i18n.en.rpt_calib_bias      = "Bias";
        i18n.es.rpt_calib_bias      = "Bias";
        i18n.zh.rpt_calib_bias      = "偏置帧";

        i18n.it.rpt_calib_overhead  = "overhead";
        i18n.en.rpt_calib_overhead  = "overhead";
        i18n.es.rpt_calib_overhead  = "overhead";
        i18n.zh.rpt_calib_overhead  = "开销";

        i18n.it.sw_update_msg       = "Aggiornamento disponibile";
        i18n.en.sw_update_msg       = "Update available";
        i18n.es.sw_update_msg       = "Actualizacion disponible";
        i18n.zh.sw_update_msg       = "有可用更新";

        i18n.it.save_tel_title      = "Salva Telescopio";
        i18n.en.save_tel_title      = "Save Telescope";
        i18n.es.save_tel_title      = "Guardar Telescopio";
        i18n.zh.save_tel_title      = "保存望远镜";

        i18n.it.save_tel_label      = "Nome telescopio / obiettivo:";
        i18n.en.save_tel_label      = "Telescope / lens name:";
        i18n.es.save_tel_label      = "Nombre del telescopio / objetivo:";
        i18n.zh.save_tel_label      = "望远镜 / 镜头名称:";

        i18n.it.save_tel_confirm    = "Salva";
        i18n.en.save_tel_confirm    = "Save";
        i18n.es.save_tel_confirm    = "Guardar";
        i18n.zh.save_tel_confirm    = "保存";

        i18n.it.save_tel_cancel     = "Annulla";
        i18n.en.save_tel_cancel     = "Cancel";
        i18n.es.save_tel_cancel     = "Cancelar";
        i18n.zh.save_tel_cancel     = "取消";

        i18n.it.del_tel_btn         = "";
        i18n.en.del_tel_btn         = "";
        i18n.es.del_tel_btn         = "";
        i18n.zh.del_tel_btn         = "";

        i18n.it.del_tel_title       = "Elimina Telescopio";
        i18n.en.del_tel_title       = "Delete Telescope";
        i18n.es.del_tel_title       = "Eliminar Telescopio";
        i18n.zh.del_tel_title       = "删除望远镜";

        i18n.it.del_tel_empty       = "Nessun telescopio salvato.";

        // Bortle
        i18n.it.bortle_label   = "Bortle (inquinamento luminoso):";
        i18n.en.bortle_label   = "Bortle (light pollution):";
        i18n.es.bortle_label   = "Bortle (contaminación lumínica):";
        i18n.zh.bortle_label   = "Bortle（光污染等级）:";

        i18n.it.bortle_1 = "1 — Cielo eccellente (buio totale)";
        i18n.en.bortle_1 = "1 — Excellent sky (total darkness)";
        i18n.es.bortle_1 = "1 — Cielo excelente (oscuridad total)";
        i18n.zh.bortle_1 = "1 — 优秀天空（完全黑暗）";

        i18n.it.bortle_2 = "2 — Cielo molto buio";
        i18n.en.bortle_2 = "2 — Very dark sky";
        i18n.es.bortle_2 = "2 — Cielo muy oscuro";
        i18n.zh.bortle_2 = "2 — 非常暗的天空";

        i18n.it.bortle_3 = "3 — Cielo rurale";
        i18n.en.bortle_3 = "3 — Rural sky";
        i18n.es.bortle_3 = "3 — Cielo rural";
        i18n.zh.bortle_3 = "3 — 农村天空";

        i18n.it.bortle_4 = "4 — Periferia rurale/urbana";
        i18n.en.bortle_4 = "4 — Rural/urban transition";
        i18n.es.bortle_4 = "4 — Transición rural/urbana";
        i18n.zh.bortle_4 = "4 — 农村/城市过渡带";

        i18n.it.bortle_5 = "5 — Periferia (cielo suburbano)";
        i18n.en.bortle_5 = "5 — Suburban sky";
        i18n.es.bortle_5 = "5 — Cielo suburbano";
        i18n.zh.bortle_5 = "5 — 郊区天空";

        i18n.it.bortle_6 = "6 — Periferia urbana";
        i18n.en.bortle_6 = "6 — Bright suburban sky";
        i18n.es.bortle_6 = "6 — Periferia urbana";
        i18n.zh.bortle_6 = "6 — 明亮郊区天空";

        i18n.it.bortle_7 = "7 — Cielo urbano";
        i18n.en.bortle_7 = "7 — Urban sky";
        i18n.es.bortle_7 = "7 — Cielo urbano";
        i18n.zh.bortle_7 = "7 — 城市天空";

        i18n.it.bortle_8 = "8 — Città (inquinamento elevato)";
        i18n.en.bortle_8 = "8 — City sky (heavy pollution)";
        i18n.es.bortle_8 = "8 — Ciudad (contaminación alta)";
        i18n.zh.bortle_8 = "8 — 城市天空（严重污染）";

        i18n.it.bortle_9 = "9 — Centro città (cielo arancione)";
        i18n.en.bortle_9 = "9 — Inner city (orange sky)";
        i18n.es.bortle_9 = "9 — Centro ciudad (cielo naranja)";
        i18n.zh.bortle_9 = "9 — 市中心（橙色天空）";

        i18n.it.lp_layer = "Inquinamento Luminoso";
        i18n.en.lp_layer = "Light Pollution";

        i18n.it.wind_layer = "Vento";
        i18n.en.wind_layer = "Wind";
        i18n.es.wind_layer = "Viento";
        i18n.zh.wind_layer = "风速";
        i18n.es.lp_layer = "Contaminación Lumínica";
        i18n.zh.lp_layer = "光污染";
        // Legenda LP
        i18n.it.lp_legend_title = "Scala Inquinamento Luminoso (Lorenz 2024)";
        i18n.en.lp_legend_title = "Light Pollution Scale (Lorenz 2024)";
        i18n.es.lp_legend_title = "Escala de Contaminación Lumínica (Lorenz 2024)";
        i18n.zh.lp_legend_title = "光污染等级（Lorenz 2024）";
        i18n.it.bortle_info_tip = "💡 Non sei sicuro del tuo Bortle? Attiva il layer <b>Inq. Luminoso</b> sulla mappa: i colori (blu→verde→giallo→rosso→bianco) corrispondono ai livelli Bortle 1→9. Individua la tua posizione e scegli il valore corrispondente.";
        i18n.en.bortle_info_tip = "💡 Not sure about your Bortle? Enable the <b>Light Pollution</b> layer on the map: colors (blue→green→yellow→red→white) correspond to Bortle levels 1→9. Find your location and pick the matching value.";
        i18n.es.bortle_info_tip = "💡 ¿No estás seguro de tu Bortle? Activa la capa <b>Contaminación Lumínica</b> en el mapa: los colores (azul→verde→amarillo→rojo→blanco) corresponden a los niveles Bortle 1→9. Localiza tu posición y elige el valor correspondiente.";
        i18n.zh.bortle_info_tip = "💡 不确定你的博特尔等级？在地图上启用<b>光污染</b>图层：颜色（蓝→绿→黄→红→白）对应博特尔1→9级。找到你的位置并选择对应的值。";
        i18n.en.del_tel_empty       = "No saved telescopes.";
        i18n.es.del_tel_empty       = "No hay telescopios guardados.";
        i18n.zh.del_tel_empty       = "没有已保存的望远镜。";

        i18n.it.sw_update_btn       = "Ricarica";
        i18n.en.sw_update_btn       = "Reload";
        i18n.es.sw_update_btn       = "Recargar";
        i18n.zh.sw_update_btn       = "刷新";

        i18n.it.rpt_alert_no_nights = "Nessuna notte pianificata!";
        i18n.en.rpt_alert_no_nights = "No nights planned!";
        i18n.es.rpt_alert_no_nights = "Ninguna noche planificada!";
        i18n.zh.rpt_alert_no_nights = "未规划任何夜晚！";

        i18n.it.del_tel_empty       = "Nessun telescopio salvato.";
        i18n.en.del_tel_empty       = "No saved telescopes.";
        i18n.es.del_tel_empty       = "No hay telescopios guardados.";
        i18n.zh.del_tel_empty       = "没有已保存的望远镜。";

        // --- CHANGELOG v5.9.3 ---
        i18n.it.cl_update_label     = "Aggiornamento";
        i18n.en.cl_update_label     = "Update";
        i18n.es.cl_update_label     = "Actualización";
        i18n.zh.cl_update_label     = "更新";

        i18n.it.cl_subtitle         = "Novità rispetto alla versione precedente";
        i18n.en.cl_subtitle         = "What's new since the previous version";
        i18n.es.cl_subtitle         = "Novedades respecto a la versión anterior";
        i18n.zh.cl_subtitle         = "与上一版本相比的新内容";

        i18n.it.report_download_ok = "Report salvato con successo!";
        i18n.en.report_download_ok = "Report saved successfully!";
        i18n.es.report_download_ok = "¡Informe guardado con éxito!";
        i18n.zh.report_download_ok = "报告保存成功！";

        // Filtro narrowband OSC
        i18n.it.info_filter_type = "Seleziona il filtro narrowband montato sulla camera OSC.<br><br><b>Dual-Band (Ha+OIII):</b> Passa solo Hα (656nm) e OIII (500nm). Ideale per nebulose a emissione sotto cieli inquinati. Richiede pose lunghe (10–25 min).<br><br><b>Quad-Band:</b> Aggiunge SII e Hβ al dual-band. Più segnale per nebulose ricche di zolfo. Riduzione fondo cielo leggermente inferiore al dual-band.<br><br><b>Attenzione:</b> questi filtri non funzionano su galassie e nebulose a riflessione.";
        i18n.en.info_filter_type = "Select the narrowband filter mounted on your OSC camera.<br><br><b>Dual-Band (Ha+OIII):</b> Passes only Hα (656nm) and OIII (500nm). Ideal for emission nebulae under light-polluted skies. Requires long exposures (10–25 min).<br><br><b>Quad-Band:</b> Adds SII and Hβ to dual-band. More signal for sulphur-rich nebulae. Slightly lower sky rejection than dual-band.<br><br><b>Warning:</b> these filters do not work on galaxies and reflection nebulae.";
        i18n.es.info_filter_type = "Selecciona el filtro de banda estrecha montado en tu cámara OSC.<br><br><b>Dual-Band (Ha+OIII):</b> Solo pasa Hα (656nm) y OIII (500nm). Ideal para nebulosas de emisión bajo cielos contaminados. Requiere poses largas (10–25 min).<br><br><b>Quad-Band:</b> Añade SII y Hβ al dual-band. Más señal para nebulosas ricas en azufre.<br><br><b>Atención:</b> estos filtros no funcionan en galaxias y nebulosas de reflexión.";
        i18n.zh.info_filter_type = "选择安装在OSC相机上的窄带滤镜。<br><br><b>双频带 (Ha+OIII)：</b>仅通过Hα(656nm)和OIII(500nm)。适合在光污染天空下拍摄发射星云，需要长时间曝光(10-25分钟)。<br><br><b>四频带：</b>在双频带基础上增加SII和Hβ，对富含硫的星云信号更强。<br><br><b>注意：</b>这些滤镜对星系和反射星云无效。";

        i18n.it.filter_type_none = "Nessun filtro NB";
        i18n.en.filter_type_none = "No NB filter";
        i18n.es.filter_type_none = "Sin filtro NB";
        i18n.zh.filter_type_none = "无窄带滤镜";

        i18n.it.filter_type_dual = "Dual-band (Ha+OIII)";
        i18n.en.filter_type_dual = "Dual-band (Ha+OIII)";
        i18n.es.filter_type_dual = "Dual-banda (Ha+OIII)";
        i18n.zh.filter_type_dual = "双频带 (Ha+OIII)";

        i18n.it.filter_type_quad = "Quad-band (Ha+OIII+SII+Hβ)";
        i18n.en.filter_type_quad = "Quad-band (Ha+OIII+SII+Hβ)";
        i18n.es.filter_type_quad = "Cuatro bandas (Ha+OIII+SII+Hβ)";
        i18n.zh.filter_type_quad = "四频带 (Ha+OIII+SII+Hβ)";

        // Filtro OSC dual/quad-band
        i18n.it.filter_osc_none = "Nessun filtro";
        i18n.en.filter_osc_none = "No filter";
        i18n.es.filter_osc_none = "Sin filtro";
        i18n.zh.filter_osc_none = "无滤镜";

        i18n.it.filter_osc_dual = "Dual-band (Ha+OIII)";
        i18n.en.filter_osc_dual = "Dual-band (Ha+OIII)";
        i18n.es.filter_osc_dual = "Doble banda (Ha+OIII)";
        i18n.zh.filter_osc_dual = "双波段 (Ha+OIII)";

        i18n.it.filter_osc_quad = "Quad-band (Ha+OIII+SII+Hβ)";
        i18n.en.filter_osc_quad = "Quad-band (Ha+OIII+SII+Hβ)";
        i18n.es.filter_osc_quad = "Cuatro bandas (Ha+OIII+SII+Hβ)";
        i18n.zh.filter_osc_quad = "四波段 (Ha+OIII+SII+Hβ)";


        i18n.it.info_filter_osc = "Filtri Narrowband OSC\n\nDual-band: passa solo Ha e OIII. Riduce il fondo cielo del 94-95%. Ideale per nebulose a emissione da cieli urbani. Richiede pose lunghe (10-20 min). Non usare su galassie.\n\nQuad-band: aggiunge SII e H-beta. Utile per nebulose con forte emissione SII. Riduzione fondo cielo leggermente inferiore al dual-band.\n\nIl calcolo del tempo di posa si aggiorna automaticamente.";
        i18n.en.info_filter_osc = "OSC Narrowband Filters\n\nDual-band: passes only Ha and OIII. Reduces sky background by 94-95%. Ideal for emission nebulae from light-polluted skies. Requires long exposures (10-20 min). Do not use on galaxies.\n\nQuad-band: adds SII and H-beta bands. Useful for nebulae with strong SII emission. Sky reduction slightly lower than dual-band.\n\nExposure time is updated automatically.";
        i18n.es.info_filter_osc = "Filtros Narrowband OSC\n\nDoble banda: deja pasar solo Ha y OIII. Reduce el fondo del cielo un 94-95%. Ideal para nebulosas de emision desde cielos urbanos. Requiere poses largas (10-20 min). No usar en galaxias.\n\nCuatro bandas: anade SII y H-beta. Util para nebulosas con fuerte emision SII. Reduccion del fondo ligeramente menor.\n\nEl tiempo de exposicion se actualiza automaticamente.";
        i18n.zh.info_filter_osc = "OSC窄带滤镜\n\n双波段：仅透过Ha和OIII。将背景降低94-95%。适合城市天空下的发射星云。需要长曝光(10-20分钟)。不适用于星系。\n\n四波段：增加SII和H-beta。适用于SII发射强烈的星云。背景降低效果略低。\n\n曝光时间会自动更新。";

                i18n.it.warn_not_visible  = "Attenzione: questo oggetto non raggiungerà i 30° sull'orizzonte stanotte. Scegli una notte diversa o un altro target.";
        i18n.en.warn_not_visible  = "Warning: this object will not reach 30° above the horizon tonight. Choose a different night or target.";
        i18n.es.warn_not_visible  = "Atención: este objeto no alcanzará los 30° sobre el horizonte esta noche. Elige otra noche u otro objetivo.";
        i18n.zh.warn_not_visible  = "警告：今晚该目标不会升至地平线30°以上。请选择其他夜晚或目标。";

        i18n.it.warn_already_set  = "Attenzione: questo oggetto non è più visibile a quest'ora — è già tramontato sotto i 30°. La finestra di ripresa di stanotte è terminata.";
        i18n.en.warn_already_set  = "Warning: this object is no longer visible at this time — it has already set below 30°. Tonight's imaging window has ended.";
        i18n.es.warn_already_set  = "Atención: este objeto ya no es visible a esta hora — ya se ha puesto por debajo de 30°. La ventana de captura de esta noche ha terminado.";
        i18n.zh.warn_already_set  = "警告：此目标当前已不可见——已降至30°以下。今晚的拍摄窗口已结束。";

        i18n.it.nina_osc_filter_label = "Nome filtro in N.I.N.A.";
        i18n.en.nina_osc_filter_label = "Filter name in N.I.N.A.";
        i18n.es.nina_osc_filter_label = "Nombre del filtro en N.I.N.A.";
        i18n.zh.nina_osc_filter_label = "N.I.N.A.中的滤镜名称";

        i18n.it.nina_osc_filter_info = "Inserisci il nome esatto del filtro dual/quad-band come appare nella tua ruota portafiltri in N.I.N.A. (es. \"L-eXtreme\", \"ALP-T\", \"L-Ultimate\"). Se lasci vuoto viene usato \"Dual-band\" o \"Quad-band\" come default. Il nome viene inserito nel blocco SwitchFilter della sequenza esportata.";
        i18n.en.nina_osc_filter_info = "Enter the exact name of your dual/quad-band filter as it appears in your N.I.N.A. filter wheel (e.g. \"L-eXtreme\", \"ALP-T\", \"L-Ultimate\"). If left empty, \"Dual-band\" or \"Quad-band\" is used as default. The name is inserted in the SwitchFilter block of the exported sequence.";
        i18n.es.nina_osc_filter_info = "Introduce el nombre exacto del filtro dual/quad-band tal como aparece en tu rueda de filtros de N.I.N.A. (p.ej. \"L-eXtreme\", \"ALP-T\"). Si se deja vacío se usa \"Dual-band\" o \"Quad-band\" por defecto.";
        i18n.zh.nina_osc_filter_info = "输入双/四波段滤镜在N.I.N.A.滤镜轮中显示的确切名称（如\"L-eXtreme\"、\"ALP-T\"）。留空则默认使用\"Dual-band\"或\"Quad-band\"。";

        i18n.it.filter_modal_title   = "Configurazione Filtro Narrowband";
        i18n.en.filter_modal_title   = "Narrowband Filter Configuration";
        i18n.es.filter_modal_title   = "Configuración Filtro Narrowband";
        i18n.zh.filter_modal_title   = "窄带滤镜配置";

        i18n.it.filter_modal_context = "Parametri sessione corrente";
        i18n.en.filter_modal_context = "Current session parameters";
        i18n.es.filter_modal_context = "Parámetros de sesión actuales";
        i18n.zh.filter_modal_context = "当前会话参数";

        i18n.it.filter_ctx_bortle    = "Bortle";
        i18n.en.filter_ctx_bortle    = "Bortle";
        i18n.es.filter_ctx_bortle    = "Bortle";
        i18n.zh.filter_ctx_bortle    = "博特尔";

        i18n.it.filter_ctx_sensor    = "Sensore";
        i18n.en.filter_ctx_sensor    = "Sensor";
        i18n.es.filter_ctx_sensor    = "Sensor";
        i18n.zh.filter_ctx_sensor    = "传感器";

        i18n.it.filter_db_label      = "Seleziona filtro dal database";
        i18n.en.filter_db_label      = "Select filter from database";
        i18n.es.filter_db_label      = "Seleccionar filtro de la base de datos";
        i18n.zh.filter_db_label      = "从数据库选择滤镜";

        i18n.it.filter_modal_type    = "Tipo filtro";
        i18n.en.filter_modal_type    = "Filter type";
        i18n.es.filter_modal_type    = "Tipo de filtro";
        i18n.zh.filter_modal_type    = "滤镜类型";

        i18n.it.filter_modal_bw      = "Banda totale (nm)";
        i18n.en.filter_modal_bw      = "Total bandwidth (nm)";
        i18n.es.filter_modal_bw      = "Ancho de banda total (nm)";
        i18n.zh.filter_modal_bw      = "总带宽 (nm)";

        i18n.it.filter_modal_sensor  = "Sensore camera";
        i18n.en.filter_modal_sensor  = "Camera sensor";
        i18n.es.filter_modal_sensor  = "Sensor de la cámara";
        i18n.zh.filter_modal_sensor  = "相机传感器";

        i18n.it.filter_result_label  = "Posa minima consigliata";
        i18n.en.filter_result_label  = "Minimum recommended exposure";
        i18n.es.filter_result_label  = "Exposición mínima recomendada";
        i18n.zh.filter_result_label  = "建议最短曝光时间";

        i18n.it.filter_warn_fratio   = "A f/4 o inferiore con filtri stretti (\u22647nm) la perdita di efficienza per blue-shift può superare il 10%. Considera un filtro con banda più larga.";
        i18n.en.filter_warn_fratio   = "At f/4 or faster with narrow filters (\u22647nm), blue-shift efficiency loss can exceed 10%. Consider a wider bandwidth filter.";
        i18n.es.filter_warn_fratio   = "A f/4 o más rápido con filtros estrechos (\u22647nm), la pérdida por desplazamiento azul puede superar el 10%. Considera un filtro de mayor ancho de banda.";
        i18n.zh.filter_warn_fratio   = "在f/4或更快的光学系统中使用窄带滤镜（\u22647nm），蓝移导致的效率损失可能超过10%。建议使用更宽带宽的滤镜。";

        i18n.it.info_filter_bw       = "La larghezza di banda totale è la somma delle FWHM di tutte le bande del filtro. Es: un dual-band 7+7nm ha banda totale 14nm. Più è stretta, più il fondo cielo viene tagliato ma servono pose più lunghe.";
        i18n.en.info_filter_bw       = "Total bandwidth is the sum of FWHM of all filter bands. E.g. a dual-band 7+7nm has 14nm total. Narrower = more sky cut but longer exposures needed.";
        i18n.es.info_filter_bw       = "El ancho de banda total es la suma de los FWHM de todas las bandas del filtro. Ej: un dual-band 7+7nm tiene 14nm total. Más estrecho = más cielo cortado pero poses más largas.";
        i18n.zh.info_filter_bw       = "总带宽是滤镜所有波段FWHM之和。例如双波段7+7nm总带宽为14nm。越窄=背景抑制越强，但需要更长曝光。";

        i18n.it.info_filter_sensor   = "Seleziona il sensore della tua camera OSC. Vengono caricati automaticamente il read noise e la dimensione del pixel per il calcolo della posa minima. I valori si riferiscono al gain unity tipico.";
        i18n.en.info_filter_sensor   = "Select your OSC camera sensor. Read noise and pixel size are loaded automatically for the minimum exposure calculation. Values refer to typical unity gain.";
        i18n.es.info_filter_sensor   = "Selecciona el sensor de tu cámara OSC. El ruido de lectura y el tamaño de píxel se cargan automáticamente para el cálculo de la exposición mínima.";
        i18n.zh.info_filter_sensor   = "选择您的OSC相机传感器。读出噪声和像素尺寸将自动加载用于计算最短曝光时间。数值基于典型统一增益。";

        i18n.it.btn_cancel           = "Annulla";
        i18n.en.btn_cancel           = "Cancel";
        i18n.es.btn_cancel           = "Cancelar";
        i18n.zh.btn_cancel           = "取消";

        i18n.it.btn_apply            = "Applica";
        i18n.en.btn_apply            = "Apply";
        i18n.es.btn_apply            = "Aplicar";
        i18n.zh.btn_apply            = "应用";

        i18n.it.filter_osc_custom    = "Personalizzato";
        i18n.en.filter_osc_custom    = "Custom";
        i18n.es.filter_osc_custom    = "Personalizado";
        i18n.zh.filter_osc_custom    = "自定义";

        i18n.it.info_filter_modal    = "Seleziona il tuo filtro dal database per compilare automaticamente tipo e larghezza di banda. Se modifichi i nm manualmente il filtro passa automaticamente a Personalizzato e dovrai indicare il tipo (dual o quad). Il sensore camera aggiorna anche il campo pixel nel FOV. La posa minima in fondo al modal si aggiorna in tempo reale e indica il tempo minimo necessario per superare il rumore di lettura del sensore con il filtro e le condizioni selezionate.";
        i18n.en.info_filter_modal    = "Select your filter from the database to automatically fill in the type and bandwidth. If you manually change the nm value, the filter switches to Custom and you will need to specify the type (dual or quad). The camera sensor also updates the pixel field in the FOV section. The minimum exposure at the bottom updates in real time and shows the minimum time needed to overcome the sensor read noise with the selected filter and conditions.";
        i18n.es.info_filter_modal    = "Selecciona tu filtro de la base de datos para rellenar automáticamente el tipo y el ancho de banda. Si modificas los nm manualmente, el filtro pasa a Personalizado y deberás indicar el tipo (dual o quad). El sensor de cámara también actualiza el campo de píxeles en el FOV. La exposición mínima se actualiza en tiempo real.";
        i18n.zh.info_filter_modal    = "从数据库选择滤镜可自动填写类型和带宽。手动修改nm值后，滤镜将切换为自定义，需要指定类型（双波段或四波段）。相机传感器选择同步更新FOV像素字段。底部最短曝光时间实时更新。";

        i18n.it.save_cam_title = "Salva Sensore";
        i18n.en.save_cam_title = "Save Sensor";
        i18n.es.save_cam_title = "Guardar Sensor";
        i18n.zh.save_cam_title = "保存传感器";

        i18n.it.del_cam_title  = "Elimina Sensore Salvato";
        i18n.en.del_cam_title  = "Delete Saved Sensor";
        i18n.es.del_cam_title  = "Eliminar Sensor Guardado";
        i18n.zh.del_cam_title  = "删除已保存传感器";

        // ── Changelog v6.3 ──────────────────────────────────────────
        i18n.it.cl_v63_nb_title     = "Filtri Narrowband OSC — Dual/Quad-Band";
        i18n.en.cl_v63_nb_title     = "OSC Narrowband Filters — Dual/Quad-Band";
        i18n.es.cl_v63_nb_title     = "Filtros Narrowband OSC — Dual/Quad-Band";
        i18n.zh.cl_v63_nb_title     = "OSC窄带滤镜 — 双/四波段";

        i18n.it.cl_v63_nb_desc      = "Nuovo modal configurazione filtri narrowband OSC con database filtri commerciali (Optolong, Antlia, IDAS, Altair…). Calcolo fisico della posa minima basato su formula swamping: flusso Bortle × f-ratio × banda filtro × QE sensore × correzione blue-shift. Analisi strategica aggiornata.";
        i18n.en.cl_v63_nb_desc      = "New OSC narrowband filter configuration modal with commercial filter database (Optolong, Antlia, IDAS, Altair…). Physical minimum exposure calculation based on swamping formula: Bortle flux × f-ratio × filter bandwidth × sensor QE × blue-shift correction. Updated strategic analysis.";
        i18n.es.cl_v63_nb_desc      = "Nuevo modal de configuración de filtros narrowband OSC con base de datos de filtros comerciales (Optolong, Antlia, IDAS, Altair…). Cálculo físico de la exposición mínima basado en la fórmula swamping. Análisis estratégico actualizado.";
        i18n.zh.cl_v63_nb_desc      = "全新OSC窄带滤镜配置弹窗，含商业滤镜数据库（Optolong、Antlia、IDAS、Altair等）。基于swamping物理公式计算最短曝光时间：博特尔通量×焦比×滤镜带宽×传感器QE×蓝移修正。战略分析已更新。";

        i18n.it.cl_v63_sensor_title = "Salvataggio sensore + database corretto";
        i18n.en.cl_v63_sensor_title = "Sensor save + corrected database";
        i18n.es.cl_v63_sensor_title = "Guardar sensor + base de datos corregida";
        i18n.zh.cl_v63_sensor_title = "保存传感器 + 数据库修正";

        i18n.it.cl_v63_sensor_desc  = "Pulsanti Salva/Elimina per sensore camera nel FOV. Database PlayerOne completamente corretto (Saturn→IMX533, Poseidon→IMX571, Artemis-C→IMX294/M→IMX492, Zeus→IMX455). Aggiunta QHY miniCAM8 (IMX585). Sensore sincronizzato con modal filtri.";
        i18n.en.cl_v63_sensor_desc  = "Save/Delete buttons for camera sensor in FOV. PlayerOne database fully corrected (Saturn→IMX533, Poseidon→IMX571, Artemis-C→IMX294/M→IMX492, Zeus→IMX455). Added QHY miniCAM8 (IMX585). Sensor synced with filter modal.";
        i18n.es.cl_v63_sensor_desc  = "Botones Guardar/Eliminar para el sensor de cámara en el FOV. Base de datos PlayerOne completamente corregida. Añadida QHY miniCAM8 (IMX585). Sensor sincronizado con el modal de filtros.";
        i18n.zh.cl_v63_sensor_desc  = "FOV中相机传感器的保存/删除按钮。PlayerOne数据库完全修正（Saturn→IMX533，Poseidon→IMX571，Artemis-C→IMX294/M→IMX492，Zeus→IMX455）。新增QHY miniCAM8（IMX585）。传感器与滤镜弹窗同步。";

        i18n.it.cl_v63_vis_title    = "Warning visibilità target + fix finestra sessione";
        i18n.en.cl_v63_vis_title    = "Target visibility warning + session window fix";
        i18n.es.cl_v63_vis_title    = "Aviso visibilidad objetivo + corrección ventana";
        i18n.zh.cl_v63_vis_title    = "目标可见性警告 + 会话窗口修复";

        i18n.it.cl_v63_vis_desc     = "Quando il target non è visibile (mai sopra 30° o già tramontato), Fine Sessione diventa rosso con avviso. Finestra a zero evita il calcolo errato di 24h. Genera Sequenza Ottimale bloccato con messaggio esplicativo.";
        i18n.en.cl_v63_vis_desc     = "When the target is not visible (never above 30° or already set), End Session turns red with a warning. Zero window prevents the erroneous 24h calculation. Generate Optimal Sequence blocked with explanatory message.";
        i18n.es.cl_v63_vis_desc     = "Cuando el objetivo no es visible, Fin de Sesión se vuelve rojo con aviso. Ventana cero evita el cálculo erróneo de 24h. Generar Secuencia Óptima bloqueado con mensaje explicativo.";
        i18n.zh.cl_v63_vis_desc     = "当目标不可见时，结束时间变红并显示警告。零窗口防止错误的24小时计算。生成最优序列被阻止并显示说明信息。";

        i18n.it.cl_v63_coord_title  = "Correzione coordinate DSO database";
        i18n.en.cl_v63_coord_title  = "DSO database coordinate fix";
        i18n.es.cl_v63_coord_title  = "Corrección de coordenadas base de datos DSO";
        i18n.zh.cl_v63_coord_title  = "DSO数据库坐标修正";

        i18n.it.cl_v63_coord_desc   = "Verifica sistematica di 78 oggetti del database: 5 errori significativi corretti. Sh2-240 (Simeis 147): 31 min RA — il più grave. NGC 3628: 22 min. IC 410 (Girini): 5 min. NGC 2174 (Testa di Scimmia): 4 min. NGC 2359 (Thor's Helmet): 1.7 min. Database sensori PlayerOne verificato da siti ufficiali (Saturn→IMX533, Poseidon→IMX571, ecc.).";
        i18n.en.cl_v63_coord_desc   = "Systematic verification of 78 database objects: 5 significant errors corrected. Sh2-240 (Simeis 147): 31 min RA — most severe. NGC 3628: 22 min. IC 410 (Tadpoles): 5 min. NGC 2174 (Monkey Head): 4 min. NGC 2359 (Thor's Helmet): 1.7 min. PlayerOne sensor database verified from official sites.";
        i18n.es.cl_v63_coord_desc   = "Verificación sistemática de 78 objetos: 5 errores significativos corregidos. Sh2-240 (Simeis 147): 31 min AR — el más grave. NGC 3628: 22 min. IC 410 (Renacuajos): 5 min. NGC 2174 (Cabeza de Mono): 4 min. NGC 2359 (Casco de Thor): 1,7 min. Base de datos de sensores PlayerOne verificada.";
        i18n.zh.cl_v63_coord_desc   = "对数据库78个天体进行系统验证，修正5处重大错误。Sh2-240（面条星云）：赤经误差31分钟——最严重。NGC 3628：22分钟。IC 410（蝌蚪星云）：5分钟。NGC 2174（猴头星云）：4分钟。NGC 2359（雷神头盔）：1.7分钟。PlayerOne传感器数据库已根据官方网站核实。";

        i18n.it.cl_v63_db_title     = "M43 nel database + fix ricerca Messier";
        i18n.en.cl_v63_db_title     = "M43 in database + Messier search fix";
        i18n.es.cl_v63_db_title     = "M43 en la base de datos + fix búsqueda Messier";
        i18n.zh.cl_v63_db_title     = "M43加入数据库 + Messier搜索修复";

        i18n.it.cl_v63_db_desc      = "Aggiunta NGC 1982 (Nebulosa De Mairan / M43). Fix ricerca Messier: query Wikidata usa \"Messier N\" invece di \"MN\" — elimina risultati incongrui come autostrade ungheresi. HDR automatico attivato per M42 (Trapezio, 10s).";
        i18n.en.cl_v63_db_desc      = "Added NGC 1982 (De Mairan's Nebula / M43). Messier search fix: Wikidata query now uses \"Messier N\" instead of \"MN\" — eliminates incongruous results like Hungarian motorways. Automatic HDR activated for M42 (Trapezium, 10s).";
        i18n.es.cl_v63_db_desc      = "Añadida NGC 1982 (Nebulosa De Mairan / M43). Fix búsqueda Messier: la consulta Wikidata ahora usa \"Messier N\" — elimina resultados incongruentes como autopistas húngaras. HDR automático activado para M42 (Trapezoide, 10s).";
        i18n.zh.cl_v63_db_desc      = "新增NGC 1982（德·迈兰星云/M43）。Messier搜索修复：Wikidata查询现使用\"Messier N\"而非\"MN\"——消除如匈牙利高速公路等不相关结果。M42（四边形星团，10秒）自动启用HDR。";

        // ── Changelog v6.4 ──
        i18n.it.cl_v64_accessory_title = "Selettore Accessorio Ottico (Barlow / Riduttore)";
        i18n.en.cl_v64_accessory_title = "Optical Accessory Selector (Barlow / Reducer)";
        i18n.es.cl_v64_accessory_title = "Selector de Accesorio Óptico (Barlow / Reductor)";
        i18n.zh.cl_v64_accessory_title = "光学附件选择器（巴罗镜/减焦镜）";

        i18n.it.cl_v64_accessory_desc = "Nuovo pulsante affianco al titolo del Simulatore FOV: seleziona Barlow (1.5×–5×) o Riduttore (0.63×–0.85×) oppure un valore custom. La focale effettiva viene mostrata nel riquadro Campo Inquadrato e propagata a tutti i calcoli: FOV, campionamento, f/ratio, tempi di posa Smart e formula swamping filtri OSC.";
        i18n.en.cl_v64_accessory_desc = "New button next to the FOV Simulator title: select a Barlow (1.5×–5×) or Reducer (0.63×–0.85×) or a custom value. The effective focal length is displayed in the Field of View box and propagated to all calculations: FOV, sampling, f/ratio, Smart exposure times and OSC filter swamping formula.";
        i18n.es.cl_v64_accessory_desc = "Nuevo botón junto al título del Simulador FOV: selecciona una Barlow (1.5×–5×) o un Reductor (0.63×–0.85×) o un valor personalizado. La focal efectiva se muestra en el recuadro de Campo y se propaga a todos los cálculos: FOV, muestreo, f/ratio, tiempos Smart y fórmula swamping de filtros OSC.";
        i18n.zh.cl_v64_accessory_desc = "在FOV模拟器标题旁新增按钮：可选择巴罗镜（1.5×–5×）、减焦镜（0.63×–0.85×）或自定义倍率。有效焦距显示在视场框中，并传递至所有计算：FOV、采样、f值、Smart曝光时间和OSC滤镜swamping公式。";

        i18n.it.cl_v64_overhead_title = "Overhead tecnico per frame (Light, Dark, Bias)";
        i18n.en.cl_v64_overhead_title = "Per-frame technical overhead (Light, Dark, Bias)";
        i18n.es.cl_v64_overhead_title = "Sobrecarga técnica por fotograma (Light, Dark, Bias)";
        i18n.zh.cl_v64_overhead_title = "每帧技术开销（Light、Dark、Bias）";

        i18n.it.cl_v64_overhead_desc = "Readout sensore, download USB e salvataggio FITS sono ora contabilizzati nel budget di sessione. Formula: ~1.2s + 0.08s/MP per Light e Dark (es. ~3s @ 20MP, ~5s @ 45MP FF); ~0.8s + 0.05s/MP per Bias. L'icona ⚙️ sul totale di ogni riga mostra il dettaglio. Risolve i residui negativi nella sequenza ottimale.";
        i18n.en.cl_v64_overhead_desc = "Sensor readout, USB download and FITS save are now accounted for in the session budget. Formula: ~1.2s + 0.08s/MP for Light and Dark (e.g. ~3s @ 20MP, ~5s @ 45MP FF); ~0.8s + 0.05s/MP for Bias. The ⚙️ icon on each row total shows the detail. Fixes negative residuals in the optimal sequence.";
        i18n.es.cl_v64_overhead_desc = "Lectura del sensor, descarga USB y guardado FITS se contabilizan ahora en el presupuesto de sesión. Fórmula: ~1.2s + 0.08s/MP para Light y Dark (p.ej. ~3s @ 20MP, ~5s @ 45MP FF); ~0.8s + 0.05s/MP para Bias. El icono ⚙️ en cada total de fila muestra el detalle. Corrige residuos negativos en la secuencia óptima.";
        i18n.zh.cl_v64_overhead_desc = "传感器读出、USB传输和FITS保存现已计入会话预算。公式：Light和Dark约为1.2秒+0.08秒/百万像素（如20MP约3秒，全画幅45MP约5秒）；Bias约为0.8秒+0.05秒/百万像素。每行总计的⚙️图标显示详情。修复了最优序列中的负余量问题。";

        i18n.it.cl_v64_protot_title = "Colonna Totale nella griglia PRO";
        i18n.en.cl_v64_protot_title = "Total column in the PRO grid";
        i18n.es.cl_v64_protot_title = "Columna Total en la cuadrícula PRO";
        i18n.zh.cl_v64_protot_title = "PRO表格新增总计列";

        i18n.it.cl_v64_protot_desc = "La modalità PRO mostra ora il tempo totale per ogni riga (Light, HDR, Dark, Bias) con overhead incluso — identico alla visualizzazione Smart. Icona ⚙️ con tooltip sul contributo dell'overhead tecnico.";
        i18n.en.cl_v64_protot_desc = "PRO mode now shows the total time for each row (Light, HDR, Dark, Bias) with overhead included — identical to the Smart display. ⚙️ icon with tooltip on the technical overhead contribution.";
        i18n.es.cl_v64_protot_desc = "El modo PRO muestra ahora el tiempo total por fila (Light, HDR, Dark, Bias) con overhead incluido — idéntico a la vista Smart. Icono ⚙️ con tooltip sobre el overhead técnico.";
        i18n.zh.cl_v64_protot_desc = "PRO模式现在显示每行（Light、HDR、Dark、Bias）的总时间（含开销）——与Smart显示相同。⚙️图标带有技术开销的工具提示。";

        i18n.it.cl_v64_fixes_title = "Fix ripristino preset + database filtri Askar";
        i18n.en.cl_v64_fixes_title = "Preset restore fix + Askar filter database";
        i18n.es.cl_v64_fixes_title = "Fix restauración preset + base de datos filtros Askar";
        i18n.zh.cl_v64_fixes_title = "预设恢复修复 + Askar滤镜数据库";

        i18n.it.cl_v64_fixes_desc = "Fix: i select Telescopio e Sensore ora si ripristinano correttamente al ricaricamento. Aggiunti filtri Askar C1/C2 (50nm), D1/D2 (15nm), E1/E2 (8nm dual-band). Corretti Optolong L-eNhance (da 14nm a 34nm) e Svbony SV220 (da 10nm a 14nm).";
        i18n.en.cl_v64_fixes_desc = "Fix: Telescope and Sensor selects now restore correctly on reload. Added Askar filters C1/C2 (50nm), D1/D2 (15nm), E1/E2 (8nm dual-band). Corrected Optolong L-eNhance (from 14nm to 34nm) and Svbony SV220 (from 10nm to 14nm).";
        i18n.es.cl_v64_fixes_desc = "Fix: los selectores Telescopio y Sensor ahora se restauran correctamente al recargar. Añadidos filtros Askar C1/C2 (50nm), D1/D2 (15nm), E1/E2 (8nm dual-band). Corregidos Optolong L-eNhance (de 14nm a 34nm) y Svbony SV220 (de 10nm a 14nm).";
        i18n.zh.cl_v64_fixes_desc = "修复：望远镜和传感器选择框现在在重新加载时能正确恢复。新增Askar滤镜C1/C2（50nm）、D1/D2（15nm）、E1/E2（8nm双波段）。修正Optolong L-eNhance（从14nm改为34nm）和Svbony SV220（从10nm改为14nm）。";

        // ── Changelog v6.4 — sessione 2 ──────────────────────────────────────
        i18n.it.cl_v64_lp_legend_title = "Legenda LP Lorenz 2024 — 9 livelli Bortle";
        i18n.en.cl_v64_lp_legend_title = "LP Lorenz 2024 legend — 9 Bortle levels";
        i18n.es.cl_v64_lp_legend_title = "Leyenda LP Lorenz 2024 — 9 niveles Bortle";
        i18n.zh.cl_v64_lp_legend_title = "LP Lorenz 2024图例 — 9级博特尔";

        i18n.it.cl_v64_lp_legend_desc = "Nuova legenda compatta con 9 chip colorati (Bortle 1–9) campionati dalla colorbar ufficiale Lorenz 2024. I chip B3 e B4 sono bicolori per distinguere le due sotto-zone. Hover/tap mostra tooltip con zona Lorenz, range SQM, Bortle approssimativo e consiglio filtri. Disponibile in 4 lingue.";
        i18n.en.cl_v64_lp_legend_desc = "New compact legend with 9 colour-coded chips (Bortle 1–9) sampled from the official Lorenz 2024 colorbar. B3 and B4 chips are split-colour to distinguish sub-zones. Hover/tap shows a tooltip with Lorenz zone, SQM range, approximate Bortle and filter advice. Available in 4 languages.";
        i18n.es.cl_v64_lp_legend_desc = "Nueva leyenda compacta con 9 chips de colores (Bortle 1–9) muestreados de la colorbar oficial Lorenz 2024. Los chips B3 y B4 son bicolores para distinguir las subzonas. Hover/tap muestra tooltip con zona Lorenz, rango SQM, Bortle aproximado y consejo de filtros. Disponible en 4 idiomas.";
        i18n.zh.cl_v64_lp_legend_desc = "新增紧凑型图例，包含9个色块（博特尔1–9级），颜色来自Lorenz 2024官方色标。B3和B4色块采用双色设计以区分子区域。悬停/点击显示工具提示，含Lorenz区域、SQM范围、近似博特尔值和滤镜建议。支持4种语言。";

        i18n.it.cl_v64_bortle_auto_title = "Autorilevamento Bortle da mappa LP";
        i18n.en.cl_v64_bortle_auto_title = "Automatic Bortle detection from LP map";
        i18n.es.cl_v64_bortle_auto_title = "Detección automática de Bortle desde mapa LP";
        i18n.zh.cl_v64_bortle_auto_title = "从LP地图自动检测博特尔指数";

        i18n.it.cl_v64_bortle_auto_desc = "Il Bortle viene rilevato automaticamente ad ogni selezione della posizione (GPS o ricerca). Il sistema campiona il colore del tile Lorenz 2024 alle coordinate esatte e lo mappa al valore Bortle. Il dropdown si aggiorna con bordo arancione finché non si clicca Conferma — che diventa verde. Se non confermato, un banner avvisa nelle sezioni Smart/PRO.";
        i18n.en.cl_v64_bortle_auto_desc = "Bortle is detected automatically on every location selection (GPS or search). The system samples the Lorenz 2024 tile colour at the exact coordinates and maps it to the Bortle value. The dropdown updates with an orange border until Confirm is clicked — which turns green. If unconfirmed, a banner warns in the Smart/PRO sections.";
        i18n.es.cl_v64_bortle_auto_desc = "El Bortle se detecta automáticamente en cada selección de ubicación (GPS o búsqueda). El sistema muestrea el color del tile Lorenz 2024 en las coordenadas exactas y lo mapea al valor Bortle. El desplegable se actualiza con borde naranja hasta que se pulsa Confirmar — que se vuelve verde. Si no se confirma, un banner avisa en las secciones Smart/PRO.";
        i18n.zh.cl_v64_bortle_auto_desc = "每次选择位置（GPS或搜索）时自动检测博特尔值。系统采样精确坐标处的Lorenz 2024瓦片颜色并映射到博特尔值。下拉框更新并显示橙色边框，直到点击确认按钮后变为绿色。如未确认，Smart/PRO分析页面会显示警告横幅。";

        i18n.it.cl_v64_gps_title = "Geolocalizzazione GPS";
        i18n.en.cl_v64_gps_title = "GPS geolocation";
        i18n.es.cl_v64_gps_title = "Geolocalización GPS";
        i18n.zh.cl_v64_gps_title = "GPS定位";

        i18n.it.cl_v64_gps_desc = "Pulsante «Posizione attuale» affianco alla barra di ricerca per localizzarsi via GPS con reverse geocoding Nominatim. Il pulsante «Comincia» nella landing rileva automaticamente la posizione GPS al primo utilizzo. Se il luogo è già salvato, va direttamente al meteo.";
        i18n.en.cl_v64_gps_desc = "«Current location» button next to the search bar to locate via GPS with Nominatim reverse geocoding. The «Start» button on the landing page automatically detects GPS position on first use. If a location is already saved, it goes directly to the weather.";
        i18n.es.cl_v64_gps_desc = "Botón «Posición actual» junto a la barra de búsqueda para localizarse por GPS con geocodificación inversa de Nominatim. El botón «Comenzar» en la landing detecta automáticamente la posición GPS en el primer uso. Si ya hay una ubicación guardada, va directamente al tiempo.";
        i18n.zh.cl_v64_gps_desc = "搜索栏旁新增『当前位置』按钮，通过GPS和Nominatim逆向地理编码定位。首次使用时，着陆页的『开始』按钮自动检测GPS位置。如果已有保存的位置，则直接进入天气页面。";

        i18n.it.cl_v64_hdr_db_title = "HDR automatico per 15 oggetti DSO";
        i18n.en.cl_v64_hdr_db_title = "Automatic HDR for 15 DSO objects";
        i18n.es.cl_v64_hdr_db_title = "HDR automático para 15 objetos DSO";
        i18n.zh.cl_v64_hdr_db_title = "15个深空天体自动HDR";

        i18n.it.cl_v64_hdr_db_desc = "Campo hdr aggiunto nel database per M8, M13, M15, M20, M27, M31, M42, M45, M57, M81, M104, IC 434, NGC 3372, NGC 5139, NGC 6543. Il valore specifico per oggetto sovrascrive il generico di categoria. Tempi da 3s (NGC 6543) a 30s (M31).";
        i18n.en.cl_v64_hdr_db_desc = "hdr field added to the database for M8, M13, M15, M20, M27, M31, M42, M45, M57, M81, M104, IC 434, NGC 3372, NGC 5139, NGC 6543. The object-specific value overrides the generic category value. Times from 3s (NGC 6543) to 30s (M31).";
        i18n.es.cl_v64_hdr_db_desc = "Campo hdr añadido en la base de datos para M8, M13, M15, M20, M27, M31, M42, M45, M57, M81, M104, IC 434, NGC 3372, NGC 5139, NGC 6543. El valor específico por objeto sobreescribe el genérico de categoría. Tiempos de 3s (NGC 6543) a 30s (M31).";
        i18n.zh.cl_v64_hdr_db_desc = "为M8、M13、M15、M20、M27、M31、M42、M45、M57、M81、M104、IC 434、NGC 3372、NGC 5139、NGC 6543添加了hdr字段。对象专属值覆盖类别通用值。时间从3秒（NGC 6543）到30秒（M31）。";

        // ⚠️ AGGIORNARE VERSIONE QUI quando si rilascia una nuova versione:
        // cl_close_btn = testo del pulsante nel modal changelog (NON è hardcoded in index.html)
        // Aggiornare anche: title tag, badge navbar (>vX.X</button>), landing (>vX.X</span>), modal badge, pulsante "Inizia a usare" in index.html
        i18n.it.cl_close_btn = "Inizia a usare v6.6 🚀";
        i18n.en.cl_close_btn = "Start using v6.6 🚀";
        i18n.es.cl_close_btn = "Empezar a usar v6.6 🚀";
        i18n.zh.cl_close_btn = "开始使用 v6.6 🚀";

        i18n.it.cl1_title           = "Database telescopi e sensori ampliato";
        i18n.en.cl1_title           = "Expanded telescope and sensor database";
        i18n.es.cl1_title           = "Base de datos de telescopios y sensores ampliada";
        i18n.zh.cl1_title           = "望远镜与传感器数据库扩展";

        i18n.it.cl1_desc            = "60+ nuovi sensori ZWO, QHY, PlayerOne, Atik, Canon, Nikon, Sony — chip IMX generici inclusi.";
        i18n.en.cl1_desc            = "60+ new sensors from ZWO, QHY, PlayerOne, Atik, Canon, Nikon, Sony — generic IMX chips included.";
        i18n.es.cl1_desc            = "60+ nuevos sensores de ZWO, QHY, PlayerOne, Atik, Canon, Nikon, Sony — chips IMX genéricos incluidos.";
        i18n.zh.cl1_desc            = "新增60+款传感器，涵盖ZWO、QHY、PlayerOne、Atik、Canon、Nikon、Sony及通用IMX芯片。";

        i18n.it.cl2_title           = "Stima ore integrazione per categoria";
        i18n.en.cl2_title           = "Integration time estimate by category";
        i18n.es.cl2_title           = "Estimación de horas de integración por categoría";
        i18n.zh.cl2_title           = "按类别估算积分时间";

        i18n.it.cl2_desc            = "Sh2=12h, SNR=10h, LBN=8h, galassie=4h… calibrati sui consigli tattici reali. Unica fonte di verità per tutta l'app.";
        i18n.en.cl2_desc            = "Sh2=12h, SNR=10h, LBN=8h, galaxies=4h… calibrated on real tactical advice. Single source of truth across the whole app.";
        i18n.es.cl2_desc            = "Sh2=12h, SNR=10h, LBN=8h, galaxias=4h… calibrados según consejos tácticos reales. Fuente única de verdad para toda la app.";
        i18n.zh.cl2_desc            = "Sh2=12h、SNR=10h、LBN=8h、星系=4h……根据实际战术建议校准，为整个应用提供唯一数据来源。";

        i18n.it.cl3_title           = "Colonna HDR nelle griglie Smart e PRO";
        i18n.en.cl3_title           = "HDR column in Smart and PRO grids";
        i18n.es.cl3_title           = "Columna HDR en las cuadrículas Smart y PRO";
        i18n.zh.cl3_title           = "Smart和PRO网格中的HDR列";

        i18n.it.cl3_desc            = "Esposizione breve affiancata per nebulose planetarie e ammassi globulari. Export NINA e Report inclusi.";
        i18n.en.cl3_desc            = "Short exposure alongside for planetary nebulae and globular clusters. NINA export and Report included.";
        i18n.es.cl3_desc            = "Exposición corta paralela para nebulosas planetarias y cúmulos globulares. Exportación NINA e Informe incluidos.";
        i18n.zh.cl3_desc            = "为行星状星云和球状星团提供并排短曝光。包含NINA导出和报告功能。";

        i18n.it.cl4_title           = "Pesi filtri corretti";
        i18n.en.cl4_title           = "Corrected filter weights";
        i18n.es.cl4_title           = "Pesos de filtros corregidos";
        i18n.zh.cl4_title           = "滤镜权重修正";

        i18n.it.cl4_desc            = "L=1, ogni RGB selezionato=1/3 — indipendentemente da quanti RGB sono attivi. Warning solo per mix broadband+narrowband reale.";
        i18n.en.cl4_desc            = "L=1, each selected RGB=1/3 — regardless of how many RGBs are active. Warning only for real broadband+narrowband mix.";
        i18n.es.cl4_desc            = "L=1, cada RGB seleccionado=1/3 — independientemente de cuántos RGB estén activos. Aviso solo para mix real broadband+narrowband.";
        i18n.zh.cl4_desc            = "L=1，每个选定的RGB=1/3——无论激活多少个RGB。仅在真正的宽带+窄带混合时显示警告。";

        i18n.it.cl5_title           = "Stima f-ratio aggiornata in tempo reale";
        i18n.en.cl5_title           = "Real-time f-ratio estimate update";
        i18n.es.cl5_title           = "Estimación de f-ratio actualizada en tiempo real";
        i18n.zh.cl5_title           = "实时更新焦比估算";

        i18n.it.cl5_desc            = "Il pannello AI ricalcola immediatamente le ore stimate al cambio di telescopio o sensore.";
        i18n.en.cl5_desc            = "The AI panel immediately recalculates estimated hours when the telescope or sensor changes.";
        i18n.es.cl5_desc            = "El panel IA recalcula inmediatamente las horas estimadas al cambiar telescopio o sensor.";
        i18n.zh.cl5_desc            = "更换望远镜或传感器时，AI面板立即重新计算估计小时数。";

        i18n.it.cl6_title           = "Fix penalità lunare";
        i18n.en.cl6_title           = "Lunar penalty fix";
        i18n.es.cl6_title           = "Corrección de penalización lunar";
        i18n.zh.cl6_title           = "月光惩罚修正";

        i18n.it.cl6_desc            = "Il calcolo dell'inquinamento lunare ora azzera correttamente la penalità quando la Luna è sotto l'orizzonte — niente più sovrastime nelle notti con Luna bassa.";
        i18n.en.cl6_desc            = "Moon pollution calculation now correctly zeroes the penalty when the Moon is below the horizon — no more overestimates on nights with a low Moon.";
        i18n.es.cl6_desc            = "El cálculo de contaminación lunar ahora anula correctamente la penalización cuando la Luna está bajo el horizonte — sin más sobreestimaciones en noches con Luna baja.";
        i18n.zh.cl6_desc            = "月光污染计算现在在月亮低于地平线时正确归零惩罚——不再因月亮较低的夜晚产生高估。";

        i18n.it.cl7_title           = "Layer Inquinamento Luminoso con scala Bortle";
        i18n.en.cl7_title           = "Light Pollution layer with Bortle scale";
        i18n.es.cl7_title           = "Capa de Contaminación Lumínica con escala Bortle";
        i18n.zh.cl7_title           = "含博特尔等级的光污染图层";

        i18n.it.cl7_desc            = "Nuovo layer mappa (Lorenz 2024 / VIIRS) con colori Bortle 1→9 (blu pristino → bianco urbano). Legenda interattiva e tooltip sul selettore Bortle.";
        i18n.en.cl7_desc            = "New map layer (Lorenz 2024 / VIIRS) with Bortle 1→9 colors (pristine blue → urban white). Interactive legend and tooltip on Bortle selector.";
        i18n.es.cl7_desc            = "Nueva capa de mapa (Lorenz 2024 / VIIRS) con colores Bortle 1→9 (azul prístino → blanco urbano). Leyenda interactiva y tooltip en el selector Bortle.";
        i18n.zh.cl7_desc            = "新地图图层（Lorenz 2024 / VIIRS），显示博特尔1→9色阶（原始蓝→城市白）。交互式图例和博特尔选择器工具提示。";

        i18n.it.cl8_title           = "Bortle integrato nell'algoritmo predittivo";
        i18n.en.cl8_title           = "Bortle integrated in the predictive algorithm";
        i18n.es.cl8_title           = "Bortle integrado en el algoritmo predictivo";
        i18n.zh.cl8_title           = "博特尔指数集成至预测算法";

        i18n.it.cl8_desc            = "Il selettore Bortle ora influenza direttamente la stima delle ore. Cieli bui (1–4) riducono il tempo; cieli urbani (6–9) lo aumentano. Sistema avvisa se la combinazione di fattori è irragionevole.";
        i18n.en.cl8_desc            = "The Bortle selector now directly affects the hour estimate. Dark skies (1–4) reduce time; urban skies (6–9) increase it. System warns when the factor combination is unreasonable.";
        i18n.es.cl8_desc            = "El selector Bortle ahora afecta directamente la estimación de horas. Cielos oscuros (1–4) reducen el tiempo; cielos urbanos (6–9) lo aumentan. El sistema avisa si la combinación de factores es irrazonable.";
        i18n.zh.cl8_desc            = "博特尔选择器现在直接影响小时估算。暗天空（1–4）减少时间；城市天空（6–9）增加时间。当因素组合不合理时系统发出警告。";

        i18n.it.cl9_title           = "Barra meteo: alba viola, tramonto arancione";
        i18n.en.cl9_title           = "Weather bar: purple dawn, orange dusk";
        i18n.es.cl9_title           = "Barra meteorológica: amanecer violeta, atardecer naranja";
        i18n.zh.cl9_title           = "气象条：紫色黎明，橙色黄昏";

        i18n.it.cl9_desc            = "La timeline meteo distingue ora le due fasi crepuscolari: tramonto (arancione) e alba (viola), calcolati da SunCalc per la tua posizione.";
        i18n.en.cl9_desc            = "The weather timeline now distinguishes the two twilight phases: dusk (orange) and dawn (purple), calculated by SunCalc for your location.";
        i18n.es.cl9_desc            = "La línea de tiempo meteorológica distingue ahora las dos fases crepusculares: atardecer (naranja) y amanecer (violeta), calculados por SunCalc para tu ubicación.";
        i18n.zh.cl9_desc            = "气象时间线现在区分两个暮光阶段：黄昏（橙色）和黎明（紫色），由SunCalc根据您的位置计算。";

        function t(key) { return i18n[lang][key] || key; }

        i18n.it.info_mn_nina = "<b>Orari predefiniti per la notte</b><br><br>L'orario di <b>inizio</b> viene impostato automaticamente sull'alba astronomica (quando il Sole scende a –18°) oppure sul momento in cui il soggetto supera i 30° sull'orizzonte — viene usato il valore più tardivo tra i due.<br><br>L'orario di <b>fine</b> coincide con l'alba astronomica del mattino successivo.<br><br>Puoi modificare liberamente questi orari per adattarli alle tue esigenze reali.";
        i18n.en.info_mn_nina = "<b>Default night times</b><br><br>The <b>start</b> time is automatically set to astronomical dusk (Sun at –18°) or the moment the target rises above 30° — whichever comes later.<br><br>The <b>end</b> time coincides with the following morning's astronomical dawn.<br><br>You can freely adjust these times to match your actual needs.";
        i18n.es.info_mn_nina = "<b>Horarios predeterminados de la noche</b><br><br>El horario de <b>inicio</b> se establece automáticamente al anochecer astronómico (Sol a –18°) o cuando el objetivo supera los 30° sobre el horizonte — se usa el valor más tardío.<br><br>El horario de <b>fin</b> coincide con el amanecer astronómico de la mañana siguiente.<br><br>Puedes modificar estos horarios libremente para adaptarlos a tus necesidades.";
        i18n.zh.info_mn_nina = "<b>默认夜间时间</b><br><br><b>开始</b>时间自动设置为天文薄暮（太阳位于–18°）或目标升至地平线30°以上的时刻——取两者中较晚的一个。<br><br><b>结束</b>时间与次日清晨的天文晨光一致。<br><br>您可以根据实际需要自由调整这些时间。";

        // ── Landing page ──
        i18n.it.stepper_pos        = "Localizzazione";
        i18n.en.stepper_pos        = "Location";
        i18n.es.stepper_pos        = "Localización";
        i18n.zh.stepper_pos        = "定位";

        i18n.it.stepper_dso        = "DSO";
        i18n.en.stepper_dso        = "DSO";
        i18n.es.stepper_dso        = "DSO";
        i18n.zh.stepper_dso        = "深空天体";

        i18n.it.stepper_fov        = "Setup ottico";
        i18n.en.stepper_fov        = "Optical setup";
        i18n.es.stepper_fov        = "Setup óptico";
        i18n.zh.stepper_fov        = "光学设置";

        i18n.it.stepper_seq        = "Sequenza";
        i18n.en.stepper_seq        = "Sequence";
        i18n.es.stepper_seq        = "Secuencia";
        i18n.zh.stepper_seq        = "序列";

        i18n.it.stepper_exp        = "Esportazione";
        i18n.en.stepper_exp        = "Export";
        i18n.es.stepper_exp        = "Exportación";
        i18n.zh.stepper_exp        = "导出";

        i18n.it.land_badge         = "Suite completa per astrofotografi";
        i18n.en.land_badge         = "Complete astrophotography suite";
        i18n.es.land_badge         = "Suite completa para astrofotógrafos";
        i18n.zh.land_badge         = "天文摄影一体化套件";

        i18n.it.land_title1        = "Pianifica la notte";
        i18n.en.land_title1        = "Plan the perfect";
        i18n.es.land_title1        = "Planifica la noche";
        i18n.zh.land_title1        = "规划完美";

        i18n.it.land_title2        = "perfetta";
        i18n.en.land_title2        = "night";
        i18n.es.land_title2        = "perfecta";
        i18n.zh.land_title2        = "拍摄之夜";

        i18n.it.land_sub           = "Meteo tattico, planetario predittivo, calcolo ottico e generazione automatica di sequenze per N.I.N.A. — tutto in un'unica app.";
        i18n.en.land_sub           = "Tactical weather, predictive planetarium, optical calculator and automatic sequence generation for N.I.N.A. — all in one app.";
        i18n.es.land_sub           = "Meteorología táctica, planetario predictivo, cálculo óptico y generación automática de secuencias para N.I.N.A. — todo en una sola app.";
        i18n.zh.land_sub           = "战术天气、预测星历、光学计算和自动生成 N.I.N.A. 序列 — 一体化应用。";

        i18n.it.land_cta_open      = "Apri Dashboard";
        i18n.en.land_cta_open      = "Open Dashboard";
        i18n.es.land_cta_open      = "Abrir Dashboard";
        i18n.zh.land_cta_open      = "打开仪表板";

        i18n.it.land_cta_weather   = "Meteo tattico";
        i18n.en.land_cta_weather   = "Tactical weather";
        i18n.es.land_cta_weather   = "Meteorología";
        i18n.zh.land_cta_weather   = "战术天气";

        i18n.it.land_cta_smart     = "Calcolatore Smart";
        i18n.en.land_cta_smart     = "Smart calculator";
        i18n.es.land_cta_smart     = "Calculadora Smart";
        i18n.zh.land_cta_smart     = "智能计算器";

        i18n.it.land_cta_pro       = "Calcolatore PRO";
        i18n.en.land_cta_pro       = "PRO calculator";
        i18n.es.land_cta_pro       = "Calculadora PRO";
        i18n.zh.land_cta_pro       = "PRO 计算器";

        i18n.it.land_cta_start     = "Comincia";
        i18n.en.land_cta_start     = "Get Started";
        i18n.es.land_cta_start     = "Comenzar";
        i18n.zh.land_cta_start     = "开始使用";

        i18n.it.land_preview_night = "Finestra notturna";
        i18n.en.land_preview_night = "Night window";
        i18n.es.land_preview_night = "Ventana nocturna";
        i18n.zh.land_preview_night = "夜间窗口";

        i18n.it.land_preview_seq   = "Sequenza ottimale";
        i18n.en.land_preview_seq   = "Optimal sequence";
        i18n.es.land_preview_seq   = "Secuencia óptima";
        i18n.zh.land_preview_seq   = "最优序列";

        i18n.it.land_preview_tl    = "Timeline meteo — prossime 24h";
        i18n.en.land_preview_tl    = "Weather timeline — next 24h";
        i18n.es.land_preview_tl    = "Línea de tiempo — próximas 24h";
        i18n.zh.land_preview_tl    = "天气时间轴 — 未来24小时";

        i18n.it.land_stat_dso      = "oggetti DSO";
        i18n.en.land_stat_dso      = "DSO objects";
        i18n.es.land_stat_dso      = "objetos DSO";
        i18n.zh.land_stat_dso      = "深空天体";

        i18n.it.land_stat_lang     = "lingue";
        i18n.en.land_stat_lang     = "languages";
        i18n.es.land_stat_lang     = "idiomas";
        i18n.zh.land_stat_lang     = "语言";

        i18n.it.land_stat_export   = "export nativo";
        i18n.en.land_stat_export   = "native export";
        i18n.es.land_stat_export   = "exportación nativa";
        i18n.zh.land_stat_export   = "原生导出";

        i18n.it.land_stat_pwa      = "installabile su mobile";
        i18n.en.land_stat_pwa      = "installable on mobile";
        i18n.es.land_stat_pwa      = "instalable en móvil";
        i18n.zh.land_stat_pwa      = "可安装到手机";

        i18n.it.land_feat_sup      = "sezioni disponibili";
        i18n.en.land_feat_sup      = "available sections";
        i18n.es.land_feat_sup      = "secciones disponibles";
        i18n.zh.land_feat_sup      = "可用功能";

        i18n.it.land_feat_title    = "Tutto quello che ti serve, in un'unica app";
        i18n.en.land_feat_title    = "Everything you need, in one app";
        i18n.es.land_feat_title    = "Todo lo que necesitas, en una sola app";
        i18n.zh.land_feat_title    = "一切所需，尽在一处";

        i18n.it.land_f1_step       = "Passo 1";
        i18n.en.land_f1_step       = "Step 1";
        i18n.es.land_f1_step       = "Paso 1";
        i18n.zh.land_f1_step       = "第1步";

        i18n.it.land_f1_name       = "Meteo Tattico";
        i18n.en.land_f1_name       = "Tactical Weather";
        i18n.es.land_f1_name       = "Meteorología Táctica";
        i18n.zh.land_f1_name       = "战术天气";

        i18n.it.land_f1_desc       = "Nuvole, jet stream, umidità e mappa LP con Bortle autorilevato";
        i18n.en.land_f1_desc       = "Clouds, jet stream, humidity and light pollution map with auto-detected Bortle";
        i18n.es.land_f1_desc       = "Nubes, corriente en chorro, humedad y mapa LP con Bortle autodetectado";
        i18n.zh.land_f1_desc       = "云量、急流、湿度和光污染地图，自动检测博特尔指数";

        i18n.it.land_f2_step       = "Passo 2";
        i18n.en.land_f2_step       = "Step 2";
        i18n.es.land_f2_step       = "Paso 2";
        i18n.zh.land_f2_step       = "第2步";

        i18n.it.land_f2_name       = "Planetario Ibrido";
        i18n.en.land_f2_name       = "Hybrid Planetarium";
        i18n.es.land_f2_name       = "Planetario Híbrido";
        i18n.zh.land_f2_name       = "混合星历";

        i18n.it.land_f2_desc       = "90 DSO interni + ricerca SIMBAD su qualsiasi oggetto del cielo";
        i18n.en.land_f2_desc       = "90 built-in DSOs + SIMBAD search for any sky object";
        i18n.es.land_f2_desc       = "90 DSO integrados + búsqueda SIMBAD para cualquier objeto del cielo";
        i18n.zh.land_f2_desc       = "90个内置深空天体 + SIMBAD搜索任意天体";

        i18n.it.land_f3_step       = "Passi 3–4";
        i18n.en.land_f3_step       = "Steps 3–4";
        i18n.es.land_f3_step       = "Pasos 3–4";
        i18n.zh.land_f3_step       = "第3–4步";

        i18n.it.land_f3_name       = "Simulatore FOV";
        i18n.en.land_f3_name       = "FOV Simulator";
        i18n.es.land_f3_name       = "Simulador FOV";
        i18n.zh.land_f3_name       = "视场模拟器";

        i18n.it.land_f3_desc       = "Inquadra su DSS reale, imposta il setup e verifica il campionamento";
        i18n.en.land_f3_desc       = "Frame on real DSS imagery, configure your setup and check sampling";
        i18n.es.land_f3_desc       = "Encuadra en imágenes DSS reales, configura el setup y verifica el muestreo";
        i18n.zh.land_f3_desc       = "在真实DSS图像上构图，配置设备并检查采样";

        i18n.it.land_f4_step       = "Passo 5";
        i18n.en.land_f4_step       = "Step 5";
        i18n.es.land_f4_step       = "Paso 5";
        i18n.zh.land_f4_step       = "第5步";

        i18n.it.land_f4_name       = "Pianificazione Smart";
        i18n.en.land_f4_name       = "Smart Planning";
        i18n.es.land_f4_name       = "Planificación Smart";
        i18n.zh.land_f4_name       = "智能规划";

        i18n.it.land_f4_desc       = "Un assistente ti guida nella scelta di tempi e filtri in base al soggetto, setup e seeing";
        i18n.en.land_f4_desc       = "An assistant guides you in choosing exposures and filters based on target, setup and seeing";
        i18n.es.land_f4_desc       = "Un asistente te guía en la elección de tiempos y filtros según el objetivo, setup y seeing";
        i18n.zh.land_f4_desc       = "助手根据目标、设备和视宁度指导您选择曝光时间和滤镜";

        i18n.it.land_f5_step       = "Passo 5 PRO";
        i18n.en.land_f5_step       = "Step 5 PRO";
        i18n.es.land_f5_step       = "Paso 5 PRO";
        i18n.zh.land_f5_step       = "第5步 PRO";

        i18n.it.land_f5_name       = "Pianificazione PRO";
        i18n.en.land_f5_name       = "PRO Planning";
        i18n.es.land_f5_name       = "Planificación PRO";
        i18n.zh.land_f5_name       = "PRO规划";

        i18n.it.land_f5_desc       = "Controllo totale su pose, filtri, HDR e tempi per ogni canale";
        i18n.en.land_f5_desc       = "Full control over frames, filters, HDR and times for each channel";
        i18n.es.land_f5_desc       = "Control total sobre poses, filtros, HDR y tiempos por cada canal";
        i18n.zh.land_f5_desc       = "完全控制每个通道的帧数、滤镜、HDR和曝光时间";

        i18n.it.land_f6_step       = "Passo 6";
        i18n.en.land_f6_step       = "Step 6";
        i18n.es.land_f6_step       = "Paso 6";
        i18n.zh.land_f6_step       = "第6步";

        i18n.it.land_f6_name       = "Esportazione";
        i18n.en.land_f6_name       = "Export";
        i18n.es.land_f6_name       = "Exportación";
        i18n.zh.land_f6_name       = "导出";

        i18n.it.land_f6_desc       = "Sequenza N.I.N.A., report HTML e coordinate AsiAir";
        i18n.en.land_f6_desc       = "N.I.N.A. sequence, HTML report and AsiAir coordinates";
        i18n.es.land_f6_desc       = "Secuencia N.I.N.A., informe HTML y coordenadas AsiAir";
        i18n.zh.land_f6_desc       = "N.I.N.A.序列、HTML报告和AsiAir坐标";

        i18n.it.land_privacy       = "Questa app non invia alcun dato a terzi. Tutto viene salvato localmente sul tuo dispositivo.";
        i18n.en.land_privacy       = "This app does not send any data to third parties. Everything is saved locally on your device.";
        i18n.es.land_privacy       = "Esta app no envía ningún dato a terceros. Todo se guarda localmente en tu dispositivo.";
        i18n.zh.land_privacy       = "本应用不向任何第三方发送数据。所有内容均保存在您的设备本地。";

        i18n.it.land_contact       = "Contattaci";
        i18n.en.land_contact       = "Contact us";
        i18n.es.land_contact       = "Contáctanos";
        i18n.zh.land_contact       = "联系我们";

        i18n.it.land_visits = "Visite totali:";
        i18n.en.land_visits = "Total visits:";
        i18n.es.land_visits = "Visitas totales:";
        i18n.zh.land_visits = "总访问量:";

        i18n.it.nav_home    = "Home";    i18n.en.nav_home    = "Home";    i18n.es.nav_home    = "Inicio";   i18n.zh.nav_home    = "首页";
        i18n.it.nav_weather = "Meteo";   i18n.en.nav_weather = "Weather"; i18n.es.nav_weather = "Meteo";    i18n.zh.nav_weather = "天气";
        i18n.it.nav_smart   = "Smart";   i18n.en.nav_smart   = "Smart";   i18n.es.nav_smart   = "Smart";    i18n.zh.nav_smart   = "智能";
        i18n.it.nav_pro     = "PRO";     i18n.en.nav_pro     = "PRO";     i18n.es.nav_pro     = "PRO";      i18n.zh.nav_pro     = "PRO";

        // ── Changelog v6.0 ──
        i18n.it.cl1_title = "Nuova landing page";
        i18n.en.cl1_title = "New landing page";
        i18n.es.cl1_title = "Nueva página de inicio";
        i18n.zh.cl1_title = "全新主页";

        i18n.it.cl1_desc = "Pagina di benvenuto con anteprima live della finestra notturna e della sequenza ottimale. Navigazione diretta a Meteo, Smart e PRO.";
        i18n.en.cl1_desc = "Welcome page with live preview of the night window and optimal sequence. Direct navigation to Weather, Smart and PRO.";
        i18n.es.cl1_desc = "Página de bienvenida con vista previa en vivo de la ventana nocturna y la secuencia óptima. Navegación directa a Meteo, Smart y PRO.";
        i18n.zh.cl1_desc = "欢迎页面，实时预览夜间窗口和最优序列，直接导航至天气、Smart和PRO。";

        i18n.it.cl2_title = "Calcolatori Smart e PRO unificati";
        i18n.en.cl2_title = "Unified Smart and PRO calculators";
        i18n.es.cl2_title = "Calculadoras Smart y PRO unificadas";
        i18n.zh.cl2_title = "Smart与PRO计算器统一";

        i18n.it.cl2_desc = "Toggle Smart/PRO in un'unica vista: nessuna sincronizzazione manuale, tutti i parametri condivisi in tempo reale.";
        i18n.en.cl2_desc = "Smart/PRO toggle in a single view: no manual sync, all parameters shared in real time.";
        i18n.es.cl2_desc = "Toggle Smart/PRO en una sola vista: sin sincronización manual, todos los parámetros compartidos en tiempo real.";
        i18n.zh.cl2_desc = "Smart/PRO切换在单一视图中：无需手动同步，所有参数实时共享。";

        i18n.it.cl3_title = "Navbar responsive per mobile";
        i18n.en.cl3_title = "Responsive navbar for mobile";
        i18n.es.cl3_title = "Barra de navegación responsive para móvil";
        i18n.zh.cl3_title = "移动端响应式导航栏";

        i18n.it.cl3_desc = "Logo e bandiere lingua su prima riga, link di navigazione su seconda riga. Nessuno scroll orizzontale su smartphone.";
        i18n.en.cl3_desc = "Logo and language flags on first row, navigation links on second row. No horizontal scroll on smartphones.";
        i18n.es.cl3_desc = "Logo y banderas de idioma en primera fila, enlaces de navegación en segunda. Sin scroll horizontal en smartphones.";
        i18n.zh.cl3_desc = "徽标和语言旗帜在第一行，导航链接在第二行。智能手机上无横向滚动。";

        i18n.it.cl4_title = "Toast notification al posto dei popup Chrome";
        i18n.en.cl4_title = "Toast notifications instead of Chrome popups";
        i18n.es.cl4_title = "Notificaciones toast en lugar de popups de Chrome";
        i18n.zh.cl4_title = "Toast通知替代Chrome弹窗";

        i18n.it.cl4_desc = "Tutti i warning e avvisi appaiono come toast in-app (gold/rosso/verde) coerenti con il dark theme, senza interruzioni.";
        i18n.en.cl4_desc = "All warnings and alerts appear as in-app toasts (gold/red/green) consistent with the dark theme, without interruptions.";
        i18n.es.cl4_desc = "Todos los avisos aparecen como toasts en la app (oro/rojo/verde) coherentes con el tema oscuro, sin interrupciones.";
        i18n.zh.cl4_desc = "所有警告和提示以应用内toast形式显示（金/红/绿），与暗色主题一致，不打断操作。";

        i18n.it.cl5_title = "Ripristino automatico sezione al reload";
        i18n.en.cl5_title = "Automatic section restore on reload";
        i18n.es.cl5_title = "Restauración automática de sección al recargar";
        i18n.zh.cl5_title = "重新加载时自动恢复当前页面";

        i18n.it.cl5_desc = "Aggiornando la pagina si ritorna alla sezione dove si stava lavorando (Meteo, Smart o PRO), non alla home.";
        i18n.en.cl5_desc = "Refreshing the page returns you to the section you were working in (Weather, Smart or PRO), not the home.";
        i18n.es.cl5_desc = "Al recargar la página, vuelves a la sección donde estabas trabajando (Meteo, Smart o PRO), no al inicio.";
        i18n.zh.cl5_desc = "刷新页面后，返回到您正在工作的部分（天气、Smart或PRO），而不是首页。";

        i18n.it.cl6_title = "Auto Smart per multinotte";
        i18n.en.cl6_title = "Auto Smart for multi-night";
        i18n.es.cl6_title = "Auto Smart para multinoche";
        i18n.zh.cl6_title = "多夜拍摄自动Smart";

        i18n.it.cl6_desc = "Pulsante ✨ Auto Smart in ogni notte della pianificazione multinotte: calcola le pose ottimali per quella specifica finestra oraria.";
        i18n.en.cl6_desc = "✨ Auto Smart button in each multi-night session: calculates optimal exposures for that specific time window.";
        i18n.es.cl6_desc = "Botón ✨ Auto Smart en cada noche de la planificación multinoche: calcula las poses óptimas para esa ventana horaria.";
        i18n.zh.cl6_desc = "每个多夜计划中的✨Auto Smart按钮：针对该特定时间窗口计算最优曝光。";

        i18n.it.cl7_title = "Privacy by design";
        i18n.en.cl7_title = "Privacy by design";
        i18n.es.cl7_title = "Privacidad por diseño";
        i18n.zh.cl7_title = "隐私设计";

        i18n.it.cl7_desc = "Nessun dato inviato a terzi. Tutto salvato localmente. Info visibili nel footer della home.";
        i18n.en.cl7_desc = "No data sent to third parties. Everything saved locally. Info visible in the home footer.";
        i18n.es.cl7_desc = "Ningún dato enviado a terceros. Todo guardado localmente. Información visible en el pie de página.";
        i18n.zh.cl7_desc = "不向第三方发送任何数据。所有内容本地保存。信息在主页页脚可见。";

        i18n.it.cl0_title = "Nuova veste grafica — redesign completo";
        i18n.en.cl0_title = "New visual design — full redesign";
        i18n.es.cl0_title = "Nuevo diseño visual — rediseño completo";
        i18n.zh.cl0_title = "全新视觉设计";

        i18n.it.cl0_desc = "Dark theme raffinato, icone coerenti, navbar sticky con bandiere lingua, layout ottimizzato per desktop e mobile. L'app ora inizia con una landing page.";
        i18n.en.cl0_desc = "Refined dark theme, consistent icons, sticky navbar with language flags, optimized layout for desktop and mobile. The app now starts with a landing page.";
        i18n.es.cl0_desc = "Tema oscuro refinado, iconos coherentes, barra de navegación sticky con banderas de idioma, diseño optimizado para escritorio y móvil. La app ahora inicia con una landing page.";
        i18n.zh.cl0_desc = "精致暗色主题、统一图标、带语言旗帜的固定导航栏、桌面与移动端优化布局。应用现在以欢迎页开始。";

        // ── Changelog v6.1 ───────────────────────────────────────────────
        i18n.it.cl_v61_af_title = "Autofocus NINA \u2014 struttura corretta";
        i18n.en.cl_v61_af_title = "NINA Autofocus \u2014 correct structure";
        i18n.es.cl_v61_af_title = "Autofocus NINA \u2014 estructura correcta";
        i18n.zh.cl_v61_af_title = "NINA\u81ea\u52a8\u5bf9\u7126 \u2014 \u6b63\u786e\u7ed3\u6784";

        i18n.it.cl_v61_af_desc = "JSON per N.I.N.A. ora genera autofocus corretto in tutte e tre le modalit\u00e0: RunAutofocus prima dell'autoguida, trigger AfterFilterChange/Time/Temp sul container imaging.";
        i18n.en.cl_v61_af_desc = "JSON export for N.I.N.A. now generates correct autofocus in all three modes: RunAutofocus before guiding, AfterFilterChange/Time/Temp triggers on the imaging container.";
        i18n.es.cl_v61_af_desc = "JSON para N.I.N.A. ahora genera autofocus correcto en los tres modos: RunAutofocus antes del guiado, triggers AfterFilterChange/Time/Temp en el contenedor de imaging.";
        i18n.zh.cl_v61_af_desc = "N.I.N.A.\u7684JSON\u5bfc\u51fa\u73b0\u5728\u5728\u6240\u6709\u4e09\u79cd\u6a21\u5f0f\u4e0b\u751f\u6210\u6b63\u786e\u7684\u81ea\u52a8\u5bf9\u7126\u5e8f\u5217\u3002";

        i18n.it.cl_v61_loop_title = "LoopCondition nel JSON NINA (Smart)";
        i18n.en.cl_v61_loop_title = "LoopCondition in NINA JSON (Smart)";
        i18n.es.cl_v61_loop_title = "LoopCondition en JSON NINA (Smart)";
        i18n.zh.cl_v61_loop_title = "NINA JSON\u4e2d\u7684LoopCondition\uff08Smart\u6a21\u5f0f\uff09";

        i18n.it.cl_v61_loop_desc = "Smart non aggiungeva LoopCondition nel container filtro \u2014 NINA non ripeteva le pose. Ora allineata a PRO e Multinotte.";
        i18n.en.cl_v61_loop_desc = "Smart was missing LoopCondition in the filter container \u2014 NINA did not repeat frames. Now aligned with PRO and Multi-night.";
        i18n.es.cl_v61_loop_desc = "Smart no a\u00f1ad\u00eda LoopCondition \u2014 NINA no repet\u00eda las poses. Ahora alineado con PRO y Multinoche.";
        i18n.zh.cl_v61_loop_desc = "Smart\u6a21\u5f0f\u7f3a\u5c11LoopCondition\uff0cNINA\u672a\u80fd\u91cd\u590d\u62cd\u6444\u3002\u73b0\u5df2\u4e0ePRO\u548c\u591a\u591c\u6a21\u5f0f\u4fdd\u6301\u4e00\u81f4\u3002";

        i18n.it.cl_v61_sensor_title = "Selettore sensore spostato in Smart";
        i18n.en.cl_v61_sensor_title = "Sensor selector moved to Smart";
        i18n.es.cl_v61_sensor_title = "Selector de sensor movido a Smart";
        i18n.zh.cl_v61_sensor_title = "\u4f20\u611f\u5668\u9009\u62e9\u5668\u79fb\u81f3Smart\u6a21\u5f0f";

        i18n.it.cl_v61_sensor_desc = "Color/Mono non compariva in PRO. In Smart \u00e8 ora nell'header Impostazione Sequenza, a sinistra di Reset Filtri.";
        i18n.en.cl_v61_sensor_desc = "Color/Mono was not visible in PRO mode. In Smart it is now in the Sequence Setup header, left of Reset Filters.";
        i18n.es.cl_v61_sensor_desc = "Color/Mono no aparec\u00eda en PRO. En Smart ahora est\u00e1 en el encabezado Configuraci\u00f3n de Secuencia, a la izquierda de Restablecer Filtros.";
        i18n.zh.cl_v61_sensor_desc = "Color/Mono\u5728PRO\u6a21\u5f0f\u4e0b\u4e0d\u53ef\u89c1\u3002\u5728Smart\u6a21\u5f0f\u4e2d\uff0c\u5b83\u73b0\u5728\u4f4d\u4e8e\u5e8f\u5217\u8bbe\u7f6e\u6807\u9898\u680f\uff0c\u5728\u91cd\u7f6e\u6ee4\u955c\u6309\u9215\u7684\u5de6\u4fa7\u3002";

        i18n.it.cl_v61_gain_title = "Sync gain/offset per gruppo filtri";
        i18n.en.cl_v61_gain_title = "Gain/offset sync per filter group";
        i18n.es.cl_v61_gain_title = "Sincronizaci\u00f3n gain/offset por grupo";
        i18n.zh.cl_v61_gain_title = "\u6309\u6ee4\u955c\u7ec4\u540c\u6b65\u589e\u76ca/\u504f\u7f6e";

        i18n.it.cl_v61_gain_desc = "Modificare gain o offset su un filtro LRGB aggiorna tutto il gruppo. Stessa logica per HOS. Smart e PRO indipendenti.";
        i18n.en.cl_v61_gain_desc = "Changing gain or offset on one LRGB filter updates the whole group. Same for HOS. Smart and PRO remain independent.";
        i18n.es.cl_v61_gain_desc = "Cambiar gain u offset en un filtro LRGB actualiza todo el grupo. Lo mismo para HOS. Smart y PRO permanecen independientes.";
        i18n.zh.cl_v61_gain_desc = "\u66f4\u6539LRGB\u7ec4\u4e2d\u4efb\u4e00\u6ee4\u955c\u7684\u589e\u76ca\u6216\u504f\u7f6e\u5c06\u66f4\u65b0\u6574\u7ec4\u3002HOS\u540c\u7406\u3002Smart\u548cPRO\u4fdd\u6301\u72ec\u7acb\u3002";

        i18n.it.cl_v61_time_title = "Ora di inizio sessione adattiva";
        i18n.en.cl_v61_time_title = "Adaptive session start time";
        i18n.es.cl_v61_time_title = "Hora de inicio adaptativa";
        i18n.zh.cl_v61_time_title = "\u81ea\u9002\u5e94\u4f1a\u8bdd\u5f00\u59cb\u65f6\u95f4";

        i18n.it.cl_v61_time_desc = "Se l'ora calcolata \u00e8 gi\u00e0 passata, l'inizio sessione diventa l'ora attuale. Nel multinotte vale solo per la notte corrente.";
        i18n.en.cl_v61_time_desc = "If the calculated start time has already passed, the session start is set to the current time. In multi-night, this applies only to tonight.";
        i18n.es.cl_v61_time_desc = "Si la hora de inicio calculada ya pas\u00f3, el inicio se establece en la hora actual. En multinoche, solo aplica a la noche actual.";
        i18n.zh.cl_v61_time_desc = "\u5982\u679c\u8ba1\u7b97\u7684\u5f00\u59cb\u65f6\u95f4\u5df2\u8fc7\uff0c\u5c06\u4f7f\u7528\u5f53\u524d\u65f6\u95f4\u3002\u591a\u591c\u6a21\u5f0f\u4e0b\u4ec5\u9002\u7528\u4e8e\u5f53\u665a\u3002";

        i18n.it.cl_v61_reset_title = "Pulsanti Reset tradotti";
        i18n.en.cl_v61_reset_title = "Reset buttons translated";
        i18n.es.cl_v61_reset_title = "Botones Reset traducidos";
        i18n.zh.cl_v61_reset_title = "\u91cd\u7f6e\u6309\u9215\u5df2\u7ffb\u8bd1";

        i18n.it.cl_v61_reset_desc = "Reset Generale e Reset Filtri mostravano la chiave i18n grezza. Aggiunte traduzioni IT, EN, ES, ZH per etichette, modal e tooltip.";
        i18n.en.cl_v61_reset_desc = "Reset General and Reset Filters showed raw i18n keys. Added translations in IT, EN, ES, ZH for labels, modals, and tooltips.";
        i18n.es.cl_v61_reset_desc = "Reset General y Reset Filtros mostraban claves i18n sin traducir. A\u00f1adidas traducciones IT, EN, ES, ZH para etiquetas, modales y tooltips.";
        i18n.zh.cl_v61_reset_desc = "\u91cd\u7f6e\u6309\u9215\u663e\u793a\u4e86\u539f\u59cbi18n\u952e\u3002\u5df2\u6dfb\u52a0IT\u3001EN\u3001ES\u3001ZH\u7684\u6807\u7b7e\u3001\u6a21\u6001\u6846\u548c\u5de5\u5177\u63d0\u793a\u7ffb\u8bd1\u3002";

        // Reset button labels
        i18n.it.reset_general_btn = "Reset";
        i18n.en.reset_general_btn = "Reset";
        i18n.es.reset_general_btn = "Reset";
        i18n.zh.reset_general_btn = "\u91cd\u7f6e";

        i18n.it.reset_filters_btn = "Reset Filtri";
        i18n.en.reset_filters_btn = "Reset Filters";
        i18n.es.reset_filters_btn = "Reset Filtros";
        i18n.zh.reset_filters_btn = "\u91cd\u7f6e\u6ee4\u955c";

        // Reset modal titles & bodies
        i18n.it.reset_general_modal_title = "Reset Generale";
        i18n.en.reset_general_modal_title = "General Reset";
        i18n.es.reset_general_modal_title = "Reset General";
        i18n.zh.reset_general_modal_title = "\u5168\u9762\u91cd\u7f6e";

        i18n.it.reset_general_modal_body = "Questa operazione cancellerà tutte le preferenze salvate: setup ottico, sensore, pose dei filtri, trigger PRO e posizione GPS. La pagina verrà ricaricata con i valori di fabbrica.";
        i18n.en.reset_general_modal_body = "This will erase all saved preferences: optics, sensor, filter frames, PRO triggers and GPS location. The page will reload with factory defaults.";
        i18n.es.reset_general_modal_body = "Esta operación borrará todas las preferencias guardadas: óptica, sensor, poses de filtros, triggers PRO y posición GPS. La página se recargará con los valores de fábrica.";
        i18n.zh.reset_general_modal_body = "\u6b64\u64cd\u4f5c\u5c06\u6e05\u9664\u6240\u6709\u5df2\u4fdd\u5b58\u7684\u8bbe\u7f6e\uff1a\u5149\u5b66\u8bbe\u7f6e\u3001\u4f20\u611f\u5668\u3001\u6ee4\u955c\u5e27\u3001PRO\u89e6\u53d1\u5668\u548cGPS\u4f4d\u7f6e\u3002\u9875\u9762\u5c06\u6062\u590d\u51fa\u5382\u9ed8\u8ba4\u5c40\u3002";

        i18n.it.reset_filters_modal_title = "Reset Filtri";
        i18n.en.reset_filters_modal_title = "Reset Filters";
        i18n.es.reset_filters_modal_title = "Reset Filtros";
        i18n.zh.reset_filters_modal_title = "\u91cd\u7f6e\u6ee4\u955c";

        i18n.it.reset_filters_modal_body = "Azzera BIN (\u2192 1\u00d71), conteggio pose, esposizione, gain, offset e nomi filtri NINA per tutti i filtri in modalità Smart e PRO. Le impostazioni ottiche e GPS non vengono toccate.";
        i18n.en.reset_filters_modal_body = "Resets BIN (\u2192 1\u00d71), frame count, exposure, gain, offset and NINA filter names for all filters in Smart and PRO mode. Optics and GPS settings are not affected.";
        i18n.es.reset_filters_modal_body = "Restablece BIN (\u2192 1\u00d71), conteo de poses, exposición, gain, offset y nombres de filtros NINA para todos los filtros en modo Smart y PRO. Los ajustes de óptica y GPS no se ven afectados.";
        i18n.zh.reset_filters_modal_body = "\u91cd\u7f6e\u6240\u6709Smart\u548cPRO\u6a21\u5f0f\u4e0b\u6ee4\u955c\u7684BIN(\u21921\u00d71)\u3001\u5e27\u6570\u3001\u66dd\u5149\u3001\u589e\u76ca\u3001\u504f\u7f6e\u548cNINA\u6ee4\u955c\u540d\u79f0\u3002\u5149\u5b66\u548cGPS\u8bbe\u7f6e\u4e0d\u53d7\u5f71\u54cd\u3002";

        // Reset confirm buttons
        i18n.it.reset_general_confirm_btn = "Cancella tutto e ricarica";
        i18n.en.reset_general_confirm_btn = "Clear all and reload";
        i18n.es.reset_general_confirm_btn = "Borrar todo y recargar";
        i18n.zh.reset_general_confirm_btn = "\u5168\u90e8\u6e05\u9664\u5e76\u91cd\u8f7d";

        i18n.it.reset_filters_confirm_btn = "Azzera filtri";
        i18n.en.reset_filters_confirm_btn = "Reset filters";
        i18n.es.reset_filters_confirm_btn = "Restablecer filtros";
        i18n.zh.reset_filters_confirm_btn = "\u91cd\u7f6e\u6ee4\u955c";

        // Reset tooltips
        i18n.it.reset_general_tooltip = "Ripristina tutti i valori di fabbrica";
        i18n.en.reset_general_tooltip = "Restore all factory defaults";
        i18n.es.reset_general_tooltip = "Restaurar todos los valores de fábrica";
        i18n.zh.reset_general_tooltip = "\u6062\u590d\u6240\u6709\u51fa\u5382\u9ed8\u8ba4\u5c40";

        i18n.it.reset_filters_tooltip = "Azzera pose e impostazioni di tutti i filtri";
        i18n.en.reset_filters_tooltip = "Reset frames and settings for all filters";
        i18n.es.reset_filters_tooltip = "Restablecer poses e ajustes de todos los filtros";
        i18n.zh.reset_filters_tooltip = "\u91cd\u7f6e\u6240\u6709\u6ee4\u955c\u7684\u5e27\u6570\u548c\u8bbe\u7f6e";

        // Reset filters done toast
        i18n.it.reset_filters_done = "Reset filtri effettuato";
        i18n.en.reset_filters_done = "Filters reset successfully";
        i18n.es.reset_filters_done = "Filtros restablecidos";
        i18n.zh.reset_filters_done = "\u6ee4\u955c\u5df2\u91cd\u7f6e";

        // Changelog v6.1b items
        i18n.it.cl_v61b_af_title = "Autofocus semplificato — 3 modalità";
        i18n.en.cl_v61b_af_title = "Simplified Autofocus — 3 modes";
        i18n.es.cl_v61b_af_title = "Autofocus simplificado — 3 modos";
        i18n.zh.cl_v61b_af_title = "自动对焦简化 — 3种模式";

        i18n.it.cl_v61b_af_desc = "Rimossi AF ogni N minuti e AF a variazione °C. Le tre modalità attive sono: avvio sequenza, cambio filtro e variazione HFR — N.I.N.A. misura il deterioramento del fuoco in tempo reale e interviene solo quando necessario.";
        i18n.en.cl_v61b_af_desc = "Removed AF every N minutes and AF on °C change. The three active modes are: sequence start, filter change and HFR increase — N.I.N.A. measures focus degradation in real time and triggers only when needed.";
        i18n.es.cl_v61b_af_desc = "Eliminados AF cada N minutos y AF por variación °C. Los tres modos activos son: inicio de secuencia, cambio de filtro e incremento de HFR — N.I.N.A. mide el deterioro del enfoque en tiempo real e interviene solo cuando es necesario.";
        i18n.zh.cl_v61b_af_desc = "移除了每N分钟AF和温度变化AF。三种有效模式为：序列开始、切换滤镜和HFR增大 — N.I.N.A.实时检测对焦恶化并仅在必要时触发。";

        i18n.it.cl_v61b_nina_title = "JSON N.I.N.A. arricchito — struttura completa";
        i18n.en.cl_v61b_nina_title = "Enriched N.I.N.A. JSON — full structure";
        i18n.es.cl_v61b_nina_title = "JSON N.I.N.A. enriquecido — estructura completa";
        i18n.zh.cl_v61b_nina_title = "增强的N.I.N.A. JSON — 完整结构";

        i18n.it.cl_v61b_nina_desc = "Tutti gli export ora includono: UnparkScope, WaitForTime, AboveHorizonCondition (stop sotto 30°), TimeCondition (stop a fine sessione), FilterInfo completo con FlatWizardSettings.";
        i18n.en.cl_v61b_nina_desc = "All exports now include: UnparkScope, WaitForTime, AboveHorizonCondition (stop below 30°), TimeCondition (stop at session end), full FilterInfo with FlatWizardSettings.";
        i18n.es.cl_v61b_nina_desc = "Todas las exportaciones ahora incluyen: UnparkScope, WaitForTime, AboveHorizonCondition (parada bajo 30°), TimeCondition (parada al final de sesión), FilterInfo completo con FlatWizardSettings.";
        i18n.zh.cl_v61b_nina_desc = "所有导出现包含：UnparkScope、WaitForTime、AboveHorizonCondition（低于30°停止）、TimeCondition（会话结束停止）、含FlatWizardSettings的完整FilterInfo。";

        i18n.it.cl_v61b_ui_title = "Interfaccia Smart e PRO unificata";
        i18n.en.cl_v61b_ui_title = "Unified Smart and PRO interface";
        i18n.es.cl_v61b_ui_title = "Interfaz Smart y PRO unificada";
        i18n.zh.cl_v61b_ui_title = "Smart与PRO界面统一";

        i18n.it.cl_v61b_ui_desc = "Stessa intestazione N.I.N.A. in entrambe le modalità. Sezioni rinominate uniformemente: Autofocus, Pre-Flight, Post-Flight. Colori titoli allineati. Manuale aggiornato.";
        i18n.en.cl_v61b_ui_desc = "Same N.I.N.A. header in both modes. Sections uniformly renamed: Autofocus, Pre-Flight, Post-Flight. Title colors aligned. Manual updated.";
        i18n.es.cl_v61b_ui_desc = "Mismo encabezado N.I.N.A. en ambos modos. Secciones renombradas uniformemente: Autofocus, Pre-Flight, Post-Flight. Colores de títulos alineados. Manual actualizado.";
        i18n.zh.cl_v61b_ui_desc = "两种模式使用相同的N.I.N.A.标题。章节统一重命名：Autofocus、Pre-Flight、Post-Flight。标题颜色统一。手册已更新。";

        // Changelog v6.2
        i18n.it.cl_v62_nina_title = "Fix export N.I.N.A. — sequenza funzionante";
        i18n.en.cl_v62_nina_title = "N.I.N.A. export fix — working sequence";
        i18n.es.cl_v62_nina_title = "Fix exportación N.I.N.A. — secuencia funcional";
        i18n.zh.cl_v62_nina_title = "N.I.N.A.导出修复 — 序列正常工作";

        i18n.it.cl_v62_nina_desc = "Riscrittura completa del motore di esportazione JSON per N.I.N.A. Advanced Sequencer. Il file generato ora funziona correttamente: struttura verificata su file reali, ordine degli \$id conforme al deserializzatore .NET, ExposureCount e LoopCondition allineati.";
        i18n.en.cl_v62_nina_desc = "Complete rewrite of the JSON export engine for N.I.N.A. Advanced Sequencer. The generated file now works correctly: structure verified against real files, \$id order compliant with the .NET deserializer, ExposureCount and LoopCondition aligned.";
        i18n.es.cl_v62_nina_desc = "Reescritura completa del motor de exportación JSON para N.I.N.A. Advanced Sequencer. El archivo generado ahora funciona correctamente: estructura verificada con archivos reales, orden de \$id conforme al deserializador .NET, ExposureCount y LoopCondition alineados.";
        i18n.zh.cl_v62_nina_desc = "完全重写N.I.N.A. Advanced Sequencer的JSON导出引擎。生成的文件现在可以正常工作：结构经过真实文件验证，\$id顺序符合.NET反序列化器要求，ExposureCount和LoopCondition已对齐。";

        // ─── Modulo Orizzonte ───────────────────────────────────────────────
        i18n.it.hz_btn_fov        = "Crea Orizzonte personalizzato";
        i18n.en.hz_btn_fov        = "Create custom Horizon";
        i18n.es.hz_btn_fov        = "Crear horizonte personalizado";
        i18n.zh.hz_btn_fov        = "创建自定义地平线";

        i18n.it.hz_title          = "Orizzonte panoramico";
        i18n.en.hz_title          = "Panoramic Horizon";
        i18n.es.hz_title          = "Horizonte panorámico";
        i18n.zh.hz_title          = "全景地平线";

        i18n.it.hz_subtitle       = "Genera il profilo d'orizzonte da una foto · Export NINA, Stellarium, CSV";
        i18n.en.hz_subtitle       = "Generate horizon profile from a photo · Export NINA, Stellarium, CSV";
        i18n.es.hz_subtitle       = "Genera el perfil de horizonte desde una foto · Exportar NINA, Stellarium, CSV";
        i18n.zh.hz_subtitle       = "从照片生成地平线轮廓 · 导出 NINA、Stellarium、CSV";

        i18n.it.hz_upload_title   = "Carica foto panoramica";
        i18n.en.hz_upload_title   = "Load panoramic photo";
        i18n.es.hz_upload_title   = "Cargar foto panorámica";
        i18n.zh.hz_upload_title   = "加载全景照片";

        i18n.it.hz_upload_sub     = "Trascina o clicca — JPG/PNG equirettangolare 360° o parziale";
        i18n.en.hz_upload_sub     = "Drag or click — equirectangular JPG/PNG, 360° or partial";
        i18n.es.hz_upload_sub     = "Arrastra o haz clic — JPG/PNG equirectangular, 360° o parcial";
        i18n.zh.hz_upload_sub     = "拖放或点击 — 等距矩形 JPG/PNG，360° 或局部";

        i18n.it.hz_coords_title   = "Coordinate postazione";
        i18n.en.hz_coords_title   = "Site coordinates";
        i18n.es.hz_coords_title   = "Coordenadas del sitio";
        i18n.zh.hz_coords_title   = "观测站坐标";

        i18n.it.hz_gps_btn        = "📍 GPS";
        i18n.en.hz_gps_btn        = "📍 GPS";
        i18n.es.hz_gps_btn        = "📍 GPS";
        i18n.zh.hz_gps_btn        = "📍 GPS定位";

        i18n.it.hz_lat_label      = "Latitudine (°N)";
        i18n.en.hz_lat_label      = "Latitude (°N)";
        i18n.es.hz_lat_label      = "Latitud (°N)";
        i18n.zh.hz_lat_label      = "纬度 (°N)";

        i18n.it.hz_lon_label      = "Longitudine (°E)";
        i18n.en.hz_lon_label      = "Longitude (°E)";
        i18n.es.hz_lon_label      = "Longitud (°E)";
        i18n.zh.hz_lon_label      = "经度 (°E)";

        i18n.it.hz_alt_label      = "Altitudine (m slm)";
        i18n.en.hz_alt_label      = "Altitude (m asl)";
        i18n.es.hz_alt_label      = "Altitud (m snm)";
        i18n.zh.hz_alt_label      = "海拔高度 (m)";

        i18n.it.hz_name_label     = "Nome postazione";
        i18n.en.hz_name_label     = "Site name";
        i18n.es.hz_name_label     = "Nombre del sitio";
        i18n.zh.hz_name_label     = "站点名称";

        i18n.it.hz_params_title   = "Parametri rilevamento";
        i18n.en.hz_params_title   = "Detection parameters";
        i18n.es.hz_params_title   = "Parámetros de detección";
        i18n.zh.hz_params_title   = "检测参数";

        i18n.it.hz_method_sobel   = "Sobel (consigliato)";
        i18n.en.hz_method_sobel   = "Sobel (recommended)";
        i18n.es.hz_method_sobel   = "Sobel (recomendado)";
        i18n.zh.hz_method_sobel   = "Sobel（推荐）";

        i18n.it.hz_method_grad    = "Gradiente";
        i18n.en.hz_method_grad    = "Gradient";
        i18n.es.hz_method_grad    = "Gradiente";
        i18n.zh.hz_method_grad    = "梯度";

        i18n.it.hz_method_thr     = "Soglia luminosità";
        i18n.en.hz_method_thr     = "Brightness threshold";
        i18n.es.hz_method_thr     = "Umbral de brillo";
        i18n.zh.hz_method_thr     = "亮度阈值";

        i18n.it.hz_method_dark    = "Prima zona scura";
        i18n.en.hz_method_dark    = "First dark band";
        i18n.es.hz_method_dark    = "Primera zona oscura";
        i18n.zh.hz_method_dark    = "首个暗带";

        i18n.it.hz_detect_btn     = "Rileva orizzonte";
        i18n.en.hz_detect_btn     = "Detect horizon";
        i18n.es.hz_detect_btn     = "Detectar horizonte";
        i18n.zh.hz_detect_btn     = "检测地平线";

        i18n.it.hz_detect_hint    = "Clicca sull'anteprima per correggere manualmente";
        i18n.en.hz_detect_hint    = "Click on the preview to correct manually";
        i18n.es.hz_detect_hint    = "Haz clic en la vista previa para corregir manualmente";
        i18n.zh.hz_detect_hint    = "点击预览图手动修正";

        i18n.it.hz_preview_title  = "Anteprima";
        i18n.en.hz_preview_title  = "Preview";
        i18n.es.hz_preview_title  = "Vista previa";
        i18n.zh.hz_preview_title  = "预览";

        i18n.it.hz_chart_title    = "Profilo Az/Alt";
        i18n.en.hz_chart_title    = "Az/Alt Profile";
        i18n.es.hz_chart_title    = "Perfil Az/Alt";
        i18n.zh.hz_chart_title    = "方位角/高度角轮廓";

        i18n.it.hz_export_title   = "Esporta orizzonte";
        i18n.en.hz_export_title   = "Export horizon";
        i18n.es.hz_export_title   = "Exportar horizonte";
        i18n.zh.hz_export_title   = "导出地平线";

        i18n.it.hz_filename_label = "Nome file (senza estensione)";
        i18n.en.hz_filename_label = "File name (without extension)";
        i18n.es.hz_filename_label = "Nombre de archivo (sin extensión)";
        i18n.zh.hz_filename_label = "文件名（不含扩展名）";

        i18n.it.hz_export_note    = "Az 0°=Nord, crescente verso Est · Alt in gradi sopra l'orizzonte · Stellarium: estrai lo zip in Stellarium/landscapes/";
        i18n.en.hz_export_note    = "Az 0°=North, increasing East · Alt in degrees above horizon · Stellarium: extract zip into Stellarium/landscapes/";
        i18n.es.hz_export_note    = "Az 0°=Norte, creciente hacia el Este · Alt en grados sobre el horizonte · Stellarium: extrae el zip en Stellarium/landscapes/";
        i18n.zh.hz_export_note    = "方位角 0°=北，向东增加 · 高度角单位为度 · Stellarium：将zip解压至 Stellarium/landscapes/";

        i18n.it.hz_reset_btn      = "↺ Reset";
        i18n.en.hz_reset_btn      = "↺ Reset";
        i18n.es.hz_reset_btn      = "↺ Restablecer";
        i18n.zh.hz_reset_btn      = "↺ 重置";

        i18n.it.hz_sphere_detected = "· 📐 Foto sferica 360° rilevata";
        i18n.en.hz_sphere_detected = "· 📐 360° spherical photo detected";
        i18n.es.hz_sphere_detected = "· 📐 Foto esférica 360° detectada";
        i18n.zh.hz_sphere_detected = "· 📐 已检测到360°球形照片";


        i18n.it.hz_param_vfov     = "FOV verticale";
        i18n.en.hz_param_vfov     = "Vertical FOV";
        i18n.es.hz_param_vfov     = "FOV vertical";
        i18n.zh.hz_param_vfov     = "垂直视场角";

        i18n.it.hz_param_calt     = "Altitudine centro";
        i18n.en.hz_param_calt     = "Center altitude";
        i18n.es.hz_param_calt     = "Altitud del centro";
        i18n.zh.hz_param_calt     = "中心高度角";

        i18n.it.hz_param_saz      = "Az. partenza Nord";
        i18n.en.hz_param_saz      = "North start azimuth";
        i18n.es.hz_param_saz      = "Az. inicio Norte";
        i18n.zh.hz_param_saz      = "北方起始方位角";

        i18n.it.hz_param_hsp      = "Span orizzontale";
        i18n.en.hz_param_hsp      = "Horizontal span";
        i18n.es.hz_param_hsp      = "Amplitud horizontal";
        i18n.zh.hz_param_hsp      = "水平跨度";

        i18n.it.hz_param_thr      = "Soglia luminosità";
        i18n.en.hz_param_thr      = "Brightness threshold";
        i18n.es.hz_param_thr      = "Umbral de brillo";
        i18n.zh.hz_param_thr      = "亮度阈值";

        i18n.it.hz_param_sm       = "Smoothing";
        i18n.en.hz_param_sm       = "Smoothing";
        i18n.es.hz_param_sm       = "Suavizado";
        i18n.zh.hz_param_sm       = "平滑度";

        i18n.it.hz_param_stop     = "Ricerca da (% alto)";
        i18n.en.hz_param_stop     = "Search from (% top)";
        i18n.es.hz_param_stop     = "Buscar desde (% arriba)";
        i18n.zh.hz_param_stop     = "搜索起点 (% 顶部)";

        i18n.it.hz_param_sbot     = "Ricerca fino a (% alto)";
        i18n.en.hz_param_sbot     = "Search to (% top)";
        i18n.es.hz_param_sbot     = "Buscar hasta (% arriba)";
        i18n.zh.hz_param_sbot     = "搜索终点 (% 顶部)";

        i18n.it.hz_apply_fov      = "Applica a FOV";
        i18n.en.hz_apply_fov      = "Apply to FOV";
        i18n.es.hz_apply_fov      = "Aplicar al FOV";
        i18n.zh.hz_apply_fov      = "应用到FOV";

        i18n.it.hz_legend_hz      = "Orizzonte";
        i18n.en.hz_legend_hz      = "Horizon";
        i18n.es.hz_legend_hz      = "Horizonte";
        i18n.zh.hz_legend_hz      = "地平线";

        i18n.it.hz_legend_search  = "Ricerca";
        i18n.en.hz_legend_search  = "Search";
        i18n.es.hz_legend_search  = "Búsqueda";
        i18n.zh.hz_legend_search  = "搜索区";

        i18n.it.hz_change_photo   = "cambia foto";
        i18n.en.hz_change_photo   = "change photo";
        i18n.es.hz_change_photo   = "cambiar foto";
        i18n.zh.hz_change_photo   = "更换照片";

        i18n.it.hz_param_vfov     = "FOV verticale";
        i18n.en.hz_param_vfov     = "Vertical FOV";
        i18n.es.hz_param_vfov     = "FOV vertical";
        i18n.zh.hz_param_vfov     = "垂直视场角";

        i18n.it.hz_param_calt     = "Altitudine centro";
        i18n.en.hz_param_calt     = "Center altitude";
        i18n.es.hz_param_calt     = "Altitud centro";
        i18n.zh.hz_param_calt     = "中心高度角";

        i18n.it.hz_param_saz      = "Az. partenza Nord";
        i18n.en.hz_param_saz      = "North start Az.";
        i18n.es.hz_param_saz      = "Az. inicio Norte";
        i18n.zh.hz_param_saz      = "北向起始方位角";

        i18n.it.hz_param_hsp      = "Span orizzontale";
        i18n.en.hz_param_hsp      = "Horizontal span";
        i18n.es.hz_param_hsp      = "Span horizontal";
        i18n.zh.hz_param_hsp      = "水平跨度";

        i18n.it.hz_param_thr      = "Soglia luminosità";
        i18n.en.hz_param_thr      = "Brightness threshold";
        i18n.es.hz_param_thr      = "Umbral de brillo";
        i18n.zh.hz_param_thr      = "亮度阈值";

        i18n.it.hz_param_sm       = "Smoothing";
        i18n.en.hz_param_sm       = "Smoothing";
        i18n.es.hz_param_sm       = "Suavizado";
        i18n.zh.hz_param_sm       = "平滑度";

        i18n.it.hz_param_stop     = "Ricerca da (% alto)";
        i18n.en.hz_param_stop     = "Search from (% top)";
        i18n.es.hz_param_stop     = "Buscar desde (% sup)";
        i18n.zh.hz_param_stop     = "从顶部搜索 (%)";

        i18n.it.hz_param_sbot     = "Ricerca fino a (% alto)";
        i18n.en.hz_param_sbot     = "Search to (% top)";
        i18n.es.hz_param_sbot     = "Buscar hasta (% sup)";
        i18n.zh.hz_param_sbot     = "搜索至 (% 顶)";

        i18n.it.hz_restore_btn    = "↩ Ripristina";
        i18n.en.hz_restore_btn    = "↩ Restore";
        i18n.es.hz_restore_btn    = "↩ Restaurar";
        i18n.zh.hz_restore_btn    = "↩ 恢复";

        // ─── Changelog v6.5 ─────────────────────────────────────────────────

        i18n.it.cl_v66_date_title   = "Pianificazione su data futura";
        i18n.en.cl_v66_date_title   = "Future date planning";
        i18n.es.cl_v66_date_title   = "Planificación en fecha futura";
        i18n.zh.cl_v66_date_title   = "未来日期规划";

        i18n.it.cl_v66_date_desc    = "Nuovo selettore data sessione nel Planetario e nelle sezioni Smart/PRO. Finestra notte astronomica, altitudine DSO, fase lunare e orari di sessione vengono ricalcolati per la data scelta. Lo slider astro resta attivo e mostra i DSO visibili ora per ora. Warning automatico se il meteo non è disponibile. Campo data con sfondo blu per date future.";
        i18n.en.cl_v66_date_desc    = "New session date picker in the Planetarium and Smart/PRO sections. Astronomical night window, DSO altitude, moon phase and session times are recalculated for the selected date. The astro slider stays active and shows visible DSOs hour by hour. Automatic warning when weather is unavailable. Date field turns blue for future dates.";
        i18n.es.cl_v66_date_desc    = "Nuevo selector de fecha de sesión en el Planetario y en las secciones Smart/PRO. La ventana nocturna astronómica, altitud DSO, fase lunar y horarios de sesión se recalculan para la fecha elegida. El slider astro permanece activo. Aviso automático si el tiempo no está disponible. Campo de fecha azul para fechas futuras.";
        i18n.zh.cl_v66_date_desc    = "行星仪和Smart/PRO部分新增会话日期选择器。天文夜窗口、DSO高度、月相和会话时间均按所选日期重新计算。天文滑块保持激活状态，逐小时显示可见天体。天气不可用时自动警告。未来日期显示蓝色背景。";

        i18n.it.cl_v66_sensor_title = "Algoritmo correttivo sensore mono/colore";
        i18n.en.cl_v66_sensor_title = "Mono/colour sensor correction algorithm";
        i18n.es.cl_v66_sensor_title = "Algoritmo de corrección sensor mono/color";
        i18n.zh.cl_v66_sensor_title = "单色/彩色传感器校正算法";

        i18n.it.cl_v66_sensor_desc  = "La stima delle ore di integrazione ora considera il tipo di sensore. Mono LRGB: −25% vs OSC. Mono solo RGB: −15%. OSC con filtro dual/quad-band: +15%. Correzione QE aggiuntiva dalla lookup table del sensore. Il fattore correttivo è mostrato nel pannello stima in 4 lingue.";
        i18n.en.cl_v66_sensor_desc  = "Integration time estimates now account for sensor type. Mono LRGB: −25% vs OSC. Mono RGB only: −15%. OSC with dual/quad-band filter: +15%. Additional QE correction from the sensor lookup table. The correction factor is shown in the estimate panel in 4 languages.";
        i18n.es.cl_v66_sensor_desc  = "La estimación de horas de integración ahora considera el tipo de sensor. Mono LRGB: −25% vs OSC. Mono solo RGB: −15%. OSC con filtro dual/quad-band: +15%. Corrección QE adicional desde la tabla del sensor. El factor se muestra en el panel en 4 idiomas.";
        i18n.zh.cl_v66_sensor_desc  = "积分时间估算现已考虑传感器类型。单色LRGB：比OSC减少25%。单色仅RGB：减少15%。OSC+双/四波段滤镜：增加15%。额外QE校正来自传感器查找表。校正系数以4种语言显示在估算面板中。";

        i18n.it.cl_v65_horizon_title      = "Modulo Orizzonte personalizzato";
        i18n.en.cl_v65_horizon_title      = "Custom Horizon module";
        i18n.es.cl_v65_horizon_title      = "Módulo de horizonte personalizado";
        i18n.zh.cl_v65_horizon_title      = "自定义地平线模块";

        i18n.it.cl_v65_horizon_desc       = "Nuovo modulo completo per generare il profilo di orizzonte da foto panoramica equirettangolare o sferica 360°. Algoritmo Sobel con rilevamento automatico, correzione manuale cliccando sull'anteprima, calibrazione parametri con tooltip contestuali. Export per NINA (.hrz), Stellarium (.zip con foto e ini), CSV, JSON. Salvataggio automatico in localStorage con backup/ripristino da file.";
        i18n.en.cl_v65_horizon_desc       = "New complete module to generate the horizon profile from an equirectangular or 360° spherical panoramic photo. Sobel algorithm with automatic detection, manual correction by clicking the preview, parameter calibration with contextual tooltips. Export for NINA (.hrz), Stellarium (.zip with photo and ini), CSV, JSON. Auto-save to localStorage with file backup/restore.";
        i18n.es.cl_v65_horizon_desc       = "Nuevo módulo completo para generar el perfil de horizonte desde una foto panorámica equirectangular o esférica 360°. Algoritmo Sobel con detección automática, corrección manual haciendo clic en la vista previa, calibración de parámetros con tooltips contextuales. Exportación para NINA (.hrz), Stellarium (.zip con foto e ini), CSV, JSON. Guardado automático en localStorage con copia de seguridad/restauración desde archivo.";
        i18n.zh.cl_v65_horizon_desc       = "全新完整模块，可从等距矩形或360°球形全景照片生成地平线轮廓。Sobel算法自动检测，点击预览图手动修正，参数校准含上下文工具提示。支持导出至NINA（.hrz）、Stellarium（含照片和ini的.zip）、CSV、JSON。自动保存至localStorage，支持文件备份/恢复。";

        i18n.it.cl_v65_fov_horizon_title  = "Orizzonte nel grafico altitudine FOV";
        i18n.en.cl_v65_fov_horizon_title  = "Horizon in FOV altitude chart";
        i18n.es.cl_v65_fov_horizon_title  = "Horizonte en el gráfico de altitud FOV";
        i18n.zh.cl_v65_fov_horizon_title  = "FOV高度图中的地平线";

        i18n.it.cl_v65_fov_horizon_desc   = "Il profilo di orizzonte personalizzato appare nel grafico altitudine del simulatore FOV come zona rossa tratteggiata — esattamente come NINA. La soglia varia nel tempo seguendo l'azimut del DSO: quando il target entra in zona di ostruzione, il grafico lo mostra chiaramente.";
        i18n.en.cl_v65_fov_horizon_desc   = "The custom horizon profile appears in the FOV simulator altitude chart as a dashed red zone — exactly like NINA. The threshold varies over time following the DSO's azimuth: when the target enters an obstruction zone, the chart shows it clearly.";
        i18n.es.cl_v65_fov_horizon_desc   = "El perfil de horizonte personalizado aparece en el gráfico de altitud del simulador FOV como una zona roja discontinua, exactamente como NINA. El umbral varía con el tiempo siguiendo el azimut del DSO: cuando el objetivo entra en una zona de obstrucción, el gráfico lo muestra claramente.";
        i18n.zh.cl_v65_fov_horizon_desc   = "自定义地平线轮廓以红色虚线区域显示在FOV模拟器的高度图中——与NINA完全一致。阈值随时间随DSO方位角变化：当目标进入遮挡区域时，图表会清晰显示。";

        i18n.it.chart_legend_horizon      = "Orizzonte";
        i18n.en.chart_legend_horizon      = "Horizon";
        i18n.es.chart_legend_horizon      = "Horizonte";
        i18n.zh.chart_legend_horizon      = "地平线";

        i18n.it.chart_legend_dso          = "DSO";
        i18n.en.chart_legend_dso          = "DSO";
        i18n.es.chart_legend_dso          = "DSO";
        i18n.zh.chart_legend_dso          = "深空天体";

        i18n.it.cl_v65_stellarium_title   = "Export Stellarium corretto (foto sferica + alfa)";
        i18n.en.cl_v65_stellarium_title   = "Corrected Stellarium export (spherical photo + alpha)";
        i18n.es.cl_v65_stellarium_title   = "Exportación Stellarium corregida (foto esférica + alfa)";
        i18n.zh.cl_v65_stellarium_title   = "修正的Stellarium导出（球形照片+透明通道）";

        i18n.it.cl_v65_stellarium_desc    = "Lo zip Stellarium include la foto panoramica originale in PNG (con canale alfa per il cielo rimosso), landscape.ini con tipo spherical, coordinate postazione e rotazione corretta per l'allineamento Nord. Per foto sferiche 2:1 i parametri maptex_top/bottom vengono impostati automaticamente a ±90°.";
        i18n.en.cl_v65_stellarium_desc    = "The Stellarium zip includes the original panoramic photo as PNG (with alpha channel for the removed sky), landscape.ini with spherical type, site coordinates and correct rotation for North alignment. For 2:1 spherical photos, maptex_top/bottom parameters are automatically set to ±90°.";
        i18n.es.cl_v65_stellarium_desc    = "El zip de Stellarium incluye la foto panorámica original en PNG (con canal alfa para el cielo eliminado), landscape.ini de tipo spherical, coordenadas del sitio y rotación correcta para la alineación Norte. Para fotos esféricas 2:1, los parámetros maptex_top/bottom se configuran automáticamente a ±90°.";
        i18n.zh.cl_v65_stellarium_desc    = "Stellarium压缩包包含PNG格式原始全景照片（带已移除天空的透明通道）、spherical类型的landscape.ini、站点坐标及正确的北向旋转。对于2:1球形照片，maptex_top/bottom参数自动设置为±90°。";

        i18n.it.cl_v65_guide_title        = "Guida interattiva integrata";
        i18n.en.cl_v65_guide_title        = "Integrated interactive guide";
        i18n.es.cl_v65_guide_title        = "Guía interactiva integrada";
        i18n.zh.cl_v65_guide_title        = "集成交互式指南";

        i18n.it.cl_v65_guide_desc         = "Pannello guida a 5 slide con illustrazioni SVG, accessibile dal pulsante ? nel titolo della sezione. Spiega il flusso completo: dalla foto panoramica al profilo finale. Tooltip contestuali sui parametri di rilevamento in 4 lingue. Guida caricata come iframe separato per non appesantire il file principale.";
        i18n.en.cl_v65_guide_desc         = "5-slide guide panel with SVG illustrations, accessible from the ? button in the section title. Explains the complete workflow: from panoramic photo to final profile. Contextual tooltips on detection parameters in 4 languages. Guide loaded as a separate iframe to keep the main file lightweight.";
        i18n.es.cl_v65_guide_desc         = "Panel guía de 5 diapositivas con ilustraciones SVG, accesible desde el botón ? en el título de la sección. Explica el flujo completo: de la foto panorámica al perfil final. Tooltips contextuales en los parámetros de detección en 4 idiomas. Guía cargada como iframe separado para no sobrecargar el archivo principal.";
        i18n.zh.cl_v65_guide_desc         = "5张幻灯片指南面板，带SVG插图，可通过章节标题中的?按钮访问。解释完整流程：从全景照片到最终轮廓。检测参数上的上下文工具提示，支持4种语言。指南作为独立iframe加载，不增加主文件负担。";

        i18n.it.seeing_1_label = "Perfetto";
        i18n.it.seeing_2_label = "Leggermente ondulato";
        i18n.it.seeing_3_label = "Moderato";
        i18n.it.seeing_4_label = "Turbolento";
        i18n.it.seeing_5_label = "Pessimo";
        i18n.it.seeing_1_desc  = "Disco di Airy e anelli stabili";
        i18n.it.seeing_2_desc  = "Anelli parzialmente mossi, brevi momenti di calma";
        i18n.it.seeing_3_desc  = "Disco e anelli fusi, alone più ampio";
        i18n.it.seeing_4_desc  = "Blob diffuso irregolare, nessun anello";
        i18n.it.seeing_5_desc  = "Blob enorme e turbolento, inutilizzabile";
        i18n.it.seeing_scale_title = "Scala Seeing — Antoniadi";

        i18n.en.seeing_1_label = "Perfect";
        i18n.en.seeing_2_label = "Slight undulations";
        i18n.en.seeing_3_label = "Moderate";
        i18n.en.seeing_4_label = "Turbulent";
        i18n.en.seeing_5_label = "Very bad";
        i18n.en.seeing_1_desc  = "Airy disk and rings stable";
        i18n.en.seeing_2_desc  = "Rings partially blurred, brief moments of calm";
        i18n.en.seeing_3_desc  = "Disk and rings merged, wider halo";
        i18n.en.seeing_4_desc  = "Irregular diffuse blob, no rings";
        i18n.en.seeing_5_desc  = "Huge turbulent blob, unusable";
        i18n.en.seeing_scale_title = "Seeing Scale — Antoniadi";

        i18n.es.seeing_1_label = "Perfecto";
        i18n.es.seeing_2_label = "Ligeramente ondulado";
        i18n.es.seeing_3_label = "Moderado";
        i18n.es.seeing_4_label = "Turbulento";
        i18n.es.seeing_5_label = "Pésimo";
        i18n.es.seeing_1_desc  = "Disco de Airy y anillos estables";
        i18n.es.seeing_2_desc  = "Anillos parcialmente borrosos, momentos de calma";
        i18n.es.seeing_3_desc  = "Disco y anillos fusionados, halo más amplio";
        i18n.es.seeing_4_desc  = "Blob difuso irregular, sin anillos";
        i18n.es.seeing_5_desc  = "Blob enorme y turbulento, inutilizable";
        i18n.es.seeing_scale_title = "Escala Seeing — Antoniadi";

        i18n.zh.seeing_1_label = "完美";
        i18n.zh.seeing_2_label = "轻微波动";
        i18n.zh.seeing_3_label = "中等";
        i18n.zh.seeing_4_label = "湍流";
        i18n.zh.seeing_5_label = "极差";
        i18n.zh.seeing_1_desc  = "艾里斑和衍射环稳定清晰";
        i18n.zh.seeing_2_desc  = "衍射环部分模糊，偶有平静时刻";
        i18n.zh.seeing_3_desc  = "艾里斑与衍射环融合，弥散晕更大";
        i18n.zh.seeing_4_desc  = "不规则弥散斑，无衍射环";
        i18n.zh.seeing_5_desc  = "巨大湍流斑，无法使用";
        i18n.zh.seeing_scale_title = "视宁度标尺 — Antoniadi";

        // ── Night Popup ──────────────────────────────────────────────────
        i18n.it.np_title            = "Analisi Notturna";
        i18n.it.np_sky_label        = "☁️ Cielo libero";
        i18n.it.np_seeing_label     = "👁 Seeing medio";
        i18n.it.np_moon_label       = "🌙 Luna";
        i18n.it.np_close            = "Chiudi";
        i18n.it.np_perfetta         = "Condizioni Perfette";
        i18n.it.np_perfetta_tag     = "Cielo eccezionale stanotte. Tira fuori il telescopio!";
        i18n.it.np_promettente      = "Nottata Promettente";
        i18n.it.np_promettente_tag  = "Buona parte della notte sarà serena. Vale la pena uscire.";
        i18n.it.np_incerta          = "Nottata Incerta";
        i18n.it.np_incerta_tag      = "Cielo variabile. Tieniti pronto ma senza certezze.";
        i18n.it.np_lascia_perdere   = "Lascia Perdere";
        i18n.it.np_lascia_perdere_tag = "Notte compromessa. Riposati e pianifica per un'altra sera.";
        i18n.it.np_no_dso           = "Nessun oggetto sopra 25° stanotte.";
        i18n.it.np_fov_ok           = "FOV ottimale";
        i18n.it.np_fov_large        = "grande, valuta mosaico";
        i18n.it.np_fov_small        = "piccolo, alta focale";
        i18n.it.np_max              = "max";
        i18n.it.np_warning          = "⚠️ Stima approssimativa. Verifica sempre i dati meteo aggiornati.";

        i18n.en.np_title            = "Night Analysis";
        i18n.en.np_sky_label        = "☁️ Clear Sky";
        i18n.en.np_seeing_label     = "👁 Avg Seeing";
        i18n.en.np_moon_label       = "🌙 Moon";
        i18n.en.np_close            = "Close";
        i18n.en.np_perfetta         = "Perfect Conditions";
        i18n.en.np_perfetta_tag     = "Exceptional sky tonight. Get the telescope out!";
        i18n.en.np_promettente      = "Promising Night";
        i18n.en.np_promettente_tag  = "Most of the night should be clear. Worth going out.";
        i18n.en.np_incerta          = "Uncertain Night";
        i18n.en.np_incerta_tag      = "Variable sky. Stay ready but don't count on it.";
        i18n.en.np_lascia_perdere   = "Skip It";
        i18n.en.np_lascia_perdere_tag = "Night is a write-off. Rest up and plan for another evening.";
        i18n.en.np_no_dso           = "No objects above 25° tonight.";
        i18n.en.np_fov_ok           = "optimal FOV";
        i18n.en.np_fov_large        = "large, consider mosaic";
        i18n.en.np_fov_small        = "small, high focal length";
        i18n.en.np_max              = "max";
        i18n.en.np_warning          = "⚠️ Approximate estimate. Always check updated weather data.";

        i18n.es.np_title            = "Análisis Nocturno";
        i18n.es.np_sky_label        = "☁️ Cielo despejado";
        i18n.es.np_seeing_label     = "👁 Seeing medio";
        i18n.es.np_moon_label       = "🌙 Luna";
        i18n.es.np_close            = "Cerrar";
        i18n.es.np_perfetta         = "Condiciones Perfectas";
        i18n.es.np_perfetta_tag     = "¡Cielo excepcional esta noche. Saca el telescopio!";
        i18n.es.np_promettente      = "Noche Prometedora";
        i18n.es.np_promettente_tag  = "Gran parte de la noche estará despejada. Vale la pena salir.";
        i18n.es.np_incerta          = "Noche Incierta";
        i18n.es.np_incerta_tag      = "Cielo variable. Mantente listo pero sin certezas.";
        i18n.es.np_lascia_perdere   = "Olvídalo";
        i18n.es.np_lascia_perdere_tag = "Noche comprometida. Descansa y planifica para otra noche.";
        i18n.es.np_no_dso           = "Ningún objeto sobre 25° esta noche.";
        i18n.es.np_fov_ok           = "FOV óptimo";
        i18n.es.np_fov_large        = "grande, considera mosaico";
        i18n.es.np_fov_small        = "pequeño, focal larga";
        i18n.es.np_max              = "máx";
        i18n.es.np_warning          = "⚠️ Estimación aproximada. Verifica siempre los datos meteorológicos actualizados.";

        i18n.zh.np_title            = "夜间分析";
        i18n.zh.np_sky_label        = "☁️ 晴空率";
        i18n.zh.np_seeing_label     = "👁 平均视宁度";
        i18n.zh.np_moon_label       = "🌙 月光";
        i18n.zh.np_close            = "关闭";
        i18n.zh.np_perfetta         = "绝佳条件";
        i18n.zh.np_perfetta_tag     = "今晚天空极佳，赶快架起望远镜！";
        i18n.zh.np_promettente      = "夜况不错";
        i18n.zh.np_promettente_tag  = "今晚大部分时间晴朗，值得出门观测。";
        i18n.zh.np_incerta          = "夜况不稳";
        i18n.zh.np_incerta_tag      = "天空多变，做好准备但别太确定。";
        i18n.zh.np_lascia_perdere   = "放弃吧";
        i18n.zh.np_lascia_perdere_tag = "今晚条件太差，好好休息，计划下一次吧。";
        i18n.zh.np_no_dso           = "今晚无目标高于25°。";
        i18n.zh.np_fov_ok           = "视场匹配";
        i18n.zh.np_fov_large        = "目标偏大，考虑拼接";
        i18n.zh.np_fov_small        = "目标偏小，需长焦";
        i18n.zh.np_max              = "最高";
        i18n.zh.np_warning          = "⚠️ 仅供参考。请始终核实最新气象数据。";

