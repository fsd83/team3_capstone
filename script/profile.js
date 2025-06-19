const indexlistDonate = document.querySelector("#donationList");
const indexlistRequest = document.querySelector("#requestList");



async function handleClickDonate(item){
  //console.log('Button clicked!');

  let action = prompt("Donation: Delete or Complete?", "Complete");
  if (action === "Delete") {
    item.status = "ABORTED";
  } else if(action === "Complete") {
    item.status = "COMPLETED";
   }  else {        ///////
    return;        ///////
  }                ///////  

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
    img.src = _ENDPOINT_ROOT + item.product.imagePath;
    img.classList.add("img-fluid,rounded");
    //img.width = 500;
    img.height = 300;
    if(row==0) {
      img.alt = item.product.name;  //'Donation';
    } else {
      img.alt = 'Request';
    }

  colCard.append(img);  

  // Create button tag
  const btn = document.createElement('button');
    
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
    
  colCard.append(btn);  

}


// function getCookie(name) {
//        const value = `; ${document.cookie}`;
//        const parts = value.split(`; ${name}=`);
//        if (parts.length === 2) return parts.pop().split(';').shift();
//    }

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
    
    //Read from database to obtain donation list and request list
    //getProductData(token);
    try {
          
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

    }catch(e){
        alert(e);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    //fetchColorsList();
    //loadColorsFromStorage();
    loadData();
})

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