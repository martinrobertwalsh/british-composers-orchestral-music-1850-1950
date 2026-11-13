import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Sliders, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { orchestralPlayer } from '../audio/orchestralEngine';
import { MusicalTheme } from '../types/composer';
import {
  HARVEY_LOHR_SYMPHONY_3_THEME,
  ALICE_MARY_SMITH_SYMPHONY_THEME,
  PERCY_SHERWOOD_CONCERTO_THEME,
  ERNEST_BRYSON_STRANGER_THEME,
  WALFORD_DAVIES_BIG_BEN_THEME,
} from '../data/composersData';

interface AudioPlayerBarProps {
  currentTheme: MusicalTheme;
  isPlaying: boolean;
  onThemeSelect: (theme: MusicalTheme) => void;
  onPlayStateChange: (playing: boolean) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTheme,
  isPlaying,
  onThemeSelect,
  onPlayStateChange,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(currentTheme.durationSeconds);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(1.0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const ALL_THEMES: MusicalTheme[] = [
    HARVEY_LOHR_SYMPHONY_3_THEME,
    ALICE_MARY_SMITH_SYMPHONY_THEME,
    PERCY_SHERWOOD_CONCERTO_THEME,
    ERNEST_BRYSON_STRANGER_THEME,
    WALFORD_DAVIES_BIG_BEN_THEME,
  ];

  useEffect(() => {
    setDuration(currentTheme.durationSeconds);
    setCurrentTime(0);

    orchestralPlayer.setCallbacks(
      (time, dur) => {
        setCurrentTime(time);
        setDuration(dur);
      },
      () => {
        onPlayStateChange(false);
      }
    );
  }, [currentTheme, onPlayStateChange]);

  // Real-time canvas audio visualizer using AnalyserNode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderVisualizer = () => {
      const analyser = orchestralPlayer.analyser;
      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          // Archival amber/bronze gradient
          ctx.fillStyle = `rgb(${120 + dataArray[i] * 0.4}, ${53 + dataArray[i] * 0.3}, ${15 + dataArray[i] * 0.1})`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }
      } else {
        // Flat archival resting line
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#D6CEBE';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      orchestralPlayer.pause();
      onPlayStateChange(false);
    } else {
      if (currentTime > 0 && currentTime < duration) {
        orchestralPlayer.resume();
      } else {
        orchestralPlayer.playTheme(currentTheme, true);
      }
      onPlayStateChange(true);
    }
  };

  const handleStop = () => {
    orchestralPlayer.stop();
    setCurrentTime(0);
    onPlayStateChange(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    orchestralPlayer.seek(target);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    orchestralPlayer.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      orchestralPlayer.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      orchestralPlayer.setVolume(0);
    }
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setTempo(val);
    orchestralPlayer.setTempoRatio(val);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C1917] text-stone-100 border-t border-stone-800 shadow-2xl transition-all">
      {/* Expandable score & instrument tracks drawer */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-stone-800/80 bg-stone-900/90 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Realisation switcher */}
            <div>
              <span className="text-stone-400 font-serif uppercase tracking-wider text-[11px] block mb-2">
                Select Audio Realisation
              </span>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {ALL_THEMES.map((theme) => (
                  <button
                    key={theme.title}
                    onClick={() => {
                      onThemeSelect(theme);
                      orchestralPlayer.playTheme(theme, true);
                      onPlayStateChange(true);
                    }}
                    className={`w-full text-left p-2 rounded transition-colors text-xs cursor-pointer flex items-center justify-between ${
                      theme.title === currentTheme.title
                        ? 'bg-amber-950/80 text-amber-200 border border-amber-800/60'
                        : 'text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <span className="truncate pr-2">{theme.title}</span>
                    <span className="text-[10px] text-stone-400 font-mono shrink-0">
                      {theme.durationSeconds}s
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Orchestral instrumentation tracks & mute control */}
            <div>
              <span className="text-stone-400 font-serif uppercase tracking-wider text-[11px] block mb-2">
                Orchestral Staves & Part Isolator
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currentTheme.tracks.map((track) => {
                  const muted = orchestralPlayer.isTrackMuted(track.name);
                  return (
                    <button
                      key={track.name}
                      onClick={() => {
                        orchestralPlayer.toggleMuteTrack(track.name);
                        // Trigger re-render
                        setCurrentTime((t) => t + 0.001);
                      }}
                      className={`p-2 rounded text-left border transition-colors flex items-center justify-between cursor-pointer ${
                        muted
                          ? 'border-stone-800 bg-stone-950 text-stone-500 line-through'
                          : 'border-stone-700 bg-stone-800/70 text-stone-200 hover:border-amber-700'
                      }`}
                    >
                      <span className="truncate font-serif">{track.name}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 ml-1.5"
                        style={{ backgroundColor: muted ? '#57534E' : track.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Score annotations & tempo engine */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-stone-400 font-serif uppercase tracking-wider text-[11px] block mb-1">
                  Movement Score Analysis
                </span>
                <p className="text-stone-300 font-body text-xs leading-relaxed mb-3">
                  {currentTheme.description}
                </p>
                <div className="flex items-center gap-3 text-stone-400 font-mono text-[11px]">
                  <span>Key: {currentTheme.keySignature}</span>
                  <span>·</span>
                  <span>Time: {currentTheme.timeSignature}</span>
                  <span>·</span>
                  <span>Score BPM: {currentTheme.tempoBpm}</span>
                </div>
              </div>

              {/* Tempo stretch slider */}
              <div className="mt-3 pt-2 border-t border-stone-800 flex items-center gap-3">
                <span className="text-stone-400 text-[11px] shrink-0">Tempo Factor:</span>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={tempo}
                  onChange={handleTempoChange}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-700 rounded"
                />
                <span className="font-mono text-stone-300 text-[11px] shrink-0 w-10 text-right">
                  {Math.round(tempo * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main player bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Metadata & Canvas Visualizer */}
        <div className="flex items-center gap-4 min-w-0 flex-1 md:flex-initial">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded transition-colors hidden sm:block cursor-pointer"
            title={isExpanded ? 'Collapse score drawer' : 'Expand score drawer'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-serif">
                Synthesised Realisation
              </span>
              <span className="text-stone-600 text-xs hidden sm:inline">·</span>
              <span className="text-[11px] text-stone-400 hidden sm:inline truncate">
                {currentTheme.keySignature}
              </span>
            </div>
            <p className="font-serif text-sm font-semibold text-stone-100 truncate max-w-xs sm:max-w-md">
              {currentTheme.title}
            </p>
          </div>

          {/* Mini Canvas visualizer */}
          <canvas
            ref={canvasRef}
            width={72}
            height={26}
            className="rounded bg-stone-900 border border-stone-800 hidden lg:block shrink-0"
          />
        </div>

        {/* Center: Transport Controls & Seekbar */}
        <div className="flex flex-col items-center flex-1 max-w-md px-2">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={handleTogglePlay}
              className="p-1 text-stone-100 hover:text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleStop}
              className="p-1.5 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Stop"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>

            <span className="text-[11px] font-mono text-stone-400 min-w-18 text-center tabular-nums">
              {formatSeconds(currentTime)} / {formatSeconds(duration)}
            </span>
          </div>

          {/* Seek bar */}
          <div className="w-full flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 1}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-amber-500 cursor-pointer h-1 bg-stone-800 rounded appearance-none"
            />
          </div>
        </div>

        {/* Right: Volume & Drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-amber-500 cursor-pointer h-1 bg-stone-800 rounded"
            />
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Score & Parts</span>
          </button>
        </div>
      </div>
    </div>
  );
};
