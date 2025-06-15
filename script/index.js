// API Configuration
const API_BASE_URL = 'http://localhost:8080'; 

const indexlistItems1 = document.querySelector("#list-items1");
const indexlistItems2 = document.querySelector("#list-items2");
const indexlistItems3 = document.querySelector("#list-items3");

function addItem(item, row) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  if(row==0) {
    indexlistItems1.append(colDiv);
  } else if(row == 1) {
    indexlistItems2.append(colDiv);
  } else {
    indexlistItems3.append(colDiv);
  }

  const colCard = document.createElement("div");
  colCard.className = "card";
  colDiv.append(colCard);

  // Create img tag
  const img = document.createElement('img');
    img.src = item.imgSrc || item.imagePath; // Support both formats
    img.classList.add("card-img-top,card-thumbnail");
    img.height = 300;

  colCard.append(img);  

  const colCardBody = document.createElement("div");
  colCardBody.className = "card-body";
  colCard.append(colCardBody);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = item.desc || item.description; // Support both formats
  colCardBody.append(cardText);
}

// ===== NEW API CALLS YOU CAN ADD =====

// 1. Add a new product
async function addNewProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Product added successfully:', result);
        
        // Refresh the display after adding
        displayProductsByCategory();
        
        return result;
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product');
        return null;
    }
}

// 2. Update an existing product
async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Product updated successfully:', result);
        
        // Refresh the display after updating
        displayProductsByCategory();
        
        return result;
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
        return null;
    }
}

// 3. Delete a product
async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/delete/${productId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Product deleted successfully');
        
        // Refresh the display after deleting
        displayProductsByCategory();
        
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
        return false;
    }
}

// 4. Search products by name or description
async function searchProducts(searchTerm) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/search?q=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const searchResults = await response.json();
        console.log('Search results:', searchResults);
        
        // Display search results
        displaySearchResults(searchResults);
        
        return searchResults;
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
}

// 5. Get products by category
async function getProductsByCategory(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/category/${category}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        console.log(`${category} products:`, products);
        return products;
    } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
        return [];
    }
}

// ===== USER PROFILE API CALLS =====

// 6. Update user profile
async function updateUserProfile(userId, profileData) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Profile updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
        return null;
    }
}

// 7. Get user profile
async function getUserProfile(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userProfile = await response.json();
        console.log('User profile:', userProfile);
        return userProfile;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}

// ===== ENHANCED EXISTING FUNCTIONS =====

// Enhanced profile save function with API call
async function sBtnFunction() {
    // Get text in input fields
    const inputElement = document.getElementById('userName');
    const inputElement1 = document.getElementById('email');
    
    const userNameValue = inputElement.value;
    const emailValue = inputElement1.value;

    // Update display immediately
    document.getElementById("userNameDisplay").textContent = userNameValue;
    document.getElementById("userEmailDisplay").textContent = emailValue;
    
    // Send to backend (assuming user ID 1 for demo)
    const profileData = {
        userName: userNameValue,
        email: emailValue
    };
    
    await updateUserProfile(1, profileData);
}

// Enhanced display function with fallback to sample data
async function displayProductsByCategory() {
    try {
        // Clear containers first
        indexlistItems1.innerHTML = '<div class="col"><p class="text-center">Loading...</p></div>';
        indexlistItems2.innerHTML = '<div class="col"><p class="text-center">Loading...</p></div>';
        indexlistItems3.innerHTML = '<div class="col"><p class="text-center">Loading...</p></div>';
        
        const products = await fetchProducts();
        
        if (products.length === 0) {
            console.log('No products from backend, loading sample data...');
            loadSampleData();
            return;
        }
        
        // Clear containers
        indexlistItems1.innerHTML = "";
        indexlistItems2.innerHTML = "";
        indexlistItems3.innerHTML = "";
        
        // Filter and display products
        const appliances = products.filter(p => p.productType === 'APPLIANCES');
        const fashion = products.filter(p => p.productType === 'FASHION');
        const others = products.filter(p => p.productType === 'OTHERS');
        
        // Display using existing addItem function
        appliances.forEach(item => addItem(item, 0));
        fashion.forEach(item => addItem(item, 1));
        others.forEach(item => addItem(item, 2));
        
    } catch (error) {
        console.error('Backend not available, loading sample data...', error);
        loadSampleData();
    }
}

// ===== EXISTING API FUNCTIONS  =====

// Fetch all products from backend
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/product/all`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        console.log('Products fetched:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Get single product details
async function getProductById(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/product/getInfo/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Handle "View Details" button clicks
async function viewProductDetails(productId) {
    const product = await getProductById(productId);
    if (product) {
        alert(`Product Details:\n\nName: ${product.name}\nDescription: ${product.description}\nCategory: ${product.productType}`);
    } else {
        alert('Product details not available');
    }
}

// ===== USAGE FUNCTIONS =====

// Add a new product (Call this from a form)
function exampleAddProduct() {
    const newProduct = {
        name: "Test Product",
        description: "This is a test product",
        productType: "APPLIANCES",
        imagePath: "path/to/image.jpg"
    };
    
    addNewProduct(newProduct);
}

// Search functionality (Can attach this to a search form)
function handleSearch() {
    const searchInput = document.getElementById('searchInput'); // Assuming you have a search input
    if (searchInput && searchInput.value.trim()) {
        searchProducts(searchInput.value.trim());
    }
}

// ===== SAMPLE DATA =====

const listOfItemObjects1 = [
  {
    imgSrc: "img_products/Appliances//cornell_wet_dry.jpg",
    desc: "Moving house, letting go of this 2 years portable wet and dry vacuum in working conditional"
  },
  {
    imgSrc: "img_products/Appliances/miele_vacuum.jpg",
    desc: "Just bought a new robotic vacuum, any taker for this vacuum. Low usage and still under warranty."
  },
  {
    imgSrc: "img_products/Appliances/Fan two.jpg",
    desc: "Bladeless fan, still in working condition 30/100. Ping me if interested."    
  }
];

const listOfItemObjects2 = [
  {
    imgSrc: "img_products/Fashion/5_cotton_on_crop_tops_camisole.jpg",
    desc: "Giving away cotton crop tops, seldom used, condition still good."
  },
  {
    imgSrc: "img_products/Fashion/all_for_100_bulk.jpg",
    desc: "Wardrobe overhaul, any takers of these bulk of crop tops and T-shirt?"
  },
  {
    imgSrc: "img_products/Fashion/18mm_dark_brown_watch_strap.jpg",
    desc: "18mm dark brow watch strap, bought wrong size of the watch strap online."    
  }
];

const listOfItemObjects3 = [
  {
    imgSrc: "img_products/Others/clearance_sale_small_plastic_j_1746174011_0061e01a_progressive.jpg",
    desc: "Brand new plastic container with airtight lid, 24 pieces. Good for nuts and cookies storage."
  },
  {
    imgSrc: "img_products/Others/wok_covers.jpg",
    desc: "Wok covers with stainless steel comes in various sizes, still in good condition."
  },
  {
    imgSrc: "img_products/Others/red_packet_hong_bao_ang_pao_1747550921_8093fc8e_progressive.jpg",
    desc: "Any Ang Bao collectors here? Keen in this Ang Bao packer set collection? PM me."    
  }
];

// Load sample data (original loadData function)
function loadSampleData() {
    console.log('Loading sample data...');
    
    // Clear listItems first
    indexlistItems1.innerHTML = "";
    indexlistItems2.innerHTML = "";
    indexlistItems3.innerHTML = "";

    // Load your original sample data
    listOfItemObjects1.forEach(item => {
        addItem(item, 0);
    });

    listOfItemObjects2.forEach(item => {
        addItem(item, 1);
    });

    listOfItemObjects3.forEach(item => {
        addItem(item, 2);
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading products from backend...');
    displayProductsByCategory();
    
    // Load user profile if needed
    // getUserProfile(1); // Assuming user ID 1
});

// ===== MANUAL TOGGLE FUNCTIONS =====

// Function to manually load backend data
function loadBackendData() {
    console.log('Manually loading backend data...');
    displayProductsByCategory();
}

// ===== EXISTING FUNCTIONS =====

function btnFunction() {
    document.getElementById("sButton").disabled = false;
    document.getElementById("rButton").disabled = false;
    
    const inputElement = document.getElementById('userName');
    const inputElement1 = document.getElementById('email');
    const inputElement2 = document.getElementById('password');
    
    inputElement.removeAttribute('readonly'); 
    inputElement1.removeAttribute('readonly'); 
    inputElement2.removeAttribute('readonly'); 
}