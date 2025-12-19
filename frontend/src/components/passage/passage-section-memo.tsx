'use client';

import type { MemoContent } from '@/lib/types';

type MemoBodyProps = {
  memo: MemoContent;
};

export function MemoBody({ memo }: MemoBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[1.6] text-slate-800 px-6 py-4">
      {/* Header fields */}
      <div className="space-y-1 mb-4">
        <div className="flex">
          <span className="w-20 font-medium">To:</span>
          <span>{memo.to}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium">From:</span>
          <span>{memo.from}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium">Date:</span>
          <span>{memo.date}</span>
        </div>
        <div className="flex">
          <span className="w-20 font-medium">Subject:</span>
          <span>{memo.subject}</span>
        </div>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-4">
        {memo.body.map((paragraph, idx) => (
          <p key={idx} className="text-sm whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
