import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, FileText, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Score / Audio Request');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation
    }, 500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] border border-stone-300 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-sm px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-900">
            <Mail className="w-3.5 h-3.5" />
            <span>Archival Enquiries & Collaboration</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="font-serif text-sm sm:text-base font-semibold text-amber-900 hover:text-amber-950 transition-colors cursor-pointer tracking-wide"
            aria-label="Close contact modal"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Message Received
              </h3>
              <p className="font-body text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you for your enquiry regarding the 1850–1950 British orchestral archive. Martin Walsh will review your note and respond to you at <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Contact & Enquiries
                </h3>
                <p className="font-body text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  Feedback welcome whether it&apos;s highlighting inaccuracies or offering suggestions - thank you
                </p>
              </div>

              {/* Contact info pill */}
              <div className="p-3.5 bg-white border border-stone-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-4 h-4 text-amber-800" />
                  <span className="font-medium">Direct Email:</span>
                  <a
                    href="mailto:martinrobertwalsh@gmail.com"
                    className="font-mono text-amber-900 hover:underline"
                  >
                    martinrobertwalsh@gmail.com
                  </a>
                </div>
                <div className="text-[11px] text-stone-400 font-mono">
                  britishcomposers1850-1950.blogspot.com
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Arthur Sullivan"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Nature of Enquiry
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-xs cursor-pointer"
                  >
                    <option value="Score / Audio Request">Request Score or Audio Realisation</option>
                    <option value="Manuscript Lead / Discovery">Submit a Missing Manuscript / Archival Lead</option>
                    <option value="Performance / Programming">Concert Programming / Orchestral Parts</option>
                    <option value="General Research">General Historical / Musicology Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about the composer, work title, or archival questions..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded text-stone-700 font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
