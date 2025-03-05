import { connection } from "../config/db.js";

export const getProfesiones = async () => {
  const profesiones = await connection.query("SELECT * FROM profesion");
  return profesiones[0];
};

export const getProfesion = async (id) => {
  const profesion = await connection.query(
    "SELECT * FROM profesion WHERE idProfesion = ?",
    [id]
  );
  return profesion[0];
};
