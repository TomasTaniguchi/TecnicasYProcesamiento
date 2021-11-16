<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "class.php";



$queryType = $_POST['queryType'];
$idModoPago = $_POST['idModo_pago'];
//echo json_encode("success".$idModo_pago."success".$queryType);

if ($queryType === "delete") {

    $modoPago=new ModoPago();
    $query=$modoPago->Delete("modos_pago","idModo_pago",$idModoPago);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }
}
else if($queryType === "update"){

    $nombre = $_POST['nombre'];

    $modoPago=new ModoPago();
    $query=$modoPago->Update($idModoPago,$nombre);

    if($query){
        echo json_encode("success");
    }
    else{
        echo json_encode("error");  
    }

}



?>