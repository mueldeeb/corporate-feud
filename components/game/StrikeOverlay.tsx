'use client';

import { useEffect, useRef, useState } from 'react';

export default function StrikeOverlay({
  strikesA,
  strikesB,
}: {
  strikesA: number;
  strikesB: number;
}) {

  const [visible, setVisible] = useState(false);

  const prevTotal = useRef(0);

  useEffect(() => {

    const total = strikesA + strikesB;

    if (total > prevTotal.current) {

      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 1800);

      prevTotal.current = total;

      return () => clearTimeout(timer);
    }

    prevTotal.current = total;

  }, [strikesA, strikesB]);

  if (!visible) return null;

  return (
    <div className="strike-overlay">
      <div className="strike-overlay-x">
        X
      </div>
    </div>
  );
}