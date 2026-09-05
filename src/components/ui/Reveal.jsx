import { motion } from "framer-motion";

const EASE = [0.4, 0.1, 0.2, 1];
// capture-safe: ?still renders final state with no scroll animation
const STILL = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");

export default function Reveal({ children, delay = 0, y = 26, className, once = true }) {
  if (STILL) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, gap = 0.08 }) {
  if (STILL) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className, y = 26 }) {
  if (STILL) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}
