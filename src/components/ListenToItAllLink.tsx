import React from 'react';
import { Volume2 } from 'lucide-react';

interface ListenToItAllLinkProps {
  targetId: string;
}

export const ListenToItAllLink: React.FC<ListenToItAllLinkProps> = ({ targetId }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-3 mt-2 border-t border-stone-200/80 flex justify-start">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 hover:text-amber-950 uppercase underline decoration-amber-800/50 underline-offset-4 hover:decoration-amber-900 transition-colors cursor-pointer group"
        title="Jump to audio player"
      >
        <span>LISTEN TO IT ALL</span>
        <Volume2 className="w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
