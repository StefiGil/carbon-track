# 006 - Cargar factores de emision reales y mostrar sus fuentes

Estado: hecha

## Objetivo

1. Cargar en la base de datos los factores de emision de todos los anios disponibles y eliminar los factores ficticios que quedaron como temporales.
2. Dejar el registro versionado en el repositorio, de modo que la base se pueda reconstruir en cualquier momento (local, Supabase, Vercel).
3. Mencionar en la pagina de About que queda por hacer, de donde salen los factores y que provienen de instituciones confiables.

## Contexto

- Los factores viven en la tabla `emission_factors` (`activityId`, `year`, `factorValue`). El calculo (`app/api/analysis/route.ts`) busca el factor por actividad y anio; si no existe, el consumo se omite sin aviso.
- `prisma/seed.ts` hoy no carga factores ni actividades: solo borra unos consumos de prueba. Los datos actuales se cargaron a mano y no se pueden reconstruir.
- El schema no guarda de donde sale cada factor, y no hay restriccion de unicidad por `(activityId, year)`, por lo que un seed repetido duplicaria filas.

- La metodologia indica que la serie electrica esta disponible desde 2006 hasta 2023, y que el gas y los combustibles no cambian con el tiempo (verificar desde los enlaces que estan en Informe-Carbon-Track-Gil-2026.md)

## Pasos

1. Reunir el listado completo de factores y su fuente (Stefania aporta los valores y el documento de origen).
2. Decidir los campos de fuente en el schema y crear la migracion de Prisma, incluyendo la restriccion unica `(activityId, year)`.
3. Escribir un archivo de datos versionado (por ejemplo `prisma/data/emission-factors.ts` o `.json`) con actividad, anio, valor y fuente.
4. Reescribir `prisma/seed.ts` para cargar actividades y factores de forma idempotente (upsert), y eliminar el codigo de borrado de consumos de prueba que tiene hoy.
5. Limpiar los factores temporales de la base y ejecutar el seed.
6. Verificar que existe un factor para cada actividad y cada anio cargado, y que el analisis calcula los valores esperados con un caso de prueba conocido.
7. Exponer la fuente de cada factor a traves de la API (`/api/emission-factors` ya devuelve los factores y puede incluirla).
8. Actualizar la documentacion: metodologia (lista de anios cargados) y README.

La nota con las fuentes de los factores se hace en la tarea 002 (About) y el aviso de anios sin factor en la 007 (Resultados).

## Criterios de aceptacion

- Los factores temporales ya no existen en la base.
- Ejecutar el seed sobre una base vacia o existente deja los mismos factores, sin duplicados.
- Cada actividad tiene factor para todos los anios cargados.
- La API de factores devuelve la fuente de cada uno (`source` y `sourceUrl`), lista para usarse en About.
- El calculo de un caso conocido coincide con consumo por factor a mano.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Depende de

- Tarea 001 (las cuatro actividades deben existir en la base).

## Relacion con otras tareas

- Es requisito de la migracion a Supabase y del deploy: hace que la base sea reproducible.
- La tabla de factores y la explicacion de fuentes se pueden reutilizar en About (tarea 002).

## Avance realizado (adelanto durante la tarea 001)

Para poder ver Resultados con las cuatro categorias se hizo una parte de esta tarea, directamente en la base:

- Se cargaron los factores de **Diesel (2,70 kg CO2/L)** y **Gasoline (2,32 kg CO2/L)** para cada anio de 2019 a 2025 (7 filas por actividad), con los valores de la metodologia. Se repite el mismo valor por anio porque el calculo busca por anio.
- Antes se borraron los factores temporales de la actividad `Fuel` (6 filas), junto con sus consumos.
- La carga se hizo con SQL, sin seed y sin guardar la fuente de cada factor: no queda registro versionado en el repositorio.

Sigue pendiente de esta tarea:

- Los factores de **Electricity** (2020 a 2025: 0,4507 / 0,42 / 0,39 / 0,38 / 0,36 / 0,34) y de **Gas** (2,04 en 2020 a 2025) siguen siendo los temporales y no coinciden con la metodologia (Secretaria de Energia, y 2,19 para el gas). No existe factor de ninguna actividad para consumos de 2019 en Electricity y Gas, por lo que esos consumos se omiten del calculo.
- Campos de fuente en el schema, restriccion unica `(activityId, year)`, archivo de datos versionado y seed idempotente.
- La nota con las fuentes en el reporte.
- Anios posteriores a 2025 o sin factor.

## Resultado

- Migracion `add_source_and_unique_to_emission_factors`: campos `source` y `sourceUrl` y unicidad `(activityId, year)`.
- Datos versionados en `prisma/data/emission-factors.ts`: electricidad (Margen de Operacion Simple) 2006 a 2023; gas, gasoil y nafta con el mismo valor por anio en ese rango.
- `prisma/seed.ts` idempotente (upsert); se ejecuta con `npx prisma db seed`.
- Los consumos de anios sin factor (2024 en adelante) no se calculan; el aviso queda para la tarea 007.
