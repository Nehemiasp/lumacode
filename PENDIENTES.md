# Pendientes para Nehemias

Cosas que el sitio no puede resolver solo. Nada de esto aparece como marcador en el sitio publicado.

- [ ] Registrar `lumacodestudio.com` y `lumacode.studio`. Conectar el principal en Vercel; `lumacode.studio` redirige (301) al principal mediante `vercel.json`, solo hay que añadirlo como dominio del proyecto.
- [ ] Crear `hola@lumacodestudio.com` y `nehemias@lumacodestudio.com`.
- [ ] Reservar `@lumacode.studio` o `@lumacodestudio` en Instagram, LinkedIn y Behance.
- [ ] Elegir el servicio del formulario (Formspree, Web3Forms u otro) y poner su URL en `PUBLIC_FORM_ENDPOINT` (en Vercel y en `.env`). Si el servicio pide clave de acceso, usar `PUBLIC_FORM_ACCESS_KEY`. Sin endpoint, el formulario muestra el mensaje de error con el correo directo. Configurar en el servicio la redirección a `/contacto/gracias/` para el envío sin JavaScript.
- [ ] Definir los precios de los paquetes (o dejarlos en "Cotización") y el tiempo de respuesta, en `src/config.ts`.
- [ ] Cargar los primeros 2 a 4 proyectos con imágenes reales y sus decisiones de diseño (ver README, sección "Cargar un proyecto").
- [ ] Conseguir las URLs reales de WhatsApp Business, LinkedIn, Instagram y Behance y ponerlas en `src/config.ts`.
- [ ] Cuando se definan los tiempos de entrega, añadir semanas concretas a la respuesta de la pregunta frecuente "¿Cuánto tarda un proyecto?" (`faq.1.a` en `src/i18n/*.json`).
