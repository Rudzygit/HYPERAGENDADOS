import { Router } from "express";
import { login, register, perfil } from "../controllers/auth.controller.js";
import VerifyToken from "../middlewares/auth.middleware.js";
import VerifyRole from "../middlewares/role.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);


router.get("/perfil", VerifyToken, perfil); //Ruta protegida con usuario autenticado

// EJEMPLO RUTA AUTENTICADO Y ROL (para mas de un rol incluir en el array ejemplo ["administrador", "empleado"])
router.get("/admin", VerifyToken, VerifyRole(["administrador"]), perfil); //Ruta protegida con usuario autenticado y rol admin

export default router;
