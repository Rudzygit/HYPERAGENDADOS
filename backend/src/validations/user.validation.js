import { body } from "express-validator";

export const validateUser = [
  body("primerNombre")
    .notEmpty()
    .withMessage("El primer nombre es obligatorio")
    .isString()
    .withMessage("El primer nombre debe ser una cadena de texto"),
  body("apellido1")
    .notEmpty()
    .withMessage("El primer apellido es obligatorio")
    .isString()
    .withMessage("El primer apellido debe ser una cadena de texto"),
  body("idDocumento")
    .notEmpty()
    .withMessage("El tipo de documento es obligatorio")
    .isInt()
    .withMessage("El ID del documento debe ser un número entero"),
  body("documento")
    .notEmpty()
    .withMessage("El número de documento es obligatorio")
    .isLength({ min: 6, max: 15 })
    .withMessage("El número de documento debe tener entre 6 y 15 caracteres"),
  body("correoElectronico")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .isNumeric()
    .withMessage("El teléfono debe contener solo números"),
  body("fechaNacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .isDate()
    .withMessage("La fecha de nacimiento no es válida"),
  body("idProfesion")
    .optional()
    .isInt()
    .withMessage("El ID de la profesión debe ser un número entero"),
];
