USE facturacion;

----------------------

-- Producto con mayor precio
SELECT 
	descProducto, 
	precio 
FROM 
	productos 
WHERE 
	precio=(SELECT MAX(precio) from productos)



-- Total Ventas
SELECT SUM(cantidad*precio) as totalVentas FROM detalles 



-- Total Ventas entre fechas
SELECT SUM(cantidad*precio) as totalVentas 
FROM 
	detalles 
	JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
WHERE fecha BETWEEN "2021-07-12 17:46:14" AND "2021-07-12 18:34:52"
--WHERE fecha BETWEEN DATE("2021-07-12 17:46:14") AND DAtE("2021-07-12 18:34:52")  -- Prueba con constructor


-- Lista de precios de cada factura
SELECT idFactura, Cliente_idCliente, fecha, COUNT(idDetalle) as "cantArticulos", SUM(cantidad*precio) as "totalFacturaMax"
FROM  
	detalles 
	JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
GROUP BY facturas.idFactura



-- Factura de mayor precio
SELECT idFactura, Cliente_idCliente, fecha, COUNT(idDetalle) as "cantArticulos", SUM(cantidad*precio) as "totalFacturaMax"
FROM  
	detalles 
	JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
GROUP BY facturas.idFactura
ORDER BY SUM(cantidad*precio) DESC
LIMIT 1 



-- Cantidad de productos vendidos en efectivo (teniendo en cuenta las unidades)
SELECT productos.idProducto, descProducto, SUM(cantidad) totalUnidades -- COUNT()
FROM  
	detalles 
	JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
	JOIN productos ON productos.idProducto = detalles.Producto_idProducto
GROUP BY productos.idProducto
ORDER BY descProducto



-- Cantidad de ventas por un modo de pago (efectivo)
SELECT Modo_pago_idModo_pago, COUNT(Modo_pago_idModo_pago) as cantVentas
FROM facturas
GROUP BY Modo_pago_idModo_pago
ORDER BY Modo_pago_idModo_pago
LIMIT 1 --para otro WHERE Modo_pago_idModo_pago = 2 etc


-- Cantidad de articulos vendidos por modo de pago
SELECT modos_pago.nombre, SUM(cantidad) as cantArticulos
FROM  
	detalles 
	JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
	JOIN modos_pago ON facturas.Modo_pago_idModo_pago = modos_pago.idModo_pago
GROUP BY Modo_pago_idModo_pago
ORDER BY Modo_pago_idModo_pago
