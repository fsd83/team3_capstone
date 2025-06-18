  document.getElementById("btnDonateNow").addEventListener("click", () => {
      
      const token = isAuthenticated();

      if(token){
        window.location.href = _ITEMLISTING_URL;
        return;
      }

      window.location = _LOGIN_URL;

    })