// Shared behaviour for case study pages: mobile menu and the Intro / Technical sub-nav.

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
}

// Mark the sub-nav link for the part currently on screen.
const links = [...document.querySelectorAll(".subnav a[href^='#']")];
const parts = links.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
if (parts.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${e.target.id}`)));
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  parts.forEach((p) => io.observe(p));
}
