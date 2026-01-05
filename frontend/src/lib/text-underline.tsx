import React from 'react';

/**
 * Renders text with specified substrings underlined.
 * @param text - The full text to render
 * @param underlineTexts - Array of substrings to underline
 * @returns React node with underlined portions
 */
export function renderTextWithUnderlines(text: string, underlineTexts: string[]): React.ReactNode {
  if (!underlineTexts || underlineTexts.length === 0 || !text) {
    return text;
  }

  // Sort by length (longest first) to avoid partial matches
  const sortedTexts = [...underlineTexts]
    .filter((t) => t && t.length > 0)
    .sort((a, b) => b.length - a.length);

  if (sortedTexts.length === 0) {
    return text;
  }

  // Build a combined pattern (escape special regex characters)
  const escapedTexts = sortedTexts.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escapedTexts.join('|')})`, 'g');

  const parts = text.split(pattern);

  // If no split occurred, return original text
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    const isUnderlined = sortedTexts.some((t) => t === part);
    if (isUnderlined) {
      return (
        <span key={index} className="underline decoration-2 underline-offset-2">
          {part}
        </span>
      );
    }
    return part;
  });
}
