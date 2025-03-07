const { body } = require('express-validator');

exports.validarCita = [
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('empleado').notEmpty().withMessage('El empleado es obligatorio'),
    body('fecha').isISO8601().withMessage('Fecha inválida')
];
