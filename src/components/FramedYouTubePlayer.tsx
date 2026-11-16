import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  Loader2,
} from 'lucide-react';
import { YouTubeWorkPlayerController } from '../utils/youtubePlayer';

interface FramedYouTubePlayerProps {
  player: YouTubeWorkPlayerController;
  iframeId: string;
  title: string;
  caption: React.ReactNode;
  className?: string;
}

// Exact bounding boxes around the composer portrait inside each 16:9 YouTube thumbnail
const THUMBNAIL_PORTRAIT_CLASSES: Record<string, string> = {
  bMRjgkb7tpM: 'left-[11.55%] top-[16.55%] w-[25.55%] h-[66.9%]', // Walter Macfarren — Symphony in Bb
  YaoSnd5XOdY: 'left-[11.6%] top-[19.6%] w-[25.8%] h-[60.8%]',    // William Henry Speer — Rhapsody in Eb
  oLGJG2fb7fw: 'left-[11.6%] top-[19.6%] w-[25.8%] h-[60.8%]',    // William Henry Speer — Nocturne for strings
  '-6HZxgXJLDI': 'left-[11.55%] top-[27.25%] w-[25.8%] h-[45.65%]', // Percy Pitt — Coronation March
  '40F3rR1Oa3g': 'left-[11.6%] top-[27.25%] w-[25.8%] h-[45.5%]',  // Tobias Matthay — In May
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSecs = Math.floor(seconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const FramedYouTubePlayer: React.FC<FramedYouTubePlayerProps> = ({
  player,
  iframeId,
  title,
  caption,
  className = 'max-w-md mx-auto mt-4',
}) => {
  const [thumbQuality, setThumbQuality] = useState<'maxresdefault' | 'hqdefault'>('maxresdefault');

  useEffect(() => {
    setThumbQuality('maxresdefault');
  }, [player.videoId]);

  const thumbnailUrl = `https://i.ytimg.com/vi/${player.videoId}/${thumbQuality}.jpg`;
  const effectiveDuration = player.duration > 0 ? player.duration : 0;
  const clampedCurrent = effectiveDuration > 0
    ? Math.min(player.currentTime, effectiveDuration)
    : player.currentTime;

  const portraitFrameClasses = THUMBNAIL_PORTRAIT_CLASSES[player.videoId];

  return (
    <div className={className}>
      <div className="bg-white border-[5px] border-[#765B37] rounded-lg p-1 sm:p-1.5 shadow-[0_18px_40px_-4px_rgba(20,18,16,0.58),0_6px_16px_-2px_rgba(20,18,16,0.36)]">
        {/* 16:9 Video Viewport */}
        <div className="relative w-full aspect-video overflow-hidden rounded bg-stone-950 select-none">
          <iframe
            ref={player.iframeRef}
            id={iframeId}
            src={player.iframeSrc}
            onLoad={player.handleLoad}
            title={title}
            tabIndex={-1}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute left-0 -top-[72px] w-full h-[calc(100%+144px)] border-0 pointer-events-none"
          />

          {/* Transparent click-shield while playing so pausing immediately engages our clean cover */}
          {!player.isCoverVisible && (
            <button
              type="button"
              onClick={player.togglePlay}
              className="absolute inset-0 z-10 w-full h-full cursor-pointer bg-transparent focus-visible:outline-none"
              title="Click to pause"
              aria-label={`Pause ${title}`}
            />
          )}

          {/* Clean Archival Thumbnail Cover whenever unstarted or paused — completely hides YouTube's "More videos" overlay */}
          {player.isCoverVisible && (
            <button
              type="button"
              onClick={player.togglePlay}
              className="absolute inset-0 z-20 w-full h-full cursor-pointer group overflow-hidden bg-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
              title={player.currentTime > 1 ? `Resume ${title}` : `Play ${title}`}
              aria-label={player.currentTime > 1 ? `Resume ${title}` : `Play ${title}`}
            >
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.01]">
                <img
                  src={thumbnailUrl}
                  alt={title}
                  onLoad={(e) => {
                    if (thumbQuality === 'maxresdefault' && e.currentTarget.naturalWidth <= 120) {
                      setThumbQuality('hqdefault');
                    }
                  }}
                  onError={() => {
                    if (thumbQuality === 'maxresdefault') {
                      setThumbQuality('hqdefault');
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Brown Frame Around the Composer Portrait Inside the Thumbnail */}
                {portraitFrameClasses && (
                  <div
                    aria-hidden="true"
                    className={`absolute pointer-events-none border-[2.5px] sm:border-[3px] border-[#765B37] shadow-[0_0_0_1px_rgba(21,11,9,0.75)] ${portraitFrameClasses}`}
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/30 transition-colors flex items-center justify-center">
                <span className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#2A2621]/90 group-hover:bg-[#765B37] border-2 border-[#FAF8F5]/90 text-[#FAF8F5] shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                  {player.isBuffering ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#FAF8F5]" />
                  ) : (
                    <Play className="w-6 h-6 fill-[#FAF8F5] text-[#FAF8F5] ml-0.5" />
                  )}
                </span>
              </div>

              {player.currentTime > 1 && !player.isBuffering && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/85 border border-stone-700/70 font-mono text-[11px] tabular-nums text-stone-100 shadow-xs">
                  Paused · {formatTime(clampedCurrent)}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Custom Archival Transport & Scrub Bar */}
        <div className="mt-1.5 px-2 py-1.5 bg-[#FAF8F5] border border-stone-200/90 rounded flex items-center gap-2 text-left">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={player.togglePlay}
            className="p-1 text-stone-900 hover:text-amber-900 transition-transform active:scale-95 cursor-pointer shrink-0"
            title={player.isPlaying ? 'Pause playback' : 'Play recording'}
            aria-label={player.isPlaying ? 'Pause' : 'Play'}
          >
            {player.isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Rewind 10s & Forward 15s */}
          <button
            type="button"
            onClick={() => player.seekDirectTo(clampedCurrent - 10)}
            className="p-1 text-stone-700 hover:text-amber-900 hover:bg-stone-200/60 rounded transition-colors cursor-pointer shrink-0"
            title="Rewind 10 seconds"
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => player.seekDirectTo(clampedCurrent + 15)}
            className="p-1 text-stone-700 hover:text-amber-900 hover:bg-stone-200/60 rounded transition-colors cursor-pointer shrink-0"
            title="Forward 15 seconds"
            aria-label="Forward 15 seconds"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Interactive Timeline Scrubber */}
          <input
            type="range"
            min={0}
            max={effectiveDuration > 0 ? effectiveDuration : 100}
            step={0.5}
            value={effectiveDuration > 0 ? clampedCurrent : 0}
            disabled={effectiveDuration <= 0}
            onChange={(e) => player.seekDirectTo(parseFloat(e.target.value))}
            className="flex-1 min-w-0 h-1.5 accent-[#765B37] bg-stone-300 rounded-lg cursor-pointer disabled:opacity-50"
            aria-label={`Timeline scrubber for ${title}`}
          />

          {/* Tabular Time Display */}
          <span className="font-mono text-[11px] tabular-nums text-stone-700 shrink-0 whitespace-nowrap">
            <span className="text-amber-950 font-semibold">{formatTime(clampedCurrent)}</span>
            {effectiveDuration > 0 && (
              <>
                <span className="text-stone-400 mx-0.5">/</span>
                <span>{formatTime(effectiveDuration)}</span>
              </>
            )}
          </span>

          {/* Mute / Volume */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={player.toggleMute}
              className="p-1 text-stone-800 hover:text-amber-900 rounded transition-colors cursor-pointer"
              title={player.isMuted ? 'Unmute' : 'Mute'}
              aria-label={player.isMuted ? 'Unmute' : 'Mute'}
            >
              {player.isMuted || player.volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : player.volume < 50 ? (
                <Volume1 className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={player.isMuted ? 0 : player.volume}
              onChange={(e) => player.setUserVolume(parseFloat(e.target.value))}
              className="hidden sm:inline-block w-12 h-1 accent-[#765B37] bg-stone-300 rounded cursor-pointer"
              aria-label={`Volume slider for ${title}`}
            />
          </div>
        </div>

        {/* Caption */}
        <div className="mt-1.5 px-1 text-center text-xs font-serif italic text-stone-600">
          {caption}
        </div>
      </div>
    </div>
  );
};
