export const PRODUCTS = [
  { id: "menu",     name: "NFC Menu Stand",             short: "Menu Stand",       price: 45, shape: "stand",    tap: true  },
  { id: "review",   name: "Google Review Card",         short: "Review Card",      price: 45, shape: "stand",    variant: "review", tap: false },
  { id: "coaster",  name: "Review Coasters & Stickers", short: "Coaster / Sticker",price: 15, shape: "coaster",  tap: false },
  { id: "card",     name: "NFC Business Card",           short: "Business Card",    price: 15, shape: "card",     tap: false },
  { id: "keychain", name: "NFC Keychain",                short: "Keychain",         price: 20, shape: "keychain", tap: false },
];

export const productById = (id) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

// volume discount tiers — price drops as quantity grows
export const TIERS = [
  { min: 1,  off: 0.0 },
  { min: 5,  off: 0.1 },
  { min: 10, off: 0.2 },
  { min: 25, off: 0.3 },
  { min: 50, off: 0.4 },
];

export function pricing(base, qty) {
  let off = 0;
  for (const t of TIERS) if (qty >= t.min) off = t.off;
  const unit = Math.round(base * (1 - off));
  return { unit, total: unit * qty, off: Math.round(off * 100) };
}

export const SWATCHES = [
  "#0071e3", "#111111", "#e0400b", "#12855a", "#7c3aed", "#c99700",
];

export const TAP_MODES = [
  { id: "menu",    label: "Menu",    title: "View Our Menu",   sub: "Order & Pay" },
  { id: "review",  label: "Review",  title: "Rate Your Visit", sub: "Review us on Google" },
  { id: "pay",     label: "Pay",     title: "Pay Your Bill",   sub: "Fast & contactless" },
  { id: "socials", label: "Socials", title: "Follow Us",       sub: "Instagram & more" },
];
