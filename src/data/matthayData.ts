export interface MatthayWork {
  id: string;
  title: string;
  date: string;
  genre: string;
  isLost?: boolean;
  hasDedicatedPage?: boolean;
}

export const TOBIAS_MATTHAY_ORCHESTRAL_WORKS: MatthayWork[] = [
  { id: 'concert-overture', title: 'Concert Overture', date: '1874', genre: 'Concert Overture', isLost: false },
  { id: 'symphony-a-minor', title: 'Symphony in A minor', date: '1874', genre: 'Symphony', isLost: false },
  { id: 'scherzo-d-minor', title: 'Scherzo in D minor', date: '1875', genre: 'Scherzo', isLost: false },
  { id: 'concert-overture-c', title: 'Concert Overture in C major', date: '1877', genre: 'Concert Overture', isLost: false },
  { id: 'symphony-unspecified', title: 'Symphony, key unspecified in the work list', date: '1878', genre: 'Symphony', isLost: false },
  { id: 'reminiscences-country-life', title: 'Reminiscences of Country Life, concert overture', date: '1879', genre: 'Concert Overture', isLost: false },
  { id: 'in-summer', title: 'In Summer, symphonic overture', date: '1880', genre: 'Symphonic Overture', isLost: false },
  { id: 'andante-orchestra', title: 'Andante for Orchestra', date: '1881', genre: 'Orchestral Work', isLost: false },
  { id: 'in-may', title: 'In May, symphonic overture', date: '1883', genre: 'Symphonic Overture', isLost: false, hasDedicatedPage: true },
  { id: 'two-symphonic-movements', title: 'Two Symphonic Movements', date: '1897', genre: 'Orchestral Work', isLost: false },
];

