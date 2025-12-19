'use client';

import type { EmailTableContent } from '@/lib/types';

type EmailTableBodyProps = {
  emailTable: EmailTableContent;
};

export function EmailTableBody({ emailTable }: EmailTableBodyProps) {
  const hasTitle = !!emailTable.title;
  const showScrollbar = emailTable.showScrollbar ?? false;

  return (
    <div className="border border-black bg-white">
      {/* Decorative header with title */}
      {hasTitle && (
        <>
          {/* Striped decorative bars */}
          <div className="h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 border-b border-gray-500" />
          <div className="h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <div className="h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 border-b border-gray-500" />
          {/* Title */}
          <div className="text-center py-1 font-bold text-lg border-b border-black">
            {emailTable.title}
          </div>
        </>
      )}

      {/* Main content with optional scrollbar */}
      <div className={showScrollbar ? 'flex' : ''}>
        {/* Content area */}
        <div className="flex-1">
          {/* Header table */}
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              {emailTable.headers.map((header, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="border-r border-black px-2 py-1 font-bold w-20 bg-gray-50">
                    {header.label}
                  </td>
                  <td className="px-2 py-1">{header.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Body paragraphs */}
          <div className="px-4 py-3 space-y-3 text-[14px] leading-[1.6] text-slate-800 border-t border-black">
            {emailTable.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Scrollbar */}
        {showScrollbar && (
          <div className="w-4 flex flex-col bg-gray-200 border-l border-black">
            {/* Up arrow */}
            <div className="flex items-center justify-center py-1 bg-gray-300 border-b border-gray-400">
              <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
                <path d="M12 8l-6 6h12z" />
              </svg>
            </div>
            {/* Spacer */}
            <div className="flex-1 bg-gray-200" />
            {/* Down arrow */}
            <div className="flex items-center justify-center py-1 bg-gray-300 border-t border-gray-400">
              <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
                <path d="M12 16l6-6h-12z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
