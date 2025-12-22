'use client';

import type { PressReleaseContent } from '@/lib/types';

type PressReleaseBodyProps = {
  pressRelease: PressReleaseContent;
};

export function PressReleaseBody({ pressRelease }: PressReleaseBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 px-6 py-4">
      {/* Header: FOR IMMEDIATE RELEASE + Contact */}
      <div className="flex justify-between items-start mb-4">
        <p className="font-bold">{pressRelease.releaseType}</p>
        <div className="text-right">
          <p>
            <span className="font-bold">Contact:</span> {pressRelease.contact.name}{' '}
            {pressRelease.contact.phone},
          </p>
          <p>{pressRelease.contact.email}</p>
        </div>
      </div>

      {/* Headline - underlined and bold */}
      <h2 className="font-bold underline mb-4">{pressRelease.headline}</h2>

      {/* Body paragraphs */}
      <div className="space-y-4">
        {pressRelease.body.map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
