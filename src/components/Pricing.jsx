import { motion } from "framer-motion";
import Reveal, { Stagger, Item } from "./ui/Reveal";
import { scrollTo } from "../lib/smooth";

const TIERS = [
  {
    name: "Ready-made", for: "Standard designs, ships fast — the lowest cost.",
    amt: "From $8", unit: "each",
    prices: [["Menu / review stand", "$25"], ["Coasters & stickers", "$8"], ["Business card", "$8"], ["Keychain", "$12"]],
    features: ["Pre-printed “Scan menu” & “Review on Google”", "No design setup — ships fast", "Great to try it out or for tight budgets"],
    cta: ["Order ready-made", "#contact", "btn--soft"],
  },
  {
    name: "Custom-branded", pop: true, for: "Your logo, colors & links on every piece.",
    amt: "From $15", unit: "each",
    prices: [["Menu stand", "$45"], ["Google review card", "$45"], ["Coasters & stickers", "$15"], ["Business card", "$15"], ["Keychain", "$20"]],
    bulk: "Bulk discounts: 5+ save 10% · 10+ 20% · 25+ 30% · 50+ 40%",
    features: ["Fully branded — approve a mockup first", "Menu, order & pay, review growth", "Reprogram your links anytime"],
    cta: ["Design yours", "#customize", "btn--primary"],
  },
  {
    name: "Full Service", for: "Chains, websites & ongoing marketing.",
    amt: "Let's talk", talk: true, unit: "",
    features: ["Everything in Custom-branded", "Full website build", "Social media marketing", "Multi-location rollout & bulk pricing"],
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
          <p className="section__lead">Two product lines — <b>ready-made</b> for the lowest cost, or <b>custom-branded</b> to your brand. Full service for chains &amp; marketing.</p>
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
                {t.prices && (
                  <ul className="ptier__list">
                    {t.prices.map(([l, p]) => <li key={l}><span>{l}</span><b>{p}</b></li>)}
                  </ul>
                )}
                {t.bulk && <p className="ptier__bulk">{t.bulk}</p>}
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
