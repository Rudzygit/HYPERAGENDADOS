const authRole = (rolesPermitidos) => {
    return (req, res, next) => {
      const { rol } = req.user;
  
      if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({
          message: "Acceso denegado. No tienes permisos para realizar esta acción."
        });
      }
  
      next();
    };
  };
  
  export default authRole;
  