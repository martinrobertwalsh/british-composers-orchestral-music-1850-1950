import React, { useState, useRef } from 'react';
import { PERCY_GODFREY_ORCHESTRAL_WORKS } from '../data/godfreyData';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn } from '../utils/audioFade';

interface PercyGodfreyPostProps {
  onBack?: () => void;
}

export const PercyGodfreyPost: React.FC<PercyGodfreyPostProps> = ({ onBack }) => {
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
    <article id="percy-godfrey-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
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
            onClick={() => scrollToSection('godfrey-coronation-workpage')}
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
            Percy Godfrey (1859–1945)
          </h1>

          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;From prizewinner to obscurity&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="godfrey-bio">
          {/* Percy Godfrey Photo on Left & First Paragraph to Right */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/percy_godfrey_portrait.jpg`)}
                title="Click to enlarge Percy Godfrey portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/percy_godfrey_portrait.jpg`}
                  alt="Percy Godfrey (1859–1945)"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Percy Godfrey
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Godfrey began his studies at the University of Durham and then at the Royal Academy of Music, where his teachers included Sir George Macfarren and Ebenezer Prout. The Dutch violinist and composer Berthold Tours, who became a close friend, was also an important early influence.
              </p>
              <p>
                After graduating he became a schoolmaster in Bengeo, Hertford before being appointed music-master and organist at The King&apos;s School, Canterbury, a position he occupied for over 25 years. He conducted the East Kent Orchestra.
              </p>
            </div>
          </div>

          {/* Narrative: 1910 Common Room Photo on Left & Paragraphs 3, 4, 5 on Right */}
          <div className="my-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <figure className="w-full md:w-80 lg:w-96 shrink-0 mx-auto md:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[4/3] cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/1910_Common_Room_df2c1dc6.jpg`)}
                title="Click to enlarge 1910 King's School Common Room photograph"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/1910_Common_Room_df2c1dc6.jpg`}
                  alt="The King's School 1910 (Percy Godfrey back row 5th from left) THANKS TO KING'S SCHOOL FOR PHOTO"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs sm:text-sm font-serif text-stone-600 italic">
                <span>The King&apos;s School 1910 (Percy Godfrey back row 5th from left)</span>{' '}
                <span className="inline-block text-[10px] sm:text-2xs font-sans not-italic text-stone-500 tracking-wide uppercase sm:ml-1">
                  THANKS TO KING&apos;S SCHOOL FOR PHOTO
                </span>
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-5 text-left pt-1">
              <p>
                In 1900 he claimed the Lesley Alexander Prize with his Piano Quintet in E flat, judged by a panel of London critics. And two years later he won a nationwide competition for a grand Coronation March to celebrate the crowning of King Edward VII instigated by The Worshipful Company of Musicians.
              </p>

              <p>
                Orchestral music was continuously being produced alongside his school duties and local conducting, resulting in a substantial catalogue of work, including four symphonies.
              </p>
            </div>
          </div>

          <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left my-6">
            Sadly most of his compositions are now lost and apart from the Coronation March only his 4th Symphony and a ballet suite survive.
          </p>

          <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left my-6">
            His later years saw a slide into obscurity. His fame was short lived and despite still avidly composing he never seemed to regain the recognition that he strived for. We have documentation which goes to show a rather wistful figure still living in a bygone age:
          </p>

            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;One summer Sunday afternoon, as I sat practising at my turn-of-the-century, eight-foot Erard grand piano in our drawing room, a tall, imposing, elderly gentleman, wearing a panama and flannels rang the doorbell. He introduced himself as Percy Godfrey, a composer of whom I had vaguely heard, who had also recently left the Kent coast and was now living with his sister, Ethel Weir, at Sunningdale, No. 25 Spencer Road. He said he had heard me playing when passing the house on his way to watch the cricket at Molesey Cricket Club.&rdquo;
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;My mother invited Mr. Godfrey in for a cup of tea and a chat with me and with my father, who had been a professional violinist and played with the Plymouth Symphony Orchestra in his youth and from then on, it became a regular arrangement that he would call in on Sunday afternoons for an hour or so in order to discuss music, comment upon my pianistic progress (or lack of) and show me his latest compositions, which I was expected to sight read, without preparation, from his hand-written manuscript! These visits continued for a number of years, during which I had the benefit of his expertise and learned about his life in general.&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div
                  className="w-40 sm:w-48 shrink-0 mx-auto sm:mx-0 p-1.5 bg-stone-50 border border-stone-300 rounded shadow-2xs cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/1914_e19aefff.jpg`)}
                  title="Click to enlarge photograph"
                >
                  <div className="overflow-hidden rounded-xs bg-stone-100">
                    <img
                      src={`${import.meta.env.BASE_URL}assets/aistudio/1914_e19aefff.jpg`}
                      alt="Portrait of Percy Godfrey with pipe (1914)"
                      className="w-full h-auto object-cover block group-hover:scale-102 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-1.5 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xs">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>

                <p className="flex-1 font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                  &ldquo;Percy Godfrey had been Master of Music at King’s School, Canterbury for many years before retirement and had won a prize in a competition to write a March for the Coronation of Edward VII. The music was actually used during the ceremony itself and some forty years later he played me his piano arrangement of the work and gave me a copy. Percy composed prolifically and wrote for the piano, voice, choral and instrumental groups, as well as for full orchestra and he once did me the honour of copying, by hand, two piano compositions for me to play, the signed manuscripts of which I still have.&rdquo;
                </p>
              </div>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Apparently, during the 1920s, Percy Godfrey was often confused with the, then, conductor of the Bournemouth Concert Orchestra, Sir Dan Godfrey, of the prominent musical family, who would sometimes include Percy’s compositions in his concerts with Percy himself conducting them. Percy didn’t seem to mind being associated with the better-known Dan, although they were not related in any way and it seems he was almost absorbed into the family!&rdquo;
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;After a few years of very rewarding meetings and musical advice from Percy Godfrey and as WWII entered its final year, I had a telephone call from his sister, in February 1945, telling me that he had passed away suddenly in the house in Spencer Road. She asked me to call in to collect some items that he had wanted me to have, including some unpublished, signed and dated, manuscripts, which I still have in my possession.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The recollections of John Edward Searle
              </footer>
            </blockquote>

          <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left my-6">
            Seven years before his death he left some of his scores to the keeping of The Worshipful Company of Musicians, the very same, who ran the competition back in 1902. A letter from Percy is below &mdash; the final paragraph makes for heartbreaking reading.
          </p>

            {/* 1938 Letter: Original Image (Left) & Styled Letter Transcript (Right) */}
            <div className="my-8 md:w-[min(94vw,68rem)] md:relative md:left-1/2 md:-translate-x-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
                {/* Left: Original Letter Photograph (Matches height of transcript cleanly) */}
                <div
                  className="cursor-pointer group relative w-full h-full flex items-center justify-center bg-[#D7D5CE] border border-[#C8C3B8] rounded-xs shadow-[0_8px_20px_rgba(45,36,22,0.12)] overflow-hidden"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/godfrey_letter.jpg`)}
                  title="Click to enlarge original letter"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/godfrey_letter.jpg`}
                    alt="Autograph letter from Percy Godfrey to Colonel Newton, 2nd March 1938"
                    className="w-full h-full object-contain block group-hover:scale-101 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge letter
                    </span>
                  </div>
                </div>

                {/* Right: Letter Transcript styled like in the Pitt page, matching size & readable */}
                <div className="h-full bg-gradient-to-b from-[#FAF6EB] via-[#F5EEDC] to-[#EFE7D2] border border-[#DCD3BD] rounded-xs shadow-[0_8px_20px_rgba(45,36,22,0.14),0_2px_6px_rgba(45,36,22,0.08)] p-4 sm:p-5 flex flex-col justify-between relative font-serif text-sm sm:text-[15.5px]">
                  <div>
                    {/* Address & Date header */}
                    <div className="flex justify-between items-start text-xs sm:text-sm text-stone-700 pb-2 border-b border-[#E1D7BF]/60 mb-3">
                      <span className="inline-block px-1.5 py-0.5 bg-stone-200/80 border border-stone-300 text-stone-600 font-mono text-[11px] rounded">
                        [Received 3 March 1938]
                      </span>
                      <div className="text-right leading-tight">
                        <p className="font-semibold text-stone-900">32, Bouverie Square,</p>
                        <p>Folkestone.</p>
                        <p className="font-semibold text-stone-800">2nd March, 1938</p>
                      </div>
                    </div>

                    <div className="text-stone-900 leading-[1.58] space-y-2.5 pt-0.5 text-sm sm:text-[15.5px]">
                      <p className="font-bold text-amber-950">Dear Colonel Newton</p>

                      <p>
                        I am most grateful to the Musicians’ Company for giving a harbourage to my works. You will see by enclosed notices that I have some excuse for my unwillingness to destroy them. The Overture and one opera has had several performances, with good notices (I am keeping that work for the present on the chance of more performances).
                      </p>

                      <p>
                        I am, more or less, laid by, owing to bronchitis nowadays, which makes it impossible to come to London, for instance, and make personal efforts for a hearing. Moreover, there is no chance of a hearing without substantial financial backing, and though a small income makes me independent to a certain extent, it is not enough to allow finding a fairly large sum for a hearing, even were I disposed to this. Some years ago I did get into touch with influential quarters in the theatrical world, only to be turned down without even a glance at the work after eighteen months. The piano and vocal scores are in one parcel, the orchestral score is in the white case, should anyone ever be anxious to look at them. I am asking you to accept the libretto of the Opera Bouffe for yourself as a curio or record of [handwritten words unclear]. I wonder if you will spot the hero. Both these works were written twenty years ago. It may interest you to learn that for the past fifteen years, if I make an average of £10 a year, I consider myself fortunate.
                      </p>

                      <p>
                        Please convey my appreciative thanks to the Company. Possibly it would be more commonsensical to destroy them, but I haven’t the heart to do it myself, so I leave this to the future and the Company.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 text-right border-t border-[#E1D7BF]/60 mt-3 text-sm sm:text-base">
                    <p className="text-stone-700 italic">Yours very sincerely,</p>
                    <p className="font-bold text-stone-900 tracking-wide font-serif text-base sm:text-lg mt-0.5">Percy Godfrey</p>
                  </div>
                </div>
              </div>

              <p className="mt-2.5 text-center text-xs font-serif text-stone-600 italic">
                Autograph letter to the Worshipful Company of Musicians, 2nd March 1938 (click letter image to enlarge)
              </p>
            </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section id="godfrey-works-table" className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                  {PERCY_GODFREY_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('godfrey-coronation-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-[#B8860B] hover:text-[#D4AF37] font-bold transition-all cursor-pointer group"
                            title="Click to view Coronation March work page and audio"
                          >
                            <span>{work.title}</span>
                            <Volume2 className="w-4 h-4 text-[#B8860B] group-hover:text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                          </button>
                        ) : (
                          <span className="inline-flex flex-wrap items-baseline gap-2.5">
                            <span className="font-serif text-base sm:text-lg text-stone-900 font-semibold">
                              {work.title}
                            </span>
                            {work.toFollow && (
                              <span className="font-sans text-xs font-bold tracking-wider uppercase text-amber-900">
                                TO FOLLOW
                              </span>
                            )}
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

          {/* Missing Scores Note */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              MISSING SCORES:
            </span>
            Symphonic Ballad/Overture ; 1st Symphony ; 2nd Symphony ; 3rd Symphony
          </p>
        </section>

        {/* Section 3: Work Page — Coronation Prize-March */}
        <section id="godfrey-coronation-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Coronation Prize-March (1902)
            </h2>

            {/* Audio player flanked by quavers (left standard, right mirrored) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="Coronation Prize-March (1902)"
                subtitle="Percy Godfrey"
                src="https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Godfrey/Prize%20March.mp3"
                sources={[
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Godfrey/Prize%20March.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Godfrey/Prize%20March.mp3", type: "audio/mpeg" }
                ]}
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
            </div>
          </div>

          {/* Narrative Flow & Musical Analysis */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Godfrey&apos;s definitive public triumph came in 1902 when The Worshipful Company of Musicians announced a nationwide competition for a grand Coronation March to celebrate the crowning of King Edward VII. No fewer than 189 composers submitted anonymous scores. The adjudicators—Sir Walter Parratt (Master of the King’s Musick), Sir Hubert Parry, and Sir Frederick Bridge—unanimously awarded the first prize and Gold Medal to Godfrey for his stirring <em>Coronation Prize-March in C</em>.
            </p>

            {/* Archival Newspaper Cutting & Silk Score Replica */}
            <div className="my-8 flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-8">
              <figure className="bg-white border-2 border-stone-300 rounded-lg p-2.5 shadow-sm text-center mx-auto sm:mx-0">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_newspaper.jpg`)}
                  title="Click to enlarge Coronation Prize March newspaper cutting"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_newspaper.jpg`}
                    alt="Coronation Prize March newspaper cutting"
                    className="h-52 sm:h-56 w-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Coronation Prize March newspaper cutting
                </figcaption>
              </figure>

              <figure className="bg-white border-2 border-stone-300 rounded-lg p-2.5 shadow-sm text-center mx-auto sm:mx-0">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_silk.jpg`)}
                  title="Click to enlarge Coronation March silk score replica"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_silk.jpg`}
                    alt="Coronation March silk score replica"
                    className="h-52 sm:h-56 w-auto object-contain mx-auto group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Coronation March silk score replica
                </figcaption>
              </figure>
            </div>

            <p>
              Sales of the march along with a special Coronation Concert at the Royal Albert Hall where nine massed bands performed raised over £3000 for the King Edward&apos;s Hospital fund. Silk square replicas of the score also helped raise money for the charity fund.
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

            {/* Score Cover & ABA Musical Analysis */}
            <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <figure className="w-36 sm:w-40 shrink-0 mx-auto sm:mx-0 p-2 bg-white border-2 border-stone-300 rounded shadow-sm text-center">
                <div
                  className="overflow-hidden rounded border border-stone-200 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_cover.jpg`)}
                  title="Click to enlarge Coronation Prize-March score cover"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/godfrey_march_cover.jpg`}
                    alt="Percy Godfrey Coronation Prize-March score cover"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-1.5 text-xs font-serif text-stone-600 italic">
                  Breitkopf &amp; Härtel score cover
                </figcaption>
              </figure>

              {/* Notes on White Paper with Hole-Punched Left Margin */}
              <div className="flex-1 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-4 text-left overflow-hidden">
                {/* Hole Punches in Left Margin */}
                <HolePunchMargin />

                {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
                <div
                  className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                  aria-hidden="true"
                />

                <p className="m-0">
                  Like most works in this genre the music is in an ABA shape. The principal march material is stately and memorable.
                </p>
                <p className="m-0">
                  The slow middle section{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(108)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 01:48 in Coronation Prize-March audio"
                  >
                    (01:48)
                  </button>{' '}
                  follows on with a simple but memorable legato theme.
                </p>
                <p className="m-0">
                  The recap appears with a longer than expected coda{' '}
                  <button
                    type="button"
                    onClick={() => seekAudio(260)}
                    className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                    title="Jump to 04:20 in Coronation Prize-March audio"
                  >
                    (04:20)
                  </button>
                  , perfectly balanced and suitably dramatic.
                </p>
                <p className="m-0">
                  The overall feel in this 5 minute offering is one of happiness and joy. Its melodic construction was sufficiently straightforward and cheerful to be readily appreciated by a large audience.
                </p>

                <ListenToItAllLink targetId="godfrey-coronation-workpage" />
              </div>
            </div>

            {/* Contemporary Review Card 1: The Musical Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;The award in the Coronation March competition instituted by the Worshipful Company of Musicians has been made to Mr. Percy Godfrey, of The King’s School, Canterbury. There were 189 competitors, and the judges were Sir Walter Parratt, Sir Hubert Parry, and Sir Frederick Bridge. Mr. Godfrey’s march is a vigorous, scholarly, and spirited composition, admirably calculated for ceremonial display, with a trio theme of striking breadth and dignity.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Musical Times (1902)
              </footer>
            </blockquote>

            {/* Contemporary Review Card 2: The Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Mr. Godfrey has captured the exact martial and regal temper demanded by the national celebration. The march is scored with exceptional brilliance and surety of hand, and its central melody possesses that infectious, uplifting nobility that belongs to our finest English ceremonial music.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Times (1902)
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
              className="bg-white border-2 border-[#765B37] rounded-lg max-w-3xl w-full p-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {activeImageModal.includes('newspaper')
                    ? 'Coronation Prize March — Contemporary Press Notice'
                    : activeImageModal.includes('silk')
                    ? 'Coronation March — Silk Score Replica'
                    : activeImageModal.includes('cover')
                    ? 'Percy Godfrey — Coronation Prize-March Score Cover'
                    : activeImageModal.includes('godfrey_letter')
                    ? 'Percy Godfrey — Autograph Letter to Colonel Newton (2nd March 1938)'
                    : activeImageModal.includes('1910_Common_Room')
                    ? (
                      <span>
                        The King’s School 1910 (Percy Godfrey back row 5th from left){' '}
                        <span className="text-xs font-sans font-normal uppercase text-stone-500 tracking-wider">
                          THANKS TO KING’S SCHOOL FOR PHOTO
                        </span>
                      </span>
                    )
                    : activeImageModal.includes('1914_e19aefff')
                    ? 'Percy Godfrey (1914)'
                    : 'Percy Godfrey (1859–1945)'}
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
                  className="w-full h-auto max-h-[78vh] object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
