document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOADER – automaticky vloží do stránky
  ========================= */

  const loaderHTML = `
    <div id="loader">
      <div class="spinner"></div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", loaderHTML);

  const loader = document.getElementById("loader");


  /* =========================
     LOADER PRI NAČÍTANÍ STRÁNKY
  ========================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });


  /* =========================
     LOADER PRI ODCHODE NA LINK
  ========================= */

  document.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    // ignoruj:
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank"
    ) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      loader.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });

  });

});