#!/bin/bash
# =============================================================
# AstroDashboard PRO — Setup cartelle immagini DSO
# Esegui questo script dalla cartella "stabile_recovery"
# =============================================================

echo "Creazione cartelle..."
mkdir -p images/dso
mkdir -p images/ext

echo ""
echo "=== COPIA TUE FOTO (rinominate) ==="
echo "Sostituisci YOUR_CUSTOM_FOLDER con il percorso della tua cartella foto"
echo ""

CUSTOM="YOUR_CUSTOM_FOLDER"

cp "$CUSTOM/proboscide di elefante.png"  images/dso/ic1396.png
cp "$CUSTOM/sh2-190 nebulosa cuore.png"  images/dso/ic1805.png
cp "$CUSTOM/horse head.png"              images/dso/ic434.png
cp "$CUSTOM/giove.png"                   images/dso/jupiter.png
cp "$CUSTOM/crab nebula.png"             images/dso/m1.png
cp "$CUSTOM/m13.png"                     images/dso/m13.png
cp "$CUSTOM/nebulosa aquila.png"         images/dso/m16.png
cp "$CUSTOM/m27.png"                     images/dso/m27.png
cp "$CUSTOM/andromeda.png"               images/dso/m31.png
cp "$CUSTOM/galassia del triangolo.png"  images/dso/m33.png
cp "$CUSTOM/m42.png"                     images/dso/m42.png
cp "$CUSTOM/pleiadi_adp.png"             images/dso/m45.png
cp "$CUSTOM/m51 vortice.png"             images/dso/m51.png
cp "$CUSTOM/bode galaxy.png"             images/dso/m81.png
cp "$CUSTOM/galassia sigaro.png"         images/dso/m82.png
cp "$CUSTOM/luna.png"                    images/dso/moon.png
cp "$CUSTOM/california.png"             images/dso/ngc1499.png
cp "$CUSTOM/ngc2237.png"                images/dso/ngc2244.png
cp "$CUSTOM/elmo di thor.png"           images/dso/ngc2359.png
cp "$CUSTOM/ngc4631.png"                images/dso/ngc4631.png
cp "$CUSTOM/ngc5906.png"                images/dso/ngc5907.png
cp "$CUSTOM/crescent nebula.png"        images/dso/ngc6888.png
cp "$CUSTOM/C12.png"                    images/dso/ngc6946.png
cp "$CUSTOM/iris nebula.png"            images/dso/ngc7023.png
cp "$CUSTOM/c30.png"                    images/dso/ngc7331.png
cp "$CUSTOM/nebulosa mago.png"          images/dso/ngc7380.png
cp "$CUSTOM/ngc891.png"                 images/dso/ngc891.png
cp "$CUSTOM/nebulosa tulipano.png"      images/dso/sh2-101.png

echo ""
echo "=== COPIA DATABASE ESTERNO ==="
echo "Sostituisci EXT_DB_FOLDER con il percorso della cartella astro_images"
echo ""

EXT="EXT_DB_FOLDER"   # es: /percorso/a/astro_images

cp "$EXT/ic1848.png"    images/ext/
cp "$EXT/ic2177.png"    images/ext/
cp "$EXT/ic410.png"     images/ext/
cp "$EXT/ic5070.png"    images/ext/
cp "$EXT/ic5146.png"    images/ext/
cp "$EXT/lmc.png"       images/ext/
cp "$EXT/m101.png"      images/ext/
cp "$EXT/m104.png"      images/ext/
cp "$EXT/m106.png"      images/ext/
cp "$EXT/m11.png"       images/ext/
cp "$EXT/m15.png"       images/ext/
cp "$EXT/m17.png"       images/ext/
cp "$EXT/m20.png"       images/ext/
cp "$EXT/m22.png"       images/ext/
cp "$EXT/m3.png"        images/ext/
cp "$EXT/m35.png"       images/ext/
cp "$EXT/m4.png"        images/ext/
cp "$EXT/m44.png"       images/ext/
cp "$EXT/m57.png"       images/ext/
cp "$EXT/m6.png"        images/ext/
cp "$EXT/m63.png"       images/ext/
cp "$EXT/m64.png"       images/ext/
cp "$EXT/m65.png"       images/ext/
cp "$EXT/m66.png"       images/ext/
cp "$EXT/m7.png"        images/ext/
cp "$EXT/m74.png"       images/ext/
cp "$EXT/m76.png"       images/ext/
cp "$EXT/m78.png"       images/ext/
cp "$EXT/m83.png"       images/ext/
cp "$EXT/m8.png"        images/ext/
cp "$EXT/m92.png"       images/ext/
cp "$EXT/m97.png"       images/ext/
cp "$EXT/markarian.png" images/ext/
cp "$EXT/ngc253.png"    images/ext/
cp "$EXT/ngc281.png"    images/ext/
cp "$EXT/ngc2070.png"   images/ext/
cp "$EXT/ngc2174.png"   images/ext/
cp "$EXT/ngc2264.png"   images/ext/
cp "$EXT/ngc2392.png"   images/ext/
cp "$EXT/ngc2403.png"   images/ext/
cp "$EXT/ngc3242.png"   images/ext/
cp "$EXT/ngc3372.png"   images/ext/
cp "$EXT/ngc3628.png"   images/ext/
cp "$EXT/ngc4038.png"   images/ext/
cp "$EXT/ngc4565.png"   images/ext/
cp "$EXT/ngc5092.png"   images/ext/
cp "$EXT/ngc5128.png"   images/ext/
cp "$EXT/ngc5139.png"   images/ext/
cp "$EXT/ngc6334.png"   images/ext/
cp "$EXT/ngc6357.png"   images/ext/
cp "$EXT/ngc6543.png"   images/ext/
cp "$EXT/ngc6960.png"   images/ext/
cp "$EXT/ngc6992.png"   images/ext/
cp "$EXT/ngc7000.png"   images/ext/
cp "$EXT/ngc7293.png"   images/ext/
cp "$EXT/ngc7789.png"   images/ext/
cp "$EXT/ngc869.png"    images/ext/
cp "$EXT/ou4.png"       images/ext/
cp "$EXT/sh2_155.png"   images/ext/
cp "$EXT/sh2_240.png"   images/ext/
cp "$EXT/sh2_308.png"   images/ext/
cp "$EXT/smc.png"       images/ext/
cp "$EXT/stephan.png"   images/ext/

echo ""
echo "Struttura finale:"
echo "  stabile_recovery/"
echo "  ├── images/"
echo "  │   ├── dso/   ← 28 tue foto (rinominate per ID)"
echo "  │   └── ext/   ← 63 foto database esterno"
echo ""
echo "Done!"
