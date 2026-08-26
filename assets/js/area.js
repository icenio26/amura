/* =============================================================
   AMURA · Área de cliente (demostración)

   No hay servidor. Todo lo que se ve aquí son datos ficticios y
   las preferencias se guardan en el navegador de quien mira. Un
   acceso real necesita backend con autenticación, cifrado en
   tránsito y en reposo, y control de acceso por rol: ver
   docs/area-cliente.md antes de implementarlo.
   ============================================================= */
(function () {
  'use strict';

  var i18n = window.Amura || { applyLang: function () {}, currentLang: function () { return 'es'; } };

  /* ---------- Datos de ejemplo ---------- */

  var USERS = {
    viajero: {
      id: 'viajero', nombre: 'Marta Gil', iniciales: 'MG',
      puesto: { es: 'Técnica de electrónica naval', en: 'Marine electronics engineer' },
      empresa: 'Empresa Ejemplo, S.L.', email: 'marta.gil@ejemplo.com', movil: '+34 6XX XXX XXX',
      rol: 'viajero'
    },
    admin: {
      id: 'admin', nombre: 'Javier León', iniciales: 'JL',
      puesto: { es: 'Dirección de operaciones', en: 'Head of operations' },
      empresa: 'Empresa Ejemplo, S.L.', email: 'javier.leon@ejemplo.com', movil: '+34 6XX XXX XXX',
      rol: 'admin'
    }
  };

  var TRIPS = [
    {
      viajero: 'Marta Gil', propio: true,
      motivo: { es: 'Embarque en buque · Algeciras', en: 'Vessel boarding · Algeciras' },
      ruta: { es: 'Hamburgo → Algeciras', en: 'Hamburg → Algeciras' },
      fechas: { es: '12 – 14 mar 2026', en: '12 – 14 Mar 2026' },
      salida: '12/03/2026', regreso: '14/03/2026',
      estado: { key: 'warn', es: 'ETA revisado · viaje rehecho', en: 'ETA revised · trip rebuilt' },
      docs: ['boarding', 'hotel', 'transfer']
    },
    {
      viajero: 'Marta Gil', propio: true,
      motivo: { es: 'Feria SMM · Hamburgo', en: 'SMM trade fair · Hamburg' },
      ruta: { es: 'Málaga → Hamburgo', en: 'Málaga → Hamburg' },
      fechas: { es: '8 – 11 sep 2025', en: '8 – 11 Sep 2025' },
      salida: '08/09/2025', regreso: '11/09/2025',
      estado: { key: 'ok', es: 'Completado', en: 'Completed' },
      docs: ['boarding', 'hotel']
    },
    {
      viajero: 'Carlos Ndiaye', propio: false,
      motivo: { es: 'Inspección de carga · Rotterdam', en: 'Cargo inspection · Rotterdam' },
      ruta: { es: 'Sevilla → Rotterdam', en: 'Seville → Rotterdam' },
      fechas: { es: '3 – 5 mar 2026', en: '3 – 5 Mar 2026' },
      salida: '03/03/2026', regreso: '05/03/2026',
      estado: { key: 'ok', es: 'Completado', en: 'Completed' },
      docs: ['boarding', 'hotel']
    },
    {
      viajero: 'Elena Prats', propio: false,
      motivo: { es: 'Misión comercial · Atenas y Pireo', en: 'Trade mission · Athens and Piraeus' },
      ruta: { es: 'Madrid → Atenas', en: 'Madrid → Athens' },
      fechas: { es: '21 – 24 abr 2026', en: '21 – 24 Apr 2026' },
      salida: '21/04/2026', regreso: '24/04/2026',
      estado: { key: 'ok', es: 'Confirmado', en: 'Confirmed' },
      docs: ['boarding', 'hotel', 'transfer']
    }
  ];

  var DOC_META = {
    boarding: {
      abbr: 'BP',
      titulo: { es: 'Tarjeta de embarque', en: 'Boarding pass' },
      ref: 'XZ8K2P',
      emitido: { es: 'Emitida · PDF · 214 KB', en: 'Issued · PDF · 214 KB' }
    },
    hotel: {
      abbr: 'HTL',
      titulo: { es: 'Bono de hotel', en: 'Hotel voucher' },
      ref: 'HB-449120',
      emitido: { es: 'Emitido · PDF · 96 KB', en: 'Issued · PDF · 96 KB' }
    },
    transfer: {
      abbr: 'TRF',
      titulo: { es: 'Voucher de traslado', en: 'Transfer voucher' },
      ref: 'TR-20260312',
      emitido: { es: 'Emitido · PDF · 74 KB', en: 'Issued · PDF · 74 KB' }
    }
  };

  /* Una línea por epígrafe, a su PVP. No hay partida de gestión: el margen
     va dentro de cada concepto. */
  var INVOICES = [
    {
      ref: 'F-2026-0184', fecha: '12/03/2026',
      concepto: { es: 'Escala Algeciras · 1 viajero', en: 'Algeciras call · 1 traveller' },
      estado: { key: 'warn', es: 'Pendiente', en: 'Outstanding' },
      lineas: [
        { k: { es: 'Vuelo', en: 'Flight' }, d: { es: 'HAM → AGP · ida y vuelta', en: 'HAM → AGP · return' }, v: '412,00' },
        { k: { es: 'Hotel', en: 'Hotel' }, d: { es: 'Palmones · 2 noches', en: 'Palmones · 2 nights' }, v: '186,00' },
        { k: { es: 'Traslado', en: 'Transfer' }, d: { es: 'AGP → Algeciras · ida y vuelta', en: 'AGP → Algeciras · return' }, v: '145,00' }
      ],
      total: '743,00'
    },
    {
      ref: 'F-2026-0151', fecha: '28/02/2026',
      concepto: { es: 'Feria SMM · equipo de 4', en: 'SMM fair · team of 4' },
      estado: { key: 'ok', es: 'Pagada', en: 'Paid' },
      lineas: [
        { k: { es: 'Vuelos', en: 'Flights' }, d: { es: 'AGP → HAM · 4 pasajeros', en: 'AGP → HAM · 4 passengers' }, v: '2.480,00' },
        { k: { es: 'Hotel', en: 'Hotel' }, d: { es: 'Hamburgo · 4 habitaciones × 3 noches', en: 'Hamburg · 4 rooms × 3 nights' }, v: '3.960,00' },
        { k: { es: 'Traslados', en: 'Transfers' }, d: { es: 'Aeropuerto y recinto ferial', en: 'Airport and fairground' }, v: '520,00' },
        { k: { es: 'Tren', en: 'Rail' }, d: { es: 'Desplazamientos en Hamburgo', en: 'Journeys within Hamburg' }, v: '240,00' }
      ],
      total: '7.200,00'
    },
    {
      ref: 'F-2026-0122', fecha: '09/02/2026',
      concepto: { es: 'Relevo de tripulación · Algeciras', en: 'Crew change · Algeciras' },
      estado: { key: 'ok', es: 'Pagada', en: 'Paid' },
      lineas: [
        { k: { es: 'Vuelos', en: 'Flights' }, d: { es: '2 tripulantes · ida y vuelta', en: '2 crew · return' }, v: '690,00' },
        { k: { es: 'Hotel', en: 'Hotel' }, d: { es: 'Algeciras · 2 habitaciones × 1 noche', en: 'Algeciras · 2 rooms × 1 night' }, v: '165,00' },
        { k: { es: 'Traslados', en: 'Transfers' }, d: { es: 'Aeropuerto y puerto', en: 'Airport and port' }, v: '200,00' }
      ],
      total: '1.055,00'
    }
  ];

  var SEATS = { ventana: '14A', pasillo: '14C', indiferente: '14B' };

  /* ---------- Utilidades ---------- */

  var $ = function (id) { return document.getElementById(id); };

  function esc(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Un par es/en se convierte en atributos que applyLang sabe traducir. */
  function pair(obj) {
    return 'data-es="' + esc(obj.es) + '" data-en="' + esc(obj.en) + '"';
  }
  function say(obj) {
    return i18n.currentLang() === 'en' ? obj.en : obj.es;
  }
  function refresh() {
    i18n.applyLang(i18n.currentLang());
  }

  /* ---------- Sesión (solo demostración) ---------- */

  var SESSION_KEY = 'amura:demo-user';
  var current = null;

  function readSession() {
    try { return sessionStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }
  function writeSession(id) {
    try {
      if (id) { sessionStorage.setItem(SESSION_KEY, id); } else { sessionStorage.removeItem(SESSION_KEY); }
    } catch (e) { /* modo privado */ }
  }

  /* ---------- Preferencias ---------- */

  var FIELDS = ['pfRole', 'pfPhone', 'pfSeat', 'pfMeal', 'pfBag', 'pfLoyalty',
                'pfBed', 'pfFloor', 'pfNotes', 'pfDoc', 'pfDocExp'];

  function prefsKey() { return 'amura:prefs:' + (current ? current.id : 'anon'); }

  function loadPrefs() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(prefsKey()) || '{}'); } catch (e) { saved = {}; }

    FIELDS.forEach(function (id) {
      var el = $(id);
      if (!el) { return; }
      if (Object.prototype.hasOwnProperty.call(saved, id)) { el.value = saved[id]; }
    });

    if (!saved.pfRole && $('pfRole')) { $('pfRole').value = say(current.puesto); }
    if (!saved.pfPhone && $('pfPhone')) { $('pfPhone').value = current.movil; }
  }

  function savePrefs() {
    var data = {};
    FIELDS.forEach(function (id) {
      var el = $(id);
      if (el) { data[id] = el.value; }
    });
    try {
      localStorage.setItem(prefsKey(), JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function seatPreference() {
    var el = $('pfSeat');
    return SEATS[el && el.value ? el.value : 'ventana'] || SEATS.ventana;
  }

  /* ---------- Pintado ---------- */

  function renderUser() {
    $('userInitials').textContent = current.iniciales;
    $('userName').textContent = current.nombre;

    var line = $('userRoleLine');
    line.dataset.es = current.puesto.es + ' · ' + current.empresa;
    line.dataset.en = current.puesto.en + ' · ' + current.empresa;

    var chip = $('userChip');
    var admin = current.rol === 'admin';
    chip.className = 'chip' + (admin ? ' chip--admin' : '');
    chip.dataset.es = admin ? 'Administración de la cuenta' : 'Viajero';
    chip.dataset.en = admin ? 'Account admin' : 'Traveller';

    $('tabBills').hidden = !admin;

    var intro = $('tripsIntro');
    if (admin) {
      intro.dataset.es = 'Todos los viajes de la cuenta. Cada viajero ve solo los suyos, y siempre sin importes.';
      intro.dataset.en = 'Every trip on the account. Each traveller sees only their own, and always without amounts.';
    } else {
      intro.dataset.es = 'Toda la documentación de tus viajes, sin importes. Los precios y las facturas los ve quien lleva la administración de la cuenta.';
      intro.dataset.en = 'All your trip documents, with no amounts. Prices and invoices are seen by whoever manages the account.';
    }
  }

  function renderTrips() {
    var admin = current.rol === 'admin';
    var list = TRIPS.filter(function (trip) { return admin || trip.propio; });

    $('tripsList').innerHTML = list.map(function (trip, index) {
      var docs = trip.docs.map(function (kind) {
        var meta = DOC_META[kind];
        return '' +
          '<li class="doc">' +
            '<span class="doc__icon" aria-hidden="true">' + meta.abbr + '</span>' +
            '<span class="doc__id">' +
              '<strong ' + pair(meta.titulo) + '>' + esc(say(meta.titulo)) + '</strong>' +
              '<span>' + esc(meta.ref) + ' · <span ' + pair(meta.emitido) + '>' + esc(say(meta.emitido)) + '</span></span>' +
            '</span>' +
            '<button type="button" class="btn btn--ghost btn--sm" data-doc="' + kind + '" data-trip="' + index + '" ' +
              'data-es="Ver documento" data-en="View document">Ver documento</button>' +
          '</li>';
      }).join('');

      return '' +
        '<article class="trip">' +
          '<header class="trip__head">' +
            '<span class="trip__title">' +
              '<strong ' + pair(trip.motivo) + '>' + esc(say(trip.motivo)) + '</strong>' +
              '<span ' + pair(trip.ruta) + '>' + esc(say(trip.ruta)) + '</span>' +
            '</span>' +
            (admin ? '<span class="trip__traveller">' + esc(trip.viajero) + '</span>' : '') +
            '<span class="trip__dates" ' + pair(trip.fechas) + '>' + esc(say(trip.fechas)) + '</span>' +
            '<span class="chip' + (trip.estado.key === 'warn' ? ' chip--admin' : '') + '" ' + pair(trip.estado) + '>' +
              esc(say(trip.estado)) + '</span>' +
          '</header>' +
          '<ul class="docs">' + docs + '</ul>' +
        '</article>';
    }).join('');
  }

  function renderInvoices() {
    $('billsList').innerHTML = INVOICES.map(function (bill) {
      var lines = bill.lineas.map(function (line) {
        return '' +
          '<li class="doc">' +
            '<span class="doc__id">' +
              '<strong ' + pair(line.k) + '>' + esc(say(line.k)) + '</strong>' +
              '<span ' + pair(line.d) + '>' + esc(say(line.d)) + '</span>' +
            '</span>' +
            '<span class="doc__amount">' + esc(line.v) + ' €</span>' +
          '</li>';
      }).join('');

      return '' +
        '<article class="trip">' +
          '<header class="trip__head">' +
            '<span class="trip__title">' +
              '<strong>' + esc(bill.ref) + '</strong>' +
              '<span ' + pair(bill.concepto) + '>' + esc(say(bill.concepto)) + '</span>' +
            '</span>' +
            '<span class="trip__dates">' + esc(bill.fecha) + '</span>' +
            '<span class="chip' + (bill.estado.key === 'warn' ? ' chip--admin' : '') + '" ' +
              pair(bill.estado) + '>' + esc(say(bill.estado)) + '</span>' +
            '<button type="button" class="btn btn--ghost btn--sm" data-bill="' + esc(bill.ref) + '" ' +
              'data-es="Descargar" data-en="Download">Descargar</button>' +
          '</header>' +
          '<ul class="docs">' + lines +
            '<li class="doc doc--total">' +
              '<span class="doc__id">' +
                '<strong data-es="Total" data-en="Total">Total</strong>' +
                '<span data-es="IVA incluido donde aplica" data-en="VAT included where applicable">IVA incluido donde aplica</span>' +
              '</span>' +
              '<span class="doc__amount">' + esc(bill.total) + ' €</span>' +
            '</li>' +
          '</ul>' +
        '</article>';
    }).join('');
  }

  /* ---------- Visor de documento ---------- */

  var lastFocus = null;

  function sheet(bandLabel, rows) {
    var body = rows.map(function (row) {
      return '<div class="sheet__row"><dt ' + pair(row.k) + '>' + esc(say(row.k)) + '</dt>' +
             '<dd>' + row.v + '</dd></div>';
    }).join('');

    return '' +
      '<div class="sheet">' +
        '<p class="sheet__band"><span ' + pair(bandLabel) + '>' + esc(say(bandLabel)) + '</span>' +
          '<em data-es="Ejemplo" data-en="Example">Ejemplo</em></p>' +
        '<dl class="sheet__rows">' + body + '</dl>' +
        '<p class="sheet__noprice" data-es="Sin importes · el coste va en la factura del servicio" ' +
          'data-en="No amounts · cost appears on the service invoice">Sin importes · el coste va en la factura del servicio</p>' +
      '</div>';
  }

  function docContent(kind, trip) {
    if (kind === 'boarding') {
      return sheet({ es: 'Compañía de ejemplo', en: 'Example airline' }, [
        { k: { es: 'Pasajero', en: 'Passenger' }, v: esc(trip.viajero.toUpperCase()) },
        { k: { es: 'Vuelo', en: 'Flight' }, v: 'XX 1274' },
        { k: { es: 'Ruta', en: 'Route' }, v: esc(say(trip.ruta)) },
        { k: { es: 'Fecha', en: 'Date' }, v: esc(trip.salida) },
        { k: { es: 'Embarque', en: 'Boarding' }, v: '11:20' },
        { k: { es: 'Puerta', en: 'Gate' }, v: 'B14' },
        { k: { es: 'Asiento', en: 'Seat' },
          v: seatPreference() + '<small data-es="Según tu preferencia guardada" data-en="From your saved preference">Según tu preferencia guardada</small>' },
        { k: { es: 'Localizador', en: 'Booking ref' }, v: 'XZ8K2P' }
      ]);
    }

    if (kind === 'hotel') {
      return sheet({ es: 'Hotel Ejemplo · Palmones', en: 'Example Hotel · Palmones' }, [
        { k: { es: 'Huésped', en: 'Guest' }, v: esc(trip.viajero) },
        { k: { es: 'Entrada', en: 'Check-in' }, v: esc(trip.salida) + ' · 23:40' },
        { k: { es: 'Salida', en: 'Check-out' }, v: esc(trip.regreso) },
        { k: { es: 'Habitación', en: 'Room' },
          v: 'Doble uso individual<small data-es="Planta alta, no fumador" data-en="High floor, non-smoking">Planta alta, no fumador</small>' },
        { k: { es: 'Régimen', en: 'Board' }, v: 'Alojamiento y desayuno' },
        { k: { es: 'Reserva', en: 'Booking' }, v: 'HB-449120' },
        { k: { es: 'Facturación', en: 'Billing' },
          v: 'Amura<small data-es="A cargo de la agencia: no pagas nada en recepción" data-en="Charged to the agency: nothing to pay at the desk">A cargo de la agencia: no pagas nada en recepción</small>' }
      ]);
    }

    return sheet({ es: 'Traslado privado', en: 'Private transfer' }, [
      { k: { es: 'Pasajero', en: 'Passenger' }, v: esc(trip.viajero) },
      { k: { es: 'Recogida', en: 'Pick-up' }, v: 'AGP T3 · Llegadas' },
      { k: { es: 'Fecha', en: 'Date' }, v: esc(trip.salida) + ' · 22:10' },
      { k: { es: 'Destino', en: 'Drop-off' }, v: 'Hotel Ejemplo, Palmones' },
      { k: { es: 'Vehículo', en: 'Vehicle' },
        v: 'Berlina<small data-es="Espacio para instrumental facturado" data-en="Room for checked instrument cases">Espacio para instrumental facturado</small>' },
      { k: { es: 'Conductor', en: 'Driver' },
        v: '—<small data-es="Nombre y matrícula, 24 h antes por WhatsApp" data-en="Name and plate, 24 h ahead by WhatsApp">Nombre y matrícula, 24 h antes por WhatsApp</small>' },
      { k: { es: 'Referencia', en: 'Reference' }, v: 'TR-20260312' }
    ]);
  }

  function openDoc(kind, tripIndex) {
    var admin = current.rol === 'admin';
    var trip = TRIPS.filter(function (t) { return admin || t.propio; })[tripIndex];
    if (!trip) { return; }

    lastFocus = document.activeElement;
    var title = $('docTitle');
    title.dataset.es = DOC_META[kind].titulo.es;
    title.dataset.en = DOC_META[kind].titulo.en;
    $('docBody').innerHTML = docContent(kind, trip);
    $('docViewer').hidden = false;
    refresh();
    $('docClose').focus();
  }

  function closeDoc() {
    $('docViewer').hidden = true;
    if (lastFocus) { lastFocus.focus(); }
  }

  /* ---------- Pestañas ---------- */

  var tabs = ['tabTrips', 'tabPrefs', 'tabBills'];
  var panels = { tabTrips: 'panelTrips', tabPrefs: 'panelPrefs', tabBills: 'panelBills' };

  function selectTab(id) {
    tabs.forEach(function (tabId) {
      var tab = $(tabId);
      var on = tabId === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      $(panels[tabId]).hidden = !on;
    });
  }

  function visibleTabs() {
    return tabs.filter(function (id) { return !$(id).hidden; });
  }

  tabs.forEach(function (id) {
    $(id).addEventListener('click', function () { selectTab(id); });
    $(id).addEventListener('keydown', function (event) {
      var order = visibleTabs();
      var at = order.indexOf(id);
      var next = null;
      if (event.key === 'ArrowRight') { next = order[(at + 1) % order.length]; }
      if (event.key === 'ArrowLeft') { next = order[(at - 1 + order.length) % order.length]; }
      if (event.key === 'Home') { next = order[0]; }
      if (event.key === 'End') { next = order[order.length - 1]; }
      if (next) { event.preventDefault(); selectTab(next); $(next).focus(); }
    });
  });

  /* ---------- Entrada y salida ---------- */

  function signIn(id) {
    current = USERS[id] || USERS.viajero;
    writeSession(current.id);

    renderUser();
    loadPrefs();
    renderTrips();
    renderInvoices();
    selectTab('tabTrips');

    $('viewLogin').hidden = true;
    $('viewApp').hidden = false;
    refresh();
    window.scrollTo(0, 0);
  }

  function signOut() {
    current = null;
    writeSession(null);
    closeDoc();
    $('viewApp').hidden = true;
    $('viewLogin').hidden = false;
    $('loginStatus').textContent = '';
    window.scrollTo(0, 0);
  }

  $('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var status = $('loginStatus');
    status.style.color = 'var(--amber)';
    status.textContent = i18n.currentLang() === 'en'
      ? 'Demo: there is no server to check these credentials. Signing you in with the sample traveller profile.'
      : 'Demo: no hay servidor que compruebe estas credenciales. Entramos con el perfil de viajero de ejemplo.';
    window.setTimeout(function () { signIn('viajero'); }, 700);
  });

  document.querySelectorAll('[data-demo-login]').forEach(function (button) {
    button.addEventListener('click', function () { signIn(button.dataset.demoLogin); });
  });

  $('logout').addEventListener('click', signOut);

  /* ---------- Preferencias: guardar ---------- */

  $('prefsForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var status = $('prefsStatus');
    var ok = savePrefs();
    var now = new Date().toLocaleTimeString(i18n.currentLang() === 'en' ? 'en-GB' : 'es-ES',
      { hour: '2-digit', minute: '2-digit' });

    if (ok) {
      status.style.color = 'var(--green)';
      status.textContent = i18n.currentLang() === 'en'
        ? 'Saved at ' + now + ' — in this browser only.'
        : 'Guardado a las ' + now + ' — solo en este navegador.';
      renderTrips();
      refresh();
    } else {
      status.style.color = 'var(--red)';
      status.textContent = i18n.currentLang() === 'en'
        ? 'Could not save: this browser is blocking local storage.'
        : 'No se ha podido guardar: este navegador bloquea el almacenamiento local.';
    }
  });

  /* ---------- Delegación de clics ---------- */

  document.addEventListener('click', function (event) {
    var docButton = event.target.closest('[data-doc]');
    if (docButton) {
      openDoc(docButton.dataset.doc, Number(docButton.dataset.trip));
      return;
    }

    var billButton = event.target.closest('[data-bill]');
    if (billButton) {
      var note = document.querySelector('#panelBills .panel-note');
      note.style.color = 'var(--amber)';
      note.textContent = i18n.currentLang() === 'en'
        ? 'Demo: invoice ' + billButton.dataset.bill + ' would download here as a PDF.'
        : 'Demo: aquí se descargaría la factura ' + billButton.dataset.bill + ' en PDF.';
      return;
    }

    if (event.target.closest('[data-close-doc]') || event.target.closest('#docClose')) {
      closeDoc();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !$('docViewer').hidden) { closeDoc(); }
  });

  /* ---------- Arranque ---------- */

  var resumed = readSession();
  if (resumed && USERS[resumed]) { signIn(resumed); }
})();
