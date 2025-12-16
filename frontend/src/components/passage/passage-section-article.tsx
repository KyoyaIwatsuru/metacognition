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
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[1.8] text-slate-800">
      {/* ヘッドライン + 著者名 */}
      <div className="border-b border-black px-3 py-2 text-center">
        <h2 className="text-base font-bold">{article.headline}</h2>
        {article.byline ? <p className="text-sm mt-1">{article.byline}</p> : null}
      </div>

      {/* 本文（2カラム新聞スタイル） */}
      <div className="px-3 py-2 columns-2 gap-4">
        {article.body.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line text-justify mb-3 break-inside-avoid">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
