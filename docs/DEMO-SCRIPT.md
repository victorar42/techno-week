# 🎭 Archivos para la Demo en Vivo

Esta carpeta contiene los cambios que se introducen durante la demo
para mostrar cómo el pipeline detecta vulnerabilidades.

## Uso durante la demo

### Paso 1: Crear un branch
```bash
git checkout -b feature/add-customer-profile
```

### Paso 2: Agregar el endpoint vulnerable a openapi.yaml
Agregar al final de `paths:` en `openapi.yaml`:

```yaml
  /customers/{customer_id}/profile:
    get:
      operationId: getCustomerProfile
      summary: Obtener perfil del cliente
      description: Retorna la información personal del cliente.
      tags:
        - Customers
      # ⚠️ VULNERABILIDAD: No tiene 'security' definido
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
                  cedula:
                    type: string
                  phone:
                    type: string
```

### Paso 3: Agregar la ruta vulnerable en src/routes/customers.js
Crear `src/routes/customers.js`:

```javascript
const express = require("express");
const router = express.Router();

// ⚠️ VULNERABILIDAD 1: No usa authMiddleware
// ⚠️ VULNERABILIDAD 2: No valida formato de customer_id (posible IDOR)
// ⚠️ VULNERABILIDAD 3: Retorna datos sensibles sin filtrar

const MOCK_CUSTOMERS = {
  "12345": {
    name: "María García",
    email: "maria@ejemplo.com",
    cedula: "1-0234-0567",      // ⚠️ PII expuesta
    phone: "+506 8888-9999",     // ⚠️ PII expuesta
    address: "San José, CR",     // ⚠️ PII expuesta
    account_balance: 2500000,    // ⚠️ Dato financiero expuesto
  },
};

router.get("/:customer_id/profile", (req, res) => {
  const { customer_id } = req.params;
  const customer = MOCK_CUSTOMERS[customer_id];

  if (!customer) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }

  // ⚠️ Retorna TODO sin filtrar
  res.json(customer);
});

module.exports = router;
```

### Paso 4: Registrar la ruta en app.js
Agregar en `src/app.js` (SIN authMiddleware):

```javascript
const customerRoutes = require("./routes/customers");
// ⚠️ Note: NO usa authMiddleware
app.use("/api/v1/customers", customerRoutes);
```

### Paso 5: Commit y Push
```bash
git add .
git commit -m "feat: add customer profile endpoint"
git push origin feature/add-customer-profile
```

### Paso 6: Crear el PR
Crear el PR en GitHub y esperar a que el pipeline se ejecute.

## Qué debería detectar el pipeline

1. **Spectral**: ❌ Endpoint sin `security` definido
2. **Semgrep**: ❌ Ruta Express sin middleware de autenticación
3. **OWASP ZAP**: ❌ Broken Authentication en el endpoint
4. **Gitleaks**: ✅ (no hay secretos)
5. **npm audit**: ✅ (no cambiaron dependencias)

## Fix para hacer en vivo

1. Agregar `security: [BearerAuth: []]` en la spec
2. Agregar `authMiddleware` en app.js
3. Agregar `authorizeAccount` en la ruta
4. Filtrar campos sensibles de la respuesta
5. Commit, push, ver todo en verde
