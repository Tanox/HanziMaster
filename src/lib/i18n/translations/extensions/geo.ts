// src/lib/i18n/translations/extensions/geo.ts v5.2.49
/** 首页事实区与 FAQ 文案：为搜索引擎与生成式引擎提供真实、可引用、服务端可抓取的内容。 */
interface GeoTexts {
  factsTitle: string;
  factsLead: string;
  fact1: string;
  fact2: string;
  fact3: string;
  faqTitle: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
}

export const geoByLocale: Record<string, GeoTexts> = {
  en: {
    factsTitle: 'About HanziMaster',
    factsLead:
      'HanziMaster is a free, browser-only app for beginners learning Chinese characters. Everything runs in the browser: no account, no server-side learning data.',
    fact1: '12 foundational characters: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Each character has stroke-order animations, pinyin, words, example sentences and Tian-zi-ge writing practice, plus pinyin quizzes.',
    fact3:
      '11 interface languages, dark mode, and progress stored only in this browser (localStorage).',
    faqTitle: 'Frequently asked questions',
    q1: 'Do I need an account or have to pay?',
    a1: 'No. HanziMaster is free and requires no account. Learning progress stays in your browser localStorage.',
    q2: 'What can I learn?',
    a2: '12 foundational Chinese characters with stroke order, pinyin, words and example sentences, plus Tian-zi-ge writing practice and pinyin quizzes.',
    q3: 'Is my learning data uploaded or graded by AI?',
    a3: 'No. There is no AI grading or server-side learning record. Stroke order is a static SVG demonstration; analytics load only after you consent.',
  },
  'zh-CN': {
    factsTitle: '关于 HanziMaster',
    factsLead:
      'HanziMaster 是面向零基础学习者的免费汉字学习应用，纯前端运行：无需账号，也不上传学习数据。',
    fact1: '12 个基础汉字：一、二、三、人、大、小、口、日、月、山、水、火。',
    fact2: '每个字都有笔顺演示、拼音、词语、例句与田字格书写练习，并配拼音测验。',
    fact3: '支持 11 种界面语言与深色模式；学习进度只保存在本机浏览器，免费使用。',
    faqTitle: '常见问题',
    q1: '需要注册或付费吗？',
    a1: '不需要。HanziMaster 完全免费、无需账号，学习进度保存在浏览器 localStorage 中。',
    q2: '可以学到哪些内容？',
    a2: '12 个基础汉字的字形、拼音、笔顺、词语与例句，以及田字格书写练习和拼音测验。',
    q3: '学习数据会上传或用于 AI 评分吗？',
    a3: '不会。应用没有 AI 评分或服务端学习记录，笔顺是静态 SVG 演示；统计脚本仅在您同意后加载。',
  },
  'zh-TW': {
    factsTitle: '關於 HanziMaster',
    factsLead:
      'HanziMaster 是面向零基礎學習者的免費漢字學習應用，純前端執行：不需帳號，也不上傳學習資料。',
    fact1: '12 個基礎漢字：一、二、三、人、大、小、口、日、月、山、水、火。',
    fact2: '每個字都有筆順演示、拼音、詞語、例句與田字格書寫練習，並附拼音測驗。',
    fact3: '支援 11 種介面語言與深色模式；學習進度只存於本機瀏覽器，免費使用。',
    faqTitle: '常見問題',
    q1: '需要註冊或付費嗎？',
    a1: '不需要。HanziMaster 完全免費、無需帳號，學習進度儲存在瀏覽器 localStorage 中。',
    q2: '可以學到哪些內容？',
    a2: '12 個基礎漢字的字形、拼音、筆順、詞語與例句，以及田字格書寫練習和拼音測驗。',
    q3: '學習資料會上傳或用於 AI 評分嗎？',
    a3: '不會。應用沒有 AI 評分或伺服端學習紀錄，筆順是靜態 SVG 演示；統計指令碼僅在您同意後載入。',
  },
  ja: {
    factsTitle: 'HanziMaster について',
    factsLead:
      'HanziMaster は初めて漢字を学ぶ人向けの無料ブラウザアプリです。すべてブラウザ内で動作し、アカウントも学習データの送信も不要です。',
    fact1: '基礎漢字 12 字：一 二 三 人 大 小 口 日 月 山 水 火。',
    fact2:
      '各字に筆順演示、ピンイン、語句、例文、田字格の書写練習を用意し、ピンインクイズもあります。',
    fact3:
      '11 言語のインターフェースと深色モードに対応。進捗はこのブラウザの localStorage にのみ保存されます。',
    faqTitle: 'よくある質問',
    q1: '登録や料金は必要ですか？',
    a1: '不要です。HanziMaster は無料でアカウント不要、学習進捗はブラウザの localStorage に保存されます。',
    q2: '何を学べますか？',
    a2: '基礎漢字 12 字の字形・ピンイン・筆順・語句・例文に加え、田字格の書写練習とピンインクイズを学べます。',
    q3: '学習データは送信されますか？AI が採点しますか？',
    a3: 'いいえ。AI 採点やサーバー側の学習記録はありません。筆順は静的 SVG 演示で、統計スクリプトは同意後のみ読み込まれます。',
  },
  ko: {
    factsTitle: 'HanziMaster 소개',
    factsLead:
      'HanziMaster는 한자를 처음 배우는 사람을 위한 무료 브라우저 앱입니다. 모든 기능이 브라우저에서 실행되며 계정이나 학습 데이터 전송이 필요 없습니다.',
    fact1: '기초 한자 12자: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2: '각 글자에 필순 시연, 병음, 단어, 예문, 전자격 쓰기 연습이 있고 병음 퀴즈도 제공됩니다.',
    fact3:
      '11개 인터페이스 언어와 다크 모드를 지원하며, 학습 기록은 이 브라우저의 localStorage에만 저장됩니다.',
    faqTitle: '자주 묻는 질문',
    q1: '가입하거나 비용을 내야 하나요?',
    a1: '아니요. HanziMaster는 무료이며 계정이 필요 없습니다. 학습 기록은 브라우저 localStorage에 저장됩니다.',
    q2: '무엇을 배울 수 있나요?',
    a2: '기초 한자 12자의 자형·병음·필순·단어·예문과 전자격 쓰기 연습, 병음 퀴즈를 배울 수 있습니다.',
    q3: '학습 데이터가 업로드되거나 AI가 채점하나요?',
    a3: '아니요. AI 채점이나 서버 측 학습 기록이 없으며 필순은 정적 SVG 시연입니다. 통계 스크립트는 동의 후에만 로드됩니다.',
  },
  es: {
    factsTitle: 'Acerca de HanziMaster',
    factsLead:
      'HanziMaster es una aplicación gratuita que funciona solo en el navegador para quienes empiezan a aprender caracteres chinos. Sin cuenta y sin datos de aprendizaje en un servidor.',
    fact1: '12 caracteres fundamentales: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Cada carácter incluye animación del orden de trazos, pinyín, palabras, frases de ejemplo y práctica de escritura en cuadrícula Tian-zi-ge, además de cuestionarios de pinyín.',
    fact3:
      '11 idiomas de interfaz, modo oscuro y progreso guardado únicamente en este navegador (localStorage).',
    faqTitle: 'Preguntas frecuentes',
    q1: '¿Necesito una cuenta o pagar?',
    a1: 'No. HanziMaster es gratuito y no requiere cuenta. El progreso se guarda en el localStorage de tu navegador.',
    q2: '¿Qué puedo aprender?',
    a2: '12 caracteres chinos fundamentales con orden de trazos, pinyín, palabras y frases de ejemplo, además de escritura en Tian-zi-ge y cuestionarios de pinyín.',
    q3: '¿Se suben mis datos o los evalúa una IA?',
    a3: 'No. No hay evaluación por IA ni registros de aprendizaje en un servidor. El orden de trazos es una demostración SVG estática; las estadísticas solo cargan si das tu consentimiento.',
  },
  fr: {
    factsTitle: 'À propos de HanziMaster',
    factsLead:
      'HanziMaster est une application gratuite, entièrement dans le navigateur, pour débuter l’apprentissage des caractères chinois. Sans compte ni données d’apprentissage sur un serveur.',
    fact1: '12 caractères fondamentaux : 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Chaque caractère propose l’animation de l’ordre des traits, le pinyin, des mots, des phrases d’exemple et l’écriture sur grille Tian-zi-ge, avec des quiz de pinyin.',
    fact3:
      '11 langues d’interface, mode sombre et progression stockée uniquement dans ce navigateur (localStorage).',
    faqTitle: 'Questions fréquentes',
    q1: 'Faut-il un compte ou payer ?',
    a1: 'Non. HanziMaster est gratuit et sans compte. La progression reste dans le localStorage de votre navigateur.',
    q2: 'Que peut-on apprendre ?',
    a2: '12 caractères chinois fondamentaux avec ordre des traits, pinyin, mots et phrases d’exemple, plus l’écriture Tian-zi-ge et des quiz de pinyin.',
    q3: 'Mes données sont-elles envoyées ou notées par une IA ?',
    a3: 'Non. Aucune notation par IA ni historique d’apprentissage sur serveur. L’ordre des traits est une démonstration SVG statique ; les statistiques ne se chargent qu’après consentement.',
  },
  de: {
    factsTitle: 'Über HanziMaster',
    factsLead:
      'HanziMaster ist eine kostenlose, reine Browser-App für Einsteiger in chinesische Zeichen. Ohne Konto und ohne serverseitige Lerndaten.',
    fact1: '12 grundlegende Zeichen: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Zu jedem Zeichen gibt es Strichfolgen-Animationen, Pinyin, Wörter, Beispielsätze und Tian-zi-ge-Schreibübungen sowie Pinyin-Quiz.',
    fact3:
      '11 Oberflächensprachen, Dunkelmodus und Fortschritt ausschließlich im localStorage dieses Browsers.',
    faqTitle: 'Häufige Fragen',
    q1: 'Brauche ich ein Konto oder muss ich bezahlen?',
    a1: 'Nein. HanziMaster ist kostenlos und ohne Konto nutzbar. Der Fortschritt bleibt im localStorage deines Browsers.',
    q2: 'Was kann ich lernen?',
    a2: '12 grundlegende chinesische Zeichen mit Strichfolge, Pinyin, Wörtern und Beispielsätzen, plus Tian-zi-ge-Schreibübung und Pinyin-Quiz.',
    q3: 'Werden Lerndaten hochgeladen oder von einer KI bewertet?',
    a3: 'Nein. Es gibt keine KI-Bewertung und keine serverseitige Lernhistorie. Die Strichfolge ist eine statische SVG-Demonstration; Statistik-Skripte laden nur nach Zustimmung.',
  },
  'pt-BR': {
    factsTitle: 'Sobre o HanziMaster',
    factsLead:
      'HanziMaster é um aplicativo gratuito que funciona apenas no navegador para quem está começando a aprender caracteres chineses. Sem conta e sem dados de aprendizado em servidor.',
    fact1: '12 caracteres fundamentais: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Cada caractere tem animação da ordem dos traços, pinyin, palavras, frases de exemplo e escrita em grade Tian-zi-ge, além de quizzes de pinyin.',
    fact3:
      '11 idiomas de interface, modo escuro e progresso salvo somente neste navegador (localStorage).',
    faqTitle: 'Perguntas frequentes',
    q1: 'Preciso de conta ou pagar?',
    a1: 'Não. O HanziMaster é gratuito e não exige conta. O progresso fica no localStorage do seu navegador.',
    q2: 'O que posso aprender?',
    a2: '12 caracteres chineses fundamentais com ordem dos traços, pinyin, palavras e frases de exemplo, além de escrita Tian-zi-ge e quizzes de pinyin.',
    q3: 'Meus dados são enviados ou avaliados por IA?',
    a3: 'Não. Não há avaliação por IA nem histórico em servidor. A ordem dos traços é uma demonstração SVG estática; estatísticas carregam apenas após consentimento.',
  },
  ru: {
    factsTitle: 'О HanziMaster',
    factsLead:
      'HanziMaster — бесплатное браузерное приложение для начинающих изучать китайские иероглифы. Без аккаунта и без передачи учебных данных на сервер.',
    fact1: '12 базовых иероглифов: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'Для каждого иероглифа есть анимация порядка черт, пиньинь, слова, примеры предложений и письмо в клетке Тянь-цзы-гэ, а также тесты пиньинь.',
    fact3: '11 языков интерфейса, тёмная тема и прогресс только в localStorage этого браузера.',
    faqTitle: 'Частые вопросы',
    q1: 'Нужна ли регистрация или оплата?',
    a1: 'Нет. HanziMaster бесплатен и не требует аккаунта. Прогресс хранится в localStorage вашего браузера.',
    q2: 'Что можно изучить?',
    a2: '12 базовых иероглифов с порядком черт, пиньинем, словами и примерами, а также письмо в клетке Тянь-цзы-гэ и тесты пиньинь.',
    q3: 'Данные отправляются или оцениваются ИИ?',
    a3: 'Нет. ИИ-оценки и серверной истории обучения нет. Порядок черт — статическая SVG-демонстрация; аналитика загружается только после согласия.',
  },
  ar: {
    factsTitle: 'عن HanziMaster',
    factsLead:
      'HanziMaster تطبيق مجاني يعمل بالكامل في المتصفح لتعليم الحروف الصينية للمبتدئين، دون حساب ودون رفع بيانات التعلّم إلى خادم.',
    fact1: '12 حرفًا أساسيًا: 一 二 三 人 大 小 口 日 月 山 水 火.',
    fact2:
      'لكل حرف عرض لترتيب الخطوط وبينيين وكلمات وجمل أمثلة وتدريب على الكتابة في شبكة تيان تسي غه، إضافة إلى اختبارات بينيين.',
    fact3: '11 لغة للواجهة والوضع الداكن، ويُحفظ التقدّم في localStorage هذا المتصفح فقط.',
    faqTitle: 'الأسئلة الشائعة',
    q1: 'هل يلزم التسجيل أو الدفع؟',
    a1: 'لا. HanziMaster مجاني ولا يتطلب حسابًا، ويُحفظ التقدّم في localStorage متصفحك.',
    q2: 'ماذا يمكنني أن أتعلّم؟',
    a2: '12 حرفًا صينيًا أساسيًا مع ترتيب الخطوط وبينيين والكلمات والجمل، إضافة إلى الكتابة على شبكة تيان تسي غه واختبارات بينيين.',
    q3: 'هل تُرفع بيانات التعلّم أو يُقيّمها الذكاء الاصطناعي؟',
    a3: 'لا. لا يوجد تقييم بالذكاء الاصطناعي ولا سجل تعلّم على الخادم. ترتيب الخطوط عرض SVG ثابت، وتُحمّل الإحصائيات بعد الموافقة فقط.',
  },
};
