import type { ReactNode } from 'react';
export default function GlowCard({ children, active=false }: { children: ReactNode; active?: boolean }) { return <div className={`glow-card ${active ? 'active' : ''}`}>{children}</div>; }
