export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first." });
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ message: "You are not authorized for this action." });
    }

    next();
  };
};
