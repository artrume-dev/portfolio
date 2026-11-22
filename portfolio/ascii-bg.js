// Decorative ASCII background: scatters faint "+" and "-" marks behind each section.
// Purely visual (aria-hidden, no pointer events). Positions are seeded per section,
// so the pattern looks random but stays the same on every visit and resize.
// Styles: .ascii-bg in index.html and case-studies/case-study.css.

const MARKS = ["+", "+", "-", "+", "-", "+ +", "- -", "+-", "- + -"];

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function scatterAscii(selector = "main section, main > header") {
  document.querySelectorAll(selector).forEach((section, index) => {
    if (section.dataset.ascii === "off" || section.querySelector(":scope > .ascii-bg")) return;
    const rand = seeded(hash(`${section.id || section.className}:${index}`));
    const { width, height } = section.getBoundingClientRect();
    const count = Math.max(6, Math.min(26, Math.round((width * height) / 60000)));

    const layer = document.createElement("div");
    layer.className = "ascii-bg";
    layer.setAttribute("aria-hidden", "true");

    for (let i = 0; i < count; i++) {
      const mark = document.createElement("span");
      mark.textContent = MARKS[Math.floor(rand() * MARKS.length)];
      // Half the marks sit in the side gutters, the rest anywhere, so text stays clear.
      const inGutter = rand() < 0.5;
      const x = inGutter ? (rand() < 0.5 ? rand() * 9 : 91 + rand() * 8) : rand() * 98;
      mark.style.left = `${x.toFixed(2)}%`;
      mark.style.top = `${(rand() * 94 + 2).toFixed(2)}%`;
      mark.style.fontSize = `${Math.round(12 + rand() * 10)}px`;
      if (rand() < 0.35) mark.className = "faint";
      layer.append(mark);
    }
    section.prepend(layer);
  });
}

// ASCII field that spills out of an element from a point near one of its corners
// (used behind the hero portrait). Characters match the portrait's own ASCII set
// and thin out with distance; CSS masks the edge into a soft fade.
const RAMP = ["%", "$", "#", "+", "=", "-", ":", "."];

export function asciiBurst(host, { originX = 0.85, originY = 0.14, radius: maxRadius = 210, spread = 0.6 } = {}) {
  if (!host) return;
  const layer = document.createElement("pre");
  layer.className = "ascii-burst";
  layer.setAttribute("aria-hidden", "true");
  layer.style.inset = `${-spread * 100}%`;
  host.prepend(layer);

  const draw = () => {
    const box = host.getBoundingClientRect();
    if (!box.width) return;
    const radius = Math.min(maxRadius, box.width * 0.5); // smaller on phones
    const cellW = 7.2, cellH = 12; // 12px Geist Mono
    const w = box.width * (1 + spread * 2), h = box.height * (1 + spread * 2);
    const cols = Math.ceil(w / cellW), rows = Math.ceil(h / cellH);
    const ox = (box.width * (spread + originX)), oy = (box.height * (spread + originY)); // px in layer
    const rand = seeded(hash(`burst:${originX}:${originY}`));
    let out = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = Math.hypot(c * cellW - ox, r * cellH - oy) / radius; // 0 at origin, 1 at edge
        if (d >= 1) { out += " "; continue; }
        const density = (1 - d) * 0.85 + (rand() - 0.5) * 0.3;
        if (rand() > density) { out += " "; continue; }
        const i = Math.min(RAMP.length - 1, Math.max(0, Math.floor(d * RAMP.length + (rand() - 0.5) * 2)));
        out += RAMP[i];
      }
      out += "\n";
    }
    layer.textContent = out;
    layer.style.setProperty("--burst-x", `${ox}px`);
    layer.style.setProperty("--burst-y", `${oy}px`);
    layer.style.setProperty("--burst-r", `${radius}px`);
  };
  draw();
  let t;
  new ResizeObserver(() => { clearTimeout(t); t = setTimeout(draw, 120); }).observe(host);
}
