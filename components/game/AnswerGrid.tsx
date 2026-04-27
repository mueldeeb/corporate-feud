import type { Answer } from '@/types/answer';
import { boardOrder } from '@/lib/helpers/sortAnswers';
import AnswerCard from './AnswerCard';

export default function AnswerGrid({
  answers,
  teamAScore,
  teamBScore,
}: {
  answers: Answer[];
  teamAScore: number;
  teamBScore: number;
}) {

  const ordered = boardOrder(answers);

  return (
    <div className="board-wrapper">

      {/* OUTER SHAPE */}
      <div className="board-outer">

   {/* Wing Scores*/}
        <div className="wing-score left-score">
  {teamAScore}
</div>

<div className="wing-score right-score">
  {teamBScore}
</div>

        {/* LIGHT DOTS */}
        <div className="board-dots"></div>

        {/* INNER BLACK BOARD */}
        <div className="board-inner">

          <div className="answer-grid">
            {ordered.map((a, i) => (
              <AnswerCard
                answer={a}
                index={i}
                key={a.id}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}