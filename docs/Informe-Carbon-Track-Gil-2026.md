Desarrollo de Carbon Track, una aplicación web para la estimación de la huella de carbono en instituciones educativas argentinas mediante factores de emisión aplicables al contexto nacional. Caso de estudio en la Facultad de Ciencias

Exactas de la UNICEN

## STEFANIA GIL

sgilstefania@gmail.com

Cátedra: Tratamiento de Efluentes Gaseosos (Curso 2026)

Licenciatura en Tecnología Ambiental, Facultad de Ciencias Exactas, Universidad Nacional del Centro de la

Provincia de Buenos Aires (UNICEN)

Responsables: Dra. Mariana Pereyra y Lic. Brenda Alba

Resumen: Las instituciones educativas presentan consumos significativos de energía, pero rara vez disponen de herramientas accesibles para cuantificar las emisiones de gases de efecto invernadero (GEI) asociadas a su actividad. Este trabajo presenta el desarrollo de Carbon Track, una aplicación web que estima la huella de carbono de instituciones educativas a partir de su consumo de electricidad, gas natural y combustibles líquidos. A diferencia de las calculadoras genéricas, la herramienta incorpora factores de emisión adaptados al contexto argentino, almacenados en su base de datos y diferenciados por año; para la electricidad se adopta el factor oficial de la Secretaría de Energía de la Nación, mientras que para el gas natural y los combustibles líquidos se emplean los factores del Panel Intergubernamental sobre Cambio Climático (IPCC) y de la Agencia de Protección Ambiental de los Estados Unidos (EPA). Como caso de estudio, se aplicó la herramienta a la Facultad de Ciencias Exactas de la UNICEN (Tandil) para un período de consumo estimado; debido a la ausencia de registros de facturación directa, se utilizaron datos obtenidos a través de una metodología de estimación de consumos basada en variables de superficie edilicia, niveles de presencialidad y registros climáticos locales. Este período fue seleccionado para el intervalo 2019–2023. Los resultados muestran emisiones del orden de 545 t CO₂e anuales en condiciones de plena presencialidad, con la electricidad como principal fuente (≈ 82 %), seguida del gas natural (≈ 17 %). El período pandémico (2020–2021) refleja una marcada caída de emisiones por la reducción de la presencialidad. Se discute por qué, en el contexto argentino, la electricidad domina la huella, a diferencia de países con matrices energéticas más limpias, así como las limitaciones de la herramienta y la incertidumbre inherente a los factores de emisión. Se concluye que la aplicación desarrollada permite estimar la huella de carbono de instituciones educativas a partir de consumos energéticos directos, constituyéndose en una herramienta adecuada para el diagnóstico de emisiones en el contexto argentino. Asimismo, se identificó como principal línea de mejora la incorporación de nuevas categorías de emisión, en particular las correspondientes al Alcance 3 del Greenhouse Gas Protocol (GHG Protocol).

Palabras clave: huella de carbono institucional; factores de emisión; instituciones educativas; inventario de GEI; aplicación web; matriz energética argentina; dióxido de carbono equivalente (CO₂e).


## I. INTRODUCCIÓN

## I.1. Cambio climático y gases de efecto invernadero

El cambio climático es uno de los principales desafíos ambientales del siglo XXI. Su causa fundamental es el aumento de la concentración atmosférica de gases de efecto invernadero (GEI) de origen antropogénico, que intensifican la retención de radiación infrarroja en la baja atmósfera y elevan la temperatura media global [1]. Entre los GEI más relevantes se encuentran el dióxido de carbono (CO₂), el metano (CH₄) y el óxido nitroso (N₂O), siendo el CO₂ proveniente de la combustión de combustibles fósiles el de mayor contribución a las emisiones globales [1].

Dado que cada GEI posee una capacidad distinta de forzamiento radiativo, las emisiones se expresan de manera homogénea en CO₂e, que se obtiene multiplicando la masa de cada gas por su potencial de calentamiento global (GWP) [1]. Esta unidad permite agregar en un único indicador emisiones de gases de naturaleza diversa y comparar inventarios entre organizaciones y sectores.

En Argentina, el sector energético es el principal responsable de las emisiones nacionales [2]. Estas provienen principalmente de la combustión de combustibles fósiles para la generación eléctrica, el transporte y la industria. No obstante, la intensidad de carbono de la matriz eléctrica argentina es moderada en comparación con otros países del G20 debido a la participación de la generación hidroeléctrica, nuclear y, de forma creciente, eólica y solar [2].

## I.2. Huella de carbono institucional

La huella de carbono es un indicador que cuantifica el total de emisiones de GEI, expresadas en CO₂e, asociadas directa o indirectamente a una actividad, producto u organización durante un período determinado. Aplicada al ámbito institucional, permite identificar las principales fuentes de emisión, establecer líneas de base y evaluar el efecto de las medidas de mitigación a lo largo del tiempo.

El estándar internacional más difundido para la contabilidad de emisiones organizacionales es el Greenhouse Gas Protocol (GHG Protocol), desarrollado por el World Resources Institute y el World Business Council for Sustainable Development [3]. Este marco clasifica las emisiones en tres alcances: el Alcance 1 comprende las emisiones directas de fuentes propias o controladas por la institución, como la combustión de gas natural en calderas o el consumo de combustible de su flota; el Alcance 2 abarca las emisiones indirectas derivadas de la electricidad adquirida a la red; y el Alcance 3 incluye el resto de las emisiones indirectas asociadas a las actividades de la organización, como el transporte de estudiantes y personal, las compras o la gestión de residuos [3].

En la práctica, la mayoría de las instituciones reportan sus emisiones de Alcance 1 y 2, cuya medición resulta relativamente sencilla a partir de las facturas de servicios. En cambio, la cuantificación del Alcance 3 suele ser parcial debido a la dificultad para acceder a los datos de actividad correspondientes [3].

## I.3. Rol de las instituciones educativas

Las universidades ocupan un lugar particular en la transición hacia la sostenibilidad. Por un lado, desarrollan actividades que requieren consumos de electricidad, gas natural y otros recursos energéticos. Por otro, por su función educativa y de investigación, constituyen un ámbito propicio para generar conocimiento, formar profesionales y promover iniciativas vinculadas con la sostenibilidad [4], [5].

La elaboración de inventarios de GEI a escala de campus se ha vuelto una práctica extendida internacionalmente. Numerosas universidades han calculado su huella de carbono siguiendo el GHG


Protocol o la norma ISO 14064, identificando como principales fuentes de emisión el consumo eléctrico, la calefacción, el transporte y, en los inventarios más completos, las compras y los desplazamientos [4], [6].

Las fuentes de emisión típicas en una institución educativa pueden agruparse en:

- Consumo eléctrico (iluminación, climatización, equipos).

- Combustión de gas natural para calefacción y agua caliente.

- Combustibles líquidos de la flota vehicular y grupos electrógenos.

- Transporte de estudiantes, docentes y personal (Alcance 3).

- Generación de residuos y consumo de papel (Alcance 3).

El primer paso para gestionar estas emisiones es medirlas, ya que sin una cuantificación sistemática resulta imposible establecer metas de reducción o evaluar la efectividad de las medidas adoptadas.

## II. OBJETIVOS

Objetivo general: desarrollar una aplicación web capaz de estimar la huella de carbono de instituciones educativas a partir de su consumo de electricidad, gas natural y combustibles líquidos, empleando factores de emisión de fuentes oficiales adaptados al contexto argentino y expresando los resultados en CO₂ equivalente.

## Objetivos específicos:

- Identificar las principales fuentes de emisión relevantes para instituciones educativas en Argentina.

- Recopilar e implementar factores de emisión verificados, de fuentes oficiales e internacionales, almacenados de forma diferenciada por año.

- Diseñar una interfaz web accesible para el ingreso de datos de consumo y la generación automática de resultados.

- Validar el funcionamiento de la herramienta mediante un caso de estudio aplicado a la Facultad de Ciencias Exactas de la UNICEN (período 2019–2023), mediante el empleo de un método de estimación indirecta de sus consumos energéticos, debido a que actualmente no se cuenta con los registros de facturación directa correspondientes.

## III. FUNDAMENTOS METODOLÓGICOS

## III.1. Factores de emisión

Un factor de emisión es un coeficiente que representa la cantidad de GEI emitidos por unidad de actividad, por ejemplo, kilogramos de CO₂e por cada kilovatio-hora de electricidad consumida o por cada litro de combustible quemado [1], [3]. Constituye el núcleo del método más empleado para la estimación de inventarios de GEI, cuya formulación general es:

𝐸𝑚𝑖𝑠𝑖𝑜𝑛𝑒𝑠 (𝑘𝑔 𝐶𝑂₂𝑒) = 𝐷𝑎𝑡𝑜 𝑑𝑒 𝑎𝑐𝑡𝑖𝑣𝑖𝑑𝑎𝑑 × 𝐹𝑎𝑐𝑡𝑜𝑟 𝑑𝑒 𝑒𝑚𝑖𝑠𝑖ó𝑛

donde el dato de actividad mide el nivel de la actividad que genera emisiones (kWh, m³ de gas, litros de combustible) y el factor de emisión lo convierte en una masa de CO₂e. Cuando intervienen varios gases, cada uno se pondera por su GWP antes de sumarse, de modo que el factor expresado en CO₂e ya incorpora esa conversión [3].

Un aspecto central es que los factores de emisión no son universales ni constantes. Su valor depende del país, la tecnología considerada y la metodología empleada para su cálculo. En el caso de la electricidad, las diferencias responden principalmente a la composición de la matriz de generación y a los criterios utilizados para representar las emisiones asociadas al consumo eléctrico. Por este motivo, distintos organismos pueden reportar factores diferentes para un mismo país y período [7].

(Ec. 1)


Existen dos enfoques metodológicos principales para calcular el factor de emisión de la electricidad. El primero, propuesto por la Agencia Internacional de la Energía (IEA), incluye en el denominador toda la generación eléctrica, incluidas las fuentes no emisoras como la hidroeléctrica, la nuclear, la eólica y la solar. Como consecuencia, el factor de emisión disminuye a medida que aumenta la participación de energías de baja emisión en la matriz eléctrica. El segundo corresponde a la metodología de Margen de Operación de las Naciones Unidas, que considera en el denominador únicamente la generación proveniente de centrales térmicas. En este enfoque se excluyen las fuentes renovables y nucleares por tratarse de recursos de bajo costo y de despacho prioritario low-cost / must-run. El fundamento es que, cuando una institución incrementa su consumo de electricidad, la demanda adicional es cubierta por una central térmica y no por una fuente renovable que ya opera a su máxima capacidad [8].

No obstante, este enfoque se basa en ciertos supuestos que introducen incertidumbre en la estimación de las emisiones. En particular, supone que las fuentes low-cost / must-run generan siempre al máximo de su disponibilidad real, de modo que cualquier variación de la demanda recae sobre las centrales térmicas. Sin embargo, esa disponibilidad no es constante a lo largo del año, ya que depende de la hidrología (caudal de los ríos que alimentan las represas), de las condiciones de viento y radiación solar, y de la disponibilidad operativa de las centrales nucleares (por ejemplo, durante paradas de mantenimiento) [8], [9]. Como el factor de Margen de Operación se calcula y aplica como un valor único para cada año, no refleja estas variaciones intraanuales del sistema eléctrico [10], [11].

El método de la IEA no está exento de limitaciones equivalentes. Al igual que el Margen de Operación, se calcula y publica como un valor anual fijo, por lo que tampoco refleja la variabilidad real de la matriz eléctrica a lo largo del año [10]. A ello se suma una limitación específica para los países que no integran la Organización para la Cooperación y el Desarrollo Económicos (OCDE), como es el caso de Argentina. Estos países envían su información a la IEA de forma voluntaria, lo que puede generar diferencias respecto de otras fuentes y la publicación de los datos con uno o dos años de demora [12].

Para el presente trabajo se adoptó el factor de Margen de Operación de la Secretaría de Energía de la Nación, por considerarse más representativo del funcionamiento del sistema eléctrico argentino, fuertemente dependiente de las centrales térmicas a gas natural para responder a la demanda variable [2]. Este factor se almacena en la base de datos de la aplicación de forma diferenciada por año, lo que permite realizar cálculos históricos precisos en lugar de utilizar un valor único promedio.

Por otra parte, los factores de emisión asociados a combustibles también presentan incertidumbres inherentes. Su estimación depende de propiedades como la composición química del combustible, el poder calorífico utilizado y los factores de emisión adoptados para cada gas [1], [13]. Estas diferencias pueden generar variaciones entre metodologías y bases de datos. Por ello, los resultados obtenidos deben interpretarse como estimaciones de orden de magnitud y no como mediciones exactas.

## III.2. Herramientas existentes y planteamiento del problema

Existen diversas herramientas para el cálculo de la huella de carbono, desde las calculadoras asociadas al GHG Protocol hasta plataformas comerciales y bases de datos de factores de emisión como las de la IEA o la EPA[7], [13]. Sin embargo, muchas están orientadas a grandes organizaciones, requieren conocimientos especializados, utilizan factores de emisión de otros países o tienen costos de licencia elevados. En particular, los factores de emisión oficiales de la IEA se comercializan bajo licencias que restringen su uso en herramientas de acceso compartido. Además, para países no-OCDE, como Argentina, estos factores se elaboran a partir de información reportada voluntariamente, lo que puede generar diferencias respecto de otras fuentes oficiales [12].

En este contexto, el problema que motiva este trabajo es la ausencia de herramientas simples, de libre acceso y adaptadas al contexto argentino que permitan a una institución educativa estimar su huella de carbono a


partir de los datos que ya posee en sus facturas de servicios, empleando factores de emisión nacionales de fuentes oficiales y públicos.

## IV. METODOLOGÍA

## IV.1. Diseño y funcionamiento de la aplicación

Carbon Track fue concebida como una aplicación web, accesible desde el navegador sin necesidad de instalación, de modo que pueda ser utilizada por personal administrativo sin conocimientos de programación. Se estructura en tres capas. La primera corresponde al ingreso de datos, donde el usuario carga los consumos de energía mediante una plantilla predefinida y selecciona el período de análisis. La segunda realiza el procesamiento de la información, integrando los datos de consumo con los factores de emisión almacenados en la base de datos para calcular y agregar las emisiones correspondientes. Finalmente, la tercera presenta los resultados obtenidos mediante tablas, gráficos y un reporte de huella de carbono.

Una decisión de diseño central es que los factores de emisión residen en la base de datos de la aplicación, donde se almacenan a partir de fuentes oficiales verificadas. De este modo, la institución usuaria no necesita conocer ni ingresar los factores, sino únicamente cargar sus datos de consumo en un archivo con un formato estándar, que incluye las columnas correspondientes al año, el mes, el consumo de electricidad (kWh), de gas natural (m³) y de combustibles líquidos (gasoil y nafta, en litros). La aplicación identifica automáticamente los períodos, aplica el factor correspondiente a cada fuente y año, y presenta las emisiones de CO₂e del período seleccionado mediante tablas y gráficos, además de permitir la exportación de un reporte en formato PDF. El flujo general de funcionamiento se representa en la Figura 1.

*Figura 1 Diagrama de flujo de la aplicación Carbon Track*

*Nota. El diagrama detalla las etapas de ingreso, procesamiento y presentación de resultados dentro de la plataforma. Creación propia, 2026.*


Este diseño desacopla los factores de emisión del motor de cálculo, permitiendo su actualización centralizada (por ejemplo, al publicarse el factor eléctrico de un nuevo año) sin modificar la lógica de la aplicación ni requerir acciones por parte de las instituciones usuarias.

## IV.2. Fuentes de emisión y variables consideradas

La aplicación contempla las fuentes de emisión de Alcance 1 y 2 que pueden derivarse directamente de las facturas de servicios: electricidad, gas natural y combustibles líquidos (gasoil y nafta). Para cada una se define una variable de actividad y su unidad, según la Tabla 1.

*Tabla 1. Fuentes de emisión, variables de actividad y unidades consideradas*

| Fuente | Alcance | Variable de actividad | Unidad |
| --- | --- | --- | --- |
| Electricidad | Alcance 2 | Consumo eléctrico mensual | kWh |
| Gas natural | Alcance 1 | Consumo de gas mensual | m³ |
| Gasoil | Alcance 1 | Volumen consumido | litros |
| Nafta | Alcance 1 | Volumen consumido | litros |

Nota. Las unidades coinciden con las que figuran en las facturas de servicios públicos, lo que simplifica la carga de datos. El combustible se distingue entre gasoil y nafta por tener factores de emisión diferentes.

## IV.3. Factores de emisión utilizados

Los factores de emisión se obtuvieron de fuentes oficiales e internacionales, priorizando los datos correspondientes a Argentina. El factor eléctrico proviene de la Secretaría de Energía de la Nación, calculado mediante la metodología de Margen de Operación Simple de Naciones Unidas a partir de datos de CAMMESA, y se almacena un valor por año [14]. El factor del gas natural se derivó de los factores por defecto del IPCC para combustión estacionaria [1], y los de los combustibles líquidos se tomaron del Emission Factors Hub 2025 de la EPA [13]. La base de datos de la aplicación incorpora los factores eléctricos disponibles para el período 2006–2023 [14], sujetos a actualización con un rezago aproximado de dos años respecto al año de publicación. Los factores del gas natural [1] y de los combustibles líquidos [13] son valores constantes aplicables desde 2006, ya que no varían con la matriz energética sino con las propiedades fisicoquímicas del combustible [1].

## IV.4. Metodología de cálculo

El cálculo aplica el método de los factores de emisión (Ec. 1) de manera desagregada por fuente, mes e institución. Para cada registro de consumo, la aplicación recupera de la base de datos el factor correspondiente a la fuente y al año, y lo multiplica por el dato de actividad. Las emisiones totales de un período se obtienen como la suma de las emisiones de todas las fuentes y meses considerados:

donde el subíndice i recorre cada combinación de fuente y mes. Este enfoque modular permite descomponer el resultado y analizar la contribución relativa de cada fuente y su distribución temporal.

## V. CASO DE ESTUDIO: FACULTAD DE CIENCIAS EXACTAS, UNICEN

Para evaluar la herramienta se aplicó a la Facultad de Ciencias Exactas de la UNICEN en Tandil, para el período 2019–2023, utilizando consumos energéticos estimados. La elección de cinco años consecutivos permite analizar la evolución temporal de las emisiones, incluyendo el efecto del período pandémico. En


ausencia de datos públicos de consumo energético desagregados, los consumos se estimaron mediante un modelo propio basado en datos reales de la institución y la región:

- Superficie edilicia: 5.532 m² de superficie cubierta total, distribuidos en nueve edificios (Pabellón Central, Anexo, NUCOMPA, IFIMAT, IFAS, PLADEMA, MEDIALAB, INTIA/ISISTAN, entre otros), según el pliego oficial de licitación del servicio de limpieza de la facultad [15].

- Población estudiantil: datos reales del Portal de Transparencia de la UNICEN, que registran un crecimiento de 2.039 personas en 2019 a 3.443 en 2023 [16].

- Temperatura: series de temperaturas medias mensuales de la estación meteorológica del aeródromo de Tandil (NOAA, Global Historical Climatology Network), utilizadas para estimar la demanda de calefacción y refrigeración [17].

A partir de estos datos se estimaron los consumos mensuales de cada fuente mediante un modelo basado en la superficie edilicia, la temperatura (a través de los grados-día de calefacción) y un factor de presencialidad que refleja el nivel de actividad efectiva en los edificios. Este último resulta clave para el período 2020–2021: si bien la matrícula continuó creciendo, la presencialidad se redujo drásticamente por la pandemia de COVID-19 (estimada en un 15 % para 2020 y un 55 % para 2021), con el consiguiente descenso del consumo energético. Los supuestos del modelo, los factores de presencialidad y los consumos mensuales estimados se documentan en detalle en el Material complementario I.

Los factores de emisión aplicados para el período analizado se presentan en la Tabla 2.

*Tabla 2. Factores de emisión adoptados, con su fuente y unidad*

| Fuente | Factor de emisión | Unidad | Referencia |
| --- | --- | --- | --- |
| Electricidad 2019 | 0,428 | kg CO₂/kWh | Sec. Energía (MOS) |
| Electricidad 2020 | 0,443 | kg CO₂/kWh | Sec. Energía (MOS) |
| Electricidad 2021 | 0,459 | kg CO₂/kWh | Sec. Energía (MOS) |
| Electricidad 2022 | 0,450 | kg CO₂/kWh | Sec. Energía (MOS) |
| Electricidad 2023 | 0,429 | kg CO₂/kWh | Sec. Energía (MOS) |
| Gas natural | 2,19 | kg CO₂e/m³ | IPCC 2006 [1] |
| Gasoil (diésel) | 2,70 | kg CO₂/L | US EPA 2025 [9] |
| Nafta (95 oct.) | 2,32 | kg CO₂/L | US EPA 2025 [9] |

Nota. MOS: Margen de Operación Simple. A diferencia del factor eléctrico, que varía cada año según la evolución de la matriz de generación, los factores del gas natural y de los combustibles líquidos se mantienen constantes en el período analizado, ya que dependen de las propiedades fisicoquímicas del combustible y no de la matriz energética.

No obstante, el factor del gas natural tampoco es universal y varía según la composición química del gas, que difiere entre países y yacimientos. Por ejemplo, el factor por defecto del IPCC empleado en este trabajo (2,19 kg CO₂e/m³) [1] difiere del que la EPA reporta para el gas natural estadounidense (≈ 1,92 kg CO₂/m³) [13], debido tanto a la composición del gas como al uso de distintos poderes caloríficos de referencia. Dado que Argentina no dispone de un factor nacional oficial específico para el gas natural como sí ocurre con la electricidad [14], se adoptó el valor por defecto del IPCC [1], por ser el factor de referencia internacional recomendado para inventarios nacionales de GEI en ausencia de datos específicos del país.


## VI. RESULTADOS Y DISCUSIÓN

## VI.1. Evolución de las emisiones (2019–2023)

La aplicación procesó los consumos mensuales de los cinco años y calculó las emisiones asociadas a cada fuente. La Tabla 3 presenta las emisiones anuales totales.

*Tabla 3. Emisiones anuales totales por fuente (2019–2023).*

| Año | Electricidad (t | Gas (t CO₂e) | Combust. (t | Total (t CO₂e) |
| --- | --- | --- | --- | --- |
|   | CO₂e) |   | CO₂e) |   |
| 2019 | 443,0 | 92,8 | 9,3 | 545,1 |
| 2020 | 69,1 | 76,1 | 1,4 | 146,6 |
| 2021 | 257,7 | 83,9 | 5,1 | 346,7 |
| 2022 | 472,0 | 96,7 | 9,3 | 578,1 |
| 2023 | 449,0 | 90,5 | 9,3 | 548,9 |

*Nota. La caída de 2020–2021 responde a la reducción de presencialidad por la pandemia, no a una disminución de la matrícula.*

La Figura 2 muestra la evolución de las emisiones totales por fuente. Se observa que, en condiciones de plena presencialidad (2019, 2022 y 2023), las emisiones se sitúan en torno a las 545–578 t CO₂e anuales, mientras que durante la pandemia descienden marcadamente, alcanzando un mínimo de 147 t CO₂e en 2020.

*Figura 2 Emisiones anuales totales por fuente (2019–2023)*

Esta evolución se aprecia con claridad en la Figura 3, que traza la trayectoria de las emisiones totales y evidencia el efecto de la pandemia como una caída pronunciada en 2020, seguida de una recuperación gradual en 2021 y el retorno a los niveles previos a partir de 2022.

*Figura 3*


Evolución de las emisiones totales y efecto de la pandemia

## VI.2. Distribución por fuente

La Figura 4 presenta la distribución de las emisiones por fuente para 2023, un año representativo de operación normal. La electricidad constituye la fuente dominante, con aproximadamente el 82 % del total, seguida por el gas natural (≈ 16 %) y los combustibles líquidos (≈ 2 %).

## Figura 4

Distribución porcentual de las emisiones por fuente (2023)

El detalle mensual de 2023 (Tabla 4) muestra que, si bien el consumo eléctrico se mantiene relativamente estable a lo largo del año, con un leve incremento durante el verano debido al uso de sistemas de


refrigeración, el gas natural presenta un marcado pico invernal (junio a agosto) asociado a la calefacción, coherente con las bajas temperaturas de Tandil en ese período.

*Tabla 4. Emisiones mensuales por fuente — año 2023 (kg CO₂e).*

| Mes | Electricidad | Gas | Combustibles | Total |
| --- | --- | --- | --- | --- |
| Enero | 43.905 | 6.058 | 780 | 50.743 |
| Febrero | 38.921 | 6.058 | 780 | 45.759 |
| Marzo | 42.481 | 6.058 | 780 | 49.319 |
| Abril | 35.598 | 6.058 | 780 | 42.436 |
| Mayo | 35.598 | 7.803 | 780 | 44.181 |
| Junio | 35.598 | 11.292 | 780 | 47.670 |
| Julio | 35.598 | 11.364 | 780 | 47.742 |
| Agosto | 35.598 | 9.765 | 780 | 46.143 |
| Septiembre | 35.598 | 7.875 | 780 | 44.253 |
| Octubre | 35.598 | 6.058 | 780 | 42.436 |
| Noviembre | 35.598 | 6.058 | 780 | 42.436 |
| Diciembre | 38.921 | 6.058 | 780 | 45.759 |
| TOTAL | 449.012 | 90.505 | 9.360 | 548.877 |

Nota. El consumo eléctrico estival (enero–marzo, diciembre) refleja el uso de refrigeración; el pico de gas invernal (junio–agosto) refleja la calefacción.

La comparación mensual entre 2019 y 2023 (Figura 5) confirma la estabilidad del patrón estacional entre años de plena presencialidad, con perfiles de emisión muy similares pese al crecimiento de la matrícula.

*Figura 5 Comparación de emisiones mensuales: 2019 vs. 2023*


## VI.3. Interpretación ambiental

El resultado más relevante es la marcada predominancia de la electricidad en la huella de carbono de la institución (≈ 82 %), muy por encima del gas natural. Este hallazgo contrasta con el patrón observado en universidades de otros países y merece una interpretación detenida.

La razón es la intensidad de carbono de la matriz eléctrica argentina. Con un factor de Margen de Operación cercano a 0,43 kg CO₂/kWh, cada kilovatio-hora consumido genera una cantidad considerable de emisiones, porque la electricidad marginal del sistema proviene mayoritariamente de centrales térmicas a gas natural y derivados del petróleo. En contraste, el estudio de la Universidad Nacional de Colombia reporta que la electricidad representa apenas el 14 % de su huella, precisamente porque la matriz colombiana, con un 82 % de generación hidroeléctrica, tiene un factor de emisión muy bajo (≈ 0,199 kg CO₂/kWh) [6]. Un mismo consumo eléctrico produce, por lo tanto, más del doble de emisiones en Argentina que en Colombia. Esta comparación ilustra un principio fundamental de la contabilidad de emisiones, la huella no depende únicamente de cuánta energía se consume, sino de cómo se genera esa energía.

Una institución puede reducir su huella tanto mejorando su eficiencia energética como a través de la descarbonización de la red eléctrica nacional, un proceso sobre el cual no tiene control directo pero que la beneficia de manera indirecta. El segundo hallazgo relevante es el comportamiento estacional del gas natural, con un pico invernal asociado a la calefacción. Aunque el gas representa una fracción menor del total, identifica a la climatización invernal como un foco concreto de oportunidad para la mitigación.

Finalmente, el efecto de la pandemia (2020–2021) constituye un experimento natural sobre el peso de la presencialidad en la huella institucional. La caída de las emisiones a aproximadamente un cuarto de su valor habitual en 2020, pese al crecimiento de la matrícula, confirma que el consumo energético de un edificio universitario está determinado principalmente por su ocupación efectiva y no por la cantidad de estudiantes inscriptos.

## VI.4. Ventajas y limitaciones de la herramienta

Entre las ventajas de la aplicación se destacan su simplicidad de uso, acceso libre, la adaptación al contexto argentino mediante factores nacionales oficiales y la trazabilidad de dichos factores, almacenados de forma diferenciada por año y actualizables de manera centralizada. El carácter multi-institución y la carga de datos en un formato estándar facilitan su adopción por organizaciones sin capacidades técnicas especializadas.

No obstante, la herramienta presenta limitaciones que conviene reconocer. La principal es la cobertura parcial de fuentes, ya que solo contempla los Alcances 1 y 2, dejando fuera el transporte de personas, la gestión de residuos y el resto del Alcance 3, que en inventarios completos suele constituir la mayor fracción de las emisiones [8]. En segundo lugar, los resultados dependen de la calidad de los datos de consumo ingresados. En tercer lugar, los factores de emisión conllevan una incertidumbre intrínseca discutida en la sección III.1, que incluye la variabilidad intraanual de las fuentes de generación no contemplada en el factor anual único y los rangos de incertidumbre de los factores por defecto del IPCC para el CH₄ y el N₂O [1], [12].

Estas limitaciones no invalidan la utilidad de la herramienta, pero delimitan su alcance, Carbon Track resulta apropiada como instrumento de diagnóstico inicial y de concientización, y como base sobre la cual construir inventarios más completos en etapas sucesivas.


## VII. CONCLUSIONES

El trabajo permitió desarrollar y validar Carbon Track, una aplicación web de libre acceso para la estimación de la huella de carbono de instituciones educativas, cumpliendo con los objetivos planteados. Su aplicación a consumos estimados de la Facultad de Ciencias Exactas de la UNICEN para el período 2019–2023 arrojó emisiones del orden de 545 t CO₂e anuales en condiciones de plena presencialidad, con la electricidad como fuente dominante (≈ 82 %), y evidenció el marcado efecto de la pandemia sobre el consumo energético institucional.

El aporte principal de la herramienta radica en ofrecer un instrumento simple y metodológicamente trazable para una tarea que es condición previa de cualquier estrategia de mitigación: medir para gestionar. Su diferencial frente a las herramientas existentes es la incorporación de factores de emisión de fuentes oficiales nacionales y de libre acceso, adaptados a la realidad del sistema eléctrico argentino, junto con la discusión explícita de sus limitaciones metodológicas.

Entre las líneas de trabajo futuro se destacan la obtención de datos reales de consumo mediante acceso a la información pública y la incorporación del Alcance 3. Asimismo, si bien la aplicación web fue desarrollada y validada en el contexto de instituciones educativas, que constituyen un punto de partida natural por sus niveles de consumo energético y por la oportunidad que representan para promover la sostenibilidad desde su función formativa, una línea de trabajo futuro prometedora sería su adaptación a otros tipos de organizaciones que dispongan de registros de consumo de electricidad, gas natural y combustibles líquidos, como hospitales, municipios o empresas. Esto permitiría ampliar el alcance de la aplicación y facilitar su utilización en futuros estudios y evaluaciones de huella de carbono en distintos sectores.

## Referencias

[1] IPCC, 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Vol. 2: Energy, Ch. 2: Stationary Combustion. Geneva, Switzerland: IPCC, 2006. Disponible en: https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combusti on.pdf [URL 🔗](https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf)

[2] Climate Transparency, Climate Transparency Report 2022: Argentina. Berlin, Germany:

Climate

[https://www.climate-transparency.org/wp-content/uploads/2022/10/CT2022-Argentina-Web.pdf](https://www.climate-transparency.org/wp-content/uploads/2022/10/CT2022-Argentina-Web.pdf)

[3] World Resources Institute y World Business Council for Sustainable Development, The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard, rev. ed. Washington, DC: WRI/WBCSD, 2004. Disponible en: https://ghgprotocol.org/corporate-standard [URL 🔗](https://ghgprotocol.org/corporate-standard)

[4] R. Clabeaux, M. Carbajales-Dale, D. Ladner y T. Walker, “Assessing the carbon footprint of a university campus using a life cycle assessment approach,” J. Cleaner Prod., vol. 273, p. 122600,

2020,

[https://www.sciencedirect.com/science/article/abs/pii/S0959652620326470](https://www.sciencedirect.com/science/article/abs/pii/S0959652620326470)

[5] A.-D. Pop et al., “Towards a climate-neutral campus: Carbon footprint assessment in higher education institutions,” Appl. Sci., vol. 15, no. 7, p. 3695, 2025, doi: 10.3390/app15073695. Disponible en: https://www.mdpi.com/2076-3417/15/7/3695 [URL 🔗](https://www.mdpi.com/2076-3417/15/7/3695)

Transparency,

2022.

Disponible

en:

doi:

10.1016/j.jclepro.2020.122600.

Disponible

en:


[6] N. Cano, L. Berrio, E. Carvajal y S. Arango, “Assessing the carbon footprint of a Colombian university campus using the UNE-ISO 14064-1 and WRI/WBCSD GHG Protocol corporate standard,” Environ. Sci. Pollut. Res., vol. 29, pp. 74560–74571, 2022, doi:

10.1007/s11356-022-21838-2. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9374572/ [URL 🔗](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9374572/)

Disponible

en:

[7] International Energy Agency (IEA), Emissions Factors 2024 Database Documentation. Paris,

France:

IEA,

2024.

Disponible

en:

[https://www.iea.org/data-and-statistics/data-product/emissions-factors-2024](https://www.iea.org/data-and-statistics/data-product/emissions-factors-2024)

[8] UNFCCC, Tool to Calculate the Emission Factor for an Electricity System (Version 07.0), CDM Tool 07. Geneva, Switzerland: UNFCCC CDM Executive Board, 2012. Disponible en: https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-07-v1.1.pdf [URL 🔗](https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-07-v1.1.pdf)

[9] B. Biewald, “Using electric system operating margins and build margins for quantifying credit for a CDM project,” Synapse Energy Economics, presentado ante el CDM Methodologies Panel,

2005.

Disponible

en:

[https://cdm.unfccc.int/Panels/meth/meeting/05/Meth17_repan12_BiewaldPaperOMBMMargins.pd](https://cdm.unfccc.int/Panels/meth/meeting/05/Meth17_repan12_BiewaldPaperOMBMMargins.pdf)

f [URL 🔗](https://cdm.unfccc.int/Panels/meth/meeting/05/Meth17_repan12_BiewaldPaperOMBMMargins.pdf)

[10]

D. Blizniukova, P. Holzapfel, J. F. Unnewehr, V. Bach y M. Finkbeiner, “Increasing temporal

resolution in greenhouse gas accounting of electricity consumption divided into Scopes 2 and 3: case study of Germany,” Int. J. Life Cycle Assess., vol. 28, pp. 1622–1639, 2023, doi:

10.1007/s11367-023-02240-3.

Disponible

en:

[https://link.springer.com/article/10.1007/s11367-023-02240-3](https://link.springer.com/article/10.1007/s11367-023-02240-3)

[11] New York State Energy Research and Development Authority (NYSERDA),

Projected

Emission Factors for New York State Grid Electricity, Rep. 22-18. Albany, NY: NYSERDA, 2022.

Disponible

en:

[https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Publications/Energy-Analysis/22-18-Pr](https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Publications/Energy-Analysis/22-18-Projected-Emission-Factors-for-New-York-Grid-Electricity.pdf)

[ojected-Emission-Factors-for-New-York-Grid-Electricity.pdf](https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Publications/Energy-Analysis/22-18-Projected-Emission-Factors-for-New-York-Grid-Electricity.pdf)

[12]

International Energy Agency (IEA),

Emission Factors Database Documentation (2024/2025

Edition).

Paris,

France:

IEA,

2024.

Disponible

en:

https://iea.blob.core.windows.net/assets/2b5f6d31-3263-44bf-85bc-b754d1c69cd3/IEA_Methodol ogy_Emission_Factors.pdf

[13]

U.S. Environmental Protection Agency (EPA),

Emission Factors for Greenhouse Gas

Inventories, Disponible

2025 ed. Washington, DC: EPA Center for Corporate Climate Leadership, 2025.

en:

[https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf](https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf)

[14]

Secretaría de Energía de la Nación, “Cálculo del factor de emisión de CO₂ de la red argentina

de energía eléctrica.” Ministerio de Economía, Argentina, 2024. Disponible en: https://datos.gob.ar/el/dataset/energia-calculo-factor-emision-co2-red-argentina-energia-electrica/ [URL 🔗](https://datos.gob.ar/el/dataset/energia-calculo-factor-emision-co2-red-argentina-energia-electrica/)

[15] UNICEN, Anexo I — Pliego de Bases y Condiciones: Servicio de Limpieza de la Facultad de Ciencias Exactas. Tandil, Argentina: Rectorado UNICEN, 2026. Disponible en:


https://compras.rec.unicen.edu.ar/lpr_10_2026/3483_Anexo_I__Pliego_Limpieza_FCExa__2026. pdf [URL 🔗](https://compras.rec.unicen.edu.ar/lpr_10_2026/3483_Anexo_I__Pliego_Limpieza_FCExa__2026.pdf)

[16] UNICEN, “Población estudiantil,” Portal de Información Pública. UNICEN, 2025. Disponible en: https://transparencia.unicen.edu.ar/poblacion-estudiantil/ [URL 🔗](https://transparencia.unicen.edu.ar/poblacion-estudiantil/)

[17] National Oceanic and Atmospheric Administration (NOAA), “Global Historical Climatology Network — Daily (GHCN-D), station ID AR000087534 (aeródromo de Tandil),” National Centers for Environmental Information, 2025. Disponible en: https://www.ncei.noaa.gov/ [URL 🔗](https://www.ncei.noaa.gov/)

## Material complementario I

Archivo Excel con los datos de consumo mensual estimado de electricidad, gas natural y combustibles líquidos para el período 2019–2023, incluyendo los supuestos del modelo, los factores de presencialidad aplicados y la metodología de cálculo detallada.

Disponible en: [URL 🔗](https://docs.google.com/spreadsheets/d/1hVhk9cVZJJMJef5MITvNDaDI5FJ9oUWn/edit?usp=sharing&ouid=107165193522508782187&rtpof=true&sd=true)

https://docs.google.com/spreadsheets/d/1hVhk9cVZJJMJef5MITvNDaDI5FJ9oUWn/edit?usp=sharing &ouid=107165193522508782187&rtpof=true&sd=true [URL 🔗](https://docs.google.com/spreadsheets/d/1hVhk9cVZJJMJef5MITvNDaDI5FJ9oUWn/edit?usp=sharing&ouid=107165193522508782187&rtpof=true&sd=true)
