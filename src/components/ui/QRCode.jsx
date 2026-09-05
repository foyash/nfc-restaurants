// A realistic-looking QR code (decorative — not scannable). Proper finder
// patterns, separators, timing rows and a deterministic module fill.
export default function QRCode({ size = 56, fg = "#0b0b0d", bg = "#ffffff", radius = 7 }) {
  const N = 25;
  const cell = size / N;

  const finder = (r, c) => {
    for (const [R, C] of [[0, 0], [0, N - 7], [N - 7, 0]]) {
      if (r >= R && r < R + 7 && c >= C && c < C + 7) {
        const rr = r - R, cc = c - C;
        const border = rr === 0 || rr === 6 || cc === 0 || cc === 6;
        const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
        return { hit: true, on: border || core };
      }
    }
    return { hit: false };
  };

  const rects = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      let on;
      if (f.hit) on = f.on;
      else if (r === 6 || c === 6) on = (r + c) % 2 === 0;         // timing
      else on = ((r * 29 + c * 19 + ((r * c * 13) % 23)) % 7) < 3; // data (deterministic)
      if (on) rects.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell * 1.05} height={cell * 1.05} fill={fg} />);
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" style={{ borderRadius: radius, background: bg, display: "block" }}>
      {rects}
    </svg>
  );
}
