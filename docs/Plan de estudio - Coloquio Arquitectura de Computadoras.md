
30 oct 2026 · @Wanda Molina

## Cómo usar este plan

Son 6 semanas y media hasta el 16/12, a razón de unas 6–8 h semanales: 4 sesiones de 90 min por semana alcanzan. La base es el **Apunte de Cabrera** (págs. citadas acá); el libro **P&H RISC-V** entra para ver los temas en RISC-V y con mejores figuras; las diapositivas, para repasar rápido.

La materia es una sola historia: **cómo hacer que un procesador termine más trabajo por segundo**. Cada unidad ataca el límite que dejó la anterior:

1. **U1 – Rendimiento:** cómo se mide (tiempo de CPU = IC × CPI × T) y por qué ya no se puede subir la frecuencia (potencia ∝ C·V²·f).
2. **U2 – Segmentación:** pipeline de 5 etapas para acercarse a CPI = 1; aparecen los riesgos (estructurales, de datos, de control).
3. **U3 – ILP dinámico:** el hardware reordena (Tomasulo), predice saltos y especula (ROB) para ocultar los riesgos.
4. **U4 – Lanzamiento múltiple y TLP:** para CPI < 1 se lanzan varias instrucciones por ciclo (superescalar, VLIW); el ILP se agota y se pasa a hilos (multithreading, SMT).
5. **U5 – Jerarquía de memoria:** la CPU espera a la memoria (memory wall); las cachés y sus optimizaciones reducen tasa de fallos, penalización y tiempo de acierto.
6. **U6 – Multiprocesadores:** varios núcleos con cachés privadas crean coherencia (snoopy MSI/MESI, directorios), consistencia y sincronización.
7. **Anexo – DLP:** la misma operación sobre muchos datos: vectoriales, SIMD multimedia, GPU/CUDA.

Rutina de cada sesión de 90 min (pensada para arrancar aunque cueste):

- **10 min:** leé las preguntas del tema (sección Preguntas) _antes_ de estudiar, así sabés qué buscar.
- **50 min:** apunte en las páginas indicadas; si un tema no cierra, el video o el libro.
- **20 min:** dibujá de memoria el diagrama clave del tema (pipeline, Tomasulo, caché, MESI…).
- **10 min:** respondé 2–3 preguntas (al menos una de una unidad anterior) **en voz alta**, como en el coloquio.

Regla de arranque: si no tenés ganas, comprometete solo a 25 min. Casi siempre seguís.

## Cronograma semanal

El orden sigue el apunte, con U1–U3 de repaso rápido al principio y el peso puesto en U3 (lo más denso) y U5–U6 (lo que no viste). Quedan 2 días libres antes del coloquio para el simulacro.

|   |   |   |   |   |
|---|---|---|---|---|
|Semana|Fechas|Temas|Apunte (págs.)|Horas|
|0|sáb 31/10 – mar 3/11|Parcial: primera pasada de U4, U5, U6 y Anexo con el resumen aparte|160–256 (por encima)|4–5|
|1|4/11 – 10/11|U1 rendimiento, potencia, Amdahl + ISA RISC-V|9–44|5|
|2|11/11 – 17/11|U2 segmentación: datapath, riesgos, forwarding, excepciones, multiciclo|45–88|7|
|3|18/11 – 24/11|U3 parte 1: dependencias, loop unrolling, software pipelining, Tomasulo|89–125|8|
|4|25/11 – 1/12|U3 parte 2: predicción de saltos, especulación (ROB) + U4|125–185|8|
|5|2/12 – 8/12|U5 jerarquía de memoria|187–213|7|
|6|9/12 – 13/12|U6 multiprocesadores + Anexo DLP|215–256|7|
|Final|14/12 – 15/12|Preguntas integradoras, simulacro oral, diagramas de memoria|—|4|

Tildalo a medida que avances:

**Semana 0 (parcial)**

- Leer entero el resumen del 2.º parcial (U4, U5, U6, Anexo)
- Contestar el parcial y anotar las preguntas que no supiste: son pistas de lo que toman

**Semana 1 — U1 + ISA**

- Apunte 9–44: escalado, potencia estática/dinámica, CPI, MIPS, Amdahl, Pollack
- Libro 1.6–1.10 y 2.5 (formatos RISC-V)
- Resolver de memoria un ejemplo de CPI y uno de Amdahl
- Preguntas U1

**Semana 2 — U2**

- Apunte 45–74: monociclo / multiciclo / segmentado y los tres riesgos
- Libro 4.5–4.8 (el mismo pipeline, en RISC-V)
- Apunte 74–88: excepciones, operaciones multiciclo, R4000
- Dibujar el pipeline con la unidad de forwarding y la de detección de riesgos (es tu TP final: usalo de ejemplo)
- Preguntas U2

**Semana 3 — U3 parte 1**

- Apunte 89–101: dependencias, planificación, unrolling, software pipelining
- Apunte 102–125: Tomasulo; seguir los 3 ejemplos con lápiz
- Hacer un Tomasulo propio de 4–5 instrucciones ciclo a ciclo
- Preguntas U3 (1–6)

**Semana 4 — U3 parte 2 + U4**

- Apunte 125–159: BTB/BTAC, predictor de 2 bits, (2,2), especulación con ROB
- Apunte 160–185: superescalar, VLIW/EPIC, límites del ILP, multithreading, SMT
- Libro 4.10 y 6.4
- Preguntas U3 (7–12) y U4

**Semana 5 — U5**

- Apunte 187–199: emplazamiento, reemplazo, escritura, 3C
- Apunte 199–213: optimizaciones, multinivel, cachés virtuales, DRAM, entrelazado
- Libro 5.3–5.4 y 5.7–5.8
- Partir una dirección en tag/índice/offset para directa y 4-way
- Preguntas U5

**Semana 6 — U6 + Anexo**

- Apunte 215–229: coherencia, snoopy, MSI, MESI (dibujar los diagramas)
- Apunte 229–242: consistencia secuencial, directorios, sincronización
- Apunte 243–256: SIMD, vectoriales, GPU, CUDA
- Preguntas U6 y Anexo

**Cierre**

- Preguntas integradoras
- Simulacro: alguien (o Claude) te pregunta 3 temas al azar y respondés 10 min cada uno, en voz alta
- Repasar la tabla MIPS → RISC-V

## Mapa de materiales por tema

Todo está en el proyecto _Arqui_. Las páginas del libro son las **impresas** (las del pie de página): la Parte 1 del PDF llega hasta la pág. ~405 y la Parte 2 sigue desde ahí; lo más rápido es buscar con Ctrl+F el título de la sección.

|   |   |   |   |
|---|---|---|---|
|Tema|Apunte (págs.)|Libro P&H RISC-V (sección · pág.)|Diapositivas del proyecto|
|U1 Arquitectura vs. microarquitectura, escalado, Ley de Moore|9–18|1.1–1.5 · 3–24|_1. Introduction_; _Moores law 2020 y mas_|
|U1 Potencia estática/dinámica, power aware, DVFS|19–29|1.7 Power Wall · 40; 1.8 · 43|_1. Introduction_|
|U1 Rendimiento, CPI, MIPS, benchmarks, Amdahl, Pollack|30–44|1.6 · 28; 1.9–1.10 · 46–49|_1. Introduction_|
|ISA RISC-V (base para todo lo demás)|— (el apunte usa MIPS)|2.2–2.3 · 63–67; 2.5 formatos · 81; 2.7 saltos · 92; 2.10 · 113|_2 Instruction set_|
|U2 Datapath monociclo/multiciclo y control|45–52|4.1–4.4 · 236–251|—|
|U2 Pipeline y sus limitaciones|53–56|4.5 · 262; 4.6 · 276|—|
|U2 Riesgos estructurales y de datos, forwarding|56–66|4.7 · 294|—|
|U2 Riesgos de control, predicción simple|66–74|4.8 · 307|—|
|U2 Excepciones|74–81|4.9 · 315|—|
|U2 Operaciones multiciclo (FP), R4000|81–88|4.11 (pipelines reales) · 334|—|
|U3 Dependencias, unrolling, software pipelining|89–101|4.10 · 321 (enfoque general)|—|
|U3 Tomasulo|102–125|4.10 · 321 (breve)|—|
|U3 Predicción de saltos (BTAC, 2 bits, 2 niveles)|125–147|4.8 · 307 (predicción dinámica)|—|
|U3 Especulación, ROB, riesgos por memoria|148–159|4.10 · 321|—|
|U4 Superescalar, VLIW, EPIC, dinámico + especulación|160–175|4.10 · 321; 4.11 · 334|_6. ILP_ (es el Tema 4)|
|U4 Límites del ILP, TLP, multithreading, SMT|175–185|6.1–6.2 · 492–494; 6.4 · 506|_6. ILP_|
|U5 Jerarquía, emplazamiento, reemplazo, escritura|187–195|5.1–5.3 · 366–375|_7. ArquitecturaMemoria_|
|U5 Rendimiento y reducción de la tasa de fallos (3C)|195–203|5.4 · 390; 5.8 · 443; 5.15 blocking · 465|_7. ArquitecturaMemoria_|
|U5 Penalización de fallo, multinivel, cachés virtuales/TLB|203–210|5.4 · 390; 5.7 memoria virtual · 419|_7. ArquitecturaMemoria_|
|U5 Memoria principal: DRAM, SRAM, entrelazado|210–213|5.2 · 370|_7. ArquitecturaMemoria_ (DDR)|
|U6 Coherencia, snoopy, MSI, MESI|215–229|5.10 · 454; 6.5 · 509|_8.Multiprocesadores_|
|U6 Consistencia de memoria|229–232|5.10 · 454|_8.Multiprocesadores_|
|U6 Directorios|232–236|5.10 · 454 (mención)|_8.Multiprocesadores_|
|U6 Sincronización (LL/SC, spin locks)|237–242|2.11 · 121 (lr.w/sc.w en RISC-V)|_8.Multiprocesadores_|
|Anexo SIMD, Flynn, vectoriales|243–248|6.3 · 499; 3.6–3.7 · 216–217|_4. Vector processors_|
|Anexo GPU y CUDA|248–256|6.6 · 514|_4. Vector processors_|

Notas:

- **Videos:** están mapeados en la sección siguiente.
- **Tomasulo y predictores** el libro los toca poco; si necesitás más, el _Computer Architecture: A Quantitative Approach_ (Hennessy & Patterson), cap. 3, es la fuente del apunte. No está en el proyecto.
- **U2 y U3 no tienen diapositivas** en el proyecto; el apunte las cubre completas.
- Las diapos _3 – Introducción a HDL_ y _4 – Secuenciales_ son de la parte práctica: sirven para el TP, no para el coloquio teórico.

## Videos de la playlist

La [playlist del profesor](https://www.youtube.com/playlist?list=PLWAL4eqHMohrIbiffz4lXHhIti9X3DBVM) tiene 26 videos, unas 14 h en total (≈ 9 h y media a velocidad 1,5x). El “Tema N” de cada video coincide con la Unidad N del apunte. No tienen descripción, así que el contenido sale de las diapositivas que se ven a lo largo de cada video: puede haber más de lo que figura acá.

|   |   |   |   |
|---|---|---|---|
|Video|Duración|Qué muestra|Semana|
|[Tema 1 · parte 1](https://www.youtube.com/watch?v=1k0uegyLPwc)|33:07|Evolución y tendencias, Ley de Moore|1|
|[Tema 1 · parte 2](https://www.youtube.com/watch?v=81SIRYm2CiM)|55:15|Consumo: energía y potencia, espacio de diseño (power aware)|1|
|[Tema 1 · parte 3](https://www.youtube.com/watch?v=ZWG_LD8g4Gw)|22:20|Rendimiento, benchmarks SPEC|1|
|[Tema 1 · parte 4](https://www.youtube.com/watch?v=hss2cd9jMnw)|30:37|Ejemplos de procesadores, fabricación y costo de un CI|1|
|[Tema 2 · parte 1](https://www.youtube.com/watch?v=Y_v7xp200w8)|39:59|ISA y ruta de datos del DLX|2|
|[Tema 2 · parte 2](https://www.youtube.com/watch?v=l28bzf9LUqg)|37:41|Segmentación y riesgos estructurales|2|
|[Tema 2 · parte 3](https://www.youtube.com/watch?v=l9PWDyaGnys)|25:37|Diseño del control del pipeline DLX|2|
|[Tema 2 · parte 4](https://www.youtube.com/watch?v=It3D2zW1Ri0)|37:38|Riesgos de control (predicción estática) y excepciones|2|
|[Tema 3 · parte 1](https://www.youtube.com/watch?v=7iIzZX_I39A)|40:30|Introducción a ILP, técnicas y dependencias|3|
|[Tema 3 · parte 2](https://www.youtube.com/watch?v=WK2_Zm7MVqI)|30:36|Planificación dinámica: Tomasulo|3|
|[Tema 3 · parte 3](https://www.youtube.com/watch?v=LTL9CJsEW0E)|34:31|Tratamiento de saltos: predicción|4|
|[Tema 3 · parte 4](https://www.youtube.com/watch?v=25LARD475UU)|28:51|Predictores dinámicos y sus tasas de fallo|4|
|[Tema 3 · parte 5](https://www.youtube.com/watch?v=Sw40VeprA80)|24:20|Especulación: Tomasulo con ROB, ejemplo|4|
|[Tema 4 · parte 1](https://www.youtube.com/watch?v=LFI9eAVcWiw)|35:14|Lanzamiento múltiple: superescalar simple|4|
|[Tema 4 · parte 2](https://www.youtube.com/watch?v=4HzbeEuyMuU)|23:28|Modelos de ejecución y límites del ILP|4|
|[Tema 4 · parte 3](https://www.youtube.com/watch?v=mw8fI1aetYU)|22:36|Ejemplo x86: P6 y NetBurst (Pentium 4)|4 (opcional)|
|[Tema 4 · parte 4](https://www.youtube.com/watch?v=KEGc0jCaDas)|33:52|Límites por acceso a memoria y multithreading|4|
|[Tema 5 · parte 1](https://www.youtube.com/watch?v=HS7CahvmIQY)|44:50|Introducción y terminología de la jerarquía|5|
|[Tema 5 · parte 2](https://www.youtube.com/watch?v=8T803vlAt0M)|29:40|Rendimiento de la caché, 3C, reemplazo|5|
|[Tema 5 · parte 3](https://www.youtube.com/watch?v=v7PWI4IVrsU)|25:08|Prebusqueda y optimizaciones del compilador (blocking)|5|
|[Tema 5 · parte 4](https://www.youtube.com/watch?v=LBs_jKSg0Gg)|27:10|Reducir la penalización: caché sin bloqueo, multinivel|5|
|[Tema 6 · parte 1](https://www.youtube.com/watch?v=iAGUvONv2bo)|1:06:40|Clase grabada: alternativas de implementación (UMA/NUMA) y problema de coherencia|6|
|[Tema 6 · parte 2](https://www.youtube.com/watch?v=iDdmk8aivMs)|18:52|Protocolos snoopy, snoopy de 2 estados|6|
|[Tema 6 · parte 3](https://www.youtube.com/watch?v=2bAch6ZACe0)|21:08|Protocolo MSI|6|
|[Tema 6 · parte 4](https://www.youtube.com/watch?v=ynkHU86w7gs)|32:38|Protocolo MESI y consistencia de memoria|6|
|[Tema 6 · consulta MESI](https://www.youtube.com/watch?v=eDtDeKRLW2c)|9:16|Consulta: tablas de transiciones de MESI|6|

Huecos: no hay video del **Anexo DLP**, y en los fragmentos que pude ver no aparecen **directorios** ni **sincronización** (pueden estar al final de Tema 6 parte 4). Para esos temas, apunte y diapositivas. Los videos usan DLX/MIPS, igual que el apunte.

## Equivalencias MIPS/DLX → RISC-V

Los conceptos del apunte (pipeline, riesgos, Tomasulo, cachés, coherencia) son iguales en RISC-V; cambian la sintaxis y algunos detalles. Si en el coloquio te piden un ejemplo, escribilo en RISC-V.

|   |   |   |
|---|---|---|
|Aspecto|MIPS / DLX (apunte)|RISC-V (materia actual)|
|Registros enteros|R0–R31, R0 = 0|x0–x31, x0 = 0; nombres ABI: zero, ra, sp, t0–t6, s0–s11, a0–a7|
|Registros FP|F0–F31|f0–f31|
|Carga/almacenamiento entero|LW / SW (LD/SD en 64 bits)|lw / sw (ld / sd en RV64)|
|Carga/almacenamiento FP doble|LD F0,0(R1) / SD 0(R1),F4|fld f0,0(x1) / fsd f4,0(x1)|
|Operaciones FP|ADDD, SUBD, MULD, DIVD|fadd.d, fsub.d, fmul.d, fdiv.d|
|Inmediatos|ADDI, SUBI R1,R1,#8; DADDUI|addi x1,x1,-8 (no existe subi)|
|Saltos condicionales|BEQZ / BNEZ R1,LOOP|beq / bne x1,x0,LOOP; además blt, bge, bltu, bgeu|
|Delay slot|Sí (la instrucción tras el salto se ejecuta siempre)|No hay delay slot: los ejemplos del apunte con ADDI después del BNE cambian|
|Formatos de instrucción|R, I, J|R, I, S, B, U, J; rs1, rs2 y rd siempre en la misma posición, signo del inmediato siempre en el bit 31|
|Excepciones|EPC, registro Cause|SEPC, SCAUSE (libro 4.9)|
|Pipeline|IF, ID, EX, MEM, WB|Igual: IF, ID, EX, MEM, WB (es tu TP final)|
|Intercambio atómico|EXCH|amoswap.w|
|Load linked / store conditional|LL / SC; SC deja **1 si tuvo éxito**|lr.w / sc.w; sc.w deja **0 si tuvo éxito** (al revés: ojo con los BEQZ del apunte)|
|Vectorial|—|RV64V (el anexo ya usa RISC-V)|

Ejemplo del loop que aparece en U3 y U4, en las dos versiones:

```
# DLX (apunte)                 # RISC-V
Loop: LD   F0,0(R1)            Loop: fld    f0,0(x1)
      ADDD F4,F0,F2                  fadd.d f4,f0,f2
      SD   0(R1),F4                  fsd    f4,0(x1)
      SUBI R1,R1,#8                  addi   x1,x1,-8
      BNEZ R1,Loop                   bne    x1,x0,Loop
```

## Preguntas de repaso

Respondelas en voz alta y sin mirar. Si una te lleva más de 2 minutos de silencio, volvé a las páginas del tema. Las marcadas con (★) son temas centrales de cada unidad: conviene tenerlas armadas como una mini-exposición de 5 minutos.

**U1 — Tendencias, costo, rendimiento y consumo**

1. (★) ¿Qué diferencia hay entre arquitectura (ISA) y microarquitectura? Da un ejemplo de dos micros con la misma ISA.
2. ¿Por qué el Pentium 4 marca el fin de la carrera por la frecuencia?
3. Escribí la fórmula de potencia dinámica. ¿Qué término conviene bajar y por qué bajar V es tan efectivo?
4. ¿De dónde sale la potencia estática y por qué crece al achicar el transistor? ¿Qué es power gating?
5. Nombrá tres técnicas power aware y explicá DVFS.
6. (★) Tiempo de CPU = IC × CPI × T: ¿qué afecta a cada factor (compilador, ISA, microarquitectura, tecnología)?
7. ¿Por qué MIPS (millones de instrucciones por segundo) es una mala métrica para comparar máquinas distintas?
8. Enunciá la Ley de Amdahl y calculá el speedup máximo si el 80 % del programa es paralelizable.
9. ¿Qué dice la regla de Pollack y cómo justifica los multicore y los procesadores heterogéneos?
10. ¿Por qué el retardo de las interconexiones no escala igual que el de los transistores?

**U2 — Segmentación**

1. (★) Compará monociclo, multiciclo y segmentado: CPI, período de reloj y hardware.
2. Describí qué hace cada etapa (IF, ID, EX, MEM, WB) y qué guarda cada registro de segmentación.
3. ¿Por qué el speedup real de un pipeline de k etapas es menor que k?
4. Riesgo estructural: ejemplo con memoria unificada y dos soluciones.
5. (★) Riesgos de datos LDE, EDL, EDE: ¿cuáles pueden pasar en el pipeline de 5 etapas y por qué?
6. ¿Qué resuelve el forwarding y qué caso no puede resolver (load-use)? ¿Cómo lo detecta el hardware?
7. Riesgos de control: compará stall, predecir no tomado, salto retardado y resolver el salto en ID.
8. ¿Qué es una excepción precisa? ¿Qué hace el pipeline cuando una instrucción en EX genera overflow?
9. Con unidades funcionales de varios ciclos (FP), ¿qué riesgos nuevos aparecen?
10. ¿Por qué el R4000 usa 8 etapas y qué costo tiene en saltos y loads?

**U3 — ILP**

1. ¿Qué es un bloque básico y por qué limita el ILP?
2. Diferenciá dependencias de datos verdaderas, de nombre (antidependencia y de salida) y de control.
3. Aplicá loop unrolling + planificación a un loop de 5 instrucciones: ¿qué ganaste y qué te costó?
4. ¿Qué es software pipelining y en qué se diferencia del unrolling?
5. (★) Explicá Tomasulo: estaciones de reserva, CDB, etiquetas. ¿Cómo elimina EDL y EDE?
6. Recorré las tres etapas de Tomasulo (emisión, ejecución, escritura) y sus condiciones.
7. ¿Qué guarda una BTAC/BTB y en qué etapa se consulta?
8. (★) Dibujá la máquina de estados del predictor de 2 bits. ¿Por qué es mejor que el de 1 bit en un loop?
9. ¿Qué aporta un predictor de dos niveles (2,2) frente a uno bimodal?
10. ¿Qué es la ejecución con predicados y qué dependencia transforma?
11. (★) Tomasulo con especulación: ¿para qué está el ROB y qué pasa en el commit ante un fallo de predicción o una excepción?
12. ¿Cómo se evitan los riesgos a través de memoria entre loads y stores fuera de orden?

**U4 — Lanzamiento múltiple, límites del ILP, multithreading**

1. (★) Compará superescalar estático, dinámico, especulativo y VLIW: quién detecta riesgos y quién planifica.
2. ¿Por qué un superescalar de 2 vías no llega a CPI = 0,5?
3. Ventajas y desventajas de VLIW. ¿Qué es la densidad de código y por qué es baja?
4. ¿Qué agrega EPIC (Itanium) sobre VLIW?
5. ¿Qué significa ejecución fuera de orden con finalización en orden?
6. Con recursos ilimitados, ¿qué factores reales bajan más el IPC? (ventana, predicción, registros de renombrado, alias de memoria)
7. Diferencia entre ILP y TLP.
8. (★) Compará multithreading de grano fino, grano grueso y SMT con el diagrama de slots.
9. ¿Qué hardware hay que replicar para SMT y qué ya trae un superescalar fuera de orden?
10. ¿Por qué las técnicas de emisión múltiple son poco eficientes energéticamente?

**U5 — Jerarquía de memoria**

1. (★) ¿Qué es el memory wall y cómo lo ataca la jerarquía? Explicá localidad temporal y espacial.
2. Propiedades de la jerarquía: inclusión, coherencia, localidad.
3. Directa, asociativa por conjuntos y totalmente asociativa: cómo se parte la dirección y qué se compara.
4. Write-through vs. write-back; write allocate vs. no write allocate.
5. (★) Escribí el tiempo de CPU con fallos de caché y el TAMA de dos niveles. ¿Tasa local o global?
6. Las 3C: ¿qué técnica reduce cada tipo de fallo y qué empeora?
7. Explicá caché víctima, pseudoasociativa y prebusqueda (HW y SW).
8. Optimizaciones del compilador: fusión de arrays, intercambio y fusión de bucles, blocking.
9. ¿Qué es una caché sin bloqueo? ¿Qué guarda un MSHR?
10. Caché de direcciones virtuales: problema de sinónimos y solución virtualmente indexada físicamente etiquetada.
11. DRAM vs. SRAM; cómo aumenta el ancho de banda una memoria entrelazada.

**U6 — Multiprocesadores**

1. (★) ¿Por qué aparece el problema de coherencia? Mostrá un ejemplo con 3 procesadores.
2. Definí formalmente un sistema coherente (las 3 condiciones).
3. Invalidación vs. actualización en escritura.
4. Snoopy vs. directorio: ¿cuándo conviene cada uno?
5. (★) Dibujá el diagrama de estados de MSI y recorré un ejemplo.
6. ¿Qué problema de MSI resuelve MESI y para qué sirve la señal S?
7. (★) Diferencia entre coherencia y consistencia. Definí consistencia secuencial con el ejemplo de A y flag.
8. Directorio plano basado en memoria: lectura y escritura con bit sucio activado y desactivado.
9. Sobrecarga del directorio con vector de bits completo y soluciones; directorio basado en caché (SCI).
10. ¿Por qué hace falta una primitiva atómica? Explicá LL/SC y un spin lock con test-and-exchange.

**Anexo — DLP**

1. Taxonomía de Flynn con un ejemplo de cada clase.
2. (★) ¿Qué tiene una arquitectura vectorial que no tiene un escalar? Compará Y = a·X + Y en RISC-V y RV64V.
3. ¿Qué les falta a las extensiones SIMD multimedia (MMX, SSE, AVX) respecto de un vectorial?
4. CPU vs. GPU: latencia vs. throughput.
5. CUDA: kernel, thread, bloque, grid, warp, SM. ¿Por qué dos niveles de threads?

**Integradoras (para el cierre)**

1. Contar la evolución de CPI: monociclo → pipeline → Tomasulo → superescalar → SMT → multicore. ¿Qué límite rompe cada paso?
2. ¿En qué se parecen el renombrado de Tomasulo, el ROB y el renombrado que usa SMT?
3. Un fallo de caché L2: ¿qué hacen ante él un pipeline simple, un fuera de orden, una caché sin bloqueo y un multithreading de grano grueso?
4. ¿Por qué la coherencia de caché es necesaria en multicore pero no en un uniprocesador multiprogramado (salvo DMA)?
5. Tu TP final: ¿qué riesgos resuelve tu pipeline, cómo, y qué le agregarías para hacerlo superescalar?

## Estrategia para el coloquio

En un oral pesa más explicar el _porqué_ de cada mecanismo que recitar detalles: qué problema resuelve, cómo, y qué nuevo problema crea. Ese encadenamiento es el hilo de la sección _Cómo usar este plan_.

**Cómo es el coloquio:** el profesor arranca con un tema, hace preguntas incisivas sobre él y después salta a cualquier otro de la materia. Él dice que recorre todo; otros dicen que no tanto. Preparate para el caso del profesor: ninguna unidad puede quedar en blanco.

- **Amplitud antes que detalle.** Es mejor poder hablar 5 minutos con criterio de cada unidad que saber Tomasulo de memoria y no poder explicar MESI. Por eso la rutina incluye siempre una pregunta de una unidad anterior.
- **Para las preguntas incisivas, el porqué.** Ante cada mecanismo, tené lista la cadena: qué problema resuelve, cómo, qué cuesta y qué problema nuevo crea. Ensayá casos límite: load-use, fallo de predicción con una excepción en vuelo, escritura sobre un bloque en estado S, sinónimos.
- **Practicá las transiciones entre temas.** Si el profe salta de U3 a U6, ayuda poder conectarlos (ROB y renombrado ↔ SMT; fallos de caché ↔ multithreading; cachés privadas ↔ coherencia). Las preguntas integradoras entrenan justo eso.
- **Hablá con el pizarrón.** Cada tema tiene un dibujo que ordena la respuesta; practicá hacerlos rápido y de memoria.
- **Si no sabés algo, razonalo** desde el problema que se quiere resolver; decir “no lo recuerdo, pero debería pasar esto porque…” suma más que el silencio.
- **Usá RISC-V** en los ejemplos de código (tabla de equivalencias), y si sale el pipeline, apoyate en tu TP final.
- **Simulacro al azar.** En el cierre, que otra persona (o Claude) elija un tema al azar, te repregunte 10 minutos y después salte a otra unidad sin aviso.

Diagramas que tenés que poder dibujar de memoria antes del 16/12:

- Pipeline de 5 etapas con forwarding y detección de riesgos
- Diagrama ciclo a ciclo de un load-use con stall
- Tomasulo: estaciones de reserva, CDB, banco de registros
- Tomasulo especulativo con ROB
- Predictor de 2 bits (máquina de estados) y predictor (2,2)
- Diagrama de slots: superescalar, grano fino, grano grueso, SMT, multiprocesador
- Caché directa y asociativa de 2 vías con la dirección partida en tag/índice/offset
- Jerarquía de memoria (pirámide) con tiempos y costos
- Máquinas de estados MSI y MESI
- Directorio: fallo de lectura sobre bloque sucio
- Jerarquía de threads CUDA (grid → bloque → warp → thread)