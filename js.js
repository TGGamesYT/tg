function dotwo() {
    toggleMenu();
    turn();
}
function jegyzes(nev, ertek) {
    localStorage.setItem(nev, JSON.stringify(ertek));
}

function leker(nev, defaultErtek = null) {
    const ertek = localStorage.getItem(nev);
    return ertek ? JSON.parse(ertek) : defaultErtek;
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
    let navContent = temp.querySelector('#langs');
    if (navContent) {
        document.getElementById('options').innerHTML = navContent.innerHTML;
    }
});
fetch('https://tggamesyt.github.io/outside.html')
.then(response => response.text())
.then(data => {
    let temp = document.createElement('div');
    temp.innerHTML = data;
    let navContent = temp.querySelector('#silly');
    if (navContent) {
        document.getElementById('silly').innerHTML = navContent.innerHTML;
    }
});
// silly navbar
function toggleVisibility() {
            let navbar = document.getElementById("navbar");
            let silly = document.getElementById("silly");

            if (navbar.style.display !== "none") {
                navbar.style.display = "none";
                silly.style.display = "block";
            } else {
                navbar.style.display = "block";
                silly.style.display = "none";
            }
}
// Language changer
async function translateText(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url); // Call Google Translate API
        const result = await response.json();
        return result[0][0][0]; // Extract translated text
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Fallback to original text if translation fails
    }
}

function extractTextWithPlaceholders(element) {
    let html = element.innerHTML;
    let placeholders = [];
    
    // Replace HTML tags with placeholders
    html = html.replace(/<[^>]+>/g, (match) => {
        placeholders.push(match);
        return `%%%${placeholders.length - 1}%%%`;
    });

    return { text: html, placeholders };
}

function restorePlaceholders(text, placeholders) {
    return text.replace(/%%%(\d+)%%%/g, (_, index) => placeholders[index]);
}

async function changeLanguage() {
    let selectedLang = document.getElementById("lang-select").value;
    let targetLang = selectedLang;

    // If "Custom Language" is selected, prompt for a language code
    if (selectedLang === "custom") {
        targetLang = prompt("Enter a 2-letter language code (e.g., es for Spanish, it for Italian):").toLowerCase();

        // Validate input
        if (!/^[a-z]{2}$/.test(targetLang)) {
            alert("Invalid language code! Please enter a valid 2-letter code.");
            document.getElementById("lang-select").value = "en"; // Reset to English
            return;
        }

        // Save custom language choice
        localStorage.setItem("customLang", targetLang);
    } else {
        localStorage.setItem("customLang", ""); // Clear custom language if not used
    }

    // Save selected language
    localStorage.setItem("selectedLang", targetLang);

    // Remove all dynamically added translations before adding a new one
    document.querySelectorAll("[data-lang]").forEach(el => {
        if (!el.hasAttribute("data-preset")) { // Remove only dynamically created elements
            el.remove();
        }
    });

    // Show preset translations if available
    let hasPreset = false;
    document.querySelectorAll("[data-lang]").forEach(el => {
        if (el.getAttribute("data-lang") === targetLang) {
            el.style.display = "block"; // Display preset language elements
            hasPreset = true;
        } else {
            el.style.display = "none"; // Hide non-matching preset elements
        }
    });

    // If the language is not preset, dynamically translate and display
    if (!hasPreset || selectedLang === "custom") {
        let defaultElement = document.querySelector('[data-lang="en"]'); // Assuming English is the default
        let { text, placeholders } = extractTextWithPlaceholders(defaultElement);
        let translatedText = await translateText(text, targetLang); // Get translated text from Google
        let finalHTML = restorePlaceholders(translatedText, placeholders);

        let translatedElement = document.createElement("p");
        translatedElement.setAttribute("data-lang", targetLang);
        translatedElement.innerHTML = finalHTML;
        translatedElement.style.display = "block"; // Ensure it's displayed

        // Append the translated element to the same parent as the original <p>
        defaultElement.parentNode.appendChild(translatedElement);
    }

    console.log("Language changed to:", targetLang);
}

// Load saved language on page load
window.onload = function () {
    let savedLang = localStorage.getItem("selectedLang") || "en"; // Default to English
    let customLang = localStorage.getItem("customLang");

    // If a custom language was used before, restore it
    if (customLang) {
        document.getElementById("lang-select").value = "custom"; // Set dropdown to "Custom"
    } else {
        document.getElementById("lang-select").value = savedLang;
    }

    changeLanguage(); // Apply saved language
};
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
// menu button animation
function turn() {
    const button = document.querySelector(".menu-btn");
    const spans = button.querySelectorAll("span");

    button.classList.toggle("open");

    if (button.classList.contains("open")) {
        spans[0].style.transform = "translateY(9px) rotate(45deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "translateY(-9px) rotate(-45deg)";
    } else {
        spans[0].style.transform = "translateY(0) rotate(0)";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "translateY(0) rotate(0)";
    }
}
window.onload = load;
window.onbeforeunload = function () {
    if (performance.navigation.type === 1) { // 1 = Reload
        changeLanguage();
    }
};
