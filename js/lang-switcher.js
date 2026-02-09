document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname; // napr. /sk/Clanky.html
    const currentLang = currentPath.includes("/en/") ? "en" : "sk";

    const langLink = document.getElementById("lang-link");
    const langFlag = document.getElementById("lang-flag");

    // Mapa SK ↔ EN
    const pageMap = {
        "/sk/index.html": "/en/index.html",
        "/sk/Clanky.html": "/en/Articles.html",
        "/sk/Lezenie.html": "/en/Climbing.html",
        "/sk/Sebarozvoj.html": "/en/PersonalGrowth.html",
        "/sk/Technologie.html": "/en/Technology.html",
        "/sk/Knihy.html": "/en/Books.html",
        "/sk/Fotografie.html": "/en/Photography.html",
        "/sk/Kontakt.html": "/en/Contact.html",
        "/sk/book1.html" : "/en/book1.html",
        "/sk/book2.html" : "/en/book2.html",
        "/sk/book3.html" : "/en/book3.html",
        "/sk/Java.html" :"/en/Java.html",
        "/sk/WebDeveloping.html" : "/en/WebDeveloping.html",
         "/sk/QAAutomation.html" : "/en/QAAutomation.html",
         "/sk/baileherculane.html" : "/en/baileherculane.html",
         "sk/ateny.html" :"/en/athens.html",
         "/sk/leonidio.html": "/en/leonidio.html",
         "/sk/norsko.html" : "/en/norway.html",
         "/sk/priroda.html" :"/en/nature.html",
         "/sk/ateny.html" : "/en/athens.html",
         "/sk/digtransforlezenie.html" : "/en/digtransforclimbing.html",



    };

    if (currentLang === "sk") {
        langLink.href = pageMap[currentPath] || "/en/index.html"; // ak nie je v mape, default na EN index
        langFlag.src = "/images/united-kingdom.png";
        langFlag.alt = "English version";
    } else {
        // invert map pre EN → SK
        const invertedMap = Object.fromEntries(
            Object.entries(pageMap).map(([sk, en]) => [en, sk])
        );
        langLink.href = invertedMap[currentPath] || "/sk/index.html";
        langFlag.src = "/images/slovakia.png";
        langFlag.alt = "Slovenská verzia";
    }
});