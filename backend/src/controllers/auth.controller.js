import {
  validateInputsFields,
  validateFieldNotEmpty,
  validatTypeOfField,
  validateEmail,
  validateDate,
  validatePassword,
} from "../validations/field.validation.js";
import {
  findByUserEmail,
  saveUser,
  createAccount,
  getUserWithDocument,
  getAccountWithUsuario,
} from "../models/user.model.js";
import { getTipoDocumentoModel } from "../models/tipoDocumento.model.js";
import { getProfesionModel } from "../models/profesion.model.js";
import { getRolModel } from "../models/rol.model.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const perfil = (req, res) => {
  return res.status(200).json(ApiResponse(200, "Perfil", req.auth));
};

export const login = async (req, res) => {
  const valid = validateInputsFields(["username", "password"], req.body, res);
  if (!valid.status) return res.status(400).json(valid);

  const { username, password } = req.body;

  const results = await getAccountWithUsuario(username);

  if (results.data.length === 0)
    return res
      .status(404)
      .json(ApiResponse(404, "Usuario no encontrado", null));

  if (results.data.length > 1)
    return res
      .status(500)
      .json(ApiResponse(500, "Error interno del servidor -> login", null));

  const account = results.data[0];
  const isValidPassword = await bcrypt.compare(password, account.password);

  if (!isValidPassword)
    return res
      .status(401)
      .json(ApiResponse(401, "Contraseña incorrecta", null));

  const rol = await getRolModel(account.idRol);
  if (rol.data.length === 0)
    return res
      .status(500)
      .json(ApiResponse(500, "Error interno del servidor -> rol", null));

  const token = jwt.sign(
    {
      id: account.id,
      rol: rol.data[0].nombre.toLowerCase(),
      usuario: username,
      persona: account.idPersona,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  delete account.password;

  res.status(200).json(ApiResponse(200, "Login exitoso", { account, token }));
};

export const register = async (req, res) => {
  const valid = validateInputsFields(
    [
      "primerNombre",
      "segundoNombre",
      "apellido1",
      "apellido2",
      "idDocumento",
      "fechaNacimiento",
      "telefono",
      "correoElectronico",
      "idProfesion",
      "documento",
      "usuario",
      "password",
    ],
    req.body,
    res
  );

  if (!valid.success) return res.status(valid.status).json(valid);

  const {
    primerNombre,
    apellido1,
    idDocumento,
    fechaNacimiento,
    correoElectronico,
    idProfesion,
    documento,
    usuario,
    password,
  } = req.body;

  let errors = [];

  if (!validateFieldNotEmpty(primerNombre))
    errors.push({ primerNombre: "El primer nombre es requerido" });

  if (!validateFieldNotEmpty(apellido1))
    errors.push({ apellido1: "El primer apellido es requerido" });

  if (!validateFieldNotEmpty(idDocumento.toString()))
    errors.push({ idDocumento: "El tipo de documento es requerido" });

  if (!validatTypeOfField(idDocumento, "number"))
    errors.push({ idDocumento: "El tipo de documento debe ser un número" });

  if (!validateFieldNotEmpty(fechaNacimiento))
    errors.push({ fechaNacimiento: "La fecha de nacimiento es requerida" });

  if (!validateDate(fechaNacimiento))
    errors.push({ fechaNacimiento: "La fecha de nacimiento es inválida" });

  if (!validateFieldNotEmpty(correoElectronico))
    errors.push({ correoElectronico: "El correo electrónico es requerido" });

  if (!validateEmail(correoElectronico))
    errors.push({ correoElectronico: "El correo electrónico es inválido" });

  if (!validateFieldNotEmpty(idProfesion.toString()))
    errors.push({ idProfesion: "La profesión es requerida" });

  if (!validatTypeOfField(idProfesion, "number"))
    errors.push({ idProfesion: "La profesión debe ser un número" });

  if (!validateFieldNotEmpty(documento))
    errors.push({ documento: "El documento es requerido" });

  if (!validateFieldNotEmpty(usuario))
    errors.push({ usuario: "El usuario es requerido" });

  if (!validateFieldNotEmpty(password))
    errors.push({ password: "La contraseña es requerida" });

  if (!validatePassword(password))
    errors.push({ password: "La contraseña es inválida" });

  if (errors.length > 0)
    return res.status(400).json(ApiResponse(400, "Campos inválidos", errors));

  const tipoDocumento = await getTipoDocumentoModel(parseInt(idDocumento));
  if (tipoDocumento.data.length === 0)
    return res
      .status(404)
      .json(ApiResponse(404, "Tipo de documento no encontrado", null));

  const profesion = await getProfesionModel(parseInt(idProfesion));
  if (profesion.data.length === 0)
    return res
      .status(404)
      .json(ApiResponse(404, "Profesion no encontrada", null));

  // Validar que no exista un usuario con el mismo numero de documento, usuario o correo electronico
  const userExistsEmail = await findByUserEmail(correoElectronico);
  if (userExistsEmail.data.length > 0)
    return res
      .status(400)
      .json(ApiResponse(400, "El correo electrónico ya está registrado", null));

  const userExistsDocument = await getUserWithDocument(documento);
  if (userExistsDocument.data.length > 0)
    return res
      .status(400)
      .json(ApiResponse(400, "El documento ya está registrado", null));

  const usernameExists = await getAccountWithUsuario(usuario);
  if (usernameExists.data.length > 0)
    return res
      .status(400)
      .json(ApiResponse(400, "El usuario ya está registrado", null));

  const user = await saveUser(req.body);
  if (!user.success) {
    const { success, ...send } = user;
    return res.status(500).json(send);
  }

  /* CREACION DE CUENTA DESPUES DE QUE EL USUARIO SE HAYA CREADO DE MANERA EXITOSA */
  const hashPassword = await bcrypt.hash(password, 10);
  const account = await createAccount(
    usuario,
    hashPassword,
    user.data[0].idPersona
  );
  if (!account.success) {
    const { success, ...send } = account;
    return res.status(500).json(send);
  }

  return res
    .status(201)
    .json(ApiResponse(201, "Cuenta creada con éxito", null));
};
