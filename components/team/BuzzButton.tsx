import type { Team } from '@/types/team';
import type { GameState } from '@/types/game';
export default function BuzzButton({ team, state, onBuzz }: { team: Team; state: GameState; onBuzz: (team: Team)=>void }) {
  const disabled = state.phase !== 'faceoff' || !!state.buzzedTeam || state.locked || state.roundOver;
  return <button className="buzz-button" disabled={disabled} onClick={()=>onBuzz(team)}>BUZZ</button>;
}
