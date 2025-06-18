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
  const email = document.getElementById("txtEmail");
  const message = document.getElementById("txtMessage");

  if (email.value.trim() === "") {
    showToast({
      toastElement: toastMsgExample,
      toastBodyElement: toastBodyExample,
      bgColor: "danger",
      msg: "Please enter your email."
    });
    return;
  }

  if (message.value.trim() === "") {
    showToast({
      toastElement: toastMsgExample,
      toastBodyElement: toastBodyExample,
      bgColor: "danger",
      msg: "Please enter your message."
    });
    return;
  }

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

  const msgRegex = /^[a-zA-Z0-9\s.,!?'"-]*$/;
  if (!msgRegex.test(message.value)) {
    showToast({
      toastElement: toastMsgExample,
      toastBodyElement: toastBodyExample,
      bgColor: "danger",
      msg: "Message is invalid."
    });
    return;
  }

  const formData = { email: email.value, message: message.value };

  try {
    const response = await fetch("https://getform.io/f/bkkywpzb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      showToast({
        toastElement: toastMsgExample,
        toastBodyElement: toastBodyExample,
        bgColor: "success",
        msg: "Your message has been sent. Thank you."
            
      });

          setTimeout(() => {
          
            window.location = _HOME_URL;                                                // Redirect the user to homepage        

        }, 2000);


      email.value = "";
      message.value = "";
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    showToast({
      toastElement: toastMsgExample,
      toastBodyElement: toastBodyExample,
      bgColor: "danger",
      msg: "Error sending message. Please try again."
    });
  }
}

function confirmCancel() {
  const confirmExit = confirm("Are you sure you want to cancel and leave this page?");
  if (confirmExit) {
    // Redirect to placeholder or real page
    window.location = _HOME_URL; // Replace with actual page when it's ready
  }
}