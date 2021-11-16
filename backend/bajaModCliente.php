<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";



$queryType = $_POST['queryType'];
$idCliente = $_POST['idCliente'];
//echo json_encode("success".$idCliente."success".$queryType);

if ($queryType === "delete") {   

    $cliente=new Cliente();
    $query=$cliente->Delete("clientes","idCliente",$idCliente);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}
else if($queryType === "update"){

    $apellido = $_POST['apellido'];
    $nombre = $_POST['nombre'];
    $direccion = $_POST['direccion'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $fechaNacimiento = $_POST['fechaNacimiento'];

    $cliente=new Cliente();
    $query=$cliente->Update($idCliente,$apellido, $nombre, $direccion, $email, $telefono, $fechaNacimiento);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}

?>