'use client';

import type { EmailFormContent } from '@/lib/types';

type EmailFormBodyProps = {
  emailForm: EmailFormContent;
};

export function EmailFormBody({ emailForm }: EmailFormBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[1.6] text-slate-800">
      {/* Header table */}
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-1 font-bold w-24">To:</td>
            <td className="px-2 py-1">{emailForm.to}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-1 font-bold">From:</td>
            <td className="px-2 py-1">{emailForm.from}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-1 font-bold">Date:</td>
            <td className="px-2 py-1">{emailForm.date}</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black px-2 py-1 font-bold">Subject:</td>
            <td className="px-2 py-1">{emailForm.subject}</td>
          </tr>
        </tbody>
      </table>

      {/* Body area with scrollbar decoration */}
      <div className="flex">
        {/* Body content */}
        <div className="flex-1 px-4 py-3 space-y-4 text-sm">
          {/* Greeting */}
          <p>{emailForm.greeting}</p>

          {/* Body paragraphs */}
          {emailForm.body.map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}

          {/* Closing */}
          <p>{emailForm.closing}</p>

          {/* Signature */}
          <div>
            <p>{emailForm.signature.name}</p>
            <p>{emailForm.signature.title}</p>
          </div>
        </div>

        {/* Right scrollbar decoration */}
        <div className="w-4 border-l border-black flex flex-col">
          <div className="flex-1 flex items-start justify-center pt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black" />
          </div>
          <div className="flex-1 flex items-end justify-center pb-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
