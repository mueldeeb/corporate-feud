import type { ReactNode } from 'react';
export default function Modal({ children }: { children: ReactNode }) { return <div className="modal-backdrop"><div className="modal-card">{children}</div></div>; }
