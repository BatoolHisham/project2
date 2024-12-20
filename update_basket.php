<?php
include('db.php'); // Include database connection

// Get input data
$input = json_decode(file_get_contents('php://input'), true);
$itemId = $input['itemId'];
$quantity = $input['quantity'];

// Update the quantity
$query = "UPDATE basket SET quantity = ? WHERE menu_item_id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$quantity, $itemId]);

// Fetch updated basket items
$query = "SELECT b.menu_item_id AS id, m.name, m.price, b.quantity, m.image 
          FROM basket b 
          JOIN menu_items m ON b.menu_item_id = m.id";
$stmt = $pdo->query($query);
$basketItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'basketItems' => $basketItems]);
?>
