'use client';

import type { LetterContent } from '@/lib/types';

type LetterBodyProps = {
  letter: LetterContent;
};

/**
 * Business letter format matching TOEIC style.
 * Includes sender, date, recipient, greeting, body, closing, and signature.
 * Also supports email format with from, to, date, subject headers.
 */
export function LetterBody({ letter }: LetterBodyProps) {
  const hasBusinessFormat = letter.sender || letter.recipient;
  const hasEmailFormat = letter.from || letter.to || letter.subject;

  // Eメール形式（From:, To:, Date:, Subject:）- TOEIC風テーブル形式
  if (hasEmailFormat) {
    // ヘッダー行を構築
    const headerRows: { label: string; value: string }[] = [];
    if (letter.to) headerRows.push({ label: 'To:', value: letter.to });
    if (letter.from) headerRows.push({ label: 'From:', value: letter.from });
    if (letter.date) headerRows.push({ label: 'Date:', value: letter.date });
    if (letter.subject) headerRows.push({ label: 'Subject:', value: letter.subject });

    return (
      <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 flex">
        {/* Left content area */}
        <div className="flex-1">
          {/* Eメールヘッダー（テーブル形式） */}
          <table className="w-full border-collapse">
            <tbody>
              {headerRows.map((row, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="border-r border-black px-2 py-0 font-bold w-16">{row.label}</td>
                  <td className="px-2 py-0">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 本文部分 */}
          <div className="px-2 py-1">
            {/* 挨拶 */}
            {letter.greeting ? <p>{letter.greeting}</p> : null}

            {/* 本文 */}
            {letter.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {/* 結び */}
            {letter.closing ? <p>{letter.closing}</p> : null}

            {/* 署名 */}
            {letter.senderName ? <p>{letter.senderName}</p> : null}
          </div>
        </div>

        {/* Right scrollbar area */}
        <div className="w-4 border-l border-black flex flex-col">
          {/* Up arrow */}
          <div className="flex items-center justify-center py-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-[6px] border-transparent border-b-black" />
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          {/* Down arrow */}
          <div className="flex items-center justify-center py-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-transparent border-t-black" />
          </div>
        </div>
      </div>
    );
  }

  // フォールバック: 本文のみ（どちらの形式もない場合）
  if (!hasBusinessFormat) {
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

  // ビジネスレター形式（sender, recipient）
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
      {letter.senderName ? <p className="whitespace-pre-line">{letter.senderName}</p> : null}
    </div>
  );
}
