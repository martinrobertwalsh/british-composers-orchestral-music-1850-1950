import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Volume1
} from 'lucide-react';
import { cancelAudioFade, pauseOtherAudios } from '../utils/audioFade';

export interface AudioSource {
  src: string;
  type?: string;
}

export interface WaveformAudioPlayerProps {
  src?: string;
  sources?: AudioSource[];
  title?: string;
  subtitle?: string;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/**
 * Procedural orchestral contour algorithm representing late Victorian and Edwardian
 * symphonic dynamic architecture (pianissimo introduction, swelling contrapuntal
 * development, grand climax, reflective episode, and dying coda).
 */
function generateClassicalContour(seed: string, count = 72): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const rand = (i: number) => {
    const x = Math.sin(hash + i * 17.1234) * 43758.5453;
    return x - Math.floor(x);
  };

  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    let macro = 0.35;
    if (t < 0.18) {
      // Exposition: gentle opening, long-breathed phrasing
      macro = 0.22 + 0.38 * Math.sin((t / 0.18) * (Math.PI / 2));
    } else if (t < 0.45) {
      // Development: contrapuntal density, rising tension
      const sub = (t - 0.18) / 0.27;
      macro = 0.48 + 0.32 * sub + 0.12 * Math.sin(sub * Math.PI * 3);
    } else if (t < 0.65) {
      // Symphonic climax / tutti forte fortissimo
      const sub = (t - 0.45) / 0.2;
      macro = 0.75 + 0.25 * Math.sin(sub * Math.PI);
    } else if (t < 0.82) {
      // Reflective episode / pastorale / march
      const sub = (t - 0.65) / 0.17;
      macro = 0.38 + 0.22 * Math.cos(sub * Math.PI * 2);
    } else {
      // Recapitulation & dying coda
      const sub = (t - 0.82) / 0.18;
      macro = 0.58 * (1 - sub * 0.75) + 0.18 * Math.sin(sub * Math.PI);
    }

    const micro = (rand(i) - 0.5) * 0.2;
    const clamped = Math.max(0.18, Math.min(1.0, macro + micro));
    bars.push(Math.round(clamped * 100));
  }
  return bars;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const WaveformAudioPlayer = forwardRef<HTMLAudioElement, WaveformAudioPlayerProps>(
  (
    {
      src,
      sources,
      title,
      subtitle,
      className = '',
      preload = 'metadata',
      onTimeUpdate,
      onPlay,
      onPause,
      onEnded
    },
    ref
  ) => {
    const internalAudioRef = useRef<HTMLAudioElement | null>(null);
    const waveformContainerRef = useRef<HTMLDivElement | null>(null);

    // Forward ref to parent while keeping internal ref
    useImperativeHandle<HTMLAudioElement | null, HTMLAudioElement | null>(
      ref,
      () => internalAudioRef.current
    );

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [playbackRate, setPlaybackRate] = useState<number>(1);

    // Build deduplicated fallback URL list so direct <audio src> avoids MIME nosniff rejection on <source type="...">
    const candidateUrls = React.useMemo(() => {
      const seen = new Set<string>();
      const list: string[] = [];
      if (src) {
        seen.add(src);
        list.push(src);
      }
      if (sources) {
        for (const s of sources) {
          if (s?.src && !seen.has(s.src)) {
            seen.add(s.src);
            list.push(s.src);
          }
        }
      }
      return list;
    }, [src, sources]);

    const primaryUrl = candidateUrls[0] || '';
    const [sourceIndex, setSourceIndex] = useState<number>(0);
    const activeSrc = candidateUrls[sourceIndex] || primaryUrl;
    const pendingResumeRef = useRef<boolean>(false);

    useEffect(() => {
      setSourceIndex(0);
      pendingResumeRef.current = false;
    }, [primaryUrl]);

    const activeSeed = title || primaryUrl || 'classical-work';
    const [waveformBars, setWaveformBars] = useState<number[]>(() =>
      generateClassicalContour(activeSeed, 68)
    );

    // Hover timestamp indicator
    const [hoverPercent, setHoverPercent] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Attempt real audio decoding via AudioContext only for smaller files (<= 8 MB)
    useEffect(() => {
      if (!primaryUrl) return;

      let isCancelled = false;
      const initialContour = generateClassicalContour(activeSeed, 68);
      setWaveformBars(initialContour);

      const extractRealWaveform = async () => {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextClass) return;

          // Check size first with HEAD so multi-movement symphonies do not download a duplicate 25-40MB copy in JS
          const headRes = await fetch(primaryUrl, { method: 'HEAD', mode: 'cors' });
          if (!headRes.ok || isCancelled) return;
          const contentLength = Number(headRes.headers.get('content-length') || '0');
          if (!contentLength || contentLength > 8_000_000) return;

          const response = await fetch(primaryUrl, { mode: 'cors' });
          if (!response.ok || isCancelled) return;

          const arrayBuffer = await response.arrayBuffer();
          const audioCtx = new AudioContextClass();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

          if (isCancelled) {
            audioCtx.close();
            return;
          }

          const channelData = audioBuffer.getChannelData(0);
          const barCount = 68;
          const samplesPerBar = Math.floor(channelData.length / barCount);
          const computedBars: number[] = [];

          let maxRms = 0;
          for (let i = 0; i < barCount; i++) {
            let sumSquare = 0;
            const start = i * samplesPerBar;
            const end = start + samplesPerBar;
            for (let j = start; j < end; j += 10) {
              const val = channelData[j];
              sumSquare += val * val;
            }
            const rms = Math.sqrt(sumSquare / (samplesPerBar / 10));
            computedBars.push(rms);
            if (rms > maxRms) maxRms = rms;
          }

          if (maxRms > 0 && !isCancelled) {
            const normalized = computedBars.map((val) => {
              const norm = val / maxRms;
              return Math.round(Math.max(0.18, Math.min(1.0, norm)) * 100);
            });
            setWaveformBars(normalized);
          }
          audioCtx.close();
        } catch {
          // Graceful fallback: classical contour is already displayed
        }
      };

      extractRealWaveform();

      return () => {
        isCancelled = true;
      };
    }, [primaryUrl, activeSeed]);

    // Handle audio events
    const handleTimeUpdate = () => {
      if (!internalAudioRef.current) return;
      const cur = internalAudioRef.current.currentTime;
      const dur = internalAudioRef.current.duration || 0;
      setCurrentTime(cur);
      if (dur && dur !== duration) setDuration(dur);
      if (onTimeUpdate) onTimeUpdate(cur, dur);
    };

    const handleLoadedMetadata = () => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      const dur = audio.duration || 0;
      setDuration(dur);
      if (pendingResumeRef.current) {
        pendingResumeRef.current = false;
        audio.play().catch(() => {});
      }
    };

    const handleAudioError = () => {
      if (sourceIndex + 1 < candidateUrls.length) {
        setSourceIndex((prev) => prev + 1);
      } else {
        pendingResumeRef.current = false;
        setIsPlaying(false);
      }
    };

    const handlePlay = () => {
      pauseOtherAudios(internalAudioRef.current);
      pendingResumeRef.current = false;
      setIsPlaying(true);
      if (onPlay) onPlay();
    };

    const handlePause = () => {
      cancelAudioFade(internalAudioRef.current, true);
      setIsPlaying(false);
      if (onPause) onPause();
    };

    const handleEnded = () => {
      cancelAudioFade(internalAudioRef.current, true);
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    const handleVolumeChange = () => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      setIsMuted(audio.muted);
      if (audio.dataset.fading !== 'true') {
        setVolume(audio.volume);
      }
    };

    // Transport buttons
    const togglePlayPause = () => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      if (!audio.paused) {
        pendingResumeRef.current = false;
        audio.pause();
      } else {
        cancelAudioFade(audio, true);
        pendingResumeRef.current = true;
        if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
          audio.load();
        }
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If playback failed due to a bad source, onError will advance sourceIndex and resume
          });
        }
      }
    };

    const skipTime = (delta: number) => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      const newTime = Math.max(0, Math.min(audio.duration || Infinity, audio.currentTime + delta));
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const toggleMute = () => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    };

    const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = parseFloat(e.target.value);
      const audio = internalAudioRef.current;
      if (!audio) return;
      cancelAudioFade(audio, false);
      audio.dataset.userVolume = String(newVol);
      audio.volume = newVol;
      audio.muted = newVol === 0;
      setVolume(newVol);
      setIsMuted(newVol === 0);
    };

    const cyclePlaybackRate = () => {
      const audio = internalAudioRef.current;
      if (!audio) return;
      // Cycle: 1.0x -> 1.15x -> 0.85x (score study) -> 1.0x
      let nextRate = 1.0;
      if (playbackRate === 1.0) nextRate = 1.15;
      else if (playbackRate === 1.15) nextRate = 0.85;
      else nextRate = 1.0;

      audio.playbackRate = nextRate;
      setPlaybackRate(nextRate);
    };

    // Scrubbing calculation
    const calculateTimeFromEvent = useCallback(
      (clientX: number): number | null => {
        if (!waveformContainerRef.current) return null;
        const rect = waveformContainerRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const ratio = offsetX / rect.width;
        const dur = duration || (internalAudioRef.current?.duration ?? 0);
        return ratio * dur;
      },
      [duration]
    );

    const handleScrub = useCallback(
      (clientX: number) => {
        const targetTime = calculateTimeFromEvent(clientX);
        if (targetTime !== null && internalAudioRef.current) {
          internalAudioRef.current.currentTime = targetTime;
          setCurrentTime(targetTime);
        }
      },
      [calculateTimeFromEvent]
    );

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      handleScrub(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!waveformContainerRef.current) return;
      const rect = waveformContainerRef.current.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setHoverPercent(offsetX / rect.width);
      if (isDragging) {
        handleScrub(e.clientX);
      }
    };

    const handleMouseLeave = () => {
      if (!isDragging) {
        setHoverPercent(null);
      }
    };

    useEffect(() => {
      const onGlobalMouseUp = () => {
        if (isDragging) {
          setIsDragging(false);
          setHoverPercent(null);
        }
      };
      const onGlobalMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          handleScrub(e.clientX);
        }
      };

      if (isDragging) {
        window.addEventListener('mouseup', onGlobalMouseUp);
        window.addEventListener('mousemove', onGlobalMouseMove);
      }
      return () => {
        window.removeEventListener('mouseup', onGlobalMouseUp);
        window.removeEventListener('mousemove', onGlobalMouseMove);
      };
    }, [isDragging, handleScrub]);

    // Touch scrubbing support for mobile devices
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        setIsDragging(true);
        handleScrub(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length > 0) {
        handleScrub(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setHoverPercent(null);
    };

    const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;
    const progressPercent = progressRatio * 100;

    return (
      <div
        className={`w-full bg-[#FAF7F2] dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 rounded-lg p-3 sm:p-3.5 shadow-2xs select-none ${className}`}
      >
        {/* Hidden standard HTML5 audio element for native decoding and compatibility */}
        <audio
          key={activeSrc}
          ref={internalAudioRef}
          preload={preload}
          src={activeSrc || undefined}
          data-user-volume={String(volume)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onDurationChange={handleLoadedMetadata}
          onError={handleAudioError}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onVolumeChange={handleVolumeChange}
        >
          Your browser does not support the audio element.
        </audio>

        {/* Top Header Row: Optional Title & Tabular Time Display */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-stone-200/70 dark:border-stone-800">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-800 dark:bg-amber-600 shrink-0" aria-hidden="true" />
            <span className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-stone-200 truncate font-medium">
              {title || 'Archival Recording'}
            </span>
            {subtitle && (
              <span className="hidden sm:inline text-2xs text-stone-500 uppercase tracking-wider font-mono">
                · {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs tabular-nums text-stone-700 dark:text-stone-300 font-medium">
            <span className="text-amber-950 dark:text-amber-200 font-semibold">{formatTime(currentTime)}</span>
            <span className="text-stone-400">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Waveform Visualiser & Scrub Track */}
        <div
          ref={waveformContainerRef}
          role="slider"
          aria-label="Audio scrubber waveform"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={currentTime}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') skipTime(-5);
            if (e.key === 'ArrowRight') skipTime(5);
            if (e.key === ' ') {
              e.preventDefault();
              togglePlayPause();
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative h-11 sm:h-12 flex items-end gap-[2px] sm:gap-[3px] px-1 py-1 cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-800/40 rounded"
        >
          {/* Subtle baseline track */}
          <div className="absolute inset-x-0 bottom-1 h-0.5 bg-stone-200 dark:bg-stone-800 pointer-events-none" />

          {/* Individual dynamic waveform bars */}
          {waveformBars.map((heightPercent, idx) => {
            const barFraction = idx / waveformBars.length;
            const isPlayed = barFraction <= progressRatio;
            const isHovered = hoverPercent !== null && barFraction <= hoverPercent;

            return (
              <div
                key={idx}
                className="flex-1 flex items-end h-full pointer-events-none"
              >
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-full transition-colors duration-75 ${
                    isPlayed
                      ? 'bg-amber-800 dark:bg-amber-600'
                      : isHovered
                      ? 'bg-amber-700/50 dark:bg-amber-500/50'
                      : 'bg-stone-300 dark:bg-stone-700 group-hover:bg-stone-350 dark:group-hover:bg-stone-650'
                  }`}
                />
              </div>
            );
          })}

          {/* Current playback needle */}
          <div
            style={{ left: `${progressPercent}%` }}
            className="absolute top-0 bottom-1 w-[2px] bg-amber-950 dark:bg-amber-400 pointer-events-none transition-[left] duration-75 shadow-xs"
          >
            <div className="w-2 h-2 -ml-[3px] -mt-1 rounded-full bg-amber-900 dark:bg-amber-400 border border-white dark:border-stone-900 shadow-2xs" />
          </div>

          {/* Hover indicator tooltip & hairline */}
          {hoverPercent !== null && (
            <div
              style={{ left: `${hoverPercent * 100}%` }}
              className="absolute top-0 bottom-1 w-[1px] bg-stone-500/80 pointer-events-none"
            >
              <div className="absolute -top-6 -translate-x-1/2 bg-stone-900 text-stone-100 text-3xs font-mono tabular-nums px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none">
                {formatTime(hoverPercent * duration)}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-1">
          {/* Transport buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Play/Pause Button - Simple Black Arrow */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="p-1 sm:p-1.5 text-black hover:text-stone-700 dark:text-white dark:hover:text-stone-300 flex items-center justify-center transition-transform active:scale-90 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
              title={isPlaying ? 'Pause playback' : 'Play recording'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black dark:fill-white dark:text-white" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black dark:fill-white dark:text-white ml-0.5" />
              )}
            </button>

            {/* Rewind 10 seconds */}
            <button
              type="button"
              onClick={() => skipTime(-10)}
              className="p-1 text-black/80 hover:text-black hover:bg-stone-200/60 dark:text-white/80 dark:hover:text-white dark:hover:bg-stone-800/60 rounded transition-colors cursor-pointer"
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
            </button>

            {/* Fast-forward 15 seconds */}
            <button
              type="button"
              onClick={() => skipTime(15)}
              className="p-1 text-black/80 hover:text-black hover:bg-stone-200/60 dark:text-white/80 dark:hover:text-white dark:hover:bg-stone-800/60 rounded transition-colors cursor-pointer"
              title="Forward 15 seconds"
              aria-label="Forward 15 seconds"
            >
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-white" />
            </button>
          </div>

          {/* Right utilities: Speed selector & Volume */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Playback rate cycle (1.0x -> 1.15x -> 0.85x score study) */}
            <button
              type="button"
              onClick={cyclePlaybackRate}
              className="font-mono text-2xs px-2 py-0.5 border border-black/30 dark:border-white/30 hover:border-black dark:hover:border-white rounded text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Playback speed (click to adjust)"
            >
              {playbackRate}×
            </button>

            {/* Volume toggle & slider - Simple Black */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 sm:p-1.5 text-black hover:text-stone-700 dark:text-white dark:hover:text-stone-300 rounded transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-black dark:text-white" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-5 h-5 text-black dark:text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-black dark:text-white" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeSlider}
                className="hidden sm:inline-block w-14 lg:w-18 h-1 accent-black dark:accent-white bg-stone-300 dark:bg-stone-700 rounded cursor-pointer"
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WaveformAudioPlayer.displayName = 'WaveformAudioPlayer';
