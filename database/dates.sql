-- Insertar datos en la tabla 'rol'
INSERT INTO rol (idRol, nombre) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'Empleado');

-- Insertar datos en la tabla 'profesion' (especialidades médicas)
INSERT INTO profesion (idProfesion, nombre) VALUES
(1, 'no quiero trabajar aqui por ahora'),
(2, 'Radiología'),
(3, 'Traumatología'),
(4, 'Cardiología'),
(5, 'Dermatología'),
(6, 'Pediatría'),
(7, 'Ginecología'),
(8, 'Oncología'),
(9, 'Neurología'),
(10, 'Oftalmología'),
(11, 'Psiquiatría');

-- Insertar datos en la tabla 'documento'
INSERT INTO documento (idDocumento, nombre) VALUES
(1, 'Cédula de Ciudadanía'),
(2, 'Tarjeta de Identidad'),
(3, 'Pasaporte'),
(4, 'Cédula de Extranjería');

-- Insertar datos en la tabla 'persona'
INSERT INTO persona (idPersona, primerNombre, segundoNombre, apellido1, apellido2, idDocumento, fechaNacimiento, telefono, correoElectronico, idProfesion, documento) VALUES
(1, 'Juan', 'Carlos', 'Gómez', 'Pérez', 1, '1985-05-15', '3001234567', 'juan.gomez@example.com', 3, 'Cédula de Ciudadanía'),
(2, 'María', 'Alejandra', 'López', 'García', 2, '1990-08-25', '3102345678', 'maria.lopez@example.com', 5, 'Tarjeta de Identidad'),
(3, 'Carlos', 'Andrés', 'Martínez', 'Rodríguez', 3, '1978-12-10', '3203456789', 'carlos.martinez@example.com', 8, 'Pasaporte');

-- Insertar datos en la tabla 'usuario'
INSERT INTO usuario (idUsuario, usuario, password, idRol, idPersona) VALUES
(1, 'admin', '$2b$10$N5UYuhZDOqmbDNRBlAAKiOdBoWtr7JDD2hOHGI9wupBEsIPxqf2bm', 1, 1),
(2, 'usuario', '$2b$10$N5UYuhZDOqmbDNRBlAAKiOdBoWtr7JDD2hOHGI9wupBEsIPxqf2bm', 2, 2),
(3, 'empleado', '$2b$10$N5UYuhZDOqmbDNRBlAAKiOdBoWtr7JDD2hOHGI9wupBEsIPxqf2bm', 3, 3);

-- Insertar datos en la tabla 'estadocita'
INSERT INTO estadocita (idestadocita, estadocita) VALUES
(1, 'Disponible'),
(2, 'Agendada'),
(3, 'cancelada');

-- Insertar datos en la tabla 'citas'
INSERT INTO citas (idCita, fechaCita, horaCita, idUsuario, idestadocita) VALUES
(1, '2023-10-15', '10:00:00', 1, 1),
(2, '2023-10-16', '11:30:00', 2, 1),
(3, '2023-10-17', '09:00:00', 3, 1);