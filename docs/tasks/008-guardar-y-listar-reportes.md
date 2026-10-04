# 008 - Guardar y listar reportes (con sesion iniciada)

Estado: pendiente. Prioridad baja.

## Objetivo

Que una persona con sesion iniciada pueda guardar sus reportes y volver a verlos despues, desde una interfaz sencilla de listado. Quien no inicia sesion sigue pudiendo generar y exportar el reporte a PDF (tarea 007).

## Contexto

- El schema ya tiene un modelo `Report` con institucion, fechas de creacion, rango de anios, CO2 total y una ruta de archivo. No tiene dueno (usuario) ni guarda el nombre escrito por la persona, el periodo por meses ni las categorias elegidas.
- En el header, el link "Reports" esta comentado hasta que exista autenticacion, y el boton "Guardar Reporte" de Resultados no hace nada.
- La app se migrara a Supabase y el login sera con Google, en tareas futuras.

## Decisiones a tomar

- **Que se guarda:** solo los parametros del analisis (para recalcularlo con los factores vigentes), los resultados calculados (fieles a lo que se vio) o el PDF. Se propone guardar parametros y resultados.
- **Modelo de datos:** relacionar `Report` con el usuario y agregar los campos que falten (nombre de la institucion, periodo, categorias).
- **Interfaz de listado:** una pagina simple en `/reports` con la lista de reportes (nombre, periodo, fecha, total), para abrir, volver a descargar el PDF o borrar. Definir el diseno en Stitch.

## Pasos

1. Disenar la pagina de listado en Google Stitch y guardar las capturas en `designs/`.
2. Definir el modelo de datos y la migracion.
3. Crear las rutas de API para guardar, listar, abrir y borrar reportes, restringidas al usuario autenticado.
4. Implementar el boton "Guardar Reporte" (visible solo con sesion iniciada).
5. Construir `/reports` y habilitar el link en el header.
6. Probar que cada persona ve unicamente sus reportes.

## Criterios de aceptacion

- Con sesion iniciada, se puede guardar un reporte y verlo luego en el listado.
- Cada usuario solo accede a sus propios reportes.
- Sin sesion, el boton de guardar no aparece o invita a iniciar sesion, y la exportacion a PDF sigue funcionando.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tarea 007 (reporte y PDF).
- Tareas 010 (Supabase), 011 (login) y 012 (APIs protegidas y autorizacion).
