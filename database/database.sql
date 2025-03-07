-- Paso 1: Crear la base de datos
CREATE DATABASE IF NOT EXISTS hyperagendados;

-- Paso 2: Seleccionar la base de datos
USE hyperagendados;

-- Paso 3: Crear la tabla 'rol'
CREATE TABLE rol (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- Paso 4: Crear la tabla 'profesion'
CREATE TABLE profesion (
    idProfesion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- Paso 5: Crear la tabla 'documento'
CREATE TABLE documento (
    idDocumento INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- Paso 6: Crear la tabla 'persona'
CREATE TABLE persona (
    idPersona BIGINT PRIMARY KEY AUTO_INCREMENT,
    primerNombre VARCHAR(50),
    segundoNombre VARCHAR(50),
    apellido1 VARCHAR(50),
    apellido2 VARCHAR(50),
    idDocumento INT,
    documento VARCHAR(50),
    fechaNacimiento DATE,
    telefono VARCHAR(15),
    correoElectronico VARCHAR(100),
    idProfesion INT,
    FOREIGN KEY (idDocumento) REFERENCES documento(idDocumento),
    FOREIGN KEY (idProfesion) REFERENCES profesion(idProfesion)
);

-- Paso 7: Crear la tabla 'usuario'
CREATE TABLE usuario (
    idUsuario BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50),
    password VARCHAR(500),
    idRol INT,
    idPersona BIGINT,
    FOREIGN KEY (idRol) REFERENCES rol(idRol),
    FOREIGN KEY (idPersona) REFERENCES persona(idPersona)
);

-- Paso 8: Crear la tabla 'estadocita'
CREATE TABLE estadocita (
    idestadocita INT PRIMARY KEY AUTO_INCREMENT,
    estadocita VARCHAR(50)
);

-- Paso 9: Crear la tabla 'citas'
CREATE TABLE citas (
    idCita BIGINT PRIMARY KEY AUTO_INCREMENT,
    fechaCita DATE,
    horaCita TIME,
    idUsuario BIGINT,
    idestadocita INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idestadocita) REFERENCES estadocita(idestadocita)
);