#!/usr/bin/env node

/**
 * Genera un token JWT para pruebas y para la prueba en caliente.
 *
 * Uso:
 *   node scripts/generate-token.js
 *   node scripts/generate-token.js --role admin
 *   node scripts/generate-token.js --expired
 */

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

const args = process.argv.slice(2);
const isAdmin = args.includes("--role") && args[args.indexOf("--role") + 1] === "admin";
const isExpired = args.includes("--expired");

const payload = {
  sub: "user-001",
  role: isAdmin ? "admin" : "customer",
  accounts: [
    "550e8400-e29b-41d4-a716-446655440000",
    "660e8400-e29b-41d4-a716-446655440001",
  ],
  iat: Math.floor(Date.now() / 1000),
};

const options = {
  expiresIn: isExpired ? "-1h" : "1h",
};

const token = jwt.sign(payload, JWT_SECRET, options);

console.log("\n🔑 JWT Token Generated\n");
console.log("Token:");
console.log(token);
console.log("\nPayload:");
console.log(JSON.stringify(payload, null, 2));
console.log("\nUsage:");
console.log(`curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance`);
console.log("");
