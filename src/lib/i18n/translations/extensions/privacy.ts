// src/lib/i18n/translations/extensions/privacy.ts v5.2.52
/** 隐私同意撤回文案；独立模块避免 settings.ts 超过 200 行门禁。 */
interface PrivacyTexts {
  privacyTitle: string; privacyDesc: string; withdrawConsent: string; consentUpdated: string;
}

export const privacyByLocale: Record<string, PrivacyTexts> = {
  en: {
    privacyTitle: 'Privacy & Data', privacyDesc: 'Manage analytics consent for this device.',
    withdrawConsent: 'Withdraw analytics consent', consentUpdated: 'Analytics consent updated.',
  },
  'zh-CN': {
    privacyTitle: '隐私与数据', privacyDesc: '管理本设备上的统计同意状态。',
    withdrawConsent: '撤回统计同意', consentUpdated: '统计同意状态已更新。',
  },
  'zh-TW': {
    privacyTitle: '隱私與資料', privacyDesc: '管理此裝置上的統計同意狀態。',
    withdrawConsent: '撤回統計同意', consentUpdated: '統計同意狀態已更新。',
  },
  es: {
    privacyTitle: 'Privacidad y datos', privacyDesc: 'Administra el consentimiento de análisis en este dispositivo.',
    withdrawConsent: 'Retirar consentimiento de análisis', consentUpdated: 'Consentimiento de análisis actualizado.',
  },
  fr: {
    privacyTitle: 'Confidentialité et données', privacyDesc: 'Gérez le consentement aux statistiques sur cet appareil.',
    withdrawConsent: 'Retirer le consentement aux statistiques', consentUpdated: 'Consentement aux statistiques mis à jour.',
  },
  de: {
    privacyTitle: 'Datenschutz & Daten', privacyDesc: 'Verwalte die Analyse-Zustimmung auf diesem Gerät.',
    withdrawConsent: 'Analyse-Zustimmung widerrufen', consentUpdated: 'Analyse-Zustimmung aktualisiert.',
  },
  ja: {
    privacyTitle: 'プライバシーとデータ', privacyDesc: 'この端末の統計同意を管理します。',
    withdrawConsent: '統計同意を取り消す', consentUpdated: '統計同意を更新しました。',
  },
  ko: {
    privacyTitle: '개인정보 및 데이터', privacyDesc: '이 기기의 분석 동의를 관리합니다.',
    withdrawConsent: '분석 동의 철회', consentUpdated: '분석 동의가 업데이트되었습니다.',
  },
  ru: {
    privacyTitle: 'Конфиденциальность и данные', privacyDesc: 'Управляйте согласием на аналитику на этом устройстве.',
    withdrawConsent: 'Отозвать согласие на аналитику', consentUpdated: 'Согласие на аналитику обновлено.',
  },
  'pt-BR': {
    privacyTitle: 'Privacidade e dados', privacyDesc: 'Gerencie o consentimento de análise neste dispositivo.',
    withdrawConsent: 'Retirar consentimento de análise', consentUpdated: 'Consentimento de análise atualizado.',
  },
  ar: {
    privacyTitle: 'الخصوصية والبيانات', privacyDesc: 'إدارة موافقة التحليلات على هذا الجهاز.',
    withdrawConsent: 'سحب موافقة التحليلات', consentUpdated: 'تم تحديث موافقة التحليلات.',
  },
};
