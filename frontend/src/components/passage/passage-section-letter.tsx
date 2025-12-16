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
      <div className="text-[14px] leading-[1.8] text-slate-800">
        {/* Eメールヘッダー（テーブル形式） */}
        <table className="w-full border-2 border-black border-b-0 border-collapse bg-white">
          <tbody>
            {headerRows.map((row, idx) => (
              <tr key={idx} className="border-b border-black last:border-b-0">
                <td className="border-r border-black px-2 py-0.5 font-bold w-20 bg-white">
                  {row.label}
                </td>
                <td className="px-2 py-0.5 bg-white">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 本文部分（スクロールバー風装飾付き） */}
        <div className="border-2 border-black bg-white relative">
          {/* 右側スクロールバー風 */}
          <div className="absolute right-0 top-0 bottom-0 w-4 border-l border-black flex flex-col justify-between items-center py-1">
            <span className="text-xs">▲</span>
            <span className="text-xs">▼</span>
          </div>

          {/* 本文コンテンツ */}
          <div className="pr-5 px-2 py-2 space-y-3">
            {/* 挨拶 */}
            {letter.greeting ? <p>{letter.greeting}</p> : null}

            {/* 本文 */}
            {letter.body.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line text-justify">
                {p}
              </p>
            ))}

            {/* 結び */}
            {letter.closing ? <p>{letter.closing}</p> : null}

            {/* 署名 */}
            {letter.senderName ? <p className="whitespace-pre-line">{letter.senderName}</p> : null}
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
