import { obtenerCitasDB, crearCitaDB, actualizarCitaDB, eliminarCitaDB } from "../models/cita.model.js";

// Obtener todas las citas
export const obtenerCitas = async (req, res) => {
  try {
    const citas = await obtenerCitasDB();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las citas", error: error.message });
  }
};

// Crear una nueva cita
export const crearCita = async (req, res) => {
  try {
    const nuevaCita = await crearCitaDB(req.body);
    res.status(201).json({ mensaje: "Cita creada exitosamente", cita: nuevaCita });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la cita", error: error.message });
  }
};

// Actualizar una cita
export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await actualizarCitaDB(id, req.body);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }
    res.json({ mensaje: "Cita actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la cita", error: error.message });
  }
};

// Eliminar una cita
export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarCitaDB(id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }
    res.json({ mensaje: "Cita eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la cita", error: error.message });
  }
};
