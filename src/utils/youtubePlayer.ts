import React, { useState, useRef, useEffect, useCallback } from 'react';
import { pauseOtherAudios } from './audioFade';

let nextWidgetInstanceId = 1;

export function buildYouTubeEmbedUrl(
  videoId: string,
  widgetId: number,
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
    widgetid: String(widgetId),
  });
  if (cacheBust) {
    params.set('cb', cacheBust);
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    params.set('origin', window.location.origin);
    params.set('forigin', window.location.href);
  }
  if (typeof document !== 'undefined' && document.referrer) {
    params.set('widget_referrer', document.referrer.substring(0, 256));
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

type PendingPlayerAction =
  | { type: 'play'; seconds: number }
  | { type: 'playFromStart' }
  | { type: 'seekWithFade'; seconds: number }
  | { type: 'seekDirect'; seconds: number; shouldPlay: boolean };

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
  const widgetIdRef = useRef<number>(0);
  if (widgetIdRef.current === 0) {
    widgetIdRef.current = nextWidgetInstanceId++;
  }

  const [iframeSrc, setIframeSrc] = useState<string>(() =>
    buildYouTubeEmbedUrl(videoId, widgetIdRef.current)
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isCoverVisible, setIsCoverVisible] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const isReadyRef = useRef<boolean>(false);
  const hasStartedPlaybackRef = useRef<boolean>(false);
  const playerStateRef = useRef<number>(-1);
  const wantPlayingRef = useRef<boolean>(false);
  const currentTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const targetVolumeRef = useRef<number>(100);
  const isMutedRef = useRef<boolean>(false);
  const isFadingRef = useRef<boolean>(false);
  const awaitingPostSeekPlayRef = useRef<boolean>(false);
  const pendingSeekTargetRef = useRef<number | null>(null);
  const pendingActionRef = useRef<PendingPlayerAction | null>(null);
  const pendingFallbackFadeRef = useRef<boolean>(false);
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
    } catch {
      // Ignore
    }
  }, []);

  const registerWidgetEvents = useCallback(() => {
    postCommand('addEventListener', ['onReady']);
    postCommand('addEventListener', ['onStateChange']);
  }, [postCommand]);

  const cancelFade = useCallback(
    (restoreVolume = true) => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      isFadingRef.current = false;
      awaitingPostSeekPlayRef.current = false;
      if (restoreVolume) {
        postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
      }
    },
    [postCommand]
  );

  const startFadeIn = useCallback(
    (fadeDurationMs = 2200) => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      if (isMutedRef.current || targetVolumeRef.current === 0) {
        isFadingRef.current = false;
        awaitingPostSeekPlayRef.current = false;
        postCommand('setVolume', [0]);
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

        if (!wantPlayingRef.current || state === 0) {
          cancelFade(true);
          return;
        }

        if (fadeStartedAt === null) {
          const isPlayingPostSeek =
            state === 1 && (!awaitingPostSeekPlayRef.current || now - initiatedAt > 900);
          const timedOutWaiting = now - initiatedAt > 2800;

          if (isPlayingPostSeek || timedOutWaiting) {
            awaitingPostSeekPlayRef.current = false;
            fadeStartedAt = now;
          } else {
            postCommand('setVolume', [0]);
            return;
          }
        }

        const elapsed = now - fadeStartedAt;
        const progress = Math.min(1, elapsed / fadeDurationMs);
        const eased = Math.pow(progress, 1.4);
        postCommand('setVolume', [Math.round(targetVol * eased)]);

        if (progress >= 1) {
          cancelFade(true);
        }
      }, 35);
    },
    [cancelFade, postCommand]
  );

  const scheduleAutoplayFallback = useCallback(
    (targetSeconds: number, withFade: boolean) => {
      clearPlayFallbackTimer();
      playFallbackTimerRef.current = window.setTimeout(() => {
        if (!wantPlayingRef.current) return;
        if (playerStateRef.current !== 1 && playerStateRef.current !== 3) {
          pendingFallbackFadeRef.current = withFade;
          pendingActionRef.current = null;
          isReadyRef.current = false;
          hasStartedPlaybackRef.current = false;
          playerStateRef.current = -1;
          setIframeSrc(
            buildYouTubeEmbedUrl(
              videoId,
              widgetIdRef.current,
              targetSeconds,
              createRefreshToken()
            )
          );
        }
      }, 1800);
    },
    [videoId, clearPlayFallbackTimer]
  );

  const executeReadyAction = useCallback(
    (action: PendingPlayerAction) => {
      if (action.type === 'seekWithFade') {
        const clamped = Math.max(0, action.seconds);
        awaitingPostSeekPlayRef.current = true;
        pendingSeekTargetRef.current = clamped;
        postCommand('setVolume', [0]);
        if (hasStartedPlaybackRef.current) {
          postCommand('seekTo', [clamped, true]);
          postCommand('playVideo');
        } else {
          postCommand('loadVideoById', [videoId, clamped]);
        }
        startFadeIn();
        scheduleAutoplayFallback(clamped, true);
      } else if (action.type === 'playFromStart') {
        cancelFade(true);
        pendingSeekTargetRef.current = 0;
        postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
        if (hasStartedPlaybackRef.current) {
          postCommand('seekTo', [0, true]);
          postCommand('playVideo');
        } else {
          postCommand('playVideo');
        }
        scheduleAutoplayFallback(0, false);
      } else if (action.type === 'play') {
        const resumeAt = Math.max(0, action.seconds);
        cancelFade(true);
        postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
        if (!hasStartedPlaybackRef.current && resumeAt > 0.5) {
          pendingSeekTargetRef.current = resumeAt;
          postCommand('loadVideoById', [videoId, resumeAt]);
        } else {
          postCommand('playVideo');
        }
        scheduleAutoplayFallback(resumeAt, false);
      } else if (action.type === 'seekDirect') {
        const clamped = Math.max(0, action.seconds);
        if (action.shouldPlay) {
          cancelFade(true);
          pendingSeekTargetRef.current = clamped;
          postCommand('setVolume', [isMutedRef.current ? 0 : targetVolumeRef.current]);
          if (hasStartedPlaybackRef.current) {
            postCommand('seekTo', [clamped, true]);
            postCommand('playVideo');
          } else {
            postCommand('loadVideoById', [videoId, clamped]);
          }
          scheduleAutoplayFallback(clamped, false);
        } else if (hasStartedPlaybackRef.current) {
          postCommand('seekTo', [clamped, true]);
          postCommand('pauseVideo');
        }
      }
    },
    [videoId, cancelFade, postCommand, startFadeIn, scheduleAutoplayFallback]
  );

  const resetToOriginal = useCallback(() => {
    const now = performance.now();
    if (now - lastResetAtRef.current < 800) return;
    lastResetAtRef.current = now;

    clearPlayFallbackTimer();
    cancelFade(false);
    pendingFallbackFadeRef.current = false;
    pendingActionRef.current = null;
    pendingSeekTargetRef.current = null;
    wantPlayingRef.current = false;

    setIsCoverVisible(true);
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
    currentTimeRef.current = 0;

    postCommand('stopVideo');
    postCommand('pauseVideo');

    isReadyRef.current = false;
    hasStartedPlaybackRef.current = false;
    playerStateRef.current = -1;
    setIframeSrc(
      buildYouTubeEmbedUrl(videoId, widgetIdRef.current, undefined, createRefreshToken())
    );
  }, [videoId, cancelFade, clearPlayFallbackTimer, postCommand]);

  const startHandshakePolling = useCallback(() => {
    if (handshakeIntervalRef.current !== null) {
      window.clearInterval(handshakeIntervalRef.current);
      handshakeIntervalRef.current = null;
    }

    let attempts = 0;
    sendListeningHandshake();

    handshakeIntervalRef.current = window.setInterval(() => {
      attempts += 1;
      if (isReadyRef.current || attempts > 50) {
        if (handshakeIntervalRef.current !== null) {
          window.clearInterval(handshakeIntervalRef.current);
          handshakeIntervalRef.current = null;
        }
        return;
      }
      sendListeningHandshake();
    }, 200);
  }, [sendListeningHandshake]);

  // Poll listening handshake until the iframe widget channel responds
  useEffect(() => {
    startHandshakePolling();
    return () => {
      if (handshakeIntervalRef.current !== null) {
        window.clearInterval(handshakeIntervalRef.current);
        handshakeIntervalRef.current = null;
      }
    };
  }, [iframeSrc, startHandshakePolling]);

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

      // YouTube sends `readyToListen` when its embed script finishes booting and is
      // ready to receive `{ event: "listening" }`. Must reply and keep polling until
      // `initialDelivery` / `onReady` arrives.
      if (payload.event === 'readyToListen') {
        sendListeningHandshake();
        return;
      }

      if (
        payload.event === 'initialDelivery' ||
        payload.event === 'alreadyInitialized' ||
        payload.event === 'onReady' ||
        payload.event === 'infoDelivery' ||
        payload.event === 'onStateChange'
      ) {
        if (handshakeIntervalRef.current !== null) {
          window.clearInterval(handshakeIntervalRef.current);
          handshakeIntervalRef.current = null;
        }

        if (payload.event === 'initialDelivery' || payload.event === 'alreadyInitialized') {
          registerWidgetEvents();
        }

        if (!isReadyRef.current) {
          isReadyRef.current = true;

          if (pendingFallbackFadeRef.current) {
            pendingFallbackFadeRef.current = false;
            awaitingPostSeekPlayRef.current = false;
            startFadeIn();
          }

          if (pendingActionRef.current) {
            const queued = pendingActionRef.current;
            pendingActionRef.current = null;
            executeReadyAction(queued);
          }
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

        if (typeof infoObj.playerState === 'number') {
          stateUpdate = infoObj.playerState;
        }

        if (typeof infoObj.currentTime === 'number' && infoObj.currentTime >= 0) {
          const msSinceSeek = performance.now() - lastUserSeekAtRef.current;
          const effectiveState =
            typeof stateUpdate === 'number' ? stateUpdate : playerStateRef.current;

          if (
            pendingSeekTargetRef.current !== null &&
            effectiveState === 1 &&
            msSinceSeek > 350
          ) {
            const target = pendingSeekTargetRef.current;
            if (Math.abs(infoObj.currentTime - target) > 4) {
              if (isFadingRef.current) {
                postCommand('setVolume', [0]);
              }
              postCommand('seekTo', [target, true]);
              pendingSeekTargetRef.current = null;
              lastUserSeekAtRef.current = performance.now();
            } else {
              pendingSeekTargetRef.current = null;
              awaitingPostSeekPlayRef.current = false;
            }
          }

          if (msSinceSeek > 550) {
            currentTimeRef.current = infoObj.currentTime;
            setCurrentTime(infoObj.currentTime);
          }
        }

        if (typeof infoObj.muted === 'boolean') {
          isMutedRef.current = infoObj.muted;
          setIsMuted(infoObj.muted);
        }
      }

      if (typeof stateUpdate === 'number') {
        const prevState = playerStateRef.current;
        playerStateRef.current = stateUpdate;

        if (stateUpdate === 1 || stateUpdate === 2 || stateUpdate === 3) {
          hasStartedPlaybackRef.current = true;
        }

        if (stateUpdate === 0) {
          resetToOriginal();
          return;
        }

        if (stateUpdate === 1) {
          clearPlayFallbackTimer();
          awaitingPostSeekPlayRef.current = false;
          wantPlayingRef.current = true;
          setIsPlaying(true);
          setIsBuffering(false);
          setIsCoverVisible(false);

          if (prevState !== 1) {
            pauseOtherAudios(iframeRef.current);
            onPlayStartRef.current?.();
          }
        } else if (stateUpdate === 3) {
          clearPlayFallbackTimer();
          if (isFadingRef.current) {
            postCommand('setVolume', [0]);
          }
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
  }, [
    videoId,
    resetToOriginal,
    startFadeIn,
    clearPlayFallbackTimer,
    sendListeningHandshake,
    registerWidgetEvents,
    executeReadyAction,
    postCommand,
  ]);

  const pause = useCallback(() => {
    clearPlayFallbackTimer();
    pendingActionRef.current = null;
    pendingSeekTargetRef.current = null;
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

  const play = useCallback(() => {
    pauseOtherAudios(iframeRef.current);
    onPlayStartRef.current?.();
    wantPlayingRef.current = true;
    setIsBuffering(true);

    const resumeAt = currentTimeRef.current;
    const action: PendingPlayerAction = { type: 'play', seconds: resumeAt };

    if (isReadyRef.current) {
      executeReadyAction(action);
    } else {
      pendingActionRef.current = action;
      scheduleAutoplayFallback(resumeAt, false);
    }
  }, [executeReadyAction, scheduleAutoplayFallback]);

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

      const shouldPlay = wantPlayingRef.current;
      if (shouldPlay) {
        seekingGuardUntilRef.current = performance.now() + 1200;
      }

      const action: PendingPlayerAction = {
        type: 'seekDirect',
        seconds: clamped,
        shouldPlay,
      };

      if (isReadyRef.current) {
        executeReadyAction(action);
      } else if (shouldPlay) {
        pendingActionRef.current = action;
        scheduleAutoplayFallback(clamped, false);
      }
    },
    [executeReadyAction, scheduleAutoplayFallback]
  );

  const seekWithFade = useCallback(
    (seconds: number) => {
      const maxDur = durationRef.current > 0 ? durationRef.current : Infinity;
      const clamped = Math.max(0, Math.min(maxDur, seconds));
      pauseOtherAudios(iframeRef.current);
      onPlayStartRef.current?.();

      wantPlayingRef.current = true;
      lastUserSeekAtRef.current = performance.now();
      seekingGuardUntilRef.current = performance.now() + 1500;
      currentTimeRef.current = clamped;
      setCurrentTime(clamped);
      setIsBuffering(true);

      const action: PendingPlayerAction = { type: 'seekWithFade', seconds: clamped };

      if (isReadyRef.current) {
        executeReadyAction(action);
      } else {
        pendingActionRef.current = action;
        scheduleAutoplayFallback(clamped, true);
      }
    },
    [executeReadyAction, scheduleAutoplayFallback]
  );

  const playFromStart = useCallback(() => {
    pauseOtherAudios(iframeRef.current);
    onPlayStartRef.current?.();

    wantPlayingRef.current = true;
    lastUserSeekAtRef.current = performance.now();
    seekingGuardUntilRef.current = performance.now() + 1500;
    currentTimeRef.current = 0;
    setCurrentTime(0);
    setIsBuffering(true);

    const action: PendingPlayerAction = { type: 'playFromStart' };

    if (isReadyRef.current) {
      executeReadyAction(action);
    } else {
      pendingActionRef.current = action;
      scheduleAutoplayFallback(0, false);
    }
  }, [executeReadyAction, scheduleAutoplayFallback]);

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
    if (!isReadyRef.current) {
      startHandshakePolling();
    }
  }, [startHandshakePolling]);

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
