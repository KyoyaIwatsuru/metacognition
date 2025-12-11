import Link from 'next/link';

const sections = [
  {
    title: 'Pre-test',
    links: [
      { href: '/pre/intro', label: 'Pre-test Intro' },
      { href: '/pre/sample', label: 'Pre-test Passage (sample)' },
      { href: '/pre/complete', label: 'Pre-test Complete' },
    ],
  },
  {
    title: 'Training',
    links: [
      { href: '/training/intro', label: 'Training Intro' },
      { href: '/training/sample', label: 'Training Passage (sample)' },
      { href: '/training/sample/explanation', label: 'Training Explanation' },
      { href: '/training/sample/reflection1', label: 'Training Reflection 1' },
      { href: '/training/sample/metacog-feedback', label: 'Training Metacog Feedback (B only)' },
      { href: '/training/sample/analog/a1', label: 'Analog Question (sample)' },
      { href: '/training/sample/analog/a1/explanation', label: 'Analog Explanation' },
      { href: '/training/sample/reflection2', label: 'Training Reflection 2' },
      { href: '/training/complete', label: 'Training Complete' },
    ],
  },
  {
    title: 'Post-test',
    links: [
      { href: '/post/intro', label: 'Post-test Intro' },
      { href: '/post/sample', label: 'Post-test Passage (sample)' },
      { href: '/post/complete', label: 'Post-test Complete' },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold">metacognition (placeholder)</h1>
        <p className="text-sm text-zinc-600">
          実装中の各画面へのナビゲーション用プレースホルダーです。
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link className="text-blue-600 underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
