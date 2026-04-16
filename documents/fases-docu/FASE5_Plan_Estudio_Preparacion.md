# FASE 5: PLAN DE ESTUDIO, PREGUNTAS DIFÍCILES Y CRONOGRAMA
## Preparación completa para Techno Week 8.0
### Desde hoy (10 abril) hasta el evento (18 mayo 2026)

---

## 5.1 TEMAS QUE DEBÉS DOMINAR (Prioridad Alta → Baja)

### 🔴 PRIORIDAD CRÍTICA (estudiar primero — son los que te van a preguntar)

**1. OWASP API Security Top 10 (2023)**
Debés poder explicar cada uno como si fuera una conversación casual. Estos son los 10:
- API1: Broken Object Level Authorization (BOLA/IDOR) — un usuario accede a datos de otro
- API2: Broken Authentication — tokens mal implementados, sin expiración
- API3: Broken Object Property Level Authorization — mass assignment, campos ocultos
- API4: Unrestricted Resource Consumption — sin rate limiting, DDoS
- API5: Broken Function Level Authorization — un user normal accede a endpoints de admin
- API6: Unrestricted Access to Sensitive Business Flows — abuso de lógica de negocio
- API7: Server Side Request Forgery (SSRF) — la API hace requests a donde no debe
- API8: Security Misconfiguration — headers faltantes, CORS permisivo
- API9: Improper Inventory Management — APIs shadow, versiones viejas activas
- API10: Unsafe Consumption of APIs — confiar ciegamente en APIs de terceros

**Recurso**: https://owasp.org/API-Security/editions/2023/en/0x11-t10/
**Tiempo de estudio**: 3-4 horas. Leer cada uno con los ejemplos.

---

**2. OpenAPI Specification 3.1**
No necesitás saber cada detalle del spec, pero sí debés dominar:
- Estructura básica: info, servers, paths, components, security
- Security Schemes: cómo definir Bearer/JWT, API keys, OAuth2
- Schemas: tipos de datos, formatos (uuid, date-time, email), validaciones (min, max, pattern)
- La diferencia entre OpenAPI 3.0 y 3.1 (3.1 es compatible con JSON Schema)
- Cómo se usa la spec para generar tests, docs, mocks y validaciones

**Recurso**: https://spec.openapis.org/oas/v3.1.0
**Recurso práctico**: https://learn.openapis.org/
**Tiempo de estudio**: 2-3 horas

---

**3. GitHub Actions — en detalle**
Debés poder explicar sin dudar:
- Cómo funciona un workflow (triggers, jobs, steps, runners)
- Cómo se usan secrets y environment variables
- Cómo encadenar jobs con `needs:`
- Cómo usar actions de terceros (uses: action@version)
- Cómo correr contenedores en GitHub Actions (para ZAP)
- Cómo postear comentarios en PRs automáticamente
- Qué es GitHub Advanced Security (code scanning, secret scanning, Dependabot)

**Recurso**: https://docs.github.com/en/actions
**Recurso**: https://docs.github.com/en/code-security
**Tiempo de estudio**: 3 horas + práctica con tu repo

---

**4. Regulaciones Costa Rica — SUGEF / CONASSIF**
Esto te da credibilidad local. Puntos clave:
- Acuerdo CONASSIF 5-24: Reglamento General de Gobierno y Gestión de TI (vigente julio 2024). Obliga a: gobierno de TI, seguridad de la información, gestión de incidentes, resiliencia operativa, auditorías externas de TI.
- Ley de ciberseguridad bancaria (aprobada en primer debate, febrero 2026): los bancos son responsables ante el usuario si no demuestran cumplimiento de estándares de SUGEF. La ciberseguridad pasa a ser defensa jurídica, no solo función técnica.
- Estrategia Nacional de Ciberseguridad 2023-2027
- Ataques de 2022 a instituciones públicas de CR (Conti ransomware) como punto de inflexión
- SUGEF exige notificar incidentes al regulador en plazo determinado

**Recurso**: Buscar "Acuerdo CONASSIF 5-24" en el sitio de SUGEF
**Recurso**: Artículo de ECIJA sobre la ley aprobada en primer debate
**Tiempo de estudio**: 2 horas

---

### 🟡 PRIORIDAD ALTA (estudiar la segunda semana)

**5. Spectral (linting de OpenAPI specs)**
- Qué es y cómo funciona (motor de reglas sobre archivos JSON/YAML)
- Rulesets built-in vs custom
- Cómo escribir reglas personalizadas (given, then, function)
- Integración con CI/CD
- Alternativas: 42Crunch Audit (más enterprise, score 0-100)

**Recurso**: https://docs.stoplight.io/docs/spectral/
**Tiempo de estudio**: 1.5 horas

---

**6. OWASP ZAP (Dynamic Application Security Testing)**
- Qué es DAST vs SAST vs IAST
- Cómo ZAP usa la OpenAPI spec para generar ataques
- Modos: baseline scan, full scan, API scan
- Cómo interpretar los reportes
- Falsos positivos comunes y cómo manejarlos
- Alternativas: StackHawk (CI-native), Burp Suite (manual + auto)

**Recurso**: https://www.zaproxy.org/docs/
**Tiempo de estudio**: 2 horas

---

**7. Semgrep (Static Analysis)**
- Qué hace: busca patrones de código peligrosos
- Reglas pre-built para OWASP, Node.js, JWT
- Cómo escribir reglas custom (YAML-based)
- Diferencia con ESLint/SonarQube (Semgrep es más security-focused)
- Alternativa: CodeQL (GitHub native, más complejo)

**Recurso**: https://semgrep.dev/docs/
**Tiempo de estudio**: 1.5 horas

---

**8. PCI-DSS 4.0 (lo relevante para APIs)**
No necesitás ser experto en PCI-DSS, pero sí saber:
- Requisito 6: Develop and maintain secure systems (code reviews, vuln management)
- Requisito 6.2.4: Software security practices in development
- Requisito 11: Test security of systems and networks regularly
- Cómo un pipeline DevSecOps ayuda a cumplir estos requisitos automáticamente
- Que PCI-DSS 4.0 entró en vigencia plena en marzo 2025

**Recurso**: Buscar "PCI DSS 4.0 quick reference guide"
**Tiempo de estudio**: 1.5 horas

---

### 🟢 PRIORIDAD MEDIA (estudiar si queda tiempo)

**9. Herramientas alternativas (para responder "¿por qué no usaste X?")**

| Herramienta | Qué hace | Tu respuesta |
|---|---|---|
| SonarQube | SAST + code quality | "Es excelente para quality, pero Semgrep tiene reglas de seguridad más especializadas y se integra más fácil en CI" |
| Snyk | Deps + containers + SAST | "Gran herramienta. Se puede integrar en paralelo. Nosotros usamos npm audit por simplicidad" |
| Checkmarx | Enterprise SAST/DAST | "Es la opción enterprise. Para equipos que empiezan, Semgrep+ZAP logran el 80% sin costo de licencia" |
| 42Crunch | OpenAPI security audit | "Excelente. Hace audit de la spec con score 0-100 y tiene micro API firewall. Complementa lo que mostramos" |
| StackHawk | CI-native DAST | "Muy buena alternativa a ZAP. Más developer-friendly. Tiene tier gratuito" |
| Trivy | Container + deps scanning | "Perfecto si usan contenedores. Se puede agregar como etapa 7 del pipeline" |

**Tiempo de estudio**: 1 hora (leer overview de cada uno)

---

**10. Casos reales de breaches en banca por APIs**
Tener 3-4 casos listos para mencionar si te preguntan:
- **700Credit (2025)**: API sin validación de IDs, 5.8M de registros expuestos
- **Capital One (2019)**: SSRF en AWS, 100M de registros
- **Optus Australia (2022)**: API sin autenticación expuso 10M de registros
- **T-Mobile (2023)**: API explotada, 37M de cuentas

---

## 5.2 PREGUNTAS DIFÍCILES Y CÓMO RESPONDERLAS

### Preguntas sobre viabilidad

**P1: "¿Esto no hace más lento el desarrollo?"**
> "Al contrario. Detectar un bug de seguridad en un PR toma 5 minutos de fix. Detectarlo en producción toma semanas de incident response, patches de emergencia, y potencialmente millones en daños. El pipeline agrega entre 3 y 5 minutos al CI. Eso es nada comparado con el costo de un breach."

**P2: "¿Cómo convenzo a mi jefe de invertir en esto?"**
> "Tres argumentos. Uno: el costo promedio de un breach en banca es $9.36 millones. Dos: las herramientas que usamos son open source — el costo es tiempo de implementación, no licencias. Y tres: con la nueva ley de responsabilidad bancaria en Costa Rica, no implementar esto es un riesgo legal directo."

**P3: "¿Cuánto tiempo toma implementar esto desde cero?"**
> "Un pipeline básico como el que mostré se puede tener funcionando en una semana. Spectral y Semgrep se configuran en un día. ZAP toma un poco más. El refinamiento de reglas custom y la eliminación de falsos positivos es un proceso continuo, pero el primer valor se ve en días."

**P4: "¿Cuánto cuesta?"**
> "Las herramientas core son gratuitas: Spectral, Semgrep, Gitleaks, OWASP ZAP, npm audit. GitHub Actions tiene 2,000 minutos gratis al mes para repos públicos. Lo único que cuesta es el tiempo del equipo para configurarlo."

---

### Preguntas técnicas

**P5: "¿Qué pasa con los falsos positivos?"**
> "Existen, especialmente con ZAP. La clave es dos cosas: primero, configurar archivos de reglas para ignorar los que ya verificaste manualmente. Segundo, empezar con severidad alta y crítica solamente. Los warnings se van afinando con el tiempo. Es mejor tener algunos falsos positivos que cero cobertura."

**P6: "¿Esto reemplaza al equipo de seguridad?"**
> "No. Esto automatiza el 80% de las verificaciones repetitivas. El equipo de seguridad se libera para hacer lo que realmente importa: modelado de amenazas, penetration testing de lógica de negocio, y arquitectura de seguridad. Cosas que ningún pipeline puede hacer."

**P7: "¿Cómo escala esto a microservicios?"**
> "Cada microservicio tiene su propia OpenAPI spec y su propio pipeline. Es el mismo workflow replicado N veces. De hecho, el enfoque spec-driven escala mejor que el manual porque cada servicio se autocontiene. Se puede crear un template de GitHub Actions reutilizable."

**P8: "¿Qué pasa con APIs legacy que no tienen spec?"**
> "Es el problema más común. Hay dos caminos: generar la spec retrospectivamente desde el código — herramientas como StackHawk ahora usan LLMs para generar specs desde source code. O el enfoque incremental: empezar con las APIs nuevas y migrar las legacy gradualmente."

**P9: "¿ZAP puede probar lógica de negocio?"**
> "No completamente. ZAP es excelente para vulnerabilidades técnicas — inyección, auth rota, headers. Pero la lógica de negocio — por ejemplo, ¿puede un usuario transferir más de su límite diario? — requiere tests funcionales custom. El pipeline no reemplaza esos tests, los complementa."

**P10: "¿Por qué GitHub y no GitLab/Azure DevOps?"**
> "El concepto aplica igual en cualquier plataforma CI/CD. Usé GitHub porque es el más popular y las Actions son muy accesibles. Pero Spectral, Semgrep, ZAP y Gitleaks funcionan igual en GitLab CI, Azure Pipelines, o Jenkins."

---

### Preguntas sobre el contexto bancario

**P11: "¿Cómo manejo datos de producción en los tests?"**
> "Nunca. Los tests usan datos mock o sintéticos. El pipeline corre en el entorno de CI, nunca toca producción. ZAP ataca una instancia efímera de la API con datos ficticios. Esto es compatible con las regulaciones de protección de datos."

**P12: "¿Esto cumple con PCI-DSS?"**
> "Ayuda significativamente con los requisitos 6 y 11 de PCI-DSS 4.0: desarrollo seguro y pruebas regulares de seguridad. Cada PR se convierte en evidencia de que se ejecutaron controles de seguridad. No es compliance completo por sí solo, pero es una pieza fundamental."

**P13: "¿Qué pasa si un auditor de SUGEF pide evidencia?"**
> "Le muestro el repositorio. Cada pull request tiene: los 6 checks de seguridad ejecutados, los reportes generados, quién aprobó el merge, y la fecha exacta. Es más evidencia de la que cualquier auditor espera ver."

**P14: "¿Esto funciona para APIs de SINPE o sistemas de pago?"**
> "El concepto aplica a cualquier API REST con OpenAPI spec. Para SINPE específicamente, habría que crear reglas Spectral custom que validen los campos y formatos específicos del protocolo. Pero la arquitectura del pipeline es la misma."

**P15: "¿Qué pasa con APIs que usan SOAP en vez de REST?"**
> "SOAP no usa OpenAPI — usa WSDL. Spectral no aplica directamente, pero Semgrep, Gitleaks y npm audit sí. ZAP también escanea SOAP. El enfoque spec-driven es más natural con REST/OpenAPI, pero los principios de security-as-code aplican igual."

---

### Preguntas provocadoras

**P16: "¿No es esto security theater? ¿Realmente detecta vulnerabilidades serias?"**
> "Acaban de ver la demo: detectó un endpoint sin autenticación que exponía datos personales. Eso es exactamente lo que pasó en el breach de 700Credit que costó 5.8 millones de registros. No es theater — es la primera línea de defensa. Obvio no atrapa todo, ninguna herramienta lo hace. Pero atrapa el 80% de los errores más comunes."

**P17: "¿Para qué automatizar si puedo contratar un pen tester?"**
> "Un pen test se hace una vez al trimestre si tenés suerte. Tu equipo hace deploys cada semana. ¿Qué pasa con las 12 semanas entre pen tests? El pipeline no reemplaza al pen tester — cubre el espacio entre cada pen test."

**P18: "¿Esto no crea una falsa sensación de seguridad?"**
> "Solo si pensás que el pipeline es todo lo que necesitás. Es una capa. Se complementa con pen testing manual, threat modeling, training al equipo, y monitoreo en runtime. Pero es la capa que más falta en la mayoría de organizaciones."

**P19: "¿Qué pasa cuando GitHub se cae?"**
> "Buena pregunta. El pipeline depende de GitHub Actions. Si GitHub se cae, no podés hacer merge — que es exactamente el comportamiento que querés: si no puedo verificar la seguridad, no puedo deployar. Para redundancia, se puede correr el pipeline localmente también."

**P20: "Yo no uso Node.js, ¿esto sirve para mi stack?"**
> "El pipeline es agnóstico del lenguaje. Spectral analiza la spec, no el código. ZAP ataca la API en runtime, no importa si es Java, Python, Go o .NET. Semgrep tiene reglas para 30+ lenguajes. Solo cambian las dependencias, no la arquitectura."

---

### Preguntas extras (bonus)

**P21: "¿Cómo manejas secrets rotation en el pipeline?"**
> "Los secrets del pipeline viven en GitHub Secrets, nunca en el código. Para rotation: GitHub tiene integración con Azure Key Vault y AWS Secrets Manager para rotar automáticamente."

**P22: "¿Qué métricas debería trackear?"**
> "Cuatro: tiempo promedio de detección (MTTD), porcentaje de PRs que fallan checks de seguridad, número de vulnerabilidades detectadas antes de producción vs después, y cobertura del pipeline sobre el total de repos."

**P23: "¿Qué sigue después de implementar esto?"**
> "Runtime protection. Una vez que tenés el pipeline pre-producción, el siguiente paso es monitoreo en producción: API gateways con rate limiting, WAF, detección de anomalías. Y eventualmente, chaos engineering para probar resiliencia."

---

## 5.3 CRONOGRAMA DE PREPARACIÓN

### SEMANA 1: 10-14 de abril — "Cimientos"
| Día | Actividad | Horas |
|---|---|---|
| Jue 10 | Revisar todo el material de Fase 1 (guion). Leerlo 2 veces. | 2h |
| Vie 11 | Estudiar: OWASP API Top 10 completo | 3h |
| Sáb 12 | Estudiar: OpenAPI 3.1 + practicar editando la spec del repo | 3h |
| Dom 13 | Subir el repo a GitHub. Verificar que el pipeline corra. Hacer un PR de prueba. | 3h |
| Lun 14 | Estudiar: GitHub Actions en detalle. Leer el workflow del repo línea por línea. | 2h |

### SEMANA 2: 15-20 de abril — "Profundizar + Primer ensayo"
| Día | Actividad | Horas |
|---|---|---|
| Mar 15 | Estudiar: Regulaciones CR (CONASSIF, SUGEF, ley nueva) | 2h |
| Mié 16 | Estudiar: Spectral + ZAP. Correr ambos localmente contra tu API. | 3h |
| Jue 17 | Estudiar: Semgrep + Gitleaks. Correr ambos localmente. | 2h |
| Vie 18 | Primer ensayo completo solo (grabarte con el celular). Cronometrar. | 1.5h |
| Sáb 19 | Ver la grabación. Anotar muletillas, tiempos incorrectos, momentos flojos. | 1.5h |
| Dom 20 | Corregir guion según hallazgos. Segundo ensayo completo solo. | 2h |

### 📅 LUNES 21 DE ABRIL — ENSAYO CON ORGANIZADORES
**Rutina del día:**
- Mañana: repasar guion 1 vez. No estudiar cosas nuevas.
- 1 hora antes: llegar, probar equipo, probar internet, probar proyección.
- Tener Plan B listo (screenshots, video).
- Después del ensayo: anotar TODOS los comentarios de los organizadores.

### SEMANA 3: 22-27 de abril — "Refinamiento post-ensayo"
| Día | Actividad | Horas |
|---|---|---|
| Mar 22 | Implementar feedback de organizadores. Ajustar guion y slides. | 2h |
| Mié 23 | Estudiar: PCI-DSS 4.0 (requisitos 6 y 11) | 1.5h |
| Jue 24 | Estudiar: Herramientas alternativas (SonarQube, Snyk, 42Crunch) | 1h |
| Vie 25 | Practicar SOLO la demo (sin la parte hablada). 3 corridas seguidas. | 1.5h |
| Sáb 26 | Ensayo completo #3. Grabarse. | 1.5h |

### 📅 DOMINGO 27 DE ABRIL — SIMULACIÓN CON ORGANIZADORES
**Igual que el 21 pero con todo pulido.**

### SEMANAS 4-5: 28 abril - 11 mayo — "Pulir y automatizar"
| Semana | Actividad |
|---|---|
| 28 abr - 4 may | Crear ardops.dev (si no está listo). Generar QR. Preparar video backup de la demo. Tomar screenshots de cada paso. |
| 5-11 may | Practicar las 23 preguntas difíciles con alguien que te las haga al azar. Ensayo completo #4 y #5. Estudiar casos de breaches reales. |

### SEMANA 6: 12-17 mayo — "Modo competencia"
| Día | Actividad | Horas |
|---|---|---|
| Lun 12 | Ensayo completo #6 (último ensayo formal). Cronometrar al segundo. | 1.5h |
| Mar 13 | Revisar respuestas a preguntas difíciles. Leer guion 1 vez. | 1h |
| Mié 14 | Preparar todo el equipo físico (ver checklist abajo). Probar adaptadores. | 1h |
| Jue 15 | Día libre. Descansar. No estudiar nada. | 0h |
| Vie 16 | Leer guion 1 vez en la mañana. Caminar, hacer ejercicio. | 0.5h |
| Sáb 17 | Preparar ropa. Dormir temprano. Poner alarma con margen. | 0h |

---

### 📅 DOMINGO 18 DE MAYO — DÍA D

**La noche anterior:**
- Dejar ropa lista
- Cargar laptop, celular, backup battery
- Verificar que el repo está up y el pipeline funciona
- Verificar que ardops.dev carga bien
- USB con: slides, video backup de demo, screenshots
- Dormir antes de las 10pm

**Rutina del día:**

| Hora | Actividad |
|---|---|
| Mañana temprano | Desayunar bien (proteína + carbohidratos, no solo café) |
| -2h antes del evento | Salir de casa. Llevar todo el kit. |
| -1.5h | Llegar al venue. Conocer el espacio. |
| -1h | Conectar laptop al proyector. Probar audio. Probar que el clicker funciona. Probar internet. |
| -45min | Abrir la presentación. Abrir GitHub en el browser. Abrir terminal. Font size 24px. Dark theme. Notificaciones OFF. |
| -30min | Hacer una corrida rápida de la demo (verificar que el pipeline corre). |
| -15min | Ir al baño. Tomar agua. |
| -5min | Power pose en un lugar privado (2 minutos). 5 respiraciones profundas. |
| -2min | Caminar al escenario. Sonreír. Recordar: "Esta gente quiere que me vaya bien." |
| 0:00 | Empezar con el hook. NO con "Hola mi nombre es..." |

---

## 5.4 CHECKLIST DEL DÍA DEL EVENTO

### 🎒 Qué llevar
- [ ] Laptop cargada al 100% + cargador
- [ ] Adaptador HDMI (USB-C a HDMI si es Mac)
- [ ] USB con backup de: slides (.pptx), video de demo (.mp4), screenshots de cada paso
- [ ] Celular como hotspot personal (por si falla el WiFi del venue)
- [ ] Botella de agua SIN TAPA (no perder tiempo abriendo)
- [ ] Clicker/presenter inalámbrico (si tenés uno)
- [ ] Tarjetas de presentación o un QR impreso de ardops.dev
- [ ] Cable de carga del celular
- [ ] Backup battery
- [ ] Paño para limpiar lentes (si usás)

### 👔 Vestimenta
- Camisa de botones color sólido (azul oscuro, gris oscuro, o negro). Sin corbata.
- Pantalón oscuro (chino o jean oscuro sin roturas)
- Zapatos limpios, casuales-profesionales
- Cinturón si el pantalón lo necesita
- NO: traje completo (crea distancia), camiseta (pierde credibilidad), sandalias, shorts
- SÍ: algo que diga "soy técnico y me tomo esto en serio"

### 🖥 Configuración de la laptop
- [ ] Browser: solo las pestañas necesarias (repo, ardops.dev)
- [ ] Terminal: font size 24px+, dark theme
- [ ] Notificaciones: DO NOT DISTURB activado
- [ ] Pantalla: brillo al máximo
- [ ] Energía: conectada al cargador si es posible
- [ ] Sleep/screensaver: desactivado
- [ ] WiFi: conectado al WiFi del venue + hotspot como backup

### 🧠 Manejo de nervios
Si los nervios atacan antes de subir:
1. Respiración 4-7: inhalar 4 segundos, exhalar 7 segundos. Repetir 5 veces.
2. Power pose: manos en la cintura, pecho abierto, 2 minutos.
3. Frase interna: "Preparé esto durante 5 semanas. Sé más de este tema que el 95% de las personas en esta sala."
4. Recordar: los nervios son energía. No hay que eliminarlos, hay que canalizarlos.
5. Los primeros 30 segundos son los más difíciles. Después fluye.

### 🤝 Post-charla
- Quedarse disponible 15-20 minutos después para networking
- Tener el QR de ardops.dev listo para mostrar
- Si alguien te da feedback negativo, agradecer y anotar
- Si alguien te propone colaborar, intercambiar contactos inmediatamente
- Publicar en LinkedIn el mismo día: foto del evento + link al repo + agradecimiento a BCR/TechnoWeek
- Enviar un email de agradecimiento a los organizadores en las siguientes 24 horas

---

*Nota final: la diferencia entre una charla buena y una charla excepcional no es el conocimiento técnico — es la preparación. Ensayar 6+ veces, conocer las preguntas antes de que te las hagan, y tener todo el equipo listo. Nadie nace siendo buen speaker. Se entrena.*
