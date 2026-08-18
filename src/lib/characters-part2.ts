// src/lib/characters-part2.ts v5.2.6
import type { Character } from './character-types';

export const charactersPart2: Character[] = [
  {
    id: 7,
    hanzi: '口',
    pinyin: 'kǒu',
    translationKey: 'learn.mouth',
    strokes: 3,
    radical: '口',
    structureKey: 'learn.independent',
    words: [
      { text: '口水', pinyin: 'kǒushuǐ', translationKey: 'learn.words.saliva' },
      { text: '入口', pinyin: 'rùkǒu', translationKey: 'learn.words.entrance' },
      { text: '出口', pinyin: 'chūkǒu', translationKey: 'learn.words.exit' },
    ],
    example: {
      sentence: '请张开你的口。',
      pinyin: 'Qǐng zhāngkāi nǐ de kǒu.',
      translationKey: 'learn.example.openMouth',
    },
    strokeOrder: '竖-横折-横',
  },

  {
    id: 8,
    hanzi: '日',
    pinyin: 'rì',
    translationKey: 'learn.sunDay',
    strokes: 4,
    radical: '日',
    structureKey: 'learn.independent',
    words: [
      { text: '日子', pinyin: 'rìzi', translationKey: 'learn.words.days' },
      { text: '明日', pinyin: 'míngrì', translationKey: 'learn.words.tomorrow' },
      { text: '日本', pinyin: 'Rìběn', translationKey: 'learn.words.japan' },
    ],
    example: {
      sentence: '今天是好日子。',
      pinyin: 'Jīntiān shì hǎo rìzi.',
      translationKey: 'learn.example.goodDay',
    },
    strokeOrder: '竖-横折-横-横',
  },

  {
    id: 9,
    hanzi: '月',
    pinyin: 'yuè',
    translationKey: 'learn.moonMonth',
    strokes: 4,
    radical: '月',
    structureKey: 'learn.independent',
    words: [
      { text: '月亮', pinyin: 'yuèliàng', translationKey: 'learn.words.moon' },
      { text: '月份', pinyin: 'yuèfèn', translationKey: 'learn.words.month' },
      { text: '正月', pinyin: 'zhēngyuè', translationKey: 'learn.words.firstMonth' },
    ],
    example: {
      sentence: '今晚的月亮很美。',
      pinyin: 'Jīn wǎn de yuèliàng hěn měi.',
      translationKey: 'learn.example.beautifulMoon',
    },
    strokeOrder: '撇-横折钩-横-横',
  },

  {
    id: 10,
    hanzi: '山',
    pinyin: 'shān',
    translationKey: 'learn.mountain',
    strokes: 3,
    radical: '山',
    structureKey: 'learn.independent',
    words: [
      { text: '山水', pinyin: 'shānshuǐ', translationKey: 'learn.words.mountainWater' },
      { text: '上山', pinyin: 'shàngshān', translationKey: 'learn.words.climbMountain' },
      { text: '雪山', pinyin: 'xuěshān', translationKey: 'learn.words.snowMountain' },
    ],
    example: {
      sentence: '我想去爬山。',
      pinyin: 'Wǒ xiǎng qù pá shān.',
      translationKey: 'learn.example.climbMountain',
    },
    strokeOrder: '竖-竖折-竖',
  },

  {
    id: 11,
    hanzi: '水',
    pinyin: 'shuǐ',
    translationKey: 'learn.water',
    strokes: 4,
    radical: '水',
    structureKey: 'learn.independent',
    words: [
      { text: '水果', pinyin: 'shuǐguǒ', translationKey: 'learn.words.fruit' },
      { text: '河水', pinyin: 'héshuǐ', translationKey: 'learn.words.riverWater' },
      { text: '喝水', pinyin: 'hēshuǐ', translationKey: 'learn.words.drinkWater' },
    ],
    example: {
      sentence: '请给我一杯水。',
      pinyin: 'Qǐng gěi wǒ yī bēi shuǐ.',
      translationKey: 'learn.example.glassOfWater',
    },
    strokeOrder: '竖钩-横撇-撇-捺',
  },

  {
    id: 12,
    hanzi: '火',
    pinyin: 'huǒ',
    translationKey: 'learn.fire',
    strokes: 4,
    radical: '火',
    structureKey: 'learn.independent',
    words: [
      { text: '火车', pinyin: 'huǒchē', translationKey: 'learn.words.train' },
      { text: '火苗', pinyin: 'huǒmiáo', translationKey: 'learn.words.flame' },
      { text: '火山', pinyin: 'huǒshān', translationKey: 'learn.words.volcano' },
    ],
    example: {
      sentence: '小心火！',
      pinyin: 'Xiǎoxīn huǒ!',
      translationKey: 'learn.example.carefulFire',
    },
    strokeOrder: '点-撇-撇-捺',
  },
];
