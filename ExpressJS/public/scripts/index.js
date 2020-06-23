const menu_toggle = document.querySelector(".app-toggle-menu");
const nav_menu = document.querySelector(".app-nav");

menu_toggle.onclick = function (event) {
  nav_menu.classList.toggle("show");
};

nav_menu.onclick = function (event) {
  nav_menu.classList.toggle("show");
};
