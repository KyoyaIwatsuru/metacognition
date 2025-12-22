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
            <td className="border-r border-black px-2 py-0 font-bold w-16">To:</td>
            <td className="px-2 py-0">{emailForm.to}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">From:</td>
            <td className="px-2 py-0">{emailForm.from}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">Date:</td>
            <td className="px-2 py-0">{emailForm.date}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-0 font-bold">Subject:</td>
            <td className="px-2 py-0">{emailForm.subject}</td>
          </tr>
        </tbody>
      </table>

      {/* Body area */}
      <div className="px-2 py-1">
        {/* Greeting */}
        <p>{emailForm.greeting}</p>

        {/* Body paragraphs */}
        {emailForm.body.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}

        {/* Closing */}
        <p>{emailForm.closing}</p>

        {/* Signature */}
        <p>
          {emailForm.signature.name}, {emailForm.signature.title}
        </p>
      </div>
    </div>
  );
}
