import type { GamePhase } from '@/types/phase';
export const PHASE_LABELS: Record<GamePhase, string> = {
  create: 'Create Game',
  faceoff: 'Face Off',
  decision: 'Play or Pass Decision',
  reveal: 'Reveal All Answers',
  steal: 'Steal',
  roundOver: 'Round Over',
};
