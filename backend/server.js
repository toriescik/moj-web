const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚡ Statické súbory – servuje všetko z root-u projektu
app.use(express.static(path.join(__dirname, ".."))); 
// ".." = root projektu, kde máš index.html, js/, images/, video/ atď.

// PORT z hostingu
const PORT = process.env.PORT || 3000;

// CSV súbory – ukladáme ich do "data" adresára
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const csvFile = path.join(dataDir, "spravy.csv");
const newsletterFile = path.join(dataDir, "newsletter.csv");

// vytvor CSV súbory, ak neexistujú
if (!fs.existsSync(csvFile)) {
  fs.writeFileSync(csvFile, "name,email,message,date\n");
}
if (!fs.existsSync(newsletterFile)) {
  fs.writeFileSync(newsletterFile, "email,date\n");
}

// ===== CONTACT FORM =====
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString();

  const safeRow = `"${name || ""}","${email || ""}","${(message || "").replace(/"/g, '""')}","${date}"\n`;
  fs.appendFile(csvFile, safeRow, (err) => {
    if (err) {
      console.error("❌ Chyba zápisu správy:", err);
      return res.status(500).json({ message: "Chyba servera" });
    }
    console.log("📩 Nová správa:", safeRow.trim());
    res.json({ message: "Správa bola úspešne odoslaná ✅" });
  });
});

// ===== NEWSLETTER =====
app.post("/newsletter", (req, res) => {
  const { email } = req.body;
  const date = new Date().toISOString();

  const row = `"${email || ""}","${date}"\n`;

  fs.appendFile(newsletterFile, row, (err) => {
    if (err) {
      console.error("❌ Chyba zápisu newsletteru:", err);
      return res.status(500).json({ message: "Chyba servera" });
    }
    console.log("📧 Nový newsletter:", email);
    res.json({ message: "Ďakujeme za prihlásenie ✅" });
  });
});

// ===== FALLBACK pre frontend (SPA alebo klasický web) =====
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server beží na porte ${PORT}`);
});
