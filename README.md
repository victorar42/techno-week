# 🔒 Spec-Driven DevSecOps for Banking APIs

[![DevSecOps Pipeline](https://github.com/ardops/spec-driven-devsecops/actions/workflows/devsecops-pipeline.yml/badge.svg)](https://github.com/ardops/spec-driven-devsecops/actions)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.1-green?logo=openapiinitiative)](./openapi.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![OWASP](https://img.shields.io/badge/OWASP-API%20Top%2010-orange?logo=owasp)](https://owasp.org/API-Security/)

> **La especificación OpenAPI como contrato de seguridad**: un pipeline DevSecOps completo que genera validaciones de seguridad automáticas a partir de la spec de tu API bancaria.

📺 **Presentado en [Techno Week 8.0](https://ardops.dev) — Banco de Costa Rica**

---

## 🏗️ Arquitectura

```
┌──────────────┐     ┌──────────────────────────────────────────────┐
│              │     │          GitHub Actions Pipeline              │
│  Developer   │     │                                              │
│  hace PR     │────▶│  ┌────────┐  ┌────────┐  ┌────────────────┐ │
│              │     │  │Spectral│  │Semgrep │  │   Gitleaks     │ │
└──────────────┘     │  │Spec    │  │SAST    │  │   Secrets      │ │
                     │  │Lint    │  │Analysis│  │   Detection    │ │
┌──────────────┐     │  └───┬────┘  └───┬────┘  └──────┬─────────┘ │
│              │     │      │           │              │           │
│  openapi.yaml│     │  ┌───▼────┐  ┌───▼────┐  ┌─────▼──────┐   │
│  (Contrato   │────▶│  │npm     │  │OWASP   │  │ Compliance │   │
│  de          │     │  │audit   │  │ZAP     │  │ Report     │   │
│  Seguridad)  │     │  │Deps    │  │DAST    │  │ Generator  │   │
│              │     │  └────────┘  └────────┘  └────────────┘   │
└──────────────┘     │                                              │
                     │  Result: ✅ PR approved / ❌ PR blocked      │
                     └──────────────────────────────────────────────┘
```

## 🔑 Concepto: Spec-Driven Security

La mayoría de los pipelines DevSecOps agregan herramientas de seguridad como pasos aislados. Este proyecto toma un enfoque diferente: **la OpenAPI Spec es el punto central** del que se derivan todas las validaciones.

| Enfoque Tradicional | Enfoque Spec-Driven |
|---------------------|---------------------|
| Herramientas de seguridad sueltas | Todo nace de la spec |
| Configuración manual por herramienta | La spec genera la configuración |
| Cobertura parcial e inconsistente | 100% de los endpoints documentados |
| Difícil de auditar | Evidencia automática en cada PR |
| Depende de expertos de seguridad | Automatizado para cualquier dev |

## 🚀 Quick Start

### Prerrequisitos
- Node.js >= 20
- Docker (para OWASP ZAP local)
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ardops/spec-driven-devsecops.git
cd spec-driven-devsecops

# Instalar dependencias
npm install

# Generar un token de prueba
npm run generate:token

# Iniciar la API
npm start
```

### Probar los endpoints

```bash
# Generar token
TOKEN=$(node scripts/generate-token.js | grep "^ey" )

# Consultar saldo
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance | jq

# Hacer transferencia
curl -s -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"source_account_id":"550e8400-e29b-41d4-a716-446655440000","destination_account_id":"660e8400-e29b-41d4-a716-446655440001","amount":50000,"currency":"CRC","description":"Pago de servicios"}' \
  http://localhost:3000/api/v1/transfers | jq

# Ver transacciones
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/transactions | jq
```

### Ejecutar validaciones localmente

```bash
# Lint de la OpenAPI Spec
npm run lint:spec

# Análisis estático (SAST)
npm run security:sast

# Detección de secretos
npm run security:secrets

# Vulnerabilidades en dependencias
npm run security:deps

# Todas las validaciones
npm run security:all

# Tests
npm test
```

## 📁 Estructura del Proyecto

```
spec-driven-devsecops/
├── openapi.yaml                  # 📋 Contrato de Seguridad (fuente de verdad)
├── .spectral/
│   └── .spectral-banking.yaml    # Reglas de seguridad para APIs bancarias
├── .github/
│   └── workflows/
│       └── devsecops-pipeline.yml # 🔒 Pipeline de 6 etapas
├── .zap/
│   └── rules.tsv                 # Configuración de OWASP ZAP
├── src/
│   ├── app.js                    # Aplicación Express
│   ├── server.js                 # Entry point
│   ├── middleware/
│   │   ├── auth.js               # 🔑 Autenticación JWT
│   │   └── authorize.js          # 🛡️ Autorización por cuenta
│   └── routes/
│       ├── balance.js            # GET /accounts/:id/balance
│       ├── transfers.js          # POST /transfers
│       └── transactions.js       # GET /accounts/:id/transactions
├── tests/
│   └── api.test.js               # Tests de la API
├── scripts/
│   ├── generate-token.js         # Generador de JWT para pruebas
│   └── run-zap.sh                # Runner local de OWASP ZAP
├── docs/
│   └── DEMO-SCRIPT.md            # Script paso a paso de la demo
├── SECURITY.md                   # Política de seguridad
├── CONTRIBUTING.md               # Guía de contribución
└── LICENSE                       # MIT License
```

## 🔒 Las 6 Etapas del Pipeline

### 1. 📋 Spectral — Lint de la OpenAPI Spec
Valida que la spec cumpla con reglas de seguridad bancarias: autenticación en todos los endpoints, HTTPS, UUIDs en vez de IDs secuenciales, límites en montos.

### 2. 🔍 Semgrep — Análisis Estático (SAST)
Busca patrones de código vulnerables: inyección SQL, XSS, secretos hardcodeados, configuraciones inseguras de JWT.

### 3. 🔑 Gitleaks — Detección de Secretos
Escanea el repositorio completo buscando API keys, contraseñas, tokens, y otros secretos que no deberían estar en el código.

### 4. 📦 npm audit — Análisis de Dependencias
Revisa todas las dependencias contra bases de datos de vulnerabilidades conocidas (CVEs). Falla en críticas y altas.

### 5. ⚡ OWASP ZAP — Pruebas Dinámicas (DAST)
Levanta la API y ejecuta ataques automatizados basados en la OpenAPI Spec: autenticación rota, inyección, exposición de datos.

### 6. 📊 Compliance Report
Genera un reporte consolidado como comentario en el PR con el resultado de cada etapa.

## 📚 Recursos

- [OpenAPI Specification 3.1](https://spec.openapis.org/oas/v3.1.0)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [Spectral Documentation](https://docs.stoplight.io/docs/spectral/)
- [GitHub Actions Security Guides](https://docs.github.com/en/actions/security-guides)
- [Semgrep Rules](https://semgrep.dev/explore)

## 🤝 Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles.

## 📄 Licencia

MIT — ver [LICENSE](LICENSE) para detalles.

---

**Creado por [ARDOps](https://ardops.dev)** | Presentado en Techno Week 8.0 — Banco de Costa Rica
