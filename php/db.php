<?php
define('DB_NAME', 'kolarva23');
define('DB_USER', 'kolarva23');
define('DB_PASSWORD', 'XqZqPfHV');
define('DB_HOST', '127.0.0.1');

try {
    $db = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD,
        array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        )
    );
    echo "Database connection successful.";
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
