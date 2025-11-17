export const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.rol !== "Admin") {
    return res.status(403).send("Acceso denegado");
  }
  next();
};
