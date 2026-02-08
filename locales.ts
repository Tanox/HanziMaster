export interface LanguageOption {
  code: string;
  name: string;
  native: string;
}

export interface UILabels {
  meaning: string;
  structure: string;
  radical: string;
  strokeCount: string;
  origin: string;
  memoryAid: string;
  commonWords: string;
  appTitle: string;
  appSubtitle: string;
  searchPlaceholder: string;
  footerCredit: string;
  version: string;
  previewText: string;
  strokeStatusActive: string;
  strokeStatusComplete: string;
  errorInvalidChar: string;
  controlsPlay: string;
  controlsPause: string;
  controlsReset: string;
  controlsSpeed: string;
  viewMode: string;
  practiceMode: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'zh-CN', name: 'Simplified Chinese', native: '简体中文' },
  { code: 'zh-TW', name: 'Traditional Chinese', native: '繁體中文' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
];

export const UI_LABELS: Record<string, UILabels> = {
  'zh-CN': {
    meaning: '含义', structure: '结构', radical: '部首', strokeCount: '笔画数', origin: '字源', memoryAid: '记忆口诀', commonWords: '常用词组',
    appTitle: '精通笔顺',
    appSubtitle: '输入汉字，观看笔画动画，获取AI智能详解',
    searchPlaceholder: '请输入一个汉字 (如：爱)',
    footerCredit: '数据来源：Hanzi Writer & Gemini AI',
    version: '版本',
    previewText: '汉字预览',
    strokeStatusActive: '书写中',
    strokeStatusComplete: '书写完成',
    errorInvalidChar: '请输入有效的单个汉字',
    controlsPlay: '播放',
    controlsPause: '暂停',
    controlsReset: '重置',
    controlsSpeed: '速度',
    viewMode: '观看演示',
    practiceMode: '手写练习'
  },
  'zh-TW': {
    meaning: '含義', structure: '結構', radical: '部首', strokeCount: '筆畫數', origin: '字源', memoryAid: '記憶口訣', commonWords: '常用詞組',
    appTitle: '精通筆順',
    appSubtitle: '輸入漢字，觀看筆畫動畫，獲取AI智能詳解',
    searchPlaceholder: '請輸入一個漢字 (如：愛)',
    footerCredit: '數據來源：Hanzi Writer & Gemini AI',
    version: '版本',
    previewText: '漢字預覽',
    strokeStatusActive: '書寫中',
    strokeStatusComplete: '書寫完成',
    errorInvalidChar: '請輸入有效的單個漢字',
    controlsPlay: '播放',
    controlsPause: '暫停',
    controlsReset: '重置',
    controlsSpeed: '速度',
    viewMode: '觀看演示',
    practiceMode: '手寫練習'
  },
  en: {
    meaning: 'Meaning', structure: 'Structure', radical: 'Radical', strokeCount: 'Stroke Count', origin: 'Origin', memoryAid: 'Memory Aid', commonWords: 'Common Words',
    appTitle: 'Master Stroke Order',
    appSubtitle: 'Enter a Chinese character to visualize its stroke order and get detailed AI-powered insights.',
    searchPlaceholder: 'Enter a Chinese character (e.g., 爱)',
    footerCredit: 'Data provided by Hanzi Writer & Gemini AI',
    version: 'Version',
    previewText: 'Character Preview',
    strokeStatusActive: 'Stroke Active',
    strokeStatusComplete: 'Stroke Complete',
    errorInvalidChar: 'Please enter a valid Chinese character.',
    controlsPlay: 'Play',
    controlsPause: 'Pause',
    controlsReset: 'Reset',
    controlsSpeed: 'Speed',
    viewMode: 'Watch',
    practiceMode: 'Practice'
  },
  es: {
    meaning: 'Significado', structure: 'Estructura', radical: 'Radical', strokeCount: 'Trazos', origin: 'Origen', memoryAid: 'Mnemotecnia', commonWords: 'Palabras Comunes',
    appTitle: 'Dominar el Orden de Trazos',
    appSubtitle: 'Ingrese un carácter chino para visualizar su orden de trazos y obtener información detallada con IA.',
    searchPlaceholder: 'Ingrese un carácter chino (ej. 爱)',
    footerCredit: 'Datos proporcionados por Hanzi Writer y Gemini AI',
    version: 'Versión',
    previewText: 'Vista Previa del Carácter',
    strokeStatusActive: 'Trazo Activo',
    strokeStatusComplete: 'Trazo Completo',
    errorInvalidChar: 'Por favor ingrese un carácter chino válido.',
    controlsPlay: 'Reproducir',
    controlsPause: 'Pausa',
    controlsReset: 'Reiniciar',
    controlsSpeed: 'Velocidad',
    viewMode: 'Ver',
    practiceMode: 'Practicar'
  },
  fr: {
    meaning: 'Signification', structure: 'Structure', radical: 'Radical', strokeCount: 'Traits', origin: 'Origine', memoryAid: 'Mnémotechnique', commonWords: 'Mots Courants',
    appTitle: 'Maîtriser l\'Ordre des Traits',
    appSubtitle: 'Entrez un caractère chinois pour visualiser l\'ordre des traits et obtenir des analyses détaillées par IA.',
    searchPlaceholder: 'Entrez un caractère chinois (ex. 爱)',
    footerCredit: 'Données fournies par Hanzi Writer & Gemini AI',
    version: 'Version',
    previewText: 'Aperçu du Caractère',
    strokeStatusActive: 'Trait Actif',
    strokeStatusComplete: 'Trait Terminé',
    errorInvalidChar: 'Veuillez entrer un caractère chinois valide.',
    controlsPlay: 'Lire',
    controlsPause: 'Pause',
    controlsReset: 'Réinitialiser',
    controlsSpeed: 'Vitesse',
    viewMode: 'Regarder',
    practiceMode: 'Pratiquer'
  },
  de: {
    meaning: 'Bedeutung', structure: 'Struktur', radical: 'Radikal', strokeCount: 'Striche', origin: 'Herkunft', memoryAid: 'Eselsbrücke', commonWords: 'Wörter',
    appTitle: 'Strichfolge Meistern',
    appSubtitle: 'Geben Sie ein chinesisches Zeichen ein, um die Strichfolge zu sehen und detaillierte KI-Einblicke zu erhalten.',
    searchPlaceholder: 'Geben Sie ein chinesisches Zeichen ein (z.B. 爱)',
    footerCredit: 'Daten von Hanzi Writer & Gemini AI',
    version: 'Version',
    previewText: 'Zeichenvorschau',
    strokeStatusActive: 'Strich Aktiv',
    strokeStatusComplete: 'Strich Fertig',
    errorInvalidChar: 'Bitte geben Sie ein gültiges chinesisches Zeichen ein.',
    controlsPlay: 'Abspielen',
    controlsPause: 'Pause',
    controlsReset: 'Zurücksetzen',
    controlsSpeed: 'Geschw.',
    viewMode: 'Ansehen',
    practiceMode: 'Üben'
  },
  ja: {
    meaning: '意味', structure: '構造', radical: '部首', strokeCount: '画数', origin: '成り立ち', memoryAid: '覚え方', commonWords: '一般的な単語',
    appTitle: '書き順マスター',
    appSubtitle: '漢字を入力して書き順を表示し、AIによる詳細な解説を取得します。',
    searchPlaceholder: '漢字を入力してください (例: 爱)',
    footerCredit: 'データ提供: Hanzi Writer & Gemini AI',
    version: 'バージョン',
    previewText: '漢字プレビュー',
    strokeStatusActive: '描画中',
    strokeStatusComplete: '描画完了',
    errorInvalidChar: '有効な漢字を入力してください。',
    controlsPlay: '再生',
    controlsPause: '一時停止',
    controlsReset: 'リセット',
    controlsSpeed: '速度',
    viewMode: '見る',
    practiceMode: '練習'
  },
  ko: {
    meaning: '의미', structure: '구조', radical: '부수', strokeCount: '획수', origin: '어원', memoryAid: '암기법', commonWords: '단어',
    appTitle: '획순 마스터',
    appSubtitle: '한자를 입력하여 획순을 시각화하고 AI 기반의 상세한 분석을 확인하세요.',
    searchPlaceholder: '한자를 입력하세요 (예: 爱)',
    footerCredit: '데이터 제공: Hanzi Writer & Gemini AI',
    version: '버전',
    previewText: '한자 미리보기',
    strokeStatusActive: '쓰기 중',
    strokeStatusComplete: '쓰기 완료',
    errorInvalidChar: '유효한 한자를 입력해주세요.',
    controlsPlay: '재생',
    controlsPause: '일시정지',
    controlsReset: '초기화',
    controlsSpeed: '속도',
    viewMode: '보기',
    practiceMode: '연습'
  },
  ru: {
    meaning: 'Значение', structure: 'Структура', radical: 'Ключ', strokeCount: 'Черты', origin: 'Происхождение', memoryAid: 'Мнемоника', commonWords: 'Слова',
    appTitle: 'Мастер Порядка Черт',
    appSubtitle: 'Введите китайский иероглиф для визуализации порядка черт и получения подробного анализа ИИ.',
    searchPlaceholder: 'Введите иероглиф (напр., 爱)',
    footerCredit: 'Данные: Hanzi Writer & Gemini AI',
    version: 'Версия',
    previewText: 'Предпросмотр',
    strokeStatusActive: 'Рисование',
    strokeStatusComplete: 'Завершено',
    errorInvalidChar: 'Пожалуйста, введите действительный китайский иероглиф.',
    controlsPlay: 'Пуск',
    controlsPause: 'Пауза',
    controlsReset: 'Сброс',
    controlsSpeed: 'Скорость',
    viewMode: 'Смотреть',
    practiceMode: 'Тренировка'
  },
  pt: {
    meaning: 'Significado', structure: 'Estrutura', radical: 'Radical', strokeCount: 'Traços', origin: 'Origem', memoryAid: 'Mnemônica', commonWords: 'Palavras Comuns',
    appTitle: 'Mestre da Ordem dos Traços',
    appSubtitle: 'Digite um caractere chinês para visualizar a ordem dos traços e obter insights detalhados da IA.',
    searchPlaceholder: 'Digite um caractere chinês (ex. 爱)',
    footerCredit: 'Dados fornecidos por Hanzi Writer & Gemini AI',
    version: 'Versão',
    previewText: 'Pré-visualização',
    strokeStatusActive: 'Traço Ativo',
    strokeStatusComplete: 'Traço Completo',
    errorInvalidChar: 'Por favor, insira um caractere chinês válido.',
    controlsPlay: 'Tocar',
    controlsPause: 'Pausa',
    controlsReset: 'Resetar',
    controlsSpeed: 'Velocidade',
    viewMode: 'Ver',
    practiceMode: 'Praticar'
  },
  it: {
    meaning: 'Significato', structure: 'Struttura', radical: 'Radicale', strokeCount: 'Tratti', origin: 'Origine', memoryAid: 'Mnemonica', commonWords: 'Parole Comuni',
    appTitle: 'Maestro dell\'Ordine dei Tratti',
    appSubtitle: 'Inserisci un carattere cinese per visualizzare l\'ordine dei tratti e ottenere analisi dettagliate dall\'IA.',
    searchPlaceholder: 'Inserisci un carattere cinese (es. 爱)',
    footerCredit: 'Dati forniti da Hanzi Writer & Gemini AI',
    version: 'Versione',
    previewText: 'Anteprima Carattere',
    strokeStatusActive: 'Tratto Attivo',
    strokeStatusComplete: 'Tratto Completato',
    errorInvalidChar: 'Si prega di inserire un carattere cinese valido.',
    controlsPlay: 'Riproduci',
    controlsPause: 'Pausa',
    controlsReset: 'Reimposta',
    controlsSpeed: 'Velocità',
    viewMode: 'Guarda',
    practiceMode: 'Pratica'
  },
  vi: {
    meaning: 'Ý nghĩa', structure: 'Cấu trúc', radical: 'Bộ thủ', strokeCount: 'Số nét', origin: 'Nguồn gốc', memoryAid: 'Gợi nhớ', commonWords: 'Từ thông dụng',
    appTitle: 'Bậc Thầy Thứ Tự Nét',
    appSubtitle: 'Nhập một chữ Hán để xem thứ tự nét và nhận phân tích chi tiết từ AI.',
    searchPlaceholder: 'Nhập chữ Hán (ví dụ: 爱)',
    footerCredit: 'Dữ liệu từ Hanzi Writer & Gemini AI',
    version: 'Phiên bản',
    previewText: 'Xem trước',
    strokeStatusActive: 'Đang viết',
    strokeStatusComplete: 'Hoàn tất',
    errorInvalidChar: 'Vui lòng nhập một chữ Hán hợp lệ.',
    controlsPlay: 'Phát',
    controlsPause: 'Tạm dừng',
    controlsReset: 'Đặt lại',
    controlsSpeed: 'Tốc độ',
    viewMode: 'Xem',
    practiceMode: 'Luyện viết'
  },
};