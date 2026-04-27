import { CHANNEL_NAME } from '@/constants/defaults';
import type { GameState } from '@/types/game';
import { loadGame } from '@/lib/storage/loadGame';
export function subscribeToGame(callback: (state: GameState) => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = () => { const s = loadGame(); if (s) callback(s); };
  window.addEventListener('storage', onStorage);
  const interval = window.setInterval(onStorage, 350);
  let bc: BroadcastChannel | null = null;
  try { bc = new BroadcastChannel(CHANNEL_NAME); bc.onmessage = e => callback(e.data); } catch {}
  return () => { window.removeEventListener('storage', onStorage); window.clearInterval(interval); bc?.close(); };
}
