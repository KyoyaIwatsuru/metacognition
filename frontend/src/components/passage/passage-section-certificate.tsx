'use client';

import type { CertificateContent } from '@/lib/types';

type CertificateBodyProps = {
  certificate: CertificateContent;
};

export function CertificateBody({ certificate }: CertificateBodyProps) {
  return (
    <div className="relative border-2 border-black bg-white p-2">
      {/* Wavy border decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 8px, transparent 8px),
            repeating-linear-gradient(90deg, transparent, transparent 8px, transparent 8px)
          `,
        }}
      />

      {/* Left wavy border */}
      <div className="absolute left-1 top-0 bottom-0 w-4 flex flex-col justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <svg key={i} viewBox="0 0 10 10" className="w-3 h-3 text-black">
            <path d="M0,5 Q2.5,0 5,5 T10,5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        ))}
      </div>

      {/* Right wavy border */}
      <div className="absolute right-1 top-0 bottom-0 w-4 flex flex-col justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <svg key={i} viewBox="0 0 10 10" className="w-3 h-3 text-black">
            <path d="M0,5 Q2.5,0 5,5 T10,5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        ))}
      </div>

      {/* Top wavy border */}
      <div className="absolute top-1 left-0 right-0 h-4 flex justify-around">
        {Array.from({ length: 30 }).map((_, i) => (
          <svg key={i} viewBox="0 0 10 10" className="w-3 h-3 text-black rotate-90">
            <path d="M0,5 Q2.5,0 5,5 T10,5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        ))}
      </div>

      {/* Bottom wavy border */}
      <div className="absolute bottom-1 left-0 right-0 h-4 flex justify-around">
        {Array.from({ length: 30 }).map((_, i) => (
          <svg key={i} viewBox="0 0 10 10" className="w-3 h-3 text-black rotate-90">
            <path d="M0,5 Q2.5,0 5,5 T10,5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        ))}
      </div>

      {/* Main content */}
      <div className="relative mx-6 my-4 text-center text-[14px] leading-[1.6] text-slate-800">
        {/* Organization name */}
        <p className="text-sm tracking-wide mb-2">{certificate.organization}</p>

        {/* Certificate title */}
        <h2 className="text-xl font-bold mb-1">{certificate.title}</h2>

        {/* Subtitle */}
        {certificate.subtitle && <p className="text-sm mb-1">{certificate.subtitle}</p>}

        {/* Recipient */}
        <p className="text-2xl font-serif italic mb-2">{certificate.recipient}</p>

        {/* Double line */}
        <div className="border-t-2 border-b border-black my-3 py-0.5" />

        {/* Body text */}
        <div className="text-left space-y-2 mb-6">
          {certificate.body.map((paragraph, idx) => (
            <p key={idx} className="text-sm">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Signature area */}
        <div className="flex justify-between items-end">
          <div className="text-left">
            {/* Signature (italic script style) */}
            <p className="font-serif italic text-lg mb-0 border-b border-black pb-1">
              {certificate.signature}
            </p>
            {/* Signer name and title */}
            <p className="text-sm mt-1">
              {certificate.signerName}, {certificate.signerTitle}
            </p>
          </div>

          {/* Seal/Stamp */}
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-400 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border-2 border-gray-500 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500" />
            {/* Center */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
