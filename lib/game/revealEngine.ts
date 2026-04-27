import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import { isMinorVariation } from './normalization';
export function findMatchingHiddenAnswer(state: GameState, input: string) {
  return state.answers.find(a => !a.revealed && isMinorVariation(input, a.text)) || null;
}
export function revealAnswer(state: GameState, answerId: string, team: Team): GameState {
  return { ...state, answers: state.answers.map(a => a.id === answerId ? { ...a, revealed: true, revealedBy: team } : a) };
}
export function allAnswersRevealed(state: GameState) { return state.answers.every(a => a.revealed); }
