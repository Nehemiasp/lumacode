import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'proyectos'>;

/** Proyectos publicados, ordenados por `orden`. */
export async function getPublishedProjects(): Promise<Project[]> {
  const all = await getCollection('proyectos', (p) => p.data.publicado);
  return all.sort((a, b) => a.data.orden - b.data.orden);
}
