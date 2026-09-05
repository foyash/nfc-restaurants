import QRCode from "./ui/QRCode";
import { displayAccent } from "../lib/smooth";

/* hand holding a phone with NFC waves — matches the real product artwork */
const HandPhone = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M45 21a13 13 0 0 1 0 22" opacity=".9" />
    <path d="M50 16a20 20 0 0 1 0 32" opacity=".9" />
    <g transform="rotate(-13 28 30)">
      <rect x="18" y="12" width="20" height="35" rx="4.5" />
      <text x="28" y="33" fontSize="6.5" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle" letterSpacing="0.3">NFC</text>
    </g>
    <path d="M13 39c-2.4 1.4-3.2 4.6-1.8 7.4C12.4 49 15 50.5 18 50.5h11c3.3 0 5.8-1.8 6.8-4.6" />
    <path d="M18 41.5v6.5M23 42.5v6.5M28 42.8v6.2" />
  </svg>
);

/* serving cloche + cutlery — the "Enjoy your food" graphic */
const Cloche = ({ size = 58 }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 80 58" fill="currentColor" aria-hidden="true">
    <circle cx="40" cy="12" r="2.6" />
    <path d="M40 15.5c-11 0-20 8.5-20 19H60c0-10.5-9-19-20-19z" />
    <rect x="16" y="35.5" width="48" height="3.6" rx="1.8" />
    {/* fork */}
    <g><path d="M10 15v9c0 1.6 1 2.4 2 2.6V44h2.2V26.6c1-.2 2-1 2-2.6v-9h-1.4v7.2h-1V15h-1.4v7.2h-1V15z" /></g>
    {/* spoon */}
    <g><path d="M69 15c-2.4 0-4 2.6-4 6 0 2.6 1.2 4.4 2.9 4.9V44H70V25.9c1.8-.5 3-2.3 3-4.9 0-3.4-1.6-6-4-6z" /></g>
  </svg>
);

const Waves = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">
    <path d="M7 8a8 8 0 0 1 0 8" /><path d="M11 5a13 13 0 0 1 0 14" /><path d="M15 2.5a18 18 0 0 1 0 19" />
  </svg>
);

const GoogleG = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.8-6.8C35.9 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5C43.4 37.9 46.1 31.8 46.1 24.5z" />
    <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6l-7.9-6.2C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.2z" />
    <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.1-5.5c-2 1.3-4.5 2.1-8.5 2.1-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

const GoogleBar = () => (
  <div className="rp__gbar"><i style={{ background: "#4285F4" }} /><i style={{ background: "#34A853" }} /><i style={{ background: "#FBBC05" }} /><i style={{ background: "#EA4335" }} /></div>
);

const Stars = ({ s = 15 }) => <span className="rp__stars" style={{ fontSize: s }}>★★★★★</span>;

function Logo({ logo, ph = "Your Logo" }) {
  return (
    <div className={`rp__logo${logo ? " has" : ""}`}>
      {logo ? <img src={logo} alt="Your logo" /> : <span>{ph}</span>}
    </div>
  );
}

const TapScan = ({ tapLabel = "Tap", scanLabel = "Scan" }) => (
  <div className="rp__cta">
    <div className="rp__ico"><span className="rp__hp"><HandPhone size={40} /></span><small>{tapLabel}</small></div>
    <span className="rp__or">or</span>
    <div className="rp__ico"><span className="rp__qr"><QRCode size={52} fg="#0b0b0d" /></span><small>{scanLabel}</small></div>
  </div>
);

export default function ProductPreview({ product, surface = "black", color = "#0071e3", logo, tap }) {
  const accent = surface === "black" ? displayAccent(color) : color;
  const cls = `rp rp--${product.shape} ${surface === "white" ? "is-white" : "is-black"}`;
  const style = { "--accent": accent };

  // ---- MENU STAND ----
  if (product.shape === "stand" && product.variant !== "review") {
    return (
      <div className={cls} style={style}>
        <div className="rp__panel">
          <div className="rp__gloss" />
          <Logo logo={logo} />
          <div className="rp__mtitle">{tap?.title || "View Our Menu"}</div>
          <div className="rp__msub">{tap?.sub || "Order & Pay"}</div>
          <div className="rp__graphic">
            <span className="rp__cloche"><Cloche size={54} /></span>
            <span className="rp__enjoy">Enjoy your food</span>
          </div>
          <TapScan />
        </div>
        <div className="rp__foot" />
        <div className="rp__contact" />
      </div>
    );
  }

  // ---- REVIEW STAND ----
  if (product.shape === "stand") {
    return (
      <div className={cls} style={style}>
        <div className="rp__panel rp__panel--review">
          <div className="rp__gloss" />
          <div className="rp__rtitle">We'd love your feedback</div>
          <GoogleG size={46} />
          <Stars s={20} />
          <TapScan tapLabel="Tap your phone" scanLabel="Scan QR Code" />
          <GoogleBar />
        </div>
        <div className="rp__foot" />
        <div className="rp__contact" />
      </div>
    );
  }

  // ---- COASTER ----
  if (product.shape === "coaster") {
    return (
      <div className={cls} style={style}>
        <div className="rp__disc">
          <div className="rp__gloss rp__gloss--round" />
          <GoogleG size={36} />
          <Stars s={17} />
          <span className="rp__reviewon">Review us on <b>Google</b></span>
        </div>
        <div className="rp__contact rp__contact--round" />
      </div>
    );
  }

  // ---- BUSINESS CARD ----
  if (product.shape === "card") {
    return (
      <div className={cls} style={style}>
        <div className="rp__card">
          <div className="rp__gloss" />
          <div className="rp__cardtop">
            <Logo logo={logo} ph="Your Logo" />
            <span className="rp__tapphone"><HandPhone size={34} /></span>
          </div>
          <div className="rp__cardbottom">
            <div className="rp__cardname">Your Restaurant</div>
            <div className="rp__cardsub">Tap phone here for menu &amp; contact</div>
          </div>
        </div>
        <div className="rp__contact rp__contact--card" />
      </div>
    );
  }

  // ---- KEYCHAIN (round, with ring + chain) ----
  return (
    <div className={cls} style={style}>
      <div className="rp__chain"><i /><i /><i /><i /></div>
      <div className="rp__ring" />
      <div className="rp__kdisc">
        <div className="rp__gloss rp__gloss--round" />
        {logo ? <Logo logo={logo} ph="Logo" /> : (<><GoogleG size={28} /><span className="rp__reviewon rp__reviewon--sm">Review us on <b>Google</b></span></>)}
        <div className="rp__ktap"><span className="rp__nfc"><Waves size={20} /></span><small>TAP</small></div>
      </div>
      <div className="rp__contact rp__contact--fob" />
    </div>
  );
}
