export interface SpeerWork {
  id: string;
  title: string;
  date: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
  targetSectionId?: string;
}

export const SPEER_ORCHESTRAL_WORKS: SpeerWork[] = [
  { id: 'festival-overture', title: 'Festival Overture', date: '1898', isLost: false },
  { id: 'cinderella-suite', title: 'Cinderella Suite for orchestra', date: 'c1900', isLost: false },
  {
    id: 'rhapsody-eb',
    title: 'Rhapsody in E flat for orchestra',
    date: 'c1905',
    isLost: false,
    hasDedicatedPage: true,
    targetSectionId: 'speer-rhapsody-workpage'
  },
  {
    id: 'nocturne-strings',
    title: 'Nocturne for strings',
    date: 'c1912',
    isLost: false,
    hasDedicatedPage: true,
    targetSectionId: 'speer-nocturne-workpage'
  },
];
