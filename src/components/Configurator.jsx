import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import ProductPreview from "./ProductPreview";
import { PRODUCTS, productById, pricing, SWATCHES, TAP_MODES } from "../lib/products";
import { scrollTo } from "../lib/smooth";

const EASE = [0.4, 0.1, 0.2, 1];
const STILL = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");

const Nfc = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
    <path d="M8 7a7 7 0 0 1 0 10" /><path d="M11.6 4.5a11 11 0 0 1 0 15" /><path d="M15.2 2a15 15 0 0 1 0 20" />
  </svg>
);

const P = STILL ? new URLSearchParams(window.location.search) : null;
const SAMPLE = "data:image/svg+xml," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'><circle cx='28' cy='40' r='19' fill='none' stroke='#1d1d1f' stroke-width='3'/><text x='28' y='48' font-family='Georgia' font-size='22' text-anchor='middle' fill='#1d1d1f'>P</text><text x='58' y='48' font-family='Georgia' font-size='23' fill='#1d1d1f'>Palace</text></svg>");

export default function Configurator({ design }) {
  const [pid, setPid] = useState(P?.get("prod") || "menu");
  const [logo, setLogo] = useState(P?.has("demologo") ? SAMPLE : null);
  const [logoName, setLogoName] = useState("");
  const [color, setColor] = useState(P?.get("color") || "#0071e3");
  const [surface, setSurface] = useState(P?.get("surface") || "black");
  const [tapMode, setTapMode] = useState("menu");
  const [qty, setQty] = useState(1);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef(null);

  const product = productById(pid);
  const tap = TAP_MODES.find((t) => t.id === tapMode) || TAP_MODES[0];
  const { unit, total, off } = pricing(product.price, qty);
  const stepQty = product.tap ? 6 : 5;

  useEffect(() => { if (design?.id) setPid(design.id); }, [design]);

  const readFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 6 * 1024 * 1024) { alert("Please choose an image under 6 MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => { setLogo(e.target.result); setLogoName(file.name); };
    reader.readAsDataURL(file);
  };
  const onDrop = (e) => { e.preventDefault(); setDrag(false); readFile(e.dataTransfer.files?.[0]); };

  return (
    <section className="section customize" id="customize">
      <div className="wrap">
        <Reveal className="section__head center">
          <span className="kicker">Make it yours</span>
          <h2 className="section__title">Design your product in seconds.</h2>
          <p className="section__lead">Pick a product, upload your logo, choose your finish &amp; color — see a real preview, then get live pricing.</p>
        </Reveal>

        <Reveal>
          <div className="cz">
            {/* controls */}
            <div className="cz__controls">
              <div className="cz__group">
                <span className="cz__label"><i>1</i> Choose a product</span>
                <div className="cz__prods">
                  {PRODUCTS.map((p) => (
                    <button key={p.id} className={`cz-prod${pid === p.id ? " active" : ""}`} onClick={() => setPid(p.id)}>
                      <b>{p.short}</b><span>${p.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cz__group">
                <span className="cz__label"><i>2</i> Upload your logo</span>
                <button
                  className={`cz-upload${logo ? " has" : ""}${drag ? " drag" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={onDrop}
                >
                  {logo ? <img className="cz-upload__thumb" src={logo} alt="" /> : <span className="cz-upload__icon">↑</span>}
                  <span className="cz-upload__txt">
                    <b>{logo ? logoName : "Upload or drop your logo"}</b>
                    <small>{logo ? "Looking good ✓ · click to change" : "PNG, JPG or SVG · transparent PNG looks best"}</small>
                  </span>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => readFile(e.target.files?.[0])} />
                </button>
                {logo && <button className="cz-remove" onClick={() => { setLogo(null); setLogoName(""); if (fileRef.current) fileRef.current.value = ""; }}>Remove logo</button>}
              </div>

              <div className="cz__row2">
                <div className="cz__group">
                  <span className="cz__label"><i>3</i> Finish</span>
                  <div className="cz__surface">
                    <button className={surface === "black" ? "active" : ""} onClick={() => setSurface("black")}><span className="cz-chip cz-chip--k" />Matte Black</button>
                    <button className={surface === "white" ? "active" : ""} onClick={() => setSurface("white")}><span className="cz-chip cz-chip--w" />Arctic White</button>
                  </div>
                </div>
                <div className="cz__group">
                  <span className="cz__label"><i>4</i> Brand color</span>
                  <div className="cz__swatches">
                    {SWATCHES.map((c) => (
                      <button key={c} className={`cz-sw${color === c ? " active" : ""}`} style={{ background: c, color: c }} aria-label={c} onClick={() => setColor(c)} />
                    ))}
                  </div>
                </div>
              </div>

              {product.tap && (
                <div className="cz__group">
                  <span className="cz__label"><i>5</i> A tap opens</span>
                  <div className="cz__tap">
                    {TAP_MODES.map((m) => (
                      <button key={m.id} className={`cz-tap${tapMode === m.id ? " active" : ""}`} onClick={() => setTapMode(m.id)}>
                        {tapMode === m.id && <motion.span layoutId="tapPill" className="cz-tap__pill" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="cz__group">
                <span className="cz__label"><i>{stepQty}</i> Quantity</span>
                <div className="cz-qty">
                  <div className="cz-qty__row">
                    <span><b>{qty}</b> {qty === 1 ? "unit" : "units"}</span>
                    {off > 0 ? <span className="cz-disc">−{off}% bulk discount</span> : <span style={{ color: "var(--muted)" }}>More units, lower price</span>}
                  </div>
                  <input className="cz-range" type="range" min="1" max="100" value={qty} onChange={(e) => setQty(+e.target.value)} />
                </div>
              </div>
            </div>

            {/* preview */}
            <div className="cz__preview">
              <div className="cz__stage">
                <div className="cz__spot" aria-hidden="true" />
                <span className="cz__custom"><b>✦</b> Fully customizable</span>
                <span className="cz__ping" aria-hidden="true"><Nfc size={16} /></span>
                <AnimatePresence mode="wait">
                  <motion.div key={`${product.id}-${surface}`}
                    initial={STILL ? false : { opacity: 0, y: 16, rotateX: -8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -12, rotateX: 6 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="cz__prodwrap"
                  >
                    <ProductPreview product={product} surface={surface} color={color} logo={logo} tap={tap} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="cz__pricebar">
                <div className="cz__pricetop">
                  <div className="cz__priceinfo">
                    <span className="lbl">{product.name} · <span style={{ textTransform: "capitalize" }}>{surface}</span></span>
                    <div className="cz__price">
                      <span className="amt">${unit}</span><small>per unit</small>
                      {off > 0 && <small style={{ textDecoration: "line-through", opacity: .55 }}>${product.price}</small>}
                    </div>
                  </div>
                  <div className="cz__total">{qty} × ${unit}<b>${total.toLocaleString()}</b></div>
                </div>
                <div className="cz__priceactions">
                  <Magnetic strength={0.3}>
                    <a href="#contact" className="btn btn--primary" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>Request this design</a>
                  </Magnetic>
                  <button className="btn btn--soft" onClick={() => scrollTo("#contact")}>Order in bulk ›</button>
                </div>
                <p className="cz__bulknote">Volume pricing: <b>5+ save 10%, 10+ save 20%, 25+ save 30%, 50+ save 40%.</b> Need more? <b>Get in touch</b> for a custom quote.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
