/* iPhone-style frame showing the live NFC product video. */
export default function PhoneMock() {
  return (
    <div className="pm">
      <div className="pm__frame">
        <span className="pmb pmb--silent" />
        <span className="pmb pmb--vup" />
        <span className="pmb pmb--vdn" />
        <span className="pmb pmb--pwr" />
        <div className="pm__display">
          <video
            className="pm__video"
            src="/assets/videos/hero-coaster.mp4"
            poster="/assets/products/coaster-lifestyle.jpg"
            autoPlay muted loop playsInline preload="auto"
          />
          <div className="pm__topgrad" />
          <div className="pm__status">
            <span className="pm__time">9:41</span>
            <span className="pm__ind"><span className="pm__net" /><span className="pm__batt" /></span>
          </div>
          <div className="pm__island" />
        </div>
      </div>
    </div>
  );
}
