import React from 'react';
import { Mail } from 'lucide-react';

export const NEWSLETTER_SIGNUP_URL =
  'https://preview.mailerlite.io/forms/2808779/204549076108183180/share';

export const NewsletterSignup: React.FC<{ signupUrl?: string }> = ({
  signupUrl = NEWSLETTER_SIGNUP_URL,
}) => {
  if (!signupUrl) return null;

  return (
    <section aria-label="Email updates" className="bg-[#2B2119] border-y border-[#C8AA70]/60 px-5 py-8 text-center">
      <div className="max-w-xl mx-auto">
        <a
          href={signupUrl}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-[#E8D2A3] bg-[#D7B775] px-6 py-3 font-serif text-lg font-semibold text-[#241A12] shadow-lg shadow-black/25 transition-colors hover:bg-[#E8D2A3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8D2A3]"
        >
          <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
          Keep me updated
        </a>
        <p className="mt-3 font-body text-sm leading-relaxed text-[#E8DCC9]">
          Receive occasional emails when new composers and recordings are added.
        </p>
      </div>
    </section>
  );
};
