// src/lib/i18n/translations/extensions/meanings.ts v5.2.35

/** 12 个基础汉字的简短释义，键名与 characters-*.ts 的 translationKey 后缀一致。 */
export interface MeaningTexts {
  one: string;
  two: string;
  three: string;
  person: string;
  big: string;
  small: string;
  mouth: string;
  sunDay: string;
  moonMonth: string;
  mountain: string;
  water: string;
  fire: string;
}

export const meaningsByLocale: Record<string, MeaningTexts> = {
  en: { one: 'one', two: 'two', three: 'three', person: 'person', big: 'big', small: 'small', mouth: 'mouth', sunDay: 'sun / day', moonMonth: 'moon / month', mountain: 'mountain', water: 'water', fire: 'fire' },
  'zh-CN': { one: '一', two: '二', three: '三', person: '人', big: '大', small: '小', mouth: '口', sunDay: '日 / 白天', moonMonth: '月 / 月份', mountain: '山', water: '水', fire: '火' },
  'zh-TW': { one: '一', two: '二', three: '三', person: '人', big: '大', small: '小', mouth: '口', sunDay: '日 / 白天', moonMonth: '月 / 月份', mountain: '山', water: '水', fire: '火' },
  es: { one: 'uno', two: 'dos', three: 'tres', person: 'persona', big: 'grande', small: 'pequeño', mouth: 'boca', sunDay: 'sol / día', moonMonth: 'luna / mes', mountain: 'montaña', water: 'agua', fire: 'fuego' },
  ar: { one: 'واحد', two: 'اثنان', three: 'ثلاثة', person: 'إنسان', big: 'كبير', small: 'صغير', mouth: 'فم', sunDay: 'شمس / يوم', moonMonth: 'قمر / شهر', mountain: 'جبل', water: 'ماء', fire: 'نار' },
  fr: { one: 'un', two: 'deux', three: 'trois', person: 'personne', big: 'grand', small: 'petit', mouth: 'bouche', sunDay: 'soleil / jour', moonMonth: 'lune / mois', mountain: 'montagne', water: 'eau', fire: 'feu' },
  'pt-BR': { one: 'um', two: 'dois', three: 'três', person: 'pessoa', big: 'grande', small: 'pequeno', mouth: 'boca', sunDay: 'sol / dia', moonMonth: 'lua / mês', mountain: 'montanha', water: 'água', fire: 'fogo' },
  de: { one: 'eins', two: 'zwei', three: 'drei', person: 'Mensch', big: 'groß', small: 'klein', mouth: 'Mund', sunDay: 'Sonne / Tag', moonMonth: 'Mond / Monat', mountain: 'Berg', water: 'Wasser', fire: 'Feuer' },
  ja: { one: '一', two: '二', three: '三', person: '人', big: '大きい', small: '小さい', mouth: '口', sunDay: '日 / 太阳', moonMonth: '月 / 月', mountain: '山', water: '水', fire: '火' },
  ko: { one: '하나', two: '둘', three: '셋', person: '사람', big: '크다', small: '작다', mouth: '입', sunDay: '해 / 날', moonMonth: '달 / 달', mountain: '산', water: '물', fire: '불' },
  ru: { one: 'один', two: 'два', three: 'три', person: 'человек', big: 'большой', small: 'маленький', mouth: 'рот', sunDay: 'солнце / день', moonMonth: 'луна / месяц', mountain: 'гора', water: 'вода', fire: 'огонь' },
};
