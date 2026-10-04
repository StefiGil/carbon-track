# 003 - Guia como pagina de inicio

Estado: pendiente

## Objetivo

Que al entrar al link de la aplicacion lo primero que se vea sea la Guia, para que quien llega por primera vez sepa como preparar y subir sus datos antes de analizar.

Ademas, destacar la frase "Upload your consumption data to start." para que se entienda que cargar el Excel de consumos es obligatorio para poder hacer el analisis.

## Contexto

- Hoy `/` es la pagina de Analisis (`app/page.tsx`) y la Guia vive en `/guide`.
- El header (`app/components/analysis/Header.tsx`) lista Guide primero y Analysis despues, con Analysis apuntando a `/`.
- La Guia tiene un link que lleva a `/` (`app/guide/page.tsx`, alrededor de la linea 74), presumiblemente al boton para ir a analizar.
- La frase "Upload your consumption data to start." esta hoy en el parrafo introductorio de la pagina de Analisis (`app/page.tsx`), sin ningun resalte. La tarea 005 tambien reescribe ese parrafo, asi que conviene coordinar ambos cambios.
- `AnalysisConfigurator` navega a `/results` al generar el analisis; esa ruta no cambia.

## Opciones

1. **Redirect:** `/` redirige a `/guide` y Analisis sigue en una ruta propia (por ejemplo `/analysis`). La URL de la guia queda en `/guide`.
2. **Intercambio de rutas:** la Guia pasa a `/` y Analisis se mueve a `/analysis`. Es la opcion mas limpia si `/` debe mostrar la guia sin redirigir.

Recomendacion: opcion 2, porque evita un redirect y deja una URL canonica por pagina.

## Pasos

1. Elegir la opcion (ver arriba).
2. Mover las paginas segun la opcion elegida: Analisis a `app/analysis/page.tsx` y Guia a `app/page.tsx`, o su equivalente con redirect.
3. Actualizar los links del header: Guide apunta a `/` (o `/guide`) y Analysis a `/analysis`. Revisar el estado activo de cada link.
4. Actualizar el link de la Guia que hoy apunta a `/` para que lleve a Analisis.
5. Buscar otras referencias a `/` (botones, redirecciones, logo del header) y corregirlas.
6. Actualizar `CLAUDE.md`: la lista de paginas y la estructura de proyecto dicen que Analisis es `app/page.tsx`.
7. Revisar el README, si menciona las rutas.
8. Poner en negrita (o con otro resalte visible) la frase "Upload your consumption data to start." en el parrafo introductorio de Analisis. Evaluar tambien mostrarla en la Guia, donde explica los pasos, dado que ahora es la pagina de inicio. Mantener el resalte si el parrafo se reescribe en la tarea 005.

## Criterios de aceptacion

- Abrir la raiz de la aplicacion muestra la Guia.
- Desde la Guia se llega a Analisis con un clic y de vuelta desde el header.
- El link activo del header es correcto en cada pagina.
- El flujo completo (Guia, Analisis, Resultados) funciona sin enlaces rotos.
- `CLAUDE.md` refleja las rutas nuevas.
- La frase "Upload your consumption data to start." se ve resaltada y deja claro que sin datos cargados no se puede generar el analisis.

## Relacion con otras tareas

- Si se hace antes de la 002, el link "About" se agrega al header ya con las rutas nuevas.
- El parrafo introductorio tambien se modifica en la 005; el resalte de la frase debe conservarse.
