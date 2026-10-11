import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const bilingual = <T extends z.ZodType>(schema: T) => z.object({ es: schema, en: schema });

export const servicios = ['identidad', 'comunicacion', 'web', 'interfaz'] as const;

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/proyectos' }),
  schema: ({ image }) => {
    const imagen = z.object({
      src: image(),
      alt: bilingual(z.string()),
      pie: bilingual(z.string()).optional(),
    });

    return z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      servicio: z.enum(servicios),
      anio: z.number().int(),
      portada: image(),
      publicado: z.boolean().default(false),
      orden: z.number().default(0),

      titulo: bilingual(z.string()),
      resumen: bilingual(z.string()),
      cliente: bilingual(z.string()),
      duracion: bilingual(z.string()),
      entregables: bilingual(z.array(z.string())),

      reto: bilingual(z.string()),
      retoImagen: imagen.optional(),
      decisiones: z
        .array(
          z.object({
            titulo: bilingual(z.string()),
            porque: bilingual(z.string()),
            imagen: imagen.optional(),
          }),
        )
        .default([]),
      resultados: z
        .array(z.object({ dato: z.string(), descripcion: bilingual(z.string()) }))
        .optional(),
      imagenes: z.array(imagen).default([]),
    });
  },
});

export const collections = { proyectos };
