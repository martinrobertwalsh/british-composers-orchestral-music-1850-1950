import React, { useState, useRef } from 'react';
import { ARTHUR_HERVEY_ORCHESTRAL_WORKS } from '../data/herveyData';
import { Volume2, ArrowUp, ZoomIn, X, ArrowLeft, BookOpen, PenLine } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn } from '../utils/audioFade';

interface ArthurHerveyPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const ArthurHerveyPost: React.FC<ArthurHerveyPostProps> = ({ onBack, isFeatured = false }) => {
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
    <article id="arthur-hervey-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {isFeatured && (
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 uppercase">
              FEATURED POST
            </span>
          </div>
        )}

        {/* Post Title */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-3">
            Arthur Hervey (1855–1922)
          </h1>

          {/* Subtitle / Quote */}
          <p className="font-times italic text-xl sm:text-2xl text-amber-950 max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;Writer, critic, promoter and composer&rdquo;
          </p>
        </header>

        {/* Section 1: Biography */}
        <section id="hervey-bio">
          {/* Arthur Hervey Photo on Left & Compact Audio Realisations + Opening Paragraph on Right */}
          <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/arthur_hervey_portrait.jpg`)}
                title="Click to enlarge Arthur Hervey portrait"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/arthur_hervey_portrait.jpg`}
                  alt="Arthur Hervey (1855–1922)"
                  className="w-full h-full object-cover object-top filter grayscale group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Arthur Hervey
              </figcaption>
            </figure>

            <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
              {/* Audio Realisations Work-Page Selector */}
              <div
                id="hervey-audio-selector"
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
                    onClick={() => scrollToSection('hervey-summer-workpage')}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Summer (Tone Poem)
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                Hervey was born in Paris to Irish parents who were rich landowners in Ireland. The actual family name was Harvey but for some reason Arthur chose to change his surname to Hervey. The family seat had been at Killiane Castle, Wexford since the mid 17th century. However, as time went by, the Harveys increasingly became absentee landlords. They leased the land to their tenants. Both the condition of the castle and the size of the estate materially diminished during the late 19th century and the family considered Killiane Castle too damp to stay in, especially during the winter. In 1908 the property was sold.
              </p>
            </div>
          </div>

          {/* Killiane Castle Figure & Travel/Education Paragraphs */}
          <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <figure className="w-full sm:w-72 md:w-80 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[16/9] cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/killiane_castle.jpg`)}
                title="Click to enlarge Killiane Castle"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/killiane_castle.jpg`}
                  alt="Killiane Castle, Wexford"
                  className="w-full h-full object-cover filter grayscale group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                Killiane Castle
              </figcaption>
            </figure>

            <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1 space-y-4 text-left">
              <p>
                Being a family of considerable wealth facilitated their travels across Europe and they enjoyed cultural pursuits such as music and literature. This privileged background shaped Hervey&apos;s formative years before the family relocated to England.
              </p>
              <p>
                Arthur was educated at the Oratory, Birmingham, and studied privately in London with Berthold Tours and Edouard Marlois, two organist-composers with a French background.
              </p>
            </div>
          </div>

          {/* Biographical Narrative Continued */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p>
              He spent fairly equal time as both a composer and writer, principally biographical studies of composers, most of which were devoted to French contemporaries like Saint-Saëns and Bruneau. He was widely regarded as an expert on French music. As music critic for <em>Vanity Fair</em> from 1889 to 1892 and subsequently for <em>The Morning Post</em> from 1892 to 1908, Hervey penned weekly columns and concert reviews that promoted emerging European talent to British audiences.
            </p>

            {/* Plaque Row */}
            <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start p-6 bg-white border-2 border-stone-300 rounded-lg shadow-xs">
              <figure className="w-32 shrink-0 mx-auto sm:mx-0 text-center">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-square cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/hervey_plaque.jpg`)}
                  title="Click to enlarge Hervey Plaque"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/hervey_plaque.jpg`}
                    alt="Arthur Hervey carved marble relief portrait at Royal Academy of Music"
                    className="w-full h-full object-cover filter grayscale group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3 h-3" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-1.5 text-xs font-serif text-stone-600 italic">
                  Hervey Plaque
                </figcaption>
              </figure>

              <div className="flex-1 font-serif text-stone-800 text-base sm:text-lg leading-relaxed space-y-3">
                <p>
                  His stepdaughter, Nancy Webster, left a bequest to the Royal Academy of Music in 1959 even though Hervey had no official connection to the college. The academy uses this funding to award the annual Arthur Hervey Scholarship (or Prize) to support outstanding young composition and performance students during their studies. A carved marble relief portrait celebrating his legacy was donated to the RAM collection and is kept in the Royal Academy of Music Museum.
                </p>
              </div>
            </div>

            <p>
              As a composer he wrote quite extensively for orchestra, mainly in the genre of tone poems.
            </p>
          </div>
        </section>

        {/* Section 2: Orchestral Work List */}
        <section className="mt-10 pt-6 border-t-2 border-stone-300/70">
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
                    <th className="py-2 px-4 sm:px-6 font-semibold">Work</th>
                    <th className="py-2 px-4 sm:px-6 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm font-sans">
                  {ARTHUR_HERVEY_ORCHESTRAL_WORKS.map((work) => (
                    <tr key={work.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="py-2 px-4 sm:px-6">
                        {work.hasDedicatedPage ? (
                          <button
                            type="button"
                            onClick={() => scrollToSection('hervey-summer-workpage')}
                            className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                            title="Click to view Summer work page and audio"
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
                      <td className="py-2 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums">
                        {work.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Scores (Undated) Note */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              OTHER SCORES (UNDATED):
            </span>
            Vorspiel für grosses Orchester ; Serenade for solo violin and orchestra ; The Roll Call — tone poem ; In the Twilight — tone poem ; Romance - violon et orchestra ; &ldquo;Elfin revels&rdquo; - Scherzo ; Ouverture dramatique ; At sunset - tone poem
          </p>
        </section>

        {/* Section 3: Work Page — Summer: Tone Poem */}
        <section id="hervey-summer-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Summer (Tone Poem)
            </h2>

            {/* Audio player flanked by quavers (left standard, right mirrored) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="Summer (Tone Poem)"
                subtitle="Arthur Hervey"
                src="https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Hervey/Summer.mp3"
                className="flex-1"
              />
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" descending={true} />
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

          {/* Narrative Flow & Contemporary Reviews */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6 text-left">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              This is arguably Hervey&apos;s finest orchestral work. It comes five years after the <em>Two Tone Pictures</em> and the Concert Overture <em>Youth</em>. It was one of a series of commissions from the Cardiff Festival and it was first performed on the opening day, 25th September, 1907 with Hervey himself conducting the London Symphony Orchestra.
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
                Its musical landscape evokes the warmth and stillness of a summer day, interrupted by a thunderstorm. The work starts gently and builds to a glorious climax{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(70)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 01:10 in Summer audio"
                >
                  (01.10)
                </button>{' '}
                with bright, dazzling fanfare like flourishes. A storm begins to stir.{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(200)}
                  className="whitespace-nowrap font-['Arial',sans-serif] text-[0.78em] font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer align-baseline"
                  title="Jump to 03:20 in Summer audio"
                >
                  (03:20)
                </button>{' '}
                It&apos;s not an especially dramatic portrayal but a more subtle, threatening rumbling. This middle section shows, very clearly, the skills Hervey possessed as an orchestral scene painter. The calm returns and the music builds to a bright finale.
              </p>

              <ListenToItAllLink targetId="hervey-summer-workpage" />
            </div>

            <p>
              The most extensive review of &lsquo;Summer&rsquo; was given in <em>The Times</em> (26 September). It began by reminding the reader that three of the composer&apos;s tone poems have been given at previous Cardiff Festivals: these included <em>On the Heights</em> and <em>On the March</em>, both performed in 1902 and <em>In the East</em> which was premiered in 1904.
            </p>

            {/* Review 1: The Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;The second part of the concert began with a new overture by Mr. Arthur Hervey, three of whose characteristic tone-pictures have been given for the first time at previous Cardiff festivals. The new work is entitled &quot;Summer,&quot; and is a remarkably successful piece of landscape-painting in music. Two beautiful themes of voluptuous warmth are interwoven with great skill, and the section which represents a thunderstorm does so in an unconventional manner, which never once suggests the &quot;Pastoral Symphony,&quot; and surely deserves credit for not suggesting it, especially since the key of both is F major. Not only is the scoring rich and scholarly, but the structure of the piece is interesting and the manipulation of the themes most skilful. The composer conducted a very successful performance.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Times (26 September 1907)
              </footer>
            </blockquote>

            <p>
              <em>The Observer</em> (29 September) was less enthusiastic:
            </p>

            {/* Review 2: The Observer */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Mr Arthur Hervey who has so often given proof of his freshness and melodic gifts in the &lsquo;descriptive overture&rsquo; style, was not heard at his best in &lsquo;Summer&rsquo;. It contains some graceful writing it is true, but it lacked the character which made his &lsquo;Youth&rsquo; and &lsquo;On the Heights&rsquo; so pleasing and, in a sense, distinctive.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Observer (29 September 1907)
              </footer>
            </blockquote>

            <p>
              <em>The Musical Times</em> was more positive:
            </p>

            {/* Review 3: The Musical Times */}
            <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Two of the octet of novelties were presented in the second part of the programme. The first of these was a Tone-poem for orchestra entitled &lsquo;Summer,&rsquo; composed expressly for the occasion and conducted by Mr. Arthur Hervey. Mainly constructed on two themes, &lsquo;Summer&rsquo; and &lsquo;Nature,&rsquo; Mr. Hervey’s latest work gives further proof of his poetic temperament and creative gifts. Eminently refined in his orchestration, he never over-colours his picture, though—as in the storm episode in this work—he well knows how to paint on a large canvas, yet always with artistic restraint. Admirably played by the orchestra, the Tone-poem and its composer received a cordial reception.&rdquo;
              </p>
              <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
                — The Musical Times (1907)
              </footer>
            </blockquote>

            <p>
              A second performance took place in London on 18 February 1909, again conducted by Hervey.
            </p>

            {/* Manuscript Excerpt */}
            <div className="my-8 pt-4">
              <figure className="max-w-2xl mx-auto p-2.5 bg-white border-2 border-stone-300 rounded-lg shadow-sm text-center">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-[16/9] cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/hervey_summer_manuscript.jpg`)}
                  title="Click to enlarge Summer manuscript score"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/hervey_summer_manuscript.jpg`}
                    alt="Summer manuscript excerpt in Arthur Hervey's hand"
                    className="w-full h-full object-cover filter grayscale group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Summer manuscript score excerpt
                </figcaption>
              </figure>
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

        {/* Image Modal for Full-screen Enlarge */}
        {activeImageModal && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActiveImageModal(null)}
          >
            <div
              className="bg-white p-3 rounded-lg max-w-4xl max-h-[90vh] overflow-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImageModal}
                alt="Enlarged document or portrait"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => setActiveImageModal(null)}
                  className="px-4 py-1.5 bg-stone-900 text-white text-xs font-serif rounded uppercase font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
