# 2026-11-25 — Enlace a la página de LinkedIn de Quantix Analitic

## Qué pidió Jose

Agregar la página de LinkedIn de Quantix en el sitio web.

**Clasificación:** NUNCA EXISTIÓ. El sitio no tenía ningún enlace a redes sociales.

## Qué URL se usa

`https://www.linkedin.com/company/136165796/`: la página pública de la empresa. Las dos direcciones que pasó Jose no sirven para un visitante:

- `.../company/136165796/admin/dashboard/` es el panel de administración. Solo entran los administradores de la página.
- `.../search/results/all/?keywords=Quantix%20Analitic...` es una búsqueda de LinkedIn, no la página.

Si más adelante la página tiene URL personalizada (por ejemplo `/company/quantix-analitic/`), se cambia en los dos puntos de abajo. La URL con el número sigue funcionando y LinkedIn la redirige.

## Qué se cambió

| Archivo | Cambio |
|---|---|
| `src/layouts/Base.astro` | Pie de página, columna «Contacto»: enlace «LinkedIn» debajo de WhatsApp. Se abre en pestaña nueva |
| `src/layouts/Base.astro` | Esquema `Organization` (JSON-LD): `sameAs` con la URL de LinkedIn, para que Google asocie la página con la empresa |

**Ruta en pantalla:** todas las páginas de quantixanalitic.com (ES y EN), en el pie, columna «Contacto» / «Contact», tercer enlace, debajo de WhatsApp.

## SHA del merge a main

Pendiente (PR abierto).
