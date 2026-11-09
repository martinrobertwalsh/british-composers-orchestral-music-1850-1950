export interface CunninghamWoodsWork {
  id: string;
  title: string;
  date: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const CUNNINGHAM_WOODS_ORCHESTRAL_WORKS: CunninghamWoodsWork[] = [
  {
    id: 'minuet-trio',
    title: 'Minuet and Trio for orchestra',
    date: 'uncertain',
    isLost: true
  },
  {
    id: 'romance-f',
    title: 'Romance in F for violin and orchestra',
    date: 'uncertain',
    isLost: true
  },
  {
    id: 'two-gentlemen-verona',
    title: 'The Two Gentlemen of Verona – incidental music',
    date: '1893',
    isLost: true
  },
  {
    id: 'the-tempest',
    title: 'The Tempest – incidental music',
    date: '1894',
    isLost: true
  },
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
    isLost: false
  }
];
