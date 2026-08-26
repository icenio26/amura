/* =============================================================
   AMURA · Marine Travel & Events
   1. Idioma ES/EN   2. Consola de escala   3. Revelado
   4. Formulario     5. Año del footer
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Idioma ---------- */
  var STORAGE_KEY = 'amura:lang';

  function storedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* modo privado */ }
  }

  function applyLang(lang) {
    var root = document.documentElement;
    root.lang = lang;
    root.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-es]').forEach(function (el) {
      var value = el.dataset[lang];
      if (value != null) { el.innerHTML = value; }
    });
    document.querySelectorAll('[data-es-ph]').forEach(function (el) {
      var value = lang === 'en' ? el.dataset.enPh : el.dataset.esPh;
      if (value != null) { el.placeholder = value; }
    });
    document.querySelectorAll('[data-es-al]').forEach(function (el) {
      var value = lang === 'en' ? el.dataset.enAl : el.dataset.esAl;
      if (value != null) { el.setAttribute('aria-label', value); }
    });

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
  }

  function currentLang() {
    return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'es';
  }

  var initial = storedLang();
  if (initial !== 'es' && initial !== 'en') {
    initial = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }
  applyLang(initial);

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.dataset.setLang;
      applyLang(lang);
      storeLang(lang);
    });
  });

  /* ---------- 2. Consola de escala ----------
     Cuenta la historia entera del negocio: un ETA que se mueve
     catorce horas y un plan que se rehace solo.                */
  var console_ = document.getElementById('console');

  function setCell(id, es, en, changed) {
    var cell = document.getElementById(id);
    if (!cell) { return; }
    cell.dataset.es = es;
    cell.dataset.en = en;
    cell.innerHTML = currentLang() === 'en' ? en : es;
    var row = cell.closest('.console__row');
    if (row) { row.setAttribute('data-changed', changed ? 'true' : 'false'); }
  }

  function setStatus(state, es, en) {
    var box = document.getElementById('consoleStatus');
    var text = document.getElementById('consoleStatusText');
    var dot = document.getElementById('consoleDot');
    if (!box || !text || !dot) { return; }
    box.setAttribute('data-state', state);
    dot.className = state === 'warn' ? 'dot dot--amber' : 'dot';
    text.dataset.es = es;
    text.dataset.en = en;
    text.innerHTML = currentLang() === 'en' ? en : es;
  }

  function setLog(es, en) {
    var log = document.getElementById('consoleLog');
    if (!log) { return; }
    log.dataset.es = es;
    log.dataset.en = en;
    log.innerHTML = currentLang() === 'en' ? en : es;
  }

  var timers = [];

  function frameStart() {
    setStatus('ok', 'Viaje confirmado', 'Trip confirmed');
    setCell('cellEta', '04:20 UTC', '04:20 UTC', false);
    setCell('cellFlight', 'HAM → AGP · 21:55', 'HAM → AGP · 21:55', false);
    setCell('cellHotel', 'Palmones · 1 noche', 'Palmones · 1 night', false);
    setCell('cellTransfer', 'AGP → Algeciras · 02:00', 'AGP → Algeciras · 02:00', false);
    setLog('Técnico de electrónica · 1 persona', 'Electronics engineer · 1 person');
  }

  function frameEnd() {
    setStatus('ok', 'Viaje rehecho · 00:12', 'Trip rebuilt · 00:12');
    setCell('cellEta', '<s>04:20</s> 18:40 UTC', '<s>04:20</s> 18:40 UTC', false);
    setCell('cellFlight', 'HAM → AGP · 11:20', 'HAM → AGP · 11:20', false);
    setCell('cellHotel', 'Palmones · 2 noches', 'Palmones · 2 nights', false);
    setCell('cellTransfer', 'AGP → Algeciras · 15:40', 'AGP → Algeciras · 15:40', false);
    setLog('Rehecho sin coste de gestión', 'Rebuilt at no handling cost');
  }

  function play() {
    timers.forEach(clearTimeout);
    timers = [];

    if (reduceMotion) { frameEnd(); return; }

    frameStart();

    timers.push(setTimeout(function () {
      setStatus('warn', 'El buque retrasa · +14 h', 'Vessel delayed · +14 h');
      setCell('cellEta', '<s>04:20</s> 18:40 UTC', '<s>04:20</s> 18:40 UTC', true);
      setLog('Nuevo ETA recibido', 'New ETA received');
    }, 2600));

    timers.push(setTimeout(function () {
      setCell('cellFlight', 'HAM → AGP · 11:20', 'HAM → AGP · 11:20', true);
      setLog('Vuelo reprogramado', 'Flight rebooked');
    }, 4200));

    timers.push(setTimeout(function () {
      setCell('cellHotel', 'Palmones · 2 noches', 'Palmones · 2 nights', true);
      setLog('Noche adicional confirmada', 'Extra night confirmed');
    }, 5300));

    timers.push(setTimeout(function () {
      setCell('cellTransfer', 'AGP → Algeciras · 15:40', 'AGP → Algeciras · 15:40', true);
      setLog('Traslado reasignado', 'Transfer reassigned');
    }, 6300));

    timers.push(setTimeout(frameEnd, 7500));
  }

  if (console_) {
    var replay = document.getElementById('consoleReplay');
    if (replay) { replay.addEventListener('click', play); }

    if ('IntersectionObserver' in window) {
      var played = false;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !played) { played = true; play(); }
        });
      }, { threshold: 0.4 });
      obs.observe(console_);
    } else {
      play();
    }
  }

  /* ---------- 3. Revelado al entrar en viewport ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revObs.observe(el); });
  }

  /* ---------- 4. Formulario ----------
     Sin backend todavía. Valida, no borra lo escrito y repite
     el teléfono de guardia, que es lo que de verdad convierte. */
  var form = document.getElementById('briefForm');
  if (form) {
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var lang = currentLang();
      var missing = null;

      Array.prototype.some.call(form.querySelectorAll('[required]'), function (field) {
        var empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        var badMail = field.type === 'email' && field.value.trim() && field.value.indexOf('@') < 0;
        if (empty || badMail) { missing = field; return true; }
        return false;
      });

      if (missing) {
        status.style.color = 'var(--red)';
        status.textContent = lang === 'en'
          ? 'One field is still missing — nothing you typed has been lost.'
          : 'Falta un campo por rellenar. No se ha borrado nada de lo que has escrito.';
        missing.focus();
        return;
      }

      var kind = form.querySelector('input[name="tipo"]:checked');
      var toShip = kind && kind.value === 'viaje-a-buque';

      status.style.color = 'var(--green)';
      if (lang === 'en') {
        status.textContent = toShip
          ? 'Received. We call you back in under 30 minutes. If it cannot wait, ring the duty phone: +34 6XX XXX XXX. (Demo: the form endpoint is not connected yet.)'
          : 'Received. We reply today with a proposal or with specific questions. (Demo: the form endpoint is not connected yet.)';
      } else {
        status.textContent = toShip
          ? 'Recibido. Te llamamos en menos de 30 minutos. Si no puede esperar, marca el teléfono de guardia: +34 6XX XXX XXX. (Demo: el endpoint del formulario aún no está conectado.)'
          : 'Recibido. Te contestamos hoy con una propuesta o con preguntas concretas. (Demo: el endpoint del formulario aún no está conectado.)';
      }
    });
  }

  /* ---------- 5. Año ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
