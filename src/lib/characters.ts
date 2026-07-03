// src/lib/characters.ts v3.0.0

export interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: string;
  strokes: number;
  radical: string;
  structureKey: string;
}

export const characters: Character[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', translationKey: 'learn.one', strokes: 1, radical: '一', structureKey: 'learn.independent' },
  { id: 2, hanzi: '二', pinyin: 'èr', translationKey: 'learn.two', strokes: 2, radical: '二', structureKey: 'learn.independent' },
  { id: 3, hanzi: '三', pinyin: 'sān', translationKey: 'learn.three', strokes: 3, radical: '一', structureKey: 'learn.independent' },
  { id: 4, hanzi: '人', pinyin: 'rén', translationKey: 'learn.person', strokes: 2, radical: '人', structureKey: 'learn.independent' },
  { id: 5, hanzi: '大', pinyin: 'dà', translationKey: 'learn.big', strokes: 3, radical: '大', structureKey: 'learn.independent' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', translationKey: 'learn.small', strokes: 3, radical: '小', structureKey: 'learn.independent' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', translationKey: 'learn.mouth', strokes: 3, radical: '口', structureKey: 'learn.independent' },
  { id: 8, hanzi: '日', pinyin: 'rì', translationKey: 'learn.sunDay', strokes: 4, radical: '日', structureKey: 'learn.independent' },
  { id: 9, hanzi: '月', pinyin: 'yuè', translationKey: 'learn.moonMonth', strokes: 4, radical: '月', structureKey: 'learn.independent' },
  { id: 10, hanzi: '山', pinyin: 'shān', translationKey: 'learn.mountain', strokes: 3, radical: '山', structureKey: 'learn.independent' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', translationKey: 'learn.water', strokes: 4, radical: '水', structureKey: 'learn.independent' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', translationKey: 'learn.fire', strokes: 4, radical: '火', structureKey: 'learn.independent' },
];
