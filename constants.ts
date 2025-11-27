import { Instrument, User, PracticeLog } from './types';

export const INSTRUMENT_ICONS: Record<Instrument, string> = {
  [Instrument.Drums]: '🥁',
  [Instrument.Guitar]: '🎸',
  [Instrument.Bass]: '🎸',
  [Instrument.Saxophone]: '🎷',
  [Instrument.Flute]: '🎵',
  [Instrument.Piano]: '🎹',
  [Instrument.Violin]: '🎻',
};

// Helper to get past timestamps
const daysAgo = (days: number) => Date.now() - days * 24 * 60 * 60 * 1000;

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'RhythmMaster',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
    instruments: [Instrument.Drums, Instrument.Piano],
  },
  {
    id: 'u2',
    username: 'JazzCat',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    instruments: [Instrument.Saxophone, Instrument.Piano],
  },
  {
    id: 'u3',
    username: 'BassFace',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    instruments: [Instrument.Bass],
  },
  {
    id: 'u4',
    username: 'Shredder',
    avatarUrl: 'https://picsum.photos/100/100?random=4',
    instruments: [Instrument.Guitar, Instrument.Violin],
  },
  {
    id: 'u5',
    username: 'MelodyMaker',
    avatarUrl: 'https://picsum.photos/100/100?random=5',
    instruments: [Instrument.Flute, Instrument.Piano],
  },
];

export const MOCK_LOGS: PracticeLog[] = [
  // Today
  { id: 'l1', userId: 'u1', instrument: Instrument.Drums, durationMinutes: 45, timestamp: Date.now() - 1000 * 60 * 30 },
  { id: 'l2', userId: 'u2', instrument: Instrument.Saxophone, durationMinutes: 60, timestamp: Date.now() - 1000 * 60 * 120 },
  { id: 'l3', userId: 'u4', instrument: Instrument.Guitar, durationMinutes: 30, timestamp: Date.now() - 1000 * 60 * 10 },
  
  // This Week
  { id: 'l4', userId: 'u1', instrument: Instrument.Piano, durationMinutes: 120, timestamp: daysAgo(2) },
  { id: 'l5', userId: 'u3', instrument: Instrument.Bass, durationMinutes: 90, timestamp: daysAgo(3) },
  { id: 'l6', userId: 'u4', instrument: Instrument.Violin, durationMinutes: 45, timestamp: daysAgo(1) },
  { id: 'l7', userId: 'u5', instrument: Instrument.Flute, durationMinutes: 15, timestamp: daysAgo(4) },

  // This Month
  { id: 'l8', userId: 'u2', instrument: Instrument.Piano, durationMinutes: 200, timestamp: daysAgo(10) },
  { id: 'l9', userId: 'u3', instrument: Instrument.Bass, durationMinutes: 300, timestamp: daysAgo(15) },
  { id: 'l10', userId: 'u5', instrument: Instrument.Piano, durationMinutes: 180, timestamp: daysAgo(20) },
];