import { STORAGE_KEY, SIGNAL_KEY } from '@/constants/defaults';
export function clearGame() { if (typeof window === 'undefined') return; localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SIGNAL_KEY); }
