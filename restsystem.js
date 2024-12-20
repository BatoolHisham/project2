// Elements
const addDishForm = document.getElementById('addNewItemForm');
const headerProfilePic = document.getElementById('header-profile-image');

// Define categories for each restaurant
const restaurantCategories = {
    'IT Milkbar': ['Drinks', 'Sweets', 'Sandwiches'],
    'Medicine Milkbar': ['Drinks', 'Sweets', 'Sandwiches'],
    'Main Snackway': ['Pizza', 'Manakeesh', 'Sandwiches', 'Snacks', 'Burger', 'Shawarma'],
    'Student Snackway': ['Pizza', 'Manakeesh', 'Sandwiches', 'Snacks', 'Burger', 'Shawarma'],
    'Business Saj': ['Pizza', 'Manakeesh', 'Sandwiches', 'Burger'],
    'Agriculture Saj': ['Pizza', 'Manakeesh', 'Sandwiches', 'Burger']
};

// Load profile image from localStorage on page load
window.onload = function () {
    loadProfileImage();
    const activeSection = localStorage.getItem('activeSection') || 'addNewItem';
    showSection(activeSection);
    loadMenuItems(); // Load menu items on page load
};

// Load profile image
function loadProfileImage() {
    const storedImage = localStorage.getItem('profileImage') || './images/profile logo.png';
    headerProfilePic.src = storedImage;
}

// Handle form submission to add a new dish
addDishForm.addEventListener('submit', submitAddNewItemForm);

function submitAddNewItemForm(event) {
    event.preventDefault();

    const dishName = document.getElementById('dishName').value;
    const dishPrice = document.getElementById('dishPrice').value;
    const dishImage = document.getElementById('dishImage').files[0];
    const selectedRestaurant = document.getElementById('selectedRestaurant').textContent;
    const selectedCategory = document.getElementById('selectedCategory').textContent;

    if (!selectedRestaurant || !selectedCategory || selectedRestaurant === 'Select Restaurant' || selectedCategory === 'Select Category') {
        alert('Please select a restaurant and category!');
        return;
    }

    if (dishImage) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dish = {
                name: dishName,
                price: dishPrice,
                image: event.target.result, // Base64 image data
                restaurant: selectedRestaurant,
                category: selectedCategory
            };

            saveDishToLocalStorage(dish);
            alert("New dish added successfully!");

            // Reset form
            document.getElementById('addNewItemForm').reset();
            document.getElementById('selectedRestaurant').textContent = 'Select Restaurant';
            document.getElementById('selectedCategory').textContent = 'Select Category';
        };
        reader.readAsDataURL(dishImage);
    }
}

function saveDishToLocalStorage(dish) {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    menuItems.push(dish);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    loadMenuItems(); // Reload menu items to reflect changes
}

// Show the corresponding section and persist it
function showSection(sectionId) {
    const sections = document.querySelectorAll('.collapse');
    sections.forEach(section => section.classList.remove('show'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('show');
        localStorage.setItem('activeSection', sectionId); // Save active section
    }
}

// Set the selected restaurant value
function setRestaurant(restaurant) {
    document.getElementById('selectedRestaurant').textContent = restaurant;
    document.getElementById('selectedRestaurantValue').value = restaurant; // Store the restaurant
    updateCategoryDropdown(restaurant); // Update categories based on the selected restaurant
}

// Set the selected category value
function setCategory(category) {
    document.getElementById('selectedCategory').textContent = category;
    document.getElementById('selectedCategoryValue').value = category; // Store the category
}

// Update the category dropdown based on the selected restaurant
function updateCategoryDropdown(restaurant) {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = ''; // Clear existing categories

    const categories = restaurantCategories[restaurant] || [];
    
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `<a class="dropdown-item" href="#" onclick="setCategory('${category}')">${category}</a>`;
        categoryList.appendChild(categoryItem);
    });

    // Reset the selected category
    document.getElementById('selectedCategory').textContent = 'Select Category';
    document.getElementById('selectedCategoryValue').value = '';  // Reset the hidden input
}

// Function to load menu items into the correct category sections
function loadMenuItems() {
    const sections = document.querySelectorAll('.menusSYS');

    sections.forEach(section => {
        const categoryId = section.id.replace('-items-container', ''); // Get category name from section id (e.g., 'Sandwiches', 'Drinks')
        const categoryContainer = document.getElementById(`${categoryId}-items`);
        categoryContainer.innerHTML = ''; // Clear existing items

        menuItems.filter(item => item.category === categoryId).forEach(dish => {
            const dishCard = createDishCard(dish); // Create dish card for each item
            categoryContainer.appendChild(dishCard); // Append dish card to the container
        });
    });
}

// Function to create dish card elements
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'col-md-3'; // Adjust the size if needed

    card.innerHTML = `
        <div class="card" style="width: 15rem;">
            <img src="${dish.image || 'default-image.jpg'}" 
                 class="card-img-top img-fluid dish-image ${dish.status === 'out-of-stock' ? 'blurred' : ''}" 
                 alt="${dish.name}">
            <span class="padding-top changing-color d-flex justify-content-between">
                <p class="card-text">${dish.name}</p>
                <span class="dish-price">${dish.price || '0.00'} JD</span>
            </span>
            <div class="d-grid gap-2">
                <!-- Toggle Stock -->
                <button class="btn ${dish.status === 'in-stock' ? 'btn-success' : 'btn-secondary'}"
                    onclick="toggleStockStatus(this, '${dish.name}', this.closest('.card').querySelector('.dish-image'))">
                    ${dish.status === 'in-stock' ? 'Mark as Out of Stock' : 'Mark as In Stock'}
                </button>
                <!-- Change Image -->
                <button class="btn btn-primary"
                    onclick="changeDishImage('${dish.name}', this.closest('.card').querySelector('.dish-image'))">
                    Change Image
                </button>
                <!-- Change Price -->
                <button class="btn btn-warning text-dark"
                    onclick="changeDishPrice('${dish.name}', this.closest('.card').querySelector('.dish-price'))">
                    Change Price
                </button>
                <!-- Delete Dish -->
                <button class="btn btn-danger"
                    onclick="confirmDelete(this.closest('.card'), '${dish.name}')">
                    Delete
                </button>
            </div>
        </div>
    `;
    return card;
}
