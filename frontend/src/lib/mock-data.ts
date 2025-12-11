import type { Passage } from '@/lib/types';

const enParagraph1 = `Questions 181-185 refer to the following advertisement and letter.

KELLER ATTIRE

(1) Renting a suit from Keller Attire has never been easier! We now have an expanded range of men’s formal wear in sizes XS to XXL, all available to rent online.

(2) Whether you are attending a wedding, a black-tie event, or some other special occasion, we have the right suit for you. Visit our Web site at www.kellerattire.com to see our full range of styles, colors, and fabrics. One of our style experts is ready to chat with you about your choices and walk you through our super accurate online Measuring Wizard. We will help you find a great suit that fits you perfectly!

(3) Our standard delivery service will get your order to you in three to five days. For faster service, we offer overnight delivery for an additional charge of $50.`;

const enParagraph2 = `Antonio Varela
808 Avenue K, Apt. 5B
Dallas, TX 75246

October 14

Joanne Ford, President
Keller Attire, Inc.
2200 East Fourth Street
Chicago, IL 60611

Dear Ms. Ford,

(1) I recently ordered a suit from Keller Attire to wear to an important client dinner in New York. I chose your overnight delivery service and provided a New York address for delivery. However, the suit was delivered to my home address in Dallas instead—I was already on my way to New York at the time.

(2) Your customer service team handled the problem with spotless professionalism. As there was not enough time to send a replacement, they arranged for a local rental company to deliver a similar suit to my hotel at no additional cost to me.

(3) I am extremely grateful for your team’s superior customer service. I will certainly use Keller Attire again in the future.

Yours sincerely,

Antonio Varela
Antonio Varela`;

const jaParagraph1 = `問題181-185は次の広告と手紙に関するものです。

Keller 衣装社

Keller衣装社からスーツを借りるのが、これまでにないほど簡単になりました。現在、男性用フォーマルウエアがXSからXXLまでの幅広いサイズ展開となり、全てオンラインでお借りいただけます。

結婚式、準正装のイベント、あるいはその他の特別な行事のいずれにご出席であれ、当社はあなたにぴったりのスーツをご用意しております。当社ウェブサイトのwww.Kelleratire.comにアクセスして、幅広いスタイル、色、そして生地をご覧ください。当社のスタイリング専門家の一人がいつでもあなたが選んだ品についてチャットでお話しし、当社の極めて精密なオンラインの採寸ウィザードの使い方を一つ一つ丁寧にご説明します。あなたがご自身にぴったり合う素晴らしいスーツを見つけられるよう、私たちがお手伝いをいたします。

当社の標準配送サービスは、ご注文品を3～5日でお手元にお届けします。より早いサービスとして、追加料金50ドルで翌日配送をご提供しております。`;

const jaParagraph2 = `Antonio Varela
K 大通り 808 番地、アパート 5B 号室
ダラス, TX 75246

10月14日

Joanne Ford 社長
Keller 衣装社
東4番通り 2200 番地
シカゴ, IL 60611

Ford 様

私は先日、ニューヨークでの顧客との大事な夕食会に着るためのスーツをKeller衣装社で注文しました。私は貴社の翌日配送サービスを選択し、ニューヨークのある住所を配送先として伝えました。しかしながら、そこではなく、ダラスの私の自宅住所にスーツが届けられたのですー私はそのときにはすでにニューヨークへ向かう途中でした。

貴社の顧客サービスチームは、非の打ちどころのないプロ意識を持ってその問題に対処してくれました。代替品を送るのに十分な時間がなかったため、彼らは私に追加の費用を求めることなく、現地のレンタル会社が類似のスーツを私のホテルに届けるよう手配してくれたのです。

貴社のチームの優れた顧客サービスに非常に感謝しています。私は将来、必ずまたKeller衣装社を利用するつもりです。

敬具

Antonio Varela（署名）
Antonio Varela`;

const question1 = {
  id: 'q1',
  promptEn: 'Why did Mr. Varela write to Ms. Ford?',
  promptJa: 'Varela さんはなぜ Ford さんに手紙を書いたのですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To report a mistake in an advertisement',
      textJa: '広告の誤りを報告するため',
    },
    {
      id: 'b',
      textEn: 'To express his concern about a policy',
      textJa: '方針についての懸念を表すため',
    },
    {
      id: 'c',
      textEn: 'To invite her to meet his clients',
      textJa: '自身の得意先と会うよう招待するため',
    },
    {
      id: 'd',
      textEn: 'To praise her company’s customer service',
      textJa: '彼女の会社の顧客サービスを称賛するため',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `Keler衣装社社長のFordさんに宛てた手紙である2つ目の本文の①で、Varelaさんは注文したスーツが指定先とは違う宛先に配送されたと伝え、同②1行目で「貴社の顧客サービスチームは、非の打ちどころのないプロ意識を持ってその問題に対処してくれた」と同社の顧客対応を壊めている。さらに同③の1行目で、I am extemely grateful for your team's superior customer service.「貴社のチームの優れた品でサービスに非常に感謝している」とその対応への感謝を述べているので、VarelaさんはFordさんの会社の顧客サービスを称賛するために手紙を書いたと考えられる。praise「～を称賛する」。
（B）express「～を表す」、concern「懸念」、policy「方針」。
（C） invite～to do「～に…するよう招く」。`,
  metacogFeedbackJa: `この問題は「手紙の目的（意図）を問うタイプの問題」です。手紙全体を通して、書き手が何をしたくてこの文章を書いているのかをつかむ必要があります。この手紙では、配送ミスというマイナスの出来事に触れつつも、最終的には顧客サービスへの感謝と称賛が強調されているため、「会社の顧客サービスをほめること」が目的だと判断できます。

このタイプの問題を解くときの読み方の手順は、次のように整理しておくと便利です。
① まず手紙やメールの「冒頭」と「末尾」を優先的に読む（最初の1〜2文と、最後の1〜2文）。ここに「なぜ書いているか」「何を伝えたいか」が明示されていることが多いです。
② 本文の中ほどに、事実の説明（何が起きたか）と、それに対する感情・評価（うれしい／困っている／怒っている／感謝しているなど）が混ざって出てくるので、「出来事の説明」と「書き手の気持ち」を頭の中で分けて整理します。目的はたいてい「気持ち」のほうに表れます。
③ 選択肢を読むときは、「一部の内容は合っているが、全体の目的としてはズレている」ものに注意します。例えば、本文中に「問題」「ミス」「トラブル」が出てくると、「苦情」「懸念」などの選択肢に引っ張られがちですが、最後が感謝や称賛で終わっていれば、目的は「苦情」ではなく「感謝・報告」であることが多いです。
④ 広告や別の文書がセットで出ている場合は、「手紙の中で、その広告やサービスについてどう評価しているか」に注目します。広告の内容そのものを批判しているのか、広告どおり／広告以上の対応だったとほめているのか、という視点で読むと、目的が見えやすくなります。
⑤ 「報告」「依頼」「苦情」「提案」「感謝・称賛」など、ビジネス文書でよくある目的パターンを頭に置き、どれに一番近いトーンかを判断します。途中に出てくる細かい事実（日時・場所・金額など）は、この設問では多くが「背景情報」であり、目的そのものではないので、読みすぎないようにします。

次に同じタイプの問題に出会ったら、「まず冒頭と結びを読んで、書き手の感情とトーンをつかんでから、選択肢の『目的ラベル』（苦情・依頼・感謝など）のどれが一番合うかを考えよう」と自分に指示してみてください。`,
};

const question2 = {
  id: 'q2',
  promptEn: 'What is suggested about Mr. Varela?',
  promptJa: 'Varela さんについて何が分かりますか。',
  choices: [
    { id: 'a', textEn: 'He lives in New York.', textJa: '彼はニューヨークに住んでいる。' },
    {
      id: 'b',
      textEn: 'He is dissatisfied with a service.',
      textJa: '彼はサービスに不満を感じている。',
    },
    {
      id: 'c',
      textEn: 'He was unable to attend a dinner.',
      textJa: '彼は夕食会に出席できなかった。',
    },
    { id: 'd', textEn: 'He paid $50 for delivery.', textJa: '彼は配達に50ドルを支払った。' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `Varelaさんは、2つ目の本文の①2～3行目で、I chose your overnight delivery service andprovided a New York address for delivery.「私は貴社の翌日配送サービスを選択し、ニューヨークのある住所を配送先として伝えた」と述べている。1つ目の本文の広告の③2～3行目に、we offer overight delivery for an additional charge of $50「追加料金50ドルで翌日配送を提供している」とあるので、Varelaさんは翌日配送を選択して、そのための追加料金50ドルを支払ったと分かる。
（A）2つ目の本文の冒頭の差出人住所より、住んでいるのはダラスであり、ニューヨークではない。
（B）2つ目の本文で、顧客対応を優めているので不適切。be dissatisied with～「〜に不満を感じている」。
（C） be unable to do「〜することができない」。`,
  metacogFeedbackJa: `この問題は、「複数テキストをまたいで情報を統合し、そこから事実を推論するタイプ」の問題です。1つ目の文書で「サービスの料金や条件」が説明され、2つ目の文書で「そのサービスを実際に利用した人の行動」が書かれているので、「どのオプションを選んだか」→「いくら払ったか」を2つの本文をまたいで結びつける必要があります。正しい選択肢は、2つ目の本文の「どのサービスを選んだか」と、1つ目の本文の「そのサービスはいくらか」を対応させて導きます。

このタイプの問題を解くときの具体的な手順は、次のように整理しておくとよいです。
① まず設問を読み、「何についての情報か（人物・金額・場所・目的など）」と「どの文書のどのあたりにありそうか」をざっくり予測する。人物についてなら、その人のメールや手紙の本文に注目する、といったイメージです。
② 次に、人物が出てくる文書側で、その人が「どのサービス／プラン／オプション」を選んだか、「どの日時・どの場所」を指定したかなど、後で別文書と結びつきそうなキーワードに線を引いておきます。ここでは「○○ delivery service」「○○ plan」などの名詞句が手がかりになりやすいです。
③ そのうえで、広告・案内・表などの「説明文書」のほうに戻り、②で拾ったキーワードと一致・類似する語を探し、そのオプションに対応する「金額」「条件」「所要時間」などを確認します。ここでは、同じ単語だけでなく、言い換え（overnight ⇔ within 24 hours など）にも注意します。
④ 選択肢を検討するときは、「2つの文書の情報を両方とも満たしているか」をチェックポイントにします。片方の文書の情報だけに合っている選択肢（たとえば、住所だけを見て「住んでいる場所」だと早合点させるもの）や、本文にない数値・感情（不満・満足など）を勝手に付け足している選択肢は、根拠が2か所そろっているかどうかで切り捨てます。
⑤ ひっかけの典型として、「本文に出てきた単語をそのまま使っているが、意味のレベルがずれている選択肢」に注意します。たとえば、配送先の都市名が出てくると「そこに住んでいる」と誤解させる選択肢が出やすいので、「これは単に送り先か？住所か？居住地か？」と役割を意識して読み分けるとミスを防げます。

次に同じタイプの問題に出会ったら、「まず人物の文書で、その人がどのオプションや条件を選んだかを特定し、そのキーワードをもって説明文書側で対応する金額や条件を探そう」と自分に指示してください。また、「選択肢は、必ず複数の文書の情報がそろって根拠になるかどうかを確認し、単語の一致だけで選ばない」と意識して読むようにしましょう。`,
};

const basePassage: Passage = {
  id: 'tr_01',
  title: 'Keller Attire advertisement and letter',
  paragraphsEn: [enParagraph1, enParagraph2],
  paragraphsJa: [jaParagraph1, jaParagraph2],
  questions: [question1, question2],
};

// Pre/Post 用: 同じ設問を使い回して 3 問に水増し
const prePostQuestions = [question1, question2, { ...question1, id: 'q3' }];

// 類題は同じ本文・設問をコピーしIDだけ変えた簡易モック（2問構成）
const analogs = [1, 2, 3].map((n) => ({
  id: `tr_01_an${n}`,
  title: `Analog ${n}`,
  paragraphsEn: [enParagraph1, enParagraph2],
  paragraphsJa: [jaParagraph1, jaParagraph2],
  questions: [
    { ...question1, id: `tr_01_an${n}_q1` },
    { ...question2, id: `tr_01_an${n}_q2` },
  ],
}));

export const mockTrainingPassages: Passage[] = [
  {
    ...basePassage,
    analogs,
  },
];

const duplicatePassages = (prefix: 'pre' | 'post', count: number): Passage[] => {
  return Array.from({ length: count }, (_, idx) => {
    const num = (idx + 1).toString().padStart(2, '0');
    return {
      id: `${prefix}_${num}`,
      title: basePassage.title,
      paragraphsEn: basePassage.paragraphsEn,
      questions: prePostQuestions,
    };
  });
};

export const mockPrePassages: Passage[] = duplicatePassages('pre', 3);

export const mockPostPassages: Passage[] = duplicatePassages('post', 3);
