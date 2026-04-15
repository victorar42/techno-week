# 🎬 GUÍA COMPLETA DE LA DEMO EN VIVO

## Preparación Pre-Demo (hacer ANTES del evento)

### 1. Setup del repositorio en GitHub
```bash
# Crear el repo en GitHub (público)
gh repo create ardops/spec-driven-devsecops --public --source=. --push

# Verificar que el pipeline corre correctamente
# Hacer un PR de prueba y verificar que los 6 checks aparecen
```

### 2. Preparar el branch de la vulnerabilidad
```bash
# IMPORTANTE: Preparar esto ANTES del evento
# Crear el branch con los cambios vulnerables pero NO hacer push todavía

git checkout -b feature/add-customer-profile

# Crear el archivo vulnerable
cat > src/routes/customers.js << 'EOF'
const express = require("express");
const router = express.Router();

// ⚠️ SIN autenticación — cualquiera puede acceder
const MOCK_CUSTOMERS = {
  "12345": {
    name: "María García Rodríguez",
    email: "maria.garcia@ejemplo.com",
    cedula: "1-0234-0567",
    phone: "+506 8888-9999",
    address: "Escazú, San José, Costa Rica",
    account_balance: 2500000,
  },
  "67890": {
    name: "Carlos Jiménez Mora",
    email: "carlos.jimenez@ejemplo.com",
    cedula: "3-0456-0789",
    phone: "+506 7777-6666",
    address: "Heredia, Costa Rica",
    account_balance: 8750000,
  },
};

router.get("/:customer_id/profile", (req, res) => {
  const { customer_id } = req.params;
  const customer = MOCK_CUSTOMERS[customer_id];

  if (!customer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }

  res.json(customer);
});

module.exports = router;
EOF
```

### 3. Preparar los cambios en openapi.yaml
Agregar al final de `paths:` (SIN security):

```yaml
  /customers/{customer_id}/profile:
    get:
      operationId: getCustomerProfile
      summary: Obtener perfil del cliente
      description: Retorna la información personal del cliente
      tags:
        - Customers
      parameters:
        - name: customer_id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Perfil del cliente
          content:
            application/json:
              schema:
                type: object
                properties:
                  name:
                    type: string
                  email:
                    type: string
                    format: email
                  cedula:
                    type: string
                  phone:
                    type: string
```

### 4. Preparar cambio en app.js
Agregar ANTES de la línea del 404 handler:

```javascript
const customerRoutes = require("./routes/customers");
app.use("/api/v1/customers", customerRoutes); // ⚠️ Sin authMiddleware
```

### 5. Preparar el fix
Tener listo en un archivo aparte (o en un stash de git) la versión corregida:

**openapi.yaml** — agregar security:
```yaml
      security:
        - BearerAuth: []
```

**app.js** — agregar authMiddleware:
```javascript
app.use("/api/v1/customers", authMiddleware, customerRoutes);
```

**customers.js** — agregar authorize y validación:
```javascript
const authorizeAccount = require("../middleware/authorize");
const { validate: isUuid } = require("uuid");

// Agregar middleware y validación al handler
```

### 6. Preparar backup visual
- Tomar screenshots de: repo structure, spec, PR con checks rojos, reporte, PR con checks verdes
- Grabar un video de pantalla de toda la demo (5 min acelerado)
- Guardar en USB y en la nube

---

## Script de la Demo (17 minutos)

### ⏱ 0:00-2:00 — Mostrar el Repositorio

**Abrir:** github.com/ardops/spec-driven-devsecops

**Narrar:**
> "Este es el repositorio. Público. Todo lo que ven aquí lo pueden clonar después."

**Mostrar rápidamente:**
1. README (30 seg) — señalar el diagrama de arquitectura
2. Estructura de carpetas (30 seg) — enfatizar openapi.yaml como pieza central
3. SECURITY.md (15 seg) — "El repo practica lo que predica"
4. `.github/workflows/` (15 seg) — "Aquí está la magia"

**Tip:** NO abrir los archivos completos. Solo mostrar la estructura. La audiencia se pierde si ven mucho código.

---

### ⏱ 2:00-5:00 — La OpenAPI Spec como Contrato

**Abrir:** `openapi.yaml`

**Narrar:**
> "Este archivo es el corazón de todo. Es una API bancaria con tres endpoints."

**Señalar** (scroll suave, no rápido):
1. Los endpoints: balance, transfers, transactions
2. En cada uno señalar: `security: - BearerAuth: []`
3. Los schemas: señalar `format: uuid` en account_id
4. Los límites: señalar `maximum: 50000000` en amount
5. Las respuestas de error: 401, 403, 429

> "Cada campo sensible tiene formato definido. Cada endpoint tiene autenticación. Cada monto tiene límite. Y si alguien se olvida de alguno de estos... el pipeline lo detecta."

---

### ⏱ 5:00-7:00 — Introducir la Vulnerabilidad

**Narrar con tono conspirativo:**
> "Ahora voy a hacer algo que pasa todos los días en equipos de desarrollo. Voy a agregar un endpoint nuevo. Tengo prisa. Se me 'olvida' ponerle seguridad."

**Ejecutar** (tener los comandos listos, no tipear en vivo):

```bash
git checkout feature/add-customer-profile
# Los archivos ya están preparados
```

**Mostrar rápidamente:**
1. `customers.js` — señalar que NO tiene authMiddleware
2. `openapi.yaml` — señalar que NO tiene `security:`
3. `app.js` — señalar que la ruta se registra SIN auth

> "Un endpoint que expone cédula, teléfono, dirección, saldo... sin ninguna autenticación. Un descuido inocente."

**Hacer el push y crear el PR:**
```bash
git push origin feature/add-customer-profile
```

Crear el PR en GitHub (tener la URL pre-cargada o usar `gh pr create`).

---

### ⏱ 7:00-12:00 — El Pipeline en Acción

**Narrar mientras se ejecutan los workflows:**
> "Y ahora GitHub hace lo suyo. Miren: se dispararon los 6 checks automáticamente."

**Mientras esperamos** (los workflows tardan 1-3 minutos):
- Mostrar que los checks están "in progress" con spinners amarillos
- Explicar brevemente qué hace cada uno
- Si tarda mucho, usar este relleno:

> "Esto en un pipeline real toma entre 2 y 5 minutos. En ese tiempo el developer puede seguir trabajando en otra cosa. Cuando termina, le llega una notificación."

**Cuando aparecen los resultados:**

> "¡Ahí está! Miren."

Señalar con entusiasmo:
1. **Spectral: ❌** — "Detectó un endpoint sin security definido"
2. **Semgrep: ❌** — "Encontró una ruta Express sin middleware de autenticación"
3. **OWASP ZAP: ❌** — "Atacó el endpoint y confirmó: Broken Authentication, severidad alta"
4. **Gitleaks: ✅** — "No hay secretos filtrados, bien"
5. **npm audit: ✅** — "Dependencias seguras"

> "El PR tiene 3 checks en rojo. Nadie puede hacer merge. El código inseguro NUNCA llega a producción."

**[PAUSA DRAMÁTICA]**

> "0.3 segundos versus 5.8 millones de víctimas. ¿Recuerdan?"

---

### ⏱ 12:00-14:00 — El Reporte de Compliance

**Scroll al comentario del bot en el PR:**

> "Y miren esto: se generó automáticamente un reporte como comentario en el PR."

**Señalar la tabla:**
- Semáforo visual: ❌ Spectral, ❌ SAST, ❌ DAST, ✅ Secrets, ✅ Dependencies

> "Esto es lo que ve el reviewer. Esto es lo que ve un auditor de SUGEF. Todo automático. Todo documentado. Con fecha, hora, y resultado."

---

### ⏱ 14:00-17:00 — El Fix

**Narrar:**
> "Ahora hagamos lo correcto."

**Aplicar los fixes** (tener listos con `git stash pop` o copiar-pegar):

1. Agregar `security:` en openapi.yaml
2. Agregar `authMiddleware` en app.js
3. Commit y push

```bash
git add .
git commit -m "fix: add authentication to customer profile endpoint"
git push
```

**Mostrar los workflows ejecutándose de nuevo...**

> "Y ahora esperamos... Spectral: verde. Semgrep: verde. ZAP: verde. Todo verde."

> "Pull request listo para merge. Todo documentado. Todo auditable."

**Dirigirse a los tomadores de decisión:**
> "Cada uno de estos checks es un registro verificable. Con timestamp. En un sistema que no se puede manipular. Eso es lo que SUGEF quiere ver."

---

## Plan B: Si Algo Falla

### Si GitHub Actions no se dispara:
> "GitHub a veces toma unos segundos extra. Mientras esperamos, déjenme mostrarles cómo se ve cuando funciona..."
→ Abrir screenshots pre-grabados

### Si un check pasa cuando debería fallar:
> "Interesante — esto puede pasar por caching. Déjenme mostrarles la corrida que hice ayer donde sí lo detectó..."
→ Abrir screenshots o video

### Si la conexión a internet falla:
> "Murphy's Law existe incluso en DevOps. Precisamente por eso necesitamos pipelines automatizados."
→ Tener TODO offline: screenshots, video, repo clonado local
→ Mostrar el video de la demo grabado previamente

### Si TODO falla:
> "Les voy a ser honesto: preparé esta demo 10 veces y funcionó perfectamente. Hoy la nube decidió que no. Pero fíjense que esto demuestra exactamente mi punto: los entornos son impredecibles. Por eso la seguridad NO puede depender de procesos manuales."
→ Mostrar video backup
→ Convertir el fallo en un momento de enseñanza

---

## Checklist Pre-Demo

- [ ] Repo público y accesible
- [ ] Pipeline funcionando (hacer una corrida de prueba el día anterior)
- [ ] Branch `feature/add-customer-profile` preparado pero NO pusheado
- [ ] Fix preparado en un archivo aparte o en git stash
- [ ] Screenshots de cada paso guardados en USB
- [ ] Video completo de la demo grabado
- [ ] Conexión a internet probada en el venue
- [ ] Hotspot personal como backup de internet
- [ ] Terminal con font size grande (24px+)
- [ ] Dark theme en el editor y en GitHub
- [ ] Browser sin pestañas distractoras
- [ ] Notificaciones silenciadas
- [ ] URL del repo pre-cargada en el browser
- [ ] Token de prueba pre-generado
