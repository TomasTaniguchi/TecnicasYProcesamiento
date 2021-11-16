<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once "class.php";

$mail= $_POST["email"];
$pass= $_POST["pass"];

$validar = new AbmBase;
$query = $validar -> Read("usuarios");


$arr_length = count($query);
for($i=0;$i<$arr_length;$i++){
    if($mail==$query[$i]->mail && $pass==$query[$i]->pass){
        echo json_encode($query[$i]);
        break;
    }  
}
?>