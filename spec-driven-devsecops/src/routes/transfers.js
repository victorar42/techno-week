const express = require("express");
const router = express.Router();
const { v4: uuidv4, validate: isUuid } = require("uuid");

/**
 * POST /transfers
 *
 * Crea una nueva transferencia bancaria.
 * Validaciones:
 * - Campos requeridos presentes
 * - Formato UUID en account IDs
 * - Monto positivo y dentro del límite
 * - Cuenta origen != cuenta destino
 */
router.post("/", (req, res) => {
  const { source_account_id, destination_account_id, amount, currency, description } = req.body;

  // ── Validaciones ──────────────────────────────────────────
  const errors = [];

  if (!source_account_id || !isUuid(source_account_id)) {
    errors.push("source_account_id debe ser un UUID válido");
  }

  if (!destination_account_id || !isUuid(destination_account_id)) {
    errors.push("destination_account_id debe ser un UUID válido");
  }

  if (source_account_id === destination_account_id) {
    errors.push("La cuenta origen y destino no pueden ser la misma");
  }

  if (!amount || typeof amount !== "number" || amount <= 0) {
    errors.push("El monto debe ser un número positivo");
  }

  if (amount > 50000000) {
    errors.push("El monto excede el límite máximo de 50,000,000");
  }

  if (!currency || !["CRC", "USD"].includes(currency)) {
    errors.push("La moneda debe ser CRC o USD");
  }

  if (!description || typeof description !== "string" || description.length === 0) {
    errors.push("La descripción es requerida");
  }

  if (description && description.length > 200) {
    errors.push("La descripción no debe exceder 200 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      code: "VALIDATION_001",
      message: "Datos de transferencia inválidos",
      details: { errors },
    });
  }

  // ── Verificar que el usuario tiene acceso a la cuenta origen ──
  if (req.user.role !== "admin" && !req.user.accounts.includes(source_account_id)) {
    return res.status(403).json({
      code: "AUTH_002",
      message: "No tiene permisos para realizar transferencias desde esta cuenta",
    });
  }

  // ── Crear transferencia (mock) ────────────────────────────
  const transfer = {
    transfer_id: uuidv4(),
    status: "completed",
    source_account_id,
    destination_account_id,
    amount,
    currency,
    created_at: new Date().toISOString(),
  };

  res.status(201).json(transfer);
});

module.exports = router;
