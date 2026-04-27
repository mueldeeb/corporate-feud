import type { AnswerDraft } from '@/types/answer';
export default function AnswerInput({ index, value, onChange }: { index: number; value: AnswerDraft; onChange: (next: AnswerDraft) => void }) {
  return <div className="answer-input-row"><input placeholder={`Answer ${index+1}`} value={value.text} onChange={e=>onChange({ ...value, text: e.target.value })}/><input className="points-input" type="number" placeholder="Points" value={value.points} onChange={e=>onChange({ ...value, points: e.target.value })}/></div>;
}
