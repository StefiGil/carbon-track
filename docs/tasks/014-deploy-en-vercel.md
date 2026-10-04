# 014 - Deploy en Vercel

Estado: pendiente

## Objetivo

Publicar la aplicacion en Vercel para que este disponible en la nube, conectada a Supabase.

## Contexto

- Next.js 16 se despliega en Vercel sin configuracion especial.
- La base y la autenticacion estan en Supabase (tareas 010 y 011).
- El cliente de Prisma debe generarse durante el build.

## Decisiones a tomar

- **Dominio:** el que da Vercel o uno propio.
- **Entornos:** si se usan previews por rama ademas de produccion.
- **Region:** elegir la del proyecto de Supabase para reducir la latencia.

## Pasos

1. Conectar el repositorio con Vercel.
2. Cargar las variables de entorno (conexion, claves de Supabase, credenciales de Google) y actualizar las URLs de retorno de OAuth.
3. Asegurar que el build genere el cliente de Prisma.
4. Desplegar y probar el flujo completo: guia, analisis con Excel, reporte, PDF, login y reportes guardados.
5. Revisar limites de tamano de archivo y tiempo de ejecucion para la subida del Excel.
6. Actualizar el README con la URL y el procedimiento de despliegue.

## Criterios de aceptacion

- La app funciona en la URL publica de punta a punta.
- No hay secretos en el repositorio.
- El README explica como desplegar y que variables hacen falta.

## Depende de

- Tareas 010, 011, 012 y 013 (idioma).
