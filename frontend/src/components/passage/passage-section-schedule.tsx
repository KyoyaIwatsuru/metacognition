'use client';

import type { ScheduleContent } from '@/lib/types';

type ScheduleBodyProps = {
  schedule: ScheduleContent;
};

/**
 * Schedule/Table format matching TOEIC style.
 * Includes header (company name), subheaders, and data table with columns and rows.
 */
export function ScheduleBody({ schedule }: ScheduleBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* ヘッダー部分（会社名 + サブヘッダー） */}
      <div className="border-b border-black px-3 py-2 text-center">
        <p className="text-base font-bold">{schedule.header}</p>
        {schedule.subheader ? <p className="text-sm">{schedule.subheader}</p> : null}
        {schedule.subheader2 ? <p className="text-sm">{schedule.subheader2}</p> : null}
      </div>

      {/* テーブル部分 - 外枠と一体化 */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {schedule.columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-2 py-1 text-center font-bold bg-white border-b border-black ${
                  idx < schedule.columns.length - 1 ? 'border-r border-black' : ''
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`px-2 py-1 text-center whitespace-pre-line ${
                    rowIdx < schedule.rows.length - 1 ? 'border-b border-black' : ''
                  } ${cellIdx < row.length - 1 ? 'border-r border-black' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
