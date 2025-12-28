'use client';

import type { NewsletterProfileContent } from '@/lib/types';

type NewsletterProfileBodyProps = {
  newsletterProfile: NewsletterProfileContent;
};

/**
 * Newsletter profile format matching TOEIC style.
 * Includes main title, section title (bold italic), and body paragraphs.
 */
export function NewsletterProfileBody({ newsletterProfile }: NewsletterProfileBodyProps) {
  return (
    <div className="bg-white text-[14px] leading-[2.4] text-slate-800 p-4">
      {/* メインタイトル */}
      <h2 className="text-base font-bold mb-4" data-passage-title="true">
        {newsletterProfile.title}
      </h2>

      {/* セクションタイトル（太字イタリック） */}
      <h3 className="font-bold italic mb-3" data-passage-subtitle="true">
        {newsletterProfile.sectionTitle}
      </h3>

      {/* 本文 */}
      <div className="space-y-3">
        {newsletterProfile.body.map((p, idx) => (
          <p key={idx} className="whitespace-pre-line text-justify" data-passage-paragraph>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
