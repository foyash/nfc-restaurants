import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { setLenis, scrollTo } from "./lib/smooth";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Configurator from "./components/Configurator";
import Services from "./components/Services";
import WhyNFC from "./components/WhyNFC";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [design, setDesign] = useState(null);
  const [showFab, setShowFab] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  // smooth scroll
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1 });
    setLenis(lenis);
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null); };
  }, []);

  // force muted video autoplay across browsers
  useEffect(() => {
    const play = () => document.querySelectorAll("video").forEach((v) => { v.muted = true; v.play?.().catch(() => {}); });
    play();
    window.addEventListener("load", play);
    ["pointerdown", "touchstart", "keydown"].forEach((e) => window.addEventListener(e, play, { once: true, passive: true }));
    return () => window.removeEventListener("load", play);
  }, []);

  // FAB visibility
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      let near = false;
      if (contact) { const r = contact.getBoundingClientRect(); near = r.top < window.innerHeight && r.bottom > 0; }
      setShowFab(window.scrollY > 720 && !near);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDesign = (id) => setDesign({ id, n: Date.now() });

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Nav />
      <main>
        <Hero />
        <Configurator design={design} />
        <WhyNFC />
        <Products onDesign={onDesign} />
        <Services />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <motion.a
        href="#customize" className="fab"
        onClick={(e) => { e.preventDefault(); scrollTo("#customize"); }}
        initial={{ x: "-50%", y: 120 }}
        animate={{ x: "-50%", y: showFab ? 0 : 120 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        Design your product
      </motion.a>
    </>
  );
}
