create database ordersyncdb;
use ordersyncdb;
-- Create the products table
CREATE TABLE products (
    id INTEGER PRIMARY KEY auto_increment,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory INTEGER NOT NULL
);

-- Create the users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY auto_increment,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY auto_increment,
    date DATE NOT NULL,
    status TEXT CHECK(status IN ('pending', 'en route', 'delivered', 'cancelled')) NOT NULL,
    paid BOOLEAN NOT NULL,
    user_id INTEGER,
    shipping_rule TEXT CHECK(shipping_rule IN ('home delivery', 'pick up')) NOT NULL,
    comments TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Create the order_products table
CREATE TABLE order_products (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
-- Insertar productos de ejemplo con nombres comunes
use ordersyncdb;

INSERT INTO products (name, price, inventory) VALUES
    ('Camiseta básica', 10.99, 50),
    ('Pantalones vaqueros', 15.50, 30),
    ('Zapatos deportivos', 20.00, 20),
    ('Gafas de sol', 25.49, 10),
    ('Bufanda de lana', 8.99, 40),
    ('Bolso de cuero', 12.75, 25),
    ('Reloj de pulsera', 18.00, 15),
    ('Chaqueta impermeable', 22.95, 5),
    ('Sombrero de paja', 30.00, 12),
    ('Calcetines de algodón', 5.99, 60);

-- Insertar usuarios de ejemplo
INSERT INTO users (name, phone, email, address, city) VALUES
    ('Juan Pérez', '123-456-7890', 'juan.perez@example.com', 'Calle Principal 123', 'Bogota'),
    ('María García', '987-654-3210', 'maria.garcia@example.com', 'Avenida Elm 456', 'Medellin'),
    ('José López', '555-123-4567', 'jose.lopez@example.com', 'Avenida Roble 789', 'Tunja'),
    ('Ana Martínez', '222-333-4444', 'ana.martinez@example.com', 'Calle Pino 567', 'Cartagena'),
    ('Pedro Sánchez', '777-888-9999', 'pedro.sanchez@example.com', 'Calle Cedro 890', 'Toronto'),
    ('Laura Rodríguez', '111-222-3333', 'laura.rodriguez@example.com', 'Avenida Maple 678', 'Paris'),
    ('Carlos Gómez', '555-666-7777', 'carlos.gomez@example.com', 'Calle Abeto 901', 'Cucuta'),
    ('Sofía Hernández', '333-444-5555', 'sofia.hernandez@example.com', 'Avenida Roble 234', 'New York'),
    ('Daniel Castro', '666-777-8888', 'daniel.castro@example.com', 'Calle Nogal 345', 'Japon'),
    ('Lucía Díaz', '999-000-1111', 'lucia.diaz@example.com', 'Avenida Pino 432', 'Belgica');
    
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES 
    ('2024-05-01', 'pending', 1, 1, 'home delivery', 'Orden de mayo pendiente de confirmación de stock.'),
    ('2024-05-02', 'en route', 1, 2, 'pick up', 'Cliente vendrá a recoger en la tarde.'),
    ('2024-05-03', 'delivered', 1, 3, 'home delivery', 'Entrega realizada con éxito.');
    
    -- Insertar órdenes según las especificaciones
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES 
    ('2024-06-01', 'pending', 1, 1, 'home delivery', 'Orden de junio pendiente de confirmación de stock.'),
    ('2024-06-01', 'en route', 1, 2, 'pick up', 'Cliente vendrá a recoger en la tarde.');

-- 2 órdenes el 2 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-02', 'delivered', 1, 3, 'home delivery', 'Entrega realizada con éxito.'),
    ('2024-06-02', 'cancelled', 0, 4, 'pick up', 'Producto no disponible en tienda.');

-- 4 órdenes el 3 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-03', 'pending', 1, 5, 'home delivery', 'Cliente espera entrega para mañana.'),
    ('2024-06-03', 'en route', 1, 6, 'pick up', 'Producto separado, listo para ser recogido.'),
    ('2024-06-03', 'delivered', 1, 7, 'home delivery', 'Entrega rápida solicitada por el cliente.'),
    ('2024-06-03', 'cancelled', 0, 8, 'pick up', 'Cliente cambió de opinión sobre la compra.');

-- 3 órdenes el 4 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-04', 'pending', 1, 9, 'home delivery', 'Producto reservado, esperando confirmación de pago.'),
    ('2024-06-04', 'en route', 1, 10, 'pick up', 'Orden preparada para envío.'),
    ('2024-06-04', 'delivered', 1, 1, 'home delivery', 'Cliente programó recogida para hoy en la mañana.');

-- 1 orden el 5 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-05', 'en route', 1, 2, 'pick up', 'Cliente confirmó recogida en la tienda.');

-- 2 órdenes el 6 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-06', 'cancelled', 0, 3, 'home delivery', 'Cliente cambió de opinión sobre la compra.'),
    ('2024-06-06', 'pending', 1, 4, 'pick up', 'Orden preparada para ser recogida.');

-- 1 orden el 7 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-07', 'pending', 1, 5, 'home delivery', 'Cliente espera confirmación de envío.');

-- 2 órdenes el 8 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-08', 'en route', 1, 6, 'pick up', 'Producto en tránsito hacia tienda.'),
    ('2024-06-08', 'delivered', 1, 7, 'home delivery', 'Entrega realizada con éxito.');

-- 3 órdenes el 9 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-09', 'delivered', 1, 8, 'pick up', 'Cliente confirmó recepción del producto.'),
    ('2024-06-09', 'cancelled', 0, 9, 'home delivery', 'Problemas con la dirección de envío.'),
    ('2024-06-09', 'pending', 1, 10, 'pick up', 'Orden en espera de confirmación de pago.');

-- 1 orden el 10 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-10', 'pending', 1, 1, 'home delivery', 'Cliente espera envío rápido.');

-- 4 órdenes el 11 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-11', 'en route', 1, 2, 'pick up', 'Producto en camino hacia la tienda.'),
    ('2024-06-11', 'delivered', 1, 3, 'home delivery', 'Entrega realizada con éxito.'),
    ('2024-06-11', 'delivered', 1, 4, 'pick up', 'Cliente confirmó recepción del producto.'),
    ('2024-06-11', 'cancelled', 0, 5, 'home delivery', 'Problemas con la dirección de envío.');

-- 2 órdenes el 12 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-12', 'pending', 1, 6, 'pick up', 'Orden preparada para ser recogida.'),
    ('2024-06-12', 'pending', 1, 7, 'home delivery', 'Cliente espera confirmación de envío.');

-- 5 órdenes el 13 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-13', 'en route', 1, 8, 'pick up', 'Producto en tránsito hacia tienda.'),
    ('2024-06-13', 'delivered', 1, 9, 'home delivery', 'Entrega realizada con éxito.'),
    ('2024-06-13', 'delivered', 1, 10, 'pick up', 'Cliente confirmó recepción del producto.'),
    ('2024-06-13', 'cancelled', 0, 1, 'home delivery', 'Cliente cambió de opinión sobre la compra.'),
    ('2024-06-13', 'pending', 1, 2, 'pick up', 'Orden en espera de confirmación de pago.');

-- 3 órdenes el 14 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-14', 'pending', 1, 3, 'home delivery', 'Cliente espera entrega para mañana.'),
    ('2024-06-14', 'en route', 1, 4, 'pick up', 'Producto separado, listo para ser recogido.'),
    ('2024-06-14', 'delivered', 1, 5, 'home delivery', 'Entrega rápida solicitada por el cliente.');

-- 2 órdenes el 15 de junio
INSERT INTO orders (date, status, paid, user_id, shipping_rule, comments)
VALUES
    ('2024-06-15', 'cancelled', 0, 6, 'pick up', 'Cliente cambió de opinión sobre la compra.'),
    ('2024-06-15', 'pending', 1, 7, 'home delivery', 'Orden preparada para envío.');
-- Insertar relaciones de productos para órdenes
-- Orden 1
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (1, 1, 2),  -- Dos unidades del producto 1
    (1, 3, 1);  -- Una unidad del producto 3

-- Orden 2
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (2, 2, 1); -- Una unidad del producto 2

-- Orden 3
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (3, 1, 3);  -- Tres unidades del producto 1

-- Orden 4
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (4, 3, 2);  -- Dos unidades del producto 3

-- Orden 5
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (5, 2, 1),  -- Una unidad del producto 2
    (5, 3, 1);  -- Una unidad del producto 3

-- Orden 6
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (6, 1, 2),  -- Dos unidades del producto 1
    (6, 2, 1);  -- Una unidad del producto 2

-- Orden 7
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (7, 2, 3);  -- Tres unidades del producto 2

-- Orden 8
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (8, 1, 1);  -- Una unidad del producto 1

-- Orden 9
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (9, 3, 2);  -- Dos unidades del producto 3

-- Orden 10
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (10, 1, 1),  -- Una unidad del producto 1
    (10, 2, 1);  -- Una unidad del producto 2

-- Orden 11
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (11, 1, 2),  -- Dos unidades del producto 1
    (11, 3, 1);  -- Una unidad del producto 3

-- Orden 12
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (12, 2, 1);  -- Una unidad del producto 2

-- Orden 13
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (13, 3, 3);  -- Tres unidades del producto 3

-- Orden 14
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (14, 1, 2),  -- Dos unidades del producto 1
    (14, 2, 2);  -- Dos unidades del producto 2

-- Orden 15
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (15, 1, 1); -- Una unidad del producto 1

-- Orden 16
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (16, 3, 1);  -- Una unidad del producto 3

-- Orden 17
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (17, 2, 3);  -- Tres unidades del producto 2

-- Orden 18
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (18, 1, 2),  -- Dos unidades del producto 1
    (18, 3, 1);  -- Una unidad del producto 3

-- Orden 19
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (19, 1, 1);-- Una unidad del producto 1

-- Orden 20
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (20, 2, 2);  -- Dos unidades del producto 2

-- Orden 21
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (21, 3, 1);  -- Una unidad del producto 3

-- Orden 22
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (22, 1, 3);  -- Tres unidades del producto 1

-- Orden 23
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (23, 2, 1); -- Una unidad del producto 2

-- Orden 24
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (24, 3, 2);  -- Dos unidades del producto 3

-- Orden 25
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (25, 1, 1),  -- Una unidad del producto 1
    (25, 2, 1);  -- Una unidad del producto 2

-- Orden 26
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (26, 2, 2);  -- Dos unidades del producto 2

-- Orden 27
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (27, 1, 1);  -- Una unidad del producto 1

-- Orden 28
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (28, 3, 1);  -- Una unidad del producto 3

-- Orden 29
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (29, 2, 3);  -- Tres unidades del producto 2

-- Orden 30
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (30, 1, 2),  -- Dos unidades del producto 1
    (30, 3, 1);  -- Una unidad del producto 3

-- Orden 31
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (31, 1, 1);  -- Una unidad del producto 1

-- Orden 32
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (32, 2, 1);  -- Una unidad del producto 2

-- Orden 33
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (33, 3, 3);  -- Tres unidades del producto 3

-- Orden 34
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (34, 1, 2),  -- Dos unidades del producto 1
    (34, 2, 2);  -- Dos unidades del producto 2

-- Orden 35
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (35, 1, 1);  -- Una unidad del producto 1

-- Orden 36
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (36, 3, 1);  -- Una unidad del producto 3

-- Orden 37
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (37, 2, 3);  -- Tres unidades del producto 2

-- Orden 38
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (38, 1, 2),  -- Dos unidades del producto 1
    (38, 3, 1);  -- Una unidad del producto 3

-- Orden 39
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (39, 1, 1);  -- Una unidad del producto 1

-- Orden 40
INSERT INTO order_products (order_id, product_id, quantity)
VALUES 
    (40, 2, 2);  -- Dos unidades del producto 2

