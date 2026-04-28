'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import type { AnswerDraft } from '@/types/answer';

import { ANSWER_COUNT } from '@/constants/limits';

import { makeInitialState } from '@/constants/defaults';

import { normalizeAnswer } from '@/lib/game/normalization';

import { validateCreateForm } from '@/lib/game/validation';

import { calculateTotal } from '@/lib/helpers/calculateTotal';

import { saveGame } from '@/lib/storage/saveGame';

import AnswerInput from './AnswerInput';

import ScoreInput from './ScoreInput';

import ValidationErrors from './ValidationErrors';

import StartGameButton from './StartGameButton';

type RoundDraft = {
  question: string;

  answers: AnswerDraft[];
};

const createEmptyAnswers = () =>

  Array.from(
    { length: ANSWER_COUNT },
    () => ({
      text: '',
      points: ''
    })
  );

const createEmptyRound = (): RoundDraft => ({
  question: '',

  answers: createEmptyAnswers()
});

export default function QuestionForm() {

  const router = useRouter();

  const [rounds, setRounds] = useState<RoundDraft[]>([
    createEmptyRound()
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  function addRound() {

    setRounds(prev => [

      ...prev,

      createEmptyRound()

    ]);
  }

  function startGame(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const firstRound = rounds[0];

    const validation = validateCreateForm(
      firstRound.question,
      firstRound.answers
    );

    setErrors(validation);

    if (validation.length) return;

    const finalRounds = rounds.map(
      (round,roundIndex)=>({

        id: `round-${roundIndex+1}`,

        question: round.question.trim(),

        answers: round.answers
          .map((a,i)=>({

            id: `answer-${i+1}`,

            text: a.text.trim(),

            points: Number(a.points),

            normalized: normalizeAnswer(a.text),

            revealed: false,

            revealedBy: null

          }))
          .sort((a,b)=>b.points-a.points)

      })
    );

    saveGame(
      makeInitialState(finalRounds)
    );

    router.push('/game');
  }

  return (

    <form
      className="create-form"
      onSubmit={startGame}
    >

      {rounds.map((round,roundIndex)=>(

        <div
          key={roundIndex}

          className="round-block"
        >

          <h2 className="round-title">
            Round {roundIndex + 1}
          </h2>

          <label className="field-label">
            Question
          </label>

          <input
            className="question-input"

            value={round.question}

            onChange={e=>

              setRounds(prev => {

                const updated = [...prev];

                updated[roundIndex].question =
                  e.target.value;

                return updated;
              })

            }

            placeholder="Enter the main survey question"
          />

          <div className="answers-create-grid">

            {round.answers.map((a,i)=>

              <AnswerInput
                key={i}

                index={i}

                value={a}

                onChange={next=>{

                  setRounds(prev => {

                    const updated = [...prev];

                    updated[roundIndex].answers =
                      updated[roundIndex].answers.map(
                        (ans,ai)=>
                          ai===i ? next : ans
                      );

                    return updated;
                  });

                }}
              />

            )}

          </div>

          <ScoreInput
            total={
              calculateTotal(round.answers)
            }
          />

        </div>

      ))}

      <ValidationErrors errors={errors} />

      <button
        type="button"

        className="btn secondary"

        onClick={addRound}
      >
        + Add Round
      </button>

      <StartGameButton />

    </form>
  );
}