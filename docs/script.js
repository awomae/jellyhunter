// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById("navToggle");
const siteNav   = document.getElementById("siteNav");
navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Dark mode (persisted)
const darkBtn = document.getElementById("darkToggle");
const LS_KEY = "ea-theme";
const applyTheme = (mode) => {
  document.documentElement.dataset.theme = mode;
  document.body.classList.toggle("dark-mode", mode === "dark"); // for legacy hooks if any
  darkBtn.setAttribute("aria-pressed", String(mode === "dark"));
  darkBtn.textContent = mode === "dark" ? "☀️" : "🌙";
};
const saved = localStorage.getItem(LS_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (prefersDark ? "dark" : "light"));
darkBtn.addEventListener("click", () => {
  const next = (document.documentElement.dataset.theme === "dark") ? "light" : "dark";
  localStorage.setItem(LS_KEY, next);
  applyTheme(next);
});

// Smooth scroll for internal nav
document.querySelectorAll("a[href^='#']").forEach(a=>{
  a.addEventListener("click", e=>{
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// Back to top
const backBtn = document.getElementById("backToTop");
const onScroll = () => {
  if(window.scrollY > 600){ backBtn.style.display = "inline-flex"; }
  else { backBtn.style.display = "none"; }
};
window.addEventListener("scroll", onScroll, {passive:true});
backBtn.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
onScroll();