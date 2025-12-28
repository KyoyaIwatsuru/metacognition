'use client';

import type { WebpageContent } from '@/lib/types';

type WebpageBodyProps = {
  webpage: WebpageContent;
};

/**
 * Webpage format matching TOEIC style.
 * Includes browser-like frame with address bar, page title, and body content.
 */
export function WebpageBody({ webpage }: WebpageBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* ブラウザ風アドレスバー */}
      <div className="border-b-2 border-black px-2 py-1">
        {/* URL入力欄（ドロップダウン矢印を内包） */}
        <div className="border border-black bg-white text-sm flex items-center">
          <span className="flex-1 px-2 py-0.5" data-passage-metadata="url">
            {webpage.url}
          </span>
          <span className="border-l border-black px-2 py-0.5">▼</span>
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="relative">
        {/* 右側スクロールバー風 */}
        <div className="absolute right-0 top-0 bottom-0 w-4 border-l-2 border-black flex flex-col justify-between items-center py-1">
          <span className="text-xs">▲</span>
          <span className="text-xs">▼</span>
        </div>

        {/* メインコンテンツ */}
        <div className="pr-6 px-3 py-3 space-y-3">
          {/* ページタイトル */}
          <p className="font-bold text-base" data-passage-title="true">
            {webpage.title}
          </p>

          {/* 本文 */}
          <div className="space-y-3 text-justify">
            {webpage.body.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line indent-0" data-passage-paragraph>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
