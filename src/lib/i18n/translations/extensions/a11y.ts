// src/lib/i18n/translations/extensions/a11y.ts v5.2.35

/** 无障碍相关 aria-label / Toast / Canvas 文案，按所属键域分组。 */
export interface A11yTexts {
  common: {
    close: string;
    closeNotification: string;
    notifications: string;
    changeLanguage: string;
    selectLanguage: string;
  };
  learn: { strokeDemoLabel: string };
  practice: { canvasLabel: string };
}

export const a11yByLocale: Record<string, A11yTexts> = {
  en: {
    common: { close: 'Close', closeNotification: 'Dismiss notification', notifications: 'Notifications', changeLanguage: 'Change language', selectLanguage: 'Select language' },
    learn: { strokeDemoLabel: 'Stroke order demonstration' },
    practice: { canvasLabel: 'Tian-zi-ge writing canvas' },
  },
  'zh-CN': {
    common: { close: '关闭', closeNotification: '关闭通知', notifications: '通知', changeLanguage: '更改语言', selectLanguage: '选择语言' },
    learn: { strokeDemoLabel: '笔顺演示区域' },
    practice: { canvasLabel: '田字格书写画布' },
  },
  'zh-TW': {
    common: { close: '關閉', closeNotification: '關閉通知', notifications: '通知', changeLanguage: '變更語言', selectLanguage: '選擇語言' },
    learn: { strokeDemoLabel: '筆順示範區域' },
    practice: { canvasLabel: '田字格書寫畫布' },
  },
  es: {
    common: { close: 'Cerrar', closeNotification: 'Cerrar notificación', notifications: 'Notificaciones', changeLanguage: 'Cambiar idioma', selectLanguage: 'Seleccionar idioma' },
    learn: { strokeDemoLabel: 'Demostración del orden de trazos' },
    practice: { canvasLabel: 'Lienzo de escritura' },
  },
  ar: {
    common: { close: 'إغلاق', closeNotification: 'إغلاق الإشعار', notifications: 'الإشعارات', changeLanguage: 'تغيير اللغة', selectLanguage: 'اختر اللغة' },
    learn: { strokeDemoLabel: 'عرض ترتيب الضربات' },
    practice: { canvasLabel: 'لوحة الكتابة' },
  },
  fr: {
    common: { close: 'Fermer', closeNotification: 'Fermer la notification', notifications: 'Notifications', changeLanguage: 'Changer de langue', selectLanguage: 'Choisir la langue' },
    learn: { strokeDemoLabel: 'Démonstration de l’ordre des traits' },
    practice: { canvasLabel: 'Zone d’écriture' },
  },
  'pt-BR': {
    common: { close: 'Fechar', closeNotification: 'Fechar notificação', notifications: 'Notificações', changeLanguage: 'Alterar idioma', selectLanguage: 'Selecionar idioma' },
    learn: { strokeDemoLabel: 'Demonstração da ordem dos traços' },
    practice: { canvasLabel: 'Área de escrita' },
  },
  de: {
    common: { close: 'Schließen', closeNotification: 'Benachrichtigung schließen', notifications: 'Benachrichtigungen', changeLanguage: 'Sprache ändern', selectLanguage: 'Sprache auswählen' },
    learn: { strokeDemoLabel: 'Demonstration der Strichfolge' },
    practice: { canvasLabel: 'Schreibfläche' },
  },
  ja: {
    common: { close: '閉じる', closeNotification: '通知を閉じる', notifications: '通知', changeLanguage: '言語を変更', selectLanguage: '言語を選択' },
    learn: { strokeDemoLabel: '筆順デモ領域' },
    practice: { canvasLabel: '田字格・書き込みキャンバス' },
  },
  ko: {
    common: { close: '닫기', closeNotification: '알림 닫기', notifications: '알림', changeLanguage: '언어 변경', selectLanguage: '언어 선택' },
    learn: { strokeDemoLabel: '획순 시연 영역' },
    practice: { canvasLabel: '쓰기 캔버스' },
  },
  ru: {
    common: { close: 'Закрыть', closeNotification: 'Закрыть уведомление', notifications: 'Уведомления', changeLanguage: 'Сменить язык', selectLanguage: 'Выбрать язык' },
    learn: { strokeDemoLabel: 'Демонстрация порядка черт' },
    practice: { canvasLabel: 'Область письма' },
  },
};
