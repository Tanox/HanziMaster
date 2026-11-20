// src/lib/i18n/translations/extensions/seo.ts v5.2.49
/** 每语言的站点/页面 title、description 与 OG 文案；generateMetadata 在服务端读取，缺失语言回退英文。 */
interface SeoTexts {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  learnTitle: string;
  practiceTitle: string;
  privacyTitle: string;
  termsTitle: string;
}

export const seoByLocale: Record<string, SeoTexts> = {
  en: {
    title: 'HanziMaster — Learn Chinese Characters with Stroke Order',
    description:
      'Learn 12 foundational Chinese characters with stroke-order animations, Tian-zi-ge writing practice, pinyin quizzes and local progress. Free, no account, 11 languages.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'Master 12 foundational Chinese characters, one stroke at a time.',
    learnTitle: 'Learn 12 Chinese Characters',
    practiceTitle: 'Chinese Handwriting Practice',
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms of Service',
  },
  'zh-CN': {
    title: 'HanziMaster 汉字大师 — 汉字笔顺与书写练习',
    description:
      '通过笔顺演示、田字格书写与拼音测验学习 12 个基础汉字；免费、无需注册、进度仅存本机，支持 11 种语言。',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: '从一笔一划开始，掌握 12 个基础汉字。',
    learnTitle: '学习 12 个基础汉字',
    practiceTitle: '田字格书写练习',
    privacyTitle: '隐私政策',
    termsTitle: '服务条款',
  },
  'zh-TW': {
    title: 'HanziMaster 漢字大師 — 漢字筆順與書寫練習',
    description:
      '透過筆順演示、田字格書寫與拼音測驗學習 12 個基礎漢字；免費、免註冊、進度只存本機，支援 11 種語言。',
    ogTitle: 'HanziMaster 漢字大師',
    ogDescription: '從一筆一劃開始，掌握 12 個基礎漢字。',
    learnTitle: '學習 12 個基礎漢字',
    practiceTitle: '田字格書寫練習',
    privacyTitle: '隱私政策',
    termsTitle: '服務條款',
  },
  ja: {
    title: 'HanziMaster 漢字大師 — 漢字の筆順と書写練習',
    description:
      '筆順アニメーション、田字格の書写、ピンインクイズで基礎漢字 12 字を学習。無料・登録不要・進捗は端末内のみ、11 言語対応。',
    ogTitle: 'HanziMaster 漢字大師',
    ogDescription: '一画ずつ、基礎漢字 12 字を身につける。',
    learnTitle: '基礎漢字 12 字を学ぶ',
    practiceTitle: '漢字の書写練習',
    privacyTitle: 'プライバシーポリシー',
    termsTitle: '利用規約',
  },
  ko: {
    title: 'HanziMaster 漢字大師 — 한자 필순과 쓰기 연습',
    description:
      '필순 시연, 전자격 쓰기, 병음 퀴즈로 기초 한자 12자를 학습합니다. 무료·가입 불필요·기록은 기기에만 저장, 11개 언어 지원.',
    ogTitle: 'HanziMaster 漢字大師',
    ogDescription: '한 획씩, 기초 한자 12자를 익힙니다.',
    learnTitle: '기초 한자 12자 배우기',
    practiceTitle: '한자 쓰기 연습',
    privacyTitle: '개인정보 처리방침',
    termsTitle: '이용 약관',
  },
  es: {
    title: 'HanziMaster — Aprende caracteres chinos con orden de trazos',
    description:
      'Aprende 12 caracteres chinos básicos con animaciones de trazos, escritura en cuadrícula Tian-zi-ge, cuestionarios de pinyín y progreso local. Gratis, sin cuenta, 11 idiomas.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'Domina 12 caracteres chinos básicos, trazo a trazo.',
    learnTitle: 'Aprende 12 caracteres chinos',
    practiceTitle: 'Práctica de escritura china',
    privacyTitle: 'Política de privacidad',
    termsTitle: 'Términos del servicio',
  },
  fr: {
    title: 'HanziMaster — Apprendre les caractères chinois et l’ordre des traits',
    description:
      'Apprenez 12 caractères chinois fondamentaux avec animations de traits, écriture sur grille Tian-zi-ge, quiz pinyin et suivi local. Gratuit, sans compte, 11 langues.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'Maîtrisez 12 caractères chinois fondamentaux, trait après trait.',
    learnTitle: 'Apprendre 12 caractères chinois',
    practiceTitle: 'Pratique de l’écriture chinoise',
    privacyTitle: 'Politique de confidentialité',
    termsTitle: 'Conditions d’utilisation',
  },
  de: {
    title: 'HanziMaster — Chinesische Zeichen mit Strichfolge lernen',
    description:
      'Lerne 12 grundlegende chinesische Zeichen mit Strichfolgen-Animationen, Tian-zi-ge-Schreibübung, Pinyin-Quiz und lokalem Fortschritt. Kostenlos, ohne Konto, 11 Sprachen.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: '12 grundlegende Zeichen, Strich für Strich meistern.',
    learnTitle: '12 chinesische Zeichen lernen',
    practiceTitle: 'Chinesische Schreibübung',
    privacyTitle: 'Datenschutzerklärung',
    termsTitle: 'Nutzungsbedingungen',
  },
  'pt-BR': {
    title: 'HanziMaster — Aprenda caracteres chineses com ordem de traços',
    description:
      'Aprenda 12 caracteres chineses básicos com animações de traços, escrita em grade Tian-zi-ge, quizzes de pinyin e progresso local. Grátis, sem conta, 11 idiomas.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'Domine 12 caracteres chineses básicos, um traço de cada vez.',
    learnTitle: 'Aprenda 12 caracteres chineses',
    practiceTitle: 'Prática de escrita chinesa',
    privacyTitle: 'Política de privacidade',
    termsTitle: 'Termos de uso',
  },
  ru: {
    title: 'HanziMaster — Изучение китайских иероглифов и порядка черт',
    description:
      'Изучите 12 базовых иероглифов: анимация порядка черт, письмо в клетке Тянь-цзы-гэ, тесты пиньинь и локальный прогресс. Бесплатно, без аккаунта, 11 языков.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'Освойте 12 базовых иероглифов, черта за чертой.',
    learnTitle: 'Изучить 12 китайских иероглифов',
    practiceTitle: 'Практика китайского письма',
    privacyTitle: 'Политика конфиденциальности',
    termsTitle: 'Условия использования',
  },
  ar: {
    title: 'HanziMaster — تعلّم الحروف الصينية بترتيب الخطوط',
    description:
      'تعلّم 12 حرفًا صينيًا أساسيًا عبر عرض ترتيب الخطوط، والكتابة على شبكة تيان تسي غه، واختبارات بينيين، مع حفظ التقدّم محليًا. مجاني، دون حساب، بـ 11 لغة.',
    ogTitle: 'HanziMaster 汉字大师',
    ogDescription: 'أتقن 12 حرفًا صينيًا أساسيًا، خطًا بعد خط.',
    learnTitle: 'تعلّم 12 حرفًا صينيًا',
    practiceTitle: 'تدريب على الكتابة الصينية',
    privacyTitle: 'سياسة الخصوصية',
    termsTitle: 'شروط الاستخدام',
  },
};
