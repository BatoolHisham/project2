// Function to add item to basket
function addToBasket(item) {
    // Fetch existing basket or initialize an empty array
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    // Check if the item already exists in the basket
    const existingItem = basket.find(b => b.id === item.id);

    if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += 1;
    } else {
        // If the item is new, set its initial quantity to 1 and add it to the basket
        item.quantity = 1;
        basket.push(item);
    }

    // Save the updated basket back to localStorage
    localStorage.setItem("basket", JSON.stringify(basket));

    // Show a confirmation alert
    alert(`${item.name} has been added to your basket!`);
}

// Function to handle the order placement
document.getElementById("place-order-btn").addEventListener("click", function () {
    // Get user data
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const paymentMethod = document.getElementById("payment-method").value;
    const basketItems = JSON.parse(localStorage.getItem("basket")) || [];

    // Check if all required fields are filled
    if (!name || !phone || !location || !paymentMethod) {
        alert("Please fill out all fields.");
        return;
    }

    // Calculate total price based on basket items
    const totalPrice = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Prepare data to send to the server
    const data = {
        name: name,
        phone: phone,
        location: location,
        total_price: totalPrice,
        payment_method: paymentMethod,
        basket_items: JSON.stringify(basketItems) // Pass basket items as JSON
    };

    // Send data to PHP script
    fetch("place_order.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Order placed successfully! Order ID: " + data.order_id);
            localStorage.removeItem("basket"); // Clear the basket after order is placed
            window.location.href = "index.html"; // Redirect to home or a confirmation page
        } else {
            alert("Failed to place order.");
        }
    })
    .catch(error => console.error("Error:", error));
});
