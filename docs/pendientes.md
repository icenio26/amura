# Pendientes antes de publicar

## Bloqueantes

| # | Qué | Dónde |
|---|---|---|
| 1 | **Teléfono de guardia real.** Ahora aparece `+34 6XX XXX XXX` y los enlaces apuntan a `tel:+34600000000` / `wa.me/34600000000`. | `index.html` (7 apariciones), `assets/js/main.js` (mensajes de confirmación) |
| 2 | **Dominio y correo.** `reservas@amura.es` es un marcador. Registrar `.com` y `.es` antes de imprimir nada. | `index.html` |
| 3 | **Datos registrales del pie**: denominación social, CIF y número de registro de agencia de viajes de la Junta de Andalucía. Hoy dicen «pendiente», que es cierto pero no puede seguir así al publicar. | `index.html`, footer |
| 4 | **Textos legales**: aviso legal (LSSI-CE art. 10), política de privacidad (RGPD/LOPDGDD), política de cookies y condiciones de contratación. Los cuatro enlaces del pie apuntan a `#`. Debe redactarlos un profesional. | `index.html`, footer |
| 5 | **Conectar el formulario.** Ahora valida y muestra confirmación, pero no envía. Ver abajo. | `index.html`, `assets/js/main.js` |

## Conectar el formulario (Web3Forms, plan gratuito)

1. Obtener una `access_key` en web3forms.com con el correo corporativo.
2. En `index.html`, en el `<form id="briefForm">`:
   ```html
   <form class="form" id="briefForm" action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="TU_ACCESS_KEY">
   ```
3. En `assets/js/main.js`, quitar el `event.preventDefault()` del manejador de envío una vez
   validado el formulario, y dejar la validación previa.
4. Crear una página de gracias que **repita el teléfono de guardia**, y apuntar a ella con
   `<input type="hidden" name="redirect" value="https://…/gracias.html">`.

## Área de cliente

Es una maqueta. Antes de convertirla en producto, leer `docs/area-cliente.md`: autenticación
gestionada, comprobación de rol **en servidor**, almacenamiento privado de documentos con URL
firmada, y el trabajo de protección de datos. Y valorar antes si una plataforma existente de
gestión de viajes ya lo cubre, porque probablemente salga más barato que construirlo.

## Marca

- Verificar disponibilidad de **Amura** en EUIPO, clases 39 (viajes) y 41 (eventos y formación).
- Registrar los dominios antes de cualquier material impreso.
- Producir el logotipo definitivo a partir del concepto de `docs/01-branding.md`. El de la web es
  una versión SVG mínima del mismo concepto (ángulo de amura + punto de luz verde).

## Contenido que reforzaría la credibilidad

Por orden de impacto, según `docs/02-ux-arquitectura.md`:

1. **Fichas de las personas** con foto, nombre y trayectoria previa en el sector. La empresa es
   nueva; la experiencia de quien la monta, no. Es la prueba social más fuerte disponible.
2. **Nombre y móvil de quien está de guardia esta semana**, actualizado cada lunes. La sección de
   contacto ya reserva el hueco.
3. **Fotografía propia** de muelle, fondeadero o pilot boat. Mejor una foto propia mediocre que
   stock perfecto: nada de playas, maletas ni azafatas.
4. **Seguro de responsabilidad civil y acreditación IATA o consolidador emisor**, cuando existan.

## SEO técnico, cuando haya dominio

- Añadir `Sitemap: https://TU-DOMINIO/sitemap.xml` a `robots.txt` y crear el `sitemap.xml`.
- Añadir `<link rel="canonical">` con la URL definitiva en `index.html`.
- Completar `og:url` y `og:image` (una imagen 1200×630 propia, de muelle o fondeadero).
- Dar de alta la ficha de Google Business Profile en Algeciras y Palmones.

## Revisión periódica

- Cifras del puerto: se actualizan cada enero-febrero. Ver `docs/datos-puerto-verificados.md`.
- Ferias listadas en la sección de eventos: comprobar el calendario cada año.
