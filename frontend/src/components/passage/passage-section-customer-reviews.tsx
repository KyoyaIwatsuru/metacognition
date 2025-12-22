'use client';

import type { CustomerReviewsContent } from '@/lib/types';

type CustomerReviewsBodyProps = {
  customerReviews: CustomerReviewsContent;
};

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="text-black">
        {i <= rating ? '★' : '☆'}
      </span>
    );
  }
  return <span className="ml-2">{stars}</span>;
}

export function CustomerReviewsBody({ customerReviews }: CustomerReviewsBodyProps) {
  return (
    <div className="border-2 border-black bg-white flex">
      {/* Main content area */}
      <div className="flex-1">
        {/* Navigation bar - table style with borders */}
        <div className="flex">
          {customerReviews.navItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex-1 px-4 py-2 text-center border-r border-black last:border-r-0 ${
                item === customerReviews.activeNav ? 'font-bold underline' : 'border-b border-black'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="text-[14px] leading-[2.4] text-slate-800">
          {customerReviews.reviews.map((review, idx) => (
            <div key={idx}>
              {/* Review content with padding */}
              <div className="px-4 py-3">
                <p className="mb-1">
                  <span className="font-bold">{review.name}</span>
                  <StarRating rating={review.rating} />
                </p>
                <p className="whitespace-pre-line">{review.text}</p>
              </div>
              {/* Dashed separator extending full width (not after last review) */}
              {idx < customerReviews.reviews.length - 1 && (
                <div className="border-t border-dashed border-black" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right scrollbar */}
      <div className="w-5 border-l border-black flex flex-col">
        {/* Up arrow */}
        <div className="flex items-center justify-center py-2 border-b border-black">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
            <path d="M12 4l-8 8h16z" />
          </svg>
        </div>
        {/* Spacer */}
        <div className="flex-1" />
        {/* Down arrow */}
        <div className="flex items-center justify-center py-2 border-t border-black">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
            <path d="M12 20l8-8h-16z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
