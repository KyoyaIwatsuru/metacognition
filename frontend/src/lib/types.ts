export type Phase = 'pre' | 'training' | 'post';
export type Group = 'A' | 'B';
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
  | { layoutType: 'plain'; locale: 'en' | 'ja'; paragraphs: string[] };

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
