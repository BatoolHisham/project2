<?php
include('db.php'); // Include database connection

// Fetch basket items for the user (replace with user ID logic if needed)
$query = "SELECT b.menu_item_id AS id, m.name, m.price, b.quantity, m.image 
          FROM basket b 
          JOIN menu_items m ON b.menu_item_id = m.id";
$stmt = $pdo->query($query);
$basketItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'basketItems' => $basketItems]);
?>
