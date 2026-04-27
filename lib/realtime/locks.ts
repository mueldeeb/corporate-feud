import type { GameState } from '@/types/game';
export function isInputLocked(state: GameState | null) { return !state || state.locked || state.roundOver; }
