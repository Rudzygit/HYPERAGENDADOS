import { obtenerCitasDB, crearCitaDB, actualizarCitaDB, eliminarCitaDB } from "../models/cita.model.js";

export const obtenerCitas = async (req, res) => {
  try {
    const citas = await obtenerCitasDB();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las citas", error });
  }
};

export const crearCita = async (req, res) => {
  try {
    const nuevaCita = await crearCitaDB(req.body);
    res.json({ mensaje: "Cita creada exitosamente", nuevaCita });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la cita", error });
  }
};

export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await actualizarCitaDB(id, req.body);
    res.json({ mensaje: "Cita actualizada exitosamente", resultado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la cita", error });
  }
};

export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCitaDB(id);
    res.json({ mensaje: "Cita eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la cita", error });
  }
};
