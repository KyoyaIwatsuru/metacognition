'use client';

import type { CustomerServiceExchangeContent } from '@/lib/types';

type CustomerServiceExchangeBodyProps = {
  customerServiceExchange: CustomerServiceExchangeContent;
};

export function CustomerServiceExchangeBody({
  customerServiceExchange,
}: CustomerServiceExchangeBodyProps) {
  return (
    <div className="border-2 border-black bg-white flex">
      {/* Left content area */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="px-2 py-3 border-b border-black" />

        {/* Messages area */}
        <div className="px-2 py-1 space-y-3 text-[14px] leading-[2.4] text-slate-800">
          {customerServiceExchange.messages.map((msg, idx) => (
            <p key={idx}>
              <span className="font-bold" data-passage-metadata="sender">
                {msg.sender}
              </span>{' '}
              <span className="font-bold" data-passage-metadata="time">
                ({msg.time}):
              </span>{' '}
              <span data-passage-paragraph>{msg.text}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Right scrollbar area */}
      <div className="w-4 border-l border-black flex flex-col">
        {/* Up arrow */}
        <div className="flex items-center justify-center py-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-[6px] border-transparent border-b-black" />
        </div>
        {/* Spacer */}
        <div className="flex-1" />
        {/* Down arrow */}
        <div className="flex items-center justify-center py-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-transparent border-t-black" />
        </div>
      </div>
    </div>
  );
}
