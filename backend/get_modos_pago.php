<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$modo_pago = new ModoPago;
$query = $modo_pago -> Read("modos_pago");

echo json_encode($query);


?>