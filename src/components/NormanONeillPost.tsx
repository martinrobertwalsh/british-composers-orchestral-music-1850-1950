import React, { useState, useRef } from 'react';
import { NORMAN_ONEILL_ORCHESTRAL_WORKS } from '../data/normanONeillData';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn } from '../utils/audioFade';

interface NormanONeillPostProps {
  onBack?: () => void;
}

export const NormanONeillPost: React.FC<NormanONeillPostProps> = ({ onBack }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const seekAudio = (seconds: number) => {
    seekWithFadeIn(audioRef.current, seconds);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article id="norman-oneill-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar: Post category label on left, Jump to Audio right-justified on same level */}
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

          <button
            type="button"
            onClick={() => scrollToSection('oneill-autumn-workpage')}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 hover:text-amber-900 uppercase transition-colors cursor-pointer group"
            title="Jump to audio"
          >
            <span>JUMP TO AUDIO</span>
            <Volume2 className="w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
            Norman O’Neill (1875–1934)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Music from behind the curtain&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="oneill-bio">
          {/* Norman O'Neill Photo on Left & First Paragraph to Right */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/norman_oneill_portrait.jpg`)}
                title="Click to enlarge Norman O'Neill portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/norman_oneill_portrait.jpg`}
                  alt="Norman O'Neill (1875–1934)"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Norman O’Neill
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Norman O’Neill was born in Kensington, London, the son of Irish artist G. B. O’Neill. He studied theory and composition with Arthur Somervell and from 1893, on the advice of the violinist Joachim, he continued his studies at the Hoch Conservatorium, Frankfurt. Here he joined a number of students who together became known as the Frankfurt Group – Percy Grainger, Cyril Scott, Roger Quilter and Balfour Gardiner – destined to have considerable influence on the development of English music.
              </p>
            </div>
          </div>

          {/* Narrative & Career */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p>
              In 1908 he became musical director at the Haymarket Theatre, establishing himself as England’s pre-eminent composer of theatrical incidental music, most famously for J. M. Barrie’s <em>Mary Rose</em> (1920) and Maeterlinck’s <em>The Blue Bird</em> (1910). He was elected Treasurer of the Royal Philharmonic Society in 1918, serving with distinction until his death in 1934. He joined the faculty of the Royal Academy of Music in 1924 as professor of composition.
            </p>

            <div className="pt-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-3 tracking-tight">
                Friendship with Delius
              </h3>
              <div className="space-y-4">
                <p>
                  In the same year, 1908, he played a significant role in the formation of the short-lived Musical League of which he became secretary. Elgar was president, and the vice-president was Delius whom Norman first met in 1907, becoming one of the composer&rsquo;s closest friends. Delius dedicated his <em>Dance Rhapsody No. 2</em> to O&apos;Neill.
                </p>
                <p>
                  Delius was usually a visitor to O&apos;Neill&apos;s home, Pembroke Villas, on his occasional trips to England, and in December 1907 Norman made the first of his visits to Delius&rsquo;s home at Grez-sur-Loing. When Delius came again in June 1909 for the first complete performance of <em>A Mass of Life</em> he stayed with the O&rsquo;Neills, and in July Norman went on a walking holiday with Delius in the Black Forest. Much later it was O&rsquo;Neill who persuaded Delius to allow James Gunn to paint him, resulting in the familiar portrait of the blind and paralysed composer in his last years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="oneill-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Orchestral work list
              </h2>
              <p className="font-serif italic text-stone-700 text-lg sm:text-xl mt-0.5">
                Showing only surviving scores MS or published
              </p>
            </div>
            <div className="text-left sm:text-right pb-0.5">
              <span className="font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold text-stone-700">
                WORKS IN <span className="text-[#B8860B] font-bold">GOLD</span> ARE LINKS TO THEIR WORK PAGES
              </span>
            </div>
          </div>

          {/* Works Table */}
          <div className="bg-white border-2 border-stone-300 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2A2621] text-stone-200 font-serif text-sm tracking-wider uppercase border-b border-stone-300">
                    <th className="py-2 px-4 sm:px-6 font-semibold">Work</th>
                    <th className="py-2 px-4 sm:px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm font-sans">
                  {NORMAN_ONEILL_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('oneill-autumn-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-[#B8860B] hover:text-[#D4AF37] font-bold transition-all cursor-pointer group"
                            title="Click to view In Autumn work page and audio"
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
                      <td className="py-2 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums">
                        {work.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Acknowledgement */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed text-center">
            I am grateful to Katherine Jessel, Norman O’Neill’s granddaughter, for permission to create and share realisations of his music.
          </p>
        </section>

        {/* Section 3: Work Page — In Autumn (Tone Poem) */}
        <section id="oneill-autumn-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              In Autumn (Tone Poem)
            </h2>

            {/* Audio player flanked by quavers (left standard, right mirrored) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="In Autumn (Tone Poem)"
                subtitle="Norman O'Neill"
                src="https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/O'Neill/In%20Autumn.mp3"
                sources={[
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/O'Neill/In%20Autumn.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/refs/heads/main/O%27Neill/In%20Autumn.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/O%27Neill/In%20Autumn.mp3", type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>
          </div>

          {/* Narrative Flow & Musical Analysis */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Composed in 1901 and dedicated to Henry Wood, <em>In Autumn</em> was O’Neill’s first major orchestral breakthrough. Having recently returned from Frankfurt, O’Neill brought a distinctly continental refinement and delicate orchestral palette to British concert life. The work was premiered at Queen’s Hall on 26th October 1901 at a Henry Wood Promenade Concert, conducted by Wood himself.
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

              {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0">
                <em>In Autumn</em> is on the whole a gentle, wistful piece in a broad ABA shape. The first of the two main themes{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(59)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 00:59 in In Autumn audio"
                >
                  (00:59)
                </button>{' '}
                runs along happily in a twisting strand of melody. The second is slower and more expressive{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(182)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 03:02 in In Autumn audio"
                >
                  (03:02)
                </button>{' '}
                and is developed into more passionate moments. One noticeable feature is the delicate writing for solo woodwind and horns{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(263)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 04:23 in In Autumn audio"
                >
                  (04:23)
                </button>
                . Full tutti passages are kept to a minimum but when they do occur{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(345)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 05:45 in In Autumn audio"
                >
                  (05:45)
                </button>{' '}
                they are all the more impressive given the generally thin texture of the piece. As a sign to the onset of winter the music dies to nothing.
              </p>

              <ListenToItAllLink targetId="oneill-autumn-workpage" />
            </div>

            <p>
              The reception at Queen’s Hall was warmly enthusiastic, with reviewers noting the composer’s command of the modern orchestra:
            </p>

            {/* Contemporary Review Card 1: The Musical Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Mr. Norman O’Neill’s concert overture &lsquo;In Autumn&rsquo;, performed under Mr. Henry J. Wood at the Queen’s Hall Promenade Concerts, is a work of conspicuous merit and individuality. The composer handles the orchestral forces with a lightness and imaginative colour that show both fine training and genuine poetical feeling... It was received with warm and well-merited applause.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Musical Times (1901)
              </footer>
            </blockquote>

            {/* Contemporary Review Card 2: The Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;The concert concluded with the first performance of a new concert overture by Mr. Norman O’Neill entitled &lsquo;In Autumn.&rsquo; It is a picturesque and delightfully orchestrated piece of tone-painting, full of melodic charm and orchestral resource. The composer was summoned to the platform to acknowledge prolonged applause.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Times (October 1901)
              </footer>
            </blockquote>

            <div className="space-y-2.5 sm:space-y-3 text-stone-900 pt-2">
              <p>
                First performed at the Queens Hall Promenade Concert Oct 1901 (H. J. Wood)
              </p>

              <p>
                Bournemouth Orchestra. Dec 1901. (Dan Godfrey)
              </p>

              <p>
                Manchester at &ldquo;Gentlemens Concerts&rdquo; Jan 1902. (Hans Richter)
              </p>

              <p>
                Birmingham (The Halford Concerts Society) Feb 1903. (conducted O&apos;Neill)
              </p>
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
                  Norman O’Neill (1875–1934)
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
                  alt="Norman O'Neill enlargement"
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
