'use client';

import type { PackageTrackingContent } from '@/lib/types';

type PackageTrackingBodyProps = {
  packageTracking: PackageTrackingContent;
};

export function PackageTrackingBody({ packageTracking }: PackageTrackingBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800 px-2 py-1">
      {/* Title */}
      <h2 className="text-center font-bold" data-passage-title="true">
        {packageTracking.title}
      </h2>
      {/* Subtitle */}
      <p className="text-center" data-passage-subtitle="true">
        {packageTracking.subtitle}
      </p>

      {/* Table - compact */}
      <table className="w-full border-collapse border border-black" data-passage-table="true">
        <thead>
          <tr>
            {packageTracking.columns.map((col, idx) => (
              <th
                key={idx}
                className="border border-black px-1 py-0 font-bold text-left"
                data-passage-table-header={idx}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packageTracking.rows.map((row, rowIdx) => (
            <tr key={rowIdx} data-passage-table-row={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-black px-1 py-0"
                  data-passage-table-cell={`${rowIdx}-${cellIdx}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer info - two columns */}
      <div className="flex">
        {/* Left column */}
        <div className="w-1/2">
          {packageTracking.footerLeft.map((item, idx) => (
            <p key={idx}>
              <span className="font-bold" data-passage-metadata-label={`footer_left_${idx}`}>
                {item.label}
              </span>{' '}
              <span data-passage-metadata={`footer_left_${idx}`}>{item.value}</span>
            </p>
          ))}
        </div>
        {/* Right column */}
        <div className="w-1/2">
          {packageTracking.footerRight.map((item, idx) => (
            <p key={idx}>
              <span className="font-bold" data-passage-metadata-label={`footer_right_${idx}`}>
                {item.label}
              </span>{' '}
              <span data-passage-metadata={`footer_right_${idx}`}>{item.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
