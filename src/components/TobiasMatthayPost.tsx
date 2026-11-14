import React, { useState, useRef } from 'react';
import { TOBIAS_MATTHAY_ORCHESTRAL_WORKS } from '../data/matthayData';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn } from '../utils/audioFade';

interface TobiasMatthayPostProps {
  onBack?: () => void;
  backLabel?: string;
}

export const TobiasMatthayPost: React.FC<TobiasMatthayPostProps> = ({ onBack, backLabel = 'Archive' }) => {
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

  return (
    <article id="tobias-matthay-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar: Post category label on left, Jump to Audio right-justified on same level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-stone-600 hover:text-amber-900 uppercase transition-colors cursor-pointer mr-2"
                title={`Back to ${backLabel}`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-900" />
                <span>{backLabel}</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('matthay-in-may-workpage')}
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
            Tobias Matthay (1858–1945)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Orchestral secrets from a master of the piano&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="matthay-bio">
          {/* Tobias Matthay Photo on Left & First Paragraph to Right */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/tobias_matthay_portrait.jpg`)}
                title="Click to enlarge Tobias Matthay portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/tobias_matthay_portrait.jpg`}
                  alt="Tobias Matthay (1858–1945)"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Tobias Matthay
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Tobias Matthay was one of the most influential figures in twentieth-century piano teaching. Glorified by some and villified by others, he left copious theoretical writings which today are little studied by serious pianists and teachers.
              </p>
              <p>
                Most of his professional life was spent at the RAM. He served as a sub-professor there from 1876 to 1880, and became an assistant professor of pianoforte in 1880, before being promoted to professor in 1884.
              </p>
            </div>
          </div>

          {/* Narrative & The Forgotten Orchestral Composer */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            {/* Tobias Matthay Piano School Figure */}
            <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
              <figure className="w-56 sm:w-64 md:w-72 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[2/3] cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/matthay_piano_school.jpg`)}
                  title="Click to enlarge Tobias Matthay Piano School"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/matthay_piano_school.jpg`}
                    alt="The Tobias Matthay Piano School on Wimpole Street, London"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
                  The Tobias Matthay Piano School, Wimpole Street, London
                </figcaption>
              </figure>

              <div className="flex-1 space-y-4 pt-1">
                <p>
                  So many students were soon in search of his insights that two years later he opened the Tobias Matthay Pianoforte School, first in Oxford Street, then in 1909 relocating to Wimpole Street, where it remained for the next 30 years.
                </p>
                <p>
                  In 1922, Frederick Corder, composition professor at the RAM, wrote that Matthay had revolutionised piano teaching and brought British pianism to new heights internationally. For his entire life, Matthay revered science and sought to apply the scientific method to piano instruction &ndash; his theories fell on stony ground at the RAM and he was forced to resign because McEwen (his former student who was then the academy&apos;s Principal) publicly attacked his teaching.
                </p>
              </div>
            </div>

            <p>
              Although Tobias Matthay taught most of his pupils in London, many were also received in his beautiful home &lsquo;High Marley&rsquo;, which is nestled up in the Surrey hills, just south of Haslemere. The house, built from scratch stands about 700 feet above sea level and on a clear day, you can see all the way to the English Channel.
            </p>

            {/* High Marley Landscape Figure */}
            <figure className="my-8 max-w-2xl mx-auto p-2.5 sm:p-3 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[16/9] cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/high_marley.jpg`)}
                title="Click to enlarge High Marley"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/high_marley.jpg`}
                  alt="High Marley, Haslemere, Surrey — country home of Tobias Matthay"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
                &lsquo;High Marley&rsquo;, Haslemere, Surrey &mdash; Tobias Matthay&apos;s country home and summer teaching retreat
              </figcaption>
            </figure>

            <p>
              Matthay finished composing for the orchestra by about the age of thirty. After this he devoted himself to the art of the piano, partly as a composer but more so as a theorist and teacher. However, we should not simply cast off his orchestral writing as &ldquo;student&rdquo; pieces, at least not before they are heard.
            </p>
          </div>
        </section>

        {/* Section 2: Complete List of Orchestral Works */}
        <section id="matthay-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {TOBIAS_MATTHAY_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('matthay-in-may-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-[#B8860B] hover:text-[#D4AF37] font-bold transition-all cursor-pointer group"
                            title="Click to view In May work page and audio"
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

          {/* Other Scores Note */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              OTHER SCORES:
            </span>
            Piano Concerto in D minor (1874) ; Hero and Leander (1879, scena for contralto and orchestra) ; Concert Piece in D minor (1881, for piano and orchestra) ; Concert-Piece No. 1 in A minor (for piano and orchestra, an early working version is dated around 1895)
          </p>
        </section>

        {/* Section 3: Work Page — In May (Tone Poem / Symphonic Overture) */}
        <section id="matthay-in-may-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              In May - Symphonic Overture (1883)
            </h2>

            {/* Audio player flanked by quavers (left standard, right mirrored) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="In May - Symphonic Overture (1883)"
                subtitle="Tobias Matthay"
                src="https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Matthay/In%20May.mp3"
                sources={[
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Matthay/In%20May.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Matthay/In%20May.mp3", type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>
          </div>

          {/* Narrative Flow & Musical Analysis */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Among these early orchestral works, his symphonic overture <em>In May</em> (1883) stands as his most radiant achievement. Awarded second prize in a Philharmonic Society competition, the work had to wait nearly two decades for its public unveiling, when Dan Godfrey, Jr. championed it at the Bournemouth Winter Gardens in November 1902 with the Bournemouth Symphony Orchestra.
            </p>

            <p>
              Matthay provided his own highly detailed program notes for <em>In May</em> as follows:
            </p>

            {/* Section Heading above Brown Accent Line */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-amber-950 tracking-tight">
                Some notes in passing ...
              </h3>
              <span className="inline-flex items-center text-amber-900" aria-label="Book with pen">
                <BookOpen className="w-5 h-5 text-amber-900" />
                <PenLine className="w-4 h-4 text-amber-800 -ml-1" />
              </span>
              <span className="font-serif italic text-base sm:text-lg text-amber-900 font-medium">
                As penned by Matthay himself
              </span>
            </div>

            {/* Notes on White Paper with Hole-Punched Left Margin */}
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-5 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0">
                The work opens with a slow Introduction: a mysterious short phrase in the wood wind leads to a &ldquo;Motto&rdquo; (or call), enunciated by the horns. This &ldquo;Motto&rdquo; gradually increases in vehemence, while a long drawn-out phrase appears against it in the wood wind; this should be noted, as it forms a slow presentiment of the quick first subject of the movement which follows. The slight climax reached herewith then gradually subsides, and a recitativo-like horn passage then leads into the first subject of the Allegro{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(69)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 01:09 in In May audio"
                >
                  (01:09)
                </button>
                , a bright movement in the usual Sonata form. This first subject is first quietly enunciated by the violins, a contrasting episode (formed of the same material) leading to its repetition in a tutti. It is followed by a modulatory (or connecting) passage of a passionate character, which, started by the violins and afterwards carried on by the oboe, then develops into a considerable climax, after which the music suddenly calms down, and allows the second subject of the movement to enter{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(150)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 02:30 in In May audio"
                >
                  (02:30)
                </button>
                . This is of a more placid and happy nature again. It is first given by the clarinet with a pizzicato accompaniment. After a contrasting episode on the &rsquo;cellos and violas (with tremolo accompaniment) it is repeated by the violins, and the remainder of this expository portion of the movement consists of developments of this theme in varying moods, at last reaching a vigorous climax.
              </p>

              <p className="text-left m-0">
                After this has died down the &ldquo;working out&rdquo; section of the movement starts with a slow and much modified form of this second subject. This is presented polyphonically, gradually introducing portions of the modulatory theme, inverted and otherwise varied, and also reminders of the first theme itself. The &ldquo;Motto&rdquo; also presently re-appears in the brass, and so harmonised as to completely change its mood, all these various elements gradually working up to the crisis of the movement, which consists of a glorified version of the mysterious phrase of the introduction, but now blared forth by trumpets and trombones{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(436)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 07:16 in In May audio"
                >
                  (07:16)
                </button>
                . This gradually subsides again, until a solo horn passage once more brings us back to the first subject and to the usual recapitulatory portion.
              </p>

              <p className="text-left m-0">
                All the subject matter having been greatly summarized, this soon leads to a considerably drawn-out Coda, built on modified versions of the second subject phrases. The first theme presently re-appears against these, as also does the theme of the modulatory episode; these gradually lead to the final climax{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(552)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 09:12 in In May audio"
                >
                  (09:12)
                </button>
                , in which the &ldquo;Motto,&rdquo; given by the trumpets, asserts itself against all else&mdash;the victory of Spring over Winter&mdash;and the music then gradually calms down to the feeling and matter of the Introduction until, with a sense of happiness, understood, if not attained, the movement ends with a final transformation of the &ldquo;Motto&rdquo; and gleam of orchestral light.
              </p>

              <p className="text-right font-serif font-bold text-stone-700 text-sm sm:text-base pt-1 m-0">
                [T.M.]
              </p>

              <ListenToItAllLink targetId="matthay-in-may-workpage" />
            </div>

            <p>
              When Dan Godfrey finally brought the overture before the public at the Bournemouth Winter Gardens in November 1902, the performance drew enthusiastic praise from regional and national critics:
            </p>

            {/* Contemporary Review Card 1: The Musical Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Mr. Tobias Matthay’s overture &lsquo;In May&rsquo; was received with hearty appreciation at the Winter Gardens under Mr. Dan Godfrey. It is a work of great charm and melodious distinction, orchestrated with a refined touch that reflects the composer’s high artistic ideals... The audience showed their warm approval of a piece that deserves frequent repetition.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Musical Times (1902)
              </footer>
            </blockquote>

            {/* Contemporary Review Card 2: Bournemouth Guardian */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;A delightful novelty at the Symphony Concert was Mr. Matthay&apos;s overture &lsquo;In May.&rsquo; Conceived in a poetic vein, its themes are graceful and spontaneous, and the orchestral colouring is throughout artistic and picturesque. Mr. Godfrey and his band interpreted the piece with immense spirit.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — Bournemouth Guardian (November 1902)
              </footer>
            </blockquote>

            {/* Contemporary Review Card 3: The Globe (1906) */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;&hellip;. while the programme also included a new Symphonic Overture called &lsquo;In May,&rsquo; by Mr. Tobias Matthay, Miss Scharrer&rsquo;s master. Mr. Matthay has, however, yet to convince us that his powers as a composer are as great as his powers as a pianist.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Globe &middot; 31 January 1906 &middot; Bechstein Hall &middot; Reduced Queens Hall orchestra under Henry Wood
              </footer>
            </blockquote>

            {/* Contemporary Review Card 4: Bournemouth Times (1932) */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;The Symphony Concert on Wednesday was an outstanding success from beginning to end. The Symphonic Overture, &lsquo;In May,&rsquo; conducted by the composer, Tobias Matthay, comprised an appropriate opening work. It has a tranquil beginning in which the composer introduces the French horns in a very clever manner. Running into Allegro, a very bright movement, it is followed by a &lsquo;tutti&rsquo; passage. After some clever development the original subject returns, rising to a magnificent finish.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — Bournemouth Times &middot; Friday, 26 February 1932
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
                  {activeImageModal.includes('high_marley')
                    ? "Tobias Matthay's Country Residence: 'High Marley', Haslemere"
                    : activeImageModal.includes('matthay_piano_school')
                    ? 'The Tobias Matthay Piano School, Wimpole Street, London'
                    : 'Tobias Matthay (1858–1945)'}
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
                  alt={
                    activeImageModal.includes('high_marley')
                      ? 'High Marley, Haslemere'
                      : activeImageModal.includes('matthay_piano_school')
                      ? 'Tobias Matthay Piano School'
                      : 'Tobias Matthay'
                  }
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
