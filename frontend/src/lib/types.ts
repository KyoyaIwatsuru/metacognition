export type Phase = 'pre' | 'training' | 'post';
export type Group = 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3';
export type EyeTrackerStatus = 'disconnected' | 'connected' | 'loading';

export type Choice = {
  id: string;
  textEn: string;
  textJa?: string;
};

export type Question = {
  id: string;
  promptEn: string;
  promptJa?: string;
  choices: Choice[];
  correctChoiceId: string;
  explanationGeneralJa?: string;
  metacogFeedbackJa?: string;
};

export type Analog = {
  id: string;
  title?: string;
  direction?: string;
  directionJa?: string;
  paragraphsEn: string[];
  paragraphsJa?: string[];
  questions: Question[];
  sections?: PassageSection[];
};

export type Passage = {
  id: string;
  title?: string;
  direction?: string; // "Questions 181-185 refer to the following advertisement and letter."
  directionJa?: string; // "問題Q1-4は次の広告と手紙に関するものです。"
  paragraphsEn: string[];
  paragraphsJa?: string[];
  questions: Question[];
  analogs?: Analog[];
  sections?: PassageSection[];
};

export type LogEvent = {
  timestamp: string;
  participantId?: string;
  group?: Group;
  phase?: Phase;
  event: string;
  [key: string]: unknown;
};

export type PassageSection =
  | { layoutType: 'ad'; locale: 'en' | 'ja'; ad: AdContent }
  | { layoutType: 'letter'; locale: 'en' | 'ja'; letter: LetterContent }
  | { layoutType: 'report'; locale: 'en' | 'ja'; report: ReportContent }
  | { layoutType: 'plain'; locale: 'en' | 'ja'; paragraphs: string[] }
  | { layoutType: 'webpage'; locale: 'en' | 'ja'; webpage: WebpageContent }
  | { layoutType: 'schedule'; locale: 'en' | 'ja'; schedule: ScheduleContent }
  | { layoutType: 'article'; locale: 'en' | 'ja'; article: ArticleContent }
  | { layoutType: 'notice'; locale: 'en' | 'ja'; notice: NoticeContent }
  | { layoutType: 'orderForm'; locale: 'en' | 'ja'; orderForm: OrderFormContent }
  | {
      layoutType: 'textMessageChain';
      locale: 'en' | 'ja';
      textMessageChain: TextMessageChainContent;
    }
  | {
      layoutType: 'onlineChatDiscussion';
      locale: 'en' | 'ja';
      onlineChatDiscussion: OnlineChatDiscussionContent;
    }
  | { layoutType: 'memo'; locale: 'en' | 'ja'; memo: MemoContent }
  | { layoutType: 'chatTablet'; locale: 'en' | 'ja'; chatTablet: ChatTabletContent }
  | { layoutType: 'pressRelease'; locale: 'en' | 'ja'; pressRelease: PressReleaseContent }
  | { layoutType: 'emailForm'; locale: 'en' | 'ja'; emailForm: EmailFormContent }
  | {
      layoutType: 'conferenceSchedule';
      locale: 'en' | 'ja';
      conferenceSchedule: ConferenceScheduleContent;
    }
  | {
      layoutType: 'customerServiceExchange';
      locale: 'en' | 'ja';
      customerServiceExchange: CustomerServiceExchangeContent;
    }
  | {
      layoutType: 'customerReviews';
      locale: 'en' | 'ja';
      customerReviews: CustomerReviewsContent;
    }
  | {
      layoutType: 'packageTracking';
      locale: 'en' | 'ja';
      packageTracking: PackageTrackingContent;
    }
  | {
      layoutType: 'emailTable';
      locale: 'en' | 'ja';
      emailTable: EmailTableContent;
    }
  | {
      layoutType: 'certificate';
      locale: 'en' | 'ja';
      certificate: CertificateContent;
    }
  | {
      layoutType: 'invoice';
      locale: 'en' | 'ja';
      invoice: InvoiceContent;
    }
  | {
      layoutType: 'adChainBorder';
      locale: 'en' | 'ja';
      adChainBorder: AdChainBorderContent;
    }
  | {
      layoutType: 'newsletterProfile';
      locale: 'en' | 'ja';
      newsletterProfile: NewsletterProfileContent;
    };

export type AdContent = {
  headline?: string;
  subheading?: string;
  meta?: Record<string, string>;
  bullets?: string[];
  body?: string[];
  footer?: string; // 最後の行（例: "Schedule a tour..."）
};

export type LetterContent = {
  // メール形式用（既存）
  to?: string;
  from?: string;
  subject?: string;
  attachments?: string[];
  // ビジネスレター形式用（追加）
  sender?: {
    name: string;
    address?: string[];
  };
  date?: string;
  recipient?: {
    name: string;
    title?: string;
    company?: string;
    address?: string[];
  };
  greeting?: string; // "Dear Ms. Ford,"
  body: string[];
  closing?: string; // "Yours sincerely,"
  signature?: string; // 署名（イタリック体で表示）
  senderName?: string; // 活字の名前
};

export type ReportContent = {
  header: string; // 組織名・会社名（ヘッダー）
  title: string; // 報告書タイトル
  meta?: { label: string; value: string }[]; // Client, Property, Purpose, Dates等
  bodyTitle?: string; // 本文見出し（太字で表示）例: "Summary of main findings..."
  body: string[]; // 本文段落
  footer?: string; // Assessment prepared by...
};

export type WebpageContent = {
  url: string; // ブラウザのアドレスバーに表示するURL
  title: string; // ページタイトル（見出し）
  body: string[]; // 本文段落
};

export type ScheduleContent = {
  header: string; // 会社名（例: "Marsantis Shipping"）
  subheader?: string; // ルート名（例: "Valencia to Toyohashi Service"）
  subheader2?: string; // スケジュール名（例: "Spring Schedule"）
  columns: string[]; // テーブルヘッダー列名
  rows: string[][]; // データ行
};

export type ArticleContent = {
  headline: string; // 記事見出し（例: "Burger City Bistro to Become BC Bistro"）
  byline?: string; // 著者名（例: "By Lola Jimenez"）
  body: string[]; // 本文段落（[1][2][3][4]などのマーカー含む）
  singleColumn?: boolean; // 1カラムレイアウト（プレスリリース風）
};

export type NoticeContent = {
  title: string; // タイトル（例: "Crofton Power"）
  body: string[]; // 本文段落（セクションヘッダーを含む、[1][2][3][4]マーカー含む）
};

export type OrderFormContent = {
  title: string; // フォームタイトル（例: "Greencove Catering Reservation Request"）
  fields: { label: string; value: string }[]; // フィールド（ラベル: 値）
  checkboxes?: { label: string; checked: boolean }[]; // チェックボックス項目
  lastField?: { label: string; value: string }; // チェックボックス後に表示するフィールド
};

export type TextMessageChainContent = {
  messages: {
    sender: string; // 送信者名（例: "Ian Tsukase"）
    time: string; // 送信時刻（例: "9:32 A.M."）
    text: string; // メッセージ本文
  }[];
};

export type OnlineChatDiscussionContent = {
  messages: {
    sender: string; // 送信者名（例: "Melissa Hewitt"）
    time: string; // 送信時刻（例: "11:11 A.M."）
    text: string; // メッセージ本文
  }[];
};

export type MemoContent = {
  to: string; // 宛先（例: "All employees"）
  from: string; // 差出人（例: "Patricia Ogdencort, CEO"）
  date: string; // 日付（例: "22 June"）
  subject: string; // 件名（例: "Company-wide discussion"）
  body: string[]; // 本文段落（[1][2][3][4]マーカー含む）
};

export type ChatTabletContent = {
  messages: {
    sender: string; // 送信者名（例: "Gail Oneta"）
    time: string; // 送信時刻（例: "1:20 P.M."）
    text: string; // メッセージ本文
  }[];
};

export type PressReleaseContent = {
  releaseType: string; // "FOR IMMEDIATE RELEASE"
  contact: {
    name: string; // "Carla Guerra"
    phone: string; // "512-555-0172"
    email: string; // "c_guerra@dupontcamera.com"
  };
  headline: string; // 見出し（下線付き太字）
  body: string[]; // 本文段落
};

export type EmailFormContent = {
  to: string; // 受信者
  from: string; // 送信者
  date: string; // 日付
  subject: string; // 件名
  greeting: string; // 挨拶（例: "Dear Won Ho,"）
  body: string[]; // 本文段落
  closing: string; // 結び（例: "Many thanks,"）
  signature: {
    name: string; // 名前
    title: string; // 役職
  };
};

export type ConferenceScheduleContent = {
  title: string; // メインタイトル（例: "WR Asiana Technology Conference, Thursday, 8 May"）
  subtitle?: string; // サブタイトル（例: "Afternoon schedule, continued"）
  subtitle2?: string; // サブタイトル2（例: "Concurrent Business Sessions—2:00 to 3:00 P.M."）
  columns: string[]; // 列ヘッダー（例: ["", "1", "2", "3", "4"]）
  rows: { label: string; values: string[] }[]; // 行データ
};

export type CustomerServiceExchangeContent = {
  messages: {
    sender: string; // 送信者名（例: "Mariam Abebe"）
    time: string; // 送信時刻（例: "9:05 A.M."）
    text: string; // メッセージ本文
  }[];
};

export type CustomerReviewsContent = {
  navItems: string[]; // ナビゲーション項目（例: ["Home", "Products", "Reviews", "Contact Us"]）
  activeNav: string; // アクティブなナビ（例: "Reviews"）
  reviews: {
    name: string; // レビュアー名（例: "Adrianna Rossi"）
    rating: number; // 星評価（1-5）
    text: string; // レビュー本文
  }[];
};

export type PackageTrackingContent = {
  title: string; // メインタイトル（例: "National Package Service (NPS) Package Tracking"）
  subtitle: string; // サブタイトル（例: "Shipment number: DM5671"）
  columns: string[]; // 列ヘッダー（例: ["Location", "Date", "Local time", "Action"]）
  rows: string[][]; // データ行
  footerLeft: { label: string; value: string }[]; // 左側フッター情報
  footerRight: { label: string; value: string }[]; // 右側フッター情報
};

export type EmailTableContent = {
  title?: string; // 装飾ヘッダータイトル（例: "*E-mail*"）
  headers: { label: string; value: string }[]; // From, To, Date, Subject などのヘッダー行
  body: string[]; // 本文段落
  showScrollbar?: boolean; // スクロールバーを表示するかどうか
};

export type CertificateContent = {
  organization: string; // 発行団体名（例: "ARBORLEE INTERNATIONAL"）
  title: string; // 証明書タイトル（例: "CERTIFICATE OF APPRECIATION"）
  subtitle?: string; // サブタイトル（例: "FOR"）
  recipient: string; // 受賞者名（例: "Vernment, Inc."）
  body: string[]; // 本文段落
  signature: string; // 署名（イタリック体）
  signerName: string; // 署名者名
  signerTitle: string; // 署名者役職
};

export type InvoiceContent = {
  title: string; // 請求書タイトル（例: "Green Lyre Office Furniture Invoice"）
  customerInfo: { label: string; value: string }[]; // 購入者情報（Purchased by, Phone, Order number など）
  columns: string[]; // テーブル列ヘッダー（例: ["Description", "Item Number", "Color", "Quantity", "Total Price"]）
  items: string[][]; // 商品データ行
  summary: { label: string; value: string }[]; // 集計（Subtotal, Discount, Delivery, Total Charges）
};

export type AdChainBorderContent = {
  headline: string; // タイトル（例: "ADELETTO AND SONS"）
  body: string[]; // 本文段落
  bullets?: string[]; // 箇条書き項目
};

export type NewsletterProfileContent = {
  title: string; // メインタイトル（例: "Moonstone Apartments Newsletter"）
  sectionTitle: string; // セクションタイトル（例: "Resident Profile: Aisha Abara"）
  body: string[]; // 本文段落
};
