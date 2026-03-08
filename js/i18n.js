// ============================================================
// i18n.js — Traduzioni multi-lingua (IT / EN / ES / ZH)
// ============================================================

let lang = localStorage.getItem('ad_lang') || 'it';

        // --- MOTORE MULTI-LINGUA (i18n) ---
        const i18n = {
            it: {
                "manual_btn": "📖 Apri Manuale", "pos_title": "📍 Posizione", "find_place": "Trova Luogo:", "search_place": "Es. Monte Lussari...",
                "lat": "Latitudine:", "lon": "Longitudine:", "env_data": "🎛️ Dati Ambientali",
                "low_clouds": "Nuvole Basse", "mid_clouds": "Nuvole Medie", "high_clouds": "Nuvole Alte", "moon_poll": "Inq. Lunare",
                "humidity": "Umidità", "seeing_est": "Stima Seeing", "now": "Adesso",
                "hybrid_planetarium": "🔭 Planetario Predittivo Ibrido", "solar_system": "🪐 Sistema Solare",
                "rec_targets": "🌌 Oggetti Consigliati Visibili", "free_search": "🔍 Ricerca Libera Oggetto", "search_target": "Es. M31, Pleiadi...",
                "plan_target_btn": "Pianifica 🚀", "back_dash": "Torna alla Dashboard", "change_target": "Cambia",
                "dossier": "📖 Dossier Astrofotografico", "type": "Tipologia", "app_mag": "Magnitudine App.", "distance": "Distanza", "wiki_link": "🔗 Wikipedia",
                "tactical_tip": "💡 Consiglio Tattico:", "optical_setup": "📸 Setup Ottico", "telescope": "Telescopio:", "focal_len": "Focale (mm):",
                "sensor": "Sensore:", "width": "Larg. W (mm):", "height": "Alet. H (mm):", "fov_calc": "Campo Inquadrato Calcolato",
                "fov_sim": "📐 Simulatore FOV Realistico (DSS2)", "smart_calc": "⏱️ Calcolatore Sessione Smart",
                "sunset": "Tramonto", "night_start": "Inizio Notte Astr.", "night_end": "Fine Notte Astr.", "sunrise": "Alba",
                "session_start": "Inizio Sessione:", "session_end": "Fine Sessione:", "sensor_type": "Tipo Sensore:",
                "seq_setup": "Impostazione Sequenza", "gen_seq_btn": "✨ Genera Sequenza Ottimale", "use_frame": "Usa | Frame", "poses_sec": "Pose x Sec.",
                "total": "Totale", "every": "Ogni", "avail_window": "Finestra Disponibile", "acq_time": "Tempo Acquisizione", "res_time": "Tempo Residuo", "time_overflow": "⚠️ Sforamento tempo!",
                "nina_export_title": "🚀 Esportazione N.I.N.A. Advanced Sequencer", "seq_start": "Avvio Sequenza", "cool_cam": "Raffredda Camera a",
                "slew_center": "Slew & Center (Plate Solve)", "start_guide": "Avvia Autoguida", "end_sec": "Fine / Sicurezza", "warm_cam": "Riscalda Camera (Warm Up)",
                "park_mount": "Parcheggia Montatura", "meridian_flip": "Attiva Meridian Flip", "filter_map": "Mappatura Nomi Filtri", "gen_nina_btn": "💾 Genera File per N.I.N.A.",
                "clear": "Sereno", "partly_cloudy": "Poco Nuvoloso", "mostly_cloudy": "Nubi Sparse", "overcast": "Coperto", "daytime": "Giorno",
                "new_moon": "Luna Nuova", "waxing_crescent": "Falce Crescente", "first_quarter": "Primo Quarto", "waxing_gibbous": "Gibbosa Crescente", "full_moon": "Luna Piena", "waning_gibbous": "Gibbosa Calante", "last_quarter": "Ultimo Quarto", "waning_crescent": "Falce Calante",
                "galaxy": "Galassia", "nebula": "Nebulosa", "cluster": "Ammasso", "star": "Stella", "unknown": "Sconosciuta",
                "alert_planetarium": "Scegli prima un bersaglio dal Planetario 🔭!", "alert_noseq": "Nessuna posa calcolata! Clicca prima su 'Genera Sequenza Ottimale'.",
                "alert_calib": "I frame di calibrazione occupano tutto il tempo!", "alert_nolight": "Seleziona almeno un filtro Light.", "alert_times": "Imposta prima gli orari di Inizio e Fine.", "no_target": "Nessun oggetto visibile.", "too_bright": "☀️ Cielo troppo luminoso.", "dso_too_bright": "☀️ Cielo troppo luminoso per il Deep Sky.", "select_opt": "-- Seleziona --",
                "jupiter": "Giove", "mars": "Marte", "venus": "Venere", "moon": "Luna", "sun": "Sole", "weather": "Meteo",
                "mode": "Modalità:", "single_panel": "Scatto Singolo", "mosaic": "Mosaico", "panels": "Pannelli (X, Y):", "overlap": "Sovrapposizione:", "time_per_panel": "Tempo per Pannello", "fov_warning": "⚠️ L'oggetto è più grande del campo! Valuta un mosaico.", "nina_mosaic_msg": "📌 Modalità Mosaico attiva. Usa il Framing Assistant di N.I.N.A. per le coordinate.",
                "gen_report_btn": "📝 Genera Report Strategico", "report_title": "Dossier Mosaico", "copy_report": "Copia negli Appunti", "copied": "Copiato!", "report_general": "Info Generali Mosaico", "report_strategy": "Strategia Singolo Pannello", "report_plan": "Piano di Scatto (Per Pannello)",
                "info_pos": "Cerca un luogo o inserisci coordinate. La mappa mostra un raggio di 50km utile per trovare 'buchi di sereno' spostandoti.",
                "info_env": "Dati meteo professionali estratti dal satellite in tempo reale.",
                "info_planetarium": "Mostra i target visibili calcolando l'altezza sull'orizzonte. Sposta lo slider per simulare la volta celeste stanotte.",
                "info_search": "Cerca un oggetto non in lista. Il sistema interrogherà l'università di Strasburgo (SIMBAD) per scaricare le coordinate assolute.",
                "info_setup": "Inquadra il bersaglio sulla mappa. Se è troppo grande, attiva la modalità 'Mosaico' per far dividere automaticamente al sistema i tempi notturni.",
                "info_smart": "Il sistema riempie il tuo buio notturno generando pose ottimali per cluster, galassie o nebulose, calcolando anche le calibrazioni per sensori Mono.",
                "info_dither": "Muove leggermente la montatura tra uno scatto e l'altro per ridurre il rumore. Il sistema sottrarrà i secondi persi dal totale disponibile.",
                "info_nina": "Salva un file JSON perfetto. Trascinalo dentro N.I.N.A. (Advanced Sequencer) e la sessione partirà in autonomia totale.",
                "mn_title": "📅 Progettazione Multinotte",
                "mn_warning": "⚠️ ATTENZIONE N.I.N.A.: Assicurati che i nomi dei filtri nella 'Mappatura Nomi' (nel pannello principale) corrispondano esattamente a quelli della tua ruota portafiltri, altrimenti il file darà errore!",
                "mn_target_ai": "Target Consigliato",
                "mn_planned": "Tempo Pianificato",
                "mn_add_night": "➕ Aggiungi Sessione (Notte)",
                "ai_strat_title": "🧠 Analisi Strategica",
                "ai_tot_goal": "Obiettivo Totale:",
                "ai_hours": "Ore",
                "ai_plan_btn": "📅 Pianifica Progetto Multi-Notte",
                "mn_sess": "SESSIONE",
                "mn_real_h": "ORE REALI:",
                "mn_start": "INIZIO (> 30°):",
                "mn_end": "FINE (Tramonto/Alba):",
                "mn_filters": "Filtri da riprendere in questa notte:",
                "mn_delete": "🗑️ Elimina",
                "mn_export": "🚀 Export N.I.N.A. Sessione",
                "pro_back": "Torna alla Dashboard Smart",
                "pro_session_start": "Inizio Sessione:",
                "pro_session_end": "Fine Sessione:",
                "pro_overflow": "⚠️ Sforamento! Dividi in Multi-Notte",
                "pro_triggers": "⚙️ Triggers & Hardware",
                "pro_preflight": "Pre-Flight",
                "pro_cool_cam": "Raffredda a",
                "pro_auto_rotator": "Rotatore Automatico",
                "pro_start_guide": "Avvia Autoguida",
                "pro_af_start": "All'avvio sequenza",
                "pro_af_filter": "Al cambio filtro",
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
                "pro_seq_builder": "📸 Calcolatore di Sequenze",
                "pro_export_btn": "💾 Esporta Advanced Sequence (.json)",
                "mn_target_tpt": "🎯 Obiettivo Progetto (TPT)",
                "mn_target_ai_label": "🎯 Target Consigliato dall'assistente",
                "mn_planned_time": "📅 Tempo Pianificato",
                "mn_completed": "% completato"
            },
            en: {
                "manual_btn": "📖 Open Manual", "pos_title": "📍 Location", "find_place": "Find Place:", "search_place": "E.g. Yellowstone...",
                "lat": "Latitude:", "lon": "Longitude:", "env_data": "🎛️ Env Data",
                "low_clouds": "Low Clouds", "mid_clouds": "Mid Clouds", "high_clouds": "High Clouds", "moon_poll": "Moon Poll.",
                "humidity": "Humidity", "seeing_est": "Seeing Est.", "now": "Now",
                "hybrid_planetarium": "🔭 Hybrid Predictive Planetarium", "solar_system": "🪐 Solar System",
                "rec_targets": "🌌 Recommended Targets", "free_search": "🔍 Free Target Search", "search_target": "E.g. M31, Pleiades...",
                "plan_target_btn": "Plan Target 🚀", "back_dash": "Back to Dashboard", "change_target": "Change",
                "dossier": "📖 Astrophotography Dossier", "type": "Type", "app_mag": "App. Magnitude", "distance": "Distance", "wiki_link": "🔗 Wikipedia",
                "tactical_tip": "💡 Tactical Tip:", "optical_setup": "📸 Optical Setup", "telescope": "Telescope:", "focal_len": "Focal (mm):",
                "sensor": "Sensor:", "width": "Width (mm):", "height": "Height (mm):", "fov_calc": "Calculated Field of View",
                "fov_sim": "📐 Realistic FOV Simulator (DSS2)", "smart_calc": "⏱️ Smart Session Calculator",
                "sunset": "Sunset", "night_start": "Astr. Night Starts", "night_end": "Astr. Night Ends", "sunrise": "Sunrise",
                "session_start": "Session Start:", "session_end": "Session End:", "sensor_type": "Sensor Type:",
                "seq_setup": "Sequence Setup", "gen_seq_btn": "✨ Generate Optimal Sequence", "use_frame": "Use | Frame", "poses_sec": "Exposures x Sec",
                "total": "Total", "every": "Every", "avail_window": "Available Window", "acq_time": "Acquisition Time", "res_time": "Residual Time", "time_overflow": "⚠️ Time Overflow!",
                "nina_export_title": "🚀 N.I.N.A. Advanced Sequencer Export", "seq_start": "Sequence Start", "cool_cam": "Cool Camera to",
                "slew_center": "Slew & Center (Plate Solve)", "start_guide": "Start Autoguiding", "end_sec": "End / Safety", "warm_cam": "Warm Up Camera",
                "park_mount": "Park Mount", "meridian_flip": "Enable Meridian Flip", "filter_map": "Filter Name Mapping", "gen_nina_btn": "💾 Generate N.I.N.A. File",
                "clear": "Clear", "partly_cloudy": "Partly Cloudy", "mostly_cloudy": "Mostly Cloudy", "overcast": "Overcast", "daytime": "Daytime",
                "new_moon": "New Moon", "waxing_crescent": "Waxing Crescent", "first_quarter": "First Quarter", "waxing_gibbous": "Waxing Gibbous", "full_moon": "Full Moon", "waning_gibbous": "Waning Gibbous", "last_quarter": "Last Quarter", "waning_crescent": "Waning Crescent",
                "galaxy": "Galaxy", "nebula": "Nebula", "cluster": "Cluster", "star": "Star", "unknown": "Unknown",
                "alert_planetarium": "Choose a target from the Planetarium first 🔭!", "alert_noseq": "No exposures calculated! Click 'Generate Optimal Sequence' first.",
                "alert_calib": "Calibration frames take up all the time!", "alert_nolight": "Select at least one Light filter.", "alert_times": "Please set Start and End times.", "no_target": "No visible objects.", "too_bright": "☀️ Sky is too bright.", "dso_too_bright": "☀️ Sky is too bright for Deep Sky.", "select_opt": "-- Select --",
                "jupiter": "Jupiter", "mars": "Mars", "venus": "Venus", "moon": "Moon", "sun": "Sun", "weather": "Weather",
                "mode": "Mode:", "single_panel": "Single Panel", "mosaic": "Mosaic", "panels": "Panels (X, Y):", "overlap": "Overlap:", "time_per_panel": "Time per Panel", "fov_warning": "⚠️ Target is larger than your FOV! Consider a mosaic.", "nina_mosaic_msg": "📌 Mosaic Mode active. Use N.I.N.A.'s Framing Assistant to generate panel coordinates.",
                "gen_report_btn": "📝 Generate Strategic Report", "report_title": "Mosaic Dossier", "copy_report": "Copy to Clipboard", "copied": "Copied!", "report_general": "General Info", "report_strategy": "Per-Panel Strategy", "report_plan": "Exposure Plan (Per Panel)",
                "info_pos": "Search a location. The map shows a 50km radius to help you find 'clear sky holes' while moving under the clouds.",
                "info_env": "Professional real-time satellite weather data.",
                "info_planetarium": "Shows visible targets based on altitude. Use the slider to simulate the night sky hours.",
                "info_search": "Search any custom object. The system will connect to SIMBAD Strasbourg to download absolute coordinates.",
                "info_setup": "Calculate your FOV. If the target is too big, use 'Mosaic' mode: the system will automatically split your available darkness time.",
                "info_smart": "The system generates optimal exposures based on darkness, target type, and sensor type (Mono or Color).",
                "info_dither": "Shifts the mount slightly between shots to reduce noise. The system subtracts the lost time from your available night window.",
                "info_nina": "Export a perfect JSON file. Drag & drop it into N.I.N.A. Advanced Sequencer for a fully autonomous night.",
                "mn_title": "📅 Multi-Night Project Manager",
                "mn_warning": "⚠️ N.I.N.A. WARNING: Make sure filter names in 'Filter Mapping' perfectly match the names in your filter wheel, or the sequence will fail!",
                "mn_target_ai": "Recommended Target",
                "mn_planned": "Planned Time",
                "mn_add_night": "➕ Add Session (Night)",
                "ai_strat_title": "🧠 Strategic Analysis",
                "ai_tot_goal": "Total Goal:",
                "ai_hours": "Hours",
                "ai_plan_btn": "📅 Plan Multi-Night Project",
                "mn_sess": "SESSION",
                "mn_real_h": "REAL HOURS:",
                "mn_start": "START (> 30°):",
                "mn_end": "END (Dawn/Dusk):",
                "mn_filters": "Filters to capture this night:",
                "mn_delete": "🗑️ Delete",
                "mn_export": "🚀 Export N.I.N.A. Session",
                "pro_back": "Back to Smart Dashboard",
                "pro_session_start": "Session Start:",
                "pro_session_end": "Session End:",
                "pro_overflow": "⚠️ Overflow! Split into Multi-Night",
                "pro_triggers": "⚙️ Triggers & Hardware",
                "pro_preflight": "Pre-Flight",
                "pro_cool_cam": "Cool Camera to",
                "pro_auto_rotator": "Auto Rotator",
                "pro_start_guide": "Start Autoguiding",
                "pro_af_start": "At sequence start",
                "pro_af_filter": "On filter change",
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
                "pro_seq_builder": "📸 Sequence Builder",
                "pro_export_btn": "💾 Export Advanced Sequence (.json)",
                "mn_target_tpt": "🎯 Project Goal (TPT)",
                "mn_target_ai_label": "🎯 Smart Assistant Recommended Target",
                "mn_planned_time": "📅 Planned Time",
                "mn_completed": "% completed"
            },
            es: {
                "manual_btn": "📖 Abrir Manual", "pos_title": "📍 Ubicación", "find_place": "Buscar Lugar:", "search_place": "Ej. Atacama...",
                "lat": "Latitud:", "lon": "Longitud:", "env_data": "🎛️ Datos Ambientales",
                "low_clouds": "Nubes Bajas", "mid_clouds": "Nubes Medias", "high_clouds": "Nubes Altas", "moon_poll": "Ilum. Lunar",
                "humidity": "Humedad", "seeing_est": "Est. Seeing", "now": "Ahora",
                "hybrid_planetarium": "🔭 Planetario Híbrido", "solar_system": "🪐 Sistema Solar",
                "rec_targets": "🌌 Objetivos Recomendados", "free_search": "🔍 Búsqueda Libre", "search_target": "Ej. M31, Pléyades...",
                "plan_target_btn": "Planificar 🚀", "back_dash": "Volver al Panel", "change_target": "Cambiar",
                "dossier": "📖 Dosier Fotográfico", "type": "Tipo", "app_mag": "Magnitud", "distance": "Distancia", "wiki_link": "🔗 Wikipedia",
                "tactical_tip": "💡 Consejo Táctico:", "optical_setup": "📸 Equipo Óptico", "telescope": "Telescopio:", "focal_len": "Focal (mm):",
                "sensor": "Sensor:", "width": "Ancho (mm):", "height": "Alto (mm):", "fov_calc": "Campo de Visión (FOV)",
                "fov_sim": "📐 Simulador FOV Realista (DSS2)", "smart_calc": "⏱️ Calculadora de Sesión Smart",
                "sunset": "Atardecer", "night_start": "Inicio Noche Oscura", "night_end": "Fin Noche Oscura", "sunrise": "Amanecer",
                "session_start": "Inicio Sesión:", "session_end": "Fin Sesión:", "sensor_type": "Tipo de Sensor:",
                "seq_setup": "Configuración de Secuencia", "gen_seq_btn": "✨ Generar Secuencia Óptima", "use_frame": "Usar | Frame", "poses_sec": "Tomas x Seg",
                "total": "Total", "every": "Cada", "avail_window": "Tiempo Disponible", "acq_time": "Tiempo de Captura", "res_time": "Tiempo Restante", "time_overflow": "⚠️ ¡Tiempo excedido!",
                "nina_export_title": "🚀 Exportar Secuencia a N.I.N.A.", "seq_start": "Inicio Secuencia", "cool_cam": "Enfriar Cámara a",
                "slew_center": "Apuntar y Centrar (Plate Solve)", "start_guide": "Iniciar Guiado", "end_sec": "Fin / Seguridad", "warm_cam": "Calentar Cámara",
                "park_mount": "Aparcar Montura", "meridian_flip": "Activar Meridian Flip", "filter_map": "Mapeo Nombres de Filtros", "gen_nina_btn": "💾 Generar Archivo N.I.N.A.",
                "clear": "Despejado", "partly_cloudy": "Poco Nublado", "mostly_cloudy": "Nublado", "overcast": "Cubierto", "daytime": "Día",
                "new_moon": "Luna Nueva", "waxing_crescent": "Luna Creciente", "first_quarter": "Cuarto Creciente", "waxing_gibbous": "Gibosa Creciente", "full_moon": "Luna Llena", "waning_gibbous": "Gibosa Menguante", "last_quarter": "Cuarto Menguante", "waning_crescent": "Luna Menguante",
                "galaxy": "Galaxia", "nebula": "Nebulosa", "cluster": "Cúmulo", "star": "Estrella", "unknown": "Desconocido",
                "alert_planetarium": "¡Elige primero un objetivo en el Planetario 🔭!", "alert_noseq": "¡No se han calculado tomas! Haz clic en 'Generar Secuencia Óptima'.",
                "alert_calib": "¡Las tomas de calibración ocupan todo el tiempo!", "alert_nolight": "Selecciona al menos un filtro Light.", "alert_times": "Configura las horas de Inicio y Fin.", "no_target": "No hay objetos visibles.", "too_bright": "☀️ Cielo demasiado brillante.", "dso_too_bright": "☀️ Cielo demasiado brillante para cielo profundo.", "select_opt": "-- Seleccionar --",
                "jupiter": "Júpiter", "mars": "Marte", "venus": "Venus", "moon": "Luna", "sun": "Sol", "weather": "Clima",
                "mode": "Modo:", "single_panel": "Panel Único", "mosaic": "Mosaico", "panels": "Paneles (X, Y):", "overlap": "Solapamiento:", "time_per_panel": "Tiempo por Panel", "fov_warning": "⚠️ ¡El objeto es más grande que tu campo visual! Considera un mosaico.", "nina_mosaic_msg": "📌 Modo Mosaico activo. Utiliza el Framing Assistant de N.I.N.A. para crear las coordenadas de los paneles.",
                "gen_report_btn": "📝 Generar Informe Estratégico", "report_title": "Dosier Mosaico", "copy_report": "Copiar al Portapapeles", "copied": "¡Copiado!", "report_general": "Info General", "report_strategy": "Estrategia por Panel", "report_plan": "Plan de Captura",
                "info_pos": "El mapa muestra un radio de 50km para encontrar claros en las nubes si te desplazas.",
                "info_env": "Datos meteorológicos satelitales en tiempo real.",
                "info_planetarium": "Muestra objetivos visibles. Desliza la barra temporal para simular el cielo.",
                "info_search": "Busca cualquier objeto. La IA conectará con SIMBAD para descargar las coordenadas.",
                "info_setup": "Si el objeto es más grande que tu sensor, usa Mosaico. La IA dividirá el tiempo nocturno.",
                "info_smart": "La IA asigna tiempos ideales basados en tus horas de oscuridad y tu tipo de cámara.",
                "info_dither": "El Dithering reduce el ruido. La IA restará los segundos perdidos de tu tiempo total.",
                "info_nina": "Genera un archivo JSON. Arrástralo a N.I.N.A. Advanced Sequencer para automatizar toda tu noche.",
                "mn_title": "📅 Gestor Multi-Noche",
                "mn_warning": "⚠️ ATENCIÓN N.I.N.A.: ¡Asegúrate de que los nombres de los filtros en 'Mapeo Nombres' coincidan exactamente con tu rueda de filtros o fallará!",
                "mn_target_ai": "Objetivo",
                "mn_planned": "Tiempo Planeado",
                "mn_add_night": "➕ Añadir Sesión (Noche)",
                "ai_strat_title": "🧠 Análisis Estratégico",
                "ai_tot_goal": "Objetivo Total:",
                "ai_hours": "Horas",
                "ai_plan_btn": "📅 Planificar Proyecto Multi-Noche",
                "mn_sess": "SESIÓN",
                "mn_real_h": "HORAS REALES:",
                "mn_start": "INICIO (> 30°):",
                "mn_end": "FIN (Amanecer):",
                "mn_filters": "Filtros para esta noche:",
                "mn_delete": "🗑️ Eliminar",
                "mn_export": "🚀 Exportar N.I.N.A. Sesión",
                "pro_back": "Volver al Dashboard Smart",
                "pro_session_start": "Inicio de Sesión:",
                "pro_session_end": "Fin de Sesión:",
                "pro_overflow": "⚠️ ¡Desbordamiento! Dividir en Multi-Noche",
                "pro_triggers": "⚙️ Disparadores y Hardware",
                "pro_preflight": "Pre-Vuelo",
                "pro_cool_cam": "Enfriar Cámara a",
                "pro_auto_rotator": "Rotador Automático",
                "pro_start_guide": "Iniciar Autoguiado",
                "pro_af_start": "Al inicio de secuencia",
                "pro_af_filter": "Al cambiar filtro",
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
                "pro_seq_builder": "📸 Constructor de Secuencia",
                "pro_export_btn": "💾 Exportar Secuencia Avanzada (.json)",
                "mn_target_tpt": "🎯 Objetivo del Proyecto (TPT)",
                "mn_target_ai_label": "🎯 Objetivo Recomendado por el Asistente",
                "mn_planned_time": "📅 Tiempo Planificado",
                "mn_completed": "% completado"
            },
            zh: {
                "manual_btn": "📖 打开手册", "pos_title": "📍 位置", "find_place": "查找地点:", "search_place": "例如: 丽江...",
                "lat": "纬度:", "lon": "经度:", "env_data": "🎛️ 环境数据",
                "low_clouds": "低云", "mid_clouds": "中云", "high_clouds": "高云", "moon_poll": "月光影响",
                "humidity": "湿度", "seeing_est": "视宁度预估", "now": "现在",
                "hybrid_planetarium": "🔭 混合预测星图", "solar_system": "🪐 太阳系",
                "rec_targets": "🌌 推荐深空目标", "free_search": "🔍 自由搜索目标", "search_target": "如: M31...",
                "plan_target_btn": "计划拍摄 🚀", "back_dash": "返回仪表板", "change_target": "更改",
                "dossier": "📖 天文目标档案", "type": "类型", "app_mag": "视星等", "distance": "距离", "wiki_link": "🔗 维基百科",
                "tactical_tip": "💡 拍摄建议:", "optical_setup": "📸 光学设置", "telescope": "望远镜:", "focal_len": "焦距 (mm):",
                "sensor": "传感器:", "width": "宽度 (mm):", "height": "高度 (mm):", "fov_calc": "视场 (FOV) 计算",
                "fov_sim": "📐 真实视场模拟器 (DSS2)", "smart_calc": "⏱️ 智能序列计算",
                "sunset": "日落", "night_start": "天文黑夜开始", "night_end": "天文黑夜结束", "sunrise": "日出",
                "session_start": "拍摄开始:", "session_end": "拍摄结束:", "sensor_type": "相机类型:",
                "seq_setup": "序列设置", "gen_seq_btn": "✨ 生成最佳曝光序列", "use_frame": "使用 | 帧类型", "poses_sec": "曝光数 x 秒",
                "total": "总计", "every": "每隔", "avail_window": "可用拍摄窗口", "acq_time": "总曝光时间", "res_time": "剩余时间", "time_overflow": "⚠️ 时间溢出！",
                "nina_export_title": "🚀 N.I.N.A. 高级序列导出", "seq_start": "序列开始前", "cool_cam": "相机降温至",
                "slew_center": "指向并居中 (星板解析)", "start_guide": "开始导星", "end_sec": "结束 / 安全", "warm_cam": "相机回温",
                "park_mount": "赤道仪归位", "meridian_flip": "启用自动中天翻转", "filter_map": "滤镜名称映射", "gen_nina_btn": "💾 生成 N.I.N.A. 文件",
                "clear": "晴朗", "partly_cloudy": "少云", "mostly_cloudy": "多云", "overcast": "阴天", "daytime": "白天",
                "new_moon": "新月", "waxing_crescent": "蛾眉月", "first_quarter": "上弦月", "waxing_gibbous": "盈凸月", "full_moon": "满月", "waning_gibbous": "亏凸月", "last_quarter": "下弦月", "waning_crescent": "残月",
                "galaxy": "星系", "nebula": "星云", "cluster": "星团", "star": "恒星", "unknown": "未知",
                "alert_planetarium": "请先从星图中选择一个目标 🔭！", "alert_noseq": "没有计算出任何曝光！请先点击 '生成最佳曝光序列'。",
                "alert_calib": "校准帧占据了所有可用时间！", "alert_nolight": "请至少选择一个亮场 (Light) 滤镜。", "alert_times": "请先设置开始和结束时间。", "no_target": "当前没有可见目标。", "too_bright": "☀️ 天空太亮了。", "dso_too_bright": "☀️ 天空对深空目标来说太亮了。", "select_opt": "-- 请选择 --",
                "jupiter": "木星", "mars": "火星", "venus": "金星", "moon": "月球", "sun": "太阳", "weather": "天气",
                "mode": "模式:", "single_panel": "单面板", "mosaic": "拼接", "panels": "面板 (X, Y):", "overlap": "重叠度:", "time_per_panel": "每块面板时间", "fov_warning": "⚠️ 目标比你的视场还要大！考虑使用拼接拍摄。", "nina_mosaic_msg": "📌 拼接模式已激活。请使用 N.I.N.A. 的构图助手生成面板坐标。",
                "gen_report_btn": "📝 生成策略报告", "report_title": "拼接拍摄档案", "copy_report": "复制到剪贴板", "copied": "已复制!", "report_general": "基本信息", "report_strategy": "单面板策略", "report_plan": "曝光计划",
                "info_pos": "搜索位置。地图显示 50 公里半径，帮助您在云层下寻找晴空区。",
                "info_env": "专业的实时卫星气象数据。",
                "info_planetarium": "显示可见目标。滑动时间轴以模拟今晚的星空。",
                "info_search": "如果本地数据库没有，系统将连接斯特拉斯堡 (SIMBAD) 获取坐标。",
                "info_setup": "计算视场。如果目标太大，请选择'拼接'，系统会将黑夜时间分配给各面板。",
                "info_smart": "系统根据可用黑夜时间自动分配最佳曝光参数。",
                "info_dither": "微调赤道仪位置以减少噪点。系统会在计算时间时扣除抖动丢失的秒数。",
                "info_nina": "导出 JSON 文件。将其拖入 N.I.N.A. 高级序列器即可实现全自动拍摄。",
                "mn_title": "📅 多夜拍摄项目管理",
                "mn_warning": "⚠️ N.I.N.A. 警告：请确保底部面板的“滤镜名称”与滤镜轮中的名称完全一致，否则序列将报错！",
                "mn_target_ai": "建议目标时间",
                "mn_planned": "已计划时间",
                "mn_add_night": "➕ 添加拍摄会话 (夜晚)",
                "ai_strat_title": "🧠 策略分析",
                "ai_tot_goal": "总目标：",
                "ai_hours": "小时",
                "ai_plan_btn": "📅 计划多夜拍摄",
                "mn_sess": "会话",
                "mn_real_h": "实际时间：",
                "mn_start": "开始 (> 30°)：",
                "mn_end": "结束 (晨昏)：",
                "mn_filters": "本夜拍摄滤镜：",
                "mn_delete": "🗑️ 删除",
                "mn_export": "🚀 导出 N.I.N.A. 会话",
                "pro_back": "返回智能仪表板",
                "pro_session_start": "拍摄开始:",
                "pro_session_end": "拍摄结束:",
                "pro_overflow": "⚠️ 时间溢出！拆分为多夜拍摄",
                "pro_triggers": "⚙️ 触发器与硬件",
                "pro_preflight": "拍摄前准备",
                "pro_cool_cam": "相机降温至",
                "pro_auto_rotator": "自动旋转器",
                "pro_start_guide": "开始自动导星",
                "pro_af_start": "序列开始时",
                "pro_af_filter": "切换滤镜时",
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
                "pro_seq_builder": "📸 序列构建器",
                "pro_export_btn": "💾 导出高级序列 (.json)",
                "mn_target_tpt": "🎯 项目目标 (TPT)",
                "mn_target_ai_label": "🎯 智能助手推荐目标",
                "mn_planned_time": "📅 已计划时间",
                "mn_completed": "% 已完成"
            }
        };

        // lang già dichiarato in i18n.js
        i18n.it.go_to_pro = "Vai al Calcolatore PRO";
        i18n.en.go_to_pro = "Go to PRO Calculator";
        i18n.es.go_to_pro = "Ir a la Calculadora PRO";
        i18n.zh.go_to_pro = "进入 PRO 计算器";
        i18n.it.mosaic_active_msg = "✅ Modalità Mosaico attiva.";
        i18n.en.mosaic_active_msg = "✅ Mosaic Mode active.";
        i18n.es.mosaic_active_msg = "✅ Modo Mosaico activo.";
        i18n.zh.mosaic_active_msg = "✅ 拼接模式已激活。";
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
        i18n.it.save_btn = "💾 Salva";
        i18n.en.save_btn = "💾 Save";
        i18n.es.save_btn = "💾 Guardar";
        i18n.zh.save_btn = "💾 保存";
        i18n.it.aperture = "Diametro (mm):";
        i18n.en.aperture = "Aperture (mm):";
        i18n.es.aperture = "Diámetro (mm):";
        i18n.zh.aperture = "口径 (mm):";

        i18n.it.asiair_close = "✅ Chiudi e Vai al Telescopio";
        i18n.en.asiair_close = "✅ Close and Go to Mount";
        i18n.es.asiair_close = "✅ Cerrar e Ir al Telescopio";
        i18n.zh.asiair_close = "✅ 关闭并开始拍摄";
        i18n.it.export_asiair = "🔴 Esporta per ZWO ASIAIR";
        i18n.en.export_asiair = "🔴 Export ZWO ASIAIR";
        i18n.es.export_asiair = "🔴 Exportar ZWO ASIAIR";
        i18n.zh.export_asiair = "🔴 导出 ZWO ASIAIR";
        i18n.it.info_strat_analysis = "L'analisi è generata da un algoritmo matematico che valuta la tipologia del bersaglio, la magnitudine, il rapporto focale dello strumento, l'inquinamento lunare e le caratteristiche del sensore per stimare il tempo di integrazione ideale.";
        i18n.en.info_strat_analysis = "The analysis is generated by a mathematical algorithm that evaluates the target type, its magnitude, your instrument's focal ratio, lunar pollution, and sensor characteristics to estimate the ideal integration time.";
        i18n.es.info_strat_analysis = "El análisis es generado por un algoritmo matemático que evalúa el tipo de objetivo, la magnitud, la relación focal del instrumento, la contaminación lunar y las características del sensor para estimar el tiempo ideal de integración.";
        i18n.zh.info_strat_analysis = "该分析由数学算法生成，综合评估目标类型、星等、仪器的焦比、月光污染以及传感器特性，从而估算出理想的曝光时间。";
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

        i18n.it.oversampled = "⚠️ Sovracampionato (Luce dispersa, minor SNR)";
        i18n.en.oversampled = "⚠️ Oversampled (Light spread, lower SNR)";
        i18n.es.oversampled = "⚠️ Sobremuestreado (Pérdida de luz/SNR)";
        i18n.zh.oversampled = "⚠️ 过采样 (星点模糊, 信噪比低)";

        i18n.it.ideal_sampling = "✅ Campionamento Ideale";
        i18n.en.ideal_sampling = "✅ Ideal Sampling";
        i18n.es.ideal_sampling = "✅ Muestreo Ideal";
        i18n.zh.ideal_sampling = "✅ 理想采样";

        i18n.it.undersampled = "⚠️ Sottocampionato (Stelle squadrate)";
        i18n.en.undersampled = "⚠️ Undersampled (Blocky stars)";
        i18n.es.undersampled = "⚠️ Submuestreado (Estrellas cuadradas)";
        i18n.zh.undersampled = "⚠️ 欠采样 (星点呈方形)";
        i18n.it.rotate_target = "Ruota Camera (Rotatore Auto)";
        i18n.en.rotate_target = "Rotate Camera (Auto Rotator)";
        i18n.es.rotate_target = "Rotar Cámara (Rotador Auto)";
        i18n.zh.rotate_target = "旋转相机 (自动旋转器)";

        

        i18n.it.fov_center_title = "📍 Centro FOV";
        i18n.en.fov_center_title = "📍 FOV Center";
        i18n.es.fov_center_title = "📍 Centro FOV";
        i18n.zh.fov_center_title = "📍 视场中心";

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

        i18n.it.meridian_flip_warn = "⚠️ Il Meridian Flip cade dentro la sessione pianificata! Considera di spezzare la sequenza in due blocchi.";
        i18n.en.meridian_flip_warn = "⚠️ Meridian Flip falls within the planned session! Consider splitting the sequence into two blocks.";
        i18n.es.meridian_flip_warn = "⚠️ El Meridian Flip ocurre durante la sesión planificada. Considera dividir la secuencia en dos bloques.";
        i18n.zh.meridian_flip_warn = "⚠️ 子午翻转发生在计划拍摄时间段内！建议将序列分为两段。";

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

        i18n.it.bias_overhead_tip = "Tempo tecnico stimato per frame (readout sensore + salvataggio FITS). I Bias hanno exp=0 ma richiedono comunque questo overhead per file.";
        i18n.en.bias_overhead_tip = "Estimated technical overhead per frame (sensor readout + FITS save). Bias frames have exp=0 but still require this per-frame overhead.";
        i18n.es.bias_overhead_tip = "Sobrecarga técnica estimada por fotograma (lectura del sensor + guardado FITS). Los Bias tienen exp=0 pero requieren este tiempo.";
        i18n.zh.bias_overhead_tip = "每帧预估技术开销（传感器读出 + FITS保存）。偏置帧曝光=0，但每帧仍需此时间开销。";

        i18n.it.rotate_hint = "📱 Per una visualizzazione ottimale della griglia filtri, ruota il telefono in orizzontale.";
        i18n.en.rotate_hint = "📱 For optimal filter grid display, rotate your phone to landscape.";
        i18n.es.rotate_hint = "📱 Para una visualización óptima de la cuadrícula, gira el teléfono en horizontal.";
        i18n.zh.rotate_hint = "📱 为了最佳滤镜网格显示效果，请将手机横向旋转。";

        i18n.it.bin_label = "BIN:";
        i18n.en.bin_label = "BIN:";
        i18n.es.bin_label = "BIN:";
        i18n.zh.bin_label = "像素合并:";

        i18n.it.report_pdf_btn    = "📄 Esporta Report HTML";
        i18n.en.report_pdf_btn    = "📄 Export HTML Report";
        i18n.es.report_pdf_btn    = "📄 Exportar Informe HTML";
        i18n.zh.report_pdf_btn    = "📄 导出HTML报告";

        i18n.it.report_mn_pdf_btn = "📄 Esporta Report HTML Progetto";
        i18n.en.report_mn_pdf_btn = "📄 Export Project HTML Report";
        i18n.es.report_mn_pdf_btn = "📄 Exportar Informe HTML del Proyecto";
        i18n.zh.report_mn_pdf_btn = "📄 导出项目HTML报告";

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

        i18n.it.sw_update_msg       = "Aggiornamento disponibile";
        i18n.en.sw_update_msg       = "Update available";
        i18n.es.sw_update_msg       = "Actualizacion disponible";
        i18n.zh.sw_update_msg       = "有可用更新";

        i18n.it.sw_update_btn       = "Ricarica";
        i18n.en.sw_update_btn       = "Reload";
        i18n.es.sw_update_btn       = "Recargar";
        i18n.zh.sw_update_btn       = "刷新";

        i18n.it.rpt_alert_no_nights = "Nessuna notte pianificata!";
        i18n.en.rpt_alert_no_nights = "No nights planned!";
        i18n.es.rpt_alert_no_nights = "Ninguna noche planificada!";
        i18n.zh.rpt_alert_no_nights = "未规划任何夜晚！";

        function t(key) { return i18n[lang][key] || key; }
