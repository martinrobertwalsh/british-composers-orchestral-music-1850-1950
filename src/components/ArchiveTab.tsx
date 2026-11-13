import React, { useState } from 'react';
import { FeaturedPost } from './FeaturedPost';
import { TobiasMatthayPost } from './TobiasMatthayPost';
import { PercyPittPost } from './PercyPittPost';
import { CardsCarousel, CarouselCard } from './CardsCarousel';
import { ArrowLeft, Search, X } from 'lucide-react';

export interface ArchiveArticle {
  id: string;
  name: string;
  dates: string;
  image: string;
  quote: string;
  notableWork: string;
  tags: string[];
}

export const ARCHIVE_ARTICLES: ArchiveArticle[] = [
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
    quote: '“Orchestral secrets from a master of the piano”',
    notableWork: 'In May — Tone Poem (1883)',
    tags: ['Tobias Matthay', 'In May', 'Tone Poem', 'Bournemouth', 'Dan Godfrey', 'Piano Pedagogy', 'Royal Academy']
  },
  {
    id: 'pitt',
    name: 'Percy Pitt',
    dates: '1869–1932',
    image: `${import.meta.env.BASE_URL}assets/aistudio/percy_pitt_sharp.jpg`,
    quote: '“A life on the podium, a composer in the shadows”',
    notableWork: 'Coronation March (1897)',
    tags: ['Percy Pitt', 'Coronation March', 'Queen\'s Hall', 'Covent Garden', 'BBC Music Director', 'Promenade Concerts']
  }
];

export interface ArchiveTabProps {
  initialArticleId?: string | null;
}

export const ArchiveTab: React.FC<ArchiveTabProps> = ({ initialArticleId = null }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleId);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Convert to CarouselCard items
  const archiveCards: CarouselCard[] = ARCHIVE_ARTICLES.map((a) => ({
    ...a,
    category: 'archive'
  }));

  // Filter by search term
  const filteredArticles = archiveCards.filter((article) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      article.name.toLowerCase().includes(q) ||
      article.notableWork.toLowerCase().includes(q) ||
      article.quote.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  // Selected Article Views
  if (selectedArticleId === 'macfarren') {
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
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <FeaturedPost />
      </div>
    );
  }

  if (selectedArticleId === 'matthay') {
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
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <TobiasMatthayPost
          onBack={() => {
            setSelectedArticleId(null);
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          backLabel="Cards"
        />
      </div>
    );
  }

  if (selectedArticleId === 'pitt') {
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
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <PercyPittPost onBack={() => setSelectedArticleId(null)} />
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="border-b border-stone-200/80 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-amber-900">
          ARCHIVE
        </h2>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-lg p-3 sm:p-4 shadow-2xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search archive by composer, work, or keyword..."
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

      {/* Scrolling Carousel with archive cards */}
      <CardsCarousel
        cards={filteredArticles}
        onSelectCard={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
