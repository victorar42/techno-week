#!/usr/bin/env node

/**
 * 🔍 Endpoint Drift Detector
 *
 * Compara las rutas registradas en Express contra los paths
 * definidos en la OpenAPI spec. Si encuentra rutas en el código
 * que no están en la spec, falla con error.
 *
 * Uso:
 *   node scripts/detect-drift.js
 *
 * ¿Por qué importa?
 *   Si un developer agrega un endpoint pero no lo documenta
 *   en openapi.yaml, el pipeline spec-driven no lo puede validar.
 *   Este script cierra esa brecha: detecta "endpoints fantasma"
 *   que existen en el código pero no en el contrato de seguridad.
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
        // Direct route (app.get, app.post, etc.)
        const methods = Object.keys(layer.route.methods);
        methods.forEach((method) => {
          routes.push({
            method: method.toUpperCase(),
            path: normalizePath(basePath + layer.route.path),
          });
        });
      } else if (layer.name === "router" && layer.handle && layer.handle.stack) {
        // Router middleware (app.use('/prefix', router))
        const prefix = layer.regexp
          ? extractPrefix(layer.regexp, layer.keys)
          : "";
        extractFromStack(layer.handle.stack, basePath + prefix);
      }
    });
  }

  extractFromStack(app._router?.stack || []);
  return routes;
}

function extractPrefix(regexp, keys) {
  // Convert Express regex back to path string
  let path = regexp.source || regexp.toString();

  // Clean up regex artifacts
  path = path
    .replace(/^\^\\\//, "/")
    .replace(/\\\/\?\(\?=\\\/\|\$\)$/i, "")
    .replace(/\\\//g, "/")
    .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ":param")
    .replace(/\^|\$|\\/g, "");

  // Handle common Express patterns
  if (path === "/" || path === "" || path === "(?:/)?") return "";

  // Ensure starts with /
  if (!path.startsWith("/")) path = "/" + path;

  return path;
}

function normalizePath(path) {
  // Convert Express :param to OpenAPI {param} format for comparison
  return path
    .replace(/:(\w+)/g, "{$1}")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

// ── Extraer paths de la OpenAPI spec ────────────────────────

function getSpecPaths(specFile) {
  const content = fs.readFileSync(specFile, "utf-8");
  const spec = yaml.load(content);
  const paths = [];

  if (!spec.paths) return paths;

  // Extract server base path
  let basePath = "";
  if (spec.servers && spec.servers.length > 0) {
    try {
      const url = new URL(spec.servers[0].url);
      basePath = url.pathname.replace(/\/$/, "");
    } catch {
      // Relative URL, use as-is
      basePath = spec.servers[0].url.replace(/\/$/, "");
    }
  }

  Object.entries(spec.paths).forEach(([path, operations]) => {
    const methods = ["get", "post", "put", "delete", "patch", "options", "head"];
    methods.forEach((method) => {
      if (operations[method]) {
        paths.push({
          method: method.toUpperCase(),
          path: basePath + path,
        });
      }
    });
  });

  return paths;
}

// ── Comparar ────────────────────────────────────────────────

function detectDrift(expressRoutes, specPaths) {
  // Ignore internal routes (health, 404 handler, etc.)
  const ignoredPatterns = ["/health", "/favicon.ico"];

  const specSet = new Set(specPaths.map((p) => `${p.method}:${p.path}`));

  const drift = expressRoutes.filter((route) => {
    // Skip ignored routes
    if (ignoredPatterns.some((pattern) => route.path === pattern)) return false;
    // Skip if no real path (middleware-only)
    if (!route.path || route.path === "/") return false;

    const key = `${route.method}:${route.path}`;
    return !specSet.has(key);
  });

  return drift;
}

// ── Main ────────────────────────────────────────────────────

function main() {
  const specFile = process.env.SPEC_FILE || "openapi.yaml";

  console.log("🔍 Endpoint Drift Detector");
  console.log("=" .repeat(50));
  console.log(`   Spec file: ${specFile}`);
  console.log("");

  // Check spec exists
  if (!fs.existsSync(specFile)) {
    console.error(`❌ Spec file not found: ${specFile}`);
    process.exit(1);
  }

  // Get routes from both sources
  const expressRoutes = getExpressRoutes(app);
  const specPaths = getSpecPaths(specFile);

  console.log(`📋 Routes in OpenAPI spec: ${specPaths.length}`);
  specPaths.forEach((p) => {
    console.log(`   ✅ ${p.method} ${p.path}`);
  });

  console.log("");
  console.log(`🔧 Routes in Express app: ${expressRoutes.length}`);
  expressRoutes.forEach((r) => {
    console.log(`   📌 ${r.method} ${r.path}`);
  });

  console.log("");

  // Detect drift
  const drift = detectDrift(expressRoutes, specPaths);

  if (drift.length === 0) {
    console.log("✅ No endpoint drift detected!");
    console.log("   All code routes are documented in the OpenAPI spec.");
    process.exit(0);
  } else {
    console.log(`❌ ENDPOINT DRIFT DETECTED: ${drift.length} undocumented route(s)`);
    console.log("");
    drift.forEach((route) => {
      console.log(`   ⚠️  ${route.method} ${route.path}`);
      console.log(`      → Exists in code but NOT in ${specFile}`);
      console.log(`      → This endpoint has no security contract!`);
      console.log("");
    });
    console.log("💡 Fix: Add these endpoints to your OpenAPI spec with proper");
    console.log("   security schemes, or remove them from the code.");
    console.log("");
    process.exit(1);
  }
}

main();