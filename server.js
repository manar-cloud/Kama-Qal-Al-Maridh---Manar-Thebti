const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const STATS_FILE = path.join(DATA_DIR, "stats.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(ROOT, "public"), { extensions: ["html"] }));

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}
function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf8");
}
function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STATS_FILE)) writeJson(STATS_FILE, { visits: 0, downloads: 0 });
  if (!fs.existsSync(MESSAGES_FILE)) writeJson(MESSAGES_FILE, []);
}
ensureData();

app.post("/api/visit", (req, res) => {
  const stats = readJson(STATS_FILE, { visits: 0, downloads: 0 });
  stats.visits++;
  writeJson(STATS_FILE, stats);
  res.json({ ok: true });
});

app.post("/api/download", (req, res) => {
  const stats = readJson(STATS_FILE, { visits: 0, downloads: 0 });
  stats.downloads++;
  writeJson(STATS_FILE, stats);
  res.json({ ok: true });
});

app.get("/api/stats", (req, res) => {
  const stats = readJson(STATS_FILE, { visits: 0, downloads: 0 });
  res.json(stats);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "يرجى ملء جميع الحقول." });
  }
  const messages = readJson(MESSAGES_FILE, []);
  messages.push({
    id: Date.now(),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 160),
    message: String(message).slice(0, 3000),
    createdAt: new Date().toISOString()
  });
  writeJson(MESSAGES_FILE, messages);
  res.json({ ok: true, message: "تم إرسال رسالتك بنجاح." });
});

app.use((req, res) => {
  res.sendFile(path.join(ROOT, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`كما قال المريض website running on http://localhost:${PORT}`);
});
