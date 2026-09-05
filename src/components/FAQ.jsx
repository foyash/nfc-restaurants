import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { scrollTo } from "../lib/smooth";

const QA = [
  ["Do my guests need to download an app?", "No. A tap or scan opens your menu, payment or review page right in the phone's browser. Nothing to install."],
  ["Does NFC work on iPhone and Android?", "Yes. All modern iPhones (XR and newer) and virtually all Android phones read NFC. Every product also has a QR code as a universal backup."],
  ["Can I update my menu and prices later?", "Anytime, in seconds — no reprinting. The NFC tag points to your live menu, so changes are instant."],
  ["How does pricing work for multiple items?", "Single items start at $15–$45 each depending on the product. The per-unit price drops as your quantity increases — 5+ save 10%, 10+ save 20%, 25+ save 30%, 50+ save 40%."],
  ["I already have menus and cards — can you upgrade them?", "Yes. We add slim NFC stickers to your existing cards and signage so they accept a tap, no reprint required."],
  ["How fast is setup?", "Most single locations are live within a week of approving the design. We handle printing and programming for you."],
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq__grid">
        <Reveal className="faq__intro">
          <span className="kicker">FAQ</span>
          <h2 className="section__title">Good questions, answered.</h2>
          <p className="section__lead">Still curious? <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Talk to us ›</a></p>
        </Reveal>
        <Reveal className="faq__list">
          {QA.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`acc${isOpen ? " open" : ""}`} key={i}>
                <button className="acc__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  {q}<span className="acc__i" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="acc__a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0.1, 0.2, 1] }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
