<?php
include('db.php');  // Include the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $orderId = $_POST['order_id'];
    $status = $_POST['status'];  // 'received' or 'delivered'

    // Update order status in the database
    $query = "UPDATE orders SET status = ? WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$status, $orderId]);

    echo json_encode(['status' => 'success']);
}
?>
