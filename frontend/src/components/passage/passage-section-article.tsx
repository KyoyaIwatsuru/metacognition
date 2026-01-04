'use client';

import type { ArticleContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type ArticleBodyProps = {
  article: ArticleContent;
  showParagraphNumbers?: boolean;
};

/**
 * Article/News format matching TOEIC style.
 * Includes headline, byline (author), and body paragraphs with [1][2][3][4] markers.
 * Uses 2-column newspaper-style layout by default, or 1-column press-release style.
 */
export function ArticleBody({ article, showParagraphNumbers }: ArticleBodyProps) {
  // 1カラムレイアウト（プレスリリース風）
  if (article.singleColumn) {
    return (
      <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 p-4">
        {/* タイトル */}
        <h2 className="text-lg font-bold text-center mb-1" data-passage-title="true">
          {article.headline}
        </h2>
        {/* 著者（イタリック・中央揃え・下線付き） */}
        {article.byline ? (
          <p
            className="text-sm italic text-center border-b border-black pb-2 mb-3"
            data-passage-subtitle="true"
          >
            {article.byline}
          </p>
        ) : null}
        {/* 本文 */}
        <div className="space-y-3">
          {article.body.map((p, idx) => (
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
          ))}
        </div>
      </div>
    );
  }

  // 2カラムレイアウト（新聞風）
  const midPoint = Math.ceil(article.body.length / 2);
  const leftBody = article.body.slice(0, midPoint);
  const rightBody = article.body.slice(midPoint);

  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 p-3">
      {/* 2カラムレイアウト（上端揃え） */}
      <div className="flex gap-6 items-start">
        {/* 左カラム：タイトル + 著者 + 本文 */}
        <div className="flex-1">
          <h2 className="text-base font-bold mb-1 text-center" data-passage-title="true">
            {article.headline}
          </h2>
          {article.byline ? (
            <p className="text-sm mb-2" data-passage-subtitle="true">
              {article.byline}
            </p>
          ) : null}
          <div className="space-y-3">
            {leftBody.map((p, idx) => (
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
            ))}
          </div>
        </div>
        {/* 右カラム：本文のみ（タイトルと同じ高さから開始） */}
        <div className="flex-1">
          <div className="space-y-3">
            {rightBody.map((p, idx) => (
              <div key={idx} className="flex">
                {showParagraphNumbers && (
                  <span className="w-5 shrink-0 text-slate-600 font-medium">
                    {PARAGRAPH_NUMBERS[midPoint + idx]}
                  </span>
                )}
                <p className="whitespace-pre-line text-justify flex-1" data-passage-paragraph>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
