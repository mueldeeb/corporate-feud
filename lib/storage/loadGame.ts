import { STORAGE_KEY } from '@/constants/defaults';
import type { GameState } from '@/types/game';
export function loadGame(): GameState | null {
  if (typeof window === 'undefined') return null;
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
