// sidebar
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
document.addEventListener("DOMContentLoaded", function () {
    let currentLang = 'en'; // Alapértelmezett nyelv
    const langBtn = document.getElementById("lang-btn");

    function setInitialLanguage() {
        document.querySelectorAll("[data-lang]").forEach(el => {
            el.style.display = (el.getAttribute("data-lang") === currentLang) ? "block" : "none";
        });
        langBtn.textContent = "Magyar"; // Gomb alapértelmezett szövege
    }

    function toggleLanguage() {
        currentLang = (currentLang === "en") ? "hu" : "en";

        document.querySelectorAll("[data-lang]").forEach(el => {
            el.style.display = (el.getAttribute("data-lang") === currentLang) ? "block" : "none";
        });

        langBtn.textContent = (currentLang === "en") ? "Magyar" : "English";
    }

    langBtn.addEventListener("click", toggleLanguage);
    setInitialLanguage(); // Betöltéskor beállítja a nyelvet
});
