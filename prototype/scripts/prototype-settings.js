// prototype/scripts/prototype-settings.js v5.2.56 · 设置面板与云同步交互演示
/* 与生产 SettingsDialog / CloudSyncControls 对齐；原型仅演示 4 语言子集 */

/* ===================== 文案补丁 ===================== */
// 覆盖 part1.js 中过时的特性与测验文案，并补充设置面板所需的键。
const SETTINGS_I18N = {
  en: {
    nav: { settings: 'Settings' },
    feat: {
      ety: { title: '12 Essential Characters', desc: 'Start with the 12 most common characters, each with guided stroke order.' },
      ada: { title: 'Private by Default', desc: 'No account needed. Your progress stays on this device.' },
    },
    learn: { quizDesc: 'Select the correct character for this pinyin.' },
    common: { quiz: { desc: 'Select the correct character.' }, yes: 'Yes, reset', cancel: 'Cancel' },
    settings: {
      open: 'Open settings', title: 'Settings', appearance: 'Appearance',
      themeLight: 'Light', themeDark: 'Dark', themeSystem: 'System',
      language: 'Language', languageHint: 'Prototype demonstrates 4 locales; production supports 11.',
      preferences: 'Preferences', haptics: 'Haptic feedback', reduceMotion: 'Reduce motion',
      progress: 'Progress', export: 'Export progress', reset: 'Reset progress',
      resetHint: 'This cannot be undone. Continue?',
    },
    cloud: {
      title: 'Cloud sync', desc: 'Transfer progress between devices with a one-time code.',
      generate: 'Generate', copy: 'Copy code', upload: 'Upload', download: 'Download',
      generated: 'Sync code generated', copied: 'Sync code copied',
      uploaded: 'Progress uploaded (demo)', downloaded: 'Progress downloaded (demo)',
    },
    footer: { privacy: 'Privacy', terms: 'Terms' },
  },
  'zh-CN': {
    nav: { settings: '设置' },
    feat: {
      ety: { title: '12 个基础汉字', desc: '从最常用的 12 个汉字开始，每个字都有笔顺引导。' },
      ada: { title: '默认私密', desc: '无需账户，学习进度仅保存在本机。' },
    },
    learn: { quizDesc: '选择正确的汉字。' },
    common: { quiz: { desc: '选择正确的汉字。' }, yes: '确认重置', cancel: '取消' },
    settings: {
      open: '打开设置', title: '设置', appearance: '外观',
      themeLight: '浅色', themeDark: '深色', themeSystem: '跟随系统',
      language: '语言', languageHint: '原型演示 4 种语言，正式版支持 11 种。',
      preferences: '偏好', haptics: '震动反馈', reduceMotion: '减少动效',
      progress: '学习进度', export: '导出进度', reset: '重置进度',
      resetHint: '此操作不可撤销，是否继续？',
    },
    cloud: {
      title: '云端同步', desc: '使用一次性同步码在多设备间迁移进度。',
      generate: '生成', copy: '复制同步码', upload: '上传', download: '下载',
      generated: '同步码已生成', copied: '同步码已复制',
      uploaded: '进度已上传（演示）', downloaded: '进度已下载（演示）',
    },
    footer: { privacy: '隐私政策', terms: '服务条款' },
  },
  ja: {
    nav: { settings: '設定' },
    feat: {
      ety: { title: '基本漢字 12 個', desc: 'よく使う12個の漢字から始め、筆順を案内します。' },
      ada: { title: 'デフォルトでプライベート', desc: 'アカウント不要。学習状況はこの端末に保存されます。' },
    },
    learn: { quizDesc: '正しい漢字を選択してください。' },
    common: { quiz: { desc: '正しい漢字を選択してください。' }, yes: 'リセットする', cancel: 'キャンセル' },
    settings: {
      open: '設定を開く', title: '設定', appearance: '外観',
      themeLight: 'ライト', themeDark: 'ダーク', themeSystem: 'システム',
      language: '言語', languageHint: 'プロトタイプは4言語、製品版は11言語に対応。',
      preferences: '設定', haptics: '触覚フィードバック', reduceMotion: '動きを減らす',
      progress: '学習 progress', export: '進捗をエクスポート', reset: '進捗をリセット',
      resetHint: 'この操作は取り消せません。続けますか？',
    },
    cloud: {
      title: 'クラウド同期', desc: '一度限りの同期コードで端末間_progressを移動。',
      generate: '生成', copy: 'コードをコピー', upload: 'アップロード', download: 'ダウンロード',
      generated: '同期コードを生成しました', copied: '同期コードをコピーしました',
      uploaded: '進捗をアップロードしました（デモ）', downloaded: '進捗をダウンロードしました（デモ）',
    },
    footer: { privacy: 'プライバシー', terms: '利用規約' },
  },
  es: {
    nav: { settings: 'Ajustes' },
    feat: {
      ety: { title: '12 caracteres esenciales', desc: 'Empieza con los 12 caracteres más comunes, con orden de trazos guiado.' },
      ada: { title: 'Privado por defecto', desc: 'Sin cuenta. Tu progreso permanece en este dispositivo.' },
    },
    learn: { quizDesc: 'Selecciona el carácter correcto.' },
    common: { quiz: { desc: 'Selecciona el carácter correcto.' }, yes: 'Sí, reiniciar', cancel: 'Cancelar' },
    settings: {
      open: 'Abrir ajustes', title: 'Ajustes', appearance: 'Apariencia',
      themeLight: 'Claro', themeDark: 'Oscuro', themeSystem: 'Sistema',
      language: 'Idioma', languageHint: 'El prototipo muestra 4 idiomas; la versión final admite 11.',
      preferences: 'Preferencias', haptics: 'Respuesta háptica', reduceMotion: 'Reducir movimiento',
      progress: 'Progreso', export: 'Exportar progreso', reset: 'Reiniciar progreso',
      resetHint: 'Esta acción no se puede deshacer. ¿Continuar?',
    },
    cloud: {
      title: 'Sincronización en la nube', desc: 'Transfiere tu progreso con un código de un solo uso.',
      generate: 'Generar', copy: 'Copiar código', upload: 'Subir', download: 'Bajar',
      generated: 'Código generado', copied: 'Código copiado',
      uploaded: 'Progreso subido (demo)', downloaded: 'Progreso bajado (demo)',
    },
    footer: { privacy: 'Privacidad', terms: 'Términos' },
  },
};

const deepMerge = (target, patch) => {
  Object.entries(patch).forEach(([k, v]) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) deepMerge(target[k] ||= {}, v);
    else target[k] = v;
  });
};
Object.entries(SETTINGS_I18N).forEach(([code, patch]) => deepMerge(I18N[code], patch));
