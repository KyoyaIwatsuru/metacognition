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
  direction: 'Q1-4 refer to the following advertisement and letter.',
  directionJa: '問題Q1-4は次の広告と手紙に関するものです。',
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
        headline: 'KELLER衣装',
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

// ===== tr_01 類題1: Riverton Workspace Services =====

const tr01Analog1AdBodyEn = [
  'Need a meeting room on short notice? Riverton Workspace Services now lets employees reserve rooms online for any of our three downtown locations.',
  'Each room includes a display screen, video-conferencing equipment, and a whiteboard. To reserve, visit intranet.rivertonws.com and select a location, date, and time. If you are unsure which room size you need, a scheduling specialist can assist you via live chat.',
  'Standard reservations are confirmed within two hours. For urgent requests, we offer priority confirmation within 15 minutes for an additional fee of $25.',
];

const tr01Analog1AdBodyJa = [
  '急な会議室の手配が必要ですか。リバートン・ワークスペース・サービスでは、ダウンタウンにある3つの拠点の会議室を、社員がオンラインで予約できるようになりました。',
  '各会議室には、ディスプレイ画面、ビデオ会議機器、ホワイトボードが備え付けられています。予約するには、intranet.rivertonws.com にアクセスし、拠点・日付・時間を選択してください。必要な部屋の広さが分からない場合は、スケジューリング担当者がライブチャットでサポートします。',
  '通常の予約は2時間以内に確定します。緊急の依頼には、追加料金25ドルで15分以内に優先確定するサービスがあります。',
];

const tr01Analog1EmailBodyEn = [
  'I booked a conference room through Riverton Workspace Services for a product demo with visiting partners. Because the agenda changed, I selected priority confirmation and entered the address of the Harbor Street location.',
  'The confirmation came quickly, but it listed the Pine Avenue location instead. I was already traveling to Harbor Street when I noticed the mistake.',
  'Your support team handled it exceptionally well. Since the Harbor Street rooms were fully booked, they secured a comparable room at a nearby business center and arranged the video-conferencing setup at no extra cost to me.',
  'I appreciate how smoothly everything was resolved. I will definitely use Riverton Workspace Services again.',
];

const tr01Analog1EmailBodyJa = [
  '私は、来訪する提携先との製品デモのために、リバートン・ワークスペース・サービスで会議室を予約しました。予定が変更になったため、優先確定サービスを選び、Harbor Street拠点の住所を入力しました。',
  '確定連絡はすぐに届きましたが、Pine Avenue拠点になっていました。誤りに気づいた時、私はすでにHarbor Streetへ移動中でした。',
  '貴社のサポートチームは非常に見事に対応してくれました。Harbor Streetの部屋が満室だったため、近くのビジネスセンターで同程度の部屋を確保し、ビデオ会議の設定も追加費用なしで手配してくれました。',
  'すべてが円滑に解決したことに感謝しています。今後も必ずリバートン・ワークスペース・サービスを利用します。',
];

const tr01Analog1Q1 = {
  id: 'tr_01_an1_q1',
  promptEn: 'Why did Ms. Chen write to Mr. Ortiz?',
  promptJa: 'ChenさんはなぜOrtizさんにEメールを書きましたか。',
  choices: [
    {
      id: 'tr_01_an1_q1_a',
      textEn: 'To complain about the quality of the video equipment',
      textJa: 'ビデオ機器の品質について苦情を言うため',
    },
    {
      id: 'tr_01_an1_q1_b',
      textEn: 'To request a refund for a reservation fee',
      textJa: '予約料金の返金を求めるため',
    },
    {
      id: 'tr_01_an1_q1_c',
      textEn: 'To praise the support team for resolving a problem',
      textJa: '問題解決をしたサポートチームを称賛するため',
    },
    {
      id: 'tr_01_an1_q1_d',
      textEn: 'To ask for instructions on using the intranet site',
      textJa: '社内サイトの使い方の説明を求めるため',
    },
  ],
  correctChoiceId: 'tr_01_an1_q1_c',
  explanationGeneralJa: `本文2の③で「Your support team handled it exceptionally well（サポートチームは非常に見事に対応した）」と述べ、④でも「I appreciate how smoothly everything was resolved（円滑に解決したことに感謝する）」と感謝を伝えています。したがって目的はサポート対応を称賛することです。（A）は機器の品質への不満は書かれていません。（B）は返金要求ではなく「no extra cost（追加費用なし）」とあります。（D）は使い方の質問はしていません。`,
  metacogFeedbackJa: `この問題は「メールの目的（Why did X write?）」タイプの問題です。選択肢が「苦情・返金・称賛・手順確認」のように目的の方向性で分かれており、本文中の"感情評価（感謝・称賛・不満）"と"依頼行為（求める・質問する）"のどちらが中心かを見抜く必要があります。今回は、本文中でサポート対応を高く評価する表現が繰り返されているため、目的は称賛だと判断します。

①設問を見たら、まず「目的問題の定番カテゴリ」を頭に並べる（依頼／質問／苦情／謝罪／お礼・称賛／訂正・説明など）。この時点で、本文のどこに"目的サイン"が出やすいか（冒頭・結び・強い感情語の周辺）も同時に予測する。
②本文は最初に「書き手が今いちばんしたい行為」を探す：ask/request（依頼・質問）なのか、thank/appreciate/praise（感謝・称賛）なのか、complain/problem（苦情）なのか。動詞と評価語（exceptionally well, appreciate など）を優先して拾う。
③次に、同じ方向性の表現が"複数回"出ているか確認する。目的はたいてい一貫しており、同種の表現が繰り返されるほど「主目的」である可能性が高い（単発の情報は補足であることが多い）。
④ひっかけの切り捨て方：本文に「機器」「料金」「サイト」などの単語が出ると、その語を含む選択肢に引っ張られやすいが、目的問題では"話題が出た＝目的"ではない。必ず「その話題について何をしたいのか（不満なのか、返金要求なのか、質問なのか、感謝なのか）」という発話行為まで一致しているかで判定する。
⑤最後に、選択肢を「行為ラベル」に言い換えて照合する（例：苦情＝ネガ評価＋改善要求、返金＝支払いの取り消し要求、称賛＝ポジ評価＋感謝、手順確認＝やり方の質問）。本文の中心ラベルと一致するものだけを残す。

「目的問題は、名詞（機器・料金・サイト）ではなく"動詞と評価語"で読む。冒頭と結びで繰り返される行為（感謝／依頼／苦情）が何かを先に確定してから、選択肢を行為ラベルで照合しよう。」`,
};

const tr01Analog1Q2 = {
  id: 'tr_01_an1_q2',
  promptEn: 'What is suggested about Ms. Chen?',
  promptJa: 'Chenさんについて何が分かりますか。',
  choices: [
    {
      id: 'tr_01_an1_q2_a',
      textEn: 'She reserved a room at the Pine Avenue location on purpose.',
      textJa: '彼女は意図的にPine Avenue拠点を予約した。',
    },
    {
      id: 'tr_01_an1_q2_b',
      textEn: 'She paid an additional $25 for priority confirmation.',
      textJa: '彼女は優先確定のために追加で25ドル支払った。',
    },
    {
      id: 'tr_01_an1_q2_c',
      textEn: 'She works for Riverton Workspace Services.',
      textJa: '彼女はリバートン・ワークスペース・サービスの社員である。',
    },
    {
      id: 'tr_01_an1_q2_d',
      textEn: 'She canceled the product demo with the visiting partners.',
      textJa: '彼女は来訪者との製品デモを中止した。',
    },
  ],
  correctChoiceId: 'tr_01_an1_q2_b',
  explanationGeneralJa: `本文2の①でChenさんは「selected priority confirmation（優先確定を選んだ）」と述べています。本文1の③に、優先確定は「an additional fee of $25（追加料金25ドル）」とあるため、Chenさんは追加で25ドル支払ったと分かります。（A）は②でPine Avenueは誤りだったとあります。（C）はChenさんは利用者であり、サービス提供側とは書かれていません。（D）デモを中止したとは述べられていません。`,
  metacogFeedbackJa: `この問題は「人物についての推論（複数テキスト統合）」タイプの問題です。設問は人物の行動・状況を問う一方で、根拠となる情報が「案内（サービス条件）」と「メール（その人物が何を選んだか）」に分散しているため、両方を突き合わせて判断する必要があります。正しい選択肢は、メール内の"選択したサービス"を、案内にある"料金・条件"に対応づけて導きます。

①まず設問の動詞に注目し、「本文にそのまま書いてある事実」か「条件から言えること（推論）」かを切り分ける（今回は "suggested" なので後者寄り）。
②人物名が出る文書（メールなど）を先に見て、「その人がした選択・依頼・変更」を表す動詞（select, request, choose, cancel など）に下線を引く。
③次に案内・規定の文書へ移り、②で拾った"選択肢（サービス名）"に対応する「条件（料金・時間・制限）」を探して、セットで覚える（例：サービス名 ↔ 追加料金 ↔ 所要時間）。
④選択肢は「同じ単語が見えたから正解」にしないで、"因果の鎖"がつながるかで判定する（人物の行動 → 規定の条件 → 結論）。特にひっかけは、本文中の地名・拠点名など"目立つ固有名詞"を使って「意図的に〜した」と断定させたり、話題に出ただけの予定（デモ等）を「中止した」と言い換えて飛躍させたりするので、動詞の事実（cancelしたのか／間違いに気づいただけか）まで確認して切り捨てる。
⑤最後に「誰の立場か（利用者か提供側か）」を主語で確認する。サービス名が出てくると"勤務先"と誤読しやすいので、予約している側＝利用者、案内している側＝提供者、という役割を分けて読む。

「人物のメールで"何を選んだ／依頼した"を先に特定し、その語を案内文の条件（料金・時間）に照合してから結論を出す。」
「固有名詞や話題に出た予定に引っ張られず、動詞が示す事実と、規定から言えることだけで因果がつながる選択肢を選ぶ。」`,
};

const tr01Analog1 = {
  id: 'tr_01_an1',
  title: 'Riverton Workspace Services',
  direction: 'Questions 181-182 refer to the following announcement and e-mail.',
  directionJa: '問題181-182は次の案内とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: {
        headline: 'RIVERTON WORKSPACE SERVICES',
        body: tr01Analog1AdBodyEn,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        from: 'Maya Chen <mchen@northbridgeco.com>',
        to: 'Daniel Ortiz <dortiz@northbridgeco.com>',
        date: 'May 9',
        subject: 'Thank you for the quick room solution',
        greeting: 'Hi Mr. Ortiz,',
        body: tr01Analog1EmailBodyEn,
        closing: 'Sincerely,',
        senderName: 'Maya Chen',
      },
    },
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: {
        headline: 'リバートン・ワークスペース・サービス',
        body: tr01Analog1AdBodyJa,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        from: 'Maya Chen <mchen@northbridgeco.com>',
        to: 'Daniel Ortiz <dortiz@northbridgeco.com>',
        date: '5月9日',
        subject: '迅速な会議室手配へのお礼',
        greeting: 'Ortiz 様',
        body: tr01Analog1EmailBodyJa,
        closing: '敬具',
        senderName: 'Maya Chen',
      },
    },
  ],
  questions: [tr01Analog1Q1, tr01Analog1Q2],
};

// ===== tr_01 類題2: Northbridge Workspaces =====

const tr01Analog2AdBodyEn = [
  'Reserving a meeting room at Northbridge Workspaces is now simpler than ever. Members can book rooms online in just a few clicks, with options ranging from small interview rooms to large boardrooms.',
  'Need help choosing the right space? Our support team can chat with you in real time and recommend a room based on your group size and equipment needs. Each room includes Wi-Fi, a whiteboard, and on-site technical assistance upon request.',
  'Standard reservations are confirmed within 24 hours. If you need immediate confirmation, we offer Priority Confirmation for an additional fee of $25.',
];

const tr01Analog2AdBodyJa = [
  'ノースブリッジ・ワークスペースの会議室予約が、これまで以上に簡単になりました。会員はオンラインで数回クリックするだけで予約でき、小さな面接室から大きな役員会議室まで選べます。',
  'どの部屋がよいか迷っていますか。当社のサポートチームがリアルタイムのチャットで、人数や必要な機材に基づいて部屋を提案します。各部屋にはWi‑Fi、ホワイトボードが備わっており、要望があれば館内の技術サポートも利用できます。',
  '通常の予約は24時間以内に確定します。すぐに確定が必要な場合は、追加料金25ドルで「優先確定」を提供しています。',
];

const tr01Analog2LetterBodyEn = [
  'Last week, I booked a boardroom through your Web site for a project review with visiting partners. Because our schedule was tight, I selected Priority Confirmation and entered the date and time for this Friday morning.',
  'The confirmation message I received listed the correct room but showed the reservation for Thursday afternoon instead. I contacted your support team right away, and they corrected the booking within minutes and sent an updated confirmation.',
  'I appreciate how quickly your staff resolved the issue. I plan to continue using Northbridge Workspaces for future meetings.',
];

const tr01Analog2LetterBodyJa = [
  '先週、私は貴社のウェブサイトから、来訪する提携先とのプロジェクトレビューのために役員会議室を予約しました。日程がタイトだったため、私は「優先確定」を選び、今週金曜の午前の日時を入力しました。',
  'ところが、受け取った確定メッセージには部屋は正しく記載されていたものの、予約日時が木曜午後になっていました。すぐにサポートチームに連絡したところ、数分で予約を修正し、更新された確定メッセージを送ってくれました。',
  '問題を迅速に解決してくれたスタッフに感謝しています。今後の会議でも引き続きノースブリッジ・ワークスペースを利用するつもりです。',
];

const tr01Analog2Q1 = {
  id: 'tr_01_an2_q1',
  promptEn: 'Why did Ms. Choi write to Mr. Grant?',
  promptJa: 'ChoiさんはなぜGrantさんにEメールを書いたのですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To complain about the quality of a meeting room',
      textJa: '会議室の品質について苦情を言うため',
    },
    {
      id: 'b',
      textEn: 'To request a refund for a membership fee',
      textJa: '会員費の返金を求めるため',
    },
    {
      id: 'c',
      textEn: 'To praise how a problem was handled',
      textJa: '問題対応の良さを称賛するため',
    },
    {
      id: 'd',
      textEn: 'To suggest adding more rooms on Fridays',
      textJa: '金曜日にもっと部屋を増やすよう提案するため',
    },
  ],
  correctChoiceId: 'c',
  explanationGeneralJa:
    '本文2の③で、Ms. Choiは「I appreciate how quickly your staff resolved the issue（スタッフが迅速に問題を解決してくれたことに感謝する）」と述べており、対応への感謝・称賛が目的だと分かる。本文2の②でも、サポートチームが「within minutes（数分で）」修正したと書かれている。したがって正解は(C)。(A) 会議室の品質への不満は述べていない。(B) 返金の話はない。(D) 部屋数を増やす提案もしていない。',
  metacogFeedbackJa: `この問題は「目的（Why did X write?）タイプ」の問題です。設問がメールの用件＝書いた目的を問うており、本文中の感情表現（感謝・称賛・苦情など）と、依頼／提案／問い合わせといった行為の種類を見分ける必要があります。今回は、本文中で対応の速さへの感謝が明示されているため、目的は「称賛」に収束します。

① まず設問の動詞（write）に反応して、「メールの目的は1つに絞れるはず」と決め、本文では結論になりやすい冒頭・末尾の目的文（I\'m writing to…, I\'d like to…, Thank you for…）を優先的に探す。
② 目的問題では「何が起きたか（出来事）」より「それに対して筆者が何をしたいか（行為）」を取りに行く。感謝＝称賛、I\'m afraid/Unfortunately＝苦情、Could you…＝依頼、I suggest…＝提案、のように"機能語"で分類する。
③ 選択肢は名詞の一致ではなく「行為の種類」が一致しているかで照合する（complain / request / praise / suggest など）。本文の具体表現は、選択肢では抽象語（praise, complain）に言い換えられることが多いので、感情語＋評価語（appreciate, grateful, impressed など）を見たら「称賛」候補を強くする。
④ ひっかけは「本文に出てくるトピック語」に引っ張るタイプが多い（会議室、会員費、曜日など）。トピックが出ていても、筆者が"それについて何をしたいのか"が書かれていなければ目的にはならない、と切り捨てる。
⑤ 複数テキスト（広告＋メールなど）の場合、目的問題は基本的に"メール側"で完結することが多い。広告は背景知識（サービス内容・料金・条件）として参照し、目的そのものはメールの表現（感謝／依頼／苦情／提案）で確定させる。

「Why did the writer write? は、話題ではなく“行為（感謝・苦情・依頼・提案）”を当てる問題だ。まず目的文・感情語を拾い、選択肢の動詞（complain/request/praise/suggest）と機能が一致するものだけを残そう。」`,
};

const tr01Analog2Q2 = {
  id: 'tr_01_an2_q2',
  promptEn: 'What is suggested about Ms. Choi?',
  promptJa: 'Choiさんについて何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She reserved an interview room for Thursday afternoon.',
      textJa: '彼女は木曜午後に面接室を予約した。',
    },
    {
      id: 'b',
      textEn: 'She paid an extra $25 to receive immediate confirmation.',
      textJa: '彼女は即時確定のために追加で25ドル支払った。',
    },
    {
      id: 'c',
      textEn: 'She changed her meeting to avoid visiting partners.',
      textJa: '彼女は来訪する提携先を避けるために会議を変更した。',
    },
    {
      id: 'd',
      textEn: 'She received technical assistance during the meeting.',
      textJa: '彼女は会議中に技術サポートを受けた。',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '本文2の①で、Ms. Choiは「I selected Priority Confirmation（優先確定を選んだ）」と述べている。本文1の③に「Priority Confirmation for an additional fee of $25（追加料金25ドルで優先確定）」とあるため、彼女は追加で25ドル支払ったことが示される。よって正解は(B)。(A) 予約したのは「boardroom（役員会議室）」であり、また木曜午後は誤って記載されていただけ（本文2②）。(C) 来訪する提携先とのレビューと書かれており、避けたとは言っていない。(D) 技術サポートは「upon request（要望があれば）」とあるだけで、実際に受けたとは書かれていない。',
  metacogFeedbackJa: `この問題は「複数テキスト統合＋人物についての推論（suggested）」タイプの問題です。広告（サービス内容・条件）とメール（その人物が何を選んだか）を突き合わせて、「選択＝何を意味するか」を言い換えで確定させる必要があります。正しい選択肢は、メール内の"あるオプションを選んだ"という記述を、広告の料金条件に接続して具体化したものです。

①まず設問の動詞（suggested / implied / indicated など）を見て、「本文にそのまま書いてある事実」ではなく「本文同士をつないで言えること」を取りに行く、と決める。
②複数テキスト問題では、先に"定義・条件・料金"が載っている案内文（広告・規約・掲示）をざっとスキャンし、「オプション名→効果→追加条件（料金・時間）」の対応表を頭の中に作る。
③次にメール側で、人物が実際に取った行動を示す動詞（selected / requested / booked / asked for など）に下線を引き、広告側の対応表のどこに当てはまるかを照合する。ここで「オプション名が一致する＝内容も一致する」と短絡せず、必ず"効果（何が起きる）"と"条件（追加料金など）"までセットで回収する。
④選択肢は「本文の単語が見えるもの」ほど引っかけになりやすいので、固有の曜日・部屋タイプ・サポートなど"それっぽい名詞"に飛びつかず、「その人物について言えること＝行動の結果として確実に成立すること」だけを残す。特に "available / upon request / can" のような可能表現は、「利用できる」だけで「利用した」にはならないので、実行の証拠がない選択肢は切る。
⑤最後に、選択肢を「①行動（選んだ/支払った/受けた）」「②条件（いつ/いくら/どの部屋）」に分解し、本文から①と②が両方そろって裏取りできるものだけを正解候補にする（片方しか合っていないものは不正解）。

「複数テキストは、案内文で“用語の定義と条件”を先に作ってから、メールの行動をそこに当てはめて具体化する。」  
「“できる”と“した”を混同せず、行動＋条件がセットで証明できる選択肢だけを選ぶ。」`,
};

const tr01Analog2 = {
  id: 'tr_01_an2',
  title: 'Northbridge Workspaces',
  direction: 'Questions 181-182 refer to the following advertisement and e-mail.',
  directionJa: '問題181-182は次の広告とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: {
        headline: 'NORTHBRIDGE WORKSPACES',
        body: tr01Analog2AdBodyEn,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        sender: {
          name: 'Mina Choi',
          address: ['47 Harbor Lane, Unit 12', 'Portland, OR 97205'],
        },
        date: 'May 6',
        recipient: {
          name: 'Elliot Grant',
          title: 'Director',
          company: 'Northbridge Workspaces',
          address: ['900 Market Street', 'San Francisco, CA 94103'],
        },
        greeting: 'Dear Mr. Grant,',
        body: tr01Analog2LetterBodyEn,
        closing: 'Sincerely,',
        signature: 'Mina Choi',
        senderName: 'Mina Choi',
      },
    },
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: {
        headline: 'ノースブリッジ・ワークスペース',
        body: tr01Analog2AdBodyJa,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        sender: {
          name: 'ミナ・チョイ',
          address: ['ハーバー・レーン47番地 ユニット12', 'オレゴン州ポートランド 97205'],
        },
        date: '5月6日',
        recipient: {
          name: 'エリオット・グラント',
          title: 'ディレクター',
          company: 'ノースブリッジ・ワークスペース',
          address: ['マーケット通り900番地', 'カリフォルニア州サンフランシスコ 94103'],
        },
        greeting: 'グラント様',
        body: tr01Analog2LetterBodyJa,
        closing: '敬具',
        signature: 'ミナ・チョイ',
        senderName: 'ミナ・チョイ',
      },
    },
  ],
  questions: [tr01Analog2Q1, tr01Analog2Q2],
};

// ===== tr_01 類題3: Riverton Workspace =====

const tr01Analog3NoticeBodyEn = [
  'Reserving a meeting room at Riverton Workspace is now simpler than ever. Members can book any room online, view floor plans, and request basic equipment such as a projector or speakerphone.',
  'Standard requests are confirmed within two business days. If you need confirmation by the next business day, select Priority Processing at checkout for an additional fee of $35.',
  'Need help choosing the right room size? Our support team can recommend options based on your headcount and meeting format.',
];

const tr01Analog3NoticeBodyJa = [
  'リバートン・ワークスペースの会議室予約が、これまで以上に簡単になりました。会員はオンラインでどの部屋でも予約でき、フロア図を確認し、プロジェクターやスピーカーフォンなどの基本的な備品を依頼できます。',
  '通常の依頼は2営業日以内に確定します。翌営業日までに確定が必要な場合は、申込み時に「優先処理」を選択してください。追加料金は35ドルです。',
  '適切な部屋の広さ選びに迷ったら、参加人数や会議形式に基づいてサポートチームが提案します。',
];

const tr01Analog3EmailBodyEn = [
  'Last week I booked the Cedar Room for a training session with visiting instructors. I selected Priority Processing because we had to finalize our agenda quickly. The booking was supposed to be confirmed by the next business day.',
  'When I checked my account the following afternoon, the reservation still showed "pending." I contacted your support desk, and they responded immediately. Since the Cedar Room had been taken in the meantime, they secured the Maple Room at the same time slot and added a projector at no charge.',
  'I appreciate how calmly and efficiently your team resolved the issue. I will continue to use Riverton Workspace for future sessions.',
];

const tr01Analog3EmailBodyJa = [
  '先週、外部講師を招いた研修のためにCedar Roomを予約しました。予定を早く確定させる必要があったので、優先処理を選びました。予約は翌営業日までに確定されるはずでした。',
  '翌日の午後にアカウントを確認すると、予約はまだ「保留」のままでした。サポートデスクに連絡したところ、すぐに対応してくれました。その間にCedar Roomが埋まってしまっていたため、同じ時間帯でMaple Roomを確保し、さらにプロジェクターも追加料金なしで手配してくれました。',
  '貴社チームが落ち着いて効率的に問題を解決してくれたことに感謝します。今後の研修でも引き続きリバートン・ワークスペースを利用します。',
];

const tr01Analog3Q1 = {
  id: 'tr_01_an3_q1',
  promptEn: 'Why did Ms. Chen write to Mr. Grant?',
  promptJa: 'Chen さんはなぜ Grant さんにEメールを書いたのですか。',
  choices: [
    {
      id: 'a',
      textEn: 'To complain about the size of a meeting room',
      textJa: '会議室の広さについて不満を述べるため',
    },
    {
      id: 'b',
      textEn: "To praise the staff's handling of a problem",
      textJa: '問題へのスタッフの対応を称賛するため',
    },
    {
      id: 'c',
      textEn: 'To request a refund for an equipment fee',
      textJa: '備品料金の返金を求めるため',
    },
    {
      id: 'd',
      textEn: 'To suggest changes to the online booking system',
      textJa: 'オンライン予約システムの変更を提案するため',
    },
  ],
  correctChoiceId: 'b',
  explanationGeneralJa:
    '本文2の③で Ms. Chen は "I appreciate how calmly and efficiently your team resolved the issue."（貴社チームが問題を落ち着いて効率的に解決してくれたことに感謝する）と述べており、対応への評価が目的だと分かる。したがって正解は(B)。(A) 広さへの不満は述べていない。(C) プロジェクターは "at no charge"（無料）なので返金の話ではない。(D) システム変更の提案もしていない。',
  metacogFeedbackJa: `この問題は「メールの目的（Why did X write?）タイプ」の問題です。設問が理由・目的を直接たずねており、本文中の"感謝・依頼・苦情・提案"などの発信意図を示す定型表現を手がかりに判断します。今回は、メール内の評価・感謝を示す一文が決め手になり、スタッフ対応を称賛する目的だと取れます。

①まず設問の動詞（write / ask / request / complain / suggest など）に合わせて、「目的を表すサイン」を探すと決める（thank/appreciate＝称賛、I\'m writing to…＝目的宣言、could you…＝依頼、I\'m concerned＝苦情、I suggest＝提案）。
②本文は最初と最後を優先して読む（冒頭＝用件提示、結び＝感謝・次の行動）。途中の細部（料金・日数・備品名）は"背景"になりやすい。
③選択肢は「行為の種類」で先に分類する（苦情／称賛／返金要求／改善提案など）。本文のトーン（ポジティブかネガティブか）と一致するグループから当たりを付ける。
④ひっかけは「本文に出てくる名詞に反応させる」型が多い（例：部屋のサイズ、料金、システム等）。名詞が出ていても、"それについて何をしに書いたのか（感謝なのか、要求なのか）"という発話行為が一致しなければ切る。
⑤根拠は"言い換え"で取る：本文の thank/appreciate/handled well などを、選択肢の praise/compliment/commend と対応させ、同じ意味の抽象度で一致しているか確認する。

「Why did ～ write? は、内容の細部よりも“発信意図のラベル（感謝・依頼・苦情・提案）”を先に当てにいく。名詞が一致しても、トーンと行為が一致しない選択肢は捨てる。」`,
};

const tr01Analog3Q2 = {
  id: 'tr_01_an3_q2',
  promptEn: 'What is suggested about Ms. Chen?',
  promptJa: 'Chen さんについて何が分かりますか。',
  choices: [
    {
      id: 'a',
      textEn: 'She paid an additional $35 for faster confirmation.',
      textJa: '彼女はより早い確定のために追加で35ドル支払った。',
    },
    {
      id: 'b',
      textEn: 'She reserved the Maple Room as her first choice.',
      textJa: '彼女は最初からMaple Roomを第一希望として予約した。',
    },
    {
      id: 'c',
      textEn: 'She received confirmation within two business days.',
      textJa: '彼女は2営業日以内に確定通知を受け取った。',
    },
    {
      id: 'd',
      textEn: 'She canceled the training session due to the delay.',
      textJa: '彼女は遅れのため研修を中止した。',
    },
  ],
  correctChoiceId: 'a',
  explanationGeneralJa:
    '本文2の①で "I selected Priority Processing"（優先処理を選んだ）とあり、本文1の②で優先処理は "an additional fee of $35"（追加料金35ドル）と説明されているため、追加で35ドル支払ったことが示唆される。よって正解は(A)。(B) 最初に予約したのは本文2の①より Cedar Room。Maple Roomは本文2の②で代替として確保された。(C) 優先処理は翌営業日までの確定であり、本文2の②では翌日の午後でも "pending" のままだった。(D) 研修を中止したとは書かれていない。',
  metacogFeedbackJa: `この問題は「複数テキスト統合＋人物についての推論（suggested）」タイプの問題です。案内文が"ルール（優先処理＝追加料金など）"を提示し、メール側が"その人が何を選んだか"を述べるので、両方を突き合わせて人物情報を確定させる必要があります。正しい選択肢は、メール中の手続き選択を案内文の料金説明に接続して導くものです。

①まず設問の動詞（suggested / implied / indicated など）を見て、「本文に同じ文があるか」ではなく「本文Aの一般ルール＋本文Bの行動」から結論を作る問題だと決める。
②複数文書では、先に"規約・料金・条件"が書かれた案内/掲示をざっとスキャンし、「追加料金」「期限（何営業日）」「例外条件」など"判断軸"になりやすい項目に印を付ける。
③次にメールを読み、「その人物が選んだオプション（選択した/依頼した/申し込んだ）」「時制（すでにした／これからする）」「結果（確定した／保留のまま）」の3点を拾って、案内文の判断軸に当てはめる。
④選択肢は「同じ単語に引っ張られるひっかけ」を警戒する。たとえば"2 business days""confirmation""room名"など本文に出た語があるだけで選ぶのではなく、「案内文の条件を満たす行動が本文で明示されているか」「結果まで確定しているか」をチェックして切り捨てる。
⑤最後に、結論が"1つの条件だけ"で決まるのか、"条件＋結果の両方"が必要なのかを確認する。人物についての設問は、行動（選択）だけで言えることと、結果（確定・キャンセル）まで必要なことが混ざるため、本文がどこまで言い切っているかで線引きする。

「案内文はルール集、メールは事実集。まずルールの判断軸を作ってから、メールの行動を当てはめて結論を出そう。本文語句の一致ではなく、条件→帰結のつながりで選ぼう。」`,
};

const tr01Analog3 = {
  id: 'tr_01_an3',
  title: 'Riverton Workspace',
  direction: 'Questions 181-182 refer to the following notice and e-mail.',
  directionJa: '問題181-182は次の案内とEメールに関するものです。',
  paragraphsEn: [],
  paragraphsJa: [],
  sections: [
    {
      layoutType: 'ad' as const,
      locale: 'en' as const,
      ad: {
        headline: 'RIVERTON WORKSPACE',
        body: tr01Analog3NoticeBodyEn,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'en' as const,
      letter: {
        sender: {
          name: 'Mina Chen',
          address: ['44 Harbor Lane', 'Portland, OR 97205'],
        },
        date: 'May 9',
        recipient: {
          name: 'Elliot Grant',
          title: 'Operations Manager',
          company: 'Riverton Workspace',
          address: ['1550 Westbridge Road', 'Seattle, WA 98109'],
        },
        greeting: 'Dear Mr. Grant,',
        body: tr01Analog3EmailBodyEn,
        closing: 'Sincerely,',
        signature: 'Mina Chen',
        senderName: 'Mina Chen',
      },
    },
    {
      layoutType: 'ad' as const,
      locale: 'ja' as const,
      ad: {
        headline: 'リバートン・ワークスペース',
        body: tr01Analog3NoticeBodyJa,
      },
    },
    {
      layoutType: 'letter' as const,
      locale: 'ja' as const,
      letter: {
        sender: {
          name: 'Mina Chen',
          address: ['ハーバー・レーン44番地', 'ポートランド（オレゴン州）97205'],
        },
        date: '5月9日',
        recipient: {
          name: 'Elliot Grant',
          title: '運営マネージャー',
          company: 'リバートン・ワークスペース',
          address: ['ウエストブリッジ通り1550番地', 'シアトル（ワシントン州）98109'],
        },
        greeting: 'Grant 様',
        body: tr01Analog3EmailBodyJa,
        closing: '敬具',
        signature: 'Mina Chen',
        senderName: 'Mina Chen',
      },
    },
  ],
  questions: [tr01Analog3Q1, tr01Analog3Q2],
};

// tr_01用類題（全て別内容）
const analogs = [tr01Analog1, tr01Analog2, tr01Analog3];

// ===== tr_02: B群用 Resource Assessment Report =====

const reportBodyEn = [
  `Summary of main findings of the assessment team: — [1] —. We examined the availability of high-quality gravel in and around the two main quarry pits at Bhule Gravel Quarry. First, we took samples from several different locations around the North Quarry pit. After analyzing the samples, we determined that there is very little mineable gravel left in or around the North Quarry pit. — [2] —. Therefore, we recommend ending this operation within the next year. In addition, it is not cost-effective to mine the gravel at the North Quarry pit even though it is closer to the processing plant than the South Quarry pit is.`,
  `In contrast, there are extensive amounts of gravel still to be mined in the South Quarry pit. The samples we retrieved by drilling indicate that the mineable gravel deposits extend 800 metres south of the pit and to a depth of 15 metres. If gravel continues to be mined at the current rate, we estimate that the mining operation at the South Quarry pit can be sustained for another three years. — [3] —. The cost of the operation will gradually increase because it will be necessary to dig deeper. Nevertheless, we believe the operation will remain profitable. — [4] —.`,
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
  explanationGeneralJa: `「評価チームの主な調査結果の概要」の②では北採掘抗について、③では南採掘抗について報告されている。③3〜7行目で、南採掘抗であと3年間は採掘事業を維持でき、操業コストが上昇しても、利益を上げ続けるだろうと述べている。よって、for another three yearsをfor several more years「あと数年間」と表している（A）が正解。
（B）③3～5行目に、現在のペースで採掘を続ければあと3年間は事業を維持できるとあり、同5～6行目に、より深く掘る必要が生じると書かれているが、より速く採掘するべきだという記述はない。
（C）（D） さらなる検証や処理工場に及ぼす危険については言及されていない。`,
  metacogFeedbackJa: `この問題は「単一文書の要点把握（suggest＝本文の結論・評価を拾う）タイプの問題です。」設問が "What does the report suggest…?" と抽象的なので、細部の数字よりも「結論としてどう評価しているか（見通し・採算性・推奨）」を本文の結論文から取る必要があります。正しい選択肢は、南側について「今後もしばらく採算が取れる」という評価に対応しています。

① まず設問の動詞（suggest / indicate / imply など）を見て、「事実の一点探し」ではなく「本文が最終的に言いたい評価・見通し」を問う合図だと判断する。
② 次に本文の構造をざっと取り、「対象ごとの段落分け（Aについて／対照的にBについて）」を確認して、該当対象が主役の段落だけを精読する（他の対象の段落はノイズになりやすい）。
③ 該当段落では、数字・条件（年数、距離、深さ、コスト増など）を先に追いすぎず、結論を言い切る表現（recommend / will remain / is expected to / profitable など）を優先して拾う。数字はその結論を支える根拠として後から確認する。
④ 選択肢は「本文の言い換え（パラフレーズ）」として照合する。特に "for another three years" のような具体年数は "for several more years" のように抽象化されやすいので、数字が一致しない＝不正解と早合点しない。
⑤ ひっかけの典型として、「本文に出てくる単語に引っ張られるが、因果が飛んでいる選択肢」を切る。たとえば "cost will increase" を見て「だからもっと速く掘るべき」と"提案"にすり替えたり、別段落の "processing plant" を見て「危険がある」と"リスク"に話を盛ったりするものは、本文に "should / need to / risk" などの明示がない限り不採用にする。

「suggest と聞かれたら、数字より先に"結論の言い切り（見通し・評価）"を探し、選択肢は具体→抽象の言い換えで一致を取ろう。別段落の単語や、本文にない"べき・危険"の飛躍はノイズとして切り捨てよう。」`,
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
  explanationGeneralJa: `BothaさんとMosalaさんの名前は④にあり、評価表を作成した人物。ヘッダー部分より、この報告書はKimberleyコンサルティング地球工学社によるものと分かる。よって、Bothaさんと Mosalaさんは同社の従業員だと考えられるので、（D）が正解。
（A）（B）評価表の作成者としてこの2人の名前が記載されており、現場で働く建設作業員やminer「採掘労働者」とは考えられない。
（C） Springbokコンクリート供給合同会社の社名は①の「依頼者」欄にあるので、この2人が同社のオーナーだとは考えられない。`,
  metacogFeedbackJa: `この問題は「人物（肩書き・所属）特定タイプの問題です。」本文中の名前が「何をした人として」登場しているか（作成者・依頼者・対象施設の関係者など）を手がかりに、組織図のように関係を整理して答える形式だからです。今回は、名前が「評価書作成者」として記載され、報告書の発行元の会社名と結びつくため、正しい選択肢はその会社側の人物になります。

① まず文書の"枠"を見る：ヘッダー（会社名・文書種別）と、項目ラベル（Client／Purpose／Prepared by など）を先に確認し、「発行元」「依頼者」「作成者」を三点セットで分けて読む。
② 人名が出たら直後の役割ラベルに注目する：人名そのものより、「prepared by / written by / submitted by / signed by」など"文書を作った側"を示す表現を最優先で拾う。
③ 「依頼者」と「作成者」を混同しない：Client は"お金を払って依頼した側"、Prepared by は"調査・報告を提供する側"なので、同じ文書内に両方が出るときは所属が逆になりやすいと意識する。
④ ひっかけは「現場っぽい語」に引っ張られる：quarry / mining / pit などの語が多いと、作成者＝採掘現場の人と短絡しがちだが、報告書形式で人名が末尾にまとまっている場合は"現場作業者"より"報告書の執筆者（会社側の担当者）"が基本線。現場職を選ぶなら、本文中に「～として働いている」「～の作業員」など職務を直接示す記述が必要、と基準を置いて切り捨てる。

「人名が出たら、まず"誰の文書で、誰が依頼者で、誰が作成者か"をラベルで仕分けしてから選ぶ。内容の専門語や現場描写に引っ張られず、文書の役割表示（Prepared by / Client など）を根拠にする。」`,
};

const tr02Question3 = {
  id: 'tr02_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The gravel that remains is of low quality."',
  promptJa:
    '[1]、[2]、[3]、[4] のうち、次の文を入れるのに最も適切な場所はどこですか。\n「残っている砂利は低品質である。」',
  choices: [
    { id: 'tr02_q3_a', textEn: '[1]', textJa: '[1]' },
    { id: 'tr02_q3_b', textEn: '[2]', textJa: '[2]' },
    { id: 'tr02_q3_c', textEn: '[3]', textJa: '[3]' },
    { id: 'tr02_q3_d', textEn: '[4]', textJa: '[4]' },
  ],
  correctChoiceId: 'tr02_q3_b',
  explanationGeneralJa: `挿入文では、残っている砂利の質が述べられているので、砂利の採掘に関する記述に注目する。②4～5行目で、採取したサンプルを分析した結果、北採掘抗の内部とその周辺には採掘できる砂利がごくわずかしか残っていないことが分かった、と述べられている。この直後の（B）［2］に挿入文を入れると、採掘できる砂利がごくわずかしか残っていない上、その残りの砂利も低品質である、ともう一つマイナス点を挙げることになり、流れとして適切。また、結果を導く際に使われるtherefore「従って」から始まる直後の文の、来年には操業を終えることを勧めるという否定的な内容とも自然につながる。be of low quality「低品質である」。`,
  metacogFeedbackJa: `この問題は「文挿入（挿入位置特定）」タイプの問題です。挿入文が単独で意味を持つ一方、前後の文との論理関係（追加説明・因果・対比など）や指示語のつながりが合う場所を選ぶ必要があります。今回は「残っている」という表現が、直前で述べられる"残量"の話を受けて自然に補足になる位置が正しい選択肢になります。

① まず挿入文を"機能"で分類する（定義／具体例／追加のマイナス要因／結論の言い換え／対比の導入など）。今回の文は「残っているものの評価」を付け足す"追加情報（しかもネガティブ）"だと押さえる。
② 次に挿入文のキーワードが指す対象を特定する（the gravel that remains の "remains" は「直前で残りが少ない等、残量に触れた文」を必要とする）。この"指示先探し"をすると、置ける場所が一気に絞れる。
③ 前後の論理マーカーをチェックする（therefore, in contrast, nevertheless など）。挿入文が「結論（recommend など）」の直前に入るなら、結論を支える"理由の追加"として自然か、結論を邪魔していないかを確認する。
④ 段落の役割（北側の問題点→結論／南側の見込み→ただしコスト→それでも利益）を意識し、挿入文がその段落のトーン（ネガティブ／ポジティブ）を壊さないかを見る。ネガティブ情報をポジティブ段落に入れると、対比構造が崩れやすい。
⑤ ひっかけの典型として「同じ単語が近くにある場所」や「文法的に入れられそうな空所」に飛びつかない。挿入問題は"文法的に可能"より"論理的に必然"を優先し、指示語（this/that/these/remaining）と接続語（therefore/however/in contrast）の整合で切り捨てる。

「挿入文は"何を補足する文か"を先に決め、指示語が自然に指せる直前文を探してから置こう。接続語の直前直後は特に、因果・対比の流れを壊さないかで最終確認しよう。」`,
};

// ===== tr_02 類題: Northridge Facilities Planning =====

const tr02AnalogBodyEn = [
  `Summary of key findings by the review team: — [1] —. We evaluated workstation capacity, meeting-room availability, and network coverage across the two main office floors. First, we conducted headcounts and badge-scan checks on Floor 3 during peak hours. After comparing the results with the seating plan, we found that there are very few usable desks remaining on Floor 3. — [2] —. Therefore, we recommend relocating the Floor 3 teams within the next six months. In addition, keeping Floor 3 in service is not cost-effective even though it is closer to the main server room than Floor 4 is.`,
  `In contrast, Floor 4 has substantial capacity for additional staff. Measurements and walk-throughs confirmed that the open area extending from the east stairwell to the north windows can accommodate up to 28 more workstations. If staffing grows at the current rate, Floor 4 can support operations for at least two more years. — [3] —. Operating costs will gradually increase because additional network drops will be required. Nevertheless, we believe the expansion will remain within budget. — [4] —.`,
];

const tr02AnalogBodyJa = [
  `レビューチームによる主な調査結果の概要：［1］。当チームは、2つの主要フロア全体で、デスクの収容力、会議室の利用可能性、ネットワークのカバー状況を評価した。まず、混雑時間帯に3階で人数カウントと入館バッジの記録確認を行った。結果を座席表と照合したところ、3階には使用可能なデスクがほとんど残っていないことが分かった。［2］。したがって、3階のチームは今後6か月以内に移転することを推奨する。さらに、4階よりサーバールームに近いとしても、3階を使い続けるのは費用対効果が低い。`,
  `対照的に、4階には追加人員を受け入れられる十分な余裕がある。計測と現地確認により、東側階段付近から北側の窓までのオープンエリアに、最大28席の追加デスクを設置できることが確認された。人員が現在のペースで増える場合でも、4階は少なくともあと2年間は運用を支えられる。［3］。追加のネットワーク配線口が必要になるため、運用コストは徐々に上昇するだろう。それでも、拡張は予算内に収まると考える。［4］。`,
];

const tr02AnalogQ1 = {
  id: 'tr02_an_q1',
  promptEn: 'What does the report suggest about Floor 4?',
  promptJa: '報告書は4階について何を示唆していますか。',
  choices: [
    {
      id: 'tr02_an_q1_a',
      textEn: 'It can support operations for at least a couple more years.',
      textJa: '少なくともあと数年は運用を支えられる。',
    },
    {
      id: 'tr02_an_q1_b',
      textEn: 'It should be closed immediately for renovations.',
      textJa: '改修のため直ちに閉鎖すべきである。',
    },
    {
      id: 'tr02_an_q1_c',
      textEn: 'It requires additional safety inspections before use.',
      textJa: '使用前に追加の安全点検が必要である。',
    },
    {
      id: 'tr02_an_q1_d',
      textEn: 'It is too far from the server room to be practical.',
      textJa: 'サーバールームから遠すぎて実用的ではない。',
    },
  ],
  correctChoiceId: 'tr02_an_q1_a',
  explanationGeneralJa: `本文③で4階について述べられており、「Floor 4 can support operations for at least two more years（少なくともあと2年間は運用を支えられる）」とあるため、（A）が正解です。
（B）閉鎖すべきという記述はありません。（C）安全点検についての言及はありません。（D）サーバールームから遠すぎるとは書かれておらず、距離の話は②で3階が近いことに触れているだけです。`,
  metacogFeedbackJa: `この問題は「詳細情報の一致（サポート文の特定）」タイプの問題です。設問が「4階について何を示唆しているか」と、特定の対象（Floor 4）に関する本文中の明示情報を1点取り出す形で、推測よりも"該当箇所の言い換え"を見抜く力が問われます。正しい選択肢は、4階の運用可能期間に触れている一文の内容をそのまま抽象化したものです。

①設問の核語（対象＋観点）を先に固定する：この手の設問は「どこについて（対象）」「何について（観点：期間・容量・費用・条件など）」を押さえると、探すべき情報の種類が決まります。
②本文は"対象が主語になる段落"を優先的に探す：報告書・レビュー文は段落ごとに対象が切り替わりやすいので、見出しや対比語（in contrast など）を手がかりに、対象フロアが中心の段落へジャンプします。
③その段落では「結論文→根拠文」の順で拾う：報告書は、最初に結論（can support / recommend / not cost-effective など）を置き、その後に測定・確認・条件（up to 数字、if 節、because 節）で支える構造が多いので、まず断定表現を探してから数字や条件を確認します。
④選択肢は"同じ話題語"に釣られず、観点一致で照合する：たとえば「server room」「cost」「inspection」など本文に出そうな語が入っていても、設問が求める観点（ここでは運用可能性・期間）とズレていればノイズです。話題語一致ではなく、「主張の種類（期間／必要条件／評価）」が一致しているかで切ります。
⑤ひっかけの典型は「別フロアの情報の移し替え」：一方のフロアの欠点（近い/遠い、コスト高、閉鎖推奨など）を、もう一方にも当てはめた選択肢が出やすいので、"対象フロアが同じか"を最後に必ず再確認します。

「設問の対象と観点を先に決め、対象が主役の段落に飛んで、結論文の断定表現を拾ってから選択肢の言い換えと照合しよう。話題語が似ていても、別対象・別観点の情報は迷わず捨てよう。」`,
};

const tr02AnalogQ2 = {
  id: 'tr02_an_q2',
  promptEn: 'Who most likely are Ms. Park and Mr. Nguyen?',
  promptJa: 'ParkさんとNguyenさんは誰だと考えられますか。',
  choices: [
    {
      id: 'tr02_an_q2_a',
      textEn: 'Construction contractors hired to remodel the West Annex',
      textJa: 'ウエスト別館を改装するために雇われた建設業者',
    },
    {
      id: 'tr02_an_q2_b',
      textEn: 'Employees of Harborview Research Institute',
      textJa: 'ハーバービュー研究所の従業員',
    },
    {
      id: 'tr02_an_q2_c',
      textEn: 'Visitors who toured the building during the review dates',
      textJa: '調査期間中に建物を見学した来訪者',
    },
    {
      id: 'tr02_an_q2_d',
      textEn: 'Staff members of Northridge Facilities Planning',
      textJa: 'ノースリッジ施設計画部の職員',
    },
  ],
  correctChoiceId: 'tr02_an_q2_d',
  explanationGeneralJa: `本文④に「Review prepared by: Elena Park and Darius Nguyen」とあり、報告書の作成者であることが分かります。また、文書の見出しが「NORTHRIDGE FACILITIES PLANNING」となっているため、2人はその組織の職員と考えるのが自然です。よって（D）が正解です。
（A）改装工事の担当者とは書かれていません。（B）依頼者は①のClientにある研究所であり、作成者が依頼者側だと示す情報はありません。（C）見学者であれば「prepared by」として記載されるのは不自然です。`,
  metacogFeedbackJa: `この問題は「人物・立場特定（文書の発信者／作成者）」タイプの問題です。設問が「この2人は誰か」と人物の所属を問うており、本文中の署名欄（prepared by）と文書ヘッダー（組織名）から"誰がこの文書を書いたのか"を確定させる必要があります。正しい選択肢は、作成者名と文書の発行元が一致する立場を選ぶものです。

① まず設問の人物名を見たら、本文内でその名前が出る「肩書き・署名・連絡先・作成者欄」を最優先で探す（本文を上から精読するより、スキャンで"名寄せ"する）。
② 名前の直前・直後にあるラベル語（prepared by / written by / submitted by / from / author など）を手がかりに、「その人物が文書の発信者側か、受け手側か」を判定する。
③ 次に文書のヘッダーや部署名、ロゴ相当の表記（文書冒頭の組織名）を確認し、「発信元組織＝作成者の所属」という基本原則で結びつける。
④ 依頼者・宛先・対象施設など"登場する別組織"がある場合は、Client / To / For / Site reviewed などの項目を見て、発信元と受け手（依頼者）を混同しないように役割分担を整理する。
⑤ ひっかけの典型は「本文に出てくる名詞（依頼者名、建物名、見学・調査などの行為）」に引っ張られて"関係者っぽい"選択肢を選ばせるものなので、最後に「その立場の人が prepared by の位置に名前が載るのは自然か？」という文書慣習チェックで切り捨てる。

「人物特定は、内容理解より先に"署名・差出人・ヘッダー"で発信者を確定する。Client や訪問者などの"関係者"に引っ張られず、文書の型（誰が書き、誰に向けたものか）で所属を決める。」`,
};

const tr02AnalogQ3 = {
  id: 'tr02_an_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Most of the remaining desks are damaged and cannot be assigned."',
  promptJa:
    '［1］、［2］、［3］、［4］と記された箇所のうち、次の文が入るのに最もふさわしいのはどこですか。\n「残っているデスクの大半は破損しており、割り当てできない。」',
  choices: [
    { id: 'tr02_an_q3_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr02_an_q3_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr02_an_q3_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr02_an_q3_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr02_an_q3_b',
  explanationGeneralJa: `挿入文は「残っているデスク」についての追加情報であり、3階のデスク不足を述べた直後に置くのが自然です。本文②で「there are very few usable desks remaining on Floor 3（3階には使用可能なデスクがほとんど残っていない）」と述べた後の［2］に入れると、「数が少ない」だけでなく「残りも破損している」という否定的情報が続き、その後の「Therefore, we recommend relocating…（したがって移転を推奨）」にも論理的につながります。よって（B）が正解です。`,
  metacogFeedbackJa: `この問題は「文挿入（挿入位置特定）」タイプの問題です。挿入文が前後の文とどんな論理関係（補足・言い換え・原因→結果・対比など）を作るかを手がかりに、最も自然に"つながる場所"を選ばせる形式です。今回は、挿入文が「残っているデスク」についての追加説明なので、直前で「残っているデスク」に触れている箇所の直後に置くのが最短ルートになります。

① まず挿入文の「核」を抜き出す（主語・指示語・評価語）：何について述べ、どんな評価（否定/肯定）を足している文かを一言で言えるようにする。
② 挿入文にある"つなぎ目のサイン"を探す：the remaining / most of / damaged / cannot など、直前の名詞を受ける語や、追加の悪化情報・制約条件を足す語があるかを見る。
③ 候補位置の直前文だけを順に確認し、「同じ話題の名詞が出た直後か」「指示語が無理なく指せるか」をチェックする（remaining が何の remaining かが即答できる場所が最有力）。
④ 次に直後文との関係を確認し、「挿入文→直後文」が原因→結論、一般→具体、問題提起→提案の流れとして自然かを判定する。特に therefore / in contrast / nevertheless などの論理マーカーがある場合は、その直前に"結論の根拠"が積み上がっているかを優先する。
⑤ ひっかけの典型として、「同じ単語（desk / cost / network など）が出ているから」という表面一致で選ばない。挿入文が言っているのは"数量"ではなく"利用不能の理由（破損）"なので、数量・コスト・ネットワークの話題に寄っている位置は切り捨てる。

「挿入文のキーワード（指示語・評価語）が、直前の名詞を一発で指せる場所をまず探し、次に直後の論理マーカー（therefore など）と因果がつながるかで最終確認しよう。」`,
};

// ===== tr_02 類題1: Northridge Facilities Planning (Space Utilization) =====
const tr02Analog1 = {
  id: 'tr_02_an1',
  title: 'Northridge Facilities Planning Review',
  direction: 'Questions 172-174 refer to the following report.',
  directionJa: '設問172-174は次の報告書に関するものです。',
  paragraphsEn: tr02AnalogBodyEn,
  paragraphsJa: tr02AnalogBodyJa,
  sections: [
    {
      layoutType: 'report' as const,
      locale: 'en' as const,
      report: {
        header: 'NORTHRIDGE FACILITIES PLANNING',
        title: 'Space Utilization Review',
        meta: [
          { label: 'Client', value: 'Harborview Research Institute' },
          { label: 'Site reviewed', value: 'West Annex Office Suite (Floors 3–4)' },
          {
            label: 'Purpose',
            value:
              "To determine whether the West Annex can continue to support the institute's current staffing level",
          },
          { label: 'Dates', value: '3–7 March' },
        ],
        bodyTitle: 'Summary of key findings by the review team:',
        body: tr02AnalogBodyEn,
        footer: 'Review prepared by: Elena Park and Darius Nguyen',
      },
    },
    {
      layoutType: 'report' as const,
      locale: 'ja' as const,
      report: {
        header: 'ノースリッジ施設計画部',
        title: 'スペース利用状況レビュー',
        meta: [
          { label: '依頼者', value: 'ハーバービュー研究所' },
          { label: '調査対象', value: 'ウエスト別館オフィス（3～4階）' },
          {
            label: '目的',
            value: 'ウエスト別館が研究所の現在の人員規模を今後も支えられるかを判断するため',
          },
          { label: '日付', value: '3月3日～7日' },
        ],
        bodyTitle: 'レビューチームによる主な調査結果の概要：',
        body: tr02AnalogBodyJa,
        footer: '作成者：Elena Park、Darius Nguyen',
      },
    },
  ],
  questions: [
    { ...tr02AnalogQ1, id: 'tr_02_an1_q1' },
    { ...tr02AnalogQ2, id: 'tr_02_an1_q2' },
    { ...tr02AnalogQ3, id: 'tr_02_an1_q3' },
  ],
};

// ===== tr_02 類題2: Northridge Facilities Services (Equipment Inspection) =====

const tr02Analog2BodyEn = [
  `Summary of main findings of the inspection team: — [1] —. We reviewed maintenance logs and inspected two ventilation units that serve the second-floor study area. First, we examined Unit A, located above the north stairwell. After testing airflow and opening the housing, we found that only a small portion of the filter surface remains usable. — [2] —. Therefore, we recommend replacing Unit A within the next six months. In addition, continuing to repair Unit A is not cost-effective, even though it is easier to access than Unit B.`,
  `In contrast, Unit B, installed near the east windows, is in stable condition and has sufficient capacity for current occupancy levels. Measurements taken over three days show consistent airflow and normal energy use. If the study area's hours and seating capacity remain unchanged, Unit B can likely operate for at least two more years without major service. — [3] —. Operating costs may rise slightly as parts become harder to source, but we expect the unit to remain economical. — [4] —.`,
];

const tr02Analog2BodyJa = [
  `点検チームの主な所見の概要：—［1］—。私たちは保守記録を確認し、2階自習エリアに給気する換気装置2台を点検した。まず、北側階段の上部にある装置Aを調べた。風量を測定し外装を開けたところ、フィルター表面のうち使用可能な部分がごく一部しか残っていないことが分かった。—［2］—。したがって、装置Aは今後6か月以内に交換することを勧める。さらに、装置Bより点検しやすい場所にあるとしても、装置Aを修理し続けるのは費用対効果が低い。`,
  `対照的に、東側の窓付近に設置された装置Bは状態が安定しており、現在の利用者数に対して十分な能力がある。3日間の測定では、風量は一貫しており、消費電力も正常だった。自習エリアの開館時間と座席数が変わらなければ、装置Bは大きな整備なしで少なくともあと2年は稼働できる可能性が高い。—［3］—。部品の調達が難しくなるにつれて運用コストがわずかに上がるかもしれないが、引き続き経済的に運用できると見込む。—［4］—。`,
];

const tr02Analog2Q1 = {
  id: 'tr_02_an2_q1',
  promptEn: 'What does the report suggest about Unit B?',
  promptJa: '報告書は装置Bについて何を示唆していますか。',
  choices: [
    {
      id: 'tr_02_an2_q1_a',
      textEn: 'It should remain economical for some time.',
      textJa: 'しばらくの間は経済的に運用できるだろう。',
    },
    {
      id: 'tr_02_an2_q1_b',
      textEn: 'It must be replaced immediately.',
      textJa: '直ちに交換しなければならない。',
    },
    {
      id: 'tr_02_an2_q1_c',
      textEn: 'It is unsafe because of inconsistent airflow.',
      textJa: '風量が安定しないため安全ではない。',
    },
    {
      id: 'tr_02_an2_q1_d',
      textEn: 'It cannot handle current occupancy levels.',
      textJa: '現在の利用者数に対応できない。',
    },
  ],
  correctChoiceId: 'tr_02_an2_q1_a',
  explanationGeneralJa: `③では装置Bについて述べられており、「at least two more years without major service（少なくともあと2年は大きな整備なしで稼働できる）」や「we expect the unit to remain economical（経済的に運用できると見込む）」とあるため、（A）が正解です。
（B）は装置Aについて「replacing Unit A within the next six months」とある内容で、装置Bの即時交換は述べられていません。（C）は「consistent airflow（風量が一貫している）」と反対です。（D）も「has sufficient capacity for current occupancy levels（現在の利用者数に対して十分な能力がある）」と反します。`,
  metacogFeedbackJa: `この問題は「特定対象（装置B）についての要点把握（詳細理解）」タイプの問題です。報告書の中で装置Aと装置Bが対比され、装置Bの評価（状態・能力・コスト見通し）がまとまって述べられているため、設問はその"評価の結論"を言い換えた選択肢を選ばせています。正しい選択肢は、装置Bの「経済性の見通し」を述べた一文を抽象化した内容になっています。

①設問の名詞（今回なら「装置B」）に丸をつけ、「その対象だけを説明している段落」を先に探す（報告書は見出し・対比語で対象が切り替わることが多い）。
②対象段落を読んだら、まず「評価の軸」を3点に分解して拾う：①状態（良い/悪い）②性能（足りる/足りない、安定/不安定）③今後の対応（交換/継続運用、コスト見通し）。この3軸のどれを問う設問かを意識して読む。
③"suggest" は「断定」より一段弱いので、本文の断言表現（expect / likely / can operate など）を「見通し・推奨」に言い換えて選択肢と照合する（本文→選択肢の抽象化を許容する）。
④ひっかけの典型は「別対象の情報の混入」と「否定・極端語（immediately / unsafe / cannot など）」なので、選択肢に強い断定や危険・不可能が出たら、本文に同じ強さの表現があるかを必ず確認し、なければ切る。
⑤最後に、選択肢が本文のどの"評価軸"に対応しているかをラベリングして、本文が述べている軸と一致するものだけを残す（性能の話をコストの話にすり替えた選択肢などを排除できる）。

「まず設問の対象が切り替わる位置を特定し、その段落では"状態・性能・今後（コスト/対応）"のどれを聞かれているかを軸で整理して読む。極端な断定の選択肢は、本文に同じ強さの根拠がない限り疑って切る。」`,
};

const tr02Analog2Q2 = {
  id: 'tr_02_an2_q2',
  promptEn: 'Who most likely are Ms. Park and Mr. Nguyen?',
  promptJa: 'ParkさんとNguyenさんは誰だと考えられますか。',
  choices: [
    {
      id: 'tr_02_an2_q2_a',
      textEn: 'Librarians at the East Branch',
      textJa: '東分館の司書',
    },
    {
      id: 'tr_02_an2_q2_b',
      textEn: 'Customers who use the study area',
      textJa: '自習エリアの利用者',
    },
    {
      id: 'tr_02_an2_q2_c',
      textEn: 'Owners of Harborview Public Library',
      textJa: 'Harborview 公立図書館の所有者',
    },
    {
      id: 'tr_02_an2_q2_d',
      textEn: 'Employees of Northridge Facilities Services',
      textJa: 'Northridge 施設サービスの従業員',
    },
  ],
  correctChoiceId: 'tr_02_an2_q2_d',
  explanationGeneralJa: `④に「Inspection prepared by: Elena Park and Darius Nguyen」とあり、点検書の作成者であることが分かります。また、文書の見出しが「NORTHRIDGE FACILITIES SERVICES」なので、この2人は同社の担当者（従業員）と考えるのが自然です。よって（D）が正解です。
（A）（B）は点検書の作成者として不自然です。（C）も依頼者は①の「Client: Harborview Public Library」であり、作成者が図書館の所有者だとは読み取れません。`,
  metacogFeedbackJa: `この問題は「人物特定（肩書き・所属推定）」タイプの問題です。本文中の人名が「何者か」を、文書の体裁（見出し・作成者欄・依頼者欄など）から推論させます。今回は、作成者名が明示され、さらに文書の発行元（会社名）が冒頭に出ているため、所属を結びつければ正しい選択肢に到達できます。

① まず"文書の種類"を見抜く：報告書・請求書・案内・メールなど、形式が決まっている文書は「誰が書き、誰に向け、誰のためのものか」が定型欄に出ます。設問が人物特定なら、本文の内容理解より先にヘッダー／署名／作成者欄／宛先欄を探すのが近道です。
② 人名が出たら"役割ラベル"を探す：prepared by / written by / submitted by / contact / client / recipient などの語の直後は、人物の立場（作成者・連絡先・依頼者側など）を確定できるポイントです。
③ "組織名の階層"を整理する：文書の最上部にある会社名・団体名は「発行元」、client/customer は「依頼元」、site/location は「場所」と役割が違います。人名がどの欄に載っているかで、発行元側か依頼元側かを切り分けます。
④ ひっかけの切り捨て方：選択肢に本文中の場所名（支店名・フロア名）や施設名があると「そこにいる人＝その所属」と短絡しがちですが、報告書では"点検場所"と"作成者の所属"は別です。場所に引っ張られた選択肢は、作成者欄・発行元欄と一致する根拠がなければ捨てます。

「人名が問われたら、まず署名・作成者・宛先・依頼者の欄を見て、発行元（誰の文書か）と役割ラベル（何として名前が出ているか）をセットで確定してから選択肢を選ぼう。」`,
};

const tr02Analog2Q3 = {
  id: 'tr_02_an2_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Most of the remaining material is clogged with dust and cannot be cleaned effectively."',
  promptJa:
    '［1］、［2］、［3］、［4］と記された箇所のうち、次の文が入るのに最もふさわしいのはどこですか。\n「残っている部分の大半はほこりで詰まっており、効果的に清掃できない。」',
  choices: [
    { id: 'tr_02_an2_q3_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr_02_an2_q3_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr_02_an2_q3_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr_02_an2_q3_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr_02_an2_q3_b',
  explanationGeneralJa: `挿入文は「残っている部分の大半が詰まっていて清掃できない」という、装置Aのフィルター状態に関する追加の否定的情報です。②で「only a small portion of the filter surface remains usable（使用可能な部分がごく一部しか残っていない）」と述べた直後の［2］に入れると、「少ししか使えない上に、残りも詰まっていて清掃できない」という流れになり、その後の「Therefore, we recommend replacing Unit A…（したがって交換を勧める）」にも自然につながります。よって（B）が正解です。`,
  metacogFeedbackJa: `この問題は「文挿入（挿入位置特定）」タイプの問題です。挿入文が"どの話題（対象）についての追加情報か"と、"前後の論理（原因→結論、対比など）"に合う場所を探す必要があります。今回は、挿入文がフィルターの状態をさらに悪く説明し、その後の提案（交換推奨）へつながる位置に置くのが自然です。

①まず挿入文の「指示語・名詞」をチェックし、何についての文かを特定する（例：remaining material＝何の残りか、cannot be cleaned＝清掃の可否など）。
②本文の空所前後を「話題の単位」で区切って読む（装置Aの説明ブロック／装置Bの説明ブロック／結論・提案ブロックなど）。挿入文が属する話題ブロックにだけ候補を絞る。
③空所の直前文と挿入文を「同じ名詞を別表現で言い換えているか（パラフレーズ）」でつなぐ（filter surface ↔ remaining material のように、同一対象を指す言い換えがあると強い手がかり）。
④挿入文の役割を判定する：追加の悪化情報なのか、理由付けなのか、結論なのか。今回のような"否定的な追加情報"は、直後に「Therefore」「recommend」などの結論・提案が来る位置に置くと論理が締まりやすい。
⑤ひっかけの切り捨て：本文に「dust」「operating costs」など似た語が出る場所へ"単語一致"で飛びつかない。挿入文が述べているのは「清掃できないほど詰まっている」という"状態評価"なので、運用年数・コスト見通し・対比導入など別の論点の段落に入れると話題がズレる、と機械的に判断して除外する。

「挿入文は"何についての追加情報か"を先に確定し、同じ対象を扱う文の直後（または結論へ橋渡しする直前）に置く。単語が似ているだけの場所ではなく、話題と論理の流れが連結する場所だけを残す。」`,
};

const tr02Analog2 = {
  id: 'tr_02_an2',
  title: 'Northridge Facilities Services Equipment Inspection',
  direction: 'Questions 172-174 refer to the following report.',
  directionJa: '設問172-174は次の報告書に関するものです。',
  paragraphsEn: tr02Analog2BodyEn,
  paragraphsJa: tr02Analog2BodyJa,
  sections: [
    {
      layoutType: 'report' as const,
      locale: 'en' as const,
      report: {
        header: 'NORTHRIDGE FACILITIES SERVICES',
        title: 'Equipment Inspection',
        meta: [
          { label: 'Client', value: 'Harborview Public Library' },
          { label: 'Site examined', value: 'East Branch—Second-Floor Study Area' },
          {
            label: 'Purpose',
            value:
              'To determine whether the current ventilation units can continue operating reliably and to recommend next steps',
          },
          { label: 'Dates', value: '3–5 October' },
        ],
        bodyTitle: 'Summary of main findings of the inspection team:',
        body: tr02Analog2BodyEn,
        footer: 'Inspection prepared by: Elena Park and Darius Nguyen',
      },
    },
    {
      layoutType: 'report' as const,
      locale: 'ja' as const,
      report: {
        header: 'Northridge 施設サービス',
        title: '設備点検',
        meta: [
          { label: '依頼者', value: 'Harborview 公立図書館' },
          { label: '点検場所', value: '東分館―2階自習エリア' },
          {
            label: '目的',
            value: '現在の換気装置が今後も信頼して稼働できるかを判断し、次の対応を提案すること',
          },
          { label: '日付', value: '10月3日〜5日' },
        ],
        bodyTitle: '点検チームの主な所見の概要：',
        body: tr02Analog2BodyJa,
        footer: '点検書作成者：Elena Park および Darius Nguyen',
      },
    },
  ],
  questions: [tr02Analog2Q1, tr02Analog2Q2, tr02Analog2Q3],
};

// ===== tr_02 類題3: Harborview Facilities Services (Equipment Condition Review) =====

const tr02Analog3BodyEn = [
  `Summary of main findings of the review team: — [1] —. We inspected the condition of the lighting fixtures and control panels in two sections of the Main Hall: the Front Truss and the Rear Truss. First, we tested the Front Truss fixtures during a full-power run and reviewed maintenance logs from the past 18 months. After the tests, we concluded that only a small number of fixtures on the Front Truss remain usable. — [2] —. Therefore, we recommend discontinuing use of the Front Truss for public events within the next six months. In addition, continuing to repair the Front Truss is not cost-effective, even though it is easier to access than the Rear Truss.`,
  `In contrast, the Rear Truss fixtures are in stable condition and can be maintained for a longer period. Our measurements indicate that the wiring and dimmer modules can support current lighting demands for at least two more years. If the center continues with routine inspections at the current frequency, the Rear Truss can remain in service for approximately three years. — [3] —. Operating costs will gradually increase because replacement parts will become harder to source. Nevertheless, we believe the system will remain workable for scheduled productions. — [4] —.`,
];

const tr02Analog3BodyJa = [
  `レビューチームの主な調査結果の概要：—［1］—。当チームは、メインホール内の2つの区画（前方トラスと後方トラス）にある照明器具と制御盤の状態を点検した。まず、前方トラスの照明を最大出力で動作させて試験し、過去18か月の保守記録も確認した。試験の結果、前方トラスで使用可能な器具はごく一部しか残っていないと結論づけた。—［2］—。したがって、今後6か月以内に前方トラスを一般向けイベントで使用しないことを推奨する。さらに、後方トラスよりもアクセスしやすいとしても、前方トラスの修理を継続するのは費用対効果が低い。`,
  `対照的に、後方トラスの器具は安定した状態で、より長期間の維持が可能である。測定の結果、配線と調光モジュールは少なくともあと2年間、現在の照明需要に対応できることが分かった。点検頻度を現状のまま維持すれば、後方トラスは約3年間運用できる。—［3］—。交換部品の入手が難しくなるため、運用コストは徐々に上昇するだろう。それでも、公演予定に対してシステムは引き続き使用可能だと考える。—［4］—。`,
];

const tr02Analog3Q1 = {
  id: 'tr_02_an3_q1',
  promptEn: 'What does the report suggest about the Rear Truss fixtures?',
  promptJa: '報告書は後方トラスの照明器具について何を示唆していますか。',
  choices: [
    {
      id: 'tr_02_an3_q1_a',
      textEn: 'They can continue to be used for several more years.',
      textJa: 'あと数年間は使用を継続できる。',
    },
    {
      id: 'tr_02_an3_q1_b',
      textEn: 'They should be replaced immediately to reduce electricity use.',
      textJa: '電力使用量を減らすため、直ちに交換すべきである。',
    },
    {
      id: 'tr_02_an3_q1_c',
      textEn: 'They require additional testing before any events are scheduled.',
      textJa: 'イベントを予定する前に、追加の検査が必要である。',
    },
    {
      id: 'tr_02_an3_q1_d',
      textEn: 'They are unsafe because they are difficult to access.',
      textJa: 'アクセスしにくいため危険である。',
    },
  ],
  correctChoiceId: 'tr_02_an3_q1_a',
  explanationGeneralJa: `③で後方トラスについて述べられており、「at least two more years」「approximately three years」とあるため、今後もしばらく使用できることが分かります。よって（A）が正解です。
（B）省電力のために直ちに交換するとは書かれていません。（C）追加検査が必要とは述べられていません。（D）アクセスのしにくさを理由に危険だとは書かれていません。`,
  metacogFeedbackJa: `この問題は「要点把握（suggest / indicate で問う"本文の結論"）」タイプの問題です。設問が細部の数字そのものではなく「報告書が後方トラスについて何を示唆するか」と、評価・見通し（今後どうなるか）をまとめて答えさせています。正しい選択肢は、後方トラスが今後もしばらく運用可能だという結論部分を言い換えたものです。

①設問の動詞（suggest / indicate / imply）を見たら、「1文の根拠」ではなく「段落の結論（評価＋見通し）」を探すと決める。
②対象語（今回は設備名）を本文中でスキャンし、説明がまとまっている段落に直行する（報告書・レビューは"対象ごとに段落が分かれる"ことが多い）。
③その段落では、まず評価語を拾う（stable, workable, can support, remain in service など）→次に期間・条件（at least / approximately / if など）をセットで読む。期間は「数字暗記」ではなく「継続可／不可の方向性」を決める材料として使う。
④選択肢は「言い換え一致」で選ぶ：本文が"継続可能"なら、選択肢も"継続可能"という抽象度で一致していればよい（数字が一致している必要はない）。
⑤ひっかけの切り捨て方：本文にない"目的の追加"に注意する（例：省電力のため、追加テストが必要、安全上危険など）。報告書は理由や推奨が書かれていても、書かれていない目的・因果（〜するために）を選択肢が勝手に足している場合は不正解にする。

「suggest系は"段落の結論"を取りに行く。対象箇所を特定したら、評価語＋期間/条件をセットで押さえ、選択肢の余計な目的・因果の付け足しは切る。」`,
};

const tr02Analog3Q2 = {
  id: 'tr_02_an3_q2',
  promptEn: 'Who most likely are Ms. Kwon and Mr. Ibarra?',
  promptJa: 'Kwon さんと Ibarra さんは誰だと考えられますか。',
  choices: [
    {
      id: 'tr_02_an3_q2_a',
      textEn: 'Stage performers at the arts center',
      textJa: '芸術センターの出演者',
    },
    {
      id: 'tr_02_an3_q2_b',
      textEn: 'Electricians employed by the client organization',
      textJa: '依頼者側の組織に雇用されている電気技師',
    },
    {
      id: 'tr_02_an3_q2_c',
      textEn: 'Owners of the community arts center',
      textJa: '地域芸術センターのオーナー',
    },
    {
      id: 'tr_02_an3_q2_d',
      textEn: 'Employees of Harborview Facilities Services',
      textJa: 'Harborview 施設サービスの従業員',
    },
  ],
  correctChoiceId: 'tr_02_an3_q2_d',
  explanationGeneralJa: `④に「Review prepared by」として2名の名前があり、報告書のヘッダーは「HARBORVIEW FACILITIES SERVICES」となっています。したがって、作成者である2名は同社の従業員と考えるのが自然で（D）が正解です。
（A）（B）（C）本文には、出演者・依頼者側の技師・オーナーであることを示す情報はありません。`,
  metacogFeedbackJa: `この問題は「人物の立場・所属の推論」タイプの問題です。本文に肩書きが明示されていない人物について、文書の体裁（ヘッダー、作成者欄、依頼者欄など）から"誰の側の人か"を推定させます。今回は、報告書の会社名と「作成者」情報の組み合わせから、作成者がその会社の人だと判断します。

①まず文書の"外枠情報"を拾う：ヘッダー（発行元）、文書種（報告書・請求書・案内など）、作成者／署名欄、宛先（To/Client）を最初に確認する。
②人名が出たら「誰が誰に向けて書いているか」を線で結ぶ：発行元＝書き手側、Client/To＝受け手側、という基本対応を置いてから読む。
③本文中の役割語に注目する：review team, we inspected, we recommend のような表現は「外部評価者／作業担当者」側の語りになりやすいので、依頼者側（クライアント）と混同しない。
④ひっかけの切り捨て方：本文に専門的な作業（点検・配線・モジュール等）が出ると「電気技師」など"職種"の選択肢に引っ張られやすいが、職種は推測できても「雇用主（どこ所属か）」は別問題。所属はヘッダー・作成者欄・Client欄のようなメタ情報で確定させる。
⑤最後に「所属が本文で直接支持されるか」をチェック：オーナー・出演者などは、通常は署名欄や自己紹介、役職表記が出やすい。そうした明示がない選択肢は"それっぽさ"だけで選ばない。

「人名が出たら、まず本文の内容ではなくヘッダー／作成者／宛先で"書き手側・受け手側"を確定してから選ぶ。専門用語に引っ張られて職種当てにすり替えない。」`,
};

const tr02Analog3Q3 = {
  id: 'tr_02_an3_q3',
  promptEn:
    'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Most of the remaining units flicker and do not meet performance standards."',
  promptJa:
    '［1］、［2］、［3］、［4］と記された箇所のうち、次の文が入るのに最もふさわしいのはどこですか。\n「残っている機器の大半はちらつきがあり、性能基準を満たしていない。」',
  choices: [
    { id: 'tr_02_an3_q3_a', textEn: '[1]', textJa: '［1］' },
    { id: 'tr_02_an3_q3_b', textEn: '[2]', textJa: '［2］' },
    { id: 'tr_02_an3_q3_c', textEn: '[3]', textJa: '［3］' },
    { id: 'tr_02_an3_q3_d', textEn: '[4]', textJa: '［4］' },
  ],
  correctChoiceId: 'tr_02_an3_q3_b',
  explanationGeneralJa: `挿入文は「残っている機器」の問題点（ちらつき・基準未達）を述べています。②では前方トラスについて「only a small number of fixtures … remain usable（使用可能なのはごく一部）」と結論を述べた直後に［2］があります。そこに挿入すると、「数が少ない」だけでなく「品質（性能）も悪い」という追加の否定情報になり、その後の「Therefore, we recommend…（したがって…を推奨する）」という結論につながりが自然です。よって（B）が正解です。`,
  metacogFeedbackJa: `この問題は「挿入（文挿入）」タイプの問題です。挿入文が指す対象（remaining units）と評価語（flicker / do not meet standards）が、本文のどの話題（どの設備・どの結論）にぶら下がる"追加情報"なのかを見極める必要があります。今回は「使用可能なのは少数」という評価の直後に「残りの大半は基準未達」という"同じ対象への追い打ち情報"を置くと、次の推奨（Therefore…）への因果が最も滑らかになります。

①まず挿入文を「役割」で分類する：定義なのか、例示なのか、原因なのか、追加の評価（良い／悪い）なのかを決める（今回は"否定的な追加評価"）。
②挿入文のキーワードが指す「参照先」を探す：the remaining / most / units のような語は、直前に数量・残存・使用可否が出ている文脈に接続しやすい。代名詞や限定語が何を指すかが曖昧な位置は避ける。
③直前・直後の論理接続をチェックする：Therefore / In contrast / Nevertheless などの接続語の前後は、因果・対比・譲歩の"型"が崩れない場所に入れる。挿入文が「結論の根拠を厚くする文」なら、Therefore の直前が第一候補になる。
④話題のスコープ（どの対象を話している段落か）を合わせる：同じ段落内でも、対象がA設備→B設備へ切り替わる境目（対比の開始点など）に入れると、参照先がズレて読みにくくなる。
⑤ひっかけの切り捨て方：挿入文にある単語（performance, standards など）と"同じ単語が出ている場所"に機械的に寄せない。代わりに「その文を入れた結果、前後が"同じ対象・同じ評価軸"で連続しているか」「接続語の論理が自然か」で判断する。

次に同じタイプが出たら、「挿入文は"何の役割の一文か"を先に決め、代名詞・限定語の参照先が一意に定まる場所にだけ候補を絞ろう。最後に接続語（Therefore/However/In contrast）で論理の形が崩れないかを確認しよう。」`,
};

const tr02Analog3 = {
  id: 'tr_02_an3',
  title: 'Harborview Facilities Services Equipment Condition Review',
  direction: 'Questions 172-174 refer to the following report.',
  directionJa: '設問172-174は次の報告書に関するものです。',
  paragraphsEn: tr02Analog3BodyEn,
  paragraphsJa: tr02Analog3BodyJa,
  sections: [
    {
      layoutType: 'report' as const,
      locale: 'en' as const,
      report: {
        header: 'HARBORVIEW FACILITIES SERVICES',
        title: 'Equipment Condition Review',
        meta: [
          { label: 'Client', value: 'Larkspur Community Arts Center' },
          { label: 'Item examined', value: 'Auditorium lighting system (Main Hall)' },
          {
            label: 'Purpose',
            value:
              'To determine whether the current lighting system can support scheduled performances for the next several years',
          },
          { label: 'Dates', value: '3–6 October' },
        ],
        bodyTitle: 'Summary of main findings of the review team:',
        body: tr02Analog3BodyEn,
        footer: 'Review prepared by: Nadia Kwon and Peter Ibarra',
      },
    },
    {
      layoutType: 'report' as const,
      locale: 'ja' as const,
      report: {
        header: 'Harborview 施設サービス',
        title: '設備状態レビュー',
        meta: [
          { label: '依頼者', value: 'Larkspur 地域芸術センター' },
          { label: '調査対象', value: '講堂（メインホール）の照明システム' },
          {
            label: '目的',
            value: '現在の照明システムが今後数年間の公演予定に対応できるかを判断するため',
          },
          { label: '日付', value: '10月3日〜6日' },
        ],
        bodyTitle: 'レビューチームの主な調査結果の概要：',
        body: tr02Analog3BodyJa,
        footer: '作成者：Nadia Kwon および Peter Ibarra',
      },
    },
  ],
  questions: [tr02Analog3Q1, tr02Analog3Q2, tr02Analog3Q3],
};

// tr_02用類題（3つとも別内容）
const tr02Analogs = [tr02Analog1, tr02Analog2, tr02Analog3];

const tr02Passage: Passage = {
  id: 'tr_02',
  title: 'Kimberley Consulting Geoengineers Resource Assessment',
  direction: 'Questions 172-175 refer to the following report.',
  directionJa: '設問172-175は次の報告書に関するものです。',
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
