# 2026-11-17 — Logo nuevo de Quantix Analitic y favicon

## Qué pidió Jose

Un logo propio para Quantix Analitic, la marca madre de QPulso y Qpasa. Hasta ahora el sistema de diseño Quantix decía «falta el logo de Quantix Analitic». Jose eligió la **opción A, «Anillo y trazo»**, entre tres propuestas (lienzo «Logo Quantix Analitic»). Pidió ponerla en el sitio, con el favicon nuevo.

**Clasificación:** NUNCA EXISTIÓ. El sitio usaba un isotipo anterior.

## El logo

- **Símbolo:** una Q hecha de un anillo abierto en azul noche (`#0d1a2d`) y una cola en trazo turquesa (`#1f7d77`) que sale hacia abajo a la derecha. Sobre fondo oscuro: anillo blanco y cola `#2fd1c5`.
- **Logotipo:** «Quantix» en Bricolage Grotesque 700 y «Analitic» en 400, color `#4a5a6b`.
- **No se ata a un producto.** El pulso queda reservado para el logo de QPulso.

## Qué se cambió

| Archivo | Cambio |
|---|---|
| `public/assets/quantix-simbolo.svg` | Nuevo: el símbolo en vector |
| `public/assets/quantix-isotype.png` | Reemplazado por el símbolo nuevo (256 px, fondo transparente) |
| `public/favicon.svg` | Nuevo: el símbolo sobre ficha blanca redondeada, para que se vea en pestañas claras y oscuras |
| `public/favicon.ico`, `favicon-16x16.png`, `-32x32`, `-48x48`, `-192x192`, `-512x512` | Regenerados desde `favicon.svg` |
| `public/apple-touch-icon.png` | Regenerado (180 px, fondo blanco) |
| `src/layouts/Base.astro` | `<link rel="icon" type="image/svg+xml">` nuevo; el encabezado y el pie usan `quantix-simbolo.svg` |

**Ruta en pantalla:** todas las páginas de quantixanalitic.com. El logo está arriba a la izquierda del encabezado y en el pie, y el favicon en la pestaña del navegador.

**Segundo cambio (PR aparte, el mismo día):** `public/og-image.png`, la imagen que aparece al compartir un enlace del sitio (WhatsApp, LinkedIn, Facebook), queda con el logo nuevo: fondo azul noche, «Datos e IA para decidir mejor.», QPulso y Qpasa (1200×630). Es la misma pieza que la portada de Facebook.

## SHA del merge a main

`837bc93` (PR #2, logo y favicon). La imagen para compartir va en el PR siguiente.
