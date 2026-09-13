const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

async function post(url, data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch { return null; }
}

post("/api/visit");

async function loadStats() {
  try {
    const res = await fetch("/api/stats");
    const stats = await res.json();
    document.getElementById("visitCount").textContent = stats.visits;
    document.getElementById("downloadCount").textContent = stats.downloads;
  } catch {}
}
loadStats();

document.getElementById("downloadBook")?.addEventListener("click", () => {
  post("/api/download");
  setTimeout(loadStats, 300);
});

document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const message = document.getElementById("formMessage");
  message.textContent = "جاري الإرسال...";
  const data = Object.fromEntries(new FormData(form).entries());
  const result = await post("/api/contact", data);
  if (result?.ok) {
    message.textContent = "تم إرسال رسالتك بنجاح ✦";
    form.reset();
  } else {
    message.textContent = result?.message || "حدث خطأ، حاول مرة أخرى.";
  }
});
