<?php 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = ['message' => 'this is a response from PHP!'];

echo json_encode($data);

?>