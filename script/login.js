

//-- Login -- 
// -- Form Logic --
    function showToast({ toastElement, toastBodyElement, bgColor, msg }) {
      toastBodyElement.textContent = msg;
      toastElement.className = `toast align-items-center text-white bg-${bgColor} border-0 show`;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }

    function confirmCancel() {
      if (confirm("Are you sure you want to cancel?")) {
        window.location.href = "index.html";
      }
    }

    async function submitForm(event) {
      event.preventDefault();

      const toastMsg = document.getElementById('msg-toast');
      const toastBody = document.getElementById('toast-body');
      const email = document.getElementById("txtEmail");
      const password = document.getElementById("txtPassword");

      // Basic empty check
      if (email.value.trim() === "") {
        showToast({
          toastElement: toastMsg,
          toastBodyElement: toastBody,
          bgColor: "danger",
          msg: "Please enter your Email."
        });
        return;
      }

      if (password.value.trim() === "") {
        showToast({
          toastElement: toastMsg,
          toastBodyElement: toastBody,
          bgColor: "danger",
          msg: "Please enter your password."
        });
        return;
      }

      // Email ID format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        showToast({
          toastElement: toastMsg,
          toastBodyElement: toastBody,
          bgColor: "danger",
          msg: "Invalid user Email format."
        });
        return;
      }

      // Authenticate user here
      const formData = { email: email.value, password: password.value };      // JavaScript Object formData stores the form's input values
            
      const loginSuccess = await login(formData);                             // Invoke login() function, and end (return)

      if (loginSuccess) {
        showToast({
          toastElement: toastMsg,
          toastBodyElement: toastBody,
          bgColor: "success",
          msg: "Login successful! Redirecting..."
        });

        const token = window.localStorage.getItem(_USERTOKEN);                          // Retrieve usertoken from local storage
        const user = decodeUser(token);                                                 // decode the token for the role 

        const adminStatus = user.roles.some(role => role.authority === 'ADMIN');        // !! Find "ADMIN" authority from token's roles
            
        setTimeout(() => {
          
          if(adminStatus)                                                               // !! This example only look for "ADMIN" authority
            window.location = _ADMIN_URL;                                               // Redirect the user to adminpage
          else                                                                          // !! Other authority will be deemed as user
            window.location = _HOME_URL;                                                // Redirect the user to homepage        

        }, 2000);

      } else {
        showToast({
          toastElement: toastMsg,
          toastBodyElement: toastBody,
          bgColor: "danger",
          msg: "Login failed. Please try again."
        });
      }
    }
   