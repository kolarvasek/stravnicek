<?php
include 'db.php'; // Zajistěte, že db.php neobsahuje žádný výstup
session_start();

// Hlavičky pro CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Odpověď na preflight OPTIONS požadavky
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Zpracování požadavku
header("Content-Type: application/json");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (isset($data["email"]) && !empty($data["email"]) && filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $email = $data["email"];
} else {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

if (isset($data["password"]) && !empty($data["password"])) {
    $password = password_hash($data["password"], PASSWORD_BCRYPT); 
} else {
    echo json_encode(["success" => false, "error" => "Password is required"]);
    exit;
}

try {
    $sql = "INSERT INTO users (email, password, time) VALUES (:email, :password, NOW())";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ":email" => $email,
        ":password" => $password,
    ]);

    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "db error"]);
}

?>