import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
export function addStrike(state: GameState, team: Team): GameState {
  return { ...state, strikes: { ...state.strikes, [team]: state.strikes[team] + 1 } };
}
