import pool from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const getProfesionesModel = async () => {
  try {
    const profesiones = await pool.query("SELECT * FROM profesion");
    return ApiResponse(200, "Profesiones obtenidas con éxito", profesiones[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener las profesiones -> ${error}`,
      null
    );
  }
};

export const getProfesionModel = async (id) => {
  try {
    const profesion = await pool.query(
      "SELECT * FROM profesion WHERE idProfesion = ?",
      [id]
    );
    return ApiResponse(200, "Profesion obtenida con éxito", profesion[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener la profesion -> ${error}`,
      null
    );
  }
};
