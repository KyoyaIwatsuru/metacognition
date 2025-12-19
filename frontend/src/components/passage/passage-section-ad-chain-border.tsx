'use client';

import type { AdChainBorderContent } from '@/lib/types';

type AdChainBorderBodyProps = {
  adChainBorder: AdChainBorderContent;
};

export function AdChainBorderBody({ adChainBorder }: AdChainBorderBodyProps) {
  // Generate chain links for borders
  const chainLink = (
    <svg viewBox="0 0 20 10" className="w-4 h-2">
      <ellipse cx="10" cy="5" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div className="relative bg-gray-100 p-1">
      {/* Chain border - top */}
      <div className="flex justify-center overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`top-${i}`} className="text-gray-600 -mx-0.5">
            {chainLink}
          </div>
        ))}
      </div>

      {/* Main content area with side chains */}
      <div className="flex">
        {/* Left chain border */}
        <div className="flex flex-col items-center overflow-hidden py-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`left-${i}`} className="text-gray-600 -my-0.5 rotate-90">
              {chainLink}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white mx-1 my-1 px-6 py-4">
          {/* Headline */}
          <h2 className="text-center text-2xl font-serif font-bold tracking-wide mb-4">
            {adChainBorder.headline}
          </h2>

          {/* Body paragraphs */}
          <div className="space-y-3 text-[14px] leading-[1.6] text-slate-800 mb-4">
            {adChainBorder.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Bullet points */}
          {adChainBorder.bullets && adChainBorder.bullets.length > 0 && (
            <ul className="space-y-1 text-[14px] leading-[1.6] text-slate-800">
              {adChainBorder.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right chain border */}
        <div className="flex flex-col items-center overflow-hidden py-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`right-${i}`} className="text-gray-600 -my-0.5 rotate-90">
              {chainLink}
            </div>
          ))}
        </div>
      </div>

      {/* Chain border - bottom */}
      <div className="flex justify-center overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`bottom-${i}`} className="text-gray-600 -mx-0.5">
            {chainLink}
          </div>
        ))}
      </div>
    </div>
  );
}
