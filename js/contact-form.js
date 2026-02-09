const contactForm = document.getElementById("formular");
const contactStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: contactForm.querySelector('input[name="name"]').value.trim(),
      email: contactForm.querySelector('input[name="email"]').value.trim(),
      message: contactForm.querySelector('textarea[name="message"]').value.trim(),
    };

    console.log("📤 CONTACT:", data);

    try {
      const res = await fetch("/contact", {  // <--- zmenené
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      contactStatus.textContent = result.message;
      contactForm.reset();
    } catch (err) {
      console.error(err);
      contactStatus.textContent = "Nepodarilo sa odoslať správu 😕";
    }
  });
}