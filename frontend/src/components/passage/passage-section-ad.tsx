'use client';

import type { AdContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type AdBodyProps = {
  ad: AdContent;
  showParagraphNumbers?: boolean;
};

export function AdBody({ ad, showParagraphNumbers }: AdBodyProps) {
  return (
    <div className="border-2 border-black bg-white p-2 text-[14px] leading-[2.4] text-slate-800">
      {/* ヘッドライン（左揃え・太字） */}
      {ad.headline ? (
        <h2
          className="mb-1 text-lg font-bold tracking-wide text-black leading-normal"
          data-passage-title="true"
        >
          {ad.headline}
        </h2>
      ) : null}

      {ad.subheading ? (
        <p className="mb-1 text-sm font-medium text-slate-700" data-passage-subtitle="true">
          {ad.subheading}
        </p>
      ) : null}

      {/* Meta情報 */}
      {ad.meta ? (
        <div className="mb-2">
          {Object.entries(ad.meta).map(([key, value], idx) => (
            <p key={key} className="text-sm">
              <span className="font-semibold" data-passage-metadata-label={`ad_meta_${idx}`}>
                {key}:
              </span>{' '}
              <span data-passage-metadata={`ad_meta_${idx}`}>{value}</span>
            </p>
          ))}
        </div>
      ) : null}

      {/* 本文 */}
      <div className="space-y-3">
        {ad.body && ad.body.length > 0
          ? ad.body.map((p, idx) => (
              <div key={idx} className="flex">
                {showParagraphNumbers && (
                  <span className="w-5 shrink-0 text-slate-600 font-medium">
                    {PARAGRAPH_NUMBERS[idx]}
                  </span>
                )}
                <p className="whitespace-pre-line text-justify flex-1" data-passage-paragraph>
                  {p}
                </p>
              </div>
            ))
          : null}
      </div>

      {/* 箇条書き（Building 1〜4など） */}
      {ad.bullets && ad.bullets.length > 0 ? (
        <div className="mt-2 ml-4 space-y-1">
          {ad.bullets.map((bullet, idx) => (
            <p key={idx} className="whitespace-pre-line" data-passage-paragraph>
              {bullet}
            </p>
          ))}
        </div>
      ) : null}

      {/* フッター（最後の行） */}
      {ad.footer ? (
        <p className="mt-2 whitespace-pre-line text-justify" data-passage-paragraph>
          {ad.footer}
        </p>
      ) : null}
    </div>
  );
}
