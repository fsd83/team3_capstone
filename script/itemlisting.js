// OK

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadButton = document.getElementById('uploadButton');
    const imageUpload = document.getElementById('imageUpload');
    const mainImage = document.querySelector('.main-image');
    const form = document.querySelector('form');
    const clearButton = document.getElementById('clearButton');
    const submitButton = document.getElementById('submitButton');
    const backButton = document.querySelector('.btn-outline-secondary');
    
    // Store uploaded image
    let uploadedImage = null;

    // Back button functionality
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Change to your desired back location
    });

    // Image upload handling
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Display the main image
                // mainImage.innerHTML = `<img src="${e.target.result}" alt="Main Preview" class="img-fluid rounded">`;
                // uploadedImage = file;


                // Create image element with proper styling
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "Item Preview";
                img.className = "uploadedImage";
                uploadedImage = file;
                
                //Clear previous content and add new image
                mainImage.innerHTML = '';
                mainImage.appendChild(img);
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Clear form - Enhanced to properly reset all fields
    function clearForm() {
        // Reset form fields
        form.reset();
        
        // Clear the image preview
        mainImage.innerHTML = '<span class="fs-3">Main Image</span>';
        uploadedImage = null;
        
        // Reset file input (needs special handling)
        imageUpload.value = '';
        
        // If using Bootstrap validation, remove validation classes
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        // Clear any validation messages
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });
    }

    // Clear button event listener
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        clearForm();
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous validation
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });

        // Validate title
        const titleInput = document.getElementById('inputTitle');
        const title = titleInput.value.trim();
        if (title === '') {
            showError(titleInput, 'Please enter a title for your item');
            isValid = false;
        }
        
        // Validate category
        const categorySelected = document.querySelector('input[name="itemCategory"]:checked');
        if (!categorySelected) {
            const categoryField = document.querySelector('.col-form-label.col-sm-2.pt-0');
            showError(categoryField, 'Please select a category', true);
            isValid = false;
        }
        
        // Validate condition
        const conditionSelect = document.getElementById('itemCondition');
        const condition = conditionSelect.value;
        if (!condition) {
            showError(conditionSelect, 'Please select the item condition');
            isValid = false;
        }
        
        // Validate description
        const descriptionInput = document.getElementById('itemDescription');
        const description = descriptionInput.value.trim();
        if (description === '') {
            showError(descriptionInput, 'Please enter a description');
            isValid = false;
        }
        
        // Validate location
        const locationInput = document.getElementById('itemLocation');
        const location = locationInput.value.trim();
        if (location === '') {
            showError(locationInput, 'Please enter a location');
            isValid = false;
        }
        
        // Validate image
        if (!uploadedImage) {
            showError(uploadButton, 'Please upload an image of your item');
            isValid = false;
        }
        
        return isValid;
    }

    // Helper function to show validation errors
    function showError(element, message, isFieldset = false) {
        if (isFieldset) {
            // For fieldset elements (like radio buttons)
            const errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback d-block';
            errorElement.textContent = message;
            element.parentNode.appendChild(errorElement);
        } else {
            // For regular form elements
            element.classList.add('is-invalid');
            const errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            errorElement.textContent = message;
            element.parentNode.appendChild(errorElement);
        }
    }

    // Form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Prepare form data
            const formData = new FormData();
            
            // Add text fields
            formData.append('title', document.getElementById('inputTitle').value.trim());
            formData.append('category', document.querySelector('input[name="itemCategory"]:checked').value);
            formData.append('condition', document.getElementById('itemCondition').value);
            formData.append('description', document.getElementById('itemDescription').value.trim());
            formData.append('location', document.getElementById('itemLocation').value.trim());
            
            // Add the single image
            formData.append('image', uploadedImage);
            
            //!Trying out the backend data - this const url need to be updated!
            const url = "http://localhost:8080/feedback/add/22";
            try {
                const response = fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            }catch(e){
                alert(e);
            }

            // Here you would typically send the data to your server
            console.log('Form data prepared:', {
                title: formData.get('title'),
                category: formData.get('category'),
                condition: formData.get('condition'),
                description: formData.get('description'),
                location: formData.get('location'),
                hasImage: formData.has('image')
            });
            
            // Mock submission (replace with actual fetch/AJAX call)
            setTimeout(() => {
                alert('Item submitted successfully!');
                clearForm(); // Use our clear function to reset everything
                
                // Redirect after submission if needed
                // window.location.href = 'success.html';
            }, 1000);
        }
    });
});