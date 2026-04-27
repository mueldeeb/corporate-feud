export default function ScoreInput({ total }: { total: number }) { return <div className={`total-points ${total === 100 ? 'ok' : ''}`}>Total Points: {total}/100</div>; }
