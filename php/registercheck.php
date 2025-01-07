<?php
include 'db.php';
session_start();

header("Content-Type: application/json");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$items = $data['items'];
echo json_encode($items);   


// Validate email
if (isset($items["email"]) && !empty($items["email"]) && filter_var($items["email"], FILTER_VALIDATE_EMAIL)) {
    $email = $items["email"];
} else {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

// Validate password
if (isset($items["heslo"]) && !empty($items["heslo"])) {
    $password = hash('sha256', $items["heslo"]); // Hash password
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
