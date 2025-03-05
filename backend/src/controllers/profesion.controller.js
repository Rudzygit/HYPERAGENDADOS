import { getProfesion, getProfesiones } from "../models/profesion.model.js";

export const getProfesionesController = async (req, res) => {
  const profesiones = await getProfesiones();
  return res.status(200).json(profesiones);
};

export const getProfesionController = async (req, res) => {
  const { id } = req.params;
  const profesion = await getProfesion(id);
  if (profesion.length === 0)
    return res.status(404).json("Profesion no encontrada");
  return res.status(200).json(profesion);
};
