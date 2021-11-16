<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";

$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$categoria = $_POST['categoria'];


if($descripcion === '' || $precio === '' || $stock === '' || $categoria === ''){
    echo json_encode('errorVacio');
}else{
    $producto = new Producto();
    $query = $producto -> Create($descripcion, $precio, $stock, $categoria);

    if ($query){
        echo json_encode('Correcto: <br>Producto '.$descripcion.'<br>Precio: $ '.$precio.'<br>Stock: '.$stock.'<br>Cod. Categoria: '.$categoria); 
    }
}


?>