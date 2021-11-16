<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$categoria = new Categoria;
$query = $categoria -> Read("categorias");

echo json_encode($query);


?>