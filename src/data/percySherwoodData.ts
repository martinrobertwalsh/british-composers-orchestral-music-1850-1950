export interface PercySherwoodWork {
  id: string;
  title: string;
  date: string;
  genre: string;
  hasDedicatedPage?: boolean;
  isLost?: boolean;
  audioUrl?: string;
}

export const PERCY_SHERWOOD_ORCHESTRAL_WORKS: PercySherwoodWork[] = [
  {
    id: 'piano-concerto-1',
    title: 'Piano Concerto No. 1 in C minor',
    date: '1887',
    genre: 'Concerto',
    isLost: false
  },
  {
    id: 'symphony-1',
    title: 'Symphony No. 1',
    date: 'c1898',
    genre: 'Symphony',
    isLost: false
  },
  {
    id: 'symphony-2',
    title: 'Symphony No. 2 in G major',
    date: '1905',
    genre: 'Symphony',
    hasDedicatedPage: true,
    isLost: false,
    audioUrl: `${import.meta.env.BASE_URL}assets/aistudio/Sherwood_Symphony_2.mp3`
  },
  {
    id: 'symphony-3',
    title: 'Symphony No. 3 in E flat',
    date: '1907',
    genre: 'Symphony',
    isLost: false
  }
];

export const PERCY_SHERWOOD_CHAMBER_AND_OTHER_SCORES = [
  { title: 'Requiem (Mendelssohn State Prize, 1889)', genre: 'Choral & Orchestra' },
  { title: 'Suite for Clarinet and Piano, Op. 19', genre: 'Chamber' },
  { title: 'Sonatas for Violin & Piano and Violoncello & Piano', genre: 'Chamber' }
];
