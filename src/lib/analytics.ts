type PageView = { path: string; title: string };
type GoatCounter = { count: (data: PageView) => void };

declare global {
  interface Window { goatcounter?: GoatCounter; }
}

const pendingViews: PageView[] = [];

export const trackPage = (path: string, title: string) => {
  const view = { path, title };
  if (window.goatcounter?.count) window.goatcounter.count(view);
  else pendingViews.push(view);
};

export const initializeAnalytics = () => {
  const script = document.createElement('script');
  script.dataset.goatcounter = 'https://forgotten-british-composers.goatcounter.com/count';
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.addEventListener('load', () => {
    for (const view of pendingViews.splice(0)) window.goatcounter?.count(view);
  });
  document.head.appendChild(script);
};
