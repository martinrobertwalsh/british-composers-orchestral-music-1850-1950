export interface GodfreyWork {
  id: string;
  title: string;
  date: string;
  genre: string;
  hasDedicatedPage?: boolean;
  isLost?: boolean;
  toFollow?: boolean;
}

export const PERCY_GODFREY_ORCHESTRAL_WORKS: GodfreyWork[] = [
  { id: 'coronation-march', title: 'Coronation March', date: '1902', genre: 'Ceremonial March', hasDedicatedPage: true, isLost: false },
  { id: 'symphony-4-e', title: 'Symphony No. 4 in E', date: '1928', genre: 'Symphony', isLost: false, toFollow: true },
  { id: 'woodlanders-suite', title: 'Scenes from The Woodlanders, ballet suite after Thomas Hardy', date: '1944', genre: 'Ballet Suite', isLost: false },
];

