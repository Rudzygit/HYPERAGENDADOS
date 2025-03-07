const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'empleado', 'usuario'], required: true },
    profesion: { type: mongoose.Schema.Types.ObjectId, ref: 'Profesion' }, // Solo si es un empleado
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
