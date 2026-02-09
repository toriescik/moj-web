const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statické súbory zo root priečinkov
const skPath = path.join(__dirname, "../sk");
const enPath = path.join(__dirname, "../en");

app.use("/sk", express.static(skPath));
app.use("/en", express.static(enPath));

// CSV súbory v backend/
const csvFile = path.join(__dirname, "spravy.csv");
const newsletterFile = path.join(__dirname, "newsletter.csv");

if (!fs.existsSync(csvFile)) fs.writeFileSync(csvFile, "name,email,message,date\n");
if (!fs.existsSync(newsletterFile)) fs.writeFileSync(newsletterFile, "email,date\n");

// Kontakt formulár
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString();
  const row = `"${name || ""}","${email || ""}","${(message || "").replace(/"/g, '""')}","${date}"\n`;
  fs.appendFile(csvFile, row, err => {
    if (err) return res.status(500).json({ message: "Chyba servera" });
    console.log("📩 Nová správa:", row.trim());
    res.json({ message: "Správa bola úspešne odoslaná ✅" });
  });
});

// Newsletter
app.post("/newsletter", (req, res) => {
  const { email } = req.body;
  const date = new Date().toISOString();
  const row = `"${email || ""}","${date}"\n`;
  fs.appendFile(newsletterFile, row, err => {
    if (err) return res.status(500).json({ message: "Chyba servera" });
    console.log("📧 Nový newsletter email:", email);
    res.json({ message: "Ďakujeme za prihlásenie ✅" });
  });
});

// Fallback pre EN
app.get(/^\/en(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(enPath, "index.html"));
});

// Fallback pre SK
app.get(/^\/sk(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(skPath, "index.html"));
});

// Root URL presmeruje na SK
app.get("/", (req, res) => {
  res.redirect("/sk");
});

// Spustenie servera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server beží na porte ${PORT}`));
