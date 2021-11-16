<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";



$queryType = $_POST['queryType'];
$idProducto = $_POST['idProducto'];
//echo json_encode("success".$idProducto."success".$queryType);

if ($queryType === "delete") {   

    $producto=new Producto();
    $query=$producto->Delete("productos","idProducto",$idProducto);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}
else if($queryType === "update"){

    $descProducto = $_POST['descProducto'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];
    $Categoria_idCategoria = $_POST['Categoria_idCategoria'];

    $producto=new Producto();
    $query=$producto->Update($idProducto,$descProducto, $precio, $stock, $Categoria_idCategoria);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}

?>