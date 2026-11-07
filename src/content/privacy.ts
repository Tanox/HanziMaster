// src/content/privacy.ts v5.2.35

export interface LegalSection {
  id: string;
  title: string;
  titleEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
}

/**
 * 隐私政策正文。内容严格对应应用实际行为：
 * 仅 localStorage 三类偏好、同意后才加载 GA4、Google Fonts 构建期获取、无账户与后端。
 * 双语正文并列展示，避免按客户端语言切换出现合规文本缺漏。
 */
export const PRIVACY_UPDATED = '2026-11-05';

export const privacySections: LegalSection[] = [
  {
    id: 'privacy-overview',
    title: '概述',
    titleEn: 'Overview',
    paragraphs: [
      'HanziMaster 汉字大师是纯前端、本地优先的汉字学习应用。我们没有账户体系，不运行业务后端 API，也不会把你输入的学习内容上传到我们的服务器。',
      '本政策说明应用在你的设备上保存了什么、在何种条件下加载第三方统计脚本，以及你可以如何控制这些数据。',
    ],
    paragraphsEn: [
      'HanziMaster is a local-first, client-only Chinese character learning app. There are no accounts, no backend API, and no upload of the content you study to any server operated by us.',
      'This policy describes what is stored on your device, when third-party analytics is loaded, and how you control it.',
    ],
  },
  {
    id: 'privacy-local-storage',
    title: '本地存储',
    titleEn: 'Local Storage',
    paragraphs: [
      '应用使用浏览器 localStorage 保存三类数据：界面主题（浅色/深色/跟随系统）、界面语言，以及学习进度（练习记录、连胜天数、正确率、周活动）。',
      '这些数据只保存在当前浏览器与当前设备上，不会自动同步到其他设备。清除浏览器站点数据即可全部删除；应用内不提供账户级数据查看或导出接口。',
    ],
    paragraphsEn: [
      'The app stores three kinds of data in browser localStorage: theme preference (light/dark/system), interface language, and learning progress (practice records, streaks, accuracy, weekly activity).',
      'This data stays in the current browser on the current device and is not synced. Clearing site data in your browser removes all of it.',
    ],
  },
  {
    id: 'privacy-analytics',
    title: '统计与第三方脚本',
    titleEn: 'Analytics and Third-Party Scripts',
    paragraphs: [
      '在未作出选择之前，应用不会加载任何统计脚本。只有在你通过同意横幅明确选择「接受」后，才会加载 Google Analytics 4（脚本来自 Google 的域名），用于了解页面访问与功能使用情况。',
      '你可以随时选择「拒绝」或清除站点数据来撤销同意；撤销后统计脚本不再加载。统计脚本由第三方提供，其数据处理适用 Google 自身的隐私政策。',
      '界面字体由 next/font/google 在构建期获取并由应用自身托管式加载，不用于识别用户。',
    ],
    paragraphsEn: [
      'No analytics script is loaded until you make a choice. Only after you explicitly select "Accept" in the consent banner does the app load Google Analytics 4 from Google domains to understand page visits and feature usage.',
      'You can withdraw consent at any time by choosing "Reject" or clearing site data; after that the analytics script is no longer loaded. Analytics is operated by a third party and subject to Google privacy policy.',
      'Fonts are fetched by next/font/google at build time and are not used to identify users.',
    ],
  },
  {
    id: 'privacy-permissions',
    title: '浏览器能力',
    titleEn: 'Browser Capabilities',
    paragraphs: [
      '书写练习使用 Canvas 与指针事件处理你的笔迹；笔迹仅用于当前页面的即时展示，不会上传。发音功能使用浏览器内置的语音合成能力，由你的设备本地处理。',
      '应用不请求摄像头、麦克风、地理位置或通知权限。',
    ],
    paragraphsEn: [
      'Writing practice uses Canvas and pointer events; strokes are rendered locally and never uploaded. Pronunciation uses the browser built-in speech synthesis on your device.',
      'The app does not request camera, microphone, geolocation, or notification permissions.',
    ],
  },
  {
    id: 'privacy-children',
    title: '儿童与教育用途',
    titleEn: 'Children and Educational Use',
    paragraphs: [
      '本应用面向通用汉字学习，不刻意收集可识别个人身份的信息。若由监护人指导未成年人使用，建议同时检查浏览器与第三方统计设置。',
      '政策更新时我们会修改页面顶部的更新日期；重大变更会在应用内提示。',
    ],
    paragraphsEn: [
      'The app is a general-purpose learning tool and does not intentionally collect personally identifiable information. Guardians supervising minors should review browser and analytics settings as well.',
      'Updates to this policy change the date shown at the top of the page; material changes are highlighted in the app.',
    ],
  },
];
