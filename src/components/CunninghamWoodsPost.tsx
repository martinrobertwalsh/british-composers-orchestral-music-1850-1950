import React, { useState, useRef } from 'react';
import { CUNNINGHAM_WOODS_ORCHESTRAL_WORKS } from '../data/cunninghamWoodsData';
import { ArrowUp, ZoomIn, X, ArrowLeft, Volume2, BookOpen, PenLine, Play } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn, seekDirect } from '../utils/audioFade';

interface GressenhallMovement {
  num: string;
  title: string;
  label: string;
  time: number;
  timeStr: string;
}

const GRESSENHALL_MOVEMENTS: GressenhallMovement[] = [
  { num: '1', title: 'Preamble', label: '1. Preamble', time: 0, timeStr: '00:00' },
  { num: '2', title: 'A Norfolk Folk Tune', label: '2. A Norfolk Folk Tune', time: 127, timeStr: '02:07' },
  { num: '3', title: 'Slow Air', label: '3. Slow Air', time: 309, timeStr: '05:09' },
  { num: '4', title: 'Jig and Finale', label: '4. Jig and Finale', time: 538, timeStr: '08:58' }
];

interface CunninghamWoodsPostProps {
  onBack?: () => void;
}

export const CunninghamWoodsPost: React.FC<CunninghamWoodsPostProps> = ({ onBack }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [activeMovement, setActiveMovement] = useState<string | null>(null);
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

  const handleJumpToMovement = (seconds: number, title: string) => {
    setActiveMovement(title);
    seekDirect(audioRef.current, seconds);
  };

  return (
    <article id="cunningham-woods-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">

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
          {/* Portrait on Left & Compact Audio Realisations + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
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

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisations Work-Page Selector */}
              <div
                id="woods-audio-selector"
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
                    onClick={() => scrollToSection('woods-gressenhall-workpage')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      The Gressenhall Suite for strings (1915)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Born in London, Cunningham Woods was the son of court dressmaker Alfred Woods. From 1877 to 1880 he attended the National Training School for Music.
              </p>
            </div>
          </div>

          {/* Narrative & Oxford / Highgate School */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-4 text-left">
            <p>
              This was a music conservatory located in Kensington, which in 1882 was absorbed into the newly created Royal College of Music, opening its doors to pupils in 1883. At the National Training School, Woods was taught by Sir Arthur Sullivan and Ebenezer Prout.
            </p>
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
                  alt="Francis Cunningham Woods (bottom row far right) THANKS TO HIGHGATE SCHOOL FOR PHOTO"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
                <span>Francis Cunningham Woods (bottom row far right)</span>{' '}
                <span className="inline-block text-[10px] sm:text-2xs font-sans not-italic text-stone-500 tracking-wide uppercase sm:ml-1">
                  THANKS TO HIGHGATE SCHOOL FOR PHOTO
                </span>
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
            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">

              <figure className="p-2.5 bg-white border-2 border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-50 h-52 sm:h-56 flex items-center justify-center p-2 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_cover.jpg`)}
                  title="Click to enlarge Musical Times Announcement"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/woods_village_organist_cover.jpg`}
                    alt="The Village Organist Musical Times advertisement (September 1898)"
                    className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2.5 text-center">
                  <span className="block font-serif font-bold text-xs sm:text-sm text-stone-900">
                    The Musical Times Notice (1898)
                  </span>
                  <span className="block text-2xs sm:text-xs font-serif text-stone-600 italic mt-0.5">
                    &ldquo;A Series of Pieces for Church and General Use&rdquo;
                  </span>
                </figcaption>
              </figure>

              <figure className="p-2.5 bg-white border-2 border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-50 h-52 sm:h-56 flex items-center justify-center p-2 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/woods_img_3.jpg`)}
                  title="Click to enlarge Book 1 Voluntaries Index"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/woods_img_3.jpg`}
                    alt="The Village Organist Book 1 Voluntaries contents"
                    className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2.5 text-center">
                  <span className="block font-serif font-bold text-xs sm:text-sm text-stone-900">
                    Index of Voluntaries (Book 1)
                  </span>
                  <span className="block text-2xs sm:text-xs font-serif text-stone-600 italic mt-0.5">
                    Includes Woods&apos;s <em>Slow March</em>, Stainer, Gaul &amp; Gounod
                  </span>
                </figcaption>
              </figure>
            </div>

            <p>
              Apart from this editorial work, his church and educational responsibilities, Woods composed incidental music for Shakespeare productions at Oxford and a small body of music for orchestra.
            </p>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="woods-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {CUNNINGHAM_WOODS_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2.5 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('woods-gressenhall-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title="Click to view The Gressenhall Suite work page and audio"
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

          {/* Missing Scores Note Under Table */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              MISSING SCORES:
            </span>
            Minuet and Trio for orchestra ; Romance in F for violin and orchestra ; The Two Gentlemen of Verona – incidental music (1893) ; The Tempest – incidental music (1894)
          </p>
        </section>

        {/* Section 3: Work Page — The Gressenhall Suite for strings */}
        <section id="woods-gressenhall-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              The Gressenhall Suite for strings (1915)
            </h2>

            {/* Audio player flanked by quavers (left standard, right descending) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="The Gressenhall Suite for strings (1915)"
                subtitle="Francis Cunningham Woods"
                src="https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Woods/Full%20Gressenhall%20Suite.mp3"
                sources={[
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Woods/Full%20Gressenhall%20Suite.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/refs/heads/main/Woods/Full%20Gressenhall%20Suite.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Woods/Full%20Gressenhall%20Suite.mp3", type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>

            {/* Quick Movement Jump Buttons Bar under Audio */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {GRESSENHALL_MOVEMENTS.map((mov, idx) => (
                <button
                  key={mov.num}
                  type="button"
                  onClick={() => handleJumpToMovement(mov.time, mov.title)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs ${
                    idx === 1 ? 'mr-3 sm:mr-5' : idx === 2 ? 'mr-1.5 sm:mr-2.5' : ''
                  } ${
                    activeMovement === mov.title
                      ? 'bg-amber-100 ring-2 ring-amber-800 text-stone-900 shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-stone-800 hover:border-amber-400'
                  }`}
                  title={`Jump to ${mov.label} (${mov.timeStr})`}
                >
                  <Play className="w-3 h-3 text-amber-900" />
                  <span>{mov.label}</span>
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

          {/* Narrative & Musical Analysis */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 my-8 text-left">
            <p className="text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Composed in 1915 during the First World War, <em>The Gressenhall Suite for strings</em> gets its name from the village of Gressenhall, Norfolk. Woods had connections with East Anglia mainly through his wife who was from Norwich and his father who retired to the area.
            </p>

            <p>
              It&apos;s a light-hearted work except for the 3rd movement which stands out with its moments of quite profound beauty.
            </p>

            <p>
              The composer gave some background to the suite:
            </p>

            {/* Composer's Background Quotation */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Some years ago I was staying at Gressenhall near East Dereham, Norfolk. During my visit I was present at a jolly little dance in the parish room. All accompaniments were played on an accordion by a young fellow who was employed in a flour mill. He played a large number of folk dances &ndash; mainly traditional &ndash; the names of which he did not know. &lsquo;I learnt them from my father,&rsquo; he said.
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                One struck me as being a very jolly one and I named it after the village (Gressenhall). A brother of the Squire told me that the words at the commencement of the song, were &ndash; &lsquo;Throw away sorrow, Cast away care! The parish is bound to maintain us.&rsquo;&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — Francis Cunningham Woods
              </footer>
            </blockquote>

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

            {/* Notes on White Paper with Hole-Punched Left Margin - Macfarren Format */}
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-6 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <button
                  type="button"
                  onClick={() => handleJumpToMovement(0, 'Preamble')}
                  className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-baseline flex-wrap gap-y-1"
                  title="Jump to 1st movement in audio player"
                >
                  <span className="mr-2.5 text-amber-950 font-serif font-bold select-none">I</span>
                  <span>Preamble</span>{' '}
                  <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                    (00:00)
                  </span>
                </button>
                <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                  A stately opening in a neo-classical Baroque mould &ndash; cellos carry a new melody in the middle part.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleJumpToMovement(127, 'A Norfolk Folk Tune')}
                  className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-baseline flex-wrap gap-y-1"
                  title="Jump to 2nd movement in audio player"
                >
                  <span className="mr-2.5 text-amber-950 font-serif font-bold select-none">II</span>
                  <span>A Norfolk Folk Tune</span>{' '}
                  <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                    (02:07)
                  </span>
                </button>
                <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                  A lively miniature scherzo and trio in 6/8 time. This opening tune is the &ldquo;Gressingham&rdquo; connection. The trio is in the relative minor key{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(202)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 03:22 in audio player"
                  >
                    (03:22)
                  </button>{' '}
                  and makes for a stark contrast to the outer dancelike music.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleJumpToMovement(309, 'Slow Air')}
                  className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-baseline flex-wrap gap-y-1"
                  title="Jump to 3rd movement in audio player"
                >
                  <span className="mr-2.5 text-amber-950 font-serif font-bold select-none">III</span>
                  <span>Slow Air</span>{' '}
                  <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                    (05:09)
                  </span>
                </button>
                <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                  The Slow Air marked <em>Andante Doloroso</em> is at the core of the suite. Moments of melancholy and yearning especially in the central part where the 2nd violins have a sighing duplet figure{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(386)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 06:26 in audio player"
                  >
                    (06:26)
                  </button>{' '}
                  surely showing the more serious, profound side of the composer.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleJumpToMovement(538, 'Jig and Finale')}
                  className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-baseline flex-wrap gap-y-1"
                  title="Jump to 4th movement in audio player"
                >
                  <span className="mr-2.5 text-amber-950 font-serif font-bold select-none">IV</span>
                  <span>Jig and Finale</span>{' '}
                  <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                    (08:58)
                  </span>
                </button>
                <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                  Another 6/8 dance but note section marked as &ldquo;Ward the Pirate&rdquo;{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(571)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 09:31 in audio player"
                  >
                    (09:31)
                  </button>
                  . This is a traditional Norfolk folk song, also known as &ldquo;Captain Ward and the Rainbow&rdquo;. One documented tune was sung by James Carter in King&rsquo;s Lynn on 9th January 1905, collected by Ralph Vaughan Williams.
                </p>
                <p className="mt-3 text-stone-900 font-normal leading-relaxed m-0">
                  The whole work ends with a finale which draws from the opening preamble.
                </p>
              </div>

              <ListenToItAllLink targetId="woods-gressenhall-workpage" />
            </div>

            {/* Contemporary Radio Broadcast Notice */}
            <div className="pt-4 space-y-4">
              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed">
                A radio listings column in the <em>South Gloucestershire Gazette</em> (Saturday, 15 October 1927):
              </p>

              <blockquote className="p-6 sm:p-7 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-3">
                <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                  &ldquo;The Lovely Sweetness of Enchanted Strings&rdquo;&ndash;a short programme to be given by the Bournemouth Station String Orchestra on October 18th, will include the &ldquo;Serenade&rdquo; (Op. 20) by Sir Edward Elgar, and &ldquo;The Gressenhall,&rdquo; a suite for strings by Francis Woods.
                </p>
                <footer className="mt-3 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold not-italic">
                  &mdash; South Gloucestershire Gazette (15 October 1927)
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Back to top button */}
          <div className="pt-6 text-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
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
              className="bg-white border-2 border-[#765B37] rounded-lg max-w-3xl w-full p-4 sm:p-5 shadow-2xl relative max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {activeImageModal.includes('cunningham_woods_portrait')
                    ? 'Francis Cunningham Woods (1862–1929)'
                    : activeImageModal.includes('woods_group')
                    ? (
                      <span>
                        Francis Cunningham Woods (bottom row far right){' '}
                        <span className="text-xs font-sans font-normal uppercase text-stone-500 tracking-wider">
                          THANKS TO HIGHGATE SCHOOL FOR PHOTO
                        </span>
                      </span>
                    )
                    : activeImageModal.includes('woods_village_organist_cover')
                    ? 'The Village Organist — The Musical Times Announcement (1898)'
                    : activeImageModal.includes('woods_img_3')
                    ? 'The Village Organist — Book 1 Voluntaries Index'
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
              <div className="overflow-hidden rounded border border-stone-200 bg-stone-100 mb-3">
                <img
                  src={activeImageModal}
                  alt="Archival document"
                  className="w-full h-auto max-h-[58vh] object-contain mx-auto"
                />
              </div>

              {/* Readable Transcriptions in Lightbox Modal */}
              {activeImageModal.includes('woods_village_organist_cover') && (
                <div className="p-3.5 bg-[#FAF7F0] border border-stone-300 rounded text-left font-serif text-xs sm:text-sm text-stone-900 leading-relaxed space-y-1">
                  <p className="font-bold text-stone-950 text-sm">THE VILLAGE ORGANIST</p>
                  <p className="italic text-stone-700">A Series of Pieces for Church and General Use</p>
                  <p className="text-stone-800">Edited by <strong className="font-bold">J. Stainer</strong> and <strong className="font-bold">F. Cunningham Woods</strong>.</p>
                  <p className="text-2xs sm:text-xs text-stone-600 pt-1.5 border-t border-stone-200 font-sans">
                    <strong>Price:</strong> One Shilling each Book. Books 1 to 6 (cloth, 6s) ; Books 7 to 12 (cloth, 6s). — <em>The Musical Times</em>, 1 September 1898, p. 636
                  </p>
                </div>
              )}

              {activeImageModal.includes('woods_img_3') && (
                <div className="p-3.5 bg-[#FAF7F0] border border-stone-300 rounded text-left font-serif text-xs sm:text-sm text-stone-900 leading-relaxed space-y-1.5">
                  <p className="font-bold text-stone-950 text-sm">BOOK 1 — COMPLETE VOLUNTARIES INDEX</p>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-stone-800 list-decimal list-inside font-serif">
                    <li><strong>The Good Shepherd</strong> — Myles B. Foster</li>
                    <li><strong>Andante</strong> — W. Warder Harvey</li>
                    <li><strong>Andante con moto</strong> — A. R. Gaul</li>
                    <li><strong>Christmas Bells</strong> — Sir George J. Elvey</li>
                    <li><strong>Minuet</strong> — Philip Hayes</li>
                    <li><strong>Judex (from <em>Mors et Vita</em>)</strong> — Charles Gounod</li>
                    <li><strong>Soft Voluntary</strong> — H. A. Harding</li>
                    <li><strong className="text-amber-950">Slow March</strong> — F. Cunningham Woods</li>
                    <li><strong>A Song of Praise</strong> — Sir John Stainer</li>
                    <li><strong>Andante in G minor</strong> — E. H. Fellowes</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
