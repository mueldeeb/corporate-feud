'use client';
import { useState } from 'react';
export function useRoundTransition() {
  const [showOpening, setShowOpening] = useState(true);
  return { showOpening, closeOpening: () => setShowOpening(false) };
}
