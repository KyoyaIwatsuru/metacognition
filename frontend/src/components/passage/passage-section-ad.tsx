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
        <h2 className="mb-1 text-lg font-bold tracking-wide text-black leading-normal">
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

      {/* 箇条書き（Building 1〜4など） */}
      {ad.bullets && ad.bullets.length > 0 ? (
        <div className="mt-2 ml-4 space-y-1">
          {ad.bullets.map((bullet, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {bullet}
            </p>
          ))}
        </div>
      ) : null}

      {/* フッター（最後の行） */}
      {ad.footer ? <p className="mt-2 whitespace-pre-line text-justify">{ad.footer}</p> : null}
    </div>
  );
}
