import type { Team } from '@/types/team';
export default function RoundOverScreen({ winner }: { winner: Team | 'Tie' | null }) {
  return <div className="round-over"><h1>ROUND OVER</h1><p>{winner === 'Tie' ? 'The round ended in a tie.' : winner ? `Winner: Team ${winner}` : 'Round finished.'}</p></div>;
}
