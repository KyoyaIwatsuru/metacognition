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
    <div className="border-2 border-black bg-white text-[14px] leading-[1.8] text-slate-800">
      {/* ヘッダー（組織名） */}
      <div className="border-b-2 border-black px-3 py-2">
        <p className="text-lg font-bold tracking-wide">{report.header}</p>
      </div>

      {/* コンテンツ部分 */}
      <div className="px-3 py-2 space-y-2">
        {/* タイトル */}
        <p className="font-bold">{report.title}</p>

        {/* メタ情報 */}
        {report.meta && report.meta.length > 0 ? (
          <div className="space-y-0.5">
            {report.meta.map((item, idx) => (
              <p key={idx}>
                <span className="font-bold">{item.label}:</span> {item.value}
              </p>
            ))}
          </div>
        ) : null}

        {/* 区切り線（メタ情報の下） */}
        <hr className="-mx-3 border-t border-black" />

        {/* 本文見出し（太字） */}
        {report.bodyTitle ? <p className="font-bold">{report.bodyTitle}</p> : null}

        {/* 本文 */}
        <div className="space-y-3 text-justify">
          {report.body.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {/* 区切り線（フッターの上） */}
        {report.footer ? <hr className="-mx-3 border-t border-black" /> : null}

        {/* フッター（作成者情報） */}
        {report.footer ? (
          <p>
            <span className="font-bold">
              {report.footer.split(':')[0]}
              {report.footer.includes(':') ? ':' : ''}
            </span>
            {report.footer.includes(':') ? report.footer.split(':').slice(1).join(':') : ''}
          </p>
        ) : null}
      </div>
    </div>
  );
}
