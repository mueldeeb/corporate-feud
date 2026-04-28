import type { Team } from './team';

import type { GamePhase } from './phase';

import type { Answer } from './answer';

import type { ScreenMessage } from './message';

export type GameRound = {

  id: string;

  question: string;

  answers: Answer[];
};

export type GameState = {

  rounds: GameRound[];

  currentRound: number;

  phase: GamePhase;

  buzzedTeam: Team | null;

  currentTeam: Team | null;

  decisionTeam: Team | null;

  playingTeam: Team | null;

  stealingTeam: Team | null;

  scores: Record<Team, number>;

  strikes: Record<Team, number>;

  faceOffAnswers: Record<Team, number | null>;

  stealAttemptUsed: boolean;

  locked: boolean;

  roundOver: boolean;

  winner: Team | 'Tie' | null;

  messages: ScreenMessage;

  lastSubmittedAnswer: string;

  updatedAt: number;
};