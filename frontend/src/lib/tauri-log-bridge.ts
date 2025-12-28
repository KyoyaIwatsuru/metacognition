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

/**
 * Determine the phase folder name from the phase string and optional trainingSet
 */
function getPhaseFolder(phase: string, trainingSet?: string): string {
  // training with number: training1, training2, training3
  const trainingMatch = phase.match(/training(\d+)/);
  if (trainingMatch) {
    return `training${trainingMatch[1]}`;
  }
  // pre, post - use as-is
  if (phase === 'pre' || phase === 'post') {
    return phase;
  }
  // For 'training' phase, use trainingSet if available
  if (phase === 'training') {
    if (trainingSet) {
      return `training${trainingSet}`;
    }
    return 'training1';
  }
  return phase;
}

async function ensureLogPath(seed?: LogEvent): Promise<string | null> {
  if (logPathPromise) return logPathPromise;
  logPathPromise = (async () => {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const participant = seed?.participantId;
    const phase = seed?.phase;
    const groupLetter = seed?.groupLetter;
    const trainingSet = seed?.trainingSet;
    // 参加者/フェーズ/グループ未設定ならまだファイルを作らない
    if (!participant || !phase || !groupLetter) return null;

    const phaseFolder = getPhaseFolder(phase, trainingSet);

    const base = await homeDir();
    // Path structure: metacognition/{groupLetter}/{participant}/{phase}/logs/events_{timestamp}.jsonl
    const logDir = await join(base, 'metacognition', groupLetter, participant, phaseFolder, 'logs');
    return join(logDir, `events_${ts}.jsonl`);
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
