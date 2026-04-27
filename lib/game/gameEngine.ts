import type { GameState } from '@/types/game';
import type { Team } from '@/types/team';
import { MAX_STRIKES } from '@/constants/limits';
import { otherTeam } from '@/lib/helpers/otherTeam';
import { getTopAnswer } from '@/lib/helpers/getTopAnswer';
import { findMatchingHiddenAnswer, revealAnswer, allAnswersRevealed } from './revealEngine';
import { addAnswerScore, applySuccessfulSteal } from './scoringEngine';
import { addStrike } from './strikeEngine';
import { calculateWinner } from './winnerEngine';

function endRound(state: GameState, reason: string): GameState {
  const winner = calculateWinner(state.scores);
  return { ...state, phase: 'roundOver', roundOver: true, currentTeam: null, decisionTeam: null, stealingTeam: null, locked: false, winner, messages: { game: `${reason} ROUND OVER. ${winner === 'Tie' ? 'It is a tie.' : `Team ${winner} wins.`}`, teamA: `ROUND OVER. ${winner === 'Tie' ? 'It is a tie.' : winner === 'A' ? 'You win this round.' : 'Team B wins this round.'}`, teamB: `ROUND OVER. ${winner === 'Tie' ? 'It is a tie.' : winner === 'B' ? 'You win this round.' : 'Team A wins this round.'}` } };
}

function lockWithMessage(state: GameState, input: string): GameState { return { ...state, locked: true, lastSubmittedAnswer: input, messages: { ...state.messages, game: `Submitted answer: “${input}”. Checking...` } }; }

export function submitAnswer(state: GameState, team: Team, input: string): GameState {
  if (state.locked || state.roundOver || !input.trim()) return state;
  if (state.currentTeam !== team && state.stealingTeam !== team) return state;
  let next = lockWithMessage(state, input.trim());
  const match = findMatchingHiddenAnswer(next, input);

  if (next.phase === 'faceoff') {
    if (!match) {
      const nextTeam = otherTeam(team);
      return { ...next, locked: false, currentTeam: nextTeam, messages: { game: `Team ${team} gave a wrong answer. Team ${nextTeam}, your turn.`, teamA: nextTeam === 'A' ? 'Wrong answer from Team B. Your turn now.' : 'Wrong answer. Wait for Team B.', teamB: nextTeam === 'B' ? 'Wrong answer from Team A. Your turn now.' : 'Wrong answer. Wait for Team A.' } };
    }
    next = revealAnswer(next, match.id, team);
    next = addAnswerScore(next, team, match);
    const faceOffAnswers = { ...next.faceOffAnswers, [team]: match.points };
    const top = getTopAnswer(next.answers);
    const other = otherTeam(team);
    const otherScore = faceOffAnswers[other];
    const shouldDecide = match.id === top.id || otherScore !== null;
    let decisionTeam: Team | null = null;
    if (shouldDecide) {
      if (otherScore === null) decisionTeam = team;
      else decisionTeam = (faceOffAnswers[team] || 0) >= otherScore ? team : other;
    }
    if (decisionTeam) return { ...next, locked: false, phase: 'decision', currentTeam: null, decisionTeam, faceOffAnswers, messages: { game: `Correct answer revealed. Team ${decisionTeam}, choose Play or Pass.`, teamA: decisionTeam === 'A' ? 'Correct. You have the stronger answer. Choose Play or Pass.' : `Team ${decisionTeam} will decide Play or Pass.`, teamB: decisionTeam === 'B' ? 'Correct. You have the stronger answer. Choose Play or Pass.' : `Team ${decisionTeam} will decide Play or Pass.` } };
    return { ...next, locked: false, currentTeam: other, faceOffAnswers, messages: { game: `Correct answer revealed. Team ${other}, your turn to answer.`, teamA: other === 'A' ? 'Correct answer revealed. Your turn now.' : 'Correct answer revealed. Wait for Team B.', teamB: other === 'B' ? 'Correct answer revealed. Your turn now.' : 'Correct answer revealed. Wait for Team A.' } };
  }

  if (next.phase === 'reveal') {
    if (match) {
      next = revealAnswer(next, match.id, team);
      next = addAnswerScore(next, team, match);
      if (allAnswersRevealed(next)) return endRound({ ...next, locked: false }, 'All answers revealed.');
      return { ...next, locked: false, currentTeam: team, messages: { game: `Team ${team} found a correct answer. Continue revealing.`, teamA: team === 'A' ? 'Correct. Keep going.' : 'Team A found a correct answer.', teamB: team === 'B' ? 'Correct. Keep going.' : 'Team B found a correct answer.' } };
    }
    next = addStrike(next, team);
    if (next.strikes[team] >= MAX_STRIKES) {
      const stealingTeam = otherTeam(team);
      return { ...next, locked: false, phase: 'steal', currentTeam: null, stealingTeam, messages: { game: `Team ${team} reached 3 strikes. Team ${stealingTeam} has one steal attempt.`, teamA: stealingTeam === 'A' ? 'Team B reached 3 strikes. You have one steal attempt.' : 'You reached 3 strikes. Team B can steal.', teamB: stealingTeam === 'B' ? 'Team A reached 3 strikes. You have one steal attempt.' : 'You reached 3 strikes. Team A can steal.' } };
    }
    return { ...next, locked: false, currentTeam: team, messages: { game: `Wrong answer from Team ${team}. Strike ${next.strikes[team]}/3.`, teamA: team === 'A' ? `Wrong answer. Strike ${next.strikes[team]}/3.` : `Team A received strike ${next.strikes[team]}/3.`, teamB: team === 'B' ? `Wrong answer. Strike ${next.strikes[team]}/3.` : `Team B received strike ${next.strikes[team]}/3.` } };
  }

  if (next.phase === 'steal') {
    if (next.stealAttemptUsed) return next;
    if (match) {
      next = revealAnswer(next, match.id, team);
      next = applySuccessfulSteal(next, team, match);
      return endRound({ ...next, stealAttemptUsed: true, locked: false }, `Team ${team} stole the round.`);
    }
    return endRound({ ...next, stealAttemptUsed: true, locked: false }, `Team ${team} failed the steal.`);
  }
  return { ...next, locked: false };
}

export function decidePlayPass(state: GameState, team: Team, decision: 'play' | 'pass'): GameState {
  if (state.phase !== 'decision' || state.decisionTeam !== team || state.locked || state.roundOver) return state;
  const playingTeam = decision === 'play' ? team : otherTeam(team);
  return { ...state, phase: 'reveal', decisionTeam: null, playingTeam, currentTeam: playingTeam, messages: { game: `Team ${team} chose ${decision.toUpperCase()}. Team ${playingTeam} must reveal all answers.`, teamA: playingTeam === 'A' ? `Team ${team} chose ${decision.toUpperCase()}. Your team is playing now.` : `Team ${team} chose ${decision.toUpperCase()}. Team B is playing.`, teamB: playingTeam === 'B' ? `Team ${team} chose ${decision.toUpperCase()}. Your team is playing now.` : `Team ${team} chose ${decision.toUpperCase()}. Team A is playing.` } };
}
