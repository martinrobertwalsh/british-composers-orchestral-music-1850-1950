import React from 'react';
import { ARCHIVE_ARTICLES } from './ArchiveTab';
import { TO_FOLLOW_ARTICLES } from './ToFollowTab';

interface HeroSectionProps {
  activeTab: 'home' | 'welcome' | 'to-follow' | 'archive' | 'contact';
  onTabChange: (tab: 'home' | 'welcome' | 'to-follow' | 'archive' | 'contact') => void;
  onOpenWelcome: () => void;
  showArrivalPopup?: boolean;
  isArrivalFading?: boolean;
  onDismissArrival?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTab,
  onTabChange,
  onOpenWelcome,
  showArrivalPopup = false,
  isArrivalFading = false,
  onDismissArrival,
}) => {
  const toFollowTotal = TO_FOLLOW_ARTICLES.length;
  const archiveTotal = ARCHIVE_ARTICLES.length;

  return (
    <>
      {/* Queen's Hall Historic Hero Photo (30% off top only, bottom anchored) */}
      <section className="relative w-full h-[46vh] sm:h-[50vh] lg:h-[55vh] min-h-[336px] flex items-center justify-center overflow-hidden bg-[#141210]">
        {/* Background Queen's Hall Photo (object-bottom anchors the bottom, cropping strictly from top) */}
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/aistudio/queens_hall_clean.jpg`}
            alt="Queen's Hall, Langham Place, London - The lost acoustic heart of the British Musical Renaissance and the Proms, before its destruction in May 1941"
            className="w-full h-full object-cover object-bottom filter brightness-125 contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Very light scrim to maintain brightness of the hall while keeping titles readable */}
          <div className="absolute inset-0 bg-stone-950/15 via-transparent to-stone-950/30" />
        </div>

        {/* Top-Right Queen's Hall Lettering */}
        <div className="absolute top-2.5 right-4 sm:top-4 sm:right-6 z-20 text-right select-none">
          <span className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-widest text-amber-200 uppercase block drop-shadow-md">
            Queen’s Hall
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-stone-300 tracking-wider block drop-shadow-sm mt-0.5">
            Langham Place, London · 1893–1941
          </span>
        </div>

        {/* Center: Pure Title & Subtitle directly over Queen's Hall */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-2xl mb-2 sm:mb-3.5">
            Forgotten Composers
          </h1>

          <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-3xl text-amber-300 font-normal italic tracking-wide drop-shadow-lg">
            British Orchestral Music 1850–1950
          </h2>

          {/* Arrival Notification Popup just under the subtitle */}
          {showArrivalPopup && (
            <div className="relative w-full">
              <div
                className={`absolute inset-x-0 top-3 sm:top-4 z-30 flex justify-center px-4 transition-all duration-[3000ms] ease-out ${
                  isArrivalFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
                }`}
                role="status"
                aria-live="polite"
              >
                <div
                  onClick={onDismissArrival}
                  className="bg-[#FAF8F5]/95 border-2 border-amber-900/75 rounded-lg px-5 py-2.5 sm:px-8 sm:py-3.5 shadow-2xl text-center max-w-md cursor-pointer"
                >
                  <p className="font-serif text-sm sm:text-lg font-bold tracking-widest uppercase text-amber-900">
                    NEW ADDITIONS TO THE ARCHIVE
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Buttons Directly Under Image: HOME · WELCOME · TO FOLLOW · ARCHIVE · CONTACT - Sticky at top of page while scrolling */}
      <nav className="w-full bg-[#FAF8F5]/95 backdrop-blur-md border-y border-stone-300 py-3 sm:py-3.5 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6">
          <button
            onClick={() => onTabChange('home')}
            className={`min-h-[44px] px-6 sm:px-8 py-2.5 rounded font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-stone-900 text-stone-50 shadow-sm border border-stone-900 ring-1 ring-stone-900/30'
                : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-300 shadow-2xs'
            }`}
          >
            HOME
          </button>
          <button
            onClick={onOpenWelcome}
            className="min-h-[44px] px-6 sm:px-8 py-2.5 rounded font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-300 shadow-2xs"
          >
            WELCOME
          </button>
          <button
            onClick={() => onTabChange('to-follow')}
            className={`relative min-h-[44px] px-6 sm:px-8 py-2.5 rounded font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'to-follow'
                ? 'bg-stone-900 text-stone-50 shadow-sm border border-stone-900 ring-1 ring-stone-900/30'
                : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-300 shadow-2xs'
            }`}
          >
            <span>TO FOLLOW</span>
            <span
              className={`absolute bottom-1 right-2 text-[10px] sm:text-[11px] font-mono font-bold leading-none pointer-events-none transition-colors ${
                activeTab === 'to-follow' ? 'text-amber-400' : 'text-stone-500'
              }`}
            >
              {toFollowTotal}
            </span>
          </button>
          <button
            onClick={() => onTabChange('archive')}
            className={`relative min-h-[44px] px-6 sm:px-8 py-2.5 rounded font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'archive'
                ? 'bg-stone-900 text-stone-50 shadow-sm border border-stone-900 ring-1 ring-stone-900/30'
                : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-300 shadow-2xs'
            }`}
          >
            <span>ARCHIVE</span>
            <span
              className={`absolute bottom-1 right-2 text-[10px] sm:text-[11px] font-mono font-bold leading-none pointer-events-none transition-colors ${
                activeTab === 'archive' ? 'text-amber-400' : 'text-stone-500'
              }`}
            >
              {archiveTotal}
            </span>
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className={`min-h-[44px] px-6 sm:px-8 py-2.5 rounded font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-stone-900 text-stone-50 shadow-sm border border-stone-900 ring-1 ring-stone-900/30'
                : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-stone-300 shadow-2xs'
            }`}
          >
            CONTACT
          </button>
        </div>
      </nav>
    </>
  );
};
