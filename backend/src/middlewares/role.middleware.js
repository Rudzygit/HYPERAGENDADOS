import ApiResponse from "../utils/apiResponse.js";

const VerifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.auth.rol)) {
      return res
        .status(403)
        .json(ApiResponse(403, "Usuario no autorizado", null));
    }
    next();
  };
};

export default VerifyRole;
