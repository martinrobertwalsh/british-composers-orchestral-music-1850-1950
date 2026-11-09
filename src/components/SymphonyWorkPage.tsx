import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ZoomIn, Calendar, X, BookOpen, PenLine, Play } from 'lucide-react';

interface SymphonyWorkPageProps {
  onBack: () => void;
}

export const SymphonyWorkPage: React.FC<SymphonyWorkPageProps> = ({ onBack }) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [showDatesPopup, setShowDatesPopup] = useState<boolean>(false);
  const [activeJumpLabel, setActiveJumpLabel] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
    };
  }, []);

  const movementJumps = [
    { label: '1st mov', title: 'I. Allegro assai', timeStr: '00:00', time: 0 },
    { label: '2nd mov', title: 'II. Andante poco Allegretto', timeStr: '09:31', time: 571.0 },
    { label: '3rd mov', title: 'III. Scherzo', timeStr: '16:55', time: 1015.5 },
    { label: '4th mov', title: 'IV. Allegro con Maesta', timeStr: '20:27', time: 1227.0 },
  ];

  const handleJumpToMovement = (time: number, label: string) => {
    if (jumpTimeoutRef.current) {
      clearTimeout(jumpTimeoutRef.current);
      jumpTimeoutRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = time;
      setActiveJumpLabel(label);

      jumpTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
        setActiveJumpLabel(null);
      }, 1500);
    }
  };

  return (
    <article id="symphony-work-page" className="w-full bg-[#FAF8F5] text-stone-900 py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-200 selection:text-stone-900">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar / Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-serif text-sm sm:text-base font-semibold text-stone-800 hover:text-amber-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Walter Macfarren</span>
          </button>

          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-stone-600 uppercase">
            WORK PAGE
          </span>
        </div>

        {/* Post Title & Audio Player */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            Symphony in B flat (1879)
          </h1>

          <div className="max-w-xl mx-auto mt-3">
            <audio
              ref={audioRef}
              controls
              preload="metadata"
              className="w-full h-11 accent-amber-900 rounded focus:outline-none shadow-2xs"
              src={`${import.meta.env.BASE_URL}assets/aistudio/macfarren_symphony_in_bb_45c21c49.mp3`}
            >
              Your browser does not support the audio element.
            </audio>

            {/* Quick Movement Jump Buttons Bar under Audio */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-600 font-semibold mr-1">
                Movements:
              </span>
              {movementJumps.map((jump, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleJumpToMovement(jump.time, jump.label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 border border-stone-300 rounded font-serif text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs ${
                    activeJumpLabel === jump.label
                      ? 'bg-amber-100 ring-2 ring-amber-800 text-stone-900'
                      : 'bg-white hover:bg-amber-50 text-stone-800'
                  }`}
                  title={`Jump to ${jump.title} (${jump.timeStr})`}
                >
                  <Play className="w-3 h-3 text-amber-900" />
                  <span>{jump.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Autograph Score Image on Left & Opening Paragraphs on Right */}
        <div className="my-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <figure className="w-56 sm:w-64 md:w-72 shrink-0 mx-auto sm:mx-0 p-2.5 bg-white border-2 border-stone-300 rounded shadow-md text-center">
            <div className="overflow-hidden rounded border border-stone-300 bg-stone-900 aspect-[240/110]">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/symphony_cover_straight.jpg`}
                alt="Symphony in B. Flat — Walter Macfarren 1879 score cover"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>

          <div className="flex-1 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed pt-1">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              This was presumed to be lost but I was fortunate enough to discover, through much searching online, an autograph score residing in the archives of the library of North-Western University, Illinois, 4000 miles away! The very helpful library staff kindly made a copy of the score.
            </p>
          </div>
        </div>

        {/* Narrative Flow */}
        <div className="font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6 mt-6">
          <p>
            Completed in August 1879 the work is conservative in style for its time. Despite this it received a number of performances in some surprising places. These are noted, with dates, on the inside cover of the score.
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
            <span
              className="absolute left-3 sm:left-3.5 top-12 sm:top-14 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FAF8F5] border border-stone-400/80 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.38)] pointer-events-none"
              aria-hidden="true"
              title="Binder hole punch"
            />
            <span
              className="absolute left-3 sm:left-3.5 bottom-12 sm:bottom-14 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FAF8F5] border border-stone-400/80 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.38)] pointer-events-none"
              aria-hidden="true"
              title="Binder hole punch"
            />

            {/* Vertical Brown Margin Line - feinter and reaching all the way to top & bottom */}
            <div
              className="absolute left-8 sm:left-10 -top-1 -bottom-1 w-[1.5px] bg-amber-800/40 pointer-events-none"
              aria-hidden="true"
            />

            <div>
              <button
                type="button"
                onClick={() => handleJumpToMovement(0, '1st mov')}
                className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-center flex-wrap gap-y-1"
                title="Jump to 1st movement in audio player"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                  aria-label="Movement I"
                >
                  I
                </span>
                <span>Andante Lento : Allegro assai</span>{' '}
                <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                  (00:00)
                </span>
              </button>
              <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                String pizzicato in the slow introduction followed by a standard allegro with some erratic key changes in the development.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleJumpToMovement(571.0, '2nd mov')}
                className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-center flex-wrap gap-y-1"
                title="Jump to 2nd movement in audio player"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                  aria-label="Movement II"
                >
                  II
                </span>
                <span>Andante poco Allegretto</span>{' '}
                <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                  (09:31)
                </span>
              </button>
              <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                In the manner of an intermezzo featuring the woodwind predominately.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleJumpToMovement(1015.5, '3rd mov')}
                className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-center flex-wrap gap-y-1"
                title="Jump to 3rd movement in audio player"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                  aria-label="Movement III"
                >
                  III
                </span>
                <span>Scherzo &ndash; Allegretto Leggiero</span>{' '}
                <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                  (16:55)
                </span>
              </button>
              <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                A scherzo without a trio. Clarinets skip busily along with the main theme.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleJumpToMovement(1227.0, '4th mov')}
                className="font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer text-left font-serif text-lg sm:text-xl flex items-center flex-wrap gap-y-1"
                title="Jump to 4th movement in audio player"
              >
                <span
                  className="inline-flex items-center justify-center min-w-[2.2rem] h-7 px-2 rounded-full bg-gradient-to-b from-amber-50 to-amber-100/90 border border-amber-900/35 text-amber-950 font-serif font-bold text-xs sm:text-sm tracking-wider shadow-2xs mr-2 shrink-0 select-none"
                  aria-label="Movement IV"
                >
                  IV
                </span>
                <span>Andante Lento: Allegro con Maesta</span>{' '}
                <span className="font-mono text-[0.78em] text-amber-900 font-semibold align-baseline ml-1.5">
                  (20:27)
                </span>
              </button>
              <p className="mt-1 text-stone-900 font-normal leading-relaxed m-0">
                The opening is a repeat of the 1st movement opening but now tutti. Material from the 2nd and 3rd movements is also reworked. There&apos;s a definite feel of a Finale in this Allegro.
              </p>
            </div>
          </div>

          {/* Autograph Score Performance Dates Row with Image on Left & Button on Right */}
          <div className="my-6 flex flex-col sm:flex-row items-center justify-start gap-5">
            <figure className="w-full sm:w-auto max-w-sm p-2.5 bg-white border-2 border-stone-300 rounded shadow-xs text-center shrink-0">
              <div
                className="overflow-hidden rounded border border-stone-300 bg-stone-100 cursor-pointer group relative"
                onClick={() => setActiveImageModal(`${import.meta.env.BASE_URL}assets/aistudio/symphony_dates.jpg`)}
                title="Click to enlarge autograph score dates"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/symphony_dates.jpg`}
                  alt="Inside cover of autograph score recording performance dates in Walter Macfarren's hand"
                  className="w-full max-w-[320px] h-auto object-contain mx-auto group-hover:scale-[1.01] transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-stone-900/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-sans">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
              </div>
            </figure>

            <div className="flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={() => setShowDatesPopup(true)}
                className="px-4 py-2 bg-[#FFF8E1] hover:bg-[#FDE8B5] text-stone-900 border border-[#765B37] rounded font-serif text-sm font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#765B37]" />
                <span>see dates</span>
              </button>
            </div>
          </div>

          <p>
            For a relatively &lsquo;minor&rsquo; composer this record of performance was impressive to say the least but certainly not typical. It was even revived after a ten year gap just two years before Macfarren died.
          </p>

          <p>
            The premi&egrave;re of the symphony was in Brighton. Walter in his autobiography recounts an enthusiastic reception.
          </p>

          {/* Contemporary Review Card */}
          <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              On the 5th of February, 1880, my overture, &ldquo;Hero and Leander,&rdquo; was given at the Philharmonic as before mentioned, and my Symphony in B flat was produced at Kuhe&apos;s Brighton Festival on the 24th of the same month, and hence it has been nicknamed &ldquo;The Brighton Symphony.&rdquo;
            </p>
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              Many of the orchestral professors engaged at the Academy were likewise in Mr. Kuhe&apos;s Band, and others, as well as the leading students, volunteered to go down to Brighton, and thus increase the orchestra in support of their conductor, and the occasion was marked by great enthusiasm.
            </p>
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              My dinner-party at the &ldquo;Old Ship&rdquo; (where I was located) was augmented by the arrival of my dear brother G. A. Macfarren, accompanied by his then secretary, the late Windyer Clark, both of whom had travelled down expressly to hear the Symphony, and returned the same night.
            </p>
            <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
              — Walter Macfarren, Memories: An Autobiography (1905)
            </footer>
          </blockquote>

          <p>
            A reviewer from The Sussex Daily News likewise:
          </p>

          <blockquote className="my-8 p-6 sm:p-8 bg-white border-l-4 border-amber-800 border-y border-r border-stone-200 rounded-r shadow-xs space-y-4">
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              &lsquo;One of the prominent features in the concert was the performance by the orchestra of Walter Macfarren&rsquo;s Symphony in B flat, composed expressly for the festival, and conducted by the composer. The talented professor of the Royal Academy has on previous occasions shown his great ability in orchestral writing, several of his latest works having been produced for the first time at Mr Kuhe&rsquo;s Festival.
            </p>
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              The symphony performed yesterday evening enhanced the popularity of the composer, and its hearty reception by the audience must be chronicled as one of the greatest successes of the present festival. Opening with a pleasing introduction, the composition is worked out in the orthodox style. Each movement was warmly applauded; the slow movement was pleasing and effective, replete with melodious beauties, which were finely interpreted by the orchestra. The short but brightly-written scherzo led to a brilliant finale, which again revealed the powers of the composer over the difficulties of orchestration in a work of such magnitude.
            </p>
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              Although the symphony took nearly half an hour in its interpretation, the audience did not appear to tire, and, at its conclusion, the composer was rewarded by prolonged and hearty applause of a most enthusiastic character, compelling him to return and acknowledge the well-deserved plaudits to the performance of his work.&rsquo;
            </p>
            <footer className="mt-4 pt-3 border-t border-stone-200 text-xs font-mono uppercase tracking-widest text-amber-900 font-semibold">
              — The Sussex Daily News (February 1880)
            </footer>
          </blockquote>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 pt-8 border-t border-stone-300 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-serif text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Walter Macfarren Main Article</span>
          </button>
        </div>

        {/* Image Modal */}
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
                alt="Enlarged document leaf"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <div className="mt-3 text-right">
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="px-4 py-1.5 bg-stone-900 text-white text-xs font-serif rounded uppercase font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Performance Dates Popup Dialog */}
        {showDatesPopup && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setShowDatesPopup(false)}
          >
            <div
              className="bg-white border-2 border-[#765B37] rounded-lg max-w-md w-full p-6 shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Performance dates
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDatesPopup(false)}
                  className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="font-serif text-base sm:text-lg text-stone-800 space-y-1.5 leading-relaxed">
                <div>Brighton - February 1880</div>
                <div>Bristol - May 1880</div>
                <div>Covent Garden - August 1880</div>
                <div>St James Hall - March 1882</div>
                <div>Buxton - August &amp; September 1885</div>
                <div>Westminster Orchestral Society - March 1890</div>
                <div>Brixton Choral Society - May 1890</div>
                <div>Edinburgh Orchestral Society - April 1892</div>
                <div>Brixton - June 1902</div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200 text-right">
                <button
                  type="button"
                  onClick={() => setShowDatesPopup(false)}
                  className="px-4 py-1.5 bg-[#FFF8E1] hover:bg-[#FDE8B5] text-stone-900 border border-[#765B37] rounded font-serif text-xs uppercase font-semibold tracking-wider cursor-pointer shadow-2xs"
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
