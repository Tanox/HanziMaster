export interface LanguageOption {
  code: string;
  name: string;
  native: string;
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

export const UI_LABELS: Record<string, any> = {
  'zh-CN': { meaning: '含义', structure: '结构', radical: '部首', strokeCount: '笔画数', origin: '字源', memoryAid: '记忆口诀', commonWords: '常用词组' },
  'zh-TW': { meaning: '含義', structure: '結構', radical: '部首', strokeCount: '筆畫數', origin: '字源', memoryAid: '記憶口訣', commonWords: '常用詞組' },
  en: { meaning: 'Meaning', structure: 'Structure', radical: 'Radical', strokeCount: 'Stroke Count', origin: 'Origin', memoryAid: 'Memory Aid', commonWords: 'Common Words' },
  es: { meaning: 'Significado', structure: 'Estructura', radical: 'Radical', strokeCount: 'Trazos', origin: 'Origen', memoryAid: 'Mnemotecnia', commonWords: 'Palabras Comunes' },
  fr: { meaning: 'Signification', structure: 'Structure', radical: 'Radical', strokeCount: 'Traits', origin: 'Origine', memoryAid: 'Mnémotechnique', commonWords: 'Mots Courants' },
  de: { meaning: 'Bedeutung', structure: 'Struktur', radical: 'Radikal', strokeCount: 'Striche', origin: 'Herkunft', memoryAid: 'Eselsbrücke', commonWords: 'Wörter' },
  ja: { meaning: '意味', structure: '構造', radical: '部首', strokeCount: '画数', origin: '成り立ち', memoryAid: '覚え方', commonWords: '一般的な単語' },
  ko: { meaning: '의미', structure: '구조', radical: '부수', strokeCount: '획수', origin: '어원', memoryAid: '암기법', commonWords: '단어' },
  ru: { meaning: 'Значение', structure: 'Структура', radical: 'Ключ', strokeCount: 'Черты', origin: 'Происхождение', memoryAid: 'Мнемоника', commonWords: 'Слова' },
  pt: { meaning: 'Significado', structure: 'Estrutura', radical: 'Radical', strokeCount: 'Traços', origin: 'Origem', memoryAid: 'Mnemônica', commonWords: 'Palavras Comuns' },
  it: { meaning: 'Significato', structure: 'Struttura', radical: 'Radicale', strokeCount: 'Tratti', origin: 'Origine', memoryAid: 'Mnemonica', commonWords: 'Parole Comuni' },
  vi: { meaning: 'Ý nghĩa', structure: 'Cấu trúc', radical: 'Bộ thủ', strokeCount: 'Số nét', origin: 'Nguồn gốc', memoryAid: 'Gợi nhớ', commonWords: 'Từ thông dụng' },
};