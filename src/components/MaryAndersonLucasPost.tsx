import React, { useState } from 'react';
import { Volume2, ArrowUp, ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { FramedYouTubePlayer } from './FramedYouTubePlayer';
import { useYouTubeWorkPlayer } from '../utils/youtubePlayer';

const LUCAS_CIRCUS_YT_VIDEO_ID = 'peAcPN-srb8';

interface CircusMovement {
  num: number;
  label: string;
  time: number | null;
  timeStr: string | null;
}

const CIRCUS_MOVEMENTS: CircusMovement[] = [
  { num: 1, label: '1. The Juggler', time: 0, timeStr: '00:00' },
  { num: 2, label: '2. The Clown', time: null, timeStr: null },
  { num: 3, label: '3. The Tight Rope Walker', time: null, timeStr: null },
  { num: 4, label: '4. The Trapeze Act', time: null, timeStr: null },
];

interface LucasWork {
  id: string;
  title: string;
  date: string;
  targetSectionId?: string;
}

const LUCAS_ORCHESTRAL_WORKS: LucasWork[] = [
  {
    id: 'concert-overture',
    title: 'Concert Overture',
    date: '—',
  },
  {
    id: 'the-circus-suite',
    title: 'The Circus, suite for orchestra',
    date: '1939',
    targetSectionId: 'lucas-circus-section',
  },
  {
    id: 'preludes-de-ballet',
    title: 'Préludes de Ballet',
    date: '1945',
  },
  {
    id: 'piano-concerto',
    title: 'Piano Concerto',
    date: '—',
  },
];

interface MaryAndersonLucasPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const MaryAndersonLucasPost: React.FC<MaryAndersonLucasPostProps> = ({
  onBack,
  isFeatured = false,
}) => {
  const [activeMovement, setActiveMovement] = useState<number | null>(null);
  const circusPlayer = useYouTubeWorkPlayer(LUCAS_CIRCUS_YT_VIDEO_ID);

  const handleJumpToMovement = (mov: CircusMovement) => {
    if (mov.time === null) return;
    setActiveMovement(mov.num);
    if (mov.time === 0) {
      circusPlayer.playFromStart();
    } else {
      circusPlayer.seekWithFade(mov.time);
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
      id="mary-anderson-lucas-post"
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
            Mary Anderson Lucas (1882–1952)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Juggling motherhood and music&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="lucas-bio">
          {/* Portrait Placeholder on Left & Work Selector + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div className="overflow-hidden rounded border border-stone-300 bg-gradient-to-b from-stone-100 to-stone-200/80 aspect-3/4 flex flex-col items-center justify-center p-4 text-center">
                <span className="font-serif text-3xl font-bold tracking-widest text-stone-700">
                  MAL
                </span>
                <span className="mt-2 font-mono text-xs text-stone-500 tabular-nums">
                  1882–1952
                </span>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Mary Anderson Lucas
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisation Work-Page Selector */}
              <div
                id="lucas-audio-selector"
                className="w-full sm:w-3/4 lg:w-2/3 scroll-mt-24"
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
                    onClick={() => scrollToSection('lucas-circus-section')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      The Circus, suite for orchestra (1939)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Lucas was an English composer and pianist whose most active composing years came after marriage and motherhood. Born Mary Anderson Juler in London on 24 May 1882, she studied piano in Dresden and at the Royal Academy of Music. She later studied composition with Herbert Howells and R. O. Morris at the Royal College of Music.
              </p>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              Her marriage to motor-car designer and inventor Ralph Lucas in 1903 interrupted her musical career. Returning to composition during the 1920s, she gained performances of her orchestral music in Bournemouth and subsequently attracted attention through chamber concerts and BBC broadcasts. Her <em>Clarinet Sonata</em> of 1938 was written for her niece, the distinguished clarinettist Pauline Juler.
            </p>

            <p>
              Among her orchestral compositions, <em>The Circus</em> provides a particularly appealing introduction. A newspaper review identified as appearing in the <em>Kentish Independent</em> in March 1937 records her playing three pieces from the suite: <em>The Clown</em>, <em>The Tightrope Walker</em> and <em>The Trapeze Act</em>. The critic praised their effectiveness, describing impressionistic musical pictures capturing the atmosphere of the circus ring.
            </p>

            <p>
              Her circus-themed ballet <em>Sawdust</em> was performed in London and Wolverhampton in 1941 by the Ballet Guild, directed by conductor and composer Leighton Lucas, who was unrelated to her. Accounts describe the ballet as subsequently orchestrated as the <em>Circus Suite</em>. Its development nevertheless needs clarification: the British Library provisionally dates the orchestral score [1939], while the earlier newspaper review documents piano pieces under the <em>Circus</em> title. The music therefore appears to have developed through several forms.
            </p>

            <p>
              Dedicated to Leighton Lucas, the orchestral suite received a prominent performance at the Royal Albert Hall on 4 July 1942, conducted by Sir Henry Wood. This marked Mary Lucas&rsquo;s Proms debut at sixty.
            </p>

            <p>
              Her music continued to receive attention during the war. A newspaper report reproduced on WikiTree, dated 31 May 1945, discusses an experimental rehearsal of her <em>Ballet Preludes</em> by the London Symphony Orchestra at the Guildhall School of Music. The critic recognised a Sibelian influence, particularly in its slower movements.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Further biographical notes:{' '}
              <a
                href="https://www.wikitree.com/wiki/Juler-34"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-900 hover:text-amber-950 underline underline-offset-2 font-medium transition-colors"
              >
                <span>WikiTree, including the contemporary report</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section id="lucas-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Orchestral work list
            </h2>
            <p className="font-serif italic text-stone-700 text-lg sm:text-xl sm:text-right">
              Showing only surviving scores MS or published
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
                  {LUCAS_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.targetSectionId ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection(work.targetSectionId!)}
                            className="inline-flex items-center gap-2 text-left font-serif text-base sm:text-lg text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title={`Jump to ${work.title}`}
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

          {/* Missing Scores Note Under Table */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              MISSING SCORES:
            </span>
            Capriccio, for saxophone and string orchestra ; Concertino, for flute and orchestra (1940) ; Five Tunes for Small Orchestra ; Fugue, for strings (1939) ; Occasional Overture (1940) ; Rhapsody, for orchestra (1928) ; Variations on a Theme by Henry Purcell, for string orchestra (1938)
          </p>
        </section>

        {/* Section 3: Work Page — The Circus, suite for orchestra (1939) */}
        <section
          id="lucas-circus-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              The Circus, suite for orchestra (1939)
            </h2>

            {/* Framed Archival YouTube Player */}
            <FramedYouTubePlayer
              player={circusPlayer}
              iframeId="lucas-circus-youtube-player"
              title="Mary Anderson Lucas - The Circus, suite for orchestra (1939)"
              caption={
                <>
                  Mary Anderson Lucas — <em>The Circus, suite for orchestra</em> (1939)
                </>
              }
            />

            {/* Interactive Movement Timestamp Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {CIRCUS_MOVEMENTS.map((mov) =>
                mov.time !== null && mov.timeStr ? (
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
                ) : (
                  <span
                    key={mov.num}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 rounded bg-stone-50 font-serif text-xs sm:text-sm font-semibold text-stone-600 whitespace-nowrap"
                    title={`${mov.label} — timestamp to follow`}
                  >
                    <span>{mov.label}</span>
                  </span>
                )
              )}
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
                onClick={() => scrollToSection('lucas-audio-selector')}
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
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg font-serif text-sm font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>{isFeatured ? 'Back to Home' : 'Back to To Follow Cards'}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
