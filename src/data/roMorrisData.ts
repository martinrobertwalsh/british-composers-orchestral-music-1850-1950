export interface ROMorrisWork {
  id: string;
  title: string;
  date: string;
  scoring?: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const RO_MORRIS_ORCHESTRAL_WORKS: ROMorrisWork[] = [
  {
    id: 'suite-small-orchestra',
    title: 'Suite for Small Orchestra',
    date: 'c1927',
    scoring: 'Small orchestra',
    isLost: false
  },
  {
    id: 'sinfonia-c',
    title: 'Sinfonia in C major (A Little Symphony)',
    date: '1928',
    scoring: 'Orchestra (dedicated to Arthur Bliss)',
    hasDedicatedPage: true
  },
  {
    id: 'toccata-double-fugue',
    title: 'Toccata and Double Fugue in G major — orchestra',
    date: 'c1928',
    scoring: 'Orchestra',
    isLost: false
  },
  {
    id: 'concertino-f-major',
    title: 'Concertino in F major — orchestra',
    date: 'c1928',
    scoring: 'Orchestra',
    isLost: false
  },
  {
    id: 'violin-concerto-g-minor',
    title: 'Violin Concerto in G minor',
    date: '1930',
    scoring: 'Violin and orchestra',
    isLost: false
  },
  {
    id: 'concerto-piccolo',
    title: 'Concerto piccolo — two violins and string orchestra',
    date: '1930',
    scoring: 'Two violins and string orchestra',
    isLost: false
  },
  {
    id: 'canzoni-ricercati',
    title: 'Canzoni ricercati — string quartet or string orchestra',
    date: '1931',
    scoring: 'String quartet or string orchestra',
    isLost: false
  },
  {
    id: 'partita-lidica',
    title: 'Partita Lidica — suite for cello and orchestra',
    date: '1932',
    scoring: 'Suite for cello and orchestra',
    isLost: false
  },
  {
    id: 'symphony-d-minor',
    title: 'Symphony in D minor',
    date: '1934',
    scoring: 'Orchestra',
    isLost: false
  }
];

export interface ROMorrisTheoreticalBook {
  title: string;
  date: string;
  note?: string;
}

export const RO_MORRIS_THEORETICAL_BOOKS: ROMorrisTheoreticalBook[] = [
  { title: 'Foundations of Practical Harmony and Counterpoint', date: '1925' },
  { title: 'The Structure of Music', date: '1935' },
  { title: 'Introduction to Counterpoint', date: '1944' },
  { title: 'The Oxford Harmony', date: '1946' }
];
