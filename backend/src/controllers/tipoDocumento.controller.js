import {
  getTipoDocumento,
  getTiposDocumentos,
} from "../models/tipoDocumento.model.js";

export const getTiposDocumentosController = async (req, res) => {
  const tiposDocumentos = await getTiposDocumentos();
  return res.status(200).json(tiposDocumentos);
};

export const getTipoDocumentoController = async (req, res) => {
  const { id } = req.params;
  const tipoDocumento = await getTipoDocumento(id);
  if (tipoDocumento.length === 0)
    return res.status(404).json("Tipo de documento no encontrado");
  return res.status(200).json(tipoDocumento);
};
