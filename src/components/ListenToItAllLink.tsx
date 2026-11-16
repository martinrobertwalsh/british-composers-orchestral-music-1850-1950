import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { seekDirect, pauseOtherAudios } from '../utils/audioFade';

interface ListenToItAllLinkProps {
  targetId: string;
  onPlayFromStart?: () => void;
  isPlaying?: boolean;
}

export const ListenToItAllLink: React.FC<ListenToItAllLinkProps> = ({
  targetId,
  onPlayFromStart,
  isPlaying: externalIsPlaying,
}) => {
  const [internalIsPlaying, setInternalIsPlaying] = useState<boolean>(false);
  const activePlaying = typeof externalIsPlaying === 'boolean' ? externalIsPlaying : internalIsPlaying;

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const handlePlay = (ev: Event) => {
      if (ev.target instanceof HTMLAudioElement) {
        setInternalIsPlaying(true);
      }
    };

    const handleStop = (ev: Event) => {
      if (ev.target instanceof HTMLAudioElement) {
        setInternalIsPlaying(false);
      }
    };

    el.addEventListener('play', handlePlay, true);
    el.addEventListener('pause', handleStop, true);
    el.addEventListener('ended', handleStop, true);
    return () => {
      el.removeEventListener('play', handlePlay, true);
      el.removeEventListener('pause', handleStop, true);
      el.removeEventListener('ended', handleStop, true);
    };
  }, [targetId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (onPlayFromStart) {
      onPlayFromStart();
      setInternalIsPlaying(true);
      return;
    }

    const audio = el?.querySelector('audio') as HTMLAudioElement | null;
    if (audio) {
      seekDirect(audio, 0);
      setInternalIsPlaying(true);
      return;
    }

    const ytIframe = el?.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement | null;
    if (ytIframe?.contentWindow) {
      pauseOtherAudios(ytIframe);
      ytIframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
        '*'
      );
      ytIframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
      setInternalIsPlaying(true);
    }
  };

  return (
    <div className="pt-3 mt-2 border-t border-stone-200/80 flex justify-start">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 hover:text-amber-950 uppercase underline decoration-amber-800/50 underline-offset-4 hover:decoration-amber-900 transition-colors cursor-pointer group"
        title="Play full work from the beginning"
      >
        <span>LISTEN TO IT ALL</span>
        <Volume2
          className={`w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform ${
            activePlaying ? 'animate-pulse text-amber-700' : ''
          }`}
        />
      </a>
    </div>
  );
};
