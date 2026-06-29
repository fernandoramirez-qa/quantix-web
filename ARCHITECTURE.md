# ARCHITECTURE — quantix-web

> Ley del repositorio. Este documento manda. Si un cambio contradice estas reglas,
> primero se actualiza este archivo (con justificación) y luego se hace el cambio.

`quantix-web` es el **sitio corporativo de Quantix Analytic** (`quantixanalitic.com`),
desplegado como **Azure Static Web App independiente** — separada de viewQ y del resto de
productos. No comparte código, build ni dominio de despliegue con esos repos.

## Stack

- **Astro** con **salida estática** (`output: 'static'`, sin adapter). El build genera `dist/`.
- **Multipágina** (una ruta = un archivo en `src/pages/`). Sin framework de UI, sin SPA.
- **Español únicamente** por ahora. Sin i18n.
- Sin dependencias de runtime más allá de Astro. CSS plano en `src/styles/global.css`.

## Estructura de carpetas

```
quantix-web/
├── ARCHITECTURE.md                 # este archivo (ley del repo)
├── astro.config.mjs                # site, output static
├── package.json
├── public/
│   ├── staticwebapp.config.json    # redirects SEO + 404 + navigationFallback (Azure SWA)
│   └── assets/                      # imágenes reales (viewq-dashboard.png, qpasa-phone.png, ...)
└── src/
    ├── layouts/
    │   └── Base.astro              # ribbon AgriFoodTech + <header> nav + <footer>. Recibe `title`.
    ├── styles/
    │   └── global.css              # estilos compartidos (idénticos en todas las páginas)
    └── pages/
        ├── index.astro             # Inicio
        ├── viewq.astro             # viewQ (canonical → viewq.quantixanalitic.com)
        ├── servicios.astro
        ├── quantix-flow.astro
        ├── qjuridico.astro
        ├── qlinic.astro
        ├── nosotros.astro
        ├── contacto.astro
        └── 404.astro               # se construye a /404.html
```

## Convención de layout

- **Un único layout compartido**: `src/layouts/Base.astro`. Contiene el **ribbon AgriFoodTech**,
  el `<header>` de navegación y el `<footer>`. Recibe `title` (y meta opcional) por props.
- **Prohibido duplicar** ribbon / nav / footer dentro de las páginas. Cada página solo aporta su
  contenido propio dentro del `<slot />` del layout.
- **Estilos compartidos** viven en `src/styles/global.css` (importados una sola vez desde `Base.astro`).
  No se repiten bloques `<style>` por página.

## Enlaces y datos de marca (invariantes)

- **Rutas internas limpias**: `/viewq`, `/servicios`, `/quantix-flow`, `/qjuridico`, `/qlinic`,
  `/nosotros`, `/contacto`. Inicio es `/`.
- Botón "Ver la plataforma completa" (página viewQ) → `https://viewq.quantixanalitic.com`.
- Página viewQ lleva `<link rel="canonical" href="https://viewq.quantixanalitic.com">` para no
  competir en SEO con la landing del producto.
- **Teléfono único** en todo el sitio: **+57 316 474 9204** · WhatsApp `https://wa.me/573164749204`.
- **Razón social** (footer legal): **Quantix Analitic S.A.S.** · **Marca visible**: **Quantix Analytic**.
- **AgriFoodTech** = posicionamiento de **categoría**. No usar logos ni nombres de CCB / ANDI / UE,
  ni afirmar selección o participación en ningún programa.

## Imágenes

- Las imágenes van en `public/assets/` y se referencian con rutas absolutas, p. ej.
  `<img src="/assets/viewq-dashboard.png">`. No se embeben en base64.
- Solo **Inicio** y la página **viewQ** usan imágenes (`viewq-dashboard.png`, `qpasa-phone.png`).

## Despliegue (regla de deploy)

- Flujo de ramas: **`develop` → `main` con `git merge --ff-only`** (fast-forward, historia lineal).
  Nada llega a `main` que no haya pasado por `develop`.
- El **deploy lo dispara una GitHub Action de Azure Static Web Apps** al hacer push a `main`
  (workflow `azure-static-web-apps-*.yml` que Azure genera al conectar el repo).
- Build preset: **Astro** · App location: `/` · Api location: *(vacío)* · Output location: `dist`.
- **No se hace `git push` ni deploy sin autorización explícita de Jose.** Primero `npm run build`
  OK en local; el push a `main` solo con luz verde.

## Configuración de Azure SWA (referencia)

- Nombre sugerido: `swa-quantix-web` · Plan: **Free** · Preset: **Astro**.
- `staticwebapp.config.json` se sirve desde `dist/` (Astro copia `public/` tal cual): incluye
  redirects 301 de SEO (`/desarrollo-software` → `/servicios`, `/insights*` → `/`) y el `404`.
- Dominios objetivo: `quantixanalitic.com` + `www.quantixanalitic.com`. El subdominio
  `viewq.quantixanalitic.com` (otra SWA) y el correo Microsoft 365 **no se tocan**.
