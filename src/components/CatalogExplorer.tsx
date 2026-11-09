import React, { useState } from 'react';
import { Search, Volume2, BookOpen, Bookmark, BookmarkCheck, Grid, List, Sparkles } from 'lucide-react';
import { Composer, MusicalTheme } from '../types/composer';
import { COMPOSERS_DATA } from '../data/composersData';

interface CatalogExplorerProps {
  onSelectComposer: (composer: Composer) => void;
  onPlayTheme: (theme: MusicalTheme) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (composerId: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({
  onSelectComposer,
  onPlayTheme,
  bookmarkedIds,
  onToggleBookmark,
  searchQuery: externalSearchQuery,
  onSearchChange,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;

  const eras = [
    { id: 'all', label: 'All Eras (1850–1950)' },
    { id: 'mid-victorian', label: 'Mid-Victorian (1850–1879)', match: 'Mid-Victorian' },
    { id: 'golden-age', label: 'Victorian Golden Age (1880–1899)', match: 'Victorian Golden Age' },
    { id: 'edwardian', label: 'Edwardian (1900–1914)', match: 'Edwardian' },
    { id: 'interwar', label: 'Interwar & Beyond (1915–1950)', match: 'Interwar' },
  ];

  const genres = [
    { id: 'all', label: 'All Genres' },
    { id: 'Symphony', label: 'Symphonies' },
    { id: 'Concerto', label: 'Concertos' },
    { id: 'Symphonic Poem', label: 'Symphonic Poems' },
    { id: 'Chamber Music', label: 'Chamber' },
  ];

  const filteredComposers = COMPOSERS_DATA.filter((c) => {
    // Era filter
    if (selectedEra !== 'all') {
      const eraObj = eras.find((e) => e.id === selectedEra);
      if (eraObj?.match && !c.era.includes(eraObj.match)) return false;
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      const hasGenre = c.works.some((w) => w.genre === selectedGenre);
      if (!hasGenre) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const inName = c.name.toLowerCase().includes(query) || c.fullName.toLowerCase().includes(query);
      const inBio = c.shortBio.toLowerCase().includes(query) || c.musicalStyle.toLowerCase().includes(query);
      const inWorks = c.works.some((w) =>
        w.title.toLowerCase().includes(query) || w.summary.toLowerCase().includes(query)
      );
      const inArchive = c.keyArchives.some((a) => a.toLowerCase().includes(query));
      return inName || inBio || inWorks || inArchive;
    }

    return true;
  });

  return (
    <section id="archive" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-serif uppercase tracking-widest text-amber-900 mb-1">
            Archival Compendium · Reconstructed Folios
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Neglected British & European Symphonists
          </h2>
          <p className="font-body text-stone-600 text-sm mt-1 max-w-2xl">
            Browse the catalogue of 19th and early 20th-century composers whose major orchestral 
            manuscripts have been located, catalogued, and typeset from archive collections.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-stone-900 shadow-2xs font-medium'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Grid Gallery"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gallery</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-stone-900 shadow-2xs font-medium'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Archival Table"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catalogue</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mt-6 space-y-4">
        {/* Search bar and genre tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by composer, symphony, key, or manuscript archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 transition-shadow"
            />
          </div>

          {/* Genre interactive buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors cursor-pointer ${
                  selectedGenre === g.id
                    ? 'bg-stone-900 text-stone-50'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Era Segmented controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors cursor-pointer ${
                selectedEra === era.id
                  ? 'bg-amber-900 text-amber-50 shadow-2xs'
                  : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Results Count */}
      <div className="mt-4 flex items-center justify-between text-xs text-stone-500 font-sans">
        <div>
          Showing <span className="font-semibold text-stone-800">{filteredComposers.length}</span> documented masters
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-amber-800 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComposers.map((composer) => {
            const isBookmarked = bookmarkedIds.includes(composer.id);
            const featuredWork = composer.works.find((w) =>
              w.movements?.some((m) => m.hasAudioRealisation)
            ) || composer.works[0];
            const audioMovement = featuredWork?.movements?.find((m) => m.hasAudioRealisation);

            return (
              <article
                key={composer.id}
                className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Visual Header / Portrait */}
                <div className="relative h-56 bg-stone-100 overflow-hidden border-b border-stone-200/80">
                  <img
                    src={composer.portraitUrl}
                    alt={composer.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback container on image error
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle archival label overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(composer.id);
                      }}
                      className="p-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-100 backdrop-blur-xs transition-colors cursor-pointer"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark to research list'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Obscurity ranking indicator */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="px-2.5 py-1 bg-stone-950/80 backdrop-blur-xs text-stone-200 rounded text-[11px] font-sans flex items-center justify-between">
                      <span className="font-serif italic text-amber-200">{composer.obscurityRank}</span>
                      <span className="text-stone-400 font-mono">
                        {composer.birthYear}–{composer.deathYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Zero-Pill unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-1.5">
                      <span>{composer.nationality}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{composer.era.split(' ')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{composer.works.length} Documented Works</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {composer.name}
                    </h3>

                    <p className="font-body text-xs text-stone-600 line-clamp-3 leading-relaxed mt-2">
                      {composer.shortBio}
                    </p>

                    {/* Featured Work highlight */}
                    {featuredWork && (
                      <div className="mt-4 pt-3 border-t border-stone-100 text-xs">
                        <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400 block mb-0.5">
                          Notable Work
                        </span>
                        <div className="font-serif font-semibold text-stone-800 truncate">
                          {featuredWork.title}
                        </div>
                        <div className="text-stone-500 font-mono text-[11px] mt-0.5">
                          {featuredWork.yearComposed} · {featuredWork.genre} · {featuredWork.archiveLocation}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-5 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectComposer(composer)}
                      className="text-xs font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Full Archival Page</span>
                    </button>

                    {audioMovement?.audioTheme ? (
                      <button
                        onClick={() => onPlayTheme(audioMovement.audioTheme!)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-amber-900 hover:bg-amber-950 text-amber-50 transition-colors cursor-pointer shadow-2xs"
                        title="Play synthesised audio realisation"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>Play Audio</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-stone-400 italic font-serif">
                        Score in Archive
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="mt-6 border border-stone-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4EE] border-b border-stone-200 text-stone-600 font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 font-semibold">Composer</th>
                  <th className="p-3.5 font-semibold">Dates</th>
                  <th className="p-3.5 font-semibold">Nationality</th>
                  <th className="p-3.5 font-semibold">Key Masterwork</th>
                  <th className="p-3.5 font-semibold">Archival Vault</th>
                  <th className="p-3.5 font-semibold">Audio</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-sans">
                {filteredComposers.map((composer) => {
                  const leadWork = composer.works[0];
                  const audioMovement = composer.works.flatMap((w) => w.movements || []).find((m) => m?.hasAudioRealisation);
                  const isBookmarked = bookmarkedIds.includes(composer.id);

                  return (
                    <tr
                      key={composer.id}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                      onClick={() => onSelectComposer(composer)}
                    >
                      <td className="p-3.5 font-serif font-bold text-stone-900 text-sm">
                        {composer.fullName}
                      </td>
                      <td className="p-3.5 font-mono text-stone-600 tabular-nums">
                        {composer.birthYear}–{composer.deathYear}
                      </td>
                      <td className="p-3.5 text-stone-600">{composer.nationality}</td>
                      <td className="p-3.5 font-serif">
                        <span className="font-medium text-stone-800">{leadWork?.title}</span>
                      </td>
                      <td className="p-3.5 text-stone-500 font-mono text-[11px]">
                        {composer.keyArchives[0]}
                      </td>
                      <td className="p-3.5">
                        {audioMovement?.audioTheme ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayTheme(audioMovement.audioTheme!);
                            }}
                            className="p-1 px-2 text-[11px] font-medium rounded bg-amber-900 text-amber-100 hover:bg-amber-950 flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3 text-amber-300" />
                            <span>Realisation</span>
                          </button>
                        ) : (
                          <span className="text-stone-400 italic font-serif">Manuscript</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleBookmark(composer.id)}
                          className="p-1 text-stone-400 hover:text-amber-900 transition-colors cursor-pointer"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
