<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    if (!isset($data['items']) || !is_array($data['items'])) {
        echo json_encode(['status' => 'error', 'message' => 'wrong input']);
        exit;
    }

    if (!isset($_SESSION['ID'])) {
        echo json_encode(['status' => 'error', 'message' => 'why you not logged in???']);
        exit;
    }

    $user_id = $_SESSION['ID'];
    $items = $data['items'];

    try {
        foreach ($items as $item) {
            $name = $item['name'];
            $calories = $item['calories'];
            $protein = $item['protein_g'];
            $carbs = $item['carbohydrates_total_g'];
            $fat = $item['fat_total_g'];

            $sql = "INSERT INTO food (user_id, name, calories, protein, fats, sugar) VALUES (:user_id, :name, :calories, :protein, :fat, :carbs)";
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

        echo json_encode(['status' => 'good']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'error: ' . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') { // ziskani jidel do Calories.jsx
    if (!isset($_SESSION['ID'])) {
        echo json_encode(['status' => 'error', 'message' => 'why you not logged in???']);
        exit;
    }

    $user_id = $_SESSION['ID'];

    try {
        $sql = "SELECT * FROM food WHERE user_id = :user_id";
        $stmt = $db->prepare($sql);
        $stmt->execute([':user_id' => $user_id]);
        $meals = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['status' => 'success', 'meals' => $meals]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'db error']);
    }
}
?>