const express = require("express");
const router = express.Router();
const authorizeAccount = require("../middleware/authorize");
const { validate: isUuid } = require("uuid");

// Mock transaction data
const MOCK_TRANSACTIONS = [
  {
    transaction_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    type: "credit",
    amount: 500000.0,
    currency: "CRC",
    description: "Depósito de nómina",
    counterparty: "Empresa ABC S.A.",
    timestamp: "2026-04-01T08:00:00Z",
    balance_after: 1750000.5,
  },
  {
    transaction_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    type: "debit",
    amount: 150000.0,
    currency: "CRC",
    description: "Pago de servicios",
    counterparty: "ICE",
    timestamp: "2026-04-02T14:30:00Z",
    balance_after: 1600000.5,
  },
  {
    transaction_id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    type: "debit",
    amount: 350000.0,
    currency: "CRC",
    description: "Transferencia SINPE",
    counterparty: "Juan Pérez",
    timestamp: "2026-04-03T10:15:00Z",
    balance_after: 1250000.5,
  },
];

/**
 * GET /accounts/:account_id/transactions
 *
 * Retorna el historial de transacciones de una cuenta con paginación.
 */
router.get("/:account_id/transactions", authorizeAccount, (req, res) => {
  const { account_id } = req.params;

  // Validate UUID format
  if (!isUuid(account_id)) {
    return res.status(400).json({
      code: "VALIDATION_001",
      message: "El account_id debe ser un UUID válido",
    });
  }

  // Parse pagination params with defaults
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(req.query.per_page) || 20));

  // Parse date filters
  const fromDate = req.query.from_date ? new Date(req.query.from_date) : null;
  const toDate = req.query.to_date ? new Date(req.query.to_date) : null;

  // Filter transactions by date if provided
  let filtered = [...MOCK_TRANSACTIONS];

  if (fromDate && !isNaN(fromDate)) {
    filtered = filtered.filter((t) => new Date(t.timestamp) >= fromDate);
  }

  if (toDate && !isNaN(toDate)) {
    filtered = filtered.filter((t) => new Date(t.timestamp) <= toDate);
  }

  // Paginate
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const transactions = filtered.slice(start, start + perPage);

  res.json({
    transactions,
    pagination: {
      page,
      per_page: perPage,
      total,
      total_pages: totalPages,
    },
  });
});

module.exports = router;
