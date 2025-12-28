'use client';

import type { ReportContent } from '@/lib/types';

type ReportBodyProps = {
  report: ReportContent;
};

/**
 * Report/Assessment format matching TOEIC style.
 * Includes header (organization name), title, metadata, body, and footer.
 */
export function ReportBody({ report }: ReportBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* ヘッダー（組織名） */}
      <div className="px-3 py-2 text-center">
        <p className="text-lg font-bold tracking-wide" data-passage-subtitle="true">
          {report.header}
        </p>
      </div>

      {/* コンテンツ部分 */}
      <div className="px-3 py-2 space-y-2">
        {/* タイトル */}
        <p className="font-bold" data-passage-title="true">
          {report.title}
        </p>

        {/* メタ情報 */}
        {report.meta && report.meta.length > 0 ? (
          <div className="space-y-0.5">
            {report.meta.map((item, idx) => (
              <p key={idx}>
                <span className="font-bold" data-passage-metadata-label={`meta_${idx}`}>
                  {item.label}:
                </span>{' '}
                <span data-passage-metadata={`meta_${idx}`}>{item.value}</span>
              </p>
            ))}
          </div>
        ) : null}

        {/* 区切り線（メタ情報の下） */}
        <hr className="-mx-3 border-t border-black" />

        {/* 本文 */}
        <div className="space-y-3 text-justify">
          {report.body.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line" data-passage-paragraph>
              {idx === 0 && report.bodyTitle ? (
                <span className="font-bold">{report.bodyTitle} </span>
              ) : null}
              {p}
            </p>
          ))}
        </div>

        {/* 区切り線（フッターの上） */}
        {report.footer ? <hr className="-mx-3 border-t border-black" /> : null}

        {/* フッター（作成者情報） */}
        {report.footer ? (
          <p>
            {(() => {
              // Handle both half-width (:) and full-width (：) colons
              const colonMatch = report.footer.match(/[:：]/);
              if (colonMatch) {
                const colonIndex = colonMatch.index!;
                const colonChar = colonMatch[0];
                const label = report.footer.slice(0, colonIndex);
                const value = report.footer.slice(colonIndex + 1);
                return (
                  <>
                    <span className="font-bold" data-passage-metadata-label="footer">
                      {label}
                      {colonChar}
                    </span>
                    <span data-passage-metadata="footer">{value}</span>
                  </>
                );
              }
              // No colon found, just render as-is
              return <span data-passage-metadata="footer">{report.footer}</span>;
            })()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
