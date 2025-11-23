export const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.rol !== "Admin") {
    return res.status(403).render('errors/403', { user: req.session.user });
  }
  next();
};

  
export const requireEmployee = (req, res, next) => {
  if (!req.session.user || req.session.user.rol !== "Employee") {
    return res.status(403).send("Acceso denegado");
  }
  next();
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.session.user.rol)) {
      return res.status(403).render("errors/403", {
        title: "Acceso denegado",
        user: req.session.user
      });
    }

    next();
  };
};


