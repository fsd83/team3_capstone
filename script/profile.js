const indexlistDonate = document.querySelector("#donationList");
const indexlistRequest = document.querySelector("#requestList");


<<<<<<< HEAD
=======
async function handleClickDonate(item){
  //console.log('Button clicked!');

  let action = prompt("Donation: Delete or Complete?", "Complete");
  if (action === "Delete") {
    item.status = "ABORTED";
  } else if(action === "Complete") {
    item.status = "COMPLETED";
  }       
  //Update username and email
  const token = isAuthenticated();
  const user = decodeUser(token);

  try {
    
    const transactionId = item.id;
    const url = _ENDPOINT_UPDATE_TRANSACTION_BY_ID + transactionId;
    const formData = {transactType: item.transactType, status: item.status };
    const response = await fetch(url, { 
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,  // !! Send the bearer token to allow server-side authentication
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
    
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

  }catch(e){
      alert(e);
  }
}

async function handleClickRequest(item){
  //console.log('Button clicked!');

  if (confirm("Confirm delete request?") == true) {
    //Update username and email
    item.status = "ABORTED";
    const token = isAuthenticated();
    const user = decodeUser(token);

    try {
      
      const transactionId = item.id;
      const url = _ENDPOINT_UPDATE_TRANSACTION_BY_ID + transactionId;
      const formData = {transactType: item.transactType, status: item.status };
      const response = await fetch(url, { 
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${token}`,  // !! Send the bearer token to allow server-side authentication
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

    }catch(e){
        alert(e);
    }
    
  } 
 
}

>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4
function addItem(item, row) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  if(row==0) {
    indexlistDonate.append(colDiv);
  } else if(row == 1) {
    indexlistRequest.append(colDiv);
  } 
  // else {
  //   indexlistItems3.append(colDiv);
  // }

  const colCard = document.createElement("div");
  //colCard.className = "pcard";
  colCard.classList.add('pcard', 'col-md-3', 'text-center');
  colDiv.append(colCard);

  // Create img tag
  const img = document.createElement('img');
<<<<<<< HEAD
    img.src = item.imgSrc;
    img.classList.add("img-fluid,rounded");
    //img.width = 500;
    img.height = 300;
    img.alt = 'Donation';
=======
    img.src = _ENDPOINT_ROOT + item.product.imagePath;
    img.classList.add("img-fluid,rounded");
    //img.width = 500;
    img.height = 300;
    if(row==0) {
      img.alt = item.product.name;  //'Donation';
    } else {
      img.alt = 'Request';
    }
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4

  colCard.append(img);  

  // Create button tag
  const btn = document.createElement('button');
<<<<<<< HEAD
    btn.textContent = 'Donating';
    btn.classList.add("btn,btn-primary,btn-sm,mt-2");
=======
    
  btn.classList.add("btn,btn-primary,btn-sm,mt-2");
  if(row==0) {
    if(item.status === "AVAILABLE" || item.status === "IN_PROGRESS") {
      btn.textContent = 'Edit';
      btn.addEventListener('click', ()=>handleClickDonate(item));
    } else {
      btn.textContent = item.status;
      btn.disabled = true;
    }
  } else {
    btn.textContent = 'Edit';
    btn.addEventListener('click', ()=>handleClickRequest(item));
  }
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4
    
  colCard.append(btn);  

}

<<<<<<< HEAD
// 1. Implement the function fetchColorsList() using the browser Fetch API to download the full color list from the following endpoint:
// https://reqres.in/api/unknown

// async function fetchColorsList() {

//     // method A: using a fetch request (with methods to address promises, e.g. resolve or reject)
//     // ---------------------------------------------------------------------------------------------
    
//     let resp = null;

//     fetch('https://reqres.in/api/unknown')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(response => {                             // promise.resolve returned
//             console.log(response);                  // log all the response's results
//             resp = response;
//     })
//     .catch(error => {
//         console.error('Error:', error)
//         return;     
//     }); // catch a promise.reject
//     // -------------------------------------------------------------------------------------

//     // method B: Using a fetch request (WITHOUT addressing promises returned from the api)
//     // --------------------------------------------------------------------------------------

//     // Using fetch, call for the 1st page of Data from the given url
//     // const response = await fetch("https://reqres.in/api/unknown");
//     // resp = await response.json();
//     // console.log(resp);   // check the data that is returned
//     // -----------------------------------------------------------------------------------

//     let allColors = resp.data;
//     let page = resp.page + 1;
//     let totalPages = resp.total_pages;

//     // Fetch the subsequent page(s) of Data (using a For Loop)
    
//     for (let currentPage = page; currentPage <= totalPages; currentPage++) {
//         /* --------method A  -------------*/
//         //const response = await fetch("https://reqres.in/api/unknown?page=" + currentPage);
//         //const resp = await response.json();        
//         /* ------------------------------*/

//         /* --------method B  -------------*/
//         fetch('https://reqres.in/api/unknown' + currentPage)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(response => {                             // promise.resolve returned
//                 console.log(response);                  // log all the response's results
//                 resp = response;
//         })
//         .catch(error => {
//             console.error('Error:', error)
//             return;     
//         }); // catch a promise.reject
//         /* ------------------------------*/

//         allColors = [...allColors, ...resp.data];
//         console.log(allColors);

//     }
    
//     // Clear listItems first
//     //listItems.innerHTML = "";
//     indexlistItems1.innerHTML = "";
//     indexlistItems2.innerHTML = "";
//     //indexlistItems3.innerHTML = "";

//     // Create an array to store the color list to localStorage
//     const arrColors = new Array();

//     // Loop through each array index to be passed to addItem(item) function for display
//     // Also, convert each JSON object item into a string for storage into arrColors
//     allColors.forEach(item => {
//         addItem(item);
//         arrColors.push(item);
//     });

//     // Store the array data arrColors into the browser window's localStorage 
//     window.localStorage.setItem("list-items", JSON.stringify(arrColors));
// }

// // 2.  Implement the loadColorsFromStorage() function so the colour values are loaded from the local storage. 
// //     Open the developer tools and verify that the data is stored in the local storage.

// function loadColorsFromStorage() {
    
//     // Retrive the values stored in list-items from localstorage
//     const arrColors = window.localStorage.getItem("list-items");

//     // parse the values into Objects (JSON.parse())
//     const parsedColors = JSON.parse(arrColors);

//     // iterate and populate the HTML page by calling addItem()
//     parsedColors.forEach(item => {
//         addItem(item);
//     });
// }


//Temp declare list of item objects 
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

// const listOfItemObjects3 = [
//   {
//     imgSrc: "img_products/Others/clearance_sale_small_plastic_j_1746174011_0061e01a_progressive.jpg",
//     desc: "Brand new plastic container with airtight lid, 24 pieces. Good for nuts and cookies storage."
//   },
//   {
//     imgSrc: "img_products/Others/wok_covers.jpg",
//     desc: "Wok covers with stainless steel comes in various sizes, still in good condition."
//   },
//   {
//     imgSrc: "img_products/Others/red_packet_hong_bao_ang_pao_1747550921_8093fc8e_progressive.jpg",
//     desc: "Any Ang Bao collectors here? Keen in this Ang Bao packer set collection? PM me."    
//   }
// ];
// async function getProductData(token) {
    
//     try {
//             //const user = decodeUser(token);
//             const decodedToken = jwt_decode(token);
//             // Assuming the ID is in a claim called 'sub', 'userId', or 'id'
//             const userId = decodedToken.sub || decodedToken.userId || decodedToken.id;
//             alert("UserID:" + userId);
//             const url = _ENDPOINT_GET_PRODUCT_BY_CUSTOMER + userId;
//             const response = await fetch(url, {  // !! DONE: API call for update profile
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
//                 "Content-Type": "application/json"
//             }
//             //,body: JSON.stringify(formData)
//         });

//         if(response.ok){
            
//             // TODO 
//             // Mock submission (replace with actual fetch/AJAX call)
//             setTimeout(() => {
//                 alert('Items rectrieved successfully!');
//                 //clearForm(); // Use our clear function to reset everything
                
//                 // Assuming the data is an array of objects
//                 if (Array.isArray(response)) {
//                   // Process the list of objects here
//                   response.forEach(item => {
//                     console.log('Item:', item);
//                     // Access object properties, e.g., item.name, item.id, etc.
//                   });
//                 } else {
//                   console.error('Data is not an array:', response);
//                 }
//             }, 1000);

//             return;
//         }
    
//         return alert("Unable to retrieve item");

//     }catch(e){
//         alert(e);
//     }
//   }

function getCookie(name) {
       const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(';').shift();
   }
=======

// function getCookie(name) {
//        const value = `; ${document.cookie}`;
//        const parts = value.split(`; ${name}=`);
//        if (parts.length === 2) return parts.pop().split(';').shift();
//    }
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4

async function loadData() {
    
    // Clear listItems first
    //listItems.innerHTML = "";
    indexlistDonate.innerHTML = "";
    indexlistRequest.innerHTML = "";
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

    //Add HREF link to "Add Item" a-link
    const a = document.getElementById('addDonateItem'); //or grab it by tagname etc
    a.href = _ITEMLISTING_URL;

    //Update username and email
    const token = isAuthenticated();
    const user = decodeUser(token);

    const name = user.username.split('@')[0];

    const n = document.getElementById('userNameDisplay'); //or grab it by tagname etc
    n.textContent = name;

    const e = document.getElementById('userEmailDisplay'); //or grab it by tagname etc
    e.textContent = user.username;

<<<<<<< HEAD
=======
    let userID = 0;

    try {
          
      //const jwtDecode = require("jwt-decode");
      //const token = window.localStorage.getItem("token"); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMjM0NTY3ODkiLCJpYXQiOjE1MTYyMzkwMjJ9.gHqSxzWpdOUL1nRAqUJg2CtjsEZZi8FLikD41i639zY
      //const tokenPayload = jwtDecode(token).id;
      
      //const userId = localStorage.getItem('userId');
      
      //Read from database to obtain user ID
      const url = _ENDPOINT_GET_CUSTOMERID_BY_EMAIL + name + "&lastName=";
      const response = await fetch(url, { 
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
          "Content-Type": "application/json"
      }
      
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          
          // iterate and populate the HTML page by calling addItem()
          data.forEach(item => {
              if(item.id != 0) {
                userID = item.id;
              }
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

    }catch(e){
        alert(e);
    }
    
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4
    //Read from database to obtain donation list and request list
    //getProductData(token);
    try {
          
<<<<<<< HEAD
          //const jwtDecode = require("jwt-decode");
          //const token = window.localStorage.getItem("token"); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMjM0NTY3ODkiLCJpYXQiOjE1MTYyMzkwMjJ9.gHqSxzWpdOUL1nRAqUJg2CtjsEZZi8FLikD41i639zY
          //const tokenPayload = jwtDecode(token).id;
          
          //const userId = localStorage.getItem('userId');
          

          const userId = getCookie('userId');
          const url = _ENDPOINT_GET_PRODUCT_BY_CUSTOMER + userId;
          const response = await fetch(url, { 
          //const response = await fetch("http://localhost:8080/user/getCustomer/1", {  // !! DONE: API call for update profile
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
              "Content-Type": "application/json"
          }
          
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              //console.log(data[0].name); // Access members from the parsed JSON data
              //console.log(data[1].name);
              
              let filteredArray = data.filter(item => item.transactType == "DONATE");
              console.log(filteredArray);
              // iterate and populate the HTML page by calling addItem()
              filteredArray.forEach(item => {
                  addItem(item,0);
              });
              
              })
          .catch(error => {
              console.error('Error fetching data:', error);
              });
      
      
          //const user = decodeUser(token);
          //const decodedToken = jwt_decode(token);
          // Assuming the ID is in a claim called 'sub', 'userId', or 'id'
          //const userId = decodedToken.sub || decodedToken.userId || decodedToken.id;
          //alert("UserID:" + userId);
          //const url = _ENDPOINT_GET_PRODUCT_BY_CUSTOMER + "1";
          
          // const response = await fetch("http://localhost:8080/user/getCustomer/1", {  // !! DONE: API call for update profile
          // method: "GET",
          // headers: {
          //     "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
          //     "Content-Type": "application/json"
          // }
          // //,body: JSON.stringify(formData)
          // });

          // if(response.ok){
              
          //     // TODO 
          //     // Mock submission (replace with actual fetch/AJAX call)
          //     setTimeout(() => {
          //         alert('Items rectrieved successfully!');
          //         //clearForm(); // Use our clear function to reset everything
                  
          //         // Assuming the data is an array of objects
          //         if (Array.isArray(response)) {
          //           // Process the list of objects here
          //           response.forEach(item => {
          //             console.log('Item:', item);
          //             // Access object properties, e.g., item.name, item.id, etc.
          //           });
          //         } else {
          //           console.error('Data is not an array:', response);
          //         }
          //     }, 1000);

          //     return;
          // }
      
          // return alert("Unable to retrieve item");
=======
      //const jwtDecode = require("jwt-decode");
      //const token = window.localStorage.getItem("token"); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMjM0NTY3ODkiLCJpYXQiOjE1MTYyMzkwMjJ9.gHqSxzWpdOUL1nRAqUJg2CtjsEZZi8FLikD41i639zY
      //const tokenPayload = jwtDecode(token).id;
      
      //const userId = localStorage.getItem('userId');
      

      //const userId = getCookie('userId');
      const url = _ENDPOINT_GET_ALL_TRANSACTIONS_BY_CUSTOMER + userID;
      const response = await fetch(url, { 
      //const response = await fetch("http://localhost:8080/user/getCustomer/1", {  // !! DONE: API call for update profile
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,                             // !! Send the bearer token to allow server-side authentication
          "Content-Type": "application/json"
      }
      
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          //console.log(data[0].name); // Access members from the parsed JSON data
          //console.log(data[1].name);
          
          let donateArray = data.filter(item => item.transactType == "DONATE");
          console.log(donateArray);
          // iterate and populate the HTML page by calling addItem()
          donateArray.forEach(item => {
              addItem(item,0);
          });

          let requestArray = data.filter(item => item.transactType == "ACQUIRE");
          console.log(requestArray);
          // iterate and populate the HTML page by calling addItem()
          requestArray.forEach(item => {
              addItem(item,1);
          });
          
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4

    }catch(e){
        alert(e);
    }

<<<<<<< HEAD
    }
=======
}
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4

document.addEventListener("DOMContentLoaded", () => {
    //fetchColorsList();
    //loadColorsFromStorage();
    loadData();
<<<<<<< HEAD
  })
=======
})
>>>>>>> 13b3dab7a5cb0b3a75df5e44647b02d7cdbc84d4

  //-----------------------------------------------
//Function to activate profile editing
function btnFunction() {
  //Enable buttons
  document.getElementById("sButton").disabled = false;
  document.getElementById("rButton").disabled = false;

  //Enable input fields
  const inputElement = document.getElementById('userName');
  const inputElement1 = document.getElementById('email');
  const inputElement2 = document.getElementById('password');
  // Remove the readonly attribute
  inputElement.removeAttribute('readonly'); 
  inputElement1.removeAttribute('readonly'); 
  inputElement2.removeAttribute('readonly'); 

}

//Function to modify displayed profile
function sBtnFunction() {
  
  //Get text in input fields
  const inputElement = document.getElementById('userName');
  const inputElement1 = document.getElementById('email');
  
  // Get form input text content
  const userNameValue = inputElement.value;
  const emailValue = inputElement1.value;

  document.getElementById("userNameDisplay").textContent = userNameValue;
  document.getElementById("userEmailDisplay").textContent = emailValue;
  
}