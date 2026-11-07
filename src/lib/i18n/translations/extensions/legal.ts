// src/lib/i18n/translations/extensions/legal.ts v5.2.35

/** 合规相关 UI 文案键；完整正文见 src/content/privacy.ts 与 terms.ts（双语静态）。 */
export interface LegalTexts {
  privacyTitle: string;
  termsTitle: string;
  privacyLink: string;
  termsLink: string;
  consentTitle: string;
  consentBody: string;
  accept: string;
  reject: string;
  disclaimerShort: string;
  legalHeading: string;
}

export const legalByLocale: Record<string, LegalTexts> = {
  en: {
    privacyTitle: 'Privacy Policy', termsTitle: 'Terms of Service',
    privacyLink: 'Privacy', termsLink: 'Terms',
    consentTitle: 'Analytics and privacy',
    consentBody: 'Analytics scripts load only after you accept. See the Privacy Policy for details.',
    accept: 'Accept', reject: 'Reject',
    disclaimerShort: 'For learning reference; verify with authoritative dictionaries.',
    legalHeading: 'Legal',
  },
  'zh-CN': {
    privacyTitle: '隐私政策', termsTitle: '服务条款',
    privacyLink: '隐私政策', termsLink: '服务条款',
    consentTitle: '统计与隐私',
    consentBody: '仅在您同意后加载统计脚本。详情见隐私政策。',
    accept: '接受', reject: '拒绝',
    disclaimerShort: '仅供学习参考，请以权威字典为准。',
    legalHeading: '法律信息',
  },
  'zh-TW': {
    privacyTitle: '隱私權政策', termsTitle: '服務條款',
    privacyLink: '隱私權政策', termsLink: '服務條款',
    consentTitle: '統計與隱私',
    consentBody: '僅在您同意後載入統計指令碼。詳情見隱私權政策。',
    accept: '接受', reject: '拒絕',
    disclaimerShort: '僅供學習參考，請以權威字典為準。',
    legalHeading: '法律資訊',
  },
  es: {
    privacyTitle: 'Política de privacidad', termsTitle: 'Términos del servicio',
    privacyLink: 'Privacidad', termsLink: 'Términos',
    consentTitle: 'Analítica y privacidad',
    consentBody: 'Los scripts de analítica se cargan solo si aceptas. Consulta la política de privacidad.',
    accept: 'Aceptar', reject: 'Rechazar',
    disclaimerShort: 'Solo para aprendizaje; verifica con diccionarios autorizados.',
    legalHeading: 'Información legal',
  },
  ar: {
    privacyTitle: 'سياسة الخصوصية', termsTitle: 'شروط الخدمة',
    privacyLink: 'الخصوصية', termsLink: 'الشروط',
    consentTitle: 'التحليلات والخصوصية',
    consentBody: 'يتم تحميل نصوص التحليلات فقط بعد الموافقة. راجع سياسة الخصوصية.',
    accept: 'قبول', reject: 'رفض',
    disclaimerShort: 'لأغراض التعلم فقط؛ تحقق من المعاجم الموثوقة.',
    legalHeading: 'معلومات قانونية',
  },
  fr: {
    privacyTitle: 'Politique de confidentialité', termsTitle: "Conditions d'utilisation",
    privacyLink: 'Confidentialité', termsLink: 'Conditions',
    consentTitle: 'Statistiques et confidentialité',
    consentBody: 'Les scripts de mesure ne se chargent qu’après votre accord. Voir la politique de confidentialité.',
    accept: 'Accepter', reject: 'Refuser',
    disclaimerShort: 'À titre pédagogique ; vérifiez avec des dictionnaires de référence.',
    legalHeading: 'Mentions légales',
  },
  'pt-BR': {
    privacyTitle: 'Política de Privacidade', termsTitle: 'Termos de Serviço',
    privacyLink: 'Privacidade', termsLink: 'Termos',
    consentTitle: 'Análise e privacidade',
    consentBody: 'Os scripts de análise só carregam após sua aceitação. Veja a Política de Privacidade.',
    accept: 'Aceitar', reject: 'Recusar',
    disclaimerShort: 'Apenas para estudo; confirme em dicionários de referência.',
    legalHeading: 'Informações legais',
  },
  de: {
    privacyTitle: 'Datenschutzerklärung', termsTitle: 'Nutzungsbedingungen',
    privacyLink: 'Datenschutz', termsLink: 'Nutzungsbedingungen',
    consentTitle: 'Analyse und Datenschutz',
    consentBody: 'Analyse-Skripte werden erst nach Ihrer Zustimmung geladen. Siehe Datenschutzerklärung.',
    accept: 'Akzeptieren', reject: 'Ablehnen',
    disclaimerShort: 'Nur zu Lernzwecken; mit maßgeblichen Wörterbüchern prüfen.',
    legalHeading: 'Rechtliches',
  },
  ja: {
    privacyTitle: 'プライバシーポリシー', termsTitle: '利用規約',
    privacyLink: 'プライバシー', termsLink: '利用規約',
    consentTitle: '解析とプライバシー',
    consentBody: '同意いただいた場合のみ解析スクリプトを読み込みます。詳細はプライバシーポリシーをご覧ください。',
    accept: '同意する', reject: '拒否する',
    disclaimerShort: '学習参考用です。権威ある辞書でご確認ください。',
    legalHeading: '法務情報',
  },
  ko: {
    privacyTitle: '개인정보 처리방침', termsTitle: '이용 약관',
    privacyLink: '개인정보', termsLink: '약관',
    consentTitle: '분석 및 개인정보',
    consentBody: '동의한 경우에만 분석 스크립트가 로드됩니다. 개인정보 처리방침을 참고하세요.',
    accept: '동의', reject: '거부',
    disclaimerShort: '학습 참고용이며, 권위 있는 사전으로 확인하세요.',
    legalHeading: '법적 정보',
  },
  ru: {
    privacyTitle: 'Политика конфиденциальности', termsTitle: 'Условия использования',
    privacyLink: 'Конфиденциальность', termsLink: 'Условия',
    consentTitle: 'Аналитика и конфиденциальность',
    consentBody: 'Скрипты аналитики загружаются только после согласия. См. политику конфиденциальности.',
    accept: 'Принять', reject: 'Отклонить',
    disclaimerShort: 'Только для обучения; сверяйтесь с авторитетными словарями.',
    legalHeading: 'Правовая информация',
  },
};
