<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$factura = new Factura;
$idFactura = $_GET['idFactura'];


if ($idFactura>0)  {
    $query = $factura -> getFactura($idFactura);
}else{
    $ultimaFactura = $factura -> getIdUltimaFactura();
    $query = $factura -> getFactura($ultimaFactura[0]);
};

echo json_encode($query);

?>