import type { Answer } from '@/types/answer';
export function sortAnswersByPoints(answers: Answer[]) { return [...answers].sort((a,b)=>b.points-a.points); }
export function boardOrder(answers: Answer[]) {
  const sorted = sortAnswersByPoints(answers);
  const left = sorted.slice(0,4);
  const right = sorted.slice(4,8);
  return left.map((a,i)=>[a,right[i]]).flat().filter(Boolean) as Answer[];
}
