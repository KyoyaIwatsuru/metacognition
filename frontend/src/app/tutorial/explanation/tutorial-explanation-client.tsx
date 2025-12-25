'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { PassageBody } from '@/components/passage/passage-body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tutorialPassage } from '@/lib/mock-data';

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

function getInitialSelections(): Record<string, string | undefined> {
  if (typeof window === 'undefined') return {};
  const saved = sessionStorage.getItem('tutorialSelections');
  if (saved) {
    sessionStorage.removeItem('tutorialSelections');
    return JSON.parse(saved);
  }
  return {};
}

export function TutorialExplanationClient() {
  const router = useRouter();
  const passage = tutorialPassage;

  const [locale, setLocale] = useState<'en' | 'ja'>('en');
  const [selections] = useState<Record<string, string | undefined>>(getInitialSelections);

  const paragraphs = useMemo(() => passage.paragraphsEn ?? [], [passage.paragraphsEn]);

  const headerLocaleToggle = (
    <Tabs value={locale} onValueChange={(v) => setLocale(v as 'en' | 'ja')}>
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="ja">日本語</TabsTrigger>
      </TabsList>
    </Tabs>
  );

  const renderExplanationContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {passage.questions.map((q, idx) => {
          const userAnswer = selections[q.id];
          const isUnanswered = !userAnswer;

          return (
            <div key={q.id} className="space-y-2">
              <div className="select-none">
                <div className="text-sm text-foreground">
                  <span className="font-semibold">Q{idx + 1}</span>{' '}
                  {locale === 'en' ? q.promptEn : (q.promptJa ?? q.promptEn)}
                  {isUnanswered ? (
                    <span className="ml-2 rounded bg-zinc-500 px-2 py-0.5 text-xs text-white font-bold">
                      未回答
                    </span>
                  ) : null}
                </div>

                <ul className="space-y-0.5 text-sm mt-2">
                  {q.choices.map((c, cIdx) => {
                    const isCorrect = c.id === q.correctChoiceId;
                    const isUserAnswer = c.id === userAnswer;
                    const isWrongAnswer = isUserAnswer && !isCorrect;
                    return (
                      <li
                        key={c.id}
                        className={
                          isCorrect
                            ? 'text-blue-600 font-medium'
                            : isWrongAnswer
                              ? 'text-red-600'
                              : ''
                        }
                      >
                        <span className="font-mono mr-1">({CHOICE_LABELS[cIdx]})</span>
                        {locale === 'en' ? c.textEn : (c.textJa ?? c.textEn)}
                        {isCorrect ? (
                          <span className="ml-2 rounded bg-blue-600 px-2 py-0.5 text-xs text-white font-bold">
                            正解
                          </span>
                        ) : null}
                        {isUserAnswer ? (
                          <span
                            className={`ml-2 rounded px-2 py-0.5 text-xs text-white font-bold ${isCorrect ? 'bg-blue-600' : 'bg-red-600'}`}
                          >
                            あなたの解答
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>

                {q.explanationGeneralJa ? (
                  <p className="text-sm text-slate-800 mt-3 whitespace-pre-line">
                    {q.explanationGeneralJa}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <AppShell
      headerSlot={headerLocaleToggle}
      leftSlot={
        <div className="h-full overflow-hidden">
          <div className={`h-full ${locale === 'ja' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <PassageBody
              sections={passage.sections}
              paragraphsEn={paragraphs}
              direction={passage.direction}
              directionJa={passage.directionJa}
              locale={locale}
            />
          </div>
        </div>
      }
      rightSlot={renderExplanationContent()}
      footer={<Button onClick={() => router.push('/tutorial/complete')}>次へ</Button>}
    />
  );
}
