export type Answer = { id: string; text: string; points: number; normalized: string; revealed: boolean; revealedBy: 'A' | 'B' | null };
export type AnswerDraft = { text: string; points: string };
