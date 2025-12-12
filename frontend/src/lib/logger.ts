import { appendLogLine } from '@/lib/tauri-log-bridge';
import { useAppStore } from '@/lib/store';
import type { LogEvent } from '@/lib/types';

export function logEvent(event: Omit<LogEvent, 'timestamp' | 'participantId' | 'group' | 'phase'>) {
  const pushLog = useAppStore.getState().pushLog;
  const log = pushLog(event);
  void appendLogLine(log);
}
