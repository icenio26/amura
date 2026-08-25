# Amura · Marine Travel & Events

Web corporativa de una agencia de viajes y eventos especializada en el **sector marítimo**,
con base en el Puerto de Algeciras y Palmones (Campo de Gibraltar).

Sitio estático: HTML, CSS y JavaScript sin dependencias ni build. Se despliega tal cual.

```
index.html              La web completa (una sola página, bilingüe ES/EN)
assets/css/styles.css   Sistema visual "noche de terminal"
assets/js/main.js       Idioma, consola de escala, revelado, formulario
docs/                   Trabajo de marca, UX, marketing y decisiones técnicas
```

---

## El nombre

El nombre de partida era **Green Light**. Tras el análisis de marca (`docs/01-branding.md`)
se descarta como nombre corporativo —colisión con el vocabulario ESG/descarbonización del
shipping, baja distintividad registrable y mucho ruido de búsqueda— y se recupera en dos sitios
donde sí funciona: como **color de marca** (el verde de estribor, usado sólo como señal) y como
posible nombre del protocolo de confirmación 24/7.

La marca propuesta es **Amura** (el costado de proa, la parte del buque que rompe primero el
agua), con descriptor fijo *Marine Travel & Events* y tagline **«A bordo a tiempo» / «On board,
on time»**. Cambiar el nombre es una búsqueda y reemplazo en `index.html`; el sistema visual no
depende de él.

## Decisiones que gobiernan el contenido

1. **Nada que no sea cierto hoy.** La empresa acaba de arrancar: la web no muestra logos de
   clientes, testimonios, años de experiencia ni volúmenes. En su lugar publica compromisos
   medibles. Los clientes potenciales identificados están en `docs/pipeline-comercial.md`, que es
   material interno y no se publica.
2. **El ejemplo del hero está etiquetado como ejemplo.** La consola de escala anima un caso real
   de negocio —un ETA que se retrasa catorce horas y un plan que se rehace— con un buque
   inventado y la etiqueta «Ejemplo» visible.
3. **Sólo datos del puerto verificados**, con fuente y año, recogidos en
   `docs/datos-puerto-verificados.md`. Las distancias por carretera van marcadas con ≈.

## Antes de publicar

Todo lo pendiente está en `docs/pendientes.md`. Lo mínimo: teléfono de guardia real,
dominio y correo, datos registrales del pie de página, textos legales y conectar el formulario.

## Desarrollo

```bash
npx http-server -p 8080 .   # o: python3 -m http.server 8080
```

## Despliegue

Cloudflare Pages (recomendado) o GitHub Pages, ambos gratuitos y sin build.
Los pasos exactos y la comparativa completa del stack están en `docs/stack-tecnologico.md`.
