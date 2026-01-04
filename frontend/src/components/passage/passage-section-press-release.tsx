'use client';

import type { PressReleaseContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type PressReleaseBodyProps = {
  pressRelease: PressReleaseContent;
  showParagraphNumbers?: boolean;
};

export function PressReleaseBody({ pressRelease, showParagraphNumbers }: PressReleaseBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 px-6 py-4">
      {/* Header: FOR IMMEDIATE RELEASE + Contact */}
      <div className="flex justify-between items-start mb-4">
        <p className="font-bold" data-passage-metadata="release_type">
          {pressRelease.releaseType}
        </p>
        <div className="text-right">
          <p>
            <span className="font-bold" data-passage-metadata-label="contact">
              Contact:
            </span>{' '}
            <span data-passage-metadata="contact">
              {pressRelease.contact.name} {pressRelease.contact.phone}, {pressRelease.contact.email}
            </span>
          </p>
        </div>
      </div>

      {/* Headline - underlined and bold */}
      <h2 className="font-bold underline mb-4" data-passage-title="true">
        {pressRelease.headline}
      </h2>

      {/* Body paragraphs */}
      <div className="space-y-3">
        {pressRelease.body.map((paragraph, idx) => (
          <div key={idx} className="flex">
            {showParagraphNumbers && (
              <span className="w-5 shrink-0 text-slate-600 font-medium">
                {PARAGRAPH_NUMBERS[idx]}
              </span>
            )}
            <p className="whitespace-pre-line flex-1" data-passage-paragraph>
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
