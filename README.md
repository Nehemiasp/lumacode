# Lumacode Studio

Sitio web de Lumacode Studio. Astro (estático), bilingüe (español por defecto, inglés en `/en/`), oscuro por defecto.

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Estructura

| Ruta | Qué hay |
| --- | --- |
| `src/i18n/es.json`, `en.json` | Todos los textos. Ninguno va escrito en los componentes. |
| `src/i18n/index.ts` | Traductor `useT(lang)` y mapa de rutas por idioma. |
| `src/config.ts` | Correo, redes, precios de paquetes, tiempo de respuesta, endpoint del formulario. |
| `src/styles/tokens.css` | Única fuente de colores, espacios, radios y tamaños. |
| `src/styles/global.css` | Tipografía, grilla, botones, utilidades. |
| `src/components/` | Componentes (Header, Footer, Screen, ProjectCard, ContactForm…). |
| `src/views/` | Una vista por página; `src/pages/` solo las monta en cada idioma. |
| `src/content/proyectos/` | Colección de proyectos (JSON). |
| `public/brand/`, `brand/` | Kit de logo (SVG y PNG). El logo se usa siempre como archivo. |
| `public/og/` | Imágenes Open Graph; se regeneran con `node scripts/generate-og.mjs`. |

## Cargar un proyecto

Crea un `.json` en `src/content/proyectos/` (puedes agrupar sus imágenes en una carpeta junto a él). Campos:

```jsonc
{
  "slug": "nombre-del-proyecto",
  "servicio": "identidad",            // identidad | comunicacion | web | interfaz
  "anio": 2025,
  "portada": "./imagenes/nombre/portada.webp",
  "publicado": true,
  "orden": 1,
  "titulo":      { "es": "…", "en": "…" },
  "resumen":     { "es": "…", "en": "…" },
  "cliente":     { "es": "…", "en": "…" },
  "duracion":    { "es": "…", "en": "…" },
  "entregables": { "es": ["…"], "en": ["…"] },
  "reto":        { "es": "…", "en": "…" },
  "retoImagen":  { "src": "./…", "alt": { "es": "…", "en": "…" }, "pie": { "es": "…", "en": "…" } },
  "decisiones": [
    { "titulo": { "es": "…", "en": "…" }, "porque": { "es": "…", "en": "…" },
      "imagen": { "src": "./…", "alt": { "es": "…", "en": "…" } } }
  ],
  "resultados": [ { "dato": "…", "descripcion": { "es": "…", "en": "…" } } ],  // opcional
  "imagenes": []
}
```

Sin proyectos publicados, Inicio y Trabajo muestran el estado vacío (sin tarjetas). La sección "Resultado" solo aparece si hay `resultados`.

## Formulario

Define `PUBLIC_FORM_ENDPOINT` (ver `.env.example`). El envío con JavaScript hace `POST` JSON y redirige a `/contacto/gracias/`. Incluye campo trampa contra spam.

## Despliegue

Vercel (`vercel.json` incluye redirección de `lumacode.studio` al dominio principal, cabeceras y caché). Pendientes de configuración en `PENDIENTES.md`.
