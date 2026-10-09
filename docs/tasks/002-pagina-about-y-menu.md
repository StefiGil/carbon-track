# 002 - Pagina About y entrada en el menu

Estado: hecha

## Objetivo

Crear la pagina About (`app/about/page.tsx`) que explique el proyecto y su metodologia, y agregarla al menu del header. Sirve tambien como material de repaso para quien retome el proyecto.

## Contexto

- Hoy el header (`app/components/analysis/Header.tsx`) tiene solo los links Guide y Analysis. Reports sigue comentado hasta que exista login.
- No existe `app/about/`.
- La fuente de contenido es `docs/metodologia-de-huella-carbono.md`. Hay que leerla antes de escribir la pagina.

## Pasos

1. Disenar la interfaz en Stitch (Google) y guardar las capturas de referencia en `designs/about/`. Lo hace Stefania.
2. Definir el contenido de la pagina a partir de la metodologia:
   - Que es la app y a quien esta dirigida.
   - Aviso claro de que la herramienta solo sirve para instituciones de Argentina: los factores de emision (red electrica de la Secretaria de Energia de la Nacion, con dat os de CAMMESA) corresponden a la matriz energetica argentina y no aplican a otros paises.
   - Flujo en tres etapas: ingreso de datos, procesamiento, presentacion de resultados.
   - Formula de calculo (Ec. 1 y Ec. 2).
   - Fuentes y alcances (GHG Protocol): electricidad (Alcance 2), gas natural, gasoil y nafta (Alcance 1).
   - De donde salen los factores de emision y por que el factor electrico es por ano.
   - Rezago de los factores electricos: la Secretaria de Energia publica cada valor con unos dos anios de demora, por lo que los anios recientes pueden no tener factor y no se calculan. Es una explicacion fija; el aviso concreto de que anios se omitieron esta en la tarea 007.
   - Fuentes de cada factor (Secretaria de Energia, CAMMESA, IPCC, US EPA), como nota discreta o seccion propia. Los datos salen de `/api/emission-factors`, que ya devuelve `source` y `sourceUrl` (tarea 006).
   - Limitaciones y trabajo futuro.
   - Referencias.
3. Construir `app/about/page.tsx` y los componentes en `app/components/about/`, siguiendo el diseno de Stitch.
4. Agregar el link "About" al arreglo `links` del header.
5. Verificar estado activo del link, y que la pagina se vea bien en mobile y desktop.

## Decisiones a tomar

- Los factores y referencias que se muestran en la pagina: segun la convencion del proyecto, los valores no se hardcodean y salen de la API. Decidir si la tabla de factores se obtiene de `/api/emission-factors` o si la pagina muestra solo texto explicativo y la tabla queda para la tarea de factores.
- El diagrama de flujo (mermaid en la metodologia): decidir si se redibuja como componente o como imagen.

## Criterios de aceptacion

- Existe la ruta `/about` y carga sin errores.
- El header muestra "About" y lo marca como activo en esa ruta.
- La pagina indica de forma visible que la app es solo para instituciones de Argentina y explica por que.
- El contenido es coherente con `docs/metodologia-de-huella-carbono.md` y no menciona la metodologia anterior (UNLP 2019).
- Si algun dato viene de la API, hay estado de carga y mensaje de error.
- Sin emojis en el codigo; codigo y comentarios en ingles.

## Relacion con otras tareas

- 006: provee las fuentes de los factores a traves de la API; la nota visible con esas fuentes se hace aca.
- 007: muestra en Resultados el aviso de anios sin factor; este texto explica el motivo.

## Depende de

- Diseno en Stitch (paso 1).
