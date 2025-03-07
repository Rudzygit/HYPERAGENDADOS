import pool from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const findByUserEmail = async (email) => {
  try {
    const user = await pool.query(
      "SELECT * FROM persona WHERE correoElectronico = ?",
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
    const result = await pool.query(
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
    const user = await pool.query("SELECT * FROM persona WHERE idPersona = ?", [
      id,
    ]);
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
    const result = await pool.query(
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
    const account = await pool.query(
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
    const user = await pool.query("SELECT * FROM persona WHERE documento = ?", [
      documento,
    ]);
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
    const user = await pool.query("SELECT * FROM usuario WHERE usuario = ?", [
      username,
    ]);
    return ApiResponse(200, "Cuenta obtenida con éxito", user[0]);
  } catch (error) {
    return ApiResponse(
      500,
      `Error interno del servidor al obtener la cuenta -> ${error}`,
      null
    );
  }
};
