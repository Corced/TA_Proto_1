document.addEventListener('DOMContentLoaded', function () {
  const sidebarPopup = document.getElementById('sidebar-popup');
  const logo = document.getElementById('logosmk');
  const closeBtn = document.getElementById('closeSidebar');

  if (logo) {
    logo.addEventListener('click', function () {
      sidebarPopup.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      sidebarPopup.classList.remove('active');
    });
  }

  // Optional: close sidebar when clicking outside
  sidebarPopup.addEventListener('click', function (e) {
    if (e.target === sidebarPopup) {
      sidebarPopup.classList.remove('active');
    }
  });
});