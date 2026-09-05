import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Magnetic from "./ui/Magnetic";
import { scrollTo } from "../lib/smooth";

const LINKS = [
  ["Design yours", "#customize"],
  ["Why NFC", "#why"],
  ["Products", "#products"],
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

function Logo() {
  return (
    <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); scrollTo(0); }}>
      <span className="brand__mark">
        <svg viewBox="0 0 48 48" width="26" height="26" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#1d1d1f" />
          <g fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round">
            <path d="M19 15a18 18 0 0 1 0 18" /><path d="M26 11a26 26 0 0 1 0 26" /><path d="M33 7a34 34 0 0 1 0 34" />
          </g>
          <circle cx="14" cy="24" r="3" fill="#fff" />
        </svg>
      </span>
      <span className="brand__txt">NFC&nbsp;Restaurants</span>
    </a>
  );
}
export { Logo };

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const secs = LINKS.map(([, h]) => document.getElementById(h.slice(1))).filter(Boolean);
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e, href) => { e.preventDefault(); setOpen(false); scrollTo(href); };

  return (
    <>
      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav__cap">
          <Logo />
          <nav className="nav__links">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} className={active === href ? "is-active" : ""} onClick={(e) => go(e, href)}>
                {active === href && <motion.span layoutId="navpill" className="nav__pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="nav__cta">
            <Magnetic strength={0.4}>
              <a href="#contact" className="btn btn--primary btn--sm" onClick={(e) => go(e, "#contact")}>
                Book a demo <span className="btn__arrow">→</span>
              </a>
            </Magnetic>
          </div>
          <button className={`burger${open ? " open" : ""}`} aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            {LINKS.map(([label, href], i) => (
              <motion.a key={href} href={href} onClick={(e) => go(e, href)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>{label}</motion.a>
            ))}
            <a href="#contact" className="btn btn--primary btn--lg" style={{ marginTop: "1.2rem" }} onClick={(e) => go(e, "#contact")}>Book a demo</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
