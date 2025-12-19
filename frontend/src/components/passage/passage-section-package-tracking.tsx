'use client';

import type { PackageTrackingContent } from '@/lib/types';

type PackageTrackingBodyProps = {
  packageTracking: PackageTrackingContent;
};

export function PackageTrackingBody({ packageTracking }: PackageTrackingBodyProps) {
  return (
    <div className="border-2 border-gray-400 bg-gray-200 rounded-sm">
      {/* Top gray bar */}
      <div className="h-4 bg-gradient-to-b from-gray-300 to-gray-400 border-b border-gray-500" />

      {/* Main content area with scrollbar */}
      <div className="flex">
        {/* Content */}
        <div className="flex-1 bg-white border border-gray-400 m-1">
          <div className="px-4 py-3 text-[14px] leading-[1.6] text-slate-800">
            {/* Title */}
            <h2 className="text-center font-bold mb-1">{packageTracking.title}</h2>
            {/* Subtitle */}
            <p className="text-center mb-3">{packageTracking.subtitle}</p>

            {/* Table */}
            <table className="w-full border-collapse border border-black text-sm mb-4">
              <thead>
                <tr>
                  {packageTracking.columns.map((col, idx) => (
                    <th key={idx} className="border border-black px-2 py-1 font-bold text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packageTracking.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-black px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer info - two columns */}
            <div className="flex gap-8">
              {/* Left column */}
              <div className="space-y-0.5">
                {packageTracking.footerLeft.map((item, idx) => (
                  <p key={idx} className="text-sm">
                    <span className="font-bold">{item.label}</span> {item.value}
                  </p>
                ))}
              </div>
              {/* Right column */}
              <div className="space-y-0.5">
                {packageTracking.footerRight.map((item, idx) => (
                  <p key={idx} className="text-sm">
                    <span className="font-bold">{item.label}</span> {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right scrollbar */}
        <div className="w-4 flex flex-col bg-gray-300">
          {/* Up arrow */}
          <div className="flex items-center justify-center py-1 bg-gray-200 border border-gray-400">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 8l-6 6h12z" />
            </svg>
          </div>
          {/* Spacer */}
          <div className="flex-1 bg-gray-300" />
          {/* Down arrow */}
          <div className="flex items-center justify-center py-1 bg-gray-200 border border-gray-400">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 16l6-6h-12z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom scrollbar */}
      <div className="h-4 flex bg-gray-300 mx-1 mb-1">
        {/* Left arrow */}
        <div className="flex items-center justify-center px-1 bg-gray-200 border border-gray-400">
          <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
            <path d="M8 12l6-6v12z" />
          </svg>
        </div>
        {/* Spacer */}
        <div className="flex-1 bg-gray-300 border-y border-gray-400" />
        {/* Right arrow + Down arrow */}
        <div className="flex">
          <div className="flex items-center justify-center px-1 bg-gray-200 border border-gray-400">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M16 12l-6 6v-12z" />
            </svg>
          </div>
          <div className="flex items-center justify-center px-1 bg-gray-200 border border-gray-400">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 16l6-6h-12z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
