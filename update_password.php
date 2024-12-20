<?php
session_start();
include('db.php');  // Include the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newPassword = $_POST['newPassword'];
    $confirmPassword = $_POST['confirmPassword'];

    // Check if both passwords match
    if ($newPassword === $confirmPassword) {
        // Hash the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        
        // Update the password in the database
        $query = "UPDATE rest_users SET password = ? WHERE phone = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$hashedPassword, $_SESSION['resetPhone']]);
        
        // Clear the session variables
        unset($_SESSION['verificationCode']);
        unset($_SESSION['resetPhone']);
        
        // Redirect to login page
        header('Location: login.html');
        exit();
    } else {
        echo "Passwords do not match!";
    }
}
?>
