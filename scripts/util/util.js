      // Toast function called showToast() to provide feedback
      // after form submission
        function showToast({toastElement, toastBodyElement, bgColor, msg}) {
        // execute code run BS5 toast to show activity is status of activity
        const toastEl = toastElement;
        const toastBody = toastBodyElement;
        toastEl.classList.remove("text-bg-danger");  // remove all known used colors
        toastEl.classList.remove("text-bg-success"); // remove all known used colors
        toastEl.classList.add(`text-vg-${bgColor}`); // use template string to change color
        toastBody.textContent = msg;        // create new instance of toast
        const toast = new bootstrap.Toast(toastEl);  // create new instance of toast
        toast.show();                                // display the new instance of toast
     } 