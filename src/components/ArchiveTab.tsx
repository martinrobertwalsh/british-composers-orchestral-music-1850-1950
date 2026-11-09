import React, { useState } from 'react';
import { FeaturedPost } from './FeaturedPost';
import { TobiasMatthayPost } from './TobiasMatthayPost';
import { BookOpen, ArrowLeft, Search, X } from 'lucide-react';

interface ArchiveArticle {
  id: 'macfarren' | 'matthay';
  name: string;
  dates: string;
  image: string;
  quote: string;
  notableWork: string;
  tags: string[];
}

const ARCHIVE_ARTICLES: ArchiveArticle[] = [
  {
    id: 'macfarren',
    name: 'Walter Macfarren',
    dates: '1826–1905',
    image: `${import.meta.env.BASE_URL}assets/aistudio/photo_200faca6.jpg`,
    quote: '“A symphony missing for over a hundred years, finally turns up”',
    notableWork: 'Symphony in B flat (1879)',
    tags: ['Walter Macfarren', 'Symphony in Bb', 'Royal Academy of Music', 'Philharmonic']
  },
  {
    id: 'matthay',
    name: 'Tobias Matthay',
    dates: '1858–1945',
    image: `${import.meta.env.BASE_URL}assets/aistudio/tobias_matthay_portrait.jpg`,
    quote: '“Master of touch whose symphonic voice fell silent”',
    notableWork: 'In May — Tone Poem (1883)',
    tags: ['Tobias Matthay', 'In May', 'Tone Poem', 'Bournemouth', 'Dan Godfrey', 'Piano Pedagogy', 'Royal Academy']
  }
];

export const ArchiveTab: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<'macfarren' | 'matthay' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredArticles = ARCHIVE_ARTICLES.filter((article) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      article.name.toLowerCase().includes(q) ||
      article.notableWork.toLowerCase().includes(q) ||
      article.quote.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  if (selectedArticleId === 'macfarren') {
    return (
      <div className="space-y-4">
        {/* Back to Archive Cards bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Archive Cards</span>
          </button>
        </div>

        <FeaturedPost />
      </div>
    );
  }

  if (selectedArticleId === 'matthay') {
    return (
      <div className="space-y-4">
        {/* Back to Archive Cards bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Archive Cards</span>
          </button>
        </div>

        <TobiasMatthayPost
          onBack={() => {
            setSelectedArticleId(null);
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          backLabel="Archive"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="border-b border-stone-200/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-semibold block mb-1">
            ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Previous articles
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-1">
            Archival records, manuscripts, and living sound realisations.
          </p>
        </div>

        {/* Counter */}
        <div className="text-right">
          <span className="font-serif text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-500">
            Showing {filteredArticles.length} Previous {filteredArticles.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-lg p-3 sm:p-4 shadow-2xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search previous articles by composer, work, or keyword..."
            className="w-full pl-9 pr-9 py-2 bg-stone-50 border border-stone-200 rounded text-xs sm:text-sm font-sans text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Composer Cards Grid - Fully clickable Archive cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => {
              setSelectedArticleId(article.id);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
          >
            {/* Portrait Container - cleanly proportioned, left justified, clickable */}
            <div className="p-5 bg-stone-100/70 border-b border-stone-200/80 flex justify-start items-center">
              <div
                onClick={() => {
                  setSelectedArticleId(article.id);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="w-36 sm:w-40 aspect-3/4 overflow-hidden rounded border border-stone-300 group-hover:border-amber-800 bg-white shadow-xs cursor-pointer transition-colors duration-200 group/portrait"
                title={`Open archival article on ${article.name}`}
              >
                <img
                  src={article.image}
                  alt={`${article.name} (${article.dates})`}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover/portrait:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Name title with dates */}
                <h3
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer"
                >
                  {article.name} ({article.dates})
                </h3>

                <p className="font-times italic text-sm sm:text-base text-amber-950 leading-relaxed mt-2.5">
                  {article.quote}
                </p>

                {/* Notable Work highlight */}
                <div className="mt-4 pt-3 border-t border-stone-100 text-xs">
                  <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400 block mb-0.5">
                    Notable Work
                  </span>
                  <div className="font-serif font-semibold text-stone-800 text-sm">
                    {article.notableWork}
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-5 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticleId(article.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-900" />
                  <span>Full Archival Page</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
