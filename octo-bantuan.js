/*! Octopus Bantuan + Masukan. Isi per aplikasi: window.OCTO_BANTUAN (lihat bantuan-isi.js). */
(function () {
  'use strict';
  if (window.OctoBantuan) return;

  var D = window.OCTO_BANTUAN || {};
  var me = document.currentScript;
  var APP = D.app || (me && me.getAttribute('data-app')) || 'Aplikasi';
  var CONFIG = {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfsUt_5JA8ZsR550JQWqb9hPzTelEhAM0H1VyJJ9bsTLPNXBA/viewform',
    formEntry: D.formEntry || 'entry.510592713',   // ID kolom "Aplikasi" di Google Form, mis. 'entry.123456789'
    endpoint: '', whatsapp: '', email: '',
    tutorialUrl: D.tutorialUrl || '', manualUrl: D.manualUrl || '', versi: D.versi || '',
    posisi: D.posisi || 'kiri-bawah',
    tampilkanTombol: true
  };
  var INTRO = D.intro || 'Urutan kerja dari awal sampai hasil.';
  var LANGKAH = D.langkah || [], PANDUAN = D.panduan || [], PINTASAN = D.pintasan || [];
  var JENIS = ['Ada yang rusak / error', 'Usulan fitur baru', 'Sulit dipakai / membingungkan', 'Lainnya'];
  var BAGIAN = D.bagian || ['Umum'];
  var TAB = [['mulai', 'Mulai cepat'], ['panduan', 'Panduan alat'], ['pintasan', 'Pintasan'], ['masukan', 'Masukan']];
  if (!PANDUAN.length) TAB = TAB.filter(function (t) { return t[0] !== 'panduan'; });
  if (!PINTASAN.length) TAB = TAB.filter(function (t) { return t[0] !== 'pintasan'; });

  /* ---------- Tampilan ---------- */

  var CSS = [
    ':host{all:initial}',
    '*{box-sizing:border-box}',
    '[hidden]{display:none!important}',
    '.r{--lb-bg:var(--card,#fff);--lb-fg:var(--fg,#1b1f24);--lb-mut:var(--mut,#5a646e);--lb-line:var(--line,#d8dde3);--lb-soft:var(--bg,#f2f4f7);--lb-acc:var(--ac,#0b63c5);--lb-accfg:var(--card,#fff);--lb-ok:var(--ac,#18794e);--lb-err:var(--sel,#b42318);font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--lb-fg)}',
    'button,input,select,textarea{font:inherit;color:inherit}',
    'button{cursor:pointer}',
    ':focus-visible{outline:2px solid var(--lb-acc);outline-offset:2px}',
    '.fab{position:fixed;z-index:2147483000;display:flex;gap:8px;padding:12px}',
    '.fab.kanan-bawah{right:0;bottom:env(safe-area-inset-bottom,0px)}.fab.kiri-bawah{left:0;bottom:env(safe-area-inset-bottom,0px)}.fab.kanan-atas{right:0;top:0}.fab.kiri-atas{left:0;top:0}',
    '.fab button{border:1px solid var(--lb-line);background:var(--lb-bg);border-radius:999px;padding:7px 14px;font-weight:600;',
    'box-shadow:0 2px 10px rgba(0,0,0,.18);display:flex;align-items:center;gap:6px}',
    '.fab button:hover{border-color:var(--lb-acc);color:var(--lb-acc)}',
    '.fab .q{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--lb-acc);color:var(--lb-accfg);font-size:12px;font-weight:700}',
    '.tirai{position:fixed;inset:0;z-index:2147483001;background:rgba(10,14,20,.45);display:grid;place-items:center;padding:16px}',
    '.panel{background:var(--lb-bg);border:1px solid var(--lb-line);border-radius:12px;width:min(660px,100%);max-height:min(720px,100%);',
    'display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,.35);outline:none;overflow:hidden}',
    '.kepala{flex:none;display:flex;align-items:center;justify-content:space-between;padding:14px 16px 8px}',
    '.kepala h2{margin:0;font-size:17px;font-weight:700}',
    '.x{border:0;background:none;font-size:22px;line-height:1;padding:2px 8px;border-radius:6px;color:var(--lb-mut)}',
    '.x:hover{background:var(--lb-soft);color:var(--lb-fg)}',
    '.tabs{flex:none;display:flex;gap:2px;padding:0 12px;border-bottom:1px solid var(--lb-line);overflow-x:auto}',
    '.tabs button{border:0;background:none;padding:9px 10px;white-space:nowrap;color:var(--lb-mut);border-bottom:2px solid transparent;margin-bottom:-1px}',
    '.tabs button[aria-selected=true]{color:var(--lb-acc);border-bottom-color:var(--lb-acc);font-weight:600}',
    '.tabs button:focus-visible{outline-offset:-2px}',
    '.isi{padding:16px;overflow-y:auto;flex:1 1 auto;min-height:0}',
    '.isi p{margin:0 0 12px}',
    '.mut{color:var(--lb-mut)}',
    'ol.langkah{list-style:none;margin:0;padding:0;counter-reset:n}',
    'ol.langkah li{counter-increment:n;position:relative;padding:0 0 14px 40px}',
    'ol.langkah li::before{content:counter(n);position:absolute;left:0;top:0;width:26px;height:26px;border-radius:50%;',
    'background:var(--lb-soft);border:1px solid var(--lb-line);display:grid;place-items:center;font-weight:700;font-size:13px}',
    'ol.langkah b{display:block}',
    '.tautan{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}',
    '.tautan a,.btn{display:inline-block;border:1px solid var(--lb-line);background:var(--lb-soft);border-radius:8px;padding:7px 12px;text-decoration:none;color:var(--lb-fg);font-weight:600}',
    '.tautan a:hover,.btn:hover{border-color:var(--lb-acc)}',
    '.btn.utama{background:var(--lb-acc);border-color:var(--lb-acc);color:var(--lb-accfg)}',
    '.btn[disabled]{opacity:.6;cursor:default}',
    'details{border:1px solid var(--lb-line);border-radius:8px;margin:0 0 8px}',
    'summary{padding:9px 12px;font-weight:600;cursor:pointer}',
    'details[open] summary{border-bottom:1px solid var(--lb-line)}',
    'dl{margin:0;padding:10px 12px}',
    'dt{font-weight:600}',
    'dd{margin:0 0 10px;color:var(--lb-mut)}',
    'dd:last-child{margin-bottom:0}',
    'table{width:100%;border-collapse:collapse}',
    'td{padding:8px 4px;border-bottom:1px solid var(--lb-line);vertical-align:top}',
    'td:first-child{width:52%;font-weight:600}',
    '.isi a{color:var(--lb-acc)}',
    '.gform{display:block;width:100%;height:min(600px,62vh);min-height:360px;border:1px solid var(--lb-line);border-radius:8px;background:#fff}',
    'form{display:grid;gap:12px}',
    '.dua{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    'label{display:grid;gap:4px;font-weight:600}',
    'label span{font-weight:400;color:var(--lb-mut)}',
    'select,textarea,input[type=text]{width:100%;border:1px solid var(--lb-line);border-radius:8px;background:var(--lb-bg);padding:8px 10px;font-weight:400}',
    'textarea{min-height:120px;resize:vertical}',
    '.jebak{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}',
    '.bawah{display:flex;align-items:center;gap:12px;flex-wrap:wrap}',
    '.status{flex:1;min-width:160px}',
    '.status.err{color:var(--lb-err)}.status.ok{color:var(--lb-ok)}',
    '.kecil{font-size:12px}',
    '.terima{text-align:center;padding:24px 8px}',
    '.terima h3{margin:0 0 6px;font-size:16px}',
    '@media (max-width:560px){.tirai{padding:0}.panel{width:100%;max-height:100%;height:100%;border-radius:0;border:0}.dua{grid-template-columns:1fr}',
    '.fab{padding:8px;gap:6px}.fab button{padding:5px 10px;font-size:13px}}'
  ].join('');

  function h(tag, props, kids) {
    var n = document.createElement(tag), k;
    for (k in (props || {})) {
      if (k === 'class') n.className = props[k];
      else if (k === 'text') n.textContent = props[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), props[k]);
      else if (props[k] !== false) n.setAttribute(k, props[k] === true ? '' : props[k]);
    }
    (kids || []).forEach(function (c) {
      if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }

  var host = h('div', { id: 'octo-bantuan' });
  var sr = host.attachShadow({ mode: 'open' });
  var akar = h('div', { class: 'r' });
  var pemicu = null, tabAktif = 'mulai', tombolTab = {}, panelTab = {};

  /* Tombol melayang */
  var fab = h('div', { class: 'fab ' + CONFIG.posisi, hidden: !CONFIG.tampilkanTombol }, [
    h('button', { type: 'button', 'aria-haspopup': 'dialog', onclick: function () { buka('mulai'); } },
      [h('span', { class: 'q', 'aria-hidden': 'true', text: '?' }), 'Bantuan']),
    h('button', { type: 'button', 'aria-haspopup': 'dialog', onclick: function () { buka('masukan'); } }, ['Masukan'])
  ]);

  /* Tab: Mulai cepat */
  var tautan = h('div', { class: 'tautan', hidden: !(CONFIG.tutorialUrl || CONFIG.manualUrl) }, [
    CONFIG.tutorialUrl && h('a', { href: CONFIG.tutorialUrl, target: '_blank', rel: 'noopener', text: 'Tonton tutorial' }),
    CONFIG.manualUrl && h('a', { href: CONFIG.manualUrl, target: '_blank', rel: 'noopener', text: 'Buka manual lengkap' })
  ]);
  panelTab.mulai = h('div', null, [
    h('p', { class: 'mut', text: INTRO }),
    tautan,
    h('ol', { class: 'langkah' }, LANGKAH.map(function (l) {
      return h('li', null, [h('b', { text: l[0] }), l[1]]);
    }))
  ]);

  /* Tab: Panduan alat */
  panelTab.panduan = h('div', null, PANDUAN.map(function (g, i) {
    var dl = h('dl');
    g[1].forEach(function (it) {
      dl.appendChild(h('dt', { text: it[0] }));
      dl.appendChild(h('dd', { text: it[1] }));
    });
    return h('details', { open: i === 0 }, [h('summary', { text: g[0] }), dl]);
  }));

  /* Tab: Pintasan */
  panelTab.pintasan = h('div', null, [
    h('table', null, [h('tbody', null, PINTASAN.map(function (p) {
      return h('tr', null, [h('td', { text: p[0] }), h('td', { text: p[1] })]);
    }))])
  ]);

  /* Tab: Kirim masukan */
  function pilihan(nama, daftar) {
    return h('select', { name: nama }, daftar.map(function (t) { return h('option', { text: t }); }));
  }
  var statusEl = h('div', { class: 'status', role: 'status', 'aria-live': 'polite' });
  var tombolKirim = h('button', { type: 'submit', class: 'btn utama', text: 'Kirim masukan' });
  var form = h('form', { novalidate: true, onsubmit: kirim }, [
    h('p', { class: 'mut', text: 'Apa yang perlu diperbaiki atau ditambahkan di ' + APP + '? Masukan singkat pun membantu.' }),
    h('div', { class: 'dua' }, [
      h('label', null, ['Jenis masukan', pilihan('jenis', JENIS)]),
      h('label', null, ['Bagian aplikasi', pilihan('bagian', BAGIAN)])
    ]),
    h('label', null, ['Masukan Anda',
      h('textarea', { name: 'pesan', maxlength: '2000', required: true,
        placeholder: 'Ceritakan apa yang Anda lakukan, apa yang terjadi, dan apa yang Anda harapkan.' })]),
    h('label', null, [
      h('div', null, ['Kontak ', h('span', { text: '(opsional, bila ingin dibalas)' })]),
      h('input', { type: 'text', name: 'kontak', maxlength: '120', autocomplete: 'email', placeholder: 'Email atau nomor WhatsApp' })]),
    h('input', { class: 'jebak', type: 'text', name: 'situs', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' }),
    h('div', { class: 'bawah' }, [tombolKirim, statusEl]),
    h('div', { class: 'mut kecil', text: 'Jenis browser dan ukuran layar ikut dikirim untuk membantu melacak masalah. Isi pekerjaan Anda tidak dikirim.' })
  ]);
  var terima = h('div', { class: 'terima', hidden: true }, [
    h('h3', { text: 'Terima kasih, masukan Anda sudah diterima.' }),
    h('p', { class: 'mut' }),
    h('button', { type: 'button', class: 'btn', text: 'Kirim masukan lain', onclick: function () {
      terima.hidden = true; form.hidden = false; form.elements.pesan.focus();
    } })
  ]);
  var bingkai = null;
  function urlForm(tanam) {
    var u = String(CONFIG.formUrl).split('?')[0], q = [];
    if (tanam) q.push('embedded=true');
    if (CONFIG.formEntry) q.push(encodeURIComponent(CONFIG.formEntry) + '=' + encodeURIComponent(APP));
    return q.length ? u + '?' + q.join('&') : u;
  }
  if (CONFIG.formUrl) {
    bingkai = h('iframe', { class: 'gform', title: 'Formulir masukan ' + APP });
    panelTab.masukan = h('div', null, [
      h('p', { class: 'mut' }, ['Apa yang perlu diperbaiki atau ditambahkan di ' + APP + '? Bila formulir tidak muncul, ',
        h('a', { href: urlForm(false), target: '_blank', rel: 'noopener', text: 'buka di tab baru' }), '.']),
      bingkai
    ]);
  } else {
    panelTab.masukan = h('div', null, [form, terima]);
  }

  /* Kerangka dialog */
  var tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Bagian bantuan', onkeydown: panahTab },
    TAB.map(function (t) {
      var b = h('button', { type: 'button', role: 'tab', id: 'lb-tab-' + t[0], 'aria-controls': 'lb-isi-' + t[0],
        text: t[1], onclick: function () { pilihTab(t[0]); } });
      tombolTab[t[0]] = b;
      return b;
    }));
  var isi = h('div', { class: 'isi' }, TAB.map(function (t) {
    var p = panelTab[t[0]];
    p.id = 'lb-isi-' + t[0];
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', 'lb-tab-' + t[0]);
    return p;
  }));
  var panel = h('div', { class: 'panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'lb-judul', tabindex: '-1',
    onkeydown: tombolDialog }, [
    h('div', { class: 'kepala' }, [
      h('h2', { id: 'lb-judul', text: 'Bantuan ' + APP }),
      h('button', { type: 'button', class: 'x', 'aria-label': 'Tutup', text: '×', onclick: tutup })
    ]),
    tabs, isi
  ]);
  var tirai = h('div', { class: 'tirai', hidden: true,
    onmousedown: function (e) { if (e.target === tirai) tutup(); } }, [panel]);

  akar.appendChild(fab);
  akar.appendChild(tirai);
  sr.appendChild(h('style', { text: CSS }));
  sr.appendChild(akar);

  /* Agar ketikan dan klik di sini tidak terbaca sebagai perintah gambar oleh LiteBIM.
     Tombol keyboard hanya ditahan selama jendela bantuan terbuka, supaya pintasan aplikasi tetap jalan setelah ditutup. */
  ['mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'wheel']
    .forEach(function (ev) {
      host.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
    });
  ['keydown', 'keyup', 'keypress', 'copy', 'cut', 'paste'].forEach(function (ev) {
    host.addEventListener(ev, function (e) { if (!tirai.hidden) e.stopPropagation(); });
  });

  /* ---------- Perilaku ---------- */

  function pilihTab(id) {
    if (!panelTab[id]) id = 'mulai';
    tabAktif = id;
    TAB.forEach(function (t) {
      var on = t[0] === id;
      tombolTab[t[0]].setAttribute('aria-selected', on ? 'true' : 'false');
      tombolTab[t[0]].tabIndex = on ? 0 : -1;
      panelTab[t[0]].hidden = !on;
    });
    isi.scrollTop = 0;
    if (id === 'masukan' && bingkai && !bingkai.getAttribute('src')) bingkai.src = urlForm(true);
  }

  function panahTab(e) {
    var arah = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!arah) return;
    var i = TAB.map(function (t) { return t[0]; }).indexOf(tabAktif);
    var id = TAB[(i + arah + TAB.length) % TAB.length][0];
    pilihTab(id);
    tombolTab[id].focus();
    e.preventDefault();
  }

  function fokusable() {
    return Array.prototype.filter.call(
      panel.querySelectorAll('button,a[href],input,select,textarea,summary,iframe'),
      function (n) { return !n.disabled && n.tabIndex !== -1 && n.getClientRects().length; });
  }

  function tombolDialog(e) {
    if (e.key === 'Escape') { e.preventDefault(); tutup(); return; }
    if (e.key !== 'Tab') return;
    var f = fokusable();
    if (!f.length) return;
    var kini = sr.activeElement, awal = f[0], akhir = f[f.length - 1];
    if (e.shiftKey && (kini === awal || kini === panel)) { akhir.focus(); e.preventDefault(); }
    else if (!e.shiftKey && kini === akhir) { awal.focus(); e.preventDefault(); }
  }

  function buka(id) {
    if (tirai.hidden) pemicu = sr.activeElement || document.activeElement;
    pilihTab(id || 'mulai');
    tirai.hidden = false;
    if (tabAktif === 'masukan' && !bingkai && !form.hidden) form.elements.pesan.focus();
    else tombolTab[tabAktif].focus();
  }

  function tutup() {
    if (tirai.hidden) return;
    tirai.hidden = true;
    var aktif = sr.activeElement;
    if (aktif && aktif.blur) aktif.blur();
    if (pemicu && pemicu.focus && !sr.contains(pemicu)) { try { pemicu.focus(); } catch (_) {} }
    pemicu = null;
  }

  function status(teks, jenis) {
    statusEl.textContent = teks || '';
    statusEl.className = 'status' + (jenis ? ' ' + jenis : '');
  }

  function sebagaiTeks(d) {
    return ['Masukan ' + APP, 'Jenis: ' + d.jenis, 'Bagian: ' + d.bagian, '', d.pesan, '',
      d.kontak ? 'Kontak: ' + d.kontak : '', d.versi ? 'Versi: ' + d.versi : '',
      'Layar: ' + d.layar, 'Browser: ' + d.browser].filter(function (b, i) { return b !== '' || i === 3 || i === 5; }).join('\n');
  }

  function selesai(catatan) {
    tombolKirim.disabled = false;
    status('');
    form.elements.pesan.value = '';
    form.hidden = true;
    terima.querySelector('p').textContent = catatan || 'Masukan dibaca untuk menentukan perbaikan berikutnya.';
    terima.hidden = false;
    terima.querySelector('button').focus();
  }

  function kirim(e) {
    e.preventDefault();
    var el = form.elements, pesan = el.pesan.value.trim();
    if (pesan.length < 5) {
      status('Tulis dulu masukan Anda, minimal beberapa kata.', 'err');
      el.pesan.focus();
      return;
    }
    if (el.situs.value) { selesai(); return; }
    var d = {
      waktu: new Date().toISOString(),
      jenis: el.jenis.value,
      bagian: el.bagian.value,
      pesan: pesan,
      kontak: el.kontak.value.trim(),
      versi: CONFIG.versi,
      halaman: location.origin + location.pathname,
      layar: window.innerWidth + 'x' + window.innerHeight,
      browser: navigator.userAgent
    };

    if (CONFIG.endpoint) {
      tombolKirim.disabled = true;
      status('Mengirim…');
      fetch(CONFIG.endpoint, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(d)
      }).then(function () { selesai(); }, function () {
        tombolKirim.disabled = false;
        status('Gagal mengirim. Periksa koneksi internet, lalu coba lagi.', 'err');
      });
      return;
    }
    var teks = sebagaiTeks(d), nomor = String(CONFIG.whatsapp).replace(/\D/g, '');
    if (nomor) {
      window.open('https://wa.me/' + nomor + '?text=' + encodeURIComponent(teks), '_blank', 'noopener');
      selesai('WhatsApp terbuka di tab baru. Tekan kirim di sana agar masukan sampai.');
      return;
    }
    if (CONFIG.email) {
      window.open('mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Masukan ' + APP + ': ' + d.jenis) +
        '&body=' + encodeURIComponent(teks), '_self');
      selesai('Aplikasi email Anda terbuka. Tekan kirim di sana agar masukan sampai.');
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teks).catch(function () {});
    status('Tujuan masukan belum diatur (isi CONFIG di kode). Teks masukan disalin ke clipboard.', 'err');
  }

  function pasang() { document.body.appendChild(host); pilihTab('mulai'); }
  if (document.body) pasang(); else document.addEventListener('DOMContentLoaded', pasang);

  window.OctoBantuan = { buka: buka, tutup: tutup };
  if (!window.LiteBIMBantuan) window.LiteBIMBantuan = window.OctoBantuan;
})();