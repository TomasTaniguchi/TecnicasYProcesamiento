<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";

$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];

if($nombre === '' || $descripcion === ''){
    echo json_encode('error');

}else{
    $categoria = new Categoria();
    $query = $categoria -> Create($nombre, $descripcion);

    if ($query){
        echo json_encode('Correcto: <br>Nombre categoría: '.$nombre.'<br>Descripción: '.$descripcion); 
    }
}
?>