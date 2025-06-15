 // Register form

     function showToast({ toastElement, toastBodyElement, bgColor, msg }) {
    toastBodyElement.textContent = msg;
    toastElement.className = `toast align-items-center text-white bg-${bgColor} border-0 show`;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }

  async function submitForm(event) {
    event.preventDefault();

    const toastMsgExample = document.getElementById('msg-toast');
    const toastBodyExample = document.getElementById('toast-body');
   
    const email = document.getElementById("inputEmail3");
    const password = document.getElementById("inputPassword3");

    if (email.value.trim() === "") {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "danger",
        msg: "Please enter your email."
      });
      return;
    }

    if (password.value.trim() === "") {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "danger",
        msg: "Please enter your new passwords."
      });
      return;
    }


    /*
      A valid username should start with an alphabet so, [A-Za-z]. 
      All other characters can be alphabets, numbers or an underscore 
      so, [A-Za-z0-9_]. Since length constraint was given as 8-30 and 
      we had already fixed the first character, so we give {7,29}..
    
    const userNameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    */
       
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "danger",
        msg: "Email is not valid."
      });
      return;
    }

    /*
      the password consists of only alphanumeric characters and 
      is between eight and sixteen characters in length.
    */
    const pwdRegex = /^[a-zA-Z0-9]{8,16}$/;
    if (!pwdRegex.test(password.value)) {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "danger",
        msg: "Invalid Password - Please enter alphanumeric 8-16"
      });
      return;
    }

    const formData = { email: email.value, password: password.value };

    try {

      const formData = {                                                      // JavaScript Object formData stores the form's input values
        email: email.value, 
        password: password.value,
        role: "USER"
      };           
            
      const registerSuccess = await register(formData);                      // Invoke register() function, and end (return)
       


      if (!registerSuccess) {
        throw new Error("Error registering. Please try again.");
      }
      
    } catch (error) {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "danger",
        msg: error.message,
      });
    }
  }

  // TODO below to reverify, no work as plan.
  
  // if (registerSuccess) {
  //       showToast({
  //         toastElement: toastMsg,
  //         toastBodyElement: toastBody,
  //         bgColor: "success",
  //         msg: "Register successful! Redirecting..."
  //       });

  //        const token = window.localStorage.getItem(_USERTOKEN);                          // Retrieve usertoken from local storage
  //       const user = decodeUser(token);                                                 // decode the token for the role 

  //       const adminStatus = user.roles.some(role => role.authority === 'ADMIN');  

    
         setTimeout(() => {
          
          if(adminStatus)                                                               // !! This example only look for "ADMIN" authority
            window.location = _ADMIN_URL;                                               // Redirect the user to adminpage
          else                                                                          // !! Other authority will be deemed as user
            window.location = _HOME_URL;                                                // Redirect the user to homepage        

        }, 2000);

    function confirmCancel() {
    const confirmExit = confirm("Are you sure you want to cancel and leave this page?");
    if (confirmExit) {
      // Redirect to placeholder or real page
      window.location = _HOME_URL;
    }
  }

