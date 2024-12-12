<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if (isset($_POST["data"]) and !empty($_POST["data"])) {
    $data = $_POST["data"];
} else {
    $_SESSION["info"]["data"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}




$data = $sugar;

if (isset($data) and isset($protein) and isset($fats) && isset($sugar) && $a == 4) {
    $ins_data = [
        ":name" => $name,
        ":data" => $data,
        ":protein" => $protein,
        ":fats" => $fats,
        ":sugar" => $sugar,
    ];
    $sql = "INSERT INTO food (ID, name, data, protein, fats, sugar, time) VALUES (null, null, :data, null, null, null, null)";
    $con = $db->prepare($sql);
    $con->execute($ins_data);
    $datafinal2 = $con->fetchALL(PDO::FETCH_ASSOC);
    $_SESSION["pes"] = $id;
    unset($_SESSION["inputy"]["data"]);
    unset($_SESSION["inputy"]["protein"]);
    unset($_SESSION["inputy"]["fats"]);
    header("location: Calories.jsx");
} else {
    header("location: data.jsx");
    $_SESSION["inputy"] = $_POST;
}




echo json_encode($data);






?>