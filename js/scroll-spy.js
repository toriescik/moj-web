// vyber všetky sekcie, ktoré chceme sledovať
const sections = document.querySelectorAll(".section.about-target");

// vyber všetky odkazy zo zoznamu
const navLinks = document.querySelectorAll(".intro-list a");

// funkcia, ktorá zvýrazní aktívny odkaz
function setActiveLink() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // keď sa scroll dostane do sekcie
        if (window.scrollY >= sectionTop - 100) { // offset pre header / padding
            current = section.getAttribute("id");
        }
    });

    // prejdeme všetky odkazy a nastavíme triedu active
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

// spusti pri scrollovaní a aj pri načítaní stránky
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
