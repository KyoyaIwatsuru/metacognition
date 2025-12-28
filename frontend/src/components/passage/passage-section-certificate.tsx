'use client';

import type { CertificateContent } from '@/lib/types';

type CertificateBodyProps = {
  certificate: CertificateContent;
};

export function CertificateBody({ certificate }: CertificateBodyProps) {
  return (
    <div className="border-2 border-black bg-white p-3">
      {/* Inner border frame */}
      <div className="border border-black p-4">
        {/* Main content */}
        <div className="text-center text-[14px] leading-[2.4] text-slate-800">
          {/* Organization name */}
          <p className="text-sm tracking-wide mb-2" data-passage-metadata="organization">
            {certificate.organization}
          </p>

          {/* Certificate title */}
          <h2 className="text-xl font-bold mb-1" data-passage-title="true">
            {certificate.title}
          </h2>

          {/* Subtitle */}
          {certificate.subtitle && (
            <p className="text-sm mb-1" data-passage-subtitle="true">
              {certificate.subtitle}
            </p>
          )}

          {/* Recipient */}
          <p className="text-2xl font-serif italic mb-2" data-passage-metadata="recipient">
            {certificate.recipient}
          </p>

          {/* Double line */}
          <div className="border-t-2 border-b border-black my-3 py-0.5" />

          {/* Body text */}
          <div className="text-left space-y-2 mb-6">
            {certificate.body.map((paragraph, idx) => (
              <p key={idx} data-passage-paragraph>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature area */}
          <div className="flex justify-between items-end">
            <div className="text-left">
              {/* Signature (italic script style) */}
              <p
                className="font-serif italic text-lg mb-0 border-b border-black pb-1"
                data-passage-metadata="signature"
              >
                {certificate.signature}
              </p>
              {/* Signer name and title */}
              <p className="text-sm mt-1" data-passage-metadata="signer">
                {certificate.signerName}, {certificate.signerTitle}
              </p>
            </div>

            {/* Seal/Stamp - starburst style */}
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Starburst outer edge */}
                <polygon
                  points="50,0 58,35 95,20 68,45 100,50 68,55 95,80 58,65 50,100 42,65 5,80 32,55 0,50 32,45 5,20 42,35"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="1"
                />
                {/* Middle ring */}
                <circle cx="50" cy="50" r="32" fill="#A1A1AA" stroke="#71717A" strokeWidth="1" />
                {/* Inner circle */}
                <circle cx="50" cy="50" r="22" fill="#B4B4B4" stroke="#9CA3AF" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
