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

// Quote form -> emailed to FixCraft BC via FormSubmit (falls back to the visitor's email app)
const QUOTE_EMAIL = "fixcraftbc@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${QUOTE_EMAIL}`;
const quoteForm = document.getElementById("quote-form");
if (quoteForm) quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const d = new FormData(quoteForm);
  const status = quoteForm.querySelector(".form-status");
  const button = quoteForm.querySelector('button[type="submit"]');
  if (d.get("_honey")) return; // bot
  const contact = String(d.get("contact") || "");
  const subject = `Quote request: ${d.get("type")} – ${d.get("name")}`;
  const payload = {
    Name: d.get("name"),
    Contact: contact,
    Area: d.get("area") || "-",
    "Job type": d.get("type"),
    Details: d.get("details"),
    _subject: subject,
    _template: "table",
  };
  if (contact.includes("@")) { payload.email = contact; payload._replyto = contact; }

  button.disabled = true;
  const label = button.textContent;
  button.textContent = "Sending…";
  status.textContent = "";
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || String(out.success) === "false") throw new Error(out.message || res.status);
    quoteForm.reset();
    status.className = "form-status full ok";
    status.textContent = "Thanks! Your request was sent. We'll reply with a quote soon.";
  } catch (err) {
    status.className = "form-status full err";
    status.innerHTML = `Sorry, that didn't go through. Please email us at <a href="mailto:${QUOTE_EMAIL}">${QUOTE_EMAIL}</a>.`;
    const body = [`Name: ${d.get("name")}`, `Contact: ${contact}`, `Area: ${d.get("area") || "-"}`, `Job type: ${d.get("type")}`, "", d.get("details")].join("\n");
    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } finally {
    button.disabled = false;
    button.textContent = label;
  }
});
