const express = require("express");
const router = express.Router();
const authorizeAccount = require("../middleware/authorize");
const { validate: isUuid } = require("uuid");

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