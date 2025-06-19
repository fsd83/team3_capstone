// Fix: Use the correct ID that matches your HTML
const listItems = document.querySelector("#list-items");

function addItem(item) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  listItems.append(colDiv);

  const colCard = document.createElement("div");
  colCard.className = "card";
  colDiv.append(colCard);

  // const colCardSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  colCardSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  colCardSvg.ariaLabel = "Placeholder: Thumbnail";
  colCardSvg.classList.add("bd-placeholder-img", "card-img-top");
  colCardSvg.style.height = "125px";
  colCardSvg.role = "img";
  colCardSvg.style.width = "100%";
   
  const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleElement.textContent = "Placeholder";
  colCardSvg.insertBefore(titleElement, colCardSvg.firstChild);
  // colCardSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  // colCardSvg.ariaLabel = "Placeholder: Thumbnail";
  // colCardSvg.classList.add("bd-placeholder-img", "card-img-top");
  // colCardSvg.style.height = "125px";
  // colCardSvg.role = "img";
  // colCardSvg.style.width = "100%";
  
  //const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  //colCardSvg.append(svg);
  
  // colCardSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  // colCard.append(colCardSvg);
 
  // const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  // titleElement.textContent = "Placeholder";
  // colCardSvg.insertBefore(titleElement, colCardSvg.firstChild);
  
  // const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  // rect.setAttribute("width", "100%"); // width of the rectangle
  // rect.setAttribute("height", "100%"); // height of the rectangle
  // rect.setAttribute("fill", "blue"); // fill color - #55595c
  
  // colCardSvg.append(rect);

  // const svgNS = "http://www.w3.org/2000/svg"; // Define SVG namespace
  // const textElement = document.createElementNS(svgNS, "text"); // Create text element
  // textElement.setAttribute("x", "50%"); // Set x coordinate
  // textElement.setAttribute("y", "50%"); // Set y coordinate
  // textElement.setAttribute("dy", ".3em"); // Set font size (optional)
  // textElement.setAttribute("fill", "#eceeef");
  // const textNode = document.createTextNode(item.name); // Create text node - "Thumbnail"
  // textElement.appendChild(textNode); // Append text node to text element
  // colCardSvg.appendChild(textElement); // Append text element to SVG
  
  // Create img tag
  const img = document.createElement('img');
  img.src = _ENDPOINT_ROOT.concat(item.imagePath);
  // Fix: Add classes separately
  // img.classList.add("card-img-top");
  img.classList.add("card-thumbnail");
  img.height = 300;
  img.alt = "Product image";

  colCard.append(img);
  
  img.style.cursor = 'pointer';
  img.addEventListener("click", () => {
    window.location.href = `itemdetail.html?id=${item.id}`;
  });

  const colCardBody = document.createElement("div");
  colCardBody.className = "card-body";
  colCard.append(colCardBody);

  const cardText = document.createElement("p");
  cardText.className = "card-text";

  cardText.textContent = item.description;//"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";

  const cardButton = document.createElement("button");
  cardButton.classList.add("btn", "btn-primary", "m-4");
  cardButton.textContent = "See Details";
  colCard.append(cardButton);

  cardButton.addEventListener("click", () => {
    window.location.href = `itemdetail.html?id=${item.id}`;
  });

  colCardBody.append(cardText);
}

// Sample product data
const listOfItemObjects1 = [
  
  {
    imgSrc: "img_products/Appliances/cornell_wet_dry.jpg",
    desc: "Moving house, letting go of this 2 years portable wet and dry vacuum in working condition"
     
  },

  {
    imgSrc: "img_products/Appliances/miele_vacuum.jpg",
    desc: "Just bought a new robotic vacuum, any taker for this vacuum. Low usage and still under warranty.",
    url:_ITEMDETAIL_URL 
  },
  
  {
    imgSrc: "img_products/Appliances/Fan two.jpg",
    desc: "Bladeless fan, still in working condition 30/100. Ping me if interested."    
  }

];



// function loadData() {
//   // Clear existing items first
//   if (listItems) {
//     listItems.innerHTML = "";
    
//     // Load and display items
//     listOfItemObjects1.forEach(item => {
//       addItem(item);
//     });
    
//     console.log("Catalog items loaded successfully!");
//   } else {
//     console.error("Could not find #list-items container");
//   }
// } // Fix: Added missing closing brace

// Colors API functions (if needed later)
// async function fetchColorsList() {
//   try {
//     const response = await fetch('https://localhost8080/api/unknown');
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const resp = await response.json();
//     console.log(resp);
    
//     let allColors = resp.data;
//     const totalPages = resp.total_pages;

//     // Fetch subsequent pages
//     for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
//       const pageResponse = await fetch(`https://reqres.in/api/unknown?page=${currentPage}`);
//       if (!pageResponse.ok) {
//         throw new Error(`HTTP error! status: ${pageResponse.status}`);
//       }
      
//       const pageData = await pageResponse.json();
//       allColors = [...allColors, ...pageData.data];
//     }
    
//     // Clear existing items
//     if (listItems) {
//       listItems.innerHTML = "";
//     }

//     // Transform and display colors as items
//     allColors.forEach(item => {
//       const colorItem = {
//         imgSrc: `https://via.placeholder.com/300x200/${item.color.substring(1)}/ffffff?text=${item.name}`,
//         desc: `${item.name} - ${item.color} (Pantone ${item.pantone_value})`
//       };
//       addItem(colorItem);
//     });

//     // Store in localStorage (Note: not supported in all environments)
//     try {
//       window.localStorage.setItem("list-items", JSON.stringify(allColors));
//     } catch (e) {
//       console.log("localStorage not available");
//     }
    
//   } catch (error) {
//     console.error('Error fetching colors:', error);
//   }
// }

// function loadColorsFromStorage() {
//   try {
//     const arrColors = window.localStorage.getItem("list-items");
//     if (arrColors) {
//       const parsedColors = JSON.parse(arrColors);
      
//       // Clear existing items
//       if (listItems) {
//         listItems.innerHTML = "";
//       }
      
//       // Display stored colors
//       parsedColors.forEach(item => {
//         const colorItem = {
//           imgSrc: `https://via.placeholder.com/300x200/${item.color.substring(1)}/ffffff?text=${item.name}`,
//           desc: `${item.name} - ${item.color} (Pantone ${item.pantone_value})`
//         };
//         addItem(colorItem);
//       });
//     } else {
//       console.log("No items found in localStorage");
//     }
//   } catch (error) {
//     console.error('Error loading from storage:', error);
//   }
// }

// Profile editing functions
// function btnFunction() {
//   // Enable buttons
//   const sButton = document.getElementById("sButton");
//   const rButton = document.getElementById("rButton");
  
//   if (sButton) sButton.disabled = false;
//   if (rButton) rButton.disabled = false;

//   // Enable input fields
//   const inputElement = document.getElementById('userName');
//   const inputElement1 = document.getElementById('email');
//   const inputElement2 = document.getElementById('password');
  
//   if (inputElement) inputElement.removeAttribute('readonly');
//   if (inputElement1) inputElement1.removeAttribute('readonly');
//   if (inputElement2) inputElement2.removeAttribute('readonly');
// }

// function sBtnFunction() {
//   // Get input field values
//   const inputElement = document.getElementById('userName');
//   const inputElement1 = document.getElementById('email');
  
//   if (inputElement && inputElement1) {
//     const userNameValue = inputElement.value;
//     const emailValue = inputElement1.value;

//     // Update display elements
//     const userNameDisplay = document.getElementById("userNameDisplay");
//     const userEmailDisplay = document.getElementById("userEmailDisplay");
    
//     if (userNameDisplay) userNameDisplay.textContent = userNameValue;
//     if (userEmailDisplay) userEmailDisplay.textContent = emailValue;
//   }
// }


async function catalogLoadData() {
    
  const urlParams = new URLSearchParams(window.location.search);
  const param1Value = urlParams.get('param1');
            
  //Add for h1 text
    const h1Text = document.getElementById("h1-catalog");
    if(param1Value === "APPLIANCES") {
      h1Text.textContent = "Appliance";  
    }
    else if(param1Value === "FASHION") {
      h1Text.textContent = "Fashion";  
    } 
    else {
      h1Text.textContent = "Others";  
    }
  // Clear listItems first
    listItems.innerHTML = "";
    //indexlistDonate.innerHTML = "";
    //indexlistRequest.innerHTML = "";
    // indexlistItems3.innerHTML = "";

    
    // Retrive the values stored in list-items from localstorage
    //const arrColors = window.localStorage.getItem("list-items");

    // parse the values into Objects (JSON.parse())
    //const parsedColors = JSON.parse(arrColors);

    // iterate and populate the HTML page by calling addItem()
    // listOfItemObjects1.forEach(item => {
    //     addItem(item,0);
    // });

    // listOfItemObjects2.forEach(item => {
    //     addItem(item,1);
    // });

    // listOfItemObjects3.forEach(item => {
    //     addItem(item,2);
    // });

    //Update username and email
    const token = isAuthenticated();
    const user = decodeUser(token);

    //Read from database to obtain product list
    //getProductData(token);
    try {
        //const user = decodeUser(token);
        //const decodedToken = jwt_decode(token);
        // Assuming the ID is in a claim called 'sub', 'userId', or 'id'
        //const userId = decodedToken.sub || decodedToken.userId || decodedToken.id;
        //alert("UserID:" + userId);
        //const url = _ENDPOINT_GET_PRODUCT_BY_CUSTOMER + "1";
        const response = await fetch(_ENDPOINT_GET_ALL_PRODUCTS, {  // !! DONE: API call for update profile
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
            "Content-Type": "application/json"
        }
        //,body: JSON.stringify(formData)
        })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data[0].name); // Access members from the parsed JSON data
            console.log(data[1].name);
            
            let filteredArray = data.filter(item => item.productType == param1Value);
            console.log(filteredArray);
            // iterate and populate the HTML page by calling addItem()
            filteredArray.forEach(item => {
                 addItem(item);
             });
            
            })
        .catch(error => {
            console.error('Error fetching data:', error);
            });

        
    }catch(e){
        alert(e);
    }

}


document.addEventListener("DOMContentLoaded", () => {
    //fetchColorsList();
    //loadColorsFromStorage();
    catalogLoadData();
  })

// Fix: Move event listener outside of any function
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM loaded, initializing catalog...");
  
//   // Choose which function to run:
//   loadData();              // For local product data
//   // fetchColorsList();    // For API color data
//   // loadColorsFromStorage(); // For stored color data
// });

