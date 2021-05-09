const menulines = document.querySelector(".menulines");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

menulines.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    menulines.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    menulines.classList.remove("active");
    navMenu.classList.remove("active");
}