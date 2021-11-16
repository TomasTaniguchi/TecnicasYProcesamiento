<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$cliente = new Cliente;
$query = $cliente -> Read("clientes");

echo json_encode($query);


?>