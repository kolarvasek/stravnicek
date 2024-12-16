<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

echo json_encode($data);

// pro vypisovani se pouzije funkce json_encode ( vypisovani na server.php zatim nefunguje nvm proc, ale poslani veci do db by melo fungovat)
// ziskat veci z promeny data
// poslat veci do databaze

?>