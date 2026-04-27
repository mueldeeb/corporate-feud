'use client';
import { useGameState } from '@/hooks/useGameState';
import { useBuzzLock } from '@/hooks/useBuzzLock';
import { useAnswerSubmission } from '@/hooks/useAnswerSubmission';
import { decidePlayPass } from '@/lib/game/gameEngine';
import BuzzButton from '@/components/team/BuzzButton';
import TeamStatus from '@/components/team/TeamStatus';
import TeamMessage from '@/components/team/TeamMessage';
import AnswerSubmission from '@/components/team/AnswerSubmission';
import DecisionButtons from '@/components/team/DecisionButtons';

export default function Team2Page() {
  const team = 'B' as const;
  const { state, commit } = useGameState();
  const buzz = useBuzzLock(state, commit);
  const submit = useAnswerSubmission(state, commit);
  if (!state) return <main className="team-screen"><h1>Team B</h1><p>No active game. Create a game first.</p></main>;
  return <main className="team-screen"><TeamStatus team={team} state={state}/><BuzzButton team={team} state={state} onBuzz={buzz}/><DecisionButtons team={team} state={state} onDecision={(t,d)=>commit(decidePlayPass(state,t,d))}/><AnswerSubmission team={team} state={state} onSubmit={submit}/><TeamMessage team={team} state={state}/>{state.roundOver && <div className="mobile-round-over">ROUND OVER</div>}</main>;
}
