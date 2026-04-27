import { CHANNEL_NAME } from '@/constants/defaults';
import type { GameState } from '@/types/game';
export function broadcastState(state: GameState) {
  if (typeof window === 'undefined') return;
  try { const bc = new BroadcastChannel(CHANNEL_NAME); bc.postMessage(state); bc.close(); } catch {}
}
