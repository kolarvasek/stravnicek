<?php
include 'db.php';
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["email"]) && !empty($data["email"]) && filter_var($data["email"], FILTER_VALIDATE_EMAIL)){
    $email = $data["email"];
} else {
    echo json_encode(["success" => false, "error" => "wroong mail"]);
    exit;
}

if(isset($data["password"]) && !empty($data["password"])){
    $password = $data["password"];
} else {
    echo json_encode(["success" => false, "error" => "password is empty"]);
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
            echo json_encode(["success" => true, "message" => "logged in", "user_id" => $_SESSION["ID"]]);            
        } else {
            echo json_encode(["success" => false, "error" => "wrong pass"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "wroooong email"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "db error"]);
}
?>