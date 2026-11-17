import React, { useState } from 'react';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { FramedYouTubePlayer } from './FramedYouTubePlayer';
import { useYouTubeWorkPlayer } from '../utils/youtubePlayer';

const CUSINS_YT_VIDEO_ID = 'pvvFYxvHnJk';

interface CusinsWork {
  id: string;
  title: string;
  date: string;
  note?: string;
  hasDedicatedPage?: boolean;
}

const CUSINS_ORCHESTRAL_WORKS: CusinsWork[] = [
  {
    id: 'les-travailleurs-de-la-mer',
    title: 'Les Travailleurs de la mer — Concert Overture',
    date: '1869',
    note: 'After the novel by Victor Hugo · Published alongside Love’s Labour’s Lost',
    hasDedicatedPage: true,
  },
  {
    id: 'loves-labours-lost',
    title: 'Love’s Labour’s Lost — Concert Overture',
    date: '1875',
    note: 'Published as a companion pair with Les Travailleurs de la mer',
  },
  {
    id: 'piano-concerto-a-minor',
    title: 'Piano Concerto in A minor',
    date: '1866',
  },
  {
    id: 'symphony-c-major',
    title: 'Symphony in C major',
    date: 'c. 1890',
  },
];

interface WilliamGeorgeCusinsPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const WilliamGeorgeCusinsPost: React.FC<WilliamGeorgeCusinsPostProps> = ({
  onBack,
  isFeatured = false,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const travailleursPlayer = useYouTubeWorkPlayer(CUSINS_YT_VIDEO_ID);
  const cusinsPortrait = `${import.meta.env.BASE_URL}assets/aistudio/cusins_portrait_bw.webp`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article
      id="william-george-cusins-post"
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
            William George Cusins (1833–1893)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Master of the Queen&rsquo;s Musick&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="cusins-bio">
          {/* Portrait on Left & Compact Work Selector + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(cusinsPortrait)}
                title="Click to enlarge Sir William George Cusins portrait"
              >
                <img
                  src={cusinsPortrait}
                  alt="Sir William George Cusins (1833–1893)"
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
                William George Cusins
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisation Work-Page Selector */}
              <div
                id="cusins-audio-selector"
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
                    onClick={() => scrollToSection('cusins-travailleurs-section')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Les Travailleurs de la mer (1869)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Cusins had an impressive curriculum vitae. Born in London, he entered the Chapel Royal in his tenth year and studied music in Brussels under François-Joseph Fétis and later at the RAM in London, under Cipriani Potter, William Sterndale Bennett, and Charles Lucas.
              </p>
            </div>
          </div>

          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              He toured widely, in England, Leipzig, Berlin and other places, as a concert pianist and as a composer. He was appointed organist to Queen Victoria&rsquo;s private chapel. He also played the violin in various orchestras in London. In 1851 he became assistant professor at the RAM, and later full professor. In 1867 he succeeded Sterndale Bennett as conductor of the Philharmonic Society and remained in this post until 1883.
            </p>

            <p>
              He was appointed Master of the Queen&rsquo;s Musick by Queen Victoria in 1870, succeeding George Frederick Anderson, who had retired. He was knighted on 5 August 1892 (the only Master to be knighted during his term of office).
            </p>

            <p>
              He was not a prolific orchestral composer but he left a symphony and a few other orchestral works.
            </p>

            <p>
              The two concert overtures <em>Les Travailleurs de la mer</em> (1869) and <em>Love&rsquo;s Labour&rsquo;s Lost</em> (1875) were published together as a pair.
            </p>
          </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section id="cusins-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {CUSINS_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('cusins-travailleurs-section')}
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

        {/* Section 3: Work Spotlight — Les Travailleurs de la mer (1869) */}
        <section
          id="cusins-travailleurs-section"
          className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20"
        >
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Les Travailleurs de la mer (1869)
            </h2>

            {/* Framed Archival YouTube Player */}
            <FramedYouTubePlayer
              player={travailleursPlayer}
              iframeId="cusins-travailleurs-youtube-player"
              title="William George Cusins - Les Travailleurs de la mer (1869)"
              caption={
                <>
                  William George Cusins — <em>Les Travailleurs de la mer</em> (Concert Overture after Victor Hugo, 1869)
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
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              <em>Les Travailleurs de la mer</em> (after the novel by Victor Hugo) is set on the Isle of Guernsey, where Hugo lived in exile during its writing. The rugged landscape and the sea&rsquo;s unpredictable nature play a significant role in the story, representing both beauty and danger.
            </p>

            <p>
              It tells the story of Gilliatt, a solitary fisherman on the Isle of Guernsey, who falls in love with Deruchette, the niece of wealthy shipowner Lethierry. When Lethierry&rsquo;s steamship, the <em>Durande</em>, is wrecked, Deruchette promises to marry whoever can salvage the ship&rsquo;s engine. Gilliatt, driven by his love for her, undertakes the dangerous task, battling the sea and his own inner demons, only to discover that Deruchette&rsquo;s affections have unknowingly shifted to the new rector, Caudray. Despite this, Gilliatt selflessly ensures their happiness, ultimately sacrificing himself to the sea.
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
                  Sir William George Cusins (1833–1893)
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
                  alt="Sir William George Cusins (1833–1893)"
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
