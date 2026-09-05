import { useState } from "react";
import Reveal from "./ui/Reveal";

const INTERESTS = [
  "NFC menu & order/pay", "Google review growth", "Business cards / keychains",
  "Bulk order (multiple items)", "Website design", "Social media marketing", "Everything",
];

export default function Contact() {
  const [note, setNote] = useState({ text: "We'll reply within 24 hours. No spam, ever.", ok: false });

  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.restaurant || !data.name || !data.email) {
      setNote({ text: "Please fill in your restaurant, name and email.", ok: false });
      return;
    }
    setNote({ text: `🎉 Thanks ${data.name.split(" ")[0]}! We'll be in touch within 24 hours.`, ok: true });
    e.target.reset();
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
              <div className="field"><label>Restaurant name<input type="text" name="restaurant" placeholder="Your restaurant" required /></label></div>
              <div className="field"><label>Your name<input type="text" name="name" placeholder="Your name" required /></label></div>
              <div className="field"><label>Email<input type="email" name="email" placeholder="you@restaurant.com" required /></label></div>
              <div className="field"><label>What are you interested in?
                <select name="interest">{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>
              </label></div>
              <button type="submit" className="btn btn--primary btn--block btn--lg">Book my free demo</button>
              <p className={`cta__note${note.ok ? " ok" : ""}`}>{note.text}</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
