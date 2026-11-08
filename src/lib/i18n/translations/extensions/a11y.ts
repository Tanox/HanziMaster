// src/lib/i18n/translations/extensions/a11y.ts v5.2.44

/** 无障碍相关 aria-label / Toast / Canvas / 键盘替代路径文案，按所属键域分组。 */
export interface A11yTexts {
  common: {
    close: string;
    closeNotification: string;
    notifications: string;
    changeLanguage: string;
    selectLanguage: string;
  };
  learn: { strokeDemoLabel: string };
  practice: {
    canvasLabel: string;
    keyboardLabel: string;
    keyboardHint: string;
  };
}

export const a11yByLocale: Record<string, A11yTexts> = {
  en: {
    common: { close: 'Close', closeNotification: 'Dismiss notification', notifications: 'Notifications', changeLanguage: 'Change language', selectLanguage: 'Select language' },
    learn: { strokeDemoLabel: 'Stroke order demonstration' },
    practice: { canvasLabel: 'Tian-zi-ge writing canvas', keyboardLabel: 'Stroke order (keyboard alternative)', keyboardHint: 'Enter the stroke numbers in order, e.g. 1 2 3, separated by spaces or commas.' },
  },
  'zh-CN': {
    common: { close: '关闭', closeNotification: '关闭通知', notifications: '通知', changeLanguage: '更改语言', selectLanguage: '选择语言' },
    learn: { strokeDemoLabel: '笔顺演示区域' },
    practice: { canvasLabel: '田字格书写画布', keyboardLabel: '笔顺输入（键盘替代路径）', keyboardHint: '按顺序输入笔画编号，例如 1 2 3，用空格或逗号分隔。' },
  },
  'zh-TW': {
    common: { close: '關閉', closeNotification: '關閉通知', notifications: '通知', changeLanguage: '變更語言', selectLanguage: '選擇語言' },
    learn: { strokeDemoLabel: '筆順示範區域' },
    practice: { canvasLabel: '田字格書寫畫布', keyboardLabel: '筆順輸入（鍵盤替代路徑）', keyboardHint: '依序輸入筆畫編號，例如 1 2 3，以空格或逗號分隔。' },
  },
  es: {
    common: { close: 'Cerrar', closeNotification: 'Cerrar notificación', notifications: 'Notificaciones', changeLanguage: 'Cambiar idioma', selectLanguage: 'Seleccionar idioma' },
    learn: { strokeDemoLabel: 'Demostración del orden de trazos' },
    practice: { canvasLabel: 'Lienzo de escritura', keyboardLabel: 'Orden de trazos (alternativa de teclado)', keyboardHint: 'Escribe los números de trazo en orden, p. ej. 1 2 3, separados por espacios o comas.' },
  },
  ar: {
    common: { close: 'إغلاق', closeNotification: 'إغلاق الإشعار', notifications: 'الإشعارات', changeLanguage: 'تغيير اللغة', selectLanguage: 'اختر اللغة' },
    learn: { strokeDemoLabel: 'عرض ترتيب الضربات' },
    practice: { canvasLabel: 'لوحة الكتابة', keyboardLabel: 'ترتيب الضربات (بديل لوحة المفاتيح)', keyboardHint: 'أدخل أرقام الضربات بالترتيب، مثلاً 1 2 3، مفصولة بمسافات أو فواصل.' },
  },
  fr: {
    common: { close: 'Fermer', closeNotification: 'Fermer la notification', notifications: 'Notifications', changeLanguage: 'Changer de langue', selectLanguage: 'Choisir la langue' },
    learn: { strokeDemoLabel: 'Démonstration de l’ordre des traits' },
    practice: { canvasLabel: 'Zone d’écriture', keyboardLabel: 'Ordre des traits (alternative clavier)', keyboardHint: 'Saisissez les numéros de traits dans l’ordre, p. ex. 1 2 3, séparés par des espaces ou des virgules.' },
  },
  'pt-BR': {
    common: { close: 'Fechar', closeNotification: 'Fechar notificação', notifications: 'Notificações', changeLanguage: 'Alterar idioma', selectLanguage: 'Selecionar idioma' },
    learn: { strokeDemoLabel: 'Demonstração da ordem dos traços' },
    practice: { canvasLabel: 'Área de escrita', keyboardLabel: 'Ordem dos traços (alternativa por teclado)', keyboardHint: 'Digite os números dos traços em ordem, ex.: 1 2 3, separados por espaços ou vírgulas.' },
  },
  de: {
    common: { close: 'Schließen', closeNotification: 'Benachrichtigung schließen', notifications: 'Benachrichtigungen', changeLanguage: 'Sprache ändern', selectLanguage: 'Sprache auswählen' },
    learn: { strokeDemoLabel: 'Demonstration der Strichfolge' },
    practice: { canvasLabel: 'Schreibfläche', keyboardLabel: 'Strichfolge (Tastaturalternative)', keyboardHint: 'Strichnummern in der richtigen Reihenfolge eingeben, z. B. 1 2 3, getrennt durch Leerzeichen oder Kommas.' },
  },
  ja: {
    common: { close: '閉じる', closeNotification: '通知を閉じる', notifications: '通知', changeLanguage: '言語を変更', selectLanguage: '言語を選択' },
    learn: { strokeDemoLabel: '筆順デモ領域' },
    practice: { canvasLabel: '田字格・書き込みキャンバス', keyboardLabel: '筆順入力（キーボード代替）', keyboardHint: '筆画番号を順に入力してください（例：1 2 3）。スペースまたはカンマで区切ります。' },
  },
  ko: {
    common: { close: '닫기', closeNotification: '알림 닫기', notifications: '알림', changeLanguage: '언어 변경', selectLanguage: '언어 선택' },
    learn: { strokeDemoLabel: '획순 시연 영역' },
    practice: { canvasLabel: '쓰기 캔버스', keyboardLabel: '획순 입력 (키보드 대체 경로)', keyboardHint: '획 번호를 순서대로 입력하세요. 예: 1 2 3 (공백 또는 쉼표로 구분).' },
  },
  ru: {
    common: { close: 'Закрыть', closeNotification: 'Закрыть уведомление', notifications: 'Уведомления', changeLanguage: 'Сменить язык', selectLanguage: 'Выбрать язык' },
    learn: { strokeDemoLabel: 'Демонстрация порядка черт' },
    practice: { canvasLabel: 'Область письма', keyboardLabel: 'Порядок черт (клавиатурная альтернатива)', keyboardHint: 'Введите номера черт по порядку, например 1 2 3, разделяя пробелами или запятыми.' },
  },
};
