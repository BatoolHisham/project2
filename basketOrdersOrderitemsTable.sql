use judelivery1;
CREATE TABLE basket (
    basket_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,  -- ID of the restaurant
    menu_item_id INT,  -- ID of the menu item
    quantity INT,  -- Quantity of the item in the basket
    price DECIMAL(10, 2),  
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,  -- User's name
    phone_number VARCHAR(20) NOT NULL,  -- User's phone number
    location VARCHAR(255) NOT NULL,  -- User's location
    total_price DECIMAL(10, 2),  -- Total price of the order
    payment_method VARCHAR(50),  -- Payment method (e.g., Cash, Click)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,  -- ID of the order
    menu_item_id INT,  -- ID of the menu item
    quantity INT,  -- Quantity of the item
    price DECIMAL(10, 2),  -- Price of the item
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

