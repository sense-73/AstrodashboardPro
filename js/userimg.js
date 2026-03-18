// userimg.js — Foto personali DSO via IndexedDB
// Priorità finale: IndexedDB utente > images/dso/ > images/ext/ > emoji
// ============================================================

// ── IndexedDB wrapper ────────────────────────────────────────────────────────
const UserImgDB = (() => {
    const DB_NAME = 'AstroDashboardDB', DB_VERSION = 1, STORE = 'userImages';
    let _db = null;
    function _open() {
        return new Promise((resolve, reject) => {
            if (_db) { resolve(_db); return; }
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = e => { e.target.result.createObjectStore(STORE); };
            req.onsuccess  = e => { _db = e.target.result; resolve(_db); };
            req.onerror    = e => reject(e.target.error);
        });
    }
    return {
        async get(id) {
            try {
                const db = await _open();
                return new Promise(resolve => {
                    const req = db.transaction(STORE,'readonly').objectStore(STORE).get(id);
                    req.onsuccess = () => resolve(req.result || null);
                    req.onerror   = () => resolve(null);
                });
            } catch(e) { return null; }
        },
        async set(id, dataUrl) {
            const db = await _open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE,'readwrite');
                tx.objectStore(STORE).put(dataUrl, id);
                tx.oncomplete = () => resolve();
                tx.onerror    = e => reject(e.target.error);
            });
        },
        async remove(id) {
            const db = await _open();
            return new Promise(resolve => {
                const tx = db.transaction(STORE,'readwrite');
                tx.objectStore(STORE).delete(id);
                tx.oncomplete = () => resolve();
                tx.onerror    = () => resolve();
            });
        }
    };
})();

// ── Costanti ─────────────────────────────────────────────────────────────────
const _MAX_FILE_MB  = 3;
const _MAX_FILE_PX  = 4000;
const _THUMB_SIZE   = 200;

// ── SVG icona camera-upload ──────────────────────────────────────────────────
const _ICON_CAM_UP = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"/><path d="M12 16a3 3 0 1 0 0 -6a3 3 0 0 0 0 6"/><path d="M19 22v-6"/><path d="M22 19l-3 -3l-3 3"/></svg>`;

// ── Crea / recupera il modal ─────────────────────────────────────────────────
function _getUploadModal() {
    let m = document.getElementById('_dso_upload_modal');
    if (m) return m;

    m = document.createElement('div');
    m.id = '_dso_upload_modal';
    m.style.cssText = 'display:none;position:fixed;inset:0;z-index:10001;background:rgba(5,8,15,0.88);backdrop-filter:blur(5px);align-items:center;justify-content:center;';

    const iconCamLg = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c49a3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"/><path d="M12 16a3 3 0 1 0 0 -6a3 3 0 0 0 0 6"/><path d="M19 22v-6"/><path d="M22 19l-3 -3l-3 3"/></svg>`;
    const iconBrowse = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"/><path d="M12 16a3 3 0 1 0 0 -6a3 3 0 0 0 0 6"/><path d="M19 22v-6"/><path d="M22 19l-3 -3l-3 3"/></svg>`;
    const iconImg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3d4852" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/></svg>`;

    m.innerHTML = `
    <div style="background:#161b22;border:1px solid #2d3a50;border-radius:14px;max-width:420px;width:92vw;position:relative;box-shadow:0 8px 40px rgba(0,0,0,0.7);overflow:hidden;">

      <div style="padding:18px 20px 14px;border-bottom:1px solid #21293a;display:flex;align-items:center;gap:10px;">
        <div style="width:32px;height:32px;background:rgba(196,154,60,0.1);border:1px solid rgba(196,154,60,0.3);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${iconCamLg}</div>
        <div>
          <div style="font-size:14px;font-weight:700;color:#c9d1d9;" id="_dum_title">Carica la tua foto</div>
          <div style="font-size:11px;color:#6e7a8a;" id="_dum_sub">Foto personale per questo oggetto</div>
        </div>
        <button id="_dum_close" style="margin-left:auto;background:transparent;border:none;color:#3d4852;font-size:20px;cursor:pointer;line-height:1;padding:4px 6px;border-radius:6px;transition:color 0.15s;" onmouseover="this.style.color='#ff4444'" onmouseout="this.style.color='#3d4852'">✕</button>
      </div>

      <div style="padding:18px 20px 0;">

        <div id="_dum_dropzone" style="border:2px dashed #2d3a50;border-radius:10px;padding:24px 16px;text-align:center;cursor:pointer;transition:all 0.2s;background:#0d1117;"
             onmouseover="if(!document.getElementById('_dum_preview').style.display||document.getElementById('_dum_preview').style.display==='none')this.style.borderColor='rgba(196,154,60,0.5)'"
             onmouseout="this.style.borderColor='#2d3a50'"
             ondragover="event.preventDefault();this.style.borderColor='#c49a3c';this.style.background='rgba(196,154,60,0.05)'"
             ondragleave="this.style.borderColor='#2d3a50';this.style.background='#0d1117'"
             ondrop="_dsoHandleDrop(event)">
          <div id="_dum_placeholder">
            ${iconImg}
            <div style="font-size:13px;color:#6e7a8a;margin:8px 0 4px;">Trascina qui la tua foto oppure</div>
            <div style="font-size:11px;color:#3d4852;">JPG · PNG · WEBP</div>
          </div>
          <div id="_dum_preview" style="display:none;">
            <img id="_dum_preview_img" style="max-width:140px;max-height:140px;border-radius:8px;object-fit:cover;border:1px solid #21293a;" alt="preview">
            <div id="_dum_preview_info" style="font-size:11px;color:#6e7a8a;margin-top:8px;"></div>
          </div>
        </div>

        <div id="_dum_error" style="display:none;margin-top:10px;padding:10px 14px;background:rgba(138,74,74,0.12);border:1px solid rgba(138,74,74,0.4);border-radius:8px;font-size:12px;color:#ffaaaa;line-height:1.6;text-align:left;"></div>

        <div style="margin-top:12px;padding:10px 12px;background:rgba(196,154,60,0.05);border:1px solid rgba(196,154,60,0.15);border-radius:8px;text-align:left;">
          <div style="font-size:10px;color:#c49a3c;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">Formato consigliato</div>
          <div style="font-size:11px;color:#6e7a8a;line-height:1.7;">
            <span style="color:#c9d1d9;">512 × 512 pixel</span> — 72 dpi<br>
            Peso massimo <span style="color:#c9d1d9;">3 MB</span> &nbsp;·&nbsp; Formati: <span style="color:#c9d1d9;">JPG, PNG, WEBP</span><br>
            <span style="color:#3d4852;font-size:10px;">L'immagine verrà ridimensionata automaticamente prima del salvataggio.</span>
          </div>
        </div>
      </div>

      <div style="padding:16px 20px;display:flex;gap:10px;justify-content:flex-end;">
        <button id="_dum_btn_cancel" style="background:transparent;border:1px solid #21293a;color:#6e7a8a;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:13px;transition:all 0.15s;" onmouseover="this.style.borderColor='#3d4852';this.style.color='#c9d1d9'" onmouseout="this.style.borderColor='#21293a';this.style.color='#6e7a8a'">Annulla</button>
        <button id="_dum_btn_browse" style="background:linear-gradient(135deg,#c49a3c,#a07828);border:none;color:#0d1117;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;display:flex;align-items:center;gap:7px;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${iconBrowse} Scegli file</button>
        <button id="_dum_btn_save" style="display:none;background:linear-gradient(135deg,#4a8a6f,#2d6b52);border:none;color:#fff;padding:9px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">✓ Salva foto</button>
      </div>
    </div>`;

    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) _chiudiUploadModal(); });
    document.getElementById('_dum_close').onclick   = _chiudiUploadModal;
    document.getElementById('_dum_btn_cancel').onclick = _chiudiUploadModal;
    document.getElementById('_dum_dropzone').onclick = () => {
        if (document.getElementById('_dum_preview').style.display === 'none') {
            document.getElementById('_dum_btn_browse').click();
        }
    };
    return m;
}

// ── Stato temporaneo del modal ───────────────────────────────────────────────
let _dumState = { tObj: null, wrapEl: null, imgEl: null, pendingDataUrl: null };

function _chiudiUploadModal() {
    const m = document.getElementById('_dso_upload_modal');
    if (m) m.style.display = 'none';
    _dumState.pendingDataUrl = null;
    const ph = document.getElementById('_dum_placeholder');
    const pv = document.getElementById('_dum_preview');
    const er = document.getElementById('_dum_error');
    const bs = document.getElementById('_dum_btn_save');
    if (ph) ph.style.display = 'block';
    if (pv) { pv.style.display = 'none'; }
    if (er) { er.style.display = 'none'; er.innerHTML = ''; }
    if (bs) bs.style.display = 'none';
    const dz = document.getElementById('_dum_dropzone');
    if (dz) { dz.style.borderColor = '#2d3a50'; dz.style.background = '#0d1117'; }
}

function _dsoHandleDrop(e) {
    e.preventDefault();
    const dz = document.getElementById('_dum_dropzone');
    if (dz) { dz.style.borderColor = '#2d3a50'; dz.style.background = '#0d1117'; }
    const file = e.dataTransfer && e.dataTransfer.files[0];
    if (file) _dsoProcessFile(file);
}

function _dsoProcessFile(file) {
    const errEl = document.getElementById('_dum_error');
    const ph    = document.getElementById('_dum_placeholder');
    const pv    = document.getElementById('_dum_preview');
    const pvImg = document.getElementById('_dum_preview_img');
    const pvInf = document.getElementById('_dum_preview_info');
    const bsSv  = document.getElementById('_dum_btn_save');

    if (errEl) { errEl.style.display = 'none'; errEl.innerHTML = ''; }
    _dumState.pendingDataUrl = null;
    if (bsSv) bsSv.style.display = 'none';

    if (!file.type.startsWith('image/')) {
        _dsoShowUploadError('Il file selezionato non è un\'immagine.<br>Usa un file <b>JPG, PNG</b> o <b>WEBP</b>.');
        return;
    }

    const fileMB = file.size / (1024 * 1024);
    if (fileMB > _MAX_FILE_MB) {
        _dsoShowUploadError(
            `<b>File troppo pesante</b> (${fileMB.toFixed(1)} MB — limite ${_MAX_FILE_MB} MB).<br><br>` +
            `Prepara la foto con le dimensioni corrette:<br>` +
            `<span style="color:#ffcc88;">512 × 512 pixel &nbsp;·&nbsp; 72 dpi &nbsp;·&nbsp; max ${_MAX_FILE_MB} MB</span><br><br>` +
            `Puoi ridimensionarla gratuitamente con:<br>` +
            `<b>squoosh.app</b> &nbsp;·&nbsp; <b>compressor.io</b> &nbsp;·&nbsp; Photoshop &nbsp;·&nbsp; GIMP`
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
            if (img.width > _MAX_FILE_PX || img.height > _MAX_FILE_PX) {
                _dsoShowUploadError(
                    `<b>Immagine troppo grande</b> (${img.width} × ${img.height} px).<br><br>` +
                    `Ridimensionala a <span style="color:#ffcc88;">512 × 512 pixel</span> prima di caricarla.<br>` +
                    `Usa <b>squoosh.app</b> o <b>compressor.io</b> (gratuiti, online).`
                );
                return;
            }
            if (pvImg) pvImg.src = ev.target.result;
            if (pvInf) pvInf.innerHTML = `${img.width} × ${img.height} px &nbsp;·&nbsp; ${fileMB.toFixed(2)} MB`;
            if (ph) ph.style.display = 'none';
            if (pv) pv.style.display = 'block';

            const ratio  = Math.min(_THUMB_SIZE / img.width, _THUMB_SIZE / img.height, 1);
            const canvas = document.createElement('canvas');
            canvas.width  = Math.round(img.width  * ratio);
            canvas.height = Math.round(img.height * ratio);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            _dumState.pendingDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            if (bsSv) bsSv.style.display = 'block';
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
}

function _dsoShowUploadError(html) {
    const errEl = document.getElementById('_dum_error');
    if (!errEl) return;
    errEl.innerHTML = '⚠️ &nbsp;' + html;
    errEl.style.display = 'block';
    const ph = document.getElementById('_dum_placeholder');
    const pv = document.getElementById('_dum_preview');
    if (ph) ph.style.display = 'block';
    if (pv) pv.style.display = 'none';
    _dumState.pendingDataUrl = null;
    const bs = document.getElementById('_dum_btn_save');
    if (bs) bs.style.display = 'none';
}

// ── Applica immagine utente alla card ────────────────────────────────────────
function _dsoApplyUserImg(imgEl, wrapEl, dataUrl, delBtn) {
    if (imgEl) {
        imgEl.src = dataUrl;
    } else {
        const span = wrapEl.querySelector('span');
        if (span) {
            const newImg = document.createElement('img');
            newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
            wrapEl.replaceChild(newImg, span);
            newImg.src = dataUrl;
            wrapEl._userImgEl = newImg;
        }
    }
    wrapEl.classList.add('has-user-img');
    // il × appare via CSS solo all'hover (.dso-card:hover) — nessun inline override
}

// ── Apre il modal upload ─────────────────────────────────────────────────────
function dsoUploadFoto(tObj, wrapEl, imgEl) {
    _dumState = { tObj, wrapEl, imgEl, pendingDataUrl: null };
    const modal = _getUploadModal();

    const title = document.getElementById('_dum_title');
    const sub   = document.getElementById('_dum_sub');
    const btnBr = document.getElementById('_dum_btn_browse');
    const btnSv = document.getElementById('_dum_btn_save');

    if (title) title.textContent = 'Carica la tua foto';
    if (sub)   sub.textContent   = tObj.name ? `Foto personale per ${tObj.name}` : 'Foto personale';

    if (btnBr) {
        btnBr.onclick = () => {
            const input = document.createElement('input');
            input.type   = 'file';
            input.accept = 'image/jpeg,image/png,image/webp';
            input.onchange = e => { const f = e.target.files[0]; if (f) _dsoProcessFile(f); };
            input.click();
        };
    }

    if (btnSv) {
        btnSv.onclick = async () => {
            if (!_dumState.pendingDataUrl) return;
            await UserImgDB.set(_dumState.tObj.id, _dumState.pendingDataUrl);
            const delBtn = _dumState.wrapEl.querySelector('.dso-delete-btn');
            const target = _dumState.wrapEl._userImgEl || _dumState.imgEl;
            _dsoApplyUserImg(target, _dumState.wrapEl, _dumState.pendingDataUrl, delBtn);
            _chiudiUploadModal();
            mostraAvviso('📸 Foto personale salvata!', 'ok');
        };
    }

    modal.style.display = 'flex';
}

// ── Elimina foto utente ──────────────────────────────────────────────────────
async function dsoDeleteFoto(tObj, wrapEl, imgEl, originalPath) {
    await UserImgDB.remove(tObj.id);
    wrapEl.classList.remove('has-user-img');

    const delBtn = wrapEl.querySelector('.dso-delete-btn');
    if (delBtn) delBtn.style.removeProperty('display'); // lascia il controllo al CSS

    if (originalPath) {
        const target = wrapEl._userImgEl || imgEl;
        if (target) target.src = originalPath;
        wrapEl._userImgEl = null;
    } else {
        const imgToRemove = wrapEl._userImgEl || wrapEl.querySelector('img');
        if (imgToRemove) {
            const span = document.createElement('span');
            span.style.fontSize = '2em';
            span.textContent = tObj.icon || '✨';
            wrapEl.replaceChild(span, imgToRemove);
            wrapEl._userImgEl = null;
        }
    }
    mostraAvviso('Foto rimossa — ripristinata l\'immagine di default', 'warn');
}
