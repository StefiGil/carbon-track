# 012 - APIs protegidas, autorizacion y relacion con el usuario

Estado: pendiente

## Objetivo

Que las rutas de la API que manejan datos de una persona (reportes guardados) comprueben quien es el usuario y que cada uno acceda solo a lo suyo. Incluye agregar a la base la relacion entre los datos y el usuario.

## Contexto

- Autenticacion es saber quien es la persona (tarea 011). Autorizacion es decidir que puede ver o modificar.
- Hoy ninguna ruta comprueba usuario, y el modelo `Report` no tiene dueno.
- Con Prisma, la conexion a Supabase no pasa por las reglas de seguridad por fila (RLS) de Supabase, por lo que la autorizacion debe hacerse en el codigo de las rutas.
- No hace falta una tabla de usuarios propia: se guarda el identificador de usuario de Supabase en las tablas que lo necesiten. Si se quieren datos extra de la persona, se agrega una tabla de perfil pequena.

## Decisiones a tomar

- **Modelo de datos:** agregar `userId` a `Report` y los campos que falten (ver tarea 008); decidir si se necesita tabla de perfil.
- **Donde se verifica la sesion:** en cada ruta, con una funcion comun que devuelva el usuario o responda 401.
- **Politica:** cada usuario solo lista, abre y borra sus propios reportes; las rutas publicas (factores, actividades, calculo) siguen abiertas.
- **Respuesta ante un reporte ajeno:** 404 o 403.
- **RLS como segunda capa:** valorar activarla en la base aunque la app no dependa de ella.

## Pasos

1. Definir el modelo de datos y crear la migracion con la relacion al usuario.
2. Crear una funcion comun que lea la sesion en el servidor y rechace pedidos sin sesion.
3. Proteger las rutas de reportes (guardar, listar, abrir, borrar) y filtrar siempre por el usuario autenticado.
4. Mantener abiertas las rutas del modo anonimo.
5. Probar con dos usuarios que ninguno accede a los reportes del otro, y que sin sesion las rutas protegidas responden 401.

## Criterios de aceptacion

- Las rutas de reportes devuelven 401 sin sesion.
- Un usuario no puede ver ni modificar reportes de otro, probado con dos cuentas.
- Las rutas publicas siguen funcionando sin sesion.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tarea 011 (login).

## Relacion con otras tareas

- Habilita la 008 (guardar y listar reportes).
