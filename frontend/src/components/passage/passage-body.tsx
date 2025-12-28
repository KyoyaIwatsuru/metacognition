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
  maxSections?: number; // 表示するセクション数の上限（最初からN個）
  skipSections?: number; // スキップするセクション数（最初のN個を飛ばす）
};

/**
 * Render passage sections with layout-aware components.
 * Fallback to simple paragraph list when no sections provided.
 */
// Helper function to render a section based on its layoutType
function renderSectionContent(section: PassageSection) {
  if (section.layoutType === 'ad') {
    return <AdBody ad={section.ad} />;
  }
  if (section.layoutType === 'letter') {
    return <LetterBody letter={section.letter} />;
  }
  if (section.layoutType === 'report') {
    return <ReportBody report={section.report} />;
  }
  if (section.layoutType === 'webpage') {
    return <WebpageBody webpage={section.webpage} />;
  }
  if (section.layoutType === 'schedule') {
    return <ScheduleBody schedule={section.schedule} />;
  }
  if (section.layoutType === 'article') {
    return <ArticleBody article={section.article} />;
  }
  if (section.layoutType === 'notice') {
    return <NoticeBody notice={section.notice} />;
  }
  if (section.layoutType === 'orderForm') {
    return <OrderFormBody orderForm={section.orderForm} />;
  }
  if (section.layoutType === 'textMessageChain') {
    return <TextMessageChainBody textMessageChain={section.textMessageChain} />;
  }
  if (section.layoutType === 'onlineChatDiscussion') {
    return <OnlineChatDiscussionBody onlineChatDiscussion={section.onlineChatDiscussion} />;
  }
  if (section.layoutType === 'memo') {
    return <MemoBody memo={section.memo} />;
  }
  if (section.layoutType === 'chatTablet') {
    return <ChatTabletBody chatTablet={section.chatTablet} />;
  }
  if (section.layoutType === 'pressRelease') {
    return <PressReleaseBody pressRelease={section.pressRelease} />;
  }
  if (section.layoutType === 'emailForm') {
    return <EmailFormBody emailForm={section.emailForm} />;
  }
  if (section.layoutType === 'conferenceSchedule') {
    return <ConferenceScheduleBody conferenceSchedule={section.conferenceSchedule} />;
  }
  if (section.layoutType === 'customerServiceExchange') {
    return (
      <CustomerServiceExchangeBody customerServiceExchange={section.customerServiceExchange} />
    );
  }
  if (section.layoutType === 'customerReviews') {
    return <CustomerReviewsBody customerReviews={section.customerReviews} />;
  }
  if (section.layoutType === 'packageTracking') {
    return <PackageTrackingBody packageTracking={section.packageTracking} />;
  }
  if (section.layoutType === 'emailTable') {
    return <EmailTableBody emailTable={section.emailTable} />;
  }
  if (section.layoutType === 'certificate') {
    return <CertificateBody certificate={section.certificate} />;
  }
  if (section.layoutType === 'invoice') {
    return <InvoiceBody invoice={section.invoice} />;
  }
  if (section.layoutType === 'adChainBorder') {
    return <AdChainBorderBody adChainBorder={section.adChainBorder} />;
  }
  if (section.layoutType === 'newsletterProfile') {
    return <NewsletterProfileBody newsletterProfile={section.newsletterProfile} />;
  }
  return (
    <div className="space-y-2 rounded-md border bg-card p-4 text-sm text-muted-foreground whitespace-pre-line">
      {section.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function PassageBody({
  sections,
  paragraphsEn,
  direction,
  directionJa,
  locale = 'en',
  maxSections,
  skipSections = 0,
}: PassageBodyProps) {
  if (sections && sections.length > 0) {
    // Get sections for both locales
    let enSections = sections.filter((s) => s.locale === 'en');
    let jaSections = sections.filter((s) => s.locale === 'ja');

    // Apply skip and max
    if (skipSections > 0) {
      enSections = enSections.slice(skipSections);
      jaSections = jaSections.slice(skipSections);
    }
    if (maxSections !== undefined) {
      enSections = enSections.slice(0, maxSections);
      jaSections = jaSections.slice(0, maxSections);
    }

    // Use visible sections based on locale, hidden sections for coordinate collection
    const visibleSections = locale === 'en' ? enSections : jaSections;
    const hiddenSections = locale === 'en' ? jaSections : enSections;
    const hiddenLocale = locale === 'en' ? 'ja' : 'en';

    return (
      <div className="space-y-0.5" style={{ position: 'relative' }}>
        {/* 導入文（スキップしていない場合のみ表示） */}
        {skipSections === 0 ? (
          <div style={{ position: 'relative' }}>
            {/* Visible direction */}
            {(locale === 'en' ? direction : (directionJa ?? direction)) ? (
              <p
                className="text-sm font-semibold text-slate-800"
                data-passage-instruction="true"
                data-passage-instruction-locale={locale}
              >
                {locale === 'en' ? direction : (directionJa ?? direction)}
              </p>
            ) : null}
            {/* Hidden direction for coordinate collection */}
            {(hiddenLocale === 'en' ? direction : (directionJa ?? direction)) ? (
              <p
                className="text-sm font-semibold text-slate-800"
                style={{
                  visibility: 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                data-passage-instruction-hidden="true"
                data-passage-instruction-locale={hiddenLocale}
              >
                {hiddenLocale === 'en' ? direction : (directionJa ?? direction)}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Sections - render EN/JA pairs together for same coordinates */}
        {visibleSections.map((visibleSection, idx) => {
          const sectionIndex = skipSections + idx;
          const hiddenSection = hiddenSections[idx];
          return (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Visible section */}
              <div data-passage-section={sectionIndex} data-passage-section-locale={locale}>
                {renderSectionContent(visibleSection)}
              </div>
              {/* Hidden section for coordinate collection (same position) */}
              {hiddenSection ? (
                <div
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  data-passage-section-hidden={sectionIndex}
                  data-passage-section-locale={hiddenLocale}
                >
                  {renderSectionContent(hiddenSection)}
                </div>
              ) : null}
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
