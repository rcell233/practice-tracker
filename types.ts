export enum Instrument {
  Drums = 'Drums',
  Guitar = 'Guitar',
  Bass = 'Bass',
  Saxophone = 'Saxophone',
  Flute = 'Flute',
  Piano = 'Piano',
  Violin = 'Violin',
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  instruments: Instrument[];
}

export interface PracticeLog {
  id: string;
  userId: string;
  instrument: Instrument;
  durationMinutes: number;
  timestamp: number; // Date.now()
}

export enum TimeFrame {
  Day = 'Today',
  Week = 'This Week',
  Month = 'This Month',
  All = 'All Time'
}

export enum View {
  Leaderboard = 'leaderboard',
  CheckIn = 'checkin',
  Profile = 'profile',
  Auth = 'auth'
}