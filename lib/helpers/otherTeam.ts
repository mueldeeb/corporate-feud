import type { Team } from '@/types/team';
export function otherTeam(team: Team): Team { return team === 'A' ? 'B' : 'A'; }
