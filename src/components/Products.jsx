import { motion } from "framer-motion";
import Reveal, { Stagger, Item } from "./ui/Reveal";
import { scrollTo } from "../lib/smooth";

const Waves = ({ size = 26 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
    <path d="M7 8a8 8 0 0 1 0 8" /><path d="M11 5a13 13 0 0 1 0 14" /><path d="M15 2.5a18 18 0 0 1 0 19" />
  </svg>
);
const Chat = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 3C6.5 3 2 6.7 2 11.2c0 2.2 1.1 4.2 2.9 5.6-.1 1-.6 2.4-1.6 3.7 1.9-.3 3.5-1 4.7-1.8 1.2.4 2.6.7 4 .7 5.5 0 10-3.7 10-8.2S17.5 3 12 3z" /></svg>
);
const Cam = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="18" height="14" rx="4" /><circle cx="12" cy="13" r="3.4" /><circle cx="17.5" cy="9.5" r="1" fill="currentColor" /></svg>
);
const Gmini = ({ size = 24 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size}>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.8-6.8C35.9 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5C43.4 37.9 46.1 31.8 46.1 24.5z" />
    <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6l-7.9-6.2C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.2z" />
    <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.1-5.5c-2 1.3-4.5 2.1-8.5 2.1-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export function Seal() {
  return (
    <svg className="sticker" viewBox="0 0 100 100" aria-label="Fully customizable">
      <defs><path id="sealcirc" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" /></defs>
      <circle cx="50" cy="50" r="47" fill="#0071e3" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".5" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="1.5 3" opacity=".85" />
      <text fill="#fff" fontSize="9.5" fontWeight="700" letterSpacing="1.2">
        <textPath href="#sealcirc" startOffset="0%">FULLY CUSTOMIZABLE • FULLY CUSTOMIZABLE • </textPath>
      </text>
      <text x="50" y="47" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">100%</text>
      <text x="50" y="61" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" letterSpacing="1.5">YOURS</text>
    </svg>
  );
}

function Card({ children }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.article className="pcard" onMouseMove={move} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <span className="pcard__spot" aria-hidden="true" />
      <Seal />
      {children}
    </motion.article>
  );
}

export default function Products({ onDesign }) {
  const design = (id) => { onDesign?.(id); scrollTo("#customize"); };

  return (
    <section className="section products" id="products">
      <div className="wrap">
        <Reveal className="section__head center">
          <span className="kicker">The products</span>
          <h2 className="section__title">NFC hardware, made for hospitality.</h2>
          <p className="section__lead">Every product is fully customizable with your logo and colors. Tap <i>or</i> scan built into each one — design yours below.</p>
        </Reveal>

        <Stagger className="pgrid">
          <Item><Card>
            <div className="pcard__media" style={{ "--tile": "#abcfdf" }}>
              <img src="/assets/products/menu-stand-sq.jpg" alt="NFC menu stand" loading="lazy" />
            </div>
            <div className="pcard__body">
              <h3>NFC Menu Stand</h3>
              <p>“View our menu, order &amp; pay.” The centerpiece for every table.</p>
              <div className="pcard__foot"><span className="price-chip">$45 each</span><button className="link-btn" onClick={() => design("menu")}>Design yours ›</button></div>
            </div>
          </Card></Item>

          <Item><Card>
            <div className="pcard__media" style={{ "--tile": "#fafaf8" }}>
              <img src="/assets/products/review-stand-sq.jpg" alt="NFC Google review card" loading="lazy" />
            </div>
            <div className="pcard__body">
              <h3>Google Review Card</h3>
              <p>Turn great meals into 5-star reviews with a single tap.</p>
              <div className="pcard__foot"><span className="price-chip">$45 each</span><button className="link-btn" onClick={() => design("review")}>Design yours ›</button></div>
            </div>
          </Card></Item>

          <Item><Card>
            <div className="pcard__media" style={{ "--tile": "#fafafa" }}>
              <img src="/assets/products/review-coasters-sq.jpg" alt="Review us on Google coasters" loading="lazy" />
            </div>
            <div className="pcard__body">
              <h3>Review Coasters &amp; Stickers</h3>
              <p>Effortless review prompts for tables, counters &amp; takeaway bags.</p>
              <div className="pcard__foot"><span className="price-chip">$15 each</span><button className="link-btn" onClick={() => design("coaster")}>Design yours ›</button></div>
            </div>
          </Card></Item>

          <Item><Card>
            <div className="pcard__media pcard__media--soft">
              <div className="dyo">
                <span className="dyo__t">Design Your Own</span>
                <span className="dyo__nfc"><Waves size={30} /></span>
                <span className="dyo__b">TAP PHONE HERE</span>
              </div>
            </div>
            <div className="pcard__body">
              <h3>NFC Business Cards</h3>
              <p>Share contact, menu, socials &amp; booking in a tap. Matte or metal.</p>
              <div className="pcard__foot"><span className="price-chip">$15 each</span><button className="link-btn" onClick={() => design("card")}>Design yours ›</button></div>
            </div>
          </Card></Item>

          <Item><Card>
            <div className="pcard__media pcard__media--soft">
              <div className="keys">
                <span className="key key--wa"><Chat size={22} /></span>
                <span className="key key--gg"><Gmini size={22} /></span>
                <span className="key key--ig"><Cam size={22} /></span>
                <span className="key key--tap"><Waves size={22} /></span>
              </div>
            </div>
            <div className="pcard__body">
              <h3>NFC Keychains</h3>
              <p>Pocket-sized loyalty &amp; review tools for staff and regulars.</p>
              <div className="pcard__foot"><span className="price-chip">$20 each</span><button className="link-btn" onClick={() => design("keychain")}>Design yours ›</button></div>
            </div>
          </Card></Item>

          <Item><Card>
            <div className="pcard__media" style={{ "--tile": "#f9faf6" }}>
              <img src="/assets/products/nfc-inlay-sq.jpg" alt="NFC sticker inlay" loading="lazy" />
            </div>
            <div className="pcard__body">
              <h3>NFC for Existing Cards</h3>
              <p>Add slim NFC stickers to cards &amp; menus you already own — no reprint.</p>
              <div className="pcard__foot"><span className="price-chip">Add-on</span><a className="link-btn" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Ask us ›</a></div>
            </div>
          </Card></Item>
        </Stagger>
      </div>
    </section>
  );
}
