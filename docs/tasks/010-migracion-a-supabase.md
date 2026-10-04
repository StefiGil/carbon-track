# 010 - Migracion de la base de datos a Supabase

Estado: pendiente

## Objetivo

Pasar la base de PostgreSQL local (Docker) a Supabase, de modo que la app pueda funcionar en la nube, y que la base se pueda reconstruir desde el repositorio.

## Contexto

- Hoy `DATABASE_URL` apunta a `localhost:5432` (contenedor `carbon-track-db` de `docker-compose.yml`) y Prisma se conecta con `@prisma/adapter-pg` (`lib/prisma.ts`, `prisma.config.ts`).
- La Guia ya usa Supabase Storage para las plantillas de Excel.
- Los datos actuales se cargaron a mano; el seed reproducible (tarea 006) es requisito.
- Despues de la tarea 009 la base no guarda consumos de personas anonimas, solo catalogo (actividades, factores) y, mas adelante, reportes.

## Decisiones a tomar

- **Conexion desde Vercel:** usar el pooler de conexiones de Supabase (necesario en entornos serverless) y definir variables separadas para la conexion de la app y la de migraciones.
- **Proyecto de Supabase:** reutilizar el existente (el de Storage) o crear uno nuevo para la app.
- **Entornos:** si habra una base de desarrollo local ademas de la de Supabase, o solo Supabase.

## Pasos

1. Crear o elegir el proyecto de Supabase y obtener las cadenas de conexion (directa y pooler).
2. Configurar variables de entorno locales y documentar las necesarias en `.env.example`.
3. Ajustar `lib/prisma.ts` y `prisma.config.ts` si el pooler lo requiere.
4. Aplicar las migraciones de Prisma a Supabase.
5. Ejecutar el seed (tarea 006) y verificar actividades y factores.
6. Probar la app local conectada a Supabase.
7. Documentar como levantar el entorno.

## Criterios de aceptacion

- La app local funciona contra Supabase sin datos cargados a mano.
- Reconstruir la base desde cero (migraciones y seed) deja el mismo catalogo.
- Ningun secreto queda en el repositorio.
- `.env.example` y el README describen las variables necesarias.

## Depende de

- Tareas 006 (seed) y 009 (modo anonimo).
