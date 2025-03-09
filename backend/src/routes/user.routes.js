import { Router } from "express";
import { check } from "express-validator";
import { registerUser, createUserAccount } from "../controllers/user.controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("primerNombre").notEmpty().withMessage("El primer nombre es obligatorio"),
    check("apellido1").notEmpty().withMessage("El primer apellido es obligatorio"),
    check("correoElectronico")
      .isEmail()
      .withMessage("Debe ser un correo válido"),
    check("telefono")
      .isNumeric()
      .withMessage("El teléfono debe contener solo números"),
    check("documento").notEmpty().withMessage("El documento es obligatorio"),
  ],
  registerUser
);

router.post(
  "/create-account",
  [
    check("usuario").notEmpty().withMessage("El usuario es obligatorio"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    check("documento").notEmpty().withMessage("El documento es obligatorio"),
  ],
  createUserAccount
);

export default router;
