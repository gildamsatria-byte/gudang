/*!
 * Octopus login gate – wajib masuk dengan akun Google sebelum aplikasi dipakai.
 * Data login dicatat ke file "Data Visitor" di Google Drive.
 *
 * Pasang: taruh file ini di folder yang sama dengan index.html, lalu tambahkan
 * SATU baris tepat setelah <head> di index.html:
 *
 *   <script src="login-gate.js" data-app="LiteBIM"></script>
 *
 * (untuk aplikasi lain ganti data-app, mis. "Octopus Studio", "Kolab", "GIM")
 */
(function () {
  "use strict";
  var me = document.currentScript;
  var cfg = {
    clientId: "440057667141-v9fa7kjfq3mpig3klge7n3alfocnfahm.apps.googleusercontent.com",
    endpoint: "https://script.google.com/macros/s/AKfycbyL2XdFI2n0DGYWjF5h5wM2t-OiPKqnIg6pzfW4eg4S3oFUarSuhFxQdYftr2kDbxhF/exec",
    app: (me && me.getAttribute("data-app")) || document.title || "Octopus",
    privacyUrl: (me && me.getAttribute("data-privacy")) || "https://gildamsatria-byte.github.io/GilBIM/privacy.html"
  };
  var extra = window.OCTO_LOGIN || {};
  for (var k in extra) if (extra[k]) cfg[k] = extra[k];
  var KEY = "octo_login_" + String(cfg.app || "app").toLowerCase().replace(/\W+/g, "_");
  var DAYS = 7; // lama sesi sebelum diminta login lagi

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && s.until > Date.now()) return s;
    } catch (e) {}
    return null;
  }
  function setSession(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function clearSession() { try { localStorage.removeItem(KEY); } catch (e) {} }

  var css =
    "html.octo-locked body>*:not(#octo-gate){visibility:hidden!important}" +
    "#octo-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:#0F141C;font-family:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif;color:#E6EAF0}" +
    "#octo-gate .box{width:100%;max-width:420px;background:#FBFBFA;color:#141922;border:1.5px solid #141922;padding:36px 32px;display:flex;flex-direction:column;gap:18px;text-align:left}" +
    "#octo-gate h1{margin:0;font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:700;font-size:40px;line-height:1}" +
    "#octo-gate .brand{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:700;letter-spacing:.06em;font-size:15px;color:#1F5FD1}" +
    "#octo-gate p{margin:0;font-size:15px;line-height:1.55;color:#4A5261}" +
    "#octo-gate small{font-size:12.5px;line-height:1.5;color:#4A5261}" +
    "#octo-gate a{color:#1F5FD1}" +
    "#octo-gate .err{color:#A8352A;font-size:14px;min-height:1em}" +
    "#octo-chip{position:fixed;right:12px;bottom:12px;z-index:2147483000;display:flex;align-items:center;gap:8px;padding:6px 8px 6px 12px;background:#0F141C;color:#E6EAF0;border-radius:999px;font:13px system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25)}" +
    "#octo-chip button{all:unset;cursor:pointer;padding:6px 10px;border-radius:999px;background:#27303D}" +
    "#octo-chip button:focus-visible{outline:2px solid #8AB8FF}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  if (!cfg.clientId || /ISI_CLIENT_ID/.test(cfg.clientId)) {
    console.warn("[Octopus login] clientId belum diisi; gerbang login dinonaktifkan.");
    return;
  }

  var session = getSession();
  if (session) { onReady(function () { showChip(session); }); return; }

  document.documentElement.classList.add("octo-locked");
  onReady(buildGate);

  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function buildGate() {
    var gate = document.createElement("div");
    gate.id = "octo-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "octo-gate-title");
    gate.innerHTML =
      '<div class="box">' +
      '<span class="brand">OCTOPUS</span>' +
      '<h1 id="octo-gate-title"></h1>' +
      "<p>Masuk dengan akun Gmail Anda untuk memakai aplikasi ini.</p>" +
      '<div id="octo-btn"></div>' +
      '<div class="err" id="octo-err" role="alert"></div>' +
      "<small>Dengan masuk, nama, alamat email, dan foto profil Google Anda dicatat oleh pengelola Octopus untuk data pengguna." +
      (cfg.privacyUrl ? ' <a href="' + encodeURI(cfg.privacyUrl) + '" target="_blank" rel="noopener">Kebijakan privasi</a>' : "") +
      "</small></div>";
    gate.querySelector("#octo-gate-title").textContent = cfg.app || "Octopus";
    document.body.appendChild(gate);

    var s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = function () {
      google.accounts.id.initialize({ client_id: cfg.clientId, callback: onCredential, auto_select: false });
      google.accounts.id.renderButton(document.getElementById("octo-btn"), {
        theme: "outline", size: "large", text: "signin_with", shape: "rectangular", width: 300, locale: "id"
      });
    };
    s.onerror = function () { setErr("Tidak bisa memuat layanan login Google. Periksa koneksi internet lalu muat ulang halaman."); };
    document.head.appendChild(s);
  }

  function setErr(t) { var e = document.getElementById("octo-err"); if (e) e.textContent = t; }

  function decode(jwt) {
    try {
      var p = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(p))));
    } catch (e) { return {}; }
  }

  function onCredential(resp) {
    var info = decode(resp.credential);
    setErr("");
    var done = function () {
      var s = { email: info.email || "", name: info.name || "", until: Date.now() + DAYS * 864e5 };
      setSession(s);
      var gate = document.getElementById("octo-gate");
      if (gate) gate.remove();
      document.documentElement.classList.remove("octo-locked");
      showChip(s);
    };
    if (!cfg.endpoint) return done();
    fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ credential: resp.credential, app: cfg.app || "" })
    }).then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.ok) done();
        else setErr("Login ditolak (" + ((j && j.error) || "tidak diketahui") + "). Coba lagi atau hubungi pengelola.");
      })
      .catch(function () { done(); }); // pencatatan gagal karena jaringan: tetap izinkan masuk
  }

  function showChip(s) {
    var c = document.createElement("div");
    c.id = "octo-chip";
    var t = document.createElement("span");
    t.textContent = s.email || s.name || "Masuk";
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = "Keluar";
    b.onclick = function () {
      clearSession();
      try { google.accounts.id.disableAutoSelect(); } catch (e) {}
      location.reload();
    };
    c.appendChild(t);
    c.appendChild(b);
    document.body.appendChild(c);
  }
})();
