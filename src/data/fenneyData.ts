export interface FenneyWork {
  id: string;
  title: string;
  date: string;
  genre: string;
  hasDedicatedPage?: boolean;
  isLost?: boolean;
  audioUrl?: string;
}

export const FENNEY_ORCHESTRAL_WORKS: FenneyWork[] = [
  {
    id: 'pastoral',
    title: 'Pastoral for Small Orchestra, Op. 5',
    date: '1917',
    genre: 'Pastoral / Tone Piece',
    hasDedicatedPage: true,
    isLost: false,
    audioUrl: `${import.meta.env.BASE_URL}assets/aistudio/Pastoral_3704f15a.mp3`
  },
  {
    id: 'in-shadow',
    title: 'In Shadow — Poem for Orchestra (Small), Op. 15',
    date: 'c1917',
    genre: 'Tone Poem',
    isLost: false
  },
  {
    id: 'nineveh',
    title: 'Nineveh — Tone Poem, Op. 18, No. 1',
    date: '1918',
    genre: 'Tone Poem',
    isLost: false
  },
  {
    id: 'in-the-woods',
    title: 'In the Woods for strings',
    date: 'c1917',
    genre: 'String Piece',
    isLost: false
  },
  {
    id: 'dawn',
    title: 'Dawn for small orchestra',
    date: 'c1919',
    genre: 'Tone Picture',
    isLost: false
  },
  {
    id: 'vision-of-spring',
    title: 'A Vision of Spring, Op. 7',
    date: 'c1916',
    genre: 'Orchestral Scene',
    isLost: false
  }
];

export const FENNEY_CHAMBER_AND_OTHER_SCORES = [
  { title: 'Piano Trio No. 1 in G major, Op. 20', genre: 'Chamber' },
  { title: 'In Early Spring (Au Printemps), Op. 13', genre: 'Piano / Instrumental' },
  { title: 'The Sands o’ Dee & The Bugles of Dreamland', genre: 'Art Songs' }
];
