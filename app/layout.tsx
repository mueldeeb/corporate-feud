import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Corporate Feud', description: 'Digital team building game' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
