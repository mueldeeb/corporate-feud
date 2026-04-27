import type { Answer } from '@/types/answer';
import { boardOrder } from '@/lib/helpers/sortAnswers';
import AnswerCard from './AnswerCard';

export default function AnswerGrid({
  answers,
}: {
  answers: Answer[];
}) {

  const ordered = boardOrder(answers);

  return (
    <div className="board-wrapper">

      {/* OUTER SHAPE */}
      <div className="board-outer">

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