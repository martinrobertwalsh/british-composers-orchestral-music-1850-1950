import { trackPage } from './lib/analytics';
import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { WilliamSpeerPost } from './components/WilliamSpeerPost';
import { ComposerModal } from './components/ComposerModal';
import { WelcomeModal } from './components/WelcomeModal';
import { ArchiveTab } from './components/ArchiveTab';
import { ToFollowTab } from './components/ToFollowTab';
import { Composer, MusicalTheme } from './types/composer';
import { HARVEY_LOHR_SYMPHONY_3_THEME } from './data/composersData';
import { orchestralPlayer } from './audio/orchestralEngine';
import { Mail, Send, CheckCircle2, Library, Music, FolderArchive } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'welcome' | 'to-follow' | 'archive' | 'contact'>('home');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [showArrivalPopup, setShowArrivalPopup] = useState<boolean>(true);
  const [isArrivalFading, setIsArrivalFading] = useState<boolean>(false);
  const [selectedComposer, setSelectedComposer] = useState<Composer | null>(null);
  const [currentTheme, setCurrentTheme] = useState<MusicalTheme>(HARVEY_LOHR_SYMPHONY_3_THEME);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('forgotten_composers_bookmarks');
      return saved ? JSON.parse(saved) : ['harvey-lohr', 'alice-mary-smith'];
    } catch {
      return ['harvey-lohr', 'alice-mary-smith'];
    }
  });

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Score Request');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [previousTab, setPreviousTab] = useState<'home' | 'to-follow' | 'archive'>('home');
  const [toFollowKey, setToFollowKey] = useState<number>(0);
  const [archiveKey, setArchiveKey] = useState<number>(0);

  useEffect(() => {
    // The carousel tabs record their own list and article views.
    if (activeTab === 'archive' || activeTab === 'to-follow') return;
    const title = activeTab === 'home' ? 'Home — William Henry Speer' : activeTab === 'welcome' ? 'Welcome' : 'Contact';
    trackPage(activeTab === 'home' ? '/' : `/${activeTab}`, title);
  }, [activeTab]);

  useEffect(() => {
    if (isWelcomeModalOpen) trackPage('/welcome', 'Welcome');
  }, [isWelcomeModalOpen]);
  const handleTabChange = (tab: 'home' | 'welcome' | 'to-follow' | 'archive' | 'contact') => {
    if (tab === 'contact' && activeTab !== 'contact') {
      if (activeTab === 'to-follow' || activeTab === 'archive') {
        setPreviousTab(activeTab);
      } else {
        setPreviousTab('home');
      }
    }
    if (tab === 'to-follow') {
      setToFollowKey((prev) => prev + 1);
    }
    if (tab === 'archive') {
      setArchiveKey((prev) => prev + 1);
    }
    setActiveTab(tab);
    // Smooth scroll just under the image so the top of the selected tab is in view
    const heroHeight = window.innerHeight * 0.50;
    window.scrollTo({ top: heroHeight - 60, behavior: 'smooth' });
  };

  const handleSearchFromFolder = (composerName: string) => {
    setActiveTab('archive');
    setSearchQuery(composerName);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('forgotten_composers_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore
    }
  }, [bookmarkedIds]);

  // Stay visible for 2 seconds, then fade away gently over 3 seconds
  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsArrivalFading(true);
    }, 2000);
    const hideTimer = window.setTimeout(() => {
      setShowArrivalPopup(false);
    }, 5050);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayTheme = (theme: MusicalTheme) => {
    setCurrentTheme(theme);
    orchestralPlayer.playTheme(theme, true);
    setIsPlaying(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSent(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* Queen's Hall Hero Section with 4 buttons directly under image: HOME · WELCOME · ARCHIVE · CONTACT */}
      <HeroSection
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenWelcome={() => setIsWelcomeModalOpen(true)}
        showArrivalPopup={showArrivalPopup}
        isArrivalFading={isArrivalFading}
        onDismissArrival={() => setShowArrivalPopup(false)}
      />

      {/* Main Tab Views */}
      <main className="flex-1">
        {/* HOME TAB: Featured Composer Article (William Henry Speer) */}
        {activeTab === 'home' && (
          <WilliamSpeerPost isFeatured={true} />
        )}

        {/* WELCOME TAB: Curator's Welcome & Historical Context */}
        {activeTab === 'welcome' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-white border-2 border-stone-300 rounded-lg p-6 sm:p-10 shadow-sm">
              <div className="text-xs font-serif uppercase tracking-widest text-amber-900 mb-2">
                Curator’s Welcome & Historical Context
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
                Welcome to Forgotten Composers
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-amber-950 mb-6 pb-4 border-b border-stone-200">
                Restoring a century of silenced British orchestral masterworks to living sound.
              </p>

              <div className="space-y-4 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-stone-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  Welcome to this research initiative dedicated to the unearthing, score engraving, and digital realization of forgotten British classical music written between 1850 and 1950.
                </p>
                <p>
                  For decades, conventional music histories claimed that British orchestral music effectively began only around 1900 with Elgar. In reality, master craftsmen like <strong>Harvey Löhr, Percy Sherwood, Alice Mary Smith, Walter Macfarren, Ernest Bryson, Hamilton Clarke, Learmont Drysdale, and Jane Joseph</strong> composed dozens of magnificent symphonies, concertos, and tone poems that were acclaimed at Queen’s Hall and Crystal Palace Saturday concerts before disappearing into library archives.
                </p>
                <p>
                  Because their orchestral parts were rarely commercially published by Victorian presses, these scores slept untouched for over a century. Through painstaking research across the British Library, Royal Academy of Music, and Dresden State Library, this project transcribes and synthesises them so their voices can be heard once more.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-stone-200 text-xs font-sans">
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded">
                  <Library className="w-5 h-5 text-amber-800 mb-2" />
                  <div className="font-serif font-bold text-stone-900 text-sm">Archival Manuscripts</div>
                  <p className="text-stone-600 mt-1">Sourced from British Library, RAM, RCM, and SLUB Dresden.</p>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded">
                  <Music className="w-5 h-5 text-amber-800 mb-2" />
                  <div className="font-serif font-bold text-stone-900 text-sm">Digital Realisations</div>
                  <p className="text-stone-600 mt-1">Synthesised audio realizations giving acoustic life to silent scores.</p>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded">
                  <FolderArchive className="w-5 h-5 text-amber-800 mb-2" />
                  <div className="font-serif font-bold text-stone-900 text-sm">Open Research</div>
                  <p className="text-stone-600 mt-1">Shared freely for researchers, conductors, and music lovers.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TO FOLLOW TAB: Arthur Hervey, Norman O'Neill, Percy Godfrey, R. O. Morris, Francis Cunningham Woods */}
        {activeTab === 'to-follow' && (
          <ToFollowTab key={toFollowKey} />
        )}

        {/* ARCHIVE TAB: Walter Macfarren Card View */}
        {activeTab === 'archive' && (
          <ArchiveTab key={archiveKey} />
        )}

        {/* CONTACT TAB: Direct Inquiry Form */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-white border-2 border-stone-300 rounded-lg p-6 sm:p-8 shadow-sm relative">
              <div className="flex items-start justify-between pb-3 border-b border-stone-200 mb-4">
                <div>
                  <div className="text-xs font-serif uppercase tracking-widest text-amber-900 mb-1">
                    Correspondence & Collaboration
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-stone-900">
                    Contact & Enquiries
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange(previousTab || 'home')}
                  className="font-serif text-sm sm:text-base font-semibold text-amber-900 hover:text-amber-950 transition-colors cursor-pointer tracking-wide"
                  aria-label="Close contact"
                >
                  Close
                </button>
              </div>
              <p className="font-serif text-sm text-stone-700 mb-6">
                Feedback welcome whether it&apos;s highlighting inaccuracies or offering suggestions - thank you
              </p>

              {contactSent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Message Received
                  </h3>
                  <p className="font-body text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you for your enquiry. Martin Walsh will review your note and respond at <strong>{contactEmail}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setContactSent(false)}
                    className="px-4 py-2 bg-stone-900 text-stone-100 rounded text-xs font-medium cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                  <div className="p-3 bg-[#FAF8F5] border border-stone-200 rounded flex items-center gap-2 text-stone-700">
                    <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Direct Email: </span>
                    <a href="mailto:martinrobertwalsh@gmail.com" className="font-mono text-amber-900 hover:underline">
                      martinrobertwalsh@gmail.com
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Enquiry Type</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs cursor-pointer"
                    >
                      <option value="Score Request">Request Orchestral Score or Audio Realisation</option>
                      <option value="Archival Lead">Submit a Missing Manuscript / Archival Lead</option>
                      <option value="General Query">General Musicology / Research Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Your message..."
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Martin Walsh</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Composer Detail Modal for Archive */}
      <ComposerModal
        composer={selectedComposer}
        onClose={() => setSelectedComposer(null)}
        onPlayTheme={handlePlayTheme}
        isBookmarked={selectedComposer ? bookmarkedIds.includes(selectedComposer.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Welcome Modal Popup */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
      />
      {/* Archival Research Footer */}
      <footer className="w-full bg-[#1F1C18] text-stone-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-stone-800 text-center font-serif">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-amber-200 text-sm tracking-wider uppercase font-semibold">
            Forgotten Composers: British Orchestral Music 1850–1950
          </p>
          <p className="text-xs text-stone-400 font-sans">
            Dedicated to the resurrection of neglected British orchestral music.
          </p>
          <p className="text-[11px] font-mono text-stone-500 pt-2">
            Enquiries: <a href="mailto:martinrobertwalsh@gmail.com" className="hover:text-amber-300 underline underline-offset-2">martinrobertwalsh@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
