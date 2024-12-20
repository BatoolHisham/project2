<?php
include('db.php');  // Include the database connection

// Query to get all orders
$query = "SELECT * FROM orders";
$stmt = $pdo->prepare($query);
$stmt->execute();

// Fetch all orders
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the orders as a JSON response
echo json_encode(['orders' => $orders]);
?>
