import type { Team } from '@/types/team';
import type { GameState } from '@/types/game';
export default function DecisionButtons({ team, state, onDecision }: { team: Team; state: GameState; onDecision: (team: Team, decision: 'play'|'pass')=>void }) {
  if (state.phase !== 'decision' || state.decisionTeam !== team || state.locked || state.roundOver) return null;
  return <div className="decision-buttons"><button className="btn primary" onClick={()=>onDecision(team,'play')}>Play</button><button className="btn secondary" onClick={()=>onDecision(team,'pass')}>Pass</button></div>;
}
