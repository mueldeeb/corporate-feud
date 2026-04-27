'use client';
import { useState } from 'react';
import type { Team } from '@/types/team';
import type { GameState } from '@/types/game';
export default function AnswerSubmission({ team, state, onSubmit }: { team: Team; state: GameState; onSubmit: (team: Team, answer: string)=>void }) {
  const [answer, setAnswer] = useState('');
  const canAnswer = !state.locked && !state.roundOver && (state.currentTeam === team || state.stealingTeam === team) && ['faceoff','reveal','steal'].includes(state.phase);
  if (!canAnswer) return null;
  return <form className="answer-submission" onSubmit={e=>{ e.preventDefault(); onSubmit(team, answer); setAnswer(''); }}><input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer" autoFocus/><button className="btn primary">Submit Answer</button></form>;
}
