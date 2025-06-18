document.addEventListener("DOMContentLoaded", async () => {
  
    document.getElementById("showHideDonor").style.display = "none";

    // fetch the product infomation 
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('id');

    // //!Trying out the backend data - this const url need to be updated!
    const token = isAuthenticated();

    try {

        const response = await fetch(_ENDPOINT_PRODUCTDETAIL + paramId, {     // !! DONE: API call for update profile
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,                           // !! Send the bearer token to allow 
            }
        });

        if(response.ok){
            // display the details
            const productDetail = await response.json();
            document.getElementById("productDetailTitle").textContent = productDetail.name;
            document.getElementById("productDetailCategoryType").textContent = productDetail.productType;
            document.getElementById("productDetailDescription").textContent = productDetail.description;
            document.getElementById("productDetailImage").src = _ENDPOINT_ROOT.concat(productDetail.imagePath);

            // set the link for the category
            const categoryType = productDetail.productType;
            document.getElementById("productDetailCategoryType").href = (`${_CATALOG_URL}?param1=${categoryType}`);
        }
    }catch(e){
        alert("An error has occured. Please try again.");
    }

})

document.getElementById("productDetailRequest").addEventListener("click", async () => {
  
    // have an end-point to reserve the product

    // fetch the product infomation 
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('id');
    
    // //!Trying out the backend data - this const url need to be updated!
    const token = isAuthenticated();

    try {
        // we need to create a new
        const response = await fetch(_ENDPOINT_PRODUCTREQUEST + paramId, {     // !! DONE: API call for update profile
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,                           // !! Send the bearer token to allow 
            }
        });

        if(response.ok){
            // show the user who donated the item
            const transactionData = await response.json();
            console.log(transactionData);
            // set up the donor email and the link to click
            document.getElementById("productDetailDonorEmail").textContent = transactionData.customer.email;

            document.getElementById("productDetailDonorEmailLink").href = 
                `${_PROFILE_URL}?transaction_id=${transactionData.id};`

            // display the donar
            document.getElementById("showHideDonor").style.display = "block";

            // alert the user as well
            alert("Request successful. Check your profile for updates.");

        }
    }catch(e){
        alert("An error has occured. Please try again.");
    }


    
});

// the end-point should return the user who donated the item

// alert the requester that item is reserved

// and show who  the donator is 

// allow the user to go his profile (to check donation status)

/**
{
    customer: {firstName: null, lastName: null, email: 'testuser1@gmail.com', password: '$2a$10$5YwW6i7MqRGQNI53TOgkk.tVAOiKKzg/dmSv.1aUR7ttyJ87nAwSe', role: 'USER', …},
    id: 5,
    product: {name: 'Brand new cupboard', description: '5-year old cupboard.', imagePath: '/uploads/images/1750228265312_cupboard.png', productType: 'OTHERS', id: 5},
    status : "AVAILABLE",
    transactType: "DONATE"
}
 */