<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = ['message' => 'this is a response from PHP!'];

echo json_encode($data);



$a = 0;
$b = 0;
$id = $_GET["id"];

if (isset($_GET["calories"]) and !empty($_GET["calories"])) {
    $record = $_GET["calories"];
} else {
    $_SESSION["info"]["calories"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}



if (isset($_GET["protein"]) and !empty($_GET["protein"])) {
    $protein = $_GET["protein"];
    $a++;
} else {
    $_SESSION["info"]["protein"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}



if (isset($_GET["fats"]) and !empty($_GET["fats"])) {
    $fats = $_GET["fats"];
    $a++;
} else {
    $_SESSION["info"]["fats"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}


if (isset($_GET["sugar"]) and !empty($_GET["sugar"])) {
    $sugar = $_GET["sugar"];
    $a++;
} else {
    $_SESSION["info"]["sugar"] = "<strong>musi obsahovat pouze pismena bez mezer</strong>";
}






if (isset($calories) and isset($protein) and isset($fats)) {
    $cas = date('Y-m-d H:i:s');
    $ins_data = [
        ":calories" => $calories,
        ":protein" => $protein,
        ":fats" => $fats,
        ":cas" => $cas
    ];
    $sql = "INSERT INTO cms_GET (id_GET, calories, protein, fats, date) VALUES (null, :calories, :protein, :fats, :cas)";
    $con = $db->prepare($sql);
    $con->execute($ins_data);
    $datafinal2 = $con->fetchALL(PDO::FETCH_ASSOC);
    $_SESSION["pes"] = $id;
    unset($_SESSION["inputy"]["calories"]);
    unset($_SESSION["inputy"]["protein"]);
    unset($_SESSION["inputy"]["fats"]);
    header("location: Calories.jsx");
} else {
    header("location: Calories.jsx");
    $_SESSION["inputy"] = $_GET;
}












?>
?>