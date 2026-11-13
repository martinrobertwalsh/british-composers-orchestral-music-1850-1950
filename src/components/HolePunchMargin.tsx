import React, { useRef, useState, useEffect } from 'react';

/**
 * Renders a vertical column of closely spaced binder/notebook hole punches
 * down the left margin of a "Some notes in passing ..." paper sheet,
 * dynamically adapting the hole count to the sheet height so holes stay
 * evenly and closely spaced without ever clipping a hole in half.
 */
export const HolePunchMargin: React.FC = () => {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [holeCount, setHoleCount] = useState<number>(4);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const updateCount = () => {
      const height = el.clientHeight;
      if (height > 0) {
        // ~78px centre-to-centre pitch for classic ring-binder spacing (3–6 holes depending on sheet height)
        const computed = Math.max(3, Math.round(height / 78) + 1);
        setHoleCount(computed);
      }
    };

    updateCount();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateCount);
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={railRef}
      className="absolute left-3 sm:left-3.5 inset-y-7 sm:inset-y-8 flex flex-col items-center justify-between pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: holeCount }).map((_, idx) => (
        <span
          key={idx}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FAF8F5] border border-stone-400/80 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.38)] shrink-0"
          title="Binder hole punch"
        />
      ))}
    </div>
  );
};
