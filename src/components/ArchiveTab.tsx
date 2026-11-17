import React, { useState, useEffect, useRef } from 'react';
import { FeaturedPost } from './FeaturedPost';
import { TobiasMatthayPost } from './TobiasMatthayPost';
import { CunninghamWoodsPost } from './CunninghamWoodsPost';
import { WilliamFenneyPost } from './WilliamFenneyPost';
import { WilliamSpeerPost } from './WilliamSpeerPost';
import { CardsCarousel, CarouselCard } from './CardsCarousel';
import { ArrowLeft } from 'lucide-react';
import { trackPage } from '../lib/analytics';

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
    image: `${import.meta.env.BASE_URL}assets/aistudio/photo_200faca6.webp`,
    quote: '“A symphony missing for over a hundred years, finally turns up”',
    notableWork: 'Symphony in B flat (1879)',
    tags: ['Walter Macfarren', 'Symphony in Bb', 'Royal Academy of Music', 'Philharmonic']
  },
  {
    id: 'matthay',
    name: 'Tobias Matthay',
    dates: '1858–1945',
    image: `${import.meta.env.BASE_URL}assets/aistudio/tobias_matthay_portrait.webp`,
    quote: '“Orchestral secrets from a master of the piano”',
    notableWork: 'In May — Tone Poem (1883)',
    tags: ['Tobias Matthay', 'In May', 'Tone Poem', 'Bournemouth', 'Dan Godfrey', 'Piano Pedagogy', 'Royal Academy']
  },
  {
    id: 'cunningham-woods',
    name: 'Francis Cunningham Woods',
    dates: '1862–1929',
    image: `${import.meta.env.BASE_URL}assets/aistudio/cunningham_woods_portrait.webp`,
    quote: '“From the organ loft to a small village in Norfolk”',
    notableWork: 'The Gressenhall Suite for strings (1915)',
    tags: [
      'Francis Cunningham Woods',
      'The Gressenhall Suite',
      'Highgate School',
      'The Village Organist',
      'Blenheim Palace',
      'Exeter College Oxford',
      'John Stainer',
      'Arthur Sullivan',
      'Ebenezer Prout'
    ]
  },
  {
    id: 'fenney',
    name: 'William Fenney',
    dates: '1891–1957',
    image: `${import.meta.env.BASE_URL}assets/aistudio/william_fenney_portrait.webp`,
    quote: '“Bright in colour and sad in feeling”',
    notableWork: 'Pastoral for Small Orchestra (1916)',
    tags: [
      'William Fenney',
      'William J. Fenney',
      'Pastoral for Small Orchestra',
      'In Shadow',
      'Dawn',
      'Tragic Poem',
      'Granville Bantock',
      'Handsworth',
      'Birmingham',
      'Bournemouth',
      'Dan Godfrey',
      'Joseph Holbrooke'
    ]
  },
  {
    id: 'speer',
    name: 'William Henry Speer',
    dates: '1863–1937',
    image: `${import.meta.env.BASE_URL}assets/aistudio/speer_portrait_restored.webp`,
    quote: '“In the shadow of the Malverns and Elgar”',
    notableWork: 'Rhapsody in E♭ (1898) · Nocturne for strings (1907)',
    tags: [
      'William Henry Speer',
      'Rhapsody in Eb',
      'Nocturne for strings',
      'Malvern',
      'Elgar',
      'Charles Villiers Stanford',
      'Trinity College Cambridge',
      'Bournemouth',
      'Dan Godfrey'
    ]
  }
];

export interface ArchiveTabProps {
  initialArticleId?: string | null;
}

export const ArchiveTab: React.FC<ArchiveTabProps> = ({ initialArticleId = null }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleId);
  const lastTrackedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedArticleId) {
      lastTrackedIdRef.current = null;
      return;
    }
    if (lastTrackedIdRef.current === selectedArticleId) return;
    lastTrackedIdRef.current = selectedArticleId;
    const article = ARCHIVE_ARTICLES.find((a) => a.id === selectedArticleId);
    const title = article
      ? `${article.name} (${article.dates}) — Forgotten Composers`
      : `${selectedArticleId} — Forgotten Composers`;
    trackPage(`/archive/${selectedArticleId}`, title);
  }, [selectedArticleId]);

  // Convert to CarouselCard items
  const archiveCards: CarouselCard[] = ARCHIVE_ARTICLES.map((a) => ({
    ...a,
    category: 'archive'
  }));

  const handleBackToCarousel = () => {
    setSelectedArticleId(null);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Selected Article Views
  if (selectedArticleId === 'macfarren') {
    return <FeaturedPost />;
  }

  if (selectedArticleId === 'matthay') {
    return <TobiasMatthayPost />;
  }

  if (selectedArticleId === 'cunningham-woods') {
    return <CunninghamWoodsPost onBack={handleBackToCarousel} />;
  }

  if (selectedArticleId === 'fenney') {
    return <WilliamFenneyPost />;
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



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar: Centred title on the page */}
      <div className="border-b border-stone-200/80 pb-4 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-amber-900">
          ARCHIVE
        </h2>
      </div>

      {/* Scrolling Carousel with archive cards */}
      <CardsCarousel
        cards={archiveCards}
        centerControls={true}
        onSelectCard={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
