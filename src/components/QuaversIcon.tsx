import React from 'react';

interface QuaversIconProps {
  className?: string;
  ascending?: boolean;
  descending?: boolean;
  mirrored?: boolean; // backwards compatibility fallback if passed
}

export const QuaversIcon: React.FC<QuaversIconProps> = ({
  className = 'w-11 h-11 sm:w-12 sm:h-12',
  ascending = false,
  descending = false,
  mirrored = false
}) => {
  const isDescending = descending || mirrored;
  const src = ascending
    ? `${import.meta.env.BASE_URL}assets/aistudio/quavers_black_transparent.png`
    : isDescending
      ? `${import.meta.env.BASE_URL}assets/aistudio/quavers_descending_transparent.png`
      : `${import.meta.env.BASE_URL}assets/aistudio/treble_clef_transparent.png`;

  const alt = ascending
    ? 'Two black ascending beamed quavers'
    : isDescending
      ? 'Two black descending beamed quavers'
      : 'Black treble clef';

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain shrink-0 select-none`}
      draggable={false}
      aria-hidden="true"
    />
  );
};
