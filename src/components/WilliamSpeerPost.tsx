import React, { useState, useRef } from 'react';
import { SPEER_ORCHESTRAL_WORKS, SpeerWork } from '../data/speerData';
import { BookOpen, Volume2, ZoomIn, PenLine, ArrowLeft, ArrowUp, X } from 'lucide-react';
import { QuaversIcon } from './QuaversIcon';
import { WaveformAudioPlayer } from './WaveformAudioPlayer';
import { HolePunchMargin } from './HolePunchMargin';
import { ListenToItAllLink } from './ListenToItAllLink';
import { seekWithFadeIn } from '../utils/audioFade';

interface WilliamSpeerPostProps {
  onBack?: () => void;
  isFeatured?: boolean;
}

export const WilliamSpeerPost: React.FC<WilliamSpeerPostProps> = ({ onBack, isFeatured = false }) => {
  const [selectedWork, setSelectedWork] = useState<SpeerWork | null>(null);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const rhapsodyAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const seekRhapsodyAudio = (seconds: number) => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    seekWithFadeIn(rhapsodyAudioRef.current, seconds);
  };

  const seekAudio = (seconds: number) => {
    if (rhapsodyAudioRef.current && !rhapsodyAudioRef.current.paused) {
      rhapsodyAudioRef.current.pause();
    }
    seekWithFadeIn(audioRef.current, seconds);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article id="william-speer-post" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
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
            William Henry Speer (1863–1937)
          </h1>

          {/* Subtitle / Quote */}
          <p className="font-times italic text-xl sm:text-2xl text-black max-w-2xl mx-auto leading-relaxed mt-3">
            &ldquo;In the shadow of the Malverns and Elgar&rdquo;
          </p>
        </header>

        {/* William Speer Photo on Left & Compact Audio Realisations + Opening Paragraph on Right */}
        <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
          <figure className="w-40 sm:w-44 md:w-48 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
            <div
              className="overflow-hidden rounded border border-stone-300 bg-stone-100 aspect-3/4 cursor-pointer group relative"
              onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/speer_portrait_restored.jpg`)}
              title="Click to enlarge William Henry Speer portrait"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/speer_portrait_restored.jpg`}
                alt="Dr. William Henry Speer (1863–1937) - English composer and organist"
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                  <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                </span>
              </div>
            </div>
            <figcaption className="mt-2.5 font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
              William Henry Speer
            </figcaption>
          </figure>

          <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
            {/* Audio Realisations Work-Page Selector */}
            <div
              id="speer-audio-selector"
              className="w-full sm:w-1/2 scroll-mt-24"
            >
              <div className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-amber-900 uppercase">
                    Audio Realisations
                  </span>
                  <QuaversIcon ascending className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                </div>

                <div className="grid grid-cols-1 gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => scrollToSection('speer-rhapsody-workpage')}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Rhapsody in E&#9837;
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('speer-nocturne-workpage')}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-300 hover:border-amber-800/60 rounded-md text-left transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 font-serif text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-950 leading-snug">
                      Nocturne for strings
                    </div>
                    <Volume2 className="w-4 h-4 text-amber-900 shrink-0 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>
            </div>

            <p className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              William Henry Speer was born in London in 1863. He studied with Charles Harford Lloyd at Gloucester and later enrolled at the Royal College of Organists in London, where he eventually gained a Doctorate. Here he joined the long list of aspiring musicians who were taught by Charles Villiers Stanford, who had so much influence at Trinity College Cambridge, which William also attended.
            </p>
          </div>
        </div>

        {/* Early Life Narrative & Memoir from Caroline Hart */}
        <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed mt-4 space-y-4 text-left">
          <p>
            His working life included church appointments, notably at Bexhill from 1903, but he composed regularly and as well as a large amount of choral/organ music a substantial body of his output extended into the concert hall.
          </p>

          <p>
            Caroline Hart, grand-daughter of William Henry Speer, has kindly provided some background on the life of her grandfather:
          </p>

          <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &ldquo;Too delicate to go to school for long, young William retreated into the study of music, and his wealthy father, Alfred Miles Speer, had an organ installed in the Priory, the family home in Malvern. William began to play it at the age of seven and gave organ recitals at the Priory which were &lsquo;much admired&rsquo;.&rdquo;
            </p>

            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &ldquo;It would seem unlikely that William was untouched by the musical trends of the time. The Three Choirs Festival in the cathedrals of Gloucester, Hereford and Worcester would have sharpened his awareness of the great choral traditions that were being upheld there. He also could not have been unaware of the growing influence of Elgar who was living in and around Malvern and pedalling precariously around the Worcestershire lanes on his new bicycle.&rdquo;
            </p>

            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &ldquo;In 1887 William married Marion Estridge, daughter of the late Rev. Henry Estridge. It is said that the bells of the Priory Church &lsquo;rang merry peals, and the town was quite gay&rsquo;. The service was fully choral throughout, and included a musical rendering of <em>Deus Misereatur</em>, composed by the bridegroom. It is said that she did not take his composing efforts very seriously.&rdquo;
            </p>

            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &ldquo;Undaunted, William carried on. As Richard Bratby has written in 2018 after attending the Three Choirs Festival, &lsquo;(You) .. sense distantly, the atmosphere of tradition, celebration and inspired amateurism in which 19th century British music struggled to remake itself.&rsquo; Only the outsider, Edward Elgar, would really succeed in breaking through with his <em>Dream of Gerontius</em>. As Bratby says, with Parry, Smyth and Stanford, one eye was always looking cautiously to Germany for approval, and William Henry falls squarely into the category of minor composers working in this vein.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div
                className="w-32 sm:w-36 shrink-0 mx-auto sm:mx-0 p-1.5 bg-stone-50 border border-stone-300 rounded shadow-2xs cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/speer_photo_68fbde93.jpeg`)}
                title="Click to enlarge photograph"
              >
                <div className="overflow-hidden rounded-xs aspect-3/4 bg-stone-100">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/speer_photo_68fbde93.jpeg`}
                    alt="Dr. William Henry Speer and Marion Speer in the garden"
                    className="w-full h-full object-cover brightness-105 group-hover:scale-102 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-1.5 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xs">
                  <span className="bg-stone-900/90 text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3 h-3" /> Enlarge
                  </span>
                </div>
              </div>

              <p className="flex-1 font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                &ldquo;Because I never knew either grandparent and because my parents divorced when I was three, Malvern, the Victorian musical traditions and William&apos;s work passed me by completely. I even went to school in Bexhill unaware that William had for many years lived in St Leonard&apos;s and been the choirmaster and organist of St Peter&apos;s Church, Bexhill, where he drew up a list of twelve draconian rules for the choirboys which would suggest that he was strict.&rdquo;
              </p>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &ldquo;I cannot remember what prompted me to start researching my grandfather&apos;s life and music. I started by going to the Bodleian, where the manuscripts were lodged, and subsequently visited Malvern to see the family house and tomb. But I was conscious that the music had fallen completely into abeyance, seldom played, somewhere on the patronised Late Romantic timespan that held little interest to anyone.&rdquo;
            </p>

            <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold not-italic">
              — Caroline Hart
            </footer>
          </blockquote>

          <p className="mt-6">
            Grove records Bournemouth Symphony Concert performances of his Rhapsody in E-flat, Festival Overture and Symphony in E-flat. The symphony received its first performance on 5 March 1906, when Dan Godfrey conducted the Bournemouth Municipal Orchestra; this score is sadly lost to us. His choral ballad <em>The Jackdaw of Rheims</em> was also widely performed.
          </p>
        </div>

        {/* Orchestral Work List Section */}
        <section id="speer-works" className="mt-10 pt-6 border-t-2 border-stone-300/70 scroll-mt-20">
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
                  {SPEER_ORCHESTRAL_WORKS.map((work) => {
                    return (
                      <tr
                        key={work.id}
                        className="hover:bg-amber-50/60 transition-colors"
                      >
                        {/* Work Title */}
                        <td className="py-2 px-4 sm:px-6">
                          {work.hasDedicatedPage ? (
                            <button
                              type="button"
                              onClick={() => scrollToSection(work.targetSectionId || 'speer-nocturne-workpage')}
                              className="inline-flex items-center gap-2 text-left font-serif text-lg sm:text-xl text-black hover:text-amber-950 font-bold transition-all cursor-pointer group"
                              title={`Click to view ${work.title} work page and audio`}
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

                        {/* Date */}
                        <td className="py-2 px-4 sm:px-6 font-serif text-base sm:text-lg text-stone-700 text-right tabular-nums">
                          {work.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Missing Scores Note Under Table */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm text-stone-900 mr-2">
              MISSING SCORE:
            </span>
            Symphony in E&#9837;
          </p>

        </section>

        {/* Section: Work Page — Rhapsody in Eb */}
        <section id="speer-rhapsody-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Rhapsody in E&#9837;
            </h2>

            {/* Audio player flanked by quavers (left standard, right descending) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={rhapsodyAudioRef}
                title="Rhapsody in E flat"
                subtitle="William Henry Speer"
                src="https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Speer/Rhapsody.mp3"
                sources={[
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Speer/Rhapsody.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/refs/heads/main/Speer/Rhapsody.mp3", type: "audio/mpeg" },
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/main/Speer/Rhapsody.mp3", type: "audio/mpeg" }
                ]}
                onPlay={() => {
                  if (audioRef.current && !audioRef.current.paused) {
                    audioRef.current.pause();
                  }
                }}
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

          {/* Musical Analysis — Rhapsody in Eb */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 my-8 text-left">
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
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-4 sm:space-y-5 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0">
                Slow introduction in the remote key of E&#9837; minor painting a bare landscape with a plaintive solo horn melody based on two rising 5ths. At{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(139)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 02:19 in audio player"
                >
                  (02:19)
                </button>{' '}
                the woodwind take up this melody to end the introduction.
              </p>

              <p className="text-left m-0">
                The <em>Allegro</em> starts in E&#9837; major with a lively marching tune on cellos and bass. All strings take up this melody{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(176)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 02:56 in audio player"
                >
                  (02:56)
                </button>
              </p>

              <p className="text-left m-0">
                Cellos bring in a new legato melody{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(249)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 04:09 in audio player"
                >
                  (04:09)
                </button>
              </p>

              <p className="text-left m-0">
                Brass announce a short staccato phrase now in G major{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(369)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 06:09 in audio player"
                >
                  (06:09)
                </button>
              </p>

              <p className="text-left m-0">
                Fragments of the march tune are traded around{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(434)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 07:14 in audio player"
                >
                  (07:14)
                </button>{' '}
                in a build up to a full reminder of the melody.
              </p>

              <p className="text-left m-0">
                Violins now take the cello melody from earlier and develop it. A <em>pi&ugrave; mosso</em> heralds the build up to the coda.
              </p>

              <p className="text-left m-0">
                At{' '}
                <button
                  type="button"
                  onClick={() => seekRhapsodyAudio(638)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 10:38 in audio player"
                >
                  (10:38)
                </button>{' '}
                the music winds down in tempo and dynamics to an extended recap of the slow introduction.
              </p>

              <ListenToItAllLink targetId="speer-rhapsody-workpage" />
            </div>

            {/* Archival Title Page & Manuscript Score Excerpt Full-Width Side by Side */}
            <div className="mt-8 mb-6 pt-2 w-full grid grid-cols-1 sm:grid-cols-[167fr_240fr] gap-4 items-stretch">
              {/* Manuscript Title Page */}
              <figure className="p-2 sm:p-2.5 bg-[#FAF7F0] border-2 border-stone-300/90 rounded-lg shadow-sm text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 w-full flex-1 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/Title_page_6cba544c.JPEG`)}
                  title="Click to enlarge Rhapsody in E flat manuscript title page"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/Title_page_6cba544c.JPEG`}
                    alt="Rhapsody in E flat for Orchestra by William H. Speer — manuscript title page"
                    className="w-full h-full object-cover block group-hover:scale-102 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Manuscript title page for <em>Rhapsody in E&#9837;</em>
                </figcaption>
              </figure>

              {/* Manuscript Score Excerpt */}
              <figure className="p-2 sm:p-2.5 bg-[#FAF7F0] border-2 border-stone-300/90 rounded-lg shadow-sm text-center flex flex-col justify-between">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 w-full flex-1 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/sample_rhapsody_c8e0c603.jpg`)}
                  title="Click to enlarge Rhapsody in E flat manuscript score excerpt"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/sample_rhapsody_c8e0c603.jpg`}
                    alt="Rhapsody in E flat by W. H. Speer — manuscript score excerpt"
                    className="w-full h-full object-cover block group-hover:scale-102 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Manuscript score excerpt from <em>Rhapsody in E&#9837;</em>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Back to work choice / top links */}
          <div className="pt-4 flex items-center justify-center gap-6 text-center">
            <button
              type="button"
              onClick={() => scrollToSection('speer-audio-selector')}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Work Choice</span>
            </button>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </section>

        {/* Section: Work Page — Nocturne for strings */}
        <section id="speer-nocturne-workpage" className="mt-14 pt-8 border-t-2 border-stone-300/70 scroll-mt-20">
          <div className="text-center mb-8 pb-6 border-b border-stone-200">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-amber-900 uppercase block mb-3 sm:mb-4">
              WORK PAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Nocturne for strings (Op. 17)
            </h2>

            {/* Audio player flanked by quavers (left standard, right descending) */}
            <div className="max-w-2xl mx-auto mt-3 flex items-center justify-center gap-3.5">
              <QuaversIcon className="w-11 h-11 sm:w-12 sm:h-12 shrink-0" />
              <WaveformAudioPlayer
                ref={audioRef}
                title="Nocturne for strings (Op. 17)"
                subtitle="William Henry Speer"
                src="https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/refs/heads/main/Speer/Nocturne.mp3"
                sources={[
                  { src: "https://raw.githubusercontent.com/martinrobertwalsh/MP3FreddieWalsh/refs/heads/main/Speer/Nocturne.mp3", type: "audio/mpeg" },
                  { src: "https://github.com/martinrobertwalsh/MP3FreddieWalsh/raw/refs/heads/main/Speer/Nocturne.mp3", type: "audio/mpeg" },
                  { src: `${import.meta.env.BASE_URL}assets/aistudio/Nocturne_speer.mp3`, type: "audio/mpeg" }
                ]}
                onPlay={() => {
                  if (rhapsodyAudioRef.current && !rhapsodyAudioRef.current.paused) {
                    rhapsodyAudioRef.current.pause();
                  }
                }}
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

          {/* Narrative & Musical Analysis */}
          <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 my-8 text-left">
            <p className="text-left first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Speer&apos;s <em>Nocturne for strings</em> (Op. 17) is clearly a later work than all of his other remaining scores. There is a greater maturity and complexity in the writing; rich contrapuntal textures and long breathed lyrical melodies abound.
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
            <div className="my-5 relative bg-white border border-stone-300 rounded-md shadow-sm font-serif font-normal text-stone-900 text-lg sm:text-xl leading-relaxed pl-12 sm:pl-16 pr-5 sm:pr-7 py-5 sm:py-6 space-y-6 sm:space-y-7 text-left overflow-hidden">
              {/* Hole Punches in Left Margin */}
              <HolePunchMargin />

              {/* Vertical Brown Margin Line */}
              <div
                className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
                aria-hidden="true"
              />

              <p className="text-left m-0 pb-1 sm:pb-2">
                A full harmonic texture from the outset with unexpected modulations evident within the first dozen or so bars. The middle section in E major (from A&#9837;) has the feel of a march with an off beat/ syncopated melody.
              </p>
              <p className="text-left m-0">
                The repeat of the first part{' '}
                <button
                  type="button"
                  onClick={() => seekAudio(176)}
                  className="font-mono text-[0.78em] text-amber-900 hover:text-amber-950 font-semibold transition-colors cursor-pointer align-baseline"
                  title="Jump to 02:56 in Nocturne audio"
                >
                  (02:56)
                </button>{' '}
                is more ornate in melody, harmony and certainly in polyphony. The only downside is that the piece seems to end far too early.
              </p>

              <ListenToItAllLink targetId="speer-nocturne-workpage" />
            </div>

            {/* Score Incipit: Nocturne for Strings (Op. 17) */}
            <div className="mt-8 mb-6 pt-2">
              <figure className="max-w-lg mx-auto p-2 sm:p-2.5 bg-[#FAF7F0] border-2 border-stone-300/90 rounded-lg shadow-sm text-center">
                <div
                  className="overflow-hidden rounded border border-stone-300 bg-stone-100 cursor-pointer group relative"
                  onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/1st_page_acdcb2b8.jpg`)}
                  title="Click to enlarge Nocturne for strings score excerpt"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/1st_page_acdcb2b8.jpg`}
                    alt="Nocturne for Strings (Op. 17) by W. H. Speer - Opening score excerpt (bars 0–6)"
                    className="w-full h-auto object-contain group-hover:scale-101 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2 text-xs font-serif text-stone-600 italic">
                  Opening score excerpt for William Henry Speer&apos;s <em>Nocturne for strings</em> (Op. 17), bars 0–6
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Back to work choice / top links */}
          <div className="pt-6 flex items-center justify-center gap-6 text-center">
            <button
              type="button"
              onClick={() => scrollToSection('speer-audio-selector')}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Work Choice</span>
            </button>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-stone-500 hover:text-amber-900 uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </section>

        {/* Section: Obituary & The Funeral */}
        <section id="speer-obituary" className="mt-14 pt-8 border-t border-stone-300/80 scroll-mt-20">
          <div className="text-left mb-4">
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-amber-900 uppercase">
              OBITUARY
            </h2>
          </div>

          <div className="bg-white border border-stone-300 rounded-md shadow-xs p-6 sm:p-8 font-serif text-stone-800 text-base sm:text-lg leading-relaxed space-y-5 text-left">
            <p>
              The death of Dr. W. H. Speer, of South Sheen, Brittany-road, St. Leonards, formerly organist of St. Peter&rsquo;s Church, Bexhill, occurred at Sidmouth at the age of 73.
            </p>
            <p>
              In 1902 William took up the appointment of organist at Christ Church, High Wycombe, and a year later was appointed to a similar post at St. Peter&rsquo;s Bexhill, where his activities in the musical life of the town are still remembered. After some years there, Dr. Speer went to live in the country at Balcombe, Haywards Heath, eventually settling at St. Leonards, and becoming a churchwarden of Christ Church.
            </p>
            <p>
              Composition was his first love, and he was never so happy as when engaged in the fashioning of some musical work. He wrote voluminously for orchestra, chorus, and in practically every branch of composition, including chamber music, in which genre he composed a fine string quartet at St. Leonards.
            </p>
            <p>
              The passing of William Speer is a real and serious loss, not only to his personal friends, but to the cause of music to which he so richly contributed.
            </p>

            <div className="pt-5 mt-6 border-t border-stone-200">
              <h3 className="font-mono text-sm sm:text-base font-bold tracking-widest text-amber-900 uppercase mb-4">
                THE FUNERAL
              </h3>
              <div className="space-y-4">
                <p>
                  The funeral took place on Wednesday. The coffin was taken to St. Matthias Church, Malvern Link, on the previous evening, and a watch was kept. Requiem Mass was celebrated early on Wednesday morning, and was followed by Absolutions of the Dead.
                </p>
                <p>
                  There were many beautiful floral tributes, including a cross from the widow and family, and another from the clergy, churchwardens, sidesmen and congregation of Christ Church, St. Leonards.
                </p>
              </div>
            </div>
          </div>

          {/* Side-by-side Archival Plates: Speer Memorial Library Cutting & Dr. and Mrs. Speer */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <figure className="p-2.5 bg-white border border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
              <div
                className="overflow-hidden rounded-xs border border-stone-200 bg-stone-50 aspect-3/4 flex items-center justify-center p-2 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/legacy_dc57f23c.jpg`)}
                title="Click to enlarge Speer Memorial Library cutting"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/legacy_dc57f23c.jpg`}
                  alt="Newspaper cutting: Speer Memorial Library gift to Hastings Municipal Orchestra"
                  className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif text-xs sm:text-sm text-stone-700 italic">
                Hastings and St Leonards Observer (17 June 1939)
              </figcaption>
            </figure>

            <figure className="p-2.5 bg-white border border-stone-300 rounded shadow-xs text-center flex flex-col justify-between">
              <div
                className="overflow-hidden rounded-xs border border-stone-200 bg-stone-50 aspect-3/4 flex items-center justify-center p-2 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/photo_b3c2ba5c.jpg`)}
                title="Click to enlarge memorial tablet photograph"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/photo_b3c2ba5c.jpg`}
                  alt="Memorial tablet at Great Malvern Cemetery inscribed: William Henry Speer, M.A. Mus Doc., Born Novr. 9th 1863, Died May 21st 1937"
                  className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-102 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
              <figcaption className="mt-2.5 font-serif text-xs sm:text-sm text-stone-700 italic">
                Memorial tablet at Great Malvern Cemetery (1863–1937)
              </figcaption>
            </figure>
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

        {/* Acknowledgement */}
        <p className="mt-8 pt-6 border-t border-stone-200/80 text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed text-center">
          I am grateful to Caroline Hart, William Henry Speer’s granddaughter, for permission to create and share realisations of his music.
        </p>
      </div>

      {/* Image Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white p-3 rounded shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImageModal(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors cursor-pointer z-10"
              aria-label="Close image preview"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={activeImageModal}
              alt="Archival document"
              className="max-h-[82vh] w-auto mx-auto rounded object-contain filter contrast-105"
            />
            <p className="text-center font-serif text-xs text-stone-600 mt-2">
              {activeImageModal.includes('Title_page_6cba544c')
                ? 'William Henry Speer — Rhapsody in E♭ for Orchestra (Manuscript Title Page)'
                : activeImageModal.includes('sample_rhapsody')
                ? 'William Henry Speer — Rhapsody in E♭, Manuscript Score Excerpt'
                : activeImageModal.includes('1st_page') || activeImageModal.includes('cover')
                ? 'William Henry Speer — Nocturne for strings (Op. 17), Opening Score Excerpt (Bars 0–6)'
                : activeImageModal.includes('legacy_dc57f23c')
                ? 'Hastings and St Leonards Observer — Published Saturday, 17 June 1939'
                : activeImageModal.includes('photo_b3c2ba5c')
                ? 'William Henry Speer, M.A. Mus Doc. — Memorial tablet at Great Malvern Cemetery (1863–1937)'
                : activeImageModal.includes('speer_photo_68fbde93')
                ? 'William and Marion'
                : 'Dr. William Henry Speer (1863–1937)'}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
