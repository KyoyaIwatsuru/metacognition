'use client';

import type { MemoContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type MemoBodyProps = {
  memo: MemoContent;
  showParagraphNumbers?: boolean;
};

export function MemoBody({ memo, showParagraphNumbers }: MemoBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 px-6 py-4">
      {/* Header fields */}
      <div className="space-y-1 mb-4">
        <div className="flex">
          <span className="w-20 font-medium" data-passage-metadata-label="recipient">
            To:
          </span>
          <span data-passage-metadata="recipient">{memo.to}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium" data-passage-metadata-label="sender">
            From:
          </span>
          <span data-passage-metadata="sender">{memo.from}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium" data-passage-metadata-label="date">
            Date:
          </span>
          <span data-passage-metadata="date">{memo.date}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium" data-passage-metadata-label="subject">
            Subject:
          </span>
          <span data-passage-metadata="subject">{memo.subject}</span>
        </div>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-3">
        {memo.body.map((paragraph, idx) => (
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
