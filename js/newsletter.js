const newsletterForm = document.getElementById("newsletter-form");
const newsletterStatus = document.getElementById("newsletterStatus");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[name="email"]').value.trim();
    console.log("📤 NEWSLETTER:", email);

    try {
      const res = await fetch("/newsletter", {  // <--- zmenené
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      newsletterStatus.textContent = result.message;
      newsletterForm.reset();
    } catch (err) {
      console.error(err);
      newsletterStatus.textContent = "Nepodarilo sa prihlásiť 😕";
    }
  });
}