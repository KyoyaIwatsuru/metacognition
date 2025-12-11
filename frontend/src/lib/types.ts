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
  paragraphsEn: string[];
  paragraphsJa?: string[];
  question: Question;
};

export type Passage = {
  id: string;
  title?: string;
  paragraphsEn: string[];
  paragraphsJa?: string[];
  questions: Question[];
  analogs?: Analog[];
};

export type LogEvent = {
  timestamp: string;
  participantId?: string;
  group?: Group;
  phase?: Phase;
  event: string;
  [key: string]: unknown;
};
