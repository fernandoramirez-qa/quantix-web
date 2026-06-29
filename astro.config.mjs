// @ts-check
import { defineConfig } from 'astro/config';

// Sitio corporativo de Quantix Analytic — salida estática (sin adapter).
// El deploy lo hace Azure Static Web Apps a partir de dist/.
export default defineConfig({
  site: 'https://quantixanalitic.com',
  output: 'static',
  trailingSlash: 'ignore',
});
