import {
  getProfesionModel,
  getProfesionesModel,
} from "../models/profesion.model.js";
import ApiResponse from "../utils/apiResponse.js";

export const getProfesionesController = async (req, res) => {
  const profesiones = await getProfesionesModel();
  return res.status(200).json(profesiones);
};

export const getProfesionController = async (req, res) => {
  const { id } = req.params;
  const profesion = await getProfesionModel(id);
  if (profesion.data.length === 0)
    return res
      .status(404)
      .json(ApiResponse(404, "Profesion no encontrada", null));
  return res.status(200).json(profesion);
};
