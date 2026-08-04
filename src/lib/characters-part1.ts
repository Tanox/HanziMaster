// src/lib/characters-part1.ts v5.2.0
import type { Character } from './character-types';

export const charactersPart1: Character[] = [
  {
    id: 1,
    hanzi: '一',
    pinyin: 'yī',
    translationKey: 'learn.one',
    strokes: 1,
    radical: '一',
    structureKey: 'learn.independent',
    words: [
      { text: '一天', pinyin: 'yī tiān', translationKey: 'learn.words.oneDay' },
      { text: '一个', pinyin: 'yī gè', translationKey: 'learn.words.oneItem' },
      { text: '第一', pinyin: 'dì yī', translationKey: 'learn.words.first' },
    ],
    example: {
      sentence: '我有一本书。',
      pinyin: 'Wǒ yǒu yī běn shū.',
      translationKey: 'learn.example.oneBook',
    },
    strokeOrder: 'horizontal',
  },

  {
    id: 2,
    hanzi: '二',
    pinyin: 'èr',
    translationKey: 'learn.two',
    strokes: 2,
    radical: '二',
    structureKey: 'learn.independent',
    words: [
      { text: '二月', pinyin: 'èr yuè', translationKey: 'learn.words.february' },
      { text: '第二', pinyin: 'dì èr', translationKey: 'learn.words.second' },
      { text: '二十', pinyin: 'èr shí', translationKey: 'learn.words.twenty' },
    ],
    example: {
      sentence: '他今年二十岁。',
      pinyin: 'Tā jīn nián èr shí suì.',
      translationKey: 'learn.example.twentyYearsOld',
    },
    strokeOrder: 'horizontal-horizontal',
  },

  {
    id: 3,
    hanzi: '三',
    pinyin: 'sān',
    translationKey: 'learn.three',
    strokes: 3,
    radical: '一',
    structureKey: 'learn.independent',
    words: [
      { text: '三月', pinyin: 'sān yuè', translationKey: 'learn.words.march' },
      { text: '三个', pinyin: 'sān gè', translationKey: 'learn.words.threeItems' },
      { text: '三十', pinyin: 'sān shí', translationKey: 'learn.words.thirty' },
    ],
    example: {
      sentence: '桌上有三个苹果。',
      pinyin: 'Zhuō shàng yǒu sān gè píngguǒ.',
      translationKey: 'learn.example.threeApples',
    },
    strokeOrder: 'horizontal-horizontal-horizontal',
  },

  {
    id: 4,
    hanzi: '人',
    pinyin: 'rén',
    translationKey: 'learn.person',
    strokes: 2,
    radical: '人',
    structureKey: 'learn.independent',
    words: [
      { text: '人们', pinyin: 'rénmen', translationKey: 'learn.words.people' },
      { text: '大人', pinyin: 'dàrén', translationKey: 'learn.words.adult' },
      { text: '中国人', pinyin: 'Zhōngguó rén', translationKey: 'learn.words.chinesePerson' },
    ],
    example: {
      sentence: '他是一个好人。',
      pinyin: 'Tā shì yī gè hǎo rén.',
      translationKey: 'learn.example.goodPerson',
    },
    strokeOrder: '撇-捺',
  },

  {
    id: 5,
    hanzi: '大',
    pinyin: 'dà',
    translationKey: 'learn.big',
    strokes: 3,
    radical: '大',
    structureKey: 'learn.independent',
    words: [
      { text: '大人', pinyin: 'dàrén', translationKey: 'learn.words.adult' },
      { text: '大学', pinyin: 'dàxué', translationKey: 'learn.words.university' },
      { text: '伟大', pinyin: 'wěidà', translationKey: 'learn.words.great' },
    ],
    example: {
      sentence: '这是一个大苹果。',
      pinyin: 'Zhè shì yī gè dà píngguǒ.',
      translationKey: 'learn.example.bigApple',
    },
    strokeOrder: '横-撇-捺',
  },

  {
    id: 6,
    hanzi: '小',
    pinyin: 'xiǎo',
    translationKey: 'learn.small',
    strokes: 3,
    radical: '小',
    structureKey: 'learn.independent',
    words: [
      { text: '小孩', pinyin: 'xiǎohái', translationKey: 'learn.words.child' },
      { text: '小学', pinyin: 'xiǎoxué', translationKey: 'learn.words.primarySchool' },
      { text: '小心', pinyin: 'xiǎoxīn', translationKey: 'learn.words.careful' },
    ],
    example: {
      sentence: '小猫很可爱。',
      pinyin: 'Xiǎo māo hěn kě\'ài.',
      translationKey: 'learn.example.cuteCat',
    },
    strokeOrder: '竖钩-撇-点',
  },
];
