<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$items = $data['items'];
echo json_encode($items);   



// pro vypisovani se pouzije funkce json_encode
// poslat veci do databaze podle user_id(pridat do db)
// vytahnout vsechny veci daneho uzivatele z databaze a ty pak vypsat do Recent Meals z Calories.jsx


?>