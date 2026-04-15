const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

/**
 * Middleware de autenticación JWT.
 *
 * Valida que el request incluya un token Bearer válido.
 * En producción, JWT_SECRET debe ser una variable de entorno
 * inyectada desde un secret manager (nunca hardcodeada).
 *
 * El token debe incluir los claims:
 * - sub: ID del usuario
 * - role: Rol del usuario (customer, admin)
 * - accounts: Array de account_ids a los que tiene acceso
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      code: "AUTH_001",
      message: "Token de autenticación requerido. Use: Authorization: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request for downstream use
    req.user = {
      id: decoded.sub,
      role: decoded.role || "customer",
      accounts: decoded.accounts || [],
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "AUTH_002",
        message: "Token expirado. Solicite un nuevo token.",
      });
    }

    return res.status(401).json({
      code: "AUTH_001",
      message: "Token de autenticación inválido",
    });
  }
}

module.exports = authMiddleware;
