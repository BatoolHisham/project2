<?php
session_start();
include('db.php');  // Include the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $phone = $_POST['resetPhone'];  // Get phone number from form
    
    // Check if the phone number exists in the database
    $query = "SELECT id, phone FROM rest_users WHERE phone = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$phone]);
    $user = $stmt->fetch();

    if ($user) {
        // Generate a verification code (you could use a random number or code generation logic)
        $verificationCode = rand(100000, 999999);

        // Store the verification code in session or send it directly to the user
        $_SESSION['verificationCode'] = $verificationCode;
        $_SESSION['resetPhone'] = $phone;

        // Send verification code (SMS or Email)
        // For example, use an SMS API or mail() function to send the code to the user's phone or email
        // You can integrate services like Twilio for SMS or PHPMailer for email.
        
        // Simulate sending an SMS or email (For now just an echo statement):
        echo "Verification code sent: " . $verificationCode;

        // Redirect user to the verification page (where they can input the code)
        header("Location: verify_code.html");
        exit();
    } else {
        echo "Phone number not found!";
    }
}
?>
