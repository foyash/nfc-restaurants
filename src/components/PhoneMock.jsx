import { motion } from "framer-motion";

const STILL = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");

/* Phone showing the live NFC product video, with floating status chips. */
export default function PhoneMock() {
  return (
    <div className="pm">
      <div className="pm__frame">
        <div className="pm__notch" />
        <div className="pm__display">
          <video
            className="pm__video"
            src="/assets/videos/hero-coaster.mp4"
            poster="/assets/products/coaster-lifestyle.jpg"
            autoPlay muted loop playsInline preload="auto"
          />
          <div className="pm__topgrad" />
          <div className="pm__status"><span>9:41</span><span className="pm__sig" /></div>
          <motion.div className="pm__toast"
            initial={STILL ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}>
            <span className="pm__toast-g">★</span>
            <div><b>New 5-star review</b><small>Tap → Google · just now</small></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
