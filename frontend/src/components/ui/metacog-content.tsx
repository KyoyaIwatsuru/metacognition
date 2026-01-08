'use client';

import ReactMarkdown from 'react-markdown';

type MetacogContentProps = {
  content: string;
};

const HEADING_KEYWORDS = ['このタイプを解くには', '解答への手順', '選択肢のチェック（最後に）'];

export function MetacogContent({ content }: MetacogContentProps) {
  // 見出しキーワードで分割
  const sections = content
    .split(new RegExp(`(${HEADING_KEYWORDS.join('|')})`, 'g'))
    .filter((s) => s.trim());

  // [見出し, 内容, 見出し, 内容, ...] の形式にパース
  const parsed: { heading: string; content: string }[] = [];
  for (let i = 0; i < sections.length; i++) {
    if (HEADING_KEYWORDS.includes(sections[i])) {
      parsed.push({
        heading: sections[i],
        content: sections[i + 1]?.trim() || '',
      });
      i++; // skip content
    }
  }

  return (
    <div>
      {parsed.map((section, idx) => (
        <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
          <h3 className="text-base font-bold text-slate-800 mb-1">{section.heading}</h3>
          <ReactMarkdown
            components={{
              // 全段落text-sm
              p: ({ children }) => <p className="mb-1 leading-relaxed text-sm">{children}</p>,
              // 太字 → 赤色で強調
              strong: ({ children }) => (
                <strong className="font-bold text-red-600">{children}</strong>
              ),
              // リスト
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-1 text-sm">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-1 text-sm">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              // 見出し
              h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
            }}
          >
            {section.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
