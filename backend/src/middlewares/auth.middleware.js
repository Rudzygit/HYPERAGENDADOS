const authMiddleware = (req, res, next) => {
  const user = req.user; // Suponiendo que el usuario ya ha sido autenticado y añadido al request
  if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
  }
  next();
};

module.exports = authMiddleware;
