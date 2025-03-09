import { Router } from "express";
import {
  crearCita,
  eliminarCita,
  actualizarFechaHoraCita,
  cambiarEmpleadoCita,
  asignarUsuarioCita,
  desasignarUsuarioCita,
  eliminarUsuario,
  restablecerContrasena,
  obtenerUsuarios,
  obtenerEmpleados,
  obtenerCitas,
} from "../controllers/funcionalidades.controller.js"; // Se eliminó cambiarRolUsuario si no existe
import { validarCita, validarCambioRol } from "../validations/funcionalidades.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/authRole.middleware.js";

const router = Router();

// Rutas de gestión de citas
router.get("/citas", authMiddleware, obtenerCitas);
router.post("/citas", authMiddleware, authRole(["admin", "empleado"]), validarCita, crearCita);
router.delete("/citas/:id", authMiddleware, authRole(["admin"]), eliminarCita);
router.put("/citas/:id/fecha-hora", authMiddleware, authRole(["admin", "empleado"]), actualizarFechaHoraCita);
router.put("/citas/:id/empleado", authMiddleware, authRole(["admin"]), cambiarEmpleadoCita);
router.put("/citas/:id/asignar-usuario", authMiddleware, authRole(["admin", "empleado"]), asignarUsuarioCita);
router.put("/citas/:id/desasignar-usuario", authMiddleware, authRole(["admin", "empleado"]), desasignarUsuarioCita);

// Rutas de gestión de usuarios
router.get("/usuarios", authMiddleware, authRole(["admin"]), obtenerUsuarios);
router.get("/empleados", authMiddleware, authRole(["admin", "empleado"]), obtenerEmpleados);
router.delete("/usuarios/:id", authMiddleware, authRole(["admin"]), eliminarUsuario);

// Validar si cambiarRolUsuario existe antes de incluirlo
import { cambiarRolUsuario } from "../controllers/funcionalidades.controller.js";
if (cambiarRolUsuario) {
  router.put("/usuarios/:id/rol", authMiddleware, authRole(["admin"]), validarCambioRol, cambiarRolUsuario);
}

router.put("/usuarios/:id/password", authMiddleware, authRole(["admin", "empleado"]), restablecerContrasena);

export default router;
