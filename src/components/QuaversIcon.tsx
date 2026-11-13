import React from 'react';

interface QuaversIconProps {
  className?: string;
  descending?: boolean;
  mirrored?: boolean; // backwards compatibility fallback if passed
}

export const QuaversIcon: React.FC<QuaversIconProps> = ({
  className = 'w-11 h-11 sm:w-12 sm:h-12',
  descending = false,
  mirrored = false
}) => {
  const isDescending = descending || mirrored;
  const src = isDescending
    ? `${import.meta.env.BASE_URL}assets/aistudio/quavers_descending_transparent.png`
    : `${import.meta.env.BASE_URL}assets/aistudio/treble_clef_transparent.png`;

  return (
    <img
      src={src}
      alt={isDescending ? 'Two black descending beamed quavers' : 'Black treble clef'}
      className={`${className} object-contain shrink-0 select-none`}
      draggable={false}
      aria-hidden="true"
    />
  );
};
