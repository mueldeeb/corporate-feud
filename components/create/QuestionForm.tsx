'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AnswerDraft } from '@/types/answer';
import { ANSWER_COUNT } from '@/constants/limits';
import { makeInitialState } from '@/constants/defaults';
import { normalizeAnswer } from '@/lib/game/normalization';
import { validateCreateForm } from '@/lib/game/validation';
import { calculateTotal } from '@/lib/helpers/calculateTotal';
import { saveGame } from '@/lib/storage/saveGame';
import AnswerInput from './AnswerInput';
import ScoreInput from './ScoreInput';
import ValidationErrors from './ValidationErrors';
import StartGameButton from './StartGameButton';

const emptyAnswers = Array.from({ length: ANSWER_COUNT }, () => ({ text: '', points: '' }));

export default function QuestionForm() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<AnswerDraft[]>(emptyAnswers);
  const [errors, setErrors] = useState<string[]>([]);
  const total = calculateTotal(answers);

  function updateAnswer(index: number, next: AnswerDraft) { setAnswers(prev => prev.map((a,i)=>i===index ? next : a)); }
  function startGame(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateCreateForm(question, answers);
    setErrors(validation);
    if (validation.length) return;
    const finalAnswers = answers.map((a,i)=>({ id: `answer-${i+1}`, text: a.text.trim(), points: Number(a.points), normalized: normalizeAnswer(a.text), revealed: false, revealedBy: null })).sort((a,b)=>b.points-a.points);
    saveGame(makeInitialState(question.trim(), finalAnswers));
    router.push('/game');
  }

  return <form className="create-form" onSubmit={startGame}>
    <label className="field-label">Question</label>
    <input className="question-input" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Enter the main survey question" />
    <div className="answers-create-grid">{answers.map((a,i)=><AnswerInput key={i} index={i} value={a} onChange={next=>updateAnswer(i,next)} />)}</div>
    <ScoreInput total={total} />
    <ValidationErrors errors={errors} />
    <StartGameButton />
  </form>;
}
