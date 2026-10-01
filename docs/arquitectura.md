# Arquitectura de Computadoras

Fecha de creación: 7 de agosto de 2026 20:18
Personas: MARIA WANDA MOLINA

## Generaciones del desarrollo de computadoras

### Primera generacion (1950)

- Tecnologia logica → tubos de vacio → las computadoras ocupaban aprox 1 millon de $m^3$
- Memoria de tambor magnetico y dispositivos de I/O como cintas de papel y magneticas.
- ENIAC (1945), EDSAC (1949), serie UNIVAC (1950)

### Segunda generacion (1960)

- Llegada de los transistores (1957)→ computadoras mas pequeñas, baratas y confiables
- Memorias de nucleo magnetico, terminales de texto, impresoras y tambores.
- Nacimiento de los lenguajes de programacion de alto nivel y el software de sistema.

### Tercera generacion (1970)

- Circuitos integrados (1965) de pequeña a media escala (SSI/MSI)
- Chips de memoria RAM/ROM, monitores de video y teclados integrados
- Familia IBM System 360 y PDP-11 → minicomputadoras economicas

### Cuarta generacion (1980)

- Integraciónn a gran y muy gran escala (LSI/VLSI) → procesador empaquetado en un solo chip
- Memorias rapidas integradas como SRAM (cache) y DRAM (memoria principal).
- Mouse, sonido, CD y capacidades de red en computadoras de escritorio y portátiles
- Computadoras personales (PC) → Apple e IBM
- Paralelismo a nivel de bits → arquitecturas de 4 bits a 8, 16, 32 y 64 bits

## Arquitectura Von Neumann

La arquitectura de Von Neumann es una familia de arquitecturas de computadoras que utilizan el mismo dispositivo de almacenamiento (memoria principal) tanto para las instrucciones como para los datos. La mayoría de computadoras modernas están basadas en esta arquitectura.

![image.png](Arquitectura%20de%20Computadoras/image.png)

### IPC

Instrucciones por ciclo → métrica que representa el numero promedio de instrucciones que un procesador es capaz de ejecutar en unúnicoo ciclo de reloj (busca que sea menor).

### ISA

Instruction Set Architecture describe la sintaxis y la semantica de la interfaz de una computadora: tipo y tamaño de operandos, estado del registro visible del programador, modelo de memoria, manejo de interrupciones y excepciones, instrucciones disponibles, etc.

### Performance

Se mide en flops, que es la cantidad de operaciones de punto flotante que se realizan por segundo. 

## Ley de Moore

Moore (1965) anticipó que la complejidad de los circuitos integrados se duplicaría cada año, acompañada de una reducción proporcional de sus costos. En 1975 ajustó su estimación, señalando que el número de transistores integrados en un chip de silicio se duplicaría aproximadamente **cada dos años** (frecuentemente citado también como un periodo de entre 18 y 24 meses). Esto permitio anticipar el diseño de los procesadore, disminuyendo sus costos y aumentando su rendimiento.

![image.png](Arquitectura%20de%20Computadoras/image%201.png)

Los retos de la ley son:

- Frecuencia vs corriente de fuga → el leakege aumente de forma cubica con la frecuencia → aumento de manera cubica de la disipacion
- Soft errors →  Este error se debe a que partículas ionizadas impactan contra la juntura de los
transistores; por ejemplo, si una partícula con cierta carga impacta una celda de memoria, esta puede generar un cambio de estado (por ejemplo, puede que haya un 0 donde antes había un 1).
    
    Al disminuir el tamaño de la juntura por los avances tecnológicos, la carga eléctrica de la juntura y su tamaño en comparación con la partícula ionizada se vuelven críticamente significativos. Por esta razón, a medida que aumenta la densidad de transistores en un chip, la cantidad relativa de *soft errors* se incrementa de manera exponencial.
    
- El aumento de la densidad de transistores se freno a partir del 2005 cuando aparecieron los multicores.
- Wire delay → retrasos para alcanzar un porcentaje del procesador en un ciclo, debidos a interconexiones internas en celdas de una FPGA.

## Consumo energético de procesadores

El procesador ingresa energía para transformar información. Sin embargo, no es una máquina en
el sentido tradicional, ya que la energía ingresada no realiza un trabajo útil en términos mecánicos,
sino que se convierte en calor.

- A menor tiempo de operación (mayor frecuencia, lograda mediante la inserción de más transistores más pequeños en una misma área), mayor será la potencia y, por lo tanto, mayor será la temperatura.
- A menor área del transistor, mayor será la densidad de potencia y mayor será la probabilidad
de fundir el transistor. Para no superar el limite de densidad de potencia (100W por centimetro cuadrado) que terminaria fundiendo el transistor se utilizan metodos de refrigeracion.

#### Componentes de la potencia

- **Potencia de conmutacion (Dinamica)**

Es la potencia capacitiva que se consume de manera activa cuando los transistores cambian de estado lógico

$P_{conmutacion} = C \cdot V^2 \cdot f$

donde *C* es la capacitancia, *V* el voltaje y *f* la frecuencia de reloj.

- **Potencia de fuga (Estatica)**

Es la potencia que el procesador consume constantemente "sin hacer nada", es decir, de manera pasiva incluso cuando no está conmutando. Se debe a que los transistores actuales no se pueden cerrar por completo y sufren fugas de corriente eléctrica

$P_{fuga} = I_{corte} \cdot V_{corte} + I_{saturacion} \cdot V_{saturacion}$

En los procesadores modernos de servidores, esta fuga llega a representar aproximadamente el 40% del consumo total

- **Potencia de cortocircuito**

Se produce momentáneamente cuando dos transistores complementarios que están en oposición conmutan. Durante el brevísimo instante de transición (uno pasa de corte a saturación y el otro viceversa), se genera un camino directo de baja resistencia a tierra (un cortocircuito).

La potencian dinámica de un circuito es:

$*P_{dinamica}=N⋅V^2⋅C⋅f⋅A*$

Donde:

- *N* es la cantidad de transistores.
- *V* es la tensión de alimentación (voltaje).
- *C* es la capacitancia de la carga.
- *f* es la frecuencia de reloj.
- *A* es el factor de actividad.

→ Manteniendo constantes los demás componentes, la potencia es directamente proporcional a la frecuencia. Esto aminora el rendimiento del procesador al procesar menos instrucciones por segundo.

→ Dado que el voltaje se encuentra al cuadrado en la fórmula de la potencia ($*V^2*$), cualquier incremento en la frecuencia que obligue a aumentar el voltaje de forma lineal provoca que **la potencia disipada por el dispositivo aumente de manera cúbica con la frecuencia (**$*P∝f^3*$**)**

Para mejorar el rendimiento teniendo en cuenta la maxima potencia que un dispositivo debe disipar se agregan cores simples y complejos.

### Tecnicas para manejar la potencia:

- **Clock Gating:** deshabilita el reloj en una parte del circuito, de manera que los flip-flops en esa parte no consuman energia.
- **Diferentes dominios de reloj para sectores que requieren frecuencias altas**
- **Cores simples →** consumo de menor energia en comparacion con los nucleos complejos
- **Transistores con distintos Vth →** optimizar el retardo y/o la potencia.
- **Power Gating →** desconecta de la fuente de alimentacion sectores que no estan en uso.
- **Ajustes dinamicos de voltaje y frecuencia** → mejorar la compensación potencia/rendimiento

### Cores simples vs complejos

**Cores simples →** ejecutan instrucciones en el orden en que se reciben, sin realizar reordenamiento de itnrsucciones, ejecucion especulativa ni prediccion de saltos. Consumo minimalista, menor numero de transistores. Eficientes en entornos de alto paralelismo a nivel de datos.

**Cores complejos →** maximizan el paralelismo a nivel de intrsuccion usando tecnicas de microarquitectura como ejecucion fuera de orden, ejecucion especulativa y prediccion de daltos, logrando mayor IPC. Mayor consumo energetico y disipacion de calor. Indispensables en tareas secuenciales.

A medida que se agregan más núcleos (cores), el throughput aumenta tanto para núcleos simples
como para complejos, aunque también lo hace la potencia. Sin embargo, los núcleos simples tienen un límite en cuanto a throughput, ya que no proporcionan un aumento adicional al incrementar la potencia, a diferencia de los núcleos complejos. En estos últimos, el throughput sigue aumentando con la potencia, aunque con un mayor consumo de energía.

→ Para un numero reducido de nucleos, es preferible que sean complejos ya que los simples no ofrecen un aumento significativo del rendimiento al incrementar la potencia.

→ En diseños con buen paralelismo y utilizando muchos nucleos, es preferible que sean simples ya que los complejos consumen mucha mas energia.

### ¿Como bajar el consumo?

$*P_{dinamica}=N⋅V^2⋅C⋅f⋅A*$

→ Reducir la frecuencia →  reduce la cantidad de intrucciones x segundo → menor rendimiento

→ Reducir la V de alimentacion → disminuye la frecuencia de operacion y menos tolerante a ruido

→Reducir cantidad de transistores → disminuye el rendimiento del sistema

→ Reducir la capacitancia → menor duracion de almacenamiento en la RAM → mayor refresco

→ Reducir la actividad → menos operaciones → menor rendimiento

Siempre es preferible trabajar a la menor tensión posible para una misma frecuencia, ya que de lo contrario se gasta más energía y se disipa más potencia.

A medida que la tecnología avanza y los transistores se vuelven más pequeños, se necesita
atravesar una mayor cantidad de dispositivos para cubrir una misma distancia en el chip. Estos dispositivos adicionales actúan como líneas de transmisión, lo que introduce retardos adicionales en la propagación de señales a través del chip. Como resultado, aunque los chips más avanzados pueden contener más transistores, la fracción del chip que puede ser alcanzada en un solo ciclo de reloj se reduce. Esto implica que, con el avance de la tecnología, es más difícil mantener una comunicación rápida y eficiente entre diferentes partes del chip.

## Rendimiento

Se enfoca en la velocidad a la que se realiza una tarea determinada. 

Dependiendo del punto de vista del evaluador, el rendimiento se define de dos maneras principales:

- **Tiempo de respuesta (o Latencia):** Es el tiempo transcurrido entre el inicio y la finalización de una tarea individual. Es la métrica que más le interesa al usuario individual. Incluye los accesos a disco, accesos a memoria, operaciones de entrada/salida (E/S) y la sobrecarga del sistema operativo.
- **Productividad (o Throughput / Ancho de banda):** Es la cantidad total de trabajo o tareas completadas por unidad de tiempo. Es la métrica crítica para los administradores de centros de datos o servidores.

**Tiempo de ejecución:** intervalo de tiempo transcurrido desde que un usuario ejecuta un programa hasta que recibe la respuesta del sistema.

$Rendimiento = \frac{1}{Tiempo\ de\  ejecucion}$

**Performace:** indica cuantas veces un computador es mas rápido que otro de referencia.

$$
Performace = \frac{Rendimiento_A}{ Rendimiento_B} = \frac{Tiempo\ de\ ejecucion_A}{Tiempo\ de\ ejecucion_B}
$$

### Tiempo de CPU y CPI

**Tiempo de CPU →** tiempo que tarda el procesador en ejecutar un programa

$Tiempo\ de\ CPU = \frac{Ciclos\ de\ clock\ para\ un\ programa}{Frecuencia\ de\ clock}$

$$
Tiempo\ de\ CPU = \frac{Recuento\ de\ instrucciones * CPI}{Frecuencia\ de\ reloj}
$$

**Tiempo de CPI →** numero medio de ciclos de reloj por instrucción

$$
CPI = \frac{Ciclos\ de\ clock\ para\ un\ programa}{Cantidad\ de\ instrucciones}
$$

Cada uno de estos tres factores depende de diferentes componentes del sistema:

1. **Cantidad de instrucciones (Instruction Count - IC):** Es el número de instrucciones que realmente se ejecutan en un programa (conteo dinámico). Depende directamente del **algoritmo**, del **lenguaje de programación** y de la eficiencia del **compilador**, así como de la **arquitectura del conjunto de instrucciones (ISA)**.
2. **CPI (Ciclos por instrucción):** Es el promedio de ciclos de reloj que requiere una instrucción para completarse. Depende de la **ISA** y de la **organización del hardware** (microarquitectura), como la segmentación o la jerarquía de memoria.
3. **Tiempo de ciclo de reloj (o Frecuencia de reloj):** Es la duración de un pulso de reloj (ej. 0.25 ns para un reloj de 4 GHz). Depende de la **tecnología de fabricación de semiconductores** y de la **organización física del hardware**.

### Ley de Amdahl

La **Ley de Amdahl** es una regla que establece que la mejora máxima de rendimiento alcanzable al optimizar una sola parte de una computadora está estrictamente limitada por la fracción de tiempo que el sistema utiliza realmente dicha mejora. El speed up se calcula:

$$
Speed\ up = \frac{1}{(1-F_m)+\frac{F_m}{A_m}}
$$

$F_m$ es la fracción de tiempo que se puede utilizar la mejora y $A_m$ es la aceleración de esa mejora en especifico

#### Métricas para medir el rendimiento

- **MIPS (Millones de Instrucciones Por Segundo):** Definido como el número de instrucciones ejecutadas dividido por el tiempo de ejecución multiplicado por $10^6$. El peligro de los MIPS es que **pueden variar de forma inversa al rendimiento real**. Un compilador optimizador puede reducir significativamente el recuento de instrucciones totales eliminando operaciones rápidas; esto acelera el programa, pero como las instrucciones restantes son más complejas, el CPI promedio sube, provocando que la tasa de MIPS disminuya en el programa que corre más rápido. Además, los MIPS impiden comparar máquinas con diferentes ISAs.

$$
MIPS = \frac{Frecuencia\ de\ reloj\ (MHz)}{CPI}
$$

- **MFLOPS (Millones de Operaciones de Punto Flotante Por Segundo):** Es aplicable únicamente para software con cálculos científicos intensivos. No es una métrica consistente porque diferentes máquinas implementan diferentes operaciones complejas de punto flotante en hardware (como raíz cuadrada o senos), haciendo que el número de instrucciones físicas requeridas varíe sustancialmente.

$$
MFLOPS = \frac{Número\ de\ operaciones\ de\ punto\ flotante\ de\ un\ programa}{Tiempo\ de\ ejecución\ × 10^6}
$$

## Benchmark

Un **benchmark** (o programa de prueba) es un programa o conjunto de programas específicamente diseñados para evaluar y comparar el rendimiento (desempeño o prestaciones) de diferentes computadores o arquitecturas.

De la ejecución de un benchmark se esperan principalmente dos cosas:

- **Medir y refinar:** Permite analizar y ajustar los componentes o la configuración de una arquitectura de hardware para maximizar su desempeño.
- **Prever el desempeño:** Ayuda a determinar qué arquitectura disponible es la óptima para ejecutar una aplicación específica con el rendimiento deseado antes de adquirir o construir el hardware

Los programas utilizados para medir el rendimiento se dividen en cuatro categorias:

- **Programas de juguete (*Toys*):** Son programas muy pequeños (de 10 a 100 líneas de código) con un resultado previamente conocido.
- **Benchmarks Sintéticos:** Son programas artificiales diseñados para imitar el perfil de instrucciones y el uso de operandos promedio de una gran base de aplicaciones reales.
- **Núcleos (*Kernels*):** Son fragmentos o bucles clave extraídos de aplicaciones reales que concentran la mayor parte del tiempo de ejecución.
- **Programas Reales:** Son aplicaciones completas de producción con entradas, salidas y opciones reales de usuario.

Para evitar sesgos y asegurar evaluaciones justas entre fabricantes, diversas organizaciones han desarrollado suites estandarizadas de benchmarks:

**SPEC (System Performance Evaluation Cooperative)**

Es una organización financiada por fabricantes de hardware que desarrolla conjuntos de pruebas basados en aplicaciones reales bajo estrictas reglas de ejecución

# Procesadores

Existen dos tipos de microprocesadores:

**RISC (Reduce Instruction Set Computer)**

Instrucciones de tamaño fijo, con un set reducido. Las instrucciones LD y ST son las unicas que pueden acceder a la memoria. 

**CISC (Complex Instruction Set Computer)**

Set de instrucciones amplio y complejo, muchas de ellas con posibilidad de acceder a memoria → dificulta el paralelismo. Procesadores CISC dividen las instrucciones complejas en varias instrucciones de tipo RISC.

## RISC-V

RISC-V es una arquitectura de conjunto de instrucciones (ISA) de código abierto regulada por la asociación sin fines de lucro RISC-V International. A diferencia de opciones propietarias tradicionales como ARM, MIPS o x86, su naturaleza abierta permite que cualquier entidad diseñe, fabrique y venda chips basados en ella sin pagar regalías. 

32 registros de proposito general (x0 a x31) → donde se realizan las operaciones aritmetico-logicas

Registro `x0` cableado a cero constante → read-only → simplifica instrucciones comunes

Memoria direccionable por byte → $2^{30}$ palabras de 32 bits → acceso a palabras completas requiere un desplazamiento de a 4 bytes. 

Filosofia Load-Store → operaciones registro a registro → solo operaciones Data Transfer acceden a memoria

### Repertorio de Instrucciones de RISC-V (Escalar)

A continuación se presentan las instrucciones escalares de RISC-V, categorizadas por su función:

#### A. Instrucciones Aritméticas

Estas instrucciones realizan cálculos matemáticos directos.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **Suma** (*Add*) | `add x5, x6, x7` | `x5 = x6 + x7` | Suma de tres operandos en registro. |
| **Resta** (*Subtract*) | `sub x5, x6, x7` | `x5 = x6 - x7` | Resta de tres operandos en registro. |
| **Suma inmediata** (*Add immediate*) | `addi x5, x6, 20` | `x5 = x6 + 20` | Se utiliza para sumar constantes (valores inmediatos). |

#### B. Instrucciones de Transferencia de Datos

Permiten mover información de longitud de palabra (32 bits), media palabra (16 bits) o byte (8 bits) entre la memoria RAM y los registros.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **Cargar palabra** (*Load word*) | `lw x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga una palabra (32 bits) de memoria a un registro. |
| **Cargar palabra sin signo** (*Load word, unsigned*) | `lwu x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga una palabra de memoria tratándola como valor sin signo. |
| **Almacenar palabra** (*Store word*) | `sw x5, 40(x6)` | `Memory[x6 + 40] = x5` | Almacena una palabra de un registro en memoria. |
| **Cargar media palabra** (*Load halfword*) | `lh x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga media palabra (16 bits) con extensión de signo. |
| **Cargar media palabra sin signo** (*Load halfword, unsigned*) | `lhu x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga media palabra (16 bits) con extensión de ceros. |
| **Almacenar media palabra** (*Store halfword*) | `sh x5, 40(x6)` | `Memory[x6 + 40] = x5` | Almacena media palabra (16 bits) de un registro en memoria. |
| **Cargar byte** (*Load byte*) | `lb x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga un byte (8 bits) con extensión de signo. |
| **Cargar byte sin signo** (*Load byte, unsigned*) | `lbu x5, 40(x6)` | `x5 = Memory[x6 + 40]` | Carga un byte (8 bits) con extensión de ceros. |
| **Almacenar byte** (*Store byte*) | `sb x5, 40(x6)` | `Memory[x6 + 40] = x5` | Almacena un byte (8 bits) de un registro en memoria. |
| **Cargar reservado** (*Load reserved*) | `lr.d x5, (x6)` | `x5 = Memory[x6]` | Carga y reserva; primera mitad de un intercambio atómico. |
| **Almacenar condicional** (*Store conditional*) | `sc.d x7, x5, (x6)` | `Memory[x6] = x5; x7 = 0/1` | Almacena condicionalmente; segunda mitad de intercambio atómico. |
| **Cargar inmediato superior** (*Load upper immediate*) | `lui x5, 0x12345` | `x5 = 0x12345000` | Carga una constante de 20 bits en los 20 bits de mayor peso. |

#### C. Instrucciones Lógicas

Realizan operaciones lógicas bit a bit.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **AND** | `and x5, x6, x7` | `x5 = x6 & x7` | Operación lógica AND entre tres registros. |
| **OR** (*Inclusive OR*) | `or x5, x6, x7` | `x5 = x6 | x7` | Operación lógica OR entre tres registros. |
| **XOR** (*Exclusive OR*) | `xor x5, x6, x9` | `x5 = x6 ^ x9` | Operación lógica XOR entre tres registros. |
| **AND inmediato** | `andi x5, x6, 20` | `x5 = x6 & 20` | Operación AND bit a bit entre un registro y una constante. |
| **OR inmediato** | `ori x5, x6, 20` | `x5 = x6 | 20` | Operación OR bit a bit entre un registro y una constante. |
| **XOR inmediato** | `xori x5, x6, 20` | `x5 = x6 ^ 20` | Operación XOR bit a bit entre un registro y una constante. |

#### D. Instrucciones de Desplazamiento

Mueven los bits de un registro a la izquierda o derecha.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **Desplazamiento lógico a la izq.** | `sll x5, x6, x7` | `x5 = x6 << x7` | Desplazamiento a la izquierda por registro. |
| **Desplazamiento lógico a la der.** | `srl x5, x6, x7` | `x5 = x6 >> x7` | Desplazamiento lógico a la derecha por registro. |
| **Desplazamiento aritmético a la der.** | `sra x5, x6, x7` | `x5 = x6 >> x7` | Desplazamiento aritmético (mantiene el bit de signo). |
| **Desplazamiento lógico izq. inmediato** | `slli x5, x6, 3` | `x5 = x6 << 3` | Desplazamiento lógico a la izquierda por constante. |
| **Desplazamiento lógico der. inmediato** | `srli x5, x6, 3` | `x5 = x6 >> 3` | Desplazamiento lógico a la derecha por constante. |
| **Desplazamiento aritmético der. inmediato** | `srai x5, x6, 3` | `x5 = x6 >> 3` | Desplazamiento aritmético a la derecha por constante. |

#### E. Instrucciones de Salto Condicional (Branch)

Bifurcan el flujo de ejecución si se cumple una condición relativa al PC.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **Saltar si igual** | `beq x5, x6, 100` | `if (x5 == x6) PC = PC + 100` | Salto relativo al PC si los registros son iguales. |
| **Saltar si no igual** | `bne x5, x6, 100` | `if (x5 != x6) PC = PC + 100` | Salto relativo al PC si los registros son distintos. |
| **Saltar si menor que** | `blt x5, x6, 100` | `if (x5 < x6) PC = PC + 100` | Salto relativo al PC si el primer reg. es menor con signo. |
| **Saltar si mayor o igual** | `bge x5, x6, 100` | `if (x5 >= x6) PC = PC + 100` | Salto relativo al PC si el primer reg. es mayor/igual con signo. |
| **Saltar si menor que (sin signo)** | `bltu x5, x6, 100` | `if (x5 < x6) PC = PC + 100` | Salto relativo al PC si el primer reg. es menor sin signo. |
| **Saltar si mayor o igual (sin signo)** | `bgeu x5, x6, 100` | `if (x5 >= x6) PC = PC + 100` | Salto relativo al PC si el primer reg. es mayor/igual sin signo. |

#### F. Instrucciones de Salto Incondicional

Bifurcan el flujo de ejecución sin condiciones.

| Instrucción | Ejemplo | Significado | Comentarios |
| --- | --- | --- | --- |
| **Saltar y enlazar** (*Jump and link*) | `jal x1, 100` | `x1 = PC + 4; PC = PC + 100` | Llamada a procedimiento relativa al PC; guarda retorno en `x1`. |
| **Saltar y enlazar registro** | `jalr x1, 100(x5)` | `x1 = PC + 4; PC = x5 + 100` | Retorno de procedimiento o llamada indirecta usando registro base. |

### Formatos de instrucción

Para que el hardware decodifique las instrucciones de 32 bits de longitud fija a velocidad, RISC-V organiza campos de bits para cada formato

#### R-Type

Se utiliza cuando una operación involucra exclusivamente registros. Se conforma de:

![imagen.png](Arquitectura%20de%20Computadoras/imagen.png)

- **`func7` (7 bits):** extensión del código de operación
- **`rs2` (5 bits):** segundo registro fuente
- **`rs1` (5 bits):** primer registro fuente
- **`funct3` (3 bits):** campo de código de operación adicional.
- **`rd` (5 bits):** registro destino donde se guarda el resultado.
- **`opcode` (7 bits):** especifica la operación básica y el formato.

#### I-Type

Se utiliza cuando el segundo operando es una constante inmediata o para instrucciones de carga a registros.

- **`inmediate` (12 bits):** almacena el valor de la constante inmediata o para instrucciones de carga.
- Los demas mantienen la misma estructura que el tipo R

![imagen.png](Arquitectura%20de%20Computadoras/imagen%201.png)

#### S-Type

Exclusivo para instrucciones que guardan datos en memoria

- **`inmidiate`** se divide en dos secciones dentro de la instrucción: **`immediate[11:5]`** (7 bits) e **`immediate[4:0]` .** Se hace esto para que los campos de los registros fuente (`rs1` y `rs2`) permanezcan exactamente en las posiciones que en las instrucciones tipo R.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%202.png)

`opcode` → primer campo a decodificar para saber que operacion es

### Ejemplo de traducción (C a maquina)

```c
A[30] = h + A[30] + 1
// Asumiendo que el registro x10 contiene
// la direccion base de la tabla A y x21 almacena la variable h
```

```nasm
lw  x9, 120(x10)    # Carga el valor de A[6] en el registro x9.
                    # (30 palabras * 4 bytes = offset 120 bytes)
add x9, x21, x9     # Suma el valor cargado (x9) con la variable h (x21).
addi x9, x9, 1      # Suma la constante inmediata 1 al resultado anterior.
sw  x9, 120(x10)    # Guarda el valor final de x9 de vuelta en la memoria en A[6].
```

Si miramos los valores decimales de los campos de estas instrucciones en el hardware:

| **Instrucción** | **Tipo** | **Inmediato / funct7** | **rs2** | **rs1** | **funct3** | **rd / imm** | **opcode** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **lw x9, 120(x10)** | **I** | **`120`** | - | **`10`** | **`2`** | **`9`** | **`3`** |
| **add x9, x21, x9** | **R** | **`0`** | **`9`** | **`21`** | **`0`** | **`9`** | **`51`** |
| **addi x9, x9, 1** | **I** | **`1`** | - | **`9`** | **`0`** | **`9`** | **`19`** |
| **sw x9, 120(x10)** | **S** | **`3`** *(bits superiores)* | **`9`** | **`10`** | **`2`** | **`24`** *(bits inferiores)* | **`35`** |

### Stored-program concept

Sentó las bases de la computación moderna

Describe que las instrucciones y datos se pueden almacernar en la memoria en forma de numeros:

- **Las instrucciones se representan como números:** Los comandos que el hardware entiende son simplemente colecciones de bits (ceros y unos) interpretados numéricamente
- **Los programas se almacenan en la memoria:** El código de máquina se aloja en el mismo sistema de memoria física para ser leído o escrito, exactamente igual que si fuesen datos

### Translating and starting a program

![imagen.png](Arquitectura%20de%20Computadoras/imagen%203.png)

- **Compiler →** Traduce el programa de un lenguaje de alto nivel a lenguaje ensamblador.
- **Assembler →** convierte el archivo de ensamblador en isntrucciones binarias de lenguaje maquina → genera el archivo objeto.
- **Linker →** junta los modulos objeto ensamblados y los vincula con rutinas de las bibliotecas → genera un archivo ejecutable
- **Loader →** rutina que lee el archivo ejecutable desde el almacenamiento secundario y lo transfiere a la memoria principal → reserva el espacio de direcciones, copia las instrucciones y datos, inicializa los registros de la CPU (incluyendo el puntero de pila o *stack pointer*) y salta a la rutina de inicio que finalmente llama a la función principal (**`main`**) del programa

## ALU

![imagen.png](Arquitectura%20de%20Computadoras/imagen%204.png)

Representacion binaria → signed y unsigned

### Signed

→ bit mas significativo para representar el (-) → representacion sign-magnitude → no usada → no se puede representar los $2^n$ numeros si no la mitad, tenemos 2 0 y es un quilombo sumar o restar o numero positivo y negativo

→ complemento de todo el numero +1 → complemento a 2 → ~(N) + 1

Aunque existen múltiples formas de representar números enteros (como signo-magnitud o complemento a 1), la industria de la computación adoptó universalmente el **Complemento a 2** para procesar enteros con signo.

Este estándar tiene propiedades matemáticas únicas que simplifican enormemente el hardware:

- El bit ubicado en el extremo izquierdo (el bit más significativo o MSB) actúa como indicador de signo (0 para positivos, 1 para negativos).
- Para cambiar el signo de un número (de positivo a negativo o viceversa), simplemente se invierten todos sus bits (operación NOT) y se le suma un 1.
- Cuando un operando inmediato de formato corto (por ejemplo, de 16 bits) debe sumarse a un registro de 32 bits, el hardware realiza una "extensión de signo", la cual consiste en replicar el bit de signo en los nuevos bits del extremo izquierdo, preservando intacto el valor del número.

## Datapath

Capitulo 4 →  [https://drive.google.com/file/d/1xpU6sqb-uW4pz7W-NJWF8rtHRt1SdwSP/view?usp=drive_link](https://drive.google.com/file/d/1xpU6sqb-uW4pz7W-NJWF8rtHRt1SdwSP/view?usp=drive_link)

Para todos los tipos de instruccion se realizan los mismo 2 primeros pasos:

- Enviar el PC a la memoria que contiene el codigo y cargar la instruccion desde esa memoria.
- Leer los registros usando los campos especificos de la instruccion.

Luego:

- Todas las instrucciones menos las de salto incodicional usan la ALU:
    
    → instrucciones de ref de memoria → calculo de la direccion
    
    → instrucciones aritmetico-logicas → ejecutar operacion
    
    → salto condicional → comparacion
    
- Con el resultado de la ALU:
    
    → instruccion de ref de memoria → acceder a memoria para r/w
    
    → instruccion aritmetico logica o carga → guardar el resultado o el leido de la memoria a un registro
    
    → instruccion de salto condicional → modificar la dirección de la sig instruccion (segun el resultado de la operacion)
    

Las unidades funcionales constan de dos tipos de elementos lógicos:

- **combinacionales →** las salidas dependen unicamente de los valores actuales de las entradas → ALU
- **elementos de estado (secuenciales) →** guardan el estado de la maquina cuando se reinician → memorias de instrucciones y datos, registros
    
    → tienen 2 entradas → valor del dato y el clock (determina cuando se almacena el dato)
    
    → 1 salida → valor almacenado en un ciclo anterior
    

**Sincronización por flanco:** cualquier valor almacenado en un elemento logico secuencial se actualiza unicamente en un flanco de reloj.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%205.png)

Todas las señales deben propagarse desde el elemento de estado 1, a través de la lógica combinacional hasta el elemento de estado 2 en un único ciclo de reloj. El tiempo necesario para que las señales alcancen el elemento de estado 2 define la duración del ciclo de reloj.

→ Si el elemento de estado no se actualiza en cada ciclo de reloj → agrega una señal de control write → junto con el clock determinan cuando se actualiza el elemento.

## Monociclo

![imagen.png](Arquitectura%20de%20Computadoras/imagen%206.png)

- **Unidades de memoria →** almacenan y suministran instrucciones/datos a partir de una dirección.
    
    A diferencia de la memoria de instrucciones, la de datos tiene 2 entradas, una para la direccion a obtener y otra para escribir en caso de instruccion store.
    
- **Program Counter (PC) →** almacena la dirección de la instrucción actual.
- **Sumadores** → 1 encargado de incrementar el PC para que apunte a la dirección de la siguiente instrucción y otro para instrucciones de salto.
- **Banco de registros** → colección de registros donde cualquiera de ellos puede leerse o escribirse especificando su numero → contiene el estado de los registros de la maquina.
    
    Lectura de registro → se necesita una entrada en el banco donde se especifique el número de registro que se quiere leer, así como una salida del banco donde se presentará el valor correspondiente.
    
    Escribir un registro → se necesitan dos entradas: una para especificar el número de registro donde escribir y otra para suministrar el dato. El banco de registros siempre devuelve en sus salidas los contenidos de los registros cuyos identificadores están en las entradas de los registros a leer.
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%207.png)
    
    3 inputs indicadores → Dos de ellas especifican los registros de origen que se van a leer (**`RA`** y **`RB`** o *Read registers*), y la tercera especifica el registro de destino donde se guardará el resultado (**`RW`** o *Write register*)
    
    2 outputs de datos → Permiten leer y extraer simultáneamente los valores de los dos registros de origen (`busA` y /`busB` o *Read data*) para enviarlos directamente a la ALU sin perder ciclos adicionales.
    
    Las entradas de los identificadores de registro son de cinco
    bits para especificar uno de los 32 ($32 = 2^5$) registros, mientras que los buses de la entrada y las dos salidas de datos son de 32 bits.
    
- **ALU →** Unidad Aritmetica Logica utilizada para el calculo en instrucciones y direcciones → entradas y salida de 32 bits + 1 bit zero

De este diagrama simplificado falta considerar:

- Ciertos componentes tienen entradas distintas dependiendo de la instrucción en ejecución:
    - PC: su entrada puede ser del primer sumador (instruccion anterior + 4) o del segundo (instrucción de salto → salida del primero + resultado del comparador)
    - Dato escrito en el banco de registro: puede venir de la salida de la ALU o de la memoria de datos.
    
    → Para esto de agregan multiplexores que a partir de señales de control se elige la entrada correcta.
    
- Varias unidades se deben controlar dependiendo del tipo de instrucción:
    - La memoria de datos debe leer en un load y escribir en un store.
    - Se escribe en el banco de registros ante una instrucción load y una aritmetico-logica.
    - La ALU debe realizar una de las tantas operaciones que puede hacer.
    
    → Teniendo como entrada la instrucción (es especial, los campos de las mismas), una nueva unidad de control para todas las demás unidades del datapath
    

![imagen.png](Arquitectura%20de%20Computadoras/imagen%208.png)

En este primer diseño, cada instrucción inicia su ejecución en un flanco de reloj y completa la ejecución en el siguiente flanco de reloj.

→ Se agrega al diseño una unidad de extension → de 16 bits a un valor signado de 32bits

### Ejecucion de instrucciones de salto condicional

Para instrucciones de salto condicional (branch):

- La direccion de la siguiente instruccion en orden secuencual es la que se utiliza como base de calculo de la direccion de destino → usa la salida del sumador que hace PC + 4
- En RISC-V, el valor inmediato en las instrucciones de salto condicional (formato Tipo B o *Branch*) e incondicional (formato Tipo J como **`jal`**) se desplaza **solo 1 bit a la izquierda** (lo que equivale a multiplicar por 2). RISC-V fue diseñada para ser una arquitectura modular y moderna que soporta la extensión de instrucciones comprimidas de **16 bits (2 bytes)**. Debido a que las instrucciones pueden medir 2 o 4 bytes, el contador de programa (PC) debe ser capaz de saltar a direcciones alineadas a **media palabra** (múltiplos de 2).

Además de calcular la dirección destino del salto, también se debe determinar
si la siguiente instrucción a ejecutar es la que sigue secuencialmente o la situada en la dirección destino del salto:

→ salto tomado → operandos son iguales, la direccion calculada se carga en el PC

→ salto no tomado → operandos diferentes → PC incrementado +4 

![imagen.png](Arquitectura%20de%20Computadoras/imagen%209.png)

### Unidad de control

Esta tabla muestra los valores de las señales de control para las instrucciones básicas del datapath monociclo de RISC-V (R-format, lw, sw, beq) basadas en el estándar de Patterson & Hennessy (RISC-V Edition):

| **Instrucción** | **ALUSrc** | **MemtoReg** | **RegWrite** | **MemRead** | **MemWrite** | **Branch** | **ALUOp1** | **ALUOp0** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Tipo-R** (add, sub, etc.) | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 |
| **lw** (load word) | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| **sw** (store word) | 1 | X | 0 | 0 | 1 | 0 | 0 | 0 |
| **beq** (branch equal) | 0 | X | 0 | 0 | 0 | 1 | 0 | 1 |

**Descripción del efecto de cada señal en RISC-V:**

| **Señal** | **Efecto cuando es 0 (Desactivada)** | **Efecto cuando es 1 (Activada)** |
| --- | --- | --- |
| **ALUSrc** | El segundo operando de la ALU proviene del segundo registro leído (**`Read data 2`**). | El segundo operando de la ALU es el inmediato generado por el bloque **`ImmGen`**. |
| **MemtoReg** | El valor que se escribe en el banco de registros viene del resultado de la ALU. | El valor que se escribe en el banco de registros viene de la memoria de datos (**`Read data`**). |
| **RegWrite** | No ocurre ninguna escritura en el banco de registros. | El registro destino seleccionado por el campo **`rd`** se escribe con el dato de entrada. |
| **MemRead** | No ocurre ninguna lectura en la memoria de datos. | Se lee el contenido de la memoria de datos en la dirección calculada por la ALU. |
| **MemWrite** | No ocurre ninguna escritura en la memoria de datos. | Se escribe el valor de **`Read data 2`** en la dirección de la memoria de datos. |
| **Branch** | No es un salto condicional. El PC avanza secuencialmente (*PC*+4). | Indica que es una instrucción de salto condicional (se combina con **`Zero`** de la ALU para saltar). |
| **ALUOp[1:0]** | **`00`**: Suma (para loads/stores), **`01`**: Resta (para saltos), **`10`**: Operación tipo R (según **`funct3`**/**`funct7`**). |  |

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2010.png)

#### Deficiencia del monociclo

→ La instruccion mas lenta (tipicamente la de carga) determina el ciclo del clock → las instrucciones mas cortas desaprovechan una enorme cantidad de tiempo esperando a que termine el ciclo.

→ Dado a que todo debe resolverse en un ciclo, ningun recurso de hardware (ALU, memoria), puede usarse mas de una vez por instruccion → separa la memoria en dos (instrucciones y datos), duplicar sumadores para el PC → mayor area.

## Multiciclo

- Divide el combinacional en varias etapas → permite aumentar la frecuencia ya que lo que tarda en viajar el dato  por el combinacional (path delay) se acorta
- Podemos tener una sola ALU y una sola memoria si en cada ciclo se utiliza para algo distinto → en monociclo teniamos  una para las instrucciuones, otra para calcular los saltos condicioneales y la que calculo la siguiente instruccion de PC.
- Aparecen secuenciales entre combinacionales → guardan el estado entre cada ciclo → registros invisibles
- Se busca que cada etapa sea pareja con las demas → misma cantidad de combinacionales o path delay

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2011.png)

Registros intermedios de almacenamiento cuya carga está sincronizada con el clock:

- **IR (Instruction Register):** Retiene la instrucción leída para que las señales de control sigan activas en los ciclos posteriores.
- **MDR (Memory Data Register):** Almacena temporalmente los datos leídos de la memoria.
- **A y B:** Retienen los operandos leídos del banco de registros.
- **ALUOut (o registro Z):** Almacena el resultado calculado por la ALU en el ciclo precedente antes de ser escrito en el banco de registros o en la memoria

### Monociclo vs Multiciclo

- La frecuencia del clock en multiciclo es mas alta que en monociclo → el ciclo del clock debe ser lo suficientemente largo para cubrir la etapa mas lenta, no la instruccion completa.
- Monociclo tiene un CPI = 1 mientras que el multiciclo tiene un CPI promedio entre 3 y 5 → depende de las instrucciones.
- El rendimiento global de la máquina multiciclo es superior y mucho más eficiente frente a la inclusión de instrucciones complejas (como la división o multiplicaciones en punto flotante) que arruinarían por completo el período del reloj de una máquina monociclo.

El Fan-out of Four (F04) es un concepto utilizado en diseño microelectrónico que se refiere a
la condición en la que una puerta lógica, típicamente un inversor, tiene su salida conectada a cuatro puertas lógicas idénticas a ella (o a una carga capacitiva equivalente).

Retardo F04: Es el retardo de propagación de una compuerta lógica con una carga que es el
cuádruple de la suya propia. Se utiliza como una medida del retardo de una etapa en el pipeline y es independiente de la tecnología.

### Etapas de ejecucion

La ejecucion de una instruccion de divide secuencialmente en etapas que duran 1 ciclo de reloj c/u

**Búsqueda de instrucción (Instruction Fetch):** En esta etapa, se busca la instrucción en la
memoria. Esto se representa con la instrucción: IR ← Memoria(PC) donde PC es el contador de
programa que apunta a la instrucción actual. Luego, el contador de programa se incrementa en
4 para apuntar a la siguiente instrucción: PC ← PC + 4

**Decodificación y lectura de registros (Decode/Register Fetch):** En esta etapa, se leen
los registros fuente dependiendo del tipo de instrucción. Si la instrucción es de tipo R o I, se
leerán los registros rs y rt: A ← BR(rs), B ← BR(rt).
También se decodifica el tipo de operación para dirigir el flujo de control.

**Ejecución (Execution):**

- Para las instrucciones de tipo R (aritméticas o lógicas), se realiza la operación indicada por
el campo funct: ALUout ← A funct B
- Para las instrucciones de carga (lw) y almacenamiento (sw), se calcula la dirección de
memoria sumando el valor del registro A con la extensión del inmediato: ALUout ← A +
SignExt(immed)
- Para las instrucciones de rama condicional (beq), se resta A de B y se comprueba si el
resultado es cero: A − B

**Acceso a memoria (Memory Access):**

- Para las instrucciones de carga (lw), se accede a la memoria y se almacena el valor en un
registro temporal: MDR ← Memoria(ALUout)
- Para las instrucciones de almacenamiento (sw), el valor de B se escribe en la dirección de
memoria calculada: Memoria(ALUout) ← B

**Escritura de resultados (Write-back):**

- Para las instrucciones de tipo R, el resultado de la ALU se escribe en el registro de destino:
BR(rd) ← ALUout
- Para las instrucciones de carga (lw), el valor cargado desde la memoria se escribe en el
registro de destino: BR(rt) ← MDR

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2012.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2013.png)

## Pipelining

Es una técnica de implementación de microprocesadores mediante la cual se solapa la ejecución de múltiples instrucciones. Esta técnica se basa en el hecho de que la ejecución de una instrucción se divide en varias fases o etapas secuenciales, de las que se encargan distintas partes dedicadas del hardware.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2014.png)

Esto mejora el throughput → cantidad de instrucciones ejecutadas por ciclo de reloj.

→ Toma ventaja del paralelismo existente entre las acciones necesarias para ejecutar una instruccion.

→ El ciclo esta determinado por el tiempo requerido de la etapa mas lenta. El tiempo por instruccion de un procesador pipelineado es;

$$
\frac{Tiempo\ por\ instruccion}{Numero\ de\ etapas}
$$

A partir de cierta cantidad de etapas, el rendimiento comienza a decrecer debido a:

- A medida que el pipeline se profundiza, cada vez que se produce un problema en el que se debe vaciar el pipeline, como un salto o una excepción, se perderá más cantidad de instrucciones, lo cual afecta negativamente al rendimiento.
- Los pipelines deben transferir la información desde un latch (circuito en el que la entrada pasa a la salida después de un ciclo de reloj) de una etapa a la siguiente, lo que consume una cantidad de tiempo significativa en relación con el retardo producido por la etapa

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2015.png)

Para implementarlo:

- todos los ciclos deben durar lo mismo
- todas las instrucciones deben pasar por la mismas etapas → si no terminarían fuera de orden

#### Consideraciones

→ Las instrucciones LOAD constan de las 5 fases de ejecución mientras que las tipo R solo de 4 (no requieren acceder a memoria→ MEM) → para evitar inconsistencias, se añade una etapa adicional MEM en la cual no se realiza ninguna operacion pero garantiza que todas las isntrucciones pasen por el mismo numero de etapas.

→ La lectura de registros ID ocurre en un flanco de reloj, mientras la escritura WB ocurre en otro flanco → se desperdicioa medio ciclo ya que ambas oepraciones no pueden superponerse

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2016.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2017.png)

Se divide el banco de registros en dos partes lógicas: la lectura de registros durante la etapa ID y la escritura en registro durante la etapa WB. Para representar este doble uso, en la etapa ID
se dibuja la mitad izquierda del banco de registros sin sombrear y con líneas discontinuas, ya que no está siendo escrito, mientras que en la etapa WB es la mitad derecha del banco de registros la que se dibuja sin sombrear y con líneas discontinuas, ya que no está siendo leído.

Para separar fisicamenta estas etapas y asegurar que las instrucciones no interfieran entre si en el mismo ciclo de reloj, se colocan registros de segmentacion en las lineas divisorias. Conservan los datos y las señales de control de una instruccion apra que la siguiente etapa pueda utilizarlos en le proximo ciclo de clock.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2018.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2019.png)

Las señales de control que se obtienen de la instrucción en la etapa ID pueden ser requeridas
en etapas posteriores, por lo que se transmiten a través del pipeline mediante registros. De esta
manera, para una misma señal de control, existen múltiples variantes según la etapa en la que
se encuentren. Ejemplo: Write_Reg_ID, Write_Reg_EX, Write_Reg_MEM, Write_Reg_WB.

Realizar el control significa activar las nueve líneas de control a estos valores en cada etapa para cada instrucción. La manera más simple de hacerlo es extendiendo los registros de segmentación para incluir la información de control. Ya que las líneas de control empiezan en la etapa EX, se puede crear la información de control durante la descodificación de la instrucción. Las señales de control se usan en la etapa de segmentación adecuada mientras la instrucción avanza por el pipeline.

### Pipeline hazards

Situaciones físicas en las que als instrucciones consecuticas en el pipeline no puede ejecutarse en el siguiente ciclo de reloj

#### Structural Hazards

Ocurre cuando el hardware no puede soportar la combinaciond e isntrucciones que se pretende ejecutar simultaneamente en el mismo ciclo de reloj porque compiten por el mismo recurso fisico.

Si el procesador utiliza un único banco de memoria unificado para instrucciones y datos, la etapa de búsqueda de instrucción (IF) de una instrucción posterior entrará en conflicto físico con el acceso a datos (MEM) de una instrucción de carga (load) o almacenamiento (store) previa.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2020.png)

Se genera si el puerto de escritura en el banco de registros (**`WB`**) es requerido al mismo tiempo por una instrucción, mientras otra instrucción en la etapa de decodificación (**`ID`**) intenta leer los registros de origen

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2021.png)

**Solucion de riesgos estructurales**

Duplicar físicamente los recursos de hardware:

- Para la memoria → Se utiliza una memoria para las instrucciones y otra para los datos, de manera que se puedan leer datos e instrucciones al mismo tiempo.
- Para los registros → Se emplean dos puertos de lectura en el banco de registros para poder leer dos registros simultáneamente o se divide el ciclo de reloj en dos: medio ciclo para la escritura y medio ciclo para la lectura, de forma que se pueda leer y escribir un registro en el mismo ciclo.
- Para la ALU → se agrega sumadores

#### **Data Hazards**

Surgen debido a dependencias de datos entre instrucciones que se ejecutan simultáneamente en el pipeline. Ocurren cuando un operando se intenta leer o escribir antes de que esté listo. Se dividen en tres tipos:

**RAW - Read After Write**

Ocurre cuando una instrucción posterior intenta leer el contenido de un registro antes de que una instrucción anterior haya escrito su resultado en él

```nasm
sub $2, $1,$3    # sub escribe en registro $2
and $12,$2,$5    # 1er operando($2) depende de sub
or $13,$6,$2     # 2º operando($2) depende de sub
add $14,$2,$2    # 1er($2) y 2º($2) depende de sub
sw $15,100($2)   # Base ($2) depende de sub
```

Las últimas cuatro instrucciones dependen todas del resultado de la primera instrucción, guardado en el registro $2.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2022.png)

Los valores que se leen del registro $2 no representarían el resultado de la instrucción sub a menos que la lectura del registro se hiciera durante el ciclo 5 o después.

**Soluciones para RAW**

- Cuando la primera instruccion es tipo R (ejemplo):
    
    Forwarding → Consiste en no esperar a que la instrucción previa escriba físicamente el banco de registros. En cuanto la ALU calcula el resultado en la etapa **`EX`**, este dato es enviado a través de multiplexores y rutas físicas de realimentación directamente a las entradas de la ALU para la instrucción dependiente en el ciclo siguiente.
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2023.png)
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2024.png)
    
    Si ocurre un riesgo de lectura después de escritura (LDE), se debe cortocircuitar la salida de la ALU (de la primera instrucción) con la entrada de la ALU (de la segunda instrucción). 
    
    **EX Hazard (Riesgo en la etapa de Ejecución)**
    
    Ocurre cuando la instrucción **inmediatamente anterior** (la que está un ciclo más adelante, en la etapa de memoria **MEM**) tiene el dato que la instrucción actual (en la etapa **EX**) necesita calcular en la ALU
    

```c
// 1. EX hazard:
if (EX/MEM.RegWrite 
and (EX/MEM.RegisterRd ≠ 0) 
and (EX/MEM.RegisterRd = ID/EX.RegisterRs1)) ForwardA = 10
if (EX/MEM.RegWrite
and (EX/MEM.RegisterRd ≠ 0)
and (EX/MEM.RegisterRd = ID/EX.RegisterRs2)) ForwardB = 10
```

Si la instrucción en MEM escribe un registro (RegWrite = 1), este no es el registro cero, y su destino (RegisterRd) coincide con el primer operando fuente de la ALU (RegisterRs1), entonces ForwardA = 10. **ForwardA = 10** configura el multiplexor para que la ALU **no lea el dato viejo del banco de registros**, sino que tome el resultado recién calculado en el ciclo anterior directo desde el registro de acoplamiento **`EX/MEM`**

**MEM Hazard (Riesgo en la etapa de Memoria)**

Ocurre con una instrucción **dos ciclos más vieja** (la que está en la etapa de escritura **WB**). El dato ya pasó la ALU y la memoria, pero aún no se ha consolidado en el banco de registros en el momento exacto en que la instrucción en la etapa **EX** lo necesita.

```c
// 2.MEM hazard:
if (MEM/WB.RegWrite
and (MEM/WB.RegisterRd ≠ 0)
and (MEM/WB.RegisterRd = ID/EX.RegisterRs1)) ForwardA = 01
if (MEM/WB.RegWrite
and (MEM/WB.RegisterRd ≠ 0)
and (MEM/WB.RegisterRd = ID/EX.RegisterRs2)) ForwardB = 01
```

Si la instrucción en WB escribe un registro, no es el registro cero, y su destino coincide con el operando que la ALU necesita actualmente (RegisterRs1), se activa ForwardA = 01. **ForwardA = 01** configura el multiplexor de la ALU para tomar el dato desde el registro de acoplamiento **`MEM/WB`** (donde ya se encuentra el dato cargado de memoria o el resultado de una instrucción ALU anterior)

- Cuando la priemra instruccion es de tipo I
    
    El dato no está disponible físicamente hasta el final de la etapa de acceso a memoria (MEM), que es demasiado tarde para la etapa EX de la instrucción inmediata posterior. Esto no puede resolverse solo con forwarding y requiere que una Unidad de Detección de Riesgos inserte obligatoriamente un ciclo de burbuja (stall) en el pipeline.
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2025.png)
    
    Un **stall** (también conocido como **burbuja**, **detención** o **bloqueo** del pipeline) es un ciclo de reloj de inactividad que se introduce en la segmentación de un procesador para resolver un riesgo (*hazard*). Una unidad de detección de riesgos congela el avance de las primeras etapas del procesador (impidiendo que cambien el contador de programa **`PC`** y el registro de segmentación **`IF/ID`**), obligando al procesador a esperar. A diferencia de una instrucción **`NOP`** (que viaja de principio a fin por todo el cauce sin hacer nada), un *stall* consiste en congelar una etapa específica mientras se permite que las etapas posteriores sigan avanzando para que produzcan el resultado que destrabará la dependencia.
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2026.png)
    
    Si se hace calculo adelantado de direccion (ALU para salto) y se utiliza una sireccion que se esta calculando en una etapa anterior, se puede considerar llevar el Forwarding Unit a una etapa antes.
    
- **Solución por Software (Reordenación de Código):** El compilador puede reordenar instrucciones independientes situando otras operaciones útiles entre el **`load`** y la instrucción que utiliza su registro, evitando así que el procesador se detenga.

**WAR - Write After Read** 

Se produce cuando una instrucción posterior intenta escribir en un registro de destino antes de que una instrucción anterior haya leído el valor previo de ese registro.

No ocurre en pipelines estáticos en orden (como DLX o RISC-V básico) porque todas las lecturas de registros se realizan de forma temprana (etapa ID) y las escrituras al final (etapa WB). Aparece únicamente en arquitecturas que permiten la ejecución fuera de orden.

**WAW - Write After Write** 

Sucede cuando una instrucción posterior intenta escribir en un registro antes de que una instrucción previa haya escrito en ese mismo registro

Solo se presenta en pipelines que escriben en más de una etapa o que admiten ejecuciones con latencias variables (como operaciones multiciclo de Punto Flotante o ejecución fuera de orden)

#### **Control Hazards**

Surgen de la necesidad de tomar **decisiones de control de flujo** (bifurcaciones y saltos condicionales `branch`) cuando las instrucciones consecutivas ya han sido buscadas secuencialmente en el pipeline sin conocerse aún si el salto será efectivo o no.

Si un salto es tomado (*taken*), las instrucciones que se buscaron secuencialmente detrás de él en el pipeline son incorrectas y deben ser descartadas (vaciado del cauce o *pipeline flush* convirtiéndolas en instrucciones NOP). Esto inyecta costosos ciclos de stall al procesador.

**Soluciones para riesgos de control**

- **Stall on Branch:** Una opción para manejar los riesgos de control es bloquear o detener el pipeline (stall) hasta que se conozca cuál será la siguiente instrucción que se debe leer en la memoria durante la etapa de IF.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2027.png)

- **Assume Branch Not Taken:** Consiste en continuar buscando instrucciones secuencialmente asumiendo que el salto nunca se tomará. Si el salto no se toma, el rendimiento es óptimo (0 ciclos de penalización); si se toma, se descartan las instrucciones cargadas por error rellenando el pipeline con burbujas y reiniciando la búsqueda en la dirección destino.
- **Delayed Branch:** Otro esquema de manejo de saltos consiste en retardar el salto una instrucción. Esto implica que, después de la instrucción de salto, se genera un ciclo de retardo (delay slot), en el cual generalmente se ejecuta la instrucción siguiente al salto, independientemente de si el salto se realiza o no. De esta manera, se consigue el tiempo necesario para obtener el resultado de la decisión del salto.
    1. Rellenar con alguna instrucción independiente anterior al salto. Esta es la mejor opción.
    2. Rellenar con alguna instrucción ubicada en el destino del salto (suponer salto tomado). Útil en bucles.
    3. Rellenar con alguna instrucción que siga al salto (suponer que el salto no fue tomado). Útil en condiciones IF-ELSE.
- **Predicción de saltos (** **Branch Prediction** **)**:
    - **Estática**: Aplicar una regla fija fijada en tiempo de compilación (por ejemplo, predecir siempre "no tomado", "tomado", o según la dirección hacia adelante/atrás del salto).
    - **Dinámica**: Usar tablas de historial en tiempo de ejecución (como contadores de 2 bits o el *Branch Target Buffer* / BTB) para predecir si el salto se tomará según su comportamiento reciente.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2028.png)

### Excepciones en RISC V

**Excepcion:**  cambio inesperado en el flujo normal de ejecucion de las instrucciones, sin importar si la causa es interna o externa. Son sincronas (en sincronia con la ejecucion de instrucciones).

**Interrupcion:** es un tipo especifico de excepcion que es de origen externo al procesador. Son asincronas (ocurren independientemente de la ejecucion del programa)

Las excepciones invocan servicios del SO del programa de usuario: Se anulan las escrituras de la instruccion que causo la excepcion y se guardan las instrucciones siguientes hasta la etapa MEM. Luego se llama a la rutina de gestion de excepciones. Se requiere que todas las instrucciones anteriores a la excepcion se completen correctamente, la instruccion que produjo la excepcion debe ser tratada y las instrucciones siguientes deben considerarse como si no hubieran comenzado. 

Las expciones causadas en cada estapa del pipeline son:

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2029.png)

#### Flujo de manejo de excepciones en el pipeline

Para gestionar estos eventos, RISC-V (en su modo Supervisor) utiliza registros específicos de control y estado:

- **SEPC (*Supervisor Exception Program Counter*):** Registro que guarda de forma automática la dirección de la instrucción que causó la excepción.
- **SCAUSE (*Supervisor Exception Cause Register*):** Registra el código o motivo exacto por el cual ocurrió la excepción (por ejemplo, código **`2`** para instrucción no definida o **`12`** para fallo de hardware).
- **STVEC (*Supervisor Trap Vector*):** Guarda la dirección de memoria donde se encuentra el manejador de excepciones del sistema operativo al que el procesador debe saltar.

En una implementación segmentada, las excepciones se tratan físicamente como un **riesgo de control**:

1. **Vaciado del cauce (*Pipeline Flush*):** Se aborta la instrucción causante de la falla y todas las instrucciones posteriores que venían detrás en el pipeline, convirtiéndolas en burbujas o instrucciones sin efecto (**`nop`**) mediante señales de control como **`ID.Flush`** y **`EX.Flush`**.
2. **Bloqueo de escrituras:** El hardware desactiva de inmediato cualquier señal que permita escribir en la memoria o en el banco de registros para la instrucción afectada, asegurando que no se corrompa el estado del procesador.
3. **Transferencia de control:** Se copia el PC de la instrucción afectada en **`SEPC`**, se registra la causa en **`SCAUSE`** y se salta a la dirección del manejador de excepciones almacenada en **`STVEC`**.
4. **Retorno:** Tras resolver el inconveniente, la rutina del sistema operativo ejecuta la instrucción especial **sret** (*Supervisor Exception Return*). Esta instrucción restablece el procesador al modo usuario y salta de vuelta a la dirección almacenada en **`SEPC`** para reiniciar la ejecución.

Es importante vaciar el pipeline antes de manejar la interrupción, ya que las instrucciones posteriores podrían generar excepciones. Si se retoma la ejecución después de la interrupción, estas
excepciones no existirían en el estado recuperado, lo cual podría generar inconsistencias.

#### Excepciones precisas

Son excepciones que, ante cualquier fallo, el hardware garantiza que **todas las instrucciones previas a la que causo la excepcion se completaron de forma correcta**, mientras que la **instruccion causante y las posteriores se descartan por completo** y se pueden reiniciar desde el principio como si nunca hubieran comenzado.

En un pipeline, al estar ejecutándose múltiples instrucciones a la vez, las excepciones pueden ocurrir **fuera del orden del programa**. Por ejemplo, una instrucción muy nueva en la etapa de búsqueda (**`IF`**) puede generar un fallo de página antes de que una instrucción más vieja en la etapa de ejecución (**`EX`**) cause un desbordamiento aritmético.

Si el procesador atendiera la excepción de la instrucción nueva de inmediato, rompería la secuencialidad, creando **excepciones imprecisas.**

Para implementar excepciones precisas sin perder rendimiento, el hardware utiliza un **vector de estado de excepciones** asociado individualmente a cada instrucción: a medida que la isntruccion avanza por las etapas del pipeline, si genera un fallo, el hardware activa un bit especifico en su vector de estado personal. Una vez que se marca un bit de excepcion en el vecto, se apagan todas las señales de control de esa isntruccion que puedan alterar los registros o la memoria fisica. El vector de estado solo se verifica cuando la instruccion llega al final de su camino, especificamente al inicio de la etapa de escritura **`WB`**. Al evaluarse en esta etapa final, las excepciones se atienden exactamente en el mismo orden cronologico en que ocurririan en un procesador no segmentado.

#### FP pipeline

Las operaciones punto flotante no se pueden completar en un solo ciclo de reloj dentro de la etapa de ejecucion **`EX`** . Por ello, la etapa de ejecucion se divide en multiples subunidades funcionales especializadas que operan en paralelo.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2030.png)

Físicamente, el procesador suele contar con una unidad entera, un sumador de FP, un multiplicador de FP y un divisor de FP. Los módulos como el sumador o el multiplicador de FP están divididos internamente en varias etapas de pipeline (por ejemplo, 3 o 4 etapas). Esto les permite tener un intervalo de iniciación de 1 ciclo de reloj; es decir, pueden recibir una instrucción de FP nueva en cada ciclo sin esperar a que la anterior termine. Sin embargo, otros modulos como el divisor no se suelen segmentar. Tienen latencias altísimas (de 24 a 36 ciclos) y bloquean la unidad por completo (su intervalo de iniciación es igual a su latencia), obligando a cualquier otra división de FP a esperar hasta que la actual finalice.

El hecho de tener instrucciones de FP en vuelo con duraciones tan dispares rompe la sincronización clásica del pipeline, introduciendo problemas complejos:

- Out-of-order-completion: cada unidad tarda un tiempo diferente.
- Aparecen los riesgos WAR y WAW: Por ejemplo, una instrucción rápida podría sobrescribir un registro destino antes de que una instrucción lenta previa haya terminado de calcular su valor
- Varias subunidades de FP pueden finalizar sus cálculos en el mismo ciclo, provocando una contención o colisión física al intentar escribir simultáneamente en el puerto del banco de registros.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2031.png)

## Paralelismo a nivel de instruccion (ILP)

Tecnica que consiste en explotar paralelismo entre instrucciones proximas en la secuencia. 

**Bloque basico:** secuencia de codigo sin saltos → un solo punto de entrada y salida → bloque pequeño → instrucciones con fuerte dependencia.

### Dependencia

Las **dependencias** son características intrínsecas de los programas que determinan el orden obligatorio en el que deben calcularse los resultados, imponiendo un límite al paralelismo que se puede obtener.

Se clasifican en tres tipos fundamentales:

#### **1. Dependencia de datos verdadera (LDE / RAW - Lectura Después de Escritura)**

Ocurre cuando una instrucción *j* depende del resultado de una instrucción anterior *i* porque necesita consumir ese dato.

- **Ejemplo:** `LD F0, 0(R1)` *(escribe en F0)* `ADDD F4, F0, F2` *(intenta leer F0)*

#### **2. Dependencias de nombre (Reutilización de almacenamiento)**

Ocurren cuando dos instrucciones utilizan el mismo registro o posición de memoria, pero **no hay una transmisión real de datos** entre ellas. Se pueden resolver mediante el renombrado de registros.

- **Antidependencia (EDL / WAR - Escritura Después de Lectura):** Una instrucción posterior *j* intenta escribir en un registro antes de que la instrucción anterior *i* lo lea, lo que haría que *i* lea un valor incorrecto.
    - *Ejemplo:* `ADDD F4, F0, F2` seguido de `LD F0, -8(R1)`.
- **Dependencia de salida (EDE / WAW - Escritura Después de Escritura):** Ambas instrucciones escriben en el mismo destino. Si se altera el orden, al final quedará almacenado el dato incorrecto.
    - *Ejemplo:* `ADDD F4, F0, F2` seguido de `SUBD F4, F3, F2`.

#### **3. Dependencias de control**

Determinan el flujo de ejecución del programa. Ocurren cuando la ejecución de una instrucción depende de la resolución de un salto condicional previo.

- *Ejemplo:* Las instrucciones dentro de un bloque `if` dependen de la condición evaluada en la cabecera del condicional.

Los mecanismos de ejecucion deben presercar el orden del programa → mismo resultado que en la ejecucion secuencial.

### Planificacion estatica

Se aplican en tiempo de compilación (las realiza el compilador). 

→ Ventaja: no agregan consumo ni complejidad de hardware. 

→ Desventaja: suelen ser menos eficientes porqueno pueden adaptarse a lo que ocurre en runtime (por ejemplo, un fallo de caché en un momento específico).

Ejemplo de for implementado en pipeline FP normal:

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2032.png)

1. **Planificación de instrucciones (Compiler/Instruction Scheduling):** El compilador reorganiza el orden físico de las instrucciones del código para ocultar latencias de las operaciones (como las esperas de instrucciones de carga o de la ALU de punto flotante) y así evitar paradas (*stalls* o burbujas) en el pipeline, asegurando que el resultado final sea idéntico.

***Planificación por el Compilador → máx(Paralelismo en ejecución)***

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2033.png)

2. **Desenrollado de bucles (Loop Unrolling):** Consiste en duplicar el cuerpo de un bucle varias veces en una sola iteración física.
    - **Ventajas:** Expone un bloque más grande de instrucciones independientes y elimina la sobrecarga (*overhead*) de control del bucle, reduciendo saltos y decrementos repetitivos.
    - **Desventajas:** Incrementa el tamaño del código binario (pudiendo provocar fallos en la caché de instrucciones) y genera una gran **presión sobre los registros**.
    
    ***Desenrollado de Bucles → mı́n(Paradas por riesgos de control)***
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2034.png)
    

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2035.png)

3. **Software Pipelining (Segmentación por software):** Es un "desenrollamiento simbólico" en el que se reorganiza el bucle de modo que el cuerpo ejecute instrucciones que pertenecen a **diferentes iteraciones** del bucle original al mismo tiempo (por ejemplo, intercalar el almacenamiento de la iteración \(i\), la suma de la iteración \(i-1\) y la carga de la iteración \(i-2\)).
    
    ![imagen.png](Arquitectura%20de%20Computadoras/imagen%2036.png)
    
    - **Ventajas:** Elimina las dependencias de datos (*stalls*) en el cuerpo del bucle sin aumentar significativamente el tamaño del código ni la cantidad de registros necesarios.
    - **Desventajas:** Requiere un código adicional (*overhead*) antes de ingresar al bucle para iniciar el flujo (llenar el pipeline o cabecera) y después de este para completarlo (vaciar el pipeline o cola).

---

### Planificacion dinamica

Son implementadas en hardware → no en tiempo de compilacion.

Consisten en la ejecucion fuera de orden → ejecutar instrucciones independientes apenas estan listas.

→ ejecucion fuera de orden → instrucciones terminan fuera de orden → no tengo excepciones precisas → problema*

Los riesgos estructurales se verifican al decodificar → las instrucciones comienzan cuando sus operandos estan disponibles.

- A diferencia de la planificación estática (el compilador lanza instrucciones sin poder resolver en ejecución todas las dependencias), en la dinámica el procesador modifica la secuencia en tiempo de ejecución, resolviendo dependencias sin cambiar el resultado final. Las instrucciones se ejecutan según la disponibilidad de datos y recursos, aprovechando el ILP cuando no hay dependencias.

**Excepciones imprecisas**

Una excepción es imprecisa si al momento de generarse el estado del procesador no es el mismo
que tendría si las instrucciones hubieran sido ejecutadas en orden.

→ El pipeline ya ha completado instrucciones que son posteriores en el orden secuencial del programa a la instrucción que genera la excepción.

→ El pipeline aún no ha completado instrucciones que son anteriores a la que genera la excepción.

### Algoritmo de Tomasulo

Método para manejar las dependencias de datos y mejorar la ejecución fuera de orden en procesadores. Desarrollado por Robert Tomasulo en 1967 para la unidad de punto flotante del procesador IBM 360/91.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2037.png)

Sus componentes fundamentales son:

**1. Cola de Instrucciones**

Las instrucciones se decodifican y se extraen en orden (FIFO) de esta cola para ser emitidas hacia las estaciones de reserva correspondientes.

**2. Estaciones de Reserva (ER / Reservation Stations)**

Son buffers de almacenamiento temporal asociados directamente a las entradas de cada **unidad funcional (FU)** (como sumadores o multiplicadores). Permiten que una instrucción se emita aunque sus operandos no estén listos, esperando allí sin bloquear la cola de instrucciones general.

Cada entrada de una estación de reserva tiene los siguientes campos de control:

- **Busy:** Indica si el *slot* está ocupado.
- **Op:** La operación aritmética o lógica a realizar.
- **Vj, Vk:** Los valores reales de los operandos fuente (si ya están disponibles).
- **Qj, Qk:** Las etiquetas (*tags*) de las estaciones de reserva que están calculando los operandos faltantes. Un valor de **`0`** indica que el operando correspondiente ya está listo en **`Vj`** o **`Vk`**.

**3. Banco de Registros (Register File)**

Cada registro de la arquitectura cuenta con un campo adicional llamado **Qi**.

- Si **Qi es igual a cero** (o vacío), significa que el registro contiene un valor válido y no hay instrucciones pendientes que vayan a escribir en él.
- Si **Qi tiene un valor distinto de cero**, contiene la etiqueta (o ID) de la estación de reserva que producirá el resultado final de ese registro. Cualquier instrucción posterior que necesite leer ese registro tomará la etiqueta **`Qi`** en lugar del valor físico, estableciendo una cadena de dependencias.

**4. Buffers de Carga (Load Buffers) y Almacenamiento (Store Buffers)**

Actúan como estaciones de reserva especializadas para la interfaz con la memoria de datos:

- **Load Buffers:** Retienen las instrucciones de carga pendientes, almacenando la dirección física de memoria y controlando su estado.
- **Store Buffers:** Retienen las instrucciones de almacenamiento de datos. Tienen campos para la dirección de destino y un campo **`Qi`**/**`Vi`** para esperar el valor que se va a guardar en memoria.

**5. Common Data Bus (CDB)**

Es un bus de comunicación común que conecta la salida de todas las unidades funcionales y de memoria directamente con las estaciones de reserva, registros y buffers de almacenamiento. Cuando una unidad termina su cálculo, **difunde el resultado en formato "Etiqueta + Valor"** por el CDB. Todos los componentes que estaban esperando esa etiqueta específica capturan el valor al mismo tiempo en un único ciclo de reloj, resolviendo dinámicamente las dependencias de datos.

### **Las Tres Etapas de una Instrucción**

Toda instrucción en este esquema se procesa a través de tres fases estrictas:

1. **Issue (Emisión):** Se extrae una instrucción de la cola FIFO. Si existe una Estación de Reserva libre correspondiente a la operación, la instrucción se emite. Si los operandos de origen ya están listos en el banco de registros, se copian directamente a la ER. Si no están disponibles, se copia el *tag* de la ER que los generará. Por último, se asocia el registro de destino de la instrucción al ID (etiqueta) de esta ER.
2. **Ejecución:** La instrucción espera pacientemente en su ER monitoreando el CDB. Cuando sus tags de origen \(Q_j\) y \(Q_k\) se vuelven cero (lo que indica que los operandos requeridos se han generado), la unidad funcional ejecuta físicamente la operación.
3. **Escritura de Resultados:** Una vez calculado el valor, la unidad funcional lo emite al CDB junto con la etiqueta de la ER que lo procesó. Todas las ER y registros que esperaban esa etiqueta absorben el dato al mismo tiempo. Finalmente, la estación de reserva se marca como libre.

**Ventajas:** 

- Evita riesgos de datos sin depender de planificación estática por software.
    - Permite realizar **desenrollado de bucles en hardware (*loop unrolling*)** de forma totalmente transparente para el programador y con un número muy reducido de registros arquitectónicos.

**Desventajas:** 

- Introduce una enorme complejidad física debido a las búsquedas asociativas en hardware.
- El CDB se convierte en el principal cuello de botella de rendimiento.
- Provoca **excepciones imprecisas** porque las instrucciones pueden finalizar desordenadamente respecto al programa.

planificacion estatica → se predicen saltos no tomados para abaratar → 1/6 de los saltos no se toman

### Prediccion

**Penalizacion de saltos**

La **penalización de saltos** (o *branch penalty*) es la pérdida de rendimiento (medida en ciclos de reloj o paradas) que sufre un procesador segmentado cuando se ejecutan instrucciones de salto, debido a que el flujo de instrucciones no es el que el pipeline esperaba (riesgo de control).

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2038.png)

Cada salto genera dos dificultades principales:

1. Incertidumbre del flujo: hasta resolver la condición, el procesador no sabe qué instrucción
cargar a continuación en el pipeline.
2. Cálculo de la dirección: en caso de tomarse el salto, se debe calcular la nueva dirección de
destino, lo que introduce demoras.

Es fundamental predecir correctamente los saltos, ya que una predicción precisa promete una ejecución continua del programa. Si la predicción falla, se pierden ciclos de reloj, lo que impacta negativamente en el rendimiento.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2039.png)

### Branch Target Address Cache

La BTAC (Branch Target Address Cache) es una memoria caché especial diseñada para acelerar el flujo de instrucciones en procesadores segmentados. Su propósito principal es almacenar la dirección de destino de los últimos saltos tomados, evitando que el procesador tenga que recalcular físicamente dicha dirección en cada instrucción de salto

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2040.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2041.png)

#### Prediccion fija

→ *Always taken:* mayor numero de aciertos de prediccion a mayor costo de hardware (Necesita almacenar la direccion de destino del salto).

→ *Always not taken:* menor numero de acietos a menor costo de hardware.

#### Prediccion basada en la direccion del salto

→ *Saltos hacia atras = taken*: la mayoria de los saltos hacia atras corresponden a bucles.

→ *Saltos hacia adelante = not taken:* la mayoria de los saltos hacia adelante corresponden a IF-THEN-ELSE

- Estas predicciones tienen mal comportamiento en programas con pocos bucles y muchos IF-THEN-ELSE

#### Prediccion basada en el OPCODE de la instruccion de salto

El salto es tomado para ciertos opcodes 

#### Prediccion dirigida por el compilador

→ segun el tipo de construccion de control

→ basada en profiling → predice segun el comportamiento de esa instruccion en ejecuciones previas

→ especificado por el programador → indica si el salto debe ser tomado o no

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2042.png)

### Predictores dinamicos

Se realizan observando el coportamiento de las instrucciones de salto en las ultimas ejecuciones (Historia local). Pueden ser predictores de un bit, 2 o 3.

(predicciones locales → sobre una instruccion → historia de ese salto → loops) ≠ globales (historia de varios saltos → if/else)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2043.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2044.png)

Estos predictores se pueden implementar de las siguientes maneras:

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2045.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2046.png)

Otras formas de gestionar la historia:

- Patrones repetitivos

El comportamiento de los ultimos saltos afecta a la prediccion actual. Almacenar el comportamiento de los ultimos n saltos y usarlos en la seleccion de la prediccion.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2047.png)

- Saltos recientes (historia global)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2048.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2049.png)

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2050.png)

Cuando llega una instrucción de salto (b1), se debe seleccionar un predictor de los dos para tomar la predicción. Esto se hace en base al último salto: si el mismo no fue tomado, se elige el primer predictor, si lo fue, se elige el segundo. En el caso de que la predicción falle, se debe actualizar el predictor que falló.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2051.png)

El **Tournament Predictor** (o Predictor de Torneo / Predictor Competitivo) es una técnica de **predicción dinámica híbrida.**

- **Predictor Local:** Evalúa la probabilidad de un salto basándose en el historial previo de ejecuciones de esa misma instrucción de salto específica. Es muy preciso para bucles (*loops*) y patrones repetitivos locales.
- **Predictor Global:** Predice el salto basándose en el comportamiento de los últimos M saltos ejecutados en el flujo general del programa (historia global o correlacionada). Es muy eficaz para estructuras condicionales interdependientes como secuencias de `if-then-else`.
- **El Juez (Selector o Meta-predictor):** Es una tabla de contadores saturados de 2 bits indexada por la dirección de la instrucción de salto (o por historia global). Su función es rastrear qué predictor ha dado los mejores resultados recientemente para cada salto en particular.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2052.png)

Los predictores globales son efectivos para las operaciones con enteros, pero no para operaciones de punto flotante, en las que funcionan mejor los predictores locales.

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2053.png)

La **recuperación de un fallo de predicción** (*misprediction recovery*) ocurre cuando el procesador ejecuta instrucciones de forma especulativa siguiendo el camino de un salto que predijo, pero al evaluarse la condición real descubre que la predicción fue incorrecta.

Para corregir este error y mantener la integridad del programa, el hardware lleva a cabo **dos tareas principales**:

1. Descarte de los resultados especulativos (*Flush* o Vaciado)

Mientras las instrucciones se ejecutan de manera especulativa, sus resultados **no modifican el estado arquitectónico** (es decir, ni los registros reales del procesador ni la memoria principal).

- **Almacenamiento temporal:** Los resultados provisionales se guardan en estructuras temporales, como los **registros de renombramiento** o el **Buffer de Reordenamiento (ROB)**.
- **Vaciado del cauce (*Pipeline Flush*):** Si la predicción falla, todos los resultados especulativos en los registros temporales se descartan. En pipelines simples, se ponen a cero las señales de control para transformar las instrucciones incorrectas en burbujas o instrucciones nulas (`NOP`).

2. Reanudación de la ejecución por el camino correcto

El procesador debe redirigir el flujo de control hacia las instrucciones verdaderas:

- **Carga de la dirección alternativa:** El procesador carga en el Contador de Programa (`PC`) la dirección de inicio del camino correcto.
    - Si había predicho *Taken* (tomado) y falló, la dirección correcta es la secuencia siguiente (*fall-through*).
    - Si había predicho *Not taken* (no tomado) y falló, la dirección correcta es la dirección destino (*target*) del salto.

Optimización: Reducción del retardo en la recuperación

Para minimizar la penalización en ciclos de reloj provocada por el fallo:

- **Prebúsqueda (*prefetching*):** Algunos procesadores no solo guardan la dirección del camino alternativo, sino que **prebuscan y almacenan las primeras instrucciones** de ese camino en buffers. De este modo, al detectar el fallo, las instrucciones correctas están inmediatamente disponibles sin esperar a leerlas desde la memoria o caché de instrucciones.

#### Ejecucion condicional de instrucciones

La **ejecución condicional** (o **ejecución predicada**) es una alternativa de diseño orientada a eliminar o reducir la cantidad de saltos condicionales (*branches*) en el flujo de un programa, convirtiendo dependencias de control en dependencias de datos.

En lugar de bifurcar el Contador de Programa (`PC`) mediante un salto, una instrucción de ejecución condicional combina en su propia estructura:

1. **Una condición** (denominada guarda o predicado).
2. **Una operación**.

- **Si la condición es verdadera:** la instrucción se ejecuta normalmente y confirma su resultado en los registros o memoria.
- **Si la condición es falsa:** la instrucción se anula internamente y se comporta como una operación nula (`NOP`), sin alterar el estado del procesador.

**Ejemplo:** En lugar de utilizar una secuencia con salto como `BNEZ R1, L; MOV R2, R3`, se emplea la instrucción `CMOVZ R2, R3, R1` (copia `R3` en `R2` únicamente si el contenido de `R1` es cero).

- **Ventajas:**
    - **Elimina las penalizaciones por fallo de predicción:** Al eliminar los saltos condicionales, el procesador no sufre vaciados del cauce (*flushes*) ni paradas (*stalls*).
    - Simplifica el flujo de control en estructuras condicionales cortas o simples.
- **Desventajas:**
    - **Consumo de ciclos en vano:** Las instrucciones cuya condición resulta ser falsa deben ser leídas y evaluadas igualmente en el cauce antes de descartarse, consumiendo ciclos de reloj y recursos de procesamiento.
    - **Mayor complejidad en el formato de instrucción:** Se requieren bits adicionales en la codificación de la instrucción para especificar el registro de predicado o la condición a probar.

#### Ejecucion con predicados

La **ejecución con predicados** (o **ejecución predicada**) es una técnica para reducir o eliminar las instrucciones de salto condicional en un programa, convirtiendo dependencias de control en dependencias de datos.

- **Estructura de las instrucciones:** Cada instrucción combina una parte de operación y una parte de condición denominada **predicado o guarda**.
- **Registros de predicado:** El resultado de evaluar una condición se almacena en **registros de predicado de 1 bit** (un valor de `1` representa verdadero y `0` representa falso).
- **Comportamiento en el cauce:**
    - **Si la condición del predicado es cierta (1):** la instrucción se ejecuta y confirma su resultado de manera normal.
    - **Si la condición del predicado es falsa (0):** la instrucción se anula internamente y se comporta como una instrucción nula (`NOP`), sin modificar el estado arquitectónico.

Frente a una estructura `if-else` equivalente en código de alto nivel:

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2054.png)

En lugar de generar múltiples saltos condicionales (`Blt`, `Bgt`, `jump`), el compilador utiliza instrucciones predicadas:

1. `pred_lt p1(U), p2(U), a, 10` → evalúa si a < 10 y guarda la condición en los registros de predicado p1 y p2.
2. `add c, c, 1 (p2)` → suma c + 1 solo si el predicado p2 es verdadero.
3. `pred_gt p3(U), p4(U), b, 20 (p1)` → evalúa si b > 20 condicionado al predicado p1.
4. `add d, d, 1 (p4)` → suma d + 1 solo si el predicado p4 es verdadero.
5. `add e, e, 1 (p3)` → suma e + 1 solo si el predicado p3 es verdadero.

- **Ventajas:**
    - Elimina los saltos simples y reduce las paradas (*stalls*) o vaciados del cauce (*flushes*) ocasionados por fallos en la predicción de saltos.
- **Desventajas:**
    - **Consumo de tiempo y recursos:** Las instrucciones cuyo predicado resulta ser falso se leen y procesan en el cauce de todos modos antes de anularse.
    - **Complejidad:** La instrucción es más compleja al tener que incluir el predicado además de los operandos y el opcode.

### Especulacion

La predicción de saltos introduce especulación: habrá instrucciones cuya ejecución depende de
una predicción. Existen entonces dos tipos de instrucciones en el procesador:

- Independientes: no dependen del salto y se ejecutan siempre de manera normal.
- Dependientes: su ejecución depende del acierto o fallo en la predicción del salto.

ROC → agrega a las etapas de Tomasulo un ¨commit¨ → buffer intermedio que reordena las isntrucciones para la escritura de los datos a memoria ordenada → resuelve la salida fuera de orden

![imagen.png](Arquitectura%20de%20Computadoras/imagen%2055.png)

Tiempo