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
    };

export type AdContent = {
  headline?: string;
  subheading?: string;
  meta?: Record<string, string>;
  bullets?: string[];
  body?: string[];
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
