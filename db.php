<?php
$host = 'localhost';
$dbname = 'judelivery1';
$username = 'root';
$password = '0000';
$charset = 'utf8mb4';


try {
    $pdo = new PDO('mysql:host=localhost;dbname=judelivery1', 'username', 'password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
