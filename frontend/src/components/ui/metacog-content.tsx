'use client';

import ReactMarkdown from 'react-markdown';

type MetacogContentProps = {
  content: string;
};

export function MetacogContent({ content }: MetacogContentProps) {
  const paragraphs = content.split('\n\n').filter((p) => p.trim());

  return (
    <div>
      {paragraphs.map((para, idx) => (
        <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
          <ReactMarkdown
            components={{
              // 第1・3段落は大きめ、第2段落は通常サイズ
              p: ({ children }) => (
                <p className={`mb-1 leading-relaxed ${idx === 1 ? 'text-sm' : 'text-base'}`}>
                  {children}
                </p>
              ),
              // 太字 → 赤色で強調
              strong: ({ children }) => (
                <strong className="font-bold text-red-600">{children}</strong>
              ),
              // リスト（第1・3段落は大きめ）
              ul: ({ children }) => (
                <ul className={`list-disc list-inside mb-1 ${idx === 1 ? 'text-sm' : 'text-base'}`}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  className={`list-decimal list-inside mb-1 ${idx === 1 ? 'text-sm' : 'text-base'}`}
                >
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className={idx === 1 ? 'mb-0.5' : 'mb-1'}>{children}</li>,
              // 見出し
              h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
            }}
          >
            {para}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
