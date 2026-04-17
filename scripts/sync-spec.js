#!/usr/bin/env node

/**
 * 🔧 Endpoint Sync — Auto-genera stubs de OpenAPI para endpoints nuevos
 *
 * Detecta rutas en Express que no están en la spec y genera
 * el YAML listo para copiar-pegar en openapi.yaml.
 *
 * Uso:
 *   node scripts/sync-spec.js              # Muestra el YAML en consola
 *   node scripts/sync-spec.js --apply      # Lo agrega directo al openapi.yaml
 *
 * El YAML generado incluye:
 * - El path con sus parámetros
 * - security: BearerAuth (por defecto, porque es banca)
 * - Respuestas 200, 401, 403
 * - Un TODO marker para que el developer complete los schemas
 *
 * IMPORTANTE: Esto genera un STUB, no una spec completa.
 * El developer DEBE revisar y completar los schemas, descriptions,
 * y validaciones antes de hacer commit.
 */

const fs = require("fs");
const yaml = require("js-yaml");
const app = require("../src/app");

// ── Extraer rutas de Express ────────────────────────────────

function getExpressRoutes(app) {
  const routes = [];

  function extractFromStack(stack, basePath = "") {
    if (!stack) return;
    stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods);
        methods.forEach((method) => {
          routes.push({
            method: method.toUpperCase(),
            path: normalizePath(basePath + layer.route.path),
          });
        });
      } else if (layer.name === "router" && layer.handle && layer.handle.stack) {
        const prefix = layer.regexp ? extractPrefix(layer.regexp) : "";
        extractFromStack(layer.handle.stack, basePath + prefix);
      }
    });
  }

  extractFromStack(app._router?.stack || []);
  return routes;
}

function extractPrefix(regexp) {
  let path = regexp.source || regexp.toString();
  path = path
    .replace(/^\^\\\//, "/")
    .replace(/\\\/\?\(\?=\\\/\|\$\)$/i, "")
    .replace(/\\\//g, "/")
    .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ":param")
    .replace(/\^|\$|\\/g, "");
  if (path === "/" || path === "" || path === "(?:/)?") return "";
  if (!path.startsWith("/")) path = "/" + path;
  return path;
}

function normalizePath(path) {
  return path
    .replace(/:(\w+)/g, "{$1}")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

// ── Extraer paths de la spec ────────────────────────────────

function getSpecPaths(specFile) {
  const content = fs.readFileSync(specFile, "utf-8");
  const spec = yaml.load(content);
  const paths = [];

  if (!spec.paths) return paths;

  let basePath = "";
  if (spec.servers && spec.servers.length > 0) {
    try {
      const url = new URL(spec.servers[0].url);
      basePath = url.pathname.replace(/\/$/, "");
    } catch {
      basePath = spec.servers[0].url.replace(/\/$/, "");
    }
  }

  Object.entries(spec.paths).forEach(([path, operations]) => {
    const methods = ["get", "post", "put", "delete", "patch"];
    methods.forEach((method) => {
      if (operations[method]) {
        paths.push({
          method: method.toUpperCase(),
          path: basePath + path,
          specPath: path,
        });
      }
    });
  });

  return { paths, basePath, spec };
}

// ── Detectar drift ──────────────────────────────────────────

function findMissingEndpoints(expressRoutes, specPaths) {
  const ignoredPatterns = ["/health", "/favicon.ico"];
  const specSet = new Set(specPaths.map((p) => `${p.method}:${p.path}`));

  return expressRoutes.filter((route) => {
    if (ignoredPatterns.some((p) => route.path === p)) return false;
    if (!route.path || route.path === "/") return false;
    return !specSet.has(`${route.method}:${route.path}`);
  });
}

// ── Generar YAML stub ───────────────────────────────────────

function generateStub(route, basePath) {
  // Remove base path to get the spec-level path
  let specPath = route.path;
  if (basePath && specPath.startsWith(basePath)) {
    specPath = specPath.substring(basePath.length);
  }
  if (!specPath.startsWith("/")) specPath = "/" + specPath;

  // Extract path parameters
  const paramMatches = specPath.match(/\{(\w+)\}/g) || [];
  const params = paramMatches.map((p) => p.replace(/[{}]/g, ""));

  const method = route.method.toLowerCase();

  // Build the operation object
  const operation = {
    operationId: generateOperationId(method, specPath),
    summary: `TODO: Agregar descripcion para ${method.toUpperCase()} ${specPath}`,
    description: "TODO: Describir que hace este endpoint, que datos maneja, y que validaciones aplica.",
    tags: [guessTag(specPath)],
    security: [{ BearerAuth: [] }],
  };

  // Add parameters if any
  if (params.length > 0) {
    operation.parameters = params.map((param) => ({
      name: param,
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
      description: `TODO: Describir ${param}`,
    }));
  }

  // Add requestBody for POST/PUT/PATCH
  if (["post", "put", "patch"].includes(method)) {
    operation.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "TODO_field": {
                type: "string",
                description: "TODO: Definir campos del request body",
              },
            },
          },
        },
      },
    };
  }

  // Add responses
  operation.responses = {
    "200": {
      description: "TODO: Describir respuesta exitosa",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "TODO_field": {
                type: "string",
                description: "TODO: Definir campos de la respuesta",
              },
            },
          },
        },
      },
    },
    "401": { $ref: "#/components/responses/Unauthorized" },
    "403": { $ref: "#/components/responses/Forbidden" },
  };

  // Build the path object
  const pathObj = {};
  pathObj[specPath] = {};
  pathObj[specPath][method] = operation;

  return { specPath, pathObj, operation, method };
}

function generateOperationId(method, path) {
  const parts = path
    .replace(/\{[^}]+\}/g, "")
    .split("/")
    .filter((p) => p);
  const name = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  const prefixes = { get: "get", post: "create", put: "update", patch: "update", delete: "delete" };
  return (prefixes[method] || method) + name;
}

function guessTag(path) {
  const parts = path.split("/").filter((p) => p && !p.startsWith("{"));
  return parts.length > 0
    ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    : "General";
}

// ── Aplicar al archivo ──────────────────────────────────────

function applyToSpec(specFile, stubs) {
  const content = fs.readFileSync(specFile, "utf-8");
  const spec = yaml.load(content);

  if (!spec.paths) spec.paths = {};

  stubs.forEach(({ specPath, method, operation }) => {
    if (!spec.paths[specPath]) {
      spec.paths[specPath] = {};
    }
    spec.paths[specPath][method] = operation;
  });

  const output = yaml.dump(spec, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });

  fs.writeFileSync(specFile, output, "utf-8");
}

// ── Main ────────────────────────────────────────────────────

function main() {
  const specFile = process.env.SPEC_FILE || "openapi.yaml";
  const shouldApply = process.argv.includes("--apply");

  console.log("🔧 Endpoint Sync — OpenAPI Stub Generator");
  console.log("=".repeat(50));
  console.log(`   Spec file: ${specFile}`);
  console.log(`   Mode: ${shouldApply ? "APPLY (writing to file)" : "PREVIEW (console only)"}`);
  console.log("");

  if (!fs.existsSync(specFile)) {
    console.error(`❌ Spec file not found: ${specFile}`);
    process.exit(1);
  }

  const expressRoutes = getExpressRoutes(app);
  const { paths: specPaths, basePath } = getSpecPaths(specFile);
  const missing = findMissingEndpoints(expressRoutes, specPaths);

  if (missing.length === 0) {
    console.log("✅ No missing endpoints. Spec is up to date!");
    process.exit(0);
  }

  console.log(`📋 Found ${missing.length} endpoint(s) not in spec:\n`);

  const stubs = missing.map((route) => {
    const stub = generateStub(route, basePath);

    console.log(`   ⚠️  ${route.method} ${route.path}`);
    console.log("");

    // Print YAML for this endpoint
    const yamlStr = yaml.dump(stub.pathObj, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
    });

    console.log("   Generated YAML stub:");
    console.log("   ─────────────────────────────────────");
    yamlStr.split("\n").forEach((line) => {
      console.log(`   ${line}`);
    });
    console.log("");

    return stub;
  });

  if (shouldApply) {
    applyToSpec(specFile, stubs);
    console.log(`✅ Applied ${stubs.length} stub(s) to ${specFile}`);
    console.log("");
    console.log("⚠️  IMPORTANTE: Los stubs tienen marcadores TODO.");
    console.log("   Abrí openapi.yaml y completá:");
    console.log("   - Descriptions reales");
    console.log("   - Schemas de request y response");
    console.log("   - Validaciones (min, max, format, enum)");
    console.log("   - Security schemes apropiados");
    console.log("");
    console.log("   NO hagas commit sin completar los TODOs.");
  } else {
    console.log("─".repeat(50));
    console.log("📋 Para aplicar estos stubs al archivo:");
    console.log(`   node scripts/sync-spec.js --apply`);
    console.log("");
    console.log("   O copiá el YAML de arriba y pegalo manualmente");
    console.log("   en la sección 'paths:' de openapi.yaml");
  }
}

main();