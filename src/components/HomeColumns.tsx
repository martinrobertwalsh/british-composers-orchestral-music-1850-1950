import React from 'react';
import { ARCHIVE_ARTICLES } from './ArchiveTab';
import { TO_FOLLOW_ARTICLES } from './ToFollowTab';

interface HomeColumnsProps {
  onOpenFeatured: () => void;
  onOpenArchive: () => void;
  onOpenToFollow: () => void;
}

export const HomeColumns: React.FC<HomeColumnsProps> = ({
  onOpenFeatured,
  onOpenArchive,
  onOpenToFollow,
}) => {
  return (
    <section
      aria-label="Home Overview"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
        {/* 1. Featured Post — whole column clickable */}
        <button
          type="button"
          onClick={onOpenFeatured}
          className="group flex flex-col text-left bg-white border border-stone-300 hover:border-amber-900/60 rounded-xl p-4 sm:p-5 shadow-[0_14px_32px_-4px_rgba(28,25,23,0.42),0_6px_14px_-2px_rgba(28,25,23,0.28)] transition-colors cursor-pointer h-full"
          title="Open Featured Post: William Henry Speer"
        >
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2.5 mb-4 w-full">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors tracking-tight">
              Featured Post
            </h2>
            <span className="font-serif text-xs sm:text-sm font-semibold text-amber-900 group-hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0">
              Read article
            </span>
          </div>

          {/* Portrait + Summary */}
          <div className="flex items-start gap-4 w-full">
            <div className="w-24 sm:w-28 aspect-3/4 shrink-0 overflow-hidden rounded border border-stone-300 group-hover:border-amber-800 bg-stone-100 transition-colors">
              <img
                src={`${import.meta.env.BASE_URL}assets/aistudio/speer_portrait_restored.webp`}
                alt="William Henry Speer (1863–1937)"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                William Henry Speer
              </h3>
              <p className="font-mono text-xs text-stone-500 tabular-nums mt-0.5">
                1863–1937 &middot; 2 Audio Realisations
              </p>
              <p className="font-times italic text-sm sm:text-base text-amber-900 leading-snug mt-2">
                &ldquo;In the shadow of the Malverns and Elgar&rdquo;
              </p>
            </div>
          </div>

          {/* Opening Paragraph */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 w-full font-serif text-sm text-stone-700 leading-relaxed">
            <p>
              William Henry Speer was born in London in 1863. He studied with Charles Harford Lloyd at Gloucester and later enrolled at the Royal College of Organists in London, where he eventually gained a Doctorate. Here he joined the long list of aspiring musicians who were taught by Charles Villiers Stanford, who had so much influence at Trinity College Cambridge, which William also attended.
            </p>
          </div>
        </button>

        {/* 2. Archive — whole column clickable */}
        <button
          type="button"
          onClick={onOpenArchive}
          className="group flex flex-col text-left bg-white border border-stone-300 hover:border-amber-900/60 rounded-xl p-4 sm:p-5 shadow-[0_14px_32px_-4px_rgba(28,25,23,0.42),0_6px_14px_-2px_rgba(28,25,23,0.28)] transition-colors cursor-pointer h-full"
          title="Open Archive section"
        >
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2.5 mb-4 w-full">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors tracking-tight">
              Archive
            </h2>
            <span className="font-serif text-xs sm:text-sm font-semibold text-amber-900 group-hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0">
              View all ({ARCHIVE_ARTICLES.length})
            </span>
          </div>

          <div className="space-y-3 w-full">
            {ARCHIVE_ARTICLES.filter((a) => a.id !== 'fenney').slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="w-full bg-[#FAF8F5]/70 border border-stone-200/80 group-hover:border-amber-900/30 rounded-lg p-3 transition-colors flex items-center gap-3.5"
              >
                <div className="w-16 aspect-3/4 shrink-0 overflow-hidden rounded border border-stone-300 group-hover:border-amber-800 bg-stone-100 shadow-[0_10px_20px_-2px_rgba(28,25,23,0.55),0_4px_10px_-1px_rgba(28,25,23,0.36)] transition-all">
                  <img
                    src={article.image}
                    alt={`${article.name} (${article.dates})`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug truncate">
                    {article.name}
                  </div>
                  <p className="font-times italic text-xs sm:text-sm text-amber-900 leading-snug mt-1 line-clamp-2">
                    {article.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </button>

        {/* 3. To Follow — whole column clickable */}
        <button
          type="button"
          onClick={onOpenToFollow}
          className="group flex flex-col text-left bg-white border border-stone-300 hover:border-amber-900/60 rounded-xl p-4 sm:p-5 shadow-[0_14px_32px_-4px_rgba(28,25,23,0.42),0_6px_14px_-2px_rgba(28,25,23,0.28)] transition-colors cursor-pointer h-full"
          title="Open To Follow section"
        >
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-2.5 mb-4 w-full">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors tracking-tight">
              To Follow
            </h2>
            <span className="font-serif text-xs sm:text-sm font-semibold text-amber-900 group-hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0">
              View all ({TO_FOLLOW_ARTICLES.length})
            </span>
          </div>

          <div className="space-y-3 w-full">
            {TO_FOLLOW_ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="w-full bg-[#FAF8F5]/70 border border-stone-200/80 group-hover:border-amber-900/30 rounded-lg p-3 transition-colors flex items-center gap-3.5"
              >
                <div className="w-16 aspect-3/4 shrink-0 overflow-hidden rounded border border-stone-300 group-hover:border-amber-800 bg-stone-100 shadow-[0_10px_20px_-2px_rgba(28,25,23,0.55),0_4px_10px_-1px_rgba(28,25,23,0.36)] transition-all">
                  <img
                    src={article.image}
                    alt={`${article.name} (${article.dates})`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug truncate">
                    {article.name}
                  </div>
                  <p className="font-times italic text-xs sm:text-sm text-amber-900 leading-snug mt-1 line-clamp-2">
                    {article.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </button>
      </div>
    </section>
  );
};
