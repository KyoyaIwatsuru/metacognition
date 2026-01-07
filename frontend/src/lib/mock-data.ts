import type { Passage, Question } from '@/lib/types';

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
  '結婚式、準正装のイベント、あるいはその他の特別な行事のいずれにご出席であれ、当社はあなたにぴったりのスーツをご用意しております。当社ウェブサイトのwww.kelleratire.comにアクセスして、幅広いスタイル、色、そして生地をご覧ください。当社のスタイリング専門家の一人がいつでもあなたが選んだ品についてチャットでお話しし、当社の極めて精密なオンラインの採寸ウィザードの使い方を一つ一つ丁寧にご説明します。あなたがご自身にぴったり合う素晴らしいスーツを見つけられるよう、私たちがお手伝いをいたします。',
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
  id: 'tr_01_q1',
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
  explanationGeneralJa: `Keler衣装社社長のFordさんに宛てた手紙である2つ目の本文の①で、Varelaさんは注文したスーツが指定先とは違う宛先に配送されたと伝え、同②1行目で「貴社の顧客サービスチームは、非の打ちどころのないプロ意識を持ってその問題に対処してくれた」と同社の顧客対応を壊めている。さらに同③で、I am extemely grateful for your team's superior customer service.「貴社のチームの優れた品でサービスに非常に感謝している」とその対応への感謝を述べているので、VarelaさんはFordさんの会社の顧客サービスを称賛するために手紙を書いたと考えられる。praise「～を称賛する」。
（B）express「～を表す」、concern「懸念」、policy「方針」。
（C） invite～to do「～に…するよう招く」。`,
  metacogFeedbackJa: `**「なぜ書いた？」は“手紙の結論（最後の段落）”で目的ラベルを確定する。**
（見分け方：最後に感謝・称賛＋今後の利用/行動が出たら「称賛/お礼」系）


1. 設問の動詞を型に落とす：「Why did … write?」＝**手紙全体の目的**を1語で言い換える問題。
2. **最後の段落を先読み**し、感情語（感謝/不満）＋今後の行動（また使う/やめる/対応してほしい）を拾って目的を決める。
3. 次に本文中盤で、評価語がプラスかマイナスかを確認して補強する（プラス→称賛/お礼、マイナス→苦情/懸念/要求）。
4. もう一つの本文（広告など）は**背景チェックに限定**：手紙の目的と矛盾しないかだけ見る。
5. ひっかけ処理：冒頭のトラブル描写（誤配送など）に反応して「苦情」へ飛ばない。**“きっかけ”と“目的”は別**なので、結論段落の目的ラベルに合わない選択肢は切る。

✅ 自分の選んだ「目的」を、手紙の最後の一文を使わずに日本語で1フレーズ（例：お礼／苦情／依頼）に言い換えられるか？（できない＝結論を取れていない）`,
};

const question2 = {
  id: 'tr_01_q2',
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
  explanationGeneralJa: `Varelaさんは、2つ目の本文の①1行目で、I chose your overnight delivery service and provided a New York address for delivery.「私は貴社の翌日配送サービスを選択し、ニューヨークのある住所を配送先として伝えた」と述べている。1つ目の本文の広告の③に、we offer overnight delivery for an additional charge of $50「追加料金50ドルで翌日配送を提供している」とあるので、Varelaさんは翌日配送を選択して、そのための追加料金50ドルを支払ったと分かる。
（A）2つ目の本文の冒頭の差出人住所より、住んでいるのはダラスであり、ニューヨークではない。
（B）2つ目の本文で、顧客対応を優めているので不適切。be dissatisied with～「〜に不満を感じている」。
（C） be unable to do「〜することができない」。`,
  metacogFeedbackJa: `**「人物についての示唆」は“本文内のサービス名”をカギに、別本文の数値条件（料金・日数）を回収して合体させる。**
（見分け方：設問が *suggested*／選択肢に金額・日数などの数字がある）


1. 設問を見て「断定の一文探し」ではなく「組み合わせて言えること探し」に切り替える（*suggested* の合図）。
2. 手紙・メール側で、その人物が**選んだサービス名**を拾う（例：翌日配送を選択、など）。
3. 広告・案内側に戻り、同じサービス名を**同語で照合**して、付随する**数値条件（追加料金など）**を抜く。
4. 「人物がそのサービスを選んだ」＋「そのサービスの条件はこの数字」→ **数字を人物に帰属**させて選ぶ。
5. ひっかけ処理：**住所・地名は“居住地”とは限らない**（配送先・滞在先の可能性）。地名だけで「住んでいる」を選ぶ選択肢は一旦切り捨てる。

✅ 選んだ根拠が「手紙（サービス選択）」＋「広告（そのサービスの数値条件）」の2点セットになっているか？（片方だけなら戻って照合）`,
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
        signature: 'Antonio Varela（署名）',
        senderName: 'Antonio Varela',
      },
    },
  ],
  questions: [question1, question2],
};

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
      id: 'a',
      textEn: 'To explain a delay',
      textJa: '遅延を説明するため',
    },
    {
      id: 'b',
      textEn: 'To request a shipment',
      textJa: '出荷を依頼するため',
    },
    {
      id: 'c',
      textEn: 'To offer a discount',
      textJa: '割引を提供するため',
    },
    {
      id: 'd',
      textEn: 'To clarify a policy',
      textJa: '方針を明確にするため',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `1つ目の本文のEメールの一番下の送信者氏名の肩書から、Aznarさんは営業業務を担当していると分かる。AznarさんはLeeさんに宛てて、同①の1～2行目で、Leeさんが注文したトラックについて、Apparently the earliest we can get the TC73 trucks to you is 8 May, which puts us three days behind our estimated delivery date.「どうやら、TC73 トラックを届けることができる最短日程は5月8日で、当社が見積もった納期より3日遅れるということになる」とトラックの納期の遅延について伝えている。以降でその理由や謝罪を述べていることからも、（A）が正解。delay「遅延」。（B） shipment「出荷、配送」。（D） clarify「〜を明確にする」。`,
  metacogFeedbackJa: `**「目的」問題は、本文の最初の用件提示（問題提起）を1文で抜き出して、選択肢を“主目的”で決める。**
（見分け方：冒頭に「いつ・何が・どう変わる」が出て、後半が理由→謝罪→対応策の順なら“説明・連絡”系）


1. 設問が「なぜ書いたか」なら、まず本文の**冒頭〜前半**だけを読む（件名＋最初の具体文）。
2. 最初の具体文から「変更点」を特定する：**日付のズレ／遅れ／中止／不可**など、1語でラベル化する。
3. 次に後半を流し読みして、構造が**理由説明→謝罪→対応策**になっているか確認する（この型なら主目的は“説明・通知”）。
4. 選択肢は「主目的」だけ残す。**ひっかけ**：対応策（値引き・免除など）が書かれていても、**それが冒頭の用件でないなら切り捨てる**（“お詫びの一部”でしかない）。

✅ 自分の選択肢を「このメールは〜するためだ」と1文で言い換えたとき、本文前半の最初の変更点（遅れ・中止など）と一致しているか？`,
};

const tr01An1Q2 = {
  id: 'tr_01_an1_q2',
  promptEn: 'What is the shipping destination for the TC73 trucks?',
  promptJa: 'TC73 トラックの輸送目的地はどこですか。',
  choices: [
    {
      id: 'a',
      textEn: 'Canada',
      textJa: 'カナダ',
    },
    {
      id: 'b',
      textEn: 'Mexico',
      textJa: 'メキシコ',
    },
    {
      id: 'c',
      textEn: 'United States',
      textJa: 'アメリカ',
    },
    {
      id: 'd',
      textEn: 'Japan',
      textJa: '日本',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `1つ目の本文の①1行目で、Leeさんが注文したトラックについて、Aznarさんは海運会社のMarsantis社と連絡を取っていたとあり、続く同1行目で、TC73トラックが輸送先である注文主のLeeさんの元に到着可能な日程は最短で5月8日と伝えている。2つ目の本文のMarsantis海運社の船便のスケジュール表を見ると、同④のYoshimo号という船が5月8日にアメリカのサンディエゴに寄港する予定だと分かるので、（C）が正解。destination「目的地」。`,
  metacogFeedbackJa: `**「メールのキー情報（日時・条件）→表でフィルタ→一致セルの“列見出し”を答える」型で解く（destination＝到着先の国/場所）**


1. 設問語を定義する：*destination* は「途中の寄港地」ではなく「その荷物が到着する先（設問が求める単位＝国）」と決める。
2. メールから“検索キー”を抜く：①最短到着日（例：特定の日付）②制約条件（例：高さなど、使える便を絞る条件）。
3. 表は先にフィルタする：制約条件を満たさない行は即捨て（例：最大積載高さが足りない便は除外）。
4. 残った行だけで、メールの到着日と一致するセルを探す。見つけたら**そのセルの「列見出し」**（＝国/場所）を答えに変換する。
5. ひっかけ対策：表のタイトルや最終列を「最終目的地」と決め打ちしない。**設問が求めるdestinationは“メールのキー（日付）と結びついた列”**で確定させる。

✅ 「日付で一致した“セル”を見つけたあと、答えを“行の船名”や“都市名”で止めず、必ず“列見出し（国）”に変換できているか？」`,
};

const tr01An1Q3 = {
  id: 'tr_01_an1_q3',
  promptEn: 'According to the schedule, what ship will travel directly from Canada to Japan?',
  promptJa: 'スケジュール表によると、どの船がカナダから日本へ直行しますか。',
  choices: [
    {
      id: 'a',
      textEn: 'The Olympia',
      textJa: 'Olympia 号',
    },
    {
      id: 'b',
      textEn: 'The Pegasus',
      textJa: 'Pegasus 号',
    },
    {
      id: 'c',
      textEn: 'The Karenga IV',
      textJa: 'Karenga IV 号',
    },
    {
      id: 'd',
      textEn: 'The Yoshimo',
      textJa: 'Yoshimo 号',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `2つ目の本文のスケジュール表で、カナダのハリファクスと日本の豊橋の間にある欄を見ると、同②より Pegasus号はベラクルスの欄には日付の記載がなく、サンディエゴの欄にはcancelled「中止」とある。よって同号は、ベラクルスにもサンディエゴにも寄港せず、カナダから日本に直行すると分かるので（B）が正解。directly「直接、真っすぐに」。（A）（C）（D）いずれもメキシコのベラクルスに寄港するので直行ではない。`,
  metacogFeedbackJa: `**「directly」は“途中の欄が全部空欄か”で判定する（到着日が早い＝直行、ではない）**


1. 設問の条件を表のチェック項目に翻訳する：出発地の列に日付がある＋到着地の列に日付がある＋その間の中間列が空欄。
2. まず出発地の列だけを縦に見て「出発地に寄る行」を候補化する（ここで候補を絞る）。
3. 候補行を横にスキャンし、出発地→到着地の間にある中間列を確認する。**中間列が1つでも日付や中止などの記載があれば“直行ではない”**として切り捨てる。
4. 最後に残った行の船名を選択肢と照合して選ぶ（本文メールは基本ノイズ、表だけで決まるタイプ）。

✅ 自分が選んだ行で、出発地と到着地の間の中間列が「全部空欄」になっているのを、指で追って確認したか？`,
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
      id: 'a',
      textEn: 'At 4:00 P.M.',
      textJa: '午後4時',
    },
    {
      id: 'b',
      textEn: 'At 5:00 P.M.',
      textJa: '午後5時',
    },
    {
      id: 'c',
      textEn: 'At 6:00 P.M.',
      textJa: '午後6時',
    },
    {
      id: 'd',
      textEn: 'At 7:00 P.M.',
      textJa: '午後7時',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `Andrewsさんとは、2つ目の本文のEメールの送信者で、Greencoveケータリング社のオーナー。Eメールは予約申し込みを受けてHesperさんに宛てたもので、同①1〜2行目で、イベントを「1時間早く」開始することを提案している。従って、AndrewsさんはHesperさんが1つ目本文の注文書の②に記入しているイベント開始時刻の1時間前倒しを勧めていると分かる。同②より、イベントの予定開始時刻は「午後5時」とあるので、その1時間前の（A）が正解。
（B）1つ目の本文の②より、イベントの予定開始時刻。
（C）1つ目の本文の②より、イベントの予定終了時刻の1時間前。
（D）1つ目の本文の②より、イベントの予定終了時刻。`,
  metacogFeedbackJa: `**「提案・変更（早く/遅く）」は“変更指示の文書”と“元の時刻の文書”を往復し、設問の動詞（start/end）で計算対象を固定してから足し引きする。**


1. 設問の主語で「どの文書が主戦場か」を決める（送信者＝提案者なら、その文書で“変更指示”を探す）。
2. “時間を動かす表現”を拾う（例：◯時間早く/遅く、延期、前倒し）。この時点で「元の時刻は別の場所にある」と当たりをつける。
3. 設問の動詞で基準を固定する：**startなら開始時刻だけ**、endなら終了時刻だけを見る（範囲表記は分解して片方だけ抜く）。
4. 指示どおりに変換する（earlier＝引く／later＝足す）。
5. ひっかけ対策：**「◯時間早く」を“終了時刻”に当ててしまう**パターンは即切り捨て。設問がstartなら、終了時刻は計算に使わない。

✅ 「早く/遅く」の基準を、設問の動詞に合わせて“開始”か“終了”のどちらかに固定してから計算したか？（範囲の後ろ側を使っていないか）`,
};

const tr01Analog2Q2 = {
  id: 'tr_01_an2_q2',
  promptEn: 'Why does Mr. Andrews ask Ms. Hesper to call?',
  promptJa: 'AndrewsさんはなぜHesperさんに電話するように求めていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'To decide on catering options',
      textJa: 'ケータリング料理の選択を決定するため',
    },
    {
      id: 'b',
      textEn: 'To confirm some credit card information',
      textJa: 'クレジットカード情報を確認するため',
    },
    {
      id: 'c',
      textEn: 'To approve a cost estimate',
      textJa: '費用見積もりを承認するため',
    },
    {
      id: 'd',
      textEn: 'To clarify the number of servers',
      textJa: '給仕人の数を明らかにするため',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `AndrewsさんはHesperさんに対し、2つ目の本文のEメールの②2行目で、「お電話をください、そうすればこれらを決定するのを当社が手伝えるので」と書いている。「これらを決定する」とは、同1～2行目にある食べ物の選択を決めることだと判断できる。よって、（A）が正解。decide on～「～を決める」。
（B）クレジットカード情報は話題に上っていない。
（C）2つ目本文の③1行目に、いったん最終的な選択を確認したら見積もりを送ると書かれているだけ。approve「～を承認する」。
（D）1つ目の本文の注文書の⑧の「スタッフが必要」の項目の「はい」にチェックがあるが、server「給仕人」の数の確認は求めていない。clarify「〜を明らかにする」。`,
  metacogFeedbackJa: `**「電話してほしい理由」は、電話の指示文の直後にある目的表現（to / so that / so we can）をそのまま抜く。**
（タイプ見分け方：設問が「なぜ〜するよう求めたか」＝目的・意図問題）


1. 設問の核を固定する：「電話して」＝**連絡手段**ではなく**目的**を聞いている。
2. 本文をスキャンして、call/phone の**明示箇所**を1点特定する（周辺2文もセットで読む）。
3. call の直後の **目的表現**（so we can / to + 動詞）を抜き、目的語が this/these なら**直前の列挙**に戻って中身を確定する。
4. 選択肢は「目的表現の動詞句」と**同義一致**するものだけ残す。
5. ひっかけ処理：**別段落の手順・条件**（例：見積もりは最終決定後、支払い期限など）を「電話の目的」に**誤接続**しない。電話目的として明示がなければ切る。

✅ call/phone の文で「so we can / to + 動詞」を1つ指させて、その動詞が選択肢の動詞と同じ方向か（決める・確認する・承認する等）を yes/no で判定できた？`,
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
  '少額の頭金の支払いとその後の月賦払いが適格とされたお客さまは、店舗信用払いをご利用いただけます。6か月以内に全額をお支払いいただいたお買い物は、無利子です。',
  '配達は無料です、そして低料金でお客さまの新しい家電製品の設置と古い製品の撤去を承ります！',
];

const tr01Analog3EmailBodyEn = [
  "With my old washer nearing the end of its usefulness, I visited your new store yesterday hoping to buy one of your discounted machines. Unfortunately, only two models were available during my visit, and neither was suitable. After hearing my predicament, one of your sales representatives, Ms. Ayana Dawson, offered to help and directed me to a catalog of next year's models. She also showed me a video describing Expertize's heavy-duty, large-capacity washer. This machine perfectly meets my needs! Regrettably, it won't arrive until mid-November. Rather than push for an immediate sale or let me leave the store disappointed, Ms. Dawson reminded me that since my current washer isn't broken, I could probably use it until the Expertize washer becomes available. Additionally, she told me about Appliance Grove's store credit program, for which I applied and was instantly approved.",
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
      id: 'a',
      textEn: 'To complain about an item he purchased',
      textJa: '購入した商品について苦情を言うため',
    },
    {
      id: 'b',
      textEn: 'To praise an employee',
      textJa: 'ある従業員を称賛するため',
    },
    {
      id: 'c',
      textEn: 'To inquire about a lost credit card',
      textJa: '紛失したクレジットカードについて問い合わせるため',
    },
    {
      id: 'd',
      textEn: 'To give feedback about an advertising campaign',
      textJa: '広告キャンペーンについて感想を伝えるため',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `2つ目の本文のEメールを確認する。Liさんとは、Eメールの送信者。件名にあるAyana Dawsonという人物は、①2〜3行目より、Grove 家電店の販売員で、Liさんの買い物の手助けをしたことが分かる。同2〜5行目で、Dawsonさんが、次年度モデルのカタログや説明動画、また店舗用払い制度を案内してくれたことを述べている。同3〜5行目では店頭在庫商品の購入を迫る代わりに、新製品入手まで今の洗濯機が使えると気付かせてくれたと書いている。そして②1行目で、「貴店で受けたサービスと顧客に合わせた配慮に、これ以上ないほど満足している」と締めくくっている。以上のことから、LiさんはGrove家電店の従業員のDawsonさんをめるためにEメールを送った考えられるので、（B）が正解。praise「～をめる、～を称賛する」。
（A）2つ目の本文の①3行目で、購入したい製品が11月中旬まで届かないことを述べているが、苦情を言っているわけではない。
（C）2つ目の本文の①5行目で言及しているcreditは、店舗信用払い制度のことで、クレジットカードを紛失したという記述はない。inquire about～「～について問い合わせる」。
（D）2つ目の本文の①1～2行目で、値引きされた洗濯機を買おうと新店舗を訪れたことを述べているが、広告キャンペーンに対して感想を伝えているわけではない。feedback「意見、感想」、advertising「広告（の）」。`,
  metacogFeedbackJa: `**目的を問う設問は「最後の感情・評価の一文」で確定する（満足・感謝→称賛／不満→苦情）。**
（見分け方：本文の出来事より先に、結論っぽい評価語がどちら向きかを見る）


1. 設問が「なぜ送ったか」なら、本文を細かく追う前に「依頼・苦情・称賛・問い合わせ」など**目的ラベル**を探すと決める。
2. まず件名を見る→人名が出ていれば「その人物についての連絡（称賛/苦情/報告）」の線を立てる。
3. 本文中盤は動詞だけを拾って流れをつかむ（助けた・案内した・見せた・思い出させた・教えた等）→**プラス行動の列なら称賛寄り**。
4. 最後の一文で確定：強い満足・感謝の表現があれば「称賛」、強い不満・要求があれば「苦情」。
5. ひっかけ処理：本文に出る「信用」系の語を**カード紛失**に飛ばさない／在庫不足や入荷遅れを見て**苦情だと短絡**しない（結論文が満足なら切り捨て）。

✅ 自分の選んだ「目的」を、本文の最後の一文だけで言い切れる？（言い切れないなら目的の取り違えを疑う）`,
};

const tr01Analog3Q2 = {
  id: 'tr_01_an3_q2',
  promptEn: 'Where did Mr. Li meet Ms. Dawson?',
  promptJa: 'LiさんはどこでDawsonさんに会いましたか。',
  choices: [
    {
      id: 'a',
      textEn: 'In Louisville',
      textJa: 'ルイビル',
    },
    {
      id: 'b',
      textEn: 'In Lexington',
      textJa: 'レキシントン',
    },
    {
      id: 'c',
      textEn: 'In Owensboro',
      textJa: 'オーエンズボロ',
    },
    {
      id: 'd',
      textEn: 'In Covington',
      textJa: 'コヴィントン',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `Liさんは2つ目の本文のEメールの①2～3行目で、Grove家電店の販売員のDawsonさんが買い物の手助けをしてくれたことを書いている。同1行目で「値引きされた洗濯機の一台を買おうと思い、昨日新しい店舗を訪れた」と述べているので、Liさんは「新しい店舗」でDawsonさんに接客してもらったと分かる。店舗については、1つ目の本文の広告の②に、our latest location in Covington「当社のコヴィントンの最新店舗」と記載がある。よって、（D）が正解。
（A）（B）（C）1つ目の本文の②より、いずれもGrove家電店の店舗がある場所だが、新店舗だとの記述はない。`,
  metacogFeedbackJa: `**「都市名が本文に直書きされていない」設問は、まず“属性語”を抜いて別文書の一覧で具体名に変換する（new ⇄ latest など言い換え対応を探す）**


1. 設問の動詞を具体化する：「会った」＝接客・会話が発生した場所（店）を問う、と決める。
2. まずメール側で“都市名ではなく条件”を拾う：場所の手がかりは「新しい店」のような属性語。
3. 広告側に戻り、店舗一覧の中でその属性語に一致する表現（言い換え含む）を探す：new ⇄ latest の対応を確認。
4. 一致した行から都市名だけを抜き、選択肢に写す。
5. ひっかけ切り捨て：店舗が複数並んでいるときに「どれもありそう」で選ばない。**属性語（新しい/最新など）の条件を満たさない候補は即除外**。

✅ 自分の根拠は「新しい店」⇄「最新の店舗」の対応だけで一本化できているか（都市名を本文が直接言っていないのに、雰囲気で選んでいないか）`,
};

const tr01Analog3Q3 = {
  id: 'tr_01_an3_q3',
  promptEn: 'What is most likely true about Mr. Li?',
  promptJa: 'Liさんについて正しいと考えられることは何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'He will contact Mr. McDonald again next month.',
      textJa: '来月再びMcDonaldさんに連絡するつもりである。',
    },
    {
      id: 'b',
      textEn: 'He made a down payment on the Expertize washer.',
      textJa: 'Expertize社の洗濯機の頭金を支払った。',
    },
    {
      id: 'c',
      textEn: 'He will try to sell his current washer.',
      textJa: '現在の洗濯機の売却を試みるつもりである。',
    },
    {
      id: 'd',
      textEn: 'He will view a video about Expertize appliances at home.',
      textJa: '家でExpertize社の家電製品に関する動画を見るつもりである。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `2つ目の本文のEメールの送信者であるLiさんは、①3行目で、Expertize社の洗濯機は自分のニーズにぴったり合う製品であるが、11月中旬まで届かない、と述べている。また同5行目に、Grove家電店の店舗信用払い制度をDawsonさんに教えてもらい、申請して即時承認されたとある。
この制度については、1つ目の本文の広告の③に、「少額の頭金支払いとその後の月賦払いが適格とされた客が利用できる」と書いてあるので、この制度の利用を承認されたLiさんはこの制度を使ってExpertize社の洗濯機を購入し、11月中旬に自宅に製品が届くのを待っているところだと考えられる。よって、LiさんはExpertize社の洗濯機購入にあたり、頭金を支払ったと判断できるため、（B）が正解。
（A）2つ目の本文のヘッダー部分より、McDonaldさんとはEメールの受信者で、Grove 家電店の責任者などと考えられるが、Liさんが来月再びMcDonaldさんに連絡を取ることを示すような記載はない。
（C）2つ目の本文の①4～5行目に、今使用中の洗濯機は壊れていないとあるが、売却に関する記述はない。
（D）2つ目の本文の①3行目に、販売員のDawsonさんが店舗で同社製品の動画を見せてくれたことが述べられているのみ。`,
  metacogFeedbackJa: `**「most likely true」は“事実＋条件”の2点セットで推論を閉じる（想像で未来行動を足さない）**
（見分け方：本文に明示がないのに「正しいと考えられる」を問う）


1. 設問タイプ確認：「最もありそう」＝本文の断片を**つなげば必然になる**内容を探す（単なる予想は不可）。
2. まずメール側で“確定事実”だけを抜く：欲しい商品／申請した・承認された等の**手続き完了ワード**に線を引く。
3. 次に広告側で“制度の条件”を拾う：available to / must / required などの**利用条件**を探す。
4. **事実（承認）×条件（利用には頭金）**を結合し、「その制度を使うなら頭金が発生する」と推論して選ぶ。
   ※この問題は「信用払いに承認」＋「信用払いは頭金が必要」→「頭金を払った（払うことになっている）」の形。
5. ひっかけ処理：本文にある単語に釣られる型（例：動画）を切る。**“どこで/いつ”が本文にない未来行動**は、条件連鎖が作れないので捨てる。

✅ 推論が「本文の事実」＋「別本文の条件」の2点で完結しているか（自分の常識で補っていないか）`,
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
        headline: 'GROVE家電店、年に一度の割引セール - 10月1日〜31日',
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
  `— [1] —. We examined the availability of high-quality gravel in and around the two main quarry pits at Bhule Gravel Quarry. First, we took samples from several different locations around the North Quarry pit. After analyzing the samples, we determined that there is very little mineable gravel left in or around the North Quarry pit. — [2] —. Therefore, we recommend ending this operation within the next year. In addition, it is not cost-effective to mine the gravel at the North Quarry pit even though it is closer to the processing plant than the South Quarry pit is.`,
  `In contrast, there are extensive amounts of gravel still to be mined in the South Quarry pit. The samples we retrieved by drilling indicate that the mineable gravel deposits extend 800 metres south of the pit to a depth of 15 metres. If gravel continues to be mined at the current rate, we estimate that the mining operation at the South Quarry pit can be sustained for another three years. — [3] —. The cost of the operation will gradually increase because it will be necessary to dig deeper. Nevertheless, we believe the operation will remain profitable. — [4] —.`,
];

const reportBodyJa = [
  `当チームは、ブーレ砂利採取場にある2つの主要な採掘抗の内部とその周辺における良質な砂利の安定供給性を調査した。まず、北採掘抗周辺の幾つか異なる地点からサンプルを採取した。サンプルの分析後、北採掘抗の内部とその周辺には採掘できる砂利がごくわずかしか残っていないと判定した。*残っている砂利は低品質である。従って、来年中にこの操業を終えることを勧める。さらに、南採掘抗からよりも処理工場に近いとしても、北採掘抗で砂利を採掘することは費用効果が低い。`,
  `対照的に、南採掘抗にはまだ採掘されていない大量の砂利がある。掘削で取り出したサンプルは、採掘できる砂利堆積物が採掘抗の南800メートル、深さ15メートルまで広がっていることを示している。砂利の採掘を現在のペースで続ければ、南採掘抗での採掘事業はあと3年間維持できると推定する。より深く掘る必要が生じるため、操業コストは徐々に上昇するだろう。それでもなお、この事業は利益を上げ続けると考える。`,
];

const tr02Question1 = {
  id: 'tr02_q1',
  promptEn: 'What does the report suggest about the South Quarry pit?',
  promptJa: '報告書は南採掘坑について何を示唆していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'It will be profitable for several more years.',
      textJa: 'あと数年間は採算を上げられるだろう。',
    },
    { id: 'b', textEn: 'It should be mined faster.', textJa: 'より速く採掘すべきである。' },
    {
      id: 'c',
      textEn: 'It should be tested further.',
      textJa: 'さらに検証するべきである。',
    },
    {
      id: 'd',
      textEn: 'It could pose a risk to a processing plant nearby.',
      textJa: '近くの処理工場に危険をもたらすかもしれない。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `「評価チームの主な調査結果の概要」の②では北採掘抗について、③では南採掘抗について報告されている。③2〜3行目で、南採掘抗であと3年間は採掘事業を維持でき、操業コストが上昇しても、利益を上げ続けるだろうと述べている。よって、for another three yearsをfor several more years「あと数年間」と表している（A）が正解。
（B）③2～3行目に、現在のペースで採掘を続ければあと3年間は事業を維持できるとあり、同3行目に、より深く掘る必要が生じると書かれているが、より速く採掘するべきだという記述はない。
（C）（D） さらなる検証や処理工場に及ぼす危険については言及されていない。
（C） test「～を検証する」。
（D）pose a risk to～「～に対して危険をもたらす」。`,
  metacogFeedbackJa: `**設問の主語（対象）を固定→該当段落だけで「期間」と「採算」を拾い、数値表現を選択肢の一般表現に言い換えて一致させる。**


1. 設問の主語をそのままメモする（今回は「南側の採掘坑について」）→まず該当段落だけを優先して読む。
2. 該当段落でスキャンする軸は2つだけ：「どれくらい続くか（年数・期間）」と「儲かるか（profit/profitable/cost-effective）」。
3. 本文の“具体数値”を選択肢の“ぼかし表現”に変換して照合する（例：あと3年 → あと数年）。
4. ひっかけの切り捨て：**コスト増**の記述だけで「採算悪化」と決めつけない。直後に**逆接（それでも）＋採算肯定**が来たら、そちらを結論として採用する。
5. 最後に、選択肢が「〜すべき」「追加で検証」「リスク」など“要求・提案・懸念”型なら、本文にその語感（提案語や危険の明示）があるかだけ確認し、なければ即落とす。

✅ 南側の段落で「あと何年」と「採算は肯定か」をそれぞれ1か所ずつ、自分の目で指差し確認したか？`,
};

const tr02Question2 = {
  id: 'tr02_q2',
  promptEn: 'Who most likely are Ms. Botha and Mr. Mosala?',
  promptJa: 'Botha さんと Mosala さんは誰だと考えられますか。',
  choices: [
    { id: 'a', textEn: 'Quarry construction workers', textJa: '採掘場の建設作業員' },
    {
      id: 'b',
      textEn: 'Miners at Bhule Gravel Quarry',
      textJa: 'ブーレ砂利採取場の採掘労働者',
    },
    {
      id: 'c',
      textEn: 'Owners of Springbok Concrete Suppliers LLC',
      textJa: 'Springbok コンクリート供給合同会社のオーナー',
    },
    {
      id: 'd',
      textEn: 'Employees of Kimberley Consulting Geoengineers',
      textJa: 'Kimberley コンサルティング地質工学社の従業員',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `BothaさんとMosalaさんの名前は④にあり、評価表を作成した人物。ヘッダー部分より、この報告書はKimberleyコンサルティング地球工学社によるものと分かる。よって、Bothaさんと Mosalaさんは同社の従業員だと考えられるので、（D）が正解。
（A）（B）評価表の作成者としてこの2人の名前が記載されており、現場で働く建設作業員やminer「採掘労働者」とは考えられない。
（C） Springbokコンクリート供給合同会社の社名は①の「依頼者」欄にあるので、この2人が同社のオーナーだとは考えられない。`,
  metacogFeedbackJa: `**「人物の所属」は本文内容より、文書の型（発行元・依頼者・署名）で決め打ちする。**
  見分け方：名前の近くに「作成者」系の語があり、別に「依頼者」欄がある。


1. 設問の型を判定する：「最も可能性が高い誰か」＝本文に肩書が直書きされないので、**文書の形式情報**から推定する問題。
2. 名前が出る場所を探し、直前のラベルを見る：**「作成者」系（prepared by / compiled by など）**なら、その人物は報告書を書く側。
3. ヘッダーの**発行元（会社名）**と、**依頼者（client）**を見比べる：作成者がどちら側の人かを切り分ける。
4. ひっかけを切る：**「依頼者＝所属」と早合点**しない（依頼者は“相手先”で、作成者の所属とは限らない）。
5. もう一つの典型トラップ回避：本文が採掘の話でも、**内容に出る職種っぽさ（現場作業員・採掘者）で選ばない**。署名の役割が優先。

✅ Botha/Mosalaの名前の行に「作成者」系の語があり、同じ文書内に「発行元」と「依頼者」が別々に書かれているのを確認してから選んだか？`,
};

const tr02Question3 = {
  id: 'tr02_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The gravel that remains is of low quality."',
  promptJa:
    '［1］、［2］、［3］、［4］と記された箇所のうち、次の文が入るのに最もふさわしいのはどこですか。\n「残っている砂利は低品質である」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '[1]' },
    { id: 'b', textEn: '[2]', textJa: '[2]' },
    { id: 'c', textEn: '[3]', textJa: '[3]' },
    { id: 'd', textEn: '[4]', textJa: '[4]' },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `挿入文では、残っている砂利の質が述べられているので、砂利の採掘に関する記述に注目する。②2～3行目で、採取したサンプルを分析した結果、北採掘抗の内部とその周辺には採掘できる砂利がごくわずかしか残っていないことが分かった、と述べられている。この直後の（B）［2］に挿入文を入れると、採掘できる砂利がごくわずかしか残っていない上、その残りの砂利も低品質である、ともう一つマイナス点を挙げることになり、流れとして適切。また、結果を導く際に使われるtherefore「従って」から始まる直後の文の、来年には操業を終えることを勧めるという否定的な内容とも自然につながる。be of low quality「低品質である」。`,
  metacogFeedbackJa: `**挿入文は「指示語の参照先」と「前後の論理（根拠→結論／対比）」が両方ハマる場所に置く。**
（見分け方：挿入文に *that remains / this / these* など“何を指すか”がある＋評価語がある）


1. **挿入文の役割を決める**：ここは「残っている砂利」への*追加評価（マイナス情報）*を足す文だと先に固定する。
2. **参照先を探す**：本文中で *left / remains* に当たる内容（「残りが少ない」など）が出た直後を候補にする。
3. **論理の向きを確認する**：挿入文が「結論（だから〜）」の*前*に来て、根拠が積み上がる流れになるかを見る。
   - ひっかけ典型：結論を示す語（だから／従って）*の後*に入れて、**結論→根拠**の順にしてしまう場所は切る。
4. **対比ブロックを壊さない**：対比開始の合図（対照的に、など）以降は別トピックなので、マイナス評価文を混ぜない。
5. **最終決定**：①参照先が直前にある ②直後が否定的結論につながる ③対比に入る前、の3つが同時に満たされる位置を選ぶ。

✅ 挿入後に「残量の話 → 低品質の追加 → だから終了（結論）」の順で読めて、対比パートにマイナス文が侵入していないか？`,
};

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
        header: 'Kimberley コンサルティング地球工学社',
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

// ===== tr_02 類題1: LKJ Sportswear (Webpage) =====

const tr02An1BodyEn = [
  `Matheus Mori was a standout business student at Lowell University in Toronto, Canada. After graduating, he received funding from a regional business organisation to launch a travel software business. — [1] —. Four years later, he realised that he wanted to do more than just make money. He wanted to pursue his interests and dreams. So he sold his business and entered into a period of travel and cycling.`,
  `— [2] —. While at a sports conference in Brazil, Mr. Mori attended a presentation by Gustavo Santana, who had recently developed three-dimensional body-scanning software to create custom athletic wear. After the presentation, Mr. Mori introduced himself to Mr. Santana, and the two got into an in-depth conversation. — [3] —. In subsequent months, more exchanges between the two men followed, ultimately leading them to create LKJ Sportswear. Mr. Mori's travels had helped him formulate crucial ideas for revamping cycling apparel, which he was able to realise in collaboration with Mr. Santana, using Mr. Santana's software. — [4] —. Today, after 25 years in business, LKJ Sportswear continues to be a leader in sports apparel in Brazil and throughout South America, while sales of its products, most notably the cycling and tennis lines, continue to grow in Europe.`,
];

const tr02An1BodyJa = [
  `Matheus Moriは、カナダのトロントにあるローウェル大学で傑出したビジネス専攻の学生でした。卒業後、彼は地域の事業組合から資金提供を受けて旅行関連のソフトウエア事業を立ち上げました。4年後に、彼は自分がただお金を稼ぐだけではないことをしたいと気付きました。彼は自分の関心事と夢を追求したかったのです。そこで彼は事業を売却して、旅とサイクリングの時期に入りました。`,
  `ブラジルでのスポーツ協議会に参加している間、Mori氏はGustavo Santanaによるプレゼンテーションに出席しました。その人物は少し前に特注の競技用ウエアを作るための3Dボディー・スキャニングソフトを開発していました。プレゼンテーションの後、Mori氏はSantana氏に自己紹介して、2人は踏み込んだ会話を始めました。*彼らは、自分たちが高性能スポーツウエアへの関心を共に持っていることを知りました。その後数カ月間、2人の間ではさらにやりとりが続き、最終的に彼らはLKJスポーツウエア社を設立するに至りました。Mori氏の旅は、サイクリング用衣料を改良するための重要なアイデアを自ら考案するのに役立ちましたが、それを彼はSantana氏と共同でSantana氏開発のソフトウェアを使用することで実現できました。今日、創業25年を経て、LKJスポーツウエア社はブラジルと南米全域におけるスポーツ衣料のトップ企業であり続ける一方、同社の製品、とりわけサイクリングとテニスの製品ラインの売り上げはヨーロッパで成長し続けています。`,
];

const tr02An1Q1 = {
  id: 'tr02_an1_q1',
  promptEn: 'What is indicated about LKJ Sportswear?',
  promptJa: 'LKJ スポーツウェア社について何が示されていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'It sells its products in multiple countries.',
      textJa: '同社は複数の国で製品を販売している。',
    },
    {
      id: 'b',
      textEn: 'It now makes only cycling apparel.',
      textJa: '同社は現在、サイクリング用衣料のみを製造している。',
    },
    {
      id: 'c',
      textEn: 'Its products are often sold at a discount.',
      textJa: '同社の製品は頻繁に、割引価格で販売されている。',
    },
    {
      id: 'd',
      textEn: 'Its founders are both from Canada.',
      textJa: '同社の創業者は両者ともカナダ出身である。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `LKJスポーツウエア社の現在の状況について、②の4〜5行目に、LKJ Sportswear continues to be a leader in sports apparel in Brazil and throughout South America「LKJスポーツウエア社はブラジルと南米全域におけるスポーツ衣料のトップ企業であり続ける」とあり、さらにsales of its products ..... continue to grow in Europe「同社の製品の売り上げはヨーロッパで成長し続けている」と述べられているので、LKJスポーツウエア社が南米やヨーロッパの複数の国で製品を販売していることが分かる。よって、（A）が正解。multiple「複数の」。
（C） at a discount「割引価格で」。
（D）①の1行目にMoriさんがカナダの大学を卒業したとあるが、創業者の出身地についての言及はない。`,
  metacogFeedbackJa: `**「indicated」は“本文に明示された事実だけ”を拾う：会社紹介は末段落の「地域＋販売/成長＋製品ライン」を先にスキャンする。**


1. 設問の動詞を固定する：「示されている」＝推測・常識ではなく、本文に書いてある事実のみ。
2. 会社紹介文は**末段落から**見る（現状まとめが集まりやすい）：地名・範囲語（〜全域、〜で）を拾う。
3. 拾った地理情報を**束ねて**判断する：地域が複数出ていれば「複数の国/地域で販売」に寄せられる。
4. ひっかけは**範囲語のすり替え**：
   - 「〜が有名」→「〜しか作らない（only）」に拡大しない
   - 「〜で学んだ」→「〜出身（from）」に変換しない
   → 各選択肢を**Yes/Noで本文に明記があるか**だけ確認して切り捨てる。

✅ 「複数の国/地域」を選ぶなら、本文中の**地名が2つ以上**（別地域）を指で示せるか？`,
};

const tr02An1Q2 = {
  id: 'tr02_an1_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"They discovered that they shared an interest in high-performance sportswear."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「彼らは、自分たちが高性能スポーツウエアへの関心を共に持っていることを知りました」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '［1］' },
    { id: 'b', textEn: '[2]', textJa: '［2］' },
    { id: 'c', textEn: '[3]', textJa: '［3］' },
    { id: 'd', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `挿入文は複数の人物を示す theyがあるので、複数の人物に関する記述の後ろに入ると考えられる。②の1〜3行目で、MoriさんとSantanaさんが出会ってから会社を立ち上げるまでの経緯が述べられている。同2行目のthe two got into an in-depth conversation「2人は踏み込んだ会話を始めた」の直後の（C）［3］に挿入文を入れると、挿入文中のtheyがMoriさんとSantanaさんを指すことになる。踏み込んだ会話で共通の関心事があると分かった結果、2人のやりとりが続き、最終的にLKJスポーツウエア社を設立するに至った、と会社設立の経緯を説明する流れとなり、適切。discover that〜「〜ということを知る」、share「～を共に持つ」。`,
  metacogFeedbackJa: `**挿入文は「代名詞の先行詞」と「出来事の因果（会話→発見→次の行動）」が両方ピタッと決まる場所に置く。**


1. 挿入文の“接着剤”を抜き出す：複数主語（代名詞）／発見・気づき系の動詞（会話の結果）／共通点の判明。
2. 各候補位置で直前を確認：直前までに「複数の人物」が明示され、代名詞が一意に指せるか。
3. 直後を確認：挿入文が「原因」になって、直後の「その後の交流・行動・結論」に自然につながるか（時系列が前向きか）。
4. ひっかけの切り捨て：**人物が1人しか出ていない所**や、**成功談・後日談に入った所**は、代名詞が曖昧／時系列が逆転しやすいので除外する。

✅ 挿入後に、代名詞を「直前に出た複数人物」に指さし確認しても解釈が割れないか？（割れるならその位置は不正解）`,
};

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
  `Burger Cityビストロは、間もなく同社がBCビストロという名で知られるようになると発表した。広告、包装、看板、そしてソーシャルメディアのアカウントの全てが新しい名称に合わせて更新されているところだ。`,
  `「当組織は長年にわたり、ハンバーガーに加えて、サラダ、ラップサンドイッチ、グリルチキンのような健康に良いものを目玉としてメニューを拡大してきました」とHoward Shuman社長は述べた。「われわれは、お客さまがうちの店を誰もがおいしい選択肢を見つけられる場所だと思ってくださることを望んでいます」。`,
  `Burger Cityビストロは従来、若い成人や10代の若者に受けてきた。しかし、25歳～49歳の女性は現在、同社の年間売り上げの23パーセントしか占めていない。同社は最近、その市場区分にアピールする一助となるよう、著名人のIsobel Wuを広報役に採用したと発表した。Wuさんは、テレビ番組「スター・ダンサーズ」に出演中で、BCビストロを健康的なライフスタイルの一環として紹介するテレビ広告と印刷広告に登場することになる。`,
  `「当社のメニューが、何年も前のものから方向転換したことをまだ知らない潜在顧客に届く新たな発言力を、Wuさんは当社にもたらすでしょう」とShuman氏は述べた。*Wuさんを起用する広告は、社名が切り替わるとすぐ始められるように用意ができている。`,
];

const tr02Analog2Q1 = {
  id: 'tr_02_an2_q1',
  promptEn: 'According to the article, why is the company changing its name?',
  promptJa: '記事によると、会社はなぜその名称を変更するのですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To make the name easier to remember',
      textJa: '名称をより覚えやすくするため',
    },
    {
      id: 'b',
      textEn: "To better reflect the company's current image",
      textJa: '会社の現在のイメージをより適切に表すため',
    },
    {
      id: 'c',
      textEn: 'Because it has been sold to another company',
      textJa: '同社は別会社に売却されたから',
    },
    {
      id: 'd',
      textEn: 'Because it is no longer selling burgers',
      textJa: '同社は、もはやハンバーガーを販売していないから',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `①より、Burger Cityビストロという会社が名称変更をすると分かる。②1～2行目に、「当組織は長年にわたり、ハンバーガーに加えて、健康に良いものを目玉としてメニューを拡大してきた」という同社社長の発言がある。さらに同3〜4行目に、We want our guests to think of us as a place where everyone can find tasty options.「われわれは、お客さまが当店を誰もがおいしい選択肢を見つけられる場所だと思ってくれることを望む」と同社長の話が続いている。よって社名の変更は、ハンバーガーだけでなく健康的なメニューを取りそろえるようになった同社の現在のイメージを、より適切に表すためと分かる。reflect「〜を表す、～を反映する」、current「現在の」、image「イメージ、印象」。
（D） no longer「もはや～ない」。`,
  metacogFeedbackJa: `**「なぜ？」は“発表の直後〜社長コメント”にある理由文を1本抜きして、選択肢を本文語に言い換えて一致させる。**


1. 設問の型を固定する：*why*＝「目的・理由」を本文のどこか1文で言えるはず、と決める。
2. まず冒頭で「何が起きたか（社名変更）」だけ確認したら、すぐ次の“理由説明ゾーン”（発表の直後／コメント段落）へ移動する。
3. 理由の核語を拾う：メニューの広がり・健康的選択肢・客に持ってほしい印象（＝今の方向性に合わせたい）。
4. 選択肢は「本文の核語で言い換えられるか」で照合して選ぶ。
5. ひっかけの切り捨て：**本文に明示がない“常識補完”は不正解**（短縮＝覚えやすい、健康メニュー＝主力商品をやめた、などの飛躍は根拠不足で切る）。

✅ 自分の答えを「メニューの変化→客にこう思ってほしい」という本文の言い方に置き換えて、1文で説明できるか？できなければ“理由文”を取り直す。`,
};

const tr02Analog2Q2 = {
  id: 'tr_02_an2_q2',
  promptEn: 'According to the article, what does the company hope to accomplish by hiring Ms. Wu?',
  promptJa: '記事によると、会社はWuさんを採用することによって何を成し遂げたいと思っていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'More women will visit BC Bistro locations.',
      textJa: 'より多くの女性がBCビストロの店舗を訪れる。',
    },
    {
      id: 'b',
      textEn: 'More teenagers will become interested in BC Bistro.',
      textJa: 'より多くの10代の若者がBCビストロに興味を持つようになる。',
    },
    {
      id: 'c',
      textEn: 'There will be a larger audience for Star Dancers.',
      textJa: '「スター・ダンサーズ」の視聴者がより多くなる。',
    },
    {
      id: 'd',
      textEn: 'Free dance classes will be held at all locations.',
      textJa: '無料のダンス講座が全店舗で開催される。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `③2〜4行目に、The company recently announced that it had hired celebrity Isobel Wu as a spokesperson to help appeal to that market segment. 「同社は最近、その市場区分にアピールする一助となるよう、著名人のIsobel Wuを広報役に採用したと発表した」とある。ここでのthat market segment「その市場区分」とは、直前の文にある、同社の年間売り上げの23パーセントしか占めていない「25歳～49歳の女性」を指している。つまり、会社はWuさんを起用することによって、現在の主要顧客層ではない年代の女性にアピールし、より多くの女性顧客を取り込む狙いがあると分かる。
よって（A）が正解。accomplish「～を成し遂げる」。location「店舗」。
（C） audience「視聴者、観客」。`,
  metacogFeedbackJa: `**「起用の狙い」問題は、起用文の直後に出る *to / in order to* を拾い、指示語（that〜）を直前に戻して“誰向けか”を確定する。**


1. 設問の動詞が *hope to / accomplish* なら、答えは「事実」ではなく**目的（狙い）**だと決める。
2. 本文から *hired / spokesperson*（起用・広報役）を含む文を探し、**目的マーカー**（*to help / to appeal / in order to*）をセットで抜く。
3. *that market segment* などの指示語は、**直前の1文**に戻って「どの層か」を1つに確定する（数値・年齢・性別が目印）。
4. 選択肢は「確定した層」と主語が一致するものだけ残す。
   - ひっかけ典型：**有名人の出演番組・肩書き**に引っ張られ、「番組の視聴者が増える」など**会社の目的ではない**ものを選ぶ → 主体が会社の来店・購買かで切り捨てる。

✅ *that〜* が出たら「直前1文で指示先を言い切れるか？」言い切れないなら、選択肢を見る前に戻って解決する。`,
};

const tr02Analog2Q3 = {
  id: 'tr_02_an2_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Advertisements featuring Ms. Wu are set to begin when the name changes."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「Wuさんを起用する広告は、社名が切り替わるとすぐ始められるように用意ができている」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '［1］' },
    { id: 'b', textEn: '[2]', textJa: '［2］' },
    { id: 'c', textEn: '[3]', textJa: '［3］' },
    { id: 'd', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `挿入文は、Wuさんを起用した広告について述べているもの。Wuさんについて初めて言及しているのは③3行目なので、挿入文はこれ以降に入ると考えられる。④1〜2行目で、Wuさんを起用する広告について、「当社のメニューが、何年も前のものから方向転換したことをまだ知らない潜在顧客に届く新たな発言力を、Wuさんは当社にもたらすだろう」とその期待が述べられている。この直後の（D）［4］に、Wuさんを起用した広告が始まるタイミングを知らせる挿入文を入れると、Wuさん起用の広告に関する一連の流れとなり適切。
be set to do「〜する用意ができている」。`,
  metacogFeedbackJa: `**挿入文は「主語（誰の話）＋追加情報の種類（いつ/なぜ/結果）」でタグ付けし、同じ話題が“導入済み”で「説明→補足」の順になる位置に置く。**


1. **挿入文を分解してタグを付ける**：主語＝ある人物を起用した広告／情報タイプ＝開始時期（社名変更のタイミング）。
2. **初出制約で候補を一気に削る**：挿入文に出る人物・モノが本文でまだ紹介されていない位置は不可（参照が成立しない）。
3. **前後1〜2文だけ見て「情報の並び」を確認**：「誰を起用・なぜ」→「具体策」→「いつ始まる」のように、挿入文が“時期の補足”として自然に読める場所を探す。
4. **ひっかけの典型と切り捨て方**：冒頭の大テーマ（社名変更）に同じ語があるからといって早い位置に入れない。人物が未導入なら、その時点で不適（語の一致より参照の成立が優先）。

✅ 挿入した直後に「その人物って誰？」が残らず、前文が“説明”、挿入文が“開始時期の補足”になっているか（はい／いいえ）`,
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
  `Crofton電力社は、お客さまへの献身に対して一貫して高い評価を頂いております。サービス担当者は、電力に関するご用件に迅速に対処すべく常時応対可能です。お客様満足度は、幾つかの要となる保証によって裏打ちされています。お客さまへのお約束については、以下に概要を記しております。`,
  `請求書の作成・送付：お客さまからのお問い合わせは、請求書担当部門宛てに604-555-0101までお寄せいただくか、Crofton電力社お客さま用ポータルサイトを通じてオンラインで行ってください。*お客様は通常、オンラインでのご依頼を送信後、2時間以内に回答を受け取ります。お客さまのご質問にさらなる調査が必要な場合は、回答に最長3営業日の余裕を見てください。万一、回答が3日よりも遅れた場合は、お客さまのアカウントに当社に対して25ドルの貸しがあることが記録されます。`,
  `予約：Crofton電力社はお客さまとのお約束の時間を全て守ることを目指しています。Crofton社の点検修理技術者は2時間の時間枠内に到着するように予定しています。この時間枠が順守されなかった際にはどのような場合も、お客さまのアカウントに当社に対して40ドルの貸しがあることが記録されます。`,
  `計画停電：建設工事や保守作業のためにCrofton電力社が一時的に電力供給を停止する必要がある場合、影響を受ける可能性のあるお客さまは、遅くとも48時間前には通知されます。供給中断の通知が提供されないまま、停電が発生するというめったにないケースでは、お客さまのアカウントに当社に対して80ドルの貸しがあることが記録されます。`,
  `Crofton電力社が目指すのは、公正で透明性のあるサービスを提供することです。お客さまのエネルギー需要をCrofton電力社にお任せくださいまして、ありがとうございます。`,
];

const tr02Analog3Q1 = {
  id: 'tr_02_an3_q1',
  promptEn: 'What is suggested in the information?',
  promptJa: '案内文では何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Equipment has been recently upgraded.',
      textJa: '設備の性能が最近高められた。',
    },
    {
      id: 'b',
      textEn: 'Delayed bill payments may result in a late fee.',
      textJa: '料金支払いが遅れると、延滞料が発生することがある。',
    },
    {
      id: 'c',
      textEn: 'Quality service is a priority.',
      textJa: '質の高いサービスが優先事項である。',
    },
    {
      id: 'd',
      textEn: 'A service area has expanded.',
      textJa: 'サービス提供エリアが拡大した。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `Crofton電力社の案内の①1行目で、同社は顧客への献身的なサービスに対し一貫して高評価を受けていると述べられており、続く同1行目にService representatives are available at all times to promptly address power concerns.「サービス担当者は、電力に関する用件に迅速に対処すべく常時応対可能だ」とある。さらに、②～④ではサービスに関する顧客への約束の概要が記載され、⑤1行目で「Crofton電力社が目指すのは、公正で透明性のあるサービスを提供することだ」と述べられている。これらのことから、同社は顧客サービスに力を入れていると判断できるので、（C）が正解。quality「質の高い」、priority「優先事項」。
（A） equipment「設備、機材」、upgrade「～の性能を高める」。
（B） result in～「〜という結果になる」、late fee「延滞料」。
（D） expand「拡大する」。`,
  metacogFeedbackJa: `**「What is suggested?」は“全体から言える方針・優先事項”を拾う問題。冒頭＋結び＋具体例が同じ方向を向く選択肢を選ぶ。**


1. 設問を見た瞬間に「1文一致」ではなく「本文全体の一般化（会社の姿勢）」を答えると決める。
2. まず冒頭と結びを先読みし、方針語（例：重視・目標・透明性・迅速対応など）に線を引く。
3. 中盤の箇条書きは“具体例”として確認する：保証・補償・対応時間などが並ぶなら、テーマは「サービス品質の担保」に寄る。
4. 選択肢はYes/Noで切る：「本文の複数箇所で一貫して支えられる一般化」だけを残す。
5. ひっかけ対策：**見出し語に釣られて別話題を作らない**（例：請求の話題がある→支払い遅延の罰則、と短絡）。本文にない「最近」「拡大」などの変化語も即除外。

✅ 冒頭＋結び（または保証条項）など**最低2か所**から同じ結論が言えるかを確認してから、一般化の選択肢を選んだか？`,
};

const tr02Analog3Q2 = {
  id: 'tr_02_an3_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Customers typically receive a response within two hours after an online request is made."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「お客さまは通常、オンラインでのご依頼を送信後、2時間以内に回答を受け取ります」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '［1］' },
    { id: 'b', textEn: '[2]', textJa: '［2］' },
    { id: 'c', textEn: '[3]', textJa: '［3］' },
    { id: 'd', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `挿入文は顧客に対し、オンラインで問い合わせた場合について案内するもの。②1行目で、「お客さまからの問い合わせは、請求書担当部門宛てに604-555-0101までお寄せいただくか、Crofton電力社お客さま用ポータルサイトを通じてオンラインで行ってください」と、顧客が問い合わせる際の方法を案内している。この後ろの（B）［2］に挿入文を入れると、顧客がオンラインで問い合わせを行った後に回答を受け取るまでの所要時間を示すことになり、流れとして適切。
typically「通例、一般的には」。`,
  metacogFeedbackJa: `**挿入文は「フック語（条件・対象）」で場所を機械的に特定する：同じ条件を直前が提示し、直後がその詳細（例外・追加条件）になる所に入れる。**
（タイプ見分け方：挿入文に *online / if / when / this / such* など“条件・指示語”がある）


1. 挿入文のフック語を3つ抜く（例：オンライン／回答／2時間）。
2. 各空所の直前文を見て、フック語の“前提”が出ている場所だけ残す（オンラインの話がない所は即除外）。
3. 次に空所直後を見て、挿入文を受けて「詳細化」しているか確認する（回答時間→追加調査なら何日、など“条件の階段”になるか）。
4. ひっかけ対策：数字・時間表現だけで飛びつかない。「何の時間か（返信／到着／通知）」の対象が一致しないなら切り捨てる。
5. 最後に、挿入後の流れが「手段→標準→例外/補足」の順になっているかを音読でチェックする（不自然なら戻る）。

✅ 挿入後に「オンラインで依頼 → 通常の返信時間 → 追加調査が必要な場合の返信期限」という“条件の階段”が1本につながっているか？`,
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

// ===== tr_03: A3/B3群用 Text Message Chain =====

const tr03MessagesEn = [
  {
    sender: 'Ian Tsukase',
    time: '9:32 A.M.',
    text: "Good morning. I want to update you on tomorrow's training session for our new servers here at the restaurant. The trainer from the corporate office will be here at 10:15 A.M. Eleven of the twelve hires will be here, but one has a conflict.",
  },
  {
    sender: 'Anouk Claasen',
    time: '9:33 A.M.',
    text: 'Right. Fiona Leffley mentioned during her interview that she was going to be out of the country this week. I think she was a good choice. She lacks experience, but she is friendly and hardworking.',
  },
  {
    sender: 'Ian Tsukase',
    time: '9:35 A.M.',
    text: 'Then, the trainer should come back next week.',
  },
  {
    sender: 'Anouk Claasen',
    time: '9:36 A.M.',
    text: 'No need. We can record the most important parts and send them to Ms. Leffley. And then, she can shadow one of our more experienced servers for a few shifts.',
  },
  {
    sender: 'Ian Tsukase',
    time: '9:37 A.M.',
    text: "OK. I'll check with the serving team to see who can work with her next week.",
  },
];

const tr03MessagesJa = [
  {
    sender: 'Ian Tsukase',
    time: '午前9時32分',
    text: 'おはようございます。当レストランの新しい給仕人向けの明日の研修会について、最新情報をお伝えしたいと思います。本社からの指導係が午前10時15分にここに来る予定です。12人の新規雇用者のうち11人はここに来ますが、1人は予定が重なって来られません。',
  },
  {
    sender: 'Anouk Claasen',
    time: '午前9時33分',
    text: 'そうなのです。Fiona Leffleyは面接で、今週国外にいる予定だと言っていました。彼女は良い選択だったと思います。経験は不足していますが、人当たりが良く仕事熱心です。',
  },
  {
    sender: 'Ian Tsukase',
    time: '午前9時35分',
    text: 'では、指導係は来週また来た方がいいですね。',
  },
  {
    sender: 'Anouk Claasen',
    time: '午前9時36分',
    text: '必要ありません。私たちは最も重要な部分を録画してLeffleyさんに送ることができますから。その後、彼女は幾つかのシフトで経験豊富な給仕人の一人に付いて仕事を学ぶことができますよ。',
  },
  {
    sender: 'Ian Tsukase',
    time: '午前9時37分',
    text: '分かりました。来週誰が彼女と一緒に働けるのか、給仕チームと相談してみます。',
  },
];

const tr03Question1 = {
  id: 'tr03_q1',
  promptEn: 'What is indicated about Ms. Leffley?',
  promptJa: 'Leffleyさんについて何が示されていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She will attend a meeting at the corporate office.',
      textJa: '本社で会議に出席する予定である。',
    },
    {
      id: 'b',
      textEn: 'She will begin a new job soon.',
      textJa: '間もなく新しい仕事を始める予定である。',
    },
    {
      id: 'c',
      textEn: 'She is an experienced server.',
      textJa: '経験豊富な給仕人である。',
    },
    {
      id: 'd',
      textEn: 'She rescheduled an interview.',
      textJa: '面接の予定を変更した。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `Leffleyさんについては、Claasenさんが②で、今週国外にいるという予定を面接で言っていたと伝えている。これは①の、新しい給仕人向けの研修会に「12人の新規雇用者のうち11人はここに来るが、1人は予定が重なって来られない」というTsukaseさんの発言に対して述べたものである。予定が重複して研修会に参加できない新しい給仕人がLeffleyさんだと判断できるので、（B）が正解。
（A）①で、本社から指導係が来ると述べているだけ。
（C）②で、Leffleyさんは経験が不足していると述べられている。
（D）②に、Leffleyさんは面接中に今週国外にいる予定だと言ったとあるが、面接の予定を変更したとは述べられていない。reschedule「～の予定を変更する」。`,
  metacogFeedbackJa: `**人物についての設問は「名前が出た文を全回収→属性（立場・予定・経験）をタグ付け→矛盾チェック」で即決する。**
（見分け方：設問が「示されていること」系＝本文に“足さずに”言える事実を1つ選ぶ）


1. 設問タイプを固定する：「示されている」＝本文の明示情報＋参照関係のつなぎ替えまで（推測で話を膨らませない）。
2. 対象人物の名前が出る箇所を全部拾い、メモ的に分類する（予定／経験／立場）。
3. 参照解決をする：別の文の「欠席者」「新規採用者」などの無名表現が、その人物を指すかをつなぐ（人数・状況が一致するかで判断）。
4. 選択肢を本文と照合し、**否定・比較表現**で落とす（例：「経験が不足」＋「より経験豊富な人に付く」→“経験豊富”は矛盾で切り捨て）。
5. ひっかけを切る：本文にない出来事（会議に出る／面接を変更した等）を**それっぽい単語**から補っている選択肢は即除外。

✅ 名前の出る文を3か所くらい指で追い、「その言い換え」になっている選択肢だけを残し、本文にない行動を足していないか確認したか？`,
};

const tr03Question2 = {
  id: 'tr03_q2',
  promptEn:
    'At 9:35 A.M., what does Mr. Tsukase most likely mean when he writes, "Then, the trainer should come back next week"?',
  promptJa:
    '午前9時35分に"Then, the trainer should come back next week"という発言で、Tsukaseさんは何を意図していると考えられますか。',
  quotedTextEn: 'Then, the trainer should come back next week.',
  quotedTextJa: 'では、指導係は来週また来た方がいいですね。',
  choices: [
    {
      id: 'a',
      textEn: 'He has learned that the trainer is currently unavailable.',
      textJa: '指導係は現在都合がつかないことを知った。',
    },
    {
      id: 'b',
      textEn: "He wants to accommodate Ms. Leffley's schedule.",
      textJa: 'Leffleyさんの予定に合わせたい。',
    },
    {
      id: 'c',
      textEn: 'He thinks some materials are not ready for use.',
      textJa: 'まだ使う用意ができていない資料があると思っている。',
    },
    {
      id: 'd',
      textEn: 'He will be on vacation later this week.',
      textJa: '今週中に休暇に入る予定である。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `Tsukaseさんが①で、新規雇用者の1人が明日の研修会に出席できないと述べたのに対し、Claasenさんは②で、それを肯定した後、Fiona Leffleyは今週国外にいる予定だと述べている。それに対して、Tsukaseさんは③の下線部で、「では、指導係は来週また来た方がいいですね」と発言している。これは、明日の研修会に出席できないLeffleyさんの予定に合わせたいと考えているものと判断できる。よって、（B）が正解。accommodate「～（状況・条件）に合わせる」。
（A）①で、指導係は明日の研修会に来る予定だと言っている。currently「現在、目下」、unavailable「都合がつかない」。`,
  metacogFeedbackJa: `**「意図・推測」問題は、発言の直前2ターンで話題を固定し、接続語（Then/So）を“対応策の合図”として読む。**


1. 設問が「most likely mean」なら、**発言の目的**を問う合図だと決める（事実の言い換えではなく“狙い”）。
2. 該当発言の**直前2ターンだけ**を見て、今の話題が何かを一語でメモする（例：欠席者対応）。
3. 代名詞・ぼかし表現（one など）が出たら、**次の発言で具体化されていないか**を探して特定する。
4. Then/So/In that case を見たら、**「直前の事情 → それへの提案」**の因果でつなぐ。
5. ひっかけの典型：**「相手側の都合」「準備不足」「休暇」など、本文に根拠がない理由付け**。本文にその事実が書かれていなければ即切り捨てる。

✅ 9:35の直前に増えた新情報を1つ言えるか？それが「その提案をする理由」になっているか？`,
};

const tr03Passage: Passage = {
  id: 'tr_03',
  title: 'Restaurant Training Session',
  direction: 'Questions 1-2 refer to the following text-message chain.',
  directionJa: '問題1-2は次のテキストメッセージのやり取りに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'textMessageChain' as const,
      locale: 'en' as const,
      textMessageChain: {
        messages: tr03MessagesEn,
      },
    },
    {
      layoutType: 'textMessageChain' as const,
      locale: 'ja' as const,
      textMessageChain: {
        messages: tr03MessagesJa,
      },
    },
  ],
  questions: [tr03Question1, tr03Question2],
};

// ===== tr_03 類題1: Online Chat Discussion =====

const tr03An1MessagesEn = [
  {
    sender: 'Melissa Hewitt',
    time: '11:11 A.M.',
    text: "Hi. Did either of you have trouble submitting your project reports this morning on the construction of the Wiley Tower Apartment Building? I received the secure link to upload mine, but I can't get it to work.",
  },
  {
    sender: 'Carmen Longoria',
    time: '11:12 A.M.',
    text: "I'm still writing my report, so I have not tried it yet. We have until the end of the day tomorrow to submit, though, right?",
  },
  {
    sender: 'Melissa Hewitt',
    time: '11:14 A.M.',
    text: "There's been an update. One of the contractors requested the reports sooner, so we need to submit them today. My manager e-mailed us about the change in the due date last week.",
  },
  {
    sender: 'Carmen Longoria',
    time: '11:15 A.M.',
    text: "I didn't see that e-mail from Mr. Wood. I still need to finalize cost estimates for the construction materials. And we have the meeting about Wiley Tower this afternoon.",
  },
  {
    sender: 'Devin Mayer',
    time: '11:16 A.M.',
    text: 'Yes. And Mr. Wood requested that we provide a summary at the meeting.',
  },
];

const tr03An1MessagesJa = [
  {
    sender: 'Melissa Hewitt',
    time: '午前11時11分',
    text: 'こんにちは。お2人のどちらか、今朝Wileyタワーマンションの建設に関するプロジェクト報告書の提出に支障がありましたか。私の分をアップロードするのに安全なリンクを受け取ったのですが、うまくいきません。',
  },
  {
    sender: 'Carmen Longoria',
    time: '午前11時12分',
    text: '私はまだ報告書を書いているところなので、それを試していません。でも、提出期限は明日いっぱいですよね？',
  },
  {
    sender: 'Melissa Hewitt',
    time: '午前11時14分',
    text: '更新があったのです。請負業者の一つが報告書をもっと早く受け取りたいと要望してきたので、私たちは今日提出する必要があります。先週、私の上司が期日の変更についてEメールを送ってきましたよ。',
  },
  {
    sender: 'Carmen Longoria',
    time: '午前11時15分',
    text: 'Woodさんからのそのメールを見ていませんでした。私はまだ建設資材の費用見積もりをまとめる必要があります。それに、今日の午後Wileyタワーに関する会議があるのです。',
  },
  {
    sender: 'Devin Mayer',
    time: '午前11時16分',
    text: 'そうです。そして、Woodさんは私たちにその会議で概要を説明することを要請してきました。',
  },
];

const tr03An1Q1 = {
  id: 'tr_03_an1_q1',
  promptEn:
    'At 11:14 A.M., what does Ms. Hewitt most likely mean when she writes, "There\'s been an update"?',
  promptJa:
    '午前11時14分に、"There\'s been an update"という発言で、Hewittさんは何を意図していると考えられますか。',
  quotedTextEn: "There's been an update.",
  quotedTextJa: '更新があったのです。',
  choices: [
    {
      id: 'a',
      textEn: 'A deadline has changed.',
      textJa: '最終期限が変更になった。',
    },
    {
      id: 'b',
      textEn: 'A link has been replaced.',
      textJa: 'リンクが差し替えられた。',
    },
    {
      id: 'c',
      textEn: 'A price has increased.',
      textJa: '価格が上昇した。',
    },
    {
      id: 'd',
      textEn: 'A report can no longer be revised.',
      textJa: '報告書はもはや修正できない。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `Hewittさんが①で、報告書の提出について尋ねたのに対し、Longoriaさんは②で、まだ書いているところだと述べ、期限は明日中であることを確認している。それに対して、Hewittさんは③の下線部で、「更新があった」と発言した後、請負業者の要望で報告書の提出が早まり、期日変更を知らせるEメールが届いたと述べている。よって、Hewittさんの下線部の発言は、提出の最終期限の変更を伝えていると判断できるので、（A）が正解。deadline「最終期限」。
（B）①で、安全なリンクを受け取ったとあるのみ。replace「〜を取り替える」。
（C）④で、Longoriaさんが費用の見積もりについて言及しているのみ。
（D）報告書の修正については話題に上っていない。revise「～を修正する」。`,
  metacogFeedbackJa: `**「更新・お知らせ」系の導入句が出たら、直後の具体文で“何が変わったか”を差分で取る（前提→新指示）。**


1. 設問のトリガー語（更新・変更・お知らせ）を見たら、「更新内容＝この後に具体化される」と決めて読む。
2. トリガー語の**直後の一文**を最優先で拾い、動詞（提出する・延期する等）と時制/期限語（今日・明日・まで）に下線を引く。
3. 直前の発言にある“元の前提”（例：期限は明日？）と、直後の“新指示”（例：今日は提出）を**対比**して、変化した要素を一語で言い換える（＝期限の変更）。
4. その一語を選択肢のキーワードに写像して選ぶ。
5. ひっかけ対策：本文の別の話題語（リンク・費用など）に反応して選ばない。**「更新の直後に明示されていない内容」は切り捨て**る。

✅ 自分の選択肢は、「更新」発言の**直後**で同じ内容が言い直されている（具体化されている）か？`,
};

const tr03An1Q2 = {
  id: 'tr_03_an1_q2',
  promptEn: 'Who most likely is Mr. Wood?',
  promptJa: 'Woodさんは誰だと考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'A construction worker',
      textJa: '建設作業員',
    },
    {
      id: 'b',
      textEn: 'A tenant at Wiley Tower',
      textJa: 'Wileyタワーの賃借人',
    },
    {
      id: 'c',
      textEn: "Ms. Hewitt's manager",
      textJa: 'Hewittさんの上司',
    },
    {
      id: 'd',
      textEn: 'A technical support staff member',
      textJa: '技術サポートのスタッフ',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `Woodさんについては、Longoriaさんが④で、WoodさんからのEメールは見ていなかったと発言している。そのEメールは、Hewittさんが③で、「先週、私の上司が期日の変更についてEメールを送ってきた」と述べているものを指している。よって、WoodさんとはHewittさんの上司だと考えられるので、（C）が正解。
（A）建設に関する話題から連想され得る点に注意。
（B）tenant「賃借人」。
（D）①で、アップロードができないというトラブルへの言及があるのみ。technical「技術上の」。`,
  metacogFeedbackJa: `**人物同定は「名前の出現箇所を全回収 → 同一イベント（メール・依頼）で束ねる → 役職語に落とす」で解く。**
- **“most likely”は断定情報より「立場的にできる行為（依頼・期限変更）」を優先して整合させる。**


1. 設問の人物名が出る発言をすべて拾い、「何をした人か」（送った／依頼した／決めた）だけメモする。
2. 直前直後の指示語（そのメール・その依頼など）を追い、同じ出来事を指しているかを突き合わせる。
3. 同一出来事だと確定したら、「送信者＝誰」「依頼者＝誰」を一本化し、本文中の役職語（上司・管理者など）に変換して選択肢へ対応させる。
4. ひっかけ切り捨て：話題の分野（建設）や一時的なトラブル（アップロード不具合）から“それっぽい職種”に飛びつかない。人物同定は**行為の権限**（期限変更を通知できる／会議で要約を求める）で決める。

✅ 「名前が出る箇所を2つ以上拾い、メール・依頼などの出来事が同一人物に矛盾なくつながっているか？」`,
};

const tr03An1Q3 = {
  id: 'tr_03_an1_q3',
  promptEn: 'What is Ms. Longoria concerned about?',
  promptJa: 'Longoriaさんは何を心配していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She is unable to attend a meeting.',
      textJa: '会議に出席できない。',
    },
    {
      id: 'b',
      textEn: 'She deleted an e-mail by mistake.',
      textJa: '誤ってEメールを削除した。',
    },
    {
      id: 'c',
      textEn: 'She has not finished some estimates.',
      textJa: '見積もりを仕上げていない。',
    },
    {
      id: 'd',
      textEn: 'She is unsure about the materials she chose.',
      textJa: '自分が選んだ資材について確信がない。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `Longoriaさんは④で、提出期限の前倒しを知らせるEメールは見ていなかったと述べ、まだ建設資材の費用の見積もりをまとめる必要があるため報告書は提出できない旨の発言をしている。この内容を、has not finished「～を仕上げていない」を用いて表した（C）が正解。be concerned about〜「～について心配している」。
（A）④で、会議があると発言しているのみ。be unable to do「〜することができない」。
（B）④で、Eメールを見ていないと発言しているが、削除したとは述べていない。delete「～を削除する」、by mistake「誤って」。
（D）④で、資材の見積もりが未完了だと述べているだけ。be unsure about〜「～について確信がない」。`,
  metacogFeedbackJa: `**設問の人物を固定し、その人の発言から「未完了タスク（still / need to / finalize）」だけを拾って選択肢に写像する。**
（見分け方：心配＝感情語より「まだ〜が終わっていない／〜する必要がある」の形で出ることが多い）


1. 設問の主語を固定する：聞かれているのは「その人が何を心配しているか」→その人の発言箇所だけ読む。
2. 発言内で“懸念サイン”を探す：**still / need to / have not / can’t / finalize** など「未完了・未対応」を示す語に線を引く。
3. その未完了内容を名詞化して選択肢に当てる：例）「まだ見積もりをまとめる必要」→「見積もりが未完了」。
4. ひっかけを切る：**本文にない動詞・断定が足された選択肢**は捨てる（例：「見ていない」→「削除した」への飛躍、「会議がある」→「出席できない」への飛躍）。

✅ 選んだ選択肢を「その人の発言の1文」で言い換えできる？できないなら“言っていない追加情報”を選んでいる可能性が高い。`,
};

const tr03Analog1 = {
  id: 'tr_03_an1',
  title: 'Online Chat Discussion - Wiley Tower',
  direction: 'Questions 1-3 refer to the following online chat discussion.',
  directionJa: '問題1-3は次のオンラインチャットの話し合いに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'en' as const,
      onlineChatDiscussion: {
        messages: tr03An1MessagesEn,
      },
    },
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'ja' as const,
      onlineChatDiscussion: {
        messages: tr03An1MessagesJa,
      },
    },
  ],
  questions: [tr03An1Q1, tr03An1Q2, tr03An1Q3],
};

// ===== tr_03 類題2: Text Message Chain =====

const tr03An2MessagesEn = [
  {
    sender: 'Minyuan Deng',
    time: '9:12 P.M.',
    text: 'Hi Charlene. Are you still in the library, by any chance?',
  },
  {
    sender: 'Charlene Tillman',
    time: '9:13 P.M.',
    text: 'I just locked up. Do you need something?',
  },
  {
    sender: 'Minyuan Deng',
    time: '9:14 P.M.',
    text: "I forgot to tell you that since it's the day before a holiday, we have to change the library voicemail message.",
  },
  {
    sender: 'Charlene Tillman',
    time: '9:15 P.M.',
    text: "Oh, that's right! The regular message says we open tomorrow at 8:00.",
  },
  {
    sender: 'Minyuan Deng',
    time: '9:16 P.M.',
    text: "I'm sorry I didn't remind you earlier.",
  },
  {
    sender: 'Charlene Tillman',
    time: '9:17 P.M.',
    text: "That's fine, Minyuan. I'll see to it. Have a good evening.",
  },
  {
    sender: 'Minyuan Deng',
    time: '9:18 P.M.',
    text: 'You as well, Charlene. And thank you for taking my daily 4:00 P.M. shift today. I appreciate it and am happy to return the favor.',
  },
];

const tr03An2MessagesJa = [
  {
    sender: 'Minyuan Deng',
    time: '午後9時12分',
    text: 'こんばんは、Charlene。ひょっとして、まだ図書館内にいますか。',
  },
  {
    sender: 'Charlene Tillman',
    time: '午後9時13分',
    text: 'ちょうど戸締まりをしたところです。何かご用ですか。',
  },
  {
    sender: 'Minyuan Deng',
    time: '午後9時14分',
    text: '伝えるのを忘れていましたが、今日は祝日の前日なので、図書館の留守番電話のメッセージを変更する必要があります。',
  },
  {
    sender: 'Charlene Tillman',
    time: '午後9時15分',
    text: 'ああ、そうでした！通常のメッセージでは、明日当館は8時に開館すると流れますね。',
  },
  {
    sender: 'Minyuan Deng',
    time: '午後9時16分',
    text: 'もっと早くに念を押さなくてすみません。',
  },
  {
    sender: 'Charlene Tillman',
    time: '午後9時17分',
    text: '大丈夫ですよ、Minyuan。私がやっておきます。良い夜を過ごしてください。',
  },
  {
    sender: 'Minyuan Deng',
    time: '午後9時18分',
    text: 'あなたの方も、Charlene。そして今日は、私のいつもの午後4時からのシフトを引き受けてくれてありがとうございます。感謝していますので、このご親切にぜひお返しをしたいと思っています。',
  },
];

const tr03An2Q1 = {
  id: 'tr_03_an2_q1',
  promptEn:
    'At 9:17 P.M., what does Ms. Tillman most likely mean when she writes, "I\'ll see to it"?',
  promptJa:
    '午後9時17分に、"I\'ll see to it"という発言で、Tillmanさんは何を意図していると考えられますか。',
  quotedTextEn: "I'll see to it.",
  quotedTextJa: '私がやっておきます。',
  choices: [
    {
      id: 'a',
      textEn: 'She will check that the library doors are locked.',
      textJa: '図書館のドアが施錠されていることを確認するつもりである。',
    },
    {
      id: 'b',
      textEn: "She will post a holiday greeting on the library's Web site.",
      textJa: '図書館のウェブサイトに祝日のあいさつを掲載するつもりである。',
    },
    {
      id: 'c',
      textEn: 'She will change a voicemail message.',
      textJa: '留守番電話のメッセージを変更するつもりである。',
    },
    {
      id: 'd',
      textEn: 'She will send Ms. Deng a reminder e-mail.',
      textJa: 'Dengさんに再確認のEメールを送るつもりである。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `②で、ちょうど図書館の戸締まりをしたと述べたTillmanさんに、Dengさんは③で、祝日の前日なので留守番電話のメッセージを変更する必要があることを伝えるのを忘れていた、と述べている。Dengさんが⑤で、早めに念を押さなかったことを謝ると、Tillmanさんは⑥で、大丈夫だと言った後、下線部の発言で、"I'll see to it"「私がやっておく」と応答している。下線部のitは③の留守番電話のメッセージを変更することを指すので、（C）が正解。
（A）Tillmanさんは②で、戸締まりをしたと述べているが、その後、ドアの施錠確認は話題にされていない。
（B）ウェブサイトのgreeting「あいさつ」については述べられていない。
（D）Dengさんは⑤で、早めに念を押さなかったことを謝っているが、TillmanさんがDengさんに確認や念押しを目的としたリマインドメールを送るとは述べていない。reminder「思い出させるもの」。`,
  metacogFeedbackJa: `**「I’ll see to it」は“it＝直前に出た要対応タスク”を指す定型表現。代名詞の参照先を1つ前のタスク文まで戻して確定する。**


1. 下線部が**代名詞・省略（it / that / so）**かをまず判定し、「何をするのか」が本文内にあるはずだと構える。
2. 会話を**直前の“やる必要がある”系の発言（have to / need to / should）**まで戻り、そこで提示された作業をメモする。
3. 「it＝その作業」に**言い換え**できるか確認する（言い換えできれば参照先はほぼ確定）。
4. 選択肢は「その作業と一致するもの」だけ残す。**ひっかけ**は、本文に出ていない行為を「休日対応っぽい」連想で足すタイプなので、**本文にない作業は即切り**する。

✅ it を「具体的な動詞句（〜を変更する／〜を連絡する等）」に言い換えられる？言い換え不能なら、参照先を直前のタスク提示まで戻って取り直す。`,
};

const tr03An2Q2 = {
  id: 'tr_03_an2_q2',
  promptEn: 'What is suggested about Ms. Deng?',
  promptJa: 'Dengさんについて何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She usually starts work in the library in the afternoon.',
      textJa: '普段、午後に図書館で仕事を始める。',
    },
    {
      id: 'b',
      textEn: 'She is responsible for opening the library in the morning.',
      textJa: '朝、図書館を開館するのを担当している。',
    },
    {
      id: 'c',
      textEn: 'She forgot that the library will be closed tomorrow.',
      textJa: '図書館が明日休館であることを忘れていた。',
    },
    {
      id: 'd',
      textEn: 'She recently did Ms. Tillman a favor.',
      textJa: '最近Tillmanさんのお願いを聞いた。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `Dengさんは⑦で、「今日は、私のいつもの午後4時からのシフトを引き受けてくれてありがとう」とお礼を言っている。よって、Dengさんは普段、午後に図書館での仕事を始めていると分かるので、（A）が正解。
（B）④に、図書館は（午前）8時に開館するとあるが、⑦より、Dengさんのシフト開始は午後4時なので、開館はDengさんの担当業務とは考えられない。be responsible for～「～に対して責任がある」。
（C）③で、Dengさんは明日が祝日のため留守番電話のメッセージを変更する必要性に言及しており、明日は開館時刻が通常と異なることが分かるが、休館かどうかは不明。
（D）⑦より、TillmanさんがDengさんの頼み事を聞いたことが分かる。それに対してDengさんはお返しをしたいと発言しているのみ。do～a favor「〜の願いを聞く、～に便宜を図る」。`,
  metacogFeedbackJa: `**「suggested（示唆）」は“会話の末尾の属性情報”で解く：お礼・依頼・交代＝勤務時間や役割が一気に確定しやすい。**


1. 設問の動詞を確認する：*suggested* なら「明言」ではなく、会話から自然に言える人物情報（勤務時間・担当・関係）を探す。
2. まず最後の発言をスキャンする：テキスト/メールは末尾に「ありがとう／代わった／お願い」が出て、人物の属性が最も濃い。
3. 交代表現を“型”で変換する：**「相手が“自分のいつものシフト”を今日取った」→ そのシフトは普段自分が入る**（＝普段の勤務開始がその時刻帯）。
4. 選択肢は「言い換え一致」で選ぶ：時刻が午後なら「午後に勤務を始める」系にマッピングする。
5. ひっかけを切る：**時刻が出ても“担当者”が書かれていない限り役割は断定しない**（開館時刻＝開館担当、の飛躍は捨てる）。

✅ 最終発言を一文で言い直せるか：「誰が」「誰の」「いつものシフト」を「今日」代わった？（主語と所有格を入れ替えていないか）`,
};

const tr03Analog2 = {
  id: 'tr_03_an2',
  title: 'Text Message Chain - Library Voicemail',
  direction: 'Questions 1-2 refer to the following text-message chain.',
  directionJa: '問題1-2は次のテキストメッセージのやりとりに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'textMessageChain' as const,
      locale: 'en' as const,
      textMessageChain: {
        messages: tr03An2MessagesEn,
      },
    },
    {
      layoutType: 'textMessageChain' as const,
      locale: 'ja' as const,
      textMessageChain: {
        messages: tr03An2MessagesJa,
      },
    },
  ],
  questions: [tr03An2Q1, tr03An2Q2],
};

// ===== tr_03 類題3: Online Chat Discussion =====

const tr03An3MessagesEn = [
  {
    sender: 'Charu Aiyar',
    time: '11:32 A.M.',
    text: "Hello, Jack and Marcia. I wanted to update you on the search for new delivery drivers. I just hired two new people for our Hilltown location. Since I won't be there this week, I'll need your assistance.",
  },
  {
    sender: 'Jack Plebani',
    time: '11:34 A.M.',
    text: 'When will the new hires start?',
  },
  {
    sender: 'Charu Aiyar',
    time: '11:35 A.M.',
    text: 'One of them, James Hesney, can start tomorrow. The other, Luke Pfaff, will start on Friday.',
  },
  {
    sender: 'Marcia Berk',
    time: '11:35 A.M.',
    text: 'Excellent.',
  },
  {
    sender: 'Charu Aiyar',
    time: '11:36 A.M.',
    text: 'Can you keep them busy at the restaurant between deliveries? Their shift is noon till 8 or 9 P.M. Wednesday through Sunday, so there will be some slow times.',
  },
  {
    sender: 'Marcia Berk',
    time: '11:36 A.M.',
    text: 'They could fold pizza boxes. I like having all the boxes ready before the dinner rush hour.',
  },
  {
    sender: 'Jack Plebani',
    time: '11:37 A.M.',
    text: 'Additionally, they can take telephone orders and take out the trash.',
  },
  {
    sender: 'Charu Aiyar',
    time: '11:37 A.M.',
    text: "I'll also ask them to sweep the kitchen floors throughout the day. Jack, can you start training James tomorrow? Marcia, could you start Luke's training on Friday?",
  },
  {
    sender: 'Jack Plebani',
    time: '11:38 A.M.',
    text: "Sure. Let's also enroll them in a basic food-handling certificate course. Having that certification would allow them to prepare sauce and dough when needed. This would give me more time to assemble salads and pasta dishes.",
  },
  {
    sender: 'Marcia Berk',
    time: '11:39 A.M.',
    text: "I've got a planned day off.",
  },
  {
    sender: 'Charu Aiyar',
    time: '11:40 A.M.',
    text: 'Oh, right. I forgot.',
  },
  {
    sender: 'Jack Plebani',
    time: '11:40 A.M.',
    text: "I'll do it, then. No problem.",
  },
];

const tr03An3MessagesJa = [
  {
    sender: 'Charu Aiyar',
    time: '午前11時32分',
    text: 'Jack、そしてMarcia、こんにちは。配達員探しについて最新情報をお知らせしたいと思っていました。ヒルタウン店に新規2名を採用したところです。私は今週そちらの店に行かないので、お二人の助けが必要になります。',
  },
  {
    sender: 'Jack Plebani',
    time: '午前11時34分',
    text: '新規雇用者はいつ仕事を始めるのですか。',
  },
  {
    sender: 'Charu Aiyar',
    time: '午前11時35分',
    text: 'そのうちの一名のJames Hesneyは明日から働けます。もう一名のLuke Pfaffは金曜日に始めます。',
  },
  {
    sender: 'Marcia Berk',
    time: '午前11時35分',
    text: '大変結構ですね。',
  },
  {
    sender: 'Charu Aiyar',
    time: '午前11時36分',
    text: '配達の合間に彼らにレストランで業務を与えることはできますか。彼らのシフトは、水曜日から日曜日の正午から午後8時か9時までなので、暇な時間もあるでしょう。',
  },
  {
    sender: 'Marcia Berk',
    time: '午前11時36分',
    text: 'ピザの箱を折ることができるでしょう。私は夕食の繁忙時間帯の前に全ての箱を用意しておきたいのです。',
  },
  {
    sender: 'Jack Plebani',
    time: '午前11時37分',
    text: 'それに、電話注文を受けたり、ごみを出したりもできます。',
  },
  {
    sender: 'Charu Aiyar',
    time: '午前11時37分',
    text: '私は一日を通してキッチンの床を掃除してくれるよう頼みます。Jackは、明日Jamesの研修を始めてもらえますか。Marciaは、金曜日にLukeの研修を始めてもらえますか。',
  },
  {
    sender: 'Jack Plebani',
    time: '午前11時38分',
    text: '分かりました。それから、彼らを基本的な食品取扱免許コースに受講登録させましょう。あの資格があれば、必要なときにソースや生地を作ることができます。これで、私がサラダやパスタ料理をこしらえる時間がもっと増えるでしょうから。',
  },
  {
    sender: 'Marcia Berk',
    time: '午前11時39分',
    text: '私は一日休暇を取ることになっていまして。',
  },
  {
    sender: 'Charu Aiyar',
    time: '午前11時40分',
    text: 'ああ、そうでした。忘れていました。',
  },
  {
    sender: 'Jack Plebani',
    time: '午前11時40分',
    text: 'では、私がやります。問題ないですよ。',
  },
];

const tr03An3Q1 = {
  id: 'tr_03_an3_q1',
  promptEn: 'What will most likely happen tomorrow?',
  promptJa: '明日何が起こると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Vacation requests will be reviewed.',
      textJa: '休暇申請が審査される。',
    },
    {
      id: 'b',
      textEn: 'A training program will begin.',
      textJa: '研修プログラムが始まる。',
    },
    {
      id: 'c',
      textEn: 'A shipment of unfolded pizza boxes will arrive.',
      textJa: '折られていないピザの箱の発送品が届く。',
    },
    {
      id: 'd',
      textEn: 'Some servers will learn how to make pizza sauce.',
      textJa: '何人かの給仕人がピザソースの作り方を学ぶ。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `Aiyarさんは③で、新規採用者のJames Hesneyが明日から働けると述べ、⑧でJack Plebaniさんに、明日Jamesの研修を始めてもらえるかと頼んでいる。これに対してPlebaniさんは⑨で快諾しており、明日、新規採用者の研修が始まると分かるので、（B）が正解。
（A）⑩より、Marcia Berkさんが金曜日に休暇取得予定だと分かるが、休暇申請の審査への言及はない。request「申請」、review「～を審査する」。
（C）⑥で、配達の合間の仕事としてピザの箱を折ることに言及しているのみ。shipment「発送品」、unfolded「折られていない」。
（D）⑨で、資格があればできる作業としてソース作りが挙げられているのみ。server「給仕人」。`,
  metacogFeedbackJa: `**「most likely（起こりそう）」は“時間で範囲固定→確定サイン（依頼→承諾）”だけ拾う**
- **見分け方：本文に「明日」＋「やると決まった」が同時に書かれている行為を選ぶ**


1. 設問の時間を先に固定する：「明日」に起こること“だけ”を探す（他の日・一般論は一旦捨てる）。
2. 本文から「明日」を含む発言を拾い、同じ話題（開始日／研修など）に収束しているか確認する。
3. **確定サイン**を探す：依頼（〜してくれる？）→承諾（いいよ／任せて）のペアは「実行が決定」。
4. 選択肢を機械的に判定する：**明日**に紐づく／**確定**している／**行為の中身が一致**の3つが全部そろうものだけ残す。
5. ひっかけの切り捨て：**「〜できるようになる」「〜なら可能」など条件付き・将来の話**は、明日起こる出来事ではないので除外する（語が似ていても不採用）。

✅ 自分の選択肢を本文の1文に戻して、「明日」かつ「実行確定」と言い切れる？（言い切れないなら外す）`,
};

const tr03An3Q2 = {
  id: 'tr_03_an3_q2',
  promptEn:
    'At 11:39 A.M., what does Ms. Berk most likely mean when she writes, "I\'ve got a planned day off"?',
  promptJa:
    '午前11時39分に、"I\'ve got a planned day off"という発言で、Berkさんは何を意図していると考えられますか。',
  quotedTextEn: "I've got a planned day off.",
  quotedTextJa: '私は一日休暇を取ることになっていまして。',
  choices: [
    {
      id: 'a',
      textEn: 'She forgot to tell Ms. Aiyar about her schedule.',
      textJa: 'Aiyarさんに自分の予定を伝えるのを忘れた。',
    },
    {
      id: 'b',
      textEn: 'She has not taken a vacation day in a long time.',
      textJa: '長い間休暇を取っていない。',
    },
    {
      id: 'c',
      textEn: 'She cannot train anyone on Friday.',
      textJa: '金曜日は誰にも研修をすることができない。',
    },
    {
      id: 'd',
      textEn: 'She will find someone else to make dough on Friday.',
      textJa: '金曜日に生地を作る他の人を探す。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `Ms. BerkはMarcia Berkさんのこと。Aiyarさんは⑧でBerkさんに、金曜日に新規採用者のLukeの研修を始めてもらえるかと頼んでいるが、Berkさんは⑩の下線部の発言で、「私は一日休暇を取ることになっている」と応答している。それを受けたAiyarさんが⑪で、そのことを失念していたと述べると、同僚のPlebaniさんが⑫で、研修を代行することを申し出ている。以上から、Berkさんは下線部の発言で、金曜日は終日休暇中のため、自分は研修が行えないということを伝えていると判断できる。よって、（C）が正解。
（A）Aiyarさんの⑪の「忘れていた」という発言から、Berkさんは事前に休暇予定をAiyarさんに伝えていたと考えられる。
（B）Berkさんが長い間休暇を取っていないことを示す言及はない。
（D）直前のPlebaniさんの発言で、資格があればできる作業として生地作りに言及があるだけで、Berkさんがこの時点で生地を作る人を探すことを意図しているとは考えられない。`,
  metacogFeedbackJa: `**「most likely mean」は“直前の依頼に対する返答”として読み、直後の反応（忘れてた・代わりにやる）で意味を確定する。**


1. 設問の時刻の発言を特定し、**直前に何を頼まれているか**（依頼・指示・提案）を1つ前後で確認する。
2. その発言をまず「情報」ではなく**制約・断りのサイン**として解釈する（予定がある＝その日は対応不可、の型が多い）。
3. 直後の流れで検証する：**謝罪／失念／担当変更／代行の申し出**が出たら、「できない」が確定。
4. 選択肢は、**“できない内容”のスコープ**を直前の依頼に一致させて選ぶ。
   - ひっかけ典型：休みの話を「休暇の頻度・長さ」や「別作業の手配」に拡大解釈する → **会話の直前テーマ（依頼）に戻して切り捨てる**。

✅ 自分の解釈は、「忘れていた」→「代わりにやる」という流れ（＝代行が必要）を自然に説明できているか？`,
};

const tr03Analog3 = {
  id: 'tr_03_an3',
  title: 'Online Chat Discussion - Hilltown Restaurant',
  direction: 'Questions 1-2 refer to the following online chat discussion.',
  directionJa: '問題1-2は次のオンラインチャットの話し合いに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'en' as const,
      onlineChatDiscussion: {
        messages: tr03An3MessagesEn,
      },
    },
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'ja' as const,
      onlineChatDiscussion: {
        messages: tr03An3MessagesJa,
      },
    },
  ],
  questions: [tr03An3Q1, tr03An3Q2],
};

const tr03Analogs = [tr03Analog1, tr03Analog2, tr03Analog3];

export const mockTrainingPassages: Passage[] = [
  {
    ...basePassage,
    analogs,
  },
  {
    ...tr02Passage,
    analogs: tr02Analogs,
  },
  {
    ...tr03Passage,
    analogs: tr03Analogs,
  },
];

// ===== Pre-Test 問題1: Online Chat Discussion (Paycheck) =====

const pre01MessagesEn = [
  {
    sender: 'Rex Martinez',
    time: '10:16 A.M.',
    text: 'Hello, Tzu-Tsu. Could you please assist me with regard to my paycheck?',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '10:18 A.M.',
    text: 'Of course. Was it scheduled to arrive before today?',
  },
  {
    sender: 'Rex Martinez',
    time: '10:19 A.M.',
    text: 'It was supposed to—yes.',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '10:20 A.M.',
    text: 'Let me check to make sure that all of your paperwork is on file.',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '10:33 A.M.',
    text: 'The Employee Agreement was not signed by the director until yesterday \neven though you filled it out last week. The payment was sent out this\nmorning and you should receive it tomorrow.',
  },
  {
    sender: 'Rex Martinez',
    time: '10:34 A.M.',
    text: 'OK. Thank you very much for your help.',
  },
];

const pre01MessagesJa = [
  {
    sender: 'Rex Martinez',
    time: '午前10時16分',
    text: 'こんにちは、Tzu-Tsuさん。私の給与支払小切手のことで助けていただけますか。',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '午前10時18分',
    text: 'もちろんです。それは今日より前に届く予定だったのですか。',
  },
  {
    sender: 'Rex Martinez',
    time: '午前10時19分',
    text: 'そのはずでした一はい。',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '午前10時20分',
    text: 'あなたの事務書類が全てファイルに保管されているか確認させてください。',
  },
  {
    sender: 'Tzu-Tsu Yeh',
    time: '午前10時33分',
    text: '従業員契約書が昨日になってようやく部長に署名されたのですよ、あなたは先週それを記入していたのに。支払いは今朝発送されたので、あなたは明日それを受け取るはずです。',
  },
  {
    sender: 'Rex Martinez',
    time: '午前10時34分',
    text: '分かりました。助けていただいてどうもありがとうございました。',
  },
];

const pre01Q1 = {
  id: 'pre_01_q1',
  promptEn:
    'At 10:19 A.M., what does Mr. Martinez most likely mean when he writes, "It was supposed to"?',
  promptJa:
    '午前10時19分に、Martinezさんは"lt was supposed to"という発言で、何を意味していると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'His paperwork should have been completed sooner.',
      textJa: '彼の事務書類はもっと早く記入完了されるべきだった。',
    },
    {
      id: 'b',
      textEn: 'He received a different amount of money than he agreed to.',
      textJa: '彼は同意していたものとは異なる額のお金を受け取った。',
    },
    {
      id: 'c',
      textEn: 'His bank account should have been set up last week.',
      textJa: '彼の銀行口座は先週に開設されているはずだった。',
    },
    {
      id: 'd',
      textEn: 'He expected to have already received a payment.',
      textJa: '彼はすでに支払いを受け取っている予定であった。',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa: `①の給与支払小切手のことで助けてほしいという Marinezさんからの依頼に対し、Yehさんは②で快諾し、続けてWas it scheduled to arrive before today？「それは今日より前に届く予定だったのか」と尋ねている。それに対し Martinezさんは下線部の発言をした後、yesと肯定している。itはその前の①で述べられているmy paycheck「私の給与支払小切手」を指しているので、Marinezさんは、自分が給与支払小切手をもっと前に受け取る予定だったと伝えていると考えられる。expect to do「～する予定である、～する見込みである」。
（A） 事務書類への言及は下線部の発言の後なので、不適切。complete「～に全て記入する」。
（B） agree to〜「～に同意する」。
（C） bank account「銀行口座」に関する言及はない。set up～「～を開設する」。`,
  metacogFeedbackJa: '',
};

const pre01Q2 = {
  id: 'pre_01_q2',
  promptEn: 'In what department does Ms. Yeh most likely work?',
  promptJa: 'Yehさんはどんな部署で働いていると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Sales',
      textJa: '営業部',
    },
    {
      id: 'b',
      textEn: 'Advertising',
      textJa: '宣伝部',
    },
    {
      id: 'c',
      textEn: 'Payroll',
      textJa: '給与部',
    },
    {
      id: 'd',
      textEn: 'Customer Relations',
      textJa: '顧客窓口',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `Yehさんは、Martinezさんが給与支払小切手のことで手助けを求めたのに対し②で快諾し、④で事務書類の保管状況を確認すると申し出ている。さらに⑤で、従業員契約書が昨日ようやく部長に署名された、と給与支払いの遅延理由を説明し、「支払いは今朝発送されたので、あなたは明日それを受け取るはずだ」と、Martinezさんが給与支払い小切手を受け取る予定日を伝えている。よって、Yehさんは給与支払いを担当する部署で働いていると考えられる。payroll「給与支払業務」。
（B） advertising「広告すること、広告」。
（D） customer relations「顧客窓口」。`,
  metacogFeedbackJa: '',
};

const pre01Passage: Passage = {
  id: 'pre_01',
  title: 'Online Chat Discussion - Paycheck',
  direction: 'Questions 1-2 refer to the following online chat discussion.',
  directionJa: '問題1-2は次のオンラインチャットの話し合いに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'en' as const,
      onlineChatDiscussion: {
        messages: pre01MessagesEn,
      },
    },
    {
      layoutType: 'onlineChatDiscussion' as const,
      locale: 'ja' as const,
      onlineChatDiscussion: {
        messages: pre01MessagesJa,
      },
    },
  ],
  questions: [pre01Q1, pre01Q2],
};

// ===== Pre-Test 問題2: E-mail (Business Cards) =====

const pre02EmailEn = {
  headers: [
    { label: 'To:', value: 'All sales representatives' },
    { label: 'From:', value: 'Pooja Mitra' },
    { label: 'Date:', value: 'November 6' },
    { label: 'Subject:', value: 'New business cards' },
  ],
  body: [
    'Hello,',
    'We need to replace all the business cards used by our sales representatives. Normally we only replace them at the end of the fiscal year, but we have adopted a new corporate logo after our recent merger with Central Fabrication Ltd. — [1] —.',
    'Please check your current cards to see if any updates are needed in your office location, official title, or other information. — [2] —. If so, please e-mail Ms. Fujita in the graphic design department and let her know what additional updates are needed. — [3] —.',
    'Be sure to contact Ms. Fujita no later than Friday, November 10. — [4] —.',
    'Pooja Mitra\nSales Manager, Custom Blinds',
  ],
  showScrollbar: true,
};

const pre02EmailJa = {
  headers: [
    { label: '受信者：', value: '営業担当者各位' },
    { label: '送信者：', value: 'Pooja Mitra' },
    { label: '日付：', value: '11月6日' },
    { label: '件名：', value: '新しい名刺' },
  ],
  body: [
    'お疲れさまです。',
    '当社では営業担当者が使用している名刺を全て取り換える必要があります。通常、当社は会計年度末にのみ取り換えを行うのですが、先頃のCentral製造株式会社との合併後、新しい企業ロゴを採用しました。— [1] —',
    'ご自分の事務所所在地、正式な肩書、その他の情報について更新が必要かどうか、現在の名刺を確かめてください。— [2] —。もし必要ならば、グラフィックデザイン部のFujitaさんにEメールを送り、どんな追加の更新が必要かを彼女に知らせてください。— [3] —。',
    '11月10日金曜日までに、必ずFujitaさんにご連絡ください。— [4] —。',
    'Pooja Mitra\nCustom ブラインド社　営業部長',
  ],
  showScrollbar: true,
};

const pre02Q1 = {
  id: 'pre_02_q1',
  promptEn: 'What does Ms. Mitra ask the sales representatives to do by November 10?',
  promptJa: 'Mitraさんは営業担当者に11月10日までに何をするように求めていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Report their most recent sales figures',
      textJa: '最新の売上高を報告する',
    },
    {
      id: 'b',
      textEn: 'Return their current business cards to the graphic design department',
      textJa: '現在の名刺をグラフィックデザイン部に返却する',
    },
    {
      id: 'c',
      textEn: 'Tell Ms. Fujita about any required changes to their cards',
      textJa: 'Fujitaさんに名刺に必要な変更について伝える',
    },
    {
      id: 'd',
      textEn: 'Arrange a personal meeting with Ms. Fujita',
      textJa: 'Fujitaさんとの個人面談を取り決める',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    'MitraさんとはEメールの送信者で、最後の署名から営業部長と分かる。受信者は営業担当者全員。11月10日という日付については③に、「11月10日金曜日までに、必ずFujitaさんに連絡してください」とある。Fujitaさんとは②2～3行目より、グラフィックデザイン部の担当者で、同1～3行目で、情報更新の必要性の有無を確かめて、必要ならFujitaさんに追加更新について知らせるように指示が出されている。この内容を、any required changes「必要な変更」を用いて表している（C）が正解。\n（A） sales figures「売上高」については言及がない。\n（B） 現在の名刺を返却するという記述はない。\n（D） ③で、Fujitaさんに連絡するよう指示されているが、個人面談の手配は話題に上っていない。arrange「～を取り決める」。',
  metacogFeedbackJa: '',
};

const pre02Q2 = {
  id: 'pre_02_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Therefore, we will begin printing new cards next Monday."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「そのため、来週月曜日に新しい名刺の印刷を開始する予定です」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '[1]' },
    { id: 'b', textEn: '[2]', textJa: '[2]' },
    { id: 'c', textEn: '[3]', textJa: '[3]' },
    { id: 'd', textEn: '[4]', textJa: '[4]' },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '挿入文は、来週月曜日に新しい名刺の印刷を開始するという予定を述べたもの。前の文から結果や結論を導く際に使われるTherefore「それゆえに、そのため」で始まっているので、新しい名刺を印刷する理由を述べる内容に続くと考えられる。①1行目で、営業担当者の名刺の取り換えの必要性を伝えており、続く同1～3行目では、通常は会計年度末に行うが、最近の合併で新しい企業ロゴを採用したと述べている。この直後の（A）［1］に挿入文を入れると、新しい企業ロゴを採用した結果、来週に新しい名刺の印刷を開始する、という自然な流れになる。',
  metacogFeedbackJa: '',
};

const pre02Passage: Passage = {
  id: 'pre_02',
  title: 'E-mail - Business Cards',
  direction: 'Questions 1-2 refer to the following e-mail.',
  directionJa: '問題1-2は次のEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: pre02EmailEn,
    },
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: pre02EmailJa,
    },
  ],
  questions: [pre02Q1, pre02Q2],
};

// ===== Pre-Test 問題3: Customer Reviews (Online Design Business) =====

const pre03ReviewsEn = {
  navItems: ['Home', 'Products', 'Reviews', 'Contact Us'],
  activeNav: 'Reviews',
  reviews: [
    {
      name: 'Adrianna Rossi',
      rating: 5,
      text: 'Mr. Prescott runs a top-notch online business. I have never worked with a designer this talented before. I was able to give a very specific description of what I wanted and my expectations were exceeded. I could have never imagined my wedding invitations turning out so beautiful! A friend needs new brochures for her business, and I will definitely refer her to this shop. Thanks!',
    },
    {
      name: 'Prisha Deol',
      rating: 2,
      text: 'I am not pleased with my recent order. I had bought birthday party invitations previously from this store and was satisfied. This time, I ordered customized programs for my piano recital. I loved the proof that I was sent, but these do not look like the proof at all. The printing looks grainy and cheap. Also, the programs have a white mark at the top on the front and the back. It just does not look very professional.',
    },
    {
      name: 'Isak Larsson',
      rating: 5,
      text: 'The owner was fast to respond to my questions before I had even purchased anything. My business cards were designed in days and arrived quickly, even with international shipping to Sweden. They were exactly how I wanted them, even though I gave the designer only a few details and asked whether they could be completed in a hurry. This was a great experience.',
    },
  ],
};

const pre03ReviewsJa = {
  navItems: ['ホーム', '製品', 'レビュー', 'お問い合わせ'],
  activeNav: 'レビュー',
  reviews: [
    {
      name: 'Adrianna Rossi',
      rating: 5,
      text: 'Prescottさんは最高のオンラインの事業を運営しています。私は、これほど才能のあるデザイナーの方にお仕事していただいたことは、これまで一度もありません。私は希望していたことを非常に具体的に説明させてもらうことができました、そして、私の期待を上回るものになりました。私は自分の結婚式の招待状がこんなに美しいものになるとは全く想像していませんでした！友人が自分の事業のために新しいパンフレットを必要としているので、私は断然、彼女にこの店を紹介します。ありがとうございました！',
    },
    {
      name: 'Prisha Deol',
      rating: 2,
      text: '私は最近の注文品には満足していません。私は以前この店で誕生日パーティーの招待状を購入したことがあり、満足でした。今回、自分のピアノリサイタル用に特注プログラムを注文しました。私は送られてきた校正刷りをとても気に入ったのですが、今回のものは、校正刷りと同じようには全く見えません。印刷は粗くて安っぽく見えます。また、プログラムの表と裏の上部に白い染みがあります。プロの仕上がりにはとても見えません。',
    },
    {
      name: 'Isak Larsson',
      rating: 5,
      text: 'まだ何かを購入する前でさえ、私の質問への店主の返答は迅速でした。私の名刺は数日でデザインされ、スウェーデンへの国際配送にもかかわらず早々に到着しました。私はデザイナーの方にほんのわずかな詳細しかお伝えせず、急いで仕上げられるかどうか尋ねたのですが、それらはまさに私が希望した通りの出来でした。これは素晴らしい経験でした。',
    },
  ],
};

const pre03Q1 = {
  id: 'pre_03_q1',
  promptEn: 'What type of service does the business most likely provide?',
  promptJa: 'この店はどんな種類のサービスを提供していると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Home decorating',
      textJa: '住宅の装飾',
    },
    {
      id: 'b',
      textEn: 'Event planning',
      textJa: 'イベントの企画',
    },
    {
      id: 'c',
      textEn: 'Custom printing',
      textJa: '特注の印刷',
    },
    {
      id: 'd',
      textEn: 'Fashion accessorizing',
      textJa: 'ファッション小物使い',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '①で、Rossiさんがこの店で結婚式の招待状を作成したこと、そして個人事業用のパンフレットを必要とする友人に同店を紹介することが述べられている。②では、Deolさんが過去に同店で誕生日パーティーの招待状を購入したこと、今回は自分のピアノリサイタル用の特注プログラムを注文したことが述べられており、③では、Larssonさんが名刺を注文したことが分かる。よって、この店が提供しているサービスは特注の印刷と考えられる。\n（D） accessorize「〜にアクセサリーを付ける」。',
  metacogFeedbackJa: '',
};

const pre03Q2 = {
  id: 'pre_03_q2',
  promptEn: 'What does Ms. Rossi indicate about her items?',
  promptJa: 'Rossiさんは自分の品物について何を示していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'They were made according to her instructions.',
      textJa: 'それらは彼女の指示に従って作られた。',
    },
    {
      id: 'b',
      textEn: 'They were shipped to another country.',
      textJa: 'それらは別の国へ配送された。',
    },
    {
      id: 'c',
      textEn: 'They were constructed with inexpensive materials.',
      textJa: 'それらは安価な材料で組み立てられた。',
    },
    {
      id: 'd',
      textEn: 'They were not the correct color.',
      textJa: 'それらは正しい色ではなかった。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '①3～4行目で、Rossiさんは注文した結婚式の招待状について、I was able to give a very specific description of what I wanted and my expectations were exceeded.「私は希望していたことを非常に具体的に説明させてもらうことができた、そして、私の期待を上回るものになった」と述べているので（A）が正解。according to 〜「〜に従って」、instructions「指示」。\n（B）③より、外国への配送について言及しているのはRossiさんではなくLarssonさん。\n（C）（D）材料や色についての言及はない。（C） construct「～を組み立てる」、inexpensive「安価な」。',
  metacogFeedbackJa: '',
};

const pre03Q3 = {
  id: 'pre_03_q3',
  promptEn: 'What does Mr. Larsson discuss in his review?',
  promptJa: 'Larssonさんはレビューで何について述べていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'The instructions for placing an order',
      textJa: '注文するための説明',
    },
    {
      id: 'b',
      textEn: 'The variety of product choices',
      textJa: '製品の選択肢の多様性',
    },
    {
      id: 'c',
      textEn: 'The efficiency of the business',
      textJa: 'その店の手際の良さ',
    },
    {
      id: 'd',
      textEn: 'The weight of the merchandise',
      textJa: '商品の重量',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    'Larssonさんは③で、名刺を注文した際の店の対応について評価を述べている。同2行目で、商品の購入前でも店主が迅速に質問に回答してくれたこと、続く同2～4行目で、国際配送という状況でも商品到着が早かったこと、同4～5行目で、詳細のわずかな説明と至急の納品であっても、希望通りの出来だったことを述べている。よって、Larssonさんはレビューで、店の手際が良かったことを説明していると言えるので、（C）が正解。discuss「〜について論じる」。efficiency「（仕事上の）手際の良さ、効率の良さ」。\n（A） instructions「説明」、place an order「注文する」。\n（B） variety「多様性」。\n（D） weight「重量」、merchandise「商品」。',
  metacogFeedbackJa: '',
};

const pre03Passage: Passage = {
  id: 'pre_03',
  title: 'Customer Reviews - Online Design Business',
  direction: 'Questions 1-3 refer to the following customer reviews.',
  directionJa: '問題1-3は次の顧客レビューに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'customerReviews' as const,
      locale: 'en' as const,
      customerReviews: pre03ReviewsEn,
    },
    {
      layoutType: 'customerReviews' as const,
      locale: 'ja' as const,
      customerReviews: pre03ReviewsJa,
    },
  ],
  questions: [pre03Q1, pre03Q2, pre03Q3],
};

// ===== Pre-Test 問題4: Text-Message Chain (Weekly Meeting) =====

const pre04MessagesEn = [
  {
    sender: 'Linda Farr',
    time: '8:48 A.M.',
    text: "Megumi and Ricardo, I suggest going to Sofia's Place for our weekly meeting instead of gathering here in our usual conference room. The three of us could easily report on progress made on the Humbert project over lunch. Thoughts?",
  },
  {
    sender: 'Megumi Sugiyama',
    time: '8:50 A.M.',
    text: 'I could use a break from the office.',
  },
  {
    sender: 'Ricardo Thompson',
    time: '8:51 A.M.',
    text: 'Alright by me. But what about staying close by and going to Crab Bay Café?',
  },
  {
    sender: 'Linda Farr',
    time: '8:52 A.M.',
    text: "It's closer, but there's usually a wait because seating is limited. I don't want to go over an hour. Plus, I love the salads at Sofia's.",
  },
  {
    sender: 'Ricardo Thompson',
    time: '8:53 A.M.',
    text: "True. They're great.",
  },
  {
    sender: 'Megumi Sugiyama',
    time: '8:55 A.M.',
    text: "Sofia's it is then! But could we change the time? I find our usual meeting time a bit early for lunch.",
  },
  {
    sender: 'Linda Farr',
    time: '8:56 A.M.',
    text: "Yes, 11:00 is a bit early for lunch, isn't it? OK, what time works best? 11:30? 12:00?",
  },
  {
    sender: 'Ricardo Thompson',
    time: '8:57 A.M.',
    text: 'Hmmm. How about 12:30?',
  },
  {
    sender: 'Megumi Sugiyama',
    time: '8:58 A.M.',
    text: 'Perfect!',
  },
  {
    sender: 'Linda Farr',
    time: '8:59 A.M.',
    text: 'Sounds good. See you then!',
  },
];

const pre04MessagesJa = [
  {
    sender: 'Linda Farr',
    time: '午前8時48分',
    text: "Megumi、そしてRicardo、毎週の定例ミーティングで、ここのいつもの会議室に集まるのではなくSofia's Placeに行くのはどうかしら。私たち3人で、昼食を取りながらHumbertプロジェクトの進捗について気楽に伝えられるし。どう思う？",
  },
  {
    sender: 'Megumi Sugiyama',
    time: '午前8時50分',
    text: '私はオフィスから離れて一息つけるとありがたいわ。',
  },
  {
    sender: 'Ricardo Thompson',
    time: '午前8時51分',
    text: '僕は構わないよ。でも、近場にとどまって、Crab Bayカフェに行くのはどうかな？',
  },
  {
    sender: 'Linda Farr',
    time: '午前8時52分',
    text: "そこはもっと近いけれど、席数が限られているから、たいてい待ち時間があるのよ。私は1時間以上かけたくないわ。それに、私はSofia'sのサラダが大好きなの。",
  },
  {
    sender: 'Ricardo Thompson',
    time: '午前8時53分',
    text: '確かに。あれはすごくおいしいよね。',
  },
  {
    sender: 'Megumi Sugiyama',
    time: '午前8時55分',
    text: "では、Sofia'sに決まりね！ただ、時間を変更できるかしら？いつものミーティングの時間は昼食には少し早いと思うの。",
  },
  {
    sender: 'Linda Farr',
    time: '午前8時56分',
    text: 'そうね、11時は昼食には少し早いわね。それなら、何時が一番都合がいいかしら？11時30分？12時？',
  },
  {
    sender: 'Ricardo Thompson',
    time: '午前8時57分',
    text: 'うーん。12時30分はどう？',
  },
  {
    sender: 'Megumi Sugiyama',
    time: '午前8時58分',
    text: '完璧！',
  },
  {
    sender: 'Linda Farr',
    time: '午前8時59分',
    text: 'いいわね。そのときに会いましょう！',
  },
];

const pre04Q1 = {
  id: 'pre_04_q1',
  promptEn:
    'At 8:50 A.M., what does Ms. Sugiyama mean when she writes, "I could use a break from the office"?',
  promptJa:
    '午前8時50分に、Sugiyamaさんは"I could use a break from the office"という発言で、何を意味していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She approves of meeting elsewhere.',
      textJa: '彼女は他の場所で会合することに賛成している。',
    },
    {
      id: 'b',
      textEn: 'She wants to ask for time off from work.',
      textJa: '彼女は仕事を休むことを願い出たいと思っている。',
    },
    {
      id: 'c',
      textEn: 'She is looking forward to her vacation.',
      textJa: '彼女は自分の休暇を楽しみにしている。',
    },
    {
      id: 'd',
      textEn: 'She is happy to run an errand for Ms. Farr.',
      textJa: '彼女は喜んでFarrさんのために用事をする。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    "Farrさんは①で、今度のミーティングをいつも利用している社内の会議室ではなくSofia's Placeという飲食店で行うことを提案し、他の2人にどう思うかと意見を求めている。それに対し、Sugiyamaさんは下線部で「私はオフィスから離れて一息つけるとありがたい」と答えているので、他の場所でミーティングを行うことに賛成していると考えられる。よって、（A）が正解。approve of ～「～に賛成する」、meet「会合する」、elsewhere「他の場所で」。\n（B） ask for〜「～を求める」、time off from～「～を休むこと」。\n（D） be happy to do「喜んで〜する」、run an errand for~「〜の使い走りをする」。",
  metacogFeedbackJa: '',
};

const pre04Passage: Passage = {
  id: 'pre_04',
  title: 'Text-Message Chain - Weekly Meeting',
  direction: 'Question 1 refers to the following text-message chain.',
  directionJa: '問題1は次のテキストメッセージのやりとりに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'chatTablet' as const,
      locale: 'en' as const,
      chatTablet: {
        messages: pre04MessagesEn,
      },
    },
    {
      layoutType: 'chatTablet' as const,
      locale: 'ja' as const,
      chatTablet: {
        messages: pre04MessagesJa,
      },
    },
  ],
  questions: [pre04Q1],
};

// ===== Pre-Test 問題5: Article (Mini-Museums) =====

const pre05ArticleEn = {
  headline: 'Mini-Museums on the Rise',
  byline: 'By Erika Eaton',
  body: [
    'JACKSON (January 4)—Known for its large collection of culturally significant artifacts, the Haywood Museum is partnering with several municipalities throughout the Haywood Mountain region to open satellite locations. — [1] —. The first 5,000-square-meter "mini-museum" is set to open this May in Jackson. According to Haywood Museum Director Thaddeus Lopez, three more mini-museums are planned. — [2] —.',
    "Speaking at Tuesday's groundbreaking ceremony in Jackson, Lopez said the mini-museums are part of the Haywood Museum's broader goal to enhance the public's appreciation of local history. — [3] —. \"Our exhibits and programming seek to honor our ancestors in ways that are authentic and interactive,\" Lopez told about 40 onlookers, including Jackson Mayor Max Wu.",
    "In addition to building mini-museums, the Haywood Museum has hired Mollie Finley of Merriweather University to record, analyze, and organize oral histories of longtime members of the Haywood community. — [4] —. To nominate someone to share their story for Ms. Finley's project, please visit www.haywoodmuseum.org.",
  ],
  singleColumn: true,
};

const pre05ArticleJa = {
  headline: '増えるミニ博物館',
  byline: 'Erika Eaton 記',
  body: [
    'ジャクソン（1月4日）—文化的に重要な工芸品の大規模なコレクションで知られるHaywood博物館は、Haywood Mountain地域の幾つかの地方自治体と提携してサテライト館を幾つかオープンする。— [1] —。一番手となる5,000平方メートルの「ミニ博物館」がこの5月、ジャクソンにオープンする予定だ。Haywood博物館のThaddeus Lopez館長によると、さらに3つのミニ博物館が計画されている。— [2] —。',
    '火曜日にジャクソンで行われた起工式で演説したLopezは、ミニ博物館は、郷土史に対する一般市民の理解を向上させるという、Haywood博物館のより大きな目標の一環だと述べた。— [3] —。「当館の展示物やプログラム制作は、真正かつ双方向的な方法でわれわれの祖先に敬意を表すことを目指しています」と、LopezはジャクソンのMax Wu市長をはじめとする約40人の見物人に語った。',
    'ミニ博物館の建設に加えて、Haywood博物館は、Haywood地域の長年の住民の口述歴史を録音、分析、整理するために、Merriweather大学のMollie Finleyを雇用した。— [4] —。Finley氏のプロジェクトのために体験を語ってくれる人物を推薦するにはwww.haywoodmuseum.orgにアクセスしてほしい。',
  ],
  singleColumn: true,
};

const pre05Q1 = {
  id: 'pre_05_q1',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The recordings will be converted into virtual reality experiences for visitors to enjoy."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「録音は、来場者が楽しめるバーチャルリアリティー体験に作り変えられる予定である」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '［1］' },
    { id: 'b', textEn: '[2]', textJa: '［2］' },
    { id: 'c', textEn: '[3]', textJa: '［3］' },
    { id: 'd', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '挿入文は、録音がバーチャルリアリティー体験に変換されるということを述べたもの。主語のThe recordings「その録音（物）」に着目する。③1～5行目で、住民の口述歴史を録音、分析、整理するために、Finleyさんが雇用されたことが述べられている。この直後の（D）［4］に挿入文を入れると、口述歴史を録音したものは来場者が楽しめるバーチャルリアリティー体験に変換される、という自然な流れになる。convert～into...「〜を…に変換する」、virtual reality「仮想現実」。\n（A）（B）（C）いずれも挿入文の主語のThe recordingsが何を指すのかが不明確となり、適切ではない。',
  metacogFeedbackJa: '',
};

const pre05Passage: Passage = {
  id: 'pre_05',
  title: 'Article - Mini-Museums',
  direction: 'Question 1 refers to the following article.',
  directionJa: '問題1は次の記事に関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'article' as const,
      locale: 'en' as const,
      article: pre05ArticleEn,
    },
    {
      layoutType: 'article' as const,
      locale: 'ja' as const,
      article: pre05ArticleJa,
    },
  ],
  questions: [pre05Q1],
};

// ===== Pre-Test 問題6: E-mail and Certificate (Arborlee International) =====

const pre06Q1 = {
  id: 'pre_06_q1',
  promptEn: 'What is the purpose of the e-mail?',
  promptJa: 'Eメールの目的は何ですか。',
  choices: [
    { id: 'a', textEn: 'To announce a business acquisition', textJa: '事業の買収を発表すること' },
    {
      id: 'b',
      textEn: 'To inform employees of a charitable giving option',
      textJa: '従業員に慈善事業への寄付の一つの選択肢を知らせること',
    },
    {
      id: 'c',
      textEn: "To recognize an employee's community service",
      textJa: '従業員の地域社会への奉仕活動を評価すること',
    },
    {
      id: 'd',
      textEn: 'To encourage organizations to conserve resources',
      textJa: '団体に資源を保護するよう奨励すること',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '1つ目の本文のEメールは、Vernment社の寄付月間委員会が全従業員宛てに送信したもの。同①1～2行目で、I would like to draw your attention to one more charity to consider.「検討すべきもう一つの慈善団体に皆さんの注目を集めたいと思う」と述べ、同②では、森林再生活動に尽力しているArborlee Internationalという団体について詳しく紹介している。よって、寄付先の選択肢として同団体をVernment社の従業員に知らせることがEメールの目的だと考えられるので、（B）が正解。inform〜of…「～に・・・を知らせる」、charitable giving「慈善事業への寄付」、option「選択肢」。\n（A） announce「～を発表する」、acquisition「買収、取得」。\n（C） recognize「〜を評価する、～を認める」、community service「地域社会への奉仕活動」。\n（D） encourage～to do「〜に・するよう奨励する」、conserve「～を保護する」、resource「資源」',
  metacogFeedbackJa: '',
};

const pre06Q2 = {
  id: 'pre_06_q2',
  promptEn: 'According to the e-mail, who will plant trees?',
  promptJa: 'Eメールによると、誰が木を植えますか。',
  choices: [
    { id: 'a', textEn: 'People living in deforested areas', textJa: '森林伐採地域に暮らす人々' },
    { id: 'b', textEn: 'Representatives from government agencies', textJa: '政府機関の代表者' },
    { id: 'c', textEn: 'The Month of Giving committee', textJa: '寄付月間委員会' },
    { id: 'd', textEn: 'Volunteers from Vernment, Inc.', textJa: 'Vernment社のボランティア' },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '1つ目の本文の②1～2行目に、Arborlee Internationalという団体が森林再生が必要な場所で若木を根付かせるために世界各地の地域社会と共に尽力していることに言及があり、同3〜4行目に、Local citizens are hired and taught the skills required to plant the trees and to care for them「地元住民が雇用され、木を植えてそれらを手入れするのに必要な技術を教わっている」とある。よって、木を植えるのは、森林再生が必要な地域に暮らす地元住民と分かるので、（A）が正解。deforest「〜の森林を伐採する」。\n（B） representative「代表者」、government「政府」、agency「機関」。',
  metacogFeedbackJa: '',
};

const pre06Q3 = {
  id: 'pre_06_q3',
  promptEn: 'What is the purpose of planting the trees?',
  promptJa: '木を植える目的は何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To provide inexpensive building materials',
      textJa: '安価な建築資材を提供すること',
    },
    { id: 'b', textEn: 'To increase incomes in an area', textJa: '地域の収入を増やすこと' },
    { id: 'c', textEn: 'To improve the environment', textJa: '環境を改善すること' },
    { id: 'd', textEn: 'To beautify a city', textJa: '都市を美化すること' },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '1つ目の本文の②1～2行目に、Arborlee Internationalは森林再生が必要な場所で植林のために各地の地域社会と連携しているとあり、同4～6行目にはArborlee wants the trees to grow strong and provide shade, oxygen, and soil stabilization for previously barren areas.「Arborleeは木が丈夫に成長し、それらが以前は不毛だった地帯に木陰、酸素、土壌の安定化をもたらすことを望んでいる」とある。よって、植林の目的は森林伐採地域の環境を改善することと分かる。\n（A） inexpensive「安価な」、material「材料」。\n（B） income「収入」。\n（D） beautify「〜を美化する」。',
  metacogFeedbackJa: '',
};

const pre06Q4 = {
  id: 'pre_06_q4',
  promptEn: 'For what was the contribution from Vernment, Inc., most likely used?',
  promptJa: 'Vernment社からの寄付金は、何のために使われたと考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Planting thousands of new trees',
      textJa: '何千本もの新しい木を植えること',
    },
    {
      id: 'b',
      textEn: 'Making improvements to the landscaping on a corporate campus',
      textJa: '会社の敷地内の景観を改善すること',
    },
    {
      id: 'c',
      textEn: 'Saving native trees from being harvested',
      textJa: '自生木が伐採されるのを防ぐこと',
    },
    {
      id: 'd',
      textEn: 'Printing materials that outline the mission of Arborlee International',
      textJa: 'Arborlee Internationalの使命を概説する資料を印刷すること',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '1つ目の本文の②6行目より、Arborlee Internationalへの寄付金は全て植林に使われると分かり、同6～7行目に「例えば1,000ドルの寄贈なら、1,000本の植林の資金となる」とある。同団体からVernment社へ贈られた2つ目の本文の感謝状を見ると、①1行目より同社の寄付額は7,260ドルと分かる。さらに同4～5行目には、the Rio Alto Forest Reserve in Bolivia, a project completed with the help of your funds「貴社の資金協力によって完成したプロジェクトである、ボリビアのRio Alto保護林」とあることから、Vernment社からの寄付金は保護林に7,260本の木を植えることに充てられたと考えられる。\n（B） improvement「改良」、landscaping「景観設計」、corporate「会社の」、campus「敷地」。\n（C） save～from doing「〜が・しないで済むようにする」、harvest「～を伐採する、～を収穫する」。\n（D） outline「〜を概説する」。',
  metacogFeedbackJa: '',
};

const pre06Passage: Passage = {
  id: 'pre_06',
  title: 'E-mail and Certificate - Arborlee International',
  direction: 'Questions 1-4 refer to the following e-mail and certificate.',
  directionJa: '問題1-4は次のEメールと証明書に関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    // English email
    {
      layoutType: 'emailTable',
      locale: 'en',
      emailTable: {
        headers: [
          { label: 'From:', value: 'Month of Giving Committee' },
          { label: 'To:', value: 'All Vernment Employees' },
          { label: 'Date:', value: 'April 26' },
          { label: 'Subject:', value: 'Only a few days left' },
        ],
        body: [
          "As our company's Month of Giving comes to a close, I would like to draw your attention to one more charity to consider. We have been profiling some of the lesser-known, but well-respected, organizations that are important to our colleagues. If you have not already made your voluntary contribution, take a moment to learn about this worthy cause. Remember that as your employer, Vernment, Inc., will match up to $100 of your contributions to eligible charities during this month.",
          'Arborlee International works with communities in North America, South America, and Asia to establish young trees in areas that need to be reforested. Experts assist their partners in choosing the most appropriate native trees to plant. Local citizens are hired and taught the skills required to plant the trees and to care for them. Arborlee wants the trees to grow strong and provide shade, oxygen, and soil stabilization for previously barren areas. Every dollar donated goes toward the planting of trees; a gift of $1,000, for example, funds the planting of 1,000 trees. Go to www.arborlee.org to learn more.',
        ],
      },
    },
    // Japanese email
    {
      layoutType: 'emailTable',
      locale: 'ja',
      emailTable: {
        headers: [
          { label: '送信者：', value: '寄付月間委員会' },
          { label: '宛先：', value: 'Vernment社従業員' },
          { label: '日付：', value: '4月26日' },
          { label: '件名：', value: '残りわずか数日' },
        ],
        body: [
          '当社の寄付月間が終わりに近づいてきましたので、検討すべきもう一つの慈善団体に皆さんの注目を集めたいと思います。当委員会ではこれまで、あまり知られていないながらも非常に高く評価され、同僚の皆さんにとって注目すべき団体を幾つか紹介してきました。あなたがまだ自発的な寄付をしていないのであれば、少し時間を取ってこの価値ある理念について知ってください。皆さんの雇用主としてVernment社は今月中、対象となる慈善団体へのあなたの寄付額のうち最大100ドルまで同額を拠出するということを覚えておいてください。',
          'Arborlee Internationalは、森林再生が必要な地域で若木を根付かせるために、北米、南米、そしてアジアの地域社会と共に力を尽くしています。最も植栽に適したその土地固有の木を選ぶにあたって、専門家がその共同事業者たちに手を貸しています。地元住民が雇用され、木を植えてそれらを手入れするのに必要な技術を教わっています。Arborleeは木が丈夫に成長し、それらが以前は不毛だった地帯に木陰、酸素、土壌の安定化をもたらすことを望んでいます。寄付金は全て、植林に使われます。例えば1,000ドルの寄贈なら、1,000本の植林の資金となります。さらに知るにはwww.arborlee.orgにアクセスしてください。',
        ],
      },
    },
    // English certificate
    {
      layoutType: 'certificate',
      locale: 'en',
      certificate: {
        organization: 'ARBORLEE INTERNATIONAL',
        title: 'CERTIFICATE OF APPRECIATION',
        subtitle: 'FOR',
        recipient: 'Vernment, Inc.',
        body: [
          "Many thanks for the generous gift of $7,260 generated by your company and for spreading the word about Arborlee International and its mission. In recognition of your contribution, your company's name will be displayed on a plaque at the entrance gate of the Rio Alto Forest Reserve in Bolivia, a project completed with the help of your funds.",
        ],
        signature: 'Jennifer Price',
        signerName: 'Jennifer Price',
        signerTitle: 'President, Arborlee International',
      },
    },
    // Japanese certificate
    {
      layoutType: 'certificate',
      locale: 'ja',
      certificate: {
        organization: 'ARBORLEE INTERNATIONAL',
        title: '感謝状',
        subtitle: '',
        recipient: 'Vernment社',
        body: [
          '貴社が集められた7,260ドルという多額のご献金、そしてArborlee Internationalとその使命に関する情報を広めてくださったことに対し、深く感謝いたします。貴社の貢献をたたえまして、貴社の資金協力によって完成したプロジェクトである、ボリビアのRio Alto保護林の入り口の門にある記念プレートに貴社名を掲示いたします。',
        ],
        signature: 'Jennifer Price',
        signerName: 'Jennifer Price',
        signerTitle: 'Arborlee International 代表',
      },
    },
  ],
  questions: [pre06Q1, pre06Q2, pre06Q3, pre06Q4],
};

// ===== Pre-Test 問題7: Advertisement, E-mail, and Profile (Moonstone Properties) =====

const pre07AdEn = {
  headline: 'Looking for an Apartment? Check Out Moonstone Properties',
  body: [
    'Moonstone Properties opened its first apartment complex in New York City twenty years ago and later expanded into Philadelphia and Pittsburgh. This December, we are opening our fourth Moonstone apartment complex in Baltimore.',
    'Conveniently located at 2 James Street, the complex is a short walk to a public park, grocery store, library, and bus stop. Each of our four buildings has a fitness center and community room.',
  ],
  bullets: [
    'Building 1: Next door to the Floral Café. Bicycle storage room.',
    'Building 2: Rooftop vegetable garden. Next to Finlay Park.',
    'Building 3: River view. Private balconies.',
    'Building 4: Close to a playground. Parking garage under the building.',
  ],
  footer: 'Schedule a tour of our one- or two-bedroom units at www.moonstone.com/baltimore today!',
};

const pre07AdJa = {
  headline: 'マンションをお探しですか？ Moonstone 不動産社を訪れてみてください',
  body: [
    'Moonstone 不動産社は20年前にニューヨーク市で最初の複合集合住宅をオープンし、その後、フィラデルフィアとピッツバーグにも進出しました。この12月、当社の4件目となるMoonstone複合集合住宅がボルチモアにオープンします。',
    'この複合集合住宅はジェームズ通り2番地という便利な立地で、公共公園、食料品店、図書館、バス停まで歩いてすぐです。4棟の建物それぞれにフィットネスセンターと集会室があります。',
  ],
  bullets: [
    '1号棟：Floralカフェの隣り。自転車保管室。',
    '2号棟：屋上菜園。Finlay公園の隣り。',
    '3号棟：川の眺め。専用バルコニー。',
    '4号棟：遊戯場に近い。建物の下に駐車場。',
  ],
  footer:
    '今すぐ、www.moonstone.com/baltimoreで、寝室1つのお部屋または寝室2つのお部屋の見学をご予約ください！',
};

const pre07EmailEn = {
  headers: [
    { label: 'To:', value: 'Aisha Abara <aishaabara@jmail.net>' },
    { label: 'From:', value: 'Suzanna Cohen <scohen@moonstone.com>' },
    { label: 'Date:', value: 'Saturday, January 12' },
    { label: 'Subject:', value: 'Apartment tour' },
  ],
  body: [
    'Dear Ms. Abara,',
    'Thank you for completing the inquiry form on our Web site. Per your request, I will meet you at 10 A.M. tomorrow at the Floral Café to give you a tour of the apartment complex. We have several vacant units available in each building. If you see an apartment you like, you can put down a deposit and sign a lease agreement immediately.',
    'You indicated that you need two bedrooms but did not mention whether you prefer a certain building. Please let me know if you do.',
    'Best,',
    'Suzanna Cohen, Leasing Agent\nMoonstone Properties',
  ],
  showScrollbar: true,
};

const pre07EmailJa = {
  headers: [
    { label: '受信者：', value: 'Aisha Abara <aishaabara@jmail.net>' },
    { label: '送信者：', value: 'Suzanna Cohen <scohen@moonstone.com>' },
    { label: '日付：', value: '1月12日　土曜日' },
    { label: '件名：', value: 'マンションの見学' },
  ],
  body: [
    'Abara様',
    'ウェブサイトのお問い合わせフォームにご記入いただきありがとうございます。ご要望通り、明日午前10時にFloralカフェでお客さまにお会いして、当複合集合住宅をご案内いたします。各棟に数戸の空室がございます。気に入ったお部屋があれば、即日頭金をお支払いの上、賃貸契約を結ぶことが可能です。',
    '寝室が2つ必要とご記入いただきましたが、特定の棟をご希望かどうかは書かれていませんでした。もしご希望があれば、お知らせください。',
    'よろしくお願いします。',
    '賃貸担当代理人　Suzanna Cohen\nMoonstone 不動産社',
  ],
  showScrollbar: true,
};

const pre07ProfileEn = {
  title: 'Moonstone Apartments Newsletter',
  sectionTitle: 'Resident Profile: Aisha Abara',
  body: [
    'Aisha can often be spotted sipping coffee at the Floral Café or enjoying the peaceful view of the river from her balcony. An avid reader, Aisha visits the library weekly. She also enjoys jogging and tennis when she is not teaching chemistry at Spurlock High School. We are delighted to welcome Aisha to the Moonstone community.',
  ],
};

const pre07ProfileJa = {
  title: 'Moonstone マンション会報',
  sectionTitle: '居住者紹介：Aisha Abara',
  body: [
    'AishaがFloralカフェでコーヒーを飲んだり、バルコニーから川の穏やかな眺めを楽しんだりしているのをしばしば見かけることができます。熱心な読書家であるAishaは、毎週図書館を訪れています。また、Spurlock高校で化学を教えている以外のときには、ジョギングやテニスを楽しんでいます。AishaをMoonstoneのコミュニティーに迎えることができて、大変うれしく思います。',
  ],
};

const pre07Q1 = {
  id: 'pre_07_q1',
  promptEn: 'Where does Ms. Cohen most likely work?',
  promptJa: 'Cohenさんはどこで働いていると考えられますか。',
  choices: [
    { id: 'a', textEn: 'In New York City', textJa: 'ニューヨーク市' },
    { id: 'b', textEn: 'In Philadelphia', textJa: 'フィラデルフィア' },
    { id: 'c', textEn: 'In Pittsburgh', textJa: 'ピッツバーグ' },
    { id: 'd', textEn: 'In Baltimore', textJa: 'ボルチモア' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    'Cohenさんとは、2つ目の本文Eメールの送信者で、署名欄より、Moonstone不動産社の賃貸担当代理人。件名にApartment tour「マンションの見学」とあり、同Eメールの①1～2行目には、「明日午前10時にFloralカフェでお客さまに会って、当複合集合住宅を案内する」と書かれている。このFloralカフェは1つ目の本文の広告の③1行目にある、Building 1: Next door to the Floral Cafe.という記載から、1号棟の隣にあると分かる。また、同①2～3行目より、この1号棟はボルチモアに新規オープンした複合集合住宅の1つの棟だと分かる。よって、Cohenさんはボルチモアの住宅を担当しており、その見学案内を行うと考えられるので、（D）が正解。\n（A）（B）（C）1つ目の本文の①1～2行目より、Moonstone不動産社の複合集合住宅がある場所だが、Cohenさんがこれらの場所で働いていると考えられる記述はない。',
  metacogFeedbackJa: '',
};

const pre07Q2 = {
  id: 'pre_07_q2',
  promptEn: 'What information does Ms. Cohen ask Ms. Abara to provide?',
  promptJa: 'CohenさんはAbaraさんにどんな情報を提供するように頼んでいますか。',
  choices: [
    { id: 'a', textEn: 'How many bedrooms she wants', textJa: 'ベッドルームが幾つ欲しいか' },
    { id: 'b', textEn: 'When she wants to move in', textJa: 'いつ入居したいか' },
    {
      id: 'c',
      textEn: 'When she will return a signed lease',
      textJa: 'いつ署名済みの賃貸契約書を戻してくれるか',
    },
    {
      id: 'd',
      textEn: 'Whether she prefers a particular building',
      textJa: '特定の建物を希望するかどうか',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '2つ目の本文Eメールの送信者であるCohenさんは、受信者のAbaraさんに対して同②1～2行目で、「寝室が2つ必要なことは記入してくれたが、特定の棟を希望するかどうかは書かれていなかった。希望があれば知らせてほしい」と述べている。よって、CohenさんはAbaraさんに、棟の希望があれば教えてほしいと頼んでいると分かるので、（D）が正解。certainを（D）ではparticularと言い換えている。\n（A）2つ目の本文の②1～2行目より、Abaraさんは寝室が2つ必要であることが分かっている。\n（B）入居希望日は話題に上っていない。\n（C）2つ目の本文の①3～4行目で、気に入った部屋があれば賃貸契約を即日結ぶことができると書かれているが、署名済みのlease「賃貸契約書」の返却については言及されていない。',
  metacogFeedbackJa: '',
};

const pre07Q3 = {
  id: 'pre_07_q3',
  promptEn: 'In what building does Ms. Abara live?',
  promptJa: 'Abaraさんはどの建物に住んでいますか。',
  choices: [
    { id: 'a', textEn: 'Building 1', textJa: '1号棟' },
    { id: 'b', textEn: 'Building 2', textJa: '2号棟' },
    { id: 'c', textEn: 'Building 3', textJa: '3号棟' },
    { id: 'd', textEn: 'Building 4', textJa: '4号棟' },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    'Abaraさんは2つ目の本文Eメールの受信者であり、3つ目の本文の人物紹介で取り上げられている新規居住者。3つ目の本文の人物紹介の①1～2行目から、Abaraさんは「バルコニーから川の穏やかな眺めを楽しんでいる」ことが分かる。1つ目の本文の広告の③に、「3号棟：川の眺め。専用バルコニー」という記載があるので、Abaraさんが住んでいるのは（C）「3号棟」と考えられる。\n（A）3つ目の本文の①1行目から、AbaraさんがよくFloralカフェを利用していることが分かり、1つ目の本文の③より、1号棟はFloralカフェの隣だが、他の3棟もFloralカフェから近いと考えられるので、Abaraさんが1号棟に住んでいることを示す根拠にはならない。\n（B）3つ目の本文の①3～4行目に、ジョギングやテニスを楽しむと書かれていることから、1つ目の本文の③に公園の隣とある2号棟を連想して選ばないよう注意。',
  metacogFeedbackJa: '',
};

const pre07Passage: Passage = {
  id: 'pre_07',
  title: 'Advertisement, E-mail, and Profile - Moonstone Properties',
  direction: 'Questions 1-3 refer to the following advertisement, e-mail, and profile.',
  directionJa: '問題1-3は次の広告、Eメール、人物紹介に関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    // English advertisement
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: pre07AdEn,
    },
    // Japanese advertisement
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: pre07AdJa,
    },
    // English email
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: pre07EmailEn,
    },
    // Japanese email
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: pre07EmailJa,
    },
    // English profile
    {
      layoutType: 'newsletterProfile' as const,
      locale: 'en' as const,
      newsletterProfile: pre07ProfileEn,
    },
    // Japanese profile
    {
      layoutType: 'newsletterProfile' as const,
      locale: 'ja' as const,
      newsletterProfile: pre07ProfileJa,
    },
  ],
  questions: [pre07Q1, pre07Q2, pre07Q3],
};

// ===== Pre-Test 問題8: Advertisement and E-mails (Adeletto and Sons) =====

const pre08Q1 = {
  id: 'pre_08_q1',
  promptEn: 'What is suggested about Adeletto and Sons?',
  promptJa: 'Adeletto and Sons社について何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'It creates products made of artificial leather.',
      textJa: '同社は合成皮革製の製品を作る。',
    },
    {
      id: 'b',
      textEn: 'It produces shoes and handbags.',
      textJa: '同社は靴やハンドバッグを製造する。',
    },
    {
      id: 'c',
      textEn: 'It plans to open a new international office soon.',
      textJa: '同社は間もなく新たな海外事務所を開く予定である。',
    },
    {
      id: 'd',
      textEn: 'It sells leather to manufacturing companies.',
      textJa: '同社は製造業の企業に革を販売する。',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '1つ目の本文のAdeletto and Sons社の広告の①1行目で、同社は1849年以来、革の加工と染色を行ってきたと述べられ、続く同2～4行目に、「貴社の工場製品ラインがどのようなものでも、当社の熟練工が貴社の仕様に合わせた最高品質の革を提供することによって、貴社製品の表面を美しく装い仕上げる手伝いをする」とあるので、同社は製造業の企業に革を販売すると分かる。manufacturing「製造業の」。\n（A） made of〜「〜でできた」、artificial leather「合成皮革」。\n（B） 1つ目の本文の②3〜4行目で靴やハンドバッグ向けの革のコレクションが列挙されているが、靴やハンドバッグそのものを製造していると述べられてはいない。produce「～を製造する」。\n（C） international「海外の、国際的な」。',
  metacogFeedbackJa: '',
};

const pre08Q2 = {
  id: 'pre_08_q2',
  promptEn: 'What is one purpose of the first e-mail?',
  promptJa: '1通目のEメールの1つの目的は何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To promote boat rentals for events',
      textJa: '行事向けの船のレンタルを促進すること',
    },
    {
      id: 'b',
      textEn: 'To complain about a late shipment',
      textJa: '発送の遅延に不満を述べること',
    },
    {
      id: 'c',
      textEn: 'To ask for advice about seat coverings',
      textJa: '座席張りに関する助言を求めること',
    },
    {
      id: 'd',
      textEn: 'To request instructions for preserving a delicate material',
      textJa: '繊細な素材を保護するための説明を要望すること',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '1通目のEメールである2つ目の本文は、造船業のJaehak Marine社のChoさんが加工会社であるAdeletto and Sons社のGrandeさん宛てに送信したもので、件名には「周遊船製品ラインの座席」とある。Choさんは同①1～3行目で、受け取った見本は座席に使う革としては繊細で薄過ぎると述べ、同②2～4行目で、丈夫で耐久性のある革が必要だと書いている。同②5～7行目では、「こぼれた飲食物による損傷は、これまで私たちが当社の座席に関して抱えてきた課題なので、今回は必ず正しい選択をしたい。これらのニーズを満たす、Adeletto and Sons社の最適な素材を見極める手助けをお願いしたい」とニーズを伝えた上で座席張りについての助言を求めているので、（C）が正解。seat Covering「座席張り」\n（A） promote「〜を促進する」、rental「レンタル、賃借」。\n（B） complain about～「～に不満を述べる」。\n（D） instructions「指示」、preserve「～を保護する」、delicate「繊細な」。',
  metacogFeedbackJa: '',
};

const pre08Q3 = {
  id: 'pre_08_q3',
  promptEn: "What collection best suits Mr. Cho's needs?",
  promptJa: 'どのコレクションがChoさんのニーズに最も合いますか。',
  choices: [
    { id: 'a', textEn: 'Roma', textJa: 'ローマ' },
    { id: 'b', textEn: 'Genoa', textJa: 'ジェノバ' },
    { id: 'c', textEn: 'Vicenza', textJa: 'ビチェンツァ' },
    { id: 'd', textEn: 'Milano', textJa: 'ミラノ' },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    'Choさんが求めているものは、1通目のEメールの2つ目の本文の①1行目のleather for the seats in our line of touring boats「当社が製造する周遊船の座席に使う革」である。さらにChoさんは同②で、耐久性が重要な座席の革の条件について述べている。従って、1つ目の本文の②1行目に、「ローマコレクション自動車、航空機、船舶使用に」とある、船舶向けのローマコレクションがChoさんのニーズに最も合うと判断できる。suit「～に合う」。',
  metacogFeedbackJa: '',
};

const pre08Q4 = {
  id: 'pre_08_q4',
  promptEn: 'What will probably be most important to Mr. Cho when he places a full order?',
  promptJa: '正式注文をする際に、Choさんにとっておそらく何が最も重要ですか。',
  choices: [
    { id: 'a', textEn: 'The shipping time', textJa: '運送時間' },
    { id: 'b', textEn: 'The amount of the discount', textJa: '割引額' },
    { id: 'c', textEn: 'The color selection', textJa: '色の選択' },
    { id: 'd', textEn: 'The finishing treatment', textJa: '仕上げ処理' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '3つ目の本文の②1～2行目で、GrandeさんはChoさんの説明から判断すると、Choさんの会社が革の防汚加工処理に興味を持つ可能性に言及し、同2～4行目で、苛酷に使用される製品を取り扱う顧客に評判の仕上げ処理を紹介した後、Choさんに見本注文にそのオプションの追加を希望するかどうか尋ねている。2つ目の本文の②4〜7行目でChoさんは、Most importantly「最も重要なことだが」と言って、座席への飲食物のこぼれに対する革の損傷を以前からの課題として挙げ、素材の見極めの手助けを頼んでいる。よって、Choさんにとって汚れに対して耐性を持たせる仕上げ処理が最重要だと判断できる。\n（C） selection「選択」。',
  metacogFeedbackJa: '',
};

const pre08Passage: Passage = {
  id: 'pre_08',
  title: 'Advertisement and E-mails - Adeletto and Sons',
  direction: 'Questions 1-4 refer to the following advertisement and e-mails.',
  directionJa: '問題1-4は次の広告と2通のEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    // English advertisement
    {
      layoutType: 'adChainBorder' as const,
      locale: 'en' as const,
      adChainBorder: {
        headline: 'ADELETTO AND SONS',
        body: [
          'Our family business has been processing and dyeing fine leather since 1849. Whatever your factory product line, our experts will help you to wrap and finish your items beautifully by providing you with the highest-quality leather tailored to your specifications. Speedy worldwide shipping is guaranteed. Choose from the following collections, all of which are available in a variety of finishes and in over 100 designer colors.',
        ],
        bullets: [
          'ROMA COLLECTION, for automotive, aviation, and seagoing use',
          'GENOA COLLECTION, for fine furniture',
          'VICENZA COLLECTION, for both dress shoes and casual footwear',
          'MILANO COLLECTION, for handbags and personal accessories',
        ],
      },
    },
    // Japanese advertisement
    {
      layoutType: 'adChainBorder' as const,
      locale: 'ja' as const,
      adChainBorder: {
        headline: 'ADELETTO AND SONS 社',
        body: [
          '家族経営会社である私どもは1849年以来、上質な革を加工し染め続けてきました。貴社の工場製品ラインがどのようなものであれ、当社の熟練工が貴社の仕様に合わせた最高品質の革をご提供することによって、貴社製品の表面を美しく装い仕上げるお手伝いをします。世界中に迅速な配送を保証いたします。下記のコレクションからお選びください。これらは全て、さまざまな仕上げと100を超えるデザイナーカラーにてご用意できます。',
        ],
        bullets: [
          'ローマ コレクション　自動車、航空機、船舶の使用に',
          'ジェノバ コレクション　上質な家具用に',
          'ビチェンツァ コレクション　正装用とカジュアル用の靴のどちらにも',
          'ミラノ コレクション　ハンドバッグや身の回りの小物類用に',
        ],
      },
    },
    // English email 1 (from Cho to Grande)
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: {
        headers: [
          { label: 'To:', value: 'Domenico Grande <d.grande@adeletto.it>' },
          { label: 'From:', value: 'Youngjoon Cho <yjcho@jaehakmarine.co.kr>' },
          { label: 'Date:', value: '15 February' },
          { label: 'Subject:', value: 'Touring Line seating' },
        ],
        body: [
          'Dear Mr. Grande:',
          'We received the sample shipment of leather for the seats in our line of touring boats. While the color and texture are very pleasing, this leather is much too fine and thin for our purposes. It seems to be more like a glove leather, appropriate for small personal items. We are concerned that it will easily tear and become worn out, even with normal use.',
          'Jaehak Marine builds boats for touring companies to use for weddings, corporate parties, and gala events. Naturally, the seating must be comfortable, but the surface should be sturdy and durable enough to withstand weight and friction as well as continual exposure to moisture. Most importantly, we must choose a leather that will stand up to the frequent spills that occur when food and beverages are served. Damage from spills is an issue we have had with our seats in the past, so we want to be certain to make the right choice this time. Please help us identify the best Adeletto and Sons material to meet these needs.',
          'We look forward to your recommendation.',
          'Sincerely,',
          'Youngjoon Cho',
          'Product Development, Jaehak Marine',
        ],
        showScrollbar: true,
      },
    },
    // Japanese email 1
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: {
        headers: [
          { label: '宛先：', value: 'Domenico Grande <d.grande@adeletto.it>' },
          { label: '送信者：', value: 'Youngjoon Cho <yjcho@jaehakmarine.co.kr>' },
          { label: '日付：', value: '2月15日' },
          { label: '件名：', value: '観光用ラインの座席' },
        ],
        body: [
          'Grande 様',
          '当社が製造する周遊船の座席に使う革の見本の荷物を受け取りました。色や手触りは大変魅力的なのですが、この革は私たちの用途にはあまりにも繊細で薄過ぎます。むしろ手袋の革のような、小さな身の回り品に適しているようです。たとえ通常の使い方でも、簡単に裂けて擦り切れてしまうことを私たちは懸念しています。',
          '当Jaehak Marine社はツアー会社向けに、結婚式、企業のパーティー、また祝賀会に利用する船を造っています。当然ながら、座席は快適でなければなりませんが、その表面は重量や摩擦だけでなく、湿気に継続的にさらされることにも耐えられるだけ十分に丈夫で耐久性があることが望まれます。そして最も重要なことですが、私たちは、飲食物提供時に頻繁にこぼれても耐え得る革を選ばなければなりません。こぼれた飲食物による損傷は、これまで私たちが当社の座席に関して抱えてきた課題ですので、今回は必ず正しい選択をしたいと思っています。これらのニーズを満たす、Adeletto and Sons社の最適な素材を見極める手助けをお願いいたします。',
          '貴社からのご提案をお待ちしております。',
          '敬具',
          'Youngjoon Cho',
          '製品開発部, Jaehak Marine 社',
        ],
        showScrollbar: true,
      },
    },
    // English email 2 (from Grande to Cho)
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: {
        headers: [
          { label: 'To:', value: 'Youngjoon Cho <yjcho@jaehakmarine.co.kr>' },
          { label: 'From:', value: 'Domenico Grande <d.grande@adeletto.it>' },
          { label: 'Date:', value: '16 February' },
          { label: 'Subject:', value: 'RE: Touring Line seating' },
        ],
        body: [
          'Dear Mr. Cho:',
          'We are so sorry for the error. Your sample should never have been prepared with our softest and most delicate leather product. We will send you new samples.',
          'Given what you have said about the usage your seating must withstand, we think you may also be interested in our special stain-resistant leather treatment. This type of finishing treatment is very popular with clients whose products are subject to heavy, repeated use. Please let us know if you would like to add this option to your sample order. Also, let us know if you would like your new samples in the same neutral color that you originally requested.',
          'Adeletto and Sons can have your samples delivered to you in Jeju City within three days, and we will offer a 10 percent discount when you are ready to place a full order.',
          'Thank you,',
          'Domenico Grande',
          'Director of Client Relations, Adeletto and Sons',
        ],
      },
    },
    // Japanese email 2
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: {
        headers: [
          { label: '宛先：', value: 'Youngjoon Cho <yjcho@jaehakmarine.co.kr>' },
          { label: '送信者：', value: 'Domenico Grande <d.grande@adeletto.it>' },
          { label: '日付：', value: '2月16日' },
          { label: '件名：', value: 'RE：観光用ラインの座席' },
        ],
        body: [
          'Cho 様',
          'このたびの間違いにつきまして大変申し訳なく存じます。貴社のための見本は、当社の最も柔らかく繊細な革でご用意すべきではございませんでした。新しい見本をお送りいたします。',
          'あなたがご説明くださった、座席が耐久性を必要とする使い方を考慮しますと、貴社は当社の特殊防汚加工処理にもご興味をお持ちになる可能性があると存じます。このタイプの仕上げ処理は、繰り返し苛酷に使用される製品を取り扱うお客様方に大変好評です。見本のご注文にこのオプションを追加なさりたいかどうかお知らせください。また、新しい見本を最初に貴社がご要望になったのと同じ中間色でご希望かどうかもお知らせください。',
          'Adeletto and Sons社は見本をチェジュ市の貴社の元に3日以内にお届けすることができます。また正式にご注文していただけるのであれば10パーセント引きをご提供いたします。',
          'よろしくお願いいたします。',
          'Domenico Grande',
          '顧客関係部部長, Adeletto and Sons 社',
        ],
      },
    },
  ],
  questions: [pre08Q1, pre08Q2, pre08Q3, pre08Q4],
};

// ===== Post-Test 問題1: Customer Service Exchange (Bank Account Issue) =====

const post01MessagesEn = [
  {
    sender: 'Mariam Abebe',
    time: '9:05 A.M.',
    text: "Hello. I'm Mariam Abebe with Heisler & Wilcox. Since last week my staff members and I have been having trouble accessing one of our bank accounts electronically.",
  },
  {
    sender: 'Josue Martin',
    time: '9:07 A.M.',
    text: 'Sorry to hear that, Ms. Abebe. Let me look into this for you.',
  },
  {
    sender: 'Josue Martin',
    time: '9:09 A.M.',
    text: 'Your publishing company has a few accounts with us. Which one are you referring to?',
  },
  {
    sender: 'Mariam Abebe',
    time: '9:09 A.M.',
    text: 'The one ending in 8409.',
  },
  {
    sender: 'Josue Martin',
    time: '9:11 A.M.',
    text: 'It looks like that account has been locked due to multiple failed log-in attempts. To unlock the account, the password must be reset.',
  },
  {
    sender: 'Mariam Abebe',
    time: '9:12 A.M.',
    text: "Actually, my assistants and I have taken great care to enter the password correctly. Besides, we've tried changing it already, but we weren't able to.",
  },
  {
    sender: 'Josue Martin',
    time: '9:13 A.M.',
    text: 'I see. I will report your problem to our Enhanced Technical Support team. A technician will be contacting you within two hours.',
  },
  {
    sender: 'Mariam Abebe',
    time: '9:14 A.M.',
    text: 'Thank you.',
  },
];

const post01MessagesJa = [
  {
    sender: 'Mariam Abebe',
    time: '午前9時5分',
    text: 'こんにちは。Heisler & Wilcox社のMariam Abebeです。先週からスタッフと私は、社の銀行口座の1つにオンラインでアクセスできなくて困っています。',
  },
  {
    sender: 'Josue Martin',
    time: '午前9時7分',
    text: 'それはお気の毒に思います、Abebe様。お客さまのために、この件を調べさせてください。',
  },
  {
    sender: 'Josue Martin',
    time: '午前9時9分',
    text: 'お客さまの出版社は、当行に幾つかの口座をお持ちですね。どの口座のことをおっしゃっていますか。',
  },
  {
    sender: 'Mariam Abebe',
    time: '午前9時9分',
    text: '末尾が8409のものです。',
  },
  {
    sender: 'Josue Martin',
    time: '午前9時11分',
    text: 'その口座は、ログインの試みに複数回失敗したためにロックされているようです。この口座のロックを解除するには、パスワードがリセットされる必要があります。',
  },
  {
    sender: 'Mariam Abebe',
    time: '午前9時12分',
    text: '実のところ、アシスタントたちと私はパスワードを正確に入力するよう、相当気を付けていました。それに、私たちはすでにそれを変更しようと試みたのですが、できなかったのです。',
  },
  {
    sender: 'Josue Martin',
    time: '午前9時13分',
    text: '分かりました。私が、当行の高度技術サポートチームにお客さまの問題を報告します。2時間以内に技術者がお客さまにご連絡いたします。',
  },
  {
    sender: 'Mariam Abebe',
    time: '午前9時14分',
    text: 'ありがとうございます。',
  },
];

const post01Q1 = {
  id: 'post_01_q1',
  promptEn: 'What most likely is true about Ms. Abebe?',
  promptJa: 'Abebeさんについて正しいと考えられることは何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'She has been locked out of her office before.',
      textJa: '彼女は以前、自分の執務室の中に入れなくなってしまったことがある。',
    },
    {
      id: 'b',
      textEn: 'She oversees staff at a publishing company.',
      textJa: '彼女は出版社でスタッフを監督している。',
    },
    {
      id: 'c',
      textEn: 'She will be submitting a report in two hours.',
      textJa: '彼女は2時間後に報告書を提出することになっている。',
    },
    {
      id: 'd',
      textEn: 'She had contacted Mr. Martin last week.',
      textJa: '彼女は先週、Martinさんに連絡していた。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    'Abebeさんは①で、自分とスタッフは、自社の銀行口座の1つにオンラインでアクセスできなくて困っている、と問題を伝えている。③より、Abebeさんの勤務先は出版社と分かる。また、Abebeさんは⑥でmy assistants and I「私のアシスタントたちと私」と書いていることから、彼女は出版社で部下を持つ立場にあると考えられる。よって、（B）が正解。oversee「～を監督する」。\n（A） lock～out of…「~を…から閉め出す」。\n（C） submit「〜を提出する」、report「報告書」。',
  metacogFeedbackJa: '',
};

const post01Q2 = {
  id: 'post_01_q2',
  promptEn: 'At 9:13 A.M., what does Mr. Martin most likely mean when he writes, "I see"?',
  promptJa: '午前9時13分に、Martinさんは"I see"という発言で、何を意味していると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'He knows that Ms. Abebe tried to access the account repeatedly.',
      textJa: '彼は、Abebeさんが繰り返し口座にアクセスしようとしたことを知っている。',
    },
    {
      id: 'b',
      textEn: 'He noticed that Ms. Abebe had changed her password.',
      textJa: '彼は、Abebeさんがパスワードを変更していたことに気付いた。',
    },
    {
      id: 'c',
      textEn: 'He understands why Ms. Abebe rejects his suggestion.',
      textJa: '彼は、なぜAbebeさんが彼の提案を却下するのかを理解している。',
    },
    {
      id: 'd',
      textEn: 'He realizes why Ms. Abebe needs on-site assistance.',
      textJa: '彼は、なぜAbebeさんが現場での手助けを必要とするのか分かっている。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '①の、銀行口座にオンラインでアクセスできないというAbebeさんからの問い合わせに、Martinさんは⑤で、口座のロックを解除するにはパスワードのリセットが必要だと伝えている。それに対しAbebeさんは⑥で、パスワードを入力する際には注意を払ってきたと述べた後、「私たちはすでにそれを変更しようと試みたが、できなかった」と、Martinさんの提案を退けている。それに返答してMartinさんは下線部の発言をし、続けて問題を高度技術サポートチームに報告すると申し出ている。よって、Martinさんは、Abebeさんが自分の提案に同意しなかった理由を理解したため、下線部の発言をしたと考えられる。reject「〜を却下する」、suggestion「提案」。\n（A） repeatedly「繰り返し」。\n（B）⑥でAbebeさん自身が、パスワード変更を試みたができなかったと述べている。notice「～に気付く」。\n（D） realize「〜がよく分かる、～を認識する」、on-site「現場での」、assistance「手助け」。',
  metacogFeedbackJa: '',
};

const post01Passage: Passage = {
  id: 'post_01',
  title: 'Customer Service Exchange - Bank Account Issue',
  direction: 'Questions 1-2 refer to the following online customer-service exchange.',
  directionJa: '問題1-2は次のオンライン顧客サービスのやりとりに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'customerServiceExchange' as const,
      locale: 'en' as const,
      customerServiceExchange: {
        messages: post01MessagesEn,
      },
    },
    {
      layoutType: 'customerServiceExchange' as const,
      locale: 'ja' as const,
      customerServiceExchange: {
        messages: post01MessagesJa,
      },
    },
  ],
  questions: [post01Q1, post01Q2],
};

// ===== Post-Test 問題2: Memo (Company-wide discussion) =====

const post02MemoEn = {
  to: 'All employees',
  from: 'Patricia Ogdencort, CEO',
  date: '22 June',
  subject: 'Company-wide discussion',
  body: [
    'Here at Ogdencort, we believe in partnering with our employees to make positive changes. — [1] —. As such, we would like one representative from each department to participate in company-wide discussions on reducing costs.',
    'Employees interested in serving as a representative must have worked at Ogdencort for a minimum of one year. — [2] —. Also, they must have received positive performance reviews and must be able to attend four meetings during one calendar year. Department heads are asked to withhold from serving as representatives. Please submit your name for consideration to your department head no later than 20 August. — [3] —. Successful applicants will be notified within one week of the deadline.',
    'We will also be creating a suggestion box. — [4] —. Further information will be provided soon.',
  ],
};

const post02MemoJa = {
  to: '従業員各位',
  from: 'Patricia Ogdencort、最高経営責任者',
  date: '6月22日',
  subject: '全社討議',
  body: [
    '当Ogdencort社では、従業員と連携して積極的な改善を図っていくことを信条としています。そこで、各部門から代表者1名に、経費削減に関する全社討議への参加をお願いします。',
    '代表者を務めることに興味がある従業員は、最低限1年間Ogdencort社で勤務していなければなりません。また、その人物たちは肯定的な勤務評定を受けている必要があり、1年間に4回開かれる会議に出席できる必要もあります。部門長は、代表者を務めることを控えるようお願いします。検討のために、8月20日までに所属の部門長に氏名を提出してください。※各部門長が最終決定を下します。選出者は提出期限から1週間以内に通知されます。',
    '提案箱も新設することになっています。より詳しい情報については近日中にお知らせします。',
  ],
};

const post02Q1 = {
  id: 'post_02_q1',
  promptEn: 'What is the purpose of the memo?',
  promptJa: 'メモの目的は何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To request ideas for reducing costs',
      textJa: '経費削減のための案を求めること',
    },
    {
      id: 'b',
      textEn: 'To announce a company initiative',
      textJa: '会社の新たな取り組みを告知すること',
    },
    {
      id: 'c',
      textEn: 'To offer training for future leaders',
      textJa: '将来のリーダーのための研修を提供すること',
    },
    {
      id: 'd',
      textEn: 'To collect data on employee performance reviews',
      textJa: '従業員の勤務評定に関するデータを収集すること',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `①2～4行目で、経費削減に関する全社討議のために各部門から代表者1名を出すことが求められており、②では代表者の要件と決定手順が説明されている。さらに③では、新たに提案箱を設置することが伝えられている。よって、メモの目的は会社のこれらの新たな取り組みについて全従業員に告知することだと分かる。announce「～を告知する」、iniiative 「新しい試み、新規行動計画」。
（A）①2～4行目に経費削減に言及があるが、メモではその案を求められてはいない。`,
  metacogFeedbackJa: '',
};

const post02Q2 = {
  id: 'post_02_q2',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Each department head will make the final decision."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「各部門長が最終決定を下します」',
  choices: [
    {
      id: 'a',
      textEn: '[1]',
      textJa: '[1]',
    },
    {
      id: 'b',
      textEn: '[2]',
      textJa: '[2]',
    },
    {
      id: 'c',
      textEn: '[3]',
      textJa: '[3]',
    },
    {
      id: 'd',
      textEn: '[4]',
      textJa: '[4]',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `挿入文は最終決定を行う人物を伝えるもの。②の後半で全社討議に参加する各部門の代表者の決定手順が述べられている。同5〜6行目に、Please submit your name for consideration to your department head「検討のために、所属の部門長に氏名を提出してください」と応募手順の説明があり、その後ろに「選出者は提出期限から1週間以内に通知される」と決定結果の通知時期が案内されている。よって、この間の（C）［3］に挿入文を入れると、代表者の応募、決定とその結果発表までの一連の流れを説明することになり、適切。
make a decision「決定を下す」、final「最終的な」。`,
  metacogFeedbackJa: '',
};

const post02Passage: Passage = {
  id: 'post_02',
  title: 'Memo - Company-wide discussion',
  direction: 'Questions 1-2 refer to the following memo.',
  directionJa: '問題1-2は次のメモに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'memo' as const,
      locale: 'en' as const,
      memo: post02MemoEn,
    },
    {
      layoutType: 'memo' as const,
      locale: 'ja' as const,
      memo: post02MemoJa,
    },
  ],
  questions: [post02Q1, post02Q2],
};

// ===== Post-Test 問題3: Press Release (Photography Equipment Swap and Sell) =====

const post03PressReleaseEn = {
  releaseType: 'FOR IMMEDIATE RELEASE',
  contact: {
    name: 'Carla Guerra',
    phone: '512-555-0172',
    email: 'c_guerra@dupontcamera.com',
  },
  headline: 'Dupont Camera Store Hosts Its Tenth Annual Photography Equipment Swap and Sell',
  body: [
    "(Monday, June 12)—Dupont Camera Store is once again hosting its photography equipment Swap and Sell event. On Friday, June 16, the store's showroom will be packed with tables of new and used photography gear from various vendors and hobbyists. Entry is $6 cash. Doors open at 10:00 A.M., and the event lasts until 5:00 P.M.",
    '"This is an event people look forward to all year," said Dupont Camera Store\'s marketing manager Don Bergner. "Every time we\'ve hosted it, a line has started forming about an hour before we even open the doors."',
    'Professional dealers and camera companies can rent tables for $250 as an official vendor. Tables are 6 meters by 2 meters and include clear plastic clips for attaching a company banner or poster. Hobby photographers wanting to sell or trade a few handheld items can pay an entry fee of $50 and bring crates or camera bags of gear to set up in a designated area on the floor.',
    '"I went to the event last year and definitely plan to go again," said Jonathan McDougall. "I didn\'t have anything to sell, but I got to meet some interesting people. I also ended up finding some accessories for my outdated camera model that I hadn\'t been able to find online."',
  ],
};

const post03PressReleaseJa = {
  releaseType: '即日解禁',
  contact: {
    name: 'Carla Guerra',
    phone: '512-555-0172',
    email: 'c_guerra@dupontcamera.com',
  },
  headline: 'Dupontカメラストア社が、毎年恒例の写真撮影機材の交換・販売会の第10回を開催',
  body: [
    '（6月12日、月曜日）ーDupontカメラストア社は再び、写真撮影機材の交換・販売のイベントを開催します。6月16日金曜日に、当社のショールームは、各種販売業者と愛好家からの新品および中古の写真撮影機材のテーブルでいっぱいになるでしょう。入場料は6ドルの現金払いです。開場は午前10時で、イベントは午後5時まで続きます。',
    '「これは、人々が一年通じて楽しみにしているイベントです」とDupontカメラストア社のマーケティング部長であるDon Bergnerは述べました。「当社がこれを開催するたびに、開場する1時間くらい前にはもう列が出来始めるのです」。',
    '専門取扱業者やカメラ会社は公式販売業者として、250 ドルでテーブルを借りることができます。テーブルは幅6メートル、奥行2メートルで、会社の横断幕やポスターを取り付けるための透明なプラスチック製クリップが含まれます。数点の小型製品を販売または交換したい写真愛好家の方々は、入場料50ドルを支払って、機材が入った箱やカメラバッグを持ち込み、会場の指定場所に並べることができます。',
    '「私は昨年このイベントに足を運んだのですが、絶対にまた行くつもりです」とJonathan McDougallは語りました。「私は売るものは何もありませんでしたが、興味深い人々に出会う機会を得ました。また、オンラインでは見つけることができなかった自分の旧型のカメラの付属品をついに見つけることにもなったのです」。',
  ],
};

const post03Q1 = {
  id: 'post_03_q1',
  promptEn: 'What does Mr. Bergner imply about the event?',
  promptJa: 'Bergnerさんはイベントについて何を示唆していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Tickets sell out within a few days.',
      textJa: 'チケットは数日以内に売り切れる。',
    },
    {
      id: 'b',
      textEn: 'Attendees start arriving before 10:00 A.M.',
      textJa: '参加者は午前10時よりも前に到着し始める。',
    },
    {
      id: 'c',
      textEn: 'It is hosted by a different camera company each year.',
      textJa: 'それは毎年異なるカメラ会社によって主催される。',
    },
    {
      id: 'd',
      textEn: "Store staff will unload the vendors' items.",
      textJa: '店舗スタッフが販売業者の商品の荷降ろしをする。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `②1～2行目より、BergnerさんとはDupontカメラストア社のマーケティング部長。Bergnerさんは同2～3行目で、毎年恒例の写真撮影装材の交換・販売のイベントについて、Every time weve hosted it, a line has started forming about an hour before we even open thedoors.「当社がこれを開催するたびに、開場する1時間くらい前にはもう列が出来始める」と述べている。①の4行目に、今年のイベントの開催について、「開場は午前10日と下さいるので、Bargnerさんは、開場時効である午前10時よりも前に参加者が会場に到着し始めることを示していると考えられる。attendee「参加者」。
（A） sell out「売り切れる」。
（D） unload「～を降ろす」。`,
  metacogFeedbackJa: '',
};

const post03Q2 = {
  id: 'post_03_q2',
  promptEn: 'What is suggested about hobby photographers?',
  promptJa: '写真愛好家について、何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'They will not be provided with a table.',
      textJa: '彼らにはテーブルが提供されない。',
    },
    {
      id: 'b',
      textEn: 'They can sell only certain items.',
      textJa: '彼らは特定の品物しか販売できない。',
    },
    {
      id: 'c',
      textEn: 'They pay the same entry fee as the public.',
      textJa: '彼らは一般の人々と同額の入場料を支払う。',
    },
    {
      id: 'd',
      textEn: 'They have to sign up online.',
      textJa: '彼らはオンラインで参加登録をしなければならない。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa: `③の3~5行目にHobby photographers wanting to sell or trade a few handheld items can ...... bring crates or camera bags of gear to set up in a designated area on the floor.「数点の小型製品を販売または交換したい写真愛好家は、機材が入った箱やカメラバッグを持ち込み、会場の指定場所に並べることができる」とある。テーブルの貸し出しについては同1〜3行目に、商用の業者に対する貸し出しが説明されているだけで、写真愛好家に対する貸し出しの記載はない。よって、出展する写真愛好家には、テーブルの貸し出しはないと分かる。provide～with …「〜に・・・を提供する」。
（B）③の3～5行目に「数点の小型製品」とあるが、写真愛好家が販売可能な品を限定する記述はない。
（C）①の3行目より、一般入場料は6ドルだが、③の3〜4行目より、写真愛好家が出展するための入場料は50ドルで、一般入場料と同額ではない。the public「一般の人々」。
（D）sign up「参加登録をする」。`,
  metacogFeedbackJa: '',
};

const post03Q3 = {
  id: 'post_03_q3',
  promptEn: 'What does Mr. McDougall mention about his experience at the event last year?',
  promptJa: 'McDougallさんは、昨年のイベントでの経験について何を述べていますか。',
  choices: [
    {
      id: 'a',
      textEn: 'He was representing his employer.',
      textJa: '彼は自身の雇用先を代表して参加していた。',
    },
    {
      id: 'b',
      textEn: 'He learned about new online camera stores.',
      textJa: '彼は、新しいオンラインのカメラ店について知った。',
    },
    {
      id: 'c',
      textEn: 'He found some rare items he wanted.',
      textJa: '彼は欲しかった希少品を見つけた。',
    },
    {
      id: 'd',
      textEn: 'He sold an old camera and bag.',
      textJa: '彼は古いカメラとバッグを売った。',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa: `McDougallさんは④で、昨年のイベントに参加したときの経験について語っている。同2～4行目で、I also ended up finding some accessories for my outdated camera model that I hadn't been able to find online.「また、オンラインでは見つけることができなかった自分の旧型のカメラの付属品をついに見つけることにもなった」と述べているので、探していた希少な品を昨年のイベントの会場で発見できたと考えられる。よって、（C）が正解。rare「希少な、まれな」。
（A） represent「〜の代表として出ている」、employer「雇用企業、雇用者」。
（D）④の2行目で、私は売るものは何もなかった、と述べているので不適切。`,
  metacogFeedbackJa: '',
};

const post03Passage: Passage = {
  id: 'post_03',
  title: 'Press Release - Photography Equipment Swap and Sell',
  direction: 'Questions 1-3 refer to the following press release.',
  directionJa: '問題1-3は次のプレスリリースに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'pressRelease' as const,
      locale: 'en' as const,
      pressRelease: post03PressReleaseEn,
    },
    {
      layoutType: 'pressRelease' as const,
      locale: 'ja' as const,
      pressRelease: post03PressReleaseJa,
    },
  ],
  questions: [post03Q1, post03Q2, post03Q3],
};

// ===== Post-Test 問題4: Chat Tablet (Client Questionnaire) =====

const post04MessagesEn = [
  {
    sender: 'Gail Oneta',
    time: '1:20 P.M.',
    text: 'Hi, Mary. Can you send me a copy of the client questionnaire you mentioned during our meeting yesterday?',
  },
  {
    sender: 'Mary Huang',
    time: '1:21 P.M.',
    text: 'Sure. I will e-mail you the link to it right now.',
  },
  {
    sender: 'Gail Oneta',
    time: '1:22 P.M.',
    text: "OK. Got it. But I can't edit the document for some reason.",
  },
  {
    sender: 'Mary Huang',
    time: '1:23 P.M.',
    text: 'Let me check with Brian Becker. Brian, I just sent Gail a link to the client questionnaire, but she cannot edit it.',
  },
  {
    sender: 'Brian Becker',
    time: '1:24 P.M.',
    text: "It's probably because Gail has not been approved as an editor. Gail, I'll enter your name in the system now.",
  },
  {
    sender: 'Gail Oneta',
    time: '1:25 P.M.',
    text: "OK. Thanks. I'm able to edit now. Would it be OK for me to add a few more questions to the document?",
  },
  {
    sender: 'Brian Becker',
    time: '1:26 P.M.',
    text: "That's fine. But I would limit it to two or three at most. We promised the client that the questionnaire will take only ten minutes to complete.",
  },
  {
    sender: 'Gail Oneta',
    time: '1:27 P.M.',
    text: "OK, understood. I'll keep that in mind.",
  },
  {
    sender: 'Mary Huang',
    time: '1:28 P.M.',
    text: "So Brian, we will see you next on Tuesday at the Querol Health Services Center for the meeting with their team. It will be our first meeting with them, so it's important for us all to be there.",
  },
  {
    sender: 'Brian Becker',
    time: '1:29 P.M.',
    text: "Right. Thanks for reminding me. I'll put it on my calendar.",
  },
];

const post04MessagesJa = [
  {
    sender: 'Gail Oneta',
    time: '午後1時20分',
    text: 'こんにちは、Mary。昨日会議中にあなたが言っていた顧客アンケートを1部、私に送ってもらえますか。',
  },
  {
    sender: 'Mary Huang',
    time: '午後1時21分',
    text: 'いいですよ。今すぐそのリンクをEメールで送ります。',
  },
  {
    sender: 'Gail Oneta',
    time: '午後1時22分',
    text: 'はい。受け取りました。でも、どういうわけか、私はこの文書を編集することができないのです。',
  },
  {
    sender: 'Mary Huang',
    time: '午後1時23分',
    text: 'Brian Beckerに確認してみますね。Brian、私はたった今Gailに顧客アンケートへのリンクを送信したのですが、彼女がそれを編集できないのです。',
  },
  {
    sender: 'Brian Becker',
    time: '午後1時24分',
    text: 'それはおそらく、Gailが編集者として承認されていないからでしょう。Gail、僕が今システムにあなたの名前を入力しますよ。',
  },
  {
    sender: 'Gail Oneta',
    time: '午後1時25分',
    text: '了解。ありがとう。これで編集できるようになりました。文書にあと幾つか質問を加えてもいいですか。',
  },
  {
    sender: 'Brian Becker',
    time: '午後1時26分',
    text: '構いませんよ。でも僕なら、多くてもそれを2つか3つに限定するでしょうね。当社は顧客に、アンケートに全て記入するのに10分しかかからないと約束したのです。',
  },
  {
    sender: 'Gail Oneta',
    time: '午後1時27分',
    text: 'なるほど、分かりました。そのことを心にとどめておきます。',
  },
  {
    sender: 'Mary Huang',
    time: '午後1時28分',
    text: 'それではBrian、次は火曜日にQuerol医療サービスセンターで、先方チームとの会合で会いましょう。それが先方との初会合になるので、その場に私たち全員がいることが大切です。',
  },
  {
    sender: 'Brian Becker',
    time: '午後1時29分',
    text: 'そうですね。思い出させてくれてありがとう。それを僕の予定表に入れておきます。',
  },
];

const post04Q1 = {
  id: 'post_04_q1',
  promptEn: 'At 1:27 P.M., what does Ms. Oneta mean when she writes, "I\'ll keep that in mind"?',
  promptJa:
    '午後1時27分に、Onetaさんは"I\'ll keep that in mind"という発言で、何を意味していますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She must ask permission to access a report.',
      textJa: '彼女は、報告書にアクセスするための許可を求めなければならない。',
    },
    {
      id: 'b',
      textEn: 'She will limit the number of changes she makes to a questionnaire.',
      textJa: '彼女は、アンケートに加える変更の数を限定するつもりである。',
    },
    {
      id: 'c',
      textEn: 'She will remember the password to open a document.',
      textJa: '彼女は、文書を開くためのパスワードを覚えておくつもりである。',
    },
    {
      id: 'd',
      textEn: 'She has been given a strict deadline to complete a task.',
      textJa: '彼女は、作業を完了するのに厳守すべき締め切りを課されている。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `⑥でOnetaさんが文書に質問を加えてもよいかと尋ねているのに対し、Beckerさんは⑦で、構わないと述べながらも、「でも僕なら、多くてもそれを2つか3つに限定するだろう」と伝え、アンケート記入にかかる時間について顧客に10分と約束した、とその理由を説明している。それを受けたOnetaさんはOK, understood. とBeckerさんの助言を受け入れてから下線部の発言をしている。よってBeckerさんの助言に従って、約束した時間内で顧客がアンケートを完了できるよう、加える質問数を限定するつもりだと考えられる。（B）が正解。
（A） permission「許可」、access「～にアクセスする」。
（D） strict「厳密な」、task「作業」。`,
  metacogFeedbackJa: '',
};

const post04Q2 = {
  id: 'post_04_q2',
  promptEn: 'What is Mr. Becker going to note on his calendar?',
  promptJa: 'Beckerさんは自分の予定表に何を書き留めるつもりですか。',
  choices: [
    {
      id: 'a',
      textEn: 'A team review of a document',
      textJa: 'チームでの文書の見直し',
    },
    {
      id: 'b',
      textEn: 'An appointment with a new client',
      textJa: '新規顧客と会う約束',
    },
    {
      id: 'c',
      textEn: 'A celebration of a new contract',
      textJa: '新規契約の祝賀会',
    },
    {
      id: 'd',
      textEn: 'A consultation with a medical professional',
      textJa: '医療専門家との相談',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa: `⑨でHuangさんはBeckerさんに対し、「次は火曜日にQuerol医療サービスセンターで、先方チームとの会合で会おう」と言い、それは初会合なので自分たち全員の参加が大切だ、と伝えている。Beckerさんは、それに答えて⑩で、I'll put it on my calendar.「それを僕の予定表に入れておく」と述べている。よって、新規顧客との初会合を自分の予定表に書き留めるつもりだと分かる。hotel〜を書き留める」。 appointment「会う約束」。
（A） review「見直し、再検討」。
（C） celebration「祝賀会」、contract「契約」。
（D） consultation 「相談」、professional「専門家」。`,
  metacogFeedbackJa: '',
};

const post04Passage: Passage = {
  id: 'post_04',
  title: 'Chat Tablet - Client Questionnaire',
  direction: 'Questions 1-2 refer to the following online chat discussion.',
  directionJa: '問題1-2は次のオンラインチャットの話し合いに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'chatTablet' as const,
      locale: 'en' as const,
      chatTablet: {
        messages: post04MessagesEn,
      },
    },
    {
      layoutType: 'chatTablet' as const,
      locale: 'ja' as const,
      chatTablet: {
        messages: post04MessagesJa,
      },
    },
  ],
  questions: [post04Q1, post04Q2],
};

// ===== Post-Test 問題5: Notice (Bellamy Office Tower) =====

const post05NoticeEn = {
  title: 'Attention Bellamy Office Tower Tenants and Staff',
  body: [
    'Beginning Monday, November 11, and through the end of the month, the mosaic fountains in the lobby area will be repaired and retiled. — [1] —. Most of the work will be done outside of regular business hours. — [2] —.',
    'While the project is ongoing, please enter and exit the building through the rear doors rather than the front doors. — [3] —. Also, please refrain from using the lobby to socialize or make phone calls until the repairs and retiling are finished. — [4] —. The work on the fountains is expected to be done by December 1.',
    'If you have any questions or concerns, e-mail facilities@bellamy.com. Thank you in advance for your cooperation.',
    'Ricardo Nieves, Facilities Manager\nBellamy Office Tower',
  ],
};

const post05NoticeJa = {
  title: 'Bellamy オフィスタワーのテナントとその従業員の皆さまへのお知らせ',
  body: [
    '11月11日月曜日からその月末まで、ロビーエリアのモザイクの噴水が補修され、タイルが張り替えられます。— [1] —。大部分の工事は通常の営業時間外に行われます。— [2] —。',
    '工事が進行している間は、正面玄関ではなく裏口を通って出入りしてください。— [3] —。また、補修とタイルの張り替えが終わるまでは、歓談や通話にロビーを使用することはご遠慮ください。— [4] —。噴水の工事は12月1日までに終わる見込みです。',
    'ご質問やご懸念がありましたら、facilities@bellamy.comにEメールをお送りください。ご協力をよろしくお願いいたします。',
    '施設管理者　Ricardo Nieves\nBellamy オフィスタワー',
  ],
};

const post05Q1 = {
  id: 'post_05_q1',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Instead, consider using the lounge on the tenth floor."',
  promptJa:
    '［1］、［2］、［3］、［4］と記載された箇所のうち、次の文が入るのに最もふさわしいのはどれですか。\n「その代わりに、10階のラウンジの利用をご検討ください」',
  choices: [
    { id: 'a', textEn: '[1]', textJa: '[1]' },
    { id: 'b', textEn: '[2]', textJa: '[2]' },
    { id: 'c', textEn: '[3]', textJa: '[3]' },
    { id: 'd', textEn: '[4]', textJa: '[4]' },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '挿入文では、Instead「その代わりに」と述べてから、10階のラウンジを利用することを勧めている。②2～3行目で、補修とタイル張りが終わるまではロビーでの歓談や通話を控えるよう依頼している。この直後の（D）［4］に挿入文を入れると、工事中はロビーの代わりに10階のラウンジを利用することを勧めていることになり、流れとして適切。\n（A）（B）（C）Insteadが何の代わりを意味するか不明確となり、流れにも合わない。',
  metacogFeedbackJa: '',
};

const post05Passage: Passage = {
  id: 'post_05',
  title: 'Notice - Bellamy Office Tower',
  direction: 'Question 1 refers to the following notice.',
  directionJa: '問題1は次のお知らせに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'notice' as const,
      locale: 'en' as const,
      notice: post05NoticeEn,
    },
    {
      layoutType: 'notice' as const,
      locale: 'ja' as const,
      notice: post05NoticeJa,
    },
  ],
  questions: [post05Q1],
};

// ===== Post-Test 問題6: Package Tracking + Email =====

const post06TrackingEn = {
  title: 'National Package Service (NPS) Package Tracking',
  subtitle: 'Shipment number: DM5671',
  columns: ['Location', 'Date', 'Local time', 'Action'],
  rows: [
    ['Baltimore, MD', 'May 2', '7:15 A.M.', 'Origin scan'],
    ['Baltimore, MD', 'May 2', '8:22 A.M.', 'Departure scan'],
    ['Hartford, CT', 'May 3', '4:48 P.M.', 'Arrival scan'],
    ['Hartford, CT', 'May 4', '6:30 A.M.', 'Departure scan'],
    ['Lowell, MA', 'May 4', '3:43 P.M.', 'Arrival scan'],
    ['Lowell, MA', 'May 5', '9:47 A.M.', 'Departure scan'],
    ['Windham, NH', 'May 5', '1:26 P.M.', 'Arrival scan'],
    ['Windham, NH', 'May 5', '5:17 P.M.', 'Loaded for delivery'],
    ['Windham, NH', 'May 6', '7:34 A.M.', 'Delivered'],
  ],
  footerLeft: [
    { label: 'Shipped by:', value: 'Deymantis, Inc.' },
    { label: 'Shipment category:', value: 'Package' },
    { label: 'Billed on:', value: 'May 1' },
  ],
  footerRight: [
    { label: 'Weight:', value: '23.5 kilograms' },
    { label: 'Service:', value: 'Ground shipment' },
    { label: 'Message on package:', value: 'Shipment of part number 264' },
  ],
};

const post06TrackingJa = {
  title: '全国小包配送便（NPS）小包追跡',
  subtitle: '配達番号：DM5671',
  columns: ['場所', '日付', '現地時間', '実施（事項）'],
  rows: [
    ['ボルティモア, MD', '5月2日', '午前7時15分', '発送元の読み取り'],
    ['ボルティモア, MD', '5月2日', '午前8時22分', '出発の読み取り'],
    ['ハートフォード, CT', '5月3日', '午後4時48分', '到着の読み取り'],
    ['ハートフォード, CT', '5月4日', '午前6時30分', '出発の読み取り'],
    ['ローウェル, MA', '5月4日', '午後3時43分', '到着の読み取り'],
    ['ローウェル, MA', '5月5日', '午前9時47分', '出発の読み取り'],
    ['ウィンダム, NH', '5月5日', '午後1時26分', '到着の読み取り'],
    ['ウィンダム, NH', '5月5日', '午後5時17分', '配達のため積載完了'],
    ['ウィンダム, NH', '5月6日', '午前7時34分', '配達完了'],
  ],
  footerLeft: [
    { label: '発送者：', value: 'Deymantis社' },
    { label: '配送区分：', value: '小包' },
    { label: '請求日：', value: '5月1日' },
  ],
  footerRight: [
    { label: '重量：', value: '23.5キログラム' },
    { label: '送付方法：', value: '陸送' },
    { label: '小包の伝言欄：', value: '番号264の部品の発送' },
  ],
};

const post06EmailEn = {
  to: 'Mervin Hartley',
  from: 'Caroline Launey',
  date: 'May 11',
  subject: 'Re: Deymantis package',
  greeting: 'Dear Mr. Hartley,',
  body: [
    'We received the package ahead of schedule and were able to install the Deymantis blade (part 264) on the day it arrived and test it the next day. We closed the mill to test the blade on various lengths and types of damaged lumber. The tests with the new cutting blade were successful, and so Monday was our first day at full operational status. I will send you an initial report on our revised processing times by the end of this week.',
  ],
  closing: 'Sincerely,',
  signature: {
    name: 'Caroline Launey',
    title: 'Milford Lumber Mill',
  },
};

const post06EmailJa = {
  to: 'Mervin Hartley',
  from: 'Caroline Launey',
  date: '5月11日',
  subject: 'Re：Deymantis社の小包',
  greeting: 'Hartley様',
  body: [
    '私たちは予定よりも早く小包を受け取り、到着したその日にDeymantis社製の刃（部品264）を取り付け、翌日にはそれをテストすることができました。私たちは製材所を休業して、さまざまな長さや種類の傷んだ木材でその刃をテストしました。この新しい切断用の刃を使ったテストは成功し、従って月曜日は当製材所のフル稼働初日となりました。今週末までに、あなたに修正された処理時間に関する初回報告書をお送りします。',
  ],
  closing: '敬具',
  signature: {
    name: 'Caroline Launey',
    title: 'Milford製材所',
  },
};

const post06Q1 = {
  id: 'post_06_q1',
  promptEn: 'Why did Ms. Launey write the e-mail?',
  promptJa: 'LauneyさんはなぜEメールを書いたのですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To provide an update',
      textJa: '最新情報を提供するため',
    },
    {
      id: 'b',
      textEn: 'To explain a delay',
      textJa: '遅延について説明するため',
    },
    {
      id: 'c',
      textEn: 'To order a new part',
      textJa: '新しい部品を注文するため',
    },
    {
      id: 'd',
      textEn: 'To request a report',
      textJa: '報告を求めるため',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    'Launeyさんは2つ目の本文のEメールの①1～2行目で「私たちは予定よりも早く小包を受け取り、到着したその日にDeymantis社製の刃（部品264）を取り付け、翌日にはそれをテストすることができた」と知らせている。さらに同3〜4行目で、The tests with the new cutting blade were successful, and so Monday was our first day at full operational status.「この新しい切断用の刃を使ったテストは成功し、従って月曜日は当製材所のフル稼働初日となった」と、届いた部品を試した結果と製材所の稼動状況を報告している。よって、Launeyさんは最新の状況を伝えるためにHartleyさん宛てにEメールを書いたと分かる。provide「～を提供する」、update「最新情報」。\n（B）explain「～を説明する」、delay「遅延」。\n（D）2つ目の本文の①4～5行目で、Launeyさんは報告書を送ると述べており、求めてはいない。request「～を求める」。',
  metacogFeedbackJa: '',
};

const post06Q2 = {
  id: 'post_06_q2',
  promptEn: 'When was part number 264 tested?',
  promptJa: '番号264の部品はいつテストされましたか。',
  choices: [
    {
      id: 'a',
      textEn: 'On May 2',
      textJa: '5月2日',
    },
    {
      id: 'b',
      textEn: 'On May 6',
      textJa: '5月6日',
    },
    {
      id: 'c',
      textEn: 'On May 7',
      textJa: '5月7日',
    },
    {
      id: 'd',
      textEn: 'On May 11',
      textJa: '5月11日',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '2つ目の本文の①1~2行目に、We ...... were able to install the Deymantis blade (part 264) on the day it arrived and test it the next day.「私たちは到着したその日にDeymantis社製の刃（部品264）を取り付け、翌日にはそれをテストすることができた」とある。1つ目の本文の①右端欄の「実施（事項）」の10行目のDelivered「配達完了」より、番号264の部品の小包配達が完了したのは5月6日なので、テストが行われたのはその翌日の5月7日と分かる。',
  metacogFeedbackJa: '',
};

const post06Q3 = {
  id: 'post_06_q3',
  promptEn: 'According to the e-mail, what will part number 264 most likely be used for?',
  promptJa: 'Eメールによると、番号264の部品は何のために使用されると考えられますか。',
  choices: [
    {
      id: 'a',
      textEn: 'Breaking concrete',
      textJa: 'コンクリートを破砕するため',
    },
    {
      id: 'b',
      textEn: 'Polishing metal',
      textJa: '金属を研磨するため',
    },
    {
      id: 'c',
      textEn: 'Shaping glass',
      textJa: 'ガラスを成形するため',
    },
    {
      id: 'd',
      textEn: 'Cutting wood',
      textJa: '木材を切断するため',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    '2つ目の本文の最後にある送信者の所属先にMilford Lumber Mill「Milford製材所」とある。また、同①1～2行目に、the Deymantis blade（part 264）「Deymantis社製の刃（部品264）」とあることから、番号264の部品とは刃であると分かる。続けて、同2〜3行目でその刃について、We closed the mill to test the blade on various lengths and types of damaged lumber.「私たちは製材所を休業して、さまざまな長さや種類の傷んだ木材でその刃をテストした」と述べ、さらに同3～4行目でThe tests with the new cutting blade were successful「この新しい切断用の刃を使ったテストは成功した」と伝えている。よって、番号264の部品は木材を切るために使用されると考えられる。\n（A） concrete「コンクリート」。\n（B） polish「～を磨く」、metal「金属」。\n（C） shape「〜を成形する」。',
  metacogFeedbackJa: '',
};

const post06Passage: Passage = {
  id: 'post_06',
  title: 'Package Tracking and Email',
  direction: 'Questions 1-3 refer to the following tracking information and e-mail.',
  directionJa: '問題1-3は次の追跡情報とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'packageTracking' as const,
      locale: 'en' as const,
      packageTracking: post06TrackingEn,
    },
    {
      layoutType: 'packageTracking' as const,
      locale: 'ja' as const,
      packageTracking: post06TrackingJa,
    },
    {
      layoutType: 'emailForm' as const,
      locale: 'en' as const,
      emailForm: post06EmailEn,
    },
    {
      layoutType: 'emailForm' as const,
      locale: 'ja' as const,
      emailForm: post06EmailJa,
    },
  ],
  questions: [post06Q1, post06Q2, post06Q3],
};

// ===== Post-Test 問題7: Advertisement, Invoice, and E-mail (Green Lyre Office Furniture) =====

const post07Q1 = {
  id: 'post_07_q1',
  promptEn: 'What is suggested about Hainey Medical Clinic?',
  promptJa: 'Hainey診療所について何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'It is not located in Somerfield.',
      textJa: '同診療所はサマーフィールド市内に位置していない。',
    },
    {
      id: 'b',
      textEn: "Its waiting room includes a children's play area.",
      textJa: '同診療所の待合室には子どもの遊び場がある。',
    },
    {
      id: 'c',
      textEn: 'It has just enlarged its waiting room.',
      textJa: '同診療所は待合室を拡張したばかりである。',
    },
    {
      id: 'd',
      textEn: 'It has recently moved to a new location.',
      textJa: '同診療所は最近、新しい場所に移った。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '1つ目の本文の家具店の広告の②1行目に、Delivery service is available and free to locations within Somerfield city limits.「配送サービスが利用可能で、サマーフィールド市内の場所なら無料だ」とある。2つ目の本文の請求書は①3行目より、同店からHainey診療所に宛てたもの。同②右下のDelivery「配送料」の欄に100.00ドルと記載があるので、注文には配送料がかかっている。よってHainey診療所はサマーフィールド市内には位置していないと分かる。be located in～「～に位置している、～にある」。\n（B） waiting room「待合室」、include「～を含む」、play area「遊び場」。\n（C） enlarge「～を拡張する」。',
  metacogFeedbackJa: '',
};

const post07Q2 = {
  id: 'post_07_q2',
  promptEn: 'Why did Mr. Byrne send the e-mail?',
  promptJa: 'Byrneさんはなぜ Eメールを送りましたか。',
  choices: [
    { id: 'a', textEn: 'To make a purchase', textJa: '購入をするため' },
    { id: 'b', textEn: 'To answer a question', textJa: '質問に答えるため' },
    { id: 'c', textEn: 'To schedule an appointment', textJa: '約束の日程を取り決めるため' },
    { id: 'd', textEn: 'To describe some product features', textJa: '製品の特徴を説明するため' },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '3つ目の本文のEメールは、Green Lyreオフィス家具店のByrneさんが、Hainey診療所のKaiさん宛てに送ったもの。Byrneさんは、同①1～2行目で、Kaiさんからの留守番電話を受け、折り返し電話したが、診療所は業務を終了していたと述べている。同3〜4行目で、Then you asked whether you could receive a refund.「それからあなたは、払い戻しを受けられるかどうか尋ねた」と述べてから、続く4～5行目で、Unfortunately, your purchase is not refundable, but I would like to accommodate you by offering an exchange.「あいにく、今回の購入は払い戻しが利かないが、交換を提供することによって要望に応じたいと思う」と、Kaiさんの質問に回答しているので、（B）が正解。\n（A） make a purchase「購入する」。\n（D） 3つ目の本文の①5～8行目で、Byrneさんは交換する製品に言及しているが、その特徴を説明してはいない。describe「～を説明する」、feature「特徴」。',
  metacogFeedbackJa: '',
};

const post07Q3 = {
  id: 'post_07_q3',
  promptEn: 'What extra item does the store offer to add to the order?',
  promptJa: '店は、注文分にどの追加商品を加えると申し出ていますか。',
  choices: [
    { id: 'a', textEn: 'MT-5047', textJa: 'MT-5047' },
    { id: 'b', textEn: 'MT-2956', textJa: 'MT-2956' },
    { id: 'c', textEn: 'MT-0632', textJa: 'MT-0632' },
    { id: 'd', textEn: 'MT-4278', textJa: 'MT-4278' },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '3つ目の本文の①5～6行目で、Green Lyreオフィス家具店のByrneさんは、Kaiさんが注文したソファの代わりにGreen Lyreの二人掛けレザーソファを提供することを申し出てから、続く同6～8行目でif you accept the love seat, I would also let you have an additional Green Lyre Reception Chair, all for the same total price as on the original invoice「もしこの二人掛けソファを了承してくれるなら、全て合わせて元の請求書にあるのと同じ合計金額で追加のGreen Lyreレセプションチェアも1脚付けたい」と述べている。2つ目の本文の請求書の②で、Reception Chair「レセプションチェア」のItem Number「商品番号」はMT-5047と記されているので、（A）が正解。extra「追加の、余分の」、add～to…「～を…に追加する」。',
  metacogFeedbackJa: '',
};

const post07Passage: Passage = {
  id: 'post_07',
  title: 'Advertisement, Invoice, and E-mail - Green Lyre Office Furniture',
  direction: 'Questions 1-3 refer to the following advertisement, invoice, and e-mail.',
  directionJa: '問題1-3は次の広告、請求書、Eメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    // English advertisement
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: {
        headline: 'GREEN LYRE OFFICE FURNITURE',
        subheading: 'DECEMBER SALE',
        body: [
          'We are making room for new models and products. Save 40 percent off all in-stock Green Lyre brand furniture, and save 30 percent off all other furniture brands in stock. All sales are final.',
          'Delivery service is available and free to locations within Somerfield city limits. Pick-up and disposal of old furniture is also offered.',
          'Start shopping now! Go to www.greenlyreofficefurniture.com or visit our showroom at 174 E. Landover Street.',
        ],
      },
    },
    // Japanese advertisement
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: {
        headline: 'Green Lyre オフィス家具店',
        subheading: '12月のセール',
        body: [
          '当店は現在、新モデルや新製品のためのスペースを準備中です。Green Lyreブランドの家具の全在庫品が40パーセント引き、その他の家具ブランドの全在庫品は30パーセント引きでお買得です。特売は全て最終です。',
          '配送サービスがご利用可能で、サマーフィールド市内の場所であれば無料です。古い家具の集荷と処分も行っております。',
          '今すぐ買い物を始めましょう！www.greenlyreofficefurniture.comにアクセスしていただくか、もしくは東ランドオーバー通り174番地の当店ショールームへお越しください。',
        ],
      },
    },
    // English invoice
    {
      layoutType: 'invoice' as const,
      locale: 'en' as const,
      invoice: {
        title: 'Green Lyre Office Furniture Invoice',
        customerInfo: [
          { label: 'Purchased by:', value: 'Jasmine Kai, Office Manager' },
          { label: '', value: 'Hainey Medical Clinic' },
          { label: 'Phone:', value: '(210) 555-0108' },
          { label: 'Order number:', value: 'G90123' },
        ],
        columns: ['Description', 'Item Number', 'Color', 'Quantity', 'Total Price'],
        items: [
          ['Reception Chair', 'MT-5047', 'Gray', '2', '$376.00'],
          ['Lounge Chair', 'MT-2956', 'Gray', '2', '$1,100.00'],
          ['Accent Chair', 'MT-0632', 'Black', '1', '$330.00'],
          ['Leather Sofa', 'MT-4278', 'Gray', '1', '$1,325.00'],
        ],
        summary: [
          { label: 'Subtotal:', value: '$3,131.00' },
          { label: 'Discount (40%):', value: '- $1,252.40' },
          { label: 'Delivery:', value: '+ $100.00' },
          { label: 'Total Charges:', value: '$1,978.60' },
        ],
      },
    },
    // Japanese invoice
    {
      layoutType: 'invoice' as const,
      locale: 'ja' as const,
      invoice: {
        title: 'Green Lyre オフィス家具店請求書',
        customerInfo: [
          { label: '購入者：', value: 'Jasmine Kai　事務長' },
          { label: '', value: 'Hainey診療所' },
          { label: '電話：', value: '(210) 555-0108' },
          { label: '注文番号：', value: 'G90123' },
        ],
        columns: ['品目', '商品番号', '色', '数', '合計価格'],
        items: [
          ['レセプションチェア', 'MT-5047', 'グレー', '2', '376.00ドル'],
          ['ラウンジチェア', 'MT-2956', 'グレー', '2', '1,100.00ドル'],
          ['アクセントチェア', 'MT-0632', '黒', '1', '330.00ドル'],
          ['レザーソファ', 'MT-4278', 'グレー', '1', '1,325.00ドル'],
        ],
        summary: [
          { label: '小計：', value: '3,131.00ドル' },
          { label: '割引（40パーセント）：', value: '−1,252.40ドル' },
          { label: '配送料：', value: '+100.00ドル' },
          { label: '合計請求額：', value: '1,978.60ドル' },
        ],
      },
    },
    // English email
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: {
        headers: [
          { label: 'To:', value: 'Jasmine Kai <jkai@haineymed.com>' },
          { label: 'From:', value: 'Colin Byrne <cbyrne@greenlyreofficefurniture.com>' },
          { label: 'Date:', value: 'December 10' },
          { label: 'Subject:', value: 'Your recent voicemail' },
        ],
        body: [
          'Dear Ms. Kai:',
          "I received your voicemail regarding your order number G90123, but your office was closed when I tried to return your call. You mentioned that you realized the sofa you ordered is unlikely to fit in the intended space in your clinic's waiting area. Then you asked whether you could receive a refund. Unfortunately, your purchase is not refundable, but I would like to accommodate you by offering an exchange. I can provide you with a Green Lyre Leather Love Seat in place of the sofa. And if you accept the love seat, I would also let you have an additional Green Lyre Reception Chair, all for the same total price as on the original invoice. Let me know if this will work.",
          'Thank you for shopping at Green Lyre Office Furniture.',
          'Sincerely yours,',
          'Colin Byrne, Sales Manager',
        ],
      },
    },
    // Japanese email
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: {
        headers: [
          { label: '宛先：', value: 'Jasmine Kai <jkai@haineymed.com>' },
          { label: '送信者：', value: 'Colin Byrne <cbyrne@greenlyreofficefurniture.com>' },
          { label: '日付：', value: '12月10日' },
          { label: '件名：', value: 'お客さまの先の留守番電話' },
        ],
        body: [
          'Kai様',
          'ご注文番号G90123に関するあなたの留守番電話を受信いたしましたが、私が折り返しお電話を差し上げようとしたところ、貴診療所は業務を終了しておりました。あなたは、ご注文なさったソファが診療所の待合室内の計画していたスペースに収まりそうにないことが分かったとおっしゃいました。それからあなたは、払い戻しを受けられるかどうかお尋ねでした。あいにく、今回のご購入は払い戻しが利きませんが、交換をご提供することによってご要望に応じたいと存じます。そのソファの代わりに、Green Lyreの二人掛けレザーソファを提供することが可能です。もしこの二人掛けソファをご了承いただけるようでしたら、全て合わせて元の請求書にあるのと同じ合計金額で追加のGreen Lyreレセプションチェアも1脚お付けしたいと思います。こちらでよろしいかどうかご連絡ください。',
          'Green Lyre オフィス家具店でご購入いただき、ありがとうございます。',
          '敬具',
          'Colin Byrne　営業部長',
        ],
      },
    },
  ],
  questions: [post07Q1, post07Q2, post07Q3],
};

// ===== Post-Test 問題8: Email Form + Conference Schedule =====

const post08Email1En = {
  to: 'Won Ho Kang',
  from: 'Ayaz Naseem',
  date: '2 February',
  subject: 'Introduction to Korean market',
  greeting: 'Dear Won Ho,',
  body: [
    'I recently joined Hample Asset Managers in Sydney as an emerging business analyst with a particular focus on software technology companies. I would like to research some of the new related small businesses in Korea and have a couple of questions for you. In your opinion, what brokerage firm runs the best technology conference there? And are there any software startups that you know of that I should focus on?',
    'I look forward to hearing from you.',
  ],
  closing: 'Many thanks,',
  signature: {
    name: 'Ayaz Naseem',
    title: 'Analyst, Hample Asset Managers',
  },
};

const post08Email1Ja = {
  to: 'Won Ho Kang',
  from: 'Ayaz Naseem',
  date: '2月2日',
  subject: '韓国市場へのご紹介',
  greeting: 'Won Hoさん',
  body: [
    '私は、ソフトウエアテクノロジー企業に特に重点を置く新興ビジネスのアナリストとして、シドニーのHample資産管理会社に最近入社いたしました。韓国の関連する新規中小企業のいくつかを調査したいと思っており、あなたに2点お聞きしたいことがあります。あなたのお考えでは、韓国でどの仲介業者が最良のテクノロジー商談会を運営していますか。また、ご存じのソフトウエア新興企業で、私が重点を置くべき企業はありますか。',
    'ご連絡をお待ちしております。',
  ],
  closing: 'よろしくお願いいたします。',
  signature: {
    name: 'Ayaz Naseem',
    title: 'アナリスト、Hample資産管理会社',
  },
};

const post08Email2En = {
  to: 'Ayaz Naseem',
  from: 'Won Ho Kang',
  date: '3 February',
  subject: 'Re: Introduction to Korean market',
  greeting: 'Hi, Ayaz,',
  body: [
    "It is a pleasure to make your acquaintance. My work is also focused on software technology. To respond to your questions, WR Asiana's conference is definitely the best and is scheduled to take place in Seoul next May. I will be attending the conference with a few colleagues, and I highly recommend that you join us. If you would like, I could forward contact information to you for the salesperson that covers your sector, and you can make your reservations through her.",
    'It would be great to meet you in person if you are able to come. Also, feel free to reach out if you need help finding your way around the city.',
  ],
  closing: 'Best,',
  signature: {
    name: 'Won Ho Kang',
    title: 'Senior Analyst, Hample Asset Managers',
  },
};

const post08Email2Ja = {
  to: 'Ayaz Naseem',
  from: 'Won Ho Kang',
  date: '2月3日',
  subject: 'Re: 韓国市場へのご紹介',
  greeting: 'Ayazさん',
  body: [
    'あなたとお知り合いになれてうれしく思います。私の仕事もソフトウエアテクノロジーに重点を置いています。ご質問にお答えしますと、WR Asiana社の協議会が間違いなく最良で、この5月にソウルで開催される予定です。私は数名の同僚とその協議会に出席することにしており、あなたも参加されることをぜひお勧めします。もしよろしければ、私たちの分野を担当する営業員の方の連絡先をあなたにお送りしますので、彼女を通してご自身の予約をすることが可能です。',
    'あなたがおいでになるなら、直接お会いできると大変うれしく思います。また、市内を回るのに手助けが必要でしたらお気兼ねなくご連絡ください。',
  ],
  closing: '敬具',
  signature: {
    name: 'Won Ho Kang',
    title: '上級アナリスト、Hample資産管理会社',
  },
};

const post08ScheduleEn = {
  title: 'WR Asiana Technology Conference, Thursday, 8 May',
  subtitle: 'Afternoon schedule, continued',
  subtitle2: 'Concurrent Business Sessions—2:00 to 3:00 P.M.',
  columns: ['', '1', '2', '3', '4'],
  rows: [
    {
      label: 'Sector',
      values: ['Internet', 'Software', 'Hardware', 'Mobile Phones'],
    },
    {
      label: 'Company',
      values: ['Wingbae Tech', 'Kedia', 'Namhaejin Max', 'Vindoh'],
    },
    {
      label: 'Room',
      values: ['Petunia Room', 'Rose Hall', 'Lily Suite', 'Tulip Salon'],
    },
  ],
};

const post08ScheduleJa = {
  title: 'WR Asiana社テクノロジー協議会　5月8日木曜日',
  subtitle: '午後の予定表、続き',
  subtitle2: '同時進行となるビジネスセッション—午後2時から3時まで',
  columns: ['', '1', '2', '3', '4'],
  rows: [
    {
      label: '分野',
      values: ['インターネット', 'ソフトウェア', 'ハードウェア', '携帯電話'],
    },
    {
      label: '企業',
      values: ['Wingbae Tech社', 'Kedia社', 'Namhaejin Max社', 'Vindoh社'],
    },
    {
      label: '部屋',
      values: ['ペチュニア・ルーム', 'バラ・ホール', 'ユリ・スイート', 'チューリップ・サロン'],
    },
  ],
};

const post08Q1 = {
  id: 'post_08_q1',
  promptEn: 'Why did Mr. Naseem write the first e-mail?',
  promptJa: 'Naseemさんはなぜ1通目のEメールを書いたのですか。',
  choices: [
    { id: 'a', textEn: 'To ask for directions to a meeting', textJa: '会議への行き方を尋ねるため' },
    {
      id: 'b',
      textEn: 'To request information on companies',
      textJa: '企業に関する情報を求めるため',
    },
    {
      id: 'c',
      textEn: 'To offer investment advice',
      textJa: '投資の助言を与えるため',
    },
    {
      id: 'd',
      textEn: "To learn more about Mr. Kang's job",
      textJa: 'Kangさんの仕事についてもっと知るため',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '1通目のEメールの①2〜3行目で、NaseemさんはKangさんに宛てて「韓国の関連する新規中小企業のいくつかを調査したいと思っており、あなたに2点お聞きしたい」と述べています。質問は「韓国でどの仲介業者が最良のテクノロジー協議会を運営しているか」と「ご存じのソフトウエア新興企業で、私が重点を置くべき企業はあるか」という、企業に関する2つの情報を求めるものです。よって、（B）が正解。',
  metacogFeedbackJa: '',
};

const post08Q2 = {
  id: 'post_08_q2',
  promptEn: 'According to Mr. Kang, how should Mr. Naseem arrange his attendance at a conference?',
  promptJa: 'Kangさんによると、Naseemさんは自身の協議会への出席をどのように手配すべきですか。',
  choices: [
    {
      id: 'a',
      textEn: 'By calling a customer service department',
      textJa: '顧客サービス部門に電話することによって',
    },
    {
      id: 'b',
      textEn: 'By speaking with a travel agent',
      textJa: '旅行業者と話をすることによって',
    },
    { id: 'c', textEn: 'By contacting a salesperson', textJa: '営業員に連絡することによって' },
    {
      id: 'd',
      textEn: "By visiting WR Asiana's Web site",
      textJa: 'WR Asiana社のウェブサイトにアクセスすることによって',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '2通目のEメールでKangさんは、NaseemさんにWR Asiana社の協議会への参加を勧め、「もしよろしければ、私たちの分野を担当する営業員の方の連絡先をあなたにお送りしますので、彼女を通してご自身の予約をすることが可能です」と述べています。つまり、WR Asiana社の営業員をNaseemさんに紹介するので、自身で直接その営業員に連絡して協議会への出席予約をするよう説明しています。よって、（C）が正解。',
  metacogFeedbackJa: '',
};

const post08Q3 = {
  id: 'post_08_q3',
  promptEn: 'What is suggested about Mr. Kang?',
  promptJa: 'Kangさんについて何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'He travels regularly to Sydney.',
      textJa: '彼は定期的にシドニーへ旅行する。',
    },
    {
      id: 'b',
      textEn: 'He does not like attending professional conferences.',
      textJa: '彼は専門的な協議会に出席することを好まない。',
    },
    { id: 'c', textEn: 'He lives outside of Seoul.', textJa: '彼はソウルの外に住んでいる。' },
    {
      id: 'd',
      textEn: "He forgot to answer all of Mr. Naseem's questions.",
      textJa: '彼はNaseemさんの質問の全てに答えるのを忘れた。',
    },
  ],
  correctChoiceId: 'd',
  explanationGeneralJa:
    'Naseemさんは、1通目のEメールで「韓国でどの仲介業者が最良のテクノロジー協議会を運営しているか」と「ソフトウエア新興企業で、私が重点を置くべき企業はあるか」という2つの質問をしています。それに対しKangさんは、2通目のEメールで1つ目の質問に「WR Asiana社の協議会が間違いなく最良で、この5月にソウルで開催される予定だ」と答えていますが、2つ目の質問である重点を置くべきソフトウエア新興企業については答えていません。よって、（D）が正解。',
  metacogFeedbackJa: '',
};

const post08Q4 = {
  id: 'post_08_q4',
  promptEn: 'What session will Mr. Kang most likely attend at 2 P.M. on May 8?',
  promptJa: 'Kangさんは5月8日午後2時に、どのセッションに出席すると考えられますか。',
  choices: [
    { id: 'a', textEn: "Wingbae Tech's session", textJa: 'Wingbae Tech社のセッション' },
    { id: 'b', textEn: "Kedia's session", textJa: 'Kedia社のセッション' },
    { id: 'c', textEn: "Namhaejin Max's session", textJa: 'Namhaejin Max社のセッション' },
    { id: 'd', textEn: "Vindoh's session", textJa: 'Vindoh社のセッション' },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '予定表は5月8日に開かれるWR Asiana社のテクノロジー協議会の午後2時から3時の間に同時進行するセッションを示しています。Kangさんは2通目のEメールで「私の仕事もソフトウエアテクノロジーに重点を置いている」と述べています。予定表のソフトウェアの列を見ると、すぐ下の企業名にKediaとあるので、Kangさんは自身が重点を置く分野の（B）「Kedia社のセッション」に出席すると考えられます。',
  metacogFeedbackJa: '',
};

const post08Passage: Passage = {
  id: 'post_08',
  title: 'E-mails and Schedule - Korean Market',
  direction: 'Questions 1-4 refer to the following e-mails and schedule.',
  directionJa: '問題1-4は次の2通のEメールと予定表に関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'emailForm' as const,
      locale: 'en' as const,
      emailForm: post08Email1En,
    },
    {
      layoutType: 'emailForm' as const,
      locale: 'ja' as const,
      emailForm: post08Email1Ja,
    },
    {
      layoutType: 'emailForm' as const,
      locale: 'en' as const,
      emailForm: post08Email2En,
    },
    {
      layoutType: 'emailForm' as const,
      locale: 'ja' as const,
      emailForm: post08Email2Ja,
    },
    {
      layoutType: 'conferenceSchedule' as const,
      locale: 'en' as const,
      conferenceSchedule: post08ScheduleEn,
    },
    {
      layoutType: 'conferenceSchedule' as const,
      locale: 'ja' as const,
      conferenceSchedule: post08ScheduleJa,
    },
  ],
  questions: [post08Q1, post08Q2, post08Q3, post08Q4],
};

export const mockPrePassages: Passage[] = [
  pre01Passage,
  pre02Passage,
  pre03Passage,
  pre04Passage,
  pre05Passage,
  pre06Passage,
  pre07Passage,
  pre08Passage,
];

export const mockPostPassages: Passage[] = [
  post01Passage,
  post02Passage,
  post03Passage,
  post04Passage,
  post05Passage,
  post06Passage,
  post07Passage,
  post08Passage,
];

// ===== Tutorial (例) 用ダミー問題 =====

const tutorialQ1: Question = {
  id: 'tutorial_q1',
  promptEn: 'What is the main purpose of this e-mail?',
  promptJa: 'このEメールの主な目的は何ですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To announce a company event',
      textJa: '会社のイベントを告知するため',
    },
    {
      id: 'b',
      textEn: 'To request a meeting',
      textJa: '会議を依頼するため',
    },
    {
      id: 'c',
      textEn: 'To confirm a reservation',
      textJa: '予約を確認するため',
    },
    {
      id: 'd',
      textEn: 'To introduce a new employee',
      textJa: '新しい従業員を紹介するため',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    'これは操作練習用のサンプル問題です。本番の問題では、このように解説が表示されます。Eメールの1段落目に「来月開催予定のイベントについてお知らせします」とあることから、（A）が正解です。',
};

export const tutorialPassage: Passage = {
  id: 'tutorial',
  title: 'Sample E-mail',
  direction: 'Question 1 refers to the following e-mail.',
  directionJa: '問題1は次のEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'emailTable' as const,
      locale: 'en' as const,
      emailTable: {
        headers: [
          { label: 'To:', value: 'All Staff' },
          { label: 'From:', value: 'John Smith' },
          { label: 'Date:', value: 'January 15' },
          { label: 'Subject:', value: 'Upcoming Event' },
        ],
        body: [
          'Dear colleagues,',
          'I am writing to inform you about an event scheduled for next month. The annual company gathering will be held on February 20 at the main conference hall.',
          'Please mark your calendars and confirm your attendance by January 25.',
          'Best regards,',
          'John Smith',
        ],
      },
    },
    {
      layoutType: 'emailTable' as const,
      locale: 'ja' as const,
      emailTable: {
        headers: [
          { label: '宛先：', value: '全スタッフ' },
          { label: '送信者：', value: 'John Smith' },
          { label: '日付：', value: '1月15日' },
          { label: '件名：', value: '今後のイベント' },
        ],
        body: [
          '同僚の皆様',
          '来月開催予定のイベントについてお知らせします。年次全社集会は2月20日にメイン会議室で開催されます。',
          'カレンダーに印をつけ、1月25日までに出席確認をお願いいたします。',
          'よろしくお願いいたします。',
          'John Smith',
        ],
      },
    },
  ],
  questions: [tutorialQ1],
};
