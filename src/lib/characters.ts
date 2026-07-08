// src/lib/characters.ts v3.0.0

export interface Word {
  text: string;
  pinyin: string;
  translationKey: string;
}

export interface Example {
  sentence: string;
  pinyin: string;
  translationKey: string;
}

export interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: string;
  strokes: number;
  radical: string;
  structureKey: string;
  words: Word[];
  example: Example;
  strokeOrder?: string;
}

export const characters: Character[] = [
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