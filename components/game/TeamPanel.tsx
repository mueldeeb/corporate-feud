import AnimatedCounter from '@/components/shared/AnimatedCounter';
import StrikeDisplay from './StrikeDisplay';
export default function TeamPanel({ name, score, strikes, active }: { name: string; score: number; strikes: number; active: boolean }) {
  return <aside className={`team-panel ${active ? 'active' : ''}`}><div className="team-label">{name}</div><StrikeDisplay strikes={strikes} /></aside>;
}
