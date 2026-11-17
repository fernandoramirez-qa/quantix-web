# 2026-11-17 — Inicio sin viewQ y con QPulso

## Qué pidió Jose

Quitar viewQ de la página de Quantix y poner QPulso en su lugar. viewQ va a ser una compañía independiente, y Quantix queda como la marca madre de QPulso, Qpasa y el resto del portafolio. Jose aprobó el mockup «quantixanalitic.com sin viewQ, con QPulso» después de dos ajustes: una gráfica principal con más fuerza («el que mide el pulso de un mercado») y tres pantallas de Qpasa en lugar de las capturas de viewQ.

**Clasificación:** FALTA. El inicio existía, pero giraba en torno a viewQ.

## Qué se cambió

| Archivo | Cambio |
|---|---|
| `src/components/pages/Home.astro` | **Imagen principal:** la captura de viewQ (MIRFE) se reemplaza por la tarjeta «El pulso de su mercado», una ilustración sin cifras: el pulso de su marca frente a 3 rivales, tres etiquetas de lectura y la burbuja de Qpasa. **Índice de productos:** viewQ sale y QPulso entra de primero. **Sección `#viewq`:** pasa a ser `#qpulso`, con texto general de inteligencia de mercado y competencia (no solo carros), 4 viñetas, 4 tarjetas de preguntas y el botón «Solicitar una demo de QPulso» hacia contacto. **Qpasa:** las 3 capturas de viewQ (voz, aguacate y flores) se reemplazan por 3 teléfonos ilustrados en marcado (voz, lanzamiento y PDF) |
| `src/layouts/Base.astro` | En el pie, el enlace a viewQ pasa a QPulso (`/#qpulso`). Cambia la descripción de la organización en Schema.org |
| `src/i18n/es.json`, `en.json` | Textos nuevos `hx.idx.qp`, `hx.pulse.*`, `hx.qps.*`, `hx.ph.*`. Se actualizan `hx.qp.desc` (sin viewQ), `footer.tagline` («Datos e IA para decidir mejor.»), `contact.head.lead` y `seo.home.*` |
| `src/styles/global.css` | Estilos `.pulso*`, `.qcards`, `.qphones`, `.qphone` y `.qp-*` |

**No se tocó:** la página `/viewq` (y `/es/viewq`). Sigue publicada para no romper los enlaces que ya circulan, pero sale del inicio y del pie. Cuando viewQ tenga su propio sitio, se redirige allá. Las imágenes de viewQ siguen en `public/assets/`.

**Ruta en pantalla:** https://www.quantixanalitic.com/es/ (y `/` en inglés):
- arriba, la tarjeta azul «El pulso de su mercado», a la derecha del título;
- debajo, el índice con QPulso de primero;
- después, la sección QPulso y la sección Qpasa con los 3 teléfonos;
- en el pie, «Datos e IA para decidir mejor.» y QPulso en la lista de productos.

## SHA del merge a main

(se completa después del merge)
