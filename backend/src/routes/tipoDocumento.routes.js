import { Router } from "express";
import {
  getTiposDocumentosController,
  getTipoDocumentoController,
} from "../controllers/tipoDocumento.controller.js";

const router = Router();

router.get("/", getTiposDocumentosController);

router.get("/:id", getTipoDocumentoController);

export default router;
