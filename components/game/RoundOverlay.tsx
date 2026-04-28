'use client';

import { useGameState } from '@/hooks/useGameState';

export default function RoundOverlay({
  onDone
}: {
  onDone: () => void
}) {

  const { state } = useGameState();

  if (!state) return null;

  return (

    <div
      className="round-overlay"
      onAnimationEnd={onDone}
    >

      <div className="round-card">

        <div className="opening-team">
          Team A
        </div>

        <div className="round-circle">

          ROUND

          <br />

          {state.currentRound + 1}

        </div>

        <div className="opening-team">
          Team B
        </div>

      </div>

    </div>
  );
}