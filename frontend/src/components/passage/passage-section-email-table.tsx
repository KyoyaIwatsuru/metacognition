'use client';

import type { EmailTableContent } from '@/lib/types';

type EmailTableBodyProps = {
  emailTable: EmailTableContent;
};

export function EmailTableBody({ emailTable }: EmailTableBodyProps) {
  const hasTitle = !!emailTable.title;

  return (
    <div className="border-2 border-black bg-white flex">
      {/* Left content area */}
      <div className="flex-1">
        {/* Decorative header with title */}
        {hasTitle && (
          <>
            {/* Striped decorative bar */}
            <div className="h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300" />
            {/* Title */}
            <div className="text-center py-0.5 font-bold text-xs border-b border-black">
              {emailTable.title}
            </div>
          </>
        )}

        {/* Header table */}
        <table className="w-full border-collapse text-[14px] leading-[2.4]">
          <tbody>
            {emailTable.headers.map((header, idx) => (
              <tr key={idx} className="border-b border-black">
                <td className="border-r border-black px-2 py-0 font-bold w-20">{header.label}</td>
                <td className="px-2 py-0">{header.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Body paragraphs */}
        <div className="px-2 py-0.5 text-[14px] leading-[2.4] text-slate-800">
          {emailTable.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Right scrollbar area */}
      <div className="w-4 border-l border-black flex flex-col">
        {/* Up arrow */}
        <div className="flex items-center justify-center py-1">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-[6px] border-transparent border-b-black" />
        </div>
        {/* Spacer */}
        <div className="flex-1" />
        {/* Down arrow */}
        <div className="flex items-center justify-center py-1">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-transparent border-t-black" />
        </div>
      </div>
    </div>
  );
}
