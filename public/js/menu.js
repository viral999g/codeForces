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

const logout = async(e) => {
    e.preventDefault();
    var res = await fetch('/logout', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify()
    })

    var json = await res.json()
    if (json.statusCode == 200) {
        if (json.message == "Logged out successfully") {
            window.location.replace("/login")
        } else {
            alert(json.message)
        }
    }
}