import type { GameState } from '@/types/game';
import { saveGame } from './saveGame';
export function updateGame(state: GameState, updater: (s: GameState) => GameState) { const next = updater(state); saveGame(next); return next; }
