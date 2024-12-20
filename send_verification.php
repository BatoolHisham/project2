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

        // Store the verification code in session
        $_SESSION['verificationCode'] = $verificationCode;
        $_SESSION['resetPhone'] = $phone;

        // Send verification code (simulate sending it via SMS or email)
        // For example, using Twilio or PHP mail function here.
        // Currently simulating with echo:
        echo "Verification code sent: " . $verificationCode;

        // Redirect user to the verification page (where they can input the code)
        header("Location: verify_code.html");  // Change this to your actual file for entering the code
        exit();
    } else {
        echo "Phone number not found!";
    }
}
?>
