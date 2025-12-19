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
import { MemoBody } from '@/components/passage/passage-section-memo';
import { ChatTabletBody } from '@/components/passage/passage-section-chat-tablet';
import { PressReleaseBody } from '@/components/passage/passage-section-press-release';
import { WebpageBody } from '@/components/passage/passage-section-webpage';
import { EmailFormBody } from '@/components/passage/passage-section-email-form';
import { ConferenceScheduleBody } from '@/components/passage/passage-section-conference-schedule';
import { CustomerServiceExchangeBody } from '@/components/passage/passage-section-customer-service-exchange';
import { CustomerReviewsBody } from '@/components/passage/passage-section-customer-reviews';
import { PackageTrackingBody } from '@/components/passage/passage-section-package-tracking';
import { EmailTableBody } from '@/components/passage/passage-section-email-table';
import { CertificateBody } from '@/components/passage/passage-section-certificate';
import { InvoiceBody } from '@/components/passage/passage-section-invoice';
import { AdChainBorderBody } from '@/components/passage/passage-section-ad-chain-border';
import { NewsletterProfileBody } from '@/components/passage/passage-section-newsletter-profile';

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
            if (section.layoutType === 'memo') {
              return <MemoBody key={idx} memo={section.memo} />;
            }
            if (section.layoutType === 'chatTablet') {
              return <ChatTabletBody key={idx} chatTablet={section.chatTablet} />;
            }
            if (section.layoutType === 'pressRelease') {
              return <PressReleaseBody key={idx} pressRelease={section.pressRelease} />;
            }
            if (section.layoutType === 'emailForm') {
              return <EmailFormBody key={idx} emailForm={section.emailForm} />;
            }
            if (section.layoutType === 'conferenceSchedule') {
              return (
                <ConferenceScheduleBody key={idx} conferenceSchedule={section.conferenceSchedule} />
              );
            }
            if (section.layoutType === 'customerServiceExchange') {
              return (
                <CustomerServiceExchangeBody
                  key={idx}
                  customerServiceExchange={section.customerServiceExchange}
                />
              );
            }
            if (section.layoutType === 'customerReviews') {
              return <CustomerReviewsBody key={idx} customerReviews={section.customerReviews} />;
            }
            if (section.layoutType === 'packageTracking') {
              return <PackageTrackingBody key={idx} packageTracking={section.packageTracking} />;
            }
            if (section.layoutType === 'emailTable') {
              return <EmailTableBody key={idx} emailTable={section.emailTable} />;
            }
            if (section.layoutType === 'certificate') {
              return <CertificateBody key={idx} certificate={section.certificate} />;
            }
            if (section.layoutType === 'invoice') {
              return <InvoiceBody key={idx} invoice={section.invoice} />;
            }
            if (section.layoutType === 'adChainBorder') {
              return <AdChainBorderBody key={idx} adChainBorder={section.adChainBorder} />;
            }
            if (section.layoutType === 'newsletterProfile') {
              return (
                <NewsletterProfileBody key={idx} newsletterProfile={section.newsletterProfile} />
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
