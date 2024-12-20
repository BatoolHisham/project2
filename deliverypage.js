// Fetch orders from the server dynamically
function fetchOrders() {
    fetch('fetch_orders.php')  // PHP file that fetches orders from the database
        .then(response => response.json())
        .then(data => {
            const ordersContainer = document.getElementById("orders");
            ordersContainer.innerHTML = ''; // Clear existing orders

            // Render orders
            data.orders.forEach(order => {
                renderOrder(order);
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Function to render a single order
function renderOrder(order) {
    const ordersContainer = document.getElementById("orders");
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-4";

    const orderDiv = document.createElement("div");
    orderDiv.className = "card";
    orderDiv.id = `order-${order.id}`;

    orderDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Order ID: ${order.id}</h5>
            <p class="card-text"><strong>Name:</strong> ${order.userName}</p>
            <p class="card-text"><strong>Phone:</strong> ${order.phoneNumber}</p>
            <p class="card-text"><strong>Address:</strong> ${order.address}</p>
            <p class="card-text"><strong>Total Price:</strong> ${order.totalPrice}</p>
            <p class="card-text"><strong>Items:</strong> ${order.items}</p>
            <div class="d-flex justify-content-between">
                <button class="btn Custom-secondary m-2" onclick="markAsReceived(${order.id}, this)">Request has been received</button>
                <button class="btn Custom-secondary m-2" onclick="markAsDelivered(${order.id})">Order has been delivered</button>
            </div>
        </div>
    `;

    colDiv.appendChild(orderDiv);
    ordersContainer.appendChild(colDiv);
}

// Mark order as received
function markAsReceived(orderId, button) {
    console.log(`Order ${orderId} received.`);

    // Send the "received" status to the server
    fetch('mark_order_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            order_id: orderId,
            status: 'received'
        })
    })
    .then(response => response.json())
    .then(data => {
        button.textContent = "Received";
        button.disabled = true;
        button.classList.add("btn-success");
        addNotification(orderId, 'received');
    })
    .catch(error => console.error('Error marking order as received:', error));
}

// Mark order as delivered
function markAsDelivered(orderId) {
    console.log(`Order ${orderId} has been delivered.`);

    // Send the "delivered" status to the server
    fetch('mark_order_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            order_id: orderId,
            status: 'delivered'
        })
    })
    .then(response => response.json())
    .then(data => {
        const orderDiv = document.getElementById(`order-${orderId}`);
        if (orderDiv) {
            orderDiv.parentElement.remove(); // Remove the delivered order from the UI
        }
        addNotification(orderId, 'delivered');
    })
    .catch(error => console.error('Error marking order as delivered:', error));
}

// Notification system
const notificationList = document.getElementById("notificationList");
const notificationCount = document.getElementById("notificationCount");
let notifications = [];
const MAX_NOTIFICATIONS = 10;

// Add a new notification
function addNotification(orderId, status) {
    const message = `Order ${orderId} has been ${status === 'received' ? 'received' : 'delivered'}.`;

    // Add notification to the list
    notifications.push(message);

    // Remove oldest notification if limit exceeded
    if (notifications.length > MAX_NOTIFICATIONS) {
        notifications.shift();
        notificationList.removeChild(notificationList.lastChild);
    }

    // Create a new list item for the notification
    const notificationItem = document.createElement("li");
    notificationItem.className = "dropdown-item";
    notificationItem.textContent = message;

    // Add the notification to the dropdown menu
    notificationList.prepend(notificationItem);

    // Update the notification count
    updateNotificationCount();
}

// Update the notification count
function updateNotificationCount() {
    if (notifications.length > 0) {
        notificationCount.textContent = notifications.length;
        notificationCount.classList.remove("d-none");
    } else {
        notificationCount.textContent = 0;
        notificationCount.classList.add("d-none");
    }
}

// Clear all notifications
function clearNotifications() {
    notifications = [];
    notificationList.innerHTML = ""; // Clear the list
    updateNotificationCount();
}

// Initial fetch of orders when the page loads
document.addEventListener("DOMContentLoaded", function() {
    fetchOrders();
});

// Fetch orders periodically every 5 seconds to keep the list updated
setInterval(fetchOrders, 5000);
