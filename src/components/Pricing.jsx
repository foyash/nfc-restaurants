import { motion } from "framer-motion";
import Reveal, { Stagger, Item } from "./ui/Reveal";
import { scrollTo } from "../lib/smooth";

const TIERS = [
  {
    name: "Starter", for: "Individual NFC products for a single location.",
    amt: "$20–$45", unit: "each",
    hint: "Final price depends on product & quantity — more units, lower price.",
    features: ["Menu stands, review cards & coasters", "Business cards & keychains", "Your logo, colors & links", "Design mockup before printing"],
    cta: ["Design a product", "#customize", "btn--soft"],
  },
  {
    name: "Growth", pop: true, for: "A full contactless setup for a busy restaurant.",
    amt: "$80–$200", unit: "",
    hint: "Bundle of stands, cards & coasters — priced by what you need.",
    features: ["Everything in Starter", "Multiple products, bulk pricing", "Google review growth setup", "Digital menu & website starter"],
    cta: ["Get a quote", "#contact", "btn--primary"],
  },
  {
    name: "Full Service", for: "Chains, multi-location brands & marketing.",
    amt: "Let's talk", talk: true, unit: "",
    hint: "Custom hardware volumes, websites & ongoing marketing.",
    features: ["Everything in Growth", "Social media marketing", "Full website build", "Multi-location rollout"],
    cta: ["Get in touch", "#contact", "btn--soft"],
  },
];

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <Reveal className="section__head center">
          <span className="kicker">Pricing</span>
          <h2 className="section__title">Simple pricing that scales with you.</h2>
          <p className="section__lead">Per-item pricing that drops as your quantity grows. Need a full setup or multiple locations? Let's talk.</p>
        </Reveal>
        <Stagger className="ptiers">
          {TIERS.map((t) => (
            <Item key={t.name}>
              <motion.article className={`ptier${t.pop ? " ptier--pop" : ""}`} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                {t.pop && <span className="ptier__flag">Most popular</span>}
                <h3>{t.name}</h3>
                <p className="ptier__for">{t.for}</p>
                <div className="ptier__price">
                  <span className={`ptier__amt${t.talk ? " ptier__amt--talk" : ""}`}>{t.amt}</span>
                  {t.unit && <span className="ptier__unit">{t.unit}</span>}
                </div>
                <p className="ptier__hint">{t.hint}</p>
                <ul className="ticks">{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href={t.cta[1]} className={`btn ${t.cta[2]} btn--block`} onClick={(e) => { e.preventDefault(); scrollTo(t.cta[1]); }}>{t.cta[0]}</a>
              </motion.article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
