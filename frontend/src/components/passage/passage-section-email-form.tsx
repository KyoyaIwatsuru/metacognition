'use client';

import type { EmailFormContent } from '@/lib/types';

type EmailFormBodyProps = {
  emailForm: EmailFormContent;
};

export function EmailFormBody({ emailForm }: EmailFormBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* Header table */}
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold w-16">
              <span data-passage-metadata-label="recipient">To:</span>
            </td>
            <td className="px-2 py-0">
              <span data-passage-metadata="recipient">{emailForm.to}</span>
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">
              <span data-passage-metadata-label="sender">From:</span>
            </td>
            <td className="px-2 py-0">
              <span data-passage-metadata="sender">{emailForm.from}</span>
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">
              <span data-passage-metadata-label="date">Date:</span>
            </td>
            <td className="px-2 py-0">
              <span data-passage-metadata="date">{emailForm.date}</span>
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">
              <span data-passage-metadata-label="subject">Subject:</span>
            </td>
            <td className="px-2 py-0">
              <span data-passage-metadata="subject">{emailForm.subject}</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Body area */}
      <div className="px-2 py-1">
        {/* Greeting */}
        <p data-passage-paragraph>{emailForm.greeting}</p>

        {/* Body paragraphs */}
        {emailForm.body.map((paragraph, idx) => (
          <p key={idx} data-passage-paragraph>
            {paragraph}
          </p>
        ))}

        {/* Closing */}
        <p data-passage-paragraph>{emailForm.closing}</p>

        {/* Signature */}
        <p data-passage-paragraph>
          {emailForm.signature.name}, {emailForm.signature.title}
        </p>
      </div>
    </div>
  );
}
