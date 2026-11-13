export interface CunninghamWoodsWork {
  id: string;
  title: string;
  date: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const CUNNINGHAM_WOODS_ORCHESTRAL_WORKS: CunninghamWoodsWork[] = [
  {
    id: 'suite-f-major',
    title: 'Suite in F major for orchestra',
    date: '1901',
    isLost: false
  },
  {
    id: 'gressenhall-suite',
    title: 'The Gressenhall Suite for strings',
    date: '1915',
    isLost: false,
    hasDedicatedPage: true
  }
];

export const CUNNINGHAM_WOODS_MISSING_SCORES = [
  { title: 'Minuet and Trio for orchestra' },
  { title: 'Romance in F for violin and orchestra' },
  { title: 'The Two Gentlemen of Verona – incidental music', date: '1893' },
  { title: 'The Tempest – incidental music', date: '1894' }
];
