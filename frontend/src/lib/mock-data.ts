import type { Passage } from '@/lib/types';

// 広告の本文（3段落）
const adBodyEn = [
  "Renting a suit from Keller Attire has never been easier! We now have an expanded range of men's formal wear in sizes XS to XXL, all available to rent online.",
  'Whether you are attending a wedding, a black-tie event, or some other special occasion, we have the right suit for you. Visit our Web site at www.kellerattire.com to see our full range of styles, colors, and fabrics. One of our style experts is ready to chat with you about your choices and walk you through our super accurate online Measuring Wizard. We will help you find a great suit that fits you perfectly!',
  'Our standard delivery service will get your order to you in three to five days. For faster service, we offer overnight delivery for an additional charge of $50.',
];

// 手紙の本文（3段落）
const letterBodyEn = [
  'I recently ordered a suit from Keller Attire to wear to an important client dinner in New York. I chose your overnight delivery service and provided a New York address for delivery. However, the suit was delivered to my home address in Dallas instead—I was already on my way to New York at the time.',
  'Your customer service team handled the problem with spotless professionalism. As there was not enough time to send a replacement, they arranged for a local rental company to deliver a similar suit to my hotel at no additional cost to me.',
  "I am extremely grateful for your team's superior customer service. I will certainly use Keller Attire again in the future.",
];

// 旧形式の段落（後方互換性のため維持）
const enParagraph1 = `Q1-4 refer to the following advertisement and letter.

${adBodyEn.join('\n\n')}`;

const enParagraph2 = `Antonio Varela
808 Avenue K, Apt. 5B
Dallas, TX 75246

October 14

Joanne Ford, President
Keller Attire, Inc.
2200 East Fourth Street
Chicago, IL 60611

Dear Ms. Ford,

${letterBodyEn.join('\n\n')}

Yours sincerely,

Antonio Varela
Antonio Varela`;

// 広告の本文（日本語・3段落）
const adBodyJa = [
  'Keller衣装社からスーツを借りるのが、これまでにないほど簡単になりました。現在、男性用フォーマルウエアがXSからXXLまでの幅広いサイズ展開となり、全てオンラインでお借りいただけます。',
  '結婚式、準正装のイベント、あるいはその他の特別な行事のいずれにご出席であれ、当社はあなたにぴったりのスーツをご用意しております。当社ウェブサイトのwww.Kelleratire.comにアクセスして、幅広いスタイル、色、そして生地をご覧ください。当社のスタイリング専門家の一人がいつでもあなたが選んだ品についてチャットでお話しし、当社の極めて精密なオンラインの採寸ウィザードの使い方を一つ一つ丁寧にご説明します。あなたがご自身にぴったり合う素晴らしいスーツを見つけられるよう、私たちがお手伝いをいたします。',
  '当社の標準配送サービスは、ご注文品を3～5日でお手元にお届けします。より早いサービスとして、追加料金50ドルで翌日配送をご提供しております。',
];

// 手紙の本文（日本語・3段落）
const letterBodyJa = [
  '私は先日、ニューヨークでの顧客との大事な夕食会に着るためのスーツをKeller衣装社で注文しました。私は貴社の翌日配送サービスを選択し、ニューヨークのある住所を配送先として伝えました。しかしながら、そこではなく、ダラスの私の自宅住所にスーツが届けられたのですー私はそのときにはすでにニューヨークへ向かう途中でした。',
  '貴社の顧客サービスチームは、非の打ちどころのないプロ意識を持ってその問題に対処してくれました。代替品を送るのに十分な時間がなかったため、彼らは私に追加の費用を求めることなく、現地のレンタル会社が類似のスーツを私のホテルに届けるよう手配してくれたのです。',
  '貴社のチームの優れた顧客サービスに非常に感謝しています。私は将来、必ずまたKeller衣装社を利用するつもりです。',
];

const jaParagraph1 = `問題Q1-4は次の広告と手紙に関するものです。

Keller 衣装社

${adBodyJa.join('\n\n')}`;

const jaParagraph2 = `Antonio Varela
K 大通り 808 番地、アパート 5B 号室
ダラス, TX 75246

10月14日

Joanne Ford 社長
Keller 衣装社
東4番通り 2200 番地
シカゴ, IL 60611

Ford 様

${letterBodyJa.join('\n\n')}

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
      textJa: '方針についての彼の懸念を表すため',
    },
    {
      id: 'c',
      textEn: 'To invite her to meet his clients',
      textJa: '彼自身の担当顧客と会うよう彼女を招くため',
    },
    {
      id: 'd',
      textEn: 'To praise her company’s customer service',
      textJa: '彼女の会社の顧客サービスを称賛するため',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `Keler衣装社社長のFordさんに宛てた手紙である2つ目の本文の1段落で、Varelaさんは注文したスーツが指定先とは違う宛先に配送されたと伝え、同2段落の1行目で「貴社の顧客サービスチームは、非の打ちどころのないプロ意識を持ってその問題に対処してくれた」と同社の顧客対応を壊めている。さらに同3段落の1行目で、I am extemely grateful for your team's superior customer service.「貴社のチームの優れた品でサービスに非常に感謝している」とその対応への感謝を述べているので、VarelaさんはFordさんの会社の顧客サービスを称賛するために手紙を書いたと考えられる。praise「～を称賛する」。
（B）express「～を表す」、concern「懸念」、policy「方針」。
（C） invite～to do「～に…するよう招く」。`,
  metacogFeedbackJa: '',
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
  explanationGeneralJa: `Varelaさんは、2つ目の本文の1段落2～3行目で、I chose your overnight delivery service and provided a New York address for delivery.「私は貴社の翌日配送サービスを選択し、ニューヨークのある住所を配送先として伝えた」と述べている。1つ目の本文の広告の3段落2～3行目に、we offer overnight delivery for an additional charge of $50「追加料金50ドルで翌日配送を提供している」とあるので、Varelaさんは翌日配送を選択して、そのための追加料金50ドルを支払ったと分かる。
（A）2つ目の本文の冒頭の差出人住所より、住んでいるのはダラスであり、ニューヨークではない。
（B）2つ目の本文で、顧客対応を優めているので不適切。be dissatisied with～「〜に不満を感じている」。
（C） be unable to do「〜することができない」。`,
  metacogFeedbackJa: '',
};

const basePassage: Passage = {
  id: 'tr_01',
  title: 'Keller Attire advertisement and letter',
  direction: 'Questions 1-2 refer to the following advertisement and letter.',
  directionJa: '問題1-2は次の広告と手紙に関するものです。',
  paragraphsEn: [enParagraph1, enParagraph2],
  paragraphsJa: [jaParagraph1, jaParagraph2],
  sections: [
    {
      layoutType: 'ad',
      locale: 'en',
      ad: {
        headline: 'KELLER ATTIRE',
        body: adBodyEn,
      },
    },
    {
      layoutType: 'letter',
      locale: 'en',
      letter: {
        sender: {
          name: 'Antonio Varela',
          address: ['808 Avenue K, Apt. 5B', 'Dallas, TX 75246'],
        },
        date: 'October 14',
        recipient: {
          name: 'Joanne Ford',
          title: 'President',
          company: 'Keller Attire, Inc.',
          address: ['2200 East Fourth Street', 'Chicago, IL 60611'],
        },
        greeting: 'Dear Ms. Ford,',
        body: letterBodyEn,
        closing: 'Yours sincerely,',
        signature: 'Antonio Varela',
        senderName: 'Antonio Varela',
      },
    },
    {
      layoutType: 'ad',
      locale: 'ja',
      ad: {
        headline: 'Keller 衣装社',
        body: adBodyJa,
      },
    },
    {
      layoutType: 'letter',
      locale: 'ja',
      letter: {
        sender: {
          name: 'Antonio Varela',
          address: ['K 大通り 808 番地、アパート 5B 号室', 'ダラス, TX 75246'],
        },
        date: '10月14日',
        recipient: {
          name: 'Joanne Ford',
          title: '社長',
          company: 'Keller 衣装社',
          address: ['東4番通り 2200 番地', 'シカゴ, IL 60611'],
        },
        greeting: 'Ford 様',
        body: letterBodyJa,
        closing: '敬具',
        signature: 'Antonio Varela',
        senderName: 'Antonio Varela',
      },
    },
  ],
  questions: [question1, question2],
};

// Pre/Post 用: 同じ設問を使い回して 4 問に水増し
const prePostQuestions = [
  question1,
  question2,
  { ...question1, id: 'q3' },
  { ...question2, id: 'q4' },
];

// ===== A群 類題1: Marsantis Shipping (メール + スケジュール表) =====

const tr01An1EmailBodyEn = [
  'I have been in communication with the shipping company, Marsantis, over the past week about your order of trucks. Apparently, the earliest we can get the TC73 trucks to you is 8 May, which puts us three days behind our estimated delivery date. Unfortunately, the only other ship departing from Valencia in April with enough clearance for the TC73 trucks was cancelled. Only certain ships can transport these trucks because of their height of 4.5 metres. In any case, I apologise for the inconvenience. I will work with our team on waiving some of your transport fees on this order.',
];

const tr01An1EmailBodyJa = [
  '私はこの1週間、あなたのトラックのご注文に関して、海運会社のMarsantis社と連絡を取っておりました。どうやら、TC73トラックをお届けできる最短日程は5月8日で、当社が見積もった納期より3日遅れるということになります。残念ながら、4月にバレンシアを出港し、TC73トラックのための十分な隙間を持つ、別の唯一の船は寄港中止になりました。このトラックは4.5メートルという車高のため、特定の船でのみ輸送可能です。いずれにせよ、ご迷惑をお掛けすることをおわび申し上げます。このご注文の輸送費の一部を差し控えるよう、当社のチームと連携いたします。',
];

const tr01An1ScheduleColumnsEn = [
  'Voyage Number',
  'Ship Name',
  'Maximum Cargo Height',
  'Valencia (Spain)',
  'Halifax (Canada)',
  'Veracruz (Mexico)',
  'San Diego (USA)',
  'Toyohashi (Japan)',
];

const tr01An1ScheduleColumnsJa = [
  '航海番号',
  '船名',
  '積荷の最大の高さ',
  'バレンシア（スペイン）',
  'ハリファックス（カナダ）',
  'ベラクルス（メキシコ）',
  'サンディエゴ（アメリカ）',
  '豊橋（日本）',
];

const tr01An1ScheduleRowsEn = [
  ['22', 'Olympia', '5 metres', '16 March', '25 March', '30 March', '—', '17 April'],
  ['48', 'Pegasus', '4 metres', '2 April', '9 April', '—', 'cancelled', '5 May'],
  ['33', 'Karenga IV', '5 metres', '13 April', '20 April', '27 April', 'cancelled', '16 May'],
  ['57', 'Yoshimo', '5 metres', '14 April', 'cancelled', '30 April', '8 May', '19 May'],
];

const tr01An1ScheduleRowsJa = [
  ['22', 'Olympia 号', '5メートル', '3月16日', '3月25日', '3月30日', '—', '4月17日'],
  ['48', 'Pegasus 号', '4メートル', '4月2日', '4月9日', '—', '中止', '5月5日'],
  ['33', 'Karenga IV 号', '5メートル', '4月13日', '4月20日', '4月27日', '中止', '5月16日'],
  ['57', 'Yoshimo 号', '5メートル', '4月14日', '中止', '4月30日', '5月8日', '5月19日'],
];

const tr01An1Q1 = {
  id: 'tr_01_an1_q1',
  promptEn: 'Why did Mr. Aznar most likely write the e-mail?',
  promptJa: 'Aznar さんはなぜEメールを書いたと考えられますか。',
  choices: [
    {
      id: 'tr_01_an1_q1_a',
      textEn: 'To explain a delay',
      textJa: '遅延を説明するため',
    },
    {
      id: 'tr_01_an1_q1_b',
      textEn: 'To request a shipment',
      textJa: '出荷を依頼するため',
    },
    {
      id: 'tr_01_an1_q1_c',
      textEn: 'To offer a discount',
      textJa: '割引を提供するため',
    },
    {
      id: 'tr_01_an1_q1_d',
      textEn: 'To clarify a policy',
      textJa: '方針を明確にするため',
    },
  ],
  correctChoiceId: 'tr_01_an1_q1_a',
  explanationGeneralJa: `1つ目の本文のEメールの一番下の送信者氏名の肩書から、Aznarさんは営業業務を担当していると分かる。AznarさんはLeeさんに宛てて、同1段落の2～3行目で、Leeさんが注文したトラックについて、Apparently the earliest we can get the TC73 trucks to you is 8 May, which puts us three days behind our estimated delivery date.「どうやら、TC73 トラックを届けることができる最短日程は5月8日で、当社が見積もった納期より3日遅れるということになる」とトラックの納期の遅延について伝えている。以降でその理由や謝罪を述べていることからも、（A）が正解。delay「遅延」。（B） shipment「出荷、配送」。（D） clarify「〜を明確にする」。`,
  metacogFeedbackJa: '',
};

const tr01An1Q2 = {
  id: 'tr_01_an1_q2',
  promptEn: 'What is the shipping destination for the TC73 trucks?',
  promptJa: 'TC73 トラックの輸送目的地はどこですか。',
  choices: [
    {
      id: 'tr_01_an1_q2_a',
      textEn: 'Canada',
      textJa: 'カナダ',
    },
    {
      id: 'tr_01_an1_q2_b',
      textEn: 'Mexico',
      textJa: 'メキシコ',
    },
    {
      id: 'tr_01_an1_q2_c',
      textEn: 'United States',
      textJa: 'アメリカ',
    },
    {
      id: 'tr_01_an1_q2_d',
      textEn: 'Japan',
      textJa: '日本',
    },
  ],
  correctChoiceId: 'tr_01_an1_q2_c',
  explanationGeneralJa: `1つ目の本文の1段落1～2行目で、Leeさんが注文したトラックについて、Aznarさんは海運会社のMarsantis社と連絡を取っていたとあり、続く同2~3行目で、TC73トラックが輸送先である注文主のLeeさんの元に到着可能な日程は最短で5月8日と伝えている。2つ目の本文のMarsantis海運社の船便のスケジュール表を見ると、同4段落のYoshimo号という船が5月8日にアメリカのサンディエゴに寄港する予定だと分かるので、（C）が正解。destination「目的地」。`,
  metacogFeedbackJa: '',
};

const tr01An1Q3 = {
  id: 'tr_01_an1_q3',
  promptEn: 'According to the schedule, what ship will travel directly from Canada to Japan?',
  promptJa: 'スケジュール表によると、どの船がカナダから日本へ直行しますか。',
  choices: [
    {
      id: 'tr_01_an1_q3_a',
      textEn: 'The Olympia',
      textJa: 'Olympia 号',
    },
    {
      id: 'tr_01_an1_q3_b',
      textEn: 'The Pegasus',
      textJa: 'Pegasus 号',
    },
    {
      id: 'tr_01_an1_q3_c',
      textEn: 'The Karenga IV',
      textJa: 'Karenga IV 号',
    },
    {
      id: 'tr_01_an1_q3_d',
      textEn: 'The Yoshimo',
      textJa: 'Yoshimo 号',
    },
  ],
  correctChoiceId: 'tr_01_an1_q3_b',
  explanationGeneralJa: `2つ目の本文のスケジュール表で、カナダのハリファクスと日本の豊橋の間にある欄を見ると、同2段落より Pegasus号はベラクルスの欄には日付の記載がなく、サンディエゴの欄にはcancelled「中止」とある。よって同号は、ベラクルスにもサンディエゴにも寄港せず、カナダから日本に直行すると分かるので（B）が正解。directly「直接、真っすぐに」。（A）（C）（D）いずれもメキシコのベラクルスに寄港するので直行ではない。`,
  metacogFeedbackJa: '',
};

const tr01Analog1 = {
  id: 'tr_01_an1',
  title: 'Marsantis Shipping',
  direction: 'Questions 1-3 refer to the following e-mail and schedule.',
  directionJa: '問題1-3は次のEメールとスケジュール表に関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        to: 'alee@terratasker.com',
        from: 'jaznar@dynaston.com',
        date: '5 March',
        subject: 'Order number 329XSU',
        greeting: 'Dear Ms. Lee,',
        body: tr01An1EmailBodyEn,
        closing: 'Best regards,',
        senderName: 'Javier Aznar\nAssistant Sales Director, Dynaston',
      },
    },
    {
      layoutType: 'schedule' as const,
      locale: 'en' as const,
      schedule: {
        header: 'Marsantis Shipping',
        subheader: 'Valencia to Toyohashi Service',
        subheader2: 'Spring Schedule',
        columns: tr01An1ScheduleColumnsEn,
        rows: tr01An1ScheduleRowsEn,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        to: 'alee@terratasker.com',
        from: 'jaznar@dynaston.com',
        date: '3月5日',
        subject: '注文番号 329XSU',
        greeting: 'Lee 様',
        body: tr01An1EmailBodyJa,
        closing: '敬具',
        senderName: 'Javier Aznar\n営業部長補佐、Dynaston 社',
      },
    },
    {
      layoutType: 'schedule' as const,
      locale: 'ja' as const,
      schedule: {
        header: 'Marsantis 海運社',
        subheader: 'バレンシア 〜 豊橋 便',
        subheader2: '春期スケジュール表',
        columns: tr01An1ScheduleColumnsJa,
        rows: tr01An1ScheduleRowsJa,
      },
    },
  ],
  questions: [tr01An1Q1, tr01An1Q2, tr01An1Q3],
};

// ===== tr_01 類題2: Greencove Catering =====

const tr01Analog2EmailBodyEn = [
  'We have received your reservation request. We can certainly accommodate your needs. However, given the food options you request, we would like to suggest starting one hour earlier so that guests are less likely to expect a full dinner.',
  'Our food options and pricing can be found on our Web site. We recommend serving at least one cheese dish, one vegetable platter, and a limited amount of bread. We also suggest including at least one heavy appetizer, such as shrimp cocktail or crab cakes, and a selection of sauces and dips. Please call us at (805) 555-0101 so we can help you with these decisions.',
  'Once you confirm your final choices, we will send an estimate, including charges for equipment rental. Since the event location is over 25 miles from us here in Santa Barbara, we will add a flat delivery fee of $30. We require a deposit of $50 by October 18. The remaining charges are due at the time of delivery.',
  'We look forward to serving you and your guests.',
];

const tr01Analog2EmailBodyJa = [
  '当社はお客さまの予約申し込みを受け付けました。当社は間違いなくお客さまのニーズにお応えできます。しかしながら、ご希望の食べ物のご選択を考慮しますと、ゲストの方々がたっぷりの夕食を期待される可能性が低くなるよう、1時間早く開始することを当社はご提案したいと思います。',
  '食べ物の選択肢と価格設定については、当社ウェブサイトをご覧ください。少なくとも、チーズの盛り合わせを1品、野菜の大皿を1品、パンを適量出すことをお勧めします。また、シュリンプカクテルやクラブケーキのような重めの前菜を少なくとも1品と、ソースやディップを何種類かそろえることをご提案します。（805）555-0101までお電話をください、そうすれば、これらを決定するのを当社がお手伝いできますので。',
  'いったん最終的な選択をご確認いただきましたら、用具レンタルの料金を含めたお見積もりをお送りします。イベント会場がサンタバーバラの当社から25マイルを超過するので、一律30ドルの配達料が追加になります。10月18日までに50ドルの手付金が必要です。残金は配達時にお支払いください。',
  'お客さまとゲストの方々のお役に立てることを楽しみにしております。',
];

const tr01Analog2Q1 = {
  id: 'tr_01_an2_q1',
  promptEn: 'What time does Mr. Andrews suggest the event should start?',
  promptJa: 'Andrewsさんはイベントが何時に始まることを勧めていますか。',
  choices: [
    {
      id: 'tr_01_an2_q1_a',
      textEn: 'At 4:00 P.M.',
      textJa: '午後4時',
    },
    {
      id: 'tr_01_an2_q1_b',
      textEn: 'At 5:00 P.M.',
      textJa: '午後5時',
    },
    {
      id: 'tr_01_an2_q1_c',
      textEn: 'At 6:00 P.M.',
      textJa: '午後6時',
    },
    {
      id: 'tr_01_an2_q1_d',
      textEn: 'At 7:00 P.M.',
      textJa: '午後7時',
    },
  ],
  correctChoiceId: 'tr_01_an2_q1_a',
  explanationGeneralJa: `Andrewsさんとは、2つ目の本文のEメールの送信者で、Greencoveケータリング社のオーナー。Eメールは予約申し込みを受けてHesperさんに宛てたもので、同1段落2〜3行目で、イベントを「1時間早く」開始することを提案している。従って、AndrewsさんはHesperさんが1つ目本文の注文書に記入しているイベント開始時刻の1時間前倒しを勧めていると分かる。注文書より、イベントの予定開始時刻は「午後5時」とあるので、その1時間前の（A）が正解。
（B）注文書より、イベントの予定開始時刻。
（C）注文書より、イベントの予定終了時刻の1時間前。
（D）注文書より、イベントの予定終了時刻。`,
  metacogFeedbackJa: ``,
};

const tr01Analog2Q2 = {
  id: 'tr_01_an2_q2',
  promptEn: 'Why does Mr. Andrews ask Ms. Hesper to call?',
  promptJa: 'AndrewsさんはなぜHesperさんに電話するように求めていますか。',
  choices: [
    {
      id: 'tr_01_an2_q2_a',
      textEn: 'To decide on catering options',
      textJa: 'ケータリング料理の選択を決定するため',
    },
    {
      id: 'tr_01_an2_q2_b',
      textEn: 'To confirm some credit card information',
      textJa: 'クレジットカード情報を確認するため',
    },
    {
      id: 'tr_01_an2_q2_c',
      textEn: 'To approve a cost estimate',
      textJa: '費用見積もりを承認するため',
    },
    {
      id: 'tr_01_an2_q2_d',
      textEn: 'To clarify the number of servers',
      textJa: '給仕人の数を明らかにするため',
    },
  ],
  correctChoiceId: 'tr_01_an2_q2_a',
  explanationGeneralJa: `AndrewsさんはHesperさんに対し、2つ目の本文のEメールの2段落4～5行目で、「お電話をください、そうすればこれらを決定するのを当社が手伝えるので」と書いている。「これらを決定する」とは、同1～4行目にある食べ物の選択を決めることだと判断できる。よって、（A）が正解。decide on～「～を決める」。
（B）クレジットカード情報は話題に上っていない。
（C）2つ目本文の3段落1～2行目に、いったん最終的な選択を確認したら見積もりを送ると書かれているだけ。approve「～を承認する」。
（D）注文書の「スタッフが必要」の項目の「はい」にチェックがあるが、server「給仕人」の数の確認は求めていない。clarify「〜を明らかにする」。`,
  metacogFeedbackJa: ``,
};

const tr01Analog2 = {
  id: 'tr_01_an2',
  title: 'Greencove Catering Reservation',
  direction: 'Questions 1-2 refer to the following order form and e-mail.',
  directionJa: '問題1-2は次の注文書とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'orderForm' as const,
      locale: 'en' as const,
      orderForm: {
        title: 'Greencove Catering Reservation Request',
        fields: [
          { label: 'Event:', value: 'Wilkerson Retirement Reception' },
          { label: 'Event date:', value: 'October 25' },
          { label: 'Event time:', value: '5:00 P.M. to 7:00 P.M.' },
          {
            label: 'Event location:',
            value: 'Lobby, Bonavista Municipal Building, 647 Duckworth Street, Mira Monte',
          },
          { label: 'Expected guest count:', value: '80' },
          {
            label: 'Organization responsible for payment:',
            value: 'Abel Law Firm, 647 Duckworth Street, 8th floor, Mira Monte',
          },
          {
            label: 'Contact person:',
            value: 'Ophelia Hesper, ohesper@abellawfirm.com, 805-555-0121 ext. 14',
          },
        ],
        checkboxes: [
          { label: 'Setup needed:', checked: true },
          { label: 'Staff needed:', checked: true },
        ],
        lastField: {
          label: 'Food/beverages needed:',
          value: 'Assortment of appetizers, desserts, and beverages',
        },
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        to: 'ohesper@abellawfirm.com',
        from: 'tandrews@greencovecatering.com',
        date: 'October 10',
        subject: 'Your reservation request',
        greeting: 'Dear Ms. Hesper,',
        body: tr01Analog2EmailBodyEn,
        closing: 'Sincerely,',
        senderName: 'Theo Andrews\nOwner, Greencove Catering',
      },
    },
    {
      layoutType: 'orderForm' as const,
      locale: 'ja' as const,
      orderForm: {
        title: 'Greencove ケータリング社　予約申し込み',
        fields: [
          { label: 'イベント：', value: 'Wilkerson の退職祝賀会' },
          { label: 'イベント日：', value: '10月25日' },
          { label: 'イベント時間：', value: '午後5時〜午後7時' },
          {
            label: 'イベント場所：',
            value: 'ボナビスタ市庁舎ロビー、ダックワース通り647番地、ミラモンテ',
          },
          { label: '見込み客数：', value: '80名' },
          {
            label: '支払いの責任を負う団体：',
            value: 'Abel 法律事務所、ダックワース通り647番地、ミラモンテ、第8階',
          },
          {
            label: '連絡担当者：',
            value: 'Ophelia Hesper、ohesper@abellawfirm.com，805-555-0121 内線14番',
          },
        ],
        checkboxes: [
          { label: '設営が必要：', checked: true },
          { label: 'スタッフが必要：', checked: true },
        ],
        lastField: {
          label: '必要な飲食物：',
          value: '前菜の盛り合わせ、デザート、飲み物',
        },
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        to: 'ohesper@abellawfirm.com',
        from: 'tandrews@greencovecatering.com',
        date: '10月10日',
        subject: 'お客さまの予約申し込み',
        greeting: 'Hesper 様',
        body: tr01Analog2EmailBodyJa,
        closing: 'よろしくお願いいたします。',
        senderName: 'Theo Andrews\nGreencove ケータリング社　オーナー',
      },
    },
  ],
  questions: [tr01Analog2Q1, tr01Analog2Q2],
};

// ===== tr_01 類題3: Appliance Grove =====

const tr01Analog3AdBodyEn = [
  "We are clearing out our inventory to make room for next year's models!",
  'Save 25 percent on select refrigerators, dishwashers, washing machines, and dryers. Visit us in Louisville, Lexington, Owensboro, or at our latest location in Covington.',
  'Store credit is available to qualifying buyers who make a small down payment followed by monthly installments. There is no interest on purchases paid in full within six months.',
  'Free delivery and low fees for installation of your new appliance and disposal of your old one!',
];

const tr01Analog3AdBodyJa = [
  '当店は、来年度モデル用のスペースを確保するため、在庫品を一掃します！',
  'えり抜きの冷蔵庫、食器洗い機、洗濯機、乾燥機が25パーセント引きです。当社のルイビル、レキシントン、オーエンズボロの店舗、またはコヴィントンの最新店舗にお越しください。',
  '少額の頭金の支払いとその後の月割り払いが適格とされたお客さまは、店舗信用払いをご利用いただけます。6か月以内に全部をお支払いいただいた購入品は、無利子です。',
  '配達は無料です。そして低額でお客さまの新しい家電製品の設置と古い製品の撤去を承ります！',
];

const tr01Analog3EmailBodyEn = [
  "With my old washer nearing the end of its usefulness, I visited your new store yesterday hoping to buy a new washer during the discount sale. Unfortunately, you had only two models available during my visit, and neither was suitable. After hearing my predicament, one of your sales representatives, Ms. Ayana Dawson, offered to help and directed me to a catalog of next year's models. She also showed me a video describing Expertize's heavy-duty, large-capacity washer. This machine perfectly meets my needs! Regrettably, it won't arrive until mid-November. Rather than push for an immediate sale or let me leave the store disappointed, Ms. Dawson reminded me that since my current washer isn't broken, I could probably use it until the Expertize washer becomes available. Additionally, she told me about Appliance Grove's store credit program, for which I applied and was instantly approved.",
  "I couldn't be happier with the service and personal attention I received in your store.",
];

const tr01Analog3EmailBodyJa = [
  '古い洗濯機がそろそろ寿命なので、値引きされた洗濯機の一台を買おうと思い、昨日そちらの新しい店舗を訪れました。あいにく、私が訪れたときには2種のモデルしかなく、どちらも適していませんでした。私が困っているのを聞いて、販売員の一人のAyana Dawsonさんが手助けを申し出、次年度モデルのカタログを紹介してくれました。彼女はまた、Expertize社の酷使に耐える大容量の洗濯機の説明動画も見せてくれました。この洗濯機は私のニーズにぴったり合うものです！残念なことに、それは11月中旬まで届かないのですが。Dawsonさんは、即時購入を迫ったり、私をがっかりさせたままで店から帰らせたりするのではなく、今の洗濯機は壊れていないのだからExpertize社の洗濯機が届くまで今のものを使えるだろうと私に気付かせてくれました。さらに、Grove 家電店の店舗信用払い制度について教えてくれて、私はそれを申請して即時承認されました。',
  '私は貴店で受けたサービスと顧客に合わせた配慮に、これ以上ないほど満足しています。',
];

const tr01Analog3Q1 = {
  id: 'tr_01_an3_q1',
  promptEn: 'Why did Mr. Li send the e-mail?',
  promptJa: 'LiさんはなぜEメールを送りましたか。',
  choices: [
    {
      id: 'tr_01_an3_q1_a',
      textEn: 'To complain about an item he purchased',
      textJa: '購入した商品について苦情を言うため',
    },
    {
      id: 'tr_01_an3_q1_b',
      textEn: 'To praise an employee',
      textJa: 'ある従業員を称賛するため',
    },
    {
      id: 'tr_01_an3_q1_c',
      textEn: 'To inquire about a lost credit card',
      textJa: '紛失したクレジットカードについて問い合わせるため',
    },
    {
      id: 'tr_01_an3_q1_d',
      textEn: 'To give feedback about an advertising campaign',
      textJa: '広告キャンペーンについて感想を伝えるため',
    },
  ],
  correctChoiceId: 'tr_01_an3_q1_b',
  explanationGeneralJa: `2つ目の本文のEメールを確認する。Liさんとは、Eメールの送信者。件名にあるAyana Dawsonという人物は、1段落3〜5行目より、Grove 家電店の販売員で、Liさんの買い物の手助けをしたことが分かる。同3〜11行目で、Dawsonさんが、次年度モデルのカタログや説明動画、また店舗用払い制度を案内してくれたことを述べている。同7〜9行目では店頭在庫商品の購入を迫る代わりに、新製品入手まで今の洗濯機が使えると気付かせてくれたと書いている。そして2段落1行目で、「貴店で受けたサービスと顧客に合わせた配慮に、これ以上ないほど満足している」と締めくくっている。以上のことから、LiさんはGrove家電店の従業員のDawsonさんをめるためにEメールを送った考えられるので、（B）が正解。praise「～をめる、～を称賛する」。
（A）2つ目の本文の1段落6～7行目で、購入したい製品が11月中旬まで届かないことを述べているが、苦情を言っているわけではない。
（C）2つ目の本文の1段落9～11行目で言及しているcreditは、店舗信用払い制度のことで、クレジットカードを紛失したという記述はない。inquire about～「～について問い合わせる」。
（D）2つ目の本文の1段落1～3行目で、値引きされた洗濯機を買おうと新店舗を訪れたことを述べているが、広告キャンペーンに対して感想を伝えているわけではない。feedback「意見、感想」、advertising「広告（の）」。`,
  metacogFeedbackJa: '',
};

const tr01Analog3Q2 = {
  id: 'tr_01_an3_q2',
  promptEn: 'Where did Mr. Li meet Ms. Dawson?',
  promptJa: 'LiさんはどこでDawsonさんに会いましたか。',
  choices: [
    {
      id: 'tr_01_an3_q2_a',
      textEn: 'In Louisville',
      textJa: 'ルイビル',
    },
    {
      id: 'tr_01_an3_q2_b',
      textEn: 'In Lexington',
      textJa: 'レキシントン',
    },
    {
      id: 'tr_01_an3_q2_c',
      textEn: 'In Owensboro',
      textJa: 'オーエンズボロ',
    },
    {
      id: 'tr_01_an3_q2_d',
      textEn: 'In Covington',
      textJa: 'コヴィントン',
    },
  ],
  correctChoiceId: 'tr_01_an3_q2_d',
  explanationGeneralJa: `Liさんは2つ目の本文のEメールの1段落3～5行目で、Grove家電店の販売員のDawsonさんが買い物の手助けをしてくれたことを書いている。同1～2行目で「値引きされた洗濯機の一台を買おうと思い、『昨日新しい店舗を訪れた」と述べているので、Liさんは「新しい店舗」でDawsonさんに接客してもらったと分かる。店舗については、1つ目の本文の広告の2段落2行目に、our latest location in Covington「当社のコヴィントンの最新店舗」と記載がある。よって、（D）が正解。
（A）（B）（C）1つ目の本文の2段落2行目より、いずれもGrove家電店の店舗がある場所だが、新店舗だとの記述はない。`,
  metacogFeedbackJa: '',
};

const tr01Analog3Q3 = {
  id: 'tr_01_an3_q3',
  promptEn: 'What is most likely true about Mr. Li?',
  promptJa: 'Liさんについて正しいと考えられることは何ですか。',
  choices: [
    {
      id: 'tr_01_an3_q3_a',
      textEn: 'He will contact Mr. McDonald again next month.',
      textJa: '来月再びMcDonaldさんに連絡するつもりである。',
    },
    {
      id: 'tr_01_an3_q3_b',
      textEn: 'He made a down payment on the Expertize washer.',
      textJa: 'Expertize社の洗濯機の頭金を支払った。',
    },
    {
      id: 'tr_01_an3_q3_c',
      textEn: 'He will try to sell his current washer.',
      textJa: '現在の洗濯機の売却を試みるつもりである。',
    },
    {
      id: 'tr_01_an3_q3_d',
      textEn: 'He will view a video about Expertize appliances at home.',
      textJa: '家でExpertize社の家電製品に関する動画を見るつもりである。',
    },
  ],
  correctChoiceId: 'tr_01_an3_q3_b',
  explanationGeneralJa: `2つ目の本文のEメールの送信者であるLiさんは、1段落5～7行目で、Expertize社の洗濯機は自分のニーズにぴったり合う製品であるが、11月中旬まで届かない、と述べている。また同9～11行目に、Grove家電店の店舗信用払い制度をDawsonさんに教えてもらい、申請して即時承認されたとある。
この制度については、1つ目の本文の広告の3段落1～2行目に、「少額の頭金支払いとその後の月賦払いが適格とされた客が利用できる」と書いてあるので、この制度の利用を承認されたLiさんはこの制度を使ってExpertize社の洗濯機を購入し、11月中旬に自宅に製品が届くのを待っているところだと考えられる。よって、LiさんはExpertize社の洗濯機購入にあたり、頭金を支払ったと判断できるため、（B）が正解。
（A）2つ目の本文のヘッダー部分より、McDonaldさんとはEメールの受信者で、Grove 家電店の責任者などと考えられるが、Liさんが来月再びMcDonaldさんに連絡を取ることを示すような記載はない。
（C）2つ目の本文の1段落8～9行目に、今使用中の洗濯機は壊れていないとあるが、売却に関する記述はない。
（D）2つ目の本文の1段落5～6行目に、販売員のDawsonさんが店舗で同社製品の動画を見せてくれたことが述べられているのみ。`,
  metacogFeedbackJa: '',
};

const tr01Analog3 = {
  id: 'tr_01_an3',
  title: 'Appliance Grove',
  direction: 'Questions 1-3 refer to the following advertisement and e-mail.',
  directionJa: '問題1-3は次の広告とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: {
        headline: 'APPLIANCE GROVE ANNUAL DISCOUNT SALE - October 1–31',
        body: tr01Analog3AdBodyEn,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        to: 'Bradley McDonald <mcdonald@appliancegrove.com>',
        from: 'Mark Li <mark.li@futuremail.com>',
        date: 'October 29',
        subject: 'Ayana Dawson',
        greeting: 'Dear Mr. McDonald,',
        body: tr01Analog3EmailBodyEn,
        closing: 'Sincerely,',
        senderName: 'Mark Li',
      },
    },
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: {
        headline: 'GROVE家電店、年に一度の割引セール　10月1日〜31日',
        body: tr01Analog3AdBodyJa,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        to: 'Bradley McDonald <mcdonald@appliancegrove.com>',
        from: 'Mark Li <mark.li@futuremail.com>',
        date: '10月29日',
        subject: 'Ayana Dawson',
        greeting: 'McDonald 様',
        body: tr01Analog3EmailBodyJa,
        closing: '敬具',
        senderName: 'Mark Li',
      },
    },
  ],
  questions: [tr01Analog3Q1, tr01Analog3Q2, tr01Analog3Q3],
};

// tr_01用類題（全て別内容）
const analogs = [tr01Analog1, tr01Analog2, tr01Analog3];

// ===== tr_02: B群用 Resource Assessment Report =====

const reportBodyEn = [
  `Summary of main findings of the assessment team: — [1] —. We examined the availability of high-quality gravel in and around the two main quarry pits at Bhule Gravel Quarry. First, we took samples from several different locations around the North Quarry pit. After analyzing the samples, we determined that there is very little mineable gravel left in or around the North Quarry pit. — [2] —. Therefore, we recommend ending this operation within the next year. In addition, it is not cost-effective to mine the gravel at the North Quarry pit even though it is closer to the processing plant than the South Quarry pit is.`,
  `In contrast, there are extensive amounts of gravel still to be mined in the South Quarry pit. The samples were retrieved by drilling intact into the gravel deposits extending from 800 meters south of the pit to a depth of 15 meters. If gravel continues to be mined at the current rate, the estimated amount of gravel in the South Quarry pit can be mined and sustained for another three years. — [3] —. The cost of the operation will gradually increase because it will be necessary to dig deeper. Nevertheless, we believe the operation will remain profitable. — [4] —.`,
];

const reportBodyJa = [
  `評価チームの主な調査結果の概要：当チームは、ブーレ砂利採取場にある2つの主要な採掘の内部とその周辺における良質な砂利の安定供給性を調査した。まず、北採掘抗周辺の幾つか異なる地点からサンプルを採取した。サンプルの分析後、北採掘抗の内部とその周辺には採掘できる砂利がごくわずかしか残っていないと判定した。*残っている砂利は低品質である。従って、来年中にこの操業を終えることを勧める。さらに、南採掘抗からよりも処理工場に近いとしても、北採掘抗で砂利を採掘することは費用効果が低い。`,
  `対照的に、南採掘抗にはまだ採掘されていない大量の砂利がある。掘削で取り出したサンプルは、採掘できる砂利堆積物が採掘抗の南800メートル、深さ15メートルまで広がっていることを示している。砂利の採掘を現在のペースで続ければ、南採掘抗での採掘事業はあと3年間維持できると推定する。より深く掘る必要が生じるため、操業コストは徐々に上昇するだろう。それでもなお、この事業は利益を上げ続けると考える。`,
];

const tr02Question1 = {
  id: 'tr02_q1',
  promptEn: 'What does the report suggest about the South Quarry pit?',
  promptJa: '報告書は南採掘坑について何を示唆していますか。',
  choices: [
    {
      id: 'tr02_q1_a',
      textEn: 'It will be profitable for several more years.',
      textJa: 'あと数年間は採算を上げられるだろう。',
    },
    { id: 'tr02_q1_b', textEn: 'It should be mined faster.', textJa: 'より速く採掘すべきである。' },
    {
      id: 'tr02_q1_c',
      textEn: 'It should be tested further.',
      textJa: 'さらに検証するべきである。',
    },
    {
      id: 'tr02_q1_d',
      textEn: 'It could pose a risk to a processing plant nearby.',
      textJa: '近くの処理工場に危険をもたらすかもしれない。',
    },
  ],
  correctChoiceId: 'tr02_q1_a',
  explanationGeneralJa: `「評価チームの主な調査結果の概要」の2段落では北採掘抗について、3段落では南採掘抗について報告されている。3段落3〜7行目で、南採掘抗であと3年間は採掘事業を維持でき、操業コストが上昇しても、利益を上げ続けるだろうと述べている。よって、for another three yearsをfor several more years「あと数年間」と表している（A）が正解。
（B）3段落3～5行目に、現在のペースで採掘を続ければあと3年間は事業を維持できるとあり、同5～6行目に、より深く掘る必要が生じると書かれているが、より速く採掘するべきだという記述はない。
（C）（D） さらなる検証や処理工場に及ぼす危険については言及されていない。
（C） test「～を検証する」。
（D）pose a risk to～「～に対して危険をもたらす」。`,
  metacogFeedbackJa: `設問が「〜について何を示唆しているか」と聞くときは、該当箇所の"評価（見通し）"を表す語（推定・必要・増加・それでも・利益など）を拾い、事実の羅列ではなく結論の方向だけを要約して選ぶのが最重要です。特に報告書・調査結果の文章は、対比（in contrast など）で話題が切り替わるので、どの対象の段落かを先に確定すると迷いが減ります。今回は、対比の後の段落で「コストは上がるが見通しは良い」という評価が明示されています。

①設問の名詞（ここでは採掘場所）に下線を引き、本文中でその名詞が主語になっている段落だけを探して読む（対比語が出たら話題転換の合図）。
②その段落では、数字・期間・量などの"事実"と、推定・提案・見込み・採算などの"評価"を分けてメモし、設問が求めるのがどちらかを合わせる（「suggest」は評価寄りになりやすい）。
③評価を作る接続語に注目する（therefore / nevertheless / in contrast など）：前半のマイナス情報を後半でひっくり返す形なら、結論は後半に置かれやすい。
④ひっかけは「本文に出た単語に反応して、書かれていない提案や危険を選ぶ」型が多いので、should（〜すべき）やrisk（危険）など強い断定語が選択肢にあれば、本文に同じ種類の断定があるかを必ず確認し、なければ切る。

「対象の段落を特定してから、評価語と結論の一文だけを抜き出す。」
「本文にない"提案・危険・追加調査"を、単語の一致だけで選ばない。」`,
};

const tr02Question2 = {
  id: 'tr02_q2',
  promptEn: 'Who most likely are Ms. Botha and Mr. Mosala?',
  promptJa: 'Botha さんと Mosala さんは誰だと考えられますか。',
  choices: [
    { id: 'tr02_q2_a', textEn: 'Quarry construction workers', textJa: '採掘場の建設作業員' },
    {
      id: 'tr02_q2_b',
      textEn: 'Miners at Bhule Gravel Quarry',
      textJa: 'ブーレ砂利採取場の採掘労働者',
    },
    {
      id: 'tr02_q2_c',
      textEn: 'Owners of Springbok Concrete Suppliers LLC',
      textJa: 'Springbok コンクリート供給合同会社のオーナー',
    },
    {
      id: 'tr02_q2_d',
      textEn: 'Employees of Kimberley Consulting Geoengineers',
      textJa: 'Kimberley コンサルティング地質工学社の従業員',
    },
  ],
  correctChoiceId: 'tr02_q2_d',
  explanationGeneralJa: `BothaさんとMosalaさんの名前は4段落にあり、評価表を作成した人物。ヘッダー部分より、この報告書はKimberleyコンサルティング地球工学社によるものと分かる。よって、Bothaさんと Mosalaさんは同社の従業員だと考えられるので、（D）が正解。
（A）（B）評価表の作成者としてこの2人の名前が記載されており、現場で働く建設作業員やminer「採掘労働者」とは考えられない。
（C） Springbokコンクリート供給合同会社の社名は1段落の「依頼者」欄にあるので、この2人が同社のオーナーだとは考えられない。`,
  metacogFeedbackJa: `設問で「この2人は誰か」と人物の所属・立場を問われたら、本文の内容理解より先に「文書の体裁（ヘッダー／署名／作成者欄）」から役割を確定させるのが最重要です。見分け方は、設問が職業名ではなく「most likely（最もありそう）」で人物像を推定させているときで、本文中の肩書き情報が決め手になります。今回は「作成者」として名前が出ているため、現場の作業者ではなく報告書側の人間だと判断します。

① まず文書の冒頭で「発行元（会社名・機関名）」と「依頼者（クライアント）」を分けて読む（この2つを混同しない）。
② 次に末尾や欄外の「prepared by / written by / submitted by」などの署名・作成者表示を探し、名前がどの立場で登場しているかを確定する。
③ 作成者が「評価・分析・推奨」を述べている文書なら、その人物は基本的に"依頼を受けて報告する側"＝発行元側の担当者と推定する。
④ ひっかけは「本文に出てくる現場語彙（採掘・掘削など）」に引っ張られて現場職を選ぶことなので、仕事内容の単語ではなく"文書内の役割ラベル（作成者／依頼者／対象）"で切り捨てる。

「人物問題は、本文を読んで想像する前に、ヘッダーと署名欄で所属を決める。」
「依頼者と発行元を最初に分け、名前がどちら側の欄にいるかだけを見る。」`,
};

const tr02Question3 = {
  id: 'tr02_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The gravel that remains is of low quality."',
  promptJa:
    '［1］、［2］、［3］、［4］と記された箇所のうち、次の文が入るのに最もふさわしいのはどこですか。\n「残っている砂利は低品質である」',
  choices: [
    { id: 'tr02_q3_a', textEn: '[1]', textJa: '[1]' },
    { id: 'tr02_q3_b', textEn: '[2]', textJa: '[2]' },
    { id: 'tr02_q3_c', textEn: '[3]', textJa: '[3]' },
    { id: 'tr02_q3_d', textEn: '[4]', textJa: '[4]' },
  ],
  correctChoiceId: 'tr02_q3_b',
  explanationGeneralJa: `挿入文では、残っている砂利の質が述べられているので、砂利の採掘に関する記述に注目する。2段落4～5行目で、採取したサンプルを分析した結果、北採掘抗の内部とその周辺には採掘できる砂利がごくわずかしか残っていないことが分かった、と述べられている。この直後の（B）［2］に挿入文を入れると、採掘できる砂利がごくわずかしか残っていない上、その残りの砂利も低品質である、ともう一つマイナス点を挙げることになり、流れとして適切。また、結果を導く際に使われるtherefore「従って」から始まる直後の文の、来年には操業を終えることを勧めるという否定的な内容とも自然につながる。be of low quality「低品質である」。`,
  metacogFeedbackJa: `この設問タイプで最重要な読み方の結論は、挿入文が「何を受けて（指示語・同義語）」「次に何へつなぐ（因果・対比）」役割かを先に決めて、前後の論理の継ぎ目が最も自然な位置を選ぶことです。見分け方は、設問が「どこに入るか」を聞き、本文中に複数の挿入ポイントが示されているときで、内容一致ではなく接続の自然さが勝負になります。今回は「残っている」という表現が、直前で「残量が少ない」と述べた対象を受ける位置に置くのが鍵です。

①挿入文の中の"フック語"を拾う（例：the remaining / this / such / therefore など）→「何かを受けている文」か「結論を導く文」かを判定する。
②各候補位置の直前1〜2文だけを読み、挿入文の名詞が指す対象が一意に定まるか確認する（「何が残っているのか」が曖昧になる場所は落とす）。
③挿入文を入れた後の1文も必ず読む→評価・推奨・結論（recommend / should / therefore など）に向かう"マイナス材料の追加"として自然に積み上がるかを見る。
④ひっかけは「同じ単語がある場所に入れたくなる」パターンなので、単語一致よりも、情報の並びが「量→質→結論」「事実→評価→提案」になっているかで切り捨てる。

「挿入文は内容が合う場所ではなく、前の文を受けて次の文へ橋渡しできる場所に置く。」
「指示語や"残っている"のような表現が、直前の名詞をきれいに指せるかを最優先で確認する。」`,
};

// ===== tr_02 類題1: LKJ Sportswear (Webpage) =====

const tr02An1BodyEn = [
  `Matheus Mori was a standout business student at Lowell University in Toronto, Canada. After graduating, he received funding from a regional business organisation to launch a travel software business. — [1] —. Four years later, he realised that he wanted to do more than just make money. He wanted to pursue his interests and dreams. So he sold his business and entered into a period of travel and cycling.`,
  `— [2] —. While at a sports conference in Brazil, Mr. Mori attended a presentation by Gustavo Santana, who had recently developed three-dimensional body-scanning software to create custom athletic wear. After the presentation, Mr. Mori introduced himself to Mr. Santana, and the two got into an in-depth conversation. — [3] —. In subsequent months, more exchanges between the two men followed, ultimately leading them to create LKJ Sportswear. Mr. Mori's travels had helped him formulate crucial ideas for revamping cycling apparel, which he was able to realise in collaboration with Mr. Santana, using Mr. Santana's software. — [4] —. Today, after 25 years in business, LKJ Sportswear continues to be a leader in sports apparel in Brazil and throughout South America, while sales of its products, most notably the cycling and tennis lines, continue to grow in Europe.`,
];

const tr02An1BodyJa = [
  `Matheus Moriは、カナダのトロントにあるローウェル大学で傑出したビジネス専攻の学生でした。卒業後、彼は地域の事業組合から資金提供を受けて旅行関連のソフトウエア事業を立ち上げました。— [1] —。4年後に、彼は自分がただお金を稼ぐだけではないことをしたいと気付きました。彼は自分の関心事と夢を追求したかったのです。そこで彼は事業を売却して、旅とサイクリングの時期に入りました。`,
  `— [2] —。ブラジルでのスポーツ協議会に参加している間、Mori氏はGustavo Santanaによるプレゼンテーションに出席しました。その人物は少し前に特注の競技用ウエアを作るための3Dボディー・スキャニングソフトを開発していました。プレゼンテーションの後、Mori氏はSantana氏に自己紹介して、2人は踏み込んだ会話を始めました。— [3] —。その後数カ月間、2人の間ではさらにやりとりが続き、最終的に彼らはLKJスポーツウエア社を設立するに至りました。Mori氏の旅は、サイクリング用衣料を改良するための重要なアイデアを自ら考案するのに役立ちましたが、それを彼はSantana氏と共同でSantana氏開発のソフトウェアを使用することで実現できました。— [4] —。今日、創業25年を経て、LKJスポーツウエア社はブラジルと南米全域におけるスポーツ衣料のトップ企業であり続ける一方、同社の製品、とりわけサイクリングとテニスの製品ラインの売り上げはヨーロッパで成長し続けています。`,
];

const tr02An1Q1 = {
  id: 'tr02_an1_q1',
  promptEn: 'What is indicated about LKJ Sportswear?',
  promptJa: 'LKJ スポーツウェア社について何が示されていますか。',
  choices: [
    {
      id: 'tr02_an1_q1_a',
      textEn: 'It sells its products in multiple countries.',
      textJa: '同社は複数の国で製品を販売している。',
    },
    {
      id: 'tr02_an1_q1_b',
      textEn: 'It now makes only cycling apparel.',
      textJa: '同社は現在、サイクリング用衣料のみを製造している。',
    },
    {
      id: 'tr02_an1_q1_c',
      textEn: 'Its products are often sold at a discount.',
      textJa: '同社の製品は頻繁に、割引価格で販売されている。',
    },
    {
      id: 'tr02_an1_q1_d',
      textEn: 'Its founders are both from Canada.',
      textJa: '同社の創業者は両者ともカナダ出身である。',
    },
  ],
  correctChoiceId: 'tr02_an1_q1_a',
  explanationGeneralJa: `LKJスポーツウエア社の現在の状況について、2段落の8〜10行目に、LKJ Sportswear continues to be a leader in sports apparel in Brazil and throughout South America「LKJスポーツウエア社はブラジルと南米全域におけるスポーツ衣料のトップ企業であり続ける」とあり、さらにsales of its products ..... continue to grow in Europe「同社の製品の売り上げはヨーロッパで成長し続けている」と述べられているので、LKJスポーツウエア社が南米やヨーロッパの複数の国で製品を販売していることが分かる。よって、（A）が正解。multiple「複数の」。
（C） at a discount「割引価格で」。
（D）1段落目の1行目にMoriさんがカナダの大学を卒業したとあるが、創業者の出身地についての言及はない。`,
  metacogFeedbackJa: `会社についての設問は、物語部分に引っ張られず「現在の事実」を述べる文（とくに末尾の現状まとめ）を根拠に、範囲・規模・対象地域などの"広がり"を拾うのが最重要です。見分け方は、設問が「何が示されているか」のように本文の明示情報を問う形で、推測ではなく言い切りの文を探すタイプだと判断できる点です。今回は、地域が複数にまたがる表現が決め手になります。

① まず設問の名詞（会社名）に丸をつけ、「会社の特徴（事業範囲・商品・市場・実績）」のどれを聞かれやすいか当たりをつける。
② 本文では創業ストーリーは流し読みし、現在の状況をまとめる文（"today/now/continues"などの合図語が出る箇所）を優先して精読する。
③ その文から「場所（国・地域）」「商品カテゴリ」「数量・範囲（throughout, in … and …, multiple など）」の3点セットを抜き出し、選択肢の主張と一致するか照合する。
④ ひっかけは「一部の情報を全体化する」型（例：特定の競技名が出た→それしか作らない、ある国が出た→出身地だ）なので、only/both/always/discount のような強い限定語がある選択肢は、本文に同じ限定が明記されていない限り切る。
⑤ 最後に、本文が言っているのが「販売先」なのか「製造内容」なのか「人物属性」なのかをラベル分けし、話題のズレている選択肢を落とす。

「会社について＝最後の現状まとめを探し、地域・範囲・限定語に注目する。」
「固有名詞やストーリーの面白さではなく、言い切りの事実文と限定の有無で選ぶ。」`,
};

const tr02An1Q2 = {
  id: 'tr02_an1_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"They discovered that they shared an interest in high-performance sportswear."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「彼らは、自分たちが高性能スポーツウエアへの関心を共に持っていることを知りました」',
  choices: [
    { id: 'tr02_an1_q2_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr02_an1_q2_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr02_an1_q2_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr02_an1_q2_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr02_an1_q2_c',
  explanationGeneralJa: `挿入文は複数の人物を示す theyがあるので、複数の人物に関する記述の後ろに入ると考えられる。1段落目の1〜5行目で、MoriさんとSantanaさんが出会ってから会社を立ち上げるまでの経緯が述べられている。同4行目のthe two got into an in-depth conversation「2人は踏み込んだ会話を始めた」の直後の（C）［3］に挿入文を入れると、挿入文中のtheyがMoriさんとSantanaさんを指すことになる。踏み込んだ会話で共通の関心事があると分かった結果、2人のやりとりが続き、最終的にLKJスポーツウエア社を設立するに至った、と会社設立の経緯を説明する流れとなり、適切。discover that〜「〜ということを知る」、share「～を共に持つ」。`,
  metacogFeedbackJa: `挿入文問題で最重要なのは、代名詞・指示語と因果（その結果どうなったか）を手がかりに、文と文の「つながりが一番自然になる場所」を探すことです。設問文に「どこに入るか」とあり、挿入文に they のような受け手不明の語があるときは、直前直後で「誰が」「何をした」が過不足なく回収できる位置が正解になりやすいです。今回は「会話→共通点の発見→その後のやりとり」という流れが最も滑らかになる場所を選びます。

①まず挿入文を単体で読み、代名詞（they など）・時制・感情語（発見、驚き等）・話題語（関心、目的など）から「前に何が必要か／後ろに何が来やすいか」をメモする。
②本文側は空所の前後1〜2文だけを見て、「登場人物が複数そろう瞬間」「会話・出会い・紹介などの接点」「その後・結果を述べる合図語」を探して候補を絞る。
③「会話や接触」→「共通点の発見」→「継続的な交流・共同作業」→「設立・成果」のように、出来事が自然に階段状につながるかを各候補で試し読みし、因果が飛ぶ場所は外す。
④ひっかけは、同じ話題語（スポーツ、製品など）が近くにあるだけで選ばせるパターンなので、「代名詞の指す相手が直前で明示されているか」「発見のあとに"次の行動"が続くか」の2点で機械的に切り捨てる。

「挿入文は"単語の一致"ではなく"文脈の役割"で置く。代名詞の回収と、出来事の因果の階段が一段ずつつながる場所だけを選ぶ。」`,
};

// ===== tr_02 類題1: LKJ Sportswear (Webpage) =====
const tr02Analog1 = {
  id: 'tr_02_an1',
  title: 'LKJ Sportswear Company Founders',
  direction: 'Questions 1-2 refer to the following Web page.',
  directionJa: '問題1-2は次のウェブページに関するものです。',
  paragraphsEn: tr02An1BodyEn,
  paragraphsJa: tr02An1BodyJa,
  sections: [
    {
      layoutType: 'webpage' as const,
      locale: 'en' as const,
      webpage: {
        url: 'https://www.lkjsportswear.com.br/about/founders',
        title: 'Company Founders',
        body: tr02An1BodyEn,
      },
    },
    {
      layoutType: 'webpage' as const,
      locale: 'ja' as const,
      webpage: {
        url: 'https://www.lkjsportswear.com.br/about/founders',
        title: '会社の創業者たち',
        body: tr02An1BodyJa,
      },
    },
  ],
  questions: [
    { ...tr02An1Q1, id: 'tr_02_an1_q1' },
    { ...tr02An1Q2, id: 'tr_02_an1_q2' },
  ],
};

// ===== tr_02 類題2: BC Bistro (Article) =====

const tr02Analog2BodyEn = [
  `Burger City Bistro has announced that it will soon be known as BC Bistro. All advertisements, packaging, signage, and social media accounts are being updated in line with the new name. — [1] —.`,
  `"Over the years, our organization has expanded its menu to feature healthful items such as salads, sandwich wraps, and grilled chicken, in addition to burgers," company president Howard Shuman said. "We want our guests to think of us as a place where everyone can find tasty options." — [2] —.`,
  `Burger City Bistro has traditionally appealed to young adults and teenagers. But women aged 25–49 currently make up only 23 percent of the company's annual sales. — [3] —. The company recently announced that it had hired celebrity Isobel Wu as a spokesperson to help appeal to that market segment. Ms. Wu, who performs on the television program Star Dancers, will appear in television and print advertisements featuring BC Bistro as part of a healthy lifestyle.`,
  `"Ms. Wu will bring a new voice to our company that will reach potential customers who don't yet know that our menu has shifted away from what it was years ago," Mr. Shuman noted. — [4] —.`,
];

const tr02Analog2BodyJa = [
  `Burger Cityビストロは、間もなく同社がBCビストロという名で知られるようになると発表した。広告、包装、看板、そしてソーシャルメディアのアカウントの全てが新しい名称に合わせて更新されているところだ。—［1］—。`,
  `「組織は長年にわたり、ハンバーガーに加えて、サラダ、ラップサンドイッチ、グリルチキンのような健康に良いものを目玉としてメニューを拡大してきました」とHoward Shuman社長は述べた。「われわれは、お客さまがうちの店を誰もがおいしい選択肢を見つけられる場所だと思ってくださることを望んでいます」。—［2］—。`,
  `Burger Cityビストロは従来、若い成人や10代の若者に受けてきた。しかし、25歳～49歳の女性は現在、同社の年間売り上げの23パーセントしか占めていない。—［3］—。同社は最近、その市場区分にアピールする一助となるよう、著名人のIsobel Wuを広報役に採用したと発表した。Wuさんは、テレビ番組「スター・ダンサーズ」に出演中で、BCビストロを健康的なライフスタイルの一環として紹介するテレビ広告と印刷広告に登場することになる。`,
  `「当社のメニューが、何年も前のものから方向転換したことをまだ知らない潜在顧客に届く新たな発言力を、Wuさんは当社にもたらすでしょう」とShuman氏は述べた。—［4］—。`,
];

const tr02Analog2Q1 = {
  id: 'tr_02_an2_q1',
  promptEn: 'According to the article, why is the company changing its name?',
  promptJa: '記事によると、会社はなぜその名称を変更するのですか。',
  choices: [
    {
      id: 'tr_02_an2_q1_a',
      textEn: 'To make the name easier to remember',
      textJa: '名称をより覚えやすくするため',
    },
    {
      id: 'tr_02_an2_q1_b',
      textEn: "To better reflect the company's current image",
      textJa: '会社の現在のイメージをより適切に表すため',
    },
    {
      id: 'tr_02_an2_q1_c',
      textEn: 'Because it has been sold to another company',
      textJa: '同社は別会社に売却されたから',
    },
    {
      id: 'tr_02_an2_q1_d',
      textEn: 'Because it is no longer selling burgers',
      textJa: '同社は、もはやハンバーガーを販売していないから',
    },
  ],
  correctChoiceId: 'tr_02_an2_q1_b',
  explanationGeneralJa: `1段落より、Burger Cityビストロという会社が名称変更をすると分かる。2段落1～4行目に、「当組織は長年にわたり、ハンバーガーに加えて、健康に良いものを目玉としてメニューを拡大してきた」という同社社長の発言がある。さらに同5〜7行目に、We want our guests to think of us as a place where everyone can find tasty options.「われわれは、お客さまが当店を誰もがおいしい選択肢を見つけられる場所だと思ってくれることを望む」と同社長の話が続いている。よって社名の変更は、ハンバーガーだけでなく健康的なメニューを取りそろえるようになった同社の現在のイメージを、より適切に表すためと分かる。reflect「〜を表す、～を反映する」、current「現在の」、image「イメージ、印象」。
（D） no longer「もはや～ない」。`,
  metacogFeedbackJa: `理由を問う設問では、社名変更・方針転換などの「出来事」そのものより、直後に置かれやすい"会社側の狙い（こう思ってほしい／こう見られたい）"の発言を根拠に読むのが最重要です。見分け方は、設問が why / reason / purpose を聞いていて、選択肢が「～するため」「～だから」と目的・理由の形になっているときです。本文では、名称変更の告知のあとに続く経営側コメントがそのまま答えの型になります。

①まず設問を見て、聞かれているのが「事実」ではなく「目的・理由」だと確定し、本文中で目的を示す合図（want to / to + 動詞 / so that / help (to) / in order to など）を探す。
②本文は、最初に"変更の事実"→次に"変更の意図を説明するコメント"という並びになりやすいので、告知文の次の段落（引用符つきの発言）を優先して精読する。
③理由は1語ではなく「新しい方向性＋それをどう認識してほしいか」のセットで書かれがちなので、商品・サービスの変化（何を増やしたか）と、狙う印象（どんな店だと思ってほしいか）を線で結んで要約する。
④ひっかけは、本文に出てくる"周辺情報"を理由にすり替えるタイプ（覚えやすさ、売却、特定商品の中止など）なので、「本文が明示している目的表現があるか」「極端な言い切り（もう～しない等）になっていないか」で切り捨てる。

「why を聞かれたら、出来事の説明ではなく、会社が"どう見られたいか"の一文を取りに行く。」
「目的を示す表現が本文にある限り、推測や極端な言い換えの選択肢には乗らない。」`,
};

const tr02Analog2Q2 = {
  id: 'tr_02_an2_q2',
  promptEn: 'According to the article, what does the company hope to accomplish by hiring Ms. Wu?',
  promptJa: '記事によると、会社はWuさんを採用することによって何を成し遂げたいと思っていますか。',
  choices: [
    {
      id: 'tr_02_an2_q2_a',
      textEn: 'More women will visit BC Bistro locations.',
      textJa: 'より多くの女性がBCビストロの店舗を訪れる。',
    },
    {
      id: 'tr_02_an2_q2_b',
      textEn: 'More teenagers will become interested in BC Bistro.',
      textJa: 'より多くの10代の若者がBCビストロに興味を持つようになる。',
    },
    {
      id: 'tr_02_an2_q2_c',
      textEn: 'There will be a larger audience for Star Dancers.',
      textJa: '「スター・ダンサーズ」の視聴者がより多くなる。',
    },
    {
      id: 'tr_02_an2_q2_d',
      textEn: 'More dance classes will be held at all locations.',
      textJa: '無料のダンス講座が全店舗で開催される。',
    },
  ],
  correctChoiceId: 'tr_02_an2_q2_a',
  explanationGeneralJa: `3段落5〜8行目に、The company recently announced that it had hired celebrity Isobel Wu as a spokesperson to help appeal to that market segment. 「同社は最近、その市場区分にアピールする一助となるよう、著名人のIsobel Wuを広報役に採用したと発表した」とある。ここでのthat market segment「その市場区分」とは、直前の文にある、同社の年間売り上げの23パーセントしか占めていない「25歳～49歳の女性」を指している。つまり、会社はWuさんを起用することによって、現在の主要顧客層ではない年代の女性にアピールし、より多くの女性顧客を取り込む狙いがあると分かる。
よって（A）が正解。accomplish「～を成し遂げる」。location「店舗」。
（C） audience「視聴者、観客」。`,
  metacogFeedbackJa: `この設問タイプで最重要なのは、「行動（採用・発表・変更）の目的」を聞かれたら、直前直後に出る"狙い・対象・効果"の3点セットを結び付けて読むことです。見分け方は、設問にhope/aim/plan/want toやaccomplishなど「何を達成したいか」を問う語が出るときです。本文では、ある層に"アピールするため"という目的表現がそのまま答えの核になります。

①設問の動詞（accomplish/hopeなど）を見たら、本文中のto / in order to / help (to) / so that / want など「目的サイン」を探す方針に切り替える。
②行動（誰を雇った・何を始めた等）を見つけたら、その文だけで止まらず、直前の"課題データ"（割合が低い、伸ばしたい層など）と直後の"狙いの言い換え"（reach, appeal, bring a new voice など）をセットで拾う。
③代名詞・指示語（that/this/thoseなど）が出たら、必ず一文戻って「何を指すか」を特定し、対象となる顧客層を確定させる。
④選択肢は「有名人の肩書き・番組名」など目立つ名詞に引っ張られやすいので、番組の人気や別事業の拡大に話が飛ぶものは、本文に"会社側の目的"として明示がない限り切り捨てる。

「目的を聞かれたら、行動そのものではなく"誰にどう届かせたいか"を探す。」
「指示語は必ず一文戻って解決し、対象がズレた選択肢を先に落とす。」`,
};

const tr02Analog2Q3 = {
  id: 'tr_02_an2_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Advertisements featuring Ms. Wu are set to begin when the name changes."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「Wuさんを起用する広告は、社名が切り替わるとすぐ始められるように用意ができている」',
  choices: [
    { id: 'tr_02_an2_q3_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr_02_an2_q3_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr_02_an2_q3_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr_02_an2_q3_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr_02_an2_q3_d',
  explanationGeneralJa: `挿入文は、Wuさんを起用した広告について述べているもの。Wuさんについて初めて言及しているのは3段落6行目なので、挿入文はこれ以降に入ると考えられる。4段落1〜4行目で、Wuさんを起用する広告について、「当社のメニューが、何年も前のものから方向転換したことをまだ知らない潜在顧客に届く新たな発言力を、Wuさんは当社にもたらすだろう」とその期待が述べられている。この直後の（D）［4］に、Wuさんを起用した広告が始まるタイミングを知らせる挿入文を入れると、Wuさん起用の広告に関する一連の流れとなり適切。
be set to do「〜する用意ができている」。`,
  metacogFeedbackJa: `挿入文問題で最重要なのは、挿入文の「話題（誰・何）」と「機能（追加情報・理由・具体化・時系列）」を先に特定し、その直前直後で同じ話題が自然につながる場所だけを探すことです。見分け方は、設問が「どこに入るか」を聞き、本文中に空所マークが複数あるタイプだと分かったときです。今回は「広告の開始時期」という時系列の補足なので、広告の話が出た直後に置ける場所が狙い目です。

①挿入文を先に読み、主語（誰の話か）とキーワード（広告・開始・名称変更など）に下線を引き、「何を付け足す文か」を一言で言い換える（例：計画・タイミングの追記）。
②本文の空所前後を、固有名詞ではなく「話題ラベル」で見る（店名変更の告知／メニュー方針／ターゲット層の説明／起用した人物と広告の説明…のどれか）。
③挿入文が「新情報の導入」ではなく「すでに出た話題への補足」なら、同じ話題が直前に出ている空所だけを候補に残す（初出の人物・初出の施策の前には基本置かない）。
④時を表す語（when, soon, currently, recently など）がある文は、直前の出来事と「いつ実行されるか」を結びつける役割になりやすいので、直前に"施策の内容"が述べられている場所を優先する。
⑤ひっかけは「同じ単語があるから」という一致だけで選ばせるパターンなので、単語一致よりも、前文が"内容"、挿入文が"時期"、次文が"効果・狙い"のように情報が段階的に並ぶかで切り捨てる。

「挿入文は、話題を始める文か、話題を補う文かをまず決める。補う文なら、同じ話題が出た直後で、内容→時期（または理由）→効果の流れになる場所にだけ入れる。」`,
};

const tr02Analog2 = {
  id: 'tr_02_an2',
  title: 'Burger City Bistro to Become BC Bistro',
  direction: 'Questions 1-3 refer to the following article.',
  directionJa: '問題1-3は次の記事に関するものです。',
  paragraphsEn: tr02Analog2BodyEn,
  paragraphsJa: tr02Analog2BodyJa,
  sections: [
    {
      layoutType: 'article' as const,
      locale: 'en' as const,
      article: {
        headline: 'Burger City Bistro to Become BC Bistro',
        byline: 'By Lola Jimenez',
        body: tr02Analog2BodyEn,
      },
    },
    {
      layoutType: 'article' as const,
      locale: 'ja' as const,
      article: {
        headline: 'Burger CityビストロがBCビストロに',
        byline: 'Lola Jimenez 記',
        body: tr02Analog2BodyJa,
      },
    },
  ],
  questions: [tr02Analog2Q1, tr02Analog2Q2, tr02Analog2Q3],
};

// ===== tr_02 類題3: Crofton Power (Notice/Information) =====

const tr02Analog3BodyEn = [
  `Crofton Power is consistently given high ratings for its commitment to customers. Service representatives are available at all times to promptly address power concerns. Customer satisfaction is backed with several key guarantees. — [1] —. Our assurances to customers are outlined below.`,
  `Billing: Customer inquiries should be directed to the billing department at 604-555-0101 or made online through the Crofton Power customer portal. — [2] —. If your question requires further investigation, please allow up to three business days for a response. Should the response be delayed by more than three days, the customer's account will be credited $25.`,
  `Appointments: Crofton Power aims to keep all appointments with customers. Crofton service technicians are scheduled to arrive within a two-hour time frame. On any occasion that this time frame is not honored, the customer's account will be credited $40.`,
  `Planned Outages: If Crofton Power needs to turn off power temporarily for construction or maintenance work, customers who may be affected will be notified at least 48 hours in advance. — [3] —. In the rare case that a service interruption notice has not been provided and a power outage occurs, the customer's account will be credited $80.`,
  `The aim of Crofton Power is to provide service that is fair and transparent. — [4] —. Thank you for trusting Crofton Power with your energy needs.`,
];

const tr02Analog3BodyJa = [
  `Crofton電力社は、お客さまへの献身に対して一貫して高い評価を頂いております。サービス担当者は、電力に関するご用件に迅速に対処すべく常時応対可能です。お客様満足度は、幾つかの要となる保証によって裏打ちされています。—［1］—。お客さまへのお約束については、以下に概要を記しております。`,
  `請求書の作成・送付：お客さまからのお問い合わせは、請求書担当部門宛てに604-555-0101までお寄せいただくか、Crofton電力社お客さま用ポータルサイトを通じてオンラインで行ってください。—［2］—。お客さまのご質問にさらなる調査が必要な場合は、回答に最長3営業日の余裕を見てください。万一、回答が3日よりも遅れた場合は、お客さまのアカウントに当社に対して25ドルの貸しがあることが記録されます。`,
  `予約：Crofton電力社はお客さまとのお約束の時間を全て守ることを目指しています。Crofton社の点検修理技術者は2時間の時間枠内に到着するように予定しています。この時間枠が順守されなかった際にはどのような場合も、お客さまのアカウントに当社に対して40ドルの貸しがあることが記録されます。`,
  `計画停電：建設工事や保守作業のためにCrofton電力社が一時的に電力供給を停止する必要がある場合、影響を受ける可能性のあるお客さまは、遅くとも48時間前には通知されます。—［3］—。供給中断の通知が提供されないまま、停電が発生するというめったにないケースでは、お客さまのアカウントに当社に対して80ドルの貸しがあることが記録されます。`,
  `Crofton電力社が目指すのは、公正で透明性のあるサービスを提供することです。—［4］—。お客さまのエネルギー需要をCrofton電力社にお任せくださいまして、ありがとうございます。`,
];

const tr02Analog3Q1 = {
  id: 'tr_02_an3_q1',
  promptEn: 'What is suggested in the information?',
  promptJa: '案内文では何が分かりますか。',
  choices: [
    {
      id: 'tr_02_an3_q1_a',
      textEn: 'Equipment has been recently upgraded.',
      textJa: '設備の性能が最近高められた。',
    },
    {
      id: 'tr_02_an3_q1_b',
      textEn: 'Delayed bill payments may result in a late fee.',
      textJa: '料金支払いが遅れると、延滞料が発生することがある。',
    },
    {
      id: 'tr_02_an3_q1_c',
      textEn: 'Quality service is a priority.',
      textJa: '質の高いサービスが優先事項である。',
    },
    {
      id: 'tr_02_an3_q1_d',
      textEn: 'A service area has expanded.',
      textJa: 'サービス提供エリアが拡大した。',
    },
  ],
  correctChoiceId: 'tr_02_an3_q1_c',
  explanationGeneralJa: `Crofton電力社の案内の1段落1行目で、同社は顧客への献身的なサービスに対し一貫して高評価を受けていると述べられており、続く同1〜2行目にService representatives are available at all times to promptly address power concerns.「サービス担当者は、電力に関する用件に迅速に対処すべく常時応対可能だ」とある。さらに、2段落～4段落ではサービスに関する顧客への約束の概要が記載され、5段落1行目で「Crofton電力社が目指すのは、公正で透明性のあるサービスを提供することだ」と述べられている。これらのことから、同社は顧客サービスに力を入れていると判断できるので、（C）が正解。quality「質の高い」、priority「優先事項」。
（A） equipment「設備、機材」、upgrade「～の性能を高める」。
（B） result in～「〜という結果になる」、late fee「延滞料」。
（D） expand「拡大する」。`,
  metacogFeedbackJa: `この設問タイプで最重要な読み方の結論は、細部の数字や条件に入る前に「文書全体が何をアピール／説明しているか」という主題を先に確定することです。設問が「何が分かるか／示唆されるか」と広く聞いてくるときは、1文の事実探しではなく、全体を貫く方針・姿勢・目的を要約できるかが勝負になります。今回は、冒頭の評価・対応姿勢と、各項目の保証が同じ方向を指していることを押さえれば足ります。

①最初の段落だけを先に読み、「会社（組織）が強調したい価値＝顧客対応・保証・透明性など」のキーワードを拾って主題候補を1つ作る。
②次に見出し（請求・予約・計画停止など）をざっと見て、各段落が「手順説明」なのか「約束（保証）提示」なのかを分類し、主題候補と一致するか確認する。
③各段落の細部は、数字・時間・補償のような"同じ型"が繰り返されている部分だけを見て、「顧客の不利益を埋め合わせる仕組みがある」など抽象化してまとめる。
④選択肢は、本文に出てきそうな単語（設備、延滞料、拡大など）に引っ張られず、「本文全体を一言で言い換えたときに自然か」を基準に切り捨てる（部分的な話題の有無ではなく、主題との整合性で判断する）。
⑤最後に、主題を表す語（優先、重視、方針、取り組み等）を含む選択肢を優先し、具体的事実の追加（最近〜した、〜が拡大した等）が必要なものは本文に根拠がなければ除外する。

「広い聞き方の設問は、細部探しではなく全体要約で答える」と自分に言い聞かせる。数字や条件は、主題を裏づける"例"としてまとめ、主題に直結しない具体情報を足さない。`,
};

const tr02Analog3Q2 = {
  id: 'tr_02_an3_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Customers typically receive a response within two hours after an online request is made."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「お客さまは通常、オンラインでのご依頼を送信後、2時間以内に回答を受け取ります」',
  choices: [
    { id: 'tr_02_an3_q2_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr_02_an3_q2_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr_02_an3_q2_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr_02_an3_q2_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr_02_an3_q2_b',
  explanationGeneralJa: `挿入文は顧客に対し、オンラインで問い合わせた場合について案内するもの。2段落1～2行目で、「お客さまからの問い合わせは、請求書担当部門宛てに604-555-0101までお寄せいただくか、Crofton電力社お客さま用ポータルサイトを通じてオンラインで行ってください」と、顧客が問い合わせる際の方法を案内している。この後ろの（B）［2］に挿入文を入れると、顧客がオンラインで問い合わせを行った後に回答を受け取るまでの所要時間を示すことになり、流れとして適切。
typically「通例、一般的には」。`,
  metacogFeedbackJa: `挿入文問題は、文の「話題（何について）」と「つながり方（前後の因果・具体化）」が最も自然になる位置を、キーワード一致ではなく情報の役割で決めるのが最重要です。見分け方は、設問が「どこに入るのが最適か」と聞き、本文中に複数の挿入候補位置が示されているときです。今回は「オンラインで依頼した後の返答時間」という"手段→所要時間"の説明が、問い合わせ方法の直後に来るのが自然だと判断します。

①挿入文の核（主語・条件・数値）を先に抜き出し、「どの場面の補足か」を一言で言える形にする（例：オンラインで依頼した場合の返答時間）。
②候補位置の直前文を見て、「手段の提示」「定義」「例示」「例外」「結果」など、どの役割の文が来ているかを判定する。
③挿入文が「直前の内容を具体化する文」なのか「直後の内容の前提になる文」なのかを確認し、両方向でつながる位置を優先する。
④ひっかけは、同じ数字や同じ語（例：時間・通知・返答）に引っ張られて別トピックの段落に入れてしまうことなので、段落見出し相当の話題（請求・予約・停電など）が一致しているかで切り捨てる。

「この文は何の"補足情報"で、前の文を受けて具体化しているのか、それとも次の文の前提なのか」を必ず確認する。数字や単語が合うだけの場所ではなく、話題と論理の両方が自然につながる場所に入れる。`,
};

const tr02Analog3 = {
  id: 'tr_02_an3',
  title: 'Crofton Power Customer Information',
  direction: 'Questions 1-2 refer to the following information.',
  directionJa: '問題1-2は次の案内に関するものです。',
  paragraphsEn: tr02Analog3BodyEn,
  paragraphsJa: tr02Analog3BodyJa,
  sections: [
    {
      layoutType: 'notice' as const,
      locale: 'en' as const,
      notice: {
        title: 'Crofton Power',
        body: tr02Analog3BodyEn,
      },
    },
    {
      layoutType: 'notice' as const,
      locale: 'ja' as const,
      notice: {
        title: 'Crofton電力社',
        body: tr02Analog3BodyJa,
      },
    },
  ],
  questions: [tr02Analog3Q1, tr02Analog3Q2],
};

// tr_02用類題（3つとも別内容）
const tr02Analogs = [tr02Analog1, tr02Analog2, tr02Analog3];

const tr02Passage: Passage = {
  id: 'tr_02',
  title: 'Kimberley Consulting Geoengineers Resource Assessment',
  direction: 'Questions 1-3 refer to the following report.',
  directionJa: '問題1-3は次の報告書に関するものです。',
  paragraphsEn: reportBodyEn,
  paragraphsJa: reportBodyJa,
  sections: [
    {
      layoutType: 'report',
      locale: 'en',
      report: {
        header: 'KIMBERLEY CONSULTING GEOENGINEERS',
        title: 'Resource Assessment',
        meta: [
          { label: 'Client', value: 'Springbok Concrete Suppliers LLC' },
          { label: 'Property examined', value: 'Bhule Gravel Quarry' },
          {
            label: 'Purpose',
            value:
              'To determine how long Springbok Concrete Suppliers LLC can continue mining the Bhule Gravel Quarry pits for gravel',
          },
          { label: 'Dates', value: '15–19 July' },
        ],
        bodyTitle: 'Summary of main findings of the assessment team:',
        body: reportBodyEn,
        footer: 'Assessment prepared by: Gertruida Botha and Moeketsi Mosala',
      },
    },
    {
      layoutType: 'report',
      locale: 'ja',
      report: {
        header: 'Kimberley コンサルティング地質工学社',
        title: '資源評価',
        meta: [
          { label: '依頼者', value: 'Springbok コンクリート供給合同会社' },
          { label: '調査対象', value: 'ブーレ砂利採取場' },
          {
            label: '目的',
            value:
              'Springbok コンクリート供給合同会社がブーレ砂利採取場から砂利を採掘できる期間の判定',
          },
          { label: '日付', value: '7月15日〜19日' },
        ],
        bodyTitle: '評価チームの主な調査結果の概要：',
        body: reportBodyJa,
        footer: '評価書作成者：Gertruida Botha および Moeketsi Mosala',
      },
    },
  ],
  questions: [tr02Question1, tr02Question2, tr02Question3],
};

export const mockTrainingPassages: Passage[] = [
  {
    ...basePassage,
    analogs,
  },
  {
    ...tr02Passage,
    analogs: tr02Analogs,
  },
];

const duplicatePassages = (prefix: 'pre' | 'post', count: number): Passage[] => {
  return Array.from({ length: count }, (_, idx) => {
    const num = (idx + 1).toString().padStart(2, '0');
    return {
      id: `${prefix}_${num}`,
      title: basePassage.title,
      direction: basePassage.direction,
      directionJa: basePassage.directionJa,
      paragraphsEn: basePassage.paragraphsEn,
      sections: basePassage.sections,
      questions: prePostQuestions,
    };
  });
};

export const mockPrePassages: Passage[] = duplicatePassages('pre', 3);

export const mockPostPassages: Passage[] = duplicatePassages('post', 3);
