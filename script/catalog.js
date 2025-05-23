const listItems = document.querySelector("#list-items");

function addItem(item) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  listItems.append(colDiv);

  const colCard = document.createElement("div");
  colCard.className = "card shadow-sm";
  colDiv.append(colCard);

  
  const colCardSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  colCardSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  colCardSvg.ariaLabel = "Placeholder: Thumbnail";
  colCardSvg.classList.add("bd-placeholder-img", "card-img-top");
  colCardSvg.style.height = "125px";
  colCardSvg.role = "img";
  colCardSvg.style.width = "100%";
  
  //const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  //colCardSvg.append(svg);
  
  colCardSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
  colCard.append(colCardSvg);
 
  const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleElement.textContent = "Placeholder";
  colCardSvg.insertBefore(titleElement, colCardSvg.firstChild);
  
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "100%"); // width of the rectangle
  rect.setAttribute("height", "100%"); // height of the rectangle
  rect.setAttribute("fill", item.color); // fill color - #55595c
  
  colCardSvg.append(rect);

  const svgNS = "http://www.w3.org/2000/svg"; // Define SVG namespace
  const textElement = document.createElementNS(svgNS, "text"); // Create text element
  textElement.setAttribute("x", "50%"); // Set x coordinate
  textElement.setAttribute("y", "50%"); // Set y coordinate
  textElement.setAttribute("dy", ".3em"); // Set font size (optional)
  textElement.setAttribute("fill", "#eceeef");
  const textNode = document.createTextNode(item.name); // Create text node - "Thumbnail"
  textElement.appendChild(textNode); // Append text node to text element
  colCardSvg.appendChild(textElement); // Append text element to SVG
  
  const colCardBody = document.createElement("div");
  colCardBody.className = "card-body";
  colCard.append(colCardBody);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = item.pantone_value;//"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
  colCardBody.append(cardText);

  const cardDiv = document.createElement("div");
  cardText.className = "d-flex justify-content-between align-items-center";
  colCardBody.append(cardDiv);

  const cardButtonGrp = document.createElement("div");
  cardButtonGrp.className = "btn-group";
  cardDiv.append(cardButtonGrp);

  const cardButton = document.createElement("button");
  cardButton.type = "button";
  cardButton.className = "btn btn-sm btn-outline-secondary";
  cardButton.textContent = "View";
  cardButtonGrp.append(cardButton);

  const cardButton1 = document.createElement("button");
  cardButton1.type = "button";
  cardButton1.className = "btn btn-sm btn-outline-secondary";
  cardButton1.textContent = "Edit";
  cardButtonGrp.append(cardButton1);

  const cardSmall = document.createElement("small");
  cardSmall.className = "text-body-secondary";
  cardSmall.textContent = "9 mins"
  cardDiv.append(cardSmall);
  
}

// 1. Implement the function fetchColorsList() using the browser Fetch API to download the full color list from the following endpoint:
// https://reqres.in/api/unknown

async function fetchColorsList() {

    // method A: using a fetch request (with methods to address promises, e.g. resolve or reject)
    // ---------------------------------------------------------------------------------------------
    
    let resp = null;

    fetch('https://reqres.in/api/unknown')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {                             // promise.resolve returned
            console.log(response);                  // log all the response's results
            resp = response;
    })
    .catch(error => {
        console.error('Error:', error)
        return;     
    }); // catch a promise.reject
    // -------------------------------------------------------------------------------------

    // method B: Using a fetch request (WITHOUT addressing promises returned from the api)
    // --------------------------------------------------------------------------------------

    // Using fetch, call for the 1st page of Data from the given url
    // const response = await fetch("https://reqres.in/api/unknown");
    // resp = await response.json();
    // console.log(resp);   // check the data that is returned
    // -----------------------------------------------------------------------------------

    let allColors = resp.data;
    let page = resp.page + 1;
    let totalPages = resp.total_pages;

    // Fetch the subsequent page(s) of Data (using a For Loop)
    
    for (let currentPage = page; currentPage <= totalPages; currentPage++) {
        /* --------method A  -------------*/
        //const response = await fetch("https://reqres.in/api/unknown?page=" + currentPage);
        //const resp = await response.json();        
        /* ------------------------------*/

        /* --------method B  -------------*/
        fetch('https://reqres.in/api/unknown' + currentPage)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {                             // promise.resolve returned
                console.log(response);                  // log all the response's results
                resp = response;
        })
        .catch(error => {
            console.error('Error:', error)
            return;     
        }); // catch a promise.reject
        /* ------------------------------*/

        allColors = [...allColors, ...resp.data];
        console.log(allColors);

    }
    
    // Clear listItems first
    listItems.innerHTML = "";

    // Create an array to store the color list to localStorage
    const arrColors = new Array();

    // Loop through each array index to be passed to addItem(item) function for display
    // Also, convert each JSON object item into a string for storage into arrColors
    allColors.forEach(item => {
        addItem(item);
        arrColors.push(item);
    });

    // Store the array data arrColors into the browser window's localStorage 
    window.localStorage.setItem("list-items", JSON.stringify(arrColors));
}

// 2.  Implement the loadColorsFromStorage() function so the colour values are loaded from the local storage. 
//     Open the developer tools and verify that the data is stored in the local storage.

function loadColorsFromStorage() {
    
    // Retrive the values stored in list-items from localstorage
    const arrColors = window.localStorage.getItem("list-items");

    // parse the values into Objects (JSON.parse())
    const parsedColors = JSON.parse(arrColors);

    // iterate and populate the HTML page by calling addItem()
    parsedColors.forEach(item => {
        addItem(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchColorsList();
    loadColorsFromStorage();
  })