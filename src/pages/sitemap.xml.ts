import type { APIRoute } from 'astro';
import { absoluteUrl, caseUrl, route, type RouteName } from '../i18n';
import { getPublishedProjects } from '../lib/projects';

// Páginas indexables (la de gracias va con noindex y no entra). Cada URL declara su par en el otro idioma.
const pages: RouteName[] = ['home', 'services', 'work', 'contact'];

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => absoluteUrl(path, site!);
  const entries: { es: string; en: string }[] = pages.map((name) => ({ es: route(name, 'es'), en: route(name, 'en') }));
  for (const project of await getPublishedProjects()) {
    entries.push({ es: caseUrl(project.data.slug, 'es'), en: caseUrl(project.data.slug, 'en') });
  }

  const urls = entries.flatMap((entry) =>
    (['es', 'en'] as const).map(
      (lang) => `  <url>
    <loc>${abs(entry[lang])}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${abs(entry.es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(entry.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(entry.es)}"/>
  </url>`,
    ),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
