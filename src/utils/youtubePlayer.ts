import React, { useState, useRef, useEffect, useCallback } from 'react';
import { pauseOtherAudios } from './audioFade';

let nextWidgetInstanceId = 1;

export function buildYouTubeEmbedUrl(
  videoId: string,
  startSeconds?: number,
  cacheBust?: string
): string {
  const params = new URLSearchParams({
    enablejsapi: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    playsinline: '1',
    disablekb: '1',
  });
  if (cacheBust) {
    params.set('cb', cacheBust);
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    params.set('origin', window.location.origin);
  }
  if (typeof startSeconds === 'number') {
    params.set('start', String(Math.max(0, Math.floor(startSeconds))));
    params.set('autoplay', '1');
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function createRefreshToken(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export interface YouTubeWorkPlayerController {
  videoId: string;
  iframeSrc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  handleLoad: () => void;
  isPlaying: boolean;
  isBuffering: boolean;
  isCoverVisible: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekDirectTo: (seconds: number) => void;
  seekWithFade: (seconds: number) => void;
  playFromStart: () => void;
  setUserVolume: (volumePercent: number) => void;
  toggleMute: () => void;
}

export function useYouTubeWorkPlayer(
  videoId: string,
  onPlayStart?: () => void
): YouTubeWorkPlayerController {
  const [iframeSrc, setIframeSrc] = useState<string>(() => buildYouTubeEmbedUrl(videoId));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isCoverVisible, setIsCoverVisible] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetIdRef = useRef<number>(0);
  if (widgetIdRef.current === 0) {
    widgetIdRef.current = nextWidgetInstanceId++;
  }

  const isReadyRef = useRef<boolean>(false);
  const playerStateRef = useRef<number>(-1);
  const wantPlayingRef = useRef<boolean>(false);
  const currentTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const targetVolumeRef = useRef<number>(100);
  const isMutedRef = useRef<boolean>(false);
  const isFadingRef = useRef<boolean>(false);
  const pendingFadeRef = useRef<boolean>(false);
  const seekingGuardUntilRef = useRef<number>(0);
  const lastUserSeekAtRef = useRef<number>(0);
  const lastResetAtRef = useRef<number>(0);

  const fadeIntervalRef = useRef<number | null>(null);
  const handshakeIntervalRef = useRef<number | null>(null);
  const playFallbackTimerRef = useRef<number | null>(null);

  const onPlayStartRef = useRef(onPlayStart);
  onPlayStartRef.current = onPlayStart;

  const clearPlayFallbackTimer = useCallback(() => {
    if (playFallbackTimerRef.current !== null) {
      window.clearTimeout(playFallbackTimerRef.current);
      playFallbackTimerRef.current = null;
    }
  }, []);

  const postCommand = useCallback((func: string, args: unknown[] = []) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args,
          id: widgetIdRef.current,
          channel: 'widget',
        }),
        '*'
      );
    } catch {
      // Ignore if iframe is unmounted
    }
  }, []);

  const sendListeningHandshake = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    try {
      win.postMessage(
        JSON.stringify({
          event: 'listening',
          id: widgetIdRef.current,
          channel: 'widget',
        }),
        '*'
      );
      win.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'addEventListener',
          args: ['onStateChange'],
          id: widgetIdRef.current,
          channel: 'widget',
        }),
        '*'
      );
    } catch {
      // Ignore
    }
  }, []);

  const cancelFade = useCallback(
    (restoreVolume = true) => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      isFadingRef.current = false;
      if (restoreVolume) {
        postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
      }
    },
    [postCommand]
  );

  const startFadeIn = useCallback(
    (fadeDurationMs = 2400) => {
      cancelFade(false);

      if (isMutedRef.current || targetVolumeRef.current === 0) {
        cancelFade(true);
        return;
      }

      const targetVol = targetVolumeRef.current;
      isFadingRef.current = true;
      postCommand('setVolume', [0]);

      const initiatedAt = performance.now();
      let fadeStartedAt: number | null = null;

      fadeIntervalRef.current = window.setInterval(() => {
        const now = performance.now();
        const state = playerStateRef.current;

        if (!wantPlayingRef.current || ((state === 2 || state === 0) && now - initiatedAt > 600)) {
          cancelFade(true);
          return;
        }

        if (fadeStartedAt === null) {
          const isActivelyPlaying = state === 1;
          const timedOutWaiting = now - initiatedAt > 2500;
          if (isActivelyPlaying || timedOutWaiting) {
            fadeStartedAt = now;
          } else {
            postCommand('setVolume', [0]);
            return;
          }
        }

        const elapsed = now - fadeStartedAt;
        const progress = Math.min(1, elapsed / fadeDurationMs);
        const eased = Math.pow(progress, 1.5);
        postCommand('setVolume', [Math.round(targetVol * eased)]);

        if (progress >= 1) {
          cancelFade(true);
        }
      }, 30);
    },
    [cancelFade, postCommand]
  );

  const resetToOriginal = useCallback(() => {
    const now = performance.now();
    if (now - lastResetAtRef.current < 800) return;
    lastResetAtRef.current = now;

    clearPlayFallbackTimer();
    cancelFade(false);
    pendingFadeRef.current = false;
    wantPlayingRef.current = false;

    setIsCoverVisible(true);
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
    currentTimeRef.current = 0;

    postCommand('stopVideo');
    postCommand('pauseVideo');

    isReadyRef.current = false;
    playerStateRef.current = -1;
    setIframeSrc(buildYouTubeEmbedUrl(videoId, undefined, createRefreshToken()));
  }, [videoId, cancelFade, clearPlayFallbackTimer, postCommand]);

  // Poll listening handshake until the iframe responds
  useEffect(() => {
    if (handshakeIntervalRef.current !== null) {
      window.clearInterval(handshakeIntervalRef.current);
      handshakeIntervalRef.current = null;
    }

    let attempts = 0;
    sendListeningHandshake();

    handshakeIntervalRef.current = window.setInterval(() => {
      attempts += 1;
      if (isReadyRef.current || attempts > 25) {
        if (handshakeIntervalRef.current !== null) {
          window.clearInterval(handshakeIntervalRef.current);
          handshakeIntervalRef.current = null;
        }
        return;
      }
      sendListeningHandshake();
    }, 250);

    return () => {
      if (handshakeIntervalRef.current !== null) {
        window.clearInterval(handshakeIntervalRef.current);
        handshakeIntervalRef.current = null;
      }
    };
  }, [iframeSrc, sendListeningHandshake]);

  // Listen to YouTube postMessage telemetry from this iframe
  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      if (!iframeRef.current || ev.source !== iframeRef.current.contentWindow) return;
      if (typeof ev.data !== 'string') return;

      let payload: {
        event?: string;
        info?: unknown;
      };
      try {
        payload = JSON.parse(ev.data);
      } catch {
        return;
      }

      if (!payload || typeof payload !== 'object') return;

      if (!isReadyRef.current) {
        isReadyRef.current = true;
        if (handshakeIntervalRef.current !== null) {
          window.clearInterval(handshakeIntervalRef.current);
          handshakeIntervalRef.current = null;
        }
        if (pendingFadeRef.current) {
          pendingFadeRef.current = false;
          startFadeIn();
        }
      }

      const info = payload.info;
      let stateUpdate: number | undefined;

      if (payload.event === 'onStateChange' && typeof info === 'number') {
        stateUpdate = info;
      } else if (info && typeof info === 'object') {
        const infoObj = info as {
          playerState?: number;
          currentTime?: number;
          duration?: number;
          volume?: number;
          muted?: boolean;
          videoData?: { video_id?: string };
          videoUrl?: string;
        };

        const loadedId = infoObj.videoData?.video_id;
        if (typeof loadedId === 'string' && loadedId.length > 0 && loadedId !== videoId) {
          resetToOriginal();
          return;
        }

        if (typeof infoObj.videoUrl === 'string' && infoObj.videoUrl.length > 0) {
          try {
            const urlVideoId = new URL(infoObj.videoUrl).searchParams.get('v');
            if (urlVideoId && urlVideoId !== videoId) {
              resetToOriginal();
              return;
            }
          } catch {
            // Ignore malformed URL
          }
        }

        if (typeof infoObj.duration === 'number' && infoObj.duration > 0) {
          if (Math.abs(infoObj.duration - durationRef.current) > 0.5) {
            durationRef.current = infoObj.duration;
            setDuration(infoObj.duration);
          }
        }

        if (
          typeof infoObj.currentTime === 'number' &&
          infoObj.currentTime >= 0 &&
          performance.now() - lastUserSeekAtRef.current > 600
        ) {
          currentTimeRef.current = infoObj.currentTime;
          setCurrentTime(infoObj.currentTime);
        }

        if (typeof infoObj.volume === 'number' && !isFadingRef.current && infoObj.volume > 0) {
          targetVolumeRef.current = Math.max(0, Math.min(100, infoObj.volume));
          setVolume(targetVolumeRef.current);
        }

        if (typeof infoObj.muted === 'boolean') {
          isMutedRef.current = infoObj.muted;
          setIsMuted(infoObj.muted);
        }

        if (typeof infoObj.playerState === 'number') {
          stateUpdate = infoObj.playerState;
        }
      }

      if (typeof stateUpdate === 'number') {
        const prevState = playerStateRef.current;
        playerStateRef.current = stateUpdate;

        if (stateUpdate === 0) {
          resetToOriginal();
          return;
        }

        if (stateUpdate === 1) {
          clearPlayFallbackTimer();
          if (wantPlayingRef.current) {
            setIsPlaying(true);
            setIsBuffering(false);
            setIsCoverVisible(false);
          } else {
            // Started internally: ensure other players pause and reveal video
            wantPlayingRef.current = true;
            setIsPlaying(true);
            setIsBuffering(false);
            setIsCoverVisible(false);
          }
          if (prevState !== 1) {
            pauseOtherAudios(iframeRef.current);
            onPlayStartRef.current?.();
          }
        } else if (stateUpdate === 3) {
          clearPlayFallbackTimer();
          if (wantPlayingRef.current) {
            setIsBuffering(true);
          }
          if (prevState !== 3 && prevState !== 1) {
            pauseOtherAudios(iframeRef.current);
            onPlayStartRef.current?.();
          }
        } else if (stateUpdate === 2) {
          // Ignore momentary pause emitted during active seek while playing
          if (wantPlayingRef.current && performance.now() < seekingGuardUntilRef.current) {
            return;
          }
          wantPlayingRef.current = false;
          setIsCoverVisible(true);
          setIsPlaying(false);
          setIsBuffering(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [videoId, resetToOriginal, startFadeIn, clearPlayFallbackTimer]);

  const pause = useCallback(() => {
    clearPlayFallbackTimer();
    wantPlayingRef.current = false;
    setIsCoverVisible(true);
    setIsPlaying(false);
    setIsBuffering(false);
    cancelFade(true);
    postCommand('pauseVideo');
  }, [cancelFade, clearPlayFallbackTimer, postCommand]);

  // Listen to synchronous cross-player pause events from pauseOtherAudios
  useEffect(() => {
    const handleCrossPause = (ev: Event) => {
      const customEv = ev as CustomEvent<{ except?: HTMLAudioElement | HTMLIFrameElement | null }>;
      if (customEv.detail?.except !== iframeRef.current && wantPlayingRef.current) {
        pause();
      }
    };
    window.addEventListener('fc-pause-other-youtube', handleCrossPause);
    return () => {
      window.removeEventListener('fc-pause-other-youtube', handleCrossPause);
    };
  }, [pause]);

  useEffect(() => {
    return () => {
      clearPlayFallbackTimer();
      cancelFade(false);
    };
  }, [cancelFade, clearPlayFallbackTimer]);

  const scheduleAutoplayFallback = useCallback(
    (targetSeconds: number, withFade: boolean) => {
      clearPlayFallbackTimer();
      playFallbackTimerRef.current = window.setTimeout(() => {
        if (!wantPlayingRef.current) return;
        if (playerStateRef.current !== 1 && playerStateRef.current !== 3) {
          pendingFadeRef.current = withFade;
          isReadyRef.current = false;
          playerStateRef.current = -1;
          setIframeSrc(buildYouTubeEmbedUrl(videoId, targetSeconds, createRefreshToken()));
        }
      }, 900);
    },
    [videoId, clearPlayFallbackTimer]
  );

  const play = useCallback(() => {
    pauseOtherAudios(iframeRef.current);
    onPlayStartRef.current?.();
    wantPlayingRef.current = true;
    setIsBuffering(true);

    const resumeAt = currentTimeRef.current;

    if (isReadyRef.current) {
      cancelFade(true);
      postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
      postCommand('playVideo');
      scheduleAutoplayFallback(resumeAt, false);
    } else {
      pendingFadeRef.current = false;
      playerStateRef.current = -1;
      setIframeSrc(buildYouTubeEmbedUrl(videoId, resumeAt, createRefreshToken()));
    }
  }, [videoId, cancelFade, postCommand, scheduleAutoplayFallback]);

  const togglePlay = useCallback(() => {
    if (wantPlayingRef.current || isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const seekDirectTo = useCallback(
    (seconds: number) => {
      const maxDur = durationRef.current > 0 ? durationRef.current : Infinity;
      const clamped = Math.max(0, Math.min(maxDur, seconds));
      lastUserSeekAtRef.current = performance.now();
      currentTimeRef.current = clamped;
      setCurrentTime(clamped);

      if (wantPlayingRef.current) {
        seekingGuardUntilRef.current = performance.now() + 900;
        if (isReadyRef.current) {
          cancelFade(true);
          postCommand('seekTo', [clamped, true]);
          postCommand('playVideo');
        } else {
          pendingFadeRef.current = false;
          setIframeSrc(buildYouTubeEmbedUrl(videoId, clamped, createRefreshToken()));
        }
      } else if (isReadyRef.current) {
        postCommand('seekTo', [clamped, true]);
        postCommand('pauseVideo');
      }
    },
    [videoId, cancelFade, postCommand]
  );

  const seekWithFade = useCallback(
    (seconds: number) => {
      const clamped = Math.max(0, seconds);
      pauseOtherAudios(iframeRef.current);
      onPlayStartRef.current?.();

      wantPlayingRef.current = true;
      lastUserSeekAtRef.current = performance.now();
      seekingGuardUntilRef.current = performance.now() + 1200;
      currentTimeRef.current = clamped;
      setCurrentTime(clamped);
      setIsBuffering(true);

      if (isReadyRef.current) {
        postCommand('setVolume', [0]);
        postCommand('seekTo', [clamped, true]);
        postCommand('playVideo');
        startFadeIn();
        scheduleAutoplayFallback(clamped, true);
      } else {
        pendingFadeRef.current = true;
        playerStateRef.current = -1;
        setIframeSrc(buildYouTubeEmbedUrl(videoId, clamped, createRefreshToken()));
      }
    },
    [videoId, postCommand, startFadeIn, scheduleAutoplayFallback]
  );

  const playFromStart = useCallback(() => {
    pauseOtherAudios(iframeRef.current);
    onPlayStartRef.current?.();
    cancelFade(true);

    wantPlayingRef.current = true;
    lastUserSeekAtRef.current = performance.now();
    seekingGuardUntilRef.current = performance.now() + 1200;
    currentTimeRef.current = 0;
    setCurrentTime(0);
    setIsBuffering(true);

    if (isReadyRef.current) {
      postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
      postCommand('seekTo', [0, true]);
      postCommand('playVideo');
      scheduleAutoplayFallback(0, false);
    } else {
      pendingFadeRef.current = false;
      playerStateRef.current = -1;
      setIframeSrc(buildYouTubeEmbedUrl(videoId, 0, createRefreshToken()));
    }
  }, [videoId, cancelFade, postCommand, scheduleAutoplayFallback]);

  const setUserVolume = useCallback(
    (volumePercent: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(volumePercent)));
      cancelFade(false);
      targetVolumeRef.current = clamped;
      setVolume(clamped);

      if (clamped > 0 && isMutedRef.current) {
        isMutedRef.current = false;
        setIsMuted(false);
        postCommand('unMute');
      }
      postCommand('setVolume', [clamped]);
    },
    [cancelFade, postCommand]
  );

  const toggleMute = useCallback(() => {
    const nextMuted = !isMutedRef.current;
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      cancelFade(false);
      postCommand('mute');
      postCommand('setVolume', [0]);
    } else {
      const restored = targetVolumeRef.current > 0 ? targetVolumeRef.current : 100;
      targetVolumeRef.current = restored;
      setVolume(restored);
      postCommand('unMute');
      postCommand('setVolume', [restored]);
    }
  }, [cancelFade, postCommand]);

  const handleLoad = useCallback(() => {
    sendListeningHandshake();
  }, [sendListeningHandshake]);

  return {
    videoId,
    iframeSrc,
    iframeRef,
    handleLoad,
    isPlaying,
    isBuffering,
    isCoverVisible,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    seekDirectTo,
    seekWithFade,
    playFromStart,
    setUserVolume,
    toggleMute,
  };
}
