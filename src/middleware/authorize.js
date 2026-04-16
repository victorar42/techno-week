/**
 * Middleware de autorización por cuenta.
 *
 * Verifica que el usuario autenticado tenga acceso a la cuenta
 * especificada en el parámetro de ruta. Esto previene ataques IDOR
 * (Insecure Direct Object Reference) donde un usuario intenta
 * acceder a la cuenta de otro usuario.
 */
function authorizeAccount(req, res, next) {
  const { account_id } = req.params;
  const { accounts, role } = req.user;

  // Admins pueden acceder a cualquier cuenta
  if (role === "admin") {
    return next();
  }

  // Verificar que el usuario tiene acceso a esta cuenta
  if (!accounts.includes(account_id)) {
    return res.status(403).json({
      code: "AUTH_002",
      message: "No tiene permisos para acceder a esta cuenta",
    });
  }

  next();
}

module.exports = authorizeAccount;
