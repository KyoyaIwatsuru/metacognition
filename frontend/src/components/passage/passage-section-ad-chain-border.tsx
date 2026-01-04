'use client';

import type { AdChainBorderContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type AdChainBorderBodyProps = {
  adChainBorder: AdChainBorderContent;
  showParagraphNumbers?: boolean;
};

export function AdChainBorderBody({ adChainBorder, showParagraphNumbers }: AdChainBorderBodyProps) {
  return (
    <div className="border border-black bg-white px-4 py-2">
      {/* Headline */}
      <h2 className="text-center text-lg font-bold tracking-wide mb-2" data-passage-title="true">
        {adChainBorder.headline}
      </h2>

      {/* Body paragraphs */}
      <div className="text-[14px] leading-[2.4] text-slate-800 mb-2 space-y-3">
        {adChainBorder.body.map((paragraph, idx) => (
          <div key={idx} className="flex">
            {showParagraphNumbers && (
              <span className="w-5 shrink-0 text-slate-600 font-medium">
                {PARAGRAPH_NUMBERS[idx]}
              </span>
            )}
            <p className="flex-1" data-passage-paragraph>
              {paragraph}
            </p>
          </div>
        ))}
      </div>

      {/* Bullet points */}
      {adChainBorder.bullets && adChainBorder.bullets.length > 0 && (
        <ul className="text-[14px] leading-[2.4] text-slate-800">
          {adChainBorder.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start" data-passage-paragraph>
              <span className="mr-2">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
