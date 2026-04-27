import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import { otherTeam } from '@/lib/helpers/otherTeam';
export function buzz(state: GameState, team: Team): GameState {
  if (state.phase !== 'faceoff' || state.buzzedTeam || state.locked || state.roundOver) return state;
  const other = otherTeam(team);
  return {
    ...state,
    buzzedTeam: team,
    currentTeam: team,
    messages: {
      game: `Team ${team} buzzed first. Team ${team} is answering now.`,
      teamA: team === 'A' ? 'You buzzed first. Submit your answer now.' : `Team ${team} buzzed first. Wait for your turn.`,
      teamB: team === 'B' ? 'You buzzed first. Submit your answer now.' : `Team ${team} buzzed first. Wait for your turn.`,
    },
  };
}
