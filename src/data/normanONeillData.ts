export interface ONeillWork {
  id: string;
  title: string;
  date: string;
  genre: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const NORMAN_ONEILL_ORCHESTRAL_WORKS: ONeillWork[] = [
  { id: 'in-autumn', title: 'In Autumn — Tone Poem (Overture)', date: '1901', genre: 'Tone Poem / Concert Overture', isLost: false, hasDedicatedPage: true },
  { id: 'miniatures', title: 'Miniatures for small orchestra', date: '1904', genre: 'Suite', isLost: false },
  { id: 'in-springtime', title: 'In Springtime — Concert Overture', date: '1906', genre: 'Concert Overture', isLost: false },
  { id: 'variations-irish-air', title: 'Variations for orchestra on an Irish Air', date: '1907', genre: 'Variations', isLost: false },
  { id: 'blue-bird-suite', title: 'The Blue Bird — Suite for orchestra', date: '1910', genre: 'Incidental Music Suite', isLost: false },
  { id: 'scotch-rhapsody', title: 'Scotch Rhapsody', date: '1911', genre: 'Rhapsody', isLost: false },
  { id: 'hornpipe', title: 'Hornpipe for orchestra', date: '1916', genre: 'Dance', isLost: false },
  { id: 'mary-rose-suite', title: 'Mary Rose — Suite for orchestra', date: '1920', genre: 'Theatrical Suite', isLost: false },
  { id: 'festal-prelude', title: 'Festal Prelude for orchestra', date: '1927', genre: 'Prelude', isLost: false },
  { id: 'two-shakespeare-sketches', title: 'Two Shakespearean Sketches', date: '1928', genre: 'Orchestral', isLost: false },
];

