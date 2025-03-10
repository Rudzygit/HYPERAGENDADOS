import { body, param } from "express-validator";

// Validación para crear una cita
export const validarCita = [
  body("idEmpleado")
    .isInt().withMessage("El ID del empleado debe ser un número entero")
    .notEmpty().withMessage("El ID del empleado es obligatorio"),
  body("fechaCita")
    .isDate().withMessage("Debe proporcionar una fecha válida")
    .notEmpty().withMessage("La fecha de la cita es obligatoria"),
  body("horaCita")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("La hora debe estar en formato HH:MM")
    .notEmpty().withMessage("La hora de la cita es obligatoria"),
];

// Validación para cambio de rol
export const validarCambioRol = [
  param("id")
    .isInt().withMessage("El ID del usuario debe ser un número entero"),
  body("nuevoRol")
    .isIn(["administrador", "empleado", "usuario"])
    .withMessage("El rol debe ser 'administrador', 'empleado' o 'usuario'")
    .notEmpty().withMessage("El nuevo rol es obligatorio"),
];
