import React from 'react';
import { X, Volume2, Bookmark, BookmarkCheck, Library, Music, ArrowRight } from 'lucide-react';
import { Composer, MusicalTheme } from '../types/composer';

interface ComposerModalProps {
  composer: Composer | null;
  onClose: () => void;
  onPlayTheme: (theme: MusicalTheme) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ComposerModal: React.FC<ComposerModalProps> = ({
  composer,
  onClose,
  onPlayTheme,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!composer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] border border-stone-300 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900">
        {/* Sticky top close bar */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-sm px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900">
            <span>Archival Page</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{composer.obscurityRank}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(composer.id)}
              className="p-1.5 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors flex items-center gap-1.5 text-xs font-sans cursor-pointer"
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Saved in Notebook</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Bookmark</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
              title="Close page"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Profile Header: Portrait + Core Identity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Portrait column */}
            <div className="md:col-span-5">
              <div className="border border-stone-300 rounded bg-stone-100 p-2 shadow-2xs">
                <img
                  src={composer.portraitUrl}
                  alt={composer.fullName}
                  className="w-full h-72 sm:h-80 object-cover rounded"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <p className="text-[11px] font-serif italic text-stone-600 mt-2 px-1 text-center">
                  {composer.portraitCaption}
                </p>
              </div>
            </div>

            {/* Accession Details & Biographical Header */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                  {composer.fullName}
                </h2>

                <div className="flex items-center gap-2 text-sm text-stone-600 font-mono mt-1 mb-4 tabular-nums">
                  <span>{composer.birthYear}–{composer.deathYear}</span>
                  <span>·</span>
                  <span>{composer.nationality}</span>
                </div>

                <p className="font-body text-sm sm:text-base text-stone-700 leading-relaxed mb-6">
                  {composer.detailedBiography}
                </p>
              </div>

              {/* Museum Accession Metadata Grid (Pattern B) */}
              <div className="border-t border-stone-200 pt-4">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <dt className="text-stone-400 font-serif uppercase tracking-wider text-[10px]">Era Designation</dt>
                    <dd className="font-medium text-stone-800 font-sans">{composer.era}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-400 font-serif uppercase tracking-wider text-[10px]">Musical Classification</dt>
                    <dd className="font-medium text-stone-800 font-sans">{composer.obscurityRank}</dd>
                  </div>
                  <div className="col-span-2 mt-1">
                    <dt className="text-stone-400 font-serif uppercase tracking-wider text-[10px]">Key Archival Repositories</dt>
                    <dd className="font-mono text-stone-700 text-[11px] mt-0.5">
                      {composer.keyArchives.join(' · ')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Critical Inquiry: Why This Composer Was Forgotten */}
          <div className="bg-[#F7F4EE] border border-stone-200 rounded-lg p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900">
              <Library className="w-3.5 h-3.5" />
              <span>Historical Musicology Inquiry</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Why {composer.name} Was Forgotten
            </h3>
            <p className="font-body text-sm text-stone-700 leading-relaxed">
              {composer.whyForgotten}
            </p>

            <div className="pt-2 text-xs text-stone-600 font-sans flex flex-wrap gap-2">
              <span className="font-semibold text-stone-700">Contemporaries:</span>
              <span>{composer.famousContemporaries.join(', ')}</span>
            </div>
          </div>

          {/* Historical Period Review Quote */}
          {composer.quote && (
            <div className="border-y border-stone-200 py-4 text-center px-4">
              <p className="font-serif italic text-base sm:text-lg text-stone-800 max-w-2xl mx-auto">
                &ldquo;{composer.quote.text}&rdquo;
              </p>
              <span className="block text-xs font-sans text-stone-500 mt-2">
                — {composer.quote.source} {composer.quote.year && `(${composer.quote.year})`}
              </span>
            </div>
          )}

          {/* Complete Works & Movements Catalog */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div>
                <span className="text-xs font-serif uppercase tracking-widest text-amber-900 block">
                  Archive Catalog
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Documented Orchestral & Concert Works
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              {composer.works.map((work) => (
                <div
                  key={work.id}
                  className="border border-stone-200 rounded-lg bg-white p-5 shadow-2xs"
                >
                  {/* Work header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-stone-100">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {work.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mt-0.5">
                        <span>Composed {work.yearComposed}</span>
                        <span>·</span>
                        <span>{work.genre}</span>
                        <span>·</span>
                        <span>{work.durationApprox}</span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 self-start sm:self-auto">
                      {work.catalogStatus}
                    </div>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                    {work.summary}
                  </p>

                  <div className="mt-2 text-xs text-stone-500 font-mono">
                    <span className="font-sans text-stone-400">Scoring:</span> {work.instrumentation}
                  </div>

                  {/* Movements breakdown */}
                  {work.movements && work.movements.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                      <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400 block mb-1">
                        Movements Breakdown
                      </span>
                      {work.movements.map((m) => (
                        <div
                          key={m.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded bg-[#FBF9F5] border border-stone-200/70 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-serif font-bold text-stone-900 mr-2">
                              {m.number}.
                            </span>
                            <span className="font-serif font-semibold text-stone-800">
                              {m.tempoHeading}
                            </span>
                            <span className="text-stone-500 font-mono ml-2">
                              ({m.key} · {m.durationEst})
                            </span>
                            <p className="font-body text-[11px] text-stone-600 mt-0.5 line-clamp-1">
                              {m.notes}
                            </p>
                          </div>

                          {m.hasAudioRealisation && m.audioTheme && (
                            <button
                              onClick={() => onPlayTheme(m.audioTheme!)}
                              className="px-3 py-1.5 rounded bg-amber-900 hover:bg-amber-950 text-amber-50 font-medium text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                              <span>Play Movement</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-stone-400 font-mono flex items-center justify-between">
                    <span>Manuscript Location: {work.archiveLocation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F7F4EE] px-6 py-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-sans">
          <span>Forgotten Composers (1850–1950) Archive Project</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-stone-100 rounded hover:bg-stone-800 transition-colors font-medium cursor-pointer"
          >
            Close Page
          </button>
        </div>
      </div>
    </div>
  );
};
