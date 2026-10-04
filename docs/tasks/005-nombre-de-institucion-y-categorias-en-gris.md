# 005 - Nombre de institucion y categorias en gris

Estado: pendiente

## Objetivo

Mejorar la pagina de Analisis para que la persona entienda mejor que va a configurar y que el reporte salga con sus datos:

1. Un input para escribir el nombre de la institucion, debajo del selector de institucion, que aparezca correctamente en el reporte.
2. Un texto de ayuda junto al input que avise que el nombre aparecera en el encabezado del reporte, junto con la fecha de generacion. La fecha no se pide: "Generated On" se sigue calculando automaticamente.
3. El parrafo introductorio de la pagina debe explicar el campo de nombre y mencionar lo que aparecera en el reporte.
4. Las tarjetas de categorias de emision se muestran siempre, pero en gris mientras no se haya subido el Excel de consumos, para dar contexto de lo que se podra elegir.

## Contexto

- El selector actual (`InstitutionSelect`) se llama "Institution Type" y lista los registros de la tabla `institutions`. Es un tipo de institucion, no el nombre propio. El nombre escrito por la persona es un dato distinto.
- El parrafo introductorio esta en `app/page.tsx`.
- `AnalysisConfigurator` arma la query a `/results` con `institutionId`, anios, meses y `activityIds`.
- `ReportHeader` (`app/components/results/ReportHeader.tsx`) muestra hoy `institution` (que viene del nombre en base de datos) y "Generated On" con la fecha actual calculada en el navegador.
- `EmissionCategories` ya tiene colores propios por categoria (estado seleccionado y no seleccionado). No existe un estado "deshabilitado".
- `DataUpload` sabe si se subio el Excel, pero `page.tsx` y `AnalysisConfigurator` no reciben ese dato.

## Decisiones a tomar

- **Fecha del reporte (resuelto).** No se agrega calendario. "Generated On" queda automatica porque asi la fecha es exacta, y el periodo ya se elige en su propio selector. Para que la persona sepa que aparecera, se avisa con un texto de ayuda.
- **Donde vive el nombre de la institucion.** Mientras no exista login, el nombre se pasa por query string a `/results`. Cuando se implemente el login (tarea futura), se guardaran junto al reporte. Confirmar si el nombre es obligatorio u opcional y que se muestra si queda vacio (por ejemplo, el tipo de institucion).
- **Estado de las categorias sin Excel.** Decidir si, en gris, son solo informativas (no se pueden tildar) o si se pueden tildar pero no habilitan generar. Se propone solo informativas, y que al subir el Excel se activen con sus colores.

## Pasos

1. Disenar el cambio en Stitch si hace falta y guardar capturas en `designs/`.
2. Agregar un input de nombre debajo del selector de institucion, con etiqueta clara y limite de largo.
3. Agregar debajo del input un texto de ayuda que indique que el nombre y la fecha de generacion apareceran en el encabezado del reporte.
4. Elevar a `page.tsx` el estado de "Excel subido" desde `DataUpload` y pasarlo a `AnalysisConfigurator` y `EmissionCategories`.
5. Agregar el estado deshabilitado en `EmissionCategories`: tarjetas visibles en gris, sin interaccion, con un texto que indique que se activan al subir el Excel. Mantener los estados de carga y error actuales.
6. Incluir el nombre en la URL hacia `/results` y leerlos en la pagina de resultados.
7. Actualizar `ReportHeader` para mostrar el nombre escrito por la persona, manteniendo la fecha de generacion automatica.
8. Reescribir el parrafo introductorio de `app/page.tsx` para mencionar el nombre, que aparecera junto a la fecha de generacion en el reporte, y que las categorias se activan al subir el Excel.
9. Si la exportacion a PDF incluye el encabezado, verificar que muestre el nombre y la fecha de generacion.

## Observaciones

- La pagina de resultados no lee `monthFrom` ni `monthTo` de la URL al llamar a `/api/analysis`, asi que el filtro por meses no se aplica en el reporte. Conviene corregirlo cuando se toque ese archivo, o abrir una tarea propia.
- Las categorias se llaman `Electricity`, `Gas` y `Fuel`, mientras que la metodologia separa gasoil y nafta. Se resuelve en la tarea 001, no aca.

## Criterios de aceptacion

- Bajo el selector de institucion hay un input de nombre con un texto de ayuda que explica que aparecera en el reporte.
- El reporte muestra el nombre ingresado y la fecha de generacion automatica.
- Antes de subir el Excel, las tres tarjetas aparecen en gris y no se pueden seleccionar; despues de subirlo se activan con sus colores.
- El parrafo introductorio explica el campo de nombre y lo que aparecera en el reporte.
- El boton de generar sigue deshabilitado hasta tener los datos minimos.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Ninguna tarea previa. Conviene hacerla despues de la 003 si cambian las rutas de las paginas.
