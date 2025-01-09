<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["email"]) && !empty($data["email"]) && filter_var($data["email"], FILTER_VALIDATE_EMAIL)){
    $email = $data["email"];
} else {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

if(isset($data["password"]) && !empty($data["password"])){
    $password = $data["password"];
} else {
    echo json_encode(["success" => false, "error" => "Password is required"]);
    exit;
}

try {
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ":email" => $email,
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user) {
        if(password_verify($password, $user['password'])){
            $_SESSION["ID"] = $user['ID']; 
            echo json_encode(["success" => true, "message" => "User logged in successfully"]);
            header("Location: /"); // Z NEJAKEHO DUVODU NEFUNGUJE
        } else {
            echo json_encode(["success" => false, "error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>