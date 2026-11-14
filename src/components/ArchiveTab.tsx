import React, { useState } from 'react';
import { FeaturedPost } from './FeaturedPost';
import { TobiasMatthayPost } from './TobiasMatthayPost';
import { PercyPittPost } from './PercyPittPost';
import { CardsCarousel, CarouselCard } from './CardsCarousel';

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

  // Convert to CarouselCard items
  const archiveCards: CarouselCard[] = ARCHIVE_ARTICLES.map((a) => ({
    ...a,
    category: 'archive'
  }));

  // Selected Article Views
  if (selectedArticleId === 'macfarren') {
    return <FeaturedPost />;
  }

  if (selectedArticleId === 'matthay') {
    return <TobiasMatthayPost />;
  }

  if (selectedArticleId === 'pitt') {
    return <PercyPittPost />;
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
        largeControls={true}
        onSelectCard={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
