import type { AnswerDraft } from '@/types/answer';
export function calculateTotal(answers: AnswerDraft[]) { return answers.reduce((sum, a) => sum + Number(a.points || 0), 0); }
