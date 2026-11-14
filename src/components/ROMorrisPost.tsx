import React, { useState, useRef } from 'react';
import { RO_MORRIS_ORCHESTRAL_WORKS, RO_MORRIS_THEORETICAL_BOOKS } from '../data/roMorrisData';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, Play, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn, seekDirect } from '../utils/audioFade';

interface ROMorrisPostProps {
  onBack?: () => void;
}

export const ROMorrisPost: React.FC<ROMorrisPostProps> = ({ onBack }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const seekAudio = (seconds: number) => {
    seekWithFadeIn(audioRef.current, seconds);
  };

  const jumpToMovement = (seconds: number) => {
    seekDirect(audioRef.current, seconds);
  };

  return (
    <article id="ro-morris-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">

        {/* Post Title & Subtitle */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
            R. O. Morris (1886–1948)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;The quiet composer behind the great teacher&rdquo;
          </p>
        </header>

        {/* Section 1: Biography & Pedagogy */}
        <section id="morris-bio">
          {/* Portrait on Left & Compact Audio Realisations + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/ro_morris_portrait.jpg`)}
                title="Click to enlarge R. O. Morris portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/ro_morris_portrait.jpg`}
                  alt="R. O. Morris (1886–1948)"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                R. O. Morris
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisations Work-Page Selector */}
              <div
                id="morris-audio-selector"
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
                    onClick={() => scrollToSection('morris-sinfonia-workpage')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Sinfonia in C major (1928)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Reginald Owen Morris was born in York in 1886 and educated at Harrow, New College Oxford, and the Royal College of Music. Known to colleagues and friends simply as R. O., he became an influential teacher of composition and counterpoint.
              </p>
            </div>
          </div>

          {/* Narrative & Howard Ferguson Quotation */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              His pupils included Gerald Finzi, Michael Tippett, Constant Lambert, Edmund Rubbra, Robin Milford, Ruth Gipps, and many others, most of whom wrote effusively of his ability as a teacher.
            </p>
            <p>
              Recalling R. O. Morris in an interview for BBC Radio 3 in 1978, Howard Ferguson remembered him with affectionate candour:
            </p>

            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;...extremely quiet and withdrawn, a man of few words, and those said with something of an effort. The most exciting thing he ever said to me (he had a rather bored, tired voice) was one day after I showed him something, after I&apos;d been with him for some years: &lsquo;Yes Howard, I like that&rsquo; &mdash; and this was such a terrific moment I felt the heavens had opened! He had an extremely clear mind, one felt he was singularly unprejudiced. He seemed to allow his pupils to develop in whatever way they wanted to, and yet he retained a quite firm grasp on their formal side.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — Howard Ferguson (BBC Radio 3, 1978)
              </footer>
            </blockquote>

            <p>
              Another pupil, A. E. F. Dickinson, similarly observed a certain shyness in his demeanour: <span className="font-times italic">&ldquo;A man of few words, and those said with something of an effort.&rdquo;</span>
            </p>

            <p>
              A concert entirely devoted to his music was conducted by Arthur Bliss and Sir Adrian Boult on 14th November 1930. Yet after the age of fifty he appears to have completely abandoned composition, possibly at the time his wife fell ill. After her death, he seems to have suppressed his works; Edmund Rubbra noted that &ldquo;even to mention them was latterly the gravest of social indelicacies&rdquo;. The reason for this reticence remains poignant and unclear; some commentators suggest the works were regarded by the composer as rigorous compositional exercises rather than public display pieces.
            </p>

            <p>
              Perhaps his greatest legacy, however, is the profound unseen contribution he made to the diverse contrapuntal style of British twentieth-century composers including Gerald Finzi, Edmund Rubbra, Gustav Holst, and Sir Michael Tippett.
            </p>

            {/* Theoretical Publications Box with the 2 Book JPGs and All Treatises */}
            {/* Theoretical Publications Box: 2 Book JPGs on Left, All Text on Right */}
            <div className="my-8 bg-white border-2 border-stone-300 rounded-lg p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                {/* Left: The 2 Book JPGs */}
                <div className="flex flex-row gap-3 sm:gap-4 shrink-0 justify-center mx-auto lg:mx-0">
                  <figure className="w-32 sm:w-36 md:w-40 shrink-0 p-2 bg-stone-50 border border-stone-300 rounded shadow-xs text-center">
                    <div
                      className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                      onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/morris_book_counterpoint.jpg`)}
                      title="Click to enlarge Contrapuntal Technique book cover"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}assets/aistudio/morris_book_counterpoint.jpg`}
                        alt="Contrapuntal Technique in the Sixteenth Century (1922) by R. O. Morris"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                          <ZoomIn className="w-3 h-3" /> Enlarge
                        </span>
                      </div>
                    </div>
                    <figcaption className="mt-1.5 text-xs font-serif text-stone-600 italic leading-snug">
                      Contrapuntal Technique (1922)
                    </figcaption>
                  </figure>

                  <figure className="w-32 sm:w-36 md:w-40 shrink-0 p-2 bg-stone-50 border border-stone-300 rounded shadow-xs text-center">
                    <div
                      className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                      onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/morris_book_harmony.jpg`)}
                      title="Click to enlarge Practical Harmony book cover"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}assets/aistudio/morris_book_harmony.jpg`}
                        alt="Foundations of Practical Harmony and Counterpoint (1925) by R. O. Morris"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                          <ZoomIn className="w-3 h-3" /> Enlarge
                        </span>
                      </div>
                    </div>
                    <figcaption className="mt-1.5 text-xs font-serif text-stone-600 italic leading-snug">
                      Practical Harmony (1925)
                    </figcaption>
                  </figure>
                </div>

                {/* Right: All Text */}
                <div className="flex-1 min-w-0 pt-0.5 text-left">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-900 shrink-0" />
                    <span>Theoretical Publications</span>
                  </h3>
                  <p className="font-serif text-stone-700 text-sm sm:text-base mb-3 leading-relaxed">
                    Morris authored seven textbooks that became a standard across English universities and music colleges including:
                  </p>

                  <ul className="space-y-1.5 text-sm sm:text-base font-serif text-stone-800">
                    {RO_MORRIS_THEORETICAL_BOOKS.map((book, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-900 font-bold">•</span>
                        <span>
                          <em>{book.title}</em> ({book.date})
                          {book.note && <span className="text-stone-500 italic text-xs sm:text-sm"> &mdash; {book.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p>
              Despite most of his days being taken up with academic tuition, R. O. was also a composer of rare distinction. Unfortunately, being of a shy and retiring disposition, he was reluctant to promote his own music. As a consequence, his compositions have only rarely been performed since his death in 1948.
            </p>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="morris-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Orchestral work list
            </h2>
            <p className="font-serif italic text-stone-700 text-lg sm:text-xl sm:text-right">
              Surviving orchestral scores and chamber-orchestral works
            </p>
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
                  {RO_MORRIS_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('morris-sinfonia-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title="Click to view Sinfonia in C major work page and audio"
                          >
                            <span>{work.title}</span>
                            <Volume2 className="w-4 h-4 text-amber-900 shrink-0 group-hover:scale-110 transition-transform" />
                          </button>
                        ) : (
                          <div>
                            <span className="font-serif text-base sm:text-lg text-stone-900 font-semibold">
                              {work.title}
                            </span>
                          </div>
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
        </section>

        {/* Section 3: Work Page — Sinfonia in C major (1928) */}
        <section id="morris-sinfonia-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Sinfonia in C major (1928)
            </h2>

            {/* Audio player flanked by quavers (left standard, right mirrored) */}
            <div className="max-w-2xl mx-auto mt-4 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="Sinfonia in C major (1928)"
                subtitle="R. O. Morris"
                src="https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Morris/Full%20Sinfonia.mp3"
                sources={[
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Morris/Full%20Sinfonia.mp3", type: "audio/mpeg" },
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Morris/Full%20Sinfonia.mp3", type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>

            {/* Quick Movement Jump Buttons Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              <button
                type="button"
                onClick={() => jumpToMovement(0)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Jump to 1st movement (00:00)"
              >
                <Play className="w-3 h-3 text-amber-900" />
                <span>1st mov</span>
              </button>
              <button
                type="button"
                onClick={() => jumpToMovement(237)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Jump to 2nd movement (03:57)"
              >
                <Play className="w-3 h-3 text-amber-900" />
                <span>2nd mov</span>
              </button>
              <button
                type="button"
                onClick={() => jumpToMovement(524)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Jump to 3rd movement (08:44)"
              >
                <Play className="w-3 h-3 text-amber-900" />
                <span>3rd mov</span>
              </button>
              <button
                type="button"
                onClick={() => jumpToMovement(759)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Jump to 4th movement (12:39)"
              >
                <Play className="w-3 h-3 text-amber-900" />
                <span>4th mov</span>
              </button>
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

          {/* Dedication Plate */}
          <figure className="my-8 max-w-md mx-auto p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
            <div
              className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[5/2] cursor-pointer group relative"
              onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/morris_dedication.jpg`)}
              title="Click to enlarge dedication to Arthur Bliss"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/morris_dedication.jpg`}
                alt="Sinfonia in C major dedication to Arthur Bliss"
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                  <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                </span>
              </div>
            </div>
            <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
              Original manuscript dedication inscription: &ldquo;To Arthur Bliss&rdquo;
            </figcaption>
          </figure>

          {/* Narrative Introduction to Sinfonia */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              The <em>Sinfonia in C major</em> was originally entitled &ldquo;A Little Symphony&rdquo;, but R. O. subsequently altered it to its present classical designation. The dedication is to his friend and musical contemporary Arthur Bliss. It appears to represent his first serious foray into writing for the orchestra, scored for a modestly reduced orchestra of eighteenth-century proportions.
            </p>

            <p>
              Cast in four contrasting movements, their titles reflect his interest in early English and Renaissance musical forms. There&rsquo;s not the level of polyphonic writing evident in his later works except maybe the finale.
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
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-6 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-1.5">
                <p className="font-bold text-lg sm:text-xl text-stone-900 flex items-center flex-wrap gap-y-1 m-0">
                  <span
                    className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                    aria-label="Movement I"
                  >
                    I
                  </span>
                  <span>Allegro</span>{' '}
                  <button
                    type="button"
                    onClick={() => jumpToMovement(0)}
                    className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline ml-1"
                    title="Jump to 00:00"
                  >
                    (00:00)
                  </button>
                </p>
                <p className="font-normal text-lg sm:text-xl text-stone-900 leading-relaxed m-0">
                  Full tutti in an opening statement, repeated often in different guises. Much of the writing is modal with solo woodwind over short ostinatos on strings. We can hear echoes of Vaughan Williams at{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(65)}
                    className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                    title="Jump to 01:05 in Sinfonia audio"
                  >
                    (01:05)
                  </button>
                  .
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-lg sm:text-xl text-stone-900 flex items-center flex-wrap gap-y-1 m-0">
                  <span
                    className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                    aria-label="Movement II"
                  >
                    II
                  </span>
                  <span>Andante mosso</span>{' '}
                  <button
                    type="button"
                    onClick={() => jumpToMovement(237)}
                    className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline ml-1"
                    title="Jump to 03:57"
                  >
                    (03:57)
                  </button>
                </p>
                <p className="font-normal text-lg sm:text-xl text-stone-900 leading-relaxed m-0">
                  Soft rippling clarinets and flutes weave around gently with a solo oboe in a melody with a flattened 3rd. This clash between major v minor is a recurring feature in this movement. A solo violin brings all to a close.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-lg sm:text-xl text-stone-900 flex items-center flex-wrap gap-y-1 m-0">
                  <span
                    className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                    aria-label="Movement III"
                  >
                    III
                  </span>
                  <span>Tempo di Gavotto</span>{' '}
                  <button
                    type="button"
                    onClick={() => jumpToMovement(524)}
                    className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline ml-1"
                    title="Jump to 08:44"
                  >
                    (08:44)
                  </button>
                </p>
                <p className="font-normal text-lg sm:text-xl text-stone-900 leading-relaxed m-0">
                  Very folk song like movement in the guise of an old Gavotte.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-lg sm:text-xl text-stone-900 flex items-center flex-wrap gap-y-1 m-0">
                  <span
                    className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                    aria-label="Movement IV"
                  >
                    IV
                  </span>
                  <span>Maestoso assai</span>{' '}
                  <button
                    type="button"
                    onClick={() => jumpToMovement(759)}
                    className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline ml-1"
                    title="Jump to 12:39"
                  >
                    (12:39)
                  </button>
                </p>
                <p className="font-normal text-lg sm:text-xl text-stone-900 leading-relaxed m-0">
                  After the short tutti introduction cellos and bass start a ground bass sequence. A stately, legato melody is played over this. A series of variations follows with the contrapuntal writing becoming more complex.
                </p>
              </div>

              <ListenToItAllLink targetId="morris-sinfonia-workpage" />
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
                  {activeImageModal.includes('ro_morris_portrait')
                    ? 'R. O. Morris (1886–1948)'
                    : activeImageModal.includes('morris_book_counterpoint')
                    ? 'Contrapuntal Technique in the Sixteenth Century (1922)'
                    : activeImageModal.includes('morris_book_harmony')
                    ? 'Foundations of Practical Harmony and Counterpoint (1925)'
                    : activeImageModal.includes('morris_dedication')
                    ? 'Sinfonia in C major — Autograph Dedication to Arthur Bliss'
                    : activeImageModal.includes('morris_1a')
                    ? '1st Movement — Opening Theme'
                    : activeImageModal.includes('morris_1b')
                    ? '1st Movement — Contrasting Theme'
                    : activeImageModal.includes('morris_2a')
                    ? '2nd Movement — Oboe Theme'
                    : activeImageModal.includes('morris_2b')
                    ? '2nd Movement — Viola Theme'
                    : activeImageModal.includes('morris_3a')
                    ? '3rd Movement — Gavotte Principal Theme'
                    : activeImageModal.includes('morris_3b')
                    ? '3rd Movement — Gavotte Secondary Theme'
                    : activeImageModal.includes('morris_4a')
                    ? '4th Movement — Ground Bass Theme'
                    : 'Score Excerpt'}
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
