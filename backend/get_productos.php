<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$producto = new Producto;
$query = $producto -> Read("productos");

echo json_encode($query);

?>