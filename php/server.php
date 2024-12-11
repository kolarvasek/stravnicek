<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$a = 0;
$b = 0;
$id = $_GET["id"];

$name = $_GET["name"];

if (isset($_GET["calories"]) and !empty($_GET["calories"]) && is_numeric($_GET["calories"])) {
    $calories = $_GET["calories"];
} else {
    $_SESSION["info"]["calories"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}



if (isset($_GET["protein"]) and !empty($_GET["protein"]) && is_numeric($_GET["protein"])) {
    $protein = $_GET["protein"];
    $a++;
} else {
    $_SESSION["info"]["protein"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}



if (isset($_GET["fats"]) and !empty($_GET["fats"]) && is_numeric($_GET["fats"])) {
    $fats = $_GET["fats"];
    $a++;
} else {
    $_SESSION["info"]["fats"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}


if (isset($_GET["sugar"]) and !empty($_GET["sugar"]) && is_numeric($_GET["sugar"])) {
    $sugar = $_GET["sugar"];
    $a++;
} else {
    $_SESSION["info"]["sugar"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}




$data = $sugar;

if (isset($calories) and isset($protein) and isset($fats) && isset($sugar) && $a == 4) {
    $ins_data = [
        ":name" => $name,
        ":calories" => $calories,
        ":protein" => $protein,
        ":fats" => $fats,
        ":sugar" => $sugar,
    ];
    $sql = "INSERT INTO food (ID, name, calories, protein, fats, sugar) VALUES (null, :name, :calories, :protein, :fats, :sugar)";
    $con = $db->prepare($sql);
    $con->execute($ins_data);
    $datafinal2 = $con->fetchALL(PDO::FETCH_ASSOC);
    $_SESSION["pes"] = $id;
    unset($_SESSION["inputy"]["calories"]);
    unset($_SESSION["inputy"]["protein"]);
    unset($_SESSION["inputy"]["fats"]);
    header("location: Calories.jsx");
} else {
    //header("location: Calories.jsx");
    $_SESSION["inputy"] = $_GET;
}




echo json_encode($data);






?>