'use client';

import { useGameState } from '@/hooks/useGameState';

import { useRoundTransition } from '@/hooks/useRoundTransition';

import GameBoard from '@/components/game/GameBoard';

import RoundOverlay from '@/components/game/RoundOverlay';

import LoadingLayer from '@/components/shared/LoadingLayer';

export default function GamePage() {

  const {
    state
  } = useGameState();

  const {
    showOpening,
    closeOpening
  } = useRoundTransition();

  if (!state) {

    return null;
  }

  return (

    <>

      {showOpening && (

        <RoundOverlay
          onDone={closeOpening}
        />

      )}

      <GameBoard state={state} />

      {state.locked && (

        <LoadingLayer text="Checking..." />

      )}

    </>

  );
}