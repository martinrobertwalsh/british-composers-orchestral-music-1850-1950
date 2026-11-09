import React, { useState } from 'react';
import { CUNNINGHAM_WOODS_ORCHESTRAL_WORKS } from '../data/cunninghamWoodsData';
import { ArrowUp, ZoomIn, X, ArrowLeft, BookOpen } from 'lucide-react';

interface CunninghamWoodsPostProps {
  onBack?: () => void;
}

export const CunninghamWoodsPost: React.FC<CunninghamWoodsPostProps> = ({ onBack }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  return (
    <article id="cunningham-woods-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onBack && (
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
              ARTICLE TO FOLLOW
            </span>
          </div>
        </div>

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
            Francis Cunningham Woods (1862–1929)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;From the organ loft to a small village in Norfolk&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="woods-bio">
          {/* Portrait on Left & First Paragraph to Right */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/cunningham_woods_portrait.jpg`)}
                title="Click to enlarge Francis Cunningham Woods portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/cunningham_woods_portrait.jpg`}
                  alt="Francis Cunningham Woods (1862–1929)"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Francis Cunningham Woods
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Born in London, Cunningham Woods was the son of court dressmaker Alfred Woods. From 1877 to 1880 he attended the National Training School for Music.
              </p>
              <p>
                This was a music conservatory located in Kensington, which in 1882 was absorbed into the newly created Royal College of Music, opening its doors to pupils in 1883. At the National Training School, Woods was taught by Sir Arthur Sullivan and Ebenezer Prout.
              </p>
            </div>
          </div>

          {/* Narrative & Oxford / Highgate School */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p>
              He was employed as an organist, first at Brasenose College and then at Exeter College Oxford, where he was awarded his MA degree in 1891. Whilst in Oxford he wrote music for the theatre, mainly productions of Shakespeare, including incidental scores for <em>The Two Gentlemen of Verona</em> (1893) and <em>The Tempest</em> (1894). He later served as private organist to the Duke of Marlborough at Blenheim Palace.
            </p>

            <p>
              In 1894 he became Head of Music at Highgate School in North London, a position he held for almost the rest of his life, directing the school&apos;s choir and fostering generations of musical talent.
            </p>

            {/* Highgate / National Training School Gathering Group Photo */}
            <figure className="my-8 max-w-xl mx-auto p-2.5 sm:p-3 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[16/11] cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_group.jpg`)}
                title="Click to enlarge gathering photograph"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/woods_group.jpg`}
                  alt="Francis Cunningham Woods with colleagues and musicians"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
                Francis Cunningham Woods with musical colleagues and scholars
              </figcaption>
            </figure>

            <p>
              Together with the eminent composer Sir John Stainer, Woods was the editor of the celebrated Novello series <em>The Village Organist</em> (first published in 1897), which provided practical, beautifully voiced scores for parish organs across Britain.
            </p>

            <p>
              The preface to this influential collection reads:
            </p>

            {/* Authentic Preface Quotation in Brown Line */}
            <div className="border-l-4 border-amber-800 pl-4 sm:pl-5 py-2 space-y-3 text-stone-900 leading-relaxed text-base sm:text-lg bg-amber-50/30 font-times">
              <p className="italic">
                &ldquo;This Collection has been specially compiled with a view to supplying a want felt by the many organists who have only a small instrument at their disposal in country churches, and who often have some difficulty in finding short and easy Voluntaries suitable for their own use and the instruction of their pupils.&rdquo;
              </p>
            </div>

            {/* The Village Organist Plates */}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <figure className="p-2 bg-white border-2 border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_title.jpg`)}
                  title="Click to enlarge Title and Preface"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_title.jpg`}
                    alt="The Village Organist title and preface"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Title &amp; Editorial Preface
                </figcaption>
              </figure>

              <figure className="p-2 bg-white border-2 border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_cover.jpg`)}
                  title="Click to enlarge Series Cover"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_cover.jpg`}
                    alt="The Village Organist Novello edition cover"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Novello &amp; Co. Edition Cover
                </figcaption>
              </figure>

              <figure className="p-2 bg-white border-2 border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_img_3.jpg`)}
                  title="Click to enlarge Index of Voluntaries"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/woods_img_3.jpg`}
                    alt="The Village Organist contents and index"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Index of Voluntaries &amp; Composers
                </figcaption>
              </figure>
            </div>

            <p>
              Alongside his church and educational responsibilities, Woods nurtured a lifelong affection for Norfolk, where he often retreated to the parish of Gressenhall, near East Dereham. This rural haven provided the direct impulse for his most enduring orchestral creation, <em>The Gressenhall Suite for strings</em> (1915), evoking the serene pastoral contours and gentle church bells of the East Anglian countryside.
            </p>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="woods-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Orchestral work list
              </h2>
              <p className="font-serif italic text-stone-700 text-lg sm:text-xl mt-0.5">
                Surviving and lost orchestral works (L = Lost)
              </p>
            </div>
            <div className="text-left sm:text-right pb-0.5">
              <span className="font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold text-stone-700">
                L = LOST ARCHIVAL SCORES
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
                  {CUNNINGHAM_WOODS_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base sm:text-lg text-stone-900 font-semibold">
                            {work.title}
                          </span>
                          {work.isLost && (
                            <span className="inline-block px-1.5 py-0.5 text-xs font-mono font-bold bg-stone-200 text-stone-700 rounded" title="Lost score">
                              L
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums whitespace-nowrap">
                        {work.date} {work.isLost ? <span className="font-bold text-stone-800 ml-1">L</span> : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-5 text-sm sm:text-base font-serif italic text-stone-600 leading-relaxed">
            * Scores marked with an &lsquo;L&rsquo; represent theatre and concert compositions known through contemporary notices and Oxford programmes, but whose full orchestrations remain unlocated in public archives.
          </p>
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
              <span>Back to To Follow Cards</span>
            </button>
          )}
        </div>

        {/* Image Modal Lightbox */}
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
                  {activeImageModal.includes('cunningham_woods_portrait')
                    ? 'Francis Cunningham Woods (1862–1929)'
                    : activeImageModal.includes('woods_group')
                    ? 'Francis Cunningham Woods with colleagues'
                    : activeImageModal.includes('woods_village_organist_title')
                    ? 'The Village Organist — Title & Preface'
                    : activeImageModal.includes('woods_village_organist_cover')
                    ? 'The Village Organist — Novello Edition'
                    : activeImageModal.includes('woods_img_3')
                    ? 'The Village Organist — Voluntaries Index'
                    : 'Archival Document'}
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
                  alt="Archival document"
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
