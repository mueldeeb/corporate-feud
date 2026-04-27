'use client';
import { useEffect, useState } from 'react';
import type { GameState } from '@/types/game';
import { loadGame } from '@/lib/storage/loadGame';
import { saveGame } from '@/lib/storage/saveGame';
import { subscribeToGame } from '@/lib/realtime/listeners';

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null);
  useEffect(() => {
    const first = loadGame();
    if (first) setState(first);
    return subscribeToGame(setState);
  }, []);
  const commit = (next: GameState) => { setState(next); saveGame(next); };
  return { state, setState, commit };
}
