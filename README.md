# AstrodashboardPro
Dashboard per la pianificazione astrofotografica totale globale

**Licenza:** codice © 2025-2026 Enrico Salis, tutti i diritti riservati (non open source). L'app è gratuita su www.astrodashboardpro.com. I componenti di terze parti mantengono le proprie licenze (vedi sotto e il file `LICENSE`).

## Fonti dei dati, servizi e licenze

AstroDashboard PRO usa dati e servizi di terze parti. Ringraziamo gli autori e citiamo qui fonti e licenze.

### Dati inclusi nella repository

| File | Fonte | Licenza |
|---|---|---|
| `js/catalogs.json` | [Catalogo DSO di Stellarium](https://github.com/Stellarium/stellarium) (v3.23): NGC, IC, Messier, Caldwell, Barnard, Sharpless, van den Bergh, LDN, LBN, Collinder, Melotte | GPL-2.0-or-later |
| `js/catalogs.json` (16 oggetti NGC/IC) | [OpenNGC](https://github.com/mattiaverga/OpenNGC) di Mattia Verga | CC BY-SA 4.0 |

`js/catalogs.json` è un estratto ridotto e convertito di queste fonti (coordinate, tipo, magnitudine, dimensione,
distanza, designazioni) e resta soggetto alle rispettive licenze. Il catalogo locale viene usato quando SIMBAD
non è raggiungibile.

### Servizi online usati dall'app

| Servizio | Uso | Note / licenza |
|---|---|---|
| [SIMBAD](https://simbad.cds.unistra.fr/) e Sesame, CDS Strasburgo | Ricerca e coordinate degli oggetti | ODbL. *This research has made use of the SIMBAD database, operated at CDS, Strasbourg, France.* |
| [Aladin Lite](https://aladin.cds.unistra.fr/AladinLite/), CDS Strasburgo | Simulatore FOV | GPL-3.0, distribuito via [jsDelivr](https://www.jsdelivr.com/) |
| Digitized Sky Survey (DSS2 a colori), HiPS del CDS; copie di riserva [ESA ESASky](https://sky.esa.int/) e [MAST/STScI](https://archive.stsci.edu/) | Immagini del cielo nel simulatore FOV | *The Digitized Sky Surveys were produced at the Space Telescope Science Institute under U.S. Government grant NAG W-2166.* |
| [Open-Meteo](https://open-meteo.com/) | Previsioni meteo | Dati CC BY 4.0 |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) / [Nominatim](https://nominatim.org/) | Ricerca dei luoghi | © OpenStreetMap contributors, ODbL |
| [CARTO](https://carto.com/attributions) | Mappa di base | © CARTO, © OpenStreetMap contributors |
| [Light Pollution Atlas 2024](https://djlorenz.github.io/astronomy/lp/), D. Lorenz (dati VIIRS) | Livello inquinamento luminoso | Secondo le condizioni dell'autore |
| [Wikipedia](https://www.wikipedia.org/) / [Wikidata](https://www.wikidata.org/) | Descrizioni degli oggetti | Testi Wikipedia CC BY-SA 4.0; Wikidata CC0 |
| [NASA Image and Video Library](https://images.nasa.gov/) | Galleria immagini degli oggetti | Secondo le [linee guida NASA](https://www.nasa.gov/nasa-brand-center/images-and-media/) |
| [GoatCounter](https://www.goatcounter.com/) | Statistiche di visita anonime | — |

### Librerie

| Libreria | Licenza |
|---|---|
| [Leaflet](https://leafletjs.com/) | BSD-2-Clause |
| [SunCalc](https://github.com/mourner/suncalc) | BSD-2-Clause |
| [Chart.js](https://www.chartjs.org/) | MIT |
| [jsPDF](https://github.com/parallax/jsPDF) e [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) | MIT |
| [Rive](https://rive.app/) (runtime web) | MIT |
| Font [Audiowide](https://fonts.google.com/specimen/Audiowide) | SIL Open Font License 1.1 |
