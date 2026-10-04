# 013 - Selector de idioma (espanol e ingles)

Estado: pendiente

## Objetivo

Que la aplicacion se pueda usar en espanol e ingles, con un selector de idioma, antes de publicarla. La interfaz, la Guia, About y el reporte (incluido el PDF) deben respetar el idioma elegido.

## Contexto

- Hoy la interfaz esta en ingles, con algunos textos sueltos en espanol (por ejemplo "Visualizaciones" y los botones de Resultados). La tarea 007 pide unificar el idioma del reporte.
- Los textos estan escritos directamente en los componentes. No hay libreria de traduccion instalada.
- Las convenciones del proyecto: codigo y comentarios en ingles, y los datos (etiquetas, listas) vienen de la API. Los nombres de actividades (`Electricity`, `Gas`, `Diesel`, `Gasoline`) vienen de la base y tambien habria que traducirlos.
- La herramienta aplica solo a instituciones de Argentina, por lo que el espanol es probablemente el idioma por defecto.

## Libreria elegida: next-intl

Es la que mejor encaja con este proyecto:
- Esta pensada para el App Router de Next.js y para componentes de servidor y de cliente.
- Permite elegir el idioma con o sin prefijo en la URL (`/es`, `/en`), y guardar la preferencia.
- Incluye formato de numeros y fechas segun el idioma, util para las cifras de CO2e y para "Generated On".
- Los textos viven en archivos de mensajes por idioma (`messages/es.json` y `messages/en.json`).

Alternativas consideradas: `react-i18next` (muy usada, pero requiere mas configuracion con App Router y componentes de servidor) y `Lingui` (buena, con menos adopcion en Next.js). Verificar la compatibilidad de la version de next-intl con Next.js 16 al instalarla.

## Decisiones a tomar

- **Idioma por defecto:** espanol o el del navegador.
- **Rutas con prefijo de idioma o sin prefijo.** Sin prefijo evita cambiar todas las URLs y los enlaces; con prefijo es mejor para compartir links en un idioma concreto. Se propone sin prefijo, con la preferencia guardada en una cookie.
- **Traduccion de los datos de la base:** los nombres y descripciones de actividades. Opciones: guardar las traducciones en la base (por ejemplo, un campo por idioma) o mapear una clave estable de actividad a un texto en los archivos de mensajes. Se propone la clave estable.
- **Contenido largo (About y Guia):** si se traduce con archivos de mensajes o con una version de cada pagina por idioma.
- **Reporte y PDF:** deben salir en el idioma elegido al generarlos.
- **Quien traduce los textos:** Stefania revisa las traducciones al espanol y al ingles.

## Pasos

1. Instalar y configurar next-intl, y definir el idioma por defecto y la forma de guardarlo.
2. Crear los archivos de mensajes `es` y `en` y extraer los textos de todos los componentes y paginas (Analisis, Resultados, Guia, About, header, errores y estados de carga).
3. Resolver la traduccion de los nombres de actividades segun lo decidido.
4. Agregar el selector de idioma al header.
5. Aplicar el formato de numeros y fechas segun el idioma.
6. Traducir el reporte y el PDF, y la nota de fuentes de los factores.
7. Revisar los mensajes de error de las APIs que se muestran a la persona.
8. Probar el flujo completo en ambos idiomas y verificar que no queden textos sin traducir.
9. Actualizar `CLAUDE.md` y la documentacion con la regla: ningun texto visible se escribe directo en los componentes.

## Criterios de aceptacion

- El selector cambia el idioma de toda la aplicacion y se mantiene al recargar.
- No quedan textos fijos en un solo idioma en paginas, reporte ni PDF.
- Los numeros y fechas se muestran con el formato del idioma elegido.
- Los nombres de actividades aparecen traducidos.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Conviene hacerla despues de las tareas que modifican los textos de la interfaz (001, 002, 003, 005, 007), para traducir una sola vez.

## Relacion con otras tareas

- Es requisito del deploy (014).
