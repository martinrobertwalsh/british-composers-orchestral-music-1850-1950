import React, { useState, useRef } from 'react';
import { Volume2, ArrowUp, ArrowLeft, ZoomIn, X, Play } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { FramedYouTubePlayer } from './FramedYouTubePlayer';
import { useYouTubeWorkPlayer } from '../utils/youtubePlayer';

const MOOR_SYMPHONY_3_YT_VIDEO_ID = 'XG-tI8IElCY';
const MOOR_SYMPHONY_5_YT_VIDEO_ID = '5EFCRWTHjno';

interface MoorMovement {
  num: number;
  label: string;
  time: number;
  timeStr: string;
}

const SYMPHONY_3_MOVEMENTS: MoorMovement[] = [
  { num: 1, label: '1st mov', time: 0, timeStr: '00:00' },
  { num: 2, label: '2nd mov', time: 646, timeStr: '10:46' },
  { num: 3, label: '3rd mov', time: 1166, timeStr: '19:26' },
  { num: 4, label: '4th mov', time: 1562, timeStr: '26:02' },
];

const SYMPHONY_5_MOVEMENTS: MoorMovement[] = [
  { num: 1, label: '1st mov', time: 0, timeStr: '00:00' },
  { num: 2, label: '2nd mov', time: 642, timeStr: '10:42' },
  { num: 3, label: '3rd mov', time: 1089, timeStr: '18:09' },
  { num: 4, label: '4th mov', time: 1436, timeStr: '23:56' },
];

interface MoorWork {
  id: string;
  title: string;
  date: string;
  targetSectionId?: string;
}

const MOOR_ENGLAND_ORCHESTRAL_WORKS: MoorWork[] = [
  {
    id: 'fruhlingszauber',
    title: 'Frühlingszauber — orchestral work',
    date: '1888',
  },
  {
    id: 'piano-concerto-c-minor',
    title: 'Piano Concerto in C minor, Op. 46',
    date: '1888',
  },
  {
    id: 'symphony-1-e-minor',
    title: 'Symphony No. 1 in E minor',
    date: '1893',
  },
  {
    id: 'concert-overture-d-minor',
    title: 'Concert Overture in D minor, Op. 24a',
    date: '1893',
  },
  {
    id: 'symphony-2-c-major',
    title: 'Symphony No. 2 in C major, In Memoriam Kossuth',
    date: '1895',
  },
  {
    id: 'barcarolle-d-minor',
    title: 'Barcarolle for string orchestra in D minor, Op. 38',
    date: '1895',
  },
  {
    id: 'symphony-3-d-minor',
    title: 'Symphony No. 3 in D minor, Op. 45',
    date: '1895–96',
    targetSectionId: 'moor-symphony-3-section',
  },
  {
    id: 'symphony-4-bb-major',
    title: 'Symphony No. 4 in B-flat major',
    date: '1898',
  },
  {
    id: 'symphony-5-a-minor',
    title: 'Symphony No. 5 in A minor, Op. 53a',
    date: '1901',
    targetSectionId: 'moor-symphony-5-section',
  },
];

interface EmanuelMoorPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const EmanuelMoorPost: React.FC<EmanuelMoorPostProps> = ({
  onBack,
  isFeatured = false,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [activeSym3Movement, setActiveSym3Movement] = useState<number | null>(null);
  const [activeSym5Movement, setActiveSym5Movement] = useState<number | null>(null);
  const pauseSymphony5Ref = useRef<() => void>(() => {});
  const symphony3Player = useYouTubeWorkPlayer(MOOR_SYMPHONY_3_YT_VIDEO_ID, () => {
    pauseSymphony5Ref.current();
  });
  const symphony5Player = useYouTubeWorkPlayer(MOOR_SYMPHONY_5_YT_VIDEO_ID, () => {
    symphony3Player.pause();
  });
  pauseSymphony5Ref.current = symphony5Player.pause;
  const moorPortrait = `${import.meta.env.BASE_URL}assets/aistudio/emanuel_moor_portrait.webp`;

  const handleJumpToSym3Movement = (mov: MoorMovement) => {
    setActiveSym3Movement(mov.num);
    if (mov.time === 0) {
      symphony3Player.playFromStart();
    } else {
      symphony3Player.seekWithFade(mov.time);
    }
  };

  const handleJumpToSym5Movement = (mov: MoorMovement) => {
    setActiveSym5Movement(mov.num);
    if (mov.time === 0) {
      symphony5Player.playFromStart();
    } else {
      symphony5Player.seekWithFade(mov.time);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article
      id="emanuel-moor-post"
      className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900"
    >
      <div className="max-w-4xl mx-auto">
        {isFeatured && (
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 uppercase">
              FEATURED POST
            </span>
          </div>
        )}

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3 text-balance">
            Emanuel Moór (1863–1931)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Symphonies from Surrey&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="moor-bio">
          {/* Portrait on Left & Work Pages Selector + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(moorPortrait)}
                title="Click to enlarge Emanuel Moór portrait"
              >
                <img
                  src={moorPortrait}
                  alt="Emanuel Moór (1863–1931)"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Emanuel Moór
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisations Work-Page Selector */}
              <div
                id="moor-audio-selector"
                className="w-full sm:w-3/4 lg:w-2/3 scroll-mt-24"
              >
                <div className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xs text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-amber-900 uppercase">
                      Audio Realisations
                    </span>
                    <QuaversIcon ascending className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>

                  <div className="grid grid-cols-1 gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => scrollToSection('moor-symphony-3-section')}
                      className="flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                    >
                      <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                        Symphony No. 3 in D minor, Op. 45 (1895–96)
                      </div>
                      <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('moor-symphony-5-section')}
                      className="flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                    >
                      <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                        Symphony No. 5 in A minor, Op. 53a (1901)
                      </div>
                      <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Emanuel Moór lived in England for roughly 12–13 years, from 1888 until 1901, when he moved to Lausanne, Switzerland. He settled in Surrey after marrying Anita Burke in London. He also became a British citizen during his time here.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Orchestral Work List (Composed in England) */}
        <section id="moor-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Work list
            </h2>
            <p className="font-serif italic text-stone-700 text-lg sm:text-xl sm:text-right">
              Composed in England (1888–1901)
            </p>
          </div>

          {/* Works Table */}
          <div className="bg-white border-2 border-stone-300 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2A2621] text-stone-200 font-serif text-sm tracking-wider uppercase border-b border-stone-300">
                    <th className="py-2.5 px-4 sm:px-6 font-semibold">Work</th>
                    <th className="py-2.5 px-4 sm:px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm font-sans">
                  {MOOR_ENGLAND_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.targetSectionId ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection(work.targetSectionId!)}
                            className="inline-flex items-center gap-2 text-left font-serif text-base sm:text-lg text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title={`Jump to ${work.title} work page`}
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
                      <td className="py-2.5 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums whitespace-nowrap align-top">
                        {work.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Work Page — Symphony No. 3 in D minor, Op. 45 */}
        <section
          id="moor-symphony-3-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Symphony No. 3 in D minor, Op. 45 (1895–96)
            </h2>

            {/* Framed Archival YouTube Player */}
            <FramedYouTubePlayer
              player={symphony3Player}
              iframeId="moor-symphony-3-youtube-player"
              title="Emanuel Moór - Symphony No 3 in D minor"
              caption={
                <>
                  Emanuel Moór — <em>Symphony No. 3 in D minor, Op. 45</em> (1895–96)
                </>
              }
            />

            {/* Interactive Movement Timestamp Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {SYMPHONY_3_MOVEMENTS.map((mov) => (
                <button
                  key={mov.num}
                  type="button"
                  onClick={() => handleJumpToSym3Movement(mov)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                    activeSym3Movement === mov.num
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

            <div className="pt-5 flex items-center justify-center gap-6 text-center">
              <button
                type="button"
                onClick={() => scrollToSection('moor-audio-selector')}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Work Choice</span>
              </button>
              <span className="text-stone-300" aria-hidden="true">&middot;</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Work Page — Symphony No. 5 in A minor, Op. 53a */}
        <section
          id="moor-symphony-5-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Symphony No. 5 in A minor, Op. 53a (1901)
            </h2>

            {/* Framed Archival YouTube Player */}
            <FramedYouTubePlayer
              player={symphony5Player}
              iframeId="moor-symphony-5-youtube-player"
              title="Emanuel Moór - Symphony No 5 in A minor"
              caption={
                <>
                  Emanuel Moór — <em>Symphony No. 5 in A minor, Op. 53a</em> (1901)
                </>
              }
            />

            {/* Interactive Movement Timestamp Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {SYMPHONY_5_MOVEMENTS.map((mov) => (
                <button
                  key={mov.num}
                  type="button"
                  onClick={() => handleJumpToSym5Movement(mov)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                    activeSym5Movement === mov.num
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

            <div className="pt-5 flex items-center justify-center gap-6 text-center">
              <button
                type="button"
                onClick={() => scrollToSection('moor-audio-selector')}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Work Choice</span>
              </button>
              <span className="text-stone-300" aria-hidden="true">&middot;</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="mt-14 pt-8 border-t border-stone-300 flex flex-wrap items-center justify-center gap-3 text-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg font-serif text-sm font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-amber-900" />
            <span>Return to top</span>
          </button>
          {onBack && !isFeatured && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg font-serif text-sm font-semibold shadow-2xs transition-all cursor-pointer"
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
                  Emanuel Moór (1863–1931)
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
                  alt="Emanuel Moór (1863–1931)"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
