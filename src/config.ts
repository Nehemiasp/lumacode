// Datos configurables del sitio. Un enlace o dato solo se muestra si tiene valor.
export const config = {
  siteUrl: 'https://lumacodestudio.com',
  name: 'Lumacode Studio',
  email: 'hola@lumacodestudio.com',

  // Canales (vacío = no se muestra)
  whatsapp: '',
  linkedin: '',
  instagram: '',
  behance: '',

  // Precios de paquetes (vacío = "Cotización")
  precios: {
    marca: '',
    presencia: '',
    sitio: '',
    producto: '',
  },

  // Tiempo de respuesta, por idioma (vacío = se omite la frase)
  tiempoRespuesta: { es: '', en: '' },

  // Endpoint del servicio de formularios (variable de entorno)
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  // Solo si el servicio lo pide (por ejemplo Web3Forms)
  formAccessKey: import.meta.env.PUBLIC_FORM_ACCESS_KEY ?? '',
} as const;

export type PackageId = keyof typeof config.precios;
