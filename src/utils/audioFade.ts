interface ActiveFade {
  intervalId: number;
  targetVolume: number;
}

const activeFades = new WeakMap<HTMLAudioElement, ActiveFade>();

function getTargetVolume(audio: HTMLAudioElement): number {
  const stored = parseFloat(audio.dataset.userVolume ?? '');
  if (Number.isFinite(stored)) {
    return Math.max(0, Math.min(1, stored));
  }
  const existing = activeFades.get(audio);
  if (existing) {
    return existing.targetVolume;
  }
  return Math.max(0, Math.min(1, audio.volume || 1));
}

/**
 * Cancels any in-progress timestamp fade-in on an audio element.
 */
export function cancelAudioFade(audio: HTMLAudioElement | null, restoreVolume = true): void {
  if (!audio) return;
  const existing = activeFades.get(audio);
  if (existing) {
    window.clearInterval(existing.intervalId);
    activeFades.delete(audio);
  }
  const targetVolume = getTargetVolume(audio);
  delete audio.dataset.fading;
  if (restoreVolume) {
    audio.volume = targetVolume;
  }
}

const pendingMetadataSeeks = new WeakMap<HTMLAudioElement, () => void>();

function applySeekSafely(audio: HTMLAudioElement, seconds: number): void {
  const prevListener = pendingMetadataSeeks.get(audio);
  if (prevListener) {
    audio.removeEventListener('loadedmetadata', prevListener);
    pendingMetadataSeeks.delete(audio);
  }

  if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
    audio.load();
  }

  if (audio.readyState >= 1) {
    audio.currentTime = seconds;
  } else {
    const onMetadata = () => {
      pendingMetadataSeeks.delete(audio);
      audio.currentTime = seconds;
    };
    pendingMetadataSeeks.set(audio, onMetadata);
    audio.addEventListener('loadedmetadata', onMetadata, { once: true });
    try {
      audio.currentTime = seconds;
    } catch {
      // Wait for loadedmetadata handler
    }
  }
}

/**
 * Pauses any other playing <audio> elements on the page so only one work plays at a time.
 */
export function pauseOtherAudios(except?: HTMLAudioElement | null): void {
  document.querySelectorAll('audio').forEach((other) => {
    if (other !== except && !other.paused) {
      cancelAudioFade(other, true);
      other.pause();
    }
  });
}

/**
 * Seeks an HTMLAudioElement to `seconds` and smoothly fades the audio volume in
 * once playback actually commences at the new timestamp (preventing abrupt cuts
 * even if the browser briefly buffers after seeking).
 */
export function seekWithFadeIn(
  audio: HTMLAudioElement | null,
  seconds: number,
  fadeDurationMs = 2400
): void {
  if (!audio) return;

  pauseOtherAudios(audio);

  const targetVolume = getTargetVolume(audio);
  cancelAudioFade(audio, false);

  audio.dataset.userVolume = String(targetVolume);
  audio.dataset.fading = 'true';
  audio.volume = 0;
  applySeekSafely(audio, seconds);

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      cancelAudioFade(audio, true);
    });
  }

  if (targetVolume === 0 || audio.muted) {
    cancelAudioFade(audio, true);
    return;
  }

  const initiatedAt = performance.now();
  let fadeStartedAt: number | null = null;

  const intervalId = window.setInterval(() => {
    const now = performance.now();

    // If playback was paused or blocked after initiation, abort cleanly
    if (audio.paused && now - initiatedAt > 500) {
      cancelAudioFade(audio, true);
      return;
    }

    // Wait until the browser finishes seeking/buffering at the target timestamp
    if (fadeStartedAt === null) {
      const isReadyAndPlaying = !audio.paused && !audio.seeking && audio.readyState >= 3;
      const timedOutWaiting = !audio.paused && now - initiatedAt > 2500;
      if (isReadyAndPlaying || timedOutWaiting) {
        fadeStartedAt = now;
      } else {
        audio.volume = 0;
        return;
      }
    }

    const elapsed = now - fadeStartedAt;
    const progress = Math.min(1, elapsed / fadeDurationMs);
    // Smooth perceptual curve (gentle emergence rising to full target volume)
    const eased = Math.pow(progress, 1.5);
    audio.volume = Math.max(0, Math.min(1, targetVolume * eased));

    if (progress >= 1) {
      cancelAudioFade(audio, true);
    }
  }, 30);

  activeFades.set(audio, { intervalId, targetVolume });
}

/**
 * Seeks an HTMLAudioElement directly to `seconds` and starts playback immediately
 * at full target volume without any fade-in (used for main audios and movement starts).
 */
export function seekDirect(audio: HTMLAudioElement | null, seconds: number): void {
  if (!audio) return;

  pauseOtherAudios(audio);
  cancelAudioFade(audio, true);
  applySeekSafely(audio, seconds);

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}
