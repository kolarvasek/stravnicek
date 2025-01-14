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

// Validace emailu
if (!isset($data["email"]) || empty($data["email"]) || !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

// Validace hesla
if (!isset($data["password"]) || empty($data["password"])) {
    echo json_encode(["success" => false, "error" => "Password is required"]);
    exit;
}

$email = $data["email"];
$password = hash('sha256', $data["password"]); // Hashování hesla

// Vložení do databáze
try {
    $sql = "INSERT INTO users (email, password, time) VALUES (:email, :password, NOW())";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ":email" => $email,
        ":password" => $password,
    ]);

    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>
