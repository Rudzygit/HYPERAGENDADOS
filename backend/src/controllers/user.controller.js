import { validationResult } from "express-validator";
import {
  findByUserEmail,
  saveUser,
  createAccount,
  getUserWithDocument,
  getAccountWithUsuario,
} from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(ApiResponse(400, "Errores de validación", errors.array()));
  }

  try {
    const existingUser = await findByUserEmail(req.body.correoElectronico);
    if (existingUser.data) {
      return res.status(400).json(ApiResponse(400, "El correo ya está registrado"));
    }

    const newUser = await saveUser(req.body);
    if (!newUser.data) {
      return res.status(500).json(ApiResponse(500, "Error al crear el usuario"));
    }

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(ApiResponse(500, `Error en el registro: ${error.message}`));
  }
};

export const createUserAccount = async (req, res) => {
  const { usuario, password, documento } = req.body;

  if (!usuario || !password || !documento) {
    return res.status(400).json(ApiResponse(400, "Faltan datos obligatorios"));
  }

  try {
    const existingAccount = await getAccountWithUsuario(usuario);
    if (existingAccount.data) {
      return res.status(400).json(ApiResponse(400, "El nombre de usuario ya está en uso"));
    }

    const user = await getUserWithDocument(documento);
    if (!user.data) {
      return res.status(404).json(ApiResponse(404, "No se encontró un usuario con ese documento"));
    }

    const newAccount = await createAccount(usuario, password, user.data.idPersona);
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json(ApiResponse(500, `Error al crear la cuenta: ${error.message}`));
  }
};
