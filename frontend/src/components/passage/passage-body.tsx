'use client';

import type { PassageSection } from '@/lib/types';
import { AdBody } from '@/components/passage/passage-section-ad';
import { ArticleBody } from '@/components/passage/passage-section-article';
import { LetterBody } from '@/components/passage/passage-section-letter';
import { NoticeBody } from '@/components/passage/passage-section-notice';
import { OrderFormBody } from '@/components/passage/passage-section-order-form';
import { ReportBody } from '@/components/passage/passage-section-report';
import { ScheduleBody } from '@/components/passage/passage-section-schedule';
import { TextMessageChainBody } from '@/components/passage/passage-section-text-message-chain';
import { OnlineChatDiscussionBody } from '@/components/passage/passage-section-online-chat-discussion';
import { WebpageBody } from '@/components/passage/passage-section-webpage';

type PassageBodyProps = {
  sections?: PassageSection[];
  paragraphsEn?: string[];
  direction?: string; // "Questions 181-185 refer to the following advertisement and letter."
  directionJa?: string; // "問題Q1-4は次の広告と手紙に関するものです。"
  locale?: 'en' | 'ja';
};

/**
 * Render passage sections with layout-aware components.
 * Fallback to simple paragraph list when no sections provided.
 */
export function PassageBody({
  sections,
  paragraphsEn,
  direction,
  directionJa,
  locale = 'en',
}: PassageBodyProps) {
  const displayDirection = locale === 'ja' ? (directionJa ?? direction) : direction;

  if (sections && sections.length > 0) {
    return (
      <div className="space-y-2">
        {/* 導入文 */}
        {displayDirection ? (
          <p className="text-sm font-semibold text-slate-800">{displayDirection}</p>
        ) : null}
        {sections
          .filter((s) => s.locale === locale)
          .map((section, idx) => {
            if (section.layoutType === 'ad') {
              return <AdBody key={idx} ad={section.ad} />;
            }
            if (section.layoutType === 'letter') {
              return <LetterBody key={idx} letter={section.letter} />;
            }
            if (section.layoutType === 'report') {
              return <ReportBody key={idx} report={section.report} />;
            }
            if (section.layoutType === 'webpage') {
              return <WebpageBody key={idx} webpage={section.webpage} />;
            }
            if (section.layoutType === 'schedule') {
              return <ScheduleBody key={idx} schedule={section.schedule} />;
            }
            if (section.layoutType === 'article') {
              return <ArticleBody key={idx} article={section.article} />;
            }
            if (section.layoutType === 'notice') {
              return <NoticeBody key={idx} notice={section.notice} />;
            }
            if (section.layoutType === 'orderForm') {
              return <OrderFormBody key={idx} orderForm={section.orderForm} />;
            }
            if (section.layoutType === 'textMessageChain') {
              return <TextMessageChainBody key={idx} textMessageChain={section.textMessageChain} />;
            }
            if (section.layoutType === 'onlineChatDiscussion') {
              return (
                <OnlineChatDiscussionBody
                  key={idx}
                  onlineChatDiscussion={section.onlineChatDiscussion}
                />
              );
            }
            return (
              <div
                key={idx}
                className="space-y-2 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line"
              >
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            );
          })}
      </div>
    );
  }

  const paragraphs = paragraphsEn ?? [];
  return (
    <div className="space-y-3 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>
  );
}
