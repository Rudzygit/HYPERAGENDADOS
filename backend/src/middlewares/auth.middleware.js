import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import "dotenv/config";

const VerifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json(ApiResponse(401, "No autorizado", null));

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(401)
        .json(ApiResponse(401, "No autorizado -> token invalido", null));
    req.auth = user;
    next();
  });
};

export default VerifyToken;
