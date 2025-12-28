'use client';

import type { ConferenceScheduleContent } from '@/lib/types';

type ConferenceScheduleBodyProps = {
  conferenceSchedule: ConferenceScheduleContent;
};

export function ConferenceScheduleBody({ conferenceSchedule }: ConferenceScheduleBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* Header text */}
      <div className="text-center py-4 px-4 space-y-1">
        <p className="font-bold" data-passage-title="true">
          {conferenceSchedule.title}
        </p>
        {conferenceSchedule.subtitle && (
          <p className="font-bold" data-passage-subtitle="true">
            {conferenceSchedule.subtitle}
          </p>
        )}
        {conferenceSchedule.subtitle2 && (
          <p className="font-bold" data-passage-metadata="other">
            {conferenceSchedule.subtitle2}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="px-4 pb-4">
        <table
          className="w-full border-collapse border border-black text-sm"
          data-passage-table="true"
        >
          <thead>
            <tr>
              {conferenceSchedule.columns.map((col, idx) => (
                <th
                  key={idx}
                  className="border border-black px-2 py-1 font-bold"
                  data-passage-table-header={idx}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conferenceSchedule.rows.map((row, rowIdx) => (
              <tr key={rowIdx} data-passage-table-row={rowIdx}>
                <td
                  className="border border-black px-2 py-1 font-bold"
                  data-passage-table-cell={`${rowIdx}-0`}
                >
                  {row.label}
                </td>
                {row.values.map((value, colIdx) => (
                  <td
                    key={colIdx}
                    className="border border-black px-2 py-1"
                    data-passage-table-cell={`${rowIdx}-${colIdx + 1}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
