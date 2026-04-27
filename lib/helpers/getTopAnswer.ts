import type { Answer } from '@/types/answer';
export function getTopAnswer(answers: Answer[]) { return [...answers].sort((a,b)=>b.points-a.points)[0]; }
