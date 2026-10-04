# 009 - Calculo sin guardar datos (modo anonimo)

Estado: pendiente

## Objetivo

Que cualquier persona pueda subir su Excel, configurar el analisis y ver el reporte sin iniciar sesion y sin que sus datos se guarden en la base compartida. Los datos de consumo solo se guardan, mas adelante, cuando alguien con sesion iniciada decide guardar un reporte (tarea 008).

## Contexto

- Hoy `POST /api/upload/consumption` borra e inserta consumos en la base, asociados a un registro de `institutions`. Con varias personas usando la app a la vez se pisarian los datos (ya lo advierte `CLAUDE.md`).
- `GET /api/analysis` lee los consumos guardados y los multiplica por el factor del anio y la actividad. `GET /api/consumption/years` calcula los anios disponibles desde la base.
- La pagina de Resultados vuelve a consultar la API usando parametros en la URL, por lo que depende de que los consumos esten guardados.
- La tabla `institutions` representa un tipo de institucion elegido de una lista; con el nombre escrito por la persona (tarea 005) y el modo anonimo, su rol cambia.
- Los factores, actividades y el calculo siguen viniendo de la base; eso no cambia.

## Decisiones a tomar

- **Donde se procesa el Excel:** en el navegador (lectura con `xlsx` y calculo contra los factores que devuelve la API) o en el servidor en una sola llamada que recibe el archivo y devuelve el resultado sin persistir. Se propone el servidor, que reutiliza la logica actual y mantiene los factores fuera del cliente.
- **Como llega el resultado a la pagina de Resultados:** hoy por URL y nueva consulta. Sin persistencia hay que pasar el resultado por estado de la aplicacion o `sessionStorage`. Definir que pasa si la persona recarga la pagina.
- **Anios y meses disponibles:** deben salir del archivo subido y no de la base.
- **Rol de `institutions`:** mantener como lista de tipos de institucion, o eliminarla si el nombre escrito la reemplaza.
- **Datos existentes:** que se hace con los consumos ya guardados en la base actual (probablemente borrarlos).

## Pasos

1. Elegir donde se procesa el Excel y como se entrega el resultado a Resultados.
2. Separar el calculo de `app/api/analysis/route.ts` en una funcion reutilizable que reciba consumos en memoria.
3. Crear la ruta que recibe el Excel y los parametros del analisis, valida las columnas (ver tarea 001) y devuelve el resultado sin escribir en la base.
4. Obtener anios y meses disponibles a partir del archivo subido.
5. Adaptar la pagina de Analisis y la de Resultados al nuevo flujo, con estados de carga y errores claros.
6. Retirar la logica de escritura de consumos y limpiar los datos de prueba.
7. Probar con dos sesiones simultaneas que no se afectan entre si.

## Criterios de aceptacion

- Subir un Excel y generar el reporte no escribe en la tabla `consumptions`.
- Dos personas usando la app a la vez no se ven ni se pisan los datos.
- Los anios y meses disponibles corresponden al archivo subido.
- El reporte es el mismo que con el flujo anterior para los mismos datos.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tareas 001 (columnas del Excel) y 006 (factores reales).

## Relacion con otras tareas

- Es requisito de la 005 (estado "Excel subido") y de la 007 (reporte).
- Debe hacerse antes de la migracion a Supabase, para no migrar datos de consumo que ya no se guardan.
