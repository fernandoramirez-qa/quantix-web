// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio corporativo de Quantix Analitic — salida estática (sin adapter).
// El deploy lo hace Azure Static Web Apps a partir de dist/.
export default defineConfig({
  // Host canónico real (el apex hace forwarding → www con SSL).
  site: 'https://www.quantixanalitic.com',
  output: 'static',
  trailingSlash: 'ignore',
  // Genera sitemap-index.xml + sitemap-0.xml con las URLs de ambos idiomas (/ y /es/).
  integrations: [sitemap()],
  // i18n nativo: inglés en / (sin prefijo), español en /es/.
  // Para sumar "pt" después: añadir 'pt' a locales y crear src/pages/pt/ (sin refactor).
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
