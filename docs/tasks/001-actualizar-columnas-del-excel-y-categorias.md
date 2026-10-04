# 001 - Actualizar columnas del Excel y categorias de emision

Estado: implementada en codigo y base. Pendiente (Stefania): plantilla nueva en Supabase e imagen de ejemplo de la Guia. Falta ver Resultados con las cuatro categorias, que depende de cargar los factores (tarea 006).

## Objetivo

Alinear la app con la nueva plantilla de consumos, que separa los combustibles liquidos. Con esto la pagina de Resultados se puede ver con datos reales y detectar que mas hay que acomodar.

Columnas nuevas del Excel:

| Columna | Unidad | Fuente |
|---|---|---|
| `year` | n/a | |
| `month` | n/a | |
| `electricity_kwh` | kWh | Electricidad|
| `gas_m3` | m3 | Gas natural|
| `diesel_l` | litros | Gasoil|
| `gasoline_l` | litros | Nafta|

Antes la plantilla tenia una sola columna `fuel_l`. Ahora son cuatro categorias de emision en lugar de tres.

## Contexto

- La subida (`app/api/upload/consumption/route.ts`) asocia cada columna del Excel con una actividad mediante `activities.column_key` en la base. No hay nombres de columna en el codigo. Si la base no tiene las cuatro actividades con esos `column_key`, las columnas nuevas se ignoran sin aviso, y si ninguna coincide responde "No valid data found".

- La Guia (`app/guide/page.tsx`, alrededor de la linea 61) muestra el texto `year, month, electricity_kwh, gas_m3, fuel_l`.
- La plantilla descargable esta en el storage de Supabase (`consumption-data.xlsx`) y la imagen de ejemplo de la Guia es una captura de la plantilla vieja.
- Varios componentes asignan iconos y colores por nombre de actividad, solo con `Electricity`, `Gas` y `Fuel`:
  - `app/components/analysis/EmissionCategories.tsx` (orden, iconos, descripciones, colores y grilla de 3 columnas). (aca hay que separar en 4, porque fuel cambia a diesel y gasolina, ponele colores que te parezcan que van bien con las categorias)

  - `app/components/results/ExecutiveSummary.tsx` (colores de las barras).
- Los graficos y la tabla de resultados trabajan por `activityId` y se adaptan solos a la cantidad de actividades, pero conviene revisarlos con cuatro categorias.
- Los factores de la metodologia (`docs/metodologia-de-huella-carbono.md`): gasoil 2,70 kg CO2/L y nafta 2,32 kg CO2/L son distintos, por eso se separan.

## Decisiones a tomar

- **Nombres de las actividades en la base:** `Diesel` y `Gasoline`, o los equivalentes en espanol. La interfaz y el codigo usan hoy nombres en ingles, y la convencion del proyecto es no hardcodear etiquetas. Conviene que icono y color dependan de datos (por ejemplo un campo en la base) y no de un mapa por nombre en el componente. (si, que sigan la estructura que tienen)
- **Que pasa con la actividad `Fuel` existente y sus consumos:** renombrarla o reemplazarla. Los consumos ya cargados con `Fuel` no se pueden repartir entre gasoil y nafta; hay que decidir si se descartan y se recargan desde el Excel nuevo. (borra lo que esta en la db, y modifica la tabla con eso separado)
- **Factores:** cada actividad necesita factor para cada anio analizable. Los valores reales se cargan en la tarea de seed reproducible (todavia sin escribir); esta tarea solo deja las actividades listas. Mientras tanto, los consumos de una actividad sin factor se omiten del calculo. (si, tal cual)
- **Validacion de columnas:** hoy una columna faltante o mal escrita se ignora en silencio. Decidir si se avisa a la persona (por ejemplo, listar las columnas esperadas y las que faltan). (modificar como dice en los puntos anteriores.)
(la imagen que esta de ejemplo, no la cambies, la cambio yo manualmente)

## Pasos

1. Definir con Stefania los nombres y `column_key` de las cuatro actividades y la unidad de cada una.
2. Actualizar la tabla `activities` en la base: reemplazar `Fuel` por `Diesel` y `Gasoline` con `diesel_l` y `gasoline_l`; confirmar que `electricity_kwh` y `gas_m3` coinciden.
3. Resolver los consumos antiguos de `Fuel` segun lo decidido.
4. Adaptar `EmissionCategories` para cuatro categorias: orden, iconos, colores y grilla.
5. Adaptar los colores de `ExecutiveSummary` y revisar donas, barras y tabla con cuatro actividades.
6. Actualizar el texto de columnas en la Guia.
7. Subir la plantilla nueva al storage de Supabase y reemplazar la imagen de ejemplo de la Guia. Esto lo hace Stefania.
8. Mejorar el mensaje de error de la subida cuando faltan columnas esperadas.
9. Probar de punta a punta: subir el Excel nuevo, configurar el analisis y ver los resultados.

## Criterios de aceptacion

- El Excel con `year, month, electricity_kwh, gas_m3, diesel_l, gasoline_l` se sube sin errores y crea consumos para las cuatro actividades.
- La pagina de Analisis muestra cuatro tarjetas de categoria con su icono y color.
- La pagina de Resultados muestra las cuatro categorias en resumen, graficos y tabla.
- La Guia lista las columnas nuevas y ofrece la plantilla actualizada.
- Si faltan columnas, la persona recibe un mensaje claro.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Relacion con otras tareas

- Es la primera porque deja los datos listos para ver y ajustar la pagina de Resultados.
- La carga de factores reales y la tarea 005 (categorias en gris) dependen de que las cuatro actividades existan.
