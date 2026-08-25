# Amura — Estrategia UX de la web

Premisa: esto no es una web de viajes, es la **ficha técnica de un proveedor operativo**. Debe parecerse más a un servicio de asistencia portuaria que a una agencia. Bilingüe ES/EN con conmutador visible: muchos crew managers que deciden están fuera de España.

## 1. Jobs To Be Done y objeciones

**JTBD principal (operations / crew manager):** *"Cuando tengo que poner a una persona a bordo de un buque con escala corta y ETA móvil, quiero delegar vuelo + hotel + traslado + acceso a muelle o launch en alguien que entienda de escalas, para no reconstruir el viaje yo a las 23:40 ni arriesgar que el buque zarpe sin el técnico."*
**Secundarios:** justificar el gasto ante compras con trazabilidad; no depender de la única persona del equipo que "sabe hacerlo"; sacar la convención anual o la feria sectorial fuera del equipo operativo.

**Objeción 1 — "Ya tengo agencia / lo hacemos in-house; cambiar es un riesgo."**
No pedir sustitución, pedir **prueba controlada**: posicionamiento como *proveedor de escalas críticas*, no agencia generalista; CTA "Ponnos a prueba en una escala"; onboarding en 48 h, sin exclusividad ni volumen mínimo.

**Objeción 2 — "¿De verdad hay alguien al otro lado a las 3 de la mañana?"**
Es *la* objeción del sector. Teléfono y WhatsApp de guardia **en texto plano, no detrás del formulario**, en header y footer; compromiso falsable ("respuesta en <30 min, 24/7/365, festivos incluidos"); nombre y cara de quien está de guardia, no un buzón.

**Objeción 3 — "No conocen mi realidad: fondeadero, visado de tránsito, acceso portuario, ETA que se mueve."**
Se neutraliza con **vocabulario operativo**: launch boat al fondeadero de Algeciras, gate pass y acreditación APBA, carta de invitación para visado, sign-on/sign-off, spare parts acompañadas. Quien conoce el negocio reconoce a un igual en diez segundos de lectura.

## 2. Arquitectura de la página

1. **Header sticky (56–64 px).** Logo izq. / anclas centro (Escalas, Eventos, Cómo trabajamos, Contacto) / der.: ES-EN, teléfono de guardia clicable y botón "Solicitar asistencia". Móvil: logo + icono teléfono siempre visibles, resto en menú.
2. **Hero — 2 columnas 55/45.** Titular operativo, no aspiracional: "Movemos a tu gente a bordo. Aunque el ETA cambie dos veces." Subtítulo con los tres anclajes (Algeciras y Palmones · 24/7 · vuelos, hotel, traslado, launch y acceso portuario), doble CTA y foto real de muelle o fondeadero. Bajo el CTA, franja de tres datos: "<30 min de respuesta" · "24/7/365" · "A 10 min de la terminal".
3. **Banda de reconocimiento — 3 columnas.** Tarjetas de escenario ("Escala de 14 h", "Buque al fondeadero", "Relevo con visado"): una línea de situación y una de lo que hacemos, máx. 25 palabras.
4. **Cómo funciona una escala** (ver §3). Ancho completo, fondo diferenciado.
5. **Servicios — grid 2×4**, icono lineal + etiqueta + una línea: vuelos y reemisiones fuera de horario · hoteles con check-in flexible y no-show gestionado · traslados a muelle y a AGP/GIB/SVQ · launch boat a fondeadero · gate pass y acreditaciones · cartas de invitación y visados · spare parts acompañadas · sign-on/sign-off documental.
6. **Eventos corporativos — banda 60/40**, visualmente más ligera y con CTA propia. Convenciones, ferias sectoriales (nombrarlas: Posidonia, SMM, Nor-Shipping), incentivos, formaciones.
7. **Por qué Amura — 2×2** (ver §4): cuatro bloques con dato duro, cero adjetivos.
8. **Cobertura — mapa 60% + lista 40%.** Mapa estático del Estrecho y tiempos reales de traslado a los tres aeropuertos. Prueba de proximidad física.
9. **Contacto — 50/50.** Formulario a la izquierda; a la derecha, contacto directo: teléfono de guardia, WhatsApp, email, dirección. Quien no rellena formularios, llama.
10. **Footer.** Razón social, CIF, número de registro de agencia de viajes, dirección física, teléfono 24 h repetido, legal/privacidad/cookies. Aquí el footer es **prueba de existencia legal**, no relleno.

## 3. La sección clave: la escala en 5 segundos

**Modelo: stepper horizontal de 5 nodos con carril de tiempo debajo**; en móvil rota a vertical. No tabla (se lee en 30 s, no en 5), no diagrama de estados (parece software), no timeline con fechas (no hay fechas, hay ETAs móviles).

Diferenciador visual clave: el paso 4 se dibuja como **bucle**, una flecha curva que vuelve al paso 3, etiquetada "ETA revisado → replanificamos sin coste de gestión". Ese bucle es el argumento de venta entero, dibujado.

| Paso | Título | Micro-copy | Tiempo |
|---|---|---|---|
| 1 | Nos escribes | Buque, puerto, ETA estimado y cuántas personas. Nada más. | 0 min |
| 2 | Propuesta | Vuelo, hotel y traslado con margen sobre el ETA. | < 30 min |
| 3 | Confirmamos | Emitimos, reservamos y tramitamos gate pass y visados. | Mismo día |
| 4 | Seguimos la escala | Vigilamos el ETA. Si se mueve, movemos el viaje. | 24/7 |
| 5 | A bordo | Traslado a muelle o launch al fondeadero. Confirmación de embarque. | — |

Cierre en una línea bajo el stepper: **"Un interlocutor. Un número de teléfono. Toda la escala."** y repetición del CTA primario.

## 4. Prueba social sin testimonios

Nada de logos ajenos ni "empresas que confían en nosotros". Cuatro mecanismos honestos:

1. **Credenciales verificables.** Registro de agencia de viajes de la Junta de Andalucía, CIF, seguro de RC con cobertura indicada, acreditación IATA o consolidador emisor. Un dato comprobable vale más que diez adjetivos.
2. **Trayectoria de las personas, no de la empresa.** Fichas con foto, nombre, cargo y rol previo: "14 años en consignataria en el Puerto de Algeciras", "ex-crew operations". La empresa es nueva; la experiencia no, y es lo que se compra.
3. **SLA público y falsable.** "Respuesta en <30 min 24/7", "reemisión fuera de horario sin recargo de gestión", "un gestor con nombre y móvil". Publicar un compromiso medible es riesgo asumido: ningún generalista lo da.
4. **Demostración de conocimiento operativo.** Mini-caso **etiquetado como escenario** ("Ejemplo de operativa: técnico de electrónica a bordo en escala de 14 h") con la secuencia exacta: llegada a AGP, traslado, ventana de gate pass, launch al fondeadero. Más la red local declarada (launch, transportistas, hoteles del Campo de Gibraltar). Nunca presentado como cliente real.

## 5. Conversión

**CTA primaria** (sólido, repetida en hero, tras el stepper y en contacto): `Solicitar asistencia 24/7`.
**CTA secundaria** (outline, al lado): `Llamar ahora +34 XXX XXX XXX`, con `tel:` en móvil. Debajo, en pequeño: "También por WhatsApp. Respondemos también de madrugada."
**CTA de eventos:** `Hablemos de tu evento`.

**Formulario: 7 campos + 1 toggle, una sola columna**, sin wizard ni pasos.
1. **Nombre y empresa** (obligatorio, campo único: menos fricción).
2. **Email corporativo** (obligatorio, validación suave, sin bloquear dominios).
3. **Teléfono / WhatsApp** (obligatorio) con ayuda inline: "Para llamarte si el ETA cambia". En una escala crítica, el email no sirve.
4. **Buque** (opcional): nombre o IMO. Opcional porque a veces aún no está asignado.
5. **Puerto y ETA estimado** (obligatorio, **texto libre, no datepicker**): un ETA no es una fecha exacta, y forzar un calendario delata a una web de turismo.
6. **Nº de personas** (numérico, valor por defecto 1).
7. **Qué necesitas** (textarea, obligatorio) con placeholder que enseña el formato: "Técnico desde Hamburgo, embarque en fondeadero, necesita visado de tránsito".
8. **Toggle de urgencia: "Escala en curso" / "Planificación"**. Cuesta un clic, cualifica más que ningún otro campo y cambia el mensaje de confirmación ("Te llamamos en menos de 30 minutos" vs "Te respondemos hoy").

Sin backend, `mailto:` es inaceptable en B2B: servicio de formularios estático (Formspree, Web3Forms, Netlify Forms) y página de gracias que **repita el teléfono de guardia**.

## 6. UX y accesibilidad: 8 reglas

1. **Cuatro niveles tipográficos, ni uno más.** Hero 40–48 px, sección 28–32, subtítulo 20, cuerpo 17–18 (nunca 14: el decisor tiene 45+ y lee en el móvil, en un muelle). Interlineado 1,6; línea máx. 68 caracteres.
2. **Contraste AA mínimo, AAA en cuerpo** (≥7:1). Nada de gris claro "elegante". Texto sobre foto: solo con overlay sólido al 55%.
3. **El teléfono nunca es imagen ni icono suelto.** Texto seleccionable, `tel:` y `aria-label`, presente al menos cuatro veces en la página.
4. **Móvil con el pulgar abajo.** Targets ≥48×48 px, separación ≥8 px y **barra fija inferior con dos botones: Llamar / Escribir**: el patrón de un servicio de guardia, y aquí aplica.
5. **Densidad media-alta.** Máx. 96 px de padding vertical entre secciones (56 en móvil). El aire excesivo comunica "marca"; este público lo lee como falta de contenido.
6. **Motion mínimo.** Solo fade + 8 px al entrar en viewport, 200 ms, una vez. Sin parallax, sin contadores animados, sin autoplay. `prefers-reduced-motion` lo desactiva todo.
7. **Foco de teclado visible y propio.** `:focus-visible` con outline 2 px + offset 2 px en color de marca en todo elemento interactivo; jamás `outline: none`. Orden de tabulación = orden visual, con skip-link inicial.
8. **Formulario perdonador.** `<label>` visible siempre (el placeholder no es etiqueta), errores junto al campo con `aria-live="polite"` describiendo la solución, `autocomplete` e `inputmode` correctos, estado de envío anunciado y **nunca borrar lo escrito al fallar la validación**.

## 7. Qué NO hacer

1. **Imaginería de turismo.** Playas, cruceros, maletas rodando, azafatas sonrientes, portátil con café. Un technical superintendent cierra la pestaña. Solo muelle, grúas, portacontenedores, fondeadero, pilot boat: mejor foto propia mediocre que stock perfecto.
2. **Buscador de vuelos u hoteles / widget de reservas.** Convierte a Amura en algo comparable a una OTA y destruye el argumento: el cliente no viene a reservar, viene a delegar. Y exigiría el backend que no hay.
3. **Logos de "clientes" o "partners" y testimonios sin nombre.** Insinuar una cartera inexistente es engañoso y, en un sector tan pequeño y conectado, se detecta y se comenta. Igual de dañino: un "+500 viajes gestionados" inventado.
4. **Precios, "desde X €", paquetes o descuentos.** El eje de decisión es la fiabilidad, no el precio; anunciarlo invita a compararte con una OTA y a perder por 12 €.
5. **Contacto solo por formulario, chatbot o "presupuesto en 3 pasos".** Ocultar el teléfono contradice frontalmente la promesa 24/7. Añádase pop-up de newsletter, cookie wall agresivo y exit-intent. Un proveedor de guardia no interrumpe: atiende.
