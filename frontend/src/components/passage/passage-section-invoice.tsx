'use client';

import type { InvoiceContent } from '@/lib/types';

type InvoiceBodyProps = {
  invoice: InvoiceContent;
};

export function InvoiceBody({ invoice }: InvoiceBodyProps) {
  return (
    <div className="border-2 border-black bg-white">
      {/* Title with double underline */}
      <div className="px-4 pt-4 pb-2">
        <h2
          className="text-center text-lg font-bold border-b-2 border-black pb-1 mb-0.5"
          data-passage-title="true"
        >
          {invoice.title}
        </h2>
        <div className="border-b border-black" />
      </div>

      {/* Customer info section */}
      <div className="px-4 py-3 border-b border-black">
        {invoice.customerInfo.map((info, idx) => (
          <p key={idx} className="text-sm">
            {info.label && (
              <span className="font-bold" data-passage-metadata-label={`customer_${idx}`}>
                {info.label}
              </span>
            )}{' '}
            <span data-passage-metadata={`customer_${idx}`}>{info.value}</span>
          </p>
        ))}
      </div>

      {/* Items table */}
      <table className="w-full border-collapse text-sm" data-passage-table="true">
        <thead>
          <tr className="border-b-2 border-black">
            {invoice.columns.map((col, idx) => (
              <th
                key={idx}
                className="px-2 py-1 text-left font-bold border-r border-black last:border-r-0"
                data-passage-table-header={idx}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-black" data-passage-table-row={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-2 py-1 border-r border-black last:border-r-0"
                  data-passage-table-cell={`${rowIdx}-${cellIdx}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary section */}
      <div className="px-4 py-3 text-sm">
        <div className="flex flex-col items-end">
          {invoice.summary.map((item, idx) => (
            <div key={idx} className="flex justify-between w-48">
              <span
                className={idx === invoice.summary.length - 1 ? 'font-bold' : ''}
                data-passage-metadata-label={`summary_${idx}`}
              >
                {item.label}
              </span>
              <span
                className={idx === invoice.summary.length - 1 ? 'font-bold' : ''}
                data-passage-metadata={`summary_${idx}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
