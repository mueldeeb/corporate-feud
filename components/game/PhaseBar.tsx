import type { GamePhase } from '@/types/phase';
import { PHASE_LABELS } from '@/constants/phases';
export default function PhaseBar({ phase }: { phase: GamePhase }) { return <div className="phase-pill">Phase: {PHASE_LABELS[phase]}</div>; }
