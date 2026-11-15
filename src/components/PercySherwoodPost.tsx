import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  PERCY_SHERWOOD_ORCHESTRAL_WORKS
} from '../data/percySherwoodData';
import { ZoomIn, X, ArrowLeft, ArrowUp, BookOpen, PenLine, Volume2, ExternalLink, Play } from 'lucide-react';
import { HolePunchMargin } from './HolePunchMargin';
import { QuaversIcon } from './QuaversIcon';
import { pauseOtherAudios } from '../utils/audioFade';

const SHERWOOD_YT_VIDEO_ID = 'mzjZDheV0Ks';

interface SherwoodMovement {
  num: number;
  label: string;
  time: number;
  timeStr: string;
}

const SHERWOOD_MOVEMENTS: SherwoodMovement[] = [
  { num: 1, label: '1st mov – Adagio – Allegro molto', time: 0, timeStr: '00:00' },
  { num: 2, label: '2nd mov – Adagio', time: 894, timeStr: '14:54' },
  { num: 3, label: '3rd mov – Scherzo prestissimo', time: 1537, timeStr: '25:37' },
  { num: 4, label: '4th mov – Allegro con fuoco', time: 2013, timeStr: '33:33' },
];

interface YTPlayer {
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  getVolume?: () => number;
  setVolume?: (volume: number) => void;
  getPlayerState?: () => number;
  isMuted?: () => boolean;
}

interface YTNamespace {
  Player: new (
    element: HTMLIFrameElement | string,
    options?: {
      events?: {
        onReady?: (event: { target: YTPlayer }) => void;
      };
    }
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const getSherwoodEmbedUrl = (startSeconds?: number): string => {
  const params = new URLSearchParams({
    enablejsapi: '1',
    rel: '0',
    cb: '202611151003',
  });
  if (typeof window !== 'undefined' && window.location.origin) {
    params.set('origin', window.location.origin);
  }
  if (typeof startSeconds === 'number') {
    params.set('start', String(startSeconds));
    params.set('autoplay', '1');
  }
  return `https://www.youtube.com/embed/${SHERWOOD_YT_VIDEO_ID}?${params.toString()}`;
};

interface PercySherwoodPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const PercySherwoodPost: React.FC<PercySherwoodPostProps> = ({
  onBack,
  isFeatured = false
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [activeMovement, setActiveMovement] = useState<number | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string>(() => getSherwoodEmbedUrl());

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const isPlayerReadyRef = useRef<boolean>(false);
  const fadeIntervalRef = useRef<number | null>(null);
  const targetVolumeRef = useRef<number>(100);
  const isFadingRef = useRef<boolean>(false);
  const pendingFadeInRef = useRef<boolean>(false);

  const cancelYTFade = useCallback((restoreVolume = true) => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    isFadingRef.current = false;
    if (restoreVolume && ytPlayerRef.current?.setVolume) {
      try {
        ytPlayerRef.current.setVolume(targetVolumeRef.current);
      } catch {
        // Ignore if player is unmounted
      }
    }
  }, []);

  const startYTFadeIn = useCallback(
    (player: YTPlayer, fadeDurationMs = 2400) => {
      if (!player.setVolume) return;

      if (!isFadingRef.current && player.getVolume) {
        try {
          const currentVol = player.getVolume();
          if (Number.isFinite(currentVol) && currentVol > 0) {
            targetVolumeRef.current = Math.max(0, Math.min(100, currentVol));
          }
        } catch {
          // Keep existing targetVolumeRef
        }
      }

      cancelYTFade(false);

      try {
        if (player.isMuted?.() || targetVolumeRef.current === 0) {
          cancelYTFade(true);
          return;
        }
      } catch {
        // Continue with fade attempt
      }

      const targetVol = targetVolumeRef.current;
      isFadingRef.current = true;
      try {
        player.setVolume(0);
      } catch {
        cancelYTFade(true);
        return;
      }

      const initiatedAt = performance.now();
      let fadeStartedAt: number | null = null;

      fadeIntervalRef.current = window.setInterval(() => {
        const now = performance.now();
        let state: number | undefined;
        try {
          state = player.getPlayerState?.();
        } catch {
          cancelYTFade(true);
          return;
        }

        // Abort cleanly if user paused (2) or video ended (0)
        if ((state === 2 || state === 0) && now - initiatedAt > 500) {
          cancelYTFade(true);
          return;
        }

        // Wait until playback actually begins (1 = PLAYING) at the target timestamp
        if (fadeStartedAt === null) {
          const isPlaying = state === 1;
          const timedOutWaiting = now - initiatedAt > 2500;
          if (isPlaying || timedOutWaiting) {
            fadeStartedAt = now;
          } else {
            try {
              player.setVolume?.(0);
            } catch {
              cancelYTFade(true);
            }
            return;
          }
        }

        const elapsed = now - fadeStartedAt;
        const progress = Math.min(1, elapsed / fadeDurationMs);
        const eased = Math.pow(progress, 1.5);
        try {
          player.setVolume?.(Math.round(targetVol * eased));
        } catch {
          cancelYTFade(true);
          return;
        }

        if (progress >= 1) {
          cancelYTFade(true);
        }
      }, 30);
    },
    [cancelYTFade]
  );

  const initYTPlayer = useCallback(() => {
    if (!iframeRef.current || !window.YT?.Player) return;
    isPlayerReadyRef.current = false;
    try {
      ytPlayerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event) => {
            ytPlayerRef.current = event.target;
            isPlayerReadyRef.current = true;
            if (pendingFadeInRef.current) {
              pendingFadeInRef.current = false;
              startYTFadeIn(event.target);
            }
          },
        },
      });
    } catch {
      // Fallback to URL-based seeking if IFrame API fails to bind
    }
  }, [startYTFadeIn]);

  useEffect(() => {
    let cancelled = false;

    const attach = () => {
      if (!cancelled) {
        initYTPlayer();
      }
    };

    if (window.YT?.Player) {
      attach();
    } else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousReady === 'function') {
          previousReady();
        }
        attach();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      cancelYTFade(false);
      ytPlayerRef.current = null;
      isPlayerReadyRef.current = false;
    };
  }, [initYTPlayer, cancelYTFade]);

  const handleJumpToMovement = (mov: SherwoodMovement) => {
    pauseOtherAudios();
    setActiveMovement(mov.num);
    if (ytPlayerRef.current && isPlayerReadyRef.current) {
      const player = ytPlayerRef.current;
      if (!isFadingRef.current && player.getVolume) {
        try {
          const currentVol = player.getVolume();
          if (Number.isFinite(currentVol) && currentVol > 0) {
            targetVolumeRef.current = Math.max(0, Math.min(100, currentVol));
          }
        } catch {
          // Ignore
        }
      }
      try {
        player.setVolume?.(0);
      } catch {
        // Ignore
      }
      player.seekTo(mov.time, true);
      player.playVideo();
      startYTFadeIn(player);
    } else {
      pendingFadeInRef.current = true;
      isPlayerReadyRef.current = false;
      ytPlayerRef.current = null;
      setIframeSrc(getSherwoodEmbedUrl(mov.time));
    }
  };

  const portraitSrc = `${import.meta.env.BASE_URL}assets/aistudio/photo2_199f64f0.jpg`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article
      id="percy-sherwood-post"
      className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900"
    >
      <div className="max-w-4xl mx-auto">
        {isFeatured && (
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 uppercase whitespace-nowrap">
              FEATURED POST
            </span>
          </div>
        )}

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3 text-balance">
            Percy Sherwood (1866–1939)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;A tale of two cities and three symphonies&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="sherwood-bio">
          {/* Portrait on Left & Compact Audio Realisations + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => !imageFailed && setActiveImageModal(portraitSrc)}
                title="Click to enlarge Percy Sherwood portrait"
              >
                {imageFailed ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-stone-100 text-stone-600 font-serif text-xs">
                    <span className="font-bold text-stone-800">Percy Sherwood</span>
                    <span className="italic mt-1">1866–1939</span>
                  </div>
                ) : (
                  <img
                    src={portraitSrc}
                    alt="Archival portrait of composer Percy Sherwood (1866–1939)"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-102 transition-transform duration-200"
                  />
                )}
                {!imageFailed && (
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Percy Sherwood
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisations Work-Page Selector */}
              <div
                id="sherwood-audio-selector"
                className="w-full sm:w-1/2 scroll-mt-24"
              >
                <div className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xs text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-amber-900 uppercase">
                      Audio Realisation
                    </span>
                    <QuaversIcon ascending className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToSection('sherwood-symphony-2-section')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Symphony No. 2 in G major (1905)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Born in Dresden to an English lecturer, John Sherwood, and the German pianist Auguste Koch, Percy Sherwood inherited a dual musical citizenship. He entered the Dresden Royal Conservatoire in 1885, studying piano with Theodor Kirchner and composition under the renowned symphonist Felix Draeseke.
              </p>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              In 1889, at just twenty-three, Sherwood won the prestigious German Mendelssohn State Prize in Berlin for his <em>Requiem</em>, and by 1893 had been appointed professor of piano at the Dresden Conservatoire.
            </p>
            <p>
              With Sherwood&apos;s many English connections it seems he visited England quite often. We know that he completed the first two movements of his Third Symphony at Highcliffe-On-Sea in 1905. During another visit in the summer of 1914 everything changed. With the outbreak of the First World War, Sherwood&apos;s British nationality rendered him an enemy alien in Saxony. Percy along with his family were forced to remain in England for the duration. After 1918, they opted to stay, selling up their imposing mansion Villa Sherwood in Dresden. He made a living as a private teacher in London and travelled weekly to Oxford and Cambridge. He died in London.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              There&apos;s a detailed biography of Percy Sherwood by Joseph Spooner in a{' '}
              <a
                href="https://d2vhizysjb6bpn.cloudfront.net/TOCC0145-cd-notes.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:text-amber-950 underline underline-offset-2 font-medium transition-colors"
              >
                Toccata Classics Booklet
              </a>
              .
            </p>
            <p>
              All three surviving symphonies were completed before the war. Apparently there were two later works, presumably composed in England but these seem to be lost.
            </p>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="sherwood-works-table" className="mt-10 pt-6 border-t border-stone-300/80">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Orchestral work list
            </h2>
            <p className="font-serif italic text-stone-700 text-lg sm:text-xl sm:text-right">
              Showing only surviving scores MS or published
            </p>
          </div>

          {/* Works Table */}
          <div className="bg-white border border-stone-300 rounded-lg shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2A2621] text-stone-200 font-serif text-sm tracking-wider uppercase border-b border-stone-300">
                    <th className="py-2.5 px-4 sm:px-6 font-semibold">Work</th>
                    <th className="py-2.5 px-4 sm:px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm font-sans">
                  {PERCY_SHERWOOD_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('sherwood-symphony-2-section')}
                            className="inline-flex items-center gap-2 text-left font-serif text-base sm:text-lg text-black hover:text-amber-950 font-bold transition-colors cursor-pointer group"
                            title={`Jump to ${work.title} spotlight and recording`}
                          >
                            <span>{work.title}</span>
                            <Volume2 className="w-4 h-4 text-amber-900 shrink-0 group-hover:scale-110 transition-transform" />
                          </button>
                        ) : (
                          <span className="font-serif text-base sm:text-lg text-stone-900 font-semibold">
                            {work.title}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums whitespace-nowrap">
                        {work.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Missing Scores Note */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              MISSING SCORES:
            </span>
            4th Symphony ; 5th Symphony
          </p>
        </section>

        {/* Section 3: Feature on 2nd Symphony */}
        <section
          id="sherwood-symphony-2-section"
          className="mt-14 pt-8 border-t border-stone-300/80 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4 text-balance">
              Symphony No. 2 in G major (1905)
            </h2>

            {/* Embedded YouTube Recording */}
            <div className="max-w-xl mx-auto mt-6">
              <div className="bg-white border-2 border-stone-300 rounded-lg p-2 sm:p-2.5 shadow-sm">
                <div className="relative w-full aspect-video overflow-hidden rounded border border-stone-200 bg-stone-950">
                  <iframe
                    ref={iframeRef}
                    id="sherwood-youtube-player"
                    src={iframeSrc}
                    onLoad={() => {
                      if (!isPlayerReadyRef.current && window.YT?.Player) {
                        initYTPlayer();
                      }
                    }}
                    title="Percy Sherwood - Symphony No 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-serif text-stone-600">
                  <span className="italic">
                    Percy Sherwood — <em>Symphony No. 2 in G major</em> (1905)
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${SHERWOOD_YT_VIDEO_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-900 hover:text-amber-950 font-semibold underline underline-offset-2 transition-colors"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Movement Timestamp Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {SHERWOOD_MOVEMENTS.map((mov) => (
                <button
                  key={mov.num}
                  type="button"
                  onClick={() => handleJumpToMovement(mov)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                    activeMovement === mov.num
                      ? 'bg-amber-100 ring-2 ring-amber-800 text-stone-900 shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-stone-800 hover:border-amber-400'
                  }`}
                  title={`Jump to ${mov.label} (${mov.timeStr})`}
                >
                  <Play className="w-3 h-3 text-amber-900 shrink-0" />
                  <span>{mov.label}</span>
                  <span className="font-mono text-[11px] text-amber-900">
                    ({mov.timeStr})
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 hover:text-amber-900 border border-stone-300 rounded-md font-mono text-xs font-semibold tracking-wider uppercase shadow-2xs transition-colors cursor-pointer"
                title="Read from the top while you listen"
              >
                <ArrowUp className="w-3.5 h-3.5 text-amber-900" />
                <span>READ FROM THE TOP WHILE YOU LISTEN</span>
              </button>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Written in 1905 during the decade of Sherwood&apos;s Dresden professorship, the <em>Symphony No. 2 in G major</em> reveals a more mature symphonic palette. Scored for full romantic orchestra, it stands among the most substantial symphonic works composed by any British-born musician working in Germany before the Great War.
            </p>

            {/* Section Heading above Manuscript Notes */}
            <div className="flex items-center gap-2.5 pt-2">
              <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-amber-950 tracking-tight">
                Some notes in passing ...
              </h3>
              <span className="inline-flex items-center text-amber-900" aria-hidden="true">
                <BookOpen className="w-5 h-5 text-amber-900" />
                <PenLine className="w-4 h-4 text-amber-800 -ml-1" />
              </span>
            </div>

            {/* Notes on White Paper with Hole-Punched Left Margin */}
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-xs font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-4 text-left overflow-hidden">
              <HolePunchMargin />

              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0">
                Full movement notes and detailed archival commentary for Sherwood&apos;s <em>2nd Symphony</em> will follow shortly.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="mt-14 pt-8 border-t border-stone-300 flex flex-wrap items-center justify-center gap-3 text-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg font-serif text-sm font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowUp className="w-4 h-4 text-amber-900" />
            <span>Return to top</span>
          </button>
          {onBack && !isFeatured && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg font-serif text-sm font-semibold shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>Back to To Follow Cards</span>
            </button>
          )}
        </div>

        {/* Image Modal */}
        {activeImageModal && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActiveImageModal(null)}
          >
            <div
              className="bg-white border-2 border-[#765B37] rounded-lg max-w-xl w-full p-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Percy Sherwood (1866–1939)
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveImageModal(null)}
                  className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-hidden rounded border border-stone-200 bg-stone-100">
                <img
                  src={activeImageModal}
                  alt="Percy Sherwood archival portrait enlargement"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto filter grayscale contrast-105"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
