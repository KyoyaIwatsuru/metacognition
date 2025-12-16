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
    <div className="border-2 border-black bg-white text-[14px] leading-[1.8] text-slate-800">
      {/* ブラウザ風アドレスバー */}
      <div className="flex items-center border-b-2 border-black">
        {/* スクロールボタン（上） */}
        <div className="flex flex-col border-r-2 border-black px-1 py-0.5">
          <span className="text-xs leading-none">▲</span>
        </div>

        {/* URL入力欄 */}
        <div className="flex-1 px-2 py-1">
          <div className="border border-black px-2 py-0.5 bg-white text-sm">{webpage.url}</div>
        </div>

        {/* ドロップダウン矢印 */}
        <div className="border-l-2 border-black px-2 py-1">
          <span className="text-sm">▼</span>
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
          <p className="font-bold text-base">{webpage.title}</p>

          {/* 本文 */}
          <div className="space-y-3 text-justify">
            {webpage.body.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line indent-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
