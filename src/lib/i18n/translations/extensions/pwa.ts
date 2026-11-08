// src/lib/i18n/translations/extensions/pwa.ts v5.2.44
// P2-14：PWA 安装引导与离线页文案（11 语言齐全）。

export interface PwaTexts {
  installTitle: string;
  installAction: string;
  offlineTitle: string;
  offlineHint: string;
}

export const pwaByLocale: Record<string, PwaTexts> = {
  en: {
    installTitle: 'Install HanziMaster',
    installAction: 'Add to home screen',
    offlineTitle: 'You are offline',
    offlineHint: 'Reconnect to continue; your local learning progress is still saved on this device.',
  },
  'zh-CN': {
    installTitle: '安装汉字大师',
    installAction: '添加到主屏幕',
    offlineTitle: '当前处于离线状态',
    offlineHint: '联网后即可继续学习；本机保存的学习进度不会丢失。',
  },
  'zh-TW': {
    installTitle: '安裝漢字大師',
    installAction: '加入主畫面',
    offlineTitle: '目前處於離線狀態',
    offlineHint: '連線後即可繼續學習；本機儲存的學習進度不會遺失。',
  },
  es: {
    installTitle: 'Instalar HanziMaster',
    installAction: 'Añadir a la pantalla de inicio',
    offlineTitle: 'Estás sin conexión',
    offlineHint: 'Vuelve a conectarte para continuar; tu progreso local sigue guardado en este dispositivo.',
  },
  ar: {
    installTitle: 'تثبيت HanziMaster',
    installAction: 'إضافة إلى الشاشة الرئيسية',
    offlineTitle: 'أنت غير متصل',
    offlineHint: 'أعد الاتصال للمتابعة؛ تقدمك المحلي ما زال محفوظًا على هذا الجهاز.',
  },
  fr: {
    installTitle: 'Installer HanziMaster',
    installAction: 'Ajouter à l’écran d’accueil',
    offlineTitle: 'Vous êtes hors ligne',
    offlineHint: 'Reconnectez-vous pour continuer ; votre progression locale reste enregistrée sur cet appareil.',
  },
  'pt-BR': {
    installTitle: 'Instalar o HanziMaster',
    installAction: 'Adicionar à tela inicial',
    offlineTitle: 'Você está offline',
    offlineHint: 'Reconecte-se para continuar; seu progresso local continua salvo neste dispositivo.',
  },
  de: {
    installTitle: 'HanziMaster installieren',
    installAction: 'Zum Startbildschirm hinzufügen',
    offlineTitle: 'Sie sind offline',
    offlineHint: 'Verbinden Sie sich erneut, um fortzufahren; Ihr lokaler Lernfortschritt bleibt auf diesem Gerät gespeichert.',
  },
  ja: {
    installTitle: '漢字マスターをインストール',
    installAction: 'ホーム画面に追加',
    offlineTitle: 'オフラインです',
    offlineHint: '接続後に学習を再開できます。端末内の学習進捗は保持されています。',
  },
  ko: {
    installTitle: 'HanziMaster 설치',
    installAction: '홈 화면에 추가',
    offlineTitle: '오프라인 상태입니다',
    offlineHint: '다시 연결하면 계속할 수 있습니다. 이 기기에 저장된 학습 진행 상황은 유지됩니다.',
  },
  ru: {
    installTitle: 'Установить HanziMaster',
    installAction: 'Добавить на главный экран',
    offlineTitle: 'Вы не в сети',
    offlineHint: 'Подключитесь снова, чтобы продолжить; локальный прогресс обучения сохранён на этом устройстве.',
  },
};
