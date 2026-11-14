// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Quote form -> opens the visitor's email app with the details filled in
const QUOTE_EMAIL = "fixcraftbc@gmail.com";
const quoteForm = document.getElementById("quote-form");
if (quoteForm) quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = `Quote request: ${d.get("type")} – ${d.get("name")}`;
  const body = [
    `Name: ${d.get("name")}`,
    `Contact: ${d.get("contact")}`,
    `Area: ${d.get("area") || "-"}`,
    `Job type: ${d.get("type")}`,
    "",
    d.get("details"),
  ].join("\n");
  window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
