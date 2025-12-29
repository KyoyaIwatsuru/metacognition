'use client';

import type { AdChainBorderContent } from '@/lib/types';

type AdChainBorderBodyProps = {
  adChainBorder: AdChainBorderContent;
};

export function AdChainBorderBody({ adChainBorder }: AdChainBorderBodyProps) {
  return (
    <div className="border border-black bg-white px-4 py-2">
      {/* Headline */}
      <h2 className="text-center text-lg font-bold tracking-wide mb-2" data-passage-title="true">
        {adChainBorder.headline}
      </h2>

      {/* Body paragraphs */}
      <div className="text-[14px] leading-[2.4] text-slate-800 mb-2 space-y-3">
        {adChainBorder.body.map((paragraph, idx) => (
          <p key={idx} data-passage-paragraph>
            {paragraph}
          </p>
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
