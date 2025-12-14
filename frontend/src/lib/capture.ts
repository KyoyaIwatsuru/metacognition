const CAPTURE_ENDPOINT = 'http://localhost:8765/recording/capture';

/**
 * Send a capture request to the backend to take a screenshot.
 * This is called when each page starts to capture the initial screen state.
 */
export async function captureScreen(): Promise<void> {
  try {
    await fetch(CAPTURE_ENDPOINT, { method: 'GET' });
  } catch (error) {
    // Silently fail if the capture endpoint is not available
    console.debug('[capture] Failed to capture screen:', error);
  }
}
