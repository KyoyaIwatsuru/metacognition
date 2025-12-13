'use client';

import type { PassageSection } from '@/lib/types';
import { AdBody } from '@/components/passage/passage-section-ad';
import { LetterBody } from '@/components/passage/passage-section-letter';

type PassageBodyProps = {
  sections?: PassageSection[];
  paragraphsEn?: string[];
  direction?: string; // "Questions 181-185 refer to the following advertisement and letter."
  directionJa?: string; // "問題Q1-4は次の広告と手紙に関するものです。"
  locale?: 'en' | 'ja';
};

/**
 * Render passage sections with layout-aware components.
 * Fallback to simple paragraph list when no sections provided.
 */
export function PassageBody({
  sections,
  paragraphsEn,
  direction,
  directionJa,
  locale = 'en',
}: PassageBodyProps) {
  const displayDirection = locale === 'ja' ? (directionJa ?? direction) : direction;

  if (sections && sections.length > 0) {
    return (
      <div className="space-y-2">
        {/* 導入文 */}
        {displayDirection ? (
          <p className="text-sm font-semibold text-slate-800">{displayDirection}</p>
        ) : null}
        {sections
          .filter((s) => s.locale === locale)
          .map((section, idx) => {
            if (section.layoutType === 'ad') {
              return <AdBody key={idx} ad={section.ad} />;
            }
            if (section.layoutType === 'letter') {
              return <LetterBody key={idx} letter={section.letter} />;
            }
            return (
              <div
                key={idx}
                className="space-y-2 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line"
              >
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            );
          })}
      </div>
    );
  }

  const paragraphs = paragraphsEn ?? [];
  return (
    <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>
  );
}
