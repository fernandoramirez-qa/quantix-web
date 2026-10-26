# 2026-10-26 — Rediseño del sitio corporativo

## Qué pidió Jose

El sitio se veía demasiado genérico. Pidió un diseño limpio y en blanco, sin tantos fondos ni sombras,
con mensaje directo, y que mostrara cada producto. Se iteró sobre un boceto hasta que lo aprobó:

- Título del inicio: «Inteligencia artificial que conoce su negocio.» y debajo
  «Su empresa ya tiene las respuestas. Ahora puede preguntarlas.»
- Al lado del título, la pantalla real de Consumo de riego, completa y sin distorsión.
- Un bloque propio para Qpasa, con las pantallas reales de la app.
- MIPE con las dos pantallas reales de la app de campo.
- Las páginas de producto con el mismo estilo y el mismo contenido de antes.

## Clasificación

NUNCA EXISTIÓ (diseño nuevo). No hay cambios de modelo de datos.

## Qué se cambió

- `src/styles/global.css`: tokens nuevos, tipografía Bricolage Grotesque autoalojada
  (`@fontsource-variable/bricolage-grotesque`), sin sombras ni fondos de color; las clases de las
  páginas internas (Servicios, Nosotros, Contacto, Privacidad) quedan con el estilo nuevo.
- `src/layouts/Base.astro`: se quitó la franja superior; nav con enlace a Qpasa; pie sin el punto suelto.
- `src/components/pages/Home.astro`: inicio nuevo.
- `src/components/pages/ViewQ.astro`, `QuantixFlow.astro`, `QJuridico.astro`, `QLanza.astro`,
  `Qlinic.astro`: mismo contenido, estilo nuevo.
- `src/i18n/es.json`, `src/i18n/en.json`: textos nuevos (`hx.*`, `cta.*`, `viewq.*`, `nav.label`).
- `src/i18n/ui.ts`: ayudas `plain`, `splitTitle` y `kicker`.
- `public/assets/*.webp`: seis capturas reales.

## Dónde se ve

- Inicio: `https://quantixanalitic.com/es/` (y `/` en inglés).
- Productos: `/es/viewq`, `/es/quantix-flow`, `/es/qjuridico`, `/es/qlanza`, `/es/qlinic`.

## Pendiente

- Las capturas de MIPE tienen errores de texto de la app («UNIDADS», «los unidades», «seccións»,
  «Lote Lote 1», voseo). Se corrigen en viewQ y se reemplazan las capturas.
- Landings de QLanza y Quantix Flow con el mismo estilo (otros repos).

## SHA del merge a main

Se completa al publicar.
