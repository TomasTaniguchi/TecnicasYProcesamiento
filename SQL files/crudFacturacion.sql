-- Alta categoria

USE facturacion;

INSERT INTO categorias (nombre, descripcion)
VALUES ('perifericos', 'componentes externos de pc');
INSERT INTO categorias (nombre, descripcion)
VALUES ('hardware', 'componentes internos de pc');
INSERT INTO categorias (nombre, descripcion)
VALUES ('software', 'Programas de pc');


-- Alta productos
USE facturacion;

INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('monitor 14in', 12000, 12, 1*);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('mouse', 800, 20, 1);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('teclado', 700, 7, 1);

INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('motherboard asrock', 15000, 14, 2);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('Placa video Nvidia 1660', 148000, 0, 2);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('Fuente 1000w', 11700, 6, 2);

INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('Microsoft Office', 5000, 100, 3);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('AutoCad', 6546, 14, 3);
INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria)
VALUES ('Adobe Premiere', 7894, 114, 3);



-- Alta clientes
USE facturacion;

INSERT INTO clientes (apellido, nombre, direccion, email, telefono, fechaNacimiento)
VALUES ('Consumidor Final', 'anonimo', 'anonimo', 'anonimo', 'anonimo', '1970-01-01');
INSERT INTO clientes (apellido, nombre, direccion, email, telefono, fechaNacimiento)
VALUES ('Poiponovich', 'Poipoi', 'Rusia 123', 'poipoi@rusia.rus', '123456789', '2000-01-01');
INSERT INTO clientes (apellido, nombre, direccion, email, telefono, fechaNacimiento)
VALUES ('Landa', 'Lalo', 'Av Siempreviva 743', 'lalo@landa.com', '98798787', '2001-02-10');
INSERT INTO clientes (apellido, nombre, direccion, email, telefono, fechaNacimiento)
VALUES ('Maggiolo', 'Ana', 'Roque Perez 456', 'alanana@gmail.com', '65465454', '1985-12-14');


-- Alta modo de pago
USE facturacion;

INSERT INTO modos_pago (nombre)
VALUES ('efectivo');
INSERT INTO modos_pago (nombre)
VALUES ('credito');
INSERT INTO modos_pago (nombre)
VALUES ('debito');


-- Alta factura y detalles 1
USE facturacion;

INSERT INTO facturas (Cliente_idCliente, fecha, Modo_pago_idModo_pago)
VALUES (1, now(), 1);

INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (1, 1, 11, (SELECT precio from productos WHERE idProducto=1)); -- Producto_idProducto
INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (1, 2, 22, (SELECT precio from productos WHERE idProducto=2));


-- Alta factura y detalles 2
USE facturacion;

INSERT INTO facturas (Cliente_idCliente, fecha, Modo_pago_idModo_pago)
VALUES (1, now(), 2);

INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (2, 3, 4, (SELECT precio from productos WHERE idProducto=3)); -- Producto_idProducto
INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (2, 2, 5, (SELECT precio from productos WHERE idProducto=2));
INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (2, 4, 5, (SELECT precio from productos WHERE idProducto=4));


-- Alta factura y detalles 3
USE facturacion;

INSERT INTO facturas (Cliente_idCliente, fecha, Modo_pago_idModo_pago)
VALUES (2, now(), 3);

INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (3, 5, 20, (SELECT precio from productos WHERE idProducto=5)); -- Producto_idProducto
INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (3, 6, 14, (SELECT precio from productos WHERE idProducto=6));
INSERT INTO detalles (Factura_idFactura, Producto_idProducto, cantidad, precio)
VALUES (3, 7, 3, (SELECT precio from productos WHERE idProducto=7));


-- Consulta factura 

SELECT 
    fecha,
    idFactura,
    apellido,
    nombre,
    Producto_idProducto,
    descProducto,
    cantidad,
    detalles.precio,
    (cantidad*detalles.precio) as 'Total'
    
FROM 
    facturas
INNER JOIN clientes ON facturas.Cliente_idCliente=clientes.idCliente
INNER JOIN detalles ON facturas.idFactura=detalles.Factura_idFactura
INNER JOIN productos ON productos.idProducto=detalles.Producto_idProducto
WHERE facturas.idFactura=1 -- idFactura del front
-- WHERE idCliente=1 -- idCliente del front




-- Update Categorias
UPDATE categorias
SET nombre = 'Software', descripcion= 'Programas PC'
WHERE idCategoria = 3;

-- Update Productos
UPDATE productos
SET precio = 11.99 , stock= 4
WHERE idProducto = 2;

-- Update Clientes
UPDATE clientes
SET apellido = 'Fulanito' , fechaNacimiento= '2002-04-08'
WHERE idCliente = 2;


-- Update modo de pago
UPDATE modos_pago
SET nombre = 'Organos'
WHERE idModo_pago = 2;


-- Delete Categorias
DELETE FROM categorias WHERE idCategoria=1;

-- Delete Productos
DELETE FROM productos WHERE idProducto=1;

-- Delete Clientes
DELETE FROM clientes WHERE idCliente=1;

-- Delete modo de pago
DELETE FROM modos_pago WHERE idModo_pago=1;
