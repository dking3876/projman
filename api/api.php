<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$apiType = isset($_GET['apiType'])? $_GET['apiType'] : false;
if(!$apiType){
    echo json_encode(array(
        'message'   => 'You have not specified an api Type',
        'success'   => false
    ));
    die();
}
$ajaxData = json_decode(file_get_contents('php://input'), true);
require $apiType.'.php';