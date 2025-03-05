-- Paso 1: Crear la base de datos
CREATE DATABASE hyperagendados;

-- Paso 2: Seleccionar la base de datos
USE hyperagendados;

-- Paso 3: Crear la tabla 'rol'
CREATE TABLE rol (
    idRol INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Paso 4: Crear la tabla 'profesion'
CREATE TABLE profesion (
    idProfesion INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Paso 5: Crear la tabla 'documento'
CREATE TABLE documento (
    idDocumento INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Paso 6: Crear la tabla 'persona'
CREATE TABLE persona (
    idPersona INT PRIMARY KEY,
    primerNombre VARCHAR(50),
    segundoNombre VARCHAR(50),
    apellido1 VARCHAR(50),
    apellido2 VARCHAR(50),
    idDocumento INT,
    fechaNacimiento DATE,
    telefono VARCHAR(15),
    correoElectronico VARCHAR(100),
    idProfesion INT,
    tipoDocumento VARCHAR(50),
    FOREIGN KEY (idDocumento) REFERENCES documento(idDocumento),
    FOREIGN KEY (idProfesion) REFERENCES profesion(idProfesion)
);

-- Paso 7: Crear la tabla 'usuario'
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY,
    nombreUsuario VARCHAR(50),
    Contraseña VARCHAR(50),
    idRol INT,
    idPersona INT,
    FOREIGN KEY (idRol) REFERENCES rol(idRol),
    FOREIGN KEY (idPersona) REFERENCES persona(idPersona)
);


-- Paso 8: Crear la tabla 'citas'
CREATE TABLE citas (
    idCita INT PRIMARY KEY,
    fechaCita DATE,
    horaCita TIME,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    idestadocita int
);
