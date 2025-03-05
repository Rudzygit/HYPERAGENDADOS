import { Router } from "express";
import {
  getProfesionesController,
  getProfesionController,
} from "../controllers/profesion.controller.js";

const router = Router();

router.get("/", getProfesionesController);

router.get("/:id", getProfesionController);

export default router;
