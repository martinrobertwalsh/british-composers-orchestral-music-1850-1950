type GoatCounter = {
  count: (data: { path: string; title: string }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/**
 * Record a meaningful view in this single-page app. GoatCounter normally
 * tracks browser page loads; these virtual paths make in-app articles visible
 * separately in its Pages report.
 */
export const trackPage = (path: string, title: string) => {
  window.goatcounter?.count({ path, title });
};
