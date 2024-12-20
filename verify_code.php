<?php
session_start();
include('db.php');  // Include the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputCode = $_POST['verificationCode'];  // Get the verification code from the form

    // Check if the entered code matches the session code
    if ($inputCode == $_SESSION['verificationCode']) {
        // Redirect to the page where the user can reset their password
        header('Location: reset_password_page.html');
        exit();
    } else {
        echo "Invalid verification code!";
    }
}
?>
