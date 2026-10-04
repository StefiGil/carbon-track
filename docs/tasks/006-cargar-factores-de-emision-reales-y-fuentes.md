# 006 - Cargar factores de emision reales y mostrar sus fuentes

Estado: pendiente

## Objetivo

1. Cargar en la base de datos los factores de emision de todos los anios disponibles y eliminar los factores ficticios que quedaron como temporales.
2. Dejar el registro versionado en el repositorio, de modo que la base se pueda reconstruir en cualquier momento (local, Supabase, Vercel).
3. Mostrar a quien usa la app, en letra pequena, de donde salen los factores y que provienen de instituciones confiables.

## Contexto

- Los factores viven en la tabla `emission_factors` (`activityId`, `year`, `factorValue`). El calculo (`app/api/analysis/route.ts`) busca el factor por actividad y anio; si no existe, el consumo se omite sin aviso.
- `prisma/seed.ts` hoy no carga factores ni actividades: solo borra unos consumos de prueba. Los datos actuales se cargaron a mano y no se pueden reconstruir.
- El schema no guarda de donde sale cada factor, y no hay restriccion de unicidad por `(activityId, year)`, por lo que un seed repetido duplicaria filas.
- Fuentes definidas en `docs/metodologia-de-huella-de-carbono.md`:

| Fuente | Factor | Unidad | Referencia |
|---|---|---|---|
| Electricidad (un valor por anio) | 2019: 0,428; 2020: 0,443; 2021: 0,459; 2022: 0,450; 2023: 0,429 (y los anios anteriores disponibles) | kg CO2/kWh | Secretaria de Energia de la Nacion, Margen de Operacion Simple, datos de CAMMESA |
| Gas natural | 2,19 | kg CO2e/m3 | IPCC 2006, combustion estacionaria |
| Gasoil | 2,70 | kg CO2/L | US EPA Emission Factors Hub 2025 |
| Nafta | 2,32 | kg CO2/L | US EPA Emission Factors Hub 2025 |

- La metodologia indica que la serie electrica esta disponible desde 2006 hasta 2023, y que el gas y los combustibles no cambian con el tiempo.

## Decisiones a tomar

- **Anios a cargar para electricidad:** todos los que Stefania tiene (hasta 2006) o solo desde 2019. Definir con el listado completo en mano.
- **Gas, gasoil y nafta por anio:** como el calculo busca por anio, hay que repetir el mismo valor en cada anio cargado, o cambiar el calculo para usar un factor sin anio cuando el factor es constante. Se propone repetir el valor por anio para no tocar el calculo.
- **Donde guardar la fuente:** agregar al schema campos de referencia en `EmissionFactor` (por ejemplo `source` y `sourceUrl`, o una tabla `sources` relacionada). Requiere migracion.
- **Donde mostrar la nota de fuentes:** al pie del reporte de Resultados, en la pagina About (tarea 002) o en ambos. Se propone ambos, con un texto corto en el reporte que remita a About.
- **Anios sin factor:** que hace la app cuando la persona sube consumos de un anio posterior al ultimo factor cargado (hoy se omiten en silencio). Se resuelve aca o en una tarea propia; como minimo, no ocultarlo.
- **Que se borra:** confirmar que todos los factores actuales de la base son temporales y se reemplazan por completo, y que pasa con los consumos que hoy dependen de ellos.

## Pasos

1. Reunir el listado completo de factores y su fuente (Stefania aporta los valores y el documento de origen).
2. Decidir los campos de fuente en el schema y crear la migracion de Prisma, incluyendo la restriccion unica `(activityId, year)`.
3. Escribir un archivo de datos versionado (por ejemplo `prisma/data/emission-factors.ts` o `.json`) con actividad, anio, valor y fuente.
4. Reescribir `prisma/seed.ts` para cargar actividades y factores de forma idempotente (upsert), y eliminar el codigo de borrado de consumos de prueba que tiene hoy.
5. Limpiar los factores temporales de la base y ejecutar el seed.
6. Verificar que existe un factor para cada actividad y cada anio cargado, y que el analisis calcula los valores esperados con un caso de prueba conocido.
7. Exponer la fuente de cada factor a traves de la API (`/api/emission-factors` ya devuelve los factores y puede incluirla).
8. Agregar la nota en letra pequena con el origen de los factores y las instituciones que los respaldan (Secretaria de Energia, IPCC, US EPA, CAMMESA), sin hardcodear los valores: la nota toma los datos de la API.
9. Actualizar la documentacion: metodologia (lista de anios cargados) y README.

## Criterios de aceptacion

- Los factores temporales ya no existen en la base.
- Ejecutar el seed sobre una base vacia o existente deja los mismos factores, sin duplicados.
- Cada actividad tiene factor para todos los anios cargados.
- El reporte muestra una nota discreta con las fuentes de los factores, y el contenido proviene de la base.
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
