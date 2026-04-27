'use client';
import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import { buzz } from '@/lib/game/buzzEngine';
export function useBuzzLock(state: GameState | null, commit: (s: GameState) => void) {
  return (team: Team) => { if (!state) return; commit(buzz(state, team)); };
}
