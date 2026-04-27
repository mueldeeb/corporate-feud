import type { GameState } from '@/types/game';
export function calculateWinner(scores: GameState['scores']): GameState['winner'] {
  if (scores.A > scores.B) return 'A';
  if (scores.B > scores.A) return 'B';
  return 'Tie';
}
