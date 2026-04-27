import { STORAGE_KEY, SIGNAL_KEY } from '@/constants/defaults';
import type { GameState } from '@/types/game';
import { broadcastState } from '@/lib/realtime/broadcast';
export function saveGame(state: GameState) {
  if (typeof window === 'undefined') return;
  const next = { ...state, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  localStorage.setItem(SIGNAL_KEY, String(Date.now()));
  broadcastState(next);
}
