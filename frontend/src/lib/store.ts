import { create } from 'zustand';
import type { EyeTrackerStatus, Group, LogEvent, Phase } from '@/lib/types';

export type AppState = {
  participantId?: string;
  group?: Group;
  phase?: Phase;
  eyeTrackerStatus: EyeTrackerStatus;
  currentPassageId?: string;
  currentAnalogId?: string;
  logs: LogEvent[];
  setParticipant: (id: string | undefined) => void;
  setGroup: (group: Group | undefined) => void;
  setPhase: (phase: Phase | undefined) => void;
  setEyeTrackerStatus: (status: EyeTrackerStatus) => void;
  setPassage: (id: string | undefined) => void;
  setAnalog: (id: string | undefined) => void;
  pushLog: (event: Omit<LogEvent, 'timestamp' | 'participantId' | 'group' | 'phase'>) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  participantId: undefined,
  group: undefined,
  phase: undefined,
  eyeTrackerStatus: 'disconnected',
  currentPassageId: undefined,
  currentAnalogId: undefined,
  logs: [],

  setParticipant: (id) => set({ participantId: id }),
  setGroup: (group) => set({ group }),
  setPhase: (phase) => set({ phase }),
  setEyeTrackerStatus: (status) => set({ eyeTrackerStatus: status }),
  setPassage: (id) => set({ currentPassageId: id }),
  setAnalog: (id) => set({ currentAnalogId: id }),

  pushLog: (event) => {
    const { participantId, group, phase } = get();
    const log: LogEvent = {
      timestamp: new Date().toISOString(),
      participantId,
      group,
      phase,
      ...event,
    };
    set((state) => ({ logs: [...state.logs, log] }));
    // For now, also print to console for visibility.
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[log]', log);
    }
  },

  reset: () =>
    set({
      participantId: undefined,
      group: undefined,
      phase: undefined,
      eyeTrackerStatus: 'disconnected',
      currentPassageId: undefined,
      currentAnalogId: undefined,
      logs: [],
    }),
}));
