export interface HerveyWork {
  id: string;
  title: string;
  date: string;
  hasDedicatedPage?: boolean;
  isLost?: boolean;
}

export const ARTHUR_HERVEY_ORCHESTRAL_WORKS: HerveyWork[] = [
  { id: 'love-and-fate', title: 'Love and Fate — dramatic overture', date: '1890', isLost: false },
  { id: 'two-tone-pictures', title: 'Two tone pictures:  1. On the Heights 2. On the March', date: '1902', isLost: false },
  { id: 'youth', title: 'Youth — concert overture', date: '1902', isLost: false },
  { id: 'in-the-east', title: 'In the East — symphonic poem', date: '1904', isLost: false },
  { id: 'summer', title: 'Summer — tone poem', date: '1907', hasDedicatedPage: true, isLost: false },
  { id: 'prelude-to-ilona', title: 'Prelude to Ilona', date: '1907', isLost: false },
  { id: 'life-moods', title: 'Life Moods — symphonic variations', date: '1910', isLost: false },
];

