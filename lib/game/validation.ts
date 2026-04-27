import { ANSWER_COUNT, TOTAL_POINTS } from '@/constants/limits';
import type { AnswerDraft } from '@/types/answer';
export function validateCreateForm(question: string, answers: AnswerDraft[]) {
  const errors: string[] = [];
  if (!question.trim()) errors.push('Question is required.');
  if (answers.length !== ANSWER_COUNT) errors.push('You must enter exactly 8 answers.');
  answers.forEach((a,i)=>{ if(!a.text.trim()) errors.push(`Answer ${i+1} text is required.`); if(!a.points || Number(a.points)<=0) errors.push(`Answer ${i+1} points must be more than 0.`); });
  const points = answers.map(a=>Number(a.points));
  if (points.reduce((s,p)=>s+p,0) !== TOTAL_POINTS) errors.push('Total points must equal exactly 100.');
  if (new Set(points).size !== points.length) errors.push('Answer points must not be equal between any answers.');
  return errors;
}
