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
};
