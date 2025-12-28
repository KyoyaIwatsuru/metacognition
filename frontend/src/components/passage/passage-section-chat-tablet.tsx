'use client';

import type { ChatTabletContent } from '@/lib/types';

type ChatTabletBodyProps = {
  chatTablet: ChatTabletContent;
};

export function ChatTabletBody({ chatTablet }: ChatTabletBodyProps) {
  return (
    <div className="bg-gray-300 rounded-3xl p-3 border-2 border-gray-400 max-w-lg mx-auto">
      {/* Top bar with dots - in gray area */}
      <div className="flex justify-end items-center px-2 py-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-black" />
        </div>
      </div>

      {/* Inner white area */}
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Messages area */}
        <div className="px-4 py-3 space-y-3 text-[14px] leading-[2.4] text-slate-800">
          {chatTablet.messages.map((msg, idx) => (
            <p key={idx}>
              <span className="font-bold" data-passage-metadata={`sender_${idx}`}>
                {msg.sender}
              </span>{' '}
              <span className="font-bold" data-passage-metadata={`time_${idx}`}>
                ({msg.time})
              </span>{' '}
              <span data-passage-paragraph>{msg.text}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Bottom equalizer icon - in gray area */}
      <div className="flex justify-center items-center gap-[2px] py-2">
        <div className="w-1 h-1 bg-black rounded-full" />
        <div className="w-1 h-1 bg-black rounded-full" />
        <div className="w-1 h-4 bg-black rounded-sm" />
        <div className="w-1 h-4 bg-black rounded-sm" />
        <div className="w-1 h-4 bg-black rounded-sm" />
        <div className="w-1 h-1 bg-black rounded-full" />
        <div className="w-1 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
