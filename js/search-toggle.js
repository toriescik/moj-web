document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".search-toggle");
    const container = document.querySelector(".search-container");

    toggle.addEventListener("click", function () {
      container.classList.toggle("open");
      const input = container.querySelector("input");
      if (container.classList.contains("open")) {
        setTimeout(() => input.focus(), 200);
      }
    });
  });