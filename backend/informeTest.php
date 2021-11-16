<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$informe=new Informe;
$informe->getMaxPrecio();
$informe->getMinPrecio();
$informe->getTotalVentas();
$informe->getProductoMasVendidoPorModoDePago(1);
$informe->getProductoMasVendidoPorModoDePago(2);
$informe->getProductoMasVendidoPorModoDePago(3);

$informe->getInformeProductosVendidos();
$informe->getUnidadesVendidasPorModoDePago();
$informe->getInformeFacturas();

$dataJson=$informe->data;

echo json_encode($dataJson);


?>

