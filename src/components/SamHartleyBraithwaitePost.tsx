import React, { useState } from 'react';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';

interface BraithwaiteWork {
  id: string;
  title: string;
  date: string;
  note?: string;
  hasDedicatedPage?: boolean;
}

const BRAITHWAITE_ORCHESTRAL_WORKS: BraithwaiteWork[] = [
  {
    id: 'snow-picture',
    title: 'Snow Picture for orchestra',
    date: '1924',
  },
  {
    id: 'elegy',
    title: 'Elegy for orchestra',
    date: '1926',
    hasDedicatedPage: true,
  },
];

interface SamHartleyBraithwaitePostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const SamHartleyBraithwaitePost: React.FC<SamHartleyBraithwaitePostProps> = ({
  onBack,
  isFeatured = false,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const portraitSrc = `${import.meta.env.BASE_URL}assets/aistudio/sam_hartley_braithwaite_portrait.webp`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article
      id="sam-hartley-braithwaite-post"
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
            Sam Hartley Braithwaite (1883–1947)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Orchestral colourist and etcher of dark, moody landscapes&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="braithwaite-bio">
          {/* Portrait on Left & Compact Work Selector + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(portraitSrc)}
                title="Click to enlarge Sam Hartley Braithwaite portrait"
              >
                <img
                  src={portraitSrc}
                  alt="Sam Hartley Braithwaite (1883–1947)"
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
                Sam Hartley Braithwaite
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisation Work-Page Selector */}
              <div
                id="braithwaite-audio-selector"
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
                    onClick={() => scrollToSection('braithwaite-elegy-section')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Elegy (1926)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Sam Hartley Braithwaite was born in Egremont, Cumberland. He trained at the Royal Academy of Music, studying piano, organ and clarinet, as well as composition with Frederick Corder. He was also a keen amateur artist.
              </p>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              An exact contemporary at the RAM was Arnold Bax. They became close friends and Bax dedicated his piano piece <em>Apple Blossom Time</em> (1915) to Braithwaite.
            </p>

            <p>
              While still in his twenties he began teaching piano at the RAM, where his pupils included Eric Coates, only three years his junior. He was musical director of the Passmore Edwards Settlement (Mary Ward Centre) in London from 1910 to 1913, succeeding Holst.
            </p>

            <p>
              Braithwaite lived most of his life in Bournemouth and many of his works were performed there, often conducted by him. Later in life he shifted his activities towards etching, painting and printmaking.
            </p>

            <p>
              As an artist Braithwaite made etchings of landscapes in Dorset and Lancashire/Cumbria.
            </p>

            <p>
              Two of his musical works &mdash; the characteristically pictorial <em>Snow Picture</em> for orchestra (1924) and the <em>Elegy</em> for orchestra (1927) &mdash; won Carnegie Trust awards and were published as part of the <em>Carnegie Collection of British Music</em>.
            </p>
          </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section id="braithwaite-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {BRAITHWAITE_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('braithwaite-elegy-section')}
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
        </section>

        {/* Section 3: Work Spotlight — Elegy (1926) */}
        <section
          id="braithwaite-elegy-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2">
              Elegy (1926)
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-stone-700">
              Published in the Carnegie Collection of British Music (1927) &middot; Audio realisation to follow
            </p>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              A short work but one full of orchestral colour; maybe Braithwaite&rsquo;s ability as an artist also pervaded his orchestral palette. Harp used as a fleck of bright colour and a single cymbal, tremolando in this dark, moody landscape.
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
                  Sam Hartley Braithwaite (1883–1947)
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
                  alt="Sam Hartley Braithwaite (1883–1947)"
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
