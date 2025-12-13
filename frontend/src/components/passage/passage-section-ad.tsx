'use client';

import type { AdContent } from '@/lib/types';

type AdBodyProps = {
  ad: AdContent;
};

export function AdBody({ ad }: AdBodyProps) {
  return (
    <div className="border-2 border-black bg-white p-2 text-[14px] leading-[2.4] text-slate-800">
      {/* ヘッドライン（左揃え・太字） */}
      {ad.headline ? (
        <h2 className="mb-1 text-lg font-bold uppercase tracking-wide text-black leading-normal">
          {ad.headline}
        </h2>
      ) : null}

      {ad.subheading ? (
        <p className="mb-1 text-sm font-medium text-slate-700">{ad.subheading}</p>
      ) : null}

      {/* 本文 */}
      <div className="space-y-2">
        {ad.body && ad.body.length > 0
          ? ad.body.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line text-justify">
                {p}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}
