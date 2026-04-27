export default function RoundOverlay({ onDone }: { onDone: () => void }) {
  return <div className="round-overlay" onAnimationEnd={onDone}><div className="round-card"><div className="opening-team">Team A</div><div className="round-circle">ROUND<br/>1</div><div className="opening-team">Team B</div></div></div>;
}
