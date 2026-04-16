const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { pinoHttp } = require("pino-http");

const authMiddleware = require("./middleware/auth");
const balanceRoutes = require("./routes/balance");
const transferRoutes = require("./routes/transfers");
const transactionRoutes = require("./routes/transactions");

const app = express();

// ── Security Headers ────────────────────────────────────────
app.use(helmet());

// ── CORS (restrictivo en producción) ────────────────────────
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Rate Limiting ───────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: "RATE_001",
    message:
      "Ha excedido el límite de solicitudes. Intente de nuevo en 60 segundos",
  },
});
app.use("/api/", limiter);

// ── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Limit payload size

// ── Logging ─────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(pinoHttp());
}

// ── Health Check ────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ──────────────────────────────────────────────
app.use("/api/v1/accounts", authMiddleware, balanceRoutes);
app.use("/api/v1/transfers", authMiddleware, transferRoutes);
app.use("/api/v1/accounts", authMiddleware, transactionRoutes);
const customerRoutes = require("./routes/customers");
app.use("/api/v1/customers", authMiddleware, customerRoutes);

// ── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    code: "NOT_FOUND",
    message: "El recurso solicitado no existe",
  });
});

// ── Error Handler ───────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Error interno del servidor",
  });
});

module.exports = app;
