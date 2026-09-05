// tiny singleton so any component can drive the Lenis smooth-scroll instance
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function scrollTo(target, opts = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset: -74, duration: 1.1, ...opts });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

// helpers for colors used by the configurator
export function hexToRgb(h) {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
}
function toHex(rgb) {
  return "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function luminance([r, g, b]) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
// keep the on-dark accent legible: lift very dark colors toward light
export function displayAccent(hex) {
  const rgb = hexToRgb(hex);
  if (luminance(rgb) < 0.32) return toHex(rgb.map((v) => v + (255 - v) * 0.62));
  return hex;
}
