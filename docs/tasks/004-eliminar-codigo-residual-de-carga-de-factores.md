# 004 - Eliminar codigo residual de carga de factores

Estado: implementada (Guia y README actualizados, link de la plantilla corregido).

## Objetivo

Los factores de emision viven en la base de datos y el usuario nunca los sube. Quitar cualquier resto de la logica anterior en la que se subia tambien un Excel de factores, y dejar la Guia y el codigo coherentes con "solo se sube el Excel de consumos".

## Revision hecha

Se busco "factor" en `app/`, `lib/`, `prisma/seed.ts` y el README. No hay ruta de subida de factores: el unico endpoint de upload es `app/api/upload/consumption/route.ts`. Los restos encontrados son:

| Donde | Que es | Accion |
|---|---|---|
| `app/guide/page.tsx` lineas 10-13 | Entrada `factors` en `templateFiles` (plantilla `factors-data.xlsx`) que ya no se usa; solo se usa `templateFiles.consumption` | Eliminar la entrada |
| Storage de Supabase (`assets-public/factors-data.xlsx`) | Plantilla publica de factores sin uso | Decidir si se borra (lo hace Stefania, es un recurso externo) |
| `docs/example-factors-data.png` | Captura del Excel de factores | Eliminar si no se reutiliza en documentacion |
| `README.md` (seccion de factores y features) | Menciona "Annual emission factor management" y la fuente UNLP 2019 | Actualizar a la metodologia vigente y quitar la idea de gestion de factores por el usuario |
| `app/api/emission-factors/route.ts` | Endpoint de solo lectura de factores | Conservar. No sube nada. Hoy ninguna pagina lo consume; puede servir para la tabla de factores en About (ver 002) |

## Pasos

1. Confirmar con una busqueda final que nada mas referencia `factors-data`, `example-factors` ni logica de subida de factores.
2. Quitar la entrada `factors` de `templateFiles` en `app/guide/page.tsx`.
3. Revisar el resto de la Guia por textos o pasos que mencionen factores como algo que sube el usuario.
4. Eliminar `docs/example-factors-data.png` si se confirma que no se usa.
5. Actualizar el README: seccion de factores, lista de features y estructura del proyecto (hoy describe carpetas que no existen, como `dashboard/` e `institutions/`).
6. Indicar si se borra la plantilla `factors-data.xlsx` del storage de Supabase.

## Observacion aparte

La Guia usa `/example-consumption.png` como imagen de ejemplo, pero `public/` solo contiene `favicon.svg`. La captura existe en `docs/` con otro nombre (`example-comsuption.png`, con errata). Revisar si la imagen se ve en la Guia; si esta rota, corregir en esta tarea o abrir una propia.

## Criterios de aceptacion

- No quedan referencias a subir factores en codigo, Guia ni README.
- La Guia solo ofrece la plantilla de consumos.
- El README describe la metodologia y la estructura reales.
- La Guia no tiene imagenes rotas.
- Sigue funcionando la subida de consumos y el calculo.

## Relacion con otras tareas

- La carga de los factores reales a la base va en una tarea aparte (seed reproducible).
