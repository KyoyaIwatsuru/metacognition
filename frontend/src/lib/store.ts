import { create } from 'zustand';
import { resetLogPath } from '@/lib/tauri-log-bridge';
import type { EyeTrackerStatus, Group, LogEvent, Phase } from '@/lib/types';

export type AppState = {
  participantId?: string;
  group?: Group;
  phase?: Phase;
  eyeTrackerStatus: EyeTrackerStatus;
  currentPassageId?: string;
  currentAnalogId?: string;
  trainingResults: Record<
    string,
    { answers: Record<string, string | undefined>; allCorrect: boolean }
  >;
  analogResults: Record<string, Record<string, string | undefined>>;
  logs: LogEvent[];
  setParticipant: (id: string | undefined) => void;
  setGroup: (group: Group | undefined) => void;
  setPhase: (phase: Phase | undefined) => void;
  setEyeTrackerStatus: (status: EyeTrackerStatus) => void;
  setPassage: (id: string | undefined) => void;
  setAnalog: (id: string | undefined) => void;
  setTrainingResult: (
    passageId: string,
    result: { answers: Record<string, string | undefined>; allCorrect: boolean }
  ) => void;
  setAnalogResult: (analogId: string, answers: Record<string, string | undefined>) => void;
  pushLog: (event: Omit<LogEvent, 'timestamp' | 'participantId' | 'group' | 'phase'>) => LogEvent;
  reset: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  participantId: undefined,
  group: undefined,
  phase: undefined,
  eyeTrackerStatus: 'disconnected',
  currentPassageId: undefined,
  currentAnalogId: undefined,
  trainingResults: {},
  analogResults: {},
  logs: [],

  setParticipant: (id) =>
    set(() => {
      resetLogPath();
      return { participantId: id };
    }),
  setGroup: (group) => set({ group }),
  setPhase: (phase) =>
    set(() => {
      resetLogPath();
      return { phase };
    }),
  setEyeTrackerStatus: (status) => set({ eyeTrackerStatus: status }),
  setPassage: (id) => set({ currentPassageId: id }),
  setAnalog: (id) => set({ currentAnalogId: id }),
  setTrainingResult: (passageId, result) =>
    set((state) => ({
      trainingResults: { ...state.trainingResults, [passageId]: result },
    })),
  setAnalogResult: (analogId, answers) =>
    set((state) => ({
      analogResults: { ...state.analogResults, [analogId]: answers },
    })),

  pushLog: (event) => {
    const { participantId, group, phase } = get();
    const log: LogEvent = {
      timestamp: new Date().toISOString(),
      participantId,
      group,
      phase,
      ...event,
      event: typeof event.event === 'string' ? event.event : String(event.event ?? 'unknown'),
    };
    set((state) => ({ logs: [...state.logs, log] }));
    // For now, also print to console for visibility.
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[log]', log);
    }
    return log;
  },

  reset: () =>
    set(() => {
      resetLogPath();
      return {
        participantId: undefined,
        group: undefined,
        phase: undefined,
        eyeTrackerStatus: 'disconnected',
        currentPassageId: undefined,
        currentAnalogId: undefined,
        trainingResults: {},
        analogResults: {},
        logs: [],
      };
    }),
}));
