document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logosmk');
    const sidebarPopup = document.querySelector('#sidebar-popup');
    const closeBtn = document.querySelector('.close-btn');
  
    // Open sidebar with animation
    logo.addEventListener('click', () => {
      sidebarPopup.classList.add('active');
    });
  
    // Close sidebar with animation
    closeBtn.addEventListener('click', () => {
      sidebarPopup.classList.remove('active');
    });
  
    // Optional: click outside to close
    sidebarPopup.addEventListener('click', (event) => {
      if (event.target === sidebarPopup) {
        sidebarPopup.classList.remove('active');
      }
    });
  });
  function NotifUser() {
    // Buat ngarahin ke page lain 
    window.location.href = "notifikasi.html";
  }
  