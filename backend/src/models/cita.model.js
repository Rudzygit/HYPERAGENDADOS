import pool from "../config/db.js";

// Obtener todas las citas
export const obtenerCitasDB = async () => {
  const [citas] = await pool.query("SELECT * FROM citas");
  return citas;
};

// Crear una nueva cita
export const crearCitaDB = async (datos) => {
  const { idUsuario, fechaCita, horaCita, idestadocita = 1 } = datos; // Estado por defecto: "Pendiente"
  const query = `INSERT INTO citas (idUsuario, fechaCita, horaCita, idestadocita) VALUES (?, ?, ?, ?)`;
  const [resultado] = await pool.query(query, [idUsuario, fechaCita, horaCita, idestadocita]);

  // Obtener la cita recién insertada
  const [nuevaCita] = await pool.query(`SELECT * FROM citas WHERE idCita = ?`, [resultado.insertId]);
  return nuevaCita[0]; // Retornar la cita creada
};

// Actualizar una cita
export const actualizarCitaDB = async (idCita, datos) => {
  const { fechaCita, horaCita, idestadocita } = datos;
  const query = "UPDATE citas SET fechaCita = ?, horaCita = ?, idestadocita = ? WHERE idCita = ?";
  const [resultado] = await pool.query(query, [fechaCita, horaCita, idestadocita, idCita]);
  return resultado;
};

// Eliminar una cita
export const eliminarCitaDB = async (idCita) => {
  const query = "DELETE FROM citas WHERE idCita = ?";
  const [resultado] = await pool.query(query, [idCita]);
  return resultado;
};
