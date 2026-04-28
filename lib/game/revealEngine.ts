import type { GameState } from '@/types/game';

import type { Team } from '@/types/team';

import { isMinorVariation } from './normalization';

function getAnswers(
  state: GameState
) {

  return state.rounds[
    state.currentRound
  ].answers;
}

export function findMatchingHiddenAnswer(
  state: GameState,
  input: string
) {

  return getAnswers(state).find(

    a =>

      !a.revealed &&

      isMinorVariation(
        input,
        a.text
      )

  ) || null;
}

export function revealAnswer(
  state: GameState,
  answerId: string,
  team: Team
): GameState {

  const updatedRounds = [
    ...state.rounds
  ];

  updatedRounds[state.currentRound] = {

    ...updatedRounds[state.currentRound],

    answers:

      updatedRounds[state.currentRound]
      .answers
      .map(a=>

        a.id === answerId

          ? {
              ...a,

              revealed: true,

              revealedBy: team
            }

          : a
      )
  };

  return {

    ...state,

    rounds: updatedRounds
  };
}

export function allAnswersRevealed(
  state: GameState
) {

  return getAnswers(state).every(
    a => a.revealed
  );
}