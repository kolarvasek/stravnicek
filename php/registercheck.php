<?php
include 'db.php';
session_start();

header("Content-Type: application/json");

// Validate email
if (isset($_POST["email"]) && !empty($_POST["email"]) && filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $email = $_POST["email"];
} else {
    echo json_encode(["success" => false, "error" => "Invalid email"]);
    exit;
}

// Validate password
if (isset($_POST["heslo"]) && !empty($_POST["heslo"])) {
    $password = hash('sha256', $_POST["heslo"]); // Hash password
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
