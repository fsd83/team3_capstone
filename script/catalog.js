// Fix: Use the correct ID that matches your HTML
const listItems = document.querySelector("#list-items");

function addItem(item) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  listItems.append(colDiv);

  const colCard = document.createElement("div");
  colCard.className = "card";
  colDiv.append(colCard);

  // Create img tag
  const img = document.createElement('img');
  img.src = item.imgSrc;
  // Fix: Add classes separately
  img.classList.add("card-img-top");
  img.classList.add("card-thumbnail");
  img.height = 300;
  img.alt = "Product image";

  colCard.append(img);  

  const colCardBody = document.createElement("div");
  colCardBody.className = "card-body";
  colCard.append(colCardBody);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = item.desc;
  colCardBody.append(cardText);
}

// Sample product data
// const listOfItemObjects1 = [
//   {
//     imgSrc: "img_products/Appliances/cornell_wet_dry.jpg",
//     desc: "Moving house, letting go of this 2 years portable wet and dry vacuum in working condition"
//   },
//   {
//     imgSrc: "img_products/Appliances/miele_vacuum.jpg",
//     desc: "Just bought a new robotic vacuum, any taker for this vacuum. Low usage and still under warranty."
//   },
//   {
//     imgSrc: "img_products/Appliances/Fan two.jpg",
//     desc: "Bladeless fan, still in working condition 30/100. Ping me if interested."    
//   }
// ];

function loadData() {
  // Clear existing items first
  if (listItems) {
    listItems.innerHTML = "";
    
    // Load and display items
    listOfItemObjects1.forEach(item => {
      addItem(item);
    });
    
    console.log("Catalog items loaded successfully!");
  } else {
    console.error("Could not find #list-items container");
  }
} // Fix: Added missing closing brace

// Colors API functions (if needed later)
async function fetchColorsList() {
  try {
    const response = await fetch('https://localhost8080/api/unknown');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const resp = await response.json();
    console.log(resp);
    
    let allColors = resp.data;
    const totalPages = resp.total_pages;

    // Fetch subsequent pages
    for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
      const pageResponse = await fetch(`https://reqres.in/api/unknown?page=${currentPage}`);
      if (!pageResponse.ok) {
        throw new Error(`HTTP error! status: ${pageResponse.status}`);
      }
      
      const pageData = await pageResponse.json();
      allColors = [...allColors, ...pageData.data];
    }
    
    // Clear existing items
    if (listItems) {
      listItems.innerHTML = "";
    }

    // Transform and display colors as items
    allColors.forEach(item => {
      const colorItem = {
        imgSrc: `https://via.placeholder.com/300x200/${item.color.substring(1)}/ffffff?text=${item.name}`,
        desc: `${item.name} - ${item.color} (Pantone ${item.pantone_value})`
      };
      addItem(colorItem);
    });

    // Store in localStorage (Note: not supported in all environments)
    try {
      window.localStorage.setItem("list-items", JSON.stringify(allColors));
    } catch (e) {
      console.log("localStorage not available");
    }
    
  } catch (error) {
    console.error('Error fetching colors:', error);
  }
}

function loadColorsFromStorage() {
  try {
    const arrColors = window.localStorage.getItem("list-items");
    if (arrColors) {
      const parsedColors = JSON.parse(arrColors);
      
      // Clear existing items
      if (listItems) {
        listItems.innerHTML = "";
      }
      
      // Display stored colors
      parsedColors.forEach(item => {
        const colorItem = {
          imgSrc: `https://via.placeholder.com/300x200/${item.color.substring(1)}/ffffff?text=${item.name}`,
          desc: `${item.name} - ${item.color} (Pantone ${item.pantone_value})`
        };
        addItem(colorItem);
      });
    } else {
      console.log("No items found in localStorage");
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
}

// Profile editing functions
function btnFunction() {
  // Enable buttons
  const sButton = document.getElementById("sButton");
  const rButton = document.getElementById("rButton");
  
  if (sButton) sButton.disabled = false;
  if (rButton) rButton.disabled = false;

  // Enable input fields
  const inputElement = document.getElementById('userName');
  const inputElement1 = document.getElementById('email');
  const inputElement2 = document.getElementById('password');
  
  if (inputElement) inputElement.removeAttribute('readonly');
  if (inputElement1) inputElement1.removeAttribute('readonly');
  if (inputElement2) inputElement2.removeAttribute('readonly');
}

function sBtnFunction() {
  // Get input field values
  const inputElement = document.getElementById('userName');
  const inputElement1 = document.getElementById('email');
  
  if (inputElement && inputElement1) {
    const userNameValue = inputElement.value;
    const emailValue = inputElement1.value;

    // Update display elements
    const userNameDisplay = document.getElementById("userNameDisplay");
    const userEmailDisplay = document.getElementById("userEmailDisplay");
    
    if (userNameDisplay) userNameDisplay.textContent = userNameValue;
    if (userEmailDisplay) userEmailDisplay.textContent = emailValue;
  }
}

// Fix: Move event listener outside of any function
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing catalog...");
  
  // Choose which function to run:
  loadData();              // For local product data
  // fetchColorsList();    // For API color data
  // loadColorsFromStorage(); // For stored color data
});