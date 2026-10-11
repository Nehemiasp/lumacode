import es from './es.json';
import en from './en.json';

export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'es';

const dictionaries = { es, en } as const;
export type Key = keyof typeof es;

/** Devuelve el traductor de un idioma. `vars` reemplaza {marcadores}. */
export function useT(lang: Lang) {
  const dict = dictionaries[lang] as Record<string, string>;
  const t = (key: Key, vars: Record<string, string | number> = {}) => {
    let text = dict[key];
    if (text === undefined) throw new Error(`Falta la clave i18n "${key}" (${lang})`);
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(value));
    return text;
  };
  /** Separa un texto compuesto "A · B · C" en partes. */
  const parts = (key: Key) => t(key).split(' · ').map((p) => p.trim());
  return { t, parts };
}

export type RouteName = 'home' | 'services' | 'work' | 'contact' | 'thanks';

const routes: Record<RouteName, Record<Lang, string>> = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  work: { es: '/trabajo/', en: '/en/work/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  thanks: { es: '/contacto/gracias/', en: '/en/contact/thanks/' },
};

export const routeNames = Object.keys(routes) as RouteName[];

export const route = (name: RouteName, lang: Lang) => routes[name][lang];
export const caseUrl = (slug: string, lang: Lang) => `${routes.work[lang]}${slug}/`;
/** Ancla dentro del inicio del idioma dado, por ejemplo `/en/#proceso`. */
export const homeAnchor = (id: string, lang: Lang) => `${routes.home[lang]}#${id}`;

/** URL absoluta a partir de una ruta del sitio. */
export const absoluteUrl = (path: string, site: string | URL) => new URL(path, site).href;

/** Idioma de una ruta a partir de su ruta (sirve para el 404). */
export const langFromPath = (path: string): Lang => (path.startsWith('/en/') || path === '/en' ? 'en' : 'es');
