'use client';

import type { CustomerServiceExchangeContent } from '@/lib/types';

type CustomerServiceExchangeBodyProps = {
  customerServiceExchange: CustomerServiceExchangeContent;
};

export function CustomerServiceExchangeBody({
  customerServiceExchange,
}: CustomerServiceExchangeBodyProps) {
  return (
    <div className="border-2 border-black bg-white">
      {/* Top bar with person icons and up arrow */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-black">
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
        {/* Up arrow */}
        <div className="flex items-center justify-center w-5 h-5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 4l-8 8h6v8h4v-8h6z" />
          </svg>
        </div>
      </div>

      {/* Messages area */}
      <div className="px-4 py-3 space-y-4 text-[14px] leading-[1.6] text-slate-800">
        {customerServiceExchange.messages.map((msg, idx) => (
          <p key={idx} className="text-sm">
            <span className="font-bold">
              {msg.sender} ({msg.time}):
            </span>{' '}
            {msg.text}
          </p>
        ))}
      </div>

      {/* Bottom bar with down arrow */}
      <div className="flex justify-end items-center px-3 py-2 border-t border-black">
        {/* Down arrow */}
        <div className="flex items-center justify-center w-5 h-5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 20l8-8h-6v-8h-4v8h-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
