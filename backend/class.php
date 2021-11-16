<?php

class Conexion {
    private $server = "localhost";
    private $user = "root";
    private $pass = "";
    private $bd = "facturacion";

    function Conectar(){
        $resultado=mysqli_connect($this->server,$this->user,$this->pass,$this->bd);
        return $resultado;
    }
}


class AbmBase{

    function Read($tabla){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="SELECT * FROM $tabla";
        $resu= mysqli_query($s,$sql);
        $resultado=array();
        while ($obj = $resu->fetch_object()) {
            array_push($resultado,$obj);
        }    
        return $resultado;
    }

    function Delete($tabla,$idNombre,$id){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="DELETE FROM $tabla where $idNombre= '$id'";
        return mysqli_query($s,$sql);
    }    
}


class Categoria extends AbmBase{
    function Create($nombre, $descripcion){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO categorias (nombre, descripcion) VALUE ('$nombre','$descripcion')";
        return mysqli_query($s,$sql);
    }


    function Update($idCategoria,$nombre, $descripcion){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="UPDATE categorias SET nombre='$nombre',descripcion='$descripcion' WHERE idCategoria='$idCategoria'";
        return mysqli_query($s,$sql);
    }

}


class Cliente extends AbmBase{
    function Create($apellido, $nombre, $direccion, $email, $telefono, $fechaNacimiento){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO clientes (apellido, nombre, direccion, email, telefono, fechaNacimiento) VALUE ('$apellido', '$nombre', '$direccion', '$email', '$telefono', '$fechaNacimiento')";
        return mysqli_query($s,$sql);
    }


    function Update($idCliente,$apellido, $nombre, $direccion, $email, $telefono, $fechaNacimiento){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="UPDATE clientes SET apellido='$apellido', nombre='$nombre', direccion='$direccion', email='$email', telefono='$telefono', fechaNacimiento='$fechaNacimiento' WHERE idCliente='$idCliente'";
        return mysqli_query($s,$sql);
    }

   
}


class ModoPago extends AbmBase{
    function Create($nombre){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO modos_pago (nombre) VALUE ('$nombre')";
        return mysqli_query($s,$sql);
    }


    function Update($idModoPago,$nombre){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="UPDATE modos_pago SET nombre='$nombre' WHERE idModo_pago='$idModoPago'";
        return mysqli_query($s,$sql);
    }

  

}

class Producto extends AbmBase{
    function Create($descProducto, $precio, $stock, $Categoria_idCategoria){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO productos (descProducto, precio, stock, Categoria_idCategoria) VALUE ('$descProducto', '$precio', '$stock', '$Categoria_idCategoria')";
        return mysqli_query($s,$sql);
    }


    function Update($idProducto,$descProducto, $precio, $stock, $Categoria_idCategoria){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="UPDATE productos SET descProducto='$descProducto', precio='$precio', stock='$stock', Categoria_idCategoria='$Categoria_idCategoria' WHERE idProducto='$idProducto'";
        return mysqli_query($s,$sql);
    }
}

class Factura{

    function etapaUno($Cliente_idCliente, $Modo_pago_idModo_pago){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO facturas (Cliente_idCliente, fecha, Modo_pago_idModo_pago) VALUE ('$Cliente_idCliente', NOW(), '$Modo_pago_idModo_pago')";
        mysqli_query($s,$sql);
        return mysqli_insert_id($s); // esta funcion retorna el id de la factura para usarla en la siguiente etapa
    }

    function etapaDos($Factura_idFactura,$Producto_idProducto,$cantidad,$precio){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql= "INSERT INTO detalles (Factura_idFactura,Producto_idProducto,cantidad,precio) VALUE ('$Factura_idFactura', '$Producto_idProducto','$cantidad', '$precio')";
        return mysqli_query($s,$sql);
    }

    function etapaTres($idProducto, $cantidad){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql="UPDATE productos SET stock=(SELECT stock FROM productos WHERE idProducto='$idProducto')-'$cantidad' WHERE idProducto='$idProducto'";
        return mysqli_query($s,$sql);
    }



    function getFactura($idFactura) {
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT 
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
        WHERE facturas.idFactura = '$idFactura';";
        $resu= mysqli_query($s,$sql);
        $resultado=array();
        while ($obj = $resu->fetch_object()) {
            array_push($resultado,$obj);
        }    
        return $resultado;
    }

    function getIdUltimaFactura() {
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT MAX(idFactura) as ultimaFactura FROM facturas";
        $resu= mysqli_query($s,$sql);
        $test = mysqli_fetch_row($resu);
         
        return $test;
    }
}
    
class Informe{

    public $data=array();

    function getMaxPrecio(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT 
        descProducto, 
        precio 
    FROM 
        productos 
    WHERE 
        precio=(SELECT MAX(precio) from productos)";
        $resu= mysqli_query($s,$sql);
        $listaPrecioMax = array();
        while ($obj = $resu->fetch_object()) {
            array_push($listaPrecioMax,$obj);
            $this->data["precioMax"]=$listaPrecioMax;
        }

    }


    function getMinPrecio(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT 
        descProducto, 
        precio 
    FROM 
        productos 
    WHERE 
        precio=(SELECT MIN(precio) from productos)";
        $resu= mysqli_query($s,$sql);
        $listaPrecioMin = array();
        while ($obj = $resu->fetch_object()) {
            array_push($listaPrecioMin,$obj);
        }
        $this->data["precioMin"]=$listaPrecioMin;

    }

    function getTotalVentas(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT SUM(cantidad*precio) as totalVentas FROM detalles";
        $resu= mysqli_query($s,$sql);
        while ($obj = $resu->fetch_object()) {
            array_push($this->data,$obj);
        }

    }


    function getInformeFacturas(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT idFactura, Cliente_idCliente, apellido, clientes.nombre, idModo_pago, modos_pago.nombre as modoPago,fecha, COUNT(idDetalle) as cantArticulos, SUM(cantidad*precio) as totalFactura
        FROM  
            detalles 
            JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
            JOIN clientes ON clientes.idCliente = facturas.Cliente_idCliente
            JOIN modos_pago ON modos_pago.idModo_pago = facturas.Modo_pago_idModo_pago
        GROUP BY facturas.idFactura";
        $resu= mysqli_query($s,$sql);
        $infoFacturas=array();
        while ($obj = $resu->fetch_object()) {
            array_push($infoFacturas,$obj);
        }
        $this->data["informeFacturas"]=$infoFacturas;
        //array_push($this->data,$infoFacturas);
    }

    //cuanta cantidad de ventas y no cantidad de productos vendidos
    function getProductoMasVendidoPorModoDePago($modoPago){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT Modo_pago_idModo_pago, nombre, COUNT(Modo_pago_idModo_pago) as cantVentas
        FROM facturas
            JOIN modos_pago ON facturas.Modo_pago_idModo_pago = modos_pago.idModo_pago
        WHERE Modo_pago_idModo_pago = '$modoPago'
        GROUP BY Modo_pago_idModo_pago
        ORDER BY Modo_pago_idModo_pago";
        $resu= mysqli_query($s,$sql);
        while ($obj = $resu->fetch_object()) {
            array_push($this->data,$obj);
        }
    }


    function getInformeProductosVendidos(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT productos.idProducto, descProducto, SUM(cantidad) totalUnidades -- COUNT()
        FROM  
            detalles 
            JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
            JOIN productos ON productos.idProducto = detalles.Producto_idProducto
        GROUP BY productos.idProducto
        ORDER BY descProducto";
        $infoProductosVendidos=array();
        $resu= mysqli_query($s,$sql);
        while ($obj = $resu->fetch_object()) {
            array_push($infoProductosVendidos,$obj);
        }
        $this->data["productosVendidos"]=$infoProductosVendidos;
    }

    function getUnidadesVendidasPorModoDePago(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT modos_pago.nombre, SUM(cantidad) as cantArticulos
        FROM  
            detalles 
            JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
            JOIN modos_pago ON facturas.Modo_pago_idModo_pago = modos_pago.idModo_pago
        GROUP BY Modo_pago_idModo_pago
        ORDER BY Modo_pago_idModo_pago";
        $infoUnidadesVendidasPorModoPago=array();
        $resu= mysqli_query($s,$sql);
        while ($obj = $resu->fetch_object()) {
            array_push($infoUnidadesVendidasPorModoPago,$obj);
        }
        $this->data["UnidadesVendidasPorModoPago"]=$infoUnidadesVendidasPorModoPago;
    }

    // este ultimo quedo pendiente de modificar
    function totalVentasEntreFechas($fechaDesde,$fechaHasta){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT SUM(cantidad*precio) as totalVentas 
        FROM 
            detalles 
            JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
        WHERE fecha BETWEEN '$fechaDesde' AND '$fechaHasta'";
        $resu= mysqli_query($s,$sql);
        $resultado=array();
        while ($obj = $resu->fetch_object()) {
            array_push($resultado,$obj);
        }    
        return $resultado;
    }


    function facturaMax(){
        $c= new Conexion();
        $s=$c->Conectar();
        $sql = "SELECT idFactura, Cliente_idCliente, apellido, clientes.nombre, idModo_pago, modos_pago.nombre as modoPago,fecha, COUNT(idDetalle) as cantArticulos, SUM(cantidad*precio) as totalFactura
        FROM  
            detalles 
            JOIN facturas ON facturas.idFactura = detalles.Factura_idFactura
            JOIN clientes ON clientes.idCliente = facturas.Cliente_idCliente
            JOIN modos_pago ON modos_pago.idModo_pago = facturas.Modo_pago_idModo_pago
        GROUP BY facturas.idFactura
        ORDER BY SUM(cantidad*precio) DESC 
        LIMIT 1";
        $resu= mysqli_query($s,$sql);
        while ($obj = $resu->fetch_object()) {
            array_push($this->data,$obj);
        }
    }

}

?>