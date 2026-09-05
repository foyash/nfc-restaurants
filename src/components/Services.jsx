import Reveal, { Stagger, Item } from "./ui/Reveal";

const CARDS = [
  { wide: true, icon: "🍽️", h: "Digital Menus & Order + Pay", p: "A fast, mobile-first menu you can update in seconds. Add photos, dietary tags, specials and table-side payment." },
  { icon: "⭐", h: "Google Review Growth", p: "Systematically turn diners into 5-star reviews and climb the local rankings." },
  { icon: "🌐", h: "Website Design", p: "Modern, fast restaurant websites with menus, hours, directions & reservations." },
  { dark: true, icon: "📱", h: "Social Media Marketing", p: "Content, reels and ads that fill tables — managed for you, month after month." },
  { icon: "🔖", h: "NFC Upgrades", p: "Add NFC to the cards, menus and signage you already own." },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal className="section__head center">
          <span className="kicker">Beyond the hardware</span>
          <h2 className="section__title">A full growth toolkit for your restaurant.</h2>
          <p className="section__lead">We don't just ship products — we help you get found, get booked and get reviewed.</p>
        </Reveal>
        <Stagger className="bento">
          {CARDS.map((c, i) => (
            <Item key={i} className={`scard${c.wide ? " scard--wide" : ""}${c.dark ? " scard--dark" : ""}`}>
              <div className="scard__icon">{c.icon}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
