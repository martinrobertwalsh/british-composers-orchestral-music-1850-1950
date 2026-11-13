import React, { useState, useRef } from 'react';
import { FENNEY_ORCHESTRAL_WORKS, FENNEY_CHAMBER_AND_OTHER_SCORES } from '../data/fenneyData';
import { ZoomIn, X, ArrowLeft, ArrowUp, BookOpen, PenLine, Volume2 } from 'lucide-react';
import { HolePunchMargin } from './HolePunchMargin';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { QuaversIcon } from './QuaversIcon';
import { ListenToItAllLink } from './ListenToItAllLink';

interface WilliamFenneyPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const WilliamFenneyPost: React.FC<WilliamFenneyPostProps> = ({ onBack, isFeatured = false }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article id="william-fenney-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onBack && !isFeatured && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-stone-600 hover:text-amber-900 uppercase transition-colors cursor-pointer mr-2"
                title="Back to To Follow"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-900" />
                <span>To Follow</span>
              </button>
            )}
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 uppercase">
              {isFeatured ? 'FEATURED POST' : 'ARTICLE TO FOLLOW'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('fenney-pastoral-section')}
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 hover:text-amber-900 uppercase transition-colors cursor-pointer group"
            title="Jump to Pastoral feature and audio recording"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-900 group-hover:scale-110 transition-transform" />
            <span>PASTORAL (1917)</span>
          </button>
        </div>

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
            William Fenney (1891–1957)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Bright in colour and sad in feeling&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="fenney-bio">
          {/* Cover on Left & Opening Narrative to Right */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-44 sm:w-48 md:w-52 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/fenney_in_shadow_score_flat.jpg`)}
                title="Click to enlarge score cover of In Shadow"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/fenney_in_shadow_score_flat.jpg`}
                  alt="William J. Fenney — In Shadow, Op. 15 (Poem for Small Orchestra) score cover"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                Stainer &amp; Bell score cover for <em>In Shadow</em> (Op. 15)
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                William Fenney was born in Handsworth, Birmingham. Despite having a very keen interest in music early on he went into the insurance business as a clerk at the age of 20. In his spare time he worked hard at composition, completely self taught.
              </p>
              <p>
                He was soon fortunate enough to then study composition with Granville Bantock at the Midland Institute School of Music.
              </p>
            </div>
          </div>

          {/* Fenney's Personal Reflection Quotation */}
          <div className="border-l-4 border-amber-800 pl-4 sm:pl-5 py-3 my-8 space-y-2 text-stone-900 leading-relaxed text-base sm:text-lg bg-amber-50/40 rounded-r font-times">
            <p className="italic">
              &ldquo;From early years I studied the great masters, &ndash; Beethoven and Chopin were my first teachers; I liked Wagner only on the stage. I have never liked the modernist school; my own style owes to Elgar.&rdquo;
            </p>
            <footer className="text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold not-italic pt-1">
              &mdash; From a short written note by William Fenney
            </footer>
          </div>

          {/* Joseph Holbrooke Critique */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p>
              Joseph Holbrooke&apos;s book, <em>Contemporary British Composers</em>, mentions Fenney as follows:
            </p>

            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Of the real youngsters we have yet to make acquaintance with &ndash; there is the introspective gift of W. J. FENNEY of Birmingham. His Trio alone will place him in high estimation among musicians. Already he has a personality in music which cannot be acquired, neither can it be bought. It is there; or it is not. Our British music is not overflowing with personalities. Fenney&apos;s music is intrepid, malleable and interwoven in a charming way. There is much of his chamber music to which I am very susceptible, and a few small orchestral works which deserve every encouragement. I understand this composer is desperately poor in this world&rsquo;s goods and health. A pity such things can be in our days of millionaires.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                &mdash; Joseph Holbrooke, Contemporary British Composers (1925)
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="fenney-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Orchestral work list
              </h2>
              <p className="font-serif italic text-stone-700 text-lg sm:text-xl mt-0.5">
                Surviving scores and contemporary performance documentation
              </p>
            </div>
            <div className="text-left sm:text-right pb-0.5">
              <span className="font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold text-stone-700">
                SURVIVING MANUSCRIPTS &amp; PUBLISHED SCORES
              </span>
            </div>
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
                  {FENNEY_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('fenney-pastoral-section')}
                            className="inline-flex items-center gap-2 text-left font-serif text-base sm:text-lg text-[#B8860B] hover:text-[#D4AF37] font-bold transition-all cursor-pointer group"
                            title={`Click to view ${work.title} and listen to recording`}
                          >
                            <span>{work.title}</span>
                            <Volume2 className="w-4 h-4 text-[#B8860B] group-hover:text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
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

          {/* Chamber & Other Works Note */}
          <div className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              NOTABLE CHAMBER &amp; OTHER SCORES:
            </span>
            {FENNEY_CHAMBER_AND_OTHER_SCORES.map((item, idx) => (
              <span key={idx}>
                <em>{item.title}</em>
                {idx < FENNEY_CHAMBER_AND_OTHER_SCORES.length - 1 ? ' ; ' : '.'}
              </span>
            ))}
          </div>
        </section>

        {/* Section 3: Feature on Pastoral for Small Orchestra */}
        <section id="fenney-pastoral-section" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK SPOTLIGHT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2">
              Pastoral for Small Orchestra (1917)
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-stone-700">
              Op. 5 &middot; First published orchestral work
            </p>

            {/* Audio player flanked by quavers (left standard, right descending) */}
            <div className="max-w-2xl mx-auto mt-6 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="Pastoral for Small Orchestra (Op. 5)"
                subtitle="William Fenney"
                src={`${import.meta.env.BASE_URL}assets/aistudio/Pastoral_3704f15a.mp3`}
                sources={[
                  { src: `${import.meta.env.BASE_URL}assets/aistudio/Pastoral_3704f15a.mp3`, type: "audio/mpeg" },
                  { src: `${import.meta.env.BASE_URL}assets/aistudio/Pastoral_fenney.mp3`, type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Fenney&apos;s first published orchestral work was his <em>Pastoral for Small Orchestra</em> (1917).
            </p>

            <p>
              The short descriptive text is tantalising. Although signed &ldquo;Anon&rdquo; it most likely was written by the composer:
            </p>

            {/* Section Heading above Brown Accent Line */}
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
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-4 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0 italic">
                &ldquo;This work expresses the feeling with which one looks on a quiet countryside. It does not echo the songs of rustic folk or the music of the shepherd’s pipe and is essentially modern English. Even on the brightest day our country scenery has at least a hint of melancholy for us, and the music, composed in autumn, is bright in colour and sad in feeling.&rdquo;
              </p>

              <ListenToItAllLink targetId="fenney-pastoral-section" />
            </div>

            <p className="text-stone-800 text-lg sm:text-xl leading-relaxed pt-1">
              It was first performed as part of a Bournemouth Municipal Orchestra Concert given at the Bournemouth Winter Gardens on 10 January 1918.
            </p>

            <p className="text-stone-800 text-lg sm:text-xl leading-relaxed">
              <em>The Bournemouth Guardian</em> reported that &ldquo;Thursday afternoon’s symphony concert at the Bournemouth Winter Gardens included two novelties by Mr William Fenney, who is associated with the Midland Institute, and is a special protégé of Professor Granville Bantock, the distinguished composer.&rdquo; The critic explained that this was Fenney’s first appearance at these concerts. It was also to be his last.
            </p>

            <blockquote className="my-6 p-6 sm:p-7 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                They continued, &ldquo;Great interest was shown in the two pieces, <em>Pastoral</em> and the tone poem <em>Nineveh</em>, both of which must have struck the hearers with the fact that there was individuality therein, although with a strong tendency to modern harmonies.&rdquo;
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                Slightly critical was the comment that &ldquo;The only point that hearing these items conveyed was a wish that Mr Fenney would somewhat vary the treatment of his compositions more as there is a feeling of rather undue heaviness, and if some lighter vein were introduced it would surely help in the appreciation of such promising work.&rdquo; Looking at each work, the critic felt that the &ldquo;<em>Pastoral</em> was very pleasing and in [<em>Nineveh</em>] the composer has caught something of the still amazing glories of the great lost empire of the past.&rdquo;
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                Finally, &ldquo;Mr Fenney is to be congratulated, and he well deserved the plaudits of an audience, many of whom are accustomed to expect great things at these concerts.&rdquo;
              </p>
              <footer className="mt-3 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold not-italic">
                &mdash; The Bournemouth Guardian (January 1918)
              </footer>
            </blockquote>
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
                  William J. Fenney — In Shadow, Op. 15 (Score Title Page)
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
                  alt="Archival document enlargement"
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
