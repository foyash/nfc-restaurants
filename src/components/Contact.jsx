import { useState } from "react";
import Reveal from "./ui/Reveal";

const INTERESTS = [
  "NFC menu & order/pay", "Google review growth", "Business cards / keychains",
  "Bulk order (multiple items)", "Website design", "Social media marketing", "Everything",
];

// Where demo requests are delivered.
// Get a FREE access key at https://web3forms.com using nfctagsupport@gmail.com,
// then set VITE_WEB3FORMS_KEY (Render → Environment) OR paste it below.
// Every submission is then emailed to nfctagsupport@gmail.com.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "624e211a-3710-40d5-ae28-8849b0a1c8a3";
const INBOX = "nfctagsupport@gmail.com";

export default function Contact() {
  const [note, setNote] = useState({ text: "We'll reply within 24 hours. No spam, ever.", ok: false });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // honeypot
    if (!data.restaurant || !data.name || !data.email) {
      setNote({ text: "Please fill in your restaurant, name and email.", ok: false });
      return;
    }
    const thanks = `🎉 Thanks ${data.name.split(" ")[0]}! We'll be in touch within 24 hours.`;

    // Not configured yet → keep it working locally (nothing is sent).
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_ACCESS_KEY") {
      setNote({ text: thanks, ok: true });
      form.reset();
      return;
    }

    setBusy(true);
    setNote({ text: "Sending…", ok: false });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New demo request — ${data.restaurant}`,
          from_name: "NFC Restaurants website",
          Restaurant: data.restaurant,
          Name: data.name,
          Email: data.email,
          "Interested in": data.interest,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNote({ text: thanks, ok: true });
        form.reset();
      } else {
        setNote({ text: `Couldn't send — please email ${INBOX} directly.`, ok: false });
      }
    } catch {
      setNote({ text: `Network error — please email ${INBOX} directly.`, ok: false });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section cta" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="cta__card">
            <div className="cta__glow" aria-hidden="true" />
            <div className="cta__copy">
              <h2>Ready to turn taps into revenue?</h2>
              <p>Book a free 15-minute demo. We'll show you a custom mockup for your restaurant — no commitment.</p>
              <ul className="cta__points">
                <li>Free branded design mockup</li>
                <li>Bulk pricing for multiple items</li>
                <li>Live in about a week</li>
              </ul>
            </div>
            <form className="cta__form" onSubmit={submit} noValidate>
              {/* honeypot (spam trap) */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
              <div className="field"><label>Restaurant name<input type="text" name="restaurant" placeholder="Your restaurant" required /></label></div>
              <div className="field"><label>Your name<input type="text" name="name" placeholder="Your name" required /></label></div>
              <div className="field"><label>Email<input type="email" name="email" placeholder="you@restaurant.com" required /></label></div>
              <div className="field"><label>What are you interested in?
                <select name="interest">{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
              </label></div>
              <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={busy}>
                {busy ? "Sending…" : "Book my free demo"}
              </button>
              <p className={`cta__note${note.ok ? " ok" : ""}`}>{note.text}</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
