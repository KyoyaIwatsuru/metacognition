'use client';

import type { TextMessageChainContent } from '@/lib/types';

type TextMessageChainBodyProps = {
  textMessageChain: TextMessageChainContent;
};

/**
 * Text message chain format matching TOEIC style.
 * Displays messages in a phone/tablet-like frame with rounded borders.
 */
export function TextMessageChainBody({ textMessageChain }: TextMessageChainBodyProps) {
  return (
    <div className="border-2 border-black rounded-3xl bg-white text-[14px] leading-[2.4] text-slate-800 p-1 max-w-xl mx-auto">
      {/* 上部のドット装飾 */}
      <div className="flex justify-end items-center px-4 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-3 h-3 rounded-full bg-black" />
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="px-3 py-2 space-y-3">
        {textMessageChain.messages.map((msg, idx) => (
          <div key={idx} className="border border-slate-300 rounded-lg p-3 bg-white">
            <p className="font-bold mb-1">
              <span data-passage-metadata={`sender_${idx}`}>{msg.sender}</span>{' '}
              <span data-passage-metadata={`time_${idx}`}>[{msg.time}]</span>
            </p>
            <p className="whitespace-pre-line" data-passage-paragraph>
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* 下部のホームボタン風装飾 */}
      <div className="flex justify-center py-2">
        <div className="w-6 h-6 rounded-full border-2 border-black" />
      </div>
    </div>
  );
}
