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

foreach ($items as $item) {
    $name = $item['name'];
    $calories = $item['calories'];
    $protein = $item['protein_g'];
    $carbs = $item['carbohydrates_total_g'];
    $fat = $item['fat_total_g'];
    $user_id = $_SESSION['ID']; 

    $sql = "INSERT INTO food (name, user_id, calories, protein, carbs, fat) VALUES (:name, :user_id, :calories, :protein, :carbs, :fat)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':user_id' => $user_id,
        ':calories' => $calories,
        ':protein' => $protein,
        ':carbs' => $carbs,
        ':fat' => $fat
    ]);
}

echo json_encode(['status' => 'success']);
?>