import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "./ui/Magnetic";
import PhoneMock from "./PhoneMock";
import { scrollTo } from "../lib/smooth";

const EASE = [0.4, 0.1, 0.2, 1];
const line1 = ["Menus,", "reviews", "&", "websites."];

const STILL = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");
const init = (v) => (STILL ? false : v);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // background video fades into the solid page color as you scroll through the hero
  const fade = useTransform(scrollYProgress, [0, 0.82], [0, 1]);
  const vidScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.24]);
  const vidY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section className="hero" id="top" ref={ref}>
      {/* full-bleed background video */}
      <div className="hero__bg" aria-hidden="true">
        <motion.video
          style={{ scale: vidScale, y: vidY }}
          src="/assets/videos/hero-coaster.mp4"
          poster="/assets/products/coaster-lifestyle.jpg"
          autoPlay muted loop playsInline preload="auto"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <motion.div className="hero__fade" aria-hidden="true" style={{ opacity: STILL ? 0 : fade }} />

      <div className="wrap hero__inner">
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <motion.span className="eyebrow" initial={init({ opacity: 0, y: 12 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="dot" /> Contactless restaurant tech
          </motion.span>

          <h1 className="hero__title">
            <span>
              {line1.map((w, i) => (
                <motion.span className="word" key={i} style={{ marginRight: "0.28em" }}
                  initial={init({ opacity: 0, y: "0.5em" })} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}>
                  {w}
                </motion.span>
              ))}
            </span>
            <br />
            <motion.span className="soft" initial={init({ opacity: 0, y: "0.5em" })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}>
              A tap away.
            </motion.span>
          </h1>

          <motion.p className="hero__sub" initial={init({ opacity: 0, y: 14 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            One tap on a beautifully branded NFC product opens your menu, takes the order, collects payment, and turns happy guests into 5-star Google reviews.
          </motion.p>

          <motion.div className="hero__actions" initial={init({ opacity: 0, y: 14 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72 }}>
            <Magnetic strength={0.4}>
              <a href="#customize" className="btn btn--primary btn--lg" onClick={(e) => { e.preventDefault(); scrollTo("#customize"); }}>Design your product</a>
            </Magnetic>
            <a href="#products" className="btn btn--light btn--lg" onClick={(e) => { e.preventDefault(); scrollTo("#products"); }}>Explore products ›</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero__phone" style={{ y: phoneY }}
          initial={init({ opacity: 0, scale: 0.94 })} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
          <PhoneMock />
          <motion.div className="floaty floaty--a"
            animate={STILL ? {} : { y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="g" /> New 5-star review
          </motion.div>
          <motion.div className="floaty floaty--b"
            animate={STILL ? {} : { y: [0, 9, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
            Paid in 8s
          </motion.div>
        </motion.div>
      </div>

      <div className="wrap hero__features">
        <ul className="features">
          <li><b>No app</b> to download</li>
          <li>Works on <b>iPhone &amp; Android</b></li>
          <li><b>Tap</b> or <b>Scan</b></li>
          <li>Live in about <b>a week</b></li>
        </ul>
      </div>
    </section>
  );
}
