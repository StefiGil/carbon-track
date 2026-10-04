# 011 - Login con Google e interfaz de inicio de sesion

Estado: pendiente

## Objetivo

Permitir iniciar y cerrar sesion con Google mediante Supabase Auth, con una interfaz sencilla. Iniciar sesion es opcional: sin sesion se sigue pudiendo calcular y exportar el reporte.

## Contexto

- El header (`app/components/analysis/Header.tsx`) tiene un boton "Iniciar sesion" sin accion, y el link "Reports" esta comentado hasta que exista autenticacion.
- Supabase guarda los usuarios por su cuenta; la app no necesita su propia tabla de usuarios ni contrasenas.

## Decisiones a tomar

- **Interfaz de login:** pagina propia o ventana modal desde el header. Disenarla en Google Stitch.
- **Manejo de sesion en Next.js:** paquete de Supabase para App Router, con cookies, para que la sesion sea visible tanto en el cliente como en el servidor.
- **Que se muestra con sesion iniciada:** nombre o foto de la persona, cerrar sesion y el link "Reports".
- **Configuracion de Google:** crear las credenciales OAuth y las URLs de retorno (local y produccion). Lo hace Stefania.

## Pasos

1. Disenar la interfaz en Stitch y guardar las capturas en `designs/`.
2. Configurar el proveedor de Google en Supabase y las variables de entorno.
3. Implementar el flujo de inicio y cierre de sesion, incluida la ruta de retorno de OAuth.
4. Mostrar el estado de sesion en el header y habilitar el link "Reports" solo con sesion.
5. Probar el flujo completo, incluido recargar la pagina y cerrar sesion.

## Criterios de aceptacion

- Se puede iniciar y cerrar sesion con Google.
- El header refleja el estado de sesion.
- Las paginas de analisis y resultados funcionan sin sesion.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tarea 010 (Supabase).
