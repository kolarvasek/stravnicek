<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://kolarva23.sps-prosek.cz");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_destroy();
echo json_encode(['status' => 'success']);
?>