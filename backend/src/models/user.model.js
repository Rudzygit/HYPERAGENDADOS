<<<<<<< HEAD
import { connection } from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const findByUserEmail = async (email) => {
  try {
    const user = await connection.query(
      "SELECT * FROM usuario WHERE usuario = ?",
      [email]
    );
    return ApiResponse(200, "Usuario obtenido con éxito", user[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener el usuario -> ${error}`,
      null
    );
  }
};

export const saveUser = async (user) => {
  const {
    primerNombre,
    segundoNombre,
    apellido1,
    apellido2,
    idDocumento,
    fechaNacimiento,
    telefono,
    correoElectronico,
    idProfesion,
    documento,
  } = user;
  try {
    const result = await connection.query(
      "INSERT INTO persona (primerNombre, segundoNombre, apellido1, apellido2, idDocumento, fechaNacimiento, telefono, correoElectronico, idProfesion, documento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        primerNombre,
        segundoNombre,
        apellido1,
        apellido2,
        idDocumento,
        fechaNacimiento,
        telefono,
        correoElectronico,
        idProfesion,
        documento,
      ]
    );
    const id = result[0].insertId;
    const user = await getUserWithId(id);
    return ApiResponse(200, "Usuario creado con éxito", user.data);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al crear el usuario -> ${error}`,
      null
    );
  }
};

export const getUserWithId = async (id) => {
  try {
    const user = await connection.query(
      "SELECT * FROM persona WHERE idPersona = ?",
      [id]
    );
    return ApiResponse(200, "Usuario obtenido con éxito", user[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener el usuario -> ${error}`,
      null
    );
  }
};

export const createAccount = async (username, pass, idPersona) => {
  try {
    const result = await connection.query(
      "INSERT INTO usuario (usuario, password, idRol, idPersona) VALUES (?, ?, ?, ?)",
      [username, pass, 2, idPersona]
    );
    const id = result[0].insertId;
    const { password, ...account } = await getAccountWithId(id);
    return ApiResponse(200, "Cuenta creada con éxito", account);
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
    const account = await connection.query(
      "SELECT * FROM usuario WHERE idUsuario = ?",
      [id]
    );
    return ApiResponse(200, "Cuenta obtenida con éxito", account[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener la cuenta -> ${error}`,
      null
    );
  }
};

export const getUserWithDocument = async (documento) => {
  try {
    const user = await connection.query(
      "SELECT * FROM persona WHERE documento = ?",
      [documento]
    );
    return ApiResponse(200, "Usuario obtenido con éxito", user[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener el usuario -> ${error}`,
      null
    );
  }
};

export const getAccountWithUsuario = async (username) => {
  try {
    const user = await connection.query(
      "SELECT * FROM usuario WHERE usuario = ?",
      [username]
    );
    return ApiResponse(200, "Cuenta obtenida con éxito", user[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener la cuenta -> ${error}`,
      null
    );
  }
=======
import pool from "../config/db.js";

export const findByUserEmail = async (email) => {
    const query = `
        SELECT u.idUsuario, u.usuario, u.password, u.idRol, p.correoElectronico
        FROM usuario u
        JOIN persona p ON u.idPersona = p.idPersona
        WHERE p.correoElectronico = ?`;
    const [results] = await pool.query(query, [email]);
    return results;
};

export const createUser = async (user) => {
    const { primerNombre, segundoNombre, apellido1, apellido2, idDocumento, documento, fechaNacimiento, telefono, correoElectronico, idProfesion, usuario, password, idRol } = user;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [personaResult] = await connection.query(
            `INSERT INTO persona (primerNombre, segundoNombre, apellido1, apellido2, idDocumento, documento, fechaNacimiento, telefono, correoElectronico, idProfesion)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [primerNombre, segundoNombre, apellido1, apellido2, idDocumento, documento, fechaNacimiento, telefono, correoElectronico, idProfesion]
        );

        const idPersona = personaResult.insertId;

        const [usuarioResult] = await connection.query(
            `INSERT INTO usuario (usuario, password, idRol, idPersona)
             VALUES (?, ?, ?, ?)`,
            [usuario, password, idRol, idPersona]
        );

        await connection.commit();
        return usuarioResult.insertId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
>>>>>>> 133d203104a3698da9bdc30d12b0c9b7af120f74
};
