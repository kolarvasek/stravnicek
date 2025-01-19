<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://kolarva23.sps-prosek.cz");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data["email"]) || empty($data["email"]) || !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

if (!isset($data["password"]) || empty($data["password"])) {
    echo json_encode(["success" => false, "error" => "pass is required"]);
    exit;
}

$email = $data["email"];
$password = $data["password"];

try {
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(["email" => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION["ID"] = $user['ID'];
        echo json_encode(["success" => true, "message" => "login successful"]);
    } else {
        echo json_encode(["success" => false, "error" => "wrong email or pass"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "db error"]);
}
?>