import pool from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const getRolModel = async (id) => {
  try {
    const rol = await pool.query("SELECT * FROM rol WHERE idRol = ?", [id]);
    return ApiResponse(200, "Rol obtenido con éxito", rol[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener el rol -> ${error}`,
      null
    );
  }
};
