import React, { useState } from 'react';
import { Eye, Volume2, ZoomIn, Info, CheckCircle2, BookOpen } from 'lucide-react';
import { MusicalTheme } from '../types/composer';
import { HARVEY_LOHR_SYMPHONY_3_THEME } from '../data/composersData';

interface ManuscriptViewerProps {
  onPlayTheme: (theme: MusicalTheme) => void;
}

interface AnnotationPoint {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  category: 'Notation' | 'Editorial' | 'Archive Mark' | 'Harmonic';
  description: string;
}

export const ManuscriptViewer: React.FC<ManuscriptViewerProps> = ({ onPlayTheme }) => {
  const [activeAnnotationId, setActiveAnnotationId] = useState<string>('pt-1');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const annotations: AnnotationPoint[] = [
    {
      id: 'pt-1',
      x: 52,
      y: 28,
      title: 'Tempo & Character Heading ("Allegro con brio")',
      category: 'Notation',
      description: 'The composer’s handwritten Italian tempo marking in brown iron-gall ink. The brisk tempo indicator establishes the fiery, symphonic drive required of late-Victorian concert overtures.',
    },
    {
      id: 'pt-2',
      x: 88,
      y: 20,
      title: 'Archival Library Accession Stamp',
      category: 'Archive Mark',
      description: 'Authentic 19th-century library collection stamp confirming acquisition into European institutional archives (Biblioteca Musicale Fond. 1843, N. 492), preserving it through two world wars.',
    },
    {
      id: 'pt-3',
      x: 22,
      y: 48,
      title: 'Violino I Principal Subject Entrance',
      category: 'Harmonic',
      description: 'First violin stave marked with a dynamic forte (f). The descending minor scale motif establishes the primary dramatic argument of the exposition.',
    },
    {
      id: 'pt-4',
      x: 24,
      y: 72,
      title: 'Violino II & Viola Polyphonic Weave',
      category: 'Editorial',
      description: 'Subordinate string lines providing dense contrapuntal resistance rather than mere homophonic harmony. Notice the hairpin crescendo leading into the tutti climax.',
    },
    {
      id: 'pt-5',
      x: 75,
      y: 50,
      title: 'Four-Note Rhythmic Syncopation',
      category: 'Notation',
      description: 'Staccato eighth notes creating rhythmic tension against the steady metric pulse. This passage was reconstructed digitally for our Web Audio synthesizer.',
    },
  ];

  const currentAnnotation = annotations.find((a) => a.id === activeAnnotationId) || annotations[0];

  return (
    <section id="manuscripts" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 mb-8">
        <div>
          <div className="text-xs font-serif uppercase tracking-widest text-amber-900 mb-1">
            Primary Archival Sources · Interactive Exegesis
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Autograph Score & Manuscript Explorer
          </h2>
          <p className="font-body text-stone-600 text-sm mt-1 max-w-2xl">
            Examine high-resolution archival leaves of 19th-century orchestral scores. 
            Click the interactive annotations to study the ink markings, copyist notations, and editorial reconstruction.
          </p>
        </div>

        <button
          onClick={() => onPlayTheme(HARVEY_LOHR_SYMPHONY_3_THEME)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded text-xs font-medium transition-colors shadow-2xs self-start md:self-auto cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Play Synthesised Realisation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Score Viewer Canvas */}
        <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shadow-md flex flex-col">
          {/* Controls bar */}
          <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs text-stone-300">
            <span className="font-serif italic text-amber-200">
              Autograph Orchestral Manuscript: Folio 1 (First Staves)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-400">Click highlighted points to inspect:</span>
              <button
                onClick={() => setZoomLevel(zoomLevel === 1 ? 1.3 : 1)}
                className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <ZoomIn className="w-3 h-3" />
                <span>{zoomLevel === 1 ? '130% Zoom' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Manuscript Surface */}
          <div className="relative overflow-auto max-h-[560px] bg-[#181513] p-4 flex items-center justify-center">
            <div
              className="relative transition-transform duration-300 max-w-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/queens_hall_clean.webp`}
                alt="Autograph 19th century orchestral score manuscript"
                className="rounded shadow-xl w-full h-auto block select-none"
                referrerPolicy="no-referrer"
              />

              {/* Annotation Markers */}
              {annotations.map((pt, idx) => {
                const isActive = pt.id === activeAnnotationId;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActiveAnnotationId(pt.id)}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-400/50 scale-110'
                        : 'bg-stone-900/90 text-amber-300 border border-amber-400/70 hover:scale-110'
                    }`}
                    title={pt.title}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Curatorial Exegesis on Selected Point */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900 border-b border-stone-100 pb-3 mb-4">
              <Info className="w-3.5 h-3.5" />
              <span>Musicological Exegesis</span>
            </div>

            <div className="text-xs font-mono text-stone-400 mb-1">
              Category: {currentAnnotation.category}
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug mb-3">
              {currentAnnotation.title}
            </h3>

            <p className="font-body text-sm text-stone-700 leading-relaxed">
              {currentAnnotation.description}
            </p>

            {/* Quick point list buttons */}
            <div className="mt-6 pt-4 border-t border-stone-100 space-y-1.5">
              <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400 block mb-1">
                All Inspected Markers
              </span>
              {annotations.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActiveAnnotationId(a.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    a.id === activeAnnotationId
                      ? 'bg-amber-50 text-amber-950 font-semibold border border-amber-200'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="truncate">
                    {i + 1}. {a.title}
                  </span>
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      a.id === activeAnnotationId ? 'text-amber-800' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Archival transcription notes */}
          <div className="bg-[#F7F4EE] border border-stone-200 rounded p-5 text-xs text-stone-700 space-y-2">
            <span className="font-serif font-bold text-stone-900 block">
              Editorial Typesetting Standards
            </span>
            <p className="font-body leading-relaxed text-stone-600">
              Autograph manuscripts are preserved at temperature-controlled archives (British Library Add MSS, Royal Academy of Music, SLUB Dresden). Modern realizations verify pitch notation, transpositions, and dynamic balance to generate clean digital scores for future orchestral performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
