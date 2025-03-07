import {
  getTipoDocumentoModel,
  getTiposDocumentosModel,
} from "../models/tipoDocumento.model.js";
import ApiResponse from "../utils/apiResponse.js";

export const getTiposDocumentosController = async (req, res) => {
  const tiposDocumentos = await getTiposDocumentosModel();
  return res.status(200).json(tiposDocumentos);
};

export const getTipoDocumentoController = async (req, res) => {
  const { id } = req.params;
  const tipoDocumento = await getTipoDocumentoModel(id, res);
  if (tipoDocumento.data.length === 0)
    return res
      .status(404)
      .json(ApiResponse(404, "Tipo de documento no encontrado", null));
  return res.status(200).json(tipoDocumento);
};
