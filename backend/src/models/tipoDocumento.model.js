import pool from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const getTiposDocumentosModel = async () => {
  try {
    const tiposDocumentos = await pool.query("SELECT * FROM documento");
    return ApiResponse(
      200,
      "Tipos de documentos obtenidos con éxito",
      tiposDocumentos[0]
    );
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener los tipos de documentos -> ${error}`,
      null
    );
  }
};

export const getTipoDocumentoModel = async (id) => {
  try {
    const tipoDocumento = await pool.query(
      "SELECT * FROM documento WHERE idDocumento = ?",
      [id]
    );
    return ApiResponse(
      200,
      "Tipo de documento obtenido con éxito",
      tipoDocumento[0]
    );
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener el tipo de documento -> ${error}`,
      null
    );
  }
};
