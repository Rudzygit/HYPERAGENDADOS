import pool from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const createAccount = async (username, pass, idPersona) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuario (usuario, password, idRol, idPersona) VALUES (?, ?, ?, ?)",
      [username, pass, 2, idPersona]
    );
    const id = result[0].insertId;
    const { password, ...account } = await getAccountWithId(id);
    return ApiResponse(200, "Cuenta creada con éxito", account);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al crear la cuenta -> ${error}`,
      null
    );
  }
};

export const getAccountWithId = async (id) => {
  try {
    const account = await pool.query(
      "SELECT * FROM usuario WHERE idUsuario = ?",
      [id]
    );
    return ApiResponse(200, "Cuenta obtenida con éxito", account[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener la cuenta -> ${error}`,
      null
    );
  }
};
