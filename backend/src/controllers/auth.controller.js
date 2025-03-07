import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByUserEmail, createUser } from "../models/user.model.js";
import { validateInputsFields } from "../validations/field.validation.js";

export const login = async (req, res) => {
    validateInputsFields(["correoElectronico", "password"], req.body, res);
    const { correoElectronico, password } = req.body;

    const results = await findByUserEmail(correoElectronico);

    if (results.length === 0)
        return res.status(404).json({ message: "Usuario no encontrado" });

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
        return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.idUsuario, rol: user.idRol }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
};

export const register = async (req, res) => {
    validateInputsFields(
        ["primerNombre", "segundoNombre", "apellido1", "apellido2", "idDocumento", "documento", "fechaNacimiento", "telefono", "correoElectronico", "idProfesion", "usuario", "password", "idRol"],
        req.body,
        res
    );

    const { primerNombre, segundoNombre, apellido1, apellido2, idDocumento, documento, fechaNacimiento, telefono, correoElectronico, idProfesion, usuario, password, idRol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userId = await createUser({ primerNombre, segundoNombre, apellido1, apellido2, idDocumento, documento, fechaNacimiento, telefono, correoElectronico, idProfesion, usuario, password: hashedPassword, idRol });
        res.status(201).json({ message: "Registro exitoso", userId });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
};
