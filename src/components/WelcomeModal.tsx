import React from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] border-2 border-stone-300 rounded-lg max-w-xl w-full shadow-2xl relative text-stone-900 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white/80 rounded-t-lg">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Welcome
          </h2>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4 font-serif text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            Welcome to this blog, which explores British orchestral music written between 1850 and 1950. My focus is on composers whose work has sadly fallen into oblivion. By searching for orchestral scores from various sources I have hopefully created decent renditions of their music using Sibelius and Noteperformer software.
          </p>
          <p>
            We can at last hear their music brought back to life; music which has for too long been forgotten, and in some cases never performed.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F3EFEA] px-6 py-3.5 border-t border-stone-200 flex items-center justify-between text-xs font-serif rounded-b-lg">
          <span className="text-stone-600 italic">British Orchestral Music 1850–1950</span>
          <button
            type="button"
            onClick={onClose}
            className="font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-900 hover:text-amber-950 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
