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
    audioUrl: `${import.meta.env.BASE_URL}assets/aistudio/Pastoral_3704f15a.mp3`
  },
  {
    id: 'tragic-poem',
    title: 'Tragic Poem',
    date: '1916',
    genre: 'Tone Poem',
    isLost: false
  }
];
