'use client';

import type { GamePhase } from '@/types/phase';

import { useGameState } from '@/hooks/useGameState';

import { saveGame } from '@/lib/storage/saveGame';

import '@/styles/host.css';

export default function HostPage() {

  const {
    state,
    setState
  } = useGameState();

  if (!state) {

    return (

      <main className="host-shell">

        <div className="host-empty">
          No Active Game
        </div>

      </main>
    );
  }

  const currentRoundData =
    state.rounds[state.currentRound];

  const isLastRound =
    state.currentRound >=
    state.rounds.length - 1;

  function nextRound() {

    if (isLastRound) return;

    setState(prev => {

      if (!prev) return prev;

      const updatedState = {

        ...prev,

        currentRound:
          prev.currentRound + 1,

        roundOver: false,

        phase: 'faceoff' as GamePhase,

        buzzedTeam: null,

        currentTeam: null,

        decisionTeam: null,

        playingTeam: null,

        stealingTeam: null,

        locked: false,

        strikes: {
          A: 0,
          B: 0
        },

        faceOffAnswers: {
          A: null,
          B: null
        },

        lastSubmittedAnswer: '',

        messages: {

          game:
            'Waiting for the first buzz.',

          teamA:
            'Get ready. Buzz first to answer.',

          teamB:
            'Get ready. Buzz first to answer.',
        }
      };

      saveGame(updatedState);

      return updatedState;
    });
  }

  return (

    <main className="host-shell">

      <div className="host-header">

        <div>

          <div className="host-badge">
            LIVE HOST PANEL
          </div>

          <h1>
            Corporate Feud
          </h1>

          <p>
            Real-Time Host Control Center
          </p>

        </div>

        <div className="host-round-box">

          <span>
            ROUND
          </span>

          <strong>
            {state.currentRound + 1}
          </strong>

        </div>

      </div>

      <section className="host-main-grid">

        <div className="host-card host-question-card">

          <div className="host-card-label">
            CURRENT QUESTION
          </div>

          <h2>
            {currentRoundData.question}
          </h2>

          <div className="host-answer-grid">

            {currentRoundData.answers.map((answer,index)=>(

              <div
                key={answer.id}
                className="host-answer-card"
              >

                <div className="host-answer-number">
                  {index + 1}
                </div>

                <div className="host-answer-content">

                  <span>
                    {answer.text}
                  </span>

                  <strong>
                    {answer.points}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="host-sidebar">

          <div className="host-card">

            <div className="host-card-label">
              GAME STATUS
            </div>

            <div className="host-status-item">

              <span>
                Team A
              </span>

              <strong>
                {state.scores.A}
              </strong>

            </div>

            <div className="host-status-item">

              <span>
                Team B
              </span>

              <strong>
                {state.scores.B}
              </strong>

            </div>

            <div className="host-status-item">

              <span>
                Phase
              </span>

              <strong>
                {state.phase}
              </strong>

            </div>

          </div>

          <div className="host-card">

            <div className="host-card-label">
              CONTROLS
            </div>

            <button
              className="host-btn primary"
              onClick={nextRound}
              disabled={isLastRound}
            >
              NEXT ROUND
            </button>

            <button
              className="host-btn secondary"
              onClick={()=>location.href='/game'}
            >
              OPEN GAME SCREEN
            </button>

            <button
              className="host-btn secondary"
              onClick={()=>location.href='/team1'}
            >
              OPEN TEAM A
            </button>

            <button
              className="host-btn secondary"
              onClick={()=>location.href='/team2'}
            >
              OPEN TEAM B
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}