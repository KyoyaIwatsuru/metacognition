'use client';

import type { OnlineChatDiscussionContent } from '@/lib/types';
import { PARAGRAPH_NUMBERS } from './paragraph-numbers';

type OnlineChatDiscussionBodyProps = {
  onlineChatDiscussion: OnlineChatDiscussionContent;
  showParagraphNumbers?: boolean;
};

/**
 * Online Chat Discussion format matching TOEIC style.
 * Header with 3-person icon, messages with [time] format, scrollbar decoration.
 */
export function OnlineChatDiscussionBody({
  onlineChatDiscussion,
  showParagraphNumbers,
}: OnlineChatDiscussionBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* Header bar */}
      <div className="h-6 border-b border-black bg-white" />

      {/* Message area + scrollbar decoration */}
      <div className="flex">
        <div className="flex-1 px-4 py-3 space-y-3">
          {onlineChatDiscussion.messages.map((msg, idx) => (
            <div key={idx} className="flex">
              {showParagraphNumbers && (
                <span className="w-5 shrink-0 text-slate-600 font-medium">
                  {PARAGRAPH_NUMBERS[idx]}
                </span>
              )}
              <p className="flex-1">
                <span className="font-bold" data-passage-metadata={`sender_${idx}`}>
                  {msg.sender}
                </span>{' '}
                <span className="font-bold" data-passage-metadata={`time_${idx}`}>
                  [{msg.time}]
                </span>{' '}
                <span data-passage-paragraph>{msg.text}</span>
              </p>
            </div>
          ))}
        </div>
        {/* Right scrollbar decoration */}
        <div className="w-4 border-l border-black flex flex-col">
          <div className="flex-1 flex items-start justify-center pt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black" />
          </div>
          <div className="flex-1 flex items-end justify-center pb-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
