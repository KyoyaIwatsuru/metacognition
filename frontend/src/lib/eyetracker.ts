import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';

const BASE = 'http://localhost:8765';

async function get(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${BASE}${path}`, { method: 'GET', signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function connectEyeTracker() {
  const { setEyeTrackerStatus } = useAppStore.getState();
  setEyeTrackerStatus('loading');
  try {
    await get('/tobii_pro/connect/');
    setEyeTrackerStatus('connected');
    logEvent({ event: 'eyetracker_connect' });
    return { ok: true };
  } catch (error) {
    setEyeTrackerStatus('disconnected');
    return { ok: false, error } as const;
  }
}

export async function disconnectEyeTracker() {
  const { setEyeTrackerStatus } = useAppStore.getState();
  setEyeTrackerStatus('loading');
  try {
    await get('/tobii_pro/disconnect/');
    setEyeTrackerStatus('disconnected');
    logEvent({ event: 'eyetracker_disconnect' });
    return { ok: true };
  } catch (error) {
    setEyeTrackerStatus('disconnected');
    return { ok: false, error } as const;
  }
}

export async function startRecording() {
  try {
    await get('/recording/start');
    logEvent({ event: 'eyetracker_recording_start' });
    return { ok: true };
  } catch (error) {
    return { ok: false, error } as const;
  }
}

export async function stopRecording() {
  try {
    await get('/recording/stop');
    logEvent({ event: 'eyetracker_recording_stop' });
    return { ok: true };
  } catch (error) {
    return { ok: false, error } as const;
  }
}
