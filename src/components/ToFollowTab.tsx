import React, { useState } from 'react';
import { ArthurHerveyPost } from './ArthurHerveyPost';
import { NormanONeillPost } from './NormanONeillPost';
import { PercyGodfreyPost } from './PercyGodfreyPost';
import { ROMorrisPost } from './ROMorrisPost';
import { CunninghamWoodsPost } from './CunninghamWoodsPost';
import { BookOpen, ArrowLeft, Search, X } from 'lucide-react';
import { trackPage } from '../lib/analytics';

interface ToFollowArticle {
  id: 'arthur-hervey' | 'oneill' | 'godfrey' | 'morris' | 'cunningham-woods';
  name: string;
  dates: string;
  image: string;
  quote: string;
  notableWork: string;
  tags: string[];
}

const TO_FOLLOW_ARTICLES: ToFollowArticle[] = [
  {
    id: 'arthur-hervey',
    name: 'Arthur Hervey',
    dates: '1855–1922',
    image: `${import.meta.env.BASE_URL}assets/aistudio/arthur_hervey_portrait.jpg`,
    quote: '“Writer, critic, promoter and composer”',
    notableWork: 'Summer — Tone Poem (1907)',
    tags: ['Arthur Hervey', 'Summer', 'Tone Poem', 'Orchestra', 'Cardiff Festival']
  },
  {
    id: 'oneill',
    name: "Norman O’Neill",
    dates: '1875–1934',
    image: `${import.meta.env.BASE_URL}assets/aistudio/norman_oneill_portrait.jpg`,
    quote: '“Music from behind the curtain”',
    notableWork: 'In Autumn — Tone Poem (1901)',
    tags: ["Norman O'Neill", 'Norman O’Neill', 'In Autumn', 'Tone Poem', 'Frankfurt Group', "Queen's Hall", 'Henry Wood']
  },
  {
    id: 'godfrey',
    name: 'Percy Godfrey',
    dates: '1859–1945',
    image: `${import.meta.env.BASE_URL}assets/aistudio/percy_godfrey_portrait.jpg`,
    quote: '“From prizewinner to obscurity”',
    notableWork: 'Coronation Prize-March (1902)',
    tags: ['Percy Godfrey', 'Coronation March', 'Worshipful Company of Musicians', 'Canterbury', 'Edward VII', 'Dan Godfrey']
  },
  {
    id: 'morris',
    name: 'R. O. Morris',
    dates: '1886–1948',
    image: `${import.meta.env.BASE_URL}assets/aistudio/ro_morris_portrait.jpg`,
    quote: '“The quiet composer behind the great teacher”',
    notableWork: 'Sinfonia in C major (A Little Symphony) (1928)',
    tags: ['R. O. Morris', 'Reginald Owen Morris', 'Sinfonia in C major', 'A Little Symphony', 'Arthur Bliss', 'Adrian Boult', 'Howard Ferguson', 'Gerald Finzi', 'Counterpoint']
  },
  {
    id: 'cunningham-woods',
    name: 'Francis Cunningham Woods',
    dates: '1862–1929',
    image: `${import.meta.env.BASE_URL}assets/aistudio/cunningham_woods_portrait.jpg`,
    quote: '“From the organ loft to a small village in Norfolk”',
    notableWork: 'The Gressenhall Suite for strings (1915)',
    tags: ['Francis Cunningham Woods', 'Cunningham Woods', 'The Gressenhall Suite', 'Suite in F major', 'The Village Organist', 'John Stainer', 'Arthur Sullivan', 'Highgate School', 'Oxford']
  }
];

export const ToFollowTab: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<'arthur-hervey' | 'oneill' | 'godfrey' | 'morris' | 'cunningham-woods' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const openArticle = (article: ToFollowArticle) => {
    setSelectedArticleId(article.id);
    trackPage(`/articles/${article.id}`, `${article.name} — Forgotten Composers`);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const filteredArticles = TO_FOLLOW_ARTICLES.filter((article) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      article.name.toLowerCase().includes(q) ||
      article.notableWork.toLowerCase().includes(q) ||
      article.quote.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  if (selectedArticleId === 'arthur-hervey') {
    return (
      <div className="space-y-4">
        {/* Back to To Follow Cards bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to To Follow</span>
          </button>
        </div>

        <ArthurHerveyPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }

  if (selectedArticleId === 'oneill') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to To Follow</span>
          </button>
        </div>

        <NormanONeillPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }

  if (selectedArticleId === 'godfrey') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to To Follow</span>
          </button>
        </div>

        <PercyGodfreyPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }

  if (selectedArticleId === 'morris') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to To Follow</span>
          </button>
        </div>

        <ROMorrisPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }

  if (selectedArticleId === 'cunningham-woods') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to To Follow</span>
          </button>
        </div>

        <CunninghamWoodsPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar matching Archive tab format */}
      <div className="border-b border-stone-200/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-semibold block mb-1">
            TO FOLLOW
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Articles to follow
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-1">
            Archival records, manuscripts, and living sound realisations in preparation.
          </p>
        </div>

        {/* Counter */}
        <div className="text-right">
          <span className="font-serif text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-500">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} to Follow
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
            placeholder="Search articles to follow by composer, work, or keyword..."
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

      {/* Composer Cards Grid matching Archive format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col group"
          >
            {/* Portrait Container - cleanly proportioned photo on left with TO FOLLOW stamp to right of photo */}
            <div className="p-5 bg-stone-100/70 border-b border-stone-200/80 flex items-center justify-between gap-4">
              {/* Photo */}
              <div className="w-36 sm:w-40 aspect-3/4 overflow-hidden rounded border border-stone-300 bg-white shadow-xs shrink-0 transition-all duration-200">
                <img
                  src={article.image}
                  alt={`${article.name} (${article.dates})`}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105"
                />
              </div>

              {/* TO FOLLOW stamp to the right of photo */}
              <div className="flex-1 flex items-center justify-center p-2">
                <div className="transform -rotate-7 select-none">
                  <div className="border border-stone-700/80 p-[2px] rounded-xs bg-stone-50/70 shadow-2xs">
                    <div className="border border-stone-700/80 px-3 py-1.5 text-stone-800 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase text-center">
                      TO FOLLOW
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Name title with dates */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
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
                  onClick={() => {
                    openArticle(article);
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
