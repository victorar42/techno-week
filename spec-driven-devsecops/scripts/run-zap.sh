#!/bin/bash
# ┌─────────────────────────────────────────────────┐
# │  Script para ejecutar OWASP ZAP localmente      │
# │  contra la API usando la OpenAPI Spec            │
# └─────────────────────────────────────────────────┘

set -e

API_URL="${API_URL:-http://localhost:3000}"
SPEC_FILE="openapi.yaml"

echo "⚡ Starting OWASP ZAP API Scan..."
echo "   Target: $API_URL"
echo "   Spec:   $SPEC_FILE"
echo ""

# Check if API is running
if ! curl -sf "$API_URL/health" > /dev/null 2>&1; then
  echo "❌ API is not running at $API_URL"
  echo "   Start it with: npm start"
  exit 1
fi

# Run ZAP in Docker
docker run --rm \
  --network host \
  -v "$(pwd):/zap/wrk:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-api-scan.py \
  -t "$API_URL/api/v1" \
  -f openapi \
  -r zap-report.html \
  -J zap-report.json \
  -z "-config api.disablekey=true" \
  -I

echo ""
echo "📊 ZAP scan complete!"
echo "   HTML Report: zap-report.html"
echo "   JSON Report: zap-report.json"
