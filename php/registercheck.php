<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate email
if (isset($data["email"]) && !empty($data["email"]) && filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $email = $data["email"];
} else {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

// Validate password
if (isset($data["password"]) && !empty($data["password"])) {
    $password = hash('sha256', $data["password"]); // Hash password
} else {
    echo json_encode(["success" => false, "error" => "Password is required"]);
    exit;
}

// Insert into database
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
