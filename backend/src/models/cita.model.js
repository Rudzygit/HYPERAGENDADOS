import db from "../config/db.js";

export const obtenerCitasDB = async () => {
  const [citas] = await db.query("SELECT * FROM citas");
  return citas;
};

export const crearCitaDB = async (datos) => {
  const { usuario_id, fecha, hora, descripcion } = datos;
  const query = "INSERT INTO citas (usuario_id, fecha, hora, descripcion) VALUES (?, ?, ?, ?)";
  const [resultado] = await db.query(query, [usuario_id, fecha, hora, descripcion]);
  return resultado;
};

export const actualizarCitaDB = async (id, datos) => {
  const { fecha, hora, descripcion } = datos;
  const query = "UPDATE citas SET fecha = ?, hora = ?, descripcion = ? WHERE id = ?";
  const [resultado] = await db.query(query, [fecha, hora, descripcion, id]);
  return resultado;
};

export const eliminarCitaDB = async (id) => {
  const query = "DELETE FROM citas WHERE id = ?";
  const [resultado] = await db.query(query, [id]);
  return resultado;
};
