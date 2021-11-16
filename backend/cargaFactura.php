<?php

include_once "class.php";


$Modo_pago_idModo_pago = $_POST['Modo_pago_idModo_pago'];
$Cliente_idCliente = $_POST['Cliente_idCliente'];
$ProductosLS = $_POST['productosCarrito'];


$arrayCarrito= json_decode($ProductosLS, true);

if($Modo_pago_idModo_pago === '' || $Cliente_idCliente === '' || $ProductosLS==null){
    echo json_encode('errorVacio');
}else{
    $factura = new Factura();
    $insertFactura=$factura->etapaUno($Cliente_idCliente,$Modo_pago_idModo_pago);

    if($insertFactura){
        $arr_length = count($arrayCarrito);
        for($i = 0; $i < $arr_length; $i++){
            $insertDetalle=$factura->etapaDos($insertFactura,$arrayCarrito[$i]["IdProductoCart"],$arrayCarrito[$i]["CantidadCart"],$arrayCarrito[$i]["PrecioCart"]);

            $updateProductos=$factura->etapaTres($arrayCarrito[$i]["IdProductoCart"],$arrayCarrito[$i]["CantidadCart"]);
        }
    }
    echo json_encode("success");

}

?>
