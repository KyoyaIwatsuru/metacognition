'use client';

import { invoke } from '@tauri-apps/api/core';
import { homeDir, join } from '@tauri-apps/api/path';
import type { LogEvent } from '@/lib/types';

let logPathPromise: Promise<string | null> | null = null;
let tauriChecked = false;
let tauriAvailable = false;

function isTauri(): boolean {
  if (tauriChecked) return tauriAvailable;
  tauriChecked = true;
  if (typeof window === 'undefined') {
    tauriAvailable = false;
    return tauriAvailable;
  }
  const w = window as unknown as Record<string, unknown>;
  tauriAvailable =
    '__TAURI__' in w ||
    '__TAURI_INTERNALS__' in w ||
    '__TAURI_IPC__' in w ||
    '__TAURI_METADATA__' in w;
  if (!tauriAvailable && process.env.NODE_ENV !== 'production') {
    console.debug('[log bridge] Tauri APIs not detected, skipping file logging');
  }
  return tauriAvailable;
}

async function ensureLogPath(seed?: LogEvent): Promise<string | null> {
  if (logPathPromise) return logPathPromise;
  logPathPromise = (async () => {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const participant = seed?.participantId;
    const phase = seed?.phase;
    // 参加者/フェーズ未設定ならまだファイルを作らない
    if (!participant || !phase) return null;
    const base = await homeDir();
    const logDir = await join(base, 'metacognition', 'logs');
    return join(logDir, `${participant}-${phase}-${ts}.jsonl`);
  })();
  return logPathPromise;
}

export async function appendLogLine(log: LogEvent) {
  if (!isTauri()) return;
  try {
    const path = await ensureLogPath(log);
    if (!path) return;
    const line = JSON.stringify(log);
    await invoke('append_log_line', { path, line });
  } catch (error) {
    // DEV 時にのみ詳細を出す
    console.warn('append_log_line failed', error);
  }
}

/**
 * ログファイルパスをリセットする（新しい参加者/フェーズ開始時に呼ぶ）。
 */
export function resetLogPath() {
  logPathPromise = null;
}
