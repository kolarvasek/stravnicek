<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://kolarva23.sps-prosek.cz");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"]) || !isset($_SESSION['ID'])) {
    echo json_encode(["status" => false]);
    exit;
}

try {
    $mealId = intval($data["id"]);
    $sql = "DELETE FROM food WHERE ID = :id AND user_id = :user_id LIMIT 1";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ":id" => $mealId,
        ":user_id" => $_SESSION['ID']
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => true, "id" => $mealId]);
    } else {
        echo json_encode("meal not found");
    }
} catch (PDOException $e) {
    echo json_encode("error getting meal");
}
?>