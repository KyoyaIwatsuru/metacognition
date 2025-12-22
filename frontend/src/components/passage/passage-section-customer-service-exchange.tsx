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
        {/* Top bar with person icons */}
        <div className="flex items-center px-2 py-1 border-b border-black">
          {/* Person icons - 3 people connected */}
          <div className="flex items-center gap-0">
            {/* Left person */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white" />
              <div className="w-2 h-2 border-t-2 border-l-2 border-r-2 border-black rounded-t-full" />
            </div>
            {/* Connection lines */}
            <div className="w-2 h-0.5 bg-black -mt-1" />
            {/* Center person (larger) */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full border-2 border-black bg-white" />
              <div className="w-3 h-2.5 border-t-2 border-l-2 border-r-2 border-black rounded-t-full" />
            </div>
            {/* Connection lines */}
            <div className="w-2 h-0.5 bg-black -mt-1" />
            {/* Right person */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2 border-black bg-white" />
              <div className="w-2 h-2 border-t-2 border-l-2 border-r-2 border-black rounded-t-full" />
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="px-2 py-1 space-y-2 text-[14px] leading-[2.4] text-slate-800">
          {customerServiceExchange.messages.map((msg, idx) => (
            <p key={idx}>
              <span className="font-bold">
                {msg.sender} ({msg.time}):
              </span>{' '}
              {msg.text}
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
