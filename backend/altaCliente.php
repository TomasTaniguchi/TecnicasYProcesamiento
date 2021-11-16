<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";

$apellido = $_POST['apellido'];
$nombre = $_POST['nombre'];
$direccion = $_POST['direccion'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$fechaNacimiento = $_POST['fechaNacimiento'];

if($apellido === '' || $nombre=== '' || $direccion=== '' || $email=== '' || $telefono=== '' || $fechaNacimiento=== ''){
    echo json_encode('error');
}else{
    $cliente = new Cliente();
    $query = $cliente -> Create($apellido, $nombre, $direccion, $email, $telefono, $fechaNacimiento);

    if ($query){
        echo json_encode('Correcto: <br>Apellido: '.$apellido.'<br>Nombre: '.$nombre.'<br>Dirección: '.$direccion.'<br>Email: '.$email.'<br>Teléfono: '.$telefono.'<br>Fecha de nacimiento: '.$fechaNacimiento);
    }
}
?>