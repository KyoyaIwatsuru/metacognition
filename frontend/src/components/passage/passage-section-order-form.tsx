'use client';

import type { OrderFormContent } from '@/lib/types';

type OrderFormBodyProps = {
  orderForm: OrderFormContent;
};

/**
 * Order Form format matching TOEIC style.
 * Includes title, labeled fields with underlined values, and optional checkboxes in a row.
 */
export function OrderFormBody({ orderForm }: OrderFormBodyProps) {
  return (
    <div className="border-2 border-black bg-white text-[14px] leading-[2.4] text-slate-800">
      {/* タイトル */}
      <div className="border-b border-black px-3 py-2 text-center">
        <h2 className="text-base font-bold">{orderForm.title}</h2>
      </div>

      {/* フィールド一覧 */}
      <div className="px-3 py-2 space-y-1">
        {orderForm.fields.map((field, idx) => (
          <div key={idx} className="flex">
            <span className="font-bold whitespace-nowrap">{field.label}</span>
            <span className="ml-1 border-b border-black">{field.value}</span>
          </div>
        ))}

        {/* チェックボックス項目（横並び） */}
        {orderForm.checkboxes && orderForm.checkboxes.length > 0 && (
          <div className="flex flex-wrap gap-x-8 mt-1">
            {orderForm.checkboxes.map((cb, idx) => (
              <div key={idx} className="flex items-center">
                <span className="font-bold whitespace-nowrap">{cb.label}</span>
                <span className="ml-1">
                  {cb.checked ? '☑' : '☐'} Yes {'  '} {cb.checked ? '☐' : '☑'} No
                </span>
              </div>
            ))}
          </div>
        )}

        {/* チェックボックス後のフィールド */}
        {orderForm.lastField && (
          <div className="flex">
            <span className="font-bold whitespace-nowrap">{orderForm.lastField.label}</span>
            <span className="ml-1 border-b border-black">{orderForm.lastField.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
