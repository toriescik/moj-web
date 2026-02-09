document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll(".fullwidth-banner");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px" // spustí sa až keď banner reálne vojde viac do view
    });

    banners.forEach(banner => observer.observe(banner));
});