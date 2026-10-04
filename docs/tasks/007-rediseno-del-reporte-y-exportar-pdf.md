# 007 - Rediseno del reporte y exportacion a PDF

Estado: pendiente

## Objetivo

1. Redisenar como se ve el reporte en pantalla (pagina de Resultados).
2. Permitir exportarlo a PDF de forma ordenada, con una libreria que respete el diseno y los saltos de pagina.

La exportacion a PDF debe funcionar igual con o sin sesion iniciada: es la funcion principal del reporte. Guardar reportes es otra tarea, de menor prioridad (ver 008).

## Contexto

- La pagina `app/results/page.tsx` arma el reporte con `ReportHeader`, `ExecutiveSummary`, `EmissionsDonutChart`, `EmissionsBarChart` / `EmissionsMonthlyChart` y `EmissionsTable` (en `app/components/results/`).
- Los botones "Guardar Reporte" y "Descargar PDF" existen en la pagina pero no tienen ninguna accion asociada. No hay libreria de PDF instalada.
- Los graficos usan Recharts, que se dibuja como SVG en el navegador; esto condiciona la eleccion de libreria de PDF.
- La pagina mezcla idiomas: el titulo "Visualizaciones" y los botones estan en espanol y el resto en ingles. Definir un idioma unico para la interfaz y el reporte.
- Referencia de diseno previa: `designs/reports-analysis/`.
- Cambios de otras tareas que afectan al reporte:
  - 001: cuatro categorias (gasoil y nafta separados) en resumen, graficos y tabla.
  - 005: nombre de la institucion escrito por la persona, y fecha de generacion automatica.
  - 006: nota en letra pequena con el origen de los factores.
  - 002: aviso de que la herramienta aplica solo a instituciones de Argentina (considerar tambien en el reporte).
- Bug conocido: la pagina no pasa `monthFrom` y `monthTo` a la API, por lo que el filtro por meses no se aplica. Debe estar resuelto antes de dar por bueno el reporte (anotado en 005).

## Decisiones a tomar

- **Libreria de PDF.** Opciones:
  - Vista de impresion con CSS dedicado y `window.print()`: sin dependencias, texto seleccionable, graficos nitidos; menos control y depende del dialogo del navegador.
  - Captura del HTML a imagen y PDF (por ejemplo `html-to-image` con `jsPDF`): fiel a lo que se ve en pantalla; texto no seleccionable y los saltos de pagina requieren cuidado.
  - `@react-pdf/renderer`: PDF real con texto seleccionable y paginacion controlada; el reporte se define como un documento aparte y los graficos hay que reconstruirlos (por ejemplo, como imagenes generadas desde el SVG de Recharts).
  - Generacion en servidor con navegador headless: mas fiel pero pesado para Vercel; descartada salvo que las otras no alcancen.
  Se propone prototipar la opcion elegida con el diseno final antes de implementarla completa.
- **Contenido del PDF.** Si es identico a la pantalla o una version pensada para papel (encabezado con nombre y fecha, resumen, graficos, tabla, nota de fuentes, limitaciones).
- **Idioma** del reporte y de la interfaz.
- **Nombre del archivo** descargado (por ejemplo, nombre de la institucion y periodo).

## Pasos

1. Disenar el reporte en Google Stitch (pantalla y version para PDF) y guardar las capturas en `designs/`. Lo hace Stefania.
2. Resolver el filtro por meses para que el reporte refleje el periodo elegido.
3. Aplicar el nuevo diseno a los componentes de `app/components/results/`, con cuatro categorias, estados de carga y mensajes de error claros.
4. Definir un idioma unico y ajustar los textos.
5. Elegir la libreria con un prototipo corto, y documentar la decision.
6. Implementar la exportacion a PDF con encabezado (nombre de la institucion, periodo, fecha de generacion), resumen, graficos, tabla y nota de fuentes, con saltos de pagina limpios.
7. Conectar el boton "Descargar PDF" y mostrar un estado de progreso mientras se genera.
8. Probar el PDF con un periodo de un anio, con varios anios y con las cuatro categorias, y revisar que ningun grafico o tabla quede cortado.
9. Decidir que hacer con el boton "Guardar Reporte" hasta que exista login (ocultarlo o deshabilitado con aviso). Se implementa en la 008.

## Criterios de aceptacion

- La pagina de Resultados sigue el diseno de Stitch.
- "Descargar PDF" genera un archivo ordenado, legible y con los mismos datos que la pantalla, sin necesidad de iniciar sesion.
- El PDF incluye nombre de la institucion, periodo, fecha de generacion y fuentes de los factores.
- Ningun grafico ni fila de tabla queda cortado entre paginas.
- El reporte muestra las cuatro categorias y respeta el filtro por meses.
- La interfaz usa un solo idioma.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tarea 001 (cuatro categorias) y tarea 005 (nombre de la institucion).
- Conviene tener 006 (fuentes de los factores) para incluir la nota en el PDF.

## Relacion con otras tareas

- La 008 (guardar reportes) reutiliza el mismo reporte y se hace despues.
