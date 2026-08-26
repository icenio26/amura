# Área de cliente

## Qué hay hoy: una maqueta, no un producto

`area-cliente.html` es una **demostración funcional**. Se puede navegar entera, guarda las
preferencias y enseña la diferencia entre los dos roles, pero:

- **No hay servidor ni autenticación.** El formulario de acceso no comprueba nada; los dos botones
  de la caja de demostración entran directamente con un perfil de ejemplo.
- **Todos los datos son ficticios**: personas, viajes, referencias e importes.
- **Las preferencias se guardan en `localStorage`**, es decir, solo en el navegador de quien mira.

Está marcado como tal en tres sitios —la caja de la pantalla de acceso, la banda superior del
panel y el pie de cada documento— para que nadie lo confunda con un sistema en producción, y la
página lleva `noindex` para que no aparezca en buscadores.

**Se ha construido así a propósito.** Montar autenticación real, base de datos y almacenamiento de
documentos antes de tener el primer cliente es construir a ciegas: la maqueta permite enseñarla en
una visita comercial, recoger objeciones y decidir qué hace falta de verdad, con un coste de cero.

## La decisión de diseño que hubo que tomar

El encargo pedía dos cosas que chocan: que el cliente vea *«toda la documentación del viaje,
siempre sin precio»* y que además *«pueda acceder a la factura del servicio»*. La misma persona no
puede ver los importes y no verlos.

La resolución son **dos roles**:

| | Viajero | Administración de la cuenta |
|---|---|---|
| Ve sus propios viajes | Sí | Sí, y los de todo el equipo |
| Documentos (tarjeta, bono, voucher) | Sí, **sin ningún importe** | Sí |
| Pestaña de facturas | **No existe para este rol** | Sí, con una línea por epígrafe a su PVP |
| Edita sus preferencias | Sí | Sí |

Es además como funciona en la práctica: el técnico que embarca no debe ver lo que ha costado su
vuelo, y quien lleva compras necesita exactamente eso. Si en algún caso interesa que un viajero vea
importes, se resuelve dándole el rol de administración, no mezclando ambas vistas.

## Detalle que conviene conservar

Las preferencias no son un formulario decorativo: **el asiento guardado se refleja en la tarjeta de
embarque de ejemplo** (ventana → 14A, pasillo → 14C). Es la demostración en diez segundos de por
qué merece la pena rellenarlas, y en una visita comercial se enseña sola.

## Qué haría falta para que fuese real

Por orden, y sin adelantar nada hasta tener clientes que lo usen:

1. **Autenticación.** Nunca a mano. Un proveedor gestionado —Auth0, Clerk, Supabase Auth— resuelve
   contraseñas, segundo factor y recuperación de acceso, que es justo donde se cometen los errores
   caros. Enlace mágico por correo encaja bien aquí: el usuario entra pocas veces al mes.
2. **Modelo de datos.** Empresa → usuarios (con rol) → viajes → documentos → facturas. El rol
   se comprueba **en el servidor**, en cada petición: ocultar una pestaña en el navegador no es
   control de acceso.
3. **Almacenamiento de documentos.** Los PDF van en almacenamiento privado (S3, R2, Supabase
   Storage) y se sirven con URL firmada de caducidad corta. Nunca en una carpeta pública.
4. **Protección de datos.** Aquí hay datos personales y, si se guardan documentos de viaje, alguno
   sensible. Antes de recogerlos: base jurídica, registro de actividades de tratamiento, contrato
   de encargado con cada proveedor, plazos de conservación y borrado, y cifrado en tránsito y en
   reposo. Por eso la maqueta pide la **caducidad** del documento de viaje pero no su número: se
   pide cuando hace falta emitir y no se almacena.
5. **Auditoría.** Quién ha visto o descargado qué y cuándo. Barato de añadir al principio y muy
   caro de reconstruir después.

## La alternativa que hay que valorar antes de programar

Existen plataformas de gestión de viajes corporativos que ya traen perfil del viajero, documentos y
facturación. Si una cubre el caso, **integrarse sale más barato que construir y mantener esto**, y
el tiempo se dedica a vender. Merece una tarde de comparación antes de escribir la primera línea
de backend: lo que de verdad diferencia a Amura es la guardia de madrugada y la reprogramación sin
recargo, no tener portal propio.

Mientras tanto, y con pocos clientes, un correo con los documentos adjuntos y una carpeta
compartida por cuenta cubren el 90 % del valor con el 0 % del coste.
