import type { Answer } from '@/types/answer';

export default function AnswerCard({
  answer,
  index,
}: {
  answer: Answer;
  index: number;
}) {
  return (
    <div className={`answer-card ${answer.revealed ? 'revealed' : ''}`}>
      
      {!answer.revealed && (
        <div className="answer-inner">
          <div className="answer-pill">
            <span className="answer-number">{index + 1}</span>
          </div>
        </div>
      )}

      {answer.revealed && (
        <div className="answer-reveal">
          <span className="answer-text">{answer.text}</span>

          <div className="answer-points-box">
            <strong>{answer.points}</strong>
          </div>
        </div>
      )}
    </div>
  );
}