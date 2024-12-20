<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data and sanitize it
    $phone = trim($_POST['phone']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirmPassword']);
    $restaurant_id = $_POST['restaurantSelection'];

    if ($password !== $confirmPassword) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit();
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Check if phone exists
    $query = "SELECT * FROM rest_users WHERE phone = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$phone]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Phone number already registered']);
        exit();
    }

    // Insert user data into the database
    $query = "INSERT INTO rest_users (phone, password, restaurant_id) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$phone, $hashedPassword, $restaurant_id]);

    echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
}
?>
