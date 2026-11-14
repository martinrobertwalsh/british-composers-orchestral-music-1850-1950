import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { seekDirect, cancelAudioFade } from '../utils/audioFade';

interface ListenToItAllLinkProps {
  targetId: string;
}

export const ListenToItAllLink: React.FC<ListenToItAllLinkProps> = ({ targetId }) => {
  const [isPlayingFromLink, setIsPlayingFromLink] = useState<boolean>(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const handleStop = (ev: Event) => {
      if (ev.target instanceof HTMLAudioElement) {
        setIsPlayingFromLink(false);
      }
    };

    el.addEventListener('pause', handleStop, true);
    el.addEventListener('ended', handleStop, true);
    return () => {
      el.removeEventListener('pause', handleStop, true);
      el.removeEventListener('ended', handleStop, true);
    };
  }, [targetId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    const audio = el?.querySelector('audio') as HTMLAudioElement | null;

    if (isPlayingFromLink && audio && !audio.paused) {
      cancelAudioFade(audio, true);
      audio.pause();
      setIsPlayingFromLink(false);
      return;
    }

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (audio) {
      seekDirect(audio, 0);
      setIsPlayingFromLink(true);
    }
  };

  return (
    <div className="pt-3 mt-2 border-t border-stone-200/80 flex justify-start">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 hover:text-amber-950 uppercase underline decoration-amber-800/50 underline-offset-4 hover:decoration-amber-900 transition-colors cursor-pointer group"
        title={isPlayingFromLink ? 'Click again to stop playback' : 'Play full work from the beginning'}
      >
        <span>LISTEN TO IT ALL</span>
        <Volume2
          className={`w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform ${
            isPlayingFromLink ? 'animate-pulse text-amber-700' : ''
          }`}
        />
      </a>
    </div>
  );
};
