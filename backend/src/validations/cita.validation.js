import { body, param } from "express-validator";

export const validarCita = [
  body("usuario_id").isInt().withMessage("El ID del usuario debe ser un número entero"),
  body("fecha").isDate().withMessage("Fecha inválida"),
  body("hora").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Hora inválida"),
  body("descripcion").isString().withMessage("La descripción debe ser un texto"),
];

export const validarID = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),
];
