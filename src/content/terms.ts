// src/content/terms.ts v5.2.35

import type { LegalSection } from './privacy';

/** 服务条款正文：与隐私政策共用分段结构，双语并列展示。 */
export const TERMS_UPDATED = '2026-11-05';

export const termsSections: LegalSection[] = [
  {
    id: 'terms-scope',
    title: '服务性质',
    titleEn: 'Nature of the Service',
    paragraphs: [
      'HanziMaster 汉字大师是供个人学习汉字、笔顺与书写练习使用的教育类 Web 应用。它按「现状」提供，不构成学校课程、考试辅导或专业教学认证。',
      '应用为纯前端项目：无需注册账户，不提供付费内容，不提供跨设备同步或云端备份。',
    ],
    paragraphsEn: [
      'HanziMaster is an educational web app for personal study of Chinese characters, stroke order, and handwriting. It is provided "as is" and is not a school course, exam preparation service, or professional certification.',
      'It is client-only: no registration, no paid content, no cross-device sync, and no cloud backup.',
    ],
  },
  {
    id: 'terms-education',
    title: '教育用途与内容准确性',
    titleEn: 'Educational Use and Accuracy',
    paragraphs: [
      '汉字数据、拼音、例句、笔顺演示与结构提示仅用于辅助学习，可能存在版本差异或表述简化；如用于教学、出版或考试准备，请以权威字典、教材与规范字形为准自行核对。',
      '发音功能依赖浏览器内置语音合成，不同设备与语言的音色、可用性和准确度会有差异。',
    ],
    paragraphsEn: [
      'Character data, pinyin, example sentences, stroke-order animations, and structure hints are learning aids and may simplify or differ across conventions. For teaching, publishing, or exam use, verify against authoritative dictionaries and standards.',
      'Pronunciation relies on browser built-in speech synthesis; voice availability and accuracy vary by device and language.',
    ],
  },
  {
    id: 'terms-local-data',
    title: '你的数据',
    titleEn: 'Your Data',
    paragraphs: [
      '主题、语言与学习进度保存在你的浏览器 localStorage 中，由你自行管理。清除浏览器站点数据会同时删除这些记录与统计同意状态，且无法恢复。',
      '我们不会出售学习数据，也不会将其用于广告画像。统计脚本仅在同意后加载，详见隐私政策。',
    ],
    paragraphsEn: [
      'Theme, language, and progress are stored in your browser localStorage and are managed by you. Clearing site data removes these records and the analytics consent state, and this cannot be undone.',
      'We do not sell learning data or use it for advertising profiles. Analytics loads only after consent; see the Privacy Policy.',
    ],
  },
  {
    id: 'terms-license',
    title: '开源许可与第三方',
    titleEn: 'Open Source License and Third Parties',
    paragraphs: [
      '本项目源代码按 MIT 许可证发布（见仓库根 LICENSE）。第三方依赖及其许可列于仓库根 NOTICE。',
      '你自行部署或修改本项目时，须保留许可证与第三方声明，并自行评估所适用地区的合规要求。',
    ],
    paragraphsEn: [
      'The source code is released under the MIT License (see LICENSE). Third-party dependencies and their licenses are listed in NOTICE.',
      'If you deploy or modify this project, keep the license and third-party notices and assess the compliance requirements that apply to your region.',
    ],
  },
  {
    id: 'terms-liability',
    title: '保证与责任',
    titleEn: 'Warranty and Liability',
    paragraphs: [
      '在法律允许的最大范围内，本项目不提供任何明示或默示保证，作者与贡献者不对使用或无法使用本应用所产生的间接损失承担责任。',
      '条款更新时我们会修改页面顶部的更新日期。问题与建议可通过仓库 GitHub Issues 提交。',
    ],
    paragraphsEn: [
      'To the maximum extent permitted by law, the project is provided without warranties of any kind, and the authors and contributors are not liable for indirect damages arising from the use or inability to use the app.',
      'Updates change the date shown at the top of the page. Questions and suggestions are welcome via the repository GitHub Issues.',
    ],
  },
];
