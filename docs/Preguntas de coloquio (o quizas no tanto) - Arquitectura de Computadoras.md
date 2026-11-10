## U1
#### (★) ¿Qué diferencia hay entre arquitectura (ISA) y microarquitectura? Da un ejemplo de dos micros con la misma ISA.

ISA es la interfaz abstracta entre el hardware del procesador y el software que puede ejecutar, definiendo las especificaciones que debe tener un programa para que el procesador lo ejecuta. Por otro lado, la microarquitectura refiere a como internamente esta organizado el procesador, el cual puede diferir para un mismo ISA a medida que avanza la tecnologia. Un ejemplo de dos chips con distinta microarquitectura son el Intel Core i7 y el AMD Ryzen, los cuales son procesadores x86-64 que internamente difieren en la cantidad de etapas del pipeline, algoritmos de prediccion, organizacion de memorias cache, etc.
#### ¿Por qué el Pentium 4 marca el fin de la carrera por la frecuencia?
Intel se encontro al menos dos razones que impedian aumentar la frecuencia en el desarrollo del Pentium 4:
- Con la tecnologia CMOS, la potencia dinamica (conmutacion y cortocircuito) dependen del voltaje y de la frecuencia. Al aumentar esta ultimo, aumenta el voltaje. Este aumento llego a superar los 100 Watts de consumo energetico, haciendo imposible enfriar el procesador con disipadores de aire convencionales.
- Para mejorar el throuput y poder aumentar la frecuencia, Intel diseño pipelines largos, llegando a las 20-22 etapas. Estos pipelines sufren una penalizacion cuando ocurren fallos de prediccion en saltos, donde pierden ciclos de reloj en vaciarse. 
Estos problemas detuvieron la carrera por los Gigahertz en monoprocesadores y apartir de los Intel Core 2 se volvio a los pipelines cortos, frecuencias moderadas y un mayor IPC, reorientando el presupuesto de transistores hacia la integracion de multiples nucleos.

#### Escribí la fórmula de potencia dinámica. ¿Qué término conviene bajar y por qué bajar V es tan efectivo?
$$P_d = N . V^2 . C . f . A$$
- N - > cantidad de transistores -> disminuirlo significa recortar la complejidad del la microarquitectura -> menos unidades funcionales, cache o nucleos.
- C -> capacitancia -> reducirla provoca que la carga electrica almacenada dure menos tiempo, exigiendo ciclos de refresco mas frecuentes.
- f -> frecuencia -> disminuiria la potencia de manera lineal solamente e impactaria negativamente en el rendimiento (sistema mas lento)
- A -> factor de actividad -> reducirlo implica que los transistores conmuten con menor freceuncia -> el sistema procesaria menos operacione utiles
- **V -> voltaje ->** conviene disminuirlo ya que es el factor cuadratico de la formula, teniendo un mayor impacto 

#### ¿De dónde sale la potencia estática y por qué crece al achicar el transistor? ¿Qué es power gating?
La potencia estatico es el consumo de energia que se produce incluso cuando los transistores no estan conmutando ni realizando trabajo util. Al miniaturizar la tecnologica, la potencia estatica se incrementa consuderablemente por razones fisicas:
- Al reducir la longitud del canal (distancia entre la fuente y el drenador), la barrera fisica de potencial disminuye, causando que la corriente subumbral aumente exponencialmente.
- El espesor de la capa de oxido que aisla la compuerta se veulve extremadamente delgado, favoreciendo el paso y la fuga de electrones a traves del aislante por el efecto tunel.
El power gating es una tecnica que desconecta de la fuente de alimentacion sectores que no estan en uso.
#### Nombrá tres técnicas power aware.
Las tecnicas power aware son las estrategias de microarquitectura para reducir y controlar el consumo energetico, tanto para la potencia dinamica como la estatica. Unas de ellas son:
- Clock gating -> deshabilita la señal del clock en ciertas partes del circuito para que los flops en esa parte no consuman energia.
- Power gating -> desconecta del PG aquellos sectores que no estan en uso del chip.
- Vt swap -> utiliza celdas de un umbral de voltaje mayor (mientras no afecte otros factores de timing) que no generan una mayor corriente de fuga.
#### (★) Tiempo de CPU = IC × CPI × T: ¿qué afecta a cada factor (compilador, ISA, microarquitectura, tecnología)?
* IC -> cantidad de instrucciones -> depende del algoritmo implementado, el lenguaje de programacion, la eficiencia del compilador y el ISA utilizado por el procesador.
* CPI -> ciclos por instruccion -> depende de la microarquitectura y de el ISA que se implementa.
* T -> periodo del clock -> depende de la tecnologia de fabricacion y de la microarquitectura que la utiliza
#### ¿Por qué MIPS (millones de instrucciones por segundo) es una mala métrica para comparar máquinas distintas?
MIPS depende del ISA utilizado ya que mide la cantidad bruta de isntrucciones ejecutadas por segundo, ignorando completamente que hace o cuanta potencia tiene c/u. Cada ISA requiere un numero de instrucciones distinto para un mismo problema y una ISA que en 4 instrucciones hace lo mismo que una que hace en una sola instruccion tiene mayor MIPS. Ademas, el mismo valor de MIPS puede variar en una misma computadoras ya que cada aplicacion tiene una cantidad de isntrucciones distintas.

#### Enunciá la Ley de Amdahl y calculá el speedup máximo si el 80 % del programa es paralelizable.
La ley de Amdahl establece que la mejora maxima de rendimiento que se alcanza al optimizar una sola parte del sistema esta limitada por la fraccion de tiempo que el sistema utiliza realmente esa mejora.
Si el 80% del programa se puede paralelizar, el maximo speedup es de:
$$Speed\ up_{max} = \frac{1}{1-fraccion\ paralelizable} = \frac{1}{0.2} = 5$$
#### ¿Por qué el retardo de las interconexiones no escala igual que el de los transistores?
El wire delay aumenta con la reduccion del tamaño de los transistores y el aumento de su densidad ya que las lineas metalizas de interconexion se vuelven mas delgadas, incrementando la resistencia electrica. A su vez, la capacitancia de acoplameito entre los cables adyacentes muy cercanos se mantiene elevada, impidiendo que el tiempo de propagacion, dado por RC, disminuya a la par de la velocidad del transistor. Ademas, para cubrir las mismas distancias fisicas a lo largo del chip, la señal necesita atravesar una cantiadad mayor de celdas, las cuales introducen retardos adicionales.