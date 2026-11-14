import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export interface CarouselCard {
  id: string;
  name: string;
  dates: string;
  image: string;
  quote: string;
  notableWork: string;
  category: 'archive' | 'to-follow';
  tags: string[];
}

interface CardsCarouselProps {
  cards: CarouselCard[];
  onSelectCard?: (id: string) => void;
  centerControls?: boolean;
}

export const CardsCarousel: React.FC<CardsCarouselProps> = ({
  cards,
  onSelectCard,
  centerControls = false
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Drag tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftPosRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Accurately determine which card is closest to the left edge of the visible carousel
  const updateCurrentIndex = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const articles = container.querySelectorAll<HTMLElement>('article');
    if (articles.length === 0) return;

    const currentScroll = container.scrollLeft;
    let closestIdx = 0;
    let minDistance = Infinity;

    articles.forEach((art, idx) => {
      const artLeft = art.offsetLeft - container.offsetLeft;
      const distance = Math.abs(artLeft - currentScroll);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setCurrentIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      updateCurrentIndex();
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial calculation after layout
    const timer = setTimeout(updateCurrentIndex, 100);

    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateCurrentIndex, cards.length]);

  // Window-level mouseup cleanup to avoid sticking if mouse leaves carousel
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsMouseDown(false);
        updateCurrentIndex();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [updateCurrentIndex]);

  const scrollToIndex = (idx: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const articles = container.querySelectorAll<HTMLElement>('article');
    if (articles[idx]) {
      const target = articles[idx];
      const targetLeft = target.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
      setCurrentIndex(idx);
    }
  };

  const scrollPrev = () => {
    if (!carouselRef.current || cards.length === 0) return;
    const targetIdx = (currentIndex - 1 + cards.length) % cards.length;
    scrollToIndex(targetIdx);
  };

  const scrollNext = () => {
    if (!carouselRef.current || cards.length === 0) return;
    const targetIdx = (currentIndex + 1) % cards.length;
    scrollToIndex(targetIdx);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPosRef.current = carouselRef.current.scrollLeft;
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftPosRef.current - walk;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsMouseDown(false);
      updateCurrentIndex();
    }
  };

  // Mouse wheel horizontal translation: lets standard PC mouse wheel scroll the carousel horizontally
  const handleWheel = (e: React.WheelEvent) => {
    if (!carouselRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 4) {
      carouselRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Navigation Arrows & Position Counter */}
      <div className={`flex items-center ${centerControls ? 'justify-center' : 'justify-start'} border-b border-stone-200/80 pb-4`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollPrev}
              className="p-2 rounded border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 shadow-2xs transition-all cursor-pointer hover:border-amber-900 active:scale-95"
              title="Previous composer card"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4 text-amber-950" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="p-2 rounded border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 shadow-2xs transition-all cursor-pointer hover:border-amber-900 active:scale-95"
              title="Next composer card"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4 text-amber-950" />
            </button>
          </div>
          <span className="font-mono text-xs text-stone-600 tracking-wider font-semibold">
            {cards.length > 0 ? `${currentIndex + 1} of ${cards.length}` : '0 of 0'}
          </span>
        </div>
      </div>

      {/* Scrolling Carousel Container */}
      <div className="relative">
        {/* Scroll Track */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onDragStart={(e) => e.preventDefault()}
          className={`flex gap-6 overflow-x-auto pb-6 pt-2 px-1 scrollbar-none select-none touch-pan-x ${
            isMouseDown ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth snap-x snap-mandatory'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((article) => {
            const isToFollow = article.category === 'to-follow';
            return (
              <article
                key={article.id}
                onClick={
                  isToFollow || !onSelectCard
                    ? undefined
                    : () => {
                        if (!hasDraggedRef.current) {
                          onSelectCard(article.id);
                          window.scrollTo({ top: 380, behavior: 'smooth' });
                        }
                      }
                }
                className={`w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-2xs transition-all duration-200 flex flex-col select-none ${
                  isToFollow
                    ? 'cursor-default'
                    : 'hover:shadow-md group cursor-pointer'
                }`}
              >
                {/* Portrait Container - cleanly proportioned photo, centered for archive */}
                <div
                  className={`p-5 bg-stone-100/70 border-b border-stone-200/80 flex items-center ${
                    isToFollow
                      ? 'justify-between gap-4'
                      : 'justify-center'
                  }`}
                >
                  {/* Photo */}
                  <div
                    className={`${
                      isToFollow
                        ? 'w-36 sm:w-40'
                        : 'w-40 sm:w-44 group-hover:border-amber-800 group/portrait'
                    } aspect-3/4 overflow-hidden rounded border border-stone-300 bg-white shadow-xs shrink-0 transition-colors duration-200`}
                    title={isToFollow ? `${article.name} — To Follow` : `Open article on ${article.name}`}
                  >
                    <img
                      src={article.image}
                      alt={`${article.name} (${article.dates})`}
                      className={`w-full h-full object-cover object-top filter grayscale contrast-105 pointer-events-none ${
                        isToFollow ? '' : 'group-hover/portrait:scale-105 transition-transform duration-500'
                      }`}
                      draggable={false}
                    />
                  </div>

                  {/* Category Stamp to the right of photo - only for To Follow */}
                  {isToFollow && (
                    <div className="flex-1 flex items-center justify-center p-2">
                      <div className="transform -rotate-7 select-none">
                        <div className="border border-amber-900/75 p-[2px] rounded-xs bg-amber-50/40 shadow-2xs">
                          <div className="border border-amber-900/75 px-2.5 py-1 text-amber-900 font-serif font-bold text-xs sm:text-xs tracking-widest uppercase text-center">
                            TO FOLLOW
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Name title with dates */}
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-bold text-stone-900 transition-colors ${
                        isToFollow ? '' : 'group-hover:text-amber-900'
                      }`}
                    >
                      {article.name} ({article.dates})
                    </h3>

                    <p className="font-times italic text-sm sm:text-base text-amber-950 leading-relaxed mt-2.5 line-clamp-2">
                      {article.quote}
                    </p>

                    {/* Notable Work highlight */}
                    <div className="mt-4 pt-3 border-t border-stone-100 text-xs">
                      <span className="text-[11px] font-serif uppercase tracking-wider text-stone-400 block mb-0.5">
                        Notable Work
                      </span>
                      <div className="font-serif font-semibold text-stone-800 text-sm truncate">
                        {article.notableWork}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status footer */}
                  <div className="mt-5 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                    {isToFollow ? (
                      <>
                        <span className="text-xs sm:text-sm font-serif italic text-stone-500 flex items-center gap-1.5 select-none">
                          <BookOpen className="w-4 h-4 text-stone-400" />
                          <span>Forthcoming</span>
                        </span>
                        <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                          To Follow
                        </span>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCard?.(article.id);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="text-xs sm:text-sm font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-amber-900" />
                          <span>Full Archival Page</span>
                        </button>
                        <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                          Published
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dot Navigation Indicators */}
        {cards.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 bg-stone-800'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${card.name}`}
                title={card.name}
              />
            ))}
          </div>
        )}

        <div className="mt-2 text-center">
          <span className="font-serif italic text-xs text-stone-500">
            Use arrows, drag with mouse, or swipe horizontally to view all composers
          </span>
        </div>
      </div>
    </div>
  );
};
