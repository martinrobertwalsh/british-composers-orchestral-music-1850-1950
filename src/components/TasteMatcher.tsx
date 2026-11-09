import React, { useState } from 'react';
import { Sparkles, Volume2, BookOpen, Music, ArrowRight, Check } from 'lucide-react';
import { Composer, MusicalTheme } from '../types/composer';
import { COMPOSERS_DATA, TASTE_COMPARISONS } from '../data/composersData';

interface TasteMatcherProps {
  onSelectComposer: (composer: Composer) => void;
  onPlayTheme: (theme: MusicalTheme) => void;
}

export const TasteMatcher: React.FC<TasteMatcherProps> = ({
  onSelectComposer,
  onPlayTheme,
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(TASTE_COMPARISONS[0].id);
  const [customSearch, setCustomSearch] = useState<string>('');

  const currentMatch = TASTE_COMPARISONS.find((m) => m.id === selectedMatchId) || TASTE_COMPARISONS[0];
  const matchedComposer = COMPOSERS_DATA.find((c) => c.id === currentMatch.recommendedComposerId);
  const matchedWork = matchedComposer?.works.find((w) => w.id === currentMatch.recommendedWorkId);
  const audioMovement = matchedWork?.movements?.find((m) => m.hasAudioRealisation);

  return (
    <section id="matcher" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-xs font-serif uppercase tracking-widest text-amber-900 mb-1">
          Acoustic & Stylistic Bridge · Curatorial Matcher
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Find Your Forgotten Counterpart
        </h2>
        <p className="font-body text-stone-600 text-sm sm:text-base mt-2">
          Select a beloved 19th or early 20th-century orchestral masterwork you already know and revere. 
          Our musicological index will pair you with its forgotten British or Continental contemporary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive list of famous masterworks */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-serif uppercase tracking-wider text-stone-400 block px-1 mb-2">
            Select Your Classical Preference
          </span>
          {TASTE_COMPARISONS.map((match) => {
            const isSelected = match.id === selectedMatchId;
            return (
              <button
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-950 text-amber-50 border-amber-800 shadow-md ring-1 ring-amber-700/40'
                    : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-mono mb-0.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}>
                    If you love:
                  </div>
                  <div className="font-serif font-bold text-base sm:text-lg">
                    {match.famousWork}
                  </div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                    by {match.famousComposer}
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-stone-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: The Archival Revelation Card */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-lg p-6 sm:p-8 shadow-xs">
          {matchedComposer && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900 border-b border-stone-100 pb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curatorial Discovery Recommendation</span>
              </div>

              {/* Matched composer headline */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-400 font-mono">You will be astonished by:</span>
                  <h3 className="font-serif text-3xl font-bold text-stone-900 mt-0.5">
                    {matchedComposer.fullName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mt-1">
                    <span>{matchedComposer.birthYear}–{matchedComposer.deathYear}</span>
                    <span>·</span>
                    <span>{matchedComposer.nationality}</span>
                    <span>·</span>
                    <span className="font-serif italic text-amber-900">{matchedComposer.obscurityRank}</span>
                  </div>
                </div>

                {matchedComposer.portraitUrl && (
                  <img
                    src={matchedComposer.portraitUrl}
                    alt={matchedComposer.name}
                    className="w-16 h-16 rounded-full object-cover border border-stone-300 shrink-0 shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* The Curatorial Rationale */}
              <div className="bg-[#FBF9F5] p-4 sm:p-5 rounded border border-stone-200/80">
                <span className="text-[11px] font-serif uppercase tracking-wider text-amber-900 block mb-1">
                  Why They Resonate Together
                </span>
                <p className="font-body text-sm text-stone-700 leading-relaxed">
                  {currentMatch.matchReason}
                </p>
              </div>

              {/* Recommended Work Feature Box */}
              {matchedWork && (
                <div className="border border-stone-200 rounded p-4 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-wider text-stone-400">
                        Recommended Score Realisation
                      </span>
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {matchedWork.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-stone-500">
                      {matchedWork.yearComposed} · {matchedWork.durationApprox}
                    </span>
                  </div>

                  <p className="font-body text-xs text-stone-600 mt-2 leading-relaxed">
                    {matchedWork.summary}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    {audioMovement?.audioTheme ? (
                      <button
                        onClick={() => onPlayTheme(audioMovement.audioTheme!)}
                        className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded text-xs font-medium flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-amber-300" />
                        <span>Listen to Reconstructed Theme ({audioMovement.tempoHeading})</span>
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 italic font-serif">
                        Archival Manuscript Only
                      </span>
                    )}

                    <button
                      onClick={() => onSelectComposer(matchedComposer)}
                      className="px-3 py-2 text-stone-800 hover:text-amber-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Explore {matchedComposer.name}’s Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
