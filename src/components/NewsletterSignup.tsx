import React from 'react';
import { Mail } from 'lucide-react';

export const NEWSLETTER_SIGNUP_URL =
  'https://preview.mailerlite.io/forms/2808779/204549076108183180/share';

export const NewsletterSignup: React.FC<{ signupUrl?: string }> = ({
  signupUrl = NEWSLETTER_SIGNUP_URL,
}) => {
  if (!signupUrl) return null;

  return (
    <section aria-label="Email updates" className="bg-[#2B2119] border-y border-[#C8AA70]/60 px-5 py-10 sm:py-12 text-center">
      <div className="max-w-xl mx-auto">
        <a
          href={signupUrl}
          className="inline-flex w-full sm:w-auto min-h-16 items-center justify-center gap-3 rounded border-2 border-[#E8D2A3] bg-[#D7B775] px-9 py-4 font-serif text-2xl sm:text-3xl font-bold text-[#241A12] shadow-lg shadow-black/25 transition-colors hover:bg-[#E8D2A3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8D2A3]"
        >
          <Mail aria-hidden="true" className="h-6 w-6 shrink-0" />
          Keep me updated
        </a>
        <p className="mt-4 font-body text-base leading-relaxed text-[#E8DCC9]">
          Receive occasional emails when new composers and recordings are added.
        </p>
      </div>
    </section>
  );
};
