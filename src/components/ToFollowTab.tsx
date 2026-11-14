import { trackPage } from '../lib/analytics';
import React, { useState, useEffect } from 'react';
import { NormanONeillPost } from './NormanONeillPost';
import { PercyGodfreyPost } from './PercyGodfreyPost';
import { ROMorrisPost } from './ROMorrisPost';
import { CunninghamWoodsPost } from './CunninghamWoodsPost';
import { WilliamSpeerPost } from './WilliamSpeerPost';
import { ArthurHerveyPost } from './ArthurHerveyPost';
import { WilliamFenneyPost } from './WilliamFenneyPost';
import { PercySherwoodPost } from './PercySherwoodPost';
import { CardsCarousel, CarouselCard } from './CardsCarousel';
import { ArrowLeft } from 'lucide-react';

export interface ToFollowArticle {
  id: string;
  name: string;
  dates: string;
  image: string;
  quote: string;
  notableWork: string;
  tags: string[];
}

export const TO_FOLLOW_ARTICLES: ToFollowArticle[] = [
  {
    id: 'hervey',
    name: 'Arthur Hervey',
    dates: '1855–1922',
    image: `${import.meta.env.BASE_URL}assets/aistudio/arthur_hervey_portrait.jpg`,
    quote: '“From the critic’s desk to the Queen’s Hall rostrum”',
    notableWork: 'Tone Poem: In the East (1904)',
    tags: [
      'Arthur Hervey',
      'In the East',
      'Tone Poem',
      'On the Heights',
      'Cardiff Festival',
      'The Morning Post',
      "Queen's Hall"
    ]
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
  },
  {
    id: 'fenney',
    name: 'William Fenney',
    dates: '1891–1957',
    image: `${import.meta.env.BASE_URL}assets/aistudio/fenney_in_shadow_score_flat.jpg`,
    quote: '“Bright in colour and sad in feeling”',
    notableWork: 'Pastoral for Small Orchestra (1917)',
    tags: [
      'William Fenney',
      'William J. Fenney',
      'Pastoral for Small Orchestra',
      'In Shadow',
      'Nineveh',
      'Granville Bantock',
      'Handsworth',
      'Birmingham',
      'Bournemouth',
      'Dan Godfrey',
      'Joseph Holbrooke'
    ]
  },
  {
    id: 'percy-sherwood',
    name: 'Percy Sherwood',
    dates: '1866–1939',
    image: `${import.meta.env.BASE_URL}assets/aistudio/photo2_199f64f0.jpg`,
    quote: '“A tale of two cities and three symphonies”',
    notableWork: '2nd Symphony (Symphony No. 2 in G major, 1905)',
    tags: [
      'Percy Sherwood',
      '2nd Symphony',
      'Symphony No. 2',
      'Dresden',
      'Mendelssohn Prize',
      'Felix Draeseke',
      'SLUB Dresden',
      'Piano Concerto'
    ]
  }
];

export interface ToFollowTabProps {
  initialArticleId?: string | null;
}

export const ToFollowTab: React.FC<ToFollowTabProps> = ({ initialArticleId = null }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleId);

  useEffect(() => {
    const article = TO_FOLLOW_ARTICLES.find((item) => item.id === selectedArticleId);
    if (article) trackPage('/articles/' + article.id, article.name + ' — Forgotten Composers');
    else trackPage('/to-follow', 'To Follow');
  }, [selectedArticleId]);
  // Convert to CarouselCard items
  const toFollowCards: CarouselCard[] = TO_FOLLOW_ARTICLES.map((a) => ({
    ...a,
    category: 'to-follow'
  }));

  const handleBackToCarousel = () => {
    setSelectedArticleId(null);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Selected Article Views
  if (selectedArticleId === 'oneill') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <NormanONeillPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'godfrey') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <PercyGodfreyPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'morris') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <ROMorrisPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'cunningham-woods') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <CunninghamWoodsPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'hervey') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <ArthurHerveyPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'speer') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <WilliamSpeerPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'fenney') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <WilliamFenneyPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  if (selectedArticleId === 'percy-sherwood') {
    return (
      <div className="space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <button
            onClick={handleBackToCarousel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded font-serif text-sm font-semibold transition-colors cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-900" />
            <span>Back to Cards Carousel</span>
          </button>
        </div>
        <PercySherwoodPost onBack={handleBackToCarousel} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar: Centred title on the page */}
      <div className="border-b border-stone-200/80 pb-4 text-center">
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-amber-900">
          TO FOLLOW
        </h2>
      </div>

      {/* Scrolling Carousel with to-follow cards with centred controls */}
      <CardsCarousel
        cards={toFollowCards}
        centerControls={true}
      />
    </div>
  );
};
