
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS factory_store;
USE factory_store;

-- Crear tabla de productos con code autoincremental
CREATE TABLE IF NOT EXISTS products (
    code INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insertar datos en products (sin especificar el code)
INSERT INTO products (description, stock, price) VALUES
('Arroz blanco 1kg', 50, 120.5),
('Fideos spaghetti 500g', 40, 95),
('Harina de trigo 1kg', 30, 80.75),
('Azúcar blanca 1kg', 45, 110),
('Aceite de girasol 1L', 25, 450),
('Leche entera 1L', 60, 180.5),
('Queso cremoso 500g', 35, 620),
('Manteca 200g', 20, 340.75),
('Yogur natural 200g', 50, 130),
('Pan lactal 500g', 40, 290),
('Galletas de chocolate 300g', 25, 250),
('Café molido 250g', 30, 870),
('Té en saquitos (20 unidades)', 55, 190),
('Mermelada de frutilla 500g', 20, 430),
('Dulce de leche 400g', 30, 520),
('Chocolate en barra 100g', 40, 360),
('Cerveza rubia 1L', 50, 720),
('Vino tinto Malbec 750ml', 20, 1200),
('Jugo de naranja 1L', 30, 450),
('Gaseosa cola 2L', 60, 680),
('Sal fina 500g', 45, 90),
('Pimienta negra molida 50g', 25, 250),
('Mayonesa 500g', 30, 390),
('Mostaza 500g', 30, 350),
('Ketchup 1kg', 20, 550),
('Papas fritas congeladas 1kg', 35, 750),
('Hamburguesas de carne 4u', 40, 820),
('Pollo entero 1.5kg', 15, 1750),
('Carne de res 1kg', 25, 2800),
('Pescado merluza 1kg', 20, 2200);

-- Crear tabla de usuarios con id autoincremental
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'seller') NOT NULL
);

-- Insertar datos en users (sin especificar el id)
INSERT INTO users (name, email, role) VALUES
('Juan Pérez', 'juan.perez@example.com', 'admin'),
('María García', 'maria.garcia@example.com', 'seller'),
('Luis Fernández', 'luis.fernandez@example.com', 'seller');
