const express = require("express");
const router = express.Router();
const authorizeAccount = require("../middleware/authorize");
const { validate: isUuid } = require("uuid");

// Mock data for demo purposes
const MOCK_ACCOUNTS = {
  "550e8400-e29b-41d4-a716-446655440000": {
    account_id: "550e8400-e29b-41d4-a716-446655440000",
    account_number: "CR05015202001026284066",
    currency: "CRC",
    available_balance: 1250000.5,
    ledger_balance: 1350000.5,
  },
  "660e8400-e29b-41d4-a716-446655440001": {
    account_id: "660e8400-e29b-41d4-a716-446655440001",
    account_number: "CR21015202001026284077",
    currency: "USD",
    available_balance: 5200.75,
    ledger_balance: 5200.75,
  },
};

/**
 * GET /accounts/:account_id/balance
 *
 * Consulta el saldo de una cuenta bancaria.
 * Requiere autenticación JWT y autorización por cuenta.
 */
router.get("/:account_id/balance", authorizeAccount, (req, res) => {
  const { account_id } = req.params;

  // Validate UUID format to prevent injection
  if (!isUuid(account_id)) {
    return res.status(400).json({
      code: "VALIDATION_001",
      message: "El account_id debe ser un UUID válido",
    });
  }

  const account = MOCK_ACCOUNTS[account_id];

  if (!account) {
    return res.status(404).json({
      code: "ACCOUNT_001",
      message: "Cuenta no encontrada",
    });
  }

  res.json({
    ...account,
    as_of: new Date().toISOString(),
  });
});

module.exports = router;
