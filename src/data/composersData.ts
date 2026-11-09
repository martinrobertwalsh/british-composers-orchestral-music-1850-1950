import { Composer, MusicalTheme } from '../types/composer';

// Musical themes crafted note-by-note for Web Audio synthesizer realisation
export const HARVEY_LOHR_SYMPHONY_3_THEME: MusicalTheme = {
  title: 'Harvey Löhr: Symphony No. 3 in D minor (Opening Allegro con brio)',
  tempoBpm: 108,
  timeSignature: '4/4',
  keySignature: 'D minor',
  durationSeconds: 22,
  description: 'First movement dramatic opening motto: dark minor-mode lower strings answered by assertive brass and sweeping first violins.',
  tracks: [
    {
      name: 'Violin I',
      color: '#9333EA',
      notes: [
        { time: 0.0, pitch: 'D4', duration: 0.5, velocity: 0.7 },
        { time: 0.6, pitch: 'F4', duration: 0.4, velocity: 0.75 },
        { time: 1.1, pitch: 'A4', duration: 0.9, velocity: 0.85 },
        { time: 2.1, pitch: 'D5', duration: 1.4, velocity: 0.9 },
        { time: 3.6, pitch: 'C#5', duration: 0.5, velocity: 0.8 },
        { time: 4.2, pitch: 'D5', duration: 0.5, velocity: 0.8 },
        { time: 4.8, pitch: 'Bb4', duration: 1.0, velocity: 0.85 },
        { time: 6.0, pitch: 'A4', duration: 2.0, velocity: 0.9 },
        // Bar 3-4
        { time: 8.2, pitch: 'G4', duration: 0.5, velocity: 0.75 },
        { time: 8.8, pitch: 'A4', duration: 0.5, velocity: 0.8 },
        { time: 9.4, pitch: 'Bb4', duration: 0.8, velocity: 0.85 },
        { time: 10.4, pitch: 'C5', duration: 1.2, velocity: 0.9 },
        { time: 11.8, pitch: 'D5', duration: 0.6, velocity: 0.85 },
        { time: 12.5, pitch: 'F5', duration: 1.8, velocity: 0.95 },
        { time: 14.5, pitch: 'E5', duration: 1.2, velocity: 0.85 },
        { time: 16.0, pitch: 'D5', duration: 2.5, velocity: 0.9 }
      ]
    },
    {
      name: 'Violin II',
      color: '#3B82F6',
      notes: [
        { time: 0.0, pitch: 'A3', duration: 1.8, velocity: 0.65 },
        { time: 2.1, pitch: 'F4', duration: 1.4, velocity: 0.7 },
        { time: 3.6, pitch: 'E4', duration: 1.0, velocity: 0.7 },
        { time: 4.8, pitch: 'G4', duration: 1.0, velocity: 0.75 },
        { time: 6.0, pitch: 'F4', duration: 2.0, velocity: 0.8 },
        { time: 8.2, pitch: 'E4', duration: 1.0, velocity: 0.7 },
        { time: 9.4, pitch: 'G4', duration: 0.8, velocity: 0.75 },
        { time: 10.4, pitch: 'A4', duration: 1.2, velocity: 0.8 },
        { time: 12.5, pitch: 'D5', duration: 1.8, velocity: 0.85 },
        { time: 14.5, pitch: 'C#5', duration: 1.2, velocity: 0.8 },
        { time: 16.0, pitch: 'A4', duration: 2.5, velocity: 0.85 }
      ]
    },
    {
      name: 'Viola',
      color: '#10B981',
      notes: [
        { time: 0.0, pitch: 'F3', duration: 1.8, velocity: 0.7 },
        { time: 2.1, pitch: 'D4', duration: 1.4, velocity: 0.75 },
        { time: 3.6, pitch: 'A3', duration: 1.0, velocity: 0.7 },
        { time: 4.8, pitch: 'D4', duration: 1.0, velocity: 0.75 },
        { time: 6.0, pitch: 'D4', duration: 2.0, velocity: 0.8 },
        { time: 8.2, pitch: 'C#4', duration: 1.0, velocity: 0.7 },
        { time: 9.4, pitch: 'D4', duration: 0.8, velocity: 0.75 },
        { time: 10.4, pitch: 'F4', duration: 1.2, velocity: 0.8 },
        { time: 12.5, pitch: 'A4', duration: 1.8, velocity: 0.85 },
        { time: 14.5, pitch: 'G4', duration: 1.2, velocity: 0.8 },
        { time: 16.0, pitch: 'F4', duration: 2.5, velocity: 0.85 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'D2', duration: 1.8, velocity: 0.85 },
        { time: 2.1, pitch: 'D3', duration: 1.4, velocity: 0.8 },
        { time: 3.6, pitch: 'A2', duration: 1.0, velocity: 0.75 },
        { time: 4.8, pitch: 'G2', duration: 1.0, velocity: 0.8 },
        { time: 6.0, pitch: 'D2', duration: 2.0, velocity: 0.9 },
        { time: 8.2, pitch: 'A2', duration: 1.0, velocity: 0.8 },
        { time: 9.4, pitch: 'Bb2', duration: 0.8, velocity: 0.8 },
        { time: 10.4, pitch: 'F2', duration: 1.2, velocity: 0.85 },
        { time: 12.5, pitch: 'D2', duration: 1.8, velocity: 0.9 },
        { time: 14.5, pitch: 'A2', duration: 1.2, velocity: 0.85 },
        { time: 16.0, pitch: 'D2', duration: 2.5, velocity: 0.95 }
      ]
    },
    {
      name: 'French Horn',
      color: '#D97706',
      notes: [
        { time: 0.0, pitch: 'D3', duration: 1.8, velocity: 0.8 },
        { time: 2.1, pitch: 'A3', duration: 1.4, velocity: 0.8 },
        { time: 4.8, pitch: 'D4', duration: 1.0, velocity: 0.85 },
        { time: 6.0, pitch: 'A3', duration: 2.0, velocity: 0.85 },
        { time: 12.5, pitch: 'F4', duration: 1.8, velocity: 0.9 },
        { time: 14.5, pitch: 'E4', duration: 1.2, velocity: 0.85 },
        { time: 16.0, pitch: 'D4', duration: 2.5, velocity: 0.9 }
      ]
    },
    {
      name: 'Timpani',
      color: '#4B5563',
      notes: [
        { time: 0.0, pitch: 'D2', duration: 0.8, velocity: 0.9 },
        { time: 2.1, pitch: 'D2', duration: 0.6, velocity: 0.85 },
        { time: 6.0, pitch: 'D2', duration: 1.0, velocity: 0.9 },
        { time: 12.5, pitch: 'D2', duration: 0.8, velocity: 0.95 },
        { time: 16.0, pitch: 'D2', duration: 1.5, velocity: 1.0 }
      ]
    }
  ]
};

export const ALICE_MARY_SMITH_SYMPHONY_THEME: MusicalTheme = {
  title: 'Alice Mary Smith: Symphony in C minor (Allegro maestoso theme)',
  tempoBpm: 120,
  timeSignature: '4/4',
  keySignature: 'C minor',
  durationSeconds: 20,
  description: 'First movement lyrical second subject: flowing woodwind cantilena supported by pulsing warm strings.',
  tracks: [
    {
      name: 'Flute & Oboe',
      color: '#059669',
      notes: [
        { time: 0.0, pitch: 'Eb5', duration: 1.0, velocity: 0.8 },
        { time: 1.0, pitch: 'D5', duration: 0.5, velocity: 0.75 },
        { time: 1.5, pitch: 'C5', duration: 0.5, velocity: 0.75 },
        { time: 2.0, pitch: 'G4', duration: 1.5, velocity: 0.85 },
        { time: 3.8, pitch: 'Ab4', duration: 0.6, velocity: 0.8 },
        { time: 4.5, pitch: 'Bb4', duration: 0.6, velocity: 0.8 },
        { time: 5.2, pitch: 'C5', duration: 1.8, velocity: 0.85 },
        { time: 7.5, pitch: 'Eb5', duration: 1.0, velocity: 0.85 },
        { time: 8.6, pitch: 'F5', duration: 0.8, velocity: 0.9 },
        { time: 9.5, pitch: 'G5', duration: 2.0, velocity: 0.95 },
        { time: 12.0, pitch: 'F5', duration: 0.6, velocity: 0.8 },
        { time: 12.8, pitch: 'Eb5', duration: 0.6, velocity: 0.8 },
        { time: 13.5, pitch: 'D5', duration: 1.2, velocity: 0.85 },
        { time: 15.0, pitch: 'C5', duration: 2.5, velocity: 0.9 }
      ]
    },
    {
      name: 'Violin I',
      color: '#9333EA',
      notes: [
        { time: 0.0, pitch: 'C4', duration: 0.4, velocity: 0.65 },
        { time: 0.5, pitch: 'Eb4', duration: 0.4, velocity: 0.65 },
        { time: 1.0, pitch: 'G4', duration: 0.4, velocity: 0.65 },
        { time: 1.5, pitch: 'C4', duration: 0.4, velocity: 0.65 },
        { time: 2.0, pitch: 'Eb4', duration: 1.5, velocity: 0.7 },
        { time: 3.8, pitch: 'F4', duration: 0.6, velocity: 0.7 },
        { time: 5.2, pitch: 'Ab4', duration: 1.8, velocity: 0.75 },
        { time: 7.5, pitch: 'C5', duration: 1.0, velocity: 0.8 },
        { time: 8.6, pitch: 'D5', duration: 0.8, velocity: 0.8 },
        { time: 9.5, pitch: 'Eb5', duration: 2.0, velocity: 0.85 },
        { time: 13.5, pitch: 'G4', duration: 1.2, velocity: 0.75 },
        { time: 15.0, pitch: 'Eb4', duration: 2.5, velocity: 0.8 }
      ]
    },
    {
      name: 'Violin II',
      color: '#3B82F6',
      notes: [
        { time: 0.0, pitch: 'G3', duration: 1.8, velocity: 0.6 },
        { time: 2.0, pitch: 'C4', duration: 1.5, velocity: 0.65 },
        { time: 3.8, pitch: 'D4', duration: 1.2, velocity: 0.65 },
        { time: 5.2, pitch: 'Eb4', duration: 1.8, velocity: 0.7 },
        { time: 7.5, pitch: 'Ab4', duration: 1.0, velocity: 0.75 },
        { time: 9.5, pitch: 'C5', duration: 2.0, velocity: 0.8 },
        { time: 13.5, pitch: 'B3', duration: 1.2, velocity: 0.7 },
        { time: 15.0, pitch: 'C4', duration: 2.5, velocity: 0.75 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'C2', duration: 1.8, velocity: 0.75 },
        { time: 2.0, pitch: 'Eb2', duration: 1.5, velocity: 0.75 },
        { time: 3.8, pitch: 'F2', duration: 1.2, velocity: 0.75 },
        { time: 5.2, pitch: 'Ab2', duration: 1.8, velocity: 0.8 },
        { time: 7.5, pitch: 'F2', duration: 1.0, velocity: 0.8 },
        { time: 9.5, pitch: 'C3', duration: 2.0, velocity: 0.85 },
        { time: 13.5, pitch: 'G2', duration: 1.2, velocity: 0.85 },
        { time: 15.0, pitch: 'C2', duration: 2.5, velocity: 0.9 }
      ]
    }
  ]
};

export const PERCY_SHERWOOD_CONCERTO_THEME: MusicalTheme = {
  title: 'Percy Sherwood: Piano Concerto in C minor (Andante sostenuto)',
  tempoBpm: 76,
  timeSignature: '3/4',
  keySignature: 'Ab major',
  durationSeconds: 21,
  description: 'Slow movement central cantilena: serene, Brahmsian warmth with interwoven woodwinds and muted strings.',
  tracks: [
    {
      name: 'Violin I',
      color: '#9333EA',
      notes: [
        { time: 0.0, pitch: 'Eb4', duration: 1.2, velocity: 0.7 },
        { time: 1.4, pitch: 'Ab4', duration: 1.2, velocity: 0.75 },
        { time: 2.8, pitch: 'C5', duration: 1.8, velocity: 0.85 },
        { time: 5.0, pitch: 'Bb4', duration: 0.8, velocity: 0.75 },
        { time: 6.0, pitch: 'Ab4', duration: 0.8, velocity: 0.75 },
        { time: 7.0, pitch: 'G4', duration: 1.5, velocity: 0.8 },
        { time: 9.0, pitch: 'Bb4', duration: 1.2, velocity: 0.8 },
        { time: 10.4, pitch: 'Db5', duration: 1.4, velocity: 0.85 },
        { time: 12.2, pitch: 'C5', duration: 2.0, velocity: 0.9 },
        { time: 15.0, pitch: 'Ab4', duration: 3.0, velocity: 0.85 }
      ]
    },
    {
      name: 'Viola',
      color: '#10B981',
      notes: [
        { time: 0.0, pitch: 'C3', duration: 2.4, velocity: 0.65 },
        { time: 2.8, pitch: 'Eb3', duration: 1.8, velocity: 0.7 },
        { time: 5.0, pitch: 'Db3', duration: 1.6, velocity: 0.7 },
        { time: 7.0, pitch: 'Eb3', duration: 1.5, velocity: 0.7 },
        { time: 9.0, pitch: 'G3', duration: 1.2, velocity: 0.75 },
        { time: 10.4, pitch: 'Bb3', duration: 1.4, velocity: 0.75 },
        { time: 12.2, pitch: 'Ab3', duration: 2.0, velocity: 0.8 },
        { time: 15.0, pitch: 'Eb3', duration: 3.0, velocity: 0.75 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'Ab2', duration: 2.6, velocity: 0.75 },
        { time: 2.8, pitch: 'C2', duration: 1.8, velocity: 0.75 },
        { time: 5.0, pitch: 'Db2', duration: 1.6, velocity: 0.75 },
        { time: 7.0, pitch: 'Eb2', duration: 1.5, velocity: 0.8 },
        { time: 9.0, pitch: 'Eb2', duration: 1.2, velocity: 0.8 },
        { time: 10.4, pitch: 'Db2', duration: 1.4, velocity: 0.8 },
        { time: 12.2, pitch: 'C2', duration: 2.0, velocity: 0.85 },
        { time: 15.0, pitch: 'Ab1', duration: 3.0, velocity: 0.9 }
      ]
    },
    {
      name: 'French Horn',
      color: '#D97706',
      notes: [
        { time: 0.0, pitch: 'Eb3', duration: 2.6, velocity: 0.7 },
        { time: 2.8, pitch: 'Ab3', duration: 1.8, velocity: 0.75 },
        { time: 7.0, pitch: 'Bb3', duration: 1.5, velocity: 0.75 },
        { time: 12.2, pitch: 'C4', duration: 2.0, velocity: 0.8 },
        { time: 15.0, pitch: 'Ab3', duration: 3.0, velocity: 0.8 }
      ]
    }
  ]
};

export const ERNEST_BRYSON_STRANGER_THEME: MusicalTheme = {
  title: 'Ernest Bryson: Symphony No. 2 "The Stranger" (Lento misterioso)',
  tempoBpm: 64,
  timeSignature: '4/4',
  keySignature: 'C major / Modal',
  durationSeconds: 22,
  description: 'Atmospheric opening with eerie muted lower strings and soaring Celtic modal oboe theme.',
  tracks: [
    {
      name: 'Flute & Oboe',
      color: '#059669',
      notes: [
        { time: 0.0, pitch: 'E4', duration: 1.8, velocity: 0.75 },
        { time: 2.0, pitch: 'G4', duration: 1.2, velocity: 0.8 },
        { time: 3.4, pitch: 'A4', duration: 2.0, velocity: 0.85 },
        { time: 5.8, pitch: 'C5', duration: 1.5, velocity: 0.9 },
        { time: 7.6, pitch: 'B4', duration: 1.0, velocity: 0.8 },
        { time: 8.8, pitch: 'A4', duration: 1.2, velocity: 0.8 },
        { time: 10.2, pitch: 'G4', duration: 2.2, velocity: 0.85 },
        { time: 13.0, pitch: 'E4', duration: 1.8, velocity: 0.8 },
        { time: 15.2, pitch: 'D4', duration: 1.2, velocity: 0.75 },
        { time: 16.8, pitch: 'C4', duration: 3.0, velocity: 0.85 }
      ]
    },
    {
      name: 'Violin I',
      color: '#9333EA',
      notes: [
        { time: 0.0, pitch: 'C4', duration: 3.0, velocity: 0.6 },
        { time: 3.4, pitch: 'E4', duration: 2.0, velocity: 0.65 },
        { time: 5.8, pitch: 'G4', duration: 1.5, velocity: 0.7 },
        { time: 7.6, pitch: 'E4', duration: 2.2, velocity: 0.7 },
        { time: 10.2, pitch: 'C4', duration: 2.2, velocity: 0.7 },
        { time: 13.0, pitch: 'G3', duration: 1.8, velocity: 0.65 },
        { time: 15.2, pitch: 'A3', duration: 1.2, velocity: 0.65 },
        { time: 16.8, pitch: 'C4', duration: 3.0, velocity: 0.7 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'C2', duration: 4.5, velocity: 0.75 },
        { time: 5.8, pitch: 'A1', duration: 4.0, velocity: 0.75 },
        { time: 10.2, pitch: 'F1', duration: 2.8, velocity: 0.8 },
        { time: 13.0, pitch: 'G1', duration: 3.5, velocity: 0.8 },
        { time: 16.8, pitch: 'C2', duration: 3.5, velocity: 0.85 }
      ]
    }
  ]
};

export const WALFORD_DAVIES_BIG_BEN_THEME: MusicalTheme = {
  title: 'Sir Henry Walford Davies: Symphonic Phantasy "Big Ben Looks On" (Opening Chimes & Allegro)',
  tempoBpm: 96,
  timeSignature: '4/4',
  keySignature: 'E major',
  durationSeconds: 20,
  description: 'The famous Westminster chimes motif transformed into a triumphant Edwardian orchestral march and variations.',
  tracks: [
    {
      name: 'French Horn',
      color: '#D97706',
      notes: [
        // Westminster quarters: E - G# - F# - B
        { time: 0.0, pitch: 'G#4', duration: 0.8, velocity: 0.9 },
        { time: 1.0, pitch: 'F#4', duration: 0.8, velocity: 0.85 },
        { time: 2.0, pitch: 'E4', duration: 0.8, velocity: 0.85 },
        { time: 3.0, pitch: 'B3', duration: 1.6, velocity: 0.9 },
        // Bar 2
        { time: 5.0, pitch: 'E4', duration: 0.8, velocity: 0.85 },
        { time: 6.0, pitch: 'F#4', duration: 0.8, velocity: 0.85 },
        { time: 7.0, pitch: 'G#4', duration: 0.8, velocity: 0.9 },
        { time: 8.0, pitch: 'E4', duration: 1.6, velocity: 0.9 },
        // Heroic answer
        { time: 10.5, pitch: 'B4', duration: 1.2, velocity: 0.95 },
        { time: 12.0, pitch: 'G#4', duration: 1.0, velocity: 0.9 },
        { time: 13.5, pitch: 'A4', duration: 1.0, velocity: 0.85 },
        { time: 15.0, pitch: 'B4', duration: 2.5, velocity: 1.0 }
      ]
    },
    {
      name: 'Violin I',
      color: '#9333EA',
      notes: [
        { time: 5.0, pitch: 'G#4', duration: 0.8, velocity: 0.75 },
        { time: 6.0, pitch: 'A4', duration: 0.8, velocity: 0.8 },
        { time: 7.0, pitch: 'B4', duration: 0.8, velocity: 0.85 },
        { time: 8.0, pitch: 'G#4', duration: 1.6, velocity: 0.85 },
        { time: 10.5, pitch: 'E5', duration: 1.2, velocity: 0.9 },
        { time: 12.0, pitch: 'B4', duration: 1.0, velocity: 0.85 },
        { time: 13.5, pitch: 'C#5', duration: 1.0, velocity: 0.85 },
        { time: 15.0, pitch: 'E5', duration: 2.5, velocity: 0.95 }
      ]
    },
    {
      name: 'Cello & Bass',
      color: '#B45309',
      notes: [
        { time: 0.0, pitch: 'E2', duration: 4.5, velocity: 0.8 },
        { time: 5.0, pitch: 'E2', duration: 4.5, velocity: 0.85 },
        { time: 10.5, pitch: 'G#2', duration: 1.2, velocity: 0.85 },
        { time: 12.0, pitch: 'E2', duration: 1.0, velocity: 0.85 },
        { time: 13.5, pitch: 'A2', duration: 1.0, velocity: 0.85 },
        { time: 15.0, pitch: 'E2', duration: 2.5, velocity: 0.95 }
      ]
    },
    {
      name: 'Timpani',
      color: '#4B5563',
      notes: [
        { time: 3.0, pitch: 'B2', duration: 0.6, velocity: 0.85 },
        { time: 8.0, pitch: 'E2', duration: 0.8, velocity: 0.9 },
        { time: 15.0, pitch: 'E2', duration: 1.8, velocity: 0.95 }
      ]
    }
  ]
};

export const COMPOSERS_DATA: Composer[] = [
  {
    id: 'harvey-lohr',
    name: 'Harvey Löhr',
    fullName: 'Charles Harvey Löhr',
    birthYear: 1856,
    deathYear: 1927,
    nationality: 'British (English)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/portrait_harvey_lohr_1793641659536.jpg", import.meta.url).href,
    portraitCaption: 'Harvey Löhr, photograph c. 1895, at the height of his orchestral composing in London.',
    shortBio: 'Royal Academy prodigy and Lucas medallist who composed five monumental romantic symphonies that vanished from British concert halls after the First World War.',
    detailedBiography: 'Born in Leicester in 1856 into a renowned musical dynasty, Harvey Löhr entered the Royal Academy of Music, studying composition under Sir Arthur Sullivan and Ebenezer Prout. He won the prestigious Charles Lucas Medal for composition. Löhr was an exceptionally gifted orchestral craftsman who produced five complete symphonies, piano concertos, the grand oratorio "The Queen of Sheba", and extensive chamber works. His Third Symphony in D minor was greeted with high acclaim at Westminster Orchestral Society concerts in 1888. However, because his symphonies remained largely in manuscript form and were not commercially printed by Novello or Breitkopf, the scores slumbered in private collections and library vaults after his death in 1927.',
    whyForgotten: 'Löhr wrote primarily in the high German-influenced Romantic style of Brahms and Schumann. Following the post-WWI reaction against German romanticism and the rise of the English folk-song revival led by Vaughan Williams, Victorian symphonists who did not embrace pastoral modalism were dismissed as "teutonic anachronisms". Crucially, his orchestral parts were never published, requiring painstaking manual reconstruction.',
    musicalStyle: 'Rich German-Romantic counterpoint infused with English lyricism; inventive chromatic harmony, robust orchestration for grand Victorian orchestra with triple brass.',
    influences: ['Johannes Brahms', 'Arthur Sullivan', 'Robert Schumann', 'Felix Mendelssohn'],
    keyArchives: ['Royal Academy of Music Library, London', 'British Library Manuscripts (Add MS)', 'Leicestershire County Archives'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Edward Elgar', 'Hubert Parry', 'Charles Villiers Stanford', 'Alexander Mackenzie'],
    quote: {
      text: 'Mr. Löhr has given us a work of genuine structural backbone; the Third Symphony reveals a masterly command of the full orchestral palette without empty ostentation.',
      source: 'The Musical Times, London review',
      year: 1888
    },
    works: [
      {
        id: 'lohr-sym-3',
        title: 'Symphony No. 3 in D minor',
        yearComposed: 1888,
        premiereInfo: 'Westminster Orchestral Society, Town Hall, London, 1888',
        genre: 'Symphony',
        instrumentation: '2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 2 Trumpets, 3 Trombones, Tuba, Timpani, Strings',
        durationApprox: '34 minutes',
        archiveLocation: 'RAM Library MS 482',
        catalogStatus: 'First Modern Realisation',
        summary: 'A dramatic, stormy work in four movements demonstrating superb contrapuntal handling and tragic grandeur.',
        notableExcerpt: 'Opening motto of the Allegro con brio with soaring first violin counter-melody.',
        movements: [
          {
            id: 'm1',
            number: 'I',
            tempoHeading: 'Allegro con brio',
            key: 'D minor',
            durationEst: '10:45',
            notes: 'Sonata-allegro form with a fiery, impassioned principal subject and a warm, consoling second theme in F major.',
            hasAudioRealisation: true,
            audioTheme: HARVEY_LOHR_SYMPHONY_3_THEME
          },
          {
            id: 'm2',
            number: 'II',
            tempoHeading: 'Andante con moto e cantabile',
            key: 'B-flat major',
            durationEst: '8:20',
            notes: 'A deeply expressive pastoral movement characterized by solo oboe and cello dialogue.'
          },
          {
            id: 'm3',
            number: 'III',
            tempoHeading: 'Scherzo: Vivace ma non troppo',
            key: 'G minor',
            durationEst: '6:15',
            notes: 'Fleet-footed Mendelssohnian scamper with a hunting-call horn trio in G major.'
          },
          {
            id: 'm4',
            number: 'IV',
            tempoHeading: 'Finale: Allegro maestoso - Presto',
            key: 'D major',
            durationEst: '8:40',
            notes: 'Triumphant transformation of the minor-mode opening motto into a blazing D major hymn.'
          }
        ]
      },
      {
        id: 'lohr-piano-concerto',
        title: 'Piano Concerto in E minor',
        yearComposed: 1882,
        genre: 'Concerto',
        instrumentation: 'Solo Piano + Orchestral Winds & Strings',
        durationApprox: '28 minutes',
        archiveLocation: 'British Library MS R.A.M. Loan',
        catalogStatus: 'Fully Typeset',
        summary: 'A sparkling virtuoso concerto balancing Lisztian bravura with Schumann-like poetic intimacy.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Allegro moderato', key: 'E minor', durationEst: '12:00', notes: 'Dramatic cadenza leading to a lyrical cantabile.' },
          { id: 'm2', number: 'II', tempoHeading: 'Adagio sostenuto', key: 'C major', durationEst: '7:30', notes: 'Nocturne-like intimacy for solo piano.' },
          { id: 'm3', number: 'III', tempoHeading: 'Rondo: Allegro vivace', key: 'E major', durationEst: '8:30', notes: 'Exuberant dance finale.' }
        ]
      },
      {
        id: 'lohr-queen-sheba',
        title: 'The Queen of Sheba (Oratorio)',
        yearComposed: 1894,
        genre: 'Choral & Vocal',
        instrumentation: 'Soli, Chorus & Full Orchestra',
        durationApprox: '75 minutes',
        archiveLocation: 'British Library & Novello Archives',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A grand Victorian sacred drama rich in exotic modal coloring and magnificent double choruses.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Prologue & March of the Caravans', key: 'A minor', durationEst: '14:00', notes: 'Solemn desert march motif.' }
        ]
      }
    ]
  },
  {
    id: 'alice-mary-smith',
    name: 'Alice Mary Smith',
    fullName: 'Alice Mary Smith (Mrs Meadows White)',
    birthYear: 1839,
    deathYear: 1884,
    nationality: 'British (English)',
    era: 'Mid-Victorian (1850-1879)',
    portraitUrl: new URL("../assets/images/portrait_alice_mary_smith_1793641660957.jpg", import.meta.url).href,
    portraitCaption: 'Alice Mary Smith, photograph c. 1878, London; the first British woman to compose a full orchestral symphony.',
    shortBio: 'A true pioneer of the Victorian era who shattered gender barriers to compose symphonies, clarinet concertos, and grand cantatas hailed across London.',
    detailedBiography: 'Alice Mary Smith was born into an affluent London family and displayed precocious musical gifts. She studied privately with Sir William Sterndale Bennett and Sir George Macfarren. In 1863, at the age of twenty-four, she completed her Symphony in C minor—making her the first British female composer in history known to have composed and heard a symphony performed in public (by the Musical Society of London). Elected an Honorary Member of the Royal Academy of Music in 1884, her untimely death from typhoid fever at forty-five cut short a blazing career.',
    whyForgotten: 'Despite universal contemporary praise, 19th-century patriarchal prejudice often relegated women composers to small salon songs or parlor piano pieces after their deaths. Her massive symphonic and concertante manuscripts remained unpublished and sat uncatalogued in the Royal Academy of Music library for over a century.',
    musicalStyle: 'Mendelssohnian elegance, Schubertian harmonic daring, and dramatic Beethovenian drive. Extraordinary clarity of woodwind part-writing.',
    influences: ['Felix Mendelssohn', 'Ludwig van Beethoven', 'William Sterndale Bennett', 'Franz Schubert'],
    keyArchives: ['Royal Academy of Music Archives, London', 'Musical Society of London Collection'],
    obscurityRank: 'Neglected Pioneer',
    famousContemporaries: ['William Sterndale Bennett', 'Arthur Sullivan', 'Johannes Brahms', 'Fanny Mendelssohn'],
    quote: {
      text: 'Her symphony shows a command of form and orchestral resources that would do honor to any living composer.',
      source: 'The Athenaeum',
      year: 1863
    },
    works: [
      {
        id: 'smith-sym-c-minor',
        title: 'Symphony in C minor',
        yearComposed: 1863,
        premiereInfo: 'Musical Society of London, St James’s Hall, 1863',
        genre: 'Symphony',
        instrumentation: '2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 2 Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
        durationApprox: '27 minutes',
        archiveLocation: 'RAM Library MS 127',
        catalogStatus: 'First Modern Realisation',
        summary: 'A landmark work in British music history: the first known symphony by a British woman, blending fierce Classical energy with Romantic passion.',
        notableExcerpt: 'Lyrical woodwind dialogue of the first movement and the vigorous hunting-rhythm finale.',
        movements: [
          {
            id: 'm1',
            number: 'I',
            tempoHeading: 'Allegro maestoso',
            key: 'C minor',
            durationEst: '8:45',
            notes: 'A dramatic sonata form opening with ominous soft string pulses building into a tempestuous tutti.',
            hasAudioRealisation: true,
            audioTheme: ALICE_MARY_SMITH_SYMPHONY_THEME
          },
          {
            id: 'm2',
            number: 'II',
            tempoHeading: 'Andante con moto',
            key: 'A-flat major',
            durationEst: '6:30',
            notes: 'Tender romance highlighting the solo clarinet and horn.'
          },
          {
            id: 'm3',
            number: 'III',
            tempoHeading: 'Scherzo: Allegro vivace',
            key: 'C minor / C major',
            durationEst: '4:50',
            notes: 'Sprightly Mendelssohnian fairy scherzo with warm brass fanfare in the trio.'
          },
          {
            id: 'm4',
            number: 'IV',
            tempoHeading: 'Finale: Allegro saltarello',
            key: 'C major',
            durationEst: '7:15',
            notes: 'Italian saltarello dance rhythm carrying the symphony into an ecstatic victory.'
          }
        ]
      },
      {
        id: 'smith-clarinet-concerto',
        title: 'Clarinet Concerto in B-flat major',
        yearComposed: 1869,
        genre: 'Concerto',
        instrumentation: 'Solo Clarinet + Classical Orchestra',
        durationApprox: '18 minutes',
        archiveLocation: 'RAM Archive',
        catalogStatus: 'Fully Typeset',
        summary: 'One of the very few 19th-century British concertos for clarinet, full of operatic bel canto melodies.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Allegro amabile', key: 'B-flat major', durationEst: '9:00', notes: 'Gently swinging clarinet cantabile.' }
        ]
      }
    ]
  },
  {
    id: 'percy-sherwood',
    name: 'Percy Sherwood',
    fullName: 'Percy Sherwood',
    birthYear: 1866,
    deathYear: 1939,
    nationality: 'Anglo-German',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Archival study of Percy Sherwood’s compositional desk and Dresden scores.',
    shortBio: 'Mendelssohn Prize-winning Anglo-German master who bridged the Dresden Royal Conservatory and Victorian London, tragically marooned by the Great War.',
    detailedBiography: 'Percy Sherwood was born in Dresden to an English father (John Sherwood) and a German mother. He entered the prestigious Royal Conservatoire of Dresden in 1885, studying piano with Theodor Kirchner and composition with Felix Draeseke. In 1889, Sherwood was awarded the prestigious German Mendelssohn Prize for his Requiem. He became a professor at the Dresden Conservatory and an influential musical figure in Saxony. However, the outbreak of the First World War in 1914 forced him to flee Germany as an enemy alien, abandoning his library, manuscripts, and reputation. In England, his Germanic style was met with wartime suspicion, leaving him to teach private piano lessons in Hampstead in total obscurity until his death in 1939.',
    whyForgotten: 'Sherwood was a casualty of 20th-century geopolitical tragedy. In Germany, his British citizenship erased him from concert programs after 1914; in Britain, his Dresden training caused him to be viewed as an outsider during the anti-German cultural climate.',
    musicalStyle: 'Sumptuous late-Romantic German harmonic richness combined with refined craftsmanship, intricate contrapuntal voice-leading, and expansive melodic breadth.',
    influences: ['Felix Draeseke', 'Johannes Brahms', 'Franz Liszt', 'Theodor Kirchner'],
    keyArchives: ['Sächsische Landesbibliothek (SLUB), Dresden', 'British Library Music Collections', 'Hampstead Private Collections'],
    obscurityRank: 'Archival Enigma',
    famousContemporaries: ['Richard Strauss', 'Max Reger', 'Edward Elgar', 'Ethel Smyth'],
    quote: {
      text: 'Sherwood possesses an extraordinary architectural sense: his C minor Concerto is worthy to stand alongside Draeseke and Brahms.',
      source: 'Dresdner Nachrichten',
      year: 1891
    },
    works: [
      {
        id: 'sherwood-piano-concerto-1',
        title: 'Piano Concerto No. 1 in C minor',
        yearComposed: 1887,
        premiereInfo: 'Royal Conservatory Orchestra, Dresden, 1888',
        genre: 'Concerto',
        instrumentation: 'Solo Piano, 2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
        durationApprox: '36 minutes',
        archiveLocation: 'SLUB Dresden Mus.5982-O-500',
        catalogStatus: 'First Modern Realisation',
        summary: 'A monumental German-Romantic piano concerto with intense emotional depth, fiery pianism, and a sublime Andante sostenuto.',
        notableExcerpt: 'The deeply moving Andante sostenuto featuring glowing horn and string textures.',
        movements: [
          {
            id: 'm1',
            number: 'I',
            tempoHeading: 'Allegro con fuoco',
            key: 'C minor',
            durationEst: '15:20',
            notes: 'A tempestuous dialogue between virtuosic piano cascades and brass-driven orchestral statements.'
          },
          {
            id: 'm2',
            number: 'II',
            tempoHeading: 'Andante sostenuto',
            key: 'A-flat major',
            durationEst: '9:40',
            notes: 'Noble, meditative romance of heartfelt warmth.',
            hasAudioRealisation: true,
            audioTheme: PERCY_SHERWOOD_CONCERTO_THEME
          },
          {
            id: 'm3',
            number: 'III',
            tempoHeading: 'Allegro vivace e marcato',
            key: 'C major',
            durationEst: '11:00',
            notes: 'A rousing, syncopated rondo finale full of festive energy.'
          }
        ]
      },
      {
        id: 'sherwood-sym-2',
        title: 'Symphony No. 2 in G major',
        yearComposed: 1905,
        genre: 'Symphony',
        instrumentation: 'Full Symphonic Orchestra',
        durationApprox: '38 minutes',
        archiveLocation: 'SLUB Dresden & British Library',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A sunny, pastoral masterpiece written before the war tore Sherwood’s world apart.'
      }
    ]
  },
  {
    id: 'ernest-bryson',
    name: 'Ernest Bryson',
    fullName: 'Robert Ernest Bryson',
    birthYear: 1867,
    deathYear: 1942,
    nationality: 'British (Scottish/English)',
    era: 'Edwardian (1900-1914)',
    portraitUrl: new URL("../assets/images/archive_manuscript_score_1793641661700.jpg", import.meta.url).href,
    portraitCaption: 'Handwritten autograph score from Ernest Bryson’s symphonic archive.',
    shortBio: 'Liverpool cotton merchant and friend of Granville Bantock who composed visionary mystical symphonies depicting solitary highlands and inner spiritual quests.',
    detailedBiography: 'Ernest Bryson led a fascinating double life: by day a partner in a prominent Liverpool cotton broker firm, by night an intensely focused composer of formidable originality. A close associate of Granville Bantock, Bryson lived later in life in the remote Scottish Highlands and the Welsh borders. His music rejects superficial salon charm in favor of a brooding, mystical depth. His Second Symphony, subtitled "The Stranger" (1927), is one of the most hauntingly original symphonies in British music, exploring themes of spiritual alienation and ancient myth.',
    whyForgotten: 'Bryson’s status as an independent gentleman outside the London academic establishment (RCM/RAM) caused him to be dismissed by critics as an "amateur," despite Sir Adrian Boult and Bantock repeatedly championing his scores. His publisher dropped orchestral stocks during WWII paper drives.',
    musicalStyle: 'Mystical, expansive, modal-chromatic palette reminiscent of Sibelius, Bax, and late Bantock; dark orchestral hues and solitary wind solos.',
    influences: ['Granville Bantock', 'Jean Sibelius', 'Richard Wagner', 'Celtic folklore'],
    keyArchives: ['Royal College of Music Library, London', 'Liverpool Central Library Collections'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Arnold Bax', 'Granville Bantock', 'Ralph Vaughan Williams', 'John Ireland'],
    works: [
      {
        id: 'bryson-sym-2',
        title: 'Symphony No. 2 in C major "The Stranger"',
        yearComposed: 1927,
        premiereInfo: 'BBC Symphony Orchestra broadcast, cond. Adrian Boult, 1928',
        genre: 'Symphony',
        instrumentation: '3 Flutes, 2 Oboes, Cor Anglais, 2 Clarinets, Bass Clarinet, 2 Bassoons, Contrabassoon, 4 Horns, 3 Trumpets, 3 Trombones, Tuba, Timpani, Percussion, Harp, Strings',
        durationApprox: '35 minutes',
        archiveLocation: 'RCM Library MS 4319',
        catalogStatus: 'First Modern Realisation',
        summary: 'A breathtaking mystical symphony meditating on the solitary wandering stranger through highland mists and ecstatic visions.',
        notableExcerpt: 'Opening modal oboe melody drifting over muted string pedal points.',
        movements: [
          {
            id: 'm1',
            number: 'I',
            tempoHeading: 'Lento misterioso - Allegro moderato',
            key: 'C major / Modal',
            durationEst: '12:30',
            notes: 'A shadowy dawn over misty moorlands, interrupted by dramatic fanfares.',
            hasAudioRealisation: true,
            audioTheme: ERNEST_BRYSON_STRANGER_THEME
          },
          {
            id: 'm2',
            number: 'II',
            tempoHeading: 'Adagio molto espressivo',
            key: 'E-flat minor',
            durationEst: '8:40',
            notes: 'A grief-laden threnody of immense tragic weight.'
          },
          {
            id: 'm3',
            number: 'III',
            tempoHeading: 'Allegro ritmico ed energico',
            key: 'C major',
            durationEst: '13:50',
            notes: 'A wild, pagan-tinged bacchanal dissolving into serene spiritual peace.'
          }
        ]
      },
      {
        id: 'bryson-song-of-summer',
        title: 'A Song of Summer for Orchestra',
        yearComposed: 1910,
        genre: 'Symphonic Poem',
        instrumentation: 'Full Orchestra',
        durationApprox: '14 minutes',
        archiveLocation: 'RCM Archive',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A radiant English impressionist tone poem capturing sunlit meadows before the shadow of the Great War.'
      }
    ]
  },
  {
    id: 'walford-davies',
    name: 'Sir Henry Walford Davies',
    fullName: 'Sir Henry Walford Davies KCVO OBE',
    birthYear: 1869,
    deathYear: 1941,
    nationality: 'British (Welsh/English)',
    era: 'Interwar & Beyond (1915-1950)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Archival folio containing Walford Davies’s 1937 Coronation phantasy score.',
    shortBio: 'Master of the King’s Musick and beloved pioneer of music broadcasting whose grand concert music was overshadowed by his royal hymns and wartime marches.',
    detailedBiography: 'Sir Henry Walford Davies was one of the most prominent musical figures in early 20th-century Britain. Born in Oswestry, he studied at the Royal College of Music with Parry and Stanford. Succeeding Sir Edward Elgar as Master of the King’s Musick in 1934, he was known to millions as the warm, articulate host of BBC radio music broadcasts. However, this popular fame had an ironic side effect: the classical music world dismissed his serious symphonies, concertos, and suites. Works like his 1937 Symphonic Phantasy "Big Ben Looks On" (written for the BBC broadcast on King George VI’s coronation) were performed once or twice and then filed away in BBC archives.',
    whyForgotten: 'Famous as a musical educator and broadcaster, Davies became trapped in the "popular entertainer and church musician" pigeonhole. His substantial orchestral works were regarded as too conservative by mid-century modernists and largely ignored.',
    musicalStyle: 'Aristocratic Edwardian nobility, infectious melodic warmth, crystal-clear counterpoint, and stirring ceremonial brilliance.',
    influences: ['Hubert Parry', 'Charles Villiers Stanford', 'Edward Elgar', 'J.S. Bach'],
    keyArchives: ['BBC Music Library, London', 'Royal College of Music Library', 'National Library of Wales'],
    obscurityRank: 'Rediscovered Gem',
    famousContemporaries: ['Edward Elgar', 'Ralph Vaughan Williams', 'Gustav Holst', 'Arthur Bliss'],
    works: [
      {
        id: 'davies-big-ben',
        title: 'Symphonic Phantasy "Big Ben Looks On"',
        yearComposed: 1937,
        premiereInfo: 'BBC Symphony Orchestra, London broadcast, May 1937',
        genre: 'Symphonic Poem',
        instrumentation: '3 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 3 Trumpets, 3 Trombones, Tuba, Timpani, Chimes, Strings',
        durationApprox: '15 minutes',
        archiveLocation: 'BBC Written Archives & RCM MS 9104',
        catalogStatus: 'First Modern Realisation',
        summary: 'A delightful and ingenious symphonic fantasy taking the four notes of the Big Ben Westminster Chimes and evolving them into a full romantic suite.',
        notableExcerpt: 'Opening solemn chimes bursting into an exuberant festive march.',
        movements: [
          {
            id: 'm1',
            number: 'I',
            tempoHeading: 'Allegro maestoso e con dignita',
            key: 'E major',
            durationEst: '15:10',
            notes: 'A continuous symphonic poem featuring character variations representing the passing pageantry of the British capital.',
            hasAudioRealisation: true,
            audioTheme: WALFORD_DAVIES_BIG_BEN_THEME
          }
        ]
      },
      {
        id: 'davies-sym-g-major',
        title: 'Symphony in G major',
        yearComposed: 1895,
        genre: 'Symphony',
        instrumentation: 'Full Orchestra',
        durationApprox: '32 minutes',
        archiveLocation: 'Royal College of Music MS',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'An exuberant youthful symphony dedicated to Parry, bursting with Elgarian vigor.'
      }
    ]
  },
  {
    id: 'john-lodge-ellerton',
    name: 'John Lodge Ellerton',
    fullName: 'John Lodge Ellerton (born John Lodge)',
    birthYear: 1801,
    deathYear: 1873,
    nationality: 'British (English)',
    era: 'Mid-Victorian (1850-1879)',
    portraitUrl: new URL("../assets/images/archive_manuscript_score_1793641661700.jpg", import.meta.url).href,
    portraitCaption: 'Engraved frontispiece from John Lodge Ellerton’s published string quartets in Vienna.',
    shortBio: 'Early Victorian symphonic pioneer admired by Liszt and Wagner in Germany, whose seven symphonies predated the British Musical Renaissance.',
    detailedBiography: 'John Lodge Ellerton was an Oxford graduate of independent wealth who spent years living in Rome and Germany, mastering Italian opera and German counterpoint. At a time when England was notoriously dubbed "Das Land ohne Musik" (the land without music) and produced few symphonies, Ellerton composed seven full-scale symphonies, over forty string quartets, and multiple operas. Franz Liszt attended his performances and spoke warmly of his structural ingenuity. Wagner stayed at his London residence in 1855. Yet in England, Ellerton was largely overlooked because professional music circles resented an aristocratic gentleman composer who did not earn his living at the organ bench.',
    whyForgotten: 'Active just prior to the recognized "British Musical Renaissance" of Parry and Stanford (which claimed English symphonic music only started around 1880), mid-century figures like Ellerton and Cipriani Potter were conveniently written out of music history textbooks.',
    musicalStyle: 'Early-to-mid Romantic Austro-German symphonism; Spohr-like harmonic refinement, Mendelssohnian grace, and early program music storytelling.',
    influences: ['Louis Spohr', 'Felix Mendelssohn', 'Ludwig van Beethoven', 'Franz Schubert'],
    keyArchives: ['British Library Manuscripts (Add MS 31698)', 'Gesellschaft der Musikfreunde, Vienna'],
    obscurityRank: 'Neglected Pioneer',
    famousContemporaries: ['Cipriani Potter', 'William Sterndale Bennett', 'Louis Spohr', 'Hector Berlioz'],
    works: [
      {
        id: 'ellerton-waldsymphonie',
        title: 'Symphony in D major "Waldsymphonie" (Forest Symphony)',
        yearComposed: 1857,
        genre: 'Symphony',
        instrumentation: '2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
        durationApprox: '31 minutes',
        archiveLocation: 'British Library Add MS 31702',
        catalogStatus: 'Fully Typeset',
        summary: 'A lush descriptive symphony portraying forest glades, hunting parties, and twilight woodland reveries.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Allegro ameno: Im Walde', key: 'D major', durationEst: '9:30', notes: 'Gently murmuring strings evoke wind through rustling oaks.' },
          { id: 'm2', number: 'II', tempoHeading: 'Andante con moto', key: 'G major', durationEst: '7:15', notes: 'Rustic woodland brook cantabile.' },
          { id: 'm3', number: 'III', tempoHeading: 'Scherzo: Jagdlust', key: 'D major', durationEst: '5:45', notes: 'Spirited hunting horn calls echoed across orchestra sections.' },
          { id: 'm4', number: 'IV', tempoHeading: 'Finale: Abenddämmerung', key: 'D major', durationEst: '8:30', notes: 'Peaceful dusk settling over the romantic landscape.' }
        ]
      }
    ]
  },
  {
    id: 'benjamin-dale',
    name: 'Benjamin Dale',
    fullName: 'Benjamin James Dale',
    birthYear: 1885,
    deathYear: 1943,
    nationality: 'British (English)',
    era: 'Edwardian (1900-1914)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Benjamin Dale study and Ruhleben internment camp musical notebook.',
    shortBio: 'Sensational young prodigy whose 40-minute Piano Sonata stunned London, but whose creative momentum was shattered by four years of WWI internment.',
    detailedBiography: 'Benjamin Dale entered the Royal Academy of Music at age fifteen, studying with Frederick Corder alongside Arnold Bax and York Bowen. In 1905, his monumental Piano Sonata in D minor was hailed by critics as the greatest piano work yet written by an Englishman. In 1914, while traveling in Germany for the Bayreuth Festival, war was declared and Dale was arrested as a civilian enemy alien and held at the Ruhleben internment camp near Berlin for the duration of the war. Although he courageously formed an orchestra in the camp, the trauma and loss of four prime creative years permanently broke his compositional momentum.',
    whyForgotten: 'Dale composed relatively few works after WWI, turning to academic administration at the Royal Academy of Music. His intensely passionate, late-Romantic chromaticism fell out of fashion in the cynical 1920s.',
    musicalStyle: 'Sumptuous, chromatic late-Romanticism in the tradition of Liszt and early Strauss; dense polyphonic textures and soaring lyrical climaxes.',
    influences: ['Franz Liszt', 'Richard Wagner', 'Frederick Corder', 'Johannes Brahms'],
    keyArchives: ['Royal Academy of Music Library, Dale Collection'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Arnold Bax', 'York Bowen', 'John Ireland', 'Frank Bridge'],
    works: [
      {
        id: 'dale-viola-phantasy',
        title: 'Phantasy in D major for Viola and Orchestra',
        yearComposed: 1907,
        premiereInfo: 'Lionel Tertis, Queen’s Hall Promenade Concerts, 1908',
        genre: 'Concerto',
        instrumentation: 'Solo Viola, Full Symphony Orchestra',
        durationApprox: '22 minutes',
        archiveLocation: 'RAM Dale Archive',
        catalogStatus: 'Fully Typeset',
        summary: 'Commissioned by legendary violist Lionel Tertis to expand the viola repertoire, a passionate single-movement masterpiece.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Lento espressivo - Allegro appassionato', key: 'D major', durationEst: '22:00', notes: 'Continuous single-movement phantasy with soaring romantic viola melodies.' }
        ]
      }
    ]
  },
  {
    id: 'dora-bright',
    name: 'Dora Bright',
    fullName: 'Dora Estella Bright (Mrs Knatchbull)',
    birthYear: 1862,
    deathYear: 1951,
    nationality: 'British (English)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/portrait_alice_mary_smith_1793641660957.jpg", import.meta.url).href,
    portraitCaption: 'Victorian portrait study of Dora Bright at the Royal Academy.',
    shortBio: 'Brilliant pianist-composer who was the first woman invited to perform her own concerto at the Royal Philharmonic Society in 1892.',
    detailedBiography: 'Dora Bright was born in Sheffield and studied at the Royal Academy of Music with Walter Macfarren and Ebenezer Prout. She won the Potter Exhibition and the Lucas Medal for composition. In 1892, she achieved a historic triumph when the venerable Royal Philharmonic Society invited her to play her Piano Concerto No. 1 in A minor at Queen’s Hall—marking the first time in the society’s 80-year history that a woman composed and performed a work for them. She toured Germany to ecstatic reviews, playing her concerto in Dresden and Leipzig.',
    whyForgotten: 'After her marriage to Captain Wyndham Knatchbull in 1892, societal conventions of the British gentry pressured her to abandon public concertising. While she continued writing ballets and incidental music, her major orchestral scores were left unpublished.',
    musicalStyle: 'Effervescent Romanticism, glittering Lisztian piano figurations, and transparent, sparkling orchestration.',
    influences: ['Robert Schumann', 'Camille Saint-Saëns', 'Felix Mendelssohn', 'Franz Liszt'],
    keyArchives: ['Royal Academy of Music Library, London'],
    obscurityRank: 'Neglected Pioneer',
    famousContemporaries: ['Ethel Smyth', 'Maud Valérie White', 'Arthur Sullivan', 'Edvard Grieg'],
    works: [
      {
        id: 'bright-piano-concerto-1',
        title: 'Piano Concerto No. 1 in A minor',
        yearComposed: 1888,
        premiereInfo: 'Royal Academy of Music, 1888; Royal Philharmonic Society, 1892',
        genre: 'Concerto',
        instrumentation: 'Solo Piano, Piccolo, 2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
        durationApprox: '24 minutes',
        archiveLocation: 'RAM MS 214',
        catalogStatus: 'First Modern Realisation',
        summary: 'A breathtakingly fresh concerto full of rhythmic drive, lyrical tenderness, and sparkling keyboard pyrotechnics.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Allegro feroce e moderato', key: 'A minor', durationEst: '10:15', notes: 'A daring, punchy opening theme with dazzling piano cadenzas.' },
          { id: 'm2', number: 'II', tempoHeading: 'Andante con tenerezza', key: 'F major', durationEst: '6:30', notes: 'A dreamlike serenade.' },
          { id: 'm3', number: 'III', tempoHeading: 'Presto leggiero', key: 'A major', durationEst: '7:15', notes: 'Giddy, brilliant tarantella finale.' }
        ]
      }
    ]
  },
  {
    id: 'ro-morris',
    name: 'R.O. Morris',
    fullName: 'Reginald Owen Morris',
    birthYear: 1886,
    deathYear: 1948,
    nationality: 'British (English)',
    era: 'Interwar & Beyond (1915-1950)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'R.O. Morris, scholar and composer, Royal College of Music.',
    shortBio: 'Brother-in-law of Vaughan Williams and peerless counterpoint teacher who trained Tippett and Finzi, whose own exquisite modal symphonies were rarely heard.',
    detailedBiography: 'Educated at Harrow, New College Oxford, and the Royal College of Music, Reginald Owen Morris was one of the foremost musical minds in 20th-century Britain. His treatise "Contrapuntal Technique in the Sixteenth Century" remains a cornerstone of musicology. At the RCM and Curtis Institute, Morris taught an astonishing generation of composers, including Michael Tippett, Gerald Finzi, and Anthony Milner. In 1915 he married Emmeline Fisher, whose sister Adeline was married to Ralph Vaughan Williams. Morris’s own orchestral music is extraordinarily refined, combining Tudor contrapuntal purity with luminous 20th-century modal harmony.',
    whyForgotten: 'His legendary modesty and reputation as a scholarly pedagogue overshadowed his creative output. Furthermore, Morris shunned self-promotion, leaving his Symphony in C minor (1935) virtually unstaged.',
    musicalStyle: 'Serene modal polyphony, transparent scoring reminiscent of Byrd and Tallis translated to modern symphony orchestra; poignant lyrical restraint.',
    influences: ['William Byrd', 'Thomas Tallis', 'J.S. Bach', 'Ralph Vaughan Williams'],
    keyArchives: ['Royal College of Music Library, London', 'Bodleian Library, Oxford'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Ralph Vaughan Williams', 'Gustav Holst', 'John Ireland', 'Arthur Bliss'],
    works: [
      {
        id: 'morris-sym-c-minor',
        title: 'Symphony in C minor',
        yearComposed: 1935,
        premiereInfo: 'BBC Symphony Orchestra, cond. Sir Adrian Boult, 1935',
        genre: 'Symphony',
        instrumentation: 'Symphony Orchestra with Cor Anglais and Bass Clarinet',
        durationApprox: '28 minutes',
        archiveLocation: 'RCM MS Morris Coll.',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A masterpiece of subtle contrapuntal architecture and quiet spiritual power.',
        movements: [
          { id: 'm1', number: 'I', tempoHeading: 'Lento - Allegro moderato', key: 'C minor', durationEst: '9:15', notes: 'Polyphonic weaving of modal string lines.' },
          { id: 'm2', number: 'II', tempoHeading: 'Adagio cantabile', key: 'E-flat major', durationEst: '7:45', notes: 'Sublime Tudor-inspired hymnody.' }
        ]
      }
    ]
  },
  {
    id: 'arthur-hervey',
    name: 'Arthur Hervey',
    fullName: 'Arthur Hervey',
    birthYear: 1855,
    deathYear: 1922,
    nationality: 'British (Irish/English)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/archive_manuscript_score_1793641661700.jpg", import.meta.url).href,
    portraitCaption: 'Arthur Hervey autograph tone poem score title page.',
    shortBio: 'Influential London critic and composer who pioneered the modern Lisztian symphonic tone poem in Britain.',
    detailedBiography: 'Born in Paris to Irish parents, Arthur Hervey was educated in France and London. He was chief music critic of Vanity Fair and The Morning Post. Hervey was an ardent champion of modern French and Russian music when London was still fixated on Mendelssohn. His own orchestral tone poems, including "On the Heights" (1901) and "In the East" (1904), demonstrated a daring orchestral palette with glittering percussion and impressionistic wind colors that anticipated Elgar and Bantock.',
    whyForgotten: 'Music critics in Edwardian England were viewed with deep skepticism if they also composed; colleagues frequently accused them of bias, leading Hervey to withdraw his pieces after festival premieres.',
    musicalStyle: 'Coloristic French-influenced orchestration, exotic modes, flowing Lisztian thematic transformation.',
    influences: ['Franz Liszt', 'Hector Berlioz', 'Camille Saint-Saëns', 'César Franck'],
    keyArchives: ['British Library Music Manuscripts', 'Cardiff Festival Archives'],
    obscurityRank: 'Archival Enigma',
    famousContemporaries: ['Alexander Mackenzie', 'Edward German', 'Granville Bantock'],
    works: [
      {
        id: 'hervey-in-the-east',
        title: 'Symphonic Poem "In the East"',
        yearComposed: 1904,
        premiereInfo: 'Cardiff Music Festival, 1904',
        genre: 'Symphonic Poem',
        instrumentation: 'Full Orchestra with Harp and Antique Cymbals',
        durationApprox: '16 minutes',
        archiveLocation: 'British Library MS',
        catalogStatus: 'Fully Typeset',
        summary: 'A lush orient-inspired orchestral study shimmering with sensual string harmonies and exotic oboe melodies.'
      }
    ]
  },
  {
    id: 'hamilton-clarke',
    name: 'Hamilton Clarke',
    fullName: 'William Hamilton Clarke',
    birthYear: 1840,
    deathYear: 1912,
    nationality: 'British (English)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Hamilton Clarke, Royal Academy of Music archival page.',
    shortBio: 'Oxford B.Mus., conductor of the D’Oyly Carte Opera Company and Queen’s Theatre, who composed two full symphonies and overtures praised for their contrapuntal elegance.',
    detailedBiography: 'Hamilton Clarke studied at Queen’s College, Oxford. A consummate orchestrator, he famously assisted Arthur Sullivan in orchestrating several Savoy Operas and conducted the D’Oyly Carte company. In addition to theater music, Clarke composed two complete symphonies, six grand orchestral overtures, and numerous chamber works. His mastery of classical woodwind balance and humorous orchestration made him one of the most versatile musicians of the late Victorian era.',
    whyForgotten: 'His close association with Sullivan and light Victorian theater led classical concert historians to unfairly pigeonhole him as merely a theatrical arranger, ignoring his serious symphonies.',
    musicalStyle: 'Sprightly Mendelssohnian grace, transparent scoring, sparkling woodwind dialogues, and impeccable classical counterpoint.',
    influences: ['Felix Mendelssohn', 'Arthur Sullivan', 'George Macfarren'],
    keyArchives: ['Royal College of Music Library', 'British Library Music Manuscripts'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Arthur Sullivan', 'Frederic Cowen', 'Charles Villiers Stanford'],
    works: [
      {
        id: 'clarke-sym-f',
        title: 'Symphony in F major',
        yearComposed: 1873,
        genre: 'Symphony',
        instrumentation: 'Full Orchestra',
        durationApprox: '28 minutes',
        archiveLocation: 'RCM Library MS Coll.',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A genial, sunlit Victorian symphony featuring buoyant outer movements and a lyrical pastoral romance.'
      }
    ]
  },
  {
    id: 'william-george-cusins',
    name: 'Sir William George Cusins',
    fullName: 'Sir William George Cusins',
    birthYear: 1833,
    deathYear: 1893,
    nationality: 'British (English)',
    era: 'Mid-Victorian (1850-1879)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Sir William George Cusins, Master of the Queen’s Music.',
    shortBio: 'Master of the Queen’s Music to Queen Victoria and Philharmonic Society conductor who premiered Brahms’s First Symphony in England.',
    detailedBiography: 'Sir William George Cusins entered the Chapel Royal as a boy and the Brussels Conservatoire before studying at the Royal Academy of Music with Cipriani Potter and Sterndale Bennett. In 1867 he became the principal conductor of the Philharmonic Society of London, a post he held with distinction for sixteen years. In 1870 he was appointed Master of the Queen’s Music. Cusins was a brilliant pianist and composer whose Piano Concerto in A minor and Symphony in C were performed across Europe.',
    whyForgotten: 'Because his high administrative positions at court and the Philharmonic consumed much of his time, later critics remembered him solely as an executive rather than a formidable creator.',
    musicalStyle: 'Continental Romanticism in the lineage of Schumann and Sterndale Bennett, rich keyboard figuration, and noble Victorian orchestration.',
    influences: ['Cipriani Potter', 'William Sterndale Bennett', 'Robert Schumann'],
    keyArchives: ['Royal Academy of Music', 'Royal Music Library, British Library'],
    obscurityRank: 'Neglected Pioneer',
    famousContemporaries: ['William Sterndale Bennett', 'Arthur Sullivan', 'Charles Hallé'],
    works: [
      {
        id: 'cusins-piano-concerto',
        title: 'Piano Concerto in A minor',
        yearComposed: 1866,
        genre: 'Concerto',
        instrumentation: 'Solo Piano and Full Orchestra',
        durationApprox: '26 minutes',
        archiveLocation: 'British Library Royal Music Coll.',
        catalogStatus: 'Fully Typeset',
        summary: 'A dramatic, virtuoso concerto with fiery cadenzas and deep romantic lyricism.'
      }
    ]
  },
  {
    id: 'learmont-drysdale',
    name: 'Learmont Drysdale',
    fullName: 'Learmont Drysdale',
    birthYear: 1866,
    deathYear: 1909,
    nationality: 'British (Scottish)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Learmont Drysdale, portrait c. 1898, Edinburgh.',
    shortBio: 'Genius of Scottish musical romanticism whose overture "Tam o’ Shanter" won the Glasgow Society of Musicians prize over Hamish MacCunn.',
    detailedBiography: 'Born in Edinburgh, Learmont Drysdale entered the Royal Academy of Music in 1887, winning the Charles Lucas Medal. In 1890 his overture "Tam o’ Shanter" was awarded the Glasgow Society of Musicians’ prize from among thirty competitors. Drysdale possessed a vivid, spontaneous melodic gift, fusing rugged Highland folklore with orchestral wizardry. His premature death at forty-two deprived Scottish music of one of its most blazing talents.',
    whyForgotten: 'Drysdale died young without having secured a permanent London publisher for his major orchestral canvases. His manuscripts were bequeathed to Glasgow University Library where they remained unperformed.',
    musicalStyle: 'Vibrant, dramatic Scottish national romanticism, thrilling brass sonorities, and colorful atmospheric textures depicting Caledonian landscapes.',
    influences: ['Frederick Corder', 'Alexander Mackenzie', 'Felix Mendelssohn'],
    keyArchives: ['Glasgow University Library Special Collections', 'National Library of Scotland'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Hamish MacCunn', 'Alexander Mackenzie', 'Edward Elgar'],
    works: [
      {
        id: 'drysdale-tam-o-shanter',
        title: 'Concert Overture "Tam o’ Shanter"',
        yearComposed: 1890,
        premiereInfo: 'Glasgow, 1891, cond. August Manns at the Crystal Palace',
        genre: 'Overture',
        instrumentation: 'Full Symphony Orchestra',
        durationApprox: '13 minutes',
        archiveLocation: 'Glasgow University MS Drysdale Coll.',
        catalogStatus: 'Fully Typeset',
        summary: 'A kinetic, terrifying and witty depiction of Robert Burns’s midnight ride through witches and warlocks.'
      }
    ]
  },
  {
    id: 'william-fenney',
    name: 'William J. Fenney',
    fullName: 'William John Fenney',
    birthYear: 1891,
    deathYear: 1957,
    nationality: 'British (English)',
    era: 'Edwardian (1900-1914)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'William J. Fenney, Birmingham School of Music.',
    shortBio: 'Bantock’s beloved Birmingham prodigy whose exquisite pastoral tone poems captured a dreamlike English pastoral idyll before mental illness silenced him.',
    detailedBiography: 'William John Fenney was born in Birmingham and studied with Sir Granville Bantock at the Birmingham and Midland Institute. Bantock regarded Fenney as the most naturally gifted lyricist he ever taught. Works like "The Romance of the Rose", "Vision of Spring", and "In the Woods" were performed by Sir Henry Wood at Queen’s Hall and Dan Godfrey in Bournemouth to enthusiastic critical notices.',
    whyForgotten: 'In the early 1920s, Fenney suffered a devastating mental breakdown that ended his active career. He lived in quiet seclusion in the Midlands for thirty-five years while his music slipped out of concert programs.',
    musicalStyle: 'Luminous English impressionism, delicate pastoral woodwind phrasing, and tender, introspective harmony akin to early Delius and Butterworth.',
    influences: ['Granville Bantock', 'Frederick Delius', 'Edward Elgar'],
    keyArchives: ['Birmingham Central Library', 'Royal College of Music Library'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['George Butterworth', 'Ivor Gurney', 'Granville Bantock'],
    works: [
      {
        id: 'fenney-romance-rose',
        title: 'The Romance of the Rose (Tone Poem)',
        yearComposed: 1914,
        premiereInfo: 'Queen’s Hall Promenade Concert, cond. Henry Wood, 1915',
        genre: 'Symphonic Poem',
        instrumentation: 'Full Orchestra with Harp',
        durationApprox: '11 minutes',
        archiveLocation: 'Birmingham Central Library Music Coll.',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A breathtaking, fragile tone poem shimmering with Edwardian wistfulness and gentle romantic beauty.'
      }
    ]
  },
  {
    id: 'jane-joseph',
    name: 'Jane Joseph',
    fullName: 'Jane Marian Joseph',
    birthYear: 1894,
    deathYear: 1929,
    nationality: 'British (English)',
    era: 'Interwar & Beyond (1915-1950)',
    portraitUrl: new URL("../assets/images/portrait_alice_mary_smith_1793641660957.jpg", import.meta.url).href,
    portraitCaption: 'Jane Joseph, c. 1922, St Paul’s Girls’ School archive.',
    shortBio: 'Gustav Holst’s most gifted student and indispensable assistant on "The Planets", who composed vibrant orchestral dances before dying tragically young at 35.',
    detailedBiography: 'Jane Joseph was educated at St Paul’s Girls’ School and Girton College, Cambridge. Gustav Holst considered her his finest pupil, writing: "from the first she showed an individual attitude which was entirely her own." Joseph copied and prepared the orchestral parts for Holst’s "The Planets" and served as principal conductor at Morley College and the Thaxted Festivals. Her orchestral dance "Bergamask" (1924) was hailed by Adrian Boult and Henry Wood.',
    whyForgotten: 'Joseph died of kidney failure in 1929 at only thirty-five years of age. Without her energetic presence, her pioneering works remained largely in handwritten manuscripts and were preserved only in private collections.',
    musicalStyle: 'Rhythmic verve, Tudor modal counterpoint, clean orchestral colors reminiscent of Holst and Vaughan Williams, and vigorous dance energy.',
    influences: ['Gustav Holst', 'William Byrd', 'Thomas Morley'],
    keyArchives: ['St Paul’s Girls’ School Holst Archive', 'Girton College Cambridge'],
    obscurityRank: 'Neglected Pioneer',
    famousContemporaries: ['Gustav Holst', 'Ralph Vaughan Williams', 'Rebecca Clarke'],
    works: [
      {
        id: 'joseph-bergamask',
        title: 'Bergamask for Orchestra',
        yearComposed: 1924,
        premiereInfo: 'Queen’s Hall Promenade Concert, 1926',
        genre: 'Symphonic Poem',
        instrumentation: 'Symphony Orchestra',
        durationApprox: '9 minutes',
        archiveLocation: 'St Paul’s Girls’ School & British Library',
        catalogStatus: 'Fully Typeset',
        summary: 'A brilliant, joyful orchestral dance blending Elizabethan dance meters with modern British vigor.'
      }
    ]
  },
  {
    id: 'ebenezer-prout',
    name: 'Ebenezer Prout',
    fullName: 'Ebenezer Prout',
    birthYear: 1835,
    deathYear: 1909,
    nationality: 'British (English)',
    era: 'Victorian Golden Age (1880-1899)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Professor Ebenezer Prout, Dublin and London.',
    shortBio: 'Legendary author of definitive music theory textbooks who composed four symphonies and concertos championed at Crystal Palace Saturday concerts.',
    detailedBiography: 'Ebenezer Prout was Professor of Composition at the Royal Academy of Music and Professor of Music at the University of Dublin. His treatises on Harmony, Counterpoint, Fugue, and Orchestration were translated into multiple languages and studied by generations of British musicians. Yet Prout was also an immensely accomplished composer: August Manns conducted all four of his symphonies at the Crystal Palace to great public acclaim. His Third Symphony in F (Op. 22) was commissioned for the Birmingham Festival of 1885.',
    whyForgotten: 'Because his textbooks became standard school requirements, 20th-century critics lazily assumed his music must be "dry and pedantic," without ever examining the joyful vitality and melodic inventiveness of his scores.',
    musicalStyle: 'Robust classical-romantic form, sparkling Schumann-like orchestration, impeccable fugal craftsmanship, and delightful humor.',
    influences: ['J.S. Bach', 'Felix Mendelssohn', 'Robert Schumann'],
    keyArchives: ['Royal Academy of Music Library', 'Trinity College Dublin'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Arthur Sullivan', 'Charles Villiers Stanford', 'Alexander Mackenzie'],
    works: [
      {
        id: 'prout-sym-3',
        title: 'Symphony No. 3 in F major',
        yearComposed: 1885,
        premiereInfo: 'Birmingham Triennial Musical Festival, 1885',
        genre: 'Symphony',
        instrumentation: '2 Flutes, 2 Oboes, 2 Clarinets, 2 Bassoons, 4 Horns, 2 Trumpets, 3 Trombones, Timpani, Strings',
        durationApprox: '33 minutes',
        archiveLocation: 'RAM Library MS Prout Coll.',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A masterwork of Victorian symphonism featuring an expansive Allegro, a witty scherzo, and a radiant contrapuntal finale.'
      }
    ]
  },
  {
    id: 'william-henry-reed',
    name: 'William Henry Reed',
    fullName: 'William Henry Reed MVO',
    birthYear: 1875,
    deathYear: 1942,
    nationality: 'British (English)',
    era: 'Edwardian (1900-1914)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'William Henry Reed, leader of the London Symphony Orchestra.',
    shortBio: 'Beloved leader of the London Symphony Orchestra and Elgar’s confidant who advised on the Violin Concerto, whose own sparkling tone poems captivated audiences.',
    detailedBiography: 'Known affectionately throughout the musical world as "Billy" Reed, William Henry Reed studied at the Royal Academy of Music with Emile Sauret and Ebenezer Prout. In 1912 he was appointed leader (concertmaster) of the London Symphony Orchestra, serving until 1935. Reed was Sir Edward Elgar’s closest musical confidant, helping Elgar test and refine the technical passages of the famous Violin Concerto. Reed was also a composer of tremendous wit and flair; his orchestral humoresque "The Lincoln Imp" and symphonic poem "Aesop’s Fables" were frequently programmed at Queen’s Hall.',
    whyForgotten: 'His fame as an orchestra leader and Elgar’s biographer ("Elgar As I Knew Him") completely overshadowed his own original and imaginative orchestral compositions.',
    musicalStyle: 'Sprightly Elgarian swagger, dazzling violin-led orchestration, infectious rhythmic wit, and rich English pastoral color.',
    influences: ['Edward Elgar', 'Ebenezer Prout', 'Richard Strauss'],
    keyArchives: ['Royal College of Music Library', 'Elgar Birthplace Museum Archive'],
    obscurityRank: 'Rediscovered Gem',
    famousContemporaries: ['Edward Elgar', 'Thomas Beecham', 'Henry Wood'],
    works: [
      {
        id: 'reed-lincoln-imp',
        title: 'The Lincoln Imp (Orchestral Humoresque)',
        yearComposed: 1921,
        premiereInfo: 'Three Choirs Festival, Hereford, 1921',
        genre: 'Symphonic Poem',
        instrumentation: 'Full Symphony Orchestra',
        durationApprox: '10 minutes',
        archiveLocation: 'RCM Library MS 4891',
        catalogStatus: 'Fully Typeset',
        summary: 'A mischievous, sparkling orchestral fantasy depicting the legendary demon petrified inside Lincoln Cathedral.'
      }
    ]
  },
  {
    id: 'stanley-wilson',
    name: 'Stanley Herbert Wilson',
    fullName: 'Stanley Herbert Wilson',
    birthYear: 1899,
    deathYear: 1953,
    nationality: 'British (English)',
    era: 'Interwar & Beyond (1915-1950)',
    portraitUrl: new URL("../assets/images/hero_orchestral_archive_1793641658756.jpg", import.meta.url).href,
    portraitCaption: 'Stanley Wilson, Dulwich College director of music.',
    shortBio: 'Carnegie Award-winning composer whose monumental 1927 "A Skye Symphony" captures the desolate volcanic crags and seascapes of the Hebrides.',
    detailedBiography: 'Stanley Herbert Wilson won an open scholarship to the Royal College of Music, studying with Sir Charles Villiers Stanford and Sir Adrian Boult. In 1929 he was appointed Director of Music at Dulwich College. In 1927 his Symphony No. 1, "A Skye Symphony" (Op. 38), won the prestigious Carnegie Collection of British Music award. It is an extraordinary work of dark grandeur, depicting the Cuillin mountains and the Atlantic gales with orchestral mastery.',
    whyForgotten: 'The Carnegie Collection printings ceased after World War II, leaving Wilson’s scores out of print and unavailable to modern orchestras.',
    musicalStyle: 'Expansive Nordic-Celtic atmosphere, brooding brass sonorities, and modal chromaticism reminiscent of Sibelius and Arnold Bax.',
    influences: ['Charles Villiers Stanford', 'Jean Sibelius', 'Arnold Bax'],
    keyArchives: ['Royal College of Music Library', 'Dulwich College Archives'],
    obscurityRank: 'Unsung Master',
    famousContemporaries: ['Arnold Bax', 'Arthur Bliss', 'William Walton'],
    works: [
      {
        id: 'wilson-skye-symphony',
        title: 'Symphony No. 1 "A Skye Symphony"',
        yearComposed: 1927,
        premiereInfo: 'Bournemouth Symphony Orchestra, cond. Dan Godfrey, 1928',
        genre: 'Symphony',
        instrumentation: 'Large Symphony Orchestra with Triple Woodwind & Organ',
        durationApprox: '36 minutes',
        archiveLocation: 'RCM Carnegie Collection & Dulwich MS',
        catalogStatus: 'Archival Manuscript Only',
        summary: 'A breathtaking, cinematic Scottish symphony portraying the Isle of Skye, from the eerie Quiraing to stormy sea cliffs.'
      }
    ]
  }
];


export const TASTE_COMPARISONS: {
  id: string;
  famousWork: string;
  famousComposer: string;
  recommendedComposerId: string;
  recommendedWorkId: string;
  matchReason: string;
}[] = [
  {
    id: 'tc-1',
    famousWork: 'Brahms: Symphony No. 1 & No. 4',
    famousComposer: 'Johannes Brahms',
    recommendedComposerId: 'harvey-lohr',
    recommendedWorkId: 'lohr-sym-3',
    matchReason: 'Harvey Löhr’s Symphony No. 3 shares Brahms’s structural muscularity, dark minor-key string agitation, and heroic contrapuntal climaxes.'
  },
  {
    id: 'tc-2',
    famousWork: 'Mendelssohn: "Scottish" & "Italian" Symphonies',
    famousComposer: 'Felix Mendelssohn',
    recommendedComposerId: 'alice-mary-smith',
    recommendedWorkId: 'smith-sym-c-minor',
    matchReason: 'Alice Mary Smith inherited Mendelssohn’s gossamer woodwind transparency and kinetic rhythmic vitality, infused with British dramatic nobility.'
  },
  {
    id: 'tc-3',
    famousWork: 'Grieg & Schumann: Piano Concertos',
    famousComposer: 'Edvard Grieg / Robert Schumann',
    recommendedComposerId: 'percy-sherwood',
    recommendedWorkId: 'sherwood-piano-concerto-1',
    matchReason: 'Sherwood’s C minor Piano Concerto pairs thunderous octaves with deeply poetic German-Romantic introspection, echoing Schumann’s Florestan and Eusebius.'
  },
  {
    id: 'tc-4',
    famousWork: 'Sibelius: Symphony No. 5 & Bax: Tintagel',
    famousComposer: 'Jean Sibelius / Arnold Bax',
    recommendedComposerId: 'ernest-bryson',
    recommendedWorkId: 'bryson-sym-2',
    matchReason: 'Bryson’s "The Stranger" creates that same vast, wind-swept northern landscape with brooding bass registers and solitary mystical woodwind calls.'
  },
  {
    id: 'tc-5',
    famousWork: 'Elgar: Enigma Variations & Pomp and Circumstance',
    famousComposer: 'Edward Elgar',
    recommendedComposerId: 'walford-davies',
    recommendedWorkId: 'davies-big-ben',
    matchReason: 'Walford Davies was Elgar’s close friend and successor as Master of the King’s Musick; "Big Ben Looks On" carries that unmistakable golden Edwardian swagger and heartfelt lyricism.'
  },
  {
    id: 'tc-6',
    famousWork: 'Saint-Saëns: Piano Concerto No. 2',
    famousComposer: 'Camille Saint-Saëns',
    recommendedComposerId: 'dora-bright',
    recommendedWorkId: 'bright-piano-concerto-1',
    matchReason: 'Dora Bright’s sparkling keyboard agility, witty thematic twists, and light orchestral sparkle echo the charm and technical brilliance of Saint-Saëns.'
  }
];
