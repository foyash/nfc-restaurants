import Reveal, { Stagger, Item } from "./ui/Reveal";
import Counter from "./ui/Counter";

const STATS = [
  { to: 3, suf: "×", p: "more Google reviews collected vs. asking manually" },
  { to: 8, suf: "s", p: "average time from tap to a placed order" },
  { to: 0, suf: "apps", p: "nothing to download — it opens in the browser" },
  { to: 100, suf: "%", p: "customizable to match your restaurant's brand" },
];

export default function WhyNFC() {
  return (
    <section className="section why on-dark" id="why">
      <div className="wrap">
        <Reveal className="section__head center">
          <span className="kicker kicker--light">Why it works</span>
          <h2 className="section__title">A tap beats a scan — every time.</h2>
          <p className="section__lead">QR codes still work as a backup. But a tap is faster, feels premium, and gets used far more often.</p>
        </Reveal>

        <Reveal>
          <div className="why__video">
            <video src="/assets/videos/qr-vs-nfc.mp4" poster="/assets/products/qr-vs-nfc.jpg" autoPlay muted loop playsInline preload="auto" />
          </div>
        </Reveal>

        <Stagger className="why__stats">
          {STATS.map((s, i) => (
            <Item className="stat" key={i}>
              <b><Counter to={s.to} /></b><span className="suf">{s.suf}</span>
              <p>{s.p}</p>
            </Item>
          ))}
        </Stagger>
        <Reveal className="why__note">
          <p>*Figures are illustrative ranges from contactless-ordering studies — your results depend on menu, staff and volume.</p>
        </Reveal>
      </div>
    </section>
  );
}
