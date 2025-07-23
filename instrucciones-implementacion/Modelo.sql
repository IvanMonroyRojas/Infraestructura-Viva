-- Crear base de datos
CREATE DATABASE acme_innovacion;
USE acme_innovacion;
-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    fecha_registro DATE DEFAULT CURRENT_DATE
);
-- Tabla de tickets de soporte
CREATE TABLE tickets_soporte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    asunto VARCHAR(255),
    estado ENUM('Abierto', 'En Proceso', 'Cerrado') DEFAULT 'Abierto',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
-- Insertar datos de ejemplo
INSERT INTO clientes (nombre, correo)
VALUES ('Ana Torres', 'ana.torres@acme.com'),
    ('Luis Rojas', 'luis.rojas@acme.com');
INSERT INTO tickets_soporte (cliente_id, asunto, estado)
VALUES (
        1,
        'No puedo acceder al sistema de ventas',
        'Abierto'
    ),
    (
        2,
        'Error al cargar reporte financiero',
        'En Proceso'
    );