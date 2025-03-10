import db from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
  try {
    const [citas] = await db.query(`
      SELECT c.idCita, p.primerNombre AS empleadoNombre, p.apellido1 AS empleadoApellido,
             pr.nombre AS profesion, c.fechaCita, c.horaCita, ec.estadocita
      FROM citas c
      JOIN usuario u ON c.idUsuario = u.idUsuario
      JOIN persona p ON u.idPersona = p.idPersona
      JOIN profesion pr ON p.idProfesion = pr.idProfesion
      JOIN estadocita ec ON c.idestadocita = ec.idestadocita;
    `);
    res.status(200).json(ApiResponse(200, "Citas obtenidas con éxito", citas));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al obtener citas: ${error.message}`));
  }
};

// Obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const [empleados] = await db.query(`
      SELECT u.idUsuario, p.primerNombre, p.apellido1, r.nombre AS rol, pr.nombre AS profesion
      FROM usuario u
      JOIN persona p ON u.idPersona = p.idPersona
      JOIN rol r ON u.idRol = r.idRol
      LEFT JOIN profesion pr ON p.idProfesion = pr.idProfesion
      WHERE r.nombre = 'empleado';
    `);
    res.status(200).json(ApiResponse(200, "Empleados obtenidos con éxito", empleados));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al obtener empleados: ${error.message}`));
  }
};

// Crear cita y asignar empleado
export const crearCita = async (req, res) => {
  const { idEmpleado, fechaCita, horaCita, idProfesion } = req.body;
  if (!idEmpleado || !fechaCita || !horaCita || !idProfesion) {
    return res.status(400).json(ApiResponse(400, "Todos los campos son obligatorios"));
  }
  try {
    await db.query(
      "INSERT INTO citas (fechaCita, horaCita, idUsuario, idestadocita) VALUES (?, ?, ?, 1)",
      [fechaCita, horaCita, idEmpleado]
    );
    res.status(201).json(ApiResponse(201, "Cita creada correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al crear cita: ${error.message}`));
  }
};

// Modificar fecha y hora de cita
export const actualizarFechaHoraCita = async (req, res) => {
  const { id } = req.params;
  const { fechaCita, horaCita } = req.body;
  try {
    await db.query("UPDATE citas SET fechaCita = ?, horaCita = ? WHERE idCita = ?", [fechaCita, horaCita, id]);
    res.status(200).json(ApiResponse(200, "Fecha y hora actualizadas correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al actualizar cita: ${error.message}`));
  }
};

// Cambiar empleado asignado
export const cambiarEmpleadoCita = async (req, res) => {
  const { id } = req.params;
  const { idNuevoEmpleado } = req.body;
  try {
    await db.query("UPDATE citas SET idUsuario = ? WHERE idCita = ?", [idNuevoEmpleado, id]);
    res.status(200).json(ApiResponse(200, "Empleado cambiado correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al cambiar empleado: ${error.message}`));
  }
};

// Eliminar cita
export const eliminarCita = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM citas WHERE idCita = ?", [id]);
    res.status(200).json(ApiResponse(200, "Cita eliminada correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al eliminar cita: ${error.message}`));
  }
};

// Asignar usuario a una cita
export const asignarUsuarioCita = async (req, res) => {
  const { id } = req.params;
  const { idUsuario } = req.body;
  try {
    await db.query("UPDATE citas SET idUsuario = ?, idestadocita = 2 WHERE idCita = ?", [idUsuario, id]);
    res.status(200).json(ApiResponse(200, "Usuario asignado a la cita"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al asignar usuario a la cita: ${error.message}`));
  }
};

// Desasignar usuario y volver cita a "Disponible"
export const desasignarUsuarioCita = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE citas SET idUsuario = NULL, idestadocita = 1 WHERE idCita = ?", [id]);
    res.status(200).json(ApiResponse(200, "Usuario desasignado y cita disponible"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al desasignar usuario de cita: ${error.message}`));
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query("SELECT idUsuario, usuario, idRol FROM usuario");
    res.status(200).json(ApiResponse(200, "Usuarios obtenidos con éxito", usuarios));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al obtener usuarios: ${error.message}`));
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM usuario WHERE idUsuario = ?", [id]);
    res.status(200).json(ApiResponse(200, "Usuario eliminado correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al eliminar usuario: ${error.message}`));
  }
};

// Cambiar rol de usuario
export const cambiarRolUsuario = async (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;
  try {
    await db.query(
      "UPDATE usuario SET idRol = (SELECT idRol FROM rol WHERE nombre = ?) WHERE idUsuario = ?",
      [nuevoRol, id]
    );
    res.status(200).json(ApiResponse(200, "Rol actualizado correctamente"));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al cambiar rol de usuario: ${error.message}`));
  }
};

// Restablecer contraseña
export const restablecerContrasena = async (req, res) => {
  const { documento } = req.body;
  try {
    const [usuario] = await db.query("SELECT usuario, password FROM usuario WHERE idPersona = (SELECT idPersona FROM persona WHERE documento = ?)", [documento]);
    if (usuario.length === 0) {
      return res.status(404).json(ApiResponse(404, "Usuario no encontrado", null));
    }
    res.status(200).json(ApiResponse(200, "Credenciales recuperadas", usuario[0]));
  } catch (error) {
    res.status(500).json(ApiResponse(500, `Error al restablecer contraseña: ${error.message}`));
  }
};
