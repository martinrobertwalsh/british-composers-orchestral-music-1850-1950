import React, { useState } from 'react';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { FramedYouTubePlayer } from './FramedYouTubePlayer';
import { useYouTubeWorkPlayer } from '../utils/youtubePlayer';

const AUSTIN_YT_VIDEO_ID = 'OZFYBww4xnI';

interface AustinWork {
  id: string;
  title: string;
  date: string;
  note?: string;
  sectionId?: string;
}

const AUSTIN_ORCHESTRAL_WORKS: AustinWork[] = [
  {
    id: 'vicar-of-bray-variations',
    title: 'Variations on “The Vicar of Bray” for strings',
    date: '1910',
    sectionId: 'austin-vicar-section',
  },
  {
    id: 'stella-mary-dances',
    title: 'Stella-Mary Dances - Orchestral suite',
    date: '1918',
  },
];

interface ErnestAustinPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const ErnestAustinPost: React.FC<ErnestAustinPostProps> = ({
  onBack,
  isFeatured = false,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const vicarPlayer = useYouTubeWorkPlayer(AUSTIN_YT_VIDEO_ID);
  const austinPortrait = `${import.meta.env.BASE_URL}assets/aistudio/ernest_austin_portrait.webp`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const seekAudio = (seconds: number) => {
    vicarPlayer.seekWithFade(seconds);
  };

  return (
    <article
      id="ernest-austin-post"
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
            Ernest Austin (1874–1947)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;A late calling to music, touched by a father&rsquo;s grief.&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="austin-bio">
          {/* Portrait on Left & Compact Work Selector + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(austinPortrait)}
                title="Click to enlarge Ernest Austin portrait"
              >
                <img
                  src={austinPortrait}
                  alt="Ernest Austin (1874–1947)"
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
                Ernest Austin
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisation Work-Page Selector */}
              <div
                id="austin-audio-selector"
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
                    onClick={() => scrollToSection('austin-vicar-section')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Variations on &ldquo;The Vicar of Bray&rdquo;
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Ernest Austin came to professional music by an unconventional route. Born in London on 31 December 1874, he was the younger brother of the baritone and composer Frederic Austin. He initially worked for the Board of Trade and later in business before deciding, in his early thirties, to devote himself to music. Largely self-taught as a composer, he had already produced substantial works, including a piano sonata privately printed in 1897.
              </p>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              His orchestral output is small, although mention is made of at least two symphonies but these are lost. The orchestral suite <em>Stella-Mary Dances</em> was written in memory of his oldest daughter who died in 1917, aged 12.
            </p>
          </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section id="austin-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {AUSTIN_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.sectionId ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection(work.sectionId!)}
                            className="inline-flex items-center gap-2 text-left font-serif text-base sm:text-lg text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title={`Jump to ${work.title}`}
                          >
                            <span>{work.title}</span>
                            {work.id === 'vicar-of-bray-variations' && (
                              <Volume2 className="w-4 h-4 text-amber-900 shrink-0 group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                        ) : (
                          <span className="font-serif text-base sm:text-lg text-stone-900 font-semibold">
                            {work.title}
                          </span>
                        )}
                        {work.note && (
                          <div className="text-xs font-serif italic text-stone-600 mt-0.5">
                            {work.note}
                          </div>
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
            March for a Pageant (1910) ; Sweet Night (flute, clarinet, cornet and strings)
          </p>
        </section>

        {/* Section 3: Audio Realisation — Variations on "The Vicar of Bray" */}
        <section
          id="austin-vicar-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Variations on &ldquo;The Vicar of Bray&rdquo;
            </h2>

            {/* Framed Archival YouTube Player */}
            <FramedYouTubePlayer
              player={vicarPlayer}
              iframeId="austin-vicar-youtube-player"
              title="Ernest Austin - Variations on The Vicar of Bray"
              caption={
                <>
                  Ernest Austin — <em>Variations on &ldquo;The Vicar of Bray&rdquo;</em>
                </>
              }
            />

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
            {/* Score Title Page & Croydon Times Cutting Side by Side */}
            <div className="my-6 flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-8">
              <figure className="bg-white border-2 border-stone-300 rounded-lg p-2.5 shadow-sm text-center mx-auto sm:mx-0">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/cover_balanced.webp`)}
                  title="Click to enlarge Novello score title page"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/cover_balanced.webp`}
                    alt="The Vicar of Bray — Variations for String Orchestra (Op. 35) score cover"
                    className="h-64 sm:h-80 w-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Novello score cover (1911)
                </figcaption>
              </figure>

              <figure className="bg-white border-2 border-stone-300 rounded-lg p-2.5 shadow-sm text-center mx-auto sm:mx-0">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/croydon_times_balanced.jpg`)}
                  title="Click to enlarge Croydon Times cutting (May 1934)"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/croydon_times_balanced.jpg`}
                    alt="Croydon Times cutting on Ernest Austin (May 1934)"
                    className="h-64 sm:h-80 w-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Croydon Times, May 1934
                </figcaption>
              </figure>
            </div>

            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Ernest Austin&rsquo;s orchestral variations on the traditional English tune <em>The Vicar of Bray</em> were broadcast on BBC Radio on 15 November 1929 alongside his orchestral suite <em>Stella-Mary Dances</em>.
            </p>

            {/* Section Heading: Some notes in passing ... */}
            <div className="flex items-center gap-2.5 pt-2">
              <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-amber-950 tracking-tight">
                Some notes in passing ...
              </h3>
              <span className="inline-flex items-center text-amber-900" aria-label="Book with pen">
                <BookOpen className="w-5 h-5 text-amber-900" />
                <PenLine className="w-4 h-4 text-amber-800 -ml-1" />
              </span>
            </div>

            {/* Notes on White Paper with Hole-Punched Left Margin */}
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-3.5 text-left overflow-hidden">
              <HolePunchMargin />

              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="m-0">
                <span className="font-bold">Theme</span> &ndash; presented phrase by phrase forte then pianissimo
              </p>

              <p className="m-0">
                <span className="font-bold">1.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(43)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 00:43 in Variations on The Vicar of Bray audio"
                >
                  (00:43)
                </button>{' '}
                A beautiful first variation, rich harmony, sotto voce, ending with a delightful violin solo
              </p>

              <p className="m-0">
                <span className="font-bold">2.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(151)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 02:31 in Variations on The Vicar of Bray audio"
                >
                  (02:31)
                </button>{' '}
                Lively in 6/8
              </p>

              <p className="m-0">
                <span className="font-bold">3.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(227)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 03:47 in Variations on The Vicar of Bray audio"
                >
                  (03:47)
                </button>{' '}
                A calm emotional feel with surging climaxes.
              </p>

              <p className="m-0">
                <span className="font-bold">4.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(332)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 05:32 in Variations on The Vicar of Bray audio"
                >
                  (05:32)
                </button>{' '}
                A mini scherzo and trio
              </p>

              <p className="m-0">
                <span className="font-bold">5.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(405)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 06:45 in Variations on The Vicar of Bray audio"
                >
                  (06:45)
                </button>{' '}
                Pizzicato abounds
              </p>

              <p className="m-0">
                <span className="font-bold">6.</span>{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(444)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 07:24 in Variations on The Vicar of Bray audio"
                >
                  (07:24)
                </button>{' '}
                A waltz with cellos taking the melody initially
              </p>

              <div className="flex items-baseline gap-2">
                <span className="shrink-0">
                  <span className="font-bold">7.</span>{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(532)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 08:52 in Variations on The Vicar of Bray audio"
                  >
                    (08:52)
                  </button>
                </span>
                <div className="space-y-1">
                  <p className="m-0">
                    A short transitional section with a strong rhythmic figure.
                  </p>
                  <p className="m-0">
                    Legato melody over various ostinatos &ndash; Scottish feel &ndash; recap of the rhythmic transition
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="shrink-0">
                  <span className="font-bold">8.</span>{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(695)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 11:35 in Variations on The Vicar of Bray audio"
                  >
                    (11:35)
                  </button>
                </span>
                <p className="m-0">
                  In the manner of the 1st variation &ndash; soft with rich harmony &ndash; the d&eacute;nouement
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="shrink-0">
                  <span className="font-bold">9.</span>{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(785)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 13:05 in Variations on The Vicar of Bray audio"
                  >
                    (13:05)
                  </button>
                </span>
                <div className="space-y-1">
                  <p className="m-0">
                    Dramatic, dissonant with snippets of the song thrown about &ndash; listen out for the 2 second burst of &ldquo;La Marseillaise&rdquo; &ndash; this is the humorous part the reviews were referring to
                  </p>
                  <p className="m-0">
                    Leading to a finale in 6/8 time
                  </p>
                </div>
              </div>

              <ListenToItAllLink
                targetId="austin-vicar-section"
                onPlayFromStart={vicarPlayer.playFromStart}
                isPlaying={vicarPlayer.isPlaying}
              />
            </div>

            {/* Contemporary Review Card: The Musical Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;A set of variations for string orchestra on <em>The Vicar of Bray</em>, by Ernest Austin were played for the first time on October 6, and gave universal pleasure by their clever devices and fanciful scoring. The developments of the theme are governed by no programmatic meanings except in the jocular last variation, in which a novel idea in musical humour was found to be exceedingly felicitous in its effect. The work fully deserves a re-hearing.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                &mdash; The Musical Times (October 1910)
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Section 4: Obituary */}
        <section id="austin-obituary" className="mt-14 pt-8 border-t border-stone-300/80 scroll-mt-20">
          <div className="text-left mb-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-amber-900 uppercase">
              OBITUARY
            </h2>
          </div>

          <div className="bg-white border border-stone-300 rounded-md shadow-xs p-6 sm:p-8 font-serif text-stone-800 text-base sm:text-lg leading-relaxed text-left">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1 space-y-4">
                <h3 className="font-serif italic text-xl font-bold text-amber-950">
                  Well-known musician&rsquo;s death
                </h3>
                <p>
                  The funeral service took place on Tuesday at St. Mary&rsquo;s, Beddington, of Ernest Austin, of Wallington, the well-known musician.
                </p>
                <p>
                  Largely self-taught, he abandoned a business career to devote himself to music. Not only did he make his name by his compositions, but, as editor and publisher&rsquo;s reader, he was responsible for putting into shape much music of other men, some of which doubtless owed its success to his care.
                </p>
                <p>
                  He wrote in many different mediums, from songs to orchestral works, his most ambitious effort being a musical r&eacute;sum&eacute; of the <em>Pilgrim&rsquo;s Progress</em> for organ, in 12 books.
                </p>
                <p>
                  He had lived in Wallington for more than 30 years.
                </p>
              </div>

              <figure className="w-56 sm:w-64 shrink-0 mx-auto md:mx-0 p-2 bg-[#FAF8F5] border border-stone-300 rounded shadow-2xs text-center">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/Mitcham_Advertiser_July_1947_8ef21aa2.jpg`)}
                  title="Click to enlarge Mitcham Advertiser obituary cutting (July 1947)"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/Mitcham_Advertiser_July_1947_8ef21aa2.jpg`}
                    alt="Mitcham Advertiser obituary cutting for Ernest Austin (July 1947)"
                    className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Original newspaper cutting
                </figcaption>
              </figure>
            </div>

            <p className="pt-4 mt-6 border-t border-stone-200 font-serif text-xs sm:text-sm font-bold tracking-wider text-amber-900 uppercase">
              Mitcham Advertiser &mdash; July 1947
            </p>
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
              className="bg-white border-2 border-[#765B37] rounded-lg max-w-2xl w-full p-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Ernest Austin (1874–1947)
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
                  alt="Ernest Austin (1874–1947)"
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
