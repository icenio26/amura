# Amura · Marine Travel & Events

Web corporativa de una agencia de viajes de empresa especializada en el **sector marítimo**,
con base en el Puerto de Algeciras y Palmones (Campo de Gibraltar).

**Alcance actual:** el viaje, de puerta a destino — vuelos, trenes, hoteles, taxi y traslados,
autobús para grupos, y reprogramación 24/7 cuando el plan cambia. Nada dentro del recinto
portuario. Los dos públicos son quien va al barco (técnicos, inspectores, tripulación) y quien va
a vender (dirección y equipo comercial: ferias, misiones comerciales, visitas a clientes).
El detalle y las fases están en `docs/alcance-y-fases.md`.

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

0. **El alcance manda sobre los informes.** `docs/alcance-y-fases.md` es la referencia; los
   informes `01`–`03` se escribieron para un alcance más amplio y se conservan como registro.

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

## Despliegue en Vercel

El repositorio ya está configurado (`vercel.json`). No hay build: Vercel sirve los archivos tal cual.

1. Entrar en [vercel.com/new](https://vercel.com/new) con la cuenta de GitHub.
2. **Import** sobre el repositorio `icenio26/amura`.
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: vacío (raíz).
4. Deploy. Queda publicado en `amura-*.vercel.app` en menos de un minuto.
5. Cada `git push` a la rama de producción vuelve a desplegar automáticamente, y cada rama
   genera su propia URL de previsualización.

Para el dominio propio: **Project → Settings → Domains → Add**, y apuntar los DNS del
registrador a Vercel. El certificado HTTPS se emite solo.

Alternativas equivalentes y también gratuitas: Cloudflare Pages o GitHub Pages.
La comparativa completa del stack está en `docs/stack-tecnologico.md`.
