<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";

$nombre = $_POST['nombre'];

if($nombre=== ''){
    echo json_encode('error');
}else{
    $modoPago = new ModoPago();
    $query = $modoPago -> Create($nombre);

    if ($query){
        echo json_encode('Correcto: <br>Modo de pago: '.$nombre);
    }
}
?>