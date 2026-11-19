import React from 'react';
import { Mail } from 'lucide-react';

export const NEWSLETTER_SIGNUP_URL =
  'https://preview.mailerlite.io/forms/2808779/204549076108183180/share';

export const NewsletterSignup: React.FC<{ signupUrl?: string }> = ({
  signupUrl = NEWSLETTER_SIGNUP_URL,
}) => {
  if (!signupUrl) return null;

  return (
    <section aria-label="Email updates" className="bg-[#1F1C18] border-t border-[#947541]/40 px-5 py-8 text-center">
      <div className="max-w-xl mx-auto">
        <a
          href={signupUrl}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-[#C8AA70] px-6 py-3 font-serif text-lg font-semibold text-[#E8D2A3] transition-colors hover:bg-[#35291F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8D2A3]"
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
          Keep me updated
        </a>
        <p className="mt-3 font-body text-sm leading-relaxed text-[#D8C9B4]">
          Receive occasional emails when new composers and recordings are added.
        </p>
      </div>
    </section>
  );
};
