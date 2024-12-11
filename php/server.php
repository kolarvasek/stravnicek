
<?php
    header('Access-Control-Allow-Origin: http://localhost:8000');
    $user = $_POST['name'];
    echo ("Hello from server: $user");
?>