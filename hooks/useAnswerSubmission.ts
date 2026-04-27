'use client';
import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import { submitAnswer } from '@/lib/game/gameEngine';
export function useAnswerSubmission(state: GameState | null, commit: (s: GameState) => void) {
  return (team: Team, answer: string) => { if (!state) return; commit(submitAnswer(state, team, answer)); };
}
