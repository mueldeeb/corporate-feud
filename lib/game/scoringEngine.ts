import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import type { Answer } from '@/types/answer';
export function addAnswerScore(state: GameState, team: Team, answer: Answer): GameState {
  return { ...state, scores: { ...state.scores, [team]: state.scores[team] + answer.points } };
}
export function applySuccessfulSteal(state: GameState, stealingTeam: Team, answer: Answer): GameState {
  const victim = stealingTeam === 'A' ? 'B' : 'A';
  const stolen = state.scores[victim];
  return { ...state, scores: { ...state.scores, [victim]: 0, [stealingTeam]: state.scores[stealingTeam] + stolen + answer.points } };
}
