'use client';

import type { ArticleContent } from '@/lib/types';

type ArticleBodyProps = {
  article: ArticleContent;
};

/**
 * Article/News format matching TOEIC style.
 * Includes headline, byline (author), and body paragraphs with [1][2][3][4] markers.
 * Uses 2-column newspaper-style layout.
 */
export function ArticleBody({ article }: ArticleBodyProps) {
  // 本文を2つに分割（左カラムと右カラム）
  const midPoint = Math.ceil(article.body.length / 2);
  const leftBody = article.body.slice(0, midPoint);
  const rightBody = article.body.slice(midPoint);

  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[1.8] text-slate-800 p-3">
      {/* 2カラムレイアウト */}
      <div className="flex gap-6">
        {/* 左カラム：タイトル + 著者名 + 本文 */}
        <div className="flex-1">
          <h2 className="text-base font-bold mb-1">{article.headline}</h2>
          {article.byline ? <p className="text-sm mb-2">{article.byline}</p> : null}
          {leftBody.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line text-justify mb-3">
              {p}
            </p>
          ))}
        </div>

        {/* 右カラム：タイトル＋著者分のスペーサー + 本文 */}
        <div className="flex-1">
          {/* タイトルと著者と同じ高さの透明スペーサー（個別にinvisible） */}
          <h2 className="text-base font-bold mb-1 invisible" aria-hidden="true">
            {article.headline}
          </h2>
          {article.byline ? (
            <p className="text-sm mb-2 invisible" aria-hidden="true">
              {article.byline}
            </p>
          ) : null}
          {rightBody.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line text-justify mb-3">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
