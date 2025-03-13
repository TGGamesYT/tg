window.onload = setTimeout(load, 200);
function jegyzes(nev, ertek, defaultErtek = null) {
    if (leker(nev) === null) {
        localStorage.setItem(nev, JSON.stringify(defaultErtek));
    } else {
        localStorage.setItem(nev, JSON.stringify(ertek));
    }
}

function leker(nev) {
    const ertek = localStorage.getItem(nev);
    return ertek ? JSON.parse(ertek) : null;
}
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
}
// outside html fetcher
fetch('https://tggamesyt.github.io/outside.html')
.then(response => response.text())
.then(data => {
    let temp = document.createElement('div');
    temp.innerHTML = data;
    let navContent = temp.querySelector('#navigation');
    if (navContent) {
        document.getElementById('navbar').innerHTML = navContent.innerHTML;
    }
});
fetch('https://tggamesyt.github.io/outside.html')
.then(response => response.text())
.then(data => {
    let temp = document.createElement('div');
    temp.innerHTML = data;
    let navContent = temp.querySelector('#maintance');
    if (navContent) {
        document.getElementById('maintance').innerHTML = navContent.innerHTML;
    }
});
// Language changer
const languages = ["en", "hu", "de", "fr"]; // Add more languages here
function load() {
    let currentLang = leker("lang"); // Load saved language
    document.getElementById("lang-select").value = currentLang; // Set dropdown to saved language
    changeLanguage()
}

function changeLanguage() {
    currentLang = document.getElementById("lang-select").value;
    jegyzes("lang", currentLang, "en"); // Save language selection

    // Show/hide elements based on selected language
    document.querySelectorAll("[data-lang]").forEach(el => {
        el.style.display = (el.getAttribute("data-lang") === currentLang) ? "block" : "none";
    });

    console.log("Language changed to:", currentLang);
}
// button clicking
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");

    button.addEventListener("click", function () {
        this.classList.toggle("clicked");
    });
});
// navbar fixing
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const logoTextNav = document.querySelector(".logo_nav");
    const logoTextMain = document.querySelector(".logo_main");
    const body = document.body;

    menuBtn.addEventListener("click", function () {
        const navLogoRect = logoTextNav.getBoundingClientRect();
        const mainLogoRect = logoTextMain.getBoundingClientRect();
        // Toggle a scroll tiltás
        body.classList.toggle("menu-active");
    });
});
