'use client';
import type { GameState } from '@/types/game';
import { clearGame } from '@/lib/storage/clearGame';
import TeamPanel from './TeamPanel';
import AnswerGrid from './AnswerGrid';
import PhaseBar from './PhaseBar';
import MessageBar from './MessageBar';
import WaitingOverlay from './WaitingOverlay';
import RoundOverScreen from './RoundOverScreen';

export default function GameBoard({ state }: { state: GameState }) {
  return <main className="game-shell">
    {state.roundOver && <RoundOverScreen winner={state.winner} />}
    <div className="top-question">{state.question}</div>
    <section className="main-board">
      <TeamPanel name="Team A" score={state.scores.A} strikes={state.strikes.A} active={state.currentTeam === 'A' || state.decisionTeam === 'A' || state.stealingTeam === 'A'} />
      <AnswerGrid answers={state.answers} />
      <TeamPanel name="Team B" score={state.scores.B} strikes={state.strikes.B} active={state.currentTeam === 'B' || state.decisionTeam === 'B' || state.stealingTeam === 'B'} />
    </section>
    <section className="bottom-bar"><PhaseBar phase={state.phase} /><MessageBar message={state.messages.game} lastSubmittedAnswer={state.lastSubmittedAnswer} /><button className="btn danger" onClick={()=>{ clearGame(); location.href='/create'; }}>Reset</button></section>
    <WaitingOverlay show={state.locked} />
  </main>;
}
