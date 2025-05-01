const isAdmin = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export { isAdmin };
