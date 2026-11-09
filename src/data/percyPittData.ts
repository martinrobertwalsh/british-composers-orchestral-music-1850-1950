export interface PercyPittWork {
  id: string;
  title: string;
  date: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const PERCY_PITT_ORCHESTRAL_WORKS: PercyPittWork[] = [
  { id: 'scene-de-ballet', title: 'Scène de ballet', date: '', isLost: false },
  { id: 'coronation-march', title: 'Coronation March', date: '1896', isLost: false, hasDedicatedPage: true },
  { id: 'violin-ballade', title: 'Ballade for violin and orchestra', date: '1900', isLost: false },
  { id: 'oriental-rhapsody', title: 'Oriental Rhapsody', date: '1902', isLost: false },
  { id: 'paolo-francesca', title: 'Paolo and Francesca – incidental music and symphonic impressions', date: '1902', isLost: false },
  { id: 'serenade-small-orchestra', title: 'Serenade for small orchestra', date: '1911', isLost: false },
];
