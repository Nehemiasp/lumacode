import { config } from '../config';

export interface Channel {
  id: 'whatsapp' | 'linkedin' | 'instagram' | 'behance';
  label: string;
  href: string;
}

/** Canales externos con URL configurada. Un canal sin valor no se muestra. */
export function channels(): Channel[] {
  const all: Channel[] = [
    { id: 'whatsapp', label: 'WhatsApp', href: config.whatsapp },
    { id: 'linkedin', label: 'LinkedIn', href: config.linkedin },
    { id: 'instagram', label: 'Instagram', href: config.instagram },
    { id: 'behance', label: 'Behance', href: config.behance },
  ];
  return all.filter((c) => c.href.trim() !== '');
}
