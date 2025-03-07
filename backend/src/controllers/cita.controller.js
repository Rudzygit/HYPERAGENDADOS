const Cita = require('../models/cita.model');

exports.obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas' });
    }
};

exports.crearCita = async (req, res) => {
    try {
        const nuevaCita = new Cita(req.body);
        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cita' });
    }
};
