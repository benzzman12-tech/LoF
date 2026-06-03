document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  // Hamburger toggle
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }

  // Dropdown toggle
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".has-dropdown .dropdown-nav-list");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault(); // prevent page jump
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
  }
});
