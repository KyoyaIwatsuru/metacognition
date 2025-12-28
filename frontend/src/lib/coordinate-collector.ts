/**
 * Coordinate collection utilities for eye-tracking analysis
 */

export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BBoxLines = {
  lines: BBox[];
  text?: string;
};

export type WordCoordinates = {
  word_index: number;
  text: string;
  bbox: BBox;
};

export type SentenceCoordinates = {
  sentence_index: number;
  text: string;
  lines: BBox[];
  words: WordCoordinates[];
};

export type ParagraphCoordinates = {
  paragraph_index: number;
  text: string;
  lines: BBox[];
  sentences: SentenceCoordinates[];
};

export type PassageMetadata = {
  metadata_type: string;
  label: BBox[] | null;
  label_text: string | null;
  value: BBox[];
  value_text: string;
};

export type TableCellCoordinates = {
  row_index: number;
  cell_index: number;
  bbox: BBox | null;
  text: string;
};

export type TableCoordinates = {
  headers: Array<{ header_index: number; bbox: BBox | null; text: string }>;
  cells: TableCellCoordinates[];
};

export type PassageCoordinates = {
  passage_index: number;
  title: BBoxLines | null;
  subtitle: BBoxLines | null;
  metadata: PassageMetadata[] | null;
  paragraphs: ParagraphCoordinates[];
  table: TableCoordinates | null;
};

/**
 * Convert a DOMRect to a simple BBox object
 */
function domRectToBBox(rect: DOMRect): BBox {
  return {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

/**
 * Merge bboxes that are on the same line (same y coordinate)
 */
function mergeSameLineBBoxes(bboxes: BBox[]): BBox[] {
  if (bboxes.length === 0) return [];

  // Group bboxes by y coordinate (with small tolerance for floating point)
  const lines: Map<number, BBox[]> = new Map();

  bboxes.forEach((bbox) => {
    // Find existing line with same y (within 2px tolerance)
    let foundLine = false;
    for (const [y, lineBBoxes] of lines.entries()) {
      if (Math.abs(y - bbox.y) <= 2) {
        lineBBoxes.push(bbox);
        foundLine = true;
        break;
      }
    }
    if (!foundLine) {
      lines.set(bbox.y, [bbox]);
    }
  });

  // Merge bboxes on each line
  const result: BBox[] = [];
  for (const lineBBoxes of lines.values()) {
    if (lineBBoxes.length === 1) {
      result.push(lineBBoxes[0]);
    } else {
      // Sort by x coordinate
      lineBBoxes.sort((a, b) => a.x - b.x);
      const first = lineBBoxes[0];
      const last = lineBBoxes[lineBBoxes.length - 1];
      result.push({
        x: first.x,
        y: first.y,
        width: last.x + last.width - first.x,
        height: Math.max(...lineBBoxes.map((b) => b.height)),
      });
    }
  }

  // Sort by y coordinate (top to bottom)
  result.sort((a, b) => a.y - b.y);
  return result;
}

/**
 * Check if an element or any of its ancestors has visibility: hidden
 */
function isHiddenElement(node: Node): boolean {
  let current: Node | null = node;
  while (current && current.nodeType !== Node.DOCUMENT_NODE) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as HTMLElement;
      const style = window.getComputedStyle(el);
      if (style.visibility === 'hidden') {
        return true;
      }
    }
    current = current.parentNode;
  }
  return false;
}

/**
 * Get line-by-line bounding boxes for multi-line text elements
 * Uses Range.getClientRects() to get each line's bbox
 * Merges bboxes on the same line (handles multiple text nodes)
 *
 * Hidden element handling:
 * - If target element itself is hidden: include all its text (intentional coordinate collection element)
 * - If target element is visible: exclude text inside hidden descendants
 */
export function getTextLines(element: HTMLElement | null): BBox[] {
  if (!element) return [];

  // Check if the target element itself is hidden
  // If so, this is an intentionally hidden coordinate collection element
  // and we should include all its text
  const elementStyle = window.getComputedStyle(element);
  const targetIsHidden = elementStyle.visibility === 'hidden';

  // Collect text nodes
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();
  while (node) {
    if (node.textContent?.trim()) {
      // If target is hidden, include all text
      // If target is visible, exclude text in hidden descendants
      if (targetIsHidden || !isHiddenElement(node)) {
        textNodes.push(node as Text);
      }
    }
    node = walker.nextNode();
  }

  if (textNodes.length === 0) {
    return [];
  }

  // Get rects for each text node
  const allRects: DOMRect[] = [];
  for (const textNode of textNodes) {
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const rects = Array.from(range.getClientRects());
    allRects.push(...rects);
  }

  if (allRects.length === 0) {
    // Fallback to element bbox
    const rect = element.getBoundingClientRect();
    return [domRectToBBox(rect)];
  }

  const bboxes = allRects.map(domRectToBBox);
  return mergeSameLineBBoxes(bboxes);
}

/**
 * Get bounding box for a single element
 */
export function getElementBBox(element: HTMLElement | null): BBox | null {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return domRectToBBox(rect);
}

/**
 * Split text into sentences
 * Handles common abbreviations like A.M., P.M., Mr., Mrs., etc.
 */
export function splitIntoSentences(text: string): string[] {
  if (!text.trim()) return [];

  // Common abbreviations that should not be treated as sentence endings
  const abbreviations =
    /(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|inc|corp|ltd|co|dept|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Mon|Tue|Wed|Thu|Fri|Sat|Sun|St|Ave|Blvd|Rd|A\.M|P\.M|a\.m|p\.m)\./gi;

  // Temporarily replace abbreviations with unique placeholders
  const placeholder = '\u0000';
  let tempText = text;
  const replacements: string[] = [];

  tempText = tempText.replace(abbreviations, (match) => {
    replacements.push(match);
    return placeholder;
  });

  // Find sentence boundaries: . ! ? followed by space or end of string
  const sentences: string[] = [];
  let startIndex = 0;

  for (let i = 0; i < tempText.length; i++) {
    const char = tempText[i];

    // Check if this is a sentence-ending punctuation
    // English: . ! ? (requires space/newline after)
    // Japanese: 。 ！ ？ (no space required after)
    const isEnglishPunctuation = char === '.' || char === '!' || char === '?';
    const isJapanesePunctuation = char === '。' || char === '！' || char === '？';

    if (isEnglishPunctuation || isJapanesePunctuation) {
      const nextChar = i + 1 < tempText.length ? tempText[i + 1] : null;

      // For English punctuation, require space/newline/end after
      // For Japanese punctuation, always treat as sentence boundary
      const isSentenceBoundary =
        isJapanesePunctuation ||
        nextChar === null ||
        nextChar === ' ' ||
        nextChar === '\t' ||
        nextChar === '\n';

      if (isSentenceBoundary) {
        // This is a sentence boundary
        const sentence = tempText.substring(startIndex, i + 1).trim();
        if (sentence) {
          sentences.push(sentence);
        }

        // Move start index to next non-whitespace character
        startIndex = i + 1;
        while (startIndex < tempText.length && /\s/.test(tempText[startIndex])) {
          startIndex++;
        }
        i = startIndex - 1; // Will be incremented by loop
      }
    }
  }

  // Add any remaining text as the last sentence
  if (startIndex < tempText.length) {
    const lastSentence = tempText.substring(startIndex).trim();
    if (lastSentence) {
      sentences.push(lastSentence);
    }
  }

  // If no sentences found, treat entire text as one sentence
  if (sentences.length === 0) {
    return [text.trim()];
  }

  // Restore abbreviations in each sentence
  let replacementIndex = 0;
  const result = sentences.map((s) => {
    let restored = s;
    while (restored.includes(placeholder) && replacementIndex < replacements.length) {
      restored = restored.replace(placeholder, replacements[replacementIndex++]);
    }
    return restored;
  });

  return result;
}

/**
 * Split text into words
 * Splits on whitespace
 */
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

/**
 * Helper function to find text position in element considering all text nodes
 */
function findTextPosition(
  element: HTMLElement,
  targetIndex: number
): { node: Node; offset: number } | null {
  let currentIndex = 0;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  let lastNode: Node | null = null;
  let node: Node | null = walker.nextNode();

  while (node) {
    lastNode = node;
    const textLength = node.textContent?.length || 0;

    // Check if target is within this node
    if (currentIndex + textLength > targetIndex) {
      return { node, offset: targetIndex - currentIndex };
    }

    // Check if target is exactly at the end of this node
    if (currentIndex + textLength === targetIndex) {
      return { node, offset: textLength };
    }

    currentIndex += textLength;
    node = walker.nextNode();
  }

  // If targetIndex is at or beyond the end, return the end of the last node
  if (lastNode && currentIndex === targetIndex) {
    return { node: lastNode, offset: lastNode.textContent?.length || 0 };
  }

  return null;
}

/**
 * Extract coordinates for a paragraph with sentence and word breakdown
 */
export function extractParagraphCoordinates(
  element: HTMLElement | null,
  paragraphIndex: number
): ParagraphCoordinates | null {
  if (!element) return null;

  const text = element.textContent?.trim() || '';
  if (!text) return null;

  // Get paragraph-level line bboxes
  const paragraphLines = getTextLines(element);

  // Split into sentences
  const sentenceTexts = splitIntoSentences(text);

  const sentences: SentenceCoordinates[] = [];

  let currentCharIndex = 0;

  sentenceTexts.forEach((sentenceText, sentenceIndex) => {
    const sentenceStartIndex = text.indexOf(sentenceText, currentCharIndex);

    // Debug: log if sentence not found
    if (sentenceStartIndex === -1) {
      console.warn('[extractParagraph] Sentence not found:', {
        sentenceIndex,
        sentenceText,
        currentCharIndex,
        originalText: text,
      });
      return;
    }

    const sentenceEndIndex = sentenceStartIndex + sentenceText.length;

    // Create range for this sentence
    const range = document.createRange();

    try {
      const startPos = findTextPosition(element, sentenceStartIndex);
      const endPos = findTextPosition(element, sentenceEndIndex);

      if (startPos && endPos) {
        range.setStart(startPos.node, startPos.offset);
        range.setEnd(endPos.node, endPos.offset);

        // Get sentence line bboxes (convert DOMRect to BBox)
        const sentenceRects = Array.from(range.getClientRects()).map(domRectToBBox);
        const sentenceLines = mergeSameLineBBoxes(sentenceRects);

        // Split sentence into words
        const wordTexts = splitIntoWords(sentenceText);
        const words: WordCoordinates[] = [];

        let wordStartIndex = sentenceStartIndex;

        wordTexts.forEach((wordText, wordIndex) => {
          const wordStart = text.indexOf(wordText, wordStartIndex);
          const wordEnd = wordStart + wordText.length;

          // Create range for this word
          const wordRange = document.createRange();
          try {
            const wordStartPos = findTextPosition(element, wordStart);
            const wordEndPos = findTextPosition(element, wordEnd);

            if (wordStartPos && wordEndPos) {
              wordRange.setStart(wordStartPos.node, wordStartPos.offset);
              wordRange.setEnd(wordEndPos.node, wordEndPos.offset);

              const wordRect = wordRange.getBoundingClientRect();
              words.push({
                word_index: wordIndex,
                text: wordText,
                bbox: domRectToBBox(wordRect),
              });
            }

            wordStartIndex = wordEnd;
          } catch (e) {
            console.warn('Failed to get word bbox:', e);
          }
        });

        sentences.push({
          sentence_index: sentenceIndex,
          text: sentenceText,
          lines: sentenceLines,
          words,
        });
      }
    } catch (e) {
      console.warn('[extractParagraph] Failed to get sentence bbox:', {
        paragraphIndex,
        sentenceIndex,
        sentenceText,
        error: e,
      });
    }

    currentCharIndex = sentenceEndIndex;
  });

  return {
    paragraph_index: paragraphIndex,
    text,
    lines: paragraphLines,
    sentences,
  };
}

/**
 * Collect coordinates from a simple text element (instruction, title, etc.)
 * Returns both line coordinates and text content
 */
export function collectTextCoordinates(element: HTMLElement | null): BBoxLines | null {
  if (!element) return null;
  const lines = getTextLines(element);
  const text = element.textContent?.trim() || '';
  return lines.length > 0 ? { lines, text } : null;
}

/**
 * Collect coordinates from multiple paragraph elements
 */
export function collectParagraphsCoordinates(
  paragraphElements: HTMLElement[]
): ParagraphCoordinates[] {
  return paragraphElements
    .map((el, idx) => extractParagraphCoordinates(el, idx))
    .filter((p): p is ParagraphCoordinates => p !== null);
}

/**
 * Determine the phase (pre, training1-3, post) from pageType string
 */
function getPhaseFromPageType(pageType: string): string {
  // Check for passage_id pattern in pageType
  // Training: tr_01, tr_02, tr_03
  const trMatch = pageType.match(/tr_(\d+)/);
  if (trMatch) {
    return `training${parseInt(trMatch[1])}`;
  }

  // Pre-test: pre_01, pre_02, pre_03
  const preMatch = pageType.match(/pre_(\d+)/);
  if (preMatch) {
    return 'pre';
  }

  // Post-test: post_01, post_02, post_03
  const postMatch = pageType.match(/post_(\d+)/);
  if (postMatch) {
    return 'post';
  }

  // Standalone pages
  if (pageType === 'pre_intro' || pageType === 'pre_complete') return 'pre';
  if (pageType === 'post_intro' || pageType === 'post_complete') return 'post';
  if (pageType === 'training_intro') return 'training1';
  if (pageType === 'training_complete') return 'training3';
  if (pageType === 'analog_intro') return 'training1'; // analog intro is before first analog

  return 'unknown';
}

/**
 * Send coordinates to Tauri backend for saving
 * Path structure: metacognition/{group}/{participantId}/{phase}/coordinates/{filename}
 * @param participantId - Participant ID
 * @param groupLetter - Group letter (A or B)
 * @param pageType - Page type identifier
 * @param coordinates - Coordinates data to save
 * @param overridePhase - Optional phase override (e.g., 'training2' for training set 2)
 */
export async function saveCoordinates(
  participantId: string,
  groupLetter: string,
  pageType: string,
  coordinates: Record<string, unknown>,
  overridePhase?: string
): Promise<void> {
  // Check if Tauri is available
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, unknown>;
  const isTauri =
    '__TAURI__' in w ||
    '__TAURI_INTERNALS__' in w ||
    '__TAURI_IPC__' in w ||
    '__TAURI_METADATA__' in w;

  if (!isTauri) {
    console.debug('[coordinates] Tauri not available, skipping coordinate save');
    return;
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const { homeDir, join } = await import('@tauri-apps/api/path');

    // Use override phase if provided, otherwise determine from pageType
    const phase = overridePhase || getPhaseFromPageType(pageType);

    // Use groupLetter directly (A or B), fallback to 'unknown' if empty
    const group = groupLetter || 'unknown';

    // Create directory path: metacognition/{group}/{participantId}/{phase}/coordinates/
    const home = await homeDir();
    const coordDir = await join(
      home,
      'metacognition',
      groupLetter,
      participantId,
      phase,
      'coordinates'
    );

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${pageType}_${timestamp}.json`;
    const filePath = await join(coordDir, filename);

    // Save coordinates as JSON
    const content = JSON.stringify(
      {
        participant_id: participantId,
        group,
        phase,
        page_type: pageType,
        timestamp: new Date().toISOString(),
        coordinates,
      },
      null,
      2
    );

    await invoke('save_coordinates', { path: filePath, content });
    console.log('[coordinates] Saved:', filePath);
  } catch (error) {
    console.warn('[coordinates] Failed to save:', error);
  }
}

/**
 * Extract detailed passage coordinates including title, subtitle, metadata, and paragraphs
 */
export function extractPassageCoordinates(
  passageElement: HTMLElement,
  passageIndex: number
): PassageCoordinates {
  // Extract title (headline, header, etc.)
  const titleElement = passageElement.querySelector(
    '[data-passage-title="true"]'
  ) as HTMLElement | null;
  const title = collectTextCoordinates(titleElement);

  // Extract subtitle (subheading, byline, etc.) - may have multiple elements
  const subtitleElements = Array.from(
    passageElement.querySelectorAll('[data-passage-subtitle="true"]')
  ) as HTMLElement[];
  const subtitle: BBoxLines | null =
    subtitleElements.length > 0
      ? {
          lines: subtitleElements.flatMap((el) => getTextLines(el)),
          text: subtitleElements.map((el) => el.textContent?.trim() || '').join(' '),
        }
      : null;

  // Extract metadata (sender, recipient, date, etc.) - values
  const metadataValueElements = Array.from(
    passageElement.querySelectorAll('[data-passage-metadata]')
  ) as HTMLElement[];
  // Extract metadata labels
  const metadataLabelElements = Array.from(
    passageElement.querySelectorAll('[data-passage-metadata-label]')
  ) as HTMLElement[];

  // Group by metadata type
  const metadataTypes = new Set<string>();
  metadataValueElements.forEach((el) => {
    const type = el.getAttribute('data-passage-metadata');
    if (type) metadataTypes.add(type);
  });
  metadataLabelElements.forEach((el) => {
    const type = el.getAttribute('data-passage-metadata-label');
    if (type) metadataTypes.add(type);
  });

  const metadata =
    metadataTypes.size > 0
      ? Array.from(metadataTypes).map((type) => {
          // Find label element for this type
          const labelEl = metadataLabelElements.find(
            (el) => el.getAttribute('data-passage-metadata-label') === type
          );
          // Find value element for this type
          const valueEl = metadataValueElements.find(
            (el) => el.getAttribute('data-passage-metadata') === type
          );
          return {
            metadata_type: type,
            label: labelEl ? getTextLines(labelEl) : null,
            label_text: labelEl?.textContent?.trim() || null,
            value: valueEl ? getTextLines(valueEl) : [],
            value_text: valueEl?.textContent?.trim() || '',
          };
        })
      : null;

  // Extract paragraphs with sentence/word breakdown
  const paragraphElements = Array.from(
    passageElement.querySelectorAll('[data-passage-paragraph]')
  ) as HTMLElement[];
  const paragraphs = collectParagraphsCoordinates(paragraphElements);

  // Extract table data if present
  const tableElement = passageElement.querySelector(
    '[data-passage-table="true"]'
  ) as HTMLElement | null;
  let table: TableCoordinates | null = null;

  if (tableElement) {
    // Extract table headers
    const headerElements = Array.from(
      tableElement.querySelectorAll('[data-passage-table-header]')
    ) as HTMLElement[];
    const headers = headerElements.map((el) => ({
      header_index: parseInt(el.getAttribute('data-passage-table-header') || '0'),
      bbox: getElementBBox(el),
      text: el.textContent?.trim() || '',
    }));

    // Extract table cells
    const cellElements = Array.from(
      tableElement.querySelectorAll('[data-passage-table-cell]')
    ) as HTMLElement[];
    const cells = cellElements.map((el) => {
      const cellId = el.getAttribute('data-passage-table-cell') || '0-0';
      const [rowIdx, cellIdx] = cellId.split('-').map(Number);
      return {
        row_index: rowIdx,
        cell_index: cellIdx,
        bbox: getElementBBox(el),
        text: el.textContent?.trim() || '',
      };
    });

    table = { headers, cells };
  }

  return {
    passage_index: passageIndex,
    title,
    subtitle,
    metadata,
    paragraphs,
    table,
  };
}

/**
 * Collect coordinates for question pages (pre, training, post)
 */
export function collectQuestionPageCoordinates(options: {
  phase: 'pre' | 'training' | 'post';
  passageId: string;
  instructionElement: HTMLElement | null;
  passageElements: HTMLElement[];
  questionElements: Array<{
    questionId: string;
    questionIndex: number;
    questionTextElement: HTMLElement | null;
    choiceElements: Array<{
      choiceId: string;
      choiceIndex: number;
      choiceTextElement: HTMLElement | null;
      choiceBboxElement: HTMLElement | null;
    }>;
  }>;
  timerElement: HTMLElement | null;
  confirmButtonElement: HTMLElement | null;
}) {
  const {
    phase,
    passageId,
    instructionElement,
    passageElements,
    questionElements,
    timerElement,
    confirmButtonElement,
  } = options;

  return {
    page_type: 'question',
    phase,
    passage_id: passageId,
    timestamp: new Date().toISOString(),

    left_panel: {
      instruction: collectTextCoordinates(instructionElement),
      passages: passageElements.map((el, idx) => extractPassageCoordinates(el, idx)),
    },

    right_panel: {
      questions: questionElements.map((q) => ({
        question_id: q.questionId,
        question_index: q.questionIndex,
        question_text: collectTextCoordinates(q.questionTextElement),
        choices: q.choiceElements.map((c) => ({
          choice_id: c.choiceId,
          choice_index: c.choiceIndex,
          choice_text: collectTextCoordinates(c.choiceTextElement),
          choice_bbox: getElementBBox(c.choiceBboxElement),
        })),
      })),
      ui_components: {
        timer: getElementBBox(timerElement),
        confirm_button: getElementBBox(confirmButtonElement),
      },
    },
  };
}
