<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Start the session to store user data
session_start();
include('db.php'); // Include database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Trim any unwanted spaces from the input values
    $phone = trim($_POST['phone']);
    $password = trim($_POST['password']);

    // Query to fetch user data by phone
    $query = "SELECT id, password, restaurant_id FROM rest_users WHERE phone = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // If login is successful, set the session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['restaurant_id'] = $user['restaurant_id'];

        // Redirect the user to the restaurant menu page (or a dashboard if needed)
        header('Location: restsystem.html');
        exit();
    } else {
        // Debug: Show detailed error message
        echo "Invalid phone or password!<br>";
        
    }
}
?>
