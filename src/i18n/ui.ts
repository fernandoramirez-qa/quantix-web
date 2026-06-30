// Helper i18n para el sitio Astro estático.
// Inglés es el idioma por defecto y vive en / (sin prefijo); español en /es/.
// Para sumar "pt": crear pt.json, añadirlo a `dictionaries` y a `languages`,
// y duplicar src/pages/es → src/pages/pt cambiando los imports. Sin más refactor.
import en from './en.json';
import es from './es.json';

export const languages = { en: 'EN', es: 'ES' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const dictionaries: Record<Lang, Record<string, string>> = { en, es };

/** Devuelve el idioma activo a partir del primer segmento de la ruta. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return seg in languages && seg !== defaultLang ? (seg as Lang) : defaultLang;
}

/** Traduce una clave; cae al idioma por defecto y, si no, a la propia clave. */
export function t(key: string, lang: Lang): string {
  return dictionaries[lang]?.[key] ?? dictionaries[defaultLang][key] ?? key;
}

/**
 * Construye la ruta de un slug en un idioma dado.
 * slug '' → home. Inglés sin prefijo; los demás idiomas con /<lang>/.
 */
export function localizedPath(slug: string, lang: Lang): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (lang === defaultLang) return clean ? `/${clean}` : '/';
  return clean ? `/${lang}/${clean}` : `/${lang}/`;
}
