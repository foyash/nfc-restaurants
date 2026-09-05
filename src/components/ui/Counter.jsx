import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STILL = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");

export default function Counter({ to, duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(STILL ? to : 0);

  useEffect(() => {
    if (STILL || !inView) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{v}</span>;
}
