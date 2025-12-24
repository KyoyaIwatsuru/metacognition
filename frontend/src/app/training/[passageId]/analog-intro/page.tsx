import { AnalogIntroClient } from './analog-intro-client';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ passageId: 'tr_01' }, { passageId: 'tr_02' }, { passageId: 'tr_03' }];
}

type PageProps = {
  params: { passageId: string };
};

export default async function AnalogIntroPage({ params }: PageProps) {
  const { passageId } = await params;
  return <AnalogIntroClient passageId={passageId} />;
}
