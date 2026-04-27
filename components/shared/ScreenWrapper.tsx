import type { ReactNode } from 'react';
export default function ScreenWrapper({ children, variant = 'screen' }: { children: ReactNode; variant?: string }) {
  return <main className={variant}>{children}</main>;
}
