const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fecha: { type: Date, required: true },
    estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
});

module.exports = mongoose.model('Cita', citaSchema);
