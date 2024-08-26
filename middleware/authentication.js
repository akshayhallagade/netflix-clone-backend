const { verifyToken } = require("../lib/user");

function AuthenticationMiddleware() {
  return function (req, res, next) {
    const authHeader =
      req.header("Authorization") || req.header("authorization");

    if (authHeader) {
      const headerSplit = authHeader.split("Bearer ");
      if (headerSplit.length === 2) {
        const token = headerSplit[1];
        req.userId = verifyToken(token);
      }
    }
    next();
  };
}

function EnsureAuthenticated() {
  return function (req, res, next) {
    if (req.userId) return next();
    res.json({ message: "invalid user" });
  };
}

module.exports = { AuthenticationMiddleware, EnsureAuthenticated };
