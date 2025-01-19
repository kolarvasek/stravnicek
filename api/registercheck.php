<?php
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://kolarva23.sps-prosek.cz");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["email"]) || !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "invalid email"]);
    exit;
}

if (empty($data["password"]) || strlen($data["password"]) < 6) {
    echo json_encode(["success" => false, "error" => "password must be at least 6 characters"]);
    exit;
}

try {
    $email = filter_var($data["email"], FILTER_SANITIZE_EMAIL);
    $password = password_hash($data["password"], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (email, password, time) VALUES (:email, :password, NOW())";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ":email" => $email,
        ":password" => $password
    ]);

    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') { // duplicate email
        echo json_encode(["success" => false, "error" => "email is already used"]);
    } else {
        echo json_encode(["success" => false, "error" => "db error"]);
    }
}
?>
