import { connection } from "../config/db.js";

export const getTiposDocumentos = async () => {
  const tiposDocumentos = await connection.query("SELECT * FROM documento");
  return tiposDocumentos[0];
};

export const getTipoDocumento = async (id) => {
  const tipoDocumento = await connection.query(
    "SELECT * FROM documento WHERE idDocumento = ?",
    [id]
  );
  return tipoDocumento[0];
};
