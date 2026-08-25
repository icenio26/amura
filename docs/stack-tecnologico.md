# Stack tecnológico — recomendación

> Revisión de la propuesta inicial (WordPress + Elementor / HubSpot / Laravel / PostgreSQL / VPS / M365)
> frente a lo que realmente necesita el negocio en su fase actual.

## Resumen ejecutivo

La propuesta original es un stack correcto **para una empresa con tráfico, equipo de marketing y
operaciones ya rodadas**. Para una agencia que arranca y cuyo único objetivo web es *conseguir que un
decisor pida una llamada*, ese stack introduce coste fijo, superficie de mantenimiento y trabajo de
infraestructura que no compra nada.

Recomendación: **empezar estático y gratuito, y añadir piezas sólo cuando un problema real las pida.**
El coste total de la fase 0 es el dominio: ~10-12 €/año.

---

## Comparativa pieza a pieza

| Pieza | Propuesta inicial | Recomendación | Por qué |
|---|---|---|---|
| Web pública | WordPress + Elementor | **HTML/CSS/JS estático** en este repo, desplegado en Cloudflare Pages o GitHub Pages | Sin VPS, sin plugins que parchear, sin base de datos que se cae. Carga en <1 s desde CDN. Una web de 6 secciones no necesita un CMS. |
| Hosting | VPS (IONOS / OVH / Hetzner) | **Vercel** (gratis; Cloudflare Pages equivalente) | HTTPS, CDN global, despliegue automático en cada `git push` y URL de previsualización por rama. Un VPS son 5-15 €/mes *más* ser tu propio sysadmin: actualizaciones, backups, fail2ban, certificados. |
| Backend | Laravel | **Ninguno, por ahora** | No hay ningún dato que persistir todavía. Añadir un backend antes de tener operación es construir el almacén antes de tener mercancía. |
| Base de datos | PostgreSQL | **Ninguna, por ahora** | Igual que arriba. Cuando haga falta seguimiento de expedientes, empezar por Airtable/Notion y sólo desarrollar a medida cuando el proceso esté probado y el volumen lo justifique. |
| CRM | HubSpot | **HubSpot Free** ✅ mantener | Aquí la propuesta inicial acierta. El plan gratuito es suficiente durante mucho tiempo: contactos, empresas, negocios, secuencias básicas y formularios. |
| Formulario de contacto | (vía WordPress) | **Web3Forms o Formspree** (plan gratuito) o el formulario embebido de HubSpot | Envía el aviso al correo y crea el contacto en el CRM sin backend propio. |
| Correo profesional | Microsoft 365 / Google Workspace | **Google Workspace o M365 Business Basic** (~6 €/usuario/mes) | Merece la pena desde el día uno: entregabilidad, calendario compartido y firma corporativa. En sector marítimo un correo `@gmail.com` cuesta credibilidad. Alternativa de arranque a coste cero: Zoho Mail (plan gratuito, 1 dominio). |
| Analítica | (Google Analytics por defecto) | **Cloudflare Web Analytics** o Plausible self-hosted | Gratis y **sin cookies**: no dispara la obligación de banner de consentimiento, lo que simplifica muchísimo el cumplimiento RGPD de una web de captación. |
| Control de versiones | Git + GitHub | **Git + GitHub** ✅ mantener | Correcto. Además es lo que habilita el despliegue automático. |
| Dominio | — | Registrar `.es` y `.com` del nombre elegido | Único coste ineludible. Registrarlo *antes* de imprimir nada. |

---

## Cuándo sí tendría sentido cada pieza descartada

No se descartan para siempre. Estos son los disparadores concretos:

- **WordPress (o mejor, Astro + CMS headless gratuito tipo Decap/Sveltia):** cuando alguien no técnico
  tenga que publicar contenido con frecuencia (blog sectorial, notas de prensa, casos). Antes, no.
- **Backend propio (Laravel/PostgreSQL o similar):** cuando haya suficientes expedientes de escala
  simultáneos como para que hoja de cálculo + CRM se queden cortos, y el proceso operativo esté
  estabilizado. Construirlo antes garantiza construir el proceso equivocado.
- **VPS:** cuando exista ese backend. La web pública no lo necesita nunca.

---

## Coste de la fase 0

| Concepto | Coste |
|---|---|
| Dominio (.es + .com) | ~20-25 €/año |
| Hosting web (Vercel plan Hobby) | 0 € |
| CRM (HubSpot Free) | 0 € |
| Formularios (Web3Forms / Formspree free) | 0 € |
| Analítica (Cloudflare Web Analytics) | 0 € |
| Correo profesional (opcional al inicio) | 0 € (Zoho) o ~6 €/usuario/mes |
| **Total mínimo** | **~2 €/mes** |

---

## Despliegue de esta web

El sitio de este repositorio es estático: se publica tal cual, sin build. La configuración de
Vercel (`vercel.json`) ya está en el repositorio e incluye cabeceras de seguridad y política de
caché para los assets.

**Vercel (elegido)**
1. [vercel.com/new](https://vercel.com/new) → Import del repositorio `icenio26/amura`.
2. Framework Preset: *Other*. Build Command y Output Directory: vacíos.
3. Deploy. Cada `git push` redespliega; cada rama tiene su URL de previsualización.
4. Dominio propio en Project → Settings → Domains.

Nota sobre el plan gratuito: el plan Hobby de Vercel es para uso no comercial. Para una web
corporativa que factura, el plan Pro son unos 20 $/mes por usuario. Si eso pesa al arrancar,
**Cloudflare Pages no tiene esa restricción y es gratuito también para uso comercial** — el
repositorio funciona igual en ambos, sin cambiar nada.

**Cloudflare Pages (alternativa sin coste para uso comercial)**
1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Seleccionar este repositorio. Build command: *(vacío)*. Output directory: `/`.
3. Añadir el dominio propio en Custom domains.

**GitHub Pages (alternativa)**
1. Settings → Pages → Source: Deploy from a branch.
2. Branch: la rama que se quiera publicar, carpeta `/ (root)`.
