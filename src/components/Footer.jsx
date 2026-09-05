import { Logo } from "./Nav";
import { scrollTo } from "../lib/smooth";

const COLS = [
  ["Products", [["Menu Stand", "#products"], ["Review Card", "#products"], ["Coasters & Stickers", "#products"], ["Business Cards", "#products"], ["Keychains", "#products"]]],
  ["Services", [["Digital Menus", "#services"], ["Review Growth", "#services"], ["Website Design", "#services"], ["Social Media", "#services"]]],
  ["Company", [["Design yours", "#customize"], ["Why NFC", "#why"], ["Pricing", "#pricing"], ["Book a demo", "#contact"]]],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>Menus, reviews &amp; websites — a tap away. Contactless growth tools for restaurants across Greater Boston.</p>
        </div>
        {COLS.map(([h, links]) => (
          <div className="footer__col" key={h}>
            <h4>{h}</h4>
            {links.map(([label, href]) => (
              <a key={label + href} href={href} onClick={(e) => { e.preventDefault(); scrollTo(href); }}>{label}</a>
            ))}
          </div>
        ))}
        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href="mailto:nfctagsupport@gmail.com">nfctagsupport@gmail.com</a>
          <span className="footer__addr">Greater Boston, MA</span>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} NFC Restaurants. All rights reserved.</span>
        <span>Designed for restaurants that want to grow.</span>
      </div>
    </footer>
  );
}
