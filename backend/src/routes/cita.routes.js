import express from "express";
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from "../controllers/cita.controller.js";

const router = express.Router();

// Rutas de citas
router.get("/", obtenerCitas);
router.post("/", crearCita);
router.put("/:id", actualizarCita);
router.delete("/:id", eliminarCita);

export default router;
