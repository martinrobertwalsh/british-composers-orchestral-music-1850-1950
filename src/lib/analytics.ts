type GoatCounter = {
  count?: (data: { path: string; title: string }) => void;
  no_onload?: boolean;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

const GOATCOUNTER_ENDPOINT = 'https://forgotten-british-composers.goatcounter.com/count';
const GOATCOUNTER_SCRIPT_SRC = 'https://gc.zgo.at/count.js';

let initialized = false;
const pendingPages: { path: string; title: string }[] = [];
let lastSentKey = '';
let lastSentAt = 0;

/**
 * Initialise GoatCounter once on startup. Sets `no_onload: true` so GoatCounter
 * does not double-count the initial browser load alongside the SPA tracker.
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  window.goatcounter = {
    ...(window.goatcounter || {}),
    no_onload: true,
  };

  if (document.querySelector(`script[data-goatcounter="${GOATCOUNTER_ENDPOINT}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = GOATCOUNTER_SCRIPT_SRC;
  script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
  script.onload = () => {
    if (window.goatcounter?.count) {
      for (const view of pendingPages.splice(0)) {
        window.goatcounter.count(view);
      }
    }
  };
  document.head.appendChild(script);
};

/**
 * Record a meaningful view in this single-page app. GoatCounter normally
 * tracks browser page loads; these virtual paths make tabs and in-app articles
 * visible separately in its Pages report without double-counting.
 */
export const trackPage = (path: string, title: string) => {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const key = `${path}::${title}`;
  if (key === lastSentKey && now - lastSentAt < 500) {
    return;
  }
  lastSentKey = key;
  lastSentAt = now;

  if (window.goatcounter?.count) {
    window.goatcounter.count({ path, title });
  } else {
    pendingPages.push({ path, title });
  }
};
