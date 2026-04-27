import type { Team } from '@/types/team';
import type { GameState } from '@/types/game';
import PhaseBar from '@/components/game/PhaseBar';
export default function TeamStatus({ team, state }: { team: Team; state: GameState }) { return <div className="team-status"><h1>Team {team}</h1><div className="mini-score">Score: {state.scores[team]}</div><div className="mini-strikes">Strikes: {'X'.repeat(state.strikes[team]) || 'None'}</div><PhaseBar phase={state.phase} /></div>; }
