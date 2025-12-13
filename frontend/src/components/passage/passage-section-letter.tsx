'use client';

import type { LetterContent } from '@/lib/types';

type LetterBodyProps = {
  letter: LetterContent;
};

/**
 * Business letter format matching TOEIC style.
 * Includes sender, date, recipient, greeting, body, closing, and signature.
 */
export function LetterBody({ letter }: LetterBodyProps) {
  const hasBusinessFormat = letter.sender || letter.recipient;

  if (!hasBusinessFormat) {
    // フォールバック: 旧形式（本文のみ）
    return (
      <div className="space-y-2 border-2 border-black bg-white p-2 text-[14px] leading-[2.4] text-slate-800">
        {letter.body.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="border-2 border-black bg-white p-2 text-[14px] leading-[2.4] text-slate-800">
      {/* 差出人ブロック */}
      {letter.sender ? (
        <div className="mb-1 leading-normal">
          <p className="font-medium">{letter.sender.name}</p>
          {letter.sender.address?.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      ) : null}

      {/* 日付 */}
      {letter.date ? <p className="mb-1">{letter.date}</p> : null}

      {/* 宛先ブロック */}
      {letter.recipient ? (
        <div className="mb-1 leading-normal">
          <p>
            {letter.recipient.name}
            {letter.recipient.title ? `, ${letter.recipient.title}` : ''}
          </p>
          {letter.recipient.company ? <p>{letter.recipient.company}</p> : null}
          {letter.recipient.address?.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      ) : null}

      {/* 挨拶 */}
      {letter.greeting ? <p className="mb-1">{letter.greeting}</p> : null}

      {/* 本文 */}
      <div className="space-y-2 mb-1">
        {letter.body.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line text-justify">
            {p}
          </p>
        ))}
      </div>

      {/* 結び */}
      {letter.closing ? <p className="mb-1">{letter.closing}</p> : null}

      {/* 署名（イタリック体） */}
      {letter.signature ? <p className="mb-0.5 italic">{letter.signature}</p> : null}

      {/* タイプされた名前 */}
      {letter.senderName ? <p>{letter.senderName}</p> : null}
    </div>
  );
}
