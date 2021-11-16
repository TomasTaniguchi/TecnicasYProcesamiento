<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";



$queryType = $_POST['queryType'];
$idCategoria = $_POST['idCategoria'];
//echo json_encode("success".$idCategoria."success".$queryType);

if ($queryType === "delete") {   

    $categoria=new Categoria();
    $query=$categoria->Delete("categorias","idCategoria",$idCategoria);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}
else if($queryType === "update"){

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $categoria=new Categoria();
    $query=$categoria->Update($idCategoria,$nombre,$descripcion);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }

}



?>