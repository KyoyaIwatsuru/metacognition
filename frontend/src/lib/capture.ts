const CAPTURE_ENDPOINT = 'http://localhost:8765/recording/capture';

const DEFAULT_DELAY_MS = 500;

/**
 * Send a capture request to the backend to take a screenshot.
 * This is called when each page starts to capture the initial screen state.
 * A delay is applied to ensure the page is fully rendered before capturing.
 */
export async function captureScreen(delayMs: number = DEFAULT_DELAY_MS): Promise<void> {
  // Wait for the page to fully render before capturing
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  try {
    await fetch(CAPTURE_ENDPOINT, { method: 'GET' });
  } catch (error) {
    // Silently fail if the capture endpoint is not available
    console.debug('[capture] Failed to capture screen:', error);
  }
}
