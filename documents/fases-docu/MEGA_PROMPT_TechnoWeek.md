# 🎯 MEGA-PROMPT: Charla Techno Week 8.0 — BCR
## "Seguridad como Código: DevSecOps Spec-Driven sobre GitHub para Banca"

---

> **Instrucción**: Copia y pega este prompt completo en una nueva conversación con Claude. Adjunta la plantilla `Presentacio_n_TW1.pptx` cuando se indique. Este prompt está diseñado para ejecutarse en fases — puedes pedir una fase a la vez o todas juntas.

---

## CONTEXTO DEL PROYECTO

Soy un **DevOps Engineer** que va a dar una charla técnica de **1 hora (50 min exposición + 10 min preguntas)** en **Techno Week 8.0**, el evento de tecnología del **Banco de Costa Rica (BCR)**, el **18 de mayo de 2026**. Es un evento nacional con audiencia mixta: desarrolladores y tomadores de decisiones de TI del sector financiero costarricense.

### Mi perfil:
- Rol: DevOps Engineer
- Experiencia con DevSecOps: mucha lectura/investigación, poca implementación hands-on
- Experiencia dando charlas: sí, audiencias de 30-50 personas
- Tengo un dominio personal: **ardops.dev** (sin sitio aún, lo voy a crear)
- Tengo un repo personal público en GitHub donde montaré la demo
- Ensayos con organizadores: **21 y 27 de abril de 2026**
- Evento en vivo: **18 de mayo de 2026**

### Objetivo personal:
Quiero que esta sea **la mejor exposición de mi carrera**. Que cautive, que sea profesional, que me posicione como referente en DevSecOps para banca en Costa Rica. Quiero que la gente salga diciendo "esa fue la mejor charla del evento". Esto puede abrirme puertas a nivel nacional.

---

## TEMA DE LA CHARLA

**"Seguridad como Código: DevSecOps Spec-Driven sobre GitHub para Banca"**

### Enfoque propuesto (validar y mejorar):
La idea central es usar **OpenAPI Specs** como el "contrato de seguridad" que alimenta un pipeline DevSecOps completo en GitHub. Es decir: la especificación de la API no solo documenta, sino que **genera tests de seguridad, valida compliance, y automatiza controles** — todo como código, todo en el repositorio, todo auditable.

### Esto es innovador porque:
- La mayoría de charlas de DevSecOps hablan de "shift-left" de forma genérica
- Nadie (o casi nadie) en LATAM está hablando de **spec-driven security** para banca
- Conecta directamente con regulaciones financieras (SUGEF en Costa Rica, PCI-DSS, OWASP)
- Es reproducible: cualquiera que vea la charla puede clonar el repo y replicarlo

---

## FASE 1: ESTRUCTURA Y GUION DE LA CHARLA (con estrategia de presentación nivel mundial)

Necesito que diseñes la estructura completa de la charla usando las mejores prácticas de speakers de conferencias técnicas de nivel mundial (piensa en el nivel de presentaciones de GitHub Universe, KubeCon, OWASP AppSec, o AWS re:Invent). Incluye:

### 1.1 Estructura narrativa completa (50 minutos)
- **Apertura impactante (3-4 min)**: Un hook que capture la atención inmediatamente. Puede ser una historia real de un breach bancario, una estadística impactante, o una demostración rápida de algo roto. NO empieces con "Hola, mi nombre es...". El nombre viene después del hook.
- **Contexto y problema (5-6 min)**: Por qué la seguridad tradicional en banca está rota. Por qué el modelo de "auditoría al final" no funciona. Datos reales del sector financiero.
- **La tesis (2-3 min)**: Presentar el concepto de "Seguridad como Código" y el enfoque spec-driven. Este es el momento "aha!" de la charla.
- **Arquitectura y conceptos (8-10 min)**: El pipeline completo. Cómo fluye desde la spec hasta producción. Qué herramientas intervienen. Diagramas claros.
- **DEMO EN VIVO (15-18 min)**: La parte más importante. Debe ser fluida, con un script preciso, y con "momentos wow". Incluir un fallback si algo falla.
- **Resultados e impacto (3-4 min)**: Métricas, beneficios concretos, ROI para el banco.
- **Conexión con ardops.dev (2-3 min)**: Mostrar brevemente el sitio donde queda documentado todo. Call to action.
- **Cierre memorable (2-3 min)**: No termines con "gracias, preguntas?". Cierra con una frase potente, un call-to-action claro, y DESPUÉS abre a preguntas.

### 1.2 Guion hablado completo
Para cada sección, necesito:
- **Qué decir exactamente** (el script palabra por palabra, en español neutro/costarricense profesional)
- **Tono de voz** indicado entre corchetes: [tono serio], [tono humorístico], [tono de urgencia], [pausa dramática], [bajar velocidad], [subir energía]
- **Movimiento en escenario**: [caminar al centro], [señalar pantalla], [contacto visual con audiencia derecha]
- **Momentos de interacción**: dónde hacer preguntas al público, dónde pedir que levanten la mano
- **Bromas naturales** que no se sientan forzadas, apropiadas para el contexto costarricense y bancario
- **Transiciones suaves** entre secciones (nunca digas "ahora pasemos a...")
- **Manejo del tiempo**: timestamps exactos para cada sección

### 1.3 Estrategia de presentación nivel mundial
- **Regla del 10-20-30** adaptada a 50 minutos
- **Técnica de storytelling**: hilo narrativo que conecte apertura con cierre
- **Principio de contraste**: alternar entre problema/solución, miedo/esperanza
- **Técnica del "planted question"**: preparar 3 preguntas que yo mismo provoque si nadie pregunta
- **Manejo del nerviosismo**: técnicas específicas pre-charla
- **Power poses** y lenguaje corporal
- **Cómo manejar a un heckler o alguien que te interrumpe con una pregunta difícil**

---

## FASE 2: PRESENTACIÓN EN POWERPOINT

Adjunto la plantilla oficial de Techno Week 8.0 (`Presentacio_n_TW1.pptx`). Tiene 4 layouts:
1. **Slide 1 (Portada)**: Fondo azul oscuro con esfera central, logo TechnoWeek 8.0 arriba, logo BCR abajo derecha, "2026" derecha. Placeholder "TEXTO" en la esfera.
2. **Slide 2 (Contenido oscuro)**: Fondo azul oscuro, headers BCR y TechnoWeek en esquinas, placeholder "TEXTO" centrado. Buena para títulos de sección.
3. **Slide 3 (Contenido azul con texto)**: Fondo azul con esfera decorativa derecha, título arriba y párrafo debajo. Para contenido con explicación.
4. **Slide 4 (Contenido claro con texto)**: Fondo blanco/claro, misma estructura que slide 3. Para contenido que necesite contraste o legibilidad.

### Requisitos de la presentación:
- Usar la plantilla oficial sin modificar los fondos/branding
- **Máximo 25-30 slides** (menos es más en una charla de impacto)
- **Texto mínimo por slide**: máximo 6 palabras en títulos, máximo 3 líneas en contenido
- **Una idea por slide**
- Incluir slides para: portada, agenda, cada sección de contenido, slides de transición entre secciones, slide de demo (con URL del repo), slide de arquitectura/diagrama, slide de cierre, slide de contacto/QR a ardops.dev
- Speaker notes completas en cada slide con lo que debo decir
- Los diagramas técnicos deben ser claros y simples (no diagramas sobrecargados)
- Incluir íconos o elementos visuales donde sea posible

---

## FASE 3: DEMO TÉCNICA EN VIVO

Necesito un **repositorio GitHub completo y funcional** que demuestre el pipeline DevSecOps spec-driven. Este repo debe ser:

### 3.1 Estructura del repositorio
- Nombre sugerido del repo (algo memorable y profesional)
- README.md espectacular con badges, diagrama de arquitectura, instrucciones claras
- Estructura de carpetas organizada y profesional
- LICENSE, CONTRIBUTING.md, SECURITY.md (meta: el propio repo demuestra buenas prácticas)

### 3.2 El pipeline spec-driven
- **OpenAPI Spec** (archivo central) de una API bancaria ficticia (transferencias, consulta de saldo, etc.)
- **GitHub Actions workflows** que se disparan en cada PR:
  - Linting de la spec (Spectral o similar)
  - Generación automática de tests de seguridad desde la spec
  - SAST (análisis estático de código)
  - Secret scanning
  - Dependency scanning
  - DAST con OWASP ZAP contra la spec
  - Generación de reporte de compliance
  - Badge de estado de seguridad
- **Una API funcional mínima** (puede ser Node.js/Express o Python/FastAPI) que implemente la spec
- **Documentación inline** que explique cada paso

### 3.3 Script de la demo en vivo (15-18 minutos)
Paso a paso exacto de qué voy a mostrar:
1. Mostrar el repo y su estructura (~2 min)
2. Mostrar la OpenAPI spec y explicar cómo es el "contrato de seguridad" (~3 min)
3. Hacer un cambio "inocente" que introduce una vulnerabilidad (ej: un endpoint sin autenticación) (~2 min)
4. Hacer push/PR y ver cómo el pipeline la detecta automáticamente (~5 min)
5. Mostrar los reportes generados (~2 min)
6. Fix rápido y ver el pipeline en verde (~3 min)
7. Opcional: mostrar el despliegue a ardops.dev

### 3.4 Plan B (si algo falla en la demo)
- Screenshots/GIFs pre-grabados de cada paso
- Video de backup de la demo completa
- Cómo hacer la transición elegantemente si algo no funciona: "La ley de Murphy existe incluso en DevOps — y eso es exactamente por lo que necesitamos pipelines automatizados"

---

## FASE 4: SITIO WEB ardops.dev

Crear una landing page profesional para ardops.dev que sirva como:
- Mi portafolio/marca personal como DevOps Engineer
- Hub de la charla (slides, repo, recursos)
- Demostración en vivo durante la charla (si da tiempo)

### Requisitos:
- Diseño moderno, oscuro, profesional (estilo terminal/DevOps)
- Secciones: Hero con mi nombre y título, About, Charla TechnoWeek (con links al repo y slides), Blog (placeholder para futuro), Contacto
- QR code que la gente pueda escanear durante la charla
- Responsive, rápido, con buena puntuación en Lighthouse
- Tech stack: lo que sea más rápido de deployar (puede ser Astro, Next.js, o incluso HTML puro)
- Deploy automatizado con GitHub Actions (meta: el propio sitio demuestra CI/CD)

---

## FASE 5: PLAN DE ESTUDIO Y PREPARACIÓN

### 5.1 Temas que debo dominar para responder cualquier pregunta
Lista priorizada de temas con recursos específicos (artículos, docs, videos) para estudiar:
- DevSecOps fundamentals (para explicar como experto)
- OpenAPI Specification 3.1 (para defender el enfoque spec-driven)
- GitHub Advanced Security features
- GitHub Actions en detalle
- OWASP Top 10 para APIs (2023)
- PCI-DSS y regulaciones de SUGEF Costa Rica
- Spectral (linting de specs)
- OWASP ZAP (DAST)
- Secret scanning y dependency scanning
- Comparación con otras herramientas (SonarQube, Snyk, Checkmarx)
- Casos reales de breaches en banca por falta de seguridad en APIs

### 5.2 Preguntas difíciles que me pueden hacer (y cómo responderlas)
Al menos 20 preguntas difíciles con respuestas preparadas:
- "¿Esto no hace más lento el desarrollo?"
- "¿Cómo convenzo a mi jefe de invertir en esto?"
- "¿Qué pasa con los falsos positivos?"
- "¿Esto reemplaza al equipo de seguridad?"
- "¿Cómo escala esto a microservicios?"
- "¿Qué pasa con APIs legacy que no tienen spec?"
- (y 14+ más)

### 5.3 Cronograma de preparación
Crear un calendario día a día desde hoy hasta el 18 de mayo:
- Semana 1 (9-14 abril): [qué estudiar y preparar]
- Semana 2 (15-20 abril): [qué estudiar y preparar, incluir ensayo del 21]
- Semana 3 (21-27 abril): [ajustes post-ensayo 1, incluir simulación del 27]
- Semana 4-5 (28 abril - 11 mayo): [refinamiento]
- Semana 6 (12-17 mayo): [ensayos finales, preparación mental]
- **Día D (18 mayo)**: Rutina del día completa

### 5.4 Checklist del día del evento
- Qué ropa usar (profesional pero accesible, no traje completo)
- Qué llevar (adaptadores, backup en USB, hotspot personal, agua)
- Rutina pre-charla (llegar 1 hora antes, probar audio/video, power pose 2 min)
- Qué hacer si los nervios atacan
- Cómo manejar el post-charla (networking, tarjetas, follow-up)

---

## FASE 6: DOCUMENTO DE ENSAYO

Un documento que pueda imprimir o tener en tablet con:
- El guion completo con timestamps
- Notas de escenario y movimiento
- Puntos de transición marcados
- Momentos de pausa y respiración
- Check points: "¿vas en tiempo?" cada 10 minutos
- Marcas de cuándo pasar al siguiente slide

---

## INSTRUCCIONES DE EJECUCIÓN

1. **Empieza por la Fase 1** (estructura y guion) — es la base de todo
2. **Luego Fase 3** (demo técnica) — porque necesita más tiempo de preparación
3. **Después Fase 2** (presentación) — se basa en la estructura de Fase 1
4. **Fase 5** (plan de estudio) — para empezar a estudiar de inmediato
5. **Fase 4** (sitio web) — se puede hacer en paralelo
6. **Fase 6** (documento de ensayo) — se arma al final cuando todo esté definido

Para cada fase, entrega el producto completo y listo para usar. No me des resúmenes ni "aquí podrías poner X" — dame el contenido real, final, pulido.

**IMPORTANTE**: Respeta la plantilla oficial de TechnoWeek 8.0 adjunta. No la modifiques estéticamente, solo agrega contenido.

---

## TONO Y ESTILO GENERAL

- La charla es en **español**, tono costarricense profesional pero cercano
- Puedo tutear a la audiencia pero con respeto
- Humor inteligente, nunca vulgar
- Referir ejemplos locales cuando sea posible (bancos de CR, regulaciones SUGEF, BCCR)
- El nivel técnico es intermedio-alto: la audiencia sabe de tecnología pero no necesariamente de seguridad
- Cuando hable de herramientas, siempre conectar con el "para qué" y el valor de negocio

---

*Este prompt fue diseñado para producir la mejor charla técnica posible sobre DevSecOps para Techno Week 8.0 del BCR. Cada fase es un entregable independiente pero coherente con el todo.*
