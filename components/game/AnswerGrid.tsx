import type { Answer } from '@/types/answer';
import { boardOrder } from '@/lib/helpers/sortAnswers';
import AnswerCard from './AnswerCard';
export default function AnswerGrid({ answers }: { answers: Answer[] }) { const ordered = boardOrder(answers); return <div className="answer-grid">{ordered.map((a,i)=><AnswerCard answer={a} index={i} key={a.id} />)}</div>; }
