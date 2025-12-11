export type Phase = 'pre' | 'training' | 'post';
export type Group = 'A' | 'B';
export type EyeTrackerStatus = 'disconnected' | 'connected' | 'loading';

export type LogEvent = {
  timestamp: string;
  participantId?: string;
  group?: Group;
  phase?: Phase;
  event: string;
  [key: string]: unknown;
};
