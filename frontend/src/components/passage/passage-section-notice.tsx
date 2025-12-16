'use client';

import type { NoticeContent } from '@/lib/types';

type NoticeBodyProps = {
  notice: NoticeContent;
};

/**
 * Notice/Information format matching TOEIC style.
 * Includes centered title and body paragraphs with optional bold section headers.
 * Section headers are detected as text before ":" at the start of a paragraph.
 */
export function NoticeBody({ notice }: NoticeBodyProps) {
  // 段落の先頭にある "Header:" パターンを太字にする
  const renderParagraph = (text: string) => {
    // "Header: content" パターンを検出
    const match = text.match(/^([A-Za-z\s]+):\s*/);
    if (match) {
      const header = match[1] + ':';
      const rest = text.slice(match[0].length);
      return (
        <>
          <span className="font-bold">{header}</span> {rest}
        </>
      );
    }
    return text;
  };

  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[1.8] text-slate-800 p-4">
      {/* タイトル */}
      <h2 className="text-lg font-bold text-center mb-3">{notice.title}</h2>

      {/* 本文 */}
      <div className="space-y-3">
        {notice.body.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line text-justify">
            {renderParagraph(p)}
          </p>
        ))}
      </div>
    </div>
  );
}
