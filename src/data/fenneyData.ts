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
    id: 'dawn',
    title: 'Dawn',
    date: '1915',
    genre: 'Tone Picture',
    isLost: false
  },
  {
    id: 'in-shadow',
    title: 'In Shadow',
    date: '1915',
    genre: 'Tone Poem',
    isLost: false
  },
  {
    id: 'pastoral',
    title: 'Pastoral',
    date: '1916',
    genre: 'Pastoral / Tone Piece',
    hasDedicatedPage: true,
    isLost: false,
    audioUrl: 'https://www.youtube.com/watch?v=rEgbrM6bUms'
  },
  {
    id: 'tragic-poem',
    title: 'Tragic Poem',
    date: '1916',
    genre: 'Tone Poem',
    isLost: false
  }
];
