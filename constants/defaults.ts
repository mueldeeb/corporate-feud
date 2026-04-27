import type { GameState } from '@/types/game';
export const STORAGE_KEY = 'corporateFeudState';
export const SIGNAL_KEY = 'corporateFeudSignal';
export const CHANNEL_NAME = 'corporateFeud';
export const defaultMessages = {
  game: 'Waiting for the first buzz.',
  teamA: 'Get ready. Buzz first to answer.',
  teamB: 'Get ready. Buzz first to answer.',
};
export function makeInitialState(question: string, answers: GameState['answers']): GameState {
  return {
    question,
    answers,
    phase: 'faceoff',
    buzzedTeam: null,
    currentTeam: null,
    decisionTeam: null,
    playingTeam: null,
    stealingTeam: null,
    scores: { A: 0, B: 0 },
    strikes: { A: 0, B: 0 },
    faceOffAnswers: { A: null, B: null },
    stealAttemptUsed: false,
    locked: false,
    roundOver: false,
    winner: null,
    messages: defaultMessages,
    lastSubmittedAnswer: '',
    updatedAt: Date.now(),
  };
}
