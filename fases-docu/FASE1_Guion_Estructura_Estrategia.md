# FASE 1: ESTRUCTURA, GUION Y ESTRATEGIA DE PRESENTACIÓN
## "Seguridad como Código: DevSecOps Spec-Driven sobre GitHub para Banca"
### Techno Week 8.0 — Banco de Costa Rica — 18 de mayo, 2026

---

## 1.1 ESTRUCTURA NARRATIVA COMPLETA (50 minutos)

### MAPA DE TIEMPOS

| # | Sección | Duración | Acumulado | Slides |
|---|---------|----------|-----------|--------|
| 1 | Apertura — El Hook | 3:30 min | 0:00–3:30 | 1–3 |
| 2 | El Problema — Seguridad rota en banca | 5:30 min | 3:30–9:00 | 4–8 |
| 3 | La Tesis — Seguridad como Código | 3:00 min | 9:00–12:00 | 9–11 |
| 4 | Arquitectura — El Pipeline Spec-Driven | 8:00 min | 12:00–20:00 | 12–17 |
| 5 | DEMO EN VIVO | 17:00 min | 20:00–37:00 | 18–20 |
| 6 | Resultados e Impacto | 4:00 min | 37:00–41:00 | 21–23 |
| 7 | ardops.dev y Call to Action | 3:00 min | 41:00–44:00 | 24–25 |
| 8 | Cierre Memorable | 3:00 min | 44:00–47:00 | 26–27 |
| 9 | Buffer / Preguntas transición | 3:00 min | 47:00–50:00 | 28 |
| 10 | Preguntas del público | 10:00 min | 50:00–60:00 | 28 |

---

## 1.2 GUION HABLADO COMPLETO

> **Convenciones del guion:**
> - `[TONO: descripción]` — Indicación de tono de voz
> - `[MOVER: descripción]` — Movimiento en escenario
> - `[SLIDE: número]` — Momento de cambiar slide
> - `[PAUSA: X seg]` — Pausa dramática
> - `[INTERACCIÓN]` — Momento de hablar con el público
> - `[RESPIRAR]` — Recordatorio de respirar y bajar velocidad
> - `⏱ MM:SS` — Timestamp de referencia

---

### SECCIÓN 1: APERTURA — EL HOOK (0:00–3:30)

`[SLIDE: 1 — Portada con título]`
`[MOVER: Parado al centro del escenario, sin mirar la pantalla. Mirar directamente al público.]`
`[TONO: Serio, pausado, como contando una historia real]`

⏱ 0:00

> "El 14 de agosto del 2025, un atacante accedió a la API de una empresa financiera en Estados Unidos. No usó un exploit sofisticado. No rompió un firewall. Simplemente... hizo un request a un endpoint que no validaba quién estaba pidiendo los datos."

`[PAUSA: 3 segundos]`

> "En menos de 48 horas, los datos de 5.8 millones de personas estaban comprometidos. Nombres, números de seguro social, información crediticia. Todo."

`[PAUSA: 2 segundos]`
`[TONO: Cambiar a un tono más cercano, conversacional]`

> "¿Y saben qué es lo más absurdo? Esa vulnerabilidad — un endpoint sin validación de identidad — la hubiera detectado un linter de OpenAPI en 0.3 segundos. Antes de que el código siquiera llegara a un servidor."

`[PAUSA: 2 segundos]`
`[MOVER: Dar un paso hacia el público]`
`[TONO: Con convicción]`

> "0.3 segundos contra 5.8 millones de víctimas. Esa es la diferencia entre revisar la seguridad al final... y tenerla integrada desde el primer commit."

`[PAUSA: 2 segundos]`

`[SLIDE: 2 — Nombre y título]`
`[TONO: Más cálido, sonreír]`

> "Buenas tardes. Mi nombre es [TU NOMBRE], soy DevOps Engineer, y hoy vamos a hablar de cómo convertir la seguridad en código. No en documentos de 200 páginas que nadie lee. No en auditorías que llegan tres meses después. Código. Que se ejecuta, que se versiona, y que les dice a ustedes en tiempo real si su API bancaria es segura o no."

⏱ 2:00

`[TONO: Ligeramente humorístico]`

> "Y lo mejor: al final de esta charla, cada uno de ustedes va a tener acceso a un repositorio de GitHub donde todo esto está funcionando. Lo clonan, lo adaptan, y mañana ya tienen un pipeline de seguridad bancaria automatizado. Sin excusas."

`[MOVER: Señalar la pantalla brevemente]`

> "Pero antes de llegar ahí, necesito que entendamos juntos por qué lo que hacemos hoy... no es suficiente."

`[SLIDE: 3 — Transición: "¿Qué tan segura es tu API?"]`

⏱ 3:30

---

### SECCIÓN 2: EL PROBLEMA — SEGURIDAD ROTA EN BANCA (3:30–9:00)

`[TONO: Serio pero no alarmista. Datos con peso.]`
`[SLIDE: 4 — Estadística: "84% de empresas tuvieron un incidente de seguridad en APIs en el último año"]`

⏱ 3:30

> "Levanten la mano los que trabajan con APIs en su día a día."

`[INTERACCIÓN: Esperar a que levanten la mano. Sonreír.]`

> "Perfecto. Casi todos. Eso es lo que esperaba en un evento como este."

> "Ahora, quédense con este dato: en 2025, el 84% de las empresas reportaron al menos un incidente de seguridad relacionado con APIs. El 84%. Y ojo — esos son los que lo detectaron. Los demás... todavía no lo saben."

`[SLIDE: 5 — "Solo el 13% puede prevenir más del 50% de los ataques a APIs"]`

> "Y aquí viene lo que a mí me quita el sueño: solo el 13% de las organizaciones tienen la capacidad de prevenir más de la mitad de los ataques a sus APIs. ¿El otro 87%? Básicamente están en modo 'ojalá no nos pase'."

`[TONO: Ligeramente humorístico]`

> "Es como poner un candado de bicicleta en la bóveda del banco y decir 'estamos protegidos'."

`[Pequeña risa del público — dejar espacio]`

`[SLIDE: 6 — "El modelo de auditoría al final"]`
`[TONO: Explicativo, como contando algo que todos reconocen]`

⏱ 5:30

> "Pero, ¿por qué estamos así? Porque la mayoría de organizaciones — y la banca no es la excepción — todavía trabajan con un modelo que yo llamo 'seguridad en el espejo retrovisor'. Funciona así:"

> "El equipo de desarrollo construye la aplicación. Trabajan semanas, meses. Hacen deploys. Y cuando ya todo está en producción... ahí es donde llega el equipo de seguridad. Hacen un penetration test. Encuentran 47 hallazgos. Generan un PDF de 200 páginas."

`[TONO: Fingir frustración cómica]`

> "Y ese PDF lo recibe el desarrollador que ya está trabajando en otra cosa completamente distinta, lo abre, ve las 200 páginas, y dice: 'Mae... esto lo veo la próxima semana'. Y esa próxima semana nunca llega."

`[SLIDE: 7 — Contexto Costa Rica: SUGEF y regulaciones]`
`[TONO: Serio, conectando con la audiencia local]`

⏱ 7:00

> "Y esto es especialmente crítico para nosotros aquí en Costa Rica. En 2024, el CONASSIF aprobó una reforma integral al Reglamento General de Gestión de TI. La SUGEF ahora exige que las entidades financieras demuestren — con evidencia — que tienen controles de seguridad cibernética robustos. No solo políticas escritas. Controles verificables."

> "Y en febrero de este año, la Asamblea Legislativa aprobó en primer debate una ley que convierte la ciberseguridad en eje de la responsabilidad bancaria. Esto significa que si un banco no puede demostrar que cumple con los estándares de seguridad de SUGEF, se convierte en responsable directo ante el usuario afectado."

`[PAUSA: 2 segundos]`
`[TONO: Directo, mirando a los tomadores de decisión]`

> "Esto ya no es un tema técnico solamente. Es un tema legal. Es un tema de responsabilidad institucional. Y les voy a mostrar cómo se resuelve."

`[SLIDE: 8 — Transición: "¿Y si la spec fuera el contrato de seguridad?"]`

⏱ 9:00

---

### SECCIÓN 3: LA TESIS — SEGURIDAD COMO CÓDIGO (9:00–12:00)

`[TONO: Energético, este es el momento "aha!"]`
`[MOVER: Caminar al centro, contacto visual con todo el público]`
`[SLIDE: 9 — "Seguridad como Código: El contrato empieza en la Spec"]`

⏱ 9:00

> "La solución no es contratar más auditores. No es comprar más herramientas. La solución es cambiar CUÁNDO y CÓMO se aplica la seguridad."

`[PAUSA: 2 segundos]`

> "¿Qué pasaría si cada vez que un desarrollador hace un pull request, automáticamente se ejecutaran 6 tipos de validaciones de seguridad? ¿Sin que nadie tenga que pedirlo? ¿Sin que nadie tenga que recordarlo?"

> "¿Y qué pasaría si todas esas validaciones nacieran de un solo lugar: la especificación OpenAPI de tu API?"

`[SLIDE: 10 — Diagrama simple: "OpenAPI Spec → Genera todo"]`

> "Este es el concepto de 'Spec-Driven Security'. La idea es simple pero poderosa: tu archivo OpenAPI — ese YAML o JSON que describe tu API — no es solo documentación. Es el contrato de seguridad. Y de ese contrato, se genera automáticamente:"

> "Linting de seguridad. Tests de autenticación. Escaneo dinámico con OWASP ZAP. Validación de dependencias. Detección de secretos. Y un reporte de compliance. Todo corriendo en GitHub Actions. Todo como código. Todo en el repositorio."

`[TONO: Con pasión]`

> "Eso es 'Security as Code'. No es un concepto teórico. Es algo que les voy a demostrar en vivo en unos minutos."

`[SLIDE: 11 — "¿Por qué Spec-Driven?"]`

⏱ 10:30

> "¿Y por qué hacerlo spec-driven en vez de solo meter herramientas sueltas? Tres razones:"

> "Primera: la spec es la fuente de verdad. Si un endpoint no está en la spec, no debería existir. Si no tiene autenticación en la spec, el pipeline lo detecta antes de que nadie escriba una línea de código."

> "Segunda: es auditable. La SUGEF te pide evidencia de controles. Tu repositorio de GitHub, con sus pull requests, sus checks de seguridad, y sus reportes generados automáticamente... ESA es tu evidencia. Verificable, versionada, con fecha y hora."

> "Y tercera: es reproducible. No depende de que el experto de seguridad esté de vacaciones. El pipeline corre siempre. Igual. Sin excepciones."

`[RESPIRAR]`

⏱ 12:00

---

### SECCIÓN 4: ARQUITECTURA — EL PIPELINE SPEC-DRIVEN (12:00–20:00)

`[SLIDE: 12 — Título de sección: "Arquitectura del Pipeline"]`
`[TONO: Técnico pero accesible. No abrumar.]`

⏱ 12:00

> "Bien, ya entendemos el por qué. Ahora veamos el cómo. Les voy a mostrar la arquitectura completa del pipeline que construí, y después lo vamos a ver funcionando en vivo."

`[SLIDE: 13 — Diagrama de arquitectura del pipeline completo]`
`[MOVER: Señalar la pantalla, ir explicando de izquierda a derecha]`

> "Todo empieza aquí, con el archivo `openapi.yaml`. Esta es nuestra API bancaria: tiene endpoints para consultar saldo, hacer transferencias, ver historial de transacciones. Cosas que cualquier banco maneja."

> "Cuando un desarrollador hace un pull request — por ejemplo, agrega un nuevo endpoint o modifica uno existente — se dispara un workflow de GitHub Actions con 6 etapas."

`[SLIDE: 14 — Etapa 1-2: Spectral + SAST]`

⏱ 13:30

> "Etapa uno: Spectral. Es un linter específico para OpenAPI. Revisa que la spec cumpla con reglas de seguridad: ¿todos los endpoints tienen autenticación definida? ¿Se usa HTTPS? ¿Los esquemas de datos están bien definidos? Si algo falla aquí, el PR se marca en rojo inmediatamente."

> "Etapa dos: SAST — análisis estático del código. Aquí se revisa el código fuente buscando patrones peligrosos: inyección SQL, variables no sanitizadas, hardcoded secrets. Usamos Semgrep, que es open source y tiene reglas específicas para Node.js."

`[SLIDE: 15 — Etapa 3-4: Secret Scanning + Dependency Check]`

⏱ 15:00

> "Etapa tres: detección de secretos. ¿Alguien dejó una API key en el código? ¿Una contraseña de base de datos en un archivo de configuración? Gitleaks lo detecta automáticamente. Y no, no les ha pasado solo a juniors... todos hemos sudado frío alguna vez con un git push que no debía llevar un .env."

`[Sonrisas del público — es una experiencia universal]`

> "Etapa cuatro: análisis de dependencias. Revisamos el package.json o requirements.txt contra bases de datos de vulnerabilidades conocidas. Si una librería que usas tiene un CVE crítico, el pipeline te lo dice antes de hacer merge."

`[SLIDE: 16 — Etapa 5-6: OWASP ZAP + Compliance Report]`

⏱ 16:30

> "Etapa cinco — y esta es mi favorita: OWASP ZAP. Esto ya es prueba dinámica. Levantamos la API en un contenedor efímero, alimentamos ZAP con la OpenAPI spec, y ZAP automáticamente genera ataques contra cada endpoint descrito en la spec. Inyección, autenticación rota, exposición de datos... todo basado en el OWASP API Top 10."

> "Y finalmente, etapa seis: generación del reporte de compliance. Un resumen en Markdown que se adjunta al pull request como comentario. El reviewer ve de un vistazo: qué pasó, qué falló, qué se debe corregir. Sin abrir otra herramienta. Sin esperar a nadie."

`[SLIDE: 17 — Vista del PR en GitHub con los checks]`

⏱ 18:00

> "El resultado es algo como esto: un pull request donde cada etapa aparece como un check de GitHub. Verde es que pasó, rojo es que hay algo que corregir. El reviewer no necesita ser experto en seguridad. Solo necesita ver: ¿está todo en verde? Sí. Se puede mergear. ¿Hay algo en rojo? Se corrige primero."

`[TONO: Confiado]`

> "Y ahora... dejemos de hablar de teoría. Quiero que lo vean funcionando."

`[PAUSA: 2 segundos]`
`[MOVER: Caminar hacia la laptop/podio]`

⏱ 20:00

---

### SECCIÓN 5: DEMO EN VIVO (20:00–37:00)

`[SLIDE: 18 — "DEMO: spec-driven-devsecops" con URL del repo]`
`[TONO: Relajado pero enfocado. Narrar cada acción.]`

⏱ 20:00

> "Vamos al repo. Este repositorio se llama `spec-driven-devsecops` y es público. Al final de la charla les comparto el link — de hecho, ya está en la slide."

**PASO 1: Mostrar estructura del repo (2 min)**

⏱ 20:00

> "Primero, veamos la estructura. Aquí tenemos:"

> "El archivo `openapi.yaml` — nuestro contrato de seguridad. La carpeta `src/` con la API en Node.js. La carpeta `.github/workflows/` con todo el pipeline de CI/CD y seguridad. Y algo que me gusta mucho: un archivo `SECURITY.md`. Porque si vamos a hablar de seguridad, el propio repositorio tiene que dar el ejemplo."

**PASO 2: Explorar la OpenAPI Spec (3 min)**

⏱ 22:00

> "Veamos la spec. Esta es una API bancaria simplificada. Tiene tres endpoints:"

> "`GET /accounts/{id}/balance` — consulta de saldo. `POST /transfers` — hacer una transferencia. `GET /accounts/{id}/transactions` — historial."

> "Noten algo importante: cada endpoint tiene definido su esquema de seguridad. Bearer token. Y cada campo sensible está marcado. El número de cuenta, el monto, el saldo... todos tienen formato definido y restricciones."

> "Este archivo es la fuente de verdad. Si algo no está aquí, no existe. Si algo no tiene seguridad definida aquí, el pipeline lo va a atrapar."

**PASO 3: Introducir una vulnerabilidad (2 min)**

⏱ 25:00

`[TONO: Conspirativo, divertido]`

> "Ahora viene lo divertido. Voy a ser un desarrollador que tiene prisa — todos hemos sido ese desarrollador alguna vez — y voy a agregar un endpoint nuevo. Uno que expone información del cliente."

> "Pero 'se me va a olvidar' ponerle autenticación. Un descuido inocente. Pasa todos los días."

`[Hacer el cambio en vivo: agregar endpoint sin security en la spec y sin auth middleware en el código]`

> "Listo. Un endpoint `GET /customers/{id}/profile` sin autenticación. Lo commiteamos y hacemos un pull request."

**PASO 4: Ver el pipeline en acción (5 min)**

⏱ 27:00

`[TONO: Narrar como un relato de suspenso]`

> "Y ahora... esperamos a que GitHub haga lo suyo."

`[Mostrar los workflows ejecutándose]`

> "Miren. Ya se dispararon los 6 checks. Spectral está analizando la spec..."

`[Mientras esperamos]`

> "Aquí es donde normalmente uno se toma un café. Pero hoy vamos a ver algo emocionante."

> "¡Ahí está! Spectral falló. ¿Por qué? Porque detectó un endpoint que no tiene esquema de seguridad definido en la spec. Exactamente nuestro endpoint nuevo."

> "Y miren: Semgrep también falló. Encontró que el handler del endpoint no valida autenticación."

> "Y ZAP... ZAP hizo lo suyo. Atacó el endpoint sin autenticación y reportó: 'Broken Authentication. Severity: High.'"

> "El pull request tiene 3 checks en rojo. Nadie puede hacer merge. El código inseguro nunca llegó a producción."

`[PAUSA: 3 segundos]`
`[TONO: Satisfecho]`

> "0.3 segundos versus 5.8 millones de víctimas. ¿Recuerdan la historia del inicio?"

**PASO 5: Mostrar el reporte (2 min)**

⏱ 32:00

> "Ahora veamos el reporte que se generó automáticamente como comentario en el PR."

`[Mostrar el comentario del bot en el PR]`

> "Miren qué limpio: un resumen con semáforo. Rojo en Spectral, rojo en SAST, rojo en DAST. Y para cada hallazgo: qué se encontró, en qué línea, y qué hacer para corregirlo. Esto es lo que ve el reviewer. Esto es lo que ve un auditor de SUGEF."

**PASO 6: Fix rápido (3 min)**

⏱ 34:00

> "Ahora hagamos el fix. Agrego la definición de seguridad en la spec... agrego el middleware de autenticación en el código... commit, push."

`[Hacer los cambios en vivo]`

> "Y vemos cómo los workflows se vuelven a ejecutar..."

> "Spectral: verde. Semgrep: verde. ZAP: verde. Dependencias: verde. Secretos: verde. Compliance: verde."

> "Pull request listo para merge. Todo documentado. Todo auditable."

`[TONO: Dirigido a los tomadores de decisión]`

> "Para los que están pensando en compliance: cada uno de estos checks es un registro verificable. Con timestamp. En un sistema que no se puede manipular retroactivamente. Eso es lo que SUGEF quiere ver."

⏱ 37:00

`[MOVER: Alejarse de la laptop, volver al centro del escenario]`

**PLAN B (si algo falla en la demo):**

> Si GitHub Actions tarda mucho: "La nube tiene sus tiempos — exactamente por eso automatizamos. Mientras esperamos, déjenme mostrarles lo que deberíamos ver..." `[Cambiar a screenshots/GIFs pre-grabados]`

> Si algo no funciona: "Miren, Murphy's Law existe incluso en DevOps. Y eso es EXACTAMENTE por lo que necesitamos pipelines automatizados: para que los errores se detecten aquí y no en producción. Déjenme mostrarles la corrida que hice anoche..." `[Video de backup]`

---

### SECCIÓN 6: RESULTADOS E IMPACTO (37:00–41:00)

`[SLIDE: 21 — "Resultados: Antes vs. Después"]`
`[TONO: Datos concretos, impactantes]`

⏱ 37:00

> "Hablemos de números. ¿Qué cambia cuando implementas esto?"

> "Tiempo de detección de vulnerabilidades: pasa de semanas o meses — cuando llega la auditoría — a minutos. Literalmente en el momento del pull request."

> "Cobertura: un penetration test manual típico cubre entre el 60% y 70% de tu superficie de ataque. Un pipeline spec-driven cubre el 100% de lo que está definido en la spec. Siempre. Sin excepción."

`[SLIDE: 22 — "El costo de NO hacerlo"]`

> "Y el costo de no hacerlo: en 2024, el costo promedio de una brecha de datos en el sector financiero en Estados Unidos fue de 9.36 millones de dólares. Implementar un pipeline como el que vimos hoy cuesta... tiempo. Herramientas open source. Y un poco de voluntad."

`[SLIDE: 23 — "Compliance automatizado"]`

⏱ 39:00

> "Pero para mí, el beneficio más grande para banca es este: compliance automatizado. Cada pull request genera evidencia. Cada merge tiene trazabilidad. Cuando SUGEF llegue a auditar, no hay que preparar nada. La evidencia ya existe. Está en GitHub. Con fecha, hora, autor, y resultado de cada validación."

`[TONO: Directo a los tomadores de decisión]`

> "Eso transforma la seguridad de un costo reactivo... a una inversión proactiva que se paga sola."

⏱ 41:00

---

# FASE 1 — ADDENDUM: Sección adicional para el guion

## INSERTAR ENTRE SECCIÓN 6 (Resultados) y SECCIÓN 7 (ardops.dev)
## Nuevo timing: Resultados termina en 39:00 (en vez de 41:00, recortar 2 min)
## Esta sección nueva ocupa 39:00–44:00

---

### NUEVA SECCIÓN: GITHUB ADVANCED SECURITY + ESTANDARIZACIÓN (39:00–44:00)

`[SLIDE NUEVA A — "GitHub Advanced Security"]`
`[TONO: Conectando con la realidad enterprise]`

⏱ 39:00

> "Ahora, todo lo que les mostré usa herramientas open source. Spectral, Semgrep, ZAP, Gitleaks. Gratuitas. Pero quiero hablarles de algo que GitHub ofrece nativamente y que para un banco es un game changer: GitHub Advanced Security."

> "GHAS tiene tres componentes que complementan nuestro pipeline:"

> "Primero: CodeQL. Es el motor de análisis estático de GitHub. A diferencia de Semgrep, CodeQL entiende el flujo de datos de tu aplicación. No solo busca patrones — entiende cómo los datos viajan desde el input del usuario hasta la base de datos. Y lo mejor: se configura con dos clicks en la pestaña Security del repositorio, o con un workflow de GitHub Actions."

> "Segundo: Secret Scanning con Push Protection. Esto es clave para banca. En vez de detectar un secreto DESPUÉS del push — como hace Gitleaks — GitHub lo bloquea ANTES de que el push llegue al repo. El desarrollador intenta hacer push con una API key y GitHub le dice: 'No. Esto no sale de tu máquina.' Prevención, no solo detección."

> "Y tercero: Dependabot. Monitorea tus dependencias 24/7 y automáticamente crea pull requests cuando hay una vulnerabilidad publicada. No tenés que esperar a que alguien corra npm audit."

`[SLIDE NUEVA B — "Open Source + GHAS: El modelo híbrido"]`

⏱ 41:00

> "Lo que yo recomiendo para un banco es un modelo híbrido. Las herramientas open source del pipeline que vimos — Spectral, ZAP — siguen siendo el core para la seguridad spec-driven. Pero GHAS agrega la capa enterprise: CodeQL para análisis más profundo, Push Protection para prevención de secretos, y Dependabot para monitoreo continuo."

> "¿Cuánto cuesta? GitHub Secret Protection está en $19 por committer al mes, y Code Security en $30. Para repos públicos, muchas de estas features son gratuitas."

`[SLIDE NUEVA C — "De 1 repo a 200: estandarización"]`
`[TONO: Dirigido directamente a los tomadores de decisión]`

⏱ 42:00

> "Pero la pregunta que gerencia siempre hace es: 'Esto funciona para un repo. ¿Cómo lo aplico a los 200 repositorios del banco?'"

> "GitHub tiene tres mecanismos para esto:"

> "Uno: Reusable Workflows. Definís el pipeline de seguridad UNA vez en un repositorio central, y todos los equipos lo invocan con una sola línea en su workflow. Si actualizás una regla de Spectral o agregás una nueva etapa, se propaga a todos los repos automáticamente."

> "Dos: Organization Rulesets. Desde la configuración de la organización en GitHub, podés crear reglas que apliquen a todos los repositorios o a grupos específicos. Por ejemplo: 'Ningún PR se puede mergear a main sin que el workflow de seguridad pase exitosamente.' Esto es obligatorio, no opcional. Ni siquiera un admin puede saltárselo sin quedar registrado."

> "Y tres: Custom Properties. Podés clasificar repos por nivel de riesgo — alto, medio, bajo — y aplicar rulesets progresivamente más estrictos. Los repos que manejan datos de clientes tienen las 6 etapas obligatorias. Los repos internos pueden tener un subconjunto."

> "El resultado: un estándar de seguridad organizacional, definido como código, aplicado automáticamente, y auditado por GitHub. Exactamente lo que SUGEF y la nueva ley de responsabilidad bancaria necesitan ver."

⏱ 44:00

> [Transición a ardops.dev como estaba en el guion original]

---

### MAPA DE TIEMPOS ACTUALIZADO

| # | Sección | Duración | Acumulado | Slides |
|---|---------|----------|-----------|--------|
| 1 | Apertura — El Hook | 3:30 | 0:00–3:30 | 1–3 |
| 2 | El Problema | 5:30 | 3:30–9:00 | 4–8 |
| 3 | La Tesis | 3:00 | 9:00–12:00 | 9–11 |
| 4 | Arquitectura del Pipeline | 8:00 | 12:00–20:00 | 12–17 |
| 5 | DEMO EN VIVO | 17:00 | 20:00–37:00 | 18–19 |
| 6 | Resultados e Impacto | 2:00 | 37:00–39:00 | 20–23 |
| **7** | **GHAS + Estandarización (NUEVO)** | **5:00** | **39:00–44:00** | **NUEVAS** |
| 8 | ardops.dev y Call to Action | 2:00 | 44:00–46:00 | 24–25 |
| 9 | Cierre Memorable | 2:00 | 46:00–48:00 | 26–27 |
| 10 | Preguntas | 12:00 | 48:00–60:00 | 28 |

**Cambios respecto al original:**
- Sección 6 (Resultados) se reduce de 4 min a 2 min (quitar redundancias)
- Nueva Sección 7 (GHAS + Estandarización) de 5 min
- Sección 8 (ardops.dev) se reduce de 3 min a 2 min
- Sección 9 (Cierre) se reduce de 3 min a 2 min
- Neto: mismos 50 minutos de exposición

### SECCIÓN 7: ardops.dev Y CALL TO ACTION (41:00–44:00)

`[SLIDE: 24 — Pantalla de ardops.dev]`
`[TONO: Entusiasta pero breve]`

⏱ 41:00

> "Todo lo que vimos hoy — el repo, las slides, los links a documentación, las guías paso a paso — está disponible en ardops.dev."

> "Ahí van a encontrar un artículo completo con la guía de implementación, el link al repositorio público, y recursos adicionales para profundizar."

`[SLIDE: 25 — QR Code grande]`

> "Y este QR los lleva directamente. Sáquenle foto ahora. No se lo pierdan."

`[PAUSA: 10 segundos para que la gente escanee]`

> "Si les sirve, compártanlo con sus equipos. La idea es que esto no se quede en esta sala."

⏱ 44:00

---

### SECCIÓN 8: CIERRE MEMORABLE (44:00–47:00)

`[SLIDE: 26 — Fondo oscuro, solo texto: "La seguridad no es un gate. Es un guardrail."]`
`[MOVER: Centro del escenario, contacto visual directo]`
`[TONO: Pausado, con peso en cada palabra]`

⏱ 44:00

> "Quiero cerrar con una idea que espero que se lleven hoy."

`[PAUSA: 2 segundos]`

> "La seguridad no es un gate. No es una barrera que pones al final para decir 'pasaste' o 'no pasaste'. Eso frena. Eso frustra. Eso no escala."

> "La seguridad es un guardrail. Es algo que está ahí MIENTRAS construyes. Que te guía. Que te protege sin frenarte. Que trabaja contigo, no contra ti."

`[PAUSA: 3 segundos]`

> "Y la mejor parte es que hoy, con herramientas open source, con GitHub, con una OpenAPI spec bien hecha... ese guardrail se puede construir en una semana. No en un año. No con un presupuesto de millones. En una semana."

`[TONO: Con energía creciente]`

> "Así que mi reto para cada uno de ustedes es este: la próxima vez que hagan un pull request en su banco, en su empresa, en su proyecto... pregúntense: '¿Cuántos checks de seguridad se ejecutaron automáticamente?' Si la respuesta es cero... ya saben por dónde empezar."

`[SLIDE: 27 — "Gracias. El código está en ardops.dev"]`
`[PAUSA: 3 segundos]`

⏱ 47:00

> "Gracias. El repositorio es público, ardops.dev tiene todo. Estoy aquí para preguntas."

`[MOVER: No ir directo al podio. Quedarse en el centro. Tomar agua tranquilamente mientras el público procesa.]`

---

### SECCIÓN 9: PREGUNTAS (47:00–60:00)

`[SLIDE: 28 — "¿Preguntas?" con QR y datos de contacto]`

**Si nadie pregunta de inmediato (los primeros 10 segundos son normales):**

> "Mientras piensan, una pregunta que me hacen siempre es: '¿Esto no hace más lento el pipeline de desarrollo?' Déjenme responder esa de una vez..."

`[Dar la respuesta preparada — ver sección 5.2]`

**Planted questions (pedir a un colega que las haga si hay silencio):**

1. "¿Cómo se maneja esto cuando tienes APIs legacy que no tienen spec?"
2. "¿Esto reemplaza al equipo de seguridad?"
3. "¿Cuánto tiempo toma implementar esto desde cero?"

---

## 1.3 ESTRATEGIA DE PRESENTACIÓN NIVEL MUNDIAL

### PRINCIPIO NARRATIVO: "EL ARCO DEL HÉROE"

La charla sigue una estructura de storytelling clásica adaptada a charlas técnicas:

1. **El mundo roto** (Sección 1-2): APIs vulnerables, auditorías inútiles, regulación que aprieta. El público siente el dolor.
2. **La revelación** (Sección 3): Hay otro camino. Security as Code. El momento "aha!".
3. **El camino** (Sección 4): La arquitectura. El "cómo".
4. **La prueba** (Sección 5): Demo en vivo. Ver para creer.
5. **La transformación** (Sección 6-7): Resultados. El mundo nuevo.
6. **El llamado** (Sección 8): Ahora les toca a ustedes.

El hilo narrativo conecta apertura con cierre: "0.3 segundos vs 5.8 millones" al inicio → "¿Cuántos checks de seguridad se ejecutaron?" al final.

### TÉCNICAS DE DELIVERY

**Regla de los 10 minutos:**
Cada 10 minutos hay un "reset" de atención: una interacción, un cambio de ritmo, una broma, o un momento de asombro. En nuestra charla:
- Min 0: Hook impactante
- Min 5: Interacción (levanten la mano)
- Min 10: Momento "aha!" (la tesis)
- Min 20: Demo en vivo (cambio total de formato)
- Min 27: Momento "wow" (pipeline detecta vulnerabilidad)
- Min 37: Datos de impacto
- Min 44: Cierre emocional

**Principio de contraste:**
Alternar constantemente entre problema y solución, miedo y esperanza, dato duro y humor. Esto mantiene al público en un estado de engagement emocional.

**La regla del "yo también":**
Cada vez que menciones un error o un problema, incluir señales de que vos también lo has vivido: "todos hemos sido ese desarrollador", "no les ha pasado solo a juniors". Esto crea conexión y elimina la barrera de "este mae se cree mejor que nosotros".

### LENGUAJE CORPORAL Y VOZ

**Antes de subir al escenario:**
- 2 minutos de "power pose" en un lugar privado (manos en la cintura, pecho abierto, pies separados). Esto eleva la testosterona y baja el cortisol.
- 5 respiraciones profundas: 4 segundos inhalar, 7 segundos exhalar.
- Recordar: "Esta audiencia quiere que me vaya bien. Son aliados, no jueces."

**Durante la charla:**
- Hablar al 70% de tu velocidad normal. Cuando estás nervioso, automáticamente aceleras. Forzar la lentitud te hace sonar más confiado.
- Usar el espacio: no quedarse pegado al podio. Caminar lentamente de un lado a otro crea dinamismo.
- Contacto visual: dividir el público en 3 zonas (izquierda, centro, derecha). Alternar cada 15-20 segundos.
- Las manos: usarlas para enfatizar. Nunca en los bolsillos. Nunca cruzadas.
- Cuando mostrés la demo: narrar TODO lo que hacés. "Ahora voy a abrir el archivo..." — el público no puede leer tu pantalla tan rápido como vos.

**Manejo del agua:**
- Tener una botella sin tapa (no perder tiempo abriendo).
- Tomar agua en las transiciones, nunca a mitad de una frase.
- Tomar agua es una señal de confianza, no de nerviosismo.

### MANEJO DE SITUACIONES DIFÍCILES

**Si alguien hace una pregunta que no sabés responder:**
> "Excelente pregunta. No tengo la respuesta exacta en este momento, pero me encantaría investigarlo. ¿Me comparten su contacto al final? Les mando la respuesta esta semana."

Esto es 100 veces mejor que inventar una respuesta.

**Si alguien te interrumpe agresivamente:**
> "Entiendo tu punto y es válido. Permítame terminar esta idea y con gusto lo discutimos en la sección de preguntas, ¿le parece?"

Tono firme pero respetuoso. No entrar en discusión.

**Si la demo falla:**
No entrar en pánico. NUNCA decir "esto funcionaba ayer". En cambio:
> "La ley de Murphy. Pero fíjense que esto es exactamente lo que el pipeline detectaría — les muestro con el backup que preparé."

**Si te quedas en blanco:**
Ir a la slide. Leer el título. Eso activa la memoria. Si no, tomar agua, respirar, y decir:
> "Déjenme retomar..."

Esto es completamente normal y nadie lo juzga negativamente.

### VESTIMENTA

- Camisa de botones de color sólido (azul oscuro, gris, o negro). Sin corbata.
- Pantalón chino oscuro o jean oscuro sin roturas.
- Zapatos limpios, casuales-profesionales.
- Si usás lentes, asegurarte de que no reflejen la pantalla.
- NO usar traje completo (crea distancia con developers). NO usar camiseta (pierde credibilidad con los tomadores de decisión).
- El punto dulce: "Soy técnico pero me tomo esto en serio."

---

## RESUMEN DE TIEMPOS PARA CHECKPOINTS

Tener estos tiempos escritos en una tarjeta pequeña o en el celular al lado de la laptop:

| Checkpoint | Deberías estar en... | Si vas adelantado... | Si vas atrasado... |
|---|---|---|---|
| ⏱ 10:00 | Terminando "La Tesis" | Agregar ejemplo extra en arquitectura | Recortar contexto CR |
| ⏱ 20:00 | Empezando DEMO | Bien, estás en tiempo | Recortar 1 etapa de arquitectura |
| ⏱ 30:00 | Mitad de la DEMO | Agregar más comentarios en demo | Saltar paso 5 (reporte) |
| ⏱ 40:00 | Terminando Resultados | Extender ardops.dev | Ir directo al cierre |
| ⏱ 47:00 | Abriendo preguntas | Perfecto | Cerrar y pasar a preguntas |

---

*Este guion está diseñado para ensayarse mínimo 5 veces completo antes del evento. Cada ensayo lo mejora. Grábate y escúchate. Identifica las muletillas. Practica las pausas. La naturalidad no es espontánea — es el resultado de mucha práctica.*
