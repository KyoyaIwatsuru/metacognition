import { logEvent } from '@/lib/logger';
import { useAppStore } from '@/lib/store';

const BASE = 'http://10.20.0.255:8765';

type FetchResult = { ok: true; body: string; data?: unknown } | { ok: false; error: string };

async function get(path: string): Promise<FetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${BASE}${path}`, { method: 'GET', signal: controller.signal });
    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      /* ignore parse error */
    }
    if (!res.ok) {
      const message = data?.message ?? text ?? 'unknown error';
      return { ok: false, error: `HTTP ${res.status}: ${message}` };
    }
    return { ok: true, body: text, data };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

async function getStatus() {
  const res = await get('/tobii_pro/status/');
  if (!res.ok) return res;
  const data = (res.data ?? {}) as { is_connected?: boolean; is_supported?: boolean };
  const connected = Boolean(data.is_connected);
  const supported = Boolean(data.is_supported);
  return { ok: true as const, connected, supported };
}

export async function connectEyeTracker() {
  const { setEyeTrackerStatus } = useAppStore.getState();
  setEyeTrackerStatus('loading');

  // すでに接続済みなら成功扱い
  const status = await getStatus();
  if (status.ok && status.connected) {
    setEyeTrackerStatus('connected');
    logEvent({ event: 'eyetracker_connect' });
    return { ok: true };
  }

  const res = await get('/tobii_pro/connect/');
  if (res.ok) {
    setEyeTrackerStatus('connected');
    logEvent({ event: 'eyetracker_connect' });
    return { ok: true };
  }

  setEyeTrackerStatus('disconnected');
  return { ok: false, error: res.error };
}

export async function disconnectEyeTracker() {
  const { setEyeTrackerStatus } = useAppStore.getState();
  setEyeTrackerStatus('loading');

  // 未接続ならそのまま成功扱い
  const status = await getStatus();
  if (status.ok && !status.connected) {
    setEyeTrackerStatus('disconnected');
    return { ok: true };
  }

  const res = await get('/tobii_pro/disconnect/');
  const statusAfter = await getStatus();
  const isDisconnected = statusAfter.ok ? !statusAfter.connected : false;

  setEyeTrackerStatus('disconnected');
  if (res.ok || isDisconnected) {
    logEvent({ event: 'eyetracker_disconnect' });
    return { ok: true };
  }
  return { ok: false, error: res.error };
}

export async function startRecording() {
  const res = await get('/recording/start');
  if (res.ok) {
    logEvent({ event: 'eyetracker_recording_start' });
    return { ok: true };
  }
  return { ok: false, error: res.error };
}

export async function stopRecording() {
  const res = await get('/recording/stop');
  if (res.ok) {
    logEvent({ event: 'eyetracker_recording_stop' });
    return { ok: true };
  }
  return { ok: false, error: res.error };
}
