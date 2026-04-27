import type { Team } from '@/types/team';
import type { GameState } from '@/types/game';
export default function TeamMessage({ team, state }: { team: Team; state: GameState }) { return <div className="team-message">{team === 'A' ? state.messages.teamA : state.messages.teamB}</div>; }
