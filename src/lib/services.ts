import type { Key } from '../i18n';

export type ServiceId = 'identidad' | 'comunicacion' | 'web' | 'interfaz';

/** Claves i18n de cada servicio (los cuatro del estudio). */
export const serviceKeys = {
  identidad: { slug: 'identity', filter: 'work.filter.identity' },
  comunicacion: { slug: 'comms', filter: 'work.filter.comms' },
  web: { slug: 'web', filter: 'work.filter.web' },
  interfaz: { slug: 'ui', filter: 'work.filter.ui' },
} as const satisfies Record<ServiceId, { slug: string; filter: Key }>;

export const serviceIds = Object.keys(serviceKeys) as ServiceId[];

export const serviceName = (id: ServiceId) => `services.${serviceKeys[id].slug}.name` as Key;
