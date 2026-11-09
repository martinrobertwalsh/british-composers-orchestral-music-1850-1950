import { MusicalTheme } from '../types/composer';

export interface MacfarrenWork {
  id: string;
  title: string;
  date: string;
  status: 'Lost' | 'Extant';
  isLost: boolean;
  genre: 'Symphony' | 'Overture' | 'Concerto' | 'Concert Piece';
  premiereVenue?: string;
  historicalNotes: string;
  instrumentation?: string;
  catalogDetail?: string;
  theme?: MusicalTheme;
}

export const WALTER_MACFARREN_SYMPHONY_BB_THEME: MusicalTheme = {
  title: 'Walter Macfarren: Symphony in B-flat major (1879) — Allegro maestoso',
  tempoBpm: 112,
  timeSignature: '4/4',
  keySignature: 'B-flat major',
  durationSeconds: 22,
  description: 'First movement noble symphonic subject: sweeping Victorian strings punctuated by horns, woodwinds, and stately brass.',
  tracks: [
    {
      name: 'Violin I',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'Bb4', duration: 1.0, velocity: 0.85 },
        { time: 1.1, pitch: 'D5', duration: 0.5, velocity: 0.8 },
        { time: 1.7, pitch: 'F5', duration: 1.2, velocity: 0.9 },
        { time: 3.1, pitch: 'Bb5', duration: 1.8, velocity: 0.95 },
        { time: 5.1, pitch: 'A5', duration: 0.6, velocity: 0.8 },
        { time: 5.8, pitch: 'G5', duration: 0.6, velocity: 0.8 },
        { time: 6.5, pitch: 'F5', duration: 1.4, velocity: 0.85 },
        { time: 8.1, pitch: 'Eb5', duration: 0.5, velocity: 0.75 },
        { time: 8.7, pitch: 'D5', duration: 0.5, velocity: 0.8 },
        { time: 9.3, pitch: 'C5', duration: 1.2, velocity: 0.85 },
        { time: 10.8, pitch: 'Bb4', duration: 2.0, velocity: 0.9 },
        // Secondary phrase
        { time: 13.2, pitch: 'F4', duration: 0.8, velocity: 0.8 },
        { time: 14.1, pitch: 'Bb4', duration: 0.8, velocity: 0.85 },
        { time: 15.0, pitch: 'D5', duration: 1.2, velocity: 0.9 },
        { time: 16.4, pitch: 'C5', duration: 0.6, velocity: 0.85 },
        { time: 17.1, pitch: 'Bb4', duration: 3.0, velocity: 0.95 }
      ]
    },
    {
      name: 'Violin II',
      color: '#2563EB',
      notes: [
        { time: 0.0, pitch: 'F4', duration: 1.0, velocity: 0.7 },
        { time: 1.1, pitch: 'Bb4', duration: 0.5, velocity: 0.7 },
        { time: 1.7, pitch: 'D5', duration: 1.2, velocity: 0.75 },
        { time: 3.1, pitch: 'F5', duration: 1.8, velocity: 0.8 },
        { time: 5.1, pitch: 'F5', duration: 0.6, velocity: 0.7 },
        { time: 5.8, pitch: 'Eb5', duration: 0.6, velocity: 0.7 },
        { time: 6.5, pitch: 'D5', duration: 1.4, velocity: 0.75 },
        { time: 8.1, pitch: 'C5', duration: 0.5, velocity: 0.7 },
        { time: 8.7, pitch: 'Bb4', duration: 0.5, velocity: 0.7 },
        { time: 9.3, pitch: 'A4', duration: 1.2, velocity: 0.75 },
        { time: 10.8, pitch: 'F4', duration: 2.0, velocity: 0.8 },
        { time: 13.2, pitch: 'D4', duration: 0.8, velocity: 0.7 },
        { time: 14.1, pitch: 'F4', duration: 0.8, velocity: 0.75 },
        { time: 15.0, pitch: 'Bb4', duration: 1.2, velocity: 0.8 },
        { time: 16.4, pitch: 'A4', duration: 0.6, velocity: 0.75 },
        { time: 17.1, pitch: 'F4', duration: 3.0, velocity: 0.8 }
      ]
    },
    {
      name: 'Viola',
      color: '#059669',
      notes: [
        { time: 0.0, pitch: 'D4', duration: 2.8, velocity: 0.7 },
        { time: 3.1, pitch: 'D4', duration: 1.8, velocity: 0.75 },
        { time: 5.1, pitch: 'C4', duration: 1.2, velocity: 0.7 },
        { time: 6.5, pitch: 'Bb3', duration: 1.4, velocity: 0.7 },
        { time: 8.1, pitch: 'F3', duration: 1.0, velocity: 0.7 },
        { time: 9.3, pitch: 'F3', duration: 1.2, velocity: 0.75 },
        { time: 10.8, pitch: 'D4', duration: 2.0, velocity: 0.8 },
        { time: 13.2, pitch: 'Bb3', duration: 1.6, velocity: 0.7 },
        { time: 15.0, pitch: 'F4', duration: 1.2, velocity: 0.75 },
        { time: 16.4, pitch: 'Eb4', duration: 0.6, velocity: 0.7 },
        { time: 17.1, pitch: 'D4', duration: 3.0, velocity: 0.8 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#4B5563',
      notes: [
        { time: 0.0, pitch: 'Bb2', duration: 2.8, velocity: 0.8 },
        { time: 3.1, pitch: 'Bb2', duration: 1.8, velocity: 0.85 },
        { time: 5.1, pitch: 'F2', duration: 1.2, velocity: 0.75 },
        { time: 6.5, pitch: 'Bb2', duration: 1.4, velocity: 0.8 },
        { time: 8.1, pitch: 'C3', duration: 1.0, velocity: 0.75 },
        { time: 9.3, pitch: 'F2', duration: 1.2, velocity: 0.8 },
        { time: 10.8, pitch: 'Bb2', duration: 2.0, velocity: 0.85 },
        { time: 13.2, pitch: 'Bb2', duration: 1.6, velocity: 0.8 },
        { time: 15.0, pitch: 'D3', duration: 1.2, velocity: 0.8 },
        { time: 16.4, pitch: 'F2', duration: 0.6, velocity: 0.8 },
        { time: 17.1, pitch: 'Bb2', duration: 3.0, velocity: 0.85 }
      ]
    },
    {
      name: 'French Horn',
      color: '#D97706',
      notes: [
        { time: 0.0, pitch: 'F3', duration: 2.8, velocity: 0.75 },
        { time: 3.1, pitch: 'Bb3', duration: 1.8, velocity: 0.8 },
        { time: 5.1, pitch: 'A3', duration: 1.2, velocity: 0.7 },
        { time: 6.5, pitch: 'Bb3', duration: 1.4, velocity: 0.75 },
        { time: 9.3, pitch: 'C4', duration: 1.2, velocity: 0.8 },
        { time: 10.8, pitch: 'Bb3', duration: 2.0, velocity: 0.8 },
        { time: 13.2, pitch: 'F3', duration: 1.6, velocity: 0.75 },
        { time: 15.0, pitch: 'Bb3', duration: 1.2, velocity: 0.8 },
        { time: 16.4, pitch: 'F3', duration: 0.6, velocity: 0.75 },
        { time: 17.1, pitch: 'Bb3', duration: 3.0, velocity: 0.85 }
      ]
    }
  ]
};

export const MACFARREN_ORCHESTRAL_WORKS: MacfarrenWork[] = [
  {
    id: 'symphony-in-bb',
    title: 'Symphony in Bb',
    date: '1879',
    status: 'Extant',
    isLost: false,
    genre: 'Symphony',
    premiereVenue: 'Kuhe’s Brighton Musical Festival (February 1880); later St James’s Hall, London',
    historicalNotes: '“A symphony missing for over a hundred years, finally turns up.” Composed in 1879, Walter Macfarren’s only known surviving symphony was received with great warmth when Kuhe premiered it in Brighton. While his elder brother George composed nine symphonies, Walter’s single contribution in B-flat was regarded as exceptionally melodious, balanced, and masterfully orchestrated. Long considered lost to history, manuscript materials and parts have resurfaced, providing a crucial missing link in late-Victorian British symphonic literature.',
    instrumentation: '2 Flutes, 2 Oboes, 2 Clarinets in Bb, 2 Bassoons, 4 French Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
    theme: WALTER_MACFARREN_SYMPHONY_BB_THEME
  },
  {
    id: 'concertstuck-piano-orchestra',
    title: 'Concertstück for piano and orchestra',
    date: '1881',
    status: 'Extant',
    isLost: false,
    genre: 'Concert Piece',
    premiereVenue: 'Brighton Musical Festival, 1881',
    historicalNotes: 'Written for the Brighton Festival and featured with Macfarren himself or prominent students at the keyboard. Demonstrates Walter’s celebrated pianistic lineage tracing directly through Cipriani Potter to Beethoven. The work balances glittering virtuosity with dignified romantic lyricism.',
    instrumentation: 'Solo Piano and Full Orchestra'
  }
];
